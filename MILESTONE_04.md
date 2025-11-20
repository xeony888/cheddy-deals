Milestone 04 - Final Project Documentation
===

NetID
---
jph9540 

Name
---
Josh Handelman

Repository Link
---
https://github.com/xeony888/cheddy-deals

URL for deployed site 
---
https://cheddy-deals.onrender.com
(Local: http://localhost:3000)

URL for form 1 (from previous milestone) 
---
Login Form  
http://localhost:3000/login

Special Instructions for Form 1
---
Authentication required.  
Use the test account:

- **Username:** admin  
- **Password:** admin  

Must have `.env` configured with:

DATABASE_URL=...
JWT_SECRET=...

Run migrations: `npx prisma migrate dev`  
Seed the admin user using the `/api/auth/register` endpoint.

URL for form 2 (for current milestone)
---
Create Campaign Form  
http://localhost:3000/campaigns/new

Special Instructions for Form 2
---
Requires login.  
After submitting, the new campaign appears on the homepage dashboard.  
Required fields: name, start date, deliverable target.

URL for form 3 (from previous milestone) 
---
Create Deliverable Form  
http://localhost:3000/campaigns/<campaignId>/deliverables/new

Special Instructions for Form 3
---
Requires login.  
Automatically links the deliverable to the campaign.  
Form validates Platform / Date / Title / URL.

---

First link to github line number(s) for constructor, HOF, etc.
---
Campaign card transformation (higher-order mapping function)  
https://github.com/xeony888/cheddy-deals/blob/main/app/page.tsx

Second link to github line number(s) for constructor, HOF, etc.
---
Deliverable table row renderer using `.map()` HOF  
https://github.com/xeony888/cheddy-deals/blob/main/components/campaign/Deliverables.tsx

Short description for links above
---
1. **Campaign card mapper** — Uses `.map()` to convert Campaign Prisma objects into UI-ready card structures with computed fields (percentage complete, formatted dates, deliverables count).  
2. **Deliverables table mapper** — Uses `.map()` to dynamically render each deliverable into an interactive row (View, Edit, Delete), transforming database objects into UI table entries.

---

Link to github line number(s) for schemas (db.js or models folder)
---
Prisma models (Campaign, Deliverable, Platform enum)  
https://github.com/<repo>/prisma/schema.prisma#L1-L60

---

Description of research topics above with points
---
**3 points — Next.js App Router Authentication + Middleware**  
Implemented full authentication flow (login, sessions, cookies, JWT) and middleware that injects user headers into every protected request. Custom JWT signing & verification. Persistent user session handling across server components.

**3 points — Database ORM with Prisma (Relational Modeling, Relations, Cascading)**  
Built relational schema for Campaigns, Deliverables, and Platform enum. Used Prisma Client for CRUD operations, validation, and queries with relational includes and filtering.

**2 points — Full-stack Dynamic Rendering with Next.js 15 Server Components**  
Used async server components that fetch DB data, dynamically render filtered/paginated dashboards, and pass props to client components.

**2 points — Advanced UI System in React + Tailwind (Component Architecture)**  
Built complete dashboard UI, campaign cards, tab system, deliverables tables, and interactive forms styled consistently using TailwindCSS.

**1 point — API Architecture (REST routing, parameterized API folders)**  
Created complete REST API for creating/editing/deleting campaigns and deliverables using parameterized App Router API routes.

---

Links to github line number(s) for research topics described above
---
**Next.js Authentication + Middleware**  
https://github.com/xeony888/cheddy-deals/blob/main/middleware.ts

**JWT Auth**  
https://github.com/xeony888/cheddy-deals/blob/main/lib/auth.ts

**Campaign Create API**  
https://github.com/xeony888/cheddy-deals/blob/main/app/api/campaigns/route.ts

**Campaign Edit API**  
https://github.com/xeony888/cheddy-deals/blob/main/app/api/campaigns/[id]/edit/route.ts

**Campaign Delete API**  
https://github.com/xeony888/cheddy-deals/blob/main/app/api/campaigns/[id]/delete/route.ts

**Deliverable Create API**  
https://github.com/xeony888/cheddy-deals/blob/main/app/api/campaigns/[id]/deliverables/route.ts

**Deliverable Delete API**  
https://github.com/xeony888/cheddy-deals/blob/main/app/api/campaigns/[id]/deliverables/delete/route.ts

**UI Components (Campaign Dashboard)**  
https://github.com/xeony888/cheddy-deals/blob/main/components/CampaignsClient.tsx

**UI Components (Deliverables Table)**  
https://github.com/xeony888/cheddy-deals/blob/main/components/CampaignDetail/DeliverablesTab.tsx

---

Optional project notes 
---
- A seeded admin account is required to log in.  
- Middleware injects `x-user-id` and `x-user-username` headers into all protected routes.  
- All API routes are designed to work cleanly with Next.js App Router’s server components.  
- The dashboard UI is inspired by analytics CRMs: filters, tabs, pagination, detail views.

---

Attributions
---
- **lib/auth.ts** — JWT implementation based on jose library docs: https://github.com/panva/jose  
- **Prisma schema** — Based on Prisma relational documentation: https://www.prisma.io/docs/orm  
- **Next.js App Router patterns** — Based on Next.js official examples: https://nextjs.org/docs  
- **TailwindCSS styling** — Utility classes referenced from Tailwind docs: https://tailwindcss.com/docs  