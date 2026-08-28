import React, { useState } from 'react';
import { MemorialProfile } from '../types';
import { Plus, Share2, Check, Volume2, Flame, Calendar, MapPin, Sparkles, Feather, FileText, QrCode, Camera } from 'lucide-react';

interface HeroSectionProps {
  memorial: MemorialProfile;
  onLightCandle: () => void;
  hasLitCandle: boolean;
  onOpenWriteMemory: () => void;
  onScrollToVoice: () => void;
  onOpenQr: () => void;
  onOpenObituaryCard?: () => void;
  onOpenSocialStudio?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  memorial,
  onLightCandle,
  hasLitCandle,
  onOpenWriteMemory,
  onScrollToVoice,
  onOpenObituaryCard,
  onOpenSocialStudio,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <section id="hero" className="bg-[#F8F8F5] text-[#111111] pt-6 pb-12 px-4 sm:px-6 lg:px-8 border-b-2 border-[#111111]">
      <div className="max-w-5xl mx-auto">
        
        {/* Broadsheet 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column Left: Archival Portrait (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full bg-white p-3 border-2 border-[#111111] shadow-md relative">
              
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EAEAE6] border border-[#111111]/30">
                <img
                  src={memorial.heroImage}
                  alt={memorial.fullName}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.includes('wsrv.nl')) {
                      target.src = 'https://upload.wikimedia.org/wikipedia/commons/2/22/Baris_Manco.jpg';
                    }
                  }}
                  className="w-full h-full object-cover"
                />
                
                {/* Archival Stamp */}
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#111111] text-white text-[10px] font-mono tracking-widest uppercase">
                  ARCHIVAL RECORD
                </div>
              </div>

              {/* Caption Under Portrait */}
              <div className="mt-3 pt-2 border-t border-[#111111]/20 flex items-center justify-between text-xs font-serif italic text-[#555555]">
                <span>{memorial.title}</span>
                <span className="font-mono not-italic text-[10px] text-[#777777]">Registry #{memorial.id}</span>
              </div>
            </div>

            {/* Quick Share, Social Media Studio & Obituary Card action under photo */}
            <div className="w-full mt-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#555555]">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1 text-[#111111] hover:underline cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copied' : 'Share'}</span>
              </button>

              <div className="flex items-center gap-1.5">
                {onOpenSocialStudio && (
                  <button
                    onClick={onOpenSocialStudio}
                    className="inline-flex items-center gap-1 text-[#0F291E] hover:text-white font-bold border border-[#1E4D38] bg-[#D1FAE5]/70 hover:bg-[#0F291E] px-2 py-0.5 transition rounded-xs cursor-pointer shadow-2xs"
                    title="Instagram Story, Post & Archival Banner Studio"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#059669]" />
                    <span>Social Media Kit</span>
                  </button>
                )}

                {onOpenObituaryCard && (
                  <button
                    onClick={onOpenObituaryCard}
                    className="inline-flex items-center gap-1 text-amber-900 hover:text-black font-bold border border-amber-800/40 bg-amber-50 px-2 py-0.5 transition cursor-pointer"
                    title="Download and Share Memorial Obituary Card"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-800" />
                    <span>Obituary Card</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Column Right: Profile Details & Candle Action (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Header Titles */}
            <div className="border-b border-[#111111] pb-4">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#666666] block mb-1">
                OFFICIAL LIVING ARCHIVE &bull; BIOGRAPHICAL REGISTRY
              </span>
              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-[#111111] font-bold tracking-tight leading-tight">
                {memorial.fullName}
              </h1>
              <p className="font-serif text-lg sm:text-xl text-[#444444] italic mt-1">
                {memorial.title}
              </p>
            </div>

            {/* Vital Statistics (Dates & Locations) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 border-b border-[#111111]/20 font-serif">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-mono text-[#777777] block">Life Journey</span>
                <p className="text-sm font-bold text-[#111111] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#111111]" />
                  <span>{memorial.birthDate} &mdash; {memorial.deathDate}</span>
                </p>
              </div>

              {memorial.restingPlace && (
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-mono text-[#777777] block">Eternal Resting Place</span>
                  <p className="text-sm font-bold text-[#111111] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#111111]" />
                    <span className="truncate">{memorial.restingPlace}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Epigraph / Quote */}
            <div className="p-4 bg-white border-l-4 border-[#111111] shadow-xs">
              <blockquote className="font-serif text-base sm:text-lg text-[#222222] italic leading-relaxed">
                &ldquo;{memorial.quote}&rdquo;
              </blockquote>
            </div>

            {/* Digital Candle & Memory Action Box */}
            <div className="p-5 bg-white border border-[#111111] shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#111111]/15 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#777777] block">
                    COMMUNITY TRIBUTE VIGIL
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-serif-display text-3xl font-bold text-[#111111]">
                      {memorial.candleCount}
                    </span>
                    <span className="text-xs font-serif italic text-[#555555]">
                      candles illuminated in cherished remembrance
                    </span>
                  </div>
                </div>

                <button
                  onClick={onLightCandle}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition border ${
                    hasLitCandle
                      ? 'bg-[#111111] text-amber-400 border-[#111111] shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                      : 'bg-white hover:bg-[#111111] text-[#111111] hover:text-white border-[#111111]'
                  }`}
                  id="digital-candle-button"
                >
                  <Flame className={`w-4 h-4 ${hasLitCandle ? 'fill-amber-400' : ''}`} />
                  <span>{hasLitCandle ? 'Candle Lit (Recorded)' : 'Light a Memorial Candle'}</span>
                </button>
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                <button
                  onClick={onOpenWriteMemory}
                  className="inline-flex items-center gap-1.5 font-mono uppercase text-[#111111] hover:underline font-bold"
                  id="hero-write-memory-btn"
                >
                  <Feather className="w-3.5 h-3.5" />
                  <span>Leave a Tribute Letter &rarr;</span>
                </button>

                {memorial.audioRecordings.length > 0 && (
                  <button
                    onClick={onScrollToVoice}
                    className="inline-flex items-center gap-1.5 font-mono uppercase text-[#444444] hover:text-[#111111]"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen to Oral Archive ({memorial.audioRecordings.length})</span>
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
