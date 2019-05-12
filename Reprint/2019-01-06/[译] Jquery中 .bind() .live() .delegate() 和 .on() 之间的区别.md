---
title: '[译] Jquery中 .bind() .live() .delegate() 和 .on() 之间的区别' 
date: 2019-01-06 2:30:10
hidden: true
slug: ikx60btohg
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0"><strong>简介</strong></h2>
<p>我了解到很多网页开发者对<code>jquery</code>中的 <code>.bind()</code> <code>.live()</code> <code>.delegate()</code> 和 <code>.on()</code> 方法存在很多的疑惑。这些疑惑通常是关于它们之间真正的区别是什么啊，什么时候该使用它们啊。</p>
<p>在我们深入了解这些方法之前，我们先来一段常见的的<code>HTML</code>，作为我们编写<code>jquery</code>示例方法使用的样本。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul id=&quot;members&quot; data-role=&quot;listview&quot; data-filter=&quot;true&quot;>
    <!-- ... 其他li ... -->
    <li>
        <a href=&quot;detail.html?id=10&quot;>
            <h3>John Resig</h3>
            <p><strong>jQuery Core Lead</strong></p>
            <p>Boston, United States</p>
        </a>
    </li>
    <!-- ... 其他li ... -->
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"members"</span> <span class="hljs-attr">data-role</span>=<span class="hljs-string">"listview"</span> <span class="hljs-attr">data-filter</span>=<span class="hljs-string">"true"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- ... 其他li ... --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"detail.html?id=10"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>John Resig<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>jQuery Core Lead<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Boston, United States<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- ... 其他li ... --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<h2 id="articleHeader1"><strong>使用Bind方法</strong></h2>
<p><code>.bind()</code>方法将事件类型和一个事件处理函数直接注册到了被选中的DOM元素中。这个方法被使用得最久,在此期间,它很好的解决了各种跨浏览器的问题。当使用它来连接事件处理函数时,它仍然非常简洁,但是也存在着一些性能方面的问题,将在下面罗列出来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
/* .bind() 方法将事件类型和一个事件处理函数直接注册到了被选中的DOM元素中。 
   .click() 方法只是.bind() 方法的简写。
*/

$( &quot;#members li a&quot; ).bind( &quot;click&quot;, function( e ) {} ); 
$( &quot;#members li a&quot; ).click( function( e ) {} ); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-comment">/* .bind() 方法将事件类型和一个事件处理函数直接注册到了被选中的DOM元素中。 
   .click() 方法只是.bind() 方法的简写。
*/</span>

$( <span class="hljs-string">"#members li a"</span> ).bind( <span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> e </span>) </span>{} ); 
$( <span class="hljs-string">"#members li a"</span> ).click( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> e </span>) </span>{} ); </code></pre>
<p><code>.bind()</code>方法将会把事件处理函数连接到所有匹配的<code>a</code>标签。这种方式并不好。这样做的话，它不仅在所有匹配的元素中隐含地迭代附加事件处理函数，而且这些操作非常浪费（多余），因为这些相同的事件处理函数是被一遍一遍的重复的添加到所有匹配的标签上。</p>
<p><strong>优点:</strong></p>
<ul>
<li>适用于各种浏览器</li>
<li>连接事件处理函数非常方便快捷</li>
<li>可以使用 <code>.click()</code>, <code>.hover()</code>等简写方法来更方面地连接事件处理函数</li>
<li>对于一个简单的ID选择器,使用<code>.bind()</code> 方法不仅可以很快地连接事件处理函数,而且当事件被触发时, 事件处理函数几乎是马上就被调用了</li>
</ul>
<p><strong>缺点:</strong></p>
<ul>
<li>这样方法会将所有的事件处理函数附加到所有匹配的元素</li>
<li>不可以动态地匹配相同选择器的元素</li>
<li>当操作大量匹配的元素时会有性能方面的问题</li>
<li>附加操作是在前期完成的,这可能导致页面加载时存在性能问题</li>
</ul>
<h2 id="articleHeader2"><strong>使用Live方法</strong></h2>
<p><code>.live()</code>方法使用了事件委托的概念来实施其所谓的“魔法”。你调用<code>.live()</code>方法的方式就像是调用<code>.bind()</code>方法那样方便。然而在这表面之下，<code>.live()</code>方法与前者的实现方式大不相同。<code>.live()</code>方法将与事件处理函数关联的选择器和事件信息一起附加到文档的根级元素（即document）。通过将事件信息注册到document上，这个事件处理函数将允许所有冒泡到document的事件调用它（例如委托型、传播型事件）。一旦有一个事件冒泡到document元素上，Jquery会根据选择器或者事件的元数据来决定哪一个事件处理函数应该被调用，如果这个事件处理函数存在的话。这个额外的工作将会在用户交互时对性能方面造成一定的影响，但是初始化注册事件的过程相当地快。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 方法将与事件处理函数关联的选择器和事件信息一起附加到文档的根级元素（即document） 
   ( &quot;#members li a&quot; &amp; &quot;click&quot; ) */ 

$( &quot;#members li a&quot; ).live( &quot;click&quot;, function( e ) {} );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* 方法将与事件处理函数关联的选择器和事件信息一起附加到文档的根级元素（即document） 
   ( "#members li a" &amp; "click" ) */</span> 

$( <span class="hljs-string">"#members li a"</span> ).live( <span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> e </span>) </span>{} );</code></pre>
<p><code>.bind()</code>这个例子与上面<code>.bind()</code>方法的例子对比的话有一个优点在于它仅仅把事件处理函数附加到document元素一次，而不是很多次。这样不仅更快，而且还减少了性能的浪费。然而，使用这个方法也会带来很多问题，下面将一一列出。</p>
<p><strong>优点:</strong></p>
<ul>
<li>所有的事件处理函数都只会被注册一次，而不是像<code>.bind()</code>那样进行多次注册</li>
<li>将<code>.bind()</code>方法升级到<code>.live()</code>方法非常方便，你仅需要将"bind"替代为"live"就可以了</li>
<li>那些被动态添加到DOM的元素也将被神奇的匹配到，因为真实的事件信息是被注册到document元素上的</li>
<li>你可以在文档加载完之前连接事件处理函数，这样可以帮助你更好地利用你可能没有用的时间</li>
</ul>
<p><strong>缺点:</strong></p>
<ul>
<li>这个方法在Jquery 1.7以后的版本被弃用了，你应该在你的代码里逐步放弃使用它</li>
<li>使用这个方法时链式操作没有得到正确的支持，可能会出现某些错误</li>
<li>所做的匹配操作基本上没用因为它只用于在document元素上注册事件处理函数</li>
<li>使用 <code>event.stopPropogation()</code> 方法将会没用，因为事件总是已经被委托到了document元素上</li>
<li>因为所有的选择器或者事件信息都被附加到document元素上了，所以一旦有一个事件要调用某个事件处理函数，Jquery会在一大堆储存的元数据中使用<code>matchesSelector</code>方法来决定哪一个事件处理函数将会被调用，如果这个函数有的话。</li>
<li>因为你所连接的事件总是被委托到document上，所如果你的DOM的层级很深的话，这会导致一定的性能问题</li>
</ul>
<h2 id="articleHeader3"><strong>使用Delegate方法</strong></h2>
<p><code>.delegate()</code>方法与<code>.live()</code>方式实现方式相类似，它不是将选择器或者事件信息附加到document，而是让你指定附加的元素。就像是<code>.live()</code>方法一样，这个方法使用事件委托来正确地工作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="如果你跳过了前面关于 .live() 方法的介绍，你可能要回去重新看看它，因为这里涉及到之前我所阐述的一些内部逻辑" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">如果你跳过了前面关于 <span class="hljs-selector-class">.live</span>() 方法的介绍，你可能要回去重新看看它，因为这里涉及到之前我所阐述的一些内部逻辑</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
/* .delegate() 方法会将选择器和事件信息 ( &quot;li a&quot; &amp; &quot;click&quot; ) 附加到你指定的元素上 ( &quot;#members&quot; )。
*/

$( &quot;#members&quot; ).delegate( &quot;li a&quot;, &quot;click&quot;, function( e ) {} );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-comment">/* .delegate() 方法会将选择器和事件信息 ( "li a" &amp; "click" ) 附加到你指定的元素上 ( "#members" )。
*/</span>

$( <span class="hljs-string">"#members"</span> ).delegate( <span class="hljs-string">"li a"</span>, <span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> e </span>) </span>{} );</code></pre>
<p><code>.delegate()</code>方法十分强大。在上面这个例子中，与事件处理函数关联的选择器和事件信息将会被附加到( #members" )这个元素上。这样做比使用<code>.live()</code>高效多了，因为<code>.live()</code>方法总是将与事件处理函数关联的选择器和事件信息附加到document元素上。另外，使用<code>.delegate()</code>方法解决许多其他问题。请参阅下方列出的详细信息。</p>
<p><strong>优点:</strong></p>
<ul>
<li>你可以选择将选择器或者事件信息附加到指定的元素。</li>
<li>匹配操作实际上在前面并没有执行，而是用来注册到指定的元素。</li>
<li>链式操作可以得到正确的支持</li>
<li>Jquery仍然需要迭代这些选择器或者事件信息来匹配元素，不过因为你可以选择哪一个元素作为根元素，所以筛选的量会大幅减少</li>
<li>因为这项技术使用了事件委托机制，它可以匹配到被动态地添加到DOM的元素</li>
<li>你可以在文档加载完之前连接事件处理函数</li>
</ul>
<p><strong>缺点:</strong></p>
<ul>
<li>从<code>.bind()</code>方法不可以直接升级到<code>.delegate()</code>方法</li>
<li>Jquery仍然需要使用<code>marchesSelector</code>方法在附加到指定根元素的选择器或者事件信息中筛选决定哪一个事件处理函数会被调用。然而，附加到指定根元素的元数据会比使用<code>.live()</code>方法的时候要小得多。</li>
<li>当操作大量匹配的元素时会有性能方面的问题</li>
<li>附加操作是在前期完成的,这可能导致页面加载时存在性能问题</li>
</ul>
<h2 id="articleHeader4"><strong>使用On方法</strong></h2>
<p>你知道吗，在Jquery 1.7版本中<code>.bind()</code>，<code>.live()</code> 和<code>.delegate()</code>方法只需要使用<code>.on()</code>方法一种方式来调用它们。当然<code>.unbind()</code>，<code>.die()</code> 和<code>.undelegate()</code>方法也一样。一下代码片段是从Jquery 1.7版本的源码中截取出来的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
bind: function( types, data, fn ) {
    return this.on( types, null, data, fn );
},
unbind: function( types, fn ) {
    return this.off( types, null, fn );
},

live: function( types, data, fn ) {
    jQuery( this.context ).on( types, this.selector, data, fn );
    return this;
},
die: function( types, fn ) {
    jQuery( this.context ).off( types, this.selector || &quot;**&quot;, fn );
    return this;
},

delegate: function( selector, types, data, fn ) {
    return this.on( types, selector, data, fn );
},
undelegate: function( selector, types, fn ) {
    return arguments.length == 1 ? 
        this.off( selector, &quot;**&quot; ) : 
        this.off( types, selector, fn );
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
bind: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> types, data, fn </span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.on( types, <span class="hljs-literal">null</span>, data, fn );
},
<span class="hljs-attr">unbind</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> types, fn </span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.off( types, <span class="hljs-literal">null</span>, fn );
},

<span class="hljs-attr">live</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> types, data, fn </span>) </span>{
    jQuery( <span class="hljs-keyword">this</span>.context ).on( types, <span class="hljs-keyword">this</span>.selector, data, fn );
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
},
<span class="hljs-attr">die</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> types, fn </span>) </span>{
    jQuery( <span class="hljs-keyword">this</span>.context ).off( types, <span class="hljs-keyword">this</span>.selector || <span class="hljs-string">"**"</span>, fn );
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
},

<span class="hljs-attr">delegate</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> selector, types, data, fn </span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.on( types, selector, data, fn );
},
<span class="hljs-attr">undelegate</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> selector, types, fn </span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">arguments</span>.length == <span class="hljs-number">1</span> ? 
        <span class="hljs-keyword">this</span>.off( selector, <span class="hljs-string">"**"</span> ) : 
        <span class="hljs-keyword">this</span>.off( types, selector, fn );
}
</code></pre>
<p>考虑到这一点，使用<code>.on()</code>方法看起来像以下方式一样...</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
/* Jquery的 .bind() , .live() 和 .delegate() 方法只需要使用`.on()`方法一种方式来调用它们 */

// Bind
$( &quot;#members li a&quot; ).on( &quot;click&quot;, function( e ) {} ); 
$( &quot;#members li a&quot; ).bind( &quot;click&quot;, function( e ) {} ); 

// Live
$( document ).on( &quot;click&quot;, &quot;#members li a&quot;, function( e ) {} ); 
$( &quot;#members li a&quot; ).live( &quot;click&quot;, function( e ) {} );

// Delegate
$( &quot;#members&quot; ).on( &quot;click&quot;, &quot;li a&quot;, function( e ) {} ); 
$( &quot;#members&quot; ).delegate( &quot;li a&quot;, &quot;click&quot;, function( e ) {} );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-comment">/* Jquery的 .bind() , .live() 和 .delegate() 方法只需要使用`.on()`方法一种方式来调用它们 */</span>

<span class="hljs-comment">// Bind</span>
$( <span class="hljs-string">"#members li a"</span> ).on( <span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> e </span>) </span>{} ); 
$( <span class="hljs-string">"#members li a"</span> ).bind( <span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> e </span>) </span>{} ); 

<span class="hljs-comment">// Live</span>
$( <span class="hljs-built_in">document</span> ).on( <span class="hljs-string">"click"</span>, <span class="hljs-string">"#members li a"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> e </span>) </span>{} ); 
$( <span class="hljs-string">"#members li a"</span> ).live( <span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> e </span>) </span>{} );

<span class="hljs-comment">// Delegate</span>
$( <span class="hljs-string">"#members"</span> ).on( <span class="hljs-string">"click"</span>, <span class="hljs-string">"li a"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> e </span>) </span>{} ); 
$( <span class="hljs-string">"#members"</span> ).delegate( <span class="hljs-string">"li a"</span>, <span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> e </span>) </span>{} );</code></pre>
<p>你可能注意到了，我如何使用<code>.on()</code>方法决定了它如何调用其他方法。你可以认为<code>.on()</code>方法被具有不同签名的方法”重载“了，而这些方法实现了不同的事件绑定的连接方式。<code>.on()</code>方法的出现为API带来了很多方面的一致性，并希望让事情变得不那么混乱。</p>
<p><strong>优点:</strong></p>
<ul>
<li>使各种事件绑定方法一致。</li>
<li>因为在Jquery源码中<code>.bind()</code>，<code>.live()</code> 和<code>.delegate()</code>方法实际上是调用了此方法，因此简化了jQuery代码库并删除了一级重定向。</li>
<li>这种方式仍然提供了使用<code>.delegate()</code>方法的优点，并且仍然提供对<code>.bind()</code>方法的支持，如果你需要的话。</li>
</ul>
<p><strong>缺点:</strong></p>
<ul><li>给人带来了一些疑惑，因为方法的实际执行方式将根据你如何调用方法而改变。</li></ul>
<h2 id="articleHeader5"><strong>总结</strong></h2>
<p>如果你对不同的绑定事件方法有所迷惑，那么不要担心，因为API发展了一段时间了，有很多前人的经验可以借鉴。也有很多人将这些方法视为魔法，不过一旦你了解了他们工作背后的原理，将帮助您了解如何更好地处理项目。<br>以下是这篇文章的精华所在...</p>
<ul>
<li>使用<code>.bind()</code>方法非常浪费性能因为它把同一个事件处理函数附加到了每一个匹配的元素上</li>
<li>你应该停止使用<code>.live()</code>方法因为它被弃用了同时也会带来很多问题</li>
<li>使用<code>.delegate()</code>方法会给你带来很多好处当你需要解决一些性能上的问题和对动态添加的元素作出处理</li>
<li>新的<code>.on()</code>方法其实就是模拟<code>.bind()</code>，<code>.live()</code> 和<code>.delegate()</code>实现的语法糖，具体取决于你如何调用它</li>
<li>新的方向是使用新的<code>.on()</code>方法。先熟悉语法，并开始在你的所有的Jquery 1.7版本以上的项目使用它吧！</li>
</ul>
<p>对于上面列举的优点或者缺点，你有新的补充吗？你最近开始使用<code>.delegate()</code>方法了吗？你对新的<code>.on()</code>方法怎么看呢？把你的想法写到用评论告诉我吧！谢谢！</p>
<hr>
<p>第一次翻译，文章中可能会出现一些不通顺的地方，希望得到大家的理解，毕竟我还是个学生啊！</p>
<p><a href="http://elijahmanor.com/differences-between-jquery-bind-vs-live-vs-delegate-vs-on/" rel="nofollow noreferrer" target="_blank">原文链接</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] Jquery中 .bind() .live() .delegate() 和 .on() 之间的区别

## 原文链接
[https://segmentfault.com/a/1190000010435530](https://segmentfault.com/a/1190000010435530)

