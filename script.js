// Get DOM elements
const divScore = document.querySelector('.score');
const imgPlayerChoice = document.querySelector('.hand-choice-player');
const imgComputerChoice = document.querySelector('.hand-choice-computer');
const buttons = document.querySelectorAll('.button');

const header = document.querySelector('header')
const icon = document.querySelector('.icon');


// Init scores
let playerScore = 0;
let computerScore = 0;

// Add animation on mouseover for icon
buttons.forEach(button => button.addEventListener('mouseover', () => toggleHeaderIconAnimation(true)));
buttons.forEach(button => button.addEventListener('mouseout', () => toggleHeaderIconAnimation(false)));
// Add click events to butotns
buttons.forEach(button => button.addEventListener('click', startRound));

// Returns random integer in range (min, max) (inclusive) 
function getRandomIntRange(min, max)
{
    return Math.floor(Math.random() * (max + 1)) + min;
}

// Returns computer's choice of action: "rock", "paper" or "scissors" 
function getComputerChoice()
{
    const randomIndex = getRandomIntRange(0, 2);
    const choices = ["rock", "paper", "scissors"];
    return choices[randomIndex];
}

// Asks player for choice of action, if the input is incorrect, it repeats itself recursively
function getPlayerChoice()
{
    const playerChoice = prompt("Choose Rock, Paper or Scissors: ").toLowerCase();
    const choices = ["rock", "paper", "scissors"];
    if (choices.includes(playerChoice))
        return playerChoice;
    else 
    {
        console.log("Incorrect Choice, try: Rock, Paper or Scissors");
        return getPlayerChoice();
    }
}

/// Calculates the outcome of one round of rock, paper, scissors
// returns an object consisting of playerChoice, computerChoice and winner (player, computer or draw)
// If either player or computer selection is invalid, returns undefined
function playRound(playerChoice, computerChoice)
{
    let roundOutcome = {"playerChoice": playerChoice, 
                        "computerChoice": computerChoice, 
                        "winner": ""};

    if (playerChoice === computerChoice) //draw
        roundOutcome["winner"] = "draw";

    else if (playerChoice === "rock")
        roundOutcome["winner"] = (computerChoice === "scissors") ? "player" : "computer";

    else if (playerChoice === "paper")
        roundOutcome["winner"] =  (computerChoice === "rock") ? "player" : "computer";

    else if (playerChoice === "scissors")
        roundOutcome["winner"] =  (computerChoice === "paper") ? "player" : "computer";

    else
    {
        console.error("playRound: Computer or Player Selection is not valid.");
        return;
    }

    return roundOutcome;
}

function isGameRunning(playerScore, computerScore)
{
    console.log(playerScore, computerScore)
    return playerScore < 3 && computerScore <3;
}

function updateWinner(playerScore, computerScore)
{
    if (playerScore > computerScore)
        divScore.innerText = "You won! >:)";
    else
        divScore.innerText = 'You lost! >:(';
}
/* DOM Manipulation */

function toggleHeaderIconAnimation(enable)
{
    icon.src = enable ? "icons/holo-icon.gif" : "icons/holo-icon-static.gif";
}

function updateScore(playerScore, computerScore)
{
    divScore.innerText = `${playerScore} : ${computerScore}`;
}

function updateChoiceImage(player, choice)
{
    const choices = {"rock": "icons/rock.png", "paper": "icons/paper.png", "scissors": "icons/scissors.png"}

    let choiceImg;
    if (player === "player")
        choiceImg = imgPlayerChoice;  
    else if (player === "computer")
        choiceImg = imgComputerChoice;
    else
        return;

    choiceImg.src = choices[choice];
}


function startRound(e)
{
    const playerChoice = e.currentTarget.id
    updateChoiceImage("player", playerChoice);

    const computerChoice = getComputerChoice();
    updateChoiceImage("computer", computerChoice);

    const result = playRound(playerChoice, computerChoice);
    console.log(result);

    if (result["winner"] === "player")
        playerScore++;
    else if (result["winner"] === "computer")
        computerScore++;

    updateScore(playerScore, computerScore);
    
    if (!isGameRunning(playerScore, computerScore))
    {
        updateWinner(playerScore, computerScore);
        playerScore = 0;
        computerScore = 0;
    }
}