import https from "https";
import { readFileSync } from "fs";

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n").filter(l => l && !l.startsWith("#"))
    .map(l => [l.split("=")[0].trim(), l.slice(l.indexOf("=") + 1).trim()])
);

function apiReq(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const opts = {
      hostname: env.N8N_HOST, path, method,
      headers: {
        "X-N8N-API-KEY": env.N8N_API_KEY,
        "Content-Type": "application/json",
        ...(data ? { "Content-Length": Buffer.byteLength(data) } : {})
      },
    };
    const r = https.request(opts, res => {
      let d = ""; res.on("data", c => d += c);
      res.on("end", () => resolve({ s: res.statusCode, b: d }));
    });
    r.on("error", reject);
    if (data) r.write(data);
    r.end();
  });
}

const OPENAI_KEY   = env.OPENAI_API_KEY;
const BUFFER_TOKEN = env.BUFFER_ACCESS_TOKEN;
const BUFFER_CHAN  = env.BUFFER_CHANNEL_ID;

const SYSTEM_PROMPT = `You are the world's best LinkedIn content strategist writing for Dizilo — a cutting-edge AI automation and e-commerce agency in Birmingham, UK that builds custom AI agents, intelligent workflow automation, and high-converting Shopify & WooCommerce stores for ambitious businesses worldwide.

YOUR WRITING RULES — NEVER BREAK THESE:
1. First line must be a SCROLL STOPPER. Bold statement, shocking stat, or provocative question. No greetings. No "I am excited". No "In today's world".
2. Write like a human — short sentences, line breaks after every 1-2 sentences, easy to scan on mobile
3. Use ONE of these formats each day: Hot Take / Myth Buster / Before-After Story / Unpopular Opinion / Debate Question / Surprising Stat / Insider Insight
4. Reference the latest AI and tech news provided to make the post feel timely and relevant
5. Include real business pain points — time wasted, money lost, opportunities missed
6. End with a POWERFUL question that forces people to comment (not "What do you think?")
7. Soft CTA: mention dizilo.com naturally in the last 2 lines
8. Hashtags at the very end: #AIAgents #WorkflowAutomation #Ecommerce #AIForBusiness #Dizilo #ShopifyDevelopment #BusinessAutomation
9. Max 2 emojis — used strategically for emphasis only
10. Length: 180-250 words. Not more. Not less.
11. Tone: Confident, bold, knowledgeable — like a founder who has seen it all
12. Make readers want to TAG a business owner they know`;

const TOPICS = [
  "Challenge business owners: most are hiring when they should be automating. Use todays AI news as evidence.",
  "Tell a before-after story of a business drowning in manual work that discovered AI automation. Make it dramatic and real.",
  "Bust the myth that AI is only for big corporations — show how Dizilo gives small businesses Fortune 500 superpowers.",
  "Hot take on e-commerce: most Shopify stores fail not because of traffic but because of poor conversion strategy.",
  "Unpopular opinion: building a business without AI automation in 2026 is the equivalent of running a marathon in boots.",
  "Spark a debate: what is the single most important task every business should automate right now? Get people commenting.",
  "Create FOMO: the businesses winning in 2026 started automating in 2024. What are you waiting for?"
];

const IMAGE_STYLES = [
  "cinematic dark tech workspace with glowing AI neural network lines and a laptop showing automation dashboards, ultra realistic",
  "dramatic split scene showing chaos of manual paper work on left side vs clean digital automated business on right side, dark cinematic lighting",
  "futuristic AI and human hand reaching toward each other, dark background with blue and red glowing light, photorealistic",
  "sleek high-converting e-commerce store on multiple devices, dark background with neon accent colors, professional studio lighting",
  "dramatic before and after split: cluttered messy office vs clean minimalist automated workspace, cinematic quality",
  "abstract glowing network of connected business nodes in dark space, AI automation visualization, ultra high quality",
  "confident entrepreneur looking at holographic AI data dashboard floating in air, dark background, dramatic cinematic lighting"
];

const parseHeadlinesCode = `
const xml = $input.first().json.data || $input.first().json.body || '';
const titles = [];
const regex = /<title><!\\[CDATA\\[([^\\]]+)\\]\\]><\\/title>|<title>([^<]+)<\\/title>/g;
let m, count = 0;
while ((m = regex.exec(xml)) !== null && count < 6) {
  const title = (m[1] || m[2] || '').trim();
  if (title && !title.toLowerCase().includes('techcrunch') && title.length > 20) {
    titles.push(title); count++;
  }
}
const headlines = titles.slice(0, 5).join(' | ');
return [{ json: { headlines: headlines || 'AI agents transforming business operations globally | Automation reducing operational costs by 40% | GPT-4o powering next generation business tools' } }];
`;

const getContextCode = `
const topics = ${JSON.stringify(TOPICS)};
const styles = ${JSON.stringify(IMAGE_STYLES)};
const day = new Date().getDay();
const headlines = $input.first().json.headlines;
return [{ json: { topic: topics[day], imageStyle: styles[day], headlines } }];
`;

const extractPostCode = `
const r = $input.first().json;
const post = r.choices[0].message.content.trim();
const imageStyle = $('Get Today Context').item.json.imageStyle;
return [{ json: { post, imageStyle } }];
`;

const extractImageCode = `
const imageUrl = $input.first().json.data[0].url;
const post = $('Extract Post Text').item.json.post;
return [{ json: { post, imageUrl } }];
`;

const gptBody = JSON.stringify({
  model: "gpt-4o",
  messages: [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: "TODAYS AI NEWS: {{ $json.headlines }}\n\nTODAYS BRIEF: {{ $json.topic }}\n\nWrite the LinkedIn post now. Use the news headlines to make it feel current and timely. Make it impossible to scroll past." }
  ],
  max_tokens: 600,
  temperature: 0.92
});

const dalleBody = JSON.stringify({
  model: "dall-e-3",
  prompt: "Professional LinkedIn post image for Dizilo, a premium AI automation and e-commerce agency. Style: {{ $json.imageStyle }}. Ultra high quality, NO text in image, NO logos, cinematic professional style, dark theme, suitable for a premium tech brand LinkedIn post.",
  n: 1,
  size: "1792x1024",
  quality: "hd"
});

const workflow = {
  name: "Dizilo LinkedIn Daily Post v2",
  nodes: [
    {
      id: "n1", name: "Every Day 8AM UTC",
      type: "n8n-nodes-base.scheduleTrigger", typeVersion: 1.2, position: [100, 300],
      parameters: { rule: { interval: [{ field: "cronExpression", expression: "0 8 * * *" }] } }
    },
    {
      id: "n2", name: "Fetch AI News",
      type: "n8n-nodes-base.httpRequest", typeVersion: 4.2, position: [300, 300],
      parameters: { url: "https://techcrunch.com/tag/artificial-intelligence/feed/", method: "GET" }
    },
    {
      id: "n3", name: "Parse Headlines",
      type: "n8n-nodes-base.code", typeVersion: 2, position: [500, 300],
      parameters: { jsCode: parseHeadlinesCode }
    },
    {
      id: "n4", name: "Get Today Context",
      type: "n8n-nodes-base.code", typeVersion: 2, position: [700, 300],
      parameters: { jsCode: getContextCode }
    },
    {
      id: "n5", name: "Generate Post GPT-4o",
      type: "n8n-nodes-base.httpRequest", typeVersion: 4.2, position: [900, 300],
      parameters: {
        url: "https://api.openai.com/v1/chat/completions", method: "POST",
        sendHeaders: true,
        headerParameters: { parameters: [
          { name: "Authorization", value: "Bearer " + OPENAI_KEY },
          { name: "Content-Type",  value: "application/json" }
        ]},
        sendBody: true, contentType: "raw",
        body: "=" + gptBody
      }
    },
    {
      id: "n6", name: "Extract Post Text",
      type: "n8n-nodes-base.code", typeVersion: 2, position: [1100, 300],
      parameters: { jsCode: extractPostCode }
    },
    {
      id: "n7", name: "Generate Image DALL-E 3",
      type: "n8n-nodes-base.httpRequest", typeVersion: 4.2, position: [1300, 300],
      parameters: {
        url: "https://api.openai.com/v1/images/generations", method: "POST",
        sendHeaders: true,
        headerParameters: { parameters: [
          { name: "Authorization", value: "Bearer " + OPENAI_KEY },
          { name: "Content-Type",  value: "application/json" }
        ]},
        sendBody: true, contentType: "raw",
        body: "=" + dalleBody
      }
    },
    {
      id: "n8", name: "Extract Image URL",
      type: "n8n-nodes-base.code", typeVersion: 2, position: [1500, 300],
      parameters: { jsCode: extractImageCode }
    },
    {
      id: "n9", name: "Post to LinkedIn via Buffer",
      type: "n8n-nodes-base.httpRequest", typeVersion: 4.2, position: [1700, 300],
      parameters: {
        url: "https://api.bufferapp.com/1/updates/create.json", method: "POST",
        sendBody: true, contentType: "form-urlencoded",
        bodyParameters: { parameters: [
          { name: "access_token",  value: BUFFER_TOKEN },
          { name: "profile_ids[]", value: BUFFER_CHAN  },
          { name: "text",          value: "={{ $json.post }}" },
          { name: "media[photo]",  value: "={{ $json.imageUrl }}" },
          { name: "now",           value: "true" }
        ]}
      }
    }
  ],
  connections: {
    "Every Day 8AM UTC":      { main: [[{ node: "Fetch AI News",               type: "main", index: 0 }]] },
    "Fetch AI News":           { main: [[{ node: "Parse Headlines",             type: "main", index: 0 }]] },
    "Parse Headlines":         { main: [[{ node: "Get Today Context",           type: "main", index: 0 }]] },
    "Get Today Context":       { main: [[{ node: "Generate Post GPT-4o",        type: "main", index: 0 }]] },
    "Generate Post GPT-4o":    { main: [[{ node: "Extract Post Text",           type: "main", index: 0 }]] },
    "Extract Post Text":       { main: [[{ node: "Generate Image DALL-E 3",     type: "main", index: 0 }]] },
    "Generate Image DALL-E 3": { main: [[{ node: "Extract Image URL",           type: "main", index: 0 }]] },
    "Extract Image URL":       { main: [[{ node: "Post to LinkedIn via Buffer", type: "main", index: 0 }]] }
  },
  settings: { executionOrder: "v1" }
};

(async () => {
  console.log("Creating world-class LinkedIn workflow...");
  const res = await apiReq("POST", "/api/v1/workflows", workflow);
  if (res.s !== 200) { console.error("Failed:", res.b.slice(0, 300)); process.exit(1); }
  const created = JSON.parse(res.b);
  console.log("Created ID:", created.id);
  await new Promise(r => setTimeout(r, 800));
  const act = await apiReq("POST", `/api/v1/workflows/${created.id}/activate`);
  console.log("Activated:", act.s === 200 ? "YES" : "FAILED");
  console.log("\nDone! Workflow ID:", created.id);
})();
