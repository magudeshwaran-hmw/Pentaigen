

# PentAIGen — AI-Powered Personal Finance OS

## Phase 1: Foundation & Design System
- Set up custom CSS variables (colors, shadows, fonts) matching the PentAIGen design system
- Load Instrument Serif + Geist fonts from Google Fonts
- Install recharts (React-native charting, better than Chart.js for React) and react-markdown
- Create reusable components: MetricCard, HeroCard (CSS gradient art), AgentCard, PlatformChip

## Phase 2: Desktop Web App — Layout & Navigation
- Top navigation bar with brand logo, nav links (Dashboard, Investments, Net Worth, Ask AI, Tax), notifications, user button
- Left sidebar (220px) with grouped menu items + active state highlighting using shadcn Sidebar
- Page routing for all 5 pages with smooth transitions

## Phase 3: Desktop Pages
- **Dashboard**: Greeting, 4 metric cards, Portfolio Growth area chart, Asset Allocation donut, Monthly Spending bars, SIP vs Nifty line chart, Agent Activity bars, Transactions table
- **Investments**: 4 metric cards, Portfolio Growth chart, Asset allocation donut + bars, SIP Performance vs Nifty, Holdings table
- **Net Worth**: 4 metric cards, Net Worth Trend + Liabilities chart, Asset Breakdown bars, Tax Deduction stacked bars, Credit Score History
- **Ask AI**: Agent Activity chart, 12-agent grid with gradient art cards, FinGPT chat interface with suggestion chips
- **Tax Optimizer**: 4 metric cards, Tax Deduction Utilization stacked bar, Old vs New Regime comparison

## Phase 4: Mobile App View
- Phone device frame (375×780px, rounded corners, notch)
- Top tab switcher above frame + sticky bottom nav inside frame
- **5 screens**: Home (hero card, bank strip, quick actions, behavioral coach, platforms, transactions), Invest, Wealth, Ask AI, Profile (cover art, credit score, settings)
- All charts rendered at mobile sizes

## Phase 5: AI Chat Integration
- Enable Lovable Cloud + AI Gateway
- Edge function for FinGPT chat using Gemini via Lovable AI gateway
- System prompt tailored for Indian personal finance advice
- Streaming responses with markdown rendering
- Suggestion chips for common queries (food spending, tax savings, portfolio, retirement, fraud, credit)

## Phase 6: View Toggle & Polish
- Desktop ↔ Mobile view toggle
- All hardcoded sample data wired into charts
- Fraud transaction highlighting in rose
- 12 AI agent cards with gradient art, SVG icons, status badges
- 17 platform chips in connected platforms section
- No emojis — all Lucide SVG icons throughout

## Design Notes
- Light premium fintech aesthetic with the specified color palette
- Hero cards use CSS gradient art with grid overlays and SVG wave decorations (no external images)
- All large numbers in Instrument Serif italic
- Rounded corners: 14px cards, 18px large, 22-28px heroes
- All charts use recharts (React-friendly) with the specified color scheme and tooltip styling

