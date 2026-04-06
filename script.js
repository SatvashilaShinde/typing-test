let type_content = document.getElementById('displayText');
let input = document.getElementById('typeValue');
let resetBtn = document.getElementById('restartBtn');
let soundBtn = document.getElementById('soundToggle');
let letterIndex = 0;
let mistakes = 0;
let isTyping = false;
let time;
let maxTime = 60;
let timeleft = maxTime;
let soundOn = false; // Default: Sound OFF

// Elements for statistics
let t_left = document.getElementById('timeLeft');
let error = document.getElementById('mistakes');
let wpm = document.getElementById('wpm');
let cpm = document.getElementById('cpm');

// Sound effects
let correctType = new Audio('type.mp3');
let incorrectType = new Audio('wrong.mp3');

// Toggle sound ON/OFF
soundBtn.addEventListener("click", () => {
    soundOn = soundBtn.checked;
});

// Function to play sound if enabled
const playSound = (sound) => {
    if (soundOn) {
        sound.currentTime = 0;
        sound.play();
    }
};

// Load a new paragraph
const loadPera = () => {
    let random_Pera = Math.floor(Math.random() * article.length);
    type_content.innerHTML = "";
    
    article[random_Pera].split('').forEach(element => {
        let span = document.createElement('span');
        span.textContent = element;
        type_content.appendChild(span);
    });

    // Set the first letter as active
    type_content.querySelectorAll('span')[0].classList.add('active');

    // Focus input on click
    document.addEventListener('click', () => input.focus());
    type_content.addEventListener('click', () => input.focus());
};

// Load initial paragraph
loadPera();

// Typing event handler
input.addEventListener("input", (e) => {
    let char = type_content.querySelectorAll("span");
    let inputValue = e.target.value.split("")[letterIndex];

    if (!isTyping) {
        time = setInterval(timeSetup, 1000);
        isTyping = true;
    }

    if (letterIndex < char.length) {
        if (inputValue == null) {
            if (letterIndex > 0) {
                letterIndex--;
                if (char[letterIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                char[letterIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (char[letterIndex].innerText === inputValue) {
                char[letterIndex].classList.add("correct");
                playSound(correctType);
            } else {
                char[letterIndex].classList.add("incorrect");
                mistakes++;
                playSound(incorrectType);
            }
        }

        // Remove 'active' class from all and update next letter
        char.forEach((element) => element.classList.remove("active"));
        if (letterIndex < char.length) {
            char[letterIndex].classList.add("active");
        }

        letterIndex++;
        error.innerText = mistakes;
        cpm.innerText = letterIndex - mistakes;
    } else {
        clearInterval(time);
        input.value = "";
    }
});

// Timer function
const timeSetup = () => {
    if (timeleft > 0) {
        timeleft--;
        t_left.innerText = timeleft;
        let wpmTab = Math.round((letterIndex - mistakes) / 5 / (maxTime - timeleft) * 60);
        wpm.innerText = wpmTab;
    } else {
        clearInterval(time);
        input.value = "";
    }
};

// Reset functionality
resetBtn.addEventListener("click", () => {
    loadPera();
    clearInterval(time);
    wpm.innerText = "0";
    error.innerText = "0";
    cpm.innerText = "0";
    timeleft = maxTime;
    t_left.innerText = maxTime;
    input.value = "";
    letterIndex = mistakes = isTyping = 0;
});
