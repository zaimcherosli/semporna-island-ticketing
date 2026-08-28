import React, { useState } from 'react';
import type { Language, Booking } from '../../types/ticket';
import { translations } from '../../data/translations';
import { storageService } from '../../services/storageService';

interface CheckTicketViewProps {
  currentLang: Language;
  onSelectBooking: (booking: Booking) => void;
}

export const CheckTicketView: React.FC<CheckTicketViewProps> = ({
  currentLang,
  onSelectBooking
}) => {
  const t = translations[currentLang];
  const [searchTerm, setSearchTerm] = useState('');
  const [foundBooking, setFoundBooking] = useState<Booking | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchTerm.trim().toUpperCase();
    if (!query) return;

    const allBookings = storageService.getBookings();
    const match = allBookings.find(
      b =>
        b.id.toUpperCase() === query ||
        b.buyerPhone.replace(/\D/g, '').includes(query.replace(/\D/g, '')) ||
        b.buyerEmail.toLowerCase() === searchTerm.trim().toLowerCase()
    );

    if (match) {
      setFoundBooking(match);
      setNotFound(false);
    } else {
      setFoundBooking(null);
      setNotFound(true);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 text-left animate-fade-in py-6">
      <div className="text-center space-y-1.5">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">{t.navCheckTicket}</h2>
        <p className="text-xs text-slate-500">
          {currentLang === 'ms' 
            ? 'Masukkan No. Tempahan atau No. Telefon untuk dapatkan semula E-Tiket Kod QR anda.' 
            : 'Enter your Booking Reference or Phone Number to retrieve your QR E-Ticket.'}
        </p>
      </div>

      <form onSubmit={handleSearch} className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-xs">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            {t.bookingRef} / {t.phone} / {t.email}
          </label>
          <input
            type="text"
            placeholder="cth. SMP-2026-8801 atau 0138821920"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 shadow-2xs"
            required
          />
        </div>

        {notFound && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
            Tiada rekod tempahan dijumpai untuk carian ini. Sila semak semula No. Tempahan anda.
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-xl text-xs sm:text-sm transition-colors shadow-xs cursor-pointer whitespace-nowrap"
        >
          {t.lookupBookingBtn}
        </button>
      </form>

      {/* Result Card if found */}
      {foundBooking && (
        <div className="bg-white border border-teal-300 p-5 rounded-3xl shadow-sm space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="font-mono text-xs font-bold text-teal-800">{foundBooking.id}</span>
              <h4 className="text-sm sm:text-base font-bold text-slate-900">{foundBooking.buyerName}</h4>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-bold whitespace-nowrap">
              {foundBooking.totalPax} Pax
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block">{t.validOnDate}:</span>
              <span className="font-bold text-slate-800">{foundBooking.visitDate}</span>
            </div>
            <div>
              <span className="text-slate-500 block">{t.totalAmount}:</span>
              <span className="font-extrabold text-teal-800">RM {foundBooking.totalPrice}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectBooking(foundBooking)}
            className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer whitespace-nowrap"
          >
            Buka E-Tiket & Kod QR Penuh
          </button>
        </div>
      )}
    </div>
  );
};
