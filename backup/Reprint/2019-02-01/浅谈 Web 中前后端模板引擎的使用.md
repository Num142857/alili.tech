---
title: '浅谈 Web 中前后端模板引擎的使用' 
date: 2019-02-01 2:30:10
hidden: true
slug: psy3zhb8af
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>这篇文章本来不打算写的，实话说楼主对前端模板的认识还处在非常初级的阶段，但是为了整个 <a href="https://github.com/hanzichi/underscore-analysis" rel="nofollow noreferrer" target="_blank">源码解读系列</a> 的完整性，在深入 Underscore _.template 方法源码后，觉得还是有必要记下此文，为了自己备忘也好，为了还没用上前端模板引擎的同学的入门也好。（熟悉模板引擎的可以帮楼主看看文中有没有 BUG ..）</p>
<h1 id="articleHeader1">后端 MVC</h1>
<p>说起模板渲染，楼主首先接触的其实并不是前端模板引擎，而是后端。后端 MVC 模式中，一般从 Model 层中读取数据，然后将数据传到 View 层渲染（渲染成 HTML 文件），而 View 层，一般都会用到模板引擎，比如楼主项目中用到的 PHP 的 smarty 模板引擎。随便上段代码感受一下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <ul class=&quot;well nav nav-list&quot; style=&quot;height:95%;&quot;>
    "{{"foreach from=$pageArray.result item=leftMenu key=key name=leftMenu"}}"
      <li class=&quot;nav-header&quot;>"{{"$key"}}"</li>
      "{{"foreach from=$leftMenu key=key2 item=item2"}}"
        <li><a target=&quot;main&quot; href='"{{"$item2"}}"'>"{{"$key2"}}"</a></li>
      "{{"/foreach"}}"
    "{{"/foreach"}}"
  </ul>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"well nav nav-list"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"height:95%;"</span>&gt;</span>
    "{{"foreach from=$pageArray.result item=leftMenu key=key name=leftMenu"}}"
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav-header"</span>&gt;</span>"{{"$key"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      "{{"foreach from=$leftMenu key=key2 item=item2"}}"
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"main"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'"{{"$item2"}}"'</span>&gt;</span>"{{"$key2"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      "{{"/foreach"}}"
    "{{"/foreach"}}"
  <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>传入 View 层的其实就是个叫做 <em>$pageArray</em> 的 JSON 数据。而 MVC 模式也是非常容易理解，推荐看下阮一峰老师的 <a href="http://www.ruanyifeng.com/blog/2007/11/mvc.html" rel="nofollow noreferrer" target="_blank">谈谈MVC模式</a>，然后再看看下面这张图。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007326811?w=500&amp;h=255" src="https://static.alili.tech/img/remote/1460000007326811?w=500&amp;h=255" alt="web_mvc" title="web_mvc" style="cursor: pointer; display: inline;"></span></p>
<p>以前的 WEB 项目大多会采用这种后台 MVC 模式，这样做有利于 SEO，并且与前端请求接口的方式相比，少了个 HTTP 请求，理论上加载速度可能会稍微快些。但是缺点也非常明显，前端写完静态页面，要让后台去「套模板」，每次前端稍有改动，后台对应的模板页面同时也需要改动，非常麻烦。页面中如果有复杂的 JS，前端写还是后端写？前端写的话，没有大量的数据，调试不方便，后端写的话... 所以楼主看到的 PHPer 通常都会 JS。</p>
<h1 id="articleHeader2">前端模板</h1>
<p>AJAX 的出现使得前后端分离成为可能。后端专注于业务逻辑，给前端提供接口，而前端通过 AJAX 的方式向后端请求数据，然后动态渲染页面。</p>
<p>我们假设接口数据如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" [{name: &quot;apple&quot;}, {name: &quot;orange&quot;}, {name: &quot;peach&quot;}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code style="word-break: break-word; white-space: initial;"> [{name: <span class="hljs-string">"apple"</span>}, {name: <span class="hljs-string">"orange"</span>}, {name: <span class="hljs-string">"peach"</span>}]</code></pre>
<p>假设渲染后的页面如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <ul class=&quot;list&quot;>
    <li>apple</li>
    <li>orange</li>
    <li class=&quot;last-item&quot;>peach</li>
  </ul>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>apple<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>orange<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"last-item"</span>&gt;</span>peach<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>前端模板引擎出现之前，我们一般会这么做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div></div>
<script>
// 假设接口数据
var data = [{name: &quot;apple&quot;}, {name: &quot;orange&quot;}, {name: &quot;peach&quot;}];

var str = &quot;&quot;;
str += '<ul class=&quot;list&quot;>';

for (var i = 0, len = data.length; i < len; i++) {
  if (i !== len - 1)
    str += &quot;<li>&quot; + data[i].name + &quot;</li>&quot;;
  else
    str += '<li class=&quot;last-item&quot;>'  + data[i].name + &quot;</li>&quot;;
}

str += &quot;</ul>&quot;;
document.querySelector(&quot;div&quot;).innerHTML = str;
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-comment">// 假设接口数据</span>
<span class="hljs-keyword">var</span> data = [{<span class="hljs-attr">name</span>: <span class="hljs-string">"apple"</span>}, {<span class="hljs-attr">name</span>: <span class="hljs-string">"orange"</span>}, {<span class="hljs-attr">name</span>: <span class="hljs-string">"peach"</span>}];

<span class="hljs-keyword">var</span> str = <span class="hljs-string">""</span>;
str += <span class="hljs-string">'&lt;ul class="list"&gt;'</span>;

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = data.length; i &lt; len; i++) {
  <span class="hljs-keyword">if</span> (i !== len - <span class="hljs-number">1</span>)
    str += <span class="hljs-string">"&lt;li&gt;"</span> + data[i].name + <span class="hljs-string">"&lt;/li&gt;"</span>;
  <span class="hljs-keyword">else</span>
    str += <span class="hljs-string">'&lt;li class="last-item"&gt;'</span>  + data[i].name + <span class="hljs-string">"&lt;/li&gt;"</span>;
}

str += <span class="hljs-string">"&lt;/ul&gt;"</span>;
<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"div"</span>).innerHTML = str;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>其实楼主个人也经常这么干，看上去简单方便，但是这样做显然有缺点，将 HTML 代码（View 层）和 JS 代码（Controller 层）混杂在了一起，UI 与逻辑代码混杂在一起，阅读起来会非常吃力。一旦业务复杂起来，或者多人维护的情况下，几乎会失控。而且如果需要拼接的 HTML 代码里有很多引号的话（比如有大量的 href 属性，src 属性），那么就非常容易出错了（这样干过的应该深有体会）。</p>
<p>这个时候，前端模板引擎出现了，Underscore 的 _.template 可能是最简单的前端模板引擎了（可能还上升不到引擎的高度，或者说就是个前端模板函数）。我们先不谈 _.template 的实现，将以上的代码用其改写。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div></div>
<script src=&quot;//cdn.bootcss.com/underscore.js/1.8.3/underscore.js&quot;></script>
<script type=&quot;text/template&quot; id=&quot;tpl&quot;>
  <ul class=&quot;list&quot;>
    <%_.each(obj, function(e, i, a){%>
      <% if (i === a.length - 1) %>
        <li class=&quot;last-item&quot;><%=e.name%></li>
      <% else %>
        <li><%=e.name%></li>
    <%})%>
  </ul>
</script>

<script>
// 模拟数据
var data = [{name: &quot;apple&quot;}, {name: &quot;orange&quot;}, {name: &quot;peach&quot;}];

var compiled = _.template(document.getElementById(&quot;tpl&quot;).innerHTML);
var str = compiled(data);
document.querySelector(&quot;div&quot;).innerHTML = str;
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/underscore.js/1.8.3/underscore.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/template"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tpl"</span>&gt;</span><span class="javascript">
  &lt;ul <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"list"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">%_.each(obj,</span> <span class="hljs-attr">function</span>(<span class="hljs-attr">e</span>, <span class="hljs-attr">i</span>, <span class="hljs-attr">a</span>){%&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">%</span> <span class="hljs-attr">if</span> (<span class="hljs-attr">i</span> === <span class="hljs-string">a.length</span> <span class="hljs-attr">-</span> <span class="hljs-attr">1</span>) %&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"last-item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%=e.name%</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">%</span> <span class="hljs-attr">else</span> %&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%=e.name%</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">%})%</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-comment">// 模拟数据</span>
<span class="hljs-keyword">var</span> data = [{<span class="hljs-attr">name</span>: <span class="hljs-string">"apple"</span>}, {<span class="hljs-attr">name</span>: <span class="hljs-string">"orange"</span>}, {<span class="hljs-attr">name</span>: <span class="hljs-string">"peach"</span>}];

<span class="hljs-keyword">var</span> compiled = _.template(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"tpl"</span>).innerHTML);
<span class="hljs-keyword">var</span> str = compiled(data);
<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"div"</span>).innerHTML = str;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这样一来，如果前端需要改 HTML 代码，只需要改模板即可。这样做的优点很明显，前端 UI 和逻辑代码不再混杂，阅读体验良好，改动起来也方便了许多。</p>
<p>前后端分离最大的缺点可能就是 SEO 无力了，毕竟爬虫只会抓取 HTML 代码，不会去渲染 JS。（PS：现在的 Google 爬虫已经可以抓取 AJAX 了 <a href="https://developers.google.com/webmasters/ajax-crawling/docs/learn-more" rel="nofollow noreferrer" target="_blank">Making AJAX applications crawlable</a>，具体效果未知）</p>
<h1 id="articleHeader3">Node 中间层</h1>
<p>单纯的后端模板引擎（后端 MVC）以及前端模板引擎方式都有一定的局限性，Node 的出现让我们有了第三种选择，让 Node 作为中间层。</p>
<p>具体如何操作？简单地说就是让一门后台语言（比如 Java？PHP？）单纯提供渲染页面所需要的接口，Node 中间层用模板引擎来渲染页面，使得页面直出。这样一来，后台提供的接口，不仅 Web 端可以使用，APP，浏览器也可以调用，同时页面 Node 直出也不会影响  SEO，并且前后端也分离，不失为一种比较完美的方案。</p>
<h1 id="articleHeader4">总结</h1>
<p>本文简单介绍了模板引擎在前后端的使用，下文我们回到 Underscore，重点分析下 _.template 的使用方式以及源码原理。</p>
<p>PS：楼主对于模板引擎的认识比较浅显，有不正之处希望指出~感谢！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅谈 Web 中前后端模板引擎的使用

## 原文链接
[https://segmentfault.com/a/1190000007326808](https://segmentfault.com/a/1190000007326808)

