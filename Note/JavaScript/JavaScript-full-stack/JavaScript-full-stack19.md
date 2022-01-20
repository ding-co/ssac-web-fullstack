### {풀스택} JavaScript 19강 - 스프레드, 디스트럭처링? 고작 이게 다였어??

### _스프레드 연산자_

- `...` : done이 true 될 때까지 next 호출해라 라고 생각해도 됨
- 자주 사용하는 스프레드 패턴

```js
const arr = [1, 2, 3];
const u = { id: 1, name: 'Hong' };

const [a, b, c = 6] = arr;
// 원래는 object에 next 없음 (Symbol.iterator 구현 X)
// 작년부터 가능해짐
// 바벨 돌리면 바벨이 알아서 붙여서 해줌
const {...u, addr: 'Seoul'}
```
'
### _디스트럭처링_

```js
const u = { id: 1, name: 'Hong' };
// nm으로 변수명 재정의해도 디스트럭처링임
const { name: nm } = u;
```

#

### [Note]

- Math.max(...arr)

#

[Reference](https://www.youtube.com/watch?v=i-BHjMawmE8)
