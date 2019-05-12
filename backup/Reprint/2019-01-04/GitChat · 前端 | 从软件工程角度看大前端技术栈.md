---
title: 'GitChat · 前端 | 从软件工程角度看大前端技术栈' 
date: 2019-01-04 2:30:10
hidden: true
slug: 6r09ttwndud
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>来自 GitChat 作者：韩亦乐<br>更多IT技术分享，尽在微信公众号：GitChat技术杂谈</p></blockquote>
<p><a href="http://gitbook.cn/books/596760dc118fa209584fd395/index.html" rel="nofollow noreferrer" target="_blank">进入 GitChat 阅读原文</a></p>
<h3 id="articleHeader0">前言</h3>
<p>我们都知道，大学几乎是没有 Web 前端课的。以我所在的大学为例，唯一引导我们了解 JavaScript 的也只是‘人机界面’和‘Web应用开发’选修课。再者，由于这些选修课的课时短、面向的主要群体是大部分大学生等原因，其最终所涉及的内容层次也很难赶上近年来 Web 前端领域的快速变化。自学，看起来是广大前端学习者的普遍成长道路。本文尝试结合软件工程专业背景并贯穿软件工程思想，开启一个常常“不为人所知”的大前端技术栈之旅。</p>
<blockquote><p>P.S: 为了对这场 Chat 有一个背景了解，这里小提一句：笔者现为准大三学生，前俩年的 Web 开发学习经历辅之以参与/组织线上线下开发者社区的技术分享活动，对整个 Web 开发有了一定程度上的宏观认知。希望本文能通过一定程度的抛砖引玉填补不足~。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683093" src="https://static.alili.tech/img/remote/1460000010683093" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">目录</h3>
<ul>
<li>技术基本功</li>
<li>前端设计能力</li>
<li>前端开发能力</li>
<li>计算机网络知识储量</li>
<li>服务端应用开发能力</li>
<li>数据库与搜索引擎开发能力</li>
<li>编程软技能</li>
</ul>
<h3 id="articleHeader2">一、技术基本功</h3>
<p>标准搜索引擎搜到的，只是 4% 的互联网数据。引以为例，希望当我们谈到“大前端”时，前端初学者不再总被“HTML、CSS、JavaScript 基础”俘困于学习 Web 开发的瓶颈之中，反之可以通过掌握以下技术基本功来拓展自己的编程视野、提高自己的编程能力，为成为合格的大前端工程师做出扎实的铺垫。所有章节通过“必修”、“选修”来简单标识其重要性。</p>
<h4>1.1 打字速度至少达到 40WPM+(必修)</h4>
<p>我曾用整整一篇博客 (<a href="http://www.jianshu.com/p/8aac186868ce" rel="nofollow noreferrer" target="_blank">@强化你的打字速度</a>) 来说明训练出一个打字坐姿良好、打字速度标准的习惯其重要性。打字速度可以用 WPM - Word Per Minute - 每分钟敲出的单词个数(5 个字符被视为一个单词)来进行衡量。初级、中级和高级的打字水平评判准分别是 20 WPM、40 WPM和 60 WPM。刚刚在注意打字手势与打字坐姿的条件下，评测出我的最新打字速度是 51 WPM，不算太高，但还可以。</p>
<p>在这里我们以打字速度达到 40 WPM 为一个奇点，合格的程序开发者都应该能达到这一水准的。</p>
<blockquote>
<p>延伸阅读：</p>
<ol><li>常用的键盘布局为 QWERT 布局，可以选用更高效的 DVORAK 布局。</li></ol>
</blockquote>
<h4>1.2 熟练掌握至少一种主流代码编辑器或 IDE(必修)</h4>
<p>“工欲善其事，必先利其器。”对于主流代码开发工具的掌握将会是我们高效开发的一个加分项。就代码编辑器和 IDE 的区别来说：</p>
<p>前者专注源代码的开发，常常会根据具体编程语言有语法高亮、代码折叠等功能，支持大多数编程语言的开发。通过一定的定制化，我们可以给简易的编辑器加入风格迥异的插件，组成一整套得心应手的开发流程。一个典型的例子如跨平台的 Sublime 编辑器，其支持 Python 语言编写的插件，可通过包管理器扩充本身功能，大多数的包使用自由软件授权发布，并由社区建置维护。</p>
<p>后者的中文全称是“集成开发环境”，通俗来讲可以当做一种编辑器的全家桶，主要针对特定的编程语言而量身打造。IDE 在内部除了可以直接写源代码文本，还常常默认拥有打包并编译为可用程序的功能，有些 IDE 还可以设计图形界面。IDE 通常包括代码编辑器、自动构建工具、调试器和版本控制系统。一个典型的例子如 WebStorm，其支持图片预览，拥有内置命令行和版本控制系统，对于错误的前端 JavaScript 代码还有相应的智能提醒和改正能力。WebStorm 良好的集成了编辑、文件、管理、编译、调试、运行等功能，大大的提高了开发者生产力。</p>
<p>身为大前端工程师，根据开发需要选择自己偏爱的编辑器或 IDE 并刻意练习其使用方法，在开发代码时能达到工具熟练度与思维速度相匹配的境地，也就足够胜任这项技术基本功。</p>
<blockquote>
<p>延伸阅读：</p>
<ol><li>Web 开发推荐掌握的代码编辑器或 IDE 有： VIM、Sublime、WebStorm、IDEA、VSCode 以及一些在线 IDE 等。</li></ol>
</blockquote>
<h4>1.3 拥有良好的代码规范、代码质量、代码注释能力(必修)</h4>
<p>程序开发的真实情况是，代码是给人看的，偶尔在机器上跑一跑。如何制定一个可执行的代码规范并使项目最终拥有较高代码质量，对于占据软件开发成本比例很高的软件维护工作起到了一个决定性的作用。代码规范、代码质量、代码注释能力三者相辅相成。</p>
<p>代码规范是一种持续的行为 ，良好的代码规范可以依靠代码规范文档或成熟的规范工具进行统一——前者不应复杂，但应具有一些强制性；后者例如在前端开发的环境下，可以使用 ESLint 来进行可定制化的代码风格检查，或使用持续集成(CI)理念并通过相匹配的 CI 服务器进行软件交付，以确保高水平的代码质量。下图是 CI 的实际应用过程示例。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683094" src="https://static.alili.tech/img/remote/1460000010683094" alt="基于 AWS Lambda 持续集成工具 LambCI - 取材@开源中国" title="基于 AWS Lambda 持续集成工具 LambCI - 取材@开源中国" style="cursor: pointer; display: inline;"></span></p>
<p>在上述动图中，当我们在搭建好的持续集成(CI)环境下使用 git push 提交代码后，CI 服务器将根据相关配置自动化执行代码规范和代码质量检查过程(这里是自动运行的是测试代码)，并输出相应的检查结果。</p>
<p>其次，统一编码规范、统一语言版本、统一编辑器配置（tab和空格之类）、统一文件编码，统一数据库等等行为，都是提高代码质量、尽力避免因为环境不同而导致 Bug 众多的种种步骤。</p>
<p>通俗易懂的代码注释其意义在程序员界想必“路人皆知”，前端可以使用<br> JSDoc 来规范注释代码。除了简单的注释之外，JSDoc 还能做很多其他的事情，在 JSDoc 中文文档中，这么介绍到。</p>
<blockquote><p>JSDoc是一个根据 JavaScript 文件中注释信息，生成 JavaScript 应用程序或库、模块 API 文档的工具。你可以使用他记录如：命名空间，类，方法，方法参数等。类似 JavaDoc 和 PHPDoc。现在很多编辑器或IDE中还可以通过 JSDoc 直接或使用插件生成智能提示。从而使开发者很容易了解整个类和其中的属性和方法，并且快速知道如何使用，从而提高开发效率，降低维护成本。</p></blockquote>
<p>一个真实的 JSDoc 示例如下，不难看出有良好注释的代码通俗易懂。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Book类，代表一个书本.
 * @constructor
 * @param {string} title - 书本的标题.
 * @param {string} author - 书本的作者.
 */
function Book(title, author) {
    this.title=title;
    this.author=author;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">/**
 * Book类，代表一个书本.
 * <span class="hljs-doctag">@constructor</span>
 * <span class="hljs-doctag">@param</span> {string} title - 书本的标题.
 * <span class="hljs-doctag">@param</span> {string} author - 书本的作者.
 */</span>
function Book(title, author) {
    <span class="hljs-keyword">this</span>.title=title;
    <span class="hljs-keyword">this</span>.author=author;
}</code></pre>
<h4>1.4 理解主流编程范式及其思想(必修)</h4>
<p>在编程范式上，我们需要理解编程语言的两个分类——命令式编程和声明式编程——的设计思想。其中，非命令式的编程都可归为声明式编程，命令式、函数式和逻辑式是最核心的三种范式。可以用下图来表示。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683095" src="https://static.alili.tech/img/remote/1460000010683095" alt="命令式和声明式编程" title="命令式和声明式编程" style="cursor: pointer;"></span></p>
<p>命令式编程和声明式编程起源的不同决定了这两大类范式代表着迥然不同的编程理念和风格：命令式编程是行动导向（ Action-Oriented ）的，因而算法是显性而目标是隐性的；声明式编程是目标驱动（ Goal-Driven ）的，因而目标是显性而算法是隐性的。以阶乘函数来示例，命令式、函数式和逻辑式的不同表现如下。</p>
<p>C++(命令式)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="int factorial(int n)  {
    int f = 1;
    for (; n > 0; --n) f *= n;
    return f;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code><span class="hljs-built_in">int</span> factorial(<span class="hljs-built_in">int</span> <span class="hljs-built_in">n</span>)  {
    <span class="hljs-built_in">int</span> f = <span class="hljs-number">1</span>;
    for (; <span class="hljs-built_in">n</span> &gt; <span class="hljs-number">0</span>; --<span class="hljs-built_in">n</span>) f *= <span class="hljs-built_in">n</span>;
    return f;
}</code></pre>
<p>Lisp(函数式)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(defun factorial(n)
    (if (= n 0)
        1    //  若n等于0，则n!等于1
        (* n (factorial(- n 1)))))    //  否则n!等于n* (n-1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code>(defun factorial(<span class="hljs-built_in">n</span>)
    (<span class="hljs-built_in">if</span> (= <span class="hljs-built_in">n</span> <span class="hljs-number">0</span>)
        <span class="hljs-number">1</span>    //  若<span class="hljs-built_in">n</span>等于<span class="hljs-number">0</span>，则<span class="hljs-built_in">n</span>!等于<span class="hljs-number">1</span>
        (* <span class="hljs-built_in">n</span> (factorial(- <span class="hljs-built_in">n</span> <span class="hljs-number">1</span>)))))    //  否则<span class="hljs-built_in">n</span>!等于<span class="hljs-built_in">n</span>* (<span class="hljs-built_in">n</span>-<span class="hljs-number">1</span>)</code></pre>
<p>Prolog(逻辑式)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 0! 等于1
factorial(0,1).
// 若M等于N-1且 M!等于Fm且F等于N*Fm，则N! 等于F
factorial(N,F) :-   M is N-1, factorial(M,Fm), F is N * Fm." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code>// <span class="hljs-number">0</span>! 等于<span class="hljs-number">1</span>
factorial(<span class="hljs-number">0</span>,<span class="hljs-number">1</span>).
// 若M等于<span class="hljs-built_in">N</span>-<span class="hljs-number">1</span>且 M!等于Fm且F等于<span class="hljs-built_in">N</span>*Fm，则<span class="hljs-built_in">N</span>! 等于F
factorial(<span class="hljs-built_in">N</span>,F) <span class="hljs-symbol">:</span>-   M is <span class="hljs-built_in">N</span>-<span class="hljs-number">1</span>, factorial(M,Fm), F is <span class="hljs-built_in">N</span> * Fm.</code></pre>
<p>纵然声明式编程有诸多便捷之处，但其在着重交互和业务逻辑的前端开发下就不那么得心应手。声明式编程更擅长于数理逻辑的应用。因此我们能从编程范式角度理解前端开发将会大大提高我们的编程水平。</p>
<blockquote>
<p>延伸阅读：</p>
<ol><li>《JavaScript 函数式编程》</li></ol>
</blockquote>
<h4>1.5 拥有撰写良好软件工程文档的能力(必修)</h4>
<p>一般符合软件工程要求的软件项目要求我们拥有概要设计说明书、需求规格说明书和测试设计说明书。其中。</p>
<ul>
<li>概要设计说明书包括程序系统的基本处理流程、程序系统的组织结构、模块划分、功能分配、接口设计、运行设计、安全设计、数据结构设计和出错处理设计等，为程序的详细设计提供基础。</li>
<li>软件需求说明是软件系统需求的规格化说明，是对将要开发系统的行为的说明。它包括功能性需求及非功能性需求，非功能性需求对设计和实现提出了限制，比如性能要求，质量标准，或者设计限制。</li>
<li>测试说明书包括测试目标、测试范围、性能要求、测试资源、测试环境、测试策略。</li>
</ul>
<blockquote>
<p>延伸阅读：</p>
<ol><li>《软件工程》</li></ol>
</blockquote>
<h4>1.6 熟知常见的数据结构、算法思想、设计模式(必修)</h4>
<p>数据结构的良好选择可以提高算法效率。从数据结构角度来说，需要我们熟知数组、堆栈、队列、链表、树、图、堆和散列表的相关知识点，并能够根据具体问题通过高级编程语言具体实现；从算法角度来说，还需要我们熟知时间复杂度、空间复杂度、深度优先、广度优先、图论和动态规划等算法思想。前端开发因为 JavaScript 语言封装了很多操作数据的具体过程且更编程目标是开发应用逻辑，在算法层面要求并不是很高，但熟知算法思想可以提升每个前端开发者的计算机科学素养。在看重基础的开发者面试中也能提高自己的竞争力。</p>
<p>算法用来解决计算上的问题，设计模式用来解决“设计层次”的问题。在软件工程中，设计模式是对软件设计中普遍存在（反复出现）的各种问题，所提出的解决方案。JavaScript 就有很多的设计模式值得学习并掌握，如下所例，这里就不一一介绍。通过使用设计模式，可以使我们的代码更加的可复用，可扩展以及可测试。</p>
<ul><li>单例模式、简单工厂模式、观察者模式、适配器模式、代理模式、桥接模式、外观模式、访问者模式、策略模式、模板方法模式、中介者模式、迭代器模式、组合模式、备忘录模式、职责链模式、享元模式、状态模式。——参考<a href="http://blog.jobbole.com/29454/" rel="nofollow noreferrer" target="_blank">《常用的Javascript设计模式》</a>
</li></ul>
<blockquote>
<p>延伸阅读：</p>
<ol>
<li>《数据结构与算法 JavaScript 描述》</li>
<li>《算法导论(原书第3版)》</li>
<li>《Head First 设计模式》</li>
<li>《JavaScript 设计模式》</li>
<li>《设计模式 可复用面向对象软件的基础》</li>
</ol>
</blockquote>
<h4>1.7 熟练使用三大操作系统之一及其开发者环境(必修)</h4>
<p>软件的开发活动离不开 Windows、Linux 和 Mac 三大操作系统所各自形成的生态链。我们至少需要能够在其中一个操作系统下进行高效开发，并了解该环境下的应用软件使用技巧和常用配置管理。</p>
<p>如在 Windows 下，我们需要知道环境变量该在哪里修改；在 Linux 下，我们需要知道 apt-get、yum 等包管理器的使用方式；在 MacOS 下，我们需要知道 Mac 常用的开发工具等等。无论哪种，都应该多理解 Linux 操作系统及其使用方式。前端使用的 Bower 管理器、Node 环境以及自动化测试、版本控制等都离不开 Linux 命令行的设计思想。</p>
<p>深入操作系统的内核，我们可以了解计算机如何进行进程管理、内存管理、文件管理以及网络管理，从而在开发中遇到电脑卡顿、网络不通畅等情景时能及时找到问题所在，对症下药。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683096" src="https://static.alili.tech/img/remote/1460000010683096" alt="enter image description here" title="enter image description here" style="cursor: pointer; display: inline;"></span></p>
<blockquote>
<p>延伸阅读：</p>
<ol>
<li>《鸟哥的Linux私房菜:基础学习篇(第3版)》</li>
<li>《现代操作系统(原书第3版) 》</li>
<li>《操作系统:精髓与设计原理(原书第6版)》</li>
<li>《深入理解计算机系统(原书第3版)》</li>
</ol>
</blockquote>
<h4>1.8 拥有良好的代码审查、代码重构能力(选修)</h4>
<p>适当的和团队成员举办一场 Code Review(代码审查)，有助于保证软件质量、促进团队成长和避免团队成员因缺席而导致软件进度的“单点故障”。尤其在团队没有测试开发人员的情况下，我们很难达到令人满意的测试覆盖率。来一场“说走就走”的代码审查将对软件质量做出巨大贡献。</p>
<p>引用 <a href="http://www.techug.com/post/five-level-of-code-review.html" rel="nofollow noreferrer" target="_blank">《代码审查与重构的5个层次》</a> 的观点，我们可以通过如下五个层次完成代码审查与重构：</p>
<ul>
<li>第一个层次：“业务架构”的代码审查与代码重构。</li>
<li>第二个层次：“代码架构”的代码审查与代码重构。</li>
<li>第三个层次：“设计模式”的代码审查与代码重构。</li>
<li>第四个层次：“最优算法”的代码审查与代码重构。</li>
<li>第五个层次：“语言与代码规范”的代码审查与代码重构。</li>
</ul>
<h4>1.9 拥有良好的版本控制、项目管理意识(选修)</h4>
<p>著名代码托管平台 Github 中点赞量较高的常常是前端项目，JavaScript 编程语言也在 Github 中随处可见。身为前端工程师，我们需要拥有良好的版本控制意识，使项目代码、配置文件的改动历史随时可被人工追踪、被自动化追踪，以便进行 Bug 追溯、代码审查、自动化测试。Github 正如其名，采用的是分布式版本控制系统——Git。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683097" src="https://static.alili.tech/img/remote/1460000010683097" alt="" title="" style="cursor: pointer;"></span></p>
<p>软件工程诞生的重要因素就是为了解决日益复杂的软件开发活动而产生的“软件危机”，拥有良好的项目管理意识可以方便我们对日趋庞大的软件项目进行效率化管理，以应对未来需求的变更。Trello、Teambition 都是不错的选择，我们可以通过任务版的用户故事将附件、文档、工作进度有机的组合起来，让用户和开发者团队合作更加密切。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683098" src="https://static.alili.tech/img/remote/1460000010683098" alt="" title="" style="cursor: pointer;"></span></p>
<h4>1.10 掌握软件测试相关能力(选修)</h4>
<blockquote><p>白盒测试、黑盒测试、单元测试、集成测试、测试驱动开发</p></blockquote>
<p>在“拥有良好的代码规范、代码质量、代码注释能力”一节的动图中我们看到了编写测试代码并自动化执行测试的一个应用场景。软件测试一般分为白箱测试和黑箱测试。通俗来讲，黑箱测试测试应用程序的功能，而不是其内部结构或运作，适合集成测试以及系统测试等；白箱测试测试应用程序的内部结构或运作，而不是应用程序的功能，可应用于单元测试、集成测试中。单元测试的目的是检验基本组成单位（函数）的正确性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkLoginPhone (phone) {
    if (phone === &quot;&quot;) return false;
    if (phone.length !== 11) return false;
    if (phone.match(/[^\d]/g)) return false;
    return true;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkLoginPhone</span> (<span class="hljs-params">phone</span>) </span>{
    <span class="hljs-keyword">if</span> (phone === <span class="hljs-string">""</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">if</span> (phone.length !== <span class="hljs-number">11</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">if</span> (phone.match(<span class="hljs-regexp">/[^\d]/g</span>)) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}</code></pre>
<p>以前端开发中常接触到的单元测试框架 Jasmine 为例，为开发上述代码中验证手机号格式的函数 checkLoginPhone(phone)，我们可以先编写相应的单元测试代码，每个 describe 用来测试一个函数，其中的多个 it 分别测试该函数在不同条件下的不同结果是否为期待的结果。如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe(&quot;验证手机号格式&quot;, function () {
    it(&quot;手机号不能为空&quot;, function () {
        var phone = &quot;&quot;;
        var output = checkLoginPhone(phone);
        var result = false;
        expect(output).toEqual(result);
    });

    it(&quot;手机号不能为非数字&quot;, function () {
        var phone = &quot;&quot;;
        var output = checkLoginPhone(phone);
        var result = false;
        expect(output).toEqual(result);
    });
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>describe(<span class="hljs-string">"验证手机号格式"</span>, function () {
    it(<span class="hljs-string">"手机号不能为空"</span>, function () {
        var phone = <span class="hljs-string">""</span><span class="hljs-comment">;</span>
        var output = checkLoginPhone(<span class="hljs-name">phone</span>)<span class="hljs-comment">;</span>
        var result = false<span class="hljs-comment">;</span>
        expect(<span class="hljs-name">output</span>).toEqual(<span class="hljs-name">result</span>)<span class="hljs-comment">;</span>
    })<span class="hljs-comment">;</span>

    it(<span class="hljs-string">"手机号不能为非数字"</span>, function () {
        var phone = <span class="hljs-string">""</span><span class="hljs-comment">;</span>
        var output = checkLoginPhone(<span class="hljs-name">phone</span>)<span class="hljs-comment">;</span>
        var result = false<span class="hljs-comment">;</span>
        expect(<span class="hljs-name">output</span>).toEqual(<span class="hljs-name">result</span>)<span class="hljs-comment">;</span>
    })<span class="hljs-comment">;</span>
)<span class="hljs-comment">;</span></code></pre>
<p>软件测试常由专业测试工程师完成，但我们在开发中小型软件时完全可以自己胜任这份工作。愈发偏向业务逻辑的前端对测试的需求愈发凸显。这同时需要我们了解测试驱动开发、敏捷开发、极限编程的知识点。</p>
<h4>1.11 熟练绘制概念图、思维导图、流程图、网络拓扑图等(选修)</h4>
<p>我的另一篇博客 <a href="http://www.jianshu.com/p/51e92725d0ed" rel="nofollow noreferrer" target="_blank">《概念图图解 Web Cookie》</a> 中曾介绍过概念图与思维导图这两大概念绘制工具。概念图的广泛应用发扬了其发明者约瑟夫·D·诺瓦克(Novak)的那句总结——“有意义的学习涉及到新概念和命题纳入现有的认知结构的同化”。以我在学习过程中绘制的“HTTP”概念图为例，如下所示。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683099" src="https://static.alili.tech/img/remote/1460000010683099" alt="" title="" style="cursor: pointer;"></span></p>
<p>前端工程师常在视觉上有更高的敏锐度，也需要绘制较多的图来辅助开发，在写博客、写文档时熟练掌握概念图、思维导图、流程图、网络拓扑图、UML 图等的绘制将是表达思想的一大利器。</p>
<h4>1.12 掌握持续集成、持续交付、持续部署相关编程能力(选修)</h4>
<p>在“拥有良好的代码规范、代码质量、代码注释能力”一节我们介绍过通过持续集成可以保证良好的代码规范程度。持续交付可以看作持续集成的下一步，指的是频繁地将软件的新版本，交付给质量团队或者用户，以供评审；持续部署是持续交付的下一步，指的是代码通过评审以后，自动部署到生产环境。如下图所示，最终通过 DevOps 将软件工程、技术运营和质量保障（QA）三者做交集，使整个软件项目在开发过程中的变更范围更少，发布协调更强，自动化过程更稳健。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683100" src="https://static.alili.tech/img/remote/1460000010683100" alt="" title="" style="cursor: pointer;"></span></p>
<p>同时相比服务端开发，前端开发因需求的变更其改动量更大，因此在前端开发的过程中使用“精益思想”完成对持续集成、持续交付、持续部署的实战工作意义非凡。</p>
<h3 id="articleHeader3">二、前端设计能力</h3>
<p>前端分为前端设计和前端开发。前者曾在 Web Pages 时代占据了前端的主流，那时 JavaScript 默认被浏览器禁用，网页间多依靠超链接形式相互链接。那时的前端工程师常常要求拥有一定的制图、切图能力。纵然现在 JavaScript 在 Web 领域已从前端拓展到后端 Node.js，一个合格的大前端工程师还是应该多多注重拓展前端设计方面的知识点，以备不时之需。</p>
<h4>2.1 掌握一定的用户界面设计、人机交互知识(必修)</h4>
<p>无论是懂前端的设计还是懂设计的前端在任何互联网公司都是很受欢迎的。良好的用户界面及其交互氛围能让用户产生舒适的体验，在一些功能性较弱的软件项目中，当因用户界面及其氛围不足导致用户体验的下降常会对软件产生致命一击的效果。交互设计要求我们能够进行用户调研、概念设计以及创建用户模型、界面流程并能开发项目原型。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683101" src="https://static.alili.tech/img/remote/1460000010683101" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>
<p>拓展阅读：</p>
<ol>
<li>《简约至上》</li>
<li>《用户体验的要素》</li>
<li>《人人都是产品经理》</li>
</ol>
</blockquote>
<h4>2.2 熟练至少一个主流平面设计工具(选修)</h4>
<p>拥有了足够的用户界面设计与人际交互知识，我们可以选择一个主流平面设计工具来强化我们的设计能力。常见的平面设计软件有 PS、CDR、AI、InDesign 等。</p>
<p>前端开发中的一些绘图技术也常与平面设计工具设计出的图片有共性。举例来说：HTML 5 中的 Canvas 是像素级别的，可以对应 PS 处理出的图片； SVG 又是矢量级的，无论如何放大也不会看到像素块，可以对应 AI 处理出的图片。熟练一个主流平面设计工具将是前端开发者和设计工程师之间重要的沟通桥梁。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683102" src="https://static.alili.tech/img/remote/1460000010683102" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>2.3 熟练至少一个主流原型设计工具(选修)</h4>
<p>主流原型设计工具常常可以分别制作 Web 端、PC 端和 APP 端的原型，也有很多原型设计工具专为一个平台打造。原型设计工具往往不像平面设计工具一样面面俱到，但能清晰的展现出各页面内的主体组件和各页面间的逻辑关系。</p>
<p>我们在开发中小型前端项目时往往不需要专业的原型设计师(常被产品经理一职所包揽)，熟练使用至少一个主流原型设计工具能使我们在正式编写前端代码前快速开发出一个直观的原型参考系。</p>
<p>下图展现了我在最近一次编程竞赛 - 中国软件杯中快速开发出的原型预览。我们团队只有 3 个人，其他两人分别负责 PHP 微信端和 Java 搜索引擎的应用开发，快速迭代出一个产品原型很有助于前端人员拆分重复组件并快速开发，和服务端人员确定自己需要开发的接口。</p>
<blockquote><p>详见 <a href="http://www.jianshu.com/p/e331a2ae4d1a" rel="nofollow noreferrer" target="_blank">《“消失”的这俩个月里，我的前端项目如何从零开始》</a></p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683103" src="https://static.alili.tech/img/remote/1460000010683103" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">三、前端开发能力</h3>
<h4>3.1 熟练使用 HTML、CSS 和 JavaScript 三大前端语言(必修)</h4>
<p>HTML 是标签语言，可以构建前端页面的骨架；CSS 是层叠样式控制表，可以构建前端页面的外貌；JavaScript 是前端编程语言，可以规范前端页面的事件行为。掌握 HTML、CSS、JavaScript 是前端开发三大基石，缺一不可。</p>
<p>偏向 HTML 和 CSS 的开发，我们可以走出一条会设计的前端工程师的道路；偏向 CSS 和 JavaScript 的开发，我们可以走出一条会服务端编程的前端工程师的道路。当然，CSS 之所以也可以算作偏向服务端编程的道路之一，在于我们可以使用 SASS、LESS 等 CSS 预处理语言进行 CSS 的动态化开发。</p>
<blockquote>
<p>拓展阅读：</p>
<ol>
<li>《Head First HTML 与 CSS (第2版)》</li>
<li>《CSS 禅意花园(修订版)》</li>
<li>《Javascript 权威指南》</li>
<li>《JavaScript 高级程序设计(第3版)》</li>
</ol>
</blockquote>
<h4>3.2 理解前端语言新标准 HTML5、CSS3、ES6 及其特性(必修)</h4>
<p>熟练使用 HTML、CSS、JavaScript 还需要我们理解其语言最新相关标准：HTML5、CSS3 和 ES6(ECMAScript6)。</p>
<ul>
<li>HTML 5 里新增了许多特性：语义化和新的音频、视频支持等；</li>
<li>CSS 3 被划分为模块，解决了 CSS2 为等待各个标准统一而耗费大量时间才能推进的不足之处，同时也提供了 2D、3D、动画效果等新特性；</li>
<li>ECMAScript6 等于 JavaScript - DOM - BOM，是 JavaScript 在 2015 年的最新标准，因为 ES6 对标准改动较大，前端开发者常常将一个前端项目是否支持 ES6 作为推进前端新技术的重要桥梁之一。ES6 将箭头函数、let 变量声明命令、Promise 编程、模块化编程等新特性纳入其标准中，得到了各大浏览器最新版本的支持。</li>
</ul>
<p>在 ES5 标准中，我们需要第三方符合 AMD 标准的库如 RequireJS、CommonJS 来支持 JS 模块的导入，常见的可以用以下代码来实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var service = require('module.js')
console.log(service.port) // 3000" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> service = <span class="hljs-built_in">require</span>(<span class="hljs-string">'module.js'</span>)
<span class="hljs-built_in">console</span>.log(service.port) <span class="hljs-comment">// 3000</span></code></pre>
<p>在 ES6 标准中，我们可直接使用原生的 import、export 语句来实现模块化编程，如下所示。这样大大方便了使用 Node.js 等技术的前端项目的开发。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export var port = 3000
export function getAccounts(url) {
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">var</span> port = <span class="hljs-number">3000</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getAccounts</span>(<span class="hljs-params">url</span>) </span>{
  ...
}</code></pre>
<blockquote>
<p>拓展阅读</p>
<ol>
<li>《精通 CSS: 高级 Web 标准解决方案(第2版)》</li>
<li>《众妙之门: 精通 CSS3》</li>
<li>《ES6 标准入门(第2版)》</li>
<li>《深入理解ES6》</li>
</ol>
</blockquote>
<h4>3.3 熟练组件化开发、异步编程、虚拟 DOM相关编程能力(必修)</h4>
<p>借鉴其他编程领域如 Java GUI 的编程思想，前端组件化开发大大提高了开发效率并降低了维护成本。通过组件化开发，我们可以对前端页面中重复的模块进行“模块化编程”，给每个模块赋予一个“类”的概念。最终根据具体页面组装其对应的前端 UI 组件。每个组件间可以通过数据流来交换数据，这也大大方便了单页面应用的开发，相得益彰。下图左侧是一个前端页面的原型图，与之相对的有右侧的组件代码。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683104" src="https://static.alili.tech/img/remote/1460000010683104" alt="" title="" style="cursor: pointer;"></span></p>
<p>Ajax (异步的 JavaScript 与XML技术) 的出现让用户不用再经历“提交表单等待服务器的漫长响应并通过刷新页面来告诉自己哪里输入错误”的烦躁经历，这样做也节约了许多宽带。为了更好的掌握异步编程，我们需要掌握 JavaScript 的“同步模式”和“异步模式”，并学会使用相应的回调函数来发布、订阅、处理事件。</p>
<p>抛开单页面应用，Web 页面的性能鲜由 JavaScript 引起，常常是因过多的 DOM 操作引起。虚拟 DOM 随着前端主流框架的更迭孕育而生。通过直接操作虚拟 DOM，间接操作真实 DOM，可以优化很多性能。对虚拟 DOM 的深入了解是见证一步步加入抽象层的前端开发的关键。</p>
<blockquote>
<p>拓展阅读：</p>
<ol>
<li>《JavaScript 异步编程:设计快速响应的网络应用》</li>
<li>《JavaScript DOM 编程艺术》</li>
<li>《DOM 启蒙》</li>
</ol>
</blockquote>
<h4>3.4 掌握至少一门主流前端框架及其生态链、框架设计能力(必修)</h4>
<p>前端框架层出不穷，前端开发领域俨然成了热衷于造轮子的一带。我们可以通过如下几步来掌握至少一门主流前端框架及其生态链。</p>
<ol>
<li>了解各大前端框架的应用场景。</li>
<li>进行前端开发框架的选型。</li>
<li>掌握所选前端框架的思想。</li>
<li>刻意练习所选前端框架的使用方法。</li>
<li>时刻关注所选前端框架的生态链。</li>
</ol>
<p>React、Vue 适合单页面应用，拥有很多先进的前端开发思想；BootStrap、Ant Design 偏向 UI 开发，更多的提供 CSS 相关类库。JQuery 经久不衰，极大的方便我们操作真实 DOM 及其 CSS 属性；D3.js、EChart 等框架使我们可以快速进行前端数据可视化的编程；RequireJS 在不支持 ES6 标准的 JS 开发环境下给我们提供了一个良好的模块化编程条件。数不胜数的前端框架都有各自的应用场景，我们的前端项目可以选择其中一至多个框架进行快速开发。</p>
<p>同时，合格的前端工程师不能只会用成型的框架，还应该拥有一定自制框架的能力。我们可以先通过阅读成型前端框架的源码来学习框架设计的思想，有朝一日我们便会根据自己的独特需求造出独一无二的框架轮子。</p>
<blockquote>
<p>延伸阅读：</p>
<ol>
<li>《JavaScript 开发框架权威指南》</li>
<li>《深入 React 技术栈》</li>
<li>《Vue.js 权威指南》</li>
<li>《Angular 权威教程》</li>
</ol>
</blockquote>
<h4>3.5 掌握浏览器兼容、响应式布局相关解决方案(必修)</h4>
<p>早期占据浏览器半壁江山的 IE 浏览器上存在的众多浏览器兼容问题，耗费了当时前端开发者的大量开发时间。纵然现在的前端开发者已经不需要考虑太多的浏览器兼容问题，对其概念的了解有利于了解前端历史包袱或在未来足以应对一些面向特殊群体(早期 IE 浏览器使用者)的前端项目。</p>
<p>响应式布局和单页面应用是当代前端开发者的必备技能。从 Web Pages 到 Web App 时代，我们开发的前端项目有越来越多的可能需要同时在电脑端和手机端进行访问，一个有良好响应式布局的前端项目可以一个代码运行在多种不同分辨率的平台之上。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683105" src="https://static.alili.tech/img/remote/1460000010683105" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>
<p>延伸阅读：</p>
<ol>
<li>《响应式 Web 设计: HTML5 和 CSS3 实战(第2版)》</li>
<li>《响应式 Web 设计性能优化》</li>
</ol>
</blockquote>
<h4>3.6 熟练 Node.js 环境、谷歌开发者工具使用方法(必修)</h4>
<p>不同于 ReactJS、AngularJS 等 JavaScript 框架，Node.js 从诞生之初就是 JavaScript 的运行环境，基于 Chrome 的 V8 引擎打造，使用高效、轻量级的事件驱动、非阻塞 I/O 模型。</p>
<p>将如下的代码运行在 NodeJS 上，便可通过纯 JavaScript 代码开启服务器进程、连接非关系数据库，很多服务端开发能做的事情，通过 Node.js 便能做到。并且在“技术基本功”里提到的持续集成、持续交付、持续部署、敏捷开发等理念，通过 Node.js 社区都能找到相应的解决方案。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import express from 'express';
import mongoose from 'mongoose';

const app = express();
mongoose.connect('mongodb://localhost/');

app.listen(3000, function() {
  console.log('server started at http://localhost:3000');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> express <span class="hljs-keyword">from</span> <span class="hljs-string">'express'</span>;
<span class="hljs-keyword">import</span> mongoose <span class="hljs-keyword">from</span> <span class="hljs-string">'mongoose'</span>;

<span class="hljs-keyword">const</span> app = express();
mongoose.connect(<span class="hljs-string">'mongodb://localhost/'</span>);

app.listen(<span class="hljs-number">3000</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'server started at http://localhost:3000'</span>);
});</code></pre>
<p>通过谷歌开发者工具，我们可以快速定位页面问题、断点调试 JavaScript 代码和进行前端页面的 UI 效果预览，最新的 Chrome 同时支持 ECMAScript6 的模块化开发，一个微型 IDE 就藏在我们的浏览器工具栏里。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683106" src="https://static.alili.tech/img/remote/1460000010683106" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote>
<p>延伸阅读：</p>
<ol>
<li>《深入浅出 Node.js》</li>
<li>《Chrome 扩展及应用开发》</li>
</ol>
</blockquote>
<h4>3.7 掌握单页面、移动 Web 、混合应用开发相关技术点(选修)</h4>
<p>从门户网站成群的 Web 1.0 到以用户为中心的平台/社交网站 Web 2.0，再到能进行个性化智能化推荐的 Web 3.0，每次 Web 时代的更迭背后都是 Web 技术发展上的一大飞跃。有了对 Web 1.0 到 3.0 发展史的宏观了解，对掌握单页面应用、移动 Web 开发和混合应用开发、离线 Web 等相关技术点将会有一个质的飞跃。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683107" src="https://static.alili.tech/img/remote/1460000010683107" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在单页面 (SPA) 应用中，整个前端项目架构在一个网页上，通过动态拉取服务端数据来提供一个和桌面应用程序相似的用户体验。同时，在单页面应用的开发中，我们需要着重注意组件、路由和跨域请求这几个核心知识点。单页面应用具体的优缺点如下：</p>
<ul>
<li>优点 1. ：无刷新体验</li>
<li>优点 2. ：完全的前端组件化</li>
<li>优点 3. ：API 共享</li>
<li>优点 4. ：组件共享</li>
<li>缺点 1. ：首次加载大量资源</li>
<li>缺点 2. ：较高的前端开发门槛</li>
<li>缺点 3. ：不利于 SEO</li>
</ul>
<p>熟悉了响应式布局的开发，我们就可以尝试步入移动 Web 领域。顾名思义，移动 Web 就是运行在移动端上，而移动端的设备配置不尽相同，这常常需要我们去了解移动端的知识，如 pixel 像素基础、Viewport 视图、和 Tap 触摸事件等，移动 Web 常用的 meta 标签如下，其作用声明该页面宽度为设备宽度，初始缩放比例为 1 倍，并禁止用户缩放。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0, user-scalable=no&quot;> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code style="word-break: break-word; white-space: initial;">&lt;meta <span class="hljs-attr">name="viewport"</span> <span class="hljs-attr">content="width=device-width,</span> <span class="hljs-attr">initial-scale=1.0,</span> <span class="hljs-attr">user-scalable=no"&gt;</span> </code></pre>
<p>到了混合应用开发，其常以 App 的形式出现在移动端上，相比原生移动端应用，混合 Web 应用可移植性强、开发成本低，还可以通过一定的接口来直接使用手机硬件能力。当然，由于混合应用对硬件的使用效率相比原生应用还有不足之处，再加上有些手机平台不鼓励使用过多的混合应用开发技术(可以搜索“苹果 热更新”)。前端开发者可以视具体业务来进行技术选型。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683108" src="https://static.alili.tech/img/remote/1460000010683108" alt="混合开发层次结构图" title="混合开发层次结构图" style="cursor: pointer;"></span></p>
<h4>3.8 熟练前端包管理、构建工具、SEO、Web 性能优化(选修)</h4>
<p>当我们使用到的前端库越来越多，需要一个前端包管理器来统一管理：Bower 便能做到这一点，通过给项目中引入 Bower 包管理器，我们仅仅需要修改配置文件就能进行高效化的前端库管理。熟练使用成型的包管理器，我们也可以很方便的解决前端依赖等问题。</p>
<p>前端构建工具可以减少我们很多的编程“机械运动”。通过使用成型的前端构建工具，简单的几行命令就能编译并转换 JavaScript 的不同版本、自动化压缩代码、自动化执行测试文件。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683109" src="https://static.alili.tech/img/remote/1460000010683109" alt="" title="" style="cursor: pointer;"></span></p>
<p>我曾在我的一次新项目中，架构了如下技术栈，各种工具各有所长，当然在我的这个项目最后，很多技术栈由于时间问题并没有实践。</p>
<ul>
<li>Bower 做 JavaScript 的包依赖管理</li>
<li>JQuery 封装 DOM 操作并进行跨域请求</li>
<li>NPM 做 Node.js 的包依赖管理</li>
<li>ESLint 做代码风格规范检测</li>
<li>Grunt 启动 Karma 统一项目管理</li>
<li>Istanbul 检查单元测试代码覆盖率</li>
<li>Jasmine 做单元测试</li>
<li>JSDoc 规范代码注释风格</li>
<li>Karma 自动化完成单元测试</li>
<li>Webpack 最终打包整个项目文件</li>
<li>Yeoman 最后封装成一个项目原型模板</li>
</ul>
<p>“掌握单页面、移动 Web 、混合应用开发相关技术点(选修)”一节说到单页面应用的缺点是不利于 SEO，那么 SEO 到底是什么？维基百科做出了如下解释。可见当我们正式运营一个上线的 Web 项目时，就需要 SEO 来提供“曝光度”。</p>
<blockquote><p>搜索引擎优化（英语：search engine optimization，缩写为SEO），是一种通过了解搜索引擎的运作规则来调整网站，以及提高目的网站在有关搜索引擎内排名的方式。</p></blockquote>
<p>构建工具可以自动化压缩代码文件，就涉及到了 Web 性能优化的一个环节。辅之以浏览器开发者工具的熟练使用，我们可以实地测试用户加载首页、加载各个图片时的等待时间，来通过优化 Web 性能增进用户体验。</p>
<h4>3.9 掌握至少一个静态模板引擎、CSS 预处理、JS 超集(选修)</h4>
<p>当页面结构趋于一致性后，数据的动态填充就是我们经常需要处理的事情。掌握一个前端模板引擎能动态的生成我们所需的页面，一个应用实例就是详情页和 Ajax 的组合。所谓静态模板引擎，指的是在 Web 应用中，不通过与服务端进行交互，用来动态生成 HTML 的工具，常见的有 Jeklly、Hexo 等，这些知识点会在搭建自己的静态站点时接触到。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683110" src="https://static.alili.tech/img/remote/1460000010683110" alt="" title="" style="cursor: pointer;"></span></p>
<p>常见的 CSS 预处理有 SASS、LESS、Stylus 等，通过一门新的编程语言来动态化开发静态的 CSS 代码，并将 CSS 作为目标生成文件；可以让我们的 CSS 更加简洁、适应性更强、可读性更佳，更易于代码的维护等诸多好处。</p>
<p>由于 JavaScript 是一种弱类型（或称动态类型）语言，即 JS 程序在生成变量时不需要指定其数据类型，相应的解决办法就有使用例如 TypeScript 等强类型的、拓展于 JavaScript 的 JS 超集，最终将其编译、转化成合法的 JavaScript 代码。这样我们可以避免很多潜在的程序 BUG。</p>
<h4>3.10 拥有浏览器插件、微信小程序、前端数据可视化编程能力(选修)</h4>
<p>浏览器插件的开发/使用能力、微信小程序的开发能力以及和前端数据可视化的实战能力身为第三方平台的代表，在不同的学习方向下有不同的侧重点，我们不可能全部都掌握。</p>
<p>但作为选修，我们可以了解到大部分浏览器插件其实就是用前端语言实现的；微信小程序也可看做从在微信提供的前端框架下开发而来；前端数据可视化更多的使用一些主流可视化库实现，能够快速入手未来的新项目。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683111" src="https://static.alili.tech/img/remote/1460000010683111" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">四、计算机网络</h3>
<h4>4.1 熟知常用计算机网络协议(必修)</h4>
<p>用户在浏览器所能看到的前端界面其源码常常放在 Web 服务器上，当我们需要将项目部署到线上并向用户提供可访问的服务时，就需要我们对 Web 开发的核心枢纽 —— 计算机网络——有所了解。其中包含计算机网络的形成与发展、定义与分类、组成与结构。</p>
<ul>
<li>TCP/IP 协议即传输控制协议/因特网互联协议，是计算机网络中使用最广泛的体系结构之一。TCP/IP 的四层结构从上到下分别为：应用层、传输层、网络层、链接层。</li>
<li>应用层直接与用户打交道，负责传送各种最终形态的数据，常见的有 SMTP (简单邮件传输协议)、NNTP (网络新闻传输协议)和 HTTP (超文本传输协议)。</li>
<li>传输层负责传送文本数据，主要协议是 TCP 协议 —— 一个面向连接的、保证可靠传输的数据流服务的协议。</li>
<li>网络层负责分配地址和传送二进制数据，主要协议是 IP 协议，通过 IP 来找到网络中的位移主机。</li>
<li>连接层负责建立电路连接，是整个网络的物理基础，典型的协议包括以太网、ASDL等。</li>
</ul>
<p>这里再提一下 WebSocket，一种在单个 TCP 连接上进行全双工通讯的协议。WebSocket 允许服务端主动向客户端推送数据，在 WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。WebSocket 避免了 Ajax 无意义的轮询，在很多应用级 Web 项目中经常有所涉及。</p>
<blockquote>
<p>延伸阅读：</p>
<ol>
<li>《图解 HTTP》</li>
<li>《HTTP 权威指南》</li>
<li>《图解 TCP/IP》</li>
<li>《HTML5 WebSocket 权威指南》</li>
</ol>
</blockquote>
<h4>4.2 了解网络体系结构、网络拓扑模型(选修)</h4>
<p>TCP/IP 协议的四层与 OSI 概念模型(开放式系统互联通信参考模型)的七层有一定的对应关系，后者并没有提供一个可以实现的方法，而是描述了一些概念，用来协调进程间通信标准的制定，是概念性框架。我们需要从宏观角度来了解整个网络体系结构。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683112" src="https://static.alili.tech/img/remote/1460000010683112" alt="" title="" style="cursor: pointer;"></span></p>
<p>计算机网络的拓扑结构可分为星型网、网型网、环型网、树型网、总线网和混合拓扑，描述的是网络中的各节点设备的连接情况。深入其中会更多的引出硬件、网络工程等知识点，这里作为选修了解即可。</p>
<h3 id="articleHeader6">五、服务端应用开发</h3>
<h4>5.1 至少掌握一门服务端开发语言及其常用框架(必修)</h4>
<p>在 Web 服务端架构的演进史中，我们从单机到多机(集群)、从应用和数据分离到逻辑与接口分离，服务端渐渐只提供接口，供前端 Web 应用来访问。即便如此，了解传统的服务端开发选型，并掌握现代化的服务端开发能力依然重要。在前端面试中，常常就会有类似的这么一句话“至少掌握一门服务端开发语言及其常用框架”。</p>
<p>语言只是工具，只要有处理网络请求、访问操作数据库的能力，任何编程语言都可以部署在服务器上，常见的服务端编程语言及其主流框架如下。</p>
<ul>
<li>PHP 语言：Laravel、Yii、CodeIgniter、ThinkPHP 框架等</li>
<li>Python 语言：Flask、Django 框架等</li>
<li>JavaScript 语言：Node.js 平台</li>
<li>Ruby 语言：Ruby on rails 框架等</li>
<li>Java 语言：Spring、Struts、Hibernate 框架等</li>
</ul>
<blockquote>
<p>延伸阅读：</p>
<ol>
<li>《PHP与MySQL程序设计(第4版)》</li>
<li>《Python 核心编程(第3版)》</li>
<li>《Ruby 元编程(第2版)》</li>
<li>《Java 编程思想(第4版)》</li>
<li>《Go 语言实战》</li>
</ol>
</blockquote>
<h4>5.2 熟练掌握 Web 服务器的搭建与部署(必修)</h4>
<p>服务端应用开发的入门步骤的前两步常常是选择服务端语言及其框架、搭建相应的开发环境。传统的 LAMP (Linux + Apache + MySQL + PHP) 架构和 全栈 MEAN (MongoDB + Express.js + Angular.js + Node.js ) 架构的 Web 流程图分别如下所示。尽管每种语言的侧重点不同，但其均对基础的 Web 服务端环境提供支持，根据自己的发展方向或项目所需来进行技术选型。</p>
<ul><li>LAMP (Linux + Apache + MySQL + PHP) 示意图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683113" src="https://static.alili.tech/img/remote/1460000010683113" alt="" title="" style="cursor: pointer;"></span></p>
<ul><li>MEAN (MongoDB + Express.js + Angular.js + Node.js ) 示意图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683114" src="https://static.alili.tech/img/remote/1460000010683114" alt="" title="" style="cursor: pointer;"></span></p>
<p>Web 服务端的部署其实就是将本地环境搭建在远程服务器上。首先我们需要一台远程服务器，可以在亚马逊云、新浪云、腾讯云等云平台进行云主机租赁。其次，我们的部署多为纯命令行形式，需要我们对 Linux 文件系统、服务端配置等均有所熟知。部署服务端环境至线上情况不同于直接部署到本地，需要考虑更多其他需求，也是必不可少的服务端能力之一。</p>
<blockquote>
<p>延伸阅读：</p>
<ol>
<li>《鸟哥的Linux私房菜:服务器架设篇(第3版)》</li>
<li>《图解服务器端网络架构》</li>
</ol>
</blockquote>
<h4>5.3 拥有撰写规范的数据字典、接口文档能力(必修)</h4>
<p>服务端开发人员的一条成长之路便是成为架构师，在有足够的能力进行架构设计前，先要了解 Rustful API，并会写规范的数据字典和接口文档。</p>
<p>一个典型的数据字典如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|字段|类型|空|键值|注释|
|----|----|----|----|----|
|sId|int(10)|否|主键|唯一标识|
|sBarcode|varchar(20)|否|    |学生账号(学号)|
|sPassword|varchar(20)|否|    |学生密码|
|sName|varchar(15)|是|    |学生姓名|
|cId|varchar(15)|否|外键|班级号|
|sRegTime|date|否|    |学生注册时间|" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>|<span class="hljs-string">字段</span>|<span class="hljs-string">类型</span>|<span class="hljs-string">空</span>|<span class="hljs-string">键值</span>|<span class="hljs-string">注释</span>|
|<span class="hljs-string">----</span>|<span class="hljs-string">----</span>|<span class="hljs-string">----</span>|<span class="hljs-string">----</span>|<span class="hljs-string">----</span>|
|<span class="hljs-string">sId</span>|<span class="hljs-string">int(10)</span>|<span class="hljs-string">否</span>|<span class="hljs-string">主键</span>|<span class="hljs-string">唯一标识</span>|
|<span class="hljs-string">sBarcode</span>|<span class="hljs-string">varchar(20)</span>|<span class="hljs-string">否</span>|<span class="hljs-string">    </span>|<span class="hljs-string">学生账号(学号)</span>|
|<span class="hljs-string">sPassword</span>|<span class="hljs-string">varchar(20)</span>|<span class="hljs-string">否</span>|<span class="hljs-string">    </span>|<span class="hljs-string">学生密码</span>|
|<span class="hljs-string">sName</span>|<span class="hljs-string">varchar(15)</span>|<span class="hljs-string">是</span>|<span class="hljs-string">    </span>|<span class="hljs-string">学生姓名</span>|
|<span class="hljs-string">cId</span>|<span class="hljs-string">varchar(15)</span>|<span class="hljs-string">否</span>|<span class="hljs-string">外键</span>|<span class="hljs-string">班级号</span>|
|<span class="hljs-string">sRegTime</span>|<span class="hljs-string">date</span>|<span class="hljs-string">否</span>|<span class="hljs-string">    </span>|<span class="hljs-string">学生注册时间</span>|</code></pre>
<p>一个典型的接口如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="### 单个学生登录
---
**简要描述：** 
- 学生登录接口，账号由教师一键生成，默认密码 123456。
**请求URL：** 
- `https://`
**请求方式：**
- POST 
**参数：** 
|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|barcode |是  |string | 身份证号码    |
|password   |是  |string | 密码    |
**返回示例**
``
{
    'res': 1
}
``
**返回参数说明** 
|参数名|类型|说明|
|:-----|:-----|-----|
|res |int   |1 为成功 0为失败  |
**备注**
此接口同时会返回 Cookie" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code><span class="hljs-comment">### 单个学生登录</span>
---
**简要描述：** 
- 学生登录接口，账号由教师一键生成，默认密码 <span class="hljs-number">123456</span>。
**请求URL：** 
- <span class="hljs-string">`https://`</span>
**请求方式：**
- POST 
**参数：** 
<span class="hljs-params">|参数名|</span>必选<span class="hljs-params">|类型|</span>说明<span class="hljs-params">|
|</span><span class="hljs-symbol">:----</span>    <span class="hljs-params">|:---|</span><span class="hljs-symbol">:-----</span> <span class="hljs-params">|-----   |</span>
<span class="hljs-params">|barcode |</span>是  <span class="hljs-params">|string |</span> 身份证号码    <span class="hljs-params">|
|</span>password   <span class="hljs-params">|是  |</span>string <span class="hljs-params">| 密码    |</span>
**返回示例**
<span class="hljs-string">``</span>
{
    <span class="hljs-string">'res'</span>: <span class="hljs-number">1</span>
}
<span class="hljs-string">``</span>
**返回参数说明** 
<span class="hljs-params">|参数名|</span>类型<span class="hljs-params">|说明|</span>
<span class="hljs-params">|:-----|</span><span class="hljs-symbol">:-----|-----|</span>
<span class="hljs-params">|res |</span>int   <span class="hljs-params">|1 为成功 0为失败  |</span>
**备注**
此接口同时会返回 Cookie</code></pre>
<blockquote>
<p>延伸阅读：</p>
<ol>
<li>《大型网站技术架构:核心原理与案例分析》</li>
<li>《大型分布式网站架构设计与实践》</li>
</ol>
</blockquote>
<h4>5.4 掌握 Linux 网络编程、多线程应用开发、爬虫能力(必修)</h4>
<p>除了脚本语言，服务端开发对于 C 语言或 C++ 语言的掌握也十分重要。在 Linux 网络编程上，首先需要了解网络协议，再仿照示例来尝试使用 C/C++ 进行网络 Socket 编程，能将抽象的网络知识生动化、形象化。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683115" src="https://static.alili.tech/img/remote/1460000010683115" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>项目对搜索引擎的优化便是为了方便搜索引擎的爬虫来有效识别该网站信息，同时由于很多互联网数据没有开放的接口供我们使用，我们也需要通过爬虫技术来定制化我们对网络信息筛选后的服务，爬虫也需要我们掌握。</p>
<blockquote>
<p>延伸阅读：</p>
<ol>
<li>《Linux系统编程(第2版)》</li>
<li>《UNIX网络编程》</li>
<li>《Linux多线程服务端编程》</li>
<li>《用 Python 写网络爬虫》</li>
</ol>
</blockquote>
<h4>5.5 了解网络安全、反向代理、HTTP 缓存优化(选修)</h4>
<p>此处划水，抛砖引玉。</p>
<h4>5.6 了解网站监测、运维、集群、负载均衡(选修)</h4>
<p>为了及时跟踪服务器运行状态，我们可以选择性的掌握网站监测的一些手段——或使用命令行或使用相关服务平台。同时通过一定的运维能力，我们能及时将不正常的服务器运行状态拉入正规之中——DevOps 是运维开发的一种大趋势。</p>
<p>当系统面临大量用户访问，负载过高的时候，通常会使用增加服务器数量来进行横向扩展，使用集群和负载均衡提高整个系统的处理能力。初学者的项目一般并不是很大，我们将集群和负载均衡列入选修。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683116" src="https://static.alili.tech/img/remote/1460000010683116" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">六、数据库与搜索引擎应用开发</h3>
<h4>6.1 熟知数据库分类、数据库范式等数据库基本概念(必修)</h4>
<p>本文将服务端应用开发与数据库/搜索引擎应用开发分离开，也是考虑到单机负载问题。通常意义上初学者所学的服务端开发环境都是搭建在一台机子上，也不太会出现负载过高的情况。现在将数据库与应用分开，我们只是在应用的配置中把数据库的地址从本机改到了另外一台机器上而已，对开发、测试、部署都没有什么影响，却能够缓解当前的系统压力，不过随着时间的推移，访问量继续增大，该类系统还是需要继续演进的。</p>
<p>在数据库的学习过程中，我们需要了解实体－联系模型、关系型数据库(如 MySQL)、非关系型数据库(如 MongDB)、关系模型、视图、触发器、数据库范式等知识点，从而便于我们真正理解 Web 应用到底是如何访问数据库中的数据并展现到前台界面中的。下图是关系型数据库的三层模式，两级映像，对数据的起到很好的独立性作用。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683117" src="https://static.alili.tech/img/remote/1460000010683117" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>
<p>延伸阅读：</p>
<ol>
<li>《数据库系统概念》</li>
<li>《大型网站系统与 Java 中间件实践》</li>
</ol>
</blockquote>
<h4>6.2 拥有良好的数据库设计、操作和管理能力(必修)</h4>
<p>说句题外话，前端培训班今年来培养出大量的俗称学员，常常就因为所学浅尝辄止到数据的 CRUD (增删改查) 上而饱受诟病。引以为鉴，我们在学习数据库设计及其相关操作之时，可以通过使用成型的数据库设计工具和拜读较权威的书籍来拓展知识面。下图展示了使用数据库设计工具时的界面，我们可以一键导出成可执行的语句或直接导出成图片。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683118" src="https://static.alili.tech/img/remote/1460000010683118" alt="" title="" style="cursor: pointer;"></span></p>
<p>数据库的管理就需要我们掌握数据库管理系统的使用。数据库只是数据的集合，数据库管理系统给我们提供了数据定义功能、数据操纵功能、数据库的运行管理和数据库的建立与维护等功能，提高了整个数据库系统的安全性与数据独立性、数据完整性。</p>
<blockquote>
<p>延伸阅读：</p>
<ol><li>《SQL必知必会(第4版)》</li></ol>
</blockquote>
<h4>6.3 掌握至少一个开源搜索引擎(选修)</h4>
<p>数据库与搜索引擎都服务于数据，前者核心是数据存储和事务能力，后者关注信息采集和关联的能力，各有千秋。依然以我这段时间所做的小项目为例，我们三人团队是这样分工的：Web 前端一人、PHP 微信开发一人、Java 搜索引擎一人；同时搜索引擎的接口供 PHP 微信端使用，PHP 微信端接口供 Web 前端使用。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683119" src="https://static.alili.tech/img/remote/1460000010683119" alt="" title="" style="cursor: pointer;"></span></p>
<p>使用成型的开源搜索引擎还有相应的数据展示和操作功能，需要我们多加练习。</p>
<h4>6.4 了解分布式数据库、大数据、机器学习(选修)</h4>
<p>当我们的应用日趋庞大，分布式、大数据就孕育而生。而有了庞大的数据量，基于这些数据的机器学习领域也变得活跃起来。引用维基百科。</p>
<ul>
<li>分布式数据库是用计算机网络将物理上分散的多个数据库单元连接起来组成的一个逻辑上统一的数据库。每个被连接起来的数据库单元称为站点或节点。分布式数据库有一个统一的数据库管理系统来进行管理，称为分布式数据库管理系统”。</li>
<li>大数据在总数据量相同的情况下，与个别分析独立的小型数据集（Data set）相比，将各个小型数据集合并后进行分析可得出许多额外的信息和数据关系性，可用来察觉商业趋势、判定研究质量、避免疾病扩散、打击犯罪或测定即时交通路况等；这样的用途正是大型数据集盛行的原因。</li>
<li>机器学习算法是一类从数据中自动分析获得规律，并利用规律对未知数据进行预测的算法。因为学习算法中涉及了大量的统计学理论，机器学习与推断统计学联系尤为密切，也被称为统计学习理论。算法设计方面，机器学习理论关注可以实现的，行之有效的学习算法。</li>
</ul>
<p>可见到了这一步，已经离 Web 开发有些许距离，但同为计算机科学领域，众多看似不相关的技术之间常常有意想不到的联动效果。</p>
<h3 id="articleHeader8">七、编程软技能</h3>
<h4>7.1 学会刻意练习、持续改进能力(必修)</h4>
<p>刻意练习≠传统的学习方法，需要我们带上学“一万小时”的心态来刻意的强化我们的能力。没有人天生会编程，很多互联网上厉害的技术人员要么从小开始接触到编程要么接触之后大部分时间都在编程。只要我们利用好时间，刻意练习编程能力、刻意练习打字速度都能在一定的阶段后有较大的长进。希望这不是简单的方法论，结合我们自己的性格特点来强化学习即可。</p>
<p>持续改进要求我们在刻意练习的基础上能随时看到自己的成长。可以通过写总结、完成计划任务来讲自己在编程领域的成长可视化；也可以通过和他人相约督促、结对面层、代码重审等环节实现。</p>
<blockquote>
<p>延伸阅读：</p>
<ol>
<li>《刻意练习:如何从新手到大师》</li>
<li>《精益思想(白金版)》</li>
</ol>
</blockquote>
<h4>7.2 拥有一定的抗压能力(必修)</h4>
<p>纵然我们不应该提倡加班文化，客观存在的加班现象让我们时常得回归到开发状态。我们可以通过培养良好的健身习惯、良好的饮食习惯、良好的作息习惯使自己的精神能随时集中起来。高薪也是有代价的。</p>
<blockquote>
<p>延伸阅读：</p>
<ol><li>《颈椎病康复指南》，哈哈</li></ol>
</blockquote>
<h4>7.3 拥有良好的中英文阅读能力、写作能力(选修)</h4>
<p>基于互联网的技术常常需要通过互联网来追踪最新改动。在线技术文档的阅读能力、各种技术框架书籍的阅读能力的提高都是我们快速学习到新知识的重要一步。英文阅读能力，也必不可少。就像，中文程序开发者中厉害的那些人，往往都翻译过英文技术书籍。</p>
<p>写作是一种凝聚、再创作、分享的动态过程。在本文的写作过程中整理了自己大学两年对 Web 开发的广度认知，也通过 GitChat 知识付费分享给每一个感兴趣的人，使文章能取之社区还之社区，双向成长。</p>
<h4>7.4 拥有一定的人际交往能力、演讲能力、影响力(选修)</h4>
<p>影响力？就是即使在资本的寒冬中，也能把自己“卖”个好价钱~。</p>
<h3 id="articleHeader9">八、总结</h3>
<p>本文通过对软件工程专业所学知识点的总结与思考，从 Web 开发的技术基本功、前端、后端、计算机网络和编程软技能五个方面，解析出了整个大前端技术栈。依然如文章开头所说，这篇文章不会具有太多的官方性质，但希望能达到抛砖引玉的效果，让我们在学习 Web 前端开发的道路上不再迷茫。引用移动端开源框架 Phonegap 的一句话：</p>
<blockquote><p>我们相信 Web，是因为相信它是解决设备差异化的终极方案；我们相信，当 Web 在今天做不到一件事的时候，是因为它还没来得及去实现，而不是因为它做不到。而 Phonegap，它的终极目的就是消失在 Web 标准的背后。</p></blockquote>
<p>社会的进步往往伴随着技术的革新，我们在前端行业的每一个脚步，都会成为下一代 Web 应用模型的垫脚石，就让我们一起用最大的热情投身前端行业中吧。</p>
<p>那么以贯穿本文的如下导图来结尾，期待我们的再次相遇~。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010683120" src="https://static.alili.tech/img/remote/1460000010683120" alt="" title="" style="cursor: pointer;"></span></p>
<hr>
<p><span class="img-wrap"><img data-src="/img/bVTSrW?w=640&amp;h=640" src="https://static.alili.tech/img/bVTSrW?w=640&amp;h=640" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
GitChat · 前端 | 从软件工程角度看大前端技术栈

## 原文链接
[https://segmentfault.com/a/1190000010683090](https://segmentfault.com/a/1190000010683090)

