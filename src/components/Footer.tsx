import React from 'react';
import type { IslandConfig } from '../types/ticket';

interface FooterProps {
  config: IslandConfig;
}

export const Footer: React.FC<FooterProps> = ({ config }) => {
  return (
    <footer className="border-t border-slate-200 bg-white mt-12 text-slate-600 text-xs text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Col 1: Island Info */}
          <div className="space-y-2">
            <span className="font-bold text-sm text-slate-900 block">{config.islandName}</span>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              {config.islandSubtext}. Sistem pas kemasukan digital rasmi bagi memelihara keindahan alam semula jadi dan mengawal kemasukan pelancong secara telus.
            </p>
          </div>

          {/* Col 2: Support */}
          <div className="space-y-2">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-700 block">
              Pusat Khidmat & Sokongan
            </span>
            <div className="space-y-1 text-[11px] text-slate-600">
              <div>Lokasi: {config.location}</div>
              <div>Telefon: {config.supportPhone}</div>
              <div>Emel: {config.supportEmail}</div>
            </div>
          </div>

          {/* Col 3: Direct Payment Notice */}
          <div className="space-y-2">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-700 block">
              Akaun DuitNow & Bank
            </span>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] space-y-0.5">
              <div className="text-slate-900 font-semibold">{config.duitnowAccountName}</div>
              <div className="text-slate-600">{config.bankName}: <span className="font-mono text-teal-800 font-bold">{config.bankAccountNumber}</span></div>
              <div className="text-[10px] text-teal-800 pt-0.5 font-medium">
                Pembayaran terus kepada pemilik pulau tanpa komisen pihak ketiga.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <div>© {new Date().getFullYear()} {config.islandName}. Hak cipta terpelihara.</div>
          <div>Pelancongan Pulau Semporna, Sabah</div>
        </div>
      </div>
    </footer>
  );
};
