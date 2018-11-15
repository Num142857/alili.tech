---
title: BetterScroll：可能是目前最好用的移动端滚动插件
hidden: true
categories: reprint
slug: 743c5acb
date: 2018-10-23 00:00:00
---

{{< raw >}}

                    
<p>BetterScroll 是一款重点解决移动端各种滚动场景需求的开源插件（<a href="https://github.com/ustbhuangyi/better-scroll" rel="nofollow noreferrer" target="_blank">GitHub地址</a>），有下列功能支持滚动列表，下拉刷新，上拉刷新，轮播图，slider等功能。<br>为了满足这些功能，better-scroll通过使用惯性滚动、边界回弹、滚动条淡入淡出来确保滚动的流畅。同时还支持很多API和事件，具体支持的事件可以查看官网讲的非常详细。<br>由于它基于原生JavaScript 实现，不依赖任何框架，所以既可以原生 JavaScript 引用，也可以与目前前端 MVVM 框架结合使用，比如，其官网上的示例就是与 Vue 的结合。</p>
<h2 id="articleHeader0">如何使用：</h2>
<p>再讲如何使用的之前，我们先来了解一下他的滚动原理：在浏览器中的滚动中，当内容的高度高于外边容器的高度的时候也就出现了滚动条，我们可以通过使用滚动条来看到超出的部分.</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVY5fs?w=830&amp;h=632" src="https://static.alili.tech/img/bVY5fs?w=830&amp;h=632" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>better-scroll的原理正是基于这里，内容部分的宽度/高度必须大于外部宽度/高度。所以在使用<br>的时候外部容器的需要设置固定宽度，还有一个问题需要设置overflow:hidden,这是因为为了隐藏超出部分。然后就是什么时候对better-scroll进行初始化，这个有点麻烦，但是所幸，作者已经在vue框架下进行封装，我们只需要像个麻瓜一样往里边填东西就行了。但是有一点需要注意：滚动的元素只能是第一个容器的第一个元素。源码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // this.scroller就是滚动的内容，this.wrapper是容器
    this.scroller = this.wrapper.children[0]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>  <span class="hljs-comment">// this.scroller就是滚动的内容，this.wrapper是容器</span>
    this<span class="hljs-selector-class">.scroller</span> = this<span class="hljs-selector-class">.wrapper</span><span class="hljs-selector-class">.children</span>[<span class="hljs-number">0</span>]
</code></pre>
<p>如果我们需要滚动多个内容怎么办呢，就用一个元素将其包裹住，让他成为容器的第一个子元素就行了。如何使用讲完了，我们来讲讲源码，毕竟这是一个源码解析的文章</p>
<h2 id="articleHeader1">核心代码：</h2>
<h1 id="articleHeader2">1、scrollTo</h1>
<p>scrollTo()函数是better-scroll非常核心的一个函数，事实上我们在调用scrollToElement的<br>时候，内部进行的操作还是scrollTo函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   BScroll.prototype.scrollTo = function (x, y, time=0, easing = ease.bounce) {
        // useTransition是否使用css3 transition,isInTransition表示是否在滚动过程中
        // this.x表示translate后的位置或者初始化this.x = 0
        this.isInTransition = this.options.useTransition
        &amp;&amp; time > 0 &amp;&amp; (x !== this.x || y !== this.y)

        // 如果使用的transition，就调用一系列transition的设置，默认是true
        if (!time || this.options.useTransition) {
            this._transitionProperty()
            this._transitionTimingFunction(easing.style)
            this._transitionTime(time)
            // 这个函数会更改this.x
            this._translate(x, y)

            // time存在protoType表示不仅在屏幕滑动的时候， momentum 滚动动画运行过程中实时派发 scroll 事件
            if (time &amp;&amp; this.options.probeType === 3) {
                // 这个函数的作用是派发scroll事件
                this._startProbe()
            }

            // wheel用于picker组件设置,不用管
            if (this.options.wheel) {
                if (y > 0) {
                    this.selectedIndex = 0
                } else if (y < this.maxScrollY) {
                    this.selectedIndex = this.items.length - 1
                } else {
                    this.selectedIndex = Math.round(Math.abs(y / this.itemHeight))
                }
            } else {
                // 进行动画this._animate
                this._animate(x, y, time, easing.fn)
            }
        }
    };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>   BScroll.prototype.scrollTo = function (x, y, time=<span class="hljs-number">0</span>, easing = ease.bounce) {
        <span class="hljs-comment">// useTransition是否使用css3 transition,isInTransition表示是否在滚动过程中</span>
        <span class="hljs-comment">// this.x表示translate后的位置或者初始化this.x = 0</span>
        <span class="hljs-keyword">this</span>.isInTransition = <span class="hljs-keyword">this</span>.options.useTransition
        &amp;&amp; time &gt; <span class="hljs-number">0</span> &amp;&amp; (x !== <span class="hljs-keyword">this</span>.x || y !== <span class="hljs-keyword">this</span>.y)

        <span class="hljs-comment">// 如果使用的transition，就调用一系列transition的设置，默认是true</span>
        <span class="hljs-keyword">if</span> (!time || <span class="hljs-keyword">this</span>.options.useTransition) {
            <span class="hljs-keyword">this</span>._transitionProperty()
            <span class="hljs-keyword">this</span>._transitionTimingFunction(easing.style)
            <span class="hljs-keyword">this</span>._transitionTime(time)
            <span class="hljs-comment">// 这个函数会更改this.x</span>
            <span class="hljs-keyword">this</span>._translate(x, y)

            <span class="hljs-comment">// time存在protoType表示不仅在屏幕滑动的时候， momentum 滚动动画运行过程中实时派发 scroll 事件</span>
            <span class="hljs-keyword">if</span> (time &amp;&amp; <span class="hljs-keyword">this</span>.options.probeType === <span class="hljs-number">3</span>) {
                <span class="hljs-comment">// 这个函数的作用是派发scroll事件</span>
                <span class="hljs-keyword">this</span>._startProbe()
            }

            <span class="hljs-comment">// wheel用于picker组件设置,不用管</span>
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.options.wheel) {
                <span class="hljs-keyword">if</span> (y &gt; <span class="hljs-number">0</span>) {
                    <span class="hljs-keyword">this</span>.selectedIndex = <span class="hljs-number">0</span>
                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (y &lt; <span class="hljs-keyword">this</span>.maxScrollY) {
                    <span class="hljs-keyword">this</span>.selectedIndex = <span class="hljs-keyword">this</span>.items.length - <span class="hljs-number">1</span>
                } <span class="hljs-keyword">else</span> {
                    <span class="hljs-keyword">this</span>.selectedIndex = Math.round(Math.abs(y / <span class="hljs-keyword">this</span>.itemHeight))
                }
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-comment">// 进行动画this._animate</span>
                <span class="hljs-keyword">this</span>._animate(x, y, time, easing.fn)
            }
        }
    };
</code></pre>
<p>我们来依次看看这个函数，其中简单的操作用代码注明，也就不做太多的描述，其中例如this._transition这种有关transform的都是改变他的位置而已，这里我需要说明一下，我们在制作轮播图的时候，别去使用transform这种方法来做轮播图，因为当我们需要获取transform属性值的时候，你会获取到的值是一个非常奇怪的矩阵，得到translateX或者translateY的值是一件非常痛苦的事，可以看看作者是如何获取transform的值的，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="matrix = matrix[style.transform].split(')')[0].split(', ')
            x = +(matrix[12] || matrix[4])
            y = +(matrix[13] || matrix[5])
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">matrix</span> = <span class="hljs-built_in">matrix</span>[<span class="hljs-built_in">style</span>.<span class="hljs-built_in">transform</span>].<span class="hljs-built_in">split</span>(')')[<span class="hljs-number">0</span>].<span class="hljs-built_in">split</span>(', ')
            x = +(<span class="hljs-built_in">matrix</span>[<span class="hljs-number">12</span>] || <span class="hljs-built_in">matrix</span>[<span class="hljs-number">4</span>])
            y = +(<span class="hljs-built_in">matrix</span>[<span class="hljs-number">13</span>] || <span class="hljs-built_in">matrix</span>[<span class="hljs-number">5</span>])
</code></pre>
<p>我是一脸蒙蔽，要是你觉得你水平很高当我没说。this.options.probeType这个probeType配置表明的是我们需要在什么情况下派发scroll事件，在better-scroll的原理中是默认阻止浏览器的默认行为的，那我们是如何派发事件的呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  export function tap(e, eventName) {
        let ev = document.createElement('Event')
        ev.initEvent(eventName, true, true)
        e.target.dispatchEvent(ev)
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  <span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tap</span>(<span class="hljs-params">e, eventName</span>) </span>{
        <span class="hljs-keyword">let</span> ev = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'Event'</span>)
        ev.initEvent(eventName, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>)
        e.target.dispatchEvent(ev)
    }
</code></pre>
<p>创建一个element,然后初始化，然后派发事件，我们就可以像addEventListener('click', fn, false)这样的方式来监听事件addEventListener(eventName, fn, false)。这儿有一个参数叫easing,我们来看看easing是什么<br>下面是一个easing的一个选项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" bounce: {
        style: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        fn: function (t) {
            return 1 - (--t * t * t * t)
        }
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code> bounce: {
        style: <span class="hljs-symbol">'cubic</span>-bezier(<span class="hljs-number">0.165</span>, <span class="hljs-number">0.84</span>, <span class="hljs-number">0.44</span>, <span class="hljs-number">1</span>)',
        fn: <span class="hljs-keyword">function</span> <span class="hljs-title"></span>(t) {
            <span class="hljs-keyword">return</span> <span class="hljs-type">1</span> - (<span class="hljs-comment">--t * t * t * t)</span>
        }
    }
</code></pre>
<p>可以看到easing通过贝瑟尔函数，和fn让我们的动画显得不是那么僵硬。贝瑟尔函数可以去看看，他让动画不再那么突兀。</p>
<h1 id="articleHeader3">2、refresh函数</h1>
<p>在实际开发中，有时候从后端请求到数据后，我们dom结构发生变化，所以需要调用refresh方法，来看看他是什么玩意</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="BScroll.prototype.refresh = function () {
    // return getBoundingRect getRect()
    let wrapperRect = getRect(this.wrapper)
    this.wrapperWidth = wrapperRect.width
    this.wrapperHeight = wrapperRect.height

    let scrollerRect = getRect(this.scroller)
    this.scrollerWidth = scrollerRect.width
    this.scrollerHeight = scrollerRect.height

    const wheel = this.options.wheel
    // wheel用于picker组件设置
    if (wheel) {
        this.items = this.scroller.children
        this.options.itemHeight = this.itemHeight = this.items.length ? this.scrollerHeight / this.items.length : 0
        if (this.selectedIndex === undefined) {
            this.selectedIndex = wheel.selectedIndex || 0
        }
        this.options.startY = -this.selectedIndex * this.itemHeight
        this.maxScrollX = 0
        this.maxScrollY = -this.itemHeight * (this.items.length - 1)
    } else {
        // 允许滑动的距离
        this.maxScrollX = this.wrapperWidth - this.scrollerWidth
        this.maxScrollY = this.wrapperHeight - this.scrollerHeight
    }

    // 滚动原理容器的宽度小于scroller的宽度
    // scrollX设置为true表示可以横向滚动
    this.hasHorizontalScroll = this.options.scrollX &amp;&amp; this.maxScrollX < 0
    this.hasVerticalScroll = this.options.scrollY &amp;&amp; this.maxScrollY < 0

    // 如果水平不存在的话
    if (!this.hasHorizontalScroll) {
        this.maxScrollX = 0
        this.scrollerWidth = this.wrapperWidth
    }

    if (!this.hasVerticalScroll) {
        this.maxScrollY = 0
        this.scrollerHeight = this.wrapperHeight
    }

    this.endTime = 0
    // 移动方向
    this.directionX = 0
    this.directionY = 0
    // return el.offsetLeft
    // el.offsetLeft是距离父容器的距离
    // el.getBoundingClientRect()返回的是距离页面的距离
    this.wrapperOffset = offset(this.wrapper)

    // 切换到refresh事件
    this.trigger('refresh')

    // 重置位置
    this.resetPosition()
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>BScroll.prototype.refresh = function () {
    <span class="hljs-comment">// return getBoundingRect getRect()</span>
    let wrapperRect = getRect(<span class="hljs-keyword">this</span>.wrapper)
    <span class="hljs-keyword">this</span>.wrapperWidth = wrapperRect.width
    <span class="hljs-keyword">this</span>.wrapperHeight = wrapperRect.height

    let scrollerRect = getRect(<span class="hljs-keyword">this</span>.scroller)
    <span class="hljs-keyword">this</span>.scrollerWidth = scrollerRect.width
    <span class="hljs-keyword">this</span>.scrollerHeight = scrollerRect.height

    const wheel = <span class="hljs-keyword">this</span>.options.wheel
    <span class="hljs-comment">// wheel用于picker组件设置</span>
    <span class="hljs-keyword">if</span> (wheel) {
        <span class="hljs-keyword">this</span>.items = <span class="hljs-keyword">this</span>.scroller.children
        <span class="hljs-keyword">this</span>.options.itemHeight = <span class="hljs-keyword">this</span>.itemHeight = <span class="hljs-keyword">this</span>.items.length ? <span class="hljs-keyword">this</span>.scrollerHeight / <span class="hljs-keyword">this</span>.items.length : <span class="hljs-number">0</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.selectedIndex === undefined) {
            <span class="hljs-keyword">this</span>.selectedIndex = wheel.selectedIndex || <span class="hljs-number">0</span>
        }
        <span class="hljs-keyword">this</span>.options.startY = -<span class="hljs-keyword">this</span>.selectedIndex * <span class="hljs-keyword">this</span>.itemHeight
        <span class="hljs-keyword">this</span>.maxScrollX = <span class="hljs-number">0</span>
        <span class="hljs-keyword">this</span>.maxScrollY = -<span class="hljs-keyword">this</span>.itemHeight * (<span class="hljs-keyword">this</span>.items.length - <span class="hljs-number">1</span>)
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// 允许滑动的距离</span>
        <span class="hljs-keyword">this</span>.maxScrollX = <span class="hljs-keyword">this</span>.wrapperWidth - <span class="hljs-keyword">this</span>.scrollerWidth
        <span class="hljs-keyword">this</span>.maxScrollY = <span class="hljs-keyword">this</span>.wrapperHeight - <span class="hljs-keyword">this</span>.scrollerHeight
    }

    <span class="hljs-comment">// 滚动原理容器的宽度小于scroller的宽度</span>
    <span class="hljs-comment">// scrollX设置为true表示可以横向滚动</span>
    <span class="hljs-keyword">this</span>.hasHorizontalScroll = <span class="hljs-keyword">this</span>.options.scrollX &amp;&amp; <span class="hljs-keyword">this</span>.maxScrollX &lt; <span class="hljs-number">0</span>
    <span class="hljs-keyword">this</span>.hasVerticalScroll = <span class="hljs-keyword">this</span>.options.scrollY &amp;&amp; <span class="hljs-keyword">this</span>.maxScrollY &lt; <span class="hljs-number">0</span>

    <span class="hljs-comment">// 如果水平不存在的话</span>
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.hasHorizontalScroll) {
        <span class="hljs-keyword">this</span>.maxScrollX = <span class="hljs-number">0</span>
        <span class="hljs-keyword">this</span>.scrollerWidth = <span class="hljs-keyword">this</span>.wrapperWidth
    }

    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.hasVerticalScroll) {
        <span class="hljs-keyword">this</span>.maxScrollY = <span class="hljs-number">0</span>
        <span class="hljs-keyword">this</span>.scrollerHeight = <span class="hljs-keyword">this</span>.wrapperHeight
    }

    <span class="hljs-keyword">this</span>.endTime = <span class="hljs-number">0</span>
    <span class="hljs-comment">// 移动方向</span>
    <span class="hljs-keyword">this</span>.directionX = <span class="hljs-number">0</span>
    <span class="hljs-keyword">this</span>.directionY = <span class="hljs-number">0</span>
    <span class="hljs-comment">// return el.offsetLeft</span>
    <span class="hljs-comment">// el.offsetLeft是距离父容器的距离</span>
    <span class="hljs-comment">// el.getBoundingClientRect()返回的是距离页面的距离</span>
    <span class="hljs-keyword">this</span>.wrapperOffset = offset(<span class="hljs-keyword">this</span>.wrapper)

    <span class="hljs-comment">// 切换到refresh事件</span>
    <span class="hljs-keyword">this</span>.trigger(<span class="hljs-string">'refresh'</span>)

    <span class="hljs-comment">// 重置位置</span>
    <span class="hljs-keyword">this</span>.resetPosition()
}
</code></pre>
<p>当我们的dom结构发生变化的时候，我们就需要重新计算父容器和容器的大小了，这样就可以重新渲染了，这个函数没什么太难理解的部分，需要注意的是getBoundingClientRect()方法返回元素的大小及其相对于视口的位置。他同element.style获取的有些不同getBoundingClientRect()获取到的值是相对视口左上角，意思是说在获取right值的时候，事实上是left+element.clientWidth。而且getBoundingClientRect()是只能读取，而element.style不仅能读取，还能获取。el.offsetLeft返回的距离父容器的距离，如果我们需要得到元素距离document的距离的话我们就需要这样写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function offset(el) {
    let left = 0
    let top = 0

    while (el) {
        left -= el.offsetLeft
        top -= el.offsetTop
        el = el.offsetParent
    }

    return {
        left,
        top
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>export <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">offset</span><span class="hljs-params">(el)</span> {</span>
    <span class="hljs-keyword">let</span> <span class="hljs-keyword">left</span> = <span class="hljs-number">0</span>
    <span class="hljs-keyword">let</span> top = <span class="hljs-number">0</span>

    <span class="hljs-keyword">while</span> (<span class="hljs-keyword">el</span>) {
        <span class="hljs-keyword">left</span> -= <span class="hljs-keyword">el</span>.offsetLeft
        top -= <span class="hljs-keyword">el</span>.offsetTop
        <span class="hljs-keyword">el</span> = <span class="hljs-keyword">el</span>.offsetParent
    }

    <span class="hljs-keyword">return</span> {
        <span class="hljs-keyword">left</span>,
        top
    }
}
</code></pre>
<p>一直找到没有父元素的时候，就找到元素距离document的距离了</p>
<h1 id="articleHeader4">3、trigger函数</h1>
<p>在better-scroll的源码中，多次用到trigger函数，我们来看看他都做了什么</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" BScroll.prototype.trigger = function (type) {
        let events = this._events[type]
        if (!events) {
            return
        }

        let len = events.length
        let eventsCopy = [...events]
        for (let i = 0; i < len; i++) {
            let event = eventsCopy[i]
            let [fn, context] = event
            if (fn) {
                fn.apply(context, [].slice.call(arguments,1))
            }
        }
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code> BScroll<span class="hljs-variable">.prototype</span><span class="hljs-variable">.trigger</span> = <span class="hljs-keyword">function</span> (<span class="hljs-keyword">type</span>) {
        <span class="hljs-keyword">let</span> events = <span class="hljs-keyword">this</span><span class="hljs-variable">._events</span>[<span class="hljs-keyword">type</span>]
        <span class="hljs-keyword">if</span> (!events) {
            <span class="hljs-keyword">return</span>
        }

        <span class="hljs-keyword">let</span> len = events<span class="hljs-variable">.length</span>
        <span class="hljs-keyword">let</span> eventsCopy = [..<span class="hljs-variable">.events</span>]
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; len; i++) {
            <span class="hljs-keyword">let</span> <span class="hljs-keyword">event</span> = eventsCopy[i]
            <span class="hljs-keyword">let</span> [fn, <span class="hljs-keyword">context</span>] = <span class="hljs-keyword">event</span>
            <span class="hljs-keyword">if</span> (fn) {
                fn<span class="hljs-variable">.apply</span>(<span class="hljs-keyword">context</span>, []<span class="hljs-variable">.slice</span><span class="hljs-variable">.call</span>(arguments,<span class="hljs-number">1</span>))
            }
        }
  }
</code></pre>
<p>trigger函数的作用就是切换到某个事件中，获取到事件，然后使用fn进行调用。没什么太大难度，这里想到一点能够体现es6的优越性的地方，比如a = [1,2,3] 在es5中如果我们需要获取a这个数组长度的时候，我们需要这样写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" let len = a.length
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> let len = <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.length</span>
</code></pre>
<p>但是在es6中我们不再需要这样写了，这样写就行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let { length } = a
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">let</span> { <span class="hljs-built_in">length</span> } = a
</code></pre>
<p>如果需要获取其他属性值，就麻瓜式往里边填。这里还涉及一个深拷贝的问题，数组和对象的深拷贝这里不做过多阐述。上述最重要的我认为就是这三个函数</p>
<h2 id="articleHeader5">总结：</h2>
<p>这个better-scroll的源码条理清晰，毕竟滴滴D8的段位摆在那儿，非常适合阅读。还有一些就是我对源码分析的文章的看法。在写这个源码分析的文章的时候，我意识到一个问题，那就是不仅我自己能够看懂，以前我也写过vuex的源码分析，基本就是把代码全部贴上去，写了大概2万字，我现在觉得这种方法欠妥，正确的方式应该就是把重要的部分提取出来，最重要的引导一个思路。把代码整个贴出来，显得繁琐不说，又相当于读者自己把注释看了一遍而已，所以我认为正确的方式是弄出一个思路，读者尝试读源码的时候，能够有一个大概的概念。能够自己理清思路</p>
<p>至于为什么这个标题不写better-scroll的源码分析呢，我怕有些人说有些源码分析的文章就是垃圾，所以至少在字面上进行改变(逃。。。)</p>

                
{{< /raw >}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://segmentfault.com/a/1190000012135906](https://segmentfault.com/a/1190000012135906)

## 原文标题
BetterScroll：可能是目前最好用的移动端滚动插件
