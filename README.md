# Server-Driven UI (SDUI) – Expo + Node.js (POC)

This repository is a **learning & POC project** to understand and implement **Server-Driven UI (SDUI)** using:

- **Expo + React Native (Expo Router)**
- **Node.js + Express**
- **JSON file as database**

The goal is to dynamically control the **Home screen layout, components, content, and configuration from the backend**, similar to apps like **Flipkart, Amazon, Netflix**, etc.

---

## 🧠 What is Server-Driven UI?

Server-Driven UI means:

- Backend sends **UI configuration as JSON**
- Frontend **renders UI based on `type` + `config`**
- UI can change **without publishing a new app build**
- Useful for:

  - Festival / seasonal screens
  - A/B testing
  - Feature flags
  - Dynamic layouts & content

---

## 🏗️ Tech Stack

### Frontend

- Expo
- React Native
- **Expo Router (file-based routing)**
- TypeScript

### Backend

- Node.js
- Express
- JSON file as DB (for learning & POC)

> ⚠️ No Firebase / paid services are used
> This is intentional for learning purposes.

---

## 📁 Project Structure

```
Server-Driven-UI/
├── backend/
│   ├── data/
│   │   └── home.json          # Server-driven UI config
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── db/
│   │   └── utils/
│   └── package.json
│
├── frontend/
│   ├── app/                   # Expo Router routes
│   │   ├── _layout.tsx
│   │   └── index.tsx          # Home screen
│   │
│   ├── src/
│   │   ├── components/        # UI components
│   │   │   ├── Banner.tsx
│   │   │   ├── CategoryGrid.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── services/          # API calls
│   │   │   └── home.api.ts
│   │   │
│   │   ├── types/             # Shared types
│   │   │   └── component.type.ts
│   │   │
│   │   └── utils/
│   │
│   ├── app.json
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

---

## 📦 Backend Overview

### Purpose

- Serve **Home screen UI configuration**
- Filter sections by:

  - `festival`
  - `active`
  - `order`

### JSON-Driven UI (`backend/data/home.json`)

```json
{
  "sections": [
    {
      "id": "banner_default_1",
      "type": "banner",
      "order": 1,
      "festival": "default",
      "active": true,
      "config": {
        "title": "Welcome Offer",
        "image": "https://via.placeholder.com/400x160"
      }
    }
  ]
}
```

### API Endpoint

```
GET /api/home?festival=default
```

### API Response

```json
{
  "success": true,
  "data": {
    "festival": "default",
    "sections": []
  }
}
```

---

## 📱 Frontend Overview (Expo Router)

### Routing

- Uses **Expo Router**
- `app/index.tsx` → Home screen
- No traditional `screens/` folder

### Rendering Logic

- Home screen fetches JSON from backend
- Uses `FlatList`
- Renders components dynamically based on `type`

Example:

```tsx
if (item.type === "banner") {
  return <Banner config={item.config} />
}

if (item.type === "category_grid") {
  return <CategoryGrid config={item.config} />
}
```

---

## 🧩 Supported UI Components (Current)

- `banner`
- `category_grid`

Each component:

- Receives a `config` object
- Is fully controlled by backend JSON

---

## 🎯 Why JSON DB?

This project uses **JSON as DB** because:

- Easy to understand
- Zero setup
- Ideal for SDUI learning
- Easy to migrate later to:

  - MongoDB
  - PostgreSQL
  - Supabase

---

## 🚀 Running the Project

### Backend

```bash
cd backend
npm install
npm run dev
```

Server runs on:

```
http://localhost:3000
```

---

### Frontend (Expo)

```bash
cd frontend
npm install
npx expo start
```

Run on:

- Expo Go
- iOS Simulator
- Android Emulator

---

## 🧪 Project Status

- ✅ Backend serving server-driven UI config
- ✅ Expo Router based frontend
- ✅ Dynamic Home screen rendering
- 🚧 Styling & layout configs (planned)
- 🚧 Multiple layout templates (planned)
- 🚧 Production hardening (later)

---

## 🗺️ Planned Improvements (Future)

- Screen-level configuration (background, padding, theme)
- Component-level styling config
- Multiple Home screen templates
- Schema validation
- Caching & performance improvements
- Database migration

---

## ⚠️ Disclaimer

This project is:

- ❌ Not production-ready
- ✅ Intended for learning & experimentation
- ✅ A clean SDUI POC
