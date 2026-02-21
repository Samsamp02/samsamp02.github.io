// ===============================
// Firebase imports (CDN)
// ===============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
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
loadInvitedPhones();

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
//show food options if attending
// ===============================
const attendanceSelect = document.getElementById("attendance");
const foodChoicesWrap = document.getElementById("foodChoices");
const mainSelect = document.getElementById("main");
const sideSelect = document.getElementById("side");
const desertSelect = document.getElementById("desert");

attendanceSelect.addEventListener("change", () => {
  const isYes = attendanceSelect.value === "yes";
  console.log("Attendance changed:", attendanceSelect.value, "Show food choices?", isYes);
  if (isYes) {
    foodChoicesWrap.style.display = "block";
    foodChoicesWrap.classList.add("is-visible");
  } else {
    foodChoicesWrap.style.display = "none";
    foodChoicesWrap.classList.remove("is-visible");

    // Reset choices if they switch to "no"
    mainSelect.value = "";
    sideSelect.value = "";
    desertSelect.value = "";

  }
});
if (attendanceSelect.value === "yes") {
  foodChoicesWrap.style.display = "block";
  foodChoicesWrap.classList.add("is-visible");
}

const PhoneFormatted = false;
document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.getElementById("phone");
  const phoneError = statusMsg;

  // Debug: confirm we found the input
  console.log("phoneInput found?", phoneInput);

  if (!phoneInput) return; // stops if id doesn't match

  phoneInput.addEventListener("input", (e) => {
    let numbers = e.target.value.replace(/\D/g, "");
    numbers = numbers.substring(0, 11);
    const aussieCheckbox = document.getElementById("aussie");
    const aussieLabel = document.getElementById("aussie-label");
    
    let formatted = numbers;
    if (numbers.length > 10) {//aussie case
      formatted = `${numbers.slice(0,4)}-${numbers.slice(4,7)}-${numbers.slice(7)}`;
      statusMsg.textContent = "Please verify your phone number is correct (aussie case).";
      statusMsg.style.color = "orange";
     
      aussieCheckbox.style.display = "inline-block";
      aussieLabel.style.display = "inline-block";

    }else if (numbers.length === 10) {
      formatted = `${numbers.slice(0,3)}-${numbers.slice(3,6)}-${numbers.slice(6)}`;
      statusMsg.textContent = "";
      aussieCheckbox.checked = false;
      aussieCheckbox.style.display = "none";
      aussieLabel.style.display = "none";
  
    }
    else if (numbers.length > 6 && numbers.length <= 10) {
      formatted = `${numbers.slice(0,3)}-${numbers.slice(3,6)}-${numbers.slice(6)}`;
      statusMsg.textContent = "Please enter valid phone number.";
      aussieCheckbox.style.display = "none";
      aussieLabel.style.display = "none";
       statusMsg.style.color = "black";
    } else if (numbers.length > 3) {
      formatted = `${numbers.slice(0,3)}-${numbers.slice(3)}`;
      statusMsg.textContent = "Please enter valid phone number.";
      aussieCheckbox.style.display = "none";
      aussieLabel.style.display = "none";
       statusMsg.style.color = "black";
    }else if (numbers.length > 0) {
       statusMsg.textContent = "Please enter valid phone number.";
       statusMsg.style.color = "black";
    }else{
      statusMsg.textContent = "";
    }

    e.target.value = formatted;

    if (!invitedPhones.has(formatted)) {
        statusMsg.textContent = "Sorry — this phone number is not on the invite list.";
        statusMsg.style.color = "red";
      } else {
       statusMsg.textContent = "Phone verified! You are on the invite list.";
        statusMsg.style.color = "green";
      }

    });
});


//phone verification before submit
form.addEventListener("phone", async (e) => {
  const phoneInput = document.getElementById("phone").value;

});


// ===============================
// Form submit handler
// ===============================
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // prevent page reload

  // Read input values
  const firstName = document.getElementById("name").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase(); 
  const phone = document.getElementById("phone").value.trim();
  const attendance = document.getElementById("attendance").value;
  const main = mainSelect.value;
  const side = sideSelect.value;
  const desert = desertSelect.value;
  const comment = document.getElementById("comment").value.trim();

  const aussieCheckbox = document.getElementById("aussie");
  const isAussie = aussieCheckbox.checked;

  // Basic validation
  if (!firstName || !lastName || !email || !attendance || !phone) {
    statusMsg.textContent = "Please fill out all fields.";
    statusMsg.style.color = "red";
    return;
  }else if (isAussie && phone.length != 13) {
    statusMsg.textContent = "Please enter a valid Australian phone number.";
    statusMsg.style.color = "red";
    return;
  } else if (!isAussie && phone.length === 13) {
    statusMsg.textContent = "Please confirm you have an australian phone number.";
    statusMsg.style.color = "red";
    return;
  } else if (phone.length!=12 && !isAussie) {
    statusMsg.textContent = "Please enter a valid phone number.";
    statusMsg.style.color = "red";
    return;
  } else if (attendance === "yes" && (!mainSelect.value || !sideSelect.value || !desertSelect.value)) {
    statusMsg.textContent = "Please choose menu options";
    statusMsg.style.color = "red";
    return;
  } else {
    statusMsg.textContent = "";
  }

  const phoneInput = document.getElementById("phone").value;
  
  if (!invitedPhones.has(phoneInput)) {
    statusMsg.textContent = "Sorry — this phone number is not on the invite list.";
    statusMsg.style.color = "red";
    return;
  }else{
  statusMsg.textContent = "Phone verified Proceeding...";
  statusMsg.style.color = "green";
  }

  try {
    statusMsg.textContent = "Submitting...";
    statusMsg.style.color = "black";

    /* Prevent duplicate RSVP by email
    const q = query(
      collection(db, "rsvps"),
      where("email", "==", email)
    );
    const existing = await getDocs(q);

    if (!existing.empty) {
      statusMsg.textContent = "This email has already RSVP’d.";
      statusMsg.style.color = "orange";
      return;
    }*/
    
    //upload to database
    const emailId = email.trim().toLowerCase(); 
    if (attendance === "yes") { 
      await setDoc(doc(db, "rsvps", emailId), {
        firstName,
        lastName,
        email: emailId,
        phone,
        attendance,
        main,
        side,
        desert,
        comment,
        createdAt: serverTimestamp()
      });
    } else {
      await setDoc(doc(db, "rsvps", emailId), {
        firstName,
        lastName,
        email: emailId,
        phone,
        attendance,
        createdAt: serverTimestamp()
      });
    }

    statusMsg.textContent = "RSVP saved! 🎉 Thank you!";
    statusMsg.style.color = "green";
    form.reset();

  } catch (error) {
    console.error("Firebase error:", error);

    if (error.code === "permission-denied") {
      statusMsg.textContent = "This phone number has already RSVP’d.";
      statusMsg.style.color = "orange";
    } else {
      statusMsg.textContent = "Something went wrong. Please try again.";
      statusMsg.style.color = "red";
    }
  }
});

// =============================
// Load invited phone numbers
// =============================

let invitedPhones = new Set();

async function loadInvitedPhones() {
  try {
    const response = await fetch("./invitedPhones.json");
    const data = await response.json();
    invitedPhones = new Set(data);
    console.log("Invited list loaded:", invitedPhones.size);
  } catch (err) {
    console.error("Failed to load invited list:", err);
  }
}



