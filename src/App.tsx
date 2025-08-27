import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import Dashboard from './components/Dashboard';
import BusinessImpact from './components/BusinessImpact';
import ExceptionsQueue from './components/ExceptionsQueue';
import AgenticWorkflow from './components/AgenticWorkflow';
import './App.css';

type ViewType = 'dashboard' | 'business' | 'exceptions' | 'workflow';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'business':
        return <BusinessImpact />;
      case 'exceptions':
        return <ExceptionsQueue />;
      case 'workflow':
        return <AgenticWorkflow />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo-container">
          <h1 className="app-title">Subrogation AI Platform</h1>
          <span className="text-xs text-gray-500 ml-2">v{Date.now()}</span>
        </div>
        
        <nav className="main-nav">
          <button 
            className={currentView === 'dashboard' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setCurrentView('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={currentView === 'business' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setCurrentView('business')}
          >
            Business Impact
          </button>
          <button 
            className={currentView === 'exceptions' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setCurrentView('exceptions')}
          >
            Exceptions Queue
          </button>
          <button 
            className={currentView === 'workflow' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setCurrentView('workflow')}
          >
            Agentic AI
          </button>
        </nav>

        <div className="header-right">
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <main className="main-content">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;