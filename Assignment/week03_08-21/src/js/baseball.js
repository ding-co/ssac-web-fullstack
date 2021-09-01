document.addEventListener('DOMContentLoaded', () => {
  // Module Pattern
  const Dom = (function () {
    const startBtn = document.querySelector('.baseball-game__start');
    const resetBtn = document.querySelector('.baseball-game__reset');
    const inputForm = document.querySelector('.baseball-game__form');
    const inputGuess = document.querySelector('.baseball-game__input');
    const resultGame = document.querySelector('.baseball-game__result');

    return {
      getStartBtn() {
        return startBtn;
      },
      getResetBtn() {
        return resetBtn;
      },
      getInputForm() {
        return inputForm;
      },
      getInputGuess() {
        return inputGuess;
      },
      getResultGame() {
        return resultGame;
      },
    };
  })();

  const HIDDEN_CLASS = 'hidden';
  const ANSWER_SIZE = 3;

  let answerNumber = '';
  let guessNumber = '';

  let roundCnt = 0;
  let strikeCnt = 0;
  let ballCnt = 0;
  let outCnt = 0;

  const createAnswer = function () {
    // Array  (vs. Set?)
    const numberCandidates = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let numberCandidatesLength = 10;
    for (let i = 0; i < ANSWER_SIZE; i++) {
      const randomNumber = Math.floor(Math.random() * numberCandidatesLength);
      const randomNumberIndex = numberCandidates.indexOf(randomNumber);
      numberCandidates.splice(randomNumberIndex, 1);
      answerNumber += randomNumber.toString();
      numberCandidatesLength -= 1;
    }
    return answerNumber;
  };

  const handleStartBtn = function () {
    Dom.getInputForm().classList.remove(HIDDEN_CLASS);
    // answerNumber === ''
    if (!answerNumber) {
      answerNumber = createAnswer();
      alert('게임을 시작하겠습니다.');
      console.log(answerNumber);
    } else if (answerNumber === guessNumber || roundCnt > 9 || outCnt === 3) {
      alert('이미 게임이 끝났습니다.');
    } else {
      alert('이미 게임이 시작되었습니다.');
    }
  };

  const handleResetBtn = function () {
    Dom.getInputForm().classList.add(HIDDEN_CLASS);
    Dom.getInputForm().value = '';
    Dom.getResultGame().innerHTML = '';
    answerNumber = '';
    guessNumber = '';
    roundCnt = 0;
    strikeCnt = 0;
    ballCnt = 0;
    outCnt = 0;
  };

  const checkNumber = function (userGuessNumber = '') {
    // Set
    const guessSet = new Set(userGuessNumber);
    if (isNaN(Number(userGuessNumber))) {
      alert('숫자만 입력해주세요!');
      return false;
    } else if (guessSet.size !== 3) {
      alert('중복된 숫자가 있습니다!');
      return false;
    }
    return true;
  };

  const checkStrike = function (userGuessNumber = '') {
    strikeCnt = 0;
    for (let i = 0; i < ANSWER_SIZE; i++) {
      if (answerNumber.charAt(i) === userGuessNumber.charAt(i)) {
        strikeCnt += 1;
      }
    }
    return strikeCnt;
  };

  const checkBall = function (userGuessNumber = '') {
    const answerArray = answerNumber.split('');
    const guessArray = userGuessNumber.split('');
    ballCnt = 0;
    for (let i = 0; i < ANSWER_SIZE; i++) {
      if (
        answerArray[i] !== guessArray[i] &&
        answerArray.includes(guessArray[i])
      ) {
        ballCnt += 1;
      }
    }
    return ballCnt;
  };

  const checkOut = function () {
    if (strikeCnt === 0 && ballCnt === 0) {
      return outCnt + 1;
    }
    return outCnt;
  };

  const handleInputForm = function (event) {
    event.preventDefault();
    guessNumber = Dom.getInputGuess().value;

    if (checkNumber(guessNumber)) {
      roundCnt += 1;
      strikeCnt = checkStrike(guessNumber);
      ballCnt = checkBall(guessNumber);
      outCnt = checkOut();

      if (guessNumber === answerNumber || strikeCnt === 3) {
        Dom.getResultGame().innerHTML = `Yeah, the answer was ${answerNumber}.<br/>You win!`;
      } else if (roundCnt <= 9 && outCnt < 3) {
        Dom.getResultGame().innerHTML = `Your Guess Number is ${guessNumber}.<br/>
          Round ${roundCnt}: ${strikeCnt} Strike | ${ballCnt} Ball | ${outCnt} Out`;
      } else {
        Dom.getResultGame().innerHTML = `Sorry, the answer was ${answerNumber}.<br/>You lose!`;
      }
    }
  };

  Dom.getStartBtn().addEventListener('click', handleStartBtn);
  Dom.getResetBtn().addEventListener('click', handleResetBtn);
  Dom.getInputForm().addEventListener('submit', handleInputForm);
});
