const quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Creativity is intelligence having fun.", category: "Inspiration" },
  { text: "Be yourself; everyone else is already taken.", category: "Wisdom" }
];

const quoteDisplay = document.getElementById("quoteDisplay");
const categorySelect = document.getElementById("categorySelect");
const formContainer = document.getElementById("formContainer");
const newQuoteBtn = document.getElementById("newQuote");


function showRandomQuote() {
  const selectedCategory = categorySelect.value;
  const filteredQuotes = quotes.filter(q => q.category === selectedCategory);
  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes found in this category.</p>";
    return;
  }
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  quoteDisplay.innerHTML = `<p>"${quote.text}" — <em>${quote.category}</em></p>`;
}


function updateCategorySelect() {
  const categories = [...new Set(quotes.map(q => q.category))];
  categorySelect.innerHTML = categories.map(
    cat => `<option value="${cat}">${cat}</option>`
  ).join('');
}


function createAddQuoteForm() {
  formContainer.innerHTML = `
    <h2>Add a New Quote</h2>
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button onclick="addQuote()">Add Quote</button>
  `;
}


function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!quoteText || !category) {
    alert("Please enter both quote and category.");
    return;
  }

  quotes.push({ text: quoteText, category });
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
  updateCategorySelect();
  alert("Quote added successfully!");
}


createAddQuoteForm();
updateCategorySelect();
newQuoteBtn.addEventListener("click", showRandomQuote);
