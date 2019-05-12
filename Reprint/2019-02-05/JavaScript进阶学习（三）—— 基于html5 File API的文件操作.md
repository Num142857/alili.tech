---
title: 'JavaScript进阶学习（三）—— 基于html5 File API的文件操作' 
date: 2019-02-05 2:30:09
hidden: true
slug: 9wunadrxegf
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><strong>文章来源：小青年原创</strong><br><strong>发布时间：2016-08-16</strong><br><strong>关键词：blob，File，FileReader，DataURI，URL</strong><br><strong>转载需标注本文原始地址: <a href="http://zhaomenghuan.github.io/#!/blog/20160816" rel="nofollow noreferrer" target="_blank">http://zhaomenghuan.github.io...</a></strong></p></blockquote>
<h2 id="articleHeader0">写在前面</h2>
<p>这段时间一直有朋友在问文件上传下载的事，搜一下论坛发现相关的问题不少，但是不够系统，本着为人民服务的态度本文试着将一些问题整理一下，争取用初学者可以更明确的去处理相关的问题。文件上传是开发中绕不过的一个坎儿，对于很多没有经验的人来说，简直懵逼，目前我所知道的上传方式有下面这几种：</p>
<ul>
<li>传统flash上传</li>
<li>隐藏iframe框上传</li>
<li>表单数据提交</li>
<li>HTML5的新工具——File API</li>
</ul>
<p>本文限于篇幅先介绍最后一种使用html5 File API进行文件上传的相关细节。</p>
<blockquote><p>历史上，JavaScript无法处理二进制数据。如果一定要处理的话，只能使用charCodeAt()方法，一个个字节地从文字编码转成二进制数据，还有一种办法是将二进制数据转成Base64编码，再进行处理。这两种方法不仅速度慢，而且容易出错。ECMAScript 5引入了Blob对象，允许直接操作二进制数据。Blob对象是一个代表二进制数据的基本对象，在它的基础上，又衍生出一系列相关的API，用来操作文件。</p></blockquote>
<h2 id="articleHeader1">File API</h2>
<blockquote><p>File 接口提供了文件的信息，以及文件内容的存取方法。</p></blockquote>
<p>File对象可以用来获取某个文件的信息，还可以用来读取这个文件的内容。通常情况下，File对象是来自用户在一个&lt;input&gt;元素上选择文件后返回的FileList对象,也可以是来自由拖放操作生成的 DataTransfer对象.</p>
<h3 id="articleHeader2">通过input file标签选择文件</h3>
<p>默认的input file标签比较难看，需要自己改造，一般无非是将input file设置宽高，然后使用overflow: hidden;将多余的部分隐藏，在上面再盖一个美化的按钮或者提示语，如下图：</p>
<p>浏览器原生的效果：</p>
<p><span class="img-wrap"><img data-src="/img/bVBRk8?w=234&amp;h=64" src="https://static.alili.tech/img/bVBRk8?w=234&amp;h=64" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>经过美化的效果：<br><span class="img-wrap"><img data-src="/img/bVBRlg?w=451&amp;h=101" src="https://static.alili.tech/img/bVBRlg?w=451&amp;h=101" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
    <head>
        <meta charset=&quot;UTF-8&quot;>
        <title></title>
        <style type=&quot;text/css&quot;>
            *{
                margin: 0px;
                padding: 0px;
            }
            .filePicker{
                width: 160px;
                height: 44px;
                line-height: 44px;
                text-align: center;
                color: #fff;
                background: #00b7ee;        
            }
            .filePicker input[type=&quot;file&quot;] {
                position: relative;
                top: -44px;
                left: 0px;
                width: 160px;
                height: 44px;
                opacity: 0;
                cursor: pointer;
                overflow: hidden;
                z-index: 0;
            }
            
            .container{
                width: 160px;
                margin: 30px auto;
            }
        </style>
    </head>
    <body>
        <div class=&quot;container&quot;>
            <input type=&quot;file&quot; name=&quot;&quot; id=&quot;&quot; value=&quot;&quot; />
        </div>    
        <div class=&quot;container&quot;>
            <div class=&quot;filePicker&quot;>
                <label>点击选择文件</label>
                <input id=&quot;fileInput&quot; type=&quot;file&quot; name=&quot;file&quot; multiple=&quot;multiple&quot; accept=&quot;image/*&quot;>
            </div>
        </div>
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
            *{
                <span class="hljs-attribute">margin</span>: <span class="hljs-number">0px</span>;
                <span class="hljs-attribute">padding</span>: <span class="hljs-number">0px</span>;
            }
            <span class="hljs-selector-class">.filePicker</span>{
                <span class="hljs-attribute">width</span>: <span class="hljs-number">160px</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">44px</span>;
                <span class="hljs-attribute">line-height</span>: <span class="hljs-number">44px</span>;
                <span class="hljs-attribute">text-align</span>: center;
                <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
                <span class="hljs-attribute">background</span>: <span class="hljs-number">#00b7ee</span>;        
            }
            <span class="hljs-selector-class">.filePicker</span> <span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type="file"]</span> {
                <span class="hljs-attribute">position</span>: relative;
                <span class="hljs-attribute">top</span>: -<span class="hljs-number">44px</span>;
                <span class="hljs-attribute">left</span>: <span class="hljs-number">0px</span>;
                <span class="hljs-attribute">width</span>: <span class="hljs-number">160px</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">44px</span>;
                <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
                <span class="hljs-attribute">cursor</span>: pointer;
                <span class="hljs-attribute">overflow</span>: hidden;
                <span class="hljs-attribute">z-index</span>: <span class="hljs-number">0</span>;
            }
            
            <span class="hljs-selector-class">.container</span>{
                <span class="hljs-attribute">width</span>: <span class="hljs-number">160px</span>;
                <span class="hljs-attribute">margin</span>: <span class="hljs-number">30px</span> auto;
            }
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">""</span> <span class="hljs-attr">id</span>=<span class="hljs-string">""</span> <span class="hljs-attr">value</span>=<span class="hljs-string">""</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>    
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"filePicker"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>点击选择文件<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"fileInput"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">multiple</span>=<span class="hljs-string">"multiple"</span> <span class="hljs-attr">accept</span>=<span class="hljs-string">"image/*"</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>我们可以通过给input file标签设置accept属性进行文件选择过滤，该属性的值必须为一个逗号分割的列表,包含了多个唯一的内容类型声明：</p>
<ul>
<li>以 STOP 字符 (U+002E) 开始的文件扩展名。（例如：".jpg,.png,.doc"）</li>
<li>一个有效的 MIME 类型，但没有扩展名</li>
<li>audio/* 表示音频文件 HTML5</li>
<li>video/* 表示视频文件 HTML5</li>
<li>image/* 表示图片文件</li>
</ul>
<p>设置multiple属性可以进行设置为多选。</p>
<p>设置capture属性可以进行设置打开摄像拍照或者录像。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Capture Image: 
<input type=&quot;file&quot; accept=&quot;image/*&quot; capture=&quot;camera&quot;> 
Capture Audio: 
<input type=&quot;file&quot; accept=&quot;audio/*&quot; capture=&quot;microphone&quot;> 
Capture Video: 
<input type=&quot;file&quot; accept=&quot;video/*&quot; capture=&quot;camcorder&quot;> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">Capture</span> Image: 
&lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"file"</span> accept=<span class="hljs-string">"image/*"</span> <span class="hljs-keyword">capture</span>=<span class="hljs-string">"camera"</span>&gt; 
<span class="hljs-keyword">Capture</span> Audio: 
&lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"file"</span> accept=<span class="hljs-string">"audio/*"</span> <span class="hljs-keyword">capture</span>=<span class="hljs-string">"microphone"</span>&gt; 
<span class="hljs-keyword">Capture</span> Video: 
&lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"file"</span> accept=<span class="hljs-string">"video/*"</span> <span class="hljs-keyword">capture</span>=<span class="hljs-string">"camcorder"</span>&gt; </code></pre>
<p>multiple属性和capture属性不能同时生效。</p>
<p>通过File API,我们可以在用户选取一个或者多个文件之后,访问到代表了所选文件的一个或多个File对象，这些对象被包含在一个FileList对象中。所有type属性(attribute)为file的&lt;input&gt;元素都有一个files属性，用来存储用户所选择的文件。files有一个length属性和item方法，我们可以通过files[index]或者files.item(index)获取我们选择的file对象。可以通过change事件监听input file输入完成事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fileInput = document.getElementById(&quot;fileInput&quot;);
fileInput.addEventListener('change', function(event) {
    var file = fileInput.files[0];
    // 或file = fileInput.files.item(0);
    console.log(file);
}, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> fileInput = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"fileInput"</span>);
fileInput.addEventListener(<span class="hljs-string">'change'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
    <span class="hljs-keyword">var</span> file = fileInput.files[<span class="hljs-number">0</span>];
    <span class="hljs-comment">// 或file = fileInput.files.item(0);</span>
    <span class="hljs-built_in">console</span>.log(file);
}, <span class="hljs-literal">false</span>);</code></pre>
<p>File API提供File对象，它是FileList对象的成员，包含了文件的一些元信息，比如文件名、上次改动时间、文件大小和文件类型。下图可以File对象的属性：</p>
<p><span class="img-wrap"><img data-src="/img/bVBRlF?w=765&amp;h=146" src="https://static.alili.tech/img/bVBRlF?w=765&amp;h=146" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>lastModifiedDate：文件对象最后修改的日期</li>
<li>name：文件名,只读字符串,不包含任何路径信息.</li>
<li>size：文件大小,单位为字节,只读的64位整数.</li>
<li>type：MIME类型,只读字符串,如果类型未知,则返回空字符串.</li>
</ul>
<p>例如：我们可以根据size换算出我们习惯的文件大小表达方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 读文件大小
 * @param {Object} file
 */
function readFileSize(file){
    var size = file.size / 1024;
    var aMultiples = [&quot;KB&quot;, &quot;MB&quot;, &quot;GB&quot;, &quot;TB&quot;, &quot;PB&quot;, &quot;EB&quot;, &quot;ZB&quot;, &quot;YB&quot;];
    
    var fileSizeString = '';
    for(var i = 0; size > 1; size /= 1024, i++) {
       fileSizeString = size.toFixed(2) + &quot; &quot; + aMultiples[i];
    }
    return fileSizeString;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">/**
 * 读文件大小
 * @param {Object} file
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">readFileSize</span>(<span class="hljs-params">file</span>)</span>{
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">size</span> = file.size / <span class="hljs-number">1024</span>;
    <span class="hljs-built_in">var</span> aMultiples = [<span class="hljs-string">"KB"</span>, <span class="hljs-string">"MB"</span>, <span class="hljs-string">"GB"</span>, <span class="hljs-string">"TB"</span>, <span class="hljs-string">"PB"</span>, <span class="hljs-string">"EB"</span>, <span class="hljs-string">"ZB"</span>, <span class="hljs-string">"YB"</span>];
    
    <span class="hljs-built_in">var</span> fileSizeString = <span class="hljs-string">''</span>;
    <span class="hljs-keyword">for</span>(<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>; <span class="hljs-built_in">size</span> &gt; <span class="hljs-number">1</span>; <span class="hljs-built_in">size</span> /= <span class="hljs-number">1024</span>, i++) {
       fileSizeString = <span class="hljs-built_in">size</span>.toFixed(<span class="hljs-number">2</span>) + <span class="hljs-string">" "</span> + aMultiples[i];
    }
    <span class="hljs-keyword">return</span> fileSizeString;
}</code></pre>
<p>有时候我们希望限制用户上传的文件大小，可以通过这个方法先做判断。同时我们可以通过type属性判断用户的文件类型，但是这种方法不可靠，因为用户可以通过改变后缀名实现。</p>
<p>很多新手企图通过input file标签获得文件完整路径，由于浏览器安全机制，这个是不被允许的，但是有时候我们希望选择完图片预览一下图片，这个时候我们就可以用FileReader API实现。</p>
<h3 id="articleHeader3">通过拖放操作选择文件</h3>
<p><strong>预览效果</strong>：</p>
<p><span class="img-wrap"><img data-src="/img/bVBRlM?w=343&amp;h=454" src="https://static.alili.tech/img/bVBRlM?w=343&amp;h=454" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>代码实现</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
    <head>
        <meta charset=&quot;UTF-8&quot;>
        <title></title>
        <style type=&quot;text/css&quot;>
            .dropbox{
                width: 300px;
                height: 300px;
                margin: 20px;
                border: 3px dashed #e6e6e6;
            }
            .area{
                margin: 100px auto;
                width: 100px;
                height: 100px;
                background-repeat: no-repeat;
                background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABLCAIAAAB7tddWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1Q0VBNzA0MjEyMDUxMUUzODk2Q0JFM0Q1RjE4QkExQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1Q0VBNzA0MzEyMDUxMUUzODk2Q0JFM0Q1RjE4QkExQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAzNDA2MkY1MTIwMzExRTM4OTZDQkUzRDVGMThCQTFDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAzNDA2MkY2MTIwMzExRTM4OTZDQkUzRDVGMThCQTFDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+K6izdgAAAvpJREFUeNrsnFmPqkAQhWmX667gEp9c/v+/MkSDG+4LrvdcSYgRbw/0ALZQ9WBUJOn+uqvqHGCG3e93hUJRUoSAQBAIAkEgCASBIBAE4neRicEcII51Xb/dbnjPGOt0OqlUKok7ApN3jIKwY6DUIBAEgkAQCALho/X47TeXy8U0TcuyrtdrZKPs9/v2m8FgINYgf9QX/gTV+Xw2DCNKBJKmxmKxsAVc0kEcDgfyGq8CNp/Pa5qWy+WiHG6v13v7/XPt6Ha7Al5D3HQ1Go1sNkvtU8lkMsmtESSoCASBSFqEW/DQ0tbr9W63O51OKK6FQkFV1XQ6nSwQ0OOTyQSvjknZbDaA0mq1QCQafSFFasxmM4eCE1Do0+lUQrcSFggsPhzq20NgsVqtkpIax+MxMs+C/aXruvMxaonND75J9W5hUWWxuYAVdRfTg8EplUphGJywQPAFuBd5Dlhw/aDwwgVtCDgCdzph1QisG+dosVjkn44WYxjGC4XnvBuNRtvt9gtA2Hv47SGsZKVS4ef8eDzG4vMVCrpSgEU3xPbZbDar1erLl1AQ7XabU8xAAXvB3XffBnIHwkR2QcUYq9fr5XIZOxkTg6BEkeNLKdQF7AWPFBy1AoUmu8RG/HmE91nxM+J/ORIr07VcLvf7feCt+stAQGIBRNJtOJolDAhdj/hXGj5+u+TzIKAF+MbkK00XFta2BhDRUE0/9gv8Elogbu4TBW8+nyPhHSeuaVqtVuNQC6TzyQUCXsg0TbfyAxfIKogr9ynP1GJyYQZ57qbg7AuIRfclKZwSlDqWBQSmxM9zFALYh+fFBwJJSkNgqeFxSrAPw+EQ9QJew7Is2Sj8FgSW2nu1gylYPkKRMsRTA+4IcjA2fxsnDkLOq/IfACFP54uP1yAQBIJAEIh4gWCPkHk+GJ7AjU/fICJ+qlIghEfoDwQMtRjvyLYDRih4rsDT+bBM9tP5kuhrzN++e6SqqvCdYUb/SIO6BoEgEASCQBAIAkEgCEQg8VeAAQAB1bbO2qoeewAAAABJRU5ErkJggg==&quot;);
            }
            
            #preview img{
                width: 100px;
                height: 100px;
            }
        </style>
    </head>
    <body>
        <div id=&quot;dropbox&quot; class=&quot;dropbox&quot;>
            <div class=&quot;area&quot;></div>
        </div>
        <div id=&quot;preview&quot;></div>
        
        <script type=&quot;text/javascript&quot;>
            var dropbox = document.getElementById(&quot;dropbox&quot;);
            var preview = document.getElementById(&quot;preview&quot;);
            
            dropbox.addEventListener(&quot;dragenter&quot;, function(e){
                e.stopPropagation();
                  e.preventDefault();
            }, false);
            
            dropbox.addEventListener(&quot;dragover&quot;, function(e){
                e.stopPropagation();
                  e.preventDefault();
            }, false);
            
            dropbox.addEventListener(&quot;drop&quot;, function(e){
                e.stopPropagation();
                  e.preventDefault();
            
                  var dt = e.dataTransfer;
                  var files = dt.files;
                  
                  for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    var imageType = /^image\//;

                    if ( !imageType.test(file.type) ) {
                          continue;
                    }
                    
                    // 填充选择的图片到展示区
                    var img = document.createElement(&quot;img&quot;);
                    img.classList.add(&quot;obj&quot;);
                    img.file = file;
                    preview.appendChild(img);
                    
                    // 读取File对象中的内容
                    var reader = new FileReader();
                    reader.onload = (function(aImg) { 
                      return function(e) { 
                        aImg.src = e.target.result; 
                      }; 
                    })(img);
                    reader.readAsDataURL(file);
                }
            }, false);
        </script>
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
            <span class="hljs-selector-class">.dropbox</span>{
                <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
                <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span>;
                <span class="hljs-attribute">border</span>: <span class="hljs-number">3px</span> dashed <span class="hljs-number">#e6e6e6</span>;
            }
            <span class="hljs-selector-class">.area</span>{
                <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
                <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
                <span class="hljs-attribute">background-repeat</span>: no-repeat;
                <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABLCAIAAAB7tddWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1Q0VBNzA0MjEyMDUxMUUzODk2Q0JFM0Q1RjE4QkExQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1Q0VBNzA0MzEyMDUxMUUzODk2Q0JFM0Q1RjE4QkExQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAzNDA2MkY1MTIwMzExRTM4OTZDQkUzRDVGMThCQTFDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAzNDA2MkY2MTIwMzExRTM4OTZDQkUzRDVGMThCQTFDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+K6izdgAAAvpJREFUeNrsnFmPqkAQhWmX667gEp9c/v+/MkSDG+4LrvdcSYgRbw/0ALZQ9WBUJOn+uqvqHGCG3e93hUJRUoSAQBAIAkEgCASBIBAE4neRicEcII51Xb/dbnjPGOt0OqlUKok7ApN3jIKwY6DUIBAEgkAQCALho/X47TeXy8U0TcuyrtdrZKPs9/v2m8FgINYgf9QX/gTV+Xw2DCNKBJKmxmKxsAVc0kEcDgfyGq8CNp/Pa5qWy+WiHG6v13v7/XPt6Ha7Al5D3HQ1Go1sNkvtU8lkMsmtESSoCASBSFqEW/DQ0tbr9W63O51OKK6FQkFV1XQ6nSwQ0OOTyQSvjknZbDaA0mq1QCQafSFFasxmM4eCE1Do0+lUQrcSFggsPhzq20NgsVqtkpIax+MxMs+C/aXruvMxaonND75J9W5hUWWxuYAVdRfTg8EplUphGJywQPAFuBd5Dlhw/aDwwgVtCDgCdzph1QisG+dosVjkn44WYxjGC4XnvBuNRtvt9gtA2Hv47SGsZKVS4ef8eDzG4vMVCrpSgEU3xPbZbDar1erLl1AQ7XabU8xAAXvB3XffBnIHwkR2QcUYq9fr5XIZOxkTg6BEkeNLKdQF7AWPFBy1AoUmu8RG/HmE91nxM+J/ORIr07VcLvf7feCt+stAQGIBRNJtOJolDAhdj/hXGj5+u+TzIKAF+MbkK00XFta2BhDRUE0/9gv8Elogbu4TBW8+nyPhHSeuaVqtVuNQC6TzyQUCXsg0TbfyAxfIKogr9ynP1GJyYQZ57qbg7AuIRfclKZwSlDqWBQSmxM9zFALYh+fFBwJJSkNgqeFxSrAPw+EQ9QJew7Is2Sj8FgSW2nu1gylYPkKRMsRTA+4IcjA2fxsnDkLOq/IfACFP54uP1yAQBIJAEIh4gWCPkHk+GJ7AjU/fICJ+qlIghEfoDwQMtRjvyLYDRih4rsDT+bBM9tP5kuhrzN++e6SqqvCdYUb/SIO6BoEgEASCQBAIAkEgCEQg8VeAAQAB1bbO2qoeewAAAABJRU5ErkJggg=="</span>);
            }
            
            <span class="hljs-selector-id">#preview</span> <span class="hljs-selector-tag">img</span>{
                <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            }
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"dropbox"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"dropbox"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"area"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"preview"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
            <span class="hljs-keyword">var</span> dropbox = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"dropbox"</span>);
            <span class="hljs-keyword">var</span> preview = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"preview"</span>);
            
            dropbox.addEventListener(<span class="hljs-string">"dragenter"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
                e.stopPropagation();
                  e.preventDefault();
            }, <span class="hljs-literal">false</span>);
            
            dropbox.addEventListener(<span class="hljs-string">"dragover"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
                e.stopPropagation();
                  e.preventDefault();
            }, <span class="hljs-literal">false</span>);
            
            dropbox.addEventListener(<span class="hljs-string">"drop"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
                e.stopPropagation();
                  e.preventDefault();
            
                  <span class="hljs-keyword">var</span> dt = e.dataTransfer;
                  <span class="hljs-keyword">var</span> files = dt.files;
                  
                  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; files.length; i++) {
                    <span class="hljs-keyword">var</span> file = files[i];
                    <span class="hljs-keyword">var</span> imageType = <span class="hljs-regexp">/^image\//</span>;

                    <span class="hljs-keyword">if</span> ( !imageType.test(file.type) ) {
                          <span class="hljs-keyword">continue</span>;
                    }
                    
                    <span class="hljs-comment">// 填充选择的图片到展示区</span>
                    <span class="hljs-keyword">var</span> img = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"img"</span>);
                    img.classList.add(<span class="hljs-string">"obj"</span>);
                    img.file = file;
                    preview.appendChild(img);
                    
                    <span class="hljs-comment">// 读取File对象中的内容</span>
                    <span class="hljs-keyword">var</span> reader = <span class="hljs-keyword">new</span> FileReader();
                    reader.onload = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">aImg</span>) </span>{ 
                      <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{ 
                        aImg.src = e.target.result; 
                      }; 
                    })(img);
                    reader.readAsDataURL(file);
                }
            }, <span class="hljs-literal">false</span>);
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>在这个例子中，ID 为 dropbox 的元素所在的区域是我们的拖放目的区域。我们需要在该元素上绑定 dragenter，dragover，和drop 事件。我们必须阻止dragenter和dragover事件的默认行为，这样才能触发 drop 事件。我们从drop 事件对象中获取到dataTransfer对象，这个对象包含Filelist对象。</p>
<h2 id="articleHeader4">FileReader API</h2>
<blockquote><p>使用FileReader对象,web应用程序可以异步的读取存储在用户计算机上的文件(或者原始数据缓冲)内容,可以使用File对象或者Blob对象来指定所要处理的文件或数据.其中File对象可以是来自用户在一个&lt;input&gt;元素上选择文件后返回的FileList对象,也可以来自拖放操作生成的 DataTransfer对象,还可以是来自在一个HTMLCanvasElement上执行mozGetAsFile()方法后的返回结果。</p></blockquote>
<h3 id="articleHeader5">DataURI对象</h3>
<p>在上面通过拖放操作选择文件的例子中，我们使用了"data:image/png;base64,xxxxxxxxxxxxx"这种形式的字符串作为背景，而不是图片，选择的图片展示也是使用这种形式。这种字符串叫做DataURI对象，允许将一个小文件进行编码后嵌入到另外一个文档里，格式为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data:[<MIME type>][;charset=<charset>][;base64],<encoded data>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code style="word-break: break-word; white-space: initial;">data:[<span class="hljs-string">&lt;MIME type&gt;</span>][<span class="hljs-symbol">;charset=&lt;charset&gt;</span>][<span class="hljs-string">;base64</span>],<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">encoded</span> <span class="hljs-attr">data</span>&gt;</span></span></code></pre>
<p>整体可以视为三部分，即声明：参数+数据，逗号左边的是各种参数，右边的是数据。</p>
<p>URL是uniform resource locator的缩写，在web中的每一个可访问资源都有一个URL地址，例如图片，HTML文件，js文件以及style sheet文件，我们可以通过这个地址去download这个资源。其实URL是URI的子集，URI是uniform resource identifier的缩写。URI是用于获取资源，包括其附加的信息的一种协议。附加信息可能是地址，也可能不是地址，如果是地址，那么这时URI就变成URL了。注意的是data URI不是URL，因为它并不包含资源的公共地址。</p>
<p>我们可以通过FileReader 的readAsDataURL方法获得：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reader = new FileReader();
reader.onload = function() {
    console.log(this.result);
}
reader.readAsDataURL(file);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> reader = <span class="hljs-keyword">new</span> FileReader();
reader.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.result);
}
reader.readAsDataURL(file);</code></pre>
<p>有时候我们需要将DataURI对象转blob对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * dataURI 转 blob
 * @param {Object} dataURI
 */
function dataURItoBlob(dataURI) {
    var arr = dataURI.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * dataURI 转 blob
 * @param {Object} dataURI
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dataURItoBlob</span>(<span class="hljs-params">dataURI</span>) </span>{
    <span class="hljs-keyword">var</span> arr = dataURI.split(<span class="hljs-string">','</span>), mime = arr[<span class="hljs-number">0</span>].match(<span class="hljs-regexp">/:(.*?);/</span>)[<span class="hljs-number">1</span>],
    bstr = atob(arr[<span class="hljs-number">1</span>]), n = bstr.length, u8arr = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Uint8Array</span>(n);
    <span class="hljs-keyword">while</span>(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Blob([u8arr], {<span class="hljs-attr">type</span>:mime});
}</code></pre>
<h3 id="articleHeader6">URL对象</h3>
<p>我们除了可以使用base64字符串作为内容的DataURI将一个文件嵌入到另外一个文档里，还可以使用URL对象。URL对象用于生成指向File对象或Blob对象的URL。</p>
<blockquote><p>window.URL.createObjectURL</p></blockquote>
<p>静态方法会创建一个 DOMString，它的 URL 表示参数中的对象。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示着指定的 File 对象或者 Blob 对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var objecturl =  window.URL.createObjectURL(file);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> objecturl =  <span class="hljs-keyword">window</span>.URL.createObjectURL(<span class="hljs-keyword">file</span>);</code></pre>
<blockquote><p>window.URL.revokeObjectURL</p></blockquote>
<p>静态方法用来释放一个之前通过调用 window.URL.createObjectURL() 创建的已经存在的 URL 对象。当你结束使用某个 URL 对象时，应该通过调用这个方法来让浏览器知道不再需要保持这个文件的引用了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.URL.revokeObjectURL(objecturl)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">window<span class="hljs-selector-class">.URL</span><span class="hljs-selector-class">.revokeObjectURL</span>(objecturl)</code></pre>
<p>例如：使用对象URL来显示图片：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.URL = window.URL || window.webkitURL;

var img = document.createElement(&quot;img&quot;);
img.src = window.URL.createObjectURL(blob);
img.height = 60;
img.onload = function(e) {
    window.URL.revokeObjectURL(this.src);
}
document.body.appendChild(img);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.URL = <span class="hljs-built_in">window</span>.URL || <span class="hljs-built_in">window</span>.webkitURL;

<span class="hljs-keyword">var</span> img = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"img"</span>);
img.src = <span class="hljs-built_in">window</span>.URL.createObjectURL(blob);
img.height = <span class="hljs-number">60</span>;
img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-built_in">window</span>.URL.revokeObjectURL(<span class="hljs-keyword">this</span>.src);
}
<span class="hljs-built_in">document</span>.body.appendChild(img);</code></pre>
<h3 id="articleHeader7">FileReader API详解</h3>
<h4>状态常量</h4>
<ul>
<li>
<strong>EMPTY</strong>：值为0，还没有加载任何数据;</li>
<li>
<strong>LOADING</strong>：值为1，数据正在被加载;</li>
<li>
<strong>DONE</strong>：值为2，已完成全部的读取请求。</li>
</ul>
<h4>属性</h4>
<ul>
<li>
<strong>error</strong>：在读取文件时发生的错误， 只读;</li>
<li>
<strong>readyState</strong>：表明FileReader对象的当前状态，值为State constants中的一个，只读；</li>
<li>
<strong>result</strong>：取到的文件内容，这个属性只在读取操作完成之后才有效,并且数据的格式取决于读取操作是由哪个方法发起的，只读。</li>
</ul>
<h4>方法</h4>
<ul>
<li>
<strong>abort()</strong>：中止该读取操作.在返回时,readyState属性的值为DONE.</li>
<li>
<strong>readAsArrayBuffer()</strong>：开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个ArrayBuffer对象以表示所读取文件的内容.</li>
<li>
<strong>readAsBinaryString()</strong>：开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含所读取文件的原始二进制数据.</li>
<li>
<strong>readAsDataURL()</strong>：开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.</li>
<li>
<strong>readAsText()</strong>：开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个字符串以表示所读取的文件内容.</li>
</ul>
<h4>事件处理</h4>
<ul>
<li>
<strong>onabort</strong>：当读取操作被中止时调用.</li>
<li>
<strong>onerror</strong>：当读取操作发生错误时调用.</li>
<li>
<strong>onload</strong>：当读取操作成功完成时调用.</li>
<li>
<strong>onloadend</strong>：当读取操作完成时调用,不管是成功还是失败.该处理程序在onload或者onerror之后调用.</li>
<li>
<strong>onloadstart</strong>：当读取操作将要开始之前调用.</li>
<li>
<strong>onprogress</strong>：在读取数据过程中周期性调用.</li>
</ul>
<p><strong>上传实例</strong>：以二进制流上传文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fileInput = document.getElementById(&quot;fileInput&quot;);
fileInput.addEventListener('change', function(event) {
    var file = fileInput.files[0];
    if (file) {
        var reader = new FileReader();  
        var xhr = new XMLHttpRequest();
        xhr.onprogress=function(e){
            var percentage = Math.round((e.loaded * 100) / e.total);
            console.log(&quot;percentage:&quot;+percentage);
        }
        xhr.onload=function(e){
            console.log(&quot;percentage:100&quot;);
        }
        xhr.open(&quot;POST&quot;, &quot;这里填写服务器地址&quot;);  
        reader.onload = function(evt) {
            xhr.send(evt.target.result);
        };
        reader.readAsBinaryString(file);
    }
});         " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> fileInput = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"fileInput"</span>);
fileInput.addEventListener(<span class="hljs-string">'change'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
    <span class="hljs-keyword">var</span> file = fileInput.files[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">if</span> (file) {
        <span class="hljs-keyword">var</span> reader = <span class="hljs-keyword">new</span> FileReader();  
        <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
        xhr.onprogress=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
            <span class="hljs-keyword">var</span> percentage = <span class="hljs-built_in">Math</span>.round((e.loaded * <span class="hljs-number">100</span>) / e.total);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"percentage:"</span>+percentage);
        }
        xhr.onload=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"percentage:100"</span>);
        }
        xhr.open(<span class="hljs-string">"POST"</span>, <span class="hljs-string">"这里填写服务器地址"</span>);  
        reader.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">evt</span>) </span>{
            xhr.send(evt.target.result);
        };
        reader.readAsBinaryString(file);
    }
});         </code></pre>
<h2 id="articleHeader8">blob 二进制大对象</h2>
<p>BLOB (binary large object)，二进制大对象，是一个可以存储二进制文件的容器。</p>
<blockquote><p>创建Blob对象的方法有几种，可以调用Blob构造函数，还可以使用一个已有Blob对象上的slice()方法切出另一个Blob对象，还可以调用canvas对象上的toBlob方法。</p></blockquote>
<p>第一次见到这个词是半年之前，那个时候居然没有听过blob，然后上网查了一下，巴拉巴拉一大堆，当时是不理解的。</p>
<p>看了前面的一系列API和对象，或许很多同学开始晕了，但是在一开始说到的blob对象，我们一直没有提到，如果本文不提及，显然是不合理的。毕竟作为File对象的爸爸，blob劳苦功高。上述的FileReader对象也可以操作blob对象。</p>
<p>Blob对象有两个只读属性：</p>
<ul>
<li>size：二进制数据的大小，单位为字节。</li>
<li>type：二进制数据的MIME类型，全部为小写，如果类型未知，则该值为空字符串。<br>在Ajax操作中，如果xhr.responseType设为blob，接收的就是二进制数据。</li>
</ul>
<h3 id="articleHeader9">Blob 构造函数生成blob对象</h3>
<p>Blob构造函数，接受两个参数。第一个参数是一个包含实际数据的数组，第二个参数是数据的类型，这两个参数都不是必需的。数组元素可以是任意多个的ArrayBuffer，ArrayBufferView (typed array)， Blob，或者 DOMString对象。<br>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = ['<h1>hello world</h1>'];
var blob = new Blob(arr, { &quot;type&quot; : &quot;text/xml&quot; }); // the blob
console.log(blob);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">'&lt;h1&gt;hello world&lt;/h1&gt;'</span>];
<span class="hljs-keyword">var</span> blob = <span class="hljs-keyword">new</span> Blob(arr, { <span class="hljs-string">"type"</span> : <span class="hljs-string">"text/xml"</span> }); <span class="hljs-comment">// the blob</span>
<span class="hljs-built_in">console</span>.log(blob);</code></pre>
<p>效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVBRmh?w=401&amp;h=63" src="https://static.alili.tech/img/bVBRmh?w=401&amp;h=63" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>用JS在浏览器中创建下载文件</h4>
<p>前端很多项目中，都有文件下载的需求，特别是JS生成文件内容，然后让浏览器执行下载操作（例如在线图片编辑、在线代码编辑、iPresst等）但受限于浏览器，很多情况下我们都只能给出个链接，让用户点击打开-》另存为。如下面这个链接：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;file.js&quot;>file.js</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">a</span> href=<span class="hljs-string">"file.js"</span>&gt;<span class="hljs-built_in">file</span>.js&lt;/<span class="hljs-keyword">a</span>&gt;</code></pre>
<p>用户点击这个链接的时候，浏览器会打开并显示链接指向的文件内容，显然，这并没有实现我们的需求。HTML5中给a标签增加了一个download属性，只要有这个属性，点击这个链接时浏览器就不在打开链接指向的文件，而是改为下载（目前只有chrome、firefox和opera支持）。下载时会直接使用链接的名字来作为文件名，但是是可以改的，只要给download加上想要的文件名即可，如：<code>download="not-a-file.js"</code>。但是这样还不够，以上的方法只适合用在文件是在服务器上的情况。如果在浏览器端js生成的内容，想让浏览器进行下载要如何办到呢？DataURI可以实现这个效果，但是DataURI的文件类型被限制了，我们这里可以变通一下实现blob对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a id=&quot;aLink&quot;>下载</a>
<script type=&quot;text/javascript&quot;>
    function downloadFile (el, fileName, content) {
        var aLink = document.querySelector(el);
        var blob = new Blob([content]);                
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(blob);
    }
    document.querySelector('#aLink').addEventListener('click',function () {
        downloadFile('#aLink', 'hello.txt', '<h1>hello world</h1>');
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"aLink"</span>&gt;</span>下载<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">downloadFile</span> (<span class="hljs-params">el, fileName, content</span>) </span>{
        <span class="hljs-keyword">var</span> aLink = <span class="hljs-built_in">document</span>.querySelector(el);
        <span class="hljs-keyword">var</span> blob = <span class="hljs-keyword">new</span> Blob([content]);                
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(blob);
    }
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#aLink'</span>).addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        downloadFile(<span class="hljs-string">'#aLink'</span>, <span class="hljs-string">'hello.txt'</span>, <span class="hljs-string">'&lt;h1&gt;hello world&lt;/h1&gt;'</span>);
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader10">Blob对象的slice方法生成blob对象</h3>
<p>Blob对象的slice方法，将二进制数据按照字节分块，返回一个新的Blob对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var newBlob = oldBlob.slice(startingByte, endindByte);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Blob</span> = oldBlob.slice(startingByte, endindByte);</code></pre>
<p>下面是一个使用XMLHttpRequest对象，将大文件分割上传的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function upload(blobOrFile) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/server', true);
  xhr.onload = function(e) { ... };
  xhr.send(blobOrFile);
}

document.querySelector('input[type=&quot;file&quot;]').addEventListener('change', function(e) {
  var blob = this.files[0];

  const BYTES_PER_CHUNK = 1024 * 1024; // 1MB chunk sizes.
  const SIZE = blob.size;

  var start = 0;
  var end = BYTES_PER_CHUNK;

  while(start < SIZE) {
    upload(blob.slice(start, end));

    start = end;
    end = start + BYTES_PER_CHUNK;
  }
}, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">upload</span>(<span class="hljs-params">blobOrFile</span>) </span>{
  <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
  xhr.open(<span class="hljs-string">'POST'</span>, <span class="hljs-string">'/server'</span>, <span class="hljs-literal">true</span>);
  xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{ ... };
  xhr.send(blobOrFile);
}

<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'input[type="file"]'</span>).addEventListener(<span class="hljs-string">'change'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
  <span class="hljs-keyword">var</span> blob = <span class="hljs-keyword">this</span>.files[<span class="hljs-number">0</span>];

  <span class="hljs-keyword">const</span> BYTES_PER_CHUNK = <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>; <span class="hljs-comment">// 1MB chunk sizes.</span>
  <span class="hljs-keyword">const</span> SIZE = blob.size;

  <span class="hljs-keyword">var</span> start = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">var</span> end = BYTES_PER_CHUNK;

  <span class="hljs-keyword">while</span>(start &lt; SIZE) {
    upload(blob.slice(start, end));

    start = end;
    end = start + BYTES_PER_CHUNK;
  }
}, <span class="hljs-literal">false</span>);</code></pre>
<h2 id="articleHeader11">参考文档</h2>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Using_files_from_web_applications" rel="nofollow noreferrer" target="_blank">在web应用中使用文件</a><br><a href="http://aiyouu.net/data-uris-explained/" rel="nofollow noreferrer" target="_blank">DataURI详解</a><br><a href="http://javascript.ruanyifeng.com/htmlapi/file.html" rel="nofollow noreferrer" target="_blank">文件和二进制数据的操作</a><br><a href="http://www.zhangxinxu.com/wordpress/2013/10/understand-domstring-document-formdata-blob-file-arraybuffer/" rel="nofollow noreferrer" target="_blank">理解DOMString、Document、FormData、Blob、File、ArrayBuffer数据类型</a><br><a href="http://www.jb51.net/article/47723.htm" rel="nofollow noreferrer" target="_blank">用JS在浏览器中创建下载文件</a></p>
<p>写文章不容易，也许写这些代码就几分钟的事，写一篇大家好接受的文章或许需要几天的酝酿，然后加上几天的码字，累并快乐着。如果文章对您有帮助请我喝杯咖啡吧！</p>
<p><span class="img-wrap"><img data-src="/img/bVMMoV?w=612&amp;h=384" src="https://static.alili.tech/img/bVMMoV?w=612&amp;h=384" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript进阶学习（三）—— 基于html5 File API的文件操作

## 原文链接
[https://segmentfault.com/a/1190000006600936](https://segmentfault.com/a/1190000006600936)

