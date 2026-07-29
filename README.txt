benatlarge.com
==============

Three files and a folder of photos. No build step, no dependencies.
Upload the folder; that's the deploy. Same approach as bendoylegray.com.

  index.html    the page
  styles.css    palette, tilt and layout live in :root at the top
  main.js       wordmark fitting + develop-in on scroll
  photos/       swap these out

Open index.html in a browser to work on it. (If anything misbehaves
from file://, run `python3 -m http.server` and use localhost:8000.)

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
Colours              -> :root at the top of styles.css
How crooked          -> the .print:nth-child(n) --tilt values.
                        Past about 1.2deg it stops reading as a hand.
How far the name
overruns the page    -> OVERRUN in main.js. 1.06 means the line is
                        106% of the page width, so the last glyph is
                        cut by the right edge. 1.0 = no crop.
Photos               -> drop files in photos/ and update the <img>
                        src, width and height. Keep width/height
                        accurate or the page will jump as it loads.

STILL TO REPLACE
----------------
- All six placeholder JPGs
- Every price in section 02. Those are invented.
- hello@benatlarge.com, if that isn't the address
- og-image.jpg is referenced in the <head> but not included yet —
  export one at 1200x630 or remove the two meta tags.
- All copy. It's a draft written in an impression of your voice,
  including "The last one", which is a real service a lot of pet
  photographers offer but which you should decide you actually want
  to offer before it goes live.
