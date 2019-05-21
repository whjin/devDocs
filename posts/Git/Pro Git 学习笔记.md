# Pro Git 学习笔记 #

文档地址：[Pro Git](http://iissnan.com/progit/)

# 1、Git起步 #

## 初次运行Git前的配置 ##

### 用户信息 ###

	git config --global user.name "your user name"
	git config --global user.email "your email address"

### 文本编辑器 ###

设置默认的文本编辑器：`git config --global core.editor emacs`

### 查看配置信息 ###

    git config --list

# 2、Git基础 #

## 创建Git仓库 ##

### 在工作目录中初始化新仓库 ###

    git init

### 克隆现有仓库 ###

    git clone url

`url`分`ssh`和`https`两种，推荐使用`ssh`。

### 检查当前文件状态 ###

    git status

### 跟踪最新文件 ###

    git add 文件名或*.js/css/html...或.

### 忽略不想提交的文件 ###

    cat .gitignore

### 查看已暂存和未暂存的更新 ###

    git diff
    git diff --cached

### 提交更新 ###

    git commit -m "提交备注信息"

### 跳过使用暂存区域 ###

    git commit -a "提交备注信息"

在提交时使用`git commit -a`就会把已跟踪的已暂存文件一起提交，跳过`git add`步骤，即两个命令进行合并。

### 移除文件 ###

    git rm

从已跟踪文件清单中移除并删除工作目录中的指定文件，先使用`git status`查看跟踪文件清单，再使用`git rm`进行精准移除。

强制移除使用`git rm -f`，但不推荐使用。

从远程仓库中删除文件，使用：

    git rm --cached 文件名/*.文件后缀/文件夹...

### 移动文件 ###

对文件重命名或移动文件，可以使用：

    git mv file_from file_to

## 查看提交历史 ##

    git log
    git log -p -2

`-p`选项展开显示每次提交的内容差异，用`-2`显示最近的两次更新。

**单词层面的对比，使用：**

    git log -p -U1 --word-diff

这个命令在代码检查中较少使用，在图文编辑中出现较多。

**显示摘要信息，使用：**

    git log --stat

**其他有用的命令：**

`--pretty`选项可以指定使用完全不同于默认格式的方式展示提交历史，用`oneline`将每个提交放在一行显示，这在提交数很大时非常有用：

    git log --pretty=online

`format`可以定制要显示的记录格式：

    git log --pretty=format:"%h - %an, %ar : %s"

### 常用的格式占位符写法及其代表的意义 ###

|选项|说明|
|-----|-----|
|`%H`|提交对象（`commit`）的完整哈希字串|
|`%h`|提交对象的简短哈希字串|
|`%T`|树对象（`tree`）的完整哈希字串|
|`%t`|树对象的简短哈希字串|
|`%P`|父对象（`parent`）的完整哈希字串|
|`%p`|父对象的简短哈希字串|
|`%an`|作者（`author`）的名字|
|`%ae`|作者的电子邮件地址|
|`%ad`|作者修订日期（可以用`-date=`选项定制格式）|
|`%ar`|作者修订日期，按多久以前的方式显示|
|`%cn`|提交者(`committer`)的名字|
|`%ce`|提交者的电子邮件地址|
|`%cd`|提交日期|
|`%cr`|提交日期，按多久以前的方式显示|
|`%s`|提交说明|

**添加ASCII字符串表示的简单图形**

    git log --pretty=format:"%h %s" --graph

### git log 命令支持的选项 ###

|选项|说明|
|----|----|
|`-p`|按补丁格式显示每个更新之间的差异。|
|`--word-diff`|按 `word diff` 格式显示差异。|
|`--stat`|显示每次更新的文件修改统计信息。|
|`--shortstat`|只显示 `--stat` 中最后的行数修改添加移除统计。|
|`--name-only`|仅在提交信息后显示已修改的文件清单。|
|`--name-status`|显示新增、修改、删除的文件清单。|
|`--abbrev-commit`|仅显示 `SHA-1` 的前几个字符，而非所有的 `40` 个字符。|
|`--relative-date`|使用较短的相对时间显示（比如，“`2 weeks ago`”）。|
|`--graph`|显示 `ASCII` 图形表示的分支合并历史。|
|`--pretty`|使用其他格式显示历史提交信息。可用的选项包括 `oneline`，`short`，`full`，`fuller` 和 `format`（后跟指定格式）。|
|`--oneline`|`--pretty=oneline --abbrev-commit` 的简化用法。|

### 限制输出长度 ###

**按照时间作限制的命令**：`--since`和`--until`

    git log --since=2.weeks

**搜索条件**

- `--author` 显示指定作者的提交
- `--grep` 搜索提交说明中的关键字
- `--all-match` 同时满足这两个选项搜索条件的提交

### 其他常用的类似选项 ###

|选项|说明|
|----|-----|
|`-(n)`|仅显示最近的 `n` 条提交|
|`--since`, `--after`|仅显示指定时间之后的提交。|
|`--until`, `--before`|仅显示指定时间之前的提交。|
|`--author`|仅显示指定作者相关的提交。|
|`--committer`|仅显示指定提交者相关的提交。|

**具体示例：**

    git log --pretty="%h - %s"  --author=gitster --since="2018-10-01" \ --before="2008-11-01" --no-merges -- t/

## 撤消操作 ##

### 修改最后一次提交 ###

    git commit --amend

### 取消已经暂存的文件 ###

    git reset HEAD 文件名

### 取消对文件的修改 ###

**:exclamation:这条命令谨慎使用**

    git checkout -- 文件名

## 远程仓库的使用 ##

### 查看当前的远程库 ###

    git remote

**显示对应的克隆地址**

    git remote -v

### 添加远程仓库 ###

    git remote add [shortname] url

**抓取仓库信息**

    git fetch [shortname]

### 从远程仓库抓取数据 ###

此命令会从远程仓库抓取数据到本地

    git fetch [remote-name]

**抓取克隆的远程仓库的更新数据**

    git fetch origin

**:exclamation:**`fetch`命令只是把远程仓库的数据抓取到本地，并不会自动合并到当前工作分支

**推荐使用的拉取远程仓库数据，并进行数据合并操作的命令**

    git pull

### 推送数据到远程仓库 ###

    git push origin master

### 查看远程仓库信息 ###

    git remote show [remote-name]

### 远程仓库的删除和重命名 ###

**重命名远程仓库**

    git remote rename
    git remote rename vue react

**移除远程仓库**

    git remote rm vue

## 打标签 ##

### 显示已有的标签 ###

    git tag

**设定条件进行搜索**

    git tag -l "v1.4.2.*"

### 新建标签 ###

#### 轻量级标签 ####

    git tag

#### 含附注的标签 ####

    git tag -a
    git tag -a v1.4 -m "my version 1.4"

查看相应标签的版本信息

    git show v1.4

### 签署标签 ###

    git tag -s
    git tag -s v1.5 -m "my signed 1.5 tag"

### 验证标签 ###

    git tag -v [tag-name]
    git tag -v v1.4.2.1

### 后期加注标签 ###

**忘记了加注标签，只要在打标签的时候跟上对应提交对象的校验和即可**

    git tag -a v1.2 9fceb02

### 分享标签 ###

    git push origin v1.5

**一次推送所有本地新增标签**

    git push origin --tags

## 技巧和窍门 ##

### 自动补全 ###

**`windows`系统下连续按`Tab`键**

### Git 命令别名 ###

    git config --global alias.ci commit
    git config --global alias.st status

# Git 分支 #

**新建testing分支**

    git branch testing

**切换到testing分支**

    git checkout testing

## 分支的新建与合并 ##

**以上两个命令进行合并**

    git checkout -b testing

**:exclamation:**Git会把工作目录的内容恢复为检出某分支时它所指向的那个提交对象的快照。它会自动添加、删除和修改文件以确保目录的内容和当时提交时完全一样。

**合并提交内容**
    
    git merge
    git checkout master
    git merge hotfix
    
**删除工作分支**    

    git branch -d hotfix
    
### 分支的合并 ###    

**查看冲突** `git status`

**调用可视化的合并工具解决冲突**

    git mergetool
    
## 分支的管理 ##

**查看各个分支最后一个提交对象的信息**

    git branch -v
    
**查看哪些分支已被并入当前分支**

    git branch --merged
    
**查看尚未合并的分支**

    git branch --no-merged
    
## 利用分支进行开发的工作流程 ##

### 长期分支 ###

### 特性分支 ###

## 远程分支 ##

**同步远程服务器上数据到本地**

    git fetch origin 
    
### 推送本地分支 ###

    git push origin master
    
在远程分支上分化出新的分支：

    git checkout -b serverfix origin/serverfix
    
### 跟踪远程分支 ###

    git checkout -b sf origin/serverfix
    
### 删除远程分支 ###

## 分支的衍合 ##

**整合分支方法**

    git merge
    git rebase

**从一个特性分支中再分出一个特性分支的历史**

    git rebase --onto master server client
    
    git checkout master
    git merge server
    
### 衍合的风险 ###

> 一旦分支中的提交对象发布到公共仓库，就千万不要对该分支进行衍合操作。

# 服务器上的 Git #

## 协议 ##

Git可以四种主要的传输协议进行数据传输：本地协议、SSH协议、Git协议和HTTP协议。

## 在服务器上部署 Git ##

    git clone --bare my_project my_project.git
    
### 把裸仓库移到服务器上 ###


   









