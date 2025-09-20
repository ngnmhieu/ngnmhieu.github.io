import fs from 'fs';
import path from 'path';
import cssnano from 'cssnano';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';

const SOURCE_DIR = 'src';
const OUTPUT_DIR = 'docs';

export default function (eleventyConfig) {

  eleventyConfig.on('eleventy.before', async () => {
    const tailwindInputPath = path.resolve(`./${SOURCE_DIR}/assets/input.css`);
    const tailwindOutputPath = `./${OUTPUT_DIR}/assets/output.css`;
    const cssContent = fs.readFileSync(tailwindInputPath, 'utf8');
    const outputDir = path.dirname(tailwindOutputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const result = await processor.process(cssContent, {
      from: tailwindInputPath,
      to: tailwindOutputPath,
    });

    fs.writeFileSync(tailwindOutputPath, result.css);
  });

  const processor = postcss([
    // compile tailwind
    tailwindcss(),

    // minify tailwind css
    cssnano({
      preset: 'default',
    }),
  ]);

  eleventyConfig.addShortcode("inlineSvg", function(file) {
    const filePath = path.join("src/assets/svg", file);
    return fs.readFileSync(filePath, "utf8");
  });

  eleventyConfig.addPassthroughCopy("src/assets");

  return {
    dir: {
      input: SOURCE_DIR,
      output: OUTPUT_DIR
    }
  };
};
