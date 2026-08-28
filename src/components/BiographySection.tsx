import React, { useState } from 'react';
import { MemorialProfile } from '../types';
import { Volume2, VolumeX, Feather } from 'lucide-react';

interface BiographySectionProps {
  memorial: MemorialProfile;
  onUpdateBiography?: (newBio: string) => void;
}

export const BiographySection: React.FC<BiographySectionProps> = ({ memorial }) => {
  const [isPlayingNarration, setIsPlayingNarration] = useState(false);

  const handleToggleNarration = () => {
    if (!('speechSynthesis' in window)) {
      return;
    }

    if (isPlayingNarration) {
      window.speechSynthesis.cancel();
      setIsPlayingNarration(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${memorial.fullName}. ${memorial.lifeQuote || ''}. ${memorial.biography}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'en-US';
      utterance.rate = 0.90;
      utterance.pitch = 0.95;
      
      utterance.onend = () => setIsPlayingNarration(false);
      utterance.onerror = () => setIsPlayingNarration(false);

      window.speechSynthesis.speak(utterance);
      setIsPlayingNarration(true);
    }
  };

  return (
    <section id="biography" className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-[#111111] border-b border-[#111111]/20">
      <div className="space-y-8">
        
        {/* Section Headline */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-[#111111] pb-3">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#666666] block mb-1">
              SECTION I &bull; OFFICIAL BIOGRAPHY
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#111111] font-bold">
              The Chronicle of a Life
            </h2>
          </div>

          {/* Listen button */}
          <button
            onClick={handleToggleNarration}
            className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition border ${
              isPlayingNarration
                ? 'bg-[#111111] text-white border-[#111111]'
                : 'bg-white hover:bg-[#111111] text-[#111111] hover:text-white border-[#111111]'
            }`}
            title="Listen to official life narration"
          >
            {isPlayingNarration ? (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>Stop Narration</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span>Audio Narration</span>
              </>
            )}
          </button>
        </div>

        {/* Multi-Column Newspaper Article */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Main Column (8 cols) */}
          <div className="md:col-span-8 space-y-6">
            {memorial.biography.split('\n\n').map((para, idx) => (
              <p
                key={idx}
                className={`font-serif text-base sm:text-lg text-[#222222] leading-relaxed text-justify ${
                  idx === 0 ? 'drop-cap' : ''
                }`}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Side Column with Pull-Quote and Key Historical Facts (4 cols) */}
          <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-[#111111]/20 md:pl-6 space-y-6">
            
            {memorial.lifeQuote && (
              <div className="p-4 bg-white border border-[#111111] shadow-xs my-2">
                <p className="font-serif italic text-base text-[#111111] leading-snug">
                  &ldquo;{memorial.lifeQuote}&rdquo;
                </p>
                <span className="block text-[10px] font-mono uppercase text-[#777777] mt-2">
                  — Archival Quote of Life
                </span>
              </div>
            )}

            {/* Serene Resting Place / Eternal Sanctuary Landscape with Deep Infinite Perspective */}
            {memorial.gallery && memorial.gallery.length > 1 && (
              <div className="bg-white border border-[#111111] p-2.5 shadow-xs group">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#ECE5D8] border border-[#111111]/20">
                  <img
                    src={memorial.gallery[1].url}
                    alt={memorial.gallery[1].caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-1.5 left-1.5 bg-[#111111]/90 text-white text-[8px] font-mono px-1.5 py-0.5 uppercase tracking-widest">
                    SANCTUARY & PERPETUAL REST
                  </div>
                </div>
                <div className="pt-2 px-1 text-[11px] font-serif text-[#444444] leading-tight">
                  <p className="line-clamp-3 italic">
                    {memorial.gallery[1].caption}
                  </p>
                  <span className="block text-[9px] font-mono text-[#777777] uppercase mt-1">
                    {memorial.restingPlace || memorial.gallery[1].location}
                  </span>
                </div>
              </div>
            )}

            <div className="bg-[#FAF8F5] p-4 border border-[#111111]/20 space-y-2 text-xs font-serif">
              <h4 className="font-mono uppercase font-bold text-[10px] tracking-widest text-[#111111]">
                Archival Dossier Notes
              </h4>
              <p className="text-[#444444] leading-relaxed">
                This biographical record has been curated from family archives, personal correspondences, and verified historical records.
              </p>
              <div className="text-[10px] font-mono text-[#777777] pt-2 border-t border-[#111111]/10">
                STATUS: Verified Memorial Dossier
              </div>
            </div>

          </div>

        </div>

        {/* Literary Footnote */}
        <div className="pt-4 border-t border-[#111111]/15 flex flex-wrap items-center justify-between text-xs text-[#666666] font-serif italic gap-2">
          <div className="flex items-center gap-2">
            <Feather className="w-3.5 h-3.5 text-[#111111]" />
            <span>Preserved with perpetual care by family, companions, and the global remembrance circle.</span>
          </div>
          <span className="font-mono text-[10px] uppercase not-italic text-[#777777]">{memorial.fullName}</span>
        </div>

      </div>
    </section>
  );
};
