## { Git with GitHub } #3 - Branch 깃 브랜치

### _branch_

```bash
# 1. branch 생성
git branch <branch-name>

# 2. branch 전체 보기
git branch

# 3. branch 전환
git checkout <branch-name>

# 4. 소스 수정 & add & commit 이후
git push origin <branch-name>

git log

# 다른 동료 폴더
git clone <git-remote-url>

git pull

# main 브랜치로 merge
# sub branch에서 수정한 소스 내용을 main 브랜치 동일 파일에 반영
# 목적지에서 소스 가져오기! (수신처에서 merge 처리)
git checkout main
git merge <branch-name>
git branch
git log

# conflict (non fast-forward)
git status

# local branch 보기, 삭제
local> git branch
local> git branch -d <branch-name>

# remote branch 보기, 삭제
remote> git branch -r
remote> git push --delete origin <branch-name>

# 양쪽 branch 모두 보기 (local branch, remote branch)
git branch -a
```

```bash
# branch 연습

git branch br1
git branch
git checkout br1

# 소스 수정 후
git add --all
git commit -am "메세지"

# git branch -r
git branch -a

git push origin br1

git checkout main

# merge 전에 다른 점 체크
git diff br1

# patch
git checkout -p br1 [<파일명>]

a/y

git add --all

# commit할 내용 체크
git status

git commit -am "patch"

git push origin main

# 서버의 특정 브랜치만 가져오기
# origin(서버)
git checkout -t origin/<branch-name>

git checkout br1

git pull origin br1
```

#

### [Note]

- main 브랜치 (main 소스, 서비스 되는 소스)
  - 여러 브랜치 (다른 사람들이 작업하는 소스, 서비스 영향 주지 X, 기능 분할)
- `git commit -m "메세지"` (commit 메세지만 넣기)
- `git commit -am "메세지"` (add/staging도 하고 메세지도 동시에 넣기)
- `git add --all` (지난 commit 이후로 신규로 생성된 모든 파일을 add stage에 추가)
- `git pull` (서버의 main -> local)
- `git checkout -t origin/branch이름` (서버의 특정 branch -> local)
- `git checkout -p 브랜치이름` (local branch 가져오기)
- remote의 HEAD가 실제로 main 브랜치임 <br/>
  local에는 HEAD가 따로 없고 working directory에 있는 소스가 실제 HEAD임 <br/>
  (main과 강하게 연결되어 있는 상태)
- branch 생성 및 변경 전에 commit 절대로 잊지 말기! <br/>
  커밋 안하고 브랜치 옮겨다니면 커밋 안한 소스 유실될 수 있음
- 보통 Github (Git 서버 제공 서비스)에 커밋하고 그 커밋한 내용을 가지고 실 서버로 배포함 <br/>
  바로 배포하면 위험함
- `git pull`은 무조건 main 브랜치 소스 가져오는 것
- 레포지토리 함께 write 하기 위해서 => github collaborator 추가
- repository fork 한 것은 원본 repo랑 다름 <br/>
  항상 git clone은 원본으로 받고 fork된 것은 나만의 url인 것을 인지

#

### [Reference](https://www.youtube.com/watch?v=HkTQ6G5aT84&list=PLEOnZ6GeucBUvJYvTTnNalSFvYqVObVVH&index=3)
