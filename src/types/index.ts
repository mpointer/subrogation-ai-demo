// Core types for Subrogation Demo
export interface Claim {
  id: string;
  claimNumber: string;
  memberName: string;
  dateOfService: string;
  provider: string;
  totalAmount: number;
  status: 'cleared' | 'low_confidence' | 'flagged_opportunity';
  confidence: number;
  subrogationFlag?: SubrogationFlag;
  documents: ClaimDocument[];
  notes: ClaimNote[];
}

export interface SubrogationFlag {
  type: 'auto_accident' | 'workplace_injury' | 'third_party_liability' | 'coordination_of_benefits';
  confidence: number;
  reasoning: string;
  highlightedText: string;
  documentSource: string;
}

export interface ClaimDocument {
  id: string;
  type: 'provider_note' | 'member_letter' | 'policy_excerpt' | 'claim_form';
  title: string;
  content: string;
  extractedText?: string;
  highlights?: TextHighlight[];
}

export interface TextHighlight {
  text: string;
  start: number;
  end: number;
  type: 'liability_signal' | 'accident_description' | 'coordination_benefit';
  confidence: number;
}

export interface ClaimNote {
  id: string;
  author: string;
  timestamp: string;
  content: string;
  type: 'provider_note' | 'reviewer_note' | 'system_note';
}

export interface BusinessMetrics {
  totalClaims: number;
  clearedClaims: number;
  lowConfidenceClaims: number;
  flaggedOpportunities: number;
  recoveryRate: number;
  leakageReduction: number;
  reviewTimeSavings: number;
  potentialRecovery: number;
}

export interface AgentWorkflow {
  id: string;
  claimId: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  agents: WorkflowAgent[];
  currentStep: number;
  startTime: string;
  endTime?: string;
}

export interface WorkflowAgent {
  id: string;
  name: string;
  type: 'ocr_parsing' | 'liability_detection' | 'rules_engine' | 'decision_agent' | 'workflow_routing';
  status: 'pending' | 'processing' | 'completed' | 'error';
  input?: any;
  output?: any;
  confidence?: number;
  processingTime?: number;
}

export interface ExceptionCase {
  id: string;
  claimId: string;
  flaggedReason: string;
  aiDecision: string;
  reviewerDecision?: string;
  reviewerComments?: string;
  status: 'pending_review' | 'reviewed' | 'corrected';
  dateCreated: string;
  dateReviewed?: string;
  reviewer?: string;
}