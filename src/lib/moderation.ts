
export const BAD_WORDS = [
  'זונה', 'שרמוטה', 'מניאק', 'אידיוט', 'מטומטם', 'חרא', 'זין', 'כוס', 'דפוק', 'fuck', 'shit', 'bitch', 'asshole', 'dick', 'cunt', 'nigger', 'pussy'
];

export function filterContent(text: string): { cleanText: string; hasBadWords: boolean } {
  let hasBadWords = false;
  let cleanText = text;

  BAD_WORDS.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi'); // Only match full words
    if (regex.test(cleanText)) {
      hasBadWords = true;
      cleanText = cleanText.replace(regex, '*'.repeat(word.length));
    }
  });

  // Also check for partial matches if strict filtering is needed, but for now sticking to word boundaries to avoid Scunthorpe problem
  // For Hebrew, boundaries might be tricky with prefixes/suffixes, so simple inclusion check might be better for some roots
  
  return { cleanText, hasBadWords };
}

export function validateContent(text: string): { isValid: boolean; error?: string } {
  if (!text || text.trim().length === 0) {
    return { isValid: false, error: 'התוכן לא יכול להיות ריק' };
  }
  
  const { hasBadWords } = filterContent(text);
  if (hasBadWords) {
    return { isValid: false, error: 'התוכן מכיל מילים לא ראויות' };
  }

  return { isValid: true };
}

