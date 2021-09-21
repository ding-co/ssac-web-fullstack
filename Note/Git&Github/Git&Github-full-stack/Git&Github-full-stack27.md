## {풀스택#27} Git 실무 - Git with VSCode, branch, merge, rebase, fork & pull request, Code Review

### _Review Git_

- `git init` (로컬 레포지토리 생성)
- Local Repository
  - Working Directory
    - `git add` (untracked file -> Staging)
  - Staging
    - `git commit` (Staging -> .git)
    - `git reset [HEAD]` (Working Directory <- Staging)
  - .git
    - `git push` (.git -> Origin)
    - `git pull` (.git <- Origin)
    - `git reset --soft` (Staging <- .git)
- Remote Repository (Github)
  - Origin (main branch)
  - git push 한 것을 되돌리고 싶으면 soft reset 이후 다시 push -f

### _Git with VS Code_

- VS Code Extensions
  - Git Extension Pack
  - Markdown All in One
  - 참고) GitLens, Git History, ...
- U (Untracked)
- add gitignore
  - Python
-

### _Git Branch & Rebase/Reset/Tag_

### _Fork & Request_

### _Code Review (Conversation)_

-

#

### [Note]

- Social Coding (오픈 소스 contribute)
- .git과 Origin 사이에 통로가 생기면 upstream 되어 있음
- Source Control에 GitLens가 통합되어 나옴
- setting
  - git enabled 체크

#

### [Reference](https://www.youtube.com/watch?v=LAUCi2eXA9w&list=PLEOnZ6GeucBUvJYvTTnNalSFvYqVObVVH&index=5)
