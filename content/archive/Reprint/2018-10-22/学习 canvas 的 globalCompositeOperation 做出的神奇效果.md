---
title: 学习 canvas 的 globalCompositeOperation 做出的神奇效果
reprint: true
categories: reprint
abbrlink: fc01489
date: 2018-10-22 00:00:00
---

{{% raw %}}

                    
<h3 id="articleHeader0">说明</h3>
<p>最早知道 canvas 的 <a href="http://www.w3school.com.cn/tags/canvas_globalcompositeoperation.asp" rel="nofollow noreferrer" target="_blank">globalCompositeOperation</a> 属性，是在需要实现一个刮刮卡效果的时候，当时也就是网上找到刮刮卡的效果赶紧完成任务就完了，这次又学习一次，希望能加深理解吧。</p>
<p>先来看下  canvas 的 <a href="http://www.w3school.com.cn/tags/canvas_globalcompositeoperation.asp" rel="nofollow noreferrer" target="_blank">globalCompositeOperation</a>属性，具体是干什么的。</p>
<h3 id="articleHeader1">定义</h3>
<blockquote>globalCompositeOperation 属性设置或返回如何将一个源（新的）图像绘制到目标（已有）的图像上。        <br>源图像 = 您打算放置到画布上的绘图。        <br>目标图像 = 您已经放置在画布上的绘图。</blockquote>
<p>这个属性用来设置要在绘制新形状时应用的合成操作的类型，比如在一个蓝色的矩形上画一个红色的圆形，是红色在上显示，还是蓝色在上显示，重叠的部分显示还是不显示，不重叠的部分又怎么显示，等一些情况，在面对这些情况的时候，就是 <code>globalCompositeOperation</code> 属性起作用的时候了。     <br>在取默认值的情况下，都是显示的，新画的图形会覆盖原来的图形。</p>
<h3 id="articleHeader2">用法</h3>
<p>默认值：    <code>source-over</code>        <br>语法：    <code>context.globalCompositeOperation="source-in";</code></p>
<p>表格中的蓝色矩形为目标图像，红色圆形为源图像。</p>
<table>
<thead><tr>
<th align="left">属性值</th>
<th>描述</th>
<th>效果</th>
</tr></thead>
<tbody>
<tr>
<td align="left">source-over</td>
<td>默认。在目标图像上显示源图像。</td>
<td><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016214911?w=126&amp;h=106" src="https://static.alili.tech/img/remote/1460000016214911?w=126&amp;h=106" alt="" title="" style="cursor: pointer; display: inline;"></span></td>
</tr>
<tr>
<td align="left">source-atop</td>
<td>在目标图像顶部显示源图像。源图像位于目标图像之外的部分是不可见的。</td>
<td><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016214912?w=126&amp;h=106" src="https://static.alili.tech/img/remote/1460000016214912?w=126&amp;h=106" alt="" title="" style="cursor: pointer; display: inline;"></span></td>
</tr>
<tr>
<td align="left">source-in</td>
<td>在目标图像中显示源图像。只有目标图像内的源图像部分会显示，目标图像是透明的。</td>
<td><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016214913?w=127&amp;h=106" src="https://static.alili.tech/img/remote/1460000016214913?w=127&amp;h=106" alt="" title="" style="cursor: pointer; display: inline;"></span></td>
</tr>
<tr>
<td align="left">source-out</td>
<td>在目标图像之外显示源图像。只会显示目标图像之外源图像部分，目标图像是透明的。</td>
<td><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016214914?w=126&amp;h=106" src="https://static.alili.tech/img/remote/1460000016214914?w=126&amp;h=106" alt="" title="" style="cursor: pointer; display: inline;"></span></td>
</tr>
<tr>
<td align="left">destination-over</td>
<td>在源图像上方显示目标图像。</td>
<td><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016214915?w=126&amp;h=107" src="https://static.alili.tech/img/remote/1460000016214915?w=126&amp;h=107" alt="" title="" style="cursor: pointer; display: inline;"></span></td>
</tr>
<tr>
<td align="left">destination-atop</td>
<td>在源图像顶部显示目标图像。源图像之外的目标图像部分不会被显示。</td>
<td><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016214916?w=126&amp;h=106" src="https://static.alili.tech/img/remote/1460000016214916?w=126&amp;h=106" alt="" title="" style="cursor: pointer; display: inline;"></span></td>
</tr>
<tr>
<td align="left">destination-in</td>
<td>在源图像中显示目标图像。只有源图像内的目标图像部分会被显示，源图像是透明的。</td>
<td><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016214917?w=125&amp;h=105" src="https://static.alili.tech/img/remote/1460000016214917?w=125&amp;h=105" alt="" title="" style="cursor: pointer; display: inline;"></span></td>
</tr>
<tr>
<td align="left">destination-out</td>
<td>在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。</td>
<td><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016214918?w=125&amp;h=105" src="https://static.alili.tech/img/remote/1460000016214918?w=125&amp;h=105" alt="" title="" style="cursor: pointer; display: inline;"></span></td>
</tr>
<tr>
<td align="left">lighter</td>
<td>显示源图像 + 目标图像。</td>
<td><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016214919?w=125&amp;h=105" src="https://static.alili.tech/img/remote/1460000016214919?w=125&amp;h=105" alt="" title="" style="cursor: pointer; display: inline;"></span></td>
</tr>
<tr>
<td align="left">copy</td>
<td>显示源图像。忽略目标图像。</td>
<td><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016214920?w=126&amp;h=105" src="https://static.alili.tech/img/remote/1460000016214920?w=126&amp;h=105" alt="" title="" style="cursor: pointer; display: inline;"></span></td>
</tr>
<tr>
<td align="left">xor</td>
<td>使用异或操作对源图像与目标图像进行组合。</td>
<td><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016214921?w=127&amp;h=106" src="https://static.alili.tech/img/remote/1460000016214921?w=127&amp;h=106" alt="" title="" style="cursor: pointer; display: inline;"></span></td>
</tr>
</tbody>
</table>
<p>好的，下来实现一个<a href="https://codepen.io/FEWY/pen/oPxbmj" rel="nofollow noreferrer" target="_blank">水滴扩散</a><button class="btn btn-xs btn-default ml10 preview" data-url="FEWY/pen/oPxbmj" data-typeid="3">点击预览</button>的效果    <br><strong>效果图</strong>    <br><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016214922?w=404&amp;h=250" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>实现思路</strong>  </p>
<p>在一个 canvas 上先画出黑白色的图片，然后设置背景是一张彩色的图片，鼠标点击时，设置 canvas 的 <code>globalCompositeOperation</code> 属性值为 <code>destination-out</code>，根据鼠标在 canvas 中的 坐标，用一个不规则的图形逐渐增大，来擦除掉黑白色的图片，就可以慢慢显示彩色的背景了。</p>
<p>也就是说我们需要三张图片 </p>
<p><strong>黑白的图片</strong></p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016214923?w=640&amp;h=360" src="https://static.alili.tech/img/remote/1460000016214923?w=640&amp;h=360" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>彩色的图片</strong>    </p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016214924?w=640&amp;h=360" src="https://static.alili.tech/img/remote/1460000016214924?w=640&amp;h=360" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>不规则形状的图片</strong></p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016214925?w=100&amp;h=100" src="https://static.alili.tech/img/remote/1460000016214925?w=100&amp;h=100" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>代码</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <style>
        canvas {
            /* 设置鼠标的光标是一张图片， 16和22 分别表示热点的X坐标和Y坐标 */
            /* https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/url */
            cursor: url('https://www.kkkk1000.com/images/mouse.png') 16 22, auto;
        }
    </style>
</head>

<body>
    <canvas id=&quot;canvas&quot; width=&quot;400px&quot; height=&quot;250px&quot;></canvas>

    <script type=&quot;text/javascript&quot;> 
        var canvas = document.getElementById(&quot;canvas&quot;);
        var context = canvas.getContext(&quot;2d&quot;);

        // 保存图片路径的数组
        var urlArr = [&quot;https://www.kkkk1000.com/images/bg2.png&quot;, &quot;https://www.kkkk1000.com/images/clear.png&quot;];
        // imgArr 保存加载后的图片的数组，imgArr中保存的是真实的图片
        // loadImg 函数用来加载 urlArr 中所有的图片
        // 并返回一个保存所有图片的数组
        var imgArr = loadImg(urlArr);
        // flag 用来限制 点击事件，一张图片只会产生一次效果
        var flag = false;
 

        function loadImg(urlArr) {
            var index = 0;
            var res = [];
            // 每次给 load 函数传入一个图片路径，来加载图片
            load(urlArr[index]);
            function load(url) {
                // 如果 index 等于 urlArr.length，
                // 表示加载完 全部图片了，就结束 load函数
                if (index == urlArr.length) {
                    // 加载完全部图片，调用 init 函数
                    init();
                    return;
                }

                var img = new Image();
                img.src = url;
                // 不管当前图片是否加载成功，都要加载下一张图片
                img.onload = next;
                img.onerror = function () {
                    console.log(res[index] + &quot;加载失败&quot;);
                    next();
                }
                // next 用来加载下一张图片
                function next() {
                    // 把加载后的图片，保存到 res 中
                    res[index] = img;
                    load(urlArr[++index])
                }
            }
            // 最后返回保存所有真实图片的数组
            return res;
        }

        function init() {
            // 先在canvas上画黑白的图片，然后再设置背景是彩色的图片
            // 避免先显示出彩色图片，再显示出黑白的图片
            context.globalCompositeOperation = &quot;source-over&quot;;
            context.drawImage(imgArr[0], 0, 0, 400, 250);
            canvas.style.background = 'url(https://www.kkkk1000.com/images/bg.jpg)';
            canvas.style.backgroundSize = &quot;100% 100%&quot;;

            // flag 是 true 时，鼠标点击才有水滴扩散的效果
            flag = true;
            // canvas 绑定点击事件，点击时产生水滴扩散效果
            canvas.onclick =  diffusion;
        }

        // width 表示 不规则形状的图片的尺寸
        var width = 0;
        // speed 表示扩散效果的速度
        var speed = 8;
        // diffusion 函数根据鼠标坐标，产生效果
        function  diffusion (e) {
            if (flag) {
                flag = false;
                context.globalCompositeOperation = &quot;destination-out&quot;;
                window.requestAnimationFrame(draw);
                // 根据鼠标坐标，画扩散效果
                function draw() {
                    // 这里不一定需要是 1800 ，但必须是一个足够大的数，可以扩散出整张背景图
                    if (width > 1800) {
                        flag = true;
                        return;
                    }
                    width += speed;
                    // 获取鼠标相对于 canvas 的坐标
                    var x = e.layerX;
                    var y = e.layerY;

                    // 画不规则形状的图片，逐渐增大图片尺寸
                    context.drawImage(imgArr[1], x - (width / 2), y - (width / 2), width, width);
                    window.requestAnimationFrame(draw);
                }
            }
        }
    </script>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">canvas</span> {
            <span class="hljs-comment">/* 设置鼠标的光标是一张图片， 16和22 分别表示热点的X坐标和Y坐标 */</span>
            <span class="hljs-comment">/* https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/url */</span>
            <span class="hljs-attribute">cursor</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">'https://www.kkkk1000.com/images/mouse.png'</span>) <span class="hljs-number">16</span> <span class="hljs-number">22</span>, auto;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"canvas"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"400px"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"250px"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript"> 
        <span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"canvas"</span>);
        <span class="hljs-keyword">var</span> context = canvas.getContext(<span class="hljs-string">"2d"</span>);

        <span class="hljs-comment">// 保存图片路径的数组</span>
        <span class="hljs-keyword">var</span> urlArr = [<span class="hljs-string">"https://www.kkkk1000.com/images/bg2.png"</span>, <span class="hljs-string">"https://www.kkkk1000.com/images/clear.png"</span>];
        <span class="hljs-comment">// imgArr 保存加载后的图片的数组，imgArr中保存的是真实的图片</span>
        <span class="hljs-comment">// loadImg 函数用来加载 urlArr 中所有的图片</span>
        <span class="hljs-comment">// 并返回一个保存所有图片的数组</span>
        <span class="hljs-keyword">var</span> imgArr = loadImg(urlArr);
        <span class="hljs-comment">// flag 用来限制 点击事件，一张图片只会产生一次效果</span>
        <span class="hljs-keyword">var</span> flag = <span class="hljs-literal">false</span>;
 

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadImg</span>(<span class="hljs-params">urlArr</span>) </span>{
            <span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>;
            <span class="hljs-keyword">var</span> res = [];
            <span class="hljs-comment">// 每次给 load 函数传入一个图片路径，来加载图片</span>
            load(urlArr[index]);
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">load</span>(<span class="hljs-params">url</span>) </span>{
                <span class="hljs-comment">// 如果 index 等于 urlArr.length，</span>
                <span class="hljs-comment">// 表示加载完 全部图片了，就结束 load函数</span>
                <span class="hljs-keyword">if</span> (index == urlArr.length) {
                    <span class="hljs-comment">// 加载完全部图片，调用 init 函数</span>
                    init();
                    <span class="hljs-keyword">return</span>;
                }

                <span class="hljs-keyword">var</span> img = <span class="hljs-keyword">new</span> Image();
                img.src = url;
                <span class="hljs-comment">// 不管当前图片是否加载成功，都要加载下一张图片</span>
                img.onload = next;
                img.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    <span class="hljs-built_in">console</span>.log(res[index] + <span class="hljs-string">"加载失败"</span>);
                    next();
                }
                <span class="hljs-comment">// next 用来加载下一张图片</span>
                <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span>(<span class="hljs-params"></span>) </span>{
                    <span class="hljs-comment">// 把加载后的图片，保存到 res 中</span>
                    res[index] = img;
                    load(urlArr[++index])
                }
            }
            <span class="hljs-comment">// 最后返回保存所有真实图片的数组</span>
            <span class="hljs-keyword">return</span> res;
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 先在canvas上画黑白的图片，然后再设置背景是彩色的图片</span>
            <span class="hljs-comment">// 避免先显示出彩色图片，再显示出黑白的图片</span>
            context.globalCompositeOperation = <span class="hljs-string">"source-over"</span>;
            context.drawImage(imgArr[<span class="hljs-number">0</span>], <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">400</span>, <span class="hljs-number">250</span>);
            canvas.style.background = <span class="hljs-string">'url(https://www.kkkk1000.com/images/bg.jpg)'</span>;
            canvas.style.backgroundSize = <span class="hljs-string">"100% 100%"</span>;

            <span class="hljs-comment">// flag 是 true 时，鼠标点击才有水滴扩散的效果</span>
            flag = <span class="hljs-literal">true</span>;
            <span class="hljs-comment">// canvas 绑定点击事件，点击时产生水滴扩散效果</span>
            canvas.onclick =  diffusion;
        }

        <span class="hljs-comment">// width 表示 不规则形状的图片的尺寸</span>
        <span class="hljs-keyword">var</span> width = <span class="hljs-number">0</span>;
        <span class="hljs-comment">// speed 表示扩散效果的速度</span>
        <span class="hljs-keyword">var</span> speed = <span class="hljs-number">8</span>;
        <span class="hljs-comment">// diffusion 函数根据鼠标坐标，产生效果</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span>  <span class="hljs-title">diffusion</span> (<span class="hljs-params">e</span>) </span>{
            <span class="hljs-keyword">if</span> (flag) {
                flag = <span class="hljs-literal">false</span>;
                context.globalCompositeOperation = <span class="hljs-string">"destination-out"</span>;
                <span class="hljs-built_in">window</span>.requestAnimationFrame(draw);
                <span class="hljs-comment">// 根据鼠标坐标，画扩散效果</span>
                <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>) </span>{
                    <span class="hljs-comment">// 这里不一定需要是 1800 ，但必须是一个足够大的数，可以扩散出整张背景图</span>
                    <span class="hljs-keyword">if</span> (width &gt; <span class="hljs-number">1800</span>) {
                        flag = <span class="hljs-literal">true</span>;
                        <span class="hljs-keyword">return</span>;
                    }
                    width += speed;
                    <span class="hljs-comment">// 获取鼠标相对于 canvas 的坐标</span>
                    <span class="hljs-keyword">var</span> x = e.layerX;
                    <span class="hljs-keyword">var</span> y = e.layerY;

                    <span class="hljs-comment">// 画不规则形状的图片，逐渐增大图片尺寸</span>
                    context.drawImage(imgArr[<span class="hljs-number">1</span>], x - (width / <span class="hljs-number">2</span>), y - (width / <span class="hljs-number">2</span>), width, width);
                    <span class="hljs-built_in">window</span>.requestAnimationFrame(draw);
                }
            }
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>我们继续来实现一个刮刮卡的效果</p>
<p><strong>效果图</strong></p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016214926?w=403&amp;h=252" src="https://static.alili.tech/img/remote/1460000016214926?w=403&amp;h=252" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>刮刮卡效果实现的思路：</strong></p>
<p>一个 canvas 上先画一层灰色，然后设置canvas的背景图，设置 canvas 的 <code>globalCompositeOperation</code>属性值为 <code>destination-out</code>，点击并移动时，根据移动点的坐标，擦除掉灰色，当擦掉一部分时，再自动擦除掉全部灰色，显示出背景来。</p>
<p>刮刮卡的效果和水滴扩散的效果，在开始的时候几乎是一样的，不过水滴扩散效果，用的是一张不规则形状的图片来清除黑白图片，而刮刮卡效果，是通过画线的方式，线比较粗而已，来清除上面的灰色。<br>主要的不同是，刮刮卡效果最后需要自动擦除掉全部灰色，这里有两种方式。</p>
<p><strong>第一种</strong>    <br>使用 canvas 的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData" rel="nofollow noreferrer" target="_blank">getImageData</a> 方法，来获取 canvas 上的像素信息，这个方法返回的对象的 data 属性是一个一维数组，包含以 RGBA 顺序的数据，数据使用  0 至 255（包含）的整数表示，详细的可以看看 canvas 的<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas" rel="nofollow noreferrer" target="_blank">像素操作</a>。     <br>用这个方法来判断有多少已经擦除掉了，也就是通过一个变量来记录有多少像素的RGBA的值是0，当变量的值超过某一个值时，就清除全部灰色。</p>
<p>代码在<a href="https://codepen.io/FEWY/pen/BOjmyg" rel="nofollow noreferrer" target="_blank">这里</a><button class="btn btn-xs btn-default ml10 preview" data-url="FEWY/pen/BOjmyg" data-typeid="3">点击预览</button>。</p>
<p><strong>第二种</strong>     <br>就直接看移动了多少，鼠标移动时，会有一个变量进行自增运算，当这个变量，超过一定值时，就擦除全部灰色。</p>
<p>代码在<a href="https://codepen.io/FEWY/pen/eLJeNv" rel="nofollow noreferrer" target="_blank">这里</a><button class="btn btn-xs btn-default ml10 preview" data-url="FEWY/pen/eLJeNv" data-typeid="3">点击预览</button>。</p>
<p><strong>注意：</strong>       <br>第一种方式使用  <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/getImageData" rel="nofollow noreferrer" target="_blank">getImageData</a> 存在跨域问题，不过因为这个效果中，没有在canvas上画图片，而是设置canvas的 <code>background</code> 为一张图片，所以这个还没有影响，但是如果canvas上画了其他图片，就可能需要处理跨域的问题了。              <br>使用 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/getImageData" rel="nofollow noreferrer" target="_blank">getImageData</a> 能获取到 canvas 上的像素信息，可以更加灵活的控制擦除全部灰色的时机。</p>
<p>第二种方式，使用图片地址，不存在跨域的问题，但是不能很好的控制最后擦除全部灰色的时机。</p>
<h3 id="articleHeader3">总结</h3>
<p>文章中的效果主要是使用 <code>globalCompositeOperation</code>属性取值为 <code>destination-out</code> ，而取值为其他值的时候，同样也是可以制作出各种效果的，大家也可以发挥自己的想象力，去试试其它值，也许有新发现呢。</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016248923?w=600&amp;h=342" src="https://static.alili.tech/img/remote/1460000016248923?w=600&amp;h=342" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{% /raw %}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://segmentfault.com/a/1190000016214908](https://segmentfault.com/a/1190000016214908)

## 原文标题
学习 canvas 的 globalCompositeOperation 做出的神奇效果
