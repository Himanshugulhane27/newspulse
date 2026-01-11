const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  article: {
    title: {
      type: String,
      required: true
    },
    description: String,
    url: {
      type: String,
      required: true
    },
    urlToImage: String,
    publishedAt: {
      type: Date,
      required: true
    },
    source: {
      name: String,
      id: String
    },
    category: String,
    content: String
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate bookmarks
bookmarkSchema.index({ userId: 1, 'article.url': 1 }, { unique: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);