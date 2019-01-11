---
title: 'ES2015入门系列2-let和const' 
date: 2019-01-10 2:30:08
hidden: true
slug: lz0px9ucpij
categories: [reprint]
---

{{< raw >}}

                    
<p>ES2015 新增了两个变量修饰关键字:</p>
<ul>
<li><p><strong>let</strong></p></li>
<li><p><strong>const</strong></p></li>
</ul>
<p>它们都是块级别的，那什么是块？简单的来说，块就是一组花括号中间的部分。</p>
<ul><li><p>Var</p></li></ul>
<p>为了理解let我们先从var说起，如下代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkStatus(status) {
  if (status) {
    var statusLabel = 'ok';
    console.log(statusLabel);
  } else {
    console.log(statusLabel);
  }
}
checkStatus(true);
checkStatus(false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkStatus</span>(<span class="hljs-params">status</span>) </span>{
  <span class="hljs-keyword">if</span> (status) {
    <span class="hljs-keyword">var</span> statusLabel = <span class="hljs-string">'ok'</span>;
    <span class="hljs-built_in">console</span>.log(statusLabel);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">console</span>.log(statusLabel);
  }
}
checkStatus(<span class="hljs-literal">true</span>);
checkStatus(<span class="hljs-literal">false</span>);</code></pre>
<p>在 Chrome Console 中运行后，获得结果:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ok
undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>ok
<span class="hljs-literal">undefined</span></code></pre>
<p>我们在false条件中加入一行代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkStatus(status) {
  if (status) {
    var statusLabel = 'ok';
    console.log(statusLabel);
  } else {
    console.log(statusLabel);
    console.log(abc);//执行后会输出: Uncaught ReferenceError: abc is not defined(…)
  }
}
checkStatus(true);
checkStatus(false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkStatus</span>(<span class="hljs-params">status</span>) </span>{
  <span class="hljs-keyword">if</span> (status) {
    <span class="hljs-keyword">var</span> statusLabel = <span class="hljs-string">'ok'</span>;
    <span class="hljs-built_in">console</span>.log(statusLabel);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">console</span>.log(statusLabel);
    <span class="hljs-built_in">console</span>.log(abc);<span class="hljs-comment">//执行后会输出: Uncaught ReferenceError: abc is not defined(…)</span>
  }
}
checkStatus(<span class="hljs-literal">true</span>);
checkStatus(<span class="hljs-literal">false</span>);</code></pre>
<p>对于初次接触JavaScript的后端程序员来说，会觉得非常奇怪，在传入<strong>false</strong>的时候为什么得到的statusLabel是undefined而不是变量未定义？而尝试输出abc就能得到变量未定义的错误呢？</p>
<p>这是因为在JavaScript中使用var定义的变量会被预先提升到作用域最开始的地方(这里就是这个<strong>function</strong>), 在这个例子中也就是if位置的上面, 代码就可以写成:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkStatus(status) {
  var statusLabel;
  if (status) {
    statusLabel = 'ok';
    console.log(statusLabel);
  } else {
    console.log(statusLabel);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkStatus</span>(<span class="hljs-params">status</span>) </span>{
  <span class="hljs-keyword">var</span> statusLabel;
  <span class="hljs-keyword">if</span> (status) {
    statusLabel = <span class="hljs-string">'ok'</span>;
    <span class="hljs-built_in">console</span>.log(statusLabel);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">console</span>.log(statusLabel);
  }
}</code></pre>
<p>这是JavaScript独有的, 所以之前定义变量的好的习惯就是在所有可能会使用的地方之前定义好，如此，才不会产生各种奇怪奇怪的问题。</p>
<ul><li><p>Let</p></li></ul>
<p>let就是新的 var，和var不同的是它是块级的，将上面的代码中的var换成let</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkStatus(status) {
  if (status) {
    let statusLabel = 'ok';
    console.log(statusLabel);
  } else {
    console.log(statusLabel);
  }
}
checkStatus(true);
checkStatus(false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkStatus</span>(<span class="hljs-params">status</span>) </span>{
  <span class="hljs-keyword">if</span> (status) {
    <span class="hljs-keyword">let</span> statusLabel = <span class="hljs-string">'ok'</span>;
    <span class="hljs-built_in">console</span>.log(statusLabel);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">console</span>.log(statusLabel);
  }
}
checkStatus(<span class="hljs-literal">true</span>);
checkStatus(<span class="hljs-literal">false</span>);</code></pre>
<p>这样的到的结果就是我们设想的，true的时候是ok， false的时候抛出变量不存在的错误，如果false的时候想要输出undefined, 那么就要手动定义在 if 的上面:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkStatus(status) {
  let statusLabel;
  if (status) {
    statusLabel = 'ok'
    console.log(statusLabel);
  } else {
    console.log(statusLabel);
  }
}
checkStatus(true);
checkStatus(false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkStatus</span>(<span class="hljs-params">status</span>) </span>{
  <span class="hljs-keyword">let</span> statusLabel;
  <span class="hljs-keyword">if</span> (status) {
    statusLabel = <span class="hljs-string">'ok'</span>
    <span class="hljs-built_in">console</span>.log(statusLabel);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">console</span>.log(statusLabel);
  }
}
checkStatus(<span class="hljs-literal">true</span>);
checkStatus(<span class="hljs-literal">false</span>);</code></pre>
<ul><li><p>const</p></li></ul>
<p>const 和 let 一样是块级, 从名字上看是用来常量的，其实不然，正确的说法是 <strong>single-assignment</strong>, 也就是说只能对其进行一次赋值并且只能在定义的时候赋值，后面如果再想对其进行赋值操作就会报错。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const PI = 3.1415926;
PI = 2.0; //报错，Uncaught TypeError: Assignment to constant variable." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> PI = <span class="hljs-number">3.1415926</span>;
PI = <span class="hljs-number">2.0</span>; <span class="hljs-comment">//报错，Uncaught TypeError: Assignment to constant variable.</span></code></pre>
<p>但是，这不代表const定义的就不可以改变的(<strong>immutable</strong>), 如下代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const animals = ['rabbit', 'monkey'];
console.log(animals); //['rabbit', 'monkey']
animals.push('donkey');
console.log(animals);//['rabbit', 'monkey', 'donkey']
animals = ['bird']; //报错，Uncaught TypeError: Assignment to constant variable." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> animals = [<span class="hljs-string">'rabbit'</span>, <span class="hljs-string">'monkey'</span>];
<span class="hljs-built_in">console</span>.log(animals); <span class="hljs-comment">//['rabbit', 'monkey']</span>
animals.push(<span class="hljs-string">'donkey'</span>);
<span class="hljs-built_in">console</span>.log(animals);<span class="hljs-comment">//['rabbit', 'monkey', 'donkey']</span>
animals = [<span class="hljs-string">'bird'</span>]; <span class="hljs-comment">//报错，Uncaught TypeError: Assignment to constant variable.</span></code></pre>
<p>那如何决定该使用哪种关键词呢？</p>
<p>这个目前社区没有统一的规范，不过本人比较喜欢下面这种，即：</p>
<ul>
<li><p>优先使用<strong>let</strong></p></li>
<li><p>常量用<strong>const</strong>, 如<strong>常规常量</strong>, <strong>导入的模块</strong>等等。</p></li>
<li><p>全局变量使用<strong>var</strong> (基本上可以不用了?)</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES2015入门系列2-let和const

## 原文链接
[https://segmentfault.com/a/1190000009970073](https://segmentfault.com/a/1190000009970073)

