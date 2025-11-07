Milestone 02
===

Repository Link
---
https://github.com/<your-org-or-user>/cheddy-auth-nextjs

Special Instructions for Using Form (or Login details if auth is part of your project)
---
**Login form credentials (dev):**
- Username: `admin`
- Password: `admin`

**Env required:**
- `DATABASE_URL` (Postgres)
- `JWT_SECRET` (32+ random bytes; e.g., `openssl rand -base64 32`)

**Local run:**
1) `npm i`
2) `npx prisma migrate dev`
3) Seed user:  
   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"admin"}'