import https from "https";
import { readFileSync } from "fs";

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n").filter(l => l && !l.startsWith("#"))
    .map(l => [l.split("=")[0].trim(), l.slice(l.indexOf("=") + 1).trim()])
);

const BB_KEY    = "bb_pr_fa414948cb65506daf61f6af6e0a01";
const BB_TMPL   = "4KnlWBbKj94lDOQGgm";
const CLOUD     = env.CLOUDINARY_CLOUD_NAME;
const OPENAI    = env.OPENAI_API_KEY;
const WF_ID     = "nSTbmFIcCJ6lDI0q";

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

// === UPDATED PROMPTS ===

// 7 rotating topics — each tied to a real industry Dizilo automates
const TOPICS = [
  `MONDAY — E-COMMERCE: Write a bold LinkedIn post about e-commerce store owners drowning in manual order management, abandoned carts, and slow customer support. Show how AI automation fixes this. Reference today's news. Make store owners feel this is urgent.`,
  `TUESDAY — INVOICE & FINANCE: Write about finance teams processing hundreds of invoices manually every month — data entry errors, late payments, wasted hours. Show how an AI invoice agent handles 2000+ documents at 99.97% accuracy. Real pain, real fix.`,
  `WEDNESDAY — LEAD QUALIFICATION: Write about sales teams losing deals because they take too long to follow up on leads. Every hour of delay = lost revenue. Show how an AI agent qualifies and responds to leads instantly, 24/7.`,
  `THURSDAY — HR & RECRUITMENT: Write about HR teams drowning in CVs — manually screening hundreds of applicants for every role. Show how AI cuts screening time by 90%. Make HR managers feel the pain then give them the solution.`,
  `FRIDAY — CUSTOMER SUPPORT: Write about businesses losing customers because support is too slow, too expensive, too inconsistent. Show how an AI support agent handles unlimited queries instantly with perfect accuracy.`,
  `SATURDAY — WORKFLOW AUTOMATION: Write a bold unpopular opinion about businesses still using manual processes in 2026. Spreadsheets, email chains, copy-paste. Show what they are losing vs businesses that have automated. Make it controversial.`,
  `SUNDAY — SHOPIFY & E-COMMERCE: Create FOMO. Shopify stores making £100k/month vs £10k/month — the difference is not traffic, it is automation and AI. Make store owners feel urgently behind.`
];

// Industry-matched image styles — HUMANS in real work situations, no robots
const IMAGE_STYLES = [
  `An e-commerce business owner at a modern desk, multiple Shopify product tabs open on their laptop, packages stacked behind them, focused and professional, warm office lighting, photorealistic`,
  `A finance professional at a desk surrounded by invoice documents and spreadsheets, looking stressed but focused, corporate office environment, soft window lighting, photorealistic`,
  `A confident sales professional on a laptop in a modern open-plan office, CRM dashboard visible on screen, professional attire, dynamic pose, photorealistic`,
  `An HR manager reviewing documents at a clean modern desk, multiple CV folders visible, professional office setting, natural daylight, photorealistic`,
  `A customer service manager in a modern contact centre, headset on, multiple screens visible, professional and engaged, soft blue office lighting, photorealistic`,
  `A business owner at a standing desk in a minimalist office, workflow diagrams on a whiteboard behind them, thoughtful expression, professional, photorealistic`,
  `A Shopify store owner photographing products in a bright studio setup, laptop showing analytics dashboard in background, entrepreneurial energy, photorealistic`
];

// Industry tags for Bannerbear badge
const TAGS = [
  "E-COMMERCE", "INVOICE AI", "SALES AI", "HR AUTOMATION",
  "CUSTOMER SUPPORT", "WORKFLOW AI", "SHOPIFY GROWTH"
];

const getContextCode = `
const topics = ${JSON.stringify(TOPICS)};
const styles = ${JSON.stringify(IMAGE_STYLES)};
const tags   = ${JSON.stringify(TAGS)};
const day = new Date().getDay();
const headlines = $input.first().json.headlines;
return [{ json: { topic: topics[day], imageStyle: styles[day], tag: tags[day], headlines } }];
`;

const extractPostCode = `
const r = $input.first().json;
const post = r.choices[0].message.content.trim();
const ctx  = $('Get Today Context').item.json;

// First non-empty line is the scroll-stopper headline
const headline = post.split('\\n').map(l => l.trim()).find(l => l.length > 10 && l.length < 120) || '';

return [{ json: { post, headline, imageStyle: ctx.imageStyle, tag: ctx.tag } }];
`;

// DALL-E: real human in industry context — NO text, NO UI, pure photograph-quality illustration
const dalleBody = JSON.stringify({
  model: "dall-e-3",
  prompt: `{{ $json.imageStyle }}. STRICT RULES: absolutely NO text, NO words, NO letters, NO UI elements, NO social media icons, NO buttons, NO logos, NO watermarks anywhere in the image. Pure photorealistic scene only. Ultra sharp, professional photography quality, dark moody lighting with warm accents. Wide landscape 1792x1024.`,
  n: 1,
  size: "1792x1024",
  quality: "hd",
  style: "vivid"
});

// Upload DALL-E image to Cloudinary (for stable permanent URL)
const prepareUploadCode = `
const dalleUrl = $input.first().json.data[0].url;
const post     = $('Extract Post Text').item.json.post;
const headline = $('Extract Post Text').item.json.headline;
const tag      = $('Extract Post Text').item.json.tag;

const crypto    = require('crypto');
const timestamp = Math.floor(Date.now() / 1000).toString();
const apiSecret = '${env.CLOUDINARY_API_SECRET}';
const signature = crypto.createHash('sha1').update('timestamp=' + timestamp + apiSecret).digest('hex');

return [{ json: { dalleUrl, post, headline, tag, timestamp, signature } }];
`;

// Bannerbear image generation node (HTTP Request)
const bannerbearBody = JSON.stringify({
  template: BB_TMPL,
  modifications: [
    { name: "background",  image_url: "={{ $json.image_url }}" },
    { name: "headline",    text: "={{ $('Extract Post Text').item.json.headline }}" },
    { name: "tag",         text: "={{ $('Extract Post Text').item.json.tag }}" }
  ]
});

// Extract final Bannerbear image URL
const extractBannerbearCode = `
const imageUrl = $input.first().json.image_url
  || ($input.first().json.image_urls && $input.first().json.image_urls[0])
  || '';
const post = $('Extract Post Text').item.json.post;
return [{ json: { post, imageUrl } }];
`;

(async () => {
  console.log("Updating n8n workflow with Bannerbear integration...");
  await req("POST", `/api/v1/workflows/${WF_ID}/deactivate`);
  const wf = JSON.parse((await req("GET", `/api/v1/workflows/${WF_ID}`)).b);

  // Update existing nodes
  for (const node of wf.nodes) {
    if (node.name === "Get Today Context") {
      node.parameters.jsCode = getContextCode;
      console.log("  Updated: Get Today Context (industry topics + human image styles)");
    }
    if (node.name === "Generate Post GPT-4o") {
      node.parameters.body = "=" + JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: `You are the world's #1 LinkedIn ghostwriter for Dizilo — an AI automation and e-commerce agency in Birmingham, UK. Dizilo builds: custom AI agents (lead qualification, invoice processing, support, HR screening), Shopify/WooCommerce stores, and workflow automation using n8n.

RULES — NEVER BREAK:
1. First line: shocking stat or bold statement. No greetings. No "In today's world".
2. Short lines. Max 10 words per line. White space is king.
3. Use today's AI news to make it feel urgent and current.
4. Tell a real story about the industry pain point.
5. End with a challenge or debate-starter.
6. CTA: one line mentioning dizilo.com naturally.
7. Hashtags: #AIAgents #WorkflowAutomation #Ecommerce #AIForBusiness #Dizilo
8. Length: 180-220 words exactly.
9. BANNED: "thrilled", "excited", "leverage", "game-changer", "transformative"` },
          { role: "user", content: "TODAY'S NEWS: {{ $json.headlines }}\n\nTODAY'S BRIEF: {{ $json.topic }}\n\nWrite the post now." }
        ],
        max_tokens: 700,
        temperature: 0.95
      });
      console.log("  Updated: Generate Post GPT-4o");
    }
    if (node.name === "Extract Post Text") {
      node.parameters.jsCode = extractPostCode;
      console.log("  Updated: Extract Post Text (extracts headline + tag)");
    }
    if (node.name === "Generate Image DALL-E 3") {
      node.parameters.body = "=" + dalleBody;
      console.log("  Updated: Generate Image DALL-E 3 (humans in industry context, no text)");
    }
    if (node.name === "Prepare Upload Signature") {
      node.parameters.jsCode = prepareUploadCode;
      console.log("  Updated: Prepare Upload Signature");
    }
    if (node.name === "Build Branded URL") {
      // Repurpose as Bannerbear image generator
      node.name = "Generate Bannerbear Image";
      node.type = "n8n-nodes-base.httpRequest";
      node.typeVersion = 4.2;
      node.parameters = {
        url: "https://sync.api.bannerbear.com/v2/images",
        method: "POST",
        sendHeaders: true,
        headerParameters: { parameters: [
          { name: "Authorization", value: "Bearer " + BB_KEY },
          { name: "Content-Type",  value: "application/json" }
        ]},
        sendBody: true,
        contentType: "raw",
        body: "=" + bannerbearBody
      };
      console.log("  Updated: Build Branded URL → Generate Bannerbear Image");
    }
  }

  // Add Extract Bannerbear URL node (replaces old connection to Buffer)
  const extractBBNode = {
    id: "n-extract-bb",
    name: "Extract Bannerbear URL",
    type: "n8n-nodes-base.code",
    typeVersion: 2,
    position: [1900, 300],
    parameters: { jsCode: extractBannerbearCode }
  };
  wf.nodes.push(extractBBNode);

  // Fix connections
  wf.connections["Generate Bannerbear Image"] = {
    main: [[{ node: "Extract Bannerbear URL", type: "main", index: 0 }]]
  };
  wf.connections["Extract Bannerbear URL"] = {
    main: [[{ node: "Post to LinkedIn via Buffer", type: "main", index: 0 }]]
  };
  delete wf.connections["Build Branded URL"];

  // Update Buffer node position
  const bufferNode = wf.nodes.find(n => n.name === "Post to LinkedIn via Buffer");
  if (bufferNode) bufferNode.position = [2100, 300];

  const put = await req("PUT", `/api/v1/workflows/${WF_ID}`, {
    name: wf.name, nodes: wf.nodes,
    connections: wf.connections,
    settings: { executionOrder: "v1" },
    staticData: null
  });
  console.log("PUT:", put.s === 200 ? "OK" : "ERR: " + put.b.slice(0, 300));

  await new Promise(r => setTimeout(r, 500));
  await req("POST", `/api/v1/workflows/${WF_ID}/activate`);
  console.log("\n✅ Done! Workflow now uses Bannerbear for professional designed images.");
  console.log("Every day: industry-specific human image + Dizilo branded layout via Bannerbear.");
})();
