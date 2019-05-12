---
title: '关于ES6中箭头函数的this问题' 
date: 2019-01-04 2:30:10
hidden: true
slug: hf4nvjx2v1c
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">什么是箭头函数</h2>
<h3 id="articleHeader1">用法</h3>
<p>ES6 允许使用“箭头”（=&gt;）定义函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <p id=&quot;test1&quot;>测试</p>

  var p1 = document.getElementById('test1');
  p1.addEventListener('click', () => {
        p1.style.color = &quot;red&quot;;
     }, false);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>  &lt;p id=<span class="hljs-string">"test1"</span>&gt;测试&lt;/p&gt;

  var p1 = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'test1'</span>);
  p1.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        p1.style.color = <span class="hljs-string">"red"</span>;
     }, <span class="hljs-literal">false</span>);
</code></pre>
<p>在es5中相当于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var p1 = document.getElementById('test1');
   p1.addEventListener('click', function () {
             //直接通过dom的方法改变颜色
             this.style.color = &quot;red&quot;; 
      },false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-keyword">var</span> p1 = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'test1'</span>);
   p1.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
             <span class="hljs-comment">//直接通过dom的方法改变颜色</span>
             <span class="hljs-keyword">this</span>.style.color = <span class="hljs-string">"red"</span>; 
      },<span class="hljs-literal">false</span>);</code></pre>
<p>但是我们思考一个问题——当我们把第一段代码中的p1换成this时<br>this会指向哪里</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p1.addEventListener('click', () => {
         
      this.style.color = &quot;red&quot;;//   'color' is not undefined
     }, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>p1.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
         
      <span class="hljs-keyword">this</span>.style.color = <span class="hljs-string">"red"</span>;<span class="hljs-regexp">//</span>   <span class="hljs-string">'color'</span> <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> <span class="hljs-literal">undefined</span>
     }, <span class="hljs-literal">false</span>);</code></pre>
<p>这时我们就会想this为什么没有作用，而在es5中this是指向了p1</p>
<h3 id="articleHeader2">箭头函数有个使用注意点。</h3>
<p>函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。<br><strong>this对象的指向是可变的，但是在箭头函数中，它是固定的。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 21;

foo.call({ id: 42 });
// id: 42" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'id:'</span>, <span class="hljs-keyword">this</span>.id);
  }, <span class="hljs-number">100</span>);
}

<span class="hljs-keyword">var</span> id = <span class="hljs-number">21</span>;

foo.call({ <span class="hljs-attr">id</span>: <span class="hljs-number">42</span> });
<span class="hljs-comment">// id: 42</span></code></pre>
<p>上面代码中，setTimeout的参数是一个箭头函数，这个箭头函数的定义生效是在foo函数生成时，而它的真正执行要等到100毫秒后。如果是普通函数，执行时this应该指向全局对象window，这时应该输出21。但是，箭头函数导致this总是指向函数定义生效时所在的对象（本例是{id: 42}），所以输出的是42</p>
<h3 id="articleHeader3">箭头函数的this</h3>
<p><strong>this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES6
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

// ES5
function foo() {
  var _this = this;

  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// ES6</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'id:'</span>, <span class="hljs-keyword">this</span>.id);
  }, <span class="hljs-number">100</span>);
}

<span class="hljs-comment">// ES5</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;

  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'id:'</span>, _this.id);
  }, <span class="hljs-number">100</span>);
}</code></pre>
<p>上面代码中，转换后的es5清楚地说明了，箭头函数里面根本没有自己的this，而是引用外层的this。</p>
<p><strong>由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function() {
  return [
    (() => this.x).bind({ x: 'inner' })()
  ];
}).call({ x: 'outer' });
// ['outer']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> [
    <span class="hljs-function">(<span class="hljs-params">(<span class="hljs-params"></span>) =&gt; <span class="hljs-keyword">this</span>.x</span>).<span class="hljs-params">bind</span>(<span class="hljs-params">{ x: 'inner' }</span>)<span class="hljs-params">()</span>
  ];
}).<span class="hljs-params">call</span>(<span class="hljs-params">{ x: 'outer' }</span>);
// ['<span class="hljs-params">outer</span>']</span></code></pre>
<p>同样的由于箭头函数没有自己的this 所以bind传统的显性绑定无效 内部的this指向外部this<br>在javascript的学习中， this的指向问题一直是个难点，特别是在对象方法中使用this时，必须更加小心。由此箭头函数在很大程度上减少了我们的困扰。</p>
<h3 id="articleHeader4">箭头函数this词法</h3>
<p>话又说回来，当我们使用箭头函数时不使用常规的四种this绑定，又该怎么决定this的指向问题呢？<br><strong>箭头函数是根据外层（函数或者全局）作用域来决定this</strong></p>
<p>让我们看看箭头函数的此法作用域：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function foo() {
            //返回箭头函数
            return(a) => {
                //this 继承自foo()
                console.log(this.a);
            };
        }
        var obj1 = {
            a:2
        };
        var obj2 ={
            a:3
        };
        var bar = foo.call(obj1);
        bar.call(obj2); //是2， 不是3！！！" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">//返回箭头函数</span>
            <span class="hljs-keyword">return</span><span class="hljs-function">(<span class="hljs-params">a</span>) =&gt;</span> {
                <span class="hljs-comment">//this 继承自foo()</span>
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a);
            };
        }
        <span class="hljs-keyword">var</span> obj1 = {
            <span class="hljs-attr">a</span>:<span class="hljs-number">2</span>
        };
        <span class="hljs-keyword">var</span> obj2 ={
            <span class="hljs-attr">a</span>:<span class="hljs-number">3</span>
        };
        <span class="hljs-keyword">var</span> bar = foo.call(obj1);
        bar.call(obj2); <span class="hljs-comment">//是2， 不是3！！！</span></code></pre>
<p>foo()内部创建的箭头函数会捕获调用时foo()的this。由于foo()的this绑定到了obj1，所以bar(引用箭头函数)的this也会绑定到obj1，上文说过<strong>箭头函数this对象的指向是固定的</strong>所以后面的call修改不了绑定，即使是new也不行。</p>
<p>箭头函数可以像bind()一样确保函数的this被绑定到指定对象上，此外， 其重要性还体现在它更常见的词法作用域取代了传统的this的机制。实际上， 在ES6之前我们就已经在使用一种集合和箭头函数完全一样的模式了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function foo() {
            var self = this;
            setTimeout(function() {
                console.log(self.a)
            },100)
        }
        var obj = {
            a:2
        };
        foo.call(obj);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
            setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">console</span>.log(self.a)
            },<span class="hljs-number">100</span>)
        }
        <span class="hljs-keyword">var</span> obj = {
            <span class="hljs-attr">a</span>:<span class="hljs-number">2</span>
        };
        foo.call(obj);</code></pre>
<p>和箭头函数一样self = this 看起来都可以取代bind()， 但是从本质上来看，它们是想代替this这个机制。</p>
<h3 id="articleHeader5">注意</h3>
<p>如果经常编写this风格的代码，又喜欢用箭头函数或者self= this的方法来否定this机制。<br>那么或许你应当：</p>
<ol>
<li>只使用词法作用域并完全摒弃错误的this风格</li>
<li>完全采用this风格，在必要时仍使用bind(), 避免使用箭头函数或者self = this。</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于ES6中箭头函数的this问题

## 原文链接
[https://segmentfault.com/a/1190000010680814](https://segmentfault.com/a/1190000010680814)

