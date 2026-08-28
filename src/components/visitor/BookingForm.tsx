import React, { useState } from 'react';
import type { Language, TicketPricing, PaxCount, Booking } from '../../types/ticket';
import { translations } from '../../data/translations';
import { Minus, Plus } from 'lucide-react';

interface BookingFormProps {
  currentLang: Language;
  prices: TicketPricing;
  onProceedToPayment: (bookingDraft: Omit<Booking, 'id' | 'paymentRef' | 'paymentTime' | 'ticketQrPayload' | 'checkInStatus' | 'createdAt'>) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  currentLang,
  prices,
  onProceedToPayment
}) => {
  const t = translations[currentLang];
  const todayStr = new Date().toISOString().split('T')[0];

  const [visitDate, setVisitDate] = useState<string>(todayStr);
  const [pax, setPax] = useState<PaxCount>({
    malaysianAdult: 0,
    malaysianChild: 0,
    internationalAdult: 2,
    internationalChild: 0
  });

  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerIdPassport, setBuyerIdPassport] = useState('');
  const [buyerCountry, setBuyerCountry] = useState('Malaysia');
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const updatePax = (category: keyof PaxCount, delta: number) => {
    setPax(prev => {
      const current = prev[category];
      const next = Math.max(0, current + delta);
      return { ...prev, [category]: next };
    });
  };

  const totalPax = pax.malaysianAdult + pax.malaysianChild + pax.internationalAdult + pax.internationalChild;
  
  const totalPrice = 
    pax.malaysianAdult * prices.malaysianAdult +
    pax.malaysianChild * prices.malaysianChild +
    pax.internationalAdult * prices.internationalAdult +
    pax.internationalChild * prices.internationalChild;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];

    if (totalPax === 0) {
      errors.push(currentLang === 'ms' ? 'Sila pilih sekurang-kurangnya 1 tiket.' : 'Please select at least 1 ticket.');
    }
    if (!buyerName.trim()) {
      errors.push(currentLang === 'ms' ? 'Sila masukkan nama penuh ketua pelawat.' : 'Please enter lead guest full name.');
    }
    if (!buyerEmail.trim() || !buyerEmail.includes('@')) {
      errors.push(currentLang === 'ms' ? 'Sila masukkan alamat emel yang sah.' : 'Please enter a valid email address.');
    }
    if (!buyerPhone.trim()) {
      errors.push(currentLang === 'ms' ? 'Sila masukkan nombor telefon / WhatsApp.' : 'Please enter contact phone number.');
    }

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors([]);

    onProceedToPayment({
      visitDate,
      buyerName: buyerName.trim(),
      buyerEmail: buyerEmail.trim(),
      buyerPhone: buyerPhone.trim(),
      buyerIdPassport: buyerIdPassport.trim() || 'N/A',
      buyerCountry: buyerCountry.trim() || 'Malaysia',
      pax,
      totalPax,
      totalPrice,
      paymentMethod: 'DUITNOW_QR',
      paymentStatus: 'PENDING'
    });
  };

  return (
    <div id="booking-section" className="space-y-6 text-left">
      {/* Title */}
      <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {t.bookingTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t.bookingSubtitle}
          </p>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-bold whitespace-nowrap hidden sm:inline-block">
          {totalPax} {t.paxLabel}
        </span>
      </div>

      {formErrors.length > 0 && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs space-y-1">
          <div className="font-bold text-rose-900">
            Sila lengkapkan maklumat berikut:
          </div>
          <ul className="list-disc list-inside space-y-0.5 text-rose-700">
            {formErrors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Visit Date */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs">
          <div className="mb-3">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">{t.stepDate}</h3>
            <p className="text-xs text-slate-500">{t.visitDateHint}</p>
          </div>

          <div className="max-w-xs">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t.selectVisitDate}
            </label>
            <input
              type="date"
              min={todayStr}
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 shadow-2xs"
              required
            />
          </div>
        </div>

        {/* Step 2: Ticket Categories & Quantity Counters */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">{t.stepTickets}</h3>
            <p className="text-xs text-slate-500">
              {currentLang === 'ms' ? 'Pilih bilangan tiket mengikut kewarganegaraan dan umur' : 'Select quantity according to nationality and age category'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Category: Malaysian Adult */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
              <div className="space-y-0.5 min-w-0">
                <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  🇲🇾 {t.malaysianAdultTitle}
                </div>
                <p className="text-[11px] text-slate-500 truncate">{t.malaysianAdultDesc}</p>
                <div className="text-xs sm:text-sm font-extrabold text-teal-700">
                  RM {prices.malaysianAdult} <span className="text-[11px] font-normal text-slate-500">/ pax</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shrink-0">
                <button
                  type="button"
                  onClick={() => updatePax('malaysianAdult', -1)}
                  disabled={pax.malaysianAdult <= 0}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center font-bold text-xs sm:text-sm text-slate-900">
                  {pax.malaysianAdult}
                </span>
                <button
                  type="button"
                  onClick={() => updatePax('malaysianAdult', 1)}
                  className="w-7 h-7 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Category: Malaysian Child */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
              <div className="space-y-0.5 min-w-0">
                <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  🇲🇾 {t.malaysianChildTitle}
                </div>
                <p className="text-[11px] text-slate-500 truncate">{t.malaysianChildDesc}</p>
                <div className="text-xs sm:text-sm font-extrabold text-teal-700">
                  RM {prices.malaysianChild} <span className="text-[11px] font-normal text-slate-500">/ pax</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shrink-0">
                <button
                  type="button"
                  onClick={() => updatePax('malaysianChild', -1)}
                  disabled={pax.malaysianChild <= 0}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center font-bold text-xs sm:text-sm text-slate-900">
                  {pax.malaysianChild}
                </span>
                <button
                  type="button"
                  onClick={() => updatePax('malaysianChild', 1)}
                  className="w-7 h-7 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Category: International Adult */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
              <div className="space-y-0.5 min-w-0">
                <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  🌍 {t.intlAdultTitle}
                </div>
                <p className="text-[11px] text-slate-500 truncate">{t.intlAdultDesc}</p>
                <div className="text-xs sm:text-sm font-extrabold text-teal-700">
                  RM {prices.internationalAdult} <span className="text-[11px] font-normal text-slate-500">/ pax</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shrink-0">
                <button
                  type="button"
                  onClick={() => updatePax('internationalAdult', -1)}
                  disabled={pax.internationalAdult <= 0}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center font-bold text-xs sm:text-sm text-slate-900">
                  {pax.internationalAdult}
                </span>
                <button
                  type="button"
                  onClick={() => updatePax('internationalAdult', 1)}
                  className="w-7 h-7 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Category: International Child */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
              <div className="space-y-0.5 min-w-0">
                <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  🌍 {t.intlChildTitle}
                </div>
                <p className="text-[11px] text-slate-500 truncate">{t.intlChildDesc}</p>
                <div className="text-xs sm:text-sm font-extrabold text-teal-700">
                  RM {prices.internationalChild} <span className="text-[11px] font-normal text-slate-500">/ pax</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shrink-0">
                <button
                  type="button"
                  onClick={() => updatePax('internationalChild', -1)}
                  disabled={pax.internationalChild <= 0}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center font-bold text-xs sm:text-sm text-slate-900">
                  {pax.internationalChild}
                </span>
                <button
                  type="button"
                  onClick={() => updatePax('internationalChild', 1)}
                  className="w-7 h-7 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Lead Guest Details */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">{t.stepDetails}</h3>
            <p className="text-xs text-slate-500">
              {currentLang === 'ms' ? 'Maklumat ini akan dipaparkan pada pas E-Tiket rasmi' : 'Lead traveler contact and identification details'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.fullName} *
              </label>
              <input
                type="text"
                placeholder={t.fullNamePlaceholder}
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 shadow-2xs"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.email} *
              </label>
              <input
                type="email"
                placeholder={t.emailPlaceholder}
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 shadow-2xs"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.phone} *
              </label>
              <input
                type="tel"
                placeholder={t.phonePlaceholder}
                value={buyerPhone}
                onChange={(e) => setBuyerPhone(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 shadow-2xs"
                required
              />
            </div>

            {/* IC / Passport */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.idPassport}
              </label>
              <input
                type="text"
                placeholder={t.idPassportPlaceholder}
                value={buyerIdPassport}
                onChange={(e) => setBuyerIdPassport(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 shadow-2xs"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.country}
              </label>
              <select
                value={buyerCountry}
                onChange={(e) => setBuyerCountry(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 shadow-2xs cursor-pointer"
              >
                <option value="Malaysia">🇲🇾 Malaysia</option>
                <option value="China">🇨🇳 China (中国)</option>
                <option value="South Korea">🇰🇷 South Korea (대한민국)</option>
                <option value="Japan">🇯🇵 Japan (日本)</option>
                <option value="Singapore">🇸🇬 Singapore</option>
                <option value="United Kingdom">🇬🇧 United Kingdom</option>
                <option value="Australia">🇦🇺 Australia</option>
                <option value="United States">🇺🇸 United States</option>
                <option value="Other">🌍 Other / International</option>
              </select>
            </div>
          </div>
        </div>

        {/* Live Calculation & Submit Action Bar */}
        <div className="sticky bottom-4 z-40 bg-white/95 backdrop-blur-md border border-slate-300 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:w-auto text-left">
            <span className="text-[11px] uppercase font-bold text-slate-500 tracking-wider block">
              {t.orderSummary}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-teal-700 whitespace-nowrap">
                RM {totalPrice}
              </span>
              <span className="text-xs text-slate-600 font-medium whitespace-nowrap">
                ({totalPax} {t.paxLabel}) • {visitDate}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={totalPax === 0}
            className="w-full sm:w-auto px-8 py-3.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold rounded-xl text-xs sm:text-sm transition-colors shadow-sm whitespace-nowrap cursor-pointer"
          >
            <span>{t.btnProceedToPay} {totalPrice})</span>
          </button>
        </div>
      </form>
    </div>
  );
};
