// Progress and settings for the Leonida Legends tracker. Everything lives in this
// browser's localStorage; nothing is sent anywhere. Export writes a JSON file the
// reader can keep or move to another browser, and import reads one back.
export const PROGRESS_KEY = 'leonida-legends-progress-v1';
export const SETTINGS_KEY = 'leonida-legends-settings-v1';
export const APP_ID = 'leonida-legends-gta6-trophies';
export const EXPORT_VERSION = 1;

export function loadProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((id) => Number.isInteger(id)));
  } catch {
    return new Set();
  }
}

export function saveProgress(earned) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify([...earned].sort((a, b) => a - b)));
}

export function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { spoilers: true };
    const parsed = JSON.parse(raw);
    return { spoilers: parsed.spoilers !== false };
  } catch {
    return { spoilers: true };
  }
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify({ spoilers: settings.spoilers === true }));
}

export function buildExport(earned) {
  return JSON.stringify(
    {
      app: APP_ID,
      version: EXPORT_VERSION,
      exportedAt: new Date().toISOString(),
      earned: [...earned].sort((a, b) => a - b),
    },
    null,
    2,
  );
}

export function downloadExport(earned) {
  const blob = new Blob([buildExport(earned)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'gta6-trophy-progress.json';
  link.click();
  URL.revokeObjectURL(url);
}

// Reads an exported file's text and returns the earned set it names.
// Throws a plain Error with a readable message when the file is not ours.
export function parseImport(text, validIds) {
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('That file is not valid JSON.');
  }
  const ids = Array.isArray(parsed) ? parsed : parsed.earned;
  if (!Array.isArray(ids)) {
    throw new Error('That file holds no trophy list to import.');
  }
  const earned = new Set();
  for (const id of ids) {
    if (Number.isInteger(id) && validIds.has(id)) earned.add(id);
  }
  return earned;
}
