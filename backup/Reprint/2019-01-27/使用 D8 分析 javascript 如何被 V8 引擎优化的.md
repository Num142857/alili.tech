---
title: '使用 D8 分析 javascript 如何被 V8 引擎优化的' 
date: 2019-01-27 2:30:59
hidden: true
slug: gltfbih2kd
categories: [reprint]
---

{{< raw >}}

                    
<p>在上一篇文章中我们讲了<a href="https://zhuanlan.zhihu.com/p/25120909" rel="nofollow noreferrer" target="_blank">如何使用 GN 编译 V8 源码</a>，文章最后编译完成的可执行文件并不是 V8，而是 D8。这篇我们讲一下如何使用 D8 调试 javascript 代码。</p>
<p><strong>如果没有 d8，可以使用 node 代替。</strong></p>
<p>新建文件 <a href="https://github.com/justjavac/v8-source-read/blob/master/src/add-of-ints.js" rel="nofollow noreferrer" target="_blank">add-of-ints.js</a>，输入以下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(obj) {
    return obj.prop + obj.prop;
}

const length = 1000 * 1000;

const o = { prop: 1 };

for (let i = 0; i < length; i++) {
    add(o);

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span><span class="hljs-params">(obj)</span> {</span>
    <span class="hljs-keyword">return</span> obj.prop + obj.prop;
}

const <span class="hljs-built_in">length</span> = <span class="hljs-number">1000</span> * <span class="hljs-number">1000</span>;

const o = { prop: <span class="hljs-number">1</span> };

<span class="hljs-keyword">for</span> (let <span class="hljs-built_in">i</span> = <span class="hljs-number">0</span>; <span class="hljs-built_in">i</span> &lt; <span class="hljs-built_in">length</span>; <span class="hljs-built_in">i</span>++) {
    add(o);

}</code></pre>
<p>运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="d8 --trace-opt-verbose add-of-ints.js
或
node --trace-opt-verbose add-of-ints.js
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>d8 --trace-opt-verbose <span class="hljs-keyword">add</span><span class="bash">-of-ints.js
</span>或
node --trace-opt-verbose <span class="hljs-keyword">add</span><span class="bash">-of-ints.js
</span></code></pre>
<p>输出结果为：</p>
<p><span class="img-wrap"><img data-src="/img/bVIWRS?w=3174&amp;h=496" src="https://static.alili.tech/img/bVIWRS?w=3174&amp;h=496" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>从输出结果我们可以看到 add 函数被编译器优化了，并且解释了优化的原因。ICs 是 <a href="https://en.wikipedia.org/wiki/Inline_caching" rel="nofollow noreferrer" target="_blank">inline caches</a> 的缩写，内联缓存是一种很常见的优化技术，这段简短的代码被 V8 引擎优化了两次，但是原因却不同。</p>
<ul>
<li><p>第一次优化的原因是 small function，add 函数是小函数，为了减小函数调用的开销，V8 引擎对 add 做了优化。</p></li>
<li><p>第二次的原因是 hot and stable，我在知乎另一个问题中曾说过，V8 有两个编译器，一个通用编译器，负责将 javascript 代码编译为机器码，另一个是优化编译器。从上面的输出可以看出 V8 使用的优化编译器引擎是 Crankshaft。Crankshaft 负责找出经常被调用的代码，做内联缓存优化，后面的信息进一步说明了这个情况：ICs with typeinfo: 7/7 (100%), generic ICs: 0/7 (0%)。</p></li>
</ul>
<p>在此再纠正之前的 2 个问题。</p>
<p>一个是 <del>V8 没有解释器，只有编译器，代码是直接编译成机器吗执行的</del>，这是之前的 V8，而网络上关于 V8 的文章也大多比较老旧。这几天为了阅读 V8 源码查看了网上很多关于 V8 的论文和文章，发现 V8 已经引进了<a href="https://docs.google.com/document/d/11T2CRex9hXxoJwbYqVQ32yIPMh0uouUZLdyrtmMoL44/edit#" rel="nofollow noreferrer" target="_blank">解释器</a>。因为 V8 不仅仅可以优化代码，还可以去优化（deopt），引入解释器可以省去一些代码的重编译时间，另一个原因是解释器不仅仅可以解释 javascript 代码，还可以解释 asm 或者其他二进制中间码。</p>
<p>另一个错误就是关于 V8 优化的，之前写过 <a href="https://www.zhihu.com/question/54637225/answer/140362071" rel="nofollow noreferrer" target="_blank">JavaScript 函数式编程存在性能问题么？</a> 中道：</p>
<blockquote>
<p>永远不可能被优化的有：</p>
<ul>
<li><p>Functions that contain a debugger statement</p></li>
<li><p>Functions that call literally eval()</p></li>
<li><p>Functions that contain a with statement</p></li>
</ul>
</blockquote>
<p>这个也是之前的文章，是以 Crankshaft 引擎为标准得出的结论。而 V8 已经开发了新的优化引擎——<a href="http://v8project.blogspot.de/2015/07/digging-into-turbofan-jit.html" rel="nofollow noreferrer" target="_blank">TurboFan</a>。</p>
<p>我们再创建另一个文件 add-of-mixed.js，输入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// flag: --trace-opt-verbose

function add(obj) {
    return obj.prop + obj.prop;
}

var length = 1000 * 1000;

var objs = new Array(length);

var i = 0;

for (i = 0; i < length; i++) {
    objs[i] = Math.random();
}

var a = { prop: 'a' };
var b = { prop: 1 };

for (i = 0; i < length; i++) {
    add(objs[i] > 0.5 ? a : b);

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// flag: --trace-opt-verbose</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">return</span> obj.prop + obj.prop;
}

<span class="hljs-keyword">var</span> length = <span class="hljs-number">1000</span> * <span class="hljs-number">1000</span>;

<span class="hljs-keyword">var</span> objs = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(length);

<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;

<span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; length; i++) {
    objs[i] = <span class="hljs-built_in">Math</span>.random();
}

<span class="hljs-keyword">var</span> a = { <span class="hljs-attr">prop</span>: <span class="hljs-string">'a'</span> };
<span class="hljs-keyword">var</span> b = { <span class="hljs-attr">prop</span>: <span class="hljs-number">1</span> };

<span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; length; i++) {
    add(objs[i] &gt; <span class="hljs-number">0.5</span> ? a : b);

}</code></pre>
<p>运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="d8 --trace-opt-verbose add-of-mixed.js
或
node --trace-opt-verbose add-of-mixed.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>d8 --trace-<span class="hljs-keyword">opt</span>-<span class="hljs-keyword">verbose</span> <span class="hljs-built_in">add</span>-of-mixed.js
或
node --trace-<span class="hljs-keyword">opt</span>-<span class="hljs-keyword">verbose</span> <span class="hljs-built_in">add</span>-of-mixed.js</code></pre>
<p>输出结果为：</p>
<p><span class="img-wrap"><img data-src="/img/bVIWR1?w=2876&amp;h=806" src="https://static.alili.tech/img/bVIWR1?w=2876&amp;h=806" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVIWR5?w=2788&amp;h=516" src="https://static.alili.tech/img/bVIWR5?w=2788&amp;h=516" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到这段代码能不能做内联缓存优化全看 RP(人品) 了。</p>
<p>我们再使用 <code>--trace-opt --trace-deopt</code> 参数看看 V8 引擎如何<strong>去优化</strong>。</p>
<p>新建文件 <a href="https://github.com/justjavac/v8-source-read/blob/master/src/add-of-mixed-dep.js" rel="nofollow noreferrer" target="_blank">add-of-mixed-dep.js</a>，输入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// flags: --trace-opt --trace-deopt

function add(obj) {
    return obj.prop + obj.prop;
}

var length = 10000;
var i = 0;
var a = { prop: 'a' };
var b = { prop: 1 };

for (i = 0; i < length; i++) {
    add(i !== 8000 ? a : b);

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// flags: --trace-opt --trace-deopt</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span><span class="hljs-params">(obj)</span> </span>{
    <span class="hljs-keyword">return</span> obj.prop + obj.prop;
}

<span class="hljs-keyword">var</span> length = <span class="hljs-number">10000</span>;
<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;
<span class="hljs-keyword">var</span> a = { prop: <span class="hljs-string">'a'</span> };
<span class="hljs-keyword">var</span> b = { prop: <span class="hljs-number">1</span> };

<span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; length; i++) {
    add(i !== <span class="hljs-number">8000</span> ? a : b);

}</code></pre>
<p>运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="d8 --trace-opt --trace-deopt add-of-mixed-dep.js
或
node --trace-opt --trace-deopt add-of-mixed-dep.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>d8 --trace-opt --trace-deopt <span class="hljs-keyword">add</span><span class="bash">-of-mixed-dep.js
</span>或
node --trace-opt --trace-deopt <span class="hljs-keyword">add</span><span class="bash">-of-mixed-dep.js</span></code></pre>
<p>结果为：</p>
<p><span class="img-wrap"><img data-src="/img/bVIWSi?w=3070&amp;h=1070" src="https://static.alili.tech/img/bVIWSi?w=3070&amp;h=1070" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>V8 引擎内部使用 <a href="http://blog.twokul.io/hidden-classes-in-javascript-and-inline-caching/" rel="nofollow noreferrer" target="_blank">Hidden Classes</a> 来表示 Object，关于 Hidden Classes 的文章已经很多了，我就不累述了。</p>
<p>运行 <code>d8 --help</code> 可以查看所有的 d8 命令行参数。如果使用 node，直接运行 <code>node --help</code> 输出的是 node 的命令行参数，如果想查看 V8 的，需要使用 <code>node --v8-options</code>。</p>
<p>后面章节会介绍 V8 的 GC（命令行参数 <code>--trace-gc</code>）以及最有意思的 <code>--allow-natives-syntax</code>。</p>
<p>推荐阅读一下 V8 的 <a href="https://github.com/v8/v8/blob/84b9c6301e4e01bb084f467bc8582826cdf55e28/src/bailout-reason.h" rel="nofollow noreferrer" target="_blank">bailout-reason.h</a> 源码，这是一个 C++ 的头文件，里面几乎没有任何代码逻辑，定义了所有 javascript 代码不能被 V8 引擎优化的原因，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;Array index constant value too big&quot;
&quot;eval&quot;
&quot;ForOfStatement&quot;
&quot;Too many parameters&quot;
&quot;WithStatement&quot;
……" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">"Array index constant value too big"</span>
<span class="hljs-string">"eval"</span>
<span class="hljs-string">"ForOfStatement"</span>
<span class="hljs-string">"Too many parameters"</span>
<span class="hljs-string">"WithStatement"</span>
……</code></pre>
<p>后面章节介绍的 <code>--allow-natives-syntax</code> 相关 C++ 头文件是 <a href="https://github.com/v8/v8/blob/84b9c6301e4e01bb084f467bc8582826cdf55e28/src/runtime/runtime.h#L856-L919" rel="nofollow noreferrer" target="_blank">runtime.h</a>，通过 <code>--allow-natives-syntax</code> 参数可以在 javascript 中使用 V8 的运行时函数。我们在之前的文章中已经使用过了，例如 <code>HasFastProperties</code>。</p>
<p>参考文章：</p>
<ul>
<li><p><a href="http://wingolog.org/archives/2011/07/05/v8-a-tale-of-two-compilers" rel="nofollow noreferrer" target="_blank">V8 - A Tale of Two Compilers</a></p></li>
<li><p><a href="https://www.html5rocks.com/en/tutorials/speed/v8/" rel="nofollow noreferrer" target="_blank">Performance Tips for JavaScript in V8</a></p></li>
<li><p><a href="https://docs.google.com/document/d/11T2CRex9hXxoJwbYqVQ32yIPMh0uouUZLdyrtmMoL44/edit#" rel="nofollow noreferrer" target="_blank">Ignition: V8 Interpreter</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 D8 分析 javascript 如何被 V8 引擎优化的

## 原文链接
[https://segmentfault.com/a/1190000008285728](https://segmentfault.com/a/1190000008285728)

