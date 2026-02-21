import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// ===============================
// Firebase config
// ===============================
const firebaseConfig = {
  apiKey: "AIzaSyCSx9urSfeXtcQSQ46MzOu9k0XeSKyGUE8",
  authDomain: "marissa-joel-wedding.firebaseapp.com",
  projectId: "marissa-joel-wedding",
  storageBucket: "marissa-joel-wedding.firebasestorage.app",
  messagingSenderId: "850222081002",
  appId: "1:850222081002:web:d64d79a9c95e4da6e88893"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ===============================
// DOM elements
// ===============================
const rowsEl = document.getElementById("rows");
const statusMsg = document.getElementById("statusMsg");
const searchEl = document.getElementById("search");
const countPill = document.getElementById("countPill");
const exportBtn = document.getElementById("exportBtn");

// If these are null, your HTML IDs don't match.
if (!rowsEl || !statusMsg || !searchEl || !countPill || !exportBtn) {
  console.error("Missing one or more required HTML elements (rows/statusMsg/search/countPill/exportBtn).");
}

// ===============================
// Helpers
// ===============================
let allDocs = [];

function safe(v) {
  return (v ?? "").toString();
}

function toDateString(createdAt) {
  if (!createdAt) return "";
  if (typeof createdAt.toDate === "function") return createdAt.toDate().toLocaleString();
  try { return new Date(createdAt).toLocaleString(); } catch { return ""; }
}

function render(list) {
  rowsEl.innerHTML = "";
  countPill.textContent = `${list.length}`;

  for (const d of list) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${safe(toDateString(d.createdAt))}</td>
      <td>${safe(d.firstName)}</td>
      <td>${safe(d.lastName)}</td>
      <td>${safe(d.email)}</td>
      <td>${safe(d.phone)}</td>
      <td>${safe(d.attendance)}</td>
      <td>${safe(d.main)}</td>
      <td>${safe(d.side)}</td>
      <td>${safe(d.desert)}</td>
      <td>${safe(d.comment)}</td>
    `;
    rowsEl.appendChild(tr);
  }
}

function applySearch() {
  const s = searchEl.value.trim().toLowerCase();
  if (!s) {
    render(allDocs);
    return;
  }

  const filtered = allDocs.filter(d => {
    const hay = [
      d.firstName, d.lastName, d.email, d.phone,
      d.attendance, d.main, d.side, d.desert, d.comment
    ].map(x => safe(x).toLowerCase()).join(" | ");
    return hay.includes(s);
  });

  render(filtered);
}

function downloadCSV(data) {
  const headers = ["createdAt","firstName","lastName","email","phone","attendance","main","side","desert","comment"];
  const lines = [headers.join(",")];

  for (const d of data) {
    const row = [
      toDateString(d.createdAt),
      d.firstName, d.lastName, d.email, d.phone,
      d.attendance, d.main, d.side, d.desert, d.comment
    ].map(v => `"${safe(v).replace(/"/g, '""')}"`);
    lines.push(row.join(","));
  }

  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "rsvp_responses.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}

// ===============================
// Firestore live query (newest first)
// ===============================
statusMsg.textContent = "Loading…";


const q = query(collection(db, "rsvps"), orderBy("createdAt", "desc"));

onSnapshot(
  q,
  (snap) => {
    allDocs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    statusMsg.textContent = `Loaded ${allDocs.length} RSVP(s).`;
    applySearch();
  },
  (err) => {
    console.error(err);
    statusMsg.textContent = "Error loading RSVPs (check Firestore rules + createdAt field).";
  }
);

// ===============================
// UI hooks
// ===============================
searchEl.addEventListener("input", applySearch);
exportBtn.addEventListener("click", () => downloadCSV(allDocs));