// Code credit and Gamelogic credit for the below code: https://github.com/JanisKengis/codelex, https://github.com/RossHepburn/Rock-Paper-Scissors, https://github.com/JLChamberlain/RPSLS. 
// These has been an inspiration for the code and altered or translated to fit JavaScript for the project purpose. 

// Credit: https://brammitch.github.io/rpsls/. Inpspirational for the code below.
document.addEventListener("DOMContentLoaded", function () {
    const GAMETOOLS = ["rock", "paper", "scissors", "lizard", "spock"];
    const CHOICE_TIME_LIMIT = 10;
    let timerInterval;
    let timerEnabled = false;
    let timeLeft = CHOICE_TIME_LIMIT;

    let playerScore = 0;
    let computerScore = 0;

    let highscore = 0;

    function getRandomIndex() {
        return Math.floor(Math.random() * GAMETOOLS.length);
    }

    function getComputerChoice() {
        const index = getRandomIndex();
        return GAMETOOLS[index];
    }

    function getWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return "tie";
        }

        const winningCombinations = {
            rock: ["scissors", "lizard"],
            paper: ["rock", "spock"],
            scissors: ["paper", "lizard"],
            lizard: ["spock", "paper"],
            spock: ["scissors", "rock"],
        };

        if (winningCombinations[playerChoice].includes(computerChoice)) {
            return "player";
        } else {
            return "computer";
        }
    }

    function updateResult(winner) {
        const resultText = document.getElementById("result-text");
        if (winner === "player") {
            resultText.textContent = "You win!";
        } else if (winner === "computer") {
            resultText.textContent = "Computer wins!";
        } else {
            resultText.textContent = "It's a tie!";
        }
    }

    function updateComputerChoice(computerChoice) {
        const computerChoiceImage = document.getElementById("computer-choice-image");
        computerChoiceImage.src = `assets/images/${computerChoice}.webp`;
        computerChoiceImage.alt = computerChoice;
    }

    function updateScoreCounter() {
        const scoreCounter = document.getElementById("score-counter");
        scoreCounter.innerHTML = `Player: ${playerScore} | Computer: ${computerScore}`;
    }

    function updateHighscore(winner) {
        if (winner === "player") {
            highscore++;
        }

        const highscoreText = document.getElementById("highscore-text");
        highscoreText.textContent = `Current Highscore: ${highscore}`;
    }

    const timerElement = document.getElementById("timer");

    function updateTimer() {
        timerElement.textContent = `Time left: ${timeLeft} seconds`;
    }

    function startTimer() {
        updateTimer();

        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimer();

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                const winner = "computer";
                updateResult(winner);
                computerScore++;
                updateScoreCounter();
            }
        }, 1000);
    }

    function playGame(playerChoice) {
        const computerChoice = getComputerChoice();
        const winner = getWinner(playerChoice, computerChoice);

        updateComputerChoice(computerChoice);
        updateResult(winner);

        if (winner === "player") {
            playerScore++;
        } else if (winner === "computer") {
            computerScore++;
        }
        updateScoreCounter();

        if (timerEnabled) {
            clearInterval(timerInterval);
            timeLeft = CHOICE_TIME_LIMIT;
            startTimer();
        }
    }

    const choiceButtons = document.querySelectorAll(".choice-button");
    choiceButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const playerChoice = button.getAttribute("data-choice");
            playGame(playerChoice);

            if (timerEnabled && !timerInterval) {
                startTimer();
            }
        });
    });

    const playAgainButton = document.getElementById("play-again");
    playAgainButton.addEventListener("click", () => {

        const confirm = window.confirm('Do you want to erase the current score and play again?');

        if (confirm) {

            playerScore = 0;
            computerScore = 0;

            updateScoreCounter();

            const winner = "";

            updateHighscore(winner);

            if (timerEnabled) {
                clearInterval(timerInterval);
                timeLeft = CHOICE_TIME_LIMIT;
                startTimer();
            }
        }
    });

    function awardPointToComputer() {
        if (!timerEnabled) {
            computerScore++;
            updateScoreCounter();
        }
    }

    const timerCheckbox = document.getElementById("timer-checkbox");

    timerCheckbox.addEventListener("change", function () {
        if (timerCheckbox.checked) {

            timerEnabled = true;
            clearInterval(timerInterval);
            timeLeft = CHOICE_TIME_LIMIT;
            startTimer();
        } else {

            timerEnabled = false;
            clearInterval(timerInterval);
        }
    });

    // Listen for changes in the checkbox state and award a point to the computer
    timerCheckbox.addEventListener("change", awardPointToComputer);
});
