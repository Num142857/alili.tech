---
title: 'JavaScript学习总结——this对象' 
date: 2019-02-11 2:30:49
hidden: true
slug: 6y9mlrlz2cu
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>在JavaScript中，this关键字是动态绑定的，或称为运行期绑定，这极大地增强的我们程序的灵活性，同时也给初学者带来了很多困惑。本文总结了this的几个使用场景和常见误区。</p></blockquote>
<h2 id="articleHeader0">全局环境</h2>
<p>在全局环境中使用<code>this</code>，它会指向全局对象。在web游览器中，也就是window对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alert(this === window);    // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">alert(<span class="hljs-keyword">this</span> === <span class="hljs-built_in">window</span>);    <span class="hljs-regexp">//</span> <span class="hljs-literal">true</span></code></pre>
<h2 id="articleHeader1">函数调用</h2>
<p>当作为普通函数被调用时，函数内部的的<code>this</code>也会指向全局对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &quot;window&quot;;

function sayName(){
    var name = &quot;fun&quot;;
    alert(this.name);
}

sayName();    // &quot;window&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> name = <span class="hljs-string">"window"</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayName</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">var</span> name = <span class="hljs-string">"fun"</span>;
    alert(<span class="hljs-keyword">this</span>.name);
}

sayName();    <span class="hljs-comment">// "window"</span></code></pre>
<h2 id="articleHeader2">作为对象的方法调用</h2>
<p>当作为对象内部的方法被调用时，这里<code>this</code>指向这个方法所在的对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &quot;window&quot;;

var obj = {
  name: &quot;obj&quot;,
  sayName: function(){
    alert(this.name);
  }
};

obj.sayName();    // &quot;obj&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> name = <span class="hljs-string">"window"</span>;

<span class="hljs-keyword">var</span> obj = {
  name: <span class="hljs-string">"obj"</span>,
  sayName: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    alert(<span class="hljs-keyword">this</span>.name);
  }
};

obj.sayName();    <span class="hljs-comment">// "obj"</span></code></pre>
<h2 id="articleHeader3">作为构造函数调用</h2>
<p>JavaScript 中的构造函数很特殊，如果不使用 new 调用，则和普通函数一样。作为又一项约定俗成的准则，构造函数以大写字母开头，提醒调用者使用正确的方式调用。如果调用正确，<code>this</code> 绑定到新创建的对象上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name){
    this.name = name,
    this.sayName = function(){
        alert(this.name);
    }
}

var person1 = new Person(&quot;daoko&quot;);
person1.sayName();    // &quot;darko&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span><span class="hljs-params">(name)</span></span>{
    <span class="hljs-keyword">this</span>.name = name,
    <span class="hljs-keyword">this</span>.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        alert(<span class="hljs-keyword">this</span>.name);
    }
}

<span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"daoko"</span>);
person1.sayName();    <span class="hljs-comment">// "darko"</span></code></pre>
<h2 id="articleHeader4">apply和call调用</h2>
<p><code>apply</code>和<code>call</code>是函数对象的的两个方法，它们可以修改函数执行的上下文环境，即<code>this</code>绑定的对象。<code>apply</code>和<code>call</code>的第一个参数就是this绑定的对象，若<code>apply</code>和<code>call</code>的参数为空，则默认调用全局对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &quot;window&quot;

var obj = {
  name: &quot;object&quot;
}

function sayName(){
  alert(this.name);
}

sayName();    // 直接调用函数sayName
sayName.call(obj);    // 用call方法修改this的指向
sayName.call();    // 当call方法的参数为空时，默认调用全局对象" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> name = <span class="hljs-string">"window"</span>

<span class="hljs-keyword">var</span> obj = {
  name: <span class="hljs-string">"object"</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayName</span><span class="hljs-params">()</span></span>{
  alert(<span class="hljs-keyword">this</span>.name);
}

sayName();    <span class="hljs-comment">// 直接调用函数sayName</span>
sayName.call(obj);    <span class="hljs-comment">// 用call方法修改this的指向</span>
sayName.call();    <span class="hljs-comment">// 当call方法的参数为空时，默认调用全局对象</span></code></pre>
<h2 id="articleHeader5">特殊情况</h2>
<h3 id="articleHeader6">常见错误</h3>
<p>我们首先来看这样一个栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &quot;window&quot;;

var obj = {
  name: &quot;obj&quot;,
  sayName: function(){
    var test = function(){
      alert(this.name);    // this绑定到全局对象上
    }
    test();
  }
}

obj.sayName();    // &quot;window&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> name = <span class="hljs-string">"window"</span>;

<span class="hljs-keyword">var</span> obj = {
  name: <span class="hljs-string">"obj"</span>,
  sayName: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">var</span> test = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
      alert(<span class="hljs-keyword">this</span>.name);    <span class="hljs-comment">// this绑定到全局对象上</span>
    }
    test();
  }
}

obj.sayName();    <span class="hljs-comment">// "window"</span>
</code></pre>
<p>是不是和上面说的<code>作为对象的方法调用</code>情况很像，按照我们的理解此时的<code>this</code>应该指向<code>obj</code>对象，但是实际情况不是这样的，此时的<code>this</code>指向全局对象。</p>
<p>这属于 JavaScript 的设计缺陷，正确的设计方式是内部函数的 this 应该绑定到其外层函数对应的对象上，为了规避这一缺陷，我们可以使用变量替代的方法，约定俗成，该变量一般被命名为 that。 在这个栗子中，这样我们创建了一个局部变量<code>that</code>来指向<code>obj</code>对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &quot;window&quot;;

var obj = {
  name: &quot;obj&quot;,
  sayName: function(){
    var that = this;    // that指向对象obj
    var test = function(){
      alert(that.name);
    }
    test();
  }
}

obj.sayName();    // &quot;obj&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> name = <span class="hljs-string">"window"</span>;

<span class="hljs-keyword">var</span> obj = {
  name: <span class="hljs-string">"obj"</span>,
  sayName: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;    <span class="hljs-comment">// that指向对象obj</span>
    <span class="hljs-keyword">var</span> test = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
      alert(that.name);
    }
    test();
  }
}

obj.sayName();    <span class="hljs-comment">// "obj"</span></code></pre>
<h3 id="articleHeader7">方法的赋值表达式</h3>
<p>当我们把一个对象的方法赋值给一个变量时，它的<code>this</code>会发生什么变化呢? 看个栗子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &quot;window&quot;;

var obj = {
  name: &quot;obj&quot;,
  sayName: function(){
    alert(this.name);
  }
}

var test = obj.sayName;
obj.sayName();    // &quot;obj&quot;
test();    // &quot;window&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> name = <span class="hljs-string">"window"</span>;

<span class="hljs-keyword">var</span> obj = {
  name: <span class="hljs-string">"obj"</span>,
  sayName: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    alert(<span class="hljs-keyword">this</span>.name);
  }
}

<span class="hljs-keyword">var</span> test = obj.sayName;
obj.sayName();    <span class="hljs-comment">// "obj"</span>
test();    <span class="hljs-comment">// "window"</span></code></pre>
<p>从上面这个栗子中我们可以看到，当把对象<code>obj</code>的方法赋值给一个新的变量<code>test</code>时，它的this指向发生了变化，<code>test</code>就向一个普通的函数一样被调用，此时指向全局对象。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript学习总结——this对象

## 原文链接
[https://segmentfault.com/a/1190000004938787](https://segmentfault.com/a/1190000004938787)

