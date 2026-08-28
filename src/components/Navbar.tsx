import React from 'react';
import { MemorialProfile } from '../types';
import { Search, Plus, QrCode, Shield, BookOpen, Clock, Image as ImageIcon, Volume2, MessageSquare, Users, Sparkles, Heart, ShoppingBag, Newspaper, Home, Camera, Globe } from 'lucide-react';
import { Language, TRANSLATIONS } from '../lib/i18n';

interface NavbarProps {
  currentMemorial: MemorialProfile;
  memorials?: MemorialProfile[];
  onSelectMemorial?: (memorial: MemorialProfile) => void;
  onOpenSearch: () => void;
  onOpenCreate: () => void;
  onOpenAdmin: () => void;
  onOpenQr: () => void;
  onOpenStore?: () => void;
  onOpenGuardians?: () => void;
  onOpenSocialStudio?: () => void;
  activeSection?: string;
  onNavigateSection?: (sectionId: string) => void;
  viewMode?: 'home' | 'profile';
  onSetViewMode?: (mode: 'home' | 'profile') => void;
  language?: Language;
  onToggleLanguage?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMemorial,
  memorials = [],
  onSelectMemorial,
  onOpenSearch,
  onOpenCreate,
  onOpenAdmin,
  onOpenQr,
  onOpenStore,
  onOpenGuardians,
  onOpenSocialStudio,
  activeSection = 'hero',
  onNavigateSection,
  viewMode = 'home',
  onSetViewMode,
  language = 'en',
  onToggleLanguage,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const isEn = language === 'en';
  const handleNav = (sectionId: string) => {
    if (viewMode !== 'profile' && onSetViewMode) {
      onSetViewMode('profile');
    }
    setTimeout(() => {
      if (typeof onNavigateSection === 'function') {
        onNavigateSection(sectionId);
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 50);
  };

  const navItems = [
    { id: 'biography', label: isEn ? 'Biography' : t.profile.biography.split(' ')[0], icon: BookOpen },
    { id: 'timeline', label: isEn ? 'Chronology' : t.profile.timeline.split(' ')[0], icon: Clock },
    { id: 'gallery', label: isEn ? 'Gallery' : t.profile.gallery.split(' ')[0], icon: ImageIcon },
    { id: 'voice', label: isEn ? 'Voice' : t.profile.voiceArchive.split(' ')[0], icon: Volume2 },
    { id: 'memories', label: isEn ? 'Remembrances' : t.profile.writeMemory.split(' ')[0], icon: MessageSquare },
    { id: 'capsules', label: isEn ? 'Time Capsules' : t.profile.timeCapsules.split(' ')[0], icon: Clock },
    { id: 'trees', label: isEn ? 'Living Forest' : t.profile.treeDonations.split(' ')[0], icon: Heart },
    { id: 'family', label: isEn ? 'Lineage' : t.profile.familyTree.split(' ')[0], icon: Users },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/96 backdrop-blur-md border-b border-[#D6CBB8] text-[#1E1B18] transition-all duration-300">
      
      {/* Top Heritage Broadsheet Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-3 pb-2 border-b border-[#E8DFD0]">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: View Mode Toggle & Brand Name grouped together */}
          <div className="flex items-center gap-2.5 sm:gap-5 min-w-0">
            {onSetViewMode && (
              <div className="flex items-center border border-[#D0C5B2] p-0.5 bg-[#F2EDE2] shrink-0">
                <button
                  onClick={() => onSetViewMode('home')}
                  className={`px-2 py-0.5 flex items-center gap-1 transition text-[10px] sm:text-[11px] cursor-pointer ${
                    viewMode === 'home' ? 'bg-[#2B2724] text-[#FAF8F5] font-bold shadow-2xs' : 'text-[#6E6659] hover:text-[#1E1B18]'
                  }`}
                  title={isEn ? 'Broadsheet Archive & Directory' : 'Genel Hafıza Gazetesi ve Fihrist'}
                >
                  <Newspaper className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>{isEn ? 'Home' : 'Ana Sayfa'}</span>
                </button>
                <button
                  onClick={() => onSetViewMode('profile')}
                  className={`px-2 py-0.5 flex items-center gap-1 transition text-[10px] sm:text-[11px] cursor-pointer ${
                    viewMode === 'profile' ? 'bg-[#2B2724] text-[#FAF8F5] font-bold shadow-2xs' : 'text-[#6E6659] hover:text-[#1E1B18]'
                  }`}
                  title={isEn ? 'Active Archival Record' : 'Aktif Kişi Kütük Sayfası'}
                >
                  <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>{isEn ? 'Profile' : 'Profil'}</span>
                </button>
              </div>
            )}

            <button 
              onClick={() => onSetViewMode && onSetViewMode('home')}
              className="font-serif-display text-xl sm:text-2xl md:text-3xl font-black tracking-wide sm:tracking-wider text-[#1E1B18] hover:opacity-85 transition truncate cursor-pointer"
            >
              REMEMBERED
            </button>
          </div>

          {/* Right Action Icons with Pastel Store Button */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              onClick={onOpenSearch}
              className="p-1.5 hover:bg-[#EAE2D2] text-[#3D372E] transition rounded cursor-pointer"
              title={isEn ? 'Search Archive' : 'Arşivde Arama Yap'}
              id="mobile-search-btn"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenQr}
              className="p-1.5 hover:bg-[#EAE2D2] text-[#3D372E] transition rounded cursor-pointer"
              title={isEn ? 'Granite QR Plaque Generator' : 'Mezar Taşı & Plaka QR Kodu'}
              id="qr-modal-open-btn"
            >
              <QrCode className="w-4 h-4" />
            </button>

            {onOpenSocialStudio && (
              <button
                onClick={onOpenSocialStudio}
                className="p-1.5 hover:bg-[#EAE2D2] text-[#8C6239] hover:text-[#1E1B18] transition rounded border border-[#D6CBB8]/80 bg-[#F5EFEB]/50 cursor-pointer"
                title={isEn ? 'Social Media Studio & Press Cards' : 'Sosyal Medya & Basın Kiti Stüdyosu'}
                id="navbar-social-studio-btn"
              >
                <Camera className="w-4 h-4 text-[#8C6239]" />
              </button>
            )}

            {/* Language Switcher (EN | TR) */}
            {onToggleLanguage && (
              <button
                onClick={onToggleLanguage}
                className="flex items-center gap-1 px-2 py-1 bg-[#EDE6D8] hover:bg-[#E2D8C5] text-[#1E1B18] border border-[#D6CBB8] text-xs font-mono font-bold transition rounded-xs cursor-pointer"
                title={language === 'en' ? 'Switch to Turkish' : 'Switch to English'}
                id="navbar-lang-switcher-btn"
              >
                <Globe className="w-3.5 h-3.5 text-[#8C5828]" />
                <span className="tracking-wider uppercase">{language === 'en' ? 'EN' : 'TR'}</span>
              </button>
            )}

            {onOpenGuardians && (
              <button
                onClick={onOpenGuardians}
                className="hidden sm:block p-1.5 hover:bg-[#EAE2D2] text-[#3D372E] transition rounded cursor-pointer"
                title={isEn ? 'Family Heritage Guardians' : 'Aile Koruyucuları Heyeti'}
                id="guardians-panel-open-btn"
              >
                <Users className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onOpenAdmin}
              className="hidden sm:block p-1.5 hover:bg-[#EAE2D2] text-[#3D372E] transition rounded cursor-pointer"
              title={isEn ? 'Memorial Curator Admin Panel' : 'Sayfa Yöneticisi Paneli'}
              id="admin-panel-open-btn"
            >
              <Shield className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenCreate}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1 bg-[#2B2724] hover:bg-[#423C37] text-[#FAF8F5] text-xs font-mono uppercase tracking-wider transition ml-0.5 sm:ml-1 font-bold shadow-2xs cursor-pointer"
              id="create-memorial-btn"
            >
              <Plus className="w-3 h-3 stroke-[2.5]" />
              <span className="hidden sm:inline">{isEn ? 'Create Memorial' : 'Kütük Başlat'}</span>
              <span className="sm:hidden">{isEn ? 'Create' : 'Ekle'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Nav Section Links (Only visible when viewing a profile) */}
      {viewMode === 'profile' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 border-t border-[#111111]/10 bg-[#FAF8F5]">
          <nav className="overflow-x-auto no-scrollbar flex items-center justify-start sm:justify-center gap-4 sm:gap-8 py-2 text-xs font-mono uppercase tracking-wider text-[#555555]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`shrink-0 flex items-center gap-1.5 py-1 transition border-b-2 ${
                    isActive
                      ? 'border-[#111111] text-[#111111] font-bold'
                      : 'border-transparent text-[#666666] hover:text-[#111111]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};


