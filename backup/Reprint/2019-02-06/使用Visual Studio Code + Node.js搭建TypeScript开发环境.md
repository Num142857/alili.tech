---
title: '使用Visual Studio Code + Node.js搭建TypeScript开发环境' 
date: 2019-02-06 2:30:09
hidden: true
slug: p3yt6v5oxgo
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">简介</h2>
<p>本文将简述如何使用vscode [Visual Studio Code]开发工具来搭建一套TypeScript的开发环境，主要的目的是<strong>落地留痕</strong>，同时也希望能对一些刚入门的小伙伴有一定的参考价值。[注意：Windows，Linux，OS X在操作上基本上一致，只是工具的安装有所不同，这里仅以Windows平台作为本次教程的演示环境]</p>
<p>TypeScript是一种由微软开发的自由和开源的编程语言，通常我们认为其是JavaScript的一个超集，且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。安德斯·海尔斯伯格，C#的首席架构师，已工作于TypeScript的开发。<br>TypeScript为大型应用之开发而设计，可以编译成javascript来确保兼容性。</p>
<h2 id="articleHeader1">准备工作</h2>
<ul>
<li><p>Node.js <a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">Node.js - Official Site</a></p></li>
<li><p>Visual Studio Code  <a href="https://code.visualstudio.com" rel="nofollow noreferrer" target="_blank">Visual Studio Code - Official Site</a></p></li>
</ul>
<h2 id="articleHeader2">安装Node.js</h2>
<p>一方面提供一个开发的Runtime；另一方面提供的<code>npm</code>工具，我们可以利用这个工具来安装<code>TypeScript</code>。</p>
<h3 id="articleHeader3">下载Node.js安装包</h3>
<p>首先按照准备工作里面提供的链接下载对应平台的Node.js安装包<br><span class="img-wrap"><img data-src="/img/bVzRXW" src="https://static.alili.tech/img/bVzRXW" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">安装Node.js并检测是否安装成功</h3>
<p>安装Node.js，安装过程基本上是下一步，即可完成，然后在<code>CMD</code>中运行如下命令：<code>node -v</code> 来查询当前node.js的版本号，然后输出如图所示的结果就表示node.js安装成功，接着可以输入命令：<code>npm -v</code> 来查询当前npm工具的版本号[可能需要时间稍长点]，便会输出如图所示的结果表示npm工具可用<br><span class="img-wrap"><img data-src="/img/bVzRks" src="https://static.alili.tech/img/bVzRks" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">设置node.js的npm安装package的全局路径[非必须]</h3>
<p>由于npm安装工具默认会跑到C盘[因为npmrc文件中默认的设置为：<code>prefix=${APPDATA}\npm</code>]，这样有时可能会因为系统权限的问题，导致不能正常成功的安装某些工具，那么我们可以先将npm安装的全局路径自定设置一下，比如：我们可以在nodejs的目录下[即你的node.js安装后的根目录]新建两个目录：<em><code>node_global</code></em>，<em><code>node_cache</code></em>，然后找到<em><code>nodejs</code></em>目录下的<em><code>node_modules/npm</code></em>目录下名为<em><code>npmrc</code></em> 或者 <em><code>.npmrc</code></em>文件，[为安全，我们可以先将该文件copy一个副本出来进行备份]使用文本编辑器打开，修改并新增如下：<code>prefix</code> 和 <code>cache</code> 分别对应之前新建的目录<em><code>node_global</code></em> 和 <em><code>node_cahce</code></em> <br><span class="img-wrap"><img data-src="/img/bVzRkO" src="https://static.alili.tech/img/bVzRkO" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">设置package的环境变量[有必要]</h3>
<p>通过步骤3设置后，后续在安装工具的时候，比如安装TypeScript，最终会安装到<em><code>node_global</code></em>中，所以为了后续使用工具命令行，我们可以配置一个环境变量：<br>首先新建一个<code>NODE_PATH</code> -&gt; <code>NODE_PATH=D:\EasBuilding\nodejs\node_global</code>，然后在<code>Path</code>下新增<code>%NODE_PATH%</code></p>
<h3 id="articleHeader7">查看typescript版本</h3>
<p>[这里只是为了说明问题，可不用进行这一步] 打开<code>CMD</code>，运行命令：<code>tsc -v</code>，这里不能正常像是版本号，这是由于这里还没有安装typescript，所以我们接下来就先安装TypeScript Compiler</p>
<h2 id="articleHeader8">安装TypeScript</h2>
<h3 id="articleHeader9">安装TypeScript Compiler</h3>
<p>在前面安装好Node.js后，我们可以直接使用npm工具来安装TypeScript，这个TypeScript的Package其实也是一个Compiler，我们可以通过这个Complier将typescript编译成javascript。打开命令提示符<code>CMD</code>(或其他终端Terminal)，输入指令：<code>npm install -g typescript</code>，稍等片刻即可完成TypeScript Compiler的安装。<br><span class="img-wrap"><img data-src="/img/bVzRXt" src="https://static.alili.tech/img/bVzRXt" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader10">更新TypeScript Compiler</h3>
<p>如上图所示，下载的TypeScript版本为1.8.10，在官网，该版本为最新稳定版，所以不需要更新，如果我们下载的版本小于这个版本，我们可以使用如下命令来进行更新：<code>npm update -g typescript</code><br><span class="img-wrap"><img data-src="/img/bVzRXC" src="https://static.alili.tech/img/bVzRXC" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader11">安装Visual Studio Code</h2>
<h3 id="articleHeader12">下载Visual Studio Code安装包并安装</h3>
<p>首先按照准备工作里面提供的链接下载对应平台的vscode安装包<br><span class="img-wrap"><img data-src="/img/bVzRYg" src="https://static.alili.tech/img/bVzRYg" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVzRYj" src="https://static.alili.tech/img/bVzRYj" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader13">我的第一个TypeScript程序</h2>
<h3 id="articleHeader14">新建一个workspace工作目录</h3>
<p>这里我先在桌面上新建一个<code>DemoModules</code>的目录来存放一些我的Demo Projects，然后选中<code>DemoModules</code>右键使用 vscode 打开或者打开<code>CMD</code>，切换到<code>DemoModules</code>下，然后输入命令：<code>code .</code> 既可以使用 vscode 打开<code>DemoModules</code>目录。<br><span class="img-wrap"><img data-src="/img/bVzRZk" src="https://static.alili.tech/img/bVzRZk" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>接着，在该目录下新建一个名为<code>TS_DEMO</code>的目录：<br><span class="img-wrap"><img data-src="/img/bVzRZC" src="https://static.alili.tech/img/bVzRZC" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader15">创建我的第一个typescript文件</h3>
<p>在<code>TS_DEMO</code>下新建一个名为<code>greeter.ts</code>的文件，并输入如下代码：<br><span class="img-wrap"><img data-src="/img/bVzR0E" src="https://static.alili.tech/img/bVzR0E" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>我们发现这就是一个简单的javascript code，那么我继续改造一下这个代码，弄得稍微复杂点，加入接口<code>interface</code>和类<code>class</code>：<br><span class="img-wrap"><img data-src="/img/bVzR1b" src="https://static.alili.tech/img/bVzR1b" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>继续在该目录下新建一个<code>index.html</code>的文件，并在body中引入<code>greeter.js</code>脚本：<br><span class="img-wrap"><img data-src="/img/bVzR3y" src="https://static.alili.tech/img/bVzR3y" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader16">编译typescript文件</h3>
<p>首先在<code>TS_DEMO</code>目录下创建一个名为<code>tsconfig.json</code>的文件，可以手动创建该文件，并输入如下代码：<br><span class="img-wrap"><img data-src="/img/bVzR1I" src="https://static.alili.tech/img/bVzR1I" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>也可以使用命令自动创建这个配置文件，<code>CMD</code>中切换到<code>TS_DEMO</code>目录，然后输入命令：<code>tsc -init</code> 即可自动创建<br><span class="img-wrap"><img data-src="/img/bVzR1G" src="https://static.alili.tech/img/bVzR1G" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>接下来我们继续输入编译命令，编译<code>greeter.ts</code>；输入指令：<code>tsc -w greeter.ts</code>, 其中<code>-w</code>是<code>watch</code>监控的意思，当typescript文件内容发生改变时会自动进行编译。<br><span class="img-wrap"><img data-src="/img/bVzR2F" src="https://static.alili.tech/img/bVzR2F" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>我们可以看到，<code>TS_DEMO</code>目录下多了一个<em><code>.js</code></em>后缀的同名文件，这就是typescript编译后的javascript文件。<br><span class="img-wrap"><img data-src="/img/bVzR2Q" src="https://static.alili.tech/img/bVzR2Q" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>同时我们还可以更改<code>tsconfig.json</code>中的<code>target</code>属性，调整编译出来的javascript版本<br><span class="img-wrap"><img data-src="/img/bVzR3F" src="https://static.alili.tech/img/bVzR3F" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>最后我们将index.html用Chrome或者Firefox打开看看效果：<br><span class="img-wrap"><img data-src="/img/bVzR3P" src="https://static.alili.tech/img/bVzR3P" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader17"><strong><em><code>YES! I GOT IT!! YOU GOT IT!!</code></em></strong></h2>
<h2 id="articleHeader18">参考资料</h2>
<ul>
<li><p><a href="http://www.open-open.com/lib/view/open1435807373810.html#articleHeader13" rel="nofollow noreferrer" target="_blank">http://www.open-open.com/lib/...</a></p></li>
<li><p><a href="https://www.typescriptlang.org/docs/tutorial.html" rel="nofollow noreferrer" target="_blank">https://www.typescriptlang.or...</a></p></li>
<li><p><a href="https://code.visualstudio.com/docs" rel="nofollow noreferrer" target="_blank">https://code.visualstudio.com...</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Visual Studio Code + Node.js搭建TypeScript开发环境

## 原文链接
[https://segmentfault.com/a/1190000006124164](https://segmentfault.com/a/1190000006124164)

