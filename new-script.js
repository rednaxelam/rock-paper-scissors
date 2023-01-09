displayIntroFrame1();
let numWinsRequired;
let playerWins;
let computerWins;

function displayIntroFrame1() {
  clearFrame();
  const mainContainer = getMainContainer();
  
  const title = createElement('h1', {"class": ["text-background"]});
  title.textContent = "Humans have been at war with the robots for a 1,000,000,000 years in a bid to control the universe.";
  
  const choiceDiv = createChoiceDiv({'continue': displayIntroFrame2});
  
  mainContainer.appendChild(title);
  mainContainer.appendChild(choiceDiv);
}

function displayIntroFrame2() {
  clearFrame();
  const mainContainer = getMainContainer();
  
  const title = createElement('h1', {"class": ["text-background"]});
  title.textContent = "With no end in sight, it has been decided that a game of rock paper scissors will determine the winner of the war.";
  
  const choiceDiv = createChoiceDiv({'continue': displayIntroFrame3});
  
  mainContainer.appendChild(title);
  mainContainer.appendChild(choiceDiv);
}

function displayIntroFrame3() {
  clearFrame();
  const mainContainer = getMainContainer();
  
  const title = createElement('h1', {"class": ["text-background"]});
  title.textContent = "You have been chosen to represent humanity in this game.";
  
  const choiceDiv = createChoiceDiv({'continue': displayIntroFrame4});
  
  mainContainer.appendChild(title);
  mainContainer.appendChild(choiceDiv);
}

function displayIntroFrame4() {
  clearFrame();
  const mainContainer = getMainContainer();
  
  const title = createElement('h1', {"class": ["text-background"]});
  title.textContent = "You will face the leader of the robots: the computer.";
  
  const choiceDiv = createChoiceDiv({'continue': displayStartFrame});
  
  mainContainer.appendChild(title);
  mainContainer.appendChild(choiceDiv);
}

function displayStartFrame() {
  clearFrame();
  const mainContainer = getMainContainer();
  
  const title = createElement('h1', {"class": ["text-background"]});
  title.textContent = "Are you ready?";
  
  const choiceDiv = createChoiceDiv({'I am ready': displayRoundSelectionFrame, 'wait...': displayNotReadyFrame});
  
  mainContainer.appendChild(title);
  mainContainer.appendChild(choiceDiv);
}

function displayNotReadyFrame() {
  clearFrame();
  const mainContainer = getMainContainer();
  const message = createElement('h1', {"class": ["text-background"]});
  message.textContent = 'This might be our only chance to win the war. Please do this for us.';
  const choiceDiv = createChoiceDiv({'ok...': displayRoundSelectionFrame});
  mainContainer.appendChild(message);
  mainContainer.appendChild(choiceDiv);
}

function displayRoundSelectionFrame() {
  numWinsRequired = 0;
  playerWins = 0;
  computerWins = 0;
  clearFrame();
  const mainContainer = getMainContainer();
  const message = createElement('h1', {"class": ["text-background"]});
  message.textContent = 'Best of ...?';
  const choiceDiv = createChoiceDiv({'3': displayFirstHandChoiceFrame, '5': displayFirstHandChoiceFrame, '7': displayFirstHandChoiceFrame, 'other': displayRoundInputFrame});
  mainContainer.appendChild(message);
  mainContainer.appendChild(choiceDiv);
}

function displayRoundInputFrame() {
  clearFrame();
  const mainContainer = getMainContainer();
  const message = createElement('h1', {"class": ["text-background"]});
  message.textContent = "Write the number of rounds you'd like to play below and hit enter.";
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
  if (numSupplied !== undefined) numWinsRequired = Math.floor(numSupplied / 2)+ 1;
  else numWinsRequired = Math.floor((Number(this.textContent) / 2)) + 1;
  clearFrame();
  const mainContainer = getMainContainer();
  const message = createElement('h1', {"class": ["text-background"]});
  message.textContent = 'Make your decision';
  const choiceDiv = createChoiceDiv({'rock': displayRoundResultFrame, 'paper': displayRoundResultFrame, 'scissors': displayRoundResultFrame});
  mainContainer.appendChild(message);
  mainContainer.appendChild(choiceDiv);
}

function displayHandChoiceFrame() {
  clearFrame();
  const mainContainer = getMainContainer();
  const message = createElement('h1', {"class": ["text-background"]});
  message.textContent = 'Make your decision';
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
    const textContent = createElement('div', {"class": ["text-background"]});
    const finalResultText = createElement('h1');
    finalResultText.textContent = calculateFinalResultString(playerWins, computerWins);
    const finalTotals = createElement('p');
    finalTotals.textContent = calculateFinalTotalsString(playerWins, computerWins);
    const playAgainMessage = createElement('p', {"class": ["text-background"]});
    playAgainMessage.textContent = 'Use your secret time travel machine to reverse time and start again?';
    const choiceDiv = createChoiceDiv({'yes': displayRoundSelectionFrame, 'no': displayEndFrame});
    textContent.appendChild(finalResultText);
    textContent.appendChild(finalTotals);
    mainContainer.appendChild(textContent);
    mainContainer.appendChild(playAgainMessage);
    mainContainer.appendChild(choiceDiv);
  } else {
    clearFrame();
    const textContent = createElement('div', {"class": ["text-background"]});
    const outcomeText = createElement('h1');
    outcomeText.textContent = calculateOutcomeString(outcome, playerChoice, computerChoice);
    const currentResults = createElement('p');
    currentResults.textContent = calculateCurrentScoreString(playerWins, computerWins);
    const continueButton = createChoiceDiv({'continue': displayHandChoiceFrame});
    continueButton.setAttribute("data-first-pass", "false"); //delete?
    continueButton.addEventListener('click', displayHandChoiceFrame);
    textContent.appendChild(outcomeText);
    textContent.appendChild(currentResults);
    mainContainer.appendChild(textContent);
    mainContainer.appendChild(continueButton);
  }
}

function displayEndFrame() {
  clearFrame();
  const mainContainer = getMainContainer();
  const endMessage = createElement('h1', {"class": ["text-background"]});
  if (playerWins > computerWins) {
    endMessage.textContent = 'A glorious new era for humanity awaits!';
  } else {
    endMessage.textContent = 'You have doomed us all. You were the wrong choice...';
  }
  mainContainer.appendChild(endMessage);
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
    return `You won the round. ${capitalizeString(playerSelection)} beats ${computerSelection}.`;
  } else if (outcome == 0) {
    return `You drew the round. You both chose ${playerSelection}.`;
  } else {
    return `You lost the round. ${capitalizeString(playerSelection)} loses to ${computerSelection}.`;
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
  return `Current results: You have won ${playerWins} round${makePlural(playerWins)}, and the computer has won ${computerWins} round${makePlural(computerWins)}.`;
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
