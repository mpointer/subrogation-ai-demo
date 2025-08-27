import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  ArrowRight,
  FileText,
  Search,
  Settings,
  Brain,
  GitBranch,
  Zap,
  Timer
} from 'lucide-react';

interface WorkflowAgent {
  id: string;
  name: string;
  type: 'ocr_parsing' | 'liability_detection' | 'rules_engine' | 'decision_agent' | 'workflow_routing';
  status: 'pending' | 'processing' | 'completed' | 'error';
  input?: any;
  output?: any;
  confidence?: number;
  processingTime?: number;
  startTime?: number;
}

interface AgentWorkflow {
  id: string;
  claimId: string;
  claimNumber: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  agents: WorkflowAgent[];
  currentStep: number;
  startTime: string;
  endTime?: string;
  totalProcessingTime?: number;
}

const mockWorkflows: AgentWorkflow[] = [
  {
    id: 'workflow-001',
    claimId: 'claim-001',
    claimNumber: 'SUB-2024-001',
    status: 'pending',
    currentStep: 0,
    startTime: '2024-08-27T10:15:00Z',
    agents: [
      {
        id: 'ocr-001',
        name: 'Document Parser',
        type: 'ocr_parsing',
        status: 'pending',
        input: { documentUrl: '/demo-data/pdfs/Provider_Claim_Note_AutoAccident.pdf', documentType: 'provider_note', pages: 3 }
      },
      {
        id: 'liability-001',
        name: 'Liability Detector',
        type: 'liability_detection',
        status: 'pending'
      },
      {
        id: 'rules-001',
        name: 'Rules Engine',
        type: 'rules_engine',
        status: 'pending'
      },
      {
        id: 'decision-001',
        name: 'Decision Agent',
        type: 'decision_agent',
        status: 'pending'
      },
      {
        id: 'routing-001',
        name: 'Workflow Router',
        type: 'workflow_routing',
        status: 'pending'
      }
    ]
  },
  {
    id: 'workflow-002',
    claimId: 'claim-002',
    claimNumber: 'SUB-2024-002',
    status: 'processing',
    currentStep: 2,
    startTime: '2024-08-27T10:25:00Z',
    agents: [
      {
        id: 'ocr-002',
        name: 'Document Parser',
        type: 'ocr_parsing',
        status: 'completed',
        processingTime: 52000,
        input: { documentUrl: '/demo-data/pdfs/Member_Letter_WorkplaceAccident.pdf', documentType: 'member_letter', pages: 2 },
        output: { extractedText: 'Injured at workplace during shift...', confidence: 0.94 }
      },
      {
        id: 'liability-002',
        name: 'Liability Detector',
        type: 'liability_detection',
        status: 'processing',
        startTime: Date.now() - 15000,
        input: { text: 'Injured at workplace during shift...', documentType: 'claim_form' }
      },
      {
        id: 'rules-002',
        name: 'Rules Engine',
        type: 'rules_engine',
        status: 'pending'
      },
      {
        id: 'decision-002',
        name: 'Decision Agent',
        type: 'decision_agent',
        status: 'pending'
      },
      {
        id: 'routing-002',
        name: 'Workflow Router',
        type: 'workflow_routing',
        status: 'pending'
      }
    ]
  }
];

const AgenticWorkflow: React.FC = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<AgentWorkflow>(mockWorkflows[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate workflow progression
  useEffect(() => {
    if (!isPlaying || selectedWorkflow.status === 'completed') return;

    const interval = setInterval(() => {
      setSelectedWorkflow(prev => {
        const newWorkflow = { ...prev };
        
        // Find the first pending agent
        const pendingAgentIndex = newWorkflow.agents.findIndex(a => a.status === 'pending');
        if (pendingAgentIndex === -1) {
          // All agents complete
          newWorkflow.status = 'completed';
          newWorkflow.endTime = new Date().toISOString();
          newWorkflow.totalProcessingTime = Date.now() - new Date(newWorkflow.startTime).getTime();
          setIsPlaying(false);
          return newWorkflow;
        }

        // Start the next pending agent
        newWorkflow.agents[pendingAgentIndex] = {
          ...newWorkflow.agents[pendingAgentIndex],
          status: 'processing',
          startTime: Date.now()
        };
        newWorkflow.currentStep = pendingAgentIndex + 1;

        // Complete any processing agents that have been running long enough
        newWorkflow.agents = newWorkflow.agents.map(agent => {
          if (agent.status === 'processing' && agent.startTime && 
              Date.now() - agent.startTime > 3000) { // 3 second simulation
            return {
              ...agent,
              status: 'completed',
              processingTime: Date.now() - agent.startTime,
              confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
              output: generateMockOutput(agent.type)
            };
          }
          return agent;
        });

        return newWorkflow;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, selectedWorkflow.status]);

  const generateMockOutput = (type: WorkflowAgent['type']) => {
    const pdfFiles = [
      'Provider_Claim_Note_AutoAccident.pdf',
      'Provider_Claim_Note_Fall.pdf', 
      'Member_Letter_WorkplaceAccident.pdf',
      'COB_Clause_AutoInsurance.pdf',
      'Employer_Letter_SickLeave.pdf'
    ];
    const randomPdf = pdfFiles[Math.floor(Math.random() * pdfFiles.length)];
    
    switch (type) {
      case 'ocr_parsing':
        return { 
          documentUrl: `/demo-data/pdfs/${randomPdf}`,
          extractedText: 'Document text extracted from PDF...', 
          confidence: 0.95 
        };
      case 'liability_detection':
        return { flagType: 'auto_accident', confidence: 87, highlightedText: 'rear-ended at intersection' };
      case 'rules_engine':
        return { recommendation: 'pursue_subrogation', priority: 'high', estimated_recovery: 8500 };
      case 'decision_agent':
        return { final_decision: 'flag_for_subrogation', confidence: 89, reasoning: 'Clear liability detected' };
      case 'workflow_routing':
        return { route: 'subrogation_queue', assigned_reviewer: 'John Smith', priority: 'high' };
      default:
        return {};
    }
  };

  const formatAgentOutput = (agent: WorkflowAgent) => {
    if (!agent.output) return null;

    switch (agent.type) {
      case 'ocr_parsing':
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-600">✓ Document Parsed Successfully</span>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">95% Confidence</span>
            </div>
            <p className="text-xs text-gray-600">Extracted {Math.floor(Math.random() * 500 + 200)} words from PDF</p>
          </div>
        );
      
      case 'liability_detection':
        const liability = agent.output as any;
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-orange-600">⚠ Liability Signal Detected</span>
              <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded">{liability.confidence}% Match</span>
            </div>
            <div className="text-xs space-y-1">
              <div><span className="font-medium">Type:</span> {liability.flagType?.replace('_', ' ').toUpperCase()}</div>
              <div><span className="font-medium">Key Phrase:</span> "{liability.highlightedText}"</div>
            </div>
          </div>
        );
      
      case 'rules_engine':
        const rules = agent.output as any;
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-purple-600">⚖ Rules Applied</span>
              <span className={`text-xs px-2 py-1 rounded ${rules.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {rules.priority?.toUpperCase()} Priority
              </span>
            </div>
            <div className="text-xs space-y-1">
              <div><span className="font-medium">Recommendation:</span> {rules.recommendation?.replace('_', ' ')}</div>
              <div><span className="font-medium">Est. Recovery:</span> ${rules.estimated_recovery?.toLocaleString()}</div>
            </div>
          </div>
        );
      
      case 'decision_agent':
        const decision = agent.output as any;
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-600">✅ Final Decision</span>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">{decision.confidence}% Confidence</span>
            </div>
            <div className="text-xs space-y-1">
              <div><span className="font-medium">Action:</span> {decision.final_decision?.replace('_', ' ')}</div>
              <div><span className="font-medium">Reasoning:</span> {decision.reasoning}</div>
            </div>
          </div>
        );
      
      case 'workflow_routing':
        const routing = agent.output as any;
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-indigo-600">🔄 Routed Successfully</span>
              <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded">Assigned</span>
            </div>
            <div className="text-xs space-y-1">
              <div><span className="font-medium">Queue:</span> {routing.route?.replace('_', ' ')}</div>
              <div><span className="font-medium">Reviewer:</span> {routing.assigned_reviewer}</div>
            </div>
          </div>
        );
      
      default:
        return <div className="text-xs text-gray-500">Processing complete</div>;
    }
  };

  const getAgentIcon = (type: WorkflowAgent['type']) => {
    switch (type) {
      case 'ocr_parsing':
        return <FileText size={20} />;
      case 'liability_detection':
        return <Search size={20} />;
      case 'rules_engine':
        return <Settings size={20} />;
      case 'decision_agent':
        return <Brain size={20} />;
      case 'workflow_routing':
        return <GitBranch size={20} />;
    }
  };

  const getStatusIcon = (status: WorkflowAgent['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'processing':
        return <Zap className="text-yellow-500 animate-pulse" size={16} />;
      case 'error':
        return <AlertTriangle className="text-red-500" size={16} />;
      default:
        return <Clock className="text-gray-400" size={16} />;
    }
  };

  const getStatusBadge = (status: WorkflowAgent['status']) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'processing':
        return `${baseClasses} bg-yellow-100 text-yellow-800 animate-pulse`;
      case 'error':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatProcessingTime = (ms?: number) => {
    if (!ms) return 'N/A';
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const getElapsedTime = (agent: WorkflowAgent) => {
    if (agent.status === 'processing' && agent.startTime) {
      return currentTime - agent.startTime;
    }
    return agent.processingTime || 0;
  };

  const calculateProgress = (workflow: AgentWorkflow) => {
    return (workflow.currentStep / workflow.agents.length) * 100;
  };

  const resetWorkflow = () => {
    setSelectedWorkflow({
      ...selectedWorkflow,
      status: 'pending',
      currentStep: 0,
      agents: selectedWorkflow.agents.map(agent => ({
        ...agent,
        status: 'pending',
        processingTime: undefined,
        startTime: undefined
      }))
    });
    setIsPlaying(false);
  };

  return (
    <div className="workflow-container space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Multi-Agent Workflow</h1>
          <p className="text-gray-400 mt-2">Real-time visualization of AI agent processing pipeline</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedWorkflow.id}
            onChange={(e) => setSelectedWorkflow(mockWorkflows.find(w => w.id === e.target.value)!)}
            className="workflow-selector"
          >
            {mockWorkflows.map(workflow => (
              <option key={workflow.id} value={workflow.id}>
                {workflow.claimNumber}
              </option>
            ))}
          </select>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="btn btn-primary flex items-center gap-2"
            disabled={selectedWorkflow.status === 'completed'}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={resetWorkflow}
            className="btn btn-secondary flex items-center gap-2"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </div>

      {/* Workflow Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="border-b border-gray-200 dark:border-gray-700 p-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Claim: {selectedWorkflow.claimNumber}</h2>
              <p className="text-gray-400">
                Status: <span className={`font-medium ${
                  selectedWorkflow.status === 'completed' ? 'text-green-500' :
                  selectedWorkflow.status === 'processing' ? 'text-yellow-500' :
                  selectedWorkflow.status === 'error' ? 'text-red-500' : 'text-gray-400'
                }`}>
                  {selectedWorkflow.status}
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Progress</p>
              <p className="text-2xl font-bold text-blue-400">
                {selectedWorkflow.currentStep}/{selectedWorkflow.agents.length}
              </p>
            </div>
          </div>
          
          <div className="workflow-progress">
            <motion.div
              className="workflow-progress-bar"
              initial={{ width: 0 }}
              animate={{ width: `${calculateProgress(selectedWorkflow)}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {selectedWorkflow.agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`agent-card ${agent.status}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`agent-icon ${agent.status}`}>
                      {getAgentIcon(agent.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{agent.name}</h3>
                        <span className={getStatusBadge(agent.status)}>
                          {agent.status}
                        </span>
                        {getStatusIcon(agent.status)}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Processing Time:</p>
                          <p className="font-medium">
                            {agent.status === 'processing' ? 
                              formatProcessingTime(getElapsedTime(agent)) : 
                              formatProcessingTime(agent.processingTime)
                            }
                          </p>
                        </div>
                        {agent.confidence && (
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Confidence:</p>
                            <p className="font-medium">{agent.confidence}%</p>
                          </div>
                        )}
                      </div>
                      
                      {agent.input && (
                        <div className="mt-3">
                          <p className="text-xs text-gray-500 mb-1">Input:</p>
                          <div className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
                            {JSON.stringify(agent.input, null, 2).slice(0, 100)}...
                          </div>
                        </div>
                      )}
                      
                      {agent.output && (
                        <div className="mt-3">
                          <p className="text-xs text-gray-500 mb-2">Result:</p>
                          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border-l-4 border-blue-400">
                            {formatAgentOutput(agent)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Timer size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-500">
                      Step {index + 1}
                    </span>
                  </div>
                </div>
                
                {index < selectedWorkflow.agents.length - 1 && (
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <ArrowRight className="text-gray-400" size={20} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Workflow Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Processing Time</p>
              <p className="text-2xl font-bold text-blue-400">
                {selectedWorkflow.totalProcessingTime ? 
                  formatTime(selectedWorkflow.totalProcessingTime) : 
                  'In Progress'
                }
              </p>
            </div>
            <Timer className="text-blue-400" size={32} />
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
              <p className="text-sm font-medium text-gray-400">Agents Completed</p>
              <p className="text-2xl font-bold text-green-400">
                {selectedWorkflow.agents.filter(a => a.status === 'completed').length}
              </p>
            </div>
            <CheckCircle className="text-green-400" size={32} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Average Confidence</p>
              <p className="text-2xl font-bold text-purple-400">
                {Math.round(
                  selectedWorkflow.agents
                    .filter(a => a.confidence)
                    .reduce((acc, a) => acc + (a.confidence || 0), 0) /
                  selectedWorkflow.agents.filter(a => a.confidence).length
                )}%
              </p>
            </div>
            <Brain className="text-purple-400" size={32} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Success Rate</p>
              <p className="text-2xl font-bold text-yellow-400">94%</p>
            </div>
            <Zap className="text-yellow-400" size={32} />
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default AgenticWorkflow;