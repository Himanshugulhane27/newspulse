// super basic sentiment analysis - just keyword matching
// obv not real NLP but good enough for a prototype
const positiveWords = ['good', 'great', 'excellent', 'amazing', 'positive', 'growth', 'success', 'win', 'breakthrough', 'progress', 'improve', 'benefit'];
const negativeWords = ['bad', 'terrible', 'crisis', 'fail', 'loss', 'crash', 'decline', 'threat', 'danger', 'disaster', 'collapse', 'war'];

function analyzeSentiment(text) {
  if (!text) return { score: 0, label: 'neutral' };
  const words = text.toLowerCase().split(/\s+/);
  let score = 0;
  words.forEach(word => {
    if (positiveWords.includes(word)) score += 1;
    if (negativeWords.includes(word)) score -= 1;
  });
  const normalized = Math.max(-1, Math.min(1, score / Math.max(words.length * 0.1, 1)));
  let label = 'neutral';
  if (normalized > 0.2) label = 'positive';
  if (normalized < -0.2) label = 'negative';
  return { score: normalized, label };
}

// test
if (require.main === module) {
  console.log(analyzeSentiment('Great breakthrough in technology brings positive growth'));
  console.log(analyzeSentiment('Market crash threatens economic collapse'));
  console.log(analyzeSentiment('New policy announced today'));
}

module.exports = { analyzeSentiment };
