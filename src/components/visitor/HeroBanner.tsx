import React from 'react';
import type { Language, TicketPricing } from '../../types/ticket';
import { translations } from '../../data/translations';

interface HeroBannerProps {
  currentLang: Language;
  prices: TicketPricing;
  onBookNowClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ currentLang, prices, onBookNowClick }) => {
  const t = translations[currentLang];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-xs mb-8 p-6 sm:p-10 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Hero Details */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold whitespace-nowrap">
            {t.badgeOfficial}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {t.tagline}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
            {t.bookingSubtitle}
          </p>

          {/* Quick Feature Pills (No front icons) */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 whitespace-nowrap">
              E-Tiket Kod QR Pantas
            </span>
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 whitespace-nowrap">
              Imbasan Pantas di Jeti
            </span>
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 whitespace-nowrap">
              Pemuliharaan Marin Semporna
            </span>
          </div>
        </div>

        {/* Right Column: Pricing Highlights Card (White Theme) */}
        <div className="lg:col-span-5">
          <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4 text-left">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 block">
                {currentLang === 'ms' ? 'Kadar Rasmi Kemasukan Pulau' : 'Official Island Entry Rates'}
              </span>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentLang === 'ms' ? 'Termasuk pemuliharaan marin' : 'Per pax / entrance fee'}
              </p>
            </div>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Malaysian Tier */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="text-xs font-bold text-slate-800 border-b border-slate-100 pb-1">
                  🇲🇾 Warganegara Malaysia
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 whitespace-nowrap">Dewasa</span>
                    <span className="font-extrabold text-teal-700 text-sm whitespace-nowrap">RM {prices.malaysianAdult}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 whitespace-nowrap">Kanak2 (≤12)</span>
                    <span className="font-extrabold text-teal-700 text-sm whitespace-nowrap">RM {prices.malaysianChild}</span>
                  </div>
                </div>
              </div>

              {/* International Tier */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="text-xs font-bold text-slate-800 border-b border-slate-100 pb-1">
                  🌍 Luar Negara (Int'l)
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 whitespace-nowrap">Dewasa</span>
                    <span className="font-extrabold text-teal-700 text-sm whitespace-nowrap">RM {prices.internationalAdult}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 whitespace-nowrap">Kanak2 (≤12)</span>
                    <span className="font-extrabold text-teal-700 text-sm whitespace-nowrap">RM {prices.internationalChild}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onBookNowClick}
              className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.navBook}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
