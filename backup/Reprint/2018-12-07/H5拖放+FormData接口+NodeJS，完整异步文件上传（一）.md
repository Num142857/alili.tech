---
title: 'H5拖放+FormData接口+NodeJS，完整异步文件上传（一）' 
date: 2018-12-07 2:30:10
hidden: true
slug: var0cd7g6u
categories: [reprint]
---

{{< raw >}}

                    
<p>  前段时间面试过程中，频繁遇到H5异步文件上传的相关问题。还遇到过一个"通过H5拖放功能实现文件异步上传"的问题，大概知道H5有新增拖拽功能可以接收文件，如何异步上传文件就母鸡了(摊手)。面试结束后，特意去看了相关知识点，了解到<strong>H5拖放+FormData接口</strong>可以实现异步上传。为了测试文件上传是否成功，还去看了Node.js如何接收异步文件上传。所以，这会是一个<strong>H5拖放+FormData接口+Node.js</strong>实现文件异步上传的完整Demo。  <br>  先简单介绍一下这几个知识点，贴上详细介绍的链接，有兴趣的同学可以点进去多了解一些。</p>
<h4>HTML5 拖放</h4>
<p>  拖放（Drag 和 drop）是 HTML5 标准的组成部分。拖放是一种常见的特性，即抓取对象以后拖到另一个位置。抓取的对象可以是页面中DOM元素（需要设置draggable="true"）或者系统文件。监听放置元素的drop事件，通过DataTransfer对象可以获得拖拽事件的状态及数据。详情可查阅<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API" rel="nofollow noreferrer" target="_blank">MDN的HTML5 拖放 API文档</a>。</p>
<h4>FormData 接口</h4>
<p>  XMLHttpRequest Level 2添加了一个新的接口FormData。利用FormData对象，我们可以通过JavaScript用一些键值对来模拟一系列表单控件，我们还可以使用XMLHttpRequest的send()方法来异步的提交这个"表单"。比起普通的ajax，使用FormData的最大优点就是我们可以异步上传一个二进制文件。详情可查阅<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/FormData" rel="nofollow noreferrer" target="_blank">MDN的FormData接口文档</a>。</p>
<h4>后端文件接收&amp;保存</h4>
<p>  后端使用Node.js+Express+Multer实现文件上传。<a href="http://www.expressjs.com.cn/" rel="nofollow noreferrer" target="_blank">Express</a>基于 Node.js平台，快速、开放、极简的web开发框架。<a href="https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md" rel="nofollow noreferrer" target="_blank">Multer</a> 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件。</p>
<h4>小二，上代码</h4>
<p><strong>新建drop.html,插入以下代码</strong>   </p>
<p><strong>HTML代码:</strong> 先添加一个放置的div,并且监听ondrop和ondragover事件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;drop-area&quot;  ondrop=&quot;drop_hander(event)&quot; ondragover = &quot;dragover_hander(event)&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"drop-area"</span>  <span class="hljs-attr">ondrop</span>=<span class="hljs-string">"drop_hander(event)"</span> <span class="hljs-attr">ondragover</span> = <span class="hljs-string">"dragover_hander(event)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><strong>样式代码:</strong> 加个边框，设置一下大小。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".drop-area{
    margin:auto;
    width: 500px;
    height: 500px;
    border:1px pink dashed;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.drop-area</span>{
    <span class="hljs-attribute">margin</span>:auto;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">500px</span>;
    <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> pink dashed;
}</code></pre>
<p><strong>JavaScript代码:</strong> 监听拖放事件，获取文件，创建XHR实例并发送请求</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 拖动到放置区域时 */
function dragover_hander (event) {
    /* 必须同时阻止dragover和drop的默认事件
       否则会响应浏览器默认行为
       浏览器能显示的文件会直接显示，例如html文件、图片文件
       浏览器不能显示的文件会出现文件下载弹窗
    */
    event.preventDefault(); 
}

/*拖放完成事件*/
function drop_hander (event) {

    event.preventDefault(); //阻止默认事件

    var files = event.dataTransfer.files; //通过dataTransfer对象获取文件对象数组
    var formData = new FormData(); //声明一个FormData实例

    for(var i = 0, len = files.length; i < len; i++) {
        //使用append方法添加文件到file键
        formData.append('file',  files[i]);
    }

    var request = new XMLHttpRequest(); //创建XHR实例
    request.open('POST', '/process_post'); //初始化请求
    request.send(formData);//发送请求
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">/* 拖动到放置区域时 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dragover_hander</span> (<span class="hljs-params">event</span>) </span>{
    <span class="hljs-comment">/* 必须同时阻止dragover和drop的默认事件
       否则会响应浏览器默认行为
       浏览器能显示的文件会直接显示，例如html文件、图片文件
       浏览器不能显示的文件会出现文件下载弹窗
    */</span>
    event.preventDefault(); 
}

<span class="hljs-comment">/*拖放完成事件*/</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drop_hander</span> (<span class="hljs-params">event</span>) </span>{

    event.preventDefault(); <span class="hljs-comment">//阻止默认事件</span>

    <span class="hljs-keyword">var</span> files = event.dataTransfer.files; <span class="hljs-comment">//通过dataTransfer对象获取文件对象数组</span>
    <span class="hljs-keyword">var</span> formData = <span class="hljs-keyword">new</span> FormData(); <span class="hljs-comment">//声明一个FormData实例</span>

    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = files.length; i &lt; len; i++) {
        <span class="hljs-comment">//使用append方法添加文件到file键</span>
        formData.append(<span class="hljs-string">'file'</span>,  files[i]);
    }

    <span class="hljs-keyword">var</span> request = <span class="hljs-keyword">new</span> XMLHttpRequest(); <span class="hljs-comment">//创建XHR实例</span>
    request.open(<span class="hljs-string">'POST'</span>, <span class="hljs-string">'/process_post'</span>); <span class="hljs-comment">//初始化请求</span>
    request.send(formData);<span class="hljs-comment">//发送请求</span>
}</code></pre>
<p><strong>新建formupload.js,写服务端代码</strong>：使用express创建服务，使用multer中间保存文件。 <strong>这里需要安装express和multer依赖包</strong>。这里默认你已经有简单了解Node.js，会使用npm安装依赖包。如果还没接触过，可以看看菜鸟教程的<a href="http://www.runoob.com/nodejs/nodejs-tutorial.html" rel="nofollow noreferrer" target="_blank">Node.js 教程</a>,看完前四节就行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const express = require('express'); //引入express模块
const app = express(); //创建一个express应用
const multer = require('multer'); // 引入multer模块

/*
 新建一个multer中间件，设置文件保存路径
 路径必须存在，否则会报错
*/
const upload = multer({ dest: 'uploads/' }); 

/* 请求/drop.html，返回文件 */
app.get('/drop.html', function (req, res) {
   res.sendFile( __dirname + &quot;/&quot; + &quot;drop.html&quot; );
})

/* 
创建提交接口
使用中间件处理
upload.array('file')表示上传一个名为file文件数组
 */
app.post('/process_post', upload.array('file'), function (req, res,next) {
 
  if (!req.files) { // 末上传文件的返回
    res.json({ ok: false });
    return;
  }
  //有上传文件,返回文件列表
  res.json(req.files) 
  return;
})

//启动服务，监听8081端口
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log(&quot;应用实例，访问地址为 http://%s:%s&quot;, host, port)
 
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>); <span class="hljs-comment">//引入express模块</span>
<span class="hljs-keyword">const</span> app = express(); <span class="hljs-comment">//创建一个express应用</span>
<span class="hljs-keyword">const</span> multer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'multer'</span>); <span class="hljs-comment">// 引入multer模块</span>

<span class="hljs-comment">/*
 新建一个multer中间件，设置文件保存路径
 路径必须存在，否则会报错
*/</span>
<span class="hljs-keyword">const</span> upload = multer({ <span class="hljs-attr">dest</span>: <span class="hljs-string">'uploads/'</span> }); 

<span class="hljs-comment">/* 请求/drop.html，返回文件 */</span>
app.get(<span class="hljs-string">'/drop.html'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
   res.sendFile( __dirname + <span class="hljs-string">"/"</span> + <span class="hljs-string">"drop.html"</span> );
})

<span class="hljs-comment">/* 
创建提交接口
使用中间件处理
upload.array('file')表示上传一个名为file文件数组
 */</span>
app.post(<span class="hljs-string">'/process_post'</span>, upload.array(<span class="hljs-string">'file'</span>), <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res,next</span>) </span>{
 
  <span class="hljs-keyword">if</span> (!req.files) { <span class="hljs-comment">// 末上传文件的返回</span>
    res.json({ <span class="hljs-attr">ok</span>: <span class="hljs-literal">false</span> });
    <span class="hljs-keyword">return</span>;
  }
  <span class="hljs-comment">//有上传文件,返回文件列表</span>
  res.json(req.files) 
  <span class="hljs-keyword">return</span>;
})

<span class="hljs-comment">//启动服务，监听8081端口</span>
<span class="hljs-keyword">var</span> server = app.listen(<span class="hljs-number">8081</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
 
  <span class="hljs-keyword">var</span> host = server.address().address
  <span class="hljs-keyword">var</span> port = server.address().port
 
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"应用实例，访问地址为 http://%s:%s"</span>, host, port)
 
})</code></pre>
<p>到这里代码就结束了，下面是目录结构。完整代码可以查看<a href="https://github.com/Fatty-Shu/h5-drop-upload" rel="nofollow noreferrer" target="_blank">项目github地址</a>。<strong>注意：uploads文件夹一定要存在，否则服务会报错</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="h5-drop-upload
|- /uploads
|- drop.html
|- formupload
|- package.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">h5-drop-upload
|- <span class="hljs-regexp">/uploads
|- drop.html
|- formupload
|- package.json</span></code></pre>
<p>打开命令行，在h5-drop-upload目录下执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node formupload.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">node formupload.js</code></pre>
<p>如果没报错，会输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="应用实例，访问地址为 http://:::8081" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">应用实例，访问地址为 http:<span class="hljs-comment">//:::8081</span></code></pre>
<p>打开浏览器，输入：127.0.0.1:8081/drap.html。然后拖动文件到粉红色的框中，查看upload文件夹，你上传的文件就会这里（为了避免命名冲突，Multer 会修改上传的文件名）。到了这里还没报错，就表示整个“H5拖放+FormData接口+Node.js”文件上传的Demo已经跑通了，可以结自己鼓掌了。 </p>
<p><span class="img-wrap"><img data-src="/img/bV7qtP?w=264&amp;h=220" src="https://static.alili.tech/img/bV7qtP?w=264&amp;h=220" alt="鼓掌" title="鼓掌" style="cursor: pointer; display: inline;"></span></p>
<p> </p>
<h4>结束语</h4>
<p>  我们已经简单实现文件异步上传功能，但离实际使用场景还有差距。实际使用中，肯定不能拖放完成就马上上传，至少应该显示一个文件列表，用户可以增删文件，最后确认再开始上传。更进一步，最好可以给个进度条，显示文件上传进度。接下来，让我们继续完善，敬请期待下篇。  </p>
<p>  如果你已经看这里，麻烦顺便点个赞咯。。。。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
H5拖放+FormData接口+NodeJS，完整异步文件上传（一）

## 原文链接
[https://segmentfault.com/a/1190000014124076](https://segmentfault.com/a/1190000014124076)

