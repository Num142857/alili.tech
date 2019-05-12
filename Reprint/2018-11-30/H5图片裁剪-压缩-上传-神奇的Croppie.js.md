---
title: 'H5图片裁剪-压缩-上传-神奇的Croppie.js' 
date: 2018-11-30 2:30:12
hidden: true
slug: oqzx87m55ss
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Croppie.js之图片裁剪压缩上传</h2>
<blockquote>h5图片裁剪, 压缩, 上传, 预览是常见功能, 幸运的是我们有cropp.js这款利器.</blockquote>
<h4>1. style</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <link rel=&quot;Stylesheet&quot; href=&quot;https://cdn.bootcss.com/croppie/2.6.2/croppie.css&quot; />
  <style>
    .actions button, 
    .actions a.btn { 
    background-color: #189094; 
    color: white; 
    padding: 10px 15px; 
    border-radius: 3px; 
    border: 1px solid rgba(255, 255, 255, 0.5); 
    font-size: 16px; 
    cursor: pointer; 
    text-decoration: none; 
    text-shadow: none; 
    } 
    .actions button:focus { 
    outline: 0; 
    } 
      
    .actions .file-btn { 
    position: relative; 
    } 
    .actions .file-btn input[type=&quot;file&quot;] { 
    position: absolute; 
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100%; 
    opacity: 0; 
    } 
      
    .actions { 
    padding: 5px 0; 
    } 
    .actions button { 
    margin-right: 5px; 
    } 
    .actions .crop{display:none} 
  </style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">  &lt;link rel=<span class="hljs-string">"Stylesheet"</span> href=<span class="hljs-string">"https://cdn.bootcss.com/croppie/2.6.2/croppie.css"</span> /&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.actions</span> <span class="hljs-selector-tag">button</span>, 
    <span class="hljs-selector-class">.actions</span> <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.btn</span> { 
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#189094</span>; 
    <span class="hljs-attribute">color</span>: white; 
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span> <span class="hljs-number">15px</span>; 
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">3px</span>; 
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-built_in">rgba</span>(255, 255, 255, 0.5); 
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>; 
    <span class="hljs-attribute">cursor</span>: pointer; 
    <span class="hljs-attribute">text-decoration</span>: none; 
    <span class="hljs-attribute">text-shadow</span>: none; 
    } 
    <span class="hljs-selector-class">.actions</span> <span class="hljs-selector-tag">button</span><span class="hljs-selector-pseudo">:focus</span> { 
    <span class="hljs-attribute">outline</span>: <span class="hljs-number">0</span>; 
    } 
      
    <span class="hljs-selector-class">.actions</span> <span class="hljs-selector-class">.file-btn</span> { 
    <span class="hljs-attribute">position</span>: relative; 
    } 
    <span class="hljs-selector-class">.actions</span> <span class="hljs-selector-class">.file-btn</span> <span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type="file"]</span> { 
    <span class="hljs-attribute">position</span>: absolute; 
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>; 
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>; 
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>; 
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>; 
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>; 
    } 
      
    <span class="hljs-selector-class">.actions</span> { 
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">5px</span> <span class="hljs-number">0</span>; 
    } 
    <span class="hljs-selector-class">.actions</span> <span class="hljs-selector-tag">button</span> { 
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">5px</span>; 
    } 
    <span class="hljs-selector-class">.actions</span> <span class="hljs-selector-class">.crop</span>{<span class="hljs-attribute">display</span>:none} 
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<h4>2.html</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <div class=&quot;actions&quot;> 
    <button class=&quot;file-btn&quot;> 
      <span>上传</span> 
      <input type=&quot;file&quot; id=&quot;upload&quot; value=&quot;选择图片文件&quot; /> 
    </button> 
    <div class=&quot;crop&quot;> 
      <div id=&quot;upload-demo&quot;></div> 
      <button class=&quot;upload-result&quot;>裁剪</button> 
    </div> 
    <div id=&quot;result&quot;></div> 
  </div> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">  &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"actions"</span>&gt; 
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"file-btn"</span>&gt;</span> 
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>上传<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> 
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"upload"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"选择图片文件"</span> /&gt;</span> 
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span> 
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"crop"</span>&gt;</span> 
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"upload-demo"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> 
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"upload-result"</span>&gt;</span>裁剪<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span> 
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> 
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"result"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> 
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span> </code></pre>
<h4>3.JavaScript</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
  <script src=&quot;http://cdn.static.runoob.com/libs/jquery/1.10.2/jquery.min.js&quot;></script>
  <script src=&quot;https://cdn.bootcss.com/croppie/2.6.2/croppie.js&quot;></script>


$(function(){ 
 var $uploadCrop; 
  
  function readFile(input) { 
    if (input.files &amp;&amp; input.files[0]) { 
    var reader = new FileReader(); 
      
    reader.onload = function (e) { 
     $uploadCrop.croppie('bind', { 
      url: e.target.result 
     }); 
    } 
      
    reader.readAsDataURL(input.files[0]); 
   } 
   else { 
    alert(&quot;Sorry - you're browser doesn't support the FileReader API&quot;); 
   } 
  } 
  
  $uploadCrop = $('#upload-demo').croppie({ 
   viewport: { 
    width: 200, 
    height: 200, 
    type: 'circle'
   }, 
   boundary: { 
    width: 300, 
    height: 300 
   },
   showZoomer: false,
  }); 
  
  $('#upload').on('change', function () { 
   $(&quot;.crop&quot;).show(); 
   readFile(this); 
  }); 
  $('.upload-result').on('click', function (ev) { 
   $uploadCrop.croppie('result', 'canvas').then(function (resp) { 
    popupResult({ 
     src: resp 
    }); 
   }); 
  }); 
    
 function popupResult(result) { 
  var html; 
  if (result.html) { 
   html = result.html; 
  } 
  if (result.src) { 
   html = '<img src=&quot;' + result.src + '&quot; />'; 
  } 
  $(&quot;#result&quot;).html(html); 
 } 
}); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">
  &lt;script src=<span class="hljs-string">"http://cdn.static.runoob.com/libs/jquery/1.10.2/jquery.min.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
  &lt;script src=<span class="hljs-string">"https://cdn.bootcss.com/croppie/2.6.2/croppie.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>


$(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ 
 <span class="hljs-keyword">var</span> $uploadCrop; 
  
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">readFile</span>(<span class="hljs-params">input</span>) </span>{ 
    <span class="hljs-keyword">if</span> (input.files &amp;&amp; input.files[<span class="hljs-number">0</span>]) { 
    <span class="hljs-keyword">var</span> reader = <span class="hljs-keyword">new</span> FileReader(); 
      
    reader.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{ 
     $uploadCrop.croppie(<span class="hljs-string">'bind'</span>, { 
      <span class="hljs-attr">url</span>: e.target.result 
     }); 
    } 
      
    reader.readAsDataURL(input.files[<span class="hljs-number">0</span>]); 
   } 
   <span class="hljs-keyword">else</span> { 
    alert(<span class="hljs-string">"Sorry - you're browser doesn't support the FileReader API"</span>); 
   } 
  } 
  
  $uploadCrop = $(<span class="hljs-string">'#upload-demo'</span>).croppie({ 
   <span class="hljs-attr">viewport</span>: { 
    <span class="hljs-attr">width</span>: <span class="hljs-number">200</span>, 
    <span class="hljs-attr">height</span>: <span class="hljs-number">200</span>, 
    <span class="hljs-attr">type</span>: <span class="hljs-string">'circle'</span>
   }, 
   <span class="hljs-attr">boundary</span>: { 
    <span class="hljs-attr">width</span>: <span class="hljs-number">300</span>, 
    <span class="hljs-attr">height</span>: <span class="hljs-number">300</span> 
   },
   <span class="hljs-attr">showZoomer</span>: <span class="hljs-literal">false</span>,
  }); 
  
  $(<span class="hljs-string">'#upload'</span>).on(<span class="hljs-string">'change'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ 
   $(<span class="hljs-string">".crop"</span>).show(); 
   readFile(<span class="hljs-keyword">this</span>); 
  }); 
  $(<span class="hljs-string">'.upload-result'</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ev</span>) </span>{ 
   $uploadCrop.croppie(<span class="hljs-string">'result'</span>, <span class="hljs-string">'canvas'</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resp</span>) </span>{ 
    popupResult({ 
     <span class="hljs-attr">src</span>: resp 
    }); 
   }); 
  }); 
    
 <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">popupResult</span>(<span class="hljs-params">result</span>) </span>{ 
  <span class="hljs-keyword">var</span> html; 
  <span class="hljs-keyword">if</span> (result.html) { 
   html = result.html; 
  } 
  <span class="hljs-keyword">if</span> (result.src) { 
   html = <span class="hljs-string">'&lt;img src="'</span> + result.src + <span class="hljs-string">'" /&gt;'</span>; 
  } 
  $(<span class="hljs-string">"#result"</span>).html(html); 
 } 
}); </code></pre>
<hr>
<blockquote>croppie.js挺好用的图片处理插件, 另外还有较好的插件有待研究<br><a href="http://foliotek.github.io/Croppie/#documentation" rel="nofollow noreferrer" target="_blank">http://foliotek.github.io/Cro...</a>  <br><a href="https://github.com/tapmodo/Jcrop" rel="nofollow noreferrer" target="_blank">https://github.com/tapmodo/Jcrop</a><br><a href="https://fengyuanchen.github.io/cropperjs/" rel="nofollow noreferrer" target="_blank">https://fengyuanchen.github.i...</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
H5图片裁剪-压缩-上传-神奇的Croppie.js

## 原文链接
[https://segmentfault.com/a/1190000014856703](https://segmentfault.com/a/1190000014856703)

