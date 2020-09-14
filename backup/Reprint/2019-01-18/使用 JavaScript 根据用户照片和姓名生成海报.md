---
title: '使用 JavaScript 根据用户照片和姓名生成海报' 
date: 2019-01-18 2:30:35
hidden: true
slug: x97zon3qc5
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>最近在为公司的一个比赛制作专题页，碰到一个使用参赛者上传的照片生成专属海报的需求，实现过程中用到了一些以前没用过的 api，也踩了一些坑，于是将其记录下来。</p>
<h2 id="articleHeader1">需求描述</h2>
<ol>
<li><p>用户点击按钮进行照片上传</p></li>
<li><p>照片上传完成后，将照片进行裁剪，并和海报背景、姓名等组合得到海报</p></li>
<li><p>将生成的海报上传</p></li>
</ol>
<p>效果大概如下：</p>
<blockquote><p>海报背景：</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVKt6l?w=735&amp;h=978" src="https://static.alili.tech/img/bVKt6l?w=735&amp;h=978" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>成品：</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVKt7q?w=735&amp;h=975" src="https://static.alili.tech/img/bVKt7q?w=735&amp;h=975" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">实现过程</h2>
<h3 id="articleHeader3">1、初始化 <code>canvas</code>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="canvas#poster-canvas(width='960' height='1280')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">canvas</span><span class="hljs-selector-id">#poster-canvas</span>(width=<span class="hljs-string">'960'</span> height=<span class="hljs-string">'1280'</span>)</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function initCanvas() {
  canvasCtx = document.getElementById(&quot;poster-canvas&quot;).getContext('2d');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initCanvas</span>(<span class="hljs-params"></span>) </span>{
  canvasCtx = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"poster-canvas"</span>).getContext(<span class="hljs-string">'2d'</span>);
}</code></pre>
<h3 id="articleHeader4">2、绘制海报背景</h3>
<p>海报背景为预先提供的一张照片，将其设置到一个隐藏的 <code>img</code> 标签里面，并且预留一个 <code>canvas</code> 元素用于绘制海报：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="img.poster-background(src='/assets/xxx/poster-background.jpeg')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">img</span>.poster-<span class="hljs-attribute">background</span>(src=<span class="hljs-string">'/assets/xxx/poster-background.jpeg'</span>)</code></pre>
<p>页面加载完成后，将海报背景绘制到 <code>canvas</code> 内：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('img.poster-background').on('load', function () {
  var backgroundImg = $('img.poster-background')[0];
  canvasCtx.drawImage(backgroundImg, 0, 0, 960, 1280);
  renderName();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">'img.poster-background'</span>).on(<span class="hljs-string">'load'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> backgroundImg = $(<span class="hljs-string">'img.poster-background'</span>)[<span class="hljs-number">0</span>];
  canvasCtx.drawImage(backgroundImg, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">960</span>, <span class="hljs-number">1280</span>);
  renderName();
});</code></pre>
<p>海报背景绘制完成之后，需要将用户姓名绘制到特定位置。由于用户姓名长度不一，因此需要进行计算确定字体大小：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function renderName() {
  var name = $('input[name=&quot;chName&quot;]').val();
  var fontSize;
  if (name.length < 3) {
    fontSize = 100;
  } else {
    fontSize = parseInt(320 / name.length);
  }
  canvasCtx.font = &quot;bold &quot; + fontSize + &quot;px Courier New&quot;;
  canvasCtx.fillStyle = &quot;#de071b&quot;;
  canvasCtx.fillText(name, 20, 1066);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>function renderName() {
  var <span class="hljs-built_in">name</span> = $('input[<span class="hljs-built_in">name</span>=<span class="hljs-string">"chName"</span>]').val();
  var fontSize;
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">name</span>.<span class="hljs-built_in">length</span> &lt; <span class="hljs-number">3</span>) {
    fontSize = <span class="hljs-number">100</span>;
  } <span class="hljs-keyword">else</span> {
    fontSize = parseInt(<span class="hljs-number">320</span> / <span class="hljs-built_in">name</span>.<span class="hljs-built_in">length</span>);
  }
  canvasCtx.font = <span class="hljs-string">"bold "</span> + fontSize + <span class="hljs-string">"px Courier New"</span>;
  canvasCtx.fillStyle = <span class="hljs-string">"#de071b"</span>;
  canvasCtx.fillText(<span class="hljs-built_in">name</span>, <span class="hljs-number">20</span>, <span class="hljs-number">1066</span>);
}</code></pre>
<h3 id="articleHeader5">3、上传照片</h3>
<p>使用 <code>file</code> 类型的 <code>input</code> 元素，因为页面上表现为点击按钮，因此使用经典的将 <code>input</code> 元素透明化并覆盖按钮的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a.upload-btn 
  input#photo(type='file' name='photo' accept='image/jpeg, image/png')
  | 上传自己的照片生成专属海报" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs leaf"><code>a.upload-btn 
  input<span class="hljs-function"><span class="hljs-keyword">#</span><span class="hljs-title">photo</span><span class="hljs-params">(<span class="hljs-variable">type</span>='<span class="hljs-variable">file</span>' <span class="hljs-variable">name</span>='<span class="hljs-variable">photo</span>' <span class="hljs-variable">accept</span>='<span class="hljs-variable">image</span>/<span class="hljs-variable">jpeg</span>, <span class="hljs-variable">image</span>/<span class="hljs-variable">png</span>')</span></span>
  | 上传自己的照片生成专属海报</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".upload-btn input {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 68px;
  cursor: pointer;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.upload-btn</span> <span class="hljs-selector-tag">input</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">68px</span>;
  <span class="hljs-attribute">cursor</span>: pointer;
}</code></pre>
<p>然后监听 <code>input</code> 元素的 <code>change</code> 事件，然后使用 <code>FormData API</code> 构造表单数据，使用 <code>ajax</code> 进行异步上传，照片上传完成之后。得到一个地址，将这个地址设置到页面上预留的一个 <code>img</code> 标签里面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('#photo').on('change', function (e) {
  var file = e.target.files[0];
  var type = file.type;
  if (type !== 'image/jpeg' &amp;&amp; type !== 'image/png') {
    window.toastr.error('请上传 jpg 或 png 格式的图片');
  } else {
    var formData = new FormData();
    formData.append('avatar', file);
    $.ajax({
      type: 'POST',
      url: '/upload_url',
      data: formData,
      contentType: false,
      processData: false,
      success: function(result) {
        var avatarUrl = result.data.url;
        $('img.avatar').attr('src', avatarUrl);
      },
      error: function(err) {
        
      }
    });
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>$(<span class="hljs-string">'#photo'</span>).on(<span class="hljs-string">'change'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
  <span class="hljs-keyword">var</span> file = e.target.files[<span class="hljs-number">0</span>];
  <span class="hljs-keyword">var</span> <span class="hljs-keyword">type</span> = file.type;
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">type</span> !== <span class="hljs-string">'image/jpeg'</span> &amp;&amp; <span class="hljs-keyword">type</span> !== <span class="hljs-string">'image/png'</span>) {
    <span class="hljs-built_in">window</span>.toastr.error(<span class="hljs-string">'请上传 jpg 或 png 格式的图片'</span>);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">var</span> formData = <span class="hljs-keyword">new</span> FormData();
    formData.append(<span class="hljs-string">'avatar'</span>, file);
    $.ajax({
      <span class="hljs-keyword">type</span>: <span class="hljs-string">'POST'</span>,
      url: <span class="hljs-string">'/upload_url'</span>,
      data: formData,
      contentType: <span class="hljs-literal">false</span>,
      processData: <span class="hljs-literal">false</span>,
      success: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>) </span>{
        <span class="hljs-keyword">var</span> avatarUrl = result.data.url;
        $(<span class="hljs-string">'img.avatar'</span>).attr(<span class="hljs-string">'src'</span>, avatarUrl);
      },
      error: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
        
      }
    });
  }
});</code></pre>
<h3 id="articleHeader6">4、绘制照片</h3>
<p>海报中放置照片的区域为正方形，但是用户上传的照片却不一定，因此需要对照片进行裁剪，裁剪的原则为取照片中间部分。然后将裁剪参数传进 <code>canvas</code> 的 <code>drawImage</code> 方法，进行绘制：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('img.avatar').on('load', function () {
  var avatarImg = $('img.avatar')[0];
  var originWidth = avatarImg.width;
  var originHeight = avatarImg.height;
  var newWidth, cutStartX, cutStartY;

  if (originWidth < originHeight) {
    newWidth = originWidth;
    cutStartX = 0;
    cutStartY = (originHeight - originWidth) / 2;
  } else if (originWidth > originHeight) {
    newWidth = originHeight;
    cutStartX = (originWidth - originHeight) / 2;
    cutStartY = 0;
  } else {
    newWidth = originWidth;
    cutStartX = 0;
    cutStartY = 0;
  }
  
  canvasCtx.drawImage(avatarImg, cutStartX, cutStartY, newWidth, newWidth, 0, 0, 960, 960);

  uploadPoster();
      
});  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>$(<span class="hljs-string">'img.avatar'</span>).on(<span class="hljs-string">'load'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> </span>() {
  <span class="hljs-keyword">var</span> avatarImg = $(<span class="hljs-string">'img.avatar'</span>)[<span class="hljs-number">0</span>];
  <span class="hljs-keyword">var</span> originWidth = avatarImg.width;
  <span class="hljs-keyword">var</span> originHeight = avatarImg.height;
  <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Width</span>, cutStartX, cutStartY;

  <span class="hljs-keyword">if</span> (originWidth &lt; originHeight) {
    <span class="hljs-keyword">new</span><span class="hljs-type">Width</span> = originWidth;
    cutStartX = <span class="hljs-number">0</span>;
    cutStartY = (originHeight - originWidth) / <span class="hljs-number">2</span>;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (originWidth &gt; originHeight) {
    <span class="hljs-keyword">new</span><span class="hljs-type">Width</span> = originHeight;
    cutStartX = (originWidth - originHeight) / <span class="hljs-number">2</span>;
    cutStartY = <span class="hljs-number">0</span>;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">new</span><span class="hljs-type">Width</span> = originWidth;
    cutStartX = <span class="hljs-number">0</span>;
    cutStartY = <span class="hljs-number">0</span>;
  }
  
  canvasCtx.drawImage(avatarImg, cutStartX, cutStartY, <span class="hljs-keyword">new</span><span class="hljs-type">Width</span>, <span class="hljs-keyword">new</span><span class="hljs-type">Width</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">960</span>, <span class="hljs-number">960</span>);

  uploadPoster();
      
});  </code></pre>
<p><em>前面绘制海报背景和这里绘制照片，调用的是同一个方法，只不过后者多传进去了裁剪参数。但是需要注意的是，裁剪参数是在绘制位置之前传进去的，而不是简单的补在后面：</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="canvasCtx.drawImage(backgroundImg, 0, 0, 960, 1280);

canvasCtx.drawImage(avatarImg, cutStartX, cutStartY, newWidth, newWidth, 0, 0, 960, 960);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>canvasCtx.drawImage(backgroundImg, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">960</span>, <span class="hljs-number">1280</span>);

canvasCtx.drawImage(avatarImg, cutStartX, cutStartY, newWidth, newWidth, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">960</span>, <span class="hljs-number">960</span>);</code></pre>
<h3 id="articleHeader7">5、上传海报</h3>
<p>依然使用 <code>FormData API</code>，因此需要先用 <code>canvas</code> 构造一个 <code>Blob</code> 对象。新版本的 Chrome 和 Firefox 支持 <code>canvas</code> 的 <code>toBlob</code> 方法，可以直接使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.getElementById(&quot;poster-canvas&quot;).toBlob(function (blob) {});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"poster-canvas"</span>).toBlob(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">blob</span>) </span>{});</code></pre>
<p>其它浏览器里，可以先用 <code>toDataURL</code>方法得到 <code>base64</code> 格式的图片数据，再转为 <code>Blob</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var blob = dataURLtoBlob(document.getElementById(&quot;poster-canvas&quot;).toDataURL());

function dataURLtoBlob(dataurl) {
  if (dataurl.indexOf('base64') < 0) {
    dataurl = 'data:image/jpeg;base64,' + dataurl;
  }
  var arr = dataurl.split(',');
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while (n --) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type: mime});
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> blob = dataURLtoBlob(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"poster-canvas"</span>).toDataURL());

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dataURLtoBlob</span>(<span class="hljs-params">dataurl</span>) </span>{
  <span class="hljs-keyword">if</span> (dataurl.indexOf(<span class="hljs-string">'base64'</span>) &lt; <span class="hljs-number">0</span>) {
    dataurl = <span class="hljs-string">'data:image/jpeg;base64,'</span> + dataurl;
  }
  <span class="hljs-keyword">var</span> arr = dataurl.split(<span class="hljs-string">','</span>);
  <span class="hljs-keyword">var</span> mime = arr[<span class="hljs-number">0</span>].match(<span class="hljs-regexp">/:(.*?);/</span>)[<span class="hljs-number">1</span>];
  <span class="hljs-keyword">var</span> bstr = atob(arr[<span class="hljs-number">1</span>]);
  <span class="hljs-keyword">var</span> n = bstr.length;
  <span class="hljs-keyword">var</span> u8arr = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Uint8Array</span>(n);
  <span class="hljs-keyword">while</span> (n --) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Blob([u8arr], {<span class="hljs-attr">type</span>: mime});
}</code></pre>
<p>然后进行上传，步骤和前面上传照片一致：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var formData = new FormData();
formData.append('poster', blob);
$.ajax({
  type: 'POST',
  url: '/upload_poster_url',
  data: formdata,
  contentType: false,
  processData: false,
  success: function(result) {
    
  },
  error: function(err) {
    
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> formData = <span class="hljs-keyword">new</span> FormData();
formData.append(<span class="hljs-string">'poster'</span>, blob);
$.ajax({
  <span class="hljs-attr">type</span>: <span class="hljs-string">'POST'</span>,
  <span class="hljs-attr">url</span>: <span class="hljs-string">'/upload_poster_url'</span>,
  <span class="hljs-attr">data</span>: formdata,
  <span class="hljs-attr">contentType</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">processData</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>) </span>{
    
  },
  <span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
    
  }
});</code></pre>
<p>至此，整个流程完结。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 JavaScript 根据用户照片和姓名生成海报

## 原文链接
[https://segmentfault.com/a/1190000008656519](https://segmentfault.com/a/1190000008656519)

