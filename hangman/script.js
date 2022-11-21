const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

let fectchedWords = [];
let selectedWord = "";
// fetch("https://random-word-api.herokuapp.com/all")
//     .then(res => res.json())
//     .then(data => {
//         fectchedWords = data
//     });

async function main() {
    
}


const words = ['programming','baking','supermarket','fishing','air','filter','today','news'];
selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// show hidden word 
function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord
            .split("")
            .map(letter => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ""}
                </span> 
            `)
            .join("")}
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, "");
    
    if (innerWord === selectedWord) {
        finalMessage.innerText = "Congratulations! You Won! :)";
        popup.style.display = "flex";
    }
}

function updateWrongLettersEl() {
    // Display wrong letters

    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    // Display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = "block";
        } else {
            part.style.display = "none";
        }
    });

    // Check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = "Sorry, You lost! :(";
        popup.style.display = "flex";
    }
}

function showNotification() {
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 2000);
}


window.addEventListener("keydown", e => {
    // console.log(e.keyCode);

    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});


// event listener for play again btn 
playAgainBtn.addEventListener("click", () => {
    // empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)]; 

    displayWord();

    updateWrongLettersEl();

    popup.style.display = "none";
});

displayWord();