---
title: '使用Websocket框架之GatewayWorker开发电商平台买家与卖家实时通讯' 
date: 2018-12-16 2:30:10
hidden: true
slug: 8hyd8c2wfzm
categories: [reprint]
---

{{< raw >}}

                    
<p>前段时间公司提了一个新的需求，在商品的详情页要实现站内买家和商品卖家实时通讯的功能以方便沟通促成交易，要开发此功能当时首先考虑到的就是swoole和workerman了，从网上大概了解了一下关于这两款工具的阐述，功能都是相当强大的，考虑到项目的进度问题，还是选择上手容易比较快的GatewayWorker。</p>
<p>先看一下我们前端设计高大上的模板，分别是用户和卖家后台。 功能还是比较全的，几乎模仿的是QQ。</p>
<p><span class="img-wrap"><img data-src="/img/bV2ALr?w=378&amp;h=670" src="https://static.alili.tech/img/bV2ALr?w=378&amp;h=670" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV2ALC?w=695&amp;h=419" src="https://static.alili.tech/img/bV2ALC?w=695&amp;h=419" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>业务上的大概需求是，用户在进入某个商品详情页下，给用户提供一个和卖家沟通的接口，根据商品的ID找到对应的卖家，类似于淘宝，还有发送图片，发送对应的商品链接；商户后台也差不多。</p>
<p>我们的平台上有虚拟商品和实体商品两大分类，当时也考虑到了消息的读取状态。我的表最初设计如下，没有加任何的索引，考虑的或许也不够周全，有见地的前辈还望指点一二！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="DROP TABLE IF EXISTS `hp_chat_log`;
CREATE TABLE `hp_chat_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '聊天记录表主键id',
  `user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '用户id',
  `merchant_id` varchar(15) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '商家id',
  `send_message` text COLLATE utf8_unicode_ci NOT NULL,
  `send_message_type` tinyint(1) NOT NULL DEFAULT '1' COMMENT '发送消息类型(1:普通文本；2：商品链接,3:用户发送图片)',
  `sender` tinyint(1) NOT NULL DEFAULT '1' COMMENT '发送方。1:用户。2：商家',
  `send_time` int(11) NOT NULL DEFAULT '0' COMMENT '发送时间',
  `read_status` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否已读。0：未读取。1：已读取',
  `acc_isonline` tinyint(1) NOT NULL DEFAULT '0' COMMENT '接收方是否在线 （0：不在线；1：在线）',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=157 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code><span class="hljs-keyword">DROP</span> <span class="hljs-keyword">TABLE</span> <span class="hljs-keyword">IF</span> <span class="hljs-keyword">EXISTS</span> <span class="hljs-string">`hp_chat_log`</span>;
<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">TABLE</span> <span class="hljs-string">`hp_chat_log`</span> (
  <span class="hljs-string">`id`</span> <span class="hljs-built_in">int</span>(<span class="hljs-number">11</span>) <span class="hljs-keyword">unsigned</span> <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> AUTO_INCREMENT <span class="hljs-keyword">COMMENT</span> <span class="hljs-string">'聊天记录表主键id'</span>,
  <span class="hljs-string">`user_id`</span> <span class="hljs-built_in">int</span>(<span class="hljs-number">10</span>) <span class="hljs-keyword">unsigned</span> <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> <span class="hljs-keyword">DEFAULT</span> <span class="hljs-string">'0'</span> <span class="hljs-keyword">COMMENT</span> <span class="hljs-string">'用户id'</span>,
  <span class="hljs-string">`merchant_id`</span> <span class="hljs-built_in">varchar</span>(<span class="hljs-number">15</span>) <span class="hljs-keyword">COLLATE</span> utf8_unicode_ci <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> <span class="hljs-keyword">DEFAULT</span> <span class="hljs-string">''</span> <span class="hljs-keyword">COMMENT</span> <span class="hljs-string">'商家id'</span>,
  <span class="hljs-string">`send_message`</span> <span class="hljs-built_in">text</span> <span class="hljs-keyword">COLLATE</span> utf8_unicode_ci <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span>,
  <span class="hljs-string">`send_message_type`</span> tinyint(<span class="hljs-number">1</span>) <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> <span class="hljs-keyword">DEFAULT</span> <span class="hljs-string">'1'</span> <span class="hljs-keyword">COMMENT</span> <span class="hljs-string">'发送消息类型(1:普通文本；2：商品链接,3:用户发送图片)'</span>,
  <span class="hljs-string">`sender`</span> tinyint(<span class="hljs-number">1</span>) <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> <span class="hljs-keyword">DEFAULT</span> <span class="hljs-string">'1'</span> <span class="hljs-keyword">COMMENT</span> <span class="hljs-string">'发送方。1:用户。2：商家'</span>,
  <span class="hljs-string">`send_time`</span> <span class="hljs-built_in">int</span>(<span class="hljs-number">11</span>) <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> <span class="hljs-keyword">DEFAULT</span> <span class="hljs-string">'0'</span> <span class="hljs-keyword">COMMENT</span> <span class="hljs-string">'发送时间'</span>,
  <span class="hljs-string">`read_status`</span> tinyint(<span class="hljs-number">1</span>) <span class="hljs-keyword">unsigned</span> <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> <span class="hljs-keyword">DEFAULT</span> <span class="hljs-string">'0'</span> <span class="hljs-keyword">COMMENT</span> <span class="hljs-string">'是否已读。0：未读取。1：已读取'</span>,
  <span class="hljs-string">`acc_isonline`</span> tinyint(<span class="hljs-number">1</span>) <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> <span class="hljs-keyword">DEFAULT</span> <span class="hljs-string">'0'</span> <span class="hljs-keyword">COMMENT</span> <span class="hljs-string">'接收方是否在线 （0：不在线；1：在线）'</span>,
  PRIMARY <span class="hljs-keyword">KEY</span> (<span class="hljs-string">`id`</span>)
) <span class="hljs-keyword">ENGINE</span>=MyISAM AUTO_INCREMENT=<span class="hljs-number">157</span> <span class="hljs-keyword">DEFAULT</span> <span class="hljs-keyword">CHARSET</span>=utf8 <span class="hljs-keyword">COLLATE</span>=utf8_unicode_ci;</code></pre>
<p>模板有了，表设计好了，接下来就是搭建服务了，当前项目开发的框架用的是TP5，选择的Websocket框架是GatewayWorker框架，关于GatewayWorker与TP5的整合方法可以看我的这篇文章，讲到了在Linux和</p>
<p>Windows下的整合安装。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://www.cnblogs.com/wt645631686/p/7219519.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">http:<span class="hljs-regexp">//</span>www.cnblogs.com<span class="hljs-regexp">/wt645631686/</span>p<span class="hljs-regexp">/7219519.html</span></code></pre>
<p>整合好了之后需要根据当前服务器的一些端口配置在修改一些默认的配置，因为需要客户端通过指定的端口建立连接。</p>
<p>TP5整合好了之后Gateway和workerman的主体目录结构都在TP5的框架目录vendor下的workerman目录下。需要修改里面gateway目录下的一些文件的端口及IP地址配置。</p>
<p>配置完成之后，进入项目目录，按照workerman官方手册提供的使用方法，用命令php start.php start启动socket服务，如以下截图，分别是1238和8282端口。当然可以在后台运行，详细的使用方法请参考手册。</p>
<p><span class="img-wrap"><img data-src="/img/bV2AMx?w=589&amp;h=171" src="https://static.alili.tech/img/bV2AMx?w=589&amp;h=171" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>启动好了之后那么就需要在客户端开始下手了，我们项目里是在前端页面里用建立的链接。看前端代码</p>
<p><strong>当前的所有代码并不是最终的，目前只是阶段性开发，后期在项目中逐步完善。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ws;
    // 连接服务端
    function connect() {
       // 创建websocket
       ws = new WebSocket(&quot;ws://&quot;+document.domain+&quot;:8282&quot;);　　//当时为了方便以后的维护，这里在php的全局文件里定义了一个常量来定义ip，后来本地开发完提交到linux服务器环境之后发现链接失败！
       console.log(ws);
       ws.onopen = onopen;
       ws.onmessage = onmessage;
       ws.onclose = function(e) {
        console.log(e);
          console.log(&quot;连接关闭，定时重连&quot;);
          connect();
       };
       ws.onerror = function(e) {
        console.log(e);
          console.log(&quot;出现错误&quot;);
       };
    }
     // 握手
    function onopen()
    {
        var joint = '{&quot;type&quot;:&quot;handshake&quot;,&quot;role&quot;:&quot;user&quot;}';
        ws.send(joint);
    }
    // 服务端发来消息时
    function onmessage(e)
    {
        var data = JSON.parse(e.data);
          console.log(data);
        switch(data['type']){
            // 服务端ping客户端
            case 'ping':
                ws.send('{&quot;type&quot;:&quot;pong&quot;}');
                break;
            // 登录 更新用户列表
            case 'handshake':
                bindUid(data.client_id);
                $('#client_id').val(data.client_id);
                break;
            // 提醒
            case 'reception':
                //{&quot;type&quot;:&quot;say&quot;,&quot;from_client_id&quot;:xxx,&quot;to_client_id&quot;:&quot;all/client_id&quot;,&quot;content&quot;:&quot;xxx&quot;,&quot;time&quot;:&quot;xxx&quot;}
                warn(data['content'], data['time'], data['timestamp']);
                break;
        }
    }

    //绑定uid
    function bindUid (client_id) {
        var bindUrl = &quot;{:url('push/push/BindUserClientId')}&quot;;
        $.post(bindUrl, {client_id: client_id}, function(data){
            console.log(data);
        }, 'json');
    }

    //发送连接
    function sendLink () {
       sendTrigger('link');
    }
    // 发送信息
    function sendMessage (){
        sendTrigger('message');
    }
    function sendTrigger(sendType) {
      var toMid     = $('#toMid').val();
      var pid       = $('#pid').val();
      var message   = $(&quot;footer .send_content&quot;).val();
      var client_id = $('#client_id').val();
      var sendUrl   = &quot;{:url('push/push/SendMessageToMerchant')}&quot;;
      $.ajax({
        url:sendUrl,
        type:'POST',
        data:{message:message,toMid:toMid,pid:pid,client_id:client_id,sendType:sendType},
        async:false,
        dataType:'JSON',
        success:function(data){
            data = JSON.parse(data);
            if (data.status < 0) {
                alert('发送失败，请稍后再试！');
            } else {
                $('#send_timestamp').val(data.timeStamp);
                $('#send_timestr').val(data.timeStr);
                if (sendType == 'link') {
                    $('#main').append(data.html);
                }
            }
        }
      })
    }

    // 提醒
    function warn(content, time, prevTmestamp){
        var V_image = $('#V_image').val();
        var str = '<div class=&quot;chat-receiver&quot;>' + timestampWarn(prevTmestamp, time) + '<div class=&quot;chat-avatar&quot;><img src=&quot;'+ V_image+ '&quot; alt=&quot;&quot;></div>
　　　　　　　　<div class=&quot;chat-content&quot;><div class=&quot;chat-triangle&quot;></div><span>' + content + '</span></div>';
        domChange(str);
        $(&quot;#main&quot;).scrollTop($(&quot;#main&quot;)[0].scrollHeight);

    }

    //发送
    function sender(content, time, prevTmestamp) {
        var user_image = $('#user_image').val();
        var str = '<div class=&quot;chat-sender&quot;>' + timestampWarn(prevTmestamp, time) + '<div class=&quot;chat-avatar&quot;><img src=&quot;' +user_image + '&quot; alt=&quot;&quot;>
</div><div class=&quot;chat-content&quot;><div class=&quot;chat-triangle&quot;></div>' +
        '<span>' + content + '</span></div></div>';
        domChange(str);
    }

    //消息时间控制
    function timestampWarn (nowTimestamp , nowTime) {
        var prevTimestamp = $('#prev_timestamp').val();
        $('#prev_timestamp').val(nowTimestamp);
        var timeOffset    = 6;
        var accTime = '';
        if ((nowTimestamp - prevTimestamp) > timeOffset) {
           accTime =  '<div style=&quot;clear:both;&quot;></div><p class=&quot;chat-history-date&quot;>' + nowTime + '</p>';
        }
        return accTime;
    }
<body onload=&quot;connect();&quot;>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>var ws;
    <span class="hljs-comment">// 连接服务端</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">connect</span><span class="hljs-params">()</span> {</span>
       <span class="hljs-comment">// 创建websocket</span>
       ws = new WebSocket(<span class="hljs-string">"ws://"</span>+document.domain+<span class="hljs-string">":8282"</span>);　　<span class="hljs-comment">//当时为了方便以后的维护，这里在php的全局文件里定义了一个常量来定义ip，后来本地开发完提交到linux服务器环境之后发现链接失败！</span>
       console.<span class="hljs-built_in">log</span>(ws);
       ws.onopen = onopen;
       ws.onmessage = onmessage;
       ws.onclose = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span> {</span>
        console.<span class="hljs-built_in">log</span>(e);
          console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"连接关闭，定时重连"</span>);
          connect();
       };
       ws.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span> {</span>
        console.<span class="hljs-built_in">log</span>(e);
          console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"出现错误"</span>);
       };
    }
     <span class="hljs-comment">// 握手</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onopen</span><span class="hljs-params">()</span></span>
    {
        var joint = <span class="hljs-string">'{"</span><span class="hljs-built_in">type</span><span class="hljs-string">":"</span>handshake<span class="hljs-string">","</span>role<span class="hljs-string">":"</span>user<span class="hljs-string">"}'</span>;
        ws.send(joint);
    }
    <span class="hljs-comment">// 服务端发来消息时</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onmessage</span><span class="hljs-params">(e)</span></span>
    {
        var data = JSON.parse(e.data);
          console.<span class="hljs-built_in">log</span>(data);
        switch(data[<span class="hljs-string">'type'</span>]){
            <span class="hljs-comment">// 服务端ping客户端</span>
            <span class="hljs-keyword">case</span> <span class="hljs-string">'ping'</span>:
                ws.send(<span class="hljs-string">'{"</span><span class="hljs-built_in">type</span><span class="hljs-string">":"</span>pong<span class="hljs-string">"}'</span>);
                <span class="hljs-keyword">break</span>;
            <span class="hljs-comment">// 登录 更新用户列表</span>
            <span class="hljs-keyword">case</span> <span class="hljs-string">'handshake'</span>:
                bindUid(data.client_id);
                $(<span class="hljs-string">'#client_id'</span>).val(data.client_id);
                <span class="hljs-keyword">break</span>;
            <span class="hljs-comment">// 提醒</span>
            <span class="hljs-keyword">case</span> <span class="hljs-string">'reception'</span>:
                <span class="hljs-comment">//{"type":"say","from_client_id":xxx,"to_client_id":"all/client_id","content":"xxx","time":"xxx"}</span>
                warn(data[<span class="hljs-string">'content'</span>], data[<span class="hljs-string">'time'</span>], data[<span class="hljs-string">'timestamp'</span>]);
                <span class="hljs-keyword">break</span>;
        }
    }

    <span class="hljs-comment">//绑定uid</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bindUid</span> <span class="hljs-params">(client_id)</span> {</span>
        var bindUrl = <span class="hljs-string">"{:url('</span>push/push/BindUserClientId')}<span class="hljs-string">";
        $.post(bindUrl, {client_id: client_id}, function(data){
            console.log(data);
        }, '</span>json');
    }

    <span class="hljs-comment">//发送连接</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sendLink</span> <span class="hljs-params">()</span> {</span>
       sendTrigger(<span class="hljs-string">'link'</span>);
    }
    <span class="hljs-comment">// 发送信息</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sendMessage</span> <span class="hljs-params">()</span>{</span>
        sendTrigger(<span class="hljs-string">'message'</span>);
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sendTrigger</span><span class="hljs-params">(sendType)</span> {</span>
      var toMid     = $(<span class="hljs-string">'#toMid'</span>).val();
      var pid       = $(<span class="hljs-string">'#pid'</span>).val();
      var message   = $(<span class="hljs-string">"footer .send_content"</span>).val();
      var client_id = $(<span class="hljs-string">'#client_id'</span>).val();
      var sendUrl   = <span class="hljs-string">"{:url('</span>push/push/SendMessageToMerchant')}<span class="hljs-string">";
      $.ajax({
        url:sendUrl,
        type:'</span>POST',
        data:{message:message,toMid:toMid,pid:pid,client_id:client_id,sendType:sendType},
        async:false,
        dataType:<span class="hljs-string">'JSON'</span>,
        success:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(data)</span>{</span>
            data = JSON.parse(data);
            <span class="hljs-keyword">if</span> (data.status &lt; <span class="hljs-number">0</span>) {
                alert(<span class="hljs-string">'发送失败，请稍后再试！'</span>);
            } <span class="hljs-keyword">else</span> {
                $(<span class="hljs-string">'#send_timestamp'</span>).val(data.timeStamp);
                $(<span class="hljs-string">'#send_timestr'</span>).val(data.timeStr);
                <span class="hljs-keyword">if</span> (sendType == <span class="hljs-string">'link'</span>) {
                    $(<span class="hljs-string">'#main'</span>).append(data.html);
                }
            }
        }
      })
    }

    <span class="hljs-comment">// 提醒</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">warn</span><span class="hljs-params">(content, time, prevTmestamp)</span>{</span>
        var V_image = $(<span class="hljs-string">'#V_image'</span>).val();
        var str = <span class="hljs-string">'&lt;div class="</span>chat-receiver<span class="hljs-string">"&gt;'</span> + timestampWarn(prevTmestamp, time) + <span class="hljs-string">'&lt;div class="</span>chat-avatar<span class="hljs-string">"&gt;&lt;img src="</span><span class="hljs-string">'+ V_image+ '</span><span class="hljs-string">" alt="</span><span class="hljs-string">"&gt;&lt;/div&gt;
　　　　　　　　&lt;div class="</span>chat-content<span class="hljs-string">"&gt;&lt;div class="</span>chat-triangle<span class="hljs-string">"&gt;&lt;/div&gt;&lt;span&gt;'</span> + content + <span class="hljs-string">'&lt;/span&gt;&lt;/div&gt;'</span>;
        domChange(str);
        $(<span class="hljs-string">"#main"</span>).scrollTop($(<span class="hljs-string">"#main"</span>)[<span class="hljs-number">0</span>].scrollHeight);

    }

    <span class="hljs-comment">//发送</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sender</span><span class="hljs-params">(content, time, prevTmestamp)</span> {</span>
        var user_image = $(<span class="hljs-string">'#user_image'</span>).val();
        var str = <span class="hljs-string">'&lt;div class="</span>chat-sender<span class="hljs-string">"&gt;'</span> + timestampWarn(prevTmestamp, time) + <span class="hljs-string">'&lt;div class="</span>chat-avatar<span class="hljs-string">"&gt;&lt;img src="</span><span class="hljs-string">' +user_image + '</span><span class="hljs-string">" alt="</span><span class="hljs-string">"&gt;
&lt;/div&gt;&lt;div class="</span>chat-content<span class="hljs-string">"&gt;&lt;div class="</span>chat-triangle<span class="hljs-string">"&gt;&lt;/div&gt;'</span> +
        <span class="hljs-string">'&lt;span&gt;'</span> + content + <span class="hljs-string">'&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;'</span>;
        domChange(str);
    }

    <span class="hljs-comment">//消息时间控制</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timestampWarn</span> <span class="hljs-params">(nowTimestamp , nowTime)</span> {</span>
        var prevTimestamp = $(<span class="hljs-string">'#prev_timestamp'</span>).val();
        $(<span class="hljs-string">'#prev_timestamp'</span>).val(nowTimestamp);
        var timeOffset    = <span class="hljs-number">6</span>;
        var accTime = <span class="hljs-string">''</span>;
        <span class="hljs-keyword">if</span> ((nowTimestamp - prevTimestamp) &gt; timeOffset) {
           accTime =  <span class="hljs-string">'&lt;div style="</span><span class="hljs-keyword">clear</span>:both;<span class="hljs-string">"&gt;&lt;/div&gt;&lt;p class="</span>chat-history-date<span class="hljs-string">"&gt;'</span> + nowTime + <span class="hljs-string">'&lt;/p&gt;'</span>;
        }
        <span class="hljs-keyword">return</span> accTime;
    }
&lt;body onload=<span class="hljs-string">"connect();"</span>&gt;
&lt;/body&gt;</code></pre>
<p>在开发过程中，修改的GatewayWorker文件并不多，除了几个主要的端口及IP需要修改之外，仅仅修改一个重要的文件就够了，那就是Push模块（项目的通讯模块）同级的Events.php文件。看一下项目需求里</p>
<p>修改后的代码，一个方法；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
    * 当客户端发来消息时触发
    * @param int $client_id 连接id
    * @param mixed $message 具体消息
    */
   public static function onMessage($client_id, $message)
   {
        $message_data = json_decode($message,true);
        if (!$message_data) {
            return ;
        }
        switch($message_data['type']) {
            case 'pong':
                return;
            case 'handshake':                
                $new_message    = [
                    'type'      => $message_data['type'],
                    'client_id' => $client_id, 
                    'time'      => date('H:i:s')
                ];
                Gateway::sendToClient($client_id, json_encode($new_message));
                return;
            case 'send':
                if (!isset($message_data['toClientUid'])) {
                  throw new \Exception(&quot;toClient not set. client_ip:{$_SERVER['REMOTE_ADDR']}&quot;);
                }
                $toUid          = $message_data['toClientUid'];
                $message        = $message_data['content'];
                $new_message    = [
                    'type'      => 'reception',
                    'content'   => $message, 
                    'time'      => date('H:i:s'),
                    'timestamp' => time(),
                    'c_type'    => $message_data['c_type'],
                    'primary'   => $message_data['Db_id']
                ];  
                //发送者角色
                $source_info = explode('_', $message_data['source']);
                if ($source_info[0] == 'U') {
　　　　　　　　　　　　//为了安全，特意做了加密
                    $new_message['source'] = encrypt_hopeband($source_info[1], 'E', 'XXXXXXX');　　　　
                }

                return Gateway::sendToUid($toUid, json_encode($new_message));
        }
   }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">/**
    * 当客户端发来消息时触发
    * <span class="hljs-doctag">@param</span> int $client_id 连接id
    * <span class="hljs-doctag">@param</span> mixed $message 具体消息
    */</span>
   <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onMessage</span><span class="hljs-params">($client_id, $message)</span>
   </span>{
        $message_data = json_decode($message,<span class="hljs-keyword">true</span>);
        <span class="hljs-keyword">if</span> (!$message_data) {
            <span class="hljs-keyword">return</span> ;
        }
        <span class="hljs-keyword">switch</span>($message_data[<span class="hljs-string">'type'</span>]) {
            <span class="hljs-keyword">case</span> <span class="hljs-string">'pong'</span>:
                <span class="hljs-keyword">return</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-string">'handshake'</span>:                
                $new_message    = [
                    <span class="hljs-string">'type'</span>      =&gt; $message_data[<span class="hljs-string">'type'</span>],
                    <span class="hljs-string">'client_id'</span> =&gt; $client_id, 
                    <span class="hljs-string">'time'</span>      =&gt; date(<span class="hljs-string">'H:i:s'</span>)
                ];
                Gateway::sendToClient($client_id, json_encode($new_message));
                <span class="hljs-keyword">return</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-string">'send'</span>:
                <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">isset</span>($message_data[<span class="hljs-string">'toClientUid'</span>])) {
                  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> \<span class="hljs-keyword">Exception</span>(<span class="hljs-string">"toClient not set. client_ip:{$_SERVER['REMOTE_ADDR']}"</span>);
                }
                $toUid          = $message_data[<span class="hljs-string">'toClientUid'</span>];
                $message        = $message_data[<span class="hljs-string">'content'</span>];
                $new_message    = [
                    <span class="hljs-string">'type'</span>      =&gt; <span class="hljs-string">'reception'</span>,
                    <span class="hljs-string">'content'</span>   =&gt; $message, 
                    <span class="hljs-string">'time'</span>      =&gt; date(<span class="hljs-string">'H:i:s'</span>),
                    <span class="hljs-string">'timestamp'</span> =&gt; time(),
                    <span class="hljs-string">'c_type'</span>    =&gt; $message_data[<span class="hljs-string">'c_type'</span>],
                    <span class="hljs-string">'primary'</span>   =&gt; $message_data[<span class="hljs-string">'Db_id'</span>]
                ];  
                <span class="hljs-comment">//发送者角色</span>
                $source_info = explode(<span class="hljs-string">'_'</span>, $message_data[<span class="hljs-string">'source'</span>]);
                <span class="hljs-keyword">if</span> ($source_info[<span class="hljs-number">0</span>] == <span class="hljs-string">'U'</span>) {
　　　　　　　　　　　　<span class="hljs-comment">//为了安全，特意做了加密</span>
                    $new_message[<span class="hljs-string">'source'</span>] = encrypt_hopeband($source_info[<span class="hljs-number">1</span>], <span class="hljs-string">'E'</span>, <span class="hljs-string">'XXXXXXX'</span>);　　　　
                }

                <span class="hljs-keyword">return</span> Gateway::sendToUid($toUid, json_encode($new_message));
        }
   }</code></pre>
<p>然后看一下Push模块下的控制器文件，在配合前端在绑定客户端ID及发送信息做的一些处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Push extends Base{

    protected static $user_headimage = '';
    protected static $uid = null;



    public function __construct () {
        parent::__construct();
        $this->checkUserLogin();
        //用户头像昵称等信息
        self::$uid            = session('userinfo.uid');
        $user_info            = Hmodel\User::getUserChatinfoById(self::$uid);
        self::$user_headimage = json_decode($user_info['headimgurl'],true)[0];

    }


    public function chatAction () {
        $product_id = intval(input('param.pid', 0, 'int'));
        $toMid      = Hmodel\Product::getMidByProductid($product_id);
        if ($toMid === false) notFund();

        $productHtml = $this->returnProductData2Html($product_id, 'default');

        $int_toMid = substr($toMid, 2);
        $V_headInfo = Pmodel\Push::getVmerchantHeadImageByVid($int_toMid);
        $V_headimage = is_not_empty_array($V_headInfo) ? json_decode($V_headInfo['headimgurl'])[0] :'/uploads/logo.png';

        if (substr($toMid, 0, 1) == 'V') {
            $chatLogData = Pmodel\Push::getChatlogByUseridAndVid(self::$uid, $int_toMid); 
            if (is_not_empty_array($chatLogData)) {
                $chatLog = self::chatlogData2Html($chatLogData, $V_headimage);
            }
        } elseif (substr($toMid, 0, 1) == 'E') {

        }


        $view = new View;
        $view->assign('pHtml', $productHtml);
        $view->assign('toMid', $toMid);
        $view->assign('pid', $product_id);
        $view->assign('chatlogHtml', $chatLog);
        $view->assign('role', 'user');
        $view->assign('user_image', self::$user_headimage);
        $view->assign('V_image', $V_headimage);
        return $view->fetch();
    }


      private static function chatlogData2Html ($data = [], $V_headimage = '') {
        $todayTimestamp = strtotime(date('Y-m-d'));
        $html = '';
        foreach ($data as $k => $v) {
            $date = $v['send_time'] < $todayTimestamp ? date('Y/m/d H:i:s', $v['send_time']) : date('H:i:s', $v['send_time']);
            $time_nodes = '';
            if (($data[$k]['send_time'] - $data[$k-1]['send_time']) > 180) {
                $time_nodes = '<div style=&quot;clear:both;&quot;></div><p class=&quot;chat-history-date&quot;>' .$date.'</p>';
            } 
            //sender->发送方   1:用户。2：商家
            if ($v['sender'] == 1) {
                
                //send_message_type->发送消息类型  (1:普通文本；2：商品链接)
                if ($v['send_message_type'] == 1) {
                    $html.= '<div class=&quot;chat-sender&quot;>';
                    $html.= $time_nodes;
                    $html.= '<div class=&quot;chat-avatar&quot;><img src=&quot;' . self::$user_headimage . '&quot; alt=&quot;&quot;></div>';
                    $html.= '<div class=&quot;chat-content&quot;><div class=&quot;chat-triangle&quot;></div><span>' . $v['send_message'].'</span></div>';
                    $html.= '</div>';
                }elseif ($v['send_message_type'] == 2) {
                    $html.= $time_nodes;
                    $product_info = json_decode($v['send_message'],true);
                    $html.= self::productData2SendHtml($product_info);
                }elseif ($v['send_message_type'] == 3) {
                    $images_arr = json_decode($v['send_message'],true);
                  
                    $html.= '<div class=&quot;chat-sender&quot;>';
                    $html.= $time_nodes;
                    $html.= '<div class=&quot;chat-avatar&quot;><img src=&quot;' . self::$user_headimage . '&quot; alt=&quot;&quot;></div>';
                    $html.= '<div class=&quot;chat-content&quot;><div class=&quot;chat-triangle&quot;></div>';
                    foreach ($images_arr as $v ) {
                        $html.= '<img src=&quot;' .WEB_SITE. '/' . $v . '&quot; style=&quot;max-width:85%&quot;>';
                    }
                    $html.= '</div>';
                    $html.= '</div>';
                }
            }else {
                if ($v['send_message_type'] == 1) {
                    $html.= '<div class=&quot;chat-receiver&quot;>';
                    $html.= '<div class=&quot;chat-avatar&quot;><img src=&quot;' . $V_headimage . '&quot; alt=&quot;&quot;></div>';
                    $html.= '<div class=&quot;chat-content&quot;><div class=&quot;chat-triangle&quot;></div><span>' . $v['send_message'].'</span></div>';
                    $html.= '</div>';
                }elseif ($v['send_message_type'] == 2) {

                }
            }
        }
        return $html;
    }
    public function BindUserClientIdAction () {
        if (!Request::instance()->isPost()) { notFund(); }
        $bindUserid = 'U_' . session('userinfo.uid');
        $client_id = input(&quot;param.client_id&quot;, 0, &quot;string&quot;); 
        // 设置GatewayWorker服务的Register服务ip和端口
        Gateway::$registerAddress = SOCKET_SERVER_PORT;
        // client_id与uid绑定
        // Gateway::closeClient($client_id);
        return Gateway::bindUid($client_id, $bindUserid);
}
//用户发送消息给商家
    public function SendMessageToMerchantAction () {
        if (!Request::instance()->isPost()) { notFund(); }
        $message   = $_POST['message']; 
        $toMid     = input('post.toMid', '' , 'string');
        $product_id= input('post.pid', 0, 'int');
        $client_id = input('post.client_id', '', 'string');
        $sendType  = input('post.sendType', '', 'string');



        if (!in_array($sendType,['link', 'message'])) {                             //客户端错误
            return json_encode(['status' => -1]);
        }
        if (strlen($client_id) != 20 ) {                                            //客户端错误
            return json_encode(['status' => -1]);
        }
        if (!is_not_empty_string($toMid) || !is_positive_integer($product_id)) {    //系统错误
            return json_encode(['status' => -2]);
        }
        $db_toMid      = Hmodel\Product::getMidByProductid($product_id);            //数据错误
        if ($db_toMid != $toMid) {
            return json_encode(['status' => -3]);
        }
        require_once dirname(dirname(__FILE__)) . '/Events.php';

        $uid            = session('userinfo.uid');
        $accIsOnline    = Gateway::isUidOnline($toMid) == 1 ? 1 : 0;                //判读商家是否在线
        $message_type   = 1;
        if ($sendType == 'link') {
            $message_type = 2;
            $productData = $this->referProductData($product_id);
            unset($productData['product_price']);
            unset($productData['score']);
            unset($productData['product_stock']);
            unset($productData['product_param']);
            unset($productData['product_desc']);
            unset($productData['product_main']);
            unset($productData['category_id']);
            unset($productData['merchant_id']);
            $message = json_encode($productData);
        }
        //Log入库
        $insertId       = Pmodel\Push::addChatLog($uid, $toMid, $message, $message_type, 1, $accIsOnline);
        if($message_type == 1){
            if(!is_numeric($message)){
                $message = '&quot;'.$message.'&quot;';
            }
            if ($message == '') {
                $message = '';
            }
        }
        if ($insertId === false) {                                                  //入库失败（服务器故障）
            return json_encode(['status' => -3]);
        }
        $Worker = new \Events;
        $message_json   = '{&quot;type&quot;:&quot;send&quot;,&quot;source&quot;:&quot;U_' . $uid . '&quot;,&quot;toClientUid&quot;:&quot;' . $toMid . '&quot;,&quot;content&quot;:' . $message .',
　　　　　　　　　　　　　　   &quot;c_type&quot;: ' . $message_type .', &quot;Db_id&quot;:' . $insertId . '}';

        $Worker::onMessage($client_id, $message_json);
        //成功返回相关数据
        return json_encode([
            'status'    => 1,
            'timeStamp' => time(),
            'timeStr'   => date('H:i:s'),
            'html'      => $message_type == 1 ? '' : self::productData2SendHtml($productData)
        ]);

 }
//商家发送信息给用户
    public function sendMessageToUserAction () {
     if (!Request::instance()->isPost()) { notFund(); }
        $post_message = is_not_empty_string($_POST['message']) ? $_POST['message'] : ''; 
        $toUserCode   = input('post.toUserCode', '' , 'string');
        $toU_uid      = encrypt_hopeband($toUserCode, 'D', 'xxxxx');
        $V_client_id  = input('post.client_id', '', 'string');
        $V_uid_code   = input('post.myCode', '', 'string');
        $V_uid        = encrypt_hopeband($V_uid_code, 'D', 'xxxxx');
        $make_message = [];
        $message = '';
        self::trimImageAndTextinfo2str($post_message, $make_message);

        if (is_not_empty_array($make_message)) {
            foreach ( $make_message as &amp;$v ) {
                $message .= self::checkIflegalAndReturn($v);
            }
           
        }
       
        if (strlen($V_client_id) != 20 || Gateway::isOnline($V_client_id) != 1) {       //客户端错误
            return json_encode(['status' => -2]);
        }    
        $V_merchantInfo = Pmodel\Push::getVmerchantInfoByVid($V_uid);
        if (!is_not_empty_array($V_merchantInfo)) {                                     //商家信息不存在
            return json_encode(['status' => -1]);
        }
        require_once dirname(dirname(__FILE__)) . '/Events.php';

        $accIsOnline    = Gateway::isUidOnline('U_' . $toU_uid) == 1 ? 1 : 0;         //判读用户是否在线
        $message_type   = 1;
        //Log入库
        $insertId       = Pmodel\Push::addChatLog($toU_uid, 'V_' . $V_uid, $message, 1, 2, $accIsOnline);
        if ($insertId === false) {                                                  //入库失败（服务器故障）
            return json_encode(['status' => -3]);
        }
        $Worker = new \Events;
        $img_encrypt_code = encrypt_hopeband('Hp_(legal)', 'E', 'Hp_HopeBand_Chat_img');
        $message = str_replace($img_encrypt_code .' src=&quot;', $img_encrypt_code . &quot; src='&quot;, $message);
        $message = str_replace('&quot;>', &quot;'>&quot;, $message);
        $message_json   = '{&quot;type&quot;:&quot;send&quot;,&quot;toClientUid&quot;:&quot;U_' . $toU_uid . '&quot;,&quot;content&quot;:&quot;' . $message .'&quot;,&quot;Db_id&quot;: &quot;' . $insertId . '&quot;}';  
        $Worker::onMessage($client_id, $message_json);
        //成功返回相关数据
        return json_encode([
            'status'    => 1,
            'timeStamp' => time(),
            'timeStr'   => date('H:i:s'),
        ]);

    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code>class Push extends Base{

    protected static $user_headimage = '';
    protected static $uid = null;



    public function __construct () {
        parent::__construct();
        $this-&gt;checkUserLogin();
        //用户头像昵称等信息
        self::$uid            = session('userinfo.uid');
        $user_info            = Hmodel\User::getUserChatinfoById(self::$uid);
        self::$user_headimage = json_decode($user_info['headimgurl'],true)[0];

    }


    public function chatAction () {
        $product_id = intval(input('param.pid', 0, 'int'));
        $toMid      = Hmodel\Product::getMidByProductid($product_id);
        if ($toMid === false) notFund();

        $productHtml = $this-&gt;returnProductData2Html($product_id, 'default');

        $int_toMid = substr($toMid, 2);
        $V_headInfo = Pmodel\Push::getVmerchantHeadImageByVid($int_toMid);
        $V_headimage = is_not_empty_array($V_headInfo) ? json_decode($V_headInfo['headimgurl'])[0] :'/uploads/logo.png';

        if (substr($toMid, 0, 1) == 'V') {
            $chatLogData = Pmodel\Push::getChatlogByUseridAndVid(self::$uid, $int_toMid); 
            if (is_not_empty_array($chatLogData)) {
                $chatLog = self::chatlogData2Html($chatLogData, $V_headimage);
            }
        } elseif (substr($toMid, 0, 1) == 'E') {

        }


        $view = new View;
        $view-&gt;assign('pHtml', $productHtml);
        $view-&gt;assign('toMid', $toMid);
        $view-&gt;assign('pid', $product_id);
        $view-&gt;assign('chatlogHtml', $chatLog);
        $view-&gt;assign('role', 'user');
        $view-&gt;assign('user_image', self::$user_headimage);
        $view-&gt;assign('V_image', $V_headimage);
        return $view-&gt;fetch();
    }


      private static function chatlogData2Html ($data = [], $V_headimage = '') {
        $todayTimestamp = strtotime(date('Y-m-d'));
        $html = '';
        foreach ($data as $k =&gt; $v) {
            $date = $v['send_time'] &lt; $todayTimestamp ? date('Y/m/d H:i:s', $v['send_time']) : date('H:i:s', $v['send_time']);
            $time_nodes = '';
            if (($data[$k]['send_time'] - $data[$k-1]['send_time']) &gt; 180) {
                $time_nodes = '&lt;div style="clear:both;"&gt;&lt;/div&gt;&lt;p class="chat-history-date"&gt;' .$date.'&lt;/p&gt;';
            } 
            //sender-&gt;发送方   1:用户。2：商家
            if ($v['sender'] == 1) {
                
                //send_message_type-&gt;发送消息类型  (1:普通文本；2：商品链接)
                if ($v['send_message_type'] == 1) {
                    $html.= '&lt;div class="chat-sender"&gt;';
                    $html.= $time_nodes;
                    $html.= '&lt;div class="chat-avatar"&gt;&lt;img src="' . self::$user_headimage . '" alt=""&gt;&lt;/div&gt;';
                    $html.= '&lt;div class="chat-content"&gt;&lt;div class="chat-triangle"&gt;&lt;/div&gt;&lt;span&gt;' . $v['send_message'].'&lt;/span&gt;&lt;/div&gt;';
                    $html.= '&lt;/div&gt;';
                }elseif ($v['send_message_type'] == 2) {
                    $html.= $time_nodes;
                    $product_info = json_decode($v['send_message'],true);
                    $html.= self::productData2SendHtml($product_info);
                }elseif ($v['send_message_type'] == 3) {
                    $images_arr = json_decode($v['send_message'],true);
                  
                    $html.= '&lt;div class="chat-sender"&gt;';
                    $html.= $time_nodes;
                    $html.= '&lt;div class="chat-avatar"&gt;&lt;img src="' . self::$user_headimage . '" alt=""&gt;&lt;/div&gt;';
                    $html.= '&lt;div class="chat-content"&gt;&lt;div class="chat-triangle"&gt;&lt;/div&gt;';
                    foreach ($images_arr as $v ) {
                        $html.= '&lt;img src="' .WEB_SITE. '/' . $v . '" style="max-width:85%"&gt;';
                    }
                    $html.= '&lt;/div&gt;';
                    $html.= '&lt;/div&gt;';
                }
            }else {
                if ($v['send_message_type'] == 1) {
                    $html.= '&lt;div class="chat-receiver"&gt;';
                    $html.= '&lt;div class="chat-avatar"&gt;&lt;img src="' . $V_headimage . '" alt=""&gt;&lt;/div&gt;';
                    $html.= '&lt;div class="chat-content"&gt;&lt;div class="chat-triangle"&gt;&lt;/div&gt;&lt;span&gt;' . $v['send_message'].'&lt;/span&gt;&lt;/div&gt;';
                    $html.= '&lt;/div&gt;';
                }elseif ($v['send_message_type'] == 2) {

                }
            }
        }
        return $html;
    }
    public function BindUserClientIdAction () {
        if (!Request::instance()-&gt;isPost()) { notFund(); }
        $bindUserid = 'U_' . session('userinfo.uid');
        $client_id = input("param.client_id", 0, "string"); 
        // 设置GatewayWorker服务的Register服务ip和端口
        Gateway::$registerAddress = SOCKET_SERVER_PORT;
        // client_id与uid绑定
        // Gateway::closeClient($client_id);
        return Gateway::bindUid($client_id, $bindUserid);
}
//用户发送消息给商家
    public function SendMessageToMerchantAction () {
        if (!Request::instance()-&gt;isPost()) { notFund(); }
        $message   = $_POST['message']; 
        $toMid     = input('post.toMid', '' , 'string');
        $product_id= input('post.pid', 0, 'int');
        $client_id = input('post.client_id', '', 'string');
        $sendType  = input('post.sendType', '', 'string');



        if (!in_array($sendType,['link', 'message'])) {                             //客户端错误
            return json_encode(['status' =&gt; -1]);
        }
        if (strlen($client_id) != 20 ) {                                            //客户端错误
            return json_encode(['status' =&gt; -1]);
        }
        if (!is_not_empty_string($toMid) || !is_positive_integer($product_id)) {    //系统错误
            return json_encode(['status' =&gt; -2]);
        }
        $db_toMid      = Hmodel\Product::getMidByProductid($product_id);            //数据错误
        if ($db_toMid != $toMid) {
            return json_encode(['status' =&gt; -3]);
        }
        require_once dirname(dirname(__FILE__)) . '/Events.php';

        $uid            = session('userinfo.uid');
        $accIsOnline    = Gateway::isUidOnline($toMid) == 1 ? 1 : 0;                //判读商家是否在线
        $message_type   = 1;
        if ($sendType == 'link') {
            $message_type = 2;
            $productData = $this-&gt;referProductData($product_id);
            unset($productData['product_price']);
            unset($productData['score']);
            unset($productData['product_stock']);
            unset($productData['product_param']);
            unset($productData['product_desc']);
            unset($productData['product_main']);
            unset($productData['category_id']);
            unset($productData['merchant_id']);
            $message = json_encode($productData);
        }
        //Log入库
        $insertId       = Pmodel\Push::addChatLog($uid, $toMid, $message, $message_type, 1, $accIsOnline);
        if($message_type == 1){
            if(!is_numeric($message)){
                $message = '"'.$message.'"';
            }
            if ($message == '') {
                $message = '';
            }
        }
        if ($insertId === false) {                                                  //入库失败（服务器故障）
            return json_encode(['status' =&gt; -3]);
        }
        $Worker = new \Events;
        $message_json   = '{"type":"send","source":"U_' . $uid . '","toClientUid":"' . $toMid . '","content":' . $message .',
　　　　　　　　　　　　　　   "c_type": ' . $message_type .', "Db_id":' . $insertId . '}';

        $Worker::onMessage($client_id, $message_json);
        //成功返回相关数据
        return json_encode([
            'status'    =&gt; 1,
            'timeStamp' =&gt; time(),
            'timeStr'   =&gt; date('H:i:s'),
            'html'      =&gt; $message_type == 1 ? '' : self::productData2SendHtml($productData)
        ]);

 }
//商家发送信息给用户
    public function sendMessageToUserAction () {
     if (!Request::instance()-&gt;isPost()) { notFund(); }
        $post_message = is_not_empty_string($_POST['message']) ? $_POST['message'] : ''; 
        $toUserCode   = input('post.toUserCode', '' , 'string');
        $toU_uid      = encrypt_hopeband($toUserCode, 'D', 'xxxxx');
        $V_client_id  = input('post.client_id', '', 'string');
        $V_uid_code   = input('post.myCode', '', 'string');
        $V_uid        = encrypt_hopeband($V_uid_code, 'D', 'xxxxx');
        $make_message = [];
        $message = '';
        self::trimImageAndTextinfo2str($post_message, $make_message);

        if (is_not_empty_array($make_message)) {
            foreach ( $make_message as &amp;$v ) {
                $message .= self::checkIflegalAndReturn($v);
            }
           
        }
       
        if (strlen($V_client_id) != 20 || Gateway::isOnline($V_client_id) != 1) {       //客户端错误
            return json_encode(['status' =&gt; -2]);
        }    
        $V_merchantInfo = Pmodel\Push::getVmerchantInfoByVid($V_uid);
        if (!is_not_empty_array($V_merchantInfo)) {                                     //商家信息不存在
            return json_encode(['status' =&gt; -1]);
        }
        require_once dirname(dirname(__FILE__)) . '/Events.php';

        $accIsOnline    = Gateway::isUidOnline('U_' . $toU_uid) == 1 ? 1 : 0;         //判读用户是否在线
        $message_type   = 1;
        //Log入库
        $insertId       = Pmodel\Push::addChatLog($toU_uid, 'V_' . $V_uid, $message, 1, 2, $accIsOnline);
        if ($insertId === false) {                                                  //入库失败（服务器故障）
            return json_encode(['status' =&gt; -3]);
        }
        $Worker = new \Events;
        $img_encrypt_code = encrypt_hopeband('Hp_(legal)', 'E', 'Hp_HopeBand_Chat_img');
        $message = str_replace($img_encrypt_code .' src="', $img_encrypt_code . " src='", $message);
        $message = str_replace('"&gt;', "'&gt;", $message);
        $message_json   = '{"type":"send","toClientUid":"U_' . $toU_uid . '","content":"' . $message .'","Db_id": "' . $insertId . '"}';  
        $Worker::onMessage($client_id, $message_json);
        //成功返回相关数据
        return json_encode([
            'status'    =&gt; 1,
            'timeStamp' =&gt; time(),
            'timeStr'   =&gt; date('H:i:s'),
        ]);

    }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public function BindUserClientIdAction () {
        if (!Request::instance()->isPost()) { notFund(); }
        $bindUserid = 'U_' . session('userinfo.uid');
        $client_id = input(&quot;param.client_id&quot;, 0, &quot;string&quot;); 
        // 设置GatewayWorker服务的Register服务ip和端口
        Gateway::$registerAddress = SOCKET_SERVER_PORT;
        // client_id与uid绑定
        // Gateway::closeClient($client_id);
        return Gateway::bindUid($client_id, $bindUserid);
}
//用户发送消息给商家
    public function SendMessageToMerchantAction () {
        if (!Request::instance()->isPost()) { notFund(); }
        $message   = $_POST['message']; 
        $toMid     = input('post.toMid', '' , 'string');
        $product_id= input('post.pid', 0, 'int');
        $client_id = input('post.client_id', '', 'string');
        $sendType  = input('post.sendType', '', 'string');



        if (!in_array($sendType,['link', 'message'])) {                             //客户端错误
            return json_encode(['status' => -1]);
        }
        if (strlen($client_id) != 20 ) {                                            //客户端错误
            return json_encode(['status' => -1]);
        }
        if (!is_not_empty_string($toMid) || !is_positive_integer($product_id)) {    //系统错误
            return json_encode(['status' => -2]);
        }
        $db_toMid      = Hmodel\Product::getMidByProductid($product_id);            //数据错误
        if ($db_toMid != $toMid) {
            return json_encode(['status' => -3]);
        }
        require_once dirname(dirname(__FILE__)) . '/Events.php';

        $uid            = session('userinfo.uid');
        $accIsOnline    = Gateway::isUidOnline($toMid) == 1 ? 1 : 0;                //判读商家是否在线
        $message_type   = 1;
        if ($sendType == 'link') {
            $message_type = 2;
            $productData = $this->referProductData($product_id);
            unset($productData['product_price']);
            unset($productData['score']);
            unset($productData['product_stock']);
            unset($productData['product_param']);
            unset($productData['product_desc']);
            unset($productData['product_main']);
            unset($productData['category_id']);
            unset($productData['merchant_id']);
            $message = json_encode($productData);
        }
        //Log入库
        $insertId       = Pmodel\Push::addChatLog($uid, $toMid, $message, $message_type, 1, $accIsOnline);
        if($message_type == 1){
            if(!is_numeric($message)){
                $message = '&quot;'.$message.'&quot;';
            }
            if ($message == '') {
                $message = '';
            }
        }
        if ($insertId === false) {                                                  //入库失败（服务器故障）
            return json_encode(['status' => -3]);
        }
        $Worker = new \Events;
        $message_json   = '{&quot;type&quot;:&quot;send&quot;,&quot;source&quot;:&quot;U_' . $uid . '&quot;,&quot;toClientUid&quot;:&quot;' . $toMid . '&quot;,&quot;content&quot;:' . $message .',
　　　　　　　　　　　　　　   &quot;c_type&quot;: ' . $message_type .', &quot;Db_id&quot;:' . $insertId . '}';

        $Worker::onMessage($client_id, $message_json);
        //成功返回相关数据
        return json_encode([
            'status'    => 1,
            'timeStamp' => time(),
            'timeStr'   => date('H:i:s'),
            'html'      => $message_type == 1 ? '' : self::productData2SendHtml($productData)
        ]);

 }
//商家发送信息给用户
    public function sendMessageToUserAction () {
     if (!Request::instance()->isPost()) { notFund(); }
        $post_message = is_not_empty_string($_POST['message']) ? $_POST['message'] : ''; 
        $toUserCode   = input('post.toUserCode', '' , 'string');
        $toU_uid      = encrypt_hopeband($toUserCode, 'D', 'xxxxx');
        $V_client_id  = input('post.client_id', '', 'string');
        $V_uid_code   = input('post.myCode', '', 'string');
        $V_uid        = encrypt_hopeband($V_uid_code, 'D', 'xxxxx');
        $make_message = [];
        $message = '';
        self::trimImageAndTextinfo2str($post_message, $make_message);

        if (is_not_empty_array($make_message)) {
            foreach ( $make_message as &amp;$v ) {
                $message .= self::checkIflegalAndReturn($v);
            }
           
        }
       
        if (strlen($V_client_id) != 20 || Gateway::isOnline($V_client_id) != 1) {       //客户端错误
            return json_encode(['status' => -2]);
        }    
        $V_merchantInfo = Pmodel\Push::getVmerchantInfoByVid($V_uid);
        if (!is_not_empty_array($V_merchantInfo)) {                                     //商家信息不存在
            return json_encode(['status' => -1]);
        }
        require_once dirname(dirname(__FILE__)) . '/Events.php';

        $accIsOnline    = Gateway::isUidOnline('U_' . $toU_uid) == 1 ? 1 : 0;         //判读用户是否在线
        $message_type   = 1;
        //Log入库
        $insertId       = Pmodel\Push::addChatLog($toU_uid, 'V_' . $V_uid, $message, 1, 2, $accIsOnline);
        if ($insertId === false) {                                                  //入库失败（服务器故障）
            return json_encode(['status' => -3]);
        }
        $Worker = new \Events;
        $img_encrypt_code = encrypt_hopeband('Hp_(legal)', 'E', 'Hp_HopeBand_Chat_img');
        $message = str_replace($img_encrypt_code .' src=&quot;', $img_encrypt_code . &quot; src='&quot;, $message);
        $message = str_replace('&quot;>', &quot;'>&quot;, $message);
        $message_json   = '{&quot;type&quot;:&quot;send&quot;,&quot;toClientUid&quot;:&quot;U_' . $toU_uid . '&quot;,&quot;content&quot;:&quot;' . $message .'&quot;,&quot;Db_id&quot;: &quot;' . $insertId . '&quot;}';  
        $Worker::onMessage($client_id, $message_json);
        //成功返回相关数据
        return json_encode([
            'status'    => 1,
            'timeStamp' => time(),
            'timeStr'   => date('H:i:s'),
        ]);

    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">BindUserClientIdAction</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">if</span> (!Request::instance()-&gt;isPost()) { notFund(); }
        $bindUserid = <span class="hljs-string">'U_'</span> . session(<span class="hljs-string">'userinfo.uid'</span>);
        $client_id = input(<span class="hljs-string">"param.client_id"</span>, <span class="hljs-number">0</span>, <span class="hljs-string">"string"</span>); 
        <span class="hljs-comment">// 设置GatewayWorker服务的Register服务ip和端口</span>
        Gateway::$registerAddress = SOCKET_SERVER_PORT;
        <span class="hljs-comment">// client_id与uid绑定</span>
        <span class="hljs-comment">// Gateway::closeClient($client_id);</span>
        <span class="hljs-keyword">return</span> Gateway::bindUid($client_id, $bindUserid);
}
<span class="hljs-comment">//用户发送消息给商家</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SendMessageToMerchantAction</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">if</span> (!Request::instance()-&gt;isPost()) { notFund(); }
        $message   = $_POST[<span class="hljs-string">'message'</span>]; 
        $toMid     = input(<span class="hljs-string">'post.toMid'</span>, <span class="hljs-string">''</span> , <span class="hljs-string">'string'</span>);
        $product_id= input(<span class="hljs-string">'post.pid'</span>, <span class="hljs-number">0</span>, <span class="hljs-string">'int'</span>);
        $client_id = input(<span class="hljs-string">'post.client_id'</span>, <span class="hljs-string">''</span>, <span class="hljs-string">'string'</span>);
        $sendType  = input(<span class="hljs-string">'post.sendType'</span>, <span class="hljs-string">''</span>, <span class="hljs-string">'string'</span>);



        <span class="hljs-keyword">if</span> (!in_array($sendType,[<span class="hljs-string">'link'</span>, <span class="hljs-string">'message'</span>])) {                             <span class="hljs-comment">//客户端错误</span>
            <span class="hljs-keyword">return</span> json_encode([<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">-1</span>]);
        }
        <span class="hljs-keyword">if</span> (strlen($client_id) != <span class="hljs-number">20</span> ) {                                            <span class="hljs-comment">//客户端错误</span>
            <span class="hljs-keyword">return</span> json_encode([<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">-1</span>]);
        }
        <span class="hljs-keyword">if</span> (!is_not_empty_string($toMid) || !is_positive_integer($product_id)) {    <span class="hljs-comment">//系统错误</span>
            <span class="hljs-keyword">return</span> json_encode([<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">-2</span>]);
        }
        $db_toMid      = Hmodel\Product::getMidByProductid($product_id);            <span class="hljs-comment">//数据错误</span>
        <span class="hljs-keyword">if</span> ($db_toMid != $toMid) {
            <span class="hljs-keyword">return</span> json_encode([<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">-3</span>]);
        }
        <span class="hljs-keyword">require_once</span> dirname(dirname(<span class="hljs-keyword">__FILE__</span>)) . <span class="hljs-string">'/Events.php'</span>;

        $uid            = session(<span class="hljs-string">'userinfo.uid'</span>);
        $accIsOnline    = Gateway::isUidOnline($toMid) == <span class="hljs-number">1</span> ? <span class="hljs-number">1</span> : <span class="hljs-number">0</span>;                <span class="hljs-comment">//判读商家是否在线</span>
        $message_type   = <span class="hljs-number">1</span>;
        <span class="hljs-keyword">if</span> ($sendType == <span class="hljs-string">'link'</span>) {
            $message_type = <span class="hljs-number">2</span>;
            $productData = <span class="hljs-keyword">$this</span>-&gt;referProductData($product_id);
            <span class="hljs-keyword">unset</span>($productData[<span class="hljs-string">'product_price'</span>]);
            <span class="hljs-keyword">unset</span>($productData[<span class="hljs-string">'score'</span>]);
            <span class="hljs-keyword">unset</span>($productData[<span class="hljs-string">'product_stock'</span>]);
            <span class="hljs-keyword">unset</span>($productData[<span class="hljs-string">'product_param'</span>]);
            <span class="hljs-keyword">unset</span>($productData[<span class="hljs-string">'product_desc'</span>]);
            <span class="hljs-keyword">unset</span>($productData[<span class="hljs-string">'product_main'</span>]);
            <span class="hljs-keyword">unset</span>($productData[<span class="hljs-string">'category_id'</span>]);
            <span class="hljs-keyword">unset</span>($productData[<span class="hljs-string">'merchant_id'</span>]);
            $message = json_encode($productData);
        }
        <span class="hljs-comment">//Log入库</span>
        $insertId       = Pmodel\Push::addChatLog($uid, $toMid, $message, $message_type, <span class="hljs-number">1</span>, $accIsOnline);
        <span class="hljs-keyword">if</span>($message_type == <span class="hljs-number">1</span>){
            <span class="hljs-keyword">if</span>(!is_numeric($message)){
                $message = <span class="hljs-string">'"'</span>.$message.<span class="hljs-string">'"'</span>;
            }
            <span class="hljs-keyword">if</span> ($message == <span class="hljs-string">''</span>) {
                $message = <span class="hljs-string">''</span>;
            }
        }
        <span class="hljs-keyword">if</span> ($insertId === <span class="hljs-keyword">false</span>) {                                                  <span class="hljs-comment">//入库失败（服务器故障）</span>
            <span class="hljs-keyword">return</span> json_encode([<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">-3</span>]);
        }
        $Worker = <span class="hljs-keyword">new</span> \Events;
        $message_json   = <span class="hljs-string">'{"type":"send","source":"U_'</span> . $uid . <span class="hljs-string">'","toClientUid":"'</span> . $toMid . <span class="hljs-string">'","content":'</span> . $message .<span class="hljs-string">',
　　　　　　　　　　　　　　   "c_type": '</span> . $message_type .<span class="hljs-string">', "Db_id":'</span> . $insertId . <span class="hljs-string">'}'</span>;

        $Worker::onMessage($client_id, $message_json);
        <span class="hljs-comment">//成功返回相关数据</span>
        <span class="hljs-keyword">return</span> json_encode([
            <span class="hljs-string">'status'</span>    =&gt; <span class="hljs-number">1</span>,
            <span class="hljs-string">'timeStamp'</span> =&gt; time(),
            <span class="hljs-string">'timeStr'</span>   =&gt; date(<span class="hljs-string">'H:i:s'</span>),
            <span class="hljs-string">'html'</span>      =&gt; $message_type == <span class="hljs-number">1</span> ? <span class="hljs-string">''</span> : <span class="hljs-keyword">self</span>::productData2SendHtml($productData)
        ]);

 }
<span class="hljs-comment">//商家发送信息给用户</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sendMessageToUserAction</span> <span class="hljs-params">()</span> </span>{
     <span class="hljs-keyword">if</span> (!Request::instance()-&gt;isPost()) { notFund(); }
        $post_message = is_not_empty_string($_POST[<span class="hljs-string">'message'</span>]) ? $_POST[<span class="hljs-string">'message'</span>] : <span class="hljs-string">''</span>; 
        $toUserCode   = input(<span class="hljs-string">'post.toUserCode'</span>, <span class="hljs-string">''</span> , <span class="hljs-string">'string'</span>);
        $toU_uid      = encrypt_hopeband($toUserCode, <span class="hljs-string">'D'</span>, <span class="hljs-string">'xxxxx'</span>);
        $V_client_id  = input(<span class="hljs-string">'post.client_id'</span>, <span class="hljs-string">''</span>, <span class="hljs-string">'string'</span>);
        $V_uid_code   = input(<span class="hljs-string">'post.myCode'</span>, <span class="hljs-string">''</span>, <span class="hljs-string">'string'</span>);
        $V_uid        = encrypt_hopeband($V_uid_code, <span class="hljs-string">'D'</span>, <span class="hljs-string">'xxxxx'</span>);
        $make_message = [];
        $message = <span class="hljs-string">''</span>;
        <span class="hljs-keyword">self</span>::trimImageAndTextinfo2str($post_message, $make_message);

        <span class="hljs-keyword">if</span> (is_not_empty_array($make_message)) {
            <span class="hljs-keyword">foreach</span> ( $make_message <span class="hljs-keyword">as</span> &amp;$v ) {
                $message .= <span class="hljs-keyword">self</span>::checkIflegalAndReturn($v);
            }
           
        }
       
        <span class="hljs-keyword">if</span> (strlen($V_client_id) != <span class="hljs-number">20</span> || Gateway::isOnline($V_client_id) != <span class="hljs-number">1</span>) {       <span class="hljs-comment">//客户端错误</span>
            <span class="hljs-keyword">return</span> json_encode([<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">-2</span>]);
        }    
        $V_merchantInfo = Pmodel\Push::getVmerchantInfoByVid($V_uid);
        <span class="hljs-keyword">if</span> (!is_not_empty_array($V_merchantInfo)) {                                     <span class="hljs-comment">//商家信息不存在</span>
            <span class="hljs-keyword">return</span> json_encode([<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">-1</span>]);
        }
        <span class="hljs-keyword">require_once</span> dirname(dirname(<span class="hljs-keyword">__FILE__</span>)) . <span class="hljs-string">'/Events.php'</span>;

        $accIsOnline    = Gateway::isUidOnline(<span class="hljs-string">'U_'</span> . $toU_uid) == <span class="hljs-number">1</span> ? <span class="hljs-number">1</span> : <span class="hljs-number">0</span>;         <span class="hljs-comment">//判读用户是否在线</span>
        $message_type   = <span class="hljs-number">1</span>;
        <span class="hljs-comment">//Log入库</span>
        $insertId       = Pmodel\Push::addChatLog($toU_uid, <span class="hljs-string">'V_'</span> . $V_uid, $message, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, $accIsOnline);
        <span class="hljs-keyword">if</span> ($insertId === <span class="hljs-keyword">false</span>) {                                                  <span class="hljs-comment">//入库失败（服务器故障）</span>
            <span class="hljs-keyword">return</span> json_encode([<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">-3</span>]);
        }
        $Worker = <span class="hljs-keyword">new</span> \Events;
        $img_encrypt_code = encrypt_hopeband(<span class="hljs-string">'Hp_(legal)'</span>, <span class="hljs-string">'E'</span>, <span class="hljs-string">'Hp_HopeBand_Chat_img'</span>);
        $message = str_replace($img_encrypt_code .<span class="hljs-string">' src="'</span>, $img_encrypt_code . <span class="hljs-string">" src='"</span>, $message);
        $message = str_replace(<span class="hljs-string">'"&gt;'</span>, <span class="hljs-string">"'&gt;"</span>, $message);
        $message_json   = <span class="hljs-string">'{"type":"send","toClientUid":"U_'</span> . $toU_uid . <span class="hljs-string">'","content":"'</span> . $message .<span class="hljs-string">'","Db_id": "'</span> . $insertId . <span class="hljs-string">'"}'</span>;  
        $Worker::onMessage($client_id, $message_json);
        <span class="hljs-comment">//成功返回相关数据</span>
        <span class="hljs-keyword">return</span> json_encode([
            <span class="hljs-string">'status'</span>    =&gt; <span class="hljs-number">1</span>,
            <span class="hljs-string">'timeStamp'</span> =&gt; time(),
            <span class="hljs-string">'timeStr'</span>   =&gt; date(<span class="hljs-string">'H:i:s'</span>),
        ]);

    }</code></pre>
<p>额外还有一些关于消息处理方面的；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//验证是否是否是图片，如果是并且返回图片地址，否则返回字符串
    private static function checkIflegalAndReturn ( $message = '') {
        header('content-type:text/html; charset=utf-8');
        $img_encrypt_code = encrypt_hopeband('Hp_(legal)', 'E', 'Hp_HopeBand_Chat_img');
        if (substr($message, 0, 21) != '<img src=&quot;data:image/' || substr($message, strpos($message, ';', 0) ,8) != ';base64,' || 
            substr($message, -2, 2) != '&quot;>') {
            return $message;
        }
        $preg = '/<img.*?src=&quot;(.*?)&quot;.*?>/is';
        preg_match( $preg, $message,$arr);
        $img_src = self::base64_upload($arr[1]);
        return '<img '.$img_encrypt_code.' src=&quot;' . $img_src . '&quot;>';
    }

    //把接受到的消息文本和图片有序提出并解析
    private static function trimImageAndTextinfo2str ($message = '', &amp;$message_arr = []) {
        if (!is_not_empty_string($message)) return '';
        $img_start_code = '<img src=&quot;data:image/';
        $img_end_code = '&quot;>';
        $tmp_message = strlen($message);
        $initial     = substr($message,0,strlen($img_start_code));
   
        if ($initial == $img_start_code) {
            $start = strpos($message, $img_start_code, 0); 
            $end   = strpos($message, $img_end_code , 0); 
            $message_arr[] = substr($message, 0, $end + 2);
            $message = substr($message, $end + 2);
        }else{
            $start = strpos($message, $img_start_code);
            if ($start !== false) {
                $message_arr[] = substr($message, 0, $start);
                $message = substr($message, $start);
            }else{
                //防止xss攻击
                $message_arr[]= string_remove_xss(htmlspecialchars_decode($message));
            }
        }
        if (($tmp_message) != strlen($message) &amp;&amp; is_not_empty_string($message)) {
            self::trimImageAndTextinfo2str($message, $message_arr);
        }
      return $message_arr;

    }

    private static function base64_upload($base64 = '') {
    $base64_image = str_replace(' ', '+', $base64);
    if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image, $result)){
        if($result[2] == 'jpeg'){
            $image_name = getCode(16,4).'.jpg';
        }else{
            $image_name = getCode(16,4).'.'.$result[2];
        }
        $image_file = &quot;./upload/chat&quot;.'/'.date('Y').'/'.date('m').'/'.date('d').'/'.$image_name;    //服务器文件存储路径
        //判断文件路径是否存在
        $path = &quot;./upload/chat&quot;.'/'.date('Y').'/'.date('m').'/'.date('d').'/';
        is_dir($path) or mkdir($path,0777,true);
        if (file_put_contents($image_file, base64_decode(str_replace($result[1], '', $base64_image)))){
            return $image_file;
        }else{
            return false;
        }
    }else{
        return false;
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">//验证是否是否是图片，如果是并且返回图片地址，否则返回字符串</span>
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkIflegalAndReturn</span> <span class="hljs-params">( $message = <span class="hljs-string">''</span>)</span> </span>{
        header(<span class="hljs-string">'content-type:text/html; charset=utf-8'</span>);
        $img_encrypt_code = encrypt_hopeband(<span class="hljs-string">'Hp_(legal)'</span>, <span class="hljs-string">'E'</span>, <span class="hljs-string">'Hp_HopeBand_Chat_img'</span>);
        <span class="hljs-keyword">if</span> (substr($message, <span class="hljs-number">0</span>, <span class="hljs-number">21</span>) != <span class="hljs-string">'&lt;img src="data:image/'</span> || substr($message, strpos($message, <span class="hljs-string">';'</span>, <span class="hljs-number">0</span>) ,<span class="hljs-number">8</span>) != <span class="hljs-string">';base64,'</span> || 
            substr($message, <span class="hljs-number">-2</span>, <span class="hljs-number">2</span>) != <span class="hljs-string">'"&gt;'</span>) {
            <span class="hljs-keyword">return</span> $message;
        }
        $preg = <span class="hljs-string">'/&lt;img.*?src="(.*?)".*?&gt;/is'</span>;
        preg_match( $preg, $message,$arr);
        $img_src = <span class="hljs-keyword">self</span>::base64_upload($arr[<span class="hljs-number">1</span>]);
        <span class="hljs-keyword">return</span> <span class="hljs-string">'&lt;img '</span>.$img_encrypt_code.<span class="hljs-string">' src="'</span> . $img_src . <span class="hljs-string">'"&gt;'</span>;
    }

    <span class="hljs-comment">//把接受到的消息文本和图片有序提出并解析</span>
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">trimImageAndTextinfo2str</span> <span class="hljs-params">($message = <span class="hljs-string">''</span>, &amp;$message_arr = [])</span> </span>{
        <span class="hljs-keyword">if</span> (!is_not_empty_string($message)) <span class="hljs-keyword">return</span> <span class="hljs-string">''</span>;
        $img_start_code = <span class="hljs-string">'&lt;img src="data:image/'</span>;
        $img_end_code = <span class="hljs-string">'"&gt;'</span>;
        $tmp_message = strlen($message);
        $initial     = substr($message,<span class="hljs-number">0</span>,strlen($img_start_code));
   
        <span class="hljs-keyword">if</span> ($initial == $img_start_code) {
            $start = strpos($message, $img_start_code, <span class="hljs-number">0</span>); 
            $end   = strpos($message, $img_end_code , <span class="hljs-number">0</span>); 
            $message_arr[] = substr($message, <span class="hljs-number">0</span>, $end + <span class="hljs-number">2</span>);
            $message = substr($message, $end + <span class="hljs-number">2</span>);
        }<span class="hljs-keyword">else</span>{
            $start = strpos($message, $img_start_code);
            <span class="hljs-keyword">if</span> ($start !== <span class="hljs-keyword">false</span>) {
                $message_arr[] = substr($message, <span class="hljs-number">0</span>, $start);
                $message = substr($message, $start);
            }<span class="hljs-keyword">else</span>{
                <span class="hljs-comment">//防止xss攻击</span>
                $message_arr[]= string_remove_xss(htmlspecialchars_decode($message));
            }
        }
        <span class="hljs-keyword">if</span> (($tmp_message) != strlen($message) &amp;&amp; is_not_empty_string($message)) {
            <span class="hljs-keyword">self</span>::trimImageAndTextinfo2str($message, $message_arr);
        }
      <span class="hljs-keyword">return</span> $message_arr;

    }

    <span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">base64_upload</span><span class="hljs-params">($base64 = <span class="hljs-string">''</span>)</span> </span>{
    $base64_image = str_replace(<span class="hljs-string">' '</span>, <span class="hljs-string">'+'</span>, $base64);
    <span class="hljs-keyword">if</span> (preg_match(<span class="hljs-string">'/^(data:\s*image\/(\w+);base64,)/'</span>, $base64_image, $result)){
        <span class="hljs-keyword">if</span>($result[<span class="hljs-number">2</span>] == <span class="hljs-string">'jpeg'</span>){
            $image_name = getCode(<span class="hljs-number">16</span>,<span class="hljs-number">4</span>).<span class="hljs-string">'.jpg'</span>;
        }<span class="hljs-keyword">else</span>{
            $image_name = getCode(<span class="hljs-number">16</span>,<span class="hljs-number">4</span>).<span class="hljs-string">'.'</span>.$result[<span class="hljs-number">2</span>];
        }
        $image_file = <span class="hljs-string">"./upload/chat"</span>.<span class="hljs-string">'/'</span>.date(<span class="hljs-string">'Y'</span>).<span class="hljs-string">'/'</span>.date(<span class="hljs-string">'m'</span>).<span class="hljs-string">'/'</span>.date(<span class="hljs-string">'d'</span>).<span class="hljs-string">'/'</span>.$image_name;    <span class="hljs-comment">//服务器文件存储路径</span>
        <span class="hljs-comment">//判断文件路径是否存在</span>
        $path = <span class="hljs-string">"./upload/chat"</span>.<span class="hljs-string">'/'</span>.date(<span class="hljs-string">'Y'</span>).<span class="hljs-string">'/'</span>.date(<span class="hljs-string">'m'</span>).<span class="hljs-string">'/'</span>.date(<span class="hljs-string">'d'</span>).<span class="hljs-string">'/'</span>;
        is_dir($path) <span class="hljs-keyword">or</span> mkdir($path,<span class="hljs-number">0777</span>,<span class="hljs-keyword">true</span>);
        <span class="hljs-keyword">if</span> (file_put_contents($image_file, base64_decode(str_replace($result[<span class="hljs-number">1</span>], <span class="hljs-string">''</span>, $base64_image)))){
            <span class="hljs-keyword">return</span> $image_file;
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>;
        }
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>;
    }
  }</code></pre>
<p>微信的图片上传</p>
<p>JS部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 退款选择图片 -------- start */
        
$(&quot;#chooseImage&quot;).click(function()
{
                
                wx.chooseImage(
                {
                    count: 9,                                 // 默认9
                    sizeType: ['original','compressed'],     // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'],         // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res)
                    {
                           images.localId = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片                       
                            //for(var j = 0;j<images.localId.length;j++)
                              // {                      
                                    // var str = '<div serverId='+images.serverId[j]+' class=&quot;chat-sender&quot;><div class=&quot;chat-avatar&quot;>
　　　　　　　　　　　　　　　　　　　　  //<img src=&quot;/home/push/img/1.png&quot; alt=&quot;&quot;>
　　　　　　　　　　　　　　　　　　     //</div><div class=&quot;chat-content&quot;><div class=&quot;chat-triangle&quot;></div>
　　　　　　　　　　　　　　　　　　　　  //<img src='+images.localId[j]+' data-originalDrawing-src='+images.localId[j]+' data-preview-src=&quot;&quot; data-preview-group=&quot;1&quot;/></div></div>'
                                    // $(&quot;#main&quot;).append(str);
                                   
                              // }
                           var t = 0;
                        var i = 0, length = images.localId.length;
                        images.serverId = [];

                        /* upload 方法 -------- start */
                        function upload()
                        {
                              wx.uploadImage(
                              {
                                localId: images.localId[i],
                                success: function (res)
                                {
                                      i++;

                                      images.serverId.push(res.serverId);

                                      if (i < length) { upload(); }
                                 
                                      var str = '<div serverId='+res.serverId+' class=&quot;chat-sender&quot;><div class=&quot;chat-avatar&quot;>
　　　　　　　　　　　　　　　　　　　　　　　　       <img src=&quot;/home/push/img/1.png&quot; alt=&quot;&quot;>
　　　　　　　　　　　　　　　　　　　　　　　　　　　　</div><div class=&quot;chat-content&quot;><div class=&quot;chat-triangle&quot;></div>
　　　　　　　　　　　　　　　　　　　　　　　　       <img src='+images.localId[i-1]+' data-originalDrawing-src='+images.localId[i-1]+' data-preview-src=&quot;&quot; data-preview-group=&quot;1&quot;/>
　　　　　　　　　　　　　　　　　　　　　　　　　　  </div></div>'
                                   $(&quot;#main&quot;).append(str);

                                   if(i >= length )    uploadImageToDb(images.serverId);

                                  
                                },
                                fail: function (res){ }
                              });

                        }
                        /* upload 方法 -------- end */

                        upload();
                        

                    }
                })
            });

            function uploadImageToDb(images){
                var str = &quot;&quot;;
                var upUrl = &quot;http://xxxxxx.com/push/push/uploadImgage&quot;;
                var toMid     = $('#toMid').val();
                  var client_id = $('#client_id').val();
                $.post(upUrl,{images:images,toMid:toMid,client_id:client_id},function(data){
                    if(data == 1){
                        for(var n = 0 ; n < $(&quot;.chat-sender&quot;).length ; n++){
                            str = $(&quot;.chat-sender&quot;).eq(n).attr(&quot;serverId&quot;)+&quot;,&quot;;
                            for(var z=0;z<data.length;z++){
                                if(data[z] == str){
                                    $(&quot;.chat-sender&quot;).eq(n).find(&quot;.chat-content&quot;).append('<div class=&quot;chat-sender&quot;>上传失败</div>');
                                }
                            }
                        }
                    
                    }
                    
                    
                })
            }
            /* 退款选择图片 -------- end */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">/* 退款选择图片 -------- start */</span>
        
$(<span class="hljs-string">"#chooseImage"</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span>
</span>{
                
                wx.chooseImage(
                {
                    count: <span class="hljs-number">9</span>,                                 <span class="hljs-comment">// 默认9</span>
                    sizeType: [<span class="hljs-string">'original'</span>,<span class="hljs-string">'compressed'</span>],     <span class="hljs-comment">// 可以指定是原图还是压缩图，默认二者都有</span>
                    sourceType: [<span class="hljs-string">'album'</span>, <span class="hljs-string">'camera'</span>],         <span class="hljs-comment">// 可以指定来源是相册还是相机，默认二者都有</span>
                    success: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(res)</span>
                    </span>{
                           images.localId = res.localIds; <span class="hljs-comment">// 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片                       </span>
                            <span class="hljs-comment">//for(var j = 0;j&lt;images.localId.length;j++)</span>
                              <span class="hljs-comment">// {                      </span>
                                    <span class="hljs-comment">// var str = '&lt;div serverId='+images.serverId[j]+' class="chat-sender"&gt;&lt;div class="chat-avatar"&gt;</span>
　　　　　　　　　　　　　　　　　　　　  <span class="hljs-comment">//&lt;img src="/home/push/img/1.png" alt=""&gt;</span>
　　　　　　　　　　　　　　　　　　     <span class="hljs-comment">//&lt;/div&gt;&lt;div class="chat-content"&gt;&lt;div class="chat-triangle"&gt;&lt;/div&gt;</span>
　　　　　　　　　　　　　　　　　　　　  <span class="hljs-comment">//&lt;img src='+images.localId[j]+' data-originalDrawing-src='+images.localId[j]+' data-preview-src="" data-preview-group="1"/&gt;&lt;/div&gt;&lt;/div&gt;'</span>
                                    <span class="hljs-comment">// $("#main").append(str);</span>
                                   
                              <span class="hljs-comment">// }</span>
                           <span class="hljs-keyword">var</span> t = <span class="hljs-number">0</span>;
                        <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, length = images.localId.length;
                        images.serverId = [];

                        <span class="hljs-comment">/* upload 方法 -------- start */</span>
                        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">upload</span><span class="hljs-params">()</span>
                        </span>{
                              wx.uploadImage(
                              {
                                localId: images.localId[i],
                                success: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(res)</span>
                                </span>{
                                      i++;

                                      images.serverId.push(res.serverId);

                                      <span class="hljs-keyword">if</span> (i &lt; length) { upload(); }
                                 
                                      <span class="hljs-keyword">var</span> str = <span class="hljs-string">'&lt;div serverId='</span>+res.serverId+<span class="hljs-string">' class="chat-sender"&gt;&lt;div class="chat-avatar"&gt;
　　　　　　　　　　　　　　　　　　　　　　　　       &lt;img src="/home/push/img/1.png" alt=""&gt;
　　　　　　　　　　　　　　　　　　　　　　　　　　　　&lt;/div&gt;&lt;div class="chat-content"&gt;&lt;div class="chat-triangle"&gt;&lt;/div&gt;
　　　　　　　　　　　　　　　　　　　　　　　　       &lt;img src='</span>+images.localId[i<span class="hljs-number">-1</span>]+<span class="hljs-string">' data-originalDrawing-src='</span>+images.localId[i<span class="hljs-number">-1</span>]+<span class="hljs-string">' data-preview-src="" data-preview-group="1"/&gt;
　　　　　　　　　　　　　　　　　　　　　　　　　　  &lt;/div&gt;&lt;/div&gt;'</span>
                                   $(<span class="hljs-string">"#main"</span>).append(str);

                                   <span class="hljs-keyword">if</span>(i &gt;= length )    uploadImageToDb(images.serverId);

                                  
                                },
                                fail: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(res)</span></span>{ }
                              });

                        }
                        <span class="hljs-comment">/* upload 方法 -------- end */</span>

                        upload();
                        

                    }
                })
            });

            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">uploadImageToDb</span><span class="hljs-params">(images)</span></span>{
                <span class="hljs-keyword">var</span> str = <span class="hljs-string">""</span>;
                <span class="hljs-keyword">var</span> upUrl = <span class="hljs-string">"http://xxxxxx.com/push/push/uploadImgage"</span>;
                <span class="hljs-keyword">var</span> toMid     = $(<span class="hljs-string">'#toMid'</span>).val();
                  <span class="hljs-keyword">var</span> client_id = $(<span class="hljs-string">'#client_id'</span>).val();
                $.post(upUrl,{images:images,toMid:toMid,client_id:client_id},<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(data)</span></span>{
                    <span class="hljs-keyword">if</span>(data == <span class="hljs-number">1</span>){
                        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> n = <span class="hljs-number">0</span> ; n &lt; $(<span class="hljs-string">".chat-sender"</span>).length ; n++){
                            str = $(<span class="hljs-string">".chat-sender"</span>).eq(n).attr(<span class="hljs-string">"serverId"</span>)+<span class="hljs-string">","</span>;
                            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> z=<span class="hljs-number">0</span>;z&lt;data.length;z++){
                                <span class="hljs-keyword">if</span>(data[z] == str){
                                    $(<span class="hljs-string">".chat-sender"</span>).eq(n).find(<span class="hljs-string">".chat-content"</span>).append(<span class="hljs-string">'&lt;div class="chat-sender"&gt;上传失败&lt;/div&gt;'</span>);
                                }
                            }
                        }
                    
                    }
                    
                    
                })
            }
            <span class="hljs-comment">/* 退款选择图片 -------- end */</span></code></pre>
<p>后台部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//微信上传图片
    public function uploadImgageAction () {
        if (!Request::instance()->isPost()) { notFund(); }
        $images    = $_POST['images'];
        if (empty($images)) die;
        $toMid     = input('post.toMid', '' , 'string');
        $client_id = input('post.client_id', '', 'string');
        if (strlen($client_id) != 20 ) {                                            //客户端错误
            return json_encode(['status' => -1]);
        }
        if (!is_not_empty_string($toMid)) {                                         //系统错误
            return json_encode(['status' => -2]);
        }

        require_once dirname(dirname(__FILE__)) . '/Events.php';
 
        $accIsOnline    = Gateway::isUidOnline($toMid) == 1 ? 1 : 0;                //判读商家是否在线
        $message_type   = 3;
        //微信上传图片处理Start
        $res = json_decode(file_get_contents(&quot;access_token.json&quot;));
        foreach ($res as $key => $value) {
            if($key == 'access_token'){
                $access_token = $value;
            }
        }
        $data = [];
        foreach ($images as $k => $v) {
            $str = date('YmdHis').rand(1000,9999).'.jpg';
            $targetName = './upload/chat/'.$str;
            if (!file_exists(&quot;./upload/chat/&quot;)) {
              mkdir(&quot;./upload/chat/&quot;, 0777, true);
            }
            $ch = curl_init(&quot;http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=&quot;.$access_token.&quot;&amp;media_id=&quot;.$v);
            $fp = fopen($targetName, 'wb');
            curl_setopt($ch, CURLOPT_FILE, $fp);
            curl_setopt($ch, CURLOPT_HEADER, 0);
            $msg[&quot;status&quot;] = curl_exec($ch);
            $msg[&quot;filename&quot;] = $str;
            curl_close($ch);
            fclose($fp);
            $data[] = $targetName;
        }
        //微信上传图片处理End
        if (!is_not_empty_array($data)) {                                       //微信服务器端图片上传错误
            return json_encode(['status' => -2]); 
        }
        $message = json_encode($data);
        //Log入库
        $insertId       = Pmodel\Push::addChatLog(self::$uid, $toMid, $message, $message_type, 1, $accIsOnline);
        if ($insertId === false) {                                                  //入库失败（服务器故障）
            return json_encode(['status' => -3]);
        }
        $Worker = new \Events;
        $message_json   = '{&quot;type&quot;:&quot;send&quot;,&quot;source&quot;:&quot;U_' . self::$uid . '&quot;,&quot;toClientUid&quot;:&quot;' . $toMid . '&quot;,&quot;content&quot;:' . $message .',
　　　　　　　　　　　　　　  &quot;c_type&quot;: ' . $message_type .', &quot;Db_id&quot;:' . $insertId . '}';
        $Worker::onMessage($client_id, $message_json);
        //成功返回相关数据
        return json_encode([
            'status'    => 1,
            'timeStamp' => time(),
            'timeStr'   => date('H:i:s')
        ]);

    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">//微信上传图片</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">uploadImgageAction</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">if</span> (!Request::instance()-&gt;isPost()) { notFund(); }
        $images    = $_POST[<span class="hljs-string">'images'</span>];
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">empty</span>($images)) <span class="hljs-keyword">die</span>;
        $toMid     = input(<span class="hljs-string">'post.toMid'</span>, <span class="hljs-string">''</span> , <span class="hljs-string">'string'</span>);
        $client_id = input(<span class="hljs-string">'post.client_id'</span>, <span class="hljs-string">''</span>, <span class="hljs-string">'string'</span>);
        <span class="hljs-keyword">if</span> (strlen($client_id) != <span class="hljs-number">20</span> ) {                                            <span class="hljs-comment">//客户端错误</span>
            <span class="hljs-keyword">return</span> json_encode([<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">-1</span>]);
        }
        <span class="hljs-keyword">if</span> (!is_not_empty_string($toMid)) {                                         <span class="hljs-comment">//系统错误</span>
            <span class="hljs-keyword">return</span> json_encode([<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">-2</span>]);
        }

        <span class="hljs-keyword">require_once</span> dirname(dirname(<span class="hljs-keyword">__FILE__</span>)) . <span class="hljs-string">'/Events.php'</span>;
 
        $accIsOnline    = Gateway::isUidOnline($toMid) == <span class="hljs-number">1</span> ? <span class="hljs-number">1</span> : <span class="hljs-number">0</span>;                <span class="hljs-comment">//判读商家是否在线</span>
        $message_type   = <span class="hljs-number">3</span>;
        <span class="hljs-comment">//微信上传图片处理Start</span>
        $res = json_decode(file_get_contents(<span class="hljs-string">"access_token.json"</span>));
        <span class="hljs-keyword">foreach</span> ($res <span class="hljs-keyword">as</span> $key =&gt; $value) {
            <span class="hljs-keyword">if</span>($key == <span class="hljs-string">'access_token'</span>){
                $access_token = $value;
            }
        }
        $data = [];
        <span class="hljs-keyword">foreach</span> ($images <span class="hljs-keyword">as</span> $k =&gt; $v) {
            $str = date(<span class="hljs-string">'YmdHis'</span>).rand(<span class="hljs-number">1000</span>,<span class="hljs-number">9999</span>).<span class="hljs-string">'.jpg'</span>;
            $targetName = <span class="hljs-string">'./upload/chat/'</span>.$str;
            <span class="hljs-keyword">if</span> (!file_exists(<span class="hljs-string">"./upload/chat/"</span>)) {
              mkdir(<span class="hljs-string">"./upload/chat/"</span>, <span class="hljs-number">0777</span>, <span class="hljs-keyword">true</span>);
            }
            $ch = curl_init(<span class="hljs-string">"http://file.api.weixin.qq.com/cgi-bin/media/get?access_token="</span>.$access_token.<span class="hljs-string">"&amp;media_id="</span>.$v);
            $fp = fopen($targetName, <span class="hljs-string">'wb'</span>);
            curl_setopt($ch, CURLOPT_FILE, $fp);
            curl_setopt($ch, CURLOPT_HEADER, <span class="hljs-number">0</span>);
            $msg[<span class="hljs-string">"status"</span>] = curl_exec($ch);
            $msg[<span class="hljs-string">"filename"</span>] = $str;
            curl_close($ch);
            fclose($fp);
            $data[] = $targetName;
        }
        <span class="hljs-comment">//微信上传图片处理End</span>
        <span class="hljs-keyword">if</span> (!is_not_empty_array($data)) {                                       <span class="hljs-comment">//微信服务器端图片上传错误</span>
            <span class="hljs-keyword">return</span> json_encode([<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">-2</span>]); 
        }
        $message = json_encode($data);
        <span class="hljs-comment">//Log入库</span>
        $insertId       = Pmodel\Push::addChatLog(<span class="hljs-keyword">self</span>::$uid, $toMid, $message, $message_type, <span class="hljs-number">1</span>, $accIsOnline);
        <span class="hljs-keyword">if</span> ($insertId === <span class="hljs-keyword">false</span>) {                                                  <span class="hljs-comment">//入库失败（服务器故障）</span>
            <span class="hljs-keyword">return</span> json_encode([<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">-3</span>]);
        }
        $Worker = <span class="hljs-keyword">new</span> \Events;
        $message_json   = <span class="hljs-string">'{"type":"send","source":"U_'</span> . <span class="hljs-keyword">self</span>::$uid . <span class="hljs-string">'","toClientUid":"'</span> . $toMid . <span class="hljs-string">'","content":'</span> . $message .<span class="hljs-string">',
　　　　　　　　　　　　　　  "c_type": '</span> . $message_type .<span class="hljs-string">', "Db_id":'</span> . $insertId . <span class="hljs-string">'}'</span>;
        $Worker::onMessage($client_id, $message_json);
        <span class="hljs-comment">//成功返回相关数据</span>
        <span class="hljs-keyword">return</span> json_encode([
            <span class="hljs-string">'status'</span>    =&gt; <span class="hljs-number">1</span>,
            <span class="hljs-string">'timeStamp'</span> =&gt; time(),
            <span class="hljs-string">'timeStr'</span>   =&gt; date(<span class="hljs-string">'H:i:s'</span>)
        ]);

    }</code></pre>
<p>其他一些不是很重要的代码就不拿出来了。</p>
<p>当前项目只是一个简单的需求，并没有把GatewayWorker很多强大的功能体现出来，大家以后在项目开发中遇到更为复杂的需求，参考官方手册提供的一些Demo就可以慢慢实现并开发出更为健壮的项目！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Websocket框架之GatewayWorker开发电商平台买家与卖家实时通讯

## 原文链接
[https://segmentfault.com/a/1190000012971998](https://segmentfault.com/a/1190000012971998)

