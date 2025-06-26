const quoteDisplay = document.getElementById('quoteDisplay');
const categorySelect = document.getElementById('categorySelect');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
const newQuoteButton = document.getElementById('newQuote');

let quotes = [
  { text: "Success usually comes to those who are too busy to be looking for it.", category: "motivation" },
  { text: "If you’re going through hell, keep going.", category: "motivation" },
  { text: "Always borrow money from a pessimist. He won’t expect it back.", category: "humor" },
  { text: "I find television very educating. Every time somebody turns on the set, I go into the other room and read a book.", category: "humor" }
];


function updateCategorySelect() {
  const categories = [...new Set(quotes.map(q => q.category))];
  categorySelect.innerHTML = "";
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category[0].toUpperCase() + category.slice(1);
    categorySelect.appendChild(option);
  });
}


function showRandomQuote() {
  const selectedCategory = categorySelect.value;
  const filteredQuotes = quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available in this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];
  quoteDisplay.textContent = `"${randomQuote.text}" — ${randomQuote.category}`;
}


function addQuote() {
  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim().toLowerCase();

  if (!text || !category) {
    alert("Please fill in both fields.");
    return;
  }

  quotes.push({ text, category });
  updateCategorySelect();
  newQuoteText.value = "";
  newQuoteCategory.value = "";
  alert("Quote added!");
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);


updateCategorySelect();
