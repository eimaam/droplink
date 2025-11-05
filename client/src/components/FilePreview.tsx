import { motion } from 'framer-motion';
import { Image } from 'antd';
import {
  FileText,
  Music,
  FileArchive,
  File as FileIcon,
  Download
} from 'lucide-react';

interface FilePreviewProps {
  fileName: string;
  fileType: string;
  fileSize: string;
  previewUrl?: string;
  content?: string;
  onDownload?: () => void;
}

const FilePreview = ({ fileName, fileType, fileSize, previewUrl, content, onDownload }: FilePreviewProps) => {
  const getFileCategory = () => {
    if (fileType.startsWith('image/')) return 'image';
    if (fileType.startsWith('video/')) return 'video';
    if (fileType.startsWith('audio/')) return 'audio';
    if (fileType.includes('pdf')) return 'pdf';
    if (fileType.includes('zip') || fileType.includes('rar') || fileType.includes('7z')) return 'archive';
    if (fileType.startsWith('text/')) return 'text';
    return 'other';
  };

  const category = getFileCategory();

  // Image Preview
  if (category === 'image' && previewUrl) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        <div className="rounded-xl border border-border overflow-hidden bg-muted/20">
          <Image
            src={previewUrl}
            alt={fileName}
            className="w-full h-auto max-h-[600px] object-contain"
            preview={{
              mask: (
                <div className="flex flex-col items-center gap-2">
                  <span className="text-lg">🔍</span>
                  <span className="text-sm">Click to preview</span>
                </div>
              ),
            }}
          />
        </div>

        {/* Image Info */}
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-foreground/60">{fileSize}</span>
          <span className="text-foreground/60">Click to view full size • Zoom • Rotate</span>
        </div>

        {onDownload && (
          <button
            onClick={onDownload}
            className="mt-4 w-full px-6 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/30 transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Download Image</span>
          </button>
        )}
      </motion.div>
    );
  }

  // Video Preview
  if (category === 'video' && previewUrl) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-xl border border-border bg-black"
      >
        <video
          src={previewUrl}
          controls
          className="w-full max-h-[600px]"
          poster="https://via.placeholder.com/800x600/1a1a2e/ec4899?text=Video"
        >
          Your browser does not support the video tag.
        </video>
        <div className="absolute bottom-4 right-4">
          <div className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-xs text-white">
            {fileSize}
          </div>
        </div>
      </motion.div>
    );
  }

  // Audio Preview
  if (category === 'audio' && previewUrl) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-xl border border-border bg-gradient-to-br from-primary/5 to-accent-cyan/5"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent-cyan/20 flex items-center justify-center">
            <Music className="w-10 h-10 text-primary" />
          </div>
        </div>
        <audio src={previewUrl} controls className="w-full" />
        <p className="text-center text-sm text-foreground/60 mt-4">{fileSize}</p>
      </motion.div>
    );
  }

  // PDF Preview
  if (category === 'pdf') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-12 rounded-xl border-2 border-dashed border-border bg-muted/10 text-center"
      >
        <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-destructive/20 to-warning/20 flex items-center justify-center">
          <FileText className="w-12 h-12 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">PDF Document</h3>
        <p className="text-sm text-foreground/60 mb-6">{fileSize}</p>
        <p className="text-xs text-foreground/50 mb-6">
          PDF preview will be available in the browser after download
        </p>
        {onDownload && (
          <button
            onClick={onDownload}
            className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-light transition-colors flex items-center gap-2 mx-auto"
          >
            <Download className="w-5 h-5 text-white" />
            <span className="text-sm font-medium text-white">Download PDF</span>
          </button>
        )}
      </motion.div>
    );
  }

  // Text Preview
  if (category === 'text' && content) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border bg-surface overflow-hidden"
      >
        <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Text Preview</span>
          <span className="text-xs text-foreground/60">{fileSize}</span>
        </div>
        <pre className="p-6 text-sm text-foreground overflow-x-auto max-h-[500px] overflow-y-auto">
          <code>{content}</code>
        </pre>
      </motion.div>
    );
  }

  // Archive Preview
  if (category === 'archive') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-12 rounded-xl border-2 border-dashed border-border bg-muted/10 text-center"
      >
        <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-warning/20 to-success/20 flex items-center justify-center">
          <FileArchive className="w-12 h-12 text-warning" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Archive File</h3>
        <p className="text-sm text-foreground/60 mb-6">{fileSize}</p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border text-sm text-foreground/70 mb-6">
          <FileArchive className="w-4 h-4" />
          <span>Contains multiple files</span>
        </div>
        {onDownload && (
          <button
            onClick={onDownload}
            className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-light transition-colors flex items-center gap-2 mx-auto mt-4"
          >
            <Download className="w-5 h-5 text-white" />
            <span className="text-sm font-medium text-white">Download Archive</span>
          </button>
        )}
      </motion.div>
    );
  }

  // Generic File Preview
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-12 rounded-xl border-2 border-dashed border-border bg-muted/10 text-center"
    >
      <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-foreground/10 to-foreground/5 flex items-center justify-center">
        <FileIcon className="w-12 h-12 text-foreground/50" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{fileName}</h3>
      <p className="text-sm text-foreground/60 mb-6">{fileSize}</p>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border text-xs text-foreground/70 mb-6">
        <span className="font-mono">{fileType}</span>
      </div>
      {onDownload && (
        <button
          onClick={onDownload}
          className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-light transition-colors flex items-center gap-2 mx-auto mt-4"
        >
          <Download className="w-5 h-5 text-white" />
          <span className="text-sm font-medium text-white">Download File</span>
        </button>
      )}
    </motion.div>
  );
};

export default FilePreview;
