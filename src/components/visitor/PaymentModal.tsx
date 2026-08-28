import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { Language, Booking, IslandConfig } from '../../types/ticket';
import { translations } from '../../data/translations';
import { X, Copy, Check, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDraft: Omit<Booking, 'id' | 'paymentRef' | 'paymentTime' | 'ticketQrPayload' | 'checkInStatus' | 'createdAt'> | null;
  config: IslandConfig;
  currentLang: Language;
  onPaymentCompleted: (completedBooking: Booking) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  bookingDraft,
  config,
  currentLang,
  onPaymentCompleted
}) => {
  if (!isOpen || !bookingDraft) return null;

  const t = translations[currentLang];
  const [paymentTab, setPaymentTab] = useState<'DUITNOW_QR' | 'ONLINE_BANKING'>('DUITNOW_QR');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const tempBookingId = `SMP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const now = new Date();
      const qrPayload = JSON.stringify({
        id: tempBookingId,
        guest: bookingDraft.buyerName,
        pax: bookingDraft.totalPax,
        date: bookingDraft.visitDate,
        amount: bookingDraft.totalPrice,
        hash: `SIG_${tempBookingId}_${Date.now().toString(36)}`
      });

      const finalBooking: Booking = {
        ...bookingDraft,
        id: tempBookingId,
        paymentMethod: paymentTab,
        paymentStatus: 'PAID',
        paymentRef: `${paymentTab === 'DUITNOW_QR' ? 'DN' : 'FPX'}-${Math.floor(100000 + Math.random() * 900000)}`,
        paymentTime: now.toISOString(),
        ticketQrPayload: qrPayload,
        checkInStatus: 'NOT_CHECKED_IN',
        createdAt: now.toISOString()
      };

      setIsProcessing(false);
      
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.error(e);
      }

      onPaymentCompleted(finalBooking);
    }, 1000);
  };

  const duitnowPayload = `00020101021226580014MY.DUITNOW.QR0118${config.duitnowAccountNumber}520459995303458540${bookingDraft.totalPrice.toFixed(2)}5802MY5928${config.duitnowAccountName.slice(0, 25)}6008SEMPORNA62170113${tempBookingId}6304`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto animate-fade-in text-left">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-slate-50 p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-800 text-[11px] font-bold mb-1 border border-teal-200">
              {t.badgeOfficial}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              {t.paymentTitle}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.paymentSubtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Amount & Reference Banner */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 block font-medium">{t.totalAmount}</span>
              <span className="text-xl sm:text-2xl font-black text-teal-700">
                RM {bookingDraft.totalPrice}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 block font-medium">{t.bookingRef}</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-xs font-bold text-slate-800 bg-white border border-slate-300 px-2 py-1 rounded-md">
                  {tempBookingId}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(tempBookingId, 'ref')}
                  className="text-slate-500 hover:text-teal-700 transition-colors p-1 cursor-pointer"
                >
                  {copiedField === 'ref' ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Payment Method Switcher Tabs */}
          <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setPaymentTab('DUITNOW_QR')}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                paymentTab === 'DUITNOW_QR'
                  ? 'bg-white text-teal-800 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              DuitNow QR
            </button>

            <button
              type="button"
              onClick={() => setPaymentTab('ONLINE_BANKING')}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                paymentTab === 'ONLINE_BANKING'
                  ? 'bg-white text-teal-800 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Online Banking
            </button>
          </div>

          {/* Tab 1: DuitNow QR View */}
          {paymentTab === 'DUITNOW_QR' && (
            <div className="space-y-3 text-center">
              <div className="inline-block p-4 bg-white rounded-2xl shadow-xs border border-slate-200">
                <div className="bg-rose-50 text-rose-800 border border-rose-200 text-[10px] font-extrabold uppercase py-0.5 px-3 rounded-full mb-2 tracking-wider inline-block">
                  DuitNow QR Rasmi
                </div>
                <div className="flex justify-center p-1 bg-white">
                  <QRCodeSVG
                    value={duitnowPayload}
                    size={160}
                    level="H"
                    includeMargin={false}
                  />
                </div>
                <div className="mt-2 text-slate-800 text-xs font-bold truncate max-w-[200px] mx-auto">
                  {config.duitnowAccountName}
                </div>
              </div>

              <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                {t.duitnowScanPrompt}
              </p>
            </div>
          )}

          {/* Tab 2: Bank Transfer Details View */}
          {paymentTab === 'ONLINE_BANKING' && (
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">{t.bankNameLabel}:</span>
                <span className="font-bold text-slate-800">{config.bankName}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">{t.accHolder}:</span>
                <span className="font-bold text-slate-800">{config.bankHolderName}</span>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200">
                <span className="text-slate-500">{t.accNumber}:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-teal-800 text-sm">{config.bankAccountNumber}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(config.bankAccountNumber, 'acc')}
                    className="p-1 text-slate-500 hover:text-teal-700 cursor-pointer"
                  >
                    {copiedField === 'acc' ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Step Note */}
          <div className="bg-teal-50/70 border border-teal-200 rounded-xl p-3 text-xs text-teal-900">
            <span className="font-bold block mb-0.5">Langkah Pengesahan:</span>
            <p className="text-[11px] text-teal-800 leading-snug">
              Selepas membuat bayaran, tekan butang di bawah untuk sistem jana Kod QR E-Tiket rasmi anda.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleConfirmPayment}
              disabled={isProcessing}
              className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-xl text-xs sm:text-sm transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t.paymentProcessing}</span>
                </>
              ) : (
                <span>{t.btnConfirmPayment}</span>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              {t.btnCancel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
