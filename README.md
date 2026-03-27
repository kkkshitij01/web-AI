# AutoCanvas.AI

An AI-powered website builder. Describe what you want, and AutoCanvas.AI generates a fully functional website using HTML, CSS, and JavaScript — instantly.

🌐 **Live Demo:** [https://web-ai-1-u56y.onrender.com/](https://web-ai-1-u56y.onrender.com/)

---

## Screenshots

### Landing Page

<img width="1440" height="900" alt="Screenshot 2026-03-27 at 7 12 07 AM" src="https://github.com/user-attachments/assets/ba035c32-71ba-463c-8ec7-7bd2d20eb7ed" />


### How It Works

<img width="1440" height="900" alt="Screenshot 2026-03-27 at 7 12 32 AM" src="https://github.com/user-attachments/assets/6aff592a-4174-4048-82f7-f778fc4ae525" />


### Dashboard

<img width="1440" height="900" alt="Screenshot 2026-03-27 at 7 11 15 AM" src="https://github.com/user-attachments/assets/5a0a8015-2c75-4e8c-a864-aba41efb69b7" />

### Generate Page

<img width="1440" height="900" alt="Screenshot 2026-03-27 at 7 13 26 AM" src="https://github.com/user-attachments/assets/6ed849d1-9946-4119-90c2-f0df4eb4e582" />

### Editor & Live Preview

<img width="1440" height="900" alt="Screenshot 2026-03-27 at 7 14 18 AM" src="https://github.com/user-attachments/assets/2fa74ef2-e999-4f6b-8497-f5db873a0103" />

---
## Features

- **AI Generation** — Enter a prompt and get a complete website (HTML, CSS, JS) instantly
- **Prompt Suggestions** — Pre-built layout ideas to get you started quickly
- **Live Preview** — See your website render in real time inside the editor
- **AI Editing** — Describe changes in the editor and the AI updates your site
- **Deploy** — Deploy your website with one click and get it live
- **Share** — Every deployed site gets a unique public link
- **Dashboard** — Manage all your projects in one place with Live / Draft status
- **Credits System** — Buy credits to generate and deploy websites

---

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/autocanvas-ai.git
cd autocanvas-ai
```

### 2. Install dependencies

```bash
# Backend
cd server && npm install

# Frontend
cd ../client && npm install
```

### 3. Set up environment variables

Create a `.env` file in the `server/` folder:

```env
PORT=5000
AI_API_KEY=your_api_key_here
```

Create a `.env` file in the `client/` folder:

```env
REACT_APP_API_BASE_URL=http://localhost:5000
```

### 4. Run the app

```bash
# Backend
cd server && npm run dev

# Frontend (new terminal)
cd client && npm start
```

App runs at `http://localhost:3000`

---

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "add: your feature"`
4. Push and open a Pull Request
