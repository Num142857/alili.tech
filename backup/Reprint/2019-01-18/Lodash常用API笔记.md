---
title: 'Lodash常用API笔记' 
date: 2019-01-18 2:30:35
hidden: true
slug: tp7lcc6onp
categories: [reprint]
---

{{< raw >}}

                    
<p>lodash中文文档目前我只找到了3.10.x版本，现在lodash已经更新到4.17.x了，好多文档已经过期。而且lodash中api太多，有时候常用的几个我总是记不住名字，在这里贴出来，方便自己和大家。</p>
<hr>
<h2 id="articleHeader0">原生用法</h2>
<p>直接使用的API</p>
<h3 id="articleHeader1">_.reject</h3>
<p>根据条件去除某个元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = [
    {id: 0, name: &quot;aaa&quot;, age: 33},
    {id: 1, name: &quot;bbb&quot;, age: 25}
]
var bar = _.reject(foo, ['id', 0])

//bar = [{id: 1, name: &quot;bbb&quot;, age: 25}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> foo = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">"aaa"</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">33</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">"bbb"</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">25</span>}
]
<span class="hljs-keyword">var</span> bar = _.reject(foo, [<span class="hljs-string">'id'</span>, <span class="hljs-number">0</span>])

<span class="hljs-comment">//bar = [{id: 1, name: "bbb", age: 25}]</span></code></pre>
<h3 id="articleHeader2">_.pick</h3>
<p>根据第二个参数的key的数组，筛选第一个参数中的值并返回</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = {id: 0, name: &quot;aaa&quot;, age: 33}
var bar = _.pick(foo, ['name', 'age'])
//bar = {name: &quot;aaa&quot;, age: 33}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> foo = {<span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">"aaa"</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">33</span>}
<span class="hljs-keyword">var</span> bar = _.pick(foo, [<span class="hljs-string">'name'</span>, <span class="hljs-string">'age'</span>])
<span class="hljs-comment">//bar = {name: "aaa", age: 33}</span></code></pre>
<h3 id="articleHeader3">_.keys</h3>
<p>返回object中的所有key</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = {id: 0, name: &quot;aaa&quot;, age: 33}
var bar = _.keys(foo)
//bar = ['id', 'name', 'age']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> foo = {<span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">"aaa"</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">33</span>}
<span class="hljs-keyword">var</span> bar = _.keys(foo)
<span class="hljs-comment">//bar = ['id', 'name', 'age']</span></code></pre>
<h3 id="articleHeader4">_.cloneDeep</h3>
<p>深度拷贝，这个不用多说了吧，js中基础类型以外的类型，都会默认拷贝备份<br><code>var bar = _.cloneDeep(foo)</code></p>
<h3 id="articleHeader5">_.find</h3>
<p>查找数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = [
    {id: 0, name: &quot;aaa&quot;, age: 33},
    {id: 1, name: &quot;bbb&quot;, age: 25}
]
var bar = _.find(foo, ['id', 0])
//bar = {id: 0, name: &quot;aaa&quot;, age: 33}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> foo = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">"aaa"</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">33</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">"bbb"</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">25</span>}
]
<span class="hljs-keyword">var</span> bar = _.find(foo, [<span class="hljs-string">'id'</span>, <span class="hljs-number">0</span>])
<span class="hljs-comment">//bar = {id: 0, name: "aaa", age: 33}</span></code></pre>
<p>注意一下如果没找到的话，会返回undefined，要处理一下</p>
<h3 id="articleHeader6">_.keyBy</h3>
<p>以某个属性为键，将数组转为对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = var foo = [
    {id: 0, name: &quot;aaa&quot;, age: 33},
    {id: 1, name: &quot;bbb&quot;, age: 25}
]
var bar = _.keyBy(foo, 'name')
//bar = {
//    aaa: {id: 0, name: &quot;aaa&quot;, age: 33},
//    bbb: {id: 1, name: &quot;bbb&quot;, age: 25}
//}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> foo = <span class="hljs-keyword">var</span> foo = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">"aaa"</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">33</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">"bbb"</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">25</span>}
]
<span class="hljs-keyword">var</span> bar = _.keyBy(foo, <span class="hljs-string">'name'</span>)
<span class="hljs-comment">//bar = {</span>
<span class="hljs-comment">//    aaa: {id: 0, name: "aaa", age: 33},</span>
<span class="hljs-comment">//    bbb: {id: 1, name: "bbb", age: 25}</span>
<span class="hljs-comment">//}</span></code></pre>
<h3 id="articleHeader7">_.filter</h3>
<p>根据条件过滤出符合条件的元素，<strong>返回新数组</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = var foo = [
    {id: 0, name: &quot;aaa&quot;, age: 33},
    {id: 1, name: &quot;bbb&quot;, age: 25}
]
var bar = _.filter(foo, ['name', &quot;aaa&quot;])
//bar = {
//    aaa: {id: 0, name: &quot;aaa&quot;, age: 33}
//}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> foo = <span class="hljs-keyword">var</span> foo = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">"aaa"</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">33</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">"bbb"</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">25</span>}
]
<span class="hljs-keyword">var</span> bar = _.filter(foo, [<span class="hljs-string">'name'</span>, <span class="hljs-string">"aaa"</span>])
<span class="hljs-comment">//bar = {</span>
<span class="hljs-comment">//    aaa: {id: 0, name: "aaa", age: 33}</span>
<span class="hljs-comment">//}</span></code></pre>
<h3 id="articleHeader8">_.map</h3>
<p>从集合中挑出一个key，将其值作为数组返回</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = var foo = [
    {id: 0, name: &quot;aaa&quot;, age: 33},
    {id: 1, name: &quot;bbb&quot;, age: 25}
]
var bar = _.map(foo, 'name')
//bar = [&quot;aaa&quot;, &quot;bbb&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> foo = <span class="hljs-keyword">var</span> foo = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">"aaa"</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">33</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">"bbb"</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">25</span>}
]
<span class="hljs-keyword">var</span> bar = _.map(foo, <span class="hljs-string">'name'</span>)
<span class="hljs-comment">//bar = ["aaa", "bbb"]</span></code></pre>
<h3 id="articleHeader9">_.max/_.min/_.sum</h3>
<p>数组中最大值、最小值、数组求和</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = [1, 2, 3, 4]
var bar = _.max(foo)
//bar = 4
bar = _.min(foo)
//bar = 1
bar = _.sum(foo)
//bar = 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> foo = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]
<span class="hljs-keyword">var</span> bar = _.max(foo)
<span class="hljs-comment">//bar = 4</span>
bar = _.min(foo)
<span class="hljs-comment">//bar = 1</span>
bar = _.sum(foo)
<span class="hljs-comment">//bar = 10</span></code></pre>
<h3 id="articleHeader10">_.pad/_.padStart/_.padEnd</h3>
<p>在两端、开头、末尾补齐字符</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = &quot;helloworld&quot;
var bar = _.pad(foo, 14, '-')
//bar = --helloworld--
bar = _.padStart(foo, 14, '-')
//bar = ----helloworld
bar = _.padEnd(foo, 14, '-')
//bar = helloworld----" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> foo = <span class="hljs-string">"helloworld"</span>
<span class="hljs-keyword">var</span> bar = _.pad(foo, <span class="hljs-number">14</span>, <span class="hljs-string">'-'</span>)
<span class="hljs-comment">//bar = --helloworld--</span>
bar = _.padStart(foo, <span class="hljs-number">14</span>, <span class="hljs-string">'-'</span>)
<span class="hljs-comment">//bar = ----helloworld</span>
bar = _.padEnd(foo, <span class="hljs-number">14</span>, <span class="hljs-string">'-'</span>)
<span class="hljs-comment">//bar = helloworld----</span></code></pre>
<h2 id="articleHeader11">组合用法</h2>
<p>如果说上面是基础技能，那么下面奉上几个炫酷的组合技：</p>
<h3 id="articleHeader12">选出json数组中id最大的一项</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = [
    {id: 0, name: &quot;aaa&quot;, age: 33},
    {id: 1, name: &quot;bbb&quot;, age: 25}
]
var bar = _.find(foo, ['id', _.max(_.map(foo, 'id'))])
// bar = {id: 1, name: &quot;bbb&quot;, age: 25}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> foo = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">"aaa"</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">33</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">"bbb"</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">25</span>}
]
<span class="hljs-keyword">var</span> bar = _.find(foo, [<span class="hljs-string">'id'</span>, _.max(_.map(foo, <span class="hljs-string">'id'</span>))])
<span class="hljs-comment">// bar = {id: 1, name: "bbb", age: 25}</span></code></pre>
<p>ps:也可以用maxBy某个key来代替</p>
<h3 id="articleHeader13">更新json数组中某一项的值</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = [
    {id: 0, name: &quot;aaa&quot;, age: 33},
    {id: 1, name: &quot;bbb&quot;, age: 25}
]
let list = _.keyBy(foo, 'id')
list[0].name = &quot;ccc&quot;
var bar = _.map(list)
// bar = [
//    {id: 0, name: &quot;ccc&quot;, age: 33},
//    {id: 1, name: &quot;bbb&quot;, age: 25}
//]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> foo = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">"aaa"</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">33</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">"bbb"</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">25</span>}
]
<span class="hljs-keyword">let</span> list = _.keyBy(foo, <span class="hljs-string">'id'</span>)
list[<span class="hljs-number">0</span>].name = <span class="hljs-string">"ccc"</span>
<span class="hljs-keyword">var</span> bar = _.map(list)
<span class="hljs-comment">// bar = [</span>
<span class="hljs-comment">//    {id: 0, name: "ccc", age: 33},</span>
<span class="hljs-comment">//    {id: 1, name: "bbb", age: 25}</span>
<span class="hljs-comment">//]</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Lodash常用API笔记

## 原文链接
[https://segmentfault.com/a/1190000008738183](https://segmentfault.com/a/1190000008738183)

