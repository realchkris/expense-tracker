# 💶 Expense Tracker 

A minimal full-stack Expense Tracker built with Vue 3 (Vite), Pinia, Vue Router, and Tailwind CSS that relies on a secure backend proxy (Node.js & Express on Render).

This project is designed to showcase frontend and backend development skills, emphasizing API security, state management, and modular UI components.

Demo: https://expense-tracker-jet-xi.vercel.app/


	⚠️ Note: This project relies on MockAPI for backend operations. To prevent direct API exposure, a Node.js proxy server has been added, hosted on Render, and environment variables (.env) are used.

# 🚀 Features

## General Users

- View a list of expenses.
- Click on an expense to see details.

## Admin

- Add, edit, and delete expenses.
- Optimistic UI (expenses appear instantly & rollback on failure).
- Global state management via Pinia.
- Admin login with an environment-protected password.

# Tech Stack
- ⚡ Vue 3 + Vite --- Fast & modern frontend development.
- 🗂 Pinia --- Simple yet powerful state management.
- 🌍 Vue Router --- Handles page navigation.
- 🎨 Tailwind CSS --- For a clean, responsive UI.
- 🔗 MockAPI --- Backend simulation with a Node.js proxy to enhance security.
- 🛡 Node.js + Express --- API proxy to protect MockAPI.
- 🚀 Render --- Backend hosting.
- 🌐 Vercel --- Frontend deployment.