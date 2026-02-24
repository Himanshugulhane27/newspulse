// experimenting with more granular CORS setup
// the current one is basic - this would give more control
const corsOptions = {
  development: {
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400
  },
  production: {
    origin: (origin, callback) => {
      const allowedOrigins = [
        'https://newspulse.vercel.app',
        'https://www.newspulse.vercel.app'
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
};
const getCorsConfig = () => corsOptions[process.env.NODE_ENV] || corsOptions.development;
module.exports = { getCorsConfig, corsOptions };
