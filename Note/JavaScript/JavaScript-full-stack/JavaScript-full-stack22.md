# {풀스택} JavaScript 22강 - HTML & DOM의 모든 것

## _HTML_

- XML 기반 (XHTML)
  - XHTML은 닫는 태그 무조건 있어야 함
  - 닫는 태그 없어도 되는 것이 HTML (생략 가능)
- XML vs. HTML
  - XML; element, attribute, Text, Comment, ...
  - HTML; tag, attribute, Text/ContentText, Comment, ...

## _DOM_

- Object
  - EventTarget
    - Node
      - Element
        - HTMLElement
          - Div, Span, ...
          - InputElement
            - Value
      - Document
        - HTMLDocument
      - Attribute
      - CharacterData
- HTMLCollection, NodeList => 유사 배열 객체, 이터러블, 스프레드 사용 가능

#

### [Note]

- doctype 태그는 Declaration (선언문)
  - xml, html 등으로 parsing~
- html 태그는 root 노드
- 트리
  - 하나 하나 단위 => 노드
  - 루트 노드 - 브랜치 노드 - 리프 노드
- HTML은 XML 기반
  - 쌍따옴표가 표준
- Document 클래스
  - 구현이 없는 클래스(함수) => 인터페이스
- DOMPurify.sanitize('html')
- window.getComputedStyle('')

#

[Reference](https://www.youtube.com/watch?v=R4lSqMa0bUk)
