export interface RoastCategory {
  name: string;
  score: number; // 0-10
  emoji: string;
  roast: string;
  advice: string;
}

export interface RoastResult {
  id: string;
  url: string;
  screenshotUrl?: string;
  overallScore: number; // 0-100
  headline: string; // The savage one-liner
  summary: string;
  categories: RoastCategory[];
  quickWins: string[];
  createdAt: string;
  shareSlug: string;
}

export interface RoastRequest {
  url: string;
  sessionId: string;
}

export type RoastStatus = "idle" | "capturing" | "analyzing" | "roasting" | "done" | "error";
