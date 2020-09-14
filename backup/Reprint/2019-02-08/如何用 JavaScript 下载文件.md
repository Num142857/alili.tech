---
title: '如何用 JavaScript 下载文件' 
date: 2019-02-08 2:30:40
hidden: true
slug: klak4ufok6l
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">简介</h2>
<p>我们知道，下载文件是一个非常常见的需求，但由于浏览器的安全策略的限制，我们通常只能通过一个额外的页面，访问某个文件的 url 来实现下载功能，但是这种用户体验非常不好。<br>幸好，HTML 5 里面为 <code>&lt;a&gt;</code> 标签添加了一个 <code>download</code> 的属性，我们可以轻易的利用它来实现下载功能，再也不需要用以前的笨办法了。</p>
<h2 id="articleHeader1">原理</h2>
<p>我们先看看 <code>download</code> 的使用方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;http://somehost/somefile.zip&quot; download=&quot;filename.zip&quot;>Download file</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http://somehost/somefile.zip"</span> <span class="hljs-attr">download</span>=<span class="hljs-string">"filename.zip"</span>&gt;</span>Download file<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<p>看看上面的代码，只要为 <code>&lt;a&gt;</code> 标签添加 <code>download</code> 属性，我们点击这个链接的时候就会自动下载文件了~<br>顺便说下，<code>download</code> 的属性值是可选的，它用来指定下载文件的文件名。像上面的例子中，我们下载到本地的文件名就会是 filename.zip 拉，如果不指定的话，它就会是 somefile.zip 这个名字拉！</p>
<p>看到这里，你可能会说，坑爹啊，这明明是用 HTML 5 的新特性来实现下载文件嘛，说好的用 JavaScript 下载文件呢？</p>
<p>事实上，用 JavaScript 来下载文件也是利用这一特性来实现的，我们的 JavaScript 代码不外乎就是：</p>
<ul>
<li><p>用 JavaScript 创建一个隐藏的 <code>&lt;a&gt;</code> 标签</p></li>
<li><p>设置它的 <code>href</code> 属性</p></li>
<li><p>设置它的 <code>download</code> 属性</p></li>
<li><p>用 JavaScript 来触发这个它的 <code>click</code> 事件</p></li>
</ul>
<p>翻译成 JavaScript 代码就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = document.createElement('a');
var url = window.URL.createObjectURL(blob);
var filename = 'what-you-want.txt';
a.href = url;
a.download = filename;
a.click();
window.URL.revokeObjectURL(url);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'a'</span>);
<span class="hljs-keyword">var</span> url = <span class="hljs-built_in">window</span>.URL.createObjectURL(blob);
<span class="hljs-keyword">var</span> filename = <span class="hljs-string">'what-you-want.txt'</span>;
a.href = url;
a.download = filename;
a.click();
<span class="hljs-built_in">window</span>.URL.revokeObjectURL(url);</code></pre>
<p>好拉，是不是看到有个陌生的东东呢？</p>
<h2 id="articleHeader2">window.URL</h2>
<p><code>window.URL</code> 里面有两个方法：</p>
<ul>
<li><p><code>createObjectURL</code> 用 blob 对象来创建一个 object URL(它是一个 <code>DOMString</code>)，我们可以用这个 object URL 来表示某个 blob 对象，这个 object URL 可以用在 <code>href</code> 和 <code>src</code> 之类的属性上。</p></li>
<li><p><code>revokeObjectURL</code> 释放由 <code>createObjectURL</code> 创建的 object URL，当该 object URL 不需要的时候，我们要主动调用这个方法来获取最佳性能和内存使用。</p></li>
</ul>
<p>知道了这两个方法之后，我们再回去看看上面的例子就很容易理解了吧！只是用 blob 对象来创建一条 URL，然后让 <code>&lt;a&gt;</code> 标签引用该 URL，然后触发个点击事件，就可以下载文件了！</p>
<p>那么问题来了，blob 对象哪里来？</p>
<h2 id="articleHeader3">Blob 对象</h2>
<p>Blob 全称是 Binary large object，它表示一个类文件对象，可以用它来表示一个文件。根据 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Blob" rel="nofollow noreferrer" target="_blank">MDN</a> 上面的说法，<code>File API</code> 也是基于 blob 来实现的。</p>
<p>由于本文的主题是讲 JavaScript 下载文件，那我们构建 blob 的方式就是通过服务器返回的文件来创建 blob 拉！<br>而最简单的方式就是用 <code>fetch API</code> 了，我们可以整合上面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch('http://somehost/somefile.zip').then(res => res.blob().then(blob => {
    var a = document.createElement('a');
    var url = window.URL.createObjectURL(blob);
    var filename = 'myfile.zip';
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">fetch(<span class="hljs-string">'http://somehost/somefile.zip'</span>).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.blob().then(<span class="hljs-function"><span class="hljs-params">blob</span> =&gt;</span> {
    <span class="hljs-keyword">var</span> a = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'a'</span>);
    <span class="hljs-keyword">var</span> url = <span class="hljs-built_in">window</span>.URL.createObjectURL(blob);
    <span class="hljs-keyword">var</span> filename = <span class="hljs-string">'myfile.zip'</span>;
    a.href = url;
    a.download = filename;
    a.click();
    <span class="hljs-built_in">window</span>.URL.revokeObjectURL(url);
}))</code></pre>
<p>很简单对吧！</p>
<p>你可能会问，何必这么麻烦呢？直接写成下面这样不就好了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;http://somehost/somefile.zip&quot; download=&quot;myfile.zip&quot;>Download file</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http://somehost/somefile.zip"</span> <span class="hljs-attr">download</span>=<span class="hljs-string">"myfile.zip"</span>&gt;</span>Download file<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<p>嗯，对于这种写法，我只能说，你做的太正确了！如果你要下载的是已经存在服务器上面的静态文件的话，那么写成这样是最方便的。浏览器会帮你处理整个下载过程，不需要你干涉。如果你用 blob 的方式来下载文件的话，会有下面这些限制的：</p>
<h3 id="articleHeader4">限制一：不同浏览器对 blob 对象有不同的限制</h3>
<p>具体看看下面这个表格（出自 <a href="https://github.com/eligrey/FileSaver.js#supported-browsers" rel="nofollow noreferrer" target="_blank">FileSaver.js</a>）：</p>
<table>
<thead><tr>
<th>Browser</th>
<th>Constructs as</th>
<th>Filenames</th>
<th>Max Blob Size</th>
<th>Dependencies</th>
</tr></thead>
<tbody>
<tr>
<td>Firefox 20+</td>
<td>Blob</td>
<td>Yes</td>
<td>800 MiB</td>
<td>None</td>
</tr>
<tr>
<td>Firefox &lt; 20</td>
<td>data: URI</td>
<td>No</td>
<td>n/a</td>
<td><a href="https://github.com/eligrey/Blob.js" rel="nofollow noreferrer" target="_blank">Blob.js</a></td>
</tr>
<tr>
<td>Chrome</td>
<td>Blob</td>
<td>Yes</td>
<td>500 MiB</td>
<td>None</td>
</tr>
<tr>
<td>Chrome for Android</td>
<td>Blob</td>
<td>Yes</td>
<td>500 MiB</td>
<td>None</td>
</tr>
<tr>
<td>Edge</td>
<td>Blob</td>
<td>Yes</td>
<td>?</td>
<td>None</td>
</tr>
<tr>
<td>IE 10+</td>
<td>Blob</td>
<td>Yes</td>
<td>600 MiB</td>
<td>None</td>
</tr>
<tr>
<td>Opera 15+</td>
<td>Blob</td>
<td>Yes</td>
<td>500 MiB</td>
<td>None</td>
</tr>
<tr>
<td>Opera &lt; 15</td>
<td>data: URI</td>
<td>No</td>
<td>n/a</td>
<td><a href="https://github.com/eligrey/Blob.js" rel="nofollow noreferrer" target="_blank">Blob.js</a></td>
</tr>
<tr>
<td>Safari 6.1+*</td>
<td>Blob</td>
<td>No</td>
<td>?</td>
<td>None</td>
</tr>
<tr>
<td>Safari &lt; 6</td>
<td>data: URI</td>
<td>No</td>
<td>n/a</td>
<td><a href="https://github.com/eligrey/Blob.js" rel="nofollow noreferrer" target="_blank">Blob.js</a></td>
</tr>
</tbody>
</table>
<h3 id="articleHeader5">限制二：构建完 blob 对象后才会转换成文件</h3>
<p>这一点限制对小文件(几十kb)可能没什么影响，但对稍微大一点的文件影响就很大了。试想，用户要下载一个 100mb 的文件，如果他点击了下载按钮之后没看到下载提示的话，他肯定会继续按，等他按了几次之后还没看到下载提示时，他就会抱怨我们的网站，然后离开了。</p>
<p>然而事实上下载的的确确发生了，只是要等到下载完文件之后才能构建 blob 对象，再转化成文件。而且，用户再触发多几次下载就会造成一些资源上的浪费。</p>
<p>因此，如果是要下载大文件的话，还是推荐直接创建一个 <code>&lt;a&gt;</code> 标签拉~<br>写 html 也好，写 JavaScript 动态创建也好，用自己喜欢的方式去创建就好了。</p>
<h2 id="articleHeader6">为什么要用 JavaScript 下载文件</h2>
<p>好拉，说了半天，其实我们一直说的都是：「不要用 JavaScript 下载文件拉，限制多多，又不好用，直接用 html 就好拉，简单方便又快捷」这个论调。<br>事实上也确实如此，但有些时候我们确实需要通过 JavaScript 来做一些<strong>预</strong>处理。</p>
<h3 id="articleHeader7">权限校验</h3>
<p>有些时候，我们需要对下载做一些限制，最常见的就是权限校验了，如检查该用户是否有下载的权限，是否有高速下载的权限等等。这时候，我们可以利用 JavaScript 做一些预处理。如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch('http://somehost/check-permission', options).then(res => {
    if (res.code === 0) {
        var a = document.createElement('a');
        var url = res.data.url;
        var filename = 'myfile.zip';
        a.href = url;
        a.download = filename;
        a.click();
    } else {
        alert('You have no permission to download the file!');
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">fetch(<span class="hljs-string">'http://somehost/check-permission'</span>, options).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (res.code === <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">var</span> a = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'a'</span>);
        <span class="hljs-keyword">var</span> url = res.data.url;
        <span class="hljs-keyword">var</span> filename = <span class="hljs-string">'myfile.zip'</span>;
        a.href = url;
        a.download = filename;
        a.click();
    } <span class="hljs-keyword">else</span> {
        alert(<span class="hljs-string">'You have no permission to download the file!'</span>);
    }
});</code></pre>
<p>在这个例子里面，我们没有用 blob 来构建 URL，而是通过后端服务器来计算出用户的下载链接，然后再利用之前提到的动态创建 <code>&lt;a&gt;</code> 标签的方式来实现下载，很简单吧！</p>
<h3 id="articleHeader8">动态文件</h3>
<p>动态生成文件然后返回给客户端也是一个很常见的需求，譬如我们有时候需要做导出数据的功能，把数据库中的某些数据导出到 Excel 中，然后再返回客户端。<br>这时候我们就不能简单的指定 <code>href</code> 属性，因为对应的 URL 并不存在。<br>我们只能通过 JavaScript 对服务器发出一个请求，通知它去生成某个文件，然后把对应的 URL 返回给客户端。<br>有没有感觉这个过程和上面「权限校验」一节很像？肯定拉，因为我们只是对 URL 做了一些预处理而已嘛~</p>
<h2 id="articleHeader9">注意事项</h2>
<p>由于 <code>download</code> 属性是 HTML 5 的新特性，因此它不支持旧版本的浏览器。</p>
<h2 id="articleHeader10">总结</h2>
<p>HTML 5 新的 <code>download</code> 特性真的很好用，结合 JavaScript 的动态能力我们可以很方便的做出复杂的下载功能~</p>
<h2 id="articleHeader11">出处</h2>
<p><a href="http://scarletsky.github.io/2016/07/03/download-file-using-javascript/" rel="nofollow noreferrer" target="_blank">http://scarletsky.github.io/2016/07/03/download-file-using-javascript/</a></p>
<h2 id="articleHeader12">参考资料</h2>
<p><a href="https://github.com/eligrey/FileSaver.js/blob/master/FileSaver.js" rel="nofollow noreferrer" target="_blank">https://github.com/eligrey/FileSaver.js/blob/master/FileSaver.js</a><br><a href="https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL</a><br><a href="https://developer.mozilla.org/en-US/docs/Web/API/Blob" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/API/Blob</a><br><a href="http://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link" rel="nofollow noreferrer" target="_blank">http://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link</a><br><a href="http://stackoverflow.com/questions/24501358/how-to-set-a-header-for-a-http-get-request-and-trigger-file-download" rel="nofollow noreferrer" target="_blank">http://stackoverflow.com/questions/24501358/how-to-set-a-header-for-a-http-get-request-and-trigger-file-download</a><br><a href="http://blog.bguiz.com/2014/07/03/file-download-with-http-request-header/" rel="nofollow noreferrer" target="_blank">http://blog.bguiz.com/2014/07/03/file-download-with-http-request-header/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何用 JavaScript 下载文件

## 原文链接
[https://segmentfault.com/a/1190000005863250](https://segmentfault.com/a/1190000005863250)

