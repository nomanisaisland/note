​              #1.1 基本概念    https://learngitbranching.js.org/
git 分布式版本控制

## 项目按钮 
1. 仓库(Repository)：用来存放项目代码，每个项目对应一个仓库，多个开源项目则有多个仓库
2. 收藏(Star): 可以将需要的代码收藏起来，收藏的项目可以在你的github首页star里面看到
3. 复制克隆项目(Fork): 将别人的项目克隆到你的GitHub远程库，Fork到的项目是独立存在的，不会影响到你Fork的项目。
4. 发起请求(Pull Request): 如果你在Fork到的代码上面做了一些改进，想要作者加到他的主项目中，可以给作者发出一个PR请求，作者看到就会review你的代码，响应你的请求
5. 关注(Watch): 关注项目，当项目有更新时就会收到通知
6. 事物卡片(Issue)：发现bug，但是目前没有成型代码，需要讨论时用


##github界面组成：
1. GitHub主页
2. 仓库主页
3. 个人主页

##注册
[GitHub官网](https://github.com/)

choose your plan选择公开免费的就可以了


创建一个项目


git分支管理，一个master分支，其他的分支

svn：增量 修改哪个文件更新哪个文件
git：全量 更新是全量增加，能保持数据的完整性

git的三种状态
已修改(modified)
已暂存(stated)
已提交(commited)

	$ git --version   
	//以下每条信息每次提交项目都会跟随你的项目被提交到git远程库
	$ git config --global user.name "aicoder"    //全局设置用户名
	$ git config --global user.email laoma@aicoder.com  //邮件  
	
	$ git config --list   //查看配置信息
	
	$ cd ~/.ssh   进入这个目录，通常在桌面打开gitbash
	$ ls  //如果有配置就会有下面两行信息  id_rsa私钥  id_rsa.pub公钥
	authorized_keys2  id_dsa       known_hosts
	config            id_dsa.pub 
	
	没有配置密钥的话用这个命令配置，一路回车就可以了
	 $ ssh-keygen
ssh-keygen 会确认密钥的存储位置(默认是 .ssh/id_rsa)，然后它会要求你输入两次密钥口令。如 果你不想在使用密钥时输入口令，将其留空即可。
	$ clip < ~/.ssh/id_rsa.pub 将密钥复制到剪贴板
	
	$ cd /path/to/init   //去你需要git的项目
	$ git init			//初始化仓库

此时在目录中将创建一个名为 .git 的子目录,这里面存放当前仓库的所有的跟踪的信息。
此时当前文件夹下面的所有的文件都没有被跟踪，如果需要跟踪变化，必须添加到跟踪的参考中。

	$ git add ./*.js   //添加文件也可以添加项目，添加到暂存区
	$ git add a.txt
	$ git commit -m 'first commit'    //上传本地库，-m后面的是提交日志信息


	$ git status   //检查目前项目在缓存区的状态  如果显示nothing to commit, working tree clean 表示暂时没有任何修改和暂存

git status 命令的输出十分详细，但其用语有些繁琐。 如果你使用 git status -s 命令或 git status --short命令，你将得到一种更为紧凑的格式输出。运行git status -s，有兴趣可以试一下
	
	$ git log   //帮助我们输出git的所有操作日志
	$ git reflog 查看所有日志。



git log选项说明

- -p	按补丁格式显示每个更新之间的差异。
- --stat	显示每次更新的文件修改统计信息。
- --shortstat	只显示 --stat 中最后的行数修改添加移除统计。
- --name-only	仅在提交信息后显示已修改的文件清单。
- --name-status	显示新增、修改、删除的文件清单。
- --abbrev-commit	仅显示 SHA-1 的前几个字符，而非所有的 40 个字符。
- --relative-date	使用较短的相对时间显示(比如，“2 weeks ago”)。
- --graph	显示 ASCII 图形表示的分支合并历史。
- --pretty	使用其他格式显示历史提交信息。可用的选项包括 oneline，short，full，fuller 和 format(后跟指定格式)

如果你不小心创建了一个文件并且提交到了暂存区

	$ touch a.txt
	$ git add a.txt
	$ git status  //可以看到你创的a.txt就在里面。
	
	$ git reset HEAD a.txt   //取消暂存
	$ git status	//发现a.txt消失了
	
	$ git checkout -- a.txt
	
	$ git reset --hard(参数)  [索引值]
	
	//当然还有一种方法
	$ git rm --cached [file name]   //将文件移除暂存区  用git status查看会看到文件也会被移除
git reset --hard(参数)  [索引值]，这个命令可以控制当前访问版本，索引值为哈希值（最前方的一串字母），HEAD为指针，指针对于的是项目分支，这个可以看作是一个浏览器的不同窗口，各做各的，互不干扰。误删后需要找回误删版本内容也可以用这个命令，前提是需要提交到本地库，否则会没有记录

	$ git clean //命令用来从你的工作目录中删除所有没有tracked过的文件。 
1. git clean -n	告诉你哪些文件会被删除. 记住他不会真正的删除文件, 只是一个提醒。
1. git clean -d	删除未跟踪的目录
1. git clean -f	删除当前目录下所有没有track过的文件。忽略文件不被删除！
1. git clean -df	-d代表删除目录，-f强制删除。
1. git clean -xf	删除当前目录下所有没有track过的文件. 不管他是否是.gitignore文件里面指定的文件夹和文件
1. git clean -X	删除所有被忽略的文件

如果被删除的子文件夹中有 .git目录，那么会被忽略掉，如果想删除必须添加-f参数。


分支管理

	$ git branch dev   //创建分支
	$ git checkout dev  //切换分支
	$ git checkout -b dev  上面两个的组合写法
	
	$ git branch -d hotfix   //当分支完成了任务就可以把它删了
	
	$ git branch -v   //查看所有分支，*在谁身上你就在哪个分支


​	
​	$ git merge dev //合并dev分支  合并前需要先进入主分支master，自己删自己的行为肯定是做不了的，主分支和需要合并的分支都需要先提交


	第二种合并的方法：
	$ git Rebase   Rebase 实际上就是取出一系列的提交记录，“复制”它们，然后在另外一个地方逐个的放下去。
	
	先在分支上git rebase,分支会移到主分支上，再回主分支git rebase将主分支向前移动一下，实现合并（bugFix 继承自 master ）


	$ git symbolic-ref HEAD
	查看head指向方向，head指向你正在其基础上进行工作的提交记录。HEAD 总是指向当前分支上最近一次提交记录。
	
	$ git checkout [HEAD]  可以直接指向提交的哈希值为HEAD的历史记录
	使用 $ git log可以查看到提交历史的哈希值，git支持只写哈希值前面4位
	
	相对引用返回历史记录
	git checkout master^   //返回master的上一个父节点
	git checkout master^^  //返回master的上第二个父节点
	
	git checkout master~{3}  //返回master上的第3个父节点，由master开始数
	
	$ git branch -f master HEAD~3  //-f容许将分支强行移到master上的第三个父节点上
	
	$ git branch -f master c3 //把master分支移到c3的提交记录

HEAD 总是指向当前分支上最近一次提交记录。大多数修改提交树的 Gi

Rebase 的优势就是可以创造更线性的提交历史，这听上去有些难以理解。如果只允许使用 Rebase 的话，代码库的提交历史将会变得异常清晰。
合并分支：

	撤销变更：git reset  git revert
	
	$ git reset HEAD~[num]	 //在需要操作的分支上
	git reset 通过把分支记录回退几个提交记录来实现撤销改动。你可以将这想象成“改写历史”。git reset 向上移动分支，原来指向的提交记录就跟从来没有提交过一样。
	
	虽然在你的本地分支中使用 git reset 很方便，但是这种“改写历史”的方法对大家一起使用的远程分支是无效的哦！
	为了撤销更改并分享给别人，我们需要使用 git revert。
	
	$ git revert HEAD
	运行后，在我们要撤销的提交记录后面居然多了一个新提交！这是因为新提交记录 C2' 引入了更改 —— 这些更改刚好是用来撤销 C2 这个提交的。也就是说 C2' 的状态与 C1 是相同的。 
	
	revert 之后就可以把你的更改推送到远程仓库与别人分享啦。

为了撤销更改并分享给别人，我们需要使用 git revert。

	Cherry-pick
	本系列的第一个命令是 git cherry-pick, 命令形式为:
	
	git cherry-pick <提交号>...   //当你知道你需要提交记录的哈希值时用这个
	如果你想将一些提交复制到当前所在的位置（HEAD）下面的话， Cherry-pick 是最直接的方式了。我个人非常喜欢 cherry-pick，因为它特别简单。
	git cherry-pick c1 c2 //将历史记录名为c1,c2的历史记录复制到当前目录下
	 cherry-pick 可以将提交树上任何地方的提交记录取过来追加到 HEAD 上（只要不是 HEAD 上游的提交就没问题）。
	
	当你不知道你需要提交的记录的哈希值是什么的时候可以用这个：
	交互式的rebase
	$ git rebase -i HEAD~4
	会弹出一个框，选择需要复制的，还可以选择顺序
	主要使用场景，如果你修改了一个bug，有三个提交记录，一个是debug，一个是congsole，还有一个是bugfix，需要只把bugfix提交时，可以用在需要提交的记录下使用git rebase -i HEAD~[num]把记录复制到主分支，然后在master分支合并分支就可以了


​	

​	

我们可以通过下面的方法来克服困难：

先用 git rebase -i 将提交重新排序，然后把我们想要修改的提交记录挪到最前
然后用 commit --amend 来进行一些小修改
接着再用 git rebase -i 来将他们调回原来的顺序
最后我们把 master 移到修改的最前端（用你自己喜欢的方法），就大功告成啦！
当然完成这个任务的方法不止上面提到的一种（我知道你在看 cherry-pick 啦），之后我们会多点关注这些技巧啦，但现在暂时只专注上面这种方法。 最后有必要说明一下目标状态中的那几个' —— 我们把这个提交移动了两次，每移动一次会产生一个 '；而 C2 上多出来的那个是我们在使用了 amend 参数提交时产生的，所以最终结果就是这样了。

也就是说，我在对比结果的时候只会对比提交树的结构，对于 ' 的数量上的不同，并不纳入对比范围内。只要你的 master 分支结构与目标结构相同，我就算你通过。





相信通过前面课程的学习你已经发现了：分支很容易被人为移动，并且当有新的提交时，它也会移动。分支很容易被改变，大部分分支还只是临时的，并且还一直在变。

你可能会问了：有没有什么可以永远指向某个提交记录的标识呢，比如软件发布新的大版本，或者是修正一些重要的 Bug 或是增加了某些新特性，有没有比分支更好的可以永远指向这些提交的方法呢？

当然有了！Git 的 tag 就是干这个用的啊，它们可以（在某种程度上 —— 因为标签可以被删除后重新在另外一个位置创建同名的标签）永久地将某个特定的提交命名为里程碑，然后就可以像分支一样引用了。

更难得的是，它们并不会随着新的提交而移动。你也不能检出到某个标签上面进行修改提交，它就像是提交树上的一个锚点，标识了某个特定的位置。
语法：
	$ git tag v1 c1 //给提交记录为c1的记录设置锚点v1
	如果你不指定提交记录，Git 会用 HEAD 所指向的位置。

由于标签在代码库中起着“锚点”的作用，Git 还为此专门设计了一个命令用来描述离你最近的锚点（也就是标签），它就是 git describe！

Git Describe 能帮你在提交历史中移动了多次以后找到方向；当你用 git bisect（一个查找产生 Bug 的提交记录的指令）找到某个提交记录时，或者是当你坐在你那刚刚度假回来的同事的电脑前时， 可能会用到这个命令。

git describe 的​​语法是：

git describe <ref>

<ref> 可以是任何能被 Git 识别成提交记录的引用，如果你没有指定的话，Git 会以你目前所检出的位置（HEAD）。

它输出的结果是这样的：

<tag>_<numCommits>_g<hash>

tag 表示的是离 ref 最近的标签， numCommits 是表示这个 ref 与 tag 相差有多少个提交记录， hash 表示的是你所给定的 ref 所表示的提交记录哈希值的前几位。

当 ref 提交记录上有某个标签时，则只输出标签名称



选择父提交记录
操作符 ^ 与 ~ 符一样，后面也可以跟一个数字。

但是该操作符后面的数字与 ~ 后面的不同，并不是用来指定向上返回几代，而是指定合并提交记录的某个父提交。还记得前面提到过的一个合并提交有两个父提交吧，所以遇到这样的节点时该选择哪条路径就不是很清晰了。

Git 默认选择合并提交的“第一个”父提交，在操作符 ^ 后跟一个数字可以改变这一默认行为。
	$ git checkout master^2  //返回master上的第二个父级

更厉害的是，这些操作符还支持链式操作！比如：
	$ git checkout HEAD~^2~2   //
	等于：
	$ git checkout HEAD~   
	$ git checkout HEAD^2
	$ git checkout HEAD~2


git pull == git fetch  git merge
git pull --rebase == git fetch  git rebase




远程跟踪分支
在前几节课程中有件事儿挺神奇的，Git 好像知道 master 与 o/master 是相关的。当然这些分支的名字是相似的，可能会让你觉得是依此将远程分支 master 和本地的 master 分支进行了关联。这种关联在以下两种情况下可以清楚地得到展示：

pull 操作时, 提交记录会被先下载到 o/master 上，之后再合并到本地的 master 分支。隐含的合并目标由这个关联确定的。
push 操作时, 我们把工作从 master 推到远程仓库中的 master 分支(同时会更新远程分支 o/master) 。这个推送的目的地也是由这种关联确定的！

直接了当地讲，master 和 o/master 的关联关系就是由分支的“remote tracking”属性决定的。master 被设定为跟踪 o/master —— 这意味着为 master 分支指定了推送的目的地以及拉取后合并的目标。

你可能想知道 master 分支上这个属性是怎么被设定的，你并没有用任何命令指定过这个属性呀！好吧, 当你克隆仓库的时候, Git 就自动帮你把这个属性设置好了。

当你克隆时, Git 会为远程仓库中的每个分支在本地仓库中创建一个远程分支（比如 o/master）。然后再创建一个跟踪远程仓库中活动分支的本地分支，默认情况下这个本地分支会被命名为 master。

克隆完成后，你会得到一个本地分支（如果没有这个本地分支的话，你的目录就是“空白”的），但是可以查看远程仓库中所有的分支（如果你好奇心很强的话）。这样做对于本地仓库和远程仓库来说，都是最佳选择。

这也解释了为什么会在克隆的时候会看到下面的输出：

local branch "master" set to track remote branch "o/master"

我能自己指定这个属性吗？
当然可以啦！你可以让任意分支跟踪 o/master, 然后该分支会像 master 分支一样得到隐含的 push 目的地以及 merge 的目标。 这意味着你可以在分支 totallyNotMaster 上执行 git push，将工作推送到远程仓库的 master 分支上。

有两种方法设置这个属性，第一种就是通过远程分支检出一个新的分支，执行:

git checkout -b totallyNotMaster o/master

就可以创建一个名为 totallyNotMaster 的分支，它跟踪远程分支 o/master。


第二种方法
另一种设置远程追踪分支的方法就是使用：git branch -u 命令，执行：

git branch -u o/master foo

这样 foo 就会跟踪 o/master 了。如果当前就在 foo 分支上, 还可以省略 foo：

git branch -u o/master



#Git Push 的参数
很好! 既然你知道了远程跟踪分支，我们可以开始揭开 git push、fetch 和 pull 的神秘面纱了。我们会逐个介绍这几个命令，它们在理念上是非常相似的。

首先来看 git push。在远程跟踪课程中，你已经学到了 Git 是通过当前检出分支的属性来确定远程仓库以及要 push 的目的地的。这是未指定参数时的行为，我们可以为 push 指定参数，语法是：

git push <remote> <place>



<place> 参数是什么意思呢？我们稍后会深入其中的细节, 先看看例子, 这个命令是:

git push origin master

把这个命令翻译过来就是：

切到本地仓库中的“master”分支，获取所有的提交，再到远程仓库“origin”中找到“master”分支，将远程仓库中没有的提交记录都添加上去，搞定之后告诉我。

我们通过“place”参数来告诉 Git 提交记录来自于 master, 要推送到远程仓库中的 master。它实际就是要同步的两个仓库的位置。

需要注意的是，因为我们通过指定参数告诉了 Git 所有它需要的信息, 所以它就忽略了我们所检出的分支的属性！


<place>参数详解
还记得之前课程说的吧，当为 git push 指定 place 参数为 master 时，我们同时指定了提交记录的来源和去向。

你可能想问 —— 如果来源和去向分支的名称不同呢？比如你想把本地的 foo 分支推送到远程仓库中的 bar 分支。

哎，很遗憾 Git 做不到…… 开个玩笑，别当真！当然是可以的啦 :) Git 拥有超强的灵活性（有点过于灵活了）

接下来咱们看看是怎么做的……



要同时为源和目的地指定 <place> 的话，只需要用冒号 : 将二者连起来就可以了：

git push origin <source>:<destination>

这个参数实际的值是个 refspec，“refspec” 是一个自造的词，意思是 Git 能识别的位置（比如分支 foo 或者 HEAD~1）

一旦你指定了独立的来源和目的地，就可以组织出言简意赅的远程操作命令了，让我们看看演示！

#Git fetch 的参数
我们刚学习了 git push 的参数，很酷的 <place> 参数，还有用冒号分隔的 refspecs（<source>:<destination>）。 这些参数可以用于 git fetch 吗？

你猜中了！git fetch 的参数和 git push 极其相似。他们的概念是相同的，只是方向相反罢了（因为现在你是下载，而非上传）

让我们逐个讨论下这些概念……

1. 合并分支前，确保当前分支已经提交状态

2. 快速合并： 如果两个分支之间没有分叉，要被合并的分支提交比当前分支更新，那么只是HEAD指针的移动。

3. 冲突解决： 如果合并的两个分支有分叉，那么自动添加一个新的提交，如果有冲突需要先解决完冲突然后再提交。

解决冲突的办法：就是移除代码中的特殊符号，留下自己想要的代码。（如果实际项目中你不怕被揍的话可以这样干，最好协商处理完）比如：冲突文件如下：

	ssss
	<<<<<<< HEAD
	22222222
	33333333
	44444444
	=======
	devdevdevdev
	>>>>>>> dev
移除上面的 <<<<<<< HEAD 和 ======= >>>>>>> dev（冲突部分）然后留下自己想要的代码就完成了冲突解决，最后add和commit一下就可以了。

	$ git checkout master  //切换到主分支
	$ git merge dev  //把dev分支的内容合并到主分支
	
	//如果产生冲突后,先修改文件，沟通去掉冲突的符号。
	
	 最后提交修改到仓库
	$ git add .
	$ git commit -m '合并冲突'	
合并过程中，随时都可以停止合并，只需要 git merge abort ,仓库和工作去会回到合并之前的状态。
	
	$ git tag -a v1.4 -m 'my version 1.4'   //给提交的文件打个标签	
	$ git tag   //产看标签记录
	
	$ git show v1.4  //查看标签信息与对应提交信息
	
	$ git tag v1.4-lw  //轻量标签  轻量标签本质上是将提交校验和存储到一个文件中 - 没有保存任 何其他信息  无需加字母
	
	$ git tag -a v1.2 9fceb02   //v1.2后的是哈希值，不知道的可以git log看下日志信息


在 Git 中你并不能真的检出一个标签，因为它们并不能像分支一样来回移动。 如果你想要工作目录与仓库中特定 的标签版本完全一样，可以使用git checkout -b [branchname] [tagname]在特定的标签上创建一个 新分支:

	$ git checkout -b version2 v2.0.0
	Switched to a new branch 'version2'
当然，如果在这之后又进行了一次提交，version2 分支会因为改动向前移动了，那么 version2 分支就会和 v2.0.0 标签稍微有些不同，这时就应该当心了。

变基操作：

	git remote rm origin

### 仓库初始化（git init）的时候可能会遇到如下错误：
Reinitialized existing Git repository in D:/gitdemo/.git/

解决方法：git remote add origin 项目地址

git push -u origin master  上传到远程库


git添加远程库的时候有可能出现如下的错误，

fatal: remote origin already exists.

怎么解决？

只要两步：

1、先删除

1
$ git remote rm origin
2、再次执行添加就可以了。　　



fatal: refusing to merge unrelated historie

解决方法：

git需要添加一句代码，在 `git pull` 之后，这句代码是在git 2.9.2版本发生的，最新的版本需要添加 `--allow-unrelated-histories` 告诉 git 允许不相关历史合并

解决冲突后提交

 ----------------------------------------------git常用操作------------------------------------------------

说明，以下整理来自廖雪峰大神的《git教程》。

各位童鞋要下载git但是网速不给力的，可以从这里下载：https://pan.baidu.com/s/1qYdgtJY

1、安装git

git config --global user.name 'XXX'

git config --global user.email 'XXX'

 

 

2、创建本地库

mkidir learngit //自定义文件夹
cd learngit

touch test.md //创建test.md文件
pwd //显示当前目录


3、常用CRT

git init //初始化代码仓库
git add learngit.txt                               //把所有要提交的文件修改放到暂存区
git commit -m 'add a file'                      //把暂存区的所有内容提交到当前分支
git status                                            //查看工作区状态
git diff                                                //查看文件修改内容
git log                                                //查看提交历史
git log --pretty=oneline                       //单行显示
git reset --hard HEAD^　　　　　　　　 //回退到上一个版本，其中（HEAD^^(上上版本),HEAD~100(往上100个版本)）

commit id                                          //(版本号) 可回到指定版本
git reflog                                           //查看历史命令

其中说明【
工作区（Working Directory）
版本库（Repository） #.git
stage(index) 暂存区
master Git自动创建的分支
HEAD 指针

】

git diff HEAD -- <file>                                  //查看工作区和版本库里最新版本的区别
git checkout -- <file>                                   //用版本库的版本替换工作区的版本，无论是工作区的修改还是删除，都可以'一键还原'
git reset HEAD <file>                                   //把暂存区的修改撤销掉，重新放回工作区。
git rm <file>                                               //删除文件，若文件已提交到版本库，不用担心误删，但是只能恢复文件到最新版本


4、创建SSH Key，建立本地Git仓库和GitHub仓库之间的传输的秘钥

ssh-keygen -t rsa -C 'your email'                                                    //创建SSH Key
git remote add origin git@github.com:username/repostery.git          //关联本地仓库，远程库的名字为origin
//第一次把当前分支master推送到远程，-u参数不但推送，而且将本地的分支和远程的分支关联起来
git push -u origin master 
git push origin master                                                                  //把当前分支master推送到远程
git clone git@github.com:username/repostery.git                            //从远程库克隆一个到本地库

5、分支
git checkout -b dev                                   //创建并切换分支
#相当于git branch dev 和git checkout dev 
git branch                                                //查看当前分支，当前分支前有个*号
git branch <name>                                   //创建分支
git checkout <name>                                //切换分支
git merge <name>                                   //合并某个分支到当前分支
git branch -d <name>                               //删除分支
git log --graph                                          //查看分支合并图
git merge --no-ff -m 'message' dev            //禁用Fast forward合并dev分支

git stash                                                 //隐藏当前工作现场，等恢复后继续工作
git stash list                                            //查看stash记录
git stash apply                                         //仅恢复现场，不删除stash内容
git stash drop                                          //删除stash内容
git stash pop                                           //恢复现场的同时删除stash内容
git branch -D <name>                              //强行删除某个未合并的分支

//开发新feature最好新建一个分支
git remote                                               //查看远程仓库
git remote -v                                           //查看远程库详细信息

git pull                                                   //抓取远程提交
git checkout -b branch-name origin/branch-name                  //在本地创建和远程分支对应的分支
git branch --set-upstream branch-name origin/branch-name   //建立本地分支和远程分支的关联

6、其他---标签
git tag v1.0                                                                      //给当前分支最新的commit打标签
git tag -a v0.1 -m 'version 0.1 released' 3628164                 //-a指定标签名，-m指定说明文字
git tag -s <tagname> -m 'blabla'                                        //可以用PGP签名标签
git tag                                                                             //查看所有标签
git show v1.0                                                                   //查看标签信息
git tag -d v0.1                                                                 //删除标签
git push origin <tagname>                                               //推送某个标签到远程
git push origin --tags                                                       //推送所有尚未推送的本地标签





## 华为云常见错误

https://support.huaweicloud.com/codehub_faq/codehub-faq.pdf

remote: 无效的用户名格式，请输入正确的用户名[账户名/用户名]!
remote: 具体可以点击 代码托管首页-设置我的HTTPS密码 查看
remote: 如果您设置了凭证管理[credential.helper], 请先清理.
fatal: repository 'https://codehub.devcloud.cn-north-4.huaweicloud.com/xbt00001/SchoolAllInOne.git/' not found

devcloud 的账号格式是  xxxxxx/xxxxx

华为云学习
地址：https://devcloud.huaweicloud.com/home#/login

1. 新建项目
2. 通用设置添加成员，如果暂时还不知道人员可以自己创建人员
3. Wiki发布需求文档
4. 拿到项目需求后，进入工作进行项目规划，分配人员任务
5. 迭代



代码托管功能

1. 打开puTTY,type不要改，打开generate生成密钥，鼠标在上面移动会更快
2. 将生产的公钥全部复制粘贴，进入代码托管，点击设置我的ssh密钥添加密钥
3. puTTY保存一下密钥就可以了