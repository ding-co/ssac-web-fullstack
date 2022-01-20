# {풀스택} JavaScript 17강 - String 보러왔다가 정규식까지?!

## _String_

- String 생성자 함수
- String 메모리 구성
  - char들의 배열
- String 특별한 함수
  - str.split(''); 유사배열을 완전히 새로운 array로 변환
    - 정규 표현식 사용 가능
  - str.toUpperCase()
  - str.toLowerCase()
  - str.replace()
    - 정규 표현식 사용하면 편함
  - str.startsWith('a')
  - str.endsWith('c')
  - str.substring(start, end - 1)
  - str.slice(start, end - 1)
  - str.repeat(100)

## _RegExp_

- string에서 특정 패턴 찾기
- new RegExp (/정규식/igm)
  - 전체는 정규 표현식
  - i는 ignore (대소문자 구분 X)
  - g는 global (전역 검색)
  - m은 multiline (개행 무시)
    - 개행 있으면 다른 문자열로 판단됨
- 시작 패턴은 ^, 종료 패턴은 $
- 범위
  - [ ] 대괄호 안은 or임
  - [0-9]
    - `-` 하이픈 순서는 아스키코드 값 기준
    - 왼쪽이 오른쪽보다 아스키코드 값 작아야 함
- 대괄호 안에서의 ^은 not 의미
- \s는 띄어쓰기
- \w는 word, [0-9A-Za-z_]
  - \W는 \w 아닌 것
- 최소 하나 이상은 +
- \*는 0개 이상 (있어도 되고 없어도 되고)
  - n개 이상
- ?는 0 또는 1글자
- \d (digit)
  - \D는 \d 아닌 것
- {m,n}는 개수 표현
- .은 문자 하나

```js
// 정규식 예시 1. 전화번호 (해외와 우리나라 패턴 다름)
// 전화번호 제대로 입력했는지 validation check
const tel = '사용자입력값';
const tel1 = new RegExp(/\d{2,3}-?\d{3,4}-?\d{4}/);
const tel2 = new RegExp(/\d{4}-\d{4,5}/);
if (tel1.test(tel) && tel2.test(tel)) {
}

// 정규식 예시 2. 이메일
// indiflex.corp@gmail.com
^[0-9A-Za-z]+[-0-9A-Za-z_\.]*
```

```js
// replace
// 하나씩 매치될 때마다 함수(match => {})가 실행됨
str.replace(/\s+string/, 'String');
str.replace(/(\s)+string/, (match) => {
  return `;${match}`;
});
str.replace(/(\s)+string/, (match) => {
  return `;`.repeat(match.length) + match;
});
```

```js
// camel case -> snake case
str.replace(/.[A-Z]/, (match) => match[0] + '_' + match[1].toLowerCase());

// snake case -> camel case
str.replace(/_[a-z]/, (match) => match[1].toUpperCase());
```

#

### [Note]

- 정규식 사용하는 이유
  - 도메인 라우트에도 정규 표현식 이용하면 여러 곳으로 보내기 편함 (프록시)
- 정규식을 제대로 작성은 못해도 읽을 수는 있어야 함! (이해)
- 정규 표현식은 unittest 이용하여 다양한 패턴 테스트 해봐야 함
- re.test()
- str.match(//)
  - 정규 표현식은 컴파일이 일어남 (CPU 사용 많아짐)
  - 자주 사용하는 정규 표현식들은 따로 전역으로 const로 new RegExp() 해서 빼놓기!

#

[Reference](https://www.youtube.com/watch?v=j3VOXYw1eJA)
