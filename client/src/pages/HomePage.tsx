import React, { useState, useEffect } from 'react';
import { FiUploadCloud, FiRefreshCw } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Button from '../components/ui/Button';
import FileUpload from '../components/FileUpload';
import FileList from '../components/FileList';
import fileApi from '../api/fileApi';
import type { FileItem } from '../types/file';

const HomePage: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const fetchFiles = async () => {
    try {
      setIsLoading(true);
      const filesData = await fileApi.getAllFiles();
      setFiles(filesData);
    } catch (error) {
      toast.error('Failed to fetch files');
      console.error('Error fetching files:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleRefresh = () => {
    fetchFiles();
  };

  const handleCloseModal = () => {
    setShowUploadModal(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-6"
      >
        <motion.div variants={itemVariants} className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Your Files</h1>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<FiRefreshCw />}
              onClick={handleRefresh}
            >
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<FiUploadCloud />}
              onClick={() => setShowUploadModal(true)}
            >
              Upload
            </Button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <FileList files={files} isLoading={isLoading} />
        </motion.div>
      </motion.div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={handleCloseModal}
          ></div>

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white rounded-lg shadow-xl max-w-lg w-full max-h-96 overflow-hidden z-10"
          >
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Upload File</h3>
              </div>
              
              <div className="mb-6">
                <FileUpload
                  onUploadSuccess={() => {
                    fetchFiles();
                    handleCloseModal();
                  }}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  variant="secondary"
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default HomePage;