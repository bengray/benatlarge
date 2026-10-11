// Eleventy 3 config. Source lives in src/, the built site in _site/.
// Netlify runs `npm run build` and publishes _site (see netlify.toml).

import { feedPlugin } from "@11ty/eleventy-plugin-rss";

const SITE_URL = "https://benatlarge.com";

export default function (eleventyConfig) {
  // ---- static files, copied through untouched ----
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/main.js");
  eleventyConfig.addPassthroughCopy("src/fslightbox.js");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/photos");

  eleventyConfig.addWatchTarget("src/styles.css");
  eleventyConfig.addWatchTarget("src/main.js");

  // ---- drafts ----
  // A post with `draft: true` shows while you run `npm start`, and is
  // left out of `npm run build` (which is what Netlify runs).
  eleventyConfig.addPreprocessor("drafts", "*", (data) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
      return false;
    }
  });

  // ---- feed: /feed.xml ----
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: { name: "posts", limit: 20 },
    metadata: {
      language: "en",
      title: "ben.atlarge · Blog",
      subtitle: "Notes from behind the camera.",
      base: `${SITE_URL}/`,
      author: { name: "Ben Doyle Gray" },
    },
  });

  // ---- filters ----
  eleventyConfig.addFilter("year", () => new Date().getFullYear());
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  // "3 March 2026", matching the dates elsewhere on the site
  eleventyConfig.addFilter("readableDate", (d) =>
    new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(d)),
  );
  eleventyConfig.addFilter("absoluteUrl", (path, base) => new URL(path, base).href);
  eleventyConfig.addFilter("pad", (n) => String(n).padStart(2, "0"));

  // ---- shortcodes ----
  // {% frame "/photos/blog/x.jpg", "alt text", "caption" %}
  // A photograph in a paper border, same as the dispatch frames.
  eleventyConfig.addShortcode("frame", (src, alt = "", caption = "") => {
    const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    const cap = caption
      ? `<figcaption class="frame__cap"><span>${esc(caption)}</span></figcaption>`
      : "";
    return `<figure class="frame"><div class="frame__img"><img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async" /></div>${cap}</figure>`;
  });
}

export const config = {
  dir: {
    input: "src",
    includes: "_includes",
    data: "_data",
    output: "_site",
  },
  // .html and .md files can use Nunjucks tags ({% include %}, {% frame %} etc.)
  htmlTemplateEngine: "njk",
  markdownTemplateEngine: "njk",
  templateFormats: ["html", "njk", "md"],
};
