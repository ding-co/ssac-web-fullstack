# {풀스택} React 이론 1강 - 리액트 시작하기

## _React의 작동 원리_

- React는 다른 프레임워크와 비교해서 View 영역만 있음 (차이)
  - Model, Controller 영역이 따로 없음
  - Model 영역을 커버하는 것이 바로 react-redux
  - react-redux는 모델만 관리하는 것이 아니라 모델의 상태까지 관리함 <br/>
    (물론 Context API도 상태까지 관리 가능함)
  - redux는 모델을 가지고 미들웨어도 활용 가능
    - like a 톨게이트
    - but, 미들웨어를 사용하면 많이 무거움
- SPA
  - 바벨
    - ESNext 로 코딩함 (ES6 이상)
    - 최신 JS 코드 브라우저들이 이해 못할 수 있음
    - ESNext -> ES5 변환하기 위해 Babel 사용!
      - ES5는 모든 브라우저 호환 가능
    - Babel은 2014년도에 나옴 (ES6가 2015년도에 나옴)
      - 초기 이름; 6 to 5
    - React는 2013년도에 나옴
    - 2013년도에 JSX 내놓음 (JavaScript XML)
      - HTML 코드 안에서 JS 사용할 수 있도록 해줌
      - 페이스북이 먼저 제안함
    - Babel이 JSX를 표준으로 넣음
    - 과거에 babel.min.js 다 import 해서 사용했음
  - 웹팩
    - JS 파일이 수백개 이상이면 서버로부터 클라이언트로 다 가져오기 부담임
    - 압축해서 가져오기!
      - 하지만 압축해서 가져와서 풀면 똑같음
    - 그래서 웹팩이 나옴
      - a.js가 b.js 사용하고 있으면 b.js 먼저 올려야 함
      - 순서에 맞게 JS 여러 파일들을 한 파일로 만듦
      - 함수/변수 이름 같은 것도 다 줄여서 minify 함
      - 개행 (2바이트)도 다 세미콜론 하나로 바꿔버리고 등...
      - minify하고 압축까지 해서 서버에서 클라이언트단으로 내려줌
      - SASS -> CSS 변환, 이미지 압축 등 다 해줌
      - CRA - build 하면 웹팩이 돌아서 bundle.min.js로 하나로 만들어줌
      - bundle.min.js 이름 말고 회사 명으로 보통 사용함
      - ex. ssac.map.js
        - 변수 이름 다 압축해서 보여주므로 번거로움 (뭔지 모름)
        - map 파일은 콘솔 창에 에러나면 어떤 곳에서 에러 났는지 매핑 정보 제공
        - 서비스 안정화되면 map 파일 제거해도 됨
        - but, 디버깅 필요하면 다시 만들어야 함
    - 현재 리액트에서는 SASS 거의 사용 안함
      - JSX에서 {{ }} 중괄호 2개 사용해서 디자인 적용
      - 웹팩이 빌드할 때 CSS로 바뀜
      - styled in js 같은 것도 사용함
      - style``` 구문 이용

#

### [Note]

- MVC 패턴
  - Model; data
  - View; 화면 (HTML/CSS)
  - Controller; 화면 제어
- 리액트 15까지의 버전 -> 리액트 16버전 (대변혁)
  - 리액트 15까지는 클래스형 컴포넌트 사용
  - 리액트 16부터는 function 컴포넌트 사용함
  - 클래스형 컴포넌트보다 함수형 컴포넌트가 훨씬 좋음
    - why?
    - 함수형 프로그래밍의 장점!
  - 리액트 16부터 Context API 추가됨
    - 이제는 redux 안씀
    - but, Context API가 redux만큼 파워풀하지는 않음
    - 무거워서 Context API를 사용하고, useReduce로 커버 가능 (리액트 빌트인 훅)
  - 조만간에 리액트 15이전 모두 deprecate 될 것임
- 리액트 훅의 장점이 너무 많음
  - 하지만 훅을 잘못 사용하면 앱이 죽어버림
  - 메모리 풀, 화면 계속 다시 렌더링 하는 문제 발생 가능
  - 서버는 노는데 브라우저/앱이 계속 죽을 수 있음
  - 리액트 훅을 정말 잘 이해하고 사용해야 함!!!
- 리액트는 2013년에 나옴
  - 2011년부터 JS 기반 프레임워크 많이 나옴
    - ex. ember, backbone, angular, ...
  - 현재는 CRA를 활용하여 리액트 앱 프로젝트 설정 쉽게 가능
    - CRA는 사실 ember CLI에서 온 것임
  - 리액트에는 순수 기능이 많이 없어서 여러가지를 계속 붙였음
    - cf. immutable (순수 함수) 매우 중요! (immutable.js)
    - date 관련은 moment 라이브러리 사용했음 (편함 but, 조금 무거움)
    - fetch는 JS 빌트인 함수이지만 대부분 사용 안하고 Axios 사용함
- Next.js는 파일 단위로 라우팅 시스템 기능
  - a.module.css 만들면 a.js에서 css 사용 가능
  - 또는 styles.css에서 css 만들어서 js 파일에서 import 해서 변수처럼 사용 가능

#

### [Reference](https://www.youtube.com/watch?v=js-ZIpBv6b4)
