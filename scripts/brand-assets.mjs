/**
 * Generates the branded social share image and favicons into /public.
 * Run from the site folder: node scripts/brand-assets.mjs
 *
 * Inputs: public/media/jennys-love-logo-full.png (logo) and public/media/heart-mark.png.
 * Fonts: Lora + Open Sans (SIL OFL) from @fontsource.
 */
import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const { ImageResponse } = require("next/dist/compiled/@vercel/og/index.node.js");

const C = { cream: "#f6f1e7", ink: "#2b211f", soft: "#4a3f3b", heart: "#af1f25", wine: "#3d1719" };
const font = (pkg, file) => readFile(require.resolve(`@fontsource/${pkg}/files/${file}`));
const dataUri = (buf) => `data:image/png;base64,${buf.toString("base64")}`;

const heart = await readFile("public/media/heart-mark.png");
const { width: hw, height: hh } = await sharp(heart).metadata();

// White version of the heart mark for dark backgrounds.
const heartWhite = await sharp({ create: { width: hw, height: hh, channels: 4, background: "#ffffff" } })
  .composite([{ input: heart, blend: "dest-in" }])
  .png()
  .toBuffer();
// Bolder heart for tiny favicons: thicken the line so it survives at 16-48px.
async function boldHeart(weight) {
  // Two passes: sharp would otherwise apply threshold before blur.
  const blurred = await sharp(heart).extend({ top: 48, bottom: 48, left: 48, right: 48, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extractChannel("alpha").blur(weight).png().toBuffer();
  const alpha = await sharp(blurred).threshold(40).toColourspace("b-w").png().toBuffer();
  const meta = await sharp(alpha).metadata();
  return sharp({ create: { width: meta.width, height: meta.height, channels: 3, background: "#ffffff" } })
    .joinChannel(alpha).png().trim().toBuffer();
}
const heartBold = await boldHeart(9);
const heartMedium = await boldHeart(5);
const logo = await readFile("public/media/jennys-love-logo-full.png");

const el = (type, style, children) => ({ type, props: { style, children } });
const img = (src, style) => ({ type: "img", props: { src, style } });

/* ---------- Social share image (1200x630) ---------- */
const og = el("div", { display: "flex", width: "100%", height: "100%", background: C.cream }, [
  el("div", { display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: "64px 0 56px 72px" }, [
    img(dataUri(logo), { width: 430, height: 139 }),
    el("div", { display: "flex", flexDirection: "column", fontFamily: "Lora", fontSize: 68, lineHeight: 1.08, color: C.ink, letterSpacing: "-0.01em" }, [
      el("div", {}, "Kansas City bookkeeping,"),
      el("div", { fontStyle: "italic", color: C.heart }, "with love."),
    ]),
    el("div", { display: "flex", fontFamily: "Open Sans", fontSize: 24, color: C.soft }, "jennyslove.com  ·  816-213-5685"),
  ]),
  el("div", { display: "flex", alignItems: "center", justifyContent: "center", width: 380, height: "100%", background: C.wine }, [
    img(dataUri(heartWhite), { width: 190, height: Math.round((190 * hh) / hw) }),
  ]),
]);

const ogRes = new ImageResponse(og, {
  width: 1200,
  height: 630,
  fonts: [
    { name: "Lora", data: await font("lora", "lora-latin-400-normal.woff"), style: "normal", weight: 400 },
    { name: "Lora", data: await font("lora", "lora-latin-400-italic.woff"), style: "italic", weight: 400 },
    { name: "Open Sans", data: await font("open-sans", "open-sans-latin-400-normal.woff"), style: "normal", weight: 400 },
  ],
});
await sharp(Buffer.from(await ogRes.arrayBuffer())).png({ compressionLevel: 9 }).toFile("public/og-image.png");

/* ---------- Favicons: white heart on brand red, rounded ---------- */
async function icon(size, { rounded = true, pad = 0.18 } = {}) {
  const inner = Math.round(size * (1 - pad * 2));
  const src = size <= 32 ? heartBold : size <= 64 ? heartMedium : heartWhite;
  const mark = await sharp(src).resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  const r = rounded ? Math.round(size * 0.22) : 0;
  const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="${C.heart}"/></svg>`);
  const left = Math.round((size - inner) / 2);
  return sharp(bg).composite([{ input: mark, left, top: left }]).png().toBuffer();
}

await writeFile("public/icon.png", await icon(512));
await writeFile("public/icon-192.png", await icon(192));
await writeFile("public/apple-icon.png", await icon(180, { rounded: false, pad: 0.16 })); // iOS rounds corners itself

// favicon.ico with 16/32/48 PNG entries.
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => icon(s, { pad: s <= 16 ? 0.1 : 0.14 })));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const dir = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0);
  e.writeUInt8(s, 1);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(pngs[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += pngs[i].length;
  return e;
});
await writeFile("public/favicon.ico", Buffer.concat([header, ...dir, ...pngs]));

console.log("Wrote public/og-image.png, icon.png, icon-192.png, apple-icon.png, favicon.ico");
