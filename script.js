const categories = {
    "History Happens": {
        200: ["This document, signed in 1215, limited the power of the English king and laid the foundation for constitutional government.", "What is the Magna Carta?"],
        400: ["The first shots of the American Revolution were fired in this Massachusetts town in 1775.", "What is Lexington?"],
        600: ["This U.S. President issued the Emancipation Proclamation in 1863.", "Who is Abraham Lincoln?"],
        800: ["In 1066, William the Conqueror invaded England from this region of France.", "What is Normandy?"],
        1000: ["The Berlin Wall fell in this year, marking the beginning of the end of the Cold War.", "What is 1989?"]
    },
    "Movie Quotes": {
        200: ["'There's no place like home.'", "What is The Wizard of Oz?"],
        400: ["'I'm the king of the world!'", "What is Titanic?"],
        600: ["'May the Force be with you.'", "What is Star Wars?"],
        800: ["'You can't handle the truth!'", "What is A Few Good Men?"],
        1000: ["'Hasta la vista, baby.'", "What is Terminator 2: Judgment Day?"]
    },
    "Literary Legends": {
        200: ["This author wrote *Romeo and Juliet* and *Hamlet*.", "Who is William Shakespeare?"],
        400: ["*Moby-Dick* features this obsessive captain hunting a great white whale.", "Who is Captain Ahab?"],
        600: ["This classic novel by George Orwell features the phrase 'Big Brother is watching you.'", "What is 1984?"],
        800: ["*The Great Gatsby* was written by this American author.", "Who is F. Scott Fitzgerald?"],
        1000: ["This Russian novel features the character Raskolnikov, who debates morality after committing murder.", "What is Crime and Punishment?"]
    },
    "Tech Talk": {
        200: ["The 'www' in a website address stands for this.", "What is the World Wide Web?"],
        400: ["This billionaire founded Microsoft in 1975.", "Who is Bill Gates?"],
        600: ["In 2021, Facebook changed its parent company’s name to this.", "What is Meta?"],
        800: ["This co-founder of Apple introduced the first iPhone in 2007.", "Who is Steve Jobs?"],
        1000: ["This programming language, named after a type of coffee, was released by Sun Microsystems in 1995.", "What is Java?"]
    },
    "The Animal Kingdom": {
        200: ["The largest land animal in the world.", "What is an elephant?"],
        400: ["This bird is known for its ability to mimic human speech.", "What is a parrot?"],
        600: ["The only marsupial native to North America.", "What is the opossum?"],
        800: ["A group of lions is called this.", "What is a pride?"],
        1000: ["This deep-sea creature can produce its own light through bioluminescence.", "What is an anglerfish?"]
    }
};

let teams = {};
let currentQuestion = null;
let currentPoints = 0;
let currentButton = null; // Stores the clicked button

document.getElementById("add-team").addEventListener("click", addTeam);
document.getElementById("start-game").addEventListener("click", startGame);

function addTeam() {
    const teamInputs = document.getElementById("team-inputs");
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Team Name";
    teamInputs.appendChild(input);
}

function startGame() {
    const teamInputs = document.querySelectorAll("#team-inputs input");
    if (teamInputs.length === 0) return;

    teams = {};
    const teamSelect = document.getElementById("team-select");
    teamSelect.innerHTML = "";
    document.getElementById("scores").innerHTML = "";

    teamInputs.forEach(input => {
        if (input.value.trim() !== "") {
            const name = input.value.trim();
            teams[name] = 0;

            const scoreDiv = document.createElement("div");
            scoreDiv.className = "team";
            scoreDiv.id = `team-${name}`;
            scoreDiv.innerText = `${name}: $0`;
            document.getElementById("scores").appendChild(scoreDiv);

            const option = document.createElement("option");
            option.value = name;
            option.innerText = name;
            teamSelect.appendChild(option);
        }
    });

    document.getElementById("setup").style.display = "none";
    document.getElementById("game").style.display = "block";
    generateBoard();
}

function generateBoard() {
    const board = document.getElementById("jeopardy-board");
    board.innerHTML = '';

    Object.keys(categories).forEach(category => {
        let header = document.createElement("div");
        header.className = "category";
        header.innerText = category;
        board.appendChild(header);
    });

    for (let points of [100, 200, 300, 400, 500]) {
        Object.keys(categories).forEach(category => {
            let button = document.createElement("button");
            button.className = "question";
            button.innerText = `$${points}`;
            button.setAttribute("data-category", category);
            button.setAttribute("data-points", points);
            button.onclick = showQuestion;
            board.appendChild(button);
        });
    }
}

function showQuestion(event) {
    currentButton = event.target; // Store the clicked button
    const category = currentButton.getAttribute("data-category");
    const points = parseInt(currentButton.getAttribute("data-points"));

    currentQuestion = category;
    currentPoints = points;

    // Play the Jeopardy theme song
    const jeopardyTheme = document.getElementById("jeopardy-theme");
    jeopardyTheme.play();

    document.getElementById("question-text").innerText = categories[category][points][0];
    document.getElementById("popup").style.display = "block";
}

function showAnswer() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("answer-text").innerText = categories[currentQuestion][currentPoints][1];
    document.getElementById("answer-popup").style.display = "block";

    // Stop the Jeopardy theme song
    const jeopardyTheme = document.getElementById("jeopardy-theme");
    jeopardyTheme.pause();
    jeopardyTheme.currentTime = 0; // Reset audio to start
}

function updateScore(correct) {
    const team = document.getElementById("team-select").value;
    teams[team] += correct ? currentPoints : -currentPoints;
    document.getElementById(`team-${team}`).innerText = `${team}: $${teams[team]}`;

    // Close the answer pop-up after scoring
    document.getElementById("answer-popup").style.display = "none";

    // Disable the button permanently after the question has been answered
    if (currentButton) {
        currentButton.disabled = true;
        currentButton.style.backgroundColor = "#222"; // Change to a "used" style
        currentButton.style.cursor = "not-allowed";
    }

    // Check if all questions have been answered
    const remainingQuestions = document.querySelectorAll(".question:not([disabled])").length;
    if (remainingQuestions === 0) {
        const completionSound = document.getElementById("completion-sound");
        completionSound.play();
    }
}
