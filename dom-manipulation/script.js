let quotes = [];

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function loadQuotes() {
  const stored = localStorage.getItem('quotes');
  quotes = stored ? JSON.parse(stored) : [];
}

function displayQuotes(list) {
  const display = document.getElementById('quoteDisplay');
  display.innerHTML = '';

  if (list.length === 0) {
    display.innerHTML = '<p>No quotes available in this category.</p>';
    return;
  }

  list.forEach(quote => {
    const quoteDiv = document.createElement('div');
    quoteDiv.innerHTML = `<blockquote>"${quote.text}"</blockquote><p><em>- ${quote.category}</em></p>`;
    display.appendChild(quoteDiv);
  });
}

function showRandomQuote() {
  if (quotes.length === 0) return;
  const category = document.getElementById('categoryFilter').value;
  const pool = category === 'all' ? quotes : quotes.filter(q => q.category === category);
  if (pool.length === 0) return;

  const random = pool[Math.floor(Math.random() * pool.length)];
  const display = document.getElementById('quoteDisplay');
  display.innerHTML = `<blockquote>"${random.text}"</blockquote><p><em>- ${random.category}</em></p>`;

  sessionStorage.setItem('lastViewedQuote', JSON.stringify(random));
}

function addQuote() {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();

  if (!text || !category) {
    alert("Please enter both a quote and a category.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();
  populateCategories();
  displayQuotes(quotes);

  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';
}

function populateCategories() {
  const filter = document.getElementById('categoryFilter');
  const selectedBefore = filter.value;

  const categories = [...new Set(quotes.map(q => q.category))];
  filter.innerHTML = '<option value="all">All Categories</option>';

  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    filter.appendChild(opt);
  });

  const lastSaved = localStorage.getItem('selectedCategory');
  filter.value = lastSaved || selectedBefore || 'all';
}

function filterQuotes() {
  const selected = document.getElementById('categoryFilter').value;
  localStorage.setItem('selectedCategory', selected);
  const filtered = selected === 'all' ? quotes : quotes.filter(q => q.category === selected);
  displayQuotes(filtered);
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);

window.onload = function () {
  loadQuotes();
  populateCategories();
  const lastCategory = localStorage.getItem('selectedCategory');
  if (lastCategory) {
    document.getElementById('categoryFilter').value = lastCategory;
  }
  filterQuotes();

  const lastQuote = sessionStorage.getItem('lastViewedQuote');
  if (lastQuote) {
    const q = JSON.parse(lastQuote);
    document.getElementById('quoteDisplay').innerHTML =
      `<blockquote>"${q.text}"</blockquote><p><em>- ${q.category}</em></p>`;
  }
};
