import https from "https";
import { readFileSync } from "fs";

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n").filter(l => l && !l.startsWith("#"))
    .map(l => [l.split("=")[0].trim(), l.slice(l.indexOf("=") + 1).trim()])
);

function req(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const r = https.request({
      hostname: env.N8N_HOST, path, method,
      headers: {
        "X-N8N-API-KEY": env.N8N_API_KEY,
        "Content-Type": "application/json",
        ...(data ? { "Content-Length": Buffer.byteLength(data) } : {})
      }
    }, x => {
      let d = ""; x.on("data", c => d += c);
      x.on("end", () => resolve({ s: x.statusCode, b: d }));
    });
    r.on("error", reject);
    if (data) r.write(data);
    r.end();
  });
}

const SYSTEM_PROMPT = `You are the world's #1 LinkedIn ghostwriter. You write viral content for Dizilo — an elite AI automation and e-commerce agency in Birmingham, UK that builds custom AI agents, intelligent workflow automation, and high-converting Shopify and WooCommerce stores for businesses worldwide.

You have studied every viral LinkedIn post from the top 1% of creators. You know exactly what makes people stop scrolling, comment, share, and tag their friends.

RULES — NON NEGOTIABLE:
1. FIRST LINE IS EVERYTHING. Use one of: shocking stat / bold statement / controversial opinion / direct challenge. No greetings. No "I am excited". No "In todays world".
2. SHORT LINES. Max 10 words per line. Single sentence paragraphs. White space is king on mobile.
3. BUILD TENSION. Each line must make the reader need to read the next one.
4. USE THE NEWS. Reference the AI headlines provided. Make the post feel current and urgent.
5. TELL STORIES. Real or realistic — make it lived in and specific with numbers.
6. END WITH FIRE. Last line before CTA must spark debate or issue a bold challenge.
7. CTA: One line. Natural. Mention dizilo.com without being salesy.
8. HASHTAGS at the very end: #AIAgents #WorkflowAutomation #Ecommerce #AIForBusiness #Dizilo #ShopifyDevelopment #BusinessAutomation
9. EMOJIS: Maximum 2. Only if they add real punch. Never decorative.
10. LENGTH: Exactly 200 to 240 words. Count carefully.
11. BANNED WORDS: "In todays world", "thrilled", "excited to share", "fast-paced", "leverage", "synergy", "game-changer", "transformative", "landscape"
12. GOAL: Every post must make at least 10 people want to comment and 5 people tag someone they know.`;

const TOPICS = [
  `MONDAY HOT TAKE: Challenge the assumption that hiring more staff solves growth. Argue AI automation is smarter, cheaper, faster. Use todays news as ammunition. Make business owners question their last hire decision.`,
  `TUESDAY STORY: Tell the story of a real-feeling e-commerce business owner drowning in 200 daily emails and manual orders with no time for family. Show how one AI workflow changed everything in 2 weeks. Be specific with numbers.`,
  `WEDNESDAY MYTH BUSTER: Destroy the myth that AI automation is only for big tech companies with massive budgets. Show exactly how a 5-person business can deploy the same AI systems as Amazon. Make it feel urgent and accessible.`,
  `THURSDAY INSIDER INSIGHT: Share what separates Shopify stores making 10k per month from those making 100k per month. It is not traffic. It is not ads. Make e-commerce owners feel like they just got secret insider knowledge.`,
  `FRIDAY UNPOPULAR OPINION: Make a bold controversial statement about the future of work and AI that will divide the comments. Use todays news headlines to back it up with evidence. Half the readers should agree passionately, half should push back.`,
  `SATURDAY DEBATE QUESTION: Ask the one question every business owner secretly wonders about AI but is afraid to ask publicly. Frame it to guarantee comments from both believers and skeptics.`,
  `SUNDAY FOMO: Create genuine urgency. Businesses winning right now started their AI automation journey 12 months ago. Make the reader feel behind — and that dizilo.com is the shortcut to catching up fast.`
];

const IMAGE_PROMPTS = [
  `Cinematic photograph of a modern dark office at night, multiple screens showing AI automation dashboards glowing in deep blue and crimson red, dramatic rim lighting, shallow depth of field, ultra-sharp photorealistic 8K quality, no text, no logos`,
  `Split-screen cinematic image: left half shows a stressed entrepreneur surrounded by chaotic paperwork in harsh warm light, right half shows the same person relaxed at a clean minimal desk with a single glowing laptop in cool blue light, dramatic contrast, photorealistic`,
  `Cinematic macro visualization of an AI neural network in deep black space with glowing crimson red and electric blue connection nodes, depth of field, cinematic grade, ultra realistic, no text`,
  `Premium product photography: high-converting e-commerce store on a sleek laptop and smartphone on dark marble surface, subtle crimson accent lighting, professional studio quality, ultra sharp, luxurious feel, no text`,
  `Dramatic cinematic portrait of a confident young entrepreneur in a dark modern office, holographic AI interface floating in front of them glowing in red and blue, dramatic side lighting, shallow depth of field, photorealistic`,
  `Abstract digital art of interconnected glowing nodes forming a human brain shape against pitch black background, some nodes crimson red some electric blue, multiple depth layers, ultra high quality, cinematic grade, no text`,
  `Wide cinematic shot of a minimalist dark boardroom with floor-to-ceiling windows showing a city skyline at night, single laptop open showing dashboards, dramatic lighting, luxury aesthetic, deep blacks and crimson accents, photorealistic`
];

const WF_ID = "nSTbmFIcCJ6lDI0q";

const getContextCode = `
const topics = ${JSON.stringify(TOPICS)};
const styles = ${JSON.stringify(IMAGE_PROMPTS)};
const day = new Date().getDay();
const headlines = $input.first().json.headlines;
return [{ json: { topic: topics[day], imageStyle: styles[day], headlines } }];
`;

const gptBody = JSON.stringify({
  model: "gpt-4o",
  messages: [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "user",
      content: "TODAYS AI NEWS HEADLINES (use naturally):\n{{ $json.headlines }}\n\nTODAYS POST BRIEF:\n{{ $json.topic }}\n\nWrite the post now. Every single line must pull the reader forward. Make it impossible to stop reading."
    }
  ],
  max_tokens: 700,
  temperature: 0.95
});

const dalleBody = JSON.stringify({
  model: "dall-e-3",
  prompt: "{{ $json.imageStyle }}",
  n: 1,
  size: "1792x1024",
  quality: "hd",
  style: "vivid"
});

(async () => {
  console.log("Upgrading workflow prompts to world-class...");
  await req("POST", `/api/v1/workflows/${WF_ID}/deactivate`);
  const wf = JSON.parse((await req("GET", `/api/v1/workflows/${WF_ID}`)).b);

  for (const node of wf.nodes) {
    if (node.name === "Get Today Context") {
      node.parameters.jsCode = getContextCode;
      console.log("  Updated: Get Today Context");
    }
    if (node.name === "Generate Post GPT-4o") {
      node.parameters.body = "=" + gptBody;
      console.log("  Updated: Generate Post GPT-4o");
    }
    if (node.name === "Generate Image DALL-E 3") {
      node.parameters.body = "=" + dalleBody;
      console.log("  Updated: Generate Image DALL-E 3 (vivid HD)");
    }
  }

  const put = await req("PUT", `/api/v1/workflows/${WF_ID}`, {
    name: wf.name, nodes: wf.nodes,
    connections: wf.connections,
    settings: { executionOrder: "v1" },
    staticData: null
  });
  console.log("PUT:", put.s === 200 ? "OK" : "ERR: " + put.b.slice(0, 200));
  await new Promise(r => setTimeout(r, 500));
  await req("POST", `/api/v1/workflows/${WF_ID}/activate`);
  console.log("Activated! World-class workflow ready.");
})();
