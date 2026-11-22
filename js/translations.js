const translations = {
  bg: {
    brand: "EventHub School",
    navHome: "Събития",
    navAdd: "Добави събитие",
    heroTitle: "Предстоящи училищни събития",
    heroSubtitle: "Разгледай календара, филтрирай по категория и се запиши с един клик.",
    searchPlaceholder: "Търси събитие...",
    allCategories: "Всички категории",
    catTech: "Технологии",
    catCulture: "Култура",
    catSport: "Спорт",
    dateLabel: "Дата",
    venueLabel: "Зала",
    spotsLabel: "Места",
    waitlistTag: "Списък на чакащите",
    registerBtn: "Запиши се",
    joinWaitlistBtn: "Запиши се в чакащи",
    addTitle: "Създай ново събитие",
    labelTitle: "Заглавие на събитието",
    labelDesc: "Описание",
    labelDate: "Дата и час",
    labelCategory: "Категория",
    labelVenue: "Зала / Кабинет",
    labelMax: "Макс. участници",
    submitBtn: "Запази събитието",
    noEvents: "Няма намерени събития.",
    errorLoad: "Грешка при зареждане на данните от Supabase.",
    errorSave: "Грешка при записване.",
    eventCreated: "Събитието е добавено успешно!",
    promptName: "Въведете вашето име:",
    promptClass: "Въведете вашия клас (напр. 10А):",
    savedConfirmed: "Успешно се записахте за събитието!",
    savedWaitlist: "Местата са заети — добавени сте в списъка на чакащите!"
  },
  en: {
    brand: "EventHub School",
    navHome: "Events",
    navAdd: "Add Event",
    heroTitle: "Upcoming School Events",
    heroSubtitle: "Browse the calendar, filter by category, and register in one click.",
    searchPlaceholder: "Search events...",
    allCategories: "All categories",
    catTech: "Technology",
    catCulture: "Culture",
    catSport: "Sports",
    dateLabel: "Date",
    venueLabel: "Venue",
    spotsLabel: "Spots",
    waitlistTag: "Waitlist",
    registerBtn: "Register",
    joinWaitlistBtn: "Join Waitlist",
    addTitle: "Create New Event",
    labelTitle: "Event Title",
    labelDesc: "Description",
    labelDate: "Date & Time",
    labelCategory: "Category",
    labelVenue: "Venue / Room",
    labelMax: "Max Participants",
    submitBtn: "Save Event",
    noEvents: "No events found.",
    errorLoad: "Failed to load data from Supabase.",
    errorSave: "Failed to save data.",
    eventCreated: "Event created successfully!",
    promptName: "Enter your name:",
    promptClass: "Enter your class (e.g. 10A):",
    savedConfirmed: "You are successfully registered!",
    savedWaitlist: "Event is full — you have been added to the waitlist!"
  }
};

let currentLang = localStorage.getItem("lang") || "bg";

export function t(key) {
  return translations[currentLang][key] || key;
}

export function applyTranslations() {
  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  const btn = document.getElementById("languageToggle");
  if (btn) btn.textContent = currentLang === "bg" ? "EN" : "BG";
}

export function initLanguage(onChangeCallback) {
  applyTranslations();
  const btn = document.getElementById("languageToggle");
  if (btn) {
    btn.addEventListener("click", () => {
      currentLang = currentLang === "bg" ? "en" : "bg";
      localStorage.setItem("lang", currentLang);
      applyTranslations();
      if (onChangeCallback) onChangeCallback();
    });
  }
}