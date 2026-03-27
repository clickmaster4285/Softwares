const sharp = require("sharp");
const path = require("path");

const imagesToOptimize = [
  { src: "public/logo.png", sizes: [192, 384] },
  { src: "public/logo-white.png", sizes: [192, 384] },
  { src: "public/clickMasters.png", sizes: [64, 128, 192] },
  { src: "public/hero.jpg", sizes: [640, 768, 1024, 1280, 1536] },
];

async function optimizeImages() {
  for (const image of imagesToOptimize) {
    const ext = path.extname(image.src);
    const baseName = image.src.replace(ext, "");

    for (const size of image.sizes) {
      await sharp(image.src)
        .resize(size)
        .webp({ quality: image.src.includes("logo") ? 40 : 75, effort: 6 })
        .toFile(`${baseName}-${size}.webp`);

      await sharp(image.src)
        .resize(size)
        .avif({ quality: image.src.includes("logo") ? 38 : 65, effort: 6 })
        .toFile(`${baseName}-${size}.avif`);
    }

    console.log(`Optimized ${image.src}`);
  }
}

optimizeImages().catch((error) => {
  console.error("Image optimization failed:", error);
  process.exit(1);
});
