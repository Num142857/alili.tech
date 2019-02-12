---
title: '造轮子和用轮子：快速入门JavaScript模块化' 
date: 2019-02-13 2:31:22
hidden: true
slug: q1owaifhk0q
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>都说“不重复造轮子”，就像iPhone——它除了打电话还可以播放音乐——但是工程师不用从零开始做一个音乐播放功能，也许只要在iPhone的系统中整合一个ipod。</p>
<p>前端开发亦是如此，最理想化的开发状态就是，工程师只写核心业务代码，其他通用的功能和组件都可以无缝加载别人写好的代码，就像很多那样。</p>
<p>可是实际情况是，有个糟糕的 iPhone 工程师，他搞混了 iPhone 和 ipod 的系统，甚至把 iPhone 的 Home 键和 iPod 的音量键焊在同一个。</p>
<p>还有一些糟糕 JavaScript 开发者，一不小心声明了全局变量，混乱了“命名空间”，都让协作开发变得不那么友好，抑或他开发了一个通用模块，用户们却发现载入了他的代码之后，用户自己的代码被他搞得一团糟。</p>
<h2 id="articleHeader1">原始人写法</h2>
<p>比如下面这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mylove = &quot;coding&quot;;

function getLove() {
  return mylove;
}

function sayLove(thing) {
  console.log(thing);
}

console.log(getLove());//>>> coding
sayLove('girl');//>>> girl" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> mylove = <span class="hljs-string">"coding"</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getLove</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> mylove;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayLove</span>(<span class="hljs-params">thing</span>) </span>{
  <span class="hljs-built_in">console</span>.log(thing);
}

<span class="hljs-built_in">console</span>.log(getLove());<span class="hljs-comment">//&gt;&gt;&gt; coding</span>
sayLove(<span class="hljs-string">'girl'</span>);<span class="hljs-comment">//&gt;&gt;&gt; girl</span></code></pre>
<p>在 window 对象下声明了一个变量<code>mylove</code>，然后使用<code>getLove()</code>函数去获取这个变量，使用<code>setLove()</code>修改这个变量。<br>恩，功能是实现了。只是这样做之后，说不定什么时候你由于粗心又在某个地方声明了一次<code>mylove</code>，而你的粗心同事也不知道会在什么地方写了一个同名函数——也许有3个参数的<code>setLove()</code>函数。</p>
<h2 id="articleHeader2">对象封装写法</h2>
<p>怎么办呢？你获取想到了，把这些变量和函数都写在一个对象里：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var loveThing = {
  mylove : &quot;coding&quot;,
  getLove :function() {
    return this.mylove;
  },
  sayLove : function(thing) {
    console.log(thing);
  }
}

console.log(loveThing.getLove());//>>> coding
loveThing.sayLove('girl');//>>> girl" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> loveThing = {
  <span class="hljs-attr">mylove</span> : <span class="hljs-string">"coding"</span>,
  <span class="hljs-attr">getLove</span> :<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.mylove;
  },
  <span class="hljs-attr">sayLove</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">thing</span>) </span>{
    <span class="hljs-built_in">console</span>.log(thing);
  }
}

<span class="hljs-built_in">console</span>.log(loveThing.getLove());<span class="hljs-comment">//&gt;&gt;&gt; coding</span>
loveThing.sayLove(<span class="hljs-string">'girl'</span>);<span class="hljs-comment">//&gt;&gt;&gt; girl</span></code></pre>
<p>这种写法已经有点模块的样子了，一下就能看出这几个函数和变量之间的联系。缺点在于所有变量都必须声明为公有，所以都要加this指示作用域以引用这些变量。更危险的是，在对象之外也能轻松更改里面的参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="loveThing.mylove = &quot;sleeping&quot;;
console.log(loveThing.getLove());//>>> sleeping" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code>loveThing.mylove = <span class="hljs-string">"sleeping"</span>;
console.log(loveThing.getLove());<span class="hljs-regexp">//</span><span class="hljs-meta">&gt;&gt;&gt; </span>sleeping</code></pre>
<h2 id="articleHeader3">立即执行函数</h2>
<p>我向来不惮以最坏的恶意揣测程序员，你永远想不到你的 partner 会不会真的在其他地方修改了你的参数，也不知道自己是否会在不经意间修改了他的。我们必须在他下手之前——让自己的模块先执行掉，不给对方可趁之机。此时使用一种叫做<strong>立即执行函数</strong>的办法，可以避免暴露私有成员。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var loveThing = (function(){
  var my = {};
  var love = &quot;coding&quot;;
  my.getLove = function() {
    return love;
  }
  my.sayLove = function(thing) {
    console.log(thing);
  }
  return my;
})();

console.log(loveThing.getLove());//>>> coding
loveThing.sayLove('reading');//>>> reading
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> loveThing = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> my = {};
  <span class="hljs-keyword">var</span> love = <span class="hljs-string">"coding"</span>;
  my.getLove = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> love;
  }
  my.sayLove = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">thing</span>) </span>{
    <span class="hljs-built_in">console</span>.log(thing);
  }
  <span class="hljs-keyword">return</span> my;
})();

<span class="hljs-built_in">console</span>.log(loveThing.getLove());<span class="hljs-comment">//&gt;&gt;&gt; coding</span>
loveThing.sayLove(<span class="hljs-string">'reading'</span>);<span class="hljs-comment">//&gt;&gt;&gt; reading</span>
</code></pre>
<p>我们试着获取里面的变量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(loveThing.love);//>>> undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code style="word-break: break-word; white-space: initial;">console.log(loveThing.love);<span class="hljs-regexp">//</span><span class="hljs-meta">&gt;&gt;&gt; </span>undefined</code></pre>
<p>果然，外部根本看不见里面的零件，只能使用提供的接口。这样才能保证私有变量的安全。</p>
<h2 id="articleHeader4">放大模式</h2>
<p>当然，一个项目要用到模块化的时候，说明这个项目足够大足够复杂，一个模块可能需要继承另一个模块，或者扩充模块，这时候需要使用<strong>放大模式</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var loveThing = (function (o){
  o.sayOK = function () {
    console.log('OK');
  };
  return o;
})(loveThing);

loveThing.sayOK();//>>> OK!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> loveThing = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">o</span>)</span>{
  o.sayOK = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'OK'</span>);
  };
  <span class="hljs-keyword">return</span> o;
})(loveThing);

loveThing.sayOK();<span class="hljs-comment">//&gt;&gt;&gt; OK!</span></code></pre>
<h2 id="articleHeader5">宽放大模式</h2>
<p>可是，浏览器是一个不按常理出牌的环境，你永远不知道自己引用的模块是否已经加载。万一我之前的<code>loveThing</code>没有被加载，上面这段代码就会报错了（找不到对象）。解决方法就是所谓<strong>宽放大模式</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var loveThing = (function (o){
  o.sayOK = function () {};
  return o;
})(loveThing || {});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> loveThing = (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(o)</span></span>{
  o.sayOK = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{};
  <span class="hljs-keyword">return</span> o;
})(loveThing || {});</code></pre>
<p>与之前唯一的不同就是参数可以为空对象。</p>
<p>至此，最基本的JavaScript模块化写法你已经学会了，相信你也体会到自己原来的写法有什么不足。</p>
<p>受篇幅限制，本篇入门到此结束，我会在下一篇讨论流行的模块化规范。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
造轮子和用轮子：快速入门JavaScript模块化

## 原文链接
[https://segmentfault.com/a/1190000004619857](https://segmentfault.com/a/1190000004619857)

