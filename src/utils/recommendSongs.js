const MOODS = {
  ambient: {
    patterns: [/\bestres/, /\bcans/, /\brelaj/, /\bagotad/, /\bsaturad/],
    tags: ['pop', 'acoustic', 'rnb'],
    params: {},
  },
  sad: {
    patterns: [
      /\btrist/,
      /\bpensativ/,
      /\bsolitari/,
      /\bpreocupad/,
      /\bmal\b/,
      /\bfrustrad/,
      /\benferm/,
      /\bdeprim/,
    ],
    tags: ['pop', 'rnb', 'rock'],
    params: {},
  },
  happy: {
    patterns: [/\balegr/, /\bfeliz/, /\bemocionad/, /\binspirad/],
    tags: ['pop', 'dance', 'electronic'],
    params: {},
  },
  romantic: {
    patterns: [/\benamorad/, /\benganchad/, /\bamarrad/, /\bamor\b/],
    tags: ['pop', 'rnb', 'soul'],
    params: {},
  },
  nostalgic: {
    patterns: [/\bnostalg/, /\brecuerdo/, /\bmemoria/, /\bfamilia/, /\bjuventud/, /\bpasado\b/],
    tags: ['pop', 'rock', 'rnb'],
    params: {},
  },
}

export const detectMusicTag = (text) => {
 // normaliced
  const descripcion = text.
    toLowerCase().
    normalize("NFD").
    replace(/[\u0300-\u036f]/g, '');

  for (const [mood, config] of Object.entries(MOODS)) {
    const matches = config.patterns.some((pattern) => pattern.test(descripcion))
    if (matches) {
      return {
        mood,
        tags: config.tags,
        params: config.params
      }
    }
  }
  return null
}
