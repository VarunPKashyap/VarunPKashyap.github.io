# Weekly digest: editorial instructions

This portfolio is published from the root of the main branch in varunpkashyap/varunpkashyap.github.io at https://varunpkashyap.github.io. Preserve its audience, design, copy, assets and project structure. For a digest refresh, edit only public/digest.json, public/digest-archive.json, public/digest-images.json and corresponding thumbnails in public/assets/reads/, then rebuild the static export as described in README.md. Commit those source updates together with the regenerated root export and .pages-export.json, push main, and verify the GitHub Pages deployment succeeds before reporting the edition as updated. Always start from current remote source; do not publish an outdated checkout or unrelated unfinished changes.

The user requested a digest of things for visitors to check out, changed to weekly with a public archive on 21 September 2026. New editions are scheduled for Mondays at 8am Asia/Kolkata. They work across curiosity, articulation, cultural insights and brand strategy, with Indian consumer culture, the social life of going out, media, taste and attention as recurring interests. They named Matt Klein, Sukhnidh Kaur, Eugene Healey and Oren John as references. Bangalore is a meaningful local context. Their Substack is https://substack.com/@hopper1206 — do not claim to have accessed reading, likes, restacks or subscriptions without actually verifying that content. Proposed sources are not confirmed subscriptions.

## Editorial standard — updated after the user's 23 September 2026 review

The digest should demonstrate a point of view, not simply familiarity with a few strategy newsletters. The previous selection was too narrow, too old and too repetitive. Choose for what a piece reveals, not the prestige of its publication or the fact that it is on Substack.

- Build a shortlist of roughly 8–12 genuinely plausible pieces across at least five publications, then publish only the strongest three to five. Do not fill a slot with a weak link to meet a topic quota. Prefer a smaller strong edition to five adequate picks.
- Read the body of every selected essay. Each must offer a concrete observed detail, original reporting, a well-supported argument or a distinctive creative experience. A headline, abstract, search snippet or paywall preview is not enough to recommend the full piece. Reject generic trend lists, recycled brand case studies, promotional introductions and familiar claims with no new evidence.
- Privately assess originality, depth/evidence, fit with Varun's interests, and contribution to the edition's range. Ask: what does this help someone notice that they would otherwise miss? Record the specific answer; avoid mechanical scores that imply objective quality.
- Include Indian cultural life as a substantive perspective, not a market-size footnote. Keep at least one strong Substack essay when accessible, but also search beyond Substack and the regular starting publications. Use at most one item per publication; aim for at least two voices outside the usual source list.
- Aim for at least two pieces published in the preceding 60 days and no more than one explicitly labelled evergreen essay. Current, verified cultural experiences can complement the reading. Never trade quality or accurate dates for apparent freshness. If the recent pool is weak, narrow the edition or state the limitation rather than silently filling it with old links.
- Check the entire archive before selection. Do not repeat a URL from the last eight editions. A later return needs a materially new reason, explicitly explained; never reuse two items simply to assemble another edition.
- Give the edition a readable editorial sequence: the strongest lead, a different perspective or counterpoint, and an unexpected discovery. A unifying question can connect them, but do not force unrelated pieces into a theme.
- Summaries should name the author's actual argument and one concrete detail, without reproducing passages. Selection notes should explain why that particular detail changes how we understand culture, taste, language or behaviour. Do not end every note with a rhetorical question or bolt a brand-strategy lesson onto every piece. Keep personal testimony, reported evidence and the curator's interpretation distinct.
- Preserve the source's title, byline, exact date and access status. Use source-verified thumbnails. Avoid declaring a universal trend from a few anecdotes or treating a critic's judgment as established fact.

The user explicitly requested a stronger selection on 23 September 2026. Edition 004 is an off-cycle editorial replacement for the latest view, while editions 001–003 remain unchanged in the archive. This does not change the recurring Monday schedule or authorise duplicate editions on scheduled retries.

## Each edition
- Research three to five worthwhile direct links, with at least one Indian perspective; include a Bangalore cultural activity or place when an appropriate current source can be verified.
- Include at least one verified essay from a Substack publication when accessible. Explore ZINE, The India Notes, Why Is This Interesting and SatPost, broadening for strong writing on culture, taste, articulation and brand meaning. Link the actual essay and author; do not imply these are verified private subscriptions.
- Mix reporting or analysis with something to explore, experience or play. Avoid a feed made entirely of AI or marketing-industry commentary.
- Read each linked source. Verify title, author/publication, date and event validity. Prefer primary sources and accessible full text. Paywalled pieces can be clearly marked, never bypassed.
- Favor work from the past week or month, but keep useful archival picks explicitly dated and labelled. Do not invent recency. Never recommend an expired exhibition or voting window as current.
- Keep the summary factual and original, around 30–45 words. Keep the angle to 25–45 words. Distinguish an interpretation from a source's claim. Do not claim Varun wrote these selection notes, read the pieces, or endorsed the conclusions. Public-facing copy calls this “A curated weekly selection”. Preserve that wording and do not restore the removed automation/generated-copy disclaimer.
- Use source URLs for individual items, never search result links. Validate HTTPS links and remove tracking parameters when safe. No invented links.
- Retain the exact JSON schema. Change `updatedAt` only on a genuinely researched edition, use the actual edition date, increment the numeric string `edition` by one, and write a short varied `headline` describing the selection.
- Every item requires: `id`, `category`, `title`, `source`, `dateLabel`, `url`, `summary`, `angle` (all strings). Category examples: READ / MEDIA, READ / INDIA, GO / BANGALORE, PLAY / INTERNET. If a current Bangalore item exists, include BANGALORE in its category to identify its local context.
- `sources` is an array of `{name,url}` showing the reading list. It may evolve when justified by the research. Do not represent it as private subscription data.
- If sources are unavailable or a meaningful edition cannot be verified, leave the current edition and its date unchanged; report the limitation. Do not fill space with fabricated selections.

Starting sources: ZINE (https://zine.kleinkleinklein.com/), The India Notes (https://newsletter.theindianotes.com/), Why is this interesting? (https://whyisthisinteresting.substack.com/), MAP Bengaluru (https://map-india.org/), Bangalore International Centre (https://bangaloreinternationalcentre.org/), Tiny Awards (https://tinyawards.net/). Broaden when an original, credible piece merits it. None is asserted to be a private subscription.

## Preserve every edition

- `public/digest.json` is the latest published edition. `public/digest-archive.json` contains an `editions` array, newest first, including the latest edition and every previous edition. Each archived record uses the same fields as the latest digest plus `cadence`, either `daily` or `weekly`.
- Never replace, remove, renumber or redraft an existing archive record during a refresh. The original daily editions 001 and 002 retain their original dates and text. An edition's permanent link is `#digest-edition-<edition>`; the archive index is `#digest-archive`.
- Before replacing the latest digest, ensure its exact contents exist in the archive. Add the new fully researched edition to the front with `cadence: "weekly"`, then set `public/digest.json` to the same record without the cadence field. Increment from the greatest existing edition number; do not reset numbering for weekly editions.
- At most one new edition per Monday–Sunday week in Asia/Kolkata. If this week's edition already exists, preserve it and report no new edition needed; do not duplicate on retries. Leave date gaps if publication is skipped. Never relabel an old selection with a fresh date.
- The public archive must contain complete source URLs, summaries, selection notes and original source dates, not just a list of old headlines. Historical event copy is preserved; the site warns that events and availability may have changed.

Run `node scripts/validate-digest.mjs` and `pnpm build` before committing. Validation checks both files, latest/archive consistency and preservation of committed history. The build refreshes the static files at the repository root. Commit source and generated files together, push main, and verify the GitHub Pages deployment. The digest is compiled into the site; changing source JSON without rebuilding and publishing does not update the live edition.

## Article thumbnails

- Include the original article’s verified publisher image (Open Graph, hero image or official linked thumbnail) for each new recommendation when available. Never substitute an unrelated or generated image.
- Download and optimise verified images into `public/assets/reads/<item-id>.webp`. Aim for 1200px maximum width and under 300KB. Preserve necessary credits and licenses.
- Add metadata under the item id in `public/digest-images.json`: `src` (local `/assets/reads/` URL), `alt` (accurate descriptive text), `sourceUrl` (exact image URL), and `sourcePage` (page verifying the image). When needed, add `credit`, `creditUrl`, `license`, `licenseUrl`, and `modifications`; these credits are rendered with the article.
- Preserve metadata and assets for every archived edition. This separate image manifest adds visual context without changing published edition records.
- Check downloaded image files open correctly. If a source provides no usable image, omit its manifest entry; the site uses a typographic source card. Do not leave broken image paths.
