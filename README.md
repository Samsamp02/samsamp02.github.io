#  Marissa & Joël Wedding Website

A fully responsive wedding website built with **HTML, CSS, and JavaScript**, featuring RSVP management, dynamic UI interactions, and real-time database integration using Firebase.

This project was developed to provide guests with event details, allow online RSVPs, and automatically notify the couple of new responses.

---

## Live Features

-  Home page with navigation  
-  Schedule page  
-  Menu selection preview  
-  FAQ section  
-  Countdown timer  
-  RSVP form with database storage  
-  Automatic email notifications  
-  Fully responsive design (mobile, tablet, desktop)  

---

#  Technologies Used

## Frontend

- **HTML5** – Structured multi-page layout  
- **CSS3** – Custom styling, responsive layout, grid systems  
- **Vanilla JavaScript** – DOM manipulation, validation, interactive features  

### Responsive Design

- CSS Grid & Flexbox  
- Mobile-first adjustments  
- Toggleable mobile navigation menu  
- Viewport meta tag optimization  

---

## Firebase Integration

Firebase is used as the backend service.

### Firestore Database

- Stores RSVP submissions  
- Prevents duplicate entries  
- Structured document storage  
- Custom security rules to:
  - Allow create  
  - Allow read (optional)  
  - Prevent update/delete  
  - Prevent duplicate submissions  

### Database Security Rules

- Write allowed only if entry does not already exist  
- Prevents overwriting existing RSVPs  
- Public write access restricted with conditional checks  

### Real-Time Benefits

- Submissions stored instantly  
- Scalable backend with no custom server required  
- No traditional backend needed (serverless architecture)  

---

## EmailJS Integration

EmailJS is used to send automatic email notifications when a new RSVP is submitted.

### Features

- Sends notification directly to the bride  
- No paid Firebase email extension required  
- Custom email template  
- Dynamic variables injected from RSVP form   

---

# JavaScript Features Developed

### RSVP Form Logic

- Form input validation  
- Phone number formatting  
- Duplicate entry prevention  
- Real-time error messaging  
- Async submission to Firebase  
- Trigger EmailJS after successful submission  

### Mobile Menu Toggle

- Hamburger menu button  
- ARIA accessibility attributes  
- Dynamic class toggling  

### Dynamic UI Interactions

- Menu image labeling alignment  
- FAQ formatting improvements  
- Conditional display logic  
- DOM-based content updates  

### Countdown Timer

- Calculates time remaining until wedding date  
- Updates every second  
- Prevents negative countdown after event  

### Phone Number Formatting

- Input pattern validation  
- Real-time format correction  
- User-friendly error feedback  

# Key Concepts Demonstrated
- Serverless architecture
-	Client-side form validation
-	Firebase security rule design
-	Email automation without backend
- Responsive design principles
- Asynchronous JavaScript (Promises / async-await)
- DOM manipulation
- UI/UX improvements through iteration

# Project Purpose
This project was built as a personalized wedding website to:
-	Centralize event information
-	Simplify guest RSVP management
-	Automate notifications
-	Provide a polished, modern user experience

---

# 🗂️ Project Structure
```
/root
├── index.html
├── img/
└── /public
  ├── /Ovo (font)
  ├── /Amoressa (font)
  ├── header-script
  ├── index.html
  ├── rsvp.html
  ├── rsvp.js
  ├── schedule.html
  ├── menu.html
  ├── faq.html
  ├── countdown.html
  ├── countdown.js
  ├── style.css
  ├── script.js
  ├── admin.html
  ├── admin.js
  └── invitedPhones.json
``` 
