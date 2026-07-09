# AutoCanvas.AI

An AI-powered website builder. Describe what you want, and AutoCanvas.AI generates a fully functional website using HTML, CSS, and JavaScript — instantly.

🌐 **Live Demo:** [https://web-ai-1-u56y.onrender.com/](https://web-ai-1-u56y.onrender.com/)

---

## Screenshots

### Landing Page

<img width="823" height="465" alt="Screenshot 2026-07-09 at 10 06 17 AM" src="https://github.com/user-attachments/assets/9683adb6-c772-4b6e-a13c-fe93263030d0" />



### How It Works

<img width="822" height="463" alt="Screenshot 2026-07-09 at 10 06 08 AM" src="https://github.com/user-attachments/assets/66b183df-9d2e-42a9-9ade-618e58cfaf71" />



### Dashboard

<img width="823" height="465" alt="Screenshot 2026-07-09 at 10 05 51 AM" src="https://github.com/user-attachments/assets/641a06c3-8bcd-4e7f-8d80-52ff8406f8c8" />


### Generate Page


<img width="833" height="461" alt="Screenshot 2026-07-09 at 10 05 28 AM" src="https://github.com/user-attachments/assets/d6b18a3e-8c28-4abe-a14f-376ae6099cca" />

### Editor & Live Preview

<img width="840" height="463" alt="Screenshot 2026-07-09 at 10 05 41 AM" src="https://github.com/user-attachments/assets/f81be07c-1f82-436a-885d-6c6bdfb76de3" />


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
