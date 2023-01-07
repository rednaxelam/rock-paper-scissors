displayStartFrame();
let numWinsRequired;
let playerWins;
let computerWins;


function displayStartFrame() {
  clearFrame();
  const mainContainer = getMainContainer();
  
  const title = createElement('h1', {"id": "logo"});
  title.textContent = "Are you ready?";
  
  const choiceDiv = createChoiceDiv({'I am ready': displayRoundSelectionFrame, 'I am not ready': displayNotReadyFrame});
  
  mainContainer.appendChild(title);
  mainContainer.appendChild(choiceDiv);
}

function displayNotReadyFrame() {
  clearFrame();
  const mainContainer = getMainContainer();
  const message = createElement('h1');
  message.textContent = 'Come back when you are ready';
  const choiceDiv = createChoiceDiv({'Wait! Maybe I am ready...': displayStartFrame});
  mainContainer.appendChild(message);
  mainContainer.appendChild(choiceDiv);
}

function displayRoundSelectionFrame() {
  numWinsRequired = 0;
  playerWins = 0;
  computerWins = 0;
  clearFrame();
  const mainContainer = getMainContainer();
  const message = createElement('h1');
  message.textContent = 'Best of ...?';
  const choiceDiv = createChoiceDiv({'3': displayFirstHandChoiceFrame, '5': displayFirstHandChoiceFrame, '7': displayFirstHandChoiceFrame, 'other': displayRoundInputFrame});
  mainContainer.appendChild(message);
  mainContainer.appendChild(choiceDiv);
}

function displayRoundInputFrame() {
  clearFrame();
  const mainContainer = getMainContainer();
  const message = createElement('h1');
  message.textContent = "Write the number of rounds you'd like to play below and hit enter";
  const choiceDiv = createElement('div', {'class': ['choices']});
  const goBack = createElement('button');
  goBack.textContent = 'go back?';
  goBack.addEventListener('click', displayRoundSelectionFrame);
  const numRoundsInput = createElement('input');
  numRoundsInput.addEventListener('keyup', checkValid);
  choiceDiv.appendChild(goBack);
  choiceDiv.appendChild(numRoundsInput);
  
  mainContainer.appendChild(message);
  mainContainer.appendChild(choiceDiv);
}

function checkValid(e) {
  if (e.key !== "Enter") return;
  numSupplied = Number(this.value);
  if (!validNumberOfRounds(numSupplied)) {
    alert('Please enter an odd whole number that is greater than 0!')
    return;
  } else {
    displayFirstHandChoiceFrame(e, numSupplied);
  }
}

function validNumberOfRounds(num) {
  return Number.isInteger(num) && num > 0 && num % 2 == 1;
}

function displayFirstHandChoiceFrame(e, numSupplied) {
  if (numSupplied !== undefined) numWinsRequired = Math.floor(numSupplied / 2)+ 1;
  else numWinsRequired = Math.floor((Number(this.textContent) / 2)) + 1;
  clearFrame();
  const mainContainer = getMainContainer();
  const message = createElement('h1');
  message.textContent = 'Make your selection';
  const choiceDiv = createChoiceDiv({'rock': displayRoundResultFrame, 'paper': displayRoundResultFrame, 'scissors': displayRoundResultFrame});
  mainContainer.appendChild(message);
  mainContainer.appendChild(choiceDiv);
}

function displayHandChoiceFrame() {
  clearFrame();
  const mainContainer = getMainContainer();
  const message = createElement('h1');
  message.textContent = 'Make your selection';
  const choiceDiv = createChoiceDiv({'rock': displayRoundResultFrame, 'paper': displayRoundResultFrame, 'scissors': displayRoundResultFrame});
  mainContainer.appendChild(message);
  mainContainer.appendChild(choiceDiv);
}

function displayRoundResultFrame() {
  const mainContainer = getMainContainer();
  const playerChoice = this.textContent;
  const computerChoice = determineComputerSelection();
  let outcome = playRound(playerChoice, computerChoice);
  if (outcome === 1) playerWins++;
  if (outcome === -1) computerWins++;
  if (playerWins === numWinsRequired || computerWins === numWinsRequired) {
    clearFrame();
    const finalResultText = createElement('h1');
    finalResultText.textContent = calculateFinalResultString(playerWins, computerWins);
    const finalTotals = createElement('p');
    finalTotals.textContent = calculateFinalTotalsString(playerWins, computerWins);
    const playAgainMessage = createElement('p');
    playAgainMessage.textContent = 'Would you like to play again?';
    const choiceDiv = createChoiceDiv({'yes': displayRoundSelectionFrame, 'no': displayThankYouFrame});
    mainContainer.appendChild(finalResultText);
    mainContainer.appendChild(finalTotals);
    mainContainer.appendChild(playAgainMessage);
    mainContainer.appendChild(choiceDiv);
  } else {
    clearFrame();
    const outcomeText = createElement('h1');
    outcomeText.textContent = calculateOutcomeString(outcome, playerChoice, computerChoice);
    const currentResults = createElement('p');
    currentResults.textContent = calculateCurrentScoreString(playerWins, computerWins);
    const continueButton = createChoiceDiv({'continue': displayHandChoiceFrame});
    continueButton.setAttribute("data-first-pass", "false");
    continueButton.addEventListener('click', displayHandChoiceFrame);
    mainContainer.appendChild(outcomeText);
    mainContainer.appendChild(currentResults);
    mainContainer.appendChild(continueButton);
  }
}

function displayThankYouFrame() {
  clearFrame();
  const mainContainer = getMainContainer();
  const thankYouMessage = createElement('h1');
  thankYouMessage.textContent = 'Thank you for playing!';
  mainContainer.appendChild(thankYouMessage);
}



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

function calculateOutcomeString(outcome, playerSelection, computerSelection) {
  if (outcome == 1) {
    return `You won! ${capitalizeString(playerSelection)} beats ${computerSelection}.`;
  } else if (outcome == 0) {
    return `You drew! You both chose ${playerSelection}.`;
  } else {
    return `You lost! ${capitalizeString(playerSelection)} loses to ${computerSelection}.`;
  }
}

function calculateFinalResultString(playerWins, computerWins) {
  if (playerWins > computerWins) {
    return "You won the game! Congratulations!";
  } else if (computerWins > playerWins) {
    return "Oh no! You lost the game!";
  } else {
    return "You drew the game!";
  }
}

function calculateFinalTotalsString(playerWins, computerWins) {
  return `Final results:  You won ${playerWins} round${makePlural(playerWins)}, and the computer won ${computerWins} round${makePlural(computerWins)}`;
}

function makePlural(numDistinct) {
  if (numDistinct === 1) {
    return '';
  } else {
    return 's';
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

function calculateCurrentScoreString(playerWins, computerWins) {
  return `Current results: You have won ${playerWins} round${makePlural(playerWins)}, and the computer has won ${computerWins} round${makePlural(computerWins)}`;
}

function determineComputerSelection() {
  const randomNumber = Math.floor(Math.random() * 3);
  switch (randomNumber) {
    case 0: return 'rock';
    case 1: return 'paper';
    default: return 'scissors';
  }
}

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

// got structure of this function (with changes made by myself) from Derlin's answer on https://stackoverflow.com/questions/43168284/javascript-createelement-function
function createElement(type, attributes = {}) {
  const element = document.createElement(type);
  if ( !(Object.keys(attributes).length === 0) );
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
