const stopWords = new Set(['the','a','an','and','or','but','in','on','at','to','for','of','with','by','from','is','are',
  'was','were','has','have','had','be','been','will','would','could','should','may','might','can','do','does','did',
  'not','no','so','if','than','too','very','just','about','after','before','new','says','said','report','according']);
function extractTopics(title) {
  if (!title) return [];
  const words = title.split(/\s+/);
  const topics = [];
  let current = [];
  for (const word of words) {
    const clean = word.replace(/[^a-zA-Z'-]/g, '');
    if (clean.length > 1 && clean[0] === clean[0].toUpperCase() && !stopWords.has(clean.toLowerCase())) {
      current.push(clean);
    } else {
      if (current.length > 0) { topics.push(current.join(' ')); current = []; }
    }
  }
  if (current.length > 0) topics.push(current.join(' '));
  return [...new Set(topics)].filter(t => t.length > 2);
}
if (require.main === module) {
  console.log(extractTopics('Apple Announces New iPhone at WWDC Event'));
  console.log(extractTopics('IPL 2026: Mumbai Indians Beat Chennai Super Kings'));
}
module.exports = { extractTopics };
