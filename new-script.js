displayStartFrame();
let numWinsRequired = 0;


function displayStartFrame() {
  clearFrame();
  const mainContainer = getMainContainer();
  
  const title = createElement('h1', {"id": "logo"});
  title.textContent = "Rock Paper Scissors";
  
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
  clearFrame();
  const mainContainer = getMainContainer();
  const message = createElement('h1');
  message.textContent = 'Best of ...?';
  const choiceDiv = createChoiceDiv({'3': displayHandChoiceFrame, '5': displayHandChoiceFrame, '7': displayHandChoiceFrame, 'other': displayRoundInputFrame});
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
    displayHandChoiceFrame(e, numSupplied);
  }
}

function validNumberOfRounds(num) {
  return Number.isInteger(num) && num > 0 && num % 2 == 1;
}

function displayHandChoiceFrame(e, numSupplied) {
  if (numSupplied !== undefined) numWinsRequired = Math.floor(numSupplied / 2)+ 1;
  else numWinsRequired = Math.floor((Number(this.textContent) / 2)) + 1;
  clearFrame();
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
