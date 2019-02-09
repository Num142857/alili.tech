---
title: '剪切板粘贴上传图片功能的javascript实现' 
date: 2019-02-10 2:30:42
hidden: true
slug: g9qxnahdb2a
categories: [reprint]
---

{{< raw >}}

                    
<p>平时的开发中我们难免要上传一些网页截图、图片等，传统的选择文件上传使用起来不方便，这里介绍一种使用js和node实现的剪切板黏贴上传图片功能。当我们需要上传截图时，只需手动截图后commond/ctrl+v即可完成图片上传。这种方式将大大减少我们在上传图片过程中花费的时间。</p>
<p>要实现剪切板黏贴上传功能，首先我们要先能获取到在剪切板中的图片，这里给大家介绍一个很好用的js插件：<a href="https://github.com/jorgenbs/ImageClipboard" rel="nofollow noreferrer" target="_blank">ImageClipboard</a>。</p>
<h2 id="articleHeader0">ImageClipboard</h2>
<p><a href="https://github.com/jorgenbs/ImageClipboard" rel="nofollow noreferrer" target="_blank">ImageClipboard</a>是一款在chrome、firefox和opera上有效的可以将剪切板中的图片黏贴到网页上的工具。</p>
<h3 id="articleHeader1">安装</h3>
<p>可以使用bower很简单的安装，如果没有安装bower，请先安装bower,安装使用说明见：[bower：客户端库管理工具]。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bower install image-clipboard
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code><span class="hljs-keyword">bower </span><span class="hljs-keyword">install </span>image-clipboard
</code></pre>
<h3 id="articleHeader2">使用：将剪切板中的图片黏贴到网页中去</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;box&quot;></div>
<script type=&quot;text/javascript&quot; src=&quot;ImageClipBoard.min.js&quot;></script>
<script type=&quot;text/javascript&quot;>

 var clipboard = new ImageClipboard('#box', function (base64) {
    //do stuff with pasted image
 });

  //onpaste-callback can also be passed as second argument
  //in the constructor above.
 clipboard.onpaste = function (base64) {
    //do stuff with the pasted image
  });

  //you can also pass in single DOM-element instead of 
  //query as the first parameter.

</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"ImageClipBoard.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">

 <span class="hljs-keyword">var</span> clipboard = <span class="hljs-keyword">new</span> ImageClipboard(<span class="hljs-string">'#box'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(base64)</span> </span>{
    <span class="hljs-comment">//do stuff with pasted image</span>
 });

  <span class="hljs-comment">//onpaste-callback can also be passed as second argument</span>
  <span class="hljs-comment">//in the constructor above.</span>
 clipboard.onpaste = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(base64)</span> </span>{
    <span class="hljs-comment">//do stuff with the pasted image</span>
  });

  <span class="hljs-comment">//you can also pass in single DOM-element instead of </span>
  <span class="hljs-comment">//query as the first parameter.</span>

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>运行以上代码后，div#box中会插入一个img标签，src即为当前剪切板中图片。</p>
<h2 id="articleHeader3">剪切板中图片的获取与上传</h2>
<p>通过ImageClipboard，我们可以以base64的形式获取到剪切板中的图片，然后将base64数据作为参数通过POST的方式传输到服务器端。</p>
<h3 id="articleHeader4">浏览器端代码：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
this.props.clipboard.onpaste = function (base64) {
  //do stuff with the pasted image
  //console.log(base64)

  $.ajax({
    url: 'http://localhost:2929/api/upload-img',
    dataType: 'JSON',
    data: {
      imgData: base64},
    type: 'POST',
    success: function(data) {
      console.log(data);
    }
  });

};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-keyword">this</span>.props.clipboard.onpaste = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">base64</span>) </span>{
  <span class="hljs-comment">//do stuff with the pasted image</span>
  <span class="hljs-comment">//console.log(base64)</span>

  $.ajax({
    <span class="hljs-attr">url</span>: <span class="hljs-string">'http://localhost:2929/api/upload-img'</span>,
    <span class="hljs-attr">dataType</span>: <span class="hljs-string">'JSON'</span>,
    <span class="hljs-attr">data</span>: {
      <span class="hljs-attr">imgData</span>: base64},
    <span class="hljs-attr">type</span>: <span class="hljs-string">'POST'</span>,
    <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
      <span class="hljs-built_in">console</span>.log(data);
    }
  });

};
</code></pre>
<h3 id="articleHeader5">服务器端代码</h3>
<p>服务器端获取到base64数据，即可将base64数据转为图片存储或者传送到其他服务器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function uploadImg(req, res) {
     
    new Promise((resolve, reject) => {

    var fs = require('fs');
    var base64Data = req.body.imgData.replace(/^data:image\/png;base64,/, &quot;&quot;);

    fs.writeFile(&quot;out.png&quot;, base64Data, 'base64', function(err) {
      console.log(err);
    });  

  });

}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">uploadImg</span>(<span class="hljs-params">req, res</span>) </span>{
     
    <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {

    <span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
    <span class="hljs-keyword">var</span> base64Data = req.body.imgData.replace(<span class="hljs-regexp">/^data:image\/png;base64,/</span>, <span class="hljs-string">""</span>);

    fs.writeFile(<span class="hljs-string">"out.png"</span>, base64Data, <span class="hljs-string">'base64'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
      <span class="hljs-built_in">console</span>.log(err);
    });  

  });

}
</code></pre>
<p>博客文章地址：<a href="http://joebon.cc/clipboard-image-upload" rel="nofollow noreferrer" target="_blank">http://joebon.cc/clipboard-image-upload</a></p>
<h2 id="articleHeader6">参考资料</h2>
<ol>
<li><p>ImageClipboard: <a href="https://github.com/jorgenbs/ImageClipboard" rel="nofollow noreferrer" target="_blank">https://github.com/jorgenbs/ImageClipboard</a></p></li>
<li><p>bower：客户端库管理工具 <a href="http://javascript.ruanyifeng.com/tool/bower.html" rel="nofollow noreferrer" target="_blank">http://javascript.ruanyifeng.com/tool/bower.html</a></p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
剪切板粘贴上传图片功能的javascript实现

## 原文链接
[https://segmentfault.com/a/1190000005109727](https://segmentfault.com/a/1190000005109727)

