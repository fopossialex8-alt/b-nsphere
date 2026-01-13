
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { INITIAL_TERMS, CAMEROON_ALPHABET } from '../constants';
import AutocompleteSearch from '../components/AutocompleteSearch';
import { TermRecord } from '../types';
import { playCameroonianAudio } from '../services/geminiService';

const Lexique: React.FC = () => {
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const s = params.get('search');
    if (s) setSearch(s);
  }, [location.search]);

  const filtered = INITIAL_TERMS.filter(t => 
    t.termeFr.toLowerCase().includes(search.toLowerCase()) || 
    t.termeNgiem.toLowerCase().includes(search.toLowerCase()) ||
    t.domaineFr.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (term: TermRecord) => {
    setSearch(term.termeFr);
  };

  const handlePlayAudio = async (term: TermRecord) => {
    setPlayingId(term.id);
    await playCameroonianAudio(term.termeFr, term.termeNgiem);
    setPlayingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-12 pb-24 animate-fade-in px-3">
      <header className="text-center py-10 sm:py-20 bg-white rounded-[2.5rem] sm:rounded-[5rem] shadow-xl border-t-[10px] border-[#b08968]">
        <h2 className="text-3xl sm:text-7xl font-black font-trad text-[#2d1b0d] tracking-tighter leading-none">Trésor du Verbe</h2>
        <p className="text-[#b08968] font-black uppercase text-[10px] tracking-[0.5em] mt-4">Lexique Bilingue BɔɔnSphere</p>
        
        <div className="mt-8 px-4 max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-1.5 bg-stone-50/50 p-4 rounded-3xl border border-stone-100 shadow-inner max-h-24 sm:max-h-none overflow-y-auto custom-scrollbar">
            {CAMEROON_ALPHABET.map((char, idx) => (
              <span key={idx} className="w-8 h-8 flex items-center justify-center bg-white border border-stone-200 rounded-lg font-black text-[#2d1b0d] text-xs shadow-sm hover:border-[#b08968] transition-colors cursor-default">
                {char}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 px-4 max-w-xl mx-auto">
          <AutocompleteSearch 
            placeholder="Explorer le dictionnaire..." 
            onSelect={handleSelect}
            inputClassName="w-full px-6 py-4 sm:py-6 rounded-2xl sm:rounded-full bg-stone-50 border-2 border-stone-100 focus:border-[#b08968] outline-none text-center font-bold text-stone-800 shadow-inner"
          />
        </div>
      </header>

      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-stone-100 ring-1 ring-stone-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1a0f08] text-white">
                <th className="p-6 font-trad uppercase tracking-widest text-[9px] border-r border-white/5">Vedette (FR/NG)</th>
                <th className="p-6 font-trad uppercase tracking-widest text-[9px] border-r border-white/5 hidden md:table-cell">Domaine</th>
                <th className="p-6 text-center font-trad uppercase tracking-widest text-[9px]">Oralité</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filtered.map((term) => (
                <tr key={term.id} className="hover:bg-stone-50 transition-colors group">
                  <td className="p-6 sm:p-10 border-r border-stone-50">
                     <div className="space-y-1">
                        <p className="font-black text-[#2d1b0d] text-base sm:text-2xl group-hover:text-amber-800 transition-colors leading-tight">{term.termeFr}</p>
                        <p className="text-amber-700 font-black italic text-lg sm:text-3xl font-trad leading-none">{term.termeNgiem}</p>
                     </div>
                     <div className="mt-4 flex items-center gap-2">
                        <span className="text-[7px] bg-stone-100 px-2 py-0.5 rounded-full font-black uppercase text-stone-400 tracking-tighter">ID: {term.idFiche}</span>
                     </div>
                  </td>
                  <td className="p-6 sm:p-10 border-r border-stone-50 hidden md:table-cell">
                     <p className="text-[10px] font-black uppercase text-stone-400 mb-1">DOMAINE</p>
                     <p className="text-sm font-bold text-stone-700 leading-tight">{term.domaineFr}</p>
                     <p className="text-xs font-bold text-amber-600 italic font-trad mt-1">{term.domaineNgiem}</p>
                  </td>
                  <td className="p-6 sm:p-10 text-center">
                    <button 
                      onClick={() => handlePlayAudio(term)}
                      disabled={playingId === term.id}
                      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all mx-auto shadow-lg ${playingId === term.id ? 'bg-stone-100 text-stone-300' : 'bg-[#1a0f08] text-white hover:bg-[#b08968] hover:scale-105'}`}
                    >
                      <i className={`fas ${playingId === term.id ? 'fa-spinner fa-spin' : 'fa-volume-high'} text-lg sm:text-2xl`}></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[3rem] border-4 border-dashed border-stone-100">
           <i className="fas fa-feather text-4xl text-stone-200 mb-4"></i>
           <h3 className="text-xl font-black text-stone-300 uppercase tracking-widest">Le Verbe est caché</h3>
           <p className="text-stone-400 italic">Aucun mot ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
};

export default Lexique;
