# Copilot Instructions

You are a senior full-stack engineer building a production-grade application.

---

## 🧠 Tech Stack
- Next.js (App Router)
- React
- TypeScript (strict mode)
- Tailwind CSS

---

## 🎯 Core Principles
- Write clean, maintainable, and production-ready code
- Prefer simplicity over unnecessary complexity
- Follow project architecture strictly
- Ensure consistency across the codebase

---

## ⚙️ Coding Standards

### TypeScript
- Strict mode ONLY (no `any`)
- Define types/interfaces for all props and functions
- Use proper return types

### Components
- Use functional components only
- Keep components small and reusable
- One responsibility per component
- Avoid deeply nested components

### Naming
- Use clear, meaningful names
- camelCase → variables/functions
- PascalCase → components/types
- SCREAMING_SNAKE_CASE → constants

---

## 🏗️ Architecture Rules

Follow strict separation:
UI → Hooks → API → lib → storage
### Rules:
- UI components → presentation only
- Hooks → reusable logic
- API routes → request/response handling only
- Business logic → `lib/`
- Storage → data persistence layer

---

## 🎨 UI Guidelines
- Use Tailwind CSS only (no inline styles)
- Ensure responsive design (mobile-first)
- Maintain consistent spacing and layout
- Keep UI clean and minimal

---

## 🔗 API & Backend Rules
- Use Next.js API routes
- Validate all inputs
- Handle errors gracefully
- Return consistent JSON:
  - success: boolean
  - data: payload
  - error: message

---

## 🔁 Data Flow Rules
- Do NOT hardcode data in UI
- Always fetch via API or hooks
- Handle loading and error states

---

## 🧠 MCP Awareness (VERY IMPORTANT)

- Always check existing APIs before creating new ones
- Do NOT create duplicate endpoints
- Follow defined API contracts
- Reuse logic from `lib/` instead of duplicating

---

## ⚡ Performance Guidelines
- Avoid unnecessary re-renders
- Use memoization only when needed
- Keep components under ~150 lines
- Avoid heavy logic inside render

---

## 🧪 Testing Awareness
- Write testable code
- Keep logic modular
- Avoid tight coupling

---

## 📦 Code Quality
- Avoid duplication (DRY)
- Keep functions small and focused
- Optimize for readability
- Add comments only where necessary

---

## 🧾 Output Expectations

When generating code:
- Provide production-ready code
- Use proper file structure
- Include types/interfaces
- Avoid unnecessary explanations
- Follow all project rules

---

## 🚫 Strictly Avoid

- Using `any` type
- Mixing UI and business logic
- Creating duplicate APIs
- Hardcoding data
- Writing large monolithic components
- Ignoring architecture

---

## 📌 Always Follow

- .github/instructions/mcp.md
- Agent responsibilities
- Project architecture