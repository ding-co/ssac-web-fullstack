## {Tip&Talk} 자바스크립트에서 null과 undefined의 메모리 할당

- 변수 선언 <br/>
  ex) `var a;` // js 에서는 선언/정의 둘 다 가능 <br/>
  실행 컨텍스트가 undefined로 표시해 놓음 <br/>
  undefined (아직 값을 초기화 하지 않음) <br/>
  GC가 돌기 전 만약 쓰레기 값 있는지 찝찝하면 null (\o)로 초기화 함 <br/>
  (null: 아무것도 없는 것)
- 숫자는 배정수이므로 8B (8칸)
- 문자는?
  - 어디까지 가져올지 모름
  - 문자 하나당 1byte, 쭉 문자열 길이만큼 크기 잡고 <br/>
    메모리 한 칸 더 잡고 null pointer 주면 됨 (1바이트 더 추가)

### [Note]

- MySQL
  - 영문 한글자 현재는 1byte (과거는 2byte)
  - varchar() 얼만큼 잡을까..
  - 빈공간 생기면 메모리 단편화 (낭비, 비효율성)일 수 있지만 <br/>
    쉽게 찾아갈 수 있긴 함
- 데이터 주고 받는 버스 (패킷의 단위)
- 윈도우 디스크 정리 (OS가 효율적으로 찾아갈 수 있도록 정리)

#

[Reference](https://www.youtube.com/watch?v=tXmjRgOI6GE&list=PLEOnZ6GeucBULV2avLOeBb442o1FkSXRk&index=3)
