export interface FileItem {
  _id: string;
  originalname: string;
  filename: string;
  mimetype: string;
  size: number;
  path: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface FileUploadResponse {
  success?: boolean;
  file: FileItem;
  error?: string;
}

export interface FilesListResponse {
  success: boolean;
  files: FileItem[];
  message?: string;
}

export const SUPPORTED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/json',
  'text/plain',
  'text/csv',
  'application/pdf'
];

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const isViewableInBrowser = (mimetype: string): boolean => {
  const viewableTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'text/plain',
    'text/csv',
    'application/json'
  ];
  
  return viewableTypes.includes(mimetype);
};

export const getFileIcon = (mimetype: string): string => {
  if (mimetype.startsWith('image/')) return 'image';
  if (mimetype === 'application/pdf') return 'pdf';
  if (mimetype === 'text/plain') return 'text';
  if (mimetype === 'application/json') return 'code';
  if (mimetype === 'text/csv') return 'table';
  return 'file';
};