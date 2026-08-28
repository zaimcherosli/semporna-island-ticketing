import type { Language, IslandConfig } from '../types/ticket';
import { Navbar } from '../components/Navbar';
import { StaffPortal } from '../components/staff/QRScannerModal';
import { Footer } from '../components/Footer';

interface StaffPageProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  config: IslandConfig;
}

export function StaffPage({ currentLang, onLanguageChange, config }: StaffPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-teal-600 selection:text-white">
      <Navbar
        currentLang={currentLang}
        onLanguageChange={onLanguageChange}
        islandName={config.islandName}
        portalType="staff"
      />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <StaffPortal
          currentLang={currentLang}
          config={config}
          onBookingUpdated={() => {}}
        />
      </main>

      <Footer config={config} />
    </div>
  );
}
