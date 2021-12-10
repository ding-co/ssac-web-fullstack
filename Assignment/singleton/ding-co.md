## 싹 풀스택 - Node.js Singleton 패턴 과제 제출 (김민수)

#

```js
// cache.js
class Cache {
  constructor() {
    if (!Cache.instance) {
      Cache.instance = this;
      console.log('Instance created');
    }
    return Cache.instance;
  }
}

module.exports = Cache;
```

```js
// b.js
const Cache = require('./cache');
const testFunction = () => new Cache();

module.exports = testFunction;
```

```js
// a.js
const Cache = require('./cache.js');
const testFunction = require('./b.js');

new Cache();
testFunction();
```

### [유의사항]

- a.js 에서 cache.js 와 b.js 로부터 생성자 함수 호출 시 <br/>
  인스턴스가 한 개만 생성되는지 체크
