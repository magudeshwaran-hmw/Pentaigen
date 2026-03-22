import React, { useState } from 'react';
import { 
  Settings2, 
  Bell, 
  Shield, 
  Eye, 
  Smartphone, 
  Mail, 
  Lock,
  Palette,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
  User,
  CreditCard,
  Database
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatPhone = (phone: string) => {
    return `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;
  };

  const settingsSections = [
    {
      title: 'Account Settings',
      icon: User,
      items: [
        { label: 'Profile Information', icon: User, action: () => navigate('/profile') },
        { label: 'Connected Accounts', icon: CreditCard, action: () => {} },
        { label: 'Data & Privacy', icon: Database, action: () => navigate('/privacy') },
      ]
    },
    {
      title: 'Security',
      icon: Shield,
      items: [
        { 
          label: 'Two-Factor Authentication', 
          icon: Lock, 
          action: () => {},
          toggle: { enabled: twoFactor, setEnabled: setTwoFactor }
        },
        { label: 'Password & Security', icon: Shield, action: () => {} },
        { label: 'Login Activity', icon: Eye, action: () => {} },
      ]
    },
    {
      title: 'Preferences',
      icon: Settings2,
      items: [
        { 
          label: 'Push Notifications', 
          icon: Bell, 
          action: () => {},
          toggle: { enabled: notifications, setEnabled: setNotifications }
        },
        { 
          label: 'Dark Mode', 
          icon: Palette, 
          action: () => {},
          toggle: { enabled: darkMode, setEnabled: setDarkMode }
        },
        { label: 'Language', icon: Globe, action: () => {}, value: 'English' },
      ]
    },
    {
      title: 'Support',
      icon: HelpCircle,
      items: [
        { label: 'Help Center', icon: HelpCircle, action: () => {} },
        { label: 'Contact Support', icon: Mail, action: () => {} },
        { label: 'About', icon: Smartphone, action: () => {} },
      ]
    }
  ];

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display italic text-penta-text1">Settings</h1>
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="text-penta-rose border-penta-rose hover:bg-penta-rose hover:text-white"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>

      {/* User Info Card */}
      <Card className="border border-border">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-penta-blue to-penta-violet flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-penta-text1">Account Holder</h3>
              <p className="text-sm text-penta-text2 font-mono">{formatPhone(user?.phone || 'Unknown')}</p>
              <p className="text-xs text-penta-text3 mt-1">Member since March 2024</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {settingsSections.map((section) => (
          <Card key={section.title} className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <section.icon className="w-5 h-5 text-penta-blue" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {section.items.map((item, index) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-penta-surface1 cursor-pointer transition-colors"
                  onClick={item.action}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-penta-text2" />
                    <div>
                      <p className="text-sm font-medium text-penta-text1">{item.label}</p>
                      {item.value && (
                        <p className="text-xs text-penta-text2">{item.value}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.toggle ? (
                      <Switch
                        checked={item.toggle.enabled}
                        onCheckedChange={item.toggle.setEnabled}
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-penta-text3" />
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* App Version */}
      <Card className="border border-border">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm text-penta-text2">Financial AI Assistant</p>
            <p className="text-xs text-penta-text3 mt-1">Version 1.0.0</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
