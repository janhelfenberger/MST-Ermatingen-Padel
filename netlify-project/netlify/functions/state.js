import { getStore } from "@netlify/blobs";

// Alle Daten der Padelgruppe liegen unter genau diesem einen Schlüssel.
// "strong" consistency sorgt dafür, dass eine Änderung sofort für alle sichtbar ist,
// nicht erst nach ein paar Sekunden.
const STORE_NAME = "padel-mst-ermatingen";
const KEY = "season-2026-27";

export default async (req) => {
  const store = getStore({ name: STORE_NAME, consistency: "strong" });

  if (req.method === "GET") {
    const data = await store.get(KEY, { type: "json" });
    return new Response(JSON.stringify({ state: data || null }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  if (req.method === "POST") {
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: "invalid json" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    await store.setJSON(KEY, body);
    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response("Method not allowed", { status: 405 });
};
