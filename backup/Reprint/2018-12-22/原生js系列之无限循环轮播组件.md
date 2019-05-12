---
title: '原生js系列之无限循环轮播组件' 
date: 2018-12-22 2:30:10
hidden: true
slug: rq0ltnpzita
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前情回顾</h2>
<p>在上一篇文章中，我们封装了一个DOM库（qnode），为了让大家直观地感受到其方便友好的自定义工厂模式，于是给大家带来了这篇文章。</p>
<p>没有看过上一篇文章的话，可以在这里找到：<a href="https://github.com/ansenhuang/ansenhuang.github.io/issues/22" rel="nofollow noreferrer" target="_blank">原生js系列之DOM工厂模式</a>。</p>
<p>那么这篇文章，我们将基于上述的<code>qnode</code>，从头开始写一个无限循环轮播图的组件。</p>
<h2 id="articleHeader1">思路讲解</h2>
<p>先看一张轮播布局图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012432456?w=1200&amp;h=625" src="https://static.alili.tech/img/remote/1460000012432456?w=1200&amp;h=625" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>滑动的时候，整个轮播容器整体前进或后退一格，通过css3过渡效果的设置，来达到滑动的效果。也许你会疑惑，头尾怎么会多出两张图呢？</p>
<p>其实无限循环轮播的核心就在于头尾多出的两张图，从图三再向后滑动，会滑到红色图一（我称之为占位图一），这个时候给用户的感觉就是无缝从最后一张滑动到第一张的，当他滑到占位图一时，我们再瞬间切换到粉色图一（即真正的图一），由于是瞬间变换，用户是感知不到的。同理，从图一滑到图三也一样。由此，周而复始，无穷无尽，给人的感觉是永远也不会到尽头，当然个中奥妙只有我们知道哈哈。</p>
<h2 id="articleHeader2">目录结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="swiper
├── README.md
├── index.js
├── qnode
│&nbsp;&nbsp; ├── index.js
│&nbsp;&nbsp; ├── method.js
│&nbsp;&nbsp; └── store.js
├── render
│&nbsp;&nbsp; ├── index.js
│&nbsp;&nbsp; ├── indicator.js
│&nbsp;&nbsp; └── list.js
└── styles
    ├── indicator.mcss
    ├── list.mcss
    └── wrap.mcss" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>swiper
├── README<span class="hljs-selector-class">.md</span>
├── index<span class="hljs-selector-class">.js</span>
├── qnode
│&nbsp;&nbsp; ├── index<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; ├── method<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; └── store<span class="hljs-selector-class">.js</span>
├── render
│&nbsp;&nbsp; ├── index<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; ├── indicator<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; └── list<span class="hljs-selector-class">.js</span>
└── styles
    ├── indicator<span class="hljs-selector-class">.mcss</span>
    ├── list<span class="hljs-selector-class">.mcss</span>
    └── wrap.mcss</code></pre>
<p>说明：mcss文件是通过<code>css-modules</code>来编译的，给class名称生成唯一标识，防止命名冲突。这里有我配置好的一套脚手架，觉得webpack配置麻烦的话，可以clone我这个项目来编译代码：<a href="https://github.com/ansenhuang/webpack-build" rel="nofollow noreferrer" target="_blank">webpack-build</a>。</p>
<h2 id="articleHeader3">代码编写</h2>
<p><code>index.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import qnode from './qnode'
import render from './render'

const defaults = {
  initIndex: 1,
  autoplay: {
    use: true,
    delay: 3000
  },
  slide: {
    use: true,
    scale: 1 / 3,
    speed: 0.2
  },
  indicator: {
    use: true,
    bottom: '',
    dotClass: '',
    dotActiveClass: ''
  }
}

export default function swiper (node, {
  datas,
  initIndex,
  slide,
  autoplay,
  indicator
}) {
  if (!node || !datas || !datas.length) return

  // 储存数据的前后顺序很重要，一定要在调用前设置
  qnode.setStore('datas', datas)
  qnode.setStore('index', (initIndex || defaults.initIndex) - 1)
  qnode.setStore('slide', Object.assign({}, defaults.slide, slide))
  qnode.setStore('autoplay', Object.assign({}, defaults.autoplay, autoplay))
  qnode.setStore('indicator', Object.assign({}, defaults.indicator, indicator))

  // 渲染dom并储存在qnode，以便后续的获取和操作
  render()

  // 自动轮播
  qnode.execMethod('autoplay')
  // 滑动翻页
  qnode.execMethod('slide')

  // 挂载到真实的节点上
  qnode.getNode('wrap').appendTo(node)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> qnode <span class="hljs-keyword">from</span> <span class="hljs-string">'./qnode'</span>
<span class="hljs-keyword">import</span> render <span class="hljs-keyword">from</span> <span class="hljs-string">'./render'</span>

<span class="hljs-keyword">const</span> defaults = {
  <span class="hljs-attr">initIndex</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">autoplay</span>: {
    <span class="hljs-attr">use</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">delay</span>: <span class="hljs-number">3000</span>
  },
  <span class="hljs-attr">slide</span>: {
    <span class="hljs-attr">use</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">scale</span>: <span class="hljs-number">1</span> / <span class="hljs-number">3</span>,
    <span class="hljs-attr">speed</span>: <span class="hljs-number">0.2</span>
  },
  <span class="hljs-attr">indicator</span>: {
    <span class="hljs-attr">use</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">bottom</span>: <span class="hljs-string">''</span>,
    <span class="hljs-attr">dotClass</span>: <span class="hljs-string">''</span>,
    <span class="hljs-attr">dotActiveClass</span>: <span class="hljs-string">''</span>
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">swiper</span> (<span class="hljs-params">node, {
  datas,
  initIndex,
  slide,
  autoplay,
  indicator
}</span>) </span>{
  <span class="hljs-keyword">if</span> (!node || !datas || !datas.length) <span class="hljs-keyword">return</span>

  <span class="hljs-comment">// 储存数据的前后顺序很重要，一定要在调用前设置</span>
  qnode.setStore(<span class="hljs-string">'datas'</span>, datas)
  qnode.setStore(<span class="hljs-string">'index'</span>, (initIndex || defaults.initIndex) - <span class="hljs-number">1</span>)
  qnode.setStore(<span class="hljs-string">'slide'</span>, <span class="hljs-built_in">Object</span>.assign({}, defaults.slide, slide))
  qnode.setStore(<span class="hljs-string">'autoplay'</span>, <span class="hljs-built_in">Object</span>.assign({}, defaults.autoplay, autoplay))
  qnode.setStore(<span class="hljs-string">'indicator'</span>, <span class="hljs-built_in">Object</span>.assign({}, defaults.indicator, indicator))

  <span class="hljs-comment">// 渲染dom并储存在qnode，以便后续的获取和操作</span>
  render()

  <span class="hljs-comment">// 自动轮播</span>
  qnode.execMethod(<span class="hljs-string">'autoplay'</span>)
  <span class="hljs-comment">// 滑动翻页</span>
  qnode.execMethod(<span class="hljs-string">'slide'</span>)

  <span class="hljs-comment">// 挂载到真实的节点上</span>
  qnode.getNode(<span class="hljs-string">'wrap'</span>).appendTo(node)
}</code></pre>
<p><code>render/index.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import qnode from '../qnode'
import renderList from './list'
import renderIndicator from './indicator'

import mcss from '../styles/wrap.mcss'

export default function () {
  renderList() // 渲染列表
  renderIndicator() // 渲染指示器，若没有开启则不会渲染

  qnode.setNode('wrap', '$div')
    .addClass(mcss.wrap)
    .append([
      qnode.getNode('list'),
      qnode.getNode('indicator') // 有可能没有值，这一层我们的qnode会过滤调，所以放心大胆地写
    ])
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> qnode <span class="hljs-keyword">from</span> <span class="hljs-string">'../qnode'</span>
<span class="hljs-keyword">import</span> renderList <span class="hljs-keyword">from</span> <span class="hljs-string">'./list'</span>
<span class="hljs-keyword">import</span> renderIndicator <span class="hljs-keyword">from</span> <span class="hljs-string">'./indicator'</span>

<span class="hljs-keyword">import</span> mcss <span class="hljs-keyword">from</span> <span class="hljs-string">'../styles/wrap.mcss'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  renderList() <span class="hljs-comment">// 渲染列表</span>
  renderIndicator() <span class="hljs-comment">// 渲染指示器，若没有开启则不会渲染</span>

  qnode.setNode(<span class="hljs-string">'wrap'</span>, <span class="hljs-string">'$div'</span>)
    .addClass(mcss.wrap)
    .append([
      qnode.getNode(<span class="hljs-string">'list'</span>),
      qnode.getNode(<span class="hljs-string">'indicator'</span>) <span class="hljs-comment">// 有可能没有值，这一层我们的qnode会过滤调，所以放心大胆地写</span>
    ])
}</code></pre>
<p><code>render/list.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { isElement, isString } from '@m/utils/is'
import qnode from '../qnode'

import mcss from '../styles/list.mcss'

function getItemNode (data) {
  const qItem = qnode.q('$div').addClass(mcss.item)

  if (isElement(data)) {
    return qItem.append(data)
  }

  if (isString(data)) {
    return qItem.html(data)
  }

  return qItem.html(`
    <a href=&quot;${data.href || 'javascript:;'}&quot; target=&quot;${data.target || '_self'}&quot;>
      <img src=&quot;${data.src}&quot; alt=&quot;img&quot; />
    </a>
  `)
}

export default function () {
  const datas = qnode.getStore('datas')
  const tdTime = qnode.getStore('tdTime')
  const posIndex = qnode.getStore('index') + 1

  const qItems = datas.map(item => getItemNode(item))

  // 首位多插入一个节点，用于视觉感知，交互完成后瞬间替换到相应的节点
  qItems.unshift(getItemNode(datas[datas.length - 1]))
  qItems.push(getItemNode(datas[0]))

  qnode.setNode('list', '$div')
    .addClass(mcss.list)
    .style({
      transitionDuration: tdTime + 'ms',
      transform: `translateX(${posIndex * -100}%)`
    })
    .append(qItems)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { isElement, isString } <span class="hljs-keyword">from</span> <span class="hljs-string">'@m/utils/is'</span>
<span class="hljs-keyword">import</span> qnode <span class="hljs-keyword">from</span> <span class="hljs-string">'../qnode'</span>

<span class="hljs-keyword">import</span> mcss <span class="hljs-keyword">from</span> <span class="hljs-string">'../styles/list.mcss'</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getItemNode</span> (<span class="hljs-params">data</span>) </span>{
  <span class="hljs-keyword">const</span> qItem = qnode.q(<span class="hljs-string">'$div'</span>).addClass(mcss.item)

  <span class="hljs-keyword">if</span> (isElement(data)) {
    <span class="hljs-keyword">return</span> qItem.append(data)
  }

  <span class="hljs-keyword">if</span> (isString(data)) {
    <span class="hljs-keyword">return</span> qItem.html(data)
  }

  <span class="hljs-keyword">return</span> qItem.html(<span class="hljs-string">`
    &lt;a href="<span class="hljs-subst">${data.href || <span class="hljs-string">'javascript:;'</span>}</span>" target="<span class="hljs-subst">${data.target || <span class="hljs-string">'_self'</span>}</span>"&gt;
      &lt;img src="<span class="hljs-subst">${data.src}</span>" alt="img" /&gt;
    &lt;/a&gt;
  `</span>)
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> datas = qnode.getStore(<span class="hljs-string">'datas'</span>)
  <span class="hljs-keyword">const</span> tdTime = qnode.getStore(<span class="hljs-string">'tdTime'</span>)
  <span class="hljs-keyword">const</span> posIndex = qnode.getStore(<span class="hljs-string">'index'</span>) + <span class="hljs-number">1</span>

  <span class="hljs-keyword">const</span> qItems = datas.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> getItemNode(item))

  <span class="hljs-comment">// 首位多插入一个节点，用于视觉感知，交互完成后瞬间替换到相应的节点</span>
  qItems.unshift(getItemNode(datas[datas.length - <span class="hljs-number">1</span>]))
  qItems.push(getItemNode(datas[<span class="hljs-number">0</span>]))

  qnode.setNode(<span class="hljs-string">'list'</span>, <span class="hljs-string">'$div'</span>)
    .addClass(mcss.list)
    .style({
      <span class="hljs-attr">transitionDuration</span>: tdTime + <span class="hljs-string">'ms'</span>,
      <span class="hljs-attr">transform</span>: <span class="hljs-string">`translateX(<span class="hljs-subst">${posIndex * <span class="hljs-number">-100</span>}</span>%)`</span>
    })
    .append(qItems)
}</code></pre>
<p><code>render/indicator.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import qnode from '../qnode'

import mcss from '../styles/indicator.mcss'

export default function () {
  const indicator = qnode.getStore('indicator')
  const last = qnode.getStore('datas').length - 1
  const index = qnode.getStore('index')
  const dotClass = indicator.dotClass || mcss.dot
  const dotActiveClass = indicator.dotActiveClass || mcss.dotActive

  if (indicator.use) {
    let qDots = []
    for (let i = 0; i <= last; i++) {
      qDots.push(
        qnode.q('$div').addClass(dotClass, (i === index) &amp;&amp; dotActiveClass)
      )
    }

    qnode.setNode('dots', qDots)
    qnode.setStore('dotActiveClass', dotActiveClass)
    qnode.setNode('indicator', '$div')
      .addClass(mcss.indicator)
      .style('bottom', indicator.bottom)
      .append(qDots)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> qnode <span class="hljs-keyword">from</span> <span class="hljs-string">'../qnode'</span>

<span class="hljs-keyword">import</span> mcss <span class="hljs-keyword">from</span> <span class="hljs-string">'../styles/indicator.mcss'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> indicator = qnode.getStore(<span class="hljs-string">'indicator'</span>)
  <span class="hljs-keyword">const</span> last = qnode.getStore(<span class="hljs-string">'datas'</span>).length - <span class="hljs-number">1</span>
  <span class="hljs-keyword">const</span> index = qnode.getStore(<span class="hljs-string">'index'</span>)
  <span class="hljs-keyword">const</span> dotClass = indicator.dotClass || mcss.dot
  <span class="hljs-keyword">const</span> dotActiveClass = indicator.dotActiveClass || mcss.dotActive

  <span class="hljs-keyword">if</span> (indicator.use) {
    <span class="hljs-keyword">let</span> qDots = []
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt;= last; i++) {
      qDots.push(
        qnode.q(<span class="hljs-string">'$div'</span>).addClass(dotClass, (i === index) &amp;&amp; dotActiveClass)
      )
    }

    qnode.setNode(<span class="hljs-string">'dots'</span>, qDots)
    qnode.setStore(<span class="hljs-string">'dotActiveClass'</span>, dotActiveClass)
    qnode.setNode(<span class="hljs-string">'indicator'</span>, <span class="hljs-string">'$div'</span>)
      .addClass(mcss.indicator)
      .style(<span class="hljs-string">'bottom'</span>, indicator.bottom)
      .append(qDots)
  }
}</code></pre>
<p><code>qnode/index.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { QNode } from '@m/qnode'
import { tdTime } from './store'
import { change, autoplay, slide, indicator } from './method'

const qnode = new QNode()

qnode.setStore('tdTime', tdTime)

qnode.setMethod('change', change)
qnode.setMethod('autoplay', autoplay)
qnode.setMethod('slide', slide)
qnode.setMethod('indicator', indicator)

export default qnode" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { QNode } <span class="hljs-keyword">from</span> <span class="hljs-string">'@m/qnode'</span>
<span class="hljs-keyword">import</span> { tdTime } <span class="hljs-keyword">from</span> <span class="hljs-string">'./store'</span>
<span class="hljs-keyword">import</span> { change, autoplay, slide, indicator } <span class="hljs-keyword">from</span> <span class="hljs-string">'./method'</span>

<span class="hljs-keyword">const</span> qnode = <span class="hljs-keyword">new</span> QNode()

qnode.setStore(<span class="hljs-string">'tdTime'</span>, tdTime)

qnode.setMethod(<span class="hljs-string">'change'</span>, change)
qnode.setMethod(<span class="hljs-string">'autoplay'</span>, autoplay)
qnode.setMethod(<span class="hljs-string">'slide'</span>, slide)
qnode.setMethod(<span class="hljs-string">'indicator'</span>, indicator)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> qnode</code></pre>
<p><code>qnode/store.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 静态数据可以放在这里
export const tdTime = 500" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 静态数据可以放在这里</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> tdTime = <span class="hljs-number">500</span></code></pre>
<p><code>qnode/method.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import touchSlide from './touchSlide'

// 翻页处理
export function change (isNext) {
  let index = this.getStore('index')
  let cacheIndex = index // 用于记录上一次的索引，移除指示器激活样式时使用
  let last = this.getStore('datas').length - 1
  let tdTime = this.getStore('tdTime')
  let qList = this.getNode('list')
  let isNextContinue = isNext &amp;&amp; (index === last)
  let isPrevContinue = !isNext &amp;&amp; (index === 0)
  let posIndex = index + (isNext ? 2 : 0)

  if (isNextContinue || isPrevContinue) {
    // 滑到占位图
    qList.style('transform', `translateX(${posIndex * -100}%)`)
    index = isNextContinue ? 0 : last

    setTimeout(() => {
      qList.style({
        transitionDuration: '0ms',
        transform: `translateX(${(index + 1) * -100}%)`
      })
    }, tdTime)
  } else {
    qList.style({
      transitionDuration: tdTime + 'ms',
      transform: `translateX(${posIndex * -100}%)`
    })
    index += isNext ? 1 : -1
  }

  this.setStore('index', index)
  this.execMethod('indicator', cacheIndex, index)
}

// 自动轮播
export function autoplay () {
  let opt = this.getStore('autoplay')

  if (!opt.use) return

  let timer = setInterval(() => {
    this.execMethod('change', true)
  }, opt.delay)

  this.setStore('timer', timer)
}

// 滑动处理
export function slide () {
  let qWrap = this.getNode('wrap')
  let qList = this.getNode('list')
  let tdTime = this.getStore('tdTime')
  let slideData = this.getStore('slide')
  let self = this

  if (!slideData.use) return

  touchSlide(qWrap.current(), {
    delay: 0,
    start () {
      // 清除轮播定时器和css3过渡效果
      clearTimeout(self.getStore('timer'))
      qList.style('transitionDuration', '0ms')
    },
    move (info) {
      let posIndex = self.getStore('index') + 1
      let move = info.disX / qWrap.width() * 100
      let total = posIndex * -100 + move

      qList.style('transform', `translateX(${total}%)`)
    },
    end (info) {
      // 开启轮播和css3过渡效果
      self.execMethod('autoplay')
      qList.style('transitionDuration', tdTime + 'ms')

      let posIndex = self.getStore('index') + 1
      let scale = Math.abs(info.disX) / qWrap.width()
      let speed = Math.abs(info.speedX)

      if (scale >= slideData.scale || speed >= slideData.speed) {
        self.execMethod('change', info.disX < 0) // 翻页
      } else {
        qList.style('transform', `translateX(${posIndex * -100}%)`)
      }
    }
  })
}

// 修改指示器索引
export function indicator (lastIndex, currIndex) {
  const qDots = this.getNode('dots')
  const dotActiveClass = this.getStore('dotActiveClass')

  if (qDots &amp;&amp; dotActiveClass) {
    qDots[lastIndex].removeClass(dotActiveClass)
    qDots[currIndex].addClass(dotActiveClass)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> touchSlide <span class="hljs-keyword">from</span> <span class="hljs-string">'./touchSlide'</span>

<span class="hljs-comment">// 翻页处理</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">change</span> (<span class="hljs-params">isNext</span>) </span>{
  <span class="hljs-keyword">let</span> index = <span class="hljs-keyword">this</span>.getStore(<span class="hljs-string">'index'</span>)
  <span class="hljs-keyword">let</span> cacheIndex = index <span class="hljs-comment">// 用于记录上一次的索引，移除指示器激活样式时使用</span>
  <span class="hljs-keyword">let</span> last = <span class="hljs-keyword">this</span>.getStore(<span class="hljs-string">'datas'</span>).length - <span class="hljs-number">1</span>
  <span class="hljs-keyword">let</span> tdTime = <span class="hljs-keyword">this</span>.getStore(<span class="hljs-string">'tdTime'</span>)
  <span class="hljs-keyword">let</span> qList = <span class="hljs-keyword">this</span>.getNode(<span class="hljs-string">'list'</span>)
  <span class="hljs-keyword">let</span> isNextContinue = isNext &amp;&amp; (index === last)
  <span class="hljs-keyword">let</span> isPrevContinue = !isNext &amp;&amp; (index === <span class="hljs-number">0</span>)
  <span class="hljs-keyword">let</span> posIndex = index + (isNext ? <span class="hljs-number">2</span> : <span class="hljs-number">0</span>)

  <span class="hljs-keyword">if</span> (isNextContinue || isPrevContinue) {
    <span class="hljs-comment">// 滑到占位图</span>
    qList.style(<span class="hljs-string">'transform'</span>, <span class="hljs-string">`translateX(<span class="hljs-subst">${posIndex * <span class="hljs-number">-100</span>}</span>%)`</span>)
    index = isNextContinue ? <span class="hljs-number">0</span> : last

    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      qList.style({
        <span class="hljs-attr">transitionDuration</span>: <span class="hljs-string">'0ms'</span>,
        <span class="hljs-attr">transform</span>: <span class="hljs-string">`translateX(<span class="hljs-subst">${(index + <span class="hljs-number">1</span>) * <span class="hljs-number">-100</span>}</span>%)`</span>
      })
    }, tdTime)
  } <span class="hljs-keyword">else</span> {
    qList.style({
      <span class="hljs-attr">transitionDuration</span>: tdTime + <span class="hljs-string">'ms'</span>,
      <span class="hljs-attr">transform</span>: <span class="hljs-string">`translateX(<span class="hljs-subst">${posIndex * <span class="hljs-number">-100</span>}</span>%)`</span>
    })
    index += isNext ? <span class="hljs-number">1</span> : <span class="hljs-number">-1</span>
  }

  <span class="hljs-keyword">this</span>.setStore(<span class="hljs-string">'index'</span>, index)
  <span class="hljs-keyword">this</span>.execMethod(<span class="hljs-string">'indicator'</span>, cacheIndex, index)
}

<span class="hljs-comment">// 自动轮播</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">autoplay</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> opt = <span class="hljs-keyword">this</span>.getStore(<span class="hljs-string">'autoplay'</span>)

  <span class="hljs-keyword">if</span> (!opt.use) <span class="hljs-keyword">return</span>

  <span class="hljs-keyword">let</span> timer = setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.execMethod(<span class="hljs-string">'change'</span>, <span class="hljs-literal">true</span>)
  }, opt.delay)

  <span class="hljs-keyword">this</span>.setStore(<span class="hljs-string">'timer'</span>, timer)
}

<span class="hljs-comment">// 滑动处理</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">slide</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> qWrap = <span class="hljs-keyword">this</span>.getNode(<span class="hljs-string">'wrap'</span>)
  <span class="hljs-keyword">let</span> qList = <span class="hljs-keyword">this</span>.getNode(<span class="hljs-string">'list'</span>)
  <span class="hljs-keyword">let</span> tdTime = <span class="hljs-keyword">this</span>.getStore(<span class="hljs-string">'tdTime'</span>)
  <span class="hljs-keyword">let</span> slideData = <span class="hljs-keyword">this</span>.getStore(<span class="hljs-string">'slide'</span>)
  <span class="hljs-keyword">let</span> self = <span class="hljs-keyword">this</span>

  <span class="hljs-keyword">if</span> (!slideData.use) <span class="hljs-keyword">return</span>

  touchSlide(qWrap.current(), {
    <span class="hljs-attr">delay</span>: <span class="hljs-number">0</span>,
    start () {
      <span class="hljs-comment">// 清除轮播定时器和css3过渡效果</span>
      clearTimeout(self.getStore(<span class="hljs-string">'timer'</span>))
      qList.style(<span class="hljs-string">'transitionDuration'</span>, <span class="hljs-string">'0ms'</span>)
    },
    move (info) {
      <span class="hljs-keyword">let</span> posIndex = self.getStore(<span class="hljs-string">'index'</span>) + <span class="hljs-number">1</span>
      <span class="hljs-keyword">let</span> move = info.disX / qWrap.width() * <span class="hljs-number">100</span>
      <span class="hljs-keyword">let</span> total = posIndex * <span class="hljs-number">-100</span> + move

      qList.style(<span class="hljs-string">'transform'</span>, <span class="hljs-string">`translateX(<span class="hljs-subst">${total}</span>%)`</span>)
    },
    end (info) {
      <span class="hljs-comment">// 开启轮播和css3过渡效果</span>
      self.execMethod(<span class="hljs-string">'autoplay'</span>)
      qList.style(<span class="hljs-string">'transitionDuration'</span>, tdTime + <span class="hljs-string">'ms'</span>)

      <span class="hljs-keyword">let</span> posIndex = self.getStore(<span class="hljs-string">'index'</span>) + <span class="hljs-number">1</span>
      <span class="hljs-keyword">let</span> scale = <span class="hljs-built_in">Math</span>.abs(info.disX) / qWrap.width()
      <span class="hljs-keyword">let</span> speed = <span class="hljs-built_in">Math</span>.abs(info.speedX)

      <span class="hljs-keyword">if</span> (scale &gt;= slideData.scale || speed &gt;= slideData.speed) {
        self.execMethod(<span class="hljs-string">'change'</span>, info.disX &lt; <span class="hljs-number">0</span>) <span class="hljs-comment">// 翻页</span>
      } <span class="hljs-keyword">else</span> {
        qList.style(<span class="hljs-string">'transform'</span>, <span class="hljs-string">`translateX(<span class="hljs-subst">${posIndex * <span class="hljs-number">-100</span>}</span>%)`</span>)
      }
    }
  })
}

<span class="hljs-comment">// 修改指示器索引</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">indicator</span> (<span class="hljs-params">lastIndex, currIndex</span>) </span>{
  <span class="hljs-keyword">const</span> qDots = <span class="hljs-keyword">this</span>.getNode(<span class="hljs-string">'dots'</span>)
  <span class="hljs-keyword">const</span> dotActiveClass = <span class="hljs-keyword">this</span>.getStore(<span class="hljs-string">'dotActiveClass'</span>)

  <span class="hljs-keyword">if</span> (qDots &amp;&amp; dotActiveClass) {
    qDots[lastIndex].removeClass(dotActiveClass)
    qDots[currIndex].addClass(dotActiveClass)
  }
}</code></pre>
<p><code>touchSlide.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 截流
function throttle (fn, delay = 100) {
  let wait = false

  return function () {
    if (!wait) {
      fn &amp;&amp; fn.apply(this, arguments)
      wait = true

      setTimeout(() => {
        wait = false
      }, delay)
    }
  }
}

/**
 *
 * 滑动
 * @param {HTMLElement} node
 * @param {Object} {
 *   delay = 100, // move截流时间
 *   start, // 滑动开始
 *      参数: pageX, pageY
 *   move, // 滑动中，会不断地触发，可以通过截流来限制触发频率
 *      参数:
            time, // 总时间:ms
            disX, // 总路程:px
            disY,
            addX, // 路程增量:px
            addY,
            speedX: disX / time, // 平均速度:px/ms
            speedY: disY / time
 *   end, // 滑动结束，参数同move
 * }
 */
export default function (node, {
  delay = 100,
  start,
  move,
  end
}) {
  if (!node) return

  let sTouch, eTouch, sTime
  let touch, time, disX, disY, addX, addY

  node.addEventListener('touchstart', e => {
    e.preventDefault()

    sTime = e.timeStamp
    sTouch = eTouch = e.targetTouches[0]

    start &amp;&amp; start({
      pageX: sTouch.pageX,
      pageY: sTouch.pageY
    })
  }, false)

  node.addEventListener('touchmove', throttle(e => {
    touch = e.targetTouches[0]
    time = e.timeStamp - sTime
    disX = touch.pageX - sTouch.pageX
    disY = touch.pageY - sTouch.pageY
    addX = touch.pageX - eTouch.pageX
    addY = touch.pageY - eTouch.pageY

    move &amp;&amp; move({
      time, // 总时间:ms
      disX, // 总路程:px
      disY,
      addX, // 路程增量:px
      addY,
      speedX: disX / time, // 平均速度:px/ms
      speedY: disY / time
    })

    // 记录上一次touch
    eTouch = touch
  }, delay), false)

  node.addEventListener('touchend', e => {
    touch = e.changedTouches[0]
    time = e.timeStamp - sTime
    disX = touch.pageX - sTouch.pageX
    disY = touch.pageY - sTouch.pageY
    addX = touch.pageX - eTouch.pageX
    addY = touch.pageY - eTouch.pageY

    end &amp;&amp; end({
      time,
      disX,
      disY,
      addX,
      addY,
      speedX: disX / time,
      speedY: disY / time
    })
  }, false)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 截流</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">throttle</span> (<span class="hljs-params">fn, delay = <span class="hljs-number">100</span></span>) </span>{
  <span class="hljs-keyword">let</span> wait = <span class="hljs-literal">false</span>

  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (!wait) {
      fn &amp;&amp; fn.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>)
      wait = <span class="hljs-literal">true</span>

      setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        wait = <span class="hljs-literal">false</span>
      }, delay)
    }
  }
}

<span class="hljs-comment">/**
 *
 * 滑动
 * @param {HTMLElement} node
 * @param {Object} {
 *   delay = 100, // move截流时间
 *   start, // 滑动开始
 *      参数: pageX, pageY
 *   move, // 滑动中，会不断地触发，可以通过截流来限制触发频率
 *      参数:
            time, // 总时间:ms
            disX, // 总路程:px
            disY,
            addX, // 路程增量:px
            addY,
            speedX: disX / time, // 平均速度:px/ms
            speedY: disY / time
 *   end, // 滑动结束，参数同move
 * }
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">node, {
  delay = <span class="hljs-number">100</span>,
  start,
  move,
  end
}</span>) </span>{
  <span class="hljs-keyword">if</span> (!node) <span class="hljs-keyword">return</span>

  <span class="hljs-keyword">let</span> sTouch, eTouch, sTime
  <span class="hljs-keyword">let</span> touch, time, disX, disY, addX, addY

  node.addEventListener(<span class="hljs-string">'touchstart'</span>, e =&gt; {
    e.preventDefault()

    sTime = e.timeStamp
    sTouch = eTouch = e.targetTouches[<span class="hljs-number">0</span>]

    start &amp;&amp; start({
      <span class="hljs-attr">pageX</span>: sTouch.pageX,
      <span class="hljs-attr">pageY</span>: sTouch.pageY
    })
  }, <span class="hljs-literal">false</span>)

  node.addEventListener(<span class="hljs-string">'touchmove'</span>, throttle(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
    touch = e.targetTouches[<span class="hljs-number">0</span>]
    time = e.timeStamp - sTime
    disX = touch.pageX - sTouch.pageX
    disY = touch.pageY - sTouch.pageY
    addX = touch.pageX - eTouch.pageX
    addY = touch.pageY - eTouch.pageY

    move &amp;&amp; move({
      time, <span class="hljs-comment">// 总时间:ms</span>
      disX, <span class="hljs-comment">// 总路程:px</span>
      disY,
      addX, <span class="hljs-comment">// 路程增量:px</span>
      addY,
      <span class="hljs-attr">speedX</span>: disX / time, <span class="hljs-comment">// 平均速度:px/ms</span>
      speedY: disY / time
    })

    <span class="hljs-comment">// 记录上一次touch</span>
    eTouch = touch
  }, delay), <span class="hljs-literal">false</span>)

  node.addEventListener(<span class="hljs-string">'touchend'</span>, e =&gt; {
    touch = e.changedTouches[<span class="hljs-number">0</span>]
    time = e.timeStamp - sTime
    disX = touch.pageX - sTouch.pageX
    disY = touch.pageY - sTouch.pageY
    addX = touch.pageX - eTouch.pageX
    addY = touch.pageY - eTouch.pageY

    end &amp;&amp; end({
      time,
      disX,
      disY,
      addX,
      addY,
      <span class="hljs-attr">speedX</span>: disX / time,
      <span class="hljs-attr">speedY</span>: disY / time
    })
  }, <span class="hljs-literal">false</span>)
}</code></pre>
<p><code>styles/wrap.mcss</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrap {
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.wrap</span> {
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">overflow</span>: hidden;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, 0, 0);
}</code></pre>
<p><code>styles/list.mcss</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".list {
  display: flex;
  flex-direction: row;
  transform: translateX(0);
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.item {
  flex-basis: 100%;
  flex-shrink: 0;
  box-sizing: border-box;

  a {
    display: block;
    font-size: 0;

    img {
      width: 100%;
      height: auto;
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.list</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">flex-direction</span>: row;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0);
  <span class="hljs-attribute">transition</span>: transform <span class="hljs-number">0.5s</span> <span class="hljs-built_in">cubic-bezier</span>(0.25, 0.46, 0.45, 0.94);
}

<span class="hljs-selector-class">.item</span> {
  <span class="hljs-attribute">flex-basis</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">flex-shrink</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;

  a {
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;

    img {
      <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-attribute">height</span>: auto;
    }
  }
}</code></pre>
<p><code>styles/indicator.mcss</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".indicator {
  position: absolute;
  bottom: 1em;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}

.dot {
  width: 1em;
  height: 0.12em;
  margin: 0 0.12em;
  background-color: rgba(255, 255, 255, 0.5);

  &amp;-active {
    background-color: #fff;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.indicator</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">1em</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">justify-content</span>: center;
}

<span class="hljs-selector-class">.dot</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">1em</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">0.12em</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">0.12em</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(255, 255, 255, 0.5);

  &amp;-active {
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
  }
}</code></pre>
<h2 id="articleHeader4">README</h2>
<h2 id="articleHeader5">参数</h2>
<ul>
<li>node: 要挂载的dom节点，必须</li>
<li>options: 如下（其中datas是必要的）</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  initIndex: 1, // 初始化展示的索引
  autoplay: { // 自动轮播设置
    use: true, // 开关
    delay: 3000 // 间隔3s
  },
  slide: { // 手指滑动设置
    use: true, // 开关
    scale: 1/3, // 划过总共宽度的1/3则翻页
    speed: 0.2 // 滑动的速度超过0.2px/ms则翻页，即快速滑动也可以翻页
  },
  indicator: { // 索引指示器设置
    use: true, // 开关
    bottom: '', // 底部的距离
    dotClass: '', // 自定义圆点样式
    dotActiveClass: '' // 自定义激活样式
  },
  datas: [ // 图片数据
    {
      src: 'xxx', // 图片URL
      href: '/', // 图片锚点，可以不设置
      target: '_blank' // 点击锚点的跳转处理（是在当前页打开还是新建窗口）
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>{
  <span class="hljs-attribute">initIndex</span>: <span class="hljs-number">1</span>, <span class="hljs-comment">// 初始化展示的索引</span>
  <span class="hljs-attribute">autoplay</span>: { <span class="hljs-comment">// 自动轮播设置</span>
    <span class="hljs-attribute">use</span>: true, <span class="hljs-comment">// 开关</span>
    <span class="hljs-attribute">delay</span>: <span class="hljs-number">3000</span> <span class="hljs-comment">// 间隔3s</span>
  },
  <span class="hljs-attribute">slide</span>: { <span class="hljs-comment">// 手指滑动设置</span>
    <span class="hljs-attribute">use</span>: true, <span class="hljs-comment">// 开关</span>
    <span class="hljs-attribute">scale</span>: <span class="hljs-number">1</span>/<span class="hljs-number">3</span>, <span class="hljs-comment">// 划过总共宽度的1/3则翻页</span>
    <span class="hljs-attribute">speed</span>: <span class="hljs-number">0.2</span> <span class="hljs-comment">// 滑动的速度超过0.2px/ms则翻页，即快速滑动也可以翻页</span>
  },
  <span class="hljs-attribute">indicator</span>: { <span class="hljs-comment">// 索引指示器设置</span>
    <span class="hljs-attribute">use</span>: true, <span class="hljs-comment">// 开关</span>
    <span class="hljs-attribute">bottom</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 底部的距离</span>
    <span class="hljs-attribute">dotClass</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 自定义圆点样式</span>
    <span class="hljs-attribute">dotActiveClass</span>: <span class="hljs-string">''</span> <span class="hljs-comment">// 自定义激活样式</span>
  },
  <span class="hljs-attribute">datas</span>: [ <span class="hljs-comment">// 图片数据</span>
    {
      <span class="hljs-attribute">src</span>: <span class="hljs-string">'xxx'</span>, <span class="hljs-comment">// 图片URL</span>
      <span class="hljs-attribute">href</span>: <span class="hljs-string">'/'</span>, <span class="hljs-comment">// 图片锚点，可以不设置</span>
      <span class="hljs-attribute">target</span>: <span class="hljs-string">'_blank'</span> <span class="hljs-comment">// 点击锚点的跳转处理（是在当前页打开还是新建窗口）</span>
    }
  ]
}</code></pre>
<h2 id="articleHeader6">示例</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import swiper from '@c/swiper'

import img1 from './images/1.jpg'
import img2 from './images/2.jpg'
import img3 from './images/3.jpg'
import img4 from './images/4.jpg'
import img5 from './images/5.jpg'
import img6 from './images/6.jpg'

const rootNode = document.getElementById('root')

swiper(rootNode, {
  // initIndex: 1,
  // autoplay: {
  //   use: true,
  //   delay: 3000
  // },
  // slide: {
  //   use: true,
  //   scale: 1/3,
  //   speed: 0.2
  // },
  // indicator: {
  //   use: true,
  //   bottom: '',
  //   dotClass: '',
  //   dotActiveClass: ''
  // },
  datas: [
    {
      src: img1,
      href: '/',
      target: '_blank'
    },
    {
      src: img2,
      href: '/',
      target: '_blank'
    },
    {
      src: img3,
      href: '/',
      target: '_blank'
    },
    {
      src: img4,
      href: '/',
      target: '_blank'
    },
    {
      src: img5,
      href: '/',
      target: '_blank'
    },
    {
      src: img6,
      href: '/',
      target: '_blank'
    }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> swiper <span class="hljs-keyword">from</span> <span class="hljs-string">'@c/swiper'</span>

<span class="hljs-keyword">import</span> img1 <span class="hljs-keyword">from</span> <span class="hljs-string">'./images/1.jpg'</span>
<span class="hljs-keyword">import</span> img2 <span class="hljs-keyword">from</span> <span class="hljs-string">'./images/2.jpg'</span>
<span class="hljs-keyword">import</span> img3 <span class="hljs-keyword">from</span> <span class="hljs-string">'./images/3.jpg'</span>
<span class="hljs-keyword">import</span> img4 <span class="hljs-keyword">from</span> <span class="hljs-string">'./images/4.jpg'</span>
<span class="hljs-keyword">import</span> img5 <span class="hljs-keyword">from</span> <span class="hljs-string">'./images/5.jpg'</span>
<span class="hljs-keyword">import</span> img6 <span class="hljs-keyword">from</span> <span class="hljs-string">'./images/6.jpg'</span>

<span class="hljs-keyword">const</span> rootNode = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>)

swiper(rootNode, {
  <span class="hljs-comment">// initIndex: 1,</span>
  <span class="hljs-comment">// autoplay: {</span>
  <span class="hljs-comment">//   use: true,</span>
  <span class="hljs-comment">//   delay: 3000</span>
  <span class="hljs-comment">// },</span>
  <span class="hljs-comment">// slide: {</span>
  <span class="hljs-comment">//   use: true,</span>
  <span class="hljs-comment">//   scale: 1/3,</span>
  <span class="hljs-comment">//   speed: 0.2</span>
  <span class="hljs-comment">// },</span>
  <span class="hljs-comment">// indicator: {</span>
  <span class="hljs-comment">//   use: true,</span>
  <span class="hljs-comment">//   bottom: '',</span>
  <span class="hljs-comment">//   dotClass: '',</span>
  <span class="hljs-comment">//   dotActiveClass: ''</span>
  <span class="hljs-comment">// },</span>
  datas: [
    {
      <span class="hljs-attr">src</span>: img1,
      <span class="hljs-attr">href</span>: <span class="hljs-string">'/'</span>,
      <span class="hljs-attr">target</span>: <span class="hljs-string">'_blank'</span>
    },
    {
      <span class="hljs-attr">src</span>: img2,
      <span class="hljs-attr">href</span>: <span class="hljs-string">'/'</span>,
      <span class="hljs-attr">target</span>: <span class="hljs-string">'_blank'</span>
    },
    {
      <span class="hljs-attr">src</span>: img3,
      <span class="hljs-attr">href</span>: <span class="hljs-string">'/'</span>,
      <span class="hljs-attr">target</span>: <span class="hljs-string">'_blank'</span>
    },
    {
      <span class="hljs-attr">src</span>: img4,
      <span class="hljs-attr">href</span>: <span class="hljs-string">'/'</span>,
      <span class="hljs-attr">target</span>: <span class="hljs-string">'_blank'</span>
    },
    {
      <span class="hljs-attr">src</span>: img5,
      <span class="hljs-attr">href</span>: <span class="hljs-string">'/'</span>,
      <span class="hljs-attr">target</span>: <span class="hljs-string">'_blank'</span>
    },
    {
      <span class="hljs-attr">src</span>: img6,
      <span class="hljs-attr">href</span>: <span class="hljs-string">'/'</span>,
      <span class="hljs-attr">target</span>: <span class="hljs-string">'_blank'</span>
    }
  ]
})</code></pre>
<h2 id="articleHeader7">使用心得</h2>
<p>总体来说使用<code>qnode</code>来开发的话还是比较方便的，文件拆分以及数据共享都可以做到，唯一有一点瑕疵的话，就是对于js执行的顺序要慎重考虑。想一想为什么render文件暴露出来的是函数，原因就是因为此时数据还未储存到<code>qnode</code>，因此通过函数来进行惰性加载，在合适的地方执行。</p>
<p>对于<code>qnode</code>，目前还没有错误提醒，调用方式不对的话没有信息吐出，后续可以考虑补上这个功能，毕竟其他开发者用的话，可能并不熟悉API，调用姿势不对也是有可能发生的。</p>
<p>以上就是本文的全部内容了。</p>
<p>附：</p>
<ul>
<li><a href="https://ansenhuang.github.io/demo/swiper/index.html" rel="nofollow noreferrer" target="_blank">无限循环轮播图示例</a></li>
<li><a href="https://github.com/ansenhuang/proto-modules/tree/master/src/components/swiper" rel="nofollow noreferrer" target="_blank">本文源码</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
原生js系列之无限循环轮播组件

## 原文链接
[https://segmentfault.com/a/1190000012432451](https://segmentfault.com/a/1190000012432451)

