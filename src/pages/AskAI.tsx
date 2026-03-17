import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import AgentCard from '@/components/AgentCard';
import { agents, agentActivity, agentLabels, chartTooltipStyle } from '@/data/constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const agentData = agentLabels.map((l, i) => ({ name: l, tasks: agentActivity[i] }));
const agentColors = ['#2563eb', '#00a87c', '#7c3aed', '#dc2626', '#d97706', '#0284c7'];

const suggestions = [
  { label: 'Food spending', query: 'How much did I spend on food last month?' },
  { label: 'Tax savings', query: 'How can I save more on taxes?' },
  { label: 'Portfolio review', query: 'Review my portfolio performance' },
  { label: 'Retirement plan', query: 'What is my retirement projection?' },
  { label: 'Fraud alerts', query: 'Are there any fraud alerts?' },
  { label: 'Credit score', query: 'How is my credit score?' },
];

const aiResponses: Record<string, string> = {
  food: 'Last month food spend: **₹8,240**. Swiggy ₹3,200 (14 orders) · Zomato ₹2,800 · Restaurants ₹2,240. That is 9.7% of income vs 8% benchmark. Meal-prepping 2x/week saves ~₹1,500/month.',
  tax: 'You can save **₹32,760** in taxes: NPS Tier I (80CCD) ₹50,000 saves ₹15,600. ELSS ₹55,000 completes 80C saving ₹17,160. Act before March 31.',
  portfolio: 'Portfolio XIRR: **9.8%**. Mirae Asset +14.2% outperforming. Axis Bluechip +11.8% on track. Nippon Gold ETF -2.1% underperforming. Shift 5% from Gold to Flexi-cap.',
  retirement: 'Conservative: **₹3.2 Crore** by 2045. Balanced: ₹4.1 Crore. Aggressive: ₹5.6 Crore. Increasing SIP ₹3,000/month today adds ₹42 Lakh by 2045.',
  fraud: '2 anomalies detected: **LMN Services ₹78,000** (92% risk, location mismatch). **XYZ Online Shop ₹25,000** (62% risk). Block LMN Services immediately.',
  credit: 'CIBIL **792** — Excellent, top 15%. To reach 800+: keep utilization below 25%, no new cards for 6 months, always pay full bill.',
  default: 'Top 3 actions this week:\n1. **Block LMN Services** (92% fraud risk)\n2. **Open NPS Tier I** — save ₹15,600 in taxes\n3. **Raise SIP ₹3,000/month** — adds ₹42 Lakh by 2045',
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('food') || lower.includes('swiggy') || lower.includes('zomato')) return aiResponses.food;
  if (lower.includes('tax') || lower.includes('80c') || lower.includes('nps')) return aiResponses.tax;
  if (lower.includes('portfolio') || lower.includes('invest') || lower.includes('xirr')) return aiResponses.portfolio;
  if (lower.includes('retire') || lower.includes('future') || lower.includes('projection')) return aiResponses.retirement;
  if (lower.includes('fraud') || lower.includes('lmn') || lower.includes('anomal')) return aiResponses.fraud;
  if (lower.includes('credit') || lower.includes('cibil') || lower.includes('score')) return aiResponses.credit;
  return aiResponses.default;
}

type Message = { role: 'user' | 'assistant'; content: string };

const AskAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello Arjun! I am **FinGPT**, your AI financial advisor. Ask me anything about your finances — spending, taxes, portfolio, retirement, fraud alerts, or credit score.' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setIsTyping(true);
    // Simulate typing delay
    setTimeout(() => {
      const response = getAIResponse(msg);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-[1400px]">
      <h1 className="text-3xl font-display italic text-penta-text1">Ask AI</h1>

      {/* Agent Activity */}
      <div className="bg-card rounded-[14px] p-5 shadow-penta border border-border">
        <h3 className="text-sm font-medium text-penta-text1 font-body mb-4">Agent Activity (Last 7 Days)</h3>
        <div className="h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={agentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e5f2" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#52527a' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#52527a' }} axisLine={false} tickLine={false} />
              <Tooltip {...chartTooltipStyle} />
              <Bar dataKey="tasks" radius={[4, 4, 0, 0]}>
                {agentData.map((_, i) => <Cell key={i} fill={agentColors[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Agent Grid */}
      <div>
        <h3 className="text-sm font-medium text-penta-text1 font-body mb-3">AI Agents</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {agents.map((agent) => (
            <AgentCard
              key={agent.name}
              name={agent.name}
              gradient={agent.gradient as [string, string]}
              icon={agent.icon}
              status={agent.status}
            />
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-card rounded-[18px] shadow-penta-md border border-border overflow-hidden">
        {/* Chat Header */}
        <div className="px-5 py-3 border-b border-border flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #5b21b6, #7c3aed)' }}>
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-penta-text1 font-body">FinGPT</p>
            <p className="text-[10px] text-penta-teal font-body flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-penta-teal animate-pulse" />
              Online
            </p>
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="px-5 py-2.5 border-b border-border flex flex-wrap gap-1.5">
          {suggestions.map((s) => (
            <button
              key={s.label}
              onClick={() => handleSend(s.query)}
              className="px-3 py-1 rounded-full text-[11px] font-body font-medium bg-penta-surface1 text-penta-text2 hover:bg-penta-surface2 transition-colors"
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="h-[320px] overflow-y-auto px-5 py-4 space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center mt-0.5" style={{ background: 'linear-gradient(135deg, #5b21b6, #7c3aed)' }}>
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
              )}
              <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm font-body ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-md'
                  : 'bg-penta-surface1 text-penta-text1 rounded-bl-md'
              }`}>
                {msg.content.split('\n').map((line, j) => (
                  <p key={j} className={j > 0 ? 'mt-1.5' : ''}>
                    {line.split(/(\*\*.*?\*\*)/).map((part, k) =>
                      part.startsWith('**') && part.endsWith('**')
                        ? <strong key={k} className="font-semibold">{part.slice(2, -2)}</strong>
                        : part
                    )}
                  </p>
                ))}
              </div>
              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-full bg-primary shrink-0 flex items-center justify-center mt-0.5">
                  <User className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-2.5">
              <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #5b21b6, #7c3aed)' }}>
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="bg-penta-surface1 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-penta-text3 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-penta-text3 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-penta-text3 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="px-5 py-3 border-t border-border flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your finances..."
            className="flex-1 bg-penta-surface1 rounded-xl px-4 py-2.5 text-sm font-body text-penta-text1 placeholder:text-penta-text3 outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskAI;
