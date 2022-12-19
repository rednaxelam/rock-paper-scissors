// Choose a random integer from 0 to 2. If 0 return 'rock', if 1 return 'paper', if 2 return 'scissors'.
function getComputerSelection() {
  let randomNumber = Math.floor(Math.random() * 3);
  switch (randomNumber) {
    case 0: return 'rock';
    case 1: return 'paper';
    default: return 'scissors';
  }
}

// Prompt the player to choose rock, paper, or scissors. If they don't enter a value that can be understood as being rock, paper, or scissors, then continue prompting until they do so.
function getPlayerSelection() {
  choice = prompt("Enter your choice here!").toLowerCase();
  
  if (!isValidPlayerSelection(choice)) {
    while (!isValidPlayerSelection(choice)) {
      console.log("Please choose a valid option! (type and enter r, rock, p, paper, s, or scissors to make you choice!): ")
      choice = prompt("Enter your choice here! \n (type and enter r, rock, p, paper, s, or scissors to make you choice!)" ).toLowerCase();
    }
  }

  if (choice === 'r' || choice ==='rock') {
    return 'rock';
  } else if (choice === 'p' || choice ==='paper') {
    return 'paper';
  } else if (choice === 's' || choice === 'scissors') {
    return 'scissors';
  }
}

// Returns true if string supplied by player can be understood by getPlayerSelection as being one of rock, paper, or scissors.
function isValidPlayerSelection(choice) {
  return choice === 'r' || choice ==='rock' || choice === 'p' || choice ==='paper' || choice === 's' || choice === 'scissors';
}

// Changes the first character of a string to uppercase.
function capitalizeString(str) {
  if (str.length === 0) {
    return str;
  } else if (str.length === 1) {
    return str.charAt(0).toUpperCase();
  } else {
    return str.charAt(0).toUpperCase() + str.substring(1, str.length);
  }
}

// Given a selection by the player and the computer, determine the outcome of the round.
function playRound(playerSelection, computerSelection) {
  let win = ((playerSelection == 'rock' && computerSelection == 'scissors')
            || (playerSelection == 'scissors' && computerSelection == 'paper')
            || (playerSelection == 'paper' && computerSelection == 'rock'));
  if (win) {
    return 1;
  } else if (playerSelection === computerSelection) {
    return 0;
  } else {
    return -1;
  }
}

function printResult(outcome, playerSelection, computerSelection) {
  if (outcome == 1) {
    console.log(`You won! ${capitalizeString(playerSelection)} beats ${computerSelection}.`);
  } else if (outcome == 0) {
    console.log(`You drew! You both chose ${playerSelection}.`);
  } else {
    console.log(`You lost! ${capitalizeString(playerSelection)} loses to ${computerSelection}.`);
  }
}

function makePlural(numDistinct) {
  if (numDistinct === 1) {
    return '';
  } else {
    return 's';
  }
}

function printCurrentScores(playerWins, numberOfDraws, computerWins) {
  console.log(`Current results: You have won ${playerWins} round${makePlural(playerWins)}, there have been ${numberOfDraws} draw${makePlural(numberOfDraws)}, and the computer has won ${computerWins} round${makePlural(computerWins)}`);
}

function printFinalResult(playerWins, numberOfDraws, computerWins) {
  if (playerWins > computerWins) {
    console.log("You won the game! Congratulations! " + finalTotals(playerWins, numberOfDraws, computerWins));
  } else if (computerWins > playerWins) {
    console.log("Oh no! You lost the game! " + finalTotals(playerWins, numberOfDraws, computerWins));
  } else {
    console.log("You drew the game! \nFinal results: " + finalTotals(playerWins, numberOfDraws, computerWins));
  }
}

function finalTotals(playerWins, numberOfDraws, computerWins) {
  return `\nFinal results:  You won ${playerWins} round${makePlural(playerWins)}, there were ${numberOfDraws} draw${makePlural(numberOfDraws)}, and the computer won ${computerWins} round${makePlural(computerWins)}`;
}

// Prompts the player to choose the number of rounds they want to play. function will continue to prompt the player until they enter an integer.
function getNumberOfRounds() {
  let numRounds = Number(prompt("Enter how many rounds you'd like to play here!"));
  let validInt = Number.isInteger(numRounds);
  while (!validInt) {
    console.log("Please choose an integer (whole number): ");
    numRounds = Number(prompt("Enter how many rounds you'd like to play here! \n Please choose an integer (whole number)"));
    validInt = Number.isInteger(numRounds);
  }
  return numRounds;
}

// Prompts the player to choose whether or not they want to play again. Function will continue to prompt the player unless they choose y, yes, n, or no.
function playAgain(choice) {
  while (!isValidPlayAgainChoice(choice)) {
    console.log('Please select a valid choice (yes or no)')
    choice = prompt('Would you like to play again? \nType and enter yes or no');
  }
  if (choice === 'y' || choice === 'yes') {
    console.log('');
    playGame();
  } else {
    console.log('Thanks again for playing!');
  }
}

// For use in playAgain function. Tests to see whether the string supplied by the player can be used to determine whether or not they want to play again.
function isValidPlayAgainChoice(choice) {
  return choice === 'y' || choice === 'n' || choice === 'yes' || choice === 'no';
}

function playGame() {
  console.log("Please choose how many rounds you'd like to play: ");
  const numberOfRounds = getNumberOfRounds();
  let roundsPlayed = 0;
  let playerWins = 0;
  let computerWins = 0;
  let numberOfDraws = 0;
  console.log('');
  console.log("To make a choice, type and enter r, rock, p, paper, s, or scissors!")
  while (roundsPlayed < numberOfRounds) {
    console.log("Please make your choice!");
    const playerSelection = getPlayerSelection();
    const computerSelection = getComputerSelection();
    const result = playRound(playerSelection, computerSelection);
    if (result === 1) {
      playerWins++;
    } else if (result === 0) {
      numberOfDraws++;
    } else {
      computerWins++;
    }
    printResult(result, playerSelection, computerSelection);
    if (roundsPlayed < numberOfRounds - 1) {
      printCurrentScores(playerWins, numberOfDraws, computerWins);
    } else {
      printFinalResult(playerWins, numberOfDraws, computerWins);
    }
    roundsPlayed++;
    console.log('');
  }
  console.log('Thank you for playing! Would you like to play another game? (type and enter yes or no)');
  console.log('');
  const playAgainChoice = prompt("Play again?");
  playAgain(playAgainChoice);
}

alert("You can play rock paper scissors via the developer console. Head over there for more information!")
console.log("Hello! It is time to play rock paper scissors! The player who wins the most rounds wins!");
console.log("When you need to make a choice, you can enter it via the prompt that will appear on the webpage");
console.log("Type and enter playGame() to get started!");