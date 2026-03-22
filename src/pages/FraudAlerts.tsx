import React from 'react';
import { AlertTriangle, Shield, CheckCircle, Eye, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBankTransactions } from '@/hooks/useUserData';
import MetricCard from '@/components/MetricCard';

const FraudAlerts: React.FC = () => {
  const { data: transactions } = useBankTransactions();

  const flaggedTransactions = transactions?.filter(
    t => t.status === 'flagged' || t.status === 'suspicious'
  ) || [];

  const totalTransactions = transactions?.length || 0;
  const suspiciousCount = transactions?.filter(t => t.status === 'suspicious').length || 0;
  const flaggedCount = transactions?.filter(t => t.status === 'flagged').length || 0;

  return (
    <div className="space-y-4 sm:space-y-6 max-w-[1400px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-display italic text-penta-text1">Fraud Alerts</h1>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-penta-teal" />
          <span className="text-xs sm:text-sm text-penta-text2">Real-time Protection</span>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <MetricCard 
          title="Total Transactions" 
          value={totalTransactions.toString()} 
          trend={{ value: 'This month', direction: 'up' }}
          icon={<TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />} 
          colorClass="bg-penta-blue-light text-penta-blue" 
        />
        <MetricCard 
          title="Suspicious Activity" 
          value={suspiciousCount.toString()} 
          trend={{ value: flaggedCount > 0 ? 'Alert' : 'Clear', direction: flaggedCount > 0 ? 'down' : 'up' }}
          icon={<Eye className="w-4 h-4 sm:w-5 sm:h-5" />} 
          colorClass={suspiciousCount > 0 ? "bg-penta-amber-light text-penta-amber" : "bg-penta-teal-light text-penta-teal"} 
        />
        <MetricCard 
          title="Flagged" 
          value={flaggedCount.toString()} 
          trend={{ value: flaggedCount > 0 ? 'Review' : 'None', direction: flaggedCount > 0 ? 'down' : 'up' }}
          icon={<AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />} 
          colorClass={flaggedCount > 0 ? "bg-penta-rose-light text-penta-rose" : "bg-penta-teal-light text-penta-teal"} 
        />
        <MetricCard 
          title="Last Scan" 
          value="2 min ago" 
          trend={{ value: 'Active', direction: 'up' }}
          icon={<Clock className="w-4 h-4 sm:w-5 sm:h-5" />} 
          colorClass="bg-penta-violet-light text-penta-violet" 
        />
      </div>

      {flaggedTransactions.length === 0 ? (
        <Card className="border border-border bg-gradient-to-r from-penta-teal/5 to-penta-blue/5">
          <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-penta-teal-light flex items-center justify-center">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-penta-teal" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-semibold text-penta-text1 mb-2">All Clear!</h3>
                <p className="text-sm text-penta-text2 max-w-md">
                  No suspicious transactions detected. Your account is protected with real-time monitoring.
                </p>
                <div className="mt-4 flex items-center justify-center sm:justify-start gap-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-penta-teal" />
                  <span className="text-xs text-penta-teal font-medium">Protection Active</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 sm:p-4 bg-penta-rose/10 border border-penta-rose/20 rounded-lg">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-penta-rose" />
            <span className="text-xs sm:text-sm font-medium text-penta-rose">
              {flaggedTransactions.length} transaction{flaggedTransactions.length > 1 ? 's' : ''} require your attention
            </span>
          </div>
          
          {flaggedTransactions.map((tx, index) => (
            <Card
              key={tx.id || index}
              className={`border-l-4 ${
                tx.status === 'flagged' 
                  ? 'border-l-penta-rose bg-penta-rose/5' 
                  : 'border-l-penta-amber bg-penta-amber/5'
              }`}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                  <AlertTriangle
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      tx.status === 'flagged' ? 'text-penta-rose' : 'text-penta-amber'
                    }`}
                  />
                  {tx.status === 'flagged' ? 'Flagged Transaction' : 'Suspicious Activity'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-penta-text3">Description</span>
                    <span className="text-xs sm:text-sm font-medium text-penta-text1 text-right max-w-[150px] sm:max-w-none truncate">{tx.description}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-penta-text3">Amount</span>
                    <span className={`text-sm sm:text-lg font-bold ${
                      tx.amount < 0 ? 'text-penta-rose' : 'text-penta-teal'
                    }`}>
                      {tx.amount < 0 ? '-' : '+'}₹{Math.abs(tx.amount).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-penta-text3">Date</span>
                    <span className="text-xs sm:text-sm text-penta-text2">{tx.date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-penta-text3">Category</span>
                    <span className="text-xs sm:text-sm text-penta-text2">{tx.category}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    <button className="px-3 sm:px-4 py-2 bg-penta-rose text-white text-xs sm:text-sm rounded-lg hover:bg-penta-rose/90 transition-colors">
                      Report Fraud
                    </button>
                    <button className="px-3 sm:px-4 py-2 border border-penta-text3 text-penta-text1 text-xs sm:text-sm rounded-lg hover:bg-penta-surface1 transition-colors">
                      Mark as Safe
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FraudAlerts;