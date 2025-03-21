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

// Function to show the question when a button is clicked
function showQuestion(category, points) {
    if (questions[category] && questions[category][points]) {
        const question = questions[category][points];
        const userAnswer = prompt(question);
        alert(`You answered: ${userAnswer}`);
    } else {
        alert("This question is not available.");
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
        categoryButton.onclick = () => {
            alert(`You clicked on ${category}`);
        };

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
