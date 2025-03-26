// Define the main Jeopardy question bank
const questionBank = {
    "History": [
        ["What year did World War I start?", "1914"],
        ["Who was the first President of the United States?", "George Washington"]
    ],
    "Science": [
        ["What is the chemical symbol for water?", "H2O"],
        ["What planet is known as the Red Planet?", "Mars"]
    ]
};

// Function to get daily Jeopardy questions
function getDailyJeopardyQuestions(questionBank) {
    let today = new Date();
    let dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    
    let categoryNames = Object.keys(questionBank);
    let totalCategories = categoryNames.length;
    
    let startIndex = dayOfWeek % totalCategories;
    let dailyCategories = [];
    for (let i = 0; i < 2; i++) { // Adjusted for demo
        dailyCategories.push(categoryNames[(startIndex + i) % totalCategories]);
    }

    let dailyQuestions = {};
    dailyCategories.forEach(category => {
        let questionSets = questionBank[category];
        let chosenSet = questionSets[dayOfWeek % questionSets.length]; 
        dailyQuestions[category] = {
            200: chosenSet[0],
            400: chosenSet[1]
        };
    });

    return dailyQuestions;
}

// Global variable for daily questions
let dailyJeopardyQuestions = {};

// Function to generate the Jeopardy board
function generateBoard() {
    dailyJeopardyQuestions = getDailyJeopardyQuestions(questionBank);

    const board = document.getElementById("jeopardy-board");
    board.innerHTML = '';

    // Generate the category headers
    Object.keys(dailyJeopardyQuestions).forEach(category => {
        let header = document.createElement("div");
        header.className = "category";
        header.innerText = category;
        board.appendChild(header);
    });

    // Generate question buttons
    [200, 400].forEach(points => {
        Object.keys(dailyJeopardyQuestions).forEach(category => {
            let button = document.createElement("button");
            button.className = "question";
            button.innerText = `$${points}`;
            button.setAttribute("data-category", category);
            button.setAttribute("data-points", points);
            button.onclick = showQuestion;
            board.appendChild(button);
        });
    });
}

// Function to show question
function showQuestion(event) {
    let button = event.target;
    let category = button.getAttribute("data-category");
    let points = parseInt(button.getAttribute("data-points"));

    let questionText = dailyJeopardyQuestions[category][points][0];
    document.getElementById("question-text").innerText = questionText;
    document.getElementById("popup").style.display = "block";
}

// Function to show answer
function showAnswer() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("answer-popup").style.display = "block";
}

// Add event listener for start game button
document.getElementById("start-game").addEventListener("click", generateBoard);

// Add event listener for add team button
document.getElementById("add-team").addEventListener("click", function() {
    let teamContainer = document.getElementById("team-container");
    let teamInput = document.createElement("input");
    teamInput.type = "text";
    teamInput.placeholder = "Enter Team Name";
    teamContainer.appendChild(teamInput);
});
