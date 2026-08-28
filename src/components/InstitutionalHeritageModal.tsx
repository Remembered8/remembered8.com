import React, { useState } from 'react';
import { 
  X, Award, Layers, Building, FileText, CheckCircle2, ArrowRight, 
  Shield, Code2, Database, Key, Globe, Terminal, Sparkles, Cpu,
  BookmarkCheck, BookOpen, Mic, Camera, ShieldCheck, Zap
} from 'lucide-react';

interface InstitutionalHeritageModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'archive' | 'api';
}

export const InstitutionalHeritageModal: React.FC<InstitutionalHeritageModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'archive',
}) => {
  const [activeTab, setActiveTab] = useState<'archive' | 'api'>(initialTab);
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [orgName, setOrgName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [projectScope, setProjectScope] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Dynamic Themed Modal: Terracotta/Ruby for Archive, Indigo/Cyan for API */}
      <div className={`w-full max-w-5xl max-h-[94vh] flex flex-col shadow-2xl rounded-sm overflow-hidden border-2 transition-colors duration-300 ${
        activeTab === 'archive'
          ? 'bg-[#180E0E] text-[#FFF5F5] border-[#5A2929] ring-1 ring-red-500/20'
          : 'bg-[#0B111A] text-[#F0F6FC] border-[#223954] ring-1 ring-cyan-500/20'
      }`}>
        
        {/* Modal Top Header */}
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between transition-colors ${
          activeTab === 'archive'
            ? 'bg-[#221313] border-[#3D1E1E]'
            : 'bg-[#101A26] border-[#1A2C40]'
        }`}>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
              activeTab === 'archive'
                ? 'bg-red-500/20 border border-red-500/40 text-red-300'
                : 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300'
            }`}>
              {activeTab === 'archive' ? <Award className="w-6 h-6 text-red-400" /> : <Terminal className="w-6 h-6 text-cyan-400" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-mono uppercase tracking-[0.25em] px-2 py-0.5 font-bold rounded-xs border ${
                  activeTab === 'archive'
                    ? 'bg-red-950 text-red-200 border-red-800'
                    : 'bg-cyan-950 text-cyan-200 border-cyan-800'
                }`}>
                  {activeTab === 'archive' ? 'REMEMBERED HERITAGE INSTITUTE' : 'REMEMBERED DEVELOPER PLATFORM'}
                </span>
                <span className={`text-xs font-mono hidden sm:inline-block ${
                  activeTab === 'archive' ? 'text-red-400/70' : 'text-cyan-400/70'
                }`}>
                  • {activeTab === 'archive' ? 'Academic & Museum-Grade Preservation' : 'Enterprise SaaS & Pedigree Data Engine'}
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-black mt-0.5">
                {activeTab === 'archive' ? 'Historical Figures & Institutional Archive Programs' : 'Remembered Heritage API & Data Infrastructure'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 border border-white/10 bg-black/30 hover:bg-white/20 flex items-center justify-center transition rounded-xs text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle Navigation */}
        <div className={`border-b px-4 flex items-center gap-2 transition-colors ${
          activeTab === 'archive' ? 'bg-[#150B0B] border-[#3D1E1E]' : 'bg-[#080E16] border-[#1A2C40]'
        }`}>
          <button
            onClick={() => setActiveTab('archive')}
            className={`py-3.5 px-5 text-xs font-mono uppercase tracking-wider font-bold transition border-b-2 flex items-center gap-2.5 cursor-pointer ${
              activeTab === 'archive'
                ? 'border-red-400 text-red-200 bg-red-950/40 shadow-inner'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4 text-red-400" />
            <span>1. Foundation, Museum & Institutional Archives</span>
          </button>

          <button
            onClick={() => setActiveTab('api')}
            className={`py-3.5 px-5 text-xs font-mono uppercase tracking-wider font-bold transition border-b-2 flex items-center gap-2.5 cursor-pointer ${
              activeTab === 'api'
                ? 'border-cyan-400 text-cyan-200 bg-cyan-950/40 shadow-inner'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>2. Developer API & Heritage SaaS Engine</span>
          </button>
        </div>

        {/* Modal Main Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          
          {submitted ? (
            <div className={`p-10 text-center border-2 space-y-4 rounded-xs shadow-2xl animate-in zoom-in-95 ${
              activeTab === 'archive'
                ? 'bg-red-950/40 border-red-500 text-red-100'
                : 'bg-cyan-950/40 border-cyan-500 text-cyan-100'
            }`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-xl ${
                activeTab === 'archive' ? 'bg-red-500 text-white' : 'bg-cyan-500 text-black'
              }`}>
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                Inquiry Received by the Curatorial Board
              </h3>
              <p className="text-sm font-serif max-w-md mx-auto leading-relaxed opacity-90">
                The institutional archive and API integration request submitted on behalf of <strong className="text-white">{orgName || 'Your Organization'}</strong> has been registered. Our curatorial and engineering council will follow up within 24 business hours.
              </p>
            </div>
          ) : activeTab === 'archive' ? (
            /* TAB 1: Institutional Heritage & Historical Archiving (Terracotta/Red World) */
            <div className="space-y-6">
              
              {/* Pillar intro */}
              <div className="p-4 bg-gradient-to-r from-red-950/60 to-red-950/20 border-l-3 border-red-500 text-xs font-serif text-red-100/90 leading-relaxed rounded-r-xs">
                We design and maintain museum-grade historical dossiers, AI acoustic restoration archives, and permanent digital institutes for celebrated artists, philosophers, scholars, public leaders, and company founders.
              </div>

              {/* 3 Prestige Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#231414] border border-[#482020] rounded-xs space-y-2 hover:border-red-500/50 transition">
                  <div className="w-9 h-9 rounded-full bg-red-950 border border-red-700/50 flex items-center justify-center text-red-300">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-red-100">
                    Biographical & Academic Curation
                  </h4>
                  <p className="text-xs font-serif text-red-200/70 leading-relaxed">
                    Collaborative dossier curation with professional historians to record lifetime bibliography, works, and historical eras.
                  </p>
                </div>

                <div className="p-4 bg-[#231414] border border-[#482020] rounded-xs space-y-2 hover:border-red-500/50 transition">
                  <div className="w-9 h-9 rounded-full bg-red-950 border border-red-700/50 flex items-center justify-center text-red-300">
                    <Mic className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-red-100">
                    Audio & Photographic AI Restoration
                  </h4>
                  <p className="text-xs font-serif text-red-200/70 leading-relaxed">
                    Studio-grade acoustic de-noising of legacy cassette/reel tapes and high-resolution restoration of archival parchment documents.
                  </p>
                </div>

                <div className="p-4 bg-[#231414] border border-[#482020] rounded-xs space-y-2 hover:border-red-500/50 transition">
                  <div className="w-9 h-9 rounded-full bg-red-950 border border-red-700/50 flex items-center justify-center text-red-300">
                    <BookmarkCheck className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-red-100">
                    Physical QR Medallion & Hardcover Vol.
                  </h4>
                  <p className="text-xs font-serif text-red-200/70 leading-relaxed">
                    Weather-resistant titanium/porcelain cemetery QR plaques paired with a bespoke linen-bound family library monograph.
                  </p>
                </div>
              </div>

              {/* Inquiry Form */}
              <form onSubmit={handleSubmit} className="p-5 bg-[#201111] border border-[#482020] rounded-xs space-y-4 shadow-md">
                <div className="font-mono text-xs font-bold uppercase text-red-300 tracking-wider border-b border-[#3D1E1E] pb-2">
                  Institutional Archive Project Application
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-red-300/80 mb-1">Organization / Foundation / Estate *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. The Vance Cultural Foundation"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="w-full p-2.5 text-xs border border-[#482020] bg-[#120909] text-red-100 placeholder-red-900 focus:outline-hidden focus:border-red-500 font-serif rounded-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-red-300/80 mb-1">Contact Person *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Arthur Sterling"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      className="w-full p-2.5 text-xs border border-[#482020] bg-[#120909] text-red-100 placeholder-red-900 focus:outline-hidden focus:border-red-500 font-serif rounded-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-red-300/80 mb-1">Email / Phone *</label>
                    <input
                      type="text"
                      required
                      placeholder="curator@foundation.org"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full p-2.5 text-xs border border-[#482020] bg-[#120909] text-red-100 placeholder-red-900 focus:outline-hidden focus:border-red-500 font-serif rounded-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-red-300/80 mb-1">Scope of the Archive & Heritage Materials</label>
                  <textarea
                    rows={2}
                    placeholder="Brief background on the historical figure, estimated volume of photographs, audio reels, and documents..."
                    value={projectScope}
                    onChange={(e) => setProjectScope(e.target.value)}
                    className="w-full p-2.5 text-xs border border-[#482020] bg-[#120909] text-red-100 placeholder-red-900 focus:outline-hidden focus:border-red-500 font-serif rounded-xs"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[#3D1E1E]">
                  <span className="text-[11px] font-mono text-red-300/60">
                    • Certified with formal estate and museum institutional agreements.
                  </span>
                  <button
                    type="submit"
                    className="px-7 py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-mono uppercase tracking-wider font-bold transition flex items-center gap-2 rounded-xs shadow-md cursor-pointer"
                  >
                    <span>Submit Project Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* TAB 2: API & Heritage SaaS Infrastructure (Indigo/Cyan Developer World) */
            <div className="space-y-6">
              
              {/* Hero Banner */}
              <div className="p-4 bg-gradient-to-r from-cyan-950/60 to-cyan-950/20 border-l-3 border-cyan-400 text-xs font-serif text-cyan-100/90 leading-relaxed rounded-r-xs">
                The Remembered Heritage API provides municipalities, cemetery management systems, genealogical institutes, and family archival portals with permanent record hosting, genealogical graph queries, and archival media pipelines.
              </div>

              {/* Developer Code Terminal Interactive Showcase */}
              <div className="bg-[#050A10] text-[#E2E8F0] p-4 border border-[#1E3A5F] font-mono text-xs space-y-2 rounded-xs shadow-xl">
                <div className="flex items-center justify-between text-[#64748B] border-b border-[#1E3A5F] pb-2 text-[10px]">
                  <span className="flex items-center gap-2 text-cyan-400 font-bold">
                    <Terminal className="w-4 h-4" />
                    GET /v1/memorials/eleanor-vance/pedigree-tree
                  </span>
                  <span className="bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded-xs border border-cyan-800">
                    HTTP/2 • 200 OK
                  </span>
                </div>
                <pre className="text-[11px] text-cyan-300/90 overflow-x-auto py-2 leading-relaxed">
{`{
  "status": "archived_verified",
  "memorial_id": "eleanor-vance",
  "metadata": {
    "full_name": "Eleanor Vance",
    "years": "1932 - 2021",
    "cemetery_registry_code": "NYC-GRN-0842",
    "plot_coordinate": "Section 4, Lot 18B"
  },
  "endpoints": {
    "qr_plaque_uri": "https://remembered.io/m/eleanor-vance",
    "voice_archive_stream": "https://cdn.remembered.io/voice/ev-1974.mp3",
    "family_tree_graph": "https://api.remembered.io/v1/tree/ev-nodes.json"
  },
  "family_tree_nodes": 14,
  "cold_storage_guarantee": "100_YEAR_IMMUTABLE"
}`}
                </pre>
              </div>

              {/* API Capabilities 3 Box */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-serif">
                <div className="p-3.5 bg-[#0F1B2B] border border-[#1E3A5F] rounded-xs">
                  <span className="font-mono font-bold text-cyan-300 block text-[11px] mb-1">
                    • Cemetery GIS & Plot Sync
                  </span>
                  <p className="text-cyan-100/70">Automatic parcel matching, precise GPS memorial coordinates, and digital grave mapping.</p>
                </div>
                <div className="p-3.5 bg-[#0F1B2B] border border-[#1E3A5F] rounded-xs">
                  <span className="font-mono font-bold text-cyan-300 block text-[11px] mb-1">
                    • Cold Storage Vault
                  </span>
                  <p className="text-cyan-100/70">100-year immutable cryptographic vault for estate testaments and high-res family imagery.</p>
                </div>
                <div className="p-3.5 bg-[#0F1B2B] border border-[#1E3A5F] rounded-xs">
                  <span className="font-mono font-bold text-cyan-300 block text-[11px] mb-1">
                    • White-Label Registry Engine
                  </span>
                  <p className="text-cyan-100/70">Deliver branded archival dossiers under your own institutional or foundation domain.</p>
                </div>
              </div>

              {/* API Access Request Form */}
              <form onSubmit={handleSubmit} className="p-5 bg-[#0F1B2B] border border-[#1E3A5F] rounded-xs space-y-3 shadow-md">
                <div className="font-mono text-xs font-bold uppercase text-cyan-300 tracking-wider border-b border-[#1A2C40] pb-2">
                  Developer & Enterprise API License Request
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Company / Municipality / Organization *"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="p-2.5 text-xs border border-[#1E3A5F] bg-[#080E16] text-cyan-100 placeholder-cyan-900 focus:outline-hidden focus:border-cyan-400 font-serif rounded-xs"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Developer Email Address *"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="p-2.5 text-xs border border-[#1E3A5F] bg-[#080E16] text-cyan-100 placeholder-cyan-900 focus:outline-hidden focus:border-cyan-400 font-serif rounded-xs"
                  />
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[#1A2C40]">
                  <span className="text-[11px] font-mono text-cyan-400/60">
                    Sandbox API keys are provisioned instantaneously.
                  </span>
                  <button
                    type="submit"
                    className="px-7 py-3 bg-cyan-500 hover:bg-cyan-400 text-[#080E16] text-xs font-mono uppercase tracking-wider font-bold transition flex items-center gap-2 rounded-xs shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer"
                  >
                    <span>Acquire API Sandbox Keys</span>
                    <Key className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
