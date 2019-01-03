---
title: '基于swiper的Tab选项卡' 
date: 2019-01-04 2:30:10
hidden: true
slug: 22h7jhhmpht
categories: [reprint]
---

{{< raw >}}

                    
<p>选项卡五花八门，今天又要用到选项卡，首选swiper！</p>
<h2 id="articleHeader0">一、HTML布局</h2>
<p>根据<a href="http://www.swiper.com.cn/api/start/2014/1218/140.html" rel="nofollow noreferrer" target="_blank">swiper官网</a>的要求来class命名滑块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;box&quot;>
    <ul class=&quot;swiperTab&quot;>
        <li> <span>Div+CSS</span> </li>
        <li> <span>JavaScript+JQuery</span> </li>
        <li> <span>AngularJS+Vue+NodeJs</span> </li>
    </ul>
    <div class=&quot;swiper-container&quot;>
        <div class=&quot;swiper-wrapper&quot;>
            <div class=&quot;swiper-slide&quot;>千寻Div+CSS</div>
            <div class=&quot;swiper-slide&quot;>阿飞JavaScript+JQuery</div>
            <div class=&quot;swiper-slide&quot;>无虑AngularJS+Vue+NodeJs</div>
        </div>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiperTab"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Div+CSS<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>JavaScript+JQuery<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>AngularJS+Vue+NodeJs<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-container"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-wrapper"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-slide"</span>&gt;</span>千寻Div+CSS<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-slide"</span>&gt;</span>阿飞JavaScript+JQuery<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-slide"</span>&gt;</span>无虑AngularJS+Vue+NodeJs<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h2 id="articleHeader1">二、CSS样式</h2>
<p>随便写写，根据使用场景调整。（PS：推荐一个<a href="http://tool.lu/css/" rel="nofollow noreferrer" target="_blank">在线美化工具</a>）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*{margin:0;padding:0}
li{list-style:none}
.box{margin:50px auto;width:800px}
.swiperTab{display:flex;width:100%;flex-direction:row;justify-content:center;align-items:center}
.swiperTab li{display:flex;height:48px;border-left:1px solid #dfdfdf;background-color:#ddf8ff;cursor:pointer;flex:1;flex-direction:row;justify-content:center;align-items:center}
.swiperTab li:first-child{border-left:1px solid transparent}
.swiperTab li.active{background-color:#f60;color:#fff}
.swiperTab li:nth-child(1).active{background-color:#9acd32}
.swiperTab li:nth-child(2).active{background-color:green}
.swiperTab li:nth-child(3).active{background-color:pink}
.swiper-slide{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:20px}
.swiper-slide:nth-child(1){height:200px;background-color:#9acd32}
.swiper-slide:nth-child(2){height:300px;background-color:green}
.swiper-slide:nth-child(3){height:100px;background-color:pink}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>*{<span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>}
<span class="hljs-selector-tag">li</span>{<span class="hljs-attribute">list-style</span>:none}
<span class="hljs-selector-class">.box</span>{<span class="hljs-attribute">margin</span>:<span class="hljs-number">50px</span> auto;<span class="hljs-attribute">width</span>:<span class="hljs-number">800px</span>}
<span class="hljs-selector-class">.swiperTab</span>{<span class="hljs-attribute">display</span>:flex;<span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;<span class="hljs-attribute">flex-direction</span>:row;<span class="hljs-attribute">justify-content</span>:center;<span class="hljs-attribute">align-items</span>:center}
<span class="hljs-selector-class">.swiperTab</span> <span class="hljs-selector-tag">li</span>{<span class="hljs-attribute">display</span>:flex;<span class="hljs-attribute">height</span>:<span class="hljs-number">48px</span>;<span class="hljs-attribute">border-left</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#dfdfdf</span>;<span class="hljs-attribute">background-color</span>:<span class="hljs-number">#ddf8ff</span>;<span class="hljs-attribute">cursor</span>:pointer;<span class="hljs-attribute">flex</span>:<span class="hljs-number">1</span>;<span class="hljs-attribute">flex-direction</span>:row;<span class="hljs-attribute">justify-content</span>:center;<span class="hljs-attribute">align-items</span>:center}
<span class="hljs-selector-class">.swiperTab</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:first-child</span>{<span class="hljs-attribute">border-left</span>:<span class="hljs-number">1px</span> solid transparent}
<span class="hljs-selector-class">.swiperTab</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-class">.active</span>{<span class="hljs-attribute">background-color</span>:<span class="hljs-number">#f60</span>;<span class="hljs-attribute">color</span>:<span class="hljs-number">#fff</span>}
<span class="hljs-selector-class">.swiperTab</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(1).active</span>{<span class="hljs-attribute">background-color</span>:<span class="hljs-number">#9acd32</span>}
<span class="hljs-selector-class">.swiperTab</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(2).active</span>{<span class="hljs-attribute">background-color</span>:green}
<span class="hljs-selector-class">.swiperTab</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(3).active</span>{<span class="hljs-attribute">background-color</span>:pink}
<span class="hljs-selector-class">.swiper-slide</span>{<span class="hljs-attribute">-webkit-box-sizing</span>:border-box;<span class="hljs-attribute">-moz-box-sizing</span>:border-box;<span class="hljs-attribute">box-sizing</span>:border-box;<span class="hljs-attribute">padding</span>:<span class="hljs-number">20px</span>}
<span class="hljs-selector-class">.swiper-slide</span><span class="hljs-selector-pseudo">:nth-child(1)</span>{<span class="hljs-attribute">height</span>:<span class="hljs-number">200px</span>;<span class="hljs-attribute">background-color</span>:<span class="hljs-number">#9acd32</span>}
<span class="hljs-selector-class">.swiper-slide</span><span class="hljs-selector-pseudo">:nth-child(2)</span>{<span class="hljs-attribute">height</span>:<span class="hljs-number">300px</span>;<span class="hljs-attribute">background-color</span>:green}
<span class="hljs-selector-class">.swiper-slide</span><span class="hljs-selector-pseudo">:nth-child(3)</span>{<span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;<span class="hljs-attribute">background-color</span>:pink}
</code></pre>
<h2 id="articleHeader2">三、Js封装</h2>
<p>自己封装的选项卡函数swiperTab.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*  swiper 选项卡函数 参数说明
*       obj  必选，导航列表
*       swiperObj: 必选，HTML元素或者string类型，Swiper容器的css选择器
*       className: 必选，当前样式的类名
*       effect：可选，切换效果，默认为&quot;slide&quot;，可设置为&quot;fade，cube，coverflow，flip&quot;。
*       其他参数参阅官网 http://www.swiper.com.cn
* */
function tabs(obj,swiperObj,className) {
    var tabSwiper = new Swiper(swiperObj, {
        effect : 'flip',//切换效果
        speed : 500, //滑动速度，单位ms
        autoHeight: true, // 高度随内容变化
        onSlideChangeStart : function() {
            $(obj+&quot;.&quot;+className).removeClass(className); /*有当前类名的删除类名,给下一个添加当前类名*/
            $(obj).eq(tabSwiper.activeIndex).addClass(className);/*activeIndex是过渡后的slide索引*/
        }
    });
    // 模拟点击事件，如果是移入事件，将mousedown 改为 mouseenter
    $(obj).on('touchstart mousedown', function(e) {
        e.preventDefault();/*清除默认事件*/
        $(obj+&quot;.&quot;+className).removeClass(className);
        $(this).addClass(className); /*点击当前导航 改变当前样式*/
        tabSwiper.slideTo($(this).index());/*滑动到对应的滑块*/
    });
    $(obj).click(function(e) {
        e.preventDefault();/*清除默认点击事件*/
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/*  swiper 选项卡函数 参数说明
*       obj  必选，导航列表
*       swiperObj: 必选，HTML元素或者string类型，Swiper容器的css选择器
*       className: 必选，当前样式的类名
*       effect：可选，切换效果，默认为"slide"，可设置为"fade，cube，coverflow，flip"。
*       其他参数参阅官网 http://www.swiper.com.cn
* */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tabs</span>(<span class="hljs-params">obj,swiperObj,className</span>) </span>{
    <span class="hljs-keyword">var</span> tabSwiper = <span class="hljs-keyword">new</span> Swiper(swiperObj, {
        <span class="hljs-attr">effect</span> : <span class="hljs-string">'flip'</span>,<span class="hljs-comment">//切换效果</span>
        speed : <span class="hljs-number">500</span>, <span class="hljs-comment">//滑动速度，单位ms</span>
        autoHeight: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 高度随内容变化</span>
        onSlideChangeStart : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(obj+<span class="hljs-string">"."</span>+className).removeClass(className); <span class="hljs-comment">/*有当前类名的删除类名,给下一个添加当前类名*/</span>
            $(obj).eq(tabSwiper.activeIndex).addClass(className);<span class="hljs-comment">/*activeIndex是过渡后的slide索引*/</span>
        }
    });
    <span class="hljs-comment">// 模拟点击事件，如果是移入事件，将mousedown 改为 mouseenter</span>
    $(obj).on(<span class="hljs-string">'touchstart mousedown'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        e.preventDefault();<span class="hljs-comment">/*清除默认事件*/</span>
        $(obj+<span class="hljs-string">"."</span>+className).removeClass(className);
        $(<span class="hljs-keyword">this</span>).addClass(className); <span class="hljs-comment">/*点击当前导航 改变当前样式*/</span>
        tabSwiper.slideTo($(<span class="hljs-keyword">this</span>).index());<span class="hljs-comment">/*滑动到对应的滑块*/</span>
    });
    $(obj).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        e.preventDefault();<span class="hljs-comment">/*清除默认点击事件*/</span>
    });
}</code></pre>
<h2 id="articleHeader3">四、Js调用</h2>
<p>首先引入相关js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js&quot;></script>
<script src=&quot;https://cdn.bootcss.com/Swiper/3.4.2/js/swiper.jquery.min.js&quot;></script>
<script src=&quot;js/swiperTab.js&quot;></script>
<script>
    /*swiper选项卡切换*/
    $(function () {
      //swiperTab 是你导航的className,active是你当前状态的className
        $('.swiperTab > li').eq(0).addClass('active');
        tabs('.swiperTab > li','.swiper-container','active');
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/Swiper/3.4.2/js/swiper.jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/swiperTab.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">/*swiper选项卡切换*/</span>
    $(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">//swiperTab 是你导航的className,active是你当前状态的className</span>
        $(<span class="hljs-string">'.swiperTab &gt; li'</span>).eq(<span class="hljs-number">0</span>).addClass(<span class="hljs-string">'active'</span>);
        tabs(<span class="hljs-string">'.swiperTab &gt; li'</span>,<span class="hljs-string">'.swiper-container'</span>,<span class="hljs-string">'active'</span>);
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>前端小白刚学JS。不足之处，不吝言赐教。谢谢！</p>
<hr>
<hr>
<h2 id="articleHeader4">五、拓展</h2>
<h4>经常遇到从另一个页面直接跳转到选项卡对应的内容</h4>
<p>例如：page.html 中点击a标签直接跳转到对应展示页面。<br>我们在href中直接添加锚点，锚点中包含一个数字即对应选项卡的索引值0、1、2</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;SwiperPC.html#slider0&quot;  target=&quot;_blank&quot;>展示 Div+CSS</a>
<a href=&quot;SwiperPC.html#slider1&quot;  target=&quot;_blank&quot;>展示 JavaScript+JQuery</a>
<a href=&quot;SwiperPC.html#slider2&quot;  target=&quot;_blank&quot;>展示 ngularJS+Vue+NodeJs</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"SwiperPC.html#slider0"</span>  <span class="hljs-attr">target</span>=<span class="hljs-string">"_blank"</span>&gt;</span>展示 Div+CSS<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"SwiperPC.html#slider1"</span>  <span class="hljs-attr">target</span>=<span class="hljs-string">"_blank"</span>&gt;</span>展示 JavaScript+JQuery<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"SwiperPC.html#slider2"</span>  <span class="hljs-attr">target</span>=<span class="hljs-string">"_blank"</span>&gt;</span>展示 ngularJS+Vue+NodeJs<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<p><strong>对上面的案例稍作修改：</strong></p>
<ol>
<li>在swiperTab.js中添加设定初始化时slide的索引  <em>initialSlide: index</em>
</li>
<li>传入参数 <em>index</em>
</li>
<li>
<p>在回调函数中 判断tabSwiper是否存在，否则当哈希值不为0的时候会报错 。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function tabs(obj,swiperObj,className,index) {
    var tabSwiper = new Swiper(swiperObj, {
        initialSlide: index, // 设定初始化时slide的索引
        effect : 'flip', 
        speed : 500,  
        autoHeight: true,  
        onSlideChangeStart : function() {
            if(tabSwiper){ 
            /*判断tabSwiper是否存在，否则当哈希值不为0的时候会报错 */
                $(obj+&quot;.&quot;+className).removeClass(className);  
                $(obj).eq(tabSwiper.activeIndex).addClass(className); 
            }
        }
    });
    $(obj).on('touchstart mousedown', function(e) {
        e.preventDefault(); 
        $(obj+&quot;.&quot;+className).removeClass(className);
        $(this).addClass(className);  
        tabSwiper.slideTo($(this).index()); 
    });
    $(obj).click(function(e) {
        e.preventDefault(); 
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tabs</span>(<span class="hljs-params">obj,swiperObj,className,index</span>) </span>{
    <span class="hljs-keyword">var</span> tabSwiper = <span class="hljs-keyword">new</span> Swiper(swiperObj, {
        <span class="hljs-attr">initialSlide</span>: index, <span class="hljs-comment">// 设定初始化时slide的索引</span>
        effect : <span class="hljs-string">'flip'</span>, 
        <span class="hljs-attr">speed</span> : <span class="hljs-number">500</span>,  
        <span class="hljs-attr">autoHeight</span>: <span class="hljs-literal">true</span>,  
        <span class="hljs-attr">onSlideChangeStart</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span>(tabSwiper){ 
            <span class="hljs-comment">/*判断tabSwiper是否存在，否则当哈希值不为0的时候会报错 */</span>
                $(obj+<span class="hljs-string">"."</span>+className).removeClass(className);  
                $(obj).eq(tabSwiper.activeIndex).addClass(className); 
            }
        }
    });
    $(obj).on(<span class="hljs-string">'touchstart mousedown'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        e.preventDefault(); 
        $(obj+<span class="hljs-string">"."</span>+className).removeClass(className);
        $(<span class="hljs-keyword">this</span>).addClass(className);  
        tabSwiper.slideTo($(<span class="hljs-keyword">this</span>).index()); 
    });
    $(obj).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        e.preventDefault(); 
    });
}</code></pre>
</li>
<li>
<p>在调用的时候 根据哈希值(因为我们在a标签的href中添加了锚点)来改变索引值<em>index</em>从而达到改变 swiper初始化时slide的索引的目的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
    $(function () {
        var $tabList =  $('.swiperTab > li'),
        lens= $tabList.length; /*获取选项卡长度*/
        var index = 0; /*设置初始索引为0  即 没有哈希值的时候显示第一个选项卡内容*/
        var hash = window.location.hash;
        /* *
        * 获取哈希值（你也可以获取整个url剪切出你要的字段）。根据哈希值中设置的数字显示对应的选项卡内容；
        * 例如：SwiperPC.html#slide1对应显示第索引值为1的选项卡内容即第二个选项卡" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> $tabList =  $(<span class="hljs-string">'.swiperTab &gt; li'</span>),
        lens= $tabList.length; <span class="hljs-comment">/*获取选项卡长度*/</span>
        <span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>; <span class="hljs-comment">/*设置初始索引为0  即 没有哈希值的时候显示第一个选项卡内容*/</span>
        <span class="hljs-keyword">var</span> hash = <span class="hljs-built_in">window</span>.location.hash;
        <span class="hljs-comment">/* *
        * 获取哈希值（你也可以获取整个url剪切出你要的字段）。根据哈希值中设置的数字显示对应的选项卡内容；
        * 例如：SwiperPC.html#slide1对应显示第索引值为1的选项卡内容即第二个选项卡</span></span></code></pre>
</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        if(hash){
            value = hash.match(/\d/g).join('');
            index = Number(value);/*字符串转换为数字*/
            index = parseInt(index)%lens;
        }
        $tabList.eq(index).addClass('active');
        tabs('.swiperTab > li','.swiper-container','active',index);
    });
</script>
```" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code>        <span class="hljs-keyword">if</span>(hash){
            value = hash.match(<span class="hljs-regexp">/\d/g</span>).join(<span class="hljs-string">''</span>);
            <span class="hljs-keyword">index</span> = Number(value);<span class="hljs-regexp">/*字符串转换为数字*/</span>
            <span class="hljs-keyword">index</span> = parseInt(<span class="hljs-keyword">index</span>)%lens;
        }
        $tabList.e<span class="hljs-string">q(index)</span>.addClass(<span class="hljs-string">'active'</span>);
        tabs(<span class="hljs-string">'.swiperTab &gt; li'</span>,<span class="hljs-string">'.swiper-container'</span>,<span class="hljs-string">'active'</span>,<span class="hljs-keyword">index</span>);
    });
&lt;<span class="hljs-regexp">/script&gt;
```</span></code></pre>
<p><a href="https://github.com/wangqin273/king/tree/master/swiper-Tab" rel="nofollow noreferrer" target="_blank">完整案例</a><br>延伸阅读我的另一篇用本地存储 方式 <a href="https://juejin.im/post/59cde601518825276f49fb57" rel="nofollow noreferrer" target="_blank">从一个页面跳转到用swiper写的全屏滚动页面的指定位置</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于swiper的Tab选项卡

## 原文链接
[https://segmentfault.com/a/1190000010730089](https://segmentfault.com/a/1190000010730089)

