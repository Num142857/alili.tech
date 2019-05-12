---
title: '【Node.js 微信公众号实战】4.Node.js 微信消息管理' 
date: 2018-12-22 2:30:10
hidden: true
slug: 78n7amdph6s
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">一、写在前面的话</h1>
<p>  当用户发送消息给公众号时（或某些特定的用户操作引发的事件推送时），会产生一个POST请求，开发者可以在响应包（Get）中返回特定XML结构，来对该消息进行响应。</p>
<p>  消息推送也是微信公众号开发更为有趣的功能，涉及到文本消息、图片消息、语音消息、视频消息、音乐消息以及图文消息。并且最为有趣的功能当属消息加解密了，当然由于篇文章篇幅的原因我会在下一篇文章中去着重说明。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012441023?w=440&amp;h=440" src="https://static.alili.tech/img/remote/1460000012441023?w=440&amp;h=440" alt="我们接着来，微信消息管理" title="我们接着来，微信消息管理" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader1">二、微信消息管理</h1>
<p>1.捕获消息信息</p>
<p>  在文章的第一句话中,为我们指明了微信消息产生的请求方式为 POST，因此首先我们就去对 Node.js 的 Post 请求进行监听。</p>
<p>  在我们的 app.js 文件中添加一个POST监听，并将获取的结果输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//用于处理所有进入 3000 端口 post 的连接请求
app.post('/',function(req,res){
    var buffer = [];
    //监听 data 事件 用于接收数据
    req.on('data',function(data){
        buffer.push(data);
    });
    //监听 end 事件 用于处理接收完成的数据
    req.on('end',function(){
    //输出接收完成的数据   
         console.log(Buffer.concat(buffer).toString('utf-8'));
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//用于处理所有进入 3000 端口 post 的连接请求</span>
app.post(<span class="hljs-string">'/'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res</span>)</span>{
    <span class="hljs-keyword">var</span> buffer = [];
    <span class="hljs-comment">//监听 data 事件 用于接收数据</span>
    req.on(<span class="hljs-string">'data'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
        buffer.push(data);
    });
    <span class="hljs-comment">//监听 end 事件 用于处理接收完成的数据</span>
    req.on(<span class="hljs-string">'end'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//输出接收完成的数据   </span>
         <span class="hljs-built_in">console</span>.log(Buffer.concat(buffer).toString(<span class="hljs-string">'utf-8'</span>));
    });
});</code></pre>
<p>  随后将 Node.js 启动后映射至外网，关注我们的微信公众号，在控制台中则会看到：<br><span class="img-wrap"><img data-src="/img/remote/1460000012441024?w=933&amp;h=220" src="https://static.alili.tech/img/remote/1460000012441024?w=933&amp;h=220" alt="输出结果" title="输出结果" style="cursor: pointer;"></span></p>
<p>  打开 <a href="https://mp.weixin.qq.com/wiki" rel="nofollow noreferrer" target="_blank">微信帮助文档 </a>，点击左侧菜单的消息管理，选择其子菜单 接收事件推送，如图：<br><span class="img-wrap"><img data-src="/img/remote/1460000012441025?w=277&amp;h=390" src="https://static.alili.tech/img/remote/1460000012441025?w=277&amp;h=390" alt="消息管理 -  接收事件推送" title="消息管理 -  接收事件推送" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012441026?w=919&amp;h=406" src="https://static.alili.tech/img/remote/1460000012441026?w=919&amp;h=406" alt="微信接收事件推送" title="微信接收事件推送" style="cursor: pointer;"></span></p>
<p>  从上图我们不难看出，微信 接收事件推送 确实很多，而我们最终目标是要实现，在用户触发事件时返回其相应的回复消息。因此我们总结一下我们要实现的步骤：</p>
<ol>
<li>解析 XML ，使用 Event 参数判断事件类型</li>
<li>返回相应的事件信息</li>
</ol>
<p>总结完实现步骤后，我们就开始动手实现第一个被动回复消息吧。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012441027?w=180&amp;h=191" src="https://static.alili.tech/img/remote/1460000012441027?w=180&amp;h=191" alt="别拦我，让我去装逼" title="别拦我，让我去装逼" style="cursor: pointer;"></span></p>
<p>2.以关注事件为例，实现第一个被动回复</p>
<p>  解析 XML 我这里使用了 第三方的包 xml2js(npm install xml2js )，并在 wechat.js 中引入。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" parseString = require('xml2js').parseString;//引入xml2js包" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"> parseString = <span class="hljs-built_in">require</span>(<span class="hljs-string">'xml2js'</span>).parseString;<span class="hljs-comment">//引入xml2js包</span></code></pre>
<p>  为 WeChat 对象添加一个消息处理的方法 handleMsg，将 app.js 中捕获 POST 实现的写入在其代码块中，并使用 xml2js 解析，代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 微信消息
 */
WeChat.prototype.handleMsg = function(req,res){
    var buffer = [];
    //监听 data 事件 用于接收数据
    req.on('data',function(data){
        buffer.push(data);
    });
    //监听 end 事件 用于处理接收完成的数据
    req.on('end',function(){
        var msgXml = Buffer.concat(buffer).toString('utf-8');
        //解析xml
        parseString(msgXml,{explicitArray : false},function(err,result){
            if(!err){
                //打印解析结果
                console.log(result);
            }else{
                 //打印错误信息
                console.log(err);
            }
        })
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 微信消息
 */</span>
WeChat.prototype.handleMsg = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res</span>)</span>{
    <span class="hljs-keyword">var</span> buffer = [];
    <span class="hljs-comment">//监听 data 事件 用于接收数据</span>
    req.on(<span class="hljs-string">'data'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
        buffer.push(data);
    });
    <span class="hljs-comment">//监听 end 事件 用于处理接收完成的数据</span>
    req.on(<span class="hljs-string">'end'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> msgXml = Buffer.concat(buffer).toString(<span class="hljs-string">'utf-8'</span>);
        <span class="hljs-comment">//解析xml</span>
        parseString(msgXml,{<span class="hljs-attr">explicitArray</span> : <span class="hljs-literal">false</span>},<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err,result</span>)</span>{
            <span class="hljs-keyword">if</span>(!err){
                <span class="hljs-comment">//打印解析结果</span>
                <span class="hljs-built_in">console</span>.log(result);
            }<span class="hljs-keyword">else</span>{
                 <span class="hljs-comment">//打印错误信息</span>
                <span class="hljs-built_in">console</span>.log(err);
            }
        })
    });
}</code></pre>
<p>  在 app.js 中调用 handleMsg 方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//用于处理所有进入 3000 端口 post 的连接请求
app.post('/',function(req,res){
    wechatApp.handleMsg(req,res);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//用于处理所有进入 3000 端口 post 的连接请求</span>
app.post(<span class="hljs-string">'/'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res</span>)</span>{
    wechatApp.handleMsg(req,res);
});</code></pre>
<p>  完成了代码的编写后，将公众号重新关注<br><span class="img-wrap"><img data-src="/img/remote/1460000012441028?w=887&amp;h=362" src="https://static.alili.tech/img/remote/1460000012441028?w=887&amp;h=362" alt="运行结果" title="运行结果" style="cursor: pointer; display: inline;"></span></p>
<p>最后打印为一个 JSON 格式的结果，也就是预示着我们第1步工作已经完成。下面开始我们的第2步，微信被动回复。</p>
<p>  在文章的第一句话的后边提到 开发者可以在响应包（Get）中返回特定XML结构，那么这个特定的 XML 结构在哪呢？再次打开<a href="https://mp.weixin.qq.com/wiki" rel="nofollow noreferrer" target="_blank">微信帮助文档 </a>，点击左侧菜单的消息管理，选择其子菜单 被动回复消息，如图：<br><span class="img-wrap"><img data-src="/img/remote/1460000012441029?w=388&amp;h=441" src="https://static.alili.tech/img/remote/1460000012441029?w=388&amp;h=441" alt="消息管理 - 被动回复消息" title="消息管理 - 被动回复消息" style="cursor: pointer; display: inline;"></span></p>
<p>  直接来到 回复文本消息：<br><span class="img-wrap"><img data-src="/img/remote/1460000012441030?w=940&amp;h=632" src="https://static.alili.tech/img/remote/1460000012441030?w=940&amp;h=632" alt="回复文本消息" title="回复文本消息" style="cursor: pointer; display: inline;"></span></p>
<p>  拿到回复文本消息格式后，我们就来为关注我们公众号的同学打声招呼吧。在 wechat 文件中 创建 msg.js 文件用于消息的管理。<br><span class="img-wrap"><img data-src="/img/remote/1460000012441031?w=829&amp;h=530" src="https://static.alili.tech/img/remote/1460000012441031?w=829&amp;h=530" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<p>并在 msg.js 中添加处理文本消息的接口，并在 wechat.js 中引用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict' //设置为严格模式

//回复文本消息
exports.txtMsg = function(toUser,fromUser,content){
    var xmlContent =  &quot;<xml><ToUserName><![CDATA[&quot;+ toUser +&quot;]]></ToUserName>&quot;;
        xmlContent += &quot;<FromUserName><![CDATA[&quot;+ fromUser +&quot;]]></FromUserName>&quot;;
        xmlContent += &quot;<CreateTime>&quot;+ new Date().getTime() +&quot;</CreateTime>&quot;;
        xmlContent += &quot;<MsgType><![CDATA[text]]></MsgType>&quot;;
        xmlContent += &quot;<Content><![CDATA[&quot;+ content +&quot;]]></Content></xml>&quot;;
    return xmlContent;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span> <span class="hljs-comment">//设置为严格模式</span>

<span class="hljs-comment">//回复文本消息</span>
exports.txtMsg = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">toUser,fromUser,content</span>)</span>{
    <span class="hljs-keyword">var</span> xmlContent =  <span class="hljs-string">"&lt;xml&gt;&lt;ToUserName&gt;&lt;![CDATA["</span>+ toUser +<span class="hljs-string">"]]&gt;&lt;/ToUserName&gt;"</span>;
        xmlContent += <span class="hljs-string">"&lt;FromUserName&gt;&lt;![CDATA["</span>+ fromUser +<span class="hljs-string">"]]&gt;&lt;/FromUserName&gt;"</span>;
        xmlContent += <span class="hljs-string">"&lt;CreateTime&gt;"</span>+ <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime() +<span class="hljs-string">"&lt;/CreateTime&gt;"</span>;
        xmlContent += <span class="hljs-string">"&lt;MsgType&gt;&lt;![CDATA[text]]&gt;&lt;/MsgType&gt;"</span>;
        xmlContent += <span class="hljs-string">"&lt;Content&gt;&lt;![CDATA["</span>+ content +<span class="hljs-string">"]]&gt;&lt;/Content&gt;&lt;/xml&gt;"</span>;
    <span class="hljs-keyword">return</span> xmlContent;
}</code></pre>
<p>修改 wechat.js 中 handleMsg 方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 微信消息
 */
WeChat.prototype.handleMsg = function(req,res){
    var buffer = [];
    //监听 data 事件 用于接收数据
    req.on('data',function(data){
        buffer.push(data);
    });
    //监听 end 事件 用于处理接收完成的数据
    req.on('end',function(){
        var msgXml = Buffer.concat(buffer).toString('utf-8');
        //解析xml
        parseString(msgXml,{explicitArray : false},function(err,result){
            if(!err){
                   result = result.xml;
                   var toUser = result.ToUserName; //接收方微信
                   var fromUser = result.FromUserName;//发送仿微信
                   //判断事件类型
                   switch(result.Event.toLowerCase()){
                      case 'subscribe':
                             //回复消息
                             res.send(msg.txtMsg(fromUser,toUser,'欢迎关注 hvkcoder 公众号，一起斗图吧'));
                             break;
                   }
            }else{
                 //打印错误信息
                console.log(err);
            }
        })
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 微信消息
 */</span>
WeChat.prototype.handleMsg = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res</span>)</span>{
    <span class="hljs-keyword">var</span> buffer = [];
    <span class="hljs-comment">//监听 data 事件 用于接收数据</span>
    req.on(<span class="hljs-string">'data'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
        buffer.push(data);
    });
    <span class="hljs-comment">//监听 end 事件 用于处理接收完成的数据</span>
    req.on(<span class="hljs-string">'end'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> msgXml = Buffer.concat(buffer).toString(<span class="hljs-string">'utf-8'</span>);
        <span class="hljs-comment">//解析xml</span>
        parseString(msgXml,{<span class="hljs-attr">explicitArray</span> : <span class="hljs-literal">false</span>},<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err,result</span>)</span>{
            <span class="hljs-keyword">if</span>(!err){
                   result = result.xml;
                   <span class="hljs-keyword">var</span> toUser = result.ToUserName; <span class="hljs-comment">//接收方微信</span>
                   <span class="hljs-keyword">var</span> fromUser = result.FromUserName;<span class="hljs-comment">//发送仿微信</span>
                   <span class="hljs-comment">//判断事件类型</span>
                   <span class="hljs-keyword">switch</span>(result.Event.toLowerCase()){
                      <span class="hljs-keyword">case</span> <span class="hljs-string">'subscribe'</span>:
                             <span class="hljs-comment">//回复消息</span>
                             res.send(msg.txtMsg(fromUser,toUser,<span class="hljs-string">'欢迎关注 hvkcoder 公众号，一起斗图吧'</span>));
                             <span class="hljs-keyword">break</span>;
                   }
            }<span class="hljs-keyword">else</span>{
                 <span class="hljs-comment">//打印错误信息</span>
                <span class="hljs-built_in">console</span>.log(err);
            }
        })
    });
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012441032?w=587&amp;h=514" src="https://static.alili.tech/img/remote/1460000012441032?w=587&amp;h=514" alt="实现结果" title="实现结果" style="cursor: pointer; display: inline;"></span></p>
<p>   没错就是这么简单。这里有个逻辑是这样的 toUser 表示接收方，也就是咱们的微信公众号；fromUser 表示发送方，也就是触发事件的用户。而我们要回复用户时，此时 接收方 就是 触发事件的用户，而发送方则是 我们的微信公众号。这块比较绕，大家可以慢慢去理解。</p>
<p>  由于我们还没有对微信的素材管理进行讲解，这里我们暂时跳过 图片消息、语音消息、视频消息、以及音乐消息。直接实现图文消息的推送。</p>
<p>3.图文消息<br><span class="img-wrap"><img data-src="/img/remote/1460000012441033?w=809&amp;h=591" src="https://static.alili.tech/img/remote/1460000012441033?w=809&amp;h=591" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer; display: inline;"></span><br>  在 msg.js 文件中添加图文XML模板</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//回复图文消息
exports.graphicMsg = function(toUser,fromUser,contentArr){
     var xmlContent =  &quot;<xml><ToUserName><![CDATA[&quot;+ toUser +&quot;]]></ToUserName>&quot;;
        xmlContent += &quot;<FromUserName><![CDATA[&quot;+ fromUser +&quot;]]></FromUserName>&quot;;
        xmlContent += &quot;<CreateTime>&quot;+ new Date().getTime() +&quot;</CreateTime>&quot;;
        xmlContent += &quot;<MsgType><![CDATA[news]]></MsgType>&quot;;
        xmlContent += &quot;<ArticleCount>&quot;+contentArr.length+&quot;</ArticleCount>&quot;;
        xmlContent += &quot;<Articles>&quot;;
        contentArr.map(function(item,index){
            xmlContent+=&quot;<item>&quot;;
            xmlContent+=&quot;<Title><![CDATA[&quot;+ item.Title +&quot;]]></Title>&quot;;
            xmlContent+=&quot;<Description><![CDATA[&quot;+ item.Description +&quot;]]></Description>&quot;;
            xmlContent+=&quot;<PicUrl><![CDATA[&quot;+ item.PicUrl +&quot;]]></PicUrl>&quot;;
            xmlContent+=&quot;<Url><![CDATA[&quot;+ item.Url +&quot;]]></Url>&quot;;
            xmlContent+=&quot;</item>&quot;;
        });
        xmlContent += &quot;</Articles></xml>&quot;;
    return xmlContent;
}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//回复图文消息</span>
exports.graphicMsg = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">toUser,fromUser,contentArr</span>)</span>{
     <span class="hljs-keyword">var</span> xmlContent =  <span class="hljs-string">"&lt;xml&gt;&lt;ToUserName&gt;&lt;![CDATA["</span>+ toUser +<span class="hljs-string">"]]&gt;&lt;/ToUserName&gt;"</span>;
        xmlContent += <span class="hljs-string">"&lt;FromUserName&gt;&lt;![CDATA["</span>+ fromUser +<span class="hljs-string">"]]&gt;&lt;/FromUserName&gt;"</span>;
        xmlContent += <span class="hljs-string">"&lt;CreateTime&gt;"</span>+ <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime() +<span class="hljs-string">"&lt;/CreateTime&gt;"</span>;
        xmlContent += <span class="hljs-string">"&lt;MsgType&gt;&lt;![CDATA[news]]&gt;&lt;/MsgType&gt;"</span>;
        xmlContent += <span class="hljs-string">"&lt;ArticleCount&gt;"</span>+contentArr.length+<span class="hljs-string">"&lt;/ArticleCount&gt;"</span>;
        xmlContent += <span class="hljs-string">"&lt;Articles&gt;"</span>;
        contentArr.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item,index</span>)</span>{
            xmlContent+=<span class="hljs-string">"&lt;item&gt;"</span>;
            xmlContent+=<span class="hljs-string">"&lt;Title&gt;&lt;![CDATA["</span>+ item.Title +<span class="hljs-string">"]]&gt;&lt;/Title&gt;"</span>;
            xmlContent+=<span class="hljs-string">"&lt;Description&gt;&lt;![CDATA["</span>+ item.Description +<span class="hljs-string">"]]&gt;&lt;/Description&gt;"</span>;
            xmlContent+=<span class="hljs-string">"&lt;PicUrl&gt;&lt;![CDATA["</span>+ item.PicUrl +<span class="hljs-string">"]]&gt;&lt;/PicUrl&gt;"</span>;
            xmlContent+=<span class="hljs-string">"&lt;Url&gt;&lt;![CDATA["</span>+ item.Url +<span class="hljs-string">"]]&gt;&lt;/Url&gt;"</span>;
            xmlContent+=<span class="hljs-string">"&lt;/item&gt;"</span>;
        });
        xmlContent += <span class="hljs-string">"&lt;/Articles&gt;&lt;/xml&gt;"</span>;
    <span class="hljs-keyword">return</span> xmlContent;
}
}</code></pre>
<p>  更改 wechat.js 文件中的 handleMsg 方法，将图消息推送响应在点击事件中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  case 'click':
                                var contentArr = [
                                    {Title:&quot;Node.js 微信自定义菜单&quot;,Description:&quot;使用Node.js实现自定义微信菜单&quot;,PicUrl:&quot;http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast&quot;,Url:&quot;http://blog.csdn.net/hvkcoder/article/details/72868520&quot;},
                                    {Title:&quot;Node.js access_token的获取、存储及更新&quot;,Description:&quot;Node.js access_token的获取、存储及更新&quot;,PicUrl:&quot;http://img.blog.csdn.net/20170528151333883?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast&quot;,Url:&quot;http://blog.csdn.net/hvkcoder/article/details/72783631&quot;},
                                    {Title:&quot;Node.js 接入微信公众平台开发&quot;,Description:&quot;Node.js 接入微信公众平台开发&quot;,PicUrl:&quot;http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast&quot;,Url:&quot;http://blog.csdn.net/hvkcoder/article/details/72765279&quot;}
                                ];
                               //回复图文消息
                               res.send(msg.graphicMsg(fromUser,toUser,contentArr));
                            break;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-keyword">case</span> <span class="hljs-string">'click'</span>:
                                <span class="hljs-keyword">var</span> contentArr = [
                                    {<span class="hljs-attr">Title</span>:<span class="hljs-string">"Node.js 微信自定义菜单"</span>,<span class="hljs-attr">Description</span>:<span class="hljs-string">"使用Node.js实现自定义微信菜单"</span>,<span class="hljs-attr">PicUrl</span>:<span class="hljs-string">"http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast"</span>,<span class="hljs-attr">Url</span>:<span class="hljs-string">"http://blog.csdn.net/hvkcoder/article/details/72868520"</span>},
                                    {<span class="hljs-attr">Title</span>:<span class="hljs-string">"Node.js access_token的获取、存储及更新"</span>,<span class="hljs-attr">Description</span>:<span class="hljs-string">"Node.js access_token的获取、存储及更新"</span>,<span class="hljs-attr">PicUrl</span>:<span class="hljs-string">"http://img.blog.csdn.net/20170528151333883?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast"</span>,<span class="hljs-attr">Url</span>:<span class="hljs-string">"http://blog.csdn.net/hvkcoder/article/details/72783631"</span>},
                                    {<span class="hljs-attr">Title</span>:<span class="hljs-string">"Node.js 接入微信公众平台开发"</span>,<span class="hljs-attr">Description</span>:<span class="hljs-string">"Node.js 接入微信公众平台开发"</span>,<span class="hljs-attr">PicUrl</span>:<span class="hljs-string">"http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast"</span>,<span class="hljs-attr">Url</span>:<span class="hljs-string">"http://blog.csdn.net/hvkcoder/article/details/72765279"</span>}
                                ];
                               <span class="hljs-comment">//回复图文消息</span>
                               res.send(msg.graphicMsg(fromUser,toUser,contentArr));
                            <span class="hljs-keyword">break</span>;</code></pre>
<p>  点击菜单下的 今日推荐<br><span class="img-wrap"><img data-src="/img/remote/1460000012441034?w=583&amp;h=506" src="https://static.alili.tech/img/remote/1460000012441034?w=583&amp;h=506" alt="今日推荐" title="今日推荐" style="cursor: pointer;"></span></p>
<p>  图文推送就是这么简单的被我们给实现了。</p>
<p>4.接收普通消息</p>
<p>  微信除了为我们接收事件推送外，千万不要忘了微信还能通过发送文字。而这一节我们也就来玩玩微信接收普通消息。</p>
<p>  打开 <a href="https://mp.weixin.qq.com/wiki" rel="nofollow noreferrer" target="_blank">微信帮助文档 </a>，点击左侧菜单的消息管理，选择其子菜单 接收普通消息，如图：<br><span class="img-wrap"><img data-src="/img/remote/1460000012441035" src="https://static.alili.tech/img/remote/1460000012441035" alt="消息管理 - 接收普通消息" title="消息管理 - 接收普通消息" style="cursor: pointer; display: inline;"></span></p>
<p>  依然如接收事件推送的套路，不同的是参数发生了改变，但这并步影响我们的开发，只需要几步就能够完美的解决。更改 wechat.js 文件 handleMsg方法，这里我先暂时只针对用户输入的文本消息做处理，其他的跟其类似。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//判断消息类型
                   if(result.MsgType.toLowerCase() === &quot;event&quot;){
                        //判断事件类型
                        switch(result.Event.toLowerCase()){
                            case 'subscribe':
                                    //回复消息
                                    var content = &quot;欢迎关注 hvkcoder 公众号，一起斗图吧。回复以下数字：\n&quot;;
                                        content += &quot;1.你是谁\n&quot;;
                                        content += &quot;2.关于Node.js\n&quot;;
                                        content += &quot;回复 “文章”  可以得到图文推送哦~\n&quot;;
                                    res.send(msg.txtMsg(fromUser,toUser,''));
                                    break;
                            case 'click':
                                        var contentArr = [
                                            {Title:&quot;Node.js 微信自定义菜单&quot;,Description:&quot;使用Node.js实现自定义微信菜单&quot;,PicUrl:&quot;http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast&quot;,Url:&quot;http://blog.csdn.net/hvkcoder/article/details/72868520&quot;},
                                            {Title:&quot;Node.js access_token的获取、存储及更新&quot;,Description:&quot;Node.js access_token的获取、存储及更新&quot;,PicUrl:&quot;http://img.blog.csdn.net/20170528151333883?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast&quot;,Url:&quot;http://blog.csdn.net/hvkcoder/article/details/72783631&quot;},
                                            {Title:&quot;Node.js 接入微信公众平台开发&quot;,Description:&quot;Node.js 接入微信公众平台开发&quot;,PicUrl:&quot;http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast&quot;,Url:&quot;http://blog.csdn.net/hvkcoder/article/details/72765279&quot;}
                                        ];
                                    //回复图文消息
                                    res.send(msg.graphicMsg(fromUser,toUser,contentArr));
                                    break;
                        }
                   }else{
                       //判断消息类型为 文本消息
                       if(result.MsgType.toLowerCase() === &quot;text&quot;){
                           //根据消息内容返回消息信息
                           switch(result.Content){
                               case '1':
                                        res.send(msg.txtMsg(fromUser,toUser,'Hello ！我的英文名字叫 H-VK'));
                                    break;
                               case '2':
                                        res.send(msg.txtMsg(fromUser,toUser,'Node.js是一个开放源代码、跨平台的JavaScript语言运行环境，采用Google开发的V8运行代码,使用事件驱动、非阻塞和异步输入输出模型等技术来提高性能，可优化应用程序的传输量和规模。这些技术通常用于数据密集的事实应用程序'));
                                    break;
                               case '文章':
                                      var contentArr = [
                                            {Title:&quot;Node.js 微信自定义菜单&quot;,Description:&quot;使用Node.js实现自定义微信菜单&quot;,PicUrl:&quot;http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast&quot;,Url:&quot;http://blog.csdn.net/hvkcoder/article/details/72868520&quot;},
                                            {Title:&quot;Node.js access_token的获取、存储及更新&quot;,Description:&quot;Node.js access_token的获取、存储及更新&quot;,PicUrl:&quot;http://img.blog.csdn.net/20170528151333883?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast&quot;,Url:&quot;http://blog.csdn.net/hvkcoder/article/details/72783631&quot;},
                                            {Title:&quot;Node.js 接入微信公众平台开发&quot;,Description:&quot;Node.js 接入微信公众平台开发&quot;,PicUrl:&quot;http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast&quot;,Url:&quot;http://blog.csdn.net/hvkcoder/article/details/72765279&quot;}
                                        ];
                                        //回复图文消息
                                        res.send(msg.graphicMsg(fromUser,toUser,contentArr));
                                    break;
                                default :
                                         res.send(msg.txtMsg(fromUser,toUser,'没有这个选项哦'));
                                    break;
                           }
                       }
                   }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//判断消息类型</span>
                   <span class="hljs-keyword">if</span>(result.MsgType.toLowerCase() === <span class="hljs-string">"event"</span>){
                        <span class="hljs-comment">//判断事件类型</span>
                        <span class="hljs-keyword">switch</span>(result.Event.toLowerCase()){
                            <span class="hljs-keyword">case</span> <span class="hljs-string">'subscribe'</span>:
                                    <span class="hljs-comment">//回复消息</span>
                                    <span class="hljs-keyword">var</span> content = <span class="hljs-string">"欢迎关注 hvkcoder 公众号，一起斗图吧。回复以下数字：\n"</span>;
                                        content += <span class="hljs-string">"1.你是谁\n"</span>;
                                        content += <span class="hljs-string">"2.关于Node.js\n"</span>;
                                        content += <span class="hljs-string">"回复 “文章”  可以得到图文推送哦~\n"</span>;
                                    res.send(msg.txtMsg(fromUser,toUser,<span class="hljs-string">''</span>));
                                    <span class="hljs-keyword">break</span>;
                            <span class="hljs-keyword">case</span> <span class="hljs-string">'click'</span>:
                                        <span class="hljs-keyword">var</span> contentArr = [
                                            {<span class="hljs-attr">Title</span>:<span class="hljs-string">"Node.js 微信自定义菜单"</span>,<span class="hljs-attr">Description</span>:<span class="hljs-string">"使用Node.js实现自定义微信菜单"</span>,<span class="hljs-attr">PicUrl</span>:<span class="hljs-string">"http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast"</span>,<span class="hljs-attr">Url</span>:<span class="hljs-string">"http://blog.csdn.net/hvkcoder/article/details/72868520"</span>},
                                            {<span class="hljs-attr">Title</span>:<span class="hljs-string">"Node.js access_token的获取、存储及更新"</span>,<span class="hljs-attr">Description</span>:<span class="hljs-string">"Node.js access_token的获取、存储及更新"</span>,<span class="hljs-attr">PicUrl</span>:<span class="hljs-string">"http://img.blog.csdn.net/20170528151333883?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast"</span>,<span class="hljs-attr">Url</span>:<span class="hljs-string">"http://blog.csdn.net/hvkcoder/article/details/72783631"</span>},
                                            {<span class="hljs-attr">Title</span>:<span class="hljs-string">"Node.js 接入微信公众平台开发"</span>,<span class="hljs-attr">Description</span>:<span class="hljs-string">"Node.js 接入微信公众平台开发"</span>,<span class="hljs-attr">PicUrl</span>:<span class="hljs-string">"http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast"</span>,<span class="hljs-attr">Url</span>:<span class="hljs-string">"http://blog.csdn.net/hvkcoder/article/details/72765279"</span>}
                                        ];
                                    <span class="hljs-comment">//回复图文消息</span>
                                    res.send(msg.graphicMsg(fromUser,toUser,contentArr));
                                    <span class="hljs-keyword">break</span>;
                        }
                   }<span class="hljs-keyword">else</span>{
                       <span class="hljs-comment">//判断消息类型为 文本消息</span>
                       <span class="hljs-keyword">if</span>(result.MsgType.toLowerCase() === <span class="hljs-string">"text"</span>){
                           <span class="hljs-comment">//根据消息内容返回消息信息</span>
                           <span class="hljs-keyword">switch</span>(result.Content){
                               <span class="hljs-keyword">case</span> <span class="hljs-string">'1'</span>:
                                        res.send(msg.txtMsg(fromUser,toUser,<span class="hljs-string">'Hello ！我的英文名字叫 H-VK'</span>));
                                    <span class="hljs-keyword">break</span>;
                               <span class="hljs-keyword">case</span> <span class="hljs-string">'2'</span>:
                                        res.send(msg.txtMsg(fromUser,toUser,<span class="hljs-string">'Node.js是一个开放源代码、跨平台的JavaScript语言运行环境，采用Google开发的V8运行代码,使用事件驱动、非阻塞和异步输入输出模型等技术来提高性能，可优化应用程序的传输量和规模。这些技术通常用于数据密集的事实应用程序'</span>));
                                    <span class="hljs-keyword">break</span>;
                               <span class="hljs-keyword">case</span> <span class="hljs-string">'文章'</span>:
                                      <span class="hljs-keyword">var</span> contentArr = [
                                            {<span class="hljs-attr">Title</span>:<span class="hljs-string">"Node.js 微信自定义菜单"</span>,<span class="hljs-attr">Description</span>:<span class="hljs-string">"使用Node.js实现自定义微信菜单"</span>,<span class="hljs-attr">PicUrl</span>:<span class="hljs-string">"http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast"</span>,<span class="hljs-attr">Url</span>:<span class="hljs-string">"http://blog.csdn.net/hvkcoder/article/details/72868520"</span>},
                                            {<span class="hljs-attr">Title</span>:<span class="hljs-string">"Node.js access_token的获取、存储及更新"</span>,<span class="hljs-attr">Description</span>:<span class="hljs-string">"Node.js access_token的获取、存储及更新"</span>,<span class="hljs-attr">PicUrl</span>:<span class="hljs-string">"http://img.blog.csdn.net/20170528151333883?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast"</span>,<span class="hljs-attr">Url</span>:<span class="hljs-string">"http://blog.csdn.net/hvkcoder/article/details/72783631"</span>},
                                            {<span class="hljs-attr">Title</span>:<span class="hljs-string">"Node.js 接入微信公众平台开发"</span>,<span class="hljs-attr">Description</span>:<span class="hljs-string">"Node.js 接入微信公众平台开发"</span>,<span class="hljs-attr">PicUrl</span>:<span class="hljs-string">"http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast"</span>,<span class="hljs-attr">Url</span>:<span class="hljs-string">"http://blog.csdn.net/hvkcoder/article/details/72765279"</span>}
                                        ];
                                        <span class="hljs-comment">//回复图文消息</span>
                                        res.send(msg.graphicMsg(fromUser,toUser,contentArr));
                                    <span class="hljs-keyword">break</span>;
                                <span class="hljs-keyword">default</span> :
                                         res.send(msg.txtMsg(fromUser,toUser,<span class="hljs-string">'没有这个选项哦'</span>));
                                    <span class="hljs-keyword">break</span>;
                           }
                       }
                   }</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012441036?w=570&amp;h=559" src="https://static.alili.tech/img/remote/1460000012441036?w=570&amp;h=559" alt="微信消息 文本消息处理" title="微信消息 文本消息处理" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012441037?w=568&amp;h=546" src="https://static.alili.tech/img/remote/1460000012441037?w=568&amp;h=546" alt="微信消息 文本消息处理" title="微信消息 文本消息处理" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012441038?w=430&amp;h=430" src="https://static.alili.tech/img/remote/1460000012441038?w=430&amp;h=430" alt="测试微信公众号" title="测试微信公众号" style="cursor: pointer; display: inline;"></span></p>
<p>  OK ！至此我们就完成了微信消息管理的讲解，似乎真的没有什么难度。预留了一章，主要想要去细说一下说消息加解密，因为在网上涉及 Node.js 微信消息加解密的文章确实很少，微信帮助文档给的案例也没有 Node.js 的详细说明。</p>
<p>  最后文章代码部分，由于网上编辑器的代码换行做的不是很好可能有些乱，建议可以去我的 github 上查看源码。</p>
<p>  文章源代码：<a href="https://github.com/SilenceHVK/wechatByNode" rel="nofollow noreferrer" target="_blank">https://github.com/SilenceHVK...</a> 。对文章有不正确之处，请给予纠正。github源代码请顺手给个 Star，最后感谢您的阅读。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【Node.js 微信公众号实战】4.Node.js 微信消息管理

## 原文链接
[https://segmentfault.com/a/1190000012441020](https://segmentfault.com/a/1190000012441020)

