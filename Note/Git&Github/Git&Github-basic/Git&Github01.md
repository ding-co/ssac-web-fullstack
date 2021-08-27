## { Git with GitHub } #1 - Git 시작하기

### _Git_

- 함께 소스코드 관리
- Git 구조

  - 서버 - 클라이언트
  - Server Repository - Local Repository
  - Local 에서 작업 완료 후 commit 하면 local에 그제서야 반영됨 (.git)
  - push (서버에 올림), pull (서버에서 가져옴)

- Git Config

  ```bash
  # 바탕화면 git bash 실행

  # 깃 설정 목록
  git config --list

  git config user.name

  # 모든 directory 일괄 설정 (--global)
  git config --global user.name <github-name>

  git config user.email

  git config --global user.eamil <github-email>

  git config --list | grep user.*

  cat ~/.gitconfig
  ```

- Git 클라이언트 - 서버 저장소 연결

  ```bash
  # 로컬 저장소 만들기
  git init

  # 서버에 올리기 싫은 것 세팅
  touch .gitignore

  # repository에 파일 전체 add
  # working directory - local repository 연결됨
  # 아직 들어간 것은 아님
  git add --all

  # 연결된 걸로 몽땅 (-am) local repo에 반영
  git commit -am "first commit"


  # branch check
  git branch

  # server repo - local repo pipeline 통로 연결됨
  git remote add origin <git-remote-url>

  # 최초에만 -u 붙임 (up)
  # 서버의 main 줄기에 소스 올림
  git push -u origin main

  git pull

  # 충돌 무시하고 강제로 올림
  git push -fu origin main

  # git clone
  git clone <git-remote-url>
  ```

#

### [Note]

- SCM (Source Code Management)
- 형상관리 (소스 히스토리 관리)
- 커밋 (작업 완료 처리)
- 아틀라시안; 이슈 트래커
- README.md (시작 페이지)
- markdown 문법
- 윈도우 탐색기로는 역슬래시, bash 쉘은 슬래시
- bash 쉘
  - root 트리: /
  - home 디렉토리: ~ (내 방)
- local repository => .git
- add 한 순간 아직 local Repo에 들어간 것은 아니고 들어갈 준비만 된 상태 <br/>
  내용 들어가려면 commit 해야 함
- local repo - server repo 통로 연결해야 함!
- branch
  - main, sub 줄기
  - main 줄기: origin main (main branch)
  - sub 줄기: main 줄기에 영향 없이 src 고침 <br/>
    이후 main 줄기로 옮기는 것이 merge
  - origin main: 원격지의 main (server repo의 main branch)
- git push 원칙
  - 상대방이 src 수정함 (내 repo - server repo 동기화 되지 않음 => rejected)
  - git pull 먼저 하라고 메시지 나옴
  - 해도 안되면 어쩔 수 없이 git -fu
- git clone 받으면 remote 할 필요 없음 <br/>
  git push할 때도 -u 안붙여도 됨 <br/>
  상위 디렉토리에서 하기 (directory 통째로 만들어짐)

#

### [Q&A]

1. 41:00 <br/>
   강제로 push해서 기존에 작성한 README.md가 사라졌는데, 이런 경우에는 어떻게 하는 것이 좋을까요? <br/>
   (강제 push 이전에 pull을 해도 rejected 오류가 떠서 강제 push를 한 것이지만..) <br/>
   혹시 local이 아니라 따로 깃헙 홈페이지에서 README.md 파일을 수정하고 <br/>
   자동 커밋 된 것이라 발생하는 오류로 어쩔 수 없는 건가요? <br/>
   아니면 사전에 git remote add origin 하고 pull을 미리 했었으면 괜찮았을까요? <br/>

   => github 사이트에서 파일을 작성하고 커밋한 다음,
   로컬에서 push -fu 해버리면 <br/>
   서버 커밋 히스토리는 모두 삭제되고 로컬의 커밋 히스토리가 덮어씀 <br/>
   따라서 서버에서 생성한 파일은 돌릴 수 없을 것임 <br/>
   항상 로컬에서 작업하고 커밋&푸시하고, 먼저 pull 받고 커밋&푸시 해야 함 <br/>
   영상에서 -fu 사용한 것은 서버를 뭉개버리고 싶을 때 사용하는 것임

2. warning: LF will be replaced by CRLF in <파일명>. <br/>
   The file will have its original line endings in your working directory <br/>
   [참고](https://blog.jaeyoon.io/2018/01/git-crlf.html) <br/>
   구글링을 해보니 이것이 unix와 윈도우/리눅스 간의 whitespace 로 인해서 발생하는 경고라는데, <br/>
   그에 따라 git config --global 로 true, false, (true input // 리눅스) 로 세팅할 수 있어서 <br/>
   저는 그냥 경고를 끄는 용도로 false로 세팅했지만, <br/>
   이것과 관련해서 혹시 문제가 발생할 수 있거나 실무와 관련된 내용이 있을까요? <br/>

   => Carriage Return Line Feed가 윈도우 기반(\r\n)과 리눅스 기반(\n)이 다름 <br/>
   다음과 같이 설정하면 됨 <br/>
   윈도우> `git config --global core.autocrlf true` <br/>
   맥> `git config --global core.autocrlf input`

#

### [Reference](https://www.youtube.com/watch?v=dcXLgM8Txug&list=PLEOnZ6GeucBUvJYvTTnNalSFvYqVObVVH&index=1)
