---
title: '后端知识点总结——NODE.JS基础' 
date: 2018-12-06 2:30:09
hidden: true
slug: z3tcrnbs2db
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0"><strong>后端知识点总结——NODE.JS基础</strong></h1>
<h2 id="articleHeader1">1.Node.js</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" Node.js不是JS,是一种软件开发平台，它的竞争对象JSP/PHP/ASP.NET,历史第一次有一种语言可以通吃前后端.
 网站：阿里云镜像
 https://npm.taobao.org/mirrors/node/
 版本:0.12(16年初)  4.x(16年中)  6.x(16年底)
 LTS:Long Term Support
 Current:最新版本
 
   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code> <span class="hljs-keyword">Node</span>.<span class="hljs-title">js</span>不是JS,是一种软件开发平台，它的竞争对象JSP/PHP/ASP.NET,历史第一次有一种语言可以通吃前后端.
 网站：阿里云镜像
 https://npm.taobao.org/mirrors/<span class="hljs-keyword">node</span><span class="hljs-title">/
 版本:0</span>.<span class="hljs-number">12</span>(<span class="hljs-number">16</span>年初)  <span class="hljs-number">4</span>.x(<span class="hljs-number">16</span>年中)  <span class="hljs-number">6</span>.x(<span class="hljs-number">16</span>年底)
 LTS:Long Term Support
 Current:最新版本
 
   </code></pre>
<p>JSP     = HTML+JAVA  功能强大可靠，适合大型企业级项目<br>   PHP    = HTML+PHP   简单易用,适合互联网项目<br>   ASP.NET = HTML+C#     易用,适合windows 平台</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       30w==2w+0.5w+20w+10w" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">       <span class="hljs-number">30</span>w==<span class="hljs-number">2</span>w+<span class="hljs-number">0.5</span>w+<span class="hljs-number">20</span>w+<span class="hljs-number">10</span>w</code></pre>
<p>Node.JS = HTML+”JS”    性能好,适合服务器端IO密集型项目,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                     不适合CPU密集型项目
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs x86asm"><code>                     不适合<span class="hljs-meta">CPU</span>密集型项目
</code></pre>
<p>CPU密集项目:滴滴打车,天气预报,大数据分析,大数据计算..<br>   IO密集项目:查询,修改,删除,</p>
<h2 id="articleHeader2">2.Node运行的两种方式</h2>
<p>(1)交互模块---简单了解(测试新功能)<br>   REPL:输入一行代码执行一行<br>   注意:交互模自带输出功能,不必一定要 console.log()<br>   node 回车  进入交互模式<br>   .exit        退出</p>
<p>(2)脚本模块—正式项目中使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  把要执行所有语句编写一个文本文件中(后缀任意，没有),一次性提交node解析器执行.
  node 完整路径/x.js 回车
  提交:只要安装成node.js,重启webstorm,ws可以自动发现node.exe解析，
  新的项目和文件编写一定UTF-8


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>  把要执行所有语句编写一个文本文件中(后缀任意，没有),一次性提交<span class="hljs-keyword">node</span><span class="hljs-title">解析器执行.
  node</span> 完整路径/x.js 回车
  提交:只要安装成<span class="hljs-keyword">node</span>.<span class="hljs-title">js</span>,重启webstorm,ws可以自动发现<span class="hljs-keyword">node</span>.<span class="hljs-title">exe</span>解析，
  新的项目和文件编写一定UTF-<span class="hljs-number">8</span>


</code></pre>
<h2 id="articleHeader3">3.nodejs中特有概念—模块---(重点)</h2>
<p>一个项目中多个”模块”,订单模块，用户模块，支付模块....</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     node.js按照功能，可以把函数，对象分别保存不同文件或目录下，
     这些目录和文件在node.js称为一个“模块”
     04_node.js  05.js 
  ##注意:Node.JS每个一个模块都是一个独立构造函数，
    Node.JS解析器自动为每一个.js文件添加如下代码.
    (function(exports,require,module,__filename,__dirname){
         exports:{} 用于声明向外部导出自己成员
         require:fn 用于导入其它的模块，并且创建指定模块对象
         module: 当前模块对象
         __filename
         __dirname" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>     <span class="hljs-keyword">node</span>.<span class="hljs-title">js</span>按照功能，可以把函数，对象分别保存不同文件或目录下，
     这些目录和文件在<span class="hljs-keyword">node</span>.<span class="hljs-title">js</span>称为一个“模块”
     <span class="hljs-number">04</span>_node.js  <span class="hljs-number">05</span>.js 
  <span class="hljs-comment">##注意:Node.JS每个一个模块都是一个独立构造函数，</span>
    <span class="hljs-keyword">Node</span>.<span class="hljs-title">JS</span>解析器自动为每一个.js文件添加如下代码.
    (function(exports,require,module,__filename,__dirname){
         exports:{} 用于声明向外部导出自己成员
         require:fn 用于导入其它的模块，并且创建指定模块对象
         module: 当前模块对象
         __filename
         __dirname</code></pre>
<p>var i = 10;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="         var j = 11;
         console.log(i+j);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code>         var <span class="hljs-built_in">j</span> = <span class="hljs-number">11</span>;
         console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">i</span>+<span class="hljs-built_in">j</span>);</code></pre>
<p>});</p>
<h2 id="articleHeader4">4.Node.js 模块中exports和module.exports对象区别是什么?</h2>
<p>二者都可以用于向外导出自己内部成员，<br>但:实际向外导出成员 module.exports<br>   exports 对应一个引用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   每个模块都可以使用自己require();引入另一个模块—底层本质是创建指定模块一个对象实例.
   08_data.js  声明二个变量一个函数 ->导出一个变量一个函数
   09_app.js   引入

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>   每个模块都可以使用自己require()<span class="hljs-comment">;引入另一个模块—底层本质是创建指定模块一个对象实例.</span>
   <span class="hljs-number">08</span>_data.<span class="hljs-keyword">js </span> 声明二个变量一个函数 -&gt;导出一个变量一个函数
   <span class="hljs-number">09</span>_app.<span class="hljs-keyword">js </span>  引入

</code></pre>
<h2 id="articleHeader5">5.nodejs 模块-目录模块</h2>
<p>自定义模块的两种形式<br>(1)文件模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  创建一个JS文件,如m3.js,导出其公开数据，
  其它模块可以require(&quot;./m3&quot;);引入
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>  创建一个<span class="hljs-keyword">JS文件,如m3.js,导出其公开数据，
</span>  其它模块可以require(<span class="hljs-string">"./m3"</span>)<span class="hljs-comment">;引入</span>
</code></pre>
<p>(2)目录模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   方式一:创建一个目录,假设m4,其中创建index.js文件，导
          出需要公开数据。其它模块引入
          var m = require(“./m4”);
   方式二:创建一个目录,假设m5,其中创建5.js文件，导出需要
         公开数据数据,创建package.json文件 main指定启动" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code>   方式一:创建一个目录,假设m4,其中创建<span class="hljs-keyword">index</span>.js文件，导
          出需要公开数据。其它模块引入
          <span class="hljs-keyword">var</span> m = <span class="hljs-keyword">require</span>(“./m4”);
   方式二:创建一个目录,假设m5,其中创建<span class="hljs-number">5</span>.js文件，导出需要
         公开数据数据,创建package.json文件 main指定启动</code></pre>
<p>文件 5.js 其它模块引入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   var m = require(“./m5”);
   方式三:创建一个目录,必须名为 node_modules 
   ,其中再创建目录模块,假设 m6 其中创建 package.json
   文件，其中声明 main属性指定默认执行启动js,如6.js，
   其中导出需要公共数据，其它模块引入
   require(“m6”);
   
    
          
文件模块    目录模块(方式三)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>   <span class="hljs-keyword">var</span> m = <span class="hljs-built_in">require</span>(“./m5”);
   方式三:创建一个目录,必须名为 node_modules 
   ,其中再创建目录模块,假设 m6 其中创建 package.json
   文件，其中声明 main属性指定默认执行启动js,如<span class="hljs-number">6.</span>js，
   其中导出需要公共数据，其它模块引入
   <span class="hljs-built_in">require</span>(“m6”);
   
    
          
文件模块    目录模块(方式三)</code></pre>
<p>程序结构    m1.js    node_modules</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    m2
   package.json
   2.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-tag">m2</span>
   <span class="hljs-selector-tag">package</span><span class="hljs-selector-class">.json</span>
   2<span class="hljs-selector-class">.js</span></code></pre>
<p>模块名称    m1    m2<br>导出数据    module.exports    module.exports<br>导入模块    var m = require(“./m1”);    var m = require(“m2”);</p>
<h2 id="articleHeader6">6.Node.js 解析引擎自带 原生模块—Buffer(缓冲区)</h2>
<p>Buffer:缓冲区,本质上是一块内存区域，用于暂存以后要用到数据<br> (数字,字符串,二进制图片/音频/视频),该区域称为“缓存”</p>
<h1 id="articleHeader7">分配置一个指定大小缓冲区  1024字节</h1>
<p>建议：缓冲区大小不超过 512KB   512*1024</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var buff1 = Buffer.alloc(1024);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">var buff1 = Buffer.alloc(<span class="hljs-number">1024</span>)<span class="hljs-comment">;</span></code></pre>
<h1 id="articleHeader8">使用一个数组创建缓冲区</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var buff2 = Buffer.from([1,2,3]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">var buff2 = Buffer.from([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]);</code></pre>
<h1 id="articleHeader9">使用一个字符串创建缓冲区</h1>
<p>var buff4 = Buffer.from(“abc”);</p>
<h1 id="articleHeader10">将一个缓冲区内容转换字符串{如果缓冲区数据是字符串}</h1>
<p>var str = buff4.toString();</p>
<ol><li>Node.js 原生模块—QueryString</li></ol>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" querystring模块用于处理HTTP请求URL中查询字符串
 var obj = qs.parse(str);   把查询字符串解析js对象
 var str = qs.stringify(obj) 把js对象转换为查询字符串
 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code> querystring模块用于处理HTTP请求URL中查询字符串
 var obj = qs.parse(<span class="hljs-keyword">str); </span>  把查询字符串解析js对象
 var <span class="hljs-keyword">str </span>= qs.<span class="hljs-keyword">stringify(obj) </span>把js对象转换为查询字符串
 
</code></pre>
<ol><li>Node.js 原生模块—URL</li></ol>
<hr>
<p>url模块用于解析一个HTTP请求地址，获取其中各个部分<br>   var obj = url.parse(str);    把一个URL地址为js对象<br>   var obj = url.parse(str,true); 功能同上，并且把其中查询字符串转换</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                      js obj
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">                      js obj</span>
</code></pre>
<ol><li>Node.js 原生模块—fs—(重点)</li></ol>
<hr>
<p>文件:在node.js 我们系统文件或者目录统称为文件<br>   fs 模块提供对文件和目录进行，增删改查，读定文件内容<br>(1)    同步读写文件(阻塞)</p>
<h1 id="articleHeader11">同步读取文件内容 var data = fs.readFileSync(fileName);</h1>
<h1 id="articleHeader12">同步向文件写内容 fs.writeFileSync(fileName,data);</h1>
<p>注意:(1)如果当前写入文件并不存在，自动创建一个</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  a.txt
  (2)如果当前写入目录并不存在，报错
  d:/abc/a.txt
  (3)如果当前文件己经存在内容，清空" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>  <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.txt</span>
  (<span class="hljs-number">2</span>)如果当前写入目录并不存在，报错
  d:/abc/<span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.txt</span>
  (<span class="hljs-number">3</span>)如果当前文件己经存在内容，清空</code></pre>
<h1 id="articleHeader13">同步向文件追加内容</h1>
<p>fs.appendFileSync(fileName,data);</p>
<p>(2)    异步读写文件(非阻塞)</p>
<h1 id="articleHeader14">异步读取数据  fs.readFile(fileName,function(err,data){ });</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="           函数:文件读取完成后调用
           err:读取文件不存在，权限不足,
           自动创建错误对象 
     #异步写数据    fs.writeFile(fileName,data,function(err){})
                    函数:文件写结束调用
     #异步追加数据  fs.appendFile(fileName,data,function(err){})
                    函数:文件追加结束

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>           函数:文件读取完成后调用
           err:读取文件不存在，权限不足,
           自动创建错误对象 
     #异步写数据    fs.writeFile(fileName,<span class="hljs-keyword">data</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err)</span></span>{})
                    函数:文件写结束调用
     #异步追加数据  fs.appendFile(fileName,<span class="hljs-keyword">data</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err)</span></span>{})
                    函数:文件追加结束

</code></pre>
<ol><li>Node.js 原生模块--http</li></ol>
<hr>
<p>HTTP 模块可用于编写基于HTTP协议客户端程序(即浏览器),也可以编写一个基于HTTP协议服务器(APACHE)<br>   APACHE[1000并发量]  nginx[28000]   IIS[微软]</p>
<p>用http模块编写一个web服务器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(1)创建服务器对象        var server  = http.createServer();
(2)绑定监听端口 1-65535  server.listen(3000);
(3)接收客户端请求，      server.on(“request”,(req,res)=>{..})
(4)并且响应客户消息      res.end(str...);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>(<span class="hljs-number">1</span>)创建服务器对象        <span class="hljs-keyword">var</span> server  = http.createServer();
(<span class="hljs-number">2</span>)绑定监听端口 <span class="hljs-number">1</span>-<span class="hljs-number">65535</span>  server.listen(<span class="hljs-number">3000</span>);
(<span class="hljs-number">3</span>)接收客户端请求，      server.on(“request”,(req,res)=&gt;<span class="hljs-meta">{..}</span>)
(<span class="hljs-number">4</span>)并且响应客户消息      res.<span class="hljs-keyword">end</span>(str...);
</code></pre>
<p>req:请求对象:保存客户端请求消息<br>req.url 请求url地址</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="res:响应对象:服务器发送数据客户端,修改响应格式
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-symbol">res:</span>响应对象:服务器发送数据客户端,修改响应格式
</code></pre>
<p>三个常用对象:<br>(1)    server 代表服务器对象</p>
<p>(2)    req    (request)请求对象，保存客户端很多信息<br>req.url            客户请求地址<br>req.method           客户请求方式<br>req.httpVersion     HTTP版本<br>req.headers        请求头</p>
<p>(3)    res    (response)响应对象，保存服务器端向客户发送数据<br>res.statusCode = 200;<br>res.setHeader(); 设置响应头<br>res.write();     向客户端输入响应消息主体<br>res.end();      通知客户端，响应消息结束(只能一次)<br>   常见错误:程序端口被占用<br>   listen EADDRINUSE :::3000<br>   解决：查找前面程序停止即可</p>
<h2 id="articleHeader15">11.node.js 第三方模块 (mysql/express)</h2>
<p>使用node.js访问mysql服务器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="为了精简NODE.JS解析器，官方没有提供访问任何数据库相关模块," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">为了精简<span class="hljs-keyword">NODE</span>.<span class="hljs-title">JS</span>解析器，官方没有提供访问任何数据库相关模块,</code></pre>
<p>必须使用工具 npm 下载第三方模块,在www.npmjs.org 搜索关键字<br>Mysql 可以得到相关模块，每个模块使用说明.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
示例:下载
npm install mysql  简写  npm i mysql
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>
示例:下载
<span class="hljs-built_in">npm</span> install mysql  简写  <span class="hljs-built_in">npm</span> i mysql
</code></pre>
<p>mysql模块使用步骤<br>  (1)复制模块 node_modules  day03根目录下<br>  (2)加载mysql模块        const mysql = require(“mysql”);<br>  (3)创建到数据库服务器连接</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                      var conn = mysql.createConnection({})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">                      <span class="hljs-selector-tag">var</span> conn = mysql.createConnection({})</code></pre>
<p>(4)发送sql语句并且获取服务器返回结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="               conn.query(sql,(err,result)=>{});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">               conn.query(sql,<span class="hljs-function"><span class="hljs-params">(err,result)</span>=&gt;</span>{});</code></pre>
<p>(5)关闭连接             conn.end();</p>
<h2 id="articleHeader16">12.nodejs第三方模块express (重点)</h2>
<p>下载express 模块 <br>npm i express                http高级模块<br>npm i body-parser            处理post请求<br>npm i cookie-parser            处理cookie<br>npm i express-session        处理session<br>npm i cors                    跨域</p>
<p>express模块<br>   使用官方提供HTTP模块可以创建一个web服务器应用，但此模块<br>非常底层，要处理各种情形，比较繁琐。推荐使用HTTP高层模块，<br>express—第三方模块，是一个基于node.js http模块的高层模块，简化<br>服务器端开发。<br>(1)    下载模块 npm i express<br>(2)    将模块内容复制项目中 day04/node_modules<br>(3)    加载相应模块  http/express<br>(4)    创建express对象，再创建服务器对象，并且绑定监听端口<br>var app = express();<br>var server = http.createServer(app);<br>server.listen(3000);</p>
<p>常规语法规则:<br>app.get(请求地址,回调函数);</p>
<h1 id="articleHeader17">接收客户请求 GET /index.html</h1>
<p>app.get(“/index.html”,(req,res)=&gt;{});</p>
<h1 id="articleHeader18">接收客户请求 POST /index.html</h1>
<p>app.post(“/index.html”,(req,res)=&gt;{});</p>
<p>示例:<br>以前:login.php   参数 数据库  json</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.get(“login.php”,…..);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code style="word-break: break-word; white-space: initial;">$.<span class="hljs-keyword">get</span>(“login.php”,…..);</code></pre>
<p>现在:app.get(“/login.do”,(req,res)=&gt;{</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 参数 数据库 json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;"> 参数 数据库 json</code></pre>
<p>});<br>$.get(“/login.do”…..);</p>
<h2 id="articleHeader19">13.express req和res对象</h2>
<p>res.sendFile(__dirname+文件绝对路径); =fs.read+res.write+res.end<br>res.send(向客户端返回html字符串响应);<br>res.json(obj); =setHead()+JSON.parse()+res.write()+res.end()</p>
<p>express GET 请求 接收参数二种方法<br>  #GET /login.do?uid=10&amp;uname=tom<br>  app.get(“/login.do”,(req,res)=&gt;{</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//express为每一个req对象添加属性query
req.query.uid;
req.query.uname;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erlang"><code>//express为每一个req对象添加属性<span class="hljs-keyword">query</span>
req.<span class="hljs-keyword">query</span>.uid;
req.<span class="hljs-keyword">query</span>.uname;</code></pre>
<p>});</p>
<h1 id="articleHeader20">GET /login.do/12/tom</h1>
<p>app.get(“/login.do/:uid/:uname”,(req,res)=&gt;{<br>  //express 为每个req对象添加一个params 属性<br>  req.params.uid<br>  req.params.uname<br>});</p>
<h2 id="articleHeader21">14.为了项目提高效率创建连接池</h2>
<p>(1)创建连接池<br>var pool = mysql.createPool({…}); host;user;password;<br>connectionLimit:5   连接池中活动连接5个 <br>建议范围：5~25<br>1亿(PV/1day)= 8小时=28800秒=10-100=34/s<br>100000000/28800/100=<br>  (2)所有应用程序 租连接<br>   pool.getConnection((err,conn)=&gt;{<br>   });<br>(3)归还连接  conn.release();</p>
<h2 id="articleHeader22">15.请求方式:HTTP协议</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  请求方法:用于标识此次请求的目的
  GET    表示客户端想”获得”指定资源
  POST   表示客户端想”上传/添加”指定数据给服务器，" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>  请求方法:用于标识此次请求的目的
  <span class="hljs-meta">GET</span>    表示客户端想”获得”指定资源
  POST   表示客户端想”上传/添加”指定数据给服务器，</code></pre>
<p>请求数据在请求主体中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  PUT    表示客户端想”放置”数据在服务器
  DELETE 表示客户端想”删除”服务器上指定资源
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>  PUT    表示客户端想”放置”数据在服务器
  <span class="hljs-keyword">DELETE</span> 表示客户端想”删除”服务器上指定资源
</code></pre>
<h2 id="articleHeader23">16.发送请求</h2>
<p>浏览器发送GET请求</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   地址栏输入url回车/表单GET/AJAX GET/超链接/js跳转/img src
 浏览器发送POST请求
   表单POST/AJAX POST
 浏览器发送DELETE请求
   AJAX-DELETE
 浏览器发送PUT请求
   AJAX-PUT
  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>   地址栏输入url回车/表单GET/AJAX GET/超链接/js跳转/img src
 浏览器发送<span class="hljs-keyword">POST</span>请求
   表单<span class="hljs-keyword">POST</span>/AJAX <span class="hljs-keyword">POST</span>
 浏览器发送DELETE请求
   AJAX-DELETE
 浏览器发送PUT请求
   AJAX-PUT
  
</code></pre>
<p>项目:{跨域}<br> 两台web服务器   {nodejs  服务器业务功能}</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="              {apaceh 服务器接收请求响应html静态资源}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code style="word-break: break-word; white-space: initial;">              {apaceh 服务器接收请求响应html静态资源}</code></pre>
<p>一台数据库服务器 {数据   mysql服务器}</p>
<p>扩展思路与知识储备</p>
<p>注意事项:<br>如果客户端跨域请求服务器资源为了保存session工作正确<br>需要在ajax请求添加属性<br>xhrFields:{withCredentials:true}</p>
<h2 id="articleHeader24">17.项目瓶颈:数据库</h2>
<p>原理:数据库中数据保存在磁盘上的某一组文件<br>   解决一:提供SQL查询效率</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     SELECT uid,uname,age FROM xz_user;
     数据库对象:索引 提高查询效率[select];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code>     <span class="hljs-keyword">SELECT</span> uid,uname,age <span class="hljs-keyword">FROM</span> xz_user;
     数据库对象:索引 提高查询效率[<span class="hljs-keyword">select</span>];</code></pre>
<p>降低更新效率[update/delete/insert]</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     什么项目用:索引 查询多更新少
     索引为什么快:工作原理
     美团快递:送餐{死心眼}  数据库默认工作方式
     美团快递:送餐{机灵}   
      ALTER TABLE xz_user ADD INDEX (uname)
      SELECT uid FROM xz_user WHERE uname = “tom”;
      400w-没有加索引之前 查询一条记录 2s
      400w->加索引之后      查询一条记录 0.00002s
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code>     什么项目用:索引 查询多更新少
     索引为什么快:工作原理
     美团快递:送餐{死心眼}  数据库默认工作方式
     美团快递:送餐{机灵}   
      ALTER TABLE xz_user ADD <span class="hljs-keyword">INDEX</span> (uname)
      <span class="hljs-keyword">SELECT</span> uid <span class="hljs-keyword">FROM</span> xz_user <span class="hljs-keyword">WHERE</span> uname = “tom”;
      400w-没有加索引之前 查询一条记录 2s
      400w-&gt;加索引之后      查询一条记录 0.00002s
</code></pre>
<p>解决二:主从数据库服务器{一个服务器负责写数据&lt;主&gt;}</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                      {多个从服务器负责读数据<从>}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>                      {多个从服务器负责读数据<span class="hljs-tag">&lt;<span class="hljs-name">从</span>&gt;</span>}
</code></pre>
<p>解决三:内存级数据库服务器{NOSQL} 极高数据读写 Redis</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      数据库读写速度太高->数据库压力太大{出问题} cpu 100%
      社区:php/mysql    在线人数   t_online   2 服务器down
      $phpcount = 1;  ->redis ++ --  效率很好
      " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>      数据库读写速度太高-&gt;数据库压力太大{出问题} cpu <span class="hljs-number">100</span>%
      社区<span class="hljs-symbol">:php/mysql</span>    在线人数   t_online   <span class="hljs-number">2</span> 服务器down
      <span class="hljs-variable">$phpcount</span> = <span class="hljs-number">1</span>;  -&gt;redis ++ --  效率很好
      </code></pre>
<p>tts:学生登录   8:45~9:30   -&gt;mysqlRedis</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      微博/微信    微博[点赞]   120 Redis
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code>      微博/微信    微博<span class="hljs-string">[点赞]</span>   <span class="hljs-number">120</span> Redis
</code></pre>
<p>(2)提高项目{PV Page View} 高性能服务器/页面静态化<br> Nginx/</p>
<p>(3)安全角度</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" SQL   注入       node.js  ?
 XSS   攻击 脚本  oa[报销/申请办公用品/审批]  [确认]
                  document.all.readonly = true
 过滤用户所有输入值/所有危险字符串判断
 DDOS 攻击 向某个网站发送大量垃圾 防火墙
 解决:网店->天猫->阿里云   6G/s
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code> SQL   注入       <span class="hljs-keyword">node</span>.<span class="hljs-title">js</span>  ?
 XSS   攻击 脚本  oa[报销/申请办公用品/审批]  [确认]
                  document.all.readonly = <span class="hljs-literal">true</span>
 过滤用户所有输入值/所有危险字符串判断
 DDOS 攻击 向某个网站发送大量垃圾 防火墙
 解决:网店-&gt;天猫-&gt;阿里云   <span class="hljs-number">6</span>G/s
</code></pre>
<p>(4)数据分析数据挖掘(大数据/人工智能)</p>
<h2 id="articleHeader25">18.中间件-(路由级中间件)</h2>
<p>1.Express 是一个自身功能极简，完全是中间件构成web框架<br>   从本质上讲一个express应用就是由中间件组成系统.</p>
<p>2.中间件(Middleware)是一个函数,它可以访问请求对象和响应对象<br>  (req request,res response),可以控制请求-响应流程,有一个参数<br>  next变量 下一个中间件</p>
<p>3.中间件功能包括<br>执行任何代码<br>修改请求和响应对象<br>终结请求-响应循环  [拦载器]<br>调用下一个中间件</p>
<p>4.中间件分类<br>应用级中间件(<em>*</em>)<br>路由级中间件(<em>*</em>)<br>错误处理中间件<br>内置中间件</p>
<p>5.标准语法<br>app.use(url,(req,res,next)=&gt;{</p>
<p>});<br>url:拦载地址(触发地址)<br>req:请求对象<br>res:响应对象<br>next:调用下一个中间件或路由</p>
<p>6.路由中间件<br>路由 = 请求方法+请求地址+处理函数<br>示例: app.get(“/list”,(req,res)=&gt;{…})</p>
<p>语法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var router = express.Router();   //创建路由中间件对象
router.get(“/find”,(req,res)=>{});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> router = express.Router();   <span class="hljs-comment">//创建路由中间件对象</span>
router.<span class="hljs-keyword">get</span>(“/find”,(req,res)=&gt;{});</code></pre>
<p>router.post(“/list”,(req,res)=&gt;{});<br>module.exports = router;</p>
<p>app.use(“/user”,router); </p>
<p><a href="http://127.0.0.1" rel="nofollow noreferrer" target="_blank">http://127.0.0.1</a>:3000/user/find<br><a href="http://127.0.0.1" rel="nofollow noreferrer" target="_blank">http://127.0.0.1</a>:3000/user/list</p>
<p>(1)创建三个路由文件<br>router/userRouter.js     保存所有用户功能<br>router/orderRouter.js    保存所有订单功能<br>router/productRouter.js  保存所有产品功能</p>
<p>app.js<br>var userRouter = require(“./router/userRouter”);<br>var orderRouter = require(“./router/orderRouter”);<br>var productRouter = require(“./router/productRouter”);</p>
<p>app.use(“/user”,userRouter);<br>app.use(“/order”, orderRouter);<br>app.use(“/product”, productRouter);</p>
<p><a href="http://127.0.0.1" rel="nofollow noreferrer" target="_blank">http://127.0.0.1</a>:3000/user/list<br><a href="http://127.0.0.1" rel="nofollow noreferrer" target="_blank">http://127.0.0.1</a>:3000/order/list</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
后端知识点总结——NODE.JS基础

## 原文链接
[https://segmentfault.com/a/1190000014331349](https://segmentfault.com/a/1190000014331349)

