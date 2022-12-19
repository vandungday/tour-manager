const app = require('./app');
const dotenv = require('dotenv');
const database = require('./config/database');
dotenv.config();
database();

const post = process.env.PORT || 3000;
const server = app.listen(post, () => {
  console.log(`Server running at http://localhost:${post}`);
});
