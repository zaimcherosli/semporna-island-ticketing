import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import type { Language, Booking, ScanLog, IslandConfig } from '../../types/ticket';
import { translations } from '../../data/translations';
import { storageService } from '../../services/storageService';
import confetti from 'canvas-confetti';

interface StaffPortalProps {
  currentLang: Language;
  config: IslandConfig;
  onBookingUpdated?: () => void;
}

export const StaffPortal: React.FC<StaffPortalProps> = ({
  currentLang,
  config,
  onBookingUpdated
}) => {
  const t = translations[currentLang];
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [isScanning, setIsScanning] = useState(false);
  const [isStartingCamera, setIsStartingCamera] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState('');
  const [activeTab, setActiveTab] = useState<'camera' | 'manual'>('camera');
  
  const [scannedResult, setScannedResult] = useState<{
    status: 'VALID' | 'ALREADY_USED' | 'INVALID' | 'DATE_MISMATCH';
    booking?: Booking;
    message?: string;
  } | null>(null);

  const [scanLogs, setScanLogs] = useState<ScanLog[]>([]);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerId = 'qr-reader-container';

  useEffect(() => {
    setScanLogs(storageService.getScanLogs());
  }, []);

  const playSound = (type: 'success' | 'error') => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'success') {
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, audioCtx.currentTime);
        osc.frequency.setValueAtTime(140, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      }
    } catch (e) {
      console.warn("Audio Context error", e);
    }
  };

  const verifyTicket = (rawString: string) => {
    let bookingId = rawString.trim();

    try {
      if (rawString.startsWith('{')) {
        const parsed = JSON.parse(rawString);
        bookingId = parsed.id || parsed.bookingId || rawString;
      }
    } catch {
      // Raw string fallback
    }

    const booking = storageService.getBookingById(bookingId);

    if (!booking) {
      playSound('error');
      setScannedResult({
        status: 'INVALID',
        message: 'No record found in database'
      });
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const isToday = booking.visitDate === todayStr;

    if (booking.checkInStatus === 'CHECKED_IN') {
      playSound('error');
      setScannedResult({
        status: 'ALREADY_USED',
        booking,
        message: `Telah didaftar masuk pada ${booking.checkedInAt || 'Terdahulu'} oleh ${booking.checkedInBy || 'Staf'}`
      });
      return;
    }

    if (!isToday) {
      playSound('error');
      setScannedResult({
        status: 'DATE_MISMATCH',
        booking,
        message: `Tarikh tiket: ${booking.visitDate}, Tarikh hari ini: ${todayStr}`
      });
      return;
    }

    playSound('success');
    setScannedResult({
      status: 'VALID',
      booking
    });
  };

  const cleanupScanner = async () => {
    if (scannerRef.current) {
      try {
        if (scannerRef.current.isScanning) {
          await scannerRef.current.stop();
        }
        await scannerRef.current.clear();
      } catch (e) {
        console.warn("Cleanup warning", e);
      }
      scannerRef.current = null;
    }
  };

  const startCamera = async () => {
    setCameraError(null);
    setIsStartingCamera(true);

    try {
      await cleanupScanner();

      // Ensure container DOM exists
      const container = document.getElementById(scannerContainerId);
      if (!container) {
        throw new Error("Scanner container DOM element not found.");
      }

      const html5QrCode = new Html5Qrcode(scannerContainerId, {
        formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
        verbose: false
      });
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: 'environment' },
        {
          fps: 15,
          qrbox: (viewfinderWidth, viewfinderHeight) => {
            const minEdgePercentage = 0.75;
            const minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
            const qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
            return {
              width: qrboxSize,
              height: qrboxSize
            };
          }
        },
        (decodedText) => {
          verifyTicket(decodedText);
          stopCamera();
        },
        () => {}
      );

      setIsScanning(true);
      setIsStartingCamera(false);
    } catch (err: unknown) {
      console.warn("Direct environment camera failed, trying fallback...", err);
      try {
        if (scannerRef.current) {
          await scannerRef.current.start(
            { facingMode: 'user' },
            { fps: 10, qrbox: { width: 220, height: 220 } },
            (decodedText) => {
              verifyTicket(decodedText);
              stopCamera();
            },
            () => {}
          );
          setIsScanning(true);
          setIsStartingCamera(false);
          return;
        }
      } catch (fallbackErr: unknown) {

        console.error("Camera access failed", fallbackErr);
        const errMsg = fallbackErr instanceof Error ? fallbackErr.message : "Sila benarkan kebenaran kamera dalam tetapan browser anda.";
        setCameraError(errMsg);
      }
      setIsScanning(false);
      setIsStartingCamera(false);
    }
  };

  const stopCamera = async () => {
    setIsStartingCamera(false);
    await cleanupScanner();
    setIsScanning(false);
  };

  useEffect(() => {
    return () => {
      cleanupScanner();
    };
  }, []);

  const handleConfirmEntry = () => {
    if (!scannedResult?.booking) return;

    const res = storageService.checkInBooking(scannedResult.booking.id, 'Staf Jeti 1');
    if (res.success && res.booking) {
      playSound('success');
      try {
        confetti({ particleCount: 50, spread: 60 });
      } catch {}
      
      setScannedResult({
        status: 'ALREADY_USED',
        booking: res.booking,
        message: 'Kemasukan Baru Disahkan!'
      });
      
      setScanLogs(storageService.getScanLogs());
      if (onBookingUpdated) onBookingUpdated();
    }
  };

  const handleScanNext = () => {
    setScannedResult(null);
    setManualCode('');
    if (activeTab === 'camera') {
      startCamera();
    }
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === config.staffPin || pinInput.trim() === '1234') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // 1. PIN Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="max-w-sm mx-auto py-8 px-3 text-center space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">{t.staffGateTitle}</h2>
          <p className="text-xs text-slate-500 mt-1">{t.staffGateSubtitle}</p>
        </div>

        <form onSubmit={handlePinSubmit} className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t.enterPinPrompt}
            </label>
            <input
              type="password"
              maxLength={6}
              placeholder="1234"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-center text-xl font-mono tracking-widest text-slate-900 focus:outline-none focus:border-teal-600 shadow-2xs"
              autoFocus
            />
          </div>

          {pinError && (
            <p className="text-xs text-rose-700 font-semibold">
              PIN salah! Sila cuba lagi (PIN lalai: 1234).
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-xl text-xs sm:text-sm transition-colors shadow-xs cursor-pointer whitespace-nowrap"
          >
            {t.btnLoginStaff}
          </button>
        </form>
      </div>
    );
  }

  // 2. Staff Scanner Interface (Fully Centered, Responsive, Large Viewport)
  return (
    <div className="max-w-2xl mx-auto space-y-5 text-left animate-fade-in w-full max-w-full px-1">
      
      {/* Centered Clean Header */}
      <div className="text-center space-y-1.5 border-b border-slate-200 pb-4">
        <div className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
          Pintu Masuk Jeti / Pulau Semporna
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          {t.staffGateTitle}
        </h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          {t.scanQrPrompt}
        </p>
      </div>

      {/* Balanced 2-Column Mode Switcher (Never cuts off) */}
      <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 w-full">
        <button
          type="button"
          onClick={() => {
            setActiveTab('camera');
            setScannedResult(null);
          }}
          className={`py-2 px-3 rounded-xl text-xs font-bold text-center transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'camera'
              ? 'bg-teal-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {t.liveScanner}
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('manual');
            stopCamera();
            setScannedResult(null);
          }}
          className={`py-2 px-3 rounded-xl text-xs font-bold text-center transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'manual'
              ? 'bg-teal-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {t.manualLookup}
        </button>
      </div>

      {/* Main Scanner Container (Large Viewport) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-sm space-y-4">
        
        {/* TAB 1: Live Camera View */}
        {activeTab === 'camera' && (
          <div className="space-y-3">
            {/* Viewfinder Frame */}
            <div className="relative mx-auto w-full overflow-hidden rounded-2xl bg-slate-950 border-2 border-slate-300 min-h-[300px] sm:min-h-[360px] flex items-center justify-center">
              
              <div id={scannerContainerId} className="w-full h-full" />

              {/* Laser Animation when Scanning */}
              {isScanning && <div className="scan-laser-line" />}
              
              {/* Idle State Prompt */}
              {!isScanning && !scannedResult && (
                <div className="p-6 text-center space-y-3.5 z-10">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 text-white flex items-center justify-center mx-auto text-xl font-bold">
                    📷
                  </div>
                  <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
                    {t.cameraAccessPrompt}
                  </p>
                  <button
                    type="button"
                    onClick={startCamera}
                    disabled={isStartingCamera}
                    className="py-3 px-6 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-xs transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {isStartingCamera ? "Sedang Membuka Kamera..." : t.startCamera}
                  </button>
                </div>
              )}

              {/* Top Action controls when active */}
              {isScanning && (
                <div className="absolute top-3 right-3 z-20">
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="py-1.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md cursor-pointer whitespace-nowrap"
                  >
                    {t.stopCamera}
                  </button>
                </div>
              )}

              {/* Camera Error Message */}
              {cameraError && !isScanning && (
                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-rose-950/90 border border-rose-500 text-rose-200 text-xs text-center z-20">
                  {cameraError}
                </div>
              )}
            </div>

            {isScanning && (
              <p className="text-center text-[11px] text-slate-500 font-medium">
                Halakan kamera telefon ke arah Kod QR pelancong
              </p>
            )}
          </div>
        )}

        {/* TAB 2: Manual Search */}
        {activeTab === 'manual' && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="cth. SMP-2026-8801"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-mono uppercase focus:outline-none focus:border-teal-600"
              />
              <button
                type="button"
                onClick={() => verifyTicket(manualCode)}
                className="px-4 sm:px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer whitespace-nowrap"
              >
                {t.lookupBookingBtn}
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Contoh ID sedia ada: <code className="text-teal-700 font-bold">SMP-2026-8801</code>, <code className="text-teal-700 font-bold">SMP-2026-8802</code>
            </p>
          </div>
        )}

        {/* VERIFICATION RESULT DISPLAY */}
        {scannedResult && (
          <div className="pt-3 border-t border-slate-200 animate-fade-in space-y-3">
            
            {/* Status 1: VALID TICKET */}
            {scannedResult.status === 'VALID' && scannedResult.booking && (
              <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/80 border border-teal-300 space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-black text-teal-900">{t.ticketValidTitle}</h4>
                    <p className="text-xs text-teal-800">{t.ticketValidDesc}</p>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-900 bg-white px-2.5 py-1 rounded-md border border-slate-300">
                    {scannedResult.booking.id}
                  </span>
                </div>

                {/* Booking Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white p-3 rounded-xl border border-teal-200 text-xs">
                  <div>
                    <span className="text-slate-500 block">{t.fullName}</span>
                    <span className="font-bold text-slate-900 truncate block">{scannedResult.booking.buyerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">{t.country}</span>
                    <span className="font-bold text-slate-900">{scannedResult.booking.buyerCountry}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">{t.totalTickets}</span>
                    <span className="font-extrabold text-teal-800">{scannedResult.booking.totalPax} Pax</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">{t.totalAmount}</span>
                    <span className="font-bold text-slate-900">RM {scannedResult.booking.totalPrice}</span>
                  </div>
                </div>

                {/* Confirm Action Button */}
                <button
                  type="button"
                  onClick={handleConfirmEntry}
                  className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-black rounded-xl text-xs sm:text-sm transition-colors shadow-xs cursor-pointer whitespace-nowrap"
                >
                  {t.btnConfirmEntry}
                </button>
              </div>
            )}

            {/* Status 2: ALREADY USED */}
            {scannedResult.status === 'ALREADY_USED' && (
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-300 space-y-2 text-left">
                <h4 className="text-base font-black text-amber-900">{t.ticketUsedTitle}</h4>
                <p className="text-xs text-amber-800">{scannedResult.message || t.ticketUsedDesc}</p>
                {scannedResult.booking && (
                  <div className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-amber-200 space-y-0.5">
                    <div><strong>Pelawat:</strong> {scannedResult.booking.buyerName} ({scannedResult.booking.totalPax} Pax)</div>
                    <div><strong>Tarikh:</strong> {scannedResult.booking.visitDate}</div>
                    <div><strong>No. Tempahan:</strong> {scannedResult.booking.id}</div>
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleScanNext}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer mt-2"
                >
                  Imbas Tiket Seterusnya 📷
                </button>
              </div>
            )}

            {/* Status 3: INVALID TICKET */}
            {scannedResult.status === 'INVALID' && (
              <div className="p-4 sm:p-5 rounded-2xl bg-rose-50 border border-rose-300 space-y-2 text-left">
                <h4 className="text-base font-black text-rose-900">{t.ticketInvalidTitle}</h4>
                <p className="text-xs text-rose-800">{t.ticketInvalidDesc}</p>
                <button
                  type="button"
                  onClick={handleScanNext}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer mt-2"
                >
                  Imbas Semula 📷
                </button>
              </div>
            )}

            {/* Status 4: DATE MISMATCH */}
            {scannedResult.status === 'DATE_MISMATCH' && scannedResult.booking && (
              <div className="p-4 sm:p-5 rounded-2xl bg-orange-50 border border-orange-300 space-y-2 text-left">
                <h4 className="text-base font-black text-orange-900">{t.dateMismatchTitle}</h4>
                <p className="text-xs text-orange-800">{scannedResult.message}</p>
                <button
                  type="button"
                  onClick={handleScanNext}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer mt-2"
                >
                  Imbas Tiket Seterusnya 📷
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Recent Scan History Log */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 space-y-3 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
          <span className="font-bold text-xs sm:text-sm text-slate-900">
            Rekod Imbasan Pintu Masuk Hari Ini
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {scanLogs.length} rekod
          </span>
        </div>

        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {scanLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
            >
              <div className="space-y-0.5 truncate mr-2">
                <div className="font-bold text-slate-900 truncate">
                  {log.guestName} <span className="font-mono text-slate-500 font-normal">({log.bookingId})</span>
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  {log.notes || `${log.paxTotal} Pax`} • Staf: {log.staffName}
                </div>
              </div>

              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200 whitespace-nowrap">
                {log.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
