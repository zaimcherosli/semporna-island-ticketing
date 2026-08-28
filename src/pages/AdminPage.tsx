import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Language, Booking, IslandConfig } from '../types/ticket';
import { Navbar } from '../components/Navbar';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { ETicketPass } from '../components/visitor/ETicketPass';
import { Footer } from '../components/Footer';

interface AdminPageProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  config: IslandConfig;
  onConfigUpdated: (newConfig: IslandConfig) => void;
}

export function AdminPage({ currentLang, onLanguageChange, config, onConfigUpdated }: AdminPageProps) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [viewingBooking, setViewingBooking] = useState<Booking | null>(null);
  const navigate = useNavigate();

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword.trim() === 'admin' || adminPassword.trim() === 'island2026' || adminPassword.trim() === config.staffPin) {
      setIsAdminAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setAdminPassword('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-teal-600 selection:text-white">
      <Navbar
        currentLang={currentLang}
        onLanguageChange={onLanguageChange}
        islandName={config.islandName}
        portalType="admin"
        onAdminLogout={isAdminAuthenticated ? handleAdminLogout : undefined}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {!isAdminAuthenticated ? (
          <div className="max-w-sm mx-auto py-12 px-4 text-center space-y-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">Portal Pemilik Pulau</h2>
              <p className="text-xs text-slate-500 mt-1">Sila log masuk untuk melihat laporan kutipan & tetapan harga</p>
            </div>

            <form onSubmit={handleAdminLogin} className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Kata Laluan Pentadbir (Admin Password)
                </label>
                <input
                  type="password"
                  placeholder="Masukkan kata laluan"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-600 shadow-2xs"
                  autoFocus
                  required
                />
              </div>

              {loginError && (
                <p className="text-xs text-rose-700 font-semibold">
                  Kata laluan tidak sah! (Kata laluan demo: <code className="font-bold">admin</code>).
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-xl text-xs sm:text-sm transition-colors shadow-xs cursor-pointer whitespace-nowrap"
              >
                Log Masuk Dashboard
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  Kembali ke Laman Pelancong
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            {viewingBooking ? (
              <ETicketPass
                booking={viewingBooking}
                config={config}
                currentLang={currentLang}
                mode="admin"
                onBack={() => setViewingBooking(null)}
              />
            ) : (
              <AdminDashboard
                currentLang={currentLang}
                config={config}
                onConfigUpdated={onConfigUpdated}
                onViewTicket={(booking) => setViewingBooking(booking)}
              />
            )}
          </div>

        )}
      </main>

      <Footer config={config} />
    </div>
  );
}
