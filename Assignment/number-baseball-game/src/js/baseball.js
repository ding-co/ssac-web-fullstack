document.addEventListener('DOMContentLoaded', () => {
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

  let gAnswerNumber;
  let gGuessNumber;

  let gRoundCnt = 0;
  let gStrikeCnt = 0;
  let gBallCnt = 0;
  let gOutCnt = 0;

  const handleStartBtn = () => {
    Dom.getInputForm().classList.remove(HIDDEN_CLASS);
    if (!gAnswerNumber) {
      gAnswerNumber = createAnswer();
      console.log(gAnswerNumber);
      alert('게임을 시작하겠습니다.');
    } else if (
      gAnswerNumber === gGuessNumber ||
      gRoundCnt > 9 ||
      gOutCnt === 3
    ) {
      alert('이미 게임이 끝났습니다.');
    } else {
      alert('이미 게임이 시작되었습니다.');
    }
  };

  const createAnswer = () => {
    gAnswerNumber = '';
    const numberCandidates = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < ANSWER_SIZE; i++) {
      const randomNumberIndex = Math.floor(
        Math.random() * numberCandidates.length
      );
      const randomNumber = numberCandidates[randomNumberIndex];
      gAnswerNumber += randomNumber.toString();
      deleteRandomNumber(numberCandidates, randomNumberIndex);
    }
    return gAnswerNumber;
  };

  const deleteRandomNumber = (array, index) => {
    for (let i = index; i < array.length - 1; i++) {
      array[i] = array[i + 1];
    }
    array.length -= 1;
  };

  const handleResetBtn = () => {
    resetDom();
    resetGlobalVars();
  };

  const resetDom = () => {
    Dom.getInputForm().classList.add(HIDDEN_CLASS);
    Dom.getInputGuess().value = '';
    Dom.getResultGame().innerHTML = '';
  };

  const resetGlobalVars = () => {
    gAnswerNumber = '';
    gGuessNumber = '';
    gRoundCnt = 0;
    gStrikeCnt = 0;
    gBallCnt = 0;
    gOutCnt = 0;
  };

  const handleInputForm = (event) => {
    event.preventDefault();
    gGuessNumber = Dom.getInputGuess().value;

    if (checkNumber(gGuessNumber)) {
      gRoundCnt += 1;
      gStrikeCnt = checkStrike(gGuessNumber);
      gBallCnt = checkBall(gGuessNumber);
      gOutCnt = checkOut();

      if (gGuessNumber === gAnswerNumber || gStrikeCnt === 3) {
        Dom.getResultGame().innerHTML = `Yeah, the answer was ${gAnswerNumber}.<br/>You win!`;
      } else if (gRoundCnt <= 9 && gOutCnt < 3) {
        Dom.getResultGame().innerHTML = `Your Guess Number is ${gGuessNumber}.<br/>
          Round ${gRoundCnt}: ${gStrikeCnt} Strike | ${gBallCnt} Ball | ${gOutCnt} Out`;
      } else {
        Dom.getResultGame().innerHTML = `Sorry, the answer was ${gAnswerNumber}.<br/>You lose!`;
      }
    }
  };

  const checkNumber = (userGuessNumber) => {
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

  const checkStrike = (userGuessNumber) => {
    gStrikeCnt = 0;
    for (let i = 0; i < ANSWER_SIZE; i++) {
      if (gAnswerNumber[i] === userGuessNumber[i]) {
        gStrikeCnt += 1;
      }
    }
    return gStrikeCnt;
  };

  const checkBall = (userGuessNumber) => {
    gBallCnt = 0;
    for (let i = 0; i < ANSWER_SIZE; i++) {
      if (
        gAnswerNumber[i] === userGuessNumber[(i + 1) % 3] ||
        gAnswerNumber[i] === userGuessNumber[(i + 2) % 3]
      ) {
        gBallCnt += 1;
      }
    }
    return gBallCnt;
  };

  const checkOut = () => {
    if (gStrikeCnt === 0 && gBallCnt === 0) {
      return gOutCnt + 1;
    }
    return gOutCnt;
  };

  Dom.getStartBtn().addEventListener('click', handleStartBtn);
  Dom.getResetBtn().addEventListener('click', handleResetBtn);
  Dom.getInputForm().addEventListener('submit', handleInputForm);
});
