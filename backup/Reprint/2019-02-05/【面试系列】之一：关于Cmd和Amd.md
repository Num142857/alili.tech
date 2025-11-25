---
title: '【面试系列】之一：关于Cmd和Amd' 
date: 2019-02-05 2:30:09
hidden: true
slug: eyvn9ahzwtc
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">之一：关于Cmd和Amd</h1>
<blockquote><p>为什么想起来做这样一个专题呢，答案应该是为了勉励面试笔试秋招中的自己吧！<br>而且也是为了和我一样的你。</p></blockquote>
<h3 id="articleHeader1">1.开篇</h3>
<p>我叫王彬，现在是百度首页业务部（原网页搜团队索部FE前端）的实习FE，<br>两天前我得知我所在的部门只有两个hc，而且要分给策略rd，<br>这就意味着我要面临千军万马过独木桥的<strong>“秋招”</strong>。<br>可能我的描述有点夸张，但是此时此刻的真的是这么感觉的。<br>我觉得以我现在的水平，可能不会有一家大公司要我，所以我发自内心的厌恶秋招！<br>但是必须面对！<br>一起努力吧，希望自己可以一直写下去。<br>所写的文章肯定有不完善的地方，希望看的朋友可以指正，我会虚心接受一切声音。<br>好，言归正传！<br>我今天要写的是关于Amd和Cmd</p>
<p>首先来看这个<a href="http://www.zhihu.com/question/20351507/answer/14859415" rel="nofollow noreferrer" target="_blank">http://www.zhihu.com/question...</a><br>玉伯知乎上的回答</p>
<p>说到Amd和Cmd，你可能和我一样，最先想到的就是require.js以及sea.js<br>因为两者分别的是Amd和Cmd的代表<br>在开始深入了解Amd以及Cmd之前，我和大家一样，只是知道这都是js模块化加载的工具<br>至于模块化加载的好处自然不必多说，用过的应该都懂<br>那么我们就从require.js和sea.js蔓延开来讲讲Amd和Cmd</p>
<h3 id="articleHeader2">2.Amd的代表require.js</h3>
<p>Amd是指Asynchronous Module Definition，异步的模块加载机制。是在推广require.js时对模块规范化产出。<br></p>
<p>以下的内容引自阮一峰老师的博客<a href="http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blo...</a></p>
<p>要说Amd就要先从Common.js说起。</p>
<p>2009年，美国程序员Ryan Dahl创造了node.js项目，将javascript语言用于服务器端编程。<br>node.js的模块系统，就是参照CommonJS规范实现的。在CommonJS中，有一个全局性方法require()，用于加载模块。假定有一个数学模块math.js，就可以像下面这样加载。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var math = require('math');
math.add(2,3); // 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">var</span> math = require(<span class="hljs-string">'math'</span>);
math.<span class="hljs-keyword">add</span>(<span class="hljs-number">2</span>,<span class="hljs-number">3</span>); <span class="hljs-comment">// 5</span></code></pre>
<p>有了服务器端模块以后，很自然地，大家就想要客户端模块。而且最好两者能够兼容，一个模块不用修改，在服务器和浏览器都可以运行。<br>但是，由于一个重大的局限，使得CommonJS规范不适用于浏览器环境。还是上一节的代码，如果在浏览器中运行，会有一个很大的问题，你能看出来吗？</p>
<p>第二行math.add(2,3)，在第一行require('math')之后运行，因此必须等math.js加载完成。也就是说，如果加载时间很长，整个应用就会停在那里等。</p>
<p>这对服务器端不是一个问题，因为所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。</p>
<p>但是，对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于"假死"状态。</p>
<p>因此，浏览器端的模块，不能采用"同步加载"（synchronous），只能采用"异步加载"（asynchronous）。这就是AMD规范诞生的背景。</p>
<p>下面具体的用法，看一下下面的举例（具体详细配置以及使用方法请大家查看require.js官方文档）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//通过数组引入依赖 ，回调函数通过形参传入依赖 
define(['someModule1', ‘someModule2’], function (someModule1, someModule2) { 

    function foo () { 
        // something 
        someModule1.test(); 
    } 

    return {foo: foo} 
}); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//通过数组引入依赖 ，回调函数通过形参传入依赖 </span>
define([<span class="hljs-string">'someModule1'</span>, ‘someModule2’], <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(someModule1, someModule2)</span> </span>{ 

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span> <span class="hljs-params">()</span> </span>{ 
        <span class="hljs-comment">// something </span>
        someModule1.test(); 
    } 

    <span class="hljs-keyword">return</span> {foo: foo} 
}); </code></pre>
<p>AMD规范允许输出模块兼容CommonJS规范，这时define方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(function (require, exports, module) { 
     
    var reqModule = require(&quot;./someModule&quot;); 
    requModule.test(); 
     
    exports.asplode = function () { 
        //something
    } 
}); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>define(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">require, exports, module</span>) </span>{ 
     
    <span class="hljs-keyword">var</span> reqModule = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./someModule"</span>); 
    requModule.test(); 
     
    exports.asplode = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ 
        <span class="hljs-comment">//something</span>
    } 
}); </code></pre>
<p>但是值得注意的是：<br>仍然按照这种写法，加载的模块仍会被提前<strong>读取且加载</strong>（记住是读取且加载，后面有用），<br>与下面的这种写法效果一样！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(['./someModule'], function (require, exports, module, reqModule) { 

    requModule.test(); 
     
    exports.asplode = function () { 
        // something
    } 
}); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>define([<span class="hljs-string">'./someModule'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(require, exports, module, reqModule)</span> </span>{ 

    requModule.test(); 
     
    exports.asplode = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{ 
        <span class="hljs-comment">// something</span>
    } 
}); </code></pre>
<p>因此我们可以得出结论：<br>1.<strong>Amd推崇的是依赖前置</strong>。<br>2.<strong>Amd对加载的模块是提前读取并加载</strong>。</p>
<h3 id="articleHeader3">3. Cmd代表的sea.js</h3>
<p>Cmd是指Common Module Definition，异步的模块加载机制。是在推广sea.js时对模块规范化产出。<br>说到Cmd，大家千万不要望文生义，认为这和Common.js在服务器端的加载方式相同，其实并不一样。<br>其实Cmd更像是Amd和Common.js的升级版，结合了两者的优点。</p>
<p>Common.js可以做到当需要这个模块时，再读取并加载。<br>Amd可以做到避免Common.js的 <strong>“临时读取并加载文件”</strong>，它是提前读取并加载。</p>
<p>而Cmd可以做到的是，<strong>“提前读取文件，但在需要再加载”</strong>，这样可以避免浏览器临时加载文件的假死，也可以避免提前加载引起的逻辑问题。</p>
<p>具体的逻辑问题指什么呢？我们来看这篇图文并茂的讲解：</p>
<p>请戳：<a href="https://www.douban.com/note/283566440/" rel="nofollow noreferrer" target="_blank">https://www.douban.com/note/2...</a></p>
<p>请仔细看，如果有点懵的话，像我一样，再看两遍。</p>
<p>所以大家叫sea.js懒加载，也就是 “as lazy as possible”，如果你面试的时候说出这句话，面试官一定对你刮目相看。这也是Cmd的标志！<br>懒加载可以很好的作为判别Amd和Cmd的方法哈！</p>
<p>因此我们可以总结出：<br>1.<strong>Cmd推崇的是就近依赖</strong>。<br>2.<strong>Cmd对加载的模块是提前读取并不加载，而是在需要时加载</strong>。</p>
<h3 id="articleHeader4">4. 总结</h3>
<p>我在百度实习时接触到过一个框架，用于百度PC首页和PAD首页的模块化开发。<br>这个框架是F框架（移动端由于性能优化的要求使用的是B框架，esl.js），感兴趣的朋友可以深入了解一下。</p>
<p>F框架有一个特点，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="F.module('hello', function () {
    // require('world');
    // do something...
}) " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code>F.<span class="hljs-keyword">module</span>(<span class="hljs-string">'hello'</span>, function () {
    <span class="hljs-regexp">//</span> <span class="hljs-keyword">require</span>(<span class="hljs-string">'world'</span>);
    <span class="hljs-regexp">//</span> <span class="hljs-keyword">do</span> something...
}) </code></pre>
<p>如果代码这么写，虽然require('world')被注释掉了<br>但是world这个模块依然会被加载，大家知道为什么吗？</p>
<p>答案是：因为F框架遵循的是Amd规范，会正则匹配factory也就是模块的主体函数中的require字段，一但匹配到就会进行前置读取并加载。<br>所以会出现这种现象。</p>
<p>这个例子希望可以帮助大家理解。<br>最后再看遍文章开头提到的玉伯大神的问答 <a href="http://www.zhihu.com/question/20351507/answer/14859415" rel="nofollow noreferrer" target="_blank">http://www.zhihu.com/question...</a> 加深理解</p>
<blockquote><p>文章的内容并不是全部原创，<br>我在网上借鉴了许多老师的经验</p></blockquote>
<p><a href="http://www.zhihu.com/question/20351507/answer/14859415" rel="nofollow noreferrer" target="_blank">http://www.zhihu.com/question...</a><br><a href="https://www.douban.com/note/283566440/" rel="nofollow noreferrer" target="_blank">https://www.douban.com/note/2...</a><br><a href="http://zccst.iteye.com/blog/2215317" rel="nofollow noreferrer" target="_blank">http://zccst.iteye.com/blog/2...</a><br><a href="http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blo...</a></p>
<p>感谢以上所有老师的智慧结晶！</p>
<p>下一次想和大家聊聊js原型那些事，争取马上更新！<br>对啦，大家有没有什么复习数据结构与算法的好办法，希望数据结构与算法大神指点明津！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【面试系列】之一：关于Cmd和Amd

## 原文链接
[https://segmentfault.com/a/1190000006264897](https://segmentfault.com/a/1190000006264897)

