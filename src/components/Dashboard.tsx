import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  DollarSign,
  Eye
} from 'lucide-react';
import type { Claim, BusinessMetrics } from '../types';
import DocumentViewer from './DocumentViewer';

const Dashboard: React.FC = () => {
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [filter, setFilter] = useState<'all' | 'cleared' | 'low_confidence' | 'flagged_opportunity'>('all');
  const [viewingDocument, setViewingDocument] = useState<{url: string, title: string, extractedText?: string, highlights?: any[]} | null>(null);

  // Mock business metrics matching the script requirements
  const metrics: BusinessMetrics = {
    totalClaims: 420,
    clearedClaims: 320,
    lowConfidenceClaims: 65,
    flaggedOpportunities: 35,
    recoveryRate: 30,
    leakageReduction: 25,
    reviewTimeSavings: 40,
    potentialRecovery: 125000
  };

  // Mock claims data with subrogation scenarios
  const mockClaims: Claim[] = [
    {
      id: '1',
      claimNumber: 'CLM-2024-0001',
      memberName: 'Sarah Johnson',
      dateOfService: '2024-01-15',
      provider: 'Metro General Hospital',
      totalAmount: 15750.00,
      status: 'flagged_opportunity',
      confidence: 0.89,
      subrogationFlag: {
        type: 'auto_accident',
        confidence: 0.89,
        reasoning: 'Member was injured in an auto accident while at work',
        highlightedText: 'Member was injured in an auto accident while at work',
        documentSource: 'Provider Emergency Department Note'
      },
      documents: [
        {
          id: 'doc1',
          type: 'provider_note',
          title: 'Provider Claim Note - Auto Accident',
          content: '/demo-data/pdfs/Provider_Claim_Note_AutoAccident.pdf',
          extractedText: 'Patient Sarah Johnson presented to ED at 14:30 following motor vehicle accident. Member was injured in an auto accident while at work. Patient reports being rear-ended at intersection while driving company vehicle. Sustained whiplash injury and lower back pain. Treatment provided for acute cervical strain and lumbar sprain.',
        }
      ],
      notes: [
        {
          id: 'note1',
          author: 'Dr. Michael Chen',
          timestamp: '2024-01-15T14:30:00',
          content: 'MVA at workplace - potential third-party liability and workers comp coordination',
          type: 'provider_note'
        }
      ]
    },
    {
      id: '2',
      claimNumber: 'CLM-2024-0002',
      memberName: 'David Rodriguez',
      dateOfService: '2024-01-20',
      provider: 'Riverside Orthopedic Clinic',
      totalAmount: 8500.00,
      status: 'low_confidence',
      confidence: 0.45,
      subrogationFlag: {
        type: 'workplace_injury',
        confidence: 0.45,
        reasoning: 'Mention of work-related activity but ambiguous context',
        highlightedText: 'injury occurred during team building exercise',
        documentSource: 'Initial Assessment Note'
      },
      documents: [
        {
          id: 'doc2',
          type: 'member_letter',
          title: 'Member Letter - Workplace Accident',
          content: '/demo-data/pdfs/Member_Letter_WorkplaceAccident.pdf',
          extractedText: 'Patient David Rodriguez presents with right shoulder injury. Reports that injury occurred during team building exercise organized by employer. However, exercise was voluntary and off-site recreational activity. Diagnosed with rotator cuff strain.',
        }
      ],
      notes: []
    },
    {
      id: '3',
      claimNumber: 'CLM-2024-0003',
      memberName: 'Jennifer Martinez',
      dateOfService: '2024-01-18',
      provider: 'Central Family Practice',
      totalAmount: 450.00,
      status: 'cleared',
      confidence: 0.95,
      documents: [
        {
          id: 'doc3',
          type: 'provider_note',
          title: 'Annual Physical Examination',
          content: 'Routine annual physical examination for 34-year-old female. No acute complaints. All systems reviewed and within normal limits. Preventive care provided.',
        }
      ],
      notes: []
    },
    {
      id: '4',
      claimNumber: 'CLM-2024-0004',
      memberName: 'Michael Thompson',
      dateOfService: '2024-01-25',
      provider: 'Downtown Medical Center',
      totalAmount: 3200.00,
      status: 'flagged_opportunity',
      confidence: 0.91,
      subrogationFlag: {
        type: 'third_party_liability',
        confidence: 0.91,
        reasoning: 'Slip and fall incident on commercial property with clear liability indicators',
        highlightedText: 'wet floor with no warning signs in grocery store',
        documentSource: 'Provider Claim Note - Fall Incident'
      },
      documents: [
        {
          id: 'doc4',
          type: 'provider_note',
          title: 'Provider Claim Note - Fall',
          content: '/demo-data/pdfs/Provider_Claim_Note_Fall.pdf',
          extractedText: 'Patient Michael Thompson, age 42, sustained injuries from fall at grocery store. Patient reports slipping on wet floor with no warning signs posted. Sustained fractured left wrist and contusions. Property owner liability investigation recommended.',
        }
      ],
      notes: [
        {
          id: 'note4',
          author: 'Dr. Lisa Wang',
          timestamp: '2024-01-25T16:45:00',
          content: 'Clear premises liability case - recommend immediate subrogation pursuit',
          type: 'provider_note'
        }
      ]
    },
    {
      id: '5',
      claimNumber: 'CLM-2024-0005',
      memberName: 'Robert Davis',
      dateOfService: '2024-01-30',
      provider: 'Occupational Health Services',
      totalAmount: 1850.00,
      status: 'low_confidence',
      confidence: 0.35,
      subrogationFlag: {
        type: 'workplace_injury',
        confidence: 0.35,
        reasoning: 'Work-related context but covered under existing employer benefits',
        highlightedText: 'injury during approved sick leave period',
        documentSource: 'Employer Letter - Sick Leave'
      },
      documents: [
        {
          id: 'doc5',
          type: 'policy_excerpt',
          title: 'Employer Letter - Sick Leave Policy',
          content: '/demo-data/pdfs/Employer_Letter_SickLeave.pdf',
          extractedText: 'Employee Robert Davis was on approved sick leave when injury occurred. Per company policy, all medical expenses during approved leave periods are covered under standard health benefits with no coordination of benefits required.',
        }
      ],
      notes: []
    },
    {
      id: '6',
      claimNumber: 'CLM-2024-0006',
      memberName: 'Amanda Wilson',
      dateOfService: '2024-02-05',
      provider: 'Regional Urgent Care',
      totalAmount: 950.00,
      status: 'flagged_opportunity',
      confidence: 0.78,
      subrogationFlag: {
        type: 'coordination_of_benefits',
        confidence: 0.78,
        reasoning: 'Dual insurance coverage detected requiring coordination of benefits',
        highlightedText: 'secondary coverage through spouse employer plan',
        documentSource: 'COB Clause - Auto Insurance'
      },
      documents: [
        {
          id: 'doc6',
          type: 'policy_excerpt',
          title: 'COB Clause - Auto Insurance Policy',
          content: '/demo-data/pdfs/COB_Clause_AutoInsurance.pdf',
          extractedText: 'Policy holder Amanda Wilson has secondary coverage through spouse employer plan. Coordination of Benefits clause requires primary insurer determination before processing claims. Auto insurance may be primary for motor vehicle related injuries.',
        }
      ],
      notes: [
        {
          id: 'note6',
          author: 'Claims Analyst',
          timestamp: '2024-02-05T11:20:00',
          content: 'COB investigation required - potential auto insurance primary coverage',
          type: 'system_note'
        }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'cleared':
        return <CheckCircle className="text-green-400" size={20} />;
      case 'low_confidence':
        return <AlertTriangle className="text-yellow-400" size={20} />;
      case 'flagged_opportunity':
        return <DollarSign className="text-red-400" size={20} />;
      default:
        return <FileText className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'cleared':
        return 'bg-green-900/30 text-green-300 border-green-500/50';
      case 'low_confidence':
        return 'bg-yellow-900/30 text-yellow-300 border-yellow-500/50';
      case 'flagged_opportunity':
        return 'bg-red-900/30 text-red-300 border-red-500/50';
      default:
        return 'bg-gray-900/30 text-gray-300 border-gray-500/50';
    }
  };

  const filteredClaims = filter === 'all' ? mockClaims : mockClaims.filter(claim => claim.status === filter);

  return (
    <div className="dashboard">
      {/* Header Stats */}
      <div className="stats-grid">
        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-icon">
            <FileText className="text-blue-400" size={24} />
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{metrics.totalClaims}</h3>
            <p className="stat-label">Claims Processed</p>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stat-icon">
            <CheckCircle className="text-green-400" size={24} />
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{metrics.clearedClaims}</h3>
            <p className="stat-label">Auto-Cleared</p>
            <span className="stat-subtitle">No third-party liability detected</span>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="stat-icon">
            <AlertTriangle className="text-yellow-400" size={24} />
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{metrics.lowConfidenceClaims}</h3>
            <p className="stat-label">Low Confidence</p>
            <span className="stat-subtitle">Requires review</span>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="stat-icon">
            <DollarSign className="text-red-400" size={24} />
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{metrics.flaggedOpportunities}</h3>
            <p className="stat-label">Subrogation Opportunities</p>
            <span className="stat-subtitle">${metrics.potentialRecovery.toLocaleString()} potential recovery</span>
          </div>
        </motion.div>
      </div>

      {/* Claims Table */}
      <div className="claims-section">
        <div className="section-header">
          <h2>Claims Dashboard - Subrogation Alerts</h2>
          <div className="filters">
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value as any)}
              className="filter-select"
            >
              <option value="all">All Claims ({metrics.totalClaims})</option>
              <option value="cleared">Cleared ({metrics.clearedClaims})</option>
              <option value="low_confidence">Low Confidence ({metrics.lowConfidenceClaims})</option>
              <option value="flagged_opportunity">Flagged Opportunities ({metrics.flaggedOpportunities})</option>
            </select>
          </div>
        </div>

        <div className="claims-table">
          <div className="table-header">
            <div className="header-cell">Status</div>
            <div className="header-cell">Claim Number</div>
            <div className="header-cell">Member</div>
            <div className="header-cell">Provider</div>
            <div className="header-cell">Amount</div>
            <div className="header-cell">Confidence</div>
            <div className="header-cell">Action</div>
          </div>
          
          {filteredClaims.map((claim, index) => (
            <motion.div 
              key={claim.id}
              className="table-row"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="cell">
                <div className={`status-badge ${getStatusColor(claim.status)}`}>
                  {getStatusIcon(claim.status)}
                  <span className="ml-2">
                    {claim.status === 'cleared' ? 'Clear' :
                     claim.status === 'low_confidence' ? 'Review' : 'Opportunity'}
                  </span>
                </div>
              </div>
              <div className="cell">{claim.claimNumber}</div>
              <div className="cell">{claim.memberName}</div>
              <div className="cell">{claim.provider}</div>
              <div className="cell">${claim.totalAmount.toLocaleString()}</div>
              <div className="cell">
                <div className="confidence-bar">
                  <div 
                    className="confidence-fill" 
                    style={{ width: `${claim.confidence * 100}%` }}
                  />
                  <span className="confidence-text">{Math.round(claim.confidence * 100)}%</span>
                </div>
              </div>
              <div className="cell">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setSelectedClaim(claim)}
                >
                  <Eye size={16} />
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Claim Detail Modal */}
      {selectedClaim && (
        <div className="modal-overlay" onClick={() => setSelectedClaim(null)}>
          <motion.div 
            className="claim-detail-modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Claim Details - {selectedClaim.claimNumber}</h3>
              <button 
                className="modal-close"
                onClick={() => setSelectedClaim(null)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <div className="claim-summary">
                <div className="summary-item">
                  <label>Member:</label>
                  <span>{selectedClaim.memberName}</span>
                </div>
                <div className="summary-item">
                  <label>Date of Service:</label>
                  <span>{selectedClaim.dateOfService}</span>
                </div>
                <div className="summary-item">
                  <label>Total Amount:</label>
                  <span>${selectedClaim.totalAmount.toLocaleString()}</span>
                </div>
                <div className="summary-item">
                  <label>Status:</label>
                  <span className={`status-badge ${getStatusColor(selectedClaim.status)}`}>
                    {getStatusIcon(selectedClaim.status)}
                    <span className="ml-2">
                      {selectedClaim.status === 'cleared' ? 'Clear' :
                       selectedClaim.status === 'low_confidence' ? 'Needs Review' : 'Subrogation Opportunity'}
                    </span>
                  </span>
                </div>
              </div>

              {selectedClaim.subrogationFlag && (
                <div className="subrogation-alert">
                  <h4>Subrogation Alert</h4>
                  <div className="alert-content">
                    <div className="alert-item">
                      <label>Type:</label>
                      <span>{selectedClaim.subrogationFlag.type.replace('_', ' ').toUpperCase()}</span>
                    </div>
                    <div className="alert-item">
                      <label>AI Reasoning:</label>
                      <span>{selectedClaim.subrogationFlag.reasoning}</span>
                    </div>
                    <div className="alert-item">
                      <label>Source Document:</label>
                      <span>{selectedClaim.subrogationFlag.documentSource}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="document-excerpt">
                <div className="flex items-center justify-between mb-3">
                  <h4>Key Document Excerpt</h4>
                  {selectedClaim.documents[0]?.content.startsWith('/demo-data/pdfs/') && (
                    <button
                      onClick={() => setViewingDocument({
                        url: selectedClaim.documents[0].content,
                        title: selectedClaim.documents[0].title,
                        extractedText: selectedClaim.documents[0].extractedText,
                        highlights: selectedClaim.documents[0].highlights
                      })}
                      className="btn btn-secondary flex items-center gap-2"
                    >
                      <Eye size={16} />
                      View Full PDF
                    </button>
                  )}
                </div>
                <div className="excerpt-content">
                  {selectedClaim.documents[0]?.extractedText && (
                    <p>
                      {selectedClaim.subrogationFlag ? (
                        <>
                          {selectedClaim.documents[0].extractedText.split(selectedClaim.subrogationFlag.highlightedText)[0]}
                          <mark className="highlight">
                            {selectedClaim.subrogationFlag.highlightedText}
                          </mark>
                          {selectedClaim.documents[0].extractedText.split(selectedClaim.subrogationFlag.highlightedText)[1]}
                        </>
                      ) : (
                        selectedClaim.documents[0].extractedText
                      )}
                    </p>
                  )}
                </div>
                <p className="excerpt-note">
                  <strong>AI Analysis:</strong> That single sentence, buried in a provider note, changes the payer's financial responsibility. Without AI, it would be missed.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <style>{`
        .dashboard {
          padding: 2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .stat-card {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .stat-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: var(--hover-bg);
          border-radius: 10px;
        }

        .stat-content {
          flex: 1;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .stat-subtitle {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .claims-section {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 2rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .section-header h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .filter-select {
          background: var(--input-bg);
          border: 1px solid var(--border-color);
          border-radius: 6px;
          padding: 0.5rem 1rem;
          color: var(--text-primary);
          font-size: 0.875rem;
        }

        .claims-table {
          width: 100%;
        }

        .table-header {
          display: grid;
          grid-template-columns: 140px 120px 140px 200px 100px 120px 120px;
          gap: 1rem;
          padding: 1rem;
          background: var(--hover-bg);
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .header-cell {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .table-row {
          display: grid;
          grid-template-columns: 140px 120px 140px 200px 100px 120px 120px;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          margin-bottom: 0.5rem;
          transition: background 0.2s;
        }

        .table-row:hover {
          background: var(--hover-bg);
        }

        .cell {
          display: flex;
          align-items: center;
          font-size: 0.875rem;
          color: var(--text-primary);
        }

        .status-badge {
          display: flex;
          align-items: center;
          padding: 0.375rem 0.75rem;
          border-radius: 20px;
          border: 1px solid;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .confidence-bar {
          position: relative;
          width: 80px;
          height: 20px;
          background: var(--hover-bg);
          border-radius: 10px;
          overflow: hidden;
        }

        .confidence-fill {
          height: 100%;
          background: var(--primary-blue);
          border-radius: 10px;
          transition: width 0.3s;
        }

        .confidence-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-primary);
          text-shadow: 0 0 2px rgba(0,0,0,0.5);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .claim-detail-modal {
          background: var(--card-bg-solid);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          width: 90%;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .modal-header h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 0.25rem;
        }

        .modal-content {
          padding: 1.5rem;
        }

        .claim-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .summary-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .summary-item label {
          font-size: 0.875rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .summary-item span {
          font-size: 1rem;
          color: var(--text-primary);
        }

        .subrogation-alert {
          background: rgba(220, 38, 38, 0.1);
          border: 1px solid rgba(220, 38, 38, 0.3);
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .subrogation-alert h4 {
          color: #f87171;
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .alert-content {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .alert-item {
          display: flex;
          gap: 1rem;
        }

        .alert-item label {
          font-size: 0.875rem;
          color: var(--text-secondary);
          font-weight: 600;
          min-width: 120px;
        }

        .alert-item span {
          font-size: 0.875rem;
          color: var(--text-primary);
        }

        .document-excerpt {
          background: var(--hover-bg);
          border-radius: 8px;
          padding: 1.5rem;
        }

        .document-excerpt h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .excerpt-content {
          margin-bottom: 1rem;
        }

        .excerpt-content p {
          line-height: 1.6;
          color: var(--text-primary);
        }

        .highlight {
          background: rgba(245, 158, 11, 0.3);
          border-radius: 4px;
          padding: 0.125rem 0.25rem;
          font-weight: 600;
        }

        .excerpt-note {
          font-style: italic;
          color: var(--text-secondary);
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .ml-2 {
          margin-left: 0.5rem;
        }
      `}</style>

      {/* Document Viewer */}
      {viewingDocument && (
        <DocumentViewer
          documentUrl={viewingDocument.url}
          title={viewingDocument.title}
          extractedText={viewingDocument.extractedText}
          highlights={viewingDocument.highlights}
          onClose={() => setViewingDocument(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;