import { useState } from "react";
import type { Stripe } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { purchaseTicket } from "../api/payments";
import { ApiError } from "../api/client";
import { Alert, Button, Card, Input, Modal, Spinner } from "../components/ui";
import { formatCurrency } from "../lib/format";
import { useLanguage } from "../i18n/LanguageContext";

interface PurchaseDetails {
  clientSecret: string;
  amount: number;
  currency: string;
}

const stripePromiseCache = new Map<string, Promise<Stripe | null>>();

function getStripePromise(publishableKey: string) {
  let promise = stripePromiseCache.get(publishableKey);
  if (!promise) {
    promise = loadStripe(publishableKey);
    stripePromiseCache.set(publishableKey, promise);
  }
  return promise;
}

type PaymentOutcome = "succeeded" | "canceled" | "pending";

// Authorization succeeding doesn't mean this buyer won the ticket — the backend only
// decides that once it claims the ticket for this specific PaymentIntent and captures it.
// Poll the PaymentIntent itself (via Stripe, not our API) until the backend resolves it to
// a terminal state: succeeded (this buyer won and was charged) or canceled (someone else's
// authorization won first, and this buyer was never charged).
async function waitForPaymentOutcome(
  stripe: Stripe,
  clientSecret: string,
  {
    intervalMs = 1200,
    timeoutMs = 20000,
  }: { intervalMs?: number; timeoutMs?: number } = {},
): Promise<PaymentOutcome> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
    if (paymentIntent?.status === "succeeded") return "succeeded";
    if (paymentIntent?.status === "canceled") return "canceled";
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
  return "pending";
}

function PaymentForm({ details }: { details: PurchaseDetails }) {
  const { t, language } = useLanguage();
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError(null);

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.href },
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message ?? t("checkout.paymentFailed"));
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setConfirming(true);
    const outcome = await waitForPaymentOutcome(stripe, details.clientSecret);
    setConfirming(false);

    if (outcome === "succeeded") {
      setSucceeded(true);
    } else if (outcome === "canceled") {
      setError(t("checkout.paymentLost"));
    } else {
      setError(t("checkout.confirmTimeout"));
    }
  }

  if (succeeded) {
    return <Alert kind="success">{t("checkout.paymentSuccess")}</Alert>;
  }

  if (confirming) {
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <Spinner className="h-8 w-8" />
        <p className="text-sm text-slate-500">
          {t("checkout.confirmingMessage")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <PaymentElement />
      {error && <Alert>{error}</Alert>}
      <Button type="submit" disabled={!stripe || submitting}>
        {submitting ? (
          <>
            <Spinner className="me-2 h-4 w-4" />
            {t("checkout.processingButton")}
          </>
        ) : (
          t("checkout.payButton", {
            amount: formatCurrency(
              details.amount,
              language,
              details.currency.toUpperCase(),
            ),
          })
        )}
      </Button>
    </form>
  );
}

export default function CheckoutPage() {
  const { t } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<PurchaseDetails | null>(null);
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  async function handleStartCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;
    setShowDisclaimer(true);
  }

  async function startPaymentFlow() {
    if (!id) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await purchaseTicket(id, { buyerName, buyerEmail });
      if (!res.data) throw new Error("No payment details returned");
      setDetails({
        clientSecret: res.data.clientSecret,
        amount: res.data.amount,
        currency: res.data.currency,
      });
      setStripePromise(getStripePromise(res.data.publishableKey));
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : t("checkout.genericError"),
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-sm text-slate-500 hover:text-slate-900"
      >
        {t("common.back")}
      </button>

      <Card className="mt-4">
        <h1 className="text-xl font-semibold text-slate-900">
          {t("checkout.title")}
        </h1>

        {!details && (
          <form
            onSubmit={handleStartCheckout}
            className="mt-4 flex flex-col gap-4"
          >
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                {t("checkout.nameLabel")}
              </label>
              <Input
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                required
                maxLength={50}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                {t("checkout.emailLabel")}
              </label>
              <Input
                type="email"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                required
                maxLength={254}
              />
            </div>
            {error && <Alert>{error}</Alert>}
            <Button type="submit" disabled={submitting}>
              {submitting
                ? t("checkout.preparingButton")
                : t("checkout.continueButton")}
            </Button>
          </form>
        )}

        {details && stripePromise && (
          <div className="mt-4">
            <Elements
              stripe={stripePromise}
              options={{ clientSecret: details.clientSecret }}
            >
              <PaymentForm details={details} />
            </Elements>
          </div>
        )}

        <p className="mt-4 border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-500">
          {t("checkout.secureNotice")}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">
          {t("checkout.authenticityNotice")}
        </p>
      </Card>

      <p className="mt-4 text-center text-xs text-slate-400">
        {t("checkout.troubleText")}{" "}
        <Link to="/browse" className="underline">
          {t("checkout.backToBrowseLink")}
        </Link>
      </p>

      <Modal
        open={showDisclaimer}
        title={t("checkout.disclaimerTitle")}
        confirmLabel={t("checkout.disclaimerConfirm")}
        cancelLabel={t("checkout.disclaimerCancel")}
        onConfirm={() => {
          setShowDisclaimer(false);
          void startPaymentFlow();
        }}
        onCancel={() => setShowDisclaimer(false)}
      >
        {t("checkout.disclaimerBody")}
      </Modal>
    </div>
  );
}
