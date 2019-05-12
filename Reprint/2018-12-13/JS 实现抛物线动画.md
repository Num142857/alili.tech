---
title: 'JS 实现抛物线动画' 
date: 2018-12-13 2:30:07
hidden: true
slug: evbeqd2lmn6
categories: [reprint]
---

{{< raw >}}

                    
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="author: 陈家宾
email: 617822642@qq.com
date: 2018/2/24" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">author</span>: 陈家宾
<span class="hljs-attribute">email</span>: <span class="hljs-number">617822642</span><span class="hljs-variable">@qq</span>.com
<span class="hljs-attribute">date</span>: <span class="hljs-number">2018</span>/<span class="hljs-number">2</span>/<span class="hljs-number">24</span></code></pre>
<p>在做小程序的项目中，需要在添加购物车的时候，增加抛物线小球动画。</p>
<p>先给大家看下效果图（其实已经是实现后的效果了，顺便给自己公司打广告了哈哈）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013355489?w=318&amp;h=564" src="https://static.alili.tech/img/remote/1460000013355489?w=318&amp;h=564" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">分析</h2>
<p>这种不固定起始位置的动画，自然不能用 gif 图，所以只能用原生代码实现</p>
<p>那我们有什么工具来实现动画呢？</p>
<ul>
<li>小程序提供了 JS API <code>createAnimation</code> 来创建动画</li>
<li>CSS transition</li>
</ul>
<p>工具有了，我们再看一下什么是抛物线。</p>
<p>这里我们只讨论水平抛物线，水平抛物线从数学原理上来说就是【水平匀速、垂直加速的运动】，转换成代码层面就是在动画效果 <code>timingFunction</code> 中，水平动画采用 <code>linear</code> ，垂直动画采用 <code>ease-in</code></p>
<p>所以我们需要把这个抛物线动画分解成 <strong>两个</strong> <strong>同时</strong> 进行但 <strong>不同动画效果</strong> 的动画。</p>
<h2 id="articleHeader1">实现</h2>
<h3 id="articleHeader2">（一）小程序的实现</h3>
<p>JS：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cartAnimation(x, y) { // x y 为手指点击的坐标，即球的起始坐标
    let self = this,
        cartY = app.globalData.winHeight - 50, // 结束位置（购物车图片）纵坐标
        cartX = 50, // 结束位置（购物车图片）的横坐标
        animationX = flyX(cartX, x), // 创建球的横向动画
        animationY = flyY(cartY, y) // 创建球的纵向动画
    this.setData({
          ballX: x,
          ballY: y,
          showBall: true
    })
    setTimeoutES6(100).then(() => { // 100 ms 延时，确保球已经到位并显示
        self.setData({
            animationX: animationX.export(),
            animationY: animationY.export(),
        })
        return setTimeoutES6(400) // 400 ms 是球的抛物线动画时长
    }).then(() => { // 400 ms 延时后隐藏球
        this.setData({
            showBall: false,
        })
    })
}

function setTimeoutES6(sec) { // Promise 化 setTimeout
    return new Promise((resolve, reject) => {
        setTimeout(() => {resolve()}, sec)
    })
}

function flyX(cartX, oriX) { // 水平动画
    let animation = wx.createAnimation({
        duration: 400,
        timingFunction: 'linear',
    })
    animation.left(cartX).step()
    return animation
}

function flyY(cartY, oriY) { // 垂直动画
    let animation = wx.createAnimation({
        duration: 400,
        timingFunction: 'ease-in',
    })
    animation.top(cartY).step()
    return animation
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">cartAnimation(x, y) { <span class="hljs-comment">// x y 为手指点击的坐标，即球的起始坐标</span>
    <span class="hljs-keyword">let</span> self = <span class="hljs-keyword">this</span>,
        cartY = app.globalData.winHeight - <span class="hljs-number">50</span>, <span class="hljs-comment">// 结束位置（购物车图片）纵坐标</span>
        cartX = <span class="hljs-number">50</span>, <span class="hljs-comment">// 结束位置（购物车图片）的横坐标</span>
        animationX = flyX(cartX, x), <span class="hljs-comment">// 创建球的横向动画</span>
        animationY = flyY(cartY, y) <span class="hljs-comment">// 创建球的纵向动画</span>
    <span class="hljs-keyword">this</span>.setData({
          <span class="hljs-attr">ballX</span>: x,
          <span class="hljs-attr">ballY</span>: y,
          <span class="hljs-attr">showBall</span>: <span class="hljs-literal">true</span>
    })
    setTimeoutES6(<span class="hljs-number">100</span>).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-comment">// 100 ms 延时，确保球已经到位并显示</span>
        self.setData({
            <span class="hljs-attr">animationX</span>: animationX.export(),
            <span class="hljs-attr">animationY</span>: animationY.export(),
        })
        <span class="hljs-keyword">return</span> setTimeoutES6(<span class="hljs-number">400</span>) <span class="hljs-comment">// 400 ms 是球的抛物线动画时长</span>
    }).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-comment">// 400 ms 延时后隐藏球</span>
        <span class="hljs-keyword">this</span>.setData({
            <span class="hljs-attr">showBall</span>: <span class="hljs-literal">false</span>,
        })
    })
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setTimeoutES6</span>(<span class="hljs-params">sec</span>) </span>{ <span class="hljs-comment">// Promise 化 setTimeout</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {resolve()}, sec)
    })
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flyX</span>(<span class="hljs-params">cartX, oriX</span>) </span>{ <span class="hljs-comment">// 水平动画</span>
    <span class="hljs-keyword">let</span> animation = wx.createAnimation({
        <span class="hljs-attr">duration</span>: <span class="hljs-number">400</span>,
        <span class="hljs-attr">timingFunction</span>: <span class="hljs-string">'linear'</span>,
    })
    animation.left(cartX).step()
    <span class="hljs-keyword">return</span> animation
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flyY</span>(<span class="hljs-params">cartY, oriY</span>) </span>{ <span class="hljs-comment">// 垂直动画</span>
    <span class="hljs-keyword">let</span> animation = wx.createAnimation({
        <span class="hljs-attr">duration</span>: <span class="hljs-number">400</span>,
        <span class="hljs-attr">timingFunction</span>: <span class="hljs-string">'ease-in'</span>,
    })
    animation.top(cartY).step()
    <span class="hljs-keyword">return</span> animation
}</code></pre>
<p>HTML:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<view animation=&quot;"{{"animationY"}}"&quot; style=&quot;position:fixed;top:"{{"ballY"}}"px;&quot; hidden=&quot;"{{"!showBall"}}"&quot;>
    <view class=&quot;ball&quot; animation=&quot;"{{"animationX"}}"&quot; style=&quot;position:fixed;left:"{{"ballX"}}"px;&quot;></view>
</view>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">animation</span>=<span class="hljs-string">""{{"animationY"}}""</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"position:fixed;top:"{{"ballY"}}"px;"</span> <span class="hljs-attr">hidden</span>=<span class="hljs-string">""{{"!showBall"}}""</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ball"</span> <span class="hljs-attr">animation</span>=<span class="hljs-string">""{{"animationX"}}""</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"position:fixed;left:"{{"ballX"}}"px;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span></code></pre>
<h4>translate 优化</h4>
<p>据我所知，用 <code>transform: translate()</code> 来实现的动画会比 top &amp; left 性能更优，但实现下来却没那么容易咯。</p>
<p>研究来研究去，发现 translate 的做法比 top &amp; left 的做法多了一步，就是需要将小球的 <strong>translate 位移还原</strong>（否则 translate 一直有值），才能保证下一次的位移从点击的位置开始</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cartAnimation(x, y) {
    let self = this,
        cartY = app.globalData.winHeight - 50,
        cartX = 50,
        animationX = flyX(cartX, x),
        animationY = flyY(cartY, y)
    this.setData({
        leftNum: x,
        topNum: y,
        showBall: true
    })
    setTimeoutES6(100).then(() => {
        self.setData({
            animationDataX: animationX.export(),
            animationDataY: animationY.export(),
        })
        return setTimeoutES6(400)
    }).then(() => {
        this.setData({
            showBall: false,
            animationX: flyX(0, 0, 0).export(), // 还原小球位置，即 translate 恢复默认值
            animationY: flyY(0, 0, 0).export(),
        })
    })
}

function flyX(cartX,oriX,duration) {
    let animation = wx.createAnimation({
        duration: duration||400,
        timingFunction: 'linear',
    })
    animation.translateX(cartX-oriX).step()
    return animation
}
function flyY(cartY,oriY,duration) {
    let animation = wx.createAnimation({
        duration: duration||400,
        timingFunction: 'ease-in',
    })
    animation.translateY(cartY-oriY).step()
    return animation
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">cartAnimation(x, y) {
    <span class="hljs-keyword">let</span> self = <span class="hljs-keyword">this</span>,
        cartY = app.globalData.winHeight - <span class="hljs-number">50</span>,
        cartX = <span class="hljs-number">50</span>,
        animationX = flyX(cartX, x),
        animationY = flyY(cartY, y)
    <span class="hljs-keyword">this</span>.setData({
        <span class="hljs-attr">leftNum</span>: x,
        <span class="hljs-attr">topNum</span>: y,
        <span class="hljs-attr">showBall</span>: <span class="hljs-literal">true</span>
    })
    setTimeoutES6(<span class="hljs-number">100</span>).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        self.setData({
            <span class="hljs-attr">animationDataX</span>: animationX.export(),
            <span class="hljs-attr">animationDataY</span>: animationY.export(),
        })
        <span class="hljs-keyword">return</span> setTimeoutES6(<span class="hljs-number">400</span>)
    }).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>.setData({
            <span class="hljs-attr">showBall</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">animationX</span>: flyX(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>).export(), <span class="hljs-comment">// 还原小球位置，即 translate 恢复默认值</span>
            animationY: flyY(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>).export(),
        })
    })
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flyX</span>(<span class="hljs-params">cartX,oriX,duration</span>) </span>{
    <span class="hljs-keyword">let</span> animation = wx.createAnimation({
        <span class="hljs-attr">duration</span>: duration||<span class="hljs-number">400</span>,
        <span class="hljs-attr">timingFunction</span>: <span class="hljs-string">'linear'</span>,
    })
    animation.translateX(cartX-oriX).step()
    <span class="hljs-keyword">return</span> animation
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flyY</span>(<span class="hljs-params">cartY,oriY,duration</span>) </span>{
    <span class="hljs-keyword">let</span> animation = wx.createAnimation({
        <span class="hljs-attr">duration</span>: duration||<span class="hljs-number">400</span>,
        <span class="hljs-attr">timingFunction</span>: <span class="hljs-string">'ease-in'</span>,
    })
    animation.translateY(cartY-oriY).step()
    <span class="hljs-keyword">return</span> animation
}</code></pre>
<p>HTML 部分不变</p>
<h3 id="articleHeader3">（二）H5 的实现</h3>
<p>除了小程序之外，前端日常开发更多的当然还是 H5，下面我将用 CSS3 transition 的方法来实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot; style=&quot;width:100%;height:100%;&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width&quot;>
    <style>
        * {
            padding: 0;
            margin: 0;
        }
        #ball {
            width:12px;
            height:12px;
            background: #5EA345;
            border-radius: 50%;
            position: fixed;
            transition: left 1s linear, top 1s ease-in;
        }
    </style>
    <title>CSS3 水平抛物线动画</title>
</head>
<body style=&quot;width:100%;height:100%;&quot;>
    <div id=&quot;ball&quot;></div>
</body>
<script>
    var $ball = document.getElementById('ball');
    document.body.onclick = function (evt) {
        console.log(evt.pageX,evt.pageY)
        $ball.style.top = evt.pageY+'px';
        $ball.style.left = evt.pageX+'px';
        $ball.style.transition = 'left 0s, top 0s';
        setTimeout(()=>{
            $ball.style.top = window.innerHeight+'px';
            $ball.style.left = '0px';
            $ball.style.transition = 'left 1s linear, top 1s ease-in';
        }, 20)
    }
</script>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:100%;height:100%;"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        * {
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        }
        <span class="hljs-selector-id">#ball</span> {
            <span class="hljs-attribute">width</span>:<span class="hljs-number">12px</span>;
            <span class="hljs-attribute">height</span>:<span class="hljs-number">12px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#5EA345</span>;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
            <span class="hljs-attribute">position</span>: fixed;
            <span class="hljs-attribute">transition</span>: left <span class="hljs-number">1s</span> linear, top <span class="hljs-number">1s</span> ease-in;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>CSS3 水平抛物线动画<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:100%;height:100%;"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"ball"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> $ball = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'ball'</span>);
    <span class="hljs-built_in">document</span>.body.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">evt</span>) </span>{
        <span class="hljs-built_in">console</span>.log(evt.pageX,evt.pageY)
        $ball.style.top = evt.pageY+<span class="hljs-string">'px'</span>;
        $ball.style.left = evt.pageX+<span class="hljs-string">'px'</span>;
        $ball.style.transition = <span class="hljs-string">'left 0s, top 0s'</span>;
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            $ball.style.top = <span class="hljs-built_in">window</span>.innerHeight+<span class="hljs-string">'px'</span>;
            $ball.style.left = <span class="hljs-string">'0px'</span>;
            $ball.style.transition = <span class="hljs-string">'left 1s linear, top 1s ease-in'</span>;
        }, <span class="hljs-number">20</span>)
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>还有体验链接哦，<a href="https://henry-cj.github.io/demo/js-horizontal-parabola" rel="nofollow noreferrer" target="_blank">点我</a></p>
<p>至此，水平抛物线动画的实现就介绍得差不多啦，嘻嘻！！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS 实现抛物线动画

## 原文链接
[https://segmentfault.com/a/1190000013355484](https://segmentfault.com/a/1190000013355484)

