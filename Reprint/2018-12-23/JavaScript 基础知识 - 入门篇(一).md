---
title: 'JavaScript 基础知识 - 入门篇(一)' 
date: 2018-12-23 2:30:07
hidden: true
slug: 5dt3y7rkr89
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmtw1ma9g4j21hc0u0ach.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmtw1ma9g4j21hc0u0ach.jpg" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">前言</h2>
<p>最近一直有小伙伴跟我说<code>JS</code>有很多知识点经常不用，已经忘记的差不多了。平时找一个小问题都要在网上找半天，希望能有一套比较全面的笔记或者文章。但是网上的文章太过于分散，学习起来不是很方便。恰巧最近比较闲，所以为大家整理出来了一套比较全面的<code>JS</code>基础阶段的文章，对于初学者还是很有帮助的，如果你是一名熟练掌握<code>JS</code>的攻城狮，你可能会觉得文章写得太过于啰嗦，但是为了照顾大家，啰嗦一点还是有必要的。</p>
<p>这篇文章主要讲的是关于<code>JS</code>基础的知识点，后面会陆续更新<code>DOM</code>、<code>JS高阶</code>、<code>Ajax</code>、<code>H5C3</code>、<code>JQ</code>，包括一些主流的框架，但是本人时间有限，不可能专门去花费时间来写，而且工作量也是非常大的，所以喜欢的小伙伴可以点一波关注，后续会陆续更新。</p>
<p>由于是自己所写，所以里面有些语言可能表达的有些不明确，不明白的可以给我留言。</p>
<h2 id="articleHeader1">1. 初识JS</h2>
<h3 id="articleHeader2">1.1 什么是JS语言</h3>
<blockquote>javascript是一种运行在<code>客户端</code> 的<code>脚本语言</code>
</blockquote>
<p><strong>客户端：</strong> 即<code>接受服务的一端</code>，与服务端相对应，在前端开发中，通常客户端指的就是<code>浏览器</code>。</p>
<p><strong>脚本语言：</strong> 也叫<code>解释型语言</code>，特点是<code>执行一行</code>，<code>解释一行</code>，如果发现报错，代码就停止执行。</p>
<h3 id="articleHeader3">1.2 JS的三个组成部分</h3>
<blockquote>javascript的三个组成部分：<code>ECMAScript</code>、<code>BOM</code>、<code>DOM</code>
</blockquote>
<p><strong>ECMAScript：</strong> 定义了<code>javascript</code>的语法规范。</p>
<p><strong>BOM：</strong> 一套操作浏览器功能的<code>API</code>。</p>
<p><strong>DOM：</strong> 一套操作页面元素的<code>API</code>。</p>
<h3 id="articleHeader4">1.3 script 标签</h3>
<p><strong>1、script标签的书写方式</strong></p>
<blockquote>书写<code>Javascript</code>代码有两种方式，第一种是直接在<code>script</code>标签中书写，第二种是将代码写在<code>js</code>文件中，通过<code>script</code>的<code>src</code>属性进行引入。</blockquote>
<p>直接在<code>script</code>中书写<code>javascript</code>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- type=&quot;text/javascript&quot; 可以省略 -->
<script type=&quot;text/javascript&quot;>
    alert(&quot;今天天气真好呀&quot;);
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- type="text/javascript" 可以省略 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    alert(<span class="hljs-string">"今天天气真好呀"</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>通过script标签引入一个JS文件，需要指定<code>src</code>属性:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 表示引用了test.js文件，并且script标签内不可以继续写代码 -->
<script src=&quot;test.js&quot;></script> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 表示引用了test.js文件，并且script标签内不可以继续写代码 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"test.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> </code></pre>
<p><em>如果<code>script</code>标签指定了<code>src</code>属性，说明是想要引入一个<code>js</code>文件，这个时候不能继续在<code>script</code>标签中写<code>js</code>代码，即便写了，也不会执行。</em></p>
<p><strong>2、script标签的书写位置</strong></p>
<blockquote>
<code>script</code>标签的书写位置，原则上来说，可以在页面中的任意位置书写。</blockquote>
<p>写在<code>head</code>标签中，<code>style</code>标签之后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Document</title>
    <link rel=&quot;stylesheet&quot; href=&quot;demo.css&quot;>
    <!-- 写在这里 -->
    <script src=&quot;demo.js&quot;></script>
</head>
<body>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"demo.css"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 写在这里 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"demo.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><em>浏览器有一个特性，就是在遇到<code>&lt;body&gt;</code>标签时才开始呈现内容。如果在<code>head</code>里面引用<code>js</code>文件的话，意味着必须要等到全部的<code>javascript</code>代码都被下载、解析和执行完成之后，才能开始呈现页面的内容。如果文件数量一旦过多，将会影响页面加载速度，此时页面有可能会在加载完成前一片空白。</em></p>
<p>写在<code>&lt;/body&gt;</code>标签的前面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Document</title>
    <link rel=&quot;stylesheet&quot; href=&quot;demo.css&quot;>
</head>
<body>
    <!-- 写在这里 -->
    <script src=&quot;demo.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"demo.css"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 写在这里 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"demo.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><em>在解析<code>javascript</code>代码之前，页面的内容已经完全呈现在浏览器当中了，用户会明显感觉页面加载变快了。</em></p>
<h3 id="articleHeader5">1.4 js中输入输出语句</h3>
<ul>
<li>
<code>console.log</code> 控制台输出日志</li>
<li>
<code>console.dir</code> 对象的形式打印一个对象</li>
<li>
<code>document.write</code> 往页面中写入内容</li>
<li>
<code>alert</code> 弹框警告</li>
<li>
<code>confirm</code> 确认框</li>
<li>
<code>prompt</code> 输入框</li>
</ul>
<h3 id="articleHeader6">1.5 注释</h3>
<blockquote>不被程序执行的代码。用于程序员标记代码，在后期的修改，以及他人的学习时有所帮助，在JS中，分为<code>单行注释</code>和<code>多行注释</code>以及<code>文档注释</code>。</blockquote>
<p><strong>单行注释</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//这是单行注释，只能注释一行" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-comment">//这是单行注释，只能注释一行</span></code></pre>
<p><strong>多行注释</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
    这是多行注释，不能嵌套
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/*
    这是多行注释，不能嵌套
*/</span></code></pre>
<p><strong>文档注释</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 求圆的面积
 * @param r {number} 圆的半径
 * @returns {number} 圆的面积
 * 这是文档注释
 */
function getArea (r) {
    return Math.PI * r * r;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 求圆的面积
 * @param r {number} 圆的半径
 * @returns {number} 圆的面积
 * 这是文档注释
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getArea</span> (<span class="hljs-params">r</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.PI * r * r;
}</code></pre>
<p><strong>注释的作用</strong></p>
<ul>
<li>模块划分，方便代码查找和维护</li>
<li>用于解释复杂代码的逻辑，方便维护和后期开发。</li>
</ul>
<h2 id="articleHeader7">2. 变量</h2>
<blockquote>变量，<code>可以变化的量</code>，变量是在计算机中存储数据的一个<code>标识符</code>。可以把变量看成<code>存储数据的容器</code>。</blockquote>
<p><strong>变量与字面量：</strong></p>
<ul>
<li>字面量：<code>10</code>、<code>20</code>、<code>“abc”</code>、<code>true</code>这种从字面上就能看出来类型和值的量叫做字面量。</li>
<li>变量：可以变化的量。</li>
</ul>
<h3 id="articleHeader8">2.1 变量的声明与赋值</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1- 同时声明并且赋值
var num = 100;
console.log(num);  // 100

// 2- 先声明了一个变量，再赋值
var num1;
num1 = 100;
console.log(num1); // 100

// 3- 没有声明变量，直接赋值（可以，但是不推荐）
num2 = 200;
console.log(num2); // 200

// 4- 有变量声明，但是没有赋值（可以，没有赋值，变量的值默认是个undefined）
var num9;
console.log(num9); // undefined

// 5- 既没有声明，也没有赋值，直接用。
console.log(num3); //报错  num3

// 6- 一个 var，逗号分隔 可以同时声明多个变量
var name = &quot;Levi丶&quot;,
    age  = 18,
    gender = &quot;男&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 1- 同时声明并且赋值</span>
<span class="hljs-keyword">var</span> num = <span class="hljs-number">100</span>;
<span class="hljs-built_in">console</span>.log(num);  <span class="hljs-comment">// 100</span>

<span class="hljs-comment">// 2- 先声明了一个变量，再赋值</span>
<span class="hljs-keyword">var</span> num1;
num1 = <span class="hljs-number">100</span>;
<span class="hljs-built_in">console</span>.log(num1); <span class="hljs-comment">// 100</span>

<span class="hljs-comment">// 3- 没有声明变量，直接赋值（可以，但是不推荐）</span>
num2 = <span class="hljs-number">200</span>;
<span class="hljs-built_in">console</span>.log(num2); <span class="hljs-comment">// 200</span>

<span class="hljs-comment">// 4- 有变量声明，但是没有赋值（可以，没有赋值，变量的值默认是个undefined）</span>
<span class="hljs-keyword">var</span> num9;
<span class="hljs-built_in">console</span>.log(num9); <span class="hljs-comment">// undefined</span>

<span class="hljs-comment">// 5- 既没有声明，也没有赋值，直接用。</span>
<span class="hljs-built_in">console</span>.log(num3); <span class="hljs-comment">//报错  num3</span>

<span class="hljs-comment">// 6- 一个 var，逗号分隔 可以同时声明多个变量</span>
<span class="hljs-keyword">var</span> name = <span class="hljs-string">"Levi丶"</span>,
    age  = <span class="hljs-number">18</span>,
    gender = <span class="hljs-string">"男"</span>;</code></pre>
<h3 id="articleHeader9">2.2 变量的命名规则与规范</h3>
<p><strong>命名规则（必须遵守）：</strong></p>
<ul>
<li>由字母、数字、下划线、<code>$</code>符号组成，开头不能是数字。</li>
<li>不能使用关键字和保留字</li>
<li>区分大小写</li>
</ul>
<p><strong>命名规范（建议遵守）：</strong></p>
<ul>
<li>命名要有意义</li>
<li>遵守驼峰命名法。首字母小写，后面单词的首字母需要大写。</li>
</ul>
<h3 id="articleHeader10">2.3 交换两个变量的值</h3>
<p><strong>方法一: 声明一个新的变量</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 交换 num1 和 num2的值
var num1 = 11;
var num2 = 22;

var temp;
temp = num1; // num1=11 temp=11
num1 = num2; // num1=22 num2=22
num2 = temp; // temp=11 num2=11" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 交换 num1 和 num2的值</span>
<span class="hljs-keyword">var</span> num1 = <span class="hljs-number">11</span>;
<span class="hljs-keyword">var</span> num2 = <span class="hljs-number">22</span>;

<span class="hljs-keyword">var</span> temp;
temp = num1; <span class="hljs-comment">// num1=11 temp=11</span>
num1 = num2; <span class="hljs-comment">// num1=22 num2=22</span>
num2 = temp; <span class="hljs-comment">// temp=11 num2=11</span></code></pre>
<p><strong>方法二: 不通过声明变量的方式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 不使用临时变量
var num1 = 11;
var num2 = 22;
// num1 = 11 + 22
num1 = num1 + num2; // num1=33 
// num2 = 33 - 22
num2 = num1 - num2; // num2=11
// num1 = 33 - 11 
num1 = num1 - num2; // num1=22" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 不使用临时变量</span>
<span class="hljs-keyword">var</span> num1 = <span class="hljs-number">11</span>;
<span class="hljs-keyword">var</span> num2 = <span class="hljs-number">22</span>;
<span class="hljs-comment">// num1 = 11 + 22</span>
num1 = num1 + num2; <span class="hljs-comment">// num1=33 </span>
<span class="hljs-comment">// num2 = 33 - 22</span>
num2 = num1 - num2; <span class="hljs-comment">// num2=11</span>
<span class="hljs-comment">// num1 = 33 - 11 </span>
num1 = num1 - num2; <span class="hljs-comment">// num1=22</span></code></pre>
<h2 id="articleHeader11">3. 数据类型</h2>
<blockquote>基本数据类型包括了：<code>number</code>、<code>string</code>、<code>boolean</code>、<code>undefined</code>、<code>null</code>
</blockquote>
<h3 id="articleHeader12">3.1 如何查看数据类型</h3>
<blockquote>使用<code>typeof</code>关键字查看数据类型</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="typeof(name);  
// 括号可以省略
typeof name;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">typeof</span>(name);  
<span class="hljs-comment">// 括号可以省略</span>
<span class="hljs-keyword">typeof</span> name;</code></pre>
<h3 id="articleHeader13">3.2 Number 类型</h3>
<p><strong>进制</strong></p>
<ul>
<li>十进制，我们平时使用的就是十进制，进行运算时，八进制和十六进制的值最终都会转换成十进制。</li>
<li>二进制，计算机当中用的最多的计算方式，数值序列只有<code>0</code>和<code>1</code>
</li>
<li>八进制，<code>0</code>开头的数值，数值序列：<code>0-7</code>
</li>
<li>十六进制，<code>0x</code>开头的数值，数值序列：<code>0-9</code>、<code>A-F</code>、<code>a-f</code>
</li>
</ul>
<p><strong>浮点数</strong></p>
<blockquote>所谓浮点数，就是该数当中必须包含一个小数点，并且小数点后面至少有一位数字。</blockquote>
<p>科学计数法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//如何表示0.003和20000？
var num = 3e-3;   // 0.003
var num2 = 2e+4;  // 20000  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//如何表示0.003和20000？</span>
<span class="hljs-keyword">var</span> num = <span class="hljs-number">3e-3</span>;   <span class="hljs-comment">// 0.003</span>
<span class="hljs-keyword">var</span> num2 = <span class="hljs-number">2e+4</span>;  <span class="hljs-comment">// 20000  </span></code></pre>
<p>浮点数的精度问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="0.1 + 0.2 = ?    // 0.30000000000000004
0.07 * 100 = ?   // 7.000000000000001" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-number">0.1</span> + <span class="hljs-number">0.2</span> = ?    <span class="hljs-comment">// 0.30000000000000004</span>
<span class="hljs-number">0.07</span> * <span class="hljs-number">100</span> = ?   <span class="hljs-comment">// 7.000000000000001</span></code></pre>
<p><em>浮点数在运算的时候会出现精度丢失的问题，因此在做比较运算的时候，尽量不要用小数进行比较。在第五章的时候会着重讲解这个问题</em></p>
<p><strong>数值范围</strong></p>
<blockquote>
<code>javascript</code>不能表示世界上所有的数，因此在<code>javascript</code>中，数值大小是有一定限制的。</blockquote>
<ul>
<li>
<code>Number.MIN_VALUE</code>:5e-324 (<code>js</code>里面能表示最小的数)</li>
<li>
<code>Number.MAX_VALUE</code>:1.7976931348623157e+308 (<code>js</code>里面能表示最大的数)</li>
<li>
<code>Infinity</code>:正无穷 (如果超出<code>js</code>里面最大的数，将会显示<code>infinity</code>)</li>
<li>
<code>-Infinity</code>:负无穷 (如果超出<code>js</code>里面最小的数，将会显示<code>-infinity</code>)</li>
</ul>
<p><strong>数值判断</strong></p>
<ul>
<li>
<code>NaN</code>: 表示一个<code>非数值</code>，当无法运算或者运算错误的时候，会得到一个<code>NaN</code>，<code>NaN</code>是<code>number类型</code>，表示一个非数值。</li>
<li>
<code>NaN</code>与任何值都不想等，包括它本身</li>
<li>
<code>isNaN</code>: 用来判断是否是一个数字，当返回<code>true</code>的时候说明是<code>NaN</code>，表示的不是一个数字，返回<code>false</code>，说明不是<code>NaN</code>，表示的是一个数字。</li>
</ul>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &quot;abc&quot;;
console.log(isNaN(str));  // true 说明不是一个数字" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str = <span class="hljs-string">"abc"</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">isNaN</span>(str));  <span class="hljs-comment">// true 说明不是一个数字</span></code></pre>
<h3 id="articleHeader14">3.3 String 类型</h3>
<p><strong>字面量</strong></p>
<blockquote>字符串的字面量：<code>“abc”</code> 、 <code>‘abc’</code> 字符串可以是双引号，也可以是单引号引起来。</blockquote>
<p><em>不管是双引号，还是单引号，都是成对出现的，假如打印的字符串里有引号怎么办呢？</em></p>
<p>这里就要活学活用，如果只有一处有引号，就可以用单双引号混合使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('我是&quot;帅哥&quot;');  // ==> 我是&quot;帅哥&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我是"帅哥"'</span>);  <span class="hljs-comment">// ==&gt; 我是"帅哥"</span></code></pre>
<p>假如引号非常多的时候怎么办呢？ 用转义字符:<code>“\”</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(&quot;我是'帅哥',\&quot;哈哈哈\&quot;&quot;); // ==> 我是'帅哥',&quot;哈哈哈&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">"我是'帅哥',\"哈哈哈\""</span>); <span class="hljs-comment">// ==&gt; 我是'帅哥',"哈哈哈"</span></code></pre>
<p><strong>字符串拼接</strong></p>
<blockquote>拼接字符串使用<code>+</code>号</blockquote>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(11 + 11);             //  22
console.log(&quot;hello&quot; + &quot; world&quot;);  // &quot;hello world&quot;
console.log(&quot;100&quot; + &quot;100&quot;);       // &quot;100100&quot;
console.log(&quot;11&quot; + 11);           // &quot;1111&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-number">11</span> + <span class="hljs-number">11</span>);             <span class="hljs-comment">//  22</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"hello"</span> + <span class="hljs-string">" world"</span>);  <span class="hljs-comment">// "hello world"</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"100"</span> + <span class="hljs-string">"100"</span>);       <span class="hljs-comment">// "100100"</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"11"</span> + <span class="hljs-number">11</span>);           <span class="hljs-comment">// "1111"</span></code></pre>
<p><strong>总结：</strong></p>
<ul>
<li>两边只要有一个是字符串，那么<code>+</code>就是字符串拼接功能</li>
<li>两边如果都是数字，那么就是算术功能。</li>
</ul>
<p><strong>字符串长度</strong></p>
<blockquote>
<code>length</code>属性用来获取字符串的长度</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &quot;abcdefghij&quot;;
str.length;// 字符串的长度  10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str = <span class="hljs-string">"abcdefghij"</span>;
str.length;<span class="hljs-comment">// 字符串的长度  10</span></code></pre>
<h3 id="articleHeader15">3.4. boolean 类型</h3>
<blockquote>
<code>boolean</code>类型只有两个字面量，<code>true</code>和<code>false</code>，区分大小写(True，False不是布尔类型，只是标识符)。</blockquote>
<p><em>所有类型的值都可以转化成<code>true</code>或者<code>false</code></em></p>
<p><em><code>NaN</code>、<code>""</code>、<code>undefined</code>、<code>null</code>、<code>alse</code>、<code>0</code>  这<code>6</code>个值可以转换成<code>false</code>，其余的都是<code>true</code>。</em></p>
<h3 id="articleHeader16">3.5 undefined类型与null类型</h3>
<p><strong><code>undefined</code>表示一个声明了没有赋值的变量</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name ;
console.log(name); // undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> name ;
<span class="hljs-built_in">console</span>.log(name); <span class="hljs-comment">// undefined</span></code></pre>
<p><strong><code>null</code>表示一个空的对象</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = null;
console.log(typeof name); // Object" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> name = <span class="hljs-literal">null</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> name); <span class="hljs-comment">// Object</span></code></pre>
<p>如果定义的变量，将来是准备用于保存对象的话，最好将变量初始化为<code>null</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = null;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> name = <span class="hljs-literal">null</span>;</code></pre>
<p><strong><code>undefined</code> 与 <code>null</code> 的关系</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="undefined == null;   // true
undefined === null;  // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-literal">undefined</span> == <span class="hljs-literal">null</span>;   <span class="hljs-comment">// true</span>
<span class="hljs-literal">undefined</span> === <span class="hljs-literal">null</span>;  <span class="hljs-comment">// false</span></code></pre>
<p><em>实际上，<code>undefiner</code>值是派生自<code>null</code>值的，所以判断相等时为<code>true</code>，但是两种用途是完全不一样的。</em></p>
<h2 id="articleHeader17">4. 简单数据类型转换</h2>
<blockquote>如何使用谷歌浏览器，快速的查看数据类型？</blockquote>
<ul>
<li>字符串的颜色是<code>黑色</code>的</li>
<li>数值类型是<code>蓝色</code>的</li>
<li>布尔类型也是<code>蓝色</code>的</li>
<li>
<code>undefined</code>和<code>null</code>是<code>灰色</code>的</li>
</ul>
<p><em>这个在调试过程中时非常有用的。</em></p>
<h3 id="articleHeader18">4.1 转字符串类型</h3>
<p><strong>1、<code>String()</code>函数转换</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num = 123;
console.log(String(num)); // &quot;123&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> num = <span class="hljs-number">123</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">String</span>(num)); <span class="hljs-comment">// "123"</span></code></pre>
<p><strong>2、<code>toString()</code> 转换不了<code>undefined</code> 和 <code>null</code></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num = 123;
console.log(num.toString());        // &quot;123&quot;
console.log(undefined.toString());  // 报错
console.log(null.toString());       // 报错" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> num = <span class="hljs-number">123</span>;
<span class="hljs-built_in">console</span>.log(num.toString());        <span class="hljs-comment">// "123"</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">undefined</span>.toString());  <span class="hljs-comment">// 报错</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">null</span>.toString());       <span class="hljs-comment">// 报错</span></code></pre>
<p><strong>3、<code>+ ""</code> 加引号</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num = 123;
console.log(num + &quot;&quot;); // &quot;123&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> num = <span class="hljs-number">123</span>;
<span class="hljs-built_in">console</span>.log(num + <span class="hljs-string">""</span>); <span class="hljs-comment">// "123"</span></code></pre>
<h3 id="articleHeader19">4.2 转数值类型</h3>
<p><strong>1、<code>Number</code></strong></p>
<ul>
<li>如果转换的是空字符串，返回的是<code>0</code>；</li>
<li>如果是数字字符串，转换后保留原数据；</li>
<li>非数字字符串，转换之后为<code>NaN</code>；</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Number(&quot;-123&quot;));    // -123
console.log(Number(&quot;&quot;));        // 0
console.log(Number(&quot;123abc&quot;));  // NaN" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Number</span>(<span class="hljs-string">"-123"</span>));    <span class="hljs-comment">// -123</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Number</span>(<span class="hljs-string">""</span>));        <span class="hljs-comment">// 0</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Number</span>(<span class="hljs-string">"123abc"</span>));  <span class="hljs-comment">// NaN</span></code></pre>
<p><strong>2、<code>parseInt</code>(取整)</strong></p>
<ul>
<li>小数数字字符串，转换之后，保留整数部分(取整)；</li>
<li>数字开头非纯数字字符串，转换之后保留整数部分；</li>
<li>非数字字符串，转换之后为<code>NaN</code>；</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(parseInt(&quot;123.123&quot;));       // 123
console.log(parseInt(&quot;123.123abc&quot;));    // 123
console.log(parseInt(&quot;abc123.123&quot;));    // NaN
console.log(parseInt(&quot;&quot;));              // NaN
console.log(parseInt(&quot;abc&quot;));           // NaN" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">"123.123"</span>));       <span class="hljs-comment">// 123</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">"123.123abc"</span>));    <span class="hljs-comment">// 123</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">"abc123.123"</span>));    <span class="hljs-comment">// NaN</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">""</span>));              <span class="hljs-comment">// NaN</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">"abc"</span>));           <span class="hljs-comment">// NaN</span></code></pre>
<p><strong>3、<code>parseFloat</code>(取数)</strong></p>
<ul>
<li>数字字符串，转换之后保留原数据；</li>
<li>数字开头的非纯数字字符串，转换之后保留数字部分(包括小数)；</li>
<li>非数字字符串转换之后为<code>NaN</code>；</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(parseFloat(&quot;123.123&quot;)); // 123.123
console.log(parseFloat(&quot;123.123abc&quot;)); // 123.123
console.log(parseFloat(&quot;abc123.123&quot;)); // NaN
console.log(parseFloat(&quot;&quot;)); // NaN
console.log(parseFloat(&quot;abc&quot;)); // NaN" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">parseFloat</span>(<span class="hljs-string">"123.123"</span>)); <span class="hljs-comment">// 123.123</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">parseFloat</span>(<span class="hljs-string">"123.123abc"</span>)); <span class="hljs-comment">// 123.123</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">parseFloat</span>(<span class="hljs-string">"abc123.123"</span>)); <span class="hljs-comment">// NaN</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">parseFloat</span>(<span class="hljs-string">""</span>)); <span class="hljs-comment">// NaN</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">parseFloat</span>(<span class="hljs-string">"abc"</span>)); <span class="hljs-comment">// NaN</span></code></pre>
<p><strong>4、参与运算==&gt; "<code>+</code>" or "<code>-0</code>"</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &quot;-123&quot;;
console.log(+str);  // -123
console.log(str-0); // -123" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str = <span class="hljs-string">"-123"</span>;
<span class="hljs-built_in">console</span>.log(+str);  <span class="hljs-comment">// -123</span>
<span class="hljs-built_in">console</span>.log(str<span class="hljs-number">-0</span>); <span class="hljs-comment">// -123</span></code></pre>
<h3 id="articleHeader20">4.3 转布尔类型</h3>
<blockquote>布尔类型只有<code>true</code>和<code>false</code>，但是所有类型的值都可以转换成布尔类型</blockquote>
<p><strong>1、能够转换成<code>false</code>的只有<code>6</code>种：</strong></p>
<ul>
<li><code>""</code></li>
<li><code>0</code></li>
<li><code>NaN</code></li>
<li><code>undefined</code></li>
<li><code>null</code></li>
<li><code>false</code></li>
</ul>
<p><em>其余的都是<code>true</code></em></p>
<p><strong>2、<code>!</code> 转换</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &quot;&quot;;
// Boolean() 判断这个参数的布尔类型
console.log(Boolean(str)); // false

console.log(!str); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str = <span class="hljs-string">""</span>;
<span class="hljs-comment">// Boolean() 判断这个参数的布尔类型</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Boolean</span>(str)); <span class="hljs-comment">// false</span>

<span class="hljs-built_in">console</span>.log(!str); <span class="hljs-comment">// true</span></code></pre>
<h2 id="articleHeader21">5. JS小数运算精度丢失</h2>
<h3 id="articleHeader22">5.1 JS数字精度丢失的一些典型问题</h3>
<p><code>js</code>在使用小数进行计算的时候，会出现精度丢失的问题。不要用来跟其他的小数做比较。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="0.1 + 0.2 != 0.3 //true   0.30000000000000004

// 16位数 和 17位数相等
9999999999999999 == 10000000000000001 // true

9007199254740992 + 1 == 9007199254740992 // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-number">0.1</span> + <span class="hljs-number">0.2</span> != <span class="hljs-number">0.3</span> <span class="hljs-comment">//true   0.30000000000000004</span>

<span class="hljs-comment">// 16位数 和 17位数相等</span>
<span class="hljs-number">9999999999999999</span> == <span class="hljs-number">10000000000000001</span> <span class="hljs-comment">// true</span>

<span class="hljs-number">9007199254740992</span> + <span class="hljs-number">1</span> == <span class="hljs-number">9007199254740992</span> <span class="hljs-comment">// true</span></code></pre>
<h3 id="articleHeader23">5.2 JS数字丢失精度的原因</h3>
<p>计算机的二进制实现和位数限制有些数无法有限表示。就像一些无理数不能有限表示，如 圆周率 <code>3.1415926...</code>，<code>1.3333...</code> 等。<code>JS</code> 遵循 <code>IEEE 754</code> 规范，采用 双精度存储（<code>double precision</code>） ，占用 <code>64 bit</code>。如图</p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fkkztd0q8fj21i603u0t4.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fkkztd0q8fj21i603u0t4.jpg" alt="精度丢失" title="精度丢失" style="cursor: pointer;"></span></p>
<p><strong>意义：</strong></p>
<ul>
<li>
<code>1</code>位用来表示符号位</li>
<li>
<code>11</code>位用来表示指数</li>
<li>
<code>52</code>位表示尾数</li>
</ul>
<p><strong>浮点数，比如：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="0.1 >> 0.0001 1001 1001 1001…（1001无限循环）
0.2 >> 0.0011 0011 0011 0011…（0011无限循环）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-number">0.1</span> &gt;&gt; <span class="hljs-number">0.0001</span> <span class="hljs-number">1001</span> <span class="hljs-number">1001</span> <span class="hljs-number">1001</span>…（<span class="hljs-number">1001</span>无限循环）
<span class="hljs-number">0.2</span> &gt;&gt; <span class="hljs-number">0.0011</span> <span class="hljs-number">0011</span> <span class="hljs-number">0011</span> <span class="hljs-number">0011</span>…（<span class="hljs-number">0011</span>无限循环）</code></pre>
<p><em>此时只能模仿十进制进行四舍五入了，但是二进制只有<code>0</code>和<code>1</code>两个，于是变为<code>0</code>舍<code>1</code>入。这即是计算机中部分浮点数运算时出现误差，丢失精度的根本原因。</em></p>
<p><em>大整数的精度丢失和浮点数本质上是一样的，尾数位最大是 <code>52</code> 位，因此 <code>JS</code> 中能精准表示的最大整数是 <code>Math.pow(2, 53)</code>，十进制即 <code>9007199254740992</code>。</em></p>
<p><strong>大于 <code>9007199254740992</code> 的可能会丢失精度：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="9007199254740992     >> 10000000000000...000 // 共计 53 个 0
9007199254740992 + 1 >> 10000000000000...001 // 中间 52 个 0
9007199254740992 + 2 >> 10000000000000...010 // 中间 51 个 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-number">9007199254740992</span>     &gt;&gt; <span class="hljs-number">10000000000000.</span>.<span class="hljs-number">.000</span> <span class="hljs-comment">// 共计 53 个 0</span>
<span class="hljs-number">9007199254740992</span> + <span class="hljs-number">1</span> &gt;&gt; <span class="hljs-number">10000000000000.</span>.<span class="hljs-number">.001</span> <span class="hljs-comment">// 中间 52 个 0</span>
<span class="hljs-number">9007199254740992</span> + <span class="hljs-number">2</span> &gt;&gt; <span class="hljs-number">10000000000000.</span>.<span class="hljs-number">.010</span> <span class="hljs-comment">// 中间 51 个 0</span></code></pre>
<p><strong>实际上：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="9007199254740992 + 1 // 丢失  
9007199254740992 + 2 // 未丢失
9007199254740992 + 3 // 丢失
9007199254740992 + 4 // 未丢失" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-number">9007199254740992</span> + <span class="hljs-number">1</span> <span class="hljs-comment">// 丢失  </span>
<span class="hljs-number">9007199254740992</span> + <span class="hljs-number">2</span> <span class="hljs-comment">// 未丢失</span>
<span class="hljs-number">9007199254740992</span> + <span class="hljs-number">3</span> <span class="hljs-comment">// 丢失</span>
<span class="hljs-number">9007199254740992</span> + <span class="hljs-number">4</span> <span class="hljs-comment">// 未丢失</span></code></pre>
<p><strong>结果如图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fkl05s6utwj204p04jwea.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fkl05s6utwj204p04jwea.jpg" alt="计算结果" title="计算结果" style="cursor: pointer;"></span></p>
<p><em>以上，可以知道看似有穷的数字,在计算机的二进制表示里却是无穷的，由于存储位数限制因此存在“舍去”，精度丢失就发生了。</em></p>
<h3 id="articleHeader24">5.3 JS数字丢失精度的解决方案</h3>
<p><strong>对于整数</strong>，前端出现问题的几率可能比较低，毕竟很少有业务需要需要用到超大整数，只要运算结果不超过 <code>Math.pow(2, 53)</code> 就不会丢失精度。</p>
<p><strong>对于小数</strong>，前端出现问题的几率还是很多的，尤其在一些电商网站涉及到金额等数据。解决方式：<code>把小数放到位整数（乘倍数），再缩小回原来倍数（除倍数）</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 0.1 + 0.2
(0.1*10 + 0.2*10) / 10 == 0.3 // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 0.1 + 0.2</span>
(<span class="hljs-number">0.1</span>*<span class="hljs-number">10</span> + <span class="hljs-number">0.2</span>*<span class="hljs-number">10</span>) / <span class="hljs-number">10</span> == <span class="hljs-number">0.3</span> <span class="hljs-comment">// true</span></code></pre>
<h2 id="articleHeader25">6. 运算符</h2>
<h3 id="articleHeader26">6.1 一元运算符</h3>
<ul>
<li>
<code>一元</code>运算符有<code>1个</code>操作数。例如，递增运算符<code>"++"</code>,或者递减运算符<code>"--"</code>就是一元运算符。</li>
<li>
<code>二元</code>运算符有<code>2个</code>操作数。例如，除法运算符<code>"/"</code>有<code>2</code>个操作数。</li>
<li>
<code>三元</code>运算符有<code>3个</code>操作数。例如，条件运算符<code>"?:"</code>具有<code>3</code>个操作数。</li>
</ul>
<blockquote>递增 <code>"++"</code> 和 递减 <code>"--"</code> 还分为<code>前自增</code>或<code>后自增</code>，<code>前自减</code>或<code>后自减</code>,两种自增自减的运算结果是不一样的;</blockquote>
<ul>
<li>
<code>++num</code> 前自增    <code>--num</code> 前自减   先<code>+1</code>或<code>-1</code>，再返回值</li>
<li>
<code>num++</code> 后自增    <code>num--</code> 后自减   先返回值，再<code>+1</code>或<code>-1</code>
</li>
</ul>
<p><strong>举个例子，看代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num = 5;
console.log(num++);  // 5 
console.log(++num);  // 7 (因为刚刚num自增了一次，这里打印的话就等于在6的基础上前自增了,在计算机科学中，被称为副效应)
console.log(num--);  // 7 (这里是后自减，所以先返回值，返回7，再运算--，此时的num实际是等于6了)
console.log(--num);  // 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> num = <span class="hljs-number">5</span>;
<span class="hljs-built_in">console</span>.log(num++);  <span class="hljs-comment">// 5 </span>
<span class="hljs-built_in">console</span>.log(++num);  <span class="hljs-comment">// 7 (因为刚刚num自增了一次，这里打印的话就等于在6的基础上前自增了,在计算机科学中，被称为副效应)</span>
<span class="hljs-built_in">console</span>.log(num--);  <span class="hljs-comment">// 7 (这里是后自减，所以先返回值，返回7，再运算--，此时的num实际是等于6了)</span>
<span class="hljs-built_in">console</span>.log(--num);  <span class="hljs-comment">// 5</span></code></pre>
<h3 id="articleHeader27">6.2 逻辑运算符</h3>
<ul>
<li>
<code>&amp;&amp;</code>(与运算):只要有一个值为<code>假</code>，结果就是<code>假</code>。找<code>假</code>值 找到假值就返回，如果都是<code>真</code>，返回最后一个</li>
<li>
<code>||</code>(或运算):只要有一个值为<code>真</code>，结果就是<code>真</code>。找<code>真</code>值 找到真值就返回，如果都是<code>假</code>，返回最后一个</li>
<li>
<code>!</code>(非运算):取反</li>
</ul>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*细读上面三句话，就能理解为什么会是这个打印结果了*/
console.log(true &amp;&amp; true);          //true
console.log(false || false);        //false
console.log(null &amp;&amp; undefined);     //null
console.log(null || undefined);     //undefined
console.log(&quot;abc&quot; &amp;&amp; undefined);    //undefined
console.log(&quot;abc&quot; || undefined);    //abc
console.log(null || false || 0 || 1 || null);   //1
console.log(&quot;abc&quot; &amp;&amp; &quot;bcd&quot; &amp;&amp; &quot;def&quot;);           //def" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/*细读上面三句话，就能理解为什么会是这个打印结果了*/</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">true</span> &amp;&amp; <span class="hljs-literal">true</span>);          <span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">false</span> || <span class="hljs-literal">false</span>);        <span class="hljs-comment">//false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">null</span> &amp;&amp; <span class="hljs-literal">undefined</span>);     <span class="hljs-comment">//null</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">null</span> || <span class="hljs-literal">undefined</span>);     <span class="hljs-comment">//undefined</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"abc"</span> &amp;&amp; <span class="hljs-literal">undefined</span>);    <span class="hljs-comment">//undefined</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"abc"</span> || <span class="hljs-literal">undefined</span>);    <span class="hljs-comment">//abc</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">null</span> || <span class="hljs-literal">false</span> || <span class="hljs-number">0</span> || <span class="hljs-number">1</span> || <span class="hljs-literal">null</span>);   <span class="hljs-comment">//1</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"abc"</span> &amp;&amp; <span class="hljs-string">"bcd"</span> &amp;&amp; <span class="hljs-string">"def"</span>);           <span class="hljs-comment">//def</span></code></pre>
<h3 id="articleHeader28">6.3 运算符的优先级</h3>
<ul>
<li>1、<code>()</code>  优先级最高</li>
<li>2、一元运算符  <code>++</code>   <code>--</code>  <code>!</code>
</li>
<li>3、算数运算符  先<code>*</code>  <code>/</code>  <code>%</code>   后 <code>+</code>   <code>-</code>
</li>
<li>4、关系运算符  <code>&gt;</code>   <code>&gt;=</code>   <code>&lt;</code>   <code>&lt;=</code>
</li>
<li>5、相等运算符   <code>==</code>   <code>!=</code>    <code>===</code>    <code>!==</code>
</li>
<li>6、逻辑运算符 先<code>&amp;&amp;</code>   后<code>||</code>
</li>
</ul>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第一题              true              &amp;&amp;           true
console.log(((4 >= 6) || (&quot;人&quot; != &quot;狗&quot;)) &amp;&amp; !(((12 * 2) == 144) &amp;&amp; true));  // true

// 第二题 
var num = 10;
// true         &amp;&amp;           true
if(5 == num / 2 &amp;&amp; (2 + 2 * num).toString() === &quot;22&quot;) {
   console.log(true);        //  true
}else{
   console.log(false);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第一题              true              &amp;&amp;           true</span>
<span class="hljs-built_in">console</span>.log(((<span class="hljs-number">4</span> &gt;= <span class="hljs-number">6</span>) || (<span class="hljs-string">"人"</span> != <span class="hljs-string">"狗"</span>)) &amp;&amp; !(((<span class="hljs-number">12</span> * <span class="hljs-number">2</span>) == <span class="hljs-number">144</span>) &amp;&amp; <span class="hljs-literal">true</span>));  <span class="hljs-comment">// true</span>

<span class="hljs-comment">// 第二题 </span>
<span class="hljs-keyword">var</span> num = <span class="hljs-number">10</span>;
<span class="hljs-comment">// true         &amp;&amp;           true</span>
<span class="hljs-keyword">if</span>(<span class="hljs-number">5</span> == num / <span class="hljs-number">2</span> &amp;&amp; (<span class="hljs-number">2</span> + <span class="hljs-number">2</span> * num).toString() === <span class="hljs-string">"22"</span>) {
   <span class="hljs-built_in">console</span>.log(<span class="hljs-literal">true</span>);        <span class="hljs-comment">//  true</span>
}<span class="hljs-keyword">else</span>{
   <span class="hljs-built_in">console</span>.log(<span class="hljs-literal">false</span>);
}</code></pre>
<h2 id="articleHeader29">7. 选择语句</h2>
<h3 id="articleHeader30">7.1 if..else语句</h3>
<p><strong>语法：</strong></p>
<p>只有一个判断条件的时候 <code>if..else</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(判断条件){   // 当判断条件为true的时候执行代码1，为false的时候执行代码2
    代码1;     
}else{
    代码2;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span>(判断条件){   <span class="hljs-comment">// 当判断条件为true的时候执行代码1，为false的时候执行代码2</span>
    代码<span class="hljs-number">1</span>;     
}<span class="hljs-keyword">else</span>{
    代码<span class="hljs-number">2</span>;
}
</code></pre>
<p>当不止一个判断条件的时候 <code>else</code>用<code>else if</code> 代替：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(判断条件1){          // 判断条件 1 为 true 的时候执行 代码 1
    代码1; 
}else if(判断条件2){    // 判断条件 2 为 true 的时候执行 代码 2
    代码2; 
}else{                  // 两个条件都不满足的时候执行代码 3
    代码3;         
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span>(判断条件<span class="hljs-number">1</span>){          <span class="hljs-comment">// 判断条件 1 为 true 的时候执行 代码 1</span>
    代码<span class="hljs-number">1</span>; 
}<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(判断条件<span class="hljs-number">2</span>){    <span class="hljs-comment">// 判断条件 2 为 true 的时候执行 代码 2</span>
    代码<span class="hljs-number">2</span>; 
}<span class="hljs-keyword">else</span>{                  <span class="hljs-comment">// 两个条件都不满足的时候执行代码 3</span>
    代码<span class="hljs-number">3</span>;         
}</code></pre>
<p><strong>思考1：</strong></p>
<ul>
<li>如果满<code>18</code>，告诉他可以看电影</li>
<li>如果满了<code>16</code>，告诉他可以在家长的陪同下观看</li>
<li>如果不够<code>16</code>，告诉他不准看</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var age = 20;
if(age >= 18){
    console.log(&quot;没时间解释了，赶紧上车吧&quot;);   // 打印这条
}else if(age >= 16){
    console.log(&quot;请在家长的陪同下观看&quot;);
}else {
    console.log(&quot;回家学习吧&quot;);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> age = <span class="hljs-number">20</span>;
<span class="hljs-keyword">if</span>(age &gt;= <span class="hljs-number">18</span>){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"没时间解释了，赶紧上车吧"</span>);   <span class="hljs-comment">// 打印这条</span>
}<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(age &gt;= <span class="hljs-number">16</span>){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"请在家长的陪同下观看"</span>);
}<span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"回家学习吧"</span>);
}</code></pre>
<p><strong>思考2：</strong></p>
<ul>
<li>根据<code>new Date().getDay()</code>获取今天是星期几</li>
<li>由于获取到的是纯数字，现在需要根据这个数字输出"今天是周*"的字符串</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var date = new Date();      // 获取当前的时间
var week = date.getDay();   // 获得 0-6 表示周几 0:星期日
if(week == 0){
    console.log(&quot;今天是星期天&quot;);
}else if(week == 1){
    console.log(&quot;今天是星期一&quot;);
}else if(week == 2){
    console.log(&quot;今天是星期二&quot;);
}else if(week == 3){
    console.log(&quot;今天是星期三&quot;);
}else if(week == 4){
    console.log(&quot;今天是星期四&quot;);
}else if(week == 5){
    console.log(&quot;今天是星期五&quot;);
}else if(week == 6){
    console.log(&quot;今天是星期六&quot;);
}else{
    console.log(&quot;你火星的来的吧&quot;);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> date = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();      <span class="hljs-comment">// 获取当前的时间</span>
<span class="hljs-keyword">var</span> week = date.getDay();   <span class="hljs-comment">// 获得 0-6 表示周几 0:星期日</span>
<span class="hljs-keyword">if</span>(week == <span class="hljs-number">0</span>){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"今天是星期天"</span>);
}<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(week == <span class="hljs-number">1</span>){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"今天是星期一"</span>);
}<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(week == <span class="hljs-number">2</span>){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"今天是星期二"</span>);
}<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(week == <span class="hljs-number">3</span>){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"今天是星期三"</span>);
}<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(week == <span class="hljs-number">4</span>){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"今天是星期四"</span>);
}<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(week == <span class="hljs-number">5</span>){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"今天是星期五"</span>);
}<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(week == <span class="hljs-number">6</span>){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"今天是星期六"</span>);
}<span class="hljs-keyword">else</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"你火星的来的吧"</span>);
}</code></pre>
<h3 id="articleHeader31">7.2 switch..case</h3>
<p><strong>语法：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// switch: 开关; case: 案列;

switch(变量){       // 判断变量是否全等于case的值1，或者值2，
    case 值1:
        执行代码1;  // 全等于的时候执行代码1
        break;      // 然后break；代码跳出switch语句， 不加break，会继续执行下面的代码
    case 值2:
        执行代码2;
        break;
    default:
        执行代码3; // 当都不满足条件的时候，会执行默认里的执行代码3
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// switch: 开关; case: 案列;</span>

<span class="hljs-keyword">switch</span>(变量){       <span class="hljs-comment">// 判断变量是否全等于case的值1，或者值2，</span>
    <span class="hljs-keyword">case</span> 值<span class="hljs-number">1</span>:
        执行代码<span class="hljs-number">1</span>;  <span class="hljs-comment">// 全等于的时候执行代码1</span>
        <span class="hljs-keyword">break</span>;      <span class="hljs-comment">// 然后break；代码跳出switch语句， 不加break，会继续执行下面的代码</span>
    <span class="hljs-keyword">case</span> 值<span class="hljs-number">2</span>:
        执行代码<span class="hljs-number">2</span>;
        <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">default</span>:
        执行代码<span class="hljs-number">3</span>; <span class="hljs-comment">// 当都不满足条件的时候，会执行默认里的执行代码3</span>
}</code></pre>
<p><strong>思考：素质教育（把分数变成ABCDE）</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 90-100 : A
// 80-89:   B
// 70-79:   C
// 60-69:   D
// 0-59 :   E
// 这里的等级是根据一个范围的分数划定的，用if..else很容易实现，但是switch..case是一个具体的条件，怎么办呢？
// 方法：将分数除以10再用parseInt属性取整
  
var score = 85;
score = parseInt(score/10); // 8
switch (score) {
// score = 10 或者 9 的时候 返回 A
case 10:
case 9:
    console.log(&quot;A&quot;);
    break;
// score = 8 的时候 返回 B
case 8:
    console.log(&quot;B&quot;);
    break;
case 7:
    console.log(&quot;C&quot;);
    break;
case 6:
    console.log(&quot;D&quot;);
    break;
default:
    console.log(&quot;E&quot;);
}           
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 90-100 : A</span>
<span class="hljs-comment">// 80-89:   B</span>
<span class="hljs-comment">// 70-79:   C</span>
<span class="hljs-comment">// 60-69:   D</span>
<span class="hljs-comment">// 0-59 :   E</span>
<span class="hljs-comment">// 这里的等级是根据一个范围的分数划定的，用if..else很容易实现，但是switch..case是一个具体的条件，怎么办呢？</span>
<span class="hljs-comment">// 方法：将分数除以10再用parseInt属性取整</span>
  
<span class="hljs-keyword">var</span> score = <span class="hljs-number">85</span>;
score = <span class="hljs-built_in">parseInt</span>(score/<span class="hljs-number">10</span>); <span class="hljs-comment">// 8</span>
<span class="hljs-keyword">switch</span> (score) {
<span class="hljs-comment">// score = 10 或者 9 的时候 返回 A</span>
<span class="hljs-keyword">case</span> <span class="hljs-number">10</span>:
<span class="hljs-keyword">case</span> <span class="hljs-number">9</span>:
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"A"</span>);
    <span class="hljs-keyword">break</span>;
<span class="hljs-comment">// score = 8 的时候 返回 B</span>
<span class="hljs-keyword">case</span> <span class="hljs-number">8</span>:
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"B"</span>);
    <span class="hljs-keyword">break</span>;
<span class="hljs-keyword">case</span> <span class="hljs-number">7</span>:
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"C"</span>);
    <span class="hljs-keyword">break</span>;
<span class="hljs-keyword">case</span> <span class="hljs-number">6</span>:
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"D"</span>);
    <span class="hljs-keyword">break</span>;
<span class="hljs-keyword">default</span>:
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"E"</span>);
}           
</code></pre>
<h3 id="articleHeader32">7.3 三元运算符</h3>
<blockquote>这个运算符可以用来代替<code>if..else</code>条件判断。但是为什么有这个运算符呢？这里的原因是<code>if..else</code>使用两个代码块，却只有一个会执行，在讲究的程序员看来是一种浪费。所以使用三元运算符，用一条语句就可以完成功能。</blockquote>
<p><strong>语法：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="判断语句?表达式1:表达式2;  

根据判断语句返回的布尔值，true的话，返回表达式1，false的话返回表达式2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">判断语句?表达式<span class="hljs-number">1</span>:表达式<span class="hljs-number">2</span>;  

根据判断语句返回的布尔值，<span class="hljs-literal">true</span>的话，返回表达式<span class="hljs-number">1</span>，<span class="hljs-literal">false</span>的话返回表达式<span class="hljs-number">2</span></code></pre>
<p><strong>举个例子，看代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sex = 1;
sex == 1 ? &quot;男&quot;:&quot;女&quot;;   // 判断sex是否等于1，如果true，返回第一个表达式:&quot;男&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> sex = <span class="hljs-number">1</span>;
sex == <span class="hljs-number">1</span> ? <span class="hljs-string">"男"</span>:<span class="hljs-string">"女"</span>;   <span class="hljs-comment">// 判断sex是否等于1，如果true，返回第一个表达式:"男"</span></code></pre>
<p><strong>例题：判断两个数的大小</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 用if..else语句解决
// 这里使用了两个代码块，有点浪费
var num1 = 18;
var num2 = 39;
var max;
if(num1>num2){
    max = num1;
}else{
    max = num2;
}
console.log(max);

// 用三元运算符
var num3 = 28;
var num4 = 49;
var max1 = num3>num4? num3:num4;
console.log(max1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 用if..else语句解决</span>
<span class="hljs-comment">// 这里使用了两个代码块，有点浪费</span>
<span class="hljs-keyword">var</span> num1 = <span class="hljs-number">18</span>;
<span class="hljs-keyword">var</span> num2 = <span class="hljs-number">39</span>;
<span class="hljs-keyword">var</span> max;
<span class="hljs-keyword">if</span>(num1&gt;num2){
    max = num1;
}<span class="hljs-keyword">else</span>{
    max = num2;
}
<span class="hljs-built_in">console</span>.log(max);

<span class="hljs-comment">// 用三元运算符</span>
<span class="hljs-keyword">var</span> num3 = <span class="hljs-number">28</span>;
<span class="hljs-keyword">var</span> num4 = <span class="hljs-number">49</span>;
<span class="hljs-keyword">var</span> max1 = num3&gt;num4? num3:num4;
<span class="hljs-built_in">console</span>.log(max1);</code></pre>
<p><strong>注意(容易出错的地方)：</strong></p>
<blockquote>下面这个语句判断如果是会员，费用为<code>2</code>美元，非会员，为<code>10</code>美元。现在设置了非会员，却打印出了<code>2</code>美元，显然出错了。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var isMember = false;
console.log(&quot;当前费用&quot; + isMember ? &quot;$2.00&quot; : &quot;$10.00&quot;); // &quot;$2.00&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> isMember = <span class="hljs-literal">false</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"当前费用"</span> + isMember ? <span class="hljs-string">"$2.00"</span> : <span class="hljs-string">"$10.00"</span>); <span class="hljs-comment">// "$2.00"</span></code></pre>
<blockquote>出错的原因是<code>？</code>号的优先级比<code>＋</code>号低，所以实际运行的语句是</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//              true
console.log(&quot;当前费用false&quot; ? &quot;$2.00&quot; : &quot;$10.00&quot;);  // &quot;$2.00&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//              true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"当前费用false"</span> ? <span class="hljs-string">"$2.00"</span> : <span class="hljs-string">"$10.00"</span>);  <span class="hljs-comment">// "$2.00"</span></code></pre>
<h2 id="articleHeader33">8.循环语句</h2>
<h3 id="articleHeader34">8.1 while 循环</h3>
<p><strong>语法：</strong></p>
<ul>
<li>1、如果循环条件的结果是<code>true</code>的时候，就会执行循环体</li>
<li>2、如果循环条件的结果是<code>false</code>的时候，结束循环。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1. 如果循环条件的结果是true的时候，就会执行循环体
// 2. 如果循环条件的结果是false的时候，结束循环。
while(循环条件){
  循环的代码;      // 循环体
  自增或者自减;    // 一定不要忘记自增或自减，否则就会死循环
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 1. 如果循环条件的结果是true的时候，就会执行循环体</span>
<span class="hljs-comment">// 2. 如果循环条件的结果是false的时候，结束循环。</span>
<span class="hljs-keyword">while</span>(循环条件){
  循环的代码;      <span class="hljs-comment">// 循环体</span>
  自增或者自减;    <span class="hljs-comment">// 一定不要忘记自增或自减，否则就会死循环</span>
}</code></pre>
<p><strong>例如，求0~100的和：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num = 0;
var sum = 0;
while(num <= 100){
    sum += num;
    num++;
}
console.log(sum); // 5050" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> num = <span class="hljs-number">0</span>;
<span class="hljs-keyword">var</span> sum = <span class="hljs-number">0</span>;
<span class="hljs-keyword">while</span>(num &lt;= <span class="hljs-number">100</span>){
    sum += num;
    num++;
}
<span class="hljs-built_in">console</span>.log(sum); <span class="hljs-comment">// 5050</span></code></pre>
<h3 id="articleHeader35">8.2 do..while 循环</h3>
<p><strong>语法：</strong></p>
<ul>
<li>
<code>do..while</code>循环<code>和while</code>循环非常像，二者经常可以相互替代</li>
<li>但是<code>do..while</code>的特点是不管条件成不成立，都会执行<code>1</code>次。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="do{
    循环的代码;      // 循环体
    自增或者自减;    // 一定不要忘记自增或自减，否则就会死循环
}while(循环条件);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">do</span>{
    循环的代码;      <span class="hljs-comment">// 循环体</span>
    自增或者自减;    <span class="hljs-comment">// 一定不要忘记自增或自减，否则就会死循环</span>
}<span class="hljs-keyword">while</span>(循环条件);</code></pre>
<p><strong>例如，求0~100的和：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num = 0;
var sum = 0;
do{
    sum += num;
    num++；
}while(num<=100);
console.log(sum); // 5050" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> num = <span class="hljs-number">0</span>;
<span class="hljs-keyword">var</span> sum = <span class="hljs-number">0</span>;
<span class="hljs-keyword">do</span>{
    sum += num;
    num++；
}<span class="hljs-keyword">while</span>(num&lt;=<span class="hljs-number">100</span>);
<span class="hljs-built_in">console</span>.log(sum); <span class="hljs-comment">// 5050</span></code></pre>
<h3 id="articleHeader36">8.3 for 循环</h3>
<blockquote>写<code>while</code>循环的经常会忘记自增，<code>for</code>循环其实是<code>while</code>循环演化过来的，语法更加的简洁明了，使用非常的广泛。</blockquote>
<p><strong>语法：</strong></p>
<ul>
<li>初始化表达式</li>
<li>判断表达式</li>
<li>自增表达式</li>
<li>循环体</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//主要for循环的表达式之间用的是;号分隔的，千万不要写成,号
for(初始化表达式;判断表达式;自增表达式){
  //循环体
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//主要for循环的表达式之间用的是;号分隔的，千万不要写成,号</span>
<span class="hljs-keyword">for</span>(初始化表达式;判断表达式;自增表达式){
  <span class="hljs-comment">//循环体</span>
}</code></pre>
<p><strong>例如：求0~100的和：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sum = 0;
for(var num = 0; num <= 100; num++){
    sum += num;
}
console.log(sum);  // 5050" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> sum = <span class="hljs-number">0</span>;
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> num = <span class="hljs-number">0</span>; num &lt;= <span class="hljs-number">100</span>; num++){
    sum += num;
}
<span class="hljs-built_in">console</span>.log(sum);  <span class="hljs-comment">// 5050</span></code></pre>
<h3 id="articleHeader37">8.4 break 和 continue</h3>
<blockquote>
<code>break</code>:立即跳出整个循环，即循环结束，开始执行循环后面的内容（直接跳到大括号）<p><code>continue</code>:立即跳出当前循环，继续下一次循环（跳到<code>i++</code>的地方）</p>
</blockquote>
<p><strong>1、continue 示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i = 1; i <= 10; i++) {
    if(i == 5) {
      continue;
    }
    console.log(i); // 1,2,3,4,6,7,8,9,10
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt;= <span class="hljs-number">10</span>; i++) {
    <span class="hljs-keyword">if</span>(i == <span class="hljs-number">5</span>) {
      <span class="hljs-keyword">continue</span>;
    }
    <span class="hljs-built_in">console</span>.log(i); <span class="hljs-comment">// 1,2,3,4,6,7,8,9,10</span>
}</code></pre>
<p><strong>2、break 示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i = 1; i <= 10; i++) {
    if(i == 5) {
      break;
    }
    console.log(i); // 1,2,3,4
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt;= <span class="hljs-number">10</span>; i++) {
    <span class="hljs-keyword">if</span>(i == <span class="hljs-number">5</span>) {
      <span class="hljs-keyword">break</span>;
    }
    <span class="hljs-built_in">console</span>.log(i); <span class="hljs-comment">// 1,2,3,4</span>
}</code></pre>
<h3 id="articleHeader38">8.5 循环语句练习</h3>
<p><strong>1、计算一个数的位数</strong></p>
<p>当不知道循环次数的时候，用<code>while</code>循环：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num = 1234567;
//因为不知道循环次数，所以推荐使用while循环
var count = 0;      // count记录位数
while(num != 0){    // 循环条件
    num = parseInt(num/10);// 让num缩小10倍
    count++;     // ，每缩小10倍就计算一次位数了
}
console.log(count);  // 7" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> num = <span class="hljs-number">1234567</span>;
<span class="hljs-comment">//因为不知道循环次数，所以推荐使用while循环</span>
<span class="hljs-keyword">var</span> count = <span class="hljs-number">0</span>;      <span class="hljs-comment">// count记录位数</span>
<span class="hljs-keyword">while</span>(num != <span class="hljs-number">0</span>){    <span class="hljs-comment">// 循环条件</span>
    num = <span class="hljs-built_in">parseInt</span>(num/<span class="hljs-number">10</span>);<span class="hljs-comment">// 让num缩小10倍</span>
    count++;     <span class="hljs-comment">// ，每缩小10倍就计算一次位数了</span>
}
<span class="hljs-built_in">console</span>.log(count);  <span class="hljs-comment">// 7</span></code></pre>
<p><strong>2、翻转一个数</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num = 12345678;
//因为不知道循环次数，所以推荐使用while循环
var str = &quot;&quot;;  
while(num != 0){
    str += num%10;  // 将每一位取余
    num = parseInt(num/10);//让num缩小10倍
}
// str 是一个字符串，所以 +str将它转回Number类型
console.log(+str); //" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> num = <span class="hljs-number">12345678</span>;
<span class="hljs-comment">//因为不知道循环次数，所以推荐使用while循环</span>
<span class="hljs-keyword">var</span> str = <span class="hljs-string">""</span>;  
<span class="hljs-keyword">while</span>(num != <span class="hljs-number">0</span>){
    str += num%<span class="hljs-number">10</span>;  <span class="hljs-comment">// 将每一位取余</span>
    num = <span class="hljs-built_in">parseInt</span>(num/<span class="hljs-number">10</span>);<span class="hljs-comment">//让num缩小10倍</span>
}
<span class="hljs-comment">// str 是一个字符串，所以 +str将它转回Number类型</span>
<span class="hljs-built_in">console</span>.log(+str); <span class="hljs-comment">//</span></code></pre>
<p><strong>3、总结：</strong></p>
<ul>
<li>循环有很多种，但是以后用得最多的是<code>for</code>循环</li>
<li>当不明确循环次数的时候，可以使<code>用while</code>循环</li>
<li>当无论如何都要执行一次代码的时候，可以使用<code>do..while</code>循环。</li>
<li>循环可以相互替代。</li>
</ul>
<h2 id="articleHeader39">9. 数组</h2>
<blockquote>所谓数组，就是将多个元素(通常是同一类型的)，按一定顺序排列放到一个集合中，那么这个集合就称之为数组</blockquote>
<p>在<code>javascript</code>中，数组是一个<code>有序</code>的列表，可以在数组中存放<code>任意</code>的数据，并且数组的长度可以<code>动态</code>的调整</p>
<h3 id="articleHeader40">9.1 创建数组</h3>
<p><strong>1、通过构造函数创建数组：</strong></p>
<ul>
<li>
<code>var arr = new Array();</code> 创建了一个空数组；</li>
<li>
<code>var arr = new Array('aa','bb','cc');</code> 创建了一个数组，里面存放了三个字符串</li>
<li>
<code>var arr = new Array(11,22,33)</code> 创建了一个数组，里面存放了三个数字</li>
</ul>
<p><strong>2、通过数组子面量创建数组：</strong></p>
<ul>
<li>
<code>var arr = [];</code> 创建了一个空数组</li>
<li>
<code>var arr = [11,22,33];</code> 创建了一个数组，里面存放了三个数字</li>
<li>
<code>var arr = ['aa','bb','cc'];</code> 创建了一个数组，里面存放了三个字符串</li>
</ul>
<h3 id="articleHeader41">9.2 数组的下标与长度</h3>
<p><strong>数组的下标：</strong></p>
<blockquote>数组是有序的，数组中的每一个元素都对应了一个下标,下标是从<code>0</code>开始的</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['aa','bb','cc'];
arr[0]; // 下标是0，对应的值是'aa'
arr[2]; // 下标是2，对应的值是'cc'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">'aa'</span>,<span class="hljs-string">'bb'</span>,<span class="hljs-string">'cc'</span>];
arr[<span class="hljs-number">0</span>]; <span class="hljs-comment">// 下标是0，对应的值是'aa'</span>
arr[<span class="hljs-number">2</span>]; <span class="hljs-comment">// 下标是2，对应的值是'cc'</span></code></pre>
<p><strong>数组的长度：</strong></p>
<blockquote>跟字符串一样，数组也有一个<code>length</code>的属性，指数组中存放的元素的<code>个数</code>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['aa','bb','cc'];
arr.length; // 数组的长度为3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">'aa'</span>,<span class="hljs-string">'bb'</span>,<span class="hljs-string">'cc'</span>];
arr.length; <span class="hljs-comment">// 数组的长度为3</span></code></pre>
<p><em>空数组的长度为<code>0</code></em></p>
<p><strong>数组的长度与下标的关系：</strong></p>
<p><em><code>数组的最大下标 </code> = <code>数组的长度</code> - <code>1</code></em></p>
<h3 id="articleHeader42">9.3 数组的赋值与取值</h3>
<p><strong>数组的取值：</strong></p>
<ul>
<li>格式：<code>数组名[下标]</code>
</li>
<li>功能：获取数组对应下标的那个值，如果下标不存在，返回<code>undefined</code>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['red','blue','green'];
arr[0]; // red
arr[2]; // green
arr[3]; // 返回undefined，因为数组最大的下标为2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">'red'</span>,<span class="hljs-string">'blue'</span>,<span class="hljs-string">'green'</span>];
arr[<span class="hljs-number">0</span>]; <span class="hljs-comment">// red</span>
arr[<span class="hljs-number">2</span>]; <span class="hljs-comment">// green</span>
arr[<span class="hljs-number">3</span>]; <span class="hljs-comment">// 返回undefined，因为数组最大的下标为2</span></code></pre>
<p><strong>数组的赋值：</strong></p>
<ul>
<li>格式：<code>数组名[下标] = 值;</code>
</li>
<li>功能：为数组新增值，如果下标有对应的值，会把原来的覆盖，如果下标不存在，会给数组新增一个元素</li>
<li>注意：如果一个数组的最大长度是<code>3</code>，可是却给数组下标为<code>5</code>赋了一个值，则下标为<code>3、4</code>的值为<code>empty</code>(空)</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;];
arr[0] = &quot;yellow&quot;; // 把red替换成了yellow
arr[3] = &quot;pink&quot;;   // 给数组新增加了一个pink的值
arr[5] = &quot;black&quot;;  // 数组输出为[&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;,empty,empty,&quot;black&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">"red"</span>, <span class="hljs-string">"green"</span>, <span class="hljs-string">"blue"</span>];
arr[<span class="hljs-number">0</span>] = <span class="hljs-string">"yellow"</span>; <span class="hljs-comment">// 把red替换成了yellow</span>
arr[<span class="hljs-number">3</span>] = <span class="hljs-string">"pink"</span>;   <span class="hljs-comment">// 给数组新增加了一个pink的值</span>
arr[<span class="hljs-number">5</span>] = <span class="hljs-string">"black"</span>;  <span class="hljs-comment">// 数组输出为["red", "green", "blue",empty,empty,"black"]</span></code></pre>
<h3 id="articleHeader43">9.4 数组的遍历</h3>
<blockquote>遍历: 对数组的每一个元素都访问一次，叫做遍历</blockquote>
<p><strong>数组遍历的基本语法：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3,4,5,6,7,8,9];
for(var i = 0; i < arr.length; i++){
    console.log(arr[i]); // 1 2 3 4 5 6 7 8 9 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>,<span class="hljs-number">8</span>,<span class="hljs-number">9</span>];
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++){
    <span class="hljs-built_in">console</span>.log(arr[i]); <span class="hljs-comment">// 1 2 3 4 5 6 7 8 9 </span>
}</code></pre>
<p><strong>数组遍历的逆向遍历语法：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// i= arr.length-1 ==> 表示初始化表达式 从数组最后一位开始遍历
// i>=0 表示判断条件，下标要满足大于等于0
// i--，表示每次遍历 初始值都是自减的
var arr = [1,2,3,4,5,6,7,8,9];
for(var i = arr.length-1; i >= 0; i--){
    console.log(arr[i]); // 9 8 7 6 5 4 3 2 1
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// i= arr.length-1 ==&gt; 表示初始化表达式 从数组最后一位开始遍历</span>
<span class="hljs-comment">// i&gt;=0 表示判断条件，下标要满足大于等于0</span>
<span class="hljs-comment">// i--，表示每次遍历 初始值都是自减的</span>
<span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>,<span class="hljs-number">8</span>,<span class="hljs-number">9</span>];
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = arr.length<span class="hljs-number">-1</span>; i &gt;= <span class="hljs-number">0</span>; i--){
    <span class="hljs-built_in">console</span>.log(arr[i]); <span class="hljs-comment">// 9 8 7 6 5 4 3 2 1</span>
}</code></pre>
<h3 id="articleHeader44">9.5 数组综合练习</h3>
<p><strong>1、求一个数组中的最大值、最小值以及对应的下标</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [298, 1, 3, 4, 6, 2, 23, -88,77,44];
var max = arr[0]; // 随机取数组中的一个值与其他值比较
var maxIndex = 0; // 初始化最大值的下标
var min = arr[0];
var minIndex = 0;
for(var i = 0; i< arr.length; i++){
    if(max < arr[i]){    // 用一开始选择的值，与遍历后的值进行比较
        max = arr[i];    // 当后面的值比初始值大，就将后面的这个值赋值给初始值，再用这个全新的值再v  去与后面的比较
        maxIndex = i;    // 比较结束后，此时的索引就是最大值的索引
    }
    if(min > arr[i]){
        min = arr[i];
        minIndex = i;
    }
}
console.log(&quot;最大的值是：&quot; + max);
console.log(&quot;最大值的下标是：&quot; + maxIndex);
console.log(&quot;最小的值是：&quot; + min);
console.log(&quot;最小值的下标是：&quot; + minIndex);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">298</span>, <span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">6</span>, <span class="hljs-number">2</span>, <span class="hljs-number">23</span>, <span class="hljs-number">-88</span>,<span class="hljs-number">77</span>,<span class="hljs-number">44</span>];
<span class="hljs-keyword">var</span> max = arr[<span class="hljs-number">0</span>]; <span class="hljs-comment">// 随机取数组中的一个值与其他值比较</span>
<span class="hljs-keyword">var</span> maxIndex = <span class="hljs-number">0</span>; <span class="hljs-comment">// 初始化最大值的下标</span>
<span class="hljs-keyword">var</span> min = arr[<span class="hljs-number">0</span>];
<span class="hljs-keyword">var</span> minIndex = <span class="hljs-number">0</span>;
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i&lt; arr.length; i++){
    <span class="hljs-keyword">if</span>(max &lt; arr[i]){    <span class="hljs-comment">// 用一开始选择的值，与遍历后的值进行比较</span>
        max = arr[i];    <span class="hljs-comment">// 当后面的值比初始值大，就将后面的这个值赋值给初始值，再用这个全新的值再v  去与后面的比较</span>
        maxIndex = i;    <span class="hljs-comment">// 比较结束后，此时的索引就是最大值的索引</span>
    }
    <span class="hljs-keyword">if</span>(min &gt; arr[i]){
        min = arr[i];
        minIndex = i;
    }
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"最大的值是："</span> + max);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"最大值的下标是："</span> + maxIndex);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"最小的值是："</span> + min);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"最小值的下标是："</span> + minIndex);</code></pre>
<p><strong>2、让数组倒序保存到一个新的数组中</strong></p>
<p>需要了解数组的一个方法 <code>push</code>,在数组的<code>最后面</code>添加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [&quot;大乔&quot;, &quot;小乔&quot;, &quot;甄姬&quot;, &quot;不知火舞&quot;];
var newArr = [];
for (var i = arr.length - 1; i >= 0; i--) {
    newArr.push(arr[i]);
}
console.log(newArr); // [&quot;不知火舞&quot;, &quot;甄姬&quot;, &quot;小乔&quot;, &quot;大乔&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">"大乔"</span>, <span class="hljs-string">"小乔"</span>, <span class="hljs-string">"甄姬"</span>, <span class="hljs-string">"不知火舞"</span>];
<span class="hljs-keyword">var</span> newArr = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = arr.length - <span class="hljs-number">1</span>; i &gt;= <span class="hljs-number">0</span>; i--) {
    newArr.push(arr[i]);
}
<span class="hljs-built_in">console</span>.log(newArr); <span class="hljs-comment">// ["不知火舞", "甄姬", "小乔", "大乔"]</span></code></pre>
<p><strong>3、将字符串数组用"|"或其他符号拼成一个字符串</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [&quot;aa&quot;,&quot;bb&quot;,&quot;cc&quot;,&quot;dd&quot;];
var str = &quot;&quot;;
for(var i = 0; i<arr.length; i++){
    if(i == arr.length-1){
        str = str + arr[i]; // 判断一下，如果是最后一个的话就不用加“|”
    }else{
        str = str + arr[i]+&quot;|&quot;;  // str初始值是一个空字符串，遍历的时候需要加上前一次的结果
    }
    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">"aa"</span>,<span class="hljs-string">"bb"</span>,<span class="hljs-string">"cc"</span>,<span class="hljs-string">"dd"</span>];
<span class="hljs-keyword">var</span> str = <span class="hljs-string">""</span>;
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i&lt;arr.length; i++){
    <span class="hljs-keyword">if</span>(i == arr.length<span class="hljs-number">-1</span>){
        str = str + arr[i]; <span class="hljs-comment">// 判断一下，如果是最后一个的话就不用加“|”</span>
    }<span class="hljs-keyword">else</span>{
        str = str + arr[i]+<span class="hljs-string">"|"</span>;  <span class="hljs-comment">// str初始值是一个空字符串，遍历的时候需要加上前一次的结果</span>
    }
    
}</code></pre>
<p><strong>4、数组去重</strong></p>
<ul>
<li>定义一个新的数组，分别遍历两个数组，判断两个里的每一项是否相等；</li>
<li>如果发现两个相等，说明是重复的；</li>
<li>当两个不相等的时候，将这个去重数组的当前项<code>push</code>到新数组中；</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1, 1, 5, 7, 8, 3, 2, 5, 7, 2, 4, 6, 2, 5, 7, 2, 5];
//定义一个新数组
var newArr = [];

//遍历需要去重的数组
for (var i = 0; i < arr.length; i++) {
    //假设不存在
    var flag = true;
    //需要判断arr[i]这个值是否在新数组中存在
    for(var j = 0; j < newArr.length; j++){
        //进行比较即可
        if(arr[i] == newArr[j]){
            //如果发现了相等的数，说明存在
            flag = false;
        }
    }
    if(flag){
        //如果假设成立，说明不存在
        newArr.push(arr[i]);
    }
}
console.log(newArr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">7</span>, <span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">6</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">7</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>];
<span class="hljs-comment">//定义一个新数组</span>
<span class="hljs-keyword">var</span> newArr = [];

<span class="hljs-comment">//遍历需要去重的数组</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
    <span class="hljs-comment">//假设不存在</span>
    <span class="hljs-keyword">var</span> flag = <span class="hljs-literal">true</span>;
    <span class="hljs-comment">//需要判断arr[i]这个值是否在新数组中存在</span>
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; newArr.length; j++){
        <span class="hljs-comment">//进行比较即可</span>
        <span class="hljs-keyword">if</span>(arr[i] == newArr[j]){
            <span class="hljs-comment">//如果发现了相等的数，说明存在</span>
            flag = <span class="hljs-literal">false</span>;
        }
    }
    <span class="hljs-keyword">if</span>(flag){
        <span class="hljs-comment">//如果假设成立，说明不存在</span>
        newArr.push(arr[i]);
    }
}
<span class="hljs-built_in">console</span>.log(newArr);</code></pre>
<h2 id="articleHeader45">10. 冒泡排序</h2>
<h3 id="articleHeader46">10.1 冒泡排序的思路</h3>
<blockquote>一个有<code>8位</code>元素的数组，让它的第一位与后面每一位进行比较，前面一位小于后面的时候，位置不变，前面的大于后面的交换位置，就这样一共要比七趟(最后一趟不要比，就剩一位，就是最小的)；</blockquote>
<p><strong>实现原理如下图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fl99gzcci4g208c050787.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fl99gzcci4g208c050787.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader47">10.2 按性能等级冒泡排序分3个等级</h3>
<p><strong>1、冒泡排序 60分：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [3, 1, 2, 5, 4, 8, 9, 7, 6];
var tang = 0;
var ci = 0;
for (var i = 0; i < arr.length - 1; i++) {       // 外层for循环，循环的是比较的趟数，因为只要比较8趟 所以i判断的条件为length-1
    tang++;
    for (var j = 0; j < arr.length - 1; j++) {   // 内层for循环，循环的是比较的次数，每趟比较8次
        ci++;
        if (arr[j] > arr[j + 1]) {  // 判断比较的两个数，如果前面的大于后面的一位，交换位置
            var temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
}
console.log(&quot;趟数：&quot; + tang);   // 8趟
console.log(&quot;次数：&quot; + ci);     // 64次
console.log(arr);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">3</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>, <span class="hljs-number">7</span>, <span class="hljs-number">6</span>];
<span class="hljs-keyword">var</span> tang = <span class="hljs-number">0</span>;
<span class="hljs-keyword">var</span> ci = <span class="hljs-number">0</span>;
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length - <span class="hljs-number">1</span>; i++) {       <span class="hljs-comment">// 外层for循环，循环的是比较的趟数，因为只要比较8趟 所以i判断的条件为length-1</span>
    tang++;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; arr.length - <span class="hljs-number">1</span>; j++) {   <span class="hljs-comment">// 内层for循环，循环的是比较的次数，每趟比较8次</span>
        ci++;
        <span class="hljs-keyword">if</span> (arr[j] &gt; arr[j + <span class="hljs-number">1</span>]) {  <span class="hljs-comment">// 判断比较的两个数，如果前面的大于后面的一位，交换位置</span>
            <span class="hljs-keyword">var</span> temp = arr[j];
            arr[j] = arr[j + <span class="hljs-number">1</span>];
            arr[j + <span class="hljs-number">1</span>] = temp;
        }
    }
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"趟数："</span> + tang);   <span class="hljs-comment">// 8趟</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"次数："</span> + ci);     <span class="hljs-comment">// 64次</span>
<span class="hljs-built_in">console</span>.log(arr);
}</code></pre>
<ul>
<li>外层<code>for</code>循环，循环的是比较的<code>趟数</code>，因为只要比较<code>8</code>趟(数组长度为<code>9</code>) 所以<code>i</code>判断的条件为<code>length-1</code>；</li>
<li>内层<code>for</code>循环，循环的是比较的<code>次数</code>，每趟比较<code>8</code>次，其实这里次数多比较了，因为第一趟已经找到一个最大值了，第二趟就不需要比<code>8</code>次了 应该比<code>7</code>次，这里先不管，下面会进行优化；</li>
<li>判断比较的两个数，如果前面的大于后面的一位，交换位置。</li>
</ul>
<p><strong>测试代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title></title>
</head>

<body>
    <span id=&quot;demo&quot;></span><br/>
    <button id=&quot;stb&quot;>从小到大</button>
    <button id=&quot;bts&quot;>从大到小</button>
    <span id=&quot;show&quot;>
</span>
    <script>
        var demo = document.getElementById(&quot;demo&quot;);
        var show = document.getElementById(&quot;show&quot;);
        var bts = document.getElementById(&quot;bts&quot;);
        var stb = document.getElementById(&quot;stb&quot;);

        var arr = [3, 1, 2, 5, 4, 8, 9, 7, 6];
        demo.innerHTML = arr;

        bts.onclick = function() {
            bubbleSort(function(a, b) {
                return b - a;
            });
        }
        stb.onclick = function() {
            bubbleSort(function(a, b) {
                return a - b;
            });
        }

        function bubbleSort(fn) {
            var arr = [3, 1, 2, 5, 4, 8, 9, 7, 6];
            var strArr = [];
            show.innerHTML = &quot;&quot;;
            strArr.push(&quot;<br/>&quot;);
            var inner = 0;
            var outer = 0;
            for (var i = 0; i < arr.length - 1; i++) {
                strArr.push(&quot;第&quot; + (i + 1) + &quot;趟&quot;);
                for (var j = 0; j < arr.length - 1; j++) {
                    if (fn(arr[j], arr[j + 1]) > 0) {
                        var tmp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = tmp;
                    }
                    inner++;
                }
                strArr.push(arr.toString());
                strArr.push(&quot;共&quot; + j + &quot;次&quot; + &quot;<br/>&quot;);
                outer++;
            }
            strArr.push(&quot;外循环&quot; + outer + &quot;次&quot;);
            strArr.push(&quot;内循环&quot; + inner + &quot;次&quot;);
            show.innerHTML = strArr.join(&quot; &quot;);
        }
    </script>
</body>

</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"demo"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"stb"</span>&gt;</span>从小到大<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"bts"</span>&gt;</span>从大到小<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"show"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> demo = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"demo"</span>);
        <span class="hljs-keyword">var</span> show = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"show"</span>);
        <span class="hljs-keyword">var</span> bts = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"bts"</span>);
        <span class="hljs-keyword">var</span> stb = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"stb"</span>);

        <span class="hljs-keyword">var</span> arr = [<span class="hljs-number">3</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>, <span class="hljs-number">7</span>, <span class="hljs-number">6</span>];
        demo.innerHTML = arr;

        bts.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            bubbleSort(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{
                <span class="hljs-keyword">return</span> b - a;
            });
        }
        stb.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            bubbleSort(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{
                <span class="hljs-keyword">return</span> a - b;
            });
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bubbleSort</span>(<span class="hljs-params">fn</span>) </span>{
            <span class="hljs-keyword">var</span> arr = [<span class="hljs-number">3</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>, <span class="hljs-number">7</span>, <span class="hljs-number">6</span>];
            <span class="hljs-keyword">var</span> strArr = [];
            show.innerHTML = <span class="hljs-string">""</span>;
            strArr.push(<span class="hljs-string">"&lt;br/&gt;"</span>);
            <span class="hljs-keyword">var</span> inner = <span class="hljs-number">0</span>;
            <span class="hljs-keyword">var</span> outer = <span class="hljs-number">0</span>;
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length - <span class="hljs-number">1</span>; i++) {
                strArr.push(<span class="hljs-string">"第"</span> + (i + <span class="hljs-number">1</span>) + <span class="hljs-string">"趟"</span>);
                <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; arr.length - <span class="hljs-number">1</span>; j++) {
                    <span class="hljs-keyword">if</span> (fn(arr[j], arr[j + <span class="hljs-number">1</span>]) &gt; <span class="hljs-number">0</span>) {
                        <span class="hljs-keyword">var</span> tmp = arr[j];
                        arr[j] = arr[j + <span class="hljs-number">1</span>];
                        arr[j + <span class="hljs-number">1</span>] = tmp;
                    }
                    inner++;
                }
                strArr.push(arr.toString());
                strArr.push(<span class="hljs-string">"共"</span> + j + <span class="hljs-string">"次"</span> + <span class="hljs-string">"&lt;br/&gt;"</span>);
                outer++;
            }
            strArr.push(<span class="hljs-string">"外循环"</span> + outer + <span class="hljs-string">"次"</span>);
            strArr.push(<span class="hljs-string">"内循环"</span> + inner + <span class="hljs-string">"次"</span>);
            show.innerHTML = strArr.join(<span class="hljs-string">" "</span>);
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fl9cm50kfpj208t071q2x.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fl9cm50kfpj208t071q2x.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><em>每趟都比较8次？明显是多余了，下面进行优化</em></p>
<p><strong>2、冒泡排序80分：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [3, 1, 2, 5, 4, 8, 9, 7, 6];
var tang = 0;
var ci = 0;
for (var i = 0; i < arr.length - 1; i++) {
    tang++;
    for (var j = 0; j < arr.length - 1 - i; j++) {  // 第二趟只比了7次 依次递减
        ci++;
        if (arr[j] > arr[j + 1]) {
            var temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
}
console.log(&quot;趟数：&quot; + tang); // 8趟
console.log(&quot;次数：&quot; + ci);   // 36次
console.log(arr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">3</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>, <span class="hljs-number">7</span>, <span class="hljs-number">6</span>];
<span class="hljs-keyword">var</span> tang = <span class="hljs-number">0</span>;
<span class="hljs-keyword">var</span> ci = <span class="hljs-number">0</span>;
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length - <span class="hljs-number">1</span>; i++) {
    tang++;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; arr.length - <span class="hljs-number">1</span> - i; j++) {  <span class="hljs-comment">// 第二趟只比了7次 依次递减</span>
        ci++;
        <span class="hljs-keyword">if</span> (arr[j] &gt; arr[j + <span class="hljs-number">1</span>]) {
            <span class="hljs-keyword">var</span> temp = arr[j];
            arr[j] = arr[j + <span class="hljs-number">1</span>];
            arr[j + <span class="hljs-number">1</span>] = temp;
        }
    }
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"趟数："</span> + tang); <span class="hljs-comment">// 8趟</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"次数："</span> + ci);   <span class="hljs-comment">// 36次</span>
<span class="hljs-built_in">console</span>.log(arr);</code></pre>
<p><em><code>i</code> 是从下标<code>0</code>开始的，第一趟的时候<code>i=0</code>，比了<code>8</code>次，第二趟<code>i=1</code>，只需要比<code>7</code>次，第三趟<code>i=2</code>，只需要比<code>6</code>次...依次类推，所以 比的次数应该就是<code>arr.length - 1 -i</code>;</em></p>
<p><strong>测试代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title></title>
</head>

<body>
    <span id=&quot;demo&quot;></span><br/>
    <button id=&quot;stb&quot;>从小到大</button>
    <button id=&quot;bts&quot;>从大到小</button>
    <span id=&quot;show&quot;>
</span>
    <script>
        var demo = document.getElementById(&quot;demo&quot;);
        var show = document.getElementById(&quot;show&quot;);
        var bts = document.getElementById(&quot;bts&quot;);
        var stb = document.getElementById(&quot;stb&quot;);

        var arr = [3, 1, 2, 5, 4, 8, 9, 7, 6];

        demo.innerHTML = arr;

        bts.onclick = function() {
            bubbleSort(function(a, b) {
                return b - a;
            });
        }
        stb.onclick = function() {
            bubbleSort(function(a, b) {
                return a - b;
            });
        }

        function bubbleSort(fn) {
            var arr = [3, 1, 2, 5, 4, 8, 9, 7, 6];

            var strArr = [];
            show.innerHTML = &quot;&quot;;
            strArr.push(&quot;<br/>&quot;);
            var inner = 0;
            var outer = 0;
            for (var i = 0; i < arr.length - 1; i++) {
                strArr.push(&quot;第&quot; + (i + 1) + &quot;趟&quot;);
                for (var j = 0; j < arr.length - 1 - i; j++) {
                    if (fn(arr[j], arr[j + 1]) > 0) {
                        var tmp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = tmp;
                    }
                    inner++;
                }
                strArr.push(arr.toString());
                strArr.push(&quot;共&quot; + j + &quot;次&quot; + &quot;<br/>&quot;);
                outer++;
            }
            strArr.push(&quot;外循环&quot; + outer + &quot;次&quot;);
            strArr.push(&quot;内循环&quot; + inner + &quot;次&quot;);
            show.innerHTML = strArr.join(&quot; &quot;);
        }
    </script>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"demo"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"stb"</span>&gt;</span>从小到大<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"bts"</span>&gt;</span>从大到小<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"show"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> demo = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"demo"</span>);
        <span class="hljs-keyword">var</span> show = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"show"</span>);
        <span class="hljs-keyword">var</span> bts = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"bts"</span>);
        <span class="hljs-keyword">var</span> stb = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"stb"</span>);

        <span class="hljs-keyword">var</span> arr = [<span class="hljs-number">3</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>, <span class="hljs-number">7</span>, <span class="hljs-number">6</span>];

        demo.innerHTML = arr;

        bts.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            bubbleSort(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{
                <span class="hljs-keyword">return</span> b - a;
            });
        }
        stb.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            bubbleSort(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{
                <span class="hljs-keyword">return</span> a - b;
            });
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bubbleSort</span>(<span class="hljs-params">fn</span>) </span>{
            <span class="hljs-keyword">var</span> arr = [<span class="hljs-number">3</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>, <span class="hljs-number">7</span>, <span class="hljs-number">6</span>];

            <span class="hljs-keyword">var</span> strArr = [];
            show.innerHTML = <span class="hljs-string">""</span>;
            strArr.push(<span class="hljs-string">"&lt;br/&gt;"</span>);
            <span class="hljs-keyword">var</span> inner = <span class="hljs-number">0</span>;
            <span class="hljs-keyword">var</span> outer = <span class="hljs-number">0</span>;
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length - <span class="hljs-number">1</span>; i++) {
                strArr.push(<span class="hljs-string">"第"</span> + (i + <span class="hljs-number">1</span>) + <span class="hljs-string">"趟"</span>);
                <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; arr.length - <span class="hljs-number">1</span> - i; j++) {
                    <span class="hljs-keyword">if</span> (fn(arr[j], arr[j + <span class="hljs-number">1</span>]) &gt; <span class="hljs-number">0</span>) {
                        <span class="hljs-keyword">var</span> tmp = arr[j];
                        arr[j] = arr[j + <span class="hljs-number">1</span>];
                        arr[j + <span class="hljs-number">1</span>] = tmp;
                    }
                    inner++;
                }
                strArr.push(arr.toString());
                strArr.push(<span class="hljs-string">"共"</span> + j + <span class="hljs-string">"次"</span> + <span class="hljs-string">"&lt;br/&gt;"</span>);
                outer++;
            }
            strArr.push(<span class="hljs-string">"外循环"</span> + outer + <span class="hljs-string">"次"</span>);
            strArr.push(<span class="hljs-string">"内循环"</span> + inner + <span class="hljs-string">"次"</span>);
            show.innerHTML = strArr.join(<span class="hljs-string">" "</span>);
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fl9cpg5rs1j208k06t74a.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fl9cpg5rs1j208k06t74a.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><em>还有什么可以优化的吗？ 假如<code>8</code>个数在第<code>3</code>趟的时候就排好了，还需要继续排吗？</em></p>
<p><strong>3、冒泡排序100分:</strong></p>
<p><strong>假设成立法(3步)：</strong></p>
<ul>
<li>假设成立</li>
<li>想办法推翻假设</li>
<li>如果推翻不了，说明假设成立</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [3, 1, 2, 5, 4, 8, 9, 7, 6];
var tang = 0;
var ci = 0;
for (var i = 0; i < arr.length - 1; i++) {
    var flag = true;   // 假设每一次进来都排好了
    tang++;
    for (var j = 0; j < arr.length - 1 - i; j++) {
        ci++;
        if (arr[j] > arr[j + 1]) {
            flag = false;        // 如果两位比较还满足前面的比后面的大的时候，说明假设不成立
            var temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
    if (flag == true) {    // 最后判断一下，如果假设推翻不了，就停止运行。
        break;
    }
}
console.log(&quot;趟数：&quot; + tang);   // 4 趟
console.log(&quot;次数：&quot; + ci);     // 26 次
console.log(arr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">3</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>, <span class="hljs-number">7</span>, <span class="hljs-number">6</span>];
<span class="hljs-keyword">var</span> tang = <span class="hljs-number">0</span>;
<span class="hljs-keyword">var</span> ci = <span class="hljs-number">0</span>;
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length - <span class="hljs-number">1</span>; i++) {
    <span class="hljs-keyword">var</span> flag = <span class="hljs-literal">true</span>;   <span class="hljs-comment">// 假设每一次进来都排好了</span>
    tang++;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; arr.length - <span class="hljs-number">1</span> - i; j++) {
        ci++;
        <span class="hljs-keyword">if</span> (arr[j] &gt; arr[j + <span class="hljs-number">1</span>]) {
            flag = <span class="hljs-literal">false</span>;        <span class="hljs-comment">// 如果两位比较还满足前面的比后面的大的时候，说明假设不成立</span>
            <span class="hljs-keyword">var</span> temp = arr[j];
            arr[j] = arr[j + <span class="hljs-number">1</span>];
            arr[j + <span class="hljs-number">1</span>] = temp;
        }
    }
    <span class="hljs-keyword">if</span> (flag == <span class="hljs-literal">true</span>) {    <span class="hljs-comment">// 最后判断一下，如果假设推翻不了，就停止运行。</span>
        <span class="hljs-keyword">break</span>;
    }
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"趟数："</span> + tang);   <span class="hljs-comment">// 4 趟</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"次数："</span> + ci);     <span class="hljs-comment">// 26 次</span>
<span class="hljs-built_in">console</span>.log(arr);</code></pre>
<p><em>当顺序已经排好后，就不用再去执行趟数了；</em></p>
<p><strong>测试代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title></title>
</head>

<body>
    <span id=&quot;demo&quot;></span><br/>
    <button id=&quot;stb&quot;>从小到大</button>
    <button id=&quot;bts&quot;>从大到小</button>
    <span id=&quot;show&quot;>
</span>
    <script>
        var demo = document.getElementById(&quot;demo&quot;);
        var show = document.getElementById(&quot;show&quot;);
        var bts = document.getElementById(&quot;bts&quot;);
        var stb = document.getElementById(&quot;stb&quot;);

        var arr = [3, 1, 2, 5, 4, 8, 9, 7, 6];

        demo.innerHTML = arr;

        bts.onclick = function() {
            bubbleSort(function(a, b) {
                return b - a;
            });
        }
        stb.onclick = function() {
            bubbleSort(function(a, b) {
                return a - b;
            });
        }

        function bubbleSort(fn) {
            var arr = [3, 1, 2, 5, 4, 8, 9, 7, 6];

            var strArr = [];
            show.innerHTML = &quot;&quot;;
            strArr.push(&quot;<br/>&quot;);
            var inner = 0;
            var outer = 0;
            for (var i = 0; i < arr.length - 1; i++) {
                var sorted = true;
                strArr.push(&quot;第&quot; + (i + 1) + &quot;趟&quot;);
                for (var j = 0; j < arr.length - 1 - i; j++) {
                    if (fn(arr[j], arr[j + 1]) > 0) {
                        var tmp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = tmp;
                        sorted = false;
                    }
                    inner++;
                }
                strArr.push(arr.toString());
                strArr.push(&quot;共&quot; + j + &quot;次&quot; + &quot;<br/>&quot;);
                outer++;
                if (sorted) {
                    break;
                }
            }
            strArr.push(&quot;外循环&quot; + outer + &quot;次&quot;);
            strArr.push(&quot;内循环&quot; + inner + &quot;次&quot;);
            show.innerHTML = strArr.join(&quot; &quot;);
        }
    </script>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"demo"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"stb"</span>&gt;</span>从小到大<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"bts"</span>&gt;</span>从大到小<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"show"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> demo = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"demo"</span>);
        <span class="hljs-keyword">var</span> show = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"show"</span>);
        <span class="hljs-keyword">var</span> bts = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"bts"</span>);
        <span class="hljs-keyword">var</span> stb = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"stb"</span>);

        <span class="hljs-keyword">var</span> arr = [<span class="hljs-number">3</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>, <span class="hljs-number">7</span>, <span class="hljs-number">6</span>];

        demo.innerHTML = arr;

        bts.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            bubbleSort(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{
                <span class="hljs-keyword">return</span> b - a;
            });
        }
        stb.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            bubbleSort(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{
                <span class="hljs-keyword">return</span> a - b;
            });
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bubbleSort</span>(<span class="hljs-params">fn</span>) </span>{
            <span class="hljs-keyword">var</span> arr = [<span class="hljs-number">3</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>, <span class="hljs-number">7</span>, <span class="hljs-number">6</span>];

            <span class="hljs-keyword">var</span> strArr = [];
            show.innerHTML = <span class="hljs-string">""</span>;
            strArr.push(<span class="hljs-string">"&lt;br/&gt;"</span>);
            <span class="hljs-keyword">var</span> inner = <span class="hljs-number">0</span>;
            <span class="hljs-keyword">var</span> outer = <span class="hljs-number">0</span>;
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length - <span class="hljs-number">1</span>; i++) {
                <span class="hljs-keyword">var</span> sorted = <span class="hljs-literal">true</span>;
                strArr.push(<span class="hljs-string">"第"</span> + (i + <span class="hljs-number">1</span>) + <span class="hljs-string">"趟"</span>);
                <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; arr.length - <span class="hljs-number">1</span> - i; j++) {
                    <span class="hljs-keyword">if</span> (fn(arr[j], arr[j + <span class="hljs-number">1</span>]) &gt; <span class="hljs-number">0</span>) {
                        <span class="hljs-keyword">var</span> tmp = arr[j];
                        arr[j] = arr[j + <span class="hljs-number">1</span>];
                        arr[j + <span class="hljs-number">1</span>] = tmp;
                        sorted = <span class="hljs-literal">false</span>;
                    }
                    inner++;
                }
                strArr.push(arr.toString());
                strArr.push(<span class="hljs-string">"共"</span> + j + <span class="hljs-string">"次"</span> + <span class="hljs-string">"&lt;br/&gt;"</span>);
                outer++;
                <span class="hljs-keyword">if</span> (sorted) {
                    <span class="hljs-keyword">break</span>;
                }
            }
            strArr.push(<span class="hljs-string">"外循环"</span> + outer + <span class="hljs-string">"次"</span>);
            strArr.push(<span class="hljs-string">"内循环"</span> + inner + <span class="hljs-string">"次"</span>);
            show.innerHTML = strArr.join(<span class="hljs-string">" "</span>);
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fl9crt69ocj208b051mx4.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fl9crt69ocj208b051mx4.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><em>第三趟已经排好了，为什么还要排第四趟呢？ 原因很简单，因为第三趟的时候js是不知道你已经排好的，只有第四趟的时候，js再进行换位比较的时候，发现位置都不需要换了，说明排好了。</em></p>
<p><a href="https://segmentfault.com/a/1190000012344586">下一篇：JavaScript 基础知识 - 入门篇(二)</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 基础知识 - 入门篇(一)

## 原文链接
[https://segmentfault.com/a/1190000012344521](https://segmentfault.com/a/1190000012344521)

