import https from "https";

// Load from .env.local — never hardcode keys
import { readFileSync } from "fs";
const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n").filter(l => l && !l.startsWith("#"))
    .map(l => l.split("=").map((p, i) => i === 0 ? p.trim() : l.slice(l.indexOf("=") + 1).trim()))
);
const API_KEY    = env.N8N_API_KEY;
const GMAIL_CRED = { id: env.GMAIL_CRED_ID, name: "dizilo" };

function apiReq(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const opts = {
      hostname: env.N8N_HOST, path, method,
      headers: { "X-N8N-API-KEY": API_KEY, "Content-Type": "application/json",
        ...(data ? { "Content-Length": Buffer.byteLength(data) } : {}) },
    };
    const r = https.request(opts, res => {
      let d = ""; res.on("data", c => d += c);
      res.on("end", () => resolve({ status: res.statusCode, body: d }));
    });
    r.on("error", reject);
    if (data) r.write(data);
    r.end();
  });
}

function minify(html) {
  return html.replace(/\n\s*/g, " ").replace(/\s{2,}/g, " ").trim();
}

// ── Logo header: force dark bgcolor on the TD (email clients respect bgcolor attr)
// No mix-blend-mode — red logo on #111 background is always visible
function shell(content) {
  return (
    `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">` +
    `<meta name="viewport" content="width=device-width,initial-scale=1.0">` +
    `<title>Dizilo</title></head>` +
    `<body style="margin:0;padding:0;background:#0a090a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">` +
    `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#0a090a;padding:40px 16px;">` +
    `<tr><td align="center">` +
    `<table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background:#111011;border-radius:16px;overflow:hidden;border:1px solid #222;">` +
    // Logo header — bgcolor attribute forces dark in all email clients
    `<tr><td bgcolor="#0d0c0d" align="center" style="padding:32px 40px 28px;background:#0d0c0d;border-bottom:1px solid #1e1e1e;">` +
    `<img src="https://dizilo.com/reddizilo.png" alt="Dizilo" width="160" height="56" style="display:block;height:56px;width:auto;border:0;outline:none;"></td></tr>` +
    // Red accent line
    `<tr><td style="height:3px;background:linear-gradient(90deg,#c72323 0%,rgba(199,35,35,0.4) 60%,transparent 100%);font-size:0;line-height:0;">&nbsp;</td></tr>` +
    content +
    // Footer
    `<tr><td bgcolor="#0d0c0d" style="padding:20px 40px;border-top:1px solid #1e1e1e;background:#0d0c0d;">` +
    `<p style="margin:0;font-size:11px;color:#444;line-height:1.6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">` +
    `Dizilo Ltd &middot; Birmingham, UK &middot; ` +
    `<a href="https://dizilo.com" style="color:#555;text-decoration:none;">dizilo.com</a></p></td></tr>` +
    `</table></td></tr></table></body></html>`
  );
}

function pill(label, value) {
  return (
    `<tr><td style="padding:20px 0;border-bottom:1px solid #2a2a2a;">` +
    `<table width="100%" cellpadding="0" cellspacing="0"><tr>` +
    `<td width="130" style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#666;vertical-align:middle;">${label}</td>` +
    `<td style="font-size:15px;color:#e8e8e8;font-weight:500;line-height:1.4;">${value}</td>` +
    `</tr></table></td></tr>`
  );
}

function infoCard(rows) {
  return (
    `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" bgcolor="#1c1c1c" style="background:#1c1c1c;border:1px solid #2e2e2e;border-radius:14px;margin-bottom:28px;">` +
    `<tr><td style="padding:4px 32px 8px;">${rows}</td></tr></table>`
  );
}

// ── BOOKING CLIENT EMAIL ───────────────────────────────────────────────────────
const EF = "$('Extract Fields').item.json";

const bookingClient = shell(
  `<tr><td style="padding:44px 44px 40px;">` +
  `<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#c72323;">Booking Confirmed</p>` +
  `<h1 style="margin:0 0 14px;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.03em;line-height:1.25;">Your call is booked, {{ ${EF}.name.split(' ')[0] }}.</h1>` +
  `<p style="margin:0 0 32px;font-size:15px;color:#888;line-height:1.8;">We're looking forward to speaking with you. Here are your details:</p>` +
  infoCard(
    pill("Date",  `{{ ${EF}.date }}`) +
    pill("Time",  `{{ ${EF}.time }} (UK time) &middot; 30 min`) +
    pill("Topic", `{{ ${EF}.service }}`)
  ) +
  // Meet card
  `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" bgcolor="#0f1623" style="background:#0f1623;border:1px solid #1e3a5f;border-radius:12px;margin-bottom:32px;">` +
  `<tr><td style="padding:30px 32px;">` +
  `<p style="margin:0 0 18px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4a7fcb;">Google Meet</p>` +
  `<a href="{{ $json.meetLink }}" style="display:inline-block;margin-bottom:24px;padding:14px 32px;background:#4285f4;color:#ffffff;font-size:14px;font-weight:700;border-radius:8px;text-decoration:none;letter-spacing:-0.01em;">Join Meeting &rarr;</a>` +
  `<table cellpadding="0" cellspacing="0" role="presentation">` +
  `<tr><td style="padding:5px 0;">` +
  `<span style="font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#555;display:inline-block;min-width:120px;">Meeting ID</span>` +
  `<span style="font-size:13px;color:#c8d6f0;font-family:'Courier New',monospace;">{{ ${EF}.meetingId }}</span>` +
  `</td></tr>` +
  `<tr><td style="padding:5px 0;">` +
  `<span style="font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#555;display:inline-block;min-width:120px;">Passcode</span>` +
  `<span style="font-size:13px;color:#c8d6f0;font-family:'Courier New',monospace;letter-spacing:0.08em;">{{ ${EF}.passcode }}</span>` +
  `</td></tr>` +
  `</table></td></tr></table>` +
  `<p style="margin:0;font-size:13px;color:#555;line-height:1.7;">Need to reschedule? Just reply to this email.</p>` +
  `</td></tr>`
);

// ── BOOKING OWNER EMAIL ────────────────────────────────────────────────────────
const bookingOwner = shell(
  `<tr><td style="padding:44px 44px 10px;">` +
  `<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#c72323;">New Booking</p>` +
  `<h1 style="margin:0 0 32px;font-size:24px;font-weight:700;color:#ffffff;letter-spacing:-0.03em;">{{ ${EF}.name }} just booked a call.</h1>` +
  infoCard(
    pill("Name",    `{{ ${EF}.name }}`) +
    pill("Email",   `{{ ${EF}.email }}`) +
    pill("Date",    `{{ ${EF}.date }}`) +
    pill("Time",    `{{ ${EF}.time }} (UK)`) +
    pill("Service", `{{ ${EF}.service }}`)
  ) +
  `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" bgcolor="#1a1a1a" style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;margin-bottom:24px;">` +
  `<tr><td style="padding:24px 32px;">` +
  `<p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#555;">Notes</p>` +
  `<p style="margin:0;font-size:14px;color:#aaa;line-height:1.75;">{{ ${EF}.notes || 'No additional notes.' }}</p>` +
  `</td></tr></table>` +
  `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" bgcolor="#0f1623" style="background:#0f1623;border:1px solid #1e3a5f;border-radius:12px;margin-bottom:32px;">` +
  `<tr><td style="padding:24px 32px;">` +
  `<p style="margin:0 0 14px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4a7fcb;">Google Meet</p>` +
  `<p style="margin:0 0 6px;font-size:13px;color:#666;">Meeting ID: <span style="font-family:'Courier New',monospace;color:#c8d6f0;">{{ ${EF}.meetingId }}</span></p>` +
  `<p style="margin:0 0 18px;font-size:13px;color:#666;">Passcode: <span style="font-family:'Courier New',monospace;color:#c8d6f0;">{{ ${EF}.passcode }}</span></p>` +
  `<a href="{{ $json.meetLink }}" style="display:inline-block;padding:12px 24px;background:#4285f4;color:#ffffff;font-size:13px;font-weight:700;border-radius:8px;text-decoration:none;">Open Google Meet &rarr;</a>` +
  `</td></tr></table>` +
  `<a href="mailto:{{ ${EF}.email }}" style="display:inline-block;padding:14px 32px;background:#ffffff;color:#0a090a;font-size:14px;font-weight:700;letter-spacing:-0.01em;border-radius:10px;text-decoration:none;">Reply to {{ ${EF}.name.split(' ')[0] }} &rarr;</a>` +
  `</td></tr><tr><td style="padding:0 40px 36px;"></td></tr>`
);

// ── CONTACT CLIENT EMAIL ───────────────────────────────────────────────────────
const contactClient = shell(
  `<tr><td style="padding:40px 40px 36px;">` +
  `<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#c72323;">Message Received</p>` +
  `<h1 style="margin:0 0 14px;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.03em;line-height:1.25;">We've got your message.</h1>` +
  `<p style="margin:0 0 32px;font-size:15px;color:#888;line-height:1.8;">Thanks for reaching out. One of our team will be in touch with you shortly.</p>` +
  infoCard(
    pill("Name",    `{{ $json.first_name }} {{ $json.last_name }}`) +
    pill("Service", `{{ $json.service }}`) +
    pill("Company", `{{ $json.company }}`)
  ) +
  `<p style="margin:0;font-size:13px;color:#555;line-height:1.7;">In the meantime, feel free to explore <a href="https://dizilo.com" style="color:#c72323;text-decoration:none;">dizilo.com</a></p>` +
  `</td></tr>`
);

// ── CONTACT OWNER EMAIL ────────────────────────────────────────────────────────
const contactOwner = shell(
  `<tr><td style="padding:44px 44px 10px;">` +
  `<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#c72323;">New Enquiry</p>` +
  `<h1 style="margin:0 0 32px;font-size:24px;font-weight:700;color:#ffffff;letter-spacing:-0.03em;">{{ $json.first_name }} {{ $json.last_name }} sent an enquiry.</h1>` +
  infoCard(
    pill("Name",    `{{ $json.first_name }} {{ $json.last_name }}`) +
    pill("Email",   `{{ $json.email }}`) +
    pill("Company", `{{ $json.company }}`) +
    pill("Service", `{{ $json.service }}`)
  ) +
  `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" bgcolor="#1a1a1a" style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;margin-bottom:32px;">` +
  `<tr><td style="padding:24px 32px;">` +
  `<p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#555;">Message</p>` +
  `<p style="margin:0;font-size:14px;color:#aaa;line-height:1.75;">{{ $json.message }}</p>` +
  `</td></tr></table>` +
  `<a href="mailto:{{ $json.email }}" style="display:inline-block;padding:14px 32px;background:#ffffff;color:#0a090a;font-size:14px;font-weight:700;letter-spacing:-0.01em;border-radius:10px;text-decoration:none;">Reply to {{ $json.first_name }} &rarr;</a>` +
  `</td></tr><tr><td style="padding:0 40px 36px;"></td></tr>`
);

(async () => {
  // ── Booking workflow ─────────────────────────────────────────────────────────
  console.log("Updating booking emails...");
  await apiReq("POST", "/api/v1/workflows/Pu8Zzy24SNHtp2YE/deactivate");
  const bRes = await apiReq("GET", "/api/v1/workflows/Pu8Zzy24SNHtp2YE");
  const bwf = JSON.parse(bRes.body);
  for (const node of bwf.nodes) {
    if (node.name === "Email Client (Meet link + details)") {
      node.credentials = { gmailOAuth2: GMAIL_CRED };
      node.parameters.message = "=" + minify(bookingClient);
      node.parameters.subject = "=Your call is booked \u2014 {{ $('Extract Fields').item.json.date }} at {{ $('Extract Fields').item.json.time }}";
      node.parameters.sendTo  = "={{ $('Extract Fields').item.json.email }}";
      console.log("  Client email updated");
    }
    if (node.name === "Notify Owner + Partner") {
      node.credentials = { gmailOAuth2: GMAIL_CRED };
      node.parameters.message = "=" + minify(bookingOwner);
      node.parameters.subject = "=New booking: {{ $('Extract Fields').item.json.name }} \u2014 {{ $('Extract Fields').item.json.date }}";
      node.parameters.sendTo  = env.OWNER_EMAILS.replace(",", ", ");
      console.log("  Owner email updated");
    }
  }
  const bPut = await apiReq("PUT", "/api/v1/workflows/Pu8Zzy24SNHtp2YE", { name: bwf.name, nodes: bwf.nodes, connections: bwf.connections, settings: { executionOrder: "v1" }, staticData: null });
  console.log("  PUT:", bPut.status === 200 ? "OK" : "ERR: " + bPut.body.slice(0, 200));
  await new Promise(r => setTimeout(r, 700));
  await apiReq("POST", "/api/v1/workflows/Pu8Zzy24SNHtp2YE/activate");
  console.log("  Booking workflow ACTIVE");

  // ── Contact workflow ─────────────────────────────────────────────────────────
  console.log("Updating contact emails...");
  await apiReq("POST", "/api/v1/workflows/owQUU9FDoH9OzV2y/deactivate");
  const cRes = await apiReq("GET", "/api/v1/workflows/owQUU9FDoH9OzV2y");
  const cwf = JSON.parse(cRes.body);
  for (const node of cwf.nodes) {
    if (node.name === "Send Confirmation to Client") {
      node.credentials = { gmailOAuth2: GMAIL_CRED };
      node.parameters.message = "=" + minify(contactClient);
      node.parameters.subject = "=We received your message \u2014 Dizilo";
      console.log("  Contact client email updated");
    }
    if (node.name === "Notify Owner + Partner") {
      node.credentials = { gmailOAuth2: GMAIL_CRED };
      node.parameters.message = "=" + minify(contactOwner);
      node.parameters.subject = "=New enquiry: {{ $json.first_name }} {{ $json.last_name }} \u2014 {{ $json.service }}";
      node.parameters.sendTo  = env.OWNER_EMAILS.replace(",", ", ");
      console.log("  Contact owner email updated");
    }
  }
  const cPut = await apiReq("PUT", "/api/v1/workflows/owQUU9FDoH9OzV2y", { name: cwf.name, nodes: cwf.nodes, connections: cwf.connections, settings: { executionOrder: "v1" }, staticData: null });
  console.log("  PUT:", cPut.status === 200 ? "OK" : "ERR: " + cPut.body.slice(0, 200));
  await new Promise(r => setTimeout(r, 700));
  await apiReq("POST", "/api/v1/workflows/owQUU9FDoH9OzV2y/activate");
  console.log("  Contact workflow ACTIVE");

  console.log("\nAll done. Testing booking...");
  await new Promise(r => setTimeout(r, 500));
  const test = (path, body) => new Promise((res, rej) => {
    const data = JSON.stringify(body);
    const o = { hostname: env.N8N_HOST, path, method: "POST", headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(data) } };
    const r = https.request(o, x => { let d = ""; x.on("data", c => d += c); x.on("end", () => res({ s: x.statusCode, b: d.slice(0, 80) })); });
    r.on("error", rej); r.write(data); r.end();
  });
  const testEmail = env.OWNER_EMAILS.split(",")[0].trim();
  const t = await test("/webhook/dizilo-book", { name: "Test User", email: testEmail, date: "2026-04-15", time: "10:00", service: "Discovery Call", notes: "Template test" });
  console.log("Booking test HTTP:", t.s, t.b);
})();
