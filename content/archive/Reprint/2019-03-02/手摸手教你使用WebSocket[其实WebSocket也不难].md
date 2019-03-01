---
title: '手摸手教你使用WebSocket[其实WebSocket也不难]' 
date: 2019-03-02 2:30:07
hidden: true
slug: dtm6hp4hfru
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000016797888?w=1152&amp;h=720" src="https://static.alili.tech/img/remote/1460000016797888?w=1152&amp;h=720" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在本篇文章之前，<code>WebSocket</code>很多人听说过，没见过，没用过，以为是个很高大上的技术，实际上这个技术并不神秘，可以说是个很容易就能掌握的技术，希望在看完本文之后，马上把文中的栗子拿出来自己试一试，实践出真知。</p>
<blockquote>游泳、健身了解一下：<a href="http://obkoro1.com/" rel="nofollow noreferrer" target="_blank">博客</a>、<a href="http://obkoro1.com/web_accumulate/accumulate/" rel="nofollow noreferrer" target="_blank">前端积累文档</a>、<a href="https://user-gold-cdn.xitu.io/2018/5/1/1631b6f52f7e7015?w=344&amp;h=344&amp;f=jpeg&amp;s=8317" rel="nofollow noreferrer" target="_blank">公众号</a>、<a href="https://github.com/OBKoro1" rel="nofollow noreferrer" target="_blank">GitHub</a>
</blockquote>
<h3 id="articleHeader0">
<code>WebSocket</code>解决了什么问题：</h3>
<p>客户端(浏览器)和服务器端进行通信，只能由客户端发起<code>ajax</code>请求，才能进行通信，服务器端无法主动向客户端推送信息。</p>
<p>当出现类似体育赛事、聊天室、实时位置之类的场景时，客户端要获取服务器端的变化，就只能通过轮询(定时请求)来了解服务器端有没有新的信息变化。</p>
<blockquote>轮询效率低，非常浪费资源(需要不断发送请求，不停链接服务器)</blockquote>
<p><strong>WebSocket的出现，让服务器端可以主动向客户端发送信息，使得浏览器具备了实时双向通信的能力,这就是<code>WebSocket</code>解决的问题</strong></p>
<h3 id="articleHeader1">一个超简单的栗子：</h3>
<p><strong>新建一个<code>html</code>文件，将本栗子找个地方跑一下试试，即可轻松入门<code>WebSocket</code>：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function socketConnect(url) {
    // 客户端与服务器进行连接
    let ws = new WebSocket(url); // 返回`WebSocket`对象，赋值给变量ws
    // 连接成功回调
    ws.onopen = e => {
        console.log('连接成功', e)
        ws.send('我发送消息给服务端'); // 客户端与服务器端通信
    }
    // 监听服务器端返回的信息
    ws.onmessage = e => {
        console.log('服务器端返回：', e.data)
        // do something
    }
    return ws; // 返回websocket对象
}
let wsValue = socketConnect('ws://121.40.165.18:8800'); // websocket对象" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">socketConnect</span>(<span class="hljs-params">url</span>) </span>{
    <span class="hljs-comment">// 客户端与服务器进行连接</span>
    <span class="hljs-keyword">let</span> ws = <span class="hljs-keyword">new</span> WebSocket(url); <span class="hljs-comment">// 返回`WebSocket`对象，赋值给变量ws</span>
    <span class="hljs-comment">// 连接成功回调</span>
    ws.onopen = <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'连接成功'</span>, e)
        ws.send(<span class="hljs-string">'我发送消息给服务端'</span>); <span class="hljs-comment">// 客户端与服务器端通信</span>
    }
    <span class="hljs-comment">// 监听服务器端返回的信息</span>
    ws.onmessage = <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'服务器端返回：'</span>, e.data)
        <span class="hljs-comment">// do something</span>
    }
    <span class="hljs-keyword">return</span> ws; <span class="hljs-comment">// 返回websocket对象</span>
}
<span class="hljs-keyword">let</span> wsValue = socketConnect(<span class="hljs-string">'ws://121.40.165.18:8800'</span>); <span class="hljs-comment">// websocket对象</span></code></pre>
<p>上述栗子中<code>WebSocket</code>的接口地址出自：<a href="http://www.blue-zero.com/WebSocket/" rel="nofollow noreferrer" target="_blank">WebSocket 在线测试</a>，在开发的时候也可以用于测试后端给的地址是否可用。</p>
<h3 id="articleHeader2">webSocket的class类：</h3>
<p>当项目中很多地方使用WebSocket，把它封成一个class类，是更好的选择。</p>
<p><strong>下面的栗子，做了非常详细的注释，建个html文件也可直接使用</strong>，websocket的常用<code>API</code>都放进去了。</p>
<p><strong>下方注释的代码，先不用管，涉及到心跳机制，用于保持WebSocket连接的</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class WebSocketClass {
    /**
     * @description: 初始化实例属性，保存参数
     * @param {String} url ws的接口
     * @param {Function} msgCallback 服务器信息的回调传数据给函数
     * @param {String} name 可选值 用于区分ws，用于debugger
     */
    constructor(url, msgCallback, name = 'default') {
        this.url = url;
        this.msgCallback = msgCallback;
        this.name = name;
        this.ws = null;  // websocket对象
        this.status = null; // websocket是否关闭
    }
    /**
     * @description: 初始化 连接websocket或重连webSocket时调用
     * @param {*} 可选值 要传的数据
     */
    connect(data) {
        // 新建 WebSocket 实例
        this.ws = new WebSocket(this.url);
        this.ws.onopen = e => {
            // 连接ws成功回调
            this.status = 'open';
            console.log(`${this.name}连接成功`, e)
            // this.heartCheck();
            if (data !== undefined) {
                // 有要传的数据,就发给后端
                return this.ws.send(data);
            }
        }
        // 监听服务器端返回的信息
        this.ws.onmessage = e => {
            // 把数据传给回调函数，并执行回调
            // if (e.data === 'pong') {
            //     this.pingPong = 'pong'; // 服务器端返回pong,修改pingPong的状态
            // }
            return this.msgCallback(e.data);
        }
        // ws关闭回调
        this.ws.onclose = e => {
            this.closeHandle(e); // 判断是否关闭
        }
        // ws出错回调
        this.onerror = e => {
            this.closeHandle(e); // 判断是否关闭
        }
    }
    // heartCheck() {
    //     // 心跳机制的时间可以自己与后端约定
    //     this.pingPong = 'ping'; // ws的心跳机制状态值
    //     this.pingInterval = setInterval(() => {
    //         if (this.ws.readyState === 1) {
    //             // 检查ws为链接状态 才可发送
    //             this.ws.send('ping'); // 客户端发送ping
    //         }
    //     }, 10000)
    //     this.pongInterval = setInterval(() => {
    //         this.pingPong = false;
    //         if (this.pingPong === 'ping') {
    //             this.closeHandle('pingPong没有改变为pong'); // 没有返回pong 重启webSocket
    //         }
    //         // 重置为ping 若下一次 ping 发送失败 或者pong返回失败(pingPong不会改成pong)，将重启
    //         console.log('返回pong')
    //         this.pingPong = 'ping'
    //     }, 20000)
    // }
    // 发送信息给服务器
    sendHandle(data) {
        console.log(`${this.name}发送消息给服务器:`, data)
        return this.ws.send(data);
    }
    closeHandle(e = 'err') {
        // 因为webSocket并不稳定，规定只能手动关闭(调closeMyself方法)，否则就重连
        if (this.status !== 'close') {
            console.log(`${this.name}断开，重连websocket`, e)
            // if (this.pingInterval !== undefined &amp;&amp; this.pongInterval !== undefined) {
            //     // 清除定时器
            //     clearInterval(this.pingInterval);
            //     clearInterval(this.pongInterval);
            // }
            this.connect(); // 重连
        } else {
            console.log(`${this.name}websocket手动关闭`)
        }
    }
    // 手动关闭WebSocket
    closeMyself() {
        console.log(`关闭${this.name}`)
        this.status = 'close';
        return this.ws.close();
    }
}
function someFn(data) {
    console.log('接收服务器消息的回调：', data);
}
// const wsValue = new WebSocketClass('ws://121.40.165.18:8800', someFn, 'wsName'); // 这个链接一天只能发送消息50次
const wsValue = new WebSocketClass('wss://echo.websocket.org', someFn, 'wsName'); // 阮一峰老师教程链接
wsValue.connect('立即与服务器通信'); // 连接服务器
// setTimeout(() => {
//     wsValue.sendHandle('传消息给服务器')
// }, 1000);
// setTimeout(() => {
//     wsValue.closeMyself(); // 关闭ws
// }, 10000)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">WebSocketClass</span> </span>{
    <span class="hljs-comment">/**
     * @description: 初始化实例属性，保存参数
     * @param {String} url ws的接口
     * @param {Function} msgCallback 服务器信息的回调传数据给函数
     * @param {String} name 可选值 用于区分ws，用于debugger
     */</span>
    <span class="hljs-keyword">constructor</span>(url, msgCallback, name = 'default') {
        <span class="hljs-keyword">this</span>.url = url;
        <span class="hljs-keyword">this</span>.msgCallback = msgCallback;
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.ws = <span class="hljs-literal">null</span>;  <span class="hljs-comment">// websocket对象</span>
        <span class="hljs-keyword">this</span>.status = <span class="hljs-literal">null</span>; <span class="hljs-comment">// websocket是否关闭</span>
    }
    <span class="hljs-comment">/**
     * @description: 初始化 连接websocket或重连webSocket时调用
     * @param {*} 可选值 要传的数据
     */</span>
    connect(data) {
        <span class="hljs-comment">// 新建 WebSocket 实例</span>
        <span class="hljs-keyword">this</span>.ws = <span class="hljs-keyword">new</span> WebSocket(<span class="hljs-keyword">this</span>.url);
        <span class="hljs-keyword">this</span>.ws.onopen = <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
            <span class="hljs-comment">// 连接ws成功回调</span>
            <span class="hljs-keyword">this</span>.status = <span class="hljs-string">'open'</span>;
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span>连接成功`</span>, e)
            <span class="hljs-comment">// this.heartCheck();</span>
            <span class="hljs-keyword">if</span> (data !== <span class="hljs-literal">undefined</span>) {
                <span class="hljs-comment">// 有要传的数据,就发给后端</span>
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.ws.send(data);
            }
        }
        <span class="hljs-comment">// 监听服务器端返回的信息</span>
        <span class="hljs-keyword">this</span>.ws.onmessage = <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
            <span class="hljs-comment">// 把数据传给回调函数，并执行回调</span>
            <span class="hljs-comment">// if (e.data === 'pong') {</span>
            <span class="hljs-comment">//     this.pingPong = 'pong'; // 服务器端返回pong,修改pingPong的状态</span>
            <span class="hljs-comment">// }</span>
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.msgCallback(e.data);
        }
        <span class="hljs-comment">// ws关闭回调</span>
        <span class="hljs-keyword">this</span>.ws.onclose = <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
            <span class="hljs-keyword">this</span>.closeHandle(e); <span class="hljs-comment">// 判断是否关闭</span>
        }
        <span class="hljs-comment">// ws出错回调</span>
        <span class="hljs-keyword">this</span>.onerror = <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
            <span class="hljs-keyword">this</span>.closeHandle(e); <span class="hljs-comment">// 判断是否关闭</span>
        }
    }
    <span class="hljs-comment">// heartCheck() {</span>
    <span class="hljs-comment">//     // 心跳机制的时间可以自己与后端约定</span>
    <span class="hljs-comment">//     this.pingPong = 'ping'; // ws的心跳机制状态值</span>
    <span class="hljs-comment">//     this.pingInterval = setInterval(() =&gt; {</span>
    <span class="hljs-comment">//         if (this.ws.readyState === 1) {</span>
    <span class="hljs-comment">//             // 检查ws为链接状态 才可发送</span>
    <span class="hljs-comment">//             this.ws.send('ping'); // 客户端发送ping</span>
    <span class="hljs-comment">//         }</span>
    <span class="hljs-comment">//     }, 10000)</span>
    <span class="hljs-comment">//     this.pongInterval = setInterval(() =&gt; {</span>
    <span class="hljs-comment">//         this.pingPong = false;</span>
    <span class="hljs-comment">//         if (this.pingPong === 'ping') {</span>
    <span class="hljs-comment">//             this.closeHandle('pingPong没有改变为pong'); // 没有返回pong 重启webSocket</span>
    <span class="hljs-comment">//         }</span>
    <span class="hljs-comment">//         // 重置为ping 若下一次 ping 发送失败 或者pong返回失败(pingPong不会改成pong)，将重启</span>
    <span class="hljs-comment">//         console.log('返回pong')</span>
    <span class="hljs-comment">//         this.pingPong = 'ping'</span>
    <span class="hljs-comment">//     }, 20000)</span>
    <span class="hljs-comment">// }</span>
    <span class="hljs-comment">// 发送信息给服务器</span>
    sendHandle(data) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span>发送消息给服务器:`</span>, data)
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.ws.send(data);
    }
    closeHandle(e = <span class="hljs-string">'err'</span>) {
        <span class="hljs-comment">// 因为webSocket并不稳定，规定只能手动关闭(调closeMyself方法)，否则就重连</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.status !== <span class="hljs-string">'close'</span>) {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span>断开，重连websocket`</span>, e)
            <span class="hljs-comment">// if (this.pingInterval !== undefined &amp;&amp; this.pongInterval !== undefined) {</span>
            <span class="hljs-comment">//     // 清除定时器</span>
            <span class="hljs-comment">//     clearInterval(this.pingInterval);</span>
            <span class="hljs-comment">//     clearInterval(this.pongInterval);</span>
            <span class="hljs-comment">// }</span>
            <span class="hljs-keyword">this</span>.connect(); <span class="hljs-comment">// 重连</span>
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span>websocket手动关闭`</span>)
        }
    }
    <span class="hljs-comment">// 手动关闭WebSocket</span>
    closeMyself() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`关闭<span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span>`</span>)
        <span class="hljs-keyword">this</span>.status = <span class="hljs-string">'close'</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.ws.close();
    }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">someFn</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'接收服务器消息的回调：'</span>, data);
}
<span class="hljs-comment">// const wsValue = new WebSocketClass('ws://121.40.165.18:8800', someFn, 'wsName'); // 这个链接一天只能发送消息50次</span>
<span class="hljs-keyword">const</span> wsValue = <span class="hljs-keyword">new</span> WebSocketClass(<span class="hljs-string">'wss://echo.websocket.org'</span>, someFn, <span class="hljs-string">'wsName'</span>); <span class="hljs-comment">// 阮一峰老师教程链接</span>
wsValue.connect(<span class="hljs-string">'立即与服务器通信'</span>); <span class="hljs-comment">// 连接服务器</span>
<span class="hljs-comment">// setTimeout(() =&gt; {</span>
<span class="hljs-comment">//     wsValue.sendHandle('传消息给服务器')</span>
<span class="hljs-comment">// }, 1000);</span>
<span class="hljs-comment">// setTimeout(() =&gt; {</span>
<span class="hljs-comment">//     wsValue.closeMyself(); // 关闭ws</span>
<span class="hljs-comment">// }, 10000)</span></code></pre>
<p>栗子里面我直接写在了一起，可以把<code>class</code>放在一个js文件里面,<code>export</code>出去，然后在需要用的地方再<code>import</code>进来，把参数传进去就可以用了。</p>
<h2 id="articleHeader3">WebSocket不稳定</h2>
<p>WebSocket并不稳定，在使用一段时间后，可能会断开连接，貌似至今没有一个为何会断开连接的公论，所以我们需要让WebSocket保持连接状态，这里推荐两种方法。</p>
<h3 id="articleHeader4">WebSocket设置变量，判断是否手动关闭连接：</h3>
<p><strong><code>class</code>类中就是用的这种方式</strong>:设置一个变量，在webSocket关闭/报错的回调中，判断是不是手动关闭的，如果不是的话，就重新连接，这样做的优缺点如下：</p>
<ul>
<li>优点：请求较少(相对于心跳连接)，易设置。</li>
<li>缺点：可能会导致丢失数据,在断开重连的这段时间中，恰好双方正在通信。</li>
</ul>
<h3 id="articleHeader5">WebSocket心跳机制：</h3>
<blockquote>因为第一种方案的缺点，并且可能会有其他一些未知情况导致断开连接而没有触发Error或Close事件。这样就导致实际连接已经断开了，而客户端和服务端却不知道，还在傻傻的等着消息来。</blockquote>
<p>然后聪明的程序猿们想出了一种叫做<strong>心跳机制</strong>的解决方法：</p>
<p>客户端就像心跳一样每隔固定的时间发送一次<code>ping</code>，来告诉服务器，我还活着，而服务器也会返回<code>pong</code>，来告诉客户端，服务器还活着。</p>
<p><strong>具体的实现方法，在上面<code>class</code>的注释中，将其打开，即可看到效果</strong>。</p>
<h2 id="articleHeader6">关于WebSocket</h2>
<p>怕一开始就堆太多文字性的内容，把各位吓跑了，现在大家已经会用了，我们再回头来看看WebSocket的其他知识点。</p>
<h3 id="articleHeader7">WebSocket的当前状态:<code>WebSocket.readyState</code>
</h3>
<p>下面是<code>WebSocket.readyState</code>的四个值(四种状态)：</p>
<ul>
<li>0: 表示正在连接</li>
<li>1: 表示连接成功，可以通信了</li>
<li>2: 表示连接正在关闭</li>
<li>3: 表示连接已经关闭，或者打开连接失败</li>
</ul>
<p>我们可以利用当前状态来做一些事情，比如上面栗子中当WebSocket链接成功后，才允许客户端发送<code>ping</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (this.ws.readyState === 1) {
    // 检查ws为链接状态 才可发送
    this.ws.send('ping'); // 客户端发送ping
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.ws.readyState === <span class="hljs-number">1</span>) {
    <span class="hljs-comment">// 检查ws为链接状态 才可发送</span>
    <span class="hljs-keyword">this</span>.ws.send(<span class="hljs-string">'ping'</span>); <span class="hljs-comment">// 客户端发送ping</span>
}</code></pre>
<h3 id="articleHeader8">
<code>WebSocket</code>还可以发送/接收 二进制数据</h3>
<p>这里我也没有试过，我是看阮一峰老师的<a href="http://www.ruanyifeng.com/blog/2017/05/websocket.html" rel="nofollow noreferrer" target="_blank">WebSocket教程</a>才知道有这么个东西，有兴趣的可以再去谷歌，大家知道一下就可以。</p>
<p>二进制数据包括：<code>blob</code>对象和<code>Arraybuffer</code>对象，所以我们需要分开来处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 接收数据
ws.onmessage = function(event){
    if(event.data instanceof ArrayBuffer){
        // 判断 ArrayBuffer 对象
    }
    
    if(event.data instanceof Blob){
        // 判断 Blob 对象
    }
}

// 发送 Blob 对象的例子
let file = document.querySelector('input[type=&quot;file&quot;]').files[0];
ws.send(file);

// 发送 ArrayBuffer 对象的例子
var img = canvas_context.getImageData(0, 0, 400, 320);
var binary = new Uint8Array(img.data.length);
for (var i = 0; i < img.data.length; i++) {
    binary[i] = img.data[i];
}
ws.send(binary.buffer);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    <span class="hljs-comment">// 接收数据</span>
ws.onmessage = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
    <span class="hljs-keyword">if</span>(event.data <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">ArrayBuffer</span>){
        <span class="hljs-comment">// 判断 ArrayBuffer 对象</span>
    }
    
    <span class="hljs-keyword">if</span>(event.data <span class="hljs-keyword">instanceof</span> Blob){
        <span class="hljs-comment">// 判断 Blob 对象</span>
    }
}

<span class="hljs-comment">// 发送 Blob 对象的例子</span>
<span class="hljs-keyword">let</span> file = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'input[type="file"]'</span>).files[<span class="hljs-number">0</span>];
ws.send(file);

<span class="hljs-comment">// 发送 ArrayBuffer 对象的例子</span>
<span class="hljs-keyword">var</span> img = canvas_context.getImageData(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">400</span>, <span class="hljs-number">320</span>);
<span class="hljs-keyword">var</span> binary = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Uint8Array</span>(img.data.length);
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; img.data.length; i++) {
    binary[i] = img.data[i];
}
ws.send(binary.buffer);</code></pre>
<p><strong>如果你要发送的二进制数据很大的话，如何判断发送完毕：</strong></p>
<p><code>webSocket.bufferedAmount</code>属性，表示还有多少字节的二进制数据没有发送出去：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = new ArrayBuffer(10000000);
socket.send(data);
if (socket.bufferedAmount === 0) {
    // 发送完毕
} else {
    // 发送还没结束
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> data = <span class="hljs-keyword">new</span> <span class="hljs-built_in">ArrayBuffer</span>(<span class="hljs-number">10000000</span>);
socket.send(data);
<span class="hljs-keyword">if</span> (socket.bufferedAmount === <span class="hljs-number">0</span>) {
    <span class="hljs-comment">// 发送完毕</span>
} <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// 发送还没结束</span>
}</code></pre>
<p>上述栗子出自阮一峰老师的<a href="http://www.ruanyifeng.com/blog/2017/05/websocket.html" rel="nofollow noreferrer" target="_blank">WebSocket教程</a></p>
<h3 id="articleHeader9">WebSocket的优点：</h3>
<p>最后再吹一波WebSocket：</p>
<ol>
<li>双向通信(一开始说的，也是最重要的一点)。</li>
<li>数据格式比较轻量，性能开销小，通信高效<p>协议控制的数据包头部较小，而HTTP协议每次通信都需要携带完整的头部</p>
</li>
<li>更好的二进制支持</li>
<li>没有同源限制，客户端可以与任意服务器通信</li>
<li>与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器</li>
</ol>
<hr>
<h2 id="articleHeader10">结语</h2>
<p>看了本文之后，如果还是有点迷糊的话，一定要把文中的两个栗子，新建个html文件跑起来，自己鼓捣鼓捣一下。不然读多少博客/教程都没有用，实践才出真知，切勿纸上谈兵。</p>
<h3 id="articleHeader11">希望看完的朋友可以点个喜欢/关注，您的支持是对我最大的鼓励。</h3>
<p><a href="http://obkoro1.com/" rel="nofollow noreferrer" target="_blank">博客</a>、<a href="http://obkoro1.com/web_accumulate/accumulate/" rel="nofollow noreferrer" target="_blank">前端积累文档</a>、<a href="https://user-gold-cdn.xitu.io/2018/5/1/1631b6f52f7e7015?w=344&amp;h=344&amp;f=jpeg&amp;s=8317" rel="nofollow noreferrer" target="_blank">公众号</a>、<a href="https://github.com/OBKoro1" rel="nofollow noreferrer" target="_blank">GitHub</a></p>
<p>以上2018.10.22</p>
<p>参考资料：</p>
<p><a href="http://www.ruanyifeng.com/blog/2017/05/websocket.html" rel="nofollow noreferrer" target="_blank">WebSocket 教程</a></p>
<p><a href="https://www.cnblogs.com/tugenhua0707/p/8648044.html" rel="nofollow noreferrer" target="_blank">理解WebSocket心跳及重连机制</a></p>
<p><a href="https://www.cnblogs.com/chyingp/p/websocket-deep-in.html" rel="nofollow noreferrer" target="_blank">WebSocket协议：5分钟从入门到精通</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手摸手教你使用WebSocket[其实WebSocket也不难]

## 原文链接
[https://segmentfault.com/a/1190000016797885](https://segmentfault.com/a/1190000016797885)

