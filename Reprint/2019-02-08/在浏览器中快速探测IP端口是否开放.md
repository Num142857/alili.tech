---
title: '在浏览器中快速探测IP端口是否开放' 
date: 2019-02-08 2:30:41
hidden: true
slug: x3sipc9agqi
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">0×00 前言</h2>
<p>前两天 freebuf上的的XSS到内网的公开课很受启发，从一个页面到局域网，威力着实增强不少</p>
<p>公开课上检测内网 IP 实现方式用的是 img 标签，加载网站的 favicon.ico 图标，然后监听 onload 事件，看图片能不能加载成功简单易用，就是太慢了 --</p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVvjZL" src="https://static.alili.techhttps://segmentfault.com/img/bVvjZL" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">0×02 分析</h2>
<p>浏览器有几秒的尝试容错时间，对于媒体资源，浏览器限制同一域名并发请求为个位数（<a href="https://github.com/tvrcgo/paper/issues/4" rel="nofollow noreferrer" target="_blank">一般为 6 个</a>），也就是说，把<a href="https://http2.akamai.com/demo" rel="nofollow noreferrer" target="_blank">图片全放到页面上</a>，也不能同时开始检测，只能一点一点来，扫端口的时候会非常慢。</p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVvjV2" src="https://static.alili.techhttps://segmentfault.com/img/bVvjV2" alt="" title="" style="cursor: pointer;"></span>管理员在内网搭建的东西也可能没有图标。。。</p>
<p>探测 IP 端口开放原理就是向目标发送请求，看是否有回应。在上面的 img 中是在加载成功和失败体现出来的。img 嫌慢也可以试试别的嘛，经过一番搜索找到了<a href="https://defuse.ca/in-browser-port-scanning.htm" rel="nofollow noreferrer" target="_blank">这个</a>，<a href="http://jsscan.sourceforge.net/jsscan2.html" rel="nofollow noreferrer" target="_blank">这个</a>和<a href="http://www.andlabs.org/tools/jsrecon.html" rel="nofollow noreferrer" target="_blank">这个</a>。</p>
<h4>第一个页面:</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.getElementById(&quot;testdiv&quot;).innerHTML = '<img src=&quot;http://' + ip + ':' + port + '&quot; alt=&quot;&quot; onerror=&quot;error_handler(' + our_scanobj_index + ');&quot; />';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"testdiv"</span>).innerHTML = <span class="hljs-string">'&lt;img src="http://'</span> + ip + <span class="hljs-string">':'</span> + port + <span class="hljs-string">'" alt="" onerror="error_handler('</span> + our_scanobj_index + <span class="hljs-string">');" /&gt;'</span>;
</code></pre>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVvj0S" src="https://static.alili.techhttps://segmentfault.com/img/bVvj0S" alt="" title="" style="cursor: pointer; display: inline;"></span>是通过加载单个 img，使用的 onerror 事件，10 秒以内触发判断为 open。html 页面不能解析为图片格式，所以也会触发 onerror。</p>
<h4>第二个页面:</h4>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVvj05" src="https://static.alili.techhttps://segmentfault.com/img/bVvj05" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="switch(port){
     case 21:  src = 'ftp://' + this.id() + '@' + host + '/'; break;//ftp
     case 25:  src = 'mailto://' + this.getid() + '@' + host ; break;//smtp **
     case 70:  src = 'gopher://' + host + '/'; break;//gopher
     case 119: src = 'news://' + host + '/'; break;//nntp **
     case 443: src = 'https://' + host + '/' + this.getid() + '.jpg';
     default:  src = 'http://' + host + ':' + port + '/' + this.getid() + '.jpg';// getid is here to prevent cache seekings;
  }
  // ports 19,70,110,143 always return up in IE
  // ** if outlook is the default mail client and default newsreader in  IE the request does not return anything
  img.src = src;
  setTimeout(function () {
     if (!img) return;
     img = undefined;
     callback( host, port, 'down',id);
  }, timeout);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">switch</span>(port){
     <span class="hljs-keyword">case</span> <span class="hljs-number">21</span>:  src = <span class="hljs-string">'ftp://'</span> + <span class="hljs-keyword">this</span>.id() + <span class="hljs-string">'@'</span> + host + <span class="hljs-string">'/'</span>; <span class="hljs-keyword">break</span>;<span class="hljs-comment">//ftp</span>
     <span class="hljs-keyword">case</span> <span class="hljs-number">25</span>:  src = <span class="hljs-string">'mailto://'</span> + <span class="hljs-keyword">this</span>.getid() + <span class="hljs-string">'@'</span> + host ; <span class="hljs-keyword">break</span>;<span class="hljs-comment">//smtp **</span>
     <span class="hljs-keyword">case</span> <span class="hljs-number">70</span>:  src = <span class="hljs-string">'gopher://'</span> + host + <span class="hljs-string">'/'</span>; <span class="hljs-keyword">break</span>;<span class="hljs-comment">//gopher</span>
     <span class="hljs-keyword">case</span> <span class="hljs-number">119</span>: src = <span class="hljs-string">'news://'</span> + host + <span class="hljs-string">'/'</span>; <span class="hljs-keyword">break</span>;<span class="hljs-comment">//nntp **</span>
     <span class="hljs-keyword">case</span> <span class="hljs-number">443</span>: src = <span class="hljs-string">'https://'</span> + host + <span class="hljs-string">'/'</span> + <span class="hljs-keyword">this</span>.getid() + <span class="hljs-string">'.jpg'</span>;
     <span class="hljs-keyword">default</span>:  src = <span class="hljs-string">'http://'</span> + host + <span class="hljs-string">':'</span> + port + <span class="hljs-string">'/'</span> + <span class="hljs-keyword">this</span>.getid() + <span class="hljs-string">'.jpg'</span>;<span class="hljs-comment">// getid is here to prevent cache seekings;</span>
  }
  <span class="hljs-comment">// ports 19,70,110,143 always return up in IE</span>
  <span class="hljs-comment">// ** if outlook is the default mail client and default newsreader in  IE the request does not return anything</span>
  img.src = src;
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
     <span class="hljs-keyword">if</span> (!img) <span class="hljs-keyword">return</span>;
     img = <span class="hljs-literal">undefined</span>;
     callback( host, port, <span class="hljs-string">'down'</span>,id);
  }, timeout);
</code></pre>
<p>功能比第一个多不少，尝试多种协议，80 端口可以探测出来<span class="img-wrap"><img data-src="https://segmentfault.com/img/bVvj1e" src="https://static.alili.techhttps://segmentfault.com/img/bVvj1e" alt="图片描述" title="图片描述" style="cursor: pointer;"></span>77，79 被浏览器屏蔽，马上触发事件，所以误报了。</p>
<h4>第三个页面：</h4>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVvj1v" src="https://static.alili.techhttps://segmentfault.com/img/bVvj1v" alt="" title="" style="cursor: pointer;"></span>用 websocket 准确率很好，特殊端口做过处理没有误报，作者还有一篇<a href="http://www.andlabs.org/tools/jsrecon/jsrecon.html" rel="nofollow noreferrer" target="_blank">笔记</a>，就是 js 和 html 耦合严重，不好提取出来用，趁着放假干脆造了个新轮子。</p>
<h2 id="articleHeader2">0×03 构架</h2>
<p>最终选用的 WebSocket，听着就高大上，非 http 的端口也能探测，文档看的 <a href="http://javascript.ruanyifeng.com/htmlapi/websocket.html" rel="nofollow noreferrer" target="_blank">ruanyifeng</a> 和 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket" rel="nofollow noreferrer" target="_blank">MDN</a> 查到 websocket 并发连接 <a href="https://samsaffron.com/archive/2015/12/29/websockets-caution-required" rel="nofollow noreferrer" target="_blank">挺高的</a> (255 in Chrome and 200 in Firefox)，加入了一个队列模块</p>
<p>js 如下：<br><code>js.later.js</code> 简单的包装了 setInterval，超时检测全靠它<br><code>js.queue.js</code> 队列和并发控制<br><code>js.portscan.js</code>端口扫描的逻辑都在这<br>前端界面用的是 semantic-ui 和 Vue</p>
<p>介绍<br><code>js.later.js</code> 作用比较简单，在这里就是一个 setTimeout 的用法，就不多写了。</p>
<p><code>js.queue.js</code> 结合 websocket 的高并发，很给力，可以动态调整并发数量，鼠标键盘没反应人离开后多跑点任务加快效率</p>
<p>使用示例（可以在演示页面测试）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var q = new Queue(function(task, next, timer) {
    // 跳过部分任务，不执行next，模拟超时
    if (task % 5 === 0) return;
    //模拟延迟异步任务
    $.get('https://httpbin.org/delay/1', function() {
        console.log(task);
        //此任务完成，继续下一个
        next();
    });
}, 3); //3个并发请求
for (var i = 0; i < 15; i++) {
    q.push(i);
}
q.timeout = 10000;
q.onTimeout = function(task) {
    console.warn('queue:timeout:' + task);
}
q.onfinish = function() {
    console.info('队列执行完毕');
}
q.start();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> q = <span class="hljs-keyword">new</span> Queue(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">task, next, timer</span>) </span>{
    <span class="hljs-comment">// 跳过部分任务，不执行next，模拟超时</span>
    <span class="hljs-keyword">if</span> (task % <span class="hljs-number">5</span> === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span>;
    <span class="hljs-comment">//模拟延迟异步任务</span>
    $.get(<span class="hljs-string">'https://httpbin.org/delay/1'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(task);
        <span class="hljs-comment">//此任务完成，继续下一个</span>
        next();
    });
}, <span class="hljs-number">3</span>); <span class="hljs-comment">//3个并发请求</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">15</span>; i++) {
    q.push(i);
}
q.timeout = <span class="hljs-number">10000</span>;
q.onTimeout = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">task</span>) </span>{
    <span class="hljs-built_in">console</span>.warn(<span class="hljs-string">'queue:timeout:'</span> + task);
}
q.onfinish = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'队列执行完毕'</span>);
}
q.start();
</code></pre>
<p><code>js.portscan.js</code> 有三种扫描方式：<br><code>scan_single</code> 扫描单个目标<br><code>scan_batch</code> 扫描一个数组<br><code>scan_range</code> 生成列表并扫描以上三个接口都可以直接使用 scan，根据传入参数不同自动选择对应的方法去执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ps = new PortScan();
ps.onscan = function(flag, task){
   alert(task + '扫描完成，状态为：' + flag)
}
ps.onopen = function(task){
   prompt('开放端口', task)
}
ps.onfinsh = function(){
   alert('scan完成')
}

// 分别执行以下三个方法
// 探测单个目标
ps.scan('baidu.com');

// 批量探测
ps.scan(['baidu.com:22', 'baidu.com:443', 'baidu.com:1024'])

// 生成一段地址并探测
ps.scan('baidu.com:*', 75, 85)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> ps = <span class="hljs-keyword">new</span> PortScan();
ps.onscan = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(flag, task)</span></span>{
   alert(task + <span class="hljs-string">'扫描完成，状态为：'</span> + flag)
}
ps.onopen = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(task)</span></span>{
   prompt(<span class="hljs-string">'开放端口'</span>, task)
}
ps.onfinsh = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
   alert(<span class="hljs-string">'scan完成'</span>)
}

<span class="hljs-comment">// 分别执行以下三个方法</span>
<span class="hljs-comment">// 探测单个目标</span>
ps.scan(<span class="hljs-string">'baidu.com'</span>);

<span class="hljs-comment">// 批量探测</span>
ps.scan([<span class="hljs-string">'baidu.com:22'</span>, <span class="hljs-string">'baidu.com:443'</span>, <span class="hljs-string">'baidu.com:1024'</span>])

<span class="hljs-comment">// 生成一段地址并探测</span>
ps.scan(<span class="hljs-string">'baidu.com:*'</span>, <span class="hljs-number">75</span>, <span class="hljs-number">85</span>)
</code></pre>
<p>使用 WebSocket 发送请求的核心方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用websocket探测端口
PortScan.prototype.wscan = function (target, callback) {
    var _this = this;
    var ws = new WebSocket(this.wsprotocol + target);
    ws.onerror = ws.onopen = function (e) {
        stopTimer();
        _this.portstate('open', target, callback);
    }
    var workerkiller = function (flag) {
        stopTimer(flag);
        ws.onerror = null;
        ws.close();
        // 如果是队列控制超时此处就不再执行next
        callback = flag === 'worker_timeout' ? null : callback;
        _this.portstate(flag, target, callback);
    }
    var stopTimer = this.timeoutexit(workerkiller);
    return workerkiller;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">// 使用websocket探测端口</span>
PortScan.prototype.wscan = <span class="hljs-function"><span class="hljs-keyword">function</span> </span>(target, <span class="hljs-keyword">callback</span>) {
    <span class="hljs-keyword">var</span> _this = <span class="hljs-built_in">this</span>;
    <span class="hljs-keyword">var</span> ws = <span class="hljs-keyword">new</span> <span class="hljs-type">WebSocket</span>(<span class="hljs-built_in">this</span>.wsprotocol + target);
    ws.onerror = ws.onopen = <span class="hljs-function"><span class="hljs-keyword">function</span> </span>(e) {
        stopTimer();
        _this.portstate(<span class="hljs-string">'open'</span>, target, <span class="hljs-keyword">callback</span>);
    }
    <span class="hljs-keyword">var</span> workerkiller = <span class="hljs-function"><span class="hljs-keyword">function</span> </span>(flag) {
        stopTimer(flag);
        ws.onerror = <span class="hljs-literal">null</span>;
        ws.close();
        <span class="hljs-comment">// 如果是队列控制超时此处就不再执行next</span>
        <span class="hljs-keyword">callback</span> = flag === <span class="hljs-string">'worker_timeout'</span> ? <span class="hljs-literal">null</span> : <span class="hljs-type">callback</span>;
        _this.portstate(flag, target, <span class="hljs-keyword">callback</span>);
    }
    <span class="hljs-keyword">var</span> stopTimer = <span class="hljs-built_in">this</span>.timeoutexit(workerkiller);
    <span class="hljs-keyword">return</span> workerkiller;
}
</code></pre>
<p>wscan接收两个参数，target 是目标地址，callback 是回调方法，请求结束后会把扫描结果传入此方法。新建 WebSocket 请求后，在 ws 对象上设置了 ws.onerror 和 ws.onopen 事件。</p>
<p>想要成功建立连接需要服务器端先回应<code>HTTP/1.1 101 Switching Protocols</code>，如果被扫描的端口开放并且返回了数据，数据格式和 WebSocket 不一致会触发 onerror 事件，成功建立连接后则触发 onopen。</p>
<p>workerkiller 方法用来在超时后停止当前这个请求继续等待端口响应，首先清空 onerror 事件，然后执行 ws.close() 关闭连接。</p>
<p><code>var stopTimer = this.timeoutexit(workerkiller);</code>timeoutexit 调用的是 js.later.js 里的方法。根据设置的超时时间（默认设置的 5 秒），启动 workerkiller 停止此请求。端口判定为不通。</p>
<p><code>_this.portstate('open', target, callback);</code>portstate 是 PortScan 对象提供的一个方法，请求结束传入<code>open</code>或是<code>timeout</code>，在 portstate 内部会触发扫描事件。在 ws 的 onerror 触发能触发，说明服务端有回应数据，状态是<code>open</code>，ps.onopen 就会被调用，上面例子中 ps.onopen 弹出的 prompt 窗口显示扫到的开放端口就是由 portstate 去执行的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 扫描批量目标
PortScan.prototype.scan_batch = function (tasks, onfinish, onscan, isonopen_onopen) {
    this.setEvents(onfinish, onscan, isonopen_onopen);
    var _this = this;
    var q = this.queue = new Queue(this.scan_single, this.portscan_concurrence);
    q.tasks = tasks;
    q.onfinish = function () {
        _this.onfinish &amp;&amp; _this.onfinish(_this.opentarget);
    }
    q.start();
    return q;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 扫描批量目标</span>
PortScan.prototype.scan_batch = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(tasks, onfinish, onscan, isonopen_onopen)</span> </span>{
    <span class="hljs-keyword">this</span>.setEvents(onfinish, onscan, isonopen_onopen);
    <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> q = <span class="hljs-keyword">this</span>.queue = <span class="hljs-keyword">new</span> Queue(<span class="hljs-keyword">this</span>.scan_single, <span class="hljs-keyword">this</span>.portscan_concurrence);
    q.tasks = tasks;
    q.onfinish = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        _this.onfinish &amp;&amp; _this.onfinish(_this.opentarget);
    }
    q.start();
    <span class="hljs-keyword">return</span> q;
}
</code></pre>
<p>扫描批量目标使用 js.queue.js 的并发队列功能，去执行的 scan_single 执行单个任务，scan_single 在扫描前做了一些额外的工作：把浏览器屏蔽的端口过滤掉了，ps.onscan 收到的状态就是<code>blocked</code>。</p>
<p>scan_range 遍历指定的范围，<code>host.replace('*', i)</code>，生成目标地址，最后调用 scan_batch。</p>
<h2 id="articleHeader3">0×04 测试</h2>
<p>上面搞那么复杂就是为了 PortScan 的代码用起来简单灵活。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ps = new PortScan();
ps.onfinsh = function(opentarget){
    alert(opentarget);
   // opentarget是所有探测到端口开放的IP地址，花费时间大约10秒多
   // 探测到目标后可接Black-Hole思路，自动化检测cms，根据相关漏洞getshell继而漫游内网
}
// webrtc获得内网网段参见 http://zone.wooyun.org/content/24219
ps.scan('192.168.0.*', 1, 254); // 加端口号也可以 '192.168.0.*:8080'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> ps = <span class="hljs-keyword">new</span> PortScan();
ps.onfinsh = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(opentarget)</span></span>{
    alert(opentarget);
   <span class="hljs-comment">// opentarget是所有探测到端口开放的IP地址，花费时间大约10秒多</span>
   <span class="hljs-comment">// 探测到目标后可接Black-Hole思路，自动化检测cms，根据相关漏洞getshell继而漫游内网</span>
}
<span class="hljs-comment">// webrtc获得内网网段参见 http://zone.wooyun.org/content/24219</span>
ps.scan(<span class="hljs-string">'192.168.0.*'</span>, <span class="hljs-number">1</span>, <span class="hljs-number">254</span>); <span class="hljs-comment">// 加端口号也可以 '192.168.0.*:8080'</span></code></pre>
<p><a href="http://js-port-scan.sec.dog/" rel="nofollow noreferrer" target="_blank"></a><a href="http://js-port-scan.sec.dog/" rel="nofollow noreferrer" target="_blank">http://js-port-scan.sec.dog/</a></p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVvlUf" src="https://static.alili.techhttps://segmentfault.com/img/bVvlUf" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVvlUk" src="https://static.alili.techhttps://segmentfault.com/img/bVvlUk" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>-</p>
<p>（上个月写的，有些地方描述不够详细准确，有空了再更新，那三个js，在demo页面上 - 2016）<br><strong>（demo链接已更新，代码略有改动，修复了ie下运行的bug，增加了ws，ajax，video，image等请求方式，ps.use('websocket') - 2017-02-10 ）</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在浏览器中快速探测IP端口是否开放

## 原文链接
[https://segmentfault.com/a/1190000005746121](https://segmentfault.com/a/1190000005746121)

