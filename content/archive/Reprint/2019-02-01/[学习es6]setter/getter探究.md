---
title: '[学习es6]setter/getter探究' 
date: 2019-02-01 2:30:10
hidden: true
slug: 903labyluwv
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1. 背景</h2>
<p>在es6中，我们可以用<code>class</code>关键字来定义类，语法如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Person {
    // 构造函数
    constructor (name) {
        // 属性初始化
        this.name = name;
    }

    // 成员方法
    sayName () {
        console.log(this.name);
    }
    
    // 静态方法
    static sayHi () {
        console.log(&quot;Hi~&quot;);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
    <span class="hljs-comment">// 构造函数</span>
    <span class="hljs-keyword">constructor</span> (name) {
        <span class="hljs-comment">// 属性初始化</span>
        <span class="hljs-keyword">this</span>.name = name;
    }

    <span class="hljs-comment">// 成员方法</span>
    sayName () {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
    }
    
    <span class="hljs-comment">// 静态方法</span>
    <span class="hljs-keyword">static</span> sayHi () {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Hi~"</span>);
    }
}</code></pre>
<p>其实本质还是基于javascript原型链机制开发的<code>语法糖</code>，其中，本人对setter/getter进行一番研究，发现了不少坑。</p>
<h2 id="articleHeader1">2. 深入setter/getter</h2>
<h3 id="articleHeader2">2.1 setter/getter的调用执行时机</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Person {
    constructor (name, age) {
        this.name = name;
        this.age = age;
    }
    set name (name) {
        console.log(&quot;setter&quot;);
        this.name = name;
    }
    get name () {
        console.log(&quot;getter&quot;);
        return this.name;
    }
}

var p = new Person(&quot;zhang&quot;, 25);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
    <span class="hljs-keyword">constructor</span> (name, age) {
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.age = age;
    }
    set name (name) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"setter"</span>);
        <span class="hljs-keyword">this</span>.name = name;
    }
    get name () {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"getter"</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
    }
}

<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"zhang"</span>, <span class="hljs-number">25</span>);</code></pre>
<p>很快，我们就会发现代码报错了</p>
<p><img alt="setter-getter.png" title="setter-getter.png" src="https://static.alili.techundefined" style="cursor: pointer;"></p>
<p>这是因为，在构造函数中执行<code>this.name=name</code>的时候，就会去调用<code>set name</code>，在set name方法中，我们又执行<code>this.name = name</code>，进行无限递归，最后导致栈溢出(RangeError)。</p>
<p>我们稍作修改，让这个代码可以正常执行，达到我们想要的效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Person {
    constructor (name, age) {
        this.name = name;
        this.age = age;
    }
    set name (name) {
        console.log(&quot;setter&quot;);
        this._name = name;
    }
    get name () {
        console.log(&quot;getter&quot;);
        return this._name;
    }

    // 加一个成员方法
    sayName () {
        console.log(this.name);
    }
}

var p = new Person(&quot;zhang&quot;, 25); 
p.sayName();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
    <span class="hljs-keyword">constructor</span> (name, age) {
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.age = age;
    }
    set name (name) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"setter"</span>);
        <span class="hljs-keyword">this</span>._name = name;
    }
    get name () {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"getter"</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._name;
    }

    <span class="hljs-comment">// 加一个成员方法</span>
    sayName () {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
    }
}

<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"zhang"</span>, <span class="hljs-number">25</span>); 
p.sayName();</code></pre>
<p>执行结果为</p>
<p><span class="img-wrap"><img data-src="/img/bVE117?w=321&amp;h=140" src="https://static.alili.tech/img/bVE117?w=321&amp;h=140" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>到这里就可以明白了，原来只要this.name中的属性名和set name/get name后面的name一致，对this.name就会调用setter/getter，也就是说setter/getter是<code>hook函数</code>，而真实的存储变量是<code>_name</code>，我们可以在代码中直接获取它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Person {
    constructor (name, age) {
        this.name = name;
        this.age = age;
    }
    set name (name) {
        console.log(&quot;setter&quot;);
        this._name = name;
    }
    get name () {
        console.log(&quot;getter&quot;);
        return this._name;
    }

    // 加一个成员方法
    sayName () {
        console.log(this.name);
    }
}

var p = new Person(&quot;zhang&quot;, 25); 
console.log(p._name); // &quot;zhang&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
    <span class="hljs-keyword">constructor</span> (name, age) {
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.age = age;
    }
    set name (name) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"setter"</span>);
        <span class="hljs-keyword">this</span>._name = name;
    }
    get name () {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"getter"</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._name;
    }

    <span class="hljs-comment">// 加一个成员方法</span>
    sayName () {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
    }
}

<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"zhang"</span>, <span class="hljs-number">25</span>); 
<span class="hljs-built_in">console</span>.log(p._name); <span class="hljs-comment">// "zhang"</span></code></pre>
<p>执行结果为</p>
<p><span class="img-wrap"><img data-src="/img/bVE12a?w=529&amp;h=185" src="https://static.alili.tech/img/bVE12a?w=529&amp;h=185" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>注意到结果并没有执行getter，因为我们直接访问了<code>p._name</code>，而不是<code>p.name</code></p>
<h3 id="articleHeader3">2.2 只有getter定义只读属性</h3>
<p>当一个属性只有getter没有setter的时候，我们是无法进行赋值操作的（第一次初始化也不行），这一点也是相当地<code>坑</code>。例如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Person {
    constructor (name) {
        this.name = name;
    }
    // 只有getter
    get name () {
        console.log(&quot;getter&quot;);
        return this.name;
    }
}

var p = new Person(&quot;zhang&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
    <span class="hljs-keyword">constructor</span> (name) {
        <span class="hljs-keyword">this</span>.name = name;
    }
    <span class="hljs-comment">// 只有getter</span>
    get name () {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"getter"</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
    }
}

<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"zhang"</span>);</code></pre>
<p>执行结果为</p>
<p><span class="img-wrap"><img data-src="/img/bVE12f?w=961&amp;h=374" src="https://static.alili.tech/img/bVE12f?w=961&amp;h=374" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><em>当没有getter和setter时，就可以正常读写属性</em></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[学习es6]setter/getter探究

## 原文链接
[https://segmentfault.com/a/1190000007356931](https://segmentfault.com/a/1190000007356931)

