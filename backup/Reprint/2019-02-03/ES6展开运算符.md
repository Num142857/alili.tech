---
title: 'ES6展开运算符' 
date: 2019-02-03 2:30:39
hidden: true
slug: a27uw2v22z6
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">语法</h3>
<ul>
<li>
<p>用于函数调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myFunction(...iterableObj);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">myFunction(...iterableObj);</code></pre>
</li>
<li>
<p>用于数组字面量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[...iterableObj, 4, 5, 6]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">[...iterableObj, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>]</code></pre>
</li>
</ul>
<h3 id="articleHeader1">函数传参</h3>
<p>目前为止,我们都是使用<code>Function.prototype.apply</code>方法来将一个数组展开成多个参数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function myFunction(x, y, z) { }
var args = [0, 1, 2];
myFunction.apply(null, args);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFunction</span>(<span class="hljs-params">x, y, z</span>) </span>{ }
<span class="hljs-keyword">var</span> args = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>];
myFunction.apply(<span class="hljs-literal">null</span>, args);</code></pre>
<p>使用es6的展开运算符可以这么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function myFunction(x, y, z) { }
var args = [0, 1, 2];
myFunction(...args);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFunction</span>(<span class="hljs-params">x, y, z</span>) </span>{ }
<span class="hljs-keyword">var</span> args = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>];
myFunction(...args);</code></pre>
<ul><li>
<p>选择性传参</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function filter(type, ...items) {
    return items.filter(item => typeof item === type);
}
filter('boolean', true, 0, false);        // => [true, false]
filter('number', false, 4, 'Welcome', 7); // => [4, 7]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">filter</span>(<span class="hljs-params">type, ...items</span>) </span>{
    <span class="hljs-keyword">return</span> items.filter(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> <span class="hljs-keyword">typeof</span> item === type);
}
filter(<span class="hljs-string">'boolean'</span>, <span class="hljs-literal">true</span>, <span class="hljs-number">0</span>, <span class="hljs-literal">false</span>);        <span class="hljs-comment">// =&gt; [true, false]</span>
filter(<span class="hljs-string">'number'</span>, <span class="hljs-literal">false</span>, <span class="hljs-number">4</span>, <span class="hljs-string">'Welcome'</span>, <span class="hljs-number">7</span>); <span class="hljs-comment">// =&gt; [4, 7]</span></code></pre>
</li></ul>
<p>还可以同时展开多个数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function myFunction(v, w, x, y, z) { }
var args = [0, 1];
myFunction(-1, ...args, 2, ...[3]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFunction</span>(<span class="hljs-params">v, w, x, y, z</span>) </span>{ }
<span class="hljs-keyword">var</span> args = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>];
myFunction(<span class="hljs-number">-1</span>, ...args, <span class="hljs-number">2</span>, ...[<span class="hljs-number">3</span>]);</code></pre>
<h3 id="articleHeader2">数据解构</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let cold = ['autumn', 'winter'];
let warm = ['spring', 'summer'];
// 析构数组
let otherSeasons, autumn;
[autumn, ...otherSeasons] = cold;
otherSeasons      // => ['winter']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> cold = [<span class="hljs-string">'autumn'</span>, <span class="hljs-string">'winter'</span>];
<span class="hljs-keyword">let</span> warm = [<span class="hljs-string">'spring'</span>, <span class="hljs-string">'summer'</span>];
<span class="hljs-comment">// 析构数组</span>
<span class="hljs-keyword">let</span> otherSeasons, autumn;
[autumn, ...otherSeasons] = cold;
otherSeasons      <span class="hljs-comment">// =&gt; ['winter']</span></code></pre>
<h3 id="articleHeader3">数据构造</h3>
<ul>
<li>
<p>两个对象连接返回新的对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = {aa:'aa'}
let b = {bb:'bb'}
let c = {...a,...b}
console.log(c)
// {&quot;aa&quot;:&quot;aa&quot;,&quot;bb&quot;:&quot;bb&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> a = {<span class="hljs-attr">aa</span>:<span class="hljs-string">'aa'</span>}
<span class="hljs-keyword">let</span> b = {<span class="hljs-attr">bb</span>:<span class="hljs-string">'bb'</span>}
<span class="hljs-keyword">let</span> c = {...a,...b}
<span class="hljs-built_in">console</span>.log(c)
<span class="hljs-comment">// {"aa":"aa","bb":"bb"}</span></code></pre>
</li>
<li>
<p>两个数组连接返回新的数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let d = ['dd']
let e = ['ee']
let f = [...d,...e]
console.log(f)
// [&quot;dd&quot;,&quot;ee&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> d = [<span class="hljs-string">'dd'</span>]
<span class="hljs-keyword">let</span> e = [<span class="hljs-string">'ee'</span>]
<span class="hljs-keyword">let</span> f = [...d,...e]
<span class="hljs-built_in">console</span>.log(f)
<span class="hljs-comment">// ["dd","ee"]</span></code></pre>
<ul>
<li>
<p>在中间插入数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var parts = ['shoulder', 'knees'];
var lyrics = ['head', ...parts, 'and', 'toes']; // [&quot;head&quot;, &quot;shoulders&quot;, &quot;knees&quot;, &quot;and&quot;, &quot;toes&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> parts = [<span class="hljs-string">'shoulder'</span>, <span class="hljs-string">'knees'</span>];
<span class="hljs-keyword">var</span> lyrics = [<span class="hljs-string">'head'</span>, ...parts, <span class="hljs-string">'and'</span>, <span class="hljs-string">'toes'</span>]; <span class="hljs-comment">// ["head", "shoulders", "knees", "and", "toes"]</span></code></pre>
</li>
<li>
<p>在尾部插入数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES5
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
// 将arr2中的所有元素添加到arr1中
Array.prototype.push.apply(arr1, arr2);

// ES6
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1.push(...arr2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ES5</span>
<span class="hljs-keyword">var</span> arr1 = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>];
<span class="hljs-keyword">var</span> arr2 = [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
<span class="hljs-comment">// 将arr2中的所有元素添加到arr1中</span>
<span class="hljs-built_in">Array</span>.prototype.push.apply(arr1, arr2);

<span class="hljs-comment">// ES6</span>
<span class="hljs-keyword">var</span> arr1 = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>];
<span class="hljs-keyword">var</span> arr2 = [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
arr1.push(...arr2);</code></pre>
</li>
</ul>
</li>
<li>
<p>数组加上对象返回新的数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let g = [{gg:'gg'}]
let h = {hh:'hh'}
let i = [...g,h]
console.log(i)
// [{&quot;gg&quot;:&quot;gg&quot;},{&quot;hh&quot;:&quot;hh&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> g = [{<span class="hljs-attr">gg</span>:<span class="hljs-string">'gg'</span>}]
<span class="hljs-keyword">let</span> h = {<span class="hljs-attr">hh</span>:<span class="hljs-string">'hh'</span>}
<span class="hljs-keyword">let</span> i = [...g,h]
<span class="hljs-built_in">console</span>.log(i)
<span class="hljs-comment">// [{"gg":"gg"},{"hh":"hh"}</span></code></pre>
</li>
<li>
<p>数组+字符串</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let j = ['jj']
let k = 'kk'
let l = [...j,k]
console.log(l)
// [&quot;jj&quot;,&quot;kk&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> j = [<span class="hljs-string">'jj'</span>]
<span class="hljs-keyword">let</span> k = <span class="hljs-string">'kk'</span>
<span class="hljs-keyword">let</span> l = [...j,k]
<span class="hljs-built_in">console</span>.log(l)
<span class="hljs-comment">// ["jj","kk"]</span></code></pre>
</li>
<li>
<p>带有数组和对象的结合</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let state = {
    resultList: [],
    currentPage: 0,
    totalRows: {}
}
let data = {
    resultList: [{new:'new'}],
    currentPage: 2,
    totalRows: {row:'row'}
}
let combile = {
                ...state,
                resultList: [
                    ...state.resultList,
                    ...data.resultList
                ],
                currentPage: data.currentPage,
                totalRows: data.totalRows
            }
console.log(combile)
// {&quot;resultList&quot;:[{&quot;new&quot;:&quot;new&quot;}],&quot;currentPage&quot;:2,&quot;totalRows&quot;:{&quot;row&quot;:&quot;row&quot;"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> state = {
    <span class="hljs-attr">resultList</span>: [],
    <span class="hljs-attr">currentPage</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">totalRows</span>: {}
}
<span class="hljs-keyword">let</span> data = {
    <span class="hljs-attr">resultList</span>: [{<span class="hljs-attr">new</span>:<span class="hljs-string">'new'</span>}],
    <span class="hljs-attr">currentPage</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">totalRows</span>: {<span class="hljs-attr">row</span>:<span class="hljs-string">'row'</span>}
}
<span class="hljs-keyword">let</span> combile = {
                ...state,
                <span class="hljs-attr">resultList</span>: [
                    ...state.resultList,
                    ...data.resultList
                ],
                <span class="hljs-attr">currentPage</span>: data.currentPage,
                <span class="hljs-attr">totalRows</span>: data.totalRows
            }
<span class="hljs-built_in">console</span>.log(combile)
<span class="hljs-comment">// {"resultList":[{"new":"new"}],"currentPage":2,"totalRows":{"row":"row""}}"</span></code></pre>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6展开运算符

## 原文链接
[https://segmentfault.com/a/1190000007022442](https://segmentfault.com/a/1190000007022442)

