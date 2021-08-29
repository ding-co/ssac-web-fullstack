## {Tip&Tech} Git with GitHub - Branch 깃 브랜치 사용법

### _Review_

```bash
# 로컬 저장소 만들기
# 1. cd <work-dir>
# 2. git init (client/local repo 생성 => .git)
# 3. .gitignore 파일 작성
# 4. git add --all
# 5. git commit -am "hi"
# 6. git log
# 7. git config --list
# 8. git config user.name
#    git config -global user.name <github-name>
# 9. git config user.email
#    git config --global user.email <email>
# 10. git remote add origin <git-remote-url>
# 11. git push -u origin main
```

```bash
# git clone & pull

# local - server repo 자동 연결
git clone <github-remote-url>

# 서버 최신 소스 다운받기
# 1. git pull
# 2. git push

# 서버와 연결된 repo 끊기
# 유저가 바뀌거나 conflict 등 발생했을 때 다시 repo 연결 하려고 끊는 것임
git remote rm origin
```

```bash
# merge & conflict

# conflict
# <<<<< HEAD (서버와 충돌난 부분)
# >>>>> local

git add .
git commit -am "hihi"
git log --graph --decorate --oneline
git status
```

### _branch_

```bash
# 동료 브랜치
git branch

git branch testbr

git branch

git checkout testbr

git branch

git add --all
git commit -am "board"
git push origin testbr

git status

git checkout main

git branch

git merge testbr

git add --all
git commit -am "merge testbr"

# conflict 발생
# 위 HEAD가 내가 쓴 것, 아래가 남이 쓴 것
# 경고 및 정보 표시 다 없애고 소스만 남기면 됨
git pull

git commit -am "merge again"

git push

git pull

# 나중에 branch 삭제 시
# 동료 로컬 브랜치만 삭제됨
git branch
git branch -d testbr
git branch

# 서버 브랜치도 삭제
git push --delete origin testbr
```

```bash
# 내 메인 브랜치
git remote rm origin
git remote add origin <remote-url>

# 최초 push는 -u 붙여줘야 함
git push -u origin main
```

#

### [Note]

- SCM
  - Github: 매우 안정적
  - BitBucket
  - Gitlab, Codebase, CloudForge etc.
- windows 한글 깨질 때 utf8로 변경 <br/>
  cmd> `chcp 65001`
- server가 original repo
- git branch는 내 local repo에만 소스가 생성된다고 생각! <br/>
  (다른 사람이 내가 작성하는 코드 보면 문제 생길 수 있음)
- push 전에는 항상 pull 먼저 하기
- git clone 할 때 실제로 https 말고 ssh 쓰는 곳도 많음
- `git branch` 습관화
- branch 추가적으로 더 생성해서 작업할 때는 다른 폴더에 git clone 받아서 <br/>
  branch 생성 후 작업하기 (잘못하면 꼬일 수 있음)
- merge 할 때는 항상 merge 할 곳 (ex. main)으로 가서 하기!

#

[Reference](https://www.youtube.com/watch?v=O66zftDrgy8)
