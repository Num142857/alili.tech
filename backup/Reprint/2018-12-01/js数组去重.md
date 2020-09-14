---
title: 'js数组去重' 
date: 2018-12-01 2:30:12
hidden: true
slug: 4hmemfodt0k
categories: [reprint]
---

{{< raw >}}

                    
<p>数组去重的方式有很多种，现总结一些备以后查漏补缺来用。</p>
<h2 id="articleHeader0">对基本数组类型去重：</h2>
<p>（1）set 和 array.from()实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str,
    strs = ['a', 'b', 'c', 'er', 'd', 'er', 'a', 'b', 'c'];

function removeRepeat(arr) {
   return  Array.from(new Set(arr))
}
console.log(removeRepeat(strs)) //[&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, &quot;er&quot;, &quot;d&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> str,
    strs = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>, <span class="hljs-string">'er'</span>, <span class="hljs-string">'d'</span>, <span class="hljs-string">'er'</span>, <span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeRepeat</span>(<span class="hljs-params">arr</span>) </span>{
   <span class="hljs-keyword">return</span>  <span class="hljs-built_in">Array</span>.from(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(arr))
}
<span class="hljs-built_in">console</span>.log(removeRepeat(strs)) <span class="hljs-comment">//["a", "b", "c", "er", "d"]</span></code></pre>
<p>（2） indexOf和forEach()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str=[],
    strs = ['a', 'b', 'c', 'er', 'd', 'er', 'a', 'b', 'c'];

function removeRepeat() {
  strs.forEach(v=>{
    if(str.indexOf(v) < 0) str.push(v)
  })
  console.log(str) //[&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, &quot;er&quot;, &quot;d&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> str=[],
    strs = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>, <span class="hljs-string">'er'</span>, <span class="hljs-string">'d'</span>, <span class="hljs-string">'er'</span>, <span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeRepeat</span>(<span class="hljs-params"></span>) </span>{
  strs.forEach(<span class="hljs-function"><span class="hljs-params">v</span>=&gt;</span>{
    <span class="hljs-keyword">if</span>(str.indexOf(v) &lt; <span class="hljs-number">0</span>) str.push(v)
  })
  <span class="hljs-built_in">console</span>.log(str) <span class="hljs-comment">//["a", "b", "c", "er", "d"]</span>
}</code></pre>
<p>（3）map 和 filter</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str=[],
    strs = ['a', 'b', 'c', 'er', 'd', 'er', 'a', 'b', 'c'];
function removeRepeat(arr) {
  const unique = new Map()
  return arr.filter(v=>{
    return !unique.has(v) &amp;&amp; unique.set(v,1)
  })
}
 console.log(removeRepeat(strs)) //[&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, &quot;er&quot;, &quot;d&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> str=[],
    strs = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>, <span class="hljs-string">'er'</span>, <span class="hljs-string">'d'</span>, <span class="hljs-string">'er'</span>, <span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>];
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeRepeat</span>(<span class="hljs-params">arr</span>) </span>{
  <span class="hljs-keyword">const</span> unique = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>()
  <span class="hljs-keyword">return</span> arr.filter(<span class="hljs-function"><span class="hljs-params">v</span>=&gt;</span>{
    <span class="hljs-keyword">return</span> !unique.has(v) &amp;&amp; unique.set(v,<span class="hljs-number">1</span>)
  })
}
 <span class="hljs-built_in">console</span>.log(removeRepeat(strs)) <span class="hljs-comment">//["a", "b", "c", "er", "d"]</span></code></pre>
<h2 id="articleHeader1">延伸1：需要对数组排序去重</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str=[],
    strs = ['a', 'b', 'c', 'er', 'd', 'er', 'a', 'b', 'c'];

function removeRepeat(arr) {
 let arry = arr.sort()
 return arr.sort().filter((v,index) => {
   return !index || v !== arry[index-1]
 })
}
console.log(removeRepeat(strs))//  [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, &quot;d&quot;, &quot;er&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> str=[],
    strs = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>, <span class="hljs-string">'er'</span>, <span class="hljs-string">'d'</span>, <span class="hljs-string">'er'</span>, <span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeRepeat</span>(<span class="hljs-params">arr</span>) </span>{
 <span class="hljs-keyword">let</span> arry = arr.sort()
 <span class="hljs-keyword">return</span> arr.sort().filter(<span class="hljs-function">(<span class="hljs-params">v,index</span>) =&gt;</span> {
   <span class="hljs-keyword">return</span> !index || v !== arry[index<span class="hljs-number">-1</span>]
 })
}
<span class="hljs-built_in">console</span>.log(removeRepeat(strs))<span class="hljs-comment">//  ["a", "b", "c", "d", "er"]</span></code></pre>
<h2 id="articleHeader2">延伸2：某一个元素只出现一次</h2>
<hr>
<p>（1）利用filter，indexof，lastIndexOf对基本类型数组去重复元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str,
    strs = ['a', 'b', 'c', 'er', 'd', 'er', 'a', 'b', 'c'];

function removeRepeat() {
    str = strs.filter(function (value, index, array) {
        return array.indexOf(value) === array.lastIndexOf(value);
    })
    console.log(str) //[&quot;d&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> str,
    strs = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>, <span class="hljs-string">'er'</span>, <span class="hljs-string">'d'</span>, <span class="hljs-string">'er'</span>, <span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeRepeat</span><span class="hljs-params">()</span> </span>{
    str = strs.filter(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(value, index, array)</span> </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">array</span>.indexOf(value) === <span class="hljs-keyword">array</span>.lastIndexOf(value);
    })
    console.log(str) <span class="hljs-comment">//["d"]</span>
}</code></pre>
<p>（2）利用lastIndexOf，splice对基本类型数组去重复元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str,
    strs = ['a', 'b', 'c', 'er', 'd', 'er', 'a', 'b', 'c'];

function removeRepeat() {
    for (var i = 0; i < strs.length; i++) {
        if (i !== strs.lastIndexOf(strs[i])) strs.splice(i, 1);
    }
    console.log(str) //[&quot;d&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> str,
    strs = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>, <span class="hljs-string">'er'</span>, <span class="hljs-string">'d'</span>, <span class="hljs-string">'er'</span>, <span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeRepeat</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; strs.length; i++) {
        <span class="hljs-keyword">if</span> (i !== strs.lastIndexOf(strs[i])) strs.splice(i, <span class="hljs-number">1</span>);
    }
    <span class="hljs-built_in">console</span>.log(str) <span class="hljs-comment">//["d"]</span>
}</code></pre>
<p>（1）和（2）的方法大同小异，原理是一样</p>
<h2 id="articleHeader3">延伸3：对数组对象进行去重</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Messages = [
    {
        &quot;timestamp&quot;: 1474328370007,
        &quot;message&quot;: &quot;hello&quot;
    },
    {
        &quot;timestamp&quot;: 1474328302520,
        &quot;message&quot;: &quot;how are you&quot;
    },
    {
        &quot;timestamp&quot;: 1474328370007,
        &quot;message&quot;: &quot;hello&quot;
    },
    {
        &quot;timestamp&quot;: 1474328370007,
        &quot;message&quot;: &quot;hello&quot;
    }
]

var NoRepeatMessages = [];

function RemoveRepeat(arr) {
    var hashFlag = {}
    arr.forEach((v,index) => {
        if (!hashFlag[v.timestamp]) {
            hashFlag[v.timestamp] = true;
            NoRepeatMessages.push(v);
        }
    });
  console.log(NoRepeatMessages) //[{&quot;timestamp&quot;: 1474328370007,&quot;message&quot;: &quot;hello&quot;},{ &quot;timestamp&quot;: 1474328302520,&quot;message&quot;: &quot;how are you&quot;}]
}
RemoveRepeat(Messages)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>var Messages = [
    {
        <span class="hljs-string">"timestamp"</span>: <span class="hljs-number">1474328370007</span>,
        <span class="hljs-string">"message"</span>: <span class="hljs-string">"hello"</span>
    },
    {
        <span class="hljs-string">"timestamp"</span>: <span class="hljs-number">1474328302520</span>,
        <span class="hljs-string">"message"</span>: <span class="hljs-string">"how are you"</span>
    },
    {
        <span class="hljs-string">"timestamp"</span>: <span class="hljs-number">1474328370007</span>,
        <span class="hljs-string">"message"</span>: <span class="hljs-string">"hello"</span>
    },
    {
        <span class="hljs-string">"timestamp"</span>: <span class="hljs-number">1474328370007</span>,
        <span class="hljs-string">"message"</span>: <span class="hljs-string">"hello"</span>
    }
]

var NoRepeatMessages = [];

<span class="hljs-keyword">function</span> RemoveRepeat(arr) {
    var hashFlag = {}
    arr.forEach((v,index) =&gt; {
        if (!hashFlag[v.timestamp]) {
            hashFlag[v.timestamp] = true;
            NoRepeatMessages.push(v);
        }
    });
  console.log(NoRepeatMessages) //[{<span class="hljs-string">"timestamp"</span>: <span class="hljs-number">1474328370007</span>,<span class="hljs-string">"message"</span>: <span class="hljs-string">"hello"</span>},{ <span class="hljs-string">"timestamp"</span>: <span class="hljs-number">1474328302520</span>,<span class="hljs-string">"message"</span>: <span class="hljs-string">"how are you"</span>}]
}
RemoveRepeat(Messages)
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js数组去重

## 原文链接
[https://segmentfault.com/a/1190000014796697](https://segmentfault.com/a/1190000014796697)

