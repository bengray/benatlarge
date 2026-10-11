// Applies to every file in src/blog/: each one is a post.
export default {
  layout: "layouts/post.njk",
  tags: ["posts"],
  permalink: "/blog/{{ page.fileSlug }}/",
  ogType: "article",
};
