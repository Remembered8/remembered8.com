import React, { useState, useEffect } from 'react';
import { MemorialProfile, MemoryLetter, TimelineMilestone, ArchivalItem, AudioStory, VideoStory, FamilyNode, TimeCapsule, TreeDonation } from './types';
import { INITIAL_MEMORIALS } from './data/memorials';
import { Language } from './lib/i18n';
import { Navbar } from './components/Navbar';
import { BroadsheetLandingHome } from './components/BroadsheetLandingHome';
import { ReminderNotificationBanner } from './components/ReminderNotificationBanner';
import { HeroSection } from './components/HeroSection';
import { TodaySection } from './components/TodaySection';
import { BiographySection } from './components/BiographySection';
import { TimelineSection } from './components/TimelineSection';
import { GallerySection } from './components/GallerySection';
import { VoiceArchiveSection } from './components/VoiceArchiveSection';
import { MemoriesSection } from './components/MemoriesSection';
import { TimeCapsuleSection } from './components/TimeCapsuleSection';
import { MemorialTreeDonationSection } from './components/MemorialTreeDonationSection';
import { FamilyTreeSection } from './components/FamilyTreeSection';
import { FooterManifesto } from './components/FooterManifesto';
import { QrStonePlaqueModal } from './components/QrStonePlaqueModal';
import { ObituaryCardModal } from './components/ObituaryCardModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { SearchExploreModal } from './components/SearchExploreModal';
import { CreateMemorialModal } from './components/CreateMemorialModal';
import { MonetizationStoreModal } from './components/MonetizationStoreModal';
import { FamilyGuardiansModal } from './components/FamilyGuardiansModal';
import { MemorialLiveEventModal } from './components/MemorialLiveEventModal';
import { DigitalTributesModal } from './components/DigitalTributesModal';
import { InstitutionalHeritageModal } from './components/InstitutionalHeritageModal';
import { SocialMediaStudioModal } from './components/SocialMediaStudioModal';
import { CookieConsent, openConsentPreferences } from './components/CookieConsent';
import { LegalNoticeModal } from './components/LegalNoticeModal';
import { Flame, MessageSquarePlus, Volume2, QrCode, Search, Heart, ShoppingBag, Users } from 'lucide-react';

export default function App() {
  const [memorials, setMemorials] = useState<MemorialProfile[]>(() => {
    try {
      const saved = localStorage.getItem('remembered_memorials_v4');
      if (saved) {
        const parsed: MemorialProfile[] = JSON.parse(saved);
        const seedMap = new Map<string, MemorialProfile>();
        INITIAL_MEMORIALS.forEach((m) => seedMap.set(m.id, m));
        parsed.forEach((m) => {
          const seed = seedMap.get(m.id);
          if (seed) {
            seedMap.set(m.id, { 
              ...seed,
              ...m,
              heroImage: seed.heroImage,
              gallery: seed.gallery,
              restingPlace: seed.restingPlace || m.restingPlace
            });
          } else {
            seedMap.set(m.id, m);
          }
        });
        return Array.from(seedMap.values());
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_MEMORIALS;
  });

  const [currentId, setCurrentId] = useState<string>('albert-einstein');
  const [viewMode, setViewMode] = useState<'home' | 'profile'>('home');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [hasLitCandle, setHasLitCandle] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'tr' : 'en');
  };

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isObituaryCardOpen, setIsObituaryCardOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isGuardiansModalOpen, setIsGuardiansModalOpen] = useState(false);
  const [isLiveEventOpen, setIsLiveEventOpen] = useState(false);
  const [isTributesOpen, setIsTributesOpen] = useState(false);
  const [isHeritageOpen, setIsHeritageOpen] = useState(false);
  const [heritageInitialTab, setHeritageInitialTab] = useState<'archive' | 'api'>('archive');
  const [isSocialStudioOpen, setIsSocialStudioOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalInitialTab, setLegalInitialTab] = useState<'privacy' | 'cookies'>('privacy');
  const [targetMemorialForModal, setTargetMemorialForModal] = useState<MemorialProfile | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('remembered_memorials_v4', JSON.stringify(memorials));
    } catch (e) {
      console.error(e);
    }
  }, [memorials]);

  const currentMemorial = memorials.find((m) => m.id === currentId) || memorials[0];

  // Helper to update active memorial in list
  const updateActiveMemorial = (updater: (prev: MemorialProfile) => MemorialProfile) => {
    setMemorials((prevList) =>
      prevList.map((item) => (item.id === currentMemorial.id ? updater(item) : item))
    );
  };

  // Light candle action
  const handleLightCandle = () => {
    setHasLitCandle(true);
    updateActiveMemorial((prev) => {
      const newCandleCount = prev.candleCount + 1;
      const newVisitedCount = prev.visitedTodayCount + 1;
      const newActivity = [
        {
          id: `act-${Date.now()}`,
          actor: 'A Visitor',
          action: 'silently lit a memorial candle.',
          timeAgo: 'Just now',
          type: 'candle' as const,
        },
        ...prev.todayActivity,
      ];

      return {
        ...prev,
        candleCount: newCandleCount,
        visitedTodayCount: newVisitedCount,
        todayActivity: newActivity,
      };
    });
  };

  // Add Flower action
  const handleAddFlower = (flowerName: string) => {
    updateActiveMemorial((prev) => {
      const newVisitedCount = prev.visitedTodayCount + 1;
      const newActivity = [
        {
          id: `act-${Date.now()}`,
          actor: 'A Visitor',
          action: `placed a ${flowerName} in tribute.`,
          timeAgo: 'Just now',
          type: 'candle' as const,
        },
        ...prev.todayActivity,
      ];

      return {
        ...prev,
        visitedTodayCount: newVisitedCount,
        todayActivity: newActivity,
      };
    });
  };

  // Navigate section helper
  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Modal helpers for Live Event, Tributes, Heritage
  const handleOpenLiveEvent = (memorial?: MemorialProfile) => {
    setTargetMemorialForModal(memorial || currentMemorial);
    setIsLiveEventOpen(true);
  };

  const handleOpenTributes = (memorial?: MemorialProfile) => {
    setTargetMemorialForModal(memorial || currentMemorial);
    setIsTributesOpen(true);
  };

  const handleOpenHeritage = (tab: 'archive' | 'api' = 'archive') => {
    setHeritageInitialTab(tab);
    setTargetMemorialForModal(currentMemorial);
    setIsHeritageOpen(true);
  };

  const handleOpenSocialStudio = (memorial?: MemorialProfile) => {
    setTargetMemorialForModal(memorial || currentMemorial);
    setIsSocialStudioOpen(true);
  };

  // Add memory letter
  const handleAddMemory = (newMem: Omit<MemoryLetter, 'id' | 'isApproved'>) => {
    const memoryItem: MemoryLetter = {
      ...newMem,
      id: `mem-${Date.now()}`,
      isApproved: true,
    };

    updateActiveMemorial((prev) => ({
      ...prev,
      memories: [memoryItem, ...prev.memories],
      todayActivity: [
        {
          id: `act-${Date.now()}`,
          actor: memoryItem.authorName,
          action: `left a tribute letter: "${memoryItem.content.slice(0, 32)}..."`,
          timeAgo: 'Just now',
          type: 'memory',
        },
        ...prev.todayActivity,
      ],
    }));
  };

  // Update Biography from AI
  const handleUpdateBiography = (newBio: string) => {
    updateActiveMemorial((prev) => ({
      ...prev,
      biography: newBio,
    }));
  };

  // Add timeline milestone
  const handleAddMilestone = (milestone: Omit<TimelineMilestone, 'id'>) => {
    const newM: TimelineMilestone = {
      ...milestone,
      id: `ml-${Date.now()}`,
    };

    updateActiveMemorial((prev) => ({
      ...prev,
      timelineEvents: [...prev.timelineEvents, newM].sort((a, b) => parseInt(String(a.year)) - parseInt(String(b.year))),
      todayActivity: [
        {
          id: `act-${Date.now()}`,
          actor: 'Family Custodian',
          action: `recorded a new milestone (${newM.year}: ${newM.title})`,
          timeAgo: 'Just now',
          type: 'milestone',
        },
        ...prev.todayActivity,
      ],
    }));
  };

  // Add Archival Item
  const handleAddArchivalItem = (item: Omit<ArchivalItem, 'id'>) => {
    const newArch: ArchivalItem = {
      ...item,
      id: `arch-${Date.now()}`,
    };

    updateActiveMemorial((prev) => ({
      ...prev,
      gallery: [newArch, ...prev.gallery],
      todayActivity: [
        {
          id: `act-${Date.now()}`,
          actor: 'Archival Custodian',
          action: `added a new ${item.isDocument ? 'archival document' : 'photograph'} to the registry.`,
          timeAgo: 'Just now',
          type: 'photo',
        },
        ...prev.todayActivity,
      ],
    }));
  };

  // Add Audio Story
  const handleAddAudioStory = (story: AudioStory) => {
    updateActiveMemorial((prev) => ({
      ...prev,
      audioRecordings: [story, ...prev.audioRecordings],
      todayActivity: [
        {
          id: `act-${Date.now()}`,
          actor: 'A Family Member',
          action: `contributed a voice chronicle: "${story.title}"`,
          timeAgo: 'Just now',
          type: 'voice',
        },
        ...prev.todayActivity,
      ],
    }));
  };

  // Add Video Story
  const handleAddVideoStory = (video: VideoStory) => {
    updateActiveMemorial((prev) => ({
      ...prev,
      videos: [video, ...prev.videos],
    }));
  };

  // Add Family Member
  const handleAddFamilyMember = (member: Omit<FamilyNode, 'id'>) => {
    const newMember: FamilyNode = {
      ...member,
      id: `fam-${Date.now()}`,
    };

    updateActiveMemorial((prev) => ({
      ...prev,
      familyTree: [...prev.familyTree, newMember],
    }));
  };

  // Partial Update Memorial (from Admin Panel)
  const handleUpdateMemorial = (updated: Partial<MemorialProfile>) => {
    updateActiveMemorial((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  // Admin memory moderation
  const handleApproveMemory = (memoryId: string) => {
    updateActiveMemorial((prev) => ({
      ...prev,
      memories: prev.memories.map((m) => (m.id === memoryId ? { ...m, isApproved: true } : m)),
    }));
  };

  const handleDeleteMemory = (memoryId: string) => {
    updateActiveMemorial((prev) => ({
      ...prev,
      memories: prev.memories.filter((m) => m.id !== memoryId),
    }));
  };

  const handleToggleHighlightMemory = (memoryId: string) => {
    updateActiveMemorial((prev) => ({
      ...prev,
      memories: prev.memories.map((m) => (m.id === memoryId ? { ...m, isHighlighted: !m.isHighlighted } : m)),
    }));
  };

  // Create Memorial
  const handleCreateMemorial = (newProfile: MemorialProfile) => {
    setMemorials((prev) => [newProfile, ...prev]);
    setCurrentId(newProfile.id);
  };

  // Switch Memorial
  const handleSelectMemorial = (memorial: MemorialProfile) => {
    setCurrentId(memorial.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8F8F5] text-[#111111] selection:bg-[#111111] selection:text-white flex flex-col font-serif">
      
      {/* Top Remembrance Notification */}
      {viewMode === 'profile' && (
        <ReminderNotificationBanner
          memorial={currentMemorial}
          onOpenWriteMemory={() => {
            const el = document.getElementById('memories');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            const btn = document.getElementById('write-memory-letter-btn');
            if (btn) btn.click();
          }}
        />
      )}

      {/* Main Elegant Navbar */}
      <Navbar
        currentMemorial={currentMemorial}
        memorials={memorials}
        onSelectMemorial={(m) => {
          handleSelectMemorial(m);
          setViewMode('profile');
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCreate={() => setIsCreateModalOpen(true)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onOpenQr={() => setIsQrModalOpen(true)}
        onOpenStore={() => setIsStoreModalOpen(true)}
        onOpenGuardians={() => setIsGuardiansModalOpen(true)}
        onOpenSocialStudio={handleOpenSocialStudio}
        activeSection={activeSection}
        onNavigateSection={handleNavigateSection}
        viewMode={viewMode}
        onSetViewMode={setViewMode}
        language={language}
        onToggleLanguage={toggleLanguage}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {viewMode === 'home' ? (
          <BroadsheetLandingHome
            memorials={memorials}
            onSelectMemorial={(m) => {
              handleSelectMemorial(m);
              setViewMode('profile');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCreate={() => setIsCreateModalOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenStore={() => setIsStoreModalOpen(true)}
            onOpenLiveEvent={handleOpenLiveEvent}
            onOpenTributes={handleOpenTributes}
            onOpenHeritage={handleOpenHeritage}
            onOpenSocialStudio={handleOpenSocialStudio}
            language={language}
          />
        ) : (
          <>
            {/* 1. Memorial Hero Section & Digital Candle */}
            <HeroSection
              memorial={currentMemorial}
              onLightCandle={handleLightCandle}
              hasLitCandle={hasLitCandle}
              onOpenWriteMemory={() => {
                const el = document.getElementById('memories');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                const btn = document.getElementById('write-memory-letter-btn');
                if (btn) btn.click();
              }}
              onScrollToVoice={() => handleNavigateSection('voice')}
              onOpenQr={() => setIsQrModalOpen(true)}
              onOpenObituaryCard={() => setIsObituaryCardOpen(true)}
              onOpenSocialStudio={() => handleOpenSocialStudio(currentMemorial)}
            />

            {/* 2. Today's Remembrance & Visitors */}
            <TodaySection
              memorial={currentMemorial}
              onAddFlower={handleAddFlower}
              onOpenWriteMemory={() => {
                const el = document.getElementById('memories');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                const btn = document.getElementById('write-memory-letter-btn');
                if (btn) btn.click();
              }}
            />

            {/* 3. Biography (Chronological, literary life story) */}
            <BiographySection
              memorial={currentMemorial}
              onUpdateBiography={handleUpdateBiography}
            />

            {/* 4. Chronological Timeline */}
            <TimelineSection
              memorial={currentMemorial}
              onAddMilestone={handleAddMilestone}
            />

            {/* 5. Photographs and Historical Documents */}
            <GallerySection
              memorial={currentMemorial}
              onAddArchivalItem={handleAddArchivalItem}
            />

            {/* 6. Oral History & Voice Audio Recordings */}
            <VoiceArchiveSection
              memorial={currentMemorial}
              onAddAudioStory={handleAddAudioStory}
              onAddVideoStory={handleAddVideoStory}
            />

            {/* 7. Tribute Letters Register */}
            <MemoriesSection
              memorial={currentMemorial}
              onAddMemory={handleAddMemory}
            />

            {/* 8. Sealed Time Capsules & Legacy Deeds */}
            <TimeCapsuleSection
              memorial={currentMemorial}
              onAddCapsule={(capsule) => {
                updateActiveMemorial((prev) => ({
                  ...prev,
                  timeCapsules: [capsule, ...(prev.timeCapsules || [])],
                  todayActivity: [
                    {
                      id: `act-${Date.now()}`,
                      actor: 'Family Custodian',
                      action: `sealed a new time capsule ("${capsule.title}")`,
                      timeAgo: 'Just now',
                      type: 'milestone',
                    },
                    ...prev.todayActivity,
                  ],
                }));
              }}
            />

            {/* 9. Memorial Living Forest & Tree Dedications */}
            <MemorialTreeDonationSection
              memorial={currentMemorial}
              onAddDonation={(donation) => {
                updateActiveMemorial((prev) => ({
                  ...prev,
                  treeDonations: [donation, ...(prev.treeDonations || [])],
                  todayActivity: [
                    {
                      id: `act-${Date.now()}`,
                      actor: donation.donorName,
                      action: `planted ${donation.treesCount} memorial tree(s) in honor of ${currentMemorial.fullName}.`,
                      timeAgo: 'Just now',
                      type: 'candle',
                    },
                    ...prev.todayActivity,
                  ],
                }));
              }}
            />

            {/* 10. Family Tree & Lineage */}
            <FamilyTreeSection
              memorial={currentMemorial}
              onAddFamilyMember={handleAddFamilyMember}
              onSelectMemorialById={(id) => {
                const found = memorials.find((m) => m.id === id);
                if (found) {
                  handleSelectMemorial(found);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            />
          </>
        )}
      </main>

      {/* Brand Manifesto & Pillars Footer */}
      <FooterManifesto
        onOpenCreate={() => setIsCreateModalOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        language={language}
        onOpenPrivacy={() => {
          setLegalInitialTab('privacy');
          setIsLegalOpen(true);
        }}
        onOpenCookiePolicy={() => {
          setLegalInitialTab('cookies');
          setIsLegalOpen(true);
        }}
        onOpenCookiePreferences={openConsentPreferences}
      />

      {/* Mobile Floating Action Dock (Ergonomic 44px touch targets, warm NYT parchment) */}
      <aside 
        aria-label="Quick Actions Dock"
        className="md:hidden fixed bottom-3 left-3 right-3 z-40 bg-[#FAF8F5]/95 backdrop-blur-lg border border-[#D0C5B2] rounded-full px-2 py-1.5 flex items-center justify-around shadow-xl"
      >
        {/* 1. Light Candle */}
        <button
          onClick={handleLightCandle}
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center p-1 rounded-full transition active:scale-95 ${
            hasLitCandle ? 'text-[#855327] font-bold' : 'text-[#2B2724]'
          }`}
          title="Light Candle"
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            hasLitCandle 
              ? 'bg-[#2B2724] text-[#F3BE38] shadow-sm ring-2 ring-[#C29B38]/30' 
              : 'bg-[#EDE5D6] text-[#2B2724]'
          }`}>
            <Flame className={`w-4 h-4 ${hasLitCandle ? 'fill-[#F3BE38]' : ''}`} />
          </div>
          <span className="text-[9px] font-mono uppercase tracking-tight mt-0.5">
            {hasLitCandle ? 'Candle Lit' : 'Light Candle'}
          </span>
        </button>

        {/* 2. Leave Tribute */}
        <button
          onClick={() => {
            const el = document.getElementById('memories');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            const btn = document.getElementById('write-memory-letter-btn');
            if (btn) btn.click();
          }}
          className="min-h-[44px] min-w-[44px] flex flex-col items-center justify-center p-1 text-[#2B2724] active:scale-95 transition"
          title="Leave Tribute"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#EDE5D6] text-[#2B2724]">
            <MessageSquarePlus className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-mono uppercase tracking-tight mt-0.5">Tribute</span>
        </button>

        {/* 3. Listen Voice */}
        <button
          onClick={() => {
            handleNavigateSection('voice');
          }}
          className="min-h-[44px] min-w-[44px] flex flex-col items-center justify-center p-1 text-[#2B2724] active:scale-95 transition"
          title="Listen Audio Archive"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#EDE5D6] text-[#2B2724]">
            <Volume2 className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-mono uppercase tracking-tight mt-0.5">Voice</span>
        </button>

        {/* 4. QR Stone Plaque */}
        <button
          onClick={() => setIsQrModalOpen(true)}
          className="min-h-[44px] min-w-[44px] flex flex-col items-center justify-center p-1 text-[#2B2724] active:scale-95 transition"
          title="QR Medallion"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#EDE5D6] text-[#2B2724]">
            <QrCode className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-mono uppercase tracking-tight mt-0.5">QR Plaque</span>
        </button>

        {/* 5. Search / Directory */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="min-h-[44px] min-w-[44px] flex flex-col items-center justify-center p-1 text-[#2B2724] active:scale-95 transition"
          title="Search Registry"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#2B2724] text-[#FAF8F5] shadow-2xs">
            <Search className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-mono uppercase tracking-tight mt-0.5">Directory</span>
        </button>
      </aside>

      {/* MODALS */}
      <QrStonePlaqueModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        memorial={currentMemorial}
        onOpenStore={() => setIsStoreModalOpen(true)}
      />

      <ObituaryCardModal
        isOpen={isObituaryCardOpen}
        onClose={() => setIsObituaryCardOpen(false)}
        memorial={currentMemorial}
      />

      <AdminPanelModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        memorial={currentMemorial}
        onUpdateMemorial={handleUpdateMemorial}
        onApproveMemory={handleApproveMemory}
        onDeleteMemory={handleDeleteMemory}
        onToggleHighlightMemory={handleToggleHighlightMemory}
      />

      <SearchExploreModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        memorials={memorials}
        onSelectMemorial={handleSelectMemorial}
      />

      <CreateMemorialModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateMemorial={handleCreateMemorial}
        existingMemorials={memorials}
        onSelectExisting={(m) => {
          handleSelectMemorial(m);
          setViewMode('profile');
        }}
      />

      <MonetizationStoreModal
        isOpen={isStoreModalOpen}
        onClose={() => setIsStoreModalOpen(false)}
        memorial={currentMemorial}
        onOrderPlaque={(order) => {
          updateActiveMemorial((prev) => ({
            ...prev,
            plaqueOrders: [order, ...(prev.plaqueOrders || [])],
          }));
        }}
      />

      <FamilyGuardiansModal
        isOpen={isGuardiansModalOpen}
        onClose={() => setIsGuardiansModalOpen(false)}
        memorial={currentMemorial}
        onUpdateGuardians={(guardians) => {
          updateActiveMemorial((prev) => ({
            ...prev,
            guardians,
          }));
        }}
      />

      {/* Real-time Memorial Live Gathering Modal */}
      {isLiveEventOpen && (
        <MemorialLiveEventModal
          isOpen={isLiveEventOpen}
          onClose={() => setIsLiveEventOpen(false)}
          memorial={targetMemorialForModal || currentMemorial}
        />
      )}

      {/* Premium Digital Tributes Modal */}
      {isTributesOpen && (
        <DigitalTributesModal
          isOpen={isTributesOpen}
          onClose={() => setIsTributesOpen(false)}
          memorial={targetMemorialForModal || currentMemorial}
        />
      )}

      {/* Institutional Heritage & API Infrastructure Modal */}
      {isHeritageOpen && (
        <InstitutionalHeritageModal
          isOpen={isHeritageOpen}
          onClose={() => setIsHeritageOpen(false)}
          initialTab={heritageInitialTab}
        />
      )}

      {/* Social Media & Press Kit Studio Modal */}
      {isSocialStudioOpen && (
        <SocialMediaStudioModal
          isOpen={isSocialStudioOpen}
          onClose={() => setIsSocialStudioOpen(false)}
          memorials={memorials}
          initialMemorial={targetMemorialForModal || currentMemorial}
        />
      )}

      {/* Privacy notice & cookie policy */}
      <LegalNoticeModal
        // Remount on tab change so the requested tab is the one that opens.
        key={legalInitialTab}
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
        language={language}
        initialTab={legalInitialTab}
      />

      {/* GDPR / KVKK consent gate: nothing third-party loads before this resolves */}
      <CookieConsent
        language={language}
        onOpenPolicy={() => {
          setLegalInitialTab('cookies');
          setIsLegalOpen(true);
        }}
      />

    </div>
  );
}
