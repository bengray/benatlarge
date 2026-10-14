---
title: "First post"
description: "One line that shows under the title on the journal page and in link previews."
date: 2026-10-11
draft: true
---

This is an example post. It has `draft: true` at the top, so it shows up
while you run `npm start` but is left out of the live site. Delete that
line (or the whole file) when you're ready.

Every post is a Markdown file in `src/journal/`. The file name becomes the
URL: this one would be `/journal/first-post/`.

## A heading

Regular Markdown works: _italics_, **bold**, [links](/work-with-me.html),
lists, and quotes.

> A pull quote sits off to the side with a red rule.

For a photograph in a paper border with a caption, put the file in
`src/photos/journal/` and use the `frame` shortcode:

{% frame "/photos/georgie.jpg", "Georgie, looking past the camera", "Georgie" %}

That's it.
