# FailForward 🚀

> *Fall down seven times, stand up eight.*

FailForward is a productivity web app that helps you turn setbacks into stepping stones. It combines smart reminders with a failure journal so you can stay on track, reflect on your journey, and keep moving forward.

---

## ✨ Features

- 📝 **Failure Journal** — Log your setbacks, reflect on lessons learned, and track your growth over time
- ⏰ **Smart Reminders** — Set and manage reminders to stay consistent with your goals
- 📊 **Analytics Dashboard** — Visualize your progress with charts and insights
- 💡 **Suggestions** — Get actionable suggestions based on your activity
- 🔐 **Authentication** — Secure login and signup
- 🌙 **Theme Support** — Light and dark mode for comfortable use

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React | UI framework |
| Tailwind CSS | Styling |
| React Router | Client-side routing |
| Recharts | Analytics charts |
| Context API | State management |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database |
| bcrypt | Password hashing |

---

## 📁 Project Structure

```
FailForward/
├── backend/
│   ├── config/         # Database config
│   ├── models/         # Mongoose models (User, Reminder)
│   ├── routes/         # API routes (auth, reminders)
│   └── server.js       # Express server entry point
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/        # Theme context
│   ├── pages/          # Dashboard, Features pages
│   ├── utils/          # API utility functions
│   ├── App.jsx         # App routes
│   └── main.jsx        # Entry point
├── public/
├── package.json
└── tailwind.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas)

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Start backend server
node server.js
```

> Make sure to create a `.env` file in the `backend/` folder with your MongoDB URI:
> ```
> MONGO_URI=your_mongodb_connection_string
> ```

---

## 💬 Feedback

Feedbacks are welcomed! Feel free to open an issue or reach out if you have suggestions, ideas, or run into any problems.

---

<p align="center">Made with ❤️ by <a href="https://github.com/Adityapatel2120">Aditya Patel</a></p>
