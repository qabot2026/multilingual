/**
 * Concatenates company.config.js + company.js into one file for client distribution.
 * Run: node scripts/build-widget-bundle.mjs
 * Output: dist/company-widget.bundle.js
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "dist");
const configPath = path.join(root, "static", "company.config.js");
const companyPath = path.join(root, "static", "company.js");
const cssPath = path.join(root, "static", "company.css");
const outJs = path.join(outDir, "company-widget.bundle.js");
const outCss = path.join(outDir, "company.css");

fs.mkdirSync(outDir, { recursive: true });

const config = fs.readFileSync(configPath, "utf8");
const company = fs.readFileSync(companyPath, "utf8");
const banner = "/* Built by scripts/build-widget-bundle.mjs — do not edit by hand */\n";

fs.writeFileSync(outJs, banner + config + "\n" + company, "utf8");
fs.copyFileSync(cssPath, outCss);

console.log("Wrote:", outJs);
console.log("Copied:", outCss);
console.log("Next: upload dist/company-widget.bundle.js, dist/company.css, and embed/company-loader.js to your CDN or static host.");
