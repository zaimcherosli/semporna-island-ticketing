import type { Language } from '../types/ticket';

export interface TranslationDict {
  islandTitle: string;
  islandSubtitle: string;
  tagline: string;
  badgeOfficial: string;
  
  // Navigation
  navBook: string;
  navCheckTicket: string;
  navStaffGate: string;
  navAdmin: string;
  
  // Booking Form
  bookingTitle: string;
  bookingSubtitle: string;
  stepDate: string;
  stepTickets: string;
  stepDetails: string;
  stepPayment: string;
  selectVisitDate: string;
  visitDateHint: string;
  
  // Ticket Categories
  malaysianAdultTitle: string;
  malaysianAdultDesc: string;
  malaysianChildTitle: string;
  malaysianChildDesc: string;
  intlAdultTitle: string;
  intlAdultDesc: string;
  intlChildTitle: string;
  intlChildDesc: string;
  
  pricePerPax: string;
  paxLabel: string;
  totalTickets: string;
  totalAmount: string;
  orderSummary: string;
  
  // Lead Guest Details Form
  guestInfoTitle: string;
  fullName: string;
  fullNamePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  idPassport: string;
  idPassportPlaceholder: string;
  country: string;
  btnProceedToPay: string;
  
  // Payment
  paymentTitle: string;
  paymentSubtitle: string;
  payWithDuitnow: string;
  payWithBankTransfer: string;
  duitnowScanPrompt: string;
  bankDetailsPrompt: string;
  accHolder: string;
  accNumber: string;
  bankNameLabel: string;
  refLabel: string;
  paymentInstructions: string[];
  btnConfirmPayment: string;
  btnCancel: string;
  paymentProcessing: string;
  paymentSuccessToast: string;
  
  // E-Ticket
  ticketIssuedTitle: string;
  ticketIssuedSubtitle: string;
  ticketPassBadge: string;
  bookingRef: string;
  qrCodeScanInstruction: string;
  downloadPdf: string;
  saveImage: string;
  shareWhatsApp: string;
  printTicket: string;
  bookAnother: string;
  validOnDate: string;
  presentAtGate: string;
  
  // Staff Gate Scanner
  staffGateTitle: string;
  staffGateSubtitle: string;
  enterPinPrompt: string;
  pinPlaceholder: string;
  btnLoginStaff: string;
  liveScanner: string;
  manualLookup: string;
  cameraAccessPrompt: string;
  startCamera: string;
  stopCamera: string;
  scanQrPrompt: string;
  lookupBookingBtn: string;
  
  // Verification Results
  ticketValidTitle: string;
  ticketValidDesc: string;
  btnConfirmEntry: string;
  entryConfirmedSuccess: string;
  ticketUsedTitle: string;
  ticketUsedDesc: string;
  ticketInvalidTitle: string;
  ticketInvalidDesc: string;
  dateMismatchTitle: string;
  dateMismatchDesc: string;
  checkedInAtLabel: string;
  
  // Admin & General
  adminTitle: string;
  totalRevenue: string;
  totalVisitors: string;
  checkedInToday: string;
  malaysianPax: string;
  intlPax: string;
  recentBookings: string;
  searchPlaceholder: string;
  exportCsv: string;
  statusPaid: string;
  statusCheckedIn: string;
  statusPending: string;
  statusNotCheckedIn: string;
}

export const translations: Record<Language, TranslationDict> = {
  ms: {
    islandTitle: "Pulau Semporna Sabah",
    islandSubtitle: "Sistem E-Tiket Rasmi & Pas Masuk Pulau",
    tagline: "Nikmati Keindahan Pulau Tropika Semporna, Sabah",
    badgeOfficial: "Sistem Rasmi Pas Masuk Pelancong",
    
    navBook: "Tempah Tiket",
    navCheckTicket: "Semak Tiket",
    navStaffGate: "Pengimbas Staf Jeti",
    navAdmin: "Dashboard Pengurusan",
    
    bookingTitle: "Tempahan Pas Masuk Pulau",
    bookingSubtitle: "Pilih tarikh lawatan dan kategori tiket pelancong untuk mendapatkan Pas Kod QR segera.",
    stepDate: "1. Tarikh Lawatan",
    stepTickets: "2. Kategori & Bilangan Tiket",
    stepDetails: "3. Maklumat Pelawat",
    stepPayment: "4. Pembayaran Mudah",
    selectVisitDate: "Pilih Tarikh Lawatan",
    visitDateHint: "Tiket sah untuk tarikh yang dipilih sahaja.",
    
    malaysianAdultTitle: "Dewasa Malaysia (MyKad)",
    malaysianAdultDesc: "Warganegara Malaysia berumur 13 tahun ke atas",
    malaysianChildTitle: "Kanak-kanak Malaysia (MyKid)",
    malaysianChildDesc: "Warganegara Malaysia berumur 12 tahun ke bawah",
    intlAdultTitle: "Dewasa Luar Negara (International)",
    intlAdultDesc: "Pelancong antarabangsa berumur 13 tahun ke atas",
    intlChildTitle: "Kanak-kanak Luar Negara (International Child)",
    intlChildDesc: "Pelancong antarabangsa berumur 12 tahun ke bawah",
    
    pricePerPax: "RM / org",
    paxLabel: "Orang",
    totalTickets: "Jumlah Tiket",
    totalAmount: "Jumlah Bayaran",
    orderSummary: "Ringkasan Tempahan",
    
    guestInfoTitle: "Maklumat Ketua Pelawat",
    fullName: "Nama Penuh (seperti IC / Pasport)",
    fullNamePlaceholder: "cth. Muhammad Hafiz / John Smith",
    email: "Alamat Emel",
    emailPlaceholder: "cth. nama@email.com",
    phone: "Nombor Telefon / WhatsApp",
    phonePlaceholder: "cth. +60123456789",
    idPassport: "No. Kad Pengenalan / No. Pasport",
    idPassportPlaceholder: "cth. 950812-12-5555 / A12345678",
    country: "Negara Asal",
    btnProceedToPay: "Teruskan ke Pembayaran (RM",
    
    paymentTitle: "Pembayaran Terus (DuitNow QR / Bank)",
    paymentSubtitle: "Sila buat pembayaran tepat ke akaun rasmi pengurusan pulau di bawah.",
    payWithDuitnow: "DuitNow QR Rasmi (Semua Bank / E-Wallet)",
    payWithBankTransfer: "Pindahan Bank Dalam Talian (Online Banking)",
    duitnowScanPrompt: "Imbas Kod QR DuitNow ini menggunakan sebarang aplikasi Perbankan atau E-Wallet (Maybank, CIMB, TNG eWallet, GrabPay, dll.):",
    bankDetailsPrompt: "Maklumat Akaun Bank Rasmi:",
    accHolder: "Penama Akaun",
    accNumber: "Nombor Akaun",
    bankNameLabel: "Nama Bank",
    refLabel: "Rujukan Bayaran",
    paymentInstructions: [
      "1. Imbas DuitNow QR atau pindahkan jumlah tepat ke akaun di atas.",
      "2. Masukkan No. Rujukan Tempahan sebagai rujukan bayaran.",
      "3. Klik butang 'Saya Sudah Buat Bayaran' untuk jana E-Tiket berserta QR serta-merta."
    ],
    btnConfirmPayment: "Saya Sudah Buat Bayaran (Jana E-Tiket Sekarang)",
    btnCancel: "Kembali",
    paymentProcessing: "Mengesahkan bayaran & menjana Pas QR...",
    paymentSuccessToast: "Bayaran berjaya disahkan! Pas E-Tiket anda telah sedia.",
    
    ticketIssuedTitle: "E-Tiket & Pas Masuk Rasmi",
    ticketIssuedSubtitle: "Sila simpan atau tangkap layar (screenshot) kod QR ini dan tunjukkan kepada staf bertugas di jeti / pulau.",
    ticketPassBadge: "PAS KEMASUKAN PULAU RASMI",
    bookingRef: "No. Tempahan",
    qrCodeScanInstruction: "Tunjukkan Kod QR ini kepada staf jeti semasa mendaftar masuk.",
    downloadPdf: "Muat Turun E-Tiket (PDF)",
    saveImage: "Simpan Gambar",
    shareWhatsApp: "Hantar ke WhatsApp",
    printTicket: "Cetak Pas",
    bookAnother: "Tempah Tiket Lain",
    validOnDate: "Sah Pada Tarikh",
    presentAtGate: "Wajib tunjukkan pas ini semasa menaiki bot & tiba di pulau.",
    
    staffGateTitle: "Portal Pengimbas Staf Jeti",
    staffGateSubtitle: "Sistem Imbasan Kod QR Kemasukan Pelancong Semporna",
    enterPinPrompt: "Masukkan PIN Keselamatan Staf",
    pinPlaceholder: "Masukkan 4-digit PIN",
    btnLoginStaff: "Buka Pengimbas",
    liveScanner: "Kamera QR",
    manualLookup: "Carian Manual",
    cameraAccessPrompt: "Sila benarkan akses kamera untuk mengimbas kod QR pelancong.",

    startCamera: "Hidupkan Kamera Pengimbas",
    stopCamera: "Matikan Kamera",
    scanQrPrompt: "Halakan kamera ke arah Kod QR pada telefon pelancong",
    lookupBookingBtn: "Semak Tempahan",
    
    ticketValidTitle: "TIKET SAH & DIBAYAR",
    ticketValidDesc: "Semua maklumat tempahan sepadan dan belum didaftar masuk.",
    btnConfirmEntry: "Sahkan Kemasukan Pelawat (Check-In)",
    entryConfirmedSuccess: "Kemasukan pelawat berjaya disahkan ke dalam pulau!",
    ticketUsedTitle: "AMARAN: TIKET TELAH DIGUNAKAN!",
    ticketUsedDesc: "Tiket ini telah pun didaftar masuk sebelum ini. Sila semak semula untuk mengelakkan penipuan.",
    ticketInvalidTitle: "TIKET TIDAK SAH!",
    ticketInvalidDesc: "Kod QR tidak dikenali atau tiada dalam rekod sistem tempahan rasmi pulau.",
    dateMismatchTitle: "PERHATIAN: TARIKH LAWATAN TIDAK SAMA",
    dateMismatchDesc: "Tarikh pada tiket ini tidak sepadan dengan tarikh hari ini.",
    checkedInAtLabel: "Telah didaftar masuk pada",
    
    adminTitle: "Dashboard Pengurusan Pemilik Pulau",
    totalRevenue: "Jumlah Kutipan Hasil",
    totalVisitors: "Jumlah Keseluruhan Pelancong",
    checkedInToday: "Pelancong Masuk Hari Ini",
    malaysianPax: "Pelancong Malaysia",
    intlPax: "Pelancong Luar Negara",
    recentBookings: "Senarai Tempahan Pelancong",
    searchPlaceholder: "Cari mengikut No. Tempahan, Nama, atau Telefon...",
    exportCsv: "Eksport ke CSV / Excel",
    statusPaid: "Dibayar",
    statusCheckedIn: "Selesai Masuk",
    statusPending: "Belum Bayar",
    statusNotCheckedIn: "Belum Masuk"
  },
  
  en: {
    islandTitle: "Semporna Sabah Island",
    islandSubtitle: "Official Island E-Ticket & Entry Pass System",
    tagline: "Experience the Pristine Paradise of Semporna, Sabah",
    badgeOfficial: "Official Tourist Entry Pass System",
    
    navBook: "Book Ticket",
    navCheckTicket: "Find My Ticket",
    navStaffGate: "Staff Gate Scanner",
    navAdmin: "Management Dashboard",
    
    bookingTitle: "Island Entry Pass Booking",
    bookingSubtitle: "Select your visit date and ticket categories to receive your instant verified QR entry pass.",
    stepDate: "1. Visit Date",
    stepTickets: "2. Ticket Categories & Pax",
    stepDetails: "3. Lead Guest Details",
    stepPayment: "4. Direct Payment",
    selectVisitDate: "Select Visit Date",
    visitDateHint: "Ticket is strictly valid for the selected date only.",
    
    malaysianAdultTitle: "Malaysian Adult (MyKad)",
    malaysianAdultDesc: "Malaysian citizens aged 13 years and above",
    malaysianChildTitle: "Malaysian Child (MyKid)",
    malaysianChildDesc: "Malaysian citizens aged 12 years and below",
    intlAdultTitle: "International Adult",
    intlAdultDesc: "Foreign visitors aged 13 years and above",
    intlChildTitle: "International Child",
    intlChildDesc: "Foreign visitors aged 12 years and below",
    
    pricePerPax: "RM / pax",
    paxLabel: "Pax",
    totalTickets: "Total Tickets",
    totalAmount: "Total Amount",
    orderSummary: "Order Summary",
    
    guestInfoTitle: "Lead Guest Information",
    fullName: "Full Name (as in IC / Passport)",
    fullNamePlaceholder: "e.g. John Smith / Tan Ah Kow",
    email: "Email Address",
    emailPlaceholder: "e.g. name@example.com",
    phone: "Phone / WhatsApp Number",
    phonePlaceholder: "e.g. +60123456789 / +1234567890",
    idPassport: "IC / Passport Number",
    idPassportPlaceholder: "e.g. E12345678",
    country: "Country of Residence",
    btnProceedToPay: "Proceed to Payment (RM",
    
    paymentTitle: "Direct Instant Payment (DuitNow QR / Bank)",
    paymentSubtitle: "Please transfer the exact amount directly to the official island management account.",
    payWithDuitnow: "Official DuitNow QR (All Banks & E-Wallets)",
    payWithBankTransfer: "Online Banking Bank Transfer",
    duitnowScanPrompt: "Scan this DuitNow QR using any banking app or e-wallet (Touch 'n Go, GrabPay, Maybank, etc.):",
    bankDetailsPrompt: "Official Bank Account Details:",
    accHolder: "Account Holder",
    accNumber: "Account Number",
    bankNameLabel: "Bank Name",
    refLabel: "Payment Reference",
    paymentInstructions: [
      "1. Scan DuitNow QR or transfer the exact total to the bank account above.",
      "2. Include your Booking Reference in the payment remark.",
      "3. Click 'I Have Made Payment' to generate your official E-Ticket immediately."
    ],
    btnConfirmPayment: "I Have Made Payment (Generate E-Ticket Now)",
    btnCancel: "Go Back",
    paymentProcessing: "Verifying payment & generating QR Entry Pass...",
    paymentSuccessToast: "Payment verified successfully! Your digital E-Ticket is ready.",
    
    ticketIssuedTitle: "Official Digital Entry Pass",
    ticketIssuedSubtitle: "Please save or screenshot this QR code and present it to our jetty & island staff upon arrival.",
    ticketPassBadge: "OFFICIAL ISLAND ENTRY PASS",
    bookingRef: "Booking Reference",
    qrCodeScanInstruction: "Present this QR code to island gate staff during boarding / arrival.",
    downloadPdf: "Download E-Ticket (PDF)",
    saveImage: "Save Pass Image",
    shareWhatsApp: "Share to WhatsApp",
    printTicket: "Print Pass",
    bookAnother: "Book Another Ticket",
    validOnDate: "Valid on Date",
    presentAtGate: "Must be presented at jetty gate and island checkpoint.",
    
    staffGateTitle: "Staff Jetty Gate Scanner",
    staffGateSubtitle: "Semporna Island Visitor QR Verification System",
    enterPinPrompt: "Enter Staff Security PIN",
    pinPlaceholder: "Enter 4-digit PIN",
    btnLoginStaff: "Open Scanner",
    liveScanner: "Camera QR",
    manualLookup: "Manual Search",
    cameraAccessPrompt: "Please grant camera permission to scan visitor QR codes.",

    startCamera: "Start Scanner Camera",
    stopCamera: "Stop Camera",
    scanQrPrompt: "Point camera at the QR code on the visitor's smartphone",
    lookupBookingBtn: "Lookup Booking",
    
    ticketValidTitle: "TICKET VALID & PAID",
    ticketValidDesc: "All booking information matches and visitor has not checked in yet.",
    btnConfirmEntry: "Confirm Visitor Entry (Check-In)",
    entryConfirmedSuccess: "Visitor entry successfully confirmed into the island!",
    ticketUsedTitle: "WARNING: TICKET ALREADY USED!",
    ticketUsedDesc: "This ticket has already been checked in earlier. Please verify to prevent duplicate entry.",
    ticketInvalidTitle: "INVALID TICKET!",
    ticketInvalidDesc: "QR Code not recognized or not found in official island booking database.",
    dateMismatchTitle: "NOTICE: DATE MISMATCH",
    dateMismatchDesc: "The visit date on this ticket does not match today's date.",
    checkedInAtLabel: "Already checked in at",
    
    adminTitle: "Island Owner & Management Dashboard",
    totalRevenue: "Total Revenue Collected",
    totalVisitors: "Total Tourist Visitors",
    checkedInToday: "Checked In Today",
    malaysianPax: "Malaysian Visitors",
    intlPax: "International Visitors",
    recentBookings: "Recent Tourist Bookings",
    searchPlaceholder: "Search by Booking Ref, Name, or Phone...",
    exportCsv: "Export to CSV / Excel",
    statusPaid: "Paid",
    statusCheckedIn: "Checked In",
    statusPending: "Pending",
    statusNotCheckedIn: "Not Checked In"
  },
  
  zh: {
    islandTitle: "马来西亚沙巴仙本那海岛",
    islandSubtitle: "海岛官方电子门票及登岛通行证系统",
    tagline: "领略沙巴仙本那绝美玻璃海与热带海岛风光",
    badgeOfficial: "官方游客登岛通行证系统",
    
    navBook: "在线预订",
    navCheckTicket: "查询门票",
    navStaffGate: "码头工作人员验票",
    navAdmin: "管理后台",
    
    bookingTitle: "仙本那海岛入场门票预订",
    bookingSubtitle: "选择登岛日期和游客类别，即刻获取官方验证二维码通行证。",
    stepDate: "1. 选择登岛日期",
    stepTickets: "2. 门票类别与人数",
    stepDetails: "3. 领队游客信息",
    stepPayment: "4. 便捷直接支付",
    selectVisitDate: "选择登岛日期",
    visitDateHint: "门票仅在选定日期当天有效。",
    
    malaysianAdultTitle: "马来西亚成人 (MyKad)",
    malaysianAdultDesc: "马来西亚公民（13岁及以上）",
    malaysianChildTitle: "马来西亚儿童 (MyKid)",
    malaysianChildDesc: "马来西亚公民（12岁及以下）",
    intlAdultTitle: "国际成人 (外国游客)",
    intlAdultDesc: "外国游客（13岁及以上）",
    intlChildTitle: "国际儿童 (外国儿童)",
    intlChildDesc: "外国游客（12岁及以下）",
    
    pricePerPax: "马币 / 人",
    paxLabel: "人",
    totalTickets: "门票总数",
    totalAmount: "应付总额",
    orderSummary: "订单明细",
    
    guestInfoTitle: "领队游客联系信息",
    fullName: "姓名全称（与身份证/护照一致）",
    fullNamePlaceholder: "例如：张三 / John Smith",
    email: "电子邮箱",
    emailPlaceholder: "例如：user@example.com",
    phone: "联系电话 / WhatsApp / 微信",
    phonePlaceholder: "例如：+86 13800000000 / +60123456789",
    idPassport: "护照号 / 身份证号",
    idPassportPlaceholder: "例如：G12345678 / 950812-12-5555",
    country: "国籍 / 国家",
    btnProceedToPay: "前往付款 (RM",
    
    paymentTitle: "直接付款 (DuitNow 二维码 / 银行转账)",
    paymentSubtitle: "请直接向海岛官方管理账户支付准确金额。",
    payWithDuitnow: "官方 DuitNow QR (支持各类电子钱包与银行App)",
    payWithBankTransfer: "网银转账 (Online Banking)",
    duitnowScanPrompt: "使用支持银联/电子钱包或马来西亚银行App扫描此二维码：",
    bankDetailsPrompt: "海岛官方银行账户信息：",
    accHolder: "开户名",
    accNumber: "银行账号",
    bankNameLabel: "开户银行",
    refLabel: "付款备注编号",
    paymentInstructions: [
      "1. 扫描二维码或转账至上方官方账户。",
      "2. 付款备注请填写预订编号。",
      "3. 点击下方【我已完成支付】即可立即生成电子门票二维码。"
    ],
    btnConfirmPayment: "我已完成支付（立即生成电子票）",
    btnCancel: "返回修改",
    paymentProcessing: "正在确认付款并生成入岛二维码通行证...",
    paymentSuccessToast: "支付确认成功！您的登岛电子门票已就绪。",
    
    ticketIssuedTitle: "官方登岛电子门票通行证",
    ticketIssuedSubtitle: "请保存或截图此二维码，在仙本那码头及登岛检票处出示给工作人员。",
    ticketPassBadge: "仙本那海岛官方入场通行证",
    bookingRef: "预订参考编号",
    qrCodeScanInstruction: "登船及抵达海岛时请向工作人员出示此二维码",
    downloadPdf: "下载 PDF 电子票",
    saveImage: "保存门票图片",
    shareWhatsApp: "分享至 WhatsApp",
    printTicket: "打印门票",
    bookAnother: "预订其他日期",
    validOnDate: "有效登岛日期",
    presentAtGate: "乘船与登岛必须出示此电子通行证。",
    
    staffGateTitle: "码头工作人员检票通道",
    staffGateSubtitle: "仙本那海岛游客二维码快速验证系统",
    enterPinPrompt: "输入工作人员安全PIN码",
    pinPlaceholder: "输入4位PIN码",
    btnLoginStaff: "开启检票系统",
    liveScanner: "摄像头实时扫码",
    manualLookup: "手动输入编号核验",
    cameraAccessPrompt: "请允许相机权限以扫描游客门票二维码。",
    startCamera: "开启验票摄像头",
    stopCamera: "关闭摄像头",
    scanQrPrompt: "将摄像头对准游客手机上的二维码",
    lookupBookingBtn: "核验订单",
    
    ticketValidTitle: "门票有效且已付款",
    ticketValidDesc: "订单信息匹配，且该游客团队尚未登岛核验。",
    btnConfirmEntry: "确认登岛入场 (Check-In)",
    entryConfirmedSuccess: "已成功确认游客登岛！",
    ticketUsedTitle: "警告：该门票已被使用！",
    ticketUsedDesc: "该二维码门票此前已完成登岛核验，请核实以防重复进入。",
    ticketInvalidTitle: "无效门票！",
    ticketInvalidDesc: "未在仙本那官方数据库中查找到此门票记录。",
    dateMismatchTitle: "提示：登岛日期不符",
    dateMismatchDesc: "门票上的预约日期与今日日期不一致。",
    checkedInAtLabel: "已于此时间核销登岛：",
    
    adminTitle: "仙本那海岛管理与数据统计后台",
    totalRevenue: "累计门票总收入",
    totalVisitors: "累计登岛游客总数",
    checkedInToday: "今日已入岛人数",
    malaysianPax: "马来西亚本国游客",
    intlPax: "国际外国游客",
    recentBookings: "最新游客预订记录",
    searchPlaceholder: "按预订号、姓名或电话搜索...",
    exportCsv: "导出 Excel / CSV 报表",
    statusPaid: "已付款",
    statusCheckedIn: "已登岛",
    statusPending: "待付款",
    statusNotCheckedIn: "未核销"
  },
  
  ja: {
    islandTitle: "センポルナ サバ島",
    islandSubtitle: "公式アイランド Eチケット＆入場パスシステム",
    tagline: "息を呑むほど美しいセンポルナの海へようこそ",
    badgeOfficial: "公式観光客入場管理システム",
    
    navBook: "チケット予約",
    navCheckTicket: "チケット確認",
    navStaffGate: "スタッフ用QRスキャナー",
    navAdmin: "管理ダッシュボード",
    
    bookingTitle: "島入場パスの予約",
    bookingSubtitle: "訪問日とチケット種別を選択して、即座にQR入場パスを発行します。",
    stepDate: "1. 訪問日の選択",
    stepTickets: "2. チケット種別と人数",
    stepDetails: "3. 代表者情報",
    stepPayment: "4. お支払い",
    selectVisitDate: "訪問日を選択",
    visitDateHint: "チケットは指定された訪問日のみ有効です。",
    
    malaysianAdultTitle: "マレーシア国民（大人）",
    malaysianAdultDesc: "13歳以上のマレーシア国民",
    malaysianChildTitle: "マレーシア国民（子供）",
    malaysianChildDesc: "12歳以下のマレーシア国民",
    intlAdultTitle: "一般・外国人（大人）",
    intlAdultDesc: "13歳以上の外国人観光客",
    intlChildTitle: "一般・外国人（子供）",
    intlChildDesc: "12歳以下の外国人観光客",
    
    pricePerPax: "RM / 人",
    paxLabel: "名",
    totalTickets: "合計チケット数",
    totalAmount: "お支払い合計",
    orderSummary: "予約内容の確認",
    
    guestInfoTitle: "代表者情報",
    fullName: "お名前（パスポート表記）",
    fullNamePlaceholder: "例: Taro Yamada",
    email: "メールアドレス",
    emailPlaceholder: "例: name@example.com",
    phone: "電話番号 / WhatsApp",
    phonePlaceholder: "例: +81 90 1234 5678",
    idPassport: "パスポート番号",
    idPassportPlaceholder: "例: TK1234567",
    country: "国籍・居住国",
    btnProceedToPay: "お支払いへ進む (RM",
    
    paymentTitle: "直接決済 (DuitNow QR / 銀行振込)",
    paymentSubtitle: "公式管理口座へ指定の金額を直接お支払いください。",
    payWithDuitnow: "公式 DuitNow QRコード決済",
    payWithBankTransfer: "オンライン銀行振込",
    duitnowScanPrompt: "対応する決済アプリでこのQRコードをスキャンしてください：",
    bankDetailsPrompt: "公式銀行口座情報：",
    accHolder: "口座名義",
    accNumber: "口座番号",
    bankNameLabel: "銀行名",
    refLabel: "決済参照番号",
    paymentInstructions: [
      "1. QRコードをスキャンするか、上記口座へ合計金額をお振込みください。",
      "2. 振込備考に予約参照番号を入力してください。",
      "3. 「支払いを完了しました」を押すと即座にQRチケットが発行されます。"
    ],
    btnConfirmPayment: "支払いを完了しました（チケットを発行）",
    btnCancel: "戻る",
    paymentProcessing: "お支払いを確認し、QRパスを生成中...",
    paymentSuccessToast: "お支払いが確認されました！デジタルEチケットが準備できました。",
    
    ticketIssuedTitle: "公式デジタル入場パス",
    ticketIssuedSubtitle: "このQRコードを保存またはスクリーンショットし、桟橋および島内のスタッフにご提示ください。",
    ticketPassBadge: "センポルナ島 公式入場パス",
    bookingRef: "予約参照番号",
    qrCodeScanInstruction: "乗船時および島到着時にこのQRコードを提示してください",
    downloadPdf: "PDFチケットをダウンロード",
    saveImage: "画像を保存",
    shareWhatsApp: "WhatsAppで共有",
    printTicket: "チケットを印刷",
    bookAnother: "別のチケットを予約",
    validOnDate: "有効日",
    presentAtGate: "ボート乗船時および島内ゲートで提示が必要です。",
    
    staffGateTitle: "桟橋ゲート スタッフ専用スキャナー",
    staffGateSubtitle: "センポルナ島 QRコード認証システム",
    enterPinPrompt: "スタッフPINコードを入力",
    pinPlaceholder: "4桁のPINを入力",
    btnLoginStaff: "スキャナーを起動",
    liveScanner: "カメラスキャン",
    manualLookup: "予約番号の手動検索",
    cameraAccessPrompt: "QRコードをスキャンするためにカメラの利用を許可してください。",
    startCamera: "カメラを起動する",
    stopCamera: "カメラを停止する",
    scanQrPrompt: "観光客のスマートフォンに表示されたQRコードに向けてください",
    lookupBookingBtn: "予約を検索",
    
    ticketValidTitle: "有効なチケット（支払い済）",
    ticketValidDesc: "予約情報は一致しており、まだ入場処理されていません。",
    btnConfirmEntry: "入場を確定する (Check-In)",
    entryConfirmedSuccess: "観光客の入場が正常に完了しました！",
    ticketUsedTitle: "警告：使用済みのチケットです！",
    ticketUsedDesc: "このチケットはすでにチェックイン済みです。重複入場にご注意ください。",
    ticketInvalidTitle: "無効なチケット！",
    ticketInvalidDesc: "このQRコードは公式データベースに登録されていません。",
    dateMismatchTitle: "注意：日付が異なります",
    dateMismatchDesc: "チケットの予約日が本日の日付と一致していません。",
    checkedInAtLabel: "チェックイン日時：",
    
    adminTitle: "島管理者ダッシュボード",
    totalRevenue: "総売上金額",
    totalVisitors: "総観光客数",
    checkedInToday: "本日の入場者数",
    malaysianPax: "マレーシア国内観光客",
    intlPax: "外国人観光客",
    recentBookings: "最近の予約一覧",
    searchPlaceholder: "予約番号・名前・電話番号で検索...",
    exportCsv: "CSV/Excelを出力",
    statusPaid: "支払済",
    statusCheckedIn: "入場済",
    statusPending: "保留中",
    statusNotCheckedIn: "未入場"
  },
  
  ko: {
    islandTitle: "셈포르나 사바 아일랜드",
    islandSubtitle: "공식 섬 입장 E-티켓 및 QR 패스 시스템",
    tagline: "에메랄드빛 바다가 펼쳐지는 셈포르나 섬으로 오세요",
    badgeOfficial: "공식 관광객 입장 패스 시스템",
    
    navBook: "티켓 예매",
    navCheckTicket: "티켓 조회",
    navStaffGate: "직원용 QR 스캐너",
    navAdmin: "관리자 대시보드",
    
    bookingTitle: "섬 입장 패스 온라인 예매",
    bookingSubtitle: "방문 날짜와 인원 구분을 선택하시면 즉시 인증 가능한 QR 입장권이 발급됩니다.",
    stepDate: "1. 방문 날짜 선택",
    stepTickets: "2. 티켓 구분 및 인원",
    stepDetails: "3. 대표 예약자 정보",
    stepPayment: "4. 간편 직접 결제",
    selectVisitDate: "방문 날짜 선택",
    visitDateHint: "티켓은 선택하신 방문 날짜 당일에만 유효합니다.",
    
    malaysianAdultTitle: "말레이시아 성인 (MyKad)",
    malaysianAdultDesc: "말레이시아 국적 13세 이상",
    malaysianChildTitle: "말레이시아 어린이 (MyKid)",
    malaysianChildDesc: "말레이시아 국적 12세 이하",
    intlAdultTitle: "외국인 성인 (International)",
    intlAdultDesc: "외국인 관광객 13세 이상",
    intlChildTitle: "외국인 어린이 (Child)",
    intlChildDesc: "외국인 관광객 12세 이하",
    
    pricePerPax: "RM / 명",
    paxLabel: "명",
    totalTickets: "총 티켓 수",
    totalAmount: "총 결제 금액",
    orderSummary: "예약 내역 확인",
    
    guestInfoTitle: "대표 예약자 정보",
    fullName: "성명 (여권 상 영문 성명)",
    fullNamePlaceholder: "예: Hong Gil Dong",
    email: "이메일 주소",
    emailPlaceholder: "예: name@example.com",
    phone: "연락처 / WhatsApp",
    phonePlaceholder: "예: +82 10 1234 5678",
    idPassport: "여권 번호",
    idPassportPlaceholder: "예: M12345678",
    country: "국적 / 거주 국가",
    btnProceedToPay: "결제 진행하기 (RM",
    
    paymentTitle: "직접 결제 (DuitNow QR / 계좌 이체)",
    paymentSubtitle: "섬 공식 관리 계좌로 정확한 금액을 직접 이체해 주세요.",
    payWithDuitnow: "공식 DuitNow QR 결제",
    payWithBankTransfer: "온라인 계좌 이체 (Bank Transfer)",
    duitnowScanPrompt: "지원되는 뱅킹 앱 또는 전자지갑으로 QR 코드를 스캔하세요:",
    bankDetailsPrompt: "공식 은행 계좌 정보:",
    accHolder: "예금주",
    accNumber: "계좌번호",
    bankNameLabel: "은행명",
    refLabel: "입금 참조 번호",
    paymentInstructions: [
      "1. QR 코드를 스캔하거나 위 계좌로 총 금액을 이체하세요.",
      "2. 입금자명 또는 메모에 예약 참조 번호를 기재해 주세요.",
      "3. '입금을 완료했습니다' 버튼을 클릭하면 즉시 QR E-티켓이 생성됩니다."
    ],
    btnConfirmPayment: "입금을 완료했습니다 (즉시 티켓 발급)",
    btnCancel: "뒤로 가기",
    paymentProcessing: "결제 확인 및 QR 입장 패스 생성 중...",
    paymentSuccessToast: "결제가 확인되었습니다! 디지털 E-티켓이 발급되었습니다.",
    
    ticketIssuedTitle: "공식 디지털 섬 입장 패스",
    ticketIssuedSubtitle: "이 QR 코드를 캡처하거나 저장하신 후, 제티 선착장 및 섬 도착 시 직원에게 제시해 주세요.",
    ticketPassBadge: "셈포르나 섬 공식 입장 패스",
    bookingRef: "예약 참조 번호",
    qrCodeScanInstruction: "보트 탑승 및 섬 입장 시 직원에게 이 QR 코드를 보여주세요.",
    downloadPdf: "PDF 티켓 다운로드",
    saveImage: "티켓 이미지 저장",
    shareWhatsApp: "WhatsApp으로 전송",
    printTicket: "티켓 인쇄",
    bookAnother: "추가 티켓 예매",
    validOnDate: "유효 방문일",
    presentAtGate: "보트 탑승 및 섬 게이트에서 필수 제시해야 합니다.",
    
    staffGateTitle: "선착장 직원 전용 QR 검표기",
    staffGateSubtitle: "셈포르나 섬 방문객 QR 인증 시스템",
    enterPinPrompt: "직원 보안 PIN 번호 입력",
    pinPlaceholder: "4자리 PIN 입력",
    btnLoginStaff: "스캐너 열기",
    liveScanner: "카메라 실시간 스캔",
    manualLookup: "예약 번호 수동 조회",
    cameraAccessPrompt: "QR 코드 스캔을 위해 카메라 접근 권한을 허용해 주세요.",
    startCamera: "스캐너 카메라 켜기",
    stopCamera: "카메라 끄기",
    scanQrPrompt: "관광객 스마트폰의 QR 코드를 카메라에 맞춰주세요",
    lookupBookingBtn: "예약 조회",
    
    ticketValidTitle: "티켓 유효 및 결제 완료",
    ticketValidDesc: "예약 정보가 일치하며 아직 입장하지 않은 정상 티켓입니다.",
    btnConfirmEntry: "입장 승인 및 체크인 (Check-In)",
    entryConfirmedSuccess: "관광객 섬 입장이 성공적으로 확인되었습니다!",
    ticketUsedTitle: "경고: 이미 사용된 티켓입니다!",
    ticketUsedDesc: "이 티켓은 이미 이전에 체크인 처리되었습니다. 중복 입장을 확인해 주세요.",
    ticketInvalidTitle: "유효하지 않은 티켓!",
    ticketInvalidDesc: "공식 시스템 데이터베이스에서 예약 내역을 찾을 수 없습니다.",
    dateMismatchTitle: "안내: 방문 날짜 불일치",
    dateMismatchDesc: "티켓에 기재된 방문 날짜가 오늘 날짜와 다릅니다.",
    checkedInAtLabel: "체크인 완료 시간:",
    
    adminTitle: "섬 소유자 및 관리자 대시보드",
    totalRevenue: "총 입장료 수익",
    totalVisitors: "총 누적 방문객 수",
    checkedInToday: "오늘 입장한 방문객",
    malaysianPax: "말레이시아 내국인",
    intlPax: "외국인 관광객",
    recentBookings: "최근 예약 목록",
    searchPlaceholder: "예약 번호, 이름 또는 연락처로 검색...",
    exportCsv: "CSV / Excel 다운로드",
    statusPaid: "결제 완료",
    statusCheckedIn: "입장 완료",
    statusPending: "대기 중",
    statusNotCheckedIn: "미입장"
  }
};
