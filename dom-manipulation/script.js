const API_URL = 'https://jsonplaceholder.typicode.com/posts';
let quotes = [];


function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}


function fetchQuotesFromServer() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const serverQuotes = data.slice(0, 5).map(item => ({
        text: item.title,
        category: 'server',
        id: item.id
      }));

      resolveConflicts(serverQuotes);
    })
    .catch(err => console.error('Failed to fetch server quotes:', err));
}


function resolveConflicts(serverQuotes) {
  const merged = serverQuotes.slice();

  quotes.forEach(local => {
    if (!serverQuotes.some(server => server.text === local.text)) {
      merged.push(local);
    }
  });

  if (JSON.stringify(merged) !== JSON.stringify(quotes)) {
    quotes = merged;
    saveQuotes();
    populateCategories();
    filterQuotes();
    showNotification();
  }
}


function showNotification() {
  const note = document.getElementById('notification');
  if (note) note.style.display = 'block';
}

function clearNotification() {
  const note = document.getElementById('notification');
  if (note) note.style.display = 'none';
}


function loadQuotes() {
  const stored = localStorage.getItem('quotes');
  quotes = stored ? JSON.parse(stored) : [];
}


function showRandomQuote() {
  if (quotes.length === 0) return;
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('quoteDisplay').innerHTML =
    `<blockquote>${quote.text}</blockquote><p><em>${quote.category}</em></p>`;
}


function addQuote() {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();

  if (!text || !category) return alert('Please enter both quote and category.');

  quotes.push({ text, category });
  saveQuotes();
  populateCategories();
  filterQuotes();

  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';
}


function populateCategories() {
  const select = document.getElementById('categoryFilter');
  if (!select) return;

  const categories = [...new Set(quotes.map(q => q.category))];
  select.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });

  const savedFilter = localStorage.getItem('selectedCategory') || 'all';
  select.value = savedFilter;
}


function filterQuotes() {
  const filter = document.getElementById('categoryFilter').value;
  localStorage.setItem('selectedCategory', filter);
  const filtered = filter === 'all' ? quotes : quotes.filter(q => q.category === filter);

  const display = document.getElementById('quoteDisplay');
  display.innerHTML = filtered.length
    ? filtered.map(q => `<blockquote>${q.text}</blockquote><p><em>${q.category}</em></p>`).join('<hr>')
    : '<p>No quotes available.</p>';
}


function init() {
  loadQuotes();
  populateCategories();
  filterQuotes();
  fetchQuotesFromServer(); 
  setInterval(fetchQuotesFromServer, 300000); 
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);
window.onload = init;
