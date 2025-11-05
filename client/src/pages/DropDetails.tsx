import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Card, Modal, Badge } from '../components/ui';
import { DashboardSidebar } from '../components/layout';
import { message } from 'antd';
import {
  FileText,
  Link as LinkIcon,
  Copy,
  Trash2,
  Download,
  Globe,
  Lock,
  Clock,
  Calendar,
  Eye,
  Share2,
  ArrowLeft,
  Image as ImageIcon,
  FileArchive,
  AlertCircle,
  CheckCircle2,
  QrCode
} from 'lucide-react';

interface Drop {
  id: string;
  name: string;
  type: 'file' | 'text';
  size: string;
  link: string;
  expiresIn: string;
  expiryDate: string;
  expiryTimestamp: number;
  visibility: 'public' | 'private';
  downloads: number;
  views: number;
  createdAt: string;
  status: 'active' | 'expiring' | 'expired';
  content?: string; // For text drops
}

const DropDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('drops');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');

  // Mock drop data - replace with API call
  const drop: Drop = {
    id: id || '1',
    name: 'presentation-deck.pdf',
    type: 'file',
    size: '2.4 MB',
    link: 'droplink.to/x7k9mN2p',
    expiresIn: '2 days',
    expiryDate: 'Nov 6, 2025',
    expiryTimestamp: Date.now() + (2 * 24 * 60 * 60 * 1000), // 2 days from now
    visibility: 'public',
    downloads: 12,
    views: 45,
    createdAt: 'Nov 2, 2025',
    status: 'active'
  };

  // Calculate time remaining and update every second
  useEffect(() => {
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
  }, [drop.expiryTimestamp]);

  const getFileIcon = (type: string, fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    
    if (type === 'text') return FileText;
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext || '')) return ImageIcon;
    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext || '')) return FileArchive;
    return FileText;
  };

  const FileIconComponent = getFileIcon(drop.type, drop.name);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${drop.link}`);
    message.success('Link copied to clipboard! 🔗');
  };

  const handleDownload = () => {
    message.success('Download started! 📥');
  };

  const handleDelete = () => {
    setDeleteModalOpen(false);
    message.success('Drop deleted successfully! 🗑️');
    navigate('/my-drops');
  };

  const getStatusBadge = (status: string) => {
    if (status === 'expired') return <Badge variant="error">Expired</Badge>;
    if (status === 'expiring') return <Badge variant="warning">Expiring Soon</Badge>;
    return <Badge variant="success">Active</Badge>;
  };

  return (
    <div className="min-h-screen bg-background-base">
      <DashboardSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="lg:ml-64 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/my-drops')}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to My Drops
              </Button>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Drop Details
                  </h1>
                  <p className="text-sm text-foreground/70">
                    View and manage this drop
                  </p>
                </div>
                {getStatusBadge(drop.status)}
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* File Preview Card */}
                <Card variant="elevated" className="overflow-hidden">
                  <div className="bg-gradient-to-br from-primary/10 via-transparent to-accent-cyan/10 p-8 md:p-12 text-center border-b border-border">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent-cyan/20 flex items-center justify-center shadow-glow-soft">
                      <FileIconComponent className="w-12 h-12 text-primary" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2 break-all">
                      {drop.name}
                    </h2>
                    <div className="flex items-center justify-center gap-4 text-sm text-foreground/60">
                      <span>{drop.size}</span>
                      <span>•</span>
                      <span className="capitalize">{drop.type}</span>
                    </div>
                  </div>

                  {/* Live Countdown Timer */}
                  <div className="p-6 bg-muted/20">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        <h3 className="text-sm font-semibold text-foreground">Time Remaining</h3>
                      </div>
                      {drop.status === 'active' && (
                        <span className="flex items-center gap-2 text-xs text-success">
                          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                          Live
                        </span>
                      )}
                    </div>
                    <div className="text-center py-4">
                      {drop.status === 'expired' ? (
                        <div className="flex items-center justify-center gap-2 text-destructive">
                          <AlertCircle className="w-5 h-5" />
                          <span className="text-2xl font-bold">Expired</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="text-4xl font-bold text-gradient">
                            {timeRemaining}
                          </div>
                          <p className="text-xs text-foreground/60">
                            Expires on {drop.expiryDate}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>

                {/* Metadata Card */}
                <Card variant="elevated">
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-4">
                      Drop Information
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Created Date */}
                      <div className="p-4 rounded-xl bg-muted/30 border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-foreground/60" />
                          <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">
                            Created
                          </p>
                        </div>
                        <span className="text-base font-bold text-foreground">
                          {drop.createdAt}
                        </span>
                      </div>

                      {/* Expiry Date */}
                      <div className="p-4 rounded-xl bg-muted/30 border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-foreground/60" />
                          <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">
                            Expires
                          </p>
                        </div>
                        <span className="text-base font-bold text-foreground">
                          {drop.expiryDate}
                        </span>
                      </div>

                      {/* Downloads */}
                      <div className="p-4 rounded-xl bg-muted/30 border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <Download className="w-4 h-4 text-foreground/60" />
                          <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">
                            Downloads
                          </p>
                        </div>
                        <span className="text-base font-bold text-foreground">
                          {drop.downloads}
                        </span>
                      </div>

                      {/* Views */}
                      <div className="p-4 rounded-xl bg-muted/30 border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <Eye className="w-4 h-4 text-foreground/60" />
                          <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">
                            Views
                          </p>
                        </div>
                        <span className="text-base font-bold text-foreground">
                          {drop.views}
                        </span>
                      </div>

                      {/* Visibility */}
                      <div className="p-4 rounded-xl bg-muted/30 border border-border sm:col-span-2">
                        <div className="flex items-center gap-2 mb-2">
                          {drop.visibility === 'public' ? (
                            <Globe className="w-4 h-4 text-success" />
                          ) : (
                            <Lock className="w-4 h-4 text-primary" />
                          )}
                          <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">
                            Visibility
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-foreground capitalize">
                            {drop.visibility}
                          </span>
                          {drop.visibility === 'public' && (
                            <CheckCircle2 className="w-4 h-4 text-success" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Link Card */}
                <Card variant="elevated">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-foreground">Share Link</h3>
                      <LinkIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex items-center gap-2 p-4 rounded-xl bg-muted/30 border border-border mb-4">
                      <code className="flex-1 text-sm text-foreground/80 font-mono truncate">
                        https://{drop.link}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyLink}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-foreground/60 text-center">
                      Share this link with anyone to give them access to your drop
                    </p>
                  </div>
                </Card>
              </div>

              {/* Sidebar Actions */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card variant="elevated">
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-4">
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <Button
                        variant="primary"
                        size="lg"
                        fullWidth
                        onClick={handleCopyLink}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Link
                      </Button>

                      {drop.status !== 'expired' && (
                        <Button
                          variant="outline"
                          size="lg"
                          fullWidth
                          onClick={handleDownload}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        size="lg"
                        fullWidth
                        onClick={() => message.info('QR Code feature coming soon! 📱')}
                      >
                        <QrCode className="w-4 h-4 mr-2" />
                        Show QR Code
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        fullWidth
                        onClick={() => message.info('Share menu coming soon! 🚀')}
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>

                      <div className="pt-3 border-t border-border">
                        <Button
                          variant="destructive"
                          size="lg"
                          fullWidth
                          onClick={() => setDeleteModalOpen(true)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Drop
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Stats Summary */}
                <Card variant="elevated" className="bg-gradient-to-br from-primary/5 to-accent-cyan/5">
                  <div className="p-6">
                    <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-4">
                      Summary
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground/70">Status</span>
                        {getStatusBadge(drop.status)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground/70">Engagement</span>
                        <span className="text-sm font-semibold text-foreground">
                          {drop.downloads + drop.views} total
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground/70">Type</span>
                        <span className="text-sm font-semibold text-foreground capitalize">
                          {drop.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <Modal
        open={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        title={
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Delete Drop?</h3>
              <p className="text-xs text-foreground/60 font-normal">This action cannot be undone</p>
            </div>
          </div>
        }
        footer={null}
        width={480}
      >
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
            <p className="text-sm text-foreground leading-relaxed">
              Are you sure you want to delete <strong className="font-semibold">"{drop.name}"</strong>? 
              The shared link will <strong className="font-semibold text-foreground">stop working immediately</strong> and 
              all associated data will be permanently removed.
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="lg" 
              fullWidth
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              size="lg" 
              fullWidth
              onClick={handleDelete}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Drop
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DropDetails;
