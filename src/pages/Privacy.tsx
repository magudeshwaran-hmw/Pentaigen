import React from 'react';
import { Shield, Lock, Eye, Database, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

const Privacy: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-[1400px]">
      <h1 className="text-3xl font-display italic text-penta-text1">Privacy & Security</h1>

      {/* Privacy Status */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="w-5 h-5 text-penta-teal" />
            Your Privacy Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-penta-teal-light flex items-center justify-center">
              <Lock className="w-5 h-5 text-penta-teal" />
            </div>
            <div>
              <p className="font-medium text-penta-text1">Data Protected</p>
              <p className="text-sm text-penta-text2">Your financial data is encrypted and secure</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-penta-text3">Phone Number</span>
              <p className="font-medium text-penta-text1">+91 {user?.phone.slice(0, 5)} ****{user?.phone.slice(9)}</p>
            </div>
            <div>
              <span className="text-penta-text3">Account Status</span>
              <p className="font-medium text-penta-teal">Active</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Shared */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Database className="w-5 h-5 text-penta-blue" />
            Data Sharing Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { title: 'Bank Transactions', desc: 'Read-only access to transaction history', enabled: true },
              { title: 'Credit Report', desc: 'View your credit score and report', enabled: true },
              { title: 'Investment Data', desc: 'Access mutual fund and stock holdings', enabled: true },
              { title: 'EPF Details', desc: 'View your provident fund balance', enabled: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-penta-surface1 rounded-lg">
                <div>
                  <p className="font-medium text-penta-text1">{item.title}</p>
                  <p className="text-xs text-penta-text3">{item.desc}</p>
                </div>
                <span className="text-xs font-medium text-penta-teal bg-penta-teal-light px-2 py-1 rounded">
                  {item.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Privacy Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-border">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-penta-violet-light flex items-center justify-center mb-3">
                <Eye className="w-6 h-6 text-penta-violet" />
              </div>
              <h3 className="font-medium text-penta-text1">Data Visibility</h3>
              <p className="text-xs text-penta-text2 mt-1">You control what data is visible to AI agents</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-penta-teal-light flex items-center justify-center mb-3">
                <Lock className="w-6 h-6 text-penta-teal" />
              </div>
              <h3 className="font-medium text-penta-text1">Encryption</h3>
              <p className="text-xs text-penta-text2 mt-1">All data encrypted at rest and in transit</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-penta-blue-light flex items-center justify-center mb-3">
                <Bell className="w-6 h-6 text-penta-blue" />
              </div>
              <h3 className="font-medium text-penta-text1">Notifications</h3>
              <p className="text-xs text-penta-text2 mt-1">Get alerts for data access attempts</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;