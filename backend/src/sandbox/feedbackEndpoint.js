const express = require('express');
const router = express.Router();
router.post('/feedback', (req, res) => {
  const { articleId, type, message } = req.body;
  if (!articleId || !type) return res.status(400).json({ success: false, error: 'articleId and type required' });
  const validTypes = ['broken_link', 'wrong_category', 'inappropriate', 'other'];
  if (!validTypes.includes(type)) return res.status(400).json({ success: false, error: `type must be one of: ${validTypes.join(', ')}` });
  console.log(`[Feedback] Article: ${articleId}, Type: ${type}`);
  res.json({ success: true, message: 'Feedback received', feedbackId: `fb_${Date.now()}` });
});
module.exports = router;
