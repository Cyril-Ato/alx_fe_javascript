
const quotes = [
  { text: "Believe in yourself!", category: "Motivation" },
  { text: "Stay curious.", category: "Education" },
  { text: "Think before you speak.", category: "Wisdom" },
  { text: "Simplicity is the ultimate sophistication.", category: "Design" }
];


const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const categorySelect = document.getElementById("categorySelect");


function showRandomQuote() {
  const selectedCategory = categorySelect.value;
  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerText = "No quotes in this category.";
    return;
  }

  const random = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[random];
  quoteDisplay.innerText = `"${quote.text}" — ${quote.category}`;
}


function createAddQuoteForm() {
  const formDiv = document.getElementById("addQuoteForm");

  const textInput = document.createElement("input");
  textInput.id = "newQuoteText";
  textInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.innerText = "Add Quote";
  addButton.onclick = addQuote;

  formDiv.appendChild(textInput);
  formDiv.appendChild(categoryInput);
  formDiv.appendChild(addButton);
}


function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value.trim();
  const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (!quoteText || !quoteCategory) {
    alert("Both fields are required.");
    return;
  }

  const newQuote = { text: quoteText, category: quoteCategory };
  quotes.push(newQuote);

  
  if (![...categorySelect.options].some(opt => opt.value === quoteCategory)) {
    const newOption = document.createElement("option");
    newOption.value = quoteCategory;
    newOption.innerText = quoteCategory;
    categorySelect.appendChild(newOption);
  }

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
  alert("Quote added!");
}


document.addEventListener("DOMContentLoaded", () => {
  createAddQuoteForm();
  showRandomQuote();
  newQuoteBtn.addEventListener("click", showRandomQuote);
});
