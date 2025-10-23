// Navigation entre pages
function goToPage(page) {
  document.getElementById('home-page').classList.add('hidden');
  document.getElementById(page + '-page').classList.remove('hidden');
  window.location.hash = page;
  generateChallenge(page);
}

function goBack() {
  document.querySelectorAll('.page, #home-page').forEach(el => el.classList.add('hidden'));
  document.getElementById('home-page').classList.remove('hidden');
  window.location.hash = '';
}

// Génération défi
const physiqueChallenges = [
  "Bouge TOI! Fais 10 pompes lentes en contrôlant ta respiration",
  "Lève TOI! Étire-toi pendant 5 minutes et tiens pendant les postions désagréables",
  "Bouge TOI! Fais la planche pendant 1min",
  "Lève TOI! Marche sur place avec des genoux hauts pendant 1 minute",
  "Bouge TOI! Fais 50 squats en te concentrant sur la forme"
];

const mentalChallenges = [
  "Relis une page de cours PSI* pendant 5 minutes",
  "Résous 2 exercices simples de maths mentalement",
  "Lis un paragraphe de ton livre Comment travailler plus efficacement",
  "Planifie tes 3 prochaines priorités pour la journée"
];

function generateChallenge(section) {
  const challenges = section === 'physique' ? physiqueChallenges : mentalChallenges;
  const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
  document.getElementById(section + '-challenge').textContent = randomChallenge;
  showMotivation();
}

// Horloge
function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  document.getElementById('date').textContent = now.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
setInterval(updateClock, 1000);
updateClock();

function showMotivation() {
  const motivations = [
    "Chaque défi te rapproche de la maîtrise !",
    "5 minutes de discipline valent mieux que l’inaction.",
    "Ton temps est précieux – prouve-le maintenant !",
    "Un petit pas aujourd’hui, un grand demain."
  ];
  const random = motivations[Math.floor(Math.random() * motivations.length)];
  document.getElementById('motivation').textContent = random;
}

// Init
if (window.location.hash) {
  const page = window.location.hash.substring(1);
  if (page === 'physique' || page === 'mental') {
    goToPage(page);
  }
}

// Service Worker (ajoute ?v=1 pour cache)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js?v=1').then(() => {
    console.log('Service Worker enregistré');
  }).catch(err => console.error('Erreur Service Worker:', err));
}
