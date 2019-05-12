---
title: '细说Web API中的Blob' 
date: 2018-12-28 2:30:11
hidden: true
slug: 4hdwerjdk9m
categories: [reprint]
---

{{< raw >}}

                    
<p>在一般的Web开发中，很少会用到Blob，但Blob可以满足一些场景下的特殊需求。Blob，Binary Large Object的缩写，代表二进制类型的大对象。Blob的概念在一些数据库中有使用到，例如，MYSQL中的BLOB类型就表示二进制数据的容器。在Web中，Blob类型的对象表示不可变的类似文件对象的原始数据，通俗点说，就是Blob对象是二进制数据，但它是类似文件对象的二进制数据，因此可以像操作File对象一样操作Blob对象，实际上，File继承自Blob。</p>
<h2 id="articleHeader0">Blob基本用法</h2>
<h3 id="articleHeader1">创建</h3>
<p>可以通过Blob的构造函数创建Blob对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Blob(blobParts[, options])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">Blob</span><span class="hljs-params">(blobParts[, options])</span></span></code></pre>
<p>参数说明：</p>
<p>blobParts：数组类型，数组中的每一项连接起来构成Blob对象的数据，数组中的每项元素可以是<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer" rel="nofollow noreferrer" target="_blank"><code>ArrayBuffer</code></a>, <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/ArrayBufferView" rel="nofollow noreferrer" target="_blank"><code>ArrayBufferView</code></a>, <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Blob" rel="nofollow noreferrer" target="_blank"><code>Blob</code></a>, <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString" rel="nofollow noreferrer" target="_blank"><code>DOMString</code></a> 。</p>
<p>options：可选项，字典格式类型，可以指定如下两个属性：</p>
<ul>
<li>type，默认值为 <code>""</code>，它代表了将会被放入到blob中的数组内容的MIME类型。</li>
<li>endings，默认值为"transparent"，用于指定包含行结束符<code>\n</code>的字符串如何被写入。 它是以下两个值中的一个： "native"，表示行结束符会被更改为适合宿主操作系统文件系统的换行符； "transparent"，表示会保持blob中保存的结束符不变。</li>
</ul>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var data1 = &quot;a&quot;;
    var data2 = &quot;b&quot;;
    var data3 = &quot;<div style='color:red;'>This is a blob</div>&quot;;
    var data4 = { &quot;name&quot;: &quot;abc&quot; };

    var blob1 = new Blob([data1]);
    var blob2 = new Blob([data1, data2]);
    var blob3 = new Blob([data3]);
    var blob4 = new Blob([JSON.stringify(data4)]);
    var blob5 = new Blob([data4]);
    var blob6 = new Blob([data3, data4]);

    console.log(blob1);  //输出：Blob {size: 1, type: &quot;&quot;}
    console.log(blob2);  //输出：Blob {size: 2, type: &quot;&quot;}
    console.log(blob3);  //输出：Blob {size: 44, type: &quot;&quot;}
    console.log(blob4);  //输出：Blob {size: 14, type: &quot;&quot;}
    console.log(blob5);  //输出：Blob {size: 15, type: &quot;&quot;}
    console.log(blob6);  //输出：Blob {size: 59, type: &quot;&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>    var data1 = <span class="hljs-string">"a"</span><span class="hljs-comment">;</span>
    var data2 = <span class="hljs-string">"b"</span><span class="hljs-comment">;</span>
    var data3 = <span class="hljs-string">"&lt;div style='color:red;'&gt;This is a blob&lt;/div&gt;"</span><span class="hljs-comment">;</span>
    var data4 = { <span class="hljs-string">"name"</span>: <span class="hljs-string">"abc"</span> }<span class="hljs-comment">;</span>

    var <span class="hljs-keyword">blob1 </span>= new <span class="hljs-keyword">Blob([data1]);
</span>    var <span class="hljs-keyword">blob2 </span>= new <span class="hljs-keyword">Blob([data1, </span>data2])<span class="hljs-comment">;</span>
    var <span class="hljs-keyword">blob3 </span>= new <span class="hljs-keyword">Blob([data3]);
</span>    var <span class="hljs-keyword">blob4 </span>= new <span class="hljs-keyword">Blob([JSON.stringify(data4)]);
</span>    var <span class="hljs-keyword">blob5 </span>= new <span class="hljs-keyword">Blob([data4]);
</span>    var <span class="hljs-keyword">blob6 </span>= new <span class="hljs-keyword">Blob([data3, </span>data4])<span class="hljs-comment">;</span>

    console.log(<span class="hljs-keyword">blob1); </span> //输出：<span class="hljs-keyword">Blob </span>{size: <span class="hljs-number">1</span>, type: <span class="hljs-string">""</span>}
    console.log(<span class="hljs-keyword">blob2); </span> //输出：<span class="hljs-keyword">Blob </span>{size: <span class="hljs-number">2</span>, type: <span class="hljs-string">""</span>}
    console.log(<span class="hljs-keyword">blob3); </span> //输出：<span class="hljs-keyword">Blob </span>{size: <span class="hljs-number">44</span>, type: <span class="hljs-string">""</span>}
    console.log(<span class="hljs-keyword">blob4); </span> //输出：<span class="hljs-keyword">Blob </span>{size: <span class="hljs-number">14</span>, type: <span class="hljs-string">""</span>}
    console.log(<span class="hljs-keyword">blob5); </span> //输出：<span class="hljs-keyword">Blob </span>{size: <span class="hljs-number">15</span>, type: <span class="hljs-string">""</span>}
    console.log(<span class="hljs-keyword">blob6); </span> //输出：<span class="hljs-keyword">Blob </span>{size: <span class="hljs-number">59</span>, type: <span class="hljs-string">""</span>}</code></pre>
<p>size代表<code>Blob</code> 对象中所包含数据的字节数。这里要注意，使用字符串和普通对象创建Blob时的不同，blob4使用通过<code>JSON.stringify</code>把data4对象转换成json字符串，blob5则直接使用data4创建，两个对象的size分别为14和15。blob4的size等于14很容易理解，因为JSON.stringify(data4)的结果为：<code>"{"name":"abc"}"</code>，正好14个字节(不包含最外层的引号)。blob5的size等于15是如何计算而来的呢？实际上，当使用普通对象创建Blob对象时，相当于调用了普通对象的toString()方法得到字符串数据，然后再创建Blob对象。所以，blob5保存的数据是<code>"[object Object]"</code>，是15个字节(不包含最外层的引号)。</p>
<h3 id="articleHeader2">slice方法</h3>
<p>Blob对象有一个slice方法，返回一个新的 <code>Blob</code>对象，包含了源 <code>Blob</code>对象中指定范围内的数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="slice([start[, end[, contentType]]])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs inform7"><code style="word-break: break-word; white-space: initial;">slice(<span class="hljs-comment">[start<span class="hljs-comment">[, end<span class="hljs-comment">[, contentType]</span>]</span>]</span>)</code></pre>
<p>参数说明：</p>
<p>start： 可选，代表 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Blob" rel="nofollow noreferrer" target="_blank"><code>Blob</code></a> 里的下标，表示第一个会被会被拷贝进新的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Blob" rel="nofollow noreferrer" target="_blank"><code>Blob</code></a> 的字节的起始位置。如果传入的是一个负数，那么这个偏移量将会从数据的末尾从后到前开始计算。</p>
<p>end： 可选，代表的是 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Blob" rel="nofollow noreferrer" target="_blank"><code>Blob</code></a> 的一个下标，这个下标-1的对应的字节将会是被拷贝进新的<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Blob" rel="nofollow noreferrer" target="_blank"><code>Blob</code></a> 的最后一个字节。如果你传入了一个负数，那么这个偏移量将会从数据的末尾从后到前开始计算。</p>
<p>contentType： 可选，给新的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Blob" rel="nofollow noreferrer" target="_blank"><code>Blob</code></a> 赋予一个新的文档类型。这将会把它的 type 属性设为被传入的值。它的默认值是一个空的字符串。</p>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var data = &quot;abcdef&quot;;
    var blob1 = new Blob([data]);
    var blob2 = blob1.slice(0,3);
    
    console.log(blob1);  //输出：Blob {size: 6, type: &quot;&quot;}
    console.log(blob2);  //输出：Blob {size: 3, type: &quot;&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>    var <span class="hljs-meta">data</span> = <span class="hljs-string">"abcdef"</span><span class="hljs-comment">;</span>
    var <span class="hljs-keyword">blob1 </span>= new <span class="hljs-keyword">Blob([data]);
</span>    var <span class="hljs-keyword">blob2 </span>= <span class="hljs-keyword">blob1.slice(0,3);
</span>    
    console.log(<span class="hljs-keyword">blob1); </span> //输出：<span class="hljs-keyword">Blob </span>{size: <span class="hljs-number">6</span>, type: <span class="hljs-string">""</span>}
    console.log(<span class="hljs-keyword">blob2); </span> //输出：<span class="hljs-keyword">Blob </span>{size: <span class="hljs-number">3</span>, type: <span class="hljs-string">""</span>}</code></pre>
<p>通过slice方法，从blob1中创建出一个新的blob对象，size等于3。</p>
<h2 id="articleHeader3">Blob使用场景</h2>
<h3 id="articleHeader4">分片上传</h3>
<p>前面已经说过，File继承自Blob，因此我们可以调用slice方法对大文件进行分片长传。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function uploadFile(file) {
  var chunkSize = 1024 * 1024;   // 每片1M大小
  var totalSize = file.size;
  var chunkQuantity = Math.ceil(totalSize/chunkSize);  //分片总数
  var offset = 0;  // 偏移量
  
  var reader = new FileReader();
  reader.onload = function(e) {
    var xhr = new XMLHttpRequest();
    xhr.open(&quot;POST&quot;,&quot;http://xxxx/upload?fileName=&quot;+file.name);
    xhr.overrideMimeType(&quot;application/octet-stream&quot;);
    
    xhr.onreadystatechange = function() {
      if(xhr.readyState === XMLHttpRequest.DONE &amp;&amp; xhr.status === 200) {
        ++offset;
        if(offset === chunkQuantity) {
          alert(&quot;上传完成&quot;);
        } else if(offset === chunkQuantity-1){
          blob = file.slice(offset*chunkSize, totalSize);   // 上传最后一片
          reader.readAsBinaryString(blob);
        } else {
          blob = file.slice(offset*chunkSize, (offset+1)*chunkSize);   
          reader.readAsBinaryString(blob);
        }
      }else {
        alert(&quot;上传出错&quot;);
      }
    }
    
    if(xhr.sendAsBinary) {
      xhr.sendAsBinary(e.target.result);   // e.target.result是此次读取的分片二进制数据
    } else {
      xhr.send(e.target.result);
    }
  }
   var blob = file.slice(0, chunkSize);
   reader.readAsBinaryString(blob);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">uploadFile</span>(<span class="hljs-params">file</span>) </span>{
  <span class="hljs-keyword">var</span> chunkSize = <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>;   <span class="hljs-comment">// 每片1M大小</span>
  <span class="hljs-keyword">var</span> totalSize = file.size;
  <span class="hljs-keyword">var</span> chunkQuantity = <span class="hljs-built_in">Math</span>.ceil(totalSize/chunkSize);  <span class="hljs-comment">//分片总数</span>
  <span class="hljs-keyword">var</span> offset = <span class="hljs-number">0</span>;  <span class="hljs-comment">// 偏移量</span>
  
  <span class="hljs-keyword">var</span> reader = <span class="hljs-keyword">new</span> FileReader();
  reader.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
    xhr.open(<span class="hljs-string">"POST"</span>,<span class="hljs-string">"http://xxxx/upload?fileName="</span>+file.name);
    xhr.overrideMimeType(<span class="hljs-string">"application/octet-stream"</span>);
    
    xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">if</span>(xhr.readyState === XMLHttpRequest.DONE &amp;&amp; xhr.status === <span class="hljs-number">200</span>) {
        ++offset;
        <span class="hljs-keyword">if</span>(offset === chunkQuantity) {
          alert(<span class="hljs-string">"上传完成"</span>);
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(offset === chunkQuantity<span class="hljs-number">-1</span>){
          blob = file.slice(offset*chunkSize, totalSize);   <span class="hljs-comment">// 上传最后一片</span>
          reader.readAsBinaryString(blob);
        } <span class="hljs-keyword">else</span> {
          blob = file.slice(offset*chunkSize, (offset+<span class="hljs-number">1</span>)*chunkSize);   
          reader.readAsBinaryString(blob);
        }
      }<span class="hljs-keyword">else</span> {
        alert(<span class="hljs-string">"上传出错"</span>);
      }
    }
    
    <span class="hljs-keyword">if</span>(xhr.sendAsBinary) {
      xhr.sendAsBinary(e.target.result);   <span class="hljs-comment">// e.target.result是此次读取的分片二进制数据</span>
    } <span class="hljs-keyword">else</span> {
      xhr.send(e.target.result);
    }
  }
   <span class="hljs-keyword">var</span> blob = file.slice(<span class="hljs-number">0</span>, chunkSize);
   reader.readAsBinaryString(blob);
}</code></pre>
<p>这段代码还可以进一步丰富，比如显示当前的上传进度，使用多个XMLHttpRequest对象并行上传对象（需要传递分片数据的位置参数给服务器端）等。</p>
<h3 id="articleHeader5">Blob URL</h3>
<p>Blob URL是blob协议的URL，它的格式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="blob:http://XXX" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">blob:</span><span class="hljs-string">http:</span><span class="hljs-comment">//XXX</span></code></pre>
<p>Blob URL可以通过<code>URL.createObjectURL(blob)</code>创建。在绝大部分场景下，我们可以像使用Http协议的URL一样，使用Blob URL。常见的场景有：作为文件的下载地址和作为图片资源地址。</p>
<ul><li>文件下载地址</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Blob Test</title>
    <script>
        function createDownloadFile() {
            var content = &quot;Blob Data&quot;;
            var blob = new Blob([content]);
            var link = document.getElementsByTagName(&quot;a&quot;)[0];
            link.download = &quot;file&quot;;
            link.href = URL.createObjectURL(blob);
        }
        window.onload = createDownloadFile;
    </script>
</head>

<body>
    <a>下载</a>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Blob Test<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createDownloadFile</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> content = <span class="hljs-string">"Blob Data"</span>;
            <span class="hljs-keyword">var</span> blob = <span class="hljs-keyword">new</span> Blob([content]);
            <span class="hljs-keyword">var</span> link = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">"a"</span>)[<span class="hljs-number">0</span>];
            link.download = <span class="hljs-string">"file"</span>;
            link.href = URL.createObjectURL(blob);
        }
        <span class="hljs-built_in">window</span>.onload = createDownloadFile;
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>下载<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>点击下载按钮，浏览器将会下载一个名为file的文件，文件的内容是：Blob Data。通过Blob对象，我们在前端代码中就可以动态生成文件，提供给浏览器下载。打开Chrome浏览器调试窗口，在Elements标签下可以看到生成的Blob URL为：</p>
<p><span class="img-wrap"><img data-src="/img/bVWGkO?w=1854&amp;h=482" src="https://static.alili.tech/img/bVWGkO?w=1854&amp;h=482" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ul><li>图片资源地址</li></ul>
<p>为图片文件创建一个Blob URL，赋值给&lt;img&gt;标签：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Blob Test</title>
    <script>
        function handleFile(e) {
            var file = e.files[0];
            var blob = URL.createObjectURL(file);
            var img = document.getElementsByTagName(&quot;img&quot;)[0];
            img.src = blob;
            img.onload = function(e) {
                URL.revokeObjectURL(this.src);  // 释放createObjectURL创建的对象##
            }
        }
    </script>
</head>

<body>
    <input type=&quot;file&quot; accept=&quot;image/*&quot; onchange=&quot;handleFile(this)&quot; />
    <br/>
    <img style=&quot;width:200px;height:200px&quot;>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Blob Test<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleFile</span>(<span class="hljs-params">e</span>) </span>{
            <span class="hljs-keyword">var</span> file = e.files[<span class="hljs-number">0</span>];
            <span class="hljs-keyword">var</span> blob = URL.createObjectURL(file);
            <span class="hljs-keyword">var</span> img = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">"img"</span>)[<span class="hljs-number">0</span>];
            img.src = blob;
            img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
                URL.revokeObjectURL(<span class="hljs-keyword">this</span>.src);  <span class="hljs-comment">// 释放createObjectURL创建的对象##</span>
            }
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">accept</span>=<span class="hljs-string">"image/*"</span> <span class="hljs-attr">onchange</span>=<span class="hljs-string">"handleFile(this)"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:200px;height:200px"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>input中选择的图片会在&lt;img&gt;里显示出来，如图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVWGkY?w=1858&amp;h=1074" src="https://static.alili.tech/img/bVWGkY?w=1858&amp;h=1074" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>同时，可以在Network标签栏，发现这个Blob URL的请求信息：</p>
<p><span class="img-wrap"><img data-src="/img/bVWGkZ?w=1952&amp;h=640" src="https://static.alili.tech/img/bVWGkZ?w=1952&amp;h=640" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这个请求信息和平时我们使用的Http URL获取图片几乎完全一样。我们还可以使用Data URL加载图片资源：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Blob Test</title>
    <script>
        function handleFile(e) {
            var file = e.files[0];
            var fileReader = new FileReader();
            var img = document.getElementsByTagName(&quot;img&quot;)[0];
            fileReader.onload = function(e) {
                img.src = e.target.result;
            }
            fileReader.readAsDataURL(file);
        }
    </script>
</head>

<body>
    <input type=&quot;file&quot; accept=&quot;image/*&quot; onchange=&quot;handleFile(this)&quot; />
    <br/>
    <img style=&quot;width:200px;height:200px&quot;>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Blob Test<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleFile</span>(<span class="hljs-params">e</span>) </span>{
            <span class="hljs-keyword">var</span> file = e.files[<span class="hljs-number">0</span>];
            <span class="hljs-keyword">var</span> fileReader = <span class="hljs-keyword">new</span> FileReader();
            <span class="hljs-keyword">var</span> img = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">"img"</span>)[<span class="hljs-number">0</span>];
            fileReader.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
                img.src = e.target.result;
            }
            fileReader.readAsDataURL(file);
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">accept</span>=<span class="hljs-string">"image/*"</span> <span class="hljs-attr">onchange</span>=<span class="hljs-string">"handleFile(this)"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:200px;height:200px"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>FileReader的<code>readAsDataURL</code>生成一个Data URL，如图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVWGk3?w=1846&amp;h=1004" src="https://static.alili.tech/img/bVWGk3?w=1846&amp;h=1004" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>Data URL对大家来说应该并不陌生，Web性能优化中有一项措施：把小图片用base64编码直接嵌入到HTML文件中，实际上就是利用了Data URL来获取嵌入的图片数据。</p>
<p>那么Blob URL和Data URL有什么区别呢？</p>
<ol>
<li>Blob URL的长度一般比较短，但Data URL因为直接存储图片base64编码后的数据，往往很长，如上图所示，浏览器在显示Data URL时使用了省略号（…）。当显式大图片时，使用Blob URL能获取更好的可能性。</li>
<li>Blob URL可以方便的使用XMLHttpRequest获取源数据，例如：</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var blobUrl = URL.createObjectURL(new Blob(['Test'], {type: 'text/plain'}));
var x = new XMLHttpRequest();
// 如果设置x.responseType = 'blob'，将返回一个Blob对象，而不是文本:
// x.responseType = 'blob';
x.onload = function() {
    alert(x.responseText);   // 输出 Test
};
x.open('get', blobUrl);
x.send();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> blobUrl = URL.createObjectURL(<span class="hljs-keyword">new</span> Blob([<span class="hljs-string">'Test'</span>], {type: <span class="hljs-string">'text/plain'</span>}));
<span class="hljs-keyword">var</span> x = <span class="hljs-keyword">new</span> XMLHttpRequest();
<span class="hljs-comment">// 如果设置x.responseType = 'blob'，将返回一个Blob对象，而不是文本:</span>
<span class="hljs-comment">// x.responseType = 'blob';</span>
x.onload = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    alert(x.responseText);   <span class="hljs-comment">// 输出 Test</span>
};
x.open(<span class="hljs-string">'get'</span>, blobUrl);
x.send();</code></pre>
<p>对于Data URL，并不是所有浏览器都支持通过XMLHttpRequest获取源数据的。</p>
<p>3.<strong>Blob URL 只能在当前应用内部使用</strong>，把Blob URL复制到浏览器的地址栏中，是无法获取数据的。Data URL相比之下，就有很好的移植性，你可以在任意浏览器中使用。</p>
<p>除了可以用作图片资源的网络地址，Blob URL也可以用作其他资源的网络地址，例如html文件、json文件等，为了保证浏览器能正确的解析Blob URL返回的文件类型，需要在创建Blob对象时指定相应的type：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建HTML文件的Blob URL
var data = &quot;<div style='color:red;'>This is a blob</div>&quot;;
var blob = new Blob([data], { type: 'text/html' });
var blobURL = URL.createObjectURL(blob);

// 创建JSON文件的Blob URL
var data = { &quot;name&quot;: &quot;abc&quot; };
var blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
var blobURL = URL.createObjectURL(blob);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">// 创建HTML文件的Blob URL</span>
<span class="hljs-keyword">var</span> data = <span class="hljs-string">"&lt;div style='color:red;'&gt;This is a blob&lt;/div&gt;"</span>;
<span class="hljs-keyword">var</span> blob = <span class="hljs-keyword">new</span> <span class="hljs-type">Blob</span>([data], { <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-symbol">'text</span>/html' });
<span class="hljs-keyword">var</span> blobURL = <span class="hljs-type">URL</span>.createObjectURL(blob);

<span class="hljs-comment">// 创建JSON文件的Blob URL</span>
<span class="hljs-keyword">var</span> data = { <span class="hljs-string">"name"</span>: <span class="hljs-string">"abc"</span> };
<span class="hljs-keyword">var</span> blob = <span class="hljs-keyword">new</span> <span class="hljs-type">Blob</span>([<span class="hljs-type">JSON</span>.stringify(data)], { <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-symbol">'application</span>/json' });
<span class="hljs-keyword">var</span> blobURL = <span class="hljs-type">URL</span>.createObjectURL(blob);
</code></pre>
<hr>
<p><strong>欢迎关注我的公众号：老干部的大前端，领取21本大前端精选书籍！</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV4lGT?w=540&amp;h=193" src="https://static.alili.tech/img/bV4lGT?w=540&amp;h=193" alt="3808299627-5a93ba468b59a" title="3808299627-5a93ba468b59a" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
细说Web API中的Blob

## 原文链接
[https://segmentfault.com/a/1190000011563430](https://segmentfault.com/a/1190000011563430)

