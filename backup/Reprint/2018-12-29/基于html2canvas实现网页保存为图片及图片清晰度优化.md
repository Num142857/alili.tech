---
title: '基于html2canvas实现网页保存为图片及图片清晰度优化' 
date: 2018-12-29 2:30:10
hidden: true
slug: sqg8r7lzehk
categories: [reprint]
---

{{< raw >}}

                    
<p>本次技术调研来源于H5项目中的一个重要功能需求：实现<code>微信长按网页保存为截图</code>。</p>
<p>这里有个栗子（请用微信打开，长按图片即可保存）：<a href="https://zt.igetget.com/h5/answer/get/?alias=ppg9Qow01khZlmJ2kl7L" rel="nofollow noreferrer">3分钟探索你的知识边界</a></p>
<p>将整个网页保存为图片是一个十分有趣的功能，常见于H5活动页的结尾页分享。以下则是项目中调研和踩坑的一些小结和汇总。</p>
<hr>
<h1>一、实现HTML页面保存为图片</h1>
<h2>1.1 已知可行方案</h2>
<p>现有已知能够实现网页保存为图片的方案包括：</p>
<ul>
<li>
<strong>方案1</strong>：将DOM改写为canvas，然后利用canvas的toDataURL方法实现将DOM输出为包含图片展示的<code>data URI</code>
</li>
<li>
<strong>方案2</strong>：使用<code>html2canvas.js</code>实现（可选搭配<code>Canvas2Image.js</code>实现网页保存为图片）</li>
<li>
<strong>方案3</strong>：使用<code>rasterizeHTML.js</code>实现</li>
</ul>
<h2>1.2 解决方案的选择</h2>
<ul>
<li>
<p><strong>方案1</strong>：需要手动计算每个DOM元素的<code>Computed Style</code>，然后需要计算好元素在canvas的大小位置等属性。</p>
<p><code>方案1难点</code>：</p>
<ol>
<li>相当于完全重写了整个页面的布局样式，增加了工作量。</li>
<li>由于canvas中没有的对象概念，对于元素丰富、布局复杂的页面，不易重构。</li>
<li>所有DOM元素改写进canvas会带来一些困难，例如：难以支持响应式，图片元素清晰度不佳和文字点击区域识别问题等。</li>
</ol>
</li>
<li>
<strong>方案2</strong>：该类功能中Github上stars最多(至今仍在维护)，Stack Overflow亦有丰富的讨论。只需简单调用html2canvas方法并设定配置项即可。</li>
<li>
<strong>方案3</strong>：该方案的限制较多，目前仅支持3类可转为canvas的目标格式: 页面url，html字符串和document对象。</li>
</ul>
<p><code>小结</code>: <strong>html2canvas</strong>是目前实现网页保存为图片功能的综合最佳选择。</p>
<h2>1.3 html2canvas的使用方法</h2>
<blockquote><p>官方GitHub：<a href="https://github.com/niklasvh/html2canvas" rel="nofollow noreferrer">https://github.com/niklasvh/h...</a></p></blockquote>
<p>以下描述针对html2canvas版本是<code>0.5.0-beta4</code></p>
<h3>1.3.1 实现保存为图片的第一步：html转为canvas</h3>
<p>基于<code>html2canvas.js</code>可将一个元素渲染为canvas，只需要简单的调用<code>html2canvas(element[, options]);</code>即可。下列<code>html2canvas</code>方法会返回一个包含有<code>&lt;canvas&gt;</code>元素的<code>promise</code>：</p>
<pre><code class="JavaScript">html2canvas(document.body).then(function(canvas) {
    document.body.appendChild(canvas);
});</code></pre>
<h3>1.3.2 实现保存为图片的第二步：canvas转image</h3>
<p>上一步生成的canvas即为包含目标元素的<code>&lt;canvas&gt;</code>元素对象。实现保存图片的目标只需要将canvas转image即可。</p>
<p>这里的转换方案有<code>2种</code>：</p>
<ul>
<li>
<strong>方案1</strong>：基于原生canvas的<code>toDataURL</code>方法将canvas输出为<code>data: URI</code>类型的图片地址，再将该图片地址赋值给<code>&lt;image&gt;</code>元素的src属性即可</li>
<li>
<strong>方案2</strong>：使用第三方库<code>Canvas2Image.js</code>，调用其<code>convertToImage</code>方法即可（<a href="https://github.com/hongru/canvas2image" rel="nofollow noreferrer">GitHub</a>）</li>
</ul>
<p>实际上，<code>Canvas2Image.js</code>也是基于<code>canvas.toDataURL</code>的封装，相比原生的canvas API对于转为图片的功能上考虑更为具体(未压缩的包大小为7.4KB)，适合项目使用。</p>
<h1>二、生成图片的清晰度优化方案</h1>
<h2>2.1 基础的清晰度优化方案</h2>
<blockquote><p>最终图片的清晰度<code>取决于</code>第一步中html转换成的canvas的清晰度。</p></blockquote>
<p><strong>现有解决方案</strong>参考；</p>
<ul>
<li><a href="https://yq.aliyun.com/ziliao/4416" rel="nofollow noreferrer">html5 canvas在高倍屏下变模糊的处理办法</a></li>
<li><a href="https://segmentfault.com/q/1010000002391424/a-1020000002391631">html5 canvas绘制图片模糊的问题</a></li>
</ul>
<p>其<strong>基本原理</strong>为：<br>将<code>canvas</code>的属性<code>width</code>和<code>height</code>属性放大为2倍（或者设置为<code>devicePixelRatio</code>倍），最后将canvas的CSS样式width和height设置为原先1倍的大小。</p>
<p><strong>例如</strong>：希望在html中实际显示的<code>&lt;canvas&gt;</code>宽高分别为<code>160px</code>,<code>90px</code>则可作如下设置</p>
<pre><code class="html">&lt;canvas width="320" height="180" style="width:160px;height:90px;"&gt;&lt;/canvas&gt;</code></pre>
<p>参考上述文档具体的使用案例如下；</p>
<pre><code class="JavaScript">convert2canvas() {

    var shareContent = YourTargetElem; 
    var width = shareContent.offsetWidth; 
    var height = shareContent.offsetHeight; 
    var canvas = document.createElement("canvas"); 
    var scale = 2; 

    canvas.width = width * scale; 
    canvas.height = height * scale; 
    canvas.getContext("2d").scale(scale, scale); 

    var opts = {
        scale: scale, 
        canvas: canvas, 
        logging: true, 
        width: width, 
        height: height 
    };
    html2canvas(shareContent, opts).then(function (canvas) {
        var context = canvas.getContext('2d');

        var img = Canvas2Image.convertToImage(canvas, canvas.width, canvas.height);

        document.body.appendChild(img);
        $(img).css({
            "width": canvas.width / 2 + "px",
            "height": canvas.height / 2 + "px",
        })
    });
}</code></pre>
<h2>2.2 进阶的清晰度优化方案</h2>
<blockquote><p>上述设置可以解决通常情况下图片不清晰的问题，不过探索并没有结束。</p></blockquote>
<p>实际在<a>我们的项目</a>中，即使作出<code>2.1节</code>的设置后，大果粒一般的渲染结果依然尴尬。</p>
<p>下面直接给出3条进一步的优化策略：</p>
<ol>
<li>更改<code>百分比布局</code>为<code>px布局</code>（如果原先是百分比布局的话）</li>
<li>
<code>关闭</code>canvas默认的<code>抗锯齿设</code>置</li>
<li>设置模糊元素的<code>width</code>和<code>height</code>为素材原有宽高，然后通过<code>transform: scale</code>进行缩放。这里<code>scale</code>的数值由具体需求决定。</li>
</ol>
<blockquote><p>基本原理</p></blockquote>
<ol>
<li>如果原来使用百分比设置元素宽高，请更改为<code>px为单位</code>的宽高，避免样式二次计算导致的模糊</li>
<li>默认情况下，canvas的抗锯齿是开启的，需要<code>关闭抗锯齿</code>来实现图像的锐化(<a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled" rel="nofollow noreferrer">MDN: imageSmoothingEnabled</a> )</li>
<li>除了canvas可以通过扩大2倍宽高然后缩放至原有宽高来提高清晰度，对于DOM中其他的元素也可以使用<code>css样式</code>的<code>scale</code>来实现同样的缩放</li>
</ol>
<blockquote><p>例: html2canvas配置</p></blockquote>
<pre><code class="JavaScript">convert2canvas() {

    var cntElem = $('#j-sec-end')[0];

    var shareContent = cntElem;//需要截图的包裹的（原生的）DOM 对象
    var width = shareContent.offsetWidth; //获取dom 宽度
    var height = shareContent.offsetHeight; //获取dom 高度
    var canvas = document.createElement("canvas"); //创建一个canvas节点
    var scale = 2; //定义任意放大倍数 支持小数
    canvas.width = width * scale; //定义canvas 宽度 * 缩放
    canvas.height = height * scale; //定义canvas高度 *缩放
    canvas.getContext("2d").scale(scale, scale); //获取context,设置scale 
    var opts = {
        scale: scale, // 添加的scale 参数
        canvas: canvas, //自定义 canvas
        // logging: true, //日志开关，便于查看html2canvas的内部执行流程
        width: width, //dom 原始宽度
        height: height,
        useCORS: true // 【重要】开启跨域配置
    };

    html2canvas(shareContent, opts).then(function (canvas) {

        var context = canvas.getContext('2d');
        // 【重要】关闭抗锯齿
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        
        // 【重要】默认转化的格式为png,也可设置为其他格式
        var img = Canvas2Image.convertToJPEG(canvas, canvas.width, canvas.height);

        document.body.appendChild(img);

        $(img).css({
            "width": canvas.width / 2 + "px",
            "height": canvas.height / 2 + "px",
        }).addClass('f-full');

    });
}
</code></pre>
<blockquote><p>例: DOM元素样式： </p></blockquote>
<pre><code class="css">.targetElem {width: 54px;height: 142px;margin-top:2px;margin-left:17px;transform: scale(0.5)}</code></pre>
<h1>三、含有跨域图片的配置</h1>
<p>由于canvas对于图片资源的<code>同源限制</code>，如果画布中包含跨域的图片资源则会污染画布，造成生成图片样式混乱或者html2canvas方法不执行等问题。</p>
<p>以下主要解决<strong>两类跨域的图片资源</strong>：包括已配置过CORS的<code>CDN</code>中的图片资源和<code>微信用户头像</code>图片资源。</p>
<h2>3.1 针对CDN中的图片的配置</h2>
<ol>
<li>要求CDN的图片配置好<code>CORS</code>。<code>CDN</code>配置好后，通过chrome开发者工具可以看到响应头中应含有<code>Access-Control-Allow-Origin</code>的字段。</li>
<li>开启<code>html2canvas</code>的<code>useCORS</code><a href="http://html2canvas.hertzen.com/documentation.html" rel="nofollow noreferrer">配置项</a>。即作如下设置： </li>
</ol>
<pre><code class="JavaScript">var opts = {useCORS: true};

html2canvas(element, opts);</code></pre>
<p><code>注意</code>：<br>如果没有开启<code>html2canvas</code>的<code>useCORS</code>配置项，<code>html2canvas</code>会正常执行且不会报错，但是不会输出对应的CDN图片<br>（已测试同时包含<code>CDN的图片</code>和<code>本地图片</code>的资源的页面，但是只有<code>本地图片</code>能够被正常渲染出来）</p>
<h2>3.2 针对微信用户头像的配置</h2>
<p>如果需要将<code>微信</code>平台中的用户头像一并保存为图片，<code>3.1</code>的方案无能为力。可通过配置服务端<code>代理转发</code>(forward)实现，此处不赘述。</p>
<h2>其他注意事项</h2>
<h4>1. margin的遮挡问题</h4>
<p>微信中，唤出<code>长按保存图片</code>的菜单要求长按的对象直接是<code>&lt;image&gt;</code>元素，如果<code>&lt;image&gt;</code>元素上方存在遮挡，则不会唤出菜单。<br>而事实上，引发遮挡的并不只是非<code>&lt;image&gt;</code>元素，还可能是<code>margin</code>属性。例如：若在页面底部，对一个绝对定位的元素设置了数值很大的<code>margin-top</code>，则<code>margin-top</code>所涉及的区域，均无法长按唤出菜单。解决方案：将<code>margin-top</code>改用为<code>top</code>即可。</p>
<h4>2. 安卓版微信保存图片失败的问题</h4>
<p><code>canvas2img</code>默认保存图片的格式为<code>png</code>，而在安卓版微信中所生成的图片尽管能长按唤出保存图片的菜单，但是<strong>无法正确保存到本地相册</strong>。 <code>解决方案</code>：设置<code>canvas2img</code>的生成图片格式配置项为<code>jpeg</code>即可。</p>
<h4>3. JPEG的黑屏问题</h4>
<p>设置<code>canvas2img</code>输出格式为<code>jpeg</code>，会有一定几率导致生成的图片包含大量的黑色块。<code>可能的解决方案</code>：缩减部分图片元素的体积和尺寸大小。</p>
<h4>4. 不能保留动效</h4>
<p>在图片的<code>转化前</code>，必须<code>停止</code>或者删除动效后才能正确渲染出图片，否则生成的图片是破裂的。</p>
<h2>参考文献</h2>
<ul>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage" rel="nofollow noreferrer">CanvasRenderingContext2D.drawImage()</a></li>
<li><a href="https://github.com/niklasvh/html2canvas/pull/1087" rel="nofollow noreferrer">Add dpi/scale options for custom resolution</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL" rel="nofollow noreferrer">HTMLCanvasElement.toDataURL()</a></li>
<li><a href="https://yq.aliyun.com/ziliao/4416" rel="nofollow noreferrer">html5 canvas在高倍屏下变模糊的处理办法</a></li>
<li><a href="http://blog.csdn.net/sophia1010/article/details/52945542" rel="nofollow noreferrer">Canvas实现保存图片到本地</a></li>
<li><a href="https://yq.aliyun.com/wenzhang/show_27647" rel="nofollow noreferrer">html2canvas截图如何解决跨域的问题</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于html2canvas实现网页保存为图片及图片清晰度优化

## 原文链接
[https://segmentfault.com/a/1190000011478657](https://segmentfault.com/a/1190000011478657)

