---
title: 'Angular 1 深度解析：脏数据检查与 angular 性能优化' 
date: 2019-01-06 2:30:10
hidden: true
slug: 684i8td0z4v
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">TL;DR</h2>
<ol>
<li>脏检查是一种模型到视图的数据映射机制，由 <code>$apply</code> 或 <code>$digest</code> 触发。</li>
<li>脏检查的范围是整个页面，不受区域或组件划分影响</li>
<li>使用尽量简单的绑定表达式提升脏检查执行速度</li>
<li>尽量减少页面上绑定表达式的个数（单次绑定和<code>ng-if</code>）</li>
<li>给 <code>ng-repeat</code> 添加 <code>track by</code> 让 angular 复用已有元素</li>
</ol>
<h2 id="articleHeader1">什么是脏数据检查（Dirty checking）</h2>
<p>Angular 是一个 MVVM 前端框架，提供了双向数据绑定。所谓双向数据绑定（Two-way data binding）就是页面元素变化会触发 View-model 中对应数据改变，反过来 View-model 中数据变化也会引发所绑定的 UI 元素数据更新。操作数据就等同于操作 UI。</p>
<p>看似简单，其实水很深。UI 元素变化引发 Model 中数据变化这个通过绑定对应 DOM 事件（例如 <code>input</code> 或 <code>change</code>）可以简单的实现；然而反过来就不是那么容易。</p>
<p>比如有如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p ng-bind=&quot;content1&quot;></p>
<p ng-bind=&quot;content2&quot;></p>
<button ng-click=&quot;onClick()&quot;>Click Me</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">ng-bind</span>=<span class="hljs-string">"content1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">ng-bind</span>=<span class="hljs-string">"content2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">ng-click</span>=<span class="hljs-string">"onClick()"</span>&gt;</span>Click Me<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<p>用户点击了 button，angular 执行了一个叫 <code>onClick</code> 的方法。这个 <code>onClick</code> 的方法体对于 angular 来说是黑盒，它到底做了什么不知道。可能改了 <code>$scope.content1</code> 的值，可能改了 <code>$scope.content2</code> 的值，也可能两个值都改了，也可能都没改。</p>
<p>那么 angular 到底应该怎样得知 <code>onClick()</code> 这段代码后是否应该刷新 UI，应该更新哪个 DOM 元素？</p>
<p>angular 必须去挨个检查这些元素对应绑定表达式的值是否有被改变。这就是脏数据检查的由来（脏数据检查以下简称脏检查）。</p>
<h2 id="articleHeader2">脏检查如何被触发</h2>
<p>angular 会在可能触发 UI 变更的时候进行脏检查：这句话并不准确。实际上，脏检查是 <a href="https://docs.angularjs.org/api/ng/type/" rel="nofollow noreferrer" target="_blank"><span class="MathJax_Preview"></span><span class="MathJax" id="MathJax-Element-1-Frame" tabindex="0" style=""><nobr><span class="math" id="MathJax-Span-1" role="math" style="width: 23.617em; display: inline-block;"><span style="display: inline-block; position: relative; width: 19.504em; height: 0px; font-size: 121%;"><span style="position: absolute; clip: rect(1.631em, 1019.51em, 2.852em, -1000em); top: -2.479em; left: 0em;"><span class="mrow" id="MathJax-Span-2"><span class="mi" id="MathJax-Span-3" style="font-family: STIXGeneral-Italic;">d<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.027em;"></span></span><span class="mi" id="MathJax-Span-4" style="font-family: STIXGeneral-Italic;">i</span><span class="mi" id="MathJax-Span-5" style="font-family: STIXGeneral-Italic;">g</span><span class="mi" id="MathJax-Span-6" style="font-family: STIXGeneral-Italic;">e</span><span class="mi" id="MathJax-Span-7" style="font-family: STIXGeneral-Italic;">s</span><span class="mi" id="MathJax-Span-8" style="font-family: STIXGeneral-Italic;">t<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.018em;"></span></span><span class="mo" id="MathJax-Span-9" style="font-family: STIXGeneral-Regular;">]</span><span class="mo" id="MathJax-Span-10" style="font-family: STIXGeneral-Regular;">(</span><span class="mi" id="MathJax-Span-11" style="font-family: STIXGeneral-Italic;">h</span><span class="mi" id="MathJax-Span-12" style="font-family: STIXGeneral-Italic;">t<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.018em;"></span></span><span class="mi" id="MathJax-Span-13" style="font-family: STIXGeneral-Italic;">t<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.018em;"></span></span><span class="mi" id="MathJax-Span-14" style="font-family: STIXGeneral-Italic;">p</span><span class="mi" id="MathJax-Span-15" style="font-family: STIXGeneral-Italic;">s</span><span class="mo" id="MathJax-Span-16" style="font-family: STIXGeneral-Regular; padding-left: 0.313em;">:</span><span class="texatom" id="MathJax-Span-17" style="padding-left: 0.313em;"><span class="mrow" id="MathJax-Span-18"><span class="mo" id="MathJax-Span-19" style="font-family: STIXGeneral-Regular;">/</span></span></span><span class="texatom" id="MathJax-Span-20"><span class="mrow" id="MathJax-Span-21"><span class="mo" id="MathJax-Span-22" style="font-family: STIXGeneral-Regular;">/</span></span></span><span class="mi" id="MathJax-Span-23" style="font-family: STIXGeneral-Italic;">d<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.027em;"></span></span><span class="mi" id="MathJax-Span-24" style="font-family: STIXGeneral-Italic;">o</span><span class="mi" id="MathJax-Span-25" style="font-family: STIXGeneral-Italic;">c</span><span class="mi" id="MathJax-Span-26" style="font-family: STIXGeneral-Italic;">s</span><span class="mo" id="MathJax-Span-27" style="font-family: STIXGeneral-Regular;">.</span><span class="mi" id="MathJax-Span-28" style="font-family: STIXGeneral-Italic; padding-left: 0.188em;">a</span><span class="mi" id="MathJax-Span-29" style="font-family: STIXGeneral-Italic;">n</span><span class="mi" id="MathJax-Span-30" style="font-family: STIXGeneral-Italic;">g</span><span class="mi" id="MathJax-Span-31" style="font-family: STIXGeneral-Italic;">u</span><span class="mi" id="MathJax-Span-32" style="font-family: STIXGeneral-Italic;">l<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.001em;"></span></span><span class="mi" id="MathJax-Span-33" style="font-family: STIXGeneral-Italic;">a</span><span class="mi" id="MathJax-Span-34" style="font-family: STIXGeneral-Italic;">r<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.023em;"></span></span><span class="mi" id="MathJax-Span-35" style="font-family: STIXGeneral-Italic;">j<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.001em;"></span></span><span class="mi" id="MathJax-Span-36" style="font-family: STIXGeneral-Italic;">s</span><span class="mo" id="MathJax-Span-37" style="font-family: STIXGeneral-Regular;">.</span><span class="mi" id="MathJax-Span-38" style="font-family: STIXGeneral-Italic; padding-left: 0.188em;">o</span><span class="mi" id="MathJax-Span-39" style="font-family: STIXGeneral-Italic;">r<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.023em;"></span></span><span class="mi" id="MathJax-Span-40" style="font-family: STIXGeneral-Italic;">g</span><span class="texatom" id="MathJax-Span-41"><span class="mrow" id="MathJax-Span-42"><span class="mo" id="MathJax-Span-43" style="font-family: STIXGeneral-Regular;">/</span></span></span><span class="mi" id="MathJax-Span-44" style="font-family: STIXGeneral-Italic;">a</span><span class="mi" id="MathJax-Span-45" style="font-family: STIXGeneral-Italic;">p</span><span class="mi" id="MathJax-Span-46" style="font-family: STIXGeneral-Italic;">i</span><span class="texatom" id="MathJax-Span-47"><span class="mrow" id="MathJax-Span-48"><span class="mo" id="MathJax-Span-49" style="font-family: STIXGeneral-Regular;">/</span></span></span><span class="mi" id="MathJax-Span-50" style="font-family: STIXGeneral-Italic;">n</span><span class="mi" id="MathJax-Span-51" style="font-family: STIXGeneral-Italic;">g</span><span class="texatom" id="MathJax-Span-52"><span class="mrow" id="MathJax-Span-53"><span class="mo" id="MathJax-Span-54" style="font-family: STIXGeneral-Regular;">/</span></span></span><span class="mi" id="MathJax-Span-55" style="font-family: STIXGeneral-Italic;">t<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.018em;"></span></span><span class="mi" id="MathJax-Span-56" style="font-family: STIXGeneral-Italic;">y</span><span class="mi" id="MathJax-Span-57" style="font-family: STIXGeneral-Italic;">p</span><span class="mi" id="MathJax-Span-58" style="font-family: STIXGeneral-Italic;">e</span><span class="texatom" id="MathJax-Span-59"><span class="mrow" id="MathJax-Span-60"><span class="mo" id="MathJax-Span-61" style="font-family: STIXGeneral-Regular;">/</span></span></span></span><span style="display: inline-block; width: 0px; height: 2.479em;"></span></span></span><span style="display: inline-block; overflow: hidden; vertical-align: -0.317em; border-left: 0px solid; width: 0px; height: 1.21em;"></span></span></nobr></span><script type="math/tex" id="MathJax-Element-1">digest](https://docs.angularjs.org/api/ng/type/</script>rootScope.Scope#<span class="MathJax_Preview"></span><span class="MathJax" id="MathJax-Element-2-Frame" tabindex="0" style=""><nobr><span class="math" id="MathJax-Span-62" role="math" style="width: 24.817em; display: inline-block;"><span style="display: inline-block; position: relative; width: 20.496em; height: 0px; font-size: 121%;"><span style="position: absolute; clip: rect(1.514em, 1020.46em, 2.851em, -1000em); top: -2.479em; left: 0em;"><span class="mrow" id="MathJax-Span-63"><span class="mi" id="MathJax-Span-64" style="font-family: STIXGeneral-Italic;">d<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.027em;"></span></span><span class="mi" id="MathJax-Span-65" style="font-family: STIXGeneral-Italic;">i</span><span class="mi" id="MathJax-Span-66" style="font-family: STIXGeneral-Italic;">g</span><span class="mi" id="MathJax-Span-67" style="font-family: STIXGeneral-Italic;">e</span><span class="mi" id="MathJax-Span-68" style="font-family: STIXGeneral-Italic;">s</span><span class="mi" id="MathJax-Span-69" style="font-family: STIXGeneral-Italic;">t<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.018em;"></span></span><span class="mo" id="MathJax-Span-70" style="font-family: STIXGeneral-Regular;">)</span><span class="texatom" id="MathJax-Span-71"><span class="mrow" id="MathJax-Span-72"><span class="mo" id="MathJax-Span-73"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">执</span></span></span></span><span class="texatom" id="MathJax-Span-74"><span class="mrow" id="MathJax-Span-75"><span class="mo" id="MathJax-Span-76"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">行</span></span></span></span><span class="texatom" id="MathJax-Span-77"><span class="mrow" id="MathJax-Span-78"><span class="mo" id="MathJax-Span-79"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">的</span></span></span></span><span class="texatom" id="MathJax-Span-80"><span class="mrow" id="MathJax-Span-81"><span class="mo" id="MathJax-Span-82"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">，</span></span></span></span><span class="texatom" id="MathJax-Span-83"><span class="mrow" id="MathJax-Span-84"><span class="mo" id="MathJax-Span-85"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">另</span></span></span></span><span class="texatom" id="MathJax-Span-86"><span class="mrow" id="MathJax-Span-87"><span class="mo" id="MathJax-Span-88"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">一</span></span></span></span><span class="texatom" id="MathJax-Span-89"><span class="mrow" id="MathJax-Span-90"><span class="mo" id="MathJax-Span-91"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">个</span></span></span></span><span class="texatom" id="MathJax-Span-92"><span class="mrow" id="MathJax-Span-93"><span class="mo" id="MathJax-Span-94"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">更</span></span></span></span><span class="texatom" id="MathJax-Span-95"><span class="mrow" id="MathJax-Span-96"><span class="mo" id="MathJax-Span-97"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">常</span></span></span></span><span class="texatom" id="MathJax-Span-98"><span class="mrow" id="MathJax-Span-99"><span class="mo" id="MathJax-Span-100"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">用</span></span></span></span><span class="texatom" id="MathJax-Span-101"><span class="mrow" id="MathJax-Span-102"><span class="mo" id="MathJax-Span-103"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">的</span></span></span></span><span class="texatom" id="MathJax-Span-104"><span class="mrow" id="MathJax-Span-105"><span class="mo" id="MathJax-Span-106"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">用</span></span></span></span><span class="texatom" id="MathJax-Span-107"><span class="mrow" id="MathJax-Span-108"><span class="mo" id="MathJax-Span-109"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">于</span></span></span></span><span class="texatom" id="MathJax-Span-110"><span class="mrow" id="MathJax-Span-111"><span class="mo" id="MathJax-Span-112"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">触</span></span></span></span><span class="texatom" id="MathJax-Span-113"><span class="mrow" id="MathJax-Span-114"><span class="mo" id="MathJax-Span-115"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">发</span></span></span></span><span class="texatom" id="MathJax-Span-116"><span class="mrow" id="MathJax-Span-117"><span class="mo" id="MathJax-Span-118"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">脏</span></span></span></span><span class="texatom" id="MathJax-Span-119"><span class="mrow" id="MathJax-Span-120"><span class="mo" id="MathJax-Span-121"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">检</span></span></span></span><span class="texatom" id="MathJax-Span-122"><span class="mrow" id="MathJax-Span-123"><span class="mo" id="MathJax-Span-124"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">查</span></span></span></span><span class="texatom" id="MathJax-Span-125"><span class="mrow" id="MathJax-Span-126"><span class="mo" id="MathJax-Span-127"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">的</span></span></span></span><span class="texatom" id="MathJax-Span-128"><span class="mrow" id="MathJax-Span-129"><span class="mo" id="MathJax-Span-130"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">函</span></span></span></span><span class="texatom" id="MathJax-Span-131"><span class="mrow" id="MathJax-Span-132"><span class="mo" id="MathJax-Span-133"><span style="font-family: STIXGeneral, &quot;Arial Unicode MS&quot;, serif; font-size: 83%; font-style: normal; font-weight: normal;">数</span></span></span></span><span class="mo" id="MathJax-Span-134" style="font-family: STIXGeneral-Regular;">[</span></span><span style="display: inline-block; width: 0px; height: 2.479em;"></span></span></span><span style="display: inline-block; overflow: hidden; vertical-align: -0.316em; border-left: 0px solid; width: 0px; height: 1.351em;"></span></span></nobr></span><script type="math/tex" id="MathJax-Element-2">digest) 执行的，另一个更常用的用于触发脏检查的函数 [</script>apply</a> 其实就是 <code>$digest</code> 的一个简单封装（还做了一些抓异常的工作）。</p>
<p>通常写代码时我们无需主动调用 <code>$apply</code> 或 <code>$digest</code> 是因为 angular 在外部对我们的回调函数做了包装。例如常用的 <code>ng-click</code>，这是一个指令（<code>Directive</code>），内部实现则 <strong>类似</strong> 于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="DOM.addEventListener('click', function ($scope) {
  $scope.$apply(() => userCode());
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">DOM.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">$scope</span>) </span>{
  $scope.$apply(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> userCode());
});</code></pre>
<p>可以看到：<code>ng-click</code> 帮我们做了 <code>$apply</code> 这个操作。类似的不只是这些事件回调函数，还有 <code>$http</code>、<code>$timeout</code> 等。我听很多人抱怨说 angular 这个库太大了什么都管，其实你可以不用它自带的这些服务（Service），只要你记得手工调用 <code>$scope.$apply</code>。</p>
<h2 id="articleHeader3">脏检查的范围</h2>
<p>前面说到：angular 会对所有绑定到 UI 上的表达式做脏检查。其实，在 angular 实现内部，所有绑定表达式都被转换为 <code>$scope.$watch()</code>。每个 <code>$watch</code> 记录了上一次表达式的值。有 <code>ng-bind="a"</code> 即有 <code>$scope.$watch('a', callback)</code>，而 <code>$scope.$watch</code> 可不会管被 <code>watch</code> 的表达式是否跟触发脏检查的事件有关。</p>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div ng-show=&quot;false&quot;>
  <span id=&quot;span1&quot; ng-bind=&quot;content&quot;></span>
</div>
<span id=&quot;span2&quot; ng-bind=&quot;content&quot;></span>
<button ng-click=&quot;&quot;>TEST</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-show</span>=<span class="hljs-string">"false"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"span1"</span> <span class="hljs-attr">ng-bind</span>=<span class="hljs-string">"content"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"span2"</span> <span class="hljs-attr">ng-bind</span>=<span class="hljs-string">"content"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">ng-click</span>=<span class="hljs-string">""</span>&gt;</span>TEST<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<p>问：点击 <code>TEST</code> 这个按钮时会触发脏检查吗？触发几次？</p>
<p>首先：<code>ng-click=""</code> 什么都没有做。angular 会因为这个事件回调函数什么都没做就不进行脏检查吗？不会。</p>
<p>然后：<code>#span1</code> 被隐藏掉了，会检查绑定在它上面的表达式吗？尽管用户看不到，但是 <code>$scope.$watch('content', callback)</code> 还在。就算你直接把这个 <code>span</code> 元素干掉，只要 watch 表达式还在，要检查的还会检查。</p>
<p>再次：重复的表达式会重复检查吗？会。</p>
<p>最后：别忘了 <code>ng-show="false"</code>。可能是因为 angular 的开发人员认为这种绑定常量的情况并不多见，所以 <code>$watch</code> 并没有识别所监视的表达式是否是常量。常量依旧会重复检查。</p>
<p>所以：</p>
<p>答：触发三次。一次 <code>false</code>，一次 <code>content</code>，一次 <code>content</code></p>
<p>所以说一个绑定表达式只要放在当前 DOM 树里就会被监视，不管它是否可见，不管它是否被放在另一个 Tab 里，更不管它是否与用户操作相关。</p>
<p>另外，就算在不同 <code>Controller</code> 里构造的 <code>$scope</code> 也会互相影响，别忘了 angular 还有全局的 <code>$rootScope</code>，你还可以 <code>$scope.$emit</code>。angular 无法保证你绝对不会在一个 <code>controller</code> 里更改另一个 <code>controller</code> 生成的 <code>scope</code>，包括 自定义指令（Directive）生成的 <code>scope</code> 和 <code>Angular 1.5</code> 里新引入的组件（Component）。</p>
<p>所以说不要怀疑用户在输入表单时 angular 会不会监听页面左边导航栏的变化。</p>
<h2 id="articleHeader4">脏检查与运行效率</h2>
<p>脏检查慢吗？</p>
<p>说实话脏检查效率是不高，但是也谈不上有多慢。简单的数字或字符串比较能有多慢呢？十几个表达式的脏检查可以直接忽略不计；上百个也可以接受；成百上千个就有很大问题了。绑定大量表达式时请注意所绑定的表达式效率。建议注意一下几点：</p>
<ol>
<li>表达式（以及表达式所调用的函数）中少写太过复杂的逻辑</li>
<li>不要连接太长的 <code>filter</code>（往往 filter 里都会遍历并且生成新数组）</li>
<li>不要访问 DOM 元素。</li>
</ol>
<h2 id="articleHeader5">使用单次绑定减少绑定表达式数量</h2>
<p>单次绑定（<a href="https://docs.angularjs.org/guide/expression#one-time-binding" rel="nofollow noreferrer" target="_blank">One-time binding</a> 是 Angular 1.3 就引入的一种特殊的表达式，它以 <code>::</code> 开头，当脏检查发现这种表达式的值不为 <code>undefined</code> 时就认为此表达式已经稳定，并取消对此表达式的监视。这是一种行之有效的减少绑定表达式数量的方法，与 <code>ng-repeat</code> 连用效果更佳（下文会提到），但过度使用也容易引发 bug。</p>
<h2 id="articleHeader6">善用 <code>ng-if</code> 减少绑定表达式的数量</h2>
<p>如果你认为 <a href="https://docs.angularjs.org/api/ng/directive/ngIf" rel="nofollow noreferrer" target="_blank">ng-if</a> 就是另一种用于隐藏、显示 DOM 元素的方法你就大错特错了。</p>
<p><code>ng-if</code> 不仅可以减少 DOM 树中元素的数量（而非像 <code>ng-hide</code> 那样仅仅只是加个 <code>display: none</code>），每一个 <code>ng-if</code> 拥有自己的 <code>scope</code>，<code>ng-if</code> 下面的 <code>$watch</code> 表达式都是注册在 <code>ng-if</code> 自己 <code>scope</code> 中。当 <code>ng-if</code> 变为 <code>false</code>，<code>ng-if</code> 下的 <code>scope</code> 被销毁，注册在这个 <code>scope</code> 里的绑定表达式也就随之销毁了。</p>
<p>考虑这种 Tab 选项卡实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
  <li ng-class=&quot;{ selected: selectedTab === 1 }&quot;>Tab 1 title</li>
  <li ng-class=&quot;{ selected: selectedTab === 1 }&quot;>Tab 2 title</li>
  <li ng-class=&quot;{ selected: selectedTab === 1 }&quot;>Tab 3 title</li>
  <li ng-class=&quot;{ selected: selectedTab === 1 }&quot;>Tab 4 title</li>
</ul>
<div ng-show=&quot;selectedTab === 1&quot;>[[Tab 1 body...]]</div>
<div ng-show=&quot;selectedTab === 2&quot;>[[Tab 2 body...]]</div>
<div ng-show=&quot;selectedTab === 3&quot;>[[Tab 3 body...]]</div>
<div ng-show=&quot;selectedTab === 4&quot;>[[Tab 4 body...]]</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">ng-class</span>=<span class="hljs-string">"{ selected: selectedTab === 1 }"</span>&gt;</span>Tab 1 title<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">ng-class</span>=<span class="hljs-string">"{ selected: selectedTab === 1 }"</span>&gt;</span>Tab 2 title<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">ng-class</span>=<span class="hljs-string">"{ selected: selectedTab === 1 }"</span>&gt;</span>Tab 3 title<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">ng-class</span>=<span class="hljs-string">"{ selected: selectedTab === 1 }"</span>&gt;</span>Tab 4 title<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-show</span>=<span class="hljs-string">"selectedTab === 1"</span>&gt;</span>[[Tab 1 body...]]<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-show</span>=<span class="hljs-string">"selectedTab === 2"</span>&gt;</span>[[Tab 2 body...]]<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-show</span>=<span class="hljs-string">"selectedTab === 3"</span>&gt;</span>[[Tab 3 body...]]<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-show</span>=<span class="hljs-string">"selectedTab === 4"</span>&gt;</span>[[Tab 4 body...]]<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>对于这种会反复隐藏、显示的元素，通常人们第一反应都是使用 <code>ng-show</code> 或 <code>ng-hide</code> 简单的用 <code>display: none</code> 把元素设置为不可见。</p>
<p>然而入上文所说，肉眼不可见不代表不会跑脏检查。如果将 <code>ng-show</code> 替换为 <code>ng-if</code> 或 <code>ng-switch-when</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div ng-if=&quot;selectedTab === 1&quot;>[[Tab 1 body...]]</div>
<div ng-if=&quot;selectedTab === 2&quot;>[[Tab 2 body...]]</div>
<div ng-if=&quot;selectedTab === 3&quot;>[[Tab 3 body...]]</div>
<div ng-if=&quot;selectedTab === 4&quot;>[[Tab 4 body...]]</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-if</span>=<span class="hljs-string">"selectedTab === 1"</span>&gt;</span>[[Tab 1 body...]]<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-if</span>=<span class="hljs-string">"selectedTab === 2"</span>&gt;</span>[[Tab 2 body...]]<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-if</span>=<span class="hljs-string">"selectedTab === 3"</span>&gt;</span>[[Tab 3 body...]]<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-if</span>=<span class="hljs-string">"selectedTab === 4"</span>&gt;</span>[[Tab 4 body...]]<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>有如下优点：</p>
<ol>
<li>首先 DOM 树中的元素个数显著减少至四分之一，降低内存占用</li>
<li>其次 <code>$watch</code> 表达式也减少至四分之一，提升脏检查循环的速度</li>
<li>如果这个 tab 下面有 <code>controller</code>（例如每个 tab 都被封装为一个组件），那么仅当这个 tab 被选中时该 <code>controller</code> 才会执行，可以减少各页面的互相干扰</li>
<li>如果 <code>controller</code> 中调用接口获取数据，那么仅当对应 <code>tab</code> 被选中时才会加载，避免网络拥挤</li>
</ol>
<p>当然也有缺点：</p>
<ol>
<li>DOM 重建本身费时间</li>
<li>如果 tab 下有 <code>controller</code>，那么每次该 tab 被选中时 <code>controller</code> 都会被执行</li>
<li>如果在 <code>controller</code> 里面调接口获取数据，那么每次该 tab 被选中时都会重新加载</li>
</ol>
<p>各位读者自己取舍。</p>
<h2 id="articleHeader7">当脏检查遇上数组</h2>
<p><code>ng-repeat</code>！这就更有（e）趣（xin）了。通常的绑定只是去监听一个值的变化（绑定对象也是绑定到对象里的某个成员），而 <code>ng-repeat</code> 却要监视一整个数组对象的变化。例如有：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul ng-init=&quot;array = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
]&quot;>
  <li ng-repeat=&quot;item in array&quot; ng-bind=&quot;item.value&quot;></li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">ng-init</span>=<span class="hljs-string">"array = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
]"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">ng-repeat</span>=<span class="hljs-string">"item in array"</span> <span class="hljs-attr">ng-bind</span>=<span class="hljs-string">"item.value"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<p>会生成 4 个 <code>li</code> 元素</p>
<ul>
<li>1</li>
<li>2</li>
<li>3</li>
<li>4</li>
</ul>
<p>没有问题。如果我添加一个按钮如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button ng-click=&quot;array.shift()&quot;>删除第一个元素</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">ng-click</span>=<span class="hljs-string">"array.shift()"</span>&gt;</span>删除第一个元素<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<p>请考虑：当用户点击这个按钮会发生什么？</p>
<p>我们一步一步分析。开始的时候，angular 记录了 array 的初始状态为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  { &quot;value&quot;: 1 },
  { &quot;value&quot;: 2 },
  { &quot;value&quot;: 3 },
  { &quot;value&quot;: 4 }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">[
  { <span class="hljs-attr">"value"</span>: <span class="hljs-number">1</span> },
  { <span class="hljs-attr">"value"</span>: <span class="hljs-number">2</span> },
  { <span class="hljs-attr">"value"</span>: <span class="hljs-number">3</span> },
  { <span class="hljs-attr">"value"</span>: <span class="hljs-number">4</span> }
]</code></pre>
<p>当用户点击按钮后，数组的第一个元素被删除了，array 变为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  { &quot;value&quot;: 2 },
  { &quot;value&quot;: 3 },
  { &quot;value&quot;: 4 }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">[
  { <span class="hljs-attr">"value"</span>: <span class="hljs-number">2</span> },
  { <span class="hljs-attr">"value"</span>: <span class="hljs-number">3</span> },
  { <span class="hljs-attr">"value"</span>: <span class="hljs-number">4</span> }
]</code></pre>
<p>两者比较：</p>
<ol>
<li>
<code>array.length = 4</code> =&gt; <code>array.length = 3</code>
</li>
<li>
<code>array[0].value = 1</code> =&gt; <code>array[0].value = 2</code>
</li>
<li>
<code>array[1].value = 2</code> =&gt; <code>array[1].value = 3</code>
</li>
<li>
<code>array[2].value = 3</code> =&gt; <code>array[2].value = 4</code>
</li>
<li>
<code>array[3].value = 4</code> =&gt; <code>array[3].value = undefined</code> （<code>array[4]</code> 为 <code>undefined</code>，则 <code>undefined.value</code> 为 undefined，见 <a href="https://docs.angularjs.org/guide/expression#forgiving" rel="nofollow noreferrer" target="_blank">Angular 表达式的说明</a>）</li>
</ol>
<p>如同你所见：angular 经过比较，看到的是：</p>
<ol>
<li>数组长度减少了 1</li>
<li>数组第 1 个元素的 value 被改为 2</li>
<li>数组第 2 个元素的 value 被改为 3</li>
<li>数组第 3 个元素的 value 被改为 4</li>
</ol>
<p>反应到 DOM 元素上就是：</p>
<ol>
<li>第 1 个 <code>li</code> 内容改为 2</li>
<li>第 2 个 <code>li</code> 内容改为 3</li>
<li>第 3 个 <code>li</code> 内容改为 4</li>
<li>第 4 个 <code>li</code> 删掉</li>
</ol>
<p>可以看到，删除一个元素导致了整个 <code>ul</code> 序列的刷新。要知道 DOM 操作要比 JS 变量操作要慢得多，类似这样的无用操作最好能想办法避免。</p>
<p>那么问题出在哪里呢？用户删除了数组的第一个元素，导致了整个数组元素前移；然而 angular 没法得知用户做了这样一个删除操作，只能傻傻的按下标一个一个比。</p>
<p>那么只要引入一种机制来标记数组的每一项就好了吧。于是 angular 引入了 <code>track by</code></p>
<h2 id="articleHeader8">详解 <a href="https://docs.angularjs.org/api/ng/directive/ngRepeat#tracking-and-duplicates" rel="nofollow noreferrer" target="_blank">track by</a>
</h2>
<p>用来标记数组元素的一定是数组里类似 ID 的某个值。这个值一定要符合以下这两个特点。</p>
<ol>
<li>不能重复。ID 重复了什么鬼</li>
<li>值一定要简单。ID 是用于比较相等的，有时候由于算法不同可能还要比较大小，处于速度考虑不能太复杂。</li>
</ol>
<p>基于这两个特点。如果用户没有给 <code>ng-repeat</code> 指定 <code>track by</code> 的表达式，则默认为内置函数 <a href="https://docs.angularjs.org/api/ng/directive/ngRepeat#Usage" rel="nofollow noreferrer" target="_blank">$id</a>。<code>$id</code> 会检查 <code>item</code> 中有没有一个名为 <code>$$hashKey` 的成员。如有，返回其值；如没有，则生成一个新的唯一值写入。这就是数组中那个奇怪的 `$$hashKey</code> 成员来历，默认值是 <code>"object:X"</code>（你问我为什么是个字符串而不是数字？我怎么知道。。。）</p>
<p>还是前面的问题，引入 <code>track by</code> 后再来看。因为没有指定 <code>track by</code>，则默认为 <code>$id(item)</code>，实际为 <code>$$hashKey</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul ng-init=&quot;array = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
]&quot;>
  <li ng-repeat=&quot;item in array track by $id(item)&quot; ng-bind=&quot;item.value&quot;></li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">ng-init</span>=<span class="hljs-string">"array = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
]"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">ng-repeat</span>=<span class="hljs-string">"item in array track by $id(item)"</span> <span class="hljs-attr">ng-bind</span>=<span class="hljs-string">"item.value"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<p>开始的时候，<code>$id(item)</code> 给数组中所有项创建了 <code>$$hashKey</code></p>
<p>这时 angular 记录了 array 的初始状态为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  { &quot;value&quot;: 1, &quot;$$hashKey&quot;: &quot;object:1&quot; },
  { &quot;value&quot;: 2, &quot;$$hashKey&quot;: &quot;object:2&quot; },
  { &quot;value&quot;: 3, &quot;$$hashKey&quot;: &quot;object:3&quot; },
  { &quot;value&quot;: 4, &quot;$$hashKey&quot;: &quot;object:4&quot; }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">[
  { <span class="hljs-attr">"value"</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">"$$hashKey"</span>: <span class="hljs-string">"object:1"</span> },
  { <span class="hljs-attr">"value"</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">"$$hashKey"</span>: <span class="hljs-string">"object:2"</span> },
  { <span class="hljs-attr">"value"</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">"$$hashKey"</span>: <span class="hljs-string">"object:3"</span> },
  { <span class="hljs-attr">"value"</span>: <span class="hljs-number">4</span>, <span class="hljs-attr">"$$hashKey"</span>: <span class="hljs-string">"object:4"</span> }
]</code></pre>
<p>当用户点击按钮后，数组的第一个元素被删除了，array 变为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  { &quot;value&quot;: 2, &quot;$$hashKey&quot;: &quot;object:2&quot; },
  { &quot;value&quot;: 3, &quot;$$hashKey&quot;: &quot;object:3&quot; },
  { &quot;value&quot;: 4, &quot;$$hashKey&quot;: &quot;object:4&quot; }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">[
  { <span class="hljs-attr">"value"</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">"$$hashKey"</span>: <span class="hljs-string">"object:2"</span> },
  { <span class="hljs-attr">"value"</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">"$$hashKey"</span>: <span class="hljs-string">"object:3"</span> },
  { <span class="hljs-attr">"value"</span>: <span class="hljs-number">4</span>, <span class="hljs-attr">"$$hashKey"</span>: <span class="hljs-string">"object:4"</span> }
]</code></pre>
<p>先比较 <code>track by</code> 的元素，这里为 <code>$id(item)</code>，即 <code>$$hashKey</code></p>
<ol>
<li>
<code>"object:1"</code> =&gt; <code>"object:2"</code>
</li>
<li>
<code>"object:2"</code> =&gt; <code>"object:3"</code>
</li>
<li>
<code>"object:3"</code> =&gt; <code>"object:4"</code>
</li>
<li>
<code>"object:4"</code> =&gt; undefined</li>
</ol>
<p>两者对不上，说明数组被做了增删元素或者移动元素的操作。将其规整</p>
<ol>
<li>
<code>"object:1"</code> =&gt; undefined</li>
<li>
<code>"object:2"</code> =&gt; <code>"object:2"</code>
</li>
<li>
<code>"object:3"</code> =&gt; <code>"object:3"</code>
</li>
<li>
<code>"object:4"</code> =&gt; <code>"object:4"</code>
</li>
</ol>
<p>那么显然，第一个元素被删除了。再比较剩余的元素</p>
<ol>
<li>
<code>array[0].value = 2</code> =&gt; <code>array[0].value = 2</code>
</li>
<li>
<code>array[1].value = 3</code> =&gt; <code>array[1].value = 3</code>
</li>
<li>
<code>array[2].value = 4</code> =&gt; <code>array[2].value = 4</code>
</li>
</ol>
<p>结论是：</p>
<ol>
<li>原数组第一个元素被删除</li>
<li>其他没变</li>
</ol>
<p>angular 通过将新旧数组的 <code>track by</code> 元素做 diff 猜测用户的行为，最大可能的减少 DOM 树的操作，这就是 <code>track by</code> 的用处。</p>
<h2 id="articleHeader9">默认 track by 的坑</h2>
<p>So far so good! 然而需求某天有变，程序员小哥决定用 filter 给数组做 map 后再渲染。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul ng-init=&quot;array = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
]&quot;>
  <li ng-repeat=&quot;item in array | myMap&quot; ng-bind=&quot;item.value&quot;></li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">ng-init</span>=<span class="hljs-string">"array = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
]"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">ng-repeat</span>=<span class="hljs-string">"item in array | myMap"</span> <span class="hljs-attr">ng-bind</span>=<span class="hljs-string">"item.value"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<p>map 定义如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xxModule.filter('map', function () {
  return arr => arr.map(item => ({ value: item.value + 1 }));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">xxModule.filter(<span class="hljs-string">'map'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> arr.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> ({ <span class="hljs-attr">value</span>: item.value + <span class="hljs-number">1</span> }));
});</code></pre>
<p><code>ng-repeat</code> 执行时先计算表达式 <code>array | myMap</code> 的值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arrayForNgRepeat = [
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">arrayForNgRepeat = [
  { <span class="hljs-attr">value</span>: <span class="hljs-number">2</span> },
  { <span class="hljs-attr">value</span>: <span class="hljs-number">3</span> },
  { <span class="hljs-attr">value</span>: <span class="hljs-number">4</span> },
  { <span class="hljs-attr">value</span>: <span class="hljs-number">5</span> },
]</code></pre>
<p>注意数组 <code>arrayForNgRepeat</code> 和原来的数组 <code>array</code> 不是同一个引用，因为 <code>filter</code> 里的 map 操作生成了一个新数组，每一项都是新对象，跟原数组无关。</p>
<p><code>ng-repeat</code> 时，angular 发现用户没有指定 <code>track by</code>，按照默认逻辑，使用 <code>$id(item)</code> 作为 <code>track by</code>，添加 <code>$$hashKey</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arrayForNgRepeat = [
  { value: 2, &quot;$$hashKey&quot;: &quot;object:1&quot; },
  { value: 3, &quot;$$hashKey&quot;: &quot;object:2&quot; },
  { value: 4, &quot;$$hashKey&quot;: &quot;object:3&quot; },
  { value: 5, &quot;$$hashKey&quot;: &quot;object:4&quot; },
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">arrayForNgRepeat = [
  { <span class="hljs-attr">value</span>: <span class="hljs-number">2</span>, <span class="hljs-string">"$$hashKey"</span>: <span class="hljs-string">"object:1"</span> },
  { <span class="hljs-attr">value</span>: <span class="hljs-number">3</span>, <span class="hljs-string">"$$hashKey"</span>: <span class="hljs-string">"object:2"</span> },
  { <span class="hljs-attr">value</span>: <span class="hljs-number">4</span>, <span class="hljs-string">"$$hashKey"</span>: <span class="hljs-string">"object:3"</span> },
  { <span class="hljs-attr">value</span>: <span class="hljs-number">5</span>, <span class="hljs-string">"$$hashKey"</span>: <span class="hljs-string">"object:4"</span> },
]</code></pre>
<p>生成 DOM：</p>
<ul>
<li>2</li>
<li>3</li>
<li>4</li>
<li>5</li>
</ul>
<p>这里请再次注意：数组 arrayForNgRepeat 与原始数组 array 没有任何关系，数组本身是不同的引用，数组里的每一项也是不同引用。修改新数组的成员不会影响到原来的数组。</p>
<p>这时 array 的值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="array = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">array = [
  { <span class="hljs-attr">value</span>: <span class="hljs-number">1</span> },
  { <span class="hljs-attr">value</span>: <span class="hljs-number">2</span> },
  { <span class="hljs-attr">value</span>: <span class="hljs-number">3</span> },
  { <span class="hljs-attr">value</span>: <span class="hljs-number">4</span> },
]</code></pre>
<p>这时用户的某个无关操作触发了脏检查。针对 <code>ng-repeat</code> 表达式，首先计算 <code>array | myMap</code> 的值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="newArrayForNgRepeat = [
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">newArrayForNgRepeat = [
  { <span class="hljs-attr">value</span>: <span class="hljs-number">2</span> },
  { <span class="hljs-attr">value</span>: <span class="hljs-number">3</span> },
  { <span class="hljs-attr">value</span>: <span class="hljs-number">4</span> },
  { <span class="hljs-attr">value</span>: <span class="hljs-number">5</span> },
]</code></pre>
<p>先比较 <code>track by</code> 的元素。用户没有指定，默认为 <code>$id(item)</code>。</p>
<p><code>$id</code> 发现数组中有一些元素没有 <code>$$hashKey`，则给它们填充新 `$$hashKey</code>，结果为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="newArrayForNgRepeat = [
  { value: 2, &quot;$$hashKey&quot;: &quot;object:5&quot; },
  { value: 3, &quot;$$hashKey&quot;: &quot;object:6&quot; },
  { value: 4, &quot;$$hashKey&quot;: &quot;object:7&quot; },
  { value: 5, &quot;$$hashKey&quot;: &quot;object:8&quot; },
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">newArrayForNgRepeat = [
  { <span class="hljs-attr">value</span>: <span class="hljs-number">2</span>, <span class="hljs-string">"$$hashKey"</span>: <span class="hljs-string">"object:5"</span> },
  { <span class="hljs-attr">value</span>: <span class="hljs-number">3</span>, <span class="hljs-string">"$$hashKey"</span>: <span class="hljs-string">"object:6"</span> },
  { <span class="hljs-attr">value</span>: <span class="hljs-number">4</span>, <span class="hljs-string">"$$hashKey"</span>: <span class="hljs-string">"object:7"</span> },
  { <span class="hljs-attr">value</span>: <span class="hljs-number">5</span>, <span class="hljs-string">"$$hashKey"</span>: <span class="hljs-string">"object:8"</span> },
]</code></pre>
<p>这时两边的 <code>track by</code> 的实际结果为</p>
<ol>
<li>
<code>"object:1"</code> =&gt; <code>"object:5"</code>
</li>
<li>
<code>"object:2"</code> =&gt; <code>"object:6"</code>
</li>
<li>
<code>"object:3"</code> =&gt; <code>"object:7"</code>
</li>
<li>
<code>"object:4"</code> =&gt; <code>"object:8"</code>
</li>
</ol>
<p>两者对不上，说明数组被做了增删元素或者移动元素的操作。将其规整</p>
<ol>
<li>
<code>"object:1"</code> =&gt; undefined</li>
<li>
<code>"object:2"</code> =&gt; undefined</li>
<li>
<code>"object:3"</code> =&gt; undefined</li>
<li>
<code>"object:4"</code> =&gt; undefined</li>
<li>undefined =&gt; <code>"object:5"</code>
</li>
<li>undefined =&gt; <code>"object:6"</code>
</li>
<li>undefined =&gt; <code>"object:7"</code>
</li>
<li>undefined =&gt; <code>"object:8"</code>
</li>
</ol>
<p>结论是：</p>
<ol>
<li>原数组全部 4 个元素被删除</li>
<li>新添加了 4 个元素</li>
</ol>
<p>于是 angular 把原来所有 <code>li</code> 删除，再创建 4 个新的 <code>li</code> 元素，填充它们的 <code>textContent</code>，放到 <code>ul</code> 里</p>
<p>如果怀疑我说的话，请自己在浏览器里测试。你可以清楚的看到调试工具里 DOM 树的闪烁</p>
<h2 id="articleHeader10">
<code>track by</code> 与性能</h2>
<p>不恰当的 <code>ng-repeat</code> 会造成 DOM 树反复重新构造，拖慢浏览器响应速度，造成页面闪烁。除了上面这种比较极端的情况，如果一个列表频繁拉取 Server 端数据自刷新的话也一定要手工添加 <code>track by</code>，因为接口给前端的数据是不可能包含 <code>$$hashKey</code> 这种东西的，于是结果就造成列表频繁的重建。</p>
<p>其实不必考虑那么多，总之加上没坏处，至少可以避免 angular 生成 <code>$$hashKey</code> 这种奇奇怪怪的东西。所以</p>
<p>请给 <code>ng-repeat</code> 手工添加 <code>track by</code>！</p>
<p>重要的事情再说一遍</p>
<p>请给 <code>ng-repeat</code> 手工添加 <code>track by</code>！</p>
<p>通常列表都是请求接口从数据库中读取返回的。通常数据库中的记录都有一个 <code>id</code> 字段做主键，那么这时使用 <code>id</code> 作为 <code>track by</code> 的字段是最佳选择。如果没有，可以选择一些业务字段但是确保不会重复的。例如一个连表头都是动态生成的表格，表头就可以使用其字段名作为 <code>track by</code> 的字段（对象的 key 是不会重复的）。</p>
<p>如果真的找不到用于 <code>track by</code> 的字段，让 angular 自动生成 <code>$$hashKey</code> 也不是不可以，但是切记检查有没有出现 DOM 元素不断重刷的现象，除了仔细看调试工具的 DOM 树是否闪烁之外，给列表中的元素添加一个特别的标记（比如 <code>style="background: red"</code>），也是一个行之有效的方法（如果这个标记被意外清除，说明原来的 DOM 元素被删除了）。</p>
<p>除非真的没办法，不推荐使用 <code>$index</code> 作为 <code>track by</code> 的字段。</p>
<h2 id="articleHeader11">
<code>track by</code> 与 <a href="https://docs.angularjs.org/guide/expression#one-time-binding" rel="nofollow noreferrer" target="_blank">单次绑定</a> 连用</h2>
<p><code>track by</code> 只是让 angular 复用已有 DOM 元素。数组每个子元素内部绑定表达式的脏检查还是免不了的。然而对于实际应用场景，往往是数组整体改变（例如分页），数组每一项通常却不会单独变化。这时就可以通过使用单次绑定大量减少 <code>$watch</code> 表达式的数量。例如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li ng-repeat=&quot;item in array track by item.id&quot;>
  <div>a: <span ng-bind=&quot;::item.a&quot;></span></div>
  <div>b: <span ng-bind=&quot;::item.b&quot;></span></div>
  <div>c: <span ng-bind=&quot;::item.c&quot;></span></div>
  <div>d: <span ng-bind=&quot;::item.d&quot;></span></div>
  <div>e: <span ng-bind=&quot;::item.e&quot;></span></div>
</li>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">ng-repeat</span>=<span class="hljs-string">"item in array track by item.id"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>a: <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">ng-bind</span>=<span class="hljs-string">"::item.a"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>b: <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">ng-bind</span>=<span class="hljs-string">"::item.b"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>c: <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">ng-bind</span>=<span class="hljs-string">"::item.c"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>d: <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">ng-bind</span>=<span class="hljs-string">"::item.d"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>e: <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">ng-bind</span>=<span class="hljs-string">"::item.e"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></code></pre>
<p>除非 <code>track by</code> 字段改变造成的 DOM 树重建，<code>item.a</code> 等一旦显示在页面上后就不会再被监视。</p>
<p>如果每行有 5 个绑定表达式，每页显示 20 条记录，通过这种方法每页就可以减少 <code>5 * 20 = 100</code> 个绑定表达式的监视。</p>
<p>注意：如果在 <code>ng-repeat</code> 内部使用的单次绑定，就一定不要用 <code>track by $index</code>。否则用户切换下一页页面也不会更新。</p>
<h2 id="articleHeader12">使用分页减少绑定个数</h2>
<p>这个就不多说了。能后端分页的就后端分页；接口不支持分页的也要前端分页；前端分页时可以简单的写个 <code>filter</code> 用 <code>Array.prototype.slice</code> 实现。</p>
<p>能直接减少数组中项的个数就不要在 <code>ng-repeat</code> 中每项上写 <code>ng-show</code> 或 <code>ng-if</code></p>
<h2 id="articleHeader13">写在最后的话</h2>
<p>脏检查这个东西，其实在三大主流前端框架中或多或少都有涉及。React 每次生成新的 <code>Virtual DOM</code>，与旧 <code>Virtual DOM</code> 的 diff 操作本来就可以看做一次脏检查。Vue 从相对彻底的抛弃了脏检查机制，使用 <code>Property</code> 主动触发 UI 更新，但是 Vue 仍然不能抛弃 <code>track by</code> 这个东西。</p>
<p>既然脏检查在三大主流框架里或多或少都有所保留，为什么唯独 Angular 的性能被广为诟病呢？其实还是说在 Angular 1 的机制下，脏检查的执行范围过大以及频率太过频繁了。Angular 1.5 从 Angular 2+ 引入了组件（<code>Component</code>）的概念，然而形似而神非，其实只是一个特殊的 <code>Directive</code> 马甲而已，并不能将脏检查的执行范围限制在各个组件之内，所以并不能本质的改变 Angular 1 脏检查机制效率低下的现状。</p>
<p>也许 Angular 1 终将被淘汰。但 Angular 作为前端第一个 MVVM 框架，着实引发了前端框架更新换代的热潮。百足之虫死而不僵，不管怎么样我还得继续维护停留在电脑里的 Angular 1 项目。不过也许老板哪天大发慈悲给我们用 Vue 重构整个项目的时间，将来的事情谁知道呢？</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular 1 深度解析：脏数据检查与 angular 性能优化

## 原文链接
[https://segmentfault.com/a/1190000010433675](https://segmentfault.com/a/1190000010433675)

