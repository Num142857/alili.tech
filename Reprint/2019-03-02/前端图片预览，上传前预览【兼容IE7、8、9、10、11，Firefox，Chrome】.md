---
title: '前端图片预览，上传前预览【兼容IE7、8、9、10、11，Firefox，Chrome】' 
date: 2019-03-02 2:30:07
hidden: true
slug: mgg2f9ucygf
categories: [reprint]
---

{{< raw >}}

                    
<p>在现在的Web开发中不可避免的会做一个图片预览的功能，比如在上传图片的情况下，一个很简单的办法就是讲图片上传至服务器之后，再将文件的URL返回回来，然后异步通过这个URL加载刚刚上传的图片，实现图片的预览，很明显的在这个过程中两次Web请求，一次发送文件，一次下载文件，到最后这个文件如果在客户端被删除（取消上传，弃用这次的上传），这整个过程都白费了。我们希望能够在图片上传之前就能进行图片的预览，这样就避免了不必要的网络请求和时间等待。下面的内容就围绕这个话题展开。</p>
<p><strong>本地图片预览</strong></p>
<blockquote>IE中的本地图片预览（以本地文件的形式访问）</blockquote>
<p>在IE中能够很方便的实现本地网页的图片预览，IE中的&lt;input type="file" id="file_upload"&gt;中的File对象中的value属性，存储的是要上传的文件的完整路径，在IE中只需要将这个完整路径作为一个Image对象的src属性，就能实现在这个Image对象中对这个上传的图片进行预览。</p>
<p>在IE中有如下方式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var url;
var fileobj = document.getElementById(sourceId);
fileobj.select();
url = document.selection.createRange().text;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span>;
<span class="hljs-built_in">var</span> fileobj = <span class="hljs-built_in">document</span>.getElementById(sourceId);
fileobj.select();
<span class="hljs-built_in">url</span> = <span class="hljs-built_in">document</span>.selection.createRange().text;
</code></pre>
<p>或者</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var url = document.getElementById(sourceId).value;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = <span class="hljs-built_in">document</span>.getElementById(sourceId).value;
</code></pre>
<p>两种方式获取到的路径直接给img src 可以进行本地图片的预览（可以加上file:///协议，效果一样），这两种方式对IE7、8、9、10、11下有效。</p>
<p><strong>Firefox和Chrome的本地图片预览</strong></p>
<p>在Firefox和Chrome中使用如下方式:</p>
<p><code>var url = window.URL.createObjectURL(document.getElementById(sourceId).files[0])</code></p>
<p>将得到的值给img src 进行图片预览。可能还会看到如下的方式：var url = obj.files.item(0).getAsDataURL();</p>
<p>这种使用Firefox File对象的getAsDataURL的方式，已经在Firefox 7.0以后弃用，Firefox DOM File，可能原因是在HTML5标准中有相关的定义。</p>
<p><strong>服务端图片预览</strong></p>
<blockquote>IE中的本地图片预览（以服务端URL的形式访问）</blockquote>
<p>上面提到的本地预览的方式，在以服务端URL的形式方式下没有预览的效果，需要使用如下滤镜的形式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function PreviewImg(imgFile){
     var newPreview = document.getElementById(&quot;newPreview&quot;);
     var imgDiv = document.createElement(&quot;div&quot;);
     document.body.appendChild(imgDiv);
     imgDiv.style.width = &quot;118px&quot;;     imgDiv.style.height = &quot;127px&quot;;
     imgDiv.style.filter=&quot;progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod = scale)&quot;;
     imgDiv.filters.item(&quot;DXImageTransform.Microsoft.AlphaImageLoader&quot;).src = imgFile.value;
     newPreview.appendChild(imgDiv);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">PreviewImg</span></span>(imgFile){
     <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Preview</span> = document.getElementById(<span class="hljs-string">"newPreview"</span>);
     <span class="hljs-keyword">var</span> imgDiv = document.createElement(<span class="hljs-string">"div"</span>);
     document.body.appendChild(imgDiv);
     imgDiv.style.width = <span class="hljs-string">"118px"</span>;     imgDiv.style.height = <span class="hljs-string">"127px"</span>;
     imgDiv.style.filter=<span class="hljs-string">"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod = scale)"</span>;
     imgDiv.filters.item(<span class="hljs-string">"DXImageTransform.Microsoft.AlphaImageLoader"</span>).src = imgFile.value;
     <span class="hljs-keyword">new</span><span class="hljs-type">Preview</span>.appendChild(imgDiv);
}
</code></pre>
<p>上面的实现可以在IE7、8、9下运行，在IE10、11下无效。h2. Firefox和Chrome的本地图片预览在Firefox和Chrome中使用如下方式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var url = window.URL.createObjectURL(document.getElementById(sourceId).files[0])
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> url = window<span class="hljs-selector-class">.URL</span><span class="hljs-selector-class">.createObjectURL</span>(document.getElementById(sourceId)<span class="hljs-selector-class">.files</span>[<span class="hljs-number">0</span>])
</code></pre>
<p>将得到的值给img src 进行图片预览。可能还会看到如下的方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var url = obj.files.item(0).getAsDataURL();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var url</span> = obj.files.item(0).getAsDataURL();
</code></pre>
<p>这种使用Firefox File对象的getAsDataURL的方式，已经在Firefox 7.0以后弃用，Firefox DOM File，可能原因是在HTML5标准中有相关的定义。</p>
<p><strong>基础</strong></p>
<p>在Chrome中，window.URL和window.webkitURL都存在<br>在Firefox中，仅Window.URL存在<br>在IE11（Edge），10中仅window.URL存在<br>在IE7、8、9中不存在window.URL<br>在IE中能通过FileObject 的value 属性获取文件全路径<br>在Chrome中无法获取FileObject的全路径，得到的是一个假路径<br>在Firefox中根本获取不到路径，得到的是一个文件名<br>在IE7、8、9中无法获取到FileObject的files属性</p>
<p><strong>实现</strong></p>
<p>以前我们总是按照userAgent，通过判断IE，还是Chrome，还是Firefox，或者Safari、Opera等来对应支持代码，现在这种方式可能需要有所调整，File API是HTML5的规范特性，因此可以将浏览器大致先分为两个大类，一个是支持HTML5的一类，另一个是不支持的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html xmlns=&quot;http://www.w3.org/1999/xhtml&quot;>
 
<head id=&quot;Head1&quot;>
    <meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=utf-8&quot; />
    <style type=&quot;text/css&quot;>
    .image_container {
        width: 48px;
        height: 48px;
        position: relative;
    }
    </style>
    <script type=&quot;text/javascript&quot; src=&quot;jquery.js&quot;></script>
    <script language=&quot;javascript&quot;>
    $(function() {
        $(&quot;#file_upload&quot;).change(function() {
            var $file = $(this);
            var fileObj = $file[0];
            var windowURL = window.URL || window.webkitURL;
            var dataURL;
            var $img = $(&quot;#preview&quot;);
 
            if(fileObj &amp;&amp; fileObj.files &amp;&amp; fileObj.files[0]){
                dataURL = windowURL.createObjectURL(fileObj.files[0]);
                $img.attr('src',dataURL);
            }else{
                dataURL = $file.val();
 
                // $img.css(&quot;filter&quot;,'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod = scale,src=&quot;' + dataURL + '&quot;)');
 
                // var imgObj = document.getElementById(&quot;preview&quot;);
                // imgObj.style.filter = &quot;progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\&quot;&quot; + dataURL + &quot;\&quot;)&quot;;
                // imgObj.style.width = &quot;48px&quot;;
                // imgObj.style.height = &quot;48px&quot;;
 
                var imgObj = document.getElementById(&quot;preview&quot;);
                // 两个坑:
                // 1、在设置filter属性时，元素必须已经存在在DOM树中，动态创建的Node，也需要在设置属性前加入到DOM中，先设置属性在加入，无效；
                // 2、src属性需要像下面的方式添加，上面的两种方式添加，无效；
                imgObj.style.filter = &quot;progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)&quot;;
                imgObj.filters.item(&quot;DXImageTransform.Microsoft.AlphaImageLoader&quot;).src = dataURL;
 
            }
        });
    });
    </script>
</head>
<body>
    <div id=&quot;demo&quot;>
        <input id=&quot;file_upload&quot; type=&quot;file&quot; />
        <div class=&quot;image_container&quot;>
            <img id=&quot;preview&quot; width=&quot;60&quot; height=&quot;60&quot;>
        </div>
    </div>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">xmlns</span>=<span class="hljs-string">"http://www.w3.org/1999/xhtml"</span>&gt;</span>
 
<span class="hljs-tag">&lt;<span class="hljs-name">head</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"Head1"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Content-Type"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"text/html; charset=utf-8"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.image_container</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">48px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">48px</span>;
        <span class="hljs-attribute">position</span>: relative;
    }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"jquery.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">language</span>=<span class="hljs-string">"javascript"</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-string">"#file_upload"</span>).change(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> $file = $(<span class="hljs-keyword">this</span>);
            <span class="hljs-keyword">var</span> fileObj = $file[<span class="hljs-number">0</span>];
            <span class="hljs-keyword">var</span> windowURL = <span class="hljs-built_in">window</span>.URL || <span class="hljs-built_in">window</span>.webkitURL;
            <span class="hljs-keyword">var</span> dataURL;
            <span class="hljs-keyword">var</span> $img = $(<span class="hljs-string">"#preview"</span>);
 
            <span class="hljs-keyword">if</span>(fileObj &amp;&amp; fileObj.files &amp;&amp; fileObj.files[<span class="hljs-number">0</span>]){
                dataURL = windowURL.createObjectURL(fileObj.files[<span class="hljs-number">0</span>]);
                $img.attr(<span class="hljs-string">'src'</span>,dataURL);
            }<span class="hljs-keyword">else</span>{
                dataURL = $file.val();
 
                <span class="hljs-comment">// $img.css("filter",'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod = scale,src="' + dataURL + '")');</span>
 
                <span class="hljs-comment">// var imgObj = document.getElementById("preview");</span>
                <span class="hljs-comment">// imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\"" + dataURL + "\")";</span>
                <span class="hljs-comment">// imgObj.style.width = "48px";</span>
                <span class="hljs-comment">// imgObj.style.height = "48px";</span>
 
                <span class="hljs-keyword">var</span> imgObj = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"preview"</span>);
                <span class="hljs-comment">// 两个坑:</span>
                <span class="hljs-comment">// 1、在设置filter属性时，元素必须已经存在在DOM树中，动态创建的Node，也需要在设置属性前加入到DOM中，先设置属性在加入，无效；</span>
                <span class="hljs-comment">// 2、src属性需要像下面的方式添加，上面的两种方式添加，无效；</span>
                imgObj.style.filter = <span class="hljs-string">"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)"</span>;
                imgObj.filters.item(<span class="hljs-string">"DXImageTransform.Microsoft.AlphaImageLoader"</span>).src = dataURL;
 
            }
        });
    });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"demo"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"file_upload"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"image_container"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"preview"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"60"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"60"</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端图片预览，上传前预览【兼容IE7、8、9、10、11，Firefox，Chrome】

## 原文链接
[https://segmentfault.com/a/1190000016897039](https://segmentfault.com/a/1190000016897039)

