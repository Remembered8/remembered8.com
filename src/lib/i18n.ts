export type Language = 'en' | 'tr';

export interface TranslationDictionary {
  brand: {
    name: string;
    tagline: string;
    subTagline: string;
    archiveNumber: string;
  };
  nav: {
    explore: string;
    todayInHistory: string;
    search: string;
    createMemorial: string;
    guardians: string;
    socialStudio: string;
    qrPlaque: string;
    switchLang: string;
  };
  home: {
    dailyArchive: string;
    todayInHistoryBadge: string;
    livingRegistryBadge: string;
    onAir: string;
    examineDossier: string;
    lightCandle: string;
    plantTree: string;
    viewGenealogy: string;
    searchPlaceholder: string;
    allMemorials: string;
    historicFigures: string;
    recentDossiers: string;
    candleCountLabel: string;
    lettersCountLabel: string;
    treesCountLabel: string;
    globalPulseTitle: string;
    globalPulseSubtitle: string;
    liveFeed: string;
    activeMemorialCenters: string;
    sendTribute: string;
  };
  profile: {
    birthAndDeath: string;
    restingPlace: string;
    birthPlace: string;
    profession: string;
    officialDossier: string;
    biography: string;
    timeline: string;
    gallery: string;
    voiceArchive: string;
    familyTree: string;
    timeCapsules: string;
    memoryBook: string;
    treeDonations: string;
    lightACandle: string;
    writeMemory: string;
    sharePage: string;
    downloadObituary: string;
    socialMediaKit: string;
    qrStonePlaque: string;
    verifiedHistoricDossier: string;
  };
  studio: {
    title: string;
    badge: string;
    selectPerson: string;
    format: string;
    theme: string;
    template: string;
    quotePrompt: string;
    qrToggle: string;
    frameToggle: string;
    downloadBtn: string;
    shareBtn: string;
    copyCaption: string;
    copied: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    brand: {
      name: 'Remembered',
      tagline: 'The Living Archive of Human Memory',
      subTagline: 'Wikipedia tells what someone did. Remembered preserves how they lived, loved, and why they are forever remembered.',
      archiveNumber: 'GLOBAL HUMAN HERITAGE DOSSIER',
    },
    nav: {
      explore: 'Global Archives',
      todayInHistory: 'On This Day',
      search: 'Search Registry...',
      createMemorial: 'Open a Dossier',
      guardians: 'Family Guardians',
      socialStudio: 'Press & Social Studio',
      qrPlaque: 'Stone QR Plaques',
      switchLang: 'Language',
    },
    home: {
      dailyArchive: 'DAILY ARCHIVAL EDITION',
      todayInHistoryBadge: 'HISTORIC LEGACY',
      livingRegistryBadge: 'LIVING MEMORY COUNCIL',
      onAir: 'LIVE PULSE',
      examineDossier: 'Examine Dossier & Light Candle',
      lightCandle: 'Light an Eternal Flame',
      plantTree: 'Gift a Memorial Tree',
      viewGenealogy: 'Genealogy & Family Tree',
      searchPlaceholder: 'Search historical figures, ancestors, cities or dates...',
      allMemorials: 'All Living Dossiers',
      historicFigures: 'Pioneers & World Icons',
      recentDossiers: 'Family Legacies',
      candleCountLabel: 'Candles Burning',
      lettersCountLabel: 'Archived Memories',
      treesCountLabel: 'Living Trees',
      globalPulseTitle: 'Global Memorial Pulse & Live Remembrance Council',
      globalPulseSubtitle: 'Real-time candles, voice letters, and forest gifts synchronized across continents.',
      liveFeed: 'Live Remembrance Feed',
      activeMemorialCenters: 'Active Remembrance Centers',
      sendTribute: 'Send a Live Tribute',
    },
    profile: {
      birthAndDeath: 'Life Span',
      restingPlace: 'Resting Sanctuary',
      birthPlace: 'Place of Birth',
      profession: 'Vocation & Legacy',
      officialDossier: 'Official Living Memorial Dossier',
      biography: 'Life Chronicle & Philosophy',
      timeline: 'Chronological Milestones',
      gallery: 'Historical Image Vault',
      voiceArchive: 'Voice Chronicles & Audio Archives',
      familyTree: 'Lineage & Family Tree',
      timeCapsules: 'Sealed Time Capsules',
      memoryBook: 'Visitor Memorial Register',
      treeDonations: 'Living Memorial Forest',
      lightACandle: 'Light a Candle',
      writeMemory: 'Leave a Memory Letter',
      sharePage: 'Share Dossier',
      downloadObituary: 'Memorial Gazette Card',
      socialMediaKit: 'Social & Press Kit',
      qrStonePlaque: 'Stone & Sanctuary QR Plaque',
      verifiedHistoricDossier: 'VERIFIED HISTORICAL FIGURE',
    },
    studio: {
      title: 'Press & Social Media Content Studio',
      badge: 'HIGH RESOLUTION 4K EXPORT',
      selectPerson: 'Choose Historical or Family Dossier',
      format: 'Export Format',
      theme: 'Archival Theme',
      template: 'Story Narrative Template',
      quotePrompt: 'Key Philosophical Quote or Remembrance:',
      qrToggle: 'Include QR Code',
      frameToggle: 'Gold Leaf Filigree',
      downloadBtn: 'DOWNLOAD VISUAL (PNG)',
      shareBtn: 'SHARE TO SOCIAL',
      copyCaption: 'COPY READY CAPTION',
      copied: 'COPIED TO CLIPBOARD!',
    },
  },
  tr: {
    brand: {
      name: 'Remembered',
      tagline: 'Insan Hafizasinin Ebedi Canli Arsivi',
      subTagline: 'Wikipedia bir insanin ne yaptigini anlatir. Remembered o insanin nasil yasadigini ve neden hatirlandigini yasatir.',
      archiveNumber: 'KURESEL INSANLIK MIRASI KUTUGU',
    },
    nav: {
      explore: 'Kutuk Arsivi',
      todayInHistory: 'Tarihte Bugun',
      search: 'Kutuklerde Ara...',
      createMemorial: 'Yeni Kutuk Ac',
      guardians: 'Aile Koruyuculari',
      socialStudio: 'Basin & Sosyal Medya Studyosu',
      qrPlaque: 'QR Mezar Plaketleri',
      switchLang: 'Dil Secimi',
    },
    home: {
      dailyArchive: 'GUNLUK MATBU GAZETE BASKISI',
      todayInHistoryBadge: 'TARIHI MIRAS',
      livingRegistryBadge: 'EBEDI CANLI HAFIZA MECLISI',
      onAir: 'CANLI YAYIN',
      examineDossier: 'Kutugu Incele & Mum Yak',
      lightCandle: 'Kandil Yak',
      plantTree: 'Hatira Fidani Armagan Et',
      viewGenealogy: 'Secere & Soyagaci',
      searchPlaceholder: 'Tarihi sahsiyet, aile buyugu, meslek veya sehir ara...',
      allMemorials: 'Tum Canli Kutukler',
      historicFigures: 'Tarihe Iz Birakanlar',
      recentDossiers: 'Aile Kutukleri',
      candleCountLabel: 'Yanan Kandil',
      lettersCountLabel: 'Hatira Mektubu',
      treesCountLabel: 'Yeseren Fidan',
      globalPulseTitle: 'Canli Anma & Etkilesim Panosu — Kuresel Hafiza Meclisi',
      globalPulseSubtitle: 'Kitalararasi anlik kandiller, sesli taziye mektuplari ve canli anma fenerleri.',
      liveFeed: 'Canli Hatira Akisi',
      activeMemorialCenters: 'Aktif Anma Merkezleri',
      sendTribute: 'Canli Vefa Gonder',
    },
    profile: {
      birthAndDeath: 'Omur Tarihleri',
      restingPlace: 'Ebedi Istirahatgah',
      birthPlace: 'Dogum Yeri',
      profession: 'Unvan & Miras',
      officialDossier: 'Resmi Ebedi Anma Kutugu',
      biography: 'Edebi Yasam Oykusu & Felsefesi',
      timeline: 'Kronolojik Yasam Cizelgesi',
      gallery: 'Tarihi Fotograf Arsivi',
      voiceArchive: 'Sesli Hatira Sandigi & Ses Kayitlari',
      familyTree: 'Kusaklararasi Soyagaci & Secere',
      timeCapsules: 'Muhurlu Zaman Kapsulleri',
      memoryBook: 'Ziyaretci Hatira Defteri',
      treeDonations: 'TEMA Hatira Ormani',
      lightACandle: 'Kandil Yak',
      writeMemory: 'Hatira Mektubu Birak',
      sharePage: 'Kutugu Paylas',
      downloadObituary: 'Vefat Ilani / Karti',
      socialMediaKit: 'Sosyal Medya Kiti',
      qrStonePlaque: 'Mezar Basi QR Plaket',
      verifiedHistoricDossier: 'DOGRULANMIS TARIHI KUTUK',
    },
    studio: {
      title: 'Basin & Sosyal Medya Icerik Studyosu',
      badge: 'YUKSEK COZUNURLUK (PNG & 4K)',
      selectPerson: 'Kimin Adina Kart Uretilsin?',
      format: 'Gorsel Formati',
      theme: 'Arsiv Temasi & Varak',
      template: 'Icerik Sablonu',
      quotePrompt: 'One Cikan Ozlu Soz / Taziye Cumlesi:',
      qrToggle: 'Kutuk QR Kodu',
      frameToggle: 'Varak Cerceve',
      downloadBtn: 'GORSELI INDIR (PNG)',
      shareBtn: 'SOSYAL MEDYADA PAYLAS',
      copyCaption: 'METNI KOPYALA',
      copied: 'METIN KOPYALANDI!',
    },
  },
};
