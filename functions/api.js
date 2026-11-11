// Cloudflare Pages Function at /api — passes the app's calls to the Google Apps Script backend.
// The page POSTs {fn, args}; this adds the site address and forwards it to Apps Script, then returns the JSON.
// APPS_SCRIPT_URL is set as an environment variable in the Cloudflare Pages project (not in this repo).

export async function onRequestPost(context) {
  const { request, env } = context;
  const url = env.APPS_SCRIPT_URL;
  if (!url) return json({ e: "Server not configured (APPS_SCRIPT_URL missing)." });
  let body = {};
  try { body = await request.json(); } catch (_) { return json({ e: "Bad request." }); }
  body.site = new URL(request.url).origin;
  try {
    const upstream = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      redirect: "follow",
    });
    const text = await upstream.text();
    if (!text.trim().startsWith("{")) return json({ e: "The server is busy. Please try again." });
    return new Response(text, { status: 200, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });
  } catch (err) {
    return json({ e: "Could not reach the server. Please try again." });
  }
}

export async function onRequestGet() {
  return json({ ok: true, info: "Rent Tracker API proxy is running." });
}

function json(obj) {
  return new Response(JSON.stringify(obj), { status: 200, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });
}
