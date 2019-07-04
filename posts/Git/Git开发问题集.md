# Git开发问题集 #

**生成`ssh`**

    生成新的SSH Key：
    
    $ ssh-keygen -t rsa -C "邮件地址@youremail.com"
    Generating public/private rsa key pair.
    Enter file in which to save the key (/Users/your_user_directory/.ssh/id_rsa):<回车就好>
    注意1: 此处的邮箱地址，你可以输入自己的邮箱地址；注意2: 此处的「-C」的是大写的「C」
    
    然后系统会要你输入密码：
    
    Enter passphrase (empty for no passphrase):<输入加密串>
    Enter same passphrase again:<再次输入加密串>
    在回车中会提示你输入一个密码，这个密码会在你提交项目时使用，如果为空的话提交项目时则不用输入。
    这个设置是防止别人往你的项目里提交内容。
    
    测试
    
    可以输入下面的命令，看看设置是否成功，git@github.com的部分不要修改：
    
    $ ssh -T git@github.com
    如果是下面的反馈：
    
    The authenticity of host 'github.com (ip)' can't be established.
    RSA key fingerprint is ...
    Are you sure you want to continue connecting (yes/no)?
    不要紧张，输入yes就好，然后会看到：
    
    Hi cnfeat! You've successfully authenticated, but GitHub does not provide shell access.
    设置用户信息
    
    现在你已经可以通过SSH链接到GitHub了，还有一些个人信息需要完善的。
    
    Git会根据用户的名字和邮箱来记录提交。GitHub也是用这些信息来做权限的处理，输入下面的代码进行个人信息的设置，
    把名称和邮箱替换成你自己的，名字必须是你的真名，而不是GitHub的昵称。
    
    $ git config --global user.name "cnfeat"//用户名
    $ git config --global user.email  "cnfeat@gmail.com"//填写自己的邮箱

**密钥安装**

    git ssh 密钥生成
    ssh-keygen -t rsa -C "email"
    
    测试连接
    ssh -T git@github.com

**全局配置**

    接下来我们要做的就是把本地仓库传到github上去，在此之前还需要设置username和email，因为github每次commit都会记录他们。
    $ git config --global user.name "username"
    $ git config --global user.email "email"
    
    
    第六步，发布内容。
    现在，这个简单的Blog就可以发布了。先把所有内容加入本地git库。
    　　$ git add .
    　　$ git commit -m "first post"
    
    然后，前往github的网站，在网站上创建一个名为jekyll_demo的库。接着，再将本地内容推送到github上你刚创建的库。
    注意，下面命令中的username，要替换成你的username。
    　　$ git remote add origin 	git remote set-url origin
    　　$ git push origin Cluster
    
    
    在本地新建一个分支： git branch Branch1
    切换到你的新分支: git checkout Branch1
    将新分支发布在github上： git push origin Branch1
    在本地删除一个分支： git branch -d Branch1
    在github远程端删除一个分支： git push origin :Branch1   (分支名前的冒号代表删除)
    
    
    然后，创建一个没有父节点的分支gh-pages。因为github规定，只有该分支中的页面，才会生成网页文件。
    
        　　$ git checkout --orphan gh-pages
    
    以下所有动作，都在该分支下完成。
    
    发布内容。
    
    现在，这个简单的Blog就可以发布了。先把所有内容加入本地git库。
    
        　　$ git add .
    
        　　$ git commit -m "first post"
    
    然后，前往github的网站，在网站上创建一个名为jekyll_demo的库。接着，再将本地内容推送到github上你刚创建的库。
    注意，下面命令中的username，要替换成你的username。
    
        　　$ git remote add origin https://github.com/username/jekyll_demo.git
    
        　　$ git push origin gh-pages
    
    上传成功之后，等10分钟左右，

**分支操作**

    查看分支：
    1 查看本地分支：
    $ git branch
    2 查看远程分支
    $ git branch -r
    
    
    创建分支：
    
    1 创建本地分支（建立分支后，仍停留在当前分支，切换分支：git checkout branchName）
    
    $ git branch branchName
    
    2 创建分支后切换到新分支
    
    $ git checkout -b branchName
    
    
    提交分支：
    
    1 提交到远程分支
    
    $ git commit -a -m 'my new branch'
    
    git push origin branchName:branchName
    
    2 如果想把本地的某个分支mybranch提交到远程仓库，并作为远程仓库的master分支
    
    $ git push origin mybranch:master
    
    
    删除分支：
    
    1 删除远程分支
    
    $ git push origin :branchName
    
    2 删除本地分支，强制删除用-D
    
    $ git branch -d branchName
    
    
    合并分支
    
    将分支branchName和当前所在分支合并
    
    $ git merge branchName
    
    
    标记tag
    
    对当前分支打tag：
    
    git tag tagContent
    
    然后push到远程即可：
    
    git push origin BranchName:BranchName

**删除远程仓库文件或文件夹**

    $ git pull origin master 将远程仓库里面的项目拉下来
    
    $ dir  查看有哪些文件夹
    
    $ git rm -r --cached target  删除target文件夹
    $ git commit -m '删除了target'  提交,添加操作说明
    
    $ git push -u origin master 将本次更改更新到github项目上去
    
    注:本地项目中的target文件夹不受操作影响,删除的只是远程仓库中的target, 可放心删除
    
    每次增加文件或删除文件，都要commit 然后直接 git push -u origin master，就可以同步到github上了

**合并`dev`分支文件到`master`主分支**

    1，上传dev分支文件，或者git pull更新dev分支
    2，切换到master分支，合并文件git merge dev
    3，上传master分支

**`push`本地代码到GitHub出错**

    刚创建的github版本库，在push代码时出错：
    
    $ git push -u origin master
    To git@github.com:******/Demo.git
     ! [rejected]        master -> master (non-fast-forward)
    error: failed to push some refs to 'git@github.com:******/Demo.git'
    hint: Updates were rejected because the tip of your current branch is behind
    hint: its remote counterpart. Merge the remote changes (e.g. 'git pull')
    hint: before pushing again.
    hint: See the 'Note about fast-forwards' in 'git push --help' for details.
    
    网上搜索了下，是因为远程repository和我本地的repository冲突导致的，而我在创建版本库后，
    在github的版本库页面点击了创建README.md文件的按钮创建了说明文档，
    但是却没有pull到本地。这样就产生了版本冲突的问题。
    
    有如下几种解决方法：
    
    1.使用强制push的方法：
    
    $ git push -u origin master -f 
    
    这样会使远程修改丢失，一般是不可取的，尤其是多人协作开发的时候。
    
    2.push前先将远程repository修改pull下来
    
    $ git pull origin master
    
    $ git push -u origin master
    
    3.若不想merge远程和本地修改，可以先创建新的分支：
    
    $ git branch [name]
    
    然后push
    
    $ git push -u origin [name]

**`push`时出现`not found`**

    github中在本地进行上传的时候出现ERROR: Repository not found. fatal: The remote end hung up unexpectedly
    
    一开始出现这个错误的时候还感觉很奇怪，我明明在github网站中已经建立了相应的文件夹了，
    但还是提示相应的库找不到。费劲周折，终于把问题给解决了！
    
    解决方法如下：
    
     在本地中相应的库文件夹命令中输入： vim ./git/config
    
    将文件中的 [remote “origin"]部分去掉！