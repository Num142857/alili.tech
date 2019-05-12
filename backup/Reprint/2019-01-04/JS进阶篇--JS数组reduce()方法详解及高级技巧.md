---
title: 'JS进阶篇--JS数组reduce()方法详解及高级技巧' 
date: 2019-01-04 2:30:10
hidden: true
slug: y478vyjth5e
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">基本概念</h2>
<h4><strong>reduce() 方法接收一个函数作为累加器（accumulator），数组中的每个值（从左到右）开始缩减，最终为一个值。</strong></h4>
<p>reduce 为数组中的每一个元素依次执行回调函数，不包括数组中被删除或从未被赋值的元素，接受四个参数：初始值（或者上一次回调函数的返回值），当前元素值，当前索引，调用 reduce 的数组。</p>
<p><strong>语法:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.reduce(callback,[initialValue])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">arr</span><span class="hljs-selector-class">.reduce</span>(<span class="hljs-selector-tag">callback</span>,<span class="hljs-selector-attr">[initialValue]</span>)</code></pre>
<ul>
<li>
<p>callback （执行数组中每个值的函数，包含四个参数）</p>
<ul>
<li>previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））</li>
<li>currentValue （数组中当前被处理的元素）</li>
<li>index （当前元素在数组中的索引）</li>
<li>array （调用 reduce 的数组）</li>
</ul>
</li>
<li>initialValue （作为第一次调用 callback 的第一个参数。）</li>
</ul>
<h2 id="articleHeader1">简单应用</h2>
<p><strong>例1：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var items = [10, 120, 1000];

// our reducer function
var reducer = function add(sumSoFar, item) { return sumSoFar + item; };

// do the job
var total = items.reduce(reducer, 0);

console.log(total); // 1130
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> items = [<span class="hljs-number">10</span>, <span class="hljs-number">120</span>, <span class="hljs-number">1000</span>];

<span class="hljs-comment">// our reducer function</span>
<span class="hljs-keyword">var</span> reducer = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">sumSoFar, item</span>) </span>{ <span class="hljs-keyword">return</span> sumSoFar + item; };

<span class="hljs-comment">// do the job</span>
<span class="hljs-keyword">var</span> total = items.reduce(reducer, <span class="hljs-number">0</span>);

<span class="hljs-built_in">console</span>.log(total); <span class="hljs-comment">// 1130</span>
</code></pre>
<p>可以看出，reduce函数根据初始值0，不断的进行叠加，完成最简单的总和的实现。</p>
<p>reduce函数的返回结果类型和传入的初始值相同，上个实例中初始值为number类型，同理，初始值也可为object类型。</p>
<p><strong>例2：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var items = [10, 120, 1000];

// our reducer function
var reducer = function add(sumSoFar, item) {
  sumSoFar.sum = sumSoFar.sum + item;
  return sumSoFar;
};

// do the job
var total = items.reduce(reducer, {sum: 0});

console.log(total); // {sum:1130}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> items = [10, 120, 1000];

<span class="hljs-comment">// our reducer function</span>
<span class="hljs-keyword">var</span> reducer = function add(sumSoFar, item) {
  sumSoFar.<span class="hljs-keyword">sum</span> = sumSoFar.<span class="hljs-keyword">sum</span> + item;
  <span class="hljs-keyword">return</span> sumSoFar;
};

<span class="hljs-comment">// do the job</span>
<span class="hljs-keyword">var</span> <span class="hljs-keyword">total</span> = items.reduce(reducer, {<span class="hljs-keyword">sum</span>: 0});

console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">total</span>); <span class="hljs-comment">// {sum:1130}</span>
</code></pre>
<h2 id="articleHeader2">进阶应用</h2>
<p>使用reduce方法可以完成多维度的数据叠加。如上例中的初始值{sum: 0}，这仅仅是一个维度的操作，如果涉及到了多个属性的叠加，如{sum: 0,totalInEuros: 0,totalInYen: 0}，则需要相应的逻辑进行处理。</p>
<p>在下面的方法中，采用分而治之的方法，即将reduce函数第一个参数callback封装为一个数组，由数组中的每一个函数单独进行叠加并完成reduce操作。所有的一切通过一个manager函数来管理流程和传递初始参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var manageReducers = function(reducers) {
  return function(state, item) {
    return Object.keys(reducers).reduce(
      function(nextState, key) {
        reducers[key](state, item);
        return state;
      },
      {}
    );
  }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>var manageReducers = function(reducers) {
  return function(<span class="hljs-keyword">state</span>, item) {
    return Object.keys(reducers).reduce(
      function(nextState, key) {
        reducers[key](<span class="hljs-keyword">state</span>, item);
        return <span class="hljs-keyword">state</span>;
      },
      {}
    );
  }
};
</code></pre>
<p>上面就是manager函数的实现，它需要reducers对象作为参数，并返回一个callback类型的函数，作为reduce的第一个参数。在该函数内部，则执行多维的叠加工作（Object.keys（））。</p>
<p>通过这种分治的思想，可以完成目标对象多个属性的同时叠加，完整代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reducers = {  
  totalInEuros : function(state, item) {
    return state.euros += item.price * 0.897424392;
  },
  totalInYen : function(state, item) {
    return state.yens += item.price * 113.852;
  }
};

var manageReducers = function(reducers) {
  return function(state, item) {
    return Object.keys(reducers).reduce(
      function(nextState, key) {
        reducers[key](state, item);
        return state;
      },
      {}
    );
  }
};

var bigTotalPriceReducer = manageReducers(reducers);
var initialState = {euros:0, yens: 0};
var items = [{price: 10}, {price: 120}, {price: 1000}];
var totals = items.reduce(bigTotalPriceReducer, initialState);
console.log(totals);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>var reducers = {  
  totalInEuros : function(<span class="hljs-keyword">state</span>, item) {
    return <span class="hljs-keyword">state</span>.euros += item.price * <span class="hljs-number">0.897424392</span>;
  },
  totalInYen : function(<span class="hljs-keyword">state</span>, item) {
    return <span class="hljs-keyword">state</span>.yens += item.price * <span class="hljs-number">113.852</span>;
  }
};

var manageReducers = function(reducers) {
  return function(<span class="hljs-keyword">state</span>, item) {
    return Object.keys(reducers).reduce(
      function(nextState, key) {
        reducers[key](<span class="hljs-keyword">state</span>, item);
        return <span class="hljs-keyword">state</span>;
      },
      {}
    );
  }
};

var bigTotalPriceReducer = manageReducers(reducers);
var initialState = {euros:<span class="hljs-number">0</span>, yens: <span class="hljs-number">0</span>};
var items = [{price: <span class="hljs-number">10</span>}, {price: <span class="hljs-number">120</span>}, {price: <span class="hljs-number">1000</span>}];
var totals = items.reduce(bigTotalPriceReducer, initialState);
console.<span class="hljs-keyword">log</span>(totals);</code></pre>
<p>在来一个例子：<br>某同学的期末成绩如下表示</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = [
    {
        subject: 'math',
        score: 88
    },
    {
        subject: 'chinese',
        score: 95
    },
    {
        subject: 'english',
        score: 80
    }
];
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>var result = [
    {
        subject: <span class="hljs-string">'math'</span>,
        <span class="hljs-built_in">score</span>: <span class="hljs-number">88</span>
    },
    {
        subject: <span class="hljs-string">'chinese'</span>,
        <span class="hljs-built_in">score</span>: <span class="hljs-number">95</span>
    },
    {
        subject: <span class="hljs-string">'english'</span>,
        <span class="hljs-built_in">score</span>: <span class="hljs-number">80</span>
    }
];
</code></pre>
<p>如何求该同学的总成绩？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sum = result.reduce(function(prev, cur) {
    return cur.score + prev;
}, 0);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> sum = result.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(prev, cur)</span> </span>{
    <span class="hljs-keyword">return</span> cur.score + prev;
}, <span class="hljs-number">0</span>);
</code></pre>
<p>假设该同学因为违纪被处罚在总成绩总扣10分，只需要将初始值设置为-10即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sum = result.reduce(function(prev, cur) {
    return cur.score + prev;
}, -10);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> sum = result.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(prev, cur)</span> </span>{
    <span class="hljs-keyword">return</span> cur.score + prev;
}, <span class="hljs-number">-10</span>);
</code></pre>
<p>我们来给这个例子增加一点难度。假如该同学的总成绩中，各科所占的比重不同，分别为50%，30%，20%，我们应该如何求出最终的权重结果呢？</p>
<p>解决方案如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var dis = {
    math: 0.5,
    chinese: 0.3,
    english: 0.2
}

var sum = result.reduce(function(prev, cur) {
    return cur.score + prev;
}, -10);

var qsum = result.reduce(function(prev, cur) {
    return cur.score * dis[cur.subject] + pre;
}, 0)

console.log(sum, qsum);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> dis = {
    <span class="hljs-attr">math</span>: <span class="hljs-number">0.5</span>,
    <span class="hljs-attr">chinese</span>: <span class="hljs-number">0.3</span>,
    <span class="hljs-attr">english</span>: <span class="hljs-number">0.2</span>
}

<span class="hljs-keyword">var</span> sum = result.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">prev, cur</span>) </span>{
    <span class="hljs-keyword">return</span> cur.score + prev;
}, <span class="hljs-number">-10</span>);

<span class="hljs-keyword">var</span> qsum = result.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">prev, cur</span>) </span>{
    <span class="hljs-keyword">return</span> cur.score * dis[cur.subject] + pre;
}, <span class="hljs-number">0</span>)

<span class="hljs-built_in">console</span>.log(sum, qsum);
</code></pre>
<p>再看一个例子，如何知道一串字符串中每个字母出现的次数？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arrString = 'abcdaabc';

arrString.split('').reduce(function(res, cur) {
    res[cur] ? res[cur] ++ : res[cur] = 1
    return res;
}, {})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> arrString = <span class="hljs-string">'abcdaabc'</span>;

arrString.split(<span class="hljs-string">''</span>).reduce(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(res, cur)</span> </span>{
    res[cur] ? res[cur] ++ : res[cur] = <span class="hljs-number">1</span>
    <span class="hljs-keyword">return</span> res;
}, {})
</code></pre>
<p>由于可以通过第二参数设置叠加结果的类型初始值，因此这个时候reduce就不再仅仅只是做一个加法了，我们可以灵活的运用它来进行各种各样的类型转换，比如将数组按照一定规则转换为对象，也可以将一种形式的数组转换为另一种形式的数组，大家可以动手去尝试一样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1, 2].reduce(function(res, cur) { 
    res.push(cur + 1); 
    return res; 
}, [])
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>].reduce(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(res, cur)</span> </span>{ 
    res.push(cur + <span class="hljs-number">1</span>); 
    <span class="hljs-keyword">return</span> res; 
}, [])
</code></pre>
<p>koa的源码中，有一个only模块，整个模块就一个简单的返回reduce方法操作的对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var only = function(obj, keys){
  obj = obj || {};
  if ('string' == typeof keys) keys = keys.split(/ +/);
  return keys.reduce(function(ret, key){
    if (null == obj[key]) return ret;
    ret[key] = obj[key];
    return ret;
  }, {});
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> only = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj, keys</span>)</span>{
  obj = obj || {};
  <span class="hljs-keyword">if</span> (<span class="hljs-string">'string'</span> == <span class="hljs-keyword">typeof</span> keys) keys = keys.split(<span class="hljs-regexp">/ +/</span>);
  <span class="hljs-keyword">return</span> keys.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ret, key</span>)</span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-literal">null</span> == obj[key]) <span class="hljs-keyword">return</span> ret;
    ret[key] = obj[key];
    <span class="hljs-keyword">return</span> ret;
  }, {});
};</code></pre>
<p>通过对reduce概念的理解，这个模块主要是想新建并返回一个obj对象中存在的keys的object对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {
    env : 'development',
    proxy : false,
    subdomainOffset : 2
}
only(a,['env','proxy'])   // {env:'development',proxy : false}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = {
    env : <span class="hljs-string">'development'</span>,
    proxy : false,
    subdomainOffset : <span class="hljs-number">2</span>
}
<span class="hljs-function"><span class="hljs-title">only</span><span class="hljs-params">(a,[<span class="hljs-string">'env'</span>,<span class="hljs-string">'proxy'</span>])</span></span>   <span class="hljs-comment">// {env:'development',proxy : false}</span></code></pre>
<h2 id="articleHeader3">参考</h2>
<p><a href="https://segmentfault.com/a/1190000004520428">JS的内建函数reduce</a><br><a href="https://segmentfault.com/a/1190000005921341" target="_blank">数组reduce方法的高级技巧</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS进阶篇--JS数组reduce()方法详解及高级技巧

## 原文链接
[https://segmentfault.com/a/1190000010731933](https://segmentfault.com/a/1190000010731933)

