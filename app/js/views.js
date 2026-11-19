// Rendering for the Leonida Legends tracker: the checklist, the trophy detail
// pane, the roadmap stages and the missables page. All text comes from the data
// files through textContent, never from innerHTML.
import { countByGrade, filterTrophies, isHiddenBySpoiler } from './filters.js';

const GRADE_LABELS = { platinum: 'Platinum', gold: 'Gold', silver: 'Silver', bronze: 'Bronze' };
const KIND_LABELS = { story: 'Story', collectibles: 'Collectibles', activities: 'Activities', economy: 'Economy' };
const GRADE_COLORS = { platinum: '#c9c9de', gold: '#d4af37', silver: '#9aa3ad', bronze: '#b0793f' };

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function gradeChip(trophy) {
  return el('span', `chip grade-${trophy.grade}`, GRADE_LABELS[trophy.grade]);
}

function kindChip(trophy) {
  return el('span', 'chip', KIND_LABELS[trophy.kind] ?? trophy.kind);
}

function metaRow(trophy) {
  const row = el('div', 'meta');
  row.append(gradeChip(trophy), kindChip(trophy));
  if (trophy.count !== null && trophy.count !== undefined) {
    row.append(el('span', 'chip', `Target: ${trophy.count}`));
  }
  if (trophy.hidden) row.append(el('span', 'chip hidden-chip', 'Hidden on PSN'));
  if (trophy.missable) row.append(el('span', 'chip missable', 'Possibly missable'));
  return row;
}

export function renderProgress(state) {
  const earned = state.earned.size;
  const total = state.trophies.length;
  document.getElementById('earnedCount').textContent = String(earned);
  document.getElementById('totalCount').textContent = String(total);
  document.getElementById('earnedPct').textContent = `${Math.round((earned / total) * 100)}%`;
  document.getElementById('progressFill').style.width = `${(earned / total) * 100}%`;
  const stats = document.getElementById('gradeStats');
  stats.replaceChildren();
  const byGrade = countByGrade(state.trophies, state.earned);
  for (const grade of ['platinum', 'gold', 'silver', 'bronze']) {
    const bucket = byGrade[grade];
    if (!bucket) continue;
    const item = el('span');
    const dot = el('span', 'dot');
    dot.style.background = GRADE_COLORS[grade];
    item.append(dot, document.createTextNode(`${GRADE_LABELS[grade]} ${bucket.earned}/${bucket.total}`));
    stats.append(item);
  }
}

export function renderChecklist(state, onToggle, onSelect) {
  const list = document.getElementById('trophyList');
  const shown = filterTrophies(state.trophies, state.filters, state.earned, state.settings);
  document.getElementById('countLine').textContent =
    `Showing ${shown.length} of ${state.trophies.length} trophies` +
    (state.earned.size ? ` · ${state.earned.size} earned` : '');
  document.getElementById('emptyNote').hidden = shown.length !== 0;
  list.replaceChildren();
  for (const trophy of shown) {
    const item = el('li', 'trophy');
    if (state.earned.has(trophy.id)) item.classList.add('earned');
    if (state.selectedId === trophy.id) item.classList.add('selected');
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = state.earned.has(trophy.id);
    box.setAttribute('aria-label', `Mark ${trophy.name} earned`);
    // The row itself opens the detail pane on click; a click on the box must
    // not do that, or the re-render would detach the box before it toggles.
    box.addEventListener('click', (event) => event.stopPropagation());
    box.addEventListener('change', (event) => {
      event.stopPropagation();
      onToggle(trophy.id, box.checked);
    });
    const body = el('div');
    const hidden = isHiddenBySpoiler(trophy, state.settings, state.earned);
    const name = el('div', 'name', hidden ? 'Hidden story trophy' : trophy.name);
    if (hidden) name.append(el('span', 'hidden-mark', ' — hidden until earned'));
    const desc = el('div', 'desc', hidden ? 'Turn spoilers off, or earn this trophy, to reveal its name and description.' : trophy.description);
    body.append(name, desc, metaRow(trophy));
    const stage = el('div', 'meta');
    stage.append(el('span', 'chip', `Roadmap step ${trophy.stage}`));
    item.append(box, body, stage);
    item.addEventListener('click', () => onSelect(trophy.id));
    list.append(item);
  }
}

export function renderDetail(state, onToggle) {
  const body = document.getElementById('detailBody');
  const empty = document.getElementById('detailEmpty');
  const trophy = state.trophies.find((item) => item.id === state.selectedId);
  if (!trophy) {
    body.hidden = true;
    empty.hidden = false;
    return;
  }
  empty.hidden = true;
  body.hidden = false;
  body.replaceChildren();
  const hidden = isHiddenBySpoiler(trophy, state.settings, state.earned);
  body.append(el('h2', null, hidden ? 'Hidden story trophy' : trophy.name));
  body.append(el('p', 'official', hidden ? 'Official name and description hidden by the spoiler setting.' : `“${trophy.description}”`));
  body.append(metaRow(trophy));
  if (trophy.missable) {
    const warn = el('div', 'warn-box');
    warn.append(el('strong', null, 'Possibly missable. '), document.createTextNode(trophy.missable_reason));
    body.append(warn);
  } else {
    const ok = el('div', 'ok-box');
    ok.append(el('strong', null, 'Not missable. '), document.createTextNode(trophy.missable_reason));
    body.append(ok);
  }
  body.append(el('h3', null, 'Guide'));
  body.append(el('p', 'guide', hidden ? 'Earn this trophy, or turn spoilers off, to read its guide.' : trophy.guide));
  body.append(el('h3', null, 'Sources'));
  const sources = el('ul');
  for (const key of trophy.sources) {
    const item = el('li');
    const link = document.createElement('a');
    link.href = state.sourceUrls[key];
    link.textContent = state.sourceLabels[key];
    link.target = '_blank';
    link.rel = 'noopener';
    item.append(link);
    sources.append(item);
  }
  body.append(sources);
  const button = el('button', 'mark-btn' + (state.earned.has(trophy.id) ? ' earned' : ''), state.earned.has(trophy.id) ? '✓ Earned — click to unmark' : 'Mark as earned');
  button.type = 'button';
  button.addEventListener('click', () => onToggle(trophy.id, !state.earned.has(trophy.id)));
  body.append(button);
}

export function renderRoadmap(state, onSelect) {
  document.getElementById('roadmapTitle').textContent = state.roadmap.title;
  document.getElementById('roadmapSummary').textContent = state.roadmap.summary;
  const holder = document.getElementById('roadmapStages');
  holder.replaceChildren();
  const byId = new Map(state.trophies.map((trophy) => [trophy.id, trophy]));
  for (const stage of state.roadmap.stages) {
    const card = el('section', 'stage');
    card.append(el('h3', null, stage.title));
    card.append(el('p', 'hours', stage.hours));
    card.append(el('p', null, stage.text));
    if (stage.warning) card.append(el('p', 'warn-line', stage.warning));
    const chips = el('div', 'trophy-chips');
    for (const id of stage.trophy_ids) {
      const trophy = byId.get(id);
      if (!trophy) continue;
      const chip = el(
        'button',
        'mini-chip' + (state.earned.has(id) ? ' earned' : '') + (trophy.missable ? ' missable' : ''),
        `${trophy.missable ? '⚠ ' : ''}${trophy.name}`,
      );
      chip.type = 'button';
      chip.addEventListener('click', () => onSelect(id));
      chips.append(chip);
    }
    card.append(chips);
    holder.append(card);
  }
}

export function renderMissables(state, onSelect) {
  const holder = document.getElementById('missableList');
  holder.replaceChildren();
  const flagged = state.trophies.filter((trophy) => trophy.missable);
  for (const trophy of flagged) {
    const card = el('section', 'stage');
    card.append(el('h3', null, `${trophy.name} — ${GRADE_LABELS[trophy.grade]}`));
    card.append(el('p', null, trophy.missable_reason));
    card.append(el('p', null, trophy.guide));
    const open = el('button', 'mini-chip', 'Open its guide');
    open.type = 'button';
    open.addEventListener('click', () => onSelect(trophy.id));
    card.append(open);
    holder.append(card);
  }
}
