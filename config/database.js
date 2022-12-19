const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.set('strictQuery', false);

  await mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Database connected successful'))
    .catch((err) => console.log('Error conntecting mongodb', err));
};

module.exports = connectDB;
