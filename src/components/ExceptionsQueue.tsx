import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, XCircle, Eye, MessageSquare, Calendar, User, TrendingUp } from 'lucide-react';

interface ExceptionCase {
  id: string;
  claimId: string;
  claimNumber: string;
  memberName: string;
  flaggedReason: string;
  aiDecision: string;
  reviewerDecision?: string;
  reviewerComments?: string;
  status: 'pending_review' | 'reviewed' | 'corrected';
  dateCreated: string;
  dateReviewed?: string;
  reviewer?: string;
  confidence: number;
  flagType: 'auto_accident' | 'workplace_injury' | 'third_party_liability' | 'coordination_of_benefits';
  highlightedText: string;
  documentSource: string;
}

const mockExceptionCases: ExceptionCase[] = [
  {
    id: 'exc-001',
    claimId: 'claim-001',
    claimNumber: 'SUB-2024-001',
    memberName: 'John Anderson',
    flaggedReason: 'Work-related injury detected',
    aiDecision: 'Flag for subrogation - workplace injury liability',
    reviewerDecision: 'Incorrect - fully covered by employer plan',
    reviewerComments: 'The accident occurred at work but the employer plan has comprehensive coverage with no coordination of benefits needed. AI needs to better distinguish between workplace accidents with and without third-party liability.',
    status: 'reviewed',
    dateCreated: '2024-08-25',
    dateReviewed: '2024-08-26',
    reviewer: 'Sarah Johnson',
    confidence: 78,
    flagType: 'workplace_injury',
    highlightedText: 'injured while operating forklift at warehouse facility',
    documentSource: 'Provider Notes - Emergency Room Visit'
  },
  {
    id: 'exc-002',
    claimId: 'claim-002',
    claimNumber: 'SUB-2024-002',
    memberName: 'Maria Garcia',
    flaggedReason: 'Auto accident coordination detected',
    aiDecision: 'Flag for coordination of benefits - dual coverage',
    status: 'pending_review',
    dateCreated: '2024-08-26',
    confidence: 82,
    flagType: 'coordination_of_benefits',
    highlightedText: 'patient has secondary insurance through spouse employer plan',
    documentSource: 'Member Verification Form'
  },
  {
    id: 'exc-003',
    claimId: 'claim-003',
    claimNumber: 'SUB-2024-003',
    memberName: 'David Kim',
    flaggedReason: 'Third-party liability suggested',
    aiDecision: 'Flag for subrogation - potential liability claim',
    reviewerDecision: 'Correct - pursuing third-party recovery',
    reviewerComments: 'Good catch by AI. Property owner liability is clear from incident report.',
    status: 'corrected',
    dateCreated: '2024-08-24',
    dateReviewed: '2024-08-25',
    reviewer: 'Mark Thompson',
    confidence: 91,
    flagType: 'third_party_liability',
    highlightedText: 'slipped on wet floor with no warning signs posted',
    documentSource: 'Incident Report'
  }
];

const ExceptionsQueue: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<ExceptionCase | null>(null);
  const [reviewDecision, setReviewDecision] = useState('');
  const [reviewComments, setReviewComments] = useState('');

  const getStatusIcon = (status: ExceptionCase['status']) => {
    switch (status) {
      case 'pending_review':
        return <AlertTriangle className="text-yellow-500" size={20} />;
      case 'reviewed':
        return <XCircle className="text-red-500" size={20} />;
      case 'corrected':
        return <CheckCircle className="text-green-500" size={20} />;
    }
  };


  const handleSubmitReview = (caseId: string) => {
    console.log(`Submitting review for case ${caseId}`, { reviewDecision, reviewComments });
    setReviewDecision('');
    setReviewComments('');
    setSelectedCase(null);
  };

  const pendingCases = mockExceptionCases.filter(c => c.status === 'pending_review');
  const reviewedCases = mockExceptionCases.filter(c => c.status !== 'pending_review');
  const accuracyRate = (reviewedCases.filter(c => c.status === 'corrected').length / reviewedCases.length * 100).toFixed(1);

  return (
    <div className="exceptions-container">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Pending Review</p>
              <p className="text-3xl font-bold text-yellow-500">{pendingCases.length}</p>
            </div>
            <AlertTriangle className="text-yellow-500" size={32} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Cases Reviewed</p>
              <p className="text-3xl font-bold text-blue-400">{reviewedCases.length}</p>
            </div>
            <Eye className="text-blue-400" size={32} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">AI Accuracy</p>
              <p className="text-3xl font-bold text-green-400">{accuracyRate}%</p>
            </div>
            <TrendingUp className="text-green-400" size={32} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Learning Rate</p>
              <p className="text-3xl font-bold text-purple-400">+15%</p>
            </div>
            <MessageSquare className="text-purple-400" size={32} />
          </div>
        </motion.div>
      </div>

      {/* Pending Reviews */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <div className="border-b border-gray-200 dark:border-gray-700 p-6 pb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <AlertTriangle className="text-yellow-500" size={24} />
            Pending Review Queue
          </h2>
          <p className="text-gray-400 mt-1">Cases requiring human review and feedback</p>
        </div>
        
        <div className="p-6">
          {pendingCases.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <CheckCircle size={48} className="mx-auto mb-4 opacity-50" />
              <p>No cases pending review</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingCases.map((exceptionCase) => (
                <motion.div
                  key={exceptionCase.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="exception-card pending"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-lg">{exceptionCase.claimNumber}</span>
                        <span className="exception-badge pending">
                          {exceptionCase.flagType.replace('_', ' ')}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-400">{exceptionCase.memberName}</span>
                      </div>
                      
                      <div className="mb-3">
                        <p className="font-medium text-gray-800 dark:text-gray-200">AI Decision:</p>
                        <p className="text-gray-600 dark:text-gray-400">{exceptionCase.aiDecision}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Confidence: {exceptionCase.confidence}% • "{exceptionCase.highlightedText}"
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setSelectedCase(exceptionCase)}
                      className="btn btn-primary ml-4"
                    >
                      Review Case
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Recent Reviews */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card"
      >
        <div className="border-b border-gray-200 dark:border-gray-700 p-6 pb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Eye className="text-blue-400" size={24} />
            Recent Reviews
          </h2>
          <p className="text-gray-400 mt-1">Completed reviews and AI learning outcomes</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {reviewedCases.map((exceptionCase) => (
              <motion.div
                key={exceptionCase.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`exception-card ${exceptionCase.status === 'corrected' ? 'corrected' : 'reviewed'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(exceptionCase.status)}
                      <span className="font-semibold">{exceptionCase.claimNumber}</span>
                      <span className={`exception-badge ${exceptionCase.status === 'corrected' ? 'corrected' : 'reviewed'}`}>
                        {exceptionCase.status.replace('_', ' ')}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-400">{exceptionCase.memberName}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium text-sm text-gray-600 dark:text-gray-400">AI Decision:</p>
                        <p className="text-gray-800 dark:text-gray-200">{exceptionCase.aiDecision}</p>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-600 dark:text-gray-400">Reviewer Decision:</p>
                        <p className="text-gray-800 dark:text-gray-200">{exceptionCase.reviewerDecision}</p>
                      </div>
                    </div>
                    
                    {exceptionCase.reviewerComments && (
                      <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                        <p className="font-medium text-sm text-gray-600 dark:text-gray-400 mb-1">Reviewer Comments:</p>
                        <p className="text-gray-700 dark:text-gray-300">{exceptionCase.reviewerComments}</p>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User size={16} />
                        {exceptionCase.reviewer}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        {exceptionCase.dateReviewed}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Review Modal */}
      {selectedCase && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedCase(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="review-modal p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
              <h3 className="text-xl font-semibold">Review Case: {selectedCase.claimNumber}</h3>
              <p className="text-gray-400">Member: {selectedCase.memberName}</p>
            </div>
            
            <div className="review-form">
              <div>
                <h4 className="font-semibold mb-2">AI Analysis</h4>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
                  <p><span className="font-medium">Flag Type:</span> {selectedCase.flagType.replace('_', ' ')}</p>
                  <p><span className="font-medium">Confidence:</span> {selectedCase.confidence}%</p>
                  <p><span className="font-medium">Decision:</span> {selectedCase.aiDecision}</p>
                  <p><span className="font-medium">Highlighted Text:</span> "{selectedCase.highlightedText}"</p>
                  <p><span className="font-medium">Source:</span> {selectedCase.documentSource}</p>
                </div>
              </div>
              
              <div>
                <label className="block font-semibold mb-2">Your Decision</label>
                <select
                  value={reviewDecision}
                  onChange={(e) => setReviewDecision(e.target.value)}
                  className="w-full"
                >
                  <option value="">Select decision...</option>
                  <option value="correct">AI was correct - pursue subrogation</option>
                  <option value="incorrect">AI was incorrect - no subrogation needed</option>
                  <option value="needs_more_info">Needs additional information</option>
                </select>
              </div>
              
              <div>
                <label className="block font-semibold mb-2">Comments & Feedback</label>
                <textarea
                  value={reviewComments}
                  onChange={(e) => setReviewComments(e.target.value)}
                  placeholder="Provide feedback to help the AI learn..."
                  className="w-full h-32"
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => handleSubmitReview(selectedCase.id)}
                  disabled={!reviewDecision || !reviewComments}
                  className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Review
                </button>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ExceptionsQueue;