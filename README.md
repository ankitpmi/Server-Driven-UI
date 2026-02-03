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

- **Expo** (~54.0.30)
- **React Native** (0.81.5)
- **Expo Router** (file-based routing)
- **TypeScript**
- **React Native Reanimated** (animations)
- **Axios** (HTTP client)

### Backend

- **Node.js**
- **Express** (5.2.1)
- **JSON file as DB** (for learning & POC)

> ⚠️ No Firebase / paid services are used
> This is intentional for learning purposes.

---

## 📁 Project Structure

```
Server-Driven-UI/
├── app/                          # Frontend (Expo App)
│   ├── app/                      # Expo Router routes
│   │   ├── _layout.tsx           # Root layout
│   │   ├── index.tsx             # Home screen
│   │   └── OfferDetails/         # Example detail screen
│   │       └── index.tsx
│   │
│   ├── src/
│   │   ├── engine/               # Core rendering engine
│   │   │   ├── index.ts
│   │   │   ├── ScreenRenderer.tsx    # Main renderer
│   │   │   ├── renderByVersion.ts    # Version routing
│   │   │   ├── VersionResolver.ts
│   │   │   └── types.ts
│   │   │
│   │   ├── sdui/                 # Server-Driven UI system
│   │   │   ├── registry.ts            # Component registry
│   │   │   ├── renderer.tsx          # Section renderer
│   │   │   ├── shared/               # Shared utilities
│   │   │   │   ├── SectionWrapper.tsx
│   │   │   │   ├── SectionItemWrapper.tsx
│   │   │   │   ├── layoutResolver.ts
│   │   │   │   └── designResolver.ts
│   │   │   ├── v1/                    # Version 1 components
│   │   │   │   └── components/
│   │   │   │       ├── Banner.v1.tsx
│   │   │   │       ├── CategoryGrid.v1.tsx
│   │   │   │       ├── Header.v1.tsx
│   │   │   │       └── HorizontalList.v1.tsx
│   │   │   └── v2/                    # Version 2 components
│   │   │       └── components/
│   │   │           └── Banner.v2.tsx
│   │   │
│   │   ├── components/           # Shared UI components
│   │   │   ├── AppLayout.tsx
│   │   │   ├── SectionWrapper.tsx
│   │   │   ├── SectionRenderer.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── hooks/                # React hooks
│   │   │   ├── useHomeScreen.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── services/             # API services
│   │   │   ├── home.api.ts
│   │   │   ├── banner.api.ts
│   │   │   ├── categoryGrid.api.ts
│   │   │   ├── horizontalList.api.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── types/                # TypeScript types
│   │   │   ├── api.type.ts
│   │   │   ├── component.type.ts
│   │   │   ├── common/           # Shared types
│   │   │   │   ├── designTokens.type.ts
│   │   │   │   ├── layout.type.ts
│   │   │   │   ├── background.type.ts
│   │   │   │   └── metadata.type.ts
│   │   │   ├── v1/               # V1 specific types
│   │   │   │   ├── home.v1.type.ts
│   │   │   │   ├── banner.v1.type.ts
│   │   │   │   ├── categoryGrid.v1.type.ts
│   │   │   │   └── horizontalList.v1.type.ts
│   │   │   ├── v2/               # V2 specific types
│   │   │   │   ├── home.v2.type.ts
│   │   │   │   └── banner.v2.type.ts
│   │   │   └── DTO/              # Data Transfer Objects
│   │   │       └── banner.mapper.ts
│   │   │
│   │   └── utils/                # Utility functions
│   │       ├── designResolver.ts
│   │       ├── layoutResolver.ts
│   │       └── parseSize.ts
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── app.json
│
├── backend/                      # Backend (Node.js)
│   ├── data/                     # JSON database
│   │   ├── v1/
│   │   │   ├── home.v1.json
│   │   │   ├── banner.v1.json
│   │   │   ├── dealOfDay.v1.json
│   │   │   ├── fashionForYou.v1.json
│   │   │   └── shopbyCategory.v1.json
│   │   └── v2/
│   │       └── banner.v2.json
│   │
│   ├── src/
│   │   ├── server.js             # Server entry point
│   │   ├── app.js                # Express app setup
│   │   │
│   │   ├── routes/               # API routes
│   │   │   ├── index.js          # Main router
│   │   │   ├── v1/
│   │   │   │   ├── home.routes.js
│   │   │   │   ├── banner.routes.js
│   │   │   │   ├── dealOfDay.routes.js
│   │   │   │   ├── fashionForYou.routes.js
│   │   │   │   └── shopbyCategory.routes.js
│   │   │   └── v2/
│   │   │       └── banner.routes.js
│   │   │
│   │   ├── controllers/          # Request handlers
│   │   │   ├── v1/
│   │   │   │   ├── home.controller.js
│   │   │   │   ├── banner.controller.js
│   │   │   │   └── ...
│   │   │   └── v2/
│   │   │       └── banner.controller.js
│   │   │
│   │   ├── services/             # Business logic
│   │   │   ├── v1/
│   │   │   │   ├── home.service.js
│   │   │   │   ├── banner.service.js
│   │   │   │   └── ...
│   │   │   └── v2/
│   │   │       └── banner.service.js
│   │   │
│   │   ├── db/                   # Data access layer
│   │   │   ├── v1/
│   │   │   │   ├── home.db.js
│   │   │   │   ├── banner.db.js
│   │   │   │   └── ...
│   │   │   └── v2/
│   │   │       └── banner.db.js
│   │   │
│   │   └── utils/                # Utilities
│   │       └── file.util.js      # JSON file reader
│   │
│   └── package.json
│
└── README.md
```

---

## 🏛️ Architecture Overview

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Expo)                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐      ┌──────────────┐                   │
│  │  Home Screen │──────▶│ useHomeScreen│                  │
│  │  (index.tsx) │      │    Hook      │                   │
│  └──────┬───────┘      └──────┬───────┘                   │
│         │                     │                            │
│         │                     ▼                            │
│         │            ┌─────────────────┐                  │
│         │            │  home.api.ts    │                  │
│         │            │  (fetchHome)    │                  │
│         │            └────────┬────────┘                  │
│         │                     │                            │
│         │                     ▼                            │
│         │            ┌─────────────────┐                  │
│         │            │ ScreenRenderer  │                  │
│         │            │  (Engine)       │                  │
│         │            └────────┬────────┘                  │
│         │                     │                            │
│         │                     ▼                            │
│         │            ┌─────────────────┐                  │
│         │            │ renderByVersion │                  │
│         │            │  (v1/v2)       │                  │
│         │            └────────┬────────┘                  │
│         │                     │                            │
│         │                     ▼                            │
│         │            ┌─────────────────┐                  │
│         │            │  SDUI Renderer  │                 │
│         │            │  (renderer.tsx) │                  │
│         │            └────────┬────────┘                  │
│         │                     │                            │
│         │                     ▼                            │
│         │            ┌─────────────────┐                  │
│         │            │  Component      │                  │
│         │            │  Registry       │                  │
│         │            └────────┬────────┘                  │
│         │                     │                            │
│         │                     ▼                            │
│         │      ┌──────────────┴──────────────┐           │
│         │      │                             │            │
│         │  ┌───▼────┐                  ┌────▼───┐       │
│         │  │ Banner │                  │Category│       │
│         │  │  v1/v2 │                  │  Grid  │       │
│         │  └────────┘                  └────────┘       │
│                                                          │
└──────────────────────────────────────────────────────────┘
                          │
                          │ HTTP Request
                          │ GET /api/v1/home?festival=default
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Node.js/Express)                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐      ┌──────────────┐                   │
│  │   Routes     │──────▶│ Controllers  │                   │
│  │  (v1/v2)     │      │              │                   │
│  └──────┬───────┘      └──────┬───────┘                   │
│         │                     │                            │
│         │                     ▼                            │
│         │            ┌─────────────────┐                  │
│         │            │   Services       │                  │
│         │            │  (Business      │                  │
│         │            │   Logic)        │                  │
│         │            └──────┬──────────┘                  │
│         │                   │                             │
│         │                   ▼                             │
│         │            ┌─────────────────┐                  │
│         │            │   DB Layer      │                  │
│         │            │  (JSON Reader)  │                  │
│         │            └──────┬───────────┘                  │
│         │                  │                               │
│         │                  ▼                               │
│         │            ┌─────────────────┐                  │
│         │            │  JSON Files     │                  │
│         │            │  (data/v1/)     │                  │
│         │            └──────────────────┘                 │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### Data Flow

1. **App Launch** → `app/index.tsx` renders Home screen
2. **Data Fetching** → `useHomeScreen` hook calls `fetchHome()`
3. **API Request** → `GET /api/v1/home?festival=default`
4. **Backend Processing**:
   - Route → Controller → Service → DB
   - Filters sections by `festival` and `active`
   - Sorts by `order`
   - Returns JSON config
5. **Frontend Rendering**:
   - `ScreenRenderer` receives response
   - `renderByVersion` routes to v1/v2 renderer
   - `SDUI Renderer` maps sections to components via registry
   - Components render with `layout`, `config`, `tokens`
6. **Nested API Calls** (if `config.api` exists):
   - Component fetches additional data
   - Updates UI with loading states

---

## 🔧 Core Concepts

### 1. Component Registry System

The registry maps component `type` + `version` to React components:

```typescript
// src/sdui/registry.ts
export const registry = {
  header: {
    v1: HeaderV1,
  },
  banner: {
    v1: BannerV1,
    v2: BannerV2,  // Same type, different version
  },
  category_grid: {
    v1: CategoryGridV1,
  },
  category_horizontal: {
    v1: HorizontalListV1,
  },
}
```

**Usage:**
```typescript
const Component = registry[item.type]?.[item.version]
<Component config={item.config} layout={item.layout} tokens={tokens} />
```

### 2. Versioning Strategy

The system supports **dual versioning**:

1. **API Version** (`metaData.uiVersion`): Controls overall payload structure
   - `v1`: Uses `HomePayloadV1` structure
   - `v2`: Uses `HomePayloadV2` structure

2. **Component Version** (`section.version`): Controls individual component implementation
   - A section can use `version: "v2"` even in a `v1` API response
   - Allows gradual migration of components

**Example:**
```json
{
  "metaData": { "uiVersion": "v1" },  // API version
  "sections": [
    {
      "type": "banner",
      "version": "v2",  // Component version (newer carousel)
      "config": { ... }
    }
  ]
}
```

### 3. Design Tokens System

Design tokens provide consistent styling across components:

```typescript
interface DesignTokens {
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 }
  borderRadius: { sm: 6, md: 10, lg: 16 }
  colors: { primary: "#2874F0", white: "#FFFFFF", ... }
}
```

**Usage:**
```typescript
const padding = tokens.spacing[layout.padding] // "md" → 12
const color = resolveColor("primary", tokens)   // "#2874F0"
```

### 4. Layout Configuration

Each section can have `layout` config for container and item styling:

```json
{
  "layout": {
    "container": {
      "padding": "md",
      "marginHorizontal": "lg",
      "background": {
        "backgroundType": "gradient",
        "colors": ["aliceBlue", "white"],
        "start": [1, 0],
        "end": [1, 1]
      }
    },
    "item": {
      "height": 180,
      "borderRadius": "md",
      "marginBottom": "sm"
    }
  }
}
```

---

## 📦 Backend Overview

### API Endpoints

#### Home Screen
```
GET /api/v1/home?festival=default
```

**Response:**
```json
{
  "success": true,
  "data": {
    "metaData": {
      "screen": "home",
      "uiVersion": "v1"
    },
    "payload": {
      "designTokens": { ... },
      "screenConfig": { ... },
      "sections": [ ... ]
    }
  }
}
```

#### Other Endpoints
```
GET /api/v1/banner
GET /api/v1/dealOfDay
GET /api/v1/shopbyCategory
GET /api/v1/fashionForYou
GET /api/v2/banner
```

### JSON Data Structure

#### Home Screen Config (`data/v1/home.v1.json`)

```json
{
  "metaData": {
    "screen": "home",
    "uiVersion": "v1"
  },
  "designTokens": {
    "spacing": { "xs": 4, "sm": 8, "md": 12, "lg": 16, "xl": 24 },
    "borderRadius": { "sm": 6, "md": 10, "lg": 16 },
    "colors": {
      "primary": "#2874F0",
      "white": "#FFFFFF",
      "muted": "#F5F5F5"
    }
  },
  "screenConfig": {
    "id": "home_default",
    "template": "hero_first",
    "statusBardBackground": "mutedCoral"
  },
  "sections": [
    {
      "id": "banner_default_1",
      "type": "banner",
      "version": "v2",
      "order": 2,
      "festival": "default",
      "active": true,
      "layout": {
        "container": {},
        "item": {
          "height": 180,
          "borderRadius": "md",
          "marginBottom": "md"
        }
      },
      "config": {
        "api": "banner",
        "action": {
          "route": "OfferDetails",
          "routeParams": {
            "key": ["id", "image"]
          }
        }
      }
    }
  ]
}
```

### Section Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Unique section identifier |
| `type` | string | Component type (banner, category_grid, etc.) |
| `version` | string | Component version (v1, v2) |
| `order` | number | Display order (sorted ascending) |
| `festival` | string | Festival filter ("default", "diwali", etc.) |
| `active` | boolean | Whether section is active |
| `layout` | object | Container and item styling |
| `config` | object | Component-specific configuration |

### Backend Flow

```
Request → Route → Controller → Service → DB → Response
```

**Example: Home Controller**
```javascript
// controllers/v1/home.controller.js
async function fetchHome(req, res) {
  const { festival = "default" } = req.query
  const data = await getHome(festival)
  res.json({ success: true, data })
}
```

**Service Layer:**
```javascript
// services/v1/home.service.js
async function getHome(festival = "default") {
  const data = await getHomeData()
  const sections = data.sections
    .filter(s => s.active && (s.festival === festival || s.festival === "default"))
    .sort((a, b) => a.order - b.order)
  return {
    metaData: data.metaData,
    payload: { designTokens, screenConfig, sections }
  }
}
```

---

## 📱 Frontend Overview

### Entry Point

```typescript
// app/index.tsx
export default function Home() {
  const { data } = useHomeScreen()
  if (!data) return null
  return <ScreenRenderer data={data} />
}
```

### Rendering Pipeline

1. **ScreenRenderer** → Entry point for rendering
2. **renderByVersion** → Routes to v1/v2 renderer based on `metaData.uiVersion`
3. **SDUI Renderer** → Maps sections to components via registry
4. **Components** → Render with props

### Component Props

All SDUI components receive:

```typescript
interface ComponentProps {
  layout?: LayoutConfig      // Styling configuration
  tokens?: DesignTokens       // Design tokens
  config: ComponentConfig     // Component-specific config
  apiVersion?: string         // API version for nested calls
}
```

### Supported Components

| Type | Versions | Description |
|------|----------|-------------|
| `header` | v1 | Sticky header section |
| `banner` | v1, v2 | Banner (v1: single, v2: carousel) |
| `category_grid` | v1 | Grid layout with configurable columns |
| `category_horizontal` | v1 | Horizontal scrolling list |

---

## 🚀 Running the Project

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Expo CLI (optional, `npx expo` works)

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Server runs on: `http://localhost:3000`

**Health Check:**
```bash
curl http://localhost:3000/health
```

### Frontend Setup

```bash
cd app
npm install  # or yarn install
npx expo start
```

**Options:**
- Press `i` for iOS Simulator
- Press `a` for Android Emulator
- Scan QR code for Expo Go (physical device)

**Note:** Update API URL in `src/services/home.api.ts`:
```typescript
const res = await fetch(`http://YOUR_IP:3000/api/v1/home?festival=${festival}`)
```

---

## 🛠️ Development Guide

### Adding a New Component

#### Step 1: Create Component File

```typescript
// src/sdui/v1/components/MyComponent.v1.tsx
import { SectionWrapper, SectionItemWrapper } from "../../shared"
import { DesignTokens, LayoutConfig } from "@/src/types"

interface MyComponentV1Props {
  layout?: LayoutConfig
  tokens?: DesignTokens
  config: MyComponentConfigV1
  apiVersion?: string
}

export const MyComponentV1 = ({ config, layout, tokens }: MyComponentV1Props) => {
  return (
    <SectionWrapper layout={layout} tokens={tokens}>
      <SectionItemWrapper layout={layout} tokens={tokens}>
        {/* Your component JSX */}
      </SectionItemWrapper>
    </SectionWrapper>
  )
}
```

#### Step 2: Register in Registry

```typescript
// src/sdui/registry.ts
import { MyComponentV1 } from "./v1/components/MyComponent.v1"

export const registry = {
  // ... existing
  my_component: {
    v1: MyComponentV1,
  },
}
```

#### Step 3: Add TypeScript Types

```typescript
// src/types/v1/myComponent.v1.type.ts
export interface MyComponentConfigV1 {
  title?: string
  items: Array<{ id: string; label: string }>
}

// src/types/v1/home.v1.type.ts
export type HomeSectionV1 =
  | {
      id: string
      type: "my_component"
      version?: "v1"
      config: MyComponentConfigV1
      // ... other fields
    }
  | // ... other types
```

#### Step 4: Add Backend Data

```json
// backend/data/v1/home.v1.json
{
  "sections": [
    {
      "id": "my_component_1",
      "type": "my_component",
      "version": "v1",
      "order": 10,
      "festival": "default",
      "active": true,
      "config": {
        "title": "My Component",
        "items": [...]
      }
    }
  ]
}
```

### Adding a New API Endpoint

#### Step 1: Create Route

```javascript
// backend/src/routes/v1/myFeature.routes.js
const express = require("express")
const { fetchMyFeature } = require("../../controllers/v1/myFeature.controller")
const router = express.Router()
router.get("/myFeature", fetchMyFeature)
module.exports = router
```

#### Step 2: Create Controller

```javascript
// backend/src/controllers/v1/myFeature.controller.js
const { getMyFeature } = require("../../services/v1/myFeature.service")

async function fetchMyFeature(req, res) {
  const data = await getMyFeature()
  res.json({ success: true, data })
}

module.exports = { fetchMyFeature }
```

#### Step 3: Create Service

```javascript
// backend/src/services/v1/myFeature.service.js
const { getMyFeatureData } = require("../../db/v1/myFeature.db")

async function getMyFeature() {
  return await getMyFeatureData()
}

module.exports = { getMyFeature }
```

#### Step 4: Create DB Layer

```javascript
// backend/src/db/v1/myFeature.db.js
const { readJsonFile } = require("../../utils/file.util")

async function getMyFeatureData() {
  return readJsonFile("data/v1/myFeature.v1.json")
}

module.exports = { getMyFeatureData }
```

#### Step 5: Register Route

```javascript
// backend/src/routes/index.js
const myFeatureRoutes = require("./v1/myFeature.routes")
router.use("/v1", myFeatureRoutes)
```

### Creating a Component Version (v2)

1. Create `src/sdui/v2/components/MyComponent.v2.tsx`
2. Add to registry: `my_component: { v1: ..., v2: MyComponentV2 }`
3. Add types in `src/types/v2/`
4. Use in JSON: `"version": "v2"`

---

## 📝 Type System

### API Response Types

```typescript
// Discriminated union for versioned responses
export type HomeApiResponse =
  | {
      metaData: ApiMetaData & { uiVersion: "v1" }
      payload: HomePayloadV1
    }
  | {
      metaData: ApiMetaData & { uiVersion: "v2" }
      payload: HomePayloadV2
    }
```

### Section Types

```typescript
export type HomeSectionV1 =
  | {
      id: string
      type: "banner"
      version?: "v1" | "v2"
      config: BannerConfigV1
      layout?: LayoutConfig
      order: number
      active?: boolean
    }
  | {
      id: string
      type: "category_grid"
      version?: "v1"
      config: CategoryGridConfigV1
      // ...
    }
  // ... more types
```

### Layout Types

```typescript
export interface LayoutConfig {
  container?: LayoutBox  // Container styling
  item?: LayoutBox        // Item styling
  title?: LayoutBox       // Title styling
}

export interface LayoutBox {
  padding?: string | number
  margin?: string | number
  height?: number | string
  background?: ScreenBackground
  // ... more properties
}
```

---

## 🎨 Design System

### Design Tokens

Design tokens are defined in JSON and passed to all components:

```json
{
  "designTokens": {
    "spacing": {
      "xs": 4,
      "sm": 8,
      "md": 12,
      "lg": 16,
      "xl": 24
    },
    "borderRadius": {
      "sm": 6,
      "md": 10,
      "lg": 16
    },
    "colors": {
      "primary": "#2874F0",
      "white": "#FFFFFF",
      "muted": "#F5F5F5"
    }
  }
}
```

### Background Types

```typescript
type ScreenBackground =
  | { backgroundType: "solidColor"; value: string }
  | { backgroundType: "gradient"; colors: string[]; start: [number, number]; end: [number, number]; locations?: number[] }
  | { backgroundType: "image"; value: string }
```

---

## 🔍 Examples

### Example: Banner Component

**Backend Config:**
```json
{
  "id": "banner_1",
  "type": "banner",
  "version": "v2",
  "order": 1,
  "active": true,
  "config": {
    "api": "banner",
    "action": {
      "route": "OfferDetails",
      "routeParams": { "key": ["id", "image"] }
    }
  }
}
```

**Component Implementation:**
```typescript
// Fetches data from /api/v2/banner
// Renders carousel with pagination
// Handles navigation on press
```

### Example: Festival-Based Filtering

```javascript
// Backend filters sections
const sections = data.sections
  .filter(s => s.active && (s.festival === festival || s.festival === "default"))
  .sort((a, b) => a.order - b.order)
```

**Usage:**
```bash
GET /api/v1/home?festival=diwali  # Shows Diwali-specific sections
GET /api/v1/home?festival=default # Shows default sections
```

---

## 🧪 Project Status

### ✅ Completed

- Backend serving server-driven UI config
- Expo Router based frontend
- Dynamic Home screen rendering
- Component registry system
- Versioning support (API + Component)
- Design tokens system
- Layout configuration
- Background support (gradient, image, solid)
- Nested API calls from components
- Loading states and skeletons
- Navigation with dynamic params

### 🚧 Planned

- Schema validation
- Caching & performance improvements
- Database migration (MongoDB/PostgreSQL)
- Error boundaries
- Offline support
- Analytics integration

---

## 🗺️ Planned Improvements (Future)

- Screen-level configuration (background, padding, theme)
- Component-level styling config (enhanced)
- Multiple Home screen templates
- Schema validation (JSON Schema)
- Caching & performance improvements
- Database migration
- A/B testing framework
- Feature flags integration

---

## ⚠️ Disclaimer

This project is:

- ❌ Not production-ready
- ✅ Intended for learning & experimentation
- ✅ A clean SDUI POC
- ✅ Demonstrates best practices for SDUI architecture

---

## 📚 Additional Resources

### Key Files to Understand

1. **Component Registry**: `app/src/sdui/registry.ts`
2. **Renderer**: `app/src/sdui/renderer.tsx`
3. **Version Router**: `app/src/engine/renderByVersion.ts`
4. **Home API**: `app/src/services/home.api.ts`
5. **Backend Service**: `backend/src/services/v1/home.service.js`
6. **JSON Data**: `backend/data/v1/home.v1.json`

### Debugging Tips

1. **Check Network Tab**: Verify API responses
2. **Console Logs**: Components log errors
3. **TypeScript Errors**: Check type mismatches
4. **Registry Lookup**: Ensure component is registered
5. **Version Mismatch**: Check `metaData.uiVersion` vs `section.version`

---

## 🤝 Contributing

This is a learning project. Feel free to:

- Add new components
- Improve documentation
- Fix bugs
- Add features
- Share feedback

---

## 📄 License

This project is for educational purposes.