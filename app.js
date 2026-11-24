/* --- Пълни преводи (BG / EN) --- */
const translations = {
  bg: {
    nav_events: "Събития",
    nav_add: "+ Създай събитие",
    eyebrow_term: "Учебна 2026 / 2027",
    hero_title: "Предстоящи събития",
    hero_sub: "Клубове, работилници и турнири в училище — запази място с един клик.",
    stat_events: "Събития",
    stat_regs: "Записани",
    stat_spots: "Свободни",
    stat_venues: "Зали",
    search_placeholder: "Търси събитие...",
    sort_date: "По дата",
    sort_spots: "По свободни места",
    cat_all: "Всички",
    cat_tech: "Технологии",
    cat_culture: "Култура",
    cat_sport: "Спорт",
    status_open: "Свободни места",
    status_full: "Запълнено",
    spots_label: "Записани",
    btn_register: "Запиши се",
    btn_waitlist: "Списък за чакащи",
    modal_kicker: "Регистрация",
    label_student_name: "Име и фамилия",
    label_student_class: "Клас",
    placeholder_class: "напр. 10А",
    btn_cancel: "Отказ",
    btn_confirm: "Потвърди място",
    add_eyebrow: "Организатор",
    add_title: "Създай ново събитие",
    label_title: "Заглавие на събитието",
    label_desc: "Описание",
    label_date: "Дата и час",
    label_category: "Категория",
    label_venue: "Зала",
    label_capacity: "Макс. места",
    btn_create: "Публикувай събитието",
    preview_heading: "Преглед на живо",
    msg_empty: "Няма намерени събития.",
    msg_confirmed: "Успешно се записа за събитието!",
    msg_waitlist: "Добавен си в списъка за чакащи.",
    msg_created: "Събитието е добавено успешно!",
    footer_text: "EventHub School © 2026 • Максим & Кристиан (10. клас)"
  },
  en: {
    nav_events: "Events",
    nav_add: "+ Create Event",
    eyebrow_term: "Academic Year 2026 / 2027",
    hero_title: "Upcoming Events",
    hero_sub: "School clubs, workshops, and tournaments — reserve your spot in one click.",
    stat_events: "Events",
    stat_regs: "Registered",
    stat_spots: "Open Spots",
    stat_venues: "Rooms",
    search_placeholder: "Search events...",
    sort_date: "By date",
    sort_spots: "By open spots",
    cat_all: "All",
    cat_tech: "Technology",
    cat_culture: "Culture",
    cat_sport: "Sports",
    status_open: "Spots open",
    status_full: "Full",
    spots_label: "Registered",
    btn_register: "Register",
    btn_waitlist: "Join waitlist",
    modal_kicker: "Registration",
    label_student_name: "Full Name",
    label_student_class: "Class / Grade",
    placeholder_class: "e.g. 10A",
    btn_cancel: "Cancel",
    btn_confirm: "Confirm spot",
    add_eyebrow: "Organizer",
    add_title: "Create New Event",
    label_title: "Event Title",
    label_desc: "Description",
    label_date: "Date & Time",
    label_category: "Category",
    label_venue: "Room",
    label_capacity: "Max Capacity",
    btn_create: "Publish Event",
    preview_heading: "Live Preview",
    msg_empty: "No events found.",
    msg_confirmed: "Successfully registered!",
    msg_waitlist: "Added to the waitlist.",
    msg_created: "Event published successfully!",
    footer_text: "EventHub School © 2026 • Maxim & Kristian (10th Grade)"
  }
};

/* --- Вградени зали (Стая 300 – 310) --- */
const VENUES = [
  { id: "300", name: "Стая 300", room_number: "300" },
  { id: "301", name: "Стая 301", room_number: "301" },
  { id: "302", name: "Стая 302", room_number: "302" },
  { id: "303", name: "Стая 303", room_number: "303" },
  { id: "304", name: "Стая 304", room_number: "304" },
  { id: "305", name: "Стая 305", room_number: "305" },
  { id: "306", name: "Стая 306", room_number: "306" },
  { id: "307", name: "Стая 307", room_number: "307" },
  { id: "308", name: "Стая 308", room_number: "308" },
  { id: "309", name: "Стая 309", room_number: "309" },
  { id: "310", name: "Стая 310", room_number: "310" }
];

/* --- Примерни начални събития --- */
const DEFAULT_EVENTS = [
  {
    id: "ev-1",
    title: "Клуб по програмиране",
    description: "Въведение в JavaScript и уеб разработка за начинаещи.",
    event_date: "2026-12-01T14:30",
    category: "Технологии",
    venue_id: "300",
    max_capacity: 20,
    registrations: []
  },
  {
    id: "ev-2",
    title: "Литературна вечер",
    description: "Четене и обсъждане на съвременни разкази.",
    event_date: "2026-12-03T16:00",
    category: "Култура",
    venue_id: "305",
    max_capacity: 25,
    registrations: []
  }
];

let currentLang = localStorage.getItem("lang") || "bg";
let currentTheme = localStorage.getItem("theme") || "light";
let activeCategory = "all";
let selectedEventForReg = null;

function getStoredEvents() {
  const raw = localStorage.getItem("eventhub_events");
  if (!raw) {
    localStorage.setItem("eventhub_events", JSON.stringify(DEFAULT_EVENTS));
    return [...DEFAULT_EVENTS];
  }
  return JSON.parse(raw);
}

function saveEvents(events) {
  localStorage.setItem("eventhub_events", JSON.stringify(events));
}

function getVenueById(id) {
  return VENUES.find((v) => v.id === String(id)) || { name: "—", room_number: "" };
}

/* --- Night Mode --- */
function applyTheme() {
  document.documentElement.setAttribute("data-theme", currentTheme);
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) themeBtn.textContent = currentTheme === "dark" ? "☀️" : "🌙";
}

/* --- Езиков превключвател (BG/EN) --- */
function applyTranslations() {
  const t = translations[currentLang] || translations.bg;
  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) el.textContent = t[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (t[key]) el.placeholder = t[key];
  });

  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) langBtn.textContent = currentLang === "bg" ? "EN" : "BG";
}

function initControls() {
  applyTheme();
  applyTranslations();

  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", currentTheme);
    applyTheme();
  });

  document.getElementById("lang-toggle")?.addEventListener("click", () => {
    currentLang = currentLang === "bg" ? "en" : "bg";
    localStorage.setItem("lang", currentLang);
    applyTranslations();
    if (document.getElementById("events-grid")) renderEvents();
  });
}

/* --- Toast известия --- */
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  setTimeout(() => toast.classList.remove("show"), 3200);
}

/* --- Категории --- */
function getCategoryMeta(cat) {
  const t = translations[currentLang] || translations.bg;
  if (cat === "Технологии") return { cls: "badge-tech", cover: "cover-tech", label: t.cat_tech };
  if (cat === "Култура") return { cls: "badge-culture", cover: "cover-culture", label: t.cat_culture };
  if (cat === "Спорт") return { cls: "badge-sport", cover: "cover-sport", label: t.cat_sport };
  return { cls: "badge-default", cover: "cover-default", label: cat };
}

/* --- Статистика --- */
function updateStats(events) {
  let totalRegs = 0;
  let totalFreeSpots = 0;

  events.forEach((ev) => {
    const confirmed = (ev.registrations || []).filter((r) => r.status === "confirmed").length;
    totalRegs += (ev.registrations || []).length;
    totalFreeSpots += Math.max(0, ev.max_capacity - confirmed);
  });

  const setStat = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setStat("stat-events", events.length);
  setStat("stat-regs", totalRegs);
  setStat("stat-spots", totalFreeSpots);
  setStat("stat-venues", VENUES.length);
}

/* --- Визуализация на събитията --- */
function renderEvents() {
  const grid = document.getElementById("events-grid");
  if (!grid) return;

  const allEvents = getStoredEvents();
  updateStats(allEvents);

  const t = translations[currentLang];
  const search = (document.getElementById("search-input")?.value || "").toLowerCase();
  const sortBy = document.getElementById("sort-select")?.value || "date";

  let filtered = allEvents.filter((ev) => {
    const matchesSearch =
      ev.title.toLowerCase().includes(search) ||
      (ev.description || "").toLowerCase().includes(search);
    const matchesCat = activeCategory === "all" || ev.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  if (sortBy === "spots") {
    filtered.sort((a, b) => {
      const freeA = a.max_capacity - (a.registrations || []).filter((r) => r.status === "confirmed").length;
      const freeB = b.max_capacity - (b.registrations || []).filter((r) => r.status === "confirmed").length;
      return freeB - freeA;
    });
  } else {
    filtered.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
  }

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="color:var(--muted); grid-column:1/-1; text-align:center; padding:3rem 1rem;">${t.msg_empty}</p>`;
    return;
  }

  grid.innerHTML = filtered
    .map((ev) => {
      const venue = getVenueById(ev.venue_id);
      const confirmedCount = (ev.registrations || []).filter((r) => r.status === "confirmed").length;
      const isFull = confirmedCount >= ev.max_capacity;
      const pct = Math.min(100, Math.round((confirmedCount / ev.max_capacity) * 100));
      const fillClass = pct >= 100 ? "fill-red" : pct >= 75 ? "fill-amber" : "fill-green";
      const catMeta = getCategoryMeta(ev.category);
      const dateStr = new Date(ev.event_date).toLocaleString(currentLang === "bg" ? "bg-BG" : "en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
      });

      return `
        <article class="card">
          <div class="card-cover ${catMeta.cover}">
            <span class="badge ${catMeta.cls}">
              <span class="dot"></span>${catMeta.label}
            </span>
            <span class="status-tag ${isFull ? "status-full" : "status-open"}">
              ${isFull ? t.status_full : t.status_open}
            </span>
          </div>

          <div class="card-body">
            <div class="card-time">${dateStr}</div>
            <h3>${ev.title}</h3>
            <p class="card-desc">${ev.description || ""}</p>

            <div class="card-footer">
              <div class="venue-line">
                <span>📍</span>
                <span>${venue.name}</span>
              </div>

              <div class="capacity-wrap">
                <div class="capacity-text">
                  <span>${t.spots_label}</span>
                  <span>${confirmedCount} / ${ev.max_capacity}</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill ${fillClass}" style="width: ${pct}%"></div>
                </div>
              </div>

              <button class="btn-primary ${isFull ? "btn-waitlist" : ""}" data-id="${ev.id}">
                ${isFull ? t.btn_waitlist : t.btn_register}
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  grid.querySelectorAll("button[data-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const ev = allEvents.find((e) => e.id === btn.dataset.id);
      if (ev) openRegModal(ev);
    });
  });
}

/* --- Модал за записване --- */
function openRegModal(ev) {
  selectedEventForReg = ev;
  document.getElementById("modal-event-name").textContent = ev.title;
  document.getElementById("reg-modal").classList.add("open");
}

function closeRegModal() {
  document.getElementById("reg-modal")?.classList.remove("open");
}

document.getElementById("close-modal")?.addEventListener("click", closeRegModal);
document.getElementById("cancel-modal")?.addEventListener("click", closeRegModal);

document.getElementById("reg-modal")?.addEventListener("click", (e) => {
  if (e.target.id === "reg-modal") closeRegModal();
});

document.getElementById("reg-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!selectedEventForReg) return;

  const student_name = document.getElementById("reg-name").value.trim();
  const student_class = document.getElementById("reg-class").value.trim();

  const events = getStoredEvents();
  const target = events.find((ev) => ev.id === selectedEventForReg.id);
  if (!target) return;

  const confirmedCount = (target.registrations || []).filter((r) => r.status === "confirmed").length;
  const status = confirmedCount >= target.max_capacity ? "waitlist" : "confirmed";

  target.registrations = target.registrations || [];
  target.registrations.push({ student_name, student_class, status });
  saveEvents(events);

  closeRegModal();
  e.target.reset();

  const t = translations[currentLang];
  showToast(status === "confirmed" ? t.msg_confirmed : t.msg_waitlist, status === "confirmed" ? "success" : "warning");
  renderEvents();
});

/* --- Филтри и търсене --- */
document.getElementById("search-input")?.addEventListener("input", renderEvents);
document.getElementById("sort-select")?.addEventListener("change", renderEvents);
document.querySelectorAll("#category-pills .pill").forEach((pill) => {
  pill.addEventListener("click", () => {
    document.querySelectorAll("#category-pills .pill").forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");
    activeCategory = pill.dataset.cat;
    renderEvents();
  });
});

/* --- Страница за добавяне на събитие --- */
function initAddEventPage() {
  const venueSelect = document.getElementById("venue_id");
  const form = document.getElementById("add-event-form");
  if (!venueSelect || !form) return;

  venueSelect.innerHTML = VENUES
    .map((v) => `<option value="${v.id}">${v.name}</option>`)
    .join("");

  const updatePreview = () => {
    const cat = document.getElementById("category").value;
    const catMeta = getCategoryMeta(cat);

    const cover = document.getElementById("prev-cover");
    if (cover) cover.className = `card-cover ${catMeta.cover}`;

    const badge = document.getElementById("prev-cat");
    if (badge) {
      badge.className = `badge ${catMeta.cls}`;
      badge.innerHTML = `<span class="dot"></span>${catMeta.label}`;
    }

    const setEl = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    setEl("prev-title", document.getElementById("title").value || "Заглавие на събитието");
    setEl("prev-desc", document.getElementById("description").value || "Описанието ще се появи тук...");

    const dateVal = document.getElementById("event_date").value;
    setEl(
      "prev-date",
      dateVal
        ? new Date(dateVal).toLocaleString(currentLang === "bg" ? "bg-BG" : "en-US", {
            weekday: "short",
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit"
          })
        : "Избери дата и час"
    );

    const venueText = venueSelect.options[venueSelect.selectedIndex]?.text || "Стая 300";
    setEl("prev-venue", venueText);
    setEl("prev-cap", `0 / ${document.getElementById("max_capacity").value || 20}`);
  };

  form.addEventListener("input", updatePreview);
  updatePreview();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const events = getStoredEvents();
    const newEvent = {
      id: "ev-" + Date.now(),
      title: document.getElementById("title").value.trim(),
      description: document.getElementById("description").value.trim(),
      event_date: document.getElementById("event_date").value,
      category: document.getElementById("category").value,
      venue_id: venueSelect.value,
      max_capacity: parseInt(document.getElementById("max_capacity").value, 10) || 20,
      registrations: []
    };

    events.push(newEvent);
    saveEvents(events);
    showToast(translations[currentLang].msg_created, "success");
    setTimeout(() => (window.location.href = "../index.html"), 700);
  });
}

/* --- Старт --- */
initControls();
renderEvents();
initAddEventPage();