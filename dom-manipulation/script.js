let quotes = [];

async function fetchQuotesFromServer() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();

    
    const serverQuotes = data.slice(0, 5).map(post => ({
      text: post.title,
      category: 'server'
    }));

    return serverQuotes;
  } catch (error) {
    console.error('Error fetching quotes from server:', error);
    return [];
  }
}

async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();

  const localQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');

  
  const mergedQuotes = [...serverQuotes, ...localQuotes.filter(local =>
    !serverQuotes.some(server => server.text === local.text)
  )];

  quotes = mergedQuotes;
  localStorage.setItem('quotes', JSON.stringify(quotes));
  displayQuotes();
  populateCategories();
  console.log('Quotes synced with server.');
}

function displayQuotes(category = 'all') {
  const display = document.getElementById('quoteDisplay');
  const filtered = category === 'all' ? quotes : quotes.filter(q => q.category === category);

  display.innerHTML = '';
  filtered.forEach((q, i) => {
    const p = document.createElement('p');
    p.textContent = `"${q.text}" - ${q.category}`;
    display.appendChild(p);
  });
}

function addQuote() {
  const text = document.getElementById('newQuoteText').value;
  const category = document.getElementById('newQuoteCategory').value;

  if (!text || !category) return;

  const newQuote = { text, category };
  quotes.push(newQuote);
  localStorage.setItem('quotes', JSON.stringify(quotes));
  displayQuotes();
  populateCategories();
}

function populateCategories() {
  const select = document.getElementById('categoryFilter');
  const categories = [...new Set(quotes.map(q => q.category))];

  select.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });

  const savedFilter = localStorage.getItem('selectedCategory');
  if (savedFilter) {
    select.value = savedFilter;
    filterQuotes();
  }
}

function filterQuotes() {
  const selected = document.getElementById('categoryFilter').value;
  localStorage.setItem('selectedCategory', selected);
  displayQuotes(selected);
}


document.addEventListener('DOMContentLoaded', () => {
  const stored = localStorage.getItem('quotes');
  quotes = stored ? JSON.parse(stored) : [];
  displayQuotes();
  populateCategories();
  syncQuotes(); // 

  document.getElementById('newQuote').addEventListener('click', () => {
    const category = document.getElementById('categoryFilter')?.value || 'all';
    const filtered = category === 'all' ? quotes : quotes.filter(q => q.category === category);
    if (filtered.length > 0) {
      const random = filtered[Math.floor(Math.random() * filtered.length)];
      document.getElementById('quoteDisplay').innerHTML = `<p>"${random.text}" - ${random.category}</p>`;
    }
  });
});
