import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { SchematicAnalyzer } from './pages/SchematicAnalyzer'
import { Activity, Globe, Box, Settings } from 'lucide-react'
import { cn } from './components/PlanetCard'

function NavItem({ to, icon: Icon, label }: { to: string, icon: any, label: string }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-l-2",
        isActive 
          ? "bg-eve-panel border-eve-accent-blue text-white" 
          : "border-transparent text-eve-text-muted hover:text-white hover:bg-eve-panel/50"
      )}
    >
      <Icon size={18} />
      {label}
    </Link>
  )
}

function Layout() {
  return (
    <div className="flex h-screen bg-eve-black text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-eve-border bg-eve-dark-gray flex flex-col">
        <div className="p-6 border-b border-eve-border">
          <h1 className="text-xl font-bold tracking-tight text-white uppercase flex items-center gap-2">
            <Activity className="text-eve-accent-blue" />
            PI Command
          </h1>
          <p className="text-[10px] text-eve-text-muted font-mono mt-1 tracking-widest">DIGITAL TWIN v0.1</p>
        </div>

        <nav className="flex-1 py-6 space-y-1">
          <NavItem to="/" icon={Globe} label="Empire Overview" />
          <NavItem to="/analyze" icon={Box} label="Schematic Analyzer" />
          <div className="pt-4 mt-4 border-t border-eve-border mx-4">
             <div className="px-4 py-2 text-xs text-eve-text-muted uppercase tracking-wider font-semibold opacity-50">Configuration</div>
             <NavItem to="/settings" icon={Settings} label="Settings" />
          </div>
        </nav>

        <div className="p-4 border-t border-eve-border bg-eve-panel/30">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-gradient-to-br from-eve-accent-blue to-blue-900" />
            <div>
              <p className="text-sm font-medium text-white">Cmdr. U240FL</p>
              <p className="text-xs text-eve-text-muted">Omega Status</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-eve-black relative">
        {/* Background Grid/Effect */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ 
               backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }} 
        />
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analyze" element={<SchematicAnalyzer />} />
            <Route path="/settings" element={<div className="p-8 text-eve-text-muted">Settings module offline.</div>} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App
