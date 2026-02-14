import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getRoast } from "@/lib/roast-store";
import RoastResults from "@/components/RoastResults";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const roast = getRoast(id);

  if (!roast) {
    return { title: "Roast Not Found | RoastMyLanding" };
  }

  const domain = (() => {
    try {
      return new URL(roast.url).hostname;
    } catch {
      return roast.url;
    }
  })();

  return {
    title: `${domain} scored ${roast.overallScore}/100 | RoastMyLanding`,
    description: `"${roast.headline}" — See the full roast with conversion advice.`,
    openGraph: {
      title: `${domain} just got ROASTED — ${roast.overallScore}/100`,
      description: `"${roast.headline}" — Brutal AI landing page roast with specific conversion advice.`,
      type: "article",
      siteName: "RoastMyLanding",
    },
    twitter: {
      card: "summary_large_image",
      title: `${domain} scored ${roast.overallScore}/100 on RoastMyLanding`,
      description: `"${roast.headline}"`,
    },
  };
}

export default async function RoastPage({ params }: PageProps) {
  const { id } = await params;
  const roast = getRoast(id);

  if (!roast) {
    notFound();
  }

  return <RoastResults roast={roast} />;
}
