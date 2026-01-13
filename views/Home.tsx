
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchLatestSanitaryNews } from '../services/geminiService';
import AutocompleteSearch from '../components/AutocompleteSearch';
import { TermRecord } from '../types';

const Home: React.FC = () => {
  const [news, setNews] = useState<{text: string, sources: any[]} | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLatestSanitaryNews().then(data => {
      setNews(data);
    });
  }, []);

  const handleSelectSuggestion = (term: TermRecord) => {
    navigate(`/lexique?search=${encodeURIComponent(term.termeFr)}`);
  };

  return (
    <div className="space-y-12 animate-fade-in pb-24">
      {/* Alerte Sanitaire Adoucie */}
      <div className="bg-white border-l-[8px] border-[#8b4513] p-5 rounded-2xl shadow-md flex flex-col md:flex-row items-center justify-between gap-4 ring-1 ring-black/5">
        <div className="flex items-center gap-4">
          <div className="bg-[#8b4513] text-white w-10 h-10 rounded-xl flex items-center justify-center animate-pulse shrink-0">
            <i className="fas fa-shield-virus"></i>
          </div>
          <div>
            <h4 className="text-[#8b4513] font-black uppercase text-[10px] tracking-widest">Veille Sanitaire</h4>
            <p className="text-[#1a0f08] font-bold text-sm leading-tight italic">
              {news ? news.text.substring(0, 80) + "..." : "Le village est sous la protection des sages."}
            </p>
          </div>
        </div>
        <Link to="/map" className="bg-[#1a0f08] text-white px-6 py-2.5 rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-[#b08968] transition-all whitespace-nowrap">Localiser</Link>
      </div>

      {/* Hero Section CORRIGÉE - Image stable et contraste maximal */}
      <section className="relative h-[65vh] sm:h-[80vh] min-h-[550px] flex items-center justify-center rounded-[3rem] sm:rounded-[4rem] overflow-hidden shadow-2xl border-b-[15px] border-[#b08968] bg-[#1a0f08]">
        {/* Calque de fond : Image forcée et stable */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544333323-c242144ebd53?q=80&w=1600&auto=format&fit=crop" 
            className="w-full h-full object-cover"
            alt="Paysage Ngiembɔɔn"
            loading="eager"
          />
          {/* Double overlay pour garantir que le texte blanc ressorte sur n'importe quel fond */}
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60"></div>
        </div>
        
        {/* Textes - Blanc pur avec ombre portée intense */}
        <div className="relative z-20 text-center px-6 max-w-5xl space-y-12 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black font-trad text-white leading-none hero-text-shadow tracking-tighter filter drop-shadow-[0_10px_10px_rgba(0,0,0,1)]">
              BɔɔnSphere
            </h1>
            <div className="flex items-center justify-center gap-6">
              <div className="h-0.5 w-12 sm:w-24 bg-[#b08968]"></div>
              <p className="text-[#b08968] text-sm sm:text-3xl font-black uppercase tracking-[0.5em] hero-text-shadow filter drop-shadow-[0_4px_4px_rgba(0,0,0,1)]">
                Létsyeen mekúnɔ̀ɔn
              </p>
              <div className="h-0.5 w-12 sm:w-24 bg-[#b08968]"></div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-white text-[12px] font-black uppercase tracking-[0.6em] hero-text-shadow mb-6">Explorer le savoir ancestral...</p>
            <AutocompleteSearch 
              placeholder="Rechercher dans le sanctuaire..." 
              onSelect={handleSelectSuggestion}
              inputClassName="w-full px-10 py-7 rounded-full bg-white text-[#1a0f08] border-4 border-[#b08968] shadow-[0_20px_50px_rgba(0,0,0,0.5)] outline-none text-center font-black text-lg sm:text-xl focus:ring-8 focus:ring-[#b08968]/30 transition-all placeholder:text-stone-300"
            />
          </div>
        </div>
      </section>

      {/* Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ActionCard to="/fiches" icon="fa-scroll" title="19 Fiches" ngiem="Mefʉ̀ʼ me tsyeen" desc="Protocole Royal." color="bg-[#b08968] text-white" />
        <ActionCard to="/lexique" icon="fa-feather" title="Le Trésor" ngiem="Mefʉ̀ʼ" desc="Le Verbe Sacré." color="bg-[#2d1b0d] text-[#b08968]" />
        <ActionCard to="/path" icon="fa-vihara" title="S'Initier" ngiem="Gÿo nti" desc="Temple du Savoir." color="bg-[#8b4513] text-white" />
        <ActionCard to="/about" icon="fa-landmark" title="Gardiens" ngiem="Meguo" desc="L'Équipe Bɔɔn." color="bg-white border-4 border-[#1a0f08] text-[#1a0f08]" />
      </div>

      {/* Oracle Interactif */}
      <div className="bg-white p-10 sm:p-16 rounded-[4rem] shadow-xl border-l-[15px] border-[#b08968] flex flex-col md:flex-row items-center gap-12 group relative ring-1 ring-stone-100">
        <div className="w-40 h-40 bg-stone-900 rounded-[2.5rem] flex items-center justify-center text-7xl text-[#b08968] shadow-2xl border-4 border-[#b08968]/20 flex-shrink-0 transition-transform group-hover:scale-105">
          <i className="fas fa-microphone-lines"></i>
        </div>
        
        <div className="space-y-6 text-center md:text-left flex-grow">
          <div>
            <h3 className="text-3xl sm:text-5xl font-black font-trad text-[#1a0f08]">L'Audience de Nshʉ̀</h3>
            <p className="text-[#b08968] font-black uppercase text-[10px] tracking-widest mt-1">Sagesse Artificielle Ngiembɔɔn</p>
          </div>
          <p className="text-stone-500 font-medium italic leading-relaxed max-w-xl text-lg opacity-80">
            "Posez votre question à l'Oracle pour déverrouiller les secrets de la protection."
          </p>
          <button 
            className="bg-[#1a0f08] text-white px-10 py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl hover:bg-[#b08968] transition-all flex items-center gap-4 mx-auto md:md:mx-0"
          >
            <i className="fas fa-play"></i> Activer l'Oracle
          </button>
        </div>
      </div>
    </div>
  );
};

const ActionCard = ({ to, icon, title, ngiem, desc, color }: any) => (
  <Link to={to} className={`${color} p-8 rounded-[2.5rem] shadow-lg hover:-translate-y-2 transition-all group flex flex-col items-center text-center gap-4 border-b-4 border-black/10`}>
    <div className="bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl group-hover:rotate-6 transition-transform">
      <i className={`fas ${icon}`}></i>
    </div>
    <div>
      <h4 className="text-xl font-black font-trad">{title}</h4>
      <p className="text-[8px] font-black uppercase opacity-60 tracking-widest leading-none mt-1">{ngiem}</p>
      <div className="h-px w-6 bg-current/20 mx-auto my-3"></div>
      <p className="text-[10px] font-bold opacity-80 uppercase leading-tight tracking-tight">{desc}</p>
    </div>
  </Link>
);

export default Home;
