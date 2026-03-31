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

const WF_ID = "nSTbmFIcCJ6lDI0q";

// Extract headline (first short punchy line) + 1-line summary of the post topic
const extractPostCode = `
const r = $input.first().json;
const post = r.choices[0].message.content.trim();
const imageStyle = $('Get Today Context').item.json.imageStyle;

// First non-empty line = scroll-stopper headline
const lines = post.split('\\n').map(l => l.trim()).filter(l => l.length > 5);
const headline = lines[0] || '';

// Pick a category tag based on day
const tags = ['AI Automation','E-commerce','Business Growth','AI Strategy','Future of Work','Workflow Automation','Digital Transformation'];
const tag = tags[new Date().getDay()];

return [{ json: { post, imageStyle, headline, tag } }];
`;

// DALL-E: pure background illustration — NO TEXT, NO UI, NO icons
const dalleBody = JSON.stringify({
  model: "dall-e-3",
  prompt: `Pure digital illustration for a professional marketing background. Wide landscape 1792x1024.

COMPOSITION:
- Left 40%: Very dark solid navy background (#080E1C), completely clean and empty — no objects, no shapes, no patterns in this area
- Right 60%: {{ $json.imageStyle }}. Premium 3D CGI, cinematic quality, photorealistic, electric blue and warm orange lighting.

THIS IS CRITICAL — ABSOLUTELY FORBIDDEN:
- NO text of any kind anywhere in the image
- NO words, letters, numbers, characters
- NO social media buttons or icons (no Instagram, Twitter, LinkedIn icons)
- NO UI elements (no buttons, cards, dashboards, phone screens)
- NO logos, watermarks, brand names
- NO speech bubbles, captions, labels
- Pure background illustration only — text will be added separately

Premium quality, ultra sharp, cinematic lighting.`,
  n: 1,
  size: "1792x1024",
  quality: "hd",
  style: "vivid"
});

(async () => {
  console.log("Updating workflow: professional designed LinkedIn banners with headline + category tag...");
  await req("POST", `/api/v1/workflows/${WF_ID}/deactivate`);
  const wf = JSON.parse((await req("GET", `/api/v1/workflows/${WF_ID}`)).b);

  for (const node of wf.nodes) {
    if (node.name === "Extract Post Text") {
      node.parameters.jsCode = extractPostCode;
      console.log("  Updated: Extract Post Text");
    }
    if (node.name === "Generate Image DALL-E 3") {
      node.parameters.body = "=" + dalleBody;
      console.log("  Updated: Generate Image DALL-E 3");
    }
  }

  const put = await req("PUT", `/api/v1/workflows/${WF_ID}`, {
    name: wf.name, nodes: wf.nodes,
    connections: wf.connections,
    settings: { executionOrder: "v1" },
    staticData: null
  });
  console.log("PUT:", put.s === 200 ? "OK" : "ERR: " + put.b.slice(0, 300));

  await new Promise(r => setTimeout(r, 500));
  await req("POST", `/api/v1/workflows/${WF_ID}/activate`);
  console.log("Activated!");
})();
