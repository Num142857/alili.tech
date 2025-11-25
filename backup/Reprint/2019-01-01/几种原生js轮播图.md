---
title: '几种原生js轮播图' 
date: 2019-01-01 2:30:07
hidden: true
slug: 8ai23cqyjo6
categories: [reprint]
---

{{< raw >}}

                    
<p>由于各种各样的原因（比如说懒），本文直接在代码里面用注释+序号记录实现的思路</p>
<h3 id="articleHeader0">1.普通版</h3>
<p>原理：一个包含多张图片的ul,其中所有的li左浮动成一排，实际过程就是将ul往左（右）边移动，改变left值。</p>
<p>效果图：实际应用的时候.screen的overflow:hidden。只能看到中间方框的部分<br><a href="http://aloe2014.github.io/slider-web" rel="nofollow noreferrer" target="_blank">在线demo</a><br><span class="img-wrap"><img data-src="/img/bVUgTH?w=1172&amp;h=265" src="https://static.alili.tech/img/bVUgTH?w=1172&amp;h=265" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>HTML</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;all&quot; id=&quot;box&quot;>
  <div class=&quot;screen&quot;>
    <ul>
      <li><a href=&quot;javascript:;&quot;><img src=&quot;images/01.jpg&quot; ></a></li>
      <li><a href=&quot;javascript:;&quot;><img src=&quot;images/02.jpg&quot;></a></li>
      <li><a href=&quot;javascript:;&quot;><img src=&quot;images/03.jpg&quot;></a></li>
      <li><a href=&quot;javascript:;&quot;><img src=&quot;images/04.jpg&quot;></a></li>
      <li><a href=&quot;javascript:;&quot;><img src=&quot;images/05.jpg&quot;></a></li>
    </ul>
    <ol>
                
    </ol>
   </div>
   <div id=&quot;arr&quot;><span class=&quot;left&quot;>&amp;lt;</span><span class=&quot;right&quot;>&amp;gt;</span></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"all"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"screen"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/01.jpg"</span> &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/02.jpg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/03.jpg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/04.jpg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/05.jpg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
                
    <span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"arr"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>&amp;lt;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>&amp;gt;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>其中&lt;ol&gt;&lt;/ol&gt;用来存放动态生成的小方块。</p>
<p>css部分代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".screen li {
  width: 200px;
  height: 200px;
  overflow: hidden;
  float: left;
}
.all ol li {
  float: left;
  width: 20px;
  height: 20px;
  background: #fff;
  border: 1px solid red;
  margin-left: 10px;
  cursor: pointer;
}
.all ol li.current {
  background: yellow;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.screen</span> <span class="hljs-selector-tag">li</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">overflow</span>: hidden;
  <span class="hljs-attribute">float</span>: left;
}
<span class="hljs-selector-class">.all</span> <span class="hljs-selector-tag">ol</span> <span class="hljs-selector-tag">li</span> {
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid red;
  <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">cursor</span>: pointer;
}
<span class="hljs-selector-class">.all</span> <span class="hljs-selector-tag">ol</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-class">.current</span> {
  <span class="hljs-attribute">background</span>: yellow;
}</code></pre>
<p>js（有用了自己封装的一个动画函数）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//动画函数
function animate(el, target){
    if(el.timer) {
        clearInterval(el.timer);
    }
    el.timer = setInterval(function () {
        //leader = leader + step
        var leader = el.offsetLeft;
        var step = 30;
        if(target < leader) {
            step = -step;
        }
        //如果到达终点的距离已经小于一步了，就直接跨到终点。
        if(Math.abs(target-leader) >= Math.abs(step)) {
            leader = leader + step;
            el.style.left = leader + &quot;px&quot;;
        }else {
            clearInterval(el.timer);
            el.style.left = target + &quot;px&quot;;
        }
    }, 15);
}
    //1. 找对象
    var box = document.querySelector(&quot;.all&quot;);
    var screen = document.querySelector(&quot;.screen&quot;);
    var ul = screen.children[0];
    var ullis = ul.children;
    var ol = screen.children[1];
    var arr = document.querySelector(&quot;#arr&quot;);
    var leftArr = arr.querySelector(&quot;.left&quot;);
    var rightArr = arr.querySelector(&quot;.right&quot;);
    var imgwidth = screen.offsetWidth;

    var pic = fk = 0;
    var timer;
    //2. 动态创建结构
    //2.1 创建小方块,ulLis
    //根据ul中li的个数创建小方块
    for(var i = 0; i < ullis.length; i++){
        var li = document.createElement(&quot;li&quot;);
        ol.appendChild(li);
        li.innerHTML = i + 1;
    }
    var ollis = ol.children;
    ollis[0].className = &quot;current&quot;;

    //2.2 创建假图片
    //2.2.1 克隆ul下的第一个li
    var cloneli = ullis[0].cloneNode(true);
    ul.appendChild(cloneli);
    //3. 简单轮播功能
    //3.1 给小方块注册点击事件
    for(var i=0;i<ollis.length;i++){
        ollis[i].index=i;//存索引
        ollis[i].addEventListener(&quot;click&quot;, function(){
            //3.2 小方块高亮排他
            for(var i=0;i<ollis.length;i++){
                ollis[i].className=&quot;&quot;;
            }
            this.className=&quot;current&quot;;
            //3.3. 移动ul
            var target=-this.index*imgwidth;
            animate(ul,target);

            pic=fk=this.index;
        })
    }

    //4. 左右焦点功能（无缝）
    //4.1 鼠标经过盒子，显示箭头
    box.onmouseover = function(){
        arr.style.display = &quot;block&quot;;
        //清除定时器
        clearInterval(timer);
    }
    //4.2 鼠标离开盒子，隐藏箭头
    box.onmouseleave = function(){
        arr.style.display = &quot;none&quot;;
        timer = setInterval(function(){
            rightArr.onclick();
        },1000)
    }
    //4.3 点击右箭头
    rightArr.onclick = function(){
        //如果已经到了最后一张假图片，让ul瞬移到第一张真图片
        if(pic === ollis.length){
            ul.style.left = 0;
            pic = 0;
        }
        pic++;//记录出去的图片张数

        fk++;
        if(fk === ollis.length){
            fk = 0;
        }
        for(var i = 0; i < ollis.length;i++){
            ollis[i].className = &quot;&quot;;
        }
        ollis[fk].className = &quot;current&quot;;
        var target = -pic*imgwidth;
        animate(ul,target);
    }
    //4.4 点击左箭头
    leftArr.onclick = function(){
        if(pic === 0){
            ul.style.left = -(ullis.length - 1)*imgwidth + &quot;px&quot;;
            pic = ullis.length - 1;
        }
        pic--;

        //同步小方块
        fk--;
        if(fk === -1){
            fk = ollis.length - 1;
        }
        for(var i = 0; i < ollis.length; i++){
            ollis[i].className = &quot;&quot;;
        }
        ollis[fk].className = &quot;current&quot;;
        var target = -pic*imgwidth;
        animate(ul,target);
    }
    //5. 自动播放的功能
    timer = setInterval(function(){
        rightArr.onclick();
    },1000)
    //6. 同步问题
    //6.1 点击右箭头,同步
    //6.2 点击左箭头，同步
    //6.3 点击小方块，同步" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//动画函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">animate</span>(<span class="hljs-params">el, target</span>)</span>{
    <span class="hljs-keyword">if</span>(el.timer) {
        clearInterval(el.timer);
    }
    el.timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//leader = leader + step</span>
        <span class="hljs-keyword">var</span> leader = el.offsetLeft;
        <span class="hljs-keyword">var</span> step = <span class="hljs-number">30</span>;
        <span class="hljs-keyword">if</span>(target &lt; leader) {
            step = -step;
        }
        <span class="hljs-comment">//如果到达终点的距离已经小于一步了，就直接跨到终点。</span>
        <span class="hljs-keyword">if</span>(<span class="hljs-built_in">Math</span>.abs(target-leader) &gt;= <span class="hljs-built_in">Math</span>.abs(step)) {
            leader = leader + step;
            el.style.left = leader + <span class="hljs-string">"px"</span>;
        }<span class="hljs-keyword">else</span> {
            clearInterval(el.timer);
            el.style.left = target + <span class="hljs-string">"px"</span>;
        }
    }, <span class="hljs-number">15</span>);
}
    <span class="hljs-comment">//1. 找对象</span>
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".all"</span>);
    <span class="hljs-keyword">var</span> screen = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".screen"</span>);
    <span class="hljs-keyword">var</span> ul = screen.children[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">var</span> ullis = ul.children;
    <span class="hljs-keyword">var</span> ol = screen.children[<span class="hljs-number">1</span>];
    <span class="hljs-keyword">var</span> arr = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"#arr"</span>);
    <span class="hljs-keyword">var</span> leftArr = arr.querySelector(<span class="hljs-string">".left"</span>);
    <span class="hljs-keyword">var</span> rightArr = arr.querySelector(<span class="hljs-string">".right"</span>);
    <span class="hljs-keyword">var</span> imgwidth = screen.offsetWidth;

    <span class="hljs-keyword">var</span> pic = fk = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> timer;
    <span class="hljs-comment">//2. 动态创建结构</span>
    <span class="hljs-comment">//2.1 创建小方块,ulLis</span>
    <span class="hljs-comment">//根据ul中li的个数创建小方块</span>
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; ullis.length; i++){
        <span class="hljs-keyword">var</span> li = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"li"</span>);
        ol.appendChild(li);
        li.innerHTML = i + <span class="hljs-number">1</span>;
    }
    <span class="hljs-keyword">var</span> ollis = ol.children;
    ollis[<span class="hljs-number">0</span>].className = <span class="hljs-string">"current"</span>;

    <span class="hljs-comment">//2.2 创建假图片</span>
    <span class="hljs-comment">//2.2.1 克隆ul下的第一个li</span>
    <span class="hljs-keyword">var</span> cloneli = ullis[<span class="hljs-number">0</span>].cloneNode(<span class="hljs-literal">true</span>);
    ul.appendChild(cloneli);
    <span class="hljs-comment">//3. 简单轮播功能</span>
    <span class="hljs-comment">//3.1 给小方块注册点击事件</span>
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;ollis.length;i++){
        ollis[i].index=i;<span class="hljs-comment">//存索引</span>
        ollis[i].addEventListener(<span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-comment">//3.2 小方块高亮排他</span>
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;ollis.length;i++){
                ollis[i].className=<span class="hljs-string">""</span>;
            }
            <span class="hljs-keyword">this</span>.className=<span class="hljs-string">"current"</span>;
            <span class="hljs-comment">//3.3. 移动ul</span>
            <span class="hljs-keyword">var</span> target=-<span class="hljs-keyword">this</span>.index*imgwidth;
            animate(ul,target);

            pic=fk=<span class="hljs-keyword">this</span>.index;
        })
    }

    <span class="hljs-comment">//4. 左右焦点功能（无缝）</span>
    <span class="hljs-comment">//4.1 鼠标经过盒子，显示箭头</span>
    box.onmouseover = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        arr.style.display = <span class="hljs-string">"block"</span>;
        <span class="hljs-comment">//清除定时器</span>
        clearInterval(timer);
    }
    <span class="hljs-comment">//4.2 鼠标离开盒子，隐藏箭头</span>
    box.onmouseleave = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        arr.style.display = <span class="hljs-string">"none"</span>;
        timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            rightArr.onclick();
        },<span class="hljs-number">1000</span>)
    }
    <span class="hljs-comment">//4.3 点击右箭头</span>
    rightArr.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-comment">//如果已经到了最后一张假图片，让ul瞬移到第一张真图片</span>
        <span class="hljs-keyword">if</span>(pic === ollis.length){
            ul.style.left = <span class="hljs-number">0</span>;
            pic = <span class="hljs-number">0</span>;
        }
        pic++;<span class="hljs-comment">//记录出去的图片张数</span>

        fk++;
        <span class="hljs-keyword">if</span>(fk === ollis.length){
            fk = <span class="hljs-number">0</span>;
        }
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; ollis.length;i++){
            ollis[i].className = <span class="hljs-string">""</span>;
        }
        ollis[fk].className = <span class="hljs-string">"current"</span>;
        <span class="hljs-keyword">var</span> target = -pic*imgwidth;
        animate(ul,target);
    }
    <span class="hljs-comment">//4.4 点击左箭头</span>
    leftArr.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">if</span>(pic === <span class="hljs-number">0</span>){
            ul.style.left = -(ullis.length - <span class="hljs-number">1</span>)*imgwidth + <span class="hljs-string">"px"</span>;
            pic = ullis.length - <span class="hljs-number">1</span>;
        }
        pic--;

        <span class="hljs-comment">//同步小方块</span>
        fk--;
        <span class="hljs-keyword">if</span>(fk === <span class="hljs-number">-1</span>){
            fk = ollis.length - <span class="hljs-number">1</span>;
        }
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; ollis.length; i++){
            ollis[i].className = <span class="hljs-string">""</span>;
        }
        ollis[fk].className = <span class="hljs-string">"current"</span>;
        <span class="hljs-keyword">var</span> target = -pic*imgwidth;
        animate(ul,target);
    }
    <span class="hljs-comment">//5. 自动播放的功能</span>
    timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        rightArr.onclick();
    },<span class="hljs-number">1000</span>)
    <span class="hljs-comment">//6. 同步问题</span>
    <span class="hljs-comment">//6.1 点击右箭头,同步</span>
    <span class="hljs-comment">//6.2 点击左箭头，同步</span>
    <span class="hljs-comment">//6.3 点击小方块，同步</span></code></pre>
<h3 id="articleHeader1">2. 3D版</h3>
<p>原理：切割的思路其实是让四个图片拼成一个图片 ，并且让每一张图片都往左走一定的距离结合了css3动画</p>
<p>效果图：<a href="http://aloe2014.github.io/slider-web" rel="nofollow noreferrer" target="_blank">在线demo</a></p>
<p><span class="img-wrap"><img data-src="/img/bVUg0k?w=867&amp;h=442" src="https://static.alili.tech/img/bVUg0k?w=867&amp;h=442" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>HTML</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;box&quot;>
  <ul>
    <li><img src=&quot;imgs/1.jpg&quot;></li>
    <li><img src=&quot;imgs/2.jpg&quot;></li>
    <li><img src=&quot;imgs/3.jpg&quot;></li>
    <li><img src=&quot;imgs/4.jpg&quot;></li>
  </ul>
  <ul>
    <li><img src=&quot;imgs/1.jpg&quot;></li>
    <li><img src=&quot;imgs/2.jpg&quot;></li>
    <li><img src=&quot;imgs/3.jpg&quot;></li>
    <li><img src=&quot;imgs/4.jpg&quot;></li>
  </ul>
  <ul>
    <li><img src=&quot;imgs/1.jpg&quot;></li>
    <li><img src=&quot;imgs/2.jpg&quot;></li>
    <li><img src=&quot;imgs/3.jpg&quot;></li>
    <li><img src=&quot;imgs/4.jpg&quot;></li>
  </ul>
  <ul>
    <li><img src=&quot;imgs/1.jpg&quot;></li>
    <li><img src=&quot;imgs/2.jpg&quot;></li>
    <li><img src=&quot;imgs/3.jpg&quot;></li>
    <li><img src=&quot;imgs/4.jpg&quot;></li>
  </ul>    
</div>
<div class=&quot;btn_wrap&quot;>
  <button>向上翻转按钮</button>
  <button>向下翻转按钮</button>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"imgs/1.jpg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"imgs/2.jpg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"imgs/3.jpg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"imgs/4.jpg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"imgs/1.jpg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"imgs/2.jpg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"imgs/3.jpg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"imgs/4.jpg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"imgs/1.jpg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"imgs/2.jpg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"imgs/3.jpg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"imgs/4.jpg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"imgs/1.jpg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"imgs/2.jpg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"imgs/3.jpg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"imgs/4.jpg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>    
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn_wrap"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>向上翻转按钮<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>向下翻转按钮<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>不要把按钮放到box里面,一旦放到这里面，它默认就会成为一个项目,从而影响整个的ul。</p>
<p>css部分代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    *{
        padding:0;
        margin:0;
        list-style-type: none;
    }
    .box{
        width:533px;
        height:300px;
        margin:100px auto 0;
        border: 1px solid #000;
        /* 让盒子变成一个伸缩容器 */
        display:flex;
    }
    /* 第一步  需要制作出一个长方体 */
    .box ul{
        width:533px;
        height:300px;
        position:relative;
        transform-style: preserve-3d;
        transition: transform 1s;
    }
    .box ul:nth-child(1){
        transition-delay: 0s;
    }
    .box ul:nth-child(2){
        transition-delay: 0.2s;
    }
    .box ul:nth-child(3){
        transition-delay: 0.4s;
    }
    .box ul:nth-child(4){
        transition-delay: 0.6s;
    }
    .box > ul > li{
        /* 这里最好是设置成width:100%  让它继承收缩后的UL的宽度*/
        width:100%;
        height:100%;
        position:absolute;
        left:0;
        top:0;
        /* 这个切割一定是加给li的 ul加的话会把3D空间给干掉*/
        overflow:hidden;
    }
    .box > ul > li:nth-child(1){
        transform:rotateX(90deg) translateZ(150px);/* 上面 */
    }
    .box > ul > li:nth-child(2){
        transform:rotateX(-90deg) translateZ(150px);/* 下面 */
    }
    .box > ul > li:nth-child(3){
        transform:translateZ(150px);/* 正面 */
    }
    .box > ul > li:nth-child(4){
        transform:rotateX(180deg) translateZ(150px);/* 背面 */
    }
    .box > ul:nth-child(2) img{
        margin-left: -134px;
    }
    .box > ul:nth-child(3) img{
        margin-left: -268px;
    }
    .box > ul:nth-child(4) img{
        margin-left: -402px;
    }
    .btn_wrap{
        width:760px;
        height:0px;
        margin:0 auto;
        position:relative;
        top:-250px;
    }
    .btn_wrap button{
        width:100px;
        height:100px;
    }
    .btn_wrap button:nth-child(1){
        float: left;
    }
    .btn_wrap button:nth-child(2){
        float: right;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    *{
        <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>;
        <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
        <span class="hljs-attribute">list-style-type</span>: none;
    }
    <span class="hljs-selector-class">.box</span>{
        <span class="hljs-attribute">width</span>:<span class="hljs-number">533px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">300px</span>;
        <span class="hljs-attribute">margin</span>:<span class="hljs-number">100px</span> auto <span class="hljs-number">0</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#000</span>;
        <span class="hljs-comment">/* 让盒子变成一个伸缩容器 */</span>
        <span class="hljs-attribute">display</span>:flex;
    }
    <span class="hljs-comment">/* 第一步  需要制作出一个长方体 */</span>
    <span class="hljs-selector-class">.box</span> <span class="hljs-selector-tag">ul</span>{
        <span class="hljs-attribute">width</span>:<span class="hljs-number">533px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">300px</span>;
        <span class="hljs-attribute">position</span>:relative;
        <span class="hljs-attribute">transform-style</span>: preserve-<span class="hljs-number">3</span>d;
        <span class="hljs-attribute">transition</span>: transform <span class="hljs-number">1s</span>;
    }
    <span class="hljs-selector-class">.box</span> <span class="hljs-selector-tag">ul</span><span class="hljs-selector-pseudo">:nth-child(1)</span>{
        <span class="hljs-attribute">transition-delay</span>: <span class="hljs-number">0s</span>;
    }
    <span class="hljs-selector-class">.box</span> <span class="hljs-selector-tag">ul</span><span class="hljs-selector-pseudo">:nth-child(2)</span>{
        <span class="hljs-attribute">transition-delay</span>: <span class="hljs-number">0.2s</span>;
    }
    <span class="hljs-selector-class">.box</span> <span class="hljs-selector-tag">ul</span><span class="hljs-selector-pseudo">:nth-child(3)</span>{
        <span class="hljs-attribute">transition-delay</span>: <span class="hljs-number">0.4s</span>;
    }
    <span class="hljs-selector-class">.box</span> <span class="hljs-selector-tag">ul</span><span class="hljs-selector-pseudo">:nth-child(4)</span>{
        <span class="hljs-attribute">transition-delay</span>: <span class="hljs-number">0.6s</span>;
    }
    <span class="hljs-selector-class">.box</span> &gt; <span class="hljs-selector-tag">ul</span> &gt; <span class="hljs-selector-tag">li</span>{
        <span class="hljs-comment">/* 这里最好是设置成width:100%  让它继承收缩后的UL的宽度*/</span>
        <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">100%</span>;
        <span class="hljs-attribute">position</span>:absolute;
        <span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;
        <span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;
        <span class="hljs-comment">/* 这个切割一定是加给li的 ul加的话会把3D空间给干掉*/</span>
        <span class="hljs-attribute">overflow</span>:hidden;
    }
    <span class="hljs-selector-class">.box</span> &gt; <span class="hljs-selector-tag">ul</span> &gt; <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(1)</span>{
        <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">rotateX</span>(90deg) <span class="hljs-built_in">translateZ</span>(150px);<span class="hljs-comment">/* 上面 */</span>
    }
    <span class="hljs-selector-class">.box</span> &gt; <span class="hljs-selector-tag">ul</span> &gt; <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(2)</span>{
        <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">rotateX</span>(-90deg) <span class="hljs-built_in">translateZ</span>(150px);<span class="hljs-comment">/* 下面 */</span>
    }
    <span class="hljs-selector-class">.box</span> &gt; <span class="hljs-selector-tag">ul</span> &gt; <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(3)</span>{
        <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">translateZ</span>(150px);<span class="hljs-comment">/* 正面 */</span>
    }
    <span class="hljs-selector-class">.box</span> &gt; <span class="hljs-selector-tag">ul</span> &gt; <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(4)</span>{
        <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">rotateX</span>(180deg) <span class="hljs-built_in">translateZ</span>(150px);<span class="hljs-comment">/* 背面 */</span>
    }
    <span class="hljs-selector-class">.box</span> &gt; <span class="hljs-selector-tag">ul</span><span class="hljs-selector-pseudo">:nth-child(2)</span> <span class="hljs-selector-tag">img</span>{
        <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">134px</span>;
    }
    <span class="hljs-selector-class">.box</span> &gt; <span class="hljs-selector-tag">ul</span><span class="hljs-selector-pseudo">:nth-child(3)</span> <span class="hljs-selector-tag">img</span>{
        <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">268px</span>;
    }
    <span class="hljs-selector-class">.box</span> &gt; <span class="hljs-selector-tag">ul</span><span class="hljs-selector-pseudo">:nth-child(4)</span> <span class="hljs-selector-tag">img</span>{
        <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">402px</span>;
    }
    <span class="hljs-selector-class">.btn_wrap</span>{
        <span class="hljs-attribute">width</span>:<span class="hljs-number">760px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">0px</span>;
        <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> auto;
        <span class="hljs-attribute">position</span>:relative;
        <span class="hljs-attribute">top</span>:-<span class="hljs-number">250px</span>;
    }
    <span class="hljs-selector-class">.btn_wrap</span> <span class="hljs-selector-tag">button</span>{
        <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
    }
    <span class="hljs-selector-class">.btn_wrap</span> <span class="hljs-selector-tag">button</span><span class="hljs-selector-pseudo">:nth-child(1)</span>{
        <span class="hljs-attribute">float</span>: left;
    }
    <span class="hljs-selector-class">.btn_wrap</span> <span class="hljs-selector-tag">button</span><span class="hljs-selector-pseudo">:nth-child(2)</span>{
        <span class="hljs-attribute">float</span>: right;
    }</code></pre>
<p>js部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 需求 点击按钮一次，就让长方体沿着X轴旋转90度（是基于上一次的角度累加或者累减）
    var box = document.querySelector('.box');
    var _ul = box.querySelectorAll('ul');
    var _li = box.querySelectorAll('li');
    var btns = document.querySelectorAll('button');
    // 声明一个信号量,以便计算需要旋转的度数
    var num = 0;
    // 当用户暴力点击的时候会出现过度执行不过来的BUG情况，需要函数节流。声明一个开关变量
    var flag = true;
    
    _ul[_ul.length -1].addEventListener('transitionend',function(){
        console.log(1);
        // 在过渡执行完毕之后重新打开开关
        flag = true;
    })

    for(var i = 0; i < btns.length; i++){
        btns[i].setAttribute('data-index', i);
        btns[i].addEventListener('click',function(){
            if(flag){
                flag = false;
                // 每次点击进行一次判断后在累加或者累减
                // 通过this去找到当前对象的自定义下标
                var index = this.dataset['index'];
                if(index == 1){
                    num++;
                }else if(index == 0){
                    num--;
                }
                // 给所有的UL添加翻转效果
                for(var i = 0; i < _ul.length; i++){
                    _ul[i].style.transform = 'rotateX('+num*90+'deg)';
                }
            }
        })
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-comment">// 需求 点击按钮一次，就让长方体沿着X轴旋转90度（是基于上一次的角度累加或者累减）</span>
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.box'</span>);
    <span class="hljs-keyword">var</span> _ul = box.querySelectorAll(<span class="hljs-string">'ul'</span>);
    <span class="hljs-keyword">var</span> _li = box.querySelectorAll(<span class="hljs-string">'li'</span>);
    <span class="hljs-keyword">var</span> btns = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'button'</span>);
    <span class="hljs-comment">// 声明一个信号量,以便计算需要旋转的度数</span>
    <span class="hljs-keyword">var</span> num = <span class="hljs-number">0</span>;
    <span class="hljs-comment">// 当用户暴力点击的时候会出现过度执行不过来的BUG情况，需要函数节流。声明一个开关变量</span>
    <span class="hljs-keyword">var</span> flag = <span class="hljs-literal">true</span>;
    
    _ul[_ul.length <span class="hljs-number">-1</span>].addEventListener(<span class="hljs-string">'transitionend'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
        <span class="hljs-comment">// 在过渡执行完毕之后重新打开开关</span>
        flag = <span class="hljs-literal">true</span>;
    })

    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; btns.length; i++){
        btns[i].setAttribute(<span class="hljs-string">'data-index'</span>, i);
        btns[i].addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">if</span>(flag){
                flag = <span class="hljs-literal">false</span>;
                <span class="hljs-comment">// 每次点击进行一次判断后在累加或者累减</span>
                <span class="hljs-comment">// 通过this去找到当前对象的自定义下标</span>
                <span class="hljs-keyword">var</span> index = <span class="hljs-keyword">this</span>.dataset[<span class="hljs-string">'index'</span>];
                <span class="hljs-keyword">if</span>(index == <span class="hljs-number">1</span>){
                    num++;
                }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(index == <span class="hljs-number">0</span>){
                    num--;
                }
                <span class="hljs-comment">// 给所有的UL添加翻转效果</span>
                <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; _ul.length; i++){
                    _ul[i].style.transform = <span class="hljs-string">'rotateX('</span>+num*<span class="hljs-number">90</span>+<span class="hljs-string">'deg)'</span>;
                }
            }
        })
    }</code></pre>
<h3 id="articleHeader2">3. 移动端</h3>
<p>原理：利用定位，分为左中右</p>
<p>效果图：<a href="http://aloe2014.github.io/slider-mobile" rel="nofollow noreferrer" target="_blank">在线demo</a></p>
<p><span class="img-wrap"><img data-src="/img/bVUg4D?w=449&amp;h=342" src="https://static.alili.tech/img/bVUg4D?w=449&amp;h=342" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>HTML</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="同普通版" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">同普通版</code></pre>
<p>css部分代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".carouse-wrap {
    position: relative;
    min-height: 143px;
}

.carouse-wrap li {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transform : translateX(100%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.carouse-wrap</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">min-height</span>: <span class="hljs-number">143px</span>;
}

<span class="hljs-selector-class">.carouse-wrap</span> <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform </span>: <span class="hljs-built_in">translateX</span>(100%);
}</code></pre>
<p>js部分（代码较长，只放了重点部分，完整代码见文末）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 将最初始的位置赋值
left = carouseWrapLi.length - 1;
center = 0;
right = 1;
// 将最开始的三张先就位
carouseWrapLi[left].style.transform = 'translateX('+ -windowWidth +'px)';
carouseWrapLi[center].style.transform = 'translateX(0px)';
carouseWrapLi[right].style.transform = 'translateX('+ windowWidth +'px)';
// 看到下一张的逻辑
function showNext(){
    // 轮转下标
    left = center;
    center = right;
    right++;

    // 极值判断
    if(right > carouseWrapLi.length - 1){
        right = 0;
    }

....

// 手指touch的时候去切换图片
jdCarouse.addEventListener('touchstart',touchstartHandler);
jdCarouse.addEventListener('touchmove',touchmoveHandler);
jdCarouse.addEventListener('touchend',touchendHandler);

var startX = 0;  // 记录开始的时候的手指落点
var moveX = 0;    // 记录移动最终的手指落点
var starTime = null;

function touchstartHandler(event){
    // 记录滑动开始的时间
    starTime = new Date();
    // 在最开始的时候清除定时器
    clearInterval(carouseTimer);
    // 获取手指的落点
    startX = event.touches[0].pageX;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 将最初始的位置赋值</span>
left = carouseWrapLi.length - <span class="hljs-number">1</span>;
center = <span class="hljs-number">0</span>;
right = <span class="hljs-number">1</span>;
<span class="hljs-comment">// 将最开始的三张先就位</span>
carouseWrapLi[left].style.transform = <span class="hljs-string">'translateX('</span>+ -windowWidth +<span class="hljs-string">'px)'</span>;
carouseWrapLi[center].style.transform = <span class="hljs-string">'translateX(0px)'</span>;
carouseWrapLi[right].style.transform = <span class="hljs-string">'translateX('</span>+ windowWidth +<span class="hljs-string">'px)'</span>;
<span class="hljs-comment">// 看到下一张的逻辑</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showNext</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// 轮转下标</span>
    left = center;
    center = right;
    right++;

    <span class="hljs-comment">// 极值判断</span>
    <span class="hljs-keyword">if</span>(right &gt; carouseWrapLi.length - <span class="hljs-number">1</span>){
        right = <span class="hljs-number">0</span>;
    }

....

<span class="hljs-comment">// 手指touch的时候去切换图片</span>
jdCarouse.addEventListener(<span class="hljs-string">'touchstart'</span>,touchstartHandler);
jdCarouse.addEventListener(<span class="hljs-string">'touchmove'</span>,touchmoveHandler);
jdCarouse.addEventListener(<span class="hljs-string">'touchend'</span>,touchendHandler);

<span class="hljs-keyword">var</span> startX = <span class="hljs-number">0</span>;  <span class="hljs-comment">// 记录开始的时候的手指落点</span>
<span class="hljs-keyword">var</span> moveX = <span class="hljs-number">0</span>;    <span class="hljs-comment">// 记录移动最终的手指落点</span>
<span class="hljs-keyword">var</span> starTime = <span class="hljs-literal">null</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">touchstartHandler</span>(<span class="hljs-params">event</span>)</span>{
    <span class="hljs-comment">// 记录滑动开始的时间</span>
    starTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
    <span class="hljs-comment">// 在最开始的时候清除定时器</span>
    clearInterval(carouseTimer);
    <span class="hljs-comment">// 获取手指的落点</span>
    startX = event.touches[<span class="hljs-number">0</span>].pageX;</code></pre>
<h3 id="articleHeader3">4. 纯css3无缝滚动版</h3>
<p>原理：结合CSS3的@keyframes</p>
<p>效果图：<a href="http://aloe2014.github.io/slider-web" rel="nofollow noreferrer" target="_blank">在线demo</a></p>
<p><span class="img-wrap"><img data-src="/img/bVUg6l?w=690&amp;h=254" src="https://static.alili.tech/img/bVUg6l?w=690&amp;h=254" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>HTML</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;box&quot;>
    <ul>
        <li><a href=&quot;#&quot;><img src=&quot;imgs/1.jpg&quot; alt=&quot;&quot;></a></li>
        <li><a href=&quot;#&quot;><img src=&quot;imgs/2.jpg&quot; alt=&quot;&quot;></a></li>
        <li><a href=&quot;#&quot;><img src=&quot;imgs/3.jpg&quot; alt=&quot;&quot;></a></li>
        <li><a href=&quot;#&quot;><img src=&quot;imgs/4.jpg&quot; alt=&quot;&quot;></a></li>
        <!-- 复制两个临时工 -->
        <li><a href=&quot;#&quot;><img src=&quot;imgs/1.jpg&quot; ></a></li>
        <li><a href=&quot;#&quot;><img src=&quot;imgs/2.jpg&quot; alt=&quot;&quot;></a></li>
    </ul>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"imgs/1.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"imgs/2.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"imgs/3.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"imgs/4.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 复制两个临时工 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"imgs/1.jpg"</span> &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"imgs/2.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>css</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="* {
    padding: 0;
    margin: 0;
    list-style-type: none;
}
.box {
    width: 533px;
    height: 200px;
    border: 1px solid #000;
    margin: 100px auto;
    position: relative;
    overflow: hidden;
}
.box:hover ul{
    /* 在hover的时候让动画暂停 */
    animation-play-state:paused;
}
img{
    display: block;
}
ul {
    width: 3198px;
    height: 200px;
    position: absolute;
    left: 0;
    top: 0;
    animation: wufeng 10s linear infinite;
}
@keyframes wufeng{
    0%{
        left: 0;
    }
    100%{
        left: -2132px;
    }
}
ul li{
    float: left;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">* {
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">list-style-type</span>: none;
}
<span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">533px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#000</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-selector-class">.box</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-tag">ul</span>{
    <span class="hljs-comment">/* 在hover的时候让动画暂停 */</span>
    <span class="hljs-attribute">animation-play-state</span>:paused;
}
<span class="hljs-selector-tag">img</span>{
    <span class="hljs-attribute">display</span>: block;
}
<span class="hljs-selector-tag">ul</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">3198px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">animation</span>: wufeng <span class="hljs-number">10s</span> linear infinite;
}
@<span class="hljs-keyword">keyframes</span> wufeng{
    0%{
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    }
    100%{
        <span class="hljs-attribute">left</span>: -<span class="hljs-number">2132px</span>;
    }
}
<span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span>{
    <span class="hljs-attribute">float</span>: left;
}</code></pre>
<p>完整代码可以去:<br><a href="https://github.com/aloe2014/slider-web" rel="nofollow noreferrer" target="_blank">https://github.com/aloe2014/s...</a><br><a href="https://github.com/aloe2014/slider-mobile" rel="nofollow noreferrer" target="_blank">https://github.com/aloe2014/s...</a> (移动版)</p>
<p>(此文献与对原生js动画保有热爱的我们......)</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
几种原生js轮播图

## 原文链接
[https://segmentfault.com/a/1190000011013572](https://segmentfault.com/a/1190000011013572)

