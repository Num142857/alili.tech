---
title: '从 forEach 开始谈谈遍历' 
date: 2019-02-06 2:30:08
hidden: true
slug: kbdxwju2xom
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">forEach</h2>
<p>今天从 forEach 开始谈谈遍历吧。</p>
<p>forEach 作为一个比较出众的遍历操作，之前有很多库都对其进行过各种包装，然而我还是发现很多人并不是非常理解 forEach。</p>
<p>比如<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach" rel="nofollow noreferrer" target="_blank">第二个参数</a> this 的使用。</p>
<p>往常都习惯这么做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const self = this
arr.forEach(function(item) {
    // do something with this
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> self = <span class="hljs-keyword">this</span>
arr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>) </span>{
    <span class="hljs-comment">// do something with this</span>
})</code></pre>
<p>然而如果使用第二个参数就可以这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.forEach(function(item) {
    // do something with this
}, this)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">arr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>) </span>{
    <span class="hljs-comment">// do something with this</span>
}, <span class="hljs-keyword">this</span>)</code></pre>
<p>省去了一个中间的self，看起来更优美了</p>
<p>那么有没有更好的处理方式呢？</p>
<p>有的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.forEach(item => {
    // do something
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">arr.forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
    <span class="hljs-comment">// do something</span>
})</code></pre>
<p>由于 arrow function 的特性，自动绑定父 scope 的 this， 会更加简洁，而且少了个<code>function</code>关键字，可读性更好。</p>
<h2 id="articleHeader1">for</h2>
<p>说到循环必定要说到for循环了。js里面的for循环有好几种使用方式：</p>
<p>C 系列 for 循环：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let index = 0; index < arr.length; index++) {
    // do something
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> index = <span class="hljs-number">0</span>; index &lt; arr.length; index++) {
    <span class="hljs-comment">// do something</span>
}</code></pre>
<p>index 是 arr 的索引，在循环体中通过 <code>arr[index]</code> 调用当前的元素，我非常不喜欢这种方式，因为要写两个分号！</p>
<p>还有另一种比较简单的方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let key in obj) {
    // do something
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> obj) {
    <span class="hljs-comment">// do something</span>
}</code></pre>
<p>不过这个方式一般用来遍历对象，下文有说。</p>
<p>关于 for 循环还有 ES2015 规定的一种</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let item of arr) {
    // do something
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> item <span class="hljs-keyword">of</span> arr) {
    <span class="hljs-comment">// do something</span>
}</code></pre>
<p>这种遍历方式和之前的最大区别在于<code>item</code>，它是<strong>value</strong>而非<strong>key</strong>，可以直接迭代出内容。</p>
<p>不过这种方式我个人用的不多，因为很多情况下我更喜欢用array下的方法。对于对象的遍历更倾向于<code>for...in</code></p>
<h2 id="articleHeader2">map 系列</h2>
<p>这一块是js的函数式领域了。</p>
<p><code>Array.prototype</code>下挂载着几个非常好用的遍历函数。比如<code>map</code></p>
<p>它会遍历arr下的所有内容，做操作之后返回数据，形成一个新的数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arr = [1, 2, 3]
arr.map(current => current * 5)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
arr.map(<span class="hljs-function"><span class="hljs-params">current</span> =&gt;</span> current * <span class="hljs-number">5</span>)</code></pre>
<p>在 react 最常用。经常用来遍历数据，形成dom：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="someRender() {
    return this.state.data.map((current, index) => {
        return <li key={index}>{ current }</li>
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">someRender() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.state.data.map(<span class="hljs-function">(<span class="hljs-params">current, index</span>) =&gt;</span> {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span>&gt;</span>{ current }<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    })
}</code></pre>
<p>不过 map 有一点不好的地方在于不能控制循环的流程，如果不能完成，就返回<strong>undefined</strong>继续下一次迭代。所以遇到可能会返回undefined的情况应该用forEach或者for循环遍历</p>
<p>还有filter用法和map一模一样，只是它用来过滤数据。非常的好用。</p>
<h2 id="articleHeader3">arguments</h2>
<p>说到遍历不得不提及<strong>arguments</strong>, 在function()中的所有参数，奇怪的是它并不是一个数组。只是一个类数组。</p>
<p>一般需要转成数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    const args = Array.prototype.slice.call(arguments)
    return Array.isArray(args)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> args = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>)
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.isArray(args)
}</code></pre>
<p>但是我个人并不认同这样的方法，有了新的 ES2015 就不要用这么丑的语法了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(...args) {
    // args 是数组
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">...args</span>) </span>{
    <span class="hljs-comment">// args 是数组</span>
}</code></pre>
<p>ES2015 的 rest 语法使得剩余参数都传入args里面，比之前的还要调Array的方法要轻松不少。</p>
<h2 id="articleHeader4">object</h2>
<p>对象的遍历是非常常用的功能。</p>
<p>我个人更喜欢用<code>for...in</code>语法，但是有一点需要注意：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let index in obj) {
    if(obj.hasOwnProperty(index)) {
        // do something
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> index <span class="hljs-keyword">in</span> obj) {
    <span class="hljs-keyword">if</span>(obj.hasOwnProperty(index)) {
        <span class="hljs-comment">// do something</span>
    }
}</code></pre>
<p>因为除非强制指定，否则对象都是不纯净的。都会有<code>__proto__</code>属性，也会被迭代出来。需要过滤一下。</p>
<p>好了，如何创建纯净的对象？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const plainObj = Object.create(null)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> plainObj = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>)</code></pre>
<p>最轻的obj结构，内部没有任何多余的属性。</p>
<blockquote><p><a href="https://annatarhe.github.io/2016/08/02/talk-about-iterator-start-with-foreach.html" rel="nofollow noreferrer" target="_blank">从 forEach 开始谈谈迭代</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从 forEach 开始谈谈遍历

## 原文链接
[https://segmentfault.com/a/1190000006162096](https://segmentfault.com/a/1190000006162096)

