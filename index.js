const cardContainer = document.querySelector('.card-container');
let cards = [];

let isFlipped = false;
let flippedCard = null;
let flippedCardID = null;
const core = ['red', 'red', 'green', 'green', 'orange', 'orange', 'blue', 'blue'];
shuffle(core);

//fisher-yates shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCardElement(id) {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardFront = document.createElement('div');
  cardFront.classList.add('card-front');

  const frontText = document.createElement('p');
  frontText.textContent = String(id);
  cardFront.append(frontText);

  const cardBack = document.createElement('div');
  cardBack.classList.add('card-back');

  const backText = document.createElement('p');
  backText.textContent = 'X';
  cardBack.append(backText);

  card.append(cardFront, cardBack);

  return card;
}

const resetFlipped = () => {
  isFlipped = false;
  flippedCardID = null;
  flippedCard = null;
  cardContainer.classList.add('is-locked');
  setTimeout(() => {
    cards.forEach((card) => {
      if (!card.classList.contains('finalized')) {
        card.classList.remove('flipped');
      }
      cardContainer.classList.remove('is-locked');
    });
  }, 1000);
};

const initCards = () => {
  core.forEach((id) => {
    const newCard = createCardElement(id);
    cardContainer.appendChild(newCard);

    newCard.addEventListener('click', () => {
      if (!isFlipped) {
        newCard.classList.add('flipped');
        isFlipped = true;
        flippedCardID = id;
        flippedCard = newCard;
        console.log('1st card flipped', flippedCardID);

      }
      else {
        newCard.classList.add('flipped');
        if (id === flippedCardID) {
          newCard.classList.add('finalized');
          flippedCard.classList.add('finalized');
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
initCards();