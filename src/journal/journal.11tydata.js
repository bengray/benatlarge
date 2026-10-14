// Applies to every file in src/journal/: each one is a post.
export default {
  layout: "layouts/post.njk",
  tags: ["posts"],
  permalink: "/journal/{{ page.fileSlug }}/",
  ogType: "article",
};
