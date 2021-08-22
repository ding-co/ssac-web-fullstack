## {Tip&Talk} - 변수선언과 GC의 원리 (call-by-value와 call-by-reference)

```js
// a = 2
// x = a + 3

// []: memory address (example)
// PUT 2 [100]
// STORE a

// 3은 사용만 하고 변수 선언은 따로 안함
// a와 x는 변수가 실행 컨텍스트에서 메모리 주소를 가리키므로
// 이후 G.C가 a와 x는 지나치고 3이 들어있는 메모리 공간은 비워놓음 (더 이상 사용 X)
```

## [Note]

- primitive type은 immutable (새로운 메모리 할당, call by value)
- reference type은 실제로 힙 영역에 있는 시작 주소만 가지고 있음 <br/>
  => mutable임, 주소 참조 (call by reference)

#

[Reference](https://www.youtube.com/watch?v=Gm5Hza1QtKg&list=PLEOnZ6GeucBULV2avLOeBb442o1FkSXRk&index=2)
