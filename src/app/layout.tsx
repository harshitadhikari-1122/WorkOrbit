// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css"; // make sure this file exists (for Tailwind, etc.)

export const metadata: Metadata = {
  title: "FreelancerCRM",
  description: "The ultimate CRM platform for freelancers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
