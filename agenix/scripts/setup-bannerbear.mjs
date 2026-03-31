import https from "https";

const BB_KEY = "bb_pr_fa414948cb65506daf61f6af6e0a01";
const LOGO_URL = "https://res.cloudinary.com/dyaqwpeqh/image/upload/dizilo_logo_uam5hi";

function bbReq(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const r = https.request({
      hostname: "api.bannerbear.com",
      path, method,
      headers: {
        "Authorization": "Bearer " + BB_KEY,
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

// Create a professional LinkedIn banner template
const template = {
  name: "Dizilo LinkedIn Daily Post",
  width: 1200,
  height: 630,
  layers: [
    // 1. Full background (dark navy)
    {
      name: "bg_color",
      type: "rectangle",
      x: 0, y: 0,
      width: 1200, height: 630,
      color: "#080E1C"
    },
    // 2. DALL-E illustration — left half
    {
      name: "background",
      type: "image",
      x: 0, y: 0,
      width: 600, height: 630,
      image_url: "https://res.cloudinary.com/dyaqwpeqh/image/upload/mi3crba5rk4exno5j02f"
    },
    // 3. Dark gradient overlay on right side
    {
      name: "right_bg",
      type: "rectangle",
      x: 580, y: 0,
      width: 620, height: 630,
      color: "#080E1C",
      opacity: 95
    },
    // 4. Accent top line
    {
      name: "accent_line",
      type: "rectangle",
      x: 620, y: 0,
      width: 560, height: 4,
      color: "#E63030"
    },
    // 5. Category badge background
    {
      name: "badge_bg",
      type: "rectangle",
      x: 630, y: 40,
      width: 200, height: 36,
      color: "#E63030",
      border_radius: 18
    },
    // 6. Category badge text
    {
      name: "tag",
      type: "text",
      x: 730, y: 58,
      width: 180,
      text: "AI AUTOMATION",
      font_family: "Inter",
      font_size: 14,
      font_weight: "700",
      color: "#FFFFFF",
      text_align: "center"
    },
    // 7. Main headline
    {
      name: "headline",
      type: "text",
      x: 630, y: 110,
      width: 520,
      text: "Most businesses are hiring when they should be automating",
      font_family: "Inter",
      font_size: 48,
      font_weight: "800",
      color: "#FFFFFF",
      line_height: 1.15
    },
    // 8. Dizilo.com small text
    {
      name: "website",
      type: "text",
      x: 630, y: 560,
      width: 300,
      text: "dizilo.com",
      font_family: "Inter",
      font_size: 18,
      font_weight: "400",
      color: "#E63030"
    },
    // 9. DZ Logo — bottom right
    {
      name: "logo",
      type: "image",
      x: 1050, y: 545,
      width: 110, height: 55,
      image_url: LOGO_URL
    }
  ]
};

(async () => {
  console.log("Creating Bannerbear template...");
  const res = await bbReq("POST", "/v2/templates", template);
  console.log("Status:", res.s);

  if (res.s === 200 || res.s === 201) {
    const t = JSON.parse(res.b);
    console.log("\n✅ Template created!");
    console.log("Template UID:", t.uid);
    console.log("Template Name:", t.name);
    console.log("\nSave this UID — needed for n8n workflow:", t.uid);
  } else {
    console.log("Response:", res.b.slice(0, 500));
  }
})();
