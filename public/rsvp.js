// ===============================
// Firebase imports (CDN)
// ===============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// ===============================
// Firebase configuration
// ===============================
const firebaseConfig = {
  apiKey: "AIzaSyCSx9urSfeXtcQSQ46MzOu9k0XeSKyGUE8",
  authDomain: "marissa-joel-wedding.firebaseapp.com",
  projectId: "marissa-joel-wedding",
  storageBucket: "marissa-joel-wedding.firebasestorage.app",
  messagingSenderId: "850222081002",
  appId: "1:850222081002:web:d64d79a9c95e4da6e88893"
};

// ===============================
// Initialize Firebase
// ===============================
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ===============================
// DOM elements
// ===============================
const form = document.getElementById("rsvpForm");
const statusMsg = document.getElementById("statusMsg");

// Safety check
if (!form) {
  console.error("Form with id='rsvpForm' not found in HTML.");
}

// ===============================
// Form submit handler
// ===============================
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // prevent page reload

  // Read input values
  const firstName = document.getElementById("name").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const attendance = document.getElementById("attendance").value;

  // Basic validation
  if (!firstName || !lastName || !email || !attendance) {
    statusMsg.textContent = "Please fill out all fields.";
    statusMsg.style.color = "red";
    return;
  }

  try {
    statusMsg.textContent = "Submitting...";
    statusMsg.style.color = "black";

    // Prevent duplicate RSVP by email
    const q = query(
      collection(db, "rsvps"),
      where("email", "==", email)
    );
    const existing = await getDocs(q);

    if (!existing.empty) {
      statusMsg.textContent = "This email has already RSVP’d.";
      statusMsg.style.color = "orange";
      return;
    }

    // Save RSVP to Firestore
    await addDoc(collection(db, "rsvps"), {
      firstName,
      lastName,
      email,
      attendance,          // "yes" or "no"
      createdAt: serverTimestamp()
    });

    statusMsg.textContent = "RSVP saved! 🎉 Thank you!";
    statusMsg.style.color = "green";
    form.reset();

  } catch (error) {
    console.error("Firebase error:", error);
    statusMsg.textContent = "Something went wrong. Please try again.";
    statusMsg.style.color = "red";
  }
});
