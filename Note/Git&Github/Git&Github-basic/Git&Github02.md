## { Git with GitHub } #2 - Reset, Revert & Merge

### _Reset & Revert_

- Client (local) repo
  - working directory
  - staging area
    - `git add` (working directory -> staging area)
  - git repository
    - `git commit` (staging area -> git local repository)
- Server (origin) repo
  - `git push` (local repo -> server repo)
  - `git pull` (server repo -> local repo)

```bash
git log --graph --oneline

q

git add <파일명>

git commit -am "커밋 메시지"

git push

# default: mixed reset
git reset <revision-id>

# git push -uf origin main
# git push -fu origin main
git push origin +main

git revert <revision-id>
```

#

### [Note]

- commit은 local repo에 저장되는 것이 맞음
- merge: 두 사람이 같은 소스를 수정해서 충돌 났을때 교정하는 것
- reset: commit 되돌리기
- `git add --all` 권장 <br/>
  local PC가 바이러스 걸리거나 포멧하면 위험함 (서버에 소스 없어서)
- IDE/텍스트 에디터 - git plugin 좋은 것이 많음
- 커밋 메세지 => id (revision id)
- HEAD (마지막 커밋한 소스)
- git reset vs. git revert
  - git reset --[hard | soft | mixed]
    - hard 이외 나머지는 소스 그대로
    - hard (완전히 돌림, 커밋 흔적 사라짐, 매우 위험함)
    - soft
    - mixed
    - 정말 감추고 싶을 때 씀
    - git reset --hard는 zip으로 따로 묶어놓고 사용 (백업용 zip)
  - git revert는 약간 취소의 개념
    - 소스 그대로
    - history가 쌓임 (돌아간 것도 기록으로 남음)
    - 흔적 다 남음
    - 아무리 실수했더라도 실무에서 대부분 revert 씀
- 주석은 가독성이 떨어짐 <br/>
  변수, 메서드명 길게 하는 것이 나음 (한눈에 알 수 있도록)
- 같은 커밋 revision
- conflict (한 소스 코드를 함께 고침)

#

### [Reference](https://www.youtube.com/watch?v=FPsbYZXlkO4&list=PLEOnZ6GeucBUvJYvTTnNalSFvYqVObVVH&index=2)
