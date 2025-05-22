import { Request, Response } from 'express';
import { File } from '../models/file.model';
import path from 'path';
import fs from 'fs';

export const uploadFile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'File upload failed' });
      return;
    }

    const file = new File(req.file);
    await file.save();
    res.status(201).json(file);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllFiles = async (_req: Request, res: Response): Promise<void> => {
  try {
    const files = await File.find().sort({ createdAt: -1 });
    res.json({
      success:true,
      files: files
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const downloadFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      res.status(404).json({ error: 'File not found' });
      return;
    }

    res.download(file.path, file.originalname);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const viewFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      res.status(404).json({ error: 'File not found' });
      return;
    }

    const ext = path.extname(file.originalname);
    const fileStream = fs.createReadStream(file.path);

    if (['.txt', '.json', '.pdf'].includes(ext)) {
      res.setHeader('Content-Type', file.mimetype);
      fileStream.pipe(res);
    } else if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      res.setHeader('Content-Type', file.mimetype);
      fileStream.pipe(res);
    } else {
      res.status(415).send('Unsupported format for viewing');
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
