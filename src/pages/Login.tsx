import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Loader2 } from 'lucide-react';

const testNumbers = [
  { phone: '1111111111', scenario: 'No assets connected' },
  { phone: '2222222222', scenario: 'All assets, large MF portfolio' },
  { phone: '3333333333', scenario: 'All assets, small MF portfolio' },
  { phone: '7777777777', scenario: 'Debt-heavy, low performer' },
  { phone: '8888888888', scenario: 'SIP Samurai' },
  { phone: '9999999999', scenario: 'Fixed Income Fanatic' },
];

const Login: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      await login(cleanPhone);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const handleTestNumberClick = (testPhone: string) => {
    setPhone(testPhone);
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-penta-surface1 via-background to-penta-surface2 p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-display text-penta-text1">PentAIGen</h1>
          <p className="text-penta-text3 mt-2 font-body">Your Financial AI Dashboard</p>
        </div>

        {/* Login Card */}
        <Card className="border border-border shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-display">Welcome Back</CardTitle>
            <CardDescription className="font-body">
              Enter your phone number to access your financial data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-penta-text2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter 10-digit phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  disabled={isLoading}
                  className="h-11 font-body"
                />
              </div>

              {error && (
                <p className="text-sm text-penta-rose font-body">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full h-11 font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-penta-text3 font-body">Test Numbers</span>
              </div>
            </div>

            {/* Test Numbers */}
            <div className="grid grid-cols-2 gap-2">
              {testNumbers.map((test) => (
                <button
                  key={test.phone}
                  type="button"
                  onClick={() => handleTestNumberClick(test.phone)}
                  className="text-left px-3 py-2 rounded-lg bg-penta-surface1 hover:bg-penta-surface2 transition-colors text-sm"
                >
                  <span className="font-mono text-primary font-medium block">{test.phone}</span>
                  <span className="text-xs text-penta-text3 font-body">{test.scenario}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Note */}
        <p className="text-center text-xs text-penta-text3 font-body">
          Your data is encrypted and secure. We never share your financial information.
        </p>
      </div>
    </div>
  );
};

export default Login;