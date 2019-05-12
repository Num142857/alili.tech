---
title: 'node核心特性理解' 
date: 2018-12-28 2:30:11
hidden: true
slug: ua0i8errkz8
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="http://realtcg.com/2017/10/14/node%E6%A0%B8%E5%BF%83%E7%89%B9%E6%80%A7%E7%90%86%E8%A7%A3/" rel="nofollow noreferrer" target="_blank">原文地址</a>在我的博客，转载请注明来源，谢谢！</p></blockquote>
<p>node是在前端领域经常看到的词。node对于前端的重要性已经不言而喻，掌握node也是作为合格的前端工程师一项基本功了。知道node、知道后端的一些东西，才能更好的与别人合作，发挥更大的价值。</p>
<h3 id="articleHeader0">概述</h3>
<p>本文主要介绍了我对node的一些核心特性的理解，包括node架构、特点、机制、核心模块与简单应用。</p>
<h3 id="articleHeader1">正文</h3>
<h4>从浏览器到node</h4>
<p>首先，node是一个平台，使用javascript作为编程语言，运行在服务端。服务端语言能做的，node一般都能做，而且有些情况下做的更好，因为它具有自己的特色。</p>
<p>node是javascript运行环境（runtime），就像浏览器一样，是一个平台。在浏览器中，V8引擎负责解释javascript，你在javascript调用的接口都是浏览器实现并提供的，浏览器会调用底层的、由其他语言（C++）实现并封装好的接口来完成任务；同样，在node中，也是V8引擎负责解释javascript，而你在javascript调用的浏览器提供的接口就不能用了，因为它脱离了浏览器的环境，但是因为你在node环境中，你就可以使用node提供的由C++语言实现的、由javascript封装好的各种接口来完成后端任务。浏览器提供的API用于处理前端任务，比如弹个窗，换个主题，处理用户操作等，而node因为服务后端，因此提供的API则用来处理后端任务，比如响应请求，读取文件等，这些API由不同的模块提供。因为关注领域不一样，因此所做的任务就不一样，提供的API就不一样，但是原理、相关实现大致与浏览器端相同。</p>
<p>从浏览器到node这一块如果想了解更多，推荐IBM的文章<a href="https://www.ibm.com/developerworks/cn/opensource/os-nodejs/index.html?ca=drs#ibm-pcon" rel="nofollow noreferrer" target="_blank">node.js到底是什么？</a></p>
<h4>node 架构</h4>
<p>node架构分为三层（<a href="https://github.com/yjhjstz/deep-into-node/blob/master/chapter1/chapter1-0.md" rel="nofollow noreferrer" target="_blank">参考链接</a>）：</p>
<p><a href="https://github.com/yjhjstz/deep-into-node/blob/master/chapter1/a9e67142615f49863438cc0086b594e48984d1c9.jpeg" rel="nofollow noreferrer" target="_blank">图片来源</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011556898?w=822&amp;h=534" src="https://static.alili.tech/img/remote/1460000011556898?w=822&amp;h=534" alt="" title="" style="cursor: pointer;"></span></p>
<ul>
<li>Node standard library：node标准库，也就是node模块提供各种接口的javascript实现，任何javascript代码、npm install 或者你写的模块都在这里</li>
<li>Node bindings：包括C/C++ bindings（胶水代码）和Add on（添加其他C/C++库时需要自己写的Bindings），这一层向下封装了V8和libuv接口，向上提供了基础API接口，是连接javascript和C++的桥梁</li>
<li>
<p>第三层是支撑 Node.js 运行的关键，由 C/C++ 实现。</p>
<ul>
<li>V8 是Google开发的JavaScript引擎，提供JavaScript运行环境，可以说它就是 Node.js 的发动机，负责解释javascript，与chrome浏览器相同。</li>
<li>Libuv 是专门为Node.js开发的一个封装库，提供跨平台的异步I/O能力，负责node运行时的线程池调度。</li>
<li>C-ares：提供了异步处理 DNS 相关的能力。</li>
<li>http_parser、OpenSSL、zlib 等：提供包括 http 解析、SSL、数据压缩等系统底层的访问。</li>
</ul>
</li>
</ul>
<p>平常我们用到的也就是第一层node各个模块实现的接口。</p>
<p><strong>那他们之间时如何协作的呢</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011556899?w=349&amp;h=325" src="https://static.alili.tech/img/remote/1460000011556899?w=349&amp;h=325" alt="javascript主线程" title="javascript主线程" style="cursor: pointer; display: inline;"></span></p>
<p>程序启动，V8引擎会首先解析javascript代码，通过Node bindings来调用C/C++库。执行到当前事件时，会把事件放在调用堆栈（stack和heap）处理（可以理解为放进一个工作空间，如上图），在堆栈中的任何I/O请求都会交给libuv来处理，libuv维持一个线程池，里面是一些工作线程(如下图)，请求会调用这些线程来完成任务，这些线程则调用底层的C/C++库。完成时，libuv再把结果返回事件队列等待主线程执行。在此期间，主线程继续执行其他任务。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011556900?w=800&amp;h=316" src="https://static.alili.tech/img/remote/1460000011556900?w=800&amp;h=316" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>node 执行特性</h4>
<h5>单线程、非阻塞型I／O</h5>
<p>单线程的意思就是只在一个线程上运行javascript。首先，javascript 在浏览器端是单线程的，这是为了避免多线程产生任务冲突的情况；其次，java和PHP这类多线程后端语言，为避免同步I/O阻塞，每处理一个连接都会产生一个新线程，这样的话在遇到大量并发请求时就会受到物理内存的限制。node 延续了浏览器端单线程javascript，只用一个主线程执行javascript，不断循环遍历事件队列，执行事件。事实上，主线程发出的I/O请求，都会交给其他线程去完成，其他线程完成后悔返回结果放到事件队列。在此期间，主线程会继续执行其他任务，也就是在交给libuv后直接返回，继续执行下面的任务，主线程只负责循环执行事件队列，因此这种模式称为非阻塞型I／O，性能很好，适用于处理大量并发请求，还能简化开发。</p>
<h5>事件驱动机制</h5>
<p>还是跟浏览器的差不多。总的来说就是，浏览器端把鼠标点击、键盘按键等定义为事件，而node把网络请求、I／O操作等也看作事件，严格来说，一切动作都是事件，这就是事件驱动的思想。在程序启动时，便进入事件循环，不断遍历执行事件队列中产生的事件，而在执行过程中，又会产生新的事件，因此称为事件循环。主线程执行事件时，遇到麻烦的I/O请求会交给libuv来调度其他工作线程来帮忙，忙完后就会形成事件返回结果到事件队列等待主线程处理。在此期间，主线程会继续执行其他任务。</p>
<blockquote>
<p><a href="http://stackoverflow.com/users/370756/mbq" rel="nofollow noreferrer" target="_blank">mbp</a> 曾经做过一个<a href="http://stackoverflow.com/a/3491931/4603550" rel="nofollow noreferrer" target="_blank">巧妙的比喻</a>，把 Node.js 看成一家餐厅。我在此借用下他的例子，稍作修改来阐述下 Node.js 的执行情况：</p>
<p>把 Node.js 应用程序想象成一家星巴克，一个训练有素的前台服务生（唯一的主线程）在柜台前接受订单。当很多顾客同时光临的时候，他们排队（进入事件队列）等候接待；每当服务生接待一位顾客，服务生会把订单告知给经理（libuv），经理安排相应的专职人员去烹制咖啡（工作线程或者系统特性）。这个专职人员会使用不同的原料和咖啡机（底层 C/C++ 组件）按订单要求制作咖啡或甜点，通常会有四个这样的专职人员保持在岗待命（线程池），高峰期的时候也可以安排更多（不过需要在一早就安排人员来上班，而不能中午临时通知）。服务生把订单转交给经理之后不需要等着咖啡制作完成，而是直接开始接待下一位顾客（事件循环放进调用堆栈的另一个事件），你可以把当前调用堆栈里的事件看成是站在柜台前正在接受服务的顾客。</p>
<p>当咖啡完成时，会被发送到顾客队列的最后位置，等它移动到柜台前服务生会叫相应顾客的名字，顾客就来取走咖啡（最后这部分在真实生活中听起来有点怪，不过你从程序执行的角度理解就比较合乎情理了）。</p>
<p>​                                                                    ——By <a href="https://segmentfault.com/a/1190000005892501">Amio</a></p>
</blockquote>
<p>如果你想进一步了解javascript 事件驱动机制，推荐<a href="http://realtcg.com/2017/09/21/%E6%88%91%E5%AF%B9javascript%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF%E6%9C%BA%E5%88%B6%E7%9A%84%E7%90%86%E8%A7%A3/" rel="nofollow noreferrer" target="_blank">深入理解 javascript 事件循环机制</a></p>
<h4>node 模块</h4>
<p>node 模块机制是CommonJs 的实现。起初，javascript 标准一片混沌，并没有其他成熟语言（例如C++）的模块机制、标准库、接口等，为了让javascript 具备开发大型应用的能力，为了让 javascript 能在后端运行，CommonJS 就制定了javascript 模块规范。node 借鉴了这个规范，让javascript 以模块形式组织起来。模块机制是一个成熟语言必备的，一个模块代表一个功能的封装，它就像搭积木一样，不同模块可以衔接在一块，使语言具有极强的可扩展型。node 模块机制同时制定了模块规范，能让全球的开发者都可以在node官网上传自己的包。此外，node 社区又实现了node 包管理器npm，使用npm可以轻松管理各种包。</p>
<p>node 的模块分为核心模块和用户模块，前者是底层的、自带的，后者是第三方。</p>
<p>核心模块有Global(全局对象)、Http、fs(文件系统)、Buffer、Stream、Events、URL、path等，这些模块提供了后端服务的基本功能，都提供自己关注功能的API。</p>
<p>在使用模块时，require 即可。但在require背后，node 有一套寻找模块的机制：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011556901?w=479&amp;h=601" src="https://static.alili.tech/img/remote/1460000011556901?w=479&amp;h=601" alt="node require机制" title="node require机制" style="cursor: pointer; display: inline;"></span></p>
<p>从上图可以看到，node 优先从缓存区读取，缓存区有直接读取，没有则加载并缓存，这样做不用一遍一遍去找了，非常高效。node 在缓存区没有发现模块时，会分析require 的路径和文件后缀，node 有个模块路径的查找策略，我们可以在名为<code>module_paths</code> 的js文件里<code>console.log(module.paths)</code>然后<code>node module_paths.js </code>运行来间接查看node 寻找文件模块的具体文件的方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[ '/home/username/nodeProject/node_modules',
 '/home/username/node_modules',
 '/home/node_modules',
 '/node_modules' ] //Linux下的数组输出(/home/username因电脑不同而异)

[ 'c:\\nodeProject\\node_modules', 'c:\\node_modules' ] //Windows
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">[ <span class="hljs-string">'/home/username/nodeProject/node_modules'</span>,
 <span class="hljs-string">'/home/username/node_modules'</span>,
 <span class="hljs-string">'/home/node_modules'</span>,
 <span class="hljs-string">'/node_modules'</span> ] <span class="hljs-comment">//Linux下的数组输出(/home/username因电脑不同而异)</span>

[ <span class="hljs-string">'c:\\nodeProject\\node_modules'</span>, <span class="hljs-string">'c:\\node_modules'</span> ] <span class="hljs-comment">//Windows</span>
</code></pre>
<p>也就是按照下面的顺序：</p>
<ul>
<li>当前文件目录下的node_modules目录。</li>
<li>父目录下的node_modules目录。</li>
<li>父目录的父目录下的node_modules目录。</li>
<li>沿路径向上逐级递归，直到根目录下的node_modules目录。</li>
</ul>
<p>这些顺序都是<strong>在查找缓存之后</strong>的。</p>
<p>在找到模块后，node 将在引入之前对这个模块进行编译执行，编译成功后会缓存，执行的结果会返回给调用者。</p>
<h4>简单应用</h4>
<p>有了node 自带核心模块的基础功能，就可以进一步封装更强大、容易操作的功能了，就像jQuery 对于javascript 基础API 一样，node 社区也诞生了像 Express、KOA等框架来构建node.js程序</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011556902?w=534&amp;h=435" src="https://static.alili.tech/img/remote/1460000011556902?w=534&amp;h=435" alt="node.js开发框架" title="node.js开发框架" style="cursor: pointer; display: inline;"></span></p>
<p>这些框架的详情移步<a href="https://cnodejs.org/topic/58caaec27dee71e5193a53ce" rel="nofollow noreferrer" target="_blank">2017 Node.js 开发框架比较</a></p>
<p>另外，node 还可以连接MySQL，MangoDB进行数据库操作。</p>
<p>下面是使用express 脚手架生成的基本 node应用结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── app.js            //程序入口
├── bin
│   └── www              //二机制文件
├── package.json      //项目配置文件
├── public
│   ├── images        
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js      //路由文件入口
│   └── users.js
└── views
    ├── error.jade    //界面模板
    ├── index.jade
    └── layout.jade" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>.
├── app<span class="hljs-selector-class">.js</span>            <span class="hljs-comment">//程序入口</span>
├── bin
│   └── www              <span class="hljs-comment">//二机制文件</span>
├── package<span class="hljs-selector-class">.json</span>      <span class="hljs-comment">//项目配置文件</span>
├── public
│   ├── images        
│   ├── javascripts
│   └── stylesheets
│       └── style<span class="hljs-selector-class">.css</span>
├── routes
│   ├── index<span class="hljs-selector-class">.js</span>      <span class="hljs-comment">//路由文件入口</span>
│   └── users<span class="hljs-selector-class">.js</span>
└── views
    ├── error<span class="hljs-selector-class">.jade</span>    <span class="hljs-comment">//界面模板</span>
    ├── index<span class="hljs-selector-class">.jade</span>
    └── layout.jade</code></pre>
<p>现在使用 node作为后端语言通常都要配合类库和框架使用。</p>
<p>node 的单线程、非阻塞型特点让它非常适合高并发的应用，适合处理大量重复的、简单的逻辑，适合构建Rest/JSON API服务；同时，也正是因为这些特性，node 不适合CPU使用率较重、IO使用率较轻的偏计算应用。缺点是因为单线程，一个进程挂就全挂了，可靠性低，但这是可以避免的。node 更多的应用是在前端、中间件、前后端分离等。</p>
<p>由于 node 的诸多优点，现在越来越多大公司开始使用node、深度使用node。</p>
<h4>总结</h4>
<p>node 的核心概念、思想远不止这么多，应用更是多了去了，无奈本人水平有限，只能说个浅层，还有很多像进程管理、异步编程、异常调试、部署、性能调优、与集群、CDN协调等都值得深入探索一下。无论如何，node 是让javascript 迈向企业级开发语言重要的一步（也许已经是了），前端工程师从未像现在这样的powerful，能做的事情越来越多，所能涉及的领域也越来越多。前端这行越来越令人兴奋了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
node核心特性理解

## 原文链接
[https://segmentfault.com/a/1190000011556893](https://segmentfault.com/a/1190000011556893)

