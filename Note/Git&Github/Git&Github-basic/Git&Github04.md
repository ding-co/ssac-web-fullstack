## { Git with GitHub } #4 마지막 - 총정리

```bash
git config

# working directory
# .git folder (local repo)
git init

# local repo에 작업
git add/commit

# local - remote 통로 뚫기
git remote add origin <remote-url>

git push -u origin main

# branch 생성 후 항상 checkout 하기 전에 commit 잊지 말기!

# 내 local에 br1 브랜치 있는지 아직 모르므로 안됨
# git pull origin br1

git branch -r

# local repo 만들어짐
git checkout -t origin/br1

git pull origin br1

# 임시로 파일 하나만 올릴 때 보통 사용
git checkout -p origin main <파일명>

# main 상태에 있다면
git merge br1

git add/commit

git push origin main
```

#

### [Note]

- local - server 통로 연결하는 건 `git remote add origin`
- origin (깃 서버), origin main (깃 서버의 main 브랜치)
- 깃 서버 (깃허브)
- working directory - stage - main branch (local repo)
- 커밋 대상자들이 stage 영역에 있음
- `git status` => stage 영역 볼 수 있음
- 어느 브랜치에 있는냐에 따라 소스 달라질 수 있음
- 상위 폴더에 .git 폴더 (local repo) 존재하면 안됨 <br/>
  (하위 폴더들이 모두 상위 local repo에 종속됨)
- pull은 존재하는 브랜치에 소스를 내려오는 것임 <br/>
  그래야 diff가 됨 (download와 다른 개념) <br/>
  pull을 한다는 것은 local src와 server src 비교까지 하기 위함 <br/>
- main이 실제 메인 소스임
- 노트에 스스로 개념 정리하기!

#

### [Reference](https://www.youtube.com/watch?v=Gxw_MAPgfK8&list=PLEOnZ6GeucBUvJYvTTnNalSFvYqVObVVH&index=4)
