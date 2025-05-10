# 🎟️ Event Ticketing System API

A RESTful Node.js API for managing users, events, and bookings with authentication, admin privileges, QR codes, and email confirmations.

---

## 📁 Project Structure
```
.
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
├── config/
├── public/
├── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Features
- User registration and JWT-based login
- Role-based access (admin/user)
- Create, update, delete events (admin)
- Book event tickets (user)
- Prevent overbooking based on seat limits
- Generate QR codes on booking
- Email confirmation for bookings
- Validate tickets using QR
- Catch-all 404 handler (HTML/JSON)

---

## 🔐 Environment Variables (`.env`)
See `.env.example` for required variables:
```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

---

## 📦 Installation & Run
```bash
# 1. Clone repo
$ git clone https://github.com/Garcia_INF653/event-ticketing-api.git
$ cd event-ticketing-api

# 2. Install dependencies
$ npm install

# 3. Setup .env
$ cp .env.example .env
# Fill in your real credentials

# 4. Start server
$ npm start
```

---

## 🔗 API Endpoints
### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Events
- `GET /api/events`
- `GET /api/events/:id`
- `POST /api/events` *(admin)*
- `PUT /api/events/:id` *(admin)*
- `DELETE /api/events/:id` *(admin)*

### Bookings
- `GET /api/bookings` *(user)*
- `GET /api/bookings/:id` *(user)*
- `POST /api/bookings` *(user)*
- `GET /api/bookings/validate/:qr`

---

## 📤 Deployment
Deployed on [Render](https://event-ticketing-system-fblm.onrender.com), follow steps in server.js to customize your base URL and route handlers.

---

## 📽️ Demo
**Video walkthrough:** _add your Loom/YouTube link here_

---

## 📄 Final Reflection
See `final_project_reflection.pdf` for what I learned and project challenges.

---

## 🧪 Postman Testing
You can import the API collection and test all routes manually with Postman.

---

## 🧑‍💻 Author
**Adriana Garcia**  
GitHub: [@agarcia0793](https://github.com/Garcia_INF653)
