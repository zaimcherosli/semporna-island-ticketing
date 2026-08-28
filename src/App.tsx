import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { Language, IslandConfig } from './types/ticket';
import { storageService } from './services/storageService';
import { VisitorPage } from './pages/VisitorPage';
import { StaffPage } from './pages/StaffPage';
import { AdminPage } from './pages/AdminPage';
import { DirectTicketPage } from './pages/DirectTicketPage';

export function App() {
  const [currentLang, setCurrentLang] = useState<Language>('ms');
  const [config, setConfig] = useState<IslandConfig>(storageService.getConfig());

  useEffect(() => {
    setConfig(storageService.getConfig());
  }, []);

  const handleConfigUpdated = (newConfig: IslandConfig) => {
    setConfig(newConfig);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* 1. PUBLIC VISITOR PORTAL (Pelancong) */}
        <Route
          path="/"
          element={
            <VisitorPage
              currentLang={currentLang}
              onLanguageChange={setCurrentLang}
              config={config}
            />
          }
        />

        {/* 2. STAFF SCANNER PORTAL (Staf Jeti) */}
        <Route
          path="/staff"
          element={
            <StaffPage
              currentLang={currentLang}
              onLanguageChange={setCurrentLang}
              config={config}
            />
          }
        />
        <Route path="/scan" element={<Navigate to="/staff" replace />} />

        {/* 3. OWNER / ADMIN DASHBOARD (Pemilik Pulau) */}
        <Route
          path="/admin"
          element={
            <AdminPage
              currentLang={currentLang}
              onLanguageChange={setCurrentLang}
              config={config}
              onConfigUpdated={handleConfigUpdated}
            />
          }
        />

        {/* 4. DIRECT E-TICKET VIEW (Pautan Tiket Langsung) */}
        <Route
          path="/ticket/:id"
          element={
            <DirectTicketPage
              currentLang={currentLang}
              onLanguageChange={setCurrentLang}
              config={config}
            />
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
