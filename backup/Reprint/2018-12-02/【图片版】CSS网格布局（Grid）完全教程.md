---
title: '【图片版】CSS网格布局（Grid）完全教程' 
date: 2018-12-02 2:30:15
hidden: true
slug: 0zn4yvq2syz
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">简言</h2>
<p>CSS网格布局（Grid）是一套二维的页面布局系统，它的出现将完全颠覆页面布局的传统方式。传统的CSS页面布局 一直不够理想。包括table布局、浮动、定位及内联块等方式，从本质上都是Hack的方式，并且遗漏了一些重要的功能（比如：垂直居中）。Flexbox的出现部分解决了上述问题，但Flex布局是为了解决简单的一维布局，适用于页面局部布局。而Grid天然就是为了解决复杂的二维布局而出现的，适用页面的整体布局。在实际工作中，Grid和Flexbox不但不矛盾，而且还能很好的结合使用。做为WEB程序员，我们在页面布局问题上都付出过努力，也将不断探索新的方案。而Grid是第一个专门为布局问题而生的CSS模块，我们有理由对Grid充满期待。</p>
<p>本文包括18个小节，62个实例，完整阅读需要时间20分钟以上。</p>
<p>为了获得最佳的阅体验，可以访问如下格式的教程：</p>
<p><a href="http://topic.42du.cn/grid" rel="nofollow noreferrer" target="_blank">学习CSS网格</a></p>
<h2 id="articleHeader1">1 网格容器</h2>
<p>将属性 <code>display</code> 值设为 <code>grid</code> 或 <code>inline-grid</code> 就创建了一个网格容器，所有容器直接子结点自动成为网格项目。</p>
<h3 id="articleHeader2">1.1 例1</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid  {
    display: grid;
｝" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span>  {
    <span class="hljs-attribute">display</span>: grid;
｝</code></pre>
<p>网格项目按行排列，网格项目占用整个容器的宽度。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690186?w=600&amp;h=290" src="https://static.alili.tech/img/remote/1460000014690186?w=600&amp;h=290" alt="网格容器演示1" title="网格容器演示1" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.42du.cn/run/122" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader3">1.1 例2</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid  {
    display: inline-grid;
｝" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span>  {
    <span class="hljs-attribute">display</span>: inline-grid;
｝</code></pre>
<p>网格项目按行排列，网格项目宽度由自身宽度决定。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690187?w=592&amp;h=290" src="https://static.alili.tech/img/remote/1460000014690187?w=592&amp;h=290" alt="网格容器演示2" title="网格容器演示2" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.42du.cn/run/123" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h2 id="articleHeader4">2 显示网格</h2>
<p>属性<code>grid-template-rows</code>和<code>grid-template-columns</code>用于显示定义网格，分别用于定义行轨道和列轨道。</p>
<h3 id="articleHeader5">2.1 例3</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid  {
    display: grid;
    grid-template-rows: 50px 100px；
｝" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span>  {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">50px</span> <span class="hljs-number">100px</span>；
｝</code></pre>
<p>属性<code>grid-template-rows</code>用于定义行的尺寸，即轨道尺寸。轨道尺寸可以是任何非负的长度值（px，%，em，等）</p>
<p>网格项目1的行高是50px，网格项目2的行高是100px。</p>
<p>因为只定义了两个行高，网格项目3和4的行高取决于其本身的高度。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690188?w=601&amp;h=287" src="https://static.alili.tech/img/remote/1460000014690188?w=601&amp;h=287" alt="显示网格演示1" title="显示网格演示1" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/124" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader6">2.2 例4</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid  {
    display: grid;
    grid-template-columns: 90px 50px 120px；
｝" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span>  {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">90px</span> <span class="hljs-number">50px</span> <span class="hljs-number">120px</span>；
｝</code></pre>
<p>类似于行的定义，属性<code>grid-template-columns</code>用于定义列的尺寸。</p>
<p>因为定义中只有三列，所以项目4，5，6排在新的一行; 并因为它们位于第1，2，3列的轨道上，所以其宽度等于定义中第1，2，3列轨道的宽度。</p>
<p>网格项目的第1列，第2列，第3列的宽度分别是 90px, 50px 和 120px 。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690189?w=601&amp;h=288" src="https://static.alili.tech/img/remote/1460000014690189?w=601&amp;h=288" alt="显示网格演示2" title="显示网格演示2" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/125" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader7">2.3 例5</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid  {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr；
｝" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span>  {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr <span class="hljs-number">2</span>fr；
｝</code></pre>
<p>单位<code>fr</code>用于表示轨道尺寸配额，表示按配额比例分配可用空间。</p>
<p>本例中，项目1占 1/4 宽度，项目2占 1/4 宽度，项目3占 1/2 宽度。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690190?w=601&amp;h=290" src="https://static.alili.tech/img/remote/1460000014690190?w=601&amp;h=290" alt="显示网格演示3" title="显示网格演示3" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/126" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader8">2.4 例6</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid  {
    display: grid;
    grid-template-columns: 3rem 25% 1fr 2fr；
｝" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span>  {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">3rem</span> <span class="hljs-number">25%</span> <span class="hljs-number">1</span>fr <span class="hljs-number">2</span>fr；
｝</code></pre>
<p>单位<code>fr</code>和其它长度单位混合使用时，<code>fr</code>的计算基于其它单位分配后的剩余空间。</p>
<p>本例中，<code>1fr = (容器宽度 - 3rem - 容器宽度的25%) / 3</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690191?w=601&amp;h=288" src="https://static.alili.tech/img/remote/1460000014690191?w=601&amp;h=288" alt="显示网格演示4" title="显示网格演示4" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/127" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h2 id="articleHeader9">3 轨道的最小最大尺寸设置</h2>
<p>函数<code>minmax()</code>用于定义轨道最小/最大边界值。</p>
<h3 id="articleHeader10">3.1 例7</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid  {
    display: grid;
    grid-template-rows:    minmax(100px, auto);
    grid-template-columns: minmax(auto, 50%) 1fr 3em;
｝" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span>  {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-rows</span>:    <span class="hljs-built_in">minmax</span>(100px, auto);
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-built_in">minmax</span>(auto, 50%) <span class="hljs-number">1</span>fr <span class="hljs-number">3em</span>;
｝</code></pre>
<p>函数<code>minmax()</code>接收两个参数：第一个参数表示最小轨道尺寸，第二个参数表示最大轨道尺寸。长度值可以是auto，表示轨道尺寸可以根据内容大小进行伸长或收缩。</p>
<p>本例中，第一行最小高度设置成100px，但是最大高度设置成<code>auto</code>，表示行高可以根据内容伸长超过100px。</p>
<p>本例中，第一列宽度的最大值设置成50%，表示其宽度不能超过整个容器宽度的50%。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690192?w=602&amp;h=363" src="https://static.alili.tech/img/remote/1460000014690192?w=602&amp;h=363" alt="轨道的最小最大尺寸设置演示1" title="轨道的最小最大尺寸设置演示1" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.42du.cn/run/128" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h2 id="articleHeader11">4 重复的网格轨道</h2>
<p>函数<code>repeat()</code>用来定义重复的网格轨道，尤其适用于有多个相同项目的情况下。</p>
<h3 id="articleHeader12">4.1 例8</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid  {
    display: grid;
    grid-template-rows:    repeat(4, 100px);
    grid-template-columns: repeat(3, 1fr);
｝" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span>  {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-rows</span>:    <span class="hljs-built_in">repeat</span>(4, 100px);
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-built_in">repeat</span>(3, 1fr);
｝</code></pre>
<p>函数<code>repeat()</code>接收两个参数：第一个参数表示重复的次数，第二个参数表示轨道尺寸。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690193?w=601&amp;h=417" src="https://static.alili.tech/img/remote/1460000014690193?w=601&amp;h=417" alt="重复的网格轨道演示1" title="重复的网格轨道演示1" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/129" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader13">4.2 例9</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid  {
    display: grid;
    grid-template-columns: 30px repeat(3, 1fr) 30px;
｝" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span>  {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">30px</span> <span class="hljs-built_in">repeat</span>(3, 1fr) <span class="hljs-number">30px</span>;
｝</code></pre>
<p>函数<code>repeat()</code>可以用在轨道定义列表当中。</p>
<p>本例中，第1列和第5列的宽度是30px。函数<code>repeat()</code>创建了中间3列，每一列宽度都是<code>1fr</code>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690194?w=602&amp;h=288" src="https://static.alili.tech/img/remote/1460000014690194?w=602&amp;h=288" alt="重复的网格轨道演示2" title="重复的网格轨道演示2" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/130" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h2 id="articleHeader14">5 定义网格间隙</h2>
<p>属性<code>grid-column-gap</code> 和 <code>grid-row-gap</code>用于定义网格间隙。</p>
<p>网格间隙只创建在行列之间，项目与边界之间无间隙。</p>
<h3 id="articleHeader15">5.1 例10</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid  {
    display: grid;
    grid-row-gap:    20px;
    grid-column-gap: 5rem;
｝" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span>  {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-row-gap</span>:    <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">grid-column-gap</span>: <span class="hljs-number">5rem</span>;
｝</code></pre>
<p>间隙尺寸可以是任何非负的长度值（px，%，em等）。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690195?w=601&amp;h=287" src="https://static.alili.tech/img/remote/1460000014690195?w=601&amp;h=287" alt="定义网格间隙演示1" title="定义网格间隙演示1" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/131" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader16">5.2 例11</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid  {
    display: grid;
    grid-gap: 100px 1em;
｝" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span>  {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-gap</span>: <span class="hljs-number">100px</span> <span class="hljs-number">1em</span>;
｝</code></pre>
<p>属性<code>grid-gap</code>是<code>grid-row-gap</code>和<code>grid-column-gap</code>的简写形式。</p>
<p>第一个值表示行间隙，第二个值表示列间隙。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690196?w=600&amp;h=288" src="https://static.alili.tech/img/remote/1460000014690196?w=600&amp;h=288" alt="定义网格间隙演示2" title="定义网格间隙演示2" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/132" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader17">5.3 例12</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid  {
    display: grid;
    grid-gap: 2rem;
｝" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span>  {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-gap</span>: <span class="hljs-number">2rem</span>;
｝</code></pre>
<p>如只有一个值，则其即表示行间隙，也表示列间隙。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690197?w=601&amp;h=289" src="https://static.alili.tech/img/remote/1460000014690197?w=601&amp;h=289" alt="定义网格间隙演示3" title="定义网格间隙演示3" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/133" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h2 id="articleHeader18">6 用网格线编号定位项目</h2>
<p>网格线本质上是用来表示网格轨道的开始和结束。</p>
<p>每一条网格线编号都以1开始，以1为步长向前编号，其中包括行列两组网格线。</p>
<h3 id="articleHeader19">6.1 例13</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item1 {
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 2;
    grid-column-end: 3;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item1</span> {
    <span class="hljs-attribute">grid-row-start</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">grid-row-end</span>: <span class="hljs-number">3</span>;
    <span class="hljs-attribute">grid-column-start</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">grid-column-end</span>: <span class="hljs-number">3</span>;
}</code></pre>
<p>这是一个3行2列的网格，即在行上有4条网格线，在列上有3条网格线。项目1利用网格线编号定位在第2行第2列的位置上。</p>
<p>本例中，项目只跨越一行一列，则<code>grid-row-end</code>和<code>grid-column-end</code>的定义可以省略。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690198?w=600&amp;h=352" src="https://static.alili.tech/img/remote/1460000014690198?w=600&amp;h=352" alt="用网格线编号定位项目演示1" title="用网格线编号定位项目演示1" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.42du.cn/run/134" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader20">6.2 例14</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item1 {
    grid-row:    2;
    grid-column: 3 / 4;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item1</span> {
    <span class="hljs-attribute">grid-row</span>:    <span class="hljs-number">2</span>;
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">3</span> / <span class="hljs-number">4</span>;
}</code></pre>
<p>属性<code>grid-row</code> 是 <code>grid-row-start</code> 和 <code>grid-row-end</code>的简写形式。</p>
<p>属性<code>grid-column</code> 是 <code>grid-column-start</code> 和 <code>grid-column-end</code>的简写形式。</p>
<p>如果只指定一个值，它表示 <code>grid-row/column-start</code>。</p>
<p>如果两个值都指定，第一个表示 <code>grid-row/column-start</code> ，第二个值表示<code>grid-row/column-end</code>。而且你必须用斜杠（/）分隔这两个值。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690199?w=602&amp;h=287" src="https://static.alili.tech/img/remote/1460000014690199?w=602&amp;h=287" alt="用网格线编号定位项目演示2" title="用网格线编号定位项目演示2" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/135" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader21">6.3 例15</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item1 {
    grid-area: 2 / 2 / 3 / 3;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item1</span> {
    <span class="hljs-attribute">grid-area</span>: <span class="hljs-number">2</span> / <span class="hljs-number">2</span> / <span class="hljs-number">3</span> / <span class="hljs-number">3</span>;
}</code></pre>
<p>属性<code>grid-area</code> 是 <code>grid-row-start</code>, <code>grid-column-start</code>, <code>grid-row-end</code> 和 <code>grid-column-end</code>的简写形式。</p>
<p>如果四个值都指定，则第一个表示 <code>grid-row-start</code>, 第二个表示 <code>grid-column-start</code>, 第三个表示 <code>grid-row-end</code> ,第四个表示 <code>grid-column-end</code>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690200?w=601&amp;h=286" src="https://static.alili.tech/img/remote/1460000014690200?w=601&amp;h=286" alt="用网格线编号定位项目演示3" title="用网格线编号定位项目演示3" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/136" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h2 id="articleHeader22">7 网格项目跨越行列</h2>
<p>网格项目默认都占用一行和一列，但可以使用前一节中定位项目的属性来指定项目跨越多行或多列。</p>
<h3 id="articleHeader23">7.1 例16</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item1 {
    grid-column-start: 1;
    grid-column-end:   4;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item1</span> {
    <span class="hljs-attribute">grid-column-start</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">grid-column-end</span>:   <span class="hljs-number">4</span>;
}</code></pre>
<p>通过<code>grid-column-start</code>和<code>grid-column-end</code>属性值的设置，使该网格项目跨越多列。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690201?w=600&amp;h=289" src="https://static.alili.tech/img/remote/1460000014690201?w=600&amp;h=289" alt="网格项目跨越行列演示1" title="网格项目跨越行列演示1" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/137" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader24">7.2 例17</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item1 {
    grid-row-start: 1;
    grid-row-end:   4;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item1</span> {
    <span class="hljs-attribute">grid-row-start</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">grid-row-end</span>:   <span class="hljs-number">4</span>;
}</code></pre>
<p>通过<code>grid-row-start</code>和<code>grid-row-end</code>属性值的设置，使该网格项目跨越多行。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690202?w=601&amp;h=288" src="https://static.alili.tech/img/remote/1460000014690202?w=601&amp;h=288" alt="网格项目跨越行列演示2" title="网格项目跨越行列演示2" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/138" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader25">7.3 例18</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item1 {
    grid-row:    2 / 5;
    grid-column: 2 / 4;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item1</span> {
    <span class="hljs-attribute">grid-row</span>:    <span class="hljs-number">2</span> / <span class="hljs-number">5</span>;
    <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">2</span> / <span class="hljs-number">4</span>;
}</code></pre>
<p>简写属性 <code>grid-row</code> 和 <code>grid-column</code> 即能用来定位项目，也能用来使项目跨越多个行列。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690203?w=600&amp;h=288" src="https://static.alili.tech/img/remote/1460000014690203?w=600&amp;h=288" alt="网格项目跨越行列演示1" title="网格项目跨越行列演示1" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/139" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader26">7.4 例19</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item1 {
    grid-row:    2 / span 3;
    grid-column: span 2;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item1</span> {
    <span class="hljs-attribute">grid-row</span>:    <span class="hljs-number">2</span> / span <span class="hljs-number">3</span>;
    <span class="hljs-attribute">grid-column</span>: span <span class="hljs-number">2</span>;
}</code></pre>
<p>关键字 <code>span</code> 用来指定跨越行或列的数量。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690204?w=601&amp;h=288" src="https://static.alili.tech/img/remote/1460000014690204?w=601&amp;h=288" alt="网格项目跨越行列演示1" title="网格项目跨越行列演示1" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/140" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h2 id="articleHeader27">8 网格线命名</h2>
<p>当利用属性<code>grid-template-rows</code> 和 <code>grid-template-columns</code>定义网格时，可以同时定义网格线的名称。网格线名称可以用于定位网格项目。</p>
<h3 id="articleHeader28">8.1 例20</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid  {
    display: grid;
    grid-template-rows:    [row-1-start] 1fr [row-2-start] 1fr [row-2-end];
    grid-template-columns: [col-1-start] 1fr [col-2-start] 1fr [col-3-start] 1fr [col-3-end];
｝" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span>  {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-rows</span>:    [row-<span class="hljs-number">1</span>-start] <span class="hljs-number">1</span>fr [row-<span class="hljs-number">2</span>-start] <span class="hljs-number">1</span>fr [row-<span class="hljs-number">2</span>-end];
    <span class="hljs-attribute">grid-template-columns</span>: [col-<span class="hljs-number">1</span>-start] <span class="hljs-number">1</span>fr [col-<span class="hljs-number">2</span>-start] <span class="hljs-number">1</span>fr [col-<span class="hljs-number">3</span>-start] <span class="hljs-number">1</span>fr [col-<span class="hljs-number">3</span>-end];
｝</code></pre>
<p>用属性<code>grid-template-rows</code> 和 <code>grid-template-columns</code>定义网格，同时定义网格线名称。</p>
<p>为避免混淆，网格线名称应避免使用规范中的关键字（<code>span</code>等）。</p>
<p>定义网格线名称的方法是要将其放在中括号内（<code>[name-of-line]</code>），并要和网格轨道相对应。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690205?w=600&amp;h=290" src="https://static.alili.tech/img/remote/1460000014690205?w=600&amp;h=290" alt="网格线命名演示1" title="网格线命名演示1" style="cursor: pointer;"></span></p>
<h3 id="articleHeader29">8.2 例21</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid  {
    display: grid;
    grid-template-rows:    [row-start row-1-start] 1fr [row-1-end row-2-start] 1fr [row-2-end row-end];
    grid-template-columns: [col-start] 1fr [col-2-start] 1fr [col-3-start] 1fr [col-end];
｝" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span>  {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-rows</span>:    [row-start row-<span class="hljs-number">1</span>-start] <span class="hljs-number">1</span>fr [row-<span class="hljs-number">1</span>-end row-<span class="hljs-number">2</span>-start] <span class="hljs-number">1</span>fr [row-<span class="hljs-number">2</span>-end row-end];
    <span class="hljs-attribute">grid-template-columns</span>: [col-start] <span class="hljs-number">1</span>fr [col-<span class="hljs-number">2</span>-start] <span class="hljs-number">1</span>fr [col-<span class="hljs-number">3</span>-start] <span class="hljs-number">1</span>fr [col-end];
｝</code></pre>
<p>可以给同一网格线定义多个名称，方法就是在中括号内用空格将多个名称分开。</p>
<p>每一个网格线名都可以被引用，以用来定位网格项目。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690206?w=601&amp;h=289" src="https://static.alili.tech/img/remote/1460000014690206?w=601&amp;h=289" alt="网格线命名演示2" title="网格线命名演示2" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader30">9 用网格线名定位项目</h2>
<p>利用命名的网格线，可以很方便地进行项目定位。</p>
<h3 id="articleHeader31">9.1 例22</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item1 {
    grid-row-start:    row-2-start;
    grid-row-end:      row-end;
    grid-column-start: col-2-start;
    grid-column-end:   col-end;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item1</span> {
    <span class="hljs-attribute">grid-row-start</span>:    row-<span class="hljs-number">2</span>-start;
    <span class="hljs-attribute">grid-row-end</span>:      row-end;
    <span class="hljs-attribute">grid-column-start</span>: col-<span class="hljs-number">2</span>-start;
    <span class="hljs-attribute">grid-column-end</span>:   col-end;
}</code></pre>
<p>引用网格线名称不用加中括号。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690207?w=600&amp;h=288" src="https://static.alili.tech/img/remote/1460000014690207?w=600&amp;h=288" alt="用网格线名定位项目演示1" title="用网格线名定位项目演示1" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.42du.cn/run/141" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader32">9.2 例23</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item1 {
    grid-row:    row-2-start / row-end;
    grid-column: col-2-start / col-end;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item1</span> {
    <span class="hljs-attribute">grid-row</span>:    row-<span class="hljs-number">2</span>-start / row-end;
    <span class="hljs-attribute">grid-column</span>: col-<span class="hljs-number">2</span>-start / col-end;
}</code></pre>
<p>简写属性<code>grid-row</code> 和 <code>grid-column</code>也可以利用网格线名称来定位项目。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690208?w=600&amp;h=288" src="https://static.alili.tech/img/remote/1460000014690208?w=600&amp;h=288" alt="用网格线名定位项目演示2" title="用网格线名定位项目演示2" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/142" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h2 id="articleHeader33">10 用同名网格线命名和定位项目</h2>
<p>函数<code>repeat()</code>可以定义同名网格线。这节省了给每条网格都命名的时间。</p>
<h3 id="articleHeader34">10.1 例24</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid {
    display: grid;
    grid-template-rows: repeat(3, [row-start] 1fr [row-end]);
    grid-template-columns: repeat(3, [col-start] 1fr [col-end]);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span> {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-built_in">repeat</span>(3, [row-start] 1fr [row-end]);
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-built_in">repeat</span>(3, [col-start] 1fr [col-end]);
}</code></pre>
<p>函数<code>repeat()</code>可以用来定义同名网格线。 这样多个网格线拥有相同的名字。</p>
<p>同名网格线会被分配一个位置编号，做为其唯一标识。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690209?w=601&amp;h=351" src="https://static.alili.tech/img/remote/1460000014690209?w=601&amp;h=351" alt="用同名网格线命名和定位项目演示1" title="用同名网格线命名和定位项目演示1" style="cursor: pointer;"></span></p>
<h3 id="articleHeader35">10.2 例25</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item1 {
    grid-row:    row-start 2 / row-end 3;
   grid-column: col-start / col-start 3;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item1</span> {
    <span class="hljs-attribute">grid-row</span>:    row-start <span class="hljs-number">2</span> / row-end <span class="hljs-number">3</span>;
   <span class="hljs-attribute">grid-column</span>: col-start / col-start <span class="hljs-number">3</span>;
}</code></pre>
<p>用同名网格线来定位项目时，应注意在网格线名称和编号之间有一个空格。</p>
<p>本例中，项目1的行定位开始于第2条名称是<code>row-start</code>的网格线，结束于第3条名称是<code>row-end</code>的网格线；列定位开始于第1条名称是<code>col-start</code>的网格线，结束于第3条名称是<code>col-start</code>的网格线。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690210?w=601&amp;h=350" src="https://static.alili.tech/img/remote/1460000014690210?w=601&amp;h=350" alt="用同名网格线命名和定位项目演示2" title="用同名网格线命名和定位项目演示2" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/143" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h2 id="articleHeader36">11 用网格区域命名和定位项目</h2>
<p>如同网格线命名，可以用属性<code>grid-template-areas</code>给网格区域命名。网格区域名称可以用来定位网格项目。</p>
<h3 id="articleHeader37">11.1 例26</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid {
    display: grid;
    grid-template-areas:   &quot;header header&quot;
                        &quot;content sidebar&quot;
                        &quot;footer footer&quot;;
    grid-template-rows:    150px 1fr 100px;
    grid-template-columns: 1fr 200px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span> {
    <span class="hljs-attribute">display</span>: grid;
    <span class="hljs-attribute">grid-template-areas</span>:   <span class="hljs-string">"header header"</span>
                        <span class="hljs-string">"content sidebar"</span>
                        <span class="hljs-string">"footer footer"</span>;
    <span class="hljs-attribute">grid-template-rows</span>:    <span class="hljs-number">150px</span> <span class="hljs-number">1</span>fr <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">1</span>fr <span class="hljs-number">200px</span>;
}</code></pre>
<p>一组区域名称要放在单引号或双引号内，每一个名称之间以空格分隔。</p>
<p>每一组名称定义一行，每一个名称定义一列。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690211?w=600&amp;h=314" src="https://static.alili.tech/img/remote/1460000014690211?w=600&amp;h=314" alt="用网格区域命名和定位项目演示1" title="用网格区域命名和定位项目演示1" style="cursor: pointer;"></span></p>
<h3 id="articleHeader38">11.2 例27</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="header {
    grid-row-start: header;
    grid-row-end: header;
    grid-column-start: header;
    grid-column-end: header;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">header</span> {
    <span class="hljs-attribute">grid-row-start</span>: header;
    <span class="hljs-attribute">grid-row-end</span>: header;
    <span class="hljs-attribute">grid-column-start</span>: header;
    <span class="hljs-attribute">grid-column-end</span>: header;
}</code></pre>
<p>网格区域名称可以用在属性<code>grid-row-start</code>, <code>grid-row-end</code>, <code>grid-column-start</code>, 和 <code>grid-column-end</code>的值中，用来定位项目。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690212?w=600&amp;h=280" src="https://static.alili.tech/img/remote/1460000014690212?w=600&amp;h=280" alt="用网格区域命名和定位项目演示2" title="用网格区域命名和定位项目演示2" style="cursor: pointer;"></span></p>
<h3 id="articleHeader39">11.3 例28</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="footer {
    grid-row: footer;
    grid-column: footer;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">footer</span> {
    <span class="hljs-attribute">grid-row</span>: footer;
    <span class="hljs-attribute">grid-column</span>: footer;
}</code></pre>
<p>网格区域名称也可以用于简写属性<code>grid-row</code> 和 <code>grid-column</code>的值中。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690213?w=600&amp;h=314" src="https://static.alili.tech/img/remote/1460000014690213?w=600&amp;h=314" alt="用网格区域命名和定位项目演示3" title="用网格区域命名和定位项目演示3" style="cursor: pointer;"></span></p>
<h3 id="articleHeader40">11.4 例29</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="aside {
    grid-area: sidebar;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">aside</span> {
    <span class="hljs-attribute">grid-area</span>: sidebar;
}</code></pre>
<p>网格区域名称也可以用于简写属性<code>grid-area</code>的值中。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690214?w=601&amp;h=313" src="https://static.alili.tech/img/remote/1460000014690214?w=601&amp;h=313" alt="用网格区域命名和定位项目演示4" title="用网格区域命名和定位项目演示4" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/144" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h2 id="articleHeader41">12 隐式网格</h2>
<p>隐式网格用来在显式网格之外定位项目。有时在显示网格中没有足够的空间，或者是要在显示网格之外定位项目就要用到隐式网格。这时可以把这些项目放置在隐式网格中。</p>
<p>隐式网格可以通过属性 <code>grid-auto-rows</code>, <code>grid-auto-columns</code>, 和 <code>grid-auto-flow</code> 来定义。</p>
<h3 id="articleHeader42">12.1 例30</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid {
    display : grid;
    grid-template-rows:    70px;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows:        140px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span> {
    <span class="hljs-attribute">display </span>: grid;
    <span class="hljs-attribute">grid-template-rows</span>:    <span class="hljs-number">70px</span>;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-built_in">repeat</span>(2, 1fr);
    <span class="hljs-attribute">grid-auto-rows</span>:        <span class="hljs-number">140px</span>;
}</code></pre>
<p>本例中，只定一个行轨道，因此项目 1 和 2 高 70px 。</p>
<p>第2行轨道有隐式网格自动创建并为项目 3 和 4 分配了空间。 属性<code>grid-auto-rows</code> 定义了隐式网格的行轨道尺寸，即项目3和4的高度是 140px 。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690215?w=601&amp;h=288" src="https://static.alili.tech/img/remote/1460000014690215?w=601&amp;h=288" alt="隐式网格演示1" title="隐式网格演示1" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/145" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader43">12.2 例31</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid {
    display : grid;
    grid-auto-flow: row;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span> {
    <span class="hljs-attribute">display </span>: grid;
    <span class="hljs-attribute">grid-auto-flow</span>: row;
}</code></pre>
<p>缺省的网格布局方向是行的方向（<code>row</code>）。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690216?w=601&amp;h=288" src="https://static.alili.tech/img/remote/1460000014690216?w=601&amp;h=288" alt="隐式网格演示2" title="隐式网格演示2" style="cursor: pointer;"></span></p>
<h3 id="articleHeader44">12.3 例32</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid {
    display : grid;
    grid-auto-flow: column;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span> {
    <span class="hljs-attribute">display </span>: grid;
    <span class="hljs-attribute">grid-auto-flow</span>: column;
}</code></pre>
<p>网格的布局方向可以定义为列的方向（column）。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690217?w=601&amp;h=289" src="https://static.alili.tech/img/remote/1460000014690217?w=601&amp;h=289" alt="隐式网格演示3" title="隐式网格演示3" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader45">12.4 例33</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid {
    display : grid;
    grid-template-columns: 30px 60px;
    grid-auto-flow:        column;
    grid-auto-columns:     1fr;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span> {
    <span class="hljs-attribute">display </span>: grid;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">30px</span> <span class="hljs-number">60px</span>;
    <span class="hljs-attribute">grid-auto-flow</span>:        column;
    <span class="hljs-attribute">grid-auto-columns</span>:     <span class="hljs-number">1</span>fr;
}</code></pre>
<p>本例中，我们只定义了两个列轨道的尺寸30px 和 60px。</p>
<p>隐式网格中自动创建其它列并给项目3，4，5分配空间；分配的空间尺寸是通过属性 <code>grid-auto-columns</code>定义的。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690218?w=602&amp;h=288" src="https://static.alili.tech/img/remote/1460000014690218?w=602&amp;h=288" alt="隐式网格演示4" title="隐式网格演示4" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.42du.cn/run/146" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h2 id="articleHeader46">13 隐式命名的网格区域</h2>
<p>网格线名称可以任意指定，但分配以 <code>-start</code> 和 <code>-end</code> 结尾的名字有额外的益处，这样隐式地创建了具名网格区域，该名称可以用于项目定位。</p>
<h3 id="articleHeader47">13.1 例34</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid {
    display : grid;
    grid-template-rows:    [outer-start] 1fr [inner-start] 1fr [inner-end] 1fr [outer-end];
    grid-template-columns: [outer-start] 1fr [inner-start] 1fr [inner-end] 1fr [outer-end];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span> {
    <span class="hljs-attribute">display </span>: grid;
    <span class="hljs-attribute">grid-template-rows</span>:    [outer-start] <span class="hljs-number">1</span>fr [inner-start] <span class="hljs-number">1</span>fr [inner-end] <span class="hljs-number">1</span>fr [outer-end];
    <span class="hljs-attribute">grid-template-columns</span>: [outer-start] <span class="hljs-number">1</span>fr [inner-start] <span class="hljs-number">1</span>fr [inner-end] <span class="hljs-number">1</span>fr [outer-end];
}</code></pre>
<p>本例中，行和列都有名为<code>inner-start</code> 和 <code>inner-end</code>的网格线，它们隐式地给网格区域分派了名称（<code>inner</code>）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="item1 {
    grid-area: inner;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">item1</span> {
    <span class="hljs-attribute">grid-area</span>: inner;
}</code></pre>
<p>这样我们就能够直接使用网格区域名来定位，而不需要再用网格线来定位项目了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690219?w=600&amp;h=352" src="https://static.alili.tech/img/remote/1460000014690219?w=600&amp;h=352" alt="隐式命名的网格区域演示1" title="隐式命名的网格区域演示1" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/147" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h2 id="articleHeader48">14 隐式命名的网格线</h2>
<p>隐式命名网格线和隐式命名的网格区域的工作原理刚好相反。</p>
<h3 id="articleHeader49">14.1 例35</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid {
    display : grid;
    grid-template-areas:   &quot;header header&quot;
                        &quot;content sidebar&quot;
                        &quot;footer footer&quot;;
    grid-template-rows:    80px 1fr 40px;
    grid-template-columns: 1fr 200px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span> {
    <span class="hljs-attribute">display </span>: grid;
    <span class="hljs-attribute">grid-template-areas</span>:   <span class="hljs-string">"header header"</span>
                        <span class="hljs-string">"content sidebar"</span>
                        <span class="hljs-string">"footer footer"</span>;
    <span class="hljs-attribute">grid-template-rows</span>:    <span class="hljs-number">80px</span> <span class="hljs-number">1</span>fr <span class="hljs-number">40px</span>;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">1</span>fr <span class="hljs-number">200px</span>;
}</code></pre>
<p>定义网格区域时隐式的命名了网格线的名称。这些网格线的名称是基于区域名加上<code>-start</code> 或 <code>-end</code>后缀组成的。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690220?w=600&amp;h=288" src="https://static.alili.tech/img/remote/1460000014690220?w=600&amp;h=288" alt="隐式命名的网格线演示1" title="隐式命名的网格线演示1" style="cursor: pointer;"></span></p>
<h3 id="articleHeader50">14.2 例36</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="item1 {
    grid-row-start:    header-start;
    grid-row-end:      content-start;
    grid-column-start: footer-start;
    grid-column-end:   sidebar-end;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">item1</span> {
    <span class="hljs-attribute">grid-row-start</span>:    header-start;
    <span class="hljs-attribute">grid-row-end</span>:      content-start;
    <span class="hljs-attribute">grid-column-start</span>: footer-start;
    <span class="hljs-attribute">grid-column-end</span>:   sidebar-end;
}</code></pre>
<p>本例中，header是通过隐式网格线名称进行定位的。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690221?w=592&amp;h=315" src="https://static.alili.tech/img/remote/1460000014690221?w=592&amp;h=315" alt="隐式命名的网格线演示2" title="隐式命名的网格线演示2" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/148" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h2 id="articleHeader51">15 层叠网格项目</h2>
<p>通过项目定位可以使多个项目层叠在一起，属性<code>z-index</code>可以改变层叠项目的层次。</p>
<h3 id="articleHeader52">15.1 例37</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item-1, .item-2 {
  grid-row-start:  1;
  grid-column-end: span 2;
}
.item-1 { grid-column-start: 1; z-index: 1; }
.item-2 { grid-column-start: 2 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item-1</span>, <span class="hljs-selector-class">.item-2</span> {
  <span class="hljs-attribute">grid-row-start</span>:  <span class="hljs-number">1</span>;
  <span class="hljs-attribute">grid-column-end</span>: span <span class="hljs-number">2</span>;
}
<span class="hljs-selector-class">.item-1</span> { <span class="hljs-attribute">grid-column-start</span>: <span class="hljs-number">1</span>; <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>; }
<span class="hljs-selector-class">.item-2</span> { <span class="hljs-attribute">grid-column-start</span>: <span class="hljs-number">2</span> }</code></pre>
<p>本例中，项目1 和 2 行定位开始于第1条行网格线，并跨越两列。</p>
<p>两个项目都是用网格线编号进行定位。项目1起始于第1条列网格线，项目2起始于第2条列网格线，这使得两个项目在第一行中间列发生层叠。</p>
<p>缺省情况下，项目2将层叠于项目1之上；然而，给项目1设置属性<code>z-index: 1</code>就使得项目1层叠于项目2之上。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690222?w=602&amp;h=289" src="https://static.alili.tech/img/remote/1460000014690222?w=602&amp;h=289" alt="层叠网格项目演示1" title="层叠网格项目演示1" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/149" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader53">15.2 例38</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".overlay {
    grid-row-start:    header-start;
    grid-row-end:      content-end;
    grid-column-start: content-start;
    grid-column-end:   sidebar-start;
    z-index: 1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.overlay</span> {
    <span class="hljs-attribute">grid-row-start</span>:    header-start;
    <span class="hljs-attribute">grid-row-end</span>:      content-end;
    <span class="hljs-attribute">grid-column-start</span>: content-start;
    <span class="hljs-attribute">grid-column-end</span>:   sidebar-start;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
}</code></pre>
<p>本例中，利用在 <code>grid-template-areas</code> 定义中的隐式网格线名称，定位了一个网格项目（<code>overlay</code>），并将层叠于上层。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690223?w=601&amp;h=315" src="https://static.alili.tech/img/remote/1460000014690223?w=601&amp;h=315" alt="层叠网格项目演示2" title="层叠网格项目演示2" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/150" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h2 id="articleHeader54">16 网格项目的对齐方式</h2>
<p>CSS的 <a href="https://drafts.csswg.org/css-align/" rel="nofollow noreferrer" target="_blank">盒模型对齐模块</a> 补充了CSS网格的内容，网格项目可以按行或列的轴线方向实现多种对齐方式。</p>
<p>属性<code>justify-items</code> 和 <code>justify-self</code> 以行轴为参照对齐项目，属性<code>align-items</code> 和 <code>align-self</code> 以列轴为参照对齐项目。</p>
<p>属性<code>justify-items</code> 和 <code>align-items</code> 是网格容器的属性，并支持如下这些值：</p>
<ul>
<li>auto</li>
<li>normal</li>
<li>start</li>
<li>end</li>
<li>center</li>
<li>stretch</li>
<li>baseline</li>
<li>first baseline</li>
<li>last baseline</li>
</ul>
<h3 id="articleHeader55">16.1 例39</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".grid {
    grid-template-rows: 80px 80px;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: &quot;content content&quot;
                       &quot;content content&quot;;
}
.item { grid-area: content }
.grid {
    justify-items: start
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.grid</span> {
    <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">80px</span> <span class="hljs-number">80px</span>;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr;
    <span class="hljs-attribute">grid-template-areas</span>: <span class="hljs-string">"content content"</span>
                       <span class="hljs-string">"content content"</span>;
}
<span class="hljs-selector-class">.item</span> { <span class="hljs-attribute">grid-area</span>: content }
<span class="hljs-selector-class">.grid</span> {
    <span class="hljs-attribute">justify-items</span>: start
}</code></pre>
<p>在行的轴线起点处对齐。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690224?w=601&amp;h=289" src="https://static.alili.tech/img/remote/1460000014690224?w=601&amp;h=289" alt=" 网格项目的对齐方式演示1" title=" 网格项目的对齐方式演示1" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/151" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader56">16.2 例40</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid {
    justify-items: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span> {
    <span class="hljs-attribute">justify-items</span>: center;
}</code></pre>
<p>在行的轴线中点处对齐。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690225?w=601&amp;h=289" src="https://static.alili.tech/img/remote/1460000014690225?w=601&amp;h=289" alt=" 网格项目的对齐方式演示2" title=" 网格项目的对齐方式演示2" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.42du.cn/run/152" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader57">16.3 例41</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid {
    justify-items: end;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span> {
    <span class="hljs-attribute">justify-items</span>: end;
}</code></pre>
<p>在行的轴线终点处对齐。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690226?w=601&amp;h=290" src="https://static.alili.tech/img/remote/1460000014690226?w=601&amp;h=290" alt=" 网格项目的对齐方式演示3" title=" 网格项目的对齐方式演示3" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.42du.cn/run/153" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader58">16.4 例42</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid {
    justify-items: stretch;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span> {
    <span class="hljs-attribute">justify-items</span>: stretch;
}</code></pre>
<p>在行的轴线方向延伸并填满整个区域。<code>stretch</code>是缺省值。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690227?w=600&amp;h=288" src="https://static.alili.tech/img/remote/1460000014690227?w=600&amp;h=288" alt=" 网格项目的对齐方式演示4" title=" 网格项目的对齐方式演示4" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/154" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader59">16.5 例43</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid {
    align-items: start;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span> {
    <span class="hljs-attribute">align-items</span>: start;
}</code></pre>
<p>在列的轴线起点处对齐。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690228?w=600&amp;h=288" src="https://static.alili.tech/img/remote/1460000014690228?w=600&amp;h=288" alt=" 网格项目的对齐方式演示5" title=" 网格项目的对齐方式演示5" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/155" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader60">16.6 例44</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid {
    align-items: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span> {
    <span class="hljs-attribute">align-items</span>: center;
}</code></pre>
<p>在列的轴线中点处对齐。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690229?w=602&amp;h=289" src="https://static.alili.tech/img/remote/1460000014690229?w=602&amp;h=289" alt=" 网格项目的对齐方式演示6" title=" 网格项目的对齐方式演示6" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/156" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader61">16.7 例45</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid {
    align-items: end;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span> {
    <span class="hljs-attribute">align-items</span>: end;
}</code></pre>
<p>在列的轴线终点处对齐。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690230?w=601&amp;h=289" src="https://static.alili.tech/img/remote/1460000014690230?w=601&amp;h=289" alt=" 网格项目的对齐方式演示7" title=" 网格项目的对齐方式演示7" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/157" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader62">16.8 例46</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid  {
    align-items: stretch;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span>  {
    <span class="hljs-attribute">align-items</span>: stretch;
}</code></pre>
<p>在列的轴线方向延伸并填满整个区域。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690231?w=600&amp;h=290" src="https://static.alili.tech/img/remote/1460000014690231?w=600&amp;h=290" alt="网格项目的对齐方式演示8" title="网格项目的对齐方式演示8" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/158" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader63">16.9 例47</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grid {
    justify-items: center;
    align-items:   center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">grid</span> {
    <span class="hljs-attribute">justify-items</span>: center;
    <span class="hljs-attribute">align-items</span>:   center;
}</code></pre>
<p>项目定位于行轴和列轴线的中间位置。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690232?w=601&amp;h=288" src="https://static.alili.tech/img/remote/1460000014690232?w=601&amp;h=288" alt="网格项目的对齐方式演示9" title="网格项目的对齐方式演示9" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/159" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h2 id="articleHeader64">17 网格项目的对齐方式2</h2>
<p>项目可以用属性align-self 和 justify-self定义自己的对齐方式，并支持如下这些属性值：</p>
<ul>
<li>auto</li>
<li>normal</li>
<li>start</li>
<li>end</li>
<li>center</li>
<li>stretch</li>
<li>baseline</li>
<li>first baseline</li>
<li>last baseline</li>
</ul>
<h3 id="articleHeader65">17.1 例48</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item1 { justify-self: start }
.item2 { justify-self: center }
.item3 { justify-self: end }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item1</span> { <span class="hljs-attribute">justify-self</span>: start }
<span class="hljs-selector-class">.item2</span> { <span class="hljs-attribute">justify-self</span>: center }
<span class="hljs-selector-class">.item3</span> { <span class="hljs-attribute">justify-self</span>: end }</code></pre>
<p>属性<code>justify-self</code> 在行的轴线方向定义对齐方式。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690233?w=602&amp;h=289" src="https://static.alili.tech/img/remote/1460000014690233?w=602&amp;h=289" alt="网格项目的对齐方式演示10" title="网格项目的对齐方式演示10" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/160" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader66">17.2 例49</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item1 { align-self: start }
.item2 { align-self: center }
.item3 { align-self: end }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item1</span> { <span class="hljs-attribute">align-self</span>: start }
<span class="hljs-selector-class">.item2</span> { <span class="hljs-attribute">align-self</span>: center }
<span class="hljs-selector-class">.item3</span> { <span class="hljs-attribute">align-self</span>: end }</code></pre>
<p>属性<code>align-self</code> 在列的轴线方向定义对齐方式。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690234?w=602&amp;h=290" src="https://static.alili.tech/img/remote/1460000014690234?w=602&amp;h=290" alt="网格项目的对齐方式演示11" title="网格项目的对齐方式演示11" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/161" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader67">17.3 例50</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item1 {
    justify-self: center
    align-self:   center
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item1</span> {
    <span class="hljs-attribute">justify-self</span>: center
    align-self:   center
}</code></pre>
<p>项目1定位在行的轴线和列的轴线的中间位置。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690235?w=600&amp;h=288" src="https://static.alili.tech/img/remote/1460000014690235?w=600&amp;h=288" alt="网格项目的对齐方式演示12" title="网格项目的对齐方式演示12" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/162" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h2 id="articleHeader68">18 网格轨道的对齐方式</h2>
<p>在网格容器中，网格轨道延轴线方向有多种对齐方式。</p>
<p>属性<code>align-content</code>用于定义网格轨道延着行的轴线的对齐方式，而属性<code>justify-content</code>用于定义网格轨道沿着列的轴线的对齐方式。并分别支持如下属性：</p>
<ul>
<li>normal</li>
<li>start</li>
<li>end</li>
<li>center</li>
<li>stretch</li>
<li>space-around</li>
<li>space-between</li>
<li>space-evenly</li>
<li>baseline</li>
<li>first baseline</li>
<li>last baseline</li>
</ul>
<h3 id="articleHeader69">18.1  例51</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".grid {
    width: 100%;
    height: 300px;
    grid-template-columns: repeat(4, 45px);
    grid-template-rows: repeat(4, 45px);
    grid-gap: 0.5em;
    justify-content: start;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.grid</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-built_in">repeat</span>(4, 45px);
    <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-built_in">repeat</span>(4, 45px);
    <span class="hljs-attribute">grid-gap</span>: <span class="hljs-number">0.5em</span>;
    <span class="hljs-attribute">justify-content</span>: start;
}</code></pre>
<p>列的轨道在行的轴线起点处对齐。<code>start</code> 是缺省值。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690236?w=600&amp;h=316" src="https://static.alili.tech/img/remote/1460000014690236?w=600&amp;h=316" alt="网格轨道的对齐方式演示1" title="网格轨道的对齐方式演示1" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/163" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader70">18.2  例52</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".grid {
    justify-content: end;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.grid</span> {
    <span class="hljs-attribute">justify-content</span>: end;
}</code></pre>
<p>列的轨道在行的轴线终点处对齐。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690237?w=600&amp;h=315" src="https://static.alili.tech/img/remote/1460000014690237?w=600&amp;h=315" alt="网格轨道的对齐方式演示2" title="网格轨道的对齐方式演示2" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/164" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader71">18.3  例53</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".grid {
    justify-content: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.grid</span> {
    <span class="hljs-attribute">justify-content</span>: center;
}</code></pre>
<p>列的轨道在行的轴线中间处对齐。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690238?w=600&amp;h=315" src="https://static.alili.tech/img/remote/1460000014690238?w=600&amp;h=315" alt="网格轨道的对齐方式演示3" title="网格轨道的对齐方式演示3" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/165" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader72">18.4  例54</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".grid {
    justify-content: space-around;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.grid</span> {
    <span class="hljs-attribute">justify-content</span>: space-around;
}</code></pre>
<p>在每一列的两侧平均分配额外空间。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690239?w=600&amp;h=317" src="https://static.alili.tech/img/remote/1460000014690239?w=600&amp;h=317" alt="网格轨道的对齐方式演示4" title="网格轨道的对齐方式演示4" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.42du.cn/run/166" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader73">18.5  例55</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".grid {
    justify-content: space-between;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.grid</span> {
    <span class="hljs-attribute">justify-content</span>: space-between;
}</code></pre>
<p>在列与列之间平均分配额外的空间。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690240?w=601&amp;h=316" src="https://static.alili.tech/img/remote/1460000014690240?w=601&amp;h=316" alt="网格轨道的对齐方式演示5" title="网格轨道的对齐方式演示5" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://www.42du.cn/run/167" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader74">18.6  例56</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".grid {
    justify-content: space-evenly;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.grid</span> {
    <span class="hljs-attribute">justify-content</span>: space-evenly;
}</code></pre>
<p>在列与列之间及列与边界之间平均分配额外空间。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690241?w=600&amp;h=313" src="https://static.alili.tech/img/remote/1460000014690241?w=600&amp;h=313" alt="网格轨道的对齐方式演示6" title="网格轨道的对齐方式演示6" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/168" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader75">18.7 例57</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".grid {
    align-content: start;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.grid</span> {
    <span class="hljs-attribute">align-content</span>: start;
}</code></pre>
<p>行的轨道在列的轴线起点处对齐，属性<code>start</code>是缺省值。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690242?w=600&amp;h=315" src="https://static.alili.tech/img/remote/1460000014690242?w=600&amp;h=315" alt="网格轨道的对齐方式演示7" title="网格轨道的对齐方式演示7" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/169" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader76">18.8 例58</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".grid {
    align-content: end;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.grid</span> {
    <span class="hljs-attribute">align-content</span>: end;
}</code></pre>
<p>行的轨道在列的轴线终点处对齐。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690243?w=601&amp;h=316" src="https://static.alili.tech/img/remote/1460000014690243?w=601&amp;h=316" alt="网格轨道的对齐方式演示8" title="网格轨道的对齐方式演示8" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/170" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader77">18.9 例59</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".grid {
    align-content: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.grid</span> {
    <span class="hljs-attribute">align-content</span>: center;
}</code></pre>
<p>行的轨道在列的轴线中点处对齐。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690244?w=601&amp;h=316" src="https://static.alili.tech/img/remote/1460000014690244?w=601&amp;h=316" alt="网格轨道的对齐方式演示9" title="网格轨道的对齐方式演示9" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/171" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader78">18.10 例60</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".grid {
    align-content: space-around;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.grid</span> {
    <span class="hljs-attribute">align-content</span>: space-around;
}</code></pre>
<p>每一行的两侧平均分配额外空间。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690245?w=600&amp;h=315" src="https://static.alili.tech/img/remote/1460000014690245?w=600&amp;h=315" alt="网格轨道的对齐方式演示10" title="网格轨道的对齐方式演示10" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/172" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader79">18.11 例61</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".grid {
    align-content: space-between;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.grid</span> {
    <span class="hljs-attribute">align-content</span>: space-between;
}</code></pre>
<p>在行与行之间平均分配额外空间。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690246?w=600&amp;h=316" src="https://static.alili.tech/img/remote/1460000014690246?w=600&amp;h=316" alt="网格轨道的对齐方式演示11" title="网格轨道的对齐方式演示11" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/173" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader80">18.12 例62</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".grid {
    align-content: space-evenly;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.grid</span> {
    <span class="hljs-attribute">align-content</span>: space-evenly;
}</code></pre>
<p>在行与行之间及行与边界之间平均分配额外空间。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014690247?w=600&amp;h=317" src="https://static.alili.tech/img/remote/1460000014690247?w=600&amp;h=317" alt="网格轨道的对齐方式演示12" title="网格轨道的对齐方式演示12" style="cursor: pointer;"></span></p>
<p><a href="http://www.42du.cn/run/174" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h2 id="articleHeader81">结语</h2>
<p>本教程相对全面地介绍了网格的相关内容，但这并不是一个完整的技术文档。想更全面的学习相关内容，推荐访问 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout" rel="nofollow noreferrer" target="_blank">Mozilla开发者网络</a> 和 <a href="https://www.w3.org/TR/css3-grid-layout/" rel="nofollow noreferrer" target="_blank">W3C</a> 的网格文档。</p>
<p>由于能力有限，翻译中难免错误较多，还请大家多多谅解！</p>
<p>十分感谢原文作者<a href="https://twitter.com/jonsuh" rel="nofollow noreferrer" target="_blank">Jonathan Suh</a>在本文排版设计，示例制作，文字编辑等方面卓越的工作。</p>
<p>为了获得最佳的阅体验，请访问如下排版的教程：</p>
<p><a href="http://topic.42du.cn/grid" rel="nofollow noreferrer" target="_blank">学习CSS网格</a></p>
<p><a href="https://learncssgrid.com/" rel="nofollow noreferrer" target="_blank">英文原版</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【图片版】CSS网格布局（Grid）完全教程

## 原文链接
[https://segmentfault.com/a/1190000014690181](https://segmentfault.com/a/1190000014690181)

