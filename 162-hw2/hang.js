// Generate list of words
let words = ["BANANA", "WAFFLES", "ELECTRONICS", "NEW YORK", "DANDELION", "CHOCOLATE", "COCA COLA"];
// Choose random word from the list
let randomWord = getRandomWord(words);
// Reference the keyboardContainer ID element and store into variable
let keyboardContainer = document.querySelector("#keyboardContainer");
// Array of all the parts of the hang man drawing
let hangmanParts = [
    ".right-leg",
    ".left-leg",
    ".right-arm",
    ".left-arm",
    ".head", 
    ".hang"
];
let hangman = [];

// Run some code whenever a letter in the keyboard is clicked
keyboardContainer.addEventListener("click", handleKeyboardClick);

generateHiddenWord(randomWord);

// Check if the clicked letter is a match with any hidden letters
function checkForMatch(clickedLetter) {
    let hiddenElements = document.querySelectorAll(".hidden");
    let isMatch = false;

    // Compare the clicked letter with each hidden letter
    for (let hiddenElement of hiddenElements) {
        // If it's a match, unhide the hidden letter
        if (hiddenElement.textContent === clickedLetter) {
            hiddenElement.classList.remove("hidden");
            isMatch = true;
        }
    }

    return isMatch;
}

// Check if the player has lost; player loses when there are no more hang man parts remaining
function checkForLose() {
    if (hangmanParts.length === 0) {
        document.querySelector("#hangmanContainer").innerHTML = "<h2>You lost, game over!</h2>";
        // Reveal what the hidden word was
        keyboardContainer.innerHTML = `<h2>The word was: ${randomWord}</h2>`;
    }
}

// Check if the player has won; player wins when there are no more hidden letters 
// (ie, they've correctly guessed all of them)
function checkForWin() {
    let hiddenElements = document.querySelectorAll(".hidden");
    if (hiddenElements.length === 0) {
        keyboardContainer.innerHTML = "<h2>You won!</h2>";
    }
}

function handleKeyboardClick(event) {
    let clickedElement = event.target;

    // We only care if the clickedElement is a letter that is a match so we return if it is not the case
    if (!clickedElement.classList.contains("letter") || clickedElement.classList.contains("selected")) return;
    
    // If the newly clicked element is not already selected before, add to selected
    clickedElement.classList.add("selected");

    let clickedLetter = clickedElement.textContent;
    let isMatch = checkForMatch(clickedLetter);

    // If no match, remove a part and check if the player has lost
    if (!isMatch) {
        removeHangmanPart();
        checkForLose();
    // If there is a match, check if the player has won
    } else {
        checkForWin();
    }
}

// Hide the random word
function generateHiddenWord(word) {
    let letters = word.split("");
    let emptyLetterContainer = document.querySelector("#emptyLetterContainer");

    // Declare the hidden word as an emtpy string
    let lettersHidden = "";
    // Hide every letter in the random word
    for (let letter of letters) {
        let letterHidden = `<p class="letter-container"><span class="letter hidden">${letter}</span></p>`;
        lettersHidden += letterHidden;
    }

    emptyLetterContainer.innerHTML = lettersHTML;
}

// Pick a random word from the word list by choosing a random index
function getRandomWord(list) {
    let randomNumber = Math.floor(Math.random() * list.length);
    return list[randomNumber];
}

// Removes a part of the hang man every time there is no match (ie. incorrect guess)
function removeHangmanPart() {
    // Take first hang man part in the array
    let hangmanPart = hangmanParts.shift();
    let partsToRemove = document.querySelectorAll(hangmanPart);

    for (let partToRemove of partsToRemove) {
        partToRemove.remove();
    }
}