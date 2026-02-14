import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RoastMyLanding - AI Landing Page Roasts | Get Brutally Honest Conversion Advice",
  description:
    "Submit your landing page URL and get a savage, data-driven roast with specific conversion advice. No fluff, no mercy, just actionable feedback that makes you money.",
  openGraph: {
    title: "RoastMyLanding - Your Landing Page Just Got Roasted",
    description:
      "AI-powered landing page roasts with brutally honest conversion advice. Submit your URL, get destroyed, then fix it.",
    type: "website",
    siteName: "RoastMyLanding",
  },
  twitter: {
    card: "summary_large_image",
    title: "RoastMyLanding - Your Landing Page Just Got Roasted",
    description:
      "AI-powered landing page roasts with brutally honest conversion advice.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
