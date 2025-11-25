---
title: 'vue 开发波纹点击特效组件' 
date: 2019-02-03 2:30:40
hidden: true
slug: pu5aus7pma
categories: [reprint]
---

{{< raw >}}

                    
<p>最近在使用 vue2 做一个新的 material ui 库，波纹点击效果在 material design 中被多次使用到，于是决定把它封装成一个公共的组件，使用时直接调用就好啦。</p>
<h2 id="articleHeader0">开发之前的思考</h2>
<p>常见的波纹点击效果的实现方式是监听元素的 mousedown 事件，在元素内部创建一个 <strong>波纹元素</strong> ，并调整元素的 <code>transform: scale(0);</code> 到 <code>transform: scale(1);</code>, 通过计算点击的位置来设置 <strong>波纹元素</strong> 的大小和位置，以达到波纹扩散的效果。</p>
<p>我将组件分为两个部分， <code>circleRipple.vue</code> 和 <code>TouchRipple.vue</code> 各自实现不同的功能</p>
<ol>
<li><p><code>circleRipple.vue</code> 波纹扩散组件，完成波纹扩散的效果</p></li>
<li><p><code>TouchRipple.vue</code> 监听 <code>mouse</code> 和 <code>touch</code> 相关事件，控制  <code>circleRipple</code> 的显示，位置。</p></li>
</ol>
<h2 id="articleHeader1">circleRipple.vue</h2>
<p><code>circleRipple</code> 需要完成波纹扩展的效果，而且可以从外部控制它的大小和位置, 所以利用 <code>vue</code> 的 <code>transition</code> 动画完成效果, 提供 <code>mergeStyle</code> 、 <code>color</code> 、<code>opacity</code> 参数来从外部控制它的样式。实现代码如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <transition name=&quot;mu-ripple&quot;>
    <div class=&quot;mu-circle-ripple&quot; :style=&quot;styles&quot;></div>
  </transition>
</template>

<script>
import {merge} from '../utils'
export default {
  props: {
    mergeStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    color: {
      type: String,
      default: ''
    },
    opacity: {
      type: Number
    }
  },
  computed: {
    styles () {
      return merge({}, {color: this.color, opacity: this.opacity}, this.mergeStyle)
    }
  }
}
</script>

<style lang=&quot;less&quot;>
@import &quot;../styles/import.less&quot;;
.mu-circle-ripple{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  pointer-events: none;
  user-select: none;
  border-radius: 50%;
  background-color: currentColor;
  background-clip: padding-box;
  opacity: 0.1;
}

.mu-ripple-enter-active, .mu-ripple-leave-active{
  transition: transform 1s @easeOutFunction, opacity 2s @easeOutFunction;
}

.mu-ripple-enter {
  transform: scale(0);
}

.mu-ripple-leave-active{
  opacity: 0 !important;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"mu-ripple"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mu-circle-ripple"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"styles"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> {merge} <span class="hljs-keyword">from</span> <span class="hljs-string">'../utils'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">props</span>: {
    <span class="hljs-attr">mergeStyle</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Object</span>,
      <span class="hljs-keyword">default</span> () {
        <span class="hljs-keyword">return</span> {}
      }
    },
    <span class="hljs-attr">color</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-string">''</span>
    },
    <span class="hljs-attr">opacity</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>
    }
  },
  <span class="hljs-attr">computed</span>: {
    styles () {
      <span class="hljs-keyword">return</span> merge({}, {<span class="hljs-attr">color</span>: <span class="hljs-keyword">this</span>.color, <span class="hljs-attr">opacity</span>: <span class="hljs-keyword">this</span>.opacity}, <span class="hljs-keyword">this</span>.mergeStyle)
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"less"</span>&gt;</span><span class="css">
@<span class="hljs-keyword">import</span> <span class="hljs-string">"../styles/import.less"</span>;
<span class="hljs-selector-class">.mu-circle-ripple</span>{
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">pointer-events</span>: none;
  <span class="hljs-attribute">user-select</span>: none;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">background-color</span>: currentColor;
  <span class="hljs-attribute">background-clip</span>: padding-box;
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.1</span>;
}

<span class="hljs-selector-class">.mu-ripple-enter-active</span>, <span class="hljs-selector-class">.mu-ripple-leave-active</span>{
  <span class="hljs-attribute">transition</span>: transform <span class="hljs-number">1s</span> @easeOutFunction, opacity <span class="hljs-number">2s</span> @easeOutFunction;
}

<span class="hljs-selector-class">.mu-ripple-enter</span> {
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(0);
}

<span class="hljs-selector-class">.mu-ripple-leave-active</span>{
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span> <span class="hljs-meta">!important</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<blockquote><p>vue2 对于动画方面做了比较大的修改，除了把指令换成组件外，它还可以完成更复杂的动画效果，具体可以看这里 <a href="http://rc.vuejs.org/guide/transitions.html" rel="nofollow noreferrer" target="_blank">vue2 transition</a></p></blockquote>
<h2 id="articleHeader2">TouchRipple.vue</h2>
<p><code>TouchRipple</code> 需要控制 <code>circleRipple</code> 的显示。完成以下内容：</p>
<ol>
<li><p>监听 <code>mouse</code> 和 <code>touch</code> 相关事件， 控制 <code>circleRipple</code> 的显示。</p></li>
<li><p>通过点击事件 event 对象， 计算出 <code>circleRipple</code> 的大小和位置</p></li>
<li><p>如果频繁点击可能出现多个 <code>circleRipple</code></p></li>
</ol>
<h3 id="articleHeader3">首先，基本模板 + 数据模型</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <!--最外层用div包裹-->
  <div @mousedown=&quot;handleMouseDown&quot; @mouseup=&quot;end()&quot; @mouseleave=&quot;end()&quot; @touchstart=&quot;handleTouchStart&quot;  @touchend=&quot;end()&quot; @touchcancel=&quot;end()&quot;>
    <!--外层包裹防止波纹溢出-->
    <div :style=&quot;style&quot; ref=&quot;holder&quot;>
      <!--多个波纹用 v-for 控制-->
      <circle-ripple :key=&quot;ripple.key&quot; :color=&quot;ripple.color&quot; :opacity=&quot;ripple.opacity&quot; :merge-style=&quot;ripple.style&quot; v-for=&quot;ripple in ripples&quot;></circle-ripple>
    </div>
    <!--利用slot分发实际内容-->
    <slot></slot>
  </div>
</template>

<script>
import circleRipple from './circleRipple'
export default {
  props: {
    // 是否从中间扩散，设为false会从点击处扩散
    centerRipple: {
      type: Boolean,
      default: true
    },
    // 外层包裹的样式
    style: {
      type: Object,
      default () {
        return {
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: '0',
          left: '0',
          overflow: 'hidden'
        }
      }
    },
    // 波纹颜色
    color: {
      type: String,
      default: ''
    },
    // 波纹透明度
    opacity: {
      type: Number
    }
  },
  data () {
    return {
      nextKey: 0, // 记录下一个波纹元素的key值， 相当于uuid，不设置的话会使动画失效
      ripples: [] // 波纹元素参数数组
    }
  },
  mounted () {
    this.ignoreNextMouseDown = false // 防止既有 touch 又有 mouse点击的情况
  },
  methods: {
    start (event, isRippleTouchGenerated) {
      // 开始波纹效果
    },
    end () {
      // 结束波纹效果
    },
    handleMouseDown (event) {
      // 监听 鼠标单击
    },
    handleTouchStart (event) {
      // 监听 touchstart 方法
    }
  },
  components: {
    'circle-ripple': circleRipple
  }
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-comment">&lt;!--最外层用div包裹--&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> @<span class="hljs-attr">mousedown</span>=<span class="hljs-string">"handleMouseDown"</span> @<span class="hljs-attr">mouseup</span>=<span class="hljs-string">"end()"</span> @<span class="hljs-attr">mouseleave</span>=<span class="hljs-string">"end()"</span> @<span class="hljs-attr">touchstart</span>=<span class="hljs-string">"handleTouchStart"</span>  @<span class="hljs-attr">touchend</span>=<span class="hljs-string">"end()"</span> @<span class="hljs-attr">touchcancel</span>=<span class="hljs-string">"end()"</span>&gt;</span>
    <span class="hljs-comment">&lt;!--外层包裹防止波纹溢出--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"style"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"holder"</span>&gt;</span>
      <span class="hljs-comment">&lt;!--多个波纹用 v-for 控制--&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">circle-ripple</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"ripple.key"</span> <span class="hljs-attr">:color</span>=<span class="hljs-string">"ripple.color"</span> <span class="hljs-attr">:opacity</span>=<span class="hljs-string">"ripple.opacity"</span> <span class="hljs-attr">:merge-style</span>=<span class="hljs-string">"ripple.style"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"ripple in ripples"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">circle-ripple</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!--利用slot分发实际内容--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> circleRipple <span class="hljs-keyword">from</span> <span class="hljs-string">'./circleRipple'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">props</span>: {
    <span class="hljs-comment">// 是否从中间扩散，设为false会从点击处扩散</span>
    centerRipple: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Boolean</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-comment">// 外层包裹的样式</span>
    style: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Object</span>,
      <span class="hljs-keyword">default</span> () {
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">height</span>: <span class="hljs-string">'100%'</span>,
          <span class="hljs-attr">width</span>: <span class="hljs-string">'100%'</span>,
          <span class="hljs-attr">position</span>: <span class="hljs-string">'absolute'</span>,
          <span class="hljs-attr">top</span>: <span class="hljs-string">'0'</span>,
          <span class="hljs-attr">left</span>: <span class="hljs-string">'0'</span>,
          <span class="hljs-attr">overflow</span>: <span class="hljs-string">'hidden'</span>
        }
      }
    },
    <span class="hljs-comment">// 波纹颜色</span>
    color: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-string">''</span>
    },
    <span class="hljs-comment">// 波纹透明度</span>
    opacity: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>
    }
  },
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">nextKey</span>: <span class="hljs-number">0</span>, <span class="hljs-comment">// 记录下一个波纹元素的key值， 相当于uuid，不设置的话会使动画失效</span>
      ripples: [] <span class="hljs-comment">// 波纹元素参数数组</span>
    }
  },
  mounted () {
    <span class="hljs-keyword">this</span>.ignoreNextMouseDown = <span class="hljs-literal">false</span> <span class="hljs-comment">// 防止既有 touch 又有 mouse点击的情况</span>
  },
  <span class="hljs-attr">methods</span>: {
    start (event, isRippleTouchGenerated) {
      <span class="hljs-comment">// 开始波纹效果</span>
    },
    end () {
      <span class="hljs-comment">// 结束波纹效果</span>
    },
    handleMouseDown (event) {
      <span class="hljs-comment">// 监听 鼠标单击</span>
    },
    handleTouchStart (event) {
      <span class="hljs-comment">// 监听 touchstart 方法</span>
    }
  },
  <span class="hljs-attr">components</span>: {
    <span class="hljs-string">'circle-ripple'</span>: circleRipple
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h3 id="articleHeader4">开始和结束波纹效果</h3>
<p>增加一个波纹元素只需要在 <strong>ripple</strong> 增加一个 object 即可，不同的是当需要从点击处扩展时，需要计算一下波纹元素的大小和位置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  // isRippleTouchGenerated 是否是touch 事件开始的
  start (event, isRippleTouchGenerated) {
    // 过滤 touchstart 和 mousedown 同时存在的情况
    if (this.ignoreNextMouseDown &amp;&amp; !isRippleTouchGenerated) {
      this.ignoreNextMouseDown = false
      return
    }
    
    // 添加一个 波纹元素组件
    this.ripples.push({
      key: this.nextKey++, 
      color: this.color,
      opacity: this.opacity,
      style: this.centerRipple ? {} : this.getRippleStyle(event) // 不是从中心扩展的需要计算波纹元素的位置
    })
    this.ignoreNextMouseDown = isRippleTouchGenerated
 },
 end () {
   if (this.ripples.length === 0) return
   this.ripples.splice(0, 1) // 删除一个波纹元素
   this.stopListeningForScrollAbort() // 结束 touch 滚动的处理
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-comment">// isRippleTouchGenerated 是否是touch 事件开始的</span>
  start (event, isRippleTouchGenerated) {
    <span class="hljs-comment">// 过滤 touchstart 和 mousedown 同时存在的情况</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.ignoreNextMouseDown &amp;&amp; !isRippleTouchGenerated) {
      <span class="hljs-keyword">this</span>.ignoreNextMouseDown = <span class="hljs-literal">false</span>
      <span class="hljs-keyword">return</span>
    }
    
    <span class="hljs-comment">// 添加一个 波纹元素组件</span>
    <span class="hljs-keyword">this</span>.ripples.push({
      <span class="hljs-attr">key</span>: <span class="hljs-keyword">this</span>.nextKey++, 
      <span class="hljs-attr">color</span>: <span class="hljs-keyword">this</span>.color,
      <span class="hljs-attr">opacity</span>: <span class="hljs-keyword">this</span>.opacity,
      <span class="hljs-attr">style</span>: <span class="hljs-keyword">this</span>.centerRipple ? {} : <span class="hljs-keyword">this</span>.getRippleStyle(event) <span class="hljs-comment">// 不是从中心扩展的需要计算波纹元素的位置</span>
    })
    <span class="hljs-keyword">this</span>.ignoreNextMouseDown = isRippleTouchGenerated
 },
 end () {
   <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.ripples.length === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span>
   <span class="hljs-keyword">this</span>.ripples.splice(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>) <span class="hljs-comment">// 删除一个波纹元素</span>
   <span class="hljs-keyword">this</span>.stopListeningForScrollAbort() <span class="hljs-comment">// 结束 touch 滚动的处理</span>
  }
}</code></pre>
<p>因为 vue2 基于 Virtual DOM 的， 所以如果没有 <code>key</code> 在增加一个元素又同时删除一个元素的时候，dom tree并没有发生变化，是不会产生动画效果的。</p>
<h3 id="articleHeader5">监听 mousedown 和 touchstart</h3>
<p>mousedown 和 touchstart 处理上会有所不同，但都是用来启动波纹效果的， touch涉及到多点点击的问题，我们一般取第一个即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    handleMouseDown (event) {
      // 只监听鼠标左键的点击
      if (event.button === 0) {
        this.start(event, false)
      }
    },
    handleTouchStart (event) {
      event.stopPropagation() // 防止多个波纹点击组件嵌套
      if (event.touches) {
        this.startListeningForScrollAbort(event) // 启动 touchmove 触发滚动处理
        this.startTime = Date.now()
      }
      this.start(event.touches[0], true)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    handleMouseDown (event) {
      <span class="hljs-comment">// 只监听鼠标左键的点击</span>
      <span class="hljs-keyword">if</span> (event.button === <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">this</span>.start(event, <span class="hljs-literal">false</span>)
      }
    },
    handleTouchStart (event) {
      event.stopPropagation() <span class="hljs-comment">// 防止多个波纹点击组件嵌套</span>
      <span class="hljs-keyword">if</span> (event.touches) {
        <span class="hljs-keyword">this</span>.startListeningForScrollAbort(event) <span class="hljs-comment">// 启动 touchmove 触发滚动处理</span>
        <span class="hljs-keyword">this</span>.startTime = <span class="hljs-built_in">Date</span>.now()
      }
      <span class="hljs-keyword">this</span>.start(event.touches[<span class="hljs-number">0</span>], <span class="hljs-literal">true</span>)
    }
}</code></pre>
<h3 id="articleHeader6">touchmove控制</h3>
<p>当发生touchMove事件是需要判断是否，移动的距离和时间，然后结束小波纹点击小姑</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  // touchmove 结束波纹控制
  stopListeningForScrollAbort () {
    if (!this.handleMove) this.handleMove = this.handleTouchMove.bind(this)
    document.body.removeEventListener('touchmove', this.handleMove, false)
  },
  startListeningForScrollAbort (event) {
    this.firstTouchY = event.touches[0].clientY
    this.firstTouchX = event.touches[0].clientX
    document.body.addEventListener('touchmove', this.handleMove, false)
  },
  handleTouchMove (event) {
    const timeSinceStart = Math.abs(Date.now() - this.startTime)
    if (timeSinceStart > 300) {
      this.stopListeningForScrollAbort()
      return
    }
    const deltaY = Math.abs(event.touches[0].clientY - this.firstTouchY)
    const deltaX = Math.abs(event.touches[0].clientX - this.firstTouchX)
    // 滑动范围在 > 6px 结束波纹点击效果
    if (deltaY > 6 || deltaX > 6) this.end()
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-comment">// touchmove 结束波纹控制</span>
  stopListeningForScrollAbort () {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.handleMove) <span class="hljs-keyword">this</span>.handleMove = <span class="hljs-keyword">this</span>.handleTouchMove.bind(<span class="hljs-keyword">this</span>)
    <span class="hljs-built_in">document</span>.body.removeEventListener(<span class="hljs-string">'touchmove'</span>, <span class="hljs-keyword">this</span>.handleMove, <span class="hljs-literal">false</span>)
  },
  startListeningForScrollAbort (event) {
    <span class="hljs-keyword">this</span>.firstTouchY = event.touches[<span class="hljs-number">0</span>].clientY
    <span class="hljs-keyword">this</span>.firstTouchX = event.touches[<span class="hljs-number">0</span>].clientX
    <span class="hljs-built_in">document</span>.body.addEventListener(<span class="hljs-string">'touchmove'</span>, <span class="hljs-keyword">this</span>.handleMove, <span class="hljs-literal">false</span>)
  },
  handleTouchMove (event) {
    <span class="hljs-keyword">const</span> timeSinceStart = <span class="hljs-built_in">Math</span>.abs(<span class="hljs-built_in">Date</span>.now() - <span class="hljs-keyword">this</span>.startTime)
    <span class="hljs-keyword">if</span> (timeSinceStart &gt; <span class="hljs-number">300</span>) {
      <span class="hljs-keyword">this</span>.stopListeningForScrollAbort()
      <span class="hljs-keyword">return</span>
    }
    <span class="hljs-keyword">const</span> deltaY = <span class="hljs-built_in">Math</span>.abs(event.touches[<span class="hljs-number">0</span>].clientY - <span class="hljs-keyword">this</span>.firstTouchY)
    <span class="hljs-keyword">const</span> deltaX = <span class="hljs-built_in">Math</span>.abs(event.touches[<span class="hljs-number">0</span>].clientX - <span class="hljs-keyword">this</span>.firstTouchX)
    <span class="hljs-comment">// 滑动范围在 &gt; 6px 结束波纹点击效果</span>
    <span class="hljs-keyword">if</span> (deltaY &gt; <span class="hljs-number">6</span> || deltaX &gt; <span class="hljs-number">6</span>) <span class="hljs-keyword">this</span>.end()
  }
}</code></pre>
<h3 id="articleHeader7">计算波纹的位置和大小</h3>
<p>需要从点击处扩散的波纹效果，需要计算波纹元素的大小和位置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  getRippleStyle (event) {
    let holder = this.$refs.holder
    //  这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离。
    let rect = holder.getBoundingClientRect() 
    // 获取点击点的位置
    let x = event.offsetX
    let y
    if (x !== undefined) {
      y = event.offsetY
    } else {
      x = event.clientX - rect.left
      y = event.clientY - rect.top
    }
    // 获取最大边长
    let max
    if (rect.width === rect.height) {
      max = rect.width * 1.412
    } else {
      max = Math.sqrt(
        (rect.width * rect.width) + (rect.height * rect.height)
      )
    }
    const dim = (max * 2) + 'px'
    return {
      width: dim,
      height: dim,
      // 通过margin控制波纹中心点和点击点一致
      'margin-left': -max + x + 'px',
      'margin-top': -max + y + 'px'
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  getRippleStyle (event) {
    <span class="hljs-keyword">let</span> holder = <span class="hljs-keyword">this</span>.$refs.holder
    <span class="hljs-comment">//  这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离。</span>
    <span class="hljs-keyword">let</span> rect = holder.getBoundingClientRect() 
    <span class="hljs-comment">// 获取点击点的位置</span>
    <span class="hljs-keyword">let</span> x = event.offsetX
    <span class="hljs-keyword">let</span> y
    <span class="hljs-keyword">if</span> (x !== <span class="hljs-literal">undefined</span>) {
      y = event.offsetY
    } <span class="hljs-keyword">else</span> {
      x = event.clientX - rect.left
      y = event.clientY - rect.top
    }
    <span class="hljs-comment">// 获取最大边长</span>
    <span class="hljs-keyword">let</span> max
    <span class="hljs-keyword">if</span> (rect.width === rect.height) {
      max = rect.width * <span class="hljs-number">1.412</span>
    } <span class="hljs-keyword">else</span> {
      max = <span class="hljs-built_in">Math</span>.sqrt(
        (rect.width * rect.width) + (rect.height * rect.height)
      )
    }
    <span class="hljs-keyword">const</span> dim = (max * <span class="hljs-number">2</span>) + <span class="hljs-string">'px'</span>
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">width</span>: dim,
      <span class="hljs-attr">height</span>: dim,
      <span class="hljs-comment">// 通过margin控制波纹中心点和点击点一致</span>
      <span class="hljs-string">'margin-left'</span>: -max + x + <span class="hljs-string">'px'</span>,
      <span class="hljs-string">'margin-top'</span>: -max + y + <span class="hljs-string">'px'</span>
    }
  }
}</code></pre>
<h2 id="articleHeader8">使用</h2>
<p>由于 <code>touchRipple</code> 内部都是 <strong>position:absolute</strong> 布局，使用时，需要在外部加上 <strong>position:relative</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// listItem.vue
<a :href=&quot;href&quot; @mouseenter=&quot;hover = true&quot; @mouseleave=&quot;hover = false&quot; @touchend=&quot;hover = false&quot;
    @touchcancel=&quot;hover = false&quot; class=&quot;mu-item-wrapper&quot; :class=&quot;{'hover': hover}&quot;>
    <touch-ripple class=&quot;mu-item&quot; :class=&quot;{'mu-item-link': link}&quot; :center-ripple=&quot;false&quot;>
      <div class=&quot;mu-item-media&quot;>
        <slot name=&quot;media&quot;></slot>
      </div>
      <div class=&quot;mu-item-content&quot;>
        // ...
      </div>
    </touch-ripple>
</a>
<style>

.mu-item-wrapper {
    display: block;
    color: inherit;
    position: relative;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">// listItem.vue
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">:href</span>=<span class="hljs-string">"href"</span> @<span class="hljs-attr">mouseenter</span>=<span class="hljs-string">"hover = true"</span> @<span class="hljs-attr">mouseleave</span>=<span class="hljs-string">"hover = false"</span> @<span class="hljs-attr">touchend</span>=<span class="hljs-string">"hover = false"</span>
    @<span class="hljs-attr">touchcancel</span>=<span class="hljs-string">"hover = false"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mu-item-wrapper"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'hover': hover}"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">touch-ripple</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mu-item"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'mu-item-link': link}"</span> <span class="hljs-attr">:center-ripple</span>=<span class="hljs-string">"false"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mu-item-media"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"media"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mu-item-content"</span>&gt;</span>
        // ...
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">touch-ripple</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">

<span class="hljs-selector-class">.mu-item-wrapper</span> {
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">color</span>: inherit;
    <span class="hljs-attribute">position</span>: relative;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h2 id="articleHeader9">最后</h2>
<p>到这点击波纹组件就开发完了， 这些代码借鉴了 <a href="https://github.com/JosephusPaye/Keen-UI" rel="nofollow noreferrer" target="_blank">keen-ui</a> 和 <a href="http://www.material-ui.com/" rel="nofollow noreferrer" target="_blank">material-ui</a> 的实现方式。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 开发波纹点击特效组件

## 原文链接
[https://segmentfault.com/a/1190000006931367](https://segmentfault.com/a/1190000006931367)

