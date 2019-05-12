---
title: 'node入门基础' 
date: 2019-01-09 2:30:12
hidden: true
slug: yg15jcn4nfa
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">node入门</h2>
<blockquote><p>nodejs是一门基于JavaScript的后台编程语言，由于其解析引擎为V8引擎，性能比较强大，再加上与前端语言关系更为密切的先天优势，使其在众多后台编程语言中脱颖而出。</p></blockquote>
<h3 id="articleHeader1">配置环境变量</h3>
<p>编程语言都需要一个运行环境，程序员写出来的代码不可能什么都不做电脑就可以解析和运行，如果你是前端工程师，那么你应该了解HTML、CSS、JavaScript这些语言都必需运行在浏览器中，原因就是浏览器提供了这些代码运行的环境，即浏览器内置了这些代码的解析引擎，当前端代码运行在浏览器中，浏览器会调用不同的解析引擎对相应的代码进行解析和渲染，最后形成我们看到的网页。</p>
<p>那么对于后台代码亦然，由于没有浏览器的平台支持，后台代码要运行，必需有一个运行环境，node就是nodejs代码运行的环境，怎么让你的电脑拥有这么个环境呢？很简单，去node官网下载node应用程序，然后安装就行了（注意安装的时候要记住node的安装目录）。</p>
<p>运行环境有了，但是还面临一个问题，就是代码怎样才能在该环境中运行呢？参照前端代码，你只要双击打开后缀名为html的文件，该文件的代码就会自动在浏览器中运行了。但是后台代码可没这么简单，你需要借助命令提示符来让你的node代码跑起来，需要执行的命令为<code>node &lt;file name&gt;</code>。</p>
<p>到这里你可能就会想，为什么执行这么一条命令，就能让代码执行在node环境中呢？这就需要了解环境变量了。命令提示符中非自带的命令到需要手动配置一个环境变量，执行该命令的时候系统会自动去事先配好的环境目录中寻找到相应的应用程序，然后执行该程序。</p>
<blockquote><p>计算机=&gt; 属性 =&gt; 高级系统设置 =&gt; 环境变量 =&gt; path新增（上文提到的安装node的目录）</p></blockquote>
<h3 id="articleHeader2">nodejs是单线程后台语言</h3>
<p>nodejs是基于JavaScript的后台语言，JavaScript本身就是单线程语言，那么nodejs理所当然的也就成了单线程后台语言，那么线程到底是个什么东西呢？</p>
<p>要解释线程，那么必需先了解另一个概念：进程。进程（Process）是计算机中的程序关于某数据集合上的一次运行活动，是系统进行资源分配和调度的基本单位，是操作系统结构的基础。程序是指令、数据及其组织形式的描述，进程是程序的实体。（该描述来自百度百科）通俗的说，打开任务管理器，你会看到很多进程，这些进程都或多或少占电脑的CPU和内存的，每个进程都是一段程序的实例，这些进程组成了计算机所有功能的实现。</p>
<p>那么线程呢，线程，有时被称为轻量级进程(Lightweight Process，LWP），是程序执行流的最小单元。线程是进程中的一个实体，是被系统独立调度和分派的基本单位，线程自己不拥有系统资源，只拥有一点儿在运行中必不可少的资源，但它可与同属一个进程的其它线程共享进程所拥有的全部资源。一个线程可以创建和撤消另一个线程，同一进程中的多个线程之间可以并发执行。（同样来自百度百科...）通俗的说，线程就是一个进程代码执行的一条线，在一个线程中，代码只能按一定顺序先后执行，不能同时执行，多线程感觉就像可以同时干很多事，切换上下文的速度比较快。</p>
<h3 id="articleHeader3">异步编程</h3>
<p>由于node是单线程的，所以如果一段代码比较耗时，那么就会出现代码阻塞的情况，特别是后台中对于文件读写的操作，所以在后台开发中，能用异步（非阻塞）就不要用同步。因为你不知道一段异步代码什么时候执行完毕，所以在异步编程中，一般都会使用回调函数来控制代码的执行顺序，而异步编程也是node开发中的一个难点。</p>
<h3 id="articleHeader4">npm</h3>
<p>后台开发还有一个非常重要的概念就是模块化开发，一个程序的功能需要分成很多模块，模块之间互不影响，否则在大型应用程序中开发根本无法进行。在后台开发中，我们无可避免地需要使用第三方模块来快速实现一些功能，那么怎么才能将别人写好的第三方模块添加到我们自己的项目当中呢？npm就是用来实现这个功能的。npm是包管理工具，用于管理第三方模块，是node自带的工具，无需单独安装。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install <package name>  //本地安装模块
npm install <package name> -g   //全局安装模块
npm uninstall <package name>    //卸载本地模块
npm uninstall <package name> -g    //卸载全局模块
npm --help  //查看npm相关命令" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> &lt;<span class="hljs-keyword">package</span> <span class="hljs-keyword">name</span>&gt;  //本地安装模块
npm <span class="hljs-keyword">install</span> &lt;<span class="hljs-keyword">package</span> <span class="hljs-keyword">name</span>&gt; -g   //全局安装模块
npm <span class="hljs-keyword">uninstall</span> &lt;<span class="hljs-keyword">package</span> <span class="hljs-keyword">name</span>&gt;    //卸载本地模块
npm <span class="hljs-keyword">uninstall</span> &lt;<span class="hljs-keyword">package</span> <span class="hljs-keyword">name</span>&gt; -g    //卸载全局模块
npm <span class="hljs-comment">--help  //查看npm相关命令</span></code></pre>
<blockquote><p>使用npm全局安装的包不会被配置到环境变量中，由于npm已经存在环境变量中，相当于在npm下有一个快捷方式连接真实的文件</p></blockquote>
<h4>nrm切换下载地址</h4>
<p>nrm是一个切换npm下载源的工具，使用前需要安装，能够切换到国内比较快的下载源</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nrm ls 列出所有源
nrm test 测试所有源的下载速度
nrm use <source name> 切换不同的源" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>nrm ls 列出所有源
nrm test 测试所有源的下载速度
nrm <span class="hljs-keyword">use</span> &lt;<span class="hljs-keyword">source</span> <span class="hljs-keyword">name</span>&gt; 切换不同的源</code></pre>
<h4>package.json 可以记录安装过哪些包</h4>
<blockquote><p>使用npm本地安装（在当前项目中使用），默认安装时会在当前目录查找node_module文件夹，如果找不到，则向上级目录查找，一直找到根目录，如果找到了，则安装到该文件夹，如果没找到，则会在当前目录新建一个node_module文件夹，将包装到该文件夹下；如果初始化一个package.json文件，就不会导致向上级目录查找</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm init -y //初始化（生成）package.json文件
npm install jquery --save   //项目依赖
npm install babel-core --save-dev   //开发依赖" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code>npm init -y <span class="hljs-comment">//初始化（生成）package.json文件</span>
npm install jquery --<span class="hljs-built_in">save</span>   <span class="hljs-comment">//项目依赖</span>
npm install babel-core --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span>   <span class="hljs-comment">//开发依赖</span></code></pre>
<p>项目依赖是指项目的代码想要正常的运行就需要该模块的支持，显然无论何时，项目依赖的包都应在存在于项目中；而开发依赖则指的是项目上线的时候该模块需要使用，上线之后这些包就不需要了，比如babel等代码编译的包。</p>
<p>当在不同的电脑上进行相同的项目开发的时候，如果有package.json文件记录了依赖的包，就只要执行<code>npm install</code>来安装所有项目需要使用到的第三方模块</p>
<blockquote><p>注意安装的时候加了什么后缀，卸载的时候也要加同样的后缀</p></blockquote>
<h3 id="articleHeader5">yarn</h3>
<p>yarn和npm的功能一样，但是yarn是第三方工具，需要安装，那么为什么需要yarn呢？简而言之，yarn具有更快的包安装速度与更安全的包管理机制，如果想详细了解这两者的区别，可以阅读这篇文章：<a href="http://web.jobbole.com/88459/" rel="nofollow noreferrer" target="_blank">http://web.jobbole.com/88459/</a></p>
<ul><li><p>初始化package.json</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn init -y" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">yarn init -y</span></code></pre>
<ul><li><p>安装包</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn    //跑环境，相当于npm install
yarn add jquery   //默认就是项目依赖
yarn add babel-core --dev  //开发依赖" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>yarn    <span class="hljs-comment">//跑环境，相当于npm install</span>
yarn <span class="hljs-keyword">add</span> jquery   <span class="hljs-comment">//默认就是项目依赖</span>
yarn <span class="hljs-keyword">add</span> babel-core --dev  <span class="hljs-comment">//开发依赖</span></code></pre>
<ul><li><p>卸载包</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn remove <package name>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">yarn remove &lt;<span class="hljs-keyword">package</span> <span class="hljs-title">name&gt;</span></code></pre>
<h3 id="articleHeader6">总结</h3>
<p>以上只是node开发需要掌握的一些基础入门知识，了解这些后起码不会对node以及后台开发一无所知，这些知识能为你的node开发开个好头。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
node入门基础

## 原文链接
[https://segmentfault.com/a/1190000010105151](https://segmentfault.com/a/1190000010105151)

