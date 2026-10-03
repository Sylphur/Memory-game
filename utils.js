//fisher-yates shuffle
export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const createCardElement = (id) => {
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