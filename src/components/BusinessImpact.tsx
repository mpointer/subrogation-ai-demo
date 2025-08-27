import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Clock, 
  Shield,
  Target
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

const BusinessImpact: React.FC = () => {
  // Mock data for impact metrics
  const impactMetrics = [
    {
      title: 'Subrogation Recovery Rate',
      current: 30,
      previous: 15,
      change: 15,
      trend: 'up',
      format: '%',
      icon: TrendingUp,
      description: 'Recovery rates doubled from industry baseline'
    },
    {
      title: 'Claim Leakage Reduction',
      current: 25,
      previous: 45,
      change: -20,
      trend: 'down',
      format: '%',
      icon: TrendingDown,
      description: 'Significant reduction in missed opportunities'
    },
    {
      title: 'Review Time Savings',
      current: 40,
      previous: 100,
      change: -60,
      trend: 'down',
      format: '%',
      icon: Clock,
      description: 'Automated processing reduces manual review time'
    },
    {
      title: 'Recovery per Case',
      current: 3571,
      previous: 2150,
      change: 1421,
      trend: 'up',
      format: '$',
      icon: DollarSign,
      description: 'Higher value recoveries through better detection'
    }
  ];

  // Recovery trend data
  const recoveryTrendData = [
    { month: 'Jan', withoutAI: 15, withAI: 22 },
    { month: 'Feb', withoutAI: 16, withAI: 25 },
    { month: 'Mar', withoutAI: 14, withAI: 28 },
    { month: 'Apr', withoutAI: 17, withAI: 30 },
    { month: 'May', withoutAI: 15, withAI: 32 },
    { month: 'Jun', withoutAI: 16, withAI: 35 }
  ];

  // Subrogation opportunity types
  const opportunityTypes = [
    { name: 'Auto Accidents', value: 45, color: '#3b82f6' },
    { name: 'Workplace Injuries', value: 30, color: '#10b981' },
    { name: 'Third-Party Liability', value: 15, color: '#f59e0b' },
    { name: 'Coordination of Benefits', value: 10, color: '#ef4444' }
  ];

  // Financial impact breakdown
  const financialBreakdown = [
    {
      category: 'Direct Recovery',
      amount: 1250000,
      description: 'Funds recovered from liable parties'
    },
    {
      category: 'Leakage Prevention',
      amount: 875000,
      description: 'Claims correctly processed, avoiding overpayment'
    },
    {
      category: 'Operational Savings',
      amount: 320000,
      description: 'Reduced manual review and processing costs'
    },
    {
      category: 'Compliance Value',
      amount: 180000,
      description: 'Risk mitigation and regulatory compliance'
    }
  ];

  const totalImpact = financialBreakdown.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="business-impact">
      <div className="page-header">
        <h1>Business Impact Analysis</h1>
        <p className="page-subtitle">
          Why It Matters – Recovery & Compliance. Every dollar recovered is pure margin for the payer, 
          and every ambiguous case resolved reduces compliance and legal risk.
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="metrics-grid">
        {impactMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div 
              key={metric.title}
              className="metric-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="metric-header">
                <div className="metric-icon">
                  <Icon className={metric.trend === 'up' ? 'text-green-400' : 'text-blue-400'} size={24} />
                </div>
                <div className="metric-change">
                  <span className={`change-badge ${metric.trend === 'up' ? 'positive' : 'improvement'}`}>
                    {metric.trend === 'up' ? '+' : ''}{metric.change}{metric.format}
                  </span>
                </div>
              </div>
              <div className="metric-content">
                <h3 className="metric-title">{metric.title}</h3>
                <div className="metric-value">
                  {metric.format === '$' ? '$' : ''}{metric.current.toLocaleString()}{metric.format === '%' ? '%' : ''}
                </div>
                <p className="metric-description">{metric.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recovery Trends Chart */}
      <motion.div 
        className="chart-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="section-header">
          <h2>Recovery Rate Comparison: With AI vs Without AI</h2>
          <p>Demonstrating the clear advantage of AI-powered subrogation detection</p>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={recoveryTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="month" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--card-bg-solid)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)'
                }}
              />
              <Bar dataKey="withoutAI" fill="#6b7280" name="Without AI" />
              <Bar dataKey="withAI" fill="#3b82f6" name="With AI" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Opportunity Types */}
      <div className="opportunities-section">
        <motion.div 
          className="opportunity-chart"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3>Subrogation Opportunity Types</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={opportunityTypes}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {opportunityTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--card-bg-solid)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)'
                }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="legend">
            {opportunityTypes.map((type) => (
              <div key={type.name} className="legend-item">
                <div className="legend-color" style={{ backgroundColor: type.color }}></div>
                <span>{type.name} ({type.value}%)</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="key-insights"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3>Key Insights</h3>
          <div className="insights-list">
            <div className="insight-item">
              <Shield className="text-blue-400" size={20} />
              <div>
                <h4>Systematic Detection</h4>
                <p>AI identifies patterns in clinical notes that human reviewers often miss, especially in complex multi-party scenarios.</p>
              </div>
            </div>
            <div className="insight-item">
              <Target className="text-green-400" size={20} />
              <div>
                <h4>Precision Targeting</h4>
                <p>Focus resources on high-value cases with genuine recovery potential, reducing wasted investigative effort.</p>
              </div>
            </div>
            <div className="insight-item">
              <DollarSign className="text-yellow-400" size={20} />
              <div>
                <h4>Pure Margin Impact</h4>
                <p>Every successful recovery directly impacts the bottom line, with industry-leading recovery rates.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Financial Impact Summary */}
      <motion.div 
        className="financial-summary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <div className="summary-header">
          <h2>Annual Financial Impact</h2>
          <div className="total-impact">
            <span className="impact-label">Total Value Created</span>
            <span className="impact-amount">${totalImpact.toLocaleString()}</span>
          </div>
        </div>
        <div className="breakdown-grid">
          {financialBreakdown.map((item) => (
            <div key={item.category} className="breakdown-item">
              <div className="breakdown-header">
                <h4>{item.category}</h4>
                <span className="breakdown-amount">${item.amount.toLocaleString()}</span>
              </div>
              <p className="breakdown-description">{item.description}</p>
              <div className="breakdown-bar">
                <div 
                  className="breakdown-fill" 
                  style={{ width: `${(item.amount / totalImpact) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <style>{`
        .business-impact {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .page-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .page-subtitle {
          font-size: 1.125rem;
          color: var(--text-secondary);
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .metric-card {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 2rem;
        }

        .metric-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .metric-icon {
          background: var(--hover-bg);
          border-radius: 10px;
          padding: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .change-badge {
          padding: 0.375rem 0.75rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .change-badge.positive {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }

        .change-badge.improvement {
          background: rgba(59, 130, 246, 0.2);
          color: #3b82f6;
        }

        .metric-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        .metric-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .metric-description {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .chart-section {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 3rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .section-header h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .section-header p {
          color: var(--text-secondary);
        }

        .chart-container {
          height: 400px;
        }

        .opportunities-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .opportunity-chart {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 2rem;
        }

        .opportunity-chart h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .legend {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--text-primary);
        }

        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 2px;
        }

        .key-insights {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 2rem;
        }

        .key-insights h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .insights-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .insight-item {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .insight-item h4 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .insight-item p {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .financial-summary {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 2rem;
        }

        .summary-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .summary-header h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .total-impact {
          text-align: right;
        }

        .impact-label {
          display: block;
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 0.25rem;
        }

        .impact-amount {
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary-green);
        }

        .breakdown-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .breakdown-item {
          background: var(--hover-bg);
          border-radius: 8px;
          padding: 1.5rem;
        }

        .breakdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .breakdown-header h4 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .breakdown-amount {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--primary-green);
        }

        .breakdown-description {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-bottom: 1rem;
        }

        .breakdown-bar {
          height: 6px;
          background: var(--border-color);
          border-radius: 3px;
          overflow: hidden;
        }

        .breakdown-fill {
          height: 100%;
          background: var(--primary-green);
          border-radius: 3px;
          transition: width 0.6s ease;
        }

        @media (max-width: 768px) {
          .opportunities-section {
            grid-template-columns: 1fr;
          }
          
          .summary-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default BusinessImpact;