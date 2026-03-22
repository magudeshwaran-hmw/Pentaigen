import React, { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, Search, ArrowUpDown, BarChart3, GitCompare, Sparkles, Loader2, Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNetWorth, useMutualFundHoldings, useCreditReport } from '@/hooks/useUserData';
import { formatFullCurrency, chartTooltipStyle } from '@/data/constants';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line, Legend, ComposedChart,
} from 'recharts';

// Mock stock data (NSE stocks)
interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  pe: number;
  week52High: number;
  week52Low: number;
}

const mockStocks: Stock[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2845.30, change: 45.20, changePercent: 1.61, volume: 8500000, marketCap: 1950000, pe: 28.5, week52High: 3200, week52Low: 2100 },
  { symbol: 'TCS', name: 'Tata Consultancy', price: 3895.65, change: -12.40, changePercent: -0.32, volume: 3200000, marketCap: 1450000, pe: 31.2, week52High: 4200, week52Low: 3100 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1685.40, change: 28.90, changePercent: 1.75, volume: 5600000, marketCap: 1250000, pe: 22.8, week52High: 1850, week52Low: 1350 },
  { symbol: 'INFY', name: 'Infosys', price: 1456.75, change: 18.25, changePercent: 1.27, volume: 4200000, marketCap: 610000, pe: 24.5, week52High: 1600, week52Low: 1150 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 985.60, change: -8.30, changePercent: -0.83, volume: 4800000, marketCap: 690000, pe: 19.8, week52High: 1100, week52Low: 750 },
  { symbol: 'SBIN', name: 'State Bank of India', price: 765.40, change: 15.80, changePercent: 2.11, volume: 9200000, marketCap: 680000, pe: 14.2, week52High: 850, week52Low: 520 },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 1456.20, change: 32.10, changePercent: 2.26, volume: 3800000, marketCap: 820000, pe: 35.8, week52High: 1600, week52Low: 980 },
  { symbol: 'ITC', name: 'ITC Ltd', price: 425.80, change: 5.60, changePercent: 1.33, volume: 6200000, marketCap: 520000, pe: 18.5, week52High: 480, week52Low: 350 },
  { symbol: 'LT', name: 'Larsen & Toubro', price: 3285.90, change: -22.40, changePercent: -0.68, volume: 2100000, marketCap: 440000, pe: 29.8, week52High: 3600, week52Low: 2500 },
  { symbol: 'ASIANPAINT', name: 'Asian Paints', price: 2895.40, change: 42.30, changePercent: 1.48, volume: 1800000, marketCap: 280000, pe: 45.2, week52High: 3200, week52Low: 2100 },
];

// Generate mock historical data
const generateHistoricalData = (basePrice: number, months: number = 6) => {
  const data = [];
  const now = new Date();
  let price = basePrice * 0.85;

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = date.toLocaleString('default', { month: 'short' });
    const change = (Math.random() - 0.45) * (basePrice * 0.1);
    price = Math.max(price + change, basePrice * 0.7);

    data.push({
      month: monthName,
      price: Math.round(price * 100) / 100,
      nifty: 100 + Math.random() * 20,
    });
  }

  // Ensure last point matches current price
  data[data.length - 1].price = basePrice;
  return data;
};

// Generate forecast data
const generateForecastData = (currentPrice: number, months: number = 6) => {
  const data = [];
  const now = new Date();
  let price = currentPrice;

  for (let i = 0; i < months; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() + i + 1, 1);
    const monthName = date.toLocaleString('default', { month: 'short', year: '2-digit' });
    const growth = (Math.random() - 0.4) * (currentPrice * 0.08);
    price = Math.max(price + growth, currentPrice * 0.7);

    data.push({
      month: monthName,
      predicted: Math.round(price * 100) / 100,
      optimistic: Math.round(price * 1.08 * 100) / 100,
      pessimistic: Math.round(price * 0.92 * 100) / 100,
    });
  }

  return data;
};

const Shares: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Stock; direction: 'asc' | 'desc' }>({ key: 'marketCap', direction: 'desc' });
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [compareStocks, setCompareStocks] = useState<Stock[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  // Get user data for recommendations
  const { data: netWorthData } = useNetWorth();
  const { data: holdings } = useMutualFundHoldings();
  const { data: creditReport } = useCreditReport();

  // Filter and sort stocks
  const filteredStocks = useMemo(() => {
    let result = mockStocks.filter(stock =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    result.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });

    return result;
  }, [searchTerm, sortConfig]);

  const handleSort = (key: keyof Stock) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  const handleStockClick = (stock: Stock) => {
    setSelectedStock(stock);
  };

  const addToCompare = (stock: Stock) => {
    if (compareStocks.length < 3 && !compareStocks.find(s => s.symbol === stock.symbol)) {
      setCompareStocks([...compareStocks, stock]);
      setShowCompare(true);
    }
  };

  const removeFromCompare = (stock: Stock) => {
    setCompareStocks(compareStocks.filter(s => s.symbol !== stock.symbol));
    if (compareStocks.length <= 1) setShowCompare(false);
  };

  const getRecommendations = () => {
    const netWorth = netWorthData?.netWorth ?? 500000;
    const creditScore = creditReport?.score ?? 750;
    const riskProfile = netWorth > 1000000 ? 'aggressive' : netWorth > 500000 ? 'moderate' : 'conservative';

    const recommendations = [];

    // High growth stocks for aggressive investors
    if (riskProfile === 'aggressive') {
      recommendations.push({ stock: mockStocks[0], reason: 'Strong Q4 results, expanding into green energy' });
      recommendations.push({ stock: mockStocks[6], reason: '5G rollout driving revenue growth' });
    }

    // Stable stocks for moderate
    if (riskProfile === 'moderate') {
      recommendations.push({ stock: mockStocks[1], reason: 'Consistent performer, strong IT services demand' });
      recommendations.push({ stock: mockStocks[2], reason: 'Credit card adoption increasing, stable NIMs' });
    }

    // Conservative picks
    if (riskProfile === 'conservative') {
      recommendations.push({ stock: mockStocks[5], reason: 'Government bank, stable returns' });
      recommendations.push({ stock: mockStocks[7], reason: 'Defensive FMCG stock, steady dividends' });
    }

    // Good credit score bonus recommendations
    if (creditScore > 750) {
      recommendations.push({ stock: mockStocks[4], reason: 'Good for margin trading with high Cibil' });
    }

    return recommendations.slice(0, 4);
  };

  const recommendations = getRecommendations();
  const historicalData = selectedStock ? generateHistoricalData(selectedStock.price) : [];
  const forecastData = selectedStock ? generateForecastData(selectedStock.price) : [];

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display italic text-penta-text1">Shares</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowCompare(!showCompare)} disabled={compareStocks.length < 2}>
            <GitCompare className="w-4 h-4 mr-2" />
            Compare ({compareStocks.length})
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-penta-text3" />
        <Input
          placeholder="Search stocks by symbol or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="market" className="space-y-4">
        <TabsList>
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="compare" disabled={compareStocks.length < 2}>Compare</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="market" className="space-y-4">
          {/* Stock Table */}
          <div className="bg-card rounded-[14px] shadow-penta border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr className="border-b border-border">
                    {[
                      { key: 'symbol', label: 'Symbol' },
                      { key: 'name', label: 'Name' },
                      { key: 'price', label: 'Price' },
                      { key: 'change', label: 'Change' },
                      { key: 'volume', label: 'Volume' },
                      { key: 'marketCap', label: 'Market Cap' },
                      { key: 'pe', label: 'P/E' },
                    ].map(h => (
                      <th
                        key={h.key}
                        onClick={() => handleSort(h.key as keyof Stock)}
                        className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-penta-text3 font-medium cursor-pointer hover:text-penta-text1"
                      >
                        <div className="flex items-center gap-1">
                          {h.label}
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                    ))}
                    <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-penta-text3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStocks.map((stock) => (
                    <tr
                      key={stock.symbol}
                      onClick={() => handleStockClick(stock)}
                      className={`border-b border-border last:border-0 cursor-pointer hover:bg-penta-surface1 transition-colors ${
                        selectedStock?.symbol === stock.symbol ? 'bg-penta-surface1' : ''
                      }`}
                    >
                      <td className="px-4 py-3 font-medium text-penta-text1">{stock.symbol}</td>
                      <td className="px-4 py-3 text-penta-text2 max-w-[150px] truncate">{stock.name}</td>
                      <td className="px-4 py-3 font-medium text-penta-text1">{formatFullCurrency(stock.price)}</td>
                      <td className={`px-4 py-3 font-medium ${stock.change >= 0 ? 'text-penta-teal' : 'text-penta-rose'}`}>
                        <div className="flex items-center gap-1">
                          {stock.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                        </div>
                      </td>
                      <td className="px-4 py-3 text-penta-text2">{(stock.volume / 100000).toFixed(1)}L</td>
                      <td className="px-4 py-3 text-penta-text2">{(stock.marketCap / 100000).toFixed(0)}K Cr</td>
                      <td className="px-4 py-3 text-penta-text2">{stock.pe.toFixed(1)}</td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); addToCompare(stock); }}>
                          <Plus className="w-3 h-3" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stock Detail / Chart */}
          {selectedStock && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Stock Info */}
              <Card className="border border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>{selectedStock.symbol}</span>
                    <span className={`text-sm font-medium ${selectedStock.change >= 0 ? 'text-penta-teal' : 'text-penta-rose'}`}>
                      {selectedStock.change >= 0 ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-penta-text3">Current Price</span>
                      <span className="text-sm font-medium text-penta-text1">{formatFullCurrency(selectedStock.price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-penta-text3">Day High</span>
                      <span className="text-sm font-medium text-penta-text1">{formatFullCurrency(selectedStock.week52High)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-penta-text3">Day Low</span>
                      <span className="text-sm font-medium text-penta-text1">{formatFullCurrency(selectedStock.week52Low)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-penta-text3">P/E Ratio</span>
                      <span className="text-sm font-medium text-penta-text1">{selectedStock.pe.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-penta-text3">Market Cap</span>
                      <span className="text-sm font-medium text-penta-text1">{(selectedStock.marketCap / 100000).toFixed(0)}K Cr</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Price Chart */}
              <Card className="lg:col-span-2 border border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Price History (6 Months)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={historicalData}>
                        <defs>
                          <linearGradient id="gradStock" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
                            <stop offset="100%" stopColor="#2563eb" stopOpacity={0.02} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e5f2" />
                        <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#52527a' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: '#52527a' }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                        <Tooltip {...chartTooltipStyle} formatter={(v: number) => formatFullCurrency(v)} />
                        <Area type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={2} fill="url(#gradStock)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="compare" className="space-y-4">
          {compareStocks.length < 2 ? (
            <div className="text-center py-12 text-penta-text3">
              Select at least 2 stocks to compare
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {compareStocks.map((stock) => (
                <Card key={stock.symbol} className="border border-border">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">{stock.symbol}</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => removeFromCompare(stock)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[180px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={generateHistoricalData(stock.price)}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e5f2" />
                          <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#52527a' }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 10, fill: '#52527a' }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                          <Tooltip {...chartTooltipStyle} formatter={(v: number) => formatFullCurrency(v)} />
                          <Area type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={2} fill="url(#gradStock)" />
                          <Line type="monotone" dataKey="nifty" stroke="#9898b8" strokeWidth={1} strokeDasharray="3 3" dot={false} />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="text-center p-2 bg-penta-surface1 rounded-lg">
                        <p className="text-xs text-penta-text3">Price</p>
                        <p className="font-medium text-penta-text1">{formatFullCurrency(stock.price)}</p>
                      </div>
                      <div className="text-center p-2 bg-penta-surface1 rounded-lg">
                        <p className="text-xs text-penta-text3">Change</p>
                        <p className={`font-medium ${stock.change >= 0 ? 'text-penta-teal' : 'text-penta-rose'}`}>
                          {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </p>
                      </div>
                      <div className="text-center p-2 bg-penta-surface1 rounded-lg">
                        <p className="text-xs text-penta-text3">P/E</p>
                        <p className="font-medium text-penta-text1">{stock.pe.toFixed(1)}</p>
                      </div>
                      <div className="text-center p-2 bg-penta-surface1 rounded-lg">
                        <p className="text-xs text-penta-text3">Volume</p>
                        <p className="font-medium text-penta-text1">{(stock.volume / 100000).toFixed(1)}L</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="forecast" className="space-y-4">
          <Card className="border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">6-Month Price Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e5f2" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#52527a' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#52527a' }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                    <Tooltip {...chartTooltipStyle} formatter={(v: number) => formatFullCurrency(v)} />
                    <Legend iconType="line" wrapperStyle={{ fontSize: 11 }} />
                    <Area type="monotone" dataKey="optimistic" stroke="#00a87c" strokeWidth={1} fill="none" strokeDasharray="5 5" name="Optimistic" />
                    <Line type="monotone" dataKey="predicted" stroke="#2563eb" strokeWidth={2} dot={{ r: 4, fill: '#2563eb' }} name="Predicted" />
                    <Area type="monotone" dataKey="pessimistic" stroke="#dc2626" strokeWidth={1} fill="none" strokeDasharray="5 5" name="Pessimistic" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-penta-text3 mt-4 text-center">
                Forecasts are based on historical trends and do not guarantee future performance. Please consult a financial advisor.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec, i) => (
              <Card key={i} className="border border-border hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleStockClick(rec.stock)}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      {rec.stock.symbol}
                    </span>
                    <span className={`text-sm font-medium ${rec.stock.change >= 0 ? 'text-penta-teal' : 'text-penta-rose'}`}>
                      {rec.stock.change >= 0 ? '+' : ''}{rec.stock.changePercent.toFixed(2)}%
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-penta-text2 mb-3">{rec.stock.name}</p>
                  <div className="flex items-start gap-2 p-2 bg-penta-amber-light rounded-lg">
                    <Sparkles className="w-4 h-4 text-penta-amber shrink-0 mt-0.5" />
                    <p className="text-xs text-penta-text2">{rec.reason}</p>
                  </div>
                  <div className="mt-3 flex justify-between text-xs">
                    <span className="text-penta-text3">Price: {formatFullCurrency(rec.stock.price)}</span>
                    <span className="text-penta-text3">P/E: {rec.stock.pe.toFixed(1)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border border-border">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-penta-amber shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-penta-text1 mb-1">Personalized Insights</h4>
                  <p className="text-sm text-penta-text2">
                    Based on your net worth of {formatFullCurrency(netWorthData?.netWorth ?? 0)}, credit score of {creditReport?.score ?? 'N/A'},
                    and {holdings?.length ?? 0} mutual fund holdings, we recommend stocks that match your risk profile.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Shares;