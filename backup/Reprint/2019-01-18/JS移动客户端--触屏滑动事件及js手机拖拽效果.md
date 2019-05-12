---
title: 'JS移动客户端--触屏滑动事件及js手机拖拽效果' 
date: 2019-01-18 2:30:34
hidden: true
slug: r8kswqaqzzl
categories: [reprint]
---

{{< raw >}}

                    
<p>移动端触屏滑动的效果其实就是图片轮播，在PC的页面上很好实现，绑定click和mouseover等事件来完成。但是在移动设备上，要实现这种轮播的效果，就需要用到核心的touch事件。处理touch事件能跟踪到屏幕滑动的每根手指。</p>
<blockquote>
<p>以下是四种touch事件</p>
<p><code>touchstart</code>:     //手指放到屏幕上时触发</p>
<p><code>touchmove</code>:      //手指在屏幕上滑动式触发</p>
<p><code>touchend</code>:    //手指离开屏幕时触发</p>
<p><code>touchcancel</code>:     //系统取消touch事件的时候触发，这个好像比较少用</p>
</blockquote>
<blockquote>
<p>每个触摸事件被触发后，会生成一个event对象，event对象里额外包括以下三个触摸列表</p>
<p><code>touches</code>:     //当前屏幕上所有手指的列表</p>
<p><code>targetTouches</code>:      //当前dom元素上手指的列表，尽量使用这个代替touches</p>
<p><code>changedTouches</code>:     //涉及当前事件的手指的列表，尽量使用这个代替touches</p>
<p>这些列表里的每次触摸由touch对象组成，touch对象里包含着触摸信息，主要属性如下：</p>
<p><code>clientX / clientY</code>:      //触摸点相对浏览器窗口的位置</p>
<p><code>pageX / pageY</code>:       //触摸点相对于页面的位置</p>
<p><code>screenX  /  screenY</code>:    //触摸点相对于屏幕的位置</p>
<p><code>identifier</code>:        //touch对象的ID</p>
<p><code>target</code>:       //当前的DOM元素</p>
</blockquote>
<p>注意：</p>
<p>手指在滑动整个屏幕时，会影响浏览器的行为，比如滚动和缩放。所以在调用touch事件时，要注意禁止缩放和滚动。</p>
<p>1.禁止缩放</p>
<p>通过meta元标签来设置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=&quot;viewport&quot; content=&quot;target-densitydpi=320,width=640,user-scalable=no&quot;>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;meta <span class="hljs-built_in">name</span>=<span class="hljs-string">"viewport"</span> content=<span class="hljs-string">"target-densitydpi=320,width=640,user-scalable=no"</span>&gt;
</code></pre>
<p>2.禁止滚动</p>
<p>preventDefault是阻止默认行为，touch事件的默认行为就是滚动。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="event.preventDefault();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>event.preventDefault()<span class="hljs-comment">;</span>
</code></pre>
<p>案例：</p>
<p>下面给出一个案例，需在移动设备上才能看出效果。</p>
<p>1.定义touchstart的事件处理函数，并绑定事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(!!self.touch) self.slider.addEventListener('touchstart',self.events,false); 

//定义touchstart的事件处理函数
start:function(event){
　　var touch = event.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
　　startPos = {x:touch.pageX,y:touch.pageY,time:+new Date}; //取第一个touch的坐标值
　　isScrolling = 0; //这个参数判断是垂直滚动还是水平滚动
　　this.slider.addEventListener('touchmove',this,false);
　　this.slider.addEventListener('touchend',this,false);
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">if</span>(!!self.touch) self.slider.addEventListener(<span class="hljs-string">'touchstart'</span>,self.events,<span class="hljs-literal">false</span>); 

<span class="hljs-comment">//定义touchstart的事件处理函数</span>
start:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
　　<span class="hljs-keyword">var</span> touch = event.targetTouches[<span class="hljs-number">0</span>]; <span class="hljs-comment">//touches数组对象获得屏幕上所有的touch，取第一个touch</span>
　　startPos = {<span class="hljs-attr">x</span>:touch.pageX,<span class="hljs-attr">y</span>:touch.pageY,<span class="hljs-attr">time</span>:+<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>}; <span class="hljs-comment">//取第一个touch的坐标值</span>
　　isScrolling = <span class="hljs-number">0</span>; <span class="hljs-comment">//这个参数判断是垂直滚动还是水平滚动</span>
　　<span class="hljs-keyword">this</span>.slider.addEventListener(<span class="hljs-string">'touchmove'</span>,<span class="hljs-keyword">this</span>,<span class="hljs-literal">false</span>);
　　<span class="hljs-keyword">this</span>.slider.addEventListener(<span class="hljs-string">'touchend'</span>,<span class="hljs-keyword">this</span>,<span class="hljs-literal">false</span>);
},
</code></pre>
<p>触发touchstart事件后，会产生一个event对象，event对象里包括触摸列表，获得屏幕上的第一个touch,并记下其pageX,pageY的坐标。定义一个变量标记滚动的方向。此时绑定touchmove,touchend事件。</p>
<p>2.定义手指在屏幕上移动的事件，定义touchmove函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//移动
move:function(event){
　　//当屏幕有多个touch或者页面被缩放过，就不执行move操作
　　if(event.targetTouches.length > 1 || event.scale &amp;&amp; event.scale !== 1) return;
　　var touch = event.targetTouches[0];
　　endPos = {x:touch.pageX - startPos.x,y:touch.pageY - startPos.y};
　　isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1:0; //isScrolling为1时，表示纵向滑动，0为横向滑动
　　if(isScrolling === 0){
　　　　event.preventDefault(); //阻止触摸事件的默认行为，即阻止滚屏
　　　　this.slider.className = 'cnt';
　　　　this.slider.style.left = -this.index*600 + endPos.x + 'px';
　　}
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code><span class="hljs-comment">//移动</span>
<span class="hljs-keyword">move</span>:function(<span class="hljs-keyword">event</span>){
　　<span class="hljs-comment">//当屏幕有多个touch或者页面被缩放过，就不执行move操作</span>
　　<span class="hljs-keyword">if</span>(<span class="hljs-keyword">event</span>.targetTouches.length &gt; <span class="hljs-number">1</span> || <span class="hljs-keyword">event</span>.<span class="hljs-keyword">scale</span> &amp;&amp; <span class="hljs-keyword">event</span>.<span class="hljs-keyword">scale</span> !== <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span>;
　　var touch = <span class="hljs-keyword">event</span>.targetTouches[<span class="hljs-number">0</span>];
　　endPos = {x:touch.pageX - startPos.x,y:touch.pageY - startPos.y};
　　isScrolling = Math.<span class="hljs-keyword">abs</span>(endPos.x) &lt; Math.<span class="hljs-keyword">abs</span>(endPos.y) ? <span class="hljs-number">1</span>:<span class="hljs-number">0</span>; <span class="hljs-comment">//isScrolling为1时，表示纵向滑动，0为横向滑动</span>
　　<span class="hljs-keyword">if</span>(isScrolling === <span class="hljs-number">0</span>){
　　　　<span class="hljs-keyword">event</span>.preventDefault(); <span class="hljs-comment">//阻止触摸事件的默认行为，即阻止滚屏</span>
　　　　this.slider.className = <span class="hljs-string">'cnt'</span>;
　　　　this.slider.style.left = -this.index*<span class="hljs-number">600</span> + endPos.x + <span class="hljs-string">'px'</span>;
　　}
},
</code></pre>
<p>同样首先阻止页面的滚屏行为，touchmove触发后，会生成一个event对象，在event对象中获取touches触屏列表，取得第一个touch,并记下pageX,pageY的坐标，算出差值，得出手指滑动的偏移量，使当前DOM元素滑动。</p>
<p>3.定义手指从屏幕上拿起的事件，定义touchend函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//滑动释放
end:function(event){
　　var duration = +new Date - startPos.time; //滑动的持续时间
　　if(isScrolling === 0){ //当为水平滚动时
　　　　this.icon[this.index].className = '';
　　　　if(Number(duration) > 10){ 
　　　　　　//判断是左移还是右移，当偏移量大于10时执行
　　　　　　if(endPos.x > 10){
　　　　　　　　if(this.index !== 0) this.index -= 1;
　　　　　　}else if(endPos.x < -10){
　　　　　　　　if(this.index !== this.icon.length-1) this.index += 1;
　　　　　　}
　　　　}
　　　　this.icon[this.index].className = 'curr';
　　　　this.slider.className = 'cnt f-anim';
　　　　this.slider.style.left = -this.index*600 + 'px';
　　}
　　//解绑事件
　　this.slider.removeEventListener('touchmove',this,false);
　　this.slider.removeEventListener('touchend',this,false);
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">//滑动释放</span>
end:function(event){
　　<span class="hljs-keyword">var</span> duration = +new Date - startPos.time; <span class="hljs-comment">//滑动的持续时间</span>
　　<span class="hljs-keyword">if</span>(isScrolling === <span class="hljs-number">0</span>){ <span class="hljs-comment">//当为水平滚动时</span>
　　　　<span class="hljs-keyword">this</span>.icon[<span class="hljs-keyword">this</span>.index].className = <span class="hljs-string">''</span>;
　　　　<span class="hljs-keyword">if</span>(Number(duration) &gt; <span class="hljs-number">10</span>){ 
　　　　　　<span class="hljs-comment">//判断是左移还是右移，当偏移量大于10时执行</span>
　　　　　　<span class="hljs-keyword">if</span>(endPos.x &gt; <span class="hljs-number">10</span>){
　　　　　　　　<span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.index !== <span class="hljs-number">0</span>) <span class="hljs-keyword">this</span>.index -= <span class="hljs-number">1</span>;
　　　　　　}<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(endPos.x &lt; <span class="hljs-number">-10</span>){
　　　　　　　　<span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.index !== <span class="hljs-keyword">this</span>.icon.length<span class="hljs-number">-1</span>) <span class="hljs-keyword">this</span>.index += <span class="hljs-number">1</span>;
　　　　　　}
　　　　}
　　　　<span class="hljs-keyword">this</span>.icon[<span class="hljs-keyword">this</span>.index].className = <span class="hljs-string">'curr'</span>;
　　　　<span class="hljs-keyword">this</span>.slider.className = <span class="hljs-string">'cnt f-anim'</span>;
　　　　<span class="hljs-keyword">this</span>.slider.style.left = -<span class="hljs-keyword">this</span>.index*<span class="hljs-number">600</span> + <span class="hljs-string">'px'</span>;
　　}
　　<span class="hljs-comment">//解绑事件</span>
　　<span class="hljs-keyword">this</span>.slider.removeEventListener(<span class="hljs-string">'touchmove'</span>,<span class="hljs-keyword">this</span>,<span class="hljs-literal">false</span>);
　　<span class="hljs-keyword">this</span>.slider.removeEventListener(<span class="hljs-string">'touchend'</span>,<span class="hljs-keyword">this</span>,<span class="hljs-literal">false</span>);
},
</code></pre>
<p>手指离开屏幕后，所执行的函数。这里先判断手指停留屏幕上的时间，如果时间太短，则不执行该函数。再判断手指是左滑动还是右滑动，分别执行不同的操作。最后很重要的一点是移除touchmove,touchend绑定事件。</p>
<p>代码事例1：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html>
<head>
    <meta charset='utf-8' />
    <meta name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no&quot;/>
    <link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;../css/reset-min.css&quot;>
    <title></title>
    <style>
        .div{text-align: center;font-size:30px;}
    </style>
</head>
<body>
    <div class=&quot;div&quot; style=&quot;width:100px;height:100px;line-height:100px;background-color:red;position:absolute;top:0;left:0;&quot;>1</div>
    <div class=&quot;div&quot; style=&quot;width:100px;height:100px;line-height:100px;background-color:red;position:absolute;top:0;left:110px;&quot;>2</div>
    <div class=&quot;div&quot; style=&quot;width:100px;height:100px;line-height:100px;background-color:red;position:absolute;top:0;left:220px;&quot;>3</div>
    <div class=&quot;div&quot; style=&quot;width:100px;height:100px;line-height:100px;background-color:red;position:absolute;top:110px;left:0;&quot;>4</div>
    <div class=&quot;div&quot; style=&quot;width:100px;height:100px;line-height:100px;background-color:red;position:absolute;top:110px;left:110px;&quot;>5</div>
    <div class=&quot;div&quot; style=&quot;width:100px;height:100px;line-height:100px;background-color:red;position:absolute;top:110px;left:220px;&quot;>6</div>
<script src=&quot;../js/jquery-3.0.0.min.js&quot;></script>
<script>
    function getcolor(){
        var color_arr = [&quot;0&quot;,&quot;1&quot;,&quot;2&quot;,&quot;3&quot;,&quot;4&quot;,&quot;5&quot;,&quot;6&quot;,&quot;7&quot;,&quot;8&quot;,&quot;9&quot;,&quot;a&quot;,&quot;b&quot;,&quot;c&quot;,&quot;d&quot;,&quot;e&quot;,&quot;f&quot;];
        function suiji(){
            return Math.floor(Math.random()*16);
        }
        var colorSTR =&quot;#&quot;+color_arr[suiji()]+color_arr[suiji()]+color_arr[suiji()]+color_arr[suiji()]+color_arr[suiji()]+color_arr[suiji()];
        return colorSTR;
    }
    var divd = $(&quot;.div&quot;);
    divd.each(function(index){
        $(this).on('touchstart', function(evt) {
            var e = event || evt;
            e.preventDefault();//阻止其他事件
            //要做的事情
        }).on('touchmove', function(evt) {
            var e = event || evt;
            e.preventDefault();//阻止其他事件

            // 如果这个元素的位置内只有一个手指的话
            //console.log(e.targetTouches)
            //console.log(event.targetTouches[0].clientX+&quot;/&quot;+event.targetTouches[0].clientY+&quot;/&quot;+event.targetTouches[0].pageX+&quot;/&quot;+event.targetTouches[0].pageY)
            if (e.targetTouches.length == 1) {
                var touch = e.targetTouches[0];  // 把元素放在手指所在的位置
                $(this).css(&quot;left&quot;,(touch.pageX- parseInt($(this).width())/2 + 'px'));
                $(this).css(&quot;top&quot;,(touch.pageY- parseInt($(this).height())/2 + 'px'));
                $(this).css(&quot;background&quot;, getcolor());
            }
        }).on('touchend', function(evt) {
            var e = event || evt;
            e.preventDefault();//阻止其他事件
            $(this).css(&quot;background&quot;,getcolor());
        })
    });
</script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">'utf-8'</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"../css/reset-min.css"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.div</span>{<span class="hljs-attribute">text-align</span>: center;<span class="hljs-attribute">font-size</span>:<span class="hljs-number">30px</span>;}
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"div"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:100px;height:100px;line-height:100px;background-color:red;position:absolute;top:0;left:0;"</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"div"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:100px;height:100px;line-height:100px;background-color:red;position:absolute;top:0;left:110px;"</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"div"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:100px;height:100px;line-height:100px;background-color:red;position:absolute;top:0;left:220px;"</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"div"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:100px;height:100px;line-height:100px;background-color:red;position:absolute;top:110px;left:0;"</span>&gt;</span>4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"div"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:100px;height:100px;line-height:100px;background-color:red;position:absolute;top:110px;left:110px;"</span>&gt;</span>5<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"div"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:100px;height:100px;line-height:100px;background-color:red;position:absolute;top:110px;left:220px;"</span>&gt;</span>6<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../js/jquery-3.0.0.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getcolor</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> color_arr = [<span class="hljs-string">"0"</span>,<span class="hljs-string">"1"</span>,<span class="hljs-string">"2"</span>,<span class="hljs-string">"3"</span>,<span class="hljs-string">"4"</span>,<span class="hljs-string">"5"</span>,<span class="hljs-string">"6"</span>,<span class="hljs-string">"7"</span>,<span class="hljs-string">"8"</span>,<span class="hljs-string">"9"</span>,<span class="hljs-string">"a"</span>,<span class="hljs-string">"b"</span>,<span class="hljs-string">"c"</span>,<span class="hljs-string">"d"</span>,<span class="hljs-string">"e"</span>,<span class="hljs-string">"f"</span>];
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">suiji</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random()*<span class="hljs-number">16</span>);
        }
        <span class="hljs-keyword">var</span> colorSTR =<span class="hljs-string">"#"</span>+color_arr[suiji()]+color_arr[suiji()]+color_arr[suiji()]+color_arr[suiji()]+color_arr[suiji()]+color_arr[suiji()];
        <span class="hljs-keyword">return</span> colorSTR;
    }
    <span class="hljs-keyword">var</span> divd = $(<span class="hljs-string">".div"</span>);
    divd.each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">index</span>)</span>{
        $(<span class="hljs-keyword">this</span>).on(<span class="hljs-string">'touchstart'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">evt</span>) </span>{
            <span class="hljs-keyword">var</span> e = event || evt;
            e.preventDefault();<span class="hljs-comment">//阻止其他事件</span>
            <span class="hljs-comment">//要做的事情</span>
        }).on(<span class="hljs-string">'touchmove'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">evt</span>) </span>{
            <span class="hljs-keyword">var</span> e = event || evt;
            e.preventDefault();<span class="hljs-comment">//阻止其他事件</span>

            <span class="hljs-comment">// 如果这个元素的位置内只有一个手指的话</span>
            <span class="hljs-comment">//console.log(e.targetTouches)</span>
            <span class="hljs-comment">//console.log(event.targetTouches[0].clientX+"/"+event.targetTouches[0].clientY+"/"+event.targetTouches[0].pageX+"/"+event.targetTouches[0].pageY)</span>
            <span class="hljs-keyword">if</span> (e.targetTouches.length == <span class="hljs-number">1</span>) {
                <span class="hljs-keyword">var</span> touch = e.targetTouches[<span class="hljs-number">0</span>];  <span class="hljs-comment">// 把元素放在手指所在的位置</span>
                $(<span class="hljs-keyword">this</span>).css(<span class="hljs-string">"left"</span>,(touch.pageX- <span class="hljs-built_in">parseInt</span>($(<span class="hljs-keyword">this</span>).width())/<span class="hljs-number">2</span> + <span class="hljs-string">'px'</span>));
                $(<span class="hljs-keyword">this</span>).css(<span class="hljs-string">"top"</span>,(touch.pageY- <span class="hljs-built_in">parseInt</span>($(<span class="hljs-keyword">this</span>).height())/<span class="hljs-number">2</span> + <span class="hljs-string">'px'</span>));
                $(<span class="hljs-keyword">this</span>).css(<span class="hljs-string">"background"</span>, getcolor());
            }
        }).on(<span class="hljs-string">'touchend'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">evt</span>) </span>{
            <span class="hljs-keyword">var</span> e = event || evt;
            e.preventDefault();<span class="hljs-comment">//阻止其他事件</span>
            $(<span class="hljs-keyword">this</span>).css(<span class="hljs-string">"background"</span>,getcolor());
        })
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>效果图1（这些色块都可以随意拖动）：<br><span class="img-wrap"><img data-src="/img/bVK444?w=385&amp;h=736" src="https://static.alili.tech/img/bVK444?w=385&amp;h=736" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>代码事例2：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
    <meta http-equiv=&quot;Content-Type&quot; Content=&quot;text/html; charset=utf-8;&quot;>
    <title>移动端触摸滑动</title>
    <meta name=&quot;author&quot; content=&quot;rainna&quot; />
    <meta name=&quot;keywords&quot; content=&quot;rainna's js lib&quot; />
    <meta name=&quot;description&quot; content=&quot;移动端触摸滑动&quot; />
    <meta name=&quot;viewport&quot; content=&quot;width=640,user-scalable=no&quot;>
    <style>
        *{margin:0;padding:0;}
        li{list-style:none;}

        .m-slider{width:600px;margin:50px 20px;overflow:hidden;}
        .m-slider .cnt{position:relative;left:0;width:3000px;}
        .m-slider .cnt li{float:left;width:600px;}
        .m-slider .cnt img{display:block;width:100%;height:450px;}
        .m-slider .cnt p{margin:20px 0;}
        .m-slider .icons{text-align:center;color:#000;}
        .m-slider .icons span{margin:0 5px;}
        .m-slider .icons .curr{color:red;}
        .f-anim{-webkit-transition:left .2s linear;}
    </style>
</head>

<body>
<div class=&quot;m-slider&quot;>
    <ul class=&quot;cnt&quot; id=&quot;slider&quot;>
        <li>
            <img src=&quot;http://imglf1.ph.126.net/qKodH3sZoVbPalKFtHS9mw==/6608946691259322175.jpg&quot;>
            <p>20140813镜面的世界，终究只是倒影。看得到你的身影，却触摸不到你的未来</p>
        </li>
        <li>
            <img src=&quot;http://imglf1.ph.126.net/40-jqH_j6EoCWnZOixY2pA==/4798022453110310215.jpg&quot;>
            <p>20140812锡林浩特前往东乌旗S101必经之处，一条极美的铁路。铁路下面是个小型的盐沼，淡淡的有了一丝天空之境的感觉。可惜在此玩了一个小时也没有看见一列火车经过，只好继续赶往东乌旗。</p>
        </li>
        <li>
            <img src=&quot;http://imglf0.ph.126.net/Jnmi2y51zVdjKAYlibtpFw==/3068640196117481166.jpg&quot;>
            <p>20140811水的颜色为什么那么蓝，我也纳闷，反正自然饱和度和对比度拉完就是这个颜色的</p>
        </li>
        <li>
            <img src=&quot;http://imglf1.ph.126.net/79GPsjhwiIj8e-0nP5MsEQ==/6619295294699949331.jpg&quot;>
            <p>海洋星球3重庆天气热得我想卧轨自杀</p>
        </li>
        <li>
            <img src=&quot;http://imglf1.ph.126.net/40-jqH_j6EoCWnZOixY2pA==/4798022453110310215.jpg&quot;>
            <p>以上这些作品分别来自两位设计师作为观者，您能否通过设计风格进行区分</p>
        </li>
    </ul>
    <div class=&quot;icons&quot; id=&quot;icons&quot;>
        <span class=&quot;curr&quot;>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
    </div>
</div>
<script>
    var slider = {
        //判断设备是否支持touch事件
        touch:('ontouchstart' in window) || window.DocumentTouch &amp;&amp; document instanceof DocumentTouch,
        slider:document.getElementById('slider'),

        //事件
        events:{
            index:0,     //显示元素的索引
            slider:this.slider,     //this为slider对象
            icons:document.getElementById('icons'),
            icon:this.icons.getElementsByTagName('span'),
            handleEvent:function(event){
                var self = this;     //this指events对象
                if(event.type == 'touchstart'){
                    self.start(event);
                }else if(event.type == 'touchmove'){
                    self.move(event);
                }else if(event.type == 'touchend'){
                    self.end(event);
                }
            },
            //滑动开始
            start:function(event){
                var touch = event.targetTouches[0];     //touches数组对象获得屏幕上所有的touch，取第一个touch
                startPos = {x:touch.pageX,y:touch.pageY,time:+new Date};    //取第一个touch的坐标值
                isScrolling = 0;   //这个参数判断是垂直滚动还是水平滚动
                this.slider.addEventListener('touchmove',this,false);
                this.slider.addEventListener('touchend',this,false);
            },
            //移动
            move:function(event){
                //当屏幕有多个touch或者页面被缩放过，就不执行move操作
                if(event.targetTouches.length > 1 || event.scale &amp;&amp; event.scale !== 1) return;
                var touch = event.targetTouches[0];
                endPos = {x:touch.pageX - startPos.x,y:touch.pageY - startPos.y};
                isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1:0;    //isScrolling为1时，表示纵向滑动，0为横向滑动
                if(isScrolling === 0){
                    event.preventDefault();      //阻止触摸事件的默认行为，即阻止滚屏
                    this.slider.className = 'cnt';
                    this.slider.style.left = -this.index*600 + endPos.x + 'px';
                }
            },
            //滑动释放
            end:function(event){
                var duration = +new Date - startPos.time;    //滑动的持续时间
                if(isScrolling === 0){    //当为水平滚动时
                    this.icon[this.index].className = '';
                    if(Number(duration) > 10){
                        //判断是左移还是右移，当偏移量大于10时执行
                        if(endPos.x > 10){
                            if(this.index !== 0) this.index -= 1;
                        }else if(endPos.x < -10){
                            if(this.index !== this.icon.length-1) this.index += 1;
                        }
                    }
                    this.icon[this.index].className = 'curr';
                    this.slider.className = 'cnt f-anim';
                    this.slider.style.left = -this.index*600 + 'px';
                }
                //解绑事件
                this.slider.removeEventListener('touchmove',this,false);
                this.slider.removeEventListener('touchend',this,false);
            }
        },

        //初始化
        init:function(){
            var self = this;     //this指slider对象
            if(!!self.touch) self.slider.addEventListener('touchstart',self.events,false);    //addEventListener第二个参数可以传一个对象，会调用该对象的handleEvent属性
        }
    };
    slider.init();
</script>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Content-Type"</span> <span class="hljs-attr">Content</span>=<span class="hljs-string">"text/html; charset=utf-8;"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>移动端触摸滑动<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"author"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"rainna"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"keywords"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"rainna's js lib"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"description"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"移动端触摸滑动"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=640,user-scalable=no"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        *{<span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>;}
        <span class="hljs-selector-tag">li</span>{<span class="hljs-attribute">list-style</span>:none;}

        <span class="hljs-selector-class">.m-slider</span>{<span class="hljs-attribute">width</span>:<span class="hljs-number">600px</span>;<span class="hljs-attribute">margin</span>:<span class="hljs-number">50px</span> <span class="hljs-number">20px</span>;<span class="hljs-attribute">overflow</span>:hidden;}
        <span class="hljs-selector-class">.m-slider</span> <span class="hljs-selector-class">.cnt</span>{<span class="hljs-attribute">position</span>:relative;<span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">width</span>:<span class="hljs-number">3000px</span>;}
        <span class="hljs-selector-class">.m-slider</span> <span class="hljs-selector-class">.cnt</span> <span class="hljs-selector-tag">li</span>{<span class="hljs-attribute">float</span>:left;<span class="hljs-attribute">width</span>:<span class="hljs-number">600px</span>;}
        <span class="hljs-selector-class">.m-slider</span> <span class="hljs-selector-class">.cnt</span> <span class="hljs-selector-tag">img</span>{<span class="hljs-attribute">display</span>:block;<span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;<span class="hljs-attribute">height</span>:<span class="hljs-number">450px</span>;}
        <span class="hljs-selector-class">.m-slider</span> <span class="hljs-selector-class">.cnt</span> <span class="hljs-selector-tag">p</span>{<span class="hljs-attribute">margin</span>:<span class="hljs-number">20px</span> <span class="hljs-number">0</span>;}
        <span class="hljs-selector-class">.m-slider</span> <span class="hljs-selector-class">.icons</span>{<span class="hljs-attribute">text-align</span>:center;<span class="hljs-attribute">color</span>:<span class="hljs-number">#000</span>;}
        <span class="hljs-selector-class">.m-slider</span> <span class="hljs-selector-class">.icons</span> <span class="hljs-selector-tag">span</span>{<span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> <span class="hljs-number">5px</span>;}
        <span class="hljs-selector-class">.m-slider</span> <span class="hljs-selector-class">.icons</span> <span class="hljs-selector-class">.curr</span>{<span class="hljs-attribute">color</span>:red;}
        <span class="hljs-selector-class">.f-anim</span>{<span class="hljs-attribute">-webkit-transition</span>:left .<span class="hljs-number">2s</span> linear;}
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-slider"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cnt"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"slider"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://imglf1.ph.126.net/qKodH3sZoVbPalKFtHS9mw==/6608946691259322175.jpg"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>20140813镜面的世界，终究只是倒影。看得到你的身影，却触摸不到你的未来<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://imglf1.ph.126.net/40-jqH_j6EoCWnZOixY2pA==/4798022453110310215.jpg"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>20140812锡林浩特前往东乌旗S101必经之处，一条极美的铁路。铁路下面是个小型的盐沼，淡淡的有了一丝天空之境的感觉。可惜在此玩了一个小时也没有看见一列火车经过，只好继续赶往东乌旗。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://imglf0.ph.126.net/Jnmi2y51zVdjKAYlibtpFw==/3068640196117481166.jpg"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>20140811水的颜色为什么那么蓝，我也纳闷，反正自然饱和度和对比度拉完就是这个颜色的<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://imglf1.ph.126.net/79GPsjhwiIj8e-0nP5MsEQ==/6619295294699949331.jpg"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>海洋星球3重庆天气热得我想卧轨自杀<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://imglf1.ph.126.net/40-jqH_j6EoCWnZOixY2pA==/4798022453110310215.jpg"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>以上这些作品分别来自两位设计师作为观者，您能否通过设计风格进行区分<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icons"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"icons"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"curr"</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>4<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>5<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> slider = {
        <span class="hljs-comment">//判断设备是否支持touch事件</span>
        touch:(<span class="hljs-string">'ontouchstart'</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span>) || <span class="hljs-built_in">window</span>.DocumentTouch &amp;&amp; <span class="hljs-built_in">document</span> <span class="hljs-keyword">instanceof</span> DocumentTouch,
        <span class="hljs-attr">slider</span>:<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'slider'</span>),

        <span class="hljs-comment">//事件</span>
        events:{
            <span class="hljs-attr">index</span>:<span class="hljs-number">0</span>,     <span class="hljs-comment">//显示元素的索引</span>
            slider:<span class="hljs-keyword">this</span>.slider,     <span class="hljs-comment">//this为slider对象</span>
            icons:<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'icons'</span>),
            <span class="hljs-attr">icon</span>:<span class="hljs-keyword">this</span>.icons.getElementsByTagName(<span class="hljs-string">'span'</span>),
            <span class="hljs-attr">handleEvent</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
                <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;     <span class="hljs-comment">//this指events对象</span>
                <span class="hljs-keyword">if</span>(event.type == <span class="hljs-string">'touchstart'</span>){
                    self.start(event);
                }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(event.type == <span class="hljs-string">'touchmove'</span>){
                    self.move(event);
                }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(event.type == <span class="hljs-string">'touchend'</span>){
                    self.end(event);
                }
            },
            <span class="hljs-comment">//滑动开始</span>
            start:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
                <span class="hljs-keyword">var</span> touch = event.targetTouches[<span class="hljs-number">0</span>];     <span class="hljs-comment">//touches数组对象获得屏幕上所有的touch，取第一个touch</span>
                startPos = {<span class="hljs-attr">x</span>:touch.pageX,<span class="hljs-attr">y</span>:touch.pageY,<span class="hljs-attr">time</span>:+<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>};    <span class="hljs-comment">//取第一个touch的坐标值</span>
                isScrolling = <span class="hljs-number">0</span>;   <span class="hljs-comment">//这个参数判断是垂直滚动还是水平滚动</span>
                <span class="hljs-keyword">this</span>.slider.addEventListener(<span class="hljs-string">'touchmove'</span>,<span class="hljs-keyword">this</span>,<span class="hljs-literal">false</span>);
                <span class="hljs-keyword">this</span>.slider.addEventListener(<span class="hljs-string">'touchend'</span>,<span class="hljs-keyword">this</span>,<span class="hljs-literal">false</span>);
            },
            <span class="hljs-comment">//移动</span>
            move:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
                <span class="hljs-comment">//当屏幕有多个touch或者页面被缩放过，就不执行move操作</span>
                <span class="hljs-keyword">if</span>(event.targetTouches.length &gt; <span class="hljs-number">1</span> || event.scale &amp;&amp; event.scale !== <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span>;
                <span class="hljs-keyword">var</span> touch = event.targetTouches[<span class="hljs-number">0</span>];
                endPos = {<span class="hljs-attr">x</span>:touch.pageX - startPos.x,<span class="hljs-attr">y</span>:touch.pageY - startPos.y};
                isScrolling = <span class="hljs-built_in">Math</span>.abs(endPos.x) &lt; <span class="hljs-built_in">Math</span>.abs(endPos.y) ? <span class="hljs-number">1</span>:<span class="hljs-number">0</span>;    <span class="hljs-comment">//isScrolling为1时，表示纵向滑动，0为横向滑动</span>
                <span class="hljs-keyword">if</span>(isScrolling === <span class="hljs-number">0</span>){
                    event.preventDefault();      <span class="hljs-comment">//阻止触摸事件的默认行为，即阻止滚屏</span>
                    <span class="hljs-keyword">this</span>.slider.className = <span class="hljs-string">'cnt'</span>;
                    <span class="hljs-keyword">this</span>.slider.style.left = -<span class="hljs-keyword">this</span>.index*<span class="hljs-number">600</span> + endPos.x + <span class="hljs-string">'px'</span>;
                }
            },
            <span class="hljs-comment">//滑动释放</span>
            end:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
                <span class="hljs-keyword">var</span> duration = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span> - startPos.time;    <span class="hljs-comment">//滑动的持续时间</span>
                <span class="hljs-keyword">if</span>(isScrolling === <span class="hljs-number">0</span>){    <span class="hljs-comment">//当为水平滚动时</span>
                    <span class="hljs-keyword">this</span>.icon[<span class="hljs-keyword">this</span>.index].className = <span class="hljs-string">''</span>;
                    <span class="hljs-keyword">if</span>(<span class="hljs-built_in">Number</span>(duration) &gt; <span class="hljs-number">10</span>){
                        <span class="hljs-comment">//判断是左移还是右移，当偏移量大于10时执行</span>
                        <span class="hljs-keyword">if</span>(endPos.x &gt; <span class="hljs-number">10</span>){
                            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.index !== <span class="hljs-number">0</span>) <span class="hljs-keyword">this</span>.index -= <span class="hljs-number">1</span>;
                        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(endPos.x &lt; <span class="hljs-number">-10</span>){
                            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.index !== <span class="hljs-keyword">this</span>.icon.length<span class="hljs-number">-1</span>) <span class="hljs-keyword">this</span>.index += <span class="hljs-number">1</span>;
                        }
                    }
                    <span class="hljs-keyword">this</span>.icon[<span class="hljs-keyword">this</span>.index].className = <span class="hljs-string">'curr'</span>;
                    <span class="hljs-keyword">this</span>.slider.className = <span class="hljs-string">'cnt f-anim'</span>;
                    <span class="hljs-keyword">this</span>.slider.style.left = -<span class="hljs-keyword">this</span>.index*<span class="hljs-number">600</span> + <span class="hljs-string">'px'</span>;
                }
                <span class="hljs-comment">//解绑事件</span>
                <span class="hljs-keyword">this</span>.slider.removeEventListener(<span class="hljs-string">'touchmove'</span>,<span class="hljs-keyword">this</span>,<span class="hljs-literal">false</span>);
                <span class="hljs-keyword">this</span>.slider.removeEventListener(<span class="hljs-string">'touchend'</span>,<span class="hljs-keyword">this</span>,<span class="hljs-literal">false</span>);
            }
        },

        <span class="hljs-comment">//初始化</span>
        init:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;     <span class="hljs-comment">//this指slider对象</span>
            <span class="hljs-keyword">if</span>(!!self.touch) self.slider.addEventListener(<span class="hljs-string">'touchstart'</span>,self.events,<span class="hljs-literal">false</span>);    <span class="hljs-comment">//addEventListener第二个参数可以传一个对象，会调用该对象的handleEvent属性</span>
        }
    };
    slider.init();
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>效果图2（在手机上手指滑动图片可以进行图片切换）：<br><span class="img-wrap"><img data-src="/img/bVK46j?w=385&amp;h=742" src="https://static.alili.tech/img/bVK46j?w=385&amp;h=742" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS移动客户端--触屏滑动事件及js手机拖拽效果

## 原文链接
[https://segmentfault.com/a/1190000008798547](https://segmentfault.com/a/1190000008798547)

