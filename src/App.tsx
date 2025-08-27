import React from 'react';
import { Moon, Sun } from 'lucide-react';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="logo-container">
          <h1 className="app-title">Subrogation Demo</h1>
        </div>
        <div className="header-right">
          <button className="theme-toggle">
            <Sun size={20} />
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="card">
          <h2>Property & Casualty Subrogation Platform</h2>
          <p>Ready for requirements implementation...</p>
        </div>
      </main>
    </div>
  );
}

export default App;