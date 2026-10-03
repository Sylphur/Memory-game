import * as utils from './utils.js';

const cardContainer = document.querySelector('.card-container');

const ngButton = document.querySelector('.ng-button');
ngButton.addEventListener('click', resetGame);

let cards = [];

let isFlipped = false;
let flippedCard = null;
let flippedCardID = null;
let activeTimeout = null;

const core = ['red', 'red', 'green', 'green', 'orange', 'orange', 'blue', 'blue'];
let remainingCards = core.length;

utils.shuffle(core);

const resetFlipped = () => {
  isFlipped = false;
  flippedCardID = null;
  flippedCard = null;
  cardContainer.classList.add('is-locked');
  activeTimeout = setTimeout(() => {
    cards.forEach((card) => {
      if (!card.classList.contains('finalized')) {
        card.classList.remove('flipped');
      }
      cardContainer.classList.remove('is-locked');
    });
    if (remainingCards <= 0) {
      alert('You win!');
    }
  }, 1000);
};

const initCards = () => {
  console.log('Cards remain: ', remainingCards);

  core.forEach((id) => {
    const newCard = utils.createCardElement(id);
    cardContainer.appendChild(newCard);

    newCard.addEventListener('click', () => {
      if (!isFlipped) {
        newCard.classList.add('flipped');
        isFlipped = true;
        flippedCardID = id;
        flippedCard = newCard;

      }
      else {
        newCard.classList.add('flipped');
        if (id === flippedCardID) {
          newCard.classList.add('finalized');
          flippedCard.classList.add('finalized');
          remainingCards = remainingCards - 2;
          console.log('remaining cards: ', remainingCards);

          resetFlipped();
        }
        else {
          resetFlipped();
        }
      }
    });
    cards.push(newCard);
  });
};

function resetGame() {
  isFlipped = false;
  flippedCardID = null;
  flippedCard = null;
  remainingCards = core.length;
  clearTimeout(activeTimeout);
  cardContainer.classList.remove('is-locked');
  cardContainer.replaceChildren();
  utils.shuffle(core);
  initCards();
};

//start game
initCards();