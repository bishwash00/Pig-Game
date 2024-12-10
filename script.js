'use strict';
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
score0El.textContent = 0;
score1El.textContent = 0;
let score = [0, 0];
let currentScore = 0;
let currentPlayer = 0;
let playing = true;
const switchPlayer = function () {
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentScore = 0;
  currentPlayer = currentPlayer == 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
const diceEl = document.querySelector('.dice');
diceEl.classList.add('hidden');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
btnRoll.addEventListener('click', function () {
  if (playing) {
    let diceNum = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNum}.png`;
    if (diceNum !== 1) {
      currentScore = currentScore + diceNum;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    score[currentPlayer] = score[currentPlayer] + currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      score[currentPlayer];
    if (score[currentPlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', function () {
  if (
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.contains('player--winner')
  ) {
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.remove('player--winner');
  }
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  playing = true;
  currentScore = 0;
  score = [0, 0];
  currentPlayer = 0;
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
});
