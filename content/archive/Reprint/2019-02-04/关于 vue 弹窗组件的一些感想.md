---
title: '关于 vue 弹窗组件的一些感想' 
date: 2019-02-04 2:30:58
hidden: true
slug: 8h6t08q672
categories: [reprint]
---

{{< raw >}}

                    
<p>最近是用 vue 开发了一套组件库 <a href="https://myronliu347.github.io/vue-carbon/" rel="nofollow noreferrer" target="_blank">vue-carbon</a> , 在开发过程对对于组件化的开发有一些感想，于是开始记录下这些。</p>
<p>弹窗组件一直是 web 开发中必备的，使用频率相当高，最常见的莫过于 alert，confirm，prompt .. 这些（曾经我们都会用alert来调试程序）, 不同的组件库对于弹窗的处理也是不一样的。在开发时需要考虑一下三点:</p>
<blockquote><ol>
<li><p>进入和弹出的动画效果。</p></li>
<li><p>z-index 的控制</p></li>
<li><p>overlay 遮盖层</p></li>
</ol></blockquote>
<h2 id="articleHeader0">关于动画</h2>
<p>vue 对于动画的处理相对简单，给组件加入css transition 动画即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
<div class=&quot;modal&quot; transition=&quot;modal-scale&quot;>
    <!--省略其它内容-->
</div>
</template>
<script>
// ...
</script>
<style>
.modal-scale-transition{
  transition: transform,opacity .3s ease;
}

.modal-scale-enter,
.modal-scale-leave {
    opacity: 0;
}

.modal-scale-enter {
  transform: scale(1.1);
}
.modal-scale-leave {
  transform: scale(0.8);
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal"</span> <span class="hljs-attr">transition</span>=<span class="hljs-string">"modal-scale"</span>&gt;</span>
    <span class="hljs-comment">&lt;!--省略其它内容--&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
<span class="hljs-comment">// ...</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.modal-scale-transition</span>{
  <span class="hljs-attribute">transition</span>: transform,opacity .<span class="hljs-number">3s</span> ease;
}

<span class="hljs-selector-class">.modal-scale-enter</span>,
<span class="hljs-selector-class">.modal-scale-leave</span> {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.modal-scale-enter</span> {
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1.1);
}
<span class="hljs-selector-class">.modal-scale-leave</span> {
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(0.8);
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>外部可以由使用者自行控制，使用 v-if 或是 v-show 控制显示</p>
<h2 id="articleHeader1">z-index 的控制</h2>
<p>关于z-index的控制，需要完成以下几点</p>
<blockquote><ol>
<li><p>保证弹出框的 z-index 足够高能使 其再最外层</p></li>
<li><p>后弹出的弹出框的 z-index 要比之前弹出的要高</p></li>
</ol></blockquote>
<p>要满足以上两点， 我们需要以下代码实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const zIndex = 20141223  // 先预设较高值

const getZIndex = function () {
    return zIndex++ // 每次获取之后 zindex 自动增加
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> zIndex = <span class="hljs-number">20141223</span>  <span class="hljs-comment">// 先预设较高值</span>

<span class="hljs-keyword">const</span> getZIndex = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> zIndex++ <span class="hljs-comment">// 每次获取之后 zindex 自动增加</span>
}</code></pre>
<p>然后绑定把 z-index 在组件上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
<div class=&quot;modal&quot; :style=&quot;{'z-index': zIndex}&quot; transition=&quot;modal-scale&quot;>
    <!--省略其它内容-->
</div>
</template>
<script>
export default {
    data () {
        return {
            zIndex: getZIndex()
        }
    }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"{'z-index': zIndex}"</span> <span class="hljs-attr">transition</span>=<span class="hljs-string">"modal-scale"</span>&gt;</span>
    <span class="hljs-comment">&lt;!--省略其它内容--&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data () {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">zIndex</span>: getZIndex()
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader2">overlay 遮盖层的控制</h2>
<p>遮盖层是弹窗组件中最难处理的部分, 一个完美的遮盖层的控制需要完成以下几点:</p>
<blockquote><ol>
<li><p>遮盖层和弹出层之间的动画需要并行</p></li>
<li><p>遮盖层的 z-index 要较小与弹出层</p></li>
<li><p>遮盖层的弹出时需要组件页面滚动</p></li>
<li><p>点击遮盖层需要给予弹出层反馈</p></li>
<li><p>保证整个页面最多只能有一个遮盖层（多个叠在一起会使遮盖层颜色加深）</p></li>
</ol></blockquote>
<p>为了处理这些问题，也保证所有的弹出框组件不用每一个都解决，所以决定利用 <code>vue</code> 的 mixins 机制，将这些弹出层的公共逻辑封装层一个 <code>mixin</code> ，每个弹出框组件直接引用就好。</p>
<h2 id="articleHeader3">vue-popup-mixin</h2>
<p>明确了上述所有的问题，开始开发 <code>mixin</code>, 首先需要一个 overlay (遮盖层组件) ;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;overlay&quot; @click=&quot;handlerClick&quot; @touchmove=&quot;prevent&quot; :style=&quot;style&quot; transition=&quot;overlay-fade&quot;></div>
</template>
<script>
export default {
  props: {
    onClick: {
      type: Function
    },
    opacity: {
      type: Number,
      default: 0.4
    },
    color: {
      type: String,
      default: '#000'
    }
  },
  computed: {
    style () {
      return {
        'opacity': this.opacity,
        'background-color': this.color
      }
    }
  },
  methods: {
    prevent (event) {
      event.preventDefault()
      event.stopPropagation()
    },
    handlerClick () {
      if (this.onClick) {
        this.onClick()
      }
    }
  }
}
</script>
<style lang=&quot;less&quot;>
.overlay {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #000;
  opacity: .4;
  z-index: 1000;
}


.overlay-fade-transition {
  transition: all .3s linear;
  &amp;.overlay-fade-enter,
  &amp;.overlay-fade-leave {
    opacity: 0 !important;
  }
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"overlay"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"handlerClick"</span> @<span class="hljs-attr">touchmove</span>=<span class="hljs-string">"prevent"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"style"</span> <span class="hljs-attr">transition</span>=<span class="hljs-string">"overlay-fade"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">props</span>: {
    <span class="hljs-attr">onClick</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Function</span>
    },
    <span class="hljs-attr">opacity</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-number">0.4</span>
    },
    <span class="hljs-attr">color</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-string">'#000'</span>
    }
  },
  <span class="hljs-attr">computed</span>: {
    style () {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-string">'opacity'</span>: <span class="hljs-keyword">this</span>.opacity,
        <span class="hljs-string">'background-color'</span>: <span class="hljs-keyword">this</span>.color
      }
    }
  },
  <span class="hljs-attr">methods</span>: {
    prevent (event) {
      event.preventDefault()
      event.stopPropagation()
    },
    handlerClick () {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.onClick) {
        <span class="hljs-keyword">this</span>.onClick()
      }
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"less"</span>&gt;</span><span class="undefined">
.overlay {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #000;
  opacity: .4;
  z-index: 1000;
}


.overlay-fade-transition {
  transition: all .3s linear;
  &amp;.overlay-fade-enter,
  &amp;.overlay-fade-leave {
    opacity: 0 !important;
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>然后 需要一个 js 来管理 overlay 的显示和隐藏。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import overlayOpt from '../overlay'  // 引入 overlay 组件
const Overlay = Vue.extend(overlayOpt)

const getDOM = function (dom) {
  if (dom.nodeType === 3) {
    dom = dom.nextElementSibling || dom.nextSibling
    getDOM(dom)
  }
  return dom
}

// z-index 控制
const zIndex = 20141223  

const getZIndex = function () {
    return zIndex++ 
}
// 管理
const PopupManager = {
  instances: [],  // 用来储存所有的弹出层实例
  overlay: false,
  // 弹窗框打开时 调用此方法
  open (instance) {
    if (!instance || this.instances.indexOf(instance) !== -1) return
    
    // 当没有遮盖层时，显示遮盖层
    if (this.instances.length === 0) {
      this.showOverlay(instance.overlayColor, instance.overlayOpacity)
    }
    this.instances.push(instance) // 储存打开的弹出框组件
    this.changeOverlayStyle() // 控制不同弹出层 透明度和颜色
    
    // 给弹出层加上z-index
    const dom = getDOM(instance.$el)
    dom.style.zIndex = getZIndex()
  },
  // 弹出框关闭方法
  close (instance) {
    let index = this.instances.indexOf(instance)
    if (index === -1) return
    
    Vue.nextTick(() => {
      this.instances.splice(index, 1)
      
      // 当页面上没有弹出层了就关闭遮盖层
      if (this.instances.length === 0) {
        this.closeOverlay()
      }
      this.changeOverlayStyle()
    })
  },
  showOverlay (color, opacity) {
    let overlay = this.overlay = new Overlay({
      el: document.createElement('div')
    })
    const dom = getDOM(overlay.$el)
    dom.style.zIndex = getZIndex()
    overlay.color = color
    overlay.opacity = opacity
    overlay.onClick = this.handlerOverlayClick.bind(this)
    overlay.$appendTo(document.body)

    // 禁止页面滚动
    this.bodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  },
  closeOverlay () {
    if (!this.overlay) return
    document.body.style.overflow = this.bodyOverflow
    let overlay = this.overlay
    this.overlay = null
    overlay.$remove(() => {
      overlay.$destroy()
    })
  },
  changeOverlayStyle () {
    if (!this.overlay || this.instances.length === 0) return
    const instance = this.instances[this.instances.length - 1]
    this.overlay.color = instance.overlayColor
    this.overlay.opacity = instance.overlayOpacity
  },
  // 遮盖层点击处理，会自动调用 弹出层的 overlayClick 方法
  handlerOverlayClick () {
    if (this.instances.length === 0) return
    const instance = this.instances[this.instances.length - 1]
    if (instance.overlayClick) {
      instance.overlayClick()
    }
  }
}

window.addEventListener('keydown', function (event) {
  if (event.keyCode === 27) { // ESC
    if (PopupManager.instances.length > 0) {
      const topInstance = PopupManager.instances[PopupManager.instances.length - 1]
      if (!topInstance) return
      if (topInstance.escPress) {
        topInstance.escPress()
      }
    }
  }
})

export default PopupManager" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> overlayOpt <span class="hljs-keyword">from</span> <span class="hljs-string">'../overlay'</span>  <span class="hljs-comment">// 引入 overlay 组件</span>
<span class="hljs-keyword">const</span> Overlay = Vue.extend(overlayOpt)

<span class="hljs-keyword">const</span> getDOM = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">dom</span>) </span>{
  <span class="hljs-keyword">if</span> (dom.nodeType === <span class="hljs-number">3</span>) {
    dom = dom.nextElementSibling || dom.nextSibling
    getDOM(dom)
  }
  <span class="hljs-keyword">return</span> dom
}

<span class="hljs-comment">// z-index 控制</span>
<span class="hljs-keyword">const</span> zIndex = <span class="hljs-number">20141223</span>  

<span class="hljs-keyword">const</span> getZIndex = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> zIndex++ 
}
<span class="hljs-comment">// 管理</span>
<span class="hljs-keyword">const</span> PopupManager = {
  <span class="hljs-attr">instances</span>: [],  <span class="hljs-comment">// 用来储存所有的弹出层实例</span>
  overlay: <span class="hljs-literal">false</span>,
  <span class="hljs-comment">// 弹窗框打开时 调用此方法</span>
  open (instance) {
    <span class="hljs-keyword">if</span> (!instance || <span class="hljs-keyword">this</span>.instances.indexOf(instance) !== <span class="hljs-number">-1</span>) <span class="hljs-keyword">return</span>
    
    <span class="hljs-comment">// 当没有遮盖层时，显示遮盖层</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.instances.length === <span class="hljs-number">0</span>) {
      <span class="hljs-keyword">this</span>.showOverlay(instance.overlayColor, instance.overlayOpacity)
    }
    <span class="hljs-keyword">this</span>.instances.push(instance) <span class="hljs-comment">// 储存打开的弹出框组件</span>
    <span class="hljs-keyword">this</span>.changeOverlayStyle() <span class="hljs-comment">// 控制不同弹出层 透明度和颜色</span>
    
    <span class="hljs-comment">// 给弹出层加上z-index</span>
    <span class="hljs-keyword">const</span> dom = getDOM(instance.$el)
    dom.style.zIndex = getZIndex()
  },
  <span class="hljs-comment">// 弹出框关闭方法</span>
  close (instance) {
    <span class="hljs-keyword">let</span> index = <span class="hljs-keyword">this</span>.instances.indexOf(instance)
    <span class="hljs-keyword">if</span> (index === <span class="hljs-number">-1</span>) <span class="hljs-keyword">return</span>
    
    Vue.nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>.instances.splice(index, <span class="hljs-number">1</span>)
      
      <span class="hljs-comment">// 当页面上没有弹出层了就关闭遮盖层</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.instances.length === <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">this</span>.closeOverlay()
      }
      <span class="hljs-keyword">this</span>.changeOverlayStyle()
    })
  },
  showOverlay (color, opacity) {
    <span class="hljs-keyword">let</span> overlay = <span class="hljs-keyword">this</span>.overlay = <span class="hljs-keyword">new</span> Overlay({
      <span class="hljs-attr">el</span>: <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>)
    })
    <span class="hljs-keyword">const</span> dom = getDOM(overlay.$el)
    dom.style.zIndex = getZIndex()
    overlay.color = color
    overlay.opacity = opacity
    overlay.onClick = <span class="hljs-keyword">this</span>.handlerOverlayClick.bind(<span class="hljs-keyword">this</span>)
    overlay.$appendTo(<span class="hljs-built_in">document</span>.body)

    <span class="hljs-comment">// 禁止页面滚动</span>
    <span class="hljs-keyword">this</span>.bodyOverflow = <span class="hljs-built_in">document</span>.body.style.overflow
    <span class="hljs-built_in">document</span>.body.style.overflow = <span class="hljs-string">'hidden'</span>
  },
  closeOverlay () {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.overlay) <span class="hljs-keyword">return</span>
    <span class="hljs-built_in">document</span>.body.style.overflow = <span class="hljs-keyword">this</span>.bodyOverflow
    <span class="hljs-keyword">let</span> overlay = <span class="hljs-keyword">this</span>.overlay
    <span class="hljs-keyword">this</span>.overlay = <span class="hljs-literal">null</span>
    overlay.$remove(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      overlay.$destroy()
    })
  },
  changeOverlayStyle () {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.overlay || <span class="hljs-keyword">this</span>.instances.length === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span>
    <span class="hljs-keyword">const</span> instance = <span class="hljs-keyword">this</span>.instances[<span class="hljs-keyword">this</span>.instances.length - <span class="hljs-number">1</span>]
    <span class="hljs-keyword">this</span>.overlay.color = instance.overlayColor
    <span class="hljs-keyword">this</span>.overlay.opacity = instance.overlayOpacity
  },
  <span class="hljs-comment">// 遮盖层点击处理，会自动调用 弹出层的 overlayClick 方法</span>
  handlerOverlayClick () {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.instances.length === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span>
    <span class="hljs-keyword">const</span> instance = <span class="hljs-keyword">this</span>.instances[<span class="hljs-keyword">this</span>.instances.length - <span class="hljs-number">1</span>]
    <span class="hljs-keyword">if</span> (instance.overlayClick) {
      instance.overlayClick()
    }
  }
}

<span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'keydown'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
  <span class="hljs-keyword">if</span> (event.keyCode === <span class="hljs-number">27</span>) { <span class="hljs-comment">// ESC</span>
    <span class="hljs-keyword">if</span> (PopupManager.instances.length &gt; <span class="hljs-number">0</span>) {
      <span class="hljs-keyword">const</span> topInstance = PopupManager.instances[PopupManager.instances.length - <span class="hljs-number">1</span>]
      <span class="hljs-keyword">if</span> (!topInstance) <span class="hljs-keyword">return</span>
      <span class="hljs-keyword">if</span> (topInstance.escPress) {
        topInstance.escPress()
      }
    }
  }
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> PopupManager</code></pre>
<p>最后再封装成一个 mixin</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import PopupManager from './popup-manager'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    // 是否显示遮盖层
    overlay: {
      type: Boolean,
      default: true
    },
    overlayOpacity: {
      type: Number,
      default: 0.4
    },
    overlayColor: {
      type: String,
      default: '#000'
    }
  },
  // 组件被挂载时会判断show的值开控制打开
  attached () {
    if (this.show &amp;&amp; this.overlay) {
      PopupManager.open(this)
    }
  },
  // 组件被移除时关闭
  detached () {
    PopupManager.close(this)
  },
  watch: {
    show (val) {
      // 修改 show 值是调用对于的打开关闭方法
      if (val &amp;&amp; this.overlay) {
        PopupManager.open(this)
      } else {
        PopupManager.close(this)
      }
    }
  },
  beforeDestroy () {
    PopupManager.close(this)
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> PopupManager <span class="hljs-keyword">from</span> <span class="hljs-string">'./popup-manager'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">props</span>: {
    <span class="hljs-attr">show</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Boolean</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-literal">false</span>
    },
    <span class="hljs-comment">// 是否显示遮盖层</span>
    overlay: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Boolean</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-attr">overlayOpacity</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-number">0.4</span>
    },
    <span class="hljs-attr">overlayColor</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-string">'#000'</span>
    }
  },
  <span class="hljs-comment">// 组件被挂载时会判断show的值开控制打开</span>
  attached () {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.show &amp;&amp; <span class="hljs-keyword">this</span>.overlay) {
      PopupManager.open(<span class="hljs-keyword">this</span>)
    }
  },
  <span class="hljs-comment">// 组件被移除时关闭</span>
  detached () {
    PopupManager.close(<span class="hljs-keyword">this</span>)
  },
  <span class="hljs-attr">watch</span>: {
    show (val) {
      <span class="hljs-comment">// 修改 show 值是调用对于的打开关闭方法</span>
      <span class="hljs-keyword">if</span> (val &amp;&amp; <span class="hljs-keyword">this</span>.overlay) {
        PopupManager.open(<span class="hljs-keyword">this</span>)
      } <span class="hljs-keyword">else</span> {
        PopupManager.close(<span class="hljs-keyword">this</span>)
      }
    }
  },
  beforeDestroy () {
    PopupManager.close(<span class="hljs-keyword">this</span>)
  }
}
</code></pre>
<h2 id="articleHeader4">使用</h2>
<p>以上所有的代码就完成了所有弹出层的共有逻辑， 使用时只需要当做一个mixin来加载即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;dialog&quot;
    v-show=&quot;show&quot;
    transition=&quot;dialog-fade&quot;>
    <div class=&quot;dialog-content&quot;>
      <slot></slot>
    </div>
  </div>
</template>

<style>
  .dialog {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    width: 90%;
  }

  .dialog-content {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
  }

  .dialog-fade-transition {
    transition: opacity .3s linear;
  }

  .dialog-fade-enter,
  .dialog-fade-leave {
    opacity: 0;
  }
</style>

<script>
import Popup from '../src'

export default {
  mixins: [Popup],
  methods: {
    // 响应 overlay事件
    overlayClick () {
      this.show = false
    },
    // 响应 esc 按键事件
    escPress () {
      this.show = false
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"dialog"</span>
    <span class="hljs-attr">v-show</span>=<span class="hljs-string">"show"</span>
    <span class="hljs-attr">transition</span>=<span class="hljs-string">"dialog-fade"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"dialog-content"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.dialog</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, -50%);
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">90%</span>;
  }

  <span class="hljs-selector-class">.dialog-content</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">8px</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">text-align</span>: center;
  }

  <span class="hljs-selector-class">.dialog-fade-transition</span> {
    <span class="hljs-attribute">transition</span>: opacity .<span class="hljs-number">3s</span> linear;
  }

  <span class="hljs-selector-class">.dialog-fade-enter</span>,
  <span class="hljs-selector-class">.dialog-fade-leave</span> {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Popup <span class="hljs-keyword">from</span> <span class="hljs-string">'../src'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">mixins</span>: [Popup],
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-comment">// 响应 overlay事件</span>
    overlayClick () {
      <span class="hljs-keyword">this</span>.show = <span class="hljs-literal">false</span>
    },
    <span class="hljs-comment">// 响应 esc 按键事件</span>
    escPress () {
      <span class="hljs-keyword">this</span>.show = <span class="hljs-literal">false</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>项目地址 <a href="https://github.com/myronliu347/vue-popup-mixin" rel="nofollow noreferrer" target="_blank">vue-popup-mixin</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于 vue 弹窗组件的一些感想

## 原文链接
[https://segmentfault.com/a/1190000006849814](https://segmentfault.com/a/1190000006849814)

