# Alberto — Musician Website

Live site for dad: **https://genemagg10.github.io/musician-website/**

Static site (`index.html`, `styles.css`, `script.js`, `images/`, `audio/`) for Alberto — musician, songwriter, and writer.

## Local preview

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Standalone recordings

The Music / Discography section now has a **Standalone Recordings** area so visitors can play songs on their own (not only from the *Love Moods* tracklist).

| Song | Status |
| --- | --- |
| **No Reason, No Rhyme** | New iPhone voice-memo take (~3:09). Native `<audio controls>` player wired to `audio/no-reason-no-rhyme.mp3`. Clicking the album track also plays this file in the bottom preview bar. |
| **Old Men Sing The Blues** | Still on the *Love Moods* tracklist. Matching standalone card with **Audio coming soon** until the file is supplied. No Spotify / Apple IDs invented. |

### Audio

`audio/no-reason-no-rhyme.mp3` is on this branch (iPhone voice memo, ~2.3MB, 3:09). The standalone player and the Love Moods track-row preview both use that path. Do not invent streaming IDs.

*Old Men Sing The Blues* still needs a file from Geno.

## Photo TODOs

Do **not** invent mural photos. Still needed:

1. **About photo** — replace `images/about.jpeg` (current mural / singer-wall shot) with a different-background about portrait.
2. **Screenplays section** — add a Bonnie + Alberto mural photo when it is supplied.
3. **Optional later** — a studio band group photo may arrive on this PR from the coordinator.

## Site map

- Home, Reviews, About, Music (Discography + standalone players), Writings (screenplays / songs & poems), mailing list
