export type Language = "en" | "ar";

export const languages: Language[] = ["ar", "en"];

type PluralForms = Partial<Record<Intl.LDMLPluralRule, string>> & {
  other: string;
};

interface Dictionary {
  nav: {
    home: string;
    findDate: string;
    browse: string;
    sell: string;
    subscribe: string;
    manageTicket: string;
    contact: string;
    policy: string;
  };
  footer: {
    tagline: string;
    copyright: string;
  };
  common: {
    loadingTickets: string;
    loadingTicket: string;
    noTicketsFound: string;
    previous: string;
    next: string;
    pageOf: string;
    travelDate: string;
    fromDate: string;
    toDateOptional: string;
    failedToLoadTickets: string;
    failedToLoadTicket: string;
    ticketNotFound: string;
    backToBrowse: string;
    backToHome: string;
    back: string;
    price: string;
    priceIncludesFee: string;
    bag: PluralForms;
    registerAlertButton: string;
  };
  home: {
    title: string;
    subtitle: string;
    searchButton: string;
    cards: {
      browseTitle: string;
      browseDesc: string;
      sellTitle: string;
      sellDesc: string;
      alertsTitle: string;
      alertsDesc: string;
    };
    policy: {
      heading: string;
      subtitle: string;
      verificationTitle: string;
      verificationDesc: string;
      noScalpingTitle: string;
      noScalpingDesc: string;
      purposeTitle: string;
      purposeDesc: string;
      serviceFeeTitle: string;
      serviceFeeDesc: string;
    };
  };
  browse: {
    title: string;
    searchButton: string;
    searchingButton: string;
  };
  findDate: {
    title: string;
    subtitle: string;
    searchButton: string;
    searchingButton: string;
  };
  sell: {
    title: string;
    subtitle: string;
    fileLabel: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    priceLabel: string;
    priceLimitNote: string;
    paymentMethodLabel: string;
    paymentOptions: {
      iban: string;
      reflect: string;
      phone: string;
    };
    accountHolderLabel: string;
    bankNameLabel: string;
    countryLabel: string;
    ibanLabel: string;
    reflectPhoneLabel: string;
    phoneTransferLabel: string;
    attachFileError: string;
    genericError: string;
    postingButton: string;
    postButton: string;
    successMessage: string;
    notice: string;
  };
  subscribe: {
    title: string;
    subtitle: string;
    emailLabel: string;
    dateLabel: string;
    subscribingButton: string;
    notifyButton: string;
    successMessage: string;
    genericError: string;
    privacyNote: string;
  };
  checkout: {
    title: string;
    nameLabel: string;
    emailLabel: string;
    preparingButton: string;
    continueButton: string;
    processingButton: string;
    confirmingMessage: string;
    payButton: string;
    paymentSuccess: string;
    paymentFailed: string;
    paymentLost: string;
    confirmTimeout: string;
    genericError: string;
    troubleText: string;
    backToBrowseLink: string;
    secureNotice: string;
    authenticityNotice: string;
  };
  ticketDetail: {
    buyButton: string;
    reviewNote: string;
    authenticityNote: string;
  };
  notFound: {
    title: string;
    description: string;
    goHome: string;
  };
  contact: {
    title: string;
    subtitle: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    sendingButton: string;
    sendButton: string;
    successMessage: string;
    genericError: string;
    directEmailLabel: string;
  };
  manageTicket: {
    title: string;
    subtitle: string;
    pinLabel: string;
    emailLabel: string;
    lookupButton: string;
    lookingUpButton: string;
    lookupError: string;
    statusForSale: string;
    statusSold: string;
    statusDeleted: string;
    statusProcessing: string;
    statusRejected: string;
    pendingVerification: string;
    processingNotice: string;
    rejectedNotice: string;
    rejectionReasonLabel: string;
    soldNotice: string;
    soldAtMessage: string;
    sellerInfoTitle: string;
    sellerEmailLabel: string;
    sellerPhoneLabel: string;
    currentPaymentMethodLabel: string;
    downloadButton: string;
    downloadingButton: string;
    downloadError: string;
    deleteButton: string;
    deleteConfirmMessage: string;
    confirmDeleteButton: string;
    deletingButton: string;
    cancelButton: string;
    deleteSuccessMessage: string;
    deleteError: string;
    republishButton: string;
    republishingButton: string;
    republishSuccessMessage: string;
    republishError: string;
    modifyButton: string;
    modifyingButton: string;
    saveButton: string;
    modifySuccessMessage: string;
    modifyError: string;
    priceLimitNote: string;
  };
}

const en: Dictionary = {
  nav: {
    home: "Home",
    findDate: "Find a Ticket",
    browse: "Browse Tickets",
    sell: "Sell a Ticket",
    subscribe: "Ticket Alerts",
    manageTicket: "Manage My Ticket",
    contact: "Contact Us",
    policy: "Our Policy",
  },
  footer: {
    tagline:
      "Manassa Ticket Exchange — a marketplace for the resale of travel tickets.",
    copyright: "© {{year}} Manassa Ticket Exchange. All rights reserved.",
  },
  common: {
    loadingTickets: "Loading tickets…",
    loadingTicket: "Loading ticket…",
    noTicketsFound:
      "No tickets are currently listed for this date. You may select a different date or register to receive an alert when a ticket becomes available.",
    previous: "Previous",
    next: "Next",
    pageOf: "Page {{page}} of {{total}}",
    travelDate: "Travel date",
    fromDate: "From date",
    toDateOptional: "To date (optional)",
    failedToLoadTickets:
      "The tickets could not be loaded. Please try again later.",
    failedToLoadTicket:
      "The ticket could not be loaded. Please try again later.",
    ticketNotFound: "The requested ticket could not be found.",
    backToBrowse: "Return to ticket listings",
    backToHome: "Back to home",
    back: "Back",
    price: "Price",
    priceIncludesFee: "Includes service fee",
    bag: {
      one: "{{count}} bag included",
      other: "{{count}} bags included",
    },
    registerAlertButton: "Register for a Ticket Alert",
  },
  home: {
    title: "A Trusted Marketplace for Ticket Resale",
    subtitle:
      "Manassa Ticket Exchange connects travellers who no longer need their ticket with those looking for one on their preferred travel date — safely, simply, and without the hassle.",
    searchButton: "Search Tickets",
    cards: {
      browseTitle: "Browse Tickets",
      browseDesc:
        "View the tickets currently listed for sale on your travel date.",
      sellTitle: "Sell a Ticket",
      sellDesc:
        "Submit your ticket for listing and receive payment once it has been sold.",
      alertsTitle: "Ticket Alerts",
      alertsDesc:
        "Register to receive an email notification when a ticket matching your travel date becomes available.",
    },
    policy: {
      heading: "Our Policy",
      subtitle: "A few things worth knowing before you buy or sell.",
      verificationTitle: "Verified, Single-Use Tickets",
      verificationDesc:
        "Every ticket listed is checked for authenticity, and our system blocks it from being sold twice on the platform. We can't, however, guarantee that a seller hasn't also resold the same ticket outside Manassa Ticket Exchange.",
      noScalpingTitle: "No Scalping or Brokering",
      noScalpingDesc:
        "We don't allow ticket scalping or brokering on the platform, and a ticket's asking price cannot be raised above its original purchase price.",
      purposeTitle: "Built to Help, Not to Profit",
      purposeDesc:
        "This platform exists purely to connect people who need a ticket with people who no longer need theirs.",
      serviceFeeTitle: "A Small Service Fee Applies",
      serviceFeeDesc: "A nominal fee applies to the ticket sale process on the platform.",
    },
  },
  browse: {
    title: "Browse Tickets",
    searchButton: "Search Tickets",
    searchingButton: "Searching…",
  },
  findDate: {
    title: "Find a Ticket",
    subtitle:
      "Select your travel date to view the tickets currently available for purchase.",
    searchButton: "Find Tickets",
    searchingButton: "Searching…",
  },
  sell: {
    title: "Sell Your Ticket",
    subtitle:
      "Upload your ticket file and the travel details will be extracted from it automatically.",
    fileLabel: "Ticket file (PDF)",
    nameLabel: "Full name",
    emailLabel: "Email address",
    phoneLabel: "Phone number",
    priceLabel: "Asking price (JOD)",
    priceLimitNote: "Your asking price cannot exceed the ticket's original purchase price.",
    paymentMethodLabel: "Preferred payment method",
    paymentOptions: {
      iban: "Bank transfer (IBAN)",
      reflect: "Reflect",
      phone: "Phone transfer",
    },
    accountHolderLabel: "Account holder name",
    bankNameLabel: "Bank name",
    countryLabel: "Country",
    ibanLabel: "IBAN / account number",
    reflectPhoneLabel: "Reflect phone number",
    phoneTransferLabel: "Phone transfer number",
    attachFileError: "Please attach your ticket file before submitting.",
    genericError: "Your ticket could not be submitted. Please try again later.",
    postingButton: "Submitting…",
    postButton: "Submit Ticket for Sale",
    successMessage:
      "Your ticket has been submitted and is now being verified. Your reference PIN is {{pin}}. Please retain this PIN, as it is required to follow up on the status of your listing. You will receive an email confirmation once verification is complete and your ticket is listed for sale. Once your ticket has been sold, payment will be disbursed within 1 to 3 business days, depending on the payment method selected.",
    notice:
      "By submitting this form, you confirm that the ticket belongs to you, is genuine and valid for use, and that you have not sold it and will not sell, transfer, or otherwise make it available to anyone else through any channel outside this platform. Should the ticket prove invalid or be sold elsewhere, you accept full responsibility for any resulting loss or claim. Payment will be transferred to you through your selected payment method once your ticket has been sold. Funds are typically disbursed within 1 to 3 business days, depending on the payment method selected.",
  },
  subscribe: {
    title: "Ticket Availability Alerts",
    subtitle:
      "Provide your email address and travel date, and we will notify you as soon as a matching ticket becomes available.",
    emailLabel: "Email address",
    dateLabel: "Travel date",
    subscribingButton: "Submitting…",
    notifyButton: "Subscribe to Alerts",
    successMessage:
      "Your subscription has been confirmed. A notification will be sent to {{email}} as soon as a ticket for {{date}} becomes available.",
    genericError:
      "Your subscription could not be completed. Please try again later.",
    privacyNote:
      "Your email address will be used solely to notify you of ticket availability.",
  },
  checkout: {
    title: "Checkout",
    nameLabel: "Full name",
    emailLabel: "Email address",
    preparingButton: "Preparing payment…",
    continueButton: "Continue to Payment",
    processingButton: "Processing payment…",
    confirmingMessage:
      "Verifying your card and confirming the ticket is still yours — this takes a few seconds.",
    payButton: "Pay {{amount}}",
    paymentSuccess:
      "Your payment has been completed successfully. A confirmation email containing your ticket details has been sent to the email address provided.",
    paymentFailed:
      "The payment could not be completed. Please verify your payment details and try again.",
    paymentLost:
      "Someone else completed payment for this ticket moments before you. Your card has not been charged.",
    confirmTimeout:
      "We're still confirming your purchase. You have not been double-charged — please check your email shortly, or refresh this page.",
    genericError:
      "The checkout process could not be initiated. Please try again later.",
    troubleText: "Experiencing difficulties?",
    backToBrowseLink: "Return to ticket listings",
    secureNotice:
      "All payments are processed securely by our payment provider. Your card details are not stored on our servers.",
    authenticityNotice:
      "Every ticket listed here is a genuine ticket, and our platform prevents the same ticket from being sold more than once. However, we cannot be held responsible if a seller separately sells or transfers the same ticket through another channel outside this platform.",
  },
  ticketDetail: {
    buyButton: "Purchase This Ticket",
    reviewNote:
      "Please review the travel details carefully before proceeding. A confirmation email will be sent to you upon successful payment.",
    authenticityNote:
      "Every ticket listed here is a genuine ticket, and our platform prevents the same ticket from being sold more than once. However, we cannot be held responsible if a seller separately sells the same ticket outside this platform.",
  },
  notFound: {
    title: "Page Not Found",
    description: "The page you requested could not be found.",
    goHome: "Return to the home page",
  },
  contact: {
    title: "Contact Us",
    subtitle: "Should you have any questions or require assistance, please submit your inquiry below and our team will respond promptly.",
    nameLabel: "Full name",
    emailLabel: "Email address",
    messageLabel: "Message",
    sendingButton: "Sending…",
    sendButton: "Send Message",
    successMessage: "Your message has been received. Our team will respond to your inquiry as soon as possible.",
    genericError: "Your message could not be sent. Please try again later.",
    directEmailLabel: "Or email us directly at",
  },
  manageTicket: {
    title: "Manage My Ticket",
    subtitle: "Enter your reference PIN and the seller email used to list it to view your ticket and seller details, remove it from sale, republish it, or modify the price and payment details.",
    pinLabel: "Reference PIN",
    emailLabel: "Seller email",
    lookupButton: "Look Up Ticket",
    lookingUpButton: "Looking Up…",
    lookupError: "No ticket could be found for the PIN and email provided. Please verify them and try again.",
    statusForSale: "Listed for Sale",
    statusSold: "Sold",
    statusDeleted: "Removed from Sale",
    statusProcessing: "Being Verified",
    statusRejected: "Not Approved",
    pendingVerification: "Awaiting Verification",
    processingNotice: "Your ticket is currently being verified. This usually takes only a few minutes, and you will receive an email confirmation once it has been listed for sale. Please check back shortly.",
    rejectedNotice: "This ticket could not be listed for sale. You are welcome to submit it again from the Sell a Ticket page.",
    rejectionReasonLabel: "Reason",
    soldNotice: "This ticket has already been sold and can no longer be modified. Please contact us if you require assistance.",
    soldAtMessage: "Sold on {{date}}.",
    sellerInfoTitle: "Seller Information",
    sellerEmailLabel: "Seller email",
    sellerPhoneLabel: "Seller phone",
    currentPaymentMethodLabel: "Payment method",
    downloadButton: "Download Ticket PDF",
    downloadingButton: "Preparing Download…",
    downloadError: "Your ticket file could not be downloaded. Please try again later.",
    deleteButton: "Remove Ticket from Sale",
    deleteConfirmMessage: "Are you sure you wish to remove this ticket from sale? This action cannot be undone.",
    confirmDeleteButton: "Yes, Remove It",
    deletingButton: "Removing…",
    cancelButton: "Cancel",
    deleteSuccessMessage: "Your ticket has been removed from sale.",
    deleteError: "Your ticket could not be removed. Please try again later.",
    republishButton: "Republish Ticket",
    republishingButton: "Republishing…",
    republishSuccessMessage: "Your ticket has been republished and is now listed for sale again.",
    republishError: "Your ticket could not be republished. Please try again later.",
    modifyButton: "Modify Ticket",
    modifyingButton: "Saving…",
    saveButton: "Save Changes",
    modifySuccessMessage: "Your payment details have been updated.",
    modifyError: "Your payment details could not be updated. Please try again later.",
    priceLimitNote: "Your asking price cannot exceed the ticket's original purchase price.",
  },
};

const ar: Dictionary = {
  nav: {
    home: "الرئيسية",
    findDate: "البحث عن تذكرة",
    browse: "تصفح التذاكر",
    sell: "بيع تذكرة",
    subscribe: "تنبيهات التذاكر",
    manageTicket: "إدارة تذكرتي",
    contact: "تواصل معنا",
    policy: "سياستنا",
  },
  footer: {
    tagline: "Manassa Ticket Exchange — منصة  لإعادة بيع تذاكر السفر.",
    copyright: "© {{year}} Manassa Ticket Exchange. جميع الحقوق محفوظة.",
  },
  common: {
    loadingTickets: "جارٍ تحميل التذاكر…",
    loadingTicket: "جارٍ تحميل التذكرة…",
    noTicketsFound:
      "لا توجد تذاكر معروضة لهذا التاريخ حاليًا. يرجى اختيار تاريخ آخر أو التسجيل لتلقّي تنبيه عند توفر تذكرة.",
    previous: "السابق",
    next: "التالي",
    pageOf: "صفحة {{page}} من {{total}}",
    travelDate: "تاريخ السفر",
    fromDate: "من تاريخ",
    toDateOptional: "إلى تاريخ (اختياري)",
    failedToLoadTickets: "تعذّر تحميل التذاكر. يرجى المحاولة مرة أخرى لاحقًا.",
    failedToLoadTicket: "تعذّر تحميل التذكرة. يرجى المحاولة مرة أخرى لاحقًا.",
    ticketNotFound: "التذكرة المطلوبة غير موجودة.",
    backToBrowse: "العودة إلى قائمة التذاكر",
    backToHome: "العودة إلى الصفحة الرئيسية",
    back: "رجوع",
    price: "السعر",
    priceIncludesFee: "شامل رسوم الخدمة",
    bag: {
      zero: "بدون حقائب",
      one: "حقيبة واحدة",
      two: "حقيبتان",
      few: "{{count}} حقائب",
      many: "{{count}} حقيبة",
      other: "{{count}} حقيبة",
    },
    registerAlertButton: "التسجيل لتلقّي تنبيه",
  },
  home: {
    title: "منصة لإعادة بيع تذاكر السفر (المنصة)",
    subtitle:
      "تجمع منصة Manassa Ticket Exchange بين المسافرين الذين لم يعودوا بحاجة إلى تذاكرهم ومن يبحثون عن تذكرة في تاريخ سفرهم المفضّل، بطريقة آمنة وسهلة وخالية من التعقيد.",
    searchButton: "البحث عن التذاكر",
    cards: {
      browseTitle: "تصفح التذاكر",
      browseDesc: "الاطلاع على التذاكر المعروضة للبيع في تاريخ سفرك.",
      sellTitle: "بيع تذكرة",
      sellDesc: "قدّم تذكرتك للعرض واستلم المبلغ فور إتمام عملية البيع.",
      alertsTitle: "تنبيهات التذاكر",
      alertsDesc:
        "سجّل لتلقّي إشعار عبر البريد الإلكتروني عند توفر تذكرة في تاريخ سفرك.",
    },
    policy: {
      heading: "سياستنا",
      subtitle: "بعض الأمور التي يجدر معرفتها قبل الشراء أو البيع.",
      verificationTitle: "تذاكر موثّقة تُباع مرة واحدة",
      verificationDesc:
        "يتم التحقق من صحة كل تذكرة معروضة، ويمنع نظامنا بيعها أكثر من مرة عبر المنصة. ومع ذلك، لا يمكننا ضمان عدم قيام البائع ببيعها في مكان آخر خارج منصة Manassa Ticket Exchange.",
      noScalpingTitle: "لا سمسرة ولا تجارة بالتذاكر",
      noScalpingDesc: "لا نسمح بسمسرة التذاكر عبر المنصة، ولا يمكن زيادة سعر التذكرة عن سعرها الأصلي.",
      purposeTitle: "مصممة للمساعدة، لا للربح",
      purposeDesc: "هذه المنصة موجودة فقط لربط من يحتاج إلى تذكرة بمن لم يعد بحاجة إليها.",
      serviceFeeTitle: "رسوم رمزية على البيع",
      serviceFeeDesc: "يوجد رسوم رمزية لعملية بيع التذاكر عبر المنصة.",
    },
  },
  browse: {
    title: "تصفح التذاكر",
    searchButton: "البحث عن التذاكر",
    searchingButton: "جارٍ البحث…",
  },
  findDate: {
    title: "البحث عن تذكرة",
    subtitle:
      "يرجى اختيار تاريخ السفر للاطلاع على التذاكر المتاحة للشراء في ذلك اليوم.",
    searchButton: "البحث عن التذاكر",
    searchingButton: "جارٍ البحث…",
  },
  sell: {
    title: "بيع تذكرتك",
    subtitle: "يرجى رفع ملف التذكرة، وسيتم استخراج تفاصيل الرحلة منه تلقائيًا.",
    fileLabel: "ملف التذكرة (PDF)",
    nameLabel: "الاسم الكامل",
    emailLabel: "البريد الإلكتروني",
    phoneLabel: "رقم الهاتف",
    priceLabel: "السعر المطلوب (دينار أردني)",
    priceLimitNote: "لا يمكن أن يتجاوز السعر المطلوب سعر الشراء الأصلي للتذكرة.",
    paymentMethodLabel: "طريقة استلام المبلغ",
    paymentOptions: {
      iban: "تحويل بنكي (IBAN)",
      reflect: "Reflect",
      phone: "تحويل عبر الهاتف",
    },
    accountHolderLabel: "اسم صاحب الحساب",
    bankNameLabel: "اسم البنك",
    countryLabel: "الدولة",
    ibanLabel: "رقم الآيبان / رقم الحساب",
    reflectPhoneLabel: "رقم هاتف Reflect",
    phoneTransferLabel: "رقم هاتف التحويل",
    attachFileError: "يرجى إرفاق ملف التذكرة قبل الإرسال.",
    genericError: "تعذّر تقديم التذكرة. يرجى المحاولة مرة أخرى لاحقًا.",
    postingButton: "جارٍ الإرسال…",
    postButton: "تقديم التذكرة للبيع",
    successMessage:
      "تم تقديم تذكرتك وهي الآن قيد التحقق. الرمز المرجعي الخاص بك هو {{pin}}. يرجى الاحتفاظ بهذا الرمز، إذ يلزم لمتابعة حالة تذكرتك. ستصلك رسالة تأكيد عبر البريد الإلكتروني فور اكتمال التحقق وعرض تذكرتك للبيع. بعد إتمام بيع التذكرة، سيتم تحويل المبلغ إليك خلال مدة تتراوح بين يوم عمل واحد وثلاثة أيام عمل، وذلك حسب طريقة الدفع المختارة.",
    notice:
      "بتقديم هذا النموذج، فإنك تقرّ بأن التذكرة تعود ملكيتها لك وأنها أصلية وصالحة للاستخدام، وبأنك لم تقم ببيعها ولن تقوم ببيعها أو تحويلها أو إتاحتها لأي شخص آخر عبر أي وسيلة خارج هذه المنصة. وفي حال ثبت أن التذكرة غير صالحة أو تم بيعها في مكان آخر، فإنك تتحمّل كامل المسؤولية عن أي خسارة أو مطالبة تنشأ عن ذلك. سيتم تحويل المبلغ إليك عبر طريقة الدفع المحددة بعد إتمام بيع التذكرة. تُصرف المبالغ عادةً خلال مدة تتراوح بين يوم عمل واحد وثلاثة أيام عمل، وذلك حسب طريقة الدفع المختارة.",
  },
  subscribe: {
    title: "تنبيهات توفر التذاكر",
    subtitle:
      "يرجى إدخال البريد الإلكتروني وتاريخ السفر، وسيتم إشعارك فور توفر تذكرة مطابقة.",
    emailLabel: "البريد الإلكتروني",
    dateLabel: "تاريخ السفر",
    subscribingButton: "جارٍ الاشتراك…",
    notifyButton: "الاشتراك في التنبيهات",
    successMessage:
      "تم تأكيد اشتراكك بنجاح. سيتم إرسال إشعار إلى {{email}} فور توفر تذكرة بتاريخ {{date}}.",
    genericError: "تعذّر إتمام الاشتراك. يرجى المحاولة مرة أخرى لاحقًا.",
    privacyNote: "سيُستخدم بريدك الإلكتروني لغرض إشعارات توفر التذاكر فقط.",
  },
  checkout: {
    title: "إتمام عملية الشراء",
    nameLabel: "الاسم الكامل",
    emailLabel: "البريد الإلكتروني",
    preparingButton: "جارٍ تجهيز عملية الدفع…",
    continueButton: "المتابعة إلى الدفع",
    processingButton: "جارٍ معالجة الدفع…",
    confirmingMessage:
      "يتم التحقق من بطاقتك وتأكيد أن التذكرة ما زالت لك — قد يستغرق ذلك بضع ثوانٍ.",
    payButton: "دفع {{amount}}",
    paymentSuccess:
      "تمت عملية الدفع بنجاح. سيتم إرسال رسالة تأكيد تتضمن تفاصيل التذكرة إلى بريدك الإلكتروني.",
    paymentFailed:
      "تعذّر إتمام عملية الدفع. يرجى التحقق من بيانات الدفع والمحاولة مرة أخرى.",
    paymentLost:
      "أتم شخص آخر عملية الدفع لهذه التذكرة قبل لحظات منك. لم يتم خصم أي مبلغ من بطاقتك.",
    confirmTimeout:
      "ما زلنا نؤكد عملية الشراء. لم يتم خصم المبلغ مرتين — يرجى التحقق من بريدك الإلكتروني بعد قليل أو تحديث هذه الصفحة.",
    genericError: "تعذّر بدء عملية الدفع. يرجى المحاولة مرة أخرى لاحقًا.",
    troubleText: "هل تواجه مشكلة؟",
    backToBrowseLink: "العودة إلى قائمة التذاكر",
    secureNotice:
      "تتم معالجة جميع المدفوعات بصورة آمنة عبر مزوّد خدمات الدفع، ولا يتم تخزين بيانات بطاقتك على خوادمنا.",
    authenticityNotice:
      "جميع التذاكر المعروضة هنا تذاكر أصلية، وتمنع منصتنا بيع التذكرة نفسها أكثر من مرة. غير أننا لا نتحمّل المسؤولية إذا قام البائع ببيع التذكرة نفسها أو تحويلها بصورة منفصلة عبر أي وسيلة أخرى خارج هذه المنصة.",
  },
  ticketDetail: {
    buyButton: "شراء هذه التذكرة",
    reviewNote:
      "يرجى مراجعة تفاصيل الرحلة بعناية قبل إتمام عملية الشراء. سيتم إرسال رسالة تأكيد إلى بريدك الإلكتروني بعد إتمام الدفع.",
    authenticityNote:
      "جميع التذاكر المعروضة هنا تذاكر أصلية، وتمنع منصتنا بيع التذكرة نفسها أكثر من مرة. غير أننا لا نتحمّل المسؤولية إذا قام البائع ببيع التذكرة نفسها بصورة منفصلة خارج هذه المنصة.",
  },
  notFound: {
    title: "الصفحة غير موجودة",
    description: "الصفحة التي طلبتها غير متوفرة.",
    goHome: "العودة إلى الصفحة الرئيسية",
  },
  contact: {
    title: "تواصل معنا",
    subtitle: "في حال وجود أي استفسار أو حاجة إلى المساعدة، يرجى تقديم طلبك أدناه وسيقوم فريقنا بالرد في أقرب وقت ممكن.",
    nameLabel: "الاسم الكامل",
    emailLabel: "البريد الإلكتروني",
    messageLabel: "الرسالة",
    sendingButton: "جارٍ الإرسال…",
    sendButton: "إرسال الرسالة",
    successMessage: "تم استلام رسالتك بنجاح. سيقوم فريقنا بالرد على استفسارك في أقرب وقت ممكن.",
    genericError: "تعذّر إرسال رسالتك. يرجى المحاولة مرة أخرى لاحقًا.",
    directEmailLabel: "أو راسلنا مباشرة عبر البريد الإلكتروني:",
  },
  manageTicket: {
    title: "إدارة تذكرتي",
    subtitle: "يرجى إدخال الرمز المرجعي والبريد الإلكتروني للبائع المستخدم عند عرض التذكرة للاطلاع على تفاصيل تذكرتك وبيانات البائع، أو إزالتها من العرض، أو إعادة نشرها، أو تعديل السعر وبيانات الدفع.",
    pinLabel: "الرمز المرجعي",
    emailLabel: "البريد الإلكتروني للبائع",
    lookupButton: "البحث عن التذكرة",
    lookingUpButton: "جارٍ البحث…",
    lookupError: "تعذّر العثور على تذكرة بهذا الرمز والبريد الإلكتروني. يرجى التحقق منهما والمحاولة مرة أخرى.",
    statusForSale: "معروضة للبيع",
    statusSold: "تم بيعها",
    statusDeleted: "تمت إزالتها من العرض",
    statusProcessing: "قيد التحقق",
    statusRejected: "لم تتم الموافقة",
    pendingVerification: "بانتظار التحقق",
    processingNotice: "تذكرتك قيد التحقق حاليًا. تستغرق هذه العملية عادةً بضع دقائق فقط، وستصلك رسالة تأكيد عبر البريد الإلكتروني فور عرضها للبيع. يرجى المحاولة مرة أخرى بعد قليل.",
    rejectedNotice: "تعذّر عرض هذه التذكرة للبيع. يمكنك تقديمها مرة أخرى من صفحة بيع التذاكر.",
    rejectionReasonLabel: "السبب",
    soldNotice: "تم بيع هذه التذكرة بالفعل ولم يعد بالإمكان تعديلها. يرجى التواصل معنا إذا احتجت إلى المساعدة.",
    soldAtMessage: "تم البيع بتاريخ {{date}}.",
    sellerInfoTitle: "معلومات البائع",
    sellerEmailLabel: "البريد الإلكتروني للبائع",
    sellerPhoneLabel: "رقم هاتف البائع",
    currentPaymentMethodLabel: "طريقة الدفع",
    downloadButton: "تحميل ملف التذكرة",
    downloadingButton: "جارٍ تجهيز التحميل…",
    downloadError: "تعذّر تحميل ملف تذكرتك. يرجى المحاولة مرة أخرى لاحقًا.",
    deleteButton: "إزالة التذكرة من العرض",
    deleteConfirmMessage: "هل أنت متأكد من رغبتك في إزالة هذه التذكرة من العرض؟ لا يمكن التراجع عن هذا الإجراء.",
    confirmDeleteButton: "نعم، قم بالإزالة",
    deletingButton: "جارٍ الإزالة…",
    cancelButton: "إلغاء",
    republishButton: "إعادة نشر التذكرة",
    republishingButton: "جارٍ إعادة النشر…",
    republishSuccessMessage: "تمت إعادة نشر تذكرتك وأصبحت معروضة للبيع مرة أخرى.",
    republishError: "تعذّرت إعادة نشر تذكرتك. يرجى المحاولة مرة أخرى لاحقًا.",
    deleteSuccessMessage: "تمت إزالة تذكرتك من العرض.",
    deleteError: "تعذّر إزالة تذكرتك. يرجى المحاولة مرة أخرى لاحقًا.",
    modifyButton: "تعديل التذكرة",
    modifyingButton: "جارٍ الحفظ…",
    saveButton: "حفظ التغييرات",
    modifySuccessMessage: "تم تحديث بيانات الدفع الخاصة بك.",
    modifyError: "تعذّر تحديث بيانات الدفع. يرجى المحاولة مرة أخرى لاحقًا.",
    priceLimitNote: "لا يمكن أن يتجاوز السعر المطلوب سعر الشراء الأصلي للتذكرة.",
  },
};

const dictionaries: Record<Language, Dictionary> = { en, ar };

const pluralRules: Record<Language, Intl.PluralRules> = {
  en: new Intl.PluralRules("en"),
  ar: new Intl.PluralRules("ar"),
};

function interpolate(
  template: string,
  params?: Record<string, string | number>,
): string {
  if (!params) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (_, name: string) =>
    String(params[name] ?? ""),
  );
}

function getEntry(dict: Dictionary, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in acc)
      return (acc as Record<string, unknown>)[part];
    return undefined;
  }, dict);
}

export function translate(
  language: Language,
  key: string,
  params?: Record<string, string | number>,
): string {
  const entry = getEntry(dictionaries[language], key);

  if (typeof entry === "string") return interpolate(entry, params);

  if (
    entry &&
    typeof entry === "object" &&
    params &&
    typeof params.count === "number"
  ) {
    const forms = entry as PluralForms;
    const category = pluralRules[language].select(params.count);
    const template = forms[category] ?? forms.other;
    return interpolate(template, params);
  }

  return key;
}
