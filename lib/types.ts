import { Campaign, Deliverable } from "@prisma/client";



export type CampaignAndDeliverables = Campaign & { deliverables: Deliverable[] }