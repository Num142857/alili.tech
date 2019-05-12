---
title: '函数式JS: 原来promise是这样的monad' 
date: 2019-01-17 2:30:25
hidden: true
slug: m560p9my4ym
categories: [reprint]
---

{{< raw >}}

                    
<p>转载请注明出处： <a href="http://hai.li/2017/03/27/promise-is-a-monad.html" rel="nofollow noreferrer" target="_blank">http://hai.li/2017/03/27/prom...</a></p>
<h2 id="articleHeader0">背景</h2>
<p>上篇文章 <a href="http://hai.li/2015/06/29/js-continuation-monad-derivation.html" rel="nofollow noreferrer" target="_blank">函数式JS: 一种continuation monad推导</a> 得到了一个类似promise的链式调用，引发了这样的思考：难道promise是monad？如果是的话又是怎样的monad呢？来来来，哥哥带你推倒，哦，不，是推导一下！</p>
<h2 id="articleHeader1">Monad</h2>
<p><a href="https://www.zhihu.com/question/19635359" rel="nofollow noreferrer" target="_blank">Monad</a>是haskell里很重要的概念，作为一种类型，有着固定的操作方法，简单的可以类比面向对象的接口。</p>
<h3 id="articleHeader2">定义</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="unit :: a -> Monad a
flatMap :: Monad a -> (a -> Monad b) -> Monad b" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="haskell hljs"><code class="haskell"><span class="hljs-title">unit</span> :: a -&gt; <span class="hljs-type">Monad</span> a
<span class="hljs-title">flatMap</span> :: <span class="hljs-type">Monad</span> a -&gt; (a -&gt; <span class="hljs-type">Monad</span> b) -&gt; <span class="hljs-type">Monad</span> b</code></pre>
<p>这是<a href="https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch7.html" rel="nofollow noreferrer" target="_blank">类型签名</a>的表述。<code>unit</code>的作用可以理解为将<code>a</code>放入容器中变成<code>Monad a</code>。而当<code>flatMap</code>转为<code>(a -&gt; Monad b) -&gt; (Monad a -&gt; Monad b)</code>时，它的作用就可以理解为将<code>a -&gt; Monad b</code>函数转换成<code>Monad a -&gt; Monad b</code>函数。</p>
<h3 id="articleHeader3">法则</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="flatMap(unit(x), f) ==== f(x) //左单位元
flatMap(monad, unit) ==== monad //右单位元
flatMap(flatMap(monad, f), g) ==== flatMap(monad, function(x) { flatMap(f(x), g) }) //关联性" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">flatMap(unit(x), f) ==== f(x) <span class="hljs-comment">//左单位元</span>
flatMap(monad, unit) ==== monad <span class="hljs-comment">//右单位元</span>
flatMap(flatMap(monad, f), g) ==== flatMap(monad, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>) </span>{ flatMap(f(x), g) }) <span class="hljs-comment">//关联性</span></code></pre>
<p>这里<code>x</code>是一般的值，<code>f</code>和<code>g</code>是一般的函数，<code>monad</code>是一个<code>Monad</code>类型的值，可以这么理解:</p>
<ol>
<li><p>左单位元法则就是将包裹<code>unit(x)</code>和函数<code>f</code>传给<code>flatMap</code>执行等价于将包裹中的值<code>x</code>抽出传给函数<code>f</code>执行</p></li>
<li><p>右单位元法则就是将包裹<code>monad</code>和函数<code>unit</code>传给<code>flatMap</code>执行等价于包裹<code>monad</code>本身（有点像<code>1*1=1</code>）</p></li>
<li><p>关联性法则就是将包裹<code>monad</code>和函数<code>f</code>传给<code>flatMap</code>执行，再将执行的结果和函数<code>g</code>传给<code>flatMap</code>执行等价于将包裹<code>monad</code>中的值<code>x</code>抽出传给<code>f</code>执行（执行结果依然是<code>Monad</code>类型），再将执行结果中的值<code>x</code>抽出传给<code>g</code>执行</p></li>
</ol>
<h2 id="articleHeader4">Promise</h2>
<h3 id="articleHeader5">链式调用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise(function(resolve) { setTimeout(function() { resolve(&quot;0&quot;) }, 100) })
.then(function(v) { 
    console.log(v);
    return new Promise(function(resolve) { resolve(v + &quot;->1&quot;) }) 
})
.then(function(v) { 
    console.log(v);
return new Promise(function(resolve) { setTimeout(function() { resolve(v + &quot;->2&quot;) }, 1000) })
})
.then(console.log)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{ setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ resolve(<span class="hljs-string">"0"</span>) }, <span class="hljs-number">100</span>) })
.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(v);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{ resolve(v + <span class="hljs-string">"-&gt;1"</span>) }) 
})
.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(v);
<span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{ setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ resolve(v + <span class="hljs-string">"-&gt;2"</span>) }, <span class="hljs-number">1000</span>) })
})
.then(<span class="hljs-built_in">console</span>.log)</code></pre>
<h3 id="articleHeader6">分析</h3>
<p>先将<code>Promise</code>链式调用整理一下，将关注点集中在链式调用上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f0(resolve) { setTimeout(function() { resolve(&quot;0&quot;) }, 100) }
function f1(v) { console.log(v); return new Promise(function(resolve) { resolve(v + &quot;->1&quot;) }) }
function f2(v) { console.log(v); return new Promise(function(resolve) { setTimeout(function() { resolve(v + &quot;->2&quot;) }, 1000) }) }
function f3(v) { console.log(v) }
new Promise(f0).then(f1).then(f2).then(f3) //0 0->1 0->1->2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f0</span>(<span class="hljs-params">resolve</span>) </span>{ setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ resolve(<span class="hljs-string">"0"</span>) }, <span class="hljs-number">100</span>) }
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span>(<span class="hljs-params">v</span>) </span>{ <span class="hljs-built_in">console</span>.log(v); <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{ resolve(v + <span class="hljs-string">"-&gt;1"</span>) }) }
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f2</span>(<span class="hljs-params">v</span>) </span>{ <span class="hljs-built_in">console</span>.log(v); <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{ setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ resolve(v + <span class="hljs-string">"-&gt;2"</span>) }, <span class="hljs-number">1000</span>) }) }
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f3</span>(<span class="hljs-params">v</span>) </span>{ <span class="hljs-built_in">console</span>.log(v) }
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(f0).then(f1).then(f2).then(f3) <span class="hljs-comment">//0 0-&gt;1 0-&gt;1-&gt;2</span></code></pre>
<p>从<code>unit</code>和<code>flatMap</code>的特性可以直观地对应为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function g0(resolve) { setTimeout(function() { resolve(&quot;0&quot;) }, 100) }
function g1(v) { console.log(v); return unit(function(resolve) { resolve(v + &quot;->1&quot;) }) }
function g2(v) { console.log(v); return unit(function(resolve) { setTimeout(function() { resolve(v + &quot;->2&quot;) }, 1000) }) }
function g3(v) { console.log(v) }
unit(g0).flatMap(g1).flatMap(g2).flatMap(f3)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g0</span>(<span class="hljs-params">resolve</span>) </span>{ setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ resolve(<span class="hljs-string">"0"</span>) }, <span class="hljs-number">100</span>) }
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g1</span>(<span class="hljs-params">v</span>) </span>{ <span class="hljs-built_in">console</span>.log(v); <span class="hljs-keyword">return</span> unit(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{ resolve(v + <span class="hljs-string">"-&gt;1"</span>) }) }
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g2</span>(<span class="hljs-params">v</span>) </span>{ <span class="hljs-built_in">console</span>.log(v); <span class="hljs-keyword">return</span> unit(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{ setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ resolve(v + <span class="hljs-string">"-&gt;2"</span>) }, <span class="hljs-number">1000</span>) }) }
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g3</span>(<span class="hljs-params">v</span>) </span>{ <span class="hljs-built_in">console</span>.log(v) }
unit(g0).flatMap(g1).flatMap(g2).flatMap(f3)</code></pre>
<p>而对象的方法可以通过将<code>this</code>作为参数传入方便地转为直接的函数，比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {method: function f(v){ console.log(this, v) "}}"
var a_method = function(t, v){ console.log(t, v) }
a.method(&quot;a&quot;) === a_method(a, &quot;a&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a = {<span class="hljs-attr">method</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params">v</span>)</span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>, v) "}}"
<span class="hljs-keyword">var</span> a_method = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t, v</span>)</span>{ <span class="hljs-built_in">console</span>.log(t, v) }
a.method(<span class="hljs-string">"a"</span>) === a_method(a, <span class="hljs-string">"a"</span>)</code></pre>
<p>这样将链式调用转为嵌套函数调用变成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function g0(resolve) { setTimeout(function() { resolve(&quot;0&quot;) }, 100) }
function g1(v) { console.log(v); return unit(function(resolve) { resolve(v + &quot;->1&quot;) }) }
function g2(v) { console.log(v); return unit(function(resolve) { setTimeout(function() { resolve(v + &quot;->2&quot;) }, 1000) }) }
function g3(v) { console.log(v) }
flatMap(
    flatMap(
        flatMap(
            unit(g0)
        )(g1)
    )(g2)
)(g3)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g0</span>(<span class="hljs-params">resolve</span>) </span>{ setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ resolve(<span class="hljs-string">"0"</span>) }, <span class="hljs-number">100</span>) }
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g1</span>(<span class="hljs-params">v</span>) </span>{ <span class="hljs-built_in">console</span>.log(v); <span class="hljs-keyword">return</span> unit(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{ resolve(v + <span class="hljs-string">"-&gt;1"</span>) }) }
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g2</span>(<span class="hljs-params">v</span>) </span>{ <span class="hljs-built_in">console</span>.log(v); <span class="hljs-keyword">return</span> unit(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{ setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ resolve(v + <span class="hljs-string">"-&gt;2"</span>) }, <span class="hljs-number">1000</span>) }) }
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g3</span>(<span class="hljs-params">v</span>) </span>{ <span class="hljs-built_in">console</span>.log(v) }
flatMap(
    flatMap(
        flatMap(
            unit(g0)
        )(g1)
    )(g2)
)(g3)</code></pre>
<p>这样如果<code>unit</code>和<code>flatMap</code>这两个直接函数可以构造推导出来，就可以窥探<code>Promise</code>的真面目了。同学们！这道题！必考题！头两年不考，今年肯定考！</p>
<h3 id="articleHeader7">构造推导<code>unit</code>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unit(f){ return f}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unit</span>(<span class="hljs-params">f</span>)</span>{ <span class="hljs-keyword">return</span> f}</code></pre>
<ol>
<li><p>由<code>flatMap :: Monad a -&gt; (a -&gt; Monad b) -&gt; Monad b</code>和<code>flatMap(unit(g0))(g1)</code>可知传入<code>g1</code>的参数就是<code>a</code>，对应着<code>"0"</code>。</p></li>
<li><p>但由<code>unit :: a -&gt; Monad a</code>和<code>unit(g0)</code>得到的<code>a</code>却对应着<code>g0</code>。实际上<code>a</code>对应着<code>"0"</code>，只是<code>a</code>在<code>g0</code>里作为立即量传入，在<code>g1</code>和<code>g2</code>的返回值中作为闭包引用传入。</p></li>
<li><p><code>Monad</code>可看作容器，那用什么做的容器呢？既然作为参数传入<code>unit</code>的函数<code>f</code>已经包裹了<code>a</code>，那试试直接作为<code>Monad a</code>返回。同时根据<code>g0</code>看出返回值<code>f</code>是用回调返回值的。也就是<em>将一个用回调返回结果的函数作为容器</em>。</p></li>
</ol>
<h3 id="articleHeader8">构造推导<code>flatMap</code>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function flatMap(ma){
    return function(g) {
        var b=[], ga, h=[];
        ma(function(a) { //1. 解包`ma`取出`a`
            ga = g(a); //2. 将`a`传到`g`中执行
            (ga &amp;&amp; ga.flatMap ? ga : unit(function(c) { c(ga) })) //处理g没返回unit情况
                (function(v) {
                    b.push(v); // 1.1—1.2—1.3
                    h.map(function(c) {c(v)}) //1.1—1.3—1.2
                })
        });
        return unit(function(c) { //3. 将执行结果`b`包裹成`mb`返回
            b.length 
            ? b.map(c)  // 1.1—1.2—1.3—2.1
            : h.push(c) //1.1—1.3—1.2—2.1
        })
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flatMap</span>(<span class="hljs-params">ma</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">g</span>) </span>{
        <span class="hljs-keyword">var</span> b=[], ga, h=[];
        ma(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a</span>) </span>{ <span class="hljs-comment">//1. 解包`ma`取出`a`</span>
            ga = g(a); <span class="hljs-comment">//2. 将`a`传到`g`中执行</span>
            (ga &amp;&amp; ga.flatMap ? ga : unit(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{ c(ga) })) <span class="hljs-comment">//处理g没返回unit情况</span>
                (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{
                    b.push(v); <span class="hljs-comment">// 1.1—1.2—1.3</span>
                    h.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{c(v)}) <span class="hljs-comment">//1.1—1.3—1.2</span>
                })
        });
        <span class="hljs-keyword">return</span> unit(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{ <span class="hljs-comment">//3. 将执行结果`b`包裹成`mb`返回</span>
            b.length 
            ? b.map(c)  <span class="hljs-comment">// 1.1—1.2—1.3—2.1</span>
            : h.push(c) <span class="hljs-comment">//1.1—1.3—1.2—2.1</span>
        })
    }
}</code></pre>
<ol>
<li>
<p>由<code>flatMap :: Monad a -&gt; (a -&gt; Monad b) -&gt; Monad b</code>知道<code>flatMap</code>传入<code>Monad a</code>返回函数，这个函数接收<code>(a -&gt; Monad b)</code>返回<code>Monad b</code>，而<code>(a -&gt; Monad b)</code>对应<code>g1</code>。可以构造<code>flatMap</code>如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function flatMap(ma){return function(g1) { /*b = g1(a);*/ return mb "}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flatMap</span>(<span class="hljs-params">ma</span>)</span>{<span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">g1</span>) </span>{ <span class="hljs-comment">/*b = g1(a);*/</span> <span class="hljs-keyword">return</span> mb "}}"</code></pre>
</li>
<li>
<p>实际<code>flatMap</code>做了3步工作</p>
<ol>
<li><p>解包<code>ma</code>取出<code>a</code></p></li>
<li><p>将<code>a</code>传到<code>g1</code>中执行</p></li>
<li><p>将执行结果<code>b</code>包裹成<code>mb</code>返回</p></li>
</ol>
</li>
<li>
<p>这里<code>ma</code>和<code>g1</code>都是容器，通过回调得到输出结果，所以在<code>ma</code>的回调中执行<code>g1(a)</code>，再在<code>g1(a)</code>的回调中得到执行结果<code>v</code>，再将执行结果<code>v</code>赋值给外部变量<code>b</code>，最后将<code>b</code>用<code>unit</code>包裹成<code>Monad b</code>返回。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function flatMap(ma){
    return function(g1) {
        var b;
        ma(function(a) {
            g1(a)(function(v) {
                b = v
            })
        });
        return unit(function(c) {c(b)})
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flatMap</span>(<span class="hljs-params">ma</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">g1</span>) </span>{
        <span class="hljs-keyword">var</span> b;
        ma(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a</span>) </span>{
            g1(a)(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{
                b = v
            })
        });
        <span class="hljs-keyword">return</span> unit(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{c(b)})
    }
}</code></pre>
</li>
<li>
<p>如果<code>g1</code>是立即执行的话，第<code>flatMap</code>的执行步骤是1--2--3，但如果2延迟执行步骤就变成了1--3--2，算上下一个<code>flatMap</code>就是1.1--1.3--1.2--2.1。2.1的<code>ma</code>就是1.2的<code>mb</code>，2.1的<code>ma</code>的参数<code>c</code>中执行了2.2和2.3，也就是1.3的<code>c</code>决定着2.1之后的步骤。如果将<code>c</code>赋值给<code>b</code>就可以在1.2执行完后才继续2.1之后的步骤，也就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        +--------------+
1.1—1.2—1.3—2.1    2.2—2.3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code class="text">        +<span class="hljs-selector-tag">--------------</span>+
1<span class="hljs-selector-class">.1</span>—1<span class="hljs-selector-class">.2</span>—1<span class="hljs-selector-class">.3</span>—2<span class="hljs-selector-class">.1</span>    2<span class="hljs-selector-class">.2</span>—2<span class="hljs-selector-class">.3</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function flatMap(ma){
    return function(g1) {
        var b;
        ma(function(a) {
            g1(a)(function(v) {
                b(v)
            })
        });
        return unit(function(c) { b = c })
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flatMap</span>(<span class="hljs-params">ma</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">g1</span>) </span>{
        <span class="hljs-keyword">var</span> b;
        ma(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a</span>) </span>{
            g1(a)(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{
                b(v)
            })
        });
        <span class="hljs-keyword">return</span> unit(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{ b = c })
    }
}</code></pre>
</li>
<li>
<p>为了<code>flatMap</code>可以链接多个<code>flatMap</code>，也就是一个1.3被多个2.1消化，需要保存所有在2.1后的执行链 <code>c</code>，用数组<code>h</code>解决。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function flatMap(ma){
    return function(g1) {
        var h=[];
        ma(function(a) {
            g1(a)(function(v) {
                h.map(function(c) {c(v)})
            })
        });
        return unit(function(c) { h.push(c) })
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flatMap</span>(<span class="hljs-params">ma</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">g1</span>) </span>{
        <span class="hljs-keyword">var</span> h=[];
        ma(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a</span>) </span>{
            g1(a)(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{
                h.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{c(v)})
            })
        });
        <span class="hljs-keyword">return</span> unit(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{ h.push(c) })
    }
}</code></pre>
</li>
<li>
<p>整合1.2立即执行和延迟执行情况，同时适配多个1.3被多个2.1消化的情况，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function flatMap(ma){
    return function(g1) {
    var b=[], h=[];
    ma(function(a) {
        g1(a)(function(v) {
            b.push(v); // 1.1—1.2—1.3
            h.map(function(c) {c(v)}) //1.1—1.3—1.2
        })
    });
    return unit(function(c) { 
        b.length 
        ? b.map(c)  // 1.1—1.2—1.3—2.1
        : h.push(c) //1.1—1.3—1.2—2.1
    })
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flatMap</span>(<span class="hljs-params">ma</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">g1</span>) </span>{
    <span class="hljs-keyword">var</span> b=[], h=[];
    ma(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a</span>) </span>{
        g1(a)(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{
            b.push(v); <span class="hljs-comment">// 1.1—1.2—1.3</span>
            h.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{c(v)}) <span class="hljs-comment">//1.1—1.3—1.2</span>
        })
    });
    <span class="hljs-keyword">return</span> unit(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{ 
        b.length 
        ? b.map(c)  <span class="hljs-comment">// 1.1—1.2—1.3—2.1</span>
        : h.push(c) <span class="hljs-comment">//1.1—1.3—1.2—2.1</span>
    })
    }
}</code></pre>
</li>
<li>
<p>由于<code>g3</code>没有返回<code>mb</code>，所以还要加上对<code>g1</code>返回的不是容器的处理，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function flatMap(ma){
    return function(g1) {
        var b=[], g1a, h=[];
        ma(function(a) {
            g1a = g1(a);
            (g1a &amp;&amp; typeof(g1a) == &quot;function&quot; ? g1a : unit(function(c) { c(g1a) }))
                (function(v) {
                    b.push(v); // 1.1—1.2—1.3
                    h.map(function(c) {c(v)}) //1.1—1.3—1.2
                })
        });
        return unit(function(c) { 
            b.length 
            ? b.map(c)  // 1.1—1.2—1.3—2.1
            : h.push(c) //1.1—1.3—1.2—2.1
        })
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flatMap</span>(<span class="hljs-params">ma</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">g1</span>) </span>{
        <span class="hljs-keyword">var</span> b=[], g1a, h=[];
        ma(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a</span>) </span>{
            g1a = g1(a);
            (g1a &amp;&amp; <span class="hljs-keyword">typeof</span>(g1a) == <span class="hljs-string">"function"</span> ? g1a : unit(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{ c(g1a) }))
                (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{
                    b.push(v); <span class="hljs-comment">// 1.1—1.2—1.3</span>
                    h.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{c(v)}) <span class="hljs-comment">//1.1—1.3—1.2</span>
                })
        });
        <span class="hljs-keyword">return</span> unit(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{ 
            b.length 
            ? b.map(c)  <span class="hljs-comment">// 1.1—1.2—1.3—2.1</span>
            : h.push(c) <span class="hljs-comment">//1.1—1.3—1.2—2.1</span>
        })
    }
}</code></pre>
</li>
<li>
<p>现在可以测试下代码了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unit(f){ return f }
function flatMap(ma) {
    return function(g) {
        var b=[], ga, h=[];
        ma(function(a) { //1. 解包`ma`取出`a`
            ga = g(a); //2. 将`a`传到`g`中执行
            (ga &amp;&amp; typeof(ga) == &quot;function&quot;? ga : unit(function(c) { c(ga) })) //处理g没返回unit情况
                (function(v) {
                    b.push(v); // 1.1—1.2—1.3
                    h.map(function(c) {c(v)}) //1.1—1.3—1.2
                })
        });
        return unit(function(c) { //3. 将执行结果`b`包裹成`mb`返回
            b.length 
            ? b.map(c)  // 1.1—1.2—1.3—2.1
            : h.push(c) //1.1—1.3—1.2—2.1
        })
    }
}
function g0(resolve) { setTimeout(function() { resolve(&quot;0&quot;) }, 100) }
function g1(v) { console.log(v); return unit(function(resolve) { resolve(v + &quot;->1&quot;) }) }
function g2(v) { console.log(v); return unit(function(resolve) { setTimeout(function() { resolve(v + &quot;->2&quot;) }, 1000) }) }
function g3(v) { console.log(v) }
flatMap(
    flatMap(
        flatMap(
            unit(g0)
        )(g1)
    )(g2)
)(g3)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unit</span>(<span class="hljs-params">f</span>)</span>{ <span class="hljs-keyword">return</span> f }
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flatMap</span>(<span class="hljs-params">ma</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">g</span>) </span>{
        <span class="hljs-keyword">var</span> b=[], ga, h=[];
        ma(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a</span>) </span>{ <span class="hljs-comment">//1. 解包`ma`取出`a`</span>
            ga = g(a); <span class="hljs-comment">//2. 将`a`传到`g`中执行</span>
            (ga &amp;&amp; <span class="hljs-keyword">typeof</span>(ga) == <span class="hljs-string">"function"</span>? ga : unit(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{ c(ga) })) <span class="hljs-comment">//处理g没返回unit情况</span>
                (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{
                    b.push(v); <span class="hljs-comment">// 1.1—1.2—1.3</span>
                    h.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{c(v)}) <span class="hljs-comment">//1.1—1.3—1.2</span>
                })
        });
        <span class="hljs-keyword">return</span> unit(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{ <span class="hljs-comment">//3. 将执行结果`b`包裹成`mb`返回</span>
            b.length 
            ? b.map(c)  <span class="hljs-comment">// 1.1—1.2—1.3—2.1</span>
            : h.push(c) <span class="hljs-comment">//1.1—1.3—1.2—2.1</span>
        })
    }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g0</span>(<span class="hljs-params">resolve</span>) </span>{ setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ resolve(<span class="hljs-string">"0"</span>) }, <span class="hljs-number">100</span>) }
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g1</span>(<span class="hljs-params">v</span>) </span>{ <span class="hljs-built_in">console</span>.log(v); <span class="hljs-keyword">return</span> unit(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{ resolve(v + <span class="hljs-string">"-&gt;1"</span>) }) }
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g2</span>(<span class="hljs-params">v</span>) </span>{ <span class="hljs-built_in">console</span>.log(v); <span class="hljs-keyword">return</span> unit(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{ setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ resolve(v + <span class="hljs-string">"-&gt;2"</span>) }, <span class="hljs-number">1000</span>) }) }
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g3</span>(<span class="hljs-params">v</span>) </span>{ <span class="hljs-built_in">console</span>.log(v) }
flatMap(
    flatMap(
        flatMap(
            unit(g0)
        )(g1)
    )(g2)
)(g3)</code></pre>
</li>
</ol>
<h3 id="articleHeader9">整合代码</h3>
<p>现在将嵌套函数变回链式调用，这里也可以用是否有<code>flatMap</code>方法来判断<code>g1</code>是否返回容器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unit(ma) {
    ma.flatMap = function(g){
        var b=[], ga, h=[];
        ma(function(a) { //1. 解包`ma`取出`a`
            ga = g(a); //2. 将`a`传到`g`中执行
            (ga &amp;&amp; ga.flatMap ? ga : unit(function(c) { c(ga) })) //处理g没返回unit情况
                (function(v) {
                    b.push(v); // 1.1—1.2—1.3
                    h.map(function(c) {c(v)}) //1.1—1.3—1.2
                })
        });
        return unit(function(c) { //3. 将执行结果`b`包裹成`mb`返回
            b.length 
            ? b.map(c)  // 1.1—1.2—1.3—2.1
            : h.push(c) //1.1—1.3—1.2—2.1
        })
    }
    return ma
}
function g0(resolve) { setTimeout(function() { resolve(&quot;0&quot;) }, 100) }
function g1(v) { console.log(v); return unit(function(resolve) { resolve(v + &quot;->1&quot;) }) }
function g2(v) { console.log(v); return unit(function(resolve) { setTimeout(function() { resolve(v + &quot;->2&quot;) }, 1000) }) }
function g3(v) { console.log(v) }
unit(g0).flatMap(g1).flatMap(g2).flatMap(g3)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unit</span>(<span class="hljs-params">ma</span>) </span>{
    ma.flatMap = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">g</span>)</span>{
        <span class="hljs-keyword">var</span> b=[], ga, h=[];
        ma(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a</span>) </span>{ <span class="hljs-comment">//1. 解包`ma`取出`a`</span>
            ga = g(a); <span class="hljs-comment">//2. 将`a`传到`g`中执行</span>
            (ga &amp;&amp; ga.flatMap ? ga : unit(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{ c(ga) })) <span class="hljs-comment">//处理g没返回unit情况</span>
                (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{
                    b.push(v); <span class="hljs-comment">// 1.1—1.2—1.3</span>
                    h.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{c(v)}) <span class="hljs-comment">//1.1—1.3—1.2</span>
                })
        });
        <span class="hljs-keyword">return</span> unit(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{ <span class="hljs-comment">//3. 将执行结果`b`包裹成`mb`返回</span>
            b.length 
            ? b.map(c)  <span class="hljs-comment">// 1.1—1.2—1.3—2.1</span>
            : h.push(c) <span class="hljs-comment">//1.1—1.3—1.2—2.1</span>
        })
    }
    <span class="hljs-keyword">return</span> ma
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g0</span>(<span class="hljs-params">resolve</span>) </span>{ setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ resolve(<span class="hljs-string">"0"</span>) }, <span class="hljs-number">100</span>) }
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g1</span>(<span class="hljs-params">v</span>) </span>{ <span class="hljs-built_in">console</span>.log(v); <span class="hljs-keyword">return</span> unit(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{ resolve(v + <span class="hljs-string">"-&gt;1"</span>) }) }
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g2</span>(<span class="hljs-params">v</span>) </span>{ <span class="hljs-built_in">console</span>.log(v); <span class="hljs-keyword">return</span> unit(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{ setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ resolve(v + <span class="hljs-string">"-&gt;2"</span>) }, <span class="hljs-number">1000</span>) }) }
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g3</span>(<span class="hljs-params">v</span>) </span>{ <span class="hljs-built_in">console</span>.log(v) }
unit(g0).flatMap(g1).flatMap(g2).flatMap(g3)</code></pre>
<h2 id="articleHeader10">Promise是Monad吗？</h2>
<p>将整合代码中<code>unit</code>改成<code>newPromise</code>，<code>flatMap</code>改成<code>then</code>，哇塞，除了<code>new Promise</code>中的空格请问哪里有差？虽然改成构造函数使得<code>newPromise</code>改成<code>new Promise</code>也是分分钟的事情，但重点不是这个，重点是Promise是Monad吗？粗看是！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function newPromise(ma) {
    ma.then = function(g){
        var b=[], ga, h=[];
        ma(function(a) {
            ga = g(a);
            (ga &amp;&amp; ga.then ? ga : newPromise(function(c) { c(ga) }))
                (function(v) { b.push(v); h.map(function(c) {c(v)}) })
        });
        return newPromise(function(c) { b.length ? b.map(c) : h.push(c) })
    }
    return ma
}
newPromise(function(resolve) { setTimeout(function() { resolve(&quot;0&quot;) }, 100) })
.then(function(v) { 
    console.log(v);
    return newPromise(function(resolve) { resolve(v + &quot;->1&quot;) }) 
})
.then(function(v) { 
    console.log(v);
return newPromise(function(resolve) { setTimeout(function() { resolve(v + &quot;->2&quot;) }, 1000) })
})
.then(console.log)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">newPromise</span>(<span class="hljs-params">ma</span>) </span>{
    ma.then = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">g</span>)</span>{
        <span class="hljs-keyword">var</span> b=[], ga, h=[];
        ma(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a</span>) </span>{
            ga = g(a);
            (ga &amp;&amp; ga.then ? ga : newPromise(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{ c(ga) }))
                (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{ b.push(v); h.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{c(v)}) })
        });
        <span class="hljs-keyword">return</span> newPromise(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{ b.length ? b.map(c) : h.push(c) })
    }
    <span class="hljs-keyword">return</span> ma
}
newPromise(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{ setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ resolve(<span class="hljs-string">"0"</span>) }, <span class="hljs-number">100</span>) })
.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(v);
    <span class="hljs-keyword">return</span> newPromise(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{ resolve(v + <span class="hljs-string">"-&gt;1"</span>) }) 
})
.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(v);
<span class="hljs-keyword">return</span> newPromise(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{ setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ resolve(v + <span class="hljs-string">"-&gt;2"</span>) }, <span class="hljs-number">1000</span>) })
})
.then(<span class="hljs-built_in">console</span>.log)</code></pre>
<h3 id="articleHeader11">符合定义</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="unit :: a -> Monad a
flatMap :: Monad a -> (a -> Monad b) -> Monad b" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="haskell hljs"><code class="haskell"><span class="hljs-title">unit</span> :: a -&gt; <span class="hljs-type">Monad</span> a
<span class="hljs-title">flatMap</span> :: <span class="hljs-type">Monad</span> a -&gt; (a -&gt; <span class="hljs-type">Monad</span> b) -&gt; <span class="hljs-type">Monad</span> b</code></pre>
<p>将定义改下名</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="newPromise :: a -> Monad a
then :: Monad a -> (a -> Monad b) -> Monad b" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="haskell hljs"><code class="haskell"><span class="hljs-title">newPromise</span> :: a -&gt; <span class="hljs-type">Monad</span> a
<span class="hljs-title">then</span> :: <span class="hljs-type">Monad</span> a -&gt; (a -&gt; <span class="hljs-type">Monad</span> b) -&gt; <span class="hljs-type">Monad</span> b</code></pre>
<ol>
<li><p><code>newPromise</code>的输入是一个函数，但在推导构造<code>unit</code>里解释过，这里借助了立即量和闭包引用来额外增加了输入<code>a</code>，<code>newPromise</code>的参数则作为构造<code>unit</code>的补充逻辑。</p></li>
<li><p><code>newPromise</code>的输出是<code>a</code>的包裹<code>Monad a</code>。</p></li>
<li><p><code>newPromise</code>的方法<code>then</code>借助了闭包引用额外输入了<code>Monad a</code>，而输入的<code>g</code>函数输入是<code>a</code>输出则是借助<code>newPromise</code>实现的<code>Monad b</code>。</p></li>
<li><p><code>newPromise</code>的方法<code>then</code>输出的是借助<code>newPromise</code>实现的<code>Monad b</code>，这里和<code>g</code>的输出<code>Monad b</code>不是同一个<code>Monad</code>但是<code>b</code>确实相同的。</p></li>
</ol>
<h3 id="articleHeader12">符合法则</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="flatMap(unit(x), f) === f(x) //左单位元
flatMap(monad, unit) === monad //右单位元
flatMap(flatMap(monad, f), g) === flatMap(monad, function(x) { flatMap(f(x), g) }) //关联性" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">flatMap(unit(x), f) === f(x) <span class="hljs-comment">//左单位元</span>
flatMap(monad, unit) === monad <span class="hljs-comment">//右单位元</span>
flatMap(flatMap(monad, f), g) === flatMap(monad, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>) </span>{ flatMap(f(x), g) }) <span class="hljs-comment">//关联性</span></code></pre>
<p>将法则改下名，同时改为链式调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="newPromise(x).then(f) ==== f(x) //左单位元
monad.then(newPromise) ==== monad //右单位元
monad.then(f).then(g) ==== monad.then(function(x) { f(x).then(g) }) //关联性" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">newPromise(x).then(f) ==== f(x) <span class="hljs-comment">//左单位元</span>
monad.then(newPromise) ==== monad <span class="hljs-comment">//右单位元</span>
monad.then(f).then(g) ==== monad.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>) </span>{ f(x).then(g) }) <span class="hljs-comment">//关联性</span></code></pre>
<ol>
<li>
<p>左单位元法则验证代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function newPromise(ma) {
    ma.then = function(g){
        var b=[], ga, h=[];
        ma(function(a) {
            ga = g(a);
            (ga &amp;&amp; ga.then ? ga : newPromise(function(c) { c(ga) }))
                (function(v) { b.push(v); h.map(function(c) {c(v)}) })
        });
        return newPromise(function(c) { b.length ? b.map(c) : h.push(c) })
    }
    return ma
}
var x = 1;
var f = function(v){ return v + 2 }
newPromise(function(resolve) { resolve(x) }).then(f).then(console.log) //3
console.log(f(x)) //3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">newPromise</span>(<span class="hljs-params">ma</span>) </span>{
    ma.then = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">g</span>)</span>{
        <span class="hljs-keyword">var</span> b=[], ga, h=[];
        ma(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a</span>) </span>{
            ga = g(a);
            (ga &amp;&amp; ga.then ? ga : newPromise(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{ c(ga) }))
                (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{ b.push(v); h.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{c(v)}) })
        });
        <span class="hljs-keyword">return</span> newPromise(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{ b.length ? b.map(c) : h.push(c) })
    }
    <span class="hljs-keyword">return</span> ma
}
<span class="hljs-keyword">var</span> x = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>)</span>{ <span class="hljs-keyword">return</span> v + <span class="hljs-number">2</span> }
newPromise(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{ resolve(x) }).then(f).then(<span class="hljs-built_in">console</span>.log) <span class="hljs-comment">//3</span>
<span class="hljs-built_in">console</span>.log(f(x)) <span class="hljs-comment">//3</span></code></pre>
</li>
<li>
<p>右单位元法则验证代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function newPromise(ma) {
    ma.then = function(g){
        var b=[], ga, h=[];
        ma(function(a) {
            ga = g(a);
            (ga &amp;&amp; ga.then ? ga : newPromise(function(c) { c(ga) }))
                (function(v) { b.push(v); h.map(function(c) {c(v)}) })
        });
        return newPromise(function(c) { b.length ? b.map(c) : h.push(c) })
    }
    return ma
}
newPromise(function(resolve) { resolve(1) }).then(newPromise).then(console.log) //1
newPromise(function(resolve) { resolve(1) }).then(console.log)  //1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">newPromise</span>(<span class="hljs-params">ma</span>) </span>{
    ma.then = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">g</span>)</span>{
        <span class="hljs-keyword">var</span> b=[], ga, h=[];
        ma(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a</span>) </span>{
            ga = g(a);
            (ga &amp;&amp; ga.then ? ga : newPromise(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{ c(ga) }))
                (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{ b.push(v); h.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{c(v)}) })
        });
        <span class="hljs-keyword">return</span> newPromise(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{ b.length ? b.map(c) : h.push(c) })
    }
    <span class="hljs-keyword">return</span> ma
}
newPromise(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{ resolve(<span class="hljs-number">1</span>) }).then(newPromise).then(<span class="hljs-built_in">console</span>.log) <span class="hljs-comment">//1</span>
newPromise(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{ resolve(<span class="hljs-number">1</span>) }).then(<span class="hljs-built_in">console</span>.log)  <span class="hljs-comment">//1</span></code></pre>
</li>
<li>
<p>关联性法则验证代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function newPromise(ma) {
    ma.then = function(g){
        var b=[], ga, h=[];
        ma(function(a) {
            ga = g(a);
            (ga &amp;&amp; ga.then ? ga : newPromise(function(c) { c(ga) }))
                (function(v) { b.push(v); h.map(function(c) {c(v)}) })
        });
        return newPromise(function(c) { b.length ? b.map(c) : h.push(c) })
    }
    return ma
}
var f = function(v) { return newPromise(function(resolve) { resolve(v+2) }) }
var g = function(v) { return newPromise(function(resolve) { resolve(v+3) }) }
newPromise(function(resolve) { resolve(1) }).then(f).then(g).then(console.log) //6
newPromise(function(resolve) { resolve(1) }).then(function(x) { return f(x).then(g) }).then(console.log)  //6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">newPromise</span>(<span class="hljs-params">ma</span>) </span>{
    ma.then = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">g</span>)</span>{
        <span class="hljs-keyword">var</span> b=[], ga, h=[];
        ma(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a</span>) </span>{
            ga = g(a);
            (ga &amp;&amp; ga.then ? ga : newPromise(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{ c(ga) }))
                (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{ b.push(v); h.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{c(v)}) })
        });
        <span class="hljs-keyword">return</span> newPromise(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{ b.length ? b.map(c) : h.push(c) })
    }
    <span class="hljs-keyword">return</span> ma
}
<span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{ <span class="hljs-keyword">return</span> newPromise(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{ resolve(v+<span class="hljs-number">2</span>) }) }
<span class="hljs-keyword">var</span> g = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{ <span class="hljs-keyword">return</span> newPromise(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{ resolve(v+<span class="hljs-number">3</span>) }) }
newPromise(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{ resolve(<span class="hljs-number">1</span>) }).then(f).then(g).then(<span class="hljs-built_in">console</span>.log) <span class="hljs-comment">//6</span>
newPromise(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{ resolve(<span class="hljs-number">1</span>) }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>) </span>{ <span class="hljs-keyword">return</span> f(x).then(g) }).then(<span class="hljs-built_in">console</span>.log)  <span class="hljs-comment">//6</span></code></pre>
</li>
</ol>
<h3 id="articleHeader13">如此，原来Promise是这样的Monad！</h3>
<h2 id="articleHeader14">参考</h2>
<ul>
<li><p><a href="http://planspace.org/20150125-monads_by_diagram/" rel="nofollow noreferrer" target="_blank">Monads by Diagram</a></p></li>
<li><p><a href="https://gist.github.com/newswim/4668aef8a1f1bc0dabe8" rel="nofollow noreferrer" target="_blank">Monads and Gonads</a><button class="btn btn-xs btn-default ml10 preview" data-url="newswim/4668aef8a1f1bc0dabe8" data-typeid="1">点击预览</button></p></li>
<li><p><a href="https://wiki.haskell.org/Monad_laws" rel="nofollow noreferrer" target="_blank">Monad laws</a></p></li>
<li><p><a href="http://learnyouahaskell.com/a-fistful-of-monads" rel="nofollow noreferrer" target="_blank">A Fistful of Monads</a></p></li>
<li><p><a href="https://medium.com/%40tzehsiang/javascript-functor-applicative-monads-in-pictures-b567c6415221#.rl7zfo6ty" rel="nofollow noreferrer" target="_blank">Javascript Functor, Applicative, Monads in pictures</a></p></li>
<li><p><a href="https://buzzdecafe.github.io/code/2014/10/26/functors-and-applicatives" rel="nofollow noreferrer" target="_blank">Functors and Applicatives</a></p></li>
<li><p><a href="https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch8.html" rel="nofollow noreferrer" target="_blank">JS函数式编程指南</a></p></li>
<li><p><a href="https://blog.jcoglan.com/2011/03/05/translation-from-haskell-to-javascript-of-selected-portions-of-the-best-introduction-to-monads-ive-ever-read/" rel="nofollow noreferrer" target="_blank">Translation from Haskell to JavaScript of selected portions of the best introduction to monads I’ve ever read</a></p></li>
<li><p><a href="http://blog.ezyang.com/2010/07/flipping-arrows-in-coburger-king/" rel="nofollow noreferrer" target="_blank">Flipping arrows in coBurger King</a></p></li>
<li><p><a href="https://gilmoretj.wordpress.com/other-subjects/my-angle-on-monads/" rel="nofollow noreferrer" target="_blank">My angle on MonadsBackground</a></p></li>
<li><p><a href="https://www.slideshare.net/wicherrr/awesomely-descriptive-javascript-with-monads" rel="nofollow noreferrer" target="_blank">Awesomely descriptive JavaScript with monads</a></p></li>
<li><p><a href="https://curiosity-driven.org/monads-in-javascript" rel="nofollow noreferrer" target="_blank">Monads in JavaScript</a></p></li>
<li><p><a href="https://www.zhihu.com/question/24972880" rel="nofollow noreferrer" target="_blank">怎样用简单的语言解释 monad？</a></p></li>
<li><p><a href="https://www.zhihu.com/question/22291305" rel="nofollow noreferrer" target="_blank">如何解释 Haskell 中的单子？</a></p></li>
<li><p><a href="http://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call" rel="nofollow noreferrer" target="_blank">How do I return the response from an asynchronous call?</a></p></li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" rel="nofollow noreferrer" target="_blank">Promise</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
函数式JS: 原来promise是这样的monad

## 原文链接
[https://segmentfault.com/a/1190000008850740](https://segmentfault.com/a/1190000008850740)

