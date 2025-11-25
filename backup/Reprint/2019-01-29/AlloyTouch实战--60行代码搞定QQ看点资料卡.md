---
title: 'AlloyTouch实战--60行代码搞定QQ看点资料卡' 
date: 2019-01-29 2:30:10
hidden: true
slug: 5jt1iw1t77b
categories: [reprint]
---

{{< raw >}}

                    
<p>原文链接：<a href="https://github.com/AlloyTeam/AlloyTouch/wiki/kandian" rel="nofollow noreferrer" target="_blank">https://github.com/AlloyTeam/AlloyTouch/wiki/kandian</a></p>
<h2 id="articleHeader0">先验货</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007953802?w=280&amp;h=280" src="https://static.alili.tech/img/remote/1460000007953802?w=280&amp;h=280" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li><p>访问DEMO你也可以<a href="http://alloyteam.github.io/AlloyTouch//refresh/infinite/kandian.html" rel="nofollow noreferrer" target="_blank">点击这里</a></p></li>
<li><p>源代码可以<a href="https://github.com/AlloyTeam/AlloyTouch/blob/master/refresh/infinite/kandian.html#L915-L978" rel="nofollow noreferrer" target="_blank">点击这里</a></p></li>
</ul>
<p>如你体验所见，流程的滚动的同时还能支持头部的动画？不断地加载新数据还能做到流畅的滑动！怎么做得的？使用AlloyTouch CSS 0.2.0及以上版本便可！</p>
<h2 id="articleHeader1">头部动画</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007953803?w=311&amp;h=549" src="https://static.alili.tech/img/remote/1460000007953803?w=311&amp;h=549" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">加载更多</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007953804?w=305&amp;h=429" src="https://static.alili.tech/img/remote/1460000007953804?w=305&amp;h=429" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">实现代码</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var infoList = document.getElementById(&quot;infoList&quot;),
    mockHTML = infoList.innerHTML,
    scroller = document.getElementById(&quot;scroller&quot;),
    header = document.getElementById(&quot;header&quot;),
    userLogo = document.getElementById(&quot;user-logo-wrapper&quot;),
    loading = false,
    alloyTouch = null;

Transform(scroller, true);
Transform(header);
header.originY = -70;
header.translateY = -70;
Transform(userLogo);

alloyTouch = new AlloyTouch({
    touch: &quot;#wrapper&quot;,
    vertical: true,
    target: scroller,
    property: &quot;translateY&quot;,
    maxSpeed: 2,
    outFactor: 0.1,
    min: 160 * -20 + window.innerHeight - 202 - 50,
    max: 0,
    lockDirection: false,
    touchStart: function () {
        reastMin();
    },
    lockDirection: false,
    change: function (v) {
        if (v <= this.min + 5 &amp;&amp; !loading) {
            loading = true;
            loadMore();
        }
        if (v < 0) {
            if (v < -140) v = -140;
            var scaleY = (240 + v) / 240;
            header.scaleY = scaleY;
            userLogo.scaleX = userLogo.scaleY = scaleY;
            userLogo.translateY = v / 1.7;
        } else {
            var scaleY = 1 + v / 240;
            header.scaleY = scaleY;
            userLogo.scaleX = userLogo.scaleY = scaleY;
            userLogo.translateY = v / 1.7;
        }
    }
})

function loadMore() {
    setTimeout(function () {
        infoList.innerHTML += mockHTML;
        loading = false;
        reastMin();
    }, 500)
}

function reastMin() {
    alloyTouch.min = -1 * parseInt(getComputedStyle(scroller).height) + window.innerHeight - 202;
}

document.addEventListener(&quot;touchmove&quot;, function (evt) {
    evt.preventDefault();
}, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> infoList = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"infoList"</span>),
    mockHTML = infoList.innerHTML,
    scroller = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"scroller"</span>),
    header = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"header"</span>),
    userLogo = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"user-logo-wrapper"</span>),
    loading = <span class="hljs-literal">false</span>,
    alloyTouch = <span class="hljs-literal">null</span>;

Transform(scroller, <span class="hljs-literal">true</span>);
Transform(header);
header.originY = <span class="hljs-number">-70</span>;
header.translateY = <span class="hljs-number">-70</span>;
Transform(userLogo);

alloyTouch = <span class="hljs-keyword">new</span> AlloyTouch({
    <span class="hljs-attr">touch</span>: <span class="hljs-string">"#wrapper"</span>,
    <span class="hljs-attr">vertical</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">target</span>: scroller,
    <span class="hljs-attr">property</span>: <span class="hljs-string">"translateY"</span>,
    <span class="hljs-attr">maxSpeed</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">outFactor</span>: <span class="hljs-number">0.1</span>,
    <span class="hljs-attr">min</span>: <span class="hljs-number">160</span> * <span class="hljs-number">-20</span> + <span class="hljs-built_in">window</span>.innerHeight - <span class="hljs-number">202</span> - <span class="hljs-number">50</span>,
    <span class="hljs-attr">max</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">lockDirection</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">touchStart</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        reastMin();
    },
    <span class="hljs-attr">lockDirection</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">change</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">v</span>) </span>{
        <span class="hljs-keyword">if</span> (v &lt;= <span class="hljs-keyword">this</span>.min + <span class="hljs-number">5</span> &amp;&amp; !loading) {
            loading = <span class="hljs-literal">true</span>;
            loadMore();
        }
        <span class="hljs-keyword">if</span> (v &lt; <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">if</span> (v &lt; <span class="hljs-number">-140</span>) v = <span class="hljs-number">-140</span>;
            <span class="hljs-keyword">var</span> scaleY = (<span class="hljs-number">240</span> + v) / <span class="hljs-number">240</span>;
            header.scaleY = scaleY;
            userLogo.scaleX = userLogo.scaleY = scaleY;
            userLogo.translateY = v / <span class="hljs-number">1.7</span>;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">var</span> scaleY = <span class="hljs-number">1</span> + v / <span class="hljs-number">240</span>;
            header.scaleY = scaleY;
            userLogo.scaleX = userLogo.scaleY = scaleY;
            userLogo.translateY = v / <span class="hljs-number">1.7</span>;
        }
    }
})

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadMore</span>(<span class="hljs-params"></span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        infoList.innerHTML += mockHTML;
        loading = <span class="hljs-literal">false</span>;
        reastMin();
    }, <span class="hljs-number">500</span>)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reastMin</span>(<span class="hljs-params"></span>) </span>{
    alloyTouch.min = <span class="hljs-number">-1</span> * <span class="hljs-built_in">parseInt</span>(getComputedStyle(scroller).height) + <span class="hljs-built_in">window</span>.innerHeight - <span class="hljs-number">202</span>;
}

<span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">"touchmove"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">evt</span>) </span>{
    evt.preventDefault();
}, <span class="hljs-literal">false</span>);</code></pre>
<p>就这么多代码。当然你要引用一个transformjs和alloy_touch.css.js。先看这一堆：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Transform(scroller, true);
Transform(header);
header.originY = -70;
header.translateY = -70;
Transform(userLogo);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Transform(scroller, <span class="hljs-literal">true</span>);
Transform(header);
header.originY = <span class="hljs-number">-70</span>;
header.translateY = <span class="hljs-number">-70</span>;
Transform(userLogo);</code></pre>
<ul><li><p>Transform(xxx)是什么意思？</p></li></ul>
<blockquote><p>赋予xxx transformation能力</p></blockquote>
<ul><li><p>第一个scroller加上true代表关闭透视投影，为什么要关闭透视投影？</p></li></ul>
<blockquote><p>因为scroller里面是有文本，防止文本在IOS中模糊的情况。</p></blockquote>
<ul><li><p>header是顶部的那个蓝色的区域。为什么要设置originY和translateY？为什么要设置为-70？</p></li></ul>
<blockquote><p>因为header的高度为140px，用户向上滚动的过程中，需要对其进行scaleY变换。通常我们的做法是设置CSS3 transform-origin为 center top。而使用transformjs之后，可以抛弃transform-origin，使用originY或者originX属性便可。originY 设置为 -70，相对于高度为140的header来说就是center top。</p></blockquote>
<p>再看这一堆：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alloyTouch = new AlloyTouch({
    touch: &quot;#wrapper&quot;,
    vertical: true,
    target: scroller,
    property: &quot;translateY&quot;,
    maxSpeed: 2,
    outFactor: 0.1,
    lockDirection: false,
    min: 160 * -20 + window.innerHeight - 202 - 50,
    max: 0,
    touchStart: function () {
        resetMin();
    },
    lockDirection: false,
    ...
    ...
    ...
})
...
...
function resetMin() {
    alloyTouch.min = -1 * parseInt(getComputedStyle(scroller).height) + window.innerHeight - 202;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">alloyTouch = <span class="hljs-keyword">new</span> AlloyTouch({
    <span class="hljs-attr">touch</span>: <span class="hljs-string">"#wrapper"</span>,
    <span class="hljs-attr">vertical</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">target</span>: scroller,
    <span class="hljs-attr">property</span>: <span class="hljs-string">"translateY"</span>,
    <span class="hljs-attr">maxSpeed</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">outFactor</span>: <span class="hljs-number">0.1</span>,
    <span class="hljs-attr">lockDirection</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">min</span>: <span class="hljs-number">160</span> * <span class="hljs-number">-20</span> + <span class="hljs-built_in">window</span>.innerHeight - <span class="hljs-number">202</span> - <span class="hljs-number">50</span>,
    <span class="hljs-attr">max</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">touchStart</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        resetMin();
    },
    <span class="hljs-attr">lockDirection</span>: <span class="hljs-literal">false</span>,
    ...
    ...
    ...
})
...
...
function resetMin() {
    alloyTouch.min = <span class="hljs-number">-1</span> * <span class="hljs-built_in">parseInt</span>(getComputedStyle(scroller).height) + <span class="hljs-built_in">window</span>.innerHeight - <span class="hljs-number">202</span>;
}</code></pre>
<p>使用AlloyTouch最关键的一点就是计算min和max的值。min和max决定了可以滚到哪里，到了哪里会进行回弹等等。这里max是0毫无疑问。</p>
<ul><li><p>但是min那一堆加减乘除是什么东西？</p></li></ul>
<blockquote><p>这里首次加载是20行数据，每一行高度大概160，主意是大概， window.innerHeight是视窗的高度，202px是滚动的容器的padding top的值，50px是用来留给显示<strong>加载更多</strong>的...<br><span class="img-wrap"><img data-src="/img/remote/1460000007953805?w=661&amp;h=524" src="https://static.alili.tech/img/remote/1460000007953805?w=661&amp;h=524" alt="" title="" style="cursor: pointer;"></span></p></blockquote>
<p>如上图所示，主要是需要求???的高度。</p>
<ul><li><p>那么怎么解决大概160*20的问题？</p></li></ul>
<blockquote><p>touchStart的时候reastMin。resetMin会去通过getComputedStyle计算整个scroller的高度。</p></blockquote>
<ul><li><p>maxSpeed是干什么用的？</p></li></ul>
<blockquote><p>用来限制滚动的最大速度，个人感觉调整到2挺舒适，这个可以根据场景和被运动的属性灵活配置。</p></blockquote>
<ul><li><p>outFactor是干什么用的？</p></li></ul>
<blockquote><p>用来设置超出min或者max进行拖拽的运动比例系数，系数越小，超出min和max越难拖动，也就是受到的阻力越大。</p></blockquote>
<ul><li><p>lockDirection是干什么用的？</p></li></ul>
<blockquote><p>lockDirection默认值是true。代表用户起手时候是横向的，而你监听的是竖直方向的touch，这样的话是不会触发运动。只有起手和监听对应上才会有触摸运动。这里把lockDirection设置成false就没有这个限制，不管用户起手的direction，都会有触摸运动。</p></blockquote>
<p>再看AlloyTouch注入的change事件！头部动效核心的一个配置函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="change: function (v) {
    if (v <= this.min + 5 &amp;&amp; !loading) {
        loading = true;
        loadMore();
    }
    if (v < 0) {
        if (v < -140) v = -140;
        var scaleY = (240 + v) / 240;
        header.scaleY = scaleY;
        userLogo.scaleX = userLogo.scaleY = scaleY;
        userLogo.translateY = v / 1.7;
    } else {
        var scaleY = 1 + v / 240;
        header.scaleY = scaleY;
        userLogo.scaleX = userLogo.scaleY = scaleY;
        userLogo.translateY = v / 1.7;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">change: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">v</span>) </span>{
    <span class="hljs-keyword">if</span> (v &lt;= <span class="hljs-keyword">this</span>.min + <span class="hljs-number">5</span> &amp;&amp; !loading) {
        loading = <span class="hljs-literal">true</span>;
        loadMore();
    }
    <span class="hljs-keyword">if</span> (v &lt; <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">if</span> (v &lt; <span class="hljs-number">-140</span>) v = <span class="hljs-number">-140</span>;
        <span class="hljs-keyword">var</span> scaleY = (<span class="hljs-number">240</span> + v) / <span class="hljs-number">240</span>;
        header.scaleY = scaleY;
        userLogo.scaleX = userLogo.scaleY = scaleY;
        userLogo.translateY = v / <span class="hljs-number">1.7</span>;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">var</span> scaleY = <span class="hljs-number">1</span> + v / <span class="hljs-number">240</span>;
        header.scaleY = scaleY;
        userLogo.scaleX = userLogo.scaleY = scaleY;
        userLogo.translateY = v / <span class="hljs-number">1.7</span>;
    }
}</code></pre>
<p>v代表当前被运动对象的被运动属性的当前的值，根据这个v去做一些效果和加载更多。</p>
<ul><li><p>什么时候加载更多？</p></li></ul>
<blockquote><p>当滚动你能看到加载更多的时候去加载更多</p></blockquote>
<ul><li><p>什么时候能看到加载更多？</p></li></ul>
<blockquote><p>v &lt;= this.min + 5。 可以看到change回调里可以拿到this，也就是AlloyTouch对象的实例，当v等于this.min代表滚到了底部，所以这里加上5代表快要滚动底部已经看到了加载更多。就去执行loadMore函数。</p></blockquote>
<ul><li><p>loading是干什么用的？</p></li></ul>
<blockquote><p>防止重复loadMore用得，因为change执行得很频繁，所以这里会通过loading的状态去锁上。</p></blockquote>
<ul><li><p>下面一堆设置scaleX、scaleY、translateY以及一堆数字是怎么来的？</p></li></ul>
<blockquote><p>慢慢调试得出的最佳效果~~反正就是根据v的数值映射到 header和用户头像的transform属性上，这里就不一一讲了。</p></blockquote>
<p>再看loadMore：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function loadMore() {
    setTimeout(function () {
        infoList.innerHTML += mockHTML;
        loading = false;
        reastMin();
    }, 500)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadMore</span>(<span class="hljs-params"></span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        infoList.innerHTML += mockHTML;
        loading = <span class="hljs-literal">false</span>;
        reastMin();
    }, <span class="hljs-number">500</span>)
}</code></pre>
<p>这里使用了一段假的HTML去模拟AJAX异步请求以及数据转HTML的过程，整个耗时500ms，500ms后会去：</p>
<ul>
<li><p>插入HTML</p></li>
<li><p>重置loading状态</p></li>
<li><p>重置AlloyTouch的min</p></li>
</ul>
<p>最后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.addEventListener(&quot;touchmove&quot;, function (evt) {
    evt.preventDefault();
}, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">"touchmove"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">evt</span>) </span>{
    evt.preventDefault();
}, <span class="hljs-literal">false</span>);</code></pre>
<p>阻止掉整个document的默认事件，不会把整个页面拖下来，在手Q里的话，你就看不到网址和X5内核提供技术支持了。</p>
<h2 id="articleHeader4">开始AlloyTouch</h2>
<p>Github：<a href="https://github.com/AlloyTeam/AlloyTouch" rel="nofollow noreferrer" target="_blank">https://github.com/AlloyTeam/AlloyTouch</a></p>
<p>任何意见和建议欢迎<a href="https://github.com/AlloyTeam/AlloyTouch/issues" rel="nofollow noreferrer" target="_blank">new issue</a>，AlloyTouch团队会第一时间反馈。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
AlloyTouch实战--60行代码搞定QQ看点资料卡

## 原文链接
[https://segmentfault.com/a/1190000007953799](https://segmentfault.com/a/1190000007953799)

