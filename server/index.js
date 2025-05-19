import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './src/dbConnnection.js';
import authRoutes from './src/routes/authRoutes.js';
dotenv.config();
const app = express();

// Enable CORS for all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log('Request Body:', req.body);
  console.log('Content-Type:', req.headers['content-type']);
  next();
});

connectDB()
app.use('/api/auth', authRoutes);

// Listen on all network interfaces
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
