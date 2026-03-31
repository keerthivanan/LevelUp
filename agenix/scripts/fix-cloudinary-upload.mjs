import https from "https";
import { readFileSync } from "fs";
import { createHash } from "crypto";

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

const CLOUD      = env.CLOUDINARY_CLOUD_NAME;
const API_KEY    = env.CLOUDINARY_API_KEY;
const API_SECRET = env.CLOUDINARY_API_SECRET;
const LOGO_ID    = env.CLOUDINARY_LOGO_ID;
const WF_ID      = "nSTbmFIcCJ6lDI0q";

// Step 1: Upload DALL-E image to Cloudinary (signed upload)
const uploadCode = `
const dalleUrl = $input.first().json.data[0].url;
const post     = $('Extract Post Text').item.json.post;

const crypto    = require('crypto');
const timestamp = Math.floor(Date.now() / 1000).toString();
const apiSecret = '${API_SECRET}';
const paramsStr = 'timestamp=' + timestamp;
const signature = crypto.createHash('sha1').update(paramsStr + apiSecret).digest('hex');

return [{ json: { dalleUrl, post, timestamp, signature } }];
`;

// Step 2: HTTP Request to Cloudinary upload API
// This node uploads the DALL-E URL to Cloudinary and returns the public_id

// Step 3: Build final branded URL with logo overlay
const buildBrandedUrlCode = `
const publicId = $input.first().json.public_id;
const post     = $('Prepare Upload Signature').item.json.post;

const cloud  = '${CLOUD}';
const logoId = '${LOGO_ID}';

// Apply logo overlay on bottom-right corner of the uploaded image
const brandedUrl = 'https://res.cloudinary.com/' + cloud + '/image/upload/l_' + logoId + ',w_130,g_south_east,x_24,y_24,fl_layer_apply/' + publicId;

return [{ json: { post, imageUrl: brandedUrl } }];
`;

(async () => {
  console.log("Updating workflow: switching to Cloudinary direct upload...");
  await req("POST", `/api/v1/workflows/${WF_ID}/deactivate`);
  const wf = JSON.parse((await req("GET", `/api/v1/workflows/${WF_ID}`)).b);

  // Find positions for inserting new nodes
  const dalleNode     = wf.nodes.find(n => n.name === "Generate Image DALL-E 3");
  const extractOld    = wf.nodes.find(n => n.name === "Extract Image URL");
  const bufferNode    = wf.nodes.find(n => n.name === "Post to LinkedIn via Buffer");

  // 1. Replace "Extract Image URL" with "Prepare Upload Signature"
  extractOld.name = "Prepare Upload Signature";
  extractOld.parameters.jsCode = uploadCode;
  extractOld.position = [1300, 300];

  // 2. Add Cloudinary Upload HTTP Request node
  const uploadNode = {
    id: "n-cloud-upload",
    name: "Upload to Cloudinary",
    type: "n8n-nodes-base.httpRequest",
    typeVersion: 4.2,
    position: [1500, 300],
    parameters: {
      url: `https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`,
      method: "POST",
      sendBody: true,
      contentType: "form-urlencoded",
      bodyParameters: {
        parameters: [
          { name: "file",      value: "={{ $json.dalleUrl }}" },
          { name: "api_key",   value: API_KEY },
          { name: "timestamp", value: "={{ $json.timestamp }}" },
          { name: "signature", value: "={{ $json.signature }}" }
        ]
      }
    }
  };

  // 3. Add "Build Branded URL" node
  const brandedNode = {
    id: "n-brand-url",
    name: "Build Branded URL",
    type: "n8n-nodes-base.code",
    typeVersion: 2,
    position: [1700, 300],
    parameters: { jsCode: buildBrandedUrlCode }
  };

  // Update Buffer node position
  bufferNode.position = [1900, 300];

  // Add new nodes
  wf.nodes.push(uploadNode, brandedNode);

  // Update connections
  // DALL-E → Prepare Upload Signature (already exists as "Extract Image URL")
  // Prepare Upload Signature → Upload to Cloudinary (new)
  // Upload to Cloudinary → Build Branded URL (new)
  // Build Branded URL → Post to LinkedIn via Buffer

  wf.connections["Prepare Upload Signature"] = {
    main: [[{ node: "Upload to Cloudinary", type: "main", index: 0 }]]
  };
  wf.connections["Upload to Cloudinary"] = {
    main: [[{ node: "Build Branded URL", type: "main", index: 0 }]]
  };
  wf.connections["Build Branded URL"] = {
    main: [[{ node: "Post to LinkedIn via Buffer", type: "main", index: 0 }]]
  };
  // Remove old "Extract Image URL" → Buffer connection
  delete wf.connections["Extract Image URL"];

  const put = await req("PUT", `/api/v1/workflows/${WF_ID}`, {
    name: wf.name, nodes: wf.nodes,
    connections: wf.connections,
    settings: { executionOrder: "v1" },
    staticData: null
  });
  console.log("PUT:", put.s === 200 ? "OK" : "ERR: " + put.b.slice(0, 300));

  await new Promise(r => setTimeout(r, 500));
  await req("POST", `/api/v1/workflows/${WF_ID}/activate`);
  console.log("Activated! Cloudinary direct upload with logo overlay is live.");
})();
