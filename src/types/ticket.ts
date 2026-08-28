export type Language = 'ms' | 'en' | 'zh' | 'ja' | 'ko';

export interface TicketPricing {
  malaysianAdult: number;
  malaysianChild: number;
  internationalAdult: number;
  internationalChild: number;
}

export interface PaxCount {
  malaysianAdult: number;
  malaysianChild: number;
  internationalAdult: number;
  internationalChild: number;
}

export interface Booking {
  id: string; // e.g. SMP-2026-9281
  visitDate: string; // YYYY-MM-DD
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  buyerIdPassport: string;
  buyerCountry: string;
  pax: PaxCount;
  totalPax: number;
  totalPrice: number;
  paymentMethod: 'DUITNOW_QR' | 'ONLINE_BANKING';
  paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED';
  paymentRef: string;
  paymentTime: string;
  ticketQrPayload: string;
  checkInStatus: 'NOT_CHECKED_IN' | 'CHECKED_IN';
  checkedInAt?: string;
  checkedInBy?: string;
  createdAt: string;
  notes?: string;
}

export interface IslandConfig {
  islandName: string;
  islandSubtext: string;
  location: string;
  duitnowAccountName: string;
  duitnowAccountNumber: string;
  duitnowQrImageUrl?: string;
  bankName: string;
  bankAccountNumber: string;
  bankHolderName: string;
  prices: TicketPricing;
  supportPhone: string;
  supportEmail: string;
  staffPin: string;
}

export interface ScanLog {
  id: string;
  bookingId: string;
  timestamp: string;
  guestName: string;
  paxTotal: number;
  status: 'SUCCESS' | 'ALREADY_USED' | 'INVALID' | 'DATE_MISMATCH';
  staffName: string;
  notes?: string;
}
