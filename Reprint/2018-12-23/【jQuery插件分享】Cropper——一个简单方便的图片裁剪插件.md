---
title: '【jQuery插件分享】Cropper——一个简单方便的图片裁剪插件' 
date: 2018-12-23 2:30:06
hidden: true
slug: wuidjkoav7
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">插件介绍</h3>
<p>这是一个我在写以前的项目的途中发现的一个国人写的jQuery图像裁剪插件，当时想实现用户资料的头像上传功能，并且能够预览图片，和对图片进行简单的裁剪、旋转，花了不少时间才看到了这个插件，感觉功能挺全面，代码实现起来也挺简单，再加上用的是Bootstrap，对移动端操作也有适配，于是就用了。现在稍微有点时间就记录一下，方便以后再用的时候查阅。另外也有对应的js版本。</p>
<h3 id="articleHeader1">官方文档（英文）</h3>
<ul>
<li>
<p>jQuery</p>
<ul>
<li><a href="https://github.com/fengyuanchen/cropper" rel="nofollow noreferrer" target="_blank">GitHub项目地址</a></li>
<li><a href="https://fengyuanchen.github.io/cropper/" rel="nofollow noreferrer" target="_blank">官方示例</a></li>
</ul>
</li>
<li>
<p>js</p>
<ul><li><a href="https://github.com/fengyuanchen/cropperjs" rel="nofollow noreferrer" target="_blank">GitHub项目地址</a></li></ul>
</li>
</ul>
<h3 id="articleHeader2">兼容性</h3>
<p>兼容所有支持了Canvas的浏览器（IE9+），一小部分功能例外，具体请查看官方文档。</p>
<h3 id="articleHeader3">参数</h3>
<h4>viewMode</h4>
<ul>
<li>Type: <code>Number</code>
</li>
<li>Default: <code>0</code>
</li>
<li>Options: 0,1,2,3</li>
</ul>
<p>这个具体每个值对应的效果我也不是很清楚，推荐在上面的官方示例里都试一试，我都是比较喜欢2。</p>
<h4>dragMode</h4>
<ul>
<li>Type: <code>String</code>
</li>
<li>Default: <code>'crop'</code>
</li>
<li>
<p>Options:</p>
<ul>
<li>
<code>'crop'</code>： 在裁剪框外拖动鼠标会生成一个新的裁剪框。</li>
<li>
<code>'move'</code>： 在裁剪框外拖动鼠标会移动原图。</li>
<li>
<code>'none'</code>： 在裁剪框外拖动鼠标则什么也不做。</li>
</ul>
</li>
</ul>
<h4>aspectRatio</h4>
<ul>
<li>Type: <code>Number</code>
</li>
<li>Default: <code>NaN</code>
</li>
</ul>
<p>这个是裁剪框的纵横比，默认是不限制的。例如1:1的头像就写1,16:9可写成<code>16 / 9</code>。</p>
<h4>data</h4>
<ul>
<li>Type: <code>Object</code>
</li>
<li>Default: <code>null</code>
</li>
</ul>
<p>The previous cropped data if you had stored, will be passed to <code>setData</code> method automatically.</p>
<p>（没怎么用过，都是直接用<code>setData</code>方法）</p>
<h4>preview</h4>
<ul>
<li>Type: <code>String</code> (<strong>jQuery selector</strong>)</li>
<li>Default: <code>''</code>
</li>
</ul>
<p>预览图的位置，用jQuery选择器表示。</p>
<h4>responsive</h4>
<ul>
<li>Type: <code>Boolean</code>
</li>
<li>Default: <code>true</code>
</li>
</ul>
<p>在更改窗口大小后是否重新渲染cropper。</p>
<h4>restore</h4>
<ul>
<li>Type: <code>Boolean</code>
</li>
<li>Default: <code>true</code>
</li>
</ul>
<p>在更改窗口大小后是否恢复裁剪区域。</p>
<h4>checkCrossOrigin</h4>
<ul>
<li>Type: <code>Boolean</code>
</li>
<li>Default: <code>true</code>
</li>
</ul>
<p>检查图像是否是跨域图像。（具体查看官方文档）</p>
<h4>checkOrientation</h4>
<ul>
<li>Type: <code>Boolean</code>
</li>
<li>Default: <code>true</code>
</li>
</ul>
<p>（具体查看官方文档）</p>
<h4>modal</h4>
<ul>
<li>Type: <code>Boolean</code>
</li>
<li>Default: <code>true</code>
</li>
</ul>
<p>非裁剪区域是否用黑罩遮盖。</p>
<h4>guides</h4>
<ul>
<li>Type: <code>Boolean</code>
</li>
<li>Default: <code>true</code>
</li>
</ul>
<p>裁剪区域是否显示虚线。</p>
<h4>center</h4>
<ul>
<li>Type: <code>Boolean</code>
</li>
<li>Default: <code>true</code>
</li>
</ul>
<p>裁剪区域正中央是否显示<strong>+</strong>号。</p>
<h4>highlight</h4>
<ul>
<li>Type: <code>Boolean</code>
</li>
<li>Default: <code>true</code>
</li>
</ul>
<p>裁剪区域是否高亮显示。</p>
<h4>background</h4>
<ul>
<li>Type: <code>Boolean</code>
</li>
<li>Default: <code>true</code>
</li>
</ul>
<p>是否显示背景的黑白方格（类似PS里透明图层的显示方式）。</p>
<h4>autoCrop</h4>
<ul>
<li>Type: <code>Boolean</code>
</li>
<li>Default: <code>true</code>
</li>
</ul>
<p>cropper初始化完成后是否自动显示裁剪框</p>
<h4>autoCropArea</h4>
<ul>
<li>Type: <code>Number</code>
</li>
<li>Default: <code>0.8</code> (80% of the image)</li>
</ul>
<p>自动显示的裁剪框的大小。因此，数字应当在0~1之间。</p>
<h4>movable</h4>
<ul>
<li>Type: <code>Boolean</code>
</li>
<li>Default: <code>true</code>
</li>
</ul>
<p>是否允许移动原图。（如果这里填<code>false</code>那么尽管<strong>dragMode</strong>的值是<code>move</code>，在裁剪框外拖动也不会移动原图）</p>
<h4>rotatable</h4>
<ul>
<li>Type: <code>Boolean</code>
</li>
<li>Default: <code>true</code>
</li>
</ul>
<p>是否可以旋转原图。</p>
<h4>scalable</h4>
<ul>
<li>Type: <code>Boolean</code>
</li>
<li>Default: <code>true</code>
</li>
</ul>
<p>是否可以对原图进行纵横拉伸。</p>
<p>例如把原图宽度拉长为原来的2倍或者拉长为原来的-1倍（即水平翻转）。</p>
<h4>zoomable</h4>
<ul>
<li>Type: <code>Boolean</code>
</li>
<li>Default: <code>true</code>
</li>
</ul>
<p>是否可以对原图进行缩小放大。</p>
<h4>zoomOnTouch</h4>
<ul>
<li>Type: <code>Boolean</code>
</li>
<li>Default: <code>true</code>
</li>
</ul>
<p>是否允许在移动端上使用双指触摸缩放原图。</p>
<h4>zoomOnWheel</h4>
<ul>
<li>Type: <code>Boolean</code>
</li>
<li>Default: <code>true</code>
</li>
</ul>
<p>是否允许使用鼠标滚轮缩放原图。</p>
<h4>wheelZoomRatio</h4>
<ul>
<li>Type: <code>Number</code>
</li>
<li>Default: <code>0.1</code>
</li>
</ul>
<p>当使用鼠标滚轮缩放时的比例。</p>
<h4>cropBoxMovable</h4>
<ul>
<li>Type: <code>Boolean</code>
</li>
<li>Default: <code>true</code>
</li>
</ul>
<p>是否允许移动裁剪框。</p>
<h4>cropBoxResizable</h4>
<ul>
<li>Type: <code>Boolean</code>
</li>
<li>Default: <code>true</code>
</li>
</ul>
<p>是否允许通过拖动裁剪框的边框来调整裁剪框的大小。</p>
<h4>toggleDragModeOnDblclick</h4>
<ul>
<li>Type: <code>Boolean</code>
</li>
<li>Default: <code>true</code>
</li>
</ul>
<p>是否允许通过双击来在<code>crop</code>和<code>move</code>之间切换<strong>dragMode</strong>。</p>
<h4>minContainerWidth</h4>
<ul>
<li>Type: <code>Number</code>
</li>
<li>Default: <code>200</code>
</li>
</ul>
<p>容器宽度最小值。</p>
<h4>minContainerHeight</h4>
<ul>
<li>Type: <code>Number</code>
</li>
<li>Default: <code>100</code>
</li>
</ul>
<p>容器高度最小值。</p>
<h4>minCanvasWidth</h4>
<ul>
<li>Type: <code>Number</code>
</li>
<li>Default: <code>0</code>
</li>
</ul>
<p>canvas（原图）宽度最小值。</p>
<h4>minCanvasHeight</h4>
<ul>
<li>Type: <code>Number</code>
</li>
<li>Default: <code>0</code>
</li>
</ul>
<p>canvas（原图）高度最小值。</p>
<h4>minCropBoxWidth</h4>
<ul>
<li>Type: <code>Number</code>
</li>
<li>Default: <code>0</code>
</li>
</ul>
<p>剪切框宽度最小值。</p>
<p><strong>Note:</strong> This size is relative to the page, not the image.</p>
<h4>minCropBoxHeight</h4>
<ul>
<li>Type: <code>Number</code>
</li>
<li>Default: <code>0</code>
</li>
</ul>
<p>剪切框高度最小值。</p>
<p><strong>Note:</strong> This size is relative to the page, not the image.</p>
<h4>ready</h4>
<ul>
<li>Type: <code>Function</code>
</li>
<li>Default: <code>null</code>
</li>
</ul>
<p>A shortcut of the "ready" event.</p>
<h4>cropstart</h4>
<ul>
<li>Type: <code>Function</code>
</li>
<li>Default: <code>null</code>
</li>
</ul>
<p>A shortcut of the "cropstart" event.</p>
<h4>cropmove</h4>
<ul>
<li>Type: <code>Function</code>
</li>
<li>Default: <code>null</code>
</li>
</ul>
<p>A shortcut of the "cropmove" event.</p>
<h4>cropend</h4>
<ul>
<li>Type: <code>Function</code>
</li>
<li>Default: <code>null</code>
</li>
</ul>
<p>A shortcut of the "cropend" event.</p>
<h4>crop</h4>
<ul>
<li>Type: <code>Function</code>
</li>
<li>Default: <code>null</code>
</li>
</ul>
<p>A shortcut of the "crop" event.</p>
<h4>zoom</h4>
<ul>
<li>Type: <code>Function</code>
</li>
<li>Default: <code>null</code>
</li>
</ul>
<p>A shortcut of the "zoom" event.</p>
<h3 id="articleHeader4">常用方法</h3>
<p>除了"setAspectRatio","replace"和"destroy"以外，所有的方法都要在ready后才能使用。这里只介绍几个常用的方法，全部的方法请到官方文档查阅。</p>
<p>方法的使用格式为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$().cropper('method',arg0,arg1,arg2,...);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$().cropper(<span class="hljs-string">'method'</span>,arg0,arg1,arg2,...);</code></pre>
<h4>crop()</h4>
<p>手动显示裁剪框。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$().cropper({
  autoCrop: false,
  ready: function () {
    // Do something here
    // ...

    // And then
    $(this).cropper('crop');
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$().cropper({
  <span class="hljs-attr">autoCrop</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">ready</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// Do something here</span>
    <span class="hljs-comment">// ...</span>

    <span class="hljs-comment">// And then</span>
    $(<span class="hljs-keyword">this</span>).cropper(<span class="hljs-string">'crop'</span>);
  }
});</code></pre>
<h4>reset()</h4>
<p>恢复全部到初始状态。</p>
<h4>replace(url[, onlyColorChanged])</h4>
<ul>
<li>
<p><strong>url</strong>:</p>
<ul>
<li>Type: <code>String</code>
</li>
<li>A new image url.</li>
</ul>
</li>
<li>
<p><strong>onlyColorChanged</strong> (optional):</p>
<ul>
<li>Type: <code>Boolean</code>
</li>
<li>If only change the color, not the size, then the cropper only need to change the srcs of all related images, not need to rebuild the cropper. This can be used for applying filters.</li>
<li>If not present, its default value is <code>false</code>.</li>
</ul>
</li>
</ul>
<p>替换cropper中的图像文件，通常第二个参数不管。</p>
<h4>destroy()</h4>
<p>销毁cropper，并且会移除img标签的src属性的值。</p>
<h4>getCroppedCanvas([options])</h4>
<ul>
<li>
<p><strong>options</strong> (optional):</p>
<ul>
<li>Type: <code>Object</code>
</li>
<li>
<p>Properties:</p>
<ul>
<li>
<code>width</code>: the destination width of the output canvas.</li>
<li>
<code>height</code>: the destination height of the output canvas.</li>
<li>
<code>minWidth</code>: the minimum destination width of the output canvas, the default value is <code>0</code>.</li>
<li>
<code>minHeight</code>: the minimum destination height of the output canvas, the default value is <code>0</code>.</li>
<li>
<code>maxWidth</code>: the maximum destination width of the output canvas, the default value is <code>Infinity</code>.</li>
<li>
<code>maxHeight</code>: the maximum destination height of the output canvas, the default value is <code>Infinity</code>.</li>
<li>
<code>fillColor</code>: a color to fill any alpha values in the output canvas, the default value is <code>transparent</code>.</li>
<li>
<a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled" rel="nofollow noreferrer" target="_blank"><code>imageSmoothingEnabled</code></a>: set to change if images are smoothed (<code>true</code>, default) or not (<code>false</code>).</li>
<li>
<a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingQuality" rel="nofollow noreferrer" target="_blank"><code>imageSmoothingQuality</code></a>: set the quality of image smoothing, one of "low" (default), "medium", or "high".</li>
</ul>
</li>
</ul>
</li>
<li>
<p>(return  value):</p>
<ul>
<li>Type: <code>HTMLCanvasElement</code>
</li>
<li>A canvas drawn the cropped image.</li>
</ul>
</li>
<li>
<p>Notes:</p>
<ul>
<li>输出的canvas的纵横比会自动适应于裁剪框的纵横比.</li>
<li>如果打算得到JPEG图像，那么应该先设置<code>fillColor</code>参数，否则裁剪后的透明部分默认会由黑色填充。</li>
</ul>
</li>
<li>
<p>Browser support:</p>
<ul>
<li>Basic image: requires <a href="http://caniuse.com/canvas" rel="nofollow noreferrer" target="_blank">Canvas</a> support (IE 9+).</li>
<li>Rotated image: requires <a href="http://caniuse.com/transforms2d" rel="nofollow noreferrer" target="_blank">CSS3 2D Transforms</a> support (IE 9+).</li>
<li>Cross-origin image: requires HTML5 <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes" rel="nofollow noreferrer" target="_blank">CORS settings attributes</a> support (IE 11+).</li>
</ul>
</li>
</ul>
<p>得到裁剪到的图像的canvas，如果没有裁剪，那么就返回的是整个原图图像的canvas。</p>
<p>这是最重要的一个方法，通过这个方法就可以得到裁剪后的图像，再使用<code>toDataURL()</code>得到base64 dataURL（不指定格式的话会是png格式）或者<code>toBlob()</code>得到Blob,然后就可以很轻松地将图片上传至服务器上或者显示在某个img标签中了。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 转换为png格式的dataURL
var dataURL = $().cropper('getCroppedCanvas', {
    width:100,
    height:100
}).toDataURL('image/png');

// 转换为Blob后显示在img标签中
var URL = window.URL || window.webkitURL;
$().cropper('getCroppedCanvas', {
    width:100,
    height:100
}).toBlob(function (blob) {
    $().attr('src',URL.createObjectURL(blob));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 转换为png格式的dataURL</span>
<span class="hljs-keyword">var</span> dataURL = $().cropper(<span class="hljs-string">'getCroppedCanvas'</span>, {
    <span class="hljs-attr">width</span>:<span class="hljs-number">100</span>,
    <span class="hljs-attr">height</span>:<span class="hljs-number">100</span>
}).toDataURL(<span class="hljs-string">'image/png'</span>);

<span class="hljs-comment">// 转换为Blob后显示在img标签中</span>
<span class="hljs-keyword">var</span> URL = <span class="hljs-built_in">window</span>.URL || <span class="hljs-built_in">window</span>.webkitURL;
$().cropper(<span class="hljs-string">'getCroppedCanvas'</span>, {
    <span class="hljs-attr">width</span>:<span class="hljs-number">100</span>,
    <span class="hljs-attr">height</span>:<span class="hljs-number">100</span>
}).toBlob(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">blob</span>) </span>{
    $().attr(<span class="hljs-string">'src'</span>,URL.createObjectURL(blob));
});</code></pre>
<h3 id="articleHeader5">简单实例</h3>
<h4>在页面直接使用cropper</h4>
<p>接下来只是实现一个简单的功能：网页中可以上传图片，然后对图片进行裁剪，点击确定后会显示出裁剪后的图片。</p>
<p>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;zh-cn&quot;>
<head>
<meta charset=&quot;UTF-8&quot;>
<title>裁剪图片</title>
<link href=&quot;https://cdn.bootcss.com/cropper/3.1.3/cropper.min.css&quot; rel=&quot;stylesheet&quot;>
<link href=&quot;https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css&quot; rel=&quot;stylesheet&quot;>
<style>
        .row{
            margin-bottom: 5px;
        }
        #photo {
            max-width: 100%;
        }
        .img-preview {
            width: 100px;
            height: 100px;
            overflow: hidden;
        }
        button {
            margin-top:10px;
        }
        #result {
            width: 150px;
            height: 150px;
        }
</style>
</head>
<body>
<div class=&quot;container&quot;>
    <div class=&quot;row&quot;>
        <div class=&quot;col-sm-12 text-center&quot;>
            <label for=&quot;input&quot; class=&quot;btn btn-danger&quot; id=&quot;&quot;>
            <span>选择图片</span>
            <input type=&quot;file&quot; id=&quot;input&quot; class=&quot;sr-only&quot;>
            </label>
        </div>
    </div>
    <div class=&quot;row&quot;>
        <div class=&quot;col-sm-6 col-sm-offset-2&quot;>
            <img src=&quot;&quot; id=&quot;photo&quot;>
        </div>
        <div class=&quot;col-sm-2&quot;>
            <div>
                <p>
                    预览(100*100)：
                </p>
                <div class=&quot;img-preview&quot;>
                </div>
            </div>
            <button class=&quot;btn btn-primary&quot; onclick=&quot;crop()&quot;>裁剪图片</button>
            <div>
                <br/>
                <p>
                    结果：
                </p>
                <img src=&quot;&quot; alt=&quot;裁剪结果&quot; id=&quot;result&quot;>
            </div>
        </div>
    </div>
</div>
<!-- Scripts -->
<script src=&quot;https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js&quot;></script>
<script src=&quot;https://cdn.bootcss.com/cropper/3.1.3/cropper.min.js&quot;></script>
<script src=&quot;https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js&quot;></script>
<script>
        // 修改自官方demo的js
        var initCropper = function (img, input){
            var $image = img;
            var options = {
                aspectRatio: 1, // 纵横比
                viewMode: 2,
                preview: '.img-preview' // 预览图的class名
            };
            $image.cropper(options);
            var $inputImage = input;
            var uploadedImageURL;
            if (URL) {
                // 给input添加监听
                $inputImage.change(function () {
                    var files = this.files;
                    var file;
                    if (!$image.data('cropper')) {
                        return;
                    }
                    if (files &amp;&amp; files.length) {
                        file = files[0];
                        // 判断是否是图像文件
                        if (/^image\/\w+$/.test(file.type)) {
                            // 如果URL已存在就先释放
                            if (uploadedImageURL) {
                                URL.revokeObjectURL(uploadedImageURL);
                            }
                            uploadedImageURL = URL.createObjectURL(file);
                            // 销毁cropper后更改src属性再重新创建cropper
                            $image.cropper('destroy').attr('src', uploadedImageURL).cropper(options);
                            $inputImage.val('');
                        } else {
                          window.alert('请选择一个图像文件！');
                      }
                  }
              });
            } else {
                $inputImage.prop('disabled', true).addClass('disabled');
            }
        }
        var crop = function(){
            var $image = $('#photo');
            var $target = $('#result');
            $image.cropper('getCroppedCanvas',{
                width:300, // 裁剪后的长宽
                height:300
            }).toBlob(function(blob){
                // 裁剪后将图片放到指定标签
                $target.attr('src', URL.createObjectURL(blob));
            });
        }
        $(function(){
            initCropper($('#photo'),$('#input'));
        });
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"zh-cn"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>裁剪图片<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://cdn.bootcss.com/cropper/3.1.3/cropper.min.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.row</span>{
            <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">5px</span>;
        }
        <span class="hljs-selector-id">#photo</span> {
            <span class="hljs-attribute">max-width</span>: <span class="hljs-number">100%</span>;
        }
        <span class="hljs-selector-class">.img-preview</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">overflow</span>: hidden;
        }
        <span class="hljs-selector-tag">button</span> {
            <span class="hljs-attribute">margin-top</span>:<span class="hljs-number">10px</span>;
        }
        <span class="hljs-selector-id">#result</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">150px</span>;
        }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"row"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-sm-12 text-center"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"input"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-danger"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">""</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>选择图片<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"input"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sr-only"</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"row"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-sm-6 col-sm-offset-2"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"photo"</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-sm-2"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
                    预览(100*100)：
                <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img-preview"</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-primary"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"crop()"</span>&gt;</span>裁剪图片<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
                    结果：
                <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"裁剪结果"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"result"</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!-- Scripts --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/cropper/3.1.3/cropper.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-comment">// 修改自官方demo的js</span>
        <span class="hljs-keyword">var</span> initCropper = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">img, input</span>)</span>{
            <span class="hljs-keyword">var</span> $image = img;
            <span class="hljs-keyword">var</span> options = {
                <span class="hljs-attr">aspectRatio</span>: <span class="hljs-number">1</span>, <span class="hljs-comment">// 纵横比</span>
                viewMode: <span class="hljs-number">2</span>,
                <span class="hljs-attr">preview</span>: <span class="hljs-string">'.img-preview'</span> <span class="hljs-comment">// 预览图的class名</span>
            };
            $image.cropper(options);
            <span class="hljs-keyword">var</span> $inputImage = input;
            <span class="hljs-keyword">var</span> uploadedImageURL;
            <span class="hljs-keyword">if</span> (URL) {
                <span class="hljs-comment">// 给input添加监听</span>
                $inputImage.change(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    <span class="hljs-keyword">var</span> files = <span class="hljs-keyword">this</span>.files;
                    <span class="hljs-keyword">var</span> file;
                    <span class="hljs-keyword">if</span> (!$image.data(<span class="hljs-string">'cropper'</span>)) {
                        <span class="hljs-keyword">return</span>;
                    }
                    <span class="hljs-keyword">if</span> (files &amp;&amp; files.length) {
                        file = files[<span class="hljs-number">0</span>];
                        <span class="hljs-comment">// 判断是否是图像文件</span>
                        <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/^image\/\w+$/</span>.test(file.type)) {
                            <span class="hljs-comment">// 如果URL已存在就先释放</span>
                            <span class="hljs-keyword">if</span> (uploadedImageURL) {
                                URL.revokeObjectURL(uploadedImageURL);
                            }
                            uploadedImageURL = URL.createObjectURL(file);
                            <span class="hljs-comment">// 销毁cropper后更改src属性再重新创建cropper</span>
                            $image.cropper(<span class="hljs-string">'destroy'</span>).attr(<span class="hljs-string">'src'</span>, uploadedImageURL).cropper(options);
                            $inputImage.val(<span class="hljs-string">''</span>);
                        } <span class="hljs-keyword">else</span> {
                          <span class="hljs-built_in">window</span>.alert(<span class="hljs-string">'请选择一个图像文件！'</span>);
                      }
                  }
              });
            } <span class="hljs-keyword">else</span> {
                $inputImage.prop(<span class="hljs-string">'disabled'</span>, <span class="hljs-literal">true</span>).addClass(<span class="hljs-string">'disabled'</span>);
            }
        }
        <span class="hljs-keyword">var</span> crop = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">var</span> $image = $(<span class="hljs-string">'#photo'</span>);
            <span class="hljs-keyword">var</span> $target = $(<span class="hljs-string">'#result'</span>);
            $image.cropper(<span class="hljs-string">'getCroppedCanvas'</span>,{
                <span class="hljs-attr">width</span>:<span class="hljs-number">300</span>, <span class="hljs-comment">// 裁剪后的长宽</span>
                height:<span class="hljs-number">300</span>
            }).toBlob(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">blob</span>)</span>{
                <span class="hljs-comment">// 裁剪后将图片放到指定标签</span>
                $target.attr(<span class="hljs-string">'src'</span>, URL.createObjectURL(blob));
            });
        }
        $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            initCropper($(<span class="hljs-string">'#photo'</span>),$(<span class="hljs-string">'#input'</span>));
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012344975?w=872&amp;h=484" src="https://static.alili.tech/img/remote/1460000012344975?w=872&amp;h=484" alt="剪切图片" title="剪切图片" style="cursor: pointer;"></span></p>
<h4>在bootstrap模态框中使用cropper</h4>
<p>虽然在模态框中可以像上面一样使用cropper，甚至我以前写的项目也是跟上面一样，但是这次整理的时候突然发现了一个bug：当隐藏模态框后调整浏览器大小（甚至按f12），再打开模态框后cropper的容器会改变，导致难以使用。于是，我在GitHub中翻找了issue，在官方的example中找到了对应的解决方法。但其实这个解决方法也是一种暴力解法，即模态框隐藏后销毁cropper，打开后重新创建cropper，可能会有别的方法，因为不确定会不会有别的bug，所以暂时还是用官方的方法比较好。</p>
<p>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;zh-cn&quot;>
<head>
<meta charset=&quot;UTF-8&quot;>
<title>上传头像</title>
<link href=&quot;https://cdn.bootcss.com/cropper/3.1.3/cropper.min.css&quot; rel=&quot;stylesheet&quot;>
<link href=&quot;https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css&quot; rel=&quot;stylesheet&quot;>
<style type=&quot;text/css&quot;>
    body{
        text-align: center;
    }
    #user-photo {
        width:300px;
        height:300px;
        margin-top: 10px;
    }
    #photo {
        max-width:100%;
        max-height:350px;
    }
    .img-preview-box {
        text-align: center;
    }
    .img-preview-box > div {
        display: inline-block;;
        margin-right: 10px;
    }
    .img-preview {
        overflow: hidden;
    }
    .img-preview-box .img-preview-lg {
        width: 150px;
        height: 150px;
    }
    .img-preview-box .img-preview-md {
        width: 100px;
        height: 100px;
    }
    .img-preview-box .img-preview-sm {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
</style>
</head>
<body>
<button class=&quot;btn btn-primary&quot; data-target=&quot;#changeModal&quot; data-toggle=&quot;modal&quot;>打开</button><br/>
<div class=&quot;user-photo-box&quot;>
    <img id=&quot;user-photo&quot; src=&quot;&quot;>
</div>
</div>
<div class=&quot;modal fade&quot; id=&quot;changeModal&quot; tabindex=&quot;-1&quot; role=&quot;dialog&quot; aria-hidden=&quot;true&quot;>
<div class=&quot;modal-dialog&quot;>
    <div class=&quot;modal-content&quot;>
        <div class=&quot;modal-header&quot;>
            <button type=&quot;button&quot; class=&quot;close&quot; data-dismiss=&quot;modal&quot; aria-hidden=&quot;true&quot;>×</button>
            <h4 class=&quot;modal-title text-primary&quot;>
            <i class=&quot;fa fa-pencil&quot;></i>
                        更换头像
            </h4>
        </div>
        <div class=&quot;modal-body&quot;>
            <p class=&quot;tip-info text-center&quot;>
                未选择图片
            </p>
            <div class=&quot;img-container hidden&quot;>
                <img src=&quot;&quot; alt=&quot;&quot; id=&quot;photo&quot;>
            </div>
            <div class=&quot;img-preview-box hidden&quot;>
                <hr>
                <span>150*150:</span>
                <div class=&quot;img-preview img-preview-lg&quot;>
                </div>
                <span>100*100:</span>
                <div class=&quot;img-preview img-preview-md&quot;>
                </div>
                <span>30*30:</span>
                <div class=&quot;img-preview img-preview-sm&quot;>
                </div>
            </div>
        </div>
        <div class=&quot;modal-footer&quot;>
            <label class=&quot;btn btn-danger pull-left&quot; for=&quot;photoInput&quot;>
            <input type=&quot;file&quot; class=&quot;sr-only&quot; id=&quot;photoInput&quot; accept=&quot;image/*&quot;>
            <span>打开图片</span>
            </label>
            <button class=&quot;btn btn-primary disabled&quot; disabled=&quot;true&quot; onclick=&quot;sendPhoto();&quot;>提交</button>
            <button class=&quot;btn btn-close&quot; aria-hidden=&quot;true&quot; data-dismiss=&quot;modal&quot;>取消</button>
        </div>
    </div>
</div>
</div>
<script src=&quot;https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js&quot;></script>
<script src=&quot;https://cdn.bootcss.com/cropper/3.1.3/cropper.min.js&quot;></script>
<script src=&quot;https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js&quot;></script>
<script type=&quot;text/javascript&quot;>
    var initCropperInModal = function(img, input, modal){
        var $image = img;
        var $inputImage = input;
        var $modal = modal;
        var options = {
            aspectRatio: 1, // 纵横比
            viewMode: 2,
            preview: '.img-preview' // 预览图的class名
        };
        // 模态框隐藏后需要保存的数据对象
        var saveData = {};
        var URL = window.URL || window.webkitURL;
        var blobURL;
        $modal.on('show.bs.modal',function () {
            // 如果打开模态框时没有选择文件就点击“打开图片”按钮
            if(!$inputImage.val()){
                $inputImage.click();
            }
        }).on('shown.bs.modal', function () {
            // 重新创建
            $image.cropper( $.extend(options, {
                ready: function () {
                    // 当剪切界面就绪后，恢复数据
                    if(saveData.canvasData){
                        $image.cropper('setCanvasData', saveData.canvasData);
                        $image.cropper('setCropBoxData', saveData.cropBoxData);
                    }
                }
            }));
        }).on('hidden.bs.modal', function () {
            // 保存相关数据
            saveData.cropBoxData = $image.cropper('getCropBoxData');
            saveData.canvasData = $image.cropper('getCanvasData');
            // 销毁并将图片保存在img标签
            $image.cropper('destroy').attr('src',blobURL);
        });
        if (URL) {
            $inputImage.change(function() {
                var files = this.files;
                var file;
                if (!$image.data('cropper')) {
                    return;
                }
                if (files &amp;&amp; files.length) {
                    file = files[0];
                    if (/^image\/\w+$/.test(file.type)) {
    
                        if(blobURL) {
                            URL.revokeObjectURL(blobURL);
                        }
                        blobURL = URL.createObjectURL(file);
    
                        // 重置cropper，将图像替换
                        $image.cropper('reset').cropper('replace', blobURL);
    
                        // 选择文件后，显示和隐藏相关内容
                        $('.img-container').removeClass('hidden');
                        $('.img-preview-box').removeClass('hidden');
                        $('#changeModal .disabled').removeAttr('disabled').removeClass('disabled');
                        $('#changeModal .tip-info').addClass('hidden');
    
                    } else {
                        window.alert('请选择一个图像文件！');
                    }
                }
            });
        } else {
            $inputImage.prop('disabled', true).addClass('disabled');
        }
    }

    var sendPhoto = function(){
        $('#photo').cropper('getCroppedCanvas',{
            width:300,
            height:300
        }).toBlob(function(blob){
            // 转化为blob后更改src属性，隐藏模态框
            $('#user-photo').attr('src',URL.createObjectURL(blob));
            $('#changeModal').modal('hide');
        });
    }

    $(function(){
        initCropperInModal($('#photo'),$('#photoInput'),$('#changeModal'));
    });
</script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"zh-cn"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>上传头像<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://cdn.bootcss.com/cropper/3.1.3/cropper.min.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="undefined">
    body{
        text-align: center;
    }
    #user-photo {
        width:300px;
        height:300px;
        margin-top: 10px;
    }
    #photo {
        max-width:100%;
        max-height:350px;
    }
    .img-preview-box {
        text-align: center;
    }
    .img-preview-box &gt; div {
        display: inline-block;;
        margin-right: 10px;
    }
    .img-preview {
        overflow: hidden;
    }
    .img-preview-box .img-preview-lg {
        width: 150px;
        height: 150px;
    }
    .img-preview-box .img-preview-md {
        width: 100px;
        height: 100px;
    }
    .img-preview-box .img-preview-sm {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-primary"</span> <span class="hljs-attr">data-target</span>=<span class="hljs-string">"#changeModal"</span> <span class="hljs-attr">data-toggle</span>=<span class="hljs-string">"modal"</span>&gt;</span>打开<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"user-photo-box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"user-photo"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal fade"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"changeModal"</span> <span class="hljs-attr">tabindex</span>=<span class="hljs-string">"-1"</span> <span class="hljs-attr">role</span>=<span class="hljs-string">"dialog"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal-dialog"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal-content"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal-header"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"close"</span> <span class="hljs-attr">data-dismiss</span>=<span class="hljs-string">"modal"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span>×<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h4</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal-title text-primary"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-pencil"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
                        更换头像
            <span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal-body"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tip-info text-center"</span>&gt;</span>
                未选择图片
            <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img-container hidden"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"photo"</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img-preview-box hidden"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">hr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>150*150:<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img-preview img-preview-lg"</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>100*100:<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img-preview img-preview-md"</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>30*30:<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img-preview img-preview-sm"</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal-footer"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-danger pull-left"</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"photoInput"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sr-only"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"photoInput"</span> <span class="hljs-attr">accept</span>=<span class="hljs-string">"image/*"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>打开图片<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-primary disabled"</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">"true"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"sendPhoto();"</span>&gt;</span>提交<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-close"</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span> <span class="hljs-attr">data-dismiss</span>=<span class="hljs-string">"modal"</span>&gt;</span>取消<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/cropper/3.1.3/cropper.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> initCropperInModal = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">img, input, modal</span>)</span>{
        <span class="hljs-keyword">var</span> $image = img;
        <span class="hljs-keyword">var</span> $inputImage = input;
        <span class="hljs-keyword">var</span> $modal = modal;
        <span class="hljs-keyword">var</span> options = {
            <span class="hljs-attr">aspectRatio</span>: <span class="hljs-number">1</span>, <span class="hljs-comment">// 纵横比</span>
            viewMode: <span class="hljs-number">2</span>,
            <span class="hljs-attr">preview</span>: <span class="hljs-string">'.img-preview'</span> <span class="hljs-comment">// 预览图的class名</span>
        };
        <span class="hljs-comment">// 模态框隐藏后需要保存的数据对象</span>
        <span class="hljs-keyword">var</span> saveData = {};
        <span class="hljs-keyword">var</span> URL = <span class="hljs-built_in">window</span>.URL || <span class="hljs-built_in">window</span>.webkitURL;
        <span class="hljs-keyword">var</span> blobURL;
        $modal.on(<span class="hljs-string">'show.bs.modal'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 如果打开模态框时没有选择文件就点击“打开图片”按钮</span>
            <span class="hljs-keyword">if</span>(!$inputImage.val()){
                $inputImage.click();
            }
        }).on(<span class="hljs-string">'shown.bs.modal'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 重新创建</span>
            $image.cropper( $.extend(options, {
                <span class="hljs-attr">ready</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    <span class="hljs-comment">// 当剪切界面就绪后，恢复数据</span>
                    <span class="hljs-keyword">if</span>(saveData.canvasData){
                        $image.cropper(<span class="hljs-string">'setCanvasData'</span>, saveData.canvasData);
                        $image.cropper(<span class="hljs-string">'setCropBoxData'</span>, saveData.cropBoxData);
                    }
                }
            }));
        }).on(<span class="hljs-string">'hidden.bs.modal'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 保存相关数据</span>
            saveData.cropBoxData = $image.cropper(<span class="hljs-string">'getCropBoxData'</span>);
            saveData.canvasData = $image.cropper(<span class="hljs-string">'getCanvasData'</span>);
            <span class="hljs-comment">// 销毁并将图片保存在img标签</span>
            $image.cropper(<span class="hljs-string">'destroy'</span>).attr(<span class="hljs-string">'src'</span>,blobURL);
        });
        <span class="hljs-keyword">if</span> (URL) {
            $inputImage.change(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">var</span> files = <span class="hljs-keyword">this</span>.files;
                <span class="hljs-keyword">var</span> file;
                <span class="hljs-keyword">if</span> (!$image.data(<span class="hljs-string">'cropper'</span>)) {
                    <span class="hljs-keyword">return</span>;
                }
                <span class="hljs-keyword">if</span> (files &amp;&amp; files.length) {
                    file = files[<span class="hljs-number">0</span>];
                    <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/^image\/\w+$/</span>.test(file.type)) {
    
                        <span class="hljs-keyword">if</span>(blobURL) {
                            URL.revokeObjectURL(blobURL);
                        }
                        blobURL = URL.createObjectURL(file);
    
                        <span class="hljs-comment">// 重置cropper，将图像替换</span>
                        $image.cropper(<span class="hljs-string">'reset'</span>).cropper(<span class="hljs-string">'replace'</span>, blobURL);
    
                        <span class="hljs-comment">// 选择文件后，显示和隐藏相关内容</span>
                        $(<span class="hljs-string">'.img-container'</span>).removeClass(<span class="hljs-string">'hidden'</span>);
                        $(<span class="hljs-string">'.img-preview-box'</span>).removeClass(<span class="hljs-string">'hidden'</span>);
                        $(<span class="hljs-string">'#changeModal .disabled'</span>).removeAttr(<span class="hljs-string">'disabled'</span>).removeClass(<span class="hljs-string">'disabled'</span>);
                        $(<span class="hljs-string">'#changeModal .tip-info'</span>).addClass(<span class="hljs-string">'hidden'</span>);
    
                    } <span class="hljs-keyword">else</span> {
                        <span class="hljs-built_in">window</span>.alert(<span class="hljs-string">'请选择一个图像文件！'</span>);
                    }
                }
            });
        } <span class="hljs-keyword">else</span> {
            $inputImage.prop(<span class="hljs-string">'disabled'</span>, <span class="hljs-literal">true</span>).addClass(<span class="hljs-string">'disabled'</span>);
        }
    }

    <span class="hljs-keyword">var</span> sendPhoto = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        $(<span class="hljs-string">'#photo'</span>).cropper(<span class="hljs-string">'getCroppedCanvas'</span>,{
            <span class="hljs-attr">width</span>:<span class="hljs-number">300</span>,
            <span class="hljs-attr">height</span>:<span class="hljs-number">300</span>
        }).toBlob(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">blob</span>)</span>{
            <span class="hljs-comment">// 转化为blob后更改src属性，隐藏模态框</span>
            $(<span class="hljs-string">'#user-photo'</span>).attr(<span class="hljs-string">'src'</span>,URL.createObjectURL(blob));
            $(<span class="hljs-string">'#changeModal'</span>).modal(<span class="hljs-string">'hide'</span>);
        });
    }

    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        initCropperInModal($(<span class="hljs-string">'#photo'</span>),$(<span class="hljs-string">'#photoInput'</span>),$(<span class="hljs-string">'#changeModal'</span>));
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012344976?w=835&amp;h=398" src="https://static.alili.tech/img/remote/1460000012344976?w=835&amp;h=398" alt="打开模态框" title="打开模态框" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012344977?w=622&amp;h=633" src="https://static.alili.tech/img/remote/1460000012344977?w=622&amp;h=633" alt="打开图片" title="打开图片" style="cursor: pointer; display: inline;"></span></p>
<h4>使用cropper来上传图片到服务器</h4>
<p>由于cropper可以得到两种裁剪后图片的数据（即blob和dataURL），所以对应的上传到后台也会有两种方法，在这里我只写一种使用ajax上传base64 dataURL的，另一种方法如果有兴趣，可以自己尝试。</p>
<p>页面中，将上面的sendPhoto方法改为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sendPhoto = function () {
    // 得到PNG格式的dataURL
    var photo = $('#photo').cropper('getCroppedCanvas', {
        width: 300,
        height: 300
    }).toDataURL('image/png');

    $.ajax({
        url: '上传地址', // 要上传的地址
        type: 'post',
        data: {
            'imgData': photo
        },
        dataType: 'json',
        success: function (data) {
            if (data.status == 0) {
                // 将上传的头像的地址填入，为保证不载入缓存加个随机数
                $('.user-photo').attr('src', '头像地址?t=' + Math.random());
                $('#changeModal').modal('hide');
            } else {
                alert(data.info);
            }
        }
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> sendPhoto = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 得到PNG格式的dataURL</span>
    <span class="hljs-keyword">var</span> photo = $(<span class="hljs-string">'#photo'</span>).cropper(<span class="hljs-string">'getCroppedCanvas'</span>, {
        <span class="hljs-attr">width</span>: <span class="hljs-number">300</span>,
        <span class="hljs-attr">height</span>: <span class="hljs-number">300</span>
    }).toDataURL(<span class="hljs-string">'image/png'</span>);

    $.ajax({
        <span class="hljs-attr">url</span>: <span class="hljs-string">'上传地址'</span>, <span class="hljs-comment">// 要上传的地址</span>
        type: <span class="hljs-string">'post'</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-string">'imgData'</span>: photo
        },
        <span class="hljs-attr">dataType</span>: <span class="hljs-string">'json'</span>,
        <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
            <span class="hljs-keyword">if</span> (data.status == <span class="hljs-number">0</span>) {
                <span class="hljs-comment">// 将上传的头像的地址填入，为保证不载入缓存加个随机数</span>
                $(<span class="hljs-string">'.user-photo'</span>).attr(<span class="hljs-string">'src'</span>, <span class="hljs-string">'头像地址?t='</span> + <span class="hljs-built_in">Math</span>.random());
                $(<span class="hljs-string">'#changeModal'</span>).modal(<span class="hljs-string">'hide'</span>);
            } <span class="hljs-keyword">else</span> {
                alert(data.info);
            }
        }
    });
}</code></pre>
<p>后台中，Java的主要代码如下：（使用了jdk8的Base64,，如果是低版本请自行替换）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    /**
     * 将Base64位编码的图片进行解码，并保存到指定目录
     */
    public static void decodeBase64DataURLToImage(String dataURL, String path, String imgName) throws IOException {
        // 将dataURL开头的非base64字符删除
        String base64 = dataURL.substring(dataURL.indexOf(&quot;,&quot;) + 1);
        FileOutputStream write = new FileOutputStream(new File(path + imgName));
        byte[] decoderBytes = Base64.getDecoder().decode(base64);
        write.write(decoderBytes);
        write.close();
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java">    <span class="hljs-comment">/**
     * 将Base64位编码的图片进行解码，并保存到指定目录
     */</span>
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title">decodeBase64DataURLToImage</span><span class="hljs-params">(String dataURL, String path, String imgName)</span> <span class="hljs-keyword">throws</span> IOException </span>{
        <span class="hljs-comment">// 将dataURL开头的非base64字符删除</span>
        String base64 = dataURL.substring(dataURL.indexOf(<span class="hljs-string">","</span>) + <span class="hljs-number">1</span>);
        FileOutputStream write = <span class="hljs-keyword">new</span> FileOutputStream(<span class="hljs-keyword">new</span> File(path + imgName));
        <span class="hljs-keyword">byte</span>[] decoderBytes = Base64.getDecoder().decode(base64);
        write.write(decoderBytes);
        write.close();
    }</code></pre>
<h3 id="articleHeader6">小结</h3>
<p>cropper能做到的事情还很多，这里只是简单使用了一下，更多功能可以在有想法的再研究下。</p>
<p>这是针对以前项目用的cropper的一个整理，结果因为当初没有看官方例子，途中发现了在模态框中使用的一个bug，以后会注意这方面。另外，整理这部分资料时也参考了不少的网络资料，在这里就不一一记录了。</p>
<p>最后，由于本人能力有限，若发现错误希望能指出，本人会及时改正，非常感谢。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【jQuery插件分享】Cropper——一个简单方便的图片裁剪插件

## 原文链接
[https://segmentfault.com/a/1190000012344970](https://segmentfault.com/a/1190000012344970)

