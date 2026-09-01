import React, { useState } from 'react';

interface GlobalAccessLockProps {
  onUnlock: () => void;
}

// SHA-256 One-way Hash of the default access key (No plain password stored in source code)
const DEFAULT_ACCESS_HASH = '05853cc8379476d8bb3d350625a3bc08b91214049be1847d4e5403cc44715e31';

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const GlobalAccessLock: React.FC<GlobalAccessLockProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Calculate cryptographic one-way hash of the input
      const inputHash = await sha256(password);
      
      // 2. Compare against target hash (or optional ENV variable hash)
      const targetHash = (import.meta.env.VITE_ACCESS_PASS_HASH as string) || DEFAULT_ACCESS_HASH;

      if (inputHash === targetHash) {
        setError(false);
        sessionStorage.setItem('semporna_site_access_unlocked', 'true');
        localStorage.setItem('semporna_site_access_unlocked', 'true');
        onUnlock();
      } else {
        setError(true);
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error("Hash verification error", err);
      setError(true);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 text-slate-900 font-sans">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm text-center space-y-6 animate-fade-in">
        
        {/* Island Icon / Branding */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-teal-600 flex items-center justify-center text-white font-black text-2xl shadow-sm">
            S
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full inline-block mb-1.5">
              Akses Terhad Sistem
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Pulau Semporna Sabah
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Sistem E-Tiket Rasmi, Pengimbas Staf &amp; Dashboard Pengurusan
            </p>
          </div>
        </div>

        {/* Required Notice from User */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center space-y-1.5">
          <div className="text-xs font-bold text-amber-900">
            🔒 Sila hubungi Zaim untuk dapatkan akses
          </div>
          <p className="text-[11px] text-amber-700 leading-relaxed">
            Sistem ini dilindungi dengan kata laluan keselamatan rasmi.
          </p>
          <div className="pt-1">
            <a
              href="https://wa.me/60108118559?text=Salam%20Zaim,%20saya%20nak%20minta%20kata%20laluan%20akses%20Sistem%20E-Tiket%20Pulau%20Semporna"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 underline cursor-pointer"
            >
              WhatsApp Zaim (+60 10-811 8559)
            </a>
          </div>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 text-center">
              Masukkan Kata Laluan Akses
            </label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={12}
              placeholder="••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-4 py-3.5 text-center text-2xl font-mono tracking-widest text-slate-900 focus:outline-none focus:border-teal-600 shadow-2xs transition-all"
              autoFocus
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-center text-xs font-semibold text-rose-700 animate-shake">
              Kata laluan salah! Sila hubungi Zaim untuk dapatkan akses.
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || password.length === 0}
            className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-extrabold rounded-xl text-xs sm:text-sm transition-colors shadow-xs cursor-pointer whitespace-nowrap text-center"
          >
            {isSubmitting ? "Mengesahkan Akses..." : "Buka Akses Sistem"}
          </button>
        </form>

        {/* Footer info */}
        <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400">
          &copy; 2026 Semporna Island Pass • Hak Cipta Terpelihara
        </div>

      </div>
    </div>
  );
};
