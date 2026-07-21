const takeAQuiz = document.getElementById("take-quiz");
const createAQuiz = document.getElementById("create-quiz");
const quizDashboard = document.querySelector(".dashboard");

let quizzes = [];

async function parseJson() {
  const response = await fetch("../data/data.json");
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  quizzes = data;
  console.log(quizzes.length);
}

parseJson();
