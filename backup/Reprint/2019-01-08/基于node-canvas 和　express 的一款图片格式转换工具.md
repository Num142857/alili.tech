---
title: '基于node-canvas 和　express 的一款图片格式转换工具' 
date: 2019-01-08 2:30:11
hidden: true
slug: sire8wmnqt8
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">基于node-canvas 和　express 的一款图片格式转换工具,完善后会发布成npm</h1>
<ul><li><p>由于本项目当前是Version@0.0.1，还有很多不足支出，希望大家能指正，共勉。</p></li></ul>
<blockquote>
<p>这是我最近几天在学Node的时候想着做的一个工具，为什么做这个?</p>
<p>原因有三点：</p>
</blockquote>
<ul>
<li><p>1.虽然前端可以使用 Canvas 进行操作，但是毕竟功能有限，并且，国内的环境，如果这个功能在前端完全开发，那么对于兼容低版本的浏览器将是痛苦不堪，所以构想直接在后端对图片进行处理，进而避免兼容性等问题。</p></li>
<li><p>２.Node强大的异步IO机制使得对大文件操作也不会怕页面阻塞，直接由Ajax发送请求，等待后台处理完响应后直接接收图片即可，并且几年前也有大牛开发出基于C++的node-canvas的模块，并且一直也有很好的维护，也为在后端使用Canvas进行功能开发提供了可能，也降低了图片处理方面的难度。</p></li>
<li><p>３.极大降低前端对此需求的使用难度，只需对照READEME理解后，使用Ajax发送相应参数即可，无需去研究node-canvas的使用.</p></li>
<li><p>4.node-canvas的使用经验搜索过，只有少量使用介绍，有必要结合此工具做完善拓展，使其能够直接使用，绕过node-canvas这个安装也不方便的坑。</p></li>
</ul>
<h2 id="articleHeader1">Github Address</h2>
<blockquote><p>题主是一枚准大三狗(虽然资质平平，但是初期写这个还是仔细看了node-canvas的READEME的才写的)，此项目准备长期维护，直至功能完全完善，有兴趣使用的欢迎指正的关注，因为也是一直在摸索着前进，希望有志同道合的伙伴一起前进，坐标的话，估计你早就看见了。</p></blockquote>
<p>老规矩: 欢迎Star(小编原谅我的表脸，逃)</p>
<ul>
<li><p>项目Github地址<br>  $  <a href="https://github.com/ZJH9Rondo/Img-trans" rel="nofollow noreferrer" target="_blank">https://github.com/ZJH9Rondo/...</a></p></li>
<li><p>node-canvas项目地址<br>  $  <a href="https://github.com/Automattic/node-canvas" rel="nofollow noreferrer" target="_blank">https://github.com/Automattic...</a></p></li>
</ul>
<h2 id="articleHeader2">Install</h2>
<blockquote><p>执行 npm install 前，先安装依赖，由于 node-canvas 是C++写的，并且，其中涉及到在后端Node中直接对css等进行设置，所以不仅需要当前的 OS 可以对node-canvas的项目文件进行编译，还需要工作期间操作Canvas实例的依赖，所以安装期间可能会或多或少的遇到问题，以下是操作流程(结合了node-canvas的READEME和编写代码期间遇到的问题)</p></blockquote>
<ul><li><p>根据当前的OS在Install前在终端执行响应命令,安装对应包或依赖,必须成功后才可执行后续操作，否则安装后项目也无法正常运行。</p></li></ul>
<table>
<thead><tr>
<th>OS</th>
<th>Command</th>
</tr></thead>
<tbody>
<tr>
<td>OS X</td>
<td><code>brew install pkg-config cairo pango libpng jpeg giflib</code></td>
</tr>
<tr>
<td>Ubuntu</td>
<td><code>sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++</code></td>
</tr>
<tr>
<td>Fedora</td>
<td><code>sudo yum install cairo cairo-devel cairomm-devel libjpeg-turbo-devel pango pango-devel pangomm pangomm-devel giflib-devel</code></td>
</tr>
<tr>
<td>Solaris</td>
<td><code>pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto</code></td>
</tr>
<tr>
<td>Windows</td>
<td><a href="https://github.com/Automattic/node-canvas/wiki/Installation---Windows" rel="nofollow noreferrer" target="_blank">Instructions on our wiki</a></td>
</tr>
</tbody>
</table>
<ul><li><p>执行上述操作成功之后即可安装项目</p></li></ul>
<p>获取源码包:</p>
<p>$ git　clone  git@github.com:ZJH9Rondo/Img-trans.git</p>
<p>安装Package.json对应依赖:</p>
<p>$ sudo npm install</p>
<blockquote><p>提醒一点: 如果当前用户是将　npm　更新至＠５.0 版本，执行　sudo npm install 会在当前平行目录生成　Package-lock.json 文件，这个是 npm 新版本加入的特征(规范),不影响正常使用，具体规范说明有需要可以看如下来自<a href="https://stackoverflow.com/questions/44297803/package-lock-json-role" rel="nofollow noreferrer" target="_blank">Stackoverflow</a>的解释。</p></blockquote>
<h2 id="articleHeader3">How to use</h2>
<ul><li><p>前端用ajax发送数据，后端接收后对对应图片进行处理，之后响应返回为一个转换后图片的url</p></li></ul>
<blockquote><p>上述基本说明有一点有必要说明，当前的基础版本暂时没有加入上传文件进行转换的需求，开发构想基本使用场景是　个人网站或图片格式转换功能开发中,当前站点的对图片格式转换的简单功能需求，所以直接是通过 url 读取站点的图片文件进行转换操作，后续会加入文件上传处理。</p></blockquote>
<ul><li><p>Ajax的参数说明</p></li></ul>
<p>PNG SVG JPEG的参数说明(以　PNG　为例):</p>
<blockquote><p>由于测试是用本地自己封装的一个Ajax测试的，所以格式可能会有点差别</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var data = {

&quot;source&quot;: src,      // 需转换图片的

&quot;name&quot;: &quot;test.png&quot;  // 生成图片的文件名

&quot;width&quot;: 794,      // Canvas的width

&quot;height&quot;: 1123,    // Canvas的height

&quot;outUrl&quot;: &quot;./image/newImg/&quot;,  // 生成转换文件的存放路径

&quot;type&quot;: &quot;png&quot;    　// 文件转换格式

};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>
<span class="hljs-keyword">var</span> <span class="hljs-keyword">data</span> = {

<span class="hljs-string">"source"</span>: src,      <span class="hljs-comment">// 需转换图片的</span>

<span class="hljs-string">"name"</span>: <span class="hljs-string">"test.png"</span>  <span class="hljs-comment">// 生成图片的文件名</span>

<span class="hljs-string">"width"</span>: <span class="hljs-number">794</span>,      <span class="hljs-comment">// Canvas的width</span>

<span class="hljs-string">"height"</span>: <span class="hljs-number">1123</span>,    <span class="hljs-comment">// Canvas的height</span>

<span class="hljs-string">"outUrl"</span>: <span class="hljs-string">"./image/newImg/"</span>,  <span class="hljs-comment">// 生成转换文件的存放路径</span>

<span class="hljs-string">"type"</span>: <span class="hljs-string">"png"</span>    　<span class="hljs-comment">// 文件转换格式</span>

};
</code></pre>
<p>其中, src 建议使用相对路径,其值的获取可以自由输入,也可以通过js获取,但是在获取的时候建议使用　getAttribute() 获取,而非　img.src 。</p>
<p>PDF 的问题需要仔细说明,如下:</p>
<ul><li><p>示例图为本地生成一标准A4纸大小的PDF图片，截取了上半部作为示例</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010261962" src="https://static.alili.tech/img/remote/1460000010261962" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<ul><li><p>PDF转换存在POST发送请求数据,需要使用body-parser处理url,在package.json中已写入</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var data = {

&quot;source&quot;: src,

&quot;width&quot;: 794,

&quot;height&quot;: 1123,

&quot;h1&quot;: &quot;This is a PDF&quot;,

&quot;p&quot;: &quot;It be made node-canvas,It be made node-canvas,It be made node-canvas,It be made node-canvas&quot;,

&quot;name&quot;: &quot;test.pdf&quot;,

&quot;outUrl&quot;: &quot;./image/newImg/&quot;,

&quot;type&quot;: &quot;pdf&quot;

};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code>
<span class="hljs-attribute">var data</span> = {

<span class="hljs-string">"source"</span>: src,

<span class="hljs-string">"width"</span>: 794,

<span class="hljs-string">"height"</span>: 1123,

<span class="hljs-string">"h1"</span>: <span class="hljs-string">"This is a PDF"</span>,

<span class="hljs-string">"p"</span>: <span class="hljs-string">"It be made node-canvas,It be made node-canvas,It be made node-canvas,It be made node-canvas"</span>,

<span class="hljs-string">"name"</span>: <span class="hljs-string">"test.pdf"</span>,

<span class="hljs-string">"outUrl"</span>: <span class="hljs-string">"./image/newImg/"</span>,

<span class="hljs-string">"type"</span>: <span class="hljs-string">"pdf"</span>

};
</code></pre>
<ul><li><p>PDF参数说明</p></li></ul>
<p>h1: 当前PDF的内容标题设置</p>
<p>p: 当前PDF的文本内容文本,但是当前由于node-canvas的 p 函数解析对于过长的文本没有自动换行的处理，当前版本的后续更新会对此在后台通</p>
<p>过js做处理。</p>
<p>其余与上相同，又去当前开发的只是返回了Url,所以具体生成的文件除PDF外都能在测试时直接使用返回的URL看到效果,后续的开发功能会及时更新添加，目前使用对于图片格式转换没有问题。</p>
<ul>
<li><p>PDF中 Ajax 请求发送必须使用　POST 发送数据,并且在启动Ajax之前需要对data做处理，使用 JSON.stringify() 做处理,并且设置 Request Headers 中的 Content-Type 为　application/json ,这样后端才能正常接收并解析请求中Url所携带的数据。</p></li>
<li><p>index.html 为我在本地的简单测试文件，初期功能简单，后续会使用测试脚本测试覆盖率</p></li>
</ul>
<h2 id="articleHeader4">后续功能开发</h2>
<ul>
<li><p>PDF的text长文本裁剪转换</p></li>
<li><p>PDF返回文件支持下载</p></li>
<li><p>PDF多文本转换</p></li>
<li><p>Canvas转换后清晰度下降问题</p></li>
</ul>
<blockquote><p>近期会写几篇做这个东西所涉及的一些知识点总结(主要是关于 Node 和 HTTP 以及　Git的问题处理以及协同开发,此部分需求因人而异，有需要的可以关注，互相学习)</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于node-canvas 和　express 的一款图片格式转换工具

## 原文链接
[https://segmentfault.com/a/1190000010262386](https://segmentfault.com/a/1190000010262386)

