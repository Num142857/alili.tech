---
title: 'JavaScript 基础知识 - BOM篇' 
date: 2018-12-20 2:30:10
hidden: true
slug: rf3lx5n2qbj
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000012575821?w=1920&amp;h=1080" src="https://static.alili.tech/img/remote/1460000012575821?w=1920&amp;h=1080" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">前言</h2>
<p>本篇文章是<code>JavaScript</code>基础知识的<code>BOM</code>篇，如果前面的<a href="https://segmentfault.com/a/1190000012369840">《JavaScript基础知识-DOM篇》</a>看完了，现在就可以学习<code>BOM</code>了。</p>
<p><strong>注意：</strong> 所有的案例都在这里<a href="https://pan.baidu.com/s/1eSGoW9c" rel="nofollow noreferrer" target="_blank">链接: </a> 提取密码密码: <code>yvxo</code>，文章中的每个案例后面都有对应的序号。</p>
<h2 id="articleHeader1">1. BOM 基本概念</h2>
<blockquote>
<code>BOM</code>(Browser Object Model)：浏览器对象模型，提供了一套操作浏览器的工具。</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012575822" src="https://static.alili.tech/img/remote/1460000012575822" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><em><code>BOM</code>中包含的内容很多，但是有很多东西是用不到的。在<code>BOM</code>中我们需要掌握<code>定时器</code>。</em></p>
<h2 id="articleHeader2">2. window 对象</h2>
<ul>
<li>
<code>window</code>对象是一个全局对象，也可以说是<code>JavaScript</code>中的顶级对象</li>
<li>像<code>document</code>、<code>alert()</code>、<code>console.log()</code>这些都是<code>window</code>的属性，其实<code>BOM</code>中基本所有的属性和方法都是属性<code>window</code>的。</li>
<li>所有定义在全局作用域中的变量、函数都会变成<code>window</code>对象的属性和方法</li>
<li>
<code>window</code>对象下的属性和方法调用的时候可以省略<code>window</code>
</li>
</ul>
<p><strong>示例代码：</strong> <em>[01-window对象.html]</em></p>
<p>普通函数调用的时候：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &quot;项羽&quot;;
var age = &quot;28&quot;;

function Teacher() {
    this.name = &quot;虞姬&quot;;
    this.age = 22;
    console.log(this);
}
// 没有 new 的时候就相当于普通函数调用
var obj = Teacher(); // 打印的this 指的是全局对象window
console.log(name);   // 虞姬
console.log(age);    // 22
/* 
为什么会是 虞姬 和 22 ？ 不是定义了一个全局变量name = &quot;项羽&quot;吗？
因为 Teacher作为一个普通函数调用，它里面的this指的就是全局对象
js 代码一步步往下执行，一开始是定义了一个name=&quot;项羽&quot;的全局变量，
但是下面的this有将&quot;虞姬&quot;指向了全局对象，所以最后打印的是虞姬 22
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> name = <span class="hljs-string">"项羽"</span>;
<span class="hljs-keyword">var</span> age = <span class="hljs-string">"28"</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Teacher</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">"虞姬"</span>;
    <span class="hljs-keyword">this</span>.age = <span class="hljs-number">22</span>;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
}
<span class="hljs-comment">// 没有 new 的时候就相当于普通函数调用</span>
<span class="hljs-keyword">var</span> obj = Teacher(); <span class="hljs-comment">// 打印的this 指的是全局对象window</span>
<span class="hljs-built_in">console</span>.log(name);   <span class="hljs-comment">// 虞姬</span>
<span class="hljs-built_in">console</span>.log(age);    <span class="hljs-comment">// 22</span>
<span class="hljs-comment">/* 
为什么会是 虞姬 和 22 ？ 不是定义了一个全局变量name = "项羽"吗？
因为 Teacher作为一个普通函数调用，它里面的this指的就是全局对象
js 代码一步步往下执行，一开始是定义了一个name="项羽"的全局变量，
但是下面的this有将"虞姬"指向了全局对象，所以最后打印的是虞姬 22
*/</span></code></pre>
<p>构造函数的时候：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &quot;项羽&quot;;
var age = &quot;28&quot;;

function Teacher() {
    this.name = &quot;虞姬&quot;;
    this.age = 22;
    console.log(this);
}
// 没有 new 的时候就相当于普通函数调用
var obj = new Teacher(); // 打印的this 指的是构造函数对象 Teacher
console.log(name); // 项羽
console.log(age); // 28
/*
Teacher作为构造函数的时候，它内部的this指向的是 对象Teacher
此时的全局变量name=&quot;项羽&quot; 将不会再受this的影响，所以，打印的是 项羽 28
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> name = <span class="hljs-string">"项羽"</span>;
<span class="hljs-keyword">var</span> age = <span class="hljs-string">"28"</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Teacher</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">"虞姬"</span>;
    <span class="hljs-keyword">this</span>.age = <span class="hljs-number">22</span>;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
}
<span class="hljs-comment">// 没有 new 的时候就相当于普通函数调用</span>
<span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">new</span> Teacher(); <span class="hljs-comment">// 打印的this 指的是构造函数对象 Teacher</span>
<span class="hljs-built_in">console</span>.log(name); <span class="hljs-comment">// 项羽</span>
<span class="hljs-built_in">console</span>.log(age); <span class="hljs-comment">// 28</span>
<span class="hljs-comment">/*
Teacher作为构造函数的时候，它内部的this指向的是 对象Teacher
此时的全局变量name="项羽" 将不会再受this的影响，所以，打印的是 项羽 28
*/</span></code></pre>
<h3 id="articleHeader3">2.1 window.onload</h3>
<blockquote>
<code>window.onload</code>事件会在窗体加载完成后执行，通常我们称之为<code>入口函数</code>。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onload = function(){
    //里面的代码会在窗体加载完成后执行。
    //窗体加载完成包括文档树的加载、还有图片、文件的加载完成。
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//里面的代码会在窗体加载完成后执行。</span>
    <span class="hljs-comment">//窗体加载完成包括文档树的加载、还有图片、文件的加载完成。</span>
}</code></pre>
<p><strong>注意：</strong></p>
<ul>
<li>如果有图片加载，那么代码一定要写到<code>window.onload</code>里面，否则会出现图片没有加载完成，获取到的宽度和高度不对的情况。</li>
<li>浏览器会对页面的加载做优化，在加载图片的时候，图片的引入会延迟。</li>
<li>一个页面中不能有两个<code>onload</code>函数，写在下面的会覆盖掉上面的。</li>
</ul>
<p><strong>示例代码：</strong> <em>[02-window.onload对象(一)]</em></p>
<p>为什么下面的代码会报错呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
    <title>window.onload</title>
    <!-- script写在上面直接报错 -->
    <!--  
        因为代码是一步步向下执行的，在head里的script获取btn或者box的时候，
        是获取不到的，因为下面的页面结构还没加载到：
    -->
    <script>
        var btn = document.getElementById('btn');
        var box = document.getElementById('box');
        btn.onclick = function() {
            box.style.width = &quot;500px&quot;;
            box.style.height = &quot;500px&quot;;
        }
    </script>
</head>

<body>
    <button id=&quot;btn&quot;>按钮</button>
    <div id=&quot;box&quot; style=&quot;width:200px;height:200px;background:pink;&quot;></div>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>window.onload<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- script写在上面直接报错 --&gt;</span>
    <span class="hljs-comment">&lt;!--  
        因为代码是一步步向下执行的，在head里的script获取btn或者box的时候，
        是获取不到的，因为下面的页面结构还没加载到：
    --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>);
        <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);
        btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            box.style.width = <span class="hljs-string">"500px"</span>;
            box.style.height = <span class="hljs-string">"500px"</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>按钮<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:200px;height:200px;background:pink;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>此时就可以用<code>window.onload</code>入口函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
    <title>window.onload</title>
    
    <script>
    // 这里定义了一个入口函数，就是说等页面所有文档树加载完才会执行这里面的代码：
        window.onload = function() {
            var btn = document.getElementById('btn');
            var box = document.getElementById('box');
            btn.onclick = function() {
                box.style.width = &quot;500px&quot;;
                box.style.height = &quot;500px&quot;;
            }
        }
    </script>
</head>

<body>
    <button id=&quot;btn&quot;>按钮</button>
    <div id=&quot;box&quot; style=&quot;width:200px;height:200px;background:pink;&quot;></div>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>window.onload<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">// 这里定义了一个入口函数，就是说等页面所有文档树加载完才会执行这里面的代码：</span>
        <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>);
            <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);
            btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                box.style.width = <span class="hljs-string">"500px"</span>;
                box.style.height = <span class="hljs-string">"500px"</span>;
            }
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>按钮<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:200px;height:200px;background:pink;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>示例代码：图片加载</strong> <em>[03-window.onload对象(二)]</em></p>
<p>为什么获取的宽度和高度都为<code>0</code>呢，<code>js</code>代码不是写在最后面了吗？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <!-- html 部分-->
    <img id=&quot;img&quot; src=&quot;../image/levi.jpg&quot; alt=&quot;&quot;>

    <!-- js 部分 -->
    <script>
        var img = document.getElementById('img');
        console.log(img.width);     // 0
        console.log(img.height);    // 0
    </script>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- html 部分--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"img"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/levi.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> img = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'img'</span>);
        <span class="hljs-built_in">console</span>.log(img.width);     <span class="hljs-comment">// 0</span>
        <span class="hljs-built_in">console</span>.log(img.height);    <span class="hljs-comment">// 0</span>
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012575823" src="https://static.alili.tech/img/remote/1460000012575823" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>这是因为，浏览器会对页面的加载做优化，在加载图片的时候，图片的引入会延迟。这时候需要用<code>window.onload</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<head>
    <script>
    // 当文档加载完成的时候执行，如果有图片，等到图片也加载完成才会执行。
        window.onload = function() {
            var img = document.getElementById('img');
            console.log(img.width);
            console.log(img.height);
        }
    </script>
</head>

<body>
    <img id=&quot;img&quot; src=&quot;../image/levi.jpg&quot; alt=&quot;&quot;>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">// 当文档加载完成的时候执行，如果有图片，等到图片也加载完成才会执行。</span>
        <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> img = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'img'</span>);
            <span class="hljs-built_in">console</span>.log(img.width);
            <span class="hljs-built_in">console</span>.log(img.height);
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"img"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/levi.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012575824" src="https://static.alili.tech/img/remote/1460000012575824" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">2.2 window.open</h3>
<blockquote>
<code>window.open()</code> 打开一个窗口</blockquote>
<p><strong>语法</strong>：<code>window.open(url, [name], [features]);</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="参数1：需要载入的url地址
参数2：新窗口的名称
       _self:在当前窗口打开
       _blank:在新的窗口打开
参数3：窗口的属性，指定窗口的大小
返回值：会返回刚刚创建的那个窗口，用于关闭" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>参数<span class="hljs-number">1</span>：需要载入的url地址
参数<span class="hljs-number">2</span>：新窗口的名称
<span class="hljs-symbol">       _self:</span>在当前窗口打开
<span class="hljs-symbol">       _blank:</span>在新的窗口打开
参数<span class="hljs-number">3</span>：窗口的属性，指定窗口的大小
返回值：会返回刚刚创建的那个窗口，用于关闭</code></pre>
<p><strong>示例代码：</strong> <em>[04-window.open.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<button id=&quot;btn&quot;>点击在新窗口跳转到百度</button>
<button id=&quot;btn2&quot;>点击在本窗口跳转到百度</button>

<!-- js 部分 -->
<script>
    var btn = document.getElementById('btn');
    var btn2 = document.getElementById('btn2');

    btn.onclick = function() {
        // 在新窗口打开，新窗口的大小为300 * 300
        var newWin = window.open(&quot;http://www.baidu.com&quot;, &quot;_blank&quot;, &quot;width=300,height=300&quot;);
    }

    btn2.onclick = function() {
        // 在当前窗口打开，新窗口的大小根据当前窗口改变的，设置的无效
        var newWin = window.open(&quot;http://www.baidu.com&quot;, &quot;_self&quot;);
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>点击在新窗口跳转到百度<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn2"</span>&gt;</span>点击在本窗口跳转到百度<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>);
    <span class="hljs-keyword">var</span> btn2 = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn2'</span>);

    btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 在新窗口打开，新窗口的大小为300 * 300</span>
        <span class="hljs-keyword">var</span> newWin = <span class="hljs-built_in">window</span>.open(<span class="hljs-string">"http://www.baidu.com"</span>, <span class="hljs-string">"_blank"</span>, <span class="hljs-string">"width=300,height=300"</span>);
    }

    btn2.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 在当前窗口打开，新窗口的大小根据当前窗口改变的，设置的无效</span>
        <span class="hljs-keyword">var</span> newWin = <span class="hljs-built_in">window</span>.open(<span class="hljs-string">"http://www.baidu.com"</span>, <span class="hljs-string">"_self"</span>);
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012575825?w=550&amp;h=393" src="https://static.alili.tech/img/remote/1460000012575825?w=550&amp;h=393" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">2.3 window.close</h3>
<blockquote>
<code>window.close()</code> 关闭一个窗口 在火狐浏览器下会失效<a href="http://www.jb51.net/article/36523.htm" rel="nofollow noreferrer" target="_blank">解决办法</a>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="newWin.close()；//newWin是刚刚创建的那个窗口
window.close(); //把当前窗口给关闭了" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>newWin.<span class="hljs-built_in">close</span>()；<span class="hljs-comment">//newWin是刚刚创建的那个窗口</span>
<span class="hljs-built_in">window</span>.<span class="hljs-built_in">close</span>(); <span class="hljs-comment">//把当前窗口给关闭了</span></code></pre>
<p><strong>示例代码：</strong> <em>[05-window.close.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<button id=&quot;btn&quot;>点击在新窗口跳转到百度</button>
<button id=&quot;btn2&quot;>点击在本窗口跳转到百度</button>
<button id=&quot;btn3&quot;>点击关闭打开的新窗口</button>
<button id=&quot;btn4&quot;>点击关闭本窗口</button>

<!-- js 部分 -->
<script>
    var btn = document.getElementById('btn');
    var btn2 = document.getElementById('btn2');

    btn.onclick = function() {
        // 在新窗口打开，新窗口的大小为300 * 300
        var newWin = window.open(&quot;http://www.baidu.com&quot;, &quot;_blank&quot;, &quot;width=300,height=300&quot;);

        btn3.onclick = function() {
            // 关闭打开的新窗口
            newWin.close();
        }
    }
    btn2.onclick = function() {
        // 在当前窗口打开，新窗口的大小根据当前窗口改变的，设置的无效
        var newWin2 = window.open(&quot;http://www.baidu.com&quot;, &quot;_self&quot;);

    }
    btn4.onclick = function() {
        // 关闭本窗口
        window.close();
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>点击在新窗口跳转到百度<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn2"</span>&gt;</span>点击在本窗口跳转到百度<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn3"</span>&gt;</span>点击关闭打开的新窗口<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn4"</span>&gt;</span>点击关闭本窗口<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>);
    <span class="hljs-keyword">var</span> btn2 = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn2'</span>);

    btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 在新窗口打开，新窗口的大小为300 * 300</span>
        <span class="hljs-keyword">var</span> newWin = <span class="hljs-built_in">window</span>.open(<span class="hljs-string">"http://www.baidu.com"</span>, <span class="hljs-string">"_blank"</span>, <span class="hljs-string">"width=300,height=300"</span>);

        btn3.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 关闭打开的新窗口</span>
            newWin.close();
        }
    }
    btn2.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 在当前窗口打开，新窗口的大小根据当前窗口改变的，设置的无效</span>
        <span class="hljs-keyword">var</span> newWin2 = <span class="hljs-built_in">window</span>.open(<span class="hljs-string">"http://www.baidu.com"</span>, <span class="hljs-string">"_self"</span>);

    }
    btn4.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 关闭本窗口</span>
        <span class="hljs-built_in">window</span>.close();
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012575826?w=603&amp;h=390" src="https://static.alili.tech/img/remote/1460000012575826?w=603&amp;h=390" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">3. 定时器</h2>
<blockquote>定时器里面不能用<code>this</code>，因为在定时器里面，<code>this</code>，指向的是全局对象<code>window</code>。</blockquote>
<h3 id="articleHeader7">3.1 延时定时器</h3>
<blockquote>延时定时器可以让代码延迟一段时间之后才执行。定时器不是我们调用，我们只需要把函数的地址传过去，时间到了，<code>window</code>会自己调用。</blockquote>
<p><strong>1、设置延时定时器</strong></p>
<p><strong>语法</strong>：<code>setTimeOut(callback, time);</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="参数1：回调函数，时间到了就会执行。
参数2：延时的时间 单位：毫秒
返 回：定时器的id，用于清除" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>参数<span class="hljs-number">1</span>：回调函数，时间到了就会执行。
参数<span class="hljs-number">2</span>：延时的时间 单位：毫秒
返 回：定时器的id，用于清除</code></pre>
<p><strong>示例代码：</strong> <em>[06-延时定时器.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var timer = setTimeOut(function(){
    //1秒后将执行的代码。
    console.log(&quot;哈哈&quot;);
}, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> timer = setTimeOut(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//1秒后将执行的代码。</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"哈哈"</span>);
}, <span class="hljs-number">1000</span>);</code></pre>
<p><strong>2.清除延时定时器</strong></p>
<p><strong>语法</strong>：<code>clearTimeOut(timerId);</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 参数：定时器id
clearTimeOut(timerId);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 参数：定时器id</span>
clearTimeOut(timerId);</code></pre>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<button id=&quot;btn1&quot;>开启</button>
<button id=&quot;btn2&quot;>关闭</button>

<!-- js 部分 -->
<script>
    var btn1 = document.getElementById(&quot;btn1&quot;);
    var btn2 = document.getElementById(&quot;btn2&quot;);
    // 定义一个全局变量
    var timeId; 
    // 开启定时器
    btn1.onclick = function() {
        //设置了一个定时器，会返回一个定时器id
        timeId = setTimeout(function() {
            // 两秒后在页面显示 Boom！
            document.write(&quot;<h1> Boom! </h1>&quot;);
        }, 2000);
    }
        
    //  清除定时器
    btn2.onclick = function() {
        //清除定时器, 需要定时器id
        clearTimeout(timeId);
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn1"</span>&gt;</span>开启<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn2"</span>&gt;</span>关闭<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> btn1 = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"btn1"</span>);
    <span class="hljs-keyword">var</span> btn2 = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"btn2"</span>);
    <span class="hljs-comment">// 定义一个全局变量</span>
    <span class="hljs-keyword">var</span> timeId; 
    <span class="hljs-comment">// 开启定时器</span>
    btn1.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//设置了一个定时器，会返回一个定时器id</span>
        timeId = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 两秒后在页面显示 Boom！</span>
            <span class="hljs-built_in">document</span>.write(<span class="hljs-string">"&lt;h1&gt; Boom! &lt;/h1&gt;"</span>);
        }, <span class="hljs-number">2000</span>);
    }
        
    <span class="hljs-comment">//  清除定时器</span>
    btn2.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//清除定时器, 需要定时器id</span>
        clearTimeout(timeId);
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：两秒后执行代码，两秒钟之内清除定时器，就不会执行</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012575827?w=323&amp;h=189" src="https://static.alili.tech/img/remote/1460000012575827?w=323&amp;h=189" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader8">3.2 间歇定时器</h3>
<blockquote>间歇定时器让定时器每隔一段时间就会执行一次，并且会一直执行，到清除定时器为止。</blockquote>
<p><strong>1、设置间歇定时器</strong></p>
<p><strong>语法：</strong><code>var intervalID = setInterval(func, delay);</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="参数1：重复执行的函数
参数2：每次延迟的毫秒数
返 回：定时器的id，用于清除" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>参数<span class="hljs-number">1</span>：重复执行的函数
参数<span class="hljs-number">2</span>：每次延迟的毫秒数
返 回：定时器的id，用于清除</code></pre>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var timer = setInterval(function(){
    //重复执行的代码。
}, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//重复执行的代码。</span>
}, <span class="hljs-number">1000</span>);</code></pre>
<p><strong>2、清除间歇定时器</strong></p>
<p><strong>语法：</strong><code>clearInterval(intervalID);</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="参数：定时器id" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">参数：定时器<span class="hljs-built_in">id</span></code></pre>
<p><strong>示例代码：</strong> <em>[07-间歇定时器.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<button id=&quot;btn1&quot;>开启</button>
<button id=&quot;btn2&quot;>关闭</button>

<!-- js 部分 -->
<script>
    var btn1 = document.getElementById(&quot;btn1&quot;);
    var btn2 = document.getElementById(&quot;btn2&quot;);
    // 定义一个全局变量 存放定时器
    var timer;
    // 开启定时器
    btn1.onclick = function() {
        //设置了一个定时器，会返回一个定时器 id
        timer = setInterval(function() {
            // 每隔1秒 就会创建一个 h2 标签
            var tag = document.createElement(&quot;h2&quot;);
            tag.innerHTML = &quot;我是间歇定时器&quot;;
            document.body.appendChild(tag);
        }, 1000);
    };
    //  清除定时器
    btn2.onclick = function() {
        //清除定时器, 需要定时器id
        clearInterval(timer);
        document.body.innerHTML = &quot;<h1>间歇定时器已清除</h1>&quot;;
    };
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn1"</span>&gt;</span>开启<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn2"</span>&gt;</span>关闭<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> btn1 = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"btn1"</span>);
    <span class="hljs-keyword">var</span> btn2 = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"btn2"</span>);
    <span class="hljs-comment">// 定义一个全局变量 存放定时器</span>
    <span class="hljs-keyword">var</span> timer;
    <span class="hljs-comment">// 开启定时器</span>
    btn1.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//设置了一个定时器，会返回一个定时器 id</span>
        timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 每隔1秒 就会创建一个 h2 标签</span>
            <span class="hljs-keyword">var</span> tag = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"h2"</span>);
            tag.innerHTML = <span class="hljs-string">"我是间歇定时器"</span>;
            <span class="hljs-built_in">document</span>.body.appendChild(tag);
        }, <span class="hljs-number">1000</span>);
    };
    <span class="hljs-comment">//  清除定时器</span>
    btn2.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//清除定时器, 需要定时器id</span>
        clearInterval(timer);
        <span class="hljs-built_in">document</span>.body.innerHTML = <span class="hljs-string">"&lt;h1&gt;间歇定时器已清除&lt;/h1&gt;"</span>;
    };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012575829?w=383&amp;h=257" src="https://static.alili.tech/img/remote/1460000012575829?w=383&amp;h=257" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader9">2.3 定时器综合练习</h3>
<p><strong>1、获取短信验证码案例</strong> <em>[08-定时器综合练习-获取短信验证码.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分-->
<input type=&quot;button&quot; value=&quot;点击获取短信验证码&quot; id=&quot;btn&quot;>

<!-- js 部分 -->
<script>
    var btn = document.getElementById('btn');
    var timer = null;
    btn.onclick = function() {
        // 倒计时的秒数
        var num = 5;
        // 当按钮点击的时候 禁用button
        btn.disabled = true;

        timer = setInterval(function() {
            // 每隔一秒修改num的值
            num--;
            // 修改btn的value值  这里不可以用this 因为定时器里的this指的是window对象
            btn.value = num + &quot;秒后可再次发送&quot;;

            // 当num = 0 秒的时候，清除定时器
            if (num == 0) {
                clearInterval(timer);
                btn.disabled = false;
                btn.value = &quot;点击获取短信验证码&quot;;
            }
        }, 1000);
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"点击获取短信验证码"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>);
    <span class="hljs-keyword">var</span> timer = <span class="hljs-literal">null</span>;
    btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 倒计时的秒数</span>
        <span class="hljs-keyword">var</span> num = <span class="hljs-number">5</span>;
        <span class="hljs-comment">// 当按钮点击的时候 禁用button</span>
        btn.disabled = <span class="hljs-literal">true</span>;

        timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 每隔一秒修改num的值</span>
            num--;
            <span class="hljs-comment">// 修改btn的value值  这里不可以用this 因为定时器里的this指的是window对象</span>
            btn.value = num + <span class="hljs-string">"秒后可再次发送"</span>;

            <span class="hljs-comment">// 当num = 0 秒的时候，清除定时器</span>
            <span class="hljs-keyword">if</span> (num == <span class="hljs-number">0</span>) {
                clearInterval(timer);
                btn.disabled = <span class="hljs-literal">false</span>;
                btn.value = <span class="hljs-string">"点击获取短信验证码"</span>;
            }
        }, <span class="hljs-number">1000</span>);
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012575830?w=147&amp;h=46" src="https://static.alili.tech/img/remote/1460000012575830?w=147&amp;h=46" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><strong>2、倒计时案例</strong> <em>[09-定时器综合练习-倒计时案例.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    .time {
        width: 160px;
        height: 40px;
        margin: 100px auto;
        line-height: 40px;
        font-size: 24px;
        font-weight: 700;
    }
    #h,
    #m,
    #s {
        float: left;
        display: block;
        width: 40px;
        height: 40px;
        text-align: center;
        background-color: #F9F9F9;
        box-shadow: 1px 1px 2px #616161;
        color: #453246;
        border-radius: 5px;
    }
    .split {
        width: 20px;
        float: left;
        text-align: center;
    }
</style>

<!-- html 部分 -->
<div class=&quot;time&quot;>
    <span id=&quot;h&quot;>00</span>
    <span class=&quot;split&quot;>:</span>
    <span id=&quot;m&quot;>00</span>
    <span class=&quot;split&quot;>:</span>
    <span id=&quot;s&quot;>00</span>
</div>

<!-- js 部分 -->
<script>
    var h = document.getElementById('h');
    var m = document.getElementById('m');
    var s = document.getElementById('s');

    setTime();
    var timer = setInterval(setTime, 1000);

    function setTime() {
        // 获取当前时间
        var newTime = new Date(); // 此时测试的时间是 2017-12-11 15:24:00(根据本地时间一直在变)
        // 定义一个未来的时间
        var futureTime = new Date(&quot;2017-12-11 16:30:31&quot;);
        // 获取时间差 单位是毫秒 首先我们需要转成秒 而且时间戳获取的时候 有很多小数 需要取整一下
        var time = parseInt((futureTime - newTime) / 1000);

        // time现在已经是秒了  我们需要将它转换成小时
        // 1h = 3600s
        var hours = parseInt(time / 3600);
        // 将获取的小时添加到页面中 
        // 注意因为时钟是两位数，这里的小时可能只是一个个位数，所以需要拼接一个 &quot;0&quot;
        // 因为 分钟、秒都需要拼0，所以我们可以封装一个函数
        h.innerHTML = addZero(hours);

        // 获取分钟
        // 先将 time 转换成分钟 再去取余60
        var minutes = parseInt(time / 60) % 60;
        // 将获取的分钟添加到页面中 
        m.innerHTML = addZero(minutes);

        // 获取秒
        var seconds = time % 60;
        s.innerHTML = addZero(seconds);

        // 还要做个判断 当time这个时间差小于等于0的时候 清除定时器
        if (time <= 0) {
            // 如果不置0的话 还会继续减
            time = 0;
            clearInterval(timer);
        }
    }

    // 拼接 0 函数
    function addZero(num) {
        // 如果传进来的参数小于10 就要给他拼 0
        return num < 10 ? '0' + num : num;
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.time</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">160px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">24px</span>;
        <span class="hljs-attribute">font-weight</span>: <span class="hljs-number">700</span>;
    }
    <span class="hljs-selector-id">#h</span>,
    <span class="hljs-selector-id">#m</span>,
    <span class="hljs-selector-id">#s</span> {
        <span class="hljs-attribute">float</span>: left;
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#F9F9F9</span>;
        <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">1px</span> <span class="hljs-number">1px</span> <span class="hljs-number">2px</span> <span class="hljs-number">#616161</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#453246</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
    }
    <span class="hljs-selector-class">.split</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">float</span>: left;
        <span class="hljs-attribute">text-align</span>: center;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"time"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"h"</span>&gt;</span>00<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"split"</span>&gt;</span>:<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"m"</span>&gt;</span>00<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"split"</span>&gt;</span>:<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"s"</span>&gt;</span>00<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> h = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'h'</span>);
    <span class="hljs-keyword">var</span> m = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'m'</span>);
    <span class="hljs-keyword">var</span> s = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'s'</span>);

    setTime();
    <span class="hljs-keyword">var</span> timer = setInterval(setTime, <span class="hljs-number">1000</span>);

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setTime</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 获取当前时间</span>
        <span class="hljs-keyword">var</span> newTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(); <span class="hljs-comment">// 此时测试的时间是 2017-12-11 15:24:00(根据本地时间一直在变)</span>
        <span class="hljs-comment">// 定义一个未来的时间</span>
        <span class="hljs-keyword">var</span> futureTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">"2017-12-11 16:30:31"</span>);
        <span class="hljs-comment">// 获取时间差 单位是毫秒 首先我们需要转成秒 而且时间戳获取的时候 有很多小数 需要取整一下</span>
        <span class="hljs-keyword">var</span> time = <span class="hljs-built_in">parseInt</span>((futureTime - newTime) / <span class="hljs-number">1000</span>);

        <span class="hljs-comment">// time现在已经是秒了  我们需要将它转换成小时</span>
        <span class="hljs-comment">// 1h = 3600s</span>
        <span class="hljs-keyword">var</span> hours = <span class="hljs-built_in">parseInt</span>(time / <span class="hljs-number">3600</span>);
        <span class="hljs-comment">// 将获取的小时添加到页面中 </span>
        <span class="hljs-comment">// 注意因为时钟是两位数，这里的小时可能只是一个个位数，所以需要拼接一个 "0"</span>
        <span class="hljs-comment">// 因为 分钟、秒都需要拼0，所以我们可以封装一个函数</span>
        h.innerHTML = addZero(hours);

        <span class="hljs-comment">// 获取分钟</span>
        <span class="hljs-comment">// 先将 time 转换成分钟 再去取余60</span>
        <span class="hljs-keyword">var</span> minutes = <span class="hljs-built_in">parseInt</span>(time / <span class="hljs-number">60</span>) % <span class="hljs-number">60</span>;
        <span class="hljs-comment">// 将获取的分钟添加到页面中 </span>
        m.innerHTML = addZero(minutes);

        <span class="hljs-comment">// 获取秒</span>
        <span class="hljs-keyword">var</span> seconds = time % <span class="hljs-number">60</span>;
        s.innerHTML = addZero(seconds);

        <span class="hljs-comment">// 还要做个判断 当time这个时间差小于等于0的时候 清除定时器</span>
        <span class="hljs-keyword">if</span> (time &lt;= <span class="hljs-number">0</span>) {
            <span class="hljs-comment">// 如果不置0的话 还会继续减</span>
            time = <span class="hljs-number">0</span>;
            clearInterval(timer);
        }
    }

    <span class="hljs-comment">// 拼接 0 函数</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addZero</span>(<span class="hljs-params">num</span>) </span>{
        <span class="hljs-comment">// 如果传进来的参数小于10 就要给他拼 0</span>
        <span class="hljs-keyword">return</span> num &lt; <span class="hljs-number">10</span> ? <span class="hljs-string">'0'</span> + num : num;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012575831?w=210&amp;h=70" src="https://static.alili.tech/img/remote/1460000012575831?w=210&amp;h=70" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>3、电子表案例</strong> <em>[10-定时器综合练习-电子表.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    #box {
        width: 300px;
        height: 50px;
        background-color: #F9F9F9;
        box-shadow: 1px 1px 2px #616161;
        color: #453246;
        border-radius: 5px;
        margin: 100px auto;
        font: bold 24px/50px 楷体;
        text-align: center;
    }
</style>

<!-- html 部分 -->
<div id=&quot;box&quot;></div>

<!-- js 部分 -->
<script>
    var box = document.getElementById('box');
    // 封装一个获取当前时间的函数
    function getTime() {
        // 获取当前时间
        var date = new Date();
        console.log(date);
        // 获取当前的年份
        var year = date.getFullYear();
        // 获取当前时间的月份
        var month = addZero(date.getMonth() + 1);
        // 获取当前的天
        var day = addZero(date.getDate());
        // 获取小时
        var hours = addZero(date.getHours());
        // 获取分钟
        var minutes = addZero(date.getMinutes());
        // 获取秒
        var seconds = addZero(date.getSeconds());
        // 将时间格式设置为如下格式
        var str = year + &quot;-&quot; + month + &quot;-&quot; + day + &quot; &quot; + hours + &quot;:&quot; + minutes + &quot;:&quot; + seconds;
        return str;
    }
    // 拼 0 函数
    function addZero(num) {
        return num < 10 ? &quot;0&quot; + num : num;
    }
    
    // 定时器会延迟一秒执行，在外面定义一遍 会补偿这个一秒
    box.innerHTML = getTime();
    setInterval(function() {
        box.innerHTML = getTime();
    }, 1000);
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#F9F9F9</span>;
        <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">1px</span> <span class="hljs-number">1px</span> <span class="hljs-number">2px</span> <span class="hljs-number">#616161</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#453246</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
        <span class="hljs-attribute">font</span>: bold <span class="hljs-number">24px</span>/<span class="hljs-number">50px</span> 楷体;
        <span class="hljs-attribute">text-align</span>: center;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);
    <span class="hljs-comment">// 封装一个获取当前时间的函数</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getTime</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 获取当前时间</span>
        <span class="hljs-keyword">var</span> date = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
        <span class="hljs-built_in">console</span>.log(date);
        <span class="hljs-comment">// 获取当前的年份</span>
        <span class="hljs-keyword">var</span> year = date.getFullYear();
        <span class="hljs-comment">// 获取当前时间的月份</span>
        <span class="hljs-keyword">var</span> month = addZero(date.getMonth() + <span class="hljs-number">1</span>);
        <span class="hljs-comment">// 获取当前的天</span>
        <span class="hljs-keyword">var</span> day = addZero(date.getDate());
        <span class="hljs-comment">// 获取小时</span>
        <span class="hljs-keyword">var</span> hours = addZero(date.getHours());
        <span class="hljs-comment">// 获取分钟</span>
        <span class="hljs-keyword">var</span> minutes = addZero(date.getMinutes());
        <span class="hljs-comment">// 获取秒</span>
        <span class="hljs-keyword">var</span> seconds = addZero(date.getSeconds());
        <span class="hljs-comment">// 将时间格式设置为如下格式</span>
        <span class="hljs-keyword">var</span> str = year + <span class="hljs-string">"-"</span> + month + <span class="hljs-string">"-"</span> + day + <span class="hljs-string">" "</span> + hours + <span class="hljs-string">":"</span> + minutes + <span class="hljs-string">":"</span> + seconds;
        <span class="hljs-keyword">return</span> str;
    }
    <span class="hljs-comment">// 拼 0 函数</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addZero</span>(<span class="hljs-params">num</span>) </span>{
        <span class="hljs-keyword">return</span> num &lt; <span class="hljs-number">10</span> ? <span class="hljs-string">"0"</span> + num : num;
    }
    
    <span class="hljs-comment">// 定时器会延迟一秒执行，在外面定义一遍 会补偿这个一秒</span>
    box.innerHTML = getTime();
    setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        box.innerHTML = getTime();
    }, <span class="hljs-number">1000</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012575832?w=338&amp;h=77" src="https://static.alili.tech/img/remote/1460000012575832?w=338&amp;h=77" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>4、机械表案例</strong> <em>[11-定时器综合练习-机械表.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    .clock {
        width: 600px;
        height: 600px;
        margin: 100px auto;
        background: url(../image/机械表/clock.jpg) no-repeat;
        position: relative;
    }
    
    .clock div {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url(../image/机械表/hour.png) no-repeat center center;
    }
    
    #m {
        background-image: url(../image/机械表/minute.png);
    }
    
    #s {
        background-image: url(../image/机械表/second.png);
    }
</style>

<!-- html 部分 -->
<div class=&quot;clock&quot;>
    <div id=&quot;h&quot;></div>
    <div id=&quot;m&quot;></div>
    <div id=&quot;s&quot;></div>
</div>

<!-- js 部分 -->
<script>
    var h = document.getElementById(&quot;h&quot;);
    var m = document.getElementById(&quot;m&quot;);
    var s = document.getElementById(&quot;s&quot;);

    function setTime() {
        // 获取当前时间
        var date = new Date();
        // 设置秒针
        var seconds = date.getSeconds() + (date.getMilliseconds() / 1000);
        s.style.transform = &quot;rotate(&quot; + 6 * seconds + &quot;deg)&quot;;

        // 设置分针
        // 60分钟一圈360度 每分钟相当于 6度 这样只会一分分钟的走
        // 我们想要的效果是秒针旋转地同时  分针也在微弱的旋转 seconds/60得到一个小数 加上分钟 再去乘以角度
        var minutes = date.getMinutes() + seconds / 60;
        m.style.transform = &quot;rotate(&quot; + 6 * minutes + &quot;deg)&quot;;

        // 设置时针
        // 12个小时是一圈360度 每个小时相当于 30度
        var hours = date.getHours() + minutes / 60;
        h.style.transform = &quot;rotate(&quot; + 30 * hours + &quot;deg)&quot;;
    }
    // 页面一加载就执行一次
    setTime();
    // 让window每隔15ms就执行一次  1秒钟 分成 25份就已经有动画效果  分成60份，很细腻
    setInterval(setTime, 15);
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.clock</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">600px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">600px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(../image/机械表/clock.jpg) no-repeat;
        <span class="hljs-attribute">position</span>: relative;
    }
    
    <span class="hljs-selector-class">.clock</span> <span class="hljs-selector-tag">div</span> {
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(../image/机械表/hour.png) no-repeat center center;
    }
    
    <span class="hljs-selector-id">#m</span> {
        <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(../image/机械表/minute.png);
    }
    
    <span class="hljs-selector-id">#s</span> {
        <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(../image/机械表/second.png);
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"clock"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"h"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"m"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"s"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> h = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"h"</span>);
    <span class="hljs-keyword">var</span> m = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"m"</span>);
    <span class="hljs-keyword">var</span> s = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"s"</span>);

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setTime</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 获取当前时间</span>
        <span class="hljs-keyword">var</span> date = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
        <span class="hljs-comment">// 设置秒针</span>
        <span class="hljs-keyword">var</span> seconds = date.getSeconds() + (date.getMilliseconds() / <span class="hljs-number">1000</span>);
        s.style.transform = <span class="hljs-string">"rotate("</span> + <span class="hljs-number">6</span> * seconds + <span class="hljs-string">"deg)"</span>;

        <span class="hljs-comment">// 设置分针</span>
        <span class="hljs-comment">// 60分钟一圈360度 每分钟相当于 6度 这样只会一分分钟的走</span>
        <span class="hljs-comment">// 我们想要的效果是秒针旋转地同时  分针也在微弱的旋转 seconds/60得到一个小数 加上分钟 再去乘以角度</span>
        <span class="hljs-keyword">var</span> minutes = date.getMinutes() + seconds / <span class="hljs-number">60</span>;
        m.style.transform = <span class="hljs-string">"rotate("</span> + <span class="hljs-number">6</span> * minutes + <span class="hljs-string">"deg)"</span>;

        <span class="hljs-comment">// 设置时针</span>
        <span class="hljs-comment">// 12个小时是一圈360度 每个小时相当于 30度</span>
        <span class="hljs-keyword">var</span> hours = date.getHours() + minutes / <span class="hljs-number">60</span>;
        h.style.transform = <span class="hljs-string">"rotate("</span> + <span class="hljs-number">30</span> * hours + <span class="hljs-string">"deg)"</span>;
    }
    <span class="hljs-comment">// 页面一加载就执行一次</span>
    setTime();
    <span class="hljs-comment">// 让window每隔15ms就执行一次  1秒钟 分成 25份就已经有动画效果  分成60份，很细腻</span>
    setInterval(setTime, <span class="hljs-number">15</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012575833?w=424&amp;h=401" src="https://static.alili.tech/img/remote/1460000012575833?w=424&amp;h=401" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader10">4. Location对象</h2>
<blockquote>
<code>location</code>对象也是<code>window</code>的一个属性，<code>location</code>其实对应的就是浏览器中的地址栏。</blockquote>
<h3 id="articleHeader11">4.1 常用的属性和方法</h3>
<blockquote>
<code>location.href</code>:控制地址栏中的地址</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="location.href = &quot;http://www.baidu.com&quot;; //让页面跳转到百度首页" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">location.href = <span class="hljs-string">"http://www.baidu.com"</span>; <span class="hljs-comment">//让页面跳转到百度首页</span></code></pre>
<blockquote>
<code>location.reload()</code>让页面重新加载</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="location.reload(true);//强制刷新，相当于ctrl+F5
location.reload(false);//刷新，相当于F5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">location.reload(<span class="hljs-literal">true</span>);<span class="hljs-comment">//强制刷新，相当于ctrl+F5</span>
location.reload(<span class="hljs-literal">false</span>);<span class="hljs-comment">//刷新，相当于F5</span></code></pre>
<blockquote>
<code>location</code>的其他属性</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(window.location.hash);      // 哈希值 其实就是锚点
console.log(window.location.host);      // 服务器 服务器名+端口号
console.log(window.location.hostname);  // 服务器名
console.log(window.location.pathname);  // 路径名
console.log(window.location.port);      // 端口
console.log(window.location.protocol);  // 协议
console.log(window.location.search);    // 参数" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.location.hash);      <span class="hljs-comment">// 哈希值 其实就是锚点</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.location.host);      <span class="hljs-comment">// 服务器 服务器名+端口号</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.location.hostname);  <span class="hljs-comment">// 服务器名</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.location.pathname);  <span class="hljs-comment">// 路径名</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.location.port);      <span class="hljs-comment">// 端口</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.location.protocol);  <span class="hljs-comment">// 协议</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.location.search);    <span class="hljs-comment">// 参数</span></code></pre>
<p><strong>示例代码：定时跳转网址</strong> <em>[12-location对象-定时跳转.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<a href=&quot;#&quot; id=&quot;link&quot;>注册成功，5秒后跳转</a>

<!-- js 部分 -->
<script>
    var num = 5;
    var link = document.getElementById('link');
    var timer = setInterval(function() {
        num--;
        link.innerHTML = &quot;注册成功，&quot; + num + &quot;秒后跳转&quot;;
        // 如果倒计时等于0的时候，自动跳转到网址
        if (num == 0) {
            clearInterval(timer);
            location.href = &quot;https://segmentfault.com/u/marsman_levi&quot;;
        }
    }, 1000);
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"link"</span>&gt;</span>注册成功，5秒后跳转<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> num = <span class="hljs-number">5</span>;
    <span class="hljs-keyword">var</span> link = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'link'</span>);
    <span class="hljs-keyword">var</span> timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        num--;
        link.innerHTML = <span class="hljs-string">"注册成功，"</span> + num + <span class="hljs-string">"秒后跳转"</span>;
        <span class="hljs-comment">// 如果倒计时等于0的时候，自动跳转到网址</span>
        <span class="hljs-keyword">if</span> (num == <span class="hljs-number">0</span>) {
            clearInterval(timer);
            location.href = <span class="hljs-string">"https://segmentfault.com/u/marsman_levi"</span>;
        }
    }, <span class="hljs-number">1000</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012575834?w=531&amp;h=52" src="https://static.alili.tech/img/remote/1460000012575834?w=531&amp;h=52" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader12">5. Navigator 对象</h2>
<blockquote>
<code>window.navigator</code>的一些属性可以获取客户端的一些信息</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="navigator.userAgent：返回浏览器版本 

navigator.onLin：返回网络状态 true / false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">navigator.userAgent：返回浏览器版本</span> 

<span class="hljs-string">navigator.onLin：返回网络状态</span> <span class="hljs-literal">true</span> <span class="hljs-string">/</span> <span class="hljs-literal">false</span></code></pre>
<p><strong>示例代码：获取浏览器版本</strong> <em>[13-navigator对象.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 打印浏览器版本
console.log(navigator.userAgent);

// 打印网络状态
console.log(navigator.onLine);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 打印浏览器版本</span>
<span class="hljs-built_in">console</span>.log(navigator.userAgent);

<span class="hljs-comment">// 打印网络状态</span>
<span class="hljs-built_in">console</span>.log(navigator.onLine);</code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012575835" src="https://static.alili.tech/img/remote/1460000012575835" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader13">6. Screen 对象</h2>
<blockquote>
<code>window.screen</code>的一些属性可以获取屏幕的宽高</blockquote>
<p><strong>1、获取屏幕的可占用宽高</strong></p>
<p>返回访问者屏幕的宽度、高度，以像素计，减去界面特性，比如窗口任务栏。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="screen.availWidth：获取屏幕的可用宽度

screen.availHeight：获取屏幕的可用高度" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">screen</span><span class="hljs-selector-class">.availWidth</span>：获取屏幕的可用宽度

<span class="hljs-selector-tag">screen</span><span class="hljs-selector-class">.availHeight</span>：获取屏幕的可用高度</code></pre>
<p><strong>2、获取屏幕宽高</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="screen.width：获取屏幕的宽度

screen.height：获取屏幕的高度" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>screen.<span class="hljs-built_in">width</span>：获取屏幕的宽度

screen.<span class="hljs-built_in">height</span>：获取屏幕的高度</code></pre>
<p><strong>示例代码：</strong> <em>[14-screen对象.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.write(&quot;当前屏幕可占用宽度：&quot; + screen.availWidth + &quot;<br>&quot;);    // 1864
document.write(&quot;当前屏幕可占用高度：&quot; + screen.availHeight + &quot;<br>&quot;);   // 1080
document.write(&quot;当前屏幕宽度：&quot; + screen.width + &quot;<br>&quot;);              // 1920
document.write(&quot;当前屏幕高度：&quot; + screen.height + &quot;<br>&quot;);             // 1080" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">document</span>.write(<span class="hljs-string">"当前屏幕可占用宽度："</span> + screen.availWidth + <span class="hljs-string">"&lt;br&gt;"</span>);    <span class="hljs-comment">// 1864</span>
<span class="hljs-built_in">document</span>.write(<span class="hljs-string">"当前屏幕可占用高度："</span> + screen.availHeight + <span class="hljs-string">"&lt;br&gt;"</span>);   <span class="hljs-comment">// 1080</span>
<span class="hljs-built_in">document</span>.write(<span class="hljs-string">"当前屏幕宽度："</span> + screen.width + <span class="hljs-string">"&lt;br&gt;"</span>);              <span class="hljs-comment">// 1920</span>
<span class="hljs-built_in">document</span>.write(<span class="hljs-string">"当前屏幕高度："</span> + screen.height + <span class="hljs-string">"&lt;br&gt;"</span>);             <span class="hljs-comment">// 1080</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012575836" src="https://static.alili.tech/img/remote/1460000012575836" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader14">7. History 对象</h2>
<blockquote>
<code>history</code>对象表示页面的历史</blockquote>
<p><strong>1、后退 <code>history.back()</code></strong></p>
<p><code>history.back()</code> 方法加载历史列表中的前一个<code>URL</code>。这与在浏览器中点击后退按钮是相同的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="history.back();
history.go(-1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">history.back();
history.go(<span class="hljs-number">-1</span>);</code></pre>
<p><strong>2、后退 <code>history.forward()</code></strong></p>
<p><code>history forward()</code> 方法加载历史列表中的下一个<code>URL</code>。这与在浏览器中点击前进按钮是相同的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="history.forward();
history.go(1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>history.forward()<span class="hljs-comment">;</span>
history.go(<span class="hljs-number">1</span>)<span class="hljs-comment">;</span></code></pre>
<h2 id="articleHeader15">8. javascript 弹框</h2>
<blockquote>在<code>javascript</code>中可以创建<code>3</code>种弹框，分别是：警告框、确认框、提示框。</blockquote>
<p><strong>1、警告框 alert</strong></p>
<ul>
<li>警告框经常用于确保用户可以得到某些信息。</li>
<li>当警告框出现后，用户需要点击确定按钮才能继续进行操作。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.alert(&quot;呵呵呵&quot;);
// window.alert() 方法可以不带上window对象，直接使用alert()方法。
alert(&quot;呵呵呵&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">window</span>.alert(<span class="hljs-string">"呵呵呵"</span>);
<span class="hljs-comment">// window.alert() 方法可以不带上window对象，直接使用alert()方法。</span>
alert(<span class="hljs-string">"呵呵呵"</span>);</code></pre>
<p><strong>2、确认框 confirm</strong></p>
<ul>
<li>确认框通常用于验证是否接受用户操作。</li>
<li>当确认卡弹出时，用户可以点击 "确认" 或者 "取消" 来确定用户操作。</li>
<li>当你点击 "确认", 确认框返回 <code>true</code>， 如果点击 "取消", 确认框返回 <code>false</code>。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = confirm();
if (result == true) {
    alert(&quot;你真的是猪!&quot;);
} else {
    alert(&quot;你不是猪！&quot;);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> result = confirm();
<span class="hljs-keyword">if</span> (result == <span class="hljs-literal">true</span>) {
    alert(<span class="hljs-string">"你真的是猪!"</span>);
} <span class="hljs-keyword">else</span> {
    alert(<span class="hljs-string">"你不是猪！"</span>);
}</code></pre>
<p><strong>3、提示框 prompt</strong></p>
<ul>
<li>提示框经常用于提示用户在进入页面前输入某个值。</li>
<li>当提示框出现后，用户需要输入某个值，然后点击确认或取消按钮才能继续操纵。</li>
<li>如果用户点击确认，那么返回值为输入的值。如果用户点击取消，那么返回值为<code>null</code>。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 参数一：提示内容  参数er：可以省略，输入框默认显示内容
var person = prompt(&quot;请输入你的名字&quot;, &quot;Levi丶&quot;);
if (person != null &amp;&amp; person != &quot;&quot;) {
    alert(&quot;你好&quot; + person);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 参数一：提示内容  参数er：可以省略，输入框默认显示内容</span>
<span class="hljs-keyword">var</span> person = prompt(<span class="hljs-string">"请输入你的名字"</span>, <span class="hljs-string">"Levi丶"</span>);
<span class="hljs-keyword">if</span> (person != <span class="hljs-literal">null</span> &amp;&amp; person != <span class="hljs-string">""</span>) {
    alert(<span class="hljs-string">"你好"</span> + person);
}</code></pre>
<p><strong>4、弹框换行</strong><br>弹窗使用 <code>反斜杠 + "n"(\n)</code> 来设置换行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alert(&quot;大家好\n我是\nLevi丶&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">alert(<span class="hljs-string">"大家好\n我是\nLevi丶"</span>);</code></pre>
<h2 id="articleHeader16">9. javascript Cookie</h2>
<blockquote>
<code>Cookie</code>用于存储<code>web</code>页面的用户信息</blockquote>
<p><strong>1、什么是Cookie？</strong></p>
<ul>
<li>
<code>Cookie</code>是一些数据, 存储于你电脑上的文本文件中。</li>
<li>当<code>web</code>服务器向浏览器发送<code>web</code>页面时，在连接关闭后，服务端不会记录用户的信息。</li>
<li>
<p><code>Cookie</code>的作用就是用于解决 "如何记录客户端的用户信息":</p>
<ul>
<li>当用户访问<code>web</code>页面时，他的名字可以记录在<code>cookie</code>中。</li>
<li>在用户下一次访问该页面时，可以在<code>cookie</code>中读取用户访问记录。</li>
</ul>
</li>
</ul>
<p><strong><code>Cookie</code>以名/值对形式存储，如下所示:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="username=Levi" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attr">username</span>=Levi</code></pre>
<p>当浏览器从服务器上请求<code>web</code>页面时，属于该页面的<code>cookie</code>会被添加到该请求中。服务端通过这种方式来获取用户的信息。</p>
<p><strong>2、使用 JavaScript 创建Cookie</strong></p>
<blockquote>
<code>JavaScript</code>可以使用<code>document.cookie</code>属性来创建 、读取、及删除<code>cookie</code>。</blockquote>
<p>JavaScript中，创建<code>cookie</code>如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.cookie = &quot;username = Levi&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.cookie = <span class="hljs-string">"username = Levi"</span>;</code></pre>
<p>你还可以为<code>cookie</code>添加一个过期时间（以 <code>UTC</code> 或 <code>GMT</code> 时间）。默认情况下，<code>cookie</code> 在浏览器关闭时删除：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.cookie=&quot;username = Levi; expires = Tue Dec 12 2017 11:32:33 GMT+0800&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.cookie=<span class="hljs-string">"username = Levi; expires = Tue Dec 12 2017 11:32:33 GMT+0800"</span>;</code></pre>
<p>你可以使用<code>path</code>参数告诉浏览器<code>cookie</code>的路径。默认情况下，<code>cookie</code>属于当前页面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.cookie=&quot;username = Levi; expires = Tue Dec 12 2017 11:32:33 GMT+0800; path = /&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.cookie=<span class="hljs-string">"username = Levi; expires = Tue Dec 12 2017 11:32:33 GMT+0800; path = /"</span>;</code></pre>
<p><strong>3、使用 JavaScript 读取 Cookie</strong></p>
<p>在 JavaScript 中, 可以使用以下代码来读取<code>cookie</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = document.cookie;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> x = <span class="hljs-built_in">document</span>.cookie;</code></pre>
<p><code>document.cookie</code>将以字符串的方式返回所有的<code>cookie</code>，类型格式<code>cookie1=value;</code> <code>cookie2=value;</code> <code>cookie3=value;</code></p>
<p><strong>4、使用 JavaScript 修改 Cookie</strong></p>
<p>在 JavaScript 中，修改<code>cookie</code>类似于创建<code>cookie</code>，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.cookie=&quot;username = LXH; expires = Tue Dec 12 2017 11:32:33 GMT+0800; path = /&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.cookie=<span class="hljs-string">"username = LXH; expires = Tue Dec 12 2017 11:32:33 GMT+0800; path = /"</span>;</code></pre>
<p><em>旧的<code>cookie</code>将被覆盖。</em></p>
<p><strong>5、使用 JavaScript 删除 Cookie</strong></p>
<p>删除<code>cookie</code>非常简单。您只需要设置<code>expires</code>参数为以前的时间即可，如下所示</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.cookie=&quot;username = Levi; expires = Thu, 01 Jan 1970 00:00:00 GMT;&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.cookie=<span class="hljs-string">"username = Levi; expires = Thu, 01 Jan 1970 00:00:00 GMT;"</span>;</code></pre>
<p><em>注意，当您删除时不必指定 cookie 的值。</em></p>
<p><strong>6、Cookie 字符串</strong></p>
<p><code>document.cookie</code>属性看起来像一个普通的文本字符串，其实它不是。</p>
<p>即使您在<code>document.cookie</code>中写入一个完整的<code>cookie</code>字符串, 当您重新读取该<code>cookie</code>信息时，<code>cookie </code>信息是以名/值对的形式展示的。</p>
<p><em>如果您设置了新的<code>cookie</code>，旧的<code>cookie</code>不会被覆盖。 新<code>cookie</code>将添加到<code>document.cookie</code> 中，所以如果您重新读取<code>document.cookie</code>。</em></p>
<p><a href="https://segmentfault.com/a/1190000012369970">上一篇：JavaScript 基础知识 - DOM篇(二)</a><br><a href="https://segmentfault.com/a/1190000012623407" target="_blank">下一篇：JavaScript 进阶知识 - 特效篇(一)</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 基础知识 - BOM篇

## 原文链接
[https://segmentfault.com/a/1190000012575816](https://segmentfault.com/a/1190000012575816)

