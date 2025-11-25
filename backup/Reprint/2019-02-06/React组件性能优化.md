---
title: 'React组件性能优化' 
date: 2019-02-06 2:30:09
hidden: true
slug: 5jwcyzoumjk
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>React: 一个用于构建用户界面的JAVASCRIPT库.</p></blockquote>
<p>React仅仅专注于UI层；它使用虚拟DOM技术，以保证它UI的高速渲染；它使用单向数据流，因此它数据绑定更加简单；那么它内部是如何保持简单高效的UI渲染呢？</p>
<p>React不直接操作DOM，它在内存中维护一个快速响应的DOM描述，render方法返回一个DOM的描述，React能够计算出两个DOM描述的差异，然后更新浏览器中的DOM。</p>
<p>就是说React在接收到props或者state更新时，React就会通过前面的方式更新UI。就算重新使用<code>ReactDOM.render(&lt;Component /&gt;, mountNode)</code>，它也只是当作props更新，而不是重新挂载整个组件。所以React整个UI渲染是比较快的。</p>
<h5>但是，这里面有几个问题</h5>
<p><strong>1. 如果更新的props和旧的一样，这个时候很明显UI不会变化，但是React还是要进行虚拟DOM的diff，这个diff就是多余的性能损耗，而且在DOM结构比较复杂的情况，整个diff会花费较长的时间。</strong></p>
<p><strong>2. 既然React总是要进行虚拟DOM的diff，那么它的diff规则是什么？怎么利用？</strong></p>
<h2 id="articleHeader0">PureRenderMixin</h2>
<p>针对第一个问题React给我们提供了    PureRenderMixin。<br>如果React组件是纯函数的，就是给组件相同的props和state组件就会展现同样的UI，可以使用这个Minxin来优化React组件的性能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var PureRenderMixin = require('react-addons-pure-render-mixin');
React.createClass({
      mixins: [PureRenderMixin],

      render: function() {
        return <div className={this.props.className}>foo</div>;
      }
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> PureRenderMixin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react-addons-pure-render-mixin'</span>);
React.createClass({
      <span class="hljs-attr">mixins</span>: [PureRenderMixin],

      <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{this.props.className}</span>&gt;</span>foo<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
      }
});
</code></pre>
<p>ES6中的用法是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import PureRenderMixin from 'react-addons-pure-render-mixin';
class FooComponent extends React.Component {
      constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
      }

      render() {
        return <div className={this.props.className}>foo</div>;
      }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>
<span class="hljs-keyword">import</span> <span class="hljs-type">PureRenderMixin</span> from <span class="hljs-symbol">'react</span>-addons-pure-render-mixin';
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">FooComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
      constructor(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.shouldComponentUpdate = <span class="hljs-type">PureRenderMixin</span>.shouldComponentUpdate.bind(<span class="hljs-keyword">this</span>);
      }

      render() {
        <span class="hljs-keyword">return</span> &lt;div className={<span class="hljs-keyword">this</span>.props.className}&gt;foo&lt;/div&gt;;
      }
}</code></pre>
<p>PureRenderMixin的原理就是它实现了shouldComponentUpdate，在shouldComponentUpdate内它比较当前的props、state和接下来的props、state，当两者相等的时候返回false，这样组件就不会进行虚拟DOM的diff。</p>
<p><strong>这里需要注意：</strong><br><em>PureRenderMixin内进行的仅仅是浅比较对象。如果对象包含了复杂的数据结构，深层次的差异可能会产生误判。仅用于拥有简单props和state的组件。</em></p>
<h2 id="articleHeader1">shouldComponentUpdate</h2>
<p>React虽然提供简单的PureRenderMixin来提升性能，但是如果有更特殊的需求时怎么办？如果组件有复杂的props和state怎么办？这个时候就可使用shouldComponentUpdate来进行更加定制化的性能优化。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="boolean shouldComponentUpdate(object nextProps, object nextState) {
    return nexprops.id !== this.props.id;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>boolean shouldComponentUpdate(<span class="hljs-keyword">object</span> nextProps, <span class="hljs-keyword">object</span> nextState) {
    <span class="hljs-keyword">return</span> nexprops.id !== <span class="hljs-keyword">this</span>.props.id;
}</code></pre>
<p>在React组件需要更新之前就会调用这个方法，如果这个方法返回false，则组件不更新；如果返回true，则组件更新。在这个方法内部可以通过nextProps和当前props，nextState和当前state的对比决定组件要不要更新。</p>
<p>如果对比的数据结构比较复杂，层次较深，对比的过程也是会有较大性能消耗，又可能得不偿失。<br>这个时候<strong><a href="https://facebook.github.io/immutable-js/" rel="nofollow noreferrer" target="_blank">immutable.js</a></strong>就要登场了，也是fb出品，有人说这个框架的意义不亚于React，但是React光芒太强。它能解决复杂数据在deepClone和对比过程中性能损耗。</p>
<p><strong>注意:</strong>shouldComponentUpdate在初始化渲染的时候不会调用，但是在使用forceUpdate方法强制更新的时候也不会调用。</p>
<h2 id="articleHeader2">render</h2>
<p>PureRenderMixin和shouldComponentUpdate的关注点是UI需不需要更新，而render则更多关注虚拟DOM的diff规则了，如何让diff结果最小化、过程最简化是render内优化的关注点。</p>
<p>React在进行虚拟DOM diff的时候假设：</p>
<p><strong>1、拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构。</strong><br><strong>2、可以为元素提供一个唯一的标志，该元素在不同的渲染过程中保持不变。</strong></p>
<p><em>DOM结构</em>&nbsp;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="renderA: <div />
renderB: <span />
=> [removeNode <div />], [insertNode <span />
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code>rende<span class="hljs-symbol">rA:</span> &lt;div /&gt;
rende<span class="hljs-symbol">rB:</span> &lt;span /&gt;
=&gt; [removeNode &lt;div /&gt;], [insertNode &lt;span /&gt;
</code></pre>
<p><em>DOM属性</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="renderA: <div id=&quot;before&quot; />
renderB: <div id=&quot;after&quot; />
=> [replaceAttribute id &quot;after&quot;]

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code>rende<span class="hljs-symbol">rA:</span> &lt;div id=<span class="hljs-string">"before"</span> /&gt;
rende<span class="hljs-symbol">rB:</span> &lt;div id=<span class="hljs-string">"after"</span> /&gt;
=&gt; [replaceAttribute id <span class="hljs-string">"after"</span>]

</code></pre>
<p><em>之前插入DOM</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="renderA: <div><span>first</span></div>
renderB: <div><span>second</span><span>first</span></div>
=> [replaceAttribute textContent 'second'], [insertNode <span>first</span>]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>renderA: <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>first<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
renderB: <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>second<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>first<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
=&gt; [replaceAttribute textContent <span class="hljs-string">'second'</span>], [insertNode &lt;span&gt;first&lt;<span class="hljs-regexp">/span&gt;]</span></code></pre>
<p><em>之前插入DOM，有key的情况</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="renderA: <div><span key=&quot;first&quot;>first</span></div>
renderB: <div><span key=&quot;second&quot;>second</span><span key=&quot;first&quot;>first</span></div>
=> [insertNode <span>second</span>]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>renderA: <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">key</span>=<span class="hljs-string">"first"</span>&gt;</span>first<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
renderB: <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">key</span>=<span class="hljs-string">"second"</span>&gt;</span>second<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">key</span>=<span class="hljs-string">"first"</span>&gt;</span>first<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
=&gt; [insertNode <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>second<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>]
</code></pre>
<p>由于依赖于两个预判条件，如果这两个条件都没有满足，性能将会大打折扣。</p>
<p><strong>1、diff算法将不会尝试匹配不同组件类的子树。如果发现正在使用的两个组件类输出的 DOM 结构非常相似，你可以把这两个组件类改成一个组件类。</strong></p>
<p><strong>2、如果没有提供稳定的key（例如通过 Math.random() 生成），所有子树将会在每次数据更新中重新渲染。</strong></p>
<h2 id="articleHeader3">总结</h2>
<p>使用PureRenderMixin、shouldComponentUpdate来避免不必要的虚拟DOM diff，在render内部优化虚拟DOM的diff速度，以及让diff结果最小化。</p>
<p>使用immutable.js解决复杂数据diff、clone等问题。</p>
<h2 id="articleHeader4">参考</h2>
<p><strong><a href="https://facebook.github.io/immutable-js/" rel="nofollow noreferrer" target="_blank">immutable.js</a></strong></p>
<p><strong><a href="https://facebook.github.io/react/docs/reconciliation.html" rel="nofollow noreferrer" target="_blank">reconciliation</a></strong></p>
<p><strong><a href="https://facebook.github.io/react/docs/pure-render-mixin.html" rel="nofollow noreferrer" target="_blank">pure-render-mixin</a></strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React组件性能优化

## 原文链接
[https://segmentfault.com/a/1190000006100489](https://segmentfault.com/a/1190000006100489)

