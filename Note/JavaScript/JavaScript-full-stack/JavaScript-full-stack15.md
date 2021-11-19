### {풀스택} JavaScript 15강 - Number & Math

### _Number_

- NaN

  - window 객체에 있음 (빌트인 객체)
    - ex) window.alert()
    - window 생략 가능
  - Number 객체에도 있음

- isFinite (무한대가 아니냐 / 유한하냐)

  - Number.isFinite
    - 암묵적 형변환 안함 (정확한 계산 위해)
  - window.isFinite
    - 암묵적 형변환 일어남 (숫자로)
  - ex) undefined, null 줬을 때 위 두가지 경우에 대해 각각 다름

- isNaN 사용 권장
  - === NaN 사용 X

### _Math_

- 회계 프로그램 유용 (소수점 처리 위함)
- ex) 부가세 (10%)

  - 987원의 부가세 => 98.7원? (돈 존재 X)
  - 98원 or 99원?

- 수치 계산은 엑셀과 다름

  - 엑셀은 함수에서 round (반올림)으로 많이 함
  - 구글 시트랑 엑셀 시트 계산 다를 수 있음

- Number.EPSILON

  - Math.abs((a + b) - 0.3 [비교대상]) < Number.EPSILON => true!
  - 약간의 오차는 무시

- 수치 계산은 하나로 통일시켜야 함!

  - 여기는 round, 저기는 ceil 이러면 안됨
  - 비즈니스 로직이 항상 한곳으로 가야 나중에 바로 쉽게 고칠 수 있음

- Math.round()

  - 반올림 사실 약간 위험할 수 있음..

- Math.ceil()
- Math.floor()
  - 1.1 내림 => 1
  - -1.1 내림 => -2 (음수 처리 잘하기!)
- Math.abs()
- Math.PI()
- Math.sqrt()
- Math.random()
  - 0 이상 1 미만
- Math.pow()
  - 이제 안씀
  - \*\* 연산자 이용

#

### [Note]

- 모든 언어에서 소수점 처리가 어려운 이유
  - 현재 컴퓨터 설계 방식 => 폰 노이만 구조
  - 0, 1만으로는 소수점 연산 힘듦
  - 비트 연산 필요 (shift/unshift)
  - 메모리에서 1바이트 (8비트)
    - 첫 번째 비트는 부호비트
    - 나머지는 이진수로 채움, 7자리 => tinyint
    - 4바이트 => 2^32
    - unsigned는 음수부분 빼서 2배가 됨
  - 소수점 연산 매우 힘듦
    - ex) 0.1 + 0.2 => 0.300000.....4
    - 0.1 + 0.2 === 0.3 (false)
    - 회계 프로그램 짤 때 곤란한 경우 많음
- 실무에 유용한 기능
  - toFixed()
    - 아무것도 안주면 소수점 날라감
  - toFixed(1)
    - ex) 123 => '12.3'

#

[Reference](https://www.youtube.com/watch?v=MQBvYcKG7fg)
