const MOODS = {
  ambient: {
    patterns: [/\bestres/, /\bcans/, /\brelaj/, /\bagotad/, /\bsaturad/],
    tags: ['chillout', 'relaxing', 'pop'],
    params: {},
  },
  angry: {
    patterns: [
      /\benojad/,
      /\bmolest/,
      /\birritad/,
      /\bfurios/,
      /\brabia/,
    ],
    tags: ['rock', 'electronic', 'pop'],
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
    tags: ['sad', 'melancholic', 'pop'],
    params: {},
  },
  happy: {
    patterns: [/\balegr/, /\bfeliz/, /\bemocionad/, /\binspirad/],
    tags: ['happy', 'pop', 'dance'],
    params: {},
  },
  romantic: {
    patterns: [/\benamorad/, /\benganchad/, /\bamarrad/, /\bamor\b/],
    tags: ['romantic', 'love', 'rnb'],
    params: {},
  },
  nostalgic: {
    patterns: [/\bnostalg/, /\brecuerdo/, /\bmemoria/, /\bfamilia/, /\bjuventud/, /\bpasado\b/],
    tags: ['nostalgic', 'retro', 'pop'],
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
