import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import HomeComponent from "@/components/HomeComponent";
import { Campaign } from "@prisma/client";

export const dynamic = "force-dynamic"; // reads request headers



export default async function HomePage({
  searchParams,
}: {
  searchParams: { filter?: "active" | "completed" | "all"; page?: string };
}) {
  const h = await headers();
  const username = h.get("x-user-username") ?? "unknown";

  const pageSize = 2; // 2 cards per page (like screenshot)
  const page = Math.max(1, Number(searchParams?.page ?? 1));
  const filter = (searchParams?.filter ?? "active") as "active" | "completed" | "all";

  // Get all campaign ids + counts to compute filters/pagination server-side
  const allCampaigns = await prisma.campaign.findMany({
    include: { _count: { select: { deliverables: true } } },
    orderBy: { createdAt: "desc" },
  });

  const filteredIds = allCampaigns
    .filter((c) => {
      const done = c._count.deliverables;
      const completed = done >= c.deliverableTarget;
      if (filter === "active") return !completed;
      if (filter === "completed") return completed;
      return true;
    })
    .map((c) => c.id);

  const total = filteredIds.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const slice = filteredIds.slice((page - 1) * pageSize, page * pageSize);

  const campaigns = await prisma.campaign.findMany({
    where: { id: { in: slice } },
    include: { deliverables: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <HomeComponent
      username={username}
      page={page}
      totalPages={totalPages}
      filter={filter}
      cards={campaigns}
    />
  );
}