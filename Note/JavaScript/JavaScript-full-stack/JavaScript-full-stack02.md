## {풀스택} JavaScript 2강 - VSCode 세팅, 유용한 Extension 설치와 단축키 등

- VS Code
  - VS Code 설치
  - Node.js LTS 설치
- VS Code Extensions & Settings
  - indent-rainbow; 들여쓰기 무지개 색
  - Bracket Pair Colorizer 2; 중괄호 색
  - Code Spell Checker
  - Better Comments
  - TODO Highlight (FIXME)
  - Auto-open markdown preview
  - REST Client (rest, https, http ... 확장자 파일)
  - font; cascadia (cf. fira code)
  - cobalt2 theme option (cf. winter is coming, night owl)
  - vs code icons => material icon theme
  - advanced new file
    - ctrl + n (shortcut settings, !terminal.focus)
  - file utils
    - ctrl + shift + p; rename, move, ...
  - sublime text keymap and settings imported (cf. Atom)
  - settings
    - file exclude
    - window.title
      - `${dirty}${activeEditorMedium}${separator}${rootPath}`
- for web 개발
  - opening browser; local에서 browser만 열기 (web server 아님)
  - auto rename tag; tag 하나만 수정해도 양쪽 바뀜
  - live server; 간편하게 웹 서버 띄우기
  - live sass compiler
    - scss; css 편리하게 사용하도록 함 (변수 사용, 상속 가능 등...)
  - html css support
    - bootstrap css cdn link
  - intelligence css class names in html; 이미 사용한 css class 더 이상 안나옴
  - CSS Peek; alt click
  - polacode; code를 이미지로 뜨기
  - live sass compiler settings.json
    - `"liveSassCompile.settings.formats": [ { "format": "compressed", "extensionName": ".min.css", "savePath": "/dist/css" } ]`
    - `"liveSassCompile.settings.generateMap": false`
- VS Code shortcut
  - Ctrl + Shift + P; 실행 터미널
  - Ctrl + P; 파일 열 때
  - Ctrl + W; 닫기
  - Ctrl + Shift + E; 익스플로러 탭
  - Ctrl + Shift + X; 익스텐션 탭
  - Ctrl + Shift + F; 서치
  - Ctrl + Shift + T; 닫았던 마지막 파일 다시 열기
  - Ctrl + Alt + 좌/우 화살표; 파일 좌 우 탭 이동(Ctrl + tab, Ctrl + Shift + [ ])
  - Ctrl + B
  - Ctrl + J; 터미널
  - Ctrl + /; 주석
  - `Ctrl + \`; 듀얼 창
  - Ctrl + D; 똑같은 단어 찾을 때
  - Ctrl + X; 한줄 지우기
  - Ctrl + Alt + 상/하 화살표; 코드 위 아래 옮길 때
  - Alt + Shift + 상/화 화살표; 위 아래 코드 복사
  - Ctrl + [ ]; 좌우 들여쓰기
  - Ctrl + K L / K Q; 블록 접기/펴기
  - Ctrl + + / - / 0; 폰트 확대/축소/원래
  - F12 (Alt + 마우스)
- for JS 개발 익스텐션
  - ESLint, Prettier code formatter
    - npm i eslint -g
    - npm init -y
    - -D (--dev) 옵션; 개발에 필요한 옵션 (서버 배포용 X)
    - eslint --init
  - JS (ES6) Code Snippet
  - ES7 React Code Snippet
  - turbo console log

#

## [Note]

-

#

### [Q&A]

- polacode
- turbo console log; shfit+alt c/u/d

#

[Reference](https://www.youtube.com/watch?v=gf2DnqxnwAc&list=PLEOnZ6GeucBWtTPoN847Rx-hI1_MVZ_m-&index=14)
