/**
 * Format bytes to human-readable file size
 * @param bytes - Size in bytes
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted file size string (e.g., "1.5 MB")
 */
export const formatFileSize = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

/**
 * Get file extension from filename
 * @param filename - File name
 * @returns File extension (lowercase, without dot)
 */
export const getFileExtension = (filename: string): string => {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
};

/**
 * Get file type category from MIME type or extension
 * @param fileType - MIME type or file extension
 * @returns File category (image, video, audio, document, archive, other)
 */
export const getFileCategory = (fileType: string): string => {
  const type = fileType.toLowerCase();

  if (type.includes('image') || /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i.test(type)) {
    return 'image';
  }
  if (type.includes('video') || /\.(mp4|avi|mov|wmv|flv|webm)$/i.test(type)) {
    return 'video';
  }
  if (type.includes('audio') || /\.(mp3|wav|ogg|m4a|flac)$/i.test(type)) {
    return 'audio';
  }
  if (type.includes('pdf') || type.includes('document') || /\.(doc|docx|pdf|txt|rtf)$/i.test(type)) {
    return 'document';
  }
  if (type.includes('zip') || type.includes('rar') || /\.(zip|rar|7z|tar|gz)$/i.test(type)) {
    return 'archive';
  }

  return 'other';
};

/**
 * Validate file size against maximum allowed size
 * @param fileSize - File size in bytes
 * @param maxSize - Maximum allowed size in bytes (default: 100MB)
 * @returns Boolean indicating if file size is valid
 */
export const isValidFileSize = (fileSize: number, maxSize: number = 100 * 1024 * 1024): boolean => {
  return fileSize > 0 && fileSize <= maxSize;
};
