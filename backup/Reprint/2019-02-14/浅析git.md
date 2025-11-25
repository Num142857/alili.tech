---
title: '浅析git' 
date: 2019-02-14 2:30:37
hidden: true
slug: irsx05cvpw
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">浅析git</h2>
<blockquote>笔者在此整理了常见的git命令，git的重要性无需多言，与其再百度海中搜索git命令，不妨尝试收藏笔者的此篇作品。希望对你的学习有所帮助。</blockquote>
<ul><li>版本控制系统之git</li></ul>
<p>Git:</p>
<p>(一)简介：<br>Git 是一款免费的、开源的、分布式的版本控制系统。旨在快速高效地处理无论规模大小的任何软件工程。<br>每一个 Git克隆 都是一个完整的文件库，含有全部历史记录和修订追踪能力，不依赖于网络连接或中心服务器。其最大特色就是“分支”及“合并”操作非常快速、简便。</p>
<p>(二)Git与svn的主要区别:<br>Git是分布式SCM，而SVN是基于服务器的，也就是说每个开发者本地都有一套git库，每个人维护自己的版本（或者合并其他人的版本），而SVN是每个人写完代码后都及时的checkin到服务器上，进行合并。</p>
<ul><li>Git的优势：</li></ul>
<p>说到优势，那么自然是相对与SVN而言的<br>1.版本库本地化，支持离线提交，相对独立不影响协同开发。每个开发者都拥有自己的版本控制库，在自己的版本库上可以任意的执行提交代码、创建分支等行为。例如，开发者认为自己提交的代码有问题？没关系，因为版本库是自己的，回滚历史、反复提交、归并分支并不会影响到其他开发者。</p>
<p>2.更少的“仓库污染”。git对于每个工程只会产生一个.git目录，这个工程所有的版本控制信息都在这个目录中，不会像SVN那样在每个目录下都产生.svn目录。</p>
<p>3.把内容按元数据方式存储，完整克隆版本库。所有版本信息位于.git目录中，它是处于你的机器上的一个克隆版的版本库，它拥有中心版本库上所有的东西，例如标签、分支、版本记录等。</p>
<p>4.支持快速切换分支方便合并，比较合并性能好。在同一目录下即可切换不同的分支，方便合并，且合并文件速度比SVN快。</p>
<p>5.分布式版本库，无单点故障，内容完整性好。内容存储使用的是SHA-1哈希算法。这能确保代码内容的完整性，确保在遇到磁盘故障和网络问题时降低对版本库的破坏。</p>
<ul><li>本地创建git远程仓库：</li></ul>
<p>我这里使用的是：centos7.2、并且在服务器中已经创建git账户；如果没有创建git账户的朋友，需要先创建git，并且在服务器端安装git</p>
<p>1.在本地建立一个空白的git仓库:<br>Git –bare init<br>注：--bare参数相当与只创建一个空白的仓库，只包含记录版本库历史记录的.git目录下面的文件，不会包含实际项目源文件的拷贝;</p>
<p>2.将本地创建的仓库添加到远程服务器，使用的linux上传命令；<br>Scp –r 文件夹 linux用户名@ip:/文件目录<br>如：scp –r gittest.git root@123.207.172.12:/data./git      <br>(这里是将本地的gittest.git文件夹拷贝到服务器中 /data/git文件夹下)</p>
<p>3.此时可以直接将本地的gittest文件夹关联远程仓库，也可以在本地再次克隆git仓库；使用命令如下：<br>Git clone git@123.207.172.15:/data/git/gittest.git</p>
<p>4.可以直接创建一个文件，进行上传测试；如:<br>cd gittest 进入文件夹<br>vi app.js 然后随便输入字符，esc+wq!进行保存退出；<br>然后将操作添加至暂存区：<br>Git add .<br>创建本地仓库的版本：<br>Git commit –m “haha”<br>提交至远程服务器仓库：<br>Git push origin master;<br>注：如果此时出现此种错误：<br>remote: error: insufficient permission for adding an object to repository database ./objects<br>这时注意自己的服务器git账户是否有写的权限；一般是因为git账户对gittest.git文件夹权限不够；此时登陆自己的服务器，给git账户进行权限的赋予；命令为：<br>Chown –R git:git /data/git/gittest.git<br>权限操作完毕后，再次进行本地仓库与远程仓库的同步，一般此时不再会进行报错；<br>注：服务器git仓库的创建也可以直接在linux操作系统中进行；</p>
<ul><li>本地git创建仓库与github的远程仓库相关联:</li></ul>
<p>1.首先登陆github官网；进行注册、登录</p>
<p>2.创建新的仓库</p>
<p>3.在本地创建git仓库</p>
<p>mkdir githubtest<br>git init<br>vi app.js<br>注：https协议和ssh协议的区别就是每次远程操作都需要输入github的用户名和密码；<br>4.https协议：<br>Git remote add origin <a href="https://github.com/misterguang/githubtest.git" rel="nofollow noreferrer" target="_blank">https://github.com/misterguan...</a><br>Git add .<br>Git commit –m “haha”<br>Git push –u origin master<br>此时需要输入github的用户名和密码</p>
<p>此时会报错: error: failed to push some refs to<br>（此种原因一般为在github的远程仓库有文件，在本地仓库没有，所以此时应该先将远程仓库合并到本地仓库，再进行提交）<br>git pull --rebase origin master<br>注意：这里的rebase和merge的区别，简单理解，rebase在log中无分叉，而merge有<br>再次提交，将会成功；</p>
<ul><li>ssh协议:</li></ul>
<p>首先需要创建密钥<br>ssh-keygen –t rsa –C 837990335@qq.com<br>可以一路回车；<br>(Enter file in which to save the key (/c/Users/dream/.ssh/id_rsa):<br>这里默认就可以，这是存放ssh密钥的路径)</p>
<p>（Enter passphrase (empty for no passphrase):这里为ssh的密码，可以为空）</p>
<p>然后到C:Users用户 .ssh中找到id_rsa.pub,然后复制里面的密钥到github<br>例：C:Usersdream.ssh<br>在github的ssh and gpg keys中new ssh key<br>Title为此ssh的标记<br>Key为你本地的密钥<br>测试下：<br>ssh git@github.com<br>如果输出You've successfully authenticated；说明链接成功；<br>下面的操作跟https的一样：</p>
<ul><li>Git的分支管理:</li></ul>
<p>查看本地分支：$ git branch<br>查看远程分支：$ git branch -r<br>创建本地分支：$ git branch [name] ----注意新分支创建后不会自动切换为当前分支<br>切换分支：$ git checkout [name]<br>创建新分支并立即切换到新分支：$ git checkout -b [name]<br>删除分支：$ git branch -d [name] ---- -d选项只能删除已经参与了合并的分支，对于未有合并的分支是无法删除的。如果想强制删除一个分支，可以使用-D选项<br>合并分支：$ git merge [name] ----将名称为[name]的分支与当前分支合并<br>创建远程分支(本地分支push到远程)：$ git push origin [name]<br>删除远程分支：$ git push origin :heads/[name]&nbsp;或&nbsp;$ gitpush origin :[name]&nbsp;</p>
<p>项目开发的分支：<br>Master:用于发布版本的分支；（用于大版本号更新时使用）<br>Dev：开发时的主分支；<br>Feature：功能分支；（开发某个局部分支，从dev分支上分出来的）<br>Release：创建一个预发布分支（从dev分支上分出来，合并到master分支上，进行tag标注）<br>Bug：bug分支（从master分支上分出来，修改完毕后合并到master和dev分支）</p>
<p>分支合并<br>在git进行分支的合并时<br>如果使用默认的fast-farward merge<br>直接修改当前HEAD指针的指向然后再修改当前HEAD指针，说白了就是修改两个指针的指向，而并没有生成新的commit对象。</p>
<p>如果使用—no-ff 进行合并<br>这样会在master分支上创建一个版本；</p>
<ul><li>git如何解决代码冲突:</li></ul>
<p>1.逻辑冲突<br>git自动处理（合并/应用补丁）成功，但是逻辑上是有问题的。<br>比如另外一个人修改了文件名，但我还使用老的文件名，这种情况下自动处理是能成功的，但实际上是有问题的。<br>又比如，函数返回值含义变化，但我还使用老的含义，这种情况自动处理成功，但可能隐藏着重大BUG。这种问题，主要通过自动化测试来保障。所以最好是能够写出比较完备的自动化测试用例。<br>这种冲突的解决，就是做一次BUG修正。不是真正解决git报告的冲突。<br>2.内容冲突<br>两个用户修改了同一个文件的同一块区域，git会报告内容冲突。我们常见的都是这种，后面的解决办法也主要针对这种冲突。如图中是：app.js冲突:<br><span class="img-wrap"><img data-src="/img/bVbiV8Z?w=552&amp;h=78" src="https://static.alili.tech/img/bVbiV8Z?w=552&amp;h=78" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>然后手动修改冲突的文件:<br><span class="img-wrap"><img data-src="/img/bVbiV88?w=479&amp;h=77" src="https://static.alili.tech/img/bVbiV88?w=479&amp;h=77" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>再次进行文件的提交，版本的创建；<br>3.树冲突<br>文件名修改造成的冲突，称为树冲突。<br>比如，a用户把app.js改名为master.js，b用户把app.js文件改名为test.js，那么b将这两个commit合并时，会产生冲突。<br><span class="img-wrap"><img data-src="/img/bVbiV9O?w=592&amp;h=66" src="https://static.alili.tech/img/bVbiV9O?w=592&amp;h=66" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>此时打开文件，把需要的删除的文件删除掉即可，如把master.js删除掉；<br><span class="img-wrap"><img data-src="/img/bVbiV90?w=590&amp;h=133" src="https://static.alili.tech/img/bVbiV90?w=590&amp;h=133" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>然后，再次重新创建版本即可:</p>
<ul><li>git常用操作命令:</li></ul>
<p>1.查看、添加、提交、删除、找回，重置修改文件<br>git help &lt;command&gt; # 显示command的help<br>git show # 显示某次提交的内容 git show $id<br>git co -- &lt;file&gt; # 抛弃工作区修改<br>git co . # 抛弃工作区修改<br>git add &lt;file&gt; # 将工作文件修改提交到本地暂存区<br>git add . # 将所有修改过的工作文件提交暂存区<br>git rm &lt;file&gt; # 从版本库中删除文件<br>git rm &lt;file&gt; --cached # 从版本库中删除文件，但不删除文件<br>git reset &lt;file&gt; # 从暂存区恢复到工作文件<br>git reset -- . # 从暂存区恢复到工作文件<br>git reset --hard # 恢复最近一次提交过的状态，即放弃上次提交后的所有本次修改<br>git ci &lt;file&gt; git ci . git ci -a # 将git add, git rm和git ci等操作都合并在一起做　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　git ci -am "some comments"<br>git ci --amend # 修改最后一次提交记录<br>git revert &lt;$id&gt; # 恢复某次提交的状态，恢复动作本身也创建次提交对象<br>git revert HEAD # 恢复最后一次提交的状态<br>2.查看文件diff<br>git diff &lt;file&gt; # 比较当前文件和暂存区文件差异 git diff<br>git diff &lt;id1&gt;&lt;id1&gt;&lt;id2&gt; # 比较两次提交之间的差异<br>git diff &lt;branch1&gt;..&lt;branch2&gt; # 在两个分支之间比较<br>git diff --staged # 比较暂存区和版本库差异<br>git diff --cached # 比较暂存区和版本库差异<br>git diff --stat # 仅仅比较统计信息<br>3.查看提交记录<br>git log git log &lt;file&gt; # 查看该文件每次提交记录<br>git log -p &lt;file&gt; # 查看每次详细修改内容的diff<br>git log -p -2 # 查看最近两次详细修改内容的diff<br>git log --stat #查看提交统计信息<br>tig<br>Mac上可以使用tig代替diff和log，brew install tig</p>
<p>4.查看、切换、创建和删除分支<br>git br -r # 查看远程分支<br>git br &lt;new_branch&gt; # 创建新的分支<br>git br -v # 查看各个分支最后提交信息<br>git br --merged # 查看已经被合并到当前分支的分支<br>git br --no-merged # 查看尚未被合并到当前分支的分支<br>git co &lt;branch&gt; # 切换到某个分支<br>git co -b &lt;new_branch&gt; # 创建新的分支，并且切换过去<br>git co -b &lt;new_branch&gt; &lt;branch&gt; # 基于branch创建新的new_branch<br>git co $id # 把某次历史提交记录checkout出来，但无分支信息，切换到其他分支会自动删除<br>git co $id -b &lt;new_branch&gt; # 把某次历史提交记录checkout出来，创建成一个分支<br>git br -d &lt;branch&gt; # 删除某个分支<br>git br -D &lt;branch&gt; # 强制删除某个分支 (未被合并的分支被删除的时候需要强制)<br>5.&nbsp;分支合并和rebase<br>git merge &lt;branch&gt; # 将branch分支合并到当前分支<br>git merge origin/master --no-ff # 不要Fast-Foward合并，这样可以生成merge提交<br>git rebase master &lt;branch&gt; # 将master rebase到branch，相当于： git co &lt;branch&gt; &amp;&amp; git rebase master &amp;&amp; git co master &amp;&amp; git merge &lt;branch&gt;<br>6.&nbsp;Git补丁管理(方便在多台机器上开发同步时用)<br>git diff &gt; ../sync.patch # 生成补丁<br>git apply ../sync.patch # 打补丁<br>git apply --check ../sync.patch #测试补丁能否成功<br>7.&nbsp;Git暂存管理<br>git stash # 暂存<br>git stash list # 列所有stash<br>git stash apply # 恢复暂存的内容<br>git stash drop # 删除暂存区<br>8.Git远程分支管理<br>git pull # 抓取远程仓库所有分支更新并合并到本地<br>git pull --no-ff # 抓取远程仓库所有分支更新并合并到本地，不要快进合并<br>git fetch origin # 抓取远程仓库更新<br>git merge origin/master # 将远程主分支合并到本地当前分支<br>git co --track origin/branch # 跟踪某个远程分支创建相应的本地分支<br>git co -b &lt;local_branch&gt; origin/&lt;remote_branch&gt; # 基于远程分支创建本地分支，功能同上<br>git push # push所有分支<br>git push origin master # 将本地主分支推到远程主分支<br>git push -u origin master # 将本地主分支推到远程(如无远程主分支则创建，用于初始化远程仓库)<br>git push origin &lt;local_branch&gt; # 创建远程分支， origin是远程仓库名<br>git push origin &lt;local_branch&gt;:&lt;remote_branch&gt; # 创建远程分支<br>git push origin :&lt;remote_branch&gt; #先删除本地分支(git br -d &lt;branch&gt;)，然后再push删除远程分支<br>9.Git远程仓库管理<br>GitHub<br>git remote -v # 查看远程服务器地址和仓库名称<br>git remote show origin # 查看远程服务器仓库状态<br>git remote add origin git@ github:robbin/robbin_site.git # 添加远程仓库地址<br>git remote set-url origin git@ github.com:robbin/robbin_site.git # 设置远程仓库地址(用于修改远程仓库地址) git remote rm &lt;repository&gt; # 删除远程仓库<br>10.创建远程仓库<br>git clone --bare robbin_site robbin_site.git # 用带版本的项目创建纯版本仓库<br>scp -r my_project.git git@ git.csdn.net:~ # 将纯仓库上传到服务器上<br>mkdir robbin_site.git &amp;&amp; cd robbin_site.git &amp;&amp; git --bare init # 在服务器创建纯仓库<br>git remote add origin git@ github.com:robbin/robbin_site.git # 设置远程仓库地址<br>git push -u origin master # 客户端首次提交<br>git push -u origin develop # 首次将本地develop分支提交到远程develop分支，并且track<br>git remote set-head origin master # 设置远程仓库的HEAD指向master分支<br>也可以命令设置跟踪远程库和本地库<br>git branch --set-upstream master origin/master<br>git branch --set-upstream develop origin/develop</p>
<ul><li>项目自动化:</li></ul>
<p>现在的前端开发已经不再仅仅只是静态网页的开发了，日新月异的前端技术已经让前端代码的逻辑和交互效果越来越复杂，更加的不易于管理，模块化开发和预处理框架把项目分成若干个小模块，增加了最后发布的困难，没有一个统一的标准，让前端的项目结构千奇百怪。前端自动化构建在整个项目开发中越来越重要。</p>
<p>(一)工具化<br>在前端的技术栈发展过程中，出现了很多的工具，形成了工具化，能够用工具完成的绝不要手工完成，来帮助开发者提升效率。</p>
<ol>
<li>前端工作流工具： Gulp，Grunt</li>
<li>前端js模块编译工具：Babel，Browserify，Webpack</li>
<li>包管理器： npm，bower</li>
<li>前端开发系列工具： livereload，数据mock，代码监控，代码检查。</li>
</ol>
<p>(二)工程化<br>工程化是一个发展趋势，以工具化为基础。</p>
<p>工程的核心是流程自动化，又称为构建，这些包括了：代码质量检测，代码压缩，代码合并，代码优化，代码编译，单元测试等等部分。构建就是把这些以工作流程的方式组合起来，然后用一个命令行运行这整个流程。它有点像批处理，但是是程序开发中使用的特殊批处理。</p>
<p>(三)自动化<br>自动化是以工程化为基础，是在流程自动化上更进一步的自动化。<br>持续集成就是全自动化的一个终极体现。他的主要流程是：版本控制库 -&gt;构建 -&gt;测试 -&gt;报告.</p>
<p>(四)代码规范<br>代码规范可以提高代码的可阅读性和避免一些低级错误。为了将代码规范的检查放到前端开发工程中，各种前端语言都有对应的hint或者lint工具。</p>
<p>(五)预处理<br>SASS<br>甚至为了避免这一点，引入了各种预编译语言，css的预编译less，现在流行的是sass，功能也更加强大，语法错误无法通过编译，来弥补css这种缺陷。</p>
<p>(六)ES6<br>js的预处理语言也有很多，只是为了让有其他语言经验的开发者更容易的上手js的编码。</p>
<p>因为浏览器的实现大多还是 ES5 的标准，为了使用最新的 ES6 语法，通常的做法是采用 Babel 将 ES6 编译为 ES5。</p>
<p>(七)js模块化<br>amd,cmd,common,es6</p>
<p>(八)文件处理<br>通常一个前端项目会分有一个 src 目录和 dist 目录， src 放置源码，dist 放置编译后的代码。所以在前端工程的流程中会涉及到文件的拷贝，删除，移动等流程。</p>
<p>(九)开发效率<br>通常的前端开发过程是，修改前端代码，调用命令编译代码，然后浏览器 F5 刷新。这个过程可以做到自动化，通过代码监控工具，指定要监控的目录和文件，如果对应文件有改变，调用编译工具编译源码，然后通过 livereload 自动刷新浏览器。 gulp-browserify也可以实现同样的功能。</p>
<p>(十)数据的mock<br>现代化前端项目开发大多是前后端分离的方式，也就是后端基本是提供 API 服务，在真实开发环境中，通常的问题是，后端 API 极其不稳定或者没开发，为了不阻碍前端的开发，通常的做法是，前后端先约定 API 接口定义，然后前端根据定义 mock 接口。</p>
<p>(十一)前端工作流<br>为了解决前端工程中复杂的流程，出现了很多开源前端流程处理工具。这些工作流工具不仅仅是其本身，都是一个流程生态体系，每个工具都涉及到对应的插件库，几乎我们能想到的前端工程问题都有对用的插件能够解决。</p>
<ul><li>Gulp:</li></ul>
<p>Gulp 是基于node.js的一个前端自动化构建工具，开发这可以使用它构建自动化工作流程（前端集成开发环境）。&nbsp;<br>使用gulp你可以简化工作量，让你把重点放在功能的开发上，从而提高你的开发效率和工作质量。&nbsp;gulpjs是一个前端构建工具，与gruntjs相比，gulpjs无需写一大堆繁杂的配置参数，API也非常简单，学习起来很容易，而且gulpjs使用的是nodejs中stream来读取和操作数据，其速度更快</p>
<p>(一)安装：<br>需要在全局或者项目中同时安装；<br>Cnpm install -g gulp <br>Cnpm install –save-dev gulp</p>
<p>(二)配置文件</p>
<p>使用gulpfile.js进行配置，基于gulp工作流的项目结构如下：<br><span class="img-wrap"><img data-src="/img/bVbiWaU?w=139&amp;h=73" src="https://static.alili.tech/img/bVbiWaU?w=139&amp;h=73" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>(三)Api:</p>
<p>1.gulp.src(globs[, options]) 输出（Emits）符合所提供的匹配模式（glob）或者匹配模式的数组（array of globs）的文件。 将返回一个&nbsp;Vinyl files&nbsp;的&nbsp;stream&nbsp;它可以被&nbsp;piped&nbsp;到别的插件中。文件的入口<br>A.路径匹配：<br>1)*&nbsp;            ：能匹配&nbsp;a.js,x.y,abc,abc/,但不能匹配a/b.js<br>2)<em>.</em>&nbsp;            ：能匹配&nbsp;a.js,style.css,a.b,x.y<br>3)<em>/</em>/*.js&nbsp;    ：能匹配&nbsp;a/b/c.js,x/y/z.js,不能匹配a/b.js,a/b/c/d.js<br>4)**&nbsp;能匹配    ：&nbsp;abc,a/b.js,a/b/c.js,x/y/z,x/y/z/a.b,能用来匹配所有的目录和文件<br>5)<em>*/</em>.js&nbsp;    ：能匹配&nbsp;foo.js,a/foo.js,a/b/foo.js,a/b/c/foo.js<br>6)a/**/z&nbsp;        ：能匹配&nbsp;a/z,a/b/z,a/b/c/z,a/d/g/h/j/k/z<br>7)a/<strong>b/z&nbsp;    ：能匹配&nbsp;a/b/z,a/sb/z,但不能匹配a/x/sb/z,因为只有单</strong>单独出现才能匹配多级目录<br>8)?.js&nbsp;        ：能匹配&nbsp;a.js,b.js,c.js<br>9)a??&nbsp;            ：能匹配&nbsp;a.b,abc,但不能匹配ab/,因为它不会匹配路径分隔符<br>10)[xyz].js&nbsp;    ：只能匹配&nbsp;x.js,y.js,z.js,不会匹配xy.js,xyz.js等,整个中括号只代表一个字符<br>11)<sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup>.js&nbsp;    ：能匹配&nbsp;a.js,b.js,c.js等,不能匹配x.js,y.js,z.js</p>
<p>B.匹配多种文件<br>//使用数组的方式来匹配多种文件<br>gulp.src(['js/<em>.js','css/</em>.css','*.html'])</p>
<p>2.gulp.dest(path[, options]) 能被 pipe 进来，并且将会写文件。并且重新输出（emits）所有数据，因此你可以将它 pipe 到多个文件夹。如果某文件夹不存在，将会自动创建它。输出文件<br>根路径：如果在src中不设置base时，所有的默认根路径，都是从出现匹配符的地方开始截取：<br>如：<br>gulp.src('app/src/<em>*/</em>.css') //此时base的值为app/src,也就是说它的base路径为app/src</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //设该模式匹配到了文件 app/src/css/normal.css
.pipe(gulp.dest('dist')) //用dist替换掉base路径，最终得到 dist/css/normal.css

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code> <span class="hljs-comment">//设该模式匹配到了文件 app/src/css/normal.css</span>
<span class="hljs-selector-class">.pipe</span>(gulp.dest(<span class="hljs-string">'dist'</span>)) <span class="hljs-comment">//用dist替换掉base路径，最终得到 dist/css/normal.css</span>

</code></pre>
<p>如果增加base基路径：</p>
<p>gulp.src(script/lib/*.js, {base:'script'}) //配置了base参数，此时base路径为script //假设匹配到的文件为script/lib/jquery.js .pipe(gulp.dest('build')) //此时生成的文件路径为 build/lib/jquery.js<br>3.gulp.task(name[, deps], fn) 定义一个使用&nbsp;Orchestrator&nbsp;实现的任务（task）。</p>
<p>1)参数：<br>Name：任务的名字，如果你需要在命令行中运行你的某些任务，那么，请不要在名字中使用空格。<br>Deps：类型：&nbsp;Array，一个包含任务列表的数组，这些任务会在你当前任务运行之前完成。<br>Fn：该函数定义任务所要执行的一些操作。</p>
<p>2)异步任务<br>A.使用callback：</p>
<p>var gulp = require('gulp');<br>// 返回一个 callback，因此系统可以知道它什么时候完成<br>gulp.task('one', function(cb) {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 做一些事 -- 异步的或者其他的
cb(err); // 如果 err 不是 null 或 undefined，则会停止执行，且注意，这样代表执行失败了" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code><span class="hljs-comment">// 做一些事 -- 异步的或者其他的</span>
cb<span class="hljs-comment">(err)</span>; <span class="hljs-comment">// 如果 err 不是 null 或 undefined，则会停止执行，且注意，这样代表执行失败了</span></code></pre>
<p>});<br>// 定义一个所依赖的 task 必须在这个 task 执行之前完成<br>gulp.task('two', ['one'], function() {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 'one' 完成后" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;"><span class="hljs-regexp">//</span> <span class="hljs-string">'one'</span> 完成后</code></pre>
<p>});</p>
<p>gulp.task('default', ['two']);</p>
<p>B.使用promise</p>
<p>var gulp = require('gulp');<br>// 返回一个 callback，因此系统可以知道它什么时候完成<br>gulp.task('one', function(cb) {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 做一些事 -- 异步的或者其他的
return new Promise((res, rej) => {
    setTimeout(() => {
        res(1344)
    }, 5000)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-regexp">//</span> 做一些事 -- 异步的或者其他的
<span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promise(<span class="hljs-function"><span class="hljs-params">(res, rej)</span> =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        res(<span class="hljs-number">1344</span>)
    }, <span class="hljs-number">5000</span>)
})</code></pre>
<p>});<br>// 定义一个所依赖的 task 必须在这个 task 执行之前完成<br>gulp.task('two', ['one'], function() {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 'one' 完成后
console.log(&quot;two开始&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-comment">// 'one' 完成后</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"two开始"</span>)</code></pre>
<p>});</p>
<p>gulp.task('default', ['two']);<br>注意：5s后才开始执行的two任务</p>
<p>3)对于同步任务：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  gulp.task('one',function(cb){
    var stream = gulp.src('client/**/*.js')
        .pipe(dosomething()) //dosomething()中有某些异步操作
        .pipe(gulp.dest('build'));
      return stream;
  });
  
  gulp.task('two',['one'],function(){
    console.log('two is done');
  });


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  gulp.task(<span class="hljs-string">'one'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cb</span>)</span>{
    <span class="hljs-keyword">var</span> stream = gulp.src(<span class="hljs-string">'client/**/*.js'</span>)
        .pipe(dosomething()) <span class="hljs-comment">//dosomething()中有某些异步操作</span>
        .pipe(gulp.dest(<span class="hljs-string">'build'</span>));
      <span class="hljs-keyword">return</span> stream;
  });
  
  gulp.task(<span class="hljs-string">'two'</span>,[<span class="hljs-string">'one'</span>],<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'two is done'</span>);
  });


</code></pre>
<p>4.gulp.watch(glob[, opts], tasks)监视文件，并且可以在文件发生改动时做一些事情；<br>1)监听文件改变，并执行相应的task任务<br>var watcher = gulp.watch('js/<em>*/</em>.js', ['uglify', 'reload']);<br>watcher.on('change', function(event) {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code style="word-break: break-word; white-space: initial;">console.<span class="hljs-keyword">log</span>(<span class="hljs-string">'File '</span> + <span class="hljs-keyword">event</span>.path + <span class="hljs-string">' was '</span> + <span class="hljs-keyword">event</span>.type + <span class="hljs-string">', running tasks...'</span>);</code></pre>
<p>});</p>
<p>2)监听文件改变，并执行回调函数</p>
<p>gulp.watch('js/<em>*/</em>.js', function(event) {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code style="word-break: break-word; white-space: initial;">console.<span class="hljs-keyword">log</span>(<span class="hljs-string">'File '</span> + <span class="hljs-keyword">event</span>.path + <span class="hljs-string">' was '</span> + <span class="hljs-keyword">event</span>.type + <span class="hljs-string">', running tasks...'</span>);</code></pre>
<p>});</p>
<p>(四)第三方插件：</p>
<p>1.gulp-load-plugins：用来加载插件，避免我们再头部声明一堆插件，做到想用就用<br>2.less：用于编译 .less文件<br>3.autoprefixer：自动添加css前缀<br>4.babel：es6 编译成 es5<br>5.uglify：JS压缩<br>6.minify：CSS压缩<br>7.rename：重命名<br>8.sourcemaps：资源映射<br>9.concat：合并文件<br>10.del：删除文件、文件夹<br>11.inject：文件注入<br>12.notify：提示信息<br>13.browser-sync：热启动<br>14.http-proxy-middleware：配合browser-sync进行跨域<br>15.changed：只有发生了改变的文件才能进入流中<br>16.sequence：让task按顺序完成<br>17.rev：添加MD5<br>18.watch：监听文件变化</p>
<p>(五)实现项目自动化构建：</p>
<p>使用gulp构建项目，项目中支持：<br>1)js的模块化（可以实现模块化（common与require的切换））；<br>2)sass的编译；<br>3)jslint的代码校验；<br>4)划分本地启动配置和线上打包配置；<br>5)实现文件的md5加密；<br>6)实现本地的开发服务；<br>7)实现mock数据<br>8)实现本地实时刷新</p>
<blockquote>本篇文章内容还未补全，之后会做更多修改，以期待完成补全，不过对于初学git以及node的同学来说已然是够用了</blockquote>
<hr>
<ol><li id="fn-1">xyz <a href="#fnref-1" class="footnote-backref">↩</a>
</li></ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅析git

## 原文链接
[https://segmentfault.com/a/1190000016867526](https://segmentfault.com/a/1190000016867526)

