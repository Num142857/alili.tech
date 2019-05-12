---
title: 'HTML5 拖拽批量上传文件' 
date: 2018-12-08 2:30:30
hidden: true
slug: pp0jna0p8p
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">拖拽批量上传文件夹</h2>
<blockquote>该组件基于 Vue.js 实现，UI 框架是 elementUI,完整的 demo 地址在<a href="https://github.com/Msxiaoma/upload-folder" rel="nofollow noreferrer" target="_blank">https://github.com/Msxiaoma/u...</a> 拖拽上传文件夹(仅仅chrome支持)</blockquote>
<h3 id="articleHeader1">一、组件描述</h3>
<ol>
<li>同时拖拽多个文件夹</li>
<li>删除指定文件夹</li>
<li>显示当前文件夹的上传进度条</li>
<li>超过5M的文件夹分片上传</li>
</ol>
<p>效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV6TD6?w=800&amp;h=519" src="https://static.alili.tech/img/bV6TD6?w=800&amp;h=519" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader2">二、遇到的问题</h3>
<ol>
<li>拖拽读取每个文件夹下面的文件路径</li>
<li>如何显示当前上传的文件夹的进度条</li>
<li>上传文件时跨域携带 cookie</li>
<li>文件夹分片</li>
</ol>
<h3 id="articleHeader3">三、解决过程</h3>
<h4>1. 拖拽读取每个文件夹下面的文件路径</h4>
<p>在进行拖放操作时， DataTransfer 对象用来保存，通过拖放动作，拖动到浏览器的数据。它可以保存一项或多项数据、一种或者多种数据类型</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 拖拽文件夹
dropFolders (e) {
  e.stopPropagation()
  e.preventDefault()
  var items = e.dataTransfer.items
  for (var i = 0; i < items.length; i++) {
    var item = items[i].webkitGetAsEntry()
    if (item) {
      this.checkFolders(item)
    }
  }
}

// 判断是否为文件夹
checkFolders (item) {
  if (item.isDirectory) {
    this.traverseFileTree(item)
  } else {
    this.$alert('只支持上传文件夹', '提示', {
      confirmButtonText: '确定'
    })
  }
}

traverseFileTree (item, path, parentDir) {
  path = path || ''
  if (item.isFile) {
    item.file((file) => {
        let obj = {
          file: file,
          path: path + file.name,
          attr: item.attr
        }
        this.filesList.push(obj)
    })
  } else if (item.isDirectory) {
    var dirReader = item.createReader()
    dirReader.readEntries((entries) => {
      for (let i = 0; i < entries.length; i++) {
        entries[i].attr = item.attr
        this.traverseFileTree(entries[i], path + item.name + '/', temp)
      }
    }, function (e) {
      console.log(e)
    })
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 拖拽文件夹</span>
dropFolders (e) {
  e.stopPropagation()
  e.preventDefault()
  <span class="hljs-keyword">var</span> items = e.dataTransfer.items
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; items.length; i++) {
    <span class="hljs-keyword">var</span> item = items[i].webkitGetAsEntry()
    <span class="hljs-keyword">if</span> (item) {
      <span class="hljs-keyword">this</span>.checkFolders(item)
    }
  }
}

<span class="hljs-comment">// 判断是否为文件夹</span>
checkFolders (item) {
  <span class="hljs-keyword">if</span> (item.isDirectory) {
    <span class="hljs-keyword">this</span>.traverseFileTree(item)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span>.$alert(<span class="hljs-string">'只支持上传文件夹'</span>, <span class="hljs-string">'提示'</span>, {
      <span class="hljs-attr">confirmButtonText</span>: <span class="hljs-string">'确定'</span>
    })
  }
}

traverseFileTree (item, path, parentDir) {
  path = path || <span class="hljs-string">''</span>
  <span class="hljs-keyword">if</span> (item.isFile) {
    item.file(<span class="hljs-function">(<span class="hljs-params">file</span>) =&gt;</span> {
        <span class="hljs-keyword">let</span> obj = {
          <span class="hljs-attr">file</span>: file,
          <span class="hljs-attr">path</span>: path + file.name,
          <span class="hljs-attr">attr</span>: item.attr
        }
        <span class="hljs-keyword">this</span>.filesList.push(obj)
    })
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (item.isDirectory) {
    <span class="hljs-keyword">var</span> dirReader = item.createReader()
    dirReader.readEntries(<span class="hljs-function">(<span class="hljs-params">entries</span>) =&gt;</span> {
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; entries.length; i++) {
        entries[i].attr = item.attr
        <span class="hljs-keyword">this</span>.traverseFileTree(entries[i], path + item.name + <span class="hljs-string">'/'</span>, temp)
      }
    }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
      <span class="hljs-built_in">console</span>.log(e)
    })
  }
}</code></pre>
<h4>2. 上传文件夹的进度条</h4>
<p>没有分片的文件：根据文件夹中的文件总数，算出每个文件占文件夹的百分比，当一个文件上传成功时，修改文件夹 process；<br>分片的文件：算出每个文件占文件的百分比后，算出每块文件占文件的百分比，每块文件上传成功后，修改文件夹的 process.<br>代码见 demo</p>
<h4>3. 跨域携带 cookie</h4>
<p>当服务器设置响应头</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    Access-Control-Allow-Origin:必须指定明确的、与请求网页一致的域名，不能为 *。
    Access-Control-Allow-Credentials: true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-attr">    Access-Control-Allow-Origin:</span><span class="hljs-string">必须指定明确的、与请求网页一致的域名，不能为</span> <span class="hljs-string">*。</span>
<span class="hljs-attr">    Access-Control-Allow-Credentials:</span> <span class="hljs-literal">true</span>
</code></pre>
<p>设置请求头：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    withCredentials:true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-attr">    withCredentials:</span><span class="hljs-literal">true</span>
</code></pre>
<p>补充：</p>
<h4>substring 和 substr 的区别</h4>
<p><code>substr(start [, length ])</code> 返回一个从指定位置开始的指定长度的子字符串。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    start:必选项。所需的子字符串的起始位置。字符串中的第一个字符的索引为 0。
    length:可选项。在返回的子字符串中应包括的字符个数。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">    start:</span>必选项。所需的子字符串的起始位置。字符串中的第一个字符的索引为 <span class="hljs-number">0</span>。
<span class="hljs-symbol">    length:</span>可选项。在返回的子字符串中应包括的字符个数。
</code></pre>
<p><code>substring</code> 返回位于 String 对象中指定位置的子字符串,返回一个包含从 start 到最后（不包含 end ）的子字符串的字符串</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="start:指明子字符串的起始位置，该索引从 0 开始起算。
end:指明子字符串的结束位置，该索引从 0 开始起算。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-symbol">start:</span>指明子字符串的起始位置，该索引从 <span class="hljs-number">0</span> 开始起算。
<span class="hljs-symbol">end:</span>指明子字符串的结束位置，该索引从 <span class="hljs-number">0</span> 开始起算。
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HTML5 拖拽批量上传文件

## 原文链接
[https://segmentfault.com/a/1190000014024331](https://segmentfault.com/a/1190000014024331)

