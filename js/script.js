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
  const cards = quizzes.map((quiz) => {
    const difficulty = quiz.category.toLowerCase();
    return `
      <div class="quiz-card">
        <span class="pill ${difficulty}">${quiz.category}</span>
        <h3 class="quiz-title">${quiz.title}</h3>
        <p class="quiz-meta">${quiz.amount} questions</p>
      </div>
    `;
  });
  quizList.innerHTML += cards.join("");
}

takeAQuiz.addEventListener("click", ()=>{
  window.location.href = "quiz.html";
})

