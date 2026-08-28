import { useState } from 'react';
import type { Language, Booking, IslandConfig } from '../types/ticket';
import { storageService } from '../services/storageService';
import { Navbar } from '../components/Navbar';
import { HeroBanner } from '../components/visitor/HeroBanner';
import { BookingForm } from '../components/visitor/BookingForm';
import { PaymentModal } from '../components/visitor/PaymentModal';
import { ETicketPass } from '../components/visitor/ETicketPass';
import { CheckTicketView } from '../components/visitor/CheckTicketView';
import { Footer } from '../components/Footer';

interface VisitorPageProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  config: IslandConfig;
}

export function VisitorPage({ currentLang, onLanguageChange, config }: VisitorPageProps) {
  const [activeVisitorTab, setActiveVisitorTab] = useState<'book' | 'my-ticket'>('book');
  const [bookingDraft, setBookingDraft] = useState<Omit<Booking, 'id' | 'paymentRef' | 'paymentTime' | 'ticketQrPayload' | 'checkInStatus' | 'createdAt'> | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [activeETicket, setActiveETicket] = useState<Booking | null>(null);

  const handleProceedToPayment = (draft: Omit<Booking, 'id' | 'paymentRef' | 'paymentTime' | 'ticketQrPayload' | 'checkInStatus' | 'createdAt'>) => {
    setBookingDraft(draft);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentCompleted = (completedBooking: Booking) => {
    storageService.saveBooking(completedBooking);
    setIsPaymentModalOpen(false);
    setBookingDraft(null);
    setActiveETicket(completedBooking);
  };

  const scrollToBooking = () => {
    setActiveETicket(null);
    setActiveVisitorTab('book');
    const el = document.getElementById('booking-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-teal-600 selection:text-white">
      {/* Public Navbar - Only shows Tourist links */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={onLanguageChange}
        islandName={config.islandName}
        portalType="visitor"
        activeVisitorTab={activeVisitorTab}
        setActiveVisitorTab={setActiveVisitorTab}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 overflow-hidden">

        {activeVisitorTab === 'book' ? (
          <div className="space-y-8">
            {activeETicket ? (
              <ETicketPass
                booking={activeETicket}
                config={config}
                currentLang={currentLang}
                onBookAnother={() => setActiveETicket(null)}
              />
            ) : (
              <>
                <HeroBanner
                  currentLang={currentLang}
                  prices={config.prices}
                  onBookNowClick={scrollToBooking}
                />
                <BookingForm
                  currentLang={currentLang}
                  prices={config.prices}
                  onProceedToPayment={handleProceedToPayment}
                />
              </>
            )}
          </div>
        ) : (
          <CheckTicketView
            currentLang={currentLang}
            onSelectBooking={(booking) => {
              setActiveETicket(booking);
              setActiveVisitorTab('book');
            }}
          />
        )}
      </main>

      {/* Direct Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        bookingDraft={bookingDraft}
        config={config}
        currentLang={currentLang}
        onPaymentCompleted={handlePaymentCompleted}
      />

      <Footer config={config} />
    </div>
  );
}
