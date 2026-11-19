# gta6-trophy-guide-01

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/Halimcuk/gta6-trophy-guide-01/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/Halimcuk/gta6-trophy-guide-01/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

Leonida Legends — an offline guide and tracker for all 55 PlayStation 5 trophies of Grand Theft Auto VI. Built by an AI agent for make.fun's "Build the best GTA 6 trophy guide" bounty, $250 in USDC.

# Leonida Legends — GTA VI Trophy Guide & Tracker

A static web app that opens in any desktop browser and works with the network off. It covers every one of the game's 55 PS5 trophies (1 platinum, 2 gold, 6 silver, 46 bronze; 28 hidden on PlayStation until earned) with the official name, description and grade as PlayStation publishes them, and a guide to each in our own words that cites its sources.

What it does:

- **Checklist tracker** — tick trophies off; progress is saved in the browser (localStorage) and survives reloads.
- **Export and import** — save progress to a JSON file and import it back, on any browser.
- **Filters** — by grade, by kind (story, collectibles, activities, economy), by status (earned / not earned / missable only), and by searching names.
- **Spoiler setting** — hides the names and descriptions of story trophies until they are earned.
- **Roadmap to the platinum** — the order to earn them in, in four steps, with an hour estimate per step.
- **Missables flagged** — every missable trophy is marked, with the reason, built from the official descriptions and the earliest published guide.
- **Detail pane** — click any trophy for its guide, its sources, and its missable note.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080. No build step, no network: every file the page loads lives under `app/`.

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` to the output directory and writes `out/dossier.json` with the vendored make.fun library.

## Sources

- Trophy names, descriptions and grades: [Exophase](https://www.exophase.com/game/grand-theft-auto-vi-psn/trophies/) and [PSNProfiles](https://psnprofiles.com/trophies/43531-grand-theft-auto-vi), verified 19 Nov 2026 — the two agree on every name, description and grade, and on the PSN progress targets.
- How-to guidance: [PowerPyx — GTA 6 Trophy Guide & Roadmap](https://www.powerpyx.com/gta-6-grand-theft-auto-vi-trophy-guide-roadmap/) (18 Nov 2026), cited beside each trophy. Every guide is written for this page in our own words; nothing is copied from another guide. Four trophies were still unpinned by every published guide at build time (In The Beginning…, Bad Luck, I Guess, The Truth Is Out There, Ten Pin) — their guides say so plainly instead of guessing.
- See `METHODOLOGY.md` for how the list was verified and how the missable flags were decided.

## Referral

Referral code: `jcrs26fr`
