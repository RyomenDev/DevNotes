# 🌐 Project: DevNotes – Personal Notes App

A full-stack Next.js app where users can sign up, log in, and **create private notes**. It covers** authentication, API routes, CRUD operations, and MongoDB integration**.

## 🔧 Features:

- User registration and login (JWT-based)
- Create, read, update, and delete (CRUD) personal notes
- Protected routes (only logged-in users can see their notes)
- Responsive UI using Tailwind CSS
- MongoDB for storing users and notes
- Simple dashboard for managing notes

| Feature                    | Description                                                           |
| -------------------------- | --------------------------------------------------------------------- |
| 🔐 User Auth               | Register/Login with **JWT** and password hashing (`bcrypt`)           |
| 📒 CRUD Notes              | Create, Read, Update, Delete notes using Next.js API routes + MongoDB |
| 🚫 Protected Routes        | Only authenticated users can view and manage their notes              |
| 💻 Responsive UI           | Built with **Tailwind CSS**                                           |
| 📦 MongoDB + Mongoose      | Database storage for users and notes                                  |
| 🔄 Middleware              | Used for verifying JWT in protected API routes                        |
| 🌍 App Router + API Routes | Using Next.js **App Router** and `/app/api/` for backend endpoints    |

## 🧰 Tech Stack:

- Next.js (Frontend + API routes)
- Tailwind CSS (Styling)
- MongoDB + Mongoose (Database)
- JWT (Authentication)
- Bcrypt (Password hashing)
- Axios (Frontend API calls)

## 🧠 Key Concepts:

- How to use **Next.js API routes** as backend endpoints
- JWT-based **authentication** with secure password handling
- CRUD operations with MongoDB using Mongoose
- Using **middleware** in API routes (e.g., JWT verification)
- Working with protected client-side pages
- Managing global state or context (optional)

| Concept                | Application Example                           |
| ---------------------- | --------------------------------------------- |
| API Routes             | `app/api/notes` for CRUD endpoints            |
| JWT Authentication     | Login, register, protect notes route          |
| MongoDB + Mongoose     | Define `User` and `Note` schemas              |
| Bcrypt                 | Hashing passwords before saving them          |
| Middleware             | Token validation for secure access to notes   |
| Client-side Protection | Redirect unauthenticated users from dashboard |
| Tailwind CSS           | Styling all components responsively           |

## 🗂️ Phases to Build

**Phase 1: Auth System**

- [ ] Register + Login pages
- [ ] API routes for auth
- [ ] Store JWT in localStorage or cookies
- [ ] Auth middleware for API

**Phase 2: Notes System**

- [ ] Note schema + model
- [ ] CRUD APIs (/api/notes, /api/notes/[id])
- [ ] Dashboard UI to manage notes
- [ ] Client-side state refresh after actions

**Phase 3: Polishing**

- [ ] Protected routing logic
- [ ] Better form validations
- [ ] UI refinements

## 🚀 Deployment

- Frontend: Vercel
- Database: MongoDB Atlas
- Use render.com for backend

## 📁 Final Ideal Folder Structure

```
src/
├── app/
│   ├── login/
│   │   └── page.jsx
│   ├── register/
│   │   └── page.jsx
│   ├── dashboard/
│   │   └── page.jsx
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.js
│   │   │   └── register/route.js
│   │   └── notes/
│   │       ├── route.js
│   │       └── [id]/route.js
│   ├── layout.js
│   └── page.js
│
├── components/
│   ├── Navbar.jsx
│   ├── Form.jsx
│   └── NoteCard.jsx
│
├── models/
│   ├── User.js
│   └── Note.js
│
├── lib/
│   ├── mongodb.js
│   └── auth.js
│── middleware.js
```
