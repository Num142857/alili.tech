---
title: '虚拟DOM内部是如何工作的' 
date: 2019-01-09 2:30:11
hidden: true
slug: 7vgql584ki8
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://medium.com/@rajaraodv/the-inner-workings-of-virtual-dom-666ee7ad47cf" rel="nofollow noreferrer" target="_blank">英文原文链接</a></p>
<p>Virtual DOM很神奇，同时也比较复杂，难以理解。react,preact和相似的js库都使用了virtual dom。然而，我找不到任何好的文章或者文档，可以详细地又容易理解的方式来解释它。因此我决定自己写一篇。</p>
<p>注意：文章篇幅较长，文中有大量的图片来帮助理解。文中使用的是preact的代码，因为它体积小，容易阅读。但是它与React里大部分的概率是保持一致的。希望阅读完这篇文章后，你可以更好地理解React和Preact这样的类库，甚至为它们作出贡献。</p>
<p>在这篇文章中，我将列举一个简单的例子来解释以下这些是如何工作的：</p>
<ol>
<li><p>Babel和JSX</p></li>
<li><p>创建VNode-一个简单的virtual DOM元素</p></li>
<li><p>处理组件和子组件</p></li>
<li><p>初始化渲染和创建一个DOM元素</p></li>
<li><p>重新渲染</p></li>
<li><p>移除DOM元素</p></li>
<li><p>替换DOM元素</p></li>
</ol>
<h2 id="articleHeader0">The app</h2>
<p>这是一个简单地可筛选的搜索应用，它包含了两个组件<code>FilteredList</code>和<code>List</code>。<code>List</code>组件用来渲染一组items(默认："California"和"New York")。这个应用有一个搜索框，可以根据字母来过滤列表项。非常地直观：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010157282" src="https://static.alili.tech/img/remote/1460000010157282" alt="img" title="img" style="cursor: pointer;"></span></p>
<h2 id="articleHeader1">概览图</h2>
<p>我们用jsx来写组件，它会被babel转换成纯js，然后Preact的<code>h</code>函数会将这段js转换成DOM树，最后Preact的Virtual DOM算法会将virtual DOM转换成真实的DOM树，来构建我们的应用。<br><span class="img-wrap"><img data-src="/img/remote/1460000010157283" src="https://static.alili.tech/img/remote/1460000010157283" alt="img" title="img" style="cursor: pointer;"></span></p>
<p>在深入Virtual DOM的生命周期之前，我们先理解一下jsx，因为它为库提供了入口。</p>
<h2 id="articleHeader2">Babel And JSX</h2>
<p>在React，Preact这样的类库中，没有HTML标签，取而代之的是，一切都是javascript。所以我们要在js中写HTML标签，但是在js中写HTML简直就是噩梦?</p>
<p>对于我们的应用来说，我们将会像下面这样来写HTML</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010157284" src="https://static.alili.tech/img/remote/1460000010157284" alt="img" title="img" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010157285" src="https://static.alili.tech/img/remote/1460000010157285" alt="img" title="img" style="cursor: pointer;"></span></p>
<p>这就是jsx的由来。jsx本质上就是允许我们在javascript中书写HTML!并且允许我们在HTML中通过使用花括号来使用js。<br>jsx帮助我们像下面这样写组件<br><span class="img-wrap"><img data-src="/img/remote/1460000010157286" src="https://static.alili.tech/img/remote/1460000010157286" alt="img" title="img" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010157287" src="https://static.alili.tech/img/remote/1460000010157287" alt="img" title="img" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">jsx转换成js</h3>
<p>jsx很酷，但它不是合法的js，并且最终我们需要的是真实的DOM。JSX只是帮助编写一个真实DOM的替代品，除此之外，它别无用处。所以我们需要一种方法将它转换成对应的JSON对象(也就是Virtual DOM)，作为转化成真实DOM的输入。我们需要一个函数来实现这个功能。</p>
<p>在Preact中<code>h</code>函数就是干这件事情的，等同于React中的<code>React.createElement</code>。</p>
<p>但是如何将jsx转换成<code>h</code>函数的调用呢？Babel就是干这件事情的。Babel遍历每个jsx节点，并将它们转换成<code>h</code>函数调用。<br><span class="img-wrap"><img data-src="/img/remote/1460000010157288" src="https://static.alili.tech/img/remote/1460000010157288" alt="img" title="img" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">Babel JSX(React vs Preact)</h3>
<p>默认情况下，Babel将jsx转换成React.createElement调用<br><span class="img-wrap"><img data-src="/img/remote/1460000010157289" src="https://static.alili.tech/img/remote/1460000010157289" alt="img" title="img" style="cursor: pointer; display: inline;"></span><br>但是我们可以很容易地将函数名修改成任何名称，只需要在babelrc中配置一下即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Option 1:
//.babelrc
{   &quot;plugins&quot;: [
      [&quot;transform-react-jsx&quot;, { &quot;pragma&quot;: &quot;h&quot; }]
     ]
}
Option 2:
//Add the below comment as the 1st line in every JSX file
/** @jsx h */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs rust"><code><span class="hljs-built_in">Option</span> <span class="hljs-number">1</span>:
<span class="hljs-comment">//.babelrc</span>
{   <span class="hljs-string">"plugins"</span>: [
      [<span class="hljs-string">"transform-react-jsx"</span>, { <span class="hljs-string">"pragma"</span>: <span class="hljs-string">"h"</span> }]
     ]
}
<span class="hljs-built_in">Option</span> <span class="hljs-number">2</span>:
<span class="hljs-comment">//Add the below comment as the 1st line in every JSX file</span>
<span class="hljs-comment">/** @jsx h */</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010157290" src="https://static.alili.tech/img/remote/1460000010157290" alt="img" title="img" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">挂载到真实DOM</h3>
<p>不仅仅是render中的代码会被转换成<code>h</code>函数，最初的挂载也会！</p>
<p>这就是代码执行开始的地方</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//Mount to real DOM
render(<FilteredList/>, document.getElementById(‘app’));
//Converted to &quot;h&quot;:
render(h(FilteredList), document.getElementById(‘app’));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//Mount to real DOM</span>
render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">FilteredList</span>/&gt;</span></span>, <span class="hljs-built_in">document</span>.getElementById(‘app’));
<span class="hljs-comment">//Converted to "h":</span>
render(h(FilteredList), <span class="hljs-built_in">document</span>.getElementById(‘app’));</code></pre>
<h3 id="articleHeader6">
<code>h</code>函数的输出</h3>
<p><code>h</code>函数将jsx转化后的内容转换成Virtual DOM节点。一个Preact的Virtual DOM节点就是一个简单的代表了单个包含属性和子节点的DOM节点的js对象，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
   &quot;nodeName&quot;: &quot;&quot;,
   &quot;attributes&quot;: {},
   &quot;children&quot;: []
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
   <span class="hljs-attr">"nodeName"</span>: <span class="hljs-string">""</span>,
   <span class="hljs-attr">"attributes"</span>: {},
   <span class="hljs-attr">"children"</span>: []
}</code></pre>
<p>比如，应用的input标签对应的Virtual DOM如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
   &quot;nodeName&quot;: &quot;input&quot;,
   &quot;attributes&quot;: {
    &quot;type&quot;: &quot;text&quot;,
    &quot;placeholder&quot;: &quot;Search&quot;,
    &quot;onChange&quot;: &quot;&quot;
   },
   &quot;children&quot;: []
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
   <span class="hljs-attr">"nodeName"</span>: <span class="hljs-string">"input"</span>,
   <span class="hljs-attr">"attributes"</span>: {
    <span class="hljs-attr">"type"</span>: <span class="hljs-string">"text"</span>,
    <span class="hljs-attr">"placeholder"</span>: <span class="hljs-string">"Search"</span>,
    <span class="hljs-attr">"onChange"</span>: <span class="hljs-string">""</span>
   },
   <span class="hljs-attr">"children"</span>: []
}</code></pre>
<p>注意：<strong><code>h</code>函数并不是创建整棵树！</strong>它只是简单地创建某个节点的js对象。但是因为<code>render</code>方法。。。</p>
<p>好了，让我们看看Virtual DOM是如何工作的。</p>
<h2 id="articleHeader7">Preact中的Virtual DOM算法</h2>
<p>在下面的流程图中，展示了在Preact中，组件是如何被创建、更新和删除的过程。同时也展示了像<code>componentWillMount</code>这样的生命周期事件是什么时候被调用的。<br><span class="img-wrap"><img data-src="/img/remote/1460000010157291" src="https://static.alili.tech/img/remote/1460000010157291" alt="img" title="img" style="cursor: pointer; display: inline;"></span></p>
<p>现在理解起来有些困难，所以我们一步一步来拆解流程图中的每种情况。</p>
<h3 id="articleHeader8">情景1：初始化app</h3>
<h4>1.1 创建Virtual DOM</h4>
<p>高亮的部分展示了根据给定的组件生成的Virtual DOM树。注意一点这里并没有为子组件创建Virtual DOM<br><span class="img-wrap"><img data-src="/img/remote/1460000010157292" src="https://static.alili.tech/img/remote/1460000010157292" alt="img" title="img" style="cursor: pointer;"></span><br>下面这幅图展示了应用首次加载时发生的情况。这个库最后为FilteredList组件创建了带有子节点和属性<br>的Virtual DOM<br><span class="img-wrap"><img data-src="/img/remote/1460000010157293" src="https://static.alili.tech/img/remote/1460000010157293" alt="img" title="img" style="cursor: pointer;"></span><br>注意：在这个过程中还调用了<code>componentWillMount</code>和<code>render</code>生命周期方法(在上图中的绿色区块)</p>
<p>此时，我们有了一个Virtual DOM，div元素是父亲节点，带有一个input和一个list的子节点</p>
<h4>1.2 如果不是一个组件，则创建真实的DOM</h4>
<p>在这一步中，它只是为父亲节点创建一个真实DOM，对于子节点，重复这个过程<br><span class="img-wrap"><img data-src="/img/remote/1460000010157294" src="https://static.alili.tech/img/remote/1460000010157294" alt="img" title="img" style="cursor: pointer;"></span><br>此时，我们在下图中只有一个div展示出来<br><span class="img-wrap"><img data-src="/img/remote/1460000010157295" src="https://static.alili.tech/img/remote/1460000010157295" alt="img" title="img" style="cursor: pointer;"></span></p>
<h4>1.3 对于子元素重复这个过程</h4>
<p>在这一步中，循环所有的子节点。在我们的应用中，将会循环input和list<br><span class="img-wrap"><img data-src="/img/remote/1460000010157296" src="https://static.alili.tech/img/remote/1460000010157296" alt="img" title="img" style="cursor: pointer;"></span></p>
<h4>1.4 处理孩子节点和添加到父亲节点</h4>
<p>在这一步中，我们将会处理叶子节点，由于input有个父节点div，那么我们将会将input添加到div中作为<br>子节点。然后流程转向创建<code>List</code>(第二个子节点是div)<br><span class="img-wrap"><img data-src="/img/remote/1460000010157297" src="https://static.alili.tech/img/remote/1460000010157297" alt="img" title="img" style="cursor: pointer; display: inline;"></span><br>此时，我们的app长下面这样<br><span class="img-wrap"><img data-src="/img/remote/1460000010157298" src="https://static.alili.tech/img/remote/1460000010157298" alt="img" title="img" style="cursor: pointer; display: inline;"></span></p>
<p>注意：在<code>input</code>被创建之后，由于它没有任何子节点，并不会立马就去循环和创建List组件。相反地，它会首先<br>把<code>input</code>标签添加到父节点div中去，完事之后再返回处理List标签</p>
<h4>1.5 处理子节点</h4>
<p>现在控制流回到了步骤1.1，并且开始处理<code>List</code>组件。但是由于<code>List</code>是一个组件，所以它会遍历执行自身的<strong>render</strong>方法，从而获得一组VNodes，就像下面这样：<br><span class="img-wrap"><img data-src="/img/remote/1460000010157299" src="https://static.alili.tech/img/remote/1460000010157299" alt="img" title="img" style="cursor: pointer; display: inline;"></span><br>当<code>List</code>组件的循环完成时，它会返回<code>List</code>的VNode，就像下面这样：<br><span class="img-wrap"><img data-src="/img/remote/1460000010157300" src="https://static.alili.tech/img/remote/1460000010157300" alt="img" title="img" style="cursor: pointer; display: inline;"></span></p>
<h4>1.6 对于所有的子节点，重复步骤1.1到1.4</h4>
<p>对于每个节点，它将会重复以上的每一步。一旦到达叶子节点，它将会被加入到父节点中去，并且重复这个过程。<br><span class="img-wrap"><img data-src="/img/remote/1460000010157301" src="https://static.alili.tech/img/remote/1460000010157301" alt="img" title="img" style="cursor: pointer;"></span><br>下面的图片展示了每个节点是如何添加上去的(深度优先遍历)<br><span class="img-wrap"><img data-src="/img/remote/1460000010157302" src="https://static.alili.tech/img/remote/1460000010157302" alt="img" title="img" style="cursor: pointer;"></span></p>
<h4>1.7 处理完成</h4>
<p>此时已经完成了处理过程。然后对于所有的组件，会调用<code>componentDidMount</code>方法(从子组件开始，直到父组件)<br><span class="img-wrap"><img data-src="/img/remote/1460000010157303" src="https://static.alili.tech/img/remote/1460000010157303" alt="img" title="img" style="cursor: pointer;"></span></p>
<p><strong>注意：当一切准备就绪，一个真实DOM的引用会被添加到每个组件的实例中。这个引用会在接下来的一些更新操作(创建、更新、删除)被用来比较，避免重复创建相同的DOM节点</strong></p>
<h3 id="articleHeader9">情景2：删除叶子节点</h3>
<p>当输入"cal"并按回车，这将会删除第二个列表子元素，也就是一个叶子节点(New York)，同时其他父元素都会保留。<br><span class="img-wrap"><img data-src="/img/remote/1460000010157304" src="https://static.alili.tech/img/remote/1460000010157304" alt="img" title="img" style="cursor: pointer;"></span></p>
<p>让我们看下这种情景下，流程是怎么样的</p>
<h4>2.1 创建VNodes</h4>
<p>在初始化渲染之后，后面的每次改变都是一次"更新"。当创建VNodes时，更新周期与创建周期非常相似，并且再一次创建所有的VNodes。不过既然是更新(不是创建)组件，将会调用每个组件和子组件相应的<code>componentWillReceiveProps</code>,<code>shouldComponentUpdate</code>和<code>componentWillUpdate</code>方法。</p>
<p>另外，更新周期并不会重新创建已经存在的DOM元素。<br><span class="img-wrap"><img data-src="/img/remote/1460000010157305" src="https://static.alili.tech/img/remote/1460000010157305" alt="img" title="img" style="cursor: pointer; display: inline;"></span></p>
<h4>2.2 使用真实DOM引用，避免创建重复的节点</h4>
<p>之前提到过，在初始化加载期间，每个组件都有一个指向真实DOM树的引用。下面的图展示了引用是如何寻找我们的应用的。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010157306" src="https://static.alili.tech/img/remote/1460000010157306" alt="img" title="img" style="cursor: pointer; display: inline;"></span><br>当VNodes被创建后，每个VNode的属性都会与真实DOM的属性相比较。<strong>如果真实DOM存在，循环将会转移到下个节点</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000010157307" src="https://static.alili.tech/img/remote/1460000010157307" alt="img" title="img" style="cursor: pointer; display: inline;"></span></p>
<h4>2.3 如果在真实DOM中有其它的节点，则删除</h4>
<p>下面的图展示了真实DOM和VNode之间的不同</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010157308" src="https://static.alili.tech/img/remote/1460000010157308" alt="img" title="img" style="cursor: pointer; display: inline;"></span><br>由于存在不同，真实DOM中的"New York"节点会被算法删除掉，正如下面图展示的那样。这个算法也称为"componentDidUpdate"生命周期。<br><span class="img-wrap"><img data-src="/img/remote/1460000010157309" src="https://static.alili.tech/img/remote/1460000010157309" alt="img" title="img" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader10">情景3-卸载整个组件</h3>
<p>举例：当输入<code>blabla</code>时，由于不匹配"California"和"New York"，我们将不会渲染子组件<code>List</code>。这意味着，我们需要卸载整个组件<br><span class="img-wrap"><img data-src="/img/remote/1460000010157310" src="https://static.alili.tech/img/remote/1460000010157310" alt="img" title="img" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010157311" src="https://static.alili.tech/img/remote/1460000010157311" alt="img" title="img" style="cursor: pointer; display: inline;"></span><br>删除一个组件类似于删除一个单独的节点。除此之外，当我们删除一个包含组件引用的节点，将会调用"componentWillUnmount"，然后递归删除所有的DOM元素。在删除了所有的真实DOM元素之后，"componentDidUnmount"将会被调用。<br>下面的图片展示了真实DOM元素"ul"包含了指向"List"组件的引用。<br><span class="img-wrap"><img data-src="/img/remote/1460000010157312" src="https://static.alili.tech/img/remote/1460000010157312" alt="img" title="img" style="cursor: pointer; display: inline;"></span><br>下面的图片在流程图中高亮了deleting/unmounting一个组件是如何工作的<br><span class="img-wrap"><img data-src="/img/remote/1460000010157313" src="https://static.alili.tech/img/remote/1460000010157313" alt="img" title="img" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader11">最后</h2>
<p>希望这篇文章能帮助你理解Virtual DOM是如何工作的(至少在Preact中)</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
虚拟DOM内部是如何工作的

## 原文链接
[https://segmentfault.com/a/1190000010157277](https://segmentfault.com/a/1190000010157277)

