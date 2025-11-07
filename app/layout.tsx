
// @ts-ignore
import "./globals.css";

export const metadata = { title: "In The Freezer - Campaign Tracker" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}