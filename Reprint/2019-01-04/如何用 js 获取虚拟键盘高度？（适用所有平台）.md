---
title: '如何用 js 获取虚拟键盘高度？（适用所有平台）' 
date: 2019-01-04 2:30:10
hidden: true
slug: 13ccopgj61if
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>这是一个存在很久的历史问题了，对于这样一个具有普遍性的问题浏览器偏偏没有给出解决方案，what？没有方案还聊个什么？</p>
<p>别急，别急，接下来我们一起来扒一扒关于软键盘高度和 input 的问题</p>
<p>我们先来看一个短片认识一下这个问题</p>
<p><span class="img-wrap"><img data-src="/img/bVSX7O?w=480&amp;h=262" src="https://static.alili.tech/img/bVSX7O?w=480&amp;h=262" alt="js 获取软键盘高度，解决第三方输入法遮挡底部input及android键盘回落后留白问题" title="js 获取软键盘高度，解决第三方输入法遮挡底部input及android键盘回落后留白问题" style="cursor: pointer; display: inline;"></span></p>
<p><strong>问题描述：</strong>当操作者进行输入操作的时候，弹起的软键盘把原本的输入框遮挡了，导致操作者看不到操作结果</p>
<h2 id="articleHeader1">以往的解决方案</h2>
<p>以往的解决方案：</p>
<ol>
<li><p>修改网站的页面布局，比如本例中 twitter 尽量把 input 放置在中部以上的位置，从布局上尽量避免此类问题</p></li>
<li><p>在一些指定设备和浏览器中<strong>异步获取</strong> <code>window.innerHeight</code> 进行前后对比而得出键盘高度</p></li>
</ol>
<p>再来看一下另一种常见输入框的页面布局：</p>
<p><span class="img-wrap"><img data-src="/img/bVSY6w?w=320&amp;h=550" src="https://static.alili.tech/img/bVSY6w?w=320&amp;h=550" alt="js 获取软键盘高度，解决第三方输入法遮挡底部input及android键盘回落后留白问题" title="js 获取软键盘高度，解决第三方输入法遮挡底部input及android键盘回落后留白问题" style="cursor: pointer;"></span></p>
<p>在这个场景里，输入框定位在页面的最底部，当软键盘弹起时整个视图窗口页面向上卷动，到达最底部时停止。恰巧当我们用 h5 来模拟这个效果的时候刚好勉强做到。</p>
<p>这是因为当你首次 fouse 到输入框的时候软键盘弹出，浏览器会使页面会向上滚动，以确保 input 是可见的，该特性和 <code>document.body.scrollIntoViewIfNeeded</code> 方法是一致的，但是当你 body 的可滚动高度超过窗口高度时还会产生另一个问题：<strong>固定元素将随页面滚动</strong> 如下图</p>
<p><span class="img-wrap"><img data-src="/img/bVS160?w=1024&amp;h=768" src="https://static.alili.tech/img/bVS160?w=1024&amp;h=768" alt="js 获取软键盘高度，解决第三方输入法遮挡底部input及android键盘回落后留白问题" title="js 获取软键盘高度，解决第三方输入法遮挡底部input及android键盘回落后留白问题" style="cursor: pointer;"></span></p>
<p>因此浏览器关心的只是 input 是否被覆盖？实际上是 input 中的光标位置！那么这就解释了为什么输入框在底部的时候刚好勉强完成了，因为 input 在页面的底部时，软键盘弹出势必会遮挡住 input，因而浏览器会向上滚动至输入框可见的位置。</p>
<p>但是如下图的效果这样就无法做到了，因为在输入框的下面还有一行工具栏，也就是说输入框并非在最底部的位置，那么浏览器在滚动到可视位置时只会确保到 input 可见，而对于工具栏是否可见则并不在浏览器的考虑范围内。</p>
<p><span class="img-wrap"><img data-src="/img/bVSY6c?w=320&amp;h=550" src="https://static.alili.tech/img/bVSY6c?w=320&amp;h=550" alt="js 获取软键盘高度，解决第三方输入法遮挡底部input及android键盘回落后留白问题" title="js 获取软键盘高度，解决第三方输入法遮挡底部input及android键盘回落后留白问题" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">IOING 的解决方案分析</h2>
<p>综合来看上面两种布局方案的问题，都不能完美解决输入被键盘遮挡和底部 footer 不能被顶起的问题，那是不是就没得法子了？</p>
<p>当然号称可以让 HTML5 表现更接近 Native 的 IOING 引擎一定是有解决方案的</p>
<p>我们先来看一段 input 在 IOING 中的表现</p>
<p><span class="img-wrap"><img data-src="/img/bVS0ie?w=320&amp;h=566" src="https://static.alili.tech/img/bVS0ie?w=320&amp;h=566" alt="解决第三方输入法遮挡底部input及android键盘回落后留白问题" title="解决第三方输入法遮挡底部input及android键盘回落后留白问题" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVS0hx?w=320&amp;h=566" src="https://static.alili.tech/img/bVS0hx?w=320&amp;h=566" alt="解决第三方输入法遮挡底部input及android键盘回落后留白问题" title="解决第三方输入法遮挡底部input及android键盘回落后留白问题" style="cursor: pointer; display: inline;"></span></p>
<p>我们可以看到在输入过程中页面通过滚动来始终保持光标位于可视区域的中心位置，因此在这里我们需要提一个知识点：<code>获取输入光标的实时位置</code>，当然这也是一个曲折的过程，在这里我就不扩算话题了，继续来讲原话题</p>
<p>前面说了三个主要的传统解决方案：</p>
<ol>
<li><p>第一个是通过把 input 布局尽量放在页面顶部，显然这个不是我们想要的，否决掉</p></li>
<li><p>把 input 放在最底部，用来完成 footer 固定的效果，但是要局限页面高度不超过窗口高度，我们可以通过自制滚动控件来解除这个限制，那现在需要解决的技术点就变为实现一个模拟滚动控件</p></li>
<li>
<p>通过比对软键盘弹出前后的 <code>window.innerHeight</code> 的高度差来得到键盘高度，从而根据这个高度来实现底部定位和输入剧中，但是该方法局限于不同设备平台的支持</p>
<p>综上所述我们总结一下我们要解决的思路和步骤</p>
<p>先来看一下下面的图片</p>
</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bVS0E3?w=1280&amp;h=1780" src="https://static.alili.tech/img/bVS0E3?w=1280&amp;h=1780" alt="解决第三方输入法遮挡底部input及android键盘回落后留白问题" title="解决第三方输入法遮挡底部input及android键盘回落后留白问题" style="cursor: pointer; display: inline;"></span></p>
<p>当键盘弹出时，<code>键盘高度</code> = <code>不可见窗口高度</code><br>这个等式是有条件的，只有当 input 在对底部时该等式才成立 （这是上面讲过的 scrollIntoViewIfNeeded 的原因）</p>
<p>思考：如果我们能让该等式成立，且能够获取不可见位置高度，是否就能得出键盘高度了呢</p>
<p>我们整理好思路一步一步来实现</p>
<p>1.需要将内容放置在虚拟滚动中，在 IOING 像下面这样就可以创建一个虚拟滚动区域了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<scroll>
<scrolling>
    页面内容
</scrolling>
</scroll>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">scroll</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">scrolling</span>&gt;</span>
    页面内容
<span class="hljs-tag">&lt;/<span class="hljs-name">scrolling</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">scroll</span>&gt;</span></code></pre>
<p>传统页面可以使用 WebKit 私有属性“<code>-webkit-overflow-scrolling: touch</code>” 来允许独立的滚动区域和触摸回弹，或者使用 iScroll.js 等第三方库来完成，但是需要注意对 iScroll 使用不当可能会造成性能问题</p>
<p>2.获取光标位于屏幕中的位置</p>
<p>3.当光标 <code>fouce</code> 时，键盘弹起，若 input 被遮挡页面会进行滚动，但滚动量不确定，因此我们可以强制滚动到底端，即键盘完全弹出后主动使窗口向上滚动窗口高度的距离，而实际上窗口只能向上滚动到最底部位置后就不能再向上滚动了，此时获取页面的 <code>top.scrollY</code> 即为实际键盘高度</p>
<p><strong>得出公式：</strong></p>
<p><code>可视区域的中心位置</code> = <code>键盘高度</code> + <code>(窗口高 - 键盘高度)／2 </code><br><code>应滚动距离</code> = <code>可视区域的中心位置</code> - <code>光标offsetTop</code> - <code>(光标被遮挡 ？键盘高度 ：0)</code></p>
<p>当然实际操作需要更多的细节，<strong>po 出 IOING 中该部分逻辑实现的源代码:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// IOING 中部分源代码
// dom 为 input 元素
// scroll 为滚动容器的 Scroll 对象

function scrollTo (y, _y, t, s, r) {
    r = r == undefined ? 1 : r
    y = y == undefined ? top.scrollY : y
    if ( r == 1 ? y > _y : y < _y) return
    s = s == undefined ? Math.abs((_y - y) / t * 17.6) : s
    rAF(function () {
        top.scrollTo(0, y += r*s)
        scrollTo(y, _y, t, s, r)
    })
}

function visibility () {
    if ( this.moving || this.wheeling ) {
        var top = dom.offset().top
        var height = dom.offsetHeight
        var viewTop = keyboardHeight + scrollOffsetTop
        var viewBottom = factWindowHeight - scrollOffsetBottom

        if ( top + height <= viewTop || top >= viewBottom ) {
            dom.blur()
        }
    }
}

function refreshCursor () {
    rAF(function () {
        dom.getSelectionRangeInsert('')
    })
}

function getScroll () {
    var scroller = reactScroller || dom.closest('scroll')

    scroll = scroller ? scroller.scrollEvent : null

    if ( type == 1 ) {
        minScrollY = scroll.minScrollY
    }
}

function getViewOffset () {
    // android : (top.scrollY == 0 ? keyboardHeight : 0)
    viewOffset = viewCenter - rangeOffset.top - (top.scrollY == 0 ? keyboardHeight : 0) + (that.module.config.sandbox ? keyboardHeight : 0)
    
    return viewOffset
}

function keyboardUp (e) {
    getScroll(1)

    if ( !scroll ) return

    // refresh cursor "{{"

        if ( device.os.ios &amp;&amp; device.os.iosVersion < 12 ) {
            scroll.on('scroll scrollend', refreshCursor)
        }

    // "}}"
    
    if ( normal ) return

    function upend (e) {

        window.keyboard.height = keyboardHeight = top.scrollY || factWindowHeight - top.innerHeight

        // change minScrollY

        scroll.minScrollY = minScrollY + keyboardHeight
        scroll.options.minScrollY = scroll.minScrollY

        // 光标位置
        
        rangeOffset = dom.getSelectionRangeOffset()

        // 可见视图的中心

        viewWrapper = factWindowHeight - keyboardHeight - scrollOffsetTop - scrollOffsetBottom
        viewCenter = keyboardHeight + viewWrapper / 2

        scroll.scrollBy(0, getViewOffset(), 600, null, false)

        // 滚动到不可见区域时 blur
        
        scroll.on('scroll', visibility)

        window.trigger('keyboardup', { 
            height : keyboardHeight 
        })

        if ( reactResize ) {
            scrollTo(null, 0, 300, null, -1)
        }
    }

    setTimeout(function () {

        top.one('scrollend', upend)

        // no scroll
        
        setTimeout(function () {
            if ( keyboardHeight == 0 ) upend() 
        }, 300)

        // ``` old
        
        var offset = 0

        if ( device.os.mobileSafari &amp;&amp; device.os.iosVersion < 12 ) {
            offset = 24 * viewportScale
        }

        // scroll to bottom

        scrollTo(null, viewportHeight - offset, 300, null, 1)

    }, 300)
}

function keyboardDown () {
    getScroll()

    if ( !scroll ) return

    // ``` old : refresh cursor "{{"

        if ( device.os.ios &amp;&amp; device.os.iosVersion < 11 ) {
            scroll.off('scroll scrollend', refreshCursor)
        }

    // "}}"

    if ( normal ) return
    if ( keyboardHeight == 0 ) return false

    top.scrollTo(0, 0)
    scroll.wrapper.scrollTop = 0
    
    // change minScrollY

    scroll.minScrollY = minScrollY
    scroll.options.minScrollY = minScrollY
    scroll.off('scroll', visibility)
    scroll._refresh()

    window.keyboard.height = keyboardHeight = 0
}

function selectionRange (e) {
    getScroll()

    if ( !scroll ) return

    // 非箭头按键取消
    
    if ( e.type == 'keyup' &amp;&amp; ![8, 13, 37, 38, 39, 40].consistOf(e.keyCode) ) return

    // 重置光标位置

    if ( reactOffset ) {
        rangeOffset = dom.getSelectionRangeOffset()
    } else if ( reactPosition ) {
        rangeOffset = dom.getSelectionRangePosition()
    }

    if ( reactOrigin &amp;&amp; rangeOffset ) {
        rangeOffset.each(function (i, v) {
            scope.setValueOfHref(reactOrigin + '.' + i, v)
        })
    }

    if ( normal ) return

    // 光标居中

    if ( e.type == 'input' &amp;&amp; e.timeStamp - timeStamp < 2000 ) return
    if ( !scroll || !viewCenter ) return
    if ( !reactOffset ) {
        rangeOffset = dom.getSelectionRangeOffset()
    }

    timeStamp = e.timeStamp

    scroll.scrollBy(0, getViewOffset(), 400, null, false)
}

dom.on('click', checkChange)
dom.on('focus', keyboardUp)
dom.on('blur', keyboardDown)
dom.on('focus keyup input paste mouseup', selectionRange)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// IOING 中部分源代码</span>
<span class="hljs-comment">// dom 为 input 元素</span>
<span class="hljs-comment">// scroll 为滚动容器的 Scroll 对象</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">scrollTo</span> (<span class="hljs-params">y, _y, t, s, r</span>) </span>{
    r = r == <span class="hljs-literal">undefined</span> ? <span class="hljs-number">1</span> : r
    y = y == <span class="hljs-literal">undefined</span> ? top.scrollY : y
    <span class="hljs-keyword">if</span> ( r == <span class="hljs-number">1</span> ? y &gt; _y : y &lt; _y) <span class="hljs-keyword">return</span>
    s = s == <span class="hljs-literal">undefined</span> ? <span class="hljs-built_in">Math</span>.abs((_y - y) / t * <span class="hljs-number">17.6</span>) : s
    rAF(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        top.scrollTo(<span class="hljs-number">0</span>, y += r*s)
        scrollTo(y, _y, t, s, r)
    })
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">visibility</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> ( <span class="hljs-keyword">this</span>.moving || <span class="hljs-keyword">this</span>.wheeling ) {
        <span class="hljs-keyword">var</span> top = dom.offset().top
        <span class="hljs-keyword">var</span> height = dom.offsetHeight
        <span class="hljs-keyword">var</span> viewTop = keyboardHeight + scrollOffsetTop
        <span class="hljs-keyword">var</span> viewBottom = factWindowHeight - scrollOffsetBottom

        <span class="hljs-keyword">if</span> ( top + height &lt;= viewTop || top &gt;= viewBottom ) {
            dom.blur()
        }
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">refreshCursor</span> (<span class="hljs-params"></span>) </span>{
    rAF(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        dom.getSelectionRangeInsert(<span class="hljs-string">''</span>)
    })
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getScroll</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> scroller = reactScroller || dom.closest(<span class="hljs-string">'scroll'</span>)

    scroll = scroller ? scroller.scrollEvent : <span class="hljs-literal">null</span>

    <span class="hljs-keyword">if</span> ( type == <span class="hljs-number">1</span> ) {
        minScrollY = scroll.minScrollY
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getViewOffset</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// android : (top.scrollY == 0 ? keyboardHeight : 0)</span>
    viewOffset = viewCenter - rangeOffset.top - (top.scrollY == <span class="hljs-number">0</span> ? keyboardHeight : <span class="hljs-number">0</span>) + (that.module.config.sandbox ? keyboardHeight : <span class="hljs-number">0</span>)
    
    <span class="hljs-keyword">return</span> viewOffset
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">keyboardUp</span> (<span class="hljs-params">e</span>) </span>{
    getScroll(<span class="hljs-number">1</span>)

    <span class="hljs-keyword">if</span> ( !scroll ) <span class="hljs-keyword">return</span>

    <span class="hljs-comment">// refresh cursor "{{"</span>

        <span class="hljs-keyword">if</span> ( device.os.ios &amp;&amp; device.os.iosVersion &lt; <span class="hljs-number">12</span> ) {
            scroll.on(<span class="hljs-string">'scroll scrollend'</span>, refreshCursor)
        }

    <span class="hljs-comment">// "}}"</span>
    
    <span class="hljs-keyword">if</span> ( normal ) <span class="hljs-keyword">return</span>

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">upend</span> (<span class="hljs-params">e</span>) </span>{

        <span class="hljs-built_in">window</span>.keyboard.height = keyboardHeight = top.scrollY || factWindowHeight - top.innerHeight

        <span class="hljs-comment">// change minScrollY</span>

        scroll.minScrollY = minScrollY + keyboardHeight
        scroll.options.minScrollY = scroll.minScrollY

        <span class="hljs-comment">// 光标位置</span>
        
        rangeOffset = dom.getSelectionRangeOffset()

        <span class="hljs-comment">// 可见视图的中心</span>

        viewWrapper = factWindowHeight - keyboardHeight - scrollOffsetTop - scrollOffsetBottom
        viewCenter = keyboardHeight + viewWrapper / <span class="hljs-number">2</span>

        scroll.scrollBy(<span class="hljs-number">0</span>, getViewOffset(), <span class="hljs-number">600</span>, <span class="hljs-literal">null</span>, <span class="hljs-literal">false</span>)

        <span class="hljs-comment">// 滚动到不可见区域时 blur</span>
        
        scroll.on(<span class="hljs-string">'scroll'</span>, visibility)

        <span class="hljs-built_in">window</span>.trigger(<span class="hljs-string">'keyboardup'</span>, { 
            <span class="hljs-attr">height</span> : keyboardHeight 
        })

        <span class="hljs-keyword">if</span> ( reactResize ) {
            scrollTo(<span class="hljs-literal">null</span>, <span class="hljs-number">0</span>, <span class="hljs-number">300</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">-1</span>)
        }
    }

    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{

        top.one(<span class="hljs-string">'scrollend'</span>, upend)

        <span class="hljs-comment">// no scroll</span>
        
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span> ( keyboardHeight == <span class="hljs-number">0</span> ) upend() 
        }, <span class="hljs-number">300</span>)

        <span class="hljs-comment">// ``` old</span>
        
        <span class="hljs-keyword">var</span> offset = <span class="hljs-number">0</span>

        <span class="hljs-keyword">if</span> ( device.os.mobileSafari &amp;&amp; device.os.iosVersion &lt; <span class="hljs-number">12</span> ) {
            offset = <span class="hljs-number">24</span> * viewportScale
        }

        <span class="hljs-comment">// scroll to bottom</span>

        scrollTo(<span class="hljs-literal">null</span>, viewportHeight - offset, <span class="hljs-number">300</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">1</span>)

    }, <span class="hljs-number">300</span>)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">keyboardDown</span> (<span class="hljs-params"></span>) </span>{
    getScroll()

    <span class="hljs-keyword">if</span> ( !scroll ) <span class="hljs-keyword">return</span>

    <span class="hljs-comment">// ``` old : refresh cursor "{{"</span>

        <span class="hljs-keyword">if</span> ( device.os.ios &amp;&amp; device.os.iosVersion &lt; <span class="hljs-number">11</span> ) {
            scroll.off(<span class="hljs-string">'scroll scrollend'</span>, refreshCursor)
        }

    <span class="hljs-comment">// "}}"</span>

    <span class="hljs-keyword">if</span> ( normal ) <span class="hljs-keyword">return</span>
    <span class="hljs-keyword">if</span> ( keyboardHeight == <span class="hljs-number">0</span> ) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>

    top.scrollTo(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>)
    scroll.wrapper.scrollTop = <span class="hljs-number">0</span>
    
    <span class="hljs-comment">// change minScrollY</span>

    scroll.minScrollY = minScrollY
    scroll.options.minScrollY = minScrollY
    scroll.off(<span class="hljs-string">'scroll'</span>, visibility)
    scroll._refresh()

    <span class="hljs-built_in">window</span>.keyboard.height = keyboardHeight = <span class="hljs-number">0</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">selectionRange</span> (<span class="hljs-params">e</span>) </span>{
    getScroll()

    <span class="hljs-keyword">if</span> ( !scroll ) <span class="hljs-keyword">return</span>

    <span class="hljs-comment">// 非箭头按键取消</span>
    
    <span class="hljs-keyword">if</span> ( e.type == <span class="hljs-string">'keyup'</span> &amp;&amp; ![<span class="hljs-number">8</span>, <span class="hljs-number">13</span>, <span class="hljs-number">37</span>, <span class="hljs-number">38</span>, <span class="hljs-number">39</span>, <span class="hljs-number">40</span>].consistOf(e.keyCode) ) <span class="hljs-keyword">return</span>

    <span class="hljs-comment">// 重置光标位置</span>

    <span class="hljs-keyword">if</span> ( reactOffset ) {
        rangeOffset = dom.getSelectionRangeOffset()
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( reactPosition ) {
        rangeOffset = dom.getSelectionRangePosition()
    }

    <span class="hljs-keyword">if</span> ( reactOrigin &amp;&amp; rangeOffset ) {
        rangeOffset.each(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">i, v</span>) </span>{
            scope.setValueOfHref(reactOrigin + <span class="hljs-string">'.'</span> + i, v)
        })
    }

    <span class="hljs-keyword">if</span> ( normal ) <span class="hljs-keyword">return</span>

    <span class="hljs-comment">// 光标居中</span>

    <span class="hljs-keyword">if</span> ( e.type == <span class="hljs-string">'input'</span> &amp;&amp; e.timeStamp - timeStamp &lt; <span class="hljs-number">2000</span> ) <span class="hljs-keyword">return</span>
    <span class="hljs-keyword">if</span> ( !scroll || !viewCenter ) <span class="hljs-keyword">return</span>
    <span class="hljs-keyword">if</span> ( !reactOffset ) {
        rangeOffset = dom.getSelectionRangeOffset()
    }

    timeStamp = e.timeStamp

    scroll.scrollBy(<span class="hljs-number">0</span>, getViewOffset(), <span class="hljs-number">400</span>, <span class="hljs-literal">null</span>, <span class="hljs-literal">false</span>)
}

dom.on(<span class="hljs-string">'click'</span>, checkChange)
dom.on(<span class="hljs-string">'focus'</span>, keyboardUp)
dom.on(<span class="hljs-string">'blur'</span>, keyboardDown)
dom.on(<span class="hljs-string">'focus keyup input paste mouseup'</span>, selectionRange)
})</code></pre>
<p>其它的小细节和注意事项：</p>
<ol>
<li><p>safari 会受到浏览器底部导航栏的影响，会产生20多像素误差，需要针对考虑</p></li>
<li><p>safari 中的 input 光标在执行 <code>transform 3d</code>变换的时候会出现光标停滞的现象，需要执行光标刷新操作</p></li>
<li><p>当 input 被操作者主动滑出可视区域外时应处罚键盘收起操作，否则在输入时 <code>scrollIntoViewIfNeeded</code> 效应将导致窗口滚动出现空白的问题</p></li>
</ol>
<p>最后总结：</p>
<p>获取键盘高度只是我们的表象，真正解决 html5 带来的各种问题才是我们的研究课题，也只有扫清这些布局杀手 h5 才能在追赶 Native 的道路上更近一步！</p>
<hr>
<h2 id="articleHeader3">结尾</h2>
<p>最后的最后我来 po 一下在 IOING 中完成这一步我们需要做什么？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input placeholder=写点啥>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">写点啥</span>&gt;</span></code></pre>
<p>就是这么简单，IOING 中 input 默认就能拥有自动居中特性</p>
<p>如果你要取消这个特性，就像下面这样写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input nomal placeholder=写点啥>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">nomal</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">写点啥</span>&gt;</span></code></pre>
<p>当然也可以设置居中相对底部／相对于顶部的偏移位置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input scroll-offset-top=50 placeholder=写点啥>
<input scroll-offset-bottom=50 placeholder=写点啥>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">scroll-offset-top</span>=<span class="hljs-string">50</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">写点啥</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">scroll-offset-bottom</span>=<span class="hljs-string">50</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">写点啥</span>&gt;</span></code></pre>
<p>在输入过程中能够实时输出光标位置，且将位置信息赋值给数据源对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<textarea react-position=&quot;test.range&quot; resize=&quot;none&quot;></textarea>
<p>当前光标位置：left: {test.range.left}, top: {test.range.top}</p>
<!-- test.range 为一个数据源对象 -->
<!-- react-position 指令将把该输入框的光标状态传递给 test.range 对象  -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">react-position</span>=<span class="hljs-string">"test.range"</span> <span class="hljs-attr">resize</span>=<span class="hljs-string">"none"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>当前光标位置：left: {test.range.left}, top: {test.range.top}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-comment">&lt;!-- test.range 为一个数据源对象 --&gt;</span>
<span class="hljs-comment">&lt;!-- react-position 指令将把该输入框的光标状态传递给 test.range 对象  --&gt;</span></code></pre>
<p>用js 获取键盘高度的方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//键盘弹起时为键盘高度，未弹起时为0
console.log(window.keyboard.height)
// 通过键盘弹起事件获取
window.on('keyboardup', function (e) {
    console.log(e.height)
})
// 键盘收起事件
window.on('keyboarddown', function (e) {
    console.log(e.height) // 0
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//键盘弹起时为键盘高度，未弹起时为0</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.keyboard.height)
<span class="hljs-comment">// 通过键盘弹起事件获取</span>
<span class="hljs-built_in">window</span>.on(<span class="hljs-string">'keyboardup'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    <span class="hljs-built_in">console</span>.log(e.height)
})
<span class="hljs-comment">// 键盘收起事件</span>
<span class="hljs-built_in">window</span>.on(<span class="hljs-string">'keyboarddown'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    <span class="hljs-built_in">console</span>.log(e.height) <span class="hljs-comment">// 0</span>
})</code></pre>
<p>详细文档传送门：<a href="http://ioing.com/#docs-dom-input" rel="nofollow noreferrer" target="_blank"></a><a href="http://ioing.com/#docs-dom-input" rel="nofollow noreferrer" target="_blank">http://ioing.com/#docs-dom-input</a><br>GitHub 传送门：<a href="https://github.com/ioing/IOING" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/ioing/IOING" rel="nofollow noreferrer" target="_blank">https://github.com/ioing/IOING</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何用 js 获取虚拟键盘高度？（适用所有平台）

## 原文链接
[https://segmentfault.com/a/1190000010693229](https://segmentfault.com/a/1190000010693229)

