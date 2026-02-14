import { RoastResult } from "./types";

// In-memory store for demo purposes.
// In production, replace with a database (Postgres, Redis, etc.)
const roasts = new Map<string, RoastResult>();

export function saveRoast(roast: RoastResult): void {
  roasts.set(roast.id, roast);
  roasts.set(roast.shareSlug, roast);
}

export function getRoast(idOrSlug: string): RoastResult | undefined {
  return roasts.get(idOrSlug);
}

export function getAllRoasts(): RoastResult[] {
  // Deduplicate (each roast stored under both id and slug)
  const seen = new Set<string>();
  const results: RoastResult[] = [];
  for (const roast of roasts.values()) {
    if (!seen.has(roast.id)) {
      seen.add(roast.id);
      results.push(roast);
    }
  }
  return results;
}
