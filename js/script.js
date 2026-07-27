// ============================================================
// QUIZZY — HOME PAGE (script.js)
// ============================================================
// Data source ...... fetches ../data/data.json (array of quiz objects)
// Card rendering ... renderQuizCards() builds .quiz-card divs from the array
// Difficulty class .. quiz.category is lowercased; "???" maps to "unknown"
// Card click ....... navigates to quiz.html?id=<index>
// Take Quiz btn .... picks a random quiz index and navigates to quiz.html?id=
// ============================================================

const takeAQuiz = document.querySelector(".take-quiz");
const createAQuiz = document.getElementById("create-quiz");
const quizDashboard = document.querySelector(".dashboard");
let quizzes = [];

async function parseJson() {
  const response = await fetch("../data/data.json");
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  quizzes = data;
  console.log(quizzes);
}

parseJson().then(renderQuizCards);

function renderQuizCards() {
  const quizList = document.querySelector(".quiz-list");
  const cards = quizzes.map((quiz, index) => {
    const difficulty = quiz.category.toLowerCase().replace(/\?\?\?/g, "unknown");
    return `
      <div class="quiz-card" data-index="${index}">
        <span class="pill ${difficulty}">${quiz.category}</span>
        <h3 class="quiz-title">${quiz.title}</h3>
        <p class="quiz-meta">${quiz.amount} questions</p>
      </div>
    `;
  });
  quizList.innerHTML += cards.join("");

  document.querySelectorAll(".quiz-card").forEach((card) => {
    card.addEventListener("click", () => {
      const index = card.dataset.index;
      window.location.href = `quiz.html?id=${index}`;
    });
  });
}

takeAQuiz.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * quizzes.length);
  window.location.href = `quiz.html?id=${randomIndex}`;
});

