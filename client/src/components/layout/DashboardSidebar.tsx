import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../ui';
import { 
  LayoutDashboard,
  Folder,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';

interface ISidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
}

interface IDashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DashboardSidebar: React.FC<IDashboardSidebarProps> = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();

  const sidebarItems: ISidebarItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'drops', label: 'My Drops', icon: Folder, path: '/my-drops' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
    { id: 'help', label: 'Help', icon: HelpCircle, path: '/help' }
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-surface border-r border-border flex-col">
        <div className="p-6 border-b border-border">
          <Link to="/">
            <Logo size="md" showText={true} showImage={true} animated />
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
                    activeTab === item.id
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-foreground/70 hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-50 safe-area-bottom">
        <div className="flex items-center justify-around px-2 py-3">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'text-primary'
                  : 'text-foreground/60'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-primary' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all text-foreground/60 hover:text-destructive"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-xs font-medium">Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default DashboardSidebar;

