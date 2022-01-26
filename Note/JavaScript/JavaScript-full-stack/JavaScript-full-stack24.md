# {풀스택} JavaScript 24강 - 클라이언트 개발자도 알아야 할 Debounce & Throttle

## _Debounce_

- ex. 검색 -> 서버 데이터 조회
  - 그냥 change 이벤트 달면 서버 요청 많아짐
  - 일반적으로 0.5초 소요
  - 에니메이션 변화는 0.1초로 고려
  - 0.5초 안이면 0초로 초기화
  - idle 타임이 0.5초 지나면 서버 요청 전송

```js
// 구현
// 어떻게 부를지 먼저 짜고 debounce 함수 짜기
$inp.addEventListener(
  'change',
  // 하고자 하는 함수는 debounce의 콜백으로 줌
  debounce((evt) => {
    fetch('url', (res) => {});
  }, 500)
);

const debounce = (cb, delay) => {
  let timer;
  return (evt) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(cb, delay, evt);
  };
};
```

## _Throttle_

- ex. 스크롤
  - 로그, 이벤트 매우 많이 일어남
  - 서버 요청(이벤트 리스너) 폭주해서 브라우저 죽어버림
  - 0.1초 동안에는 1번만 실행하도록 함 (이벤트 리스너 실행)
  - 스크롤 위는 removeElement, 아래는 appendElement
  - 서버가 놀면 delay 시간 간격 조금씩 줄여보기
  - 0.1초에 20~30개 정도 나오면 괜찮

```js
// 구현

$inp.addEventListener(
  'change',
  throttle((evt) => {
    fetch('url', (res) => {});
  }, 500)
);

const throttle = (cb, delay) => {
  let timer;
  return (evt) => {
    // 대기자 아직 있어요 (씹기)
    if (timer) return;
    timer = setTimeout(
      () => {
        cb(evt);
        timerId = null;
      },
      delay,
      evt
    );
  };
};
```

#

### [Note]

- React는 화면만 그리므로 내부적으로 디바운스/스로틀 기능 안가지고 있음
  - 대부분 프레임워크에는 존재
  - 리액트에서는 훅으로 별도 컴포넌트 만들어야 함
- 기술면접 빈출 - 디바운스, 스로틀

#

[Reference](https://www.youtube.com/watch?v=Mg5dOUd8pWM&list=PLEOnZ6GeucBW11uFNvzxToKym9Zv74hxh&index=25)
