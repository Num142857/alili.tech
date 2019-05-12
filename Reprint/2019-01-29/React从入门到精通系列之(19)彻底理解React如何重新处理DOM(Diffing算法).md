---
title: 'React从入门到精通系列之(19)彻底理解React如何重新处理DOM(Diffing算法)' 
date: 2019-01-29 2:30:10
hidden: true
slug: 9olr7ly70mf
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">十九、彻底理解React如何重新处理DOM(Diffing算法)</h2>
<p>React提供了一个声明式的API，所以你不必担心每次DOM更新时内部会修改哪些东西。虽然在React中并不是那么明显地告诉你具体如何实现的，不过这也让编写应用变得更加容易。</p>
<p>本文会详细解释在React中的<code>“diffing”</code>算法是怎么做的，以便组件更新是可预测的，从而让高性能应用变得足够快。</p>
<h3 id="articleHeader1">动机</h3>
<p>当使用React时，在单个时间点，您可以将<code>render()</code>函数看做是在创建React元素树。 在下一个<code>state</code>或<code>props</code>更新时<code>render()</code>函数将返回一个不同的React元素树。 React需要弄清楚如何高效地更新UI去匹配上最新的元素树。</p>
<p>对于将一个树变换成另一个树的最小操作数的算法问题，现在已经存在一些比较通用的解决方案。 然而，那些现有的最先进的技术算法都有<code>O(n^3)</code>的复杂度（n是树中的元素的数量）。</p>
<p>如果在React中使用这些算法，显示1000个元素将需要大约十亿次比较。 这个真的代价太昂贵了。 相反，React实现了一个<code>基于两个假设</code>直观推断出的<code>O(n)</code>算法：</p>
<ol>
<li><p>不同类型的两个元素将产生不同的树。</p></li>
<li><p>开发人员可以在不同渲染之间使用<code>key</code>属性来表示哪些子元素是稳定的。</p></li>
</ol>
<p>实际上，这两条假设对几乎所有的实际使用都是有效的。</p>
<h3 id="articleHeader2">Diffing算法</h3>
<p>当比较两棵DOM树的差异时，React首先比较两个根元素。 如果根元素的类型不同，那么行为也是不同的。</p>
<h4>不同类型的DOM元素</h4>
<p>每当根元素是不同的类型时，React将删除旧的DOM树并从头开始重新构建新的DOM树。 从<code>&lt;a&gt;</code>到<code>&lt;img&gt;</code>、从<code>&lt;Article&gt;</code>到<code>&lt;Comment&gt;</code>、从<code>&lt;Button&gt;</code>到<code>&lt;div&gt;</code> ，只要不一样就会完全重新构建。</p>
<p>当删除就的DOM树时，旧的DOM节点也被删掉。 这个时候组件实例触发<code>componentWillUnmount()</code>函数 。当构建一个新的DOM树时，新的DOM节点会被插入到DOM中。 组件实例触发<code>componentWillMoun()</code>和<code>componentDidMount()</code>。 与之前旧的DOM树相关联的任何<code>state</code>也都将丢失。</p>
<p>在根元素之下的任何组件将被卸载并且它们的<code>state</code>也会全部丢失。 例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 从
<div>
    <Counter />
</div>
// 变为
<span>
    <Counter />
</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 从</span>
&lt;div&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Counter</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
<span class="hljs-comment">// 变为</span>
&lt;span&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Counter</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span></code></pre>
<p>因为根元素从<code>div</code>变为了<code>span</code>，所以旧的<code>Counter</code>组件将被销毁，然后再重新构建一个新的。</p>
<h4>相同类型的DOM元素</h4>
<p>当比较相同类型的两个React DOM元素时，React会先查看两者的属性差异，然后保留相同的底层DOM节点，仅仅去更新那些被更改的属性。 例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div className=&quot;before&quot; title=&quot;hello&quot; />

<div className=&quot;after&quot; title=&quot;hello&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;div className=<span class="hljs-string">"before"</span> title=<span class="hljs-string">"hello"</span> /&gt;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"after"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"hello"</span> /&gt;</span></span></code></pre>
<p>通过比较这两个元素属性，React就会知道只需要修改底层DOM节点上的<code>className</code>即可。</p>
<p>当更新<code>style</code>属性时，React也会知道只需要更新<code>style</code>中的那些已更改的属性。 例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div style="{{"color: 'red', width: '300px'"}}" />

<div style="{{"color: 'red', width: '400px'"}}" />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;div style="{{"<span class="hljs-attr">color</span>: <span class="hljs-string">'red'</span>, <span class="hljs-attr">width</span>: <span class="hljs-string">'300px'</span>"}}" /&gt;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"color:</span> '<span class="hljs-attr">red</span>', <span class="hljs-attr">width:</span> '<span class="hljs-attr">400px</span>'"}}" /&gt;</span></span></code></pre>
<p>当在这两个元素之间转换时，React知道只需修改<code>width</code>，而不是<code>color</code>。</p>
<p><strong>处理根DOM节点后，React会根据上面的判断逻辑对子节点进行递归扫描。</strong></p>
<h4>相同类型的组件元素</h4>
<p>当组件更新时，实例保持不变，因此在不同的渲染之间组件内的<code>state</code>是保持不变的。 React会更新底层组件实例的<code>props</code>来匹配新元素，并在底层实例上调用<code>componentWillReceiveProps()</code>和<code>componentWillUpdate()</code>。</p>
<p>接下来，调用<code>render()</code>方法，<code>diff</code>算法就会对上一个结果和新结果进行递归比较。</p>
<h4>递归子元素</h4>
<p>默认情况下，当对DOM节点的子元素进行递归时，React只是同时迭代两个子元素lists，并在有差异时产生变化。</p>
<p>例如，当在子元素的末尾再添加一个元素时，这两个树之间就会有一个的很好转换效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
    <l1>one</li>
    <li>two</li>
</ul>

<ul>
    <li>one</li>
    <li>two</li>
    <li>three</li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;ul&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">l1</span>&gt;</span>one<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li&gt;two&lt;<span class="hljs-regexp">/li&gt;
&lt;/u</span>l&gt;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>one<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>two<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>three<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span></code></pre>
<p>React将匹配两个<code>&lt;li&gt;one&lt;/li&gt;</code>树，匹配两个<code>&lt;li&gt;two&lt;/li&gt;</code>树，然后插入一个<code>&lt;li&gt;three&lt;/li&gt;</code>树。</p>
<p>但是，不要太天真了。如果在子元素的开头部分插入一个元素的话，性能会便的很差。 例如，这两棵树之间的转换效果就很差：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
    <li>one</li>
    <li>two</li>
<ul>

<ul>
    <li>zero</li>
    <li>one</li>
    <li>two</li>
<ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;ul&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>one<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li&gt;two&lt;<span class="hljs-regexp">/li&gt;
&lt;ul&gt;

&lt;ul&gt;
    &lt;li&gt;zero&lt;/</span>li&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>one<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li&gt;two&lt;<span class="hljs-regexp">/li&gt;
&lt;ul&gt;</span></code></pre>
<p>这种情况React将更改每个子元素 ，而不会意识到它可以保持<code>&lt;li&gt;one&lt;/li&gt;</code>和<code>&lt;li&gt;two&lt;/li&gt;</code>子元素树完好无损。 这种低效率的情况是一个必须注意的问题。</p>
<h4>keys</h4>
<p>为了解决上面的问题，React提供了一个<code>key</code>属性。 当子元素有<code>key</code>属性时，React使用<code>key</code>将原始树中的子元素与后续树中的子元素进行匹配。 例如，上面的那个低效例子添加一个<code>key</code>就可以让子元素树转换变的很有效：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
    <li key=&quot;1&quot;>one</li>
    <li key=&quot;2&quot;>two</li>
<ul>

<ul>
    <li key=&quot;0&quot;>zero</li>
    <li key=&quot;1&quot;>one</li>
    <li key=&quot;2&quot;>two</li>
<ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;ul&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">"1"</span>&gt;</span>one<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li key=<span class="hljs-string">"2"</span>&gt;two&lt;<span class="hljs-regexp">/li&gt;
&lt;ul&gt;

&lt;ul&gt;
    &lt;li key="0"&gt;zero&lt;/</span>li&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">"1"</span>&gt;</span>one<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    &lt;li key=<span class="hljs-string">"2"</span>&gt;two&lt;<span class="hljs-regexp">/li&gt;
&lt;ul&gt;</span></code></pre>
<p>现在React就可以知道<code>key="0"</code>的元素是新的，并且<code>key="1"</code>和<code>key="2"</code>的元素只需移动即可。</p>
<p>在实践中，使用一个唯一的<code>key</code>并不难。 您要显示的元素可能已具有唯一的<code>ID</code>，因此<code>key</code>可以来自你自己的数据中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li key={item.id>{item.name}</li>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&lt;li key={item.id&gt;{item.name}&lt;<span class="hljs-regexp">/li&gt;</span></code></pre>
<p>如果不是这样，你可以向数据模型中给每一项数据添加一个新的<code>ID</code>属性，或者对内容的某些部分进行哈希生成<code>key</code>。 <code>key</code>属性只有在其兄弟元素之间是唯一的，并不是全局唯一的。</p>
<p>最后一种方式是可以将数组中的索引作为<code>key</code>。 如果数组中的每一项不需要重新排序，同样也可以很好地工作，但是万一需要重新排序的话，这会变的很慢。</p>
<h3 id="articleHeader3">权衡利弊</h3>
<p>要记住重要的是，<code>diffing</code>算法是一个具体的实现细节。 React可以在每个操作上去重新渲染应用; 最终结果都是一样的。</p>
<p>在当前的实现中，你可以看到一个事实是一个子树已经成功移动到它的兄弟元素当中，但你不能告诉它已经移动到别的地方。 该算法将重新渲染这个完整的子元素树。</p>
<p>因为React很依赖这个直观推断的算法来判断DOM是否需要重新处理，如果不能满足这个算法的那两个假设条件前提，应用的性能将会受到很大影响。</p>
<ol>
<li><p>该算法不会去尝试匹配那些不同组件类型的子元素树。 如果你看到自己在返回相似输出结果的两个组件类型之间来来回回，你可能需要把它们改为相同的类型组件。</p></li>
<li><p><code>key</code>属性应该是稳定，可预测和唯一的。 不稳定的键(如使用<code>Math.random()</code>生的<code>key</code>)将导致许多组件实例和DOM节点进行不必要地重复创建，这可能导致子组件中的性能降低和<code>state</code>丢失。</p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React从入门到精通系列之(19)彻底理解React如何重新处理DOM(Diffing算法)

## 原文链接
[https://segmentfault.com/a/1190000007826792](https://segmentfault.com/a/1190000007826792)

