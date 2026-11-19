# Methodology — Leonida Legends (GTA VI trophy guide)

## Where the trophy list comes from

The official PlayStation 5 list has 55 trophies: 1 platinum, 2 gold, 6 silver,
46 bronze; 28 of them are hidden on PlayStation until earned; there are no
online trophies.

Primary sources, checked 19 Nov 2026:

1. **Exophase** — https://www.exophase.com/game/grand-theft-auto-vi-psn/trophies/
   (all 55 descriptions, in the same order as the kit's input file).
2. **PSNProfiles** — https://psnprofiles.com/trophies/43531-grand-theft-auto-vi
   (all 55 names with their descriptions, plus the PSN progress targets:
   A Long Road 0/100, Cunning Stunts 0/250, Master of None 0/9, The Shootist
   0/42, Top Fun 0/14, Earn Cash, Not Kudos 0/20, Strangers & Freaks 0/8,
   Positive Mental Attitude 0/18, Don't Touch My Deck 0/3, You WAiNKer! 0/100,
   One Last Thing 0/50, Whip It Good 0/100, Maximum Withdrawal 0/5,
   The Goodtime State 0/52, Pest Control 0/9, Actions Speak Louder 0/500,
   Dime on the Dollar 0/250000, Treat Yo Self 0/100000, Little Boxes 0/8,
   On the Spot 0/10).
3. **The kit's input file** `input/p00.in` from the sibling
   gta6-trophy-rarity-forecast-01 kit (a recording of the same Exophase page),
   which also carries each trophy's hidden flag.

## Verification

- Every name, description and grade in `app/data/trophies.json` was compared
  mechanically against `p00.in` and against the PSNProfiles page: **0
  differences** — all 55 names, all 55 descriptions and all 55 grades agree
  across all three sources.
- The Exophase page text (fetched 19 Nov 2026) lists the same 55 descriptions
  in the same order; its trophy names are not present in the page's extracted
  text, so names were verified against PSNProfiles instead.
- Hidden flags come from `p00.in` (28 hidden), matching the count the
  competition's rules state (28 hidden) and the counts other launch-day lists
  report (27 visible, 28 hidden).
- Grades: 1 platinum (Vice Got a Price!), 2 gold (You Gotta Know When to Get
  Off, A Long Road), 6 silver (Cunning Stunts, The Shootist, Strangers &
  Freaks, Don't Touch My Deck, You WAiNKer!, Maximum Withdrawal), 46 bronze.
- The asterisked name is reproduced exactly as PlayStation publishes it:
  "T**s Ass Drug Money".

## How the guides were written

- Every guide is written for this entry, in our own words. Nothing is copied
  from another guide.
- The how-to facts come from **PowerPyx — GTA 6 Trophy Guide & Roadmap**
  (https://www.powerpyx.com/gta-6-grand-theft-auto-vi-trophy-guide-roadmap/,
  18 Nov 2026), the first full published guide for the game, cited beside
  each trophy together with Exophase (names/descriptions/grades) and
  PSNProfiles (progress targets). Each trophy's `sources` field in
  `app/data/trophies.json` names exactly which of the three it draws on.
- Four trophies were still unpinned by every published guide at build time.
  Their guides say so plainly instead of guessing, and name what the
  reporting guide believes they relate to:
  - In The Beginning… — PowerPyx: currently unknown.
  - Bad Luck, I Guess — PowerPyx: currently unknown, believed to be related
    to the Payday Loans store from the prologue.
  - The Truth Is Out There — PowerPyx: currently unknown, believed to be
    from a UFO questline.
  - Ten Pin — PowerPyx: currently unknown, believed to be from kicking
    enemies while driving a motorcycle.
- The game's own facts used in the roadmap (about 200 hours to the platinum,
  60–80 hours of story, 5 chapters, no mission replay, no online trophies,
  cheats disable trophies and saving, 15 manual save slots, 100% checklist
  opening after the story and needing only about 60% of true completion) all
  come from the same PowerPyx roadmap page.

## How the missable flags were decided

The flags are built from the official descriptions plus PowerPyx's launch-day
reporting, not from playing the game (the game released the day this guide
was built).

- **Flagged (1 trophy): Positive Mental Attitude.** PowerPyx flags it as the
  only potentially missable trophy in the set: one meditation happens at
  Jason's house in Chapter 1 and becomes permanently unavailable after
  Chapter 1. Whether that meditation counts toward the trophy is still
  unconfirmed, so the guide tells the reader to do it while they can.
- **Not flagged (54 trophies).** PowerPyx reports that every trophy-related
  quest giver stays available after the story in free-roam (Kenton, who goes
  quiet for a while mid-story, returns in Chapters 2–3), that nothing on the
  100% checklist is missable, and that optional missions, fences and magazine
  spots that disappear do not feed any trophy or the checklist. Story trophies
  are automatic on completing their mission or chapter and cannot be missed.
  The one exception to the "not missable" reasoning is Let's Go Bowling,
  where PowerPyx confirms the robbery icon respawns, so a missed item can be
  collected later.
- The missables page in the app states this reasoning and its source, so a
  reader can see the flag is a launch-day judgement, not a confirmed fact.

## Kinds and roadmap stages

- Kinds are assigned from the official description: **story** (chapters,
  named missions, final missions for contacts), **collectibles** (meditation
  spots, card sets, WAiNK scans, vehicles, map regions), **activities**
  (races, stunts, robberies, hunting, challenges, one-off feats),
  **economy** (money, shopping, garages, vehicle registration). There are no
  online trophies, so no online kind exists in the list.
- Roadmap stages follow PowerPyx's three-step roadmap (story, then 100%
  checklist and challenges, then Strangers & Freaks and cleanup), with the
  platinum as a fourth step.

## Limits of this guide

- The game launched 19 Nov 2026, the day this guide was built. No trophy
  method here was verified by playing the game; everything beyond the official
  names, descriptions, grades and PSN targets rests on the single published
  guide available at build time (PowerPyx, 18 Nov 2026), and the four
  trophies above are openly marked as unconfirmed.
- Rarity figures are not shown: on launch day they move hourly and would be
  stale before anyone reads them.
