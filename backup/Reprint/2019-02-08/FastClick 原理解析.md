---
title: 'FastClick 原理解析' 
date: 2019-02-08 2:30:40
hidden: true
slug: 6kd5kbi7qlk
categories: [reprint]
---

{{< raw >}}

                    
<p><code>Patience and perseverance will get paid.</code></p>
<p>这段时间开始实习了，在公司做<code>hybrid</code>，专职写js，学习到了不少东西。一直好奇fastclick是如何工作，于是花了几天空余的时间一步步调试代码，学习fastclick。这篇文章可以结合者代码看，希望可以给予需要学习fastclick的人一点思路。</p>
<p>有错误的地方希望指正，thk~</p>
<h2 id="articleHeader0">主流程</h2>
<ol>
<li><p>FastClick.attach()</p></li>
<li><p>FastClick(layer)</p></li>
<li>
<p>初始化化变量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.trackingClick = false; //追踪一个click
this.trackingClickStart = 0; //追踪时间
this.targetElement = null; // 目标元素
this.touchStartX = 0;// X坐标
this.touchStartY = 0;// y坐标
this.lastTouchIndentifier = 0;
this.touchBoundary = 10;//边界条件（是否是一个点击）
this.layer = layer;//layer可以是document.body/document.documentElement" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code class="javascirpt"><span class="hljs-keyword">this</span>.trackingClick = <span class="hljs-literal">false</span>; <span class="hljs-comment">//追踪一个click</span>
<span class="hljs-keyword">this</span>.trackingClickStart = <span class="hljs-number">0</span>; <span class="hljs-comment">//追踪时间</span>
<span class="hljs-keyword">this</span>.targetElement = <span class="hljs-literal">null</span>; <span class="hljs-comment">// 目标元素</span>
<span class="hljs-keyword">this</span>.touchStartX = <span class="hljs-number">0</span>;<span class="hljs-comment">// X坐标</span>
<span class="hljs-keyword">this</span>.touchStartY = <span class="hljs-number">0</span>;<span class="hljs-comment">// y坐标</span>
<span class="hljs-keyword">this</span>.lastTouchIndentifier = <span class="hljs-number">0</span>;
<span class="hljs-keyword">this</span>.touchBoundary = <span class="hljs-number">10</span>;<span class="hljs-comment">//边界条件（是否是一个点击）</span>
<span class="hljs-keyword">this</span>.layer = layer;<span class="hljs-comment">//layer可以是document.body/document.documentElement</span></code></pre>
</li>
<li>
<p>安卓设备绑定鼠标事件（在捕获阶段，为的是第一时间处理到事件）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="layer.addEventListener('mouseover',bind(this.onMouse,this),true);
layer.addEventListener('mousedown',bind(this.onMouse,this),true);
layer.addEventListener('mouseup',bind(this.onMouse,this),true);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">layer.addEventListener(<span class="hljs-string">'mouseover'</span>,bind(<span class="hljs-keyword">this</span>.onMouse,<span class="hljs-keyword">this</span>),<span class="hljs-literal">true</span>);
layer.addEventListener(<span class="hljs-string">'mousedown'</span>,bind(<span class="hljs-keyword">this</span>.onMouse,<span class="hljs-keyword">this</span>),<span class="hljs-literal">true</span>);
layer.addEventListener(<span class="hljs-string">'mouseup'</span>,bind(<span class="hljs-keyword">this</span>.onMouse,<span class="hljs-keyword">this</span>),<span class="hljs-literal">true</span>);</code></pre>
</li>
<li>
<p>绑定touch和click事件（判定是否是click行为，取消之前的click）,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//最先捕获到
layer.addEventListener('click', bind(this.onClick, this), true);
//冒泡阶段捕获
layer.addEventListener('touchstart', bind(this.onTouchStart, this), false);
layer.addEventListener('touchmove', bind(this.onTouchMove, this), false);
layer.addEventListener('touchend', bind(this.onTouchEnd, this), false);
layer.addEventListener('touchcancel', bind(this.onTouchCancel, this), false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//最先捕获到</span>
layer.addEventListener(<span class="hljs-string">'click'</span>, bind(<span class="hljs-keyword">this</span>.onClick, <span class="hljs-keyword">this</span>), <span class="hljs-literal">true</span>);
<span class="hljs-comment">//冒泡阶段捕获</span>
layer.addEventListener(<span class="hljs-string">'touchstart'</span>, bind(<span class="hljs-keyword">this</span>.onTouchStart, <span class="hljs-keyword">this</span>), <span class="hljs-literal">false</span>);
layer.addEventListener(<span class="hljs-string">'touchmove'</span>, bind(<span class="hljs-keyword">this</span>.onTouchMove, <span class="hljs-keyword">this</span>), <span class="hljs-literal">false</span>);
layer.addEventListener(<span class="hljs-string">'touchend'</span>, bind(<span class="hljs-keyword">this</span>.onTouchEnd, <span class="hljs-keyword">this</span>), <span class="hljs-literal">false</span>);
layer.addEventListener(<span class="hljs-string">'touchcancel'</span>, bind(<span class="hljs-keyword">this</span>.onTouchCancel, <span class="hljs-keyword">this</span>), <span class="hljs-literal">false</span>);</code></pre>
</li>
<li>
<p>判断是否存在<code>stopImmediatePropagation</code>，如果不存在则进行hack，在<code>onMouse</code>中会利用<code>stopImmediatePropagation</code>来阻止其他点击事件的回调函数的执行，避免<code>ghost click</code>的现象</p>
<p>onMouse中，防止点透等诡异现象的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
    // Prevent any user-added listeners declared on FastClick element from being fired.
    if (event.stopImmediatePropagation) {
        event.stopImmediatePropagation();
    } else {
        // Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
        event.propagationStopped = true;
    }
    // Cancel the event
    event.stopPropagation();
    event.preventDefault();
    return false;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.needsClick(<span class="hljs-keyword">this</span>.targetElement) || <span class="hljs-keyword">this</span>.cancelNextClick) {
    <span class="hljs-comment">// Prevent any user-added listeners declared on FastClick element from being fired.</span>
    <span class="hljs-keyword">if</span> (event.stopImmediatePropagation) {
        event.stopImmediatePropagation();
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)</span>
        event.propagationStopped = <span class="hljs-literal">true</span>;
    }
    <span class="hljs-comment">// Cancel the event</span>
    event.stopPropagation();
    event.preventDefault();
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
}</code></pre>
</li>
<li>
<p>判断是否通过<code>onclick</code>绑定了回调函数，如果有读取出来，使用<code>addEventListener</code>，绑定事件处理函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (typeof layer.onclick === 'function') {
    // Android browser on at least 3.2 requires a new reference to the function in layer.onclick
    // - the old one won't work if passed to addEventListener directly.
    oldOnClick = layer.onclick;
    layer.addEventListener('click', function (event) {
        oldOnClick(event);
    }, false);
    layer.onclick = null;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> layer.onclick === <span class="hljs-string">'function'</span>) {
    <span class="hljs-comment">// Android browser on at least 3.2 requires a new reference to the function in layer.onclick</span>
    <span class="hljs-comment">// - the old one won't work if passed to addEventListener directly.</span>
    oldOnClick = layer.onclick;
    layer.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
        oldOnClick(event);
    }, <span class="hljs-literal">false</span>);
    layer.onclick = <span class="hljs-literal">null</span>;
}</code></pre>
</li>
</ol>
<h2 id="articleHeader1">触发click流程</h2>
<h4>onTouchStart()</h4>
<p>当一些更高级别的事件发生的时候（如电话接入或者弹出信息）会取消当前的touch操作，即触发ontouchcancel。一般会在ontouchcancel时暂停游戏、存档等操作。因此在调试的时候才会在touchStart之后，就触发了<code>touchCancel</code></p>
<p>直接断点<code>touchend</code>，在控制台打印，可以看到<code>touchstart</code>也是触发的了、</p>
<ol>
<li>
<p>判断是不是单点触发</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (event.targetTouches.length > 1) {
    return true;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (event.targetTouches.length &gt; <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}</code></pre>
</li>
<li>
<p>获取目标对象和<code>touch</code>事件对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="targetElement = this.getTargetElementFromEventTarget(event.target);
touch = event.targetTouches[0];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">targetElement = <span class="hljs-keyword">this</span>.getTargetElementFromEventTarget(event.target);
touch = event.targetTouches[<span class="hljs-number">0</span>];</code></pre>
</li>
<li>
<p>根据<code>touch</code>事件对象，设置一些初始属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.trackingClick = true; //标识跟踪该次点击
this.trackingClickStart = event.timeStamp;//点击开始的时间
this.targetElement = targetElement;//目标元素

this.touchStartX = touch.pageX; //x坐标
this.touchStartY = touch.pageY; //y坐标" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.trackingClick = <span class="hljs-literal">true</span>; <span class="hljs-comment">//标识跟踪该次点击</span>
<span class="hljs-keyword">this</span>.trackingClickStart = event.timeStamp;<span class="hljs-comment">//点击开始的时间</span>
<span class="hljs-keyword">this</span>.targetElement = targetElement;<span class="hljs-comment">//目标元素</span>

<span class="hljs-keyword">this</span>.touchStartX = touch.pageX; <span class="hljs-comment">//x坐标</span>
<span class="hljs-keyword">this</span>.touchStartY = touch.pageY; <span class="hljs-comment">//y坐标</span></code></pre>
</li>
</ol>
<h4>onTouchMove()</h4>
<p>如果刚触发完touchstart事件马上就触发touchend，说明手指只是轻轻点了一下屏幕，也就是所谓的点击操作。这样即使不监听click事件也能实现点击的侦听。不过这里有一个实际的情况，很多山寨的Android设备屏幕很不灵敏，需要使劲按下才能有所感知。这种情况下一定会触发touchmove事件。所以针对Android设备的点击操作可以适当放宽，比如touchstart和touchend之间可以允许有少量几个touchmove，并且touchmove的距离不能超过多少个像素等等</p>
<p>因此也是需要监听onTouchMove，并且加入判断</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// If the touch has moved, cancel the click tracking
if ( 
    this.targetElement !== this.getTargetElementFromEventTarget(event.target) 
    || this.touchHasMoved(event)
    ) {
    this.trackingClick = false;
    this.targetElement = null;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// If the touch has moved, cancel the click tracking</span>
<span class="hljs-keyword">if</span> ( 
    <span class="hljs-keyword">this</span>.targetElement !== <span class="hljs-keyword">this</span>.getTargetElementFromEventTarget(event.target) 
    || <span class="hljs-keyword">this</span>.touchHasMoved(event)
    ) {
    <span class="hljs-keyword">this</span>.trackingClick = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">this</span>.targetElement = <span class="hljs-literal">null</span>;
}</code></pre>
<h4>onTcouhEnd()</h4>
<ol>
<li><p>在touchend的时候，执行this.onTouchEnd（上个流程绑定了）</p></li>
<li>
<p>判断是否在追踪该click，在this.onTouchMove的时候，如果移动的距离大于边界，则将this.trackingClick=false，在touchend就不用再判断是否为一个click的行为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(!this.trackingClick){
    return true;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.trackingClick){
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}</code></pre>
</li>
<li>
<p>获取目标元素标签，需要根据标签名来做一些判断</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="targetTagName = targetElement.tagName.toLowerCase();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">targetTagName = targetElement.tagName.toLowerCase();</code></pre>
</li>
<li><p>如果是<code>label</code>，进行bug修复</p></li>
<li>
<p>执行<code>this.needsFocus</code>，针对表单元素的focus和click事件的处理</p>
<ol>
<li><p>先focus表单</p></li>
<li><p>在触发点击事件</p></li>
</ol>
</li>
<li><p>针对IOS，滚动层bug修复</p></li>
<li>
<p>判断元素是否需要原生的click，实际上就是有些行为还是要浏览器来执行默认的行为</p>
<ol>
<li><p>表单元素<code>disabled</code>，点击不了</p></li>
<li><p><code>type=file</code>的控件</p></li>
<li><p>video</p></li>
<li><p>label</p></li>
</ol>
</li>
<li>
<p>如果不需要，则发送一个click事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="event.preventDefault();
this.sendClick(targetElement, event);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">event.preventDefault();
<span class="hljs-keyword">this</span>.sendClick(targetElement, event);</code></pre>
</li>
</ol>
<h4>sendClick()流程</h4>
<ol>
<li>
<p>在一些安卓设备上，必须让一个元素<code>blured</code>，才能使创建的<code>clickEvent</code>生效</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (document.activeElement &amp;&amp; document.activeElement !== targetElement) {
    document.activeElement.blur();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.activeElement &amp;&amp; <span class="hljs-built_in">document</span>.activeElement !== targetElement) {
    <span class="hljs-built_in">document</span>.activeElement.blur();
}</code></pre>
</li>
<li>
<p>创建<code>clickEvent</code>，使用<code>touch</code>事件对象的属性来进行初始化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="clickEvent = document.createEvent('MouseEvents');
clickEvent.initMouseEvent(
        this.determineEventType(targetElement), //bug修复针对select
        true, 
        true, 
        window, 
        1, 
        touch.screenX, 
        touch.screenY, 
        touch.clientX, 
        touch.clientY, 
        false, false, false, false, 0, null);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">clickEvent = <span class="hljs-built_in">document</span>.createEvent(<span class="hljs-string">'MouseEvents'</span>);
clickEvent.initMouseEvent(
        <span class="hljs-keyword">this</span>.determineEventType(targetElement), <span class="hljs-comment">//bug修复针对select</span>
        <span class="hljs-literal">true</span>, 
        <span class="hljs-literal">true</span>, 
        <span class="hljs-built_in">window</span>, 
        <span class="hljs-number">1</span>, 
        touch.screenX, 
        touch.screenY, 
        touch.clientX, 
        touch.clientY, 
        <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-number">0</span>, <span class="hljs-literal">null</span>);</code></pre>
</li>
<li>
<p>创建完成之后，赋予对象一个额外的属性，在<code>onClick</code>中可以使用，然后触发点击事件，此时通过<code>addEventListner</code>绑定的<code>click</code>事件就会触发</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="clickEvent.forwardedTouchEvent = true;
targetElement.dispatchEvent(clickEvent);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">clickEvent.forwardedTouchEvent = <span class="hljs-literal">true</span>;
targetElement.dispatchEvent(clickEvent);</code></pre>
</li>
</ol>
<h4>onClick()</h4>
<p><em>addEventListener添加会按照添加顺序执行</em></p>
<p>onClick作为第一个注册监听的，因此，是第一个执行的<code>click</code>事件的回调函数</p>
<ol>
<li>
<p>特殊情况处理，一般不会执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
    It's possible for another FastClick-like library delivered with third-
    party code to fire a click event before FastClick does (issue #44). In 
    that case, set the click-tracking flag back to false and return early. 
    This will cause onTouchEnd to return early.
*/
if (this.trackingClick) {
    this.targetElement = null;
    this.trackingClick = false;
    return true;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
    It's possible for another FastClick-like library delivered with third-
    party code to fire a click event before FastClick does (issue #44). In 
    that case, set the click-tracking flag back to false and return early. 
    This will cause onTouchEnd to return early.
*/</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.trackingClick) {
    <span class="hljs-keyword">this</span>.targetElement = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>.trackingClick = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}</code></pre>
</li>
<li>
<p>特殊情况处理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (event.target.type === 'submit' &amp;&amp; event.detail === 0) {
    return true;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code class="javascipt"><span class="hljs-keyword">if</span> (event.target.<span class="hljs-keyword">type</span> <span class="hljs-type">=== </span><span class="hljs-symbol">'submit</span>' &amp;&amp; event.detail === <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}</code></pre>
</li>
<li>
<p>执行<code>onMouse</code>，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//创建时，附带的一个属性
if (event.forwardedTouchEvent) {
    return true;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//创建时，附带的一个属性</span>
<span class="hljs-keyword">if</span> (event.forwardedTouchEvent) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}</code></pre>
</li>
<li>
<p>最后返回为真</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return permitted; //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">return</span> permitted; <span class="hljs-comment">//true</span></code></pre>
</li>
</ol>
<p>注意：在这里的<code>return</code>的true或false并不会影响绑定的其他回调函数的执行</p>
<h2 id="articleHeader2">总结</h2>
<p>完整的看完代码，深深感觉到移动端的坑非常的多，很有怪异的现象因为没有遇到过暂时理解不了，希望之后可以继续研究，把代码完全读懂。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
FastClick 原理解析

## 原文链接
[https://segmentfault.com/a/1190000005850383](https://segmentfault.com/a/1190000005850383)

