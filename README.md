# 🎉 Ceremony RSVP System

A full-stack web application for managing ceremony attendance confirmations. Built with **Express.js**, **Pug**, **Sequelize**, and **MySQL2**.

---

## ✨ Features

### Guest-Facing RSVP Form
- Elegant, responsive ceremony invitation page
- Fields: First Name, Last Name, Child's Name (optional), Phone Number
- Input validation (client + server side)
- Success modal with confetti animation after submission

### Admin Panel
- Secure login (username + password)
- Dashboard with attendee list and stats
- Search/filter attendees in real time
- Export attendee list as CSV
- Print-friendly attendee list (separate print view)
- Delete individual attendees
- Responsive sidebar navigation

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Server | Express.js 4 |
| Views | Pug (Jade) |
| ORM | Sequelize 6 |
| Database Driver | mysql2 |
| Database | MySQL 8+ |
| Validation | express-validator |
| Sessions | express-session |
| Flash Messages | connect-flash |

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js v18+
- MySQL 8.0+
- npm

### 2. Clone & Install

```bash
git clone <your-repo>
cd ceremony-rsvp
npm install
```

### 3. Database Setup

Open MySQL and run the setup script:

```bash
mysql -u root -p < setup.sql
```

Or manually in MySQL Workbench / CLI:

```sql
CREATE DATABASE ceremony_rsvp;
```

Sequelize will auto-create the `attendees` table on first run (`sync: { alter: true }`).

### 4. Configure Environment

Edit `.env` with your settings:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ceremony_rsvp
DB_USER=root
DB_PASS=your_mysql_password

# App
PORT=3000
SESSION_SECRET=change_this_to_something_random


> ⚠️ **Change the admin credentials and session secret before deploying!**

### 5. Start the Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Visit:
- **RSVP Form**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login

---

## 📁 Project Structure

```
ceremony-rsvp/
├── app.js                  # Entry point
├── package.json
├── .env                    # Environment variables
├── setup.sql               # Database setup script
├── config/
│   └── database.js         # Sequelize connection
├── models/
│   └── Attendee.js         # Attendee model
├── routes/
│   ├── index.js            # RSVP form routes
│   └── admin.js            # Admin panel routes
├── views/
│   ├── layout.pug          # Base layout
│   ├── index.pug           # RSVP form page
│   ├── 404.pug
│   └── admin/
│       ├── layout.pug      # Admin base layout
│       ├── login.pug       # Admin login
│       ├── dashboard.pug   # Attendee list
│       └── print.pug       # Print view
└── public/
    ├── css/
    │   ├── style.css        # RSVP form styles
    │   └── admin.css        # Admin panel styles
    └── js/
        ├── main.js          # RSVP form scripts
        └── admin.js         # Admin panel scripts
```

---



Change these in `.env` before going live.

---

## 🖨️ Printing

Navigate to **Admin → Print List** or click the "Print List" button. A clean print-optimized page will open with the full attendee list. Use your browser's **Ctrl+P** (or the Print Now button) to print or save as PDF.

---

## 📦 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | RSVP form |
| POST | `/rsvp` | Submit RSVP |
| GET | `/admin/login` | Admin login |
| POST | `/admin/login` | Authenticate |
| GET | `/admin/logout` | Log out |
| GET | `/admin/dashboard` | Attendee list |
| GET | `/admin/print` | Print view |
| DELETE | `/admin/attendee/:id` | Remove attendee |
