---
title: '集合数据处理（C#、JavaScript 和 Java）' 
date: 2019-02-04 2:30:57
hidden: true
slug: 5tn3ayuid97
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>Java 丢了好多年，最近在拣起来，首先当然是了解这么多年来它的变化，于是发现了 Java 8 的<code>java.util.stream</code>。在学习和试验的过程中，相比较于 C# 和 javascript，有那么些心得，作文以记之。</p>
<p>早些时间写过一篇<a href="https://segmentfault.com/a/1190000003704450">《ES6 的 for..of 和 Generator，从伪数组 jQuery 对象说起》</a>，和这个主题有点关系。其实我记得还有一篇讲 C# 的，没找到，也许只是想过，没写成，成了虚假记忆。</p>
</blockquote>
<h2 id="articleHeader0">前言</h2>
<p>之所以把 C#、JavaScript 和 Java 三种语言的实现写在一起，主要是为了放在一起有一个类比，可能会有助于理解。</p>
<h4>集合数据</h4>
<p>C# 的集合数据基类是 <a href="https://msdn.microsoft.com/en-us/library/ms132397.aspx" rel="nofollow noreferrer" target="_blank">Collection&lt;T&gt;</a>，它实现了 <a href="https://msdn.microsoft.com/en-us/library/92t2ye13.aspx" rel="nofollow noreferrer" target="_blank">ICollection&lt;T&gt;</a>接口，而 <code>ICollection&lt;T&gt;</code> 又从 <a href="https://msdn.microsoft.com/en-us/library/9eekhta0.aspx" rel="nofollow noreferrer" target="_blank">IEnumerable&lt;T&gt;</a> 接口继承——实际上要讨论的内容都基于 <code>IEnumerable&lt;T&gt;</code> 接口。另外还有一个非泛型的 <code>IEnumerable</code> 接口，不过建议大家尽量使用泛型，所以这个非泛型的接口就当我没说。顺便提一句，数组也是实现了 <code>IEnumerable&lt;T&gt;</code> 接口的。<code>System.Linq</code> 中提供的扩展大大方便了集合处理过程。</p>
<p>JavaScript 最常见的集合数据类型就是数组，自 ES6 发布以后，这个范围扩展到了 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols" rel="nofollow noreferrer" target="_blank">iterable 对象</a>。不过这里要讨论的内容都是在 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype" rel="nofollow noreferrer" target="_blank">Array.prototype</a> 中实现的。除此之外，underscore、lodash 这些第三方库中也实现了很多集合数据处理的方法，但不在本文讨论内容之内。</p>
<p>Java 的集合类型由 <a href="https://docs.oracle.com/javase/8/docs/api/java/util/Collection.html" rel="nofollow noreferrer" target="_blank">Collection&lt;E&gt;</a> 接口定义。本文讨论的内容是 Java 8 的特性，在 <code>java.util.stream</code> 包中实现，由 <code>Collection&lt;E&gt;.stream()</code> 引入。</p>
<h4>示例语言版本</h4>
<blockquote><ul>
<li>后面示例中的部分 C# 语句可能需要支持 6.0 语言版本的编译器，如 Visual Studio 2015 或者 Visual Studio "15"</li>
<li>JavaScript 代码都使用了 ES6 语法，目前大部分浏览器支持，Node 5 也完全支持。</li>
<li>Java 要求 Java 8（或 1.8）版本</li>
</ul></blockquote>
<h2 id="articleHeader1">遍历</h2>
<h4>问题提出</h4>
<p>给定一个名称列表，数组类型， <code>["Andy", "Jackson", "Yoo"]</code>，要求遍历出到的控制台。</p>
<h4>C# 的遍历</h4>
<p>对于集合来说，最常用的就是遍历，不过 <code>for</code>，<code>foreach</code>, <code>while</code> 之类大家都耳熟能详了，不再多说。这里说的是 <code>forEach()</code> 方法。</p>
<p>很遗憾，C# 的 <a href="https://msdn.microsoft.com/en-us/library/system.linq.enumerable.aspx" rel="nofollow noreferrer" target="_blank">Linq 扩展</a> 里没有提供 <code>ForEach()</code> 方法，不过 <code>All(IEnumerable&lt;T&gt;, Func&lt;T, Boolean&gt;)</code> 和 <code>Any(IEnumerable&lt;T&gt;, Func&lt;T, Boolean&gt;)</code> 都可以代替。这两个方法的区别就在于第二个参数 <code>Func&lt;T, Boolean&gt;</code> 的返回值。这两个方法都会遍历集合，对集合中的每个元素依次调用第二个参数，<code>Func&lt;T, Boolean&gt;</code> 所指的委托方法，并检查其返回值，<code>All()</code> 检查到 <code>false</code> 中止遍历，而 <code>Any()</code> 检查到 <code>true</code> 中止遍历。</p>
<blockquote>
<p><code>All()</code> 的意思是，所有元素都符合条件则返回 <code>true</code>，所有只要有一个不符合条件，返回了 <code>false</code>，则中止遍历，返回 <code>false</code>；<code>Any()</code> 的意思是只要发现有元素符合条件则返回 <code>true</code>。</p>
<p><code>Func&lt;T, Boolean&gt;</code> 是一个公用委托。<code>Func&lt;...&gt;</code> 系列公用委托都用于委托带有返回值的的方法，所有 <code>Func&lt;..., TResult&gt;</code> 都是最后一个参数 <code>TResult</code> 代表返回值类型。</p>
</blockquote>
<p>因此，C# 的遍历输出可以这样实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="string[] names = { &quot;Andy&quot;, &quot;Jackson&quot;, &quot;Yoo&quot; };
names.All(name => {
    Console.WriteLine(name);
    return true;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="cs hljs"><code class="cs"><span class="hljs-keyword">string</span>[] names = { <span class="hljs-string">"Andy"</span>, <span class="hljs-string">"Jackson"</span>, <span class="hljs-string">"Yoo"</span> };
names.All(name =&gt; {
    Console.WriteLine(name);
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
});</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="string[] names = { &quot;Andy&quot;, &quot;Jackson&quot;, &quot;Yoo&quot; };
names.Any(name => {
    Console.WriteLine(name);
    return false;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="cs hljs"><code class="cs"><span class="hljs-keyword">string</span>[] names = { <span class="hljs-string">"Andy"</span>, <span class="hljs-string">"Jackson"</span>, <span class="hljs-string">"Yoo"</span> };
names.Any(name =&gt; {
    Console.WriteLine(name);
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
});</code></pre>
<blockquote><p>有 Lambda 就是好</p></blockquote>
<h4>JavaScript 的遍历</h4>
<p>JavaScript 的 Array 实现了 <code>forEach</code> 实例方法，即 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach" rel="nofollow noreferrer" target="_blank">Array.prototype.forEach()</a>。</p>
<p>对于 JavaScript 的数组，可以这样遍历</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var names = [&quot;Andy&quot;, &quot;Jackson&quot;, &quot;Yoo&quot;];
names.forEach(name => {
    console.log(name);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> names = [<span class="hljs-string">"Andy"</span>, <span class="hljs-string">"Jackson"</span>, <span class="hljs-string">"Yoo"</span>];
names.forEach(<span class="hljs-function"><span class="hljs-params">name</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(name);
});</code></pre>
<p>对于 JavaScript 的伪数组，可以这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var names = {
    0: &quot;Andy&quot;,
    1: &quot;Jackson&quot;,
    2: &quot;Yoo&quot;,
    length: 3
};

[].forEach.call(names, name => {
    console.log(name);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> names = {
    <span class="hljs-number">0</span>: <span class="hljs-string">"Andy"</span>,
    <span class="hljs-number">1</span>: <span class="hljs-string">"Jackson"</span>,
    <span class="hljs-number">2</span>: <span class="hljs-string">"Yoo"</span>,
    <span class="hljs-attr">length</span>: <span class="hljs-number">3</span>
};

[].forEach.call(names, name =&gt; {
    <span class="hljs-built_in">console</span>.log(name);
});</code></pre>
<h4>jQuery 的遍历</h4>
<p>jQuery 是一个常用的 JavaScript 库，它封装的对象都是基于伪数组的，所以 jQuery 中经常用到遍历。除了网页元素集合外，jQuery 也可以遍历普通数组，有两种方式</p>
<p>可以直接把数组作为第一个参数，处理函数作为第二个参数调用 <code>$.each()</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const names = [&quot;Andy&quot;, &quot;Jackson&quot;, &quot;Yoo&quot;];
$.each(names, (i, name) => {
    console.log(name);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> names = [<span class="hljs-string">"Andy"</span>, <span class="hljs-string">"Jackson"</span>, <span class="hljs-string">"Yoo"</span>];
$.each(names, (i, name) =&gt; {
    <span class="hljs-built_in">console</span>.log(name);
});</code></pre>
<p>也可以把数组封装成一个 jQuery 对象（<code>$(names)</code>），再在这个 jQuery 对象上调用 <code>eash()</code> 方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const names = [&quot;Andy&quot;, &quot;Jackson&quot;, &quot;Yoo&quot;];
$(names).each((i, name) => {
    console.log(name);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> names = [<span class="hljs-string">"Andy"</span>, <span class="hljs-string">"Jackson"</span>, <span class="hljs-string">"Yoo"</span>];
$(names).each(<span class="hljs-function">(<span class="hljs-params">i, name</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(name);
});</code></pre>
<p>两种方法的处理函数都一样，但是要注意，这和原生 <code>forEach()</code> 的处理函数有点不同。jQuery 的 <code>each()</code> 处理函数，第一个参数是序号，第二个参数是数组元素；而原生 <code>forEach()</code> 的处理函数正好相反，第一个参数是数组元素，第二个参数才是序号。</p>
<p>另外，<code>$.each()</code> 对伪数组同样适用，不需要通过 <code>call()</code> 来调用。</p>
<h4>Java 的遍历</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="String[] names = { &quot;Andy&quot;, &quot;Jackson&quot;, &quot;Yoo&quot; };
List<String> list = Arrays.asList(names);
list.forEach(name -> {
    System.out.println(name);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java">String[] names = { <span class="hljs-string">"Andy"</span>, <span class="hljs-string">"Jackson"</span>, <span class="hljs-string">"Yoo"</span> };
List&lt;String&gt; list = Arrays.asList(names);
list.forEach(name -&gt; {
    System.out.println(name);
});</code></pre>
<h2 id="articleHeader2">过滤（筛选）数据</h2>
<h4>问题提出</h4>
<p>给出一组整数，需要将其中能被 3 整除选出来</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[46, 74, 20, 37, 98, 93, 98, 48, 33, 15]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code style="word-break: break-word; white-space: initial;">[<span class="hljs-number">46</span>, <span class="hljs-number">74</span>, <span class="hljs-number">20</span>, <span class="hljs-number">37</span>, <span class="hljs-number">98</span>, <span class="hljs-number">93</span>, <span class="hljs-number">98</span>, <span class="hljs-number">48</span>, <span class="hljs-number">33</span>, <span class="hljs-number">15</span>]</code></pre>
<p>期望结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[93, 48, 33, 15]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code style="word-break: break-word; white-space: initial;">[<span class="hljs-number">93</span>, <span class="hljs-number">48</span>, <span class="hljs-number">33</span>, <span class="hljs-number">15</span>]</code></pre>
<h4>C# 中过滤使用 <code>Where()</code> 扩展</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="int[] data = { 46, 74, 20, 37, 98, 93, 98, 48, 33, 15 };
int[] result = data.Where(n => n % 3 == 0).ToArray();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="cs hljs"><code class="cs"><span class="hljs-keyword">int</span>[] data = { <span class="hljs-number">46</span>, <span class="hljs-number">74</span>, <span class="hljs-number">20</span>, <span class="hljs-number">37</span>, <span class="hljs-number">98</span>, <span class="hljs-number">93</span>, <span class="hljs-number">98</span>, <span class="hljs-number">48</span>, <span class="hljs-number">33</span>, <span class="hljs-number">15</span> };
<span class="hljs-keyword">int</span>[] result = data.Where(n =&gt; n % <span class="hljs-number">3</span> == <span class="hljs-number">0</span>).ToArray();</code></pre>
<p>注意：<code>Where()</code> 的结果即不是数组也不是 List，需要通过 <code>ToArray()</code> 生成数组，或者通过 <code>ToList()</code> 生成列表。Linq 要在 <code>ToArray()</code> 或者 <code>ToList()</code> 或者其它某些操作的时候才会真正遍历，依次执行 <code>Where()</code> 参数提供的那个筛选函数。</p>
<h4>JavaScript 中有 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter" rel="nofollow noreferrer" target="_blank">Array.prototype.filter</a>
</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const data = [46, 74, 20, 37, 98, 93, 98, 48, 33, 15];
const result = data.filter(n => {
    return n % 3 === 0;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> data = [<span class="hljs-number">46</span>, <span class="hljs-number">74</span>, <span class="hljs-number">20</span>, <span class="hljs-number">37</span>, <span class="hljs-number">98</span>, <span class="hljs-number">93</span>, <span class="hljs-number">98</span>, <span class="hljs-number">48</span>, <span class="hljs-number">33</span>, <span class="hljs-number">15</span>];
<span class="hljs-keyword">const</span> result = data.filter(<span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> n % <span class="hljs-number">3</span> === <span class="hljs-number">0</span>;
});</code></pre>
<h4>Java 中使用到 <a href="http://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html" rel="nofollow noreferrer" target="_blank">java.util.stream.*</a>
</h4>
<p>Java 中可以通过 <code>java.util.stream.IntStream.of()</code> 来从数组生成 stream 对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="final int[] data = { 46, 74, 20, 37, 98, 93, 98, 48, 33, 15 };
int[] result = IntStream.of(data)
        .filter(n -> n % 3 == 0)
        .toArray();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-keyword">final</span> <span class="hljs-keyword">int</span>[] data = { <span class="hljs-number">46</span>, <span class="hljs-number">74</span>, <span class="hljs-number">20</span>, <span class="hljs-number">37</span>, <span class="hljs-number">98</span>, <span class="hljs-number">93</span>, <span class="hljs-number">98</span>, <span class="hljs-number">48</span>, <span class="hljs-number">33</span>, <span class="hljs-number">15</span> };
<span class="hljs-keyword">int</span>[] result = IntStream.of(data)
        .filter(n -&gt; n % <span class="hljs-number">3</span> == <span class="hljs-number">0</span>)
        .toArray();</code></pre>
<p>需要注意的是，<code>Arrays.asList(data).stream()</code> 看起来也可以生成 stream 对象，但是通过调试会发现，这是一个 <code>Stream&lt;int[]&gt;</code> 而不是 <code>Stream&lt;Integer&gt;</code>。原因是 <code>asList(T ...a)</code> 其参数可变参数，而且要求参数类型是类，所以 <code>asList(data)</code> 是把 <code>data</code> 作为一个 <code>int[]</code> 类型参数而不是 <code>int</code> 类型的参数数据。如果要从 <code>int[]</code> 生成 <code>List&lt;Integer&gt;</code>，还得通过 <code>IntStream</code> 来处理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="List<Integer> list = IntStream.of(data)
        .boxed()
        .collect(Collectors.toList());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java">List&lt;Integer&gt; list = IntStream.of(data)
        .boxed()
        .collect(Collectors.toList());</code></pre>
<h2 id="articleHeader3">映射处理</h2>
<p>映射处理是指将某种类型的集合，将其元素依次映射成另一种类型，产生一个新类型的集合。新集合中的每个元素都与原集中的同样位置的元素有对应关系。</p>
<h4>问题提出</h4>
<p>这里提出一个精典的问题：成绩转等级，不过为了简化代码（switch 或多重 if 语句代码比较长），改为判断成绩是否及格，60 分为及格线。</p>
<p>偷个懒，就用上个问题的输入 <code>[46, 74, 20, 37, 98, 93, 98, 48, 33, 15]</code>，</p>
<p>期望结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[&quot;REJECT&quot;,&quot;PASS&quot;,&quot;REJECT&quot;,&quot;REJECT&quot;,&quot;PASS&quot;,&quot;PASS&quot;,&quot;PASS&quot;,&quot;REJECT&quot;,&quot;REJECT&quot;,&quot;REJECT&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code style="word-break: break-word; white-space: initial;">[<span class="hljs-string">"REJECT"</span>,<span class="hljs-string">"PASS"</span>,<span class="hljs-string">"REJECT"</span>,<span class="hljs-string">"REJECT"</span>,<span class="hljs-string">"PASS"</span>,<span class="hljs-string">"PASS"</span>,<span class="hljs-string">"PASS"</span>,<span class="hljs-string">"REJECT"</span>,<span class="hljs-string">"REJECT"</span>,<span class="hljs-string">"REJECT"</span>]</code></pre>
<h4>C# 通过 <code>Select()</code> 来进行映射处理。</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="int[] scores = { 46, 74, 20, 37, 98, 93, 98, 48, 33, 15 };
string[] levels = scores
    .Select(score => score >= 60 ? &quot;PASS&quot; : &quot;REJECT&quot;)
    .ToArray();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="cs hljs"><code class="cs"><span class="hljs-keyword">int</span>[] scores = { <span class="hljs-number">46</span>, <span class="hljs-number">74</span>, <span class="hljs-number">20</span>, <span class="hljs-number">37</span>, <span class="hljs-number">98</span>, <span class="hljs-number">93</span>, <span class="hljs-number">98</span>, <span class="hljs-number">48</span>, <span class="hljs-number">33</span>, <span class="hljs-number">15</span> };
<span class="hljs-keyword">string</span>[] levels = scores
    .Select(score =&gt; score &gt;= <span class="hljs-number">60</span> ? <span class="hljs-string">"PASS"</span> : <span class="hljs-string">"REJECT"</span>)
    .ToArray();</code></pre>
<h4>JavaScript 通过 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map" rel="nofollow noreferrer" target="_blank">Array.prototype.map</a> 来进行映射处理。</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const scores = [46, 74, 20, 37, 98, 93, 98, 48, 33, 15];
const levels = scores.map(score => {
    return score >= 60 ? &quot;PASS&quot; : &quot;REJECT&quot;;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> scores = [<span class="hljs-number">46</span>, <span class="hljs-number">74</span>, <span class="hljs-number">20</span>, <span class="hljs-number">37</span>, <span class="hljs-number">98</span>, <span class="hljs-number">93</span>, <span class="hljs-number">98</span>, <span class="hljs-number">48</span>, <span class="hljs-number">33</span>, <span class="hljs-number">15</span>];
<span class="hljs-keyword">const</span> levels = scores.map(<span class="hljs-function"><span class="hljs-params">score</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> score &gt;= <span class="hljs-number">60</span> ? <span class="hljs-string">"PASS"</span> : <span class="hljs-string">"REJECT"</span>;
});</code></pre>
<h4>Java 的 Stream 提供了 <code>mapToObj()</code> 等方法处理映射</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="final int[] scores = { 46, 74, 20, 37, 98, 93, 98, 48, 33, 15 };
String[] levels = IntStream.of(scores)
        .mapToObj(score -> score >= 60 ? &quot;PASS&quot; : &quot;REJECT&quot;)
        .toArray(String[]::new);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-keyword">final</span> <span class="hljs-keyword">int</span>[] scores = { <span class="hljs-number">46</span>, <span class="hljs-number">74</span>, <span class="hljs-number">20</span>, <span class="hljs-number">37</span>, <span class="hljs-number">98</span>, <span class="hljs-number">93</span>, <span class="hljs-number">98</span>, <span class="hljs-number">48</span>, <span class="hljs-number">33</span>, <span class="hljs-number">15</span> };
String[] levels = IntStream.of(scores)
        .mapToObj(score -&gt; score &gt;= <span class="hljs-number">60</span> ? <span class="hljs-string">"PASS"</span> : <span class="hljs-string">"REJECT"</span>)
        .toArray(String[]::<span class="hljs-keyword">new</span>);</code></pre>
<p>与“筛选”示例不同，在“筛选”示例中，由于筛选结果是 <code>IntStream</code>，可以直接调用 <code>InStream::toArray()</code> 来得到 <code>int[]</code>。</p>
<p>但在这个示例中，<code>mapToObj()</code> 得到的是一个 <code>Stream&lt;String&gt;</code>，类型擦除后就是 <code>Stream</code>，所以 <code>Stream::toArray()</code> 默认得到的是一个 <code>Object[]</code> 而不是 <code>String[]</code>。如果想得到 <code>String[]</code>，需要为 <code>toArray()</code> 指定 <code>String[]</code> 的构造函数，即 <code>String[]::new</code>。</p>
<h2 id="articleHeader4">生成查找表（如哈希表）</h2>
<p>查找表在数据结构里的意义还是比较宽的，其中通过哈希算法实现的称为哈希表。C# 中通常是用 <code>Directory&lt;T&gt;</code>，不过它是不是通过哈希实现我就不清楚了。不过 Java 中的 <code>HashMap</code> 和 <code>Hashtable</code>，从名称就看得出来是实现。JavaScript 的字面对象据称也是哈希实现。</p>
<h4>提出问题</h4>
<p>现在有一个姓名列表，是按学号从 1~7 排列的，需要建立一个查找到，使之能通过姓名很容易找到对应的学号。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[&quot;Andy&quot;, &quot;Jackson&quot;, &quot;Yoo&quot;, &quot;Rose&quot;, &quot;Lena&quot;, &quot;James&quot;, &quot;Stephen&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code style="word-break: break-word; white-space: initial;">[<span class="hljs-string">"Andy"</span>, <span class="hljs-string">"Jackson"</span>, <span class="hljs-string">"Yoo"</span>, <span class="hljs-string">"Rose"</span>, <span class="hljs-string">"Lena"</span>, <span class="hljs-string">"James"</span>, <span class="hljs-string">"Stephen"</span>]</code></pre>
<p>期望结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Andy    => 1
Jackson => 2
Yoo     => 3
Rose    => 4
Lena    => 5
James   => 6
Stephen => 7  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code><span class="hljs-attr">Andy</span>    =&gt; <span class="hljs-number">1</span>
<span class="hljs-attr">Jackson</span> =&gt; <span class="hljs-number">2</span>
<span class="hljs-attr">Yoo</span>     =&gt; <span class="hljs-number">3</span>
<span class="hljs-attr">Rose</span>    =&gt; <span class="hljs-number">4</span>
<span class="hljs-attr">Lena</span>    =&gt; <span class="hljs-number">5</span>
<span class="hljs-attr">James</span>   =&gt; <span class="hljs-number">6</span>
<span class="hljs-attr">Stephen</span> =&gt; <span class="hljs-number">7</span>  </code></pre>
<h4>C# 使用 ToDictionary()</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="string[] names = { &quot;Andy&quot;, &quot;Jackson&quot;, &quot;Yoo&quot;, &quot;Rose&quot;, &quot;Lena&quot;, &quot;James&quot;, &quot;Stephen&quot; };
int i = 1;
Dictionary<string, int> map = names.ToDictionary(n => n, n => i++);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="cs hljs"><code class="cs"><span class="hljs-keyword">string</span>[] names = { <span class="hljs-string">"Andy"</span>, <span class="hljs-string">"Jackson"</span>, <span class="hljs-string">"Yoo"</span>, <span class="hljs-string">"Rose"</span>, <span class="hljs-string">"Lena"</span>, <span class="hljs-string">"James"</span>, <span class="hljs-string">"Stephen"</span> };
<span class="hljs-keyword">int</span> i = <span class="hljs-number">1</span>;
Dictionary&lt;<span class="hljs-keyword">string</span>, <span class="hljs-keyword">int</span>&gt; map = names.ToDictionary(n =&gt; n, n =&gt; i++);</code></pre>
<p>C# Linq 扩展提供的若干方法都没有将序号传递给处理函数，所以上例中采用了临时变量计数的方式来进行。不过有一个看起来好看一点的办法，用 <a href="https://msdn.microsoft.com/zh-cn/library/system.linq.enumerable.range.aspx" rel="nofollow noreferrer" target="_blank">Enumerable.Range()</a> 先生成一个序号的序列，再基于这个序列来处理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="string[] names = { &quot;Andy&quot;, &quot;Jackson&quot;, &quot;Yoo&quot;, &quot;Rose&quot;, &quot;Lena&quot;, &quot;James&quot;, &quot;Stephen&quot; };
IEnumerable<int> indexes = Enumerable.Range(0, names.Length);
Dictionary<string, int> map = indexes.ToDictionary(i => names[i], i => i + 1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="cs hljs"><code class="cs"><span class="hljs-keyword">string</span>[] names = { <span class="hljs-string">"Andy"</span>, <span class="hljs-string">"Jackson"</span>, <span class="hljs-string">"Yoo"</span>, <span class="hljs-string">"Rose"</span>, <span class="hljs-string">"Lena"</span>, <span class="hljs-string">"James"</span>, <span class="hljs-string">"Stephen"</span> };
IEnumerable&lt;<span class="hljs-keyword">int</span>&gt; indexes = Enumerable.Range(<span class="hljs-number">0</span>, names.Length);
Dictionary&lt;<span class="hljs-keyword">string</span>, <span class="hljs-keyword">int</span>&gt; map = indexes.ToDictionary(i =&gt; names[i], i =&gt; i + <span class="hljs-number">1</span>);</code></pre>
<h4>JavaScript 的两种处理办法</h4>
<p>JavaScript 没有提供从 <code>[]</code> 到 <code>{}</code> 的转换函数，不过要做这个转换也不是好麻烦，用 <code>forEach</code> 遍历即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var map = (function() {
    var m = {};
    names.forEach((name, i) => {
        m[name] = i + 1;
    });
    return m;
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> map = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> m = {};
    names.forEach(<span class="hljs-function">(<span class="hljs-params">name, i</span>) =&gt;</span> {
        m[name] = i + <span class="hljs-number">1</span>;
    });
    <span class="hljs-keyword">return</span> m;
})();</code></pre>
<p>为了不让临时变量污染外面的作用域，上面的示例中采用了 <a href="http://blog.csdn.net/ebw123/article/details/42428451" rel="nofollow noreferrer" target="_blank">IEFE</a> 的写法。不过，如果用 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce" rel="nofollow noreferrer" target="_blank">Array.prototype.reduce</a> 则可以让代码更简洁一些</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var map = names.reduce((m, name, i) => {
    m[name]  = i + 1;
    return m;
}, {});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> map = names.reduce(<span class="hljs-function">(<span class="hljs-params">m, name, i</span>) =&gt;</span> {
    m[name]  = i + <span class="hljs-number">1</span>;
    <span class="hljs-keyword">return</span> m;
}, {});</code></pre>
<h4>Java 的 <a href="https://docs.oracle.com/javase/8/docs/api/java/util/stream/Collectors.html" rel="nofollow noreferrer" target="_blank">Collectors</a>
</h4>
<p>Java 的处理函数也没有传入序号，所以在 Java 中的实例和 C# 类似。不过，第一种方法不可用，因为 Java Lambda 的实现相当于是匿名类对接口的实现，只能访问局部的 <code>final</code> 变量，<code>i</code> 要执行 <code>i++</code> 操作，显然不是 <code>final</code> 的，所以只能用第二种办法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="final String[] names = { &quot;Andy&quot;, &quot;Jackson&quot;, &quot;Yoo&quot;, &quot;Rose&quot;, &quot;Lena&quot;, &quot;James&quot;, &quot;Stephen&quot; };
Map<String, Integer> map = IntStream.range(0, names.length)
    .boxed()
    .collect(Collectors.toMap(i -> names[i], i -> i + 1));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-keyword">final</span> String[] names = { <span class="hljs-string">"Andy"</span>, <span class="hljs-string">"Jackson"</span>, <span class="hljs-string">"Yoo"</span>, <span class="hljs-string">"Rose"</span>, <span class="hljs-string">"Lena"</span>, <span class="hljs-string">"James"</span>, <span class="hljs-string">"Stephen"</span> };
Map&lt;String, Integer&gt; map = IntStream.range(<span class="hljs-number">0</span>, names.length)
    .boxed()
    .collect(Collectors.toMap(i -&gt; names[i], i -&gt; i + <span class="hljs-number">1</span>));</code></pre>
<blockquote><p>我只能说 <code>.boxed()</code> 是个大坑啊，一定要记得调。</p></blockquote>
<h2 id="articleHeader5">汇总和聚合处理</h2>
<p>汇总处理就是合计啊，平均数啊之类的，使用方式都差不多，所以以合计（Sum）为例。</p>
<p>汇总处理其实是聚合处理的一个特例，所以就同一个问题，再用普通的聚合处理方式再实现一次。</p>
<h4>问题提出</h4>
<p>已知全班成绩，求班总分，再次用到了那个数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[46, 74, 20, 37, 98, 93, 98, 48, 33, 15]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code style="word-break: break-word; white-space: initial;">[<span class="hljs-number">46</span>, <span class="hljs-number">74</span>, <span class="hljs-number">20</span>, <span class="hljs-number">37</span>, <span class="hljs-number">98</span>, <span class="hljs-number">93</span>, <span class="hljs-number">98</span>, <span class="hljs-number">48</span>, <span class="hljs-number">33</span>, <span class="hljs-number">15</span>]</code></pre>
<p>期望结果：<code>562</code></p>
<h4>C# 的实现</h4>
<p>C# 可以直接使用 <code>Sum()</code> 方法求和</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="int[] scores = { 46, 74, 20, 37, 98, 93, 98, 48, 33, 15 };
int sum = scores.Sum();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="cs hljs"><code class="cs"><span class="hljs-keyword">int</span>[] scores = { <span class="hljs-number">46</span>, <span class="hljs-number">74</span>, <span class="hljs-number">20</span>, <span class="hljs-number">37</span>, <span class="hljs-number">98</span>, <span class="hljs-number">93</span>, <span class="hljs-number">98</span>, <span class="hljs-number">48</span>, <span class="hljs-number">33</span>, <span class="hljs-number">15</span> };
<span class="hljs-keyword">int</span> sum = scores.Sum();</code></pre>
<p>聚合实现方式（用 <code>Aggregate()</code>）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="int[] scores = { 46, 74, 20, 37, 98, 93, 98, 48, 33, 15 };
int sum = scores.Aggregate(0, (total, score) => {
    return total + score;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="cs hljs"><code class="cs"><span class="hljs-keyword">int</span>[] scores = { <span class="hljs-number">46</span>, <span class="hljs-number">74</span>, <span class="hljs-number">20</span>, <span class="hljs-number">37</span>, <span class="hljs-number">98</span>, <span class="hljs-number">93</span>, <span class="hljs-number">98</span>, <span class="hljs-number">48</span>, <span class="hljs-number">33</span>, <span class="hljs-number">15</span> };
<span class="hljs-keyword">int</span> sum = scores.Aggregate(<span class="hljs-number">0</span>, (total, score) =&gt; {
    <span class="hljs-keyword">return</span> total + score;
});</code></pre>
<p>聚合实现方式要灵活得多，比如，改成乘法就可以算阶乘。当然用于其它更复杂的情况也不在话下。前面生成查找表的 JavaScript 部分就是采用聚合来实现的。</p>
<h4>JavaScript 都是通过聚合来实现的</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const scores = [46, 74, 20, 37, 98, 93, 98, 48, 33, 15];
const sum = scores.reduce((total, score) => {
    return total + score;
}, 0);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> scores = [<span class="hljs-number">46</span>, <span class="hljs-number">74</span>, <span class="hljs-number">20</span>, <span class="hljs-number">37</span>, <span class="hljs-number">98</span>, <span class="hljs-number">93</span>, <span class="hljs-number">98</span>, <span class="hljs-number">48</span>, <span class="hljs-number">33</span>, <span class="hljs-number">15</span>];
<span class="hljs-keyword">const</span> sum = scores.reduce(<span class="hljs-function">(<span class="hljs-params">total, score</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> total + score;
}, <span class="hljs-number">0</span>);</code></pre>
<p>注意 C# 的初始值在前，JavaScript 的初始值在后，这是有区别的。参数顺序嘛，注意一下就行了。</p>
<h4>Java 中使用 Stream::reduce 进行聚合处理</h4>
<p><code>IntStream</code>  提供了 <code>sum()</code> 方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="final int[] scores = { 46, 74, 20, 37, 98, 93, 98, 48, 33, 15 };
final int sum = IntStream.of(scores).sum();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-keyword">final</span> <span class="hljs-keyword">int</span>[] scores = { <span class="hljs-number">46</span>, <span class="hljs-number">74</span>, <span class="hljs-number">20</span>, <span class="hljs-number">37</span>, <span class="hljs-number">98</span>, <span class="hljs-number">93</span>, <span class="hljs-number">98</span>, <span class="hljs-number">48</span>, <span class="hljs-number">33</span>, <span class="hljs-number">15</span> };
<span class="hljs-keyword">final</span> <span class="hljs-keyword">int</span> sum = IntStream.of(scores).sum();</code></pre>
<p>同样也可以用 <code>reduce</code> 处理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="final int[] scores = { 46, 74, 20, 37, 98, 93, 98, 48, 33, 15 };
final int sum = IntStream.of(scores)
        .reduce(0, (total, score) -> total + score);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-keyword">final</span> <span class="hljs-keyword">int</span>[] scores = { <span class="hljs-number">46</span>, <span class="hljs-number">74</span>, <span class="hljs-number">20</span>, <span class="hljs-number">37</span>, <span class="hljs-number">98</span>, <span class="hljs-number">93</span>, <span class="hljs-number">98</span>, <span class="hljs-number">48</span>, <span class="hljs-number">33</span>, <span class="hljs-number">15</span> };
<span class="hljs-keyword">final</span> <span class="hljs-keyword">int</span> sum = IntStream.of(scores)
        .reduce(<span class="hljs-number">0</span>, (total, score) -&gt; total + score);</code></pre>
<h2 id="articleHeader6">综合应用</h2>
<h4>问题提出</h4>
<p>已知全班 7 个人，按学号 从 1~7 分别是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[&quot;Andy&quot;, &quot;Jackson&quot;, &quot;Yoo&quot;, &quot;Rose&quot;, &quot;Lena&quot;, &quot;James&quot;, &quot;Stephen&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code style="word-break: break-word; white-space: initial;">[<span class="hljs-string">"Andy"</span>, <span class="hljs-string">"Jackson"</span>, <span class="hljs-string">"Yoo"</span>, <span class="hljs-string">"Rose"</span>, <span class="hljs-string">"Lena"</span>, <span class="hljs-string">"James"</span>, <span class="hljs-string">"Stephen"</span>]</code></pre>
<p>这 7 个人的成绩按学号序，分别是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[66, 74, 43, 93, 98, 88, 83]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code style="word-break: break-word; white-space: initial;">[<span class="hljs-number">66</span>, <span class="hljs-number">74</span>, <span class="hljs-number">43</span>, <span class="hljs-number">93</span>, <span class="hljs-number">98</span>, <span class="hljs-number">88</span>, <span class="hljs-number">83</span>]</code></pre>
<p>有 <code>Student</code> 数组结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Student {
    number: int
    name: string
    score: int
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>Student {
    <span class="hljs-built_in">number</span>: <span class="hljs-built_in">int</span>
    name: <span class="hljs-built_in">string</span>
    score: <span class="hljs-built_in">int</span>
}</code></pre>
<p>要求得到全班 7 人的 student 数组，且该数组按分数从高到低排序</p>
<h4>C# 实现</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sealed class Student {
    public int Number { get; }
    public string Name { get; }
    public int Score { get; }
    
    public Student(int number, string name, int score) {
        Number = number;
        Name = name;
        Score = score;
    }
    
    public override string ToString() => $&quot;[{Number}] {Name} : {Score}&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="cs hljs"><code class="cs"><span class="hljs-keyword">sealed</span> <span class="hljs-keyword">class</span> <span class="hljs-title">Student</span> {
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">int</span> Number { <span class="hljs-keyword">get</span>; }
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">string</span> Name { <span class="hljs-keyword">get</span>; }
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">int</span> Score { <span class="hljs-keyword">get</span>; }
    
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-title">Student</span>(<span class="hljs-params"><span class="hljs-keyword">int</span> number, <span class="hljs-keyword">string</span> name, <span class="hljs-keyword">int</span> score</span>) </span>{
        Number = number;
        Name = name;
        Score = score;
    }
    
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">override</span> <span class="hljs-keyword">string</span> <span class="hljs-title">ToString</span>(<span class="hljs-params"></span>) </span>=&gt; <span class="hljs-string">$"[<span class="hljs-subst">{Number}</span>] <span class="hljs-subst">{Name}</span> : <span class="hljs-subst">{Score}</span>"</span>;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Student[] students = Enumerable.Range(0, names.Length)
    .Select(i => new Student(i + 1, names[i], scores[i]))
    .OrderByDescending(s => s.Score)
    .ToArray();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="cs hljs"><code class="cs">Student[] students = Enumerable.Range(<span class="hljs-number">0</span>, names.Length)
    .Select(i =&gt; <span class="hljs-keyword">new</span> Student(i + <span class="hljs-number">1</span>, names[i], scores[i]))
    .OrderByDescending(s =&gt; s.Score)
    .ToArray();</code></pre>
<p>注意 C# 中排序有 <code>OrderBy</code> 和 <code>OrderByDescending</code> 两个方法，一般情况下只需要给一个映射函数，从原数据里找到要用于比较的数据即可使用其 <code>&gt;</code>、<code>&lt;</code> 等运算符进行比较。如果比例起来比较复杂的，需要提供第二个参数，一个 <code>IComparer&lt;T&gt;</code> 的实现</p>
<h4>JavaScript 实现</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Student {
    constructor(number, name, score) {
        this._number = number;
        this._name = name;
        this._score = score;
    }

    get number() {
        return this._number;
    }

    get name() {
        return this._name;
    }

    get score() {
        return this._score;
    }

    toString() {
        return `[${this.number}] ${this.name} : ${this.score}`;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Student</span> </span>{
    <span class="hljs-keyword">constructor</span>(number, name, score) {
        <span class="hljs-keyword">this</span>._number = number;
        <span class="hljs-keyword">this</span>._name = name;
        <span class="hljs-keyword">this</span>._score = score;
    }

    get number() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._number;
    }

    get name() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._name;
    }

    get score() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._score;
    }

    toString() {
        <span class="hljs-keyword">return</span> <span class="hljs-string">`[<span class="hljs-subst">${<span class="hljs-keyword">this</span>.number}</span>] <span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span> : <span class="hljs-subst">${<span class="hljs-keyword">this</span>.score}</span>`</span>;
    }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const names = [&quot;Andy&quot;, &quot;Jackson&quot;, &quot;Yoo&quot;, &quot;Rose&quot;, &quot;Lena&quot;, &quot;James&quot;, &quot;Stephen&quot;];
const scores = [66, 74, 43, 93, 98, 88, 83];

var students = names
    .map((name, i) => new Student(i + 1, name, scores[i]))
    .sort((a, b) => {
        return b.score - a.score;
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> names = [<span class="hljs-string">"Andy"</span>, <span class="hljs-string">"Jackson"</span>, <span class="hljs-string">"Yoo"</span>, <span class="hljs-string">"Rose"</span>, <span class="hljs-string">"Lena"</span>, <span class="hljs-string">"James"</span>, <span class="hljs-string">"Stephen"</span>];
<span class="hljs-keyword">const</span> scores = [<span class="hljs-number">66</span>, <span class="hljs-number">74</span>, <span class="hljs-number">43</span>, <span class="hljs-number">93</span>, <span class="hljs-number">98</span>, <span class="hljs-number">88</span>, <span class="hljs-number">83</span>];

<span class="hljs-keyword">var</span> students = names
    .map(<span class="hljs-function">(<span class="hljs-params">name, i</span>) =&gt;</span> <span class="hljs-keyword">new</span> Student(i + <span class="hljs-number">1</span>, name, scores[i]))
    .sort(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> {
        <span class="hljs-keyword">return</span> b.score - a.score;
    });</code></pre>
<p>JavaScript 的排序则是直接给个比较函数，根据返回的数值小于0、等于0或大于0来判断是小于、等于还是大于。</p>
<h4>Java 实现</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="final class Student {
    private int number;
    private String name;
    private int score;

    public Student(int number, String name, int score) {
        this.number = number;
        this.name = name;
        this.score = score;
    }

    public int getNumber() {
        return number;
    }

    public String getName() {
        return name;
    }

    public int getScore() {
        return score;
    }

    @Override
    public String toString() {
        return String.format(&quot;[%d] %s : %d&quot;, getNumber(), getName(), getScore());
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-keyword">final</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Student</span> </span>{
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">int</span> number;
    <span class="hljs-keyword">private</span> String name;
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">int</span> score;

    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-title">Student</span><span class="hljs-params">(<span class="hljs-keyword">int</span> number, String name, <span class="hljs-keyword">int</span> score)</span> </span>{
        <span class="hljs-keyword">this</span>.number = number;
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.score = score;
    }

    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">int</span> <span class="hljs-title">getNumber</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> number;
    }

    <span class="hljs-function"><span class="hljs-keyword">public</span> String <span class="hljs-title">getName</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> name;
    }

    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">int</span> <span class="hljs-title">getScore</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> score;
    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-function"><span class="hljs-keyword">public</span> String <span class="hljs-title">toString</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> String.format(<span class="hljs-string">"[%d] %s : %d"</span>, getNumber(), getName(), getScore());
    }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="final String[] names = { &quot;Andy&quot;, &quot;Jackson&quot;, &quot;Yoo&quot;, &quot;Rose&quot;, &quot;Lena&quot;, &quot;James&quot;, &quot;Stephen&quot; };
final int[] scores = { 66, 74, 43, 93, 98, 88, 83 };
Student[] students = IntStream.range(0, names.length)
        .mapToObj(i -> new Student(i + 1, names[i], scores[i]))
        .sorted((a, b) -> b.getScore() - a.getScore())
        .toArray(Student[]::new);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-keyword">final</span> String[] names = { <span class="hljs-string">"Andy"</span>, <span class="hljs-string">"Jackson"</span>, <span class="hljs-string">"Yoo"</span>, <span class="hljs-string">"Rose"</span>, <span class="hljs-string">"Lena"</span>, <span class="hljs-string">"James"</span>, <span class="hljs-string">"Stephen"</span> };
<span class="hljs-keyword">final</span> <span class="hljs-keyword">int</span>[] scores = { <span class="hljs-number">66</span>, <span class="hljs-number">74</span>, <span class="hljs-number">43</span>, <span class="hljs-number">93</span>, <span class="hljs-number">98</span>, <span class="hljs-number">88</span>, <span class="hljs-number">83</span> };
Student[] students = IntStream.range(<span class="hljs-number">0</span>, names.length)
        .mapToObj(i -&gt; <span class="hljs-keyword">new</span> Student(i + <span class="hljs-number">1</span>, names[i], scores[i]))
        .sorted((a, b) -&gt; b.getScore() - a.getScore())
        .toArray(Student[]::<span class="hljs-keyword">new</span>);</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
集合数据处理（C#、JavaScript 和 Java）

## 原文链接
[https://segmentfault.com/a/1190000006884402](https://segmentfault.com/a/1190000006884402)

