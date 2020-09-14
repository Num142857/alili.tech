---
title: 'react+socket搭建五子棋平台' 
date: 2018-12-04 2:30:05
hidden: true
slug: 6yzma8tbp7
categories: [reprint]
---

{{< raw >}}

                    
<h2>socket API</h2>
<p>以下是使用socket常用的一些API</p>
<p><strong>服务端监听：</strong></p>
<ul>
<li>connection: 连接成功</li>
<li>disconnect：用户退出</li>
</ul>
<p><strong>客户端监听事件：</strong></p>
<ul>
<li>connect：连接成功</li>
<li>connecting：正在连接</li>
<li>disconnect：断开连接</li>
<li>connect_failed：连接失败</li>
<li>error：错误发生，并且无法被其他事件类型所处理</li>
<li>message：同服务器端message事件</li>
<li>anything：同服务器端anything事件</li>
<li>reconnect_failed：重连失败</li>
<li>reconnect：成功重连</li>
<li>reconnecting：正在重连</li>
</ul>
<p><strong>广播消息</strong></p>
<pre><code>// 给指定的客户端发送消息
socket.emit('msg', "this is a test");

//给除了自己以外的客户端广播消息
socket.broadcast.emit("msg",{data:"hello,everyone"}); 

//给所有客户端广播消息
io.sockets.emit("msg",{data:"hello,all"})


//分组
socket.on('group1', function (data) {
        socket.join('group1'); //加入group1
});
socket.on('group2',function(data){
        socket.join('group2'); //加入group2
});


//给'group1'所有成员发送消息，不包括自己
socket.broadcast.to('group1').emit('msg', data);

//给'group1'所有成员发送消息，包括自己
io.sockets.in('group1').emit('msg', data);

//当前socket离开 'group1'
socket.leave('group1');
</code></pre>
<p>只要知道上面的 <code>socket</code> 用法， 基本写起来就不是什么问题了</p>
<p>效果演示<br><span class="img-wrap"><img data-src="/img/remote/1460000014553252?w=420&amp;h=365" src="https://static.alili.tech/img/remote/1460000014553252?w=420&amp;h=365" alt="图片描述" title="图片描述"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014553253?w=420&amp;h=365" src="https://static.alili.tech/img/remote/1460000014553253?w=420&amp;h=365" alt="图片描述" title="图片描述"></span></p>
<blockquote>
<a href="https://github.com/cd-dongzi/react-socket-gobang" rel="nofollow noreferrer">源码地址 github</a><p><a href="http://dzblog.cn/article/5ade11309ca41104aa1b6d6e" rel="nofollow noreferrer">博客地址</a></p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react+socket搭建五子棋平台

## 原文链接
[https://segmentfault.com/a/1190000014553247](https://segmentfault.com/a/1190000014553247)

