import React, { useState } from 'react';
import { MemorialProfile, PrivacyLevel, MemoryLetter } from '../types';
import { Shield, Check, X, Bell, Lock, Globe, Users, Mail, Trash2, Edit3, Save } from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  memorial: MemorialProfile;
  onUpdateMemorial: (updated: Partial<MemorialProfile>) => void;
  onApproveMemory: (memoryId: string) => void;
  onDeleteMemory: (memoryId: string) => void;
  onToggleHighlightMemory: (memoryId: string) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  memorial,
  onUpdateMemorial,
  onApproveMemory,
  onDeleteMemory,
  onToggleHighlightMemory,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'memories' | 'privacy' | 'reminders' | 'invites'>('overview');
  
  // Profile edit states
  const [heroImage, setHeroImage] = useState(memorial.heroImage);
  const [profession, setProfession] = useState(memorial.profession);
  const [lifeQuote, setLifeQuote] = useState(memorial.lifeQuote);
  const [restingPlace, setRestingPlace] = useState(memorial.restingPlace);
  const [privacy, setPrivacy] = useState<PrivacyLevel>(memorial.privacy);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Family Administrator');
  const [invitedList, setInvitedList] = useState<Array<{ email: string; role: string }>>([
    { email: memorial.adminEmail, role: 'Primary Custodian (Creator)' },
    { email: 'zeynep.yilmaz@family.archive', role: 'Family Guardian' },
  ]);
  const [saveNotice, setSaveNotice] = useState(false);

  if (!isOpen) return null;

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateMemorial({
      heroImage,
      profession,
      lifeQuote,
      restingPlace,
      privacy,
    });
    setSaveNotice(true);
    setTimeout(() => setSaveNotice(false), 3000);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setInvitedList([...invitedList, { email: inviteEmail.trim(), role: inviteRole }]);
    setInviteEmail('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-[#111111] border-2 border-[#111111] max-w-3xl w-full p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#111111] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 border border-[#111111] bg-[#FAF8F5]">
              <Shield className="w-5 h-5 text-black" />
            </div>
            <div>
              <h3 className="font-serif-display text-2xl font-bold text-[#111111]">
                Family & Archive Administration Panel
              </h3>
              <p className="text-xs font-serif italic text-[#555555]">
                {memorial.fullName} Chronicle moderation and administrative command console.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-black hover:bg-black hover:text-white px-2 py-0.5 text-xs"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 py-3 border-b border-[#111111]/20 text-xs font-mono overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1 border border-[#111111] transition whitespace-nowrap ${activeTab === 'overview' ? 'bg-[#111111] text-white' : 'bg-white text-black hover:bg-[#FAF8F5]'}`}
          >
            General Overview
          </button>
          <button
            onClick={() => setActiveTab('memories')}
            className={`px-3 py-1 border border-[#111111] transition whitespace-nowrap ${activeTab === 'memories' ? 'bg-[#111111] text-white' : 'bg-white text-black hover:bg-[#FAF8F5]'}`}
          >
            Tribute Letters ({memorial.memories.length})
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-3 py-1 border border-[#111111] transition whitespace-nowrap ${activeTab === 'privacy' ? 'bg-[#111111] text-white' : 'bg-white text-black hover:bg-[#FAF8F5]'}`}
          >
            Privacy & Access
          </button>
          <button
            onClick={() => setActiveTab('reminders')}
            className={`px-3 py-1 border border-[#111111] transition whitespace-nowrap ${activeTab === 'reminders' ? 'bg-[#111111] text-white' : 'bg-white text-black hover:bg-[#FAF8F5]'}`}
          >
            Anniversaries & Reminders
          </button>
          <button
            onClick={() => setActiveTab('invites')}
            className={`px-3 py-1 border border-[#111111] transition whitespace-nowrap ${activeTab === 'invites' ? 'bg-[#111111] text-white' : 'bg-white text-black hover:bg-[#FAF8F5]'}`}
          >
            Family Access & Roles
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto py-5 pr-1 space-y-5">
          
          {saveNotice && (
            <div className="p-2.5 bg-[#FAF8F5] border border-[#111111] text-xs font-mono flex items-center gap-2">
              <Check className="w-4 h-4 text-black" />
              <span>Modifications successfully recorded and committed to the archive registry.</span>
            </div>
          )}

          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <form onSubmit={handleSaveGeneral} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#333333] mb-1">
                  Archive Portrait / Image URL
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-14 bg-[#F2EDE2] border border-[#111111]/40 shrink-0 overflow-hidden">
                    <img 
                      src={heroImage} 
                      alt="Preview" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <input
                    type="url"
                    value={heroImage}
                    onChange={(e) => setHeroImage(e.target.value)}
                    placeholder="https://... or direct image URL"
                    className="flex-1 px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none font-mono text-xs"
                  />
                </div>
                <p className="text-[10px] text-[#777777] font-mono mt-1">
                  Paste the direct link to the archival portrait image to update the primary memorial presentation.
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#333333] mb-1">Profession / Title / Vocation</label>
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#333333] mb-1">Life Quote / Inscription</label>
                <textarea
                  rows={2}
                  value={lifeQuote}
                  onChange={(e) => setLifeQuote(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] font-serif outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#333333] mb-1">Resting Place / Sanctuary Location</label>
                <input
                  type="text"
                  value={restingPlace}
                  onChange={(e) => setRestingPlace(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#111111] hover:bg-[#333333] text-white text-xs font-mono uppercase transition"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Chronicle Records</span>
                </button>
              </div>
            </form>
          )}

          {/* MEMORIES MODERATION TAB */}
          {activeTab === 'memories' && (
            <div className="space-y-3">
              <p className="text-xs font-serif italic text-[#555555]">
                Review, moderate, feature, or curate memorial letters and tributes submitted by visitors.
              </p>

              {memorial.memories.map((mem) => (
                <div
                  key={mem.id}
                  className="p-3 bg-white border border-[#111111]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-[#111111]">{mem.authorName}</span>
                      <span className="text-[11px] text-[#666666] font-mono">({mem.relation})</span>
                      <span className="text-[10px] text-[#888888] font-mono">• {mem.date}</span>
                    </div>
                    <p className="text-xs text-[#333333] font-serif italic line-clamp-2">
                      &ldquo;{mem.content}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onToggleHighlightMemory(mem.id)}
                      className={`px-2.5 py-1 text-xs font-mono transition border border-[#111111] ${mem.isHighlighted ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#FAF8F5]'}`}
                    >
                      {mem.isHighlighted ? '★ Featured' : '☆ Feature Letter'}
                    </button>

                    <button
                      onClick={() => onDeleteMemory(mem.id)}
                      className="p-1 border border-black/20 hover:border-black text-black transition"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PRIVACY TAB */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <p className="text-xs font-serif italic text-[#555555]">
                Configure public discoverability and family privacy levels for this archival record.
              </p>

              <div className="space-y-2">
                <label className="flex items-start gap-3 p-3 bg-white border border-[#111111]/30 cursor-pointer hover:bg-[#FAF8F5] transition">
                  <input
                    type="radio"
                    name="privacyOption"
                    value="public"
                    checked={privacy === 'public'}
                    onChange={() => setPrivacy('public')}
                    className="mt-1 accent-black"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-mono uppercase font-bold text-[#111111]">
                      <Globe className="w-3.5 h-3.5 text-black" />
                      <span>Public Open Heritage Archive (Recommended)</span>
                    </div>
                    <p className="text-xs font-serif text-[#555555] mt-0.5">
                      Anyone scanning the QR medallion or searching the living registry may pay their respects and read this life story.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 bg-white border border-[#111111]/30 cursor-pointer hover:bg-[#FAF8F5] transition">
                  <input
                    type="radio"
                    name="privacyOption"
                    value="family_only"
                    checked={privacy === 'family_only'}
                    onChange={() => setPrivacy('family_only')}
                    className="mt-1 accent-black"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-mono uppercase font-bold text-[#111111]">
                      <Users className="w-3.5 h-3.5 text-black" />
                      <span>Family & Authorized Kin Only</span>
                    </div>
                    <p className="text-xs font-serif text-[#555555] mt-0.5">
                      Only authenticated email holders listed in the family roster can access the full chronicle.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 bg-white border border-[#111111]/30 cursor-pointer hover:bg-[#FAF8F5] transition">
                  <input
                    type="radio"
                    name="privacyOption"
                    value="private_link"
                    checked={privacy === 'private_link'}
                    onChange={() => setPrivacy('private_link')}
                    className="mt-1 accent-black"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-mono uppercase font-bold text-[#111111]">
                      <Lock className="w-3.5 h-3.5 text-black" />
                      <span>Unlisted Direct Heritage Link</span>
                    </div>
                    <p className="text-xs font-serif text-[#555555] mt-0.5">
                      Excluded from search engines; open exclusively to recipients in possession of the private memorial URL.
                    </p>
                  </div>
                </label>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    onUpdateMemorial({ privacy });
                    setSaveNotice(true);
                    setTimeout(() => setSaveNotice(false), 3000);
                  }}
                  className="px-4 py-2 bg-[#111111] hover:bg-[#333333] text-white text-xs font-mono uppercase transition"
                >
                  Confirm Privacy Configuration
                </button>
              </div>
            </div>
          )}

          {/* REMINDERS TAB */}
          {activeTab === 'reminders' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[#111111]">
                <Bell className="w-4 h-4 text-black" />
                <span>Automated Annual Memorial Reminders</span>
              </div>
              <p className="text-xs font-serif italic text-[#555555]">
                Annual remembrance notifications are respectfully dispatched to kin on birthdays and commemorative milestones.
              </p>

              <div className="space-y-2">
                {memorial.importantDates.map((d) => (
                  <div
                    key={d.id}
                    className="p-3 bg-white border border-[#111111]/30 flex items-center justify-between text-xs"
                  >
                    <div>
                      <h5 className="font-bold text-[#111111] font-serif">{d.title}</h5>
                      <p className="text-[#666666] font-mono mt-0.5 text-[11px]">{d.formattedDate}</p>
                    </div>
                    <span className="px-2.5 py-0.5 border border-[#111111] text-[10px] font-mono uppercase bg-[#FAF8F5]">
                      Active Registry
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INVITES TAB */}
          {activeTab === 'invites' && (
            <div className="space-y-3">
              <p className="text-xs font-serif italic text-[#555555]">
                Invite family members and accredited editors to serve as permanent memorial custodians.
              </p>

              <form onSubmit={handleSendInvite} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="name@family.org"
                  className="flex-1 px-3 py-1.5 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none"
                />
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-white border border-[#111111]/30 text-[#111111] font-mono outline-none"
                >
                  <option value="Family Administrator">Family Administrator (Full Custody)</option>
                  <option value="Tribute Contributor">Tribute Contributor (Authoring Access)</option>
                </select>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#111111] hover:bg-[#333333] text-white text-xs font-mono uppercase transition"
                >
                  Dispatch Invitation
                </button>
              </form>

              <div className="pt-2 space-y-1.5">
                {invitedList.map((inv, i) => (
                  <div
                    key={i}
                    className="p-2.5 bg-white border border-[#111111]/20 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#111111]" />
                      <span className="text-[#111111] font-mono">{inv.email}</span>
                    </div>
                    <span className="text-[#666666] font-mono text-[11px]">{inv.role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#111111]/20 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-1.5 border border-[#111111] hover:bg-[#111111] hover:text-white text-xs font-mono uppercase transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
