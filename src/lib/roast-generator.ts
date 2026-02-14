import { nanoid } from "nanoid";
import { RoastResult, RoastCategory } from "./types";

// Roast generation prompt for AI analysis
const ROAST_SYSTEM_PROMPT = `You roast landing pages. You're blunt, funny, and you know conversion. Think "your honest friend who works in marketing" — not corporate, not trying to sound smart, just direct.

Rules:
- Be harsh but make every criticism useful. No vague "could be improved" nonsense.
- Write like a person, not a blog post. Short sentences. No filler words.
- Don't say "actionable", "leverage", "optimize", "utilize", or "transform".
- Every piece of advice should be something they can do TODAY.
- Be funny. Not "dad joke" funny. "Painfully accurate observation" funny.

Score these 8 categories from 0-10:
- Headline: Can I tell what this product does and why I'd want it?
- Visual Hierarchy: Does my eye know where to go?
- CTA Clarity: Do the buttons tell me what I'm getting?
- Trust Signals: Any reason to believe this isn't a scam?
- Page Speed: Does it load fast or do I have time to make coffee?
- Layout/UX: Does the design help or hurt?
- Copy Quality: Is the writing about the customer or about the company?
- Value Proposition: After reading everything, do I know why I should pay?

Respond in valid JSON:
{
  "headline": "one-liner roast of the page",
  "overallScore": 45,
  "summary": "2-3 sentence summary, blunt tone",
  "categories": [
    {
      "name": "Headline",
      "score": 3,
      "emoji": "💀",
      "roast": "what's wrong, be specific",
      "advice": "what to do about it, be concrete"
    }
  ],
  "quickWins": ["fix 1", "fix 2", "fix 3", "fix 4"]
}

Emoji guide:
- 0-2: 💀 or 🪦
- 3-4: 😵 or 🫠
- 5-6: 😬 or 🤷
- 7-8: 😏 or 👀
- 9-10: 🔥 or 💪`;

// Generate a roast using OpenAI API
async function generateAIRoast(url: string): Promise<{
  headline: string;
  overallScore: number;
  summary: string;
  categories: RoastCategory[];
  quickWins: string[];
}> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || apiKey === "sk-placeholder") {
    // Return demo roast when no API key is configured
    return generateDemoRoast(url);
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: ROAST_SYSTEM_PROMPT },
          {
            role: "user",
            content: `Roast this landing page: ${url}\n\nAnalyze everything you can infer from the URL, domain name, and common patterns for this type of site. Be specific and brutal.`,
          },
        ],
        temperature: 0.9,
        max_tokens: 2000,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      console.error("OpenAI API error:", response.status);
      return generateDemoRoast(url);
    }

    const data = await response.json();
    const parsed = JSON.parse(data.choices[0].message.content);
    return parsed;
  } catch (error) {
    console.error("Error generating AI roast:", error);
    return generateDemoRoast(url);
  }
}

// Generate a demo roast based on URL analysis
function generateDemoRoast(url: string): {
  headline: string;
  overallScore: number;
  summary: string;
  categories: RoastCategory[];
  quickWins: string[];
} {
  const domain = (() => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  })();

  const scores = [
    Math.floor(Math.random() * 4) + 2,
    Math.floor(Math.random() * 4) + 3,
    Math.floor(Math.random() * 3) + 2,
    Math.floor(Math.random() * 4) + 2,
    Math.floor(Math.random() * 4) + 4,
    Math.floor(Math.random() * 4) + 3,
    Math.floor(Math.random() * 3) + 3,
    Math.floor(Math.random() * 3) + 2,
  ];

  const overallScore = Math.round(
    (scores.reduce((a, b) => a + b, 0) / scores.length) * 10
  );

  const getEmoji = (score: number) => {
    if (score <= 2) return ["💀", "🪦"][Math.floor(Math.random() * 2)];
    if (score <= 4) return ["😵", "🫠"][Math.floor(Math.random() * 2)];
    if (score <= 6) return ["😬", "🤷"][Math.floor(Math.random() * 2)];
    if (score <= 8) return ["😏", "👀"][Math.floor(Math.random() * 2)];
    return ["🔥", "💪"][Math.floor(Math.random() * 2)];
  };

  const headlines = [
    `${domain} looks like it was designed at 2am the night before launch`,
    `I've seen better conversion rates on a 404 page`,
    `This page has the persuasive power of a wet napkin`,
    `If "we'll fix it later" had a landing page, this would be it`,
    `This page converts about as well as a screen door on a submarine`,
    `Someone clearly tried here. That's what makes it so painful.`,
    `You know that template you were supposed to customize? Yeah.`,
  ];

  const categories: RoastCategory[] = [
    {
      name: "Headline",
      score: scores[0],
      emoji: getEmoji(scores[0]),
      roast: `Your headline could be for literally any product on earth. Someone lands on ${domain} and within 3 seconds they still don't know what you do.`,
      advice:
        "Answer one question in your headline: \"Why should I care?\" Include who it's for and what they get. Skip cleverness, be direct.",
    },
    {
      name: "Visual Hierarchy",
      score: scores[1],
      emoji: getEmoji(scores[1]),
      roast:
        "Everything on this page is screaming at the same volume. Nothing stands out because everything's trying to stand out.",
      advice:
        "Make your headline the biggest thing on the page. One CTA color, everything else muted. Add more whitespace — you're cramming too much in.",
    },
    {
      name: "CTA Clarity",
      score: scores[2],
      emoji: getEmoji(scores[2]),
      roast:
        "\"Get Started.\" Get started with what? Nobody clicks a button that doesn't tell them what happens next.",
      advice:
        "Your button text should finish the sentence \"I want to...\" — e.g., \"Start my free trial\" or \"See pricing.\" Say what they get, not what they do.",
    },
    {
      name: "Trust Signals",
      score: scores[3],
      emoji: getEmoji(scores[3]),
      roast:
        "No testimonials, no logos, no numbers. You're asking cold traffic to just... trust you? That's not how this works.",
      advice:
        "Add testimonials with real names and photos. Show logos of customers or press. Put a number on it — \"Used by 500+ teams\" hits harder than nothing.",
    },
    {
      name: "Page Speed",
      score: scores[4],
      emoji: getEmoji(scores[4]),
      roast:
        "Your page loads like it's thinking about whether it even wants to. Every extra second costs you roughly 7% of visitors. Run the math.",
      advice:
        "Compress your images (switch to WebP). Lazy load anything below the fold. Cut unused JS. Get load time under 2 seconds.",
    },
    {
      name: "Layout/UX",
      score: scores[5],
      emoji: getEmoji(scores[5]),
      roast:
        "This layout looks like three different designers worked on it and none of them talked to each other.",
      advice:
        "Pick one design direction and commit to it. Three colors max. Consistent spacing. Make sure it looks good on mobile — that's probably where most of your traffic is.",
    },
    {
      name: "Copy Quality",
      score: scores[6],
      emoji: getEmoji(scores[6]),
      roast:
        "Your copy is a feature list disguised as a landing page. You're describing what your product does. Nobody cares about that. They care about what it does for them.",
      advice:
        "For every feature, ask \"so what?\" and write the answer instead. \"Real-time sync\" becomes \"Your team always has the latest version — no more Slack messages asking which file is the right one.\"",
    },
    {
      name: "Value Proposition",
      score: scores[7],
      emoji: getEmoji(scores[7]),
      roast: `I read the whole page and I genuinely cannot tell someone what ${domain} does or why it costs money. If I can't figure it out, neither can your visitors.`,
      advice:
        "Make it stupid simple: \"[Product] helps [who] do [what] without [pain].\" Put that front and center. You have about 5 seconds before someone bounces.",
    },
  ];

  return {
    headline: headlines[Math.floor(Math.random() * headlines.length)],
    overallScore,
    summary: `${domain} has the bones of a decent page buried under vague copy, invisible CTAs, and zero reasons for anyone to trust you. The fixes aren't hard — most of them you can do this afternoon — but right now this page is leaving money on the table.`,
    categories,
    quickWins: [
      "Rewrite your headline so it answers \"why should I care?\" in one sentence",
      "Add 3 customer testimonials with real names and faces above the fold",
      `Rename your CTA — "Get Started" says nothing. Try "Start my free trial" or "See it in action"`,
      "Put a trust bar (customer logos or press mentions) near the top of the page",
      "Cut at least a third of your body copy — if a sentence doesn't drive the click, delete it",
    ],
  };
}

// Main function to generate a complete roast
export async function generateRoast(url: string): Promise<RoastResult> {
  const id = nanoid(12);
  const shareSlug = nanoid(8);

  const roastData = await generateAIRoast(url);

  return {
    id,
    url,
    overallScore: roastData.overallScore,
    headline: roastData.headline,
    summary: roastData.summary,
    categories: roastData.categories,
    quickWins: roastData.quickWins,
    createdAt: new Date().toISOString(),
    shareSlug,
  };
}
