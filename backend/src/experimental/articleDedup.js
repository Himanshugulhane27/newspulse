const crypto = require('crypto');
function fingerprint(article) {
  const raw = `${(article.title || '').toLowerCase().trim()}::${(article.source?.name || '').toLowerCase().trim()}`;
  return crypto.createHash('md5').update(raw).digest('hex').substring(0, 12);
}
function deduplicateArticles(articles) {
  const seen = new Map();
  const unique = [];
  for (const a of articles) { const fp = fingerprint(a); if (!seen.has(fp)) { seen.set(fp, true); unique.push({ ...a, _fingerprint: fp }); } }
  const dupeCount = articles.length - unique.length;
  if (dupeCount > 0) console.log(`[Dedup] Removed ${dupeCount} dupes from ${articles.length}`);
  return unique;
}
module.exports = { fingerprint, deduplicateArticles };
