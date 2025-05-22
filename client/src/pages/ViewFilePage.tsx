import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiDownload, FiAlertCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Button from '../components/ui/Button';
import fileApi from '../api/fileApi';
import type { FileItem } from '../types/file';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ViewFilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [file, setFile] = useState<FileItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFile = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const files = await fileApi.getAllFiles();
        const foundFile = files.find(f => f._id === id);
        
        if (foundFile) {
          setFile(foundFile);
        } else {
          setError('File not found');
        }
      } catch (error) {
        console.error('Error fetching file details:', error);
        setError('Failed to load file details');
        toast.error('Failed to load file details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFile();
  }, [id]);

  const handleDownload = async () => {
    if (!file) return;
    
    try {
      await fileApi.downloadFile(file._id, file.originalname);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Failed to download file');
    }
  };

  const renderFileContent = () => {
    if (!file) return null;

    const viewUrl = fileApi.getViewUrl(file._id);
    
    if (file.mimetype.startsWith('image/')) {
      return (
        <div className="flex justify-center">
          <img
            src={viewUrl}
            alt={file.originalname}
            className="max-w-full max-h-[70vh] object-contain"
          />
        </div>
      );
    }
    
    if (file.mimetype === 'application/pdf') {
      return (
        <div className="h-[70vh]">
          <iframe
            src={viewUrl}
            title={file.originalname}
            className="w-full h-full border-0"
          />
        </div>
      );
    }
    
    if (
      file.mimetype === 'text/plain' ||
      file.mimetype === 'application/json' ||
      file.mimetype === 'text/csv'
    ) {
      return (
        <div className="h-[70vh]">
          <iframe
            src={viewUrl}
            title={file.originalname}
            className="w-full h-full border bg-white p-4 rounded shadow"
          />
        </div>
      );
    }
    
    return (
      <div className="text-center py-12">
        <FiAlertCircle className="mx-auto h-12 w-12 text-yellow-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">
          Preview not available
        </h3>
        <p className="mt-1 text-gray-500">
          This file type cannot be previewed. Please download the file to view its contents.
        </p>
        <div className="mt-6">
          <Button variant="primary" onClick={handleDownload} leftIcon={<FiDownload />}>
            Download File
          </Button>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !file) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <FiAlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">{error || 'File not found'}</h3>
          <p className="mt-1 text-gray-500">
            The file you're looking for doesn't exist or has been removed.
          </p>
          <div className="mt-6">
            <Link to="/">
              <Button variant="primary">Back to Files</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link
              to="/"
              className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-semibold text-gray-900 truncate">{file.originalname}</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<FiDownload />}
            onClick={handleDownload}
          >
            Download
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {renderFileContent()}
        </div>
      </motion.div>
    </div>
  );
};

export default ViewFilePage;