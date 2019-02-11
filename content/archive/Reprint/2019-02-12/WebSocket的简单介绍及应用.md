---
title: 'WebSocket的简单介绍及应用' 
date: 2019-02-12 2:30:12
hidden: true
slug: 9luhiu24omc
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">定时刷新的不足与改进</h2>
<p>web开发中可能遇到这样的场景：网页里的某一块区域里写了一些内容，但这些内容不是固定的，即使看网页的人没有做任何操作，它们也会随时间不断变化。股票行情、活动或游戏的榜单都是比较常见的例子。</p>
<p>对此，一般的做法是用<code>setTimeout()</code>或<code>setInverval()</code>定时执行任务，任务内容是Ajax访问一次服务器，并在成功拿到返回数据后去更新页面。</p>
<p>这种定时刷新的做法会有这样一些感觉不足的地方：</p>
<ul>
<li><p>频繁的定时网络请求对浏览器（客户端）和服务器来说都是一种负担，尤其是当网页里有多个定时刷新区域的时候。</p></li>
<li><p>某几次的定时任务可能是不必要的，因为服务器可能并没有新数据，还是返回了和上一次一样的内容。</p></li>
<li><p>页面内容可能不够新，因为服务器可能刚更新了数据，但下一轮定时任务还没有开始。</p></li>
</ul>
<p>造成这些不足的原因归结起来，主要还是由于服务器的响应总是被动的。HTTP协议限制了一次通信总是由客户端发起请求，再由服务器端来返回响应。</p>
<p>因此，如果让服务器端也可以主动发送信息到客户端，就可以很大程度改进这些不足。WebSocket就是一个实现这种双向通信的新协议。</p>
<h2 id="articleHeader1">WebSocket是基于HTTP的功能追加协议</h2>
<p>WebSocket最初由html5提出，但现在已经发展为一个独立的协议标准。WebSocket可以分为协议（<a href="https://tools.ietf.org/html/rfc6455" rel="nofollow noreferrer" target="_blank">Protocol</a>）和<a href="https://www.w3.org/TR/websockets/" rel="nofollow noreferrer" target="_blank">API</a>两部分，分别由<a href="https://zh.wikipedia.org/wiki/%E4%BA%92%E8%81%94%E7%BD%91%E5%B7%A5%E7%A8%8B%E4%BB%BB%E5%8A%A1%E7%BB%84" rel="nofollow noreferrer" target="_blank">IETF</a>和W3C制定了标准。</p>
<p>先来看看WebSocket协议的建立过程。</p>
<p>为了实现WebSocket通信，首先需要客户端发起一次普通HTTP请求（也就是说，WebSocket的建立是依赖HTTP的）。请求报文可能像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET ws://websocket.example.com/ HTTP/1.1
Host: websocket.example.com
Upgrade: websocket
Connection: Upgrade
Origin: http://example.com
Sec-WebSocket-Key:pAloKxsGSHtpIHrJdWLvzQ==
Sec-WebSocket-Version:13" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="http hljs"><code class="http"><span class="hljs-keyword">GET</span> <span class="hljs-string">ws://websocket.example.com/</span> HTTP/1.1
<span class="hljs-attribute">Host</span>: websocket.example.com
<span class="hljs-attribute">Upgrade</span>: websocket
<span class="hljs-attribute">Connection</span>: Upgrade
<span class="hljs-attribute">Origin</span>: http://example.com
<span class="hljs-attribute">Sec-WebSocket-Key:pAloKxsGSHtpIHrJdWLvzQ==
Sec-WebSocket-Version:13</span></code></pre>
<p>其中HTTP头部字段<code>Upgrade: websocket</code>和<code>Connection: Upgrade</code>很重要，告诉服务器通信协议将发生改变，转为WebSocket协议。支持WebSocket的服务器端在确认以上请求后，应返回状态码为<code>101 Switching Protocols</code>的响应：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: nRu4KAPUPjjWYrnzxDVeqOxCvlM=" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="http hljs"><code class="http">HTTP/1.1 <span class="hljs-number">101</span> Switching Protocols
<span class="hljs-attribute">Upgrade</span>: websocket
<span class="hljs-attribute">Connection</span>: Upgrade
<span class="hljs-attribute">Sec-WebSocket-Accept</span>: nRu4KAPUPjjWYrnzxDVeqOxCvlM=</code></pre>
<p>其中字段<code>Sec-WebSocket-Accept</code>是由服务器对前面客户端发送的<code>Sec-WebSocket-Key</code>进行确认和加密后的结果，相当于一次验证，以帮助客户端确信对方是真实可用的WebSocket服务器。</p>
<p>验证通过后，这个握手响应就确立了WebSocket连接，此后，服务器端就可以主动发信息给客户端了。此时的状态比较像服务器端和客户端接通了电话，无论是谁有什么信息想告诉对方，开口就好了。</p>
<p>一旦建立了WebSocket连接，此后的通信就不再使用HTTP了，改为使用WebSocket独立的数据帧（这个帧有办法看到，见后文）。</p>
<p>整个过程像这样：</p>
<p><span class="img-wrap"><img data-src="/img/bVtFz0" src="https://static.alili.tech/img/bVtFz0" alt="Websocket协议建立过程" title="Websocket协议建立过程" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">简单的应用示例</h2>
<p>应用WebSocket有这样几件事要做：</p>
<ul>
<li><p>选用<a href="http://caniuse.com/#feat=websockets" rel="nofollow noreferrer" target="_blank">支持WebSocket的浏览器</a>。</p></li>
<li><p>网页内添加创建WebSocket的代码。</p></li>
<li><p>服务器端添加使用WebSocket通信的代码。</p></li>
</ul>
<h3 id="articleHeader3">服务器端</h3>
<p>以Node的服务器为例，我们使用<a href="https://www.npmjs.com/package/ws" rel="nofollow noreferrer" target="_blank">ws</a>这个组件，这样搭建一个支持WebSocket的服务器端：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var request = require(&quot;request&quot;);
var dateFormat = require(&quot;dateformat&quot;);
var WebSocket = require(&quot;ws&quot;),
    WebSocketServer = WebSocket.Server,
    wss = new WebSocketServer({
        port: 8080,
        path: &quot;/guest&quot;
    });

// 收到来自客户端的连接请求后，开始给客户端推消息
wss.on(&quot;connection&quot;, function(ws) {
    ws.on(&quot;message&quot;, function(message) {
        console.log(&quot;received: %s&quot;, message);
    });
    sendGuestInfo(ws);
});

function sendGuestInfo(ws) {
    request(&quot;http://uinames.com/api?region=china&quot;,
        function(error, response, body) {
            if (!error &amp;&amp; response.statusCode === 200) {
                var jsonObject = JSON.parse(body),
                    guest = jsonObject.name + jsonObject.surname,
                    guestInfo = {
                        guest: guest,
                        time: dateFormat(new Date(), &quot;HH:MM:ss&quot;)
                    };

                if (ws.readyState === WebSocket.OPEN) {

                    // 发，送
                    ws.send(JSON.stringify(guestInfo));

                    // 用随机来“装”得更像不定时推送一些
                    setTimeout(function() {
                        sendGuestInfo(ws);
                    }, (Math.random() * 5 + 3) * 1000);
                }
            }
        });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> request = <span class="hljs-built_in">require</span>(<span class="hljs-string">"request"</span>);
<span class="hljs-keyword">var</span> dateFormat = <span class="hljs-built_in">require</span>(<span class="hljs-string">"dateformat"</span>);
<span class="hljs-keyword">var</span> WebSocket = <span class="hljs-built_in">require</span>(<span class="hljs-string">"ws"</span>),
    WebSocketServer = WebSocket.Server,
    wss = <span class="hljs-keyword">new</span> WebSocketServer({
        <span class="hljs-attr">port</span>: <span class="hljs-number">8080</span>,
        <span class="hljs-attr">path</span>: <span class="hljs-string">"/guest"</span>
    });

<span class="hljs-comment">// 收到来自客户端的连接请求后，开始给客户端推消息</span>
wss.on(<span class="hljs-string">"connection"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ws</span>) </span>{
    ws.on(<span class="hljs-string">"message"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">message</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"received: %s"</span>, message);
    });
    sendGuestInfo(ws);
});

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sendGuestInfo</span>(<span class="hljs-params">ws</span>) </span>{
    request(<span class="hljs-string">"http://uinames.com/api?region=china"</span>,
        <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error, response, body</span>) </span>{
            <span class="hljs-keyword">if</span> (!error &amp;&amp; response.statusCode === <span class="hljs-number">200</span>) {
                <span class="hljs-keyword">var</span> jsonObject = <span class="hljs-built_in">JSON</span>.parse(body),
                    guest = jsonObject.name + jsonObject.surname,
                    guestInfo = {
                        <span class="hljs-attr">guest</span>: guest,
                        <span class="hljs-attr">time</span>: dateFormat(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(), <span class="hljs-string">"HH:MM:ss"</span>)
                    };

                <span class="hljs-keyword">if</span> (ws.readyState === WebSocket.OPEN) {

                    <span class="hljs-comment">// 发，送</span>
                    ws.send(<span class="hljs-built_in">JSON</span>.stringify(guestInfo));

                    <span class="hljs-comment">// 用随机来“装”得更像不定时推送一些</span>
                    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                        sendGuestInfo(ws);
                    }, (<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">5</span> + <span class="hljs-number">3</span>) * <span class="hljs-number">1000</span>);
                }
            }
        });
}</code></pre>
<p>这个例子使用了姓名生成站点<a href="http://uinames.com/" rel="nofollow noreferrer" target="_blank">uinames</a>的API服务，来生成<code>{guest: "人名", time: "15:26:01"}</code>这样的数据。函数<code>sendGuestInfo()</code>会不定时执行，并把包含姓名和时间的信息通过<code>send()</code>方法发送给客户端。另外，注意<code>send()</code>方法需要以字符串形式来发送json数据。</p>
<p>这就像是服务器自己在做一些事，然后在需要的时候会通知客户端一些信息。</p>
<h3 id="articleHeader4">客户端</h3>
<p>客户端我们使用原生javascript来完成（仅支持WebSocket的浏览器）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var socket = new WebSocket(&quot;ws://localhost:8080/guest&quot;);

socket.onopen = function(openEvent) {
    console.log(&quot;WebSocket conntected.&quot;);
};

socket.onmessage = function(messageEvent) {
    var data = messageEvent.data,
        dataObject = JSON.parse(data);
    console.log(&quot;Guest at &quot; + dataObject.time + &quot;: &quot; + dataObject.guest);
};

socket.onerror = function(errorEvent) {
    console.log(&quot;WebSocket error: &quot;, errorEvent);
};

socket.onclose = function(closeEvent) {
    console.log(&quot;WebSocket closed.&quot;);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> socket = <span class="hljs-keyword">new</span> WebSocket(<span class="hljs-string">"ws://localhost:8080/guest"</span>);

socket.onopen = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">openEvent</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"WebSocket conntected."</span>);
};

socket.onmessage = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">messageEvent</span>) </span>{
    <span class="hljs-keyword">var</span> data = messageEvent.data,
        dataObject = <span class="hljs-built_in">JSON</span>.parse(data);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Guest at "</span> + dataObject.time + <span class="hljs-string">": "</span> + dataObject.guest);
};

socket.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">errorEvent</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"WebSocket error: "</span>, errorEvent);
};

socket.onclose = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">closeEvent</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"WebSocket closed."</span>);
};</code></pre>
<p>WebSocket的URL格式是<code>ws://</code>与<code>wss://</code>。因此，需要注意下URL地址的写法，这也包括注意WebSocket服务器端的路径（如这里的<code>/guest</code>）等信息。因为是本地的示例所以这里是<code>localhost</code>。</p>
<p>客户端代码的流程很简单：创建<code>WebSocket</code>对象，然后指定<code>onopen</code>、<code>onmessage</code>等事件的回调即可。其中<code>onmessage</code>是客户端与服务器端通过WebSocket通信的关键事件，想要在收到服务器通知后做点什么，写在<code>onmessage</code>事件的回调函数里就好了。</p>
<h3 id="articleHeader5">效果及分析</h3>
<p>通过<code>node server</code>（假定服务器端的文件名为<code>server.js</code>）启动WebSocket服务器后，用浏览器打开一个引入了前面客户端代码的html（直接文件路径<code>file:///</code>就可以），就可以得到像这样的结果：</p>
<p><span class="img-wrap"><img data-src="/img/bVtFz2" src="https://static.alili.tech/img/bVtFz2" alt="websocket的即时姓名" title="websocket的即时姓名" style="cursor: pointer;"></span></p>
<p>联系前面客户端的代码可以想到，实际从创建<code>WebSocket</code>对象的语句开始，连接请求就会发送，并很快建立起WebSocket连接（不出错误的话），此后就可以收到来自服务器端的通知。如果此时客户端还想再告诉服务器点什么，这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="socket.send(&quot;Hello, server!&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">socket.send(<span class="hljs-string">"Hello, server!"</span>);</code></pre>
<p>服务器就可以收到：</p>
<p><span class="img-wrap"><img data-src="/img/bVtFz5" src="https://static.alili.tech/img/bVtFz5" alt="服务器端已收到" title="服务器端已收到" style="cursor: pointer;"></span></p>
<p>当然，这也是因为前面服务器端的代码内同样设置了<code>message</code>事件的回调。在这个客户端和服务器都是javascript的例子中，无论是服务器端还是客户端，都用<code>send()</code>发送信息，都通过<code>message</code>事件设置回调，形式上可以说非常一致。</p>
<h2 id="articleHeader6">其他可用的数据类型</h2>
<p>WebSocket的<code>send()</code>可以发送的消息，除了前面用的字符串类型之外，还有两种可用，它们是<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Blob" rel="nofollow noreferrer" target="_blank">Blob</a>和<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer" rel="nofollow noreferrer" target="_blank">ArrayBuffer</a>。</p>
<p>它们都代表二进制数据，可用于原始文件数据的发送。比如，这是一个发送Blob类型数据以完成向服务器上传图片的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fileEl = document.getElementById(&quot;image_upload&quot;);
var file = fileEl.files[0];
socket.send(file);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> fileEl = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"image_upload"</span>);
<span class="hljs-keyword">var</span> file = fileEl.files[<span class="hljs-number">0</span>];
socket.send(file);</code></pre>
<p>然后服务器端可以这样把文件保存下来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require(&quot;fs&quot;);

wss.on(&quot;connection&quot;, function(ws) {
    ws.on(&quot;message&quot;, function(message) {
        fs.writeFile(&quot;upload.png&quot;, message, &quot;binary&quot;, function(error) {
            if (!error) {
                console.log(&quot;File saved.&quot;);
            }
        });
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">"fs"</span>);

wss.on(<span class="hljs-string">"connection"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ws</span>) </span>{
    ws.on(<span class="hljs-string">"message"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">message</span>) </span>{
        fs.writeFile(<span class="hljs-string">"upload.png"</span>, message, <span class="hljs-string">"binary"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>) </span>{
            <span class="hljs-keyword">if</span> (!error) {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"File saved."</span>);
            }
        });
    });
});</code></pre>
<p>在客户端接收二进制数据时，需注意WebSocket对象有一个属性<code>binaryType</code>，初始值为<code>"blob"</code>。因此，如果接收的二进制数据是<code>ArrayBuffer</code>，应在接收之前这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="socket.binaryType = &quot;arraybuffer&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">socket.binaryType = <span class="hljs-string">"arraybuffer"</span>;</code></pre>
<h2 id="articleHeader7">其他WebSocket服务器端</h2>
<p>其他语言来做WebSocket服务器是怎样的呢？下面是一个php的WebSocket服务器的例子（使用<a href="http://socketo.me/" rel="nofollow noreferrer" target="_blank">Ratchet</a>）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;

require __DIR__ . '/vendor/autoload.php';

class GuestServer implements MessageComponentInterface {

    public function onOpen(ConnectionInterface $conn) {
        $conn->send('The server is listening to you now.');
    }

    public function onMessage(ConnectionInterface $conn, $msg) {
        $conn->send($this->generateGuestInfo());
    }

    public function onClose(ConnectionInterface $conn) {
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        $conn->close();
    }

    private function generateGuestInfo() {
        $jsonString = file_get_contents('http://uinames.com/api?region=china');
        $jsonObject = json_decode($jsonString, true);
        $guest = $jsonObject['name'] . $jsonObject['surname'];
        $guestInfo = array(
            'guest' => $guest,
            'time' => date('H:i:s', time()),
        );

        return json_encode($guestInfo);
    }
}

$app = new Ratchet\App('localhost', 8080);
$app->route('/guest', new GuestServer(), array('*'));
$app->run();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php"><span class="hljs-meta">&lt;?php</span>
<span class="hljs-keyword">use</span> <span class="hljs-title">Ratchet</span>\<span class="hljs-title">ConnectionInterface</span>;
<span class="hljs-keyword">use</span> <span class="hljs-title">Ratchet</span>\<span class="hljs-title">MessageComponentInterface</span>;

<span class="hljs-keyword">require</span> <span class="hljs-keyword">__DIR__</span> . <span class="hljs-string">'/vendor/autoload.php'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">GuestServer</span> <span class="hljs-keyword">implements</span> <span class="hljs-title">MessageComponentInterface</span> </span>{

    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onOpen</span><span class="hljs-params">(ConnectionInterface $conn)</span> </span>{
        $conn-&gt;send(<span class="hljs-string">'The server is listening to you now.'</span>);
    }

    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onMessage</span><span class="hljs-params">(ConnectionInterface $conn, $msg)</span> </span>{
        $conn-&gt;send(<span class="hljs-keyword">$this</span>-&gt;generateGuestInfo());
    }

    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onClose</span><span class="hljs-params">(ConnectionInterface $conn)</span> </span>{
    }

    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onError</span><span class="hljs-params">(ConnectionInterface $conn, \Exception $e)</span> </span>{
        $conn-&gt;close();
    }

    <span class="hljs-keyword">private</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">generateGuestInfo</span><span class="hljs-params">()</span> </span>{
        $jsonString = file_get_contents(<span class="hljs-string">'http://uinames.com/api?region=china'</span>);
        $jsonObject = json_decode($jsonString, <span class="hljs-keyword">true</span>);
        $guest = $jsonObject[<span class="hljs-string">'name'</span>] . $jsonObject[<span class="hljs-string">'surname'</span>];
        $guestInfo = <span class="hljs-keyword">array</span>(
            <span class="hljs-string">'guest'</span> =&gt; $guest,
            <span class="hljs-string">'time'</span> =&gt; date(<span class="hljs-string">'H:i:s'</span>, time()),
        );

        <span class="hljs-keyword">return</span> json_encode($guestInfo);
    }
}

$app = <span class="hljs-keyword">new</span> Ratchet\App(<span class="hljs-string">'localhost'</span>, <span class="hljs-number">8080</span>);
$app-&gt;route(<span class="hljs-string">'/guest'</span>, <span class="hljs-keyword">new</span> GuestServer(), <span class="hljs-keyword">array</span>(<span class="hljs-string">'*'</span>));
$app-&gt;run();</code></pre>
<p>这个例子也同样是由服务器返回<code>{guest: "人名", time: "15:26:01"}</code>的json数据，不过由于php不像Node那样可以用<code>setTimeout()</code>很容易地实现异步定时任务，这里改为在客户端发送一次任意信息后，再去uinames取得信息并返回。</p>
<p>也可以看到，php搭建的WebSocket服务器仍然是近似的，主要通过WebSocket的<code>open</code>、<code>message</code>等事件来实现功能。</p>
<h2 id="articleHeader8">在Chrome开发工具中查看WebSocket数据帧</h2>
<p>Chrome开发工具中选择Network，然后找到WebSocket的那个请求，里面可以选择Frames。在Frames里看到的，就是WebSocket的数据帧了：</p>
<p><span class="img-wrap"><img data-src="/img/bVtFAf" src="https://static.alili.tech/img/bVtFAf" alt="查看WebSocket数据帧" title="查看WebSocket数据帧" style="cursor: pointer;"></span></p>
<p>可以看到很像聊天记录，其中用浅绿色标注的是由客户端发送给服务器的部分。</p>
<h2 id="articleHeader9">结语</h2>
<p>总的来说，把服务器和客户端拉到了一个聊天窗口来办事，这确实是很棒的想法。</p>
<p>即使只从形式上说，WebSocket的事件回调感觉也比定时任务用起来要更亲切一些。</p>
<p>（重新编辑自我的博客，原文地址：<a href="http://acgtofe.com/posts/2016/03/websocket-how-to" rel="nofollow noreferrer" target="_blank">http://acgtofe.com/posts/2016/03/websocket-how-to</a>）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
WebSocket的简单介绍及应用

## 原文链接
[https://segmentfault.com/a/1190000004649040](https://segmentfault.com/a/1190000004649040)

