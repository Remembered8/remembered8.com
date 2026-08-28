import React, { useState } from 'react';
import { MemorialProfile } from '../types';
import { 
  Search, Flame, Clock, Calendar, ArrowRight, Sparkles, BookOpen, 
  Users, Feather, Award, Compass, Shield, CheckCircle2, ChevronRight,
  TrendingUp, Globe, Filter, Star, Plus, Heart, Share2, Radio, Layers, Camera
} from 'lucide-react';
import { LiveMemorialPulseBoard } from './LiveMemorialPulseBoard';

import { Language, TRANSLATIONS } from '../lib/i18n';

interface BroadsheetLandingHomeProps {
  memorials: MemorialProfile[];
  onSelectMemorial: (memorial: MemorialProfile) => void;
  onOpenCreate: () => void;
  onOpenSearch: () => void;
  onOpenStore: () => void;
  onOpenLiveEvent?: (memorial?: MemorialProfile) => void;
  onOpenTributes?: (memorial?: MemorialProfile) => void;
  onOpenHeritage?: (tab?: 'archive' | 'api') => void;
  onOpenSocialStudio?: (memorial?: MemorialProfile) => void;
  language?: Language;
}

export const BroadsheetLandingHome: React.FC<BroadsheetLandingHomeProps> = ({
  memorials,
  onSelectMemorial,
  onOpenCreate,
  onOpenSearch,
  onOpenStore,
  onOpenLiveEvent,
  onOpenTributes,
  onOpenHeritage,
  onOpenSocialStudio,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [activeTab, setActiveTab] = useState<'all' | 'historic' | 'recently_passed'>('all');
  const [duplicateSearchName, setDuplicateSearchName] = useState('');
  const [duplicateSearchResults, setDuplicateSearchResults] = useState<MemorialProfile[] | null>(null);

  // Today's Date in Selected Language
  const now = new Date();
  const locale = language === 'en' ? 'en-US' : 'tr-TR';
  const shortMonth = now.toLocaleDateString(locale, { month: 'short' }).toUpperCase().replace('.', '').slice(0, 3);
  const dayNumber = now.getDate().toString().padStart(2, '0');
  const yearNumber = now.getFullYear();
  const dayName = now.toLocaleDateString(locale, { weekday: 'long' }).toUpperCase();
  const fullMonthName = now.toLocaleDateString(locale, { month: 'long' }).toUpperCase();
  const todayFormatted = `${dayNumber} ${fullMonthName} ${yearNumber} ${dayName}`;

  // Featured Memorial (Hero of the Day - Albert Einstein, Nikola Tesla or Barış Manço)
  const featuredMemorial = memorials.find(m => m.id === 'albert-einstein') || memorials.find(m => m.id === 'nikola-tesla') || memorials[0];

  // Today in History Featured Master Dossier (Atatürk, Tesla or Marie Curie with deep monumental sanctuary visual)
  const todayHistoryMemorial = memorials.find(m => m.id === 'ataturk') || memorials.find(m => m.id === 'nikola-tesla') || memorials[1] || memorials[0];

  // Filtered Profiles
  const filteredProfiles = memorials.filter(m => {
    if (activeTab === 'historic') return m.isVerifiedHistoric;
    if (activeTab === 'recently_passed') return !m.isVerifiedHistoric;
    return true;
  });

  // Duplicate Check Handler
  const handleDuplicateSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!duplicateSearchName.trim()) {
      setDuplicateSearchResults(null);
      return;
    }
    const q = duplicateSearchName.toLowerCase().trim();
    const results = memorials.filter(m => 
      m.fullName.toLowerCase().includes(q) || 
      m.profession.toLowerCase().includes(q) ||
      m.birthPlace.toLowerCase().includes(q)
    );
    setDuplicateSearchResults(results);
  };

  return (
    <div className="bg-[#F8F8F5] text-[#111111] min-h-screen">
      
      {/* 1. TOP MASTHEAD GAZETTE HEADER (Times / NYT Broadsheet) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-2">
        
        {/* Retro Split-Flap Desk Calendar Centered Minimalist Stripe */}
        <div className="flex items-center justify-center border-b border-[#111111]/20 pb-3 mb-3">
          
          {/* Centered Retro Mechanical Flip Desk Calendar (Masa / Paravan Takvimi) */}
          <div 
            className="inline-flex items-center gap-1.5 bg-[#111111] p-1.5 rounded-sm shadow-xs border border-black select-none" 
            title={`${dayNumber} ${fullMonthName} ${yearNumber}`}
          >
            {/* Month Leaf (e.g. AĞU) */}
            <div className="relative bg-[#1E1E1E] text-white px-3 py-1 rounded-[3px] font-mono font-black text-xs sm:text-sm tracking-widest border border-white/10 overflow-hidden">
              <span className="relative z-10 block leading-none">{shortMonth}</span>
              {/* Horizontal split-flap incision line */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-black z-20 shadow-[0_1px_0_rgba(255,255,255,0.25)]" />
            </div>

            {/* Day Leaf (e.g. 18) */}
            <div className="relative bg-[#1E1E1E] text-white px-3 py-1 rounded-[3px] font-mono font-black text-xs sm:text-sm tracking-widest border border-white/10 overflow-hidden">
              <span className="relative z-10 block leading-none">{dayNumber}</span>
              {/* Horizontal split-flap incision line */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-black z-20 shadow-[0_1px_0_rgba(255,255,255,0.25)]" />
            </div>
          </div>

        </div>

        {/* Big Monolithic Brand Header with Centered Subtitle */}
        <div className="text-center py-2 sm:py-3">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.35em] text-[#555555] font-bold block mb-1">
            {language === 'en' ? 'GLOBAL HUMAN HERITAGE DOSSIER' : 'KÜRESEL İNSANLIK MİRASI VE AİLE HAFIZA KÜTÜĞÜ'}
          </span>
          <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#111111]">
            {language === 'en' ? 'THE REMEMBERED CHRONICLE' : 'THE REMEMBERED CHRONICLE'}
          </h1>
        </div>

      </div>

      {/* 2. THE SIGNATURE BLACK MANIFESTO BANNER (Sleek, 3-finger slim ribbon) */}
      <div className="bg-[#111111] text-[#FAF8F5] py-4 sm:py-5 px-4 sm:px-6 border-y-2 border-[#111111] my-2 shadow-sm">
        <div className="max-w-5xl mx-auto">
          
          {/* 2-line minimalist manifesto statement */}
          <div className="text-center">
            <blockquote className="font-serif-display text-base sm:text-lg md:text-xl text-white font-bold leading-snug italic max-w-3xl mx-auto">
              {language === 'en' 
                ? '“When does a human truly pass away? When the heart ceases to beat, or when the last person who remembers them is gone?”'
                : '“Bir insan gerçekten ne vakit ölür? Kalbi durduğunda mı, yoksa onu hatırlayan son insan da dünyadan göçtüğünde mi?”'}
            </blockquote>

            <p className="text-[11px] sm:text-xs font-serif italic text-white/70 mt-1 max-w-2xl mx-auto">
              {language === 'en'
                ? 'Remembered is the living archive of human memory — preserving voices, letters, images, and philosophies across generations.'
                : 'Remembered; hayatları, sesleri, fotoğrafları ve mektupları kuşaklar boyu muhafaza eden ebedi bir dijital hafıza kütüğüdür.'}
            </p>
          </div>

          {/* 3 Pillars & Compact Actions in one balanced horizontal bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 mt-3 border-t border-white/15">
            
            {/* 3 Pillars */}
            <div className="flex items-center gap-4 sm:gap-8 text-[10px] font-mono uppercase tracking-wider text-white/90">
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-xs text-white">{language === 'en' ? 'Remember' : 'Hatırla'}</span>
                <span className="text-[8px] text-[#999999] tracking-widest hidden md:inline">&bull; {language === 'en' ? 'Silent Reverence' : 'Sessiz Saygı'}</span>
              </div>
              <span className="text-white/25">&bull;</span>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-xs text-white">{language === 'en' ? 'Contribute' : 'İz Bırak'}</span>
                <span className="text-[8px] text-[#999999] tracking-widest hidden md:inline">&bull; {language === 'en' ? 'Living Letters' : 'Edebi Mektuplar'}</span>
              </div>
              <span className="text-white/25">&bull;</span>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-xs text-white">{language === 'en' ? 'Immortalize' : 'Yaşat'}</span>
                <span className="text-[8px] text-[#999999] tracking-widest hidden md:inline">&bull; {language === 'en' ? 'Eternal Registry' : 'Ebedi Kütük'}</span>
              </div>
            </div>

            {/* Call to action buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onOpenCreate}
                className="px-3.5 py-1.5 bg-white hover:bg-[#EAEAEA] text-black text-[10px] font-mono uppercase tracking-wider font-bold transition shadow-2xs cursor-pointer"
              >
                {t.nav.createMemorial}
              </button>
              <button
                onClick={onOpenSearch}
                className="px-3.5 py-1.5 bg-transparent hover:bg-white/10 text-white border border-white/30 text-[10px] font-mono uppercase tracking-wider transition cursor-pointer"
              >
                {language === 'en' ? 'Search Registry' : 'Fihristte Ara'}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* 3. SEARCH & DUPLICATE CHECK STRIP (NYT Pastel Newsprint Tone) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 my-6">
        <div className="p-4 bg-[#FAF7F2] border border-[#D8CEBE] shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#E8EFEA] text-[#2C4837] border border-[#CBDCD0] text-[9px] font-mono uppercase tracking-widest font-bold">
                  {language === 'en' ? 'REGISTRY LOOKUP' : 'KÜTÜK SORGUSU'}
                </span>
                <span className="text-xs font-serif font-bold text-[#1E1B18]">
                  {language === 'en' ? 'Has a memorial or dossier already been created for this figure or loved one?' : 'Bir Yakınınızın veya Tarihi Şahsiyetin Sayfası Zaten Açılmış mı?'}
                </span>
              </div>
              <p className="text-[11px] font-serif text-[#635E56]">
                {language === 'en' ? 'Search the public archive first to prevent duplicate entries and join the collective tribute circle.' : 'Tekrarlı sayfa açılmasını önlemek ve aile meclisine katılmak için önce arşivde isim arayın.'}
              </p>
            </div>

            {/* Inline Check Form */}
            <form onSubmit={handleDuplicateSearch} className="flex items-center gap-2 max-w-md w-full">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-[#888175] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={duplicateSearchName}
                  onChange={(e) => setDuplicateSearchName(e.target.value)}
                  placeholder={language === 'en' ? 'Enter full name (e.g. Nikola Tesla, Marie Curie)...' : 'İsim soyisim girin (Örn: Barış Manço, Ahmet Yılmaz)...'}
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#CFC5B4] focus:border-[#22201D] outline-none font-mono bg-white text-[#1E1B18]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#2B2724] hover:bg-[#423C37] text-[#FAF8F5] text-xs font-mono uppercase tracking-wider whitespace-nowrap font-bold transition cursor-pointer"
              >
                {language === 'en' ? 'Check Archive' : 'Sorgula'}
              </button>
            </form>

          </div>

          {/* Duplicate Query Results (if any) */}
          {duplicateSearchResults !== null && (
            <div className="mt-3 pt-3 border-t border-[#DCD3C3]">
              <div className="text-[10px] font-mono uppercase text-[#7D766B] mb-2 flex items-center justify-between">
                <span>{language === 'en' ? `Search Results (${duplicateSearchResults.length} match found)` : `Arama Sonucu (${duplicateSearchResults.length} Eşleşme Bulundu)`}</span>
                <button onClick={() => setDuplicateSearchResults(null)} className="text-[#2B2724] underline cursor-pointer">{language === 'en' ? 'Close Results' : 'Sonuçları Kapat'}</button>
              </div>

              {duplicateSearchResults.length === 0 ? (
                <div className="p-3 bg-[#F4EFE6] border border-dashed border-[#CFC3B0] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="font-serif italic text-[#59534A]">
                    {language === 'en' 
                      ? `No existing archive found under "${duplicateSearchName}". You can be the first to open this living dossier.`
                      : `"${duplicateSearchName}" adına açılmış bir sayfa bulunamadı. İlk siz açabilirsiniz!`}
                  </span>
                  <button
                    onClick={onOpenCreate}
                    className="px-3 py-1 bg-[#2B2724] text-[#FAF8F5] text-xs font-mono uppercase tracking-wider flex items-center gap-1 shrink-0 hover:bg-[#423C37] transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Create Dossier for this Name' : 'Bu İsimle Kütük Başlat'}</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {duplicateSearchResults.map((res) => (
                    <div
                      key={res.id}
                      onClick={() => onSelectMemorial(res)}
                      className="p-2 border border-[#D5CAB7] bg-white hover:bg-[#F7F3EB] cursor-pointer flex items-center gap-3 transition"
                    >
                      <img src={res.heroImage} alt={res.fullName} referrerPolicy="no-referrer" className="w-10 h-10 object-cover border border-black/20" />
                      <div className="min-w-0 flex-1">
                        <div className="font-serif font-bold text-xs text-[#1E1B18] truncate">{res.fullName}</div>
                        <div className="text-[10px] font-mono text-[#6E675B] truncate">{res.birthDate} - {res.deathDate} &bull; {res.profession}</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#6E675B]" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 4. MAIN BROADSHEET 3-COLUMN EDITORIAL SECTION (NYT Style) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* LEFT & CENTER: HERO OF THE DAY & STORY GRID (8 cols with vertical broadsheet divider) */}
          <div className="lg:col-span-8 space-y-8 lg:border-r lg:border-[#E0D7C7] lg:pr-8">
            
            {/* Lead Story: Featured Memorial (Hero of the Day - NYT Refined Editorial) */}
            <div className="bg-[#FAF8F5] border border-[#D5CAB7] p-6 sm:p-7 shadow-xs relative group transition-all duration-300 hover:border-[#8C6D3B]/40">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#787165] border-b border-[#D8CEBE] pb-2.5 mb-5">
                <span className="flex items-center gap-1.5 text-[#855327] font-bold">
                  <Star className="w-3.5 h-3.5 fill-[#855327] text-[#855327]" />
                  {language === 'en' ? "TODAY'S FEATURED LIFE DOSSIER" : 'GÜNÜN ÖNE ÇIKAN YAŞAM KAYDI'}
                </span>
                <span className="bg-[#EDE5D6] px-2 py-0.5 border border-[#D6C7B2] font-semibold text-[#544C3F]">
                  {language === 'en' ? 'ARCHIVE' : 'KÜTÜK'} #{featuredMemorial.id.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-7 items-stretch">
                
                {/* Photo: Clean archival display without obstructing text overlay */}
                <div className="sm:col-span-5 flex flex-col justify-between">
                  <div className="relative aspect-[3/4] overflow-hidden border border-[#D5CAB7] bg-[#ECE5D8] shadow-2xs">
                    <img
                      src={featuredMemorial.heroImage}
                      alt={featuredMemorial.fullName}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src.includes('wsrv.nl')) {
                          target.src = 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg';
                        }
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  {/* Subtle Archival Caption beneath photo */}
                  <div className="mt-2 text-center text-[10px] font-mono text-[#787163] border-t border-[#E8DFD0] pt-1.5">
                    <span>{featuredMemorial.birthDate.split(' ').pop()} — {featuredMemorial.deathDate.split(' ').pop()}</span>
                    <span className="mx-1.5">•</span>
                    <span>{featuredMemorial.birthPlace.split(',')[0]}</span>
                  </div>
                </div>

                {/* Editorial Content with Drop Cap */}
                <div className="sm:col-span-7 flex flex-col justify-between">
                  <div>
                    {featuredMemorial.isVerifiedHistoric && (
                      <span className="inline-flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wider text-[#75471F] bg-[#F5EDE1] border border-[#D8C7B0] px-2.5 py-0.5 mb-2.5 font-bold">
                        <Award className="w-3.5 h-3.5 text-[#75471F]" />
                        {language === 'en' ? 'VERIFIED HISTORICAL FIGURE' : 'DOĞRULANMIŞ TARİHİ ŞAHSİYET'}
                      </span>
                    )}

                    <h2 
                      onClick={() => onSelectMemorial(featuredMemorial)}
                      className="font-serif-display text-3xl sm:text-4xl font-black text-[#1E1B18] hover:text-[#855327] cursor-pointer leading-tight transition-colors"
                    >
                      {featuredMemorial.fullName}
                    </h2>

                    <p className="font-serif text-xs sm:text-sm text-[#635B50] italic mt-1">
                      {featuredMemorial.profession}
                    </p>

                    <blockquote className="my-3.5 p-3.5 bg-[#F2EDE2] border-l-2 border-[#8C6D3B] font-serif italic text-xs text-[#302B25] leading-relaxed">
                      &ldquo;{featuredMemorial.lifeQuote}&rdquo;
                    </blockquote>

                    {/* Biography with NYT Traditional Drop Cap */}
                    <p className="text-xs font-serif text-[#4D453B] line-clamp-3 leading-relaxed first-letter:float-left first-letter:text-3xl first-letter:font-serif-display first-letter:font-black first-letter:mr-2 first-letter:leading-none first-letter:text-[#855327]">
                      {featuredMemorial.biography}
                    </p>
                  </div>

                  {/* Footer Action with Warm Micro Feedback */}
                  <div className="pt-4 border-t border-[#D8CEBE] flex flex-wrap items-center justify-between gap-2 text-xs font-mono mt-5">
                    <div className="flex items-center gap-3 text-[#70685C]">
                      <span className="flex items-center gap-1.5 text-[#8C5828] font-bold">
                        <Flame className="w-3.5 h-3.5 fill-[#C29B38] text-[#8C5828]" />
                        {featuredMemorial.candleCount?.toLocaleString()} {language === 'en' ? 'Candles' : 'Mum'}
                      </span>
                      <span>&bull;</span>
                      <span>{featuredMemorial.memories?.length || 0} {language === 'en' ? 'Letters' : 'Mektup'}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {onOpenSocialStudio && (
                        <button
                          onClick={() => onOpenSocialStudio(featuredMemorial)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F5EFEB] text-[#0F291E] border border-[#1E4D38]/40 hover:bg-[#0F291E] hover:text-white transition font-bold text-[11px] rounded-xs cursor-pointer"
                          title={language === 'en' ? 'Generate Instagram Story, Square Post & Press Kit' : 'Bu kütük için Instagram Story, Kare Post & X Banner üret'}
                        >
                          <Camera className="w-3.5 h-3.5 text-[#059669]" />
                          <span className="hidden sm:inline">{language === 'en' ? 'Social Kit' : 'Sosyal Medya Kiti'}</span>
                          <span className="sm:hidden">{language === 'en' ? 'Kit' : 'Kart Üret'}</span>
                        </button>
                      )}

                      <button
                        onClick={() => onSelectMemorial(featuredMemorial)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#2B2724] text-[#FAF8F5] hover:bg-[#453E38] transition font-bold text-[11px] shadow-2xs group-hover:bg-[#855327] cursor-pointer"
                      >
                        <span>{language === 'en' ? 'View Dossier & Light Candle' : 'Kütüğü İncele & Mum Yak'}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* TABBED ARCHIVE DIRECTORY (2-column newspaper layout) */}
            <div className="space-y-4">
              
              <div className="flex items-center justify-between border-b border-[#D0C5B2] pb-2">
                <h3 className="font-serif-display text-xl font-bold text-[#1E1B18] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#75471F]" />
                  <span>{language === 'en' ? 'Living Heritage & Registry Directory' : 'Kayıtlı Yaşamlar & Arşiv Fihristi'}</span>
                </h3>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1 text-xs font-mono">
                  {[
                    { id: 'all', label: language === 'en' ? 'All' : 'Tümü' },
                    { id: 'historic', label: language === 'en' ? 'Historical Figures' : 'Tarihi Şahsiyetler' },
                    { id: 'recently_passed', label: language === 'en' ? 'Family Records' : 'Sivil Kütükler' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-2.5 py-1 border transition uppercase text-[10px] font-bold cursor-pointer ${
                        activeTab === tab.id 
                          ? 'bg-[#2B2724] text-[#FAF8F5] border-[#2B2724]' 
                          : 'bg-[#FAF8F5] hover:bg-[#F2ECE1] text-[#423C36] border-[#D4C8B5]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2-Column Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredProfiles.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => onSelectMemorial(m)}
                    className="p-4 bg-[#FAF8F5] border border-[#DCD3C1] hover:border-[#2B2724] shadow-2xs hover:shadow-xs transition cursor-pointer flex flex-col justify-between group rounded-xs"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={m.heroImage}
                          alt={m.fullName}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 object-cover border border-[#D0C5B2] shrink-0 rounded-xs"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-serif font-bold text-base text-[#1E1B18] group-hover:underline truncate">
                              {m.fullName}
                            </h4>
                            {m.isVerifiedHistoric && (
                              <Award className="w-3.5 h-3.5 text-[#855327] shrink-0" title="Doğrulanmış Tarihi Şahsiyet" />
                            )}
                          </div>
                          <p className="text-[11px] font-mono text-[#6E6659] truncate">
                            {m.birthDate.split(' ').pop()} &mdash; {m.deathDate.split(' ').pop()}
                          </p>
                          <p className="text-xs font-serif text-[#504A41] truncate mt-0.5">
                            {m.profession}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs font-serif italic text-[#595247] line-clamp-2 leading-relaxed">
                        &ldquo;{m.lifeQuote}&rdquo;
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E0D8C8] flex items-center justify-between text-[11px] font-mono text-[#787163] mt-3">
                      <span>{m.candleCount?.toLocaleString()} {language === 'en' ? 'Candles Lit' : 'Mum Yandı'}</span>
                      <span className="group-hover:text-black font-bold flex items-center gap-1 text-[#2B2724]">
                        {language === 'en' ? 'Open Dossier' : 'Sayfayı Aç'} &rarr;
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: NEW YORK TIMES STYLE VISUAL STORY BOXES (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Header: Hafızada ve Tarihte Bugün */}
            <div className="border-b border-[#D0C5B2] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#1E1B18] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#855327]" />
                <span>{language === 'en' ? 'ON THIS DAY IN HISTORY' : 'HAFIZADA & TARİHTE BUGÜN'}</span>
              </span>
              <span className="text-[10px] font-mono text-[#787163]">{todayFormatted.split(' ')[0]} {todayFormatted.split(' ')[1]}</span>
            </div>

            {/* NYT STYLE VISUAL BOX 1: Monumental Sanctuary Card — Clean, Unobstructed Image with Crisp Editorial Body */}
            {todayHistoryMemorial && (
              <div 
                onClick={() => onSelectMemorial(todayHistoryMemorial)}
                className="bg-[#FAF8F5] border border-[#D5C9B3] overflow-hidden cursor-pointer group shadow-sm hover:border-[#855F24] transition duration-300 rounded-xs"
              >
                {/* Visual: Clean Archival Image with only Top Discrete Badge */}
                <div className="relative aspect-[16/11] overflow-hidden bg-[#181A1C]">
                  <img
                    src={todayHistoryMemorial.heroImage}
                    alt={todayHistoryMemorial.fullName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-[0.97] contrast-[1.03] group-hover:scale-105 transition-all duration-700"
                  />

                  {/* Discrete Top Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-[#FAF8F3]/95 text-[#694D20] border border-[#C5A059] text-[9px] font-mono px-2 py-0.5 uppercase tracking-wider font-bold shadow-xs flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-[#C5A059]" />
                    <span>{language === 'en' ? 'HISTORIC COMMEMORATION' : 'TARİHTE VE HAFIZADA BUGÜN'}</span>
                  </div>
                </div>

                {/* Card Editorial Excerpt — All titles and typography placed cleanly below photo */}
                <div className="p-4 space-y-2.5 bg-[#FAF8F5]">
                  
                  {/* Subject Headline and Dates */}
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#787163] border-b border-[#E8E0D0] pb-1.5 mb-1.5">
                      <span className="text-[#855F24] font-bold">
                        {todayHistoryMemorial.birthDate.split(' ').pop()} — {todayHistoryMemorial.deathDate.split(' ').pop()}
                      </span>
                      <span className="truncate max-w-[150px] text-right font-medium">
                        {todayHistoryMemorial.restingPlace?.split(',')[0] || todayHistoryMemorial.birthPlace}
                      </span>
                    </div>

                    <h4 className="font-serif-display text-xl font-bold text-[#1E1B18] group-hover:text-[#855F24] transition-colors leading-tight">
                      {todayHistoryMemorial.fullName}
                    </h4>

                    <p className="text-xs font-serif text-[#635B50] italic mt-0.5">
                      {todayHistoryMemorial.profession}
                    </p>
                  </div>

                  <blockquote className="p-2.5 bg-[#F2EDE2] border-l-2 border-[#8C6D3B] font-serif italic text-xs text-[#302B25] leading-relaxed">
                    &ldquo;{todayHistoryMemorial.lifeQuote}&rdquo;
                  </blockquote>

                  <p className="text-[11px] font-serif text-[#5E574E] line-clamp-2 leading-relaxed">
                    {todayHistoryMemorial.biography}
                  </p>

                  <div className="pt-2.5 border-t border-[#E8E0D0] flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#855F24] font-bold flex items-center gap-1">
                      <span className="text-xs">✦</span>
                      <span>{todayHistoryMemorial.candleCount?.toLocaleString()} {language === 'en' ? 'Tributes' : 'Anma Mumu'}</span>
                    </span>
                    <span className="font-bold text-[#2B2724] group-hover:text-[#855F24] group-hover:translate-x-1 transition-all flex items-center gap-1">
                      <span>{language === 'en' ? 'Explore Record' : 'Kütüğü İncele'}</span>
                      <span>&rarr;</span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* NYT STYLE VISUAL BOX 2 & 3: Side-by-side Thumbnail Cards */}
            <div className="space-y-3.5 divide-y divide-[#E0D8C8]">
              {memorials.filter(m => m.id !== todayHistoryMemorial?.id && m.id !== featuredMemorial?.id).slice(0, 4).map((m) => (
                <div
                  key={m.id}
                  onClick={() => onSelectMemorial(m)}
                  className="pt-3.5 first:pt-0 cursor-pointer group flex items-start gap-3 hover:bg-[#F4EFE6] p-2 transition rounded-xs"
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <span className="text-[9px] font-mono uppercase text-[#855327] font-bold block">
                      {m.importantDates?.[0]?.formattedDate || (language === 'en' ? 'Memorial Milestone' : 'Sene-i Devriye')}
                    </span>
                    <h5 className="font-serif font-bold text-sm text-[#1E1B18] group-hover:underline leading-tight">
                      {m.fullName}
                    </h5>
                    <p className="text-[11px] font-serif text-[#595247] line-clamp-2 leading-snug">
                      {m.lifeQuote || m.biography}
                    </p>
                    <span className="text-[9px] font-mono text-[#787163] block pt-0.5">
                      {m.profession} &bull; {m.birthPlace}
                    </span>
                  </div>

                  {/* Thumbnail Box */}
                  <div className="w-20 h-20 shrink-0 border border-[#D0C5B2] overflow-hidden bg-[#ECE5D8] shadow-2xs rounded-xs">
                    <img
                      src={m.heroImage}
                      alt={m.fullName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Summary Pill Bar in Pastel Stone */}
            <div className="p-3.5 bg-[#FAF8F5] border border-[#DCD3C1] text-center space-y-2 rounded-xs">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#787163] block font-bold">
                {language === 'en' ? 'COMMUNITY & REGISTRY METRICS' : 'TOPLULUK VE ARŞİV İSTATİSTİĞİ'}
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 bg-[#F2EDE2] border border-[#D8CEBE] rounded-xs">
                  <span className="block font-bold text-base text-[#1E1B18]">{memorials.length}</span>
                  <span className="text-[10px] text-[#70685C]">{language === 'en' ? 'Active Dossiers' : 'Aktif Kütük'}</span>
                </div>
                <div className="p-2 bg-[#F2EDE2] border border-[#D8CEBE] rounded-xs">
                  <span className="block font-bold text-base text-[#855327]">
                    {memorials.reduce((acc, m) => acc + (m.candleCount || 0), 0)?.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#70685C]">{language === 'en' ? 'Candles Lit' : 'Yanan Mum'}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 5. PHYSICAL LASER PLAQUE BANNER (Pastel Patina / Warm Ivory Mineral Stone Tone) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 my-12">
        <div className="bg-gradient-to-br from-[#ECE5D8] via-[#E4DCCE] to-[#DACFBECD] border-2 border-[#2B2724] p-5 sm:p-7 shadow-md relative overflow-hidden">
          
          {/* Subtle background watermark */}
          <div className="absolute -right-6 -bottom-10 opacity-[0.07] pointer-events-none select-none">
            <Award className="w-56 h-56 text-[#2B2724]" />
          </div>

          {/* Archival inner frame with distinct soft mineral warm tone */}
          <div className="border border-[#C8BCAB] p-5 sm:p-7 bg-[#F7F3EB]/95 relative z-10 shadow-xs">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#593F26] bg-[#E3D7C5] border border-[#CCA878]/60 px-2.5 py-1 font-bold shadow-2xs">
                    {language === 'en' ? '✦ PHYSICAL MEMORIAL STONE & DOMESTIC ARTIFACTS' : '✦ FİZİKSEL MEZAR TAŞI & EV HATIRATI'}
                  </span>
                  <span className="text-[10px] font-mono text-[#6E6455] hidden sm:inline-block font-medium">
                    {language === 'en' 
                      ? '• Porcelain Medallions, Laser Titanium & Cloth-bound Registries'
                      : '• Porselen Plaka, Titanyum Lazer & Ciltli Arşiv'}
                  </span>
                </div>

                <h3 className="font-serif-display text-2xl sm:text-3xl font-black text-[#1E1B18] leading-tight tracking-tight">
                  {language === 'en'
                    ? 'A Living Monument on Resting Headstones and at Home'
                    : 'Mezar Taşında ve Evinizde Yaşayan Canlı Hatıra'}
                </h3>

                <p className="text-xs sm:text-sm font-serif text-[#484136] leading-relaxed max-w-xl">
                  {language === 'en'
                    ? 'Engineered to withstand weather for over 50 years. Porcelain and titanium laser QR plaques enable visitors at cemetery grounds to instantly explore biographies, photo galleries, and preserved voice recordings via smartphone.'
                    : 'Hava koşullarına 50 yıl dayanıklı porselen ve titanyum QR plakalar; kabristan ziyaretlerinde akıllı telefonla anında hayat hikayesini, fotoğrafları ve ses kayıtlarını dinletir.'}
                </p>

                {/* Pastel Material Badges with Distinct Elegant Palette */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px] font-mono">
                  <span className="px-2.5 py-1 bg-[#FFFFFF] border border-[#D5C9B5] text-[#4A4339] font-semibold shadow-2xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#E5D7C2] border border-[#C5B39A]"></span>
                    {language === 'en' ? 'Ivory Porcelain Memorial Medallion' : 'Fildişi Porselen Mezar Plakası'}
                  </span>
                  <span className="px-2.5 py-1 bg-[#E8EEF5] border border-[#BDCBDC] text-[#293B4E] font-semibold shadow-2xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#3B5470]"></span>
                    {language === 'en' ? 'Graphite Titanium Laser Plaque' : 'Grafit Titanyum Lazer QR'}
                  </span>
                  <span className="px-2.5 py-1 bg-[#FBF2E7] border border-[#E8D4BF] text-[#5C3D21] font-semibold shadow-2xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#C29B38]"></span>
                    {language === 'en' ? 'Linen Cloth-Bound Memorial Tome' : 'Keten Ciltli Hatıra Kitabı'}
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <button
                  onClick={onOpenStore}
                  className="px-6 py-3.5 bg-[#2B2724] hover:bg-[#3D3732] text-[#FAF8F5] text-xs font-mono uppercase tracking-wider font-bold transition flex items-center justify-center gap-2 shadow-md border border-[#2B2724] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span>{language === 'en' ? 'MEMORIAL STORE & ORDERS' : 'PLAKA & KİTAP SİPARİŞ MERKEZİ'}</span>
                  <ArrowRight className="w-4 h-4 text-[#F3BE38]" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* 6. INSTITUTIONAL HERITAGE, LIVE VIGILS AND ECOSYSTEM */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 my-16">
        <div className="border-2 border-[#2B2724] bg-[#FAF7F2] p-6 sm:p-9 shadow-lg relative">
          
          {/* Section Masthead */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-[#2B2724] pb-5 mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2B2724] text-[#FAF8F5] text-[10px] font-mono uppercase tracking-[0.25em] font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#F3BE38]" />
                {language === 'en' ? 'REMEMBERED HERITAGE & DIGITAL INSTITUTE ECOSYSTEM' : 'REMEMBERED MİRAS & DİJİTAL ENSTİTÜ EKOSİSTEMİ'}
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-black text-[#1E1B18] tracking-tight">
                {language === 'en' ? 'Eternal Memory Realms Preserved for Generations' : 'Geleceğe Bırakılan Ebedi Hafıza Dünyaları'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm font-serif italic text-[#5E574E] max-w-md">
              {language === 'en' 
                ? 'Operating as unified heritage modules: synchronized live gathering chambers, forest endowments, institutional archives, and global API infrastructure.'
                : 'Her biri bağımsız birer ekosistem olarak çalışan gerçek zamanlı buluşma salonları, bağış çelenkleri, kurumsal arşivler ve küresel veri altyapısı.'}
            </p>
          </div>

          {/* 4 Prestigious Colored Distinct Editorial Worlds */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            
            {/* Card 1: LIVE VIGIL CHAMBER */}
            <div 
              onClick={() => onOpenLiveEvent && onOpenLiveEvent(featuredMemorial)}
              className="bg-gradient-to-b from-[#1C2331] to-[#121620] text-[#F8FAFC] border-2 border-[#2C3B55] p-5 flex flex-col justify-between hover:border-[#F3BE38] transition-all duration-300 group cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 relative overflow-hidden rounded-xs"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F3BE38]/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="space-y-3.5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-full bg-[#273349] border border-[#3E4F70] flex items-center justify-center text-[#F3BE38] group-hover:scale-110 transition">
                    <Radio className="w-4 h-4 animate-pulse" />
                  </div>
                  <span className="flex items-center gap-1.5 text-[9px] font-mono uppercase text-[#38BDF8] font-bold bg-[#0F172A] px-2.5 py-1 border border-[#1E293B] shadow-inner">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping"></span>
                    {language === 'en' ? 'LIVE SANCTUARY' : 'CANLI SALON'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] block mb-1">
                    {language === 'en' ? '01 • INTERACTIVE VIGIL' : '01 • ETKİLEŞİMLİ TOPLANMA'}
                  </span>
                  <h4 className="font-serif font-bold text-lg text-[#F8FAFC] group-hover:text-[#F3BE38] transition-colors leading-tight">
                    {language === 'en' ? 'Live Vigil & Anniversary Gathering' : 'Canlı Sene-i Devriye & Anma Odası'}
                  </h4>
                </div>

                <p className="text-xs font-serif text-[#CBD5E1] leading-relaxed">
                  {language === 'en'
                    ? 'Synchronized ambient acoustic melodies, live candle lighting ceremonies, and real-time tribute streams with guests across the globe.'
                    : 'Gerçek zamanlı akustik ezgiler eşliğinde mum yakma, taziye akışı ve katılımcılarla eşzamanlı anma ritüeli.'}
                </p>
              </div>

              <div className="pt-4 border-t border-[#2C3B55] mt-4 flex items-center justify-between text-[11px] font-mono text-[#F3BE38] font-bold relative z-10">
                <span>{language === 'en' ? 'Enter Sanctuary & Listen' : 'Salona Katıl & Dinle'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: DIGITAL TRIBUTES & FOREST GIFTS */}
            <div 
              onClick={() => onOpenTributes && onOpenTributes(featuredMemorial)}
              className="bg-gradient-to-b from-[#183324] to-[#0F2218] text-[#F8FAFC] border-2 border-[#28533B] p-5 flex flex-col justify-between hover:border-[#4ADE80] transition-all duration-300 group cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 relative overflow-hidden rounded-xs"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#4ADE80]/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="space-y-3.5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-full bg-[#224430] border border-[#326145] flex items-center justify-center text-[#4ADE80] group-hover:scale-110 transition">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono uppercase text-[#86EFAC] font-bold bg-[#0A1A11] px-2.5 py-1 border border-[#1C3B29]">
                    {language === 'en' ? 'ENDOWMENT & GIFTS' : 'BAĞIŞ & İKRAM'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#A7F3D0] block mb-1">
                    {language === 'en' ? '02 • LIVING TRIBUTES' : '02 • YAŞAYAN ARMAĞANLAR'}
                  </span>
                  <h4 className="font-serif font-bold text-lg text-[#F8FAFC] group-hover:text-[#4ADE80] transition-colors leading-tight">
                    {language === 'en' ? 'Living Forest & Digital Wreaths' : 'Zarif Dijital Çelenk & Armağanlar'}
                  </h4>
                </div>

                <p className="text-xs font-serif text-[#D1FAE5] leading-relaxed">
                  {language === 'en'
                    ? 'Memorial forest trees via conservation foundations, student education book grants, ivory wreaths, and 365-day eternal flame seals.'
                    : 'Tema hatıra ormanı fidanları, köy okullarına kitap fonu, fildişi çelenk ve 365 gün sönmeyen ebedi kandil mührü.'}
                </p>
              </div>

              <div className="pt-4 border-t border-[#28533B] mt-4 flex items-center justify-between text-[11px] font-mono text-[#4ADE80] font-bold relative z-10">
                <span>{language === 'en' ? 'View Tribute Catalog' : 'Armağan Kataloğu'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: INSTITUTIONAL HERITAGE DOSSIERS */}
            <div 
              onClick={() => onOpenHeritage && onOpenHeritage('archive')}
              className="bg-gradient-to-b from-[#3B1E1E] to-[#261313] text-[#F8FAFC] border-2 border-[#5C3232] p-5 flex flex-col justify-between hover:border-[#F87171] transition-all duration-300 group cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 relative overflow-hidden rounded-xs"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F87171]/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="space-y-3.5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-full bg-[#4E2727] border border-[#6B3737] flex items-center justify-center text-[#FCA5A5] group-hover:scale-110 transition">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono uppercase text-[#FCA5A5] font-bold bg-[#1C0E0E] px-2.5 py-1 border border-[#431F1F]">
                    {language === 'en' ? 'INSTITUTE CURATION' : 'ENSTİTÜ HİZMETİ'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#FECACA] block mb-1">
                    {language === 'en' ? '03 • MUSEUM GRADE' : '03 • MÜZE STANDARDI'}
                  </span>
                  <h4 className="font-serif font-bold text-lg text-[#F8FAFC] group-hover:text-[#FCA5A5] transition-colors leading-tight">
                    {language === 'en' ? 'Corporate & Historic Family Archives' : 'Kurumsal & Aile Arşivi Projeleri'}
                  </h4>
                </div>

                <p className="text-xs font-serif text-[#FEE2E2] leading-relaxed">
                  {language === 'en'
                    ? 'Academic biographical curation, AI voice/photo neural restorations, and archival leather-bound editions for foundations and founders.'
                    : 'Vakıflar, tarihi şahsiyetler ve şirket kurucuları için akademik biyografi, AI ses/fotoğraf restorasyonu ve lüks ciltli kütükler.'}
                </p>
              </div>

              <div className="pt-4 border-t border-[#5C3232] mt-4 flex items-center justify-between text-[11px] font-mono text-[#FCA5A5] font-bold relative z-10">
                <span>{language === 'en' ? 'Institute Commissioning' : 'Proje Başvurusu'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 4: HERITAGE API & CIVIC DATA */}
            <div 
              onClick={() => onOpenHeritage && onOpenHeritage('api')}
              className="bg-gradient-to-b from-[#182635] to-[#0E1721] text-[#F8FAFC] border-2 border-[#2B435C] p-5 flex flex-col justify-between hover:border-[#38BDF8] transition-all duration-300 group cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 relative overflow-hidden rounded-xs"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#38BDF8]/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="space-y-3.5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-full bg-[#203448] border border-[#314E6C] flex items-center justify-center text-[#38BDF8] group-hover:scale-110 transition">
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono uppercase text-[#7DD3FC] font-bold bg-[#091017] px-2.5 py-1 border border-[#192E42]">
                    {language === 'en' ? 'API & INFRASTRUCTURE' : 'API & SAAS'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#BAE6FD] block mb-1">
                    {language === 'en' ? '04 • INFRASTRUCTURE & DATA' : '04 • ALTYAPI VE VERİ'}
                  </span>
                  <h4 className="font-serif font-bold text-lg text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors leading-tight">
                    {language === 'en' ? 'Remembered Registry API & Civic Engine' : 'Remembered API & Miras Altyapısı'}
                  </h4>
                </div>

                <p className="text-xs font-serif text-[#E0F2FE] leading-relaxed">
                  {language === 'en'
                    ? '100-year guaranteed lineage verification, civic cemetery GIS sync, and genealogical developer endpoints for family trusts.'
                    : 'Belediye mezarlık entegrasyonu, soybilim yazılımları ve aile vakıfları için 100 yıl garantili şecere & arşiv API motoru.'}
                </p>
              </div>

              <div className="pt-4 border-t border-[#2B435C] mt-4 flex items-center justify-between text-[11px] font-mono text-[#38BDF8] font-bold relative z-10">
                <span>{language === 'en' ? 'API Documentation' : 'API Dokümantasyonu'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* CANLI HAFIZA PANOSU & KÜRESEL ANMA NABZI (World-Class Interactive Living Memorial Board) */}
      <LiveMemorialPulseBoard
        memorials={memorials}
        onSelectMemorial={onSelectMemorial}
        onOpenHeritage={onOpenHeritage}
      />

    </div>
  );
};

