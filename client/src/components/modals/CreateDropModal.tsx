import { useState, useRef } from 'react';
import { Modal, Button, Input } from '../ui';
import { Upload, Globe, Lock, Eye, EyeOff } from 'lucide-react';
import { message } from 'antd';

interface CreateDropModalProps {
  open: boolean;
  onCancel: () => void;
  onSuccess?: () => void;
}

type Visibility = 'public' | 'private';
type ExpiryTime = '1h' | '24h' | '7d';

const CreateDropModal = ({ open, onCancel, onSuccess }: CreateDropModalProps) => {
  const [visibility, setVisibility] = useState<Visibility>('public');
  const [expiryTime, setExpiryTime] = useState<ExpiryTime>('24h');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleCreateDrop(files);
    }
  };

  const handleCreateDrop = (files: File[]) => {
    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      message.success(`${files.length} file(s) uploaded successfully! 🎉`);
      resetForm();
      onCancel();
      onSuccess?.();
    }, 2000);
  };

  const resetForm = () => {
    setVisibility('public');
    setExpiryTime('24h');
    setPassword('');
    setShowPassword(false);
  };

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  const handleDropZoneClick = () => {
    // Validate password if private
    if (visibility === 'private' && !password.trim()) {
      message.error('Please set a password for private drops');
      return;
    }
    fileInputRef.current?.click();
  };

  const isFormValid = visibility === 'public' || (visibility === 'private' && password.trim().length > 0);

  const expiryOptions = [
    { value: '1h', label: '1 Hour', description: 'Quick share' },
    { value: '24h', label: '24 Hours', description: 'Recommended' },
    { value: '7d', label: '7 Days', description: 'Extended' }
  ];

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      title={
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center shadow-glow-primary">
            <Upload className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Create New Drop</h3>
            <p className="text-xs text-foreground/60 font-normal">Share files or text that expires automatically</p>
          </div>
        </div>
      }
      footer={null}
      width={600}
    >
      <div className="space-y-6">
        {/* File Upload Zone */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div 
          onClick={handleDropZoneClick}
          className="border-2 border-dashed border-border rounded-xl p-10 text-center bg-muted/20 hover:border-primary hover:bg-muted/30 transition-all cursor-pointer group"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent-cyan/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <p className="text-base font-semibold text-foreground mb-2">
            Drop files here or click to browse
          </p>
          <p className="text-sm text-foreground/60">
            Max file size: <span className="font-medium text-primary">50MB</span>
          </p>
        </div>
        
        <div className="space-y-5">
          {/* Visibility Selection */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Visibility
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setVisibility('public')}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all group ${
                  visibility === 'public'
                    ? 'border-success bg-success/10 shadow-glow-soft'
                    : 'border-border bg-background-base hover:border-success/50 hover:bg-success/5'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  visibility === 'public'
                    ? 'bg-success/20'
                    : 'bg-success/10 group-hover:bg-success/15'
                }`}>
                  <Globe className={`w-5 h-5 ${
                    visibility === 'public' ? 'text-success' : 'text-success/70'
                  }`} />
                </div>
                <div className="text-left">
                  <p className={`text-sm font-semibold ${
                    visibility === 'public' ? 'text-success' : 'text-foreground'
                  }`}>
                    Public
                  </p>
                  <p className={`text-xs ${
                    visibility === 'public' ? 'text-success/80' : 'text-foreground/60'
                  }`}>
                    Anyone with link
                  </p>
                </div>
                {visibility === 'public' && (
                  <div className="ml-auto w-5 h-5 rounded-full bg-success flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                )}
              </button>
              
              <button 
                onClick={() => setVisibility('private')}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all group ${
                  visibility === 'private'
                    ? 'border-primary bg-primary/10 shadow-glow-primary'
                    : 'border-border bg-background-base hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  visibility === 'private'
                    ? 'bg-primary/20'
                    : 'bg-foreground/5 group-hover:bg-foreground/10'
                }`}>
                  <Lock className={`w-5 h-5 ${
                    visibility === 'private' ? 'text-primary' : 'text-foreground/70'
                  }`} />
                </div>
                <div className="text-left">
                  <p className={`text-sm font-semibold ${
                    visibility === 'private' ? 'text-primary' : 'text-foreground'
                  }`}>
                    Private
                  </p>
                  <p className={`text-xs ${
                    visibility === 'private' ? 'text-primary/80' : 'text-foreground/60'
                  }`}>
                    Restricted access
                  </p>
                </div>
                {visibility === 'private' && (
                  <div className="ml-auto w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Password Field (only shown when Private is selected) */}
          {visibility === 'private' && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="block text-sm font-semibold text-foreground mb-3">
                Set Password <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a secure password"
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
              <p className="text-xs text-foreground/60 mt-2">
                Recipients will need this password to access the drop
              </p>
            </div>
          )}

          {/* Expiry Time Selection */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Expires In
            </label>
            <div className="grid grid-cols-3 gap-3">
              {expiryOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setExpiryTime(option.value as ExpiryTime)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    expiryTime === option.value
                      ? 'border-primary bg-primary/10 shadow-glow-soft'
                      : 'border-border bg-background-base hover:border-primary/50 hover:bg-primary/5'
                  }`}
                >
                  <p className={`text-sm font-semibold ${
                    expiryTime === option.value ? 'text-primary' : 'text-foreground'
                  }`}>
                    {option.label}
                  </p>
                  <p className={`text-xs ${
                    expiryTime === option.value ? 'text-primary/80' : 'text-foreground/60'
                  }`}>
                    {option.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Create Button */}
          <div className="pt-2">
            <Button 
              variant="primary" 
              size="lg" 
              fullWidth
              onClick={handleDropZoneClick}
              disabled={isUploading || !isFormValid}
            >
              {isUploading ? (
                <>
                  <div className="w-5 h-5 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <div className="flex items-center justify-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Create Drop
                </div>
              )}
            </Button>
            {visibility === 'private' && !password.trim() && (
              <p className="text-xs text-foreground/50 text-center mt-2">
                Password required for private drops
              </p>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateDropModal;
