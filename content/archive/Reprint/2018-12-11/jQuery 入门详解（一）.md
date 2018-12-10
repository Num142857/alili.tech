---
title: 'jQuery 入门详解（一）' 
date: 2018-12-11 2:30:10
hidden: true
slug: d0aylthg998
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677116?w=1920&amp;h=1080" src="https://static.alili.tech/img/remote/1460000013677116?w=1920&amp;h=1080" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader0">jQuery</h1>
<h2 id="articleHeader1">前言</h2>
<blockquote>Sorry：由于春节前工作的调动，加上这段时间公司任务比较多一直加班，所以文章停更了很久，期间也有不少朋友私信、评论我，希望我写的快一点，在这里跟大家道个歉，后面更新速度可能会放缓，但是不会影响文章的质量，谢谢大家的支持。</blockquote>
<p>前面也花了不少时间，专门介绍了<code>js</code>基础这一块，从最基础的<code>js</code>讲起，再到<code>DOM</code>、<code>BOM</code>以及<code>特效</code>。虽然花费了不少时间，不过在写这些文章的时候，自己也收获了很多东西。所以我还是会一如既往的写下去。希望收藏文章的小伙伴们，不仅仅只是收藏，更重要的是多阅读、多理解。</p>
<h2 id="articleHeader2">1. jQuery基本概念</h2>
<blockquote>
<code>jQuery</code>是一个<code>javascript</code>库，<code>jQuery</code>凭借着简洁的语法和跨平台的兼容性，极大的简化了<code>js</code>操作<code>DOM</code>、处理事件、执行动画等操作。<code>jQuery</code>强调的理念是：<code>'write less, do more'</code>(写的少，做的多)。</blockquote>
<h3 id="articleHeader3">1.1 什么是 jQuery？</h3>
<blockquote>
<code>jQuery</code>就是一个<code>js</code>库，使用<code>jQuery</code>的话，会比使用<code>JavaScript</code>更简单。<a href="http://www.jquery.com/" rel="nofollow noreferrer" target="_blank">官网地址</a><p><code>js</code>库：把一些常用到的方法写到一个单独的<code>js</code>文件，使用的时候直接去引用这<code>js</code>文件就可以了。(<code>animate.js</code>、<code>common.js</code>)。</p>
</blockquote>
<p><em>我们知道了，<code>jQuery</code>其实就是一个<code>js</code>文件，里面封装了一大堆的方法方便我们的开发，因此我们学习<code>jQuery</code>，其实就是学习<code>jQuery</code>这个<code>js</code>文件中封装的一大堆方法。</em></p>
<h3 id="articleHeader4">1.2 jQuery 的版本</h3>
<blockquote>官网下载地址：<a href="http://jquery.com/download" rel="nofollow noreferrer" target="_blank">点击下载</a>。jQuery的版本有很多，分为：<code>1.x</code>、<code>2.x</code>、<code>3.x</code>。</blockquote>
<p><strong>版本分类：</strong></p>
<table>
<thead><tr>
<th>版本</th>
<th>兼容范围</th>
</tr></thead>
<tbody>
<tr>
<td>
<code>1.x</code>版本</td>
<td>能够兼容<code>IE678</code>浏览器</td>
</tr>
<tr>
<td>
<code>2.x</code>版本</td>
<td>不兼容<code>IE678</code>浏览器</td>
</tr>
<tr>
<td>
<code>3.x</code>版本</td>
<td>不兼容<code>IE678</code>浏览器，更加的简洁</td>
</tr>
</tbody>
</table>
<p><em><code>1.x</code>和<code>2.x</code>版本<code>jquery</code>都不再更新版本了，现在只更新<code>3.x</code>版本。</em></p>
<p><strong>压缩版与未压缩版：</strong></p>
<table>
<thead><tr>
<th>名称</th>
<th>大小</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>
<code>jquery.js</code>(开发版)</td>
<td>约<code>229KB</code>
</td>
<td>完整无压缩版本，主要用于测试、学习和开发</td>
</tr>
<tr>
<td>
<code>jquery.min.js</code>(生产版)</td>
<td>约<code>31KB</code>
</td>
<td>经过压缩，主要用于产品和项目，基本无可阅读性</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader5">1.3 jQuery 初体验</h3>
<blockquote>
<code>jQuery</code>不需要安装，直接在页面中引用即可。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>初识jQuery</title>
    <script src=&quot;../js/jquery-3.2.1.js&quot;></script>
</head>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>初识jQuery<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../js/jquery-3.2.1.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span></code></pre>
<p><strong>使用jQuery的三个步骤：</strong></p>
<ul>
<li>引入<code>jQuery</code>文件</li>
<li>入口函数</li>
<li>功能实现</li>
</ul>
<p><strong>关于jQuery的入口函数：</strong></p>
<ul><li>第一种写法：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(document).ready(function(){
    // 执行代码
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// 执行代码</span>
});</code></pre>
<ul><li>第二种写法：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(function(){
    // 执行代码
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// 执行代码</span>
});</code></pre>
<p><em>首先我们得明确一点，在 <code>jQuery</code> 库中， <code>‘$’</code> 就是 <code>jQuery</code> 的一个简写形式。</em></p>
<p><strong>jQuery入口函数与js入口函数对比：</strong></p>
<table>
<thead><tr>
<th>类别</th>
<th>window.onload</th>
<th>$(document).ready()</th>
</tr></thead>
<tbody>
<tr>
<td>执行时机</td>
<td>必须等待网页中所有的内容加载完毕后(包括图片)才能执行</td>
<td>网页中所有<code>DOM</code>结构绘制完毕后就执行，并不会等待图片、文件的加载</td>
</tr>
<tr>
<td>编写个数</td>
<td>不能同时写多个，下面的会把上面的覆盖</td>
<td>能同时编写多个，两个入口函数互不影响</td>
</tr>
<tr>
<td>简化写法</td>
<td>无</td>
<td><code>$(function(){});</code></td>
</tr>
</tbody>
</table>
<p><strong>示例代码：</strong> <em>[ 01-初识jQuery.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(document).ready(function() {
    alert(&quot;123&quot;);
});

// 简写入口函数
$(function() {
    alert(&quot;呵呵&quot;);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    alert(<span class="hljs-string">"123"</span>);
});

<span class="hljs-comment">// 简写入口函数</span>
$(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    alert(<span class="hljs-string">"呵呵"</span>);
});</code></pre>
<h3 id="articleHeader6">1.4 jQuery对象 和 DOM对象</h3>
<blockquote>第一次学习<code>jQuery</code>，经常分辨不清哪些是<code>jQuery</code>对象，哪些是<code>DOM</code>对象，通过本节我们来了解一下它们之间的关系。</blockquote>
<p><strong>1、DOM对象</strong></p>
<blockquote>
<code>DOM</code>(<code>Document Object Model</code>，文档对象模型)，每一份<code>DOM</code>都可以表示成一棵树。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var domObj = document.getElementById('id');    // 获得DOM对象
var objHTML = domObj.innerHTML;                // 使用Javascript中的属性-innerHTML" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> domObj = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'id'</span>);    <span class="hljs-comment">// 获得DOM对象</span>
<span class="hljs-keyword">var</span> objHTML = domObj.innerHTML;                <span class="hljs-comment">// 使用Javascript中的属性-innerHTML</span></code></pre>
<p><em>在 <code>js</code> 中，通过 <code>getElementByTagName</code> 或者 <code>getElementById</code> 来获取元素节点。像这样得到的 <code>DOM</code> 元素就是 <code>DOM</code> 对象。而且 <code>DOM</code> 对象可以使用 <code>js</code> 中的方法，如： <code>innerHTML</code>。</em></p>
<p><strong>2、jQuery对象</strong></p>
<blockquote>
<code>jQuery</code>对象，是通过<code>jQuery</code>包装<code>DOM</code>对象后产生的对象，<code>jQuery</code>对象是<code>jQuery</code>独有的，它可以使用<code>jQuery</code>里面的方法。</blockquote>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取id为test的元素内的html代码
$('#test').html();  // .html()是jQ里面的方法" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 获取id为test的元素内的html代码</span>
$(<span class="hljs-string">'#test'</span>).html();  <span class="hljs-comment">// .html()是jQ里面的方法</span></code></pre>
<p>上面的代码等同于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.getElementById('test').innerHTML;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'test'</span>).innerHTML;</code></pre>
<p><em>在<code>jQ</code>中，无法使用任何<code>DOM</code>对象的方法，例如：<code>$('id').innerHTML</code>，这是<code>错误</code>的写法。同样，在<code>js</code>中也无法使用<code>jQ</code>对象里面的方法，例如：<code>document.getElementById('id').html()</code>，这样也是错误的。</em></p>
<h3 id="articleHeader7">1.5 jQuery对象 和 DOM对象相互转换</h3>
<blockquote>为了大家在两者对象转换的时候不混淆，在定义<code>jQ</code>对象的时候，前面加上<code>‘$’</code>符。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var $variable; // jQuery 对象

var variable;  // DOM 对象" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> $variable; <span class="hljs-comment">// jQuery 对象</span>

<span class="hljs-keyword">var</span> variable;  <span class="hljs-comment">// DOM 对象</span></code></pre>
<p><strong>1、jQ对象转成DOM对象：</strong></p>
<blockquote>
<code>jQ</code>对象中是不能使用<code>DOM</code>对象里的方法的，但是如果<code>jQ</code>里的一些方法忘记的时候，只记得<code>DOM</code>中的方法的时候，怎么办呢？这时候就可以将<code>jQ</code>对象转换成<code>DOM</code>对象。</blockquote>
<p>方法一(常用)：<code>[index]</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var $box = $(&quot;#box&quot;);       // jQ获取到的对象
var box = $box[0];          // 转成DOM对象
box.innerHTML = &quot;哈哈哈&quot;;   // 使用DOM对象的方法" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> $box = $(<span class="hljs-string">"#box"</span>);       <span class="hljs-comment">// jQ获取到的对象</span>
<span class="hljs-keyword">var</span> box = $box[<span class="hljs-number">0</span>];          <span class="hljs-comment">// 转成DOM对象</span>
box.innerHTML = <span class="hljs-string">"哈哈哈"</span>;   <span class="hljs-comment">// 使用DOM对象的方法</span></code></pre>
<p>方法二：<code>get(index)</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var $box = $('#box');       // jQ获取到的对象
var box = $box.get(0);      // 转成DOM对象
box.innerHTML = &quot;哈哈哈&quot;;   // 使用DOM对象的方法" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> $box = $(<span class="hljs-string">'#box'</span>);       <span class="hljs-comment">// jQ获取到的对象</span>
<span class="hljs-keyword">var</span> box = $box.get(<span class="hljs-number">0</span>);      <span class="hljs-comment">// 转成DOM对象</span>
box.innerHTML = <span class="hljs-string">"哈哈哈"</span>;   <span class="hljs-comment">// 使用DOM对象的方法</span></code></pre>
<p><strong>2、DOM对象转成jQ对象：</strong></p>
<blockquote>
<code>DOM</code>对象转成<code>jQ</code>对象的十分简单，只需要用<code>$()</code>把<code>DOM</code>对象包裹起来就是一个<code>jQ</code>对象了。转换之后就可以任意使用<code>jQ</code>的方法了。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var box = document.getElementById(&quot;#box&quot;);  // 获取的DOM对象
var $box = $(box);      // 转成jQ对象" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"#box"</span>);  <span class="hljs-comment">// 获取的DOM对象</span>
<span class="hljs-keyword">var</span> $box = $(box);      <span class="hljs-comment">// 转成jQ对象</span></code></pre>
<p><strong>示例代码：隔行变色</strong> <em>[ 02-jq对象与DOM对象转换-隔行变色.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    .even {
        background: #F2BBBB;
    }
    
    .odd {
        background: #A1D9FF;
    }
</style>

<!-- html 部分 -->
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
</ul>

<!-- js 部分 -->
<script>
    $(function() {
        var $lis = $(&quot;li&quot;); // jquery 对象
        for (var i = 0; i < $lis.length; i++) {
            if (i % 2 == 0) {
                // jq对象转为DOM对象  [index]方法
                $lis[i].className = 'even';
            } else {
                $lis[i].className = 'odd';
            }
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.even</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#F2BBBB</span>;
    }
    
    <span class="hljs-selector-class">.odd</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#A1D9FF</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>4<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>5<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>6<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> $lis = $(<span class="hljs-string">"li"</span>); <span class="hljs-comment">// jquery 对象</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; $lis.length; i++) {
            <span class="hljs-keyword">if</span> (i % <span class="hljs-number">2</span> == <span class="hljs-number">0</span>) {
                <span class="hljs-comment">// jq对象转为DOM对象  [index]方法</span>
                $lis[i].className = <span class="hljs-string">'even'</span>;
            } <span class="hljs-keyword">else</span> {
                $lis[i].className = <span class="hljs-string">'odd'</span>;
            }
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677117" src="https://static.alili.tech/img/remote/1460000013677117" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">2. jQuery 选择器</h2>
<blockquote>
<code>jQuery</code>选择器是<code>jQuery</code>为我们提供的一组方法，让我们更加方便的获取到页面中的元素。</blockquote>
<p><strong>注意：</strong> <code>jQuery</code>选择器返回的是<code>jQuery</code>对象。</p>
<h3 id="articleHeader9">2.1 基本选择器</h3>
<blockquote>我们都知道<code>css</code>选择器，这里的基本选择器跟<code>css</code>的是一模一样的。</blockquote>
<table>
<thead><tr>
<th>名称</th>
<th>用法</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>ID选择器</td>
<td>$('<code>#id</code>');</td>
<td>获取指定<code>ID</code>的元素</td>
</tr>
<tr>
<td>类选择器</td>
<td>$('<code>.class</code>');</td>
<td>获取所有同一类<code>class</code>的所有元素</td>
</tr>
<tr>
<td>标签选择器</td>
<td>$('<code>div</code>');</td>
<td>获取同一类标签的所有元素</td>
</tr>
<tr>
<td>并集选择器</td>
<td>$('<code>div,p,li</code>');</td>
<td>使用逗号分隔，只要符合条件之一就可</td>
</tr>
<tr>
<td>交集选择器</td>
<td>$('<code>div.redClass</code>');</td>
<td>获取<code>class</code>为<code>redClass</code>的<code>div</code>元素</td>
</tr>
</tbody>
</table>
<blockquote>
<code>.css('name','value')</code>是<code>jQ</code>的一个方法，可以为<code>jQ</code>对象设置样式。<code>name</code>是样式的名字，<code>value</code>是样式的值</blockquote>
<p>例如设置一个背景色：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(function(){
    $(&quot;#box&quot;).css('backgroundColor','cyan');
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    $(<span class="hljs-string">"#box"</span>).css(<span class="hljs-string">'backgroundColor'</span>,<span class="hljs-string">'cyan'</span>);
})</code></pre>
<p><strong>示例代码：基本选择器的应用</strong> <em>[ 03-jq选择器-基本选择器.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<div id=&quot;box&quot;>
    <div id=&quot;one&quot;>
        我是第ID为one的盒子
    </div>
    <div class=&quot;two&quot;>
        我是Class为two的盒子
    </div>
    <div class=&quot;three&quot;>我是Class为Three的盒子</div>
    <p>我是标签p</p>
    <span>我是标签span</span>
    <i>我是标签i</i>
</div>

<!-- js 部分 -->
<script>
$(function() {
    // id选择器
    $('#one').css('backgroundColor', '#E0FCFF');

    // 类选择器
    $('.two').css('backgroundColor', '#F2BBBB');

    // 标签选择器
    $('p').css('backgroundColor', '#C4C1E0');

    // 并集选择器
    $('span,i').css('backgroundColor', '#B9E1DC');

    // 交集选择器
    $('div.three').css('backgroundColor', '#D1F386');
});
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"one"</span>&gt;</span>
        我是第ID为one的盒子
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"two"</span>&gt;</span>
        我是Class为two的盒子
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"three"</span>&gt;</span>我是Class为Three的盒子<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我是标签p<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>我是标签span<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">i</span>&gt;</span>我是标签i<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
$(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// id选择器</span>
    $(<span class="hljs-string">'#one'</span>).css(<span class="hljs-string">'backgroundColor'</span>, <span class="hljs-string">'#E0FCFF'</span>);

    <span class="hljs-comment">// 类选择器</span>
    $(<span class="hljs-string">'.two'</span>).css(<span class="hljs-string">'backgroundColor'</span>, <span class="hljs-string">'#F2BBBB'</span>);

    <span class="hljs-comment">// 标签选择器</span>
    $(<span class="hljs-string">'p'</span>).css(<span class="hljs-string">'backgroundColor'</span>, <span class="hljs-string">'#C4C1E0'</span>);

    <span class="hljs-comment">// 并集选择器</span>
    $(<span class="hljs-string">'span,i'</span>).css(<span class="hljs-string">'backgroundColor'</span>, <span class="hljs-string">'#B9E1DC'</span>);

    <span class="hljs-comment">// 交集选择器</span>
    $(<span class="hljs-string">'div.three'</span>).css(<span class="hljs-string">'backgroundColor'</span>, <span class="hljs-string">'#D1F386'</span>);
});
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677118" src="https://static.alili.tech/img/remote/1460000013677118" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>涉及到的方法：</strong></p>
<table>
<thead><tr>
<th>名称</th>
<th>作用</th>
</tr></thead>
<tbody><tr>
<td><code>css('name','value')</code></td>
<td>添加样式，<code>name</code>是样式的名字，<code>value</code>是样式的值</td>
</tr></tbody>
</table>
<h3 id="articleHeader10">2.2 层级选择器</h3>
<table>
<thead><tr>
<th>名称</th>
<th>用法</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>子代选择器</td>
<td>$('<code>ul&gt;li</code>');</td>
<td>使用<code>&gt;</code>号，获取儿子层级的元素，注意，并不会获取孙子层级的元素</td>
</tr>
<tr>
<td>后代选择器</td>
<td>$('<code>ul li</code>');</td>
<td>使用空格，代表后代选择器，获取<code>ul</code>下的所有<code>li</code>元素，包括孙子等</td>
</tr>
</tbody>
</table>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<div id=&quot;box1&quot;>
    <p>我是box1的子代</p>
    <p>我是box1的子代</p>
    <div>
        <p>我是box1的后代</p>
        <p>我是box1的后代</p>
    </div>
</div>
<div id=&quot;box2&quot;>
    <p>我是box2的子代</p>
    <p>我是box2的子代</p>
    <div>
        <p>我是box2的后代</p>
        <p>我是box2的后代</p>
    </div>
</div>

<!-- js 部分 -->
<script>
    $(function() {
        // 子代选择器
        $('#box1>p').css('backgroundColor', '#E0FCFF');

        // 后代选择器
        $('#box2 p').css('backgroundColor', '#FEFEA4');
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box1"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我是box1的子代<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我是box1的子代<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我是box1的后代<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我是box1的后代<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box2"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我是box2的子代<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我是box2的子代<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我是box2的后代<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我是box2的后代<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 子代选择器</span>
        $(<span class="hljs-string">'#box1&gt;p'</span>).css(<span class="hljs-string">'backgroundColor'</span>, <span class="hljs-string">'#E0FCFF'</span>);

        <span class="hljs-comment">// 后代选择器</span>
        $(<span class="hljs-string">'#box2 p'</span>).css(<span class="hljs-string">'backgroundColor'</span>, <span class="hljs-string">'#FEFEA4'</span>);
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677119" src="https://static.alili.tech/img/remote/1460000013677119" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader11">2.3 过滤选择器</h3>
<blockquote>过滤选择器主要是通过特定的过滤规则来筛选出所需的<code>DOM</code>元素，过滤规则与<code>css</code>中的伪类选择器语法相同。即选择器都以一个冒号‘<code>:</code>’开头。按照不同的过滤规则，过滤选择器可以分为：<code>基本过滤</code>、<code>内容过滤</code>、<code>可见性过滤</code>、<code>属性过滤</code>、<code>子元素过滤</code>和<code>表单对象属性</code>过滤选择器。</blockquote>
<p><strong>1、基本过滤选择器：</strong></p>
<table>
<thead><tr>
<th>名称</th>
<th>用法</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td><code>:first</code></td>
<td>$('<code>div:first</code>')</td>
<td>选取所有<code>div</code>元素中，第一个<code>div</code>元素</td>
</tr>
<tr>
<td><code>:last</code></td>
<td>$('<code>div:last</code>')</td>
<td>选取所有<code>div</code>元素中，最后一个<code>div</code>元素</td>
</tr>
<tr>
<td><code>:eq(index)</code></td>
<td>$('<code>li:eq(2)</code>')</td>
<td>选取所有<code>li</code>元素中，索引号为<code>2</code>的元素，<code>index</code>从<code>0</code>开始</td>
</tr>
<tr>
<td><code>:even</code></td>
<td>$('<code>li:even</code>')</td>
<td>选取所有<code>li</code>元素中，索引号为<code>偶数</code>的元素</td>
</tr>
<tr>
<td><code>:odd</code></td>
<td>$('<code>li:odd</code>')</td>
<td>选取所有<code>li</code>元素中，索引号为<code>奇数</code>的元素</td>
</tr>
<tr>
<td><code>:not(selector)</code></td>
<td>$('<code>div:not(.box)</code>')</td>
<td>选取所有<code>div</code>元素中，不是<code>.box</code>的<code>div</code>元素</td>
</tr>
<tr>
<td><code>:gt(index)</code></td>
<td>$('<code>li:gt(1)</code>')</td>
<td>选取所有<code>li</code>元素中，索引号<code>大于1</code>的元素，<code>index</code>从<code>0</code>开始</td>
</tr>
<tr>
<td><code>:lt(index)</code></td>
<td>$('<code>li:lt(5)</code>')</td>
<td>选取所有<code>li</code>元素中，索引号<code>小于5</code>的元素，<code>index</code>从<code>0</code>开始</td>
</tr>
<tr>
<td><code>:header</code></td>
<td>$('<code>:header</code>')</td>
<td>选取所有<code>标题</code>元素,<code>&lt;h1&gt;</code>、<code>&lt;h2&gt;</code>、<code>&lt;h3&gt;</code>...</td>
</tr>
<tr>
<td><code>:animated</code></td>
<td>$('<code>div:animated</code>')</td>
<td>选取正在执行动画的<code>div</code>元素</td>
</tr>
<tr>
<td><code>:focus</code></td>
<td>$('<code>:focus</code>')</td>
<td>选取当前获取焦点的元素</td>
</tr>
</tbody>
</table>
<p><strong>示例代码：隔行变色</strong> <em>[ 05-jq选择器-过滤选择器.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分-->
<ul>
    <li>这是第1个li</li>
    <li>这是第2个li</li>
    <li>这是第3个li</li>
    <li>这是第4个li</li>
    <li>这是第5个li</li>
    <li>这是第6个li</li>
    <li>这是第7个li</li>
    <li>这是第8个li</li>
    <li>这是第9个li</li>
    <li>这是第10个li</li>
</ul>

<!-- js 部分 -->
<script>
    $(function() {
        // 偶数过滤选择器
        $('li:even').css('backgroundColor', '#E0FCFF');
        // 奇数过滤选择器
        $('li:odd').css('backgroundColor', '#FEFEA4');
        // first过滤选择器
        $('li:first').css('color', 'red');
        // last过滤选择器
        $('li:last').css('color', 'blue');
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>这是第1个li<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>这是第2个li<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>这是第3个li<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>这是第4个li<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>这是第5个li<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>这是第6个li<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>这是第7个li<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>这是第8个li<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>这是第9个li<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>这是第10个li<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 偶数过滤选择器</span>
        $(<span class="hljs-string">'li:even'</span>).css(<span class="hljs-string">'backgroundColor'</span>, <span class="hljs-string">'#E0FCFF'</span>);
        <span class="hljs-comment">// 奇数过滤选择器</span>
        $(<span class="hljs-string">'li:odd'</span>).css(<span class="hljs-string">'backgroundColor'</span>, <span class="hljs-string">'#FEFEA4'</span>);
        <span class="hljs-comment">// first过滤选择器</span>
        $(<span class="hljs-string">'li:first'</span>).css(<span class="hljs-string">'color'</span>, <span class="hljs-string">'red'</span>);
        <span class="hljs-comment">// last过滤选择器</span>
        $(<span class="hljs-string">'li:last'</span>).css(<span class="hljs-string">'color'</span>, <span class="hljs-string">'blue'</span>);
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677120" src="https://static.alili.tech/img/remote/1460000013677120" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>2、内容过滤选择器：</strong></p>
<table>
<thead><tr>
<th>名称</th>
<th>用法</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td><code>:contains(text)</code></td>
<td>$('<code>div:contains("我")</code>')</td>
<td>选取含有文本“<code>我</code>”的 所有<code>div</code>元素</td>
</tr>
<tr>
<td><code>:empty</code></td>
<td>$('<code>div:empty</code>')</td>
<td>选取不包含子元素或者文本的空<code>div</code>元素</td>
</tr>
<tr>
<td><code>:has(selector)</code></td>
<td>$('<code>div:has(p)</code>')</td>
<td>选取含有<code>p</code>元素的<code>div</code>元素</td>
</tr>
<tr>
<td><code>:parent</code></td>
<td>$('<code>div:parent</code>')</td>
<td>选取含有子元素或者文本的<code>div</code>元素</td>
</tr>
</tbody>
</table>
<p><strong>3、可见性过滤选择器：</strong></p>
<table>
<thead><tr>
<th>名称</th>
<th>用法</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td><code>:hidden</code></td>
<td>$('<code>:hidden</code>')</td>
<td>选取所有不可见的元素 <code>display:none</code>、<code>visibility:hidden</code>等</td>
</tr>
<tr>
<td><code>:visible</code></td>
<td>$('<code>div:visible</code>')</td>
<td>选取所有可见的<code>div</code>元素</td>
</tr>
</tbody>
</table>
<p><strong>4、属性过滤选择器：</strong></p>
<blockquote>属性过滤选择器是通过元素的属性来获取相应的元素。</blockquote>
<div class="table-wrap"><table>
<thead><tr>
<th>名称</th>
<th>用法</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td><code>[attribute]</code></td>
<td>$('<code>div[id]</code>')</td>
<td>选取拥有属性<code>id</code>的<code>div</code>元素</td>
</tr>
<tr>
<td><code>[attribute = value]</code></td>
<td>$('<code>div[title=test]</code>')</td>
<td>选取属性<code>title</code>为<code>"test"</code>的<code>div</code>元素</td>
</tr>
<tr>
<td><code>[attribute != value]</code></td>
<td>$('<code>div[title!=test]</code>')</td>
<td>选取属性<code>title</code>不为<code>"test"</code>的<code>div</code>元素(没有属性<code>title</code>的<code>div</code>也会被选取)</td>
</tr>
<tr>
<td><code>[attribute ^= value]</code></td>
<td>$('<code>div[title^=test]</code>')</td>
<td>选取属性<code>title</code>以<code>"test"</code>开始的<code>div</code>元素</td>
</tr>
<tr>
<td><code>[attribute $= value]</code></td>
<td>$('<code>div[title$=test]</code>')</td>
<td>选取属性<code>title</code>以<code>"test"</code>结束的<code>div</code>元素</td>
</tr>
<tr>
<td><code>[attribute *= value]</code></td>
<td>$('<code>div[title*=test]</code>')</td>
<td>选取属性<code>title</code>含有<code>"test"</code>的<code>div</code>元素</td>
</tr>
<tr>
<td>`[attribute</td>
<td>= value]`</td>
<td>$('`div[title</td>
<td>="en"]`')</td>
<td>选取属性<code>title</code>为<code>en</code>或以<code>en</code>为前缀的<code>div</code>元素</td>
</tr>
<tr>
<td><code>[attribute ~= value]</code></td>
<td>$('<code>div[title~="uk"]</code>')</td>
<td>选取属性<code>title</code>用空格分隔的值中包含字符<code>uk</code>的元素</td>
</tr>
<tr>
<td><code>[attribute][attribute2]</code></td>
<td>$('<code>div[id][titlr=test]</code>')</td>
<td>选取拥有属性<code>id</code>并且属性<code>title</code>为<code>test</code>的<code>div</code>元素</td>
</tr>
</tbody>
</table></div>
<p><strong>5、子元素过滤选择器：</strong></p>
<table>
<thead><tr>
<th>名称</th>
<th>用法</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td><code>:first-child</code></td>
<td>$('<code>ul li:first-child</code>')</td>
<td>选取每个<code>ul</code>中第一个<code>li</code>元素</td>
</tr>
<tr>
<td><code>:last-child</code></td>
<td>$('<code>ul li:last-child</code>')</td>
<td>选取每个<code>ul</code>中最后一个<code>li</code>元素</td>
</tr>
<tr>
<td>`:nth-child(index</td>
<td>even</td>
<td>odd)`</td>
<td>$('<code>ul li:nth-child(index)</code>')</td>
<td>选取每个<code>ul</code>中第<code>index</code>个<code>li</code>元素</td>
</tr>
<tr>
<td><code>:only-child</code></td>
<td>$('<code>ul li:only-child</code>')</td>
<td>选取每个<code>ul</code>中是唯一子元素的<code>li</code>元素</td>
</tr>
</tbody>
</table>
<p><code>nth-child()</code>选择器是很常用的子元素过滤选择器：</p>
<ul>
<li>
<code>:nth-child(even)</code>能选取每个父元素下的索引值是偶数的元素；</li>
<li>
<code>:nth-child(odd)</code>能选取每个父元素下的索引值是奇数的元素；</li>
<li>
<code>:nth-child(2)</code>能选取每个父元素下的索引值是<code>2</code>的元素；</li>
<li>
<code>:nth-child(3n)</code>能选取每个父元素下的索引值是<code>3</code>的倍数的元素；(n从1开始)</li>
<li>
<code>:nth-child(3n+1)</code>能选取每个父元素下的索引值是<code>3n+1</code>的倍数的元素；(n从1开始)</li>
</ul>
<p><strong>5、表单对象属性过滤选择器</strong></p>
<table>
<thead><tr>
<th>名称</th>
<th>用法</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td><code>:enabled</code></td>
<td>$('<code>#form:enabled</code>')</td>
<td>选取<code>id</code>名为“<code>form</code>”的表单内所有<code>可用</code>元素</td>
</tr>
<tr>
<td><code>:disabled</code></td>
<td>$('<code>#form:disabled</code>')</td>
<td>选取<code>id</code>名为“<code>form</code>”的表单内所有<code>不可用</code>元素</td>
</tr>
<tr>
<td><code>:checked</code></td>
<td>$('<code>input:checked</code>')</td>
<td>选取所有被选中的<code>input</code>元素(单选框、复选框)</td>
</tr>
<tr>
<td><code>:selected</code></td>
<td>$('<code>select option:selected</code>')</td>
<td>选取所有被选中的<code>选项</code>元素</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader12">2.4 表单选择器</h3>
<blockquote>为了能够更加方便的操作表单，jQuery还为我们添加了表单选择器。</blockquote>
<table>
<thead><tr>
<th>名称</th>
<th>用法</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td><code>:input</code></td>
<td>$('<code>:input</code>')</td>
<td>选取所有<code>input</code>、<code>textarea</code>、<code>select</code>、<code>button</code>元素</td>
</tr>
<tr>
<td><code>:text</code></td>
<td>$('<code>:text</code>')</td>
<td>选取所有的<code>单行文本框</code>
</td>
</tr>
<tr>
<td><code>:password</code></td>
<td>$('<code>:password</code>')</td>
<td>选取所有的<code>密码框</code>
</td>
</tr>
<tr>
<td><code>:radio</code></td>
<td>$('<code>:radio</code>')</td>
<td>选取所有的<code>单选框</code>
</td>
</tr>
<tr>
<td><code>:checkbox</code></td>
<td>$('<code>:checkbox</code>')</td>
<td>选取所有的<code>复选框</code>
</td>
</tr>
<tr>
<td><code>:submit</code></td>
<td>$('<code>:submit</code>')</td>
<td>选取所有的<code>提交按钮</code>
</td>
</tr>
<tr>
<td><code>:image</code></td>
<td>$('<code>:image</code>')</td>
<td>选取所有的<code>图像按钮</code>
</td>
</tr>
<tr>
<td><code>:button</code></td>
<td>$('<code>:button</code>')</td>
<td>选取所有的<code>按钮</code>
</td>
</tr>
<tr>
<td><code>:file</code></td>
<td>$('<code>:file</code>')</td>
<td>选取所有的<code>上传域</code>
</td>
</tr>
<tr>
<td><code>:hidden</code></td>
<td>$('<code>:hidden</code>')</td>
<td>选取所有的<code>不可见元素</code>
</td>
</tr>
</tbody>
</table>
<p><em>想要得到获取的个数直接使用：<code>.length</code>方法：</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('#form :input').length;  // 获得页面中表单元素的个数" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$(<span class="hljs-string">'#form :input'</span>).length;  <span class="hljs-comment">// 获得页面中表单元素的个数</span></code></pre>
<h3 id="articleHeader13">2.5 筛选选择器</h3>
<blockquote>筛选选择器的功能与过滤选择器有点类似，但是用法不一样，筛选选择器主要是方法。</blockquote>
<table>
<thead><tr>
<th>名称</th>
<th>用法</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td><code>children(selector)</code></td>
<td>$('ul').<code>children</code>('li')</td>
<td>相当于$(“ul&gt;li”)，子类选择器</td>
</tr>
<tr>
<td><code>find(selector)</code></td>
<td>$('ul').<code>find</code>('li');</td>
<td>相当于$(“ul li”),后代选择器</td>
</tr>
<tr>
<td><code>siblings(selector)</code></td>
<td>$('#first').<code>siblings</code>('li');</td>
<td>查找兄弟节点，不包括自己本身。</td>
</tr>
<tr>
<td><code>parent()</code></td>
<td>$('#first').<code>parent</code>();</td>
<td>查找父亲</td>
</tr>
<tr>
<td><code>eq(index)</code></td>
<td>$('li').<code>eq</code>(2);</td>
<td>相当于$(“li:eq(2)”),index从0开始</td>
</tr>
<tr>
<td><code>next()</code></td>
<td>$('li').<code>next</code>()</td>
<td>找下一个兄弟</td>
</tr>
<tr>
<td><code>prev()</code></td>
<td>$('li').<code>prev</code>()</td>
<td>找上一次兄弟</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader14">2.6 几个小案例</h3>
<p><strong>1、简单版手风琴</strong> <em>[ 06-jq选择器案例-简单版手风琴.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    * {
        padding: 0;
        margin: 0;
    }
    
    ul {
        list-style-type: none;
        margin: 100px auto;
    }
    
    .parentWrap {
        width: 250px;
        text-align: center;
    }
    
    .menuGroup {
        border: 1px solid #8FBAF3;
        background-color: #BDF1F6;
        margin-top: -1px;
    }
    
    .groupTitle {
        display: block;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        border-bottom: 1px solid #77628C;
        cursor: pointer;
    }
    
    .menuGroup>div {
        height: 200px;
        background-color: #F2FCFC;
        display: none;
    }
</style>

<!-- html 部分 -->
<ul class=&quot;parentWrap&quot;>
    <li class=&quot;menuGroup&quot;>
        <span class=&quot;groupTitle&quot;>标题1</span>
        <div>我是弹出来的div1</div>
    </li>
    <li class=&quot;menuGroup&quot;>
        <span class=&quot;groupTitle&quot;>标题2</span>
        <div>我是弹出来的div2</div>
    </li>
    <li class=&quot;menuGroup&quot;>
        <span class=&quot;groupTitle&quot;>标题3</span>
        <div>我是弹出来的div3</div>
    </li>
    <li class=&quot;menuGroup&quot;>
        <span class=&quot;groupTitle&quot;>标题4</span>
        <div>我是弹出来的div4</div>
    </li>
</ul>

<!-- js 部分 -->
<script>
    $(function() {
        $('.groupTitle').click(function() {
            // 当前点击的span的兄弟元素显示出来，它的父级元素的兄弟元素的子元素div隐藏
            $(this).next().show().parent().siblings().children('div').hide();
        });
    });
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    }
    
    <span class="hljs-selector-tag">ul</span> {
        <span class="hljs-attribute">list-style-type</span>: none;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
    }
    
    <span class="hljs-selector-class">.parentWrap</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">250px</span>;
        <span class="hljs-attribute">text-align</span>: center;
    }
    
    <span class="hljs-selector-class">.menuGroup</span> {
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#8FBAF3</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#BDF1F6</span>;
        <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">1px</span>;
    }
    
    <span class="hljs-selector-class">.groupTitle</span> {
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
        <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#77628C</span>;
        <span class="hljs-attribute">cursor</span>: pointer;
    }
    
    <span class="hljs-selector-class">.menuGroup</span>&gt;<span class="hljs-selector-tag">div</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#F2FCFC</span>;
        <span class="hljs-attribute">display</span>: none;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parentWrap"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"menuGroup"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"groupTitle"</span>&gt;</span>标题1<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>我是弹出来的div1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"menuGroup"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"groupTitle"</span>&gt;</span>标题2<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>我是弹出来的div2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"menuGroup"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"groupTitle"</span>&gt;</span>标题3<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>我是弹出来的div3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"menuGroup"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"groupTitle"</span>&gt;</span>标题4<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>我是弹出来的div4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-string">'.groupTitle'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 当前点击的span的兄弟元素显示出来，它的父级元素的兄弟元素的子元素div隐藏</span>
            $(<span class="hljs-keyword">this</span>).next().show().parent().siblings().children(<span class="hljs-string">'div'</span>).hide();
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p><strong>涉及到的方法：</strong></p>
<table>
<thead><tr>
<th>方法</th>
<th>作用</th>
</tr></thead>
<tbody>
<tr>
<td><code>show()</code></td>
<td>显示 隐藏的匹配元素</td>
</tr>
<tr>
<td><code>hide()</code></td>
<td>隐藏 显示的匹配元素</td>
</tr>
</tbody>
</table>
<p><strong>注意：</strong> <code>this</code>指的是当前的<code>DOM</code>对象，<code>$(this)</code>，将<code>this</code>转化为<code>jQ</code>对象</p>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677121?w=263&amp;h=347" src="https://static.alili.tech/img/remote/1460000013677121?w=263&amp;h=347" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>2、下拉菜单栏案例</strong> <em>[ 07-jq选择器案例-下拉菜单栏.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
    }
    
    ul {
        list-style: none;
    }
    
    .wrap {
        width: 350px;
        height: 30px;
        margin: 100px auto 0;
        padding-left: 30px;
        background: #B9E1DC;
        border-radius: 5px;
    }
    
    .wrap li {
        background: #87DFD6;
    }
    
    .wrap>ul>li {
        float: left;
        margin-right: 10px;
        position: relative;
    }
    
    .wrap a {
        display: block;
        height: 30px;
        width: 100px;
        text-decoration: none;
        color: #000;
        line-height: 30px;
        text-align: center;
    }
    
    .wrap li ul {
        position: absolute;
        top: 30px;
        display: none;
    }
</style>

<!-- html 部分 -->
<div class=&quot;wrap&quot;>
    <ul>
        <li>
            <a href=&quot;javascript:void(0);&quot;>一级菜单1</a>
            <ul class=&quot;ul&quot;>
                <li><a href=&quot;javascript:void(0);&quot;>二级菜单11</a></li>
                <li><a href=&quot;javascript:void(0);&quot;>二级菜单12</a></li>
                <li><a href=&quot;javascript:void(0);&quot;>二级菜单13</a></li>
            </ul>
        </li>
        <li>
            <a href=&quot;javascript:void(0);&quot;>一级菜单2</a>
            <ul>
                <li><a href=&quot;javascript:void(0);&quot;>二级菜单21</a></li>
                <li><a href=&quot;javascript:void(0);&quot;>二级菜单22</a></li>
                <li><a href=&quot;javascript:void(0);&quot;>二级菜单23</a></li>
            </ul>
        </li>
        <li>
            <a href=&quot;javascript:void(0);&quot;>一级菜单3</a>
            <ul>
                <li><a href=&quot;javascript:void(0);&quot;>二级菜单31</a></li>
                <li><a href=&quot;javascript:void(0);&quot;>二级菜单32</a></li>
                <li><a href=&quot;javascript:void(0);&quot;>二级菜单33</a></li>
            </ul>
        </li>
    </ul>
</div>

<!-- js 部分 -->
<script>
    $(function() {
        $('.wrap>ul>li').mouseenter(function() {
            $(this).children('ul').show()
        });
        $('.wrap>ul>li').mouseleave(function() {
            $(this).children('ul').hide()
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    }
    
    <span class="hljs-selector-tag">ul</span> {
        <span class="hljs-attribute">list-style</span>: none;
    }
    
    <span class="hljs-selector-class">.wrap</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">350px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#B9E1DC</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
    }
    
    <span class="hljs-selector-class">.wrap</span> <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#87DFD6</span>;
    }
    
    <span class="hljs-selector-class">.wrap</span>&gt;<span class="hljs-selector-tag">ul</span>&gt;<span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">float</span>: left;
        <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">position</span>: relative;
    }
    
    <span class="hljs-selector-class">.wrap</span> <span class="hljs-selector-tag">a</span> {
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">text-decoration</span>: none;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#000</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">text-align</span>: center;
    }
    
    <span class="hljs-selector-class">.wrap</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">ul</span> {
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">display</span>: none;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span>&gt;</span>一级菜单1<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ul"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span>&gt;</span>二级菜单11<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span>&gt;</span>二级菜单12<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span>&gt;</span>二级菜单13<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span>&gt;</span>一级菜单2<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span>&gt;</span>二级菜单21<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span>&gt;</span>二级菜单22<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span>&gt;</span>二级菜单23<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span>&gt;</span>一级菜单3<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span>&gt;</span>二级菜单31<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span>&gt;</span>二级菜单32<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span>&gt;</span>二级菜单33<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-string">'.wrap&gt;ul&gt;li'</span>).mouseenter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-keyword">this</span>).children(<span class="hljs-string">'ul'</span>).show()
        });
        $(<span class="hljs-string">'.wrap&gt;ul&gt;li'</span>).mouseleave(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-keyword">this</span>).children(<span class="hljs-string">'ul'</span>).hide()
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>涉及到的方法：</strong></p>
<table>
<thead><tr>
<th>方法</th>
<th>作用</th>
</tr></thead>
<tbody>
<tr>
<td><code>mouseleave()</code></td>
<td>鼠标离开 相当于<code>DOM</code>中的<code>onmouseout</code>
</td>
</tr>
<tr>
<td><code>mouseenter()</code></td>
<td>鼠标进入 相当于<code>DOM</code>中的<code>onmouseover</code>
</td>
</tr>
</tbody>
</table>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677122?w=393&amp;h=162" src="https://static.alili.tech/img/remote/1460000013677122?w=393&amp;h=162" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>3、高亮显示图片</strong> <em>[ 08-jq选择器案例-高亮显示.html ]</em></p>
<blockquote>在案例之前，跟大家说一个东西，在<code>jQ</code>中，不需要<code>for</code>循环遍历，因为<code>jQ</code>自己会进行遍历，这在<code>jQ</code>里面就叫<code>隐式迭代</code>。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <style>
        * {
            margin: 0;
            padding: 0;
        }
        
        ul {
            list-style: none;
        }
        
        body {
            background: #000;
        }
        
        .wrap {
            margin: 100px auto 0;
            width: 630px;
            height: 394px;
            padding: 10px 0 0 10px;
            background: #000;
            overflow: hidden;
            border: 1px solid #fff;
        }
        
        .wrap li {
            float: left;
            margin: 0 10px 10px 0;
        }
        
        .wrap img {
            display: block;
            border: 0;
        }
    </style>

<!-- html 部分 -->
<div class=&quot;wrap&quot;>
    <ul>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/高亮显示/01.jpg&quot; alt=&quot;&quot; /></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/高亮显示/02.jpg&quot; alt=&quot;&quot; /></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/高亮显示/03.jpg&quot; alt=&quot;&quot; /></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/高亮显示/04.jpg&quot; alt=&quot;&quot; /></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/高亮显示/05.jpg&quot; alt=&quot;&quot; /></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/高亮显示/06.jpg&quot; alt=&quot;&quot; /></a>
        </li>
    </ul>
</div>

<!-- js 部分 -->
<script>
    $(function() {
        // 给li注册鼠标经过事件
        $('.wrap li').mouseenter(function() {
            // 当前的li不透明度为1，它其他的兄弟元素不透明度为0.4
            $(this).css('opacity', '1').siblings().css('opacity', '0.4');
        });
        
        // 给大盒子注册鼠标离开事件
        $('.wrap').mouseleave(function() {
            // 找到所有的li 它们的不透明度为1
            $(this).find('li').css('opacity', '1');
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        * {
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        }
        
        <span class="hljs-selector-tag">ul</span> {
            <span class="hljs-attribute">list-style</span>: none;
        }
        
        <span class="hljs-selector-tag">body</span> {
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#000</span>;
        }
        
        <span class="hljs-selector-class">.wrap</span> {
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto <span class="hljs-number">0</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">630px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">394px</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#000</span>;
            <span class="hljs-attribute">overflow</span>: hidden;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#fff</span>;
        }
        
        <span class="hljs-selector-class">.wrap</span> <span class="hljs-selector-tag">li</span> {
            <span class="hljs-attribute">float</span>: left;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span> <span class="hljs-number">10px</span> <span class="hljs-number">0</span>;
        }
        
        <span class="hljs-selector-class">.wrap</span> <span class="hljs-selector-tag">img</span> {
            <span class="hljs-attribute">display</span>: block;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">0</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/高亮显示/01.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/高亮显示/02.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/高亮显示/03.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/高亮显示/04.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/高亮显示/05.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/高亮显示/06.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 给li注册鼠标经过事件</span>
        $(<span class="hljs-string">'.wrap li'</span>).mouseenter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 当前的li不透明度为1，它其他的兄弟元素不透明度为0.4</span>
            $(<span class="hljs-keyword">this</span>).css(<span class="hljs-string">'opacity'</span>, <span class="hljs-string">'1'</span>).siblings().css(<span class="hljs-string">'opacity'</span>, <span class="hljs-string">'0.4'</span>);
        });
        
        <span class="hljs-comment">// 给大盒子注册鼠标离开事件</span>
        $(<span class="hljs-string">'.wrap'</span>).mouseleave(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 找到所有的li 它们的不透明度为1</span>
            $(<span class="hljs-keyword">this</span>).find(<span class="hljs-string">'li'</span>).css(<span class="hljs-string">'opacity'</span>, <span class="hljs-string">'1'</span>);
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>涉及到的方法：</strong></p>
<table>
<thead><tr>
<th>方法</th>
<th>作用</th>
</tr></thead>
<tbody><tr>
<td><code>find()</code></td>
<td>查找元素，如：<code>$('.nav').find('li')</code> 找到<code>.nav</code>下面所有的<code>li</code>。</td>
</tr></tbody>
</table>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677123?w=470&amp;h=338" src="https://static.alili.tech/img/remote/1460000013677123?w=470&amp;h=338" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>4、淘宝广告案例</strong> <em>[ 09-jq选择器案例-淘宝广告案例.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .wrap {
        width: 298px;
        height: 248px;
        margin: 100px auto 0;
        border: 1px solid pink;
        overflow: hidden;
    }
    .left,
    .center,
    .right {
        float: left;
        cursor: pointer;
    }
    .left li,
    .right li {
        font-size: 12px;
        display: block;
        width: 48px;
        height: 27px;
        border-bottom: 1px solid pink;
        line-height: 27px;
        text-align: center;
        color: black;
        background: url(../image/淘宝广告/lili.jpg) repeat-x;
    }
    .left li:hover,
    .right li:hover {
        background-image: url(../image/淘宝广告/abg.gif);
    }
    .center {
        border-left: 1px solid pink;
        border-right: 1px solid pink;
    }
</style>

<!-- html 部分 -->
<div class=&quot;wrap&quot;>
    <ul class=&quot;left&quot;>
        <li>女靴</li>
        <li>雪地靴</li>
        <li>冬裙</li>
        <li>呢大衣</li>
        <li>毛衣</li>
        <li>棉服</li>
        <li>女裤</li>
        <li>羽绒服</li>
        <li>牛仔裤</li>
    </ul>

    <ul class=&quot;center&quot;>
        <li><img src=&quot;../image/淘宝广告/女靴.jpg&quot; width=&quot;200&quot; height=&quot;250&quot; alt=&quot;&quot;></li>
        <li><img src=&quot;../image/淘宝广告/雪地靴.jpg&quot; width=&quot;200&quot; height=&quot;250&quot; alt=&quot;&quot;></li>
        <li><img src=&quot;../image/淘宝广告/冬裙.jpg&quot; width=&quot;200&quot; height=&quot;250&quot; alt=&quot;&quot;></li>
        <li><img src=&quot;../image/淘宝广告/呢大衣.jpg&quot; width=&quot;200&quot; height=&quot;250&quot; alt=&quot;&quot;></li>
        <li><img src=&quot;../image/淘宝广告/毛衣.jpg&quot; width=&quot;200&quot; height=&quot;250&quot; alt=&quot;&quot;></li>
        <li><img src=&quot;../image/淘宝广告/棉服.jpg&quot; width=&quot;200&quot; height=&quot;250&quot; alt=&quot;&quot;></li>
        <li><img src=&quot;../image/淘宝广告/女裤.jpg&quot; width=&quot;200&quot; height=&quot;250&quot; alt=&quot;&quot;></li>
        <li><img src=&quot;../image/淘宝广告/羽绒服.jpg&quot; width=&quot;200&quot; height=&quot;250&quot; alt=&quot;&quot;></li>
        <li><img src=&quot;../image/淘宝广告/牛仔裤.jpg&quot; width=&quot;200&quot; height=&quot;250&quot; alt=&quot;&quot;></li>
        <li><img src=&quot;../image/淘宝广告/女包.jpg&quot; width=&quot;200&quot; height=&quot;250&quot; alt=&quot;&quot;></li>
        <li><img src=&quot;../image/淘宝广告/男靴.jpg&quot; width=&quot;200&quot; height=&quot;250&quot; alt=&quot;&quot;></li>
        <li><img src=&quot;../image/淘宝广告/登山鞋.jpg&quot; width=&quot;200&quot; height=&quot;250&quot; alt=&quot;&quot;></li>
        <li><img src=&quot;../image/淘宝广告/皮带.jpg&quot; width=&quot;200&quot; height=&quot;250&quot; alt=&quot;&quot;></li>
        <li><img src=&quot;../image/淘宝广告/围巾.jpg&quot; width=&quot;200&quot; height=&quot;250&quot; alt=&quot;&quot;></li>
        <li><img src=&quot;../image/淘宝广告/皮衣.jpg&quot; width=&quot;200&quot; height=&quot;250&quot; alt=&quot;&quot;></li>
        <li><img src=&quot;../image/淘宝广告/男毛衣.jpg&quot; width=&quot;200&quot; height=&quot;250&quot; alt=&quot;&quot;></li>
        <li><img src=&quot;../image/淘宝广告/男棉服.jpg&quot; width=&quot;200&quot; height=&quot;250&quot; alt=&quot;&quot;></li>
        <li><img src=&quot;../image/淘宝广告/男包.jpg&quot; width=&quot;200&quot; height=&quot;250&quot; alt=&quot;&quot;></li>
    </ul>


    <ul class=&quot;right&quot;>
        <li>女包</li>
        <li>男靴</li>
        <li>登山鞋</li>
        <li>皮带</li>
        <li>围巾</li>
        <li>皮衣</li>
        <li>男毛衣</li>
        <li>男棉服</li>
        <li>男包</li>
    </ul>
</div>

<!-- js 部分 -->
<script>
    $(function() {
        // 鼠标经过左半边li的时候
        $('.left>li').mouseenter(function() {
            // 获取当前经过的li的下标  index()：获取当前下标
            var index = $(this).index();
            // 让center下对应的li图片显示
            // eq(); 第几个 
            // 让center下的li第index个显示，其余的兄弟元素隐藏
            $('.center>li').eq(index).show()
                .siblings().hide();
        });

        // 鼠标经过右半边的时候
        $('.right>li').mouseenter(function() {
            // 获取当前经过的li的下标,注意此时的center里面对应的li还要加上left的长度
            var index = $(this).index() + $('.left>li').length;
            // 让center下的li第index个显示，其余的兄弟元素隐藏
            $('.center>li').eq(index).show()
                .siblings().hide();
        });

    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">list-style</span>: none;
    }
    <span class="hljs-selector-class">.wrap</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">298px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">248px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto <span class="hljs-number">0</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid pink;
        <span class="hljs-attribute">overflow</span>: hidden;
    }
    <span class="hljs-selector-class">.left</span>,
    <span class="hljs-selector-class">.center</span>,
    <span class="hljs-selector-class">.right</span> {
        <span class="hljs-attribute">float</span>: left;
        <span class="hljs-attribute">cursor</span>: pointer;
    }
    <span class="hljs-selector-class">.left</span> <span class="hljs-selector-tag">li</span>,
    <span class="hljs-selector-class">.right</span> <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">48px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">27px</span>;
        <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1px</span> solid pink;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">27px</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">color</span>: black;
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(../image/淘宝广告/lili.jpg) repeat-x;
    }
    <span class="hljs-selector-class">.left</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span>,
    <span class="hljs-selector-class">.right</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span> {
        <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(../image/淘宝广告/abg.gif);
    }
    <span class="hljs-selector-class">.center</span> {
        <span class="hljs-attribute">border-left</span>: <span class="hljs-number">1px</span> solid pink;
        <span class="hljs-attribute">border-right</span>: <span class="hljs-number">1px</span> solid pink;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>女靴<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>雪地靴<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>冬裙<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>呢大衣<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>毛衣<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>棉服<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>女裤<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>羽绒服<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>牛仔裤<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"center"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/淘宝广告/女靴.jpg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"250"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/淘宝广告/雪地靴.jpg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"250"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/淘宝广告/冬裙.jpg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"250"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/淘宝广告/呢大衣.jpg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"250"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/淘宝广告/毛衣.jpg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"250"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/淘宝广告/棉服.jpg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"250"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/淘宝广告/女裤.jpg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"250"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/淘宝广告/羽绒服.jpg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"250"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/淘宝广告/牛仔裤.jpg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"250"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/淘宝广告/女包.jpg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"250"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/淘宝广告/男靴.jpg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"250"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/淘宝广告/登山鞋.jpg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"250"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/淘宝广告/皮带.jpg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"250"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/淘宝广告/围巾.jpg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"250"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/淘宝广告/皮衣.jpg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"250"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/淘宝广告/男毛衣.jpg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"250"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/淘宝广告/男棉服.jpg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"250"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/淘宝广告/男包.jpg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"250"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>


    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>女包<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>男靴<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>登山鞋<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>皮带<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>围巾<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>皮衣<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>男毛衣<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>男棉服<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>男包<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 鼠标经过左半边li的时候</span>
        $(<span class="hljs-string">'.left&gt;li'</span>).mouseenter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 获取当前经过的li的下标  index()：获取当前下标</span>
            <span class="hljs-keyword">var</span> index = $(<span class="hljs-keyword">this</span>).index();
            <span class="hljs-comment">// 让center下对应的li图片显示</span>
            <span class="hljs-comment">// eq(); 第几个 </span>
            <span class="hljs-comment">// 让center下的li第index个显示，其余的兄弟元素隐藏</span>
            $(<span class="hljs-string">'.center&gt;li'</span>).eq(index).show()
                .siblings().hide();
        });

        <span class="hljs-comment">// 鼠标经过右半边的时候</span>
        $(<span class="hljs-string">'.right&gt;li'</span>).mouseenter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 获取当前经过的li的下标,注意此时的center里面对应的li还要加上left的长度</span>
            <span class="hljs-keyword">var</span> index = $(<span class="hljs-keyword">this</span>).index() + $(<span class="hljs-string">'.left&gt;li'</span>).length;
            <span class="hljs-comment">// 让center下的li第index个显示，其余的兄弟元素隐藏</span>
            $(<span class="hljs-string">'.center&gt;li'</span>).eq(index).show()
                .siblings().hide();
        });

    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>涉及到的方法：</strong></p>
<table>
<thead><tr>
<th>方法</th>
<th>作用</th>
</tr></thead>
<tbody>
<tr>
<td><code>index()</code></td>
<td>获取的是当前元素在他兄弟元素里面的下标。</td>
</tr>
<tr>
<td><code>eq()</code></td>
<td>选择第几个元素，如：<code>$('li').eq(3).show()</code>让第三个<code>li</code>显示。</td>
</tr>
</tbody>
</table>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677124?w=366&amp;h=306" src="https://static.alili.tech/img/remote/1460000013677124?w=366&amp;h=306" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>5、index()方法详解：</strong> <em>[ 10-jq选择器案例-index方法解读.html ]</em></p>
<blockquote>获取的是当前元素在他兄弟元素里面的下标。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h2>我是wrap1</h2>
<ul class=&quot;wrap1&quot;>
    <li><a href=&quot;#&quot;>这是内容</a></li>
    <li><a href=&quot;#&quot;>这是内容</a></li>
    <li><a href=&quot;#&quot;>这是内容</a></li>
    <li><a href=&quot;#&quot;>这是内容</a></li>
    <li><a href=&quot;#&quot;>这是内容</a></li>
</ul>
<h2>我是wrap2</h2>
<ul class=&quot;wrap2&quot;>
    <li><a href=&quot;#&quot;>这是内容</a></li>
    <li><a href=&quot;#&quot;>这是内容</a></li>
    <li><a href=&quot;#&quot;>这是内容</a></li>
    <li><a href=&quot;#&quot;>这是内容</a></li>
    <li><a href=&quot;#&quot;>这是内容</a></li>
</ul>

<script src=&quot;../js/jquery-3.2.1.min.js&quot;></script>
<script>
    $(function() {
        //index() 获取的是当前元素在他兄弟元素里面的下标
        $('.wrap1>li').click(function() {
            console.log($(this).index());
        });

        $('.wrap2>li>a').click(function() {
            console.log($(this).index());
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>我是wrap1<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap1"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>这是内容<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>这是内容<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>这是内容<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>这是内容<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>这是内容<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>我是wrap2<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap2"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>这是内容<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>这是内容<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>这是内容<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>这是内容<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>这是内容<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../js/jquery-3.2.1.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//index() 获取的是当前元素在他兄弟元素里面的下标</span>
        $(<span class="hljs-string">'.wrap1&gt;li'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log($(<span class="hljs-keyword">this</span>).index());
        });

        $(<span class="hljs-string">'.wrap2&gt;li&gt;a'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log($(<span class="hljs-keyword">this</span>).index());
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><em>我们可以看到，在<code>wrap1</code>里面的时候，<code>li</code>点击的时候，获取的是它在兄弟元素里面的下标。在<code>wrap2</code>里面的时候，我们点击的是<code>a</code>标签，此时<code>a</code>标签是没有兄弟元素的，所以，不管点击哪一个都是返回‘<code>0</code>’。</em></p>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677125?w=413&amp;h=362" src="https://static.alili.tech/img/remote/1460000013677125?w=413&amp;h=362" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader15">3. jQuery 节点操作</h2>
<h3 id="articleHeader16">3.1 查找节点</h3>
<blockquote>查找节点非常容易，只要结合前面选择器来完成。</blockquote>
<p><strong>1、查找元素节点</strong> <em>[ 11-jqDOM操作-查找元素节点.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<ul>
    <li>北京</li>
    <li>上海</li>
    <li>广州</li>
    <li>天津</li>
    <li>重庆</li>
</ul>

<!-- js 部分 -->
<script>
    $(function() {
        var $li = $('ul > li:eq(2)');   // 获取ul下的第二个li节点
        var li_text = $li.text();       // 获取第2个li元素节点的文本内容
        alert(li_text);
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>北京<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>上海<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>广州<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>重庆<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> $li = $(<span class="hljs-string">'ul &gt; li:eq(2)'</span>);   <span class="hljs-comment">// 获取ul下的第二个li节点</span>
        <span class="hljs-keyword">var</span> li_text = $li.text();       <span class="hljs-comment">// 获取第2个li元素节点的文本内容</span>
        alert(li_text);
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>2、查找属性节点</strong> <em>[ 12-jqDOM操作-查找属性节点.html ]</em></p>
<blockquote>使用<code>jQ</code>选择器，查找到需要的元素后，可以使用<code>attr()</code>方法来获取它的各种属性的值。<code>attr()</code>的参数可以是一个，也可以是两个，参数是一个的时候，则是要查询的属性的名字。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p title=&quot;这是段落&quot;>这是一句意味深长的话</p>
<script>
    $(function() {
        var $p = $('p');                // 获取p节点
        var p_tit = $p.attr('title');   // 获取p元素节点的title属性
        alert(p_tit);
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"这是段落"</span>&gt;</span>这是一句意味深长的话<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> $p = $(<span class="hljs-string">'p'</span>);                <span class="hljs-comment">// 获取p节点</span>
        <span class="hljs-keyword">var</span> p_tit = $p.attr(<span class="hljs-string">'title'</span>);   <span class="hljs-comment">// 获取p元素节点的title属性</span>
        alert(p_tit);
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader17">3.2 创建节点</h3>
<blockquote>我们可以轻松的找到文档中某个特定的元素节点，并且可以通过<code>attr()</code>方法来获取元素各种各样的属性的值。但是真正的<code>DOM</code>操作并非这么简单。在<code>DOM</code>操作中，常常需要动态创建<code>HTML</code>内容，使文档在浏览器里的呈现效果发生变化，并且达到人机交互的目的。 <em>[ 13-jqDOM操作-创建节点.html ]</em>
</blockquote>
<p><strong>1、创建元素节点</strong></p>
<blockquote>创建元素节点很简单，直接使用  <code>$(html)</code>，<code>html</code>就是需要添加的元素。<code>$(html)</code>方法会根据传入的<code>HTML</code>标记字符串，创建一个<code>DOM</code>对象，并将这个<code>DOM</code>对象包装成一个<code>jQuery</code>对象后返回。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(function() {
    // 创建一个li元素
    var $li = $('<li></li>');
    // 将创建的li添加到ul中
    $('ul').append($li);    // append 添加节点 下一节讲
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 创建一个li元素</span>
    <span class="hljs-keyword">var</span> $li = $(<span class="hljs-string">'&lt;li&gt;&lt;/li&gt;'</span>);
    <span class="hljs-comment">// 将创建的li添加到ul中</span>
    $(<span class="hljs-string">'ul'</span>).append($li);    <span class="hljs-comment">// append 添加节点 下一节讲</span>
});</code></pre>
<p><em>因为创建的只是一个元素节点，所以里面没有内容只会看到<code>li</code>的一个标题点：</em></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677126?w=281&amp;h=98" src="https://static.alili.tech/img/remote/1460000013677126?w=281&amp;h=98" alt="image-5.jpg" title="image-5.jpg" style="cursor: pointer;"></span></p>
<p><strong>2、创建文本节点</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var $li_1 = $('<li>北京</li>');  // 创建一个li元素，包括元素节点 文本节点
                                // &quot;北京&quot;就是文本节点
var $li_2 = $('<li>上海</li>');
$('ul').append($li_1);
$('ul').append($li_2); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> $li_1 = $(<span class="hljs-string">'&lt;li&gt;北京&lt;/li&gt;'</span>);  <span class="hljs-comment">// 创建一个li元素，包括元素节点 文本节点</span>
                                <span class="hljs-comment">// "北京"就是文本节点</span>
<span class="hljs-keyword">var</span> $li_2 = $(<span class="hljs-string">'&lt;li&gt;上海&lt;/li&gt;'</span>);
$(<span class="hljs-string">'ul'</span>).append($li_1);
$(<span class="hljs-string">'ul'</span>).append($li_2); </code></pre>
<p><em>创建文本节点就是在创建元素节点时，直接把文本内容写出来：</em></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677127" src="https://static.alili.tech/img/remote/1460000013677127" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>3、创建属性节点</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var $li_3 = $('<li title=&quot;城市&quot;>深圳</li>');  // 创建一个li元素，包括元素、文本、属性节点
                                             // title='城市' 就是属性节点
$('ul').append($li_3);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> $li_3 = $(<span class="hljs-string">'&lt;li title="城市"&gt;深圳&lt;/li&gt;'</span>);  <span class="hljs-comment">// 创建一个li元素，包括元素、文本、属性节点</span>
                                             <span class="hljs-comment">// title='城市' 就是属性节点</span>
$(<span class="hljs-string">'ul'</span>).append($li_3);</code></pre>
<p><em>创建属性节点的时候，与创建文本节点类似，直接将属性写在标签里：</em></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677128" src="https://static.alili.tech/img/remote/1460000013677128" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader18">3.3 添加节点</h3>
<blockquote>上面我们知道了如何动态创建一个元素，但是没有实际用处，所以还需要将新创建的元素添加到文档中。</blockquote>
<p><strong>添加节点的方法：</strong></p>
<table>
<thead><tr>
<th>名称</th>
<th>用法</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td><code>append()</code></td>
<td><code>$('ul').append('&lt;li&gt;上海1&lt;/li&gt;')</code></td>
<td>在<code>ul</code>子元素的最后面依次添加<code>li</code>
</td>
</tr>
<tr>
<td><code>appendTo()</code></td>
<td><code>$('&lt;li&gt;上海2&lt;/li&gt;').appendTo('ul')</code></td>
<td>将<code>li</code>添加到<code>ul</code>子元素的最后面，参数与<code>append</code>正好颠倒过来</td>
</tr>
<tr>
<td><code>prepend()</code></td>
<td><code>$('ul').prepend('&lt;li&gt;北京1&lt;/li&gt;')</code></td>
<td>在<code>ul</code>子元素的最前面依次添加<code>li</code>
</td>
</tr>
<tr>
<td><code>prependTo()</code></td>
<td><code>$('&lt;li&gt;北京2&lt;/li&gt;').prependTo('ul')</code></td>
<td>将<code>li</code>添加到<code>ul</code>子元素的最前面，参数与<code>prepend</code>正好颠倒过来</td>
</tr>
<tr>
<td><code>after()</code></td>
<td><code>$('ul').after('&lt;h2&gt;哈哈哈1&lt;/h2&gt;')</code></td>
<td>在<code>ul</code>的后面添加<code>h2</code>(兄弟元素)</td>
</tr>
<tr>
<td><code>insertAfter()</code></td>
<td><code>$('&lt;h2&gt;哈哈哈2&lt;/h2&gt;').insertAfter('ul')</code></td>
<td>将<code>h2</code>添加到<code>ul</code>的后面，参数与<code>after</code>正好颠倒过来</td>
</tr>
<tr>
<td><code>before()</code></td>
<td><code>$('ul').before('&lt;h2&gt;城市1&lt;/h2&gt;')</code></td>
<td>在<code>ul</code>的前面添加<code>h2</code>(兄弟元素)</td>
</tr>
<tr>
<td><code>insertBefore()</code></td>
<td><code>$('&lt;h2&gt;城市2&lt;/h2&gt;').insertBefore('ul')</code></td>
<td>将<code>h2</code>添加到<code>ul</code>的前面，参数与<code>before</code>正好颠倒过来</td>
</tr>
</tbody>
</table>
<p><strong>示例代码：</strong> <em>[ 14-jqDOM操作-添加节点.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分-->
<ul>
    <li style='color:red;'>我是本来就有的</li>
</ul>
<p>这是ul外面的p标签</p>

<!-- js 部分 -->
<script>
    $(function() {
        // append  在匹配元素的子元素最后面添加
        $('ul').append('<li>我是append创建出来的</li>');
        $('<li>我是appendTo创建出来的</li>').appendTo('ul'); // 用法是与上面一样的，参数颠倒过来

        // prepend 在匹配元素的子元素最前面添加
        $('ul').prepend('<li>我是prepend创建出来的</li>');
        $('<li>我是prependTo创建出来的</li>').prependTo('ul'); // 用法是与上面一样的，参数颠倒过来

        // after 在匹配元素后面添加(兄弟元素)
        $('ul').after('<h2>我是after创建出来的</h2>');
        $('<h2>我是insertAfter创建出来的</h2>').insertAfter('ul'); // 用法是与上面一样的，参数颠倒过来

        // before 在匹配元素前面添加(兄弟元素)
        $('ul').before('<h2>我是before创建出来的</h2>');
        $('<h2>我是insertBefore创建出来的</h2>').insertBefore('ul'); // 用法是与上面一样的，参数颠倒过来
    });
</script>   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">style</span>=<span class="hljs-string">'color:red;'</span>&gt;</span>我是本来就有的<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是ul外面的p标签<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// append  在匹配元素的子元素最后面添加</span>
        $(<span class="hljs-string">'ul'</span>).append(<span class="hljs-string">'&lt;li&gt;我是append创建出来的&lt;/li&gt;'</span>);
        $(<span class="hljs-string">'&lt;li&gt;我是appendTo创建出来的&lt;/li&gt;'</span>).appendTo(<span class="hljs-string">'ul'</span>); <span class="hljs-comment">// 用法是与上面一样的，参数颠倒过来</span>

        <span class="hljs-comment">// prepend 在匹配元素的子元素最前面添加</span>
        $(<span class="hljs-string">'ul'</span>).prepend(<span class="hljs-string">'&lt;li&gt;我是prepend创建出来的&lt;/li&gt;'</span>);
        $(<span class="hljs-string">'&lt;li&gt;我是prependTo创建出来的&lt;/li&gt;'</span>).prependTo(<span class="hljs-string">'ul'</span>); <span class="hljs-comment">// 用法是与上面一样的，参数颠倒过来</span>

        <span class="hljs-comment">// after 在匹配元素后面添加(兄弟元素)</span>
        $(<span class="hljs-string">'ul'</span>).after(<span class="hljs-string">'&lt;h2&gt;我是after创建出来的&lt;/h2&gt;'</span>);
        $(<span class="hljs-string">'&lt;h2&gt;我是insertAfter创建出来的&lt;/h2&gt;'</span>).insertAfter(<span class="hljs-string">'ul'</span>); <span class="hljs-comment">// 用法是与上面一样的，参数颠倒过来</span>

        <span class="hljs-comment">// before 在匹配元素前面添加(兄弟元素)</span>
        $(<span class="hljs-string">'ul'</span>).before(<span class="hljs-string">'&lt;h2&gt;我是before创建出来的&lt;/h2&gt;'</span>);
        $(<span class="hljs-string">'&lt;h2&gt;我是insertBefore创建出来的&lt;/h2&gt;'</span>).insertBefore(<span class="hljs-string">'ul'</span>); <span class="hljs-comment">// 用法是与上面一样的，参数颠倒过来</span>
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>   </code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677129" src="https://static.alili.tech/img/remote/1460000013677129" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader19">3.4 删除节点</h3>
<blockquote>如果文档中某一个元素多余的时候，那么就应该将其删除。<code>jQuery</code>提供了三种删除节点的方法：<code>remove()</code>，<code>detach()</code>，<code>empty()</code>。</blockquote>
<p><strong>1、remove()方法</strong></p>
<blockquote>从<code>DOM</code>中删除所有匹配的元素，当某个节点用<code>remove()</code>方法删除之后，该节点包含的所有后代节点将同时被删除，并且返回值就是该删除的节点。</blockquote>
<p><strong>示例代码：</strong> <em>[ 15-jqDOM操作-remove删除节点.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<ul>
    <li>北京</li>
    <li>上海
        <ul>
            <li>闵行区</li>
            <li>浦东区</li>
            <li>徐汇区</li>
            <li>虹口区</li>
        </ul>
    </li>
    <li>深圳</li>
    <li>天津</li>
    <li>重庆</li>
</ul>
<button id=&quot;btn1&quot;>点击remove上海</button>
<button id=&quot;btn2&quot;>点击添加上海</button>

<!-- js 部分 -->
<script>
    $(function() {
        // 点击按钮1的时候移除“上海”，并且用全局变量$li接收删除的返回值
        $('#btn1').click(function() {
            $li = $('ul li:eq(1)').remove();
        });
        
        // 点击按钮2的时候将$li接收的返回值再添加到ul中
        $('#btn2').click(function() {
            $li.appendTo('ul');
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>北京<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>上海
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>闵行区<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>浦东区<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>徐汇区<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>虹口区<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>深圳<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>重庆<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn1"</span>&gt;</span>点击remove上海<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn2"</span>&gt;</span>点击添加上海<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 点击按钮1的时候移除“上海”，并且用全局变量$li接收删除的返回值</span>
        $(<span class="hljs-string">'#btn1'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $li = $(<span class="hljs-string">'ul li:eq(1)'</span>).remove();
        });
        
        <span class="hljs-comment">// 点击按钮2的时候将$li接收的返回值再添加到ul中</span>
        $(<span class="hljs-string">'#btn2'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $li.appendTo(<span class="hljs-string">'ul'</span>);
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677130?w=318&amp;h=266" src="https://static.alili.tech/img/remote/1460000013677130?w=318&amp;h=266" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>另外<code>remove()</code>方法也可以通过传递参数来选择性的删除元素：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('ul li').remove('li[title != 上海]'); // 将li中属性title不等于‘上海’的li移除掉" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$(<span class="hljs-string">'ul li'</span>).remove(<span class="hljs-string">'li[title != 上海]'</span>); <span class="hljs-comment">// 将li中属性title不等于‘上海’的li移除掉</span></code></pre>
<p><strong>2、detach()方法</strong></p>
<blockquote>detach()方法和remove()一样，也是从DOM中，去掉所有匹配的元素。但是这个方法不会把匹配的元素从<code>jQuery</code>对象中删除，就是说所有绑定的事件、附加的数据都会保留下来。</blockquote>
<p><strong>示例代码：</strong> <em>[ 16-jqDOM操作-detach删除节点.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<div style=&quot;margin:150px auto 0; width:400px;&quot;>
    <ul>
        <li>北京</li>
        <li>上海</li>
        <li>深圳</li>
        <li>天津</li>
        <li>重庆</li>
    </ul>
    <button id=&quot;btn1&quot;>点击detach上海</button>
    <button id=&quot;btn2&quot;>点击appendTo上海</button>
</div>

<!-- js 部分 -->
<script>
    $(function() {
        $('ul li').click(function() {
            // 点击的时候弹出对应的内容
            alert($(this).html());
        });

        // 点击btn1的时候，detach移除“上海” ，并用全局变量$li接收返回值
        $('#btn1').click(function() {
            $li = $('ul li:eq(1)').detach();
        });
        // 点击btn2的时候，appendTo将$li接收的值再添加到 ul中
        $('#btn2').click(function() {
            $li.appendTo('ul');
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"margin:150px auto 0; width:400px;"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>北京<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>上海<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>深圳<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>重庆<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn1"</span>&gt;</span>点击detach上海<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn2"</span>&gt;</span>点击appendTo上海<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-string">'ul li'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 点击的时候弹出对应的内容</span>
            alert($(<span class="hljs-keyword">this</span>).html());
        });

        <span class="hljs-comment">// 点击btn1的时候，detach移除“上海” ，并用全局变量$li接收返回值</span>
        $(<span class="hljs-string">'#btn1'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $li = $(<span class="hljs-string">'ul li:eq(1)'</span>).detach();
        });
        <span class="hljs-comment">// 点击btn2的时候，appendTo将$li接收的值再添加到 ul中</span>
        $(<span class="hljs-string">'#btn2'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $li.appendTo(<span class="hljs-string">'ul'</span>);
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677131?w=435&amp;h=310" src="https://static.alili.tech/img/remote/1460000013677131?w=435&amp;h=310" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><em>我们可以看到，“上海”一开始是可以被点击的，<code>detach</code>删除以后，再添加到<code>ul</code>中的时候，它的点击事件还在，还可以点击。但是如果使用的是<code>remove</code>删除的话，点击事件就会被移除。</em></p>
<p><strong>3、empty()方法</strong></p>
<blockquote>
<code>empty</code>方法不是删除节点，准确的说，它是清空节点，它能清除匹配元素中的所有后代节点和内容。</blockquote>
<p><strong>示例代码：</strong> <em>[ 17-jqDOM操作-empty清空节点.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<ul>
    <li>北京</li>
    <li>上海
        <ul>
            <li>闵行区</li>
            <li>浦东区</li>
            <li>徐汇区</li>
            <li>虹口区</li>
        </ul>
    </li>
    <li>深圳</li>
    <li>天津</li>
    <li>重庆</li>
</ul>
<button id=&quot;btn&quot;>点击empty上海</button>

<!-- js 部分 -->
<script>
    $(function() {
        $('#btn').click(function() {
            // 点击按钮的时候，找到ul下的第2个li，清空它里面的内容，我们可以看到li标签还在
            $('ul li:eq(1)').empty();
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>北京<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>上海
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>闵行区<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>浦东区<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>徐汇区<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>虹口区<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>深圳<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>重庆<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>点击empty上海<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-string">'#btn'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 点击按钮的时候，找到ul下的第2个li，清空它里面的内容，我们可以看到li标签还在</span>
            $(<span class="hljs-string">'ul li:eq(1)'</span>).empty();
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677132?w=312&amp;h=252" src="https://static.alili.tech/img/remote/1460000013677132?w=312&amp;h=252" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><em><code>empty</code>是清空匹配项的内容，不管里面是文本还是有其它标签，都会被清空，但是匹配项的标签还会保留，不会被清空</em></p>
<h3 id="articleHeader20">3.5 克隆节点</h3>
<blockquote>克隆节点也是常用的<code>DOM</code>操作之一，它是通过<code>clone()</code>方法实现的，同样的，它也有<code>深拷贝</code>和<code>浅拷贝</code>。深拷贝和浅拷贝的区别就是，深拷贝会复制绑定的事件，而浅拷贝不会。实现原理很简单，只要<code>clone(true)</code>，加上<code>true</code>，就是深拷贝，默认不传或者传<code>false</code>就是浅拷贝。</blockquote>
<p><strong>示例代码：</strong> <em>[ 18-jqDOM操作-克隆节点.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<h2>浅拷贝</h2>
<ul class=&quot;wrap1&quot;>
    <li>北京</li>
    <li>上海</li>
    <li>深圳</li>
    <li>天津</li>
    <li>重庆</li>
</ul>
<h2>深拷贝</h2>
<ul class=&quot;wrap2&quot;>
    <li>北京</li>
    <li>上海</li>
    <li>深圳</li>
    <li>天津</li>
    <li>重庆</li>
</ul>

<!-- js 部分 -->
<script>
    $(function() {
        // 浅拷贝，点击时，拷贝当前点击的li，并添加到ul中 新创建的li 不具备点击事件
        $('.wrap1 li').click(function() {
            $(this).clone().appendTo('.wrap1');
        });
        // 深拷贝，点击时，拷贝当前点击的li，并添加到ul中 新创建的li 具备点击事件
        $('.wrap2 li').click(function() {
            $(this).clone(true).appendTo('.wrap2');
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>浅拷贝<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap1"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>北京<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>上海<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>深圳<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>重庆<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>深拷贝<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap2"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>北京<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>上海<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>深圳<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>天津<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>重庆<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 浅拷贝，点击时，拷贝当前点击的li，并添加到ul中 新创建的li 不具备点击事件</span>
        $(<span class="hljs-string">'.wrap1 li'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-keyword">this</span>).clone().appendTo(<span class="hljs-string">'.wrap1'</span>);
        });
        <span class="hljs-comment">// 深拷贝，点击时，拷贝当前点击的li，并添加到ul中 新创建的li 具备点击事件</span>
        $(<span class="hljs-string">'.wrap2 li'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-keyword">this</span>).clone(<span class="hljs-literal">true</span>).appendTo(<span class="hljs-string">'.wrap2'</span>);
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677133?w=264&amp;h=487" src="https://static.alili.tech/img/remote/1460000013677133?w=264&amp;h=487" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><em>我们可以看出，浅拷贝的时候，点击“北京”克隆了一个“北京”的标签，并且添加到了<code>ul</code>中，但是新创建出来的没有点击事件。深拷贝的时候，新创建出来的还可以再次被点击，说明绑定事件，也拷贝了。</em></p>
<h3 id="articleHeader21">3.6 替换节点</h3>
<blockquote>如果要替换某个节点，<code>jQuery</code>提供了两个方法，即<code>replaceWith()</code>和<code>replaceAll()</code>。<p><code>replaceWith()</code>方法是将所有匹配的元素替换成指定的<code>HTML</code>或<code>DOM</code>，<code>replaceAll()</code>方法的作用与<code>replaceWith()</code>方法的作用一模一样，只是颠倒了参数。</p>
</blockquote>
<p><strong>示例代码：</strong> <em>[ 19-jqDOM操作-替换节点.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分-->
<ul>
    <li title=&quot;北京&quot;>北京</li>
    <li title=&quot;北京&quot;>北京</li>
    <li title=&quot;上海&quot;>上海</li>
    <li title=&quot;上海&quot;>上海</li>
</ul>

<button id=&quot;btn1&quot;>点击替换北京</button>
<button id=&quot;btn2&quot;>点击替换上海</button>

<!-- js 部分 -->
<script>
    $(function() {
        // 点击按钮1 会将title为北京的 替换成p标签“这里是上海”
        $('#btn1').click(function() {
            $('ul li[title=&quot;北京&quot;]').replaceWith('<p>这里是上海</p>');
        });
        // 点击按钮2 会将title为上海的 替换成p标签“这里是闵行”
        $('#btn2').click(function() {
            $('<p>这里是闵行</p>').replaceAll('ul li[title=&quot;上海&quot;]');
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"北京"</span>&gt;</span>北京<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"北京"</span>&gt;</span>北京<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"上海"</span>&gt;</span>上海<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"上海"</span>&gt;</span>上海<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn1"</span>&gt;</span>点击替换北京<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn2"</span>&gt;</span>点击替换上海<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 点击按钮1 会将title为北京的 替换成p标签“这里是上海”</span>
        $(<span class="hljs-string">'#btn1'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-string">'ul li[title="北京"]'</span>).replaceWith(<span class="hljs-string">'&lt;p&gt;这里是上海&lt;/p&gt;'</span>);
        });
        <span class="hljs-comment">// 点击按钮2 会将title为上海的 替换成p标签“这里是闵行”</span>
        $(<span class="hljs-string">'#btn2'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-string">'&lt;p&gt;这里是闵行&lt;/p&gt;'</span>).replaceAll(<span class="hljs-string">'ul li[title="上海"]'</span>);
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677134?w=287&amp;h=218" src="https://static.alili.tech/img/remote/1460000013677134?w=287&amp;h=218" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><em>替换前如果已经为元素绑定事件，替换后原先绑定的事件将会与被替换的元素一起消失。</em></p>
<h3 id="articleHeader22">3.7 包裹节点</h3>
<blockquote>如果想要将某个节点，用其他标记包裹起来，<code>jQuery</code>提供了相应的方法，即<code>wrap()</code>。它还有两个其他的方法：<code>wrapAll()</code>、<code>wrapInner()</code>。</blockquote>
<table>
<thead><tr>
<th>名称</th>
<th>用法</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td><code>wrap()</code></td>
<td><code>$('h3').wrap('&lt;i&gt;&lt;/i&gt;')</code></td>
<td>将所有的<code>h3</code>标签单独用<code>i</code>标签包裹起来</td>
</tr>
<tr>
<td><code>wrapAll()</code></td>
<td><code>$('h3').wrapAll('&lt;i&gt;&lt;/i&gt;')</code></td>
<td>将所有的<code>h3</code>标签全部包裹在<code>i</code>标签内</td>
</tr>
<tr>
<td><code>wrapInner()</code></td>
<td><code>$('h3').wrapInner('&lt;i&gt;&lt;/i&gt;')</code></td>
<td>将<code>h3</code>标签里面的子内容(包括文本节点)用<code>i</code>标签包裹起来</td>
</tr>
</tbody>
</table>
<p><strong>示例代码：</strong> <em>[ 20-jqDOM操作-包裹节点.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<h2 style=&quot;color:chartreuse&quot;>这里是上海</h2>
<h2 style=&quot;color:aqua&quot;>这里是上海</h2>
<h3 style=&quot;color:aquamarine&quot;>这里是上海</h3>
<h3 style=&quot;color:blueviolet&quot;>这里是上海</h3>
<h4 style=&quot;color:violet&quot;>这里是上海</h4>
<h4 style=&quot;color:deepskyblue&quot;>这里是上海</h4>

<!-- js 部分 -->
<script>
    $(function() {
        // 将每一个 h2 标签用 i 标签进行单独包裹 
        $('h2').wrap('<i></i>');
        // 将整个 h3 标签用 s 标签进行包裹
        $('h3').wrapAll('<s></s>');
        // 将 h4 标签的子内容 用 u 标签进行包裹
        $('h4').wrapInner('<u></u>');
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color:chartreuse"</span>&gt;</span>这里是上海<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color:aqua"</span>&gt;</span>这里是上海<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color:aquamarine"</span>&gt;</span>这里是上海<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color:blueviolet"</span>&gt;</span>这里是上海<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h4</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color:violet"</span>&gt;</span>这里是上海<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h4</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color:deepskyblue"</span>&gt;</span>这里是上海<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 将每一个 h2 标签用 i 标签进行单独包裹 </span>
        $(<span class="hljs-string">'h2'</span>).wrap(<span class="hljs-string">'&lt;i&gt;&lt;/i&gt;'</span>);
        <span class="hljs-comment">// 将整个 h3 标签用 s 标签进行包裹</span>
        $(<span class="hljs-string">'h3'</span>).wrapAll(<span class="hljs-string">'&lt;s&gt;&lt;/s&gt;'</span>);
        <span class="hljs-comment">// 将 h4 标签的子内容 用 u 标签进行包裹</span>
        $(<span class="hljs-string">'h4'</span>).wrapInner(<span class="hljs-string">'&lt;u&gt;&lt;/u&gt;'</span>);
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677135" src="https://static.alili.tech/img/remote/1460000013677135" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader23">3.8 遍历节点</h3>
<blockquote>本章第一节的时候，我们知道了如何查找节点，在<code>jQuery</code>中，还提供了一些查找节点的方法，我们通过这一小节的学习，来认识它们。</blockquote>
<p><strong>1、children()方法：</strong></p>
<blockquote>该方法用于获得匹配元素的子元素的集合。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<ul>
    <li>ul里面的子元素<a href=&quot;#&quot;>li里面的子元素</a></li>
    <li>ul里面的子元素<a href=&quot;#&quot;>li里面的子元素</a></li>
    <li>ul里面的子元素<a href=&quot;#&quot;>li里面的子元素</a></li>
    <li>ul里面的子元素<a href=&quot;#&quot;>li里面的子元素</a></li>
</ul>

<!-- js 部分 -->
<script>
    $(function() {
        var $child = $('ul').children();
        console.log($child); // 找到ul下的所有子元素 li
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>ul里面的子元素<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>li里面的子元素<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>ul里面的子元素<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>li里面的子元素<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>ul里面的子元素<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>li里面的子元素<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>ul里面的子元素<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>li里面的子元素<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> $child = $(<span class="hljs-string">'ul'</span>).children();
        <span class="hljs-built_in">console</span>.log($child); <span class="hljs-comment">// 找到ul下的所有子元素 li</span>
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>注意：</strong> <code>children()</code>方法只能考虑子元素，后代元素不考虑。</p>
<p><strong>2、next()方法 和 nextAll()方法：</strong></p>
<blockquote>
<code>next()</code>方法用于获得匹配元素后面紧邻的同级元素。<code>nextAll()</code>方法用于获得匹配元素后面所有的同级元素。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<p>这是一段意味深长的话</p>
<ul>
    <li>ul里面的子元素</li>
    <li>ul里面的子元素</li>
    <li>ul里面的子元素</li>
    <li>ul里面的子元素</li>
</ul>
<i>哈哈哈</i>

<!-- js 部分 -->
<script>
    $(function() {
        var $next = $('p').next();
        var $nextAll = $('p').nextAll();
        console.log($next);     // 找到 p 后面紧跟的同级元素 ul
        console.log($nextAll);  // 找到 p 后面所有的同级元素 ul i
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一段意味深长的话<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>ul里面的子元素<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>ul里面的子元素<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>ul里面的子元素<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>ul里面的子元素<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">i</span>&gt;</span>哈哈哈<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> $next = $(<span class="hljs-string">'p'</span>).next();
        <span class="hljs-keyword">var</span> $nextAll = $(<span class="hljs-string">'p'</span>).nextAll();
        <span class="hljs-built_in">console</span>.log($next);     <span class="hljs-comment">// 找到 p 后面紧跟的同级元素 ul</span>
        <span class="hljs-built_in">console</span>.log($nextAll);  <span class="hljs-comment">// 找到 p 后面所有的同级元素 ul i</span>
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>3、prev()方法 和 prevAll()方法：</strong></p>
<blockquote>
<code>prev()</code>方法用于获得匹配元素前面紧邻的同级元素。<code>prevAll()</code>方法用于获得匹配元素前面所有的同级元素。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<p>这是一段意味深长的话</p>
<ul>
    <li>ul的子元素</li>
    <li>ul的子元素</li>
    <li>ul的子元素</li>
</ul>
<i>哈哈哈</i>

<!-- js 部分 -->    
<script>
    $(function() {
        var $prev = $('i').prev();
        var $prevAll = $('i').prevAll();
        console.log($prev);     // 获得 i 前面紧邻的元素 ul 
        console.log($prevAll);  // 获得 i 前面所有的元素 ul p  
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一段意味深长的话<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>ul的子元素<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>ul的子元素<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>ul的子元素<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">i</span>&gt;</span>哈哈哈<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>    
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> $prev = $(<span class="hljs-string">'i'</span>).prev();
        <span class="hljs-keyword">var</span> $prevAll = $(<span class="hljs-string">'i'</span>).prevAll();
        <span class="hljs-built_in">console</span>.log($prev);     <span class="hljs-comment">// 获得 i 前面紧邻的元素 ul </span>
        <span class="hljs-built_in">console</span>.log($prevAll);  <span class="hljs-comment">// 获得 i 前面所有的元素 ul p  </span>
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>4、siblings()方法：</strong></p>
<blockquote>该方法用于匹配元素前后所有的兄弟元素。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分-->
<p>这是一段意味深长的话</p>
<ul>
    <li>ul的子元素</li>
    <li>ul的子元素</li>
    <li>ul的子元素</li>
</ul>
<i>呵呵呵</i>
<strong>我会让你见识一下什么叫残忍</strong>

<!-- js 部分 -->
<script>
    $(function() {
        var $prev = $('ul').siblings();
        console.log($prev); // 获得 ul 前面和后面所有的兄弟元素：p、i、strong 
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一段意味深长的话<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>ul的子元素<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>ul的子元素<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>ul的子元素<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">i</span>&gt;</span>呵呵呵<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>我会让你见识一下什么叫残忍<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> $prev = $(<span class="hljs-string">'ul'</span>).siblings();
        <span class="hljs-built_in">console</span>.log($prev); <span class="hljs-comment">// 获得 ul 前面和后面所有的兄弟元素：p、i、strong </span>
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>5、closest()方法：</strong></p>
<blockquote>该方法用于获取最近的匹配元素。首先检查当前元素是否匹配，匹配的话直接返回，如果不匹配则向上查找父元素，逐级向上，直到找到匹配的元素，如果什么也没找到，返回一个空的<code>jQ</code>对象。</blockquote>
<p><strong>6、parent() 和 parents()方法：</strong></p>
<blockquote>
<code>parent()</code>方法是获得匹配元素的父级元素。<code>parents()</code>方法获取的是匹配元素的祖先元素。</blockquote>
<p><em>我们可以对比下<code>closest()</code>方法和<code>parent()</code>、<code>parents()</code>方法的区别，根据实际需求灵活使用。</em></p>
<h3 id="articleHeader24">3.9 节点操作案例</h3>
<p><strong>1、选好友案例：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<select id=&quot;left&quot; multiple>
    <option>大乔0</option>
    <option>小乔1</option>
    <option>甄姬2</option>
    <option>虞姬3</option>
    <option>妲己4</option>
    <option>女娲5</option>
    <option>芈月6</option>
    <option>露娜7</option>
</select>

<button id=&quot;all-right&quot;>&amp;gt;&amp;gt;</button>
<button id=&quot;all-left&quot;>&amp;lt;&amp;lt;</button>
<button id=&quot;only-right&quot;>&amp;gt;</button>
<button id=&quot;only-left&quot;>&amp;lt;</button>

<select id=&quot;right&quot; multiple></select>

<!-- js 部分 -->
<script>
    $(function() {
        // 全部往右
        $('#all-right').click(function() {
            $('#left>option').appendTo($('#right'));
        });

        // 全部往左
        $('#all-left').click(function() {
            $('#right>option').appendTo($('#left'));
        });

        // 选中的往右
        $('#only-right').click(function() {
            $('#left>option:selected').appendTo($('#right'));
        });

        // 选中的往左
        $('#only-left').click(function() {
            $('#right>option:selected').appendTo($('#left'));
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"left"</span> <span class="hljs-attr">multiple</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>大乔0<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>小乔1<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>甄姬2<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>虞姬3<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>妲己4<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>女娲5<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>芈月6<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>露娜7<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"all-right"</span>&gt;</span>&amp;gt;&amp;gt;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"all-left"</span>&gt;</span>&amp;lt;&amp;lt;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"only-right"</span>&gt;</span>&amp;gt;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"only-left"</span>&gt;</span>&amp;lt;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"right"</span> <span class="hljs-attr">multiple</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 全部往右</span>
        $(<span class="hljs-string">'#all-right'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-string">'#left&gt;option'</span>).appendTo($(<span class="hljs-string">'#right'</span>));
        });

        <span class="hljs-comment">// 全部往左</span>
        $(<span class="hljs-string">'#all-left'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-string">'#right&gt;option'</span>).appendTo($(<span class="hljs-string">'#left'</span>));
        });

        <span class="hljs-comment">// 选中的往右</span>
        $(<span class="hljs-string">'#only-right'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-string">'#left&gt;option:selected'</span>).appendTo($(<span class="hljs-string">'#right'</span>));
        });

        <span class="hljs-comment">// 选中的往左</span>
        $(<span class="hljs-string">'#only-left'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-string">'#right&gt;option:selected'</span>).appendTo($(<span class="hljs-string">'#left'</span>));
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012369999?w=304&amp;h=331" src="https://static.alili.tech/img/remote/1460000012369999?w=304&amp;h=331" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>2、微博发布案例</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<div class=&quot;box&quot; id=&quot;weibo&quot;>
    <span>微博发布</span>
    <textarea rows=&quot;10&quot; cols=&quot;30&quot; id=&quot;txt&quot;></textarea>
    <button id=&quot;btn&quot;>发布</button>
    <ul id=&quot;ul&quot;></ul>
</div>

<!-- js 部分 -->
<script>
    $(function() {
        // 首先给发布按钮注册点击事件
        $('#btn').click(function() {
            // 点击按钮的时候要做几件事
            // 1- 获取到txt输入框的 内容 val() 获取 value 值
            var $content = $('#txt').val();
            // 2- 判断这个值是不是空字符，是的话就停止
            if ($content.trim().length == 0) {
                return;
            }
            // 3-创建 li 标签，添加到 ul中 
            $('<li></li>').text($content).prependTo($('#ul'));

            // 4-添加之后，就要清屏
            $('#txt').val('');
            
            // 5- 添加删除按钮  （链式编程）
            var $del = $('<button>删除</button>')
                // 添加一个id属性，并且将del添加到 li中
                .attr('id', 'del').appendTo($li)
                // 点击这个删除按钮的时候 将他的父元素即li 移除掉
                .click(function() {
                    $(this).parent().remove();
                });
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"weibo"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>微博发布<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">rows</span>=<span class="hljs-string">"10"</span> <span class="hljs-attr">cols</span>=<span class="hljs-string">"30"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"txt"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>发布<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"ul"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 首先给发布按钮注册点击事件</span>
        $(<span class="hljs-string">'#btn'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 点击按钮的时候要做几件事</span>
            <span class="hljs-comment">// 1- 获取到txt输入框的 内容 val() 获取 value 值</span>
            <span class="hljs-keyword">var</span> $content = $(<span class="hljs-string">'#txt'</span>).val();
            <span class="hljs-comment">// 2- 判断这个值是不是空字符，是的话就停止</span>
            <span class="hljs-keyword">if</span> ($content.trim().length == <span class="hljs-number">0</span>) {
                <span class="hljs-keyword">return</span>;
            }
            <span class="hljs-comment">// 3-创建 li 标签，添加到 ul中 </span>
            $(<span class="hljs-string">'&lt;li&gt;&lt;/li&gt;'</span>).text($content).prependTo($(<span class="hljs-string">'#ul'</span>));

            <span class="hljs-comment">// 4-添加之后，就要清屏</span>
            $(<span class="hljs-string">'#txt'</span>).val(<span class="hljs-string">''</span>);
            
            <span class="hljs-comment">// 5- 添加删除按钮  （链式编程）</span>
            <span class="hljs-keyword">var</span> $del = $(<span class="hljs-string">'&lt;button&gt;删除&lt;/button&gt;'</span>)
                <span class="hljs-comment">// 添加一个id属性，并且将del添加到 li中</span>
                .attr(<span class="hljs-string">'id'</span>, <span class="hljs-string">'del'</span>).appendTo($li)
                <span class="hljs-comment">// 点击这个删除按钮的时候 将他的父元素即li 移除掉</span>
                .click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    $(<span class="hljs-keyword">this</span>).parent().remove();
                });
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong> </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012370001?w=679&amp;h=407" src="https://static.alili.tech/img/remote/1460000012370001?w=679&amp;h=407" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader25">4. jQuery 属性操作</h2>
<h3 id="articleHeader26">4.1 attr 操作</h3>
<blockquote>在<code>jQuery</code>中，用<code>attr()</code>方法来获取和设置元素属性，<code>removeAttr()</code>方法来删除元素属性。</blockquote>
<p><strong>1、获取属性和设置属性</strong></p>
<blockquote>
<code>attr()</code>，可以用来获取属性也可以用来设置属性。当<code>attr()</code>参数为一个的时候，即<code>属性名称</code>，表示的是获取属性。当<code>attr()</code>里面的参数是两个的时候，即<code>属性名称</code>和对应的<code>值</code>，表示的是设置属性。如果想要设置多个属性，参数就是一个<code>json</code>对象。</blockquote>
<p><strong>示例代码：</strong> <em>[ 23-jq属性操作-attr属性操作.html ]</em></p>
<p>获取时：<em>属性名称</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p title=&quot;城市&quot; id=&quot;des1&quot;>上海</p>

<!-- js 部分 -->
<script>
    $(function() {
        // 获取属性
        console.log($('#des1').attr('title'));  // 获取到 title 属性
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"城市"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"des1"</span>&gt;</span>上海<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 获取属性</span>
        <span class="hljs-built_in">console</span>.log($(<span class="hljs-string">'#des1'</span>).attr(<span class="hljs-string">'title'</span>));  <span class="hljs-comment">// 获取到 title 属性</span>
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>设置单个属性时：<em>属性名称/值</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p id=&quot;des2&quot;>波多野结衣</p>

<!-- js 部分 -->
<script>
    $(function() {
        // 设置 title 属性
        $('#des2').attr('title','女星'));  
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"des2"</span>&gt;</span>波多野结衣<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 设置 title 属性</span>
        $(<span class="hljs-string">'#des2'</span>).attr(<span class="hljs-string">'title'</span>,<span class="hljs-string">'女星'</span>));  
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>设置多个属性时：<em><code>json</code>对象</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p id=&quot;des3&quot;>苍井空</p>

<!-- js 部分 -->
<script>
    $(function() {
        // 添加多个属性 参数是一个json对象
        $('#des3').attr({'title':'老师','name':'苍井空'});
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"des3"</span>&gt;</span>苍井空<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 添加多个属性 参数是一个json对象</span>
        $(<span class="hljs-string">'#des3'</span>).attr({<span class="hljs-string">'title'</span>:<span class="hljs-string">'老师'</span>,<span class="hljs-string">'name'</span>:<span class="hljs-string">'苍井空'</span>});
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677136" src="https://static.alili.tech/img/remote/1460000013677136" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>注意：</strong></p>
<p>在<code>jQ</code>中，有很多方法都是同一个函数既能实现获取值，又能实现设置值，除了<code>attr</code>方法类似的还有：<code>html()</code>、<code>text()</code>、<code>height()</code>、<code>width()</code>、<code>val()</code>、<code>css()</code>等方法。</p>
<p><strong>2、删除属性</strong></p>
<blockquote>有时候我们需要移除某个元素的属性，可以使用<code>removeAttr()</code>方法。</blockquote>
<p>移除单个属性时：<em>单个属性名</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p id=&quot;des4&quot; title=&quot;游戏&quot;>英雄联盟</p>

<!-- js 部分 -->
<script>
    $(function() {
        // 移除单个属性
        $('#des4').removeAttr('title');
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"des4"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"游戏"</span>&gt;</span>英雄联盟<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 移除单个属性</span>
        $(<span class="hljs-string">'#des4'</span>).removeAttr(<span class="hljs-string">'title'</span>);
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>移除多个属性时：<em>同时多个属性名</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p id=&quot;des5&quot; title=&quot;电影&quot; name=&quot;杰克&quot;>泰坦尼克号</p>

<!-- js 部分 -->
<script>
    $(function() {
        // 移除多个属性
        $('#des5').removeAttr('title name');
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"des5"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"电影"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"杰克"</span>&gt;</span>泰坦尼克号<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 移除多个属性</span>
        $(<span class="hljs-string">'#des5'</span>).removeAttr(<span class="hljs-string">'title name'</span>);
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677137" src="https://static.alili.tech/img/remote/1460000013677137" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader27">4.2 prop 操作</h3>
<blockquote>在<code>jQuery1.6</code>之后，对于<code>checked</code>、<code>selected</code>、<code>disabled</code>这类<code>boolean</code>类型的属性来说，不能用<code>attr</code>方法，只能用<code>prop</code>方法。</blockquote>
<p><strong>获取属性和设置属性</strong></p>
<blockquote>获取、设置属性时用<code>prop()</code>方法，当<code>prop()</code>参数为一个的时候，即<code>属性名称</code>，表示的是获取属性。当<code>prop()</code>里面的参数是两个的时候，即<code>属性名称</code>和对应的<code>布尔值</code>。</blockquote>
<p><strong>示例代码：</strong> <em>[ 24-jq属性操作-prop属性操作.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<label><input type=&quot;checkbox&quot; name=&quot;hero&quot; id=&quot;sec&quot; checked=&quot;true&quot;>盖伦</label>
<label><input type=&quot;checkbox&quot; name=&quot;hero&quot; >瑞文</label>
<label><input type=&quot;checkbox&quot; name=&quot;hero&quot; id=&quot;sec1&quot;>艾希</label>
<label><input type=&quot;checkbox&quot; name=&quot;hero&quot; >亚索</label>

<!-- js 部分-->
<script>
    $(function() {
        // 获取属性
        console.log($('#sec').attr('checked')); // checked attr 方法不能获取
        console.log($('#sec').prop('checked')); // true
        
        // 设置属性
        $('#sec1').prop('checked', true);
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"hero"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"sec"</span> <span class="hljs-attr">checked</span>=<span class="hljs-string">"true"</span>&gt;</span>盖伦<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"hero"</span> &gt;</span>瑞文<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"hero"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"sec1"</span>&gt;</span>艾希<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"hero"</span> &gt;</span>亚索<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 获取属性</span>
        <span class="hljs-built_in">console</span>.log($(<span class="hljs-string">'#sec'</span>).attr(<span class="hljs-string">'checked'</span>)); <span class="hljs-comment">// checked attr 方法不能获取</span>
        <span class="hljs-built_in">console</span>.log($(<span class="hljs-string">'#sec'</span>).prop(<span class="hljs-string">'checked'</span>)); <span class="hljs-comment">// true</span>
        
        <span class="hljs-comment">// 设置属性</span>
        $(<span class="hljs-string">'#sec1'</span>).prop(<span class="hljs-string">'checked'</span>, <span class="hljs-literal">true</span>);
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677138" src="https://static.alili.tech/img/remote/1460000013677138" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader28">4.3 属性操作案例</h3>
<p><strong>1、美女相册案例：</strong> <em>[ 25-jq属性操作-美女相册.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;box&quot;>
    <h2>美女相册案例</h2>
    <ul class=&quot;wrap&quot;>
        <li>
            <a href=&quot;../image/美女相册/1.jpg&quot; title=&quot;美女1&quot;><img src=&quot;../image/美女相册/1-small.jpg&quot; alt=&quot;&quot;></a>
        </li>
        <li>
            <a href=&quot;../image/美女相册/2.jpg&quot; title=&quot;美女2&quot;><img src=&quot;../image/美女相册/2-small.jpg&quot; alt=&quot;&quot;></a>
        </li>
        <li>
            <a href=&quot;../image/美女相册/3.jpg&quot; title=&quot;美女3&quot;><img src=&quot;../image/美女相册/3-small.jpg&quot; alt=&quot;&quot;></a>
        </li>
        <li>
            <a href=&quot;../image/美女相册/4.jpg&quot; title=&quot;美女4&quot;><img src=&quot;../image/美女相册/4-small.jpg&quot; alt=&quot;&quot;></a>
        </li>
    </ul>
    <img id=&quot;placeholder&quot; src=&quot;../image/美女相册/placeholder.png&quot; alt=&quot;&quot;>
    <p id=&quot;des&quot;>这是描述</p>
</div>

<script>
    $(function() {
        // 给所有的 a 标签注册点击事件
        $('.wrap>li>a').click(function() {
            // 点击某个 a 标签的时候，同时应该也要修改大图片的 src属性
            var $href = $(this).attr('href');
            $('#placeholder').attr('src', $href);
            // 同时下面的文字也要跟着改变
            var $title = $(this).attr('title');
            $('#des').text($title);
            // 阻止 a 标签跳转
            return false;
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>美女相册案例<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"../image/美女相册/1.jpg"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"美女1"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/美女相册/1-small.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"../image/美女相册/2.jpg"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"美女2"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/美女相册/2-small.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"../image/美女相册/3.jpg"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"美女3"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/美女相册/3-small.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"../image/美女相册/4.jpg"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"美女4"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/美女相册/4-small.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"placeholder"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/美女相册/placeholder.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"des"</span>&gt;</span>这是描述<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 给所有的 a 标签注册点击事件</span>
        $(<span class="hljs-string">'.wrap&gt;li&gt;a'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 点击某个 a 标签的时候，同时应该也要修改大图片的 src属性</span>
            <span class="hljs-keyword">var</span> $href = $(<span class="hljs-keyword">this</span>).attr(<span class="hljs-string">'href'</span>);
            $(<span class="hljs-string">'#placeholder'</span>).attr(<span class="hljs-string">'src'</span>, $href);
            <span class="hljs-comment">// 同时下面的文字也要跟着改变</span>
            <span class="hljs-keyword">var</span> $title = $(<span class="hljs-keyword">this</span>).attr(<span class="hljs-string">'title'</span>);
            $(<span class="hljs-string">'#des'</span>).text($title);
            <span class="hljs-comment">// 阻止 a 标签跳转</span>
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012369852?w=698&amp;h=520" src="https://static.alili.tech/img/remote/1460000012369852?w=698&amp;h=520" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>2、表单全选案例：</strong> <em>[ 26-jq属性操作-表单全选.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<div class=&quot;wrap&quot;>
    <table>
        <thead>
            <tr>
                <th>
                    <input id=&quot;check_all&quot; type=&quot;checkbox&quot; title=&quot;全选&quot;>
                </th>
                <th>英雄</th>
                <th>技能</th>
            </tr>
        </thead>
        <tbody id=&quot;check_dan&quot;>
            <tr>
                <td><input type=&quot;checkbox&quot;></td>
                <td>芈月</td>
                <td>永生之血</td>
            </tr>
            <tr>
                <td><input type=&quot;checkbox&quot;></td>
                <td>貂蝉</td>
                <td>语·花印</td>
            </tr>
            <tr>
                <td><input type=&quot;checkbox&quot;></td>
                <td>大乔</td>
                <td>川流不息</td>
            </tr>
            <tr>
                <td><input type=&quot;checkbox&quot;></td>
                <td>甄姬</td>
                <td>凝泪成冰</td>
            </tr>
        </tbody>
    </table>
</div>

<!-- js 部分 -->
<script>
    $(function() {
        // 点击最上面的全选按钮，控制下面的按钮状态
        $('#check_all').click(function() {
            // 获取全选按钮的 checked属性
            var $status = $(this).prop('checked');
            // 将全选按钮的属性值赋值给下面每一个的按钮的属性
            $('#check_dan input').prop('checked', $status);
        });

        // 点击下面的按钮控制全选按钮
        $('#check_dan input').click(function() {
            // 点击下面的按钮时，获取到被选中的选择框的个数
            var $cLength = $('#check_dan input:checked').length;

            // 获取下面按钮的整个个数
            var $allLength = $('#check_dan input').length;

            // 当选中的个数等于总个数的时候，全选按钮也应该被选中，否则就不选中 
            // 只有当 $cLength == $allLength 返回true时 check_all 才会被选中
            $('#check_all').prop('checked', $cLength == $allLength);
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">thead</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"check_all"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"全选"</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>英雄<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>技能<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">thead</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"check_dan"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>芈月<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>永生之血<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>貂蝉<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>语·花印<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>大乔<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>川流不息<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>甄姬<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>凝泪成冰<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 点击最上面的全选按钮，控制下面的按钮状态</span>
        $(<span class="hljs-string">'#check_all'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 获取全选按钮的 checked属性</span>
            <span class="hljs-keyword">var</span> $status = $(<span class="hljs-keyword">this</span>).prop(<span class="hljs-string">'checked'</span>);
            <span class="hljs-comment">// 将全选按钮的属性值赋值给下面每一个的按钮的属性</span>
            $(<span class="hljs-string">'#check_dan input'</span>).prop(<span class="hljs-string">'checked'</span>, $status);
        });

        <span class="hljs-comment">// 点击下面的按钮控制全选按钮</span>
        $(<span class="hljs-string">'#check_dan input'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 点击下面的按钮时，获取到被选中的选择框的个数</span>
            <span class="hljs-keyword">var</span> $cLength = $(<span class="hljs-string">'#check_dan input:checked'</span>).length;

            <span class="hljs-comment">// 获取下面按钮的整个个数</span>
            <span class="hljs-keyword">var</span> $allLength = $(<span class="hljs-string">'#check_dan input'</span>).length;

            <span class="hljs-comment">// 当选中的个数等于总个数的时候，全选按钮也应该被选中，否则就不选中 </span>
            <span class="hljs-comment">// 只有当 $cLength == $allLength 返回true时 check_all 才会被选中</span>
            $(<span class="hljs-string">'#check_all'</span>).prop(<span class="hljs-string">'checked'</span>, $cLength == $allLength);
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677139?w=424&amp;h=225" src="https://static.alili.tech/img/remote/1460000013677139?w=424&amp;h=225" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader29">5. jQuery 样式操作</h2>
<h3 id="articleHeader30">5.1 css 操作</h3>
<blockquote>通过<code>css()</code>的方法设置或者获取样式，无论样式属性是从外部导入的，还是直接写在<code>HTML</code>标签里面的，<code>css()</code>方法都可以获取到。。</blockquote>
<p><strong>1、设置单个样式：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(function() {
    // 给 body 添加背景色
    $('body').css('background', '#fbb');
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 给 body 添加背景色</span>
    $(<span class="hljs-string">'body'</span>).css(<span class="hljs-string">'background'</span>, <span class="hljs-string">'#fbb'</span>);
})</code></pre>
<p><strong>2、设置多个样式：</strong></p>
<blockquote>操作多个样式的时候，<code>css()</code>，里面的参数是一个<code>对象</code>。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;box&quot;></div>

<!-- js 部分 -->
<script>
    $(function() {
        $('#box').css({
            'width': '300px',
            'height': '300px',
            'background': '#bbf'
        });
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-string">'#box'</span>).css({
            <span class="hljs-string">'width'</span>: <span class="hljs-string">'300px'</span>,
            <span class="hljs-string">'height'</span>: <span class="hljs-string">'300px'</span>,
            <span class="hljs-string">'background'</span>: <span class="hljs-string">'#bbf'</span>
        });
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>3、获取样式：</strong></p>
<blockquote>获取样式的时候，<code>css()</code>，方法里面的参数就是属性名。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;box&quot;></div>

<!-- js 部分 -->
<script>
    $(function() {
        $('body').css('background', '#fbb');
        $('#box').css({
            'width': '300px',
            'height': '300px',
            'background': '#bbf'
        });
        // 获取 box 的 height
        console.log($('#box').css(&quot;height&quot;));  // 300px
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-string">'body'</span>).css(<span class="hljs-string">'background'</span>, <span class="hljs-string">'#fbb'</span>);
        $(<span class="hljs-string">'#box'</span>).css({
            <span class="hljs-string">'width'</span>: <span class="hljs-string">'300px'</span>,
            <span class="hljs-string">'height'</span>: <span class="hljs-string">'300px'</span>,
            <span class="hljs-string">'background'</span>: <span class="hljs-string">'#bbf'</span>
        });
        <span class="hljs-comment">// 获取 box 的 height</span>
        <span class="hljs-built_in">console</span>.log($(<span class="hljs-string">'#box'</span>).css(<span class="hljs-string">"height"</span>));  <span class="hljs-comment">// 300px</span>
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><em>在<code>css</code>方法中，如果属性中带有“<code>-</code>”，例如：<code>font-size</code>，设置属性的时候必须要加上引号。</em></p>
<h3 id="articleHeader31">5.2 class 操作</h3>
<blockquote>
<code>class</code>是针对元素的<code>class</code>属性进行操作的，可以通过修改或者添加元素的类，从而达到修改样式的目的。</blockquote>
<p><strong>1、获取样式类和设置样式类</strong></p>
<p><strong>获取样式类：</strong></p>
<blockquote>因为<code>class</code>是标签的一个属性，所以可以用上面<code>attr()</code>获取属性的方法获取到它</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;one&quot; id=&quot;box1&quot;></div>
<script>
    $(function() {
        // 获取 box1 元素的 class 属性
        console.log($('#box1').attr('class'));  // one
    });
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"one"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 获取 box1 元素的 class 属性</span>
        <span class="hljs-built_in">console</span>.log($(<span class="hljs-string">'#box1'</span>).attr(<span class="hljs-string">'class'</span>));  <span class="hljs-comment">// one</span>
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p><strong>设置样式类：</strong></p>
<blockquote>还是通过<code>attr()</code>方法，为匹配标签添加样式类。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    .two {
        width: 300px;
        height: 300px;
        background: #f45;
    }
</style>

<!-- html 部分 -->
<div id=&quot;box2&quot;></div>

<!-- js 部分 -->
<script>
    $(function() {
        // 为 box2 添加一个叫做 two 的类
        $('#box2').attr('class', 'two');
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.two</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#f45</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 为 box2 添加一个叫做 two 的类</span>
        $(<span class="hljs-string">'#box2'</span>).attr(<span class="hljs-string">'class'</span>, <span class="hljs-string">'two'</span>);
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>替换样式类：</strong></p>
<blockquote>当标签元素原本有<code>class</code>类的时候，再去通过<code>attr()</code>方法设置类的时候，就会替换原本的类。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    .two {
        width: 300px;
        height: 300px;
        background: #f45;
    }
    .three {
        width: 500px;
        height: 500px;
        background: #2cd;
    }
</style>

<!-- html 部分 -->
<div class=&quot;two&quot; id=&quot;box3&quot;></div>

<!-- js 部分 -->
<script>
    $(function() {
        // 此时原本的类 two就会被 three替换了
        $('#box3').attr('class', 'three');
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.two</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#f45</span>;
    }
    <span class="hljs-selector-class">.three</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">500px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#2cd</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"two"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box3"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 此时原本的类 two就会被 three替换了</span>
        $(<span class="hljs-string">'#box3'</span>).attr(<span class="hljs-string">'class'</span>, <span class="hljs-string">'three'</span>);
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><em>但是很多时候我们需要的是追加的效果，即：保留“<code>two</code>”类的同时，再增加一个“<code>three</code>”类。这时候我们就可以使用<code>addClass()</code>方法。</em></p>
<p><strong>2、添加样式类 addClass()</strong></p>
<blockquote>添加样式类也叫追加样式类，是在原有类的基础上，继续添加一个类，<code>jQuery</code>中提供了专门的方法<code>addClass()</code>。</blockquote>
<p><strong>示例代码：</strong> <em>[ 29-jq样式操作-class方法追加样式类.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    .one {
        width: 200px;
        height: 200px;
        background: #adf;
        margin-bottom: 10px;
    }
    
    .two {
        border: 5px dashed #f45;
    }
</style>

<!-- html 部分 -->
<div id=&quot;box&quot; class=&quot;one&quot;></div>
<button id=&quot;btn&quot;>点击添加类&quot;two&quot;</button>

<!-- js 部分 -->
<script>
    $(function() {
        // 点击按钮 给box追加类
        $('#btn').click(function() {
            $('#box').addClass(&quot;two&quot;);
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.one</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#adf</span>;
        <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">10px</span>;
    }
    
    <span class="hljs-selector-class">.two</span> {
        <span class="hljs-attribute">border</span>: <span class="hljs-number">5px</span> dashed <span class="hljs-number">#f45</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"one"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>点击添加类"two"<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 点击按钮 给box追加类</span>
        $(<span class="hljs-string">'#btn'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-string">'#box'</span>).addClass(<span class="hljs-string">"two"</span>);
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677140?w=288&amp;h=252" src="https://static.alili.tech/img/remote/1460000013677140?w=288&amp;h=252" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>3、移除样式类 removeClass()</strong></p>
<blockquote>当一个类中有多个类名，想要移除其中某个的时候，可以使用<code>removeClass(neme)</code>方法，<code>name</code>就是要移除的类名。也可以同时移除多个类<code>removeClass(neme1 name2)</code>，中间用<code>空格</code>隔开。当<code>removeClass()</code>不传参数的时候，就会将<code>class</code>的值全部删除。</blockquote>
<p><strong>示例代码：</strong> <em>[ 30-jq样式操作-class方法移除样式类.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    .one {
        width: 200px;
        height: 200px;
        background: #adf;
        margin-bottom: 10px;
    }
    
    .two {
        border: 5px dashed #f45;
    }
</style>

<!-- html 部分 -->
<div id=&quot;box&quot; class=&quot;one two&quot;></div>
<button id=&quot;btn&quot;>点击移除类&quot;two&quot;</button>

<!-- js 部分 -->
<script>
    $(function() {
        // 点击按钮之后移除类“two”
        $('#btn').click(function() {
            $('#box').removeClass(&quot;two&quot;);
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.one</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#adf</span>;
        <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">10px</span>;
    }
    
    <span class="hljs-selector-class">.two</span> {
        <span class="hljs-attribute">border</span>: <span class="hljs-number">5px</span> dashed <span class="hljs-number">#f45</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"one two"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>点击移除类"two"<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 点击按钮之后移除类“two”</span>
        $(<span class="hljs-string">'#btn'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-string">'#box'</span>).removeClass(<span class="hljs-string">"two"</span>);
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677141?w=288&amp;h=252" src="https://static.alili.tech/img/remote/1460000013677141?w=288&amp;h=252" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>4、切换样式类 toggleClass()</strong></p>
<blockquote>
<code>toggleClass()</code>方法控制样式上的重复切换。如果类名存在则删除它，如果类名不存在则添加它。</blockquote>
<p><strong>示例代码：</strong> <em>[ 31-jq样式操作-class方法切换样式类.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    .one {
        width: 200px;
        height: 200px;
        background: #adf;
        margin-bottom: 10px;
    }
    .two {
        border: 5px dashed #f45;
    }
</style>

<!-- html 部分 -->
<div id=&quot;box&quot; class=&quot;one two&quot;></div>
<button id=&quot;btn&quot;>点击切换类&quot;two&quot;</button>

<!-- js 部分 -->
<script>
    $(function() {
        // 点击按钮切换类
        $('#btn').click(function() {
            $('#box').toggleClass(&quot;two&quot;);
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.one</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#adf</span>;
        <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">10px</span>;
    }
    <span class="hljs-selector-class">.two</span> {
        <span class="hljs-attribute">border</span>: <span class="hljs-number">5px</span> dashed <span class="hljs-number">#f45</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"one two"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>点击切换类"two"<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 点击按钮切换类</span>
        $(<span class="hljs-string">'#btn'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-string">'#box'</span>).toggleClass(<span class="hljs-string">"two"</span>);
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677142?w=288&amp;h=252" src="https://static.alili.tech/img/remote/1460000013677142?w=288&amp;h=252" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>5、判断是否包含一个类 hasClass()</strong></p>
<blockquote>
<code>hasClass(name)</code>用来判断是否包含一个类，<code>name</code>为需要判断的类名。返回值为<code>true</code>或<code>false</code>。</blockquote>
<p><strong>示例代码：</strong> <em>[ 32-jq样式操作-class方法判断是否包含类.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<div id=&quot;box&quot; class=&quot;one two&quot;></div>
<button id=&quot;btn&quot;>点击判断是否包含类&quot;two&quot;</button>

<!-- js 部分 -->
<script>
    $(function() {
        $('#btn').click(function() {
            // 点击按钮 判断是否包含类：“two”
            alert($('#box').hasClass(&quot;two&quot;)); // true
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"one two"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>点击判断是否包含类"two"<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-string">'#btn'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 点击按钮 判断是否包含类：“two”</span>
            alert($(<span class="hljs-string">'#box'</span>).hasClass(<span class="hljs-string">"two"</span>)); <span class="hljs-comment">// true</span>
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader32">5.4 常见的样式</h3>
<p><strong>1、opacity</strong></p>
<blockquote>
<code>opacity</code>在<code>jQ</code>中已经处理好兼容性问题了，所以可以直接使用：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('p').css('opacity','0.5');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$(<span class="hljs-string">'p'</span>).css(<span class="hljs-string">'opacity'</span>,<span class="hljs-string">'0.5'</span>);</code></pre>
<p><strong>2、height</strong></p>
<blockquote>如何获取一个元素的高？</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(element).css(&quot;height&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$(element).css(<span class="hljs-string">"height"</span>);</code></pre>
<p>在<code>jQ</code>中，还有一个<code>height()</code>方法，可以获取元素计算后的高度：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('p').height();  // 获取 p 元素的高度值" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$(<span class="hljs-string">'p'</span>).height();  <span class="hljs-comment">// 获取 p 元素的高度值</span></code></pre>
<p>想要获取页面可视区的高度：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(window).height();  // 获取页面可视区的高度" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$(<span class="hljs-built_in">window</span>).height();  <span class="hljs-comment">// 获取页面可视区的高度</span></code></pre>
<p><em>同样的，与之对应的还有一个<code>width()</code>方法，使用方法与<code>height()</code>一样。</em></p>
<h3 id="articleHeader33">5.5 关于元素定位的常用方法</h3>
<p><strong>1、offset()方法</strong></p>
<blockquote>它的作用是获取元素在当前视窗的相对偏移其中返回的对象包含两个属性，即<code>top</code>和<code>left</code>。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var $offset = $('p').offset();   // 获取 p 元素的 offset
var left = $offset.left;         // 获取左偏移
var top = $offset.top;           // 获取右偏移" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> $offset = $(<span class="hljs-string">'p'</span>).offset();   <span class="hljs-comment">// 获取 p 元素的 offset</span>
<span class="hljs-keyword">var</span> left = $offset.left;         <span class="hljs-comment">// 获取左偏移</span>
<span class="hljs-keyword">var</span> top = $offset.top;           <span class="hljs-comment">// 获取右偏移</span></code></pre>
<p><strong>2、position()方法</strong></p>
<blockquote>它的作用是获取元素相对于最近的一个<code>position</code>样式属性设置为<code>relative</code>或者<code>absolute</code>的祖先节点的相对偏移，与<code>offset()</code>一样，它返回的对象也包括两个属性，即<code>top</code> 和 <code>left</code>。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var $position = $('p').position();  // 获取 p 元素的 position
var left = $position.left;          // 获取左偏移
var left = $position.top;           // 获取右偏移" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> $position = $(<span class="hljs-string">'p'</span>).position();  <span class="hljs-comment">// 获取 p 元素的 position</span>
<span class="hljs-keyword">var</span> left = $position.left;          <span class="hljs-comment">// 获取左偏移</span>
<span class="hljs-keyword">var</span> left = $position.top;           <span class="hljs-comment">// 获取右偏移</span></code></pre>
<p><strong>3、scrollTop()方法和scrollLeft()方法</strong></p>
<blockquote>这两个方法分别是获取元素滚动条距离顶端距离，和左侧的距离。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var $scrollTop = $('p').scrollTop();  // 获取元素的滚动条距顶端的距离
var $scrollLeft = $('p').scrollLeft();  // 获取元素的滚动条距左侧的距离" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> $scrollTop = $(<span class="hljs-string">'p'</span>).scrollTop();  <span class="hljs-comment">// 获取元素的滚动条距顶端的距离</span>
<span class="hljs-keyword">var</span> $scrollLeft = $(<span class="hljs-string">'p'</span>).scrollLeft();  <span class="hljs-comment">// 获取元素的滚动条距左侧的距离</span></code></pre>
<blockquote>另外，可以为这两个方法指定一个参数，控制元素的滚动条，滚动到指定位置。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('textarea').scrollTop(300);   // 元素垂直滚动条滚动到指定位置" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$(<span class="hljs-string">'textarea'</span>).scrollTop(<span class="hljs-number">300</span>);   <span class="hljs-comment">// 元素垂直滚动条滚动到指定位置</span></code></pre>
<h3 id="articleHeader34">5.6 样式操作案例</h3>
<p><strong>1、tab栏案例</strong> <em>[ 33-jq样式操作-案例-tab栏.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<div id=&quot;box&quot;>
    <div id=&quot;title&quot;>
        <ul class=&quot;noselect&quot;>
            <li class=&quot;show&quot;>导航1</li>
            <li>导航2</li>
            <li>导航3</li>
            <li>导航4</li>
            <li>导航5</li>
        </ul>
    </div>
    <div id=&quot;content&quot;>
        <div class=&quot;show&quot;>
            <img src=&quot;../image/tab栏/01.jpg&quot; alt=&quot;&quot;>
        </div>
        <div>
            <img src=&quot;../image/tab栏/02.jpg&quot; alt=&quot;&quot;>
        </div>
        <div>
            <img src=&quot;../image/tab栏/03.jpg&quot; alt=&quot;&quot;>
        </div>
        <div>
            <img src=&quot;../image/tab栏/04.jpg&quot; alt=&quot;&quot;>
        </div>
        <div>
            <img src=&quot;../image/tab栏/05.jpg&quot; alt=&quot;&quot;>
        </div>
    </div>
</div>

<!-- js 部分-->
<script>
    $(function() {
        $('#title ul li').click(function() {
            // 隐式迭代 jQ自己会遍历
            // 当前点击的 li 添加类：show 他的兄弟元素移除show这个类
            $(this).addClass('show').siblings().removeClass('show');
            // 定义一个变量，储存当前点击的索引
            var index = $(this).index();
            // 点击li的时候，让下面的图片与之绑定
            $('#content div').eq(index).addClass('show').siblings().removeClass('show');
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"title"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"noselect"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"show"</span>&gt;</span>导航1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>导航2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>导航3<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>导航4<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>导航5<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"content"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"show"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/tab栏/01.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/tab栏/02.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/tab栏/03.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/tab栏/04.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/tab栏/05.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-string">'#title ul li'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 隐式迭代 jQ自己会遍历</span>
            <span class="hljs-comment">// 当前点击的 li 添加类：show 他的兄弟元素移除show这个类</span>
            $(<span class="hljs-keyword">this</span>).addClass(<span class="hljs-string">'show'</span>).siblings().removeClass(<span class="hljs-string">'show'</span>);
            <span class="hljs-comment">// 定义一个变量，储存当前点击的索引</span>
            <span class="hljs-keyword">var</span> index = $(<span class="hljs-keyword">this</span>).index();
            <span class="hljs-comment">// 点击li的时候，让下面的图片与之绑定</span>
            $(<span class="hljs-string">'#content div'</span>).eq(index).addClass(<span class="hljs-string">'show'</span>).siblings().removeClass(<span class="hljs-string">'show'</span>);
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012369858?w=521&amp;h=429" src="https://static.alili.tech/img/remote/1460000012369858?w=521&amp;h=429" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>2、固定导航栏</strong> <em>[ 33.1-样式操作-案例-固定导航栏.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
...
.fixed {
  position: fixed;
  top: 0;
  left: 0;
}
</style>

<!-- html 部分 -->
<div class=&quot;header&quot; id=&quot;header&quot;>
    顶部广告栏
</div>
<div class=&quot;nav&quot; id=&quot;nav&quot;>
    <ul>
        <li>HOME</li>
        <li>ABOUT</li>
        <li>SERVICES</li>
        <li>TEAM</li>
        <li>CONTACT</li>
    </ul>
</div>
<div class=&quot;content1&quot; id=&quot;con&quot;>
    内容1
</div>
<div class=&quot;content2&quot;>
    内容2
</div>
<div class=&quot;content3&quot;>
    内容3
</div>

<!-- js 部分 -->
<script>
    $(function() {
        // 给页面注册滚动事件
        $(window).scroll(function() {
            // 当滚动的高度大于等于 header的高度的时候
            if ($(window).scrollTop() >= $('.header').height()) {
                // 添加一个固定定位的类，让导航栏固定定位
                $('.nav').addClass('fixed');
                // 下面的盒子需要留下导航栏的高度，不然会顶上去
                $('.content1').css(&quot;margin-top&quot;, $('.nav').height());
            } else {
                // 滚动高度小于header的高度的时候 移除固定定位的类
                $('.nav').removeClass('fixed');
                // 将margin-top 恢复
                $('.content1').css(&quot;margin-top&quot;, 0);
            }
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
...
<span class="hljs-selector-class">.fixed</span> {
  <span class="hljs-attribute">position</span>: fixed;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"header"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"header"</span>&gt;</span>
    顶部广告栏
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"nav"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>HOME<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>ABOUT<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>SERVICES<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>TEAM<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>CONTACT<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content1"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"con"</span>&gt;</span>
    内容1
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content2"</span>&gt;</span>
    内容2
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content3"</span>&gt;</span>
    内容3
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 给页面注册滚动事件</span>
        $(<span class="hljs-built_in">window</span>).scroll(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 当滚动的高度大于等于 header的高度的时候</span>
            <span class="hljs-keyword">if</span> ($(<span class="hljs-built_in">window</span>).scrollTop() &gt;= $(<span class="hljs-string">'.header'</span>).height()) {
                <span class="hljs-comment">// 添加一个固定定位的类，让导航栏固定定位</span>
                $(<span class="hljs-string">'.nav'</span>).addClass(<span class="hljs-string">'fixed'</span>);
                <span class="hljs-comment">// 下面的盒子需要留下导航栏的高度，不然会顶上去</span>
                $(<span class="hljs-string">'.content1'</span>).css(<span class="hljs-string">"margin-top"</span>, $(<span class="hljs-string">'.nav'</span>).height());
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-comment">// 滚动高度小于header的高度的时候 移除固定定位的类</span>
                $(<span class="hljs-string">'.nav'</span>).removeClass(<span class="hljs-string">'fixed'</span>);
                <span class="hljs-comment">// 将margin-top 恢复</span>
                $(<span class="hljs-string">'.content1'</span>).css(<span class="hljs-string">"margin-top"</span>, <span class="hljs-number">0</span>);
            }
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623563?w=590&amp;h=786" src="https://static.alili.tech/img/remote/1460000012623563?w=590&amp;h=786" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>3、五星评分</strong> <em>[ 33.2-jq样式操作-案例-五星评分.html ]</em></p>
<p><strong>实现原理：</strong></p>
<ul>
<li>给所有的<code>li</code>注册鼠标经过事件，让自己和自己之前所有的兄弟元素变成实心的五角星；</li>
<li>给<code>ul</code>注册鼠标离开事件，让所有的<code>li</code>变成空心的五角心；</li>
<li>给<code>li</code>注册点击事件；</li>
<li>找到点击的带有<code>current</code>类的那个<code>li</code>，让它自己和前面的<code>li</code>变成实心的。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<ul class=&quot;comment&quot;>
    <li>☆</li>
    <li>☆</li>
    <li>☆</li>
    <li>☆</li>
    <li>☆</li>
</ul>

<!-- js 部分 -->
<script>
    $(function() {
        var wjx_k = &quot;☆&quot;;
        var wjx_s = &quot;★&quot;;
        // 1- 给所有的li注册鼠标经过事件，让自己和自己之前所有的兄弟元素变成实心的五角星
        $(&quot;.comment>li&quot;).on('mouseenter', function() {
            $(this).text(wjx_s).prevAll().text(wjx_s);
            $(this).nextAll().text(wjx_k);
        });
        // 2- 给ul注册鼠标离开事件，让所有的li变成空心的五角心
        $(&quot;.comment&quot;).on(&quot;mouseleave&quot;, function() {
            $(this).children().text(wjx_k);

            // 4- 找到点击的带有current类的那个li，让它自己和前面的li变成实心的
            $(&quot;li.current&quot;).text(wjx_s).prevAll().text(wjx_s);
        });

        // 3- 给li注册点击事件
        $(&quot;.comment>li&quot;).on(&quot;click&quot;, function() {
            // 给点击的li 添加一个类，其他的兄弟元素移除这个类
            $(this).addClass(&quot;current&quot;).siblings().removeClass(&quot;current&quot;);
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"comment"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>☆<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>☆<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>☆<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>☆<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>☆<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> wjx_k = <span class="hljs-string">"☆"</span>;
        <span class="hljs-keyword">var</span> wjx_s = <span class="hljs-string">"★"</span>;
        <span class="hljs-comment">// 1- 给所有的li注册鼠标经过事件，让自己和自己之前所有的兄弟元素变成实心的五角星</span>
        $(<span class="hljs-string">".comment&gt;li"</span>).on(<span class="hljs-string">'mouseenter'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-keyword">this</span>).text(wjx_s).prevAll().text(wjx_s);
            $(<span class="hljs-keyword">this</span>).nextAll().text(wjx_k);
        });
        <span class="hljs-comment">// 2- 给ul注册鼠标离开事件，让所有的li变成空心的五角心</span>
        $(<span class="hljs-string">".comment"</span>).on(<span class="hljs-string">"mouseleave"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-keyword">this</span>).children().text(wjx_k);

            <span class="hljs-comment">// 4- 找到点击的带有current类的那个li，让它自己和前面的li变成实心的</span>
            $(<span class="hljs-string">"li.current"</span>).text(wjx_s).prevAll().text(wjx_s);
        });

        <span class="hljs-comment">// 3- 给li注册点击事件</span>
        $(<span class="hljs-string">".comment&gt;li"</span>).on(<span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 给点击的li 添加一个类，其他的兄弟元素移除这个类</span>
            $(<span class="hljs-keyword">this</span>).addClass(<span class="hljs-string">"current"</span>).siblings().removeClass(<span class="hljs-string">"current"</span>);
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677143?w=235&amp;h=55" src="https://static.alili.tech/img/remote/1460000013677143?w=235&amp;h=55" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>4、回到顶部</strong> <em>[ 33.3-jq样式操作-案例-回到顶部.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<div>
    .
    内容
    .
</div>
<img src=&quot;../image/返回顶部/top.png&quot; alt=&quot;&quot; id=&quot;top&quot;>

<!-- js 部分 -->
<script>
    $(function() {
        // 监测滚动条位置
        $(window).on('scroll', function() {
            // 当滚动到位置大于等于500的时候 图片按钮显示
            if ($(window).scrollTop() >= 500) {
                $('img').stop().fadeIn(300);
            } else {
                // 否则隐藏掉
                $('img').stop().fadeOut(300);
            }
        });

        // 点击回到顶部
        $('img').on('click', function() {
            $('html,body').stop().animate({
                scrollTop: 0
            }, 1000);
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    .
    内容
    .
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/返回顶部/top.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"top"</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 监测滚动条位置</span>
        $(<span class="hljs-built_in">window</span>).on(<span class="hljs-string">'scroll'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 当滚动到位置大于等于500的时候 图片按钮显示</span>
            <span class="hljs-keyword">if</span> ($(<span class="hljs-built_in">window</span>).scrollTop() &gt;= <span class="hljs-number">500</span>) {
                $(<span class="hljs-string">'img'</span>).stop().fadeIn(<span class="hljs-number">300</span>);
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-comment">// 否则隐藏掉</span>
                $(<span class="hljs-string">'img'</span>).stop().fadeOut(<span class="hljs-number">300</span>);
            }
        });

        <span class="hljs-comment">// 点击回到顶部</span>
        $(<span class="hljs-string">'img'</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-string">'html,body'</span>).stop().animate({
                <span class="hljs-attr">scrollTop</span>: <span class="hljs-number">0</span>
            }, <span class="hljs-number">1000</span>);
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623565?w=502&amp;h=457" src="https://static.alili.tech/img/remote/1460000012623565?w=502&amp;h=457" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader35">6. jQuery 设置和获取HTML、文本和值</h2>
<h3 id="articleHeader36">6.1 html()方法</h3>
<blockquote>
<code>html()</code>用法其实类似于<code>javascript</code>中的<code>innerHTML</code>属性，可以用来设置或者读取某个元素中的<code>HTML</code>内容。</blockquote>
<p><strong>示例代码：</strong> <em>[ 34-jq文本操作-html方法.html ]</em> </p>
<p>获取时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p id=&quot;des&quot;><strong>这是一句意味深长的话</strong></p>

<script>
    $(function() {
        // 获取 p 标签里面的HTML 
        var $con = $('#des').html();
        console.log($con); // <strong>这是一句意味深长的话</strong>
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"des"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>这是一句意味深长的话<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 获取 p 标签里面的HTML </span>
        <span class="hljs-keyword">var</span> $con = $(<span class="hljs-string">'#des'</span>).html();
        <span class="hljs-built_in">console</span>.log($con); <span class="hljs-comment">// &lt;strong&gt;这是一句意味深长的话&lt;/strong&gt;</span>
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>设置时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p id=&quot;des2&quot;><strong>这是另一句意味深长的话</strong></p>
<script>
    $(function() {
        // 设置 p 标签里面的HTML 
        $('#des2').html('<i>你在看什么？</i>'); 
        // p标签里面的strong标签连同文字，会被i标签替换，并且i标签生效
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"des2"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>这是另一句意味深长的话<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 设置 p 标签里面的HTML </span>
        $(<span class="hljs-string">'#des2'</span>).html(<span class="hljs-string">'&lt;i&gt;你在看什么？&lt;/i&gt;'</span>); 
        <span class="hljs-comment">// p标签里面的strong标签连同文字，会被i标签替换，并且i标签生效</span>
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader37">6.2 text()方法</h3>
<blockquote>
<code>text()</code>用法其实类似于<code>javascript</code>中的<code>innerText</code>属性，可以用来设置或者读取某个元素中的<code>文本</code>内容。</blockquote>
<p><strong>示例代码：</strong> <em>[ 35-jq文本操作-text方法.html ]</em> </p>
<p>获取时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<p id=&quot;des&quot;>这是一句意味深长的话</p>

<script>
    $(function() {
        // 获取 p 标签里面的内容
        var $con = $('#des').text();
        console.log($con); // 这是一句意味深长的话
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"des"</span>&gt;</span>这是一句意味深长的话<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 获取 p 标签里面的内容</span>
        <span class="hljs-keyword">var</span> $con = $(<span class="hljs-string">'#des'</span>).text();
        <span class="hljs-built_in">console</span>.log($con); <span class="hljs-comment">// 这是一句意味深长的话</span>
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>设置时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p id=&quot;des2&quot;><strong>哈哈</strong>这是另一句意味深长的话</p>

<script>
    $(function() {
        // 设置 p 标签里面的内容 
        $('#des2').text('<i>你在看什么？</i>'); 
        // p标签里面的strong标签连同文字，会被i标签替换，并且i标签不会生效 转义成文本
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"des2"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>哈哈<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>这是另一句意味深长的话<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 设置 p 标签里面的内容 </span>
        $(<span class="hljs-string">'#des2'</span>).text(<span class="hljs-string">'&lt;i&gt;你在看什么？&lt;/i&gt;'</span>); 
        <span class="hljs-comment">// p标签里面的strong标签连同文字，会被i标签替换，并且i标签不会生效 转义成文本</span>
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><em>在 <code>js</code> 中，<code>innerText</code> 在火狐浏览器中是存在兼容性的，但是 <code>jQuery</code> 是一个很强大的库，这里的 <code>text()</code> 方法没有兼容性，<code>jQ</code> 已经帮我们封装好了。</em></p>
<h3 id="articleHeader38">6.3 val()方法</h3>
<blockquote>
<code>val()</code>用法类似于<code>Javascript</code>中的<code>value</code>属性，可以用来获取或者设置元素的值。无论元素是文本框还是单选框、下拉列表，他都可以返回元素的值。如果元素是多选，则包含一个包含所有选择的值的数组。</blockquote>
<p><strong>示例代码：</strong> <em>[ 36-jq文本操作-val方法.html ]</em></p>
<p>获取<code>value</code>值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<input type=&quot;text&quot; id=&quot;username&quot; value=&quot;请输入用户名&quot;>

<!-- js 部分 -->
<script>
    $(function() {
        // 获取 value 值
        var $username = $('#username').val();
        console.log($username); // 请输入用户名
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"username"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"请输入用户名"</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 获取 value 值</span>
        <span class="hljs-keyword">var</span> $username = $(<span class="hljs-string">'#username'</span>).val();
        <span class="hljs-built_in">console</span>.log($username); <span class="hljs-comment">// 请输入用户名</span>
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>设置<code>value</code>值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<input type=&quot;text&quot; id=&quot;password&quot; value=&quot;请输入密码&quot;>

<!-- js 部分 -->
<script>
    $(function() {
        var $password = $('#password').val('哈哈哈哈哈');  // 原来的内容会被替换掉
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"password"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"请输入密码"</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> $password = $(<span class="hljs-string">'#password'</span>).val(<span class="hljs-string">'哈哈哈哈哈'</span>);  <span class="hljs-comment">// 原来的内容会被替换掉</span>
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>案例：表单失去、获取焦点</strong> <em>[ 37-jq文本操作-表单案例.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
    $(function() {
        $('#username').focus(function() {
            // 获得焦点的时候，要判断表单里的内容是否是默认的内容，是的话才清空
            if ($(this).val() == '请输入用户名') {   // $(this).val() == this.defaultValue
                $(this).val(&quot;&quot;);
            }
        });
        $('#username').blur(function() {
            // 失去焦点的时候，要判断内容是否是空的，是的话给它加上默认value值
            if ($(this).val() == '') {
                $(this).val(&quot;请输入用户名&quot;);
            }
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-string">'#username'</span>).focus(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 获得焦点的时候，要判断表单里的内容是否是默认的内容，是的话才清空</span>
            <span class="hljs-keyword">if</span> ($(<span class="hljs-keyword">this</span>).val() == <span class="hljs-string">'请输入用户名'</span>) {   <span class="hljs-comment">// $(this).val() == this.defaultValue</span>
                $(<span class="hljs-keyword">this</span>).val(<span class="hljs-string">""</span>);
            }
        });
        $(<span class="hljs-string">'#username'</span>).blur(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 失去焦点的时候，要判断内容是否是空的，是的话给它加上默认value值</span>
            <span class="hljs-keyword">if</span> ($(<span class="hljs-keyword">this</span>).val() == <span class="hljs-string">''</span>) {
                $(<span class="hljs-keyword">this</span>).val(<span class="hljs-string">"请输入用户名"</span>);
            }
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677144?w=183&amp;h=46" src="https://static.alili.tech/img/remote/1460000013677144?w=183&amp;h=46" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>注意：</strong></p>
<ul>
<li>
<code>focus()</code>方法相当于<code>js</code>里的<code>onfocus</code>获取焦点事件。</li>
<li>
<code>blur()</code>方法相当于<code>js</code>里的<code>onblur</code>失去焦点事件。</li>
<li>判断的时候，我们用的直接是文本：“请输入用户名”，表单有个属性：<code>defaultValue</code>，它可以获取表单的默认值。</li>
</ul>
<p><a href="https://segmentfault.com/a/1190000013677253">下一篇：jQuery 入门详解（二）</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jQuery 入门详解（一）

## 原文链接
[https://segmentfault.com/a/1190000013677113](https://segmentfault.com/a/1190000013677113)

