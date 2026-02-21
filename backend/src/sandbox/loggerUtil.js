// simple colorized logger utility for development
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m'
};
const timestamp = () => new Date().toISOString().split('T')[1].split('.')[0];
const logger = {
  info: (msg, ...args) => console.log(`${colors.blue}[INFO]${colors.gray} ${timestamp()}${colors.reset} ${msg}`, ...args),
  warn: (msg, ...args) => console.log(`${colors.yellow}[WARN]${colors.gray} ${timestamp()}${colors.reset} ${msg}`, ...args),
  error: (msg, ...args) => console.log(`${colors.red}[ERROR]${colors.gray} ${timestamp()}${colors.reset} ${msg}`, ...args),
  success: (msg, ...args) => console.log(`${colors.green}[OK]${colors.gray} ${timestamp()}${colors.reset} ${msg}`, ...args),
  debug: (msg, ...args) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`${colors.gray}[DEBUG] ${timestamp()} ${msg}${colors.reset}`, ...args);
    }
  }
};
module.exports = logger;
