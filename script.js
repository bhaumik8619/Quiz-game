const questions = [
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "New Delhi", "Bangalore", "Kolkata"],
    answer: 1
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: 2
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Leo Tolstoy", "William Shakespeare", "Charles Dickens", "Mark Twain"],
    answer: 1
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    answer: 2
  },
  {
    question: "Which gas do plants absorb?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: 2
  },
  {
    question: "Which is the longest river in the world?",
    options: ["Amazon", "Nile", "Ganga", "Yangtze"],
    answer: 1
  },
  {
    question: "Who invented the light bulb?",
    options: ["Nikola Tesla", "Thomas Edison", "James Watt", "Isaac Newton"],
    answer: 1
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: 3
  },
  {
    question: "What does CSS stand for?",
    options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
    answer: 1
  },
  {
    question: "Which HTML tag is used for inserting an image?",
    options: ["<img>", "<image>", "<src>", "<pic>"],
    answer: 0
  }
];

// Shuffle the questions randomly
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let shuffledQuestions = shuffle([...questions]);
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;

const questionEl = document.getElementById("question");
const optionBtns = document.querySelectorAll(".option-btn");
const feedback = document.getElementById("feedback");
const timerEl = document.getElementById("timer");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");
const quizBox = document.getElementById("quiz-box");

function loadQuestion() {
  console.clear();
  clearInterval(timer);
  timeLeft = 10;
  timerEl.textContent = `⏱ ${timeLeft}`;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `⏱ ${timeLeft}`;
    if (timeLeft <= 0) {
      console.log("⏳ Time expired! Moving to next question...");
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);

  const q = shuffledQuestions[currentQuestion];
  questionEl.textContent = q.question;
  optionBtns.forEach((btn, i) => {
    btn.textContent = q.options[i];
    btn.disabled = false;
    btn.style.backgroundColor = "";
  });
  feedback.textContent = "";

  // Console log for developers
  console.log(`Question ${currentQuestion + 1}: ${q.question}`);
  q.options.forEach((opt, i) => console.log(`  ${i + 1}. ${opt}`));
  console.log(`Answer: ${q.options[q.answer]}`);
}

function selectOption(index) {
  console.log(`You selected: ${shuffledQuestions[currentQuestion].options[index]}`);
  const q = shuffledQuestions[currentQuestion];
  optionBtns.forEach(btn => btn.disabled = true);

  if (index === q.answer) {
    feedback.textContent = "✅ Correct!";
    console.log("✅ Correct answer!");
    feedback.style.color = "green";
    score++;
    optionBtns[index].style.backgroundColor = "green";
  } else {
    feedback.textContent = `❌ Wrong! Correct: ${q.options[q.answer]}`;
    console.log("❌ Wrong answer!");
    feedback.style.color = "red";
    optionBtns[index].style.backgroundColor = "red";
    optionBtns[q.answer].style.backgroundColor = "green";
  }

  clearInterval(timer);
}

function nextQuestion() {
  if (currentQuestion < shuffledQuestions.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    showResult();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

function showResult() {
  console.log(`🎉 Final Score: ${score}/${shuffledQuestions.length}`);
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = score;
}

function restartQuiz() {
  score = 0;
  currentQuestion = 0;
  shuffledQuestions = shuffle([...questions]);
  quizBox.classList.remove("hidden");
  resultBox.classList.add("hidden");
  loadQuestion();
}

// Theme toggle
document.getElementById("themeSwitch").addEventListener("change", function () {
  document.body.classList.toggle("dark");
});

// Load first question on start
loadQuestion();
