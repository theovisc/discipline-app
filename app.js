function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  loadChallenges(id);
}

function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  document.getElementById('date').textContent = now.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
setInterval(updateClock, 1000);
updateClock();

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

function loadChallenges(section) {
  const challengesList = document.getElementById(`${section}-challenges`);
  challengesList.innerHTML = '';
  const challenges = section === 'physique' ? physiqueChallenges : mentalChallenges;
  challenges.forEach(challenge => {
    const li = document.createElement('li');
    li.textContent = challenge;
    challengesList.appendChild(li);
  });
}

function startChallenge(section) {
  const challenges = section === 'physique' ? physiqueChallenges : mentalChallenges;
  const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
  alert(`Défi ${section === 'physique' ? 'physique' : 'mental'} : ${randomChallenge}. Vas-y pendant 5 minutes !`);
  showMotivation();
}

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

// Chargement initial
showSection('physique');

// Enregistrement du Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(() => {
    console.log('Service Worker enregistré');
  }).catch(err => console.error('Erreur Service Worker:', err));
}
