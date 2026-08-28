import React, { useState } from 'react';
import { MemorialProfile, PhygitalPlaqueOrder, PlaqueMaterial, PlaqueSize } from '../types';
import { QrCode, BookOpen, Crown, Shield, Sparkles, Check, Package, Printer, ArrowRight, Truck, Heart, FileText } from 'lucide-react';

interface MonetizationStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  memorial: MemorialProfile;
  onOrderPlaque?: (order: PhygitalPlaqueOrder) => void;
}

export const MonetizationStoreModal: React.FC<MonetizationStoreModalProps> = ({
  isOpen,
  onClose,
  memorial,
  onOrderPlaque,
}) => {
  const [activeTab, setActiveTab] = useState<'plaque' | 'book' | 'tier'>('plaque');

  // Plaque Form State
  const [material, setMaterial] = useState<PlaqueMaterial>('porcelain');
  const [size, setSize] = useState<PlaqueSize>('standard_10x10');
  const [customEngraving, setCustomEngraving] = useState(`${memorial.fullName} &bull; 1948 - 2025`);
  const [shippingAddress, setShippingAddress] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);

  // Book Print State
  const [bindingType, setBindingType] = useState<'hardcover_linen' | 'leather_embossed'>('hardcover_linen');
  const [bookOrdered, setBookOrdered] = useState(false);

  // Subscription Upgrade State
  const [activePlan, setActivePlan] = useState<'free_perpetual' | 'premium_heritage' | 'dynasty_archive'>(
    memorial.tier || 'premium_heritage'
  );
  const [planSuccess, setPlanSuccess] = useState(false);

  if (!isOpen) return null;

  const plaquePrices: Record<PlaqueMaterial, number> = {
    porcelain: 89,
    titanium_black: 129,
    brushed_brass: 159,
    granite_embedded: 219,
  };

  const handleOrderPlaqueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingAddress.trim()) return;

    const newOrder: PhygitalPlaqueOrder = {
      id: `plaque-order-${Date.now()}`,
      material,
      size,
      title: `${memorial.fullName} - ${material === 'porcelain' ? 'Porcelain Headstone Medallion' : 'Laser Engraved QR Medallion'}`,
      status: 'laser_engraving',
      qrPreviewUrl: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(window.location.href)}`,
      shippingAddress,
      estimatedDelivery: 'Dispatched within 3 Business Days',
      priceTl: plaquePrices[material],
    };

    if (onOrderPlaque) {
      onOrderPlaque(newOrder);
    }
    setIsOrdered(true);
    setTimeout(() => {
      setIsOrdered(false);
      onClose();
    }, 3500);
  };

  const handleOrderBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookOrdered(true);
    setTimeout(() => {
      setBookOrdered(false);
      onClose();
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] text-[#1E1B18] border-2 border-[#2B2724] max-w-4xl w-full p-6 sm:p-8 shadow-2xl my-8 max-h-[92vh] flex flex-col">
        
        {/* Modal Masthead */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D6CBB8] shrink-0">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#787163] flex items-center gap-2 mb-1">
              <span>REMEMBERED PRINT & PERPETUAL HERITAGE SERVICES</span>
              <span>&bull;</span>
              <span className="text-[#855327] font-bold">OFFICIAL COMMISSIONS DESK</span>
            </div>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1E1B18]">
              Materialize & Preserve Memory
            </h3>
            <p className="text-xs font-serif italic text-[#5E574E]">
              Physical laser-engraved medallions, bespoke archival hardcover volumes, and genealogical lineage records for {memorial.fullName}.
            </p>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-[#2B2724] hover:bg-[#2B2724] hover:text-white px-2.5 py-1 text-xs border border-[#D0C5B2] transition"
          >
            ✕ CLOSE
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 py-3 border-b border-[#D6CBB8] text-xs font-mono shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('plaque')}
            className={`flex items-center gap-1.5 px-4 py-2 border transition uppercase tracking-wider whitespace-nowrap text-xs font-bold ${
              activeTab === 'plaque' 
                ? 'bg-[#2B2724] text-[#FAF8F5] border-[#2B2724]' 
                : 'bg-[#F2EDE2] text-[#423C36] border-[#D4C8B5] hover:bg-[#EAE2D2]'
            }`}
          >
            <QrCode className="w-4 h-4 text-[#C29B38]" />
            <span>1. Headstone & Sanctuary QR Medallion</span>
          </button>

          <button
            onClick={() => setActiveTab('book')}
            className={`flex items-center gap-1.5 px-4 py-2 border transition uppercase tracking-wider whitespace-nowrap text-xs font-bold ${
              activeTab === 'book' 
                ? 'bg-[#2B2724] text-[#FAF8F5] border-[#2B2724]' 
                : 'bg-[#F2EDE2] text-[#423C36] border-[#D4C8B5] hover:bg-[#EAE2D2]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#C29B38]" />
            <span>2. Bound Life Memoir & Tribute Volume</span>
          </button>

          <button
            onClick={() => setActiveTab('tier')}
            className={`flex items-center gap-1.5 px-4 py-2 border transition uppercase tracking-wider whitespace-nowrap text-xs font-bold ${
              activeTab === 'tier' 
                ? 'bg-[#2B2724] text-[#FAF8F5] border-[#2B2724]' 
                : 'bg-[#F2EDE2] text-[#423C36] border-[#D4C8B5] hover:bg-[#EAE2D2]'
            }`}
          >
            <Crown className="w-4 h-4 text-[#C29B38]" />
            <span>3. Perpetual Registry & Dynasty Tier</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="py-6 overflow-y-auto flex-1 text-[#111111]">
          
          {/* TAB 1: PHYGYTAL PLAQUE */}
          {activeTab === 'plaque' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Visual Mockup */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-[#F5EFE6] border border-[#D8CEBE] text-center">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#787163] mb-3 font-bold">
                  PRECISION LASER ENGRAVING PREVIEW
                </div>

                {/* The Plaque Render */}
                <div
                  className={`w-52 h-52 p-4 border-2 flex flex-col items-center justify-between transition-all duration-300 shadow-md relative ${
                    material === 'porcelain'
                      ? 'bg-[#FAF7F0] text-[#1E1B18] border-[#2B2724]'
                      : material === 'titanium_black'
                      ? 'bg-[#242628] text-[#FAF8F5] border-[#18191A]'
                      : material === 'brushed_brass'
                      ? 'bg-[#F4ECE0] text-[#2E271F] border-[#8C6D3B]'
                      : 'bg-[#3A3632] text-[#F0EBE1] border-[#25221F]'
                  }`}
                >
                  <div className="text-[9px] font-mono uppercase tracking-widest opacity-80">
                    REMEMBERED LIVING CHRONICLE
                  </div>

                  <div className="p-2 bg-white rounded border border-black/10 shadow-2xs">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=${encodeURIComponent(
                        window.location.href
                      )}`}
                      alt="QR"
                      className="w-24 h-24"
                    />
                  </div>

                  <div className="text-center">
                    <h4 className="font-serif-display text-xs font-bold leading-tight">
                      {memorial.fullName}
                    </h4>
                    <p className="text-[9px] font-mono opacity-75 mt-0.5">
                      {memorial.birthDate.split(' ').pop()} &mdash; {memorial.deathDate.split(' ').pop()}
                    </p>
                  </div>
                </div>

                {/* Specs */}
                <div className="mt-4 space-y-1 text-xs font-mono text-[#5E574E] text-left w-full border-t border-[#D6CBB8] pt-3">
                  <div className="flex justify-between">
                    <span>Weather Resilience:</span>
                    <span className="font-bold text-[#1E1B18]">-40°F / +160°F (Centuries)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mounting:</span>
                    <span className="font-bold text-[#1E1B18]">Industrial 3M Structural Bond</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Packaging:</span>
                    <span className="font-bold text-[#1E1B18]">Archival Solid Walnut Presentation Case</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Customization Form */}
              <div className="lg:col-span-7 space-y-5">
                {isOrdered ? (
                  <div className="p-8 bg-[#EEF5F1] border-2 border-[#3B6E4C] text-center space-y-3">
                    <div className="w-12 h-12 bg-[#3B6E4C] text-white rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif-display text-xl font-bold text-[#234A30]">
                      Laser Engraving Commission Received
                    </h4>
                    <p className="text-xs font-serif text-[#2C573A] leading-relaxed">
                      Your medallion order has entered active precision fabrication in our studio workshop. Courier dispatch notification and tracking details will be sent directly to your email.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleOrderPlaqueSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#787163] mb-2 font-bold">
                        1. Select Medallion Medium & Archival Finish
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'porcelain', name: 'German Ivory Porcelain', desc: 'Unglazed matte ivory, fade-proof vitrified finish', price: 89 },
                          { id: 'titanium_black', name: 'Matte Graphite Titanium', desc: 'Laser-etched aerospace grade alloy', price: 129 },
                          { id: 'brushed_brass', name: 'Antiqued Brushed Brass', desc: 'Dignified centuries-old patinated bronze', price: 159 },
                          { id: 'granite_embedded', name: 'Granite Inset Cassette', desc: 'Flush stone mounting for monuments', price: 219 },
                        ].map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setMaterial(m.id as PlaqueMaterial)}
                            className={`p-3 text-left border transition text-xs flex flex-col justify-between ${
                              material === m.id
                                ? 'border-[#2B2724] bg-[#F2EDE2] ring-1 ring-[#2B2724]'
                                : 'border-[#D8CEBE] bg-[#FAF8F5] hover:border-[#2B2724]'
                            }`}
                          >
                            <div>
                              <div className="font-serif font-bold text-[#1E1B18]">{m.name}</div>
                              <div className="text-[10px] text-[#6E6659] font-sans mt-0.5">{m.desc}</div>
                            </div>
                            <div className="font-mono font-bold text-xs text-[#855327] mt-2">
                              ${m.price} USD
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#787163] mb-1">
                          Recipient Contact Phone
                        </label>
                        <input
                          type="tel"
                          required
                          value={recipientPhone}
                          onChange={(e) => setRecipientPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-3 py-2 text-xs border border-[#D5CAB7] focus:border-[#2B2724] outline-none font-mono bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#787163] mb-1">
                          Plaque Dimensions
                        </label>
                        <select
                          value={size}
                          onChange={(e) => setSize(e.target.value as PlaqueSize)}
                          className="w-full px-3 py-2 text-xs border border-[#D5CAB7] focus:border-[#2B2724] outline-none font-mono bg-white"
                        >
                          <option value="standard_10x10">Standard Square (4 x 4 in / 10 x 10 cm)</option>
                          <option value="large_15x15">Grand Sanctuary (6 x 6 in / 15 x 15 cm)</option>
                          <option value="monument_20x20">Monumental Headstone (8 x 8 in / 20 x 20 cm)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#787163] mb-1">
                        Courier Shipping & Delivery Address
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="Full street address, city, state/province, postal code, and country..."
                        className="w-full px-3 py-2 text-xs border border-[#D5CAB7] focus:border-[#2B2724] outline-none font-mono bg-white"
                      />
                    </div>

                    <div className="pt-2 border-t border-[#D6CBB8] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#787163] block font-bold">Total Consideration</span>
                        <span className="font-mono text-xl font-bold text-[#855327]">
                          ${plaquePrices[material]} USD
                        </span>
                        <span className="text-[10px] font-mono text-[#3B6E4C] block font-bold">Worldwide Courier Shipping Included</span>
                      </div>

                      <button
                        type="submit"
                        className="px-6 py-3 bg-[#2B2724] hover:bg-[#423C37] text-[#FAF8F5] text-xs font-mono uppercase tracking-widest font-bold transition flex items-center gap-2 shadow-2xs"
                      >
                        <Truck className="w-4 h-4 text-[#C29B38]" />
                        <span>Confirm Commission & Begin Engraving</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: BOOK PRINT */}
          {activeTab === 'book' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 p-6 bg-[#FAF8F5] border border-[#111111]/30 text-center flex flex-col items-center justify-center">
                <div className="w-44 h-60 bg-[#1C1D1F] text-[#F4F4F0] p-4 shadow-2xl border-l-4 border-amber-500 flex flex-col justify-between text-left relative">
                  <div>
                    <span className="text-[8px] font-mono uppercase tracking-widest text-amber-300 block">
                      REMEMBERED PRINTED HERITAGE
                    </span>
                    <h4 className="font-serif-display text-sm font-bold mt-2 text-white leading-tight">
                      {memorial.fullName}
                    </h4>
                    <p className="text-[9px] font-serif italic text-white/70 mt-1">
                      Chronological Biography, Archival Photographs & Tribute Letters
                    </p>
                  </div>
                  <div className="text-[8px] font-mono text-white/50 border-t border-white/20 pt-2">
                    {new Date().getFullYear()} &bull; Bound Limited Monograph Edition
                  </div>
                </div>
                <p className="text-xs font-serif italic text-[#555555] mt-4">
                  Printed on Italian Fedrigoni Archival Paper, Section Sewn in Natural Linen.
                </p>
              </div>

              <div className="lg:col-span-7 space-y-4">
                {bookOrdered ? (
                  <div className="p-8 bg-emerald-50 border-2 border-emerald-600 text-center space-y-3">
                    <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif-display text-xl font-bold text-emerald-900">
                      Memorial Volume Added to Bindery Queue
                    </h4>
                    <p className="text-xs font-serif text-emerald-800">
                      All tribute letters, verified genealogy, and high-resolution photographs are being professionally typeset for artisan printing.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleOrderBookSubmit} className="space-y-4">
                    <div>
                      <h4 className="font-serif-display text-lg font-bold text-[#111111]">
                        An Everlasting Family Heirloom: The Printed Monograph
                      </h4>
                      <p className="text-xs font-serif text-[#555555] mt-1 leading-relaxed">
                        The <strong>{memorial.memories.length} tribute letters</strong>, <strong>{memorial.gallery.length} archival portraits</strong>, and chronological life biography gathered on this page are automatically formatted into an elegant physical volume.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setBindingType('hardcover_linen')}
                        className={`p-3 text-left border text-xs ${
                          bindingType === 'hardcover_linen' ? 'border-black bg-[#FAF8F5] ring-1 ring-black' : 'border-black/20'
                        }`}
                      >
                        <div className="font-serif font-bold text-[#111111]">Artisan Natural Linen Hardcover</div>
                        <div className="text-[10px] text-[#666666]">Gold foil debossed title on spine & cover</div>
                        <div className="font-mono font-bold text-xs text-amber-800 mt-2">$145 USD</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBindingType('leather_embossed')}
                        className={`p-3 text-left border text-xs ${
                          bindingType === 'leather_embossed' ? 'border-black bg-[#FAF8F5] ring-1 ring-black' : 'border-black/20'
                        }`}
                      >
                        <div className="font-serif font-bold text-[#111111]">Hand-Bound Full Grain Leather</div>
                        <div className="text-[10px] text-[#666666]">Includes velvet-lined archival slipcase</div>
                        <div className="font-mono font-bold text-xs text-amber-800 mt-2">$290 USD</div>
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#111111] hover:bg-[#333333] text-white text-xs font-mono uppercase tracking-widest font-bold transition flex items-center justify-center gap-2"
                    >
                      <Printer className="w-4 h-4 text-amber-400" />
                      <span>Initiate Bindery Commission</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: TIERS */}
          {activeTab === 'tier' && (
            <div className="space-y-6">
              <div className="text-center max-w-lg mx-auto">
                <h4 className="font-serif-display text-xl font-bold text-[#111111]">
                  Generational Custody & Perpetual Preservation
                </h4>
                <p className="text-xs font-serif italic text-[#555555] mt-1">
                  Remembered is built for centuries; your family heritage records are safely mirrored across decentralized permanent storage networks.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Free */}
                <div className="p-4 border border-[#111111]/20 bg-white flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#777777] block">Perpetual Standard</span>
                    <h5 className="font-serif font-bold text-base text-[#111111]">Living Scroll</h5>
                    <div className="font-mono text-xl font-bold text-[#111111] my-2">$0 <span className="text-xs font-normal text-[#666666]">/ Forever</span></div>
                    <ul className="text-xs space-y-1.5 font-serif text-[#555555] mt-3">
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Standard Living Memorial Page</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> 10 High-Res Archival Portraits</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Unlimited Public Tribute Letters</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Digital QR Code Link</li>
                    </ul>
                  </div>
                  <button className="mt-4 w-full py-1.5 border border-[#111111] text-xs font-mono uppercase text-[#111111]">
                    Active Tier
                  </button>
                </div>

                {/* Premium Heritage */}
                <div className="p-4 border-2 border-[#111111] bg-[#FAF8F5] relative flex flex-col justify-between shadow-md">
                  <div className="absolute -top-2.5 right-4 bg-[#111111] text-amber-300 text-[9px] font-mono uppercase px-2 py-0.5 font-bold">
                    MOST SELECTED
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-800 font-bold block">Lifetime Heritage</span>
                    <h5 className="font-serif-display font-bold text-base text-[#111111]">Heritage Custody</h5>
                    <div className="font-mono text-xl font-bold text-[#111111] my-2">$95 <span className="text-xs font-normal text-[#666666]">/ One-time Lifetime</span></div>
                    <ul className="text-xs space-y-1.5 font-serif text-[#444444] mt-3">
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Unlimited Lossless Archival Media</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Oral History & Audio Voice Recordings</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> AI Biography Transcription & Polishing</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> 5 Family Custodian Administrators</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> 1 Complimentary Porcelain QR Medallion</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setPlanSuccess(true);
                      setTimeout(() => setPlanSuccess(false), 3000);
                    }}
                    className="mt-4 w-full py-2 bg-[#111111] text-white text-xs font-mono uppercase font-bold hover:bg-[#333333] transition"
                  >
                    {planSuccess ? '✓ Heritage Tier Activated' : 'Upgrade to Heritage Custody'}
                  </button>
                </div>

                {/* Dynasty */}
                <div className="p-4 border border-[#111111]/20 bg-white flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#777777] block">Dynastic Genealogy</span>
                    <h5 className="font-serif font-bold text-base text-[#111111]">Dynasty Vault</h5>
                    <div className="font-mono text-xl font-bold text-[#111111] my-2">$290 <span className="text-xs font-normal text-[#666666]">/ One-time Lifetime</span></div>
                    <ul className="text-xs space-y-1.5 font-serif text-[#555555] mt-3">
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Unified Multi-Branch Family Pedigree Tree</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Custom Domain (e.g. family.remembered.life)</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> 1 Hardcover Bound Tribute Volume Included</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Unlimited Family Custodians & Editors</li>
                    </ul>
                  </div>
                  <button className="mt-4 w-full py-1.5 border border-[#111111] text-xs font-mono uppercase text-[#111111] hover:bg-black hover:text-white transition">
                    Commission Dynasty Vault
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
