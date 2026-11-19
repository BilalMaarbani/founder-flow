import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FounderFlow - Startup CRM",
  description:
    "FounderFlow: a lightweight CRM for startups to manage leads, opportunities and follow-ups. Training build.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>FounderFlow - Startup CRM</title>
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
