import React, { useState, useRef } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Button from './ui/Button';
import { SUPPORTED_FILE_TYPES } from '../types/file';
import fileApi from '../api/fileApi';

interface FileUploadProps {
  onUploadSuccess: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    if (!SUPPORTED_FILE_TYPES.includes(selectedFile.type)) {
      toast.error('File type not supported. Please upload a supported file type.');
      return;
    }
    
    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (selectedFile.size > maxSize) {
      toast.error('File size too large. Maximum file size is 10MB.');
      return;
    }
    
    setFile(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    
    try {
      const uploadResponse = await fileApi.uploadFile(file);
      if(typeof uploadResponse === 'string'){
        toast.error(`Failed to upload file:- ${uploadResponse}`);
      }
      else{
        toast.success('File uploaded successfully!');
        setFile(null);
        onUploadSuccess();
      }
    } catch (error:any) {
      toast.error(`Failed to upload file:- ${error.response.data.error}`);
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div 
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
          ${file ? 'bg-gray-50' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!file ? (
          <>
            <div className="text-center" onClick={triggerFileInput}>
              <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-900">
                  Drag and drop your file here, or{' '}
                  <span
                    className="text-blue-600 hover:text-blue-500 cursor-pointer font-semibold"
                    
                  >
                    browse
                  </span>
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Supported: JPG, PNG, JPEG, PDF, TXT, JSON (Max 10MB)
                </p>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept={SUPPORTED_FILE_TYPES.join(',')}
            />
          </>
        ) : (
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-md p-2 mr-3">
                  <FiUpload className="h-6 w-6 text-blue-500" />
                </div>
                <div className="truncate">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button
                type="button"
                className="text-gray-500 hover:text-red-500 transition"
                onClick={handleRemoveFile}
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <Button
                variant="secondary"
                fullWidth
                isLoading={isUploading}
                onClick={handleUpload}
              >
                Upload File
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>

  );
};

export default FileUpload;