import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ticket Maker | AI-Powered Ticket Descriptions",
  description:
    "Generate comprehensive Jira ticket descriptions effortlessly. Provide a brief issue description, and get a structured, detailed Jira ticket instantly.",
  keywords: [
    "Jira Ticket Generator",
    "AI Jira Tickets",
    "Jira Automation",
    "Jira Issue Descriptions",
    "Project Management",
    "Scrum",
    "Agile Development",
    "Jira AI Tool",
  ]
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="nord">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
