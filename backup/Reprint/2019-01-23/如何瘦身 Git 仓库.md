---
title: '如何瘦身 Git 仓库' 
date: 2019-01-23 2:30:08
hidden: true
slug: 1u8z56og89c
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何瘦身-git-仓库"></a>如何瘦身 Git 仓库</h1>
<p>对 Git 仓库的维护通常是为了减少仓库的大小。如果你从另外一个版本控制系统导入了一个仓库，你可能需要在导入后清除掉不必要的文件。本文着重于从一个 Git 仓库中删除大文件，并且包含下列主题：</p>
<ul>
<li>理解从 Git 的历史记录中删除文件</li>
<li>使用 BFG 重写历史记录</li>
<li>可选，使用 <code>git filter-branch</code> 重写历史记录</li>
<li>垃圾回收</li>
</ul>
<blockquote>
<p><strong>请格外小心.....</strong></p>
</blockquote>
<blockquote>
<p>本文中的步骤和工具使用的高级技术涉及破坏性操作。确保您在开始之前仔细读过并<strong>备份了你的仓库</strong>，创建一个备份最容易的方式是使用 <a href="http://stackoverflow.com/questions/3959924/whats-the-difference-between-git-clone-mirror-and-git-clone-bare">--mirror</a> 标志对你的仓库克隆，然后对整个克隆的文件进行打包压缩。有了这个备份，如果在维护期间意外损坏了您的仓库的关键元素，那么你可以通过备份的仓库来恢复。</p>
</blockquote>
<blockquote>
<p>请记住，仓库维护对仓库的用户可能会是毁灭性的。与你的团队或者仓库的关注者进行沟通会是一个不错的主意。确保每个人都已经检查了他们的代码，并且同意在仓库维护期间停止开发。</p>
</blockquote>
<h3><a href="#理解从-git-的历史记录中删除文件"></a>理解从 Git 的历史记录中删除文件</h3>
<p>回想一下，克隆仓库会克隆整个历史记录——包括每个源代码文件的所有版本。如果一个用户提交了一个较大的文件，比如一个 JAR，则随后的每次克隆都会包含这个文件。即使用户最终在后面的某次提交中删除了这个文件，但是这个文件仍然存在于这个仓库的历史记录中。要想完全的从你的仓库中删除这个文件，你必须：</p>
<ul>
<li>从你的项目的<em>当前的</em>文件树中删除该文件;</li>
<li>从仓库的历史记录中删除文件——_重写_ Git 历史记录，从包含该文件的<em>所有的</em>提交中删除这个文件;</li>
<li>删除指向_旧的_提交历史记录的所有 <a href="http://git-scm.com/docs/git-reflog">reflog</a> 历史记录;</li>
<li>重新整理仓库，使用 <a href="http://git-scm.com/docs/git-gc">git gc</a> 对现在没有使用的数据进行垃圾回收。</li>
</ul>
<p>Git 的 “gc”（垃圾回收）将通过你的任何一个分支或者标签来删除仓库中所有的实际没用的或者以某种方式引用的数据。为了使其发挥作用，我们需要重写包含不需要的文件的所有 Git 仓库历史记录，仓库将不再引用它—— git gc 将会丢弃所有没用的数据。</p>
<p>重写存储库历史是一个棘手的事情，因为每个提交都依赖它的父提交，所以任何一个很小的改变都会改变它的每一个随后的提交的提交 ID。有两个自动化的工具可以做到这：</p>
<ol>
<li><a href="http://rtyley.github.io/bfg-repo-cleaner/">BFG Repo Cleaner</a> 快速、简单且易于使用，需要 Java 6 或者更高版本的运行环境。</li>
<li><a href="http://git-scm.com/docs/git-filter-branch">git filter-branch</a> 功能强大、配置麻烦，用于大于仓库时速度较慢，是核心 Git 套件的一部分。</li>
</ol>
<p>切记，当你重写历史记录后，无论你是使用 BFG 还是使用 filter-branch，你都需要删除指向旧的历史记录的 <code>reflog</code> 条目，最后运行垃圾回收器来删除旧的数据。</p>
<h3><a href="#使用-bfg-重写历史记录"></a>使用 BFG 重写历史记录</h3>
<p><a href="http://rtyley.github.io/bfg-repo-cleaner/">BFG</a> 是为将像大文件或者密码这些不想要的数据从 Git 仓库中删除而专门设计的，所以它有一一个简单的标志用来删除那些大的历史文件（不在当前的提交里面）：<code>--strip-blobs-bigger-than</code></p>
<pre><code class="hljs mipsasm">$ <span class="hljs-keyword">java </span>-<span class="hljs-keyword">jar </span><span class="hljs-keyword">bfg.jar </span>--strip-<span class="hljs-keyword">blobs-than </span><span class="hljs-number">100</span>M


</code></pre><p>大小超过 100MB 的任何文件（不包含在你<em>最近的</em>提交中的文件——因为 BFG <a href="http://rtyley.github.io/bfg-repo-cleaner/#protected-commits">默认会保护你的最新提交的内容</a>）将会从你的 Git 仓库的历史记录中删除。如果你想用名字来指明具体的文件，你也可以这样做：</p>
<pre><code class="hljs stylus">$ java -jar bfg<span class="hljs-selector-class">.jar</span> --delete-files *<span class="hljs-selector-class">.mp4</span>


</code></pre><p>BFG 的速度要比 <code>git filter-branch</code> 快 <a href="https://www.youtube.com/watch?v=Ir4IHzPhJuI">10-1000 倍</a>，而且通常更容易使用——查看完整的<a href="http://rtyley.github.io/bfg-repo-cleaner/#usage">使用说明</a>和<a href="http://rtyley.github.io/bfg-repo-cleaner/#examples">示例</a>获取更多细节。</p>
<h3><a href="#或者使用-git-filter-branch-来重写历史记录"></a>或者，使用 git filter-branch 来重写历史记录</h3>
<p><code>filter-branch</code> 命令可以对 Git 仓库的历史记录重写，就像 BFG 一样，但是过程更慢和更手动化。如果你不知道这些大文件在_哪里_，那么你第一步就需要找到它们：</p>
<h4><a href="#手动查看你-git-仓库中的大文件"></a>手动查看你 Git 仓库中的大文件</h4>
<p><a href="https://stubbisms.wordpress.com/2009/07/10/git-script-to-show-largest-pack-objects-and-trim-your-waist-line/">Antony Stubbs</a> 写了一个可以很好地完成这个功能的 BASH 脚本。该脚本可以检查你的包文件的内容并列出大文件。在你开始删除文件之前，请执行以下操作获取并安装此脚本：</p>
<p>1、 <a href="https://confluence.atlassian.com/bitbucket/files/321848291/321979854/1/1360604134990/git_find_big.sh">下载脚本</a>到你的本地的系统。</p>
<p>2、 将它放在一个可以访问你的 Git 仓库的易于找到的位置。</p>
<p>3、 让脚本成为可执行文件：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> chmod 777 git_find_big.sh</span>

</code></pre><p>4、 克隆仓库到你本地系统。</p>
<p>5、 改变当前目录到你的仓库根目录。</p>
<p>6、 手动运行 Git 垃圾回收器：</p>
<pre><code class="hljs ada">git gc <span class="hljs-comment">--auto</span>

</code></pre><p>7、 找出 .git 文件夹的大小</p>
<pre><code class="hljs jboss-cli">$ du -hs <span class="hljs-string">.git/objects</span>
45M <span class="hljs-string">.git/objects</span>

</code></pre><p>注意文件大小，以便随后参考。</p>
<p>8、 运行 <code>git_find_big.sh</code> 脚本来列出你的仓库中的大文件。</p>
<pre><code class="hljs 1c">$ git_find_big.sh 
All sizes are in kB's. The pack column is the size of the object, compressed, inside the pack file.
size  pack  SHA                                       location
592   580   e<span class="hljs-number">3117</span>f48bc305dd1f5ae0df<span class="hljs-number">3419</span>a0ce2d<span class="hljs-number">961733</span>6  media/img/emojis.jar
550   169   b594a7f59ba7ba9daebb<span class="hljs-number">2044</span>7a87ea<span class="hljs-number">435787</span>4f43  media/js/aui/aui-dependencies.jar
518   514   22f7f9a<span class="hljs-number">8490</span>5aaec019dae9ea<span class="hljs-number">1279</span>a<span class="hljs-number">9450277130</span>  media/images/screenshots/issue-tracker-wiki.jar
337   92    1fd8ac97c9fecf74ba<span class="hljs-number">6246</span>eacef<span class="hljs-number">8288</span>e89b4bff5  media/js/lib/bundle.js
240   239   e0c26d<span class="hljs-number">9959</span>bd583e5ef32b<span class="hljs-number">6206</span>fc8abe5fea<span class="hljs-number">8624</span>  media/img/featuretour/heroshot.png

</code></pre><p>大文件都是 JAR 文件，包的大小列是最相关的。<code>aui-dependencies.jar</code> 被压缩到 169kb，但是 <code>emojis.jar</code> 只压缩到 500kb。<code>emojis.jar</code> 就是一个待删除的对象。</p>
<h4><a href="#运行-filter-branch"></a>运行 filter-branch</h4>
<p>你可以给这个命令传递一个用于重写 Git 索引的过滤器。例如，一个过滤器可以可以将每个检索的提交删除。这个用法如下：</p>
<pre><code class="hljs vim">git <span class="hljs-built_in">filter</span>-branch --<span class="hljs-built_in">index</span>-<span class="hljs-built_in">filter</span> <span class="hljs-string">'git rm --cached --ignore-unmatch  _pathname_ '</span> commitHASH

</code></pre><p><code>--index-filter</code> 选项可以修改仓库的索引，<code>--cached</code> 选项从索引中而不是磁盘来删除文件。这样会更快，因为你不需要在运行这个过滤器前检查每个修订版本。<code>git rm</code> 中的 <code>ignore-unmatch</code> 选项可以防止在尝试移走不存在的文件 <code>pathname</code> 的时候命令失败。通过指定一个提交 HASH 值，你可以从每个以这个 HASH 值开始的提交中删除<code>pathname</code>。要从开始处删除，你可以省略这个参数或者指定为 <code>HEAD</code>。</p>
<p>如果你的大文件在不同的分支，你将需要通过名字来删除每个文件。如果大文件都在一个单独的分支，你可以直接删除这个分支本身。</p>
<h4><a href="#选项-1通过文件名删除文件"></a>选项 1：通过文件名删除文件</h4>
<p>使用下面的步骤来删除大文件：</p>
<p>1、 使用下面的命令来删除你找到的第一个大文件：</p>
<pre><code class="hljs vim">git <span class="hljs-built_in">filter</span>-branch --<span class="hljs-built_in">index</span>-<span class="hljs-built_in">filter</span> <span class="hljs-string">'git rm --cached --ignore-unmatch filename'</span> HEAD


</code></pre><p>2、 重复步骤 1 找到剩下的每个大文件。</p>
<p>3、 在你的仓库里更新引用。 <code>filter-branch</code> 会为你原先的引用创建一个 <code>refs/original/</code> 下的备份。一旦你确信已经删除了正确的文件，你可以运行下面的命令来删除备份文件，同时可以让垃圾回收器回收大的对象：</p>
<pre><code class="hljs vim">git <span class="hljs-built_in">filter</span>-branch --<span class="hljs-built_in">index</span>-<span class="hljs-built_in">filter</span> <span class="hljs-string">'git rm --cached --ignore-unmatch filename'</span> HEAD


</code></pre><h4><a href="#选项-2直接删除分支"></a>选项 2：直接删除分支</h4>
<p>如果你所有的大文件都在一个单独的分支上，你可以直接删除这个分支。删除这个分支会自动删除所有的引用。</p>
<p>1、 删除分支。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> git branch -D PROJ567bugfix</span>

</code></pre><p>2、 从后面的分支中删除所有的 reflog 引用。</p>
<h3><a href="#对不用的数据垃圾回收"></a>对不用的数据垃圾回收</h3>
<p>1、 删除从现在到后面的所有 reflog 引用（除非你明确地只在一个分支上操作）。</p>
<pre><code class="hljs brainfuck"><span class="hljs-comment">$</span> <span class="hljs-comment">git</span> <span class="hljs-comment">reflog</span> <span class="hljs-comment">expire</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">expire=now</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">all</span>

</code></pre><p>2、 通过运行垃圾回收器和删除旧的对象重新打包仓库。</p>
<pre><code class="hljs routeros">$ git gc <span class="hljs-attribute">--prune</span>=now

</code></pre><p>3、 把你所有的修改推送回仓库。</p>
<pre><code class="hljs brainfuck"><span class="hljs-comment">$</span> <span class="hljs-comment">git</span> <span class="hljs-comment">push</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">all</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">force</span>

</code></pre><p>4、 确保你所有的标签也是当前最新的:</p>
<pre><code class="hljs brainfuck"><span class="hljs-comment">$</span> <span class="hljs-comment">git</span> <span class="hljs-comment">push</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">tags</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">force</span>

</code></pre><hr>
<p>via: <a href="https://confluence.atlassian.com/bitbucket/maintaining-a-git-repository-321848291.html">https://confluence.atlassian.com/bitbucket/maintaining-a-git-repository-321848291.html</a></p>
<p>作者：<a href="https://confluence.atlassian.com/bitbucket/maintaining-a-git-repository-321848291.html">atlassian.com</a> 译者：<a href="https://github.com/zhousiyu325">zhousiyu325</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何瘦身 Git 仓库

## 原文链接
[https://www.zcfy.cc/article/maintaining-a-git-repository](https://www.zcfy.cc/article/maintaining-a-git-repository)

