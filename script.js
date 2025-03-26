// Define the main Jeopardy question bank
const questionBank = {
    "History": [
        ["What year did World War I start?", "1914"],
        ["Who was the first President of the United States?", "George Washington"],
        ["Who wrote the Declaration of Independence?", "Thomas Jefferson"],
        ["In what year did the Titanic sink?", "1912"],
        ["Who was the first man to walk on the moon?", "Neil Armstrong"],
        ["What year did the Berlin Wall fall?", "1989"],
        ["In what year was the Magna Carta signed?", "1215"],
        ["Who was the leader of the Soviet Union during World War II?", "Joseph Stalin"],
        ["What event triggered the start of World War II?", "The invasion of Poland"],
        ["Who was the leader of Nazi Germany?", "Adolf Hitler"]
    ],
    "Science": [
        ["What is the chemical symbol for water?", "H2O"],
        ["What planet is known as the Red Planet?", "Mars"],
        ["Who developed the theory of relativity?", "Albert Einstein"],
        ["What gas do plants absorb from the atmosphere?", "Carbon dioxide"],
        ["What is the chemical symbol for gold?", "Au"],
        ["What element does 'O' represent on the periodic table?", "Oxygen"],
        ["What is the hardest natural substance on Earth?", "Diamond"],
        ["What is the most abundant gas in the Earth's atmosphere?", "Nitrogen"],
        ["What organ in the human body is primarily responsible for pumping blood?", "Heart"],
        ["What is the process by which plants make their food?", "Photosynthesis"]
    ],
    "Literature": [
        ["Who wrote 'Hamlet'?", "William Shakespeare"],
        ["Who wrote 'Moby Dick'?", "Herman Melville"],
        ["Who wrote '1984'?", "George Orwell"],
        ["Who wrote 'Pride and Prejudice'?", "Jane Austen"],
        ["What is the name of the wizard in 'The Lord of the Rings'?", "Gandalf"],
        ["Who wrote 'The Great Gatsby'?", "F. Scott Fitzgerald"],
        ["Who wrote 'The Catcher in the Rye'?", "J.D. Salinger"],
        ["What is the title of the first Harry Potter book?", "Harry Potter and the Sorcerer's Stone"],
        ["Who wrote 'The Odyssey'?", "Homer"],
        ["Who wrote 'The Hunger Games'?", "Suzanne Collins"]
    ],
    "Geography": [
        ["What is the capital of France?", "Paris"],
        ["What is the longest river in the world?", "The Nile"],
        ["Which country is known as the Land of the Rising Sun?", "Japan"],
        ["Which desert is the largest in the world?", "Sahara"],
        ["What is the tallest mountain in the world?", "Mount Everest"],
        ["Which country has the most population?", "China"],
        ["What is the capital of Canada?", "Ottawa"],
        ["What is the smallest country in the world?", "Vatican City"],
        ["What is the largest country by land area?", "Russia"],
        ["Which ocean is the largest?", "Pacific Ocean"]
    ],
    "Movies": [
        ["Who directed 'Jaws'?", "Steven Spielberg"],
        ["Who played the character of Harry Potter in the film series?", "Daniel Radcliffe"],
        ["What is the name of the fictional African country in 'Black Panther'?", "Wakanda"],
        ["Which movie won the Academy Award for Best Picture in 1994?", "Forrest Gump"],
        ["What is the name of the spaceship in 'Star Wars'?", "Millennium Falcon"],
        ["Who played the Joker in 'The Dark Knight'?", "Heath Ledger"],
        ["What movie features a character named 'Frodo Baggins'?", "The Lord of the Rings"],
        ["What movie is about a fish named 'Nemo'?", "Finding Nemo"],
        ["Who directed 'The Godfather'?", "Francis Ford Coppola"],
        ["What is the name of the character who says 'I'll be back' in 'The Terminator'?", "Arnold Schwarzenegger"]
    ]
};

// Adjusted function to get daily Jeopardy questions
function getDailyJeopardyQuestions(questionBank) {
    let today = new Date();
    let dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    
    let categoryNames = Object.keys(questionBank);
    let totalCategories = categoryNames.length;

    // Select 5 categories for today
    let startIndex = dayOfWeek % totalCategories;
    let dailyCategories = [];
    for (let i = 0; i < 5; i++) {
        dailyCategories.push(categoryNames[(startIndex + i) % totalCategories]);
    }

    let dailyQuestions = {};

    dailyCategories.forEach(category => {
        let questionSets = questionBank[category];
        let chosenSet = questionSets[dayOfWeek % questionSets.length]; // Pick the correct set for the day

        // Adjusting this to handle question indices correctly
        dailyQuestions[category] = {
            200: chosenSet[1],
            400: chosenSet[3],
            600: chosenSet[5],
            800: chosenSet[7],
            1000: chosenSet[9]
        };
    });

    return dailyQuestions;
}

// Adjusted function to generate the Jeopardy board
function generateBoard() {
    const board = document.getElementById("jeopardy-board");
    board.innerHTML = '';

    // Use dailyJeopardyQuestions to generate the board
    const dailyQuestions = getDailyJeopardyQuestions(questionBank);

    // Generate the category headers
    Object.keys(dailyQuestions).forEach(category => {
        let header = document.createElement("div");
        header.className = "category";
        header.innerText = category;
        board.appendChild(header);
    });

    // Generate the question buttons for each category
    [200, 400, 600, 800, 1000].forEach(points => {
        Object.keys(dailyQuestions).forEach(category => {
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

// Adjusted showQuestion function to handle point references properly
function showQuestion(event) {
    currentButton = event.target; // Store the clicked button
    const category = currentButton.getAttribute("data-category");
    const points = parseInt(currentButton.getAttribute("data-points"));

    currentQuestion = category;
    currentPoints = points;

    // Play the Jeopardy theme song
    const jeopardyTheme = document.getElementById("jeopardy-theme");
    jeopardyTheme.play();

    document.getElementById("question-text").innerText = dailyJeopardyQuestions[category][points][0];
    document.getElementById("popup").style.display = "block";
}

// Function to display the correct answer
function showAnswer() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("answer-text").innerText = dailyJeopardyQuestions[currentQuestion][currentPoints][1];
    document.getElementById("answer-popup").style.display = "block";

    // Stop the Jeopardy theme song
    const jeopardyTheme = document.getElementById("jeopardy-theme");
    jeopardyTheme.pause();
    jeopardyTheme.currentTime = 0; // Reset audio to start
}
