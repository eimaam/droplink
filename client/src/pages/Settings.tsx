import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Card, Input, Label, Switch } from '../components/ui';
import { DashboardSidebar } from '../components/layout';
import { message } from 'antd';
import {
  User,
  Bell,
  Shield,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Link as LinkIcon
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('settings');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    name: 'Imam',
    email: 'hello@eimaam.dev',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: true,
    expiryNotifications: true,
    downloadNotifications: false,
    publicProfileEnabled: true,
    twoFactorEnabled: false,
    defaultExpiry: '24h',
    defaultVisibility: 'public',
    autoDelete: true
  });

  const handleSave = (section: string) => {
    message.success(`${section} settings saved! ✅`);
  };

  const handleDeleteAccount = () => {
    message.error('Account deletion is not available in demo mode');
  };

  return (
    <div className="min-h-screen bg-background-base !font-mono">
      <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 overflow-auto pb-20 md:pb-0 md:ml-64">
        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                Settings
              </h1>
              <p className="text-sm text-foreground/70">
                Manage your account and preferences
              </p>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-6 auto-rows-fr">
              
              {/* Profile Settings - Large (Spans 2 columns, 2 rows) */}
              <Card padding="sm" className="md:col-span-2 lg:col-span-4 lg:row-span-2 hover:shadow-glow-soft transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Profile Information</h2>
                  <p className="text-sm text-foreground/60">Update your personal details</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={settings.name}
                    onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <Button variant="primary" size="md" onClick={() => handleSave('Profile')}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </Card>

              {/* Two-Factor Auth - Small (Top right) */}
              <Card padding="sm" className="md:col-span-1 lg:col-span-2 hover:shadow-glow-soft transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-foreground">2FA Security</h3>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-surface border border-border">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Two-Factor Auth</p>
                    <p className="text-xs text-foreground/60">Extra security layer</p>
                  </div>
                  <Switch
                    checked={settings.twoFactorEnabled}
                    onChange={(checked) => setSettings({ ...settings, twoFactorEnabled: checked })}
                  />
                </div>
              </Card>

              {/* Notifications - Medium */}
              <Card padding="sm" className="font-mono md:col-span-2 lg:col-span-3 hover:shadow-glow-soft transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-foreground">Notifications</h2>
                    <p className="text-xs text-foreground/60">Control your updates</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex-1">
                      <p className="text-base font-medium text-foreground">Email</p>
                      <p className="text-xs text-foreground/60">Updates via email</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex-1">
                      <p className="text-base font-medium text-foreground">Expiry</p>
                      <p className="text-xs text-foreground/60">Before drops expire</p>
                    </div>
                    <Switch
                      checked={settings.expiryNotifications}
                      onChange={(checked) => setSettings({ ...settings, expiryNotifications: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex-1">
                      <p className="text-base font-medium text-foreground">Downloads</p>
                      <p className="text-xs text-foreground/60">When files download</p>
                    </div>
                    <Switch
                      checked={settings.downloadNotifications}
                      onChange={(checked) => setSettings({ ...settings, downloadNotifications: checked })}
                    />
                  </div>
                </div>
              </Card>

              {/* Security/Password - Large */}
              <Card padding="sm" className="md:col-span-2 lg:col-span-3 lg:row-span-2 hover:shadow-glow-soft transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-foreground">Security</h2>
                    <p className="text-xs text-foreground/60">Password management</p>
                  </div>
                </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={settings.currentPassword}
                      onChange={(e) => setSettings({ ...settings, currentPassword: e.target.value })}
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/60 hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={settings.newPassword}
                    onChange={(e) => setSettings({ ...settings, newPassword: e.target.value })}
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={settings.confirmPassword}
                    onChange={(e) => setSettings({ ...settings, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Two-Factor Authentication</p>
                    <p className="text-xs text-foreground/60">Add an extra layer of security</p>
                  </div>
                  <Switch
                    checked={settings.twoFactorEnabled}
                    onChange={(checked) => setSettings({ ...settings, twoFactorEnabled: checked })}
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <Button variant="primary" size="md" onClick={() => handleSave('Security')}>
                    <Save className="w-4 h-4 mr-2" />
                    Update Password
                  </Button>
                </div>
              </div>
            </Card>

              {/* Drop Defaults - Medium */}
              <Card padding="sm" className="md:col-span-2 lg:col-span-3 hover:shadow-glow-soft transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <LinkIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-foreground">Drop Defaults</h2>
                    <p className="text-xs text-foreground/60">Default options for new drops</p>
                  </div>
                </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="defaultExpiry">Default Expiry Time</Label>
                  <select
                    id="defaultExpiry"
                    value={settings.defaultExpiry}
                    onChange={(e) => setSettings({ ...settings, defaultExpiry: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-background-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground cursor-pointer"
                  >
                    <option value="1h">1 Hour</option>
                    <option value="24h">24 Hours</option>
                    <option value="7d">7 Days</option>
                    <option value="30d">30 Days</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="defaultVisibility">Default Visibility</Label>
                  <select
                    id="defaultVisibility"
                    value={settings.defaultVisibility}
                    onChange={(e) => setSettings({ ...settings, defaultVisibility: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-background-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground cursor-pointer"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Auto-Delete After Expiry</p>
                    <p className="text-xs text-foreground/60">Automatically delete drops after they expire</p>
                  </div>
                  <Switch
                    checked={settings.autoDelete}
                    onChange={(checked) => setSettings({ ...settings, autoDelete: checked })}
                  />
                </div>

                <Button variant="primary" size="sm" fullWidth onClick={() => handleSave('Drop Defaults')}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Defaults
                </Button>
              </div>
              </Card>

              {/* Danger Zone - Wide across bottom */}
              <Card padding="sm" className="md:col-span-2 lg:col-span-6 border-destructive/30 hover:border-destructive/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <Trash2 className="w-6 h-6 text-destructive" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground mb-2">Danger Zone</h2>
                      <p className="text-sm text-foreground/60 mb-1">Delete your account permanently</p>
                      <p className="text-xs text-foreground/50">
                        Once deleted, there is no going back. All your drops will be permanently removed.
                      </p>
                    </div>
                  </div>
                  <Button variant="destructive" size="lg" onClick={handleDeleteAccount} className="md:flex-shrink-0">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </Card>

            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
