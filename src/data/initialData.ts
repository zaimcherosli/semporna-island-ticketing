import type { Booking, IslandConfig, ScanLog } from '../types/ticket';

export const initialIslandConfig: IslandConfig = {
  islandName: "Pulau Semporna Sabah",
  islandSubtext: "Kawasan Pemuliharaan & Eko-Pelancongan Marin Semporna",
  location: "Semporna, Sabah, Malaysia",
  duitnowAccountName: "SEMPORNA ISLAND ECO VENTURES",
  duitnowAccountNumber: "109823481239",
  bankName: "Maybank Islamic Berhad",
  bankAccountNumber: "5601-2093-8821",
  bankHolderName: "SEMPORNA ISLAND ECO VENTURES",
  prices: {
    malaysianAdult: 20,
    malaysianChild: 10,
    internationalAdult: 25,
    internationalChild: 15
  },
  supportPhone: "+60 19-892 3411",
  supportEmail: "info@sempornaislandpass.my",
  staffPin: "1234"
};

const todayStr = new Date().toISOString().split('T')[0];

export const initialBookings: Booking[] = [
  {
    id: "SMP-2026-8801",
    visitDate: todayStr,
    buyerName: "Kim Min-jun",
    buyerEmail: "minjun.kim@seoulmail.kr",
    buyerPhone: "+82 10-5542-9981",
    buyerIdPassport: "M89210924",
    buyerCountry: "South Korea",
    pax: {
      malaysianAdult: 0,
      malaysianChild: 0,
      internationalAdult: 2,
      internationalChild: 1
    },
    totalPax: 3,
    totalPrice: 65, // 2*25 + 1*15
    paymentMethod: "DUITNOW_QR",
    paymentStatus: "PAID",
    paymentRef: "DN-8801-992",
    paymentTime: new Date(Date.now() - 3600000 * 2).toISOString(),
    ticketQrPayload: JSON.stringify({
      bookingId: "SMP-2026-8801",
      guest: "Kim Min-jun",
      totalPax: 3,
      date: todayStr,
      hash: "sig_8801_korea"
    }),
    checkInStatus: "CHECKED_IN",
    checkedInAt: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    checkedInBy: "Staf Jeti 1 (Roslan)",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: "SMP-2026-8802",
    visitDate: todayStr,
    buyerName: "Ahmad Farhan bin Zulkifli",
    buyerEmail: "farhan.zul@gmail.com",
    buyerPhone: "+60 13-882 1920",
    buyerIdPassport: "920415-12-5891",
    buyerCountry: "Malaysia",
    pax: {
      malaysianAdult: 2,
      malaysianChild: 2,
      internationalAdult: 0,
      internationalChild: 0
    },
    totalPax: 4,
    totalPrice: 60, // 2*20 + 2*10
    paymentMethod: "ONLINE_BANKING",
    paymentStatus: "PAID",
    paymentRef: "MBB-9912048",
    paymentTime: new Date(Date.now() - 3600000 * 4).toISOString(),
    ticketQrPayload: JSON.stringify({
      bookingId: "SMP-2026-8802",
      guest: "Ahmad Farhan bin Zulkifli",
      totalPax: 4,
      date: todayStr,
      hash: "sig_8802_malaysia"
    }),
    checkInStatus: "NOT_CHECKED_IN",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: "SMP-2026-8803",
    visitDate: todayStr,
    buyerName: "Kenji Sato",
    buyerEmail: "sato.kenji@tokyotravel.jp",
    buyerPhone: "+81 90-8812-4411",
    buyerIdPassport: "TK9981240",
    buyerCountry: "Japan",
    pax: {
      malaysianAdult: 0,
      malaysianChild: 0,
      internationalAdult: 2,
      internationalChild: 0
    },
    totalPax: 2,
    totalPrice: 50, // 2*25
    paymentMethod: "DUITNOW_QR",
    paymentStatus: "PAID",
    paymentRef: "DN-8803-128",
    paymentTime: new Date(Date.now() - 3600000 * 5).toISOString(),
    ticketQrPayload: JSON.stringify({
      bookingId: "SMP-2026-8803",
      guest: "Kenji Sato",
      totalPax: 2,
      date: todayStr,
      hash: "sig_8803_japan"
    }),
    checkInStatus: "NOT_CHECKED_IN",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: "SMP-2026-8804",
    visitDate: todayStr,
    buyerName: "Li Wei & Wang Fang",
    buyerEmail: "liwei.travel@qq.com",
    buyerPhone: "+86 138-1234-5678",
    buyerIdPassport: "E98120491",
    buyerCountry: "China",
    pax: {
      malaysianAdult: 0,
      malaysianChild: 0,
      internationalAdult: 4,
      internationalChild: 0
    },
    totalPax: 4,
    totalPrice: 100, // 4*25
    paymentMethod: "DUITNOW_QR",
    paymentStatus: "PAID",
    paymentRef: "DN-8804-998",
    paymentTime: new Date(Date.now() - 3600000 * 6).toISOString(),
    ticketQrPayload: JSON.stringify({
      bookingId: "SMP-2026-8804",
      guest: "Li Wei",
      totalPax: 4,
      date: todayStr,
      hash: "sig_8804_china"
    }),
    checkInStatus: "NOT_CHECKED_IN",
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString()
  }
];

export const initialScanLogs: ScanLog[] = [
  {
    id: "LOG-001",
    bookingId: "SMP-2026-8801",
    timestamp: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    guestName: "Kim Min-jun",
    paxTotal: 3,
    status: "SUCCESS",
    staffName: "Staf Jeti 1 (Roslan)",
    notes: "2 Dewasa (Korea), 1 Kanak-kanak"
  }
];
