import React, { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { DashboardPage } from './pages/Dashboard';
import { AgentsPage } from './pages/AgentsPage';
import { VaultPage } from './pages/VaultPage';
import { EscrowPage } from './pages/EscrowPage';
import { CRMPage } from './pages/CRMPage';
import { CampaignsPage } from './pages/CampaignsPage';
import { IntegrationsPage } from './pages/IntegrationsPage';
import { ConnectAccountModal } from './components/Modals/ConnectAccountModal';
import { BotConfigPanel } from './components/BotConfig/BotConfigPanel';
import { AgentWindow } from './components/Floating/AgentWindow';
import { ViewType, ActiveAgent } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isBotConfigOpen, setIsBotConfigOpen] = useState(false);
  const [activeWindows, setActiveWindows] = useState<ActiveAgent[]>([]);

  // Navigation Handler
  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
  };

  // Agent Window Handler
  const handleOpenAgentWindow = (agent: ActiveAgent) => {
    if (!activeWindows.find(a => a.id === agent.id)) {
      setActiveWindows(prev => [...prev, agent]);
    }
  };

  const handleCloseAgentWindow = (agentId: string) => {
    setActiveWindows(prev => prev.filter(a => a.id !== agentId));
  };

  const handleStartBot = (config: any) => {
    console.log("Starting bot with config:", config);
    setIsBotConfigOpen(false);
    // Here you would add the new agent to state
  };

  return (
    <div className="min-h-screen bg-tactical-bg text-slate-200 font-sans selection:bg-tactical-primary/30">
      <Sidebar currentView={currentView} onNavigate={handleNavigate} />
      
      <div className="lg:pl-20 xl:pl-64 transition-all duration-300">
        <Header />
        <main>
          {currentView === 'dashboard' && (
            <DashboardPage onAgentClick={handleOpenAgentWindow} />
          )}
          {currentView === 'agents' && (
            <AgentsPage 
              onConnectClick={() => setIsBotConfigOpen(true)} 
              onAgentClick={handleOpenAgentWindow}
            />
          )}
          {currentView === 'campaigns' && <CampaignsPage />}
          {currentView === 'integrations' && <IntegrationsPage />}
          {currentView === 'vault' && <VaultPage />}
          {currentView === 'escrow' && <EscrowPage />}
          {currentView === 'crm' && <CRMPage />}
          
          {(currentView === 'security' || currentView === 'settings') && (
            <div className="p-8 flex items-center justify-center h-[80vh] text-slate-500 font-mono">
               Módulo en construcción: {currentView.toUpperCase()}
            </div>
          )}
        </main>
      </div>
      
      {/* Background ambient effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-tactical-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-tactical-secondary/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Modals & Overlays */}
      <ConnectAccountModal 
        isOpen={isConnectModalOpen} 
        onClose={() => setIsConnectModalOpen(false)} 
      />

      {isBotConfigOpen && (
        <BotConfigPanel 
          onClose={() => setIsBotConfigOpen(false)} 
          onStart={handleStartBot} 
        />
      )}

      {/* Floating Windows Stack */}
      {activeWindows.map((agent, index) => (
        <AgentWindow 
          key={agent.id} 
          agent={agent} 
          index={index} 
          onClose={() => handleCloseAgentWindow(agent.id)} 
        />
      ))}

    </div>
  );
};

export default App;
