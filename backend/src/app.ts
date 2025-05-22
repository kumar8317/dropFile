import express from 'express';
import cors from 'cors';
import fileRoutes from './routes/file.routes';
import { errorHandler } from './middleware/errorHandler';
import { config } from 'dotenv';

config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/files', fileRoutes);
app.use('/uploads', express.static(process.env.UPLOAD_DIR || 'uploads'));
app.use(errorHandler);

export default app;
