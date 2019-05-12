---
title: 'React之key详解' 
date: 2019-01-16 2:30:08
hidden: true
slug: n3386na03ee
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一个例子</h2>
<p>有这样的一个场景如下图所示，有一组动态数量的input，可以增加和删除和重新排序，数组元素生成的组件用<code>index</code>作为key的值，例如下图生成的ui展示：</p>
<p><span class="img-wrap"><img data-src="/img/bVMyFi?w=640&amp;h=457" src="https://static.alili.tech/img/bVMyFi?w=640&amp;h=457" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>上面例子中的input组件渲染的代码如下所示，全部完整代码可以参考 ==&gt;<a href="http://codepen.io/fetest/pen/jBaaRQ?editors=1010" rel="nofollow noreferrer" target="_blank">完整code</a><button class="btn btn-xs btn-default ml10 preview" data-url="fetest/pen/jBaaRQ" data-typeid="3">点击预览</button>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{this.state.data.map((v,idx)=><Item key={idx} v={v} />)}

//Item组件render方法
render(){
   return <li>{this.props.v} <input type=&quot;text&quot;/></li>
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{<span class="hljs-keyword">this</span>.state.data.map(<span class="hljs-function">(<span class="hljs-params">v,idx</span>)=&gt;</span>&lt;Item key={idx} v={v} /&gt;)}

//Item组件render方法
render(){
   return &lt;li&gt;{this.props.v} &lt;input type="text"/&gt;&lt;/li&gt;
}</code></pre>
<p>首先说明的是，若页面中数组内容是固定而不是动态的话，上面的代码也不会有什么问题(｡•ˇ‸ˇ•｡ 但是如此这也是不是推荐的做法)。</p>
<p>但是，动态数组导致其渲染的组件就会有问题，从上面图中你也能看出问题：数组动态改变后，页面上input的输入内容跟对应的数组元素顺序不对应。</p>
<p>为什么会这样呢？本文后面会有解释。react初学者对这可能更加迷惑，本文就来跟大家探讨一下react的key用法，</p>
<h2 id="articleHeader1">react key概述</h2>
<h3 id="articleHeader2">key的作用</h3>
<p>react中的key属性，它是一个特殊的属性，它是出现不是给开发者用的（例如你为一个组件设置key之后不能获取组件的这个key props），而是给react自己用的。</p>
<p>那么react是怎么用key的呢？react的作者之一Paul O’Shannessy有提到：</p>
<blockquote><p>Key is not really about performance, it’s more about identity (which in turn leads to better performance). Randomly assigned and changing values do not form an identity</p></blockquote>
<p>简单来说，<strong>react利用key来识别组件，它是一种身份标识标识</strong>，就像我们的身份证用来辨识一个人一样。每个key对应一个组件，相同的key react认为是同一个组件，这样后续相同的key对应组件都不会被创建。例如下面代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//this.state.users内容
this.state = {
 users: [{id:1,name: '张三'}, {id:2, name: '李四'}, {id: 2, name: &quot;王五&quot;}],
 ....//省略
}
render()
 return(
  <div>
    <h3>用户列表</h3>
    {this.state.users.map(u => <div key={u.id}>{u.id}:{u.name}</div>)}
  </div>
 )
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//this.state.users内容</span>
<span class="hljs-keyword">this</span>.state = {
 <span class="hljs-attr">users</span>: [{<span class="hljs-attr">id</span>:<span class="hljs-number">1</span>,<span class="hljs-attr">name</span>: <span class="hljs-string">'张三'</span>}, {<span class="hljs-attr">id</span>:<span class="hljs-number">2</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'李四'</span>}, {<span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">"王五"</span>}],
 ....<span class="hljs-comment">//省略</span>
}
render()
 <span class="hljs-keyword">return</span>(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>用户列表<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    {this.state.users.map(u =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{u.id}</span>&gt;</span>{u.id}:{u.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>)}
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
 )
);</code></pre>
<p>上面代码在dom渲染挂载后，用户列表只有<code>张三</code>和<code>李四</code>两个用户，<code>王五</code>并没有展示处理，主要是因为react根据key认为<code>李四</code>和<code>王五</code>是同一个组件，导致第一个被渲染，后续的会被丢弃掉。</p>
<p>这样，有了key属性后，就可以与组件建立了一种对应关系，react根据key来决定是销毁重新创建组件还是更新组件。</p>
<ul>
<li><p><strong>key相同</strong>，若组件属性有所变化，则react只更新组件对应的属性；没有变化则不更新。</p></li>
<li><p><strong>key值不同</strong>，则react先销毁该组件(有状态组件的<code>componentWillUnmount会执行</code>)，然后重新创建该组件（有状态组件的<code>constructor</code>和<code>componentWillUnmount</code>都会执行）</p></li>
</ul>
<p>另外需要指明的是:</p>
<blockquote><p>key不是用来提升react的性能的，不过用好key对性能是有帮组的。</p></blockquote>
<h3 id="articleHeader3">key的使用场景</h3>
<p>在项目开发中，<code>key属性的使用场景最多的还是由数组动态创建的子组件的情况</code>，需要为每个子组件添加唯一的key属性值。</p>
<p>那么，为何由数组动态创建的组件必须要用到key属性呢？这跟数组元素的动态性有关。</p>
<p>拿上述用户列表的例子来说，看一下babel对上述代码的转换情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 转换前
const element = (
  <div>
    <h3>用户列表</h3>
    {[<div key={1}>1:张三</div>, <div key={2}>2:李四</div>]}
  </div>
);

// 转换后
&quot;use strict&quot;;

var element = React.createElement(
  &quot;div&quot;,
  null,
  React.createElement(&quot;h3&quot;,null,&quot;用户列表&quot;),
  [
    React.createElement(&quot;div&quot;,{ key: 1 },&quot;1:张三&quot;), 
    React.createElement(&quot;div&quot;,{ key: 2 },&quot;2:李四&quot;)
  ]
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 转换前</span>
<span class="hljs-keyword">const</span> element = (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>用户列表<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    {[<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{1}</span>&gt;</span>1:张三<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>, <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{2}</span>&gt;</span>2:李四<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>]}
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
);

<span class="hljs-comment">// 转换后</span>
<span class="hljs-meta">"use strict"</span>;

<span class="hljs-keyword">var</span> element = React.createElement(
  <span class="hljs-string">"div"</span>,
  <span class="hljs-literal">null</span>,
  React.createElement(<span class="hljs-string">"h3"</span>,<span class="hljs-literal">null</span>,<span class="hljs-string">"用户列表"</span>),
  [
    React.createElement(<span class="hljs-string">"div"</span>,{ <span class="hljs-attr">key</span>: <span class="hljs-number">1</span> },<span class="hljs-string">"1:张三"</span>), 
    React.createElement(<span class="hljs-string">"div"</span>,{ <span class="hljs-attr">key</span>: <span class="hljs-number">2</span> },<span class="hljs-string">"2:李四"</span>)
  ]
);</code></pre>
<p>有babel转换后<code>React.createElement</code>中的代码可以看出，其它元素之所以不是必须需要key是因为不管组件的<code>state</code>或者<code>props</code>如何变化，这些元素始终占据着<code>React.createElement</code>固定的位置，这个位置就是天然的key。</p>
<p>而由数组创建的组件可能由于动态的操作导致重新渲染时，子组件的位置发生了变化，例如上面用户列表子组件新增一个用户，上面两个用户的位置可能变化为下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var element = React.createElement(
  &quot;div&quot;,
  null,
  React.createElement(&quot;h3&quot;,null,&quot;用户列表&quot;),
  [
    React.createElement(&quot;div&quot;,{ key: 3 },&quot;1:王五&quot;), 
    React.createElement(&quot;div&quot;,{ key: 1 },&quot;2:张三&quot;), 
    React.createElement(&quot;div&quot;,{ key: 2 },&quot;3:李四&quot;)
  ]
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> element = React.createElement(
  <span class="hljs-string">"div"</span>,
  <span class="hljs-literal">null</span>,
  React.createElement(<span class="hljs-string">"h3"</span>,<span class="hljs-literal">null</span>,<span class="hljs-string">"用户列表"</span>),
  [
    React.createElement(<span class="hljs-string">"div"</span>,{ <span class="hljs-attr">key</span>: <span class="hljs-number">3</span> },<span class="hljs-string">"1:王五"</span>), 
    React.createElement(<span class="hljs-string">"div"</span>,{ <span class="hljs-attr">key</span>: <span class="hljs-number">1</span> },<span class="hljs-string">"2:张三"</span>), 
    React.createElement(<span class="hljs-string">"div"</span>,{ <span class="hljs-attr">key</span>: <span class="hljs-number">2</span> },<span class="hljs-string">"3:李四"</span>)
  ]
);</code></pre>
<p>可以看出，数组创建子组件的位置并不固定，动态改变的；这样有了key属性后，react就可以根据key值来判断是否为同一组件。</p>
<p>另外，还有一种比较常见的场景：<code>为一个有复杂繁琐逻辑的组件添加key后，后续操作可以改变该组件的key属性值，从而达到先销毁之前的组件，再重新创建该组件。</code></p>
<h2 id="articleHeader4">key的最佳实践</h2>
<p>上面说到了，由数组创建的子组件必须有key属性，否则的话你可能见到下面这样的warning：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Warning: Each child in an array or iterator should have a unique &quot;key&quot; prop. Check the render method of `ServiceInfo`. See https://fb.me/react-warning-keys for more information." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code class="text" style="word-break: break-word; white-space: initial;">Warning: Each child <span class="hljs-keyword">in</span> <span class="hljs-keyword">an</span> array <span class="hljs-keyword">or</span> iterator should have <span class="hljs-keyword">a</span> unique <span class="hljs-string">"key"</span> prop. Check <span class="hljs-keyword">the</span> render method <span class="hljs-keyword">of</span> `ServiceInfo`. See <span class="hljs-keyword">https</span>://fb.me/react-warning-<span class="hljs-built_in">keys</span> <span class="hljs-keyword">for</span> more information.</code></pre>
<p>可能你会发现，这只是warning而不是error，它不是强制性的，为什么react不强制要求用key而报error呢？其实是强制要求的，只不过react为按要求来默认上帮我们做了，它是以数组的<code>index</code>作为key的。</p>
<h3 id="articleHeader5">index作为key是一种反模式</h3>
<p>在list数组中，用key来标识数组创建子组件时，若数组的内容只是作为纯展示，而不涉及到数组的动态变更，其实是可以使用<code>index</code>作为key的。</p>
<p>但是，若涉及到数组的动态变更，例如数组新增元素、删除元素或者重新排序等，这时index作为key会导致展示错误的数据。本文开始引入的例子就是最好的证明。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{this.state.data.map((v,idx)=><Item key={idx} v={v} />)}
// 开始时：['a','b','c']=>
<ul>
    <li key=&quot;0&quot;>a <input type=&quot;text&quot;/></li>
    <li key=&quot;1&quot;>b <input type=&quot;text&quot;/></li>
    <li key=&quot;2&quot;>c <input type=&quot;text&quot;/></li>
</ul>

// 数组重排 -> ['c','b','a'] =>
<ul>
    <li key=&quot;0&quot;>c <input type=&quot;text&quot;/></li>
    <li key=&quot;1&quot;>b <input type=&quot;text&quot;/></li>
    <li key=&quot;2&quot;>a <input type=&quot;text&quot;/></li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{<span class="hljs-keyword">this</span>.state.data.map(<span class="hljs-function">(<span class="hljs-params">v,idx</span>)=&gt;</span>&lt;Item key={idx} v={v} /&gt;)}
// 开始时：['a','b','c']=&gt;
&lt;ul&gt;
    &lt;li key="0"&gt;a &lt;input type="text"/&gt;&lt;/li&gt;
    &lt;li key="1"&gt;b &lt;input type="text"/&gt;&lt;/li&gt;
    &lt;li key="2"&gt;c &lt;input type="text"/&gt;&lt;/li&gt;
&lt;/ul&gt;

// 数组重排 -&gt; ['c','b','a'] =&gt;
&lt;ul&gt;
    &lt;li key="0"&gt;c &lt;input type="text"/&gt;&lt;/li&gt;
    &lt;li key="1"&gt;b &lt;input type="text"/&gt;&lt;/li&gt;
    &lt;li key="2"&gt;a &lt;input type="text"/&gt;&lt;/li&gt;
&lt;/ul&gt;</code></pre>
<p>上面实例中在数组重新排序后，key对应的实例都没有销毁，而是重新更新。具体更新过程我们拿<code>key=0</code>的元素来说明， 数组重新排序后：</p>
<ul>
<li><p>组件重新render得到新的虚拟dom；</p></li>
<li><p>新老两个虚拟dom进行diff，新老版的都有<code>key=0</code>的组件，react认为同一个组件，则只可能更新组件；</p></li>
<li><p>然后比较其children，发现内容的文本内容不同（由<code>a---&gt;c</code>)，而input组件并没有变化，这时触发组件的<code>componentWillReceiveProps</code>方法，从而更新其子组件文本内容;</p></li>
<li><p>因为组件的children中input组件没有变化，其又与父组件传入的任<code>props</code>没有关联，所以input组件不会更新(即其<code>componentWillReceiveProps</code>方法不会被执行)，导致用户输入的值不会变化。</p></li>
</ul>
<p>这就是<code>index</code>作为key存在的问题，所以<code>不要使用index作为key</code>。</p>
<h3 id="articleHeader6">key的值要稳定唯一</h3>
<p>在数组中生成的每项都要有key属性，并且<code>key的值是一个永久且唯一的值</code>，即稳定唯一。</p>
<p>在理想情况下，在循环一个对象数组时，数组的每一项都会有用于区分其他项的一个键值，相当数据库中主键。这样就可以用该属性值作为key值。但是一般情况下可能是没有这个属性值的，这时就需要我们自己保证。</p>
<p>但是，需要指出的一点是，我们在保证数组每项的唯一的标识时，还需要保证其值的稳定性，不能经常改变。例如下面代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    this.state.data.map(el=><MyComponent key={Math.random()}/>)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-keyword">this</span>.state.data.map(<span class="hljs-function"><span class="hljs-params">el</span>=&gt;</span><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">MyComponent</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{Math.random()}/</span>&gt;</span>)
}</span></code></pre>
<p>上面代码中中MyComponent的key值是用<code>Math.random</code>随机生成的，虽然能够保持其唯一性，但是它的值是随机而不是稳定的，在数组动态改变时会导致数组元素中的每项都重新销毁然后重新创建，有一定的性能开销；另外可能导致一些意想不到的问题出现。所以：</p>
<blockquote><p>key的值要保持稳定且唯一，不能使用<code>random</code>来生成key的值。</p></blockquote>
<p>所以，在不能使用random随机生成key时，我们可以像下面这样用一个全局的<strong>localCounter</strong>变量来添加稳定唯一的key值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var localCounter = 1;
this.data.forEach(el=>{
    el.id = localCounter++;
});
//向数组中动态添加元素时，
function createUser(user) {
    return {
        ...user,
        id: localCounter++
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> localCounter = <span class="hljs-number">1</span>;
<span class="hljs-keyword">this</span>.data.forEach(<span class="hljs-function"><span class="hljs-params">el</span>=&gt;</span>{
    el.id = localCounter++;
});
<span class="hljs-comment">//向数组中动态添加元素时，</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createUser</span>(<span class="hljs-params">user</span>) </span>{
    <span class="hljs-keyword">return</span> {
        ...user,
        <span class="hljs-attr">id</span>: localCounter++
    }
}</code></pre>
<h3 id="articleHeader7">key其它注意事项</h3>
<p>当然除了为数据元素生成的组件要添加key，且key要稳定且唯一之外，还需要注意以下几点：</p>
<ul><li><p><strong>key属性是添加到自定义的子组件上，而不是子组件内部的顶层的组件上。</strong></p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//MyComponent
...
render() {//error
    <div key="{{"item.key"}}">"{{"item.name"}}"</div>
}
...

//right
<MyComponent key="{{"item.key"}}"/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//MyComponent</span>
...
render() {<span class="hljs-comment">//error</span>
    &lt;div key="{{"item.key"}}"&gt;"{{"item.name"}}"&lt;<span class="hljs-regexp">/div&gt;
}
...

/</span><span class="hljs-regexp">/right
&lt;MyComponent key="{{"item.key"}}"/</span>&gt;</code></pre>
<ul>
<li><p><strong>key值的唯一是有范围的，即在数组生成的同级同类型的组件上要保持唯一，而不是所有组件的key都要保持唯一</strong></p></li>
<li><p>不仅仅在数组生成组件上，其他地方也可以使用key，主要是<strong>react利用key来区分组件的，相同的key表示同一个组件，react不会重新销毁创建组件实例，只可能更新；key不同，react会销毁已有的组件实例，重新创建组件新的实例</strong>。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  this.state.type ? 
    <div><Son_1/><Son_2/></div>
    : <div><Son_2/><Son_1/></div>
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-keyword">this</span>.state.type ? 
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Son_1</span>/&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Son_2</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    : <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Son_2</span>/&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Son_1</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
}</code></pre>
<p>例如上面代码中，<strong>this.state.type</strong>的值改变时，原Son_1和Son2组件的实例都将会被销毁，并重新创建Son_1和Son_2组件新的实例，不能继承原来的状态，其实他们只是互换了位置。为了避免这种问题，我们可以给组件加上key。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  this.state.type ? 
    <div><Son_1 key=&quot;1&quot;/><Son_2 key=&quot;2&quot;/></div>
    : <div><Son_2 key=&quot;2&quot; /><Son_1 key=&quot;1&quot;/></div>
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-keyword">this</span>.state.type ? 
    &lt;div&gt;&lt;Son_1 key="1"/&gt;&lt;Son_2 key="2"/&gt;&lt;/div&gt;
    : &lt;div&gt;&lt;Son_2 key="2" /&gt;&lt;Son_1 key="1"/&gt;&lt;/div&gt;
}</code></pre>
<p>这样，<strong>this.state.type</strong>的值改变时，Son_1和Son2组件的实例没有重新创建，react只是将他们互换位置。</p>
<h2 id="articleHeader8">参考文献</h2>
<ul>
<li><p><a href="http://www.tuicool.com/articles/UVvaMz" rel="nofollow noreferrer" target="_blank">React 实践心得：key 属性的原理和用法</a></p></li>
<li><p><a href="http://www.jstips.co/en/react/keys-in-children-components-are-important/" rel="nofollow noreferrer" target="_blank">Keys in children components are important</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000007910897">react反模式之index作为key</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React之key详解

## 原文链接
[https://segmentfault.com/a/1190000009149186](https://segmentfault.com/a/1190000009149186)

