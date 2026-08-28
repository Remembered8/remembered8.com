import React, { useState } from 'react';
import { MemorialProfile, FamilyGuardian } from '../types';
import { Shield, Users, Mail, Check, Trash2, Key, UserPlus, Lock, Bell } from 'lucide-react';

interface FamilyGuardiansModalProps {
  isOpen: boolean;
  onClose: () => void;
  memorial: MemorialProfile;
  onUpdateGuardians?: (guardians: FamilyGuardian[]) => void;
}

export const FamilyGuardiansModal: React.FC<FamilyGuardiansModalProps> = ({
  isOpen,
  onClose,
  memorial,
  onUpdateGuardians,
}) => {
  const [guardians, setGuardians] = useState<FamilyGuardian[]>(
    memorial.guardians || [
      {
        id: 'g-1',
        name: 'Primary Family Custodian',
        email: memorial.adminEmail,
        role: 'Founder & Primary Trustee',
        permissions: ['approve_memories', 'edit_bio', 'upload_media', 'manage_privacy'],
        addedDate: 'November 18, 2025',
      },
      {
        id: 'g-2',
        name: 'Heritage Council Member',
        email: 'trustee.council@family.archive',
        role: 'Family Guardian',
        permissions: ['approve_memories', 'upload_media'],
        addedDate: 'November 20, 2025',
      },
    ]
  );

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'Family Guardian' | 'Legal Trustee' | 'Archivist / Contributor'>('Family Guardian');
  const [invitedNotice, setInvitedNotice] = useState(false);

  if (!isOpen) return null;

  const handleAddGuardian = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim() || !newName.trim()) return;

    const newG: FamilyGuardian = {
      id: `g-${Date.now()}`,
      name: newName.trim(),
      email: newEmail.trim(),
      role: newRole,
      permissions: ['approve_memories', 'upload_media'],
      addedDate: 'Today',
    };

    const updated = [...guardians, newG];
    setGuardians(updated);
    if (onUpdateGuardians) {
      onUpdateGuardians(updated);
    }
    setNewName('');
    setNewEmail('');
    setInvitedNotice(true);
    setTimeout(() => setInvitedNotice(false), 3000);
  };

  const handleRemoveGuardian = (id: string) => {
    const updated = guardians.filter((g) => g.id !== id);
    setGuardians(updated);
    if (onUpdateGuardians) {
      onUpdateGuardians(updated);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-[#111111] border-2 border-[#111111] max-w-3xl w-full p-6 sm:p-8 shadow-2xl my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-[#111111]">
          <div className="flex items-center gap-3">
            <div className="p-2 border border-[#111111] bg-[#FAF8F5]">
              <Users className="w-5 h-5 text-black" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#666666] block">
                FAMILY COUNCIL & MULTI-CUSTODIAN GOVERNANCE
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-[#111111]">
                Family Custodians and Board of Trustees
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-black hover:bg-black hover:text-white px-2 py-0.5 text-xs border border-[#111111] cursor-pointer"
          >
            ✕
          </button>
        </div>

        <p className="text-xs font-serif text-[#555555] my-4 leading-relaxed">
          Grant custodian access to verified family members to review tribute letters, curate voice and photographic archives, and preserve memory continuity across generations. In the event of succession, archive stewardship can seamlessly transfer to designated heirs.
        </p>

        {/* Add Form */}
        <form onSubmit={handleAddGuardian} className="p-4 bg-[#FAF8F5] border border-[#111111]/20 space-y-3 mb-6">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111] flex items-center gap-1.5">
            <UserPlus className="w-4 h-4 text-amber-700" />
            <span>Invite New Family Custodian</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] font-mono uppercase text-[#666666] mb-1">Full Name</label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Eleanor Vance"
                className="w-full px-3 py-1.5 text-xs border border-[#111111]/30 focus:border-[#111111] outline-none font-mono bg-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-[#666666] mb-1">Email Address</label>
              <input
                type="email"
                required
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="custodian@family.archive"
                className="w-full px-3 py-1.5 text-xs border border-[#111111]/30 focus:border-[#111111] outline-none font-mono bg-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-[#666666] mb-1">Stewardship Role</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as any)}
                className="w-full px-3 py-1.5 text-xs border border-[#111111]/30 focus:border-[#111111] outline-none font-mono bg-white"
              >
                <option value="Family Guardian">Family Guardian (Approve & Upload)</option>
                <option value="Legal Trustee">Legal Trustee (Full Custodianship)</option>
                <option value="Archivist / Contributor">Archivist (Contribution Only)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            {invitedNotice ? (
              <span className="text-xs font-mono text-emerald-700">✓ Invitation credentials transmitted successfully.</span>
            ) : (
              <span className="text-[10px] font-mono text-[#777777]">Invited trustees receive encrypted administrative access tokens.</span>
            )}
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#111111] hover:bg-[#333333] text-white text-xs font-mono uppercase tracking-wider transition cursor-pointer"
            >
              Transmit Invitation
            </button>
          </div>
        </form>

        {/* Existing Guardians List */}
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-[#666666] font-bold">
            Active Registry Custodians ({guardians.length})
          </div>

          <div className="border border-[#111111]/20 divide-y divide-[#111111]/10">
            {guardians.map((g) => (
              <div key={g.id} className="p-3 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm text-[#111111]">{g.name}</span>
                    <span className="px-2 py-0.5 text-[9px] font-mono uppercase bg-[#FAF8F5] border border-[#111111]/20">
                      {g.role}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-[#777777] mt-0.5">
                    {g.email} &bull; Added: {g.addedDate}
                  </div>
                </div>

                {g.role !== 'Founder & Primary Trustee' && (
                  <button
                    onClick={() => handleRemoveGuardian(g.id)}
                    className="p-1 text-[#777777] hover:text-rose-700 transition cursor-pointer"
                    title="Revoke Permissions"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
