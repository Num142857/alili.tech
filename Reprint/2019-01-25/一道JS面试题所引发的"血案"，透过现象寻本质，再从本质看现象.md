---
title: '一道JS面试题所引发的"血案"，透过现象寻本质，再从本质看现象' 
date: 2019-01-25 2:30:24
hidden: true
slug: l7r8ye5804
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>觉得本人写的不算很烂的话，可以登录关注一下<a href="https://github.com/jawil/blog" rel="nofollow noreferrer" target="_blank">我的GitHub博客</a>，博客会坚持写下去。</strong></p>
<p>今天同学去面试，做了两道面试题,全部做错了，发过来给我看,我一眼就看出来了，因为这种题我做过，至于为什么结果是那样，我也之前没有深究过，他问我为什么，我也是一脸的懵逼，不能从根源上解释问题的原因，所以并不能完全让他信服。今天就借着这个机会深扒一下，如果没有耐心可以点击右上角，以看小说的心态看技术文章，走马观花，不加思考，这样的量变并不能带来质的改变。花上10+分钟认真阅读我相信你会受益匪浅，没收获你买把武昌火车站同款菜刀砍我?。因为我是写完这篇博客再回头写这段话的，在写的过程中也学到了很多，所以在此分享一下共同学习。</p>
<p><strong>登高自卑,与君共勉。</strong></p>
<p>下面一起看看这道题，同学微信发给我截图：<br><span class="img-wrap"><img data-src="/img/remote/1460000008507694?w=464&amp;h=800" src="https://static.alili.tech/img/remote/1460000008507694?w=464&amp;h=800" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>如果看的不太清楚，我把代码敲一遍,给大家看看：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &quot;jay&quot;; //一看这二逼就是周杰伦的死忠粉
var person = {
    name: &quot;kang&quot;,
    pro: {
        name: &quot;Michael&quot;,
        getName: function() {
            return this.name;
        }
    }
};
console.log(person.pro.getName());
var pepole = person.pro.getName;
console.log(pepole());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> name = <span class="hljs-string">"jay"</span>; <span class="hljs-comment">//一看这二逼就是周杰伦的死忠粉</span>
<span class="hljs-keyword">var</span> person = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"kang"</span>,
    <span class="hljs-attr">pro</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">"Michael"</span>,
        <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
        }
    }
};
<span class="hljs-built_in">console</span>.log(person.pro.getName());
<span class="hljs-keyword">var</span> pepole = person.pro.getName;
<span class="hljs-built_in">console</span>.log(pepole());</code></pre>
<p>这里我就不卖关子了,不少童鞋也应该遇到过做过类似的题目,就是考察<strong>this</strong>,我们先看看答案:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008507695?w=1054&amp;h=542" src="https://static.alili.tech/img/remote/1460000008507695?w=1054&amp;h=542" alt="" title="" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(person.pro.getName());//Michael
console.log(pepole());//jay" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>console.<span class="hljs-built_in">log</span>(person.pro.<span class="hljs-built_in">getName</span>());<span class="hljs-comment">//Michael</span>
console.<span class="hljs-built_in">log</span>(pepole());<span class="hljs-comment">//jay</span></code></pre>
<p>第一个很简单，<strong>this</strong>就是指向<strong>person.pro</strong>的引用，那么<strong>this.name</strong>就是<strong>person.pro.name</strong>，于是第一个就是输出<strong>Michael</strong>，再来看看第二个就蹊跷了，和第一个明明是一样的方法，为什么输出的结果是<strong>jay</strong>呢？</p>
<p>既然我们知道结果是jay了，反着推理一步步来，不难推出调用<strong>people()</strong>这个方法时候的<strong>this.name</strong>就相当于和<strong>var name = "jay"</strong>，var声明的全局变量和全局环境下的this的变量有什么联系呢？；那么这个<strong>this</strong>到底是什么，总得是一个具体东西吧？</p>
<p>我们一步步分析，<strong>this.name</strong>这个<strong>this</strong>有一个<strong>name</strong>属性，很明显就是一个对象，那具体是什么对象呢？this的指向是在函数被调用的时候确定的，于是有人说就是<strong>Window</strong>对象，没错是没错，确实是<strong>Window</strong>对象，然后<strong>var name</strong>声明的全局变量<strong>name</strong>和<strong>window.name</strong>是相同的作用；但是你只<strong>只知其然，而不知其所以然</strong>，学深一门语言就是要有刨根问底的精神，打破砂锅问到底，<strong>知其然还要知其所以然</strong>。</p>
<p>我们就先验证一下，那个<strong>this</strong>到底是不是<strong>window</strong>对象吧。我们把代码稍微调整一下，输出<strong>this</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &quot;jay&quot;; //一看这二逼就是周杰伦的死忠粉
var person = {
    name: &quot;kang&quot;,
    pro: {
        name: &quot;Michael&quot;,
        getName: function() {
            console.log(this);
            return this.name;
        }
    }
};
console.log(person.pro.getName());
var pepole = person.pro.getName;
console.log(pepole());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> name = <span class="hljs-string">"jay"</span>; <span class="hljs-comment">//一看这二逼就是周杰伦的死忠粉</span>
<span class="hljs-keyword">var</span> person = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"kang"</span>,
    <span class="hljs-attr">pro</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">"Michael"</span>,
        <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
        }
    }
};
<span class="hljs-built_in">console</span>.log(person.pro.getName());
<span class="hljs-keyword">var</span> pepole = person.pro.getName;
<span class="hljs-built_in">console</span>.log(pepole());</code></pre>
<p>看看控制台输出，确实没错就是window对象。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008507696?w=1022&amp;h=250" src="https://static.alili.tech/img/remote/1460000008507696?w=1022&amp;h=250" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>再来看看var name声明的name和window.name是否相等呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name;
console.log(name===window.name)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>var <span class="hljs-built_in">name</span>;
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">name</span>===window.<span class="hljs-built_in">name</span>)</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008507697?w=860&amp;h=168" src="https://static.alili.tech/img/remote/1460000008507697?w=860&amp;h=168" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>确实是一样的，类型和值没有任何的不同。</p>
<p>好滴，那么你说this就是window对象，至于为什么是这样你也不清楚，是否永远是这样呢？我们看看这段代码输出又会是咋样呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';
var name = &quot;jay&quot;; //一看这二逼就是周杰伦的死忠粉
var person = {
    name: &quot;kang&quot;,
    pro: {
        name: &quot;Michael&quot;,
        getName: function() {
            console.log(this);
            return this.name;
        }
    }
};
console.log(person.pro.getName());
var pepole = person.pro.getName;
console.log(pepole());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">'use strict'</span>;
<span class="hljs-keyword">var</span> name = <span class="hljs-string">"jay"</span>; <span class="hljs-comment">//一看这二逼就是周杰伦的死忠粉</span>
<span class="hljs-keyword">var</span> person = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"kang"</span>,
    <span class="hljs-attr">pro</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">"Michael"</span>,
        <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
        }
    }
};
<span class="hljs-built_in">console</span>.log(person.pro.getName());
<span class="hljs-keyword">var</span> pepole = person.pro.getName;
<span class="hljs-built_in">console</span>.log(pepole());</code></pre>
<p>还会是跟上面一样的结果吗?我们拭目以待.</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008507698?w=1042&amp;h=706" src="https://static.alili.tech/img/remote/1460000008507698?w=1042&amp;h=706" alt="" title="" style="cursor: pointer;"></span></p>
<p>看到结果没：<strong>Cannot read property 'name' of undefined</strong>,这是什么意思想必大家已经很清楚了，此时的<strong>this</strong>成了<strong>undefined</strong>了，<strong>undefined</strong>当然也就没有<strong>name</strong>这个属性，所以浏览器报错了。那么为什么会这样呢？</p>
<p>同样换种写法再来看看这段代码输出什么呢?</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &quot;jay&quot;;
var person = {
　　　　name : &quot;kang&quot;,
　　　　getName : function(){
　　　　　return function(){
　　　　　　　　return this.name;
　　　　　};
　　　　}
};
console.log(person.getName()());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> name = <span class="hljs-string">"jay"</span>;
<span class="hljs-keyword">var</span> person = {
　　　　<span class="hljs-attr">name</span> : <span class="hljs-string">"kang"</span>,
　　　　<span class="hljs-attr">getName</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
　　　　　<span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
　　　　　　　　<span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
　　　　　};
　　　　}
};
<span class="hljs-built_in">console</span>.log(person.getName()());</code></pre>
<p>控制台自己输出一下看看，我想此时你的心情一定是这样的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008432614?w=626&amp;h=571" src="https://static.alili.tech/img/remote/1460000008432614?w=626&amp;h=571" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在弄明白这些问题之前，我们先弄清楚<strong>全局环境下的this</strong>，<strong>var声明的全局变量</strong>和<strong>window对象</strong>之间的联系与区别:<br>先看四个简单的例子对比，均在js非严格模式测试，也就是没有声明'use strict'：<br>demo1:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name=&quot;jawil&quot;;
console.log(name);
console.log(window.name)
console.log(this.name)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>var <span class="hljs-built_in">name</span>=<span class="hljs-string">"jawil"</span>;
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">name</span>);
console.<span class="hljs-built_in">log</span>(window.<span class="hljs-built_in">name</span>)
console.<span class="hljs-built_in">log</span>(this.<span class="hljs-built_in">name</span>)</code></pre>
<p>demo2:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="name=&quot;jawil&quot;;
console.log(name);
console.log(window.name)
console.log(this.name)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code><span class="hljs-built_in">name</span>=<span class="hljs-string">"jawil"</span>;
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">name</span>);
console.<span class="hljs-built_in">log</span>(window.<span class="hljs-built_in">name</span>)
console.<span class="hljs-built_in">log</span>(this.<span class="hljs-built_in">name</span>)</code></pre>
<p>demo3:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.name=&quot;jawil&quot;;
console.log(name);
console.log(window.name)
console.log(this.name)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>window.<span class="hljs-built_in">name</span>=<span class="hljs-string">"jawil"</span>;
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">name</span>);
console.<span class="hljs-built_in">log</span>(window.<span class="hljs-built_in">name</span>)
console.<span class="hljs-built_in">log</span>(this.<span class="hljs-built_in">name</span>)</code></pre>
<p>demo4:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.name=&quot;jawil&quot;;
console.log(name);
console.log(window.name)
console.log(this.name)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>this.<span class="hljs-built_in">name</span>=<span class="hljs-string">"jawil"</span>;
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">name</span>);
console.<span class="hljs-built_in">log</span>(window.<span class="hljs-built_in">name</span>)
console.<span class="hljs-built_in">log</span>(this.<span class="hljs-built_in">name</span>)</code></pre>
<p>其实这四个demo是一个意思，输出的结果没有任何差别，为什么没有差别呢?因为他们在同一个环境，也就是全局环境下：<br>我们换一种在不同的环境下执行这段代码看一看结果：<br>demo5:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name=&quot;jawil&quot;;
var test={
    name:'jay',
    getName:function(){
    console.log(name);
    console.log(window.name)
    console.log(this.name)
    }
}
test.getName();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> name=<span class="hljs-string">"jawil"</span>;
<span class="hljs-keyword">var</span> test={
    <span class="hljs-attr">name</span>:<span class="hljs-string">'jay'</span>,
    <span class="hljs-attr">getName</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(name);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.name)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
    }
}
test.getName();</code></pre>
<p>最后结果一次输出为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(name);//jawil
console.log(window.name)//jawil
console.log(this.name)//jay" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">name</span>);<span class="hljs-comment">//jawil</span>
console.<span class="hljs-built_in">log</span>(window.<span class="hljs-built_in">name</span>)<span class="hljs-comment">//jawil</span>
console.<span class="hljs-built_in">log</span>(this.<span class="hljs-built_in">name</span>)<span class="hljs-comment">//jay</span></code></pre>
<p>因为此处的<strong>this</strong>不再指向<strong>全局对象</strong>了，所以结果肯定不同，我们先来看看<strong>全局对象</strong>和<strong>全局环境下的this</strong>，暂不考虑<strong>其他环境下的this</strong>。</p>
<h2 id="articleHeader0">那么又有人会问什么是全局环境，什么又是全局对象，全局对象该怎么理解？</h2>
<h3 id="articleHeader1">题外话</h3>
<p>其实我们看技术文章，总觉得似懂非懂，一知半解，不是看不懂代码，而是因为很多时候我们对一些概念没有比较深入的了解，但是也没有去认真继续下去考究，这也不能怪我们，毕竟开发时候不太深入这些概念对我们业务也没啥影响，但是我发现我自己写东西时候，不把概念说清楚，总不能让人信服和彻底明白你讲的是什么玩意，我想写博客最大的好处可以让自己进一步提高，更深层次的理解你所学过的东西，你讲的别人都看不懂，你确认你真的懂了吗？</p>
<h3 id="articleHeader2">说到全局环境，我们就会牵扯到另一个概念那就是执行环境和函数的作用域</h3>
<p>既然扯到这么深，就顺便扯扯执行环境和作用域，这些都是js这门语言的重点和难点，没有一定的沉淀很难去深入探讨这些东西的.</p>
<p>函数的每次调用都有与之紧密相关的作用域和执行环境。从根本上来说，作用域是基于函数的，而执行环境是基于对象的(例如：全局执行环境即全局对象window)。</p>
<h3 id="articleHeader3">我们还是先说一说全局对象吧，因为全局执行环境是基于全局对象的。</h3>
<h4>JavaScript 全局对象</h4>
<p><code>全局属性和函数可用于所有内建的 JavaScript 对象。</code></p>
<h4>全局对象描述</h4>
<blockquote><ol>
<li><p>全局对象是预定义的对象，作为 JavaScript 的全局函数和全局属性的占位符。通过使用全局对象，可以访问所有其他所有预定义的对象、函数和属性。全局对象不是任何对象的属性，所以它没有名称。</p></li>
<li><p>在顶层 JavaScript 代码中，可以用关键字 this 引用全局对象。但通常不必用这种方式引用全局对象，因为全局对象是作用域链的头，这意味着所有非限定性的变量和函数名都会作为该对象的属性来查询。例如，当JavaScript 代码引用 parseInt() 函数时，它引用的是全局对象的 parseInt 属性。全局对象是作用域链的头，还意味着在顶层 JavaScript 代码中声明的所有变量都将成为全局对象的属性。</p></li>
<li><p>全局对象只是一个对象，而不是类。既没有构造函数，也无法实例化一个新的全局对象。</p></li>
<li><p>在 JavaScript 代码嵌入一个特殊环境中时，全局对象通常具有环境特定的属性。实际上，ECMAScript 标准没有规定全局对象的类型，JavaScript 的实现或嵌入的 JavaScript 都可以把任意类型的对象作为全局对象，只要该对象定义了这里列出的基本属性和函数。例如，在允许通过 LiveConnect 或相关的技术来脚本化 Java 的 JavaScript 实现中，全局对象被赋予了这里列出的 java 和 Package 属性以及 getClass() 方法。而在客户端 JavaScript 中，全局对象就是 Window 对象，表示允许 JavaScript 代码的 Web 浏览器窗口。</p></li>
</ol></blockquote>
<h4>例子</h4>
<p>在 JavaScript 核心语言中，全局对象的预定义属性都是不可枚举的，所有可以用 for/in 循环列出所有隐式或显式声明的全局变量，如下所示：<br>上一篇博客我就讲到遍历对象属性的三种方法:</p>
<p><code>for-in</code>循环、<code>Object.keys()</code>以及<code>Object.getOwnPropertyNames()</code>不同的区别，想要了解可以细看我这篇博客:<a href="https://github.com/jawil/blog/issues/2" rel="nofollow noreferrer" target="_blank">传送门</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var variables = &quot;&quot;;

for (var name in this)
{
variables += name + &quot;<br />&quot;;
}

document.write(variables);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> variables = <span class="hljs-string">""</span>;

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> name <span class="hljs-keyword">in</span> <span class="hljs-keyword">this</span>)
{
variables += name + <span class="hljs-string">"&lt;br /&gt;"</span>;
}

<span class="hljs-built_in">document</span>.write(variables);</code></pre>
<h3 id="articleHeader4">再回过头来谈谈执行环境和函数的作用域</h3>
<h4>一开始要明白的</h4>
<ul>
<li><p>首先，我们要知道执行环境和作用域是两个完全不同的概念。</p></li>
<li><p>函数的每次调用都有与之紧密相关的作用域和执行环境。从根本上来说，作用域是基于函数类型的(当然函数也是对象，这里我们细分一下)，而执行环境是基于对象类型的(例如：全局执行环境即window对象)。</p></li>
<li><p>换句话说，作用域涉及到所被调用函数中的变量访问，并且不同的调用场景是不一样的。执行环境始终是this关键字的值，它是拥有当前所执行代码的对象的引用。每个执行环境都有一个与之关联的变量对象，环境中定义的所有变量和函数都保存在这个对象中。虽然我们编写的代码无法访问这个对象，但解析器在处理数据时会在后台使用它。</p></li>
</ul>
<h4>一些概念</h4>
<h5>1. 执行环境（也称执行上下文–execution context）</h5>
<p>首先来说说js中的执行环境，所谓执行环境（有时也称环境）它是JavaScript中最为重要的一个概念。执行环境定义了变量或函数有权访问的其他数据 ，决定了它们各自的行为。而每个执行环境都有一个与之相关的变量对象，环境中定义的所有变量和函数都保存在这个对象中。</p>
<p>当JavaScript解释器初始化执行代码时，它首先默认进入全局执行环境，从此刻开始，函数的每次调用都会创建一个新的执行环境。</p>
<p>每个函数都有自己的执行环境。当执行流进入一个函数时，函数的环境就会被推入一个环境栈中（execution stack）。在函数执行完后，栈将其环境弹出，把控制权返回给之前的执行环境。ECMAScript程序中的执行流正是由这个便利的机制控制着。执行环境可以分为创建和执行两个阶段。在创建阶段，解析器首先会创建一个变量对象（variable object，也称为活动对象activation object），它由定义在执行环境中的变量、函数声明、和参数组成。在这个阶段，作用域链会被初始化，this的值也会被最终确定。在执行阶段，代码被解释执行。</p>
<h6>1.1可执行的JavaScript代码分三种类型：</h6>
<ol>
<li><p>Global Code，即全局的、不在任何函数里面的代码，例如：一个js文件、嵌入在HTML页面中的js代码等。</p></li>
<li><p>Eval Code，即使用eval()函数动态执行的JS代码。</p></li>
<li><p>Function Code，即用户自定义函数中的函数体JS代码。</p></li>
</ol>
<p>不同类型的JavaScript代码具有不同的Execution Context</p>
<p>Demo：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
    function Fn1(){
        function Fn2(){
            alert(document.body.tagName);//BODY
            //other code...
        }
        Fn2();
    }
    Fn1();
    //code here
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Fn1</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Fn2</span>(<span class="hljs-params"></span>)</span>{
            alert(<span class="hljs-built_in">document</span>.body.tagName);<span class="hljs-comment">//BODY</span>
            <span class="hljs-comment">//other code...</span>
        }
        Fn2();
    }
    Fn1();
    <span class="hljs-comment">//code here</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008507699?w=537&amp;h=147" src="https://static.alili.tech/img/remote/1460000008507699?w=537&amp;h=147" alt="" title="" style="cursor: pointer;"></span><br>特别说明：图片来自于<a href="http://www.cnblogs.com/fool/archive/2010/10/16/1853326.html" rel="nofollow noreferrer" target="_blank">笨蛋的座右铭博客</a></p>
<h6>1.2执行环境小结</h6>
<p>当javascript代码被浏览器载入后，默认最先进入的是一个全局执行环境。当在全局执行环境中调用执行一个函数时，程序流就进入该被调用函数内，此时JS引擎就会为该函数创建一个新的执行环境，并且将其压入到执行环境堆栈的顶部。浏览器总是执行当前在堆栈顶部的执行环境，一旦执行完毕，该执行环境就会从堆栈顶部被弹出，然后，进入其下的执行环境执行代码。这样，堆栈中的执行环境就会被依次执行并且弹出堆栈，直到回到全局执行环境。<br>此外还要注意一下几点：</p>
<ul>
<li><p>单线程</p></li>
<li><p>同步执行</p></li>
<li><p>唯一的全局执行环境</p></li>
<li><p>局部执行环境的个数没有限制</p></li>
<li><p>每次某个函数被调用，就会有个新的局部执行环境为其创建，即使是多次调用的自身函数(即一个函数被调用多次，也会创建多个不同的局部执行环境)。</p></li>
</ul>
<h5>2. 作用域(scope)</h5>
<p>当代码在一个环境中执行时，<strong>会创建变量对象的一个作用域链（scope chain</strong>。作用域链的用途是保证对执行环境有权访问的所有变量和函数的有序访问。</p>
<p><strong>作用域链包含了执行环境栈中的每个执行环境对应的变量对象.</strong><br>通过作用域链，可以决定变量的访问和标识符的解析。<br>注意：全局执行环境的变量对象始终都是作用域链的最后一个对象。</p>
<p>在访问变量时，就必须存在一个可见性的问题(<strong>内层环境可以访问外层中的变量和函数，而外层环境不能访问内层的变量和函数</strong>)。更深入的说，当访问一个变量或调用一个函数时，JavaScript引擎将不同执行环境中的变量对象按照规则<strong>构建一个链表</strong>，在访问一个变量时，先在链表的第一个变量对象上查找，如果没有找到则继续在第二个变量对象上查找，直到搜索到全局执行环境的变量对象即<strong>window对象</strong>。这也就形成了<strong>Scope Chain</strong>的概念。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008507700?w=468&amp;h=229" src="https://static.alili.tech/img/remote/1460000008507700?w=468&amp;h=229" alt="" title="" style="cursor: pointer;"></span><br>特别说明：图片来自于<a href="http://www.cnblogs.com/fool/archive/2010/10/16/1853326.html" rel="nofollow noreferrer" target="_blank">笨蛋的座右铭博客</a></p>
<p>作用域链图，清楚的表达了执行环境与作用域的关系(一一对应的关系)，作用域与作用域之间的关系(链表结构，由上至下的关系)。<br>Demo:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var color = &quot;blue&quot;;
function changeColor(){
  var anotherColor = &quot;red&quot;;
  function swapColors(){
    var tempColor = anotherColor;
    anotherColor = color;
    color = tempColor;
    // 这里可以访问color, anotherColor, 和 tempColor
  }
  // 这里可以访问color 和 anotherColor，但是不能访问 tempColor
  swapColors();
}
changeColor();
// 这里只能访问color
console.log(&quot;Color is now &quot; + color);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">color</span> = <span class="hljs-string">"blue"</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changeColor</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">var</span> anotherColor = <span class="hljs-string">"red"</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">swapColors</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">var</span> tempColor = anotherColor;
    anotherColor = <span class="hljs-built_in">color</span>;
    <span class="hljs-built_in">color</span> = tempColor;
    <span class="hljs-comment">// 这里可以访问color, anotherColor, 和 tempColor</span>
  }
  <span class="hljs-comment">// 这里可以访问color 和 anotherColor，但是不能访问 tempColor</span>
  swapColors();
}
changeColor();
<span class="hljs-comment">// 这里只能访问color</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Color is now "</span> + <span class="hljs-built_in">color</span>);</code></pre>
<p>上述代码一共包括三个执行环境：全局执行环境、changeColor()的局部执行环境、swapColors()的局部执行环境。</p>
<ul>
<li><p>全局环境有一个变量color和一个函数changecolor();</p></li>
<li><p>changecolor()函数的局部环境中具有一个anothercolor属性和一个swapcolors函数，当然，changecolor函数中可以访问自身以及它外围（即全局环境）中的变量;</p></li>
<li><p>swapcolor()函数的局部环境中具有一个变量tempcolor。在该函数内部可以访问上面的两个环境（changecolor和window）中的所有变量，因为那两个环境都是它的父执行环境。</p></li>
</ul>
<p>上述代码的作用域链如下图所示：<br><span class="img-wrap"><img data-src="/img/remote/1460000008507701?w=210&amp;h=244" src="https://static.alili.tech/img/remote/1460000008507701?w=210&amp;h=244" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>从上图发现。内部环境可以通过作用域链访问所有的外部环境，但是外部环境不能访问内部环境中的任何变量和函数。<br><strong>标识符解析</strong>（变量名或函数名搜索）是沿着作用域链一级一级地搜索标识符的过程。搜索过程始终从作用域链的前端开始，然后逐级地向后（全局执行环境）回溯，直到找到标识符为止。</p>
<h5>3.执行环境与作用域的区别与联系</h5>
<p>执行环境为全局执行环境和局部执行环境，局部执行环境是函数执行过程中创建的。<br><strong>作用域链是基于执行环境的变量对象的</strong>，由所有执行环境的变量对象(对于函数而言是活动对象，因为在函数执行环境中，变量对象是不能直接访问的，此时由活动对象(activation object,缩写为AO)扮演VO(变量对象)的角色。)共同组成。<br>当代码在一个环境中执行时，会创建变量对象的一个作用域链。作用域链的用途：是保证对执行环境有权访问的所有变量和函数的有序访问。作用域链的前端，始终都是当前执行的代码所在环境的变量对象。</p>
<h5>4.小练习</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
(function(){
    a= 5;
    console.log(window.a);//undefined
    var a = 1;//这里会发生变量声明提升
    console.log(a);//1
})();
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    a= <span class="hljs-number">5</span>;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.a);<span class="hljs-comment">//undefined</span>
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;<span class="hljs-comment">//这里会发生变量声明提升</span>
    <span class="hljs-built_in">console</span>.log(a);<span class="hljs-comment">//1</span>
})();
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>window.a之所以是undefined，是因为var a = 1;发生了变量声明提升。相当于如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
(function(){
    var a;//a是局部变量
    a = 5;//这里局部环境中有a，就不会找全局中的
    console.log(window.a);//undefined
    a = 1;//这里会发生变量声明提升
    console.log(a);//1
})();
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> a;<span class="hljs-comment">//a是局部变量</span>
    a = <span class="hljs-number">5</span>;<span class="hljs-comment">//这里局部环境中有a，就不会找全局中的</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.a);<span class="hljs-comment">//undefined</span>
    a = <span class="hljs-number">1</span>;<span class="hljs-comment">//这里会发生变量声明提升</span>
    <span class="hljs-built_in">console</span>.log(a);<span class="hljs-comment">//1</span>
})();
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>更多关于变量提升和执行上下文详细解说这里就不多少了，不然越扯越深，有兴趣可以看看这篇图解，浅显易懂：</strong><br><a href="http://www.jianshu.com/p/a6d37c77e8db" rel="nofollow noreferrer" target="_blank">前端基础进阶（二）：执行上下文详细图解</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008507702?w=580&amp;h=580" src="https://static.alili.tech/img/remote/1460000008507702?w=580&amp;h=580" alt="" title="" style="cursor: pointer;"></span></p>
<p>相信大家看到这里，也很累了，但是也有收获，大概有了一些深刻印象，对概念也有一些比较深入的理解了。<br>这里我就稍微总结一下，上面讲了一些什么，对接下来的解析应该有很大的帮助。</p>
<p>**1. 浏览器的全局对象是window</p>
<ol>
<li><p>全局执行环境即window对象所创建的，局部执行环境是函数执行过程中创建的。</p></li>
<li><p>全局对象，可以访问所有其他所有预定义的对象、函数和属性。</p></li>
<li><p>当javascript代码被浏览器载入后，默认最先进入的是一个全局执行环境。</p></li>
<li><p>明白了执行上下文和作用域的一些概念，知道其中的运行机制和原理。**</p></li>
</ol>
<p>我们再回头看看这两个demo比较,我们解释清楚这个demo执行的结果。<br>demo1：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name=&quot;jawil&quot;;
console.log(name);//jawil
console.log(window.name)//jawil
console.log(this.name)//jawill" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>var <span class="hljs-built_in">name</span>=<span class="hljs-string">"jawil"</span>;
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">name</span>);<span class="hljs-comment">//jawil</span>
console.<span class="hljs-built_in">log</span>(window.<span class="hljs-built_in">name</span>)<span class="hljs-comment">//jawil</span>
console.<span class="hljs-built_in">log</span>(this.<span class="hljs-built_in">name</span>)<span class="hljs-comment">//jawill</span></code></pre>
<p>demo2：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="name=&quot;jawil&quot;;
console.log(name);//jawil
console.log(window.name)//jawil
console.log(this.name)//jawil" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code><span class="hljs-built_in">name</span>=<span class="hljs-string">"jawil"</span>;
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">name</span>);<span class="hljs-comment">//jawil</span>
console.<span class="hljs-built_in">log</span>(window.<span class="hljs-built_in">name</span>)<span class="hljs-comment">//jawil</span>
console.<span class="hljs-built_in">log</span>(this.<span class="hljs-built_in">name</span>)<span class="hljs-comment">//jawil</span></code></pre>
<p>好，从例子看以看出，这两个name都是全局属性，未通过var声明的变量a和通过var声明的变量b，都可以通过this和window访问到.</p>
<p>我们可以在控制台打印出windowd对象，发现name成了window对象的一个属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name=&quot;jawil&quot;;
console.log(window);
name2=&quot;test&quot;;
console.log(window);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>var name=<span class="hljs-string">"jawil"</span><span class="hljs-comment">;</span>
console.log(window)<span class="hljs-comment">;</span>
<span class="hljs-attribute">name2</span>=<span class="hljs-string">"test"</span><span class="hljs-comment">;</span>
console.log(window)<span class="hljs-comment">;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008507703?w=578&amp;h=366" src="https://static.alili.tech/img/remote/1460000008507703?w=578&amp;h=366" alt="" title="" style="cursor: pointer;"></span></p>
<p><code>这是其实一个作用域和上下文的问题。在JavaScript中，this指向当前的上下文，而var定义的变量值在当前作用域中有效。JavaScript有两种作用域，全局作用域和局部作用域。局部作用域就是在一个函数里。var关键字使用来在当前作用于中创建局部变量的，而在浏览器中的JavaScript全局作用域中使用var语句时，会把申明的变量挂在window上，而全局作用域中的this上下文恰好指向的又是window，因此在全局作用域中var申明的变量和window上挂的变量，即this可访问的变量有间接的联系，但没有直接联系，更不是一样的。</code></p>
<p>上面的分析我们知道了，全局变量，全局环境下的this,还有全局对象之间的关系了，具体总结一下就是：</p>
<p>**1. 全局环境的this会指向全局对象window，此时this===window;</p>
<ol>
<li><p>全局变量会挂载在window对象下，会成为window下的一个属性。</p></li>
<li><p>如果你没有使用严格模式并给一个未声明的变量赋值的话，JS会自动创建一个全局变量。**</p></li>
</ol>
<p>那么用var声明的全局变量赋值和未声明的全局变量赋值到底有什么不同呢？这里不再是理解理解这道面试题的重点，想深入探究可以看看这篇文章：<a href="http://www.jb51.net/article/77585.htm" rel="nofollow noreferrer" target="_blank">javascript中加var和不加var的区别 你真的懂吗</a>.</p>
<p>该回头了，好累?，再来看看这道面试题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="![](http://odssgnnpf.bkt.clouddn.com/1440757221622060.jpg)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>!<span class="hljs-selector-attr">[]</span>(<span class="hljs-attribute">http</span>:<span class="hljs-comment">//odssgnnpf.bkt.clouddn.com/1440757221622060.jpg)</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &quot;jay&quot;; //一看这二逼就是周杰伦的死忠粉
var person = {
    name: &quot;kang&quot;,
    pro: {
        name: &quot;Michael&quot;,
        getName: function() {
            return this.name;
        }
    }
};
console.log(person.pro.getName());
var pepole = person.pro.getName;
console.log(pepole());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> name = <span class="hljs-string">"jay"</span>; <span class="hljs-comment">//一看这二逼就是周杰伦的死忠粉</span>
<span class="hljs-keyword">var</span> person = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"kang"</span>,
    <span class="hljs-attr">pro</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">"Michael"</span>,
        <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
        }
    }
};
<span class="hljs-built_in">console</span>.log(person.pro.getName());
<span class="hljs-keyword">var</span> pepole = person.pro.getName;
<span class="hljs-built_in">console</span>.log(pepole());</code></pre>
<p>最后就成了为什么person.pro.getName()的this是person.pro而pepole（）的this成了window对象。这里我们就要了解this的运行机制和原理。</p>
<p>在这里，我们需要得出一个非常重要一定要牢记于心的结论，<strong>this的指向，是在函数被调用的时候确定的</strong>。也就是执行上下文被创建时确定的。因此我们可以很容易就能理解到，一个函数中的this指向，可以是非常灵活的。</p>
<p>在一个函数上下文中，this由调用者提供，由调用函数的方式来决定。<br><strong>如果调用者函数，被某一个对象所拥有，那么该函数在调用时，内部的this指向该对象。如果函数独立调用，那么该函数内部的this，则指向undefined。但是在非严格模式中，当this指向undefined时，它会被自动指向全局对象。</strong></p>
<p>person.pro.getName()中，getName是调用者，他不是独立调用，被对象person.pro所拥有，因此它的this指向了person.pro。而pepole()作为调用者，尽管他与person.pro.getName的引用相同，但是它是独立调用的，因此this指向undefined，在非严格模式，自动转向全局window。</p>
<p>再来看一个例子，来加深理解这段话：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 20;
function getA() {
    return this.a;
}
var foo = {
    a: 10,
    getA: getA
}
console.log(foo.getA());  // 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = <span class="hljs-number">20</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getA</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.a;
}
<span class="hljs-keyword">var</span> foo = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">getA</span>: getA
}
<span class="hljs-built_in">console</span>.log(foo.getA());  <span class="hljs-comment">// 10</span></code></pre>
<p>灵机一动，再来一个。如下例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    console.log(this.a)
}

function active(fn) {
    fn(); // 真实调用者，为独立调用
}

var a = 20;
var obj = {
    a: 10,
    getA: foo
}
active(obj.getA);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">active</span>(<span class="hljs-params">fn</span>) </span>{
    fn(); <span class="hljs-comment">// 真实调用者，为独立调用</span>
}

<span class="hljs-keyword">var</span> a = <span class="hljs-number">20</span>;
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">getA</span>: foo
}
active(obj.getA);</code></pre>
<p>这个例子提示一下，关于函数参数的传递赋值问题。<br><a href="http://bosn.me/js/js-call-by-sharing/" rel="nofollow noreferrer" target="_blank">JS是按值传递还是按引用传递?</a><br>这里我就不多做解答了，大家自行揣摩。</p>
<p>以上关于this解答来自波同学的引用，我这里就偷了个懒在，直接拿来引用。<br>原文地址:<a href="http://www.jianshu.com/p/d647aa6d1ae6" rel="nofollow noreferrer" target="_blank">前端基础进阶（五）：全方位解读this</a></p>
<p>最后把知道面试题梳理一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(person.pro.getName());//Michael
var pepole = person.pro.getName;
console.log(pepole());//jay" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>console.<span class="hljs-built_in">log</span>(person.<span class="hljs-keyword">pro</span>.getName());<span class="hljs-comment">//Michael</span>
<span class="hljs-keyword">var</span> pepole = person.<span class="hljs-keyword">pro</span>.getName;
console.<span class="hljs-built_in">log</span>(pepole());<span class="hljs-comment">//jay</span></code></pre>
<p>person.pro.getName()中，getName是调用者，他不是独立调用，被对象person.pro所拥有，因此它的this指向了person.pro,所以this.name=person.pro.name="Michael";</p>
<p>而pepole()作为调用者，尽管他与person.pro.getName的引用相同，但是它是独立调用的，因此this指向undefined，在非严格模式，自动转向全局window。<br>这道题实在非严格模式下，所以this指向了window，又因为全局变量挂载在window对象下，所以this.name=window.name=“jay”</p>
<p>完毕~写的有点啰嗦，只是尽量想说明白，讲清一些概念的东西，反正我是收获很多，你呢？</p>
<p>参考文章:<br><a href="http://www.w3school.com.cn/jsref/jsref_obj_global.asp" rel="nofollow noreferrer" target="_blank">JavaScript 全局对象</a><br><a href="http://blog.csdn.net/liujie19901217/article/details/52225025" rel="nofollow noreferrer" target="_blank">原生JS执行环境与作用域深入理解</a><br><a href="http://www.cnblogs.com/fool/archive/2010/10/16/1853326.html" rel="nofollow noreferrer" target="_blank">理解Javascript_12_执行模型浅析</a><br><a href="http://www.jianshu.com/p/a6d37c77e8db" rel="nofollow noreferrer" target="_blank">前端基础进阶（二）：执行上下文详细图解</a><br><a href="http://www.jianshu.com/p/d647aa6d1ae6" rel="nofollow noreferrer" target="_blank">前端基础进阶（五）：全方位解读this</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一道JS面试题所引发的"血案"，透过现象寻本质，再从本质看现象

## 原文链接
[https://segmentfault.com/a/1190000008507691](https://segmentfault.com/a/1190000008507691)

