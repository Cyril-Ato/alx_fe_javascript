
let quotes = [
  { text: "Stay hungry, stay foolish.", category: "inspiration" },
  { text: "Talk is cheap. Show me the code.", category: "technology" },
  { text: "Be yourself; everyone else is already taken.", category: "life" }
];


const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");


createAddQuoteForm();
showRandomQuote();


newQuoteBtn.addEventListener("click", showRandomQuote);


function showRandomQuote() {
  const category = document.getElementById("categorySelect").value;
  const filtered = category === "all"
    ? quotes
    : quotes.filter(q => q.category === category);

  if (filtered.length === 0) {
    quoteDisplay.innerHTML = `<p>No quotes in this category.</p>`;
    return;
  }

  const randomIndex = Math.floor(Math.random() * filtered.length);
  const quote = filtered[randomIndex];

  quoteDisplay.innerHTML = `
    <blockquote>
      <p>"${quote.text}"</p>
      <footer>Category: ${quote.category}</footer>
    </blockquote>
  `;
}


function createAddQuoteForm() {
  const formContainer = document.createElement("div");
  formContainer.className = "form-area";

  formContainer.innerHTML = `
    <select id="categorySelect">
      <option value="all">All Categories</option>
    </select>
    <div>
      <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
      <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
      <button id="addQuoteBtn">Add Quote</button>
    </div>
  `;

  document.body.insertBefore(formContainer, quoteDisplay);

 
  updateCategorySelect();

  
  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
  document.getElementById("categorySelect").addEventListener("change", showRandomQuote);
}


function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");
  const quoteText = textInput.value.trim();
  const quoteCategory = categoryInput.value.trim().toLowerCase();

  if (!quoteText || !quoteCategory) {
    alert("Please fill both quote and category.");
    return;
  }

  quotes.push({ text: quoteText, category: quoteCategory });

  textInput.value = "";
  categoryInput.value = "";

  updateCategorySelect();
  showRandomQuote();
}


function updateCategorySelect() {
  const categorySelect = document.getElementById("categorySelect");
  const existingOptions = new Set();

  for (let option of categorySelect.options) {
    existingOptions.add(option.value);
  }

  const categories = [...new Set(quotes.map(q => q.category))];

  categories.forEach(cat => {
    if (!existingOptions.has(cat)) {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      categorySelect.appendChild(option);
    }
  });
}
