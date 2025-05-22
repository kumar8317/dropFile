import React from 'react';
import { Link } from 'react-router-dom';
import { FiDownload, FiEye, FiFile, FiImage, FiFileText, FiFilePlus } from 'react-icons/fi';
import { type FileItem, formatFileSize, isViewableInBrowser } from '../types/file';
import fileApi from '../api/fileApi';
import LoadingSpinner from './ui/LoadingSpinner';

interface FileListProps {
  files: FileItem[];
  isLoading: boolean;
}

const FileList: React.FC<FileListProps> = ({ files, isLoading }) => {
  const handleDownload = async (file: FileItem) => {
    try {
      await fileApi.downloadFile(file._id, file.originalname);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const getFileIcon = (mimetype: string) => {
    if (mimetype.startsWith('image/')) {
      return <FiImage className="w-6 h-6 text-blue-500" />;
    } else if (mimetype === 'application/pdf') {
      return <FiFileText className="w-6 h-6 text-red-500" />;
    } else if (mimetype === 'text/plain' || mimetype === 'application/json' || mimetype === 'text/csv') {
      return <FiFileText className="w-6 h-6 text-green-500" />;
    } else {
      return <FiFile className="w-6 h-6 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <FiFilePlus className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No files</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by uploading a file.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {files.map((file) => (
          <li key={file._id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center min-w-0 flex-1">
                <div className="flex-shrink-0">{getFileIcon(file.mimetype)}</div>
                <div className="ml-4 truncate">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.originalname}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{formatFileSize(file.size)}</span>
                    <span className="mx-1">•</span>
                    <span>{formatDate(file.createdAt)}</span>
                  </div>
                </div>
              </div>
              <div className="ml-4 flex-shrink-0 flex space-x-2">
                {isViewableInBrowser(file.mimetype) && (
                  <Link
                    to={`/view/${file._id}`}
                    className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-gray-500 hover:bg-gray-600"
                    title="View"
                  >
                    <FiEye className="h-4 w-4" />
                  </Link>
                )}
                <button
                  onClick={() => handleDownload(file)}
                  className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-gray-500 hover:bg-gray-700 cursor-pointer"
                  title="Download"
                >
                  <FiDownload className="h-4 w-4" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;