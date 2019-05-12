---
title: '前端的3D(css3版本)--淘宝造物节3D创景的制作' 
date: 2019-01-12 2:30:24
hidden: true
slug: a5q3x6qcyk
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>前端的3D(css3版本)</strong>，其实是依托Css3的功劳，先上一个例子  <a href="http://antario.act.qq.com/" rel="nofollow noreferrer" target="_blank"></a><a href="http://antario.act.qq.com/" rel="nofollow noreferrer" target="_blank">http://antario.act.qq.com/</a><br>代码地址：链接: <a href="https://pan.baidu.com/s/1sldhljJ" rel="nofollow noreferrer" target="_blank">https://pan.baidu.com/s/1sldhljJ</a> 密码: i6qh   <br>这动画纵有万般变化，也离不开以下几个属性</p>
<ul>
<li><p><strong>transform</strong> (元素2D 3D转换)<br>translate,3d,X,Y,Z (移动距离)<br>scale,3d,X,Y,Z (缩放比例)<br>rotate,3d,X,Y,Z (旋转角度)<br>skew,X,Y (倾斜角度)</p></li>
<li><p><strong>transform-origin</strong> (允许被转换元素位置)<br>left center right length %</p></li>
<li><p><strong>transform-style</strong> (被嵌套元素在3D空间中显示)<br>flat (2d) presever-3d (3d)</p></li>
<li><p><strong>perspective</strong> (3D元素透视效果 俗称"景深")<br>number</p></li>
<li><p><strong>perspective-origin</strong> (设置3D基数位置 x,y)<br>top center right length %</p></li>
<li><p><strong>backface-visibility</strong> (元素不面对屏幕是否可见)<br>visible hidden</p></li>
</ul>
<hr>
<p>这里写一个变化的例子，帮助理解</p>
<p>以上例子只是单一的变化 如果多个变化一起执行 遵守 <strong>“慢写的先执行”</strong><br>比如：<br><strong>原始图片：</strong><br><span class="img-wrap"><img data-src="/img/bVOpIA?w=445&amp;h=260" src="https://static.alili.tech/img/bVOpIA?w=445&amp;h=260" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>"translateX(150px) rotateY(180deg)"：</strong> 先旋转再移动<br><span class="img-wrap"><img data-src="/img/bVOpIR?w=468&amp;h=246" src="https://static.alili.tech/img/bVOpIR?w=468&amp;h=246" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>"rotateY(180deg) translateX(150px)"：</strong> 先移动再旋转<br><span class="img-wrap"><img data-src="/img/bVOpIQ?w=468&amp;h=246" src="https://static.alili.tech/img/bVOpIQ?w=468&amp;h=246" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>为什么两者只是前后顺序不同 结果却是相反的呢？<br>这就涉及到了 中心点的问题 transform-origin<br>transform-origin 变换原点 center center;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="关键字: top bottom center left right;
具体的长度单位(em,rem,px...)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>关键字: <span class="hljs-built_in">top</span> <span class="hljs-built_in">bottom</span> center <span class="hljs-built_in">left</span> <span class="hljs-built_in">right</span>;
具体的长度单位(em,rem,px...)
</code></pre>
<p>会受到原点影响的变换有：rotate、skew、scale    <br>translate不受影响</p>
<p>第一个是先根据中心原点旋转180度 再向右移动150pxbr    <br>第二个向右移动150px 中心点未改变 再旋转180deg</p>
<p>还有一点需要注意：</p>
<p>在js中没有办法 通过计算后样式 获取到 transform中的相关操作，只能获取到矩阵</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getComputedStyle(XX)['transform'] 得到的是 matrix3d(...)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">getComputedStyle</span><span class="hljs-params">(XX)</span></span>[<span class="hljs-string">'transform'</span>] 得到的是 matrix3d(...)
</code></pre>
<p>关于 transform的所有操作，通过封装cssTransform来进行操作，<br>在 cssTransform 中来记录 对transform的每一步操作，相当于对象赋值。获取的时候，就获取 cssTransform中的记录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function css(element, attr , val){
    // 通过判断 归纳transform 属性 直接跳到cssTramsform 剩下的直接常规方法处理
    if(attr == &quot;rotate&quot; || attr == &quot;rotateX&quot; 
    || attr == &quot;rotateY&quot; ||attr == &quot;rotateZ&quot; 
    || attr == &quot;scale&quot; || attr == &quot;scaleX&quot;
    || attr == &quot;scaleY&quot; || attr == &quot;skewX&quot;
    || attr == &quot;skewY&quot; || attr == &quot;translateX&quot;
    || attr == &quot;translateY&quot; || attr == &quot;translateZ&quot; ){
        return cssTransform(element, attr, val);
    }
    if(arguments.length == 2){
        var val = getComputedStyle(element)[attr];
        if(attr=='opacity'){
            val = Math.round(val*100);
        }
        return parseFloat(val);
    } 
    if(attr == &quot;opacity&quot;) {
        element.style.opacity= val/100;
    } else {
        element.style[attr]= val + &quot;px&quot;;    
    }
}
function cssTransform(el, attr, val) {
    if(!el.transform){
        el.transform = {}
    }
    // 如果val为空 为获取值
    if(typeof val == &quot;undefined&quot;){
        if(typeof el.transform[attr] == &quot;undefined&quot;){
            switch(attr) {
                case &quot;scale&quot;:
                case &quot;scaleX&quot;:
                case &quot;scaleY&quot;:
                    el.transform[attr] = 100;
                    break;
                default:
                    el.transform[attr] = 0;    
            }
        }
        return el.transform[attr];
    } else {
        // 设置值 原理就是对象的赋值
        var transformVal = &quot;&quot;;
        el.transform[attr] = Number(val);
        for(var s in el.transform){
            switch(s){
                case &quot;rotate&quot;:
                case &quot;rotateX&quot;:
                case &quot;rotateY&quot;:
                case &quot;rotateZ&quot;:
                case &quot;skewX&quot;:
                case &quot;skewY&quot;:
                    transformVal += &quot; &quot;+s+&quot;(&quot;+el.transform[s]+&quot;deg)&quot;;
                    break;
                case &quot;translateX&quot;:
                case &quot;translateY&quot;:
                case &quot;translateZ&quot;:
                    transformVal += &quot; &quot;+s+&quot;(&quot;+el.transform[s]+&quot;px)&quot;;
                    break;
                case &quot;scale&quot;:
                case &quot;scaleX&quot;:
                case &quot;scaleY&quot;:
                    transformVal += &quot; &quot;+s+&quot;(&quot;+el.transform[s]/100+&quot;)&quot;;
                    break;
            }
        }
        el.style.WebkitTransform = el.style.transform = transformVal;
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">css</span>(<span class="hljs-params">element, attr , val</span>)</span>{
    <span class="hljs-comment">// 通过判断 归纳transform 属性 直接跳到cssTramsform 剩下的直接常规方法处理</span>
    <span class="hljs-keyword">if</span>(attr == <span class="hljs-string">"rotate"</span> || attr == <span class="hljs-string">"rotateX"</span> 
    || attr == <span class="hljs-string">"rotateY"</span> ||attr == <span class="hljs-string">"rotateZ"</span> 
    || attr == <span class="hljs-string">"scale"</span> || attr == <span class="hljs-string">"scaleX"</span>
    || attr == <span class="hljs-string">"scaleY"</span> || attr == <span class="hljs-string">"skewX"</span>
    || attr == <span class="hljs-string">"skewY"</span> || attr == <span class="hljs-string">"translateX"</span>
    || attr == <span class="hljs-string">"translateY"</span> || attr == <span class="hljs-string">"translateZ"</span> ){
        <span class="hljs-keyword">return</span> cssTransform(element, attr, val);
    }
    <span class="hljs-keyword">if</span>(<span class="hljs-built_in">arguments</span>.length == <span class="hljs-number">2</span>){
        <span class="hljs-keyword">var</span> val = getComputedStyle(element)[attr];
        <span class="hljs-keyword">if</span>(attr==<span class="hljs-string">'opacity'</span>){
            val = <span class="hljs-built_in">Math</span>.round(val*<span class="hljs-number">100</span>);
        }
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">parseFloat</span>(val);
    } 
    <span class="hljs-keyword">if</span>(attr == <span class="hljs-string">"opacity"</span>) {
        element.style.opacity= val/<span class="hljs-number">100</span>;
    } <span class="hljs-keyword">else</span> {
        element.style[attr]= val + <span class="hljs-string">"px"</span>;    
    }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cssTransform</span>(<span class="hljs-params">el, attr, val</span>) </span>{
    <span class="hljs-keyword">if</span>(!el.transform){
        el.transform = {}
    }
    <span class="hljs-comment">// 如果val为空 为获取值</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> val == <span class="hljs-string">"undefined"</span>){
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> el.transform[attr] == <span class="hljs-string">"undefined"</span>){
            <span class="hljs-keyword">switch</span>(attr) {
                <span class="hljs-keyword">case</span> <span class="hljs-string">"scale"</span>:
                <span class="hljs-keyword">case</span> <span class="hljs-string">"scaleX"</span>:
                <span class="hljs-keyword">case</span> <span class="hljs-string">"scaleY"</span>:
                    el.transform[attr] = <span class="hljs-number">100</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">default</span>:
                    el.transform[attr] = <span class="hljs-number">0</span>;    
            }
        }
        <span class="hljs-keyword">return</span> el.transform[attr];
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// 设置值 原理就是对象的赋值</span>
        <span class="hljs-keyword">var</span> transformVal = <span class="hljs-string">""</span>;
        el.transform[attr] = <span class="hljs-built_in">Number</span>(val);
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> s <span class="hljs-keyword">in</span> el.transform){
            <span class="hljs-keyword">switch</span>(s){
                <span class="hljs-keyword">case</span> <span class="hljs-string">"rotate"</span>:
                <span class="hljs-keyword">case</span> <span class="hljs-string">"rotateX"</span>:
                <span class="hljs-keyword">case</span> <span class="hljs-string">"rotateY"</span>:
                <span class="hljs-keyword">case</span> <span class="hljs-string">"rotateZ"</span>:
                <span class="hljs-keyword">case</span> <span class="hljs-string">"skewX"</span>:
                <span class="hljs-keyword">case</span> <span class="hljs-string">"skewY"</span>:
                    transformVal += <span class="hljs-string">" "</span>+s+<span class="hljs-string">"("</span>+el.transform[s]+<span class="hljs-string">"deg)"</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">"translateX"</span>:
                <span class="hljs-keyword">case</span> <span class="hljs-string">"translateY"</span>:
                <span class="hljs-keyword">case</span> <span class="hljs-string">"translateZ"</span>:
                    transformVal += <span class="hljs-string">" "</span>+s+<span class="hljs-string">"("</span>+el.transform[s]+<span class="hljs-string">"px)"</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">"scale"</span>:
                <span class="hljs-keyword">case</span> <span class="hljs-string">"scaleX"</span>:
                <span class="hljs-keyword">case</span> <span class="hljs-string">"scaleY"</span>:
                    transformVal += <span class="hljs-string">" "</span>+s+<span class="hljs-string">"("</span>+el.transform[s]/<span class="hljs-number">100</span>+<span class="hljs-string">")"</span>;
                    <span class="hljs-keyword">break</span>;
            }
        }
        el.style.WebkitTransform = el.style.transform = transformVal;
    }
}
</code></pre>
<hr>
<p>加下来介绍核心库：m.Tween.js运动函数<br>使用如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MTween({
    el: div, // 目标元素
    target: { // 期望最后变化的值
        scale: 200,
        translateX: 200,
        translateY: 200,
        rotate: 360
    },
    time: 1000, // 动画执行时间
    type: &quot;backOut&quot;, // 动画特效 贝塞尔曲线
    callBack: function(){ // 动画执行结束的回调
        console.log(&quot;动画执行完了&quot;);
    },
    callIn: function(){ // 动画执行过程的回调
        console.log(&quot;动画执行中&quot;);
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">MTween</span>({
    <span class="hljs-attribute">el</span>: div, <span class="hljs-comment">// 目标元素</span>
    <span class="hljs-attribute">target</span>: { <span class="hljs-comment">// 期望最后变化的值</span>
        <span class="hljs-attribute">scale</span>: <span class="hljs-number">200</span>,
        <span class="hljs-attribute">translateX</span>: <span class="hljs-number">200</span>,
        <span class="hljs-attribute">translateY</span>: <span class="hljs-number">200</span>,
        <span class="hljs-attribute">rotate</span>: <span class="hljs-number">360</span>
    },
    <span class="hljs-attribute">time</span>: <span class="hljs-number">1000</span>, <span class="hljs-comment">// 动画执行时间</span>
    <span class="hljs-attribute">type</span>: <span class="hljs-string">"backOut"</span>, <span class="hljs-comment">// 动画特效 贝塞尔曲线</span>
    <span class="hljs-attribute">callBack</span>: function(){ <span class="hljs-comment">// 动画执行结束的回调</span>
        console.log(<span class="hljs-string">"动画执行完了"</span>);
    },
    <span class="hljs-attribute">callIn</span>: function(){ <span class="hljs-comment">// 动画执行过程的回调</span>
        <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">"动画执行中"</span>);
    }
})</code></pre>
<p>实现的代码也很简单</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function MTween(init){
    var t = 0;
    var b = {};
    var c = {};
    var d = init.time / 20;
    for(var s in init.target){ 
        b[s] = css(init.el, s); 
        c[s] = init.target[s] - b[s];
    }
    clearInterval(init.el.timer); 
    init.el.timer = setInterval(
        function(){
            t++;
            if(t>d){
                clearInterval(init.el.timer);
                init.callBack&amp;&amp;init.callBack.call(init.el);
            } else {
                init.callIn&amp;&amp;init.callIn.call(init.el);
                for(var s in b){
                    var val = (Tween[init.type](t,b[s],c[s],d)).toFixed(2);
                    css(init.el, s, val);
                }
            }
        },20);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs swift"><code>function <span class="hljs-type">MTween</span>(<span class="hljs-keyword">init</span>){
    <span class="hljs-keyword">var</span> t = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> b = {};
    <span class="hljs-keyword">var</span> <span class="hljs-built_in">c</span> = {};
    <span class="hljs-keyword">var</span> d = <span class="hljs-keyword">init</span>.time / <span class="hljs-number">20</span>;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> s <span class="hljs-keyword">in</span> <span class="hljs-keyword">init</span>.target){ 
        b[s] = css(<span class="hljs-keyword">init</span>.el, s); 
        <span class="hljs-built_in">c</span>[s] = <span class="hljs-keyword">init</span>.target[s] - b[s];
    }
    clearInterval(<span class="hljs-keyword">init</span>.el.timer); 
    <span class="hljs-keyword">init</span>.el.timer = setInterval(
        function(){
            t++;
            <span class="hljs-keyword">if</span>(t&gt;d){
                clearInterval(<span class="hljs-keyword">init</span>.el.timer);
                <span class="hljs-keyword">init</span>.callBack&amp;&amp;<span class="hljs-keyword">init</span>.callBack.call(<span class="hljs-keyword">init</span>.el);
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">init</span>.callIn&amp;&amp;<span class="hljs-keyword">init</span>.callIn.call(<span class="hljs-keyword">init</span>.el);
                <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> s <span class="hljs-keyword">in</span> b){
                    <span class="hljs-keyword">var</span> val = (<span class="hljs-type">Tween</span>[<span class="hljs-keyword">init</span>.type](t,b[s],<span class="hljs-built_in">c</span>[s],d)).toFixed(<span class="hljs-number">2</span>);
                    css(<span class="hljs-keyword">init</span>.el, s, val);
                }
            }
        },<span class="hljs-number">20</span>);
}</code></pre>
<p>以上只是基础知识，为下面的教程铺垫</p>
<h2 id="articleHeader0">正文开始：</h2>
<p><strong>1、安踏图标转动，来回变化，消失</strong>   <br><strong>2、碎片，云朵不规则圆柱转动</strong><br><strong>3、主体，浮层 圆柱形滚动入场</strong>   <br><strong>4、移动事件，陀螺仪，横竖屏事件</strong></p>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 整体Html结构
<div id=&quot;pageBg&quot;></div>
<div id=&quot;view&quot;>
    <div id=&quot;logo1&quot;>
        <div class=&quot;logoImg&quot;>
            <img src=&quot;load/logo.png&quot;>
        </div>
        <p class=&quot;logoText&quot;>已加载 0%</p>
    </div>
    <div id=&quot;main&quot;>
        <div id=&quot;tZ&quot;>
            <div id=&quot;panoBg&quot;></div>
            <div id=&quot;cloud&quot;></div>
            <div id=&quot;pano&quot;></div>
        </div>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 整体Html结构</span>
&lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">"pageBg"</span>&gt;&lt;/div&gt;
&lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">"view"</span>&gt;
    &lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">"logo1"</span>&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"logoImg"</span>&gt;
            &lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"load/logo.png"</span>&gt;
        &lt;/div&gt;
        &lt;<span class="hljs-selector-tag">p</span> class=<span class="hljs-string">"logoText"</span>&gt;已加载 <span class="hljs-number">0%</span>&lt;/p&gt;
    &lt;/div&gt;
    &lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">"main"</span>&gt;
        &lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">"tZ"</span>&gt;
            &lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">"panoBg"</span>&gt;&lt;/div&gt;
            &lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">"cloud"</span>&gt;&lt;/div&gt;
            &lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">"pano"</span>&gt;&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
<h2 id="articleHeader1">1、安踏图标转动，来回变化，消失</h2>
<p><span class="img-wrap"><img data-src="/img/bVOSEb?w=328&amp;h=580" src="https://static.alili.tech/img/bVOSEb?w=328&amp;h=580" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong> 分析： 安踏图标有三个 分别为 logo1 logo2 logo3 (logo2 logo3 为动态生成，并提前赋值属性，加上360度旋转动画)</strong>   <br><strong> logo1 使用css3动画animation 360度转动 1s后透明度为0 并删除</strong>    <br><strong> logo2 由 translateZ : -1000 经过300ms 变为0 向前移动；接着经过800ms 变为-1000 向后移动</strong>    <br><strong> logo3 在logo2 删除后出现 由远到近 再接着消失</strong></p>
<p>其实代码很简单 就是用下面的模型代码实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MTween({
    el: logo1,
    target: {
      opacity: 0 // 将要最终变化的值
    },
    time: 1000,
    type: 'easeOut',
    callBack: function() { // 运动结束的执行动作
      view.removeChild(logo1)
      css(logo2, 'opacity', 100) // 显示logo2
      // 接下来做logo2动作 以此类推
      MTween({
        el: logo2,
        target: {
          translateZ: 0
        },
        time: 300,
        type: 'easeBoth',
        callBack: anmt2 
      })
    }
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">MTween</span>({
    <span class="hljs-attribute">el</span>: logo1,
    <span class="hljs-attribute">target</span>: {
      <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span> <span class="hljs-comment">// 将要最终变化的值</span>
    },
    <span class="hljs-attribute">time</span>: <span class="hljs-number">1000</span>,
    <span class="hljs-attribute">type</span>: <span class="hljs-string">'easeOut'</span>,
    <span class="hljs-attribute">callBack</span>: function() { <span class="hljs-comment">// 运动结束的执行动作</span>
      view.removeChild(logo1)
      css(logo2, <span class="hljs-string">'opacity'</span>, <span class="hljs-number">100</span>) <span class="hljs-comment">// 显示logo2</span>
      <span class="hljs-comment">// 接下来做logo2动作 以此类推</span>
      MTween({
        <span class="hljs-attribute">el</span>: logo2,
        <span class="hljs-attribute">target</span>: {
          <span class="hljs-attribute">translateZ</span>: <span class="hljs-number">0</span>
        },
        <span class="hljs-attribute">time</span>: <span class="hljs-number">300</span>,
        <span class="hljs-attribute">type</span>: <span class="hljs-string">'easeBoth'</span>,
        <span class="hljs-attribute">callBack</span>: anmt2 
      })
    }
  })</code></pre>
<h2 id="articleHeader2">2、碎片，云朵不规则圆柱转动</h2>
<p><span class="img-wrap"><img data-src="/img/bVOSIS?w=328&amp;h=580" src="https://static.alili.tech/img/bVOSIS?w=328&amp;h=580" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong>分析：将9张碎片图片乘3 然后设置随机的 rotateY rotateX translateZ translateY 变成一个随机圆柱排布，然后在碎片的主层加上 rotateY 旋转动画，再用动画控制translateZ 向后移动</strong><br><strong>祥云入场: 利用 sin cos R 计算translateX translateZ，然后在云层主层加上 rotateY 旋转动画，再用动画控制translateZ 向后移动</strong></p>
<p><strong>碎片代码</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//基础框架版本 排成一圈
for (var i = 0; i < 27; i++) {
    var R = 10 + Math.round(Math.random()*240);
    var deg =  Math.round(Math.random()*360)
    css(span, 'rotateY', deg)
    css(span, 'translateZ', R)
}
// 添加上下分布
css(logo4, &quot;translateZ&quot;, -2000)
css(logo4, &quot;scale&quot;, 0)
for (var i = 0; i < 27; i++) {
    var xR = 20 + Math.round(Math.random() * 240) // 圆柱碎片的X半径
    var xDeg = Math.round(Math.random() * 360)
    var yR = 10 + Math.round(Math.random() * 240) // 圆柱碎片的Y半径
    var yDeg = Math.round(Math.random() * 360)
    css(span, &quot;rotateY&quot;, xDeg);
    css(span, &quot;translateZ&quot;, xR);
    css(span, &quot;rotateX&quot;, yDeg);
    css(span, &quot;translateY&quot;, yR)
}
// 从远到近的移动
MTween({
    el: logo4,
    target: {
      translateZ: 0,
      scale: 100
    },
    time: 500,
    type: &quot;easeOutStrong&quot;,
    callBack: function() {
      setTimeout(function() { //从近到远
        MTween({
          el: logo4,
          target: {
            translateZ: -1000,
            scale: 20
          },
          ...
          })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//基础框架版本 排成一圈</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">27</span>; i++) {
    <span class="hljs-keyword">var</span> R = <span class="hljs-number">10</span> + <span class="hljs-built_in">Math</span>.round(<span class="hljs-built_in">Math</span>.random()*<span class="hljs-number">240</span>);
    <span class="hljs-keyword">var</span> deg =  <span class="hljs-built_in">Math</span>.round(<span class="hljs-built_in">Math</span>.random()*<span class="hljs-number">360</span>)
    css(span, <span class="hljs-string">'rotateY'</span>, deg)
    css(span, <span class="hljs-string">'translateZ'</span>, R)
}
<span class="hljs-comment">// 添加上下分布</span>
css(logo4, <span class="hljs-string">"translateZ"</span>, <span class="hljs-number">-2000</span>)
css(logo4, <span class="hljs-string">"scale"</span>, <span class="hljs-number">0</span>)
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">27</span>; i++) {
    <span class="hljs-keyword">var</span> xR = <span class="hljs-number">20</span> + <span class="hljs-built_in">Math</span>.round(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">240</span>) <span class="hljs-comment">// 圆柱碎片的X半径</span>
    <span class="hljs-keyword">var</span> xDeg = <span class="hljs-built_in">Math</span>.round(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">360</span>)
    <span class="hljs-keyword">var</span> yR = <span class="hljs-number">10</span> + <span class="hljs-built_in">Math</span>.round(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">240</span>) <span class="hljs-comment">// 圆柱碎片的Y半径</span>
    <span class="hljs-keyword">var</span> yDeg = <span class="hljs-built_in">Math</span>.round(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">360</span>)
    css(span, <span class="hljs-string">"rotateY"</span>, xDeg);
    css(span, <span class="hljs-string">"translateZ"</span>, xR);
    css(span, <span class="hljs-string">"rotateX"</span>, yDeg);
    css(span, <span class="hljs-string">"translateY"</span>, yR)
}
<span class="hljs-comment">// 从远到近的移动</span>
MTween({
    <span class="hljs-attr">el</span>: logo4,
    <span class="hljs-attr">target</span>: {
      <span class="hljs-attr">translateZ</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">scale</span>: <span class="hljs-number">100</span>
    },
    <span class="hljs-attr">time</span>: <span class="hljs-number">500</span>,
    <span class="hljs-attr">type</span>: <span class="hljs-string">"easeOutStrong"</span>,
    <span class="hljs-attr">callBack</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">//从近到远</span>
        MTween({
          <span class="hljs-attr">el</span>: logo4,
          <span class="hljs-attr">target</span>: {
            <span class="hljs-attr">translateZ</span>: <span class="hljs-number">-1000</span>,
            <span class="hljs-attr">scale</span>: <span class="hljs-number">20</span>
          },
          ...
          })</code></pre>
<p><strong>祥云代码</strong><br>这里需要每一片云朵都面对我们自己<br><span class="img-wrap"><img data-src="/img/bVO2fo?w=445&amp;h=414" src="https://static.alili.tech/img/bVO2fo?w=445&amp;h=414" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>这里知道每一个R deg，便能求得x, z<br>x = Math.sin(deg <em> Math.PI / 180) </em> R <br>z = Math.cos(deg <em> Math.PI / 180) </em> R</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var span = document.createElement(&quot;span&quot;);
    span.style.backgroundImage = 'url(' + imgData.cloud[i % 3] + ')';
    var R = 200 + (Math.random() * 150) // 设置随机半径
    var deg = (360 / 9) * i // 圆柱各个角度
    var x = Math.sin(deg * Math.PI / 180) * R // sin求得X
    var z = Math.cos(deg * Math.PI / 180) * R // cos求得Z
    var y = (Math.random() - .5) * 200 // 上下分布
    css(span, &quot;translateX&quot;, x)
    css(span, &quot;translateZ&quot;, z)
    css(span, &quot;translateY&quot;, y)
    ...
    // 设置动画
    MTween({
    el: cloud,
    target: {
      rotateY: 540
    },
    time: 3500,
    type: &quot;easeIn&quot;,
    callIn: function() { // 这里需要用到运动过程的回调 将祥云外层的角度赋予内层祥云的每个角度
      var deg = -css(cloud, &quot;rotateY&quot;);
      for (var i = 0; i < cloud.children.length; i++) {
        css(cloud.children[i], &quot;rotateY&quot;, deg);
      }
    }
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  <span class="hljs-keyword">var</span> span = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"span"</span>);
    span.style.backgroundImage = <span class="hljs-string">'url('</span> + imgData.cloud[i % <span class="hljs-number">3</span>] + <span class="hljs-string">')'</span>;
    <span class="hljs-keyword">var</span> R = <span class="hljs-number">200</span> + (<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">150</span>) <span class="hljs-comment">// 设置随机半径</span>
    <span class="hljs-keyword">var</span> deg = (<span class="hljs-number">360</span> / <span class="hljs-number">9</span>) * i <span class="hljs-comment">// 圆柱各个角度</span>
    <span class="hljs-keyword">var</span> x = <span class="hljs-built_in">Math</span>.sin(deg * <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">180</span>) * R <span class="hljs-comment">// sin求得X</span>
    <span class="hljs-keyword">var</span> z = <span class="hljs-built_in">Math</span>.cos(deg * <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">180</span>) * R <span class="hljs-comment">// cos求得Z</span>
    <span class="hljs-keyword">var</span> y = (<span class="hljs-built_in">Math</span>.random() - <span class="hljs-number">.5</span>) * <span class="hljs-number">200</span> <span class="hljs-comment">// 上下分布</span>
    css(span, <span class="hljs-string">"translateX"</span>, x)
    css(span, <span class="hljs-string">"translateZ"</span>, z)
    css(span, <span class="hljs-string">"translateY"</span>, y)
    ...
    <span class="hljs-comment">// 设置动画</span>
    MTween({
    <span class="hljs-attr">el</span>: cloud,
    <span class="hljs-attr">target</span>: {
      <span class="hljs-attr">rotateY</span>: <span class="hljs-number">540</span>
    },
    <span class="hljs-attr">time</span>: <span class="hljs-number">3500</span>,
    <span class="hljs-attr">type</span>: <span class="hljs-string">"easeIn"</span>,
    <span class="hljs-attr">callIn</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// 这里需要用到运动过程的回调 将祥云外层的角度赋予内层祥云的每个角度</span>
      <span class="hljs-keyword">var</span> deg = -css(cloud, <span class="hljs-string">"rotateY"</span>);
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; cloud.children.length; i++) {
        css(cloud.children[i], <span class="hljs-string">"rotateY"</span>, deg);
      }
    }
  })</code></pre>
<h2 id="articleHeader3">3、主体，浮层 圆柱形滚动入场</h2>
<p><span class="img-wrap"><img data-src="/img/bVO2kO?w=396&amp;h=705" src="https://static.alili.tech/img/bVO2kO?w=396&amp;h=705" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>这里的图片是由20张分割好的宽129px的图片组成<br><span class="img-wrap"><img data-src="/img/bVO2ks?w=916&amp;h=363" src="https://static.alili.tech/img/bVO2ks?w=916&amp;h=363" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>每张图片的角度deg为360/20,这样就能得到中心点距离每张图片的距离，利用数学的tan公式 R = (width / 2) / Math.tan((deg/ 2 )* Math.PI / 180) <br><span class="img-wrap"><img data-src="/img/bVO5JP?w=495&amp;h=400" src="https://static.alili.tech/img/bVO5JP?w=495&amp;h=400" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var panoBg = document.querySelector('#panoBg')
var width = 129 // 一张图片宽度
var deg = 360 / imgData.bg.length // 圆柱图片角度
var R = parseInt((width / 2) / Math.tan((deg/ 2 )* Math.PI / 180) - 1) // tan@ = 对边(R) / 临边(W/2)
var startDeg = 180; // 开始角度
for (var i = 0; i < imgData.bg.length; i++) {
  var span = document.createElement(&quot;span&quot;);
  css(span, 'rotateY', startDeg)
  css(span, 'translateZ', -R)
  span.style.backgroundImage = &quot;url(&quot; + imgData.bg[i] + &quot;)&quot;;
  panoBg.appendChild(span);
  startDeg -= deg // 每张图片角度递减
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> panoBg = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#panoBg'</span>)
<span class="hljs-keyword">var</span> width = <span class="hljs-number">129</span> <span class="hljs-comment">// 一张图片宽度</span>
<span class="hljs-keyword">var</span> deg = <span class="hljs-number">360</span> / imgData.bg.length <span class="hljs-comment">// 圆柱图片角度</span>
<span class="hljs-keyword">var</span> R = <span class="hljs-built_in">parseInt</span>((width / <span class="hljs-number">2</span>) / <span class="hljs-built_in">Math</span>.tan((deg/ <span class="hljs-number">2</span> )* <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">180</span>) - <span class="hljs-number">1</span>) <span class="hljs-comment">// tan@ = 对边(R) / 临边(W/2)</span>
<span class="hljs-keyword">var</span> startDeg = <span class="hljs-number">180</span>; <span class="hljs-comment">// 开始角度</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; imgData.bg.length; i++) {
  <span class="hljs-keyword">var</span> span = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"span"</span>);
  css(span, <span class="hljs-string">'rotateY'</span>, startDeg)
  css(span, <span class="hljs-string">'translateZ'</span>, -R)
  span.style.backgroundImage = <span class="hljs-string">"url("</span> + imgData.bg[i] + <span class="hljs-string">")"</span>;
  panoBg.appendChild(span);
  startDeg -= deg <span class="hljs-comment">// 每张图片角度递减</span>
}</code></pre>
<p>设置主体从远到近 类似画轴显示出来，在span初始化时候都设置display="none"，然后设置定时器依次打开</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var timer = setInterval(function() {
  panoBg.children[num].style.display = &quot;block&quot;;
  num++
  if (num >= panoBg.children.length) {
    clearInterval(timer)
  }
}, 3600 / 2 / 20)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">timer</span> = setInterval(function() {
  panoBg.children[<span class="hljs-built_in">num</span>].<span class="hljs-built_in">style</span>.<span class="hljs-built_in">display</span> = <span class="hljs-string">"block"</span>;
  <span class="hljs-built_in">num</span>++
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">num</span> &gt;= panoBg.children.<span class="hljs-built_in">length</span>) {
    clearInterval(<span class="hljs-built_in">timer</span>)
  }
}, <span class="hljs-number">3600</span> / <span class="hljs-number">2</span> / <span class="hljs-number">20</span>)</code></pre>
<p><strong>设置漂浮层</strong>    <br>漂浮层相对简单一些，动态创建漂浮层，设置初始translateX translateZ，遍历对应的浮层，设置上面求得的半径距离，角度</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var pano = document.querySelector('#pano'); // 浮层容器
  var deg = 18; // 差值角度
  var R = 406; // 上图计算的R
  var nub = 0; // 计数
  var startDeg = 180; // 初始角度 
  css(pano, &quot;rotateX&quot;, 0);
  css(pano, &quot;rotateY&quot;, -180);
  css(pano, &quot;scale&quot;, 0);
  var pano1 = document.createElement(&quot;div&quot;);
  pano1.className = &quot;pano&quot;;
  css(pano1, &quot;translateX&quot;, 1.564);
  css(pano1, &quot;translateZ&quot;, -9.877);
  for (var i = 0; i < 2; i++) {
    var span = document.createElement(&quot;span&quot;);
    span.style.cssText = &quot;height:344px;margin-top:-172px;&quot;;
    span.style.background = &quot;url(&quot; + imgData[&quot;pano&quot;][nub] + &quot;)&quot;;
    css(span, &quot;translateY&quot;, -163); // 设定固定的值
    css(span, &quot;rotateY&quot;, startDeg); // 角度逐级递减
    css(span, &quot;translateZ&quot;, -R);
    nub++;
    startDeg -= deg;
    pano1.appendChild(span)
  }
  var pano2 = document.createElement(&quot;div&quot;);
  pano2.className = &quot;pano&quot;;
  css(pano2, &quot;translateX&quot;, 20.225);
  css(pano2, &quot;translateZ&quot;, -14.695);
  for (var i = 0; i < 3; i++) {
    var span = document.createElement(&quot;span&quot;);
    span.style.cssText = &quot;height:326px;margin-top:-163px;&quot;;
    span.style.background = &quot;url(&quot; + imgData[&quot;pano&quot;][nub] + &quot;)&quot;;
    css(span, &quot;translateY&quot;, 278);
    css(span, &quot;rotateY&quot;, startDeg);
    css(span, &quot;translateZ&quot;, -R);
    nub++;
    startDeg -= deg;
    pano2.appendChild(span)
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>  var pano = document.querySelector(<span class="hljs-string">'#pano'</span>)<span class="hljs-comment">; // 浮层容器</span>
  var deg = <span class="hljs-number">18</span><span class="hljs-comment">; // 差值角度</span>
  var R = <span class="hljs-number">406</span><span class="hljs-comment">; // 上图计算的R</span>
  var nub = <span class="hljs-number">0</span><span class="hljs-comment">; // 计数</span>
  var startDeg = <span class="hljs-number">180</span><span class="hljs-comment">; // 初始角度 </span>
  css(pano, <span class="hljs-string">"rotateX"</span>, <span class="hljs-number">0</span>)<span class="hljs-comment">;</span>
  css(pano, <span class="hljs-string">"rotateY"</span>, -<span class="hljs-number">180</span>)<span class="hljs-comment">;</span>
  css(pano, <span class="hljs-string">"scale"</span>, <span class="hljs-number">0</span>)<span class="hljs-comment">;</span>
  var pano1 = document.createElement(<span class="hljs-string">"div"</span>)<span class="hljs-comment">;</span>
  pano1.className = <span class="hljs-string">"pano"</span><span class="hljs-comment">;</span>
  css(pano1, <span class="hljs-string">"translateX"</span>, <span class="hljs-number">1</span>.<span class="hljs-number">564</span>)<span class="hljs-comment">;</span>
  css(pano1, <span class="hljs-string">"translateZ"</span>, -<span class="hljs-number">9</span>.<span class="hljs-number">877</span>)<span class="hljs-comment">;</span>
  for (var i = <span class="hljs-number">0</span><span class="hljs-comment">; i &lt; 2; i++) {</span>
    var span = document.createElement(<span class="hljs-string">"span"</span>)<span class="hljs-comment">;</span>
    span.style.cssText = <span class="hljs-string">"height:344px;margin-top:-172px;"</span><span class="hljs-comment">;</span>
    span.style.<span class="hljs-keyword">background </span>= <span class="hljs-string">"url("</span> + imgData[<span class="hljs-string">"pano"</span>][nub] + <span class="hljs-string">")"</span><span class="hljs-comment">;</span>
    css(span, <span class="hljs-string">"translateY"</span>, -<span class="hljs-number">163</span>)<span class="hljs-comment">; // 设定固定的值</span>
    css(span, <span class="hljs-string">"rotateY"</span>, startDeg)<span class="hljs-comment">; // 角度逐级递减</span>
    css(span, <span class="hljs-string">"translateZ"</span>, -R)<span class="hljs-comment">;</span>
    nub++<span class="hljs-comment">;</span>
    startDeg -= deg<span class="hljs-comment">;</span>
    pano1.appendChild(span)
  }
  var pano2 = document.createElement(<span class="hljs-string">"div"</span>)<span class="hljs-comment">;</span>
  pano2.className = <span class="hljs-string">"pano"</span><span class="hljs-comment">;</span>
  css(pano2, <span class="hljs-string">"translateX"</span>, <span class="hljs-number">20</span>.<span class="hljs-number">225</span>)<span class="hljs-comment">;</span>
  css(pano2, <span class="hljs-string">"translateZ"</span>, -<span class="hljs-number">14</span>.<span class="hljs-number">695</span>)<span class="hljs-comment">;</span>
  for (var i = <span class="hljs-number">0</span><span class="hljs-comment">; i &lt; 3; i++) {</span>
    var span = document.createElement(<span class="hljs-string">"span"</span>)<span class="hljs-comment">;</span>
    span.style.cssText = <span class="hljs-string">"height:326px;margin-top:-163px;"</span><span class="hljs-comment">;</span>
    span.style.<span class="hljs-keyword">background </span>= <span class="hljs-string">"url("</span> + imgData[<span class="hljs-string">"pano"</span>][nub] + <span class="hljs-string">")"</span><span class="hljs-comment">;</span>
    css(span, <span class="hljs-string">"translateY"</span>, <span class="hljs-number">278</span>)<span class="hljs-comment">;</span>
    css(span, <span class="hljs-string">"rotateY"</span>, startDeg)<span class="hljs-comment">;</span>
    css(span, <span class="hljs-string">"translateZ"</span>, -R)<span class="hljs-comment">;</span>
    nub++<span class="hljs-comment">;</span>
    startDeg -= deg<span class="hljs-comment">;</span>
    pano2.appendChild(span)
  }</code></pre>
<h2 id="articleHeader4">4、移动事件，陀螺仪，横竖屏事件</h2>
<p><span class="img-wrap"><img data-src="/img/bVO9Fr?w=448&amp;h=796" src="https://static.alili.tech/img/bVO9Fr?w=448&amp;h=796" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>移动事件需要监听三个事件touchstart touchmove touchend<br>初始化 按下的点startPoint, 主层角度panoBgDeg, 移动一度变化多少px的系数scale，主层深度startZ，最后角度lastDeg，最后差距lastDis</p>
<p><strong>手指按下 touchstart </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" document.addEventListener('touchstart', function(e) {
    startPoint.x = e.changedTouches[0].pageX //手指初始位置
    startPoint.y = e.changedTouches[0].pageY //
    panoBgDeg.x = css(panoBg, 'rotateY') //主体容器左右移动 rotateY便是X轴
    panoBgDeg.y = css(panoBg, 'rotateX')
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> document.addEventListener(<span class="hljs-string">'touchstart'</span>, function(e) {
    startPoint<span class="hljs-selector-class">.x</span> = e<span class="hljs-selector-class">.changedTouches</span>[<span class="hljs-number">0</span>]<span class="hljs-selector-class">.pageX</span> <span class="hljs-comment">//手指初始位置</span>
    startPoint<span class="hljs-selector-class">.y</span> = e<span class="hljs-selector-class">.changedTouches</span>[<span class="hljs-number">0</span>]<span class="hljs-selector-class">.pageY</span> <span class="hljs-comment">//</span>
    panoBgDeg<span class="hljs-selector-class">.x</span> = css(panoBg, <span class="hljs-string">'rotateY'</span>) <span class="hljs-comment">//主体容器左右移动 rotateY便是X轴</span>
    panoBgDeg<span class="hljs-selector-class">.y</span> = css(panoBg, <span class="hljs-string">'rotateX'</span>)
  })</code></pre>
<p><strong>手指移动 touchmove</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.addEventListener('touchmove', function(e) {
    var nowDeg = {}
    var nowDeg2 = {} // 悬浮层也需要移动
    var nowPoint = {}
    nowPoint.x = e.changedTouches[0].pageX; //变化的位置
    nowPoint.y = e.changedTouches[0].pageY;
    var dis = {}
    dis.x = nowPoint.x - startPoint.x // 移动的距离X
    dis.y = nowPoint.y - startPoint.y
    var disDeg = {}
    disDeg.x = -(dis.x / scale.x) // 距离转度数 
    disDeg.y = dis.y / scale.y
    nowDeg.y = panoBgDeg.y + disDeg.y // 开始角度 + 移动角度
    nowDeg.x = panoBgDeg.x + disDeg.x
    nowDeg2.x = panoBgDeg.x + (disDeg.x) * 0.95 // 浮层的稍微偏动
    nowDeg2.y = panoBgDeg.y + (disDeg.y) * 0.95
    if (nowDeg.y > 45) {
      nowDeg.y = 45
    } else if (nowDeg.y < -45) {
      nowDeg.y = -45
    }

    if (nowDeg2.y > 45) {
      nowDeg2.y = 45
    } else if (nowDeg2.y < -45) {
      nowDeg2.y = -45
    }
    lastDis.x = nowDeg.x - lastDeg.x //进行差距计算
    lastDeg.x = nowDeg.x
    lastDis.y = nowDeg.y - lastDeg.y
    lastDeg.y = nowDeg.y
    css(panoBg, &quot;rotateX&quot;, nowDeg.y); // 进行主体角度赋值
    css(panoBg, &quot;rotateY&quot;, nowDeg.x);
    css(pano, &quot;rotateX&quot;, nowDeg2.y); // 悬浮层角度
    css(pano, &quot;rotateY&quot;, nowDeg2.x);
    var disZ = Math.max(Math.abs(dis.x), Math.abs(dis.y))
    if (disZ > 300) {
      disZ = 300
    }
    css(tZ, 'translateZ', startZ - disZ) // 控制拖拉远近距离
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>document.addEventListener('touchmove', function(<span class="hljs-keyword">e</span>) {
    <span class="hljs-keyword">var</span> nowDeg = {}
    <span class="hljs-keyword">var</span> nowDeg2 = {} <span class="hljs-comment">// 悬浮层也需要移动</span>
    <span class="hljs-keyword">var</span> nowPoint = {}
    nowPoint.x = <span class="hljs-keyword">e</span>.changedTouches[0].pageX; <span class="hljs-comment">//变化的位置</span>
    nowPoint.y = <span class="hljs-keyword">e</span>.changedTouches[0].pageY;
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">dis</span> = {}
    <span class="hljs-keyword">dis</span>.x = nowPoint.x - startPoint.x <span class="hljs-comment">// 移动的距离X</span>
    <span class="hljs-keyword">dis</span>.y = nowPoint.y - startPoint.<span class="hljs-built_in">y</span>
    <span class="hljs-keyword">var</span> disDeg = {}
    disDeg.x = -(<span class="hljs-keyword">dis</span>.x / scale.x) <span class="hljs-comment">// 距离转度数 </span>
    disDeg.y = <span class="hljs-keyword">dis</span>.y / scale.<span class="hljs-built_in">y</span>
    nowDeg.y = panoBgDeg.y + disDeg.y <span class="hljs-comment">// 开始角度 + 移动角度</span>
    nowDeg.x = panoBgDeg.x + disDeg.x
    nowDeg2.x = panoBgDeg.x + (disDeg.x) * 0.95 <span class="hljs-comment">// 浮层的稍微偏动</span>
    nowDeg2.y = panoBgDeg.y + (disDeg.y) * 0.95
    <span class="hljs-keyword">if</span> (nowDeg.y &gt; 45) {
      nowDeg.y = 45
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (nowDeg.y &lt; -45) {
      nowDeg.y = -45
    }

    <span class="hljs-keyword">if</span> (nowDeg2.y &gt; 45) {
      nowDeg2.y = 45
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (nowDeg2.y &lt; -45) {
      nowDeg2.y = -45
    }
    lastDis.x = nowDeg.x - lastDeg.x <span class="hljs-comment">//进行差距计算</span>
    lastDeg.x = nowDeg.x
    lastDis.y = nowDeg.y - lastDeg.<span class="hljs-built_in">y</span>
    lastDeg.y = nowDeg.<span class="hljs-built_in">y</span>
    css(panoBg, <span class="hljs-string">"rotateX"</span>, nowDeg.y); <span class="hljs-comment">// 进行主体角度赋值</span>
    css(panoBg, <span class="hljs-string">"rotateY"</span>, nowDeg.x);
    css(pano, <span class="hljs-string">"rotateX"</span>, nowDeg2.y); <span class="hljs-comment">// 悬浮层角度</span>
    css(pano, <span class="hljs-string">"rotateY"</span>, nowDeg2.x);
    <span class="hljs-keyword">var</span> disZ = Math.<span class="hljs-built_in">max</span>(Math.<span class="hljs-built_in">abs</span>(<span class="hljs-keyword">dis</span>.x), Math.<span class="hljs-built_in">abs</span>(<span class="hljs-keyword">dis</span>.y))
    <span class="hljs-keyword">if</span> (disZ &gt; 300) {
      disZ = 300
    }
    css(tZ, 'translateZ', startZ - disZ) <span class="hljs-comment">// 控制拖拉远近距离</span>
  })</code></pre>
<p><strong>手指抬起 touchend</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.addEventListener('touchend', function(e) {
    var nowDeg = {
      x: css(panoBg, &quot;rotateY&quot;), // 获取结束角度
      y: css(panoBg, &quot;rotateX&quot;)
    };
    var disDeg = {
      x: lastDis.x * 10, // 
      y: lastDis.y * 10
    }
    MTween({
      el: tZ,
      target: {
        translateZ: startZ // 移动后回来 变近
      },
      time: 700,
      type: &quot;easeOut&quot;
    })
    MTween({
      el: panoBg,
      target: {
        rotateY: nowDeg.x + disDeg.x // 主体缓冲
      },
      time: 800,
      type: &quot;easeOut&quot;
    })
    MTween({
      el: pano,
      target: {
        rotateY: nowDeg.x + disDeg.x // 悬浮层缓冲
      },
      time: 800,
      type: &quot;easeOut&quot;,
      callBack: function() {
        window.isTouch = false
        window.isStart = false
      }
    })
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'touchend'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-keyword">var</span> nowDeg = {
      x: css(panoBg, <span class="hljs-string">"rotateY"</span>), <span class="hljs-comment">// 获取结束角度</span>
      y: css(panoBg, <span class="hljs-string">"rotateX"</span>)
    };
    <span class="hljs-keyword">var</span> disDeg = {
      x: lastDis.x * <span class="hljs-number">10</span>, <span class="hljs-comment">// </span>
      y: lastDis.y * <span class="hljs-number">10</span>
    }
    MTween({
      el: tZ,
      target: {
        translateZ: startZ <span class="hljs-comment">// 移动后回来 变近</span>
      },
      time: <span class="hljs-number">700</span>,
      <span class="hljs-keyword">type</span>: <span class="hljs-string">"easeOut"</span>
    })
    MTween({
      el: panoBg,
      target: {
        rotateY: nowDeg.x + disDeg.x <span class="hljs-comment">// 主体缓冲</span>
      },
      time: <span class="hljs-number">800</span>,
      <span class="hljs-keyword">type</span>: <span class="hljs-string">"easeOut"</span>
    })
    MTween({
      el: pano,
      target: {
        rotateY: nowDeg.x + disDeg.x <span class="hljs-comment">// 悬浮层缓冲</span>
      },
      time: <span class="hljs-number">800</span>,
      <span class="hljs-keyword">type</span>: <span class="hljs-string">"easeOut"</span>,
      callBack: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">window</span>.isTouch = <span class="hljs-literal">false</span>
        <span class="hljs-built_in">window</span>.isStart = <span class="hljs-literal">false</span>
      }
    })
  })
}</code></pre>
<p>设置景深随不同屏幕适配进行调整</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function setPerc() {
  resteview()
  window.onresize = resteview

  function resteview() {
    var view = document.querySelector('#view') // 最外层
    var main = document.querySelector('#main')
    var deg = 52.5
    var height = document.documentElement.clientHeight;
    var R = Math.round(Math.tan(deg / 180 * Math.PI) * height * .5);
    view.style.WebkitPerspective = view.style.perspective = R + &quot;px&quot;; // 设置景深
    css(main, 'translateZ', R)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setPerc</span>(<span class="hljs-params"></span>) </span>{
  resteview()
  <span class="hljs-built_in">window</span>.onresize = resteview

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resteview</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> view = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#view'</span>) <span class="hljs-comment">// 最外层</span>
    <span class="hljs-keyword">var</span> main = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#main'</span>)
    <span class="hljs-keyword">var</span> deg = <span class="hljs-number">52.5</span>
    <span class="hljs-keyword">var</span> height = <span class="hljs-built_in">document</span>.documentElement.clientHeight;
    <span class="hljs-keyword">var</span> R = <span class="hljs-built_in">Math</span>.round(<span class="hljs-built_in">Math</span>.tan(deg / <span class="hljs-number">180</span> * <span class="hljs-built_in">Math</span>.PI) * height * <span class="hljs-number">.5</span>);
    view.style.WebkitPerspective = view.style.perspective = R + <span class="hljs-string">"px"</span>; <span class="hljs-comment">// 设置景深</span>
    css(main, <span class="hljs-string">'translateZ'</span>, R)
  }
}</code></pre>
<p><strong>陀螺仪 横竖屏事件</strong></p>
<p><strong>陀螺仪基础</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" window.addEventListener('deviceorientation', function(e) {
    e.beta // 左右
    e.gamma // 上下
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'deviceorientation'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    e.beta <span class="hljs-comment">// 左右</span>
    e.gamma <span class="hljs-comment">// 上下</span>
})</code></pre>
<p><strong>横竖屏基础</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" window.addEventListener('orientationchange', function(e) {
      window.orientation // 0 90 -90 180 代表四个方向
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'orientationchange'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
      <span class="hljs-built_in">window</span>.orientation <span class="hljs-comment">// 0 90 -90 180 代表四个方向</span>
})</code></pre>
<p>这里需要解决触摸事件的冲突，需要定义一个全局的isTouch判断，遇到触摸就终止陀螺仪事件引起的变化。   <br>同时需要注意横竖屏会把陀螺仪的beta gamma 改变</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" dir = window.orientation
 switch (dir) {
      case 0:
        x = e.beta;
        y = e.gamma;
        break;
      case 90:
        x = e.gamma;
        y = e.beta;
        break;
      case -90:
        x = -e.gamma;
        y = -e.beta;
        break;
      case 180:
        x = -e.beta;
        y = -e.gamma;
        break;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code> <span class="hljs-keyword">dir </span>= window.<span class="hljs-keyword">orientation
</span> <span class="hljs-keyword">switch </span>(<span class="hljs-keyword">dir) </span>{
      case <span class="hljs-number">0</span>:
        x = e.<span class="hljs-keyword">beta;
</span>        y = e.gamma<span class="hljs-comment">;</span>
        <span class="hljs-keyword">break;
</span>      case <span class="hljs-number">90</span>:
        x = e.gamma<span class="hljs-comment">;</span>
        y = e.<span class="hljs-keyword">beta;
</span>        <span class="hljs-keyword">break;
</span>      case -<span class="hljs-number">90</span>:
        x = -e.gamma<span class="hljs-comment">;</span>
        y = -e.<span class="hljs-keyword">beta;
</span>        <span class="hljs-keyword">break;
</span>      case <span class="hljs-number">180</span>:
        x = -e.<span class="hljs-keyword">beta;
</span>        y = -e.gamma<span class="hljs-comment">;</span>
        <span class="hljs-keyword">break;
</span>    }</code></pre>
<p>开始倾斜时，记录开始的陀螺仪位置，主体层的位置。   <br>移动时候和触摸一样进行距离差值计算，并进行相加赋予主体层的变化。然后进行远近动画，主体移动动画，悬浮层动画。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var nowTime = Date.now()
      // 检测陀螺仪 转动时间 与插件的20ms 兼容
    if (nowTime - lastTime < 30) {
      return
    }
    lastTime = nowTime
      // 角度倾斜
    if (!isStart) {
      //start
      isStart = true;
      start.x = x
      start.y = y
      startEl.x = css(pano, 'rotateX')
      startEl.y = css(pano, 'rotateY')
    } else {
      // move
      now.x = x
      now.y = y

      var dis = {}
      dis.x = now.x - start.x
      dis.y = now.y - start.y

      var deg = {}
      deg.x = startEl.x + dis.x
      deg.y = startEl.y + dis.y

      if (deg.x > 45) {
        deg.x = 45;
      } else if (deg.x < -45) {
        deg.x = -45;
      }

      var disXZ = Math.abs(Math.round((deg.x - css(pano, 'rotateX')) * scale))
      var disYZ = Math.abs(Math.round((deg.y - css(pano, &quot;rotateY&quot;)) * scale))

      var disZ = Math.max(disXZ, disYZ)
      if (disZ > 300) {
        disZ = 300
      }
      MTween({
        el: tZ,
        target: {
          translateZ: startZ - disZ
        },
        time: 300,
        type: 'easeOut',
        callBack: function(){
          MTween({
            el:tZ,
            target:{
              translateZ: startZ // 进行缓冲动画
            },
            time: 400,
            type: &quot;easeOut&quot;
          })
        }
      })

      MTween({
        el: pano,
        target: {
          rotateX: deg.x,
          rotateY: deg.y
        },
        time: 800,
        type: 'easeOut'
      })

      MTween({
        el: panoBg,
        target: {
          rotateX: deg.x,
          rotateY: deg.y
        },
        time: 800,
        type: 'easeOut'
      })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code> var nowTime = <span class="hljs-built_in">Date</span>.now()
      <span class="hljs-comment">// 检测陀螺仪 转动时间 与插件的20ms 兼容</span>
    <span class="hljs-keyword">if</span> (nowTime - lastTime &lt; <span class="hljs-number">30</span>) {
      return
    }
    lastTime = nowTime
      <span class="hljs-comment">// 角度倾斜</span>
    <span class="hljs-keyword">if</span> (!isStart) {
      <span class="hljs-comment">//start</span>
      isStart = <span class="hljs-literal">true</span>;
      start.x = x
      start.y = y
      startEl.x = css(pano, <span class="hljs-string">'rotateX'</span>)
      startEl.y = css(pano, <span class="hljs-string">'rotateY'</span>)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// move</span>
      now.x = x
      now.y = y

      var dis = {}
      dis.x = now.x - start.x
      dis.y = now.y - start.y

      var <span class="hljs-built_in">deg</span> = {}
      <span class="hljs-built_in">deg</span>.x = startEl.x + dis.x
      <span class="hljs-built_in">deg</span>.y = startEl.y + dis.y

      <span class="hljs-keyword">if</span> (<span class="hljs-built_in">deg</span>.x &gt; <span class="hljs-number">45</span>) {
        <span class="hljs-built_in">deg</span>.x = <span class="hljs-number">45</span>;
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">deg</span>.x &lt; -<span class="hljs-number">45</span>) {
        <span class="hljs-built_in">deg</span>.x = -<span class="hljs-number">45</span>;
      }

      var disXZ = Math.<span class="hljs-built_in">abs</span>(Math.<span class="hljs-built_in">round</span>((<span class="hljs-built_in">deg</span>.x - css(pano, <span class="hljs-string">'rotateX'</span>)) * scale))
      var disYZ = Math.<span class="hljs-built_in">abs</span>(Math.<span class="hljs-built_in">round</span>((<span class="hljs-built_in">deg</span>.y - css(pano, <span class="hljs-string">"rotateY"</span>)) * scale))

      var disZ = Math.<span class="hljs-built_in">max</span>(disXZ, disYZ)
      <span class="hljs-keyword">if</span> (disZ &gt; <span class="hljs-number">300</span>) {
        disZ = <span class="hljs-number">300</span>
      }
      MTween({
        el: tZ,
        target: {
          translateZ: startZ - disZ
        },
        <span class="hljs-built_in">time</span>: <span class="hljs-number">300</span>,
        <span class="hljs-built_in">type</span>: <span class="hljs-string">'easeOut'</span>,
        callBack: function(){
          MTween({
            el:tZ,
            target:{
              translateZ: startZ <span class="hljs-comment">// 进行缓冲动画</span>
            },
            <span class="hljs-built_in">time</span>: <span class="hljs-number">400</span>,
            <span class="hljs-built_in">type</span>: <span class="hljs-string">"easeOut"</span>
          })
        }
      })

      MTween({
        el: pano,
        target: {
          rotateX: <span class="hljs-built_in">deg</span>.x,
          rotateY: <span class="hljs-built_in">deg</span>.y
        },
        <span class="hljs-built_in">time</span>: <span class="hljs-number">800</span>,
        <span class="hljs-built_in">type</span>: <span class="hljs-string">'easeOut'</span>
      })

      MTween({
        el: panoBg,
        target: {
          rotateX: <span class="hljs-built_in">deg</span>.x,
          rotateY: <span class="hljs-built_in">deg</span>.y
        },
        <span class="hljs-built_in">time</span>: <span class="hljs-number">800</span>,
        <span class="hljs-built_in">type</span>: <span class="hljs-string">'easeOut'</span>
      })</code></pre>
<p>以上便是主要代码，最好自己运行调试下，运用好动画函数，理解每一个步骤。<br>前端实现3D VR 还有更牛的Three.js, A-Frame。继续深究<br>该课程是由<a href="http://2017.miaov.com/study" rel="nofollow noreferrer" target="_blank">妙味课堂</a>提供的，可以从基础开始学习。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端的3D(css3版本)--淘宝造物节3D创景的制作

## 原文链接
[https://segmentfault.com/a/1190000009821454](https://segmentfault.com/a/1190000009821454)

