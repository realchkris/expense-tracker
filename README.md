# 💶 Expense Tracker 

A minimal full-stack Expense Tracker built with Vue 3 (Vite), Pinia, Vue Router, and Tailwind CSS that relies on a secure backend proxy (Node.js & Express on Render).

This project is designed to showcase frontend and backend development skills, emphasizing API security, state management, and modular UI components.

[Demo (backend might be slow)](https://expense-tracker-jet-xi.vercel.app/)


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
- ⚡ Vue 3 + Vite --- Frontend development.
- 🗂 Pinia --- State management.
- 🌍 Vue Router --- Handles page navigation.
- 🎨 Tailwind CSS --- For a clean, responsive UI.
- 🔗 MockAPI --- Backend simulation with a Node.js proxy to enhance security.
- 🛡 Node.js + Express --- API proxy to protect MockAPI.
- 🚀 Render --- Backend hosting.
- 🌐 Vercel --- Frontend deployment.

# 🖥️ Local Development Setup

## 1. Clone the repository

	git clone https://github.com/realchkris/expense-tracker.git
	cd expense-tracker

## 2. Setup the Backend (Proxy)

The project uses MockAPI as a simulated database to store expenses.
MockAPI endpoint example:

	https://your-mockapi-url.com/et/expenses

Each expense is stored as JSON data in this structure:

	{
	  "id": "1",
	  "name": "Groceries",
	  "amount": 121.03,
	  "description": "Weekly shopping list"
	}

To setup the backend, first install the dependencies:

	cd backend
	npm install

Create a .env file inside backend/ and add:

	PORT=3001
	API_BASE=https://your-mockapi-url.com/et
	ADMIN_PASSWORD=yourpassword

Start the backend server:

	npm start

## 3. Setup the Frontend

	cd ../frontend
	npm install

Create a .env file inside frontend/ and add:

	VITE_API_BASE=http://localhost:3001/api

Start the frontend server:

	npm run dev