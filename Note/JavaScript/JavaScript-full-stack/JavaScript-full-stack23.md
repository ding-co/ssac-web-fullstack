# {풀스택} JavaScript 23강 - DOM events

## _React의 이벤트 처리_

- React는 화면을 그릴뿐 이벤트 처리해주는 것은 아님
  - 다른 프레임워크들은 개별 이벤트 처리 가능
  - React에서 이벤트 처리는 내가 다 함수 처리해야 함
    - convention 없음
    - 직접 이벤트 핸들러 등록하고 실행하고 해야 함

## _상황에 따른 이벤트 처리_

```js
// 과거
if ($eles && $eles.length) {
}

// 현재
const $btn = $eles?.[0] || createBtn();
```

## _이벤트 & 이벤트 핸들러 & 이벤트 타입_

```js
// 브라우저에 이벤트 레지스트리 있음
// 이벤트 큐도 있음; 실행 시킬 이벤트 대기열

$btn.onclick = search;
$btn.addEventListener('click', fn);

$btn.addEventListener('click', (evt) => {
  // 부모 요소는 이벤트 실행 X
  evt.stopPropagation();
  // submit 버튼일 경우
  // evt.preventDefault();
});
```

## _target vs. currentTarget_

- target; 실제로 이벤트 발생한 DOM 요소
  - 이벤트 발생했을 때 먼저 받은 놈
- currentTarget; 이벤트 핸들러 바인딩 되어 있는 요소
  - 이벤트 발생했을 때 실제 주인공

## _이벤트 상속 구조_

- Object
  - Event
    - AnimationEvent
    - ClipboardEvent
    - UIEvent
      - FocusEvent
      - MouseEvent
      - KeyboardEvent
      - InputEvent
        - ChangeEvent, ...

#

### [Note]

- 컴포넌트; HTML의 한 뭉치
- focus; 버블링 안됨 (부모 요소는 이벤트 실행 X)
  - focusin; 버블링 됨 (부모 요소도 이벤트 실행 O)
- blur; 버블링 안됨
  - focusout; 버블링 됨

#

[Reference](https://www.youtube.com/watch?v=5TGGgHDv6GE&list=PLEOnZ6GeucBW11uFNvzxToKym9Zv74hxh&index=24)
