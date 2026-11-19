// Leonida Legends — boot and wiring. Loads the trophy list and the roadmap,
// restores saved progress and settings, and wires the tabs, filters, spoiler
// switch, detail pane, export and import. The page makes no network requests
// beyond its own files: the two JSON files under data/.
import { loadProgress, loadSettings, saveProgress, saveSettings, downloadExport, parseImport } from './store.js';
import { renderChecklist, renderDetail, renderMissables, renderProgress, renderRoadmap } from './views.js';

const state = {
  trophies: [],
  roadmap: null,
  sourceUrls: {},
  sourceLabels: {},
  earned: loadProgress(),
  settings: loadSettings(),
  filters: { grade: 'all', kind: 'all', status: 'all', query: '' },
  selectedId: null,
  view: 'checklist',
};

async function loadGuideData() {
  const [trophiesDoc, roadmapDoc] = await Promise.all([
    (await fetch('data/trophies.json')).json(),
    (await fetch('data/roadmap.json')).json(),
  ]);
  state.trophies = trophiesDoc.trophies;
  state.sourceUrls = trophiesDoc.source_urls;
  state.sourceLabels = trophiesDoc.source_labels;
  state.roadmap = roadmapDoc;
}

function renderAll() {
  renderProgress(state);
  renderChecklist(state, toggleEarned, selectTrophy);
  renderDetail(state, toggleEarned);
  renderRoadmap(state, selectTrophy);
  renderMissables(state, selectTrophy);
}

function toggleEarned(id, earned) {
  if (earned) state.earned.add(id);
  else state.earned.delete(id);
  saveProgress(state.earned);
  renderAll();
}

function selectTrophy(id) {
  state.selectedId = id;
  showView('checklist');
  renderAll();
  document.getElementById('detailPane').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showView(view) {
  state.view = view;
  for (const name of ['checklist', 'roadmap', 'missables']) {
    document.getElementById(`view${name[0].toUpperCase()}${name.slice(1)}`).hidden = name !== view;
    document.getElementById(`tab${name[0].toUpperCase()}${name.slice(1)}`).classList.toggle('active', name === view);
  }
}

function wireControls() {
  document.getElementById('search').addEventListener('input', (event) => {
    state.filters.query = event.target.value.trim();
    renderChecklist(state, toggleEarned, selectTrophy);
  });
  document.getElementById('gradeFilter').addEventListener('change', (event) => {
    state.filters.grade = event.target.value;
    renderChecklist(state, toggleEarned, selectTrophy);
  });
  document.getElementById('kindFilter').addEventListener('change', (event) => {
    state.filters.kind = event.target.value;
    renderChecklist(state, toggleEarned, selectTrophy);
  });
  document.getElementById('statusFilter').addEventListener('change', (event) => {
    state.filters.status = event.target.value;
    renderChecklist(state, toggleEarned, selectTrophy);
  });
  const spoilerToggle = document.getElementById('spoilerToggle');
  spoilerToggle.checked = state.settings.spoilers === true;
  spoilerToggle.addEventListener('change', () => {
    state.settings.spoilers = spoilerToggle.checked;
    saveSettings(state.settings);
    renderChecklist(state, toggleEarned, selectTrophy);
    renderDetail(state, toggleEarned);
  });
  for (const name of ['checklist', 'roadmap', 'missables']) {
    document.getElementById(`tab${name[0].toUpperCase()}${name.slice(1)}`).addEventListener('click', () => showView(name));
  }
  document.getElementById('exportBtn').addEventListener('click', () => downloadExport(state.earned));
  document.getElementById('importFile').addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const validIds = new Set(state.trophies.map((trophy) => trophy.id));
      state.earned = parseImport(text, validIds);
      saveProgress(state.earned);
      renderAll();
    } catch (error) {
      window.alert(`Could not import that file: ${error.message}`);
    }
    event.target.value = '';
  });
  document.getElementById('resetBtn').addEventListener('click', () => {
    if (!window.confirm('Clear all earned trophies? This cannot be undone (unless you exported first).')) return;
    state.earned = new Set();
    saveProgress(state.earned);
    renderAll();
  });
}

await loadGuideData();
wireControls();
renderAll();
