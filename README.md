# Cheddy Deals – Campaign Performance Dashboard

## Overview

Cheddy Deals is a Next.js (TypeScript) web app for tracking influencer/partner **campaigns** and their **deliverables** (posts/videos). Team members can:

- Create campaigns and attach deliverables with platform, URL, and timestamps.
- Manually record performance metrics (views, engagements) per deliverable on a dashboard.
- Export **all campaigns** or a **single campaign** to a nicely formatted PDF.

Stack: **Next.js + Tailwind CSS + Prisma (PostgreSQL)**. Prisma Client is generated to `app/generated/prisma`.

---

## Data Model

The app stores **Campaigns** and **Deliverables** with a 1→many relationship.

- `Campaign`: `id`, `name`, `partners` (string[]), `startDate`, `deliverableTarget`, `createdAt`, `deliverables`.
- `Deliverable`: belongs to exactly one campaign and has `id`, `title`, `url`, `platform` (enum), performance metrics, timestamps.

> Prisma schema (base + metric fields):

```prisma
generator client {
  provider = "prisma-client"
  output   = "../app/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Campaign {
  id                String        @id @default(uuid())
  name              String
  partners          String[]
  startDate         DateTime
  deliverableTarget Int
  createdAt         DateTime      @default(now())
  deliverables      Deliverable[]
}

enum Platform {
  X
  YouTube
  SnapChat
  TikTok
  Instagram
}

model Deliverable {
  id           String    @id @default(uuid())
  title        String
  url          String
  createdAt    DateTime  @default(now())
  platform     Platform

  // Dashboard-editable metrics
  views        Int       @default(0)
  engagements  Int       @default(0)

  campaign     Campaign  @relation(fields: [campaignId], references: [id])
  campaignId   String
}
```
## Sample Documents
# Campaign
```javascript
{
  "id": "f8b1c8bb-8e0f-4b44-8e7c-a3b4f2c909aa",
  "name": "Holiday Drop 2025",
  "partners": ["@creatorA", "@creatorB"],
  "startDate": "2025-11-15T00:00:00.000Z",
  "deliverableTarget": 12,
  "createdAt": "2025-10-29T19:00:00.000Z"
}
```
# Deliverable
```javascript
{
  "id": "ab2a3d1e-1f6c-4b01-94d1-2f1c3c2a8b7a",
  "title": "Unboxing Reel",
  "url": "https://instagram.com/p/xyz",
  "platform": "Instagram",
  "views": 52340,
  "engagements": 2890,
  "createdAt": "2025-10-30T12:00:00.000Z",
  "campaignId": "f8b1c8bb-8e0f-4b44-8e7c-a3b4f2c909aa"
}
```
## [Schema](./prisma/schema.prisma)

## Wireframes
/ -> page that shows all active campaigns
[/](./documentation/homepage.png)

/campaigns/id -> page that shows a specific campaign
[campaigns/id](./documentation/campaigns.png)

/campaigns/new -> page that allows adding of a new campaign
[campaigns/new](./documentation/create-campaign.png)

/profile -> page that shows an admin user's profile
[profile](./documentation/profile.png)

## Sitemap 
/ -> campaigns/id
Home page shows campaigns, clicking on campaigns links to them
/ -> campaigns/new
Can create a new campaign from homepage
/ -> profile
Can see user profile from homepage

## User Stories / Use Cases
1. As a user, I can create a new campaign with name, partners, start date, and deliverable target.
2. As a user, I can add deliverables to a campaign with title, platform, and URL.
3. As a user, I can input/update views and engagements for each deliverable.
4. As a user, I can see campaign progress toward the deliverableTarget and aggregate metrics.
5. As a user, I can export all campaigns to a single PDF (tabular summary + rollups).
6. As a user, I can export a single campaign to PDF (metrics tables + small charts).
7. As a user, I can filter/sort deliverables by platform and date.

## Research Topics
* (5 points) next.js
    * Use next.js as my webserver
* (5 points) tailwindcss
    * Use tailwindcss to style my pages
* (6 points) prisma and postgresql
    * use prisma to interact with my postgres database