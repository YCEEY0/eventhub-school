import { supabase } from "./supabase-client.js";
import { t, initLanguage } from "./translations.js";

let allEvents = [];

document.addEventListener("DOMContentLoaded", () => {
  initLanguage(renderEvents);

  if (document.getElementById("eventsList")) {
    loadEvents();
    document.getElementById("searchInput").addEventListener("input", renderEvents);
    document.getElementById("categoryFilter").addEventListener("change", renderEvents);
  }

  if (document.getElementById("addEventForm")) {
    loadVenues();
    document.getElementById("addEventForm").addEventListener("submit", handleAddEvent);
  }
});

// Четене на събития + свързаната зала + записванията (SELECT)
async function loadEvents() {
  const container = document.getElementById("eventsList");
  const { data, error } = await supabase
    .from("events")
    .select("*, venues(name, location), registrations(id, status)")
    .order("event_date", { ascending: true });

  if (error) {
    console.error(error);
    container.innerHTML = `<p class="error">${t("errorLoad")}</p>`;
    return;
  }

  allEvents = data || [];
  renderEvents();
}

// Филтриране и показване на събитията
function renderEvents() {
  const container = document.getElementById("eventsList");
  if (!container) return;

  const query = (document.getElementById("searchInput")?.value || "").toLowerCase();
  const category = document.getElementById("categoryFilter")?.value || "all";

  const filtered = allEvents.filter((ev) => {
    const matchesText = ev.title.toLowerCase().includes(query) ||
      (ev.description || "").toLowerCase().includes(query);
    const matchesCat = category === "all" || ev.category === category;
    return matchesText && matchesCat;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<p>${t("noEvents")}</p>`;
    return;
  }

  container.innerHTML = filtered.map((ev) => {
    const confirmedCount = (ev.registrations || []).filter(r => r.status === "confirmed").length;
    const isFull = confirmedCount >= ev.max_participants;
    const dateStr = new Date(ev.event_date).toLocaleString("bg-BG", {
      dateStyle: "medium",
      timeStyle: "short"
    });

    return `
      <article class="card">
        <span class="badge">${ev.category.toUpperCase()}</span>
        <h3>${ev.title}</h3>
        <p>${ev.description || ""}</p>
        <p><strong>${t("dateLabel")}:</strong> ${dateStr}</p>
        <p><strong>${t("venueLabel")}:</strong> ${ev.venues?.name || "-"} (${ev.venues?.location || ""})</p>
        <p><strong>${t("spotsLabel")}:</strong> ${confirmedCount} / ${ev.max_participants}
          ${isFull ? `<span class="waitlist-tag">(${t("waitlistTag")})</span>` : ""}
        </p>
        <button class="btn register-btn" data-id="${ev.id}" data-full="${isFull}">
          ${isFull ? t("joinWaitlistBtn") : t("registerBtn")}
        </button>
      </article>
    `;
  }).join("");

  document.querySelectorAll(".register-btn").forEach((btn) => {
    btn.addEventListener("click", () => handleRegister(btn.dataset.id, btn.dataset.full === "true"));
  });
}

// Записване за събитие с базов алгоритъм за капацитет / waitlist (INSERT)
async function handleRegister(eventId, isFull) {
  const studentName = prompt(t("promptName"));
  if (!studentName) return;
  const studentClass = prompt(t("promptClass"));
  if (!studentClass) return;

  const status = isFull ? "waitlist" : "confirmed";
  const { error } = await supabase.from("registrations").insert([
    { event_id: Number(eventId), student_name: studentName.trim(), student_class: studentClass.trim(), status }
  ]);

  if (error) {
    alert(t("errorSave"));
    console.error(error);
  } else {
    alert(isFull ? t("savedWaitlist") : t("savedConfirmed"));
    loadEvents();
  }
}

// Зареждане на залите за падащото меню във втория екран
async function loadVenues() {
  const select = document.getElementById("venueSelect");
  const { data, error } = await supabase.from("venues").select("id, name, capacity");
  if (error || !data) return;

  select.innerHTML = data
    .map((v) => `<option value="${v.id}">${v.name} (макс. ${v.capacity})</option>`)
    .join("");
}

// Добавяне на ново събитие (INSERT)
async function handleAddEvent(e) {
  e.preventDefault();
  const msg = document.getElementById("formMessage");

  const newEvent = {
    title: document.getElementById("title").value.trim(),
    description: document.getElementById("description").value.trim(),
    event_date: document.getElementById("eventDate").value,
    category: document.getElementById("category").value,
    venue_id: Number(document.getElementById("venueSelect").value),
    max_participants: Number(document.getElementById("maxParticipants").value)
  };

  const { error } = await supabase.from("events").insert([newEvent]);
  if (error) {
    console.error(error);
    msg.textContent = t("errorSave");
    msg.className = "error";
  } else {
    msg.textContent = t("eventCreated");
    msg.className = "success";
    e.target.reset();
  }
}