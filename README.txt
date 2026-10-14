benatlarge.com
==============

Built with Eleventy 3 and deployed on Netlify.

  src/index.html          the home page (content only)
  src/work-with-me.html   the rates page (content only)
  src/_includes/          shared <head>, lockup and footer
  src/_data/site.js       site name, URL, og image
  src/styles.css          palette, tilt and layout live in :root at the top
  src/main.js             wordmark fitting + develop-in on scroll
  src/photos/             swap these out
  print_media/            working files, NOT published

Working on it:

  npm install       once
  npm start         dev server at http://localhost:8080, live reload
  npm run build     writes the site to _site/

Deploy: push. Netlify runs `npm run build` and publishes _site/
(see netlify.toml). New pages: drop an .html or .md file in src/
with `layout: layouts/base.njk` and a title/description in the
front matter.

journal
----
Posts are Markdown files in src/journal/. The file name is the URL:
src/journal/loki.md -> benatlarge.com/journal/loki/

  ---
  title: "Loki, week one"
  description: "One line for the journal list and link previews."
  date: 2026-10-14
  draft: true        # visible in `npm start`, left off the live site
  ---

Photos for posts go in src/photos/journal/. For one in a paper border
with a caption:  {% frame "/photos/journal/loki.jpg", "alt text", "Caption" %}

The journal list is /journal/, the feed is /feed.xml, and the sitemap
picks posts up on its own. src/journal/first-post.md is an example draft;
delete it whenever.

THE IDEA
--------
bendoylegray.com is the contact sheet — the stage where you choose.
This is the next stage: the prints. Dark bench, photographs inside
real paper borders, laid down by hand so none of them sit square.
Hovering one straightens it, the way picking up a print does.

Shared with the other site on purpose: the typefaces, the china red,
the safelight amber, and the crooked-by-hand tilt. Different on
purpose: dark ground instead of light, photographs instead of links.

CHANGING THINGS
---------------
Colours              -> :root at the top of src/styles.css
How crooked          -> the .print:nth-child(n) --tilt values.
                        Past about 1.2deg it stops reading as a hand.
How far the name
overruns the page    -> OVERRUN in src/main.js. 1.06 means the line is
                        106% of the page width, so the last glyph is
                        cut by the right edge. 1.0 = no crop.
Photos               -> drop files in src/photos/ and update the <img>
                        src, width and height. Keep width/height
                        accurate or the page will jump as it loads.

STILL TO REPLACE
----------------
- All six placeholder JPGs
- Every price in section 02. Those are invented.
- ben@benatlarge.com, if that isn't the address
- og-image.jpg is referenced in the <head> but not included yet —
  export one at 1200x630 or remove the two meta tags.
- All copy. It's a draft written in an impression of your voice,
  including "The last one", which is a real service a lot of pet
  photographers offer but which you should decide you actually want
  to offer before it goes live.
