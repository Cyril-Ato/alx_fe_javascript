const API_URL = 'https://jsonplaceholder.typicode.com/posts';
let quotes = [];
let lastServerData = [];

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

async function fetchServerQuotes() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    const serverData = data.slice(0, 5).map(item => ({
      text: item.title,
      category: 'server',
      id: item.id
    }));
    
    resolveConflicts(serverData);
  } catch (err) {
    console.error('Server fetch failed:', err);
  }
}

function resolveConflicts(serverData) {
  const merged = serverData.slice(); 

  quotes.forEach(local => {
    if (!serverData.some(s => s.text === local.text)) {
      merged.push(local);
    }
  });

  const changes = JSON.stringify(merged) !== JSON.stringify(quotes);
  quotes = merged;

  if (changes) {
    saveQuotes();
    populateCategories();
    filterQuotes();
    showNotification();
  }
}

function showNotification() {
  document.getElementById('notification').style.display = 'block';
}

function clearNotification() {
  document.getElementById('notification').style.display = 'none';
}

function loadQuotes() {
  const stored = localStorage.getItem('quotes');
  quotes = stored ? JSON.parse(stored) : [];
}

function displayQuotes(list) {
  
}

function showRandomQuote() {
 
}

function addQuote() {
  
}

function populateCategories() {
  
}

function filterQuotes() {
  
}

async function init() {
  loadQuotes();
  populateCategories();
  filterQuotes();

  await fetchServerQuotes();  

  setInterval(fetchServerQuotes, 300000); 
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);
window.onload = init;
