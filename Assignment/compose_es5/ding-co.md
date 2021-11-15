## 싹 풀스택 - compose 함수 ES5 버전 과제 제출 (김민수)

#

```js
const u = { id: 1, firstName: 'Minsu', lastName: 'Kim' };

function compose() {
  var fns = arguments;
  return function recursive(obj, idx) {
    idx = idx || 0;
    if (idx === fns.length) return obj;
    return recursive(fns[idx++](obj), idx);
  };
}

const fullName = (user) => ({
  ...user,
  fullName: `${user.firstName} ${user.lastName}`,
});

const appendAddr = (user) => ({
  ...user,
  addr: `Seoul`,
});

const removeNames = (user) => {
  delete user.firstName;
  delete user.lastName;
  return user;
};

const data = compose(fullName, appendAddr, removeNames)(u);
console.log(data);
```

### [유의사항]

- Object.assign() 사용 금지
- ES5 버전
- recursive 이용
