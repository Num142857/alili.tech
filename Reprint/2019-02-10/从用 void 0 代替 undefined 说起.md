---
title: '从用 void 0 代替 undefined 说起' 
date: 2019-02-10 2:30:42
hidden: true
slug: 6xskr0p1brp
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Why underscore</h2>
<p>最近开始看 underscore源码，并将 <a href="https://github.com/hanzichi/underscore-analysis" rel="nofollow noreferrer" target="_blank">underscore源码解读</a> 放在了我的 <a href="http://www.cnblogs.com/zichi/p/5107820.html" rel="nofollow noreferrer" target="_blank">2016计划</a> 中。</p>
<p>阅读一些著名框架类库的源码，就好像和一个个大师对话，你会学到很多。为什么是 underscore？最主要的原因是 underscore 简短精悍（约 1.5k 行），封装了 100 多个有用的方法，耦合度低，非常适合逐个方法阅读，适合楼主这样的 JavaScript 初学者。从中，你不仅可以学到用 void 0 代替 undefined 避免 undefined 被重写等一些小技巧 ，也可以学到变量类型判断、函数节流&amp;函数去抖等常用的方法，还可以学到很多浏览器兼容的 hack，更可以学到作者的整体设计思路以及 API 设计的原理（向后兼容）。</p>
<p>之后楼主会写一系列的文章跟大家分享在源码阅读中学习到的知识。</p>
<ul>
<li><p>underscore-1.8.3 源码全文注释 <a href="https://github.com/hanzichi/underscore-analysis/blob/master/underscore-1.8.3-analysis.js" rel="nofollow noreferrer" target="_blank">https://github.com/hanzichi/underscore-analysis/blob/master/underscore-1.8.3-analysis.js</a></p></li>
<li><p>underscore-1.8.3 源码解读项目地址 <a href="https://github.com/hanzichi/underscore-analysis" rel="nofollow noreferrer" target="_blank">https://github.com/hanzichi/underscore-analysis</a></p></li>
</ul>
<p>欢迎围观~ （<strong>如果有兴趣，欢迎 star &amp; watch~</strong>）您的关注是楼主继续写作的动力</p>
<h2 id="articleHeader1">Why does void 0 replace undefined</h2>
<p>说来惭愧，underscore 源码解读这个 Repo 放在 Github 都已经 20 天没有更新了，要不是今天 "不小心" 注意到，我居然都快忘了（是不是 lu 多了），所以今晚无论如何都要 lu 出第一篇（毕竟万事开头难）。相对于其他源码解读的文章，基本都会从整体设计开始讲起，楼主觉得 underscore 这个库有点特殊，so 决定按照自己的思路，从用 void 0 代替 undefined 说起。</p>
<p>underscore 源码没有出现 undefined（注意，其实有出现一处，是为 "undefined"，而不是 undefined），而用 void 0 代替之。为什么要这么做？我们可以从两部分解读，其一是 undefined 哪里不好了，你非得找个替代品？其二就是替代品为毛要找 void 0？</p>
<p>我们先看第一点，答案很简单，undefined 并不是保留词（reserved word），它只是全局对象的一个属性，在低版本 IE 中能被重写。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var undefined = 10;

// undefined -- chrome
// 10 -- IE 8
alert(undefined);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> <span class="hljs-literal">undefined</span> = <span class="hljs-number">10</span>;

<span class="hljs-comment">// undefined -- chrome</span>
<span class="hljs-comment">// 10 -- IE 8</span>
alert(<span class="hljs-literal">undefined</span>);</code></pre>
<p>事实上，undefined 在 ES5 中已经是全局对象的一个只读（read-only）属性了，它不能被重写。但是在局部作用域中，还是可以被重写的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function() {
  var undefined = 10;

  // 10 -- chrome
  alert(undefined);
})();

(function() {
  undefined = 10;

  // undefined -- chrome
  alert(undefined);
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> <span class="hljs-literal">undefined</span> = <span class="hljs-number">10</span>;

  <span class="hljs-comment">// 10 -- chrome</span>
  alert(<span class="hljs-literal">undefined</span>);
})();

(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-literal">undefined</span> = <span class="hljs-number">10</span>;

  <span class="hljs-comment">// undefined -- chrome</span>
  alert(<span class="hljs-literal">undefined</span>);
})();</code></pre>
<p>接下来思考第二个问题，为毛找的替代品是 void 0？</p>
<p>我们来看看 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void" rel="nofollow noreferrer" target="_blank">MDN</a> 的解释：</p>
<blockquote><p>The void operator evaluates the given expression and then returns undefined.</p></blockquote>
<p>意思是说 void 运算符能对给定的表达式进行求值，然后返回 undefined。也就是说，void 后面你随便跟上一个表达式，返回的都是 undefined，都能完美代替 undefined！那么，这其中最短的是什么呢？毫无疑问就是 void 0 了。其实用 void 1，void (1+1)，void (0) 或者 void "hello"，void (new Date()) 等等，都是一样的效果。更重要的前提是，void 是不能被重写的（cannot be overidden）。</p>
<p>那么，ES5 大环境下，void 0 就没有用武之地了吗？答案是否定的，用 void 0 代替 undefined 能节省不少字节的大小，事实上，不少 JavaScript 压缩工具在压缩过程中，正是将 undefined 用 void 0 代替掉了。</p>
<p>一篇不长的文章写了两个小时，心累，不点个赞、不关注下楼主的 Repo 你觉得好意思吗？<a href="https://github.com/hanzichi/underscore-analysis" rel="nofollow noreferrer" target="_blank">https://github.com/hanzichi/underscore-analysis</a></p>
<h2 id="articleHeader2">Read More</h2>
<ul>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void" rel="nofollow noreferrer" target="_blank">void MDN</a></p></li>
<li><p><a href="http://stackoverflow.com/questions/7452341/what-does-void-0-mean" rel="nofollow noreferrer" target="_blank">What does void 0 mean?</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从用 void 0 代替 undefined 说起

## 原文链接
[https://segmentfault.com/a/1190000005138543](https://segmentfault.com/a/1190000005138543)

