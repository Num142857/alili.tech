---
title: '强大的拖拽组件：React DnD 的使用' 
date: 2018-12-02 2:30:15
hidden: true
slug: mc4q6cgywtm
categories: [reprint]
---

{{< raw >}}

                    
<p>文章首发我的个人blog : <a href="https://phoebecodespace.github.io/2018/05/03/react-dnd-guide/" rel="nofollow noreferrer" target="_blank">原文链接</a></p>
<p>学习 <a href="http://react-dnd.github.io/react-dnd/docs-overview.html" rel="nofollow noreferrer" target="_blank">React DnD</a> 的最初原因是阅读<a href="https://juejin.im/post/5ac322876fb9a028c71ea27e" rel="nofollow noreferrer" target="_blank">《如何写一个拖拽日历组件》</a>附的源码时，看不懂拖拽组件 React DnD 的相关代码，于是行动力极强地学习了React DnD这个组件。</p>
<blockquote>本文会通过 在根组件（Contaier.jsx）展示将垃圾（Box.jsx）扔进垃圾桶（Dustbin.jsx）的例子，解释如何使用React DnD最基本的拖拽用法。</blockquote>
<p>预览 <a href="http://react-dnd.github.io/react-dnd/examples-dustbin-single-target.html" rel="nofollow noreferrer" target="_blank">垃圾桶效果</a></p>
<p>查看 <a href="https://github.com/react-dnd/react-dnd/blob/master/packages/documentation/examples/01%20Dustbin/Single%20Target/index.js" rel="nofollow noreferrer" target="_blank">垃圾桶源码</a></p>
<h2 id="articleHeader0">核心API</h2>
<p>想要灵活使用，就先知道几个核心API</p>
<ul>
<li>
<strong>DragSource</strong> 用于包装你需要拖动的组件，使组件能够被拖拽（make it draggable）</li>
<li>
<strong>DropTarget</strong> 用于包装接收拖拽元素的组件，使组件能够放置（dropped on it）</li>
<li>
<strong>DragDropContex</strong> 用于包装拖拽根组件，<code>DragSource</code> 和 <code>DropTarget</code> 都需要包裹在<code>DragDropContex</code>内</li>
<li>
<strong>DragDropContextProvider</strong> 与 <code>DragDropContex</code> 类似，用 <code>DragDropContextProvider</code> 元素包裹拖拽根组件。</li>
</ul>
<p>大致理解这几个API的概念后，垃圾（Box.jsx）扔进垃圾桶（Dustbin.jsx）的代码将会是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Box.jsx
import { DragSource } from 'react-dnd';

@DragSource(type, spec, collect)
export default class Box {
  /* ... */
}

// Dustbin.jsx
import { DropTarget } from 'react-dnd';

@DropTarget(types, spec, collect)
export default class Contaier {
  /* ... */
}

// Contaier.jsx (DragDropContex)
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Box from './Box';
import Dustbin from './Dustbin';

@DragDropContext(HTML5Backend)
export default class Contaier extends Component {
  render() {
    return (
      <div>
          <Dustbin/>
          <Box/>
      </div>
    );
  }
}

// 也可以写成 Contaier.jsx (DragDropContextProvider)
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Box from './Box';
import Dustbin from './Dustbin';

export default class DustbinContaier extends Component {
  render() {
    return (
      <DragDropContextProvider backend = { HTML5Backend }>
        <div>
            <Dustbin/>
            <Box/>
        </div>
      </DragDropContextProvider>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Box.jsx</span>
<span class="hljs-keyword">import</span> { DragSource } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dnd'</span>;

@DragSource(type, spec, collect)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Box</span> </span>{
  <span class="hljs-comment">/* ... */</span>
}

<span class="hljs-comment">// Dustbin.jsx</span>
<span class="hljs-keyword">import</span> { DropTarget } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dnd'</span>;

@DropTarget(types, spec, collect)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Contaier</span> </span>{
  <span class="hljs-comment">/* ... */</span>
}

<span class="hljs-comment">// Contaier.jsx (DragDropContex)</span>
<span class="hljs-keyword">import</span> { DragDropContext } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dnd'</span>
<span class="hljs-keyword">import</span> HTML5Backend <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dnd-html5-backend'</span>
<span class="hljs-keyword">import</span> Box <span class="hljs-keyword">from</span> <span class="hljs-string">'./Box'</span>;
<span class="hljs-keyword">import</span> Dustbin <span class="hljs-keyword">from</span> <span class="hljs-string">'./Dustbin'</span>;

@DragDropContext(HTML5Backend)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Contaier</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Dustbin</span>/&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Box</span>/&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}

<span class="hljs-comment">// 也可以写成 Contaier.jsx (DragDropContextProvider)</span>
<span class="hljs-keyword">import</span> { DragDropContextProvider } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dnd'</span>
<span class="hljs-keyword">import</span> HTML5Backend <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dnd-html5-backend'</span>
<span class="hljs-keyword">import</span> Box <span class="hljs-keyword">from</span> <span class="hljs-string">'./Box'</span>;
<span class="hljs-keyword">import</span> Dustbin <span class="hljs-keyword">from</span> <span class="hljs-string">'./Dustbin'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DustbinContaier</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">DragDropContextProvider</span> <span class="hljs-attr">backend</span> = <span class="hljs-string">{</span> <span class="hljs-attr">HTML5Backend</span> }&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">Dustbin</span>/&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">Box</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">DragDropContextProvider</span>&gt;</span></span>
    );
  }
}</code></pre>
<h2 id="articleHeader1">API参数介绍</h2>
<p>上面的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@DragSource(type, spec, collect)
@DropTarget(types, spec, collect)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">@DragSource(type, spec, collect)
@DropTarget(types, spec, collect)</code></pre>
<p>可以看到 <code>DragSource</code>, <code>DropTarget</code> 分别有三个参数：</p>
<ul>
<li>type: 拖拽类型，必填</li>
<li>spec: 拖拽事件的方法对象，必填。</li>
<li>collect: 把拖拽过程中需要信息注入组件的 props，接收两个参数 <code>connect</code> and <code>monitor</code>，必填。</li>
</ul>
<blockquote>下面约定 <strong>source组件</strong> 为DragSource包装的组件(本示例为Box.jsx)，<strong>target组件</strong> 为DropTarget包装的组件(本示例为Dustbin.jsx)。</blockquote>
<h3 id="articleHeader2">type</h3>
<p>当 <code>source组件</code>的type 和 <code>target组件</code>的type 一致时，<code>target组件</code>可以接受<code>source组件</code>。</p>
<p>type的类型可以是 string，symbol，也可以是用一个函数来返回该组件的其他 props。</p>
<p>翻译为代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ItemTypes.js 定义类型
export default {
  BOX: 'box',
}

// Box.jsx
import ItemTypes from './ItemTypes'
@DragSource(ItemTypes.BOX, spec, collect)

// Dustbin.jsx
import ItemTypes from './ItemTypes'
@DropTarget(ItemTypes.BOX, spec, collect)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// ItemTypes.js 定义类型</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">BOX</span>: <span class="hljs-string">'box'</span>,
}

<span class="hljs-comment">// Box.jsx</span>
<span class="hljs-keyword">import</span> ItemTypes <span class="hljs-keyword">from</span> <span class="hljs-string">'./ItemTypes'</span>
@DragSource(ItemTypes.BOX, spec, collect)

<span class="hljs-comment">// Dustbin.jsx</span>
<span class="hljs-keyword">import</span> ItemTypes <span class="hljs-keyword">from</span> <span class="hljs-string">'./ItemTypes'</span>
@DropTarget(ItemTypes.BOX, spec, collect)</code></pre>
<h3 id="articleHeader3">spec</h3>
<p>spec定义特定方法的对象，如 <code>source组件</code>的spec 可以定义 <strong>拖动</strong> 相关的事件，<code>target组件</code>的spec 可以定义 <strong>放置</strong> 相关的事件，具体列表：</p>
<h4>DragSource specObj</h4>
<ul>
<li>
<code>beginDrag(props, monitor, component)</code>: 拖动开始时触发的事件，<strong>必须</strong>。返回跟props相关的对象。</li>
<li>
<code>endDrag(props, monitor, component)</code>: 拖动结束时触发的事件，可选。</li>
<li>
<code>canDrag(props, monitor)</code>:  当前是否可以拖拽的事件，可选。</li>
<li>
<code>isDragging(props, monitor)</code>: 拖拽时触发的事件，可选。</li>
</ul>
<p>翻译为代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // Box.jsx
  const sourceSpec = {
    beginDrag(props, monitor, component){
      // 返回需要注入的属性
      return {
        id: props.id
      }
    },
    endDrag(props, monitor, component){
      // ..
    },
    canDrag(props, monitor){
      // ..
    },
    isDragging(props, monitor){
      // ..
    }
  }
  @DragSource(ItemTypes.BOX, sourceSpec, collect)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-comment">// Box.jsx</span>
  <span class="hljs-keyword">const</span> sourceSpec = {
    beginDrag(props, monitor, component){
      <span class="hljs-comment">// 返回需要注入的属性</span>
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">id</span>: props.id
      }
    },
    endDrag(props, monitor, component){
      <span class="hljs-comment">// ..</span>
    },
    canDrag(props, monitor){
      <span class="hljs-comment">// ..</span>
    },
    isDragging(props, monitor){
      <span class="hljs-comment">// ..</span>
    }
  }
  @DragSource(ItemTypes.BOX, sourceSpec, collect)</code></pre>
<h4>DropTarget specObj</h4>
<ul>
<li>
<code>drop(props, monitor, component)</code> 组件放下时触发的事件，可选。</li>
<li>
<code>hover(props, monitor, component)</code> 组件在DropTarget上方时响应的事件，可选。</li>
<li>
<code>canDrop(props, monitor)</code> 组件可以被放置时触发的事件，可选。</li>
</ul>
<p>翻译为代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Dustbin.jsx
const targetSpec = {
  drop(props, monitor, component){
    // ..
  },
  hover(props, monitor, component){
    // ..
  },
  canDrop(props, monitor){
    // ..
  }
}
@DropTarget(ItemTypes.BOX, targetSpec, collect)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Dustbin.jsx</span>
<span class="hljs-keyword">const</span> targetSpec = {
  drop(props, monitor, component){
    <span class="hljs-comment">// ..</span>
  },
  hover(props, monitor, component){
    <span class="hljs-comment">// ..</span>
  },
  canDrop(props, monitor){
    <span class="hljs-comment">// ..</span>
  }
}
@DropTarget(ItemTypes.BOX, targetSpec, collect)</code></pre>
<h4>specObj 对象方法相关参数</h4>
<ul>
<li>props： 组件当前的props</li>
<li>
<p>monitor：查询当前的拖拽状态，比如当前拖拽的item和它的type，当前拖拽的offsets，当前是否dropped。具体获取方法，参看<a href="#heading-9">collect 参数 monitor 部分</a></p>
<ul>
<li>
<code>source组件</code> 的 monitor 参数是 <a href="http://react-dnd.github.io/react-dnd/docs-drag-source-monitor.html" rel="nofollow noreferrer" target="_blank">DragSourceMonitor</a> 的实例</li>
<li>
<code>target组件</code> 的 monitor 参数是 <a href="http://react-dnd.github.io/react-dnd/docs-drop-target.html" rel="nofollow noreferrer" target="_blank">DropTargetMonitor</a> 的实例</li>
</ul>
</li>
<li>component：当前组件实例</li>
</ul>
<h3 id="articleHeader4">collect</h3>
<p>collect 是一个函数，默认有两个参数：<code>connect</code> 和 <code>monitor</code>。collect函数将返回一个对象，这个对象会注入到组件的 props 中，也就是说，我们可以通过 <code>this.props</code> 获取collect返回的所有属性。</p>
<h4>参数 connect</h4>
<ul>
<li>
<code>source组件</code> collect 中 connect是 <a href="http://react-dnd.github.io/react-dnd/docs-drag-source-monitor.html" rel="nofollow noreferrer" target="_blank">DragSourceConnector</a>的实例，它内置了两个方法：<code>dragSource()</code> 和 <code>dragPreview()</code>。<code>dragSource()</code>返回一个方法，将<code>source组件</code>传入这个方法，可以将 source DOM 和 React DnD backend 连接起来；<code>dragPreview()</code> 返回一个方法，你可以传入节点，作为拖拽预览时的角色。</li>
<li>
<code>target组件</code> collect 中 connect是 <a href="http://react-dnd.github.io/react-dnd/docs-drop-target-connector.html" rel="nofollow noreferrer" target="_blank">DropTargetConnector</a>的实例，内置的方法 <code>dropTarget()</code> 对应 <code>dragSource()</code>，返回可以将 drop target 和 React DnD backend 连接起来的方法。</li>
</ul>
<p>翻译为代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Box.jsx
@DragSource(ItemTypes.BOX, sourceSpec,(connect)=>({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
}))
export default class Box {
  render() {
    const { connectDragSource } = this.props
    return connectDragSource(
      <div>
       {
           /* ... */
         }
      </div>,
    )
  }
}

// Dustbin.jsx
@DropTarget(ItemTypes.BOX, targetSpec, (connect)=>{
  connectDropTarget: connect.dropTarget(),
})
export default class Dustbin {
  render() {
    const { connectDropTarget } = this.props
    return connectDropTarget(
      <div>
       {
           /* ... */
         }
      </div>,
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Box.jsx</span>
@DragSource(ItemTypes.BOX, sourceSpec,(connect)=&gt;({
  <span class="hljs-attr">connectDragSource</span>: connect.dragSource(),
  <span class="hljs-attr">connectDragPreview</span>: connect.dragPreview(),
}))
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Box</span> </span>{
  render() {
    <span class="hljs-keyword">const</span> { connectDragSource } = <span class="hljs-keyword">this</span>.props
    <span class="hljs-keyword">return</span> connectDragSource(
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
       {
           /* ... */
         }
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>,
    )
  }
}

<span class="hljs-comment">// Dustbin.jsx</span>
@DropTarget(ItemTypes.BOX, targetSpec, (connect)=&gt;{
  <span class="hljs-attr">connectDropTarget</span>: connect.dropTarget(),
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dustbin</span> </span>{
  render() {
    <span class="hljs-keyword">const</span> { connectDropTarget } = <span class="hljs-keyword">this</span>.props
    <span class="hljs-keyword">return</span> connectDropTarget(
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
       {
           /* ... */
         }
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>,
    )
  }
}</code></pre>
<h4>参数 monitor</h4>
<p>monitor 用于查询当前的拖拽状态，其对应实例内置了很多方法。</p>
<ul>
<li>
<code>source组件</code> collect 中 monitor是 <a href="http://react-dnd.github.io/react-dnd/docs-drag-source-monitor.html" rel="nofollow noreferrer" target="_blank">DragSourceMonitor</a>的实例。</li>
<li>
<code>target组件</code> collect 中 monitor是 <a href="http://react-dnd.github.io/react-dnd/docs-drop-target-monitor.html" rel="nofollow noreferrer" target="_blank">DropTargetMonitor</a>的实例。</li>
</ul>
<p>内置方法列表：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// DragSourceMonitor
monitor.canDrag()        // 是否能被拖拽
monitor.isDragging()      // 是否正在拖拽
monitor.getItemType()     // 拖拽组件type
monitor.getItem()         // 当前拖拽的item
monitor.getDropResult()   // 查询drop结果
monitor.didDrop()         // source是否已经drop在target
monitor.getInitialClientOffset()   // 拖拽组件初始拖拽时offset
monitor.getInitialSourceClientOffset()
monitor.getClientOffset() // 拖拽组件当前offset
monitor.getDifferenceFromInitialOffset() // 当前拖拽offset和初始拖拽offset的差别
monitor.getSourceClientOffset()

// DropTargetMonitor
monitor.canDrop()         // 是否可被放置
monitor.isOver(options)   // source是否在target上方
monitor.getItemType()     // 拖拽组件type
monitor.getItem()         // 当前拖拽的item
monitor.getDropResult()   // 查询drop结果
monitor.didDrop()         // source是否已经drop在target
monitor.getInitialClientOffset()   // 拖拽组件初始拖拽时offset
monitor.getInitialSourceClientOffset()
monitor.getClientOffset() // 拖拽组件当前offset
monitor.getDifferenceFromInitialOffset() // 当前拖拽offset和初始拖拽offset的差别
monitor.getSourceClientOffset()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// DragSourceMonitor</span>
monitor.canDrag()        <span class="hljs-comment">// 是否能被拖拽</span>
monitor.isDragging()      <span class="hljs-comment">// 是否正在拖拽</span>
monitor.getItemType()     <span class="hljs-comment">// 拖拽组件type</span>
monitor.getItem()         <span class="hljs-comment">// 当前拖拽的item</span>
monitor.getDropResult()   <span class="hljs-comment">// 查询drop结果</span>
monitor.didDrop()         <span class="hljs-comment">// source是否已经drop在target</span>
monitor.getInitialClientOffset()   <span class="hljs-comment">// 拖拽组件初始拖拽时offset</span>
monitor.getInitialSourceClientOffset()
monitor.getClientOffset() <span class="hljs-comment">// 拖拽组件当前offset</span>
monitor.getDifferenceFromInitialOffset() <span class="hljs-comment">// 当前拖拽offset和初始拖拽offset的差别</span>
monitor.getSourceClientOffset()

<span class="hljs-comment">// DropTargetMonitor</span>
monitor.canDrop()         <span class="hljs-comment">// 是否可被放置</span>
monitor.isOver(options)   <span class="hljs-comment">// source是否在target上方</span>
monitor.getItemType()     <span class="hljs-comment">// 拖拽组件type</span>
monitor.getItem()         <span class="hljs-comment">// 当前拖拽的item</span>
monitor.getDropResult()   <span class="hljs-comment">// 查询drop结果</span>
monitor.didDrop()         <span class="hljs-comment">// source是否已经drop在target</span>
monitor.getInitialClientOffset()   <span class="hljs-comment">// 拖拽组件初始拖拽时offset</span>
monitor.getInitialSourceClientOffset()
monitor.getClientOffset() <span class="hljs-comment">// 拖拽组件当前offset</span>
monitor.getDifferenceFromInitialOffset() <span class="hljs-comment">// 当前拖拽offset和初始拖拽offset的差别</span>
monitor.getSourceClientOffset()</code></pre>
<h2 id="articleHeader5">具体例子</h2>
<p>先草草丢下官方例子和源码：</p>
<ul>
<li><a href="http://react-dnd.github.io/react-dnd/examples-chessboard-tutorial-app.html" rel="nofollow noreferrer" target="_blank">官方例子</a></li>
<li><a href="https://github.com/react-dnd/react-dnd/blob/master/packages/documentation/examples/README.md" rel="nofollow noreferrer" target="_blank">官方例子源码</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
强大的拖拽组件：React DnD 的使用

## 原文链接
[https://segmentfault.com/a/1190000014723549](https://segmentfault.com/a/1190000014723549)

