import React, { useState } from 'react';
import { MemorialProfile } from '../types';
import { Bell, X, Plus } from 'lucide-react';

interface ReminderNotificationBannerProps {
  memorial: MemorialProfile;
  onOpenWriteMemory: () => void;
}

export const ReminderNotificationBanner: React.FC<ReminderNotificationBannerProps> = ({
  memorial,
  onOpenWriteMemory,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [showEmailSubscribe, setShowEmailSubscribe] = useState(false);

  if (!isVisible) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setShowEmailSubscribe(false);
    }, 2500);
  };

  return (
    <aside aria-label="Remembrance of the Day" className="bg-[#111111] text-[#FAF8F5] text-xs py-2.5 px-3 sm:px-6 relative z-30 font-mono border-b border-[#111111]/30">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4">
        
        {/* Remembrance Message */}
        <div className="flex items-center gap-2.5 text-center sm:text-left justify-center sm:justify-start">
          <span className="font-mono font-bold uppercase text-[9px] sm:text-[10px] bg-white/10 text-amber-300 border border-white/20 px-2 py-0.5 tracking-wider inline-flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 bg-amber-400"></span>
            COMMEMORATION TODAY
          </span>
          <p className="text-xs sm:text-[13px] text-white/95 font-serif leading-snug">
            <span className="font-bold text-amber-300 mr-1.5 font-mono">November 18:</span>
            <span>Commemorating the life anniversary of <strong>{memorial.fullName}</strong>.</span>
            <span className="hidden md:inline text-white/60 italic ml-1">— You may leave a tribute or condolence letter.</span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 font-mono text-xs w-full sm:w-auto justify-center">
          <button
            onClick={onOpenWriteMemory}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-1 bg-white hover:bg-[#EAEAEA] text-black text-[11px] font-semibold transition tracking-wider uppercase"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Leave Tribute</span>
          </button>

          <button
            onClick={() => setShowEmailSubscribe(!showEmailSubscribe)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-[11px] transition tracking-wider uppercase"
            title="Receive annual memorial email"
          >
            <Bell className="w-3 h-3 text-amber-300" />
            <span className="hidden sm:inline">{isSubscribed ? 'Reminder Enrolled' : 'Annual Reminder'}</span>
            <span className="sm:hidden">{isSubscribed ? 'Enrolled' : 'Remind'}</span>
          </button>

          <button
            onClick={() => setIsVisible(false)}
            className="p-1 text-white/60 hover:text-white hover:bg-white/10 transition ml-0.5 shrink-0"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Email Subscribe Drawer */}
      {showEmailSubscribe && (
        <div className="max-w-md mx-auto mt-2 p-3 bg-white border border-[#111111] shadow-md">
          {isSubscribed ? (
            <p className="text-center text-black text-xs py-1 font-mono">
              ✓ Annual memorial notice successfully registered for {emailInput}.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter email address..."
                className="flex-1 px-3 py-1 text-xs bg-white border border-[#111111]/40 focus:border-[#111111] text-[#111111] outline-none font-mono"
              />
              <button
                type="submit"
                className="px-3 py-1 bg-[#111111] text-white text-xs font-mono uppercase hover:bg-[#333333] transition"
              >
                Enroll
              </button>
            </form>
          )}
        </div>
      )}
    </aside>
  );
};
