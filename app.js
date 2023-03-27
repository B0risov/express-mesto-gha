const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.disable('x-powered-by');
app.use(limiter);
app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64219a04f95a4f5049dc6239',
  };

  next();
});

app.use(userRoutes);
app.use(cardRoutes);

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  await app.listen(PORT);
  console.log(`Сервер запущен на ${PORT} порту`);
}

main();
