## {SW공학:자막필수} 옵저버패턴, MVC 패턴, 콜백함수 그리고 구현 요령

### _Observer Pattern_

- publisher/subscriber pattern
- 특정 객체 상태 변화했을 때 필요한 객체들에게 notify 해 줌
- 예시
  - 선생님; 센서 붙여 놓음, 선생님의 동선이 반장들한테 notify 감
    - observable 한 객체 (관찰 대상), model
    - observers[1반 반장, 2반 반장]
    - notify()
    - subscribe(), unsubscribe()
  - 1반 교실 (1반 반장)
    - observer, view
    - 선생님.subscribe(this) // this는 1반 반장
    - 선생님.unscribe(this)
  - 2반 교실 (2반 반장)
    - observer

### [Note]

- GoF
- 콜백 함수

  - 예시
    - 양반
    - 하녀; 요리하다()
    - 머슴; 머슴이 고기 사와서 고기를 하녀한테 던져줌 <br/>
      => 콜백함수는 하녀가 됨 (머슴이 하녀에게 고기를 줌) <br/>
      cb = 하녀.요리하다(고기) <br/>
      머슴.심부름(cb) // cb에 고기를 줌

- MVC 디자인 패턴 (MVVM)
  - 클라이언트 사이드에서 나온 디자인 패턴
  - Model - View - Controller
  - Model: 데이터 (데이터 구조와 값), Observable
  - View: 화면, Observer
  - Controller: Model, View 두 개 컨트롤

#

[Reference](https://www.youtube.com/watch?v=yNvD0pQrYZw)
