// format raw API responses into cleaner structure
// normalize differences between NewsAPI, RSS, etc.
const formatArticle = (raw, source = 'newsapi') => {
  if (source === 'newsapi') {
    return {
      id: generateId(raw.title),
      title: raw.title || 'Untitled',
      description: raw.description || '',
      content: raw.content?.replace(/\[\+\d+ chars\]/, '') || '',
      author: raw.author || 'Unknown',
      source: raw.source?.name || 'Unknown',
      sourceId: raw.source?.id || null,
      url: raw.url,
      imageUrl: raw.urlToImage,
      publishedAt: raw.publishedAt,
      fetchedAt: new Date().toISOString()
    };
  }
  // rss format
  return {
    id: generateId(raw.title),
    title: raw.title || 'Untitled',
    description: stripHtml(raw.description || ''),
    content: '',
    author: raw.creator || 'Unknown',
    source: raw.source || 'RSS',
    sourceId: null,
    url: raw.link,
    imageUrl: raw.enclosure?.url || null,
    publishedAt: raw.pubDate,
    fetchedAt: new Date().toISOString()
  };
};

function generateId(title) {
  return (title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 60);
}

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '').trim();
}

module.exports = { formatArticle, generateId, stripHtml };
