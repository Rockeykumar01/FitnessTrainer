# 💪 FitConnect — Fitness Trainer Booking Platform

## 🔍 Overview

**FitConnect** is a full-stack **Fitness Trainer Booking Platform** built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). It bridges the gap between clients and certified fitness trainers by providing a seamless digital platform for discovering, booking, and managing personalized training sessions.

The application includes three separate role-based panels:

- 👤 **User/Client Panel** — Browse trainers, book sessions, pay online, manage profile
- 🏋️ **Trainer Panel** — Manage session bookings, track earnings, update availability
- 🛡️ **Admin Panel** — Add/remove trainers, oversee all sessions, view platform analytics

**Key Features:**
- 🔐 JWT-based authentication with separate guards for each role
- 💳 **Razorpay** integration for secure online payment of session fees
- 📧 **Email Verification** on registration via Mailtrap
- ☁️ **Cloudinary + Multer** for scalable trainer profile image uploads

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js (Vite), React Router, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | JWT (jsonwebtoken), bcrypt |
| **File Uploads** | Multer, Cloudinary |
| **Payments** | Razorpay |
| **Email Service** | Mailtrap / Nodemailer |

---

## 📁 Folder Structure

```bash
fitnesstrainer/
├── backend/
│   ├── controllers/     # Business logic (user, trainer, admin)
│   ├── models/          # MongoDB schemas (User, Trainer, Appointment)
│   ├── middleware/      # JWT auth guards (authUser, authTrainer, authAdmin)
│   ├── routes/          # API route definitions
│   ├── config/          # MongoDB & Cloudinary connection setup
│   ├── mailtrap/        # Email templates & sending logic
│   ├── utils/           # Helper utilities (e.g., verification code generator)
│   └── server.js        # Express server entry point
│
├── frontend/            # React app — User/Client Panel
└── admin/               # React app — Admin Panel
```

**API Endpoints:**
```
/api/user     → Register, Login, Book Session, Pay, Profile
/api/trainer  → Trainer Login, Manage Sessions, Dashboard
/api/admin    → Add/Remove Trainers, View All Sessions, Dashboard
```

---

## 🚀 Getting Started

Follow these steps to set up **FitConnect** locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Rockeykumar01/FitnessTrainer
cd fitnesstrainer
```

### 2. Install Dependencies

Install dependencies for all three parts of the app:

```bash
# Backend
cd backend
npm install

# Frontend (User Panel)
cd ../frontend
npm install

# Admin Panel
cd ../admin
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the **backend** folder and add the following:

```env
# Database
MONGODB_URI='your_mongodb_connection_string'

# Cloudinary (for trainer image uploads)
CLOUDINARY_NAME=''
CLOUDINARY_API_KEY=''
CLOUDINARY_SECRET_KEY=''

# Admin Credentials (hardcoded in .env for security)
ADMIN_EMAIL="admin@fitconnect.com"
ADMIN_PASSWORD="your_admin_password"

# JWT
JWT_SECRET="your_jwt_secret_key"

# Razorpay (Payment Gateway)
CURRENCY='INR'
RAZORPAY_KEY_ID='your_razorpay_key_id'
RAZORPAY_KEY_SECRET='your_razorpay_key_secret'

# Mailtrap (Email Verification)
MAILTRAP_TOKEN=your_mailtrap_token
```

### 4. Start the Backend Server

```bash
cd backend
npm start
```
> Backend runs at: **http://localhost:4000**

### 5. Start the Frontend (User Panel)

Open a new terminal:

```bash
cd frontend
npm run dev
```
> Frontend runs at: **http://localhost:5173**

### 6. Start the Admin Panel

Open another terminal:

```bash
cd admin
npm run dev
```
> Admin panel runs at: **http://localhost:5174**

---

---

## 🔒 Security Highlights

- Passwords hashed using **bcrypt** (10 salt rounds) — never stored in plain text
- **JWT tokens** signed with a secret key, validated on every protected request
- Three separate auth middlewares: `authUser.js`, `authTrainer.js`, `authAdmin.js`
- Email verification token with **24-hour expiry** on registration
- Environment variables used for all sensitive credentials

---

## 🤝 Connect with Me

- **Name**: Rockey Kumar
- **Email**: [rockey@gmail.com](mailto:rockey@gmail.com)
- **LinkedIn**: [linkedin.com/in/rockeykumar](https://www.linkedin.com/in/hemant-porwal-462b1b258/)
