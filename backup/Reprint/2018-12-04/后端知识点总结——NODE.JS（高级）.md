---
title: '后端知识点总结——NODE.JS（高级）' 
date: 2018-12-04 2:30:05
hidden: true
slug: 2oty6g9skb6
categories: [reprint]
---

{{< raw >}}

                    
<h1><strong>后端知识点总结——NODE.JS（高级）</strong></h1>
<h2>1.Node入门:</h2>
<p>什么是: 针对网络应用开发的平台<br>主要特征:</p>
<ol>
<li>基于Google的JavaScript运行时引擎V8</li>
<li>扩展了Node标准类库: TCP，同步或异步文件管理，HTTP</li>
</ol>
<p>为什么使用Node:</p>
<ol>
<li>可以在服务器端运行js: 现有前端团队可直接参与后端js开发</li>
<li>
<p>js天生支持非阻塞IO:<br> IO: 代表一切数据进出程序的操作:<br>   包括: 文件读写, 数据库操作, 网络操作<br> 问题: 有延迟<br> 传统阻塞IO: IO操作会阻塞当前主线程，直到本次IO操作完成，才能执行后续代码。<br> 非阻塞IO: 即使处理较慢的IO操作时，主进城仍然能处理其他请求<br> Js天生支持非阻塞: 回调函数=事件循环+回调队列<br>   所有非阻塞的操作，返回的结果暂时在回调队列中等待<br>   由事件循环，自动依次取回到主程序中恢复执行<br>   回调队列在主程序之外存储回调函数，所以，不会干扰主程序执行<br> 非阻塞在Web服务器中: <br>  普通服务器端应用: 虽然可实现每个请求独立线程/进程, 但如果一个请求中，包含多个阻塞IO操作(访问数据库，网络，读写硬盘文件)，该请求返回的时间就等于所有IO操作的时间总和——慢<br>  Node服务器端应用: 不但每个请求是一个独立的线程，且，每个请求内的每个IO操作，都是非阻塞的。</p>
<pre><code>一个包含多个IO操作的请求，返回的总响应时间，仅仅等于其中一个时间最长的IO操作的时间。
Node.js vs javascript: 
Javascript: 编程语言, 依照ECMAScript</code></pre>
<p>2种运行环境:</p>
<ol>
<li>客户端浏览器: 由各种客户端浏览器中的js解释器执行<br> 扩展: DOM API 和 BOM API 主要目的是为了操作网页内容和浏览器窗口</li>
<li>独立的js解释器:Node.js 应用程序开发和运行的平台<br> 仅支持ECMAScript<br> 扩展: 各种专门的服务器模块: TCP, HTTP, 文件读写, MYSQL<p>构建一个简单的node应用: <br> 创建一个新的node项目: 基本命令:<br> mkdir 项目文件夹<br> cd 项目文件夹<br> npm init  //负责在当前所在的项目目录下自动生成package.json配置文件<br> 运行:node 入口文件.js</p>
</li>
</ol>
</li>
</ol>
<h2>2.module</h2>
<p>Node应用都是由模块组成<br>模块就是组织程序功能的一种文件或文件夹<br>Node应用采用CommonJS模块规范<br>CommonJS规定:</p>
<ol>
<li>每个文件就是一个模块，有自己的作用域——避免全局污染<br>  一个文件内定义的变量，函数，类都是该文件私有，对其它文件默认不可见</li>
<li>对象，方法和变量也可以从一个文件/模块中导出(exports)，用在其它文件/模块中。</li>
</ol>
<p>实际项目中，都是将各种功能/数据，划分为不同项目模块来管理<br> 如何定义一个模块：2步:</p>
<ol>
<li>在模块/文件中定义业务代码(对象,class,函数)</li>
<li>将内部的功能抛出，用于将来其它js文件调用</li>
</ol>
<p>2种情况:</p>
<h2>2.1面向对象的方式:</h2>
<ol>
<li>定义一种class或一个对象，包裹属性和功能</li>
<li>
<p>将class或对象直接赋值给module.exports<br>  其中: module，指当前模块对象/当前文件</p>
<pre><code>   exports是当前module对象的一个属性
     本质上也是一个对象，保存将来要抛出的所有东西
     exports是当前模块对外的唯一接口</code></pre>
<p>今后，只要希望将模块内部的东西，抛出到外部，供其它文件使用时，都要添加到module.exports上<br>  其它文件要想使用当前模块的功能，就必须用require引入当前模块，而require的本质是找模块的exports.</p>
</li>
</ol>
<h2>2.2面向函数的方式:</h2>
<ol>
<li>在文件中，定义多个零散的方法</li>
<li>将多个零散的方法添加到module的exports上<br>  其实，可先将零散的方法，先集中定义在一个对象中，再将整个对象赋值给module.exports属性</li>
</ol>
<p>引入模块: require() 专门负责加载模块文件<br>   何时: 只要在另一个js文件中，引入自定义模块并获取内容时，都用require<br>   本质: 找到js文件，并执行，返回module.exports对象<br>   优化: 单例模式singleton: 始终保持项目中只有一个对象的实例</p>
<pre><code>模块的引入和加载也是单例模式: 模块只在第一次被require时，创建。之后，缓存在内存中。反复require不会导致反复创建模块对象。</code></pre>
<p>强调: 模块是同步加载：前一个加载完，后一个才能开始</p>
<pre><code> 强烈建议: 所有require必须集中在顶部</code></pre>
<p>路径: 以./开头，表示使用相对路径，相对于当前正在执行脚本所在路径——不能省略!</p>
<pre><code>    以/开头，表示Linux系统根目录——绝对路径
    以自定义变量开头,表示在变量保存的地址下继续查找
    什么前缀也不加！只写模块名: 表示加载一个核心模块或项目引入的第三方模块
      路径查找顺序:
        /usr/local/lib/node/模块名.js
        /home/user/projects/node_modules/模块名.js
        /home/user/node_modules/模块名.js
        /home/node_modules/模块名.js
        /node_modules/模块名.js</code></pre>
<p>坑: 简写: module.exports.fun=function(){…}</p>
<pre><code>       可简写为: exports.fun=function(){…}
   exports其实是module.exports的别名
   var exports=module.exports;
问题: 给exports赋值，无法赋值给module.exports
   因为exports只是一个变量，临时保存module.exports的地址值。再次给exports赋任何新值，都导致exports与module.exports分道扬镳！
避免: 不要用简写exports

</code></pre>
<h2>3.目录模块:</h2>
<p>何时: 当一个模块代码，复杂到需要进一步细分时，一个模块，就可能由多个文件组成，保存在一个文件夹里。<br>如何:</p>
<ol>
<li>创建文件夹,集中保存相关的多个js文件模块</li>
<li>在文件夹中添加一个主模块(index.js)，主模块中，引入并组织好多个小模块一起导出</li>
<li>
<p>在文件夹中添加package.json文件，其中:</p>
<pre><code>  {
    "name":"模块名",
    "main":"./主模块相对路径"
  }
</code></pre>
<p>其实, 如果没有main甚至没有package.json，也行。<br>  会自动优先找文件夹下的index.js</p>
</li>
</ol>
<p>引入目录模块: require("./目录名")<br>  如果希望直接用目录名引用模块，不加相对路径:<br>   将目录放入node_modules文件夹中</p>
<p>npm: 第三方模块的包管理工具: 查询，下载<br> 除了核心模块和自定义本地模块，node生态系统还提供了大量优质第三方模块<br> 如何: <br>  查询模块:</p>
<pre><code>模糊查找: npm search 模块名
精确查找: npm search /^模块名$/
  如果现实完整描述: npm search /^模块名$/ --parseable</code></pre>
<p>安装模块: 2个位置:</p>
<li><ol>
<li>
<p>全局安装: npm install -g 模块名<br>  路径: Linux: /usr/local/lib/node_modules</p>
<pre><code>   Windows:
    C:\Users\用户名\AppData\Roaming\npm\node_modules</code></pre>
</li>
<li>项目本地安装: npm install 模块名 -save</li>
</ol></li>
<ol><li>
<p>全局对象: <br>全局作用域对象不是window，而是global<br>ECMAScript标准中原本规定的就是global<br>在浏览器中被window代替<br>强调: 交互模式: 直接在命令行中测试node应用，所有全局变量/全局函数自动成为global的成员</p>
<pre><code> 脚本模式: 通过加载js文件执行node应用，文件内的"全局变量/全局函数",仅当前文件所有，不会成为global的成员——避免了全局污染
</code></pre>
<p>console对象:<br>测试重要手段: 打桩: 在关键位置输出关键变量的值<br>输出文本信息: 浏览器中4种输出，node中合并为2中: <br>  console.log/info() 输出普通的文本信息<br>  console.error/warn() 输出错误信息<br>  其实: console.xxx()都自带格式化功能<br>  Console.log vs console.error: .error可直接导出到文件日志中</p>
<pre><code>如何: node xxx.js 2&gt; error-file.log
其中:2&gt;表示输出流，专门向硬盘文件写入内容</code></pre>
<p>输出耗时: <br>  Console.time("标签"); //预备，开始!<br>  正常程序逻辑<br>  Console.timeEnd("标签"); //完成! 自动输出与time之间的时间间隔<br>单元测试:<br>  什么是: 对程序中最小的执行单元进行测试<br>  开发人员主动对自己的函数执行单元测试<br>  如何:  console.assert(判断条件, "错误提示")</p>
<pre><code>               只有条件不满足时，才输出msg</code></pre>
<p>输出堆栈:<br>  console.trace()</p>
</li></ol>
<ol><li>全局对象: process:</li></ol>
<hr>
<pre><code>process.platform
process.pid
process.kill(pid);
</code></pre>
<p>控制台输入输出: <br> 2步:</p>
<ol><li>让控制台进入输入状态:</li></ol>
<p>process.stdin.resume()<br>  process.stdin.setEncoding("utf-8")</p>
<ol><li>监听stdin的data事件:<br>  在控制台输入后，按回车，会触发stdin的data事件</li></ol>
<pre><code>  process.stdin.on("data",text=&gt;{
      process.stdout.write( … text … )
    })
</code></pre>
<p>控制台参数: <br> 2步: 1. 定义关联数组,保存参数名和参数对应的处理函数</p>
<pre><code>2. 启动时， process.argv数组可自动获得传入的所有参数，  根据参数调用不同的处理函数</code></pre>
<p>process.argv: ["node.exe","xxx.js","参数值1","参数值2",…]</p>
<p>高精度计时: <br>  精确到纳秒, 优点: 不受系统时间影响<br>  如何: 2步: 1. 获得开始的时间戳: var start=process.hrtime();</p>
<pre><code>      2. 获得结束时间戳: var diff=process.hrtime(start);</code></pre>
<p>diff: [秒数, 纳秒]</p>
<pre><code>获得秒差: diff[0]+diff[1]/1e9
获得毫秒差: diff[0]*1000+diff[1]/1e6</code></pre>
<p>Vs console.time/timeEnd: <br>   time/timeEnd: 缺: 精度低, 优: 效率高<br>   hrtime: 优: 精度高,且不受系统时间影响</p>
<pre><code>      缺点: 效率低
</code></pre>
<p>非I/O的异步操作(定时器): <br> 何时: 要执行异步回调时<br> 如何:</p>
<ol>
<li>setTimeout/setInterval() 将回调函数添加到事件循环的timer阶段的队列中等待执行。<br>   Timer阶段是事件循环的第一阶段<br>   习惯上: setTimeout往往都会设置ms数</li>
<li>setImmediate() 将回调函数添加到事件循环的check阶段的队列中等待执行。<br>   Check阶段比Timer要晚执行<br>   习惯上: 并不设置毫秒数，而是普通的追加到等待队列末尾即可。</li>
<li>process.nextTick() 将回调函数加入nextTickQueue队列等待执行<br>  nextTickQueue不参与事件循环，而是在开始timer之前，就立刻执行nextTickQueue中的回调函数<br>  优点: 不会有延迟</li>
<li>自定义的EventEmiter</li>
</ol>
<h2>5.EventEmitter类型:</h2>
<p>Node.js所有异步I/O操作完成时，都会发送一个事件到事件队列<br>Node.js中许多对象都会触发事件: <br> 比如: http模块: 创建Server对象，监听http请求</p>
<pre><code>   一旦收到一个http请求，则立刻触发事件，将处理函数放入事件队列
  fs模块: 在每次读写完文件时，也会触发事件，将处理函数放入事件队列</code></pre>
<p>什么是EventEmitter: 专门封装事件监听和事件触发的API的一种类型<br>所有可以触发事件的对象，都是EventEmitter类型的子对象<br>如何让一个对象可以监听并触发事件:</p>
<ol>
<li>引入events模块: const events=require("events")</li>
<li>创建events.EventEmitter类型的子对象:<br>  var emitter=new events.EventEmitter();</li>
<li>
<p>用on，为对象添加事件监听:<br>  emitter.on("自定义事件名",function 处理函数(参数列表){</p>
<pre><code>… 获得参数, 执行操作 …</code></pre>
<p>})</p>
</li>
<li>在任何情况下，使用对象的emit方法，触发指定的事件:<br>  emitter.emit("自定义事件名",参数值,…)</li>
</ol>
<p>触发一次后，自动解绑: <br>emitter.once("自定义事件名",处理函数)</p>
<p>错误处理: <br> 问题: try catch无法捕获异步调用中的错误<br> 解决: Domain<br> 何时: 只要既希望捕获主程序错误，又希望捕获异步操作的错误时<br> 如何:</p>
<ol>
<li>引入domain模块: const domain=require("domain")</li>
<li>创建domain对象: const mpDomain=domain.create();</li>
<li>
<p>为domain对象添加error事件监听<br>  mpDomain.on("error",err=&gt;{</p>
<pre><code>console.log("出错啦!"+err);</code></pre>
<p>})</p>
</li>
<li>
<p>将可能出错的程序放入mpDomain中运行：<br>  mpDomain.run(()=&gt;{</p>
<pre><code>musicPlayer.emit("play");</code></pre>
<p>})</p>
</li>
</ol>
<h2>6.协议:</h2>
<p>什么是: 计算机之间通过网络实现通信时，事先达成的一种"约定"<br> 为什么: 约定使不同厂商的设备，不同操作系统之间，都可按照统一约定，任意通信</p>
<h2>7.分组交换方式:</h2>
<p>什么是: 将大数据分割为一个个叫做包(packet)的较小单元进行传输</p>
<h2>8.ISO/OSI模型:</h2>
<p>ISO(国际标准化组织)<br> OSI(开放式通信系统互联参考模型)<br>  7层:</p>
<ol>
<li>应用层: 规定应用程序中的通信细节<br> 包括: HTTP  FTP   TELNET    SMTP    DNS</li>
<li>表示层: 负责数据格式的转换</li>
<li>会话层: 建立连接</li>
<li>传输层: 控制总体数据传输<br> 包括: <br>  TCP(传输控制协议): 可靠传输  <br>   优: 可靠，客户端和服务端可双向通信<br>   缺: 传输效率低<br>   何时: 要求可靠性时<br>  UDP(用户数据报协议): <br>   何时: 对可靠性要求不高，对传输效率要求高，且发送小数据(qq, 微信, 在线视频播放)</li>
<li>网络层: 将数据分组传输到目的地</li>
<li>数据链路层: 负责规划网络中节点间的路线</li>
<li>物理层: 负责通过以太网，蓝牙，光纤发送0/1的比特流</li>
</ol>
<h2>9.TCP/IP: 互联网协议套件</h2>
<p>包含: TCP 传输控制协议</p>
<pre><code>   IP 互联网协议</code></pre>
<p>TCP/IP不是ISO标准<br>  TCP/IP 只有四层: </p>
<p>鄙视:</p>
<ol>
<li>TCP/IP四层协议，分别对应ISO/OSI中的哪一层: 图6</li>
<li>网络建立连接需要3次握手，断开连接需要4次握手，分别是:<br> 图7</li>
<li>HTTP/1.0  1.1   2.0每次升级有哪些不同</li>
</ol>
<h2>10.net模块:</h2>
<p>使用net模块:</p>
<ol><li>可创建基于TCP的客户端与服务器端通信</li></ol>
<p>创建TCP服务器: <br>  引入net模块<br>  使用net.createServer方法创建服务端对象server</p>
<pre><code>接受一个回调函数作为参数:
 只要有客户端连接到当前服务端，就自动执行该回调函数
 回调函数接受一个socket参数对象，用于与客户端通信
 Socket对象: 是客户端在服务器端的一个代理对象
            可通过socket和真正的客户端发送和接受消息
 Socket对象的data事件，可监听客户端发来的消息
   回调函数中, data参数为消息的内容
 Socket对象的end事件，可监听客户端的断开
 Socket的write方法向客户端输出消息</code></pre>
<p>调用server的listen方法，绑定到一个端口，监听客户端发来的链接请求</p>
<pre><code>也接受一个回调函数参数，但仅在启动监听后执行一次</code></pre>
<p>创建TCP客户端: <br>  引入net模块<br>  使用net.connect()方法向服务器建立连接<br>   var client=net.connect(服务端端口,ip,function(){})<br>   回调函数在连接建立后，自动触发一次<br>  为client的data事件绑定处理函数，处理函数的data参数自动接收服务端发来的消息<br>  为client的end事件添加处理函数，当客户端断开连接时执行操作<br>  在任何位置可用client.write("消息内容")向服务端发送<br>  在任何位置可用client.end() 断开与服务端连接</p>
<h2>11.HTTP模块:</h2>
<p>使用HTTP模块:</p>
<ol>
<li>实现WEB服务器，接受请求并返回响应（代替了apache,tomcat）</li>
<li>模拟客户端向一个指定的WEB服务器发送请求</li>
</ol>
<p>创建HTTP服务端: <br>  引入HTTP模块<br>  创建HTTP服务端server:<br>   var server=http.createServer(function(req,res){</p>
<pre><code> //只要有请求发送到该服务器，就自动触发该回调函数
 //其中: 
   //req对象，封装了发来的请求信息
   //res对象，专门用于向服务器端返回响应
    //res.writeHead(状态码,{ 属性:值, …:… ,…})
    //res.write("放入响应主体中")
    //res.end()</code></pre>
<p>})<br>  启动监听: server.listen(端口,function(){ … })</p>
<p>创建HTTP请求: <br>  使用http.request()方法创建一个请求(连接)，获得请求对象req<br>   接收2个参数:</p>
<pre><code>options对象参数:
 host
 port
 method
 path  /index.html?page=12
回调函数: 在服务器端返回响应时执行
 参数res: 专门用于获得响应内容(响应头和响应主体)
  HTTP协议规定: 先发响应头部 用res.headers获得响应头部对象，用res.statusCode 获得状态码
  强调: 响应主题是稍后才发送过来
   必须用res.on("data",function(buffer){ … String(buffer) …})
  强调: 凡是从响应中获得的data，默认都是字符串</code></pre>
<p>req.end()结束并发送请求。<br>   强调:必须加req.end()，请求才能发送出去</p>
<p>http.get()<br>  专门向服务器端发送get请求<br>  是http.request()的简化:</p>
<ol>
<li>自动设置method为get;</li>
<li>自动调req.end</li>
</ol>
<p>但依然需要使用res.on("data",function(buffer){ … })来接受响应主体</p>
<p>分块: <br>  问题: 如果响应主体过大，一次性传不过来<br>  解决:</p>
<pre><code>   分块发送和接受，再拼接，再整体转换
   如果分块接受，res.on("data",function(buf){ … })每收到一块，就会反复触发。
   其中buf，仅是其中一块而已
</code></pre>
<p>请求文件，保存在本地: <br>  引入fs模块: <br>  创建写入流，指向目标文件: var writable=fs.createWriteStream("相对路径")<br>  使用管道，将写入流writable连接到res对象上: res.pipe(writable)</p>
<p>响应头部: res.writeHead(状态码,{ })<br>   允许跨域: "Access-Control-Allow-Origin":"请求来源的网站"<br>   指定内容类型:"Content-Type":"application/json"  "text/css"</p>
<p>req对象: <br>  请求头部: req.headers<br>  请求方法: req.method<br>  请求地址: req.url<br>   url的处理:</p>
<pre><code>引入url模块
用url.parse(req.url,true)将req.url字符串转为对象
 其中true,表示将search中的参数也转为对象属性
 如何: var obj=url.parse(req.url, true)
  其中: obj.query中保存了所有参数及其值</code></pre>
<p>获得请求参数: <br>  Get: get方式的参数都通过url中的search传递</p>
<pre><code>  obj=url.parse(req.url,true)
  obj.query</code></pre>
<p>Post: post方式的参数都是放在请求主体中，没有在url中</p>
<pre><code>  问题:obj.query无法获得
  解决: req.on("data",function(buf){ … })
  问题: String(buf)获得的是参数的字符串
  解决: querystring模块


</code></pre>
<h2>12.https模块:</h2>
<p>问题: http协议是明文的<br>  危害: 1. 通信使用明文，内容可能被窃听</p>
<pre><code>   2. 不验证身份，有可能遭遇伪装
   3. 无法证明消息的完整性，消息有可能被篡改</code></pre>
<p>网络嗅探器:</p>
<h2>13.解决: https协议</h2>
<p>https是更安全的http协议:</p>
<ol>
<li>客户端和服务器端的双向认证</li>
<li>完整性检查</li>
<li>内容加密</li>
</ol>
<p>https=http+ssl</p>
<p>ssl/tls: ssl 安全套接层，对传统socket进一步提供安全的保护</p>
<pre><code> tls 传输层安全, 其实是ssl的继任者
</code></pre>
<h2>14.提供三大服务:</h2>
<ol>
<li>客户端和服务器端的双向认证 ——可靠</li>
<li>完整性检查 ——完整</li>
<li>数据加密   ——机密性<br>tls/ssl的执行过程:</li>
</ol>
<h2>15.Step0: 获得服务器端证书, 3步:</h2>
<ol>
<li>在服务器端生成私钥</li>
<li>用私钥生成一个证书申请文件</li>
<li>
<p>将私钥和申请文件交给第三方CA，第三方CA经过审查，会生成并颁发证书给申请的服务器<br>  证书包含2样东西: 公钥+公司的信息<br>Step1: 客户端请求https协议的web服务器<br>Step2: 服务器返回证书给客户端<br>Step3: 客户端拿到证书后，将证书交给CA。</p>
<pre><code>  客户端利用CA中的公钥随机生成自己的私钥
  将私钥发给服务器端</code></pre>
<p>Step4: 服务器端获得客户端发来的客户端私钥<br>到此，客户端和服务器端，拥有了相同的两个钥匙<br>之后，服务器和客户端发送的所有消息，都用两个相同的私钥加密和解密</p>
</li>
</ol>
<h2>16.如何实现https的web服务器应用:</h2>
<ol><li>申请https网站的认证证书：</li></ol>
<p>Step1: 用openssl生成服务器端私钥:<br> openssl  genrsa  -out  d:/privatekey.pem  1024<br>   Step2: 用私钥生成证书申请文件:</p>
<pre><code>openssl  req  -new  -key  d:/privatekey.pem  -out  d:/certificaterequest.csr</code></pre>
<p>Step3: 用私钥和证书申请文件共同生成证书文件</p>
<pre><code>openssl  x509  -req  -in  d:/certificaterequest.csr  -signkey  
d:/privatekey.pem   -out  d:/certificate.pem
</code></pre>
<p>2.使用node的https模块创建服务器<br>Step1: 引入必须的模块: <br>const https=require(“https”);<br>const fs=require(“fs”);<br>   Step2:读取服务器私钥和证书文件，保存到服务器程序的变量中<br>let privatekey=fs.readFileSync(“d:/privatekey.pem”);<br>let certificate=fs.readFileSync(“d:/certificate.pem”);<br>   Step3: 用https创建服务器端应用程序，提供私钥和证书，并定义处理请求的回调函数</p>
<pre><code>https.createServer(
  {
    key: privatekey,
    cert: certificate
},
(req,res)=&gt;{
  res.write(“…”)
  res.end();
}
).listen(443)
</code></pre>
<p>3.用https模块向https的服务器发送请求<br>错误: http模块不支持向https服务器发送请求<br>正确: </p>
<p>var https=require(“https”);<br> https.get(“<a href="https://..." rel="nofollow noreferrer">https://...</a>”, res=&gt;{<br>   res.on(“data”,buf=&gt;{<br> buf…<br>})<br>})</p>
<h2>17.express</h2>
<p>什么是: 基于node的http模块和第三方的Connect框架的web框架<br>Connect框架: 专门将各种各样的中间件函数粘合在一起，共同处理http请求中的req对象<br> 何时: 只要对req对象反复执行多种操作时，都要用connect组织多个中间件。<br> 如何: </p>
<p>Step1: 安装connect模块:  npm install connect –save</p>
<p>Step2: 引入connect模块: var connect=require(“connect”)</p>
<p>Step3: 用connect模块创建处理req对象的应用程序实例var app=connect();</p>
<p>Step4: 向connect模块的应用程序实例中添加中间件函数</p>
<pre><code>  app.use(function md1(req,res,next){
  //加工req对象
  … …
  next();
})
</code></pre>
<p>Step5: connect的应用程序实例，必须要放入createServer中用于处理服务器接收到的req对象<br>   http.createServer(app)<br>总结: express是在connect基础上的进一步封装和简化，所以express也是采用中间件组合的方式，处理req对象<br>安装express框架: 2种:</p>
<ol>
<li>使用本地express模块，进能够提供服务支持，需要自定义添加复杂的程序结构<p>Step1: npm install –save express<br>Step2: 引入http和express<br>  const http=require(“http”);<br>  const express=require(“express”);<br>Step3: 创建express应用实例对象:<br>  let app=express();<br>Step4: 为app添加各种处理中间件函数<br>  app.use(function md(req,res,next){ … …})<br>   Step5: 将app和createServer相连<br>   http.createServer(app).listen(端口号);</p>
</li>
<li>使用脚手架, 简化生成项目的结构:</li>
</ol>
<p>Step1: 全局安装express生成器:<br> npm install –g express-generator</p>
<p>Step2: 用生成器，生成项目脚手架代码:<br>express 项目文件夹名 –e  //-e 表示用EJS作为前端页面模板<br>强调: 只负责生成项目代码，并不负责下载依赖包</p>
<p>Step3: 为脚手架代码下载所有依赖包<br>cd 项目文件夹下<br>npm  install  //根据package.json中的依赖项</p>
<p>Step4: 用脚手架代码启动nodejs服务器端应用程序: npm start</p>
<p>express项目结构:</p>
<ol><li>./bin/www.js   express项目的启动文件</li></ol>
<p>package.json中: npm start 时 自动执行  node ./bin/www</p>
<p>2./app.js  对express框架的实例对象的配置<br>要求: 对express实例对象app的所有配置必须放在一个独立的文件模块app.js中<br>然后，在主程序www.js中引入app.js模块</p>
<p>3../routes/xxx.js 路由模块<br>每个子功能，都应该集中定义在一个路由模块文件中<br>在app.js中引入路由文件模块，并将路由文件模块添加到app的中间件列表中，并设置上级路径<br>在每个子路由模块文件中，创建路由对象，为路由对象添加不同请求方法和不同子路径下的处理函数<br>强调: 子路由中的相对路径，都是在上级路径之下的相对路径</p>
<p>改造脚手架项目结构:</p>
<ol>
<li>
<p>补充缺失的模块:<br>express-session   让express可以处理session<br>connect-flash    强化自动维护session的功能<br>passport        综合的用户验证解决方案</p>
<pre><code>         ( 使用passport模块，实现qq，微信登录)</code></pre>
</li>
<li>在app.js中添加对新模块的引用:</li>
<li>为项目添加mongodb支持</li>
</ol>
<p>Step1: 安装mongoose模块和promise模块<br> mongoose: node js专用的简化操作mongodb数据库的模块</p>
<p>Step2: 创建文件夹./config，在文件夹下添加config.js<br> 在config.js中定义对象模块，保存连接字符串<br> module.exports={<br>   db:”mongodb://主机名或ip/数据库名”}</p>
<p>Step3:  在./config文件夹下创建mongoose.js，保存创建连接对象的代码:<br> var config=require('./config'),<br> mongoose=require('mongoose');<br>  设置mongoose的promise属性，使用当前项目的promise模块<br> mongoose.Promise=require(‘promise’);<br> var db=mongoose.connect(config.db) module.exports=db;</p>
<p>Step4:  根据业务需要，定义mongoose模型对象: <br>创建./models文件夹, 在models内为每种业务对象创建专门的模型文件</p>
<p>3步:</p>
<ol>
<li>引入mongoose，获得Schema类型</li>
<li>用Schema创建UserSchema结构</li>
<li>将UserSchema编译为User模型，并抛出为User模块<br>Step5: 回到mongoose.js中，在connect之后，引入User模块require('../models/user.model');<br>Step6: 回到app.js中，在路由中间件之前，先请求并初始化mongoose.jsrequire("./config/mongoose");</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
后端知识点总结——NODE.JS（高级）

## 原文链接
[https://segmentfault.com/a/1190000014534808](https://segmentfault.com/a/1190000014534808)

