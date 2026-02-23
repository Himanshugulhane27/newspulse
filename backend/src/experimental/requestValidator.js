// middleware to validate incoming requests
// simpler alternative to joi/express-validator for small routes
const validate = (schema) => (req, res, next) => {
  const errors = [];
  for (const [field, rules] of Object.entries(schema)) {
    const value = req.query[field] || req.body[field] || req.params[field];
    if (rules.required && (value === undefined || value === '')) {
      errors.push(`${field} is required`);
      continue;
    }
    if (value !== undefined) {
      if (rules.type === 'number' && isNaN(Number(value))) {
        errors.push(`${field} must be a number`);
      }
      if (rules.min !== undefined && Number(value) < rules.min) {
        errors.push(`${field} must be at least ${rules.min}`);
      }
      if (rules.max !== undefined && Number(value) > rules.max) {
        errors.push(`${field} must be at most ${rules.max}`);
      }
      if (rules.enum && !rules.enum.includes(value)) {
        errors.push(`${field} must be one of: ${rules.enum.join(', ')}`);
      }
    }
  }
  if (errors.length) return res.status(400).json({ errors });
  next();
};
module.exports = validate;
