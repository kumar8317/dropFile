import express from 'express';
import { upload } from '../middleware/multer';
import { uploadFile, getAllFiles, downloadFile, viewFile } from '../controllers/file.controller';

const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);
router.get('/', getAllFiles);
router.get('/download/:id', downloadFile);
router.get('/view/:id', viewFile);

export default router;
