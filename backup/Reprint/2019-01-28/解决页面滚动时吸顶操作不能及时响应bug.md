---
title: '解决页面滚动时吸顶操作不能及时响应bug' 
date: 2019-01-28 2:30:09
hidden: true
slug: 58ztskl01lt
categories: [reprint]
---

{{< raw >}}

                    
<ul>
<li><p>position: sticky;</p></li>
<li><p>fixed 吸顶</p></li>
<li><p>页面滚动结束后页面才渲染</p></li>
</ul>
<h2 id="articleHeader0">需求</h2>
<p>经常会有这样的需求，当页面滚动到某一个位置<strong>fixedTopValue</strong>时，需要某个元素<strong>fixedElement</strong>固定在屏幕顶部。基本方法是获取页面的scrollTop值做判断：<br>如果 scrollTop &gt; fixedTopValue;  则添加position:fixed;top: 0;否则删除position:fixed;属性。</p>
<p>当在pc浏览器操作的时候正常。真机测试时总会出现千奇百怪的现象。比如：<br>1、 当页面往下滚时，<strong>fixedElement</strong>需要等页面滚动停止之后才会出现。<br>2、往上滚动时出现到固定的位置时不恢复原样，而是到达顶部、等页面停止滚动之后才会唰的一下恢复原样<br>3、滚动到顶部之后，会出现两个一样的fixedElement, 过一会才恢复正常。<br>这样的用户体验真的很差，所以迫切需要解决这个问题。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008004303" src="https://static.alili.tech/img/remote/1460000008004303" alt="滚动bug.png" title="滚动bug.png" style="cursor: pointer; display: inline;"></span></p>
<p>解决方法主要涉及一下三个方面<br><strong>1、</strong>使用新的定位属性 position: sticky; (如果支持)<br><strong> 2、</strong>如果不支持1，使用window.requestAnimationFrame方法确保改变定位属性在固定时间内执行一次<br><strong>3、</strong> 给fixedElement开启硬件加速</p>
<p>基本逻辑如下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008004304" src="https://static.alili.tech/img/remote/1460000008004304" alt="页面滚动元素fixed置顶逻辑设计 (2).png" title="页面滚动元素fixed置顶逻辑设计 (2).png" style="cursor: pointer; display: inline;"></span></p>
<p>测试页面二维码：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008004305" src="https://static.alili.tech/img/remote/1460000008004305" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">position:sticky是个什么鬼？</h2>
<p>对与css的position属性我们只知道有static、relative、absolute、fixed这四个值，什么时候又多出了sticky这个值。看下<a href="https://developer.mozilla.org/en/docs/Web/CSS/position#Sticky_positioning" rel="nofollow noreferrer" target="_blank">MDN文档解释</a></p>
<p><strong> Sticky positioning </strong><br>Sticky positioning is a hybrid of relative and fixed positioning.  The element is treated as relative positioned until it crosses a specified threshold, at which point it is treated as fixed positioned.</p>
<p>大概意思是：sticky定位时relative定位与fixed定位的混合体。对于设置了sticky定位的元素，在它的顶部到达一个指定的界限之前会被当作relative定位，超过这个界限字后则被当作fixed定位。这个界限就是 <strong> 该元素顶部距离窗口顶部的距离等于该元素设置的top值 </strong><br>比如以下demo:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <div class=&quot;top&quot;>60像素分割线</div>
  <div class=&quot;sticky&quot;>当我的顶部距离窗口顶部为10px(top值)时，我就会像fixed一样fixed在距离窗口10px(top值处)</div>
  <div class=&quot;content&quot;>sticky的co时代发送分ntent</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"top"</span>&gt;<span class="hljs-number">60</span>像素分割线&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"sticky"</span>&gt;当我的顶部距离窗口顶部为<span class="hljs-number">10</span>px(top值)时，我就会像fixed一样fixed在距离窗口<span class="hljs-number">10</span>px(top值处)&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"content"</span>&gt;sticky的co时代发送分ntent&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".top{height:60px;background:#f20;width:100%;color: #fff;font-size:16px;text-align:center;line-height:60px;}
.sticky{position:sticky;position:-webkit-sticky;top:10px;height:40px;background:#dd5;color:#fff;line-height:20px;text-align:center;}
.sticky-t10{top:0px;}
.content{height:1000px;width:100%;background:#f8f8f8;text-align:center;padding-top:40px;color:#333;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.top</span>{<span class="hljs-attribute">height</span>:<span class="hljs-number">60px</span>;<span class="hljs-attribute">background</span>:<span class="hljs-number">#f20</span>;<span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;<span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;<span class="hljs-attribute">font-size</span>:<span class="hljs-number">16px</span>;<span class="hljs-attribute">text-align</span>:center;<span class="hljs-attribute">line-height</span>:<span class="hljs-number">60px</span>;}
<span class="hljs-selector-class">.sticky</span>{<span class="hljs-attribute">position</span>:sticky;<span class="hljs-attribute">position</span>:-webkit-sticky;<span class="hljs-attribute">top</span>:<span class="hljs-number">10px</span>;<span class="hljs-attribute">height</span>:<span class="hljs-number">40px</span>;<span class="hljs-attribute">background</span>:<span class="hljs-number">#dd5</span>;<span class="hljs-attribute">color</span>:<span class="hljs-number">#fff</span>;<span class="hljs-attribute">line-height</span>:<span class="hljs-number">20px</span>;<span class="hljs-attribute">text-align</span>:center;}
<span class="hljs-selector-class">.sticky-t10</span>{<span class="hljs-attribute">top</span>:<span class="hljs-number">0px</span>;}
<span class="hljs-selector-class">.content</span>{<span class="hljs-attribute">height</span>:<span class="hljs-number">1000px</span>;<span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;<span class="hljs-attribute">background</span>:<span class="hljs-number">#f8f8f8</span>;<span class="hljs-attribute">text-align</span>:center;<span class="hljs-attribute">padding-top</span>:<span class="hljs-number">40px</span>;<span class="hljs-attribute">color</span>:<span class="hljs-number">#333</span>;}</code></pre>
<p>效果图：<br><span class="img-wrap"><img data-src="/img/remote/1460000008004306" src="https://static.alili.tech/img/remote/1460000008004306" alt="sticky测试页面综合图.png" title="sticky测试页面综合图.png" style="cursor: pointer;"></span></p>
<p>当页面滚动到距离黄色区块顶部10px时，黄色区块就会fixed在窗口顶部10px处，页面再往下滚动距离也不会变。当页面网上滚动时，页面顶部距离黄色区块顶部大于10px时，黄色区块又会恢复原样固定在原来的位置。</p>
<p>position:sticky这个属性并不会出现当页面滚动停止之后才会出现的bug，因为它本身就是属于正常流。并不会像fixed 与static相互切换时引起重排于重绘，而移动端浏览器滚动时是禁止重排跟重绘的，所以才会导致以上出现的问题。下图是对于position:sticky的支持情况：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008004307" src="https://static.alili.tech/img/remote/1460000008004307" alt="position:sticky浏览器支持情况" title="position:sticky浏览器支持情况" style="cursor: pointer;"></span></p>
<p>发现支持的浏览器一般般，但是经过测试像微信、safari、uc等浏览器是支持的，虽然chrome不支持，但是在chrome使用优化后的fixed定位也可以解决这个问题，基本能满足主流的浏览器就够了，其他的见鬼去吧。</p>
<h2 id="articleHeader2">滚动时减少性能损耗，强制触发浏览器的同步布局</h2>
<p>如果浏览器不支持position:sticky，那么就使用js动态的在节点在fixed定位于static定位中切换，但是需要对切换过程做一些优化。<br>1、使用函数节流防抖减少dom操作频繁粗发，但是保证在规定时间内必须执行一次。<br>2、使用window.requestAnimationFrame  方法在下一帧前触发浏览器的强制同步布局，是对dom的操作能及时渲染到页面上。<br>3、减少对dom的读写操作，或者把dom操作把读、写操作分开，可以减少渲染次数。</p>
<h2 id="articleHeader3">给需要定位的元素开启硬件加速</h2>
<p>由于移动设备的硬件限制，导致移动端的浏览器的渲染能比较差。此时对需要定位的元素开启硬件加速，会把需要渲染的元素放到特定的复合层『Composited Layer』中，当该元素改变时可以较少重绘或重排的范围。给元素添加 transform: translateZ(0);属性就行。</p>
<h2 id="articleHeader4">参考：</h2>
<p>硬件加速：<br><a href="http://div.io/topic/1348" rel="nofollow noreferrer" target="_blank">http://div.io/topic/1348</a><br><a href="http://www.cnblogs.com/shytong/p/5419565.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/shyton...</a><br>提升页面性能：<br><a href="https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a><br><a href="http://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blo...</a><br><a href="http://www.jianshu.com/p/a32b890c29b1" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/a32b...</a></p>
<p>具体实现请参考以下jquery版本的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//jquery
(function() {
    function Sticky(){
        this.init.apply(this, arguments);
    }

    /**
     * 滚动fixed组件初始化
     * @param {object}         setting                allocate传进来的参数
     * @param {object}         setting.stickyNode     需要设置position:sticky的节点，通常是最外层
     * @param {object}         setting.fixedNode      当滚动一定距离时需要fixed在顶部的节点
     * @param {int}            setting.top            fixed之后距离顶部的top值
     * @param {int}            setting.zIndex         fixed之后的z-index值
     * @param {string}         setting.fixedClazz     fixed时给fixedNode添加的类
     * @param {function}     setting.runInScrollFn  滚动期间额外执行的函数
     * @return {void}  
     */
    Sticky.setting = {
        stickyNode: null,
        fixedNode: null,
        top: 0,
        zIndex: 100,
        fixedClazz: '',
        runInScrollFn: null
    };
    var sPro = Sticky.prototype;
    var g = window;

    /**
     * 初始化
     * @param  {object} options 设置
     * @return {void}         
     */
    sPro.init = function(options){
        this.setting = $.extend({}, Sticky.setting, options, true);
        if (options.fixedNode) {
            this.fixedNode = options.fixedNode[0] || options.fixedNode;
            this.stickyNode = options.stickyNode[0] || options.stickyNode;
            this.cssStickySupport = this.checkStickySupport();
            this.stickyNodeHeight = this.stickyNode.clientHeight;
            this.fixedClazz = options.fixedClazz;
            this.top = parseInt(options.top, 10) || 0;
            this.zIndex = parseInt(options.zIndex) || 1;
            this.setStickyCss();
            this.isfixed = false;
            // 把改变定位的操作添加到节流函数与window.requestAnimationFrame方法中，确保一定事件内必须执行一次
            this.onscrollCb = this.throttle(function() {
                this.nextFrame(this.sticky.bind(this));
            }.bind(this), 50, 100);
            this.initCss = this.getInitCss();
            this.fixedCss = this.getFixedCss();
            this.addEvent();
        }
    };

    /**
     * 获取原始css样式
     * @return {string} 定位的样式
     */
    sPro.getInitCss = function() {
        if (!!this.fixedNode) {
            return &quot;position:&quot; + this.fixedNode.style.position + &quot;;top:&quot; + this.fixedNode.style.top + &quot;px;z-index:&quot; + this.fixedNode.style.zIndex + &quot;;&quot;;
        }
        return &quot;&quot;;
    };

    /**
     * 生成fixed时的css样式
     * @return {void}
     */
    sPro.getFixedCss = function() {
        return &quot;position:fixed;top:&quot; + this.top + &quot;px;z-index:&quot; + this.zIndex + &quot;;&quot;;
    };

    /**
     * 给fixedNode设置fixed定位样式
     * @param {string} style fixed定位的样式字符串
     */
    sPro.setFixedCss = function(style) {
        if(!this.cssStickySupport){
            if (!!this.fixedNode){
                this.fixedNode.style.cssText = style;
            }
        }
    };

    /**
     * 检查浏览器是否支持positon: sticky定位
     * @return {boolean} true 支持 false 不支持
     */
    sPro.checkStickySupport = function() {
        var div= null;
        if(g.CSS &amp;&amp; g.CSS.supports){
            return g.CSS.supports(&quot;(position: sticky) or (position: -webkit-sticky)&quot;);
        }
        div = document.createElement(&quot;div&quot;);
        div.style.position = &quot;sticky&quot;;
        if(&quot;sticky&quot; === div.style.position){
            return true;
        }
        div.style.position = &quot;-webkit-sticky&quot;;
        if(&quot;-webkit-sticky&quot; === div.style.position){
            return true;
        }
        div = null;
        return false;
    };

    /**
     * 给sticyNode设置position: sticky定位
     */
    sPro.setStickyCss = function() {
        if(this.cssStickySupport){
            this.stickyNode.style.cssText = &quot;position:-webkit-sticky;position:sticky;top:&quot; + this.top + &quot;px;z-index:&quot; + this.zIndex + &quot;;&quot;;
        }
    };

    /**
     * 监听window的滚动事件
     */
    sPro.addEvent = function() {
        $(g).on('scroll', this.onscrollCb.bind(this));
    };

    /**
     * 让函数在规定时间内必须执行一次
     * @param {Function} fn     定时执行的函数
     * @param {int}      delay  延迟多少毫秒执行
     * @param {[type]}   mustRunDelay 多少毫秒内必须执行一次
     * @return {[type]}      [description]
     */
    sPro.throttle = function(fn, delay, mustRunDelay){
        var timer = null;
        var lastTime;
        return function(){
            var now = +new Date();
            var args = arguments;
            g.clearTimeout(timer);
            if(!lastTime){
                lastTime = now;
            }
            if(now - lastTime > mustRunDelay){
                fn.apply(this, args);
                lastTime = now;
            }else{
                g.setTimeout(function(){
                    fn.apply(this, args);
                }.bind(this), delay);
            }
        }.bind(this);
    };

    /**
     * window.requestAnimationFrame的兼容性写法，保证在100/6ms执行一次
     * @param  {Function} fn 100/16ms需要执行的函数
     * @return {void}      
     */
    sPro.nextFrame = (function(fn){
        var prefix = [&quot;ms&quot;, &quot;moz&quot;, &quot;webkit&quot;, &quot;o&quot;];
        var handle = {};
        handle.requestAnimationFrame = window.requestAnimationFrame;
        for(var i = 0; i < prefix.length &amp;&amp; !handle.requestAnimationFrame; ++i){
            handle.requestAnimationFrame = window[prefix[i] + &quot;RequestAnimationFrame&quot;];
        }
        if(!handle.requestAnimationFrame){
            handle.requestAnimationFrame = function(fn) {
                var raf = window.setTimeout(function() {
                    fn();
                }, 16);
                return raf;
            };
        }
        return function(fn) {
            handle.requestAnimationFrame.apply(g, arguments);
        }
    })();

    /**
     * 判断stickyNode的当前位置设置fixed|static|sticky定位
     * @return {void}
     */
    sPro.sticky = function() {
        this.setting.runInScrollFn &amp;&amp; this.setting.runInScrollFn();
        var stickyNodeBox = this.stickyNode.getBoundingClientRect();
        if(stickyNodeBox.top <= this.top &amp;&amp; !this.isfixed){
            this.setFixedCss(this.fixedCss);
            this.fixedClazz &amp;&amp; $(this.fixedNode).addClass(this.fixedClazz);
            this.isfixed = true;
            $(this).trigger('onsticky', true);
        } else if(stickyNodeBox.top > this.top &amp;&amp; this.isfixed) {
            this.setFixedCss(this.initCss.replace(/position:[^;]*/, &quot;position:static&quot;));
            g.setTimeout(function() {
                this.setFixedCss(this.initCss)
            }.bind(this), 30);
            this.fixedClazz &amp;&amp; $(this.fixedNode).removeClass(this.fixedClazz);
            this.isfixed = false;
            $(this).trigger('onsticky', true);
        }
    };

    $.initSticky = function(options){
        return new Sticky(options);
    };
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">//jquery</span>
(function() {
    function Sticky(){
        <span class="hljs-keyword">this</span>.init.apply(<span class="hljs-keyword">this</span>, arguments);
    }

    <span class="hljs-comment">/**
     * 滚动fixed组件初始化
     * <span class="hljs-doctag">@param</span> {object}         setting                allocate传进来的参数
     * <span class="hljs-doctag">@param</span> {object}         setting.stickyNode     需要设置position:sticky的节点，通常是最外层
     * <span class="hljs-doctag">@param</span> {object}         setting.fixedNode      当滚动一定距离时需要fixed在顶部的节点
     * <span class="hljs-doctag">@param</span> {int}            setting.top            fixed之后距离顶部的top值
     * <span class="hljs-doctag">@param</span> {int}            setting.zIndex         fixed之后的z-index值
     * <span class="hljs-doctag">@param</span> {string}         setting.fixedClazz     fixed时给fixedNode添加的类
     * <span class="hljs-doctag">@param</span> {function}     setting.runInScrollFn  滚动期间额外执行的函数
     * <span class="hljs-doctag">@return</span> {void}  
     */</span>
    Sticky.setting = {
        stickyNode: <span class="hljs-literal">null</span>,
        fixedNode: <span class="hljs-literal">null</span>,
        top: <span class="hljs-number">0</span>,
        zIndex: <span class="hljs-number">100</span>,
        fixedClazz: <span class="hljs-string">''</span>,
        runInScrollFn: <span class="hljs-literal">null</span>
    };
    <span class="hljs-keyword">var</span> sPro = Sticky.prototype;
    <span class="hljs-keyword">var</span> g = window;

    <span class="hljs-comment">/**
     * 初始化
     * <span class="hljs-doctag">@param</span>  {object} options 设置
     * <span class="hljs-doctag">@return</span> {void}         
     */</span>
    sPro.init = function(options){
        <span class="hljs-keyword">this</span>.setting = $.extend({}, Sticky.setting, options, <span class="hljs-literal">true</span>);
        <span class="hljs-keyword">if</span> (options.fixedNode) {
            <span class="hljs-keyword">this</span>.fixedNode = options.fixedNode[<span class="hljs-number">0</span>] || options.fixedNode;
            <span class="hljs-keyword">this</span>.stickyNode = options.stickyNode[<span class="hljs-number">0</span>] || options.stickyNode;
            <span class="hljs-keyword">this</span>.cssStickySupport = <span class="hljs-keyword">this</span>.checkStickySupport();
            <span class="hljs-keyword">this</span>.stickyNodeHeight = <span class="hljs-keyword">this</span>.stickyNode.clientHeight;
            <span class="hljs-keyword">this</span>.fixedClazz = options.fixedClazz;
            <span class="hljs-keyword">this</span>.top = parseInt(options.top, <span class="hljs-number">10</span>) || <span class="hljs-number">0</span>;
            <span class="hljs-keyword">this</span>.zIndex = parseInt(options.zIndex) || <span class="hljs-number">1</span>;
            <span class="hljs-keyword">this</span>.setStickyCss();
            <span class="hljs-keyword">this</span>.isfixed = <span class="hljs-literal">false</span>;
            <span class="hljs-comment">// 把改变定位的操作添加到节流函数与window.requestAnimationFrame方法中，确保一定事件内必须执行一次</span>
            <span class="hljs-keyword">this</span>.onscrollCb = <span class="hljs-keyword">this</span>.throttle(function() {
                <span class="hljs-keyword">this</span>.nextFrame(<span class="hljs-keyword">this</span>.sticky.bind(<span class="hljs-keyword">this</span>));
            }.bind(<span class="hljs-keyword">this</span>), <span class="hljs-number">50</span>, <span class="hljs-number">100</span>);
            <span class="hljs-keyword">this</span>.initCss = <span class="hljs-keyword">this</span>.getInitCss();
            <span class="hljs-keyword">this</span>.fixedCss = <span class="hljs-keyword">this</span>.getFixedCss();
            <span class="hljs-keyword">this</span>.addEvent();
        }
    };

    <span class="hljs-comment">/**
     * 获取原始css样式
     * <span class="hljs-doctag">@return</span> {string} 定位的样式
     */</span>
    sPro.getInitCss = function() {
        <span class="hljs-keyword">if</span> (!!<span class="hljs-keyword">this</span>.fixedNode) {
            <span class="hljs-keyword">return</span> <span class="hljs-string">"position:"</span> + <span class="hljs-keyword">this</span>.fixedNode.style.position + <span class="hljs-string">";top:"</span> + <span class="hljs-keyword">this</span>.fixedNode.style.top + <span class="hljs-string">"px;z-index:"</span> + <span class="hljs-keyword">this</span>.fixedNode.style.zIndex + <span class="hljs-string">";"</span>;
        }
        <span class="hljs-keyword">return</span> <span class="hljs-string">""</span>;
    };

    <span class="hljs-comment">/**
     * 生成fixed时的css样式
     * <span class="hljs-doctag">@return</span> {void}
     */</span>
    sPro.getFixedCss = function() {
        <span class="hljs-keyword">return</span> <span class="hljs-string">"position:fixed;top:"</span> + <span class="hljs-keyword">this</span>.top + <span class="hljs-string">"px;z-index:"</span> + <span class="hljs-keyword">this</span>.zIndex + <span class="hljs-string">";"</span>;
    };

    <span class="hljs-comment">/**
     * 给fixedNode设置fixed定位样式
     * <span class="hljs-doctag">@param</span> {string} style fixed定位的样式字符串
     */</span>
    sPro.setFixedCss = function(style) {
        <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.cssStickySupport){
            <span class="hljs-keyword">if</span> (!!<span class="hljs-keyword">this</span>.fixedNode){
                <span class="hljs-keyword">this</span>.fixedNode.style.cssText = style;
            }
        }
    };

    <span class="hljs-comment">/**
     * 检查浏览器是否支持positon: sticky定位
     * <span class="hljs-doctag">@return</span> {boolean} true 支持 false 不支持
     */</span>
    sPro.checkStickySupport = function() {
        <span class="hljs-keyword">var</span> div= <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">if</span>(g.CSS &amp;&amp; g.CSS.supports){
            <span class="hljs-keyword">return</span> g.CSS.supports(<span class="hljs-string">"(position: sticky) or (position: -webkit-sticky)"</span>);
        }
        div = document.createElement(<span class="hljs-string">"div"</span>);
        div.style.position = <span class="hljs-string">"sticky"</span>;
        <span class="hljs-keyword">if</span>(<span class="hljs-string">"sticky"</span> === div.style.position){
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
        }
        div.style.position = <span class="hljs-string">"-webkit-sticky"</span>;
        <span class="hljs-keyword">if</span>(<span class="hljs-string">"-webkit-sticky"</span> === div.style.position){
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
        }
        div = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    };

    <span class="hljs-comment">/**
     * 给sticyNode设置position: sticky定位
     */</span>
    sPro.setStickyCss = function() {
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.cssStickySupport){
            <span class="hljs-keyword">this</span>.stickyNode.style.cssText = <span class="hljs-string">"position:-webkit-sticky;position:sticky;top:"</span> + <span class="hljs-keyword">this</span>.top + <span class="hljs-string">"px;z-index:"</span> + <span class="hljs-keyword">this</span>.zIndex + <span class="hljs-string">";"</span>;
        }
    };

    <span class="hljs-comment">/**
     * 监听window的滚动事件
     */</span>
    sPro.addEvent = function() {
        $(g).on(<span class="hljs-string">'scroll'</span>, <span class="hljs-keyword">this</span>.onscrollCb.bind(<span class="hljs-keyword">this</span>));
    };

    <span class="hljs-comment">/**
     * 让函数在规定时间内必须执行一次
     * <span class="hljs-doctag">@param</span> {Function} fn     定时执行的函数
     * <span class="hljs-doctag">@param</span> {int}      delay  延迟多少毫秒执行
     * <span class="hljs-doctag">@param</span> {[type]}   mustRunDelay 多少毫秒内必须执行一次
     * <span class="hljs-doctag">@return</span> {[type]}      [description]
     */</span>
    sPro.throttle = function(fn, delay, mustRunDelay){
        <span class="hljs-keyword">var</span> timer = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">var</span> lastTime;
        <span class="hljs-keyword">return</span> function(){
            <span class="hljs-keyword">var</span> now = +new Date();
            <span class="hljs-keyword">var</span> args = arguments;
            g.clearTimeout(timer);
            <span class="hljs-keyword">if</span>(!lastTime){
                lastTime = now;
            }
            <span class="hljs-keyword">if</span>(now - lastTime &gt; mustRunDelay){
                fn.apply(<span class="hljs-keyword">this</span>, args);
                lastTime = now;
            }<span class="hljs-keyword">else</span>{
                g.setTimeout(function(){
                    fn.apply(<span class="hljs-keyword">this</span>, args);
                }.bind(<span class="hljs-keyword">this</span>), delay);
            }
        }.bind(<span class="hljs-keyword">this</span>);
    };

    <span class="hljs-comment">/**
     * window.requestAnimationFrame的兼容性写法，保证在100/6ms执行一次
     * <span class="hljs-doctag">@param</span>  {Function} fn 100/16ms需要执行的函数
     * <span class="hljs-doctag">@return</span> {void}      
     */</span>
    sPro.nextFrame = (function(fn){
        <span class="hljs-keyword">var</span> prefix = [<span class="hljs-string">"ms"</span>, <span class="hljs-string">"moz"</span>, <span class="hljs-string">"webkit"</span>, <span class="hljs-string">"o"</span>];
        <span class="hljs-keyword">var</span> handle = {};
        handle.requestAnimationFrame = window.requestAnimationFrame;
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; prefix.length &amp;&amp; !handle.requestAnimationFrame; ++i){
            handle.requestAnimationFrame = window[prefix[i] + <span class="hljs-string">"RequestAnimationFrame"</span>];
        }
        <span class="hljs-keyword">if</span>(!handle.requestAnimationFrame){
            handle.requestAnimationFrame = function(fn) {
                <span class="hljs-keyword">var</span> raf = window.setTimeout(function() {
                    fn();
                }, <span class="hljs-number">16</span>);
                <span class="hljs-keyword">return</span> raf;
            };
        }
        <span class="hljs-keyword">return</span> function(fn) {
            handle.requestAnimationFrame.apply(g, arguments);
        }
    })();

    <span class="hljs-comment">/**
     * 判断stickyNode的当前位置设置fixed|static|sticky定位
     * <span class="hljs-doctag">@return</span> {void}
     */</span>
    sPro.sticky = function() {
        <span class="hljs-keyword">this</span>.setting.runInScrollFn &amp;&amp; <span class="hljs-keyword">this</span>.setting.runInScrollFn();
        <span class="hljs-keyword">var</span> stickyNodeBox = <span class="hljs-keyword">this</span>.stickyNode.getBoundingClientRect();
        <span class="hljs-keyword">if</span>(stickyNodeBox.top &lt;= <span class="hljs-keyword">this</span>.top &amp;&amp; !<span class="hljs-keyword">this</span>.isfixed){
            <span class="hljs-keyword">this</span>.setFixedCss(<span class="hljs-keyword">this</span>.fixedCss);
            <span class="hljs-keyword">this</span>.fixedClazz &amp;&amp; $(<span class="hljs-keyword">this</span>.fixedNode).addClass(<span class="hljs-keyword">this</span>.fixedClazz);
            <span class="hljs-keyword">this</span>.isfixed = <span class="hljs-literal">true</span>;
            $(<span class="hljs-keyword">this</span>).trigger(<span class="hljs-string">'onsticky'</span>, <span class="hljs-literal">true</span>);
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(stickyNodeBox.top &gt; <span class="hljs-keyword">this</span>.top &amp;&amp; <span class="hljs-keyword">this</span>.isfixed) {
            <span class="hljs-keyword">this</span>.setFixedCss(<span class="hljs-keyword">this</span>.initCss.replace(/position:[^;]*/, <span class="hljs-string">"position:static"</span>));
            g.setTimeout(function() {
                <span class="hljs-keyword">this</span>.setFixedCss(<span class="hljs-keyword">this</span>.initCss)
            }.bind(<span class="hljs-keyword">this</span>), <span class="hljs-number">30</span>);
            <span class="hljs-keyword">this</span>.fixedClazz &amp;&amp; $(<span class="hljs-keyword">this</span>.fixedNode).removeClass(<span class="hljs-keyword">this</span>.fixedClazz);
            <span class="hljs-keyword">this</span>.isfixed = <span class="hljs-literal">false</span>;
            $(<span class="hljs-keyword">this</span>).trigger(<span class="hljs-string">'onsticky'</span>, <span class="hljs-literal">true</span>);
        }
    };

    $.initSticky = function(options){
        <span class="hljs-keyword">return</span> new Sticky(options);
    };
})();</code></pre>
<p>html 结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;m-nav&quot;>
            <div class=&quot;nav-fixed fixed&quot; id=&quot;j-nav&quot; style=&quot;position: fixed; top: 0px; z-index: 100;&quot;>
                <ul class=&quot;f-cb&quot;>
                    <li class=&quot;active&quot; anchor-id=&quot;j-understand&quot;>了解儿童编程</li>
                    <li anchor-id=&quot;j-join&quot;>参与公益直播课</li>
                    <li anchor-id=&quot;j-upload&quot;>上传编程作品</li>
                </ul>
            </div>
        </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"m-nav"</span>&gt;
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav-fixed fixed"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"j-nav"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"position: fixed; top: 0px; z-index: 100;"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"f-cb"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"active"</span> <span class="hljs-attr">anchor-id</span>=<span class="hljs-string">"j-understand"</span>&gt;</span>了解儿童编程<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">anchor-id</span>=<span class="hljs-string">"j-join"</span>&gt;</span>参与公益直播课<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">anchor-id</span>=<span class="hljs-string">"j-upload"</span>&gt;</span>上传编程作品<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        &lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>css 结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".g-page-box .m-nav&nbsp;{

 height:&nbsp;1.33333rem;

}

.g-page-box .m-nav .nav-fixed&nbsp;{

 height:&nbsp;.86667rem;
 padding:&nbsp;.22667rem .50667rem;
 background-color:&nbsp;#1aadbb;
 position:&nbsp;relative;
 transform:&nbsp;translate3d(0, 0, 0);
 -webkit-transform:&nbsp;translate3d(0, 0, 0);
 transition:&nbsp;height 4s;

}

.fixed{
position:&nbsp;fixed;
 top:&nbsp;0px;
 z-index:&nbsp;100;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.g-page-box</span> <span class="hljs-selector-class">.m-nav</span>&nbsp;{

 <span class="hljs-attribute">height</span>:&nbsp;<span class="hljs-number">1.33333rem</span>;

}

<span class="hljs-selector-class">.g-page-box</span> <span class="hljs-selector-class">.m-nav</span> <span class="hljs-selector-class">.nav-fixed</span>&nbsp;{

 <span class="hljs-attribute">height</span>:&nbsp;.<span class="hljs-number">86667rem</span>;
 <span class="hljs-attribute">padding</span>:&nbsp;.<span class="hljs-number">22667rem</span> .<span class="hljs-number">50667rem</span>;
 <span class="hljs-attribute">background-color</span>:&nbsp;<span class="hljs-number">#1aadbb</span>;
 <span class="hljs-attribute">position</span>:&nbsp;relative;
 <span class="hljs-attribute">transform</span>:&nbsp;<span class="hljs-built_in">translate3d</span>(0, 0, 0);
 <span class="hljs-attribute">-webkit-transform</span>:&nbsp;<span class="hljs-built_in">translate3d</span>(0, 0, 0);
 <span class="hljs-attribute">transition</span>:&nbsp;height <span class="hljs-number">4s</span>;

}

<span class="hljs-selector-class">.fixed</span>{
<span class="hljs-attribute">position</span>:&nbsp;fixed;
 <span class="hljs-attribute">top</span>:&nbsp;<span class="hljs-number">0px</span>;
 <span class="hljs-attribute">z-index</span>:&nbsp;<span class="hljs-number">100</span>;
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
解决页面滚动时吸顶操作不能及时响应bug

## 原文链接
[https://segmentfault.com/a/1190000008004300](https://segmentfault.com/a/1190000008004300)

