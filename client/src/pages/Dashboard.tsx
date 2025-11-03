import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, Modal } from '../components/ui';
import { DashboardSidebar } from '../components/layout';
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
  HardDrive,
  Download,
  TrendingUp,
  Pin,
  ArrowUpCircle,
  Clock,
  Search,
  MoreVertical,
  Image,
  FileArchive,
  Grid3x3,
  List,
  X
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isNewDropModalOpen, setIsNewDropModalOpen] = useState(false);
  const [deleteDropId, setDeleteDropId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const user = {
    name: 'Imam',
    email: 'hello@eimaam.dev',
    avatar: ''
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(`https://${link}`);
    message.success('Link copied to clipboard! 🔗');
  };

  const handleDeleteDrop = () => {
    setDeleteDropId(null);
    message.success('Drop deleted successfully! 🗑️');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleFileUpload = (files: File[]) => {
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      message.success(`${files.length} file(s) uploaded successfully! 🎉`);
    }, 2000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const quickStats = [
    { label: 'Total Drops', value: '12', icon: Folder, color: 'text-primary' },
    { label: 'Downloads', value: '347', icon: Download, color: 'text-success' },
    { label: 'Storage', value: '12.4 MB', subtext: '/ 5 GB', icon: HardDrive, color: 'text-foreground/70' },
    { label: 'Active', value: '5', icon: TrendingUp, color: 'text-accent-cyan' }
  ];

  const pinnedDrops = [
    {
      id: 'p1',
      name: 'Important-Contract.pdf',
      link: 'droplink.to/abc123',
      expiresIn: '5 days'
    },
    {
      id: 'p2',
      name: 'Credentials.txt',
      link: 'droplink.to/xyz789',
      expiresIn: '3 days'
    }
  ];

  const recentDrops = [
    {
      id: '1',
      name: 'presentation-deck.pdf',
      type: 'file',
      size: '2.4 MB',
      link: 'droplink.to/x7k9mN2p',
      expiresIn: '2 days',
      expiryDate: 'Nov 5, 2025',
      visibility: 'public',
      downloads: 12
    },
    {
      id: '2',
      name: 'API Keys & Credentials',
      type: 'text',
      size: '420 bytes',
      link: 'droplink.to/a3x8kL5m',
      expiresIn: '6 days',
      expiryDate: 'Nov 9, 2025',
      visibility: 'private',
      downloads: 3
    },
    {
      id: '3',
      name: 'team-photo.jpg',
      type: 'file',
      size: '1.8 MB',
      link: 'droplink.to/p2m9nR4t',
      expiresIn: '45 mins',
      expiryDate: 'Nov 3, 2025',
      visibility: 'public',
      downloads: 45
    },
    {
      id: '4',
      name: 'meeting-notes.txt',
      type: 'text',
      size: '2.1 KB',
      link: 'droplink.to/m8n2kP9x',
      expiresIn: '5 days',
      expiryDate: 'Nov 8, 2025',
      visibility: 'private',
      downloads: 8
    },
    {
      id: '5',
      name: 'design-mockups.zip',
      type: 'file',
      size: '5.7 MB',
      link: 'droplink.to/z3x9mN5k',
      expiresIn: '1 day',
      expiryDate: 'Nov 4, 2025',
      visibility: 'public',
      downloads: 23
    }
  ];

  const filteredDrops = recentDrops.filter(drop => {
    const matchesSearch = drop.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterBy === 'all' || 
      (filterBy === 'public' && drop.visibility === 'public') ||
      (filterBy === 'private' && drop.visibility === 'private') ||
      (filterBy === 'expiring' && (drop.expiresIn.includes('hour') || drop.expiresIn.includes('min')));
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background-base flex">
      <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 overflow-auto pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="mb-6">
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  Hey, {user.name} 👋
                </h1>
                <p className="text-sm text-foreground/70">
                  Drop files. Share instantly. Expire automatically.
                </p>
              </div>

              {/* Quick Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {quickStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Card variant="default" hover className="h-full">
                      <div className="flex items-center gap-3">
                        <stat.icon className={`w-5 h-5 ${stat.color} flex-shrink-0`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-foreground/50 mb-0.5">{stat.label}</p>
                          <p className="text-lg font-bold text-foreground">
                            {stat.value}
                            {stat.subtext && <span className="text-xs font-normal text-foreground/40 ml-1">{stat.subtext}</span>}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Hero Upload Zone */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-8"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
                    isDragging
                      ? 'border-primary bg-primary/5 scale-[1.02]'
                      : 'border-border hover:border-primary/50 hover:bg-muted/20'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-cyan/5" />
                  <div className="relative p-8 md:p-12 text-center">
                    <AnimatePresence mode="wait">
                      {isUploading ? (
                        <motion.div
                          key="uploading"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex flex-col items-center"
                        >
                          <div className="w-16 h-16 mb-4 relative">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-full h-full rounded-full border-4 border-primary/20 border-t-primary"
                            />
                          </div>
                          <p className="text-lg font-semibold text-foreground mb-2">Uploading...</p>
                          <p className="text-sm text-foreground/60">Creating your drop</p>
                        </motion.div>
                      ) : isDragging ? (
                        <motion.div
                          key="dragging"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="flex flex-col items-center"
                        >
                          <div className="w-20 h-20 mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                            <ArrowUpCircle className="w-10 h-10 text-primary" />
                          </div>
                          <p className="text-lg font-semibold text-foreground mb-2">Drop it here!</p>
                          <p className="text-sm text-foreground/60">Release to upload your files</p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="idle"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex flex-col items-center"
                        >
                          <div className="w-20 h-20 mb-4 rounded-full bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center">
                            <Upload className="w-10 h-10 text-white" />
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                            Drop files to share instantly
                          </h3>
                          <p className="text-sm md:text-base text-foreground/70 mb-6 max-w-md">
                            Drag & drop files here or click to browse. Max 50MB per file.
                          </p>
                          <div className="flex flex-wrap items-center justify-center gap-3">
                            <Button variant="primary" size="lg" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                              <Upload className="w-5 h-5 mr-2" />
                              Choose Files
                            </Button>
                            <Button variant="outline" size="lg" onClick={(e) => { e.stopPropagation(); setIsNewDropModalOpen(true); }}>
                              <FileText className="w-5 h-5 mr-2" />
                              Share Text
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* Quick Access: Pinned Drops */}
              {pinnedDrops.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mb-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Pin className="w-4 h-4 text-primary" />
                      <h3 className="text-sm font-semibold text-foreground">Pinned</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {pinnedDrops.map((drop) => (
                      <Card key={drop.id} variant="default" hover className="group">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Pin className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{drop.name}</p>
                              <p className="text-xs text-foreground/60">Expires in {drop.expiresIn}</p>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="!p-2 opacity-0 group-hover:opacity-100 transition-opacity" 
                            onClick={() => handleCopyLink(drop.link)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* My Drops Section with Search & Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="mb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <h2 className="text-xl font-bold text-foreground">
                    My Drops
                  </h2>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
                      <input
                        type="text"
                        placeholder="Search drops..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground placeholder:text-foreground/40"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={filterBy}
                        onChange={(e) => setFilterBy(e.target.value)}
                        className="px-3 py-2 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground cursor-pointer"
                      >
                        <option value="all">All</option>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="expiring">Expiring Soon</option>
                      </select>
                      <div className="flex items-center border border-border rounded-lg overflow-hidden">
                        <button
                          onClick={() => setViewMode('grid')}
                          className={`p-2 transition-colors ${
                            viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-surface text-foreground/60 hover:text-foreground'
                          }`}
                        >
                          <Grid3x3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setViewMode('list')}
                          className={`p-2 transition-colors ${
                            viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-surface text-foreground/60 hover:text-foreground'
                          }`}
                        >
                          <List className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {filteredDrops.length > 0 ? (
                viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredDrops.map((drop, index) => (
                      <motion.div
                        key={drop.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <Card variant="default" padding="none" hover className="group h-full">
                          <div className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center flex-shrink-0">
                                  {drop.name.endsWith('.pdf') ? (
                                    <FileText className="w-6 h-6 text-white" />
                                  ) : drop.name.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                                    <Image className="w-6 h-6 text-white" />
                                  ) : drop.name.endsWith('.zip') ? (
                                    <FileArchive className="w-6 h-6 text-white" />
                                  ) : drop.type === 'text' ? (
                                    <FileText className="w-6 h-6 text-white" />
                                  ) : (
                                    <LinkIcon className="w-6 h-6 text-white" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-sm font-semibold text-foreground truncate mb-1">
                                    {drop.name}
                                  </h3>
                                  <p className="text-xs text-foreground/60">{drop.size}</p>
                                </div>
                              </div>
                              <button className="p-1 rounded-lg hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreVertical className="w-4 h-4 text-foreground/60" />
                              </button>
                            </div>

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
                                  Expires in {drop.expiresIn}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button
                                variant="primary"
                                size="sm"
                                fullWidth
                                onClick={() => handleCopyLink(drop.link)}
                              >
                                <Copy className="w-3.5 h-3.5 mr-1.5" />
                                Copy Link
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="!p-2"
                                onClick={() => window.open(`https://${drop.link}`, '_blank')}
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
                    ))}
                  </div>
                ) : (
                  <Card variant="default" padding="none">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b border-border bg-muted/30">
                          <tr>
                            <th className="text-left text-xs font-semibold text-foreground/70 px-4 py-3">File</th>
                            <th className="text-left text-xs font-semibold text-foreground/70 px-4 py-3">Visibility</th>
                            <th className="text-left text-xs font-semibold text-foreground/70 px-4 py-3">Expires</th>
                            <th className="text-left text-xs font-semibold text-foreground/70 px-4 py-3">Size</th>
                            <th className="text-left text-xs font-semibold text-foreground/70 px-4 py-3">Downloads</th>
                            <th className="text-right text-xs font-semibold text-foreground/70 px-4 py-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredDrops.map((drop, index) => (
                            <motion.tr
                              key={drop.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05, duration: 0.3 }}
                              className="border-b border-border hover:bg-muted/20 transition-colors"
                            >
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center flex-shrink-0">
                                    {drop.type === 'file' ? (
                                      <LinkIcon className="w-5 h-5 text-white" />
                                    ) : (
                                      <FileText className="w-5 h-5 text-white" />
                                    )}
                                  </div>
                                  <span className="text-sm font-medium text-foreground truncate max-w-[200px]">
                                    {drop.name}
                                  </span>
                                </div>
                              </td>
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
                                <span className="text-xs text-foreground/70">{drop.expiresIn}</span>
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
                                  >
                                    <Copy className="w-3.5 h-3.5" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="!p-2"
                                    onClick={() => window.open(`https://${drop.link}`, '_blank')}
                                  >
                                    <Eye className="w-3.5 h-3.5" />
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
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                )
              ) : (
                <Card variant="default" padding="lg">
                  <div className="text-center py-8">
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
                        : 'Upload your first file to get started'
                      }
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
                      <Button
                        variant="primary"
                        size="md"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload File
                      </Button>
                    )}
                  </div>
                </Card>
              )}
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Modal
        open={isNewDropModalOpen}
        onCancel={() => setIsNewDropModalOpen(false)}
        title="Create New Drop"
        footer={null}
        width={600}
      >
        <div className="py-4">
          <div className="border-2 border-dashed border-border rounded-lg p-12 text-center mb-6 hover:border-primary transition-colors cursor-pointer">
            <Upload className="w-12 h-12 text-foreground/40 mx-auto mb-4" />
            <p className="text-sm font-medium text-foreground mb-1">
              Drop files here or click to browse
            </p>
            <p className="text-xs text-foreground/60">
              Max file size: 50MB
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Visibility
              </label>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" fullWidth>
                  <Globe className="w-4 h-4 mr-2" />
                  Public
                </Button>
                <Button variant="outline" size="sm" fullWidth>
                  <Lock className="w-4 h-4 mr-2" />
                  Private
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Expires In
              </label>
              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" size="sm">1 Hour</Button>
                <Button variant="outline" size="sm">24 Hours</Button>
                <Button variant="outline" size="sm">7 Days</Button>
              </div>
            </div>

            <Button variant="primary" size="md" fullWidth>
              <Upload className="w-4 h-4 mr-2" />
              Create Drop
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={!!deleteDropId}
        onCancel={() => setDeleteDropId(null)}
        title="Delete Drop?"
        footer={null}
        width={400}
      >
        <div className="py-4">
          <p className="text-sm text-foreground/70 mb-6">
            Are you sure you want to delete this drop? This action cannot be undone and the link will stop working immediately.
          </p>
          <div className="flex gap-3">
            <Button 
              variant="ghost" 
              size="md" 
              fullWidth
              onClick={() => setDeleteDropId(null)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              size="md" 
              fullWidth
              onClick={handleDeleteDrop}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;

