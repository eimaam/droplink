import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, Modal, Badge } from '../components/ui';
import { DashboardSidebar } from '../components/layout';
import { CreateDropModal } from '../components/modals';
import { message } from 'antd';
import {
  Upload,
  FileText,
  Link as LinkIcon,
  Copy,
  Folder,
  Trash2,
  Eye,
  Globe,
  Lock,
  Download,
  Pin,
  Clock,
  Search,
  Image,
  FileArchive,
  Grid3x3,
  List,
  X,
  CheckSquare,
  RefreshCw,
  Calendar
} from 'lucide-react';

interface Drop {
  id: string;
  name: string;
  type: 'file' | 'text';
  size: string;
  link: string;
  expiresIn: string;
  expiryDate: string;
  visibility: 'public' | 'private';
  downloads: number;
  createdAt: string;
  isPinned?: boolean;
  status: 'active' | 'expiring' | 'expired';
}

const MyDrops = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('drops');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedDrops, setSelectedDrops] = useState<string[]>([]);
  const [deleteDropId, setDeleteDropId] = useState<string | null>(null);
  const [bulkDeleteMode, setBulkDeleteMode] = useState(false);
  const [dropToView, setDropToView] = useState<Drop | null>(null);
  const [isCreateDropModalOpen, setIsCreateDropModalOpen] = useState(false);

  // Mock data./,.
  const allDrops: Drop[] = [
    {
      id: '1',
      name: 'presentation-deck.pdf',
      type: 'file',
      size: '2.4 MB',
      link: 'droplink.to/x7k9mN2p',
      expiresIn: '2 days',
      expiryDate: 'Nov 6, 2025',
      visibility: 'public',
      downloads: 12,
      createdAt: 'Nov 2, 2025',
      isPinned: true,
      status: 'active'
    },
    {
      id: '2',
      name: 'API Keys & Credentials',
      type: 'text',
      size: '420 bytes',
      link: 'droplink.to/a3x8kL5m',
      expiresIn: '6 days',
      expiryDate: 'Nov 10, 2025',
      visibility: 'private',
      downloads: 3,
      createdAt: 'Nov 1, 2025',
      isPinned: true,
      status: 'active'
    },
    {
      id: '3',
      name: 'team-photo.jpg',
      type: 'file',
      size: '1.8 MB',
      link: 'droplink.to/p2m9nR4t',
      expiresIn: '45 mins',
      expiryDate: 'Nov 4, 2025',
      visibility: 'public',
      downloads: 45,
      createdAt: 'Nov 4, 2025',
      status: 'expiring'
    },
    {
      id: '4',
      name: 'meeting-notes.txt',
      type: 'text',
      size: '2.1 KB',
      link: 'droplink.to/m8n2kP9x',
      expiresIn: '5 days',
      expiryDate: 'Nov 9, 2025',
      visibility: 'private',
      downloads: 8,
      createdAt: 'Oct 30, 2025',
      status: 'active'
    },
    {
      id: '5',
      name: 'design-mockups.zip',
      type: 'file',
      size: '5.7 MB',
      link: 'droplink.to/z3x9mN5k',
      expiresIn: '1 day',
      expiryDate: 'Nov 5, 2025',
      visibility: 'public',
      downloads: 23,
      createdAt: 'Nov 3, 2025',
      status: 'active'
    },
    {
      id: '6',
      name: 'contract-draft.pdf',
      type: 'file',
      size: '890 KB',
      link: 'droplink.to/a9k2pL3m',
      expiresIn: 'Expired',
      expiryDate: 'Nov 1, 2025',
      visibility: 'private',
      downloads: 5,
      createdAt: 'Oct 25, 2025',
      status: 'expired'
    },
    {
      id: '7',
      name: 'video-tutorial.mp4',
      type: 'file',
      size: '45.2 MB',
      link: 'droplink.to/v8n3mK2x',
      expiresIn: '10 days',
      expiryDate: 'Nov 14, 2025',
      visibility: 'public',
      downloads: 156,
      createdAt: 'Oct 28, 2025',
      status: 'active'
    },
    {
      id: '8',
      name: 'password-backup.txt',
      type: 'text',
      size: '1.2 KB',
      link: 'droplink.to/s5m9nP4k',
      expiresIn: '3 hours',
      expiryDate: 'Nov 4, 2025',
      visibility: 'private',
      downloads: 1,
      createdAt: 'Nov 4, 2025',
      status: 'expiring'
    }
  ];

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(`https://${link}`);
    message.success('Link copied to clipboard! 🔗');
  };

  const handleDeleteDrop = () => {
    setDeleteDropId(null);
    message.success('Drop deleted successfully! 🗑️');
  };

  const handleBulkDelete = () => {
    setSelectedDrops([]);
    setBulkDeleteMode(false);
    message.success(`${selectedDrops.length} drops deleted successfully! 🗑️`);
  };

  const toggleDropSelection = (dropId: string) => {
    setSelectedDrops(prev =>
      prev.includes(dropId)
        ? prev.filter(id => id !== dropId)
        : [...prev, dropId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedDrops.length === filteredDrops.length) {
      setSelectedDrops([]);
    } else {
      setSelectedDrops(filteredDrops.map(drop => drop.id));
    }
  };

  const handlePinDrop = (_dropId: string) => {
    message.success('Drop pinned! 📌');
  };

  const handleExtendExpiry = (_dropId: string) => {
    message.success('Expiry extended! ⏰');
  };

  // Filtering and sorting
  const filteredDrops = allDrops
    .filter(drop => {
      const matchesSearch = drop.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        filterBy === 'all' ||
        (filterBy === 'public' && drop.visibility === 'public') ||
        (filterBy === 'private' && drop.visibility === 'private') ||
        (filterBy === 'expiring' && drop.status === 'expiring') ||
        (filterBy === 'expired' && drop.status === 'expired') ||
        (filterBy === 'pinned' && drop.isPinned) ||
        (filterBy === 'files' && drop.type === 'file') ||
        (filterBy === 'text' && drop.type === 'text');
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        case 'downloads':
          return b.downloads - a.downloads;
        case 'size':
          return parseFloat(b.size) - parseFloat(a.size);
        default:
          return 0;
      }
    });

  const stats = {
    total: allDrops.length,
    active: allDrops.filter(d => d.status === 'active').length,
    expiring: allDrops.filter(d => d.status === 'expiring').length,
    expired: allDrops.filter(d => d.status === 'expired').length,
    totalDownloads: allDrops.reduce((sum, d) => sum + d.downloads, 0)
  };

  const getFileIcon = (drop: Drop) => {
    if (drop.name.endsWith('.pdf')) return FileText;
    if (drop.name.match(/\.(jpg|jpeg|png|gif)$/i)) return Image;
    if (drop.name.endsWith('.zip')) return FileArchive;
    if (drop.type === 'text') return FileText;
    return LinkIcon;
  };

  const getStatusBadge = (status: Drop['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'expiring':
        return <Badge variant="warning">Expiring Soon</Badge>;
      case 'expired':
        return <Badge variant="error">Expired</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background-base">
      <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 overflow-auto pb-20 md:pb-0 md:ml-64">
        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                    My Drops
                  </h1>
                  <p className="text-sm text-foreground/70">
                    Manage and track all your shared drops
                  </p>
                </div>
                <Button 
                  variant="primary" 
                  size="md"
                  onClick={() => setIsCreateDropModalOpen(true)}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  New Drop
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                <Card variant="default" hover>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground mb-1">{stats.total}</p>
                    <p className="text-xs text-foreground/60">Total Drops</p>
                  </div>
                </Card>
                <Card variant="default" hover>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success mb-1">{stats.active}</p>
                    <p className="text-xs text-foreground/60">Active</p>
                  </div>
                </Card>
                <Card variant="default" hover>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-warning mb-1">{stats.expiring}</p>
                    <p className="text-xs text-foreground/60">Expiring</p>
                  </div>
                </Card>
                <Card variant="default" hover>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-destructive mb-1">{stats.expired}</p>
                    <p className="text-xs text-foreground/60">Expired</p>
                  </div>
                </Card>
                <Card variant="default" hover>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary mb-1">{stats.totalDownloads}</p>
                    <p className="text-xs text-foreground/60">Downloads</p>
                  </div>
                </Card>
              </div>

              {/* Search, Filter, and Actions Bar */}
              <Card variant="default" padding="md" className="mb-6">
                <div className="flex flex-col lg:flex-row gap-3">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
                    <input
                      type="text"
                      placeholder="Search drops by name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 text-sm bg-background-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground placeholder:text-foreground/40"
                    />
                  </div>

                  {/* Filters */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <select
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value)}
                      className="px-3 py-2 text-sm bg-background-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground cursor-pointer"
                    >
                      <option value="all">All Drops</option>
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="expiring">Expiring Soon</option>
                      <option value="expired">Expired</option>
                      <option value="pinned">Pinned</option>
                      <option value="files">Files Only</option>
                      <option value="text">Text Only</option>
                    </select>

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 text-sm bg-background-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground cursor-pointer"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="name">Name (A-Z)</option>
                      <option value="downloads">Most Downloads</option>
                      <option value="size">Largest Size</option>
                    </select>

                    <div className="flex items-center border border-border rounded-lg overflow-hidden">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 transition-colors ${
                          viewMode === 'grid'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-background-base text-foreground/60 hover:text-foreground'
                        }`}
                      >
                        <Grid3x3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 transition-colors ${
                          viewMode === 'list'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-background-base text-foreground/60 hover:text-foreground'
                        }`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>

                    <Button
                      variant={bulkDeleteMode ? 'destructive' : 'outline'}
                      size="sm"
                      onClick={() => {
                        setBulkDeleteMode(!bulkDeleteMode);
                        setSelectedDrops([]);
                      }}
                    >
                      {bulkDeleteMode ? (
                        <>
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </>
                      ) : (
                        <>
                          <CheckSquare className="w-4 h-4 mr-2" />
                          Select
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Bulk Actions Bar */}
                <AnimatePresence>
                  {bulkDeleteMode && selectedDrops.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pt-3 border-t border-border"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-foreground">
                          {selectedDrops.length} drop{selectedDrops.length > 1 ? 's' : ''} selected
                        </p>
                        <div className="flex items-center gap-2">
                          <Button variant="destructive" size="sm" onClick={() => setBulkDeleteMode(true)}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Selected
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </div>

            {/* Drops Grid/List */}
            {filteredDrops.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDrops.map((drop, index) => {
                    const Icon = getFileIcon(drop);
                    return (
                      <motion.div
                        key={drop.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="relative"
                      >
                        {bulkDeleteMode && (
                          <button
                            onClick={() => toggleDropSelection(drop.id)}
                            className="absolute top-3 left-3 z-10 w-6 h-6 rounded-md bg-background-base border-2 border-border flex items-center justify-center hover:border-primary transition-colors"
                          >
                            {selectedDrops.includes(drop.id) && (
                              <CheckSquare className="w-4 h-4 text-primary" />
                            )}
                          </button>
                        )}
                        <Card
                          variant="default"
                          padding="none"
                          hover
                          className={`group h-full hover:shadow-glow-soft transition-all ${bulkDeleteMode && selectedDrops.includes(drop.id) ? 'ring-2 ring-primary' : ''}`}
                        >
                          <div className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center flex-shrink-0 shadow-glow-primary group-hover:shadow-glow-pink transition-shadow">
                                  <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-sm font-semibold text-foreground truncate mb-1">
                                    {drop.name}
                                  </h3>
                                  <p className="text-xs text-foreground/60">{drop.size}</p>
                                </div>
                              </div>
                              {drop.isPinned && (
                                <Pin className="w-4 h-4 text-primary flex-shrink-0" />
                              )}
                            </div>

                            <div className="mb-3">{getStatusBadge(drop.status)}</div>

                            <div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
                              <div className="flex items-center gap-1.5">
                                {drop.visibility === 'public' ? (
                                  <>
                                    <Globe className="w-3.5 h-3.5 text-success" />
                                    <span className="text-xs text-foreground/70">Public</span>
                                  </>
                                ) : (
                                  <>
                                    <Lock className="w-3.5 h-3.5 text-foreground/40" />
                                    <span className="text-xs text-foreground/70">Private</span>
                                  </>
                                )}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Download className="w-3.5 h-3.5 text-foreground/60" />
                                <span className="text-xs text-foreground/70">{drop.downloads}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-foreground/60" />
                                <span className="text-xs text-foreground/60">
                                  {drop.status === 'expired' ? 'Expired' : `Expires in ${drop.expiresIn}`}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button
                                variant="primary"
                                size="sm"
                                fullWidth
                                onClick={() => handleCopyLink(drop.link)}
                                disabled={drop.status === 'expired'}
                              >
                                <Copy className="w-3.5 h-3.5 mr-1.5" />
                                Copy Link
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="!p-2"
                                onClick={() => navigate(`/dashboard/drop/${drop.id}`)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="!p-2 hover:!text-destructive"
                                onClick={() => setDeleteDropId(drop.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <Card variant="default" padding="none">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-border bg-muted/30">
                        <tr>
                          {bulkDeleteMode && (
                            <th className="px-4 py-3">
                              <button
                                onClick={toggleSelectAll}
                                className="w-5 h-5 rounded border-2 border-border flex items-center justify-center hover:border-primary transition-colors"
                              >
                                {selectedDrops.length === filteredDrops.length && filteredDrops.length > 0 && (
                                  <CheckSquare className="w-4 h-4 text-primary" />
                                )}
                              </button>
                            </th>
                          )}
                          <th className="text-left text-xs font-semibold text-foreground/70 px-4 py-3">File</th>
                          <th className="text-left text-xs font-semibold text-foreground/70 px-4 py-3">Status</th>
                          <th className="text-left text-xs font-semibold text-foreground/70 px-4 py-3">Visibility</th>
                          <th className="text-left text-xs font-semibold text-foreground/70 px-4 py-3">Expires</th>
                          <th className="text-left text-xs font-semibold text-foreground/70 px-4 py-3">Size</th>
                          <th className="text-left text-xs font-semibold text-foreground/70 px-4 py-3">Downloads</th>
                          <th className="text-right text-xs font-semibold text-foreground/70 px-4 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDrops.map((drop, index) => {
                          const Icon = getFileIcon(drop);
                          return (
                            <motion.tr
                              key={drop.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05, duration: 0.3 }}
                              className={`border-b border-border hover:bg-muted/20 transition-colors ${
                                bulkDeleteMode && selectedDrops.includes(drop.id) ? 'bg-primary/5' : ''
                              }`}
                            >
                              {bulkDeleteMode && (
                                <td className="px-4 py-3">
                                  <button
                                    onClick={() => toggleDropSelection(drop.id)}
                                    className="w-5 h-5 rounded border-2 border-border flex items-center justify-center hover:border-primary transition-colors"
                                  >
                                    {selectedDrops.includes(drop.id) && (
                                      <CheckSquare className="w-4 h-4 text-primary" />
                                    )}
                                  </button>
                                </td>
                              )}
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-5 h-5 text-white" />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-foreground truncate max-w-[200px]">
                                      {drop.name}
                                    </span>
                                    {drop.isPinned && <Pin className="w-3.5 h-3.5 text-primary flex-shrink-0" />}
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3">{getStatusBadge(drop.status)}</td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-1.5">
                                  {drop.visibility === 'public' ? (
                                    <>
                                      <Globe className="w-3.5 h-3.5 text-success" />
                                      <span className="text-xs text-foreground/70">Public</span>
                                    </>
                                  ) : (
                                    <>
                                      <Lock className="w-3.5 h-3.5 text-foreground/40" />
                                      <span className="text-xs text-foreground/70">Private</span>
                                    </>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <span className="text-xs text-foreground/70">
                                  {drop.status === 'expired' ? 'Expired' : drop.expiresIn}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span className="text-xs text-foreground/70">{drop.size}</span>
                              </td>
                              <td className="px-4 py-3">
                                <span className="text-xs text-foreground/70">{drop.downloads}</span>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center justify-end gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="!p-2"
                                    onClick={() => handleCopyLink(drop.link)}
                                    disabled={drop.status === 'expired'}
                                  >
                                    <Copy className="w-3.5 h-3.5" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="!p-2"
                                    onClick={() => navigate(`/dashboard/drop/${drop.id}`)}
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="!p-2"
                                    onClick={() => handlePinDrop(drop.id)}
                                  >
                                    <Pin className="w-3.5 h-3.5" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="!p-2 hover:!text-destructive"
                                    onClick={() => setDeleteDropId(drop.id)}
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </Button>
                                </div>
                              </td>
                            </motion.tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )
            ) : (
              <Card variant="default" padding="sm">
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    {searchQuery || filterBy !== 'all' ? (
                      <Search className="w-10 h-10 text-foreground/40" />
                    ) : (
                      <Folder className="w-10 h-10 text-foreground/40" />
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {searchQuery || filterBy !== 'all' ? 'No drops found' : 'No drops yet'}
                  </h3>
                  <p className="text-sm text-foreground/60 mb-4">
                    {searchQuery || filterBy !== 'all'
                      ? 'Try adjusting your search or filters'
                      : 'Create your first drop to get started'}
                  </p>
                  {searchQuery || filterBy !== 'all' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchQuery('');
                        setFilterBy('all');
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Clear Filters
                    </Button>
                  ) : (
                    <Button variant="primary" size="md">
                      <Upload className="w-4 h-4 mr-2" />
                      Create Drop
                    </Button>
                  )}
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </main>

      {/* Delete Modal */}
      <Modal
        open={!!deleteDropId}
        onCancel={() => setDeleteDropId(null)}
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
              Are you sure you want to delete this drop? The shared link will <strong className="font-semibold text-foreground">stop working immediately</strong> and all associated data will be permanently removed.
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" size="lg" fullWidth onClick={() => setDeleteDropId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" size="lg" fullWidth onClick={handleDeleteDrop}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Drop
            </Button>
          </div>
        </div>
      </Modal>

      {/* Drop Details Modal */}
      <Modal
        open={!!dropToView}
        onCancel={() => setDropToView(null)}
        title={
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center shadow-glow-primary">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Drop Details</h3>
              <p className="text-xs text-foreground/60 font-normal">View and manage drop information</p>
            </div>
          </div>
        }
        footer={null}
        width={650}
      >
        {dropToView && (
          <div className="space-y-6">
            {/* Drop Preview Card */}
            <div className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 border border-border">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center flex-shrink-0 shadow-glow-primary">
                {(() => {
                  const Icon = getFileIcon(dropToView);
                  return <Icon className="w-8 h-8 text-white" />;
                })()}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-foreground mb-1 truncate">{dropToView.name}</h3>
                <p className="text-sm text-foreground/60">{dropToView.size}</p>
              </div>
              {getStatusBadge(dropToView.status)}
            </div>

            {/* Link Section */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">Share Link</label>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-background-base border border-border">
                <LinkIcon className="w-4 h-4 text-foreground/40 flex-shrink-0" />
                <code className="flex-1 text-sm text-foreground font-mono truncate">{dropToView.link}</code>
                <Button variant="outline" size="sm" className="!p-2" onClick={() => handleCopyLink(dropToView.link)}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-success/5 border border-success/20">
                <div className="flex items-center gap-2 mb-2">
                  {dropToView.visibility === 'public' ? (
                    <Globe className="w-4 h-4 text-success" />
                  ) : (
                    <Lock className="w-4 h-4 text-foreground/60" />
                  )}
                  <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">Visibility</p>
                </div>
                <span className="text-base font-bold text-foreground">
                  {dropToView.visibility === 'public' ? 'Public' : 'Private'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Download className="w-4 h-4 text-primary" />
                  <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">Downloads</p>
                </div>
                <span className="text-base font-bold text-foreground">{dropToView.downloads}</span>
              </div>

              <div className="p-4 rounded-xl bg-muted/30 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-foreground/60" />
                  <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">Created</p>
                </div>
                <span className="text-base font-bold text-foreground">{dropToView.createdAt}</span>
              </div>

              <div className="p-4 rounded-xl bg-muted/30 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-foreground/60" />
                  <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">Expires</p>
                </div>
                <span className="text-base font-bold text-foreground">{dropToView.expiryDate}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button variant="outline" size="lg" fullWidth onClick={() => handlePinDrop(dropToView.id)}>
                <Pin className="w-4 h-4 mr-2" />
                {dropToView.isPinned ? 'Unpin' : 'Pin'}
              </Button>
              {dropToView.status !== 'expired' && (
                <Button variant="outline" size="lg" fullWidth onClick={() => handleExtendExpiry(dropToView.id)}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Extend
                </Button>
              )}
              <Button
                variant="destructive"
                size="lg"
                fullWidth
                onClick={() => {
                  setDropToView(null);
                  setDeleteDropId(dropToView.id);
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Create Drop Modal */}
      <CreateDropModal
        open={isCreateDropModalOpen}
        onCancel={() => setIsCreateDropModalOpen(false)}
      />
    </div>
  );
};

export default MyDrops;
