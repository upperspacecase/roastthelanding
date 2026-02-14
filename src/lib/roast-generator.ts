import { nanoid } from "nanoid";
import { RoastResult, RoastCategory } from "./types";

// Roast generation prompt for AI analysis
const ROAST_SYSTEM_PROMPT = `You are RoastBot, a brutally honest (but helpful) landing page critic. You combine the savage wit of a comedy roast with the analytical precision of a top CRO consultant.

Your job is to analyze a landing page and provide:
1. A savage one-liner headline about the page
2. An overall score from 0-100
3. Scores and roasts for 8 categories
4. Quick win recommendations

Be BRUTALLY honest but ALWAYS provide specific, actionable advice. The humor should be sharp but the advice should be genuinely useful.

Categories to evaluate (score each 0-10):
- Headline: Is it clear, compelling, and benefit-driven?
- Visual Hierarchy: Does the eye flow naturally? Is there a clear focal point?
- CTA Clarity: Are CTAs clear, compelling, and well-placed?
- Trust Signals: Testimonials, logos, social proof, guarantees?
- Page Speed: How fast does it feel? Heavy images, bloated code?
- Layout/UX: Is the design clean, modern, and conversion-focused?
- Copy Quality: Is the writing clear, persuasive, and customer-focused?
- Value Proposition: Is it immediately clear what this does and why someone should care?

Respond in valid JSON with this exact structure:
{
  "headline": "savage one-liner about the page",
  "overallScore": 45,
  "summary": "2-3 sentence brutal summary",
  "categories": [
    {
      "name": "Headline",
      "score": 3,
      "emoji": "💀",
      "roast": "savage observation",
      "advice": "specific actionable fix"
    }
  ],
  "quickWins": ["specific quick win 1", "specific quick win 2", "specific quick win 3", "specific quick win 4"]
}

Use these emoji guidelines for scores:
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
    `"${domain}" looks like it was designed during a caffeine-fueled panic attack`,
    `I've seen better conversion optimization on a 404 page`,
    `This page has the persuasive power of a wet napkin`,
    `If "we ran out of budget" was a landing page`,
    `This page converts about as well as a screen door on a submarine`,
    `Someone spent time on this, and that's honestly the saddest part`,
    `This is what happens when you let the intern "just make it look nice"`,
  ];

  const categories: RoastCategory[] = [
    {
      name: "Headline",
      score: scores[0],
      emoji: getEmoji(scores[0]),
      roast: `Your headline is so generic it could be for literally any product in existence. "${domain}" visitors have no idea what you actually do within the first 3 seconds.`,
      advice:
        "Rewrite your headline to include: (1) who it's for, (2) what problem it solves, (3) the specific outcome. Example format: '[Target audience] use [Product] to [outcome] without [pain point].'",
    },
    {
      name: "Visual Hierarchy",
      score: scores[1],
      emoji: getEmoji(scores[1]),
      roast:
        "Everything on this page is competing for attention like toddlers at a birthday party. There's no clear visual flow or focal point.",
      advice:
        "Establish a clear Z-pattern or F-pattern layout. Make your headline 2x bigger than everything else. Use whitespace aggressively. One primary CTA color, everything else neutral.",
    },
    {
      name: "CTA Clarity",
      score: scores[2],
      emoji: getEmoji(scores[2]),
      roast:
        'Your call-to-action is about as motivating as a "Please form an orderly queue" sign. "Get Started" or "Sign Up" tells visitors nothing about what they\'re getting.',
      advice:
        'Make your CTA button text outcome-focused. Instead of "Sign Up," try "Start Converting More Traffic — Free" or "Get My Custom Report." Add urgency or specificity.',
    },
    {
      name: "Trust Signals",
      score: scores[3],
      emoji: getEmoji(scores[3]),
      roast:
        "Zero social proof. No testimonials, no customer logos, no numbers. You're asking people to trust a stranger on the internet. Bold strategy.",
      advice:
        "Add 3-5 customer testimonials with real names and photos. Show client logos. Display key metrics ('Trusted by X+ companies'). Add a money-back guarantee badge near the CTA.",
    },
    {
      name: "Page Speed",
      score: scores[4],
      emoji: getEmoji(scores[4]),
      roast:
        "The page loads like it's carrying emotional baggage. Every second of load time costs you 7% in conversions. Do the math on your traffic.",
      advice:
        "Optimize images (use WebP, lazy load below-fold). Minimize JavaScript bundles. Use a CDN. Aim for <2s load time. Run Lighthouse and fix every red flag.",
    },
    {
      name: "Layout/UX",
      score: scores[5],
      emoji: getEmoji(scores[5]),
      roast:
        "This layout feels like a Frankenstein of different design trends stitched together. It's not terrible — it's just aggressively mediocre.",
      advice:
        "Pick ONE design system and stick with it. Limit your color palette to 3 colors max. Ensure consistent spacing (8px grid). Mobile-first responsive design is non-negotiable.",
    },
    {
      name: "Copy Quality",
      score: scores[6],
      emoji: getEmoji(scores[6]),
      roast:
        "Your copy reads like it was written by someone describing their product to a mirror. It's all features, no benefits. Nobody cares about your tech stack.",
      advice:
        "Rewrite every feature as a benefit. Use the 'So what?' test — for every statement, ask 'so what does this mean for the customer?' Use customer language, not industry jargon.",
    },
    {
      name: "Value Proposition",
      score: scores[7],
      emoji: getEmoji(scores[7]),
      roast: `After reading the entire page, I still couldn't explain to a friend what ${domain} does or why they should pay for it. That's a conversion killer.`,
      advice:
        "Your value prop should be crystal clear in 5 seconds. Use the formula: 'We help [audience] achieve [desired outcome] by [mechanism], unlike [alternative] which [limitation].'",
    },
  ];

  return {
    headline: headlines[Math.floor(Math.random() * headlines.length)],
    overallScore,
    summary: `${domain} is a masterclass in how NOT to convert visitors. The page suffers from generic messaging, weak CTAs, and a complete absence of social proof. The good news? Every problem here is fixable, and fixing them could dramatically increase your conversion rate.`,
    categories,
    quickWins: [
      "Rewrite your headline to include a specific benefit and measurable outcome",
      "Add at least 3 customer testimonials with real names, photos, and specific results",
      `Change your CTA from generic text to something outcome-focused like "Get My Free [Result]"`,
      "Add a trust bar with client logos or press mentions above the fold",
      "Remove at least 40% of the text — if it doesn't directly drive conversion, cut it",
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
