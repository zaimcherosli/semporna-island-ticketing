import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { Language, Booking, IslandConfig } from '../../types/ticket';
import { translations } from '../../data/translations';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface ETicketPassProps {
  booking: Booking;
  config: IslandConfig;
  currentLang: Language;
  onBookAnother?: () => void;
  onBack?: () => void;
  mode?: 'visitor' | 'admin' | 'view';
}

export const ETicketPass: React.FC<ETicketPassProps> = ({
  booking,
  config,
  currentLang,
  onBookAnother,
  onBack,
  mode = 'visitor'
}) => {
  const t = translations[currentLang];
  const ticketRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    if (!ticketRef.current) return;
    try {
      const canvas = await html2canvas(ticketRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save(`Semporna-Island-Pass-${booking.id}.pdf`);
    } catch (err) {
      console.error("PDF download failed", err);
      window.print();
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🏝️ *E-TIKET MASUK PULAU SEMPORNA SABAH*\n` +
      `No. Tempahan: *${booking.id}*\n` +
      `Nama: ${booking.buyerName}\n` +
      `Tarikh: ${booking.visitDate}\n` +
      `Jumlah Pax: ${booking.totalPax} Orang\n` +
      `Status: DISAHKAN & DIBAYAR (RM ${booking.totalPrice})\n\n` +
      `Sila tunjukkan tiket ini semasa di jeti untuk imbasan QR.`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 text-left animate-fade-in">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          {mode === 'visitor' ? (
            <>
              <div className="inline-block px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-800 text-xs font-bold mb-1 border border-teal-200">
                {t.paymentSuccessToast}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {t.ticketIssuedTitle}
              </h2>
              <p className="text-xs text-slate-500">
                {t.ticketIssuedSubtitle}
              </p>
            </>
          ) : (
            <>
              <div className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-bold mb-1 border border-slate-200">
                {mode === 'admin' ? 'Paparan Admin' : 'Pas Pelancong'}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                E-Tiket Rasmi Pelancong
              </h2>
              <p className="text-xs text-slate-500">
                Semakan maklumat pas masuk dan kod QR tempahan pelancong.
              </p>
            </>
          )}
        </div>

        {/* Action Button on Header based on mode */}
        {mode === 'visitor' && onBookAnother && (
          <button
            type="button"
            onClick={onBookAnother}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer self-start sm:self-center whitespace-nowrap"
          >
            {t.bookAnother}
          </button>
        )}

        {mode === 'admin' && onBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer self-start sm:self-center whitespace-nowrap"
          >
            Kembali ke Senarai Tempahan
          </button>
        )}
      </div>

      {/* Printable Digital Pass Card (White Theme) */}
      <div
        id="printable-ticket"
        ref={ticketRef}
        className="relative bg-white border border-slate-300 rounded-3xl overflow-hidden shadow-sm p-6 sm:p-8 space-y-6"
      >
        {/* Pass Header Banner */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-extrabold tracking-widest text-teal-800 uppercase block">
              {t.ticketPassBadge}
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">{config.islandName}</h3>
            <p className="text-xs text-slate-500">{config.location}</p>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-semibold text-slate-500 uppercase block">{t.bookingRef}</span>
            <span className="font-mono text-sm sm:text-base font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
              {booking.id}
            </span>
          </div>
        </div>

        {/* QR Code & Check-In Status */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <div className="sm:col-span-5 flex flex-col items-center justify-center p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs">
            <QRCodeSVG
              value={booking.ticketQrPayload}
              size={150}
              level="H"
              includeMargin={true}
            />
            <span className="text-[9px] font-bold text-slate-500 tracking-wider mt-1 font-mono uppercase">
              SCAN AT JETTY GATE
            </span>
          </div>

          <div className="sm:col-span-7 space-y-3 text-left">
            {/* Status Badge */}
            <div>
              {booking.checkInStatus === 'CHECKED_IN' ? (
                <div className="inline-block px-3 py-1 rounded-lg bg-sky-50 border border-sky-200 text-sky-800 text-xs font-extrabold">
                  SELESAI MASUK ({booking.checkedInAt})
                </div>
              ) : (
                <div className="inline-block px-3 py-1 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs font-extrabold">
                  SAH & DIBAYAR (RM {booking.totalPrice})
                </div>
              )}
            </div>

            {/* Visit Details */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <span className="font-semibold text-slate-500">{t.validOnDate}:</span>
                <span className="font-bold text-slate-900">{booking.visitDate}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-700">
                <span className="font-semibold text-slate-500">{t.fullName}:</span>
                <span className="font-bold text-slate-900 truncate">{booking.buyerName}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-700">
                <span className="font-semibold text-slate-500">{t.totalTickets}:</span>
                <span className="font-bold text-teal-800">{booking.totalPax} {t.paxLabel}</span>
              </div>
            </div>

            {/* Breakdown */}
            <div className="pt-2 border-t border-slate-200 flex flex-wrap gap-1">
              {booking.pax.malaysianAdult > 0 && (
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-white text-slate-700 border border-slate-200 whitespace-nowrap">
                  🇲🇾 {booking.pax.malaysianAdult} Dewasa (MY)
                </span>
              )}
              {booking.pax.malaysianChild > 0 && (
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-white text-slate-700 border border-slate-200 whitespace-nowrap">
                  🇲🇾 {booking.pax.malaysianChild} Kanak2 (MY)
                </span>
              )}
              {booking.pax.internationalAdult > 0 && (
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-white text-slate-700 border border-slate-200 whitespace-nowrap">
                  🌍 {booking.pax.internationalAdult} Adult (Int'l)
                </span>
              )}
              {booking.pax.internationalChild > 0 && (
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-white text-slate-700 border border-slate-200 whitespace-nowrap">
                  🌍 {booking.pax.internationalChild} Child (Int'l)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer Note on Pass */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span className="truncate mr-2">{t.presentAtGate}</span>
          <span className="font-mono text-[10px] text-slate-400 whitespace-nowrap">Ref: {booking.paymentRef}</span>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <button
          type="button"
          onClick={handleDownloadPdf}
          className="py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer text-center whitespace-nowrap"
        >
          {t.downloadPdf}
        </button>

        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer text-center whitespace-nowrap"
        >
          {t.shareWhatsApp}
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition-colors cursor-pointer text-center whitespace-nowrap"
        >
          {t.printTicket}
        </button>
      </div>
    </div>
  );
};
