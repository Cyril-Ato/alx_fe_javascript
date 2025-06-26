const API_URL = 'https://jsonplaceholder.typicode.com/posts';
let quotes = [];

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function loadQuotes() {
  const stored = localStorage.getItem('quotes');
  quotes = stored ? JSON.parse(stored) : [];
}

async function fetchQuotesFromServer() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    const serverQuotes = data.slice(0, 5).map(item => ({
      text: item.title,
      category: 'server',
      id: item.id
    }));

    resolveConflicts(serverQuotes);
  } catch (err) {
    console.error('Fetch failed:', err);
  }
}

function resolveConflicts(serverQuotes) {
  const merged = [...serverQuotes];

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

async function postQuoteToServer(quote) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quote)
    });

    const result = await res.json();
    console.log('Quote posted to server:', result);
  } catch (err) {
    console.error('Failed to post quote:', err);
  }
}

function addQuote() {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();

  if (!text || !category) return alert('Please enter both fields.');

  const newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotes();
  populateCategories();
  filterQuotes();
  postQuoteToServer(newQuote); 

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

function showRandomQuote() {
  if (quotes.length === 0) return;
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('quoteDisplay').innerHTML =
    `<blockquote>${quote.text}</blockquote><p><em>${quote.category}</em></p>`;
}

async function init() {
  loadQuotes();
  populateCategories();
  filterQuotes();
  await fetchQuotesFromServer();
  setInterval(fetchQuotesFromServer, 300000);
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);
window.onload = init;
