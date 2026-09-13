export interface ReadabilityMetrics {
  wordCount: number;
  sentenceCount: number;
  syllableCount: number;
  characterCount: number;
  readingTimeMin: number;
  speakingTimeMin: number;
  fleschReadingEase: number;
  fleschKincaidGrade: number;
  avgWordsPerSentence: number;
  avgSyllablesPerWord: number;
  complexWordsCount: number;
}

export interface ReadabilityEaseBand {
  label: string;
  target: string;
  gradeLevel: string;
}

/**
 * Counts the approximate number of syllables in an English word.
 * @param word - Word to evaluate.
 * @returns Number of syllables (minimum 1 for valid words).
 */
export function countWordSyllables(word: string): number {
  const clean = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!clean) return 0;
  if (clean.length <= 3) return 1;

  // Replace common silent suffixes
  const formatted = clean
    .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")
    .replace(/^y/, "");

  const matches = formatted.match(/[aeiouy]{1,2}/g);
  return matches ? Math.max(1, matches.length) : 1;
}

/**
 * Calculates estimated silent reading time in minutes based on average words per minute.
 * @param wordCount - Total number of words.
 * @param wordsPerMinute - Reading speed (default 200 wpm).
 */
export function calculateReadingTime(wordCount: number, wordsPerMinute = 200): number {
  if (wordCount <= 0) return 0;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Calculates estimated speaking time in minutes based on average spoken words per minute.
 * @param wordCount - Total number of words.
 * @param wordsPerMinute - Speaking speed (default 130 wpm).
 */
export function calculateSpeakingTime(wordCount: number, wordsPerMinute = 130): number {
  if (wordCount <= 0) return 0;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Analyzes full readability metrics for a given text, including Flesch Reading Ease and Flesch-Kincaid Grade Level.
 * @param text - The body of text to evaluate.
 */
export function calculateReadability(text: string): ReadabilityMetrics {
  const trimmed = (text || "").trim();
  if (!trimmed) {
    return {
      wordCount: 0,
      sentenceCount: 0,
      syllableCount: 0,
      characterCount: 0,
      readingTimeMin: 0,
      speakingTimeMin: 0,
      fleschReadingEase: 0,
      fleschKincaidGrade: 0,
      avgWordsPerSentence: 0,
      avgSyllablesPerWord: 0,
      complexWordsCount: 0,
    };
  }

  // Split words
  const words = trimmed.match(/[\w'-]+/g) || [];
  const wordCount = words.length;

  // Split sentences
  const sentences = trimmed
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const sentenceCount = Math.max(1, sentences.length);

  // Syllables
  let totalSyllables = 0;
  let complexWordsCount = 0;

  words.forEach((w) => {
    const syl = countWordSyllables(w);
    totalSyllables += syl;
    if (syl >= 3) complexWordsCount++;
  });

  const characterCount = trimmed.length;
  const avgWordsPerSentence = wordCount / sentenceCount;
  const avgSyllablesPerWord = wordCount > 0 ? totalSyllables / wordCount : 0;

  // Flesch Reading Ease formula: 206.835 - (1.015 * ASL) - (84.6 * ASW)
  let fleschReadingEase = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;
  fleschReadingEase = Math.max(0, Math.min(100, Math.round(fleschReadingEase * 10) / 10));

  // Flesch-Kincaid Grade Level formula: (0.39 * ASL) + (11.8 * ASW) - 15.59
  let fleschKincaidGrade = 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;
  fleschKincaidGrade = Math.max(0, Math.round(fleschKincaidGrade * 10) / 10);

  const readingTimeMin = calculateReadingTime(wordCount, 200);
  const speakingTimeMin = calculateSpeakingTime(wordCount, 130);

  return {
    wordCount,
    sentenceCount,
    syllableCount: totalSyllables,
    characterCount,
    readingTimeMin,
    speakingTimeMin,
    fleschReadingEase,
    fleschKincaidGrade,
    avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
    avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 10) / 10,
    complexWordsCount,
  };
}

/**
 * Returns Flesch Reading Ease score directly (0-100 scale).
 * @param text - Input text.
 */
export function getFleschReadingEase(text: string): number {
  return calculateReadability(text).fleschReadingEase;
}

/**
 * Returns Flesch-Kincaid Grade Level directly.
 * @param text - Input text.
 */
export function getFleschKincaidGrade(text: string): number {
  return calculateReadability(text).fleschKincaidGrade;
}

/**
 * Categorizes a Flesch Reading Ease score into an ease band with target descriptions.
 * @param score - Flesch Reading Ease score (0-100).
 */
export function getReadabilityEaseBand(score: number): ReadabilityEaseBand {
  if (score >= 90) return { label: "Very Easy", target: "5th Grade Level", gradeLevel: "5th Grade" };
  if (score >= 80) return { label: "Easy", target: "6th Grade Level", gradeLevel: "6th Grade" };
  if (score >= 70) return { label: "Fairly Easy", target: "7th Grade Level", gradeLevel: "7th Grade" };
  if (score >= 60) return { label: "Standard / Ideal SEO", target: "8th–9th Grade (Best for Web)", gradeLevel: "8th-9th Grade" };
  if (score >= 50) return { label: "Fairly Difficult", target: "10th–12th Grade (High School)", gradeLevel: "10th-12th Grade" };
  if (score >= 30) return { label: "Difficult", target: "College Level", gradeLevel: "College" };
  return { label: "Very Confusing", target: "Academic / Post-Graduate", gradeLevel: "Graduate" };
}
