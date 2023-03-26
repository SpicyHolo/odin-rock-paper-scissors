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
// returns an object consisting of playerSelection, computerSelection and winner (player, computer or draw)
// If either player or computer selection is invalid, returns undefined
function playRound(playerSelection, computerSelection)
{
    let roundOutcome = {"playerSelection": playerSelection, 
                        "computerSelection": computerSelection, 
                        "winner": ""};

    if (playerSelection === computerSelection) //draw
        roundOutcome["winner"] = "draw";

    else if (playerSelection === "rock")
        roundOutcome["winner"] = (computerSelection === "scissors") ? "player" : "computer";

    else if (playerSelection === "paper")
        roundOutcome["winner"] =  (computerSelection === "rock") ? "player" : "computer";

    else if (playerSelection === "scissors")
        roundOutcome["winner"] =  (computerSelection === "paper") ? "player" : "computer";

    else
    {
        console.error("playRound: Computer or Player Selection is not valid.");
        return;
    }

    return roundOutcome;
}

function playGame()
{
    let playerScore = 0;
    let computerScore = 0;
    let drawCount = 0;
    while (computerScore < 3 && playerScore < 3) 
    {
        
        const roundOutcome = playRound(getPlayerChoice(), getComputerChoice())
        if (roundOutcome == null)
            console.warn("playGame: game outcome is undefined!");

        else if (roundOutcome["winner"] === "player")
        {
            console.log(`You win! ${roundOutcome["playerSelection"]} beats ${roundOutcome["computerSelection"]}. Score: ${playerScore} : ${computerScore}`)
            playerScore++;
        }

        else if (roundOutcome["winner"] === "computer")
        {
            console.log(`You lose! ${roundOutcome["computerSelection"]} beats ${roundOutcome["playerSelection"]}. Score: ${playerScore} : ${computerScore}`)
            computerScore++;
        }

        else if (roundOutcome["winner"] === "draw")
        {
            console.log(`It's a draw! Score: ${playerScore} : ${computerScore}`)
            drawCount++;            
        }

        else
        {
            console.warn("playGame: Invalid game outcome!");
        }

    }

    if (playerScore > computerScore)
        console.log("You win! Number of draws: ${drawCount}.") 
    else
        console.log("You lose! Number of draws: ${drawCount}.")

    console.log(`Number of draws: ${drawCount}.`)
}

playGame();