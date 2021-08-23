document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.querySelector('.baseball-game__start');
  const resetBtn = document.querySelector('.baseball-game__reset');
  const inputForm = document.querySelector('#baseball-form');
  const inputGuess = document.querySelector('.baseball-form__text');
  const resultGuess = document.querySelector('.baseball-form__guess');
  const resultRound = document.querySelector('.baseball-form__result');

  const HIDDEN_CLASS = 'hidden';

  let answer = '';
  let guessNumber = '';

  let round = 0;
  let strike = 0;
  let ball = 0;
  let out = 0;

  const createAnswer = function () {
    const numberCandidate = new Set();
    while (answer.length !== 3) {
      const element = Math.floor(Math.random() * 10);
      if (numberCandidate.has(element)) continue;
      numberCandidate.add(element);
      answer += element.toString();
    }
    return answer;
  };

  const handleStartBtn = function () {
    inputForm.classList.remove(HIDDEN_CLASS);
    if (answer === '') {
      answer = createAnswer();
      alert('게임을 시작하겠습니다.');
      console.log(answer);
    } else if (answer === guessNumber || round > 9 || out === 3) {
      alert('이미 게임이 끝났습니다.');
      console.log(answer);
    } else {
      alert('이미 게임이 시작되었습니다.');
      console.log(answer);
    }
  };

  const handleResetBtn = function () {
    // To Do: 새로고침 안하고 form만 초기화 하면서 hidden add하기
    window.location.reload();
  };

  const checkNumber = function (number = '') {
    const guessSet = new Set(number);
    if (guessSet.size === 3) {
      return true;
    }
    alert('중복된 숫자가 있습니다!');
    return false;
  };

  const checkStrike = function (number = '') {
    answerArray = answer.split('');
    guessArray = number.split('');
    strike = 0;
    for (let i = 0; i < number.length; i++) {
      if (answerArray[i] === guessArray[i]) {
        strike += 1;
      }
    }
    return strike;
  };

  const checkBall = function (number = '') {
    answerArray = answer.split('');
    guessArray = number.split('');
    ball = 0;
    for (let i = 0; i < number.length; i++) {
      if (
        answerArray[i] !== guessArray[i] &&
        guessArray.includes(answerArray[i])
      ) {
        ball += 1;
      }
    }
    return ball;
  };

  const checkOut = function (number = '') {
    if (checkStrike(number) === 0 && checkBall(number) === 0) {
      return out + 1;
    }
    return out;
  };

  const handleInputForm = function (event) {
    event.preventDefault();
    guessNumber = inputGuess.value;

    if (checkNumber(guessNumber)) {
      round += 1;
      strike = checkStrike(guessNumber);
      ball = checkBall(guessNumber);
      out = checkOut(guessNumber);

      if (guessNumber === answer && strike === 3) {
        resultGuess.textContent = '';
        resultRound.textContent = 'You win!';
      } else if (round <= 9 && out < 3) {
        resultGuess.textContent = `Your Guess Number is ${guessNumber}`;
        resultRound.textContent = `Round ${round}: ${strike} Strike | ${ball} Ball | ${out} Out`;
      } else {
        resultGuess.textContent = '';
        resultRound.textContent = 'You lose!';
      }
    }
  };

  startBtn.addEventListener('click', handleStartBtn);
  resetBtn.addEventListener('click', handleResetBtn);
  inputForm.addEventListener('submit', handleInputForm);
});
