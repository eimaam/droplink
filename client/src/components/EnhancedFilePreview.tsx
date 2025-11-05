import { useState } from 'react';
import { motion } from 'framer-motion';
import { Image, message, Tooltip } from 'antd';
// @ts-ignore - React Player types issue
import ReactPlayer from 'react-player';
import { Document, Page, pdfjs } from 'react-pdf';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import {
  FileText,
  Music,
  FileArchive,
  File as FileIcon,
  Download,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { Button } from './ui';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface FilePreviewProps {
  fileName: string;
  fileType: string;
  fileSize: string;
  previewUrl?: string;
  content?: string;
  onDownload?: () => void;
}

const FilePreview = ({ fileName, fileType, fileSize, previewUrl, content, onDownload }: FilePreviewProps) => {
  const [copied, setCopied] = useState(false);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pdfScale, setPdfScale] = useState<number>(1.0);

  const getFileCategory = () => {
    const type = fileType.toLowerCase();
    if (type.includes('image')) return 'image';
    if (type.includes('video')) return 'video';
    if (type.includes('audio')) return 'audio';
    if (type.includes('pdf')) return 'pdf';
    if (type.includes('zip') || type.includes('rar') || type.includes('7z')) return 'archive';
    if (type.includes('javascript') || type.includes('typescript') || type.includes('python') || 
        type.includes('json') || type.includes('markdown') || type.includes('text')) return 'code';
    return 'other';
  };

  const getLanguage = (type: string): string => {
    if (type.includes('javascript')) return 'javascript';
    if (type.includes('typescript')) return 'typescript';
    if (type.includes('python')) return 'python';
    if (type.includes('json')) return 'json';
    if (type.includes('markdown')) return 'markdown';
    if (type.includes('css')) return 'css';
    if (type.includes('html')) return 'html';
    if (type.includes('xml')) return 'xml';
    if (type.includes('yaml')) return 'yaml';
    if (type.includes('sql')) return 'sql';
    if (type.includes('csv')) return 'csv';
    return 'plaintext';
  };

  const handleCopyCode = async () => {
    if (content) {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      message.success('Code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const category = getFileCategory();

  // Image Preview - Ant Design Image with zoom
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
                  <ZoomIn className="w-6 h-6" />
                  <span className="text-sm">Click to preview</span>
                </div>
              ),
            }}
          />
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-foreground/60">{fileSize}</span>
          <span className="text-foreground/60">Click to view • Zoom • Rotate</span>
        </div>

        {onDownload && (
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={onDownload}
            className="mt-4"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Image
          </Button>
        )}
      </motion.div>
    );
  }

  // Video Preview - React Player
  if (category === 'video' && previewUrl) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-xl border border-border bg-black"
      >
        <div className="aspect-video">
          {/* @ts-ignore - React Player props */}
          <ReactPlayer
            url={previewUrl}
            controls
            width="100%"
            height="100%"
          />
        </div>
        
        <div className="absolute bottom-4 right-4">
          <div className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-xs text-white">
            {fileSize}
          </div>
        </div>

        {onDownload && (
          <div className="p-4 bg-surface border-t border-border">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={onDownload}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Video
            </Button>
          </div>
        )}
      </motion.div>
    );
  }

  // Audio Preview - React Player
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
        
        <h3 className="text-lg font-semibold text-foreground text-center mb-4">{fileName}</h3>
        
        <div className="bg-surface rounded-lg p-4 mb-4">
          {/* @ts-ignore - React Player props */}
          <ReactPlayer
            url={previewUrl}
            controls
            width="100%"
            height="50px"
          />
        </div>
        
        <p className="text-center text-sm text-foreground/60 mb-4">{fileSize}</p>
        
        {onDownload && (
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={onDownload}
          >
            <Download className="w-5 h-5 mr-2" />
            Download Audio
          </Button>
        )}
      </motion.div>
    );
  }

  // PDF Preview - react-pdf
  if (category === 'pdf' && previewUrl) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {/* PDF Controls */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-surface border border-border">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
              disabled={pageNumber <= 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <span className="text-sm font-medium">
              Page {pageNumber} of {numPages}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
              disabled={pageNumber >= numPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPdfScale(Math.max(0.5, pdfScale - 0.25))}
              disabled={pdfScale <= 0.5}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            
            <span className="text-sm font-medium">{Math.round(pdfScale * 100)}%</span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPdfScale(Math.min(2.0, pdfScale + 0.25))}
              disabled={pdfScale >= 2.0}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex justify-center p-6 rounded-xl bg-muted/30 border border-border overflow-auto max-h-[700px]">
          <Document
            file={previewUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center py-12">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            }
            error={
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-destructive mx-auto mb-4" />
                <p className="text-sm text-foreground/60">Failed to load PDF</p>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={pdfScale}
              renderTextLayer
              renderAnnotationLayer
            />
          </Document>
        </div>

        {/* PDF Info */}
        <div className="flex items-center justify-between text-sm text-foreground/60">
          <span>{fileSize}</span>
          <span>{fileName}</span>
        </div>

        {onDownload && (
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={onDownload}
          >
            <Download className="w-5 h-5 mr-2" />
            Download PDF
          </Button>
        )}
      </motion.div>
    );
  }

  // Code/Text Preview - react-syntax-highlighter
  if (category === 'code' && content) {
    const language = getLanguage(fileType);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border bg-surface overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">{fileName}</p>
              <p className="text-xs text-foreground/60">{fileSize} • {language}</p>
            </div>
          </div>

          <Tooltip title={copied ? 'Copied!' : 'Copy code'}>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyCode}
              className="gap-2"
              icon={
                copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />
              }
            >
              {copied ? (
                  <span className="text-sm">Copied</span>
              ) : (
                  <span className="text-sm">Copy All</span>
              )}
            </Button>
          </Tooltip>
        </div>

        {/* Code Content */}
        <div className="max-h-[600px] overflow-auto">
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            showLineNumbers
            wrapLines
            customStyle={{
              margin: 0,
              borderRadius: 0,
              fontSize: '14px',
              lineHeight: '1.6'
            }}
          >
            {content}
          </SyntaxHighlighter>
        </div>

        {onDownload && (
          <div className="p-4 border-t border-border bg-muted/30">
            <Button
              variant="outline"
              size="lg"
              fullWidth
              onClick={onDownload}
            >
              <Download className="w-5 h-5 mr-2" />
              Download File
            </Button>
          </div>
        )}
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
          <Button
            variant="primary"
            size="lg"
            onClick={onDownload}
            className="mt-4"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Archive
          </Button>
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
        <Button
          variant="primary"
          size="lg"
          onClick={onDownload}
          className="mt-4"
        >
          <Download className="w-5 h-5 mr-2" />
          Download File
        </Button>
      )}
    </motion.div>
  );
};

export default FilePreview;
