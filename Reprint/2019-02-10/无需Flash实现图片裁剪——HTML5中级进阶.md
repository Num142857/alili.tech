---
title: '无需Flash实现图片裁剪——HTML5中级进阶' 
date: 2019-02-10 2:30:42
hidden: true
slug: e3baimteolq
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>图片裁剪上传，不仅是一个很贴合用户体验的功能，还能够统一特定图片尺寸，优化网站排版，一箭双雕。</p>
<p>需求就是那么简单，在浏览器里裁剪图片并上传到服务器。</p>
<p>我第一个想到的方法就是，将图片和裁剪参数（x，y，scale，rotate）一并上传给服务器，服务器来做图片处理，so easy。<br>但是，这并不符合潮流发展的方向：<strong><em>能在前端做的处理，就放前端做吧。</em></strong><br>与潮流妥协的结果就是，前端越来越复杂。</p>
<p>一开始我并不认为浏览器能够读取并生成图片。想想看啊，要做"点击复制"的这样简单的功能，都需要借助 Flash 的浏览器，权限哪有那么大。</p>
<p>参阅各类网站，只要把图片放在本地处理的，基本上都借用了Flash。随便抄一个吧，没有API，就算能修改图片，上传路径都不知道怎么改。更关键的是，我对Flash一窍不通。</p>
<p>好在我们的网站已经完全抛弃了IE9以下的浏览器，只兼容现代HTML5浏览器。（连Opera和微软都开始走Webkit内核的路线了，潮流就是跟着Chrome走）只能寄希望与HTML5，于是钻研了一番，发现如下流程可行。</p>
<div id="flowDiagram0" class="flowChart"><svg height="413" version="1.1" width="295.84375" xmlns="http://www.w3.org/2000/svg" style="overflow: hidden; position: relative; top: -0.6875px;"><desc style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Created with Raphaël 2.1.0</desc><defs style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><path stroke-linecap="round" d="M5,0 0,2.5 5,5z" id="raphael-marker-block" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"/><marker id="raphael-marker-endblock33" markerheight="3" markerwidth="3" orient="auto" refx="1.5" refy="1.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><use xlink:href="#raphael-marker-block" transform="rotate(180 1.5 1.5) scale(0.6,0.6)" stroke-width="1.6667" fill="black" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"/></marker></defs><rect x="0" y="0" width="120.328125" height="36" r="20" rx="20" ry="20" fill="#ffffff" stroke="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" stroke-width="3" class="flowchart" id="st" transform="matrix(1,0,0,1,89.2578,6)"/><text x="10" y="18" text-anchor="start" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font: 14px Arial;" id="stt" class="flowchartt" font-size="14px" transform="matrix(1,0,0,1,89.2578,6)"><tspan dy="5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">原图片 File 对象</tspan></text><rect x="0" y="0" width="219.9375" height="36" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" stroke-width="3" class="flowchart" id="op" transform="matrix(1,0,0,1,39.4531,98)"/><text x="10" y="18" text-anchor="start" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font: 14px Arial;" id="opt" class="flowchartt" font-size="14px" transform="matrix(1,0,0,1,39.4531,98)"><tspan dy="5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">初始化Cropper 图片Base64预览</tspan></text><rect x="0" y="0" width="286.84375" height="36" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" stroke-width="3" class="flowchart" id="op1" transform="matrix(1,0,0,1,6,190)"/><text x="10" y="18" text-anchor="start" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font: 14px Arial;" id="op1t" class="flowchartt" font-size="14px" transform="matrix(1,0,0,1,6,190)"><tspan dy="5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">根据Cropper裁剪参数绘制Canvas(Base64)</tspan></text><rect x="0" y="0" width="137.5" height="36" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" stroke-width="3" class="flowchart" id="op2" transform="matrix(1,0,0,1,80.6719,282)"/><text x="10" y="18" text-anchor="start" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font: 14px Arial;" id="op2t" class="flowchartt" font-size="14px" transform="matrix(1,0,0,1,80.6719,282)"><tspan dy="5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Base64转Blob对象</tspan></text><rect x="0" y="0" width="160.015625" height="36" r="20" rx="20" ry="20" fill="#ffffff" stroke="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" stroke-width="3" class="flowchart" id="e" transform="matrix(1,0,0,1,69.4141,374)"/><text x="10" y="18" text-anchor="start" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font: 14px Arial;" id="et" class="flowchartt" font-size="14px" transform="matrix(1,0,0,1,69.4141,374)"><tspan dy="5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">上传裁剪后的Blob对象</tspan></text><path fill="none" stroke="#000000" d="M149.421875,42C149.421875,42,149.421875,80.20077085494995,149.421875,93.50016031763516" stroke-width="3" marker-end="url(#raphael-marker-endblock33)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"/><path fill="none" stroke="#000000" d="M149.421875,134C149.421875,134,149.421875,172.20077085494995,149.421875,185.50016031763516" stroke-width="3" marker-end="url(#raphael-marker-endblock33)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"/><path fill="none" stroke="#000000" d="M149.421875,226C149.421875,226,149.421875,264.20077085494995,149.421875,277.50016031763516" stroke-width="3" marker-end="url(#raphael-marker-endblock33)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"/><path fill="none" stroke="#000000" d="M149.421875,318C149.421875,318,149.421875,356.20077085494995,149.421875,369.50016031763516" stroke-width="3" marker-end="url(#raphael-marker-endblock33)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"/></svg></div>
<p>以下将对每个环节详解。</p>
<h2 id="articleHeader1">获取原图片 File 对象</h2>
<p>每个图片文件处理的开始，都是由onchange事件开始</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
    function handler(e){
        var originPhoto = e.target.files[0]; // IE10+ 单文件上传取第一个
        window.originFileType = originPhoto.type; //暂存图片类型
        window.originFileName = originPhoto.name; //暂存图片名称
        ...
    }
</script>

<input type=&quot;file&quot; name=&quot;demo&quot; onchange='handler(event)' accept=&quot;image/*&quot; >
<img id=&quot;preview&quot;>
<button onclick=&quot;cropAndUpload()&quot;>确定并上传</button>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handler</span>(<span class="hljs-params">e</span>)</span>{
        <span class="hljs-keyword">var</span> originPhoto = e.target.files[<span class="hljs-number">0</span>]; <span class="hljs-comment">// IE10+ 单文件上传取第一个</span>
        <span class="hljs-built_in">window</span>.originFileType = originPhoto.type; <span class="hljs-comment">//暂存图片类型</span>
        <span class="hljs-built_in">window</span>.originFileName = originPhoto.name; <span class="hljs-comment">//暂存图片名称</span>
        ...
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"demo"</span> <span class="hljs-attr">onchange</span>=<span class="hljs-string">'handler(event)'</span> <span class="hljs-attr">accept</span>=<span class="hljs-string">"image/*"</span> &gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"preview"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"cropAndUpload()"</span>&gt;</span>确定并上传<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<hr>
<h2 id="articleHeader2">初始化Cropper</h2>
<p>在这里介绍一个非常好用的库 cropper.js <br><a href="https://github.com/fengyuanchen/cropper" rel="nofollow noreferrer" target="_blank">https://github.com/fengyuanchen/cropper</a><br>生成遮罩、获取裁剪参数、输出canvas ... 而且绝对轻量级，压缩后的css和js代码只有30KB。他是基于JQuery的，引入JQuery可能还要再大点。不过现在哪个网站没有在用JQuery呢？<br>兼容IE9+，移动端体验良好，能够响应触摸缩放，拖动。以下是安卓4.4 原生浏览器中的预览图</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006767186" src="https://static.alili.tech/img/remote/1460000006767186" alt="泷泽萝拉" title="泷泽萝拉" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function handler(event){
    ...
    var URL = window.URL || window.webkitURL , originPhotoURL;
    originPhotoURL = URL.createObjectURL(originPhoto);   //Base64
    $('#preview').cropper({
        aspectRatio: 1 / 1,                 // 固定裁剪比例1:1，裁剪后的图片为正方形
    }).cropper('replace', originPhotoURL);  // 动态设置图片预览
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handler</span>(<span class="hljs-params">event</span>)</span>{
    ...
    var URL = <span class="hljs-built_in">window</span>.URL || <span class="hljs-built_in">window</span>.webkitURL , originPhotoURL;
    originPhotoURL = URL.createObjectURL(originPhoto);   <span class="hljs-comment">//Base64</span>
    $(<span class="hljs-string">'#preview'</span>).cropper({
        <span class="hljs-attr">aspectRatio</span>: <span class="hljs-number">1</span> / <span class="hljs-number">1</span>,                 <span class="hljs-comment">// 固定裁剪比例1:1，裁剪后的图片为正方形</span>
    }).cropper(<span class="hljs-string">'replace'</span>, originPhotoURL);  <span class="hljs-comment">// 动态设置图片预览</span>
}</code></pre>
<hr>
<h2 id="articleHeader3">绘制Canvas</h2>
<p>cropper.js 提供了生成Canvas的方法<code>getCroppedCanvas</code>，可以指定生成画布的大小。<br>或者根据<code>getData</code>获取裁剪信息（包括旋转和缩放）用<code>ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)</code>进行手动绘制。后者自由性高一点，但是既然有现成的方法，那么就直接用好了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function cropAndUpload(){
    // 此处注意，生成的Canvas长宽比应与之前规定的裁剪比例一致
    // 否则生成的图片会有失真
    var size = {
        width:100,
        height:100
    }
    var croppedCanvas = $('#preview').cropper(&quot;getCroppedCanvas&quot;,size);  // 生成 canvas 对象
    var croppedCanvasUrl = croppedCanvas.toDataURL(originFileType); // Base64
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cropAndUpload</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// 此处注意，生成的Canvas长宽比应与之前规定的裁剪比例一致</span>
    <span class="hljs-comment">// 否则生成的图片会有失真</span>
    <span class="hljs-keyword">var</span> size = {
        <span class="hljs-attr">width</span>:<span class="hljs-number">100</span>,
        <span class="hljs-attr">height</span>:<span class="hljs-number">100</span>
    }
    <span class="hljs-keyword">var</span> croppedCanvas = $(<span class="hljs-string">'#preview'</span>).cropper(<span class="hljs-string">"getCroppedCanvas"</span>,size);  <span class="hljs-comment">// 生成 canvas 对象</span>
    <span class="hljs-keyword">var</span> croppedCanvasUrl = croppedCanvas.toDataURL(originFileType); <span class="hljs-comment">// Base64</span>
    ...
}</code></pre>
<p>应当注意的是<code>width</code>和<code>height</code>的值并不推荐设置成固定值。裁剪框的大小可能是会超过100<em>100（比如500</em>500）的，而实际生成的图片却是100<em>100，这样的后果就是直接将一个500</em>500的高清图片，压缩成了100<em>100的失真图片。同样的，裁剪框小于100</em>100,生成的图片就会模糊。</p>
<hr>
<h2 id="articleHeader4">Base64 转Blob对象</h2>
<p>字符串转为二进制？（前端本来是个做页面的，现在也开始操作文件了。自从有了HTML5，就可以把浏览器当作一个操作系统了）官方并没有出<code>DataURLtoBlob</code>的方法，所以只能自己写一个，转化也挺简单：拆解文件类型，将字符数据转成16进制数据存数组，并用数据初始化一个Blob对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

function cropAndUpload(){
    ...
    var croppedBlob = dataURLtoBlob(croppedCanvasUrl);
    croppedBlob.name = originFileName; // Blob对象没有name
    // Upload(croppedBlob);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dataURLtoBlob</span>(<span class="hljs-params">dataurl</span>) </span>{
    <span class="hljs-keyword">var</span> arr = dataurl.split(<span class="hljs-string">','</span>), mime = arr[<span class="hljs-number">0</span>].match(<span class="hljs-regexp">/:(.*?);/</span>)[<span class="hljs-number">1</span>],
        bstr = atob(arr[<span class="hljs-number">1</span>]), n = bstr.length, u8arr = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Uint8Array</span>(n);
    <span class="hljs-keyword">while</span>(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Blob([u8arr], {<span class="hljs-attr">type</span>:mime});
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cropAndUpload</span>(<span class="hljs-params"></span>)</span>{
    ...
    var croppedBlob = dataURLtoBlob(croppedCanvasUrl);
    croppedBlob.name = originFileName; <span class="hljs-comment">// Blob对象没有name</span>
    <span class="hljs-comment">// Upload(croppedBlob);</span>
}</code></pre>
<p>现在就可以像处理FileObject一样处理 这个blob对象了。</p>
<p><strong>其实在最新的HTML5标准中是支持</strong><code>HTMLCanvasElement.toBlob(callback, mimeType, quality)</code> <strong>的</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="croppedCanvas.toBlob(function(croppedBlob){
    // Upload(croppedBlob);
},originFileType)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">croppedCanvas.toBlob(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">croppedBlob</span>)</span>{
    <span class="hljs-comment">// Upload(croppedBlob);</span>
},originFileType)</code></pre>
<p>绕了一个弯，不过还是学到了东西。</p>
<blockquote><p>原文作者来自 MaxLeap 团队_UX成员：John王<br>原文链接：<a href="https://blog.maxleap.cn/archives/705" rel="nofollow noreferrer" target="_blank">https://blog.maxleap.cn/archives/705</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
无需Flash实现图片裁剪——HTML5中级进阶

## 原文链接
[https://segmentfault.com/a/1190000005086945](https://segmentfault.com/a/1190000005086945)

