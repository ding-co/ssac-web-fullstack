// id는 k에 매칭
// k가 이김
// object k 시그니쳐가 더 쌤
// name은 괜찮음 (key는 string, 값도 string)
// id에서 에러 발생
// id 타입을 number -> string으로 바꾸면 에러 발생 X
let obj: { id: string; name: string; [k: string]: string; [k: number]: string };

// obj[x] = 0; <- 에러 발생
// obj.x = 0; <- 에러 발생 X

// 붙일 때마다 뭔가 계속 달라지는 경우 있음
// 추가하는 것이 일반적이지만 급할 때는 key로 씀
// 값을 받아서 string만 넘어오게 할 수도 있음
// 프로젝트 하다보면 1~2개 정도 쓸일 있음
