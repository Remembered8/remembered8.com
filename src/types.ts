export type PrivacyLevel = 'public' | 'family_only' | 'private_link';

export type MilestoneCategory = 'life' | 'career' | 'family' | 'travel' | 'creation' | 'milestone';

export interface TimelineMilestone {
  id: string;
  year: number | string;
  date?: string;
  title: string;
  category: MilestoneCategory;
  description: string;
  image?: string;
  location?: string;
}

export interface AudioStory {
  id: string;
  title: string;
  year?: string;
  duration: string;
  description: string;
  audioUrl?: string; // audio data or synthesized speech
  transcript?: string; // AI speech-to-text transcription
  speakerRelation?: string;
  isAiEnhanced?: boolean;
  transcription?: string;
}

export interface VideoStory {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  year?: string;
  description?: string;
}

export interface ArchivalItem {
  id: string;
  url: string;
  caption: string;
  year?: string;
  location?: string;
  isDocument?: boolean;
  category?: string;
}

export interface MemoryLetter {
  id: string;
  authorName: string;
  relation: string; // e.g. "Kızı", "Eski Öğrencisi", "Torunu", "Dostu"
  date: string;
  content: string;
  photoUrl?: string;
  audioNote?: string;
  isApproved: boolean;
  isHighlighted?: boolean;
  pinned?: boolean;
}

export type FamilyRelationType = 
  | 'father'
  | 'mother'
  | 'spouse'
  | 'sibling'
  | 'child'
  | 'grandchild'
  | 'grandparent'
  | 'ancestor';

export interface FamilyNode {
  id: string;
  name: string;
  relationType: FamilyRelationType;
  relationLabel: string;
  years?: string;
  photo?: string;
  linkedMemorialId?: string;
  notes?: string;
}

export interface FamilyGuardian {
  id: string;
  name: string;
  email: string;
  role: 'Owner (Founder)' | 'Family Custodian' | 'Trustee & Legal Guardian' | 'Archivist & Historian' | 'Sahip (Kurucu)' | 'Aile Koruyucusu' | 'Vesayet Yetkilisi' | 'Tarihçi / Katkıcı' | string;
  permissions: Array<'approve_memories' | 'edit_bio' | 'upload_media' | 'manage_privacy'>;
  addedDate: string;
}

export type PlaqueMaterial = 'porcelain' | 'titanium_black' | 'brushed_brass' | 'granite_embedded';
export type PlaqueSize = 'standard_10x10' | 'large_15x15' | 'monument_20x20';

export interface PhygitalPlaqueOrder {
  id: string;
  material: PlaqueMaterial;
  size: PlaqueSize;
  title: string;
  status: 'draft' | 'laser_engraving' | 'shipped' | 'delivered';
  qrPreviewUrl: string;
  shippingAddress?: string;
  estimatedDelivery?: string;
  priceTl: number;
}

export interface BookPrintConfig {
  coverTitle: string;
  coverSubtitle: string;
  pageCount: number;
  includeMemories: boolean;
  includeAudioTranscripts: boolean;
  bindingType: 'hardcover_linen' | 'leather_embossed' | 'broadsheet_box';
  previewPdfUrl?: string;
}

export interface SubscriptionTier {
  planId: 'free_perpetual' | 'premium_heritage' | 'dynasty_archive';
  label: string;
  price: string;
  storageLimit: string;
  isCurrent?: boolean;
}

export interface TimeCapsule {
  id: string;
  title: string;
  author: string;
  recipient: string; // Örn: 'Torunum Zeynep için', 'Tüm Aile için'
  unlockDate: string; // Örn: '2035-10-29'
  isLocked: boolean;
  type: 'letter' | 'audio_testament' | 'video_confession' | 'document';
  contentPreview: string; // Kilitliyken görünen mühürlü özet
  fullContent?: string;
  sealedAt: string;
  notaryVerificationCode?: string;
}

export interface TreeDonation {
  id: string;
  donorName: string;
  treesCount: number;
  organization: 'World Heritage Forest Project' | 'National Memorial Parks' | 'TEMA Foundation' | 'TEMA Vakfı' | 'Darüşşafaka' | 'LÖSEV Hatıra Ormanı' | string;
  message: string;
  donatedAt: string;
  certificateCode: string;
}

export interface MemorialProfile {
  id: string;
  slug: string;
  fullName: string;
  birthDate: string;
  deathDate: string;
  birthPlace: string;
  restingPlace: string;
  profession: string;
  lifeQuote: string;
  heroImage: string;
  coverAccentColor?: string;
  biography: string;
  candleCount: number;
  visitedTodayCount: number;
  privacy: PrivacyLevel;
  adminEmail: string;
  isVerifiedHistoric?: boolean; // Doğrulanmış Tarihi Şahsiyet Rozeti
  tier?: 'free_perpetual' | 'premium_heritage' | 'dynasty_archive';
  guardians?: FamilyGuardian[];
  plaqueOrders?: PhygitalPlaqueOrder[];
  bookConfig?: BookPrintConfig;
  timelineEvents: TimelineMilestone[];
  gallery: ArchivalItem[];
  audioRecordings: AudioStory[];
  videos: VideoStory[];
  memories: MemoryLetter[];
  familyTree: FamilyNode[];
  timeCapsules?: TimeCapsule[];
  treeDonations?: TreeDonation[];
  importantDates: Array<{
    id: string;
    title: string;
    date: string;
    type: 'birthday' | 'anniversary' | 'special';
    formattedDate: string;
  }>;
  todayActivity: Array<{
    id: string;
    actor: string;
    action: string;
    timeAgo: string;
    type: 'memory' | 'photo' | 'flower' | 'visit' | 'candle' | 'milestone' | 'voice' | 'tree' | 'capsule';
  }>;
}

export interface SearchFilters {
  query: string;
  city?: string;
  profession?: string;
  era?: string;
  onlyPublic?: boolean;
}

