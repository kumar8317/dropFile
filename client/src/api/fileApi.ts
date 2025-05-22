import axios from 'axios';
import type { FileItem, FileUploadResponse, FilesListResponse } from '../types/file';

const API_URL = import.meta.env.API_URL || 'http://localhost:3000/api';

const fileApi = {
  getAllFiles: async (): Promise<FileItem[]> => {
    try {
      const response = await axios.get<FilesListResponse>(`${API_URL}/files`);
      if (response.data.success) {
        return response.data.files;
      } else {
        throw new Error(response.data.message || 'Failed to fetch files');
      }
    } catch (error) {
      console.error('Error fetching files:', error);
      throw error;
    }
  },

  uploadFile: async (file: File): Promise<FileItem | string> => {
    
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post<FileUploadResponse>(
        `${API_URL}/files/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response.data.error)
      return response.data.error ? response.data.error : response.data.file;
  },

  getDownloadUrl: (fileId: string): string => {
    return `${API_URL}/files/download/${fileId}`;
  },

  getViewUrl: (fileId: string): string => {
    return `${API_URL}/files/view/${fileId}`;
  },

  downloadFile: async (fileId: string, filename: string): Promise<void> => {
    try {
      const response = await axios.get(`${API_URL}/files/download/${fileId}`, {
        responseType: 'blob',
      });
      
      // Create a blob from the response data
      const blob = new Blob([response.data]);
      
      // Create a link element and trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      // Clean up the URL object
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error;
    }
  }
};

export default fileApi;