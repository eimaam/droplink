import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, Input, Logo } from '../components/ui';
import { message, Modal, QRCode } from 'antd';
import {
  Download,
  Copy,
  Lock,
  Eye,
  EyeOff,
  Clock,
  Share2,
  AlertCircle,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  Video,
  FileArchive,
  Music,
  File,
  Shield,
  Unlock,
  QrCode
} from 'lucide-react';
import { getDummyDrop } from '../data/dummyData';
import type { Drop as DropType } from '@shared/types/drop.types';
import EnhancedFilePreview from '../components/EnhancedFilePreview';


const PublicDropViewer = () => {
  const { dropId } = useParams<{ dropId: string }>();
  const navigate = useNavigate();
  
  const [drop, setDrop] = useState<DropType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [unlocking, setUnlocking] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [downloadStarted, setDownloadStarted] = useState<boolean>(false);
  const [showQRModal, setShowQRModal] = useState<boolean>(false);

  // Fetch drop data from dummy data
  useEffect(() => {
    if (!dropId) {
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const foundDrop = getDummyDrop(dropId);
      
      if (foundDrop) {
        setDrop(foundDrop);
        setIsLocked(foundDrop.isPasswordProtected);
      }
      
      setLoading(false);
    }, 500);
  }, [dropId]);

  // Live countdown timer
  useEffect(() => {
    if (!drop) return;

    const updateTimer = () => {
      const now = Date.now();
      const diff = drop.expiryTimestamp - now;

      if (diff <= 0) {
        setTimeRemaining('Expired');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (days > 0) {
        setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      } else if (minutes > 0) {
        setTimeRemaining(`${minutes}m ${seconds}s`);
      } else {
        setTimeRemaining(`${seconds}s`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [drop]);

  const handleUnlock = () => {
    setUnlocking(true);
    
    // Simulate password check
    setTimeout(() => {
      if (password === 'demo123') {
        setIsLocked(false);
        message.success('Drop unlocked! 🔓');
      } else {
        message.error('Invalid password. Please try again.');
      }
      setUnlocking(false);
    }, 1000);
  };

  const handleDownload = () => {
    setDownloadStarted(true);
    message.success('Download started! 📥');
    
    // Show conversion modal after download
    setTimeout(() => {
      message.info('Create your own secure drops! Sign up at DropLink');
    }, 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    message.success('Link copied to clipboard! 🔗');
  };

  const handleShare = () => {
    message.info('Share menu coming soon! 🚀');
  };

  const getFileIcon = (fileType?: string) => {
    if (!fileType) return File;
    if (fileType.startsWith('image/')) return ImageIcon;
    if (fileType.startsWith('video/')) return Video;
    if (fileType.startsWith('audio/')) return Music;
    if (fileType.includes('pdf')) return FileText;
    if (fileType.includes('zip') || fileType.includes('rar')) return FileArchive;
    return File;
  };

  const getUrgencyColor = () => {
    if (!drop) return 'text-success';
    const hoursRemaining = (drop.expiryTimestamp - Date.now()) / (1000 * 60 * 60);
    if (hoursRemaining < 1) return 'text-destructive';
    if (hoursRemaining < 24) return 'text-warning';
    return 'text-success';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-base flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-foreground/70">Loading drop...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !drop) {
    return (
      <div className="min-h-screen bg-background-base flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Drop Not Found</h1>
          <p className="text-foreground/60 mb-6">
            This drop may have expired or been deleted.
          </p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Create Your Own Drop
          </Button>
        </motion.div>
      </div>
    );
  }

  if (timeRemaining === 'Expired') {
    return (
      <div className="min-h-screen bg-background-base flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-warning/10 flex items-center justify-center">
            <Clock className="w-10 h-10 text-warning" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Drop Expired</h1>
          <p className="text-foreground/60 mb-6">
            This drop has expired and is no longer available for download.
          </p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Create Your Own Drop
          </Button>
        </motion.div>
      </div>
    );
  }

  // Password-protected view
  if (isLocked) {
    return (
      <div className="min-h-screen bg-background-base">
        {/* Header */}
        <header className="border-b border-border bg-surface/50 backdrop-blur-md sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Logo />
              <div className="flex items-center gap-2 text-xs text-foreground/60">
                <Shield className="w-3.5 h-3.5" />
                <span>Secured by DropLink</span>
              </div>
            </div>
          </div>
        </header>

        {/* Password Prompt */}
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            <Card variant="elevated" className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent-cyan/20 flex items-center justify-center">
                <Lock className="w-10 h-10 text-primary" />
              </div>
              
              <h1 className="text-2xl font-bold text-foreground mb-2">Password Protected</h1>
              <p className="text-foreground/60 mb-8">
                This drop requires a password to access
              </p>

              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
                    placeholder="Enter password"
                    className="pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-muted/50"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleUnlock}
                  icon={
                    unlocking ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />
                  }
                  disabled={!password || unlocking}
                >
                  {unlocking ? (
                    <>
                      Unlocking...
                    </>
                  ) : (
                    <>
                      Unlock Drop
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-xs text-foreground/50">
                  Don't have the password? Contact the person who shared this link.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  const FileIconComponent = getFileIcon(drop.fileType);

  // Main viewer
  return (
    <div className="min-h-screen bg-background-base">
      {/* Header */}
      <header className="border-b border-border bg-surface/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-xs text-foreground/60">
                <Shield className="w-3.5 h-3.5" />
                <span>Secured by DropLink</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                Create Your Own
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Preview Area */}
          <Card variant="elevated" className="mb-6 overflow-hidden">
            <div className="relative bg-gradient-to-br from-primary/10 via-transparent to-accent-cyan/10 p-8 md:p-12 min-h-[400px] flex items-center justify-center">
              <div className="absolute inset-0 bg-muted/20 backdrop-blur-sm" />
              
              <div className="relative text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent-cyan/20 flex items-center justify-center shadow-glow-primary">
                  <FileIconComponent className="w-12 h-12 md:w-16 md:h-16 text-primary" />
                </div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 break-all px-4"
                >
                  {drop.name}
                </motion.h1>
                
                {/* Uploader Info */}
                {drop.user?.username && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="flex items-center justify-center gap-2 mb-4"
                  >
                    {drop.user.avatar && (
                      <img 
                        src={drop.user.avatar} 
                        alt={drop.user.username}
                        className="w-6 h-6 rounded-full border-2 border-primary/20"
                      />
                    )}
                    <span className="text-sm text-foreground/70">
                      Shared by{' '}
                      <span className="font-semibold text-primary">
                        @{drop.user.username}
                      </span>
                    </span>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-center gap-3 text-sm text-foreground/60 mb-6"
                >
                  <span>{drop.size}</span>
                  <span>•</span>
                  <span>{drop.views} views</span>
                  <span>•</span>
                  <span>{drop.downloads} downloads</span>
                </motion.div>

                {/* Live Countdown */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/80 backdrop-blur-md border border-border"
                >
                  <Clock className={`w-4 h-4 ${getUrgencyColor()}`} />
                  <span className="text-sm font-medium text-foreground">
                    Expires in:{' '}
                    <span className={`font-bold ${getUrgencyColor()}`}>
                      {timeRemaining}
                    </span>
                  </span>
                </motion.div>
              </div>
            </div>
          </Card>

          {/* File Preview Section */}
          <Card variant="elevated" className="mb-8 overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                File Preview
              </h2>
              <EnhancedFilePreview 
                fileName={drop.name}
                fileType={drop.fileType || ''}
                fileSize={drop.size}
                previewUrl={drop.previewUrl}
                content={drop.content}
                onDownload={handleDownload}
              />
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleDownload}
              className="shadow-glow-primary"
            >
              <Download className="w-5 h-5 mr-2" />
              Download File
            </Button>
            
            <div className="grid grid-cols-3 gap-4">
              <Button variant="outline" size="lg" onClick={handleCopyLink}>
                <Copy className="w-5 h-5 mr-2" />
                Copy Link
              </Button>
              <Button variant="outline" size="lg" onClick={() => setShowQRModal(true)}>
                <QrCode className="w-5 h-5 mr-2" />
                QR Code
              </Button>
              <Button variant="outline" size="lg" onClick={handleShare}>
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 py-6">
            <div className="flex items-center gap-2 text-sm text-foreground/60">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <span>Encrypted Transfer</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/60">
              <Shield className="w-5 h-5 text-primary" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/60">
              <Clock className="w-5 h-5 text-accent-cyan" />
              <span>Auto-Expires</span>
            </div>
          </div>

          {/* CTA Footer */}
          <AnimatePresence>
            {downloadStarted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card variant="elevated" className="mt-8  from-primary/5 to-accent-cyan/5 border-primary/20">
                  <div className="text-center py-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      Create Your Own Secure Drops
                    </h3>
                    <p className="text-sm text-foreground/60 mb-4">
                      Share files that expire automatically. Free forever.
                    </p>
                    <Button variant="primary" size="lg" onClick={() => navigate('/auth')}>
                      Sign Up Free →
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-foreground/50">
            Powered by <span className="font-semibold text-primary">DropLink</span> • Secure file sharing that expires automatically
          </p>
        </div>
      </footer>

      {/* QR Code Modal */}
      <Modal
        open={showQRModal}
        onCancel={() => setShowQRModal(false)}
        footer={null}
        centered
        width={400}
      >
        <div className="text-center py-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-foreground mb-2">
              Scan QR Code
            </h3>
            <p className="text-sm text-foreground/60">
              Share this drop instantly on mobile devices
            </p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mb-6">
            <QRCode
              value={window.location.href}
              size={256}
              bgColor="#ffffff"
              fgColor="#1a1a2e"
              level="H"
              bordered={false}
              icon="/favicon.png"
              iconSize={50}
            />
          </div>

          {/* Drop Info */}
          {drop && (
            <div className="space-y-2 mb-6">
              <p className="text-sm font-medium text-foreground">{drop.name}</p>
              <p className="text-xs text-foreground/60">
                Expires in {timeRemaining}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              fullWidth
              onClick={() => {
                // Download QR Code as image
                const canvas = document.querySelector('canvas');
                if (canvas) {
                  const url = canvas.toDataURL();
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `droplink-qr-${dropId}.png`;
                  a.click();
                  message.success('QR Code downloaded!');
                }
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Download QR
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={() => setShowQRModal(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PublicDropViewer;
