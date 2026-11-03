import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../dist/", import.meta.url));
const htmlFiles = fs.readdirSync(root).filter((name) => name.endsWith(".html"));
const js = fs.readFileSync(path.join(root, "assets/app.js"), "utf8");
const copy = JSON.parse(js.match(/const copy = (\{[^\r\n]*\});/)[1]);
let refs = 0, strings = 0;
for (const name of htmlFiles) {
  const filename = path.join(root, name), html = fs.readFileSync(filename, "utf8");
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(ids.length, new Set(ids).size, `${name}: duplicate IDs`);
  if (name !== "private.html") assert.equal((html.match(/<h1\b/g) || []).length, 1, `${name}: expected one h1`);
  for (const [, key] of html.matchAll(/data-(?:i18n|alt|aria)="([^"]+)"/g)) {
    assert.equal(typeof copy.tr[key], "string", `Missing Turkish: ${key}`);
    assert.equal(typeof copy.en[key], "string", `Missing English: ${key}`);
    strings++;
  }
  for (const [, ref] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:)/.test(ref)) continue;
    const [part, hash] = ref.split("#");
    const resolved = part ? path.resolve(path.dirname(filename), part) : filename;
    assert.ok(resolved.startsWith(root), `Path leaves published folder: ${ref}`);
    assert.ok(fs.existsSync(resolved), `${name}: missing ${ref}`);
    if (hash) assert.ok(fs.readFileSync(resolved, "utf8").includes(`id="${hash}"`), `${name}: missing anchor ${ref}`);
    refs++;
  }
}
const cssPath = path.join(root, "assets/styles.css");
for (const [, ref] of fs.readFileSync(cssPath,"utf8").matchAll(/url\(([^)]+)\)/g)) assert.ok(fs.existsSync(path.resolve(path.dirname(cssPath), ref)), `Missing CSS asset: ${ref}`);
assert.ok(!js.includes("https://"), "No external runtime endpoints are expected");
console.log(`PASS: ${htmlFiles.length} pages, ${refs} local references/anchors, ${strings} localized text/image entries, local fonts and default unpublished store links.`);
