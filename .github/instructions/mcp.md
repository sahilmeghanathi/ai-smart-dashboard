MCP (Model Context Protocol) Rules:

APIs available:

1. /api/links
   - GET: get all links
   - POST: create link
   - DELETE: delete link

2. /api/visit
   - POST: track visit

3. /api/links/top
   - GET: return top links sorted by visit count

Rules:
- Always use existing APIs before creating new ones
- Do not create duplicate endpoints
- Follow REST standards
- Keep logic inside lib/ folder

Architecture:
- API → lib → storage
- No business logic inside UI