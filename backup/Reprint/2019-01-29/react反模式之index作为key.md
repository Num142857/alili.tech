---
title: 'react反模式之index作为key' 
date: 2019-01-29 2:30:10
hidden: true
slug: ud2tx9iukb
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">react反模式之index作为key</h1>
<blockquote><p><a href="https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318#.dn6v6ftcc" rel="nofollow noreferrer" target="_blank">原文：Index as a key is an anti-pattern</a></p></blockquote>
<p>我已经看到过很多React开发人员在渲染一个列表时使用index作为它的key</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{todos.map((todo, index) => 
    <Todo {...todo}
        key={index} />
)}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{todos.map(<span class="hljs-function">(<span class="hljs-params">todo, index</span>) =&gt;</span> 
    &lt;Todo {...todo}
        key={index} /&gt;
)}</code></pre>
<p>这样写看起来很优雅并且确实摆脱了react的警告信息，那么这样写有危险的地方吗？<br><br><br>  <em>这样会破坏你的应用让其显示出错误的数据</em> </p>
<p>下面我来解释下，key是React来识别DOM元素的唯一属性。如果你往数组里面增加一些元素或者从数组中间移除一些东西会发生些什么呢？如果key属性和以前一样React会认为DOM元素表示的组件和以前是一样的，但是那是错误的。</p>
<p>这里我有个<a href="http://output.jsbin.com/wohima" rel="nofollow noreferrer" target="_blank">简单的例子</a>来演示这个潜在的危险<a href="http://jsbin.com/wohima/edit?js,output" rel="nofollow noreferrer" target="_blank">源码</a><br><span class="img-wrap"><img data-src="/img/bVHl82?w=1434&amp;h=543" src="https://static.alili.tech/img/bVHl82?w=1434&amp;h=543" alt="index错误例子" title="index错误例子" style="cursor: pointer; display: inline;"></span></p>
<p>事实证明，React 会用index作为默认的key的值因为这个时候React认为用index是最合理的。因此，React会警告你那样做是为达标准的（这样说看起来有点困惑. 如果你自己提供了key属性React会认为你知道自己在做啥. 记住这个例子，它可能会导致错误。</p>
<h3 id="articleHeader1">Better</h3>
<p>列表里面的每一项都应该又一个永久并且唯一的属性，理想情况下应该在创建列表的时候分配下去. 当然我指的是id. 我们可以像下面这样使用它:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{todos.map((todo) => 
    <Todo {...todo}
        key={todo.id} />
)}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{todos.map(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> 
    &lt;Todo {...todo}
        key={todo.id} /&gt;
)}</code></pre>
<p>另外的实现方式是把编号递增添加到抽象方法中，使用一个全局的index来确保任何两个列表项的id不同。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="todoCounter = 1;
function createNewTodo(text) {
    return {
        completed: false,
        id: todoCounter++,
        text
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">todoCounter = <span class="hljs-number">1</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createNewTodo</span>(<span class="hljs-params">text</span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">id</span>: todoCounter++,
        text
    }
}</code></pre>
<h3 id="articleHeader2">Much better</h3>
<p>一个产品化的解决方案是它应该更加健壮，能够用来创建分散的列表项. 因此我强烈推荐一个npm包<a href="https://www.npmjs.com/package/shortid" rel="nofollow noreferrer" target="_blank">shortid</a>, 它可以快速的生成一系列‘短的 无序的 对url友好的 唯一的’ id，下面是示例代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var shortid = require('shortid');

function createNewTodo(text) {
    return {
        completed: false,
        id: shortid.generate(),
        text
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> shortid = <span class="hljs-built_in">require</span>(<span class="hljs-string">'shortid'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createNewTodo</span>(<span class="hljs-params">text</span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">id</span>: shortid.generate(),
        text
    }
}</code></pre>
<p>TL;DR: 为每个列表项生成一个唯一的id，然后在渲染列表项时作为key属性传给列表项.</p>
<h2 id="articleHeader3">References and related articles</h2>
<p>. <a href="https://facebook.github.io/react/docs/composition-vs-inheritance.html" rel="nofollow noreferrer" target="_blank">Dynamic Children</a>and <a href="https://facebook.github.io/react/docs/create-fragment.html" rel="nofollow noreferrer" target="_blank">Keyed Fragments</a> in React Docs<br>. <a href="https://github.com/facebook/react/issues/1342#issuecomment-39230939" rel="nofollow noreferrer" target="_blank">Explanation from Paul O’Shannessy</a><br>. <a href="https://coderwall.com/p/jdybeq/the-importance-of-component-keys-in-react-js" rel="nofollow noreferrer" target="_blank">The importance of component keys in React.js</a><br>. <a href="http://blog.arkency.com/2014/10/react-dot-js-and-dynamic-children-why-the-keys-are-important/" rel="nofollow noreferrer" target="_blank">React.js and Dynamic Children — Why the Keys are Important</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react反模式之index作为key

## 原文链接
[https://segmentfault.com/a/1190000007910897](https://segmentfault.com/a/1190000007910897)

