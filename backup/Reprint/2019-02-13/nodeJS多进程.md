---
title: 'nodeJS多进程' 
date: 2019-02-13 2:31:22
hidden: true
slug: ylr9i8j2eck
categories: [reprint]
---

{{< raw >}}

                    
<p>首先郑重声明:<br>nodeJS 是一门单线程!异步!非阻塞语言!<br>nodeJS 是一门单线程!异步!非阻塞语言!<br>nodeJS 是一门单线程!异步!非阻塞语言!</p>
<p>重要的事情说3遍。 因为nodeJS天生自带buff, 所以从一出生就受到 万千 粉丝的追捧(俺，也是它的死忠). 但是，傻逼php 竟然嘲笑 我大NodeJS 的性能。 说不稳定，不可靠，只能利用单核CPU。 辣鸡 nodeJS. <br>艹!艹!艹! <br>搞mo shi~<br>但，大哥就是大哥,nodeJS在v0.8 的时候就已经加入了cluster的模块。 完全打脸php. 虽然，现在php 也开始抄袭nodeJS, 退出php7, 但是，渣渣，你就只会抄...<br>233333 <br>对不起啊，上面是我自已意淫的一段~  以上内容，纯属调侃，如果雷同，纯属巧合。<br>Ok~ 我们来正式介绍一下nodeJS的多进程吧~</p>
<h2 id="articleHeader0">cluster的前世今生</h2>
<p>以前，由于cluster 本身的不完善，可能由于多方面原因吧，实现性能不好。 结果是，pm2 包的 崛起。 轻松使用一个pm2 就可以开启多进程，实现负载均衡的效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pm2 start app.js
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>pm2 start app<span class="hljs-selector-class">.js</span>
</code></pre>
<p>pm2的内部和cluster内部实现其实是一个道理，都是封装了一层child_process--fork. 而child_process--fork 则是封装了unix 系统的fork 方法。 既然，都到这了，我们来看看官方给出的解释吧。</p>
<blockquote>
<p>fork() creates a new process by duplicating the calling process. The new process is referred to as the child process. The calling process is referred to as the parent process.</p>
<p>The child process and the parent process run in separate memory spaces. At the time of fork() both memory spaces have the same content. Memory writes, file mappings (mmap(2)), and unmappings (munmap(2)) performed by one of the processes do not affect the other.</p>
</blockquote>
<p>俺来翻译一下，fork其实就是创建子进程的方法，新创建的进程被认为是子进程，而调用fork的进程则是父进程。 子进程和父进程本来是在独立的内存空间中的。但当你使用了fork之后，两者就处在同一个作用域内了。 但是，内存的读写，文件的map,都不会影响对方。</p>
<p>上面那段的意思就是，你创建的进程其实可以相互通信，并且被master进程 管理。 <br>看图~~~<br><span class="img-wrap"><img data-src="http://gtms01.alicdn.com/tps/i1/TB1XNnNJVXXXXanXpXXQzA.9VXX-447-300.png" src="https://static.alili.techhttp://gtms01.alicdn.com/tps/i1/TB1XNnNJVXXXXanXpXXQzA.9VXX-447-300.png" alt="此处输入图片的描述" title="此处输入图片的描述" style="cursor: pointer;"></span></p>
<p>其实就是这个意思。 <br>Ok~ 这只是系统创建子进程的模型。那么在NodeJs中是怎样实现进程之间的交互的呢？<br>很简单监听端口呗。。。<br>但是，实现通信不是很难，关键在于如果分配请求，这一点nodeJS 踩的坑确实很大。</p>
<h2 id="articleHeader1">nodeJS 实现进程分配的黑历史</h2>
<blockquote><p>long time ago</p></blockquote>
<p>nodeJS的master 开始并不是上帝， 他只是一个小小的太监，每次请求(妃子)来的时候，他只会默默的看着几个worker小皇帝相互争夺，如果某个worker胜出，则其他的worker也就草草了事，等下一个请求过来。所以说，每来一次请求，都会引起一场腥风血雨。而，我们体会最深的就是惊群现象,即,CPU爆表.<br>借用TJ大神的一幅图，说明一下。<br><span class="img-wrap"><img data-src="http://gtms04.alicdn.com/tps/i4/TB1bexvKpXXXXaMXXXX3GwW0VXX-426-298.png" src="https://static.alili.techhttp://gtms04.alicdn.com/tps/i4/TB1bexvKpXXXXaMXXXX3GwW0VXX-426-298.png" alt="此处输入图片的描述" title="此处输入图片的描述" style="cursor: pointer;"></span><br>这里，master只是绑定端口，而不会对来的请求做任何处理。 通过将socket的fd给fork出来的进程。造成的结果就是4个人男人(worker)抢一个妃子(request). 那场面别提有多血腥了。<br>前面说过，cluster其实就是对child_process的一层封装，那我们继续往底层走一点。实现cluster多进程。 首先，我们需要了解，这几个模块的基本用法。net,child_process.</p>
<h3 id="articleHeader2">child_process</h3>
<p>这个应该是nodeJS 进程最核心的模块。 基本的方法，有几个，不过我这里，只介绍比较核心的:spawn ,fork ,exec。如果大家有兴趣，可以去<a href="https://nodejs.org/dist/latest-v4.x/docs/api/child_process.html" rel="nofollow noreferrer" target="_blank">child_process</a>参考.</p>
<ul><li><p>child_process.spawn(command, args)</p></li></ul>
<p>该方法用来运行指定的程序。比如: <code>node app.js</code>.他是异步的命令，但不支持callback, 不过我们可以使用process.on来监听结果。 他自带3个参数.<br>command: 执行命令<br>args[Array]: 命令所带的参数<br>options[Object]: 环境变量<strong>对象</strong></p>
<p>OK~ 我们举个一个简单的demo: 试一试运行 <code>touch apawn.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const spawn = require('child_process').spawn;
const touch = spawn('touch',['spawn.js']);

touch.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

touch.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

touch.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>const spawn = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).spawn;
const touch = spawn(<span class="hljs-string">'touch'</span>,[<span class="hljs-string">'spawn.js'</span>]);

touch.stdout.<span class="hljs-literal">on</span>(<span class="hljs-string">'data'</span>, <span class="hljs-function"><span class="hljs-params">(data)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(`<span class="javascript">stdout: ${data}</span>`);
});

touch.stderr.<span class="hljs-literal">on</span>(<span class="hljs-string">'data'</span>, <span class="hljs-function"><span class="hljs-params">(data)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(`<span class="javascript">stderr: ${data}</span>`);
});

touch.<span class="hljs-literal">on</span>(<span class="hljs-string">'close'</span>, <span class="hljs-function"><span class="hljs-params">(code)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(`<span class="javascript">child process exited <span class="hljs-keyword">with</span> code ${code}</span>`);
});</code></pre>
<p>如果，正确的话，应该会输<br> 出<code>child process exited with code 0</code>. 然后运行目录会生成pawn.js文件。 当然，如果你需要运行多参数的命令的话这就有点蛋疼了。<br> 所以，nodeJS 使用了exec对其进行很好的封装，而且他支持回调函数，这比较能够让我们理解。</p>
<ul><li><p>child_process.exec(order,cb(err[,stdout,stderr]));</p></li></ul>
<p>order: 就是你执行的命令. 比如: <code>rm spawn.js</code><br>cb: 就是命令执行成功后的回调函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const childProcess = require('child_process');

const ls = childProcess.exec('rm spawn.js', function (error, stdout, stderr) {
   if (error) {
     console.log(error.stack);
     console.log('Error code: '+error.code);
   }
   console.log('Child Process STDOUT: '+stdout);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> childProcess = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>);

<span class="hljs-keyword">const</span> ls = childProcess.exec(<span class="hljs-string">'rm spawn.js'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error, stdout, stderr</span>) </span>{
   <span class="hljs-keyword">if</span> (error) {
     <span class="hljs-built_in">console</span>.log(error.stack);
     <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Error code: '</span>+error.code);
   }
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Child Process STDOUT: '</span>+stdout);
});</code></pre>
<p>正常情况下会删除spawn.js文件。<br>上面两个只是简单的运行进程的命令。 最后，(Boss总是最后出场的). 我们来瞧瞧fork方法的使用.<br>fork其实也是用来执行进程，比如,spawn("node",['app.js']),其实和fork('app.js') 是一样的效果的。但是，fork牛逼的地方在于他在开启一个子进程时，同时建立了一个信息通道(双工的哦). 俩个进程之间使用process.on("message",fn)和process.send(...)进行信息的交流.</p>
<ul>
<li><p>child_process.fork(order)  //创建子进程</p></li>
<li><p>worker.on('message',cb)  //监听message事件</p></li>
<li><p>worker.send(mes)    //发送信息</p></li>
</ul>
<p>他和spawn类似都是通过返回的通道进行通信。举一个demo, 两个文件master.js和worker.js 来看一下.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//master.js
const childProcess = require('child_process');
const worker = childProcess.fork('worker.js');

worker.on('message',function(mes){
    console.log(`from worder, message: ${mes}`);
});
worker.send(&quot;this is master&quot;);

//worker.js
process.on('message',function(mes){
    console.log(`from master, message: ${mes}`);
});
process.send(&quot;this is worker&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//master.js</span>
<span class="hljs-keyword">const</span> childProcess = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>);
<span class="hljs-keyword">const</span> worker = childProcess.fork(<span class="hljs-string">'worker.js'</span>);

worker.on(<span class="hljs-string">'message'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">mes</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`from worder, message: <span class="hljs-subst">${mes}</span>`</span>);
});
worker.send(<span class="hljs-string">"this is master"</span>);

<span class="hljs-comment">//worker.js</span>
process.on(<span class="hljs-string">'message'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">mes</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`from master, message: <span class="hljs-subst">${mes}</span>`</span>);
});
process.send(<span class="hljs-string">"this is worker"</span>);</code></pre>
<p>运行，<code>node app.js</code>, 会输出一下结果:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="from master, message: this is master
from worker, message: this is worker
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">from</span> master, message: <span class="hljs-keyword">this</span> <span class="hljs-keyword">is</span> master
<span class="hljs-keyword">from</span> worker, message: <span class="hljs-keyword">this</span> <span class="hljs-keyword">is</span> worker
</code></pre>
<ol><li><p>现在我们已经学会了，如何使用child_process来创建一个基本的进程了。<br>关于net 这一模块，大家可以参考一下<a href="https://nodejs.org/dist/latest-v4.x/docs/api/net.html" rel="nofollow noreferrer" target="_blank">net模块</a>.</p></li></ol>
<p>ok . 现在我们正式进入，模拟nodeJS cluster模块通信的procedure了。</p>
<h3 id="articleHeader3">out of date 的cluster</h3>
<p>这里先介绍一下，曾经的cluster实现的一套机理。同样，再放一次图<br><span class="img-wrap"><img data-src="http://gtms04.alicdn.com/tps/i4/TB1bexvKpXXXXaMXXXX3GwW0VXX-426-298.png" src="https://static.alili.techhttp://gtms04.alicdn.com/tps/i4/TB1bexvKpXXXXaMXXXX3GwW0VXX-426-298.png" alt="此处输入图片的描述" title="此处输入图片的描述" style="cursor: pointer;"></span><br>我们使用net和child_process来模仿一下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//master.js
const net = require('net');
const fork = require('child_process').fork;

var handle = net._createServerHandle('0.0.0.0', 3000);

for(var i=0;i<4;i++) {
   fork('./worker').send({}, handle);
}
//worker.js
const net = require('net');
//监听master发送过来的信息
process.on('message', function(m, handle) {
  start(handle);
});

var buf = 'hello nodejs'; ///返回信息
var res = ['HTTP/1.1 200 OK','content-length:'+buf.length].join('\r\n')+'\r\n\r\n'+buf;  //嵌套字

function start(server) {
    server.listen();
    var num=0;
    //监听connection函数
    server.onconnection = function(err,handle) {
        num++;
        console.log(`worker[${process.pid}]:${num}`);
        var socket = new net.Socket({
            handle: handle
        });
        socket.readable = socket.writable = true;
        socket.end(res);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//master.js</span>
<span class="hljs-keyword">const</span> net = <span class="hljs-built_in">require</span>(<span class="hljs-string">'net'</span>);
<span class="hljs-keyword">const</span> fork = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).fork;

<span class="hljs-keyword">var</span> handle = net._createServerHandle(<span class="hljs-string">'0.0.0.0'</span>, <span class="hljs-number">3000</span>);

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-number">4</span>;i++) {
   fork(<span class="hljs-string">'./worker'</span>).send({}, handle);
}
<span class="hljs-comment">//worker.js</span>
<span class="hljs-keyword">const</span> net = <span class="hljs-built_in">require</span>(<span class="hljs-string">'net'</span>);
<span class="hljs-comment">//监听master发送过来的信息</span>
process.on(<span class="hljs-string">'message'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">m, handle</span>) </span>{
  start(handle);
});

<span class="hljs-keyword">var</span> buf = <span class="hljs-string">'hello nodejs'</span>; <span class="hljs-comment">///返回信息</span>
<span class="hljs-keyword">var</span> res = [<span class="hljs-string">'HTTP/1.1 200 OK'</span>,<span class="hljs-string">'content-length:'</span>+buf.length].join(<span class="hljs-string">'\r\n'</span>)+<span class="hljs-string">'\r\n\r\n'</span>+buf;  <span class="hljs-comment">//嵌套字</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span>(<span class="hljs-params">server</span>) </span>{
    server.listen();
    <span class="hljs-keyword">var</span> num=<span class="hljs-number">0</span>;
    <span class="hljs-comment">//监听connection函数</span>
    server.onconnection = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err,handle</span>) </span>{
        num++;
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`worker[<span class="hljs-subst">${process.pid}</span>]:<span class="hljs-subst">${num}</span>`</span>);
        <span class="hljs-keyword">var</span> socket = <span class="hljs-keyword">new</span> net.Socket({
            <span class="hljs-attr">handle</span>: handle
        });
        socket.readable = socket.writable = <span class="hljs-literal">true</span>;
        socket.end(res);
    }
}</code></pre>
<p>ok~ 我们运行一下程序, 首先运行<code>node master.js</code>. <br>然后使用测试工具,siege. <br><code>siege -c 100 -r 2 http://localhost:3000</code><br>OK，我们看一下，到底此时的负载是否均衡。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="worker[1182]:52
worker[1183]:42
worker[1184]:90
worker[1181]:16
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">worker</span><span class="hljs-selector-attr">[1182]</span><span class="hljs-selector-pseudo">:52</span>
<span class="hljs-selector-tag">worker</span><span class="hljs-selector-attr">[1183]</span><span class="hljs-selector-pseudo">:42</span>
<span class="hljs-selector-tag">worker</span><span class="hljs-selector-attr">[1184]</span><span class="hljs-selector-pseudo">:90</span>
<span class="hljs-selector-tag">worker</span><span class="hljs-selector-attr">[1181]</span><span class="hljs-selector-pseudo">:16</span>
</code></pre>
<p>发现，这样任由worker去争夺请求，效率真的很低呀。每一次，触发请求，都有可能导致惊群事件的发生啊喂。所以，后来cluster改变了一种模式，使用master来控制请求的分配，官方给出的算法其实就是round-robin 轮转方法。</p>
<h3 id="articleHeader4">高富帅版cluster</h3>
<p>现在具体的实现模型就变成这个.<br><span class="img-wrap"><img data-src="http://gtms02.alicdn.com/tps/i2/TB1kT6gKpXXXXbyXXXXvNGU0VXX-533-352.png" src="https://static.alili.techhttp://gtms02.alicdn.com/tps/i2/TB1kT6gKpXXXXbyXXXXvNGU0VXX-533-352.png" alt="此处输入图片的描述" title="此处输入图片的描述" style="cursor: pointer;"></span><br>由master来控制请求的给予。通过监听端口，创建一个socket，将获得的请求传递给子进程。<br>从tj大神那里借鉴的代码demo:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//master
const net = require('net');
const fork = require('child_process').fork;

var workers = [];
for (var i = 0; i < 4; i++) {
   workers.push(fork('./worker'));
}

var handle = net._createServerHandle('0.0.0.0', 3000);
handle.listen();
//将监听事件移到master中
handle.onconnection = function (err,handle) {
    var worker = workers.pop();  //取出一个pop
    worker.send({},handle);
    workers.unshift(worker);  //再放回取出的pop
}


//worker.js
const net = require('net');
process.on('message', function (m, handle) {
  start(handle);
});

var buf = 'hello Node.js';
var res = ['HTTP/1.1 200 OK','content-length:'+buf.length].join('\r\n')+'\r\n\r\n'+buf;

function start(handle) {
    console.log('got a connection on worker, pid = %d', process.pid);
    var socket = new net.Socket({
        handle: handle
    });
    socket.readable = socket.writable = true;
    socket.end(res);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//master</span>
<span class="hljs-keyword">const</span> net = <span class="hljs-built_in">require</span>(<span class="hljs-string">'net'</span>);
<span class="hljs-keyword">const</span> fork = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).fork;

<span class="hljs-keyword">var</span> workers = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">4</span>; i++) {
   workers.push(fork(<span class="hljs-string">'./worker'</span>));
}

<span class="hljs-keyword">var</span> handle = net._createServerHandle(<span class="hljs-string">'0.0.0.0'</span>, <span class="hljs-number">3000</span>);
handle.listen();
<span class="hljs-comment">//将监听事件移到master中</span>
handle.onconnection = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err,handle</span>) </span>{
    <span class="hljs-keyword">var</span> worker = workers.pop();  <span class="hljs-comment">//取出一个pop</span>
    worker.send({},handle);
    workers.unshift(worker);  <span class="hljs-comment">//再放回取出的pop</span>
}


<span class="hljs-comment">//worker.js</span>
<span class="hljs-keyword">const</span> net = <span class="hljs-built_in">require</span>(<span class="hljs-string">'net'</span>);
process.on(<span class="hljs-string">'message'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">m, handle</span>) </span>{
  start(handle);
});

<span class="hljs-keyword">var</span> buf = <span class="hljs-string">'hello Node.js'</span>;
<span class="hljs-keyword">var</span> res = [<span class="hljs-string">'HTTP/1.1 200 OK'</span>,<span class="hljs-string">'content-length:'</span>+buf.length].join(<span class="hljs-string">'\r\n'</span>)+<span class="hljs-string">'\r\n\r\n'</span>+buf;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span>(<span class="hljs-params">handle</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'got a connection on worker, pid = %d'</span>, process.pid);
    <span class="hljs-keyword">var</span> socket = <span class="hljs-keyword">new</span> net.Socket({
        <span class="hljs-attr">handle</span>: handle
    });
    socket.readable = socket.writable = <span class="hljs-literal">true</span>;
    socket.end(res);
}</code></pre>
<p>这里就经由master来掌控全局了. 当一个皇帝(worker)正在宠幸妃子的时候，master就会安排剩下的几个皇帝排队一个几个的来。 其实中间的handle就会我们具体的业务逻辑. 如同:<code>app.js</code>.<br>ok~ 我们再来看一下cluster模块实现多进程的具体写法.</p>
<h2 id="articleHeader5">cluster模块实现多进程</h2>
<p>现在的cluster已经可以说完全做到的负载均衡。在<a href="https://segmentfault.com/a/1190000004569460">cluster说明</a>我已经做了阐述了。我们来看一下具体的实现吧</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log('[master] ' + &quot;start master...&quot;);

    for (var i = 0; i < numCPUs; i++) {
         cluster.fork();
    }

    cluster.on('listening', function (worker, address) {
        console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', Address:' + address.address + &quot;:&quot; + address.port);
    });

} else if (cluster.isWorker) {
     console.log('[worker] ' + &quot;start worker ...&quot; + cluster.worker.id);
    var num = 0;
    http.createServer(function (req, res) {
        num++;
        console.log('worker'+cluster.worker.id+&quot;:&quot;+num);
        res.end('worker'+cluster.worker.id+',PID:'+process.pid);
    }).listen(3000);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> cluster = <span class="hljs-built_in">require</span>(<span class="hljs-string">'cluster'</span>);
<span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>);
<span class="hljs-keyword">var</span> numCPUs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'os'</span>).cpus().length;

<span class="hljs-keyword">if</span> (cluster.isMaster) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'[master] '</span> + <span class="hljs-string">"start master..."</span>);

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; numCPUs; i++) {
         cluster.fork();
    }

    cluster.on(<span class="hljs-string">'listening'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">worker, address</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'[master] '</span> + <span class="hljs-string">'listening: worker'</span> + worker.id + <span class="hljs-string">',pid:'</span> + worker.process.pid + <span class="hljs-string">', Address:'</span> + address.address + <span class="hljs-string">":"</span> + address.port);
    });

} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (cluster.isWorker) {
     <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'[worker] '</span> + <span class="hljs-string">"start worker ..."</span> + cluster.worker.id);
    <span class="hljs-keyword">var</span> num = <span class="hljs-number">0</span>;
    http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
        num++;
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'worker'</span>+cluster.worker.id+<span class="hljs-string">":"</span>+num);
        res.end(<span class="hljs-string">'worker'</span>+cluster.worker.id+<span class="hljs-string">',PID:'</span>+process.pid);
    }).listen(<span class="hljs-number">3000</span>);
}</code></pre>
<p>这里使用的是HTTP模块，当然，完全也可以替换为socket模块. 不过由于这样书写，将集群和单边给混淆了。 所以，推荐写法是将具体业务逻辑独立出来.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log('[master] ' + &quot;start master...&quot;);

    for (var i = 0; i < numCPUs; i++) {
         cluster.fork();
    }

    cluster.on('listening', function (worker, address) {
        console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', Address:' + address.address + &quot;:&quot; + address.port);
    });

} else if (cluster.isWorker) {
    require('app.js');
}
//app.js就是开启具体的业务逻辑了

//app.js具体内容
const net = require('net');
//自动创建socket
const server = net.createServer(function(socket) { //'connection' listener
    socket.on('end', function() {
        console.log('server disconnected');
    });
    socket.on('data', function() {
        socket.end('hello\r\n');
    });
});
//开启端口的监听
server.listen(8124, function() { //'listening' listener
    console.log('working')
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> cluster = <span class="hljs-built_in">require</span>(<span class="hljs-string">'cluster'</span>);
<span class="hljs-keyword">var</span> numCPUs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'os'</span>).cpus().length;

<span class="hljs-keyword">if</span> (cluster.isMaster) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'[master] '</span> + <span class="hljs-string">"start master..."</span>);

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; numCPUs; i++) {
         cluster.fork();
    }

    cluster.on(<span class="hljs-string">'listening'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">worker, address</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'[master] '</span> + <span class="hljs-string">'listening: worker'</span> + worker.id + <span class="hljs-string">',pid:'</span> + worker.process.pid + <span class="hljs-string">', Address:'</span> + address.address + <span class="hljs-string">":"</span> + address.port);
    });

} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (cluster.isWorker) {
    <span class="hljs-built_in">require</span>(<span class="hljs-string">'app.js'</span>);
}
<span class="hljs-comment">//app.js就是开启具体的业务逻辑了</span>

<span class="hljs-comment">//app.js具体内容</span>
<span class="hljs-keyword">const</span> net = <span class="hljs-built_in">require</span>(<span class="hljs-string">'net'</span>);
<span class="hljs-comment">//自动创建socket</span>
<span class="hljs-keyword">const</span> server = net.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">socket</span>) </span>{ <span class="hljs-comment">//'connection' listener</span>
    socket.on(<span class="hljs-string">'end'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'server disconnected'</span>);
    });
    socket.on(<span class="hljs-string">'data'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        socket.end(<span class="hljs-string">'hello\r\n'</span>);
    });
});
<span class="hljs-comment">//开启端口的监听</span>
server.listen(<span class="hljs-number">8124</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">//'listening' listener</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'working'</span>)
});</code></pre>
<p>接着我们开启服务，node master.js<br>然后进行测试<br><code>siege -c 100 -r 2 http://localhost:8124</code><br>我这里开启的是长连接. 每个worker处理的长连接数是有限的。所以，当有额外的连接到来时，worker会断开当前没有响应的连接，去处理新的连接。<br>不过，平常我们都是使用HTTP开启 短连接，快速处理大并发的请求。<br>这是我改成HTTP短连接之后的结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Transactions:                 200 hits
Availability:              100.00 %
Elapsed time:                2.09 secs
Data transferred:            0.00 MB
Response time:                0.02 secs
Transaction rate:           95.69 trans/sec
Throughput:                0.00 MB/sec
Concurrency:                1.74
Successful transactions:         200
Failed transactions:               0
Longest transaction:            0.05
Shortest transaction:            0.02" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">Transactions:</span>                 <span class="hljs-number">200</span> hits
<span class="hljs-string">Availability:</span>              <span class="hljs-number">100.00</span> %
Elapsed <span class="hljs-string">time:</span>                <span class="hljs-number">2.09</span> secs
Data <span class="hljs-string">transferred:</span>            <span class="hljs-number">0.00</span> MB
Response <span class="hljs-string">time:</span>                <span class="hljs-number">0.02</span> secs
Transaction <span class="hljs-string">rate:</span>           <span class="hljs-number">95.69</span> trans/sec
<span class="hljs-string">Throughput:</span>                <span class="hljs-number">0.00</span> MB/sec
<span class="hljs-string">Concurrency:</span>                <span class="hljs-number">1.74</span>
Successful <span class="hljs-string">transactions:</span>         <span class="hljs-number">200</span>
Failed <span class="hljs-string">transactions:</span>               <span class="hljs-number">0</span>
Longest <span class="hljs-string">transaction:</span>            <span class="hljs-number">0.05</span>
Shortest <span class="hljs-string">transaction:</span>            <span class="hljs-number">0.02</span></code></pre>
<p>那，怎么模拟大并发嘞？ <br>e e e e e e e e e ...<br>自己解决啊~ <br>开玩笑的啦~ 不然我写blog是为了什么呢？ 就是为了传播知识.<br>在介绍工具之前，我想先说几个关于性能的基本概念<br>QPS(TPS),并发数,响应时间,吞吐量,吞吐率</p>
<h2 id="articleHeader6">你母鸡的性能测试theories</h2>
<p>自从我们和服务器扯上关系后,我们前端的性能测试真的很多。但这也是我们必须掌握的tip. 本来前端宝宝只需要看看控制台，了解一下网页运行是否运行顺畅, 看看TimeLine，Profile 就可以了。 不过，作为一名有追求，有志于改变世界的童鞋来说。。。<br>md~ 又要学了...<br>ok~ 好了，在进入正题之前，我再放一次 线上的测试结果.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Transactions:                 200 hits
Availability:              100.00 %
Elapsed time:               13.46 secs
Data transferred:            0.15 MB
Response time:                3.64 secs
Transaction rate:           14.86 trans/sec
Throughput:                0.01 MB/sec
Concurrency:               54.15
Successful transactions:         200
Failed transactions:               0
Longest transaction:           11.27
Shortest transaction:            0.01" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">Transactions:</span>                 <span class="hljs-number">200</span> hits
<span class="hljs-string">Availability:</span>              <span class="hljs-number">100.00</span> %
Elapsed <span class="hljs-string">time:</span>               <span class="hljs-number">13.46</span> secs
Data <span class="hljs-string">transferred:</span>            <span class="hljs-number">0.15</span> MB
Response <span class="hljs-string">time:</span>                <span class="hljs-number">3.64</span> secs
Transaction <span class="hljs-string">rate:</span>           <span class="hljs-number">14.86</span> trans/sec
<span class="hljs-string">Throughput:</span>                <span class="hljs-number">0.01</span> MB/sec
<span class="hljs-string">Concurrency:</span>               <span class="hljs-number">54.15</span>
Successful <span class="hljs-string">transactions:</span>         <span class="hljs-number">200</span>
Failed <span class="hljs-string">transactions:</span>               <span class="hljs-number">0</span>
Longest <span class="hljs-string">transaction:</span>           <span class="hljs-number">11.27</span>
Shortest <span class="hljs-string">transaction:</span>            <span class="hljs-number">0.01</span></code></pre>
<p>根据上面的数据，就可以得出，你网页的大致性能了。<br>恩~ let's begin</p>
<h3 id="articleHeader7">吞吐率</h3>
<p>关于吞吐率有多种解读，一种是:描绘web服务器单位时间处理请求的能力。根据这个描述,其单位就为: req/sec. 另一种是: 单位时间内网络上传输的数据量。 而根据这个描述的话,他的单位就为: MB/sec. <br>而这个指标就是上面数据中的Throughput. 当然，肯定是越大越好了</p>
<h3 id="articleHeader8">吞吐量</h3>
<p>这个和上面的吞吐率很有点关系的。 吞吐量是在没有时间的限制下，你一次测试的传输数据总和。 所以，没有时间条件的测试，都是耍流氓。<br>这个对应于上面数据中的Data transferred.</p>
<h3 id="articleHeader9">事务 &amp;&amp; TPS</h3>
<p>熟悉数据库操作的童鞋，应该知道，在数据库中常常会提到一个叫做事务的概念。 在数据库中，一个事务，常常代表着一个具体的处理流程和结果. 比如，我现在想要的数据是 2013-2015年，数学期末考试成绩排名. 这个就是一个具体的事务，那么我们映射到数据库中就是，取出2013-2015年的排名，然后取平均值，返回最后的排序结果。 可以看出，事务并不单单指单一的操作，他是由一个或一个以上 操作组合而成具有 实际意义的。 那，反映到前端测试，我们应该怎样去定义呢？ 首先，我们需要了解，前端的网络交流其实就是 请求-响应模式. 也就是说，每一次请求，我们都可以理解为一次事务(trans).<br>所以，TPS(transaction per second)就可以理解为1sec内，系统能够处理的请求数目.他的单位也就是: trans/sec . 你当然也可以理解为seq/sec.<br>所以说，TPS 应该是衡量一个系统承载力最优的一个标识.<br>TPS的计算公式很容易的出来就是: <code>Transactions / Elapsed time</code>.<br>不过, 凡事无绝对。 大家以后遇到测试的时候，应该就会知道的.</p>
<h3 id="articleHeader10">并发数</h3>
<p>就是服务器能够并发处理的连接数，具体我也母鸡他的单位是什么。 官方给出的解释是:</p>
<blockquote><p>Concurrency is average number of simultaneous connections, a number which rises as server performance decreases.</p></blockquote>
<p>这里我们就理解为，这就是一个衡量系统的承载力的一个标准吧。 当Concurrency 越高，表示 系统承载的越多，但性能也越低。</p>
<p>ok~ 但是我们如何利用这些数据，来确定我们的并发策略呢？ e e e e e e e ...<br>当然， 一两次测试的结果真的没有什么卵用. 所以实际上，我们需要进行多次测试，然后画图才行。 当然，一些大公司，早就有一套完整的系统来计算你web服务器的瓶颈,以及 给出 最优的并发策略.<br>废话不多说，我们来看看，如何分析，才能得出 比较好的 并发策略。</p>
<h2 id="articleHeader11">探究并发策略</h2>
<p>首先，我们这里的并发需要进行区分. 一个是并发的请求数，一个是并发的用户数. 这两个对于服务器是完全不同的需求。 <br>假如100个用户同时向服务器分别进行10次请求，与1个用户向服务器连续进行1000次请求。两个的效果一样么？</p>
<p>一个用户向服务器连续进行1000次请求的过程中，任何时刻服务器的网卡接受缓存区中只有来自该用户的1个请求，而100个用户同时向服务器分别进行10次请求的过程中，<strong>服务器网卡接收缓冲区中最多有100个等待处理的请求，显然这时候服务器的压力更大。</strong></p>
<p>所以上面所说的 并发用户数和吞吐率 是完全不一样的. <br>不过通常来说，我们更看重的是Concurrency(并发用户数). 因为这样更能反映出系统的 能力。  一般，我们都会对并发用户数进行一些限制，比如apache的maxClients参数. <br>ok~ 我们来实例分析一下吧.</p>
<p>首先，我们拿到一份测试数据.<br><span class="img-wrap"><img data-src="http://7xpsmd.com1.z0.glb.clouddn.com/16-3-16/81008435.jpg" src="https://static.alili.techhttp://7xpsmd.com1.z0.glb.clouddn.com/16-3-16/81008435.jpg" alt="" title="" style="cursor: pointer;"></span></p>
<p>接着，我们进行数据分析.<br>根据并发数和吞吐率的关系得出下列的图.<br><span class="img-wrap"><img data-src="http://7xpsmd.com1.z0.glb.clouddn.com/16-3-16/21398793.jpg" src="https://static.alili.techhttp://7xpsmd.com1.z0.glb.clouddn.com/16-3-16/21398793.jpg" alt="" title="" style="cursor: pointer;"></span><br>OK~ 我们会发现从大约130并发数的地方开始，吞吐率开始下降，而且越多下降的越厉害。 主要是因为，在前面部分随着用户数的上升，空闲的系统资源得到充分的利用，当然就和正太曲线一样，总会有个顶点。 当到达一定值后，顶点就会出现了. 这就我们的系统的一个瓶颈.<br>接着，我们细化分析，响应时间和并发用户数的相关性<br><span class="img-wrap"><img data-src="http://7xpsmd.com1.z0.glb.clouddn.com/16-3-16/22714592.jpg" src="https://static.alili.techhttp://7xpsmd.com1.z0.glb.clouddn.com/16-3-16/22714592.jpg" alt="" title="" style="cursor: pointer;"></span><br>同样额道理，当并发数到达130左右，正对每个req的响应时间开始增加，越大越抖，这适合吞吐率是相关的。 所以，我们可以得出一个结论，该次连接 并发数 最好设置为100~150之间。 当然，这样的分析很肤浅，不过，对于我们这些前端宝宝来说了解一下就足够了。</p>
<p>接下来,我们使用工具来武装自己的头脑.<br>这里主要介绍一个测试工具，siege.</p>
<h2 id="articleHeader12">并发测试工具</h2>
<p>事实上并发测试工具主要有3个siege,ab,还有webbench. 我这里之所以没介绍webbench的原因，因为，我在尝试安装他时，老子，电脑差点就挂了(我的MAC pro)... 不过后面，被聪明的我 巧妙的挽回~ 所以，如果有其他大神在MAC x11 上成功安装，可以私信小弟。让我学习学习。 <br>ok~ 吐槽完了。我们正式说一下siege吧</p>
<h3 id="articleHeader13">siege</h3>
<p>安装siege利用MAC神器 homebrew, 就是就和js前端世界的npm一样. <br>安装ing:<br><code>brew install siege</code><br>安装成功--bingo<br>接着，我们来看一下语法吧.</p>
<ul>
<li><p>-c NUM 设置并发的用户数量.eg: -c 100;</p></li>
<li><p>-r NUM 设置发送几轮的请求，即，总的请求数为: <code>-cNum*-rNum</code>但是, -r不能和-t一起使用(为什么呢？你猜).eg: -r 20</p></li>
<li><p>-t NUM 测试持续时间，指你运行一次测试需要的时间，在timeout后，结束测试.</p></li>
<li><p>-f file. 用来测试file里面的url路径 eg: <code>-f girls.txt</code>.</p></li>
<li><p>-b . 就是询问开不开启基准测试(benchmark)。 这个参数不太重要，有兴趣的同学，可以下去学习一下。</p></li>
</ul>
<p>关于-c -r我就不介绍了。 大家有兴趣，可以参考一下，我前一篇文章<a href="https://segmentfault.com/a/1190000004569460" target="_blank">让你升级的网络知识</a>. 这里主要介绍一下 -f 参数.<br>通常，如果我们想要测试多个页面的话，可以新建一个文件，在文件中创建 你想测试的所有网页地址.<br>比如:<br>//文件名为 urls.txt</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="www.example.com
www.example.org
123.45.67.89" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">www</span><span class="hljs-selector-class">.example</span><span class="hljs-selector-class">.com</span>
<span class="hljs-selector-tag">www</span><span class="hljs-selector-class">.example</span><span class="hljs-selector-class">.org</span>
123<span class="hljs-selector-class">.45</span><span class="hljs-selector-class">.67</span><span class="hljs-selector-class">.89</span></code></pre>
<p>然后运行测试<br><code>siege -f your/file/path.txt -c 100 -t 10s</code><br>OK~ 关于进程和测试的内容就介绍到这了。</p>
<p>如果大家觉得，嘿, 这哥们写的文章不错呀~ <br>能请我喝杯coffee，勉励写出更优质的文章吗？<br><span class="img-wrap"><img data-src="http://7xpsmd.com1.z0.glb.clouddn.com/16-3-15/69326879.jpg" src="https://static.alili.techhttp://7xpsmd.com1.z0.glb.clouddn.com/16-3-15/69326879.jpg" alt="此处输入图片的描述" title="此处输入图片的描述" style="cursor: pointer;"></span></p>
<p>转载请注明出处和作者:<a href="https://segmentfault.com/a/1190000004621734">https://segmentfault.com/a/1190000004621734</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
nodeJS多进程

## 原文链接
[https://segmentfault.com/a/1190000004621734](https://segmentfault.com/a/1190000004621734)

