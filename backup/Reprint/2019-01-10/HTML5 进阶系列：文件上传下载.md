---
title: 'HTML5 进阶系列：文件上传下载' 
date: 2019-01-10 2:30:08
hidden: true
slug: xf29e6cjpy
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>HTML5 中提供的文件API在前端中有着丰富的应用，上传、下载、读取内容等在日常的交互中很常见。而且在各个浏览器的兼容也比较好，包括移动端，除了 IE 只支持 IE10 以上的版本。想要更好地掌握好操作文件的功能，先要熟悉每个API。</p>
<h2 id="articleHeader1">FileList 对象和 file 对象</h2>
<p>HTML 中的 input[type="file"] 标签有个 multiple 属性，允许用户选择多个文件，FileList对象则就是表示用户选择的文件列表。这个列表中的每一个文件，就是一个 file 对象。</p>
<p>file 对象的属性：</p>
<ul>
<li><p>name : 文件名，不包含路径。</p></li>
<li><p>type : 文件类型。图片类型的文件都会以 image/ 开头，可以由此来限制只允许上传图片。</p></li>
<li><p>size : 文件大小。可以根据文件大小来进行其他操作。</p></li>
<li><p>lastModified : 文件最后修改的时间。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;file&quot; id=&quot;files&quot; multiple>
<script>
    var elem = document.getElementById('files');
    elem.onchange = function (event) {
        var files = event.target.files;
        for (var i = 0; i < files.length; i++) {
            // 文件类型为 image 并且文件大小小于 200kb
            if(files[i].type.indexOf('image/') !== -1 &amp;&amp; files[i].size < 204800){
                console.log(files[i].name);
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"files"</span> <span class="hljs-attr">multiple</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> elem = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'files'</span>);
    elem.onchange = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
        <span class="hljs-keyword">var</span> files = event.target.files;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; files.length; i++) {
            <span class="hljs-comment">// 文件类型为 image 并且文件大小小于 200kb</span>
            <span class="hljs-keyword">if</span>(files[i].type.indexOf(<span class="hljs-string">'image/'</span>) !== <span class="hljs-number">-1</span> &amp;&amp; files[i].size &lt; <span class="hljs-number">204800</span>){
                <span class="hljs-built_in">console</span>.log(files[i].name);
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>input 中有个 accept 属性，可以用来规定能够通过文件上传进行提交的文件类型。</p>
<p>accept="image/*" 可以用来限制只允许上传图像格式。但是在 Webkit 浏览器下却出现了响应滞慢的问题，要等上好几秒才弹出文件选择框。</p>
<p>解决方法就是将 * 通配符改为指定的 MIME 类型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;file&quot; accept=&quot;image/gif,image/jpeg,image/jpg,image/png&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">accept</span>=<span class="hljs-string">"image/gif,image/jpeg,image/jpg,image/png"</span>&gt;</span></code></pre>
<h2 id="articleHeader2">Blob 对象</h2>
<p>Blob 对象相当于一个容器，可以用于存放二进制数据。它有两个属性，size 属性表示字节长度，type 属性表示 MIME 类型。</p>
<h3 id="articleHeader3">如何创建</h3>
<p>Blob 对象可以使用 Blob() 构造函数来创建。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var blob = new Blob(['hello'], {type:&quot;text/plain&quot;});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> blob = <span class="hljs-keyword">new</span> Blob([<span class="hljs-string">'hello'</span>], {<span class="hljs-attr">type</span>:<span class="hljs-string">"text/plain"</span>});</code></pre>
<p>Blob 构造函数中的第一个参数是一个数组，可以存放 ArrayBuffer对象、ArrayBufferView 对象、Blob对象和字符串。</p>
<p>Blob 对象可以通过 slice() 方法来返回一个新的 Blob 对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var newblob = blob.slice(0,5, {type:&quot;text/plain&quot;});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> newblob = blob.slice(<span class="hljs-number">0</span>,<span class="hljs-number">5</span>, {<span class="hljs-attr">type</span>:<span class="hljs-string">"text/plain"</span>});</code></pre>
<p>slice() 方法使用三个参数，均为可选。第一个参数代表要从Blob对象中的二进制数据的起始位置开始复制，第二个参数代表复制的结束位置，第三个参数为 Blob 对象的 MIME 类型。</p>
<p>canvas.toBlob() 也可以创建 Blob 对象。toBlob() 使用三个参数，第一个为回调函数，第二个为图片类型，默认为 image/png，第三个为图片质量，值在0到1之间。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvas = document.getElementById('canvas');
canvas.toBlob(function(blob){ console.log(blob); }, &quot;image/jpeg&quot;, 0.5);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvas'</span>);
canvas.toBlob(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">blob</span>)</span>{ <span class="hljs-built_in">console</span>.log(blob); }, <span class="hljs-string">"image/jpeg"</span>, <span class="hljs-number">0.5</span>);</code></pre>
<h3 id="articleHeader4">下载文件</h3>
<p>Blod 对象可以通过 window.URL 对象生成一个网络地址，结合 a 标签的 download 属性来实现下载文件功能。</p>
<p>比如把 canvas 下载为一个图片文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvas = document.getElementById('canvas');
canvas.toBlob(function(blob){
    // 使用 createObjectURL 生成地址，格式为 blob:null/fd95b806-db11-4f98-b2ce-5eb16b38ba36
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.download = 'canvas';
    a.href = url;
    // 模拟a标签点击进行下载
    a.click();
    // 下载后告诉浏览器不再需要保持这个文件的引用了
    URL.revokeObjectURL(url);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvas'</span>);
canvas.toBlob(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">blob</span>)</span>{
    <span class="hljs-comment">// 使用 createObjectURL 生成地址，格式为 blob:null/fd95b806-db11-4f98-b2ce-5eb16b38ba36</span>
    <span class="hljs-keyword">var</span> url = URL.createObjectURL(blob);
    <span class="hljs-keyword">var</span> a = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'a'</span>);
    a.download = <span class="hljs-string">'canvas'</span>;
    a.href = url;
    <span class="hljs-comment">// 模拟a标签点击进行下载</span>
    a.click();
    <span class="hljs-comment">// 下载后告诉浏览器不再需要保持这个文件的引用了</span>
    URL.revokeObjectURL(url);
});</code></pre>
<p>也可以将字符串保存为一个文本文件，方法类似。</p>
<h2 id="articleHeader5">FileReader 对象</h2>
<p>FileReader 对象主要用来把文件读入内存，并且读取文件中的数据。通过构造函数创建一个 FileReader 对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reader = new FileReader();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> reader = <span class="hljs-keyword">new</span> FileReader();</code></pre>
<p>该对象有以下方法：</p>
<ul>
<li><p>abort：中断读取操作。</p></li>
<li><p>readAsArrayBuffer：读取文件内容到ArrayBuffer对象中。</p></li>
<li><p>readAsBinaryString：将文件读取为二进制数据。</p></li>
<li><p>readAsDataURL：将文件读取为data: URL格式的字符串。</p></li>
<li><p>readAsText：将文件读取为文本。</p></li>
</ul>
<h3 id="articleHeader6">上传图片预览</h3>
<p>在常见的应用就是在客户端上传图片之后通过 readAsDataURL() 来显示图片。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;file&quot; id=&quot;files&quot; accept=&quot;image/jpeg,image/jpg,image/png&quot;>
<img src=&quot;blank.gif&quot; id=&quot;preview&quot;>
<script>
    var elem = document.getElementById('files'),
        img = document.getElementById('preview');
    elem.onchange = function () {
        var files = elem.files,
            reader = new FileReader();
        if(files &amp;&amp; files[0]){
            reader.onload = function (ev) {
                img.src = ev.target.result;
            }
            reader.readAsDataURL(files[0]);
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"files"</span> <span class="hljs-attr">accept</span>=<span class="hljs-string">"image/jpeg,image/jpg,image/png"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"blank.gif"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"preview"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> elem = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'files'</span>),
        img = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'preview'</span>);
    elem.onchange = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> files = elem.files,
            reader = <span class="hljs-keyword">new</span> FileReader();
        <span class="hljs-keyword">if</span>(files &amp;&amp; files[<span class="hljs-number">0</span>]){
            reader.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ev</span>) </span>{
                img.src = ev.target.result;
            }
            reader.readAsDataURL(files[<span class="hljs-number">0</span>]);
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>但是在一些手机上竖着拍照上传照片时会有bug，会发现照片倒了，包括三星和iPhone。。。解决方案这里不做讲解，有兴趣可以查看：<a href="https://github.com/lin-xin/blog/issues/18" rel="nofollow noreferrer" target="_blank">移动端图片上传旋转、压缩的解决方案</a></p>
<h3 id="articleHeader7">数据备份与恢复</h3>
<p>FileReader 对象的 readAsText() 可以读取文件的文本，结合 Blob 对象下载文件的功能，那就可以实现将数据导出文件备份到本地，当数据要恢复时，通过 input 把备份文件上传，使用 readAsText() 读取文本，恢复数据。</p>
<p>代码跟上面功能类似，这里不重复，具体的应用可以参考：<a href="https://github.com/lin-xin/notepad" rel="nofollow noreferrer" target="_blank">notepad</a></p>
<h2 id="articleHeader8">Base64 编码</h2>
<p>在 HTML5 中新增了 atob 和 btoa 方法来支持 Base64 编码。它们的命名也很简单，b to a 和 a to b，即代表着编码和解码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = &quot;https://lin-xin.github.io&quot;;
var b = btoa(a);
var c = atob(b);

console.log(a);     // https://lin-xin.github.io
console.log(b);     // aHR0cHM6Ly9saW4teGluLmdpdGh1Yi5pbw==
console.log(c);     // https://lin-xin.github.io" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = <span class="hljs-string">"https://lin-xin.github.io"</span>;
<span class="hljs-keyword">var</span> b = btoa(a);
<span class="hljs-keyword">var</span> c = atob(b);

<span class="hljs-built_in">console</span>.log(a);     <span class="hljs-comment">// https://lin-xin.github.io</span>
<span class="hljs-built_in">console</span>.log(b);     <span class="hljs-comment">// aHR0cHM6Ly9saW4teGluLmdpdGh1Yi5pbw==</span>
<span class="hljs-built_in">console</span>.log(c);     <span class="hljs-comment">// https://lin-xin.github.io</span></code></pre>
<p>btoa 方法对字符串 a 进行编码，不会改变 a 的值，返回一个编码后的值。<br>atob 方法对编码后的字符串进行解码。</p>
<p>但是参数中带中文，已经超出了8位ASCII编码的字符范围，浏览器就会报错。所以需要先对中文进行 encodeURIComponent 编码处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = &quot;哈喽 世界&quot;;
var b = btoa(encodeURIComponent(a));
var c = decodeURIComponent(atob(b));

console.log(b);     // JUU1JTkzJTg4JUU1JTk2JUJEJTIwJUU0JUI4JTk2JUU3JTk1JThD
console.log(c);     // 哈喽 世界" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = <span class="hljs-string">"哈喽 世界"</span>;
<span class="hljs-keyword">var</span> b = btoa(<span class="hljs-built_in">encodeURIComponent</span>(a));
<span class="hljs-keyword">var</span> c = <span class="hljs-built_in">decodeURIComponent</span>(atob(b));

<span class="hljs-built_in">console</span>.log(b);     <span class="hljs-comment">// JUU1JTkzJTg4JUU1JTk2JUJEJTIwJUU0JUI4JTk2JUU3JTk1JThD</span>
<span class="hljs-built_in">console</span>.log(c);     <span class="hljs-comment">// 哈喽 世界</span></code></pre>
<h3 id="articleHeader9">更多文章：<a href="https://github.com/lin-xin/blog/" rel="nofollow noreferrer" target="_blank">lin-xin/blog</a>
</h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HTML5 进阶系列：文件上传下载

## 原文链接
[https://segmentfault.com/a/1190000010020914](https://segmentfault.com/a/1190000010020914)

