displayStartFrame();

function displayStartFrame() {
  const mainContainer = getMainContainer();
  
  const title = createElement('h1', {"id": "logo"});
  title.textContent = "Rock Paper Scissors";
  mainContainer.appendChild(title);
  
  const choiceDiv = createChoiceDiv({'I am ready': displayRoundSelectionFrame, 'I am not ready': displayNotReadyFrame});
  
  
  mainContainer.appendChild(choiceDiv);
}

function displayNotReadyFrame() {
  clearFrame();
  const mainContainer = getMainContainer();
  const message = createElement('h1');
  message.textContent = 'Come back when you are ready';
  mainContainer.appendChild(message);
}

function displayRoundSelectionFrame() {
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
  console.log(element);
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
