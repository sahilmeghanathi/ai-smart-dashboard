# MCP (Model Context Protocol) Rules

This document defines how AI agents must interact with APIs, data, and architecture.

---

## 🔗 Available APIs

### 1. /api/links
- GET → Fetch all links
- POST → Create a new link (title, url)
- DELETE → Delete link by id

---

### 2. /api/visit
- POST → Increment visit count for a link

---

### 3. /api/links/top
- GET → Return top links sorted by visit count
- Optional query:
  - `limit` (default: 5)

---

## 🧠 Core Rules (STRICT)

### 1. API Usage
- ALWAYS use existing APIs before creating new ones
- NEVER create duplicate endpoints
- DO NOT modify API contracts without reason

---

### 2. Architecture Enforcement
Follow strict layering:
UI → API → lib → storage
Rules:
- No business logic inside UI components
- API routes handle request/response only
- Business logic must be inside `lib/`
- Storage layer handles data persistence

---

### 3. Data Handling
- Do NOT hardcode data in UI
- Always fetch from API or storage layer
- Ensure proper error handling and validation

---

### 4. REST Standards
- Use correct HTTP methods (GET, POST, DELETE)
- Return consistent JSON responses:
  - success: boolean
  - data: payload
  - error: message (if any)
- Use proper status codes (200, 400, 500)

---

### 5. AI Behavior Rules

When generating or modifying code:

- Prefer extending existing APIs instead of creating new ones
- If a new API is required:
  - Justify why existing APIs are insufficient
  - Follow current structure and naming conventions

- Always check:
  - Does this already exist?
  - Can it be reused?
  - Is it aligned with architecture?

---

### 6. Code Organization

- API files → `app/api/...`
- Business logic → `app/lib/...`
- UI components → `components/...`
- Types/interfaces → separate files

---

### 7. Validation & Error Handling

- Validate all inputs in API layer
- Handle errors gracefully
- Never expose internal errors directly

---

## 🚫 Strictly Avoid

- Creating duplicate APIs
- Mixing UI and business logic
- Writing logic directly inside API routes
- Ignoring existing architecture
- Hardcoding data in UI

---

## 📌 Always Follow

- copilot-instructions.md
- Agent responsibilities
- Project architecture