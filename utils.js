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

export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

export const saveScore = (moves, seconds) => {
  const rawData = localStorage.getItem('score');
  let leaderboard = rawData ? JSON.parse(rawData) : [];
  const now = new Date();

  const newRecord = {
    name: 'Anonymous',
    moves: moves,
    seconds: seconds,
    date: now.toLocaleDateString('ru-RU')
  };

  leaderboard.push(newRecord);

  leaderboard.sort((a, b) => {
    if (a.seconds !== b.seconds) {
      return a.moves - b.moves;
    }
    return a.seconds - b.seconds;
  });

  leaderboard = leaderboard.slice(0, 10);
  localStorage.setItem('score', JSON.stringify(leaderboard));
  return leaderboard;
};

export const getScore = () => {
  const rawData = localStorage.getItem('score');
  return rawData ? JSON.parse(rawData) : [];
};