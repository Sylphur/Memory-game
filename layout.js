const body = document.querySelector('body');

export const createLayout = () => {
  const layout = document.createElement('div');
  layout.classList.add('container');

  const header = createHeader();
  const main = createMain();

  layout.appendChild(header);
  layout.appendChild(main);
  body.appendChild(layout);
};

const createHeader = () => {
  const header = document.createElement('header');
  header.classList.add('header');

  const titleElement = document.createElement('h1');
  titleElement.textContent = 'Memory Game';

  const ngButton = document.createElement('button');
  ngButton.classList.add('ng-button');
  ngButton.textContent = 'New game';

  const leaderboardButton = document.createElement('button');
  leaderboardButton.classList.add('lb-button');
  leaderboardButton.textContent = 'Leaderboard';

  const scoreContainer = document.createElement('div');
  scoreContainer.classList.add('score-container');
  const timerLabel = document.createElement('span');
  timerLabel.classList.add('timer-label');
  timerLabel.textContent = 'Timer: ';
  scoreContainer.appendChild(timerLabel);
  const timerCount = document.createElement('span');
  timerCount.classList.add('timer-count');
  timerCount.textContent = '0';
  scoreContainer.appendChild(timerCount);
  const movesLabel = document.createElement('span');
  movesLabel.classList.add('moves-label');
  movesLabel.textContent = 'Moves: ';
  scoreContainer.appendChild(movesLabel);
  const movesCount = document.createElement('span');
  movesCount.classList.add('moves-count');
  movesCount.textContent = '0';
  scoreContainer.appendChild(movesCount);

  header.appendChild(titleElement);
  header.appendChild(ngButton);
  header.appendChild(leaderboardButton);
  header.appendChild(scoreContainer);

  return header;
};

const createMain = () => {
  const main = document.createElement('main');
  main.classList.add('main');
  const mainP = document.createElement('p');
  mainP.classList.add('main-p');
  mainP.textContent = 'Click on the cards to flip them over and try to remember the color.';
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');

  main.appendChild(mainP);
  main.appendChild(cardContainer);

  return main;
};