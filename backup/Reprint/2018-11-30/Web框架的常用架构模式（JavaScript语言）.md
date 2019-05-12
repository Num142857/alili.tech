---
title: 'Web框架的常用架构模式（JavaScript语言）' 
date: 2018-11-30 2:30:12
hidden: true
slug: qs3e4pvdo
categories: [reprint]
---

{{< raw >}}

                    
<p>在写干货之前，我想先探（qiang）讨（diao）两个问题，模式的局限性？模式有什么用？</p>
<p>最近看到一篇文章对我启发很大，<a href="https://www.zhihu.com/question/19583219" rel="nofollow noreferrer" target="_blank">许来西在知乎的回答《哲学和科学有什么关联？》</a>，全篇较长，这里摘录我要引出的一点：</p>
<blockquote>科学作为一种经验主义的认识论，有着经验主义的巨大缺陷：它永远不能产生绝对正确的真理。这是归纳法的本质决定的。而且值得注意的是，归纳不具有唯一性。</blockquote>
<p>举一个简单的例子，我们假设一个世界，如下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014887659?w=1874&amp;h=526" src="https://static.alili.tech/img/remote/1460000014887659?w=1874&amp;h=526" alt="一个青蛙世界" title="一个青蛙世界" style="cursor: pointer; display: inline;"></span></p>
<p>科学家很快有了两种归纳方式：</p>
<ul>
<li>世界上所有的青蛙都戴眼镜</li>
<li>世界上所有戴眼镜的都是青蛙</li>
</ul>
<p>在没有更多的信息的时候，我们应该如何选择正确的理论呢？答案是无法选择。</p>
<p>举个模式的例子，Scott Wlaschin 在<a href="https://fsharpforfunandprofit.com/fppatterns/" rel="nofollow noreferrer" target="_blank">《Functional Programming Design Patterns》（函数型编程模式）</a>中对比了常用面向对象模式、原则，在函数型编程语言里面等价实现：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015335872?w=805&amp;h=464" src="https://static.alili.tech/img/remote/1460000015335872?w=805&amp;h=464" alt="OOP模式对比函数式" title="OOP模式对比函数式" style="cursor: pointer; display: inline;"></span></p>
<p>OOP 和 FP，到底哪种编程范式更加先进呢？答案同样是无法选择。只能在不同的时候选用不同的假设和不同的理论来解释问题，许来西的文章讲到科学一定程度上通过放弃一贯性换取了实用性，放弃自洽性换取了它洽性。科学追求实用和工具（实用主义和工具主义）。当我看完许来西的文章，欣喜若狂，一直对编程技术理论的善变和不自洽感到恐惧和厌恶，其实只是经验主义科学发展的必然过程，善变代表更好的理论（更方便）在替换基础理论，代表蓬勃发展。</p>
<p>所以我想引入第一个观点：</p>
<ul><li>模式是一套立足于特定背景，基于共性总结出的方案，它绝不是真理。</li></ul>
<p>了解这些有助于帮助从对模式的盲目崇拜到探究它的实用性和工具性，也就是我要引出的第二个问题：模式有什么用？</p>
<p>不好好写代码看哲学文章不是偶然，在文章落笔之前，我有思考过在 JavaScript 这门动态，多范式，单线程，基于事件I/O的语言环境下，甚至在当前时代，模式是否还有意义？显然我不是唯一这样想的，还有篇深度好文<a href="http://www.infoq.com/cn/articles/design-patterns-proposed-by-gof-20-years-ago" rel="nofollow noreferrer" target="_blank">《20年前GoF提出的设计模式，对这个时代是否还有指导意义？》</a>。这篇文章引经据典，摘录了GoF（又称Gang of Four，即Erich Gamma, Richard Helm, Ralph Johnson &amp; John Vlissides）在设计模式一书中观点：</p>
<blockquote>这本书的实际价值也许还值得商榷。毕竟它并没有提出任何前所未有的算法或者编程技术。它也没能给出任何严格的系统设计方法或者新的设计开发理论——它只是对现有设计成果的一种审视。大家当然可以将其视为一套不错的教程，但它显然无法为经验丰富的面向对象设计人员带来多少帮助。</blockquote>
<p><code>换言之，模式显然毫无实际用处。</code></p>
<p>不仅如此，文章还列举了一度模式滥用导致许多弊端，可谓警钟长鸣。</p>
<p>但是……模式这一称谓仍然不断出现，直到今天我们亦在大量使用。为什么？GoF实际早设计模式的书中做出了预言：</p>
<blockquote>“设计模式为设计师们提供一种共通的词汇储备，帮助其沟通、编写文档并探索设计方案。设计模式允许我们立足于高级抽象层面进行探讨，而非设计标注或者编程语言，这就大大降低了系统复杂性。设计模式提升了我们设计及与同事进行设计探讨时的切入点层级。”（第389页）</blockquote>
<p><strong>简言之，模式方便了我们的沟通，提升了思考问题的抽象层级。</strong></p>
<p>这个意义非常巨大，想象一下没有 MVC 架构模式，可能所有的 Web 框架必然的会实现一套几乎解决同样问题的方案，但是命名和文档却各不一样，当你去看一个新的框架文档的api 接口，从头到尾看完以后才恍然大悟，这不就是之前用的框架里面的 XXX 类似吗，这样的编程世界简直地狱。庆幸的是，得益于计算机科学家（码农）对问题和方案持续的抽象成模式，使得当前高度复杂的计算机科学也能得到合理分层和适配，大大简化了学习和沟通的成本。</p>
<p>为了感谢模式，是时候学习一波了，本文要介绍的主要有三种架构模式：Middleware，MVC，DI。</p>
<h2 id="articleHeader0">Middleware 中间件模式</h2>
<p>相信做过 Node.js 服务端开发的同学对这个模式一定不陌生，考虑如下 Web 应用的场景：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014887661?w=2436&amp;h=896" src="https://static.alili.tech/img/remote/1460000014887661?w=2436&amp;h=896" alt="简单Web框架" title="简单Web框架" style="cursor: pointer;"></span></p>
<p>在一个简单的 HTTP 请求响应周期里，有如下条件处理，</p>
<ul>
<li>记录开始时间</li>
<li>需要验证用户的身份 authentication。</li>
<li>解析cookie 并加载body</li>
<li>根据路由返回不同的业务处理结果</li>
<li>没有命中路由则返回404页面</li>
<li>记录日志</li>
<li>记录总共花费时间</li>
<li>处理异常并显示页面（开发环境）</li>
</ul>
<p>有些处理会根据是否成功决定是否继续后面的粗粒，有些处理会生成额外的数据，还有的要求拦截某些处理的开始和结束，最后异常处理和记录日志要求一定被执行。</p>
<p>一般的解决方法是用嵌套条件判断结合 <code>try</code> <code>catch</code> <code>finally</code> <code>return</code> 等控制语句，但是这样的方案会导致代码碎片化和复制粘贴的编码风格，因为控制流和逻辑耦合到了一起。理想的方案应当如下：</p>
<ul>
<li>中心化控制流</li>
<li>解耦处理模块（重用性）</li>
<li>声明式、可配置的服务(配置和代码无关)</li>
</ul>
<p>这些场景由来已久，很久以前J2EE总结了 <a href="http://www.oracle.com/technetwork/java/interceptingfilter-142169.html" rel="nofollow noreferrer" target="_blank">Intercepting Filter 模式</a>，有兴趣大家可以看看这篇文(lun)章(wen)，里面由浅入深提到三种方案，其中最初级的方案代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class DebuggingFilter implements Processor {
  private Processor target;
  public DebuggingFilter(Processor myTarget) {
    target = myTarget;
  }
  public void execute(ServletRequest req, 
  ServletResponse res) throws IOException, 
    ServletException    {
    // preprocess
    target.execute(req, res);
    // post-process
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="Java"><span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DebuggingFilter</span> <span class="hljs-keyword">implements</span> <span class="hljs-title">Processor</span> </span>{
  <span class="hljs-keyword">private</span> Processor target;
  <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-title">DebuggingFilter</span><span class="hljs-params">(Processor myTarget)</span> </span>{
    target = myTarget;
  }
  <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">execute</span><span class="hljs-params">(ServletRequest req, 
  ServletResponse res)</span> <span class="hljs-keyword">throws</span> IOException, 
    ServletException    </span>{
    <span class="hljs-comment">// preprocess</span>
    target.execute(req, res);
    <span class="hljs-comment">// post-process</span>
  }
}</code></pre>
<p>这个和 express 和 Koa 的中间件模式极其相似，但是因为静态语言本身一些特征，导致最后形成的企业级代码极其繁琐，并且有许多局限性。最主要的问题是处理模块之间难以重用和共享数据，因为 <code>ServletRequest</code> <code>ServletResponse</code> 无法动态添加属性。以至于 JavaEE 把这个模式的适用性加了许多限制，包括和核心处理逻辑分开。</p>
<p>在动态语言的世界里面，我们可以很方便的往 <code>req</code> 和 <code>res</code> 里面添加数据（基于约定），因为没有了很多 OOP 世界里面的”束缚“，Node.js 的实现通常更加优雅和通用。</p>
<h3 id="articleHeader1">Express 中间件模式</h3>
<p>express 实现如今广泛接受的 Middleware 中间件模式。中间件的意思是在 <code>请求</code> 和 <code>响应</code> 中间执行的函数（为了区分另一个中间件），签名如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var express = require('express');
var app = express();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">
<span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">var</span> app = express();
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014887662?w=730&amp;h=391" src="https://static.alili.tech/img/remote/1460000014887662?w=730&amp;h=391" alt="Express 中间件" title="Express 中间件" style="cursor: pointer;"></span></p>
<p>这个模式包含了一套声明式的路由规则，和 middleware 函数上的 next 签名，它们共同构成了整个中间件模式的控制流，如图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014887663?w=902&amp;h=400" src="https://static.alili.tech/img/remote/1460000014887663?w=902&amp;h=400" alt="express 中间件模式" title="express 中间件模式" style="cursor: pointer; display: inline;"></span></p>
<p>这个模式的核心构成不是<code>权限</code>，<code>解析</code>等中间件逻辑，而是<code>路由判断</code>，<code>next</code>和<code>中断响应（验证失败、解析失败）</code>，其作为中间件执行控制，解耦了具体的处理逻辑，使得更容易写出通用的细粒度的中间件。express 内置的强大的声明式路由，并且路由和 middleware 分离可以说是它最成功的设计之一。</p>
<p>然而在一些稍微复杂点的业务中，比如一个网站有管理端和用户端，两个端相当于独立的app。express 4.0 提供了一个非常强大的功能 Router。Router 拓展了链式决策变成树形决策，可以让 express 更好的支持大型项目。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
/*  
   文件  bird.js
*/
var express = require('express')
var router = express.Router()
  
router.get('/', function (req, res) {
  res.send('Birds home page')
}) 

module.exports = router

/*  
   文件  app.js
*/

var birds = require('./birds')

// ...

app.use('/birds', birds)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">
<span class="hljs-comment">/*  
   文件  bird.js
*/</span>
<span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>)
<span class="hljs-keyword">var</span> router = express.Router()
  
router.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  res.send(<span class="hljs-string">'Birds home page'</span>)
}) 

<span class="hljs-built_in">module</span>.exports = router

<span class="hljs-comment">/*  
   文件  app.js
*/</span>

<span class="hljs-keyword">var</span> birds = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./birds'</span>)

<span class="hljs-comment">// ...</span>

app.use(<span class="hljs-string">'/birds'</span>, birds)
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014887664?w=1057&amp;h=557" src="https://static.alili.tech/img/remote/1460000014887664?w=1057&amp;h=557" alt="express 中间件模式" title="express 中间件模式" style="cursor: pointer;"></span></p>
<h3 id="articleHeader2">Koa 异步中间件模型</h3>
<p>Koa 的异步中间件模式-洋葱模型，相比 Express，其中间件函数返回 <code>Promise</code>，支持 <code>async/await</code>，并且可以轻松实现前置和后置的处理。毫无疑问这个模式更加先进，一些在 express 里面不好实现的拦截处理逻辑，比如异常处理和统计时间，在 Koa 里用一个中间件就能搞定。然而遗憾的是 Koa 本身只提供了 Http 模块和洋葱模型的最小封装。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014887665?w=478&amp;h=435" src="https://static.alili.tech/img/remote/1460000014887665?w=478&amp;h=435" alt="express 中间件模式" title="express 中间件模式" style="cursor: pointer;"></span></p>
<p>未来我看好 Koa，其实 express 也意识到这点，他们计划在 5.0 版本里添加 Promise 的支持，然而作为一个老牌和完整生态的框架，要克服的困难远不是技术层面上看似的简单，直到目前仍然没有看到 5.x 宣布支持 <code>Promise</code>， 让我们拭目以待。</p>
<h2 id="articleHeader3">MVC 模式</h2>
<p>MVC 模式也需要介绍吗，我们天天都在聊 MVC，不管前、后端框架，说一句 MVC，对一下眼神，基本确定对方懂你了。</p>
<p>事实是，前端框架已经不适合用 MVC 讨论，这个模式从1979年提出以来，作为万精油模式，在各个框架和场景中被套用，背负了太多的历史包袱，大家可以看 winter 的文章 <a href="http://www.cnblogs.com/winter-cn/p/4285171.html" rel="nofollow noreferrer" target="_blank">谈谈UI架构设计的演化</a>。拨乱反正我觉得有希望，讨论前端框架大家以后统称 MV 模式就好了，就是模型和视图分离。</p>
<p>我们今天要讲的 MVC 模式是指在服务器上（后端） MVC 模式，它的定义经受了时间和实践的检验，在许多企业级 Web 框架的实现中高度一致。先列举场景：</p>
<p>如果你的网站只有几个简单的页面，所有逻辑都写在 Controller 里面，是没有问题的。随后网站迅速的增长，你发现，</p>
<ul>
<li>许多页面里面的视图是一致的，但是背后的数据模型不一致。比如：网站上几乎没有一个视图或者组件是独一无二的，表格，下拉框等。</li>
<li>许多页面里面的数据模型是一样的，但是展现的视图不一致。比如：同时支持PC和移动端，国际化本地化。</li>
</ul>
<p>我们做一个数学模型模拟极端情况，大家很容易能看到问题</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014887666?w=740&amp;h=194" src="https://static.alili.tech/img/remote/1460000014887666?w=740&amp;h=194" alt="系统刚好是内积的情况" title="系统刚好是内积的情况" style="cursor: pointer; display: inline;"></span></p>
<p>假设左边是我们的系统最终的样子，它刚好可以表示成 M（模型）和 V(视图）的内积，我们更倾向于右边的表达，因为它更简洁而且没有重复。这里的内积操作大家就可以理解成控制器，实际上不会如此巧合，但是分离模型和视图帮助我们提高代码复用，降低设计复杂度的好处是很显然的，一个更通用的表达</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014887667?w=513&amp;h=309" src="https://static.alili.tech/img/remote/1460000014887667?w=513&amp;h=309" alt="MVC 架构模式" title="MVC 架构模式" style="cursor: pointer; display: inline;"></span></p>
<p>模型视图和控制器之间都是单向链接，所以整个系统的行为非常可控且容易测试，单独把路由分开是想强调 Router 和 Controller 是两个概念，Router 只是一个触发器（或者提供了一种映射关系），在写测试的时候，我们也可以跳开 Router 单独调用 Controller。</p>
<p>看到上面的两种模式，是不是已经开始想，那有没有一个框架同时是 Koa + Router + MVC 呢，推荐大家一个非常好用的企业级 Web 框架 <a href="https://thinkjs.org/" rel="nofollow noreferrer" target="_blank">ThinkJS 3.0</a>，最新版的 ThinkJS 集成了大量最佳实践和完善的文档，不管是学习或者企业级开发都非常推荐。而且 ThinkJS 同样实现了接下来要讲的模式。</p>
<h2 id="articleHeader4">DI 依赖注入模式</h2>
<p>还是先说场景，假如服务端需要实现session，前期考虑到成本和用户量，单台服务器存到文件就够用了。后期如果用户量大的时候，需要横向扩展（Scale-out），就把 session 实现基于中心化的 Redis 服务。</p>
<p>我们系统设计目标是：</p>
<ul>
<li>不需要修改业务逻辑代码实现替换</li>
<li>不需要关注服务的创建和生命周期</li>
</ul>
<p>解决这类系统扩展性问题有一个非常著名的设计原则 <strong>控制反转（IoC Inversion of control）</strong>，而 <strong>依赖注入（DI dependency injection）</strong> 就是其中的一个实现模式。</p>
<p>DI 的基本思路是这样，首先我们的代码不能依赖具体的服务，需要总结归纳出一套抽象接口，业务实现依赖接口，而服务实现接口，最后通过框架专门负责创建和提供接口的实例。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014889737?w=846&amp;h=431" src="https://static.alili.tech/img/remote/1460000014889737?w=846&amp;h=431" alt="DI 模式实现" title="DI 模式实现" style="cursor: pointer; display: inline;"></span></p>
<p>这里的 IoC 容器或者说 Ioc 框架，会在启动的时候读取配置文件，并在运行的时候根据需要创建实例提供给使用者，在静态语言如 <code>java</code>，<code>c#</code> 需要用到反射等高级语法，而 <code>JavaScript</code> 本身是动态的，接口基于约定，并且使用的方式也更加灵活。比如 ThinkJS 3.0 里面的 <code>extend</code> 和 <code>adapter</code> 就可以理解成接口和实现，如图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014888840?w=846&amp;h=431" src="https://static.alili.tech/img/remote/1460000014888840?w=846&amp;h=431" alt="ThinkJS DI 模式实现" title="ThinkJS DI 模式实现" style="cursor: pointer; display: inline;"></span></p>
<p>那之所以称为 extend，是因为框架会直接把接口注入到 <code>controller</code> 或者 <code>think</code> 对象中。这样的好处是使用起来更方便，缺点是不同 <code>extend</code> 需要约定好不能重名。</p>
<h2 id="articleHeader5">最后</h2>
<p>本文介绍的三个架构模式，你会发现几乎在所有的Web框架实现都大同小异，这就是模式的好处。模式的意义类似于 IoC，我关注抽象和接口，抹平了具体语言特性下的细节问题，帮助我们更好的学习，沟通和思考。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Web框架的常用架构模式（JavaScript语言）

## 原文链接
[https://segmentfault.com/a/1190000014887654](https://segmentfault.com/a/1190000014887654)

