import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RoastMyLanding - Find out why your landing page isn't converting",
  description:
    "Paste your URL, get a no-BS roast of your landing page with real fixes you can ship today. Scored across 8 categories. EUR 9 per roast.",
  openGraph: {
    title: "RoastMyLanding - Your landing page sucks. Let us prove it.",
    description:
      "Paste your URL. Get roasted across 8 conversion categories. Walk away knowing exactly what to fix.",
    type: "website",
    siteName: "RoastMyLanding",
  },
  twitter: {
    card: "summary_large_image",
    title: "RoastMyLanding - Your landing page sucks. Let us prove it.",
    description:
      "Paste your URL. Get roasted across 8 conversion categories. Walk away knowing exactly what to fix.",
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
