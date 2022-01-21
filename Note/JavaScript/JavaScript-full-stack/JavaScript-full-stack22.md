# {풀스택} JavaScript 22강 - HTML & DOM의 모든 것

## _HTML_

- XML 기반, XHTML
  - XHTML은 닫는 태그 무조건 있어야 함
- XML vs. HTML
  - XML; element, attribute, Text, Comment
  - HTML; tag, attribute, Text/ContentText

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

- 트리
  - 하나 하나 단위 => 노드
  - 루트 노드 - 브랜치 노드 - 리프 노드
- HTML은 XML 기반
  - 쌍따옴표가 표준
- Document (인터페이스)
- DOMPurify.sanitize
- window.getComputedStyle('')

#

[Reference](https://www.youtube.com/watch?v=R4lSqMa0bUk)
