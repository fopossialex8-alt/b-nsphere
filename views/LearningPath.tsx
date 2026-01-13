
import React, { useState, useEffect } from 'react';
import { playCameroonianAudio } from '../services/geminiService';

interface Stage {
  id: number;
  title: string;
  titleNgiem: string;
  icon: string;
  points: number;
  modules: {
    title: string;
    content: string;
    audioText: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    correct: number;
  };
}

const STAGES: Stage[] = [
  { 
    id: 1, title: "Cercle du Verbe", titleNgiem: "Létsyeen pasẅɛ̀", icon: "📜", points: 100,
    modules: [
      { title: "Voyelles Royales", content: "Les sons ɛ et ɔ sont le souffle de notre langue. Sans eux, l'alerte ne peut être criée correctement.", audioText: "Écoutez les sons ɛ et ɔ. Ils sont la base de notre cri d'alerte." },
      { title: "Le Ton du Danger", content: "Un ton haut (́) prévient d'une menace immédiate. Un ton bas (̀) indique une situation stable.", audioText: "Le ton haut est une flèche, le ton bas est un bouclier." }
    ],
    quiz: { question: "Quel son est propre au Ngiembɔɔn et vital pour l'alerte ?", options: ["La lettre X", "La voyelle ɛ", "La consonne Z"], correct: 1 }
  },
  { 
    id: 2, title: "L'Ombre Virale", titleNgiem: "Gwáʼa Mekúnɔ̀ɔn", icon: "🧬", points: 200,
    modules: [
      { title: "Signes de Fièvre", content: "Les taches rouges sur la peau et une fatigue soudaine des bêtes sont les marques du virus.", audioText: "Observez la peau des bêtes, elle parle quand le mal arrive." },
      { title: "Le Silence Mortel", content: "Un porc qui ne mange plus est un porc qui nous avertit d'un péril pour tout le village.", audioText: "Le refus de nourriture est le premier cri du virus." }
    ],
    quiz: { question: "Quel signe clinique est caractéristique de la PPA ?", options: ["Poil brillant", "Taches rouges sur la peau", "Appétit féroce"], correct: 1 }
  },
  { 
    id: 3, title: "Rite du Nettoyage", titleNgiem: "Lepomó ffo", icon: "🛡️", points: 300,
    modules: [
      { title: "Pédiluve Sacré", content: "Désinfecter ses pieds à l'entrée de la ferme, c'est barrer la route au mal invisible.", audioText: "L'eau et le savon sont vos premiers guerriers contre le virus." },
      { title: "Vêtements Dédiés", content: "Ne portez jamais les habits du marché à la porcherie. Le virus voyage sur les fibres.", audioText: "Laissez les habits de la ville à la porte du sanctuaire." }
    ],
    quiz: { question: "Pourquoi utiliser un pédiluve à chaque entrée ?", options: ["Pour décorer l'entrée", "Pour tuer le virus sous les bottes", "Pour se rafraîchir"], correct: 1 }
  },
  { 
    id: 4, title: "Zonage Royal", titleNgiem: "Letúʼu gwoon", icon: "🗺️", points: 400,
    modules: [
      { title: "Espaces Protégés", content: "Séparez les bêtes des étrangers. Seul le gardien du savoir peut entrer dans le cercle de vie.", audioText: "Tracez une frontière que l'étranger ne doit pas franchir." },
      { title: "Clôtures Ancestrales", content: "Une clôture solide n'est pas une prison, c'est un bouclier contre les animaux sauvages porteurs du mal.", audioText: "Le rempart protège la vie à l'intérieur." }
    ],
    quiz: { question: "Quelle est la meilleure protection périmétrique ?", options: ["Laisser les bêtes divaguer", "Une clôture fermée et contrôlée", "Vendre toutes les bêtes"], correct: 1 }
  },
  { 
    id: 5, title: "Le Cri d'Alerte", titleNgiem: "Legÿo tà", icon: "📢", points: 500,
    modules: [
      { title: "Notification Rapide", content: "Un éleveur qui prévient est un éleveur qui sauve le village tout entier.", audioText: "N'attendez pas que le feu brûle tout pour appeler l'eau." },
      { title: "Solidarité Sanitaire", content: "Cacher la maladie est un crime contre les ancêtres et contre l'avenir de nos enfants.", audioText: "Le savoir partagé est la seule arme invincible." }
    ],
    quiz: { question: "Que faire en cas de doute sur une bête malade ?", options: ["Cacher la maladie", "Avertir immédiatement les autorités", "Vendre la bête au marché"], correct: 1 }
  },
  { 
    id: 6, title: "Le Feu Purificateur", titleNgiem: "Leláa mekúnɔ̀ɔn", icon: "🔥", points: 600,
    modules: [
      { title: "Cuisson des Restes", content: "Le virus meurt sous la morsure du feu. Ne donnez jamais de restes crus venant de l'extérieur.", audioText: "Le feu est le juge final du virus." }
    ],
    quiz: { question: "Comment neutraliser le virus dans les restes alimentaires ?", options: ["Les laver à l'eau", "Les cuire au moins 30 minutes", "Les enterrer"], correct: 1 }
  },
  { 
    id: 7, title: "Le Vide Sanitaire", titleNgiem: "Lété nti", icon: "⏳", points: 700,
    modules: [
      { title: "Le Temps du Repos", content: "Après le mal, la terre doit rester vide pour guérir. Attendez 40 jours avant de ramener la vie.", audioText: "Laissez la terre respirer pour qu'elle retrouve sa force." }
    ],
    quiz: { question: "Combien de temps doit durer le vide sanitaire minimal ?", options: ["1 semaine", "Au moins 40 jours", "1 an"], correct: 1 }
  }
];

const LearningPath: React.FC = () => {
  const [level, setLevel] = useState(() => Number(localStorage.getItem('boon_level')) || 0);
  const [cauris, setCauris] = useState(() => Number(localStorage.getItem('boon_cauris')) || 0);
  const [view, setView] = useState<'map' | 'lesson' | 'quiz' | 'finish'>('map');
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('boon_level', level.toString());
    localStorage.setItem('boon_cauris', cauris.toString());
  }, [level, cauris]);

  const startStage = (idx: number) => {
    setActiveStage(idx);
    setActiveModuleIdx(0);
    setView('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextModule = () => {
    if (activeStage === null) return;
    if (activeModuleIdx < STAGES[activeStage].modules.length - 1) {
      setActiveModuleIdx(prev => prev + 1);
    } else {
      setView('quiz');
    }
  };

  const handleQuiz = async () => {
    if (activeStage === null || selectedOpt === null) return;
    if (selectedOpt === STAGES[activeStage].quiz.correct) {
      const reward = STAGES[activeStage].points;
      setCauris(prev => prev + reward);
      setView('finish');
      await playCameroonianAudio(`Tu as acquis la sagesse du Cercle ${activeStage + 1}. Ton héritage grandit.`, "A-hoo! Ménɔ̀ɔn létsyeen.");
    } else {
      await playCameroonianAudio("L'erreur est le début de la sagesse. Écoute encore la terre.", "Lété nti.");
      alert("Ce n'est pas la bonne réponse. Relis attentivement les préceptes.");
    }
  };

  const complete = () => {
    if (activeStage !== null && activeStage === level) {
      setLevel(prev => prev + 1);
    }
    setView('map');
    setActiveStage(null);
    setSelectedOpt(null);
  };

  const progress = Math.min((level / STAGES.length) * 100, 100);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-12 animate-fade-in min-h-screen pb-40">
      
      {/* Header Statut Temple */}
      <header className="bg-white p-8 sm:p-12 rounded-[4rem] shadow-2xl border-t-[10px] border-[#b08968] flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden ring-1 ring-stone-100">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
           <i className="fas fa-scroll text-[12rem]"></i>
        </div>
        <div className="flex items-center gap-8 z-10">
          <div className="w-24 h-24 bg-[#1a0f08] rounded-[2.5rem] flex items-center justify-center text-[#b08968] text-5xl shadow-2xl ring-4 ring-stone-100">
             <i className="fas fa-vihara"></i>
          </div>
          <div>
            <h2 className="text-4xl font-black font-trad text-[#1a0f08] tracking-tight">Le Temple du Savoir</h2>
            <p className="text-[#b08968] font-black uppercase text-[10px] tracking-[0.5em] mt-1">Séquence d'Initiation Royale</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-4 z-10 w-full md:w-auto">
           <div className="flex gap-4 w-full md:w-auto">
              <Stat icon="fa-gem" label="Cauris" value={cauris} color="text-amber-600" />
              <Stat icon="fa-crown" label="Grade" value={level} color="text-[#1a0f08]" />
           </div>
           <div className="w-full h-4 bg-stone-100 rounded-full overflow-hidden border border-stone-200 shadow-inner mt-2">
              <div className="h-full bg-gradient-to-r from-[#b08968] via-amber-500 to-green-600 transition-all duration-1000" style={{ width: `${progress}%` }}></div>
           </div>
           <p className="text-[9px] font-black uppercase tracking-widest text-stone-400">Chemin de l'Initié : {Math.round(progress)}% complété</p>
        </div>
      </header>

      {view === 'map' && (
        <div className="space-y-16">
           <div className="text-center space-y-6">
              <h3 className="text-3xl font-black font-trad text-stone-400 uppercase tracking-[0.4em]">Les 7 Cercles du Pouvoir</h3>
              <p className="text-stone-500 italic max-w-2xl mx-auto text-lg leading-relaxed">
                Chaque cercle déverrouille une part du secret de la protection du cheptel. Gravissez les échelons pour devenir un Grand Gardien de BɔɔnSphere.
              </p>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {STAGES.map((s, i) => (
                <button 
                  key={s.id}
                  onClick={() => i <= level && startStage(i)}
                  disabled={i > level}
                  className={`group p-10 card-royal flex flex-col items-center gap-8 transition-all relative ${
                    i === level ? 'ring-[8px] ring-[#b08968]/20 scale-105 border-amber-500' : 
                    i < level ? 'bg-green-50/50 border-green-200' : 'opacity-40 grayscale pointer-events-none'
                  }`}
                >
                  <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center text-5xl shadow-xl transition-all group-hover:rotate-6 ${i <= level ? 'bg-[#1a0f08] text-[#b08968]' : 'bg-stone-200 text-stone-400'}`}>
                    {s.icon}
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase text-stone-400 mb-2">Cercle {s.id}</p>
                    <h4 className="text-xl font-black text-[#1a0f08] uppercase tracking-tighter leading-none">{s.title}</h4>
                    <p className="text-[11px] font-bold text-[#b08968] italic mt-2 opacity-70">{s.titleNgiem}</p>
                  </div>
                  {i < level && (
                    <div className="absolute top-4 right-4 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg animate-fade-in ring-4 ring-white">
                       <i className="fas fa-check"></i>
                    </div>
                  )}
                  {i === level && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] animate-bounce shadow-2xl">
                      Prêt pour l'éveil
                    </div>
                  )}
                  <div className="mt-4 pt-6 border-t border-stone-100 w-full flex justify-between items-center">
                     <span className="text-[9px] font-black uppercase text-stone-400">Récompense</span>
                     <span className="text-sm font-black text-amber-600">+{s.points} <i className="fas fa-gem ml-1 text-[10px]"></i></span>
                  </div>
                </button>
              ))}
           </div>
        </div>
      )}

      {view === 'lesson' && activeStage !== null && (
        <div className="max-w-5xl mx-auto bg-white rounded-[4rem] shadow-2xl border-t-[25px] border-[#1a0f08] overflow-hidden animate-slide-up relative ring-1 ring-stone-200">
           <div className="absolute top-12 right-12 flex items-center gap-3">
              <span className="text-[12px] font-black text-[#b08968] uppercase tracking-[0.5em]">Cercle {activeStage + 1}</span>
              <div className="w-10 h-1 bg-[#b08968] rounded-full"></div>
           </div>
           
           <div className="p-12 sm:p-24 space-y-16">
              <div className="flex flex-col sm:flex-row items-center gap-10 border-b pb-12 border-stone-100">
                 <div className="w-32 h-32 bg-stone-50 rounded-[3rem] flex items-center justify-center text-7xl shadow-inner border-2 border-stone-100 ring-4 ring-stone-50">
                    {STAGES[activeStage].icon}
                 </div>
                 <div className="text-center sm:text-left space-y-2">
                    <h3 className="text-4xl sm:text-5xl font-black font-trad text-[#1a0f08] tracking-tight">{STAGES[activeStage].modules[activeModuleIdx].title}</h3>
                    <p className="text-[#b08968] font-black uppercase text-[12px] tracking-[0.3em]">Module d'Apprentissage {activeModuleIdx + 1} sur {STAGES[activeStage].modules.length}</p>
                 </div>
              </div>

              <div className="bg-[#fdfaf7] p-12 sm:p-20 rounded-[4rem] border-4 border-dashed border-[#b08968]/30 shadow-inner relative group">
                 <div className="absolute -top-5 left-16 bg-white px-8 py-2 rounded-full border-2 border-[#b08968]/30 text-[10px] font-black uppercase text-[#1a0f08] tracking-widest shadow-sm group-hover:-translate-y-1 transition-transform">Parole de Sage</div>
                 <p className="text-2xl sm:text-4xl text-stone-800 italic font-medium leading-relaxed text-center">
                    "{STAGES[activeStage].modules[activeModuleIdx].content}"
                 </p>
              </div>

              <div className="flex flex-col items-center gap-8">
                 <button 
                   onClick={() => playCameroonianAudio(STAGES[activeStage].modules[activeModuleIdx].audioText)}
                   className="w-32 h-32 bg-[#1a0f08] text-[#b08968] rounded-full flex items-center justify-center text-5xl shadow-2xl hover:scale-110 active:scale-95 transition-all ring-8 ring-stone-100 animate-pulse"
                 >
                    <i className="fas fa-volume-up"></i>
                 </button>
                 <p className="text-[11px] font-black uppercase text-stone-400 tracking-[0.4em]">Activer l'Écoute Sacrée</p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center pt-12 gap-8">
                 <button onClick={() => setView('map')} className="text-stone-300 font-black uppercase text-[11px] tracking-[0.4em] hover:text-[#7f1d1d] transition-colors border-b-2 border-transparent hover:border-[#7f1d1d] pb-1">Interrompre l'initiation</button>
                 <button 
                   onClick={nextModule}
                   className="w-full sm:w-auto bg-[#1a0f08] text-white px-20 py-8 rounded-[2rem] font-black uppercase text-sm tracking-[0.4em] shadow-2xl hover:bg-[#b08968] transition-all flex items-center justify-center gap-6 group"
                 >
                   {activeModuleIdx < STAGES[activeStage].modules.length - 1 ? 'Poursuivre' : 'Vers l\'Épreuve Finale'}
                   <i className="fas fa-bolt-lightning text-amber-500 group-hover:rotate-12 transition-transform"></i>
                 </button>
              </div>
           </div>
        </div>
      )}

      {view === 'quiz' && activeStage !== null && (
        <div className="max-w-4xl mx-auto bg-white rounded-[5rem] shadow-2xl border-b-[30px] border-[#b08968] p-12 sm:p-24 space-y-16 animate-slide-up relative ring-1 ring-stone-200">
           <div className="text-center space-y-6">
              <span className="text-amber-600 font-black uppercase text-[12px] tracking-[0.6em]">Le Jugement de Crédibilité</span>
              <h3 className="text-3xl sm:text-5xl font-black font-trad text-[#1a0f08] leading-tight max-w-2xl mx-auto">
                 {STAGES[activeStage].quiz.question}
              </h3>
           </div>

           <div className="grid grid-cols-1 gap-8">
              {STAGES[activeStage].quiz.options.map((opt, i) => (
                <button 
                  key={i}
                  onClick={() => setSelectedOpt(i)}
                  className={`p-10 rounded-[3rem] border-4 text-left font-bold text-xl transition-all relative overflow-hidden group ${
                    selectedOpt === i ? 'bg-[#1a0f08] border-amber-500 text-white shadow-2xl translate-x-6' : 'bg-stone-50 border-stone-100 text-stone-600 hover:border-amber-200'
                  }`}
                >
                  <div className="flex items-center gap-10">
                    <span className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl transition-all ${selectedOpt === i ? 'bg-amber-500 text-[#1a0f08] rotate-6' : 'bg-white text-stone-300'}`}>{String.fromCharCode(65 + i)}</span>
                    <span className="flex-grow leading-tight">{opt}</span>
                  </div>
                  {selectedOpt === i && <i className="fas fa-certificate absolute -right-6 -top-6 text-white/5 text-[12rem]"></i>}
                </button>
              ))}
           </div>

           <button 
             onClick={handleQuiz}
             disabled={selectedOpt === null}
             className="w-full bg-[#1a0f08] text-white py-10 rounded-[3rem] font-black uppercase text-lg tracking-[0.5em] shadow-2xl hover:bg-[#b08968] transition-all disabled:opacity-30 flex items-center justify-center gap-6 group"
           >
             Trancher le Savoir
             <i className="fas fa-gavel text-amber-500 group-hover:rotate-45 transition-transform duration-500"></i>
           </button>
        </div>
      )}

      {view === 'finish' && activeStage !== null && (
        <div className="max-w-3xl mx-auto bg-white rounded-[6rem] shadow-2xl p-24 text-center space-y-12 animate-appear border-b-[25px] border-green-600 relative overflow-hidden ring-1 ring-stone-200">
           <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
           <div className="w-40 h-40 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-8xl mx-auto shadow-inner ring-12 ring-green-100">
              <i className="fas fa-award"></i>
           </div>
           <div className="space-y-6">
              <h3 className="text-5xl sm:text-6xl font-black font-trad text-[#1a0f08] tracking-tight">Initiation Réussie !</h3>
              <p className="text-stone-500 font-medium italic text-2xl leading-relaxed">
                 "Ton esprit s'élève au-dessus du mal. Tu deviens un véritable rempart protecteur pour le village."
              </p>
           </div>
           <div className="bg-amber-50 p-12 rounded-[5rem] border-4 border-amber-200 shadow-inner group transition-all hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <p className="text-[14px] font-black uppercase text-amber-800 tracking-[0.5em] mb-4 relative z-10">Butin Initiatique</p>
              <p className="text-8xl font-black text-amber-900 drop-shadow-md relative z-10">+{STAGES[activeStage].points} Cauris</p>
              <div className="mt-6 flex justify-center gap-4 relative z-10">
                 <i className="fas fa-gem text-amber-500 text-2xl animate-pulse"></i>
                 <i className="fas fa-gem text-amber-500 text-2xl animate-pulse delay-100"></i>
                 <i className="fas fa-gem text-amber-500 text-2xl animate-pulse delay-200"></i>
              </div>
           </div>
           <button onClick={complete} className="w-full bg-[#1a0f08] text-white py-10 rounded-[3rem] font-black uppercase text-sm tracking-[0.5em] shadow-2xl hover:bg-[#b08968] transition-all">
              Réintégrer le Temple
           </button>
        </div>
      )}
    </div>
  );
};

const Stat = ({ icon, label, value, color }: any) => (
  <div className="flex-grow flex items-center gap-6 px-10 py-5 bg-stone-50 rounded-[2.5rem] border border-stone-100 shadow-sm transition-all hover:shadow-md hover:bg-white ring-1 ring-black/5">
     <i className={`fas ${icon} ${color} text-3xl`}></i>
     <div className="text-left">
        <p className="text-[10px] font-black uppercase text-stone-400 tracking-widest">{label}</p>
        <p className={`text-3xl font-black leading-none ${color} mt-1`}>{value}</p>
     </div>
  </div>
);

export default LearningPath;
