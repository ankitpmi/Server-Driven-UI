# Server-Driven UI (SDUI) – React Native POC

This project is a **learning + POC implementation of Server-Driven UI (SDUI)** using **React Native (Expo)** on the frontend and **Node.js + Express** on the backend.

The goal is to **control the Home screen layout, components, styling, and content from the backend** using JSON — similar to how apps like **Flipkart, Amazon, Netflix** manage dynamic screens.

---

## 🧠 What is Server-Driven UI?

Server-Driven UI means:

- Backend sends **UI configuration as JSON**
- Frontend renders UI **based on type + config**
- App UI can change **without app updates**
- Used heavily for:

  - Festival themes
  - A/B testing
  - Feature rollouts
  - Dynamic layouts

---

## 🏗️ Tech Stack

### Frontend

- **Expo**
- **React Native**
- **TypeScript**
- FlatList-based rendering
- Component-based architecture

### Backend

- **Node.js**
- **Express**
- **JSON file as DB** (for learning & POC)
- Clean layered architecture

> ⚠️ No Firebase / paid services used (learning-friendly)

---

## 📁 Project Structure

```
Server-Driven-UI/
├── backend/
│   ├── data/
│   │   └── home.json
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
│   ├── src/
│   │   ├── screens/
│   │   ├── components/
│   │   ├── services/
│   │   └── types/
│   ├── app.json
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 📦 Backend Overview

### Purpose

- Serve **Home screen configuration**
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

### Response

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

## 📱 Frontend Overview

### Key Concepts

- **FlatList** renders sections
- Each section has:

  - `type`
  - `config`

- Components decide how to render based on `type`

### Supported Components

- `banner`
- `category_grid`

### Example Rendering Logic

```tsx
if (item.type === "banner") {
  return <Banner config={item.config} />
}

if (item.type === "category_grid") {
  return <CategoryGrid config={item.config} />
}
```

---

## 🎯 Why JSON DB (for now)?

This project intentionally uses **JSON instead of a real DB** because:

- Easy to understand
- No infra cost
- Perfect for SDUI learning
- Easy migration later to:

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

Use:

- Expo Go
- iOS Simulator
- Android Emulator

---

## 🧪 Current Status

- ✅ Backend serving dynamic UI config
- ✅ Frontend rendering server-driven sections
- 🚧 Styling & layout configs (WIP)
- 🚧 Templates / screen layouts (planned)
- 🚧 Production hardening (later)

---

## 🗺️ Roadmap (Next Steps)

- Screen-level config (background, padding, theme)
- Multiple layout templates
- Component-level style config
- Feature flags
- A/B testing support
- DB migration (MongoDB / PostgreSQL)
- Caching & performance optimization

---

## ⚠️ Disclaimer

This project is:

- ❌ Not production-ready
- ✅ Perfect for **learning SDUI concepts**
- ✅ Suitable for POC & experimentation
