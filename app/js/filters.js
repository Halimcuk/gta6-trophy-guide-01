// Pure filtering of the trophy list: grade, kind, status, search text, and the
// spoiler rule. Nothing here touches the DOM, so it is easy to test on its own.

// A story trophy stays hidden while the spoiler setting is on and it is not earned.
export function isHiddenBySpoiler(trophy, settings, earned) {
  return settings.spoilers === true && trophy.kind === 'story' && !earned.has(trophy.id);
}

export function trophyMatches(trophy, filters, earned, settings) {
  if (filters.grade !== 'all' && trophy.grade !== filters.grade) return false;
  if (filters.kind !== 'all' && trophy.kind !== filters.kind) return false;
  if (filters.status === 'earned' && !earned.has(trophy.id)) return false;
  if (filters.status === 'remaining' && earned.has(trophy.id)) return false;
  if (filters.status === 'missable' && trophy.missable !== true) return false;
  if (filters.query) {
    const q = filters.query.toLowerCase();
    const haystack = isHiddenBySpoiler(trophy, settings, earned)
      ? ''
      : `${trophy.name} ${trophy.description}`.toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  return true;
}

export function filterTrophies(trophies, filters, earned, settings) {
  return trophies.filter((trophy) => trophyMatches(trophy, filters, earned, settings));
}

export function countByGrade(trophies, earned) {
  const out = {};
  for (const trophy of trophies) {
    const bucket = out[trophy.grade] ?? { total: 0, earned: 0 };
    bucket.total += 1;
    if (earned.has(trophy.id)) bucket.earned += 1;
    out[trophy.grade] = bucket;
  }
  return out;
}
