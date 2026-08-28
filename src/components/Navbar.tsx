import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Language } from '../types/ticket';
import { translations } from '../data/translations';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  islandName: string;
  activeVisitorTab?: 'book' | 'my-ticket';
  setActiveVisitorTab?: (tab: 'book' | 'my-ticket') => void;
  portalType?: 'visitor' | 'staff' | 'admin';
  onAdminLogout?: () => void;
}

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'ms', label: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'zh', label: '简体中文', flag: '🇨🇳' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' }
];

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  islandName,
  activeVisitorTab = 'book',
  setActiveVisitorTab,
  portalType = 'visitor',
  onAdminLogout
}) => {
  const t = translations[currentLang];
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Island Branding */}
          <div 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-teal-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg text-slate-900 tracking-tight whitespace-nowrap">
                  {islandName}
                </span>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md bg-teal-50 text-teal-700 border border-teal-200 whitespace-nowrap">
                  {portalType === 'staff' ? 'Portal Staf' : portalType === 'admin' ? 'Portal Admin' : 'Sabah 🇲🇾'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block whitespace-nowrap">
                {portalType === 'staff' 
                  ? 'Sistem Pengimbas Pintu Masuk Jeti' 
                  : portalType === 'admin' 
                    ? 'Dashboard Pengurusan & Kutipan Hasil' 
                    : t.islandSubtitle}
              </p>
            </div>
          </div>

          {/* Center Navigation - VISITOR PORTAL ONLY */}
          {portalType === 'visitor' && setActiveVisitorTab && (
            <nav className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setActiveVisitorTab('book')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeVisitorTab === 'book'
                    ? 'bg-white text-teal-800 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.navBook}
              </button>

              <button
                onClick={() => setActiveVisitorTab('my-ticket')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeVisitorTab === 'my-ticket'
                    ? 'bg-white text-teal-800 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.navCheckTicket}
              </button>
            </nav>
          )}

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            {/* Language Selector (Always accessible for multi-language tourists) */}
            <div className="relative flex items-center bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 shadow-2xs hover:border-teal-500 transition-colors">
              <select
                value={currentLang}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer pr-1"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="text-slate-800">
                    {lang.flag} {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Logout button for Admin */}
            {portalType === 'admin' && onAdminLogout && (
              <button
                onClick={onAdminLogout}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
              >
                Log Keluar
              </button>
            )}

            {/* Link to public visitor site from staff/admin */}
            {portalType !== 'visitor' && (
              <button
                onClick={() => navigate('/')}
                className="hidden sm:inline-block px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                Ke Laman Pelancong
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation for Visitor Only */}
        {portalType === 'visitor' && setActiveVisitorTab && (
          <div className="flex sm:hidden items-center justify-around py-2 border-t border-slate-200 gap-2">
            <button
              onClick={() => setActiveVisitorTab('book')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold text-center transition-colors cursor-pointer ${
                activeVisitorTab === 'book' ? 'bg-teal-50 text-teal-800' : 'text-slate-600'
              }`}
            >
              {t.navBook}
            </button>
            <button
              onClick={() => setActiveVisitorTab('my-ticket')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold text-center transition-colors cursor-pointer ${
                activeVisitorTab === 'my-ticket' ? 'bg-teal-50 text-teal-800' : 'text-slate-600'
              }`}
            >
              {t.navCheckTicket}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
