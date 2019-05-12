---
title: 'vue.js+socket.io+express+mongodb打造在线聊天室[一]' 
date: 2018-12-07 2:30:09
hidden: true
slug: 6xe3nxxmqne
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">vue.js+socket.io+express+mongodb打造在线聊天</h2>
<h2 id="articleHeader1">在线地址观看</h2>
<p><a href="http://www.chenleiming.com/vuechat" rel="nofollow noreferrer" target="_blank">http://www.chenleiming.com/vu...</a></p>
<h2 id="articleHeader2"><strong>有喜欢的小哥哥，小姐姐请反手来个star，谢谢！有issue的欢迎提出</strong></h2>
<p><strong>介绍</strong><br>本项目基于vue.js+socket.io+express+mongodb实现的聊天效果， 界面以及功能参考QQ，微信<br><strong>技术栈</strong></p>
<ul>
<li>前端： vue,vue-router,vuex,axios</li>
<li>构建： webpack，vue-cli</li>
<li>后端： express，multer(上传图片)，cors(跨域处理), superagent(调用机器人接口),mongoose(操作数据库)</li>
<li>通讯： socket.io</li>
<li>数据库： mongodb</li>
<li>css预处理器： sass</li>
</ul>
<p><strong>功能列表</strong></p>
<ul>
<li>用户注册</li>
<li>用户登录</li>
<li>群聊</li>
<li>群聊中@小美 和机器人聊天 （注意@小美和消息中间要有空格）</li>
<li>机器人聊天</li>
<li>留言板</li>
</ul>
<p><strong>聊天代码</strong><br><em>前端</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        // 聊天监听
        this.socket.on('chat-msg', (msg) => {
            this.MsgList.push(msg)
            this.$nextTick(() => {
                this.msgDOM.scrollTop = this.msgDOM.scrollHeight
            })
        })
       // 发送消息
       const MsgObj = {
            roomId: this.roomId,
            timeStamp: Date.parse(new Date()),
            userId: this.getUserinfo.userId,
            headPic: this.getUserinfo.headPic,
            nickname: this.getUserinfo.nickname,
            text: this.InputMsg
        }
        this.socket.emit('chat-msg', MsgObj)
        this.InputMsg = ''" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">        <span class="hljs-comment">// 聊天监听</span>
        <span class="hljs-keyword">this</span>.socket.on(<span class="hljs-string">'chat-msg'</span>, (msg) =&gt; {
            <span class="hljs-keyword">this</span>.MsgList.push(msg)
            <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                <span class="hljs-keyword">this</span>.msgDOM.scrollTop = <span class="hljs-keyword">this</span>.msgDOM.scrollHeight
            })
        })
       <span class="hljs-comment">// 发送消息</span>
       <span class="hljs-keyword">const</span> MsgObj = {
            <span class="hljs-attr">roomId</span>: <span class="hljs-keyword">this</span>.roomId,
            <span class="hljs-attr">timeStamp</span>: <span class="hljs-built_in">Date</span>.parse(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()),
            <span class="hljs-attr">userId</span>: <span class="hljs-keyword">this</span>.getUserinfo.userId,
            <span class="hljs-attr">headPic</span>: <span class="hljs-keyword">this</span>.getUserinfo.headPic,
            <span class="hljs-attr">nickname</span>: <span class="hljs-keyword">this</span>.getUserinfo.nickname,
            <span class="hljs-attr">text</span>: <span class="hljs-keyword">this</span>.InputMsg
        }
        <span class="hljs-keyword">this</span>.socket.emit(<span class="hljs-string">'chat-msg'</span>, MsgObj)
        <span class="hljs-keyword">this</span>.InputMsg = <span class="hljs-string">''</span></code></pre>
<p><em>后端</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 进入房间
    socket.on('join-room', (info) => {
        // 添加到房间
      socket.join(info.roomId)
      io.to(info.roomId).emit('join-room', info.nickname)
    })
    // 群聊天
  socket.on('chat-msg', (msg) => {
    saveChatMsg(msg)
    // 分割聊天消息，判断是否与机器人聊天
    const msgArr = msg.text.split(' ')
    if (msgArr[0] === '@小美') {
      getRobotMsg({userId: msg.userId, roomId: msg.roomId, text: msgArr[1]}, (robotmsg) => {
        saveChatMsg(robotmsg)
        io.to(msg.roomId).emit('chat-msg', robotmsg)
      })
    }
    io.to(msg.roomId).emit('chat-msg', msg)
  })
  // 机器人聊天
  socket.on('robot-msg', (msg) => {
    getRobotMsg({userId: msg.userId, text: msg.text}, (robotmsg) => {
      socket.emit('robot-msg', robotmsg)
    })
  })
  // 离开房间
  socket.on('leave-room', (info) => {
      socket.leave(info.roomId)
      console.log(info.nickname + '离开了房间')
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>    <span class="hljs-regexp">//</span> 进入房间
    socket.<span class="hljs-literal">on</span>(<span class="hljs-string">'join-room'</span>, <span class="hljs-function"><span class="hljs-params">(info)</span> =&gt;</span> {
        <span class="hljs-regexp">//</span> 添加到房间
      socket.join(info.roomId)
      io.to(info.roomId).emit(<span class="hljs-string">'join-room'</span>, info.nickname)
    })
    <span class="hljs-regexp">//</span> 群聊天
  socket.<span class="hljs-literal">on</span>(<span class="hljs-string">'chat-msg'</span>, <span class="hljs-function"><span class="hljs-params">(msg)</span> =&gt;</span> {
    saveChatMsg(msg)
    <span class="hljs-regexp">//</span> 分割聊天消息，判断是否与机器人聊天
    const msgArr = msg.text.split(<span class="hljs-string">' '</span>)
    <span class="hljs-keyword">if</span> (msgArr[<span class="hljs-number">0</span>] === <span class="hljs-string">'@小美'</span>) {
      getRobotMsg({userId: msg.userId, roomId: msg.roomId, text: msgArr[<span class="hljs-number">1</span>]}, <span class="hljs-function"><span class="hljs-params">(robotmsg)</span> =&gt;</span> {
        saveChatMsg(robotmsg)
        io.to(msg.roomId).emit(<span class="hljs-string">'chat-msg'</span>, robotmsg)
      })
    }
    io.to(msg.roomId).emit(<span class="hljs-string">'chat-msg'</span>, msg)
  })
  <span class="hljs-regexp">//</span> 机器人聊天
  socket.<span class="hljs-literal">on</span>(<span class="hljs-string">'robot-msg'</span>, <span class="hljs-function"><span class="hljs-params">(msg)</span> =&gt;</span> {
    getRobotMsg({userId: msg.userId, text: msg.text}, <span class="hljs-function"><span class="hljs-params">(robotmsg)</span> =&gt;</span> {
      socket.emit(<span class="hljs-string">'robot-msg'</span>, robotmsg)
    })
  })
  <span class="hljs-regexp">//</span> 离开房间
  socket.<span class="hljs-literal">on</span>(<span class="hljs-string">'leave-room'</span>, <span class="hljs-function"><span class="hljs-params">(info)</span> =&gt;</span> {
      socket.leave(info.roomId)
      <span class="hljs-built_in">console</span>.log(info.nickname + <span class="hljs-string">'离开了房间'</span>)
  })</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue.js+socket.io+express+mongodb打造在线聊天室[一]

## 原文链接
[https://segmentfault.com/a/1190000014209951](https://segmentfault.com/a/1190000014209951)

