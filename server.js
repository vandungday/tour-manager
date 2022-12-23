const app = require('./app');
const dotenv = require('dotenv');
const database = require('./config/database');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION!  Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config();
database();

const post = process.env.PORT || 3000;
const server = app.listen(post, () => {
  console.log(`Server running at http://localhost:${post}`);
});

process.on('unhandledError', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection ... Shuts down');
  server.close(() => {
    process.exit(1);
  });
});
