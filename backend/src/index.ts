import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { productRouter } from './router/productRouter';
import { seedRouter } from './router/seedRouter';
import { userRouter } from './router/userRouter';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/ecommrcedb';

mongoose.set('strictQuery', true);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch(() => {
    console.log('Error with mongodb');
  });

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);
app.use('/api/seed', seedRouter);
app.use('/api/users', userRouter);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
