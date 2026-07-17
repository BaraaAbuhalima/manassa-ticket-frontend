export type Language = "en" | "ar";

export const languages: Language[] = ["ar", "en"];

type PluralForms = Partial<Record<Intl.LDMLPluralRule, string>> & {
  other: string;
};

interface Dictionary {
  nav: {
    findDate: string;
    browse: string;
    sell: string;
    subscribe: string;
    manageTicket: string;
    contact: string;
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
    back: string;
    price: string;
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
  };
  browse: {
    title: string;
    searchButton: string;
  };
  findDate: {
    title: string;
    subtitle: string;
    searchButton: string;
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
    payButton: string;
    paymentSuccess: string;
    paymentFailed: string;
    genericError: string;
    troubleText: string;
    backToBrowseLink: string;
    secureNotice: string;
  };
  ticketDetail: {
    buyButton: string;
    reviewNote: string;
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
  };
  manageTicket: {
    title: string;
    subtitle: string;
    pinLabel: string;
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
    findDate: "Find a Ticket",
    browse: "Browse Tickets",
    sell: "Sell a Ticket",
    subscribe: "Ticket Alerts",
    manageTicket: "Manage My Ticket",
    contact: "Contact Us",
  },
  footer: {
    tagline:
      "Jett Ticket Exchange — a marketplace for the resale of travel tickets.",
    copyright: "© {{year}} Jett Ticket Exchange. All rights reserved.",
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
    back: "Back",
    price: "Price",
    bag: {
      one: "{{count}} bag included",
      other: "{{count}} bags included",
    },
    registerAlertButton: "Register for a Ticket Alert",
  },
  home: {
    title: "A Trusted Marketplace for Ticket Resale",
    subtitle:
      "Jett Ticket Exchange enables travellers to resell tickets they are no longer able to use, and assists others in securing tickets for their preferred travel dates.",
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
  },
  browse: {
    title: "Browse Tickets",
    searchButton: "Search Tickets",
  },
  findDate: {
    title: "Find a Ticket",
    subtitle:
      "Select your travel date to view the tickets currently available for purchase.",
    searchButton: "Find Tickets",
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
    priceLimitNote: "Your asking price cannot exceed the ticket's original purchase price by more than 1 JOD.",
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
      "By submitting this form, you confirm that the ticket belongs to you and is valid for use. Payment will be transferred to you through your selected payment method once your ticket has been sold. Funds are typically disbursed within 1 to 3 business days, depending on the payment method selected.",
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
    payButton: "Pay {{amount}}",
    paymentSuccess:
      "Your payment has been completed successfully. A confirmation email containing your ticket details has been sent to the email address provided.",
    paymentFailed:
      "The payment could not be completed. Please verify your payment details and try again.",
    genericError:
      "The checkout process could not be initiated. Please try again later.",
    troubleText: "Experiencing difficulties?",
    backToBrowseLink: "Return to ticket listings",
    secureNotice:
      "All payments are processed securely by our payment provider. Your card details are not stored on our servers.",
  },
  ticketDetail: {
    buyButton: "Purchase This Ticket",
    reviewNote:
      "Please review the travel details carefully before proceeding. A confirmation email will be sent to you upon successful payment.",
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
  },
  manageTicket: {
    title: "Manage My Ticket",
    subtitle: "Enter your reference PIN to view your ticket and seller details, remove it from sale, republish it, or modify the price and payment details.",
    pinLabel: "Reference PIN",
    lookupButton: "Look Up Ticket",
    lookingUpButton: "Looking Up…",
    lookupError: "No ticket could be found for the PIN provided. Please verify the PIN and try again.",
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
    priceLimitNote: "You can raise the price by at most 1 JOD above the ticket's original purchase price.",
  },
};

const ar: Dictionary = {
  nav: {
    findDate: "البحث عن تذكرة",
    browse: "تصفح التذاكر",
    sell: "بيع تذكرة",
    subscribe: "تنبيهات التذاكر",
    manageTicket: "إدارة تذكرتي",
    contact: "تواصل معنا",
  },
  footer: {
    tagline: "Jett Ticket Exchange — منصة  لإعادة بيع تذاكر السفر.",
    copyright: "© {{year}} Jett Ticket Exchange. جميع الحقوق محفوظة.",
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
    back: "رجوع",
    price: "السعر",
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
    title: "منصة موثوقة لإعادة بيع تذاكر السفر",
    subtitle:
      "تتيح منصة Jett Ticket Exchange للمسافرين إعادة بيع التذاكر التي لم يعودوا بحاجة إليها، وتساعد الراغبين في الحصول على تذاكر في تواريخ سفرهم المفضلة.",
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
  },
  browse: {
    title: "تصفح التذاكر",
    searchButton: "البحث عن التذاكر",
  },
  findDate: {
    title: "البحث عن تذكرة",
    subtitle:
      "يرجى اختيار تاريخ السفر للاطلاع على التذاكر المتاحة للشراء في ذلك اليوم.",
    searchButton: "البحث عن التذاكر",
  },
  sell: {
    title: "بيع تذكرتك",
    subtitle: "يرجى رفع ملف التذكرة، وسيتم استخراج تفاصيل الرحلة منه تلقائيًا.",
    fileLabel: "ملف التذكرة (PDF)",
    nameLabel: "الاسم الكامل",
    emailLabel: "البريد الإلكتروني",
    phoneLabel: "رقم الهاتف",
    priceLabel: "السعر المطلوب (دينار أردني)",
    priceLimitNote: "لا يمكن أن يتجاوز السعر المطلوب سعر الشراء الأصلي للتذكرة بأكثر من دينار أردني واحد.",
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
      "بتقديم هذا النموذج، فإنك تقرّ بأن التذكرة تعود ملكيتها لك وأنها صالحة للاستخدام. سيتم تحويل المبلغ إليك عبر طريقة الدفع المحددة بعد إتمام بيع التذكرة. تُصرف المبالغ عادةً خلال مدة تتراوح بين يوم عمل واحد وثلاثة أيام عمل، وذلك حسب طريقة الدفع المختارة.",
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
    payButton: "دفع {{amount}}",
    paymentSuccess:
      "تمت عملية الدفع بنجاح. سيتم إرسال رسالة تأكيد تتضمن تفاصيل التذكرة إلى بريدك الإلكتروني.",
    paymentFailed:
      "تعذّر إتمام عملية الدفع. يرجى التحقق من بيانات الدفع والمحاولة مرة أخرى.",
    genericError: "تعذّر بدء عملية الدفع. يرجى المحاولة مرة أخرى لاحقًا.",
    troubleText: "هل تواجه مشكلة؟",
    backToBrowseLink: "العودة إلى قائمة التذاكر",
    secureNotice:
      "تتم معالجة جميع المدفوعات بصورة آمنة عبر مزوّد خدمات الدفع، ولا يتم تخزين بيانات بطاقتك على خوادمنا.",
  },
  ticketDetail: {
    buyButton: "شراء هذه التذكرة",
    reviewNote:
      "يرجى مراجعة تفاصيل الرحلة بعناية قبل إتمام عملية الشراء. سيتم إرسال رسالة تأكيد إلى بريدك الإلكتروني بعد إتمام الدفع.",
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
  },
  manageTicket: {
    title: "إدارة تذكرتي",
    subtitle: "يرجى إدخال الرمز المرجعي للاطلاع على تفاصيل تذكرتك وبيانات البائع، أو إزالتها من العرض، أو إعادة نشرها، أو تعديل السعر وبيانات الدفع.",
    pinLabel: "الرمز المرجعي",
    lookupButton: "البحث عن التذكرة",
    lookingUpButton: "جارٍ البحث…",
    lookupError: "تعذّر العثور على تذكرة بهذا الرمز. يرجى التحقق من الرمز والمحاولة مرة أخرى.",
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
    priceLimitNote: "يمكنك رفع السعر بحد أقصى دينار أردني واحد فوق سعر الشراء الأصلي للتذكرة.",
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
