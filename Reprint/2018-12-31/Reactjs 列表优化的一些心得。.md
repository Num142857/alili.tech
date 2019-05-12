---
title: 'Reactjs 列表优化的一些心得。' 
date: 2018-12-31 2:30:30
hidden: true
slug: exggnju9p46
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>在应用开发中，列表是我们使用频率非常高的一种展现形式，在<code>reactjs</code>项目中更是如此。无处不在的使用更是需要我们小心触发性能瓶颈的深水炸弹。</p>
<p>下面就我最近的总结出的几点心得分享给大家，有什么问题欢迎批评指正。</p>
<h2 id="articleHeader1">不要用索引当<code>key</code>值</h2>
<p><code>reactjs</code>要求我们对列表中的每一项设置一个唯一的<code>key</code>值，这个虚拟dom的<strong>diff</strong>算法有很大关系。简单的说，在同一级dom树中，有2种情况会引起元素（这里的元素指的是虚拟dom，而不是真正的dom元素）的增删。</p>
<p>1.元素的类型改变<br>2.<code>key</code>值变化</p>
<p>在列表中，元素类型一般是相同的，所以我们需要根据唯一的<code>key</code>值来给当前元素加上标记，这样<code>reactjs</code>才能感知元素是否需要增加或删除了。</p>
<p><code>reactjs</code>采用的非常直接粗暴的算法来判断元素的增删，比如</p>
<p>旧的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li key={1}>a</li>
<li key={2}>b</li>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="jsx"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{1}</span>&gt;</span>a<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{2}</span>&gt;</span>b<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></code></pre>
<p>新的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li key={1}>a</li>
<li key={2}>b</li>
<li key={3}>c</li>
<li key={4}>d</li>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="jsx"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{1}</span>&gt;</span>a<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{2}</span>&gt;</span>b<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{3}</span>&gt;</span>c<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{4}</span>&gt;</span>d<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></code></pre>
<p>我们来分析下这种情况下的流程：</p>
<ol>
<li>对比第一项<code>key</code>都是1，内容不变，不处理</li>
<li>对比第二项<code>key</code>都是2，内容不变，不处理</li>
<li>第三项<code>key</code>为3的是新的，新增</li>
<li>第四项<code>key</code>为4的是新的，新增</li>
</ol>
<p>这个例子中我们使用索引(+1)作为<code>key</code>，没有什么问题，完全符合我们的预期。接下我们看第二个</p>
<p>假设我们的的列表数据从</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
    {id:2,text:'b'},
    {id:3,text:'c'},
    {id:5,text:'e'}
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">[
    {<span class="hljs-attr">id</span>:<span class="hljs-number">2</span>,<span class="hljs-attr">text</span>:<span class="hljs-string">'b'</span>},
    {<span class="hljs-attr">id</span>:<span class="hljs-number">3</span>,<span class="hljs-attr">text</span>:<span class="hljs-string">'c'</span>},
    {<span class="hljs-attr">id</span>:<span class="hljs-number">5</span>,<span class="hljs-attr">text</span>:<span class="hljs-string">'e'</span>}
]</code></pre>
<p>变成了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
    {id:1,text:'a'},
    {id:2,text:'b'},
    {id:3,text:'c'},
    {id:4,text:'d'}
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">[
    {<span class="hljs-attr">id</span>:<span class="hljs-number">1</span>,<span class="hljs-attr">text</span>:<span class="hljs-string">'a'</span>},
    {<span class="hljs-attr">id</span>:<span class="hljs-number">2</span>,<span class="hljs-attr">text</span>:<span class="hljs-string">'b'</span>},
    {<span class="hljs-attr">id</span>:<span class="hljs-number">3</span>,<span class="hljs-attr">text</span>:<span class="hljs-string">'c'</span>},
    {<span class="hljs-attr">id</span>:<span class="hljs-number">4</span>,<span class="hljs-attr">text</span>:<span class="hljs-string">'d'</span>}
]</code></pre>
<p>仍然使用索引作为<code>key</code>，那么渲染出来的应该是</p>
<p>旧的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li key={1}>b</li>
<li key={2}>c</li>
<li key={3}>e</li>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="jsx"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{1}</span>&gt;</span>b<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{2}</span>&gt;</span>c<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{3}</span>&gt;</span>e<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></code></pre>
<p>新的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li key={1}>a</li>
<li key={2}>b</li>
<li key={3}>c</li>
<li key={4}>d</li>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="jsx"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{1}</span>&gt;</span>a<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{2}</span>&gt;</span>b<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{3}</span>&gt;</span>c<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{4}</span>&gt;</span>d<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></code></pre>
<p>这种情况下的流程：</p>
<ol>
<li>对比第一项<code>key</code>都是1，但是内容变了，替换文本</li>
<li>对比第二项<code>key</code>都是2，但是内容变了，替换文本</li>
<li>对比第三项<code>key</code>都是3，但是内容变了，替换文本</li>
<li>第四项<code>key</code>为4是新的，新增</li>
</ol>
<p>这个和我们想的就有区别了，因为我们只是想做两步操作，即替换第1个和添加第4个。而现在做了四步操作。</p>
<p>也许这个例子显得没有那么糟糕，但是想象一下，如果是在一个50项的列表中插入1个新的到头部，那么后面的50项将都会进行<code>dom</code>更新渲染，<strong>如果每一项内容是复杂的组件，那么代价更加高昂</strong>，而我们其实只是想在第一个元素前插入一条。</p>
<p>那么如果解决上面的问题呢，其实很简单，<strong>我们的列表数据都有唯一的<code>id</code>值，而实际开发中我们列表中一般都会存在这样的唯一值，我们只需要把它复制给<code>key</code>即可</strong>。</p>
<p>那么我们的列表会变成这样</p>
<p>旧的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li key={2}>b</li>
<li key={3}>c</li>
<li key={5}>e</li>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="jsx"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{2}</span>&gt;</span>b<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{3}</span>&gt;</span>c<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{5}</span>&gt;</span>e<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></code></pre>
<p>新的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li key={1}>a</li>
<li key={2}>b</li>
<li key={3}>c</li>
<li key={4}>d</li>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="jsx"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{1}</span>&gt;</span>a<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{2}</span>&gt;</span>b<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{3}</span>&gt;</span>c<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{4}</span>&gt;</span>d<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></code></pre>
<p>这种情况下的流程：</p>
<ol>
<li>第一项<code>key</code>为1是新的，新增，节点变成4个</li>
<li>对比第二项<code>key</code>都是2，内容不变，不处理</li>
<li>对比第三项<code>key</code>都是3，内容不变，不处理</li>
<li>第四项<code>key</code>为4，旧的是5，替换节点</li>
</ol>
<h2 id="articleHeader2">将列表和列表项单独写成纯组件</h2>
<h3 id="articleHeader3">为什么？</h3>
<p>我们可能已经习惯这样写列表</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render(){
    render (
        <ul>
            {this.state.list.map(item=><li key={item.id}>{item.text}<li>)}
        </ul>
    )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="jsx"><span class="hljs-function"><span class="hljs-title">render</span><span class="hljs-params">()</span></span>{
    render (
        &lt;ul&gt;
            {this<span class="hljs-selector-class">.state</span><span class="hljs-selector-class">.list</span><span class="hljs-selector-class">.map</span>(item=&gt;&lt;<span class="hljs-selector-tag">li</span> key={item.id}&gt;{item.text}&lt;li&gt;)}
        &lt;/ul&gt;
    )
}</code></pre>
<p>在大多数情况下，这样写没有什么问题，<code>reactjs</code>执行速度很快，但是有些情况下，这样写可能成为导致网页卡顿的罪魁祸首。</p>
<p>每当我们改变组件状态的时候，<code>reactjs</code>都会重建当前组件的整个虚拟dom树，也就是说不管你的<code>state.list</code>是否有改变，整个树都会重建，而这个时候列表的渲染是不必要的，当列表过长，组件状态更新频繁，甚至手机性能不佳的情况下，不断的重新创建虚拟dom树很有可能会导致页面帧数下降。</p>
<h3 id="articleHeader4"><code>PureComponent</code></h3>
<p><a href="https://facebook.github.io/react/docs/react-api.html#react.purecomponent" rel="nofollow noreferrer" target="_blank">PureComponent</a>和<code>Component</code>没什么什么区别，除了它默认在<code>shouldUpdateComponent</code>里面默认做了<strong>浅比较</strong>，如果相同，则不会触发更新渲染。</p>
<p>在<code>reactjs</code>中，数据推荐处理成<strong>不可变数据</strong>(这里不是指<code>immutable.js</code>，而是说对象始终是不变的，如果数据有变了，必须是新的对象)，配合<code>redux</code>的时候更是如此。所以如果<code>list</code>发生改变时，传入的必然是新的对象，这个时候会触发列表组件更新。</p>
<h3 id="articleHeader5">使用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class List extends PureComponent{
    render(){
        return (
            <ul>
            {this.props.list.map(item=><li key={item.id}>{item.text}<li>)}
        </ul>
        )
    }
}

/*** parent ***/
// .....
render(){
    render (
        <List list = {this.state.list}/>
    )
}
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">List</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">PureComponent</span></span>{
    render(){
        <span class="hljs-keyword">return</span> (
            &lt;ul&gt;
            {<span class="hljs-keyword">this</span>.props.list.map(item=&gt;&lt;li key={item.id}&gt;{item.text}&lt;li&gt;)}
        &lt;/ul&gt;
        )
    }
}

<span class="hljs-comment">/*** parent ***/</span>
<span class="hljs-comment">// .....</span>
render(){
    render (
        &lt;<span class="hljs-type">List</span> list = {<span class="hljs-keyword">this</span>.state.list}/&gt;
    )
}
<span class="hljs-comment">// ...</span></code></pre>
<h3 id="articleHeader6">子组件</h3>
<p>当我们列表的子元素是复杂的组建时，我们也应该单独提取成<code>PureComponent</code>，以避免不必要的渲染，事实上，我觉得大多数组件都可以使用<code>PureComponent</code>替换<code>Component</code>。</p>
<h2 id="articleHeader7">不要在属性上箭头函数</h2>
<p>箭头函数很方便，不仅写法简单还能保持<code>this</code>指向父级作用域。</p>
<p>为了维护事件处理函数的<code>this</code>，我们经常在组件中看到它类似这样的使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Component onClick={()=>{alert(11)} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="jsx" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">Component</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span>=&gt;</span>{alert(11)} /&gt;</code></pre>
<p>但是这样写会有几个问题</p>
<ol>
<li>每次<code>render</code>都会重新创建一个新的函数，浏览器创建和回收对象都会有开销，如果是列表，那么每个列表项都会创建和销毁。</li>
<li>因为每次<code>render</code>都是传入新的函数，<code>shouldUpdateComponent</code><strong>浅比较</strong>必然不相等，会导致<code>PureComponent</code>组件失去应有效果。</li>
</ol>
<h3 id="articleHeader8">正确的做法</h3>
<p>如果使用了<code>transform-class-properties</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleClick = ()=>{
    alert(1)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="jsx"><span class="hljs-function"><span class="hljs-title">handleClick</span> = <span class="hljs-params">()</span>=&gt;</span>{
    alert(<span class="hljs-number">1</span>)
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Component onClick={this.handleClick} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="jsx" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">Component</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClick}</span> /&gt;</span></code></pre>
<p>或者</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(){
    super(...arguments)
    this.handleClick = this.handleClick.bind(this)
}

handleClick = ()=>{
    alert(1)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code class="jsx"><span class="hljs-function"><span class="hljs-keyword">constructor</span><span class="hljs-params">()</span><span class="hljs-comment">{
    super(...arguments)
    this.handleClick = this.handleClick.bind(this)
}</span>

<span class="hljs-title">handleClick</span> = <span class="hljs-params">()</span>=&gt;<span class="hljs-comment">{
    alert(1)
}</span></span></code></pre>
<h2 id="articleHeader9">结束语</h2>
<p>暂时就总结了这些吧，以后有新的心得再更新，欢迎交流留言。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Reactjs 列表优化的一些心得。

## 原文链接
[https://segmentfault.com/a/1190000011191890](https://segmentfault.com/a/1190000011191890)

