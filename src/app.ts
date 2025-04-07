// src/app.ts
import express from 'express';
import dashboardRoutes from './routes/dashboardRoutes';
import authRoutes from './routes/authRoutes';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  }));
app.use(express.json());

app.use('/api/dashboard', dashboardRoutes);
app.use('/api/auth', authRoutes)


export default app;
