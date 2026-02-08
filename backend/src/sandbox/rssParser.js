// experiment: parse RSS feeds as alternative to NewsAPI
// might be useful as fallback when API quota runs out
const parseRSSItem = (item) => ({
  title: item.title || '',
  link: item.link || '',
  description: (item.description || '').replace(/<[^>]*>/g, '').substring(0, 200),
  pubDate: item.pubDate ? new Date(item.pubDate).toISOString() : null,
  source: item.source || 'RSS Feed'
});

// mock RSS parsing - not actually fetching feeds yet
const mockRSSData = [
  { title: 'Breaking: New tech regulations announced', link: 'https://example.com/1', description: '<p>The government has announced new regulations for tech companies.</p>', pubDate: 'Mon, 08 Feb 2026 10:00:00 GMT', source: 'Tech Daily' },
  { title: 'Sports league announces schedule changes', link: 'https://example.com/2', description: '<p>Major changes to the upcoming sports season.</p>', pubDate: 'Mon, 08 Feb 2026 09:30:00 GMT', source: 'Sports Weekly' }
];

function testParser() {
  const parsed = mockRSSData.map(parseRSSItem);
  console.log('Parsed RSS items:', JSON.stringify(parsed, null, 2));
}

if (require.main === module) testParser();
module.exports = { parseRSSItem };
