import { useParams, useNavigate } from 'react-router-dom';
import type { Language, IslandConfig } from '../types/ticket';
import { storageService } from '../services/storageService';
import { Navbar } from '../components/Navbar';
import { ETicketPass } from '../components/visitor/ETicketPass';
import { Footer } from '../components/Footer';

interface DirectTicketPageProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  config: IslandConfig;
}

export function DirectTicketPage({ currentLang, onLanguageChange, config }: DirectTicketPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const booking = id ? storageService.getBookingById(id) : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-teal-600 selection:text-white">
      <Navbar
        currentLang={currentLang}
        onLanguageChange={onLanguageChange}
        islandName={config.islandName}
        portalType="visitor"
      />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {booking ? (
          <ETicketPass
            booking={booking}
            config={config}
            currentLang={currentLang}
            mode="view"
            onBack={() => navigate('/')}
          />
        ) : (

          <div className="text-center py-16 space-y-4 bg-white border border-slate-200 rounded-3xl p-8 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900">E-Tiket Tidak Dijumpai</h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Nombor rujukan tiket <code className="font-bold text-slate-800">{id}</code> tidak wujud atau telah luput.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Kembali ke Laman Tempahan
            </button>
          </div>
        )}
      </main>

      <Footer config={config} />
    </div>
  );
}
