import * as utils from './utils.js';

const appModal = document.createElement('dialog');
appModal.classList.add('app-modal');
document.body.appendChild(appModal);

const openModal = (contentElement) => {
  appModal.replaceChildren();
  appModal.appendChild(contentElement);
  appModal.showModal();
};

const closeModal = () => {
  appModal.close();
};

appModal.addEventListener('click', (e) => {
  const rect = appModal.getBoundingClientRect();
  if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
    closeModal();
  }
});

export const createWinnerModal = (movesCount, timeCount, onNewGameClick) => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('modal-wrapper');

  const titleElement = document.createElement('h2');
  titleElement.textContent = 'Congratulations!';

  const stats = document.createElement('p');
  stats.textContent = `You won! Moves: ${movesCount}, Time: ${timeCount}`;

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('buttons-wrapper');

  const newGameBtn = document.createElement('button');
  newGameBtn.textContent = 'New game';
  newGameBtn.addEventListener('click', () => {
    closeModal();
    if (typeof onNewGameClick === 'function') {
      onNewGameClick();
    }
  });
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Close';
  closeBtn.addEventListener('click', () => {
    closeModal();
  });
  btnWrapper.append(newGameBtn, closeBtn);
  wrapper.append(titleElement, stats, btnWrapper);
  openModal(wrapper);
};

export const createLeaderboardModal = (leaderboard) => {
  console.log('taken lb: ', leaderboard);

  const wrapper = document.createElement('div');
  wrapper.classList.add('modal-wrapper');
  const titleElement = document.createElement('h2');
  titleElement.textContent = 'Leaderboard';
  wrapper.append(titleElement);

  if (leaderboard.length === 0) {
    const noScores = document.createElement('p');
    noScores.textContent = 'No scores yet';
    wrapper.append(noScores);
    openModal(wrapper);
  }
  else {
    const table = document.createElement('table');
    table.classList.add('leaderboard-table');
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    tr.classList.add('leaderboard-tr');
    ['Position', 'Moves', 'Date'].forEach((text) => {
      const thElement = document.createElement('th');
      thElement.textContent = text;
      tr.appendChild(thElement);
    });
    thead.appendChild(tr);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    leaderboard.forEach((score, index) => {
      const row = document.createElement('tr');
      row.classList.add('leaderboard-tr');
      const tdPlace = document.createElement('td');
      tdPlace.textContent = index + 1;
      const tdMoves = document.createElement('td');
      tdMoves.textContent = score.moves;
      const tdTime = document.createElement('td');
      tdTime.textContent = score.date;

      row.append(tdPlace, tdMoves, tdTime);
      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('buttons-wrapper');
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.addEventListener('click', () => {
      closeModal();
    });
    btnWrapper.append(closeBtn);
    wrapper.append(table, btnWrapper);

    openModal(wrapper);
  };
}