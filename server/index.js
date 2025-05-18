import dotenv from 'dotenv';
import express from 'express';
import connectDB from './src/dbConnnection.js';
import authRoutes from './src/routes/authRoutes.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log('Request Body:', req.body);
  console.log('Content-Type:', req.headers['content-type']);
  next();
});

connectDB()
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
