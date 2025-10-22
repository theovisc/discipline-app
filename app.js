let timerInterval;
let remainingTime = 0;

function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function addLog(section) {
  const input = document.getElementById(`${section}-input`);
  const logs = document.getElementById(`${section}-logs`);
  if (input.value.trim() === '') return;
  
  const li = document.createElement('li');
  li.textContent = input.value;
  const delBtn = document.createElement('button');
  delBtn.textContent = 'Supprimer';
  delBtn.onclick = () => { li.remove(); updateProgress(section); saveData(); };
  li.appendChild(delBtn);
  logs.appendChild(li);
  
  input.value = '';
  updateProgress(section);
  saveData();
  showMotivation();
}

function addTask() {
  const input = document.getElementById('task-input');
  const list = document.getElementById('task-list');
  if (input.value.trim() === '') return;
  
  const li = document.createElement('li');
  li.textContent = input.value;
  const delBtn = document.createElement('button');
  delBtn.textContent = 'Fait';
  delBtn.onclick = () => { li.remove(); saveData(); };
  li.appendChild(delBtn);
  list.appendChild(li);
  
  input.value = '';
  saveData();
}

function updateProgress(section) {
  const logs = document.getElementById(`${section}-logs`).children.length;
  document.getElementById(`${section}-progress`).textContent = `Progrès: ${logs} sessions aujourd'hui`;
}

function startTimer(seconds) {
  stopTimer();
  remainingTime = seconds;
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    remainingTime--;
    updateTimerDisplay();
    if (remainingTime <= 0) {
      stopTimer();
      alert('Temps écoulé !');
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) clearInterval(timerInterval);
}

function updateTimerDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  document.getElementById('time-display').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function saveData() {
  const data = {
    physique: document.getElementById('physique-logs').innerHTML,
    mental: document.getElementById('mental-logs').innerHTML,
    tasks: document.getElementById('task-list').innerHTML
  };
  localStorage.setItem('disciplineData', JSON.stringify(data));
}

function loadData() {
  const data = JSON.parse(localStorage.getItem('disciplineData'));
  if (data) {
    document.getElementById('physique-logs').innerHTML = data.physique;
    document.getElementById('mental-logs').innerHTML = data.mental;
    document.getElementById('task-list').innerHTML = data.tasks;
    updateProgress('physique');
    updateProgress('mental');
    addDeleteListeners();
  }
  showMotivation();
}

function addDeleteListeners() {
  document.querySelectorAll('li button').forEach(btn => {
    btn.onclick = () => {
      btn.parentElement.remove();
      updateProgress(btn.parentElement.parentElement.id.split('-')[0]);
      saveData();
    };
  });
}

function resetData() {
  if (confirm('Réinitialiser toutes les données ?')) {
    localStorage.removeItem('disciplineData');
    location.reload();
  }
}

function showMotivation() {
  const motivations = [
    'Le temps est précieux – maîtrise-le !',
    'Chaque session compte pour ta prépa PSI*.',
    'Discipline aujourd’hui = succès demain.',
    'Ne gâche pas une minute de plus.'
  ];
  const random = motivations[Math.floor(Math.random() * motivations.length)];
  document.getElementById('motivation').textContent = random;
}

// Chargement initial
loadData();
showSection('physique');

// Enregistrement du Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(() => {
    console.log('Service Worker enregistré');
  }).catch(err => console.error('Erreur Service Worker:', err));
}