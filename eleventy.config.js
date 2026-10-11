// Eleventy 3 config. Source lives in src/, the built site in _site/.
// Netlify runs `npm run build` and publishes _site (see netlify.toml).

export default function (eleventyConfig) {
  // Copied through untouched, at the same paths they had before.
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/main.js");
  eleventyConfig.addPassthroughCopy("src/fslightbox.js");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/photos");

  // Rebuild on CSS/JS edits during `npm start`.
  eleventyConfig.addWatchTarget("src/styles.css");
  eleventyConfig.addWatchTarget("src/main.js");

  eleventyConfig.addFilter("year", () => new Date().getFullYear());
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("absoluteUrl", (path, base) => new URL(path, base).href);
}

export const config = {
  dir: {
    input: "src",
    includes: "_includes",
    data: "_data",
    output: "_site",
  },
  // .html and .md files can use Nunjucks tags ({% include %} etc.)
  htmlTemplateEngine: "njk",
  markdownTemplateEngine: "njk",
  templateFormats: ["html", "njk", "md"],
};
