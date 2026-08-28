import React, { useState } from 'react';
import type { Language, Booking, IslandConfig } from '../../types/ticket';
import { translations } from '../../data/translations';
import { storageService } from '../../services/storageService';

interface AdminDashboardProps {
  currentLang: Language;
  config: IslandConfig;
  onConfigUpdated: (newConfig: IslandConfig) => void;
  onViewTicket: (booking: Booking) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentLang,
  config,
  onConfigUpdated,
  onViewTicket
}) => {
  const t = translations[currentLang];
  const [bookings, setBookings] = useState<Booking[]>(storageService.getBookings());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'CHECKED_IN' | 'NOT_CHECKED_IN'>('ALL');
  const [activeTab, setActiveTab] = useState<'bookings' | 'settings'>('bookings');

  const [editableConfig, setEditableConfig] = useState<IslandConfig>({ ...config });
  const [saveToast, setSaveToast] = useState(false);

  const refreshData = () => {
    setBookings(storageService.getBookings());
  };

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.paymentStatus === 'PAID' ? b.totalPrice : 0), 0);
  const totalVisitors = bookings.reduce((sum, b) => sum + b.totalPax, 0);
  const totalCheckedIn = bookings
    .filter(b => b.checkInStatus === 'CHECKED_IN')
    .reduce((sum, b) => sum + b.totalPax, 0);

  const totalMalaysianPax = bookings.reduce(
    (sum, b) => sum + b.pax.malaysianAdult + b.pax.malaysianChild,
    0
  );
  const totalIntlPax = bookings.reduce(
    (sum, b) => sum + b.pax.internationalAdult + b.pax.internationalChild,
    0
  );

  const filteredBookings = bookings.filter(b => {
    const query = searchQuery.toLowerCase().trim();
    const matchSearch =
      b.id.toLowerCase().includes(query) ||
      b.buyerName.toLowerCase().includes(query) ||
      b.buyerPhone.toLowerCase().includes(query) ||
      b.buyerCountry.toLowerCase().includes(query) ||
      b.visitDate.includes(query);

    const matchStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'CHECKED_IN' && b.checkInStatus === 'CHECKED_IN') ||
      (statusFilter === 'NOT_CHECKED_IN' && b.checkInStatus === 'NOT_CHECKED_IN');

    return matchSearch && matchStatus;
  });

  const handleExportCsv = () => {
    const headers = [
      'Booking ID',
      'Visit Date',
      'Lead Guest Name',
      'Country',
      'Phone',
      'Email',
      'Total Pax',
      'MY Adult',
      'MY Child',
      'Intl Adult',
      'Intl Child',
      'Total Amount (RM)',
      'Payment Status',
      'Check-in Status',
      'Check-in Time'
    ];

    const rows = bookings.map(b => [
      b.id,
      b.visitDate,
      `"${b.buyerName}"`,
      `"${b.buyerCountry}"`,
      `"${b.buyerPhone}"`,
      `"${b.buyerEmail}"`,
      b.totalPax,
      b.pax.malaysianAdult,
      b.pax.malaysianChild,
      b.pax.internationalAdult,
      b.pax.internationalChild,
      b.totalPrice,
      b.paymentStatus,
      b.checkInStatus,
      b.checkedInAt || ''
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Semporna_Island_Bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.saveConfig(editableConfig);
    onConfigUpdated(editableConfig);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleResetSampleData = () => {
    if (window.confirm("Adakah anda pasti mahu set semula data ke contoh asal?")) {
      storageService.resetToDefault();
      refreshData();
      setEditableConfig(storageService.getConfig());
      onConfigUpdated(storageService.getConfig());
    }
  };

  return (
    <div className="space-y-6 text-left animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="inline-block px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-800 text-xs font-bold mb-1 border border-teal-200">
            {config.islandName}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {t.adminTitle}
          </h2>
          <p className="text-xs text-slate-500">
            Laporan masa nyata kutipan hasil dan pengurusan rekod pelancong pulau.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'bg-teal-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {t.recentBookings}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-teal-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Tetapan Pulau
          </button>
        </div>
      </div>

      {/* STATS OVERVIEW CARDS (White Theme) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Card 1: Total Revenue */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">{t.totalRevenue}</span>
          <div className="text-xl sm:text-2xl font-black text-teal-800 mt-1 whitespace-nowrap">
            RM {totalRevenue.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 truncate">100% kutipan terus tanpa komisen</p>
        </div>

        {/* Card 2: Total Visitors */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">{t.totalVisitors}</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1 whitespace-nowrap">
            {totalVisitors} <span className="text-xs font-semibold text-slate-500">Pax</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5 truncate">
            🇲🇾 {totalMalaysianPax} MY • 🌍 {totalIntlPax} Intl
          </p>
        </div>

        {/* Card 3: Checked In */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">{t.checkedInToday}</span>
          <div className="text-xl sm:text-2xl font-black text-sky-700 mt-1 whitespace-nowrap">
            {totalCheckedIn} <span className="text-xs font-semibold text-slate-500">Pax</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5 truncate">Disahkan di jeti & pulau</p>
        </div>

        {/* Card 4: Ratio */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Pecahan Pelancong</span>
          <div className="text-base sm:text-lg font-extrabold text-slate-900 mt-1 whitespace-nowrap">
            <span className="text-teal-700 font-black">
              {totalVisitors > 0 ? Math.round((totalMalaysianPax / totalVisitors) * 100) : 0}% MY
            </span>
            <span className="text-slate-400 mx-1">/</span>
            <span className="text-teal-700 font-black">
              {totalVisitors > 0 ? Math.round((totalIntlPax / totalVisitors) * 100) : 0}% Intl
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5 truncate">Korea, Jepun, China & Eropah</p>
        </div>
      </div>

      {/* TAB 1: BOOKINGS LIST */}
      {activeTab === 'bookings' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
          {/* Controls Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="w-full sm:w-80">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-600 shadow-2xs"
              />
            </div>

            {/* Filter & Export */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end overflow-x-auto">
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setStatusFilter('ALL')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    statusFilter === 'ALL' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Semua ({bookings.length})
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter('NOT_CHECKED_IN')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    statusFilter === 'NOT_CHECKED_IN' ? 'bg-white text-teal-800 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Belum Masuk
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter('CHECKED_IN')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    statusFilter === 'CHECKED_IN' ? 'bg-white text-sky-800 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Selesai Masuk
                </button>
              </div>

              <button
                type="button"
                onClick={handleExportCsv}
                className="px-3.5 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
              >
                {t.exportCsv}
              </button>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider bg-slate-50 whitespace-nowrap">
                  <th className="py-3 px-3.5">{t.bookingRef}</th>
                  <th className="py-3 px-3.5">{t.validOnDate}</th>
                  <th className="py-3 px-3.5">{t.fullName}</th>
                  <th className="py-3 px-3.5">{t.country}</th>
                  <th className="py-3 px-3.5">{t.totalTickets}</th>
                  <th className="py-3 px-3.5">{t.totalAmount}</th>
                  <th className="py-3 px-3.5">Status Bayaran</th>
                  <th className="py-3 px-3.5">Status Kemasukan</th>
                  <th className="py-3 px-3.5 text-center">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-slate-400">
                      Tiada rekod tempahan ditemui.
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50 transition-colors whitespace-nowrap">
                      <td className="py-3 px-3.5 font-mono font-bold text-slate-900">
                        {b.id}
                      </td>
                      <td className="py-3 px-3.5 text-slate-700">
                        {b.visitDate}
                      </td>
                      <td className="py-3 px-3.5">
                        <div className="font-bold text-slate-900">{b.buyerName}</div>
                        <div className="text-[11px] text-slate-500">{b.buyerPhone}</div>
                      </td>
                      <td className="py-3 px-3.5 text-slate-700">
                        {b.buyerCountry}
                      </td>
                      <td className="py-3 px-3.5 font-bold text-slate-900">
                        {b.totalPax} Pax
                      </td>
                      <td className="py-3 px-3.5 font-extrabold text-teal-800">
                        RM {b.totalPrice}
                      </td>
                      <td className="py-3 px-3.5">
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-teal-50 text-teal-800 border border-teal-200">
                          {t.statusPaid}
                        </span>
                      </td>
                      <td className="py-3 px-3.5">
                        {b.checkInStatus === 'CHECKED_IN' ? (
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-sky-50 text-sky-800 border border-sky-200">
                            {t.statusCheckedIn} ({b.checkedInAt})
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200">
                            {t.statusNotCheckedIn}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3.5 text-center">
                        <button
                          type="button"
                          onClick={() => onViewTicket(b)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
                        >
                          Lihat Pas
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ISLAND SETTINGS & PRICING */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Tetapan Maklumat Pulau & Harga Tiket</h3>
              <p className="text-xs text-slate-500">Kemaskini nama pulau, akaun DuitNow QR, dan harga tiket bila-bila masa.</p>
            </div>
            <button
              type="button"
              onClick={handleResetSampleData}
              className="text-xs text-slate-500 hover:text-rose-600 transition-colors p-1.5 cursor-pointer whitespace-nowrap"
            >
              Set Semula Demo
            </button>
          </div>

          {saveToast && (
            <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs font-bold">
              Tetapan berjaya disimpan dan dikemaskini ke sistem!
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Island Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Pulau</label>
              <input
                type="text"
                value={editableConfig.islandName}
                onChange={(e) => setEditableConfig({ ...editableConfig, islandName: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-600"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Lokasi</label>
              <input
                type="text"
                value={editableConfig.location}
                onChange={(e) => setEditableConfig({ ...editableConfig, location: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-600"
                required
              />
            </div>

            {/* DuitNow Account Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Penama DuitNow QR</label>
              <input
                type="text"
                value={editableConfig.duitnowAccountName}
                onChange={(e) => setEditableConfig({ ...editableConfig, duitnowAccountName: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-600"
                required
              />
            </div>

            {/* DuitNow Account Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">No. Akaun / ID DuitNow</label>
              <input
                type="text"
                value={editableConfig.duitnowAccountNumber}
                onChange={(e) => setEditableConfig({ ...editableConfig, duitnowAccountNumber: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-600"
                required
              />
            </div>

            {/* Bank Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Bank Rasmi</label>
              <input
                type="text"
                value={editableConfig.bankName}
                onChange={(e) => setEditableConfig({ ...editableConfig, bankName: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-600"
                required
              />
            </div>

            {/* Bank Account Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nombor Akaun Bank</label>
              <input
                type="text"
                value={editableConfig.bankAccountNumber}
                onChange={(e) => setEditableConfig({ ...editableConfig, bankAccountNumber: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 font-mono focus:outline-none focus:border-teal-600"
                required
              />
            </div>
          </div>

          {/* Pricing Config */}
          <div className="pt-3 border-t border-slate-200 space-y-2.5">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">
              Kadar Harga Tiket (RM)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <label className="block text-[11px] text-slate-500 mb-1">🇲🇾 Dewasa Malaysia</label>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-slate-500">RM</span>
                  <input
                    type="number"
                    value={editableConfig.prices.malaysianAdult}
                    onChange={(e) => setEditableConfig({
                      ...editableConfig,
                      prices: { ...editableConfig.prices, malaysianAdult: Number(e.target.value) }
                    })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-teal-800"
                  />
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <label className="block text-[11px] text-slate-500 mb-1">🇲🇾 Kanak2 MY</label>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-slate-500">RM</span>
                  <input
                    type="number"
                    value={editableConfig.prices.malaysianChild}
                    onChange={(e) => setEditableConfig({
                      ...editableConfig,
                      prices: { ...editableConfig.prices, malaysianChild: Number(e.target.value) }
                    })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-teal-800"
                  />
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <label className="block text-[11px] text-slate-500 mb-1">🌍 Dewasa Luar Negara</label>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-slate-500">RM</span>
                  <input
                    type="number"
                    value={editableConfig.prices.internationalAdult}
                    onChange={(e) => setEditableConfig({
                      ...editableConfig,
                      prices: { ...editableConfig.prices, internationalAdult: Number(e.target.value) }
                    })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-teal-800"
                  />
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <label className="block text-[11px] text-slate-500 mb-1">🌍 Kanak2 Luar Negara</label>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-slate-500">RM</span>
                  <input
                    type="number"
                    value={editableConfig.prices.internationalChild}
                    onChange={(e) => setEditableConfig({
                      ...editableConfig,
                      prices: { ...editableConfig.prices, internationalChild: Number(e.target.value) }
                    })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-teal-800"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-xl text-xs sm:text-sm transition-colors shadow-xs cursor-pointer whitespace-nowrap"
          >
            Simpan Perubahan Tetapan
          </button>
        </form>
      )}
    </div>
  );
};
