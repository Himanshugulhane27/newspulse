// validate required env vars on startup
// better than crashing randomly later
const requiredVars = [
  { name: 'NEWS_API_KEY', description: 'NewsAPI.org API key' },
  { name: 'MONGO_URI', description: 'MongoDB connection string' },
  { name: 'JWT_SECRET', description: 'JWT signing secret' },
];
const optionalVars = [
  { name: 'GOOGLE_CLIENT_ID', description: 'Google OAuth client ID' },
  { name: 'GOOGLE_CLIENT_SECRET', description: 'Google OAuth secret' },
  { name: 'NODE_ENV', description: 'Environment', default: 'development' },
  { name: 'PORT', description: 'Server port', default: '5000' },
];
function validateEnv() {
  const missing = [];
  const warnings = [];
  for (const v of requiredVars) {
    if (!process.env[v.name]) missing.push(`${v.name} - ${v.description}`);
  }
  for (const v of optionalVars) {
    if (!process.env[v.name]) warnings.push(`${v.name} not set, using default: ${v.default || 'none'}`);
  }
  if (missing.length) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(m => console.error(`   - ${m}`));
    process.exit(1);
  }
  if (warnings.length) {
    console.warn('⚠️  Optional env vars:');
    warnings.forEach(w => console.warn(`   - ${w}`));
  }
  console.log('✅ Environment validation passed');
}
module.exports = { validateEnv };
