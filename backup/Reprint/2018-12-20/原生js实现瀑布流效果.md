---
title: '原生js实现瀑布流效果' 
date: 2018-12-20 2:30:10
hidden: true
slug: wdp9gorst8
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000012621941?w=1052&amp;h=542" src="https://static.alili.tech/img/remote/1460000012621941?w=1052&amp;h=542" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">前言</h2>
<p>最近在整理js基础知识，接触到了几个常用的页面特效，其中觉得用原生js实现瀑布流的案例十分有趣，于是与大家分享一下。</p>
<h2 id="articleHeader1">瀑布流</h2>
<blockquote>瀑布流，又称瀑布流式布局。是比较流行的一种网站页面布局，视觉表现为参差不齐的多栏布局，随着页面滚动条向下滚动，这种布局还会不断加载数据块并附加至当前尾部。</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012621942?w=760&amp;h=477" src="https://static.alili.tech/img/remote/1460000012621942?w=760&amp;h=477" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><strong>1、首先瀑布流所有的图片应该保持宽度一致，高度是由内容决定。</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012621943" src="https://static.alili.tech/img/remote/1460000012621943" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><em>左浮动的话，我们可以看到第<code>6</code>个盒子直接就在第<code>4</code>个盒子旁边停下了，因为第<code>4</code>个高度最高，挡住了它左浮动的去路。第<code>6</code>个盒子是第<code>2</code>行的最后一个，所以第<code>7</code>个盒子只能在第<code>3</code>行排列了。当排到第<code>12</code>个盒子的时候，盒子会以第<code>11</code>个盒子的位置为基础左浮动(这就是第<code>12</code>个盒子为什么没有‘跳到’第<code>9</code>个盒子下面的原因)，碰到第<code>8</code>个盒子后又被挡住了。</em></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012621944" src="https://static.alili.tech/img/remote/1460000012621944" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><em>通过定位的方式是我们实现瀑布流的最基本的原理，只要我们动态的设置它的<code>top</code>值、<code>left</code>值，就能让它排列。</em></p>
<p><strong>2、定位后确定浏览器显示区域内，一行能放多少列图片盒子。</strong></p>
<ul>
<li>获取页面的宽度</li>
<li>获取图片盒子的宽度</li>
<li>显示的列数 = 页面宽度/图片盒子宽度</li>
<li><code>column = pageWidth / itemWidth</code></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012621945" src="https://static.alili.tech/img/remote/1460000012621945" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><strong>3、为了美观我们可以加上一个空隙</strong></p>
<ul>
<li>显示的列数 = 页面宽度/(图片盒子宽度+间隙);</li>
<li><code>column = pageWidth / (itemWidth + gap);</code></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012621946" src="https://static.alili.tech/img/remote/1460000012621946" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><strong>4、 确定列数之后，排列第一行</strong></p>
<ul>
<li>下面还有很多图片盒子，我们先要排列第<code>1</code>行，所以在<code>for</code>循环里就要判断一下，当<code>i</code>(所有图片盒子的索引) &lt; <code>column</code>(显示列数)的时候，说明在第<code>1</code>行；</li>
<li>知道在第<code>1</code>行之后，动态设置每个图片盒子的<code>left</code>值就能排好第<code>1</code>行。</li>
<li><code>left = i * ( itemWidth + gap );</code></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012621947" src="https://static.alili.tech/img/remote/1460000012621947" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><strong>5、第1行排列好之后，获取第1行所有图片盒子的高度</strong></p>
<ul>
<li>需要定义一个数组<code>arr</code>，将获取到的高度存在数组中，因为第<code>2</code>行排列的时候需要考虑<code>top</code>值，此时只能根据第<code>1</code>行图片盒子的高度来设置；</li>
<li>获取图片高度的时候要注意，程序必须写在入口函数<code>onload</code>里面，因为图片的加载特性是：等页面都加载完之后才去请求加载，所以不写在入口函数里可能会出现高度获取不到的情况。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012621948" src="https://static.alili.tech/img/remote/1460000012621948" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>6、排列第2行</strong></p>
<ul>
<li>获取到刚刚数组中，高度最小的那一列，将第<code>2</code>行的第<code>1</code>个图片盒子放置在它的下方；</li>
<li>此时的<code>left</code>值就是高度最小列的<code>offsetLeft</code>；<code>top</code>值就是：第<code>1</code>行高度最小列的高度(为了布局美观可以加上上下间隙<code>gap</code>)。</li>
<li>记录下高度最小列的索引<code>index</code>，后面计算会用到；</li>
<li>设置完成之后，会发现后面所有的图片都叠在这个高度最小列的下面，原因就是此时的最小列高度没有改变，应该加上下面图片的高度，得出一个新高度。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012621949" src="https://static.alili.tech/img/remote/1460000012621949" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>7、改变最小列当前高度</strong></p>
<ul>
<li>此时的这一列高度其实已经发生改变了，所以需要将新高度赋值给数组</li>
<li>当前高度最小列的高度 = 当前高度最小列的高度 + 间隙 + 下面图片盒子的高度</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012621950" src="https://static.alili.tech/img/remote/1460000012621950" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>8、触发resize事件</strong></p>
<ul>
<li>将整个设置样式的部分封装成一个函数，在<code>onload</code>里面注册一个<code>resize</code>事件，只要页面一发生改变，就触发样式部分的代码。</li>
<li>实时改变<code>pageWidth</code>的宽度，这样瀑布流就会是一个响应式的效果了</li>
</ul>
<p><strong>9、懒加载效果</strong></p>
<ul>
<li>目前我们用的是<code>30</code>张图片，假如一个页面中有几百张图片的时候，我们不可能等到它都加载完再显示，所有这里引入一个懒加载的概念，我们规定第<code>30</code>张为显示的最后一张图片，当滚动条滚动到<code>30</code>张的时候，应该加载下一批图片。</li>
<li>即页面可视区高度+滚动条卷去的高度 = 第<code>30</code>图片的<code>offsetTop</code>；的时候加载下面的图片。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012621951" src="https://static.alili.tech/img/remote/1460000012621951" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>完整代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
        position: relative;
    }
    
    img {
        width: 220px;
        display: block;
    }
    
    .item {
        box-shadow: 2px 2px 2px #999;
        position: absolute;
    }
</style>

<!-- html 部分 -->
<div id=&quot;box&quot;>
    <div class=&quot;item&quot;><img src=&quot;../image/瀑布流/001.jpg&quot; alt=&quot;&quot;></div>
                                .
                                .
                                .
    <div class=&quot;item&quot;><img src=&quot;../image/瀑布流/030.jpg&quot; alt=&quot;&quot;></div>
</div>

<!-- js 部分 -->
<script>
    var box = document.getElementById('box');
    var items = box.children;
    // 定义每一列之间的间隙 为10像素
    var gap = 10;

    window.onload = function() {
        // 一进来就调用一次
        waterFall();
        // 封装成一个函数
        function waterFall() {
            // 1- 确定列数  = 页面的宽度 / 图片的宽度
            var pageWidth = getClient().width;
            var itemWidth = items[0].offsetWidth;
            var columns = parseInt(pageWidth / (itemWidth + gap));
            var arr = [];
            for (var i = 0; i < items.length; i++) {
                if (i < columns) {
                    // 2- 确定第一行
                    items[i].style.top = 0;
                    items[i].style.left = (itemWidth + gap) * i + 'px';
                    arr.push(items[i].offsetHeight);

                } else {
                    // 其他行
                    // 3- 找到数组中最小高度  和 它的索引
                    var minHeight = arr[0];
                    var index = 0;
                    for (var j = 0; j < arr.length; j++) {
                        if (minHeight > arr[j]) {
                            minHeight = arr[j];
                            index = j;
                        }
                    }
                    // 4- 设置下一行的第一个盒子位置
                    // top值就是最小列的高度 + gap
                    items[i].style.top = arr[index] + gap + 'px';
                    // left值就是最小列距离左边的距离
                    items[i].style.left = items[index].offsetLeft + 'px';

                    // 5- 修改最小列的高度 
                    // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
                    arr[index] = arr[index] + items[i].offsetHeight + gap;
                }
            }
        }
        // 页面尺寸改变时实时触发
        window.onresize = function() {
            waterFall();
        };
        // 当加载到第30张的时候
        window.onscroll = function() {
            if (getClient().height + getScrollTop() >= items[items.length - 1].offsetTop) {
                // 模拟 ajax 获取数据    
                var datas = [
                    &quot;../image/瀑布流/001.jpg&quot;,
                            ...
                    &quot;../image/瀑布流/030.jpg&quot;
                ];
                for (var i = 0; i < datas.length; i++) {
                    var div = document.createElement(&quot;div&quot;);
                    div.className = &quot;item&quot;;
                    div.innerHTML = '<img src=&quot;' + datas[i] + '&quot; alt=&quot;&quot;>';
                    box.appendChild(div);
                }
                waterFall();
            }

        };
    };

    // clientWidth 处理兼容性
    function getClient() {
        return {
            width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        }
    }
    // scrollTop兼容性处理
    function getScrollTop() {
        return window.pageYOffset || document.documentElement.scrollTop;
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">position</span>: relative;
    }
    
    <span class="hljs-selector-tag">img</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">220px</span>;
        <span class="hljs-attribute">display</span>: block;
    }
    
    <span class="hljs-selector-class">.item</span> {
        <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">2px</span> <span class="hljs-number">2px</span> <span class="hljs-number">2px</span> <span class="hljs-number">#999</span>;
        <span class="hljs-attribute">position</span>: absolute;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/瀑布流/001.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                                .
                                .
                                .
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/瀑布流/030.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);
    <span class="hljs-keyword">var</span> items = box.children;
    <span class="hljs-comment">// 定义每一列之间的间隙 为10像素</span>
    <span class="hljs-keyword">var</span> gap = <span class="hljs-number">10</span>;

    <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 一进来就调用一次</span>
        waterFall();
        <span class="hljs-comment">// 封装成一个函数</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">waterFall</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 1- 确定列数  = 页面的宽度 / 图片的宽度</span>
            <span class="hljs-keyword">var</span> pageWidth = getClient().width;
            <span class="hljs-keyword">var</span> itemWidth = items[<span class="hljs-number">0</span>].offsetWidth;
            <span class="hljs-keyword">var</span> columns = <span class="hljs-built_in">parseInt</span>(pageWidth / (itemWidth + gap));
            <span class="hljs-keyword">var</span> arr = [];
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; items.length; i++) {
                <span class="hljs-keyword">if</span> (i &lt; columns) {
                    <span class="hljs-comment">// 2- 确定第一行</span>
                    items[i].style.top = <span class="hljs-number">0</span>;
                    items[i].style.left = (itemWidth + gap) * i + <span class="hljs-string">'px'</span>;
                    arr.push(items[i].offsetHeight);

                } <span class="hljs-keyword">else</span> {
                    <span class="hljs-comment">// 其他行</span>
                    <span class="hljs-comment">// 3- 找到数组中最小高度  和 它的索引</span>
                    <span class="hljs-keyword">var</span> minHeight = arr[<span class="hljs-number">0</span>];
                    <span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>;
                    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; arr.length; j++) {
                        <span class="hljs-keyword">if</span> (minHeight &gt; arr[j]) {
                            minHeight = arr[j];
                            index = j;
                        }
                    }
                    <span class="hljs-comment">// 4- 设置下一行的第一个盒子位置</span>
                    <span class="hljs-comment">// top值就是最小列的高度 + gap</span>
                    items[i].style.top = arr[index] + gap + <span class="hljs-string">'px'</span>;
                    <span class="hljs-comment">// left值就是最小列距离左边的距离</span>
                    items[i].style.left = items[index].offsetLeft + <span class="hljs-string">'px'</span>;

                    <span class="hljs-comment">// 5- 修改最小列的高度 </span>
                    <span class="hljs-comment">// 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度</span>
                    arr[index] = arr[index] + items[i].offsetHeight + gap;
                }
            }
        }
        <span class="hljs-comment">// 页面尺寸改变时实时触发</span>
        <span class="hljs-built_in">window</span>.onresize = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            waterFall();
        };
        <span class="hljs-comment">// 当加载到第30张的时候</span>
        <span class="hljs-built_in">window</span>.onscroll = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span> (getClient().height + getScrollTop() &gt;= items[items.length - <span class="hljs-number">1</span>].offsetTop) {
                <span class="hljs-comment">// 模拟 ajax 获取数据    </span>
                <span class="hljs-keyword">var</span> datas = [
                    <span class="hljs-string">"../image/瀑布流/001.jpg"</span>,
                            ...
                    <span class="hljs-string">"../image/瀑布流/030.jpg"</span>
                ];
                <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; datas.length; i++) {
                    <span class="hljs-keyword">var</span> div = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"div"</span>);
                    div.className = <span class="hljs-string">"item"</span>;
                    div.innerHTML = <span class="hljs-string">'&lt;img src="'</span> + datas[i] + <span class="hljs-string">'" alt=""&gt;'</span>;
                    box.appendChild(div);
                }
                waterFall();
            }

        };
    };

    <span class="hljs-comment">// clientWidth 处理兼容性</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getClient</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">width</span>: <span class="hljs-built_in">window</span>.innerWidth || <span class="hljs-built_in">document</span>.documentElement.clientWidth || <span class="hljs-built_in">document</span>.body.clientWidth,
            <span class="hljs-attr">height</span>: <span class="hljs-built_in">window</span>.innerHeight || <span class="hljs-built_in">document</span>.documentElement.clientHeight || <span class="hljs-built_in">document</span>.body.clientHeight
        }
    }
    <span class="hljs-comment">// scrollTop兼容性处理</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getScrollTop</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">window</span>.pageYOffset || <span class="hljs-built_in">document</span>.documentElement.scrollTop;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012621952?w=730&amp;h=411" src="https://static.alili.tech/img/remote/1460000012621952?w=730&amp;h=411" alt="image" title="image" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
原生js实现瀑布流效果

## 原文链接
[https://segmentfault.com/a/1190000012621936](https://segmentfault.com/a/1190000012621936)

