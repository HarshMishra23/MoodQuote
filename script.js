const quotes = {
  happy: [
    "Happiness is a choice, not a result.",
    "The purpose of our lives is to be happy.",
    "Smile, it’s free therapy."
  ],
  sad: [
    "Tears come from the heart and not from the brain.",
    "Sadness flies away on the wings of time.",
    "It’s okay to feel sad sometimes."
  ],
  neutral: [
    "Life is like riding a bicycle. To keep your balance you must keep moving.",
    "This too shall pass.",
    "Every day is a second chance."
  ],
  angry: [
    "For every minute you remain angry, you give up sixty seconds of peace.",
    "Anger is one letter short of danger.",
    "Control your anger, or it will control you."
  ]
};

let currentMood = null;
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const quoteEl = document.getElementById("quote");
const buttons = document.querySelectorAll(".mood-buttons button");
const newQuoteBtn = document.getElementById("new-quote");
const saveQuoteBtn = document.getElementById("save-quote");
const copyQuoteBtn = document.getElementById("copy-quote");
const addCustomQuoteBtn = document.getElementById("add-custom-quote");
const showFavoritesBtn = document.getElementById("show-favorites");
const favoritesList = document.getElementById("favorites-list");
const customQuoteInput = document.getElementById("custom-quote");
const themeToggle = document.getElementById("toggle-theme");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const mood = btn.dataset.mood;
    if (mood) {
      currentMood = mood;
      showQuote();
    } else if (btn.id === "toggle-theme") {
      document.body.classList.toggle("dark");
    }
  });
});

newQuoteBtn.addEventListener("click", showQuote);

saveQuoteBtn.addEventListener("click", () => {
  const quote = quoteEl.textContent;
  if (!favorites.includes(quote)) {
    favorites.push(quote);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
});

copyQuoteBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteEl.textContent);
});

addCustomQuoteBtn.addEventListener("click", () => {
  const text = customQuoteInput.value.trim();
  if (text && currentMood) {
    quotes[currentMood].push(text);
    customQuoteInput.value = "";
    showQuote();
  }
});

showFavoritesBtn.addEventListener("click", () => {
  favoritesList.innerHTML = "";
  favorites.forEach((fav) => {
    const li = document.createElement("li");
    li.textContent = fav;
    favoritesList.appendChild(li);
  });
});

function showQuote() {
  if (currentMood) {
    const moodQuotes = quotes[currentMood];
    const random = Math.floor(Math.random() * moodQuotes.length);
    quoteEl.textContent = moodQuotes[random];
  }
}
