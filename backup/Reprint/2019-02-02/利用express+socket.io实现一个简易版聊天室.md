---
title: '利用express+socket.io实现一个简易版聊天室' 
date: 2019-02-02 2:30:10
hidden: true
slug: 7aq5zsq5evu
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在前面</h2>
<p>最近由于利用<code>node</code>重构某个项目，项目中有一个实时聊天的功能，于是就研究了一下聊天室，<a href="http://www.zp1996.top:6323/" rel="nofollow noreferrer" target="_blank">在线demo</a>|<a href="https://github.com/zp1996/chat" rel="nofollow noreferrer" target="_blank">源码</a>，欢迎大家反馈。这个聊天室的主要利用到了<code>socket.io</code>和<code>express</code>。这个聊天室支持群聊，私聊，支持发送图片（PS：大家在体验时最好开启两个浏览器，自问自答）。下面就来和大家分享下实现过程：</p>
<h2 id="articleHeader1">WebSocket</h2>
<blockquote><p>HTML5一种新的协议。它实现了浏览器与服务器全双工通信。</p></blockquote>
<p>为了更好的理解<code>WebSocket</code>，需要了解一下在没有<code>WebSocket</code>阶段是如何写聊天室这种实时系统的：<br>基于<code>http</code>协议浏览器可以实现单向通信，只能由浏览器发起请求（Request），服务器进行响应（Response），一个请求对应一个响应。由于服务器不能主动向客户端推送消息，于是普遍采用的方式就是<strong>轮询（polling）</strong>，轮询实现起来非常简单，就是定时的利用<code>ajax</code>向服务器端进行请求。<strong>如果服务器有新的数据就返回新的数据，如果没有数据就返回空响应</strong>。用代码来模拟下就是这个样子的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 前端请求代码
function update (fn) {
    var xhr = new XMLHttpRequest();
    xhr.open(&quot;get&quot;, &quot;./update.php&quot;);
    xhr.onreadystatechange = function(){    
    if(xhr.readyState === 4){
      if(xhr.status == 200){    
        const res = JSON.parse(xhr.response);
          if (res.flag) {
              // 进行相应操作
              
              // fn为接到响应后的处理函数
              fn &amp;&amp; fn(fn);
          }
      }
    }
    };
    xhr.send();
}
function polling () {
    update();
}
setInterval(polling, 2000);
// 后台响应代码
<?php
    // 利用随机数的大小来模拟是否有新数据
    if (rand(1, 100) < 35) {
        echo json_encode(array( 
            &quot;flag&quot; => true, 
            &quot;data&quot; => '有新数据来了'
        ));
    } else {
        echo json_encode(array(
            &quot;flag&quot; => false
        ));
    }
?>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">// 前端请求代码</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">update</span> <span class="hljs-params">(fn)</span> </span>{
    <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
    xhr.open(<span class="hljs-string">"get"</span>, <span class="hljs-string">"./update.php"</span>);
    xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{    
    <span class="hljs-keyword">if</span>(xhr.readyState === <span class="hljs-number">4</span>){
      <span class="hljs-keyword">if</span>(xhr.status == <span class="hljs-number">200</span>){    
        <span class="hljs-keyword">const</span> res = JSON.parse(xhr.response);
          <span class="hljs-keyword">if</span> (res.flag) {
              <span class="hljs-comment">// 进行相应操作</span>
              
              <span class="hljs-comment">// fn为接到响应后的处理函数</span>
              fn &amp;&amp; fn(fn);
          }
      }
    }
    };
    xhr.send();
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">polling</span> <span class="hljs-params">()</span> </span>{
    update();
}
setInterval(polling, <span class="hljs-number">2000</span>);
<span class="hljs-comment">// 后台响应代码</span>
<span class="hljs-meta">&lt;?php</span>
    <span class="hljs-comment">// 利用随机数的大小来模拟是否有新数据</span>
    <span class="hljs-keyword">if</span> (rand(<span class="hljs-number">1</span>, <span class="hljs-number">100</span>) &lt; <span class="hljs-number">35</span>) {
        <span class="hljs-keyword">echo</span> json_encode(<span class="hljs-keyword">array</span>( 
            <span class="hljs-string">"flag"</span> =&gt; <span class="hljs-keyword">true</span>, 
            <span class="hljs-string">"data"</span> =&gt; <span class="hljs-string">'有新数据来了'</span>
        ));
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">echo</span> json_encode(<span class="hljs-keyword">array</span>(
            <span class="hljs-string">"flag"</span> =&gt; <span class="hljs-keyword">false</span>
        ));
    }
<span class="hljs-meta">?&gt;</span></code></pre>
<p>这种定时请求的方式的关键在于间隔时间的选取，依据我在上面代码做的模拟，很少概率能拿到下真正的数据，<strong>多半的<code>ajax</code>请求是无效的</strong>，于是又有前辈基于轮询提出来了<strong>Comet（服务器推）</strong>，这种技术可以通过<strong>长轮询（long polling）</strong>实现（还可以利用<code>iframe</code>），长轮询也是靠<code>ajax</code>实现客户端的请求，其流程为：<strong>客户端发起请求，服务器挂起请求，假若有新的数据返回，服务器响应客户端刚才的请求，客户端得到响应后继续请求服务器</strong>。用伪代码来模拟下长轮询的过程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 前端利用下面函数进行请求
function longPolling () {
    update(update);
}
longpolling();
// 后端代码做如下更改
<?php
    // 利用随机数的大小来模拟是否有新数据
    while (true) {
        if (rand(1, 100) < 5) {
            echo json_encode(array( 
                &quot;flag&quot; => true, 
                &quot;data&quot; => '有新数据来了'
            ));
            break;
        }
    }
?>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">// 前端利用下面函数进行请求</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">longPolling</span> <span class="hljs-params">()</span> </span>{
    update(update);
}
longpolling();
<span class="hljs-comment">// 后端代码做如下更改</span>
<span class="hljs-meta">&lt;?php</span>
    <span class="hljs-comment">// 利用随机数的大小来模拟是否有新数据</span>
    <span class="hljs-keyword">while</span> (<span class="hljs-keyword">true</span>) {
        <span class="hljs-keyword">if</span> (rand(<span class="hljs-number">1</span>, <span class="hljs-number">100</span>) &lt; <span class="hljs-number">5</span>) {
            <span class="hljs-keyword">echo</span> json_encode(<span class="hljs-keyword">array</span>( 
                <span class="hljs-string">"flag"</span> =&gt; <span class="hljs-keyword">true</span>, 
                <span class="hljs-string">"data"</span> =&gt; <span class="hljs-string">'有新数据来了'</span>
            ));
            <span class="hljs-keyword">break</span>;
        }
    }
<span class="hljs-meta">?&gt;</span></code></pre>
<p>长轮询的确减少了请求的次数，但是它也有着很大的问题，<strong>那就是耗费服务器的资源</strong>。<br>无论是轮询还是长轮询，还有着一个问题就是<code>http</code>并不是支持长连接很多人会说<code>keep-alive</code>不就是做到了长连接吗？然而并非如此，<code>keep-alive</code>是重用一个<code>TCP</code>连接，就是说http 1.1做到了一个<code>TCP</code>连接可以发送多个<code>http</code>请求，然而每个<code>http</code>请求还需要发送<code>Request Header</code>，每个请求的响应还会带着<code>Response Header</code>。对于轮询和长轮询来说伴随着真实数据的交换，还有进行的就是大量的<code>http header</code>的交换。<br>基于这些问题，<code>WebSocket</code>被提出，<code>WebSocket</code>可以理解为对<code>http</code>的一个补丁包，<code>WebSocket</code>使<code>http</code>变成了一个真正的长连接，握手阶段利用<code>http</code>协议，之后就不会再发起<code>http</code>请求了。下面来看下<code>WebSocket</code>握手的过程：</p>
<p><span class="img-wrap"><img data-src="/img/bVEu4P" src="https://static.alili.tech/img/bVEu4P" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>客户端的请求头比一般的<code>http</code>请求多出来几个字段：</p>
<ul>
<li><p><code>Upgrade: websocket,Connection: Upgrade</code>，利用这两个字段来告诉服务器，我要将协议升级为<code>websocket</code>。</p></li>
<li><p><code>Sec-WebSocket-Version: 13</code>，来告诉服务器我想要使用的<code>WebSocket</code>的版本。</p></li>
<li><p><code>Sec-WebSocket-Key</code>，其值采用base64编码的随机16字节长的字符序列，这个值会在响应头中回应。</p></li>
<li><p><code>Sec-WebSocket-Extensions</code>，提供了一个客户端支持的协议扩展列表来供服务器选择，服务器只能选择一个，并且会将选择的扩展写入响应头的<code>Sec-WebSocket-Extensions</code>。</p></li>
<li><p><code>Sec-WebSocket-Protocol</code>，与<code>Sec-WebSocket-Extensions</code>原理相似，用于协商应用子协议。</p></li>
</ul>
<p>再来看看响应头：</p>
<ul>
<li><p><code>Status Code</code>，值为101，表示已经升级到<code>WebSocket</code>协议</p></li>
<li><p><code>Sec-WebSocket-Extensions</code>告诉客户端服务器选择的协议扩展</p></li>
<li><p><code>Sec-WebSocket-Protocol</code>告诉客户端服务器选择的子协议</p></li>
<li><p><code>Sec-WebSocket-Accept</code>经服务器确认并且加密后的<code>Sec-WebSocket-Key</code></p></li>
</ul>
<p>还有一点值得关注的就是协议头由<code>http/https</code>换成了<code>ws/wss</code>，也标识真<code>http</code>完成了其使命，接下来的事情由<code>WebSocket</code>来负责啦！</p>
<h2 id="articleHeader2">socket.io</h2>
<p>由于写原生的<code>WebSocket</code>在处理低版本浏览器的兼容性上的困难，所以一般在写实时交互的这种项目时一般会利用到<code>socket.io</code>。<code>socket.io</code>并不仅仅是<code>WebSocket</code>，还包含着<code>AJAX long polling</code>，<code>AJAX multipart streaming</code>，<code>JSONP Polling</code>等。<code>socket.io</code>可以看做是基于<code>engine.io</code>的二次开发。通过<code>emit</code>和<code>on</code>可以轻松地实现服务器与客户端之间的双向通信，<code>emit</code>来发布事件，<code>on</code>来订阅事件。</p>
<h2 id="articleHeader3">用户登录/登出</h2>
<p>下面开始来写代码，我利用的构建工具是<code>gulp</code>，模板语言是<code>jade</code>，css预处理语言是<code>less</code>，假若也需要使用到这些，可以关注下我所在团队搭建的一个小的<a href="https://github.com/zp1996/lsgo-cli" rel="nofollow noreferrer" target="_blank">脚手架</a>，先从<code>app.js</code>开始：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const users = {}, 
    app = express(),
    server = require(&quot;http&quot;).createServer(app),
    io = require(&quot;socket.io&quot;).listen(server); 
// 将socket.io绑定到服务器上，使得任何连接到服务器的客户端都具有实时通信的功能

// 服务器来监听客户端
io.on(&quot;connection&quot;, (socket) => {
    // socket是返回的连接对象,两端的交互就是通过这个对象
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs moonscript"><code>const users = {}, 
    app = express(),
    server = <span class="hljs-built_in">require</span>(<span class="hljs-string">"http"</span>).createServer(app),
    <span class="hljs-built_in">io</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">"socket.io"</span>).listen(server); 
// 将socket.<span class="hljs-built_in">io</span>绑定到服务器上，使得任何连接到服务器的客户端都具有实时通信的功能

// 服务器来监听客户端
<span class="hljs-built_in">io</span>.on(<span class="hljs-string">"connection"</span>, <span class="hljs-function"><span class="hljs-params">(socket)</span> =&gt;</span> {
    // socket是返回的连接对象,两端的交互就是通过这个对象
});</code></pre>
<p>需要创建一个对象（<code>users</code>）来存储在线用户，键值为用户昵称，为用户登录来订阅个事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="socket.on(&quot;login&quot;, (nickname) => {
        if (users[nickname] || nickname === &quot;system&quot;) {
            socket.emit(&quot;repeat&quot;);            
        } else {
            socket.nickname = nickname;
            users[nickname] = {
                name: nickname,
                socket: socket,
                lastSpeakTime: nowSecond()
            };
            socket.emit(&quot;loginSuccess&quot;);            
            UsersChange(nickname, true);
        }
});
socket.on(&quot;disconnect&quot;, () => {
    if (socket.nickname &amp;&amp; users[socket.nickname]) {
        delete users[socket.nickname];
        UsersChange(socket.nickname, false);
    }
});
function UsersChange (nickname, flag) {
    io.sockets.emit(&quot;system&quot;, {
        nickname: nickname,
        size: Object.keys(users).length,
        flag: flag
    });
}
function nowSecond () {
    return Math.floor(new Date() / 1000);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>socket.on(<span class="hljs-string">"login"</span>, <span class="hljs-function">(<span class="hljs-params">nickname</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (users[nickname] || nickname === <span class="hljs-string">"system"</span>) {
            socket.emit(<span class="hljs-string">"repeat"</span>);            
        } <span class="hljs-keyword">else</span> {
            socket.nickname = nickname;
            users[nickname] = {
                name: nickname,
                socket: socket,
                lastSpeakTime: nowSecond()
            };
            socket.emit(<span class="hljs-string">"loginSuccess"</span>);            
            UsersChange(nickname, <span class="hljs-literal">true</span>);
        }
});
socket.on(<span class="hljs-string">"disconnect"</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (socket.nickname &amp;&amp; users[socket.nickname]) {
        <span class="hljs-keyword">delete</span> users[socket.nickname];
        UsersChange(socket.nickname, <span class="hljs-literal">false</span>);
    }
});
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">UsersChange</span> (<span class="hljs-params">nickname, flag</span>) </span>{
    io.sockets.emit(<span class="hljs-string">"system"</span>, {
        nickname: nickname,
        size: <span class="hljs-built_in">Object</span>.keys(users).length,
        flag: flag
    });
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">nowSecond</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.floor(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>() / <span class="hljs-number">1000</span>);
}</code></pre>
<p>用户登录时需要验证其昵称是否含有，假若函数，则触发在客户端的<code>js</code>代码中注册的<code>repeat</code>事件，反之触发<code>loginSuccess</code>事件并且登录成功后需要向所有的客户端来广播，所以利用了<code>io.sockets.emit</code>。<code>repeat</code>，<code>loginSuccess</code>，<code>system</code>，在src/js/index.js中进行注册，主要用于页面的显示，也就是一些dom操作，所以在这里没有什么好讲的。用户退出，直接调用默认事件<code>disconnect</code>就好，并将该用户从用户对象中移除。</p>
<h2 id="articleHeader4">心跳检测</h2>
<p>在用户的状态上的坑还是不少的，因为<code>WebSocket</code>中间过程比较复杂，经常会出现一些异常的情况，所以需要进行<strong>心跳检测</strong>，我采用的方式是服务端定时遍历用户列表，假若用户最后的发言时间与现在相比超过了5分钟，就将其视为掉线，从而避免了"用户undefined退出群聊"的这种情况。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function pong () {
    const now = nowSecond();
    for (let k in users) {
        if (users[k].lastSpeakTime + MAX_LEAVE_TIME < now) {
            var socket = users[k].socket;
            users[k].socket.emit(&quot;disconnect&quot;);
            socket.emit(&quot;nouser&quot;, &quot;由于长时间未说话，您已经掉线，请重新刷新页面&quot;);
            socket = null;
        } 
    }
}
// 心跳检测
setInterval(pong, PONG_TIME);
function UsersChange (nickname, flag) {
    io.sockets.emit(&quot;system&quot;, {
        nickname: nickname,
        size: Object.keys(users).length,
        flag: flag
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pong</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> now = nowSecond();
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> k <span class="hljs-keyword">in</span> users) {
        <span class="hljs-keyword">if</span> (users[k].lastSpeakTime + MAX_LEAVE_TIME &lt; now) {
            <span class="hljs-keyword">var</span> socket = users[k].socket;
            users[k].socket.emit(<span class="hljs-string">"disconnect"</span>);
            socket.emit(<span class="hljs-string">"nouser"</span>, <span class="hljs-string">"由于长时间未说话，您已经掉线，请重新刷新页面"</span>);
            socket = <span class="hljs-literal">null</span>;
        } 
    }
}
<span class="hljs-comment">// 心跳检测</span>
setInterval(pong, PONG_TIME);
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">UsersChange</span> (<span class="hljs-params">nickname, flag</span>) </span>{
    io.sockets.emit(<span class="hljs-string">"system"</span>, {
        <span class="hljs-attr">nickname</span>: nickname,
        <span class="hljs-attr">size</span>: <span class="hljs-built_in">Object</span>.keys(users).length,
        <span class="hljs-attr">flag</span>: flag
    });
}</code></pre>
<h2 id="articleHeader5">写在最后</h2>
<p>其实<code>socket.io</code>的使用真的非常简单，很容易就会上手，所以其余功能不再一一演示，大家可以看代码的实现（写的比较差，还请见谅），客户端代码中大量用到了<code>L</code>，相当于<code>zepto</code>的<code>$</code>，特别需要处理的是在私信和发送图片的处理上，私信需要处理不同消息框，到底把消息添加到那个消息框中，我利用了一个对象来存储这些信息（<code>cache</code>），<code>cache</code>的键名为用户的昵称（因为在注册时判断了其是否唯一，所以可以将其视为唯一的）；键值为对象，对象属性如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVEvfG" src="https://static.alili.tech/img/bVEvfG" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>具体实现大家还是到源码中去看吧！</p>
<p><strong>感谢<a href="https://github.com/wayou/HiChat" rel="nofollow noreferrer" target="_blank">王哇勇大神的HiChat</a>和<a href="https://github.com/barretlee/blogChat" rel="nofollow noreferrer" target="_blank">小胡子哥的blogChat</a></strong><br><strong>由于本人水平有限，如有错误，欢迎大家指出！</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
利用express+socket.io实现一个简易版聊天室

## 原文链接
[https://segmentfault.com/a/1190000007230919](https://segmentfault.com/a/1190000007230919)

