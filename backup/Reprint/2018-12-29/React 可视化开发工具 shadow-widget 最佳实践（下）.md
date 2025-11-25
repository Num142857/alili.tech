---
title: 'React 可视化开发工具 shadow-widget 最佳实践（下）' 
date: 2018-12-29 2:30:10
hidden: true
slug: a1udipj7esa
categories: [reprint]
---

{{< raw >}}

                    
<p>本文介绍 "React + Shadow Widget" 应用于通用 GUI 开发的最佳实践，只聚焦于典型场景下最优开发方法。分上、下两篇讲解，下篇讲述正交框架分析模式与常用调测方法。</p>
<p>查阅上篇 <a href="https://segmentfault.com/a/1190000011520268">请点击这里</a>，Shadow Widget 开源项目 <a href="https://github.com/rewgt/shadow-server" rel="nofollow noreferrer" target="_blank">在这里</a>。</p>
<p><span class="img-wrap"><img data-src="/img/bVWu3d?w=600&amp;h=400" src="https://static.alili.tech/img/bVWu3d?w=600&amp;h=400" alt="thumbnail" title="thumbnail" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">1. Controller View 与 View</h2>
<p>典型的 Flux 框架中，Store 与 View 之间的关系如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVO94U?w=689&amp;h=579" src="https://static.alili.tech/img/bVO94U?w=689&amp;h=579" alt="mvc controller" title="mvc controller" style="cursor: pointer; display: inline;"></span></p>
<p>本图摘自 <code>fluxxor.com</code> 的 <a href="http://fluxxor.com/what-is-flux.html" rel="nofollow noreferrer" target="_blank">“What is Flux?”</a> 一文，Store 中的数据传递给一个 Component，这个 Component 又通过 props 属性驱动多层 Component 子节点来展示界面。在这种数据传递关系中，多个 Component 都是 View，但从 Store 获得数据的那个 View 比较特殊，称为 "Controller View"（见上图）。将 Controller View 与 View 对应到 Shadow Widget 的 MVVM 框架，Controller View 就是 VM（ViewModel），由 VM 驱动的子级 Component 就是 V (View)。</p>
<p>然而现实编程并非上图那么简单，Controller View 的子节点，也即 View 节点，有时很复杂，其外部若只依赖从上级 props 传递下来的数据来驱动渲染，会很别扭。开发者常不由自主的放弃 “纯净” 的编程模式，突破限制，让 View 也从全局变量读数据，即，变相的把部分数据从 Store 分离出去，改用全局变量表达，或者干脆让 View 也直接从 Store 读数据，而不是只用 Controller View 代传的数据。</p>
<p>Shadow Widget 将问题简化，既然 Store 主要用于存贮数据，那就还原它的数据特性，作为数据，在哪儿定义关系不大，直接拿 Component 的属性存贮数据就好，将 Store 并入 Component 没有不可逾越的障碍，当然，前提是我们已设计了 “双源属性” 与 “W 树” 机制。然后，Controller View 及其下级多个 View，合起来视作一个 FB（Functionarity Block），在同一 Functionarity Block Namespace 下用 javascript 定义各节点行为。把相关节点的投影定义写一起，很大程度消除了节点间隔阂，因为，你能随时可以定义一个变量用来传数据。</p>
<h2 id="articleHeader1">2. 正交框架分析模式</h2>
<p>接本文上篇的例子，假定我们在原功能基础上，再增加 “全局配置” 的功能，提供 3 个可选项：“自动选 Celsius 还是 Fahrenheit 格式”、“固定用 Celsius”、“固定用 Fahrenheit”。其中，第一个选项 Auto（自动选格式）依据浏览器特性推断国别信息，然后智能选择 Celsius 或 Fahrenheit。</p>
<p>新增如下界面设计：</p>
<p><span class="img-wrap"><img data-src="/img/bVWyQb?w=215&amp;h=121" src="https://static.alili.tech/img/bVWyQb?w=215&amp;h=121" alt="Celsius config" title="Celsius config" style="cursor: pointer; display: inline;"></span></p>
<p>相应的，增加一个 Functionarity Block，JS 编码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function() { // functionarity block

var configComp = null;

idSetter['config'] = function(value,oldValue) {
  // ...
};
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// functionarity block</span>

<span class="hljs-keyword">var</span> configComp = <span class="hljs-literal">null</span>;

idSetter[<span class="hljs-string">'config'</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value,oldValue</span>) </span>{
  <span class="hljs-comment">// ...</span>
};
})();</code></pre>
<p>该 FB 的入口节点是 <code>configComp</code>。再接着细化设计，我们该将 <code>configComp</code> 定义挪到全局变量定义区，因为该节点在两个 FB 功能块都用到。</p>
<p>为方便讲述起见，我们把这两个 FB 分别称为 config 与 calculator，以 FB 分布为横轴，以 W 树为纵轴，W 树中的节点是层层串联的，绘制这两个 FB 的分布如下图：</p>
<p><span class="img-wrap"><img data-src="/img/bVWyQy?w=363&amp;h=221" src="https://static.alili.tech/img/bVWyQy?w=363&amp;h=221" alt="正交框架" title="正交框架" style="cursor: pointer; display: inline;"></span></p>
<p><strong>当我们整体设计 GUI 时，应以 MVVM 方式思考</strong>。结合本例，也就是规划 config 与 calculator 两个 “功能块”，确定各功能块的入口节点，以及它的上下层串接关系。<strong>而处理各个功能块之间联动关系时，应切换到 Flux 单向数据流思考方式。</strong></p>
<p>总结一下，整个 HTML 页面是一颗 DOM 树，是纵向的，在这颗树划分若干功能块的过程，是基于 MVVM 为主的设计过程；而处理各功能块之间横向联系，则以 FRP 思路为主导。这一纵一横的思考方式，我们称为 <strong>“正交框架” 分析模式</strong>。</p>
<p>说明，Flux 是 FRP（Functional Reactiv Programming）开发思想的一种实现，对于 React 开发，上面所提 Flux 与 FRP 基本等效。</p>
<p>至于 FB 之间的功能如何交互，如果处理逻辑简单，不妨在相关 FB 代码块中直接写代码，如果逻辑复杂，不妨取相关 FB 的共有父节点作为入口节点，新设一个 FB 功能块。取共有父节点的主要作用是，该父节点从创建到 <code>unmount</code>，可以覆盖其下所有节点的生存周期，在它的 idSetter 函数中编程会方便一些。</p>
<h2 id="articleHeader2">3. 挂载数据来驱动调测</h2>
<p>在可视设计器中开发界面的过程，可能存在破坏式重构，比如你在某个 FB 的入口节点指定 <code>data</code> 属性值，然后它的子节点根据 <code>data</code> 取值自动生成子节点，如果你给定的 <code>data</code> 初始值格式不对，其下子节点会无法生成。所给初值不对可能因为设计变化了，你的 <code>data</code> 格式还没来得及调整。</p>
<p>为了最大幅度减少上述破坏式重构带来错误，在设计界面时，我们建议用作驱动源头的数据初值应取 “空” 值，比如赋给 <code>null</code> 或 <code>[]</code> 之类的值。</p>
<p>界面设计过程中，若想查看不同数据初值会驱动什么样的界面形态，不妨启用 <code>W.$dataSrc</code> 定义，比如前面例子界面缺省显示 Celsius 温度格式，因为 <code>'.body.calculator.field'</code> 节点的 <code>scale</code> 属性初值是 <code>'c'</code>，现在我们想检查 <code>scale='f'</code> 界面是否正确。按如下方式使用两行代码即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!window.W) { window.W = new Array(); W.$modules = [];}
W.$modules.push( function(require,module,exports) {

var W = require('shadow-widget');

var dataSrc = W.$dataSrc = {};
dataSrc['.body.calculator.field'] = { 'scale': 'f' };

});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (!<span class="hljs-built_in">window</span>.W) { <span class="hljs-built_in">window</span>.W = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(); W.$modules = [];}
W.$modules.push( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require,module,exports</span>) </span>{

<span class="hljs-keyword">var</span> W = <span class="hljs-built_in">require</span>(<span class="hljs-string">'shadow-widget'</span>);

<span class="hljs-keyword">var</span> dataSrc = W.$dataSrc = {};
dataSrc[<span class="hljs-string">'.body.calculator.field'</span>] = { <span class="hljs-string">'scale'</span>: <span class="hljs-string">'f'</span> };

});</code></pre>
<p>其中，<code>var dataSrc = W.$dataSrc = {}</code> 表示启用 <code>W.$dataSrc</code>，缺省是不启用的。另一句 <code>dataSrc['.body.calculator.field'] = { 'scale': 'f' }</code>，用来预定义哪个节点要附加哪些属性的初值。</p>
<p>上面代码可以写入独立的 js 文件，多个此类 js 文件可构造不同的调测场景，然后用 <code>&lt;script&gt;</code> 标签按需把某一个 js 文件导入到被测页面。</p>
<h2 id="articleHeader3">4. 结合 shadow-bootstrap 的可视化设计</h2>
<p><a href="https://github.com/rewgt/shadow-bootstrap" rel="nofollow noreferrer" target="_blank">shadow-bootstrap</a> 新近推出 v1.1 版本，Bootstrap 设计方式在 Shadow Widget 体系得到完整支持了。</p>
<p>Bootstrap 提供了优秀的前端控件库，在 shadow-widget 上用 bootstrap 堪称完美，毕竟上百个 class 类谁都记不住，大家做开发时，要不停的查手册。用 shadow-widget 的可视化设计器，只需从右侧样板页拖一个样板扔进来，就创建你想要的构件了，然后选择相应节点，把相关属性配置一下，你的界面很快就做好。</p>
<p><span class="img-wrap"><img data-src="/img/bVWyQY?w=219&amp;h=391" src="https://static.alili.tech/img/bVWyQY?w=219&amp;h=391" alt="样板页" title="样板页" style="cursor: pointer; display: inline;"></span></p>
<p>上图是其中一个样板页，该拖入哪个样板，看一眼就能区分，不再受那么多 class 类名困扰了。</p>
<h2 id="articleHeader4">5. 注意事项</h2>
<p>刚开始使用 Shadow Widget 时，大家可能不适应它的可视化设计，容易忘掉几项设计约束，简单举几个例子：</p>
<ol>
<li>在根节点（即 <code>".body"</code> 节点）下只能摆放面板与绝对定位的构件（如 ScenePage 等），即首层节点要么是 Panel 类构件，要么是指定 <code>position='absolute'</code> 的非行内构件。</li>
<li>绝对定位的构件，应挂到根节点，不宜在其它地方出现。（注：此项为建议，不强制）</li>
<li>面板之下不能直接放行内构件，要在面板下放置 P 类构件后，才能放 Span 类构件。</li>
<li>一个构件要么启用 <code>"html."</code> 属性，要么使用它的若干子节点，两者只能二选一，若定义子节点了，以 <code>"html."</code> 表示文本将被忽略。</li>
</ol>
<p>总之，与界面设计打交道，设计总是具体的，你要面对各类封装好的构件，不少构件有特殊要求，《Shadow Widget 用户手册》有全面介绍，有必要通读该手册。</p>
<h2 id="articleHeader5">6. 关于团队分工</h2>
<p>Shadow Widget 最佳实践还建议团队成员要按技能分工，至少有两个工种，其一是能运用他人已封装好的 WTC 类或库化 UI，进行 GUI 开发；其二是为他人封装 WTC 类或库化 UI。前者对技能要求不高，后者则要求深入掌握 React 与 Shadow Widget 知识。</p>
<p>对于微型团队，也应按上述分工的思路规划您的产品开发，因为这两种分工的目标不同，前者着眼短期目标，尽快把产品做出来，把界面弄漂亮些，后者着眼中长期目标，用封装库提高开发复用率。即使是单人团队，同样需要分工，无非在时间上错开，一段时间承担一种角色，另一段时间换一个角色。</p>
<p>Shadow Widget 当前的 WTC 类与界面库还不够丰富，但它的架子已搭好，起点不低。它的定制扩展能力出色，已通过一些上规模代码的产品检验，如 <a href="https://github.com/rewgt/shadow-bootstrap" rel="nofollow noreferrer" target="_blank"><code>shadow-bootstrap</code></a>， <a href="https://github.com/rewgt/blogs" rel="nofollow noreferrer" target="_blank"><code>pinp-blogs</code></a> 等，具备一定成熟度。我们有理由相信，这个产品会随着扩展库逐渐增多，前景越来越光明。</p>
<p>（本文完）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 可视化开发工具 shadow-widget 最佳实践（下）

## 原文链接
[https://segmentfault.com/a/1190000011534668](https://segmentfault.com/a/1190000011534668)

