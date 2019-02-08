---
title: 'jquery高级应用之Deferred对象' 
date: 2019-02-09 2:30:59
hidden: true
slug: 1hjmt2k1wlo
categories: [reprint]
---

{{< raw >}}

                    
<p>在实际开发中常常遇到这样的问题：B函数中需要用到的变量或者参数，只有等A函数执行完毕了才能获取到。比如A函数中有一个ajax请求，而B函数中所需要的<code>position</code>变量需要在A函数中ajax请求完成才能得到它的准确值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function A() {
    $.ajax({
        url: '/api/test',
        type: 'POST',
        data: {...},
        success: function(res) {
            position = res.position;
        }
    })
}

function B() {
    $('.test').text(position);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params"></span>) </span>{
    $.ajax({
        <span class="hljs-attr">url</span>: <span class="hljs-string">'/api/test'</span>,
        <span class="hljs-attr">type</span>: <span class="hljs-string">'POST'</span>,
        <span class="hljs-attr">data</span>: {...},
        <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
            position = res.position;
        }
    })
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">B</span>(<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'.test'</span>).text(position);
}</code></pre>
<p>JavaScript的异步模式让B函数不会等待A函数计算出了<code>position</code>的值才会执行，它会不等待A函数的结果而直接开始执行，这样就会造成<code>position</code>无法正确赋值。为了解决这个问题，我们很容易想到使用回调函数，这也是最常用的方法之一</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function A(callback) {
    $.ajax({
        url: '/api/test',
        type: 'POST',
        data: {...},
        success: function(res) {
            position = res.position;
            callback &amp;&amp; callback();
        }
    })
}

function B() {
    $('.test').text(position);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params">callback</span>) </span>{
    $.ajax({
        <span class="hljs-attr">url</span>: <span class="hljs-string">'/api/test'</span>,
        <span class="hljs-attr">type</span>: <span class="hljs-string">'POST'</span>,
        <span class="hljs-attr">data</span>: {...},
        <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
            position = res.position;
            callback &amp;&amp; callback();
        }
    })
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">B</span>(<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'.test'</span>).text(position);
}</code></pre>
<p>A函数有了回调之后，就可以将B函数当做回调函数传递给A</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="A(B);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">A(B);</code></pre>
<p>可是如果这个时候，还有一个C函数，依赖于B的执行结果呢，后面甚至有可能出现一个D函数，依赖于C的结果！又如我们常用的ajax，成功了会有一个回调函数，失败了还有一个回调函数，面对这样复杂的情况，我们应该怎么样处理？虽然使用回调函数依然能够搞定这些烦人的难题，但是很显然这并不是一个好的解决办法。</p>
<p>jquery中的<code>Deferred</code>对象很好的解决了这个问题。在了解<code>Deferred</code>之前，我们可能需要了解一个JavaScript中的<code>promise</code>模式。当我们使用回调来解决实际中的问题时，很容易不知不觉中出现<strong>代码金字塔</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="step1(function() {
    step2(function() {
        step3(function() {
            step4(function() {
                step5();
            })
        })
    })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">step1(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    step2(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        step3(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            step4(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                step5();
            })
        })
    })
})</code></pre>
<p>假如这个时候有一个js库实现了promise模式，那么我们的代码就会变得清晰可读，并且每一步都会等待上一步执行完毕了才会执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise().when(promiseStep1)
    .then(promiseStep2)
    .then(promiseStep3)
    .then(promiseStep4)
    .then(promiseStep5);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>().when(promiseStep1)
    .then(promiseStep2)
    .then(promiseStep3)
    .then(promiseStep4)
    .then(promiseStep5);</code></pre>
<p>每一个promise对象都可以设置三种状态：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pending  [进行中]
resolve  [已经正确执行]
reject   [执行失败]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">pending  [进行中]
resolve  [已经正确执行]
reject   [执行失败]</code></pre>
<p>关于promise，还有更多需要了解的地方，我这里只是抛砖引玉。回到jQuery的Deferred对象来。jquery的Deferred对象就是对promise模式的一个很好的实现案例。我们通过一个简单的例子来看看Deferred对象应该如何使用。</p>
<p>函数<code>first</code>是一个耗时两秒的操作，而函数<code>second</code>是一个简单的函数，但是他需要在<code>first</code>执行完毕之后才执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function first() {
    setTimeout(function() {
        console.log('first');
    }, 2000);
}
function second() {
    console.log('second');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">first</span>(<span class="hljs-params"></span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'first'</span>);
    }, <span class="hljs-number">2000</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">second</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'second'</span>);
}</code></pre>
<p>为了达到second在first之后执行，使用Deferred对first函数做一个简单的处理即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function first() {
    // 1
    var defer = $.Deferred();
    setTimeout(function() {
        console.log('first');
        // 2
        defer.resolve();
    }, 2000);
    
    // 3
    return defer.promise();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">first</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 1</span>
    <span class="hljs-keyword">var</span> defer = $.Deferred();
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'first'</span>);
        <span class="hljs-comment">// 2</span>
        defer.resolve();
    }, <span class="hljs-number">2000</span>);
    
    <span class="hljs-comment">// 3</span>
    <span class="hljs-keyword">return</span> defer.promise();
}</code></pre>
<p>1、在函数中声明一个Deferred对象，这样在外部就无法修改函数内部的执行状态<br>2、函数执行完毕，设置执行状态，如果成功执行，<code>defer.resolve()</code>，如果执行失败，则设置为<code>defer.reject()</code><br>3、在函数的最后，必须将deferred对象返回出去，否则外部无法得到函数的执行结果</p>
<p>在做了这样的处理之后，我们就可以满足要求的正常使用了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.when(first())
 .done(second());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$.when(first())
 .done(second());</code></pre>
<p>jquery中，ajax方法就是使用promise模式完成的，我们可以看看常规写法和Deferred对象写法的不同。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 常规写法
 $.ajax({
     url: '/api/test',
     type: 'POST',
     data: {...},
     success: function(res) {
         // dosomething
     },
     fail: function(res) {
         // dosomething
     },
     complete: function() {
         // dosomething
     }
 })

// 新的写法
$.ajax({
     url: '/api/test',
     type: 'POST',
     ...
 })
 .done(function(res) {
     // success and do something
 })
 .fail(function(res) {
     // fail and do something
 })
 .always(function() {})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 常规写法</span>
 $.ajax({
     <span class="hljs-attr">url</span>: <span class="hljs-string">'/api/test'</span>,
     <span class="hljs-attr">type</span>: <span class="hljs-string">'POST'</span>,
     <span class="hljs-attr">data</span>: {...},
     <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
         <span class="hljs-comment">// dosomething</span>
     },
     <span class="hljs-attr">fail</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
         <span class="hljs-comment">// dosomething</span>
     },
     <span class="hljs-attr">complete</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
         <span class="hljs-comment">// dosomething</span>
     }
 })

<span class="hljs-comment">// 新的写法</span>
$.ajax({
     <span class="hljs-attr">url</span>: <span class="hljs-string">'/api/test'</span>,
     <span class="hljs-attr">type</span>: <span class="hljs-string">'POST'</span>,
     ...
 })
 .done(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
     <span class="hljs-comment">// success and do something</span>
 })
 .fail(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
     <span class="hljs-comment">// fail and do something</span>
 })
 .always(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{})</code></pre>
<p>这个知识点差不多就总结完毕了。Promise模式与Deferred对象都还有更多值得了解知识点与用法，这是一个非常值得掌握的神兵利器，建议大家搜索更多的文章来学习它。</p>
<p><span class="img-wrap"><img data-src="/img/bV0emY?w=800&amp;h=300" src="https://static.alili.tech/img/bV0emY?w=800&amp;h=300" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jquery高级应用之Deferred对象

## 原文链接
[https://segmentfault.com/a/1190000005607968](https://segmentfault.com/a/1190000005607968)

