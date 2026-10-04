import * as utils from './utils.js';
import { createWinnerModal, createLeaderboardModal } from './modal.js';
import { createLayout } from './layout.js';
createLayout();

const cardContainer = document.querySelector('.card-container');
const timerCount = document.querySelector('.timer-count');
const movesCount = document.querySelector('.moves-count');

let easyMode = false;
let cards = [];
let isFlipped = false;
let flippedCard = null;
let flippedCardID = null;

let activeTimeout = null;
let activeTimer = null;

let moves = 0;
let gameSeconds = 0;

const ngButton = document.querySelector('.ng-button');
ngButton.addEventListener('click', resetGame);
const lbButton = document.querySelector('.lb-button');
lbButton.addEventListener('click', () => {
  const leaderboard = utils.getScore();
  console.log('Found leaderboard: ', leaderboard);
  createLeaderboardModal(leaderboard);
});
const emButton = document.querySelector('.em-button');
emButton.addEventListener('click', () => {
  easyMode = !easyMode;
  console.log('Easy mode: ', easyMode);
  resetGame();
});

const normalCards = ['red', 'red', 'green', 'green', 'orange', 'orange', 'blue', 'blue',
  'cyan', 'cyan', 'yellow', 'yellow', 'purple', 'purple', 'pink', 'pink'];
const easyCards = ['red', 'red', 'green', 'green'];
let core = [];
let remainingCards = core.length;

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
  }, 1000);
};

const initCards = () => {
  core = easyMode ? easyCards : normalCards;
  remainingCards = core.length;
  utils.shuffle(core);
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
        moves++;
        movesCount.textContent = moves;
        if (id === flippedCardID) {
          newCard.classList.add('finalized');
          flippedCard.classList.add('finalized');
          remainingCards = remainingCards - 2;
          console.log('remaining cards: ', remainingCards);
          // FINISH CAN BE CALLED FROM HERE
          if (remainingCards <= 0) finishGame();
          else resetFlipped();
        }
        else {
          resetFlipped();
        }
      }
    });
    cards.push(newCard);
  });
  startTimer();
};

function resetGame() {
  isFlipped = false;
  flippedCardID = null;
  flippedCard = null;
  moves = 0;
  movesCount.textContent = moves;
  remainingCards = core.length;
  clearTimeout(activeTimeout);
  cardContainer.classList.remove('is-locked');
  cardContainer.replaceChildren();
  utils.shuffle(core);
  initCards();
};

const finishGame = () => {
  stopTimer();
  utils.saveScore(moves, gameSeconds);
  createWinnerModal(moves, utils.formatTime(gameSeconds), resetGame);
};

const stopTimer = () => {
  if (activeTimer) {
    clearTimeout(activeTimer);
  }
  activeTimer = null;
};

const startTimer = () => {
  stopTimer();
  gameSeconds = 0;
  timerCount.textContent = '0:00';

  activeTimer = setInterval(() => {
    gameSeconds++;
    timerCount.textContent = utils.formatTime(gameSeconds);
  }, 1000);
};

//start game
initCards();