# Git技术细节 #

- `git config -l`：查看当前本机`git`的配置清单  
- `git config --global user "username/email"`：配置用户名和邮箱

**把工作区的内容提交到暂存区**

- `git add file/.`：提交单个文件或全部文件
- `git add -u`：提交所有文件（包含修改和删除，但不包含新增）
- `git add -A`：提交所有修改、新增、删除的信息

**把暂存区内容提交到历史区**

- `git commit`：
- `git commit -m ""`：
- `git commit -a -m ""`：合并提交到暂存区和历史区操作（只适用于已经提交过至少一次的文件）

## Git工作流 ##

- `git log/git reflog`：查看历史提交记录
- `git rm --cahced . -r`：把`.`替换为具体的文件名，从暂存区把所有内容撤回到工作区（不管暂存区中的内容是否已经提交到历史版本上）
- `git checkout .`：把暂存区内容撤回到工作区（覆盖现有工作区中的内容，无法找回）

**本地仓库和远程仓库保持关联**

- `git remote add ""`：
- `git remote rm ""`：移除关联
- `git remote -v`：查看当前仓库和哪些远程仓库保持关联


**本地历史区信息和远程仓库信息保持同步**

- `git push origin master`：把本地信息推送到远程仓库
- `git pull origin master`：把远程信息拉取到本地

## 单独分支管理 ##

- `git branch`：查看当前存在的分支
- `* master`：代表当前在哪个分支上
- `git branch dev`：创建一个dev的分支
- `git checkout dev`：切换到dev分支上
- `git checkout -b dev`：创建并且切换到这个分支

**先切换到master的分支上**

- `git stash`：暂存文件（分支有更改，不能直接切换分支，需要把修改的内容暂存）
- `git stash pop`：还原暂时存储的内容
- `git merge dev`：把dev分支合并到master分支上（有冲突按照之前的规则修改）

**删除本地创建的分支**

- `git branch -D dev`：删除dev分支（删除的时候需要先切换到其他分支才可以删除）
- `git log --graph/--oneline`：两个都有也可以