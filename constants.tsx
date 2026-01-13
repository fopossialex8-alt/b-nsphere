
import { TermRecord, Lesson } from './types';

export const CAMEROON_ALPHABET = ['a', 'b', 'c', 'd', 'e', 'ɛ', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ŋ', 'o', 'ɔ', 'p', 'r', 's', 't', 'u', 'ʉ', 'v', 'w', 'ẅ', 'y', 'ÿ', 'z', 'ʼ', '́', '̀', '̂', '̌', '̄'];

const createFiche = (id: string, fr: string, ng: string, domFr: string, domNg: string, defFr: string, defNg: string, idFiche: string, img: string): TermRecord => ({
  id,
  termeFr: fr,
  termeNgiem: ng,
  domaineFr: domFr,
  domaineNgiem: domNg,
  sousDomaineFr: 'Mobilisation communautaire',
  sousDomaineNgiem: 'Lecúʼte pʉ̀a shwóŋo páʼ pɔ́ ge kẅé nò Gwáʼa Mekúnɔ̀ɔn Afílikà púʼu',
  definitionFr: defFr,
  definitionNgiem: defNg,
  sourceFr: 'Plan stratégique PPA – IV.4.3.3',
  sourceNgiem: 'Letáŋte lélÿɔʼ ncù Gwáʼa Mekúnɔ̀ɔn Afílikà (PPA) – IV.4.3.3',
  synonymesFr: 'Information sanitaire, mobilisation sociale',
  synonymesNgiem: 'Lecwoŋo shwóŋ pʉ̀a páʼ pɔ́ ge gÿo púʼu tá lɔg lÿɔ́ʼɔ guɔ',
  contexteFr: 'Utilisée pour prévenir la PPA par des campagnes locales',
  contexteNgiem: 'Mé lɔg ńtáte Gwáʼa Mekúnɔ̀ɔn Afílikà lékúu tsɛ̀ɛ láʼ.',
  idFiche,
  imageUrl: img,
  auteur: 'Carol Douanla',
  dateCreation: '2025-01-20',
  statut: 'valide'
});

export const INITIAL_TERMS: TermRecord[] = [
  createFiche('1', 'Sensibilisation', 'lecwoŋo shwóŋ', 'Communication en santé', 'Leshwoŋó na nò legwɔ́ ntentʉ́', 'Action visant à sensibiliser les intervenants aux dangers et aux mesures préventives.', 'Lefaʼ meshÿó lélɔg ńcwoŋo shwóŋo paswɛ̀ mekúnɔɔn paʼ guɔ ná ngɔ́ʼ púʼu ḿbíŋ shwóŋo wɔb paʼ pɔ́ ge gÿo púʼu tá lɔg pɔ́gɔ guɔ', 'ISTICMEM25CAROLDFT1', 'https://images.unsplash.com/photo-1542601906-990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800'),
  createFiche('2', 'Biosécurité', 'Lesẅɛ̀ menɔ̀ɔn na nti', 'Prévention', 'Lepomó ffo', 'Mesures pour empêcher la propagation du virus.', 'Paʼ pɔ́ ge gÿo púʼu tá lɔg pɔ́gɔ guɔ gie ńge kẅé nò mekúnɔ̀ɔn', 'ISTICMEM25CAROLDFT2', 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&q=80&w=800'),
  createFiche('3', 'Pédiluve', 'Létseŋ mekuó', 'Hygiène', 'Lelúŋte', 'Bassin de désinfection pour les pieds.', 'Lésẅɛ̀ mekuó paswɛ̀ mekúnɔ̀ɔn púʼu tsɛ̀ɛ ntʉ́ ffo', 'ISTICMEM25CAROLDFT3', 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=800'),
  createFiche('4', 'Virus PPA', 'Ńge kẅé nò PPA', 'Virologie', 'Nò gie á kẅé animal', 'Agent infectieux responsable de la PPA.', 'Nò gie á kẅé animal páʼ Gwáʼa Mekúnɔ̀ɔn Afílikà púʼu', 'ISTICMEM25CAROLDFT4', 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=800'),
  createFiche('5', 'Zonage', 'Letúʼu gwoon', 'Gestion territoriale', 'Lelíe láʼ', 'Délimitation de zones à risque.', 'Letúʼu gwoon gie á po mekúnɔ̀ɔn tsɛ̀ɛ láʼ', 'ISTICMEM25CAROLDFT5', 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800'),
  createFiche('6', 'Vétérinaire', 'Nshʉ̀a mekúnɔ̀ɔn', 'Médecine', 'Lélɔ́ŋ mekúnɔ̀ɔn', 'Expert en santé animale.', 'Nshʉ̀a gie á lɔ́ŋ mekúnɔ̀ɔn tá lɔg sẅɛ̀ wɔb', 'ISTICMEM25CAROLDFT6', 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800'),
  createFiche('7', 'Notification', 'Legÿo tà', 'Communication', 'Leshwoŋó', 'Signalement précoce d\'une anomalie.', 'Legÿo tà páʼ pɔ́ ge kẅé nò mekúnɔ̀ɔn', 'ISTICMEM25CAROLDFT7', 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=800'),
  createFiche('8', 'Quarantaine', 'Lété nti animal', 'Prévention', 'Lepomó', 'Isolement préventif des animaux suspects.', 'Paʼ pɔ́ ge té animal nti páʼ pɔ́ ge kẅé mekúnɔ̀ɔn', 'ISTICMEM25CAROLDFT8', 'https://images.unsplash.com/photo-1524413135049-27ef057b6282?auto=format&fit=crop&q=80&w=800'),
  createFiche('9', 'Désinfectant', 'Nò lésẅɛ̀ nti', 'Hygiène', 'Lelúŋte', 'Substance qui détruit les germes.', 'Nò gie á sẅɛ̀ nti mekúnɔ̀ɔn paswɛ̀ ntʉ́ ffo', 'ISTICMEM25CAROLDFT9', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800'),
  createFiche('10', 'Contagion', 'Lelúte mekúnɔ̀ɔn', 'Épidémiologie', 'Paʼ mekúnɔ̀ɔn ge lúte', 'Transmission de la maladie entre porcs.', 'Paʼ mekúnɔ̀ɔn ge lúte animal ḿbíŋ kẅé nò', 'ISTICMEM25CAROLDFT10', 'https://images.unsplash.com/photo-1551288049-bbbda536ad37?auto=format&fit=crop&q=80&w=800'),
  createFiche('11', 'Asymptomatique', 'Gie á lÿɔ́ʼɔ mboŋ', 'Diagnostic', 'Letáŋte', 'Animal porteur sans signe visible.', 'Animal gie á po mekúnɔ̀ɔn tá lÿɔ́ʼɔ mboŋ na mém', 'ISTICMEM25CAROLDFT11', 'https://images.unsplash.com/photo-1544526226-d4568090ffb8?auto=format&fit=crop&q=80&w=800'),
  createFiche('12', 'Porcherie', 'Ntʉ́ mekúnɔ̀ɔn', 'Infrastructure', 'Mefó me animal', 'Lieu d\'habitation des porcs.', 'Ntʉ́ mekúnɔ̀ɔn páʼ animal ge ńnɔ́ŋ púʼu', 'ISTICMEM25CAROLDFT12', 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=800'),
  createFiche('13', 'Échaudage', 'Lesẅɛ̀ na nti gwáʼa', 'Traitement thermique', 'Leláa', 'Destruction du virus par la chaleur.', 'Paʼ fire ge kẅé nò mekúnɔ̀ɔn na nti', 'ISTICMEM25CAROLDFT13', 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=800'),
  createFiche('14', 'Abattage', 'Legwɔ́ animal', 'Contrôle sanitaire', 'Legwɔ́', 'Mise à mort contrôlée pour limiter le virus.', 'Legwɔ́ animal páʼ mekúnɔ̀ɔn púʼu tá lɔg sẅɛ̀ láʼ', 'ISTICMEM25CAROLDFT14', 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&q=80&w=800'),
  createFiche('15', 'Foyer PPA', 'Gwoon gie á po PPA', 'Épidémiologie', 'Gwoon', 'Lieu où le virus est confirmé.', 'Gwoon gie pɔ́ le kẅé nò mekúnɔ̀ɔn tsɛ̀ɛ', 'ISTICMEM25CAROLDFT15', 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800'),
  createFiche('16', 'Marché', 'Shwóŋ mekúnɔ̀ɔn', 'Commerce', 'Shwóŋ', 'Lieu d\'échange commercial risqué.', 'Shwóŋ mekúnɔ̀ɔn páʼ pʉ̀a ge ńcúʼte púʼu', 'ISTICMEM25CAROLDFT16', 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80&w=800'),
  createFiche('17', 'Alimentation', 'Leláa mekúnɔ̀ɔn', 'Nutrition', 'Leláa', 'Nourriture saine pour le cheptel.', 'Leláa mekúnɔ̀ɔn páʼ pɔ́ ge láa wɔb púʼu', 'ISTICMEM25CAROLDFT17', 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=800'),
  createFiche('18', 'Transport', 'Lelÿɔ́ʼ mekúnɔ̀ɔn', 'Logistique', 'Lelÿɔ́ʼ', 'Mouvement sécurisé des animaux.', 'Lelÿɔ́ʼ mekúnɔ̀ɔn tsɛ̀ɛ láʼ púʼu tá lɔg lékúu', 'ISTICMEM25CAROLDFT18', 'https://images.unsplash.com/photo-1519003722824-192d99a38f0c?auto=format&fit=crop&q=80&w=800'),
  createFiche('19', 'Hygiène personnelle', 'Lelúŋte nti animal', 'Propreté', 'Lelúŋte', 'Pratiques pour maintenir la santé des éleveurs.', 'Paʼ pɔ́ ge gÿo púʼu tá lɔg lúŋte nti', 'ISTICMEM25CAROLDFT19', 'https://images.unsplash.com/photo-1556911220-e150223bd793?auto=format&fit=crop&q=80&w=800'),
];

export const LESSONS: Lesson[] = [
  { id: 'l1', title: 'Fondamentaux PPA', description: 'Comprendre le virus en Ngiembɔɔn.', icon: '📜', points: 100, completed: false, villageName: 'Marché Central' },
  { id: 'l2', title: 'Rites Sanitaires', description: 'Traditions et biosécurité.', icon: '🛖', points: 150, completed: false, villageName: 'Chefferie' },
  { id: 'l3', title: 'Signature SIG', description: 'Maîtriser les 19 fiches.', icon: '📑', points: 200, completed: false, villageName: 'Zone Sécurisée' },
];
