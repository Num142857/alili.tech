---
title: 'vue.js 移动端音乐app（一） 基础组件 scroll' 
date: 2018-12-25 2:30:11
hidden: true
slug: jwvr2mbsmb
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、 基础实现</h2>
<h3 id="articleHeader1">（1）功能</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="对 better-scroll 插件的基本封装，实现移动端的滚动" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code style="word-break: break-word; white-space: initial;">对 <span class="hljs-keyword">better-scroll </span>插件的基本封装，实现移动端的滚动</code></pre>
<h3 id="articleHeader2">（2）实现</h3>
<h4>引入</h4>
<ul><li><p>better-scroll</p></li></ul>
<h4>props</h4>
<ul>
<li>
<p>probeType: better-scroll 配置项之一</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="（1）取值：
1 滚动的时候会派发 scroll 事件，会截流。
2 滚动的时候实时派发 scroll 事件，不会截流。
3 除了实时派发 scroll 事件，在 swipe 的情况下仍然能实时派发 scroll 事件。
（2）默认值：1 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>（<span class="hljs-number">1</span>）取值：
<span class="hljs-number">1</span> 滚动的时候会派发 scroll 事件，会截流。
<span class="hljs-number">2</span> 滚动的时候实时派发 scroll 事件，不会截流。
<span class="hljs-number">3</span> 除了实时派发 scroll 事件，在 swipe 的情况下仍然能实时派发 scroll 事件。
（<span class="hljs-number">2</span>）默认值：<span class="hljs-number">1</span> </code></pre>
</li>
<li><p>click: 点击事件是否生效</p></li>
<li><p>refreshDelay: refresh事件的延迟时间</p></li>
<li><p>listenScroll: 是否监听滚动事件，如果监听滚动事件，则父组件应当给自定义事件‘onscroll’绑定监听函数</p></li>
<li><p>data: 用于控制 scroll 刷新重新计算高度的数据</p></li>
</ul>
<h4>用于外部调用的方法</h4>
<ul>
<li><p>enable()</p></li>
<li><p>disable()</p></li>
<li><p>refresh()</p></li>
<li>
<p>scrollTo(x, y, time, [easing])</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="easing取值只能为 swipe/swipeBounce/bounce" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">easing取值只能为 swipe<span class="hljs-regexp">/swipeBounce/</span>bounce</code></pre>
</li>
<li>
<p>scrollToElement(el, time, [offsetX], [offsetY], [easing])</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="offsetX，offsetY为number或true,true表示滚动到目标元素中心位置，数值则为设置滚动到目标元素的偏移量" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">offsetX，offsetY为<span class="hljs-built_in">number</span>或<span class="hljs-literal">true</span>,<span class="hljs-literal">true</span>表示滚动到目标元素中心位置，数值则为设置滚动到目标元素的偏移量</code></pre>
</li>
</ul>
<h4>思想步骤</h4>
<ol>
<li><p>在 mounted 钩子中，在 $nextTick() 的回调中初始化 scroll 实例。<br>因为 scroll 实例初始化的时候必须保证其挂载对象（wrapper）的 DOM 已经渲染完成，由于 wrapper 中的数据可能异步获取的，因此必须放在 $nextTick() 中，获取更新数据后的 DOM，进行高度计算</p></li>
<li><p>watch父组件传入的数据 data<br>DOM 上的数据发生了变化，要获取更新后的 DOM ，在操作函数中同样要在$nextTick（）的回调中进行 scroll 的刷新，refresh 重新计算高度。此处 setTimeout() 与 $nextTick() 作用相同。</p></li>
</ol>
<h4>代码</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div ref=&quot;wrapper&quot; @touchstart=&quot;onTouchstart&quot;>
    <slot>
    </slot>
  </div>
</template>

<style scoped lang=&quot;stylus&quot; rel=&quot;stylesheet/stylus&quot;>

</style>

<script type=&quot;text/ecmascript-6&quot;>
  import BetterScroll from 'better-scroll'
  export default {
    name: 'scroll',
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      listenScrollStart: {
        type: Boolean,
        default: false
      },
      listenScrollEnd: {
        type: Boolean,
        default: false
      },
      listenTouchStart: {
        type: Boolean,
        default: false
      },
      scrollX: {
        type: Boolean,
        default: true
      },
      scrollY: {
        type: Boolean,
        default: true
      }
    },
    mounted () {
      this.$nextTick(() => {
        this._initScroll()
      })
    },
    methods: {
      _initScroll () {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BetterScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          scrollX: this.scrollX,
          scrollY: this.scrollY
        })
        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('onscroll', pos)
          })
        }
        if (this.listenScrollEnd) {
          let me = this
          this.scroll.on('scrollEnd', (pos) => {
            me.$emit('onscrollEnd', pos)
          })
        }
        if (this.listenScrollStart) {
          let me = this
          this.scroll.on('scrollStart', (pos) => {
            me.$emit('onscrollStart', pos)
          })
        }
      },
      // 存在自动滚动时（如歌词的自动播放）
      // 需要监听根据对 touch 事件的监听判断 scroll 过程是自动播放触发的还是用户 touch 触发的
      onTouchstart (e) {
        if (!this.listenTouchStart) {
          return
        }
        this.$emit('ontouchStart', e)
      },
      disable () {
        this.scroll &amp;&amp; this.scroll.disable()
      },
      enable () {
        this.scroll &amp;&amp; this.scroll.enable()
      },
      refresh () {
        this.scroll &amp;&amp; this.scroll.refresh()
      },
      scrollTo () {
        this.scroll &amp;&amp; this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement () {
        this.scroll &amp;&amp; this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data: {
        handler (newValue, oldValue) {
          setTimeout(() => {
            this.refresh()
          }, this.refreshDelay)
        },
        deep: true
      }
    }

  }
</script>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>&lt;template&gt;
  &lt;div ref=<span class="hljs-string">"wrapper"</span> <span class="hljs-meta">@touchstart</span>=<span class="hljs-string">"onTouchstart"</span>&gt;
    &lt;slot&gt;
    &lt;/slot&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;style scoped lang=<span class="hljs-string">"stylus"</span> rel=<span class="hljs-string">"stylesheet/stylus"</span>&gt;

&lt;/style&gt;

&lt;script type=<span class="hljs-string">"text/ecmascript-6"</span>&gt;
  <span class="hljs-keyword">import</span> BetterScroll from <span class="hljs-string">'better-scroll'</span>
  export <span class="hljs-keyword">default</span> {
    name: <span class="hljs-string">'scroll'</span>,
    props: {
      probeType: {
        type: Number,
        <span class="hljs-keyword">default</span>: <span class="hljs-number">1</span>
      },
      click: {
        type: <span class="hljs-built_in">Boolean</span>,
        <span class="hljs-keyword">default</span>: <span class="hljs-literal">true</span>
      },
      <span class="hljs-keyword">data</span>: {
        type: Array,
        <span class="hljs-keyword">default</span>: <span class="hljs-literal">null</span>
      },
      refreshDelay: {
        type: Number,
        <span class="hljs-keyword">default</span>: <span class="hljs-number">20</span>
      },
      listenScroll: {
        type: <span class="hljs-built_in">Boolean</span>,
        <span class="hljs-keyword">default</span>: <span class="hljs-literal">false</span>
      },
      listenScrollStart: {
        type: <span class="hljs-built_in">Boolean</span>,
        <span class="hljs-keyword">default</span>: <span class="hljs-literal">false</span>
      },
      listenScrollEnd: {
        type: <span class="hljs-built_in">Boolean</span>,
        <span class="hljs-keyword">default</span>: <span class="hljs-literal">false</span>
      },
      listenTouchStart: {
        type: <span class="hljs-built_in">Boolean</span>,
        <span class="hljs-keyword">default</span>: <span class="hljs-literal">false</span>
      },
      scrollX: {
        type: <span class="hljs-built_in">Boolean</span>,
        <span class="hljs-keyword">default</span>: <span class="hljs-literal">true</span>
      },
      scrollY: {
        type: <span class="hljs-built_in">Boolean</span>,
        <span class="hljs-keyword">default</span>: <span class="hljs-literal">true</span>
      }
    },
    mounted () {
      <span class="hljs-keyword">this</span>.$nextTick(() =&gt; {
        <span class="hljs-keyword">this</span>._initScroll()
      })
    },
    methods: {
      _initScroll () {
        <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.$refs.wrapper) {
          <span class="hljs-keyword">return</span>
        }
        <span class="hljs-keyword">this</span>.scroll = new BetterScroll(<span class="hljs-keyword">this</span>.$refs.wrapper, {
          probeType: <span class="hljs-keyword">this</span>.probeType,
          click: <span class="hljs-keyword">this</span>.click,
          scrollX: <span class="hljs-keyword">this</span>.scrollX,
          scrollY: <span class="hljs-keyword">this</span>.scrollY
        })
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.listenScroll) {
          let me = <span class="hljs-keyword">this</span>
          <span class="hljs-keyword">this</span>.scroll.on(<span class="hljs-string">'scroll'</span>, (pos) =&gt; {
            me.$emit(<span class="hljs-string">'onscroll'</span>, pos)
          })
        }
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.listenScrollEnd) {
          let me = <span class="hljs-keyword">this</span>
          <span class="hljs-keyword">this</span>.scroll.on(<span class="hljs-string">'scrollEnd'</span>, (pos) =&gt; {
            me.$emit(<span class="hljs-string">'onscrollEnd'</span>, pos)
          })
        }
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.listenScrollStart) {
          let me = <span class="hljs-keyword">this</span>
          <span class="hljs-keyword">this</span>.scroll.on(<span class="hljs-string">'scrollStart'</span>, (pos) =&gt; {
            me.$emit(<span class="hljs-string">'onscrollStart'</span>, pos)
          })
        }
      },
      <span class="hljs-comment">// 存在自动滚动时（如歌词的自动播放）</span>
      <span class="hljs-comment">// 需要监听根据对 touch 事件的监听判断 scroll 过程是自动播放触发的还是用户 touch 触发的</span>
      onTouchstart (e) {
        <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.listenTouchStart) {
          <span class="hljs-keyword">return</span>
        }
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'ontouchStart'</span>, e)
      },
      disable () {
        <span class="hljs-keyword">this</span>.scroll &amp;&amp; <span class="hljs-keyword">this</span>.scroll.disable()
      },
      enable () {
        <span class="hljs-keyword">this</span>.scroll &amp;&amp; <span class="hljs-keyword">this</span>.scroll.enable()
      },
      refresh () {
        <span class="hljs-keyword">this</span>.scroll &amp;&amp; <span class="hljs-keyword">this</span>.scroll.refresh()
      },
      scrollTo () {
        <span class="hljs-keyword">this</span>.scroll &amp;&amp; <span class="hljs-keyword">this</span>.scroll.scrollTo.apply(<span class="hljs-keyword">this</span>.scroll, arguments)
      },
      scrollToElement () {
        <span class="hljs-keyword">this</span>.scroll &amp;&amp; <span class="hljs-keyword">this</span>.scroll.scrollToElement.apply(<span class="hljs-keyword">this</span>.scroll, arguments)
      }
    },
    watch: {
      <span class="hljs-keyword">data</span>: {
        handler (newValue, oldValue) {
          setTimeout(() =&gt; {
            <span class="hljs-keyword">this</span>.refresh()
          }, <span class="hljs-keyword">this</span>.refreshDelay)
        },
        deep: <span class="hljs-literal">true</span>
      }
    }

  }
&lt;/script&gt;

</code></pre>
<h2 id="articleHeader3">二、问题归总</h2>
<h3 id="articleHeader4">（1）与父组件交互问题</h3>
<ul><li><p>父组件中 scroll 下内容必须被包裹，不可出现如下结构。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <scroll>
    <div>
      ...
    </div>
    <div>
      ...
    </div>
</scroll>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code> <span class="hljs-tag">&lt;<span class="hljs-name">scroll</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      ...
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      ...
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">scroll</span>&gt;</span></code></pre>
<ul><li><p>父组件对 srcoll 组件方法的调用、dom 的操作</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<scroll ref=&quot;scrollName&quot;> ... </scroll>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">scroll</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"scrollName"</span>&gt;</span> ... <span class="hljs-tag">&lt;/<span class="hljs-name">scroll</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="调用 scroll 中的方法：this.$refs.scrollName.methodName()
操作 dom（如改写style）: this.$refs.scrollName.$el.style 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>调用 scroll 中的方法：this.<span class="hljs-variable">$refs</span><span class="hljs-selector-class">.scrollName</span><span class="hljs-selector-class">.methodName</span>()
操作 dom（如改写style）: this.<span class="hljs-variable">$refs</span><span class="hljs-selector-class">.scrollName</span>.<span class="hljs-variable">$el</span><span class="hljs-selector-class">.style</span> 
</code></pre>
<ul><li><p>父组件引用 scroll 组件时 v-if 与 v-show 对其的影响</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="比如在 player.vue 组件中有如下结构。子组件 scroll 处在含有 v-show 属性来
控制显示的元素中。

1.v-if 与 v-show 的区别：v-if 会适当销毁和重建组件，且只有条件为真时才会进
行渲染。v-show 则在整个父组件创建时就渲染，只是根据条件改写元素的 css 属性
 display 的值来控制显示与否。
 
2.当 scroll 在 v-show 控制的元素中时，必须额外在显示条件为 true 时手动调用
 scroll.refresh() 刷新 scroll 重新计算其高度。
 
3.当 scroll 在 v-if 控制的元素中时，则无须手动刷新，因为 scroll 组件会被重
新创建，scroll 内部的 mounted 钩子的初始化及其对 data 的 watch 操作会自动
准确更新高度，实现滚动。

4.在 player.vue 中，由于全屏播放器和迷你播放器会被频繁切换，而初始化代价也
并不是很大，所以使用 v-show 控制显示，另外 watch player.isFullpage 的值来
手动刷新 scroll 即可。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>比如在 player.vue 组件中有如下结构。子组件 <span class="hljs-keyword">scroll</span> 处在含有 v-<span class="hljs-keyword">show</span> 属性来
控制显示的元素中。

<span class="hljs-number">1.</span>v-<span class="hljs-keyword">if</span> 与 v-<span class="hljs-keyword">show</span> 的区别：v-<span class="hljs-keyword">if</span> 会适当销毁和重建组件，且只有条件为真时才会进
行渲染。v-<span class="hljs-keyword">show</span> 则在整个父组件创建时就渲染，只是根据条件改写元素的 css 属性
 display 的值来控制显示与否。
 
<span class="hljs-number">2.</span>当 <span class="hljs-keyword">scroll</span> 在 v-<span class="hljs-keyword">show</span> 控制的元素中时，必须额外在显示条件为 true 时手动调用
 <span class="hljs-keyword">scroll</span>.refresh() 刷新 <span class="hljs-keyword">scroll</span> 重新计算其高度。
 
<span class="hljs-number">3.</span>当 <span class="hljs-keyword">scroll</span> 在 v-<span class="hljs-keyword">if</span> 控制的元素中时，则无须手动刷新，因为 <span class="hljs-keyword">scroll</span> 组件会被重
新创建，<span class="hljs-keyword">scroll</span> 内部的 mounted 钩子的初始化及其对 data 的 watch 操作会自动
准确更新高度，实现滚动。

<span class="hljs-number">4.</span>在 player.vue 中，由于全屏播放器和迷你播放器会被频繁切换，而初始化代价也
并不是很大，所以使用 v-<span class="hljs-keyword">show</span> 控制显示，另外 watch player.isFullpage 的值来
手动刷新 <span class="hljs-keyword">scroll</span> 即可。</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 全屏显示的播放器
 <div class=&quot;normal-player&quot; v-show=&quot;player.isFullpage&quot;>
    ...
    // 歌词部分，可滚动
    // lyricData是在组件mounted时后台获取的
    <scroll :data=&quot;lyricData&quot;>
        ...
    </scroll>
 </div>
// 迷你显示的播放器
 <div class=&quot;mini-player&quot; v-show=&quot;!player.isFullpage&quot;>
    ...
 </div>

// js 部分 watch 代码
 watch: {
      'player.isFullpage': function (newFlag) {
        if (newFlag) {
          this.$nextTick(() => {
            this.$refs.lyricScroll.refresh()
          })
        },
       ...
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 全屏显示的播放器</span>
 &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"normal-player"</span> v-show=<span class="hljs-string">"player.isFullpage"</span>&gt;
    ...
    <span class="hljs-comment">// 歌词部分，可滚动</span>
    <span class="hljs-comment">// lyricData是在组件mounted时后台获取的</span>
    &lt;scroll :data=<span class="hljs-string">"lyricData"</span>&gt;
        ...
    &lt;/scroll&gt;
 &lt;/div&gt;
<span class="hljs-comment">// 迷你显示的播放器</span>
 &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"mini-player"</span> v-show=<span class="hljs-string">"!player.isFullpage"</span>&gt;
    ...
 &lt;/div&gt;

<span class="hljs-comment">// js 部分 watch 代码</span>
 watch: {
      <span class="hljs-string">'player.isFullpage'</span>: function (newFlag) {
        <span class="hljs-keyword">if</span> (newFlag) {
          this.<span class="hljs-variable">$nextTick</span>(() =&gt; {
            this.<span class="hljs-variable">$refs</span><span class="hljs-selector-class">.lyricScroll</span><span class="hljs-selector-class">.refresh</span>()
          })
        },
       ...
    }</code></pre>
<p>-父组件与 scroll 组件之间 touch 系列事件同时触发的问题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="如在 player.vue 中，音乐播放器 CD 页面和歌词页是左右滑动切换显示的，封装成
了 fade-slider 组件来控制页面切换，在 fade-slider 中监听 touch 系列事件来
控制左右滑动，而scroll 组件在歌词页面中使用，监听 onscroll 事件控制歌词滑动
上下切换，scroll 与 fade-slier 是父子关系，因此直接绑定事件时，冒泡过程中
二者的 touch 系列事件会同时被触发。为了实现需求，即页面左右滑动时 scroll 禁
止滚动，scroll 上下滚动时 fade-slider 也不要左右切换，必须做相应的处理。如
下代码：
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>如在 player.vue 中，音乐播放器 CD 页面和歌词页是左右滑动切换显示的，封装成
了 fade-slider 组件来控制页面切换，在 fade-slider 中监听 touch 系列事件来
控制左右滑动，而<span class="hljs-keyword">scroll</span> 组件在歌词页面中使用，监听 onscroll 事件控制歌词滑动
上下切换，<span class="hljs-keyword">scroll</span> 与 fade-slier 是父子关系，因此直接绑定事件时，冒泡过程中
二者的 touch 系列事件会同时被触发。为了实现需求，即页面左右滑动时 <span class="hljs-keyword">scroll</span> 禁
止滚动，<span class="hljs-keyword">scroll</span> 上下滚动时 fade-slider 也不要左右切换，必须做相应的处理。如
下代码：
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// player.vue 组件片段
  <fade-slider>
    <div class=&quot;slider-item&quot;>
     ...
    </div>
    <div class=&quot;slider-item&quot;>
       ...
       // 监听 scroll 的滚动事件，此处主要是上下滚动
        <scroll @onscroll=&quot;onLyricScroll&quot;>
          ...
        </scroll>
    </div>
  </fade-slider>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// player.vue 组件片段
  <span class="hljs-tag">&lt;<span class="hljs-name">fade-slider</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slider-item"</span>&gt;</span>
     ...
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slider-item"</span>&gt;</span>
       ...
       // 监听 scroll 的滚动事件，此处主要是上下滚动
        <span class="hljs-tag">&lt;<span class="hljs-name">scroll</span> @<span class="hljs-attr">onscroll</span>=<span class="hljs-string">"onLyricScroll"</span>&gt;</span>
          ...
        <span class="hljs-tag">&lt;/<span class="hljs-name">scroll</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">fade-slider</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// fade-slider 组件的 template 部分
<template>
  <div class=&quot;slider&quot; ref=&quot;slider&quot;>
    <div @touchstart.capture=&quot;onTouchStart&quot;
         @touchmove.capture=&quot;onTouchMove&quot;
         @touchend=&quot;onTouchEnd&quot;>
      <slot>
      </slot>
    </div>
     ...
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// fade-slider 组件的 template 部分
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slider"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"slider"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> @<span class="hljs-attr">touchstart.capture</span>=<span class="hljs-string">"onTouchStart"</span>
         @<span class="hljs-attr">touchmove.capture</span>=<span class="hljs-string">"onTouchMove"</span>
         @<span class="hljs-attr">touchend</span>=<span class="hljs-string">"onTouchEnd"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
     ...
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.要在歌词页面上下滑动歌词时，即在 scroll 上下滚动时，使歌词页面
（fade-slider组件的中一个页面）不要左右滑动，很简单，在 fade-slider 的
 touch 系列事件中对 touch 的位置和方向进行判断即可。

2.反过来，要在 fade-slider 控制歌词页面左右滑动时，使歌词页面中的 scroll 
不要上下滑动，因为它是封装出来的 onscroll 事件，不能直接对 touch 的位置和方
向进行判断，而另外去监听它的 touch 系列事件虽然也可以处理问题，但显然不合
适，不仅逻辑重复，而且组件与 DOM 的耦合性也过高，不合适。

3.因而，当前问题就是要在父组件的 touch 过程中，满足一定条件时去阻止子组件
的 scroll 事件的触发，显然在冒泡过程中难以做到，因此解决方案：

（1）fade-slider组件（父组件）中捕获绑定 touch 系列事件：如 @touchstart.capture=&quot;onTouchStart&quot;
（2）在 touch 系列事件处理过程中，控制当确定是左右滑动行为时，阻止 touch 系
列事件的传播：e.stopPropagation()，这样，scroll 中的滚动就不会被触发。

4.因此，总的逻辑就是：

（1）touch 系列事件第一时间由父组件捕获，进行 touch 行为的判断
（2）如果是左右滑动，则切换页面，同时阻止 touch 事件的进一步传递
（3）如果是上下滑动，则不做处理，使子组件的 touch 系列事件（scroll的内部）被触发，进行处理。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>要在歌词页面上下滑动歌词时，即在 scroll 上下滚动时，使歌词页面
（fade-slider组件的中一个页面）不要左右滑动，很简单，在 fade-slider 的
 <span class="hljs-section">touch</span> 系列事件中对 <span class="hljs-section">touch</span> 的位置和方向进行判断即可。

<span class="hljs-number">2.</span>反过来，要在 fade-slider 控制歌词页面左右滑动时，使歌词页面中的 scroll 
不要上下滑动，因为它是封装出来的 onscroll 事件，不能直接对 <span class="hljs-section">touch</span> 的位置和方
向进行判断，而另外去监听它的 <span class="hljs-section">touch</span> 系列事件虽然也可以处理问题，但显然不合
适，不仅逻辑重复，而且组件与 DOM 的耦合性也过高，不合适。

<span class="hljs-number">3.</span>因而，当前问题就是要在父组件的 <span class="hljs-section">touch</span> 过程中，满足一定条件时去阻止子组件
的 scroll 事件的触发，显然在冒泡过程中难以做到，因此解决方案：

（<span class="hljs-number">1</span>）fade-slider组件（父组件）中捕获绑定 <span class="hljs-section">touch</span> 系列事件：如 @touchstart.capture=<span class="hljs-string">"onTouchStart"</span>
（<span class="hljs-number">2</span>）在 <span class="hljs-section">touch</span> 系列事件处理过程中，控制当确定是左右滑动行为时，阻止 <span class="hljs-section">touch</span> 系
列事件的传播：e.stopPropagation()，这样，scroll 中的滚动就不会被触发。

<span class="hljs-number">4.</span>因此，总的逻辑就是：

（<span class="hljs-number">1</span>）<span class="hljs-section">touch</span> 系列事件第一时间由父组件捕获，进行 <span class="hljs-section">touch</span> 行为的判断
（<span class="hljs-number">2</span>）如果是左右滑动，则切换页面，同时阻止 <span class="hljs-section">touch</span> 事件的进一步传递
（<span class="hljs-number">3</span>）如果是上下滑动，则不做处理，使子组件的 <span class="hljs-section">touch</span> 系列事件（scroll的内部）被触发，进行处理。
</code></pre>
<h3 id="articleHeader5">（2）自动滚动过程中 touch 相关问题</h3>
<h4>需求分析</h4>
<p>如下图：在歌词页面中，歌词即使用 scroll 组件，在音乐播放过程中，歌词会自动播放，即根据当前音乐所对应的歌词，来 scrollToElement ,而在此过程中，仍然接受 touch 行为，当由 touch 引起滚动时，暂停歌词的自动播放，并显示歌词控制条，同时根据滚动的距离高亮对应的歌词。歌词控制条分两部分：左侧显示当前滚动到的歌词对应的音乐的时间，右侧显示播放按钮，点击则直接播放此刻的音乐，歌词也随之重新定位</p>
<ul>
<li><p>图1：自动播放滚动时歌词控制条不显示，且高亮的歌词是当前音乐的进度对应的歌词</p></li>
<li><p>图2：touch 引起滚动时，歌词暂停播放（音乐播放状依旧不变），歌词控制条显示，当前高亮歌词由当前滚动到的位置决定</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012055507?w=412&amp;h=731" src="https://static.alili.tech/img/remote/1460000012055507?w=412&amp;h=731" alt="vue-music" title="vue-music" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/remote/1460000012055508?w=413&amp;h=735" src="https://static.alili.tech/img/remote/1460000012055508?w=413&amp;h=735" alt="vue-music" title="vue-music" style="cursor: pointer; display: inline;"></span></p>
<h4>问题分析</h4>
<ol>
<li><p>首先在滚动过程中高亮的歌词以及歌词控制条上显示的对应的时间，显然是要通过 onscroll 判断，所以问题就在于如何在滚动过程中合理有效的区分是自动播放的滚动还是 touch 引起的滚动。</p></li>
<li>
<p>在确认是 touch 行为引起 scroll 滚动的前提下，大致要有三个阶段，做不同的事情</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="（1）scrollStart阶段：显示歌词控制条，停止歌词的自动滚动
（2）onScroll阶段：不断根据当前滚动的偏移量更新高亮的歌词，以及对应的时间
（3）scrollEnd阶段：滚动结束后，设置一定时间（如 1s）后，隐藏歌词控制条，恢复之前的播放状态
（4）在以上阶段的任何时刻，一旦歌词控制条上的播放按钮被点击，都立即隐藏歌词控制条，并更新播放状态
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>（<span class="hljs-number">1</span>）scrollStart阶段：显示歌词控制条，停止歌词的自动滚动
（<span class="hljs-number">2</span>）onScroll阶段：不断根据当前滚动的偏移量更新高亮的歌词，以及对应的时间
（<span class="hljs-number">3</span>）scrollEnd阶段：滚动结束后，设置一定时间（如 <span class="hljs-number">1</span>s）后，隐藏歌词控制条，恢复之前的播放状态
（<span class="hljs-number">4</span>）在以上阶段的任何时刻，一旦歌词控制条上的播放按钮被点击，都立即隐藏歌词控制条，并更新播放状态
</code></pre>
</li>
<li><p>总的来说，核心内容涉及到 touchStart、scrollStart、onScroll、scrollEnd四个事件，重点是这些事件的触发顺序，以及滚动惯性的问题</p></li>
</ol>
<h4>问题解决</h4>
<p><strong>（一） 初步实现</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="（1）scroll 组件中已经绑定了并注册了 ontouchStart,onscrollStart,onscroll,onscrollEnd事件（代码见第一章），
在父组件中直接传入相应值并监听事件即可
（2）设置 touch标志，用来区分是否是自动滚动。在 touchStart 中
置其为 true，在 scrollEnd 置其为 false。之所以用 scrollEnd 作为结束时机而
不用 touchEnd 也是由于滚动惯性
（3）因此，自动滚动和 touch 滚动的处理流程分别如下图：   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>（<span class="hljs-number">1</span>）scroll 组件中已经绑定了并注册了 ontouchStart,onscrollStart,onscroll,onscrollEnd事件（代码见第一章），
在父组件中直接传入相应值并监听事件即可
（<span class="hljs-number">2</span>）设置 <span class="hljs-section">touch</span>标志，用来区分是否是自动滚动。在 touchStart 中
置其为 true，在 scrollEnd 置其为 false。之所以用 scrollEnd 作为结束时机而
不用 touchEnd 也是由于滚动惯性
（<span class="hljs-number">3</span>）因此，自动滚动和 <span class="hljs-section">touch</span> 滚动的处理流程分别如下图：   </code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012055509?w=2900&amp;h=2742" src="https://static.alili.tech/img/remote/1460000012055509?w=2900&amp;h=2742" alt="vue-music" title="vue-music" style="cursor: pointer;"></span></p>
<p><strong>（二） 惯性过程中 touch 引起的 bug 修复</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    初步实现中的流程基本已经可以实现需求，touch 的标志已经可以控制区分自动
滚动和touch 滚动，但是会发现如果在 scroll 的惯性滚动中，再次 touch 屏幕，
则惯性滚动会停止，但 scroll 系列事件会不再起作用，高亮的歌词与此时 touch 的
位置也不对应，即在其系列事件中 touch 的标志被置为 false 了，而这显然不是我
们想要的。
    touch 的标志之所以被置为了 false，是由 scrollEnd 的触发导致的。在惯性
滚动过程中，touch 屏幕则会阻止惯性滚动，这是很明显的现象，据此想一想，肯定是 
touch 导致了 scrollEnd 的提前触发。即如下图：" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs irpf90"><code>    初步实现中的流程基本已经可以实现需求，<span class="hljs-keyword">touch</span> 的标志已经可以控制区分自动
滚动和<span class="hljs-keyword">touch</span> 滚动，但是会发现如果在 scroll 的惯性滚动中，再次 <span class="hljs-keyword">touch</span> 屏幕，
则惯性滚动会停止，但 scroll 系列事件会不再起作用，高亮的歌词与此时 <span class="hljs-keyword">touch</span> 的
位置也不对应，即在其系列事件中 <span class="hljs-keyword">touch</span> 的标志被置为 false 了，而这显然不是我
们想要的。
    <span class="hljs-keyword">touch</span> 的标志之所以被置为了 false，是由 scrollEnd 的触发导致的。在惯性
滚动过程中，<span class="hljs-keyword">touch</span> 屏幕则会阻止惯性滚动，这是很明显的现象，据此想一想，肯定是 
<span class="hljs-keyword">touch</span> 导致了 scrollEnd 的提前触发。即如下图：</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012055510?w=4046&amp;h=2580" src="https://static.alili.tech/img/remote/1460000012055510?w=4046&amp;h=2580" alt="vue-music" title="vue-music" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="因此，除了 touch 标志之外，还需一个 end 标志来确定 scroll 系列流程是否被 touch 行为提前打断。
1. 在 touchStart 中置 end 标志为 true
2. 在 scrollStart 中置 end 标志为 false
3. 在 scrollEnd 中置 end 标志为 true
4. 在 scrollEnd 中增加判断，如果 end 标志为 true，则不置 touch 标志为 false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>因此，除了 touch 标志之外，还需一个 <span class="hljs-keyword">end</span> 标志来确定 <span class="hljs-keyword">scroll</span> 系列流程是否被 touch 行为提前打断。
<span class="hljs-number">1.</span> 在 touchStart 中置 <span class="hljs-keyword">end</span> 标志为 <span class="hljs-literal">true</span>
<span class="hljs-number">2.</span> 在 scrollStart 中置 <span class="hljs-keyword">end</span> 标志为 <span class="hljs-literal">false</span>
<span class="hljs-number">3.</span> 在 scrollEnd 中置 <span class="hljs-keyword">end</span> 标志为 <span class="hljs-literal">true</span>
<span class="hljs-number">4.</span> 在 scrollEnd 中增加判断，如果 <span class="hljs-keyword">end</span> 标志为 <span class="hljs-literal">true</span>，则不置 touch 标志为 <span class="hljs-literal">false</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012055511" src="https://static.alili.tech/img/remote/1460000012055511" alt="vue-music" title="vue-music" style="cursor: pointer; display: inline;"></span></p>
<p><strong>（三） touchStart、scrollStart、onscroll、scrollEnd 在 scroll 组件中注册的区别</strong></p>
<ol>
<li><p>scrollStart、onscroll、scrollEnd 均是 better-scroll 中注册的事件，使用时在 better-scroll 对象（new BetterScroll（））上 .on（事件名，处理函数） 监听即可</p></li>
<li><p>touchStart 是原生事件，在 scroll 组件中绑定在最外层元素上</p></li>
</ol>
<h2 id="articleHeader6">三、完整项目地址</h2>
<blockquote><p>Github: <a href="https://github.com/aphasic/music-player.git" rel="nofollow noreferrer" target="_blank">https://github.com/aphasic/mu...</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue.js 移动端音乐app（一） 基础组件 scroll

## 原文链接
[https://segmentfault.com/a/1190000012013686](https://segmentfault.com/a/1190000012013686)

