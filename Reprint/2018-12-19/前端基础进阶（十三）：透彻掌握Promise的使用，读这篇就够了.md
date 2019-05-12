---
title: '前端基础进阶（十三）：透彻掌握Promise的使用，读这篇就够了' 
date: 2018-12-19 2:30:08
hidden: true
slug: xbyfgz1o1z8
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000008932857" src="https://static.alili.tech/img/remote/1460000008932857" alt="Promise：高手必备" title="Promise：高手必备" style="cursor: pointer; display: inline;"></span></p>
<p>Promise的重要性我认为我没有必要多讲，概括起来说就是必须得掌握，而且还要掌握透彻。这篇文章的开头，主要跟大家分析一下，为什么会有Promise出现。</p>
<p>在实际的使用当中，有非常多的应用场景我们不能立即知道应该如何继续往下执行。最重要也是最主要的一个场景就是ajax请求。通俗来说，由于网速的不同，可能你得到返回值的时间也是不同的，这个时候我们就需要等待，结果出来了之后才知道怎么样继续下去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 简单的ajax原生实现
var url = 'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-02-26/2017-06-10';
var result;

var XHR = new XMLHttpRequest();
XHR.open('GET', url, true);
XHR.send();

XHR.onreadystatechange = function() {
    if (XHR.readyState == 4 &amp;&amp; XHR.status == 200) {
        result = XHR.response;
        console.log(result);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">// 简单的ajax原生实现</span>
<span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = <span class="hljs-string">'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-02-26/2017-06-10'</span>;
<span class="hljs-built_in">var</span> result;

<span class="hljs-built_in">var</span> XHR = <span class="hljs-keyword">new</span> XMLHttpRequest();
XHR.open(<span class="hljs-string">'GET'</span>, <span class="hljs-built_in">url</span>, <span class="hljs-literal">true</span>);
XHR.send();

XHR.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (XHR.readyState == <span class="hljs-number">4</span> &amp;&amp; XHR.status == <span class="hljs-number">200</span>) {
        result = XHR.response;
        <span class="hljs-built_in">console</span>.log(result);
    }
}</code></pre>
<p>在ajax的原生实现中，利用了onreadystatechange事件，当该事件触发并且符合一定条件时，才能拿到我们想要的数据，之后我们才能开始处理数据。</p>
<p>这样做看上去并没有什么麻烦，但是如果这个时候，我们还需要做另外一个ajax请求，这个新的ajax请求的其中一个参数，得从上一个ajax请求中获取，这个时候我们就不得不如下这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var url = 'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-02-26/2017-06-10';
var result;

var XHR = new XMLHttpRequest();
XHR.open('GET', url, true);
XHR.send();

XHR.onreadystatechange = function() {
    if (XHR.readyState == 4 &amp;&amp; XHR.status == 200) {
        result = XHR.response;
        console.log(result);

        // 伪代码
        var url2 = 'http:xxx.yyy.com/zzz?ddd=' + result.someParams;
        var XHR2 = new XMLHttpRequest();
        XHR2.open('GET', url, true);
        XHR2.send();
        XHR2.onreadystatechange = function() {
            ...
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = <span class="hljs-string">'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-02-26/2017-06-10'</span>;
<span class="hljs-built_in">var</span> result;

<span class="hljs-built_in">var</span> XHR = <span class="hljs-keyword">new</span> XMLHttpRequest();
XHR.open(<span class="hljs-string">'GET'</span>, <span class="hljs-built_in">url</span>, <span class="hljs-literal">true</span>);
XHR.send();

XHR.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (XHR.readyState == <span class="hljs-number">4</span> &amp;&amp; XHR.status == <span class="hljs-number">200</span>) {
        result = XHR.response;
        <span class="hljs-built_in">console</span>.log(result);

        <span class="hljs-comment">// 伪代码</span>
        <span class="hljs-built_in">var</span> url2 = <span class="hljs-string">'http:xxx.yyy.com/zzz?ddd='</span> + result.someParams;
        <span class="hljs-built_in">var</span> XHR2 = <span class="hljs-keyword">new</span> XMLHttpRequest();
        XHR2.open(<span class="hljs-string">'GET'</span>, <span class="hljs-built_in">url</span>, <span class="hljs-literal">true</span>);
        XHR2.send();
        XHR2.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            ...
        }
    }
}</code></pre>
<p>当出现第三个ajax(甚至更多)仍然依赖上一个请求的时候，我们的代码就变成了一场灾难。这场灾难，往往也被称为<strong>回调地狱</strong>。</p>
<p>因此我们需要一个叫做Promise的东西，来解决这个问题。</p>
<p>当然，除了回调地狱之外，还有一个非常重要的需求：<strong>为了我们的代码更加具有可读性和可维护性，我们需要将数据请求与数据处理明确的区分开来</strong>。上面的写法，是完全没有区分开，当数据变得复杂时，也许我们自己都无法轻松维护自己的代码了。这也是模块化过程中，必须要掌握的一个重要技能，请一定重视。</p>
<p>从前面几篇文中的知识我们可以知道，当我们想要确保某代码在谁谁之后执行时，我们可以利用函数调用栈，将我们想要执行的代码放入回调函数中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 一个简单的封装
function want() {
    console.log('这是你想要执行的代码');
}

function fn(want) {
    console.log('这里表示执行了一大堆各种代码');

    // 其他代码执行完毕，最后执行回调函数
    want &amp;&amp; want();
}

fn(want);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 一个简单的封装</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">want</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'这是你想要执行的代码'</span>);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">want</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'这里表示执行了一大堆各种代码'</span>);

    <span class="hljs-comment">// 其他代码执行完毕，最后执行回调函数</span>
    want &amp;&amp; want();
}

fn(want);</code></pre>
<p>利用回调函数封装，是我们在初学JavaScript时常常会使用的技能。</p>
<p>确保我们想要的代码压后执行，除了利用函数调用栈的执行顺序之外，我们还可以利用上一篇文章所述的队列机制。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function want() {
    console.log('这是你想要执行的代码');
}

function fn(want) {
    // 将想要执行的代码放入队列中，根据事件循环的机制，我们就不用非得将它放到最后面了，由你自由选择
    want &amp;&amp; setTimeout(want, 0);
    console.log('这里表示执行了一大堆各种代码');
}

fn(want);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">want</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'这是你想要执行的代码'</span>);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">want</span>) </span>{
    <span class="hljs-comment">// 将想要执行的代码放入队列中，根据事件循环的机制，我们就不用非得将它放到最后面了，由你自由选择</span>
    want &amp;&amp; setTimeout(want, <span class="hljs-number">0</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'这里表示执行了一大堆各种代码'</span>);
}

fn(want);</code></pre>
<p>如果浏览器已经支持了原生的Promise对象，那么我们就知道，浏览器的js引擎里已经有了Promise队列，这样就可以利用Promise将任务放在它的队列中去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function want() {
    console.log('这是你想要执行的代码');
}

function fn(want) {
    console.log('这里表示执行了一大堆各种代码');

    // 返回Promise对象
    return new Promise(function(resolve, reject) {
        if (typeof want == 'function') {
            resolve(want);
        } else {
            reject('TypeError: '+ want +'不是一个函数')
        }
    })
}

fn(want).then(function(want) {
    want();
})

fn('1234').catch(function(err) {
    console.log(err);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">want</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'这是你想要执行的代码'</span>);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">want</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'这里表示执行了一大堆各种代码'</span>);

    <span class="hljs-comment">// 返回Promise对象</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> want == <span class="hljs-string">'function'</span>) {
            resolve(want);
        } <span class="hljs-keyword">else</span> {
            reject(<span class="hljs-string">'TypeError: '</span>+ want +<span class="hljs-string">'不是一个函数'</span>)
        }
    })
}

fn(want).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">want</span>) </span>{
    want();
})

fn(<span class="hljs-string">'1234'</span>).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
    <span class="hljs-built_in">console</span>.log(err);
})</code></pre>
<p>看上去变得更加复杂了。可是代码变得更加健壮，处理了错误输入的情况。</p>
<p>为了更好的往下扩展Promise的应用，这里需要先跟大家介绍一下Promsie的基础知识。</p>
<p>一、 Promise对象有三种状态，他们分别是：</p>
<ul>
<li>pending: 等待中，或者进行中，表示还没有得到结果</li>
<li>resolved(Fulfilled): 已经完成，表示得到了我们想要的结果，可以继续往下执行</li>
<li>rejected: 也表示得到结果，但是由于结果并非我们所愿，因此拒绝执行</li>
</ul>
<p>这三种状态不受外界影响，而且状态只能从pending改变为resolved或者rejected，并且不可逆。在Promise对象的构造函数中，将一个函数作为第一个参数。而这个函数，就是用来处理Promise的状态变化。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise(function(resolve, reject) {
    if(true) { resolve() };
    if(false) { reject() };
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>new Promise(<span class="hljs-name">function</span>(<span class="hljs-name">resolve</span>, reject) {
    if(<span class="hljs-name">true</span>) { resolve() }<span class="hljs-comment">;</span>
    if(<span class="hljs-name">false</span>) { reject() }<span class="hljs-comment">;</span>
})</code></pre>
<p>上面的resolve和reject都为一个函数，他们的作用分别是将状态修改为resolved和rejected。</p>
<p>二、 Promise对象中的then方法，可以接收构造函数中处理的状态变化，并分别对应执行。then方法有2个参数，第一个函数接收resolved状态的执行，第二个参数接收reject状态的执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn(num) {
    return new Promise(function(resolve, reject) {
        if (typeof num == 'number') {
            resolve();
        } else {
            reject();
        }
    }).then(function() {
        console.log('参数是一个number值');
    }, function() {
        console.log('参数不是一个number值');
    })
}

fn('hahha');
fn(1234);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">num</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> num == <span class="hljs-string">'number'</span>) {
            resolve();
        } <span class="hljs-keyword">else</span> {
            reject();
        }
    }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'参数是一个number值'</span>);
    }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'参数不是一个number值'</span>);
    })
}

fn(<span class="hljs-string">'hahha'</span>);
fn(<span class="hljs-number">1234</span>);</code></pre>
<p>then方法的执行结果也会返回一个Promise对象。因此我们可以进行then的链式执行，这也是解决回调地狱的主要方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn(num) {
    return new Promise(function(resolve, reject) {
        if (typeof num == 'number') {
            resolve();
        } else {
            reject();
        }
    })
    .then(function() {
        console.log('参数是一个number值');
    })
    .then(null, function() {
        console.log('参数不是一个number值');
    })
}

fn('hahha');
fn(1234);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">num</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> num == <span class="hljs-string">'number'</span>) {
            resolve();
        } <span class="hljs-keyword">else</span> {
            reject();
        }
    })
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'参数是一个number值'</span>);
    })
    .then(<span class="hljs-literal">null</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'参数不是一个number值'</span>);
    })
}

fn(<span class="hljs-string">'hahha'</span>);
fn(<span class="hljs-number">1234</span>);</code></pre>
<blockquote>then(null, function() {}) 就等同于catch(function() {})</blockquote>
<p>三、Promise中的数据传递</p>
<p>大家自行从下面的例子中领悟吧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fn = function(num) {
    return new Promise(function(resolve, reject) {
        if (typeof num == 'number') {
            resolve(num);
        } else {
            reject('TypeError');
        }
    })
}

fn(2).then(function(num) {
    console.log('first: ' + num);
    return num + 1;
})
.then(function(num) {
    console.log('second: ' + num);
    return num + 1;
})
.then(function(num) {
    console.log('third: ' + num);
    return num + 1;
});

// 输出结果
first: 2
second: 3
third: 4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> fn = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">num</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> num == <span class="hljs-string">'number'</span>) {
            resolve(num);
        } <span class="hljs-keyword">else</span> {
            reject(<span class="hljs-string">'TypeError'</span>);
        }
    })
}

fn(<span class="hljs-number">2</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">num</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'first: '</span> + num);
    <span class="hljs-keyword">return</span> num + <span class="hljs-number">1</span>;
})
.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">num</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'second: '</span> + num);
    <span class="hljs-keyword">return</span> num + <span class="hljs-number">1</span>;
})
.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">num</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'third: '</span> + num);
    <span class="hljs-keyword">return</span> num + <span class="hljs-number">1</span>;
});

<span class="hljs-comment">// 输出结果</span>
first: <span class="hljs-number">2</span>
second: <span class="hljs-number">3</span>
third: <span class="hljs-number">4</span></code></pre>
<p>OK，了解了这些基础知识之后，我们再回过头，利用Promise的知识，对最开始的ajax的例子进行一个简单的封装。看看会是什么样子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var url = 'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-02-26/2017-06-10';

// 封装一个get请求的方法
function getJSON(url) {
    return new Promise(function(resolve, reject) {
        var XHR = new XMLHttpRequest();
        XHR.open('GET', url, true);
        XHR.send();

        XHR.onreadystatechange = function() {
            if (XHR.readyState == 4) {
                if (XHR.status == 200) {
                    try {
                        var response = JSON.parse(XHR.responseText);
                        resolve(response);
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(new Error(XHR.statusText));
                }
            }
        }
    })
}

getJSON(url).then(resp => console.log(resp));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> url = <span class="hljs-string">'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-02-26/2017-06-10'</span>;

<span class="hljs-comment">// 封装一个get请求的方法</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getJSON</span>(<span class="hljs-params">url</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        <span class="hljs-keyword">var</span> XHR = <span class="hljs-keyword">new</span> XMLHttpRequest();
        XHR.open(<span class="hljs-string">'GET'</span>, url, <span class="hljs-literal">true</span>);
        XHR.send();

        XHR.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span> (XHR.readyState == <span class="hljs-number">4</span>) {
                <span class="hljs-keyword">if</span> (XHR.status == <span class="hljs-number">200</span>) {
                    <span class="hljs-keyword">try</span> {
                        <span class="hljs-keyword">var</span> response = <span class="hljs-built_in">JSON</span>.parse(XHR.responseText);
                        resolve(response);
                    } <span class="hljs-keyword">catch</span> (e) {
                        reject(e);
                    }
                } <span class="hljs-keyword">else</span> {
                    reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(XHR.statusText));
                }
            }
        }
    })
}

getJSON(url).then(<span class="hljs-function"><span class="hljs-params">resp</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(resp));</code></pre>
<p>为了健壮性，处理了很多可能出现的异常，总之，就是正确的返回结果，就resolve一下，错误的返回结果，就reject一下。并且利用上面的参数传递的方式，将正确结果或者错误信息通过他们的参数传递出来。</p>
<blockquote>现在所有的库几乎都将ajax请求利用Promise进行了封装，因此我们在使用jQuery等库中的ajax请求时，都可以利用Promise来让我们的代码更加优雅和简单。这也是Promise最常用的一个场景，因此我们一定要非常非常熟悉它，这样才能在应用的时候更加灵活。</blockquote>
<p>四、Promise.all</p>
<p>当有一个ajax请求，它的参数需要另外2个甚至更多请求都有返回结果之后才能确定，那么这个时候，就需要用到Promise.all来帮助我们应对这个场景。</p>
<p>Promise.all接收一个Promise对象组成的数组作为参数，当这个数组所有的Promise对象状态都变成resolved或者rejected的时候，它才会去调用then方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var url = 'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-02-26/2017-06-10';
var url1 = 'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-03-26/2017-06-10';

function renderAll() {
    return Promise.all([getJSON(url), getJSON(url1)]);
}

renderAll().then(function(value) {
    // 建议大家在浏览器中看看这里的value值
    console.log(value);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = <span class="hljs-string">'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-02-26/2017-06-10'</span>;
<span class="hljs-built_in">var</span> url1 = <span class="hljs-string">'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-03-26/2017-06-10'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">renderAll</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> Promise.all([getJSON(<span class="hljs-built_in">url</span>), getJSON(url1)]);
}

renderAll().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-comment">// 建议大家在浏览器中看看这里的value值</span>
    <span class="hljs-built_in">console</span>.log(value);
})</code></pre>
<p>五、 Promise.race</p>
<p>与Promise.all相似的是，Promise.race都是以一个Promise对象组成的数组作为参数，不同的是，只要当数组中的其中一个Promsie状态变成resolved或者rejected时，就可以调用.then方法了。而传递给then方法的值也会有所不同，大家可以再浏览器中运行下面的例子与上面的例子进行对比。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function renderRace() {
    return Promise.race([getJSON(url), getJSON(url1)]);
}

renderRace().then(function(value) {
    console.log(value);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code><span class="hljs-function"><span class="hljs-keyword">function</span></span> renderRace() {
    <span class="hljs-keyword">return</span> Promise.race([getJSON(url), getJSON(url1)]);
}

renderRace().<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span></span> {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">value</span>);
})</code></pre>
<p>嗯，我所知道的，关于Promise的基础知识就这些了，如果还有别的，欢迎大家补充。</p>
<p>那么接下来，我们要结合三个不同的应用场景来让大家感受一下Promise在模块系统中如何使用。</p>
<blockquote>这里选择requirejs是因为学习成本最低，能够快速上手进行简单的运用。接下来的这些例子，会涉及到很多其他的知识，因此如果想要彻底掌握，一定要动手实践，自己试着完成一遍。<p>我在github上创建了对应的项目，大家可以直接clone下来进行学习。这样学习效果会更好。</p>
<p>项目地址： <a href="https://github.com/yangbo5207/promiseApps" rel="nofollow noreferrer" target="_blank">https://github.com/yangbo5207...</a></p>
</blockquote>
<blockquote>往下阅读例子之前，请一定要对requirejs有一个简单的了解。<p>requirejs中文文档 <a href="http://www.requirejs.cn/" rel="nofollow noreferrer" target="_blank">http://www.requirejs.cn/</a></p>
</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008932858" src="https://static.alili.tech/img/remote/1460000008932858" alt="代码结构" title="代码结构" style="cursor: pointer;"></span></p>
<p>项目的代码结果如上图所示，所有的html文件都放在根目录下。</p>
<ul>
<li>pages: html直接引入的js</li>
<li>libs: 常用的库</li>
<li>components: 针对项目自定义的模块</li>
</ul>
<p>首先为了能够让require起作用，我们需要在html中引入require.js，写法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js为入口文件
<script data-main=&quot;./pages/index.js&quot; src=&quot;./libs/require.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// index.js为入口文件
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">data-main</span>=<span class="hljs-string">"./pages/index.js"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./libs/require.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>在入口的index.js中，我们可以对常用的模块进行映射配置，这样在引入时就可以少写一些代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 具体的配置项的含义，请参阅require的中文文档
requirejs.config({
    baseUrl: './',
    paths: {
        jquery: &quot;./libs/jquery-3.2.0&quot;,
        API: './libs/API',
        request: './libs/request',
        calendar: './components/calendar',
        imageCenter: './components/imageCenter',
        dialog: './components/Dialog'
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// 具体的配置项的含义，请参阅require的中文文档</span>
<span class="hljs-selector-tag">requirejs</span><span class="hljs-selector-class">.config</span>({
    <span class="hljs-attribute">baseUrl</span>: <span class="hljs-string">'./'</span>,
    <span class="hljs-attribute">paths</span>: {
        <span class="hljs-attribute">jquery</span>: <span class="hljs-string">"./libs/jquery-3.2.0"</span>,
        <span class="hljs-attribute">API</span>: <span class="hljs-string">'./libs/API'</span>,
        <span class="hljs-attribute">request</span>: <span class="hljs-string">'./libs/request'</span>,
        <span class="hljs-attribute">calendar</span>: <span class="hljs-string">'./components/calendar'</span>,
        <span class="hljs-attribute">imageCenter</span>: <span class="hljs-string">'./components/imageCenter'</span>,
        <span class="hljs-attribute">dialog</span>: <span class="hljs-string">'./components/Dialog'</span>
    }
})</code></pre>
<p>配置之后，那么我们在其他模块中，引入配置过的模块，就可以简单的这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var $ = require('jquery');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code style="word-break: break-word; white-space: initial;">var $ = <span class="hljs-keyword">require</span>(<span class="hljs-string">'jquery'</span>);</code></pre>
<p>如果不进行配置，也可以这样引入模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('./components/button');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/button'</span>);</code></pre>
<p>我们可以使用define定义一个模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 其他方式请参阅文档
define(function(require) {

})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 其他方式请参阅文档</span>
define(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(require)</span> </span>{

})
</code></pre>
<p>使用return可以直接对外提供方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在其他模块通过require引入时得到的值，就是这里返回的值
define(function(require) {
    return {
        a: 1
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 在其他模块通过require引入时得到的值，就是这里返回的值</span>
<span class="hljs-function"><span class="hljs-title">define</span><span class="hljs-params">(function(require)</span></span> {
    return {
        <span class="hljs-selector-tag">a</span>: <span class="hljs-number">1</span>
    }
})</code></pre>
<p>OK，了解上面这些，应付基础的使用已经没有问题了。我们接下来重点总结第一个常用的应用场景：ajax。</p>
<p>关于ajax的简单使用和简单封装，我们在上面都已经讲过了，这里就不再多说，直接使用jquery封装好的方法即可。而我们需要处理的问题在于，如何有效的将ajax的数据请求和数据处理分别放在不同的模块中进行管理，这样做的主要目的在于降低后期维护成本，便于管理。</p>
<p>来看看怎么样简单操作的。</p>
<p>首先，将所有的url放在一个模块中统一处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// libs/API.js
define(function() {
    return {
        dayInfo: 'https://hq.tigerbrokers.com/fundamental/finance_calendar/get_day/2017-04-03',
        typeInfo: 'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-03-26/2017-04-15'
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// libs/API.js</span>
define(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> {
        dayInfo: <span class="hljs-string">'https://hq.tigerbrokers.com/fundamental/finance_calendar/get_day/2017-04-03'</span>,
        typeInfo: <span class="hljs-string">'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-03-26/2017-04-15'</span>
    }
})</code></pre>
<p>在实际开发中，url并不是直接通过字符串就能直接确认的，某些url还需要通过参数拼接等，这个时候需要我们灵活处理。</p>
<p>第二步，将所有的数据请求这个动作放在同一个模块中统一管理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// libs/request.js
define(function(require) {
    var API = require('API');

    // 因为jQuery中的get方法也是通过Promise进行了封装，最终返回的是一个Promise对象，因此这样我们就可以将数据请求与数据处理放在不同的模块
    // 这样我们就可以使用一个统一的模块来管理所有的数据请求

    // 获取当天的信息
    getDayInfo = function() {
        return $.get(API.dayInfo);
    }

    // 获取type信息
    getTypeInfo = function() {
        return $.get(API.typeInfo);
    };

    return {
        getDayInfo: getDayInfo,
        getTypeInfo: getTypeInfo
    }
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// libs/request.js</span>
define(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require</span>) </span>{
    <span class="hljs-keyword">var</span> API = <span class="hljs-built_in">require</span>(<span class="hljs-string">'API'</span>);

    <span class="hljs-comment">// 因为jQuery中的get方法也是通过Promise进行了封装，最终返回的是一个Promise对象，因此这样我们就可以将数据请求与数据处理放在不同的模块</span>
    <span class="hljs-comment">// 这样我们就可以使用一个统一的模块来管理所有的数据请求</span>

    <span class="hljs-comment">// 获取当天的信息</span>
    getDayInfo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> $.get(API.dayInfo);
    }

    <span class="hljs-comment">// 获取type信息</span>
    getTypeInfo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> $.get(API.typeInfo);
    };

    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">getDayInfo</span>: getDayInfo,
        <span class="hljs-attr">getTypeInfo</span>: getTypeInfo
    }
});
</code></pre>
<p>在这个模块中，我们还可以对拿到的数据进行一些你需要的过滤处理，确保最终返回给下一个模块的数据是能够直接使用的。</p>
<p>第三步：就是拿到数据并且处理数据了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// components/calendar.js
define(function(require) {
    var request = require('request');

    // 拿到数据之后，需要处理的组件，可以根据数据渲染出需求想要的样式
    // 当然这里为了简化，就仅仅只是输出数据就行了，在实际中，拿到数据之后还要进行相应的处理

    request.getTypeInfo()
        .then(function(resp) {

            // 拿到数据，并执行处理操作
            console.log(resp);
        })

    // 这样，我们就把请求数据，与处理数据分离开来，维护起来就更加方便了，代码结构也足够清晰
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// components/calendar.js</span>
define(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require</span>) </span>{
    <span class="hljs-keyword">var</span> request = <span class="hljs-built_in">require</span>(<span class="hljs-string">'request'</span>);

    <span class="hljs-comment">// 拿到数据之后，需要处理的组件，可以根据数据渲染出需求想要的样式</span>
    <span class="hljs-comment">// 当然这里为了简化，就仅仅只是输出数据就行了，在实际中，拿到数据之后还要进行相应的处理</span>

    request.getTypeInfo()
        .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resp</span>) </span>{

            <span class="hljs-comment">// 拿到数据，并执行处理操作</span>
            <span class="hljs-built_in">console</span>.log(resp);
        })

    <span class="hljs-comment">// 这样，我们就把请求数据，与处理数据分离开来，维护起来就更加方便了，代码结构也足够清晰</span>
})</code></pre>
<p>这就是我所了解的处理ajax的比较好的一个方式，如果你有其他更好的方式也欢迎分享。</p>
<p>第二个应用场景就是图片加载的问题。<br>在一些实际应用中，常常会有一些图片需要放置在某一个块中，比如头像，比如某些图片列表。可是源图片的尺寸可能很难保证长宽比例都是一致的，如果我们直接给图片设定宽高，就有可能导致图片变形。变形之后高大上的页面就直接垮掉了。</p>
<p>因此为了解决这个问题，我们需要一个定制的image组件来解决这个问题。我们期望图片能够根据自己的宽高比，合理的缩放，保证在这个块中不变形的情况下尽可能的显示更多的内容。</p>
<p>假如有一堆图片，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<section class=&quot;img-wrap&quot;>
    <div class=&quot;img-center&quot;>
        ![](https://timgsa.baidu.com/timg?image&amp;quality=80&amp;size=b9999_10000&amp;sec=1491191204817&amp;di=48ea9cde3319576ed6e0b6dc6c6b75b4&amp;imgtype=0&amp;src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F342ac65c103853438b3c5f8b9613b07ecb8088ad.jpg)
    </div>

    <div class=&quot;img-center&quot;>
        ![](https://timgsa.baidu.com/timg?image&amp;quality=80&amp;size=b9999_10000&amp;sec=1491191241712&amp;di=9dbd9c614b82f0b02c92c6e60875983a&amp;imgtype=0&amp;src=http%3A%2F%2Fpic5.qiyipic.com%2Fcommon%2F20130524%2F7dc5679567cd4243a0a41e5bf626ad77.jpg%3Fsrc%3Dfocustat_4_20130527_7)
    </div>

    <div class=&quot;img-center&quot;>
        ![](https://timgsa.baidu.com/timg?image&amp;quality=80&amp;size=b9999_10000&amp;sec=1491191271233&amp;di=0c9dd2677413beadcccd66b9d4598c6b&amp;imgtype=0&amp;src=http%3A%2F%2Fb.zol-img.com.cn%2Fdesk%2Fbizhi%2Fimage%2F4%2F960x600%2F1390442684896.jpg)
    </div>

    <div class=&quot;img-center&quot;>
        ![](https://timgsa.baidu.com/timg?image&amp;quality=80&amp;size=b9999_10000&amp;sec=1491191294538&amp;di=6474f3b560f2c100e62f118dde7e8d6c&amp;imgtype=0&amp;src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fc9fcc3cec3fdfc03dfdfafcad23f8794a4c22618.jpg)
    </div>
</section>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs llvm"><code>&lt;<span class="hljs-keyword">section</span> class=<span class="hljs-string">"img-wrap"</span>&gt;
    &lt;div class=<span class="hljs-string">"img-center"</span>&gt;
        ![](https://timgsa.baidu.com/timg?image&amp;quality=<span class="hljs-number">80</span>&amp;size=b<span class="hljs-number">9999</span>_<span class="hljs-number">10000</span>&amp;sec=<span class="hljs-number">1491191204817</span>&amp;di=<span class="hljs-number">48</span>ea<span class="hljs-number">9</span>cde<span class="hljs-number">3319576</span>ed<span class="hljs-number">6e0</span>b<span class="hljs-number">6</span>dc<span class="hljs-number">6</span><span class="hljs-keyword">c</span><span class="hljs-number">6</span>b<span class="hljs-number">75</span>b<span class="hljs-number">4</span>&amp;imgtype=<span class="hljs-number">0</span>&amp;src=http<span class="hljs-symbol">%3</span>A<span class="hljs-symbol">%2</span>F<span class="hljs-symbol">%2</span>Fa.hiphotos.baidu.com<span class="hljs-symbol">%2</span>Fzhidao<span class="hljs-symbol">%2</span>Fpic<span class="hljs-symbol">%2</span>Fitem<span class="hljs-symbol">%2</span>F<span class="hljs-number">342</span>ac<span class="hljs-number">65</span><span class="hljs-keyword">c</span><span class="hljs-number">103853438</span>b<span class="hljs-number">3</span><span class="hljs-keyword">c</span><span class="hljs-number">5</span>f<span class="hljs-number">8</span>b<span class="hljs-number">9613</span>b<span class="hljs-number">07</span>ecb<span class="hljs-number">8088</span>ad.jpg)
    &lt;/div&gt;

    &lt;div class=<span class="hljs-string">"img-center"</span>&gt;
        ![](https://timgsa.baidu.com/timg?image&amp;quality=<span class="hljs-number">80</span>&amp;size=b<span class="hljs-number">9999</span>_<span class="hljs-number">10000</span>&amp;sec=<span class="hljs-number">1491191241712</span>&amp;di=<span class="hljs-number">9</span>dbd<span class="hljs-number">9</span><span class="hljs-keyword">c</span><span class="hljs-number">614</span>b<span class="hljs-number">82</span>f<span class="hljs-number">0</span>b<span class="hljs-number">02</span><span class="hljs-keyword">c</span><span class="hljs-number">92</span><span class="hljs-keyword">c</span><span class="hljs-number">6e60875983</span>a&amp;imgtype=<span class="hljs-number">0</span>&amp;src=http<span class="hljs-symbol">%3</span>A<span class="hljs-symbol">%2</span>F<span class="hljs-symbol">%2</span>Fpic<span class="hljs-number">5</span>.qiyipic.com<span class="hljs-symbol">%2</span>Fcommon<span class="hljs-symbol">%2</span>F<span class="hljs-number">20130524</span><span class="hljs-symbol">%2</span>F<span class="hljs-number">7</span>dc<span class="hljs-number">5679567</span>cd<span class="hljs-number">4243</span>a<span class="hljs-number">0</span>a<span class="hljs-number">41e5</span>bf<span class="hljs-number">626</span>ad<span class="hljs-number">77</span>.jpg<span class="hljs-symbol">%3</span>Fsrc<span class="hljs-symbol">%3</span>Dfocustat_<span class="hljs-number">4</span>_<span class="hljs-number">20130527</span>_<span class="hljs-number">7</span>)
    &lt;/div&gt;

    &lt;div class=<span class="hljs-string">"img-center"</span>&gt;
        ![](https://timgsa.baidu.com/timg?image&amp;quality=<span class="hljs-number">80</span>&amp;size=b<span class="hljs-number">9999</span>_<span class="hljs-number">10000</span>&amp;sec=<span class="hljs-number">1491191271233</span>&amp;di=<span class="hljs-number">0</span><span class="hljs-keyword">c</span><span class="hljs-number">9</span>dd<span class="hljs-number">2677413</span>beadcccd<span class="hljs-number">66</span>b<span class="hljs-number">9</span>d<span class="hljs-number">4598</span><span class="hljs-keyword">c</span><span class="hljs-number">6</span>b&amp;imgtype=<span class="hljs-number">0</span>&amp;src=http<span class="hljs-symbol">%3</span>A<span class="hljs-symbol">%2</span>F<span class="hljs-symbol">%2</span>Fb.zol-img.com.cn<span class="hljs-symbol">%2</span>Fdesk<span class="hljs-symbol">%2</span>Fbizhi<span class="hljs-symbol">%2</span>Fimage<span class="hljs-symbol">%2</span>F<span class="hljs-number">4</span><span class="hljs-symbol">%2</span>F<span class="hljs-number">960</span><span class="hljs-keyword">x</span><span class="hljs-number">600</span><span class="hljs-symbol">%2</span>F<span class="hljs-number">1390442684896</span>.jpg)
    &lt;/div&gt;

    &lt;div class=<span class="hljs-string">"img-center"</span>&gt;
        ![](https://timgsa.baidu.com/timg?image&amp;quality=<span class="hljs-number">80</span>&amp;size=b<span class="hljs-number">9999</span>_<span class="hljs-number">10000</span>&amp;sec=<span class="hljs-number">1491191294538</span>&amp;di=<span class="hljs-number">6474</span>f<span class="hljs-number">3</span>b<span class="hljs-number">560</span>f<span class="hljs-number">2</span><span class="hljs-keyword">c</span><span class="hljs-number">100e62</span>f<span class="hljs-number">118</span>dde<span class="hljs-number">7e8</span>d<span class="hljs-number">6</span><span class="hljs-keyword">c</span>&amp;imgtype=<span class="hljs-number">0</span>&amp;src=http<span class="hljs-symbol">%3</span>A<span class="hljs-symbol">%2</span>F<span class="hljs-symbol">%2</span>Ff.hiphotos.baidu.com<span class="hljs-symbol">%2</span>Fzhidao<span class="hljs-symbol">%2</span>Fpic<span class="hljs-symbol">%2</span>Fitem<span class="hljs-symbol">%2</span>Fc<span class="hljs-number">9</span>fcc<span class="hljs-number">3</span>cec<span class="hljs-number">3</span>fdfc<span class="hljs-number">03</span>dfdfafcad<span class="hljs-number">23</span>f<span class="hljs-number">8794</span>a<span class="hljs-number">4</span><span class="hljs-keyword">c</span><span class="hljs-number">22618</span>.jpg)
    &lt;/div&gt;
&lt;/<span class="hljs-keyword">section</span>&gt;</code></pre>
<p>每一张图片都有一个包裹的div，这些div的宽高，就是我们期望图片能保持的宽高。</p>
<p>当图片宽度值过大时，我们期望图片的高度为100%，并且左右居中。<br>当图片高度值过大时，我们期望图片的宽度为100%，并且上下居中。</p>
<p>根据这一点，我们来看看具体怎么实现。</p>
<p>首先是样式的定义很重要。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".img-center {
    width: 200px;
    height: 150px;
    margin: 20px;
    overflow: hidden;
    position: relative;
}

.img-center img {
    display: block;
    position: absolute;
}

.img-center img.aspectFill-x {
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
}

.img-center img.aspectFill-y {
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.img-center</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">150px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.img-center</span> <span class="hljs-selector-tag">img</span> {
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">position</span>: absolute;
}

<span class="hljs-selector-class">.img-center</span> <span class="hljs-selector-tag">img</span><span class="hljs-selector-class">.aspectFill-x</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-50%);
}

<span class="hljs-selector-class">.img-center</span> <span class="hljs-selector-tag">img</span><span class="hljs-selector-class">.aspectFill-y</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-50%);
}</code></pre>
<p>我分别定义了<code>aspectFill-x</code>与<code>aspectFill-y</code>，通过判断不同的宽高比，来决定将他们中的其中一个加入到img标签的class中去即可。</p>
<p>获取图片的原始宽高，需要等到图片加载完毕之后才能获取。而当图片已经存在缓存时，则有一个compete属性变成true。那么我们就可以根据这些基础知识，定义一个模块来处理这件事情。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// components/imageCenter.js
define(function(require) {

    // 利用Promise封装一个加载函数，这里也是可以单独放在一个功能模块中进一步优化
    var imageLoad = function(img) {
        return new Promise(function(resolve, reject) {
            if (img.complete) {
                resolve();
            } else {
                img.onload = function(event) {
                    resolve(event);
                }

                img.onerror = function(err) {
                    reject(err);
                }
            }
        })
    }

    var imageCenter = function(domList, mode) {

        domList.forEach(function(item) {
            var img = item.children[0];
            var itemW = item.offsetWidth;
            var itemH = item.offsetHeight;
            var itemR = itemW / itemH;

            imageLoad(img).then(function() {
                var imgW = img.naturalWidth;
                var imgH = img.naturalHeight;
                var imgR = imgW / imgH;

                var resultMode = null;

                switch (mode) {
                    // 这样写是因为期待未来可以扩展其他的展示方式
                    case 'aspectFill':
                        resultMode = imgR > 1 ? 'aspectFill-x' : 'aspectFill-y';
                        break;
                    case 'wspectFill':
                        resultMode = itemR > imgR ? 'aspectFill-x' : 'aspectFill-y'
                        break;
                    default:
                }

                $(img).addClass(resultMode);
            })
        })
    }

    return imageCenter;
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// components/imageCenter.js</span>
define(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require</span>) </span>{

    <span class="hljs-comment">// 利用Promise封装一个加载函数，这里也是可以单独放在一个功能模块中进一步优化</span>
    <span class="hljs-keyword">var</span> imageLoad = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">img</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
            <span class="hljs-keyword">if</span> (img.complete) {
                resolve();
            } <span class="hljs-keyword">else</span> {
                img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
                    resolve(event);
                }

                img.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
                    reject(err);
                }
            }
        })
    }

    <span class="hljs-keyword">var</span> imageCenter = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">domList, mode</span>) </span>{

        domList.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>) </span>{
            <span class="hljs-keyword">var</span> img = item.children[<span class="hljs-number">0</span>];
            <span class="hljs-keyword">var</span> itemW = item.offsetWidth;
            <span class="hljs-keyword">var</span> itemH = item.offsetHeight;
            <span class="hljs-keyword">var</span> itemR = itemW / itemH;

            imageLoad(img).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">var</span> imgW = img.naturalWidth;
                <span class="hljs-keyword">var</span> imgH = img.naturalHeight;
                <span class="hljs-keyword">var</span> imgR = imgW / imgH;

                <span class="hljs-keyword">var</span> resultMode = <span class="hljs-literal">null</span>;

                <span class="hljs-keyword">switch</span> (mode) {
                    <span class="hljs-comment">// 这样写是因为期待未来可以扩展其他的展示方式</span>
                    <span class="hljs-keyword">case</span> <span class="hljs-string">'aspectFill'</span>:
                        resultMode = imgR &gt; <span class="hljs-number">1</span> ? <span class="hljs-string">'aspectFill-x'</span> : <span class="hljs-string">'aspectFill-y'</span>;
                        <span class="hljs-keyword">break</span>;
                    <span class="hljs-keyword">case</span> <span class="hljs-string">'wspectFill'</span>:
                        resultMode = itemR &gt; imgR ? <span class="hljs-string">'aspectFill-x'</span> : <span class="hljs-string">'aspectFill-y'</span>
                        <span class="hljs-keyword">break</span>;
                    <span class="hljs-keyword">default</span>:
                }

                $(img).addClass(resultMode);
            })
        })
    }

    <span class="hljs-keyword">return</span> imageCenter;
})
</code></pre>
<p>那么在使用时，直接引入这个模块并调用imageCenter方法即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js
var imageCenter = require('imageCenter');
var imageWrapList = document.querySelectorAll('.img-center');
imageCenter(imageWrapList, 'wspectFill');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment">// index.js</span>
<span class="hljs-keyword">var</span> imageCenter = require(<span class="hljs-string">'imageCenter'</span>);
<span class="hljs-keyword">var</span> imageWrapList = <span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelectorAll</span>(<span class="hljs-string">'.img-center'</span>);
imageCenter(imageWrapList, <span class="hljs-string">'wspectFill'</span>);</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008932859" src="https://static.alili.tech/img/remote/1460000008932859" alt="一堆尺寸乱七八糟的图片就这样被驯服了" title="一堆尺寸乱七八糟的图片就这样被驯服了" style="cursor: pointer;"></span></p>
<p>第三个应用场景，则是自定义弹窗的处理。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008932860" src="https://static.alili.tech/img/remote/1460000008932860" alt="这种类型的弹窗随处可见，而且十分常用" title="这种类型的弹窗随处可见，而且十分常用" style="cursor: pointer; display: inline;"></span></p>
<p>因此自己专门定义一个常用的弹窗就变得非常有必要，这对于我们开发效率的提高非常有帮助。当然，我这里只是简单的写了一个简陋的，仅供参考。</p>
<p>我们期望的是利用Promise，当我们点击确认时，状态变成resolved，点击取消时，状态变成rejected。这样也方便将弹窗生成与后续的操作处理区分开来。</p>
<p>先定义一个Dialog模块。使用的是最简单的方式定义，应该不会有什么理解上的困难。主要提供了show和hide2个方法，用于展示和隐藏。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// components/Dialog.js
define(function(require) {

    // 利用闭包的特性，判断是否已经存在实例
    var instance;

    function Dialog(config) {

        this.title = config.title ? config.title : '这是标题';
        this.content = config.content ? config.content : '这是提示内容';

        this.html = '<div class=&quot;dialog-dropback&quot;>' +
            '<div class=&quot;container&quot;>' +
                '<div class=&quot;head&quot;>'+ this.title +'</div>' +
                '<div class=&quot;content&quot;>'+ this.content +'</div>' +
                '<div class=&quot;footer&quot;>' +
                    '<button class=&quot;cancel&quot;>取消</button>' +
                    '<button class=&quot;confirm&quot;>确认</button>' +
                '</div>' +
            '</div>' +
        '</div>'
    }

    Dialog.prototype = {
        constructor: Dialog,
        show: function() {
            var _this = this;
            if (instance) {
                this.destory();
            }
            $(this.html).appendTo($(document.body));
            instance = this;

            return new Promise(function(resolve, reject) {
                $('.dialog-dropback .cancel').on('click', function(e) {
                    _this.hide();
                    reject(e);
                })

                $('.dialog-dropback .confirm').on('click', function(e) {
                    _this.hide();
                    resolve(e);
                })
            })
        },

        destory: function() {
            instance = null;
            $('.dialog-dropback .cancel').off('click');
            $('.dialog-dropback .confirm').off('click');
            $('.dialog-dropback').remove();
        },

        hide: function() {
            this.destory();
        }
    }

    return function(config) {
        return new Dialog(config);
    }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// components/Dialog.js</span>
define(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require</span>) </span>{

    <span class="hljs-comment">// 利用闭包的特性，判断是否已经存在实例</span>
    <span class="hljs-keyword">var</span> instance;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dialog</span>(<span class="hljs-params">config</span>) </span>{

        <span class="hljs-keyword">this</span>.title = config.title ? config.title : <span class="hljs-string">'这是标题'</span>;
        <span class="hljs-keyword">this</span>.content = config.content ? config.content : <span class="hljs-string">'这是提示内容'</span>;

        <span class="hljs-keyword">this</span>.html = <span class="hljs-string">'&lt;div class="dialog-dropback"&gt;'</span> +
            <span class="hljs-string">'&lt;div class="container"&gt;'</span> +
                <span class="hljs-string">'&lt;div class="head"&gt;'</span>+ <span class="hljs-keyword">this</span>.title +<span class="hljs-string">'&lt;/div&gt;'</span> +
                <span class="hljs-string">'&lt;div class="content"&gt;'</span>+ <span class="hljs-keyword">this</span>.content +<span class="hljs-string">'&lt;/div&gt;'</span> +
                <span class="hljs-string">'&lt;div class="footer"&gt;'</span> +
                    <span class="hljs-string">'&lt;button class="cancel"&gt;取消&lt;/button&gt;'</span> +
                    <span class="hljs-string">'&lt;button class="confirm"&gt;确认&lt;/button&gt;'</span> +
                <span class="hljs-string">'&lt;/div&gt;'</span> +
            <span class="hljs-string">'&lt;/div&gt;'</span> +
        <span class="hljs-string">'&lt;/div&gt;'</span>
    }

    Dialog.prototype = {
        <span class="hljs-attr">constructor</span>: Dialog,
        <span class="hljs-attr">show</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
            <span class="hljs-keyword">if</span> (instance) {
                <span class="hljs-keyword">this</span>.destory();
            }
            $(<span class="hljs-keyword">this</span>.html).appendTo($(<span class="hljs-built_in">document</span>.body));
            instance = <span class="hljs-keyword">this</span>;

            <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
                $(<span class="hljs-string">'.dialog-dropback .cancel'</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
                    _this.hide();
                    reject(e);
                })

                $(<span class="hljs-string">'.dialog-dropback .confirm'</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
                    _this.hide();
                    resolve(e);
                })
            })
        },

        <span class="hljs-attr">destory</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            instance = <span class="hljs-literal">null</span>;
            $(<span class="hljs-string">'.dialog-dropback .cancel'</span>).off(<span class="hljs-string">'click'</span>);
            $(<span class="hljs-string">'.dialog-dropback .confirm'</span>).off(<span class="hljs-string">'click'</span>);
            $(<span class="hljs-string">'.dialog-dropback'</span>).remove();
        },

        <span class="hljs-attr">hide</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.destory();
        }
    }

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">config</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Dialog(config);
    }
})
</code></pre>
<p>那么在另外一个模块中需要使用它时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(function(require) {
    var Dialog = require('dialog');

    $('button.aspect').on('click', function() {
        Dialog({
            title: '友情提示',
            content: '外面空气不太好，你确定你要出门逛逛吗？'
        }).show().then(function() {
            console.log('你点击了确认按钮.');
        }).catch(function() {
            console.log('你点击了取消按钮.');
        })
    })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>define(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require</span>) </span>{
    <span class="hljs-keyword">var</span> Dialog = <span class="hljs-built_in">require</span>(<span class="hljs-string">'dialog'</span>);

    $(<span class="hljs-string">'button.aspect'</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        Dialog({
            <span class="hljs-attr">title</span>: <span class="hljs-string">'友情提示'</span>,
            <span class="hljs-attr">content</span>: <span class="hljs-string">'外面空气不太好，你确定你要出门逛逛吗？'</span>
        }).show().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'你点击了确认按钮.'</span>);
        }).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'你点击了取消按钮.'</span>);
        })
    })
})</code></pre>
<p>这三种场景就介绍完了，主要是需要大家通过源码来慢慢理解和揣摩。真正掌握之后，相信大家对于Promise在另外的场景中的使用也会变得得心应手。</p>
<p>最后总结一下，这篇文章，涉及到的东西，有点多。大概包括Promise基础知识，ajax基础知识，如何利用Promise封装ajax，如何使用require模块系统，如何在模块中使用Promise，并且对应的三个应用场景又各自有许多需要了解的知识，因此对于基础稍差的朋友来说，理解透彻了肯定会有一个比较大的进步。当然也会花费你更多的时间。</p>
<p>另外在我们的工作中还有一件非常重要的事情是需要我们持续去做的。那就是将常用的场景封装成为可以共用的模块，等到下次使用时，就可以直接拿来使用而节省非常多的开发时间。比如我这里对于img的处理，对于弹窗的处理，都是可以扩展成为一个通用的模块的。慢慢积累多了，你的开发效率就可以得到明显的提高，这些积累，也将会变成你的优势所在。</p>
<p>后续的文章我会分享如何利用react与es6模块系统封装的共用组件，大家也可以学习了之后，根据自己的需求，封装最适合你自己的一套组件。</p>
<blockquote>最后，最近问我怎么学习的人越来越多，我真的有点回答不过来了，我想把我这些文章里的知识都掌握了，应付毕业之后的第一份工作应该不是什么问题的吧？而且为了你们能够掌握Promise的使用，我还专门给读者老爷们创建了一个项目，列举了整整三个实例，还有源代码供你们学习，我学Promise的时候，找好久都没找到一个稍微接近实际应用的案例，学了好久才知道怎么使用，效率之低可想而知。所以静下心来慢慢学习吧，花点时间是值得的 ~ ~ 。</blockquote>
<p><a href="https://segmentfault.com/a/1190000012646488">前端基础进阶系列目录</a></p>
<p><span class="img-wrap"><img data-src="/img/bV0emY?w=800&amp;h=300" src="https://static.alili.tech/img/bV0emY?w=800&amp;h=300" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端基础进阶（十三）：透彻掌握Promise的使用，读这篇就够了

## 原文链接
[https://segmentfault.com/a/1190000012646402](https://segmentfault.com/a/1190000012646402)

