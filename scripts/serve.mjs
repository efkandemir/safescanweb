import http from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const directory = path.resolve(fileURLToPath(new URL("../dist/", import.meta.url)));
const args = process.argv.slice(2);
const port = Number(args[args.indexOf("--port") + 1]) || 8787;
const baseIndex = args.indexOf("--base");
const base = baseIndex >= 0 ? "/" + args[baseIndex + 1].replace(/^\/+|\/+$/g, "") : "";
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".ttf": "font/ttf", ".txt": "text/plain; charset=utf-8" };
const server = http.createServer(async (request, response) => {
  try {
    if (!["GET", "HEAD"].includes(request.method)) { response.writeHead(405); response.end(); return; }
    let pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    if (base && pathname === base) { response.writeHead(302, { Location: base + "/" }); response.end(); return; }
    if (base && !pathname.startsWith(base + "/")) { response.writeHead(404); response.end(); return; }
    if (base) pathname = pathname.slice(base.length);
    let file = path.resolve(directory, "." + pathname);
    if (file !== directory && !file.startsWith(directory + path.sep)) { response.writeHead(403); response.end(); return; }
    let code = 200;
    try { const info = await stat(file); if (info.isDirectory()) file = path.join(file, "index.html"); await stat(file); }
    catch { file = path.join(directory, "404.html"); code = 404; }
    response.writeHead(code, { "Content-Type": types[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", "Referrer-Policy": "strict-origin-when-cross-origin" });
    if (request.method === "HEAD") response.end(); else createReadStream(file).pipe(response);
  } catch { response.writeHead(400); response.end("Bad request"); }
});
server.listen(port, "127.0.0.1", () => console.log(`SafeScan web preview: http://127.0.0.1:${port}${base}/`));
