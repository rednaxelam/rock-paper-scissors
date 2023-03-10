/* This file is divided into 6 sections:

-Initial webpage calls
-displayFrame and event listener function definitions
-Game logic (this is mostly contained in the displayFrame functions, but there are a couple of functions in this section)
-String creation
-DOM element creation
-Utility functions

Each section has a comment with a "##" and section name above it for easy navigation. */


/* How the game works:

index.html has a div with id "main-container".

When a displayFrame function is called, the function will remove all children of the "main-container" to clear the screen, create the relevant new DOM elements while 
doing any required game logic or string creation, and then append these new DOM elements to the "main-container" for display to the user. Event listeners are added
to buttons and input fields to enable the player to call the appropriate displayFrame function when interacted with.

You can think of the game as moving from one frame to another, based on user actions and game results. */


/* ## Initial webpage calls */

// This is used to display the first frame. All other displayFrame functions are called via event listeners.
displayIntroFrame1();

// The following are global variables to avoid having to pass them from function to function.
let numWinsRequired;
let playerWins;
let computerWins;


/* ## displayFrame and event listener function definitions */

function displayIntroFrame1() {
  buildIntroFrame("Humans have been at war with the robots for a 1,000,000,000 years in a bid to control the universe.", displayIntroFrame2);
}

function displayIntroFrame2() {
  clearFrame();
  buildIntroFrame("With no end to the war in sight, it has been decided that a game of rock paper scissors will determine the winner.", displayIntroFrame3);
}

function displayIntroFrame3() {
  clearFrame();
  buildIntroFrame("You have been chosen to represent humanity in this game.", displayIntroFrame4);
}

function displayIntroFrame4() {
  clearFrame();
  buildIntroFrame("You will face the leader of the robots: the computer.", displayStartFrame);
}

function displayStartFrame() {
  clearFrame();
  const mainContainer = getMainContainer();
  const textBox = createTextBox([['h1', "Are you ready?"]])
  const choiceDiv = createChoiceDiv({'I am ready': displayRoundSelectionFrame, 'wait...': displayNotReadyFrame});
  mainContainer.append(textBox, choiceDiv);
}

function displayNotReadyFrame() {
  clearFrame();
  const mainContainer = getMainContainer();
  const textBox = createTextBox([['h1', 'This might be our only chance to win the war. You must help us.']]);
  const choiceDiv = createChoiceDiv({'ok...': displayRoundSelectionFrame});
  mainContainer.append(textBox, choiceDiv);
}

function displayRoundSelectionFrame() {
  numWinsRequired = 0;
  playerWins = 0;
  computerWins = 0;

  clearFrame();
  const mainContainer = getMainContainer();
  const textBox = createTextBox([['h1', 'Best of ...?']]);
  const choiceDiv = createChoiceDiv({'3': displayFirstHandChoiceFrame, '5': displayFirstHandChoiceFrame, '7': displayFirstHandChoiceFrame, 'other': displayRoundInputFrame});
  mainContainer.append(textBox, choiceDiv);
}

function displayRoundInputFrame() {
  clearFrame();
  const mainContainer = getMainContainer();
  const textBox = createTextBox([['h1', "Write the number of rounds you'd like to play below and hit enter."]]);
  const choiceDiv = createChoiceDiv({'go back?': displayRoundSelectionFrame});

  const numRoundsInput = createElement('input');
  numRoundsInput.addEventListener('keyup', checkValid);
  
  choiceDiv.appendChild(numRoundsInput);

  mainContainer.append(textBox, choiceDiv);
}

function checkValid(e) {
  if (e.key !== "Enter") return;
  numSupplied = Number(this.value);
  if (!validNumberOfRounds(numSupplied)) {
    alert('There must be a winner. Choose an odd number.')
    return;
  } else {
    displayFirstHandChoiceFrame(e, numSupplied);
  }
}

function validNumberOfRounds(num) {
  return Number.isInteger(num) && num > 0 && num % 2 == 1;
}

function displayFirstHandChoiceFrame(e, numSupplied) {
  if (numSupplied !== undefined) numWinsRequired = Math.floor(numSupplied / 2) + 1;
  else numWinsRequired = Math.floor((Number(this.textContent) / 2)) + 1;

  clearFrame();
  const mainContainer = getMainContainer();
  const textBox = createTextBox([['h1', 'Make your decision']]);
  const choiceDiv = createChoiceDiv({'rock': displayRoundResultFrame, 'paper': displayRoundResultFrame, 'scissors': displayRoundResultFrame});
  mainContainer.append(textBox, choiceDiv);
}

function displayHandChoiceFrame() {
  clearFrame();
  const mainContainer = getMainContainer();
  const textBox = createTextBox([['h1', 'Make your decision']]);
  const choiceDiv = createChoiceDiv({'rock': displayRoundResultFrame, 'paper': displayRoundResultFrame, 'scissors': displayRoundResultFrame});
  mainContainer.append(textBox, choiceDiv);
}

function displayRoundResultFrame() {
  const mainContainer = getMainContainer();

  const playerChoice = this.textContent;
  const computerChoice = determineComputerSelection();

  let outcome = playRound(playerChoice, computerChoice);

  if (outcome === 1) playerWins++;
  else if (outcome === -1) computerWins++;

  if (playerWins === numWinsRequired || computerWins === numWinsRequired) {

    clearFrame();
    const finalResultsTextBox = createTextBox([['h1', calculateFinalResultString(playerWins, computerWins)],
                                               ['p', calculateOutcomeString(outcome, playerChoice, computerChoice)],
                                               ['p', calculateFinalTotalsString(playerWins, computerWins)]]);
    const choiceDiv = createChoiceDiv({'continue': displayRestartFrame});
    mainContainer.append(finalResultsTextBox, choiceDiv);

  } else {

    clearFrame();
    const outcomeTextBox = createTextBox([['h1', calculateOutcomeString(outcome, playerChoice, computerChoice)],
                                          ['p', calculateCurrentScoreString(playerWins, computerWins)]]);
    const continueButton = createChoiceDiv({'continue': displayHandChoiceFrame});
    mainContainer.append(outcomeTextBox, continueButton);

  }
}

function displayRestartFrame() {
  clearFrame();
  const mainContainer = getMainContainer();
  const playAgainTextBox = createTextBox([['h1', 'Use your secret time travel machine to reverse time and start again?']]);
  const choiceDiv = createChoiceDiv({'yes': displayRoundSelectionFrame, 'no': displayEndFrame});
  mainContainer.append(playAgainTextBox, choiceDiv);

}

function displayEndFrame() {
  clearFrame();
  const mainContainer = getMainContainer();
  let textBox = null;
  if (playerWins > computerWins) {
    textBox = createTextBox([['h1', 'A glorious new era for humanity awaits!']]);
  } else {
    textBox = createTextBox([['h1', 'You have doomed us all. You were the wrong choice...']]);
  }
  mainContainer.appendChild(textBox);
}

/* ## Game logic */

function playRound(playerSelection, computerSelection) {
  const win = ((playerSelection === 'rock' && computerSelection === 'scissors')
            || (playerSelection === 'scissors' && computerSelection === 'paper')
            || (playerSelection === 'paper' && computerSelection === 'rock'));
  if (win) {
    return 1;
  } else if (playerSelection === computerSelection) {
    return 0;
  } else {
    return -1;
  }
}

function determineComputerSelection() {
  const randomNumber = Math.floor(Math.random() * 3);
  switch (randomNumber) {
    case 0: return 'rock';
    case 1: return 'paper';
    default: return 'scissors';
  }
}


/* ## String creation */

function calculateOutcomeString(outcome, playerSelection, computerSelection) {
  if (outcome == 1) {
    return `You won the round. ${capitalizeString(playerSelection)} beats ${computerSelection}.`;
  } else if (outcome == 0) {
    return `You drew the round. You both chose ${playerSelection}.`;
  } else {
    return `You lost the round. ${capitalizeString(playerSelection)} loses to ${computerSelection}.`;
  }
}

function capitalizeString(str) {
  if (str.length === 0) {
    return str;
  } else if (str.length === 1) {
    return str.charAt(0).toUpperCase();
  } else {
    return str.charAt(0).toUpperCase() + str.substring(1, str.length);
  }
}

function calculateFinalResultString(playerWins, computerWins) {
  if (playerWins > computerWins) {
    return "Humanity has been saved!";
  } else {
    return "Humanity has been doomed";
  }
}

function calculateFinalTotalsString(playerWins, computerWins) {
  return `Final results:  You won ${playerWins} round${makePlural(playerWins)}, and the computer won ${computerWins} round${makePlural(computerWins)}.`;
}

function makePlural(numDistinct) {
  if (numDistinct === 1) {
    return '';
  } else {
    return 's';
  }
}

function calculateCurrentScoreString(playerWins, computerWins) {
  return `Current results: You have won ${playerWins} round${makePlural(playerWins)}, and the computer has won ${computerWins} round${makePlural(computerWins)}.`;
}

/* ## DOM element creation */

// got structure of createElement function (with changes made by myself) from Derlin's answer on https://stackoverflow.com/questions/43168284/javascript-createelement-function
function createElement(type, attributes = {}) {
  const element = document.createElement(type);
  for (const key in attributes) {
    if (key === "class") {
        const classArray = attributes["class"];
        for (let i = 0; i < classArray.length; i++) {
          element.classList.add(classArray[i]);
        }
    } else {
      element.setAttribute(key, attributes[key]);
    }
  }
  return element;
}

function createChoiceDiv(contentFunctionPairs) {
  const choiceDiv = createElement('div', {'class': ['choices']});
  for (const key in contentFunctionPairs) {
    const button = createElement('button');
    button.textContent = key;
    button.addEventListener('click', contentFunctionPairs[key]);
    choiceDiv.appendChild(button);
  }
  return choiceDiv;
}

// 
function createTextBox(typeTextPairs) {
  const textBox = createElement('div', {"class": ["text-background"]});
  for (const pair of typeTextPairs) {
    const textElement = createElement(pair[0]);
    textElement.textContent = pair[1];
    textBox.appendChild(textElement);
  }
  return textBox;
}

/* ## Utility functions */

function clearFrame() {
  const mainContainer = getMainContainer();
  while (mainContainer.hasChildNodes()) {
    mainContainer.removeChild(mainContainer.firstChild);
  }
}

function getMainContainer() {
  const mainContainer = document.querySelector('#main-container');
  return mainContainer;
}

function buildIntroFrame(message, nextFrame) {
  const mainContainer = getMainContainer();
  const title = createTextBox([['h1', message]]);
  const choiceDiv = createChoiceDiv({'continue': nextFrame});
  mainContainer.append(title, choiceDiv);
}
