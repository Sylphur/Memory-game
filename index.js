const cardContainer = document.querySelector('.card-container');

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

function createCardElement(num) {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardFront = document.createElement('div');
  cardFront.classList.add('card-front');

  const frontText = document.createElement('p');
  frontText.textContent = String(num);
  cardFront.append(frontText);

  const cardBack = document.createElement('div');
  cardBack.classList.add('card-back');

  const backText = document.createElement('p');
  backText.textContent = 'X';
  cardBack.append(backText);

  card.append(cardFront, cardBack);

  return card;
}

const initCards = () => {
  core.forEach((num) => {
    console.log('Current core num: ', num);

    const newCard = createCardElement(num);
    console.log('New card: ', newCard);
    cardContainer.appendChild(newCard);

    newCard.addEventListener('click', () => {
      // cardContainer.querySelectorAll('.card-front').forEach((card) => {
      //   card.classList.remove('flipped');
      // });
      newCard.classList.add('flipped');
    });
  });
};
initCards();