Thanks! Based on the image you shared, your **Agrosarthi Frontend** is a vanilla JS project (not React-based), structured under a `static` directory. Here's the updated **README.md** tailored to your actual frontend folder structure and tech stack (HTML + CSS + JS, Firebase hosting, FastAPI backend):

---

```markdown
# 🌾 Agrosarthi Frontend

Agrosarthi is a smart agriculture assistant designed to support Indian farmers in making informed decisions about crop selection, market pricing, and yield predictions.

This repository contains the **frontend** of Agrosarthi — a clean, responsive, and easy-to-use interface built with **HTML, CSS, and JavaScript**, designed for speed and simplicity.

---

## 🧩 Features

- ✅ **Simple and minimal UI** for quick understanding
- 🌐 **Multilingual support** using `translations.json`
- 📲 **Interacts with FastAPI backend** hosted on Google Cloud Run
- ⚡ **Fast and responsive** data communication using `fetch`
- 🚀 **Deployed using Firebase Hosting**

---

## 🚀 Deployment

- **Frontend**: Hosted on [Firebase](https://agrosarthi-frontend.web.app)
- **Backend**: FastAPI running on [Google Cloud Run](https://agrosarthi-backend-885337506715.asia-south1.run.app)

> Replace links with your actual URLs after deployment.

---

## 📂 Folder Structure

```
static/
├── css/                   # Stylesheets
├── images/                # Icons, illustrations
└── js/                    # All frontend JS files
    ├── chatbot.js         # Gemini API chat interface
    ├── crop-prediction.js # Crop prediction requests
    ├── price-estimation.js# Crop price prediction
    ├── yield-prediction.js# Yield estimator
    ├── main.js            # Core app logic and routing
    ├── translations.js    # Dynamic multilingual switcher
    └── translations.json  # Language translations

firebase.json             # Firebase hosting config
index.html                # Main entry point
404.html                  # Error page
.gitignore
.firebaserc
README.md
```

---

## 🔌 Backend Integration

All prediction forms interact with the FastAPI backend on Cloud Run via RESTful POST requests.

### Example Request (Crop Prediction):

```js
fetch("https://agrosarthi-backend-885337506715.asia-south1.run.app", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    N: 90,
    P: 42,
    K: 43,
    temperature: 25.1,
    humidity: 80,
    ph: 6.5,
    rainfall: 200
  })
})
.then(response => response.json())
.then(data => {
  console.log("Predicted Crop:", data.predicted_crop);
});
```

---

## 🌐 Firebase Hosting

To deploy the frontend:

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase:
   ```bash
   firebase init
   ```

4. Deploy your site:
   ```bash
   firebase deploy
   ```

Make sure your `firebase.json` is configured to serve from the `static` directory.

---

## 📸 Screenshots

> Add UI screenshots here (optional)

---

## 🛠️ Technologies Used

- HTML5 + Vanilla JavaScript
- CSS3
- Firebase Hosting
- FastAPI (Cloud Run)
- Gemini API (for chatbot)

---

## 📘 License

MIT License — free to use and contribute.

---

## 🤝 Contributions

Contributions are welcome! Submit a pull request or raise an issue to suggest improvements.

---

## 📌 Acknowledgments

- Farmers and Agri experts who inspired Agrosarthi  
- Google Cloud & Firebase  
- Open-source contributors

---

```

Let me know if you'd like to include badges (Firebase | Cloud Run | MIT License etc.) or want a Hindi/Marathi version of the README too!