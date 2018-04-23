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

**Git工作流**

- `git log/git reflog`：查看历史提交记录
- `git rm --cahced . -r`：把`.`替换为具体的文件名，从暂存区把所有内容撤回到工作区（不管暂存区中的内容是否已经提交到历史版本上）
- `git checkout .`：把暂存区内容撤回到工作区（覆盖现有工作区中的内容，无法找回）
- ``：