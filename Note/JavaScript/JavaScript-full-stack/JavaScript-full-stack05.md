### {풀스택} JavaScript 4강 - 변수와 함수의 호이스팅이란?

### _호이스팅_

- 변수 호이스팅

- 함수 호이스팅
  - 함수 선언문
  - 함수 표현식: 변수 호이스팅과 동일

#

### [Note]

- 함수형 언어; 평가(컴파일; 메모리 확보) -> 실행
- JS 엔진이 가지고 있는 메모리 외의 실행 컨텍스트 따로 존재
  - `const`는 바로 넣을 수 있음 (static/cache 영역 따로 존재); JS 엔진마다 다를 수 있음
  - 함수 표현식, function 소스 코드는 미리 평가 안함 (비효율적)
  - 함수 선언문은 다 평가해줌 (내부 코드도 다 평가해서 static 영역에 넣어줌)
  - 함수 표현식은 미리 평가 X

#

[Reference](https://www.youtube.com/watch?v=U-Ef2N2MZmA&list=PLEOnZ6GeucBW11uFNvzxToKym9Zv74hxh&index=8)
