// Sample Questions Object
const questions = {
  "Harry Potter": {
    100: "What house at Hogwarts values bravery and courage?",
    200: "What is the name of the three-headed dog guarding the Sorcerer’s Stone?",
    300: "What is the spell used to summon objects?",
    400: "Who was the Half-Blood Prince?",
    500: "Who was Draco Malfoy's date at the Yule Ball?"
  },
  "Star Wars": {
    100: "What is the name of Han Solo’s ship?",
    200: "Who is Luke Skywalker’s twin sister?",
    300: "What is the name of the Mandalorian’s small green companion?",
    400: "Who was Darth Vader’s master before he turned to the dark side?",
    500: "What species is Grand Admiral Thrawn?"
  },
  "Science": {
    100: "What planet is known as the Red Planet?",
    200: "What is the powerhouse of the cell?",
    300: "What type of energy is produced by a moving object?",
    400: "What is the chemical symbol for gold?",
    500: "What is the name of the largest known volcano in our solar system?"
  },
  "Law": {
    100: "What is the highest court in the United States?",
    200: "What is the legal term for spoken defamation?",
    300: "How many amendments are in the U.S. Constitution?",
    400: "What is the term for a court order requiring someone to appear in court?",
    500: "What landmark case established the principle of judicial review?"
  },
  "Weather": {
    100: "What is the term for frozen raindrops that form in strong thunderstorms?",
    200: "What scale is used to measure hurricane intensity?",
    300: "What layer of the atmosphere contains the ozone layer?",
    400: "What effect causes moving air and water to turn due to Earth’s rotation?",
    500: "What is the rare weather phenomenon where rain evaporates before hitting the ground?"
  }
};

// Store scores
const scores = {
  "Team 1": 0,
  "Team 2": 0,
  "Team 3": 0,
  "Team 4": 0
};

// Function to show the question when a button is clicked
function showQuestion(category, points) {
  const questionContainer = document.getElementById('question-container');
  const questionText = questions[category][points];
  
  // Show the question
  questionContainer.innerHTML = `
    <h2>${questionText}</h2>
    <button id="reveal-answer" onclick="revealAnswer('${category}', ${points})">Tap to Reveal Answer</button>
    <div id="answer-container"></div>
  `;
}

// Function to reveal the answer
function revealAnswer(category, points) {
  const answer = getAnswer(category, points); // Get the answer
  const answerContainer = document.getElementById('answer-container');

  answerContainer.innerHTML = `
    <p>The answer is: ${answer}</p>
    <button onclick="markCorrect('${category}', ${points}, 'Correct')">Correct</button>
    <button onclick="markCorrect('${category}', ${points}, 'Incorrect')">Incorrect</button>
    <select id="team-select">
      <option value="Team 1">Team 1</option>
      <option value="Team 2">Team 2</option>
      <option value="Team 3">Team 3</option>
      <option value="Team 4">Team 4</option>
    </select>
  `;
}

// Function to get the correct answer (you can customize this)
function getAnswer(category, points) {
  const answers = {
    "Harry Potter": {
      100: "Gryffindor",
      200: "Fluffy",
      300: "Accio",
      400: "Severus Snape",
      500: "Pansy Parkinson"
    },
    "Star Wars": {
      100: "Millennium Falcon",
      200: "Princess Leia",
      300: "Grogu",
      400: "Obi-Wan Kenobi",
      500: "Chiss"
    },
    "Science": {
      100: "Mars",
      200: "Mitochondrion",
      300: "Kinetic Energy",
      400: "Au",
      500: "Olympus Mons"
    },
    "Law": {
      100: "Supreme Court",
      200: "Slander",
      300: "27",
      400: "Subpoena",
      500: "Marbury v. Madison"
    },
    "Weather": {
      100: "Hail",
      200: "Saffir-Simpson scale",
      300: "Stratosphere",
      400: "Coriolis effect",
      500: "Virga"
    }
  };

  return answers[category][points];
}

// Function to mark the answer as correct or incorrect and assign points to a team
function markCorrect(category, points, status) {
  const teamSelect = document.getElementById('team-select');
  const team = teamSelect.value;
  const scoreElement = document.getElementById(`${team.toLowerCase()}-score`);
  
  if (status === 'Correct') {
    scores[team] += points;
  } else {
    scores[team] -= points;
  }

  // Update the scoreboard
  updateScoreboard();
  alert(`${team} answered ${status} for ${points} points!`);
}

// Function to update the scoreboard
function updateScoreboard() {
  for (const team in scores) {
    document.getElementById(`${team.toLowerCase()}-score`).textContent = scores[team];
  }
}

// Function to create the board dynamically
function createBoard() {
  const board = document.querySelector('.board');
  const categories = Object.keys(questions);
  categories.forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category');
    
    // Create category button
    const categoryButton = document.createElement('button');
    categoryButton.classList.add('category-btn');
    categoryButton.innerText = category;
    categoryButton.disabled = true;  // Disable the category button
    categoryDiv.appendChild(categoryButton);
    
    // Create question buttons for each category
    const points = [100, 200, 300, 400, 500];
    points.forEach(point => {
      const questionButton = document.createElement('button');
      questionButton.classList.add('question-btn');
      questionButton.innerText = point;
      questionButton.onclick = () => showQuestion(category, point);
      categoryDiv.appendChild(questionButton);
    });
    board.appendChild(categoryDiv);
  });
}

// Call the function to create the board when the page loads
window.onload = createBoard;
