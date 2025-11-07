import HomeComponent from "@/components/HomeComponent";
import { headers } from "next/headers";


export default async function HomePage() {
  const h = await headers();
  const username = h.get("x-user-username") ?? "unknown";
  return <HomeComponent username={username} />;
}
