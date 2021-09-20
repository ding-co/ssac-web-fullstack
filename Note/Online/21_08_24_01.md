## {즉문즉설} 원시(Primitive) 타입이 불변성(immutable)인 이유는?

- 숫자 (8B)
- 아래 내용 논리적인 개념
- Primitive type

  - immutable
    - 만약 mutable이면 메모리 중간에 다른 값이 있으면 <br/>
      기존 mutable로 가정했을 때의 그 공간에 집어넣게 된다면 <br/>
      메모리 공간 매우 비효율으로 활용하게 됨 <br/>
      서로 떨어져 있는 메모리 공간을 합치기에는 곤란함 <br/>
      (물론 링크드 리스트로 쭉 가서 null pointer 나올 때까지 <br/>
      갈 수는 있지만... 분리는 치명적임) <br/>
      따라서 메모리 공간을 새로 잡아서 할당하는게 훨씬 나음

- Object type
  - mutable (가변적)
  - 참조 주소는 안바뀜
  - heap 메모리 영역에 둠
    - 넓은 공간
    - 메모리

#

### [Note]

- CPU - 메모리 간의 속도 차이 해결 위해 캐시 메모리 이용
- 자주 쓰는 코드는 JS 엔진의 평가 시점에 알게 되므로 <br/>
  cache로 가져와서 활용함 (H/W 물리적인 부분)
- 코드를 짜고 나서 무한 반복 보기

#

[Reference](https://www.youtube.com/watch?v=N6F26EN2JpE&list=PLEOnZ6GeucBULV2avLOeBb442o1FkSXRk&index=3)
