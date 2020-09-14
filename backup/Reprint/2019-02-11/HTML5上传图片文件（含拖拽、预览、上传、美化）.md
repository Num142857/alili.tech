---
title: 'HTML5上传图片文件（含拖拽、预览、上传、美化）' 
date: 2019-02-11 2:30:49
hidden: true
slug: f73imq54ud
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>欢迎交换友链 <a href="http://laker.me/blog" rel="nofollow noreferrer" target="_blank">Laker's Blog--进击的程序媛</a><br>Github：<a href="https://github.com/younglaker" rel="nofollow noreferrer" target="_blank">https://github.com/younglaker</a><br>微博: <a href="http://weibo.com/1830309103" rel="nofollow noreferrer" target="_blank">江小湖Laker</a></p></blockquote>
<hr>
<p><span class="img-wrap"><img data-src="/img/bVuO9f" src="https://static.alili.tech/img/bVuO9f" alt="HTML5上传图片文件.png" title="HTML5上传图片文件.png" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://laker.me/blog/2016/03/04/16_0304_ajax_file_upload/" rel="nofollow noreferrer" target="_blank">上篇文章讲了如何上传文件</a>。本文讲细分讲述图片上传、预览等。</p>
<h2 id="articleHeader0">关于接口</h2>
<p><a href="http://www.w3.org/TR/file-upload/" rel="nofollow noreferrer" target="_blank">File API</a></p>
<ul>
<li><p>File - 独立文件；提供只读信息，例如名称、文件大小、mimetype 和对文件句柄的引用。</p></li>
<li><p>FileList - File 对象的类数组序列（考虑多文件上传或者从桌面拖动目录或文件）。</p></li>
<li><p>Blob - 可将文件分割为字节范围。</p></li>
<li><p>FileReader - 读取File或Blob</p></li>
<li><p>URL scheme</p></li>
</ul>
<h2 id="articleHeader1">检测浏览器是否支持</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 检测是否支持File API
if (window.File &amp;&amp; window.FileReader &amp;&amp; window.FileList &amp;&amp; window.Blob) {
  //  支持
} else {
  alert('不支持');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment">// 检测是否支持File API</span>
<span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.File &amp;&amp; <span class="hljs-built_in">window</span>.FileReader &amp;&amp; <span class="hljs-built_in">window</span>.FileList &amp;&amp; <span class="hljs-built_in">window</span>.Blob) {
  <span class="hljs-comment">//  支持</span>
} <span class="hljs-keyword">else</span> {
  alert(<span class="hljs-string">'不支持'</span>);
}</code></pre>
<h2 id="articleHeader2">基本代码</h2>
<p>选取一张图片，并预览：<br><a href="https://codepen.io/younglaker/pen/vGmaYr" rel="nofollow noreferrer" target="_blank">Demo1</a><button class="btn btn-xs btn-default ml10 preview" data-url="younglaker/pen/vGmaYr" data-typeid="3">点击预览</button></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input id=&quot;img_input&quot; type=&quot;file&quot; accept=&quot;image/*&quot;/>
<label for=&quot;img_input&quot;></label>
<div class=&quot;preview_box&quot;></div>

.preview_box img {
  width: 200px;
}

$(&quot;#img_input&quot;).on(&quot;change&quot;, function(e){

  var file = e.target.files[0]; //获取图片资源

  // 只选择图片文件
  if (!file.type.match('image.*')) {
    return false;
  }

  var reader = new FileReader();

  reader.readAsDataURL(file); // 读取文件

  // 渲染文件
  reader.onload = function(arg) {

    var img = '<img class=&quot;preview&quot; src=&quot;' + arg.target.result + '&quot; alt=&quot;preview&quot;/>';
    $(&quot;.preview_box&quot;).empty().append(img);
  }
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;input id=<span class="hljs-string">"img_input"</span> type=<span class="hljs-string">"file"</span> accept=<span class="hljs-string">"image/*"</span>/&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"img_input"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span></span>
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"preview_box"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

.preview_box img {
  <span class="hljs-attr">width</span>: <span class="hljs-number">200</span>px;
}

$(<span class="hljs-string">"#img_input"</span>).on(<span class="hljs-string">"change"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{

  <span class="hljs-keyword">var</span> file = e.target.files[<span class="hljs-number">0</span>]; <span class="hljs-comment">//获取图片资源</span>

  <span class="hljs-comment">// 只选择图片文件</span>
  <span class="hljs-keyword">if</span> (!file.type.match(<span class="hljs-string">'image.*'</span>)) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }

  <span class="hljs-keyword">var</span> reader = <span class="hljs-keyword">new</span> FileReader();

  reader.readAsDataURL(file); <span class="hljs-comment">// 读取文件</span>

  <span class="hljs-comment">// 渲染文件</span>
  reader.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arg</span>) </span>{

    <span class="hljs-keyword">var</span> img = <span class="hljs-string">'&lt;img class="preview" src="'</span> + arg.target.result + <span class="hljs-string">'" alt="preview"/&gt;'</span>;
    $(<span class="hljs-string">".preview_box"</span>).empty().append(img);
  }
});
</code></pre>
<p>上传到服务器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var form_data = new FormData();
var file_data = $(&quot;#img_input&quot;).prop(&quot;files&quot;)[0];

// 把上传的数据放入form_data
form_data.append(&quot;user&quot;, &quot;Mike&quot;);
form_data.append(&quot;img&quot;, file_data);

$.ajax({
    type: &quot;POST&quot;, // 上传文件要用POST
    url: &quot;&quot;,
    dataType : &quot;json&quot;,
    crossDomain: true, // 如果用到跨域，需要后台开启CORS
  processData: false,  // 注意：不要 process data
  contentType: false,  // 注意：不设置 contentType
    data: form_data
}).success(function(msg) {
    console.log(msg);
}).fail(function(msg) {
    console.log(msg);
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> form_data = <span class="hljs-keyword">new</span> FormData();
<span class="hljs-keyword">var</span> file_data = $(<span class="hljs-string">"#img_input"</span>).prop(<span class="hljs-string">"files"</span>)[<span class="hljs-number">0</span>];

<span class="hljs-comment">// 把上传的数据放入form_data</span>
form_data.append(<span class="hljs-string">"user"</span>, <span class="hljs-string">"Mike"</span>);
form_data.append(<span class="hljs-string">"img"</span>, file_data);

$.ajax({
    <span class="hljs-attr">type</span>: <span class="hljs-string">"POST"</span>, <span class="hljs-comment">// 上传文件要用POST</span>
    url: <span class="hljs-string">""</span>,
    <span class="hljs-attr">dataType</span> : <span class="hljs-string">"json"</span>,
    <span class="hljs-attr">crossDomain</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 如果用到跨域，需要后台开启CORS</span>
  processData: <span class="hljs-literal">false</span>,  <span class="hljs-comment">// 注意：不要 process data</span>
  contentType: <span class="hljs-literal">false</span>,  <span class="hljs-comment">// 注意：不设置 contentType</span>
    data: form_data
}).success(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>) </span>{
    <span class="hljs-built_in">console</span>.log(msg);
}).fail(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>) </span>{
    <span class="hljs-built_in">console</span>.log(msg);
});
</code></pre>
<h2 id="articleHeader3">拖拽上传</h2>
<p>三个相关事件：</p>
<ul>
<li><p>dragenter</p></li>
<li><p>dragover</p></li>
<li><p>drop</p></li>
</ul>
<p>原生JavaScript：</p>
<p><a href="https://codepen.io/younglaker/pen/vGmaYr" rel="nofollow noreferrer" target="_blank">Demo2</a><button class="btn btn-xs btn-default ml10 preview" data-url="younglaker/pen/vGmaYr" data-typeid="3">点击预览</button></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;drop_zone&quot;>Drop files here</div>
<ul id=&quot;list&quot;></ul>


// 必须阻止dragenter和dragover事件的默认行为，这样才能触发 drop 事件
function fileSelect(evt) {

  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.dataTransfer.files; // 文件对象
  var output = [];

  // 处理多文件
  for (var i = 0, f; f = files[i]; i++) {
    output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                f.size, ' bytes, last modified: ',
                f.lastModifiedDate.toLocaleDateString(), '</li>');
  }
  // 显示文件信息
  document.getElementById('list').innerHTML = output.join('');
}

function dragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy';
}

// 监听器
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', dragOver, false);
dropZone.addEventListener('drop', fileSelect, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>&lt;div id=<span class="hljs-string">"drop_zone"</span>&gt;Drop files here&lt;/div&gt;
&lt;ul id=<span class="hljs-string">"list"</span>&gt;&lt;/ul&gt;


<span class="hljs-comment">// 必须阻止dragenter和dragover事件的默认行为，这样才能触发 drop 事件</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fileSelect</span><span class="hljs-params">(evt)</span> </span>{

  evt.stopPropagation();
  evt.preventDefault();

  <span class="hljs-keyword">var</span> files = evt.dataTransfer.files; <span class="hljs-comment">// 文件对象</span>
  <span class="hljs-keyword">var</span> output = [];

  <span class="hljs-comment">// 处理多文件</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, f; f = files[i]; i++) {
    output.push(<span class="hljs-string">'&lt;li&gt;&lt;strong&gt;'</span>, escape(f.name), <span class="hljs-string">'&lt;/strong&gt; ('</span>, f.type || <span class="hljs-string">'n/a'</span>, <span class="hljs-string">') - '</span>,
                f.size, <span class="hljs-string">' bytes, last modified: '</span>,
                f.lastModifiedDate.toLocaleDateString(), <span class="hljs-string">'&lt;/li&gt;'</span>);
  }
  <span class="hljs-comment">// 显示文件信息</span>
  document.getElementById(<span class="hljs-string">'list'</span>).innerHTML = output.join(<span class="hljs-string">''</span>);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dragOver</span><span class="hljs-params">(evt)</span> </span>{
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = <span class="hljs-string">'copy'</span>;
}

<span class="hljs-comment">// 监听器</span>
<span class="hljs-keyword">var</span> dropZone = document.getElementById(<span class="hljs-string">'drop_zone'</span>);
dropZone.addEventListener(<span class="hljs-string">'dragover'</span>, dragOver, <span class="hljs-literal">false</span>);
dropZone.addEventListener(<span class="hljs-string">'drop'</span>, fileSelect, <span class="hljs-literal">false</span>);</code></pre>
<p>jQuery：</p>
<p>其他代码可以不变，注意监听事件的时候的，由于jQuery的封装，数据存放的字段有变，传参是<code>e.originalEvent</code>而不是<code>e</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;#drop_zone&quot;).on('dragover', function(e){
  e.stopPropagation();
  e.preventDefault();
  handleDragOver(e.originalEvent);
});

$(&quot;#drop_zone&quot;).on('drop', function(e){
  e.stopPropagation();
  e.preventDefault();
  handleFileSelect(e.originalEvent);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">"#drop_zone"</span>).on(<span class="hljs-string">'dragover'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  e.stopPropagation();
  e.preventDefault();
  handleDragOver(e.originalEvent);
});

$(<span class="hljs-string">"#drop_zone"</span>).on(<span class="hljs-string">'drop'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  e.stopPropagation();
  e.preventDefault();
  handleFileSelect(e.originalEvent);
});</code></pre>
<h2 id="articleHeader4">美化上传框</h2>
<h3 id="articleHeader5">方法一： 在隐藏的文件输入框上调用click()方法</h3>
<p>隐藏掉默认的的文件输入框<code>&lt;input&gt;</code>元素，使用自定义的界面来充当打开文件选择对话框的按钮。要使用样式<code>display:none</code>把原本的文件输入框隐藏掉，然后在需要的时候调用它的click()方法就行了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;file&quot; id=&quot;fileElem&quot; multiple accept=&quot;image/*&quot; style=&quot;display：none&quot; onchange=&quot;handleFiles(this.files)&quot;>
<a href=&quot;#&quot; id=&quot;fileSelect&quot;>选择文件</a>

var fileSelect = document.getElementById(&quot;fileSelect&quot;),
  fileElem = document.getElementById(&quot;fileElem&quot;);

fileSelect.addEventListener(&quot;click&quot;, function (e) {
  if (fileElem) {
    fileElem.click();  // jQuery可以使用 trigger()
  }
  e.preventDefault(); // prevent navigation to &quot;#&quot;
}, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;input type=<span class="hljs-string">"file"</span> id=<span class="hljs-string">"fileElem"</span> multiple accept=<span class="hljs-string">"image/*"</span> style=<span class="hljs-string">"display：none"</span> onchange=<span class="hljs-string">"handleFiles(this.files)"</span>&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"fileSelect"</span>&gt;</span>选择文件<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span>

<span class="hljs-keyword">var</span> fileSelect = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"fileSelect"</span>),
  fileElem = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"fileElem"</span>);

fileSelect.addEventListener(<span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
  <span class="hljs-keyword">if</span> (fileElem) {
    fileElem.click();  <span class="hljs-comment">// jQuery可以使用 trigger()</span>
  }
  e.preventDefault(); <span class="hljs-comment">// prevent navigation to "#"</span>
}, <span class="hljs-literal">false</span>);</code></pre>
<h3 id="articleHeader6">方法二：用label</h3>
<p>隐藏input，把样式写到label上，点击label就是对input进行操作。</p>
<p><a href="https://codepen.io/younglaker/pen/vGmaYr" rel="nofollow noreferrer" target="_blank">Demo3</a><button class="btn btn-xs btn-default ml10 preview" data-url="younglaker/pen/vGmaYr" data-typeid="3">点击预览</button></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input id=&quot;img_input2&quot; type=&quot;file&quot; accept=&quot;image/*&quot;/>
<label for=&quot;img_input2&quot; id=&quot;img_label2&quot;>选择文件
    <i class=&quot;fa fa-plus fa-lg&quot;></i>
</label>
<div id=&quot;preview_box2&quot;></div>


#img_input2 {
  display: none;
}
#img_label2 {
  background-color: #f2d547;
  border-radius: 5px;
  display: inline-block;
  padding: 10px;
}
#preview_box2 img {
  width: 200px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">input</span> id=<span class="hljs-string">"img_input2"</span> type=<span class="hljs-string">"file"</span> accept=<span class="hljs-string">"image/*"</span>/&gt;
&lt;<span class="hljs-selector-tag">label</span> <span class="hljs-keyword">for</span>=<span class="hljs-string">"img_input2"</span> id=<span class="hljs-string">"img_label2"</span>&gt;选择文件
    &lt;<span class="hljs-selector-tag">i</span> class=<span class="hljs-string">"fa fa-plus fa-lg"</span>&gt;&lt;/i&gt;
&lt;/label&gt;
&lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">"preview_box2"</span>&gt;&lt;/div&gt;


<span class="hljs-selector-id">#img_input2</span> {
  <span class="hljs-attribute">display</span>: none;
}
<span class="hljs-selector-id">#img_label2</span> {
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#f2d547</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-id">#preview_box2</span> <span class="hljs-selector-tag">img</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HTML5上传图片文件（含拖拽、预览、上传、美化）

## 原文链接
[https://segmentfault.com/a/1190000004924160](https://segmentfault.com/a/1190000004924160)

