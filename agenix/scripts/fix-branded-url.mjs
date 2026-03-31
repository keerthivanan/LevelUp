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

const CLOUD   = env.CLOUDINARY_CLOUD_NAME;
const LOGO_ID = env.CLOUDINARY_LOGO_ID;
const WF_ID   = "nSTbmFIcCJ6lDI0q";

// Double-dot (..) encodes a literal period in Cloudinary text overlay URLs
// "dizilo..com" renders as "dizilo.com" on the image
const buildBrandedUrlCode = `
const publicId = $input.first().json.public_id;
const post     = $('Prepare Upload Signature').item.json.post;

const cloud  = '${CLOUD}';
const logoId = '${LOGO_ID}';

// Text overlay: "dizilo.com" in red bottom-left (.. = literal dot in Cloudinary)
const textLayer  = 'l_text:Arial_36_bold:dizilo..com,co_rgb:FF3333,g_south_west,x_50,y_40,fl_layer_apply';
// Logo overlay: DZ logo bottom-right
const logoLayer  = 'l_' + logoId + ',w_110,g_south_east,x_30,y_30,fl_layer_apply';

const brandedUrl = 'https://res.cloudinary.com/' + cloud + '/image/upload/' + textLayer + '/' + logoLayer + '/' + publicId;

return [{ json: { post, imageUrl: brandedUrl } }];
`;

(async () => {
  console.log("Updating Build Branded URL node with text + logo overlays...");
  await req("POST", `/api/v1/workflows/${WF_ID}/deactivate`);
  const wf = JSON.parse((await req("GET", `/api/v1/workflows/${WF_ID}`)).b);

  const node = wf.nodes.find(n => n.name === "Build Branded URL");
  if (!node) { console.error("Node 'Build Branded URL' not found!"); process.exit(1); }

  node.parameters.jsCode = buildBrandedUrlCode;
  console.log("  Updated: Build Branded URL");

  const put = await req("PUT", `/api/v1/workflows/${WF_ID}`, {
    name: wf.name, nodes: wf.nodes,
    connections: wf.connections,
    settings: { executionOrder: "v1" },
    staticData: null
  });
  console.log("PUT:", put.s === 200 ? "OK" : "ERR: " + put.b.slice(0, 300));

  await new Promise(r => setTimeout(r, 500));
  await req("POST", `/api/v1/workflows/${WF_ID}/activate`);
  console.log("Activated! Every image will now show 'dizilo.com' (bottom-left, red) + DZ logo (bottom-right).");
})();
