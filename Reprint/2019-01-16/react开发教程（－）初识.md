---
title: 'react开发教程（－）初识' 
date: 2019-01-16 2:30:08
hidden: true
slug: xtf1hors4dq
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">React初识</h1>
<p>React是Facebook推出的一个javascript库<strong>(用来创建用户界面的Javascript库)</strong>，所以他只是和用户的界面打交道，你可以把它看成MVC中的V(视图)这一层。</p>
<h1 id="articleHeader1">组件</h1>
<p>React的一切都是基于组件的。web世界的构成是基于各种HTML标签的组合，这些标签也叫语意化标签每个标签代表一个含义，在react，vue，angular中我们可以将这些标签组合成一个轮播／导航...等，可以称为自定义组件。<br>react中最重要的特性就是基于组件的设计流程。使用React你唯一需要关心的就是如何构建组件（封装性，复用性，测试）,如下图，每个块都是一个组件，页面由组件构建而成，就像搭积木。<br><span class="img-wrap"><img data-src="/img/bVMhla?w=177&amp;h=312" src="https://static.alili.tech/img/bVMhla?w=177&amp;h=312" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>每个组件都有各自的状态，当状态变更时，便会重新渲染整个组件。<br>定义一个组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';、
import './Comment.css';

class Comment extends Component {
  render() {
    return (
      <div className=&quot;Comment&quot;>
        {this.props.name}
        {this.props.children}
      </div>
    );
  }
}
export default Comment;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t';、
<span class="hljs-keyword">import</span> './<span class="hljs-type">Comment</span>.css';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Comment</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div className=<span class="hljs-string">"Comment"</span>&gt;
        {<span class="hljs-keyword">this</span>.props.name}
        {<span class="hljs-keyword">this</span>.props.children}
      &lt;/div&gt;
    );
  }
}
export <span class="hljs-keyword">default</span> <span class="hljs-type">Comment</span>;
</code></pre>
<p>可以在其他组件中调用这个组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import Comment from &quot;./Comment&quot;;
import './App.css';

class App extends Component {
  render() {
    return (
      <div className=&quot;App&quot;>
        {/**调用组件**/}
        <Comment name=&quot;刘宇&quot;>组件插入内容</Comment>
      </div>
    );
  }
}

export default App;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t';
<span class="hljs-keyword">import</span> <span class="hljs-type">Comment</span> from <span class="hljs-string">"./Comment"</span>;
<span class="hljs-keyword">import</span> './<span class="hljs-type">App</span>.css';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div className=<span class="hljs-string">"App"</span>&gt;
        {<span class="hljs-comment">/**调用组件**/</span>}
        &lt;<span class="hljs-type">Comment</span> name=<span class="hljs-string">"刘宇"</span>&gt;组件插入内容&lt;/<span class="hljs-type">Comment</span>&gt;
      &lt;/div&gt;
    );
  }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">App</span>;
</code></pre>
<h1 id="articleHeader2">JSX</h1>
<p>在上面的案例中可以看到react吧html写到js当中，这种写法称为JSX。这是一种类似XML的写法，他可以定义类似HTML一样简洁的树状结构。这种语法结合了JavaScript语法和HTML的优点，既可以像平常一样使用HTML,也可以在里面前套JavaScript语法。这种有好的格式，让开发者易于阅读和开发。而且，对于组件来说，直接使用类似HTML的格式，也是非常嗨皮的。但是需要注意的是。JSX和HTML完全不是一回事，JSX只是作为编辑器，把类似HTML的结构编译成JavaScript。</p>
<blockquote><p>注意：在浏览器中不能直接使用这种格式，需要添加JSX编译器来完成这项工作。</p></blockquote>
<h2 id="articleHeader3">JSX基本语法</h2>
<p>使用类XML语法的好处是标签可以任意嵌套，我们可以像HTML一样清晰地看到DOM树状结构及其属性。比如，我们构建一个List组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const List = () => (
    <ul>
        <li>列表元素1</li>
        <li>列表元素2</li>
        <li>列表元素3</li>
        <li>列表元素4</li>
    </ul>
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> List = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>列表元素1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>列表元素2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>列表元素3<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>列表元素4<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
)</code></pre>
<p>写这个组件的过程就像写html一样，只不过它被包裹在JavaScript的方法中，需要注意以下几点。</p>
<blockquote><p>定义标签时，只允许被一个标签包裹 <br>标签一定要闭合</p></blockquote>
<h2 id="articleHeader4">元素类型</h2>
<p>在React中创建的虚拟元素可以分为两类，DOM元素(DOM element)与组件元素(component element)<br>分别对应着原生DOM元素与自定义元素，而JSX与创建元素过程有这莫大的关联，<strong>在JSX中对应的规则是HTML标签首字母是否为小写字母，其中小写首对应DOM元素，而组件元素自然对应大写首字母</strong></p>
<h2 id="articleHeader5">注释</h2>
<p>在HTML中，注释语法是&lt;!--注释内容--&gt;在jsx依旧使用的是js语法注释，唯一要注意的是，在一个组件的子元素位置使用注释要用{}包起来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const List = () => (
    <ul>
        {/**这个是个列表**/}
        <li>列表元素1</li>
    </ul>
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> List = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {/**这个是个列表**/}
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>列表元素1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
)</code></pre>
<h2 id="articleHeader6">元素属性</h2>
<p>元素除了标签之外，另一个组成部分就是标签的属性。<br>在JSX中，不论是DOM元素还是组件元素，他门都有属性。不同的是，DOM元素的属性是标准规范属性，但有两个例外--class和for，这是因为在JavaScript中这两个单词都是关键词。因此有对应的俩个转化</p>
<blockquote><p>class属性改为className。 <br>for属性改为htmlFor。</p></blockquote>
<p>在组件中元素的属性是完全自定义的属性，也可以理解为组件传递的参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Comment name=&quot;刘宇&quot;>组件插入内容</Comment>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-built_in">Comment</span> <span class="hljs-built_in">name</span>=<span class="hljs-string">"刘宇"</span>&gt;组件插入内容&lt;/<span class="hljs-built_in">Comment</span>&gt;</code></pre>
<p>在自定义组件中除了上面传递属性的方法外也可以</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const comment = <Comment>组件插入内容</Comment>;
comment.props.name = &quot;刘宇&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>const <span class="hljs-built_in">comment</span> = &lt;<span class="hljs-built_in">Comment</span>&gt;组件插入内容&lt;/<span class="hljs-built_in">Comment</span>&gt;;
<span class="hljs-built_in">comment</span>.props.<span class="hljs-built_in">name</span> = <span class="hljs-string">"刘宇"</span>;</code></pre>
<p>也可以使用es6语法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const data = {name:&quot;刘宇&quot;,age:10};
const comment = <Comment {...data}>组件插入内容</Comment>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> data = {<span class="hljs-attr">name</span>:<span class="hljs-string">"刘宇"</span>,<span class="hljs-attr">age</span>:<span class="hljs-number">10</span>};
<span class="hljs-keyword">const</span> comment = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Comment</span> {<span class="hljs-attr">...data</span>}&gt;</span>组件插入内容<span class="hljs-tag">&lt;/<span class="hljs-name">Comment</span>&gt;</span></span>;</code></pre>
<p>自定义html属性，上面说的是组件上的属性，在JSX中往DOM元素中传入自定义属性，React是不会渲染的；<br>如果要使用HTML自定义属性，要使用data-前缀，这与HTML标准也是一致的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div a=&quot;aaa&quot;></div> //不被渲染
<div data-a=&quot;aaa&quot;></div> //成功渲染" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-keyword">a</span>=<span class="hljs-string">"aaa"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;<span class="hljs-comment"> //不被渲染</span>
&lt;<span class="hljs-keyword">div</span> data-<span class="hljs-keyword">a</span>=<span class="hljs-string">"aaa"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;<span class="hljs-comment"> //成功渲染</span></code></pre>
<h2 id="articleHeader7">HTML转译</h2>
<p>React会将所有要显示到DOM的字符串转义，防止XSS。所以，如果jsx中含有转义后的实体字符。可以使用以下方法</p>
<blockquote><p>直接使用utf-8字符<br>使用对应的Unicode编码查询编码；<br>使用数组组装&lt;div&gt;{["cc",&lt;span&gt;©&lt;/span&gt;," 2017"]}&lt;/div&gt;<br>直接插入原始html</p></blockquote>
<h1 id="articleHeader8">虚拟DOM(Virtual DOM)</h1>
<p>在传统的web应用中每次更新页面的时候都需要手动操作DOM来更新</p>
<blockquote><p>事件－》执行操作－》改变dom</p></blockquote>
<p>DOM操作非常昂贵。在前端开发中，性能消耗最大的就是DOM操作，而且这部分的操作代码不好维护。React把真实的DOM操作转成JavaScript对象树，也就是虚拟DOM;</p>
<p>这是普通的Html标签写法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--html-->
<a class=&quot;link&quot; href=&quot;https://github.com/facebook/react&quot;>React<a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!--html--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"link"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://github.com/facebook/react"</span>&gt;</span>React<span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span></code></pre>
<p>这是在js中手动生成相同dom的写法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//javascript dom
var a = document.createElement('a')
a.setAttribute('class', 'link')
a.setAttribute('href', 'https://github.com/facebook/react')
a.appendChild(document.createTextNode('React'))
//这是一种封装，沿用的React.createElement的命名
var a = React.createElement('a', {
    className: 'link',
    href: 'https://github.com/facebook/react'
}, 'React')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//javascript dom</span>
<span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = document.createElement(<span class="hljs-string">'a'</span>)
<span class="hljs-selector-tag">a</span>.setAttribute(<span class="hljs-string">'class'</span>, <span class="hljs-string">'link'</span>)
<span class="hljs-selector-tag">a</span>.setAttribute(<span class="hljs-string">'href'</span>, <span class="hljs-string">'https://github.com/facebook/react'</span>)
<span class="hljs-selector-tag">a</span>.appendChild(document.createTextNode(<span class="hljs-string">'React'</span>))
<span class="hljs-comment">//这是一种封装，沿用的React.createElement的命名</span>
<span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = React.createElement(<span class="hljs-string">'a'</span>, {
    className: <span class="hljs-string">'link'</span>,
    href: <span class="hljs-string">'https://github.com/facebook/react'</span>
}, <span class="hljs-string">'React'</span>)</code></pre>
<p>所有html结构，都可以用js dom来构造，而且能将构造的步骤封装起来，做到「数据-dom结构」的映射。<br>缓存初始数据，新数据进来时，与旧数据对比，找到差异，根据差异本身的性质进行dom操作；无差异，则不作为。</p>
<p>dom本身在js中就是一种数据结构<br><code>console.dir(document.body)</code><br>在控制台可以看到body的数据结构。然而，dom相关的数据丰富而且复杂，我们其实只关心少数元素的少数属性。</p>
<p>建立一个javascript plain object，非常轻量，用它保存我们真正关心的与dom相关的少数数据；对它进行操作，然后对比操作前后的差异，再根据映射关系去操作真正的dom，无疑能提高性能。</p>
<p>相对于 DOM 对象，原生的 JavaScript 对象处理起来更快，而且更简单。DOM 树上的结构、属性信息我们都可以很容易地用 JavaScript 对象表示出来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var element = {
  type: 'ul', // 节点标签名
  props: { // DOM的属性，用一个对象存储键值对
    id: 'list'
  },
  children: [ // 该节点的子节点
    {type: 'li', props: {className: 'item'}, children: [&quot;Item 1&quot;]},
    {type: 'li', props: {className: 'item'}, children: [&quot;Item 2&quot;]},
    {type: 'li', props: {className: 'item'}, children: [&quot;Item 3&quot;]},
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>var element = {
<span class="hljs-symbol">  type:</span> <span class="hljs-string">'ul'</span>, <span class="hljs-comment">// 节点标签名</span>
<span class="hljs-symbol">  props:</span> { <span class="hljs-comment">// DOM的属性，用一个对象存储键值对</span>
<span class="hljs-symbol">    id:</span> <span class="hljs-string">'list'</span>
  },
<span class="hljs-symbol">  children:</span> [ <span class="hljs-comment">// 该节点的子节点</span>
    {<span class="hljs-string">type:</span> <span class="hljs-string">'li'</span>, <span class="hljs-string">props:</span> {<span class="hljs-string">className:</span> <span class="hljs-string">'item'</span>}, <span class="hljs-string">children:</span> [<span class="hljs-string">"Item 1"</span>]},
    {<span class="hljs-string">type:</span> <span class="hljs-string">'li'</span>, <span class="hljs-string">props:</span> {<span class="hljs-string">className:</span> <span class="hljs-string">'item'</span>}, <span class="hljs-string">children:</span> [<span class="hljs-string">"Item 2"</span>]},
    {<span class="hljs-string">type:</span> <span class="hljs-string">'li'</span>, <span class="hljs-string">props:</span> {<span class="hljs-string">className:</span> <span class="hljs-string">'item'</span>}, <span class="hljs-string">children:</span> [<span class="hljs-string">"Item 3"</span>]},
  ]
}</code></pre>
<p>上面对应的HTML写法是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul id='list'>
  <li class='item'>Item 1</li>
  <li class='item'>Item 2</li>
  <li class='item'>Item 3</li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'list'</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'item'</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'item'</span>&gt;</span>Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'item'</span>&gt;</span>Item 3<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<p>每次数据更新后，重新计算虚拟DOM,并和上一次的作比较，对发生改变的部分做批量更新。React也提供了生命周期方法减少了不必要的对比过程，以保证性能</p>
<p>下一篇：<a href="https://segmentfault.com/a/1190000009099250">react开发教程（二）安装</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react开发教程（－）初识

## 原文链接
[https://segmentfault.com/a/1190000009083753](https://segmentfault.com/a/1190000009083753)

