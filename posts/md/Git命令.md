# Git命令 #

命令主要分四种类型：

1. 不需要和其他开发者协作的独立开发者
    - `git init`
    - `git show branch`
    - `git commit`

2. 需要和其他人协作的开发者
    - `git clone`
    - `git push`
    - `git pull`
    - `git format patch`

3. 在项目中负责接收其他开发者发来更新的核心开发者
    - `git am`
    - `git pull`
    - `git format patch`
    - `git revert`
    - `git push`

4. 代码仓库管理员
    - `git daemon`
    - `git shell`

## 个人开发者 ##

- `git init` 创建新代码库
- `git show branch` 查看分支
- `git log` 查看日志
- `git checkout/git branch` 切换分支
- `git add` 管理索引文件
- `git diff/git status` 查看状态
- `git commit` 将内容推进现分支
- `git reset/git checkout` （带路径名 参数）放弃修改
- `git merge` 合并本地分支
- `git rebase` 维护主题分支
- `git tag` 给已知点打标签