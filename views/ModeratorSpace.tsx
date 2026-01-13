
import React, { useState } from 'react';
import { User, TermRecord } from '../types';
import { playCameroonianAudio, askCulturalContext } from '../services/geminiService';

interface Props {
  user: User;
  terms: TermRecord[];
  setTerms: React.Dispatch<React.SetStateAction<TermRecord[]>>;
  onLogout?: () => void;
}

const ModeratorSpace: React.FC<Props> = ({ user, terms, setTerms, onLogout }) => {
  const pendingTerms = terms.filter(t => t.statut === 'en_attente');
  const [selectedTerm, setSelectedTerm] = useState<TermRecord | null>(null);
  const [oracleResponse, setOracleResponse] = useState<string | null>(null);
  const [loadingOracle, setLoadingOracle] = useState(false);

  const handleAction = (id: string, status: 'valide' | 'rejete') => {
    setTerms(prev => prev.map(t => t.id === id ? { ...t, statut: status } : t));
    setSelectedTerm(null);
    setOracleResponse(null);
    alert(`Le terme a été ${status === 'valide' ? 'validé et publié' : 'rejeté'}.`);
  };

  const listenToTerm = async (term: TermRecord) => {
    await playCameroonianAudio(term.termeFr, term.termeNgiem);
  };

  const consultOracle = async (term: TermRecord) => {
    setLoadingOracle(true);
    try {
      // Fixed: Use definitionFr and domaineFr from TermRecord interface instead of missing definition/domaine properties.
      const prompt = `En tant qu'Oracle Ngiembɔɔn, analyse ce terme pour une base de données vétérinaire :
      Terme FR: ${term.termeFr}
      Terme Ngiembɔɔn: ${term.termeNgiem}
      Définition: ${term.definitionFr}
      Domaine: ${term.domaineFr}
      
      Est-ce linguistiquement correct ? La définition est-elle techniquement juste pour la biosécurité ? Donne un verdict court.`;
      const result = await askCulturalContext(prompt);
      setOracleResponse(result);
    } catch (e) {
      setOracleResponse("L'Oracle n'a pas pu se connecter aux esprits du savoir.");
    }
    setLoadingOracle(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 animate-fade-in space-y-12">
      
      <header className="bg-[#2d1b0d] p-12 rounded-[4rem] text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl border-b-8 border-amber-600">
         <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-amber-500 rounded-3xl flex items-center justify-center text-[#2d1b0d] text-4xl shadow-xl">
               <i className="fas fa-gavel"></i>
            </div>
            <div className="space-y-1">
               <h2 className="text-4xl font-black font-trad text-amber-500 tracking-tighter">Tableau de Décision</h2>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Session Modérateur : {user.name}</p>
            </div>
         </div>
         <div className="flex gap-4 bg-white/5 p-6 rounded-3xl border border-white/10">
            <div className="text-center px-4">
               <p className="text-3xl font-black text-amber-500">{pendingTerms.length}</p>
               <p className="text-[8px] font-bold uppercase opacity-50 tracking-widest">En attente</p>
            </div>
            <div className="w-px bg-white/10 mx-4"></div>
            <div className="text-center px-4">
               <p className="text-3xl font-black">{terms.filter(t => t.statut === 'valide').length}</p>
               <p className="text-[8px] font-bold uppercase opacity-50 tracking-widest">Validés</p>
            </div>
         </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Liste des propositions */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-stone-400 mb-6 flex items-center gap-2">
            <i className="fas fa-list-ul text-amber-500"></i> File d'attente globale
          </h3>
          {pendingTerms.length > 0 ? (
            pendingTerms.map(t => (
              <button 
                key={t.id}
                onClick={() => { setSelectedTerm(t); setOracleResponse(null); }}
                className={`w-full text-left p-6 rounded-3xl border-2 transition-all flex items-center justify-between group ${
                  selectedTerm?.id === t.id ? 'bg-amber-500 border-[#2d1b0d] shadow-xl translate-x-4' : 'bg-white border-stone-100 hover:border-amber-200'
                }`}
              >
                <div>
                   <h4 className={`text-xl font-black font-trad ${selectedTerm?.id === t.id ? 'text-[#2d1b0d]' : 'text-stone-800'}`}>{t.termeFr}</h4>
                   <p className={`text-xs font-bold italic ${selectedTerm?.id === t.id ? 'text-[#2d1b0d]/70' : 'text-amber-600'}`}>{t.termeNgiem}</p>
                   <p className="text-[8px] uppercase font-black text-stone-400 mt-2">Par: {t.auteur}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${selectedTerm?.id === t.id ? 'bg-[#2d1b0d] text-amber-500' : 'bg-stone-50 text-stone-300'}`}>
                   <i className="fas fa-chevron-right"></i>
                </div>
              </button>
            ))
          ) : (
            <div className="bg-stone-50 p-12 rounded-[3rem] border-4 border-dashed border-stone-200 text-center opacity-60">
               <i className="fas fa-circle-check text-4xl mb-4 text-stone-300"></i>
               <p className="text-sm font-bold uppercase tracking-widest">Tout est à jour, Sage.</p>
            </div>
          )}
        </div>

        {/* Panneau de revue */}
        <div className="lg:col-span-7">
           {selectedTerm ? (
             <div className="bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-stone-100 animate-slide-up sticky top-10">
                <div className="h-48 relative overflow-hidden bg-stone-900">
                   <img src={selectedTerm.imageUrl} className="w-full h-full object-cover opacity-60" alt="" />
                   <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent"></div>
                   <div className="absolute top-8 left-8">
                      <span className="bg-amber-500 text-[#2d1b0d] px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">Proposition de {selectedTerm.auteur}</span>
                   </div>
                </div>

                <div className="p-12 space-y-10 -mt-10 relative z-10">
                   <div className="flex justify-between items-start gap-6 border-b pb-8">
                      <div className="space-y-2">
                         <h3 className="text-4xl font-black font-trad text-[#2d1b0d] leading-tight">{selectedTerm.termeFr}</h3>
                         <p className="text-2xl text-amber-600 font-black italic">{selectedTerm.termeNgiem}</p>
                      </div>
                      <button 
                        onClick={() => listenToTerm(selectedTerm)}
                        className="w-20 h-20 bg-[#2d1b0d] text-amber-500 rounded-3xl flex items-center justify-center text-3xl shadow-xl hover:scale-110 active:scale-95 transition-all"
                      >
                         <i className="fas fa-volume-up"></i>
                      </button>
                   </div>

                   <div className="space-y-6">
                      <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase text-stone-400 tracking-widest">Définition Technique</p>
                        {/* Fixed: definitionFr correctly matches the TermRecord interface */}
                        <p className="text-lg italic font-medium leading-relaxed text-stone-700">"{selectedTerm.definitionFr}"</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-stone-50 p-4 rounded-2xl">
                           <p className="text-[8px] font-black uppercase text-stone-400 mb-1">Domaine</p>
                           {/* Fixed: domaineFr correctly matches the TermRecord interface */}
                           <p className="text-xs font-bold text-[#2d1b0d]">{selectedTerm.domaineFr}</p>
                        </div>
                        <div className="bg-stone-50 p-4 rounded-2xl">
                           <p className="text-[8px] font-black uppercase text-stone-400 mb-1">Statut Actuel</p>
                           <p className="text-xs font-bold text-amber-600 uppercase">{selectedTerm.statut}</p>
                        </div>
                      </div>
                   </div>

                   {/* Section Oracle */}
                   <div className="bg-[#fcf6e5] p-8 rounded-[2.5rem] border-2 border-amber-200 space-y-6">
                      <div className="flex justify-between items-center">
                         <h4 className="text-xs font-black text-amber-700 uppercase tracking-widest flex items-center gap-2">
                            <i className="fas fa-wand-magic-sparkles"></i> L'Avis de l'Oracle
                         </h4>
                         <button 
                          onClick={() => consultOracle(selectedTerm)}
                          disabled={loadingOracle}
                          className="bg-amber-600 text-white px-6 py-2 rounded-xl text-[9px] font-black uppercase hover:bg-[#2d1b0d] transition-all disabled:opacity-50"
                         >
                            {loadingOracle ? <i className="fas fa-spinner fa-spin"></i> : "Consulter l'IA"}
                         </button>
                      </div>
                      {oracleResponse && (
                        <p className="text-sm italic font-medium text-amber-900 border-l-4 border-amber-400 pl-4 py-2 animate-fade-in">
                          {oracleResponse}
                        </p>
                      )}
                   </div>

                   <div className="flex gap-4 pt-6">
                      <button 
                        onClick={() => handleAction(selectedTerm.id, 'rejete')}
                        className="flex-grow py-6 rounded-2xl bg-white border-4 border-red-100 text-red-500 font-black uppercase tracking-widest text-[10px] hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-lg"
                      >
                         <i className="fas fa-times-circle mr-2"></i> Rejeter
                      </button>
                      <button 
                        onClick={() => handleAction(selectedTerm.id, 'valide')}
                        className="flex-grow py-6 rounded-2xl bg-[#2d1b0d] text-amber-500 font-black uppercase tracking-widest text-[10px] hover:bg-amber-600 hover:text-white transition-all shadow-2xl"
                      >
                         <i className="fas fa-check-circle mr-2"></i> Valider et Publier
                      </button>
                   </div>
                </div>
             </div>
           ) : (
             <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-stone-50 border-4 border-dashed border-stone-200 rounded-[4rem] text-center p-12 opacity-60">
                <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center text-7xl text-stone-200 mb-8 shadow-inner">
                   <i className="fas fa-stamp"></i>
                </div>
                <h3 className="text-2xl font-black font-trad text-stone-300">Prêt à trancher</h3>
                <p className="text-stone-400 font-medium italic max-w-xs mt-2">
                  "Un mot mal pesé est une porte ouverte au virus."
                </p>
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default ModeratorSpace;
