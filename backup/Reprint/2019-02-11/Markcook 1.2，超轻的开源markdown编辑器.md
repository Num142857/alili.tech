---
title: 'Markcook 1.2，超轻的开源markdown编辑器' 
date: 2019-02-11 2:30:49
hidden: true
slug: q14iyo2sl4b
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Markcook 1.2</h2>
<p><span class="img-wrap"><img data-src="https://imgly.net/img/AhB.jpg" src="https://static.alili.techhttps://imgly.net/img/AhB.jpg" alt="替代文字" title="替代文字" style="cursor: pointer;"></span></p>
<hr>
<blockquote><p>项目地址：<a href="https://github.com/jrainlau/markcook" rel="nofollow noreferrer" target="_blank">https://github.com/jrainlau/markcook</a><br>在线体验：<a href="http://jrainlau.github.io/markcook/" rel="nofollow noreferrer" target="_blank">http://jrainlau.github.io/markcook/</a><br>客户端下载：<a href="https://github.com/jrainlau/markcook/releases" rel="nofollow noreferrer" target="_blank">https://github.com/jrainlau/markcook/releases</a></p></blockquote>
<hr>
<h2 id="articleHeader1">介绍</h2>
<h3 id="articleHeader2">Markcook 1.2--简洁、高效的markdown编辑器</h3>
<hr>
<p>使用了vue.js+webpack进行开发和构建。</p>
<p>非常的简单，高效，没有多余的东西。</p>
<p>她的优点有很多：</p>
<ul>
<li><p>实时预览，所见即所得，无需担心排版问题。</p></li>
<li><p>提供了齐全的快捷按钮，无需查阅markdown语法即可进行排版。</p></li>
<li><p>完全离线的单页应用，可以把gh-pages分支的文件clone下来，作为本地客户端使用。</p></li>
<li><p>提供本地缓存功能，防止重要内容丢失。</p></li>
<li><p>拖拽导入文件，编辑本地文件方便快捷。</p></li>
<li><p>支持文件导出，编写完毕可直接保存。</p></li>
</ul>
<h3 id="articleHeader3">更新历史</h3>
<ul>
<li><p>Markcook 1.2：修复了无法导出中文文件的bug，增加了拖拽导入文件的功能。</p></li>
<li><p>Markcook 1.1：增加了文件导出功能，可以导出<code>.html</code>或<code>.md</code>格式文件。</p></li>
<li><p>Markcook 1.0：基础版本，仅有同步编译markdown语法功能。</p></li>
</ul>
<hr>
<h2 id="articleHeader4">功能展示</h2>
<ul>
<li><p>快捷插入markdown符号<br><span class="img-wrap"><img data-src="https://imgly.net/img/3t2.gif" src="https://static.alili.techhttps://imgly.net/img/3t2.gif" alt="快捷插入markdown符号" title="快捷插入markdown符号" style="cursor: pointer;"></span></p></li>
<li><p>拖拽上传文件<br><span class="img-wrap"><img data-src="https://imgly.net/img/3tJ.gif" src="https://static.alili.techhttps://imgly.net/img/3tJ.gif" alt="拖拽上传文件" title="拖拽上传文件" style="cursor: pointer;"></span></p></li>
<li><p>缓存与下载<br><span class="img-wrap"><img data-src="https://imgly.net/img/3tP.gif" src="https://static.alili.techhttps://imgly.net/img/3tP.gif" alt="缓存与下载" title="缓存与下载" style="cursor: pointer;"></span></p></li>
<li><p>客户端<br><span class="img-wrap"><img data-src="/img/bVuSTB" src="https://static.alili.tech/img/bVuSTB" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p></li>
</ul>
<h2 id="articleHeader5">开发过程</h2>
<p>距离1.0版本的推出已经三个多月了，当时的1.0版本还是非常原始的，也没打算继续维护。后来在机缘巧合之下，觉得应该为它完善基本功能，起码得支持导入导出吧。同时也因为临近毕业，闲得慌，所以就把它重新拿出来，添加了一些实用的功能。</p>
<p>拖拽上传主要使用了HTML5新增的file API，能够读取本地文件。通过file API，实现真正的backend free，不需要后台也能够上传文件进行编辑了！具体代码如下（包括拖拽上传功能）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="--- html ---
<textarea autofocus id=&quot;inputter&quot; v-model=&quot;article&quot;></textarea>

--- javascript ---
(function () {
      var dropbox;
      dropbox = document.getElementById(&quot;inputter&quot;);
      dropbox.addEventListener(&quot;dragenter&quot;, dragenter, false);
      dropbox.addEventListener(&quot;dragover&quot;, dragover, false);
      dropbox.addEventListener(&quot;drop&quot;, drop, false);
      function dragenter(e) {
        e.stopPropagation();
        e.preventDefault();
      }

      function dragover(e) {
        e.stopPropagation();
        e.preventDefault();
      }

      function drop(e) {
        e.stopPropagation();
        e.preventDefault();

        var dt = e.dataTransfer;
        var files = dt.files;

        var fileReader = new FileReader();
        fileReader.readAsText(files[0], 'UTF-8');
        fileReader.onloadend = function (e) {
          console.log(e.target.result) // 输出文件内容
        }
      }
    })()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>--- html ---
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">autofocus</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"inputter"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"article"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span></span>

--- javascript ---
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> dropbox;
      dropbox = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"inputter"</span>);
      dropbox.addEventListener(<span class="hljs-string">"dragenter"</span>, dragenter, <span class="hljs-literal">false</span>);
      dropbox.addEventListener(<span class="hljs-string">"dragover"</span>, dragover, <span class="hljs-literal">false</span>);
      dropbox.addEventListener(<span class="hljs-string">"drop"</span>, drop, <span class="hljs-literal">false</span>);
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dragenter</span>(<span class="hljs-params">e</span>) </span>{
        e.stopPropagation();
        e.preventDefault();
      }

      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dragover</span>(<span class="hljs-params">e</span>) </span>{
        e.stopPropagation();
        e.preventDefault();
      }

      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drop</span>(<span class="hljs-params">e</span>) </span>{
        e.stopPropagation();
        e.preventDefault();

        <span class="hljs-keyword">var</span> dt = e.dataTransfer;
        <span class="hljs-keyword">var</span> files = dt.files;

        <span class="hljs-keyword">var</span> fileReader = <span class="hljs-keyword">new</span> FileReader();
        fileReader.readAsText(files[<span class="hljs-number">0</span>], <span class="hljs-string">'UTF-8'</span>);
        fileReader.onloadend = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
          <span class="hljs-built_in">console</span>.log(e.target.result) <span class="hljs-comment">// 输出文件内容</span>
        }
      }
    })()</code></pre>
<p>为了提供文件导出功能，查了蛮多资料，也在sf社区提了问题：<a href="https://segmentfault.com/q/1010000004929809">js生成的html模版如何提供下载？</a><br>感谢<a href="/u/coolzjy">@cool_zjy</a> 的回答，使用data URL确实是一种方式，但是最大的缺点是base64编码不支持中文字符，若通过第三方库转码，则下载的内容也是转码字符，不符合要求。后来经过研究，采用了另外一个方法，也是HTML5提供的API，<code>Blob()</code>、<code>URL.createObjectURL()</code>。<br><code>Blob()</code>接收一个数组作为参数，然后生成编码对象。把编码对象作为参数传入<code>URL.createObjectURL()</code>，就可以生成一个可供下载的链接，下载的内容是完美的中文字符（其他种类字符同样支持），代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="--- html ---
<a :href='mdDataUrl' download=&quot;index.md&quot; @mouseenter='createUrl(0)'>保存为.md格式</a>

--- javascript（vue.js） ---
createUrl: function (mode) {
              var self = this
              var val = ''
              if (mode == 0) {
                val = self.article
                var blobObj = new Blob([val])
                var objectURL = URL.createObjectURL(blobObj)
                self.mdDataUrl = objectURL
              } else {
                val = self.outputHtml
                var blobObj = new Blob([val])
                var objectURL = URL.createObjectURL(blobObj)
                self.htmlDataUrl = objectURL
              }
            }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>--- <span class="hljs-selector-tag">html</span> ---
&lt;<span class="hljs-selector-tag">a</span> :href=<span class="hljs-string">'mdDataUrl'</span> download=<span class="hljs-string">"index.md"</span> @mouseenter=<span class="hljs-string">'createUrl(0)'</span>&gt;保存为.md格式&lt;/a&gt;

--- javascript（vue.js） ---
createUrl: function (mode) {
              <span class="hljs-selector-tag">var</span> self = this
              <span class="hljs-selector-tag">var</span> val = <span class="hljs-string">''</span>
              <span class="hljs-keyword">if</span> (mode == <span class="hljs-number">0</span>) {
                val = self<span class="hljs-selector-class">.article</span>
                <span class="hljs-selector-tag">var</span> blobObj = new Blob([val])
                <span class="hljs-selector-tag">var</span> objectURL = URL.createObjectURL(blobObj)
                self<span class="hljs-selector-class">.mdDataUrl</span> = objectURL
              } <span class="hljs-keyword">else</span> {
                val = self<span class="hljs-selector-class">.outputHtml</span>
                <span class="hljs-selector-tag">var</span> blobObj = new Blob([val])
                <span class="hljs-selector-tag">var</span> objectURL = URL.createObjectURL(blobObj)
                self<span class="hljs-selector-class">.htmlDataUrl</span> = objectURL
              }
            }</code></pre>
<p>以上就是两个关键新功能的实现原理。除了提供上传与下载以外，HTML5的file API还有很多好玩强大的功能，值得深入研究。</p>
<p>最后通过electron打包，生成全平台适用的桌面程序，在我的github release中已经上传了Windows 64位版本和OSX mas版本的，<del>稍后将传上OSX和Linux版本的</del>。以下是Windows版截图：<br><span class="img-wrap"><img data-src="/img/bVuSWq" src="https://static.alili.tech/img/bVuSWq" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>通过开发Markcook，我发现vuejs+webpack生成的项目非常适合通过electron移植为桌面应用，因为经过webpack生成的vuejs项目只有一个index.html入口文件，其余均是js文件，只需要简单地修改一下文件目录结构，就可以通过electron直接生成桌面应用了，超级方便。在此感谢<a href="/u/yupeg_lv">@远程智力英雄</a> 的文章<a href="http://sfau.lt/b5ut3B" rel="nofollow noreferrer" target="_blank">从零开始使用Electron + jQuery开发桌面应用 （一） HelloWorld</a>，很详细地介绍electron的基本使用方法。</p>
<h2 id="articleHeader6">写在最后</h2>
<p>接下来看心情维护，可能会在后面调整LOGO和UI，因为现在其实挺简陋的。同时因为懒，所以没有做成响应式，以后重构再说……<br>如果觉得我的作品还可以的话，欢迎follow，也期待您的PR。虽然是一个简单的作品，但仍希望能够得到各位大牛的指点，谢谢大家！！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Markcook 1.2，超轻的开源markdown编辑器

## 原文链接
[https://segmentfault.com/a/1190000004938777](https://segmentfault.com/a/1190000004938777)

