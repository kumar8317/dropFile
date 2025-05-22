import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  originalname: String,
  filename: String,
  mimetype: String,
  size: Number,
  path: String,
},
{
    timestamps: true
});

export const File = mongoose.model('File', fileSchema);
