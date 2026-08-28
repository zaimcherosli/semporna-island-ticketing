import type { Booking, IslandConfig, ScanLog } from '../types/ticket';
import { initialBookings, initialIslandConfig, initialScanLogs } from '../data/initialData';

const BOOKINGS_KEY = 'semporna_island_bookings';
const CONFIG_KEY = 'semporna_island_config';
const SCAN_LOGS_KEY = 'semporna_island_scan_logs';

export const storageService = {
  // Config
  getConfig: (): IslandConfig => {
    try {
      const data = localStorage.getItem(CONFIG_KEY);
      return data ? JSON.parse(data) : initialIslandConfig;
    } catch {
      return initialIslandConfig;
    }
  },
  
  saveConfig: (config: IslandConfig): void => {
    try {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    } catch (e) {
      console.error("Failed to save island config", e);
    }
  },

  // Bookings
  getBookings: (): Booking[] => {
    try {
      const data = localStorage.getItem(BOOKINGS_KEY);
      if (!data) {
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(initialBookings));
        return initialBookings;
      }
      return JSON.parse(data);
    } catch {
      return initialBookings;
    }
  },

  getBookingById: (id: string): Booking | undefined => {
    const bookings = storageService.getBookings();
    const cleanId = id.trim().toUpperCase();
    return bookings.find(b => b.id.toUpperCase() === cleanId);
  },

  saveBooking: (booking: Booking): void => {
    try {
      const bookings = storageService.getBookings();
      const existingIdx = bookings.findIndex(b => b.id === booking.id);
      if (existingIdx >= 0) {
        bookings[existingIdx] = booking;
      } else {
        bookings.unshift(booking);
      }
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    } catch (e) {
      console.error("Failed to save booking", e);
    }
  },

  checkInBooking: (bookingId: string, staffName: string = 'Staf Jeti Bertugas'): { success: boolean; message: string; booking?: Booking } => {
    const bookings = storageService.getBookings();
    const booking = bookings.find(b => b.id.toUpperCase() === bookingId.trim().toUpperCase());
    
    if (!booking) {
      return { success: false, message: 'BOOKING_NOT_FOUND' };
    }

    if (booking.checkInStatus === 'CHECKED_IN') {
      return { success: false, message: 'ALREADY_CHECKED_IN', booking };
    }

    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    booking.checkInStatus = 'CHECKED_IN';
    booking.checkedInAt = nowStr;
    booking.checkedInBy = staffName;

    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));

    // Log the scan
    storageService.addScanLog({
      id: `LOG-${Date.now().toString().slice(-4)}`,
      bookingId: booking.id,
      timestamp: nowStr,
      guestName: booking.buyerName,
      paxTotal: booking.totalPax,
      status: 'SUCCESS',
      staffName,
      notes: `${booking.pax.malaysianAdult + booking.pax.internationalAdult} Dewasa, ${booking.pax.malaysianChild + booking.pax.internationalChild} Kanak-kanak`
    });

    return { success: true, message: 'SUCCESS', booking };
  },

  // Scan Logs
  getScanLogs: (): ScanLog[] => {
    try {
      const data = localStorage.getItem(SCAN_LOGS_KEY);
      if (!data) {
        localStorage.setItem(SCAN_LOGS_KEY, JSON.stringify(initialScanLogs));
        return initialScanLogs;
      }
      return JSON.parse(data);
    } catch {
      return initialScanLogs;
    }
  },

  addScanLog: (log: ScanLog): void => {
    try {
      const logs = storageService.getScanLogs();
      logs.unshift(log);
      localStorage.setItem(SCAN_LOGS_KEY, JSON.stringify(logs.slice(0, 100))); // Keep recent 100
    } catch (e) {
      console.error("Failed to add scan log", e);
    }
  },

  resetToDefault: (): void => {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(initialBookings));
    localStorage.setItem(CONFIG_KEY, JSON.stringify(initialIslandConfig));
    localStorage.setItem(SCAN_LOGS_KEY, JSON.stringify(initialScanLogs));
  }
};
