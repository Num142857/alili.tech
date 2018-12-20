---
title: '匠心打造Vue侧滑菜单组件' 
date: 2018-12-21 2:30:11
hidden: true
slug: wkrnz3e43r8
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>本文介绍一个简单的DrawerLayout（类似Android的DrawerLayout）布局组件的实现，基于<a href="http://vuejs.org" rel="nofollow noreferrer" target="_blank">Vue.js</a>。介绍的内容已经制作成 <a href="https://github.com/hjl19911127/vue-drawer-layout" rel="nofollow noreferrer" target="_blank">vue-drawer-layout</a> 组件。</blockquote>
<h2 id="articleHeader0">前言</h2>
<p>大家有兴趣先用手机扫一扫这个二维码，或者<a href="http://chat.codehuang.com/message" rel="nofollow noreferrer" target="_blank">点我</a><br><span class="img-wrap"><img data-src="/img/remote/1460000012472642?w=132&amp;h=132" src="https://static.alili.tech/img/remote/1460000012472642?w=132&amp;h=132" alt="试一试" title="试一试" style="cursor: pointer; display: inline;"></span></p>
<p>然后点击页面中左上角的头像打开drawer或者向右向左拖拽，就可以看到下面gif的效果，打开自己的手机QQ，是不是很像:)<br><span class="img-wrap"><img data-src="/img/remote/1460000012472643" src="https://static.alili.tech/img/remote/1460000012472643" alt="演示" title="演示" style="cursor: pointer;"></span></p>
<p>谷歌官方把这种布局叫做DrawerLayout（抽屉式导航栏）。那么我们要如何实现呢，好了正片开始！</p>
<h2 id="articleHeader1">HTML结构</h2>
<p>页面结构很简单，一个抽屉，一个主容器，内容可以利用slot支持外部自行定制。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;drawer-layout&quot;>
    <!--抽屉-->
    <div class=&quot;drawer-wrap&quot;>
        <slot name=&quot;drawer&quot;></slot>
    </div>
    <!--主容器-->
    <div class=&quot;content-wrap&quot;>
        <!--遮罩-->
        <div class=&quot;drawer-mask&quot;></div>
        <slot name=&quot;content&quot;></slot>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"drawer-layout"</span>&gt;</span>
    <span class="hljs-comment">&lt;!--抽屉--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"drawer-wrap"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"drawer"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!--主容器--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content-wrap"</span>&gt;</span>
        <span class="hljs-comment">&lt;!--遮罩--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"drawer-mask"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"content"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>抽屉一开始是隐藏在左侧屏幕外的，故设置<code>left:-100%</code>使其整个都藏在外部</p>
<h2 id="articleHeader2">使用Touch</h2>
<p>首先，判断浏览器是否支持<code>touchEvent</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let isTouch = 'ontouchstart' in window;
    let mouseEvents = isTouch ?
        {
            down: 'touchstart',
            move: 'touchmove',
            up: 'touchend',
            over: 'touchstart',
            out: 'touchend'
        } :
        {
            down: 'mousedown',
            move: 'mousemove',
            up: 'mouseup',
            over: 'mouseover',
            out: 'mouseout'
        };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    <span class="hljs-keyword">let</span> isTouch = <span class="hljs-string">'ontouchstart'</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span>;
    <span class="hljs-keyword">let</span> mouseEvents = isTouch ?
        {
            <span class="hljs-attr">down</span>: <span class="hljs-string">'touchstart'</span>,
            <span class="hljs-attr">move</span>: <span class="hljs-string">'touchmove'</span>,
            <span class="hljs-attr">up</span>: <span class="hljs-string">'touchend'</span>,
            <span class="hljs-attr">over</span>: <span class="hljs-string">'touchstart'</span>,
            <span class="hljs-attr">out</span>: <span class="hljs-string">'touchend'</span>
        } :
        {
            <span class="hljs-attr">down</span>: <span class="hljs-string">'mousedown'</span>,
            <span class="hljs-attr">move</span>: <span class="hljs-string">'mousemove'</span>,
            <span class="hljs-attr">up</span>: <span class="hljs-string">'mouseup'</span>,
            <span class="hljs-attr">over</span>: <span class="hljs-string">'mouseover'</span>,
            <span class="hljs-attr">out</span>: <span class="hljs-string">'mouseout'</span>
        };</code></pre>
<p>绑定<code>touchdown</code>事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    document.addEventListener(mouseEvents.down, initDrag, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">    <span class="hljs-built_in">document</span>.addEventListener(mouseEvents.down, initDrag, <span class="hljs-literal">false</span>);</code></pre>
<p>先定义一些变量，手指按下的x坐标记为<code>startX</code>，滑动中手指的位置x坐标记为<code>nowX</code>，drawer的x坐标偏移量记为<code>startPos</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let startX, nowX, startPos;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> startX, nowX, startPos;</code></pre>
<p>触发<code>touchstart</code>时，记录起始位置并绑定<code>touchmove</code>，注意：如果是<code>mouseEvent</code>，通过<code>e.clientX</code>来获取当前的x坐标，如果是<code>touchEvent</code>，要通过<code>e.changedTouches[0].clientX</code>来获取x坐标</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const initDrag = function (e) {
    startX = e.clientX || e.changedTouches[0].clientX; //记录手指按下的位置
    startPos = this.pos; //记录drawer的上次位置
    document.addEventListener(mouseEvents.move, drag, false);
    document.addEventListener(mouseEvents.up, removeDrag, false);
}.bind(this);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> initDrag = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    startX = e.clientX || e.changedTouches[<span class="hljs-number">0</span>].clientX; <span class="hljs-comment">//记录手指按下的位置</span>
    startPos = <span class="hljs-keyword">this</span>.pos; <span class="hljs-comment">//记录drawer的上次位置</span>
    <span class="hljs-built_in">document</span>.addEventListener(mouseEvents.move, drag, <span class="hljs-literal">false</span>);
    <span class="hljs-built_in">document</span>.addEventListener(mouseEvents.up, removeDrag, <span class="hljs-literal">false</span>);
}.bind(<span class="hljs-keyword">this</span>);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const drag = function (e) {
    nowX = e.clientX || e.changedTouches[0].clientX; //滑动中手指的位置x坐标
    let pos = startPos + nowX - startX; 
    pos = Math.min(width, pos); //不能超过滑动最大值
    pos = Math.max(0, pos); //不能小于0
    this.pos = pos; //设置滚动距离为拖动的距离
}.bind(this);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> drag = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    nowX = e.clientX || e.changedTouches[<span class="hljs-number">0</span>].clientX; <span class="hljs-comment">//滑动中手指的位置x坐标</span>
    <span class="hljs-keyword">let</span> pos = startPos + nowX - startX; 
    pos = <span class="hljs-built_in">Math</span>.min(width, pos); <span class="hljs-comment">//不能超过滑动最大值</span>
    pos = <span class="hljs-built_in">Math</span>.max(<span class="hljs-number">0</span>, pos); <span class="hljs-comment">//不能小于0</span>
    <span class="hljs-keyword">this</span>.pos = pos; <span class="hljs-comment">//设置滚动距离为拖动的距离</span>
}.bind(<span class="hljs-keyword">this</span>);</code></pre>
<p>那么，手指滑动的距离就是<code>nowX - startX</code>，当前drawer的位置为<code>startPos + nowX - startX</code>，这样抽屉已经跟随手指向右移动了，并且不会超过我们设置的拖动最大值。</p>
<h2 id="articleHeader3">区分垂直滑动和水平滑动</h2>
<p>接下来你会发现一个问题，当手指垂直滚动主内容时，向右滑动手指也会拖出抽屉，这时应该做一件事：区分垂直滑动和水平滑动</p>
<p>当然，办法有很多，这里先介绍一种利用三角函数来判定的方法<br><span class="img-wrap"><img data-src="/img/remote/1460000012472644?w=220&amp;h=178" src="https://static.alili.tech/img/remote/1460000012472644?w=220&amp;h=178" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>假设，上图中的每个箭头是手指滑动的方向，绿色箭头代表可以拖出抽屉，红色箭头代表不可以拖出（注意，红色箭头也是有x坐标的偏移量的）。即当不可以拖出抽屉时，应触发默认事件，比如垂直方向的滚动等等。</p>
<p>当手指按下触发<code>touchstart</code>时，记录初始位置P<sub>0</sub>；当滑动手指时，触发的第一次<code>touchmove</code>时，记录位置P<sub>1</sub>，我们将P<sub>0</sub>到P<sub>1</sub>的矢量记为S（原谅我这个灵魂画手）<br><span class="img-wrap"><img data-src="/img/remote/1460000012472646?w=364&amp;h=242" src="https://static.alili.tech/img/remote/1460000012472646?w=364&amp;h=242" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这时候很容易看出，∠θ大于某个值时，比如30度，就可能是垂直方向的滚动操作而不是拖动抽屉。所以，可以根据<code>y/x&gt;tan30°</code>得到判断条件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (isVerticle === undefined) isVerticle = Math.abs(nowY - startY) / Math.abs(nowX - startX) > (Math.sqrt(3) / 3);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">if</span> (isVerticle === <span class="hljs-literal">undefined</span>) isVerticle = <span class="hljs-built_in">Math</span>.abs(nowY - startY) / <span class="hljs-built_in">Math</span>.abs(nowX - startX) &gt; (<span class="hljs-built_in">Math</span>.sqrt(<span class="hljs-number">3</span>) / <span class="hljs-number">3</span>);</code></pre>
<p>当<code>isVerticle</code>为<code>true</code>时，不执行drawer的拖动</p>
<h2 id="articleHeader4">让Drawer动起来</h2>
<p>我们使用css3的<code>transition</code>属性使drawer具有过渡动画效果，这里写一个<code>moving</code>类</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".moving
    transition transform .3s ease" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="stylus hljs"><code class="stylus"><span class="hljs-selector-class">.moving</span>
    <span class="hljs-attribute">transition</span> transform .<span class="hljs-number">3s</span> ease</code></pre>
<p>别忘了加上class绑定，拖动时是不需要过渡动画的（要跟随手指），而松开手指时才需要过渡动画。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;drawer-wrap&quot; :class=&quot;{'moving':moving,'will-change':willChange}&quot;
     :style=&quot;{width:`${width}px`,left:`-${width)}px`,transform:`translate3d(${pos}px,0,0)`}&quot;>
    <slot name=&quot;drawer&quot;></slot>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"drawer-wrap"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'moving':moving,'will-change':willChange}"</span>
     <span class="hljs-attr">:style</span>=<span class="hljs-string">"{width:`${width}px`,left:`-${width)}px`,transform:`translate3d(${pos}px,0,0)`}"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"drawer"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>所以绑定<code>touchend</code>事件的方法时要做这些步骤</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const removeDrag = function (e) {
    if (isVerticle !== undefined) {
        if (!isVerticle) {//当判定为抽屉拖动才进入
            let pos = this.pos;
            this.visible = pos > width * 3 / 5 //当前位置如果大于总宽度的3/5就判定为全部展开抽屉，否则将抽屉弹回隐藏
            if (this.pos > 0 &amp;&amp; this.pos < width) this.moving = true;//如果位置已经处于最小值或最大值处，不需要有动画效果了
        }
        this.pos = this.visible ? width : 0;
    }
    if (!this.moving) {
        this.willChange = false; //留个悬念
    }
    isVerticle = undefined;
    //取消touchmove和touchend事件绑定
    document.removeEventListener(mouseEvents.move, drag, false);
    document.removeEventListener(mouseEvents.up, removeDrag, false);
}.bind(this);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> removeDrag = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    <span class="hljs-keyword">if</span> (isVerticle !== <span class="hljs-literal">undefined</span>) {
        <span class="hljs-keyword">if</span> (!isVerticle) {<span class="hljs-comment">//当判定为抽屉拖动才进入</span>
            <span class="hljs-keyword">let</span> pos = <span class="hljs-keyword">this</span>.pos;
            <span class="hljs-keyword">this</span>.visible = pos &gt; width * <span class="hljs-number">3</span> / <span class="hljs-number">5</span> <span class="hljs-comment">//当前位置如果大于总宽度的3/5就判定为全部展开抽屉，否则将抽屉弹回隐藏</span>
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.pos &gt; <span class="hljs-number">0</span> &amp;&amp; <span class="hljs-keyword">this</span>.pos &lt; width) <span class="hljs-keyword">this</span>.moving = <span class="hljs-literal">true</span>;<span class="hljs-comment">//如果位置已经处于最小值或最大值处，不需要有动画效果了</span>
        }
        <span class="hljs-keyword">this</span>.pos = <span class="hljs-keyword">this</span>.visible ? width : <span class="hljs-number">0</span>;
    }
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.moving) {
        <span class="hljs-keyword">this</span>.willChange = <span class="hljs-literal">false</span>; <span class="hljs-comment">//留个悬念</span>
    }
    isVerticle = <span class="hljs-literal">undefined</span>;
    <span class="hljs-comment">//取消touchmove和touchend事件绑定</span>
    <span class="hljs-built_in">document</span>.removeEventListener(mouseEvents.move, drag, <span class="hljs-literal">false</span>);
    <span class="hljs-built_in">document</span>.removeEventListener(mouseEvents.up, removeDrag, <span class="hljs-literal">false</span>);
}.bind(<span class="hljs-keyword">this</span>);</code></pre>
<p>上面你可能发现代码里有个<code>this.willChange = false</code>，它是干啥的捏？下面我们请出css的<code>will-change</code>大法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".will-change
    will-change transform" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="stylus hljs"><code class="stylus"><span class="hljs-selector-class">.will-change</span>
    will-change <span class="hljs-attribute">transform</span></code></pre>
<blockquote>CSS 属性 will-change 为web开发者提供了一种告知浏览器该元素会有哪些变化的方法，这样浏览器可以在元素属性真正发生变化之前提前做好对应的优化准备工作。 这种优化可以将一部分复杂的计算工作提前准备好，使页面的反应更为快速灵敏。</blockquote>
<p>其实是我们在<code>touchstart</code>可以预先告知浏览器抽屉可能要发生位移</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const initDrag = function (e) {
    //...
    this.willChange = true;
}.bind(this);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> initDrag = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    <span class="hljs-comment">//...</span>
    <span class="hljs-keyword">this</span>.willChange = <span class="hljs-literal">true</span>;
}.bind(<span class="hljs-keyword">this</span>);</code></pre>
<p>当然最后别忘了在<code>transitionend</code>事件后把<code>transition</code>和<code>will-change</code>去掉，让浏览器歇一会儿~</p>
<h2 id="articleHeader5">还有什么可以优化的？</h2>
<p>上面说的已经基本上把主要功能实现了，但是这其中还有没有哪里可以优化的？<br><span class="img-wrap"><img data-src="/img/remote/1460000012472647?w=1484&amp;h=28" src="https://static.alili.tech/img/remote/1460000012472647?w=1484&amp;h=28" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>咦？<code>passive</code>是什么鬼？</p>
<blockquote>网站使用被动事件侦听器以提升滚动性能，在您的触摸和滚轮事件侦听器上设置 passive 选项可提升滚动性能 <a href="https://developers.google.com/web/tools/lighthouse/audits/passive-event-listeners?hl=zh-cn" rel="nofollow noreferrer" target="_blank">具体看这里</a>
</blockquote>
<p>原来这是现代浏览器的一个新特性，我们需要以新的方式来绑定我们的touch事件，当然首先先检测一下是否支持<code>passive</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const supportsPassive = (() => {
    let supportsPassive = false;
    try {
        const opts = Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassive = true;
            }
        });
        window.addEventListener(&quot;test&quot;, null, opts);
    } catch (e) {
    }
    return supportsPassive;
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> supportsPassive = <span class="hljs-function">(<span class="hljs-params">(</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> supportsPassive = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> opts = <span class="hljs-built_in">Object</span>.defineProperty({}, <span class="hljs-string">'passive'</span>, {
            <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                supportsPassive = <span class="hljs-literal">true</span>;
            }
        });
        <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">"test"</span>, <span class="hljs-literal">null</span>, opts);
    } <span class="hljs-keyword">catch</span> (e) {
    }
    <span class="hljs-keyword">return</span> supportsPassive;
})();</code></pre>
<p>于是我们的绑定事件代码变成这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.addEventListener(mouseEvents.move, drag, supportsPassive ? {passive: true} : false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.addEventListener(mouseEvents.move, drag, supportsPassive ? {<span class="hljs-attr">passive</span>: <span class="hljs-literal">true</span>} : <span class="hljs-literal">false</span>);</code></pre>
<p>是否有效果呢？有兴趣的朋友可以<a href="https://developers.google.com/web/updates/2016/06/passive-event-listeners?hl=zh-cn" rel="nofollow noreferrer" target="_blank">点这里</a>看国外大神的视频</p>
<h2 id="articleHeader6">写在最后</h2>
<p>本文介绍了实现抽屉式导航栏的主要过程，详细代码已封装成<a href="https://github.com/hjl19911127/vue-drawer-layout" rel="nofollow noreferrer" target="_blank">vue-drawer-layout</a>组件，支持更丰富的定制和使用方式，具体文档可以访问我的<a href="https://github.com/hjl19911127/vue-drawer-layout" rel="nofollow noreferrer" target="_blank">github</a>或者<a href="https://www.npmjs.com/package/vue-drawer-layout" rel="nofollow noreferrer" target="_blank">npm</a>官网检索。欢迎各位多多提issue，不吝赐教，感谢！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
匠心打造Vue侧滑菜单组件

## 原文链接
[https://segmentfault.com/a/1190000012472637](https://segmentfault.com/a/1190000012472637)

