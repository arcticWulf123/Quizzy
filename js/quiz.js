const quizNumber = document.querySelector(".quiz-number");
const progressPercentage = document.querySelector(".progress-percentage");
const progressBar = document.querySelector(".progress-bar");
const questionEl = document.querySelector(".question");
const choiceBtns = document.querySelectorAll(".choice");

let currentQuiz = null;
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

async function loadQuiz() {
  const params = new URLSearchParams(window.location.search);
  const quizId = parseInt(params.get("id"));

  if (isNaN(quizId)) {
    window.location.href = "index.html";
    return;
  }

  const response = await fetch("data/data.json");
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const quizzes = await response.json();

  if (quizId < 0 || quizId >= quizzes.length) {
    window.location.href = "index.html";
    return;
  }

  currentQuiz = quizzes[quizId];
  progressBar.textContent = "";
  renderQuestion();
}

function renderQuestion() {
  answered = false;
  const question = currentQuiz.questions[currentQuestionIndex];
  const total = currentQuiz.questions.length;

  quizNumber.textContent = `${currentQuiz.title} — Question ${currentQuestionIndex + 1} of ${total}`;
  progressPercentage.textContent = `${Math.round(((currentQuestionIndex) / total) * 100)}%`;
  progressBar.style.width = `${(currentQuestionIndex / total) * 100}%`;

  questionEl.textContent = question.question;

  choiceBtns.forEach((btn, i) => {
    btn.textContent = question.options[i];
    btn.className = "choice";
    btn.disabled = false;
    btn.onclick = () => handleAnswer(i);
  });
}

function handleAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const question = currentQuiz.questions[currentQuestionIndex];
  const correctIndex = question.correctIndex;
  const total = currentQuiz.questions.length;

  choiceBtns.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIndex) {
      btn.classList.add("correct");
    }
    if (i === selectedIndex && i !== correctIndex) {
      btn.classList.add("wrong");
    }
  });

  if (selectedIndex === correctIndex) {
    score++;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < total) {
      renderQuestion();
    } else {
      showResults();
    }
  }, 1500);
}

function showResults() {
  const total = currentQuiz.questions.length;
  const percentage = Math.round((score / total) * 100);

  progressBar.style.width = "100%";
  progressPercentage.textContent = "100%";
  quizNumber.textContent = `${currentQuiz.title} — Complete`;

  questionEl.textContent = `You scored ${score} out of ${total} (${percentage}%)`;

  choiceBtns.forEach((btn) => {
    btn.style.display = "none";
  });

  const resultsDiv = document.querySelector(".choices");
  const backBtn = document.createElement("button");
  backBtn.className = "back-btn";
  backBtn.textContent = "Back to Quizzes";
  backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
  resultsDiv.appendChild(backBtn);
  resultsDiv.style.display = "flex";
  resultsDiv.style.justifyContent = "center";
}

loadQuiz();
