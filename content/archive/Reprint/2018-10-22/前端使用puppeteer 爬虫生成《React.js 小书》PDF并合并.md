---
title: 前端使用puppeteer 爬虫生成《React.js 小书》PDF并合并
hidden: true
categories: [reprint]
slug: d3549292
date: 2018-10-22 00:00:00
---

{{< raw >}}

                    
<h2 id="articleHeader0">1、<code>puppeteer</code> 是什么？</h2>
<p><code>puppeteer</code>: <code>Google</code> 官方出品的 <code>headless</code> <code>Chrome</code> <code>node</code> 库<br><a href="https://github.com/GoogleChrome/puppeteer" rel="nofollow noreferrer" target="_blank"><code>puppeteer</code> <code>github</code>仓库</a><br><a href="https://pptr.dev/" rel="nofollow noreferrer" target="_blank"><code>puppeteer</code> <code>API</code></a></p>
<p><strong>官方介绍：</strong></p>
<blockquote>您可以在浏览器中手动执行的大多数操作都可以使用<code>Puppeteer</code>完成！<p>生成页面的屏幕截图和<code>PDF</code>。<br>抓取<code>SPA</code>并生成预渲染内容（即“<code>SSR</code>”）。<br>自动化表单提交，<code>UI</code>测试，键盘输入等。<br>创建最新的自动化测试环境。使用最新的<code>JavaScript</code>和浏览器功能直接在最新版本的<code>Chrome</code>中运行测试。<br>捕获时间线跟踪 您的网站，以帮助诊断性能问题。<br>测试<code>Chrome</code>扩展程序。</p>
</blockquote>
<h2 id="articleHeader1">2、爬取网站生成<code>PDF</code>
</h2>
<h3 id="articleHeader2">2.1 安装 puppeteer</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 安装 puppeteer
// 可能会因为网络原因安装失败，可使用淘宝镜像 
// npm install -g cnpm --registry=https://registry.npm.taobao.org
npm i puppeteer
# or &quot;yarn add puppeteer&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-comment">// 安装 puppeteer</span>
<span class="hljs-comment">// 可能会因为网络原因安装失败，可使用淘宝镜像 </span>
<span class="hljs-comment">// npm install -g cnpm --registry=https://registry.npm.taobao.org</span>
npm i puppeteer
<span class="hljs-meta"># or <span class="hljs-meta-string">"yarn add puppeteer"</span></span></code></pre>
<h3 id="articleHeader3">2.2 《<code>React.js</code>小书》简介</h3>
<blockquote>
<a href="http://huziketang.mangojuice.top/books/react/" rel="nofollow noreferrer" target="_blank">《<code>React.js</code>小书》</a>简介   <a href="http://huziketang.mangojuice.top/books/react/me/" rel="nofollow noreferrer" target="_blank">关于作者@胡子大哈</a><br>这是⼀本关于 React.js 的⼩书。<br>因为⼯作中⼀直在使⽤ <code>React.js</code>，也⼀直以来想总结⼀下⾃⼰关于 <code>React.js</code> 的⼀些<br>知识、经验。于是把⼀些想法慢慢整理书写下来，做成⼀本<strong>开源、免费、专业、简单</strong><br>的⼊⻔级别的⼩书，提供给社区。希望能够帮助到更多 <code>React.js</code> 刚⼊⻔朋友。<br>下图是《<code>React.js</code> 小书》部分截图：<br><span class="img-wrap"><img src="https://static.alili.tech/img/bVbf7AJ?w=1048&amp;h=811" src="https://static.alili.tech/img/bVbf7AJ?w=1048&amp;h=811" alt="《codeReact.js/code 小书》部分截图" title="《codeReact.js/code 小书》部分截图" style="cursor: pointer; display: inline;"></span>
</blockquote>
<h3 id="articleHeader4">2.3 一些可能会用到的 <code>puppeteer API</code>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 新建 reactMiniBook.js, 运行 node reactMiniBook.js 生成pdf
const puppeteer = require('puppeteer');

(async () => {
  // 启动浏览器
  const browser = await puppeteer.launch({
        // 无界面 默认为true,改成false,则可以看到浏览器操作，目前生成pdf只支持无界面的操作。
        // headless: false,
        // 开启开发者调试模式，默认false, 也就是平时F12打开的面版
        // devtools: true,
  });
  // 打开一个标签页
  const page = await browser.newPage();
  // 跳转到页面 http://huziketang.mangojuice.top/books/react/
  await page.goto('http://huziketang.com/books/react/', {waitUntil: 'networkidle2'});
  // path 路径， format 生成pdf页面格式
  await page.pdf({path: 'react.pdf', format: 'A4'});
  // 关闭浏览器
  await browser.close();
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// 新建 reactMiniBook.js, 运行 node reactMiniBook.js 生成pdf</span>
<span class="hljs-keyword">const</span> puppeteer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'puppeteer'</span>);

<span class="hljs-function">(<span class="hljs-params"><span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-comment">// 启动浏览器</span>
  <span class="hljs-keyword">const</span> browser = <span class="hljs-keyword">await</span> puppeteer.launch(<span class="hljs-params">{
        <span class="hljs-comment">// 无界面 默认为true,改成false,则可以看到浏览器操作，目前生成pdf只支持无界面的操作。</span>
        <span class="hljs-comment">// headless: false,</span>
        <span class="hljs-comment">// 开启开发者调试模式，默认false, 也就是平时F12打开的面版</span>
        <span class="hljs-comment">// devtools: true,</span>
  }</span>);
  <span class="hljs-comment">// 打开一个标签页</span>
  <span class="hljs-keyword">const</span> page = <span class="hljs-keyword">await</span> browser.newPage(<span class="hljs-params"></span>);
  <span class="hljs-comment">// 跳转到页面 http://huziketang.mangojuice.top/books/react/</span>
  <span class="hljs-keyword">await</span> page.goto(<span class="hljs-params">'http:<span class="hljs-comment">//huziketang.com/books/react/', {waitUntil: 'networkidle2'});</span>
  <span class="hljs-comment">// path 路径， format 生成pdf页面格式</span>
  <span class="hljs-keyword">await</span> page.pdf(<span class="hljs-params">{path: 'react.pdf', format: 'A4'}</span>);
  <span class="hljs-comment">// 关闭浏览器</span>
  <span class="hljs-keyword">await</span> browser.close(<span class="hljs-params"></span>);
}</span>)(<span class="hljs-params"></span>);</span></span></code></pre>
<p>知道这启动浏览器打开页面关闭浏览器主流程后，再来看几个<code>API</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const args = 1;
let wh = await page.evaluate((args) => {
    // args 可以这样传递给这个函数。
    // 类似于 setTimeout(() => {console.log(args);}, 3000, args);
    console.log('args', args); // 1
    // 这里可以运行 dom操作等js
    // 返回通过dom操作等获取到的数据
    return {
        width: 1920,
        height: document.body.clientHeight,
    };
}, args);
// 设置视图大小
await page.setViewport(wh);
// 等待2s
await page.waitFor(2000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> args = <span class="hljs-number">1</span>;
<span class="hljs-keyword">let</span> wh = <span class="hljs-keyword">await</span> page.evaluate(<span class="hljs-function">(<span class="hljs-params">args</span>) =&gt;</span> {
    <span class="hljs-comment">// args 可以这样传递给这个函数。</span>
    <span class="hljs-comment">// 类似于 setTimeout(() =&gt; {console.log(args);}, 3000, args);</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'args'</span>, args); <span class="hljs-comment">// 1</span>
    <span class="hljs-comment">// 这里可以运行 dom操作等js</span>
    <span class="hljs-comment">// 返回通过dom操作等获取到的数据</span>
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">width</span>: <span class="hljs-number">1920</span>,
        <span class="hljs-attr">height</span>: <span class="hljs-built_in">document</span>.body.clientHeight,
    };
}, args);
<span class="hljs-comment">// 设置视图大小</span>
<span class="hljs-keyword">await</span> page.setViewport(wh);
<span class="hljs-comment">// 等待2s</span>
<span class="hljs-keyword">await</span> page.waitFor(<span class="hljs-number">2000</span>);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 以iPhone X执行。
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone X'];
await page.emulate(iPhone);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 以iPhone X执行。</span>
<span class="hljs-keyword">const</span> devices = <span class="hljs-built_in">require</span>(<span class="hljs-string">'puppeteer/DeviceDescriptors'</span>);
<span class="hljs-keyword">const</span> iPhone = devices[<span class="hljs-string">'iPhone X'</span>];
<span class="hljs-keyword">await</span> page.emulate(iPhone);</code></pre>
<h3 id="articleHeader5">2.4 知道了以上这些<code>API</code>后，就可以开始写主程序了。</h3>
<p>简单说下：实现功能和主流程。从上面<code>React.js小书</code>截图来看。<br>1、打开浏览器，进入目录页，生成<code>0. React 小书 目录.pdf</code><br>2、跳转到<code>1. React.js 简介</code>页面，获取左侧所有的导航<code>a</code>链接的<code>href</code>,标题。<br>3、用获取到的<code>a链接数组</code>进行<code>for</code>循环，这个循环里主要做了如下几件事：</p>
<blockquote>3.1 隐藏左侧导航，便于生成<code>pdf</code><br>  3.2 给<strong><code>React.js简介</code></strong>等标题 加上序号，便于查看<br>  3.3 设置<code>docment.title</code> 加上序号, 便于在页眉中使用。<br>  3.4 隐藏 <strong>传播一下知识也是一个很好的选择</strong> 这一个模块（因为页眉页脚中设置了书的链接等信息，就隐藏这个了）<br>  3.5 给 分页 上一节，下一节加上序号，便于查看。<br>  3.6 最末尾声明下该<code>pdf</code>的说明，仅供学习交流，严禁用于商业用途。<br>  3.7 返回宽高，用于设置视图大小<br>  3.8 设置视图大小，创建生成<code>pdf</code>
</blockquote>
<p>4、关闭浏览器</p>
<p>具体代码：可以查看这里<a href="https://github.com/lxchuan12/learn-nodejs/blob/master/src/puppeteer/reactMiniBook.js" rel="nofollow noreferrer" target="_blank">爬虫生成《React.js小书》的<code>pdf</code>每一小节的代码</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// node 执行这个文件
// 笔者这里是：
node src/puppeteer/reactMiniBook.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>// <span class="hljs-keyword">node</span> <span class="hljs-title">执行这个文件
// 笔者这里是：
node</span> src/puppeteer/reactMiniBook.js</code></pre>
<p>即可生成如下图：每一小节（0-46小节）的<code>pdf</code></p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVbf7wc?w=416&amp;h=725" src="https://static.alili.tech/img/bVbf7wc?w=416&amp;h=725" alt="生成的每一小节（0-46小节）的pdf.png" title="生成的每一小节（0-46小节）的pdf.png" style="cursor: pointer; display: inline;"></span></p>
<p>生成这些后，那么问题来了，就是查看时总不能看一小节，打开一小节来看，这样很不方便。<br>于是接下来就是合并这些<code>pdf</code>成为一个<code>pdf</code>文件。</p>
<h2 id="articleHeader6">3、合并成一个PDF文件 <code>pdf-merge</code>
</h2>
<p>起初，我是使用在线网站<a href="https://smallpdf.com/cn" rel="nofollow noreferrer" target="_blank">Smallpdf</a>，合并<code>PDF</code>。合并的效果还是很不错的。这网站还是其他功能。比如<code>word</code>转<code>pdf</code>等。<br>后来找到社区提供的一个<code>npm</code> <code>package</code><a href="https://github.com/wubzz/pdf-merge" rel="nofollow noreferrer" target="_blank">pdf merge</a> 。(毕竟笔者是写程序的，所以就用代码来实现合并了)</p>
<p>这个<code>pdf-merge</code>依赖 <a href="https://www.pdflabs.com/docs/pdftk-man-page/" rel="nofollow noreferrer" target="_blank">pdftk</a></p>
<p><strong>安装 PDFtk</strong><br><strong>Windows</strong><br><a href="https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/" rel="nofollow noreferrer" target="_blank">下载并安装</a><br>笔者安装后，重启电脑才能使用。</p>
<p><strong>Debian, Ubuntu 安装</strong><br>笔者在Ubuntu系统安装后，即可使用。<br><code>apt-get install pdftk</code></p>
<p><strong>使用例子</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const PDFMerge = require('pdf-merge');

const files = [
    `${__dirname}/1.pdf`,
    `${__dirname}/2.pdf`,
];

// Buffer (Default)
PDFMerge(files)
.then((buffer) => {...});

// Stream
PDFMerge(files, {output: 'Stream'})
.then((stream) => {...});

// 笔者这里使用的是这个
// Save as new file
PDFMerge(files, {output: `${__dirname}/3.pdf`})
.then((buffer) => {...});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code><span class="hljs-keyword">const</span> <span class="hljs-type">PDFMerge</span> = require('pdf-merge');

<span class="hljs-keyword">const</span> files = [
    `${__dirname}/<span class="hljs-number">1</span>.pdf`,
    `${__dirname}/<span class="hljs-number">2</span>.pdf`,
];

// <span class="hljs-type">Buffer</span> (<span class="hljs-type">Default</span>)
<span class="hljs-type">PDFMerge</span>(files)
.then((buffer) =&gt; <span class="hljs-meta">{...}</span>);

// <span class="hljs-type">Stream</span>
<span class="hljs-type">PDFMerge</span>(files, {output: '<span class="hljs-type">Stream</span>'})
.then((stream) =&gt; <span class="hljs-meta">{...}</span>);

// 笔者这里使用的是这个
// <span class="hljs-type">Save</span> <span class="hljs-keyword">as</span> new file
<span class="hljs-type">PDFMerge</span>(files, {output: `${__dirname}/<span class="hljs-number">3</span>.pdf`})
.then((buffer) =&gt; <span class="hljs-meta">{...}</span>);</code></pre>
<p>知道这些后，可以开始写主程序了。<br>简单说下主流程<br>1、读取到生成的所有<code>pdf</code>文件路径，并排序（0-46）<br>2、判断下输出文件夹是否存在，不存在则创建<br>3、合并这些小节的<code>pdf</code>保存到新文件 <code>React小书（完整版）-作者：胡子大哈-时间戳.pdf</code></p>
<p>具体代码：可以查看这里<a href="https://github.com/lxchuan12/learn-nodejs/blob/master/src/puppeteer/mergePdf.js" rel="nofollow noreferrer" target="_blank">爬虫生成《React.js小书》的<code>pdf</code>合并<code>pdf</code>的代码</a></p>
<p>最终合并的<code>pdf</code>文件在这里<a href="https://github.com/lxchuan12/learn-nodejs/blob/master/src/puppeteer/reactMiniBookMerged/React%E5%B0%8F%E4%B9%A6%EF%BC%88%E5%AE%8C%E6%95%B4%E7%89%88%EF%BC%89-%E4%BD%9C%E8%80%85%EF%BC%9A%E8%83%A1%E5%AD%90%E5%A4%A7%E5%93%88-1535335084919.pdf" rel="nofollow noreferrer" target="_blank">React小书（完整版）-作者：胡子大哈</a>，可供下载。</p>
<p>本想着还可以加下书签和页码，没找到合适的生成方案，那暂时先不加了。如果读者有好的方案，欢迎与笔者交流。</p>
<h2 id="articleHeader7">关于</h2>
<p>作者：常以<strong>轩辕Rowboat</strong>为名混迹于江湖。前端路上 | PPT爱好者 | 所知甚少，唯善学。<br><a href="https://lxchuan12.github.io/" rel="nofollow noreferrer" target="_blank">个人博客</a><br><a href="https://segmentfault.com/u/lxchuan12">segmentfault个人主页</a><br><a href="https://juejin.im/user/57974dc55bbb500063f522fd/posts" rel="nofollow noreferrer" target="_blank">掘金个人主页</a><br><a href="https://www.zhihu.com/people/lxchuan12/activities" rel="nofollow noreferrer" target="_blank">知乎</a><br><a href="https://github.com/lxchuan12" rel="nofollow noreferrer" target="_blank">github</a></p>
<h2 id="articleHeader8">小结</h2>
<p>1、<code>puppeteer</code>是<code>Google</code> 官方出品的 <code>headless</code> <code>Chrome</code> <code>node</code> 库，可以在浏览器中手动执行的大多数操作都可以使用<code>Puppeteer</code>完成。总之可以用来做很多有趣的事情。<br>2、用 <code>puppeteer</code> 生成每一小节的<code>pdf</code>，用依赖<code>pdftk</code>的<code>pdf-merge</code> <code>npm</code>包, 合并成一个新的<code>pdf</code>文件。或者使用<a href="https://smallpdf.com/cn" rel="nofollow noreferrer" target="_blank">Smallpdf</a>等网站合并。<br>3、<a href="http://huziketang.mangojuice.top/books/react/" rel="nofollow noreferrer" target="_blank">《<code>React.js</code>小书》</a>，推荐给大家。爬虫生成<code>pdf</code>，应该不会对<a href="http://huziketang.mangojuice.top/books/react/me/" rel="nofollow noreferrer" target="_blank">作者@胡子大哈</a>有什么影响。作者写书服务社区不易，尽可能多支持作者。</p>
<p>最后推荐几个链接，方便大家学习 <code>puppeteer</code>。<br><a href="http://www.r9it.com/20171106/puppeteer.html" rel="nofollow noreferrer" target="_blank">puppeteer入门教程</a><br><a href="https://cloud.tencent.com/developer/article/1006000" rel="nofollow noreferrer" target="_blank">Puppeteer 初探之前端自动化测试</a><br><a href="https://github.com/zhentaoo/puppeteer-deep" rel="nofollow noreferrer" target="_blank">爬虫生成ES6标准入门 pdf</a><br><a href="https://jeffjade.com/2017/12/17/134-kinds-of-toss-using-puppeteer/" rel="nofollow noreferrer" target="_blank">大前端神器安利之 Puppeteer</a><br><a href="https://github.com/zhaoqize/puppeteer-api-zh_CN/" rel="nofollow noreferrer" target="_blank">puppeteer API中文文档</a></p>

                
{{< /raw >}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://segmentfault.com/a/1190000016198363](https://segmentfault.com/a/1190000016198363)

## 原文标题
前端使用puppeteer 爬虫生成《React.js 小书》PDF并合并
