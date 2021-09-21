## {풀스택#17} MySQL - SQL 한방에 정리하기 Part 3 - View, Trigger, Function, Procedure

### _View, Trigger_

```sql
create view v_Emp AS
 select e.*, d.dname from Emp e inner join Dept d on e.dept = d.id;

show tables;

select * from information_schema.views
        where table_schema='testdb';

select * from v_Emp where id = 30;
```

```sql
-- Trigger

```

#

## [Note]

- View 를 사용하는 이유
  - Security; different user (접근 권한)
  - Simplicity; query to make easy
  - Performance; compiled query (prepared statment)
  - For Operator(Programmer); need to know detail?!
  - 중복 데이터 제거 (초기에 제대로 설계하지 못함)
- Trigger
  - 어떠한 액션이 취해지기 전/후에 함께 실행

#

### [Q&A]

#

[Reference](https://www.youtube.com/watch?v=3pe0_7FPPY4&list=PLEOnZ6GeucBU7FR26mn9d3Mxqc8V81yHX&index=18)
