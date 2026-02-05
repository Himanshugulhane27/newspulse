// rough category parser - trying to auto-categorize articles
// based on keywords in title/description

const categoryKeywords = {
  technology: ['ai', 'tech', 'software', 'startup', 'app', 'digital', 'cyber', 'robot', 'machine learning'],
  business: ['market', 'stock', 'economy', 'trade', 'finance', 'bank', 'invest', 'revenue', 'profit'],
  science: ['research', 'study', 'space', 'nasa', 'discovery', 'experiment', 'physics', 'biology'],
  health: ['health', 'medical', 'vaccine', 'hospital', 'disease', 'treatment', 'drug', 'mental'],
  sports: ['game', 'match', 'tournament', 'league', 'player', 'team', 'score', 'championship'],
  entertainment: ['movie', 'film', 'music', 'celebrity', 'show', 'album', 'concert', 'actor'],
  politics: ['election', 'government', 'policy', 'vote', 'congress', 'senate', 'president', 'law']
};

function guessCategory(title, description = '') {
  const text = `${title} ${description}`.toLowerCase();
  const scores = {};

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    scores[category] = keywords.reduce((score, kw) => {
      return score + (text.includes(kw) ? 1 : 0);
    }, 0);
  }

  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return best[1] > 0 ? best[0] : 'general';
}

// quick test
if (require.main === module) {
  console.log(guessCategory('AI startup raises funding in tech sector'));
  console.log(guessCategory('New vaccine shows promising results'));
  console.log(guessCategory('Team wins championship game'));
}

module.exports = { guessCategory };
