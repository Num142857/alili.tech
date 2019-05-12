---
title: '【Node.js 微信公众号实战】2.Node.js access_token的获取、存储及更新' 
date: 2018-12-22 2:30:10
hidden: true
slug: 5e1o43o1m
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、写在前面的话</h2>
<p>  上一篇文章中，我们使用 Node.js 成功的实现了接入微信公众平台功能。在这篇文章中，我们将实现微信公众平台一个非常重要的参数 access_token ,它是公众号的全局唯一接口调用凭据，公众号调用各接口时都需使用 access_token。</p>
<p>  在开始之前，让我们先按捺住自己激动的心情、调整好呼吸，因为我们要将上一篇文章的代码重新整理一下。一个好的项目结构，更能有助于我们理清业务逻辑以及将来维护代码的便捷。OK!<br><span class="img-wrap"><img data-src="/img/remote/1460000012428082?w=960&amp;h=716" src="https://static.alili.tech/img/remote/1460000012428082?w=960&amp;h=716" alt="Are you ready?" title="Are you ready?" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">二、整理项目结构</h2>
<p>1.打开我们的项目，并在项目中添加文件夹，命名为 wechat ，如图:<br><span class="img-wrap"><img data-src="/img/remote/1460000012428083?w=2448&amp;h=1516" src="https://static.alili.tech/img/remote/1460000012428083?w=2448&amp;h=1516" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>2.在 wechat 文件夹中添加文件并命名为 wechat.js。wechat.js 主要用于封装开发微信公众平台的所有方法。首先我们构建这个模块的结构，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict' //设置为严格模式

//构建 WeChat 对象 即 js中 函数就是对象
var WeChat = function(config){
    //设置 WeChat 对象属性 config
    this.config = config;
    
    //设置 WeChat 对象属性 token
    this.token = config.token;
}

//暴露可供外部访问的接口
module.exports = WeChat;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span> <span class="hljs-comment">//设置为严格模式</span>

<span class="hljs-comment">//构建 WeChat 对象 即 js中 函数就是对象</span>
<span class="hljs-keyword">var</span> WeChat = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">config</span>)</span>{
    <span class="hljs-comment">//设置 WeChat 对象属性 config</span>
    <span class="hljs-keyword">this</span>.config = config;
    
    <span class="hljs-comment">//设置 WeChat 对象属性 token</span>
    <span class="hljs-keyword">this</span>.token = config.token;
}

<span class="hljs-comment">//暴露可供外部访问的接口</span>
<span class="hljs-built_in">module</span>.exports = WeChat;</code></pre>
<p> 严格模式：是在 ECMAScript 5 中引入的概念。严格模式是为 Javascript 定义了一种解析与执行模型。</p>
<p> module.exports ：暴露接口用于外部操作。实际上我们定义模块后，使用 node.js 的 require 引用时，node.js 会自动在我们定义的模块外层加入以下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * exports  module.exports 的一个简短的引用
 * require  用于引入模块
 * module   当前模块的引用
 * __filename  当前模块的文件名
 * __dirname   当前模块的目录名
 */
(function (exports, require, module, __filename, __dirname) {
    //自定义模块的代码块
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * exports  module.exports 的一个简短的引用
 * require  用于引入模块
 * module   当前模块的引用
 * __filename  当前模块的文件名
 * __dirname   当前模块的目录名
 */</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">exports, require, module, __filename, __dirname</span>) </span>{
    <span class="hljs-comment">//自定义模块的代码块</span>
})();</code></pre>
<p>相信对于有过 javascript 开发经验的同学，上面的代码并不陌生。我们可以将它理解为一个闭包，是一个匿名方法的调用，避免污染全局变量。</p>
<blockquote>小知识：<p>  在上面的代码中，除了我们所使用的 module.exports 对象，还有另一个用于暴露接口的 变量 exports (官方文档将 module.exports 称为对象，exports 称为 属性，我在这里也就这样称呼了)，那么 module.exports 与 exports 有什么区别呢？</p>
<p>  module.exports 对象是由模块系统创建的，exports 变量是在模块的文件级别作用域内有效的，它在模块被执行前被赋于 module.exports 的值。——<a href="https://nodejs.org/dist/latest-v6.x/docs/api/modules.html#modules_module_exports" rel="nofollow noreferrer" target="_blank">来自Node.js官方文档</a></p>
<p>  也就是说 exports 是 module.exports 的引用，而 module.exports 才是真正用于暴露接口的对象。 exports 赋值的所有属性与方法都赋值给了 module.exports 对象。</p>
<p>  如果 module.exports 与 exports 将值赋值给了相同的属性，则按照赋值的先后顺序，取最后一个赋值；如果我们给 module.exports 赋值的是一个对象，则会覆盖 exports 的所有方法与属性。</p>
<p>  因此我们在暴露接口的使用上，如果只是单一属性或方法的话，建议使用exports.属性/方法，要是导出多个属性或方法或使用对象构造方法，建议使用 module.exports。</p>
<p>  具体详解可以点击查看该文章 -&gt; <a href="https://www.ycjcl.cc/2017/02/10/module-exportshe-exportsde-qu-bie/?utm_source=tuicool&amp;utm_medium=referral" rel="nofollow noreferrer" target="_blank">Module.exports和exports的区别</a></p>
</blockquote>
<p>3.为 WeChat 对象添加一个方法 auth，并将 app.js 中的验证方法粘贴进去</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict' //设置为严格模式

const crypto = require('crypto'); //引入加密模块

//构建 WeChat 对象 即 js中 函数就是对象
var WeChat = function(config){
    //设置 WeChat 对象属性 config
    this.config = config;

    //设置 WeChat 对象属性 token
    this.token = config.token;
}

/**
 * 微信接入验证
 */
WeChat.prototype.auth = function(req,res){
     //1.获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr
        var signature = req.query.signature,//微信加密签名
            timestamp = req.query.timestamp,//时间戳
                nonce = req.query.nonce,//随机数
            echostr = req.query.echostr;//随机字符串

        //2.将token、timestamp、nonce三个参数进行字典序排序
        var array = [this.token,timestamp,nonce];
        array.sort();

        //3.将三个参数字符串拼接成一个字符串进行sha1加密
        var tempStr = array.join('');
        const hashCode = crypto.createHash('sha1'); //创建加密类型 
        var resultCode = hashCode.update(tempStr,'utf8').digest('hex'); //对传入的字符串进行加密

        //4.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
        if(resultCode === signature){
            res.send(echostr);
        }else{
            res.send('mismatch');
        }
}

//暴露可供外部访问的接口
module.exports = WeChat;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span> <span class="hljs-comment">//设置为严格模式</span>

<span class="hljs-keyword">const</span> crypto = <span class="hljs-built_in">require</span>(<span class="hljs-string">'crypto'</span>); <span class="hljs-comment">//引入加密模块</span>

<span class="hljs-comment">//构建 WeChat 对象 即 js中 函数就是对象</span>
<span class="hljs-keyword">var</span> WeChat = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">config</span>)</span>{
    <span class="hljs-comment">//设置 WeChat 对象属性 config</span>
    <span class="hljs-keyword">this</span>.config = config;

    <span class="hljs-comment">//设置 WeChat 对象属性 token</span>
    <span class="hljs-keyword">this</span>.token = config.token;
}

<span class="hljs-comment">/**
 * 微信接入验证
 */</span>
WeChat.prototype.auth = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res</span>)</span>{
     <span class="hljs-comment">//1.获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr</span>
        <span class="hljs-keyword">var</span> signature = req.query.signature,<span class="hljs-comment">//微信加密签名</span>
            timestamp = req.query.timestamp,<span class="hljs-comment">//时间戳</span>
                nonce = req.query.nonce,<span class="hljs-comment">//随机数</span>
            echostr = req.query.echostr;<span class="hljs-comment">//随机字符串</span>

        <span class="hljs-comment">//2.将token、timestamp、nonce三个参数进行字典序排序</span>
        <span class="hljs-keyword">var</span> array = [<span class="hljs-keyword">this</span>.token,timestamp,nonce];
        array.sort();

        <span class="hljs-comment">//3.将三个参数字符串拼接成一个字符串进行sha1加密</span>
        <span class="hljs-keyword">var</span> tempStr = array.join(<span class="hljs-string">''</span>);
        <span class="hljs-keyword">const</span> hashCode = crypto.createHash(<span class="hljs-string">'sha1'</span>); <span class="hljs-comment">//创建加密类型 </span>
        <span class="hljs-keyword">var</span> resultCode = hashCode.update(tempStr,<span class="hljs-string">'utf8'</span>).digest(<span class="hljs-string">'hex'</span>); <span class="hljs-comment">//对传入的字符串进行加密</span>

        <span class="hljs-comment">//4.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信</span>
        <span class="hljs-keyword">if</span>(resultCode === signature){
            res.send(echostr);
        }<span class="hljs-keyword">else</span>{
            res.send(<span class="hljs-string">'mismatch'</span>);
        }
}

<span class="hljs-comment">//暴露可供外部访问的接口</span>
<span class="hljs-built_in">module</span>.exports = WeChat;</code></pre>
<p>4.整理 app.js 文件的中的代码，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const express = require('express'), //express 框架 
      wechat  = require('./wechat/wechat'), 
       config = require('./config');//引入配置文件

var app = express();//实例express框架

var wechatApp = new wechat(config); //实例wechat 模块

//用于处理所有进入 3000 端口 get 的连接请求
app.get('/',function(req,res){
    wechatApp.auth(req,res);
});

//监听3000端口
app.listen(3000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>), <span class="hljs-comment">//express 框架 </span>
      wechat  = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./wechat/wechat'</span>), 
       config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./config'</span>);<span class="hljs-comment">//引入配置文件</span>

<span class="hljs-keyword">var</span> app = express();<span class="hljs-comment">//实例express框架</span>

<span class="hljs-keyword">var</span> wechatApp = <span class="hljs-keyword">new</span> wechat(config); <span class="hljs-comment">//实例wechat 模块</span>

<span class="hljs-comment">//用于处理所有进入 3000 端口 get 的连接请求</span>
app.get(<span class="hljs-string">'/'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res</span>)</span>{
    wechatApp.auth(req,res);
});

<span class="hljs-comment">//监听3000端口</span>
app.listen(<span class="hljs-number">3000</span>);</code></pre>
<p>嗯！这样代码看着是不是舒服多了呢。<span class="img-wrap"><img data-src="/img/remote/1460000012428084?w=200&amp;h=200" src="https://static.alili.tech/img/remote/1460000012428084?w=200&amp;h=200" alt="机智如我" title="机智如我" style="cursor: pointer; display: inline;"></span></p>
<p>剩下的就是去微信公众平台接入验证了，在<a href="http://cnodejs.org/topic/59294bff9e32cc84569a746a" rel="nofollow noreferrer" target="_blank">上一篇文章</a>中有详细的教程，这里我就不再演示了</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012428085?w=800&amp;h=800" src="https://static.alili.tech/img/remote/1460000012428085?w=800&amp;h=800" alt="就是这么懒" title="就是这么懒" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">三、access_token的获取、存储及更新</h2>
<p>1.微信文档步骤</p>
<p>  在开始码代码之前，我们依然是先理清实现的思路，在开始编写实现代码。打开 <a href="https://mp.weixin.qq.com/wiki" rel="nofollow noreferrer" target="_blank">微信帮助文档</a> ，点击左侧菜单中的开始开发，点击其子菜单获取access_token，如图：<br><span class="img-wrap"><img data-src="/img/remote/1460000012428086?w=1420&amp;h=1186" src="https://static.alili.tech/img/remote/1460000012428086?w=1420&amp;h=1186" alt="获取access_token" title="获取access_token" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012428087?w=973&amp;h=2194" src="https://static.alili.tech/img/remote/1460000012428087?w=973&amp;h=2194" alt="获取access_token 帮助文档" title="获取access_token 帮助文档" style="cursor: pointer;"></span></p>
<p>通过上面的 API 的描述，我们总结出以下步骤：</p>
<ol>
<li>实现 https  Get 请求</li>
<li>获取 access_token 并存储  如果 当前 access_token 过期则更新</li>
</ol>
<p>2.access_token的获取、存储及更新 代码实现</p>
<p>  整理好思路后我们就按照上一节的步骤去实现。通过帮助文档我们将用于请求微信API 的请求地址与参数，存放到 config.json 文件。</p>
<p>  其中 appid 与 secret 两个参数 位于  <a href="https://mp.weixin.qq.com/" rel="nofollow noreferrer" target="_blank">微信公众平台</a> 左侧菜单的基本配置中，如图：<br><span class="img-wrap"><img data-src="/img/remote/1460000011393764?w=732&amp;h=411" src="https://static.alili.tech/img/remote/1460000011393764?w=732&amp;h=411" alt="微信公众平台 - 基本配置" title="微信公众平台 - 基本配置" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012428088?w=985&amp;h=423" src="https://static.alili.tech/img/remote/1460000012428088?w=985&amp;h=423" alt="APPID 与 AppSecret" title="APPID 与 AppSecret" style="cursor: pointer; display: inline;"></span></p>
<p>开发者密码 点击重置，用手机微信扫面二维码后便可得到。config.json 代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;token&quot;:&quot;wechat&quot;,
    &quot;appID&quot;:&quot;wx154f********764da&quot;,
    &quot;appScrect&quot;:&quot;59de4266*******8dbe9de4b798cd372&quot;,
    &quot;apiDomain&quot;:&quot;https://api.weixin.qq.com/&quot;,
    &quot;apiURL&quot;:{
        &quot;accessTokenApi&quot;:&quot;%scgi-bin/token?grant_type=client_credential&amp;appid=%s&amp;secret=%s&quot;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-string">"token"</span>:<span class="hljs-string">"wechat"</span>,
    <span class="hljs-string">"appID"</span>:<span class="hljs-string">"wx154f********764da"</span>,
    <span class="hljs-string">"appScrect"</span>:<span class="hljs-string">"59de4266*******8dbe9de4b798cd372"</span>,
    <span class="hljs-string">"apiDomain"</span>:<span class="hljs-string">"https://api.weixin.qq.com/"</span>,
    <span class="hljs-string">"apiURL"</span>:{
        <span class="hljs-string">"accessTokenApi"</span>:<span class="hljs-string">"%scgi-bin/token?grant_type=client_credential&amp;appid=%s&amp;secret=%s"</span>
    }
}</code></pre>
<p>由于微信 API 请求连接的域名是公用的，我们将它提出来，在请求地址中使用 %s(字符串) 占位符占位。</p>
<p>  微信所有请求连接都是 https 协议，很幸运的是 Node.js 系统包中为我们提供了 https 的包，由于后面的请求会多次用到 https ，因此我们将它封装为一个公用的方法，以便以后的使用，再次打开  wechat.js 在构造方法中，引入 https 模块，并在构造函数内部添加 requestGet 方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//用于处理 https Get请求方法
    this.requestGet = function(url){
        return new Promise(function(resolve,reject){
            https.get(url,function(res){
                var buffer = [],result = &quot;&quot;;
                //监听 data 事件
                res.on('data',function(data){
                    buffer.push(data);
                });
                //监听 数据传输完成事件
                res.on('end',function(){
                    result = Buffer.concat(buffer,buffer.length).toString('utf-8');
                    //将最后结果返回
                    resolve(result);
                });
            }).on('error',function(err){
                reject(err);
            });
        });
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//用于处理 https Get请求方法</span>
    <span class="hljs-keyword">this</span>.requestGet = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">url</span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
            https.get(url,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{
                <span class="hljs-keyword">var</span> buffer = [],result = <span class="hljs-string">""</span>;
                <span class="hljs-comment">//监听 data 事件</span>
                res.on(<span class="hljs-string">'data'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
                    buffer.push(data);
                });
                <span class="hljs-comment">//监听 数据传输完成事件</span>
                res.on(<span class="hljs-string">'end'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                    result = Buffer.concat(buffer,buffer.length).toString(<span class="hljs-string">'utf-8'</span>);
                    <span class="hljs-comment">//将最后结果返回</span>
                    resolve(result);
                });
            }).on(<span class="hljs-string">'error'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
                reject(err);
            });
        });
    }</code></pre>
<blockquote>提示：<p>    npm 提供了很多用于请求的工具包，比如 request ( 安装命令 npm install request ) 等。这里我只是用系统包去做请求处理。</p>
</blockquote>
<p>  由于 https 是异步请求的，我在这里面使用了 ES6 的 <a href="http://es6.ruanyifeng.com/#docs/promise" rel="nofollow noreferrer" target="_blank">Promise 对象</a> 。</p>
<p>  完成了 requestGet方法后，我们的第1步骤也就完成了。下面开始第2步，获取 access_token 并存储  如果 当前 access_token 过期则更新。</p>
<p>  在这之前我是想将 access_token 的存储位置依然放在 config.json 文件中，由于 access_token 在更新后 需要将文件重写，可能容易造成 config.json 文件的格式的紊乱，因此在 wechat 中重新创建一个 accessToken.json 文件用于存储 access_token <br><span class="img-wrap"><img data-src="/img/remote/1460000012428089?w=2448&amp;h=1516" src="https://static.alili.tech/img/remote/1460000012428089?w=2448&amp;h=1516" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;access_token&quot;:&quot;&quot;,
    &quot;expires_time&quot;:0
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-string">"access_token"</span>:<span class="hljs-string">""</span>,
    <span class="hljs-string">"expires_time"</span>:<span class="hljs-number">0</span>
}</code></pre>
<p>   其中 access_token 用于存储  我们 GET 请求后access_token 的值，expires_time 用于存储 access_token 的过期时间，保存为时间戳。</p>
<p>  在 wechat.js 引入 fs 模块用于操作文件、util 工具模块用于处理占位符、  accessToken.json 文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict' //设置为严格模式

const crypto = require('crypto'), //引入加密模块
       https = require('https'), //引入 htts 模块
        util = require('util'), //引入 util 工具包
accessTokenJson = require('./access_token'); //引入本地存储的 access_token

//构建 WeChat 对象 即 js中 函数就是对象
var WeChat = function(config){
    //设置 WeChat 对象属性 config
    this.config = config;
    //设置 WeChat 对象属性 token
    this.token = config.token;
    //设置 WeChat 对象属性 appID
    this.appID = config.appID;
    //设置 WeChat 对象属性 appScrect
    this.appScrect = config.appScrect;
    //设置 WeChat 对象属性 apiDomain
    this.apiDomain = config.apiDomain;
    //设置 WeChat 对象属性 apiURL
    this.apiDomain = config.apiURL;

    //用于处理 https Get请求方法
    this.requestGet = function(url){
        return new Promise(function(resolve,reject){
            https.get(url,function(res){
                var buffer = [],result = &quot;&quot;;
                //监听 data 事件
                res.on('data',function(data){
                    buffer.push(data);
                });
                //监听 数据传输完成事件
                res.on('end',function(){
                    result = Buffer.concat(buffer,buffer.length).toString('utf-8');
                    //将最后结果返回
                    resolve(result);
                });
            }).on('error',function(err){
                reject(err);
            });
        });
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span> <span class="hljs-comment">//设置为严格模式</span>

<span class="hljs-keyword">const</span> crypto = <span class="hljs-built_in">require</span>(<span class="hljs-string">'crypto'</span>), <span class="hljs-comment">//引入加密模块</span>
       https = <span class="hljs-built_in">require</span>(<span class="hljs-string">'https'</span>), <span class="hljs-comment">//引入 htts 模块</span>
        util = <span class="hljs-built_in">require</span>(<span class="hljs-string">'util'</span>), <span class="hljs-comment">//引入 util 工具包</span>
accessTokenJson = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./access_token'</span>); <span class="hljs-comment">//引入本地存储的 access_token</span>

<span class="hljs-comment">//构建 WeChat 对象 即 js中 函数就是对象</span>
<span class="hljs-keyword">var</span> WeChat = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">config</span>)</span>{
    <span class="hljs-comment">//设置 WeChat 对象属性 config</span>
    <span class="hljs-keyword">this</span>.config = config;
    <span class="hljs-comment">//设置 WeChat 对象属性 token</span>
    <span class="hljs-keyword">this</span>.token = config.token;
    <span class="hljs-comment">//设置 WeChat 对象属性 appID</span>
    <span class="hljs-keyword">this</span>.appID = config.appID;
    <span class="hljs-comment">//设置 WeChat 对象属性 appScrect</span>
    <span class="hljs-keyword">this</span>.appScrect = config.appScrect;
    <span class="hljs-comment">//设置 WeChat 对象属性 apiDomain</span>
    <span class="hljs-keyword">this</span>.apiDomain = config.apiDomain;
    <span class="hljs-comment">//设置 WeChat 对象属性 apiURL</span>
    <span class="hljs-keyword">this</span>.apiDomain = config.apiURL;

    <span class="hljs-comment">//用于处理 https Get请求方法</span>
    <span class="hljs-keyword">this</span>.requestGet = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">url</span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
            https.get(url,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{
                <span class="hljs-keyword">var</span> buffer = [],result = <span class="hljs-string">""</span>;
                <span class="hljs-comment">//监听 data 事件</span>
                res.on(<span class="hljs-string">'data'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
                    buffer.push(data);
                });
                <span class="hljs-comment">//监听 数据传输完成事件</span>
                res.on(<span class="hljs-string">'end'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                    result = Buffer.concat(buffer,buffer.length).toString(<span class="hljs-string">'utf-8'</span>);
                    <span class="hljs-comment">//将最后结果返回</span>
                    resolve(result);
                });
            }).on(<span class="hljs-string">'error'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
                reject(err);
            });
        });
    }
}</code></pre>
<p>  在 wechat.js  添加获取 access_token 的方法 getAccessToken</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 获取微信 access_token
 */
WeChat.prototype.getAccessToken = function(){
    var that = this;
    return new Promise(function(resolve,reject){
        //获取当前时间 
        var currentTime = new Date().getTime();
        //格式化请求地址
        var url = util.format(that.apiURL.accessTokenApi,that.apiDomain,that.appID,that.appScrect);
        //判断 本地存储的 access_token 是否有效
        if(accessTokenJson.access_token === &quot;&quot; || accessTokenJson.expires_time < currentTime){
            that.requestGet(url).then(function(data){
                var result = JSON.parse(data); 
                if(data.indexOf(&quot;errcode&quot;) < 0){
                    accessTokenJson.access_token = result.access_token;
                    accessTokenJson.expires_time = new Date().getTime() + (parseInt(result.expires_in) - 200) * 1000;
                    //更新本地存储的
                    fs.writeFile('./wechat/access_token.json',JSON.stringify(accessTokenJson));
                    //将获取后的 access_token 返回
                    resolve(accessTokenJson.access_token);
                }else{
                    //将错误返回
                    resolve(result);
                } 
            });
        }else{
            //将本地存储的 access_token 返回
            resolve(accessTokenJson.access_token);  
        }
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 获取微信 access_token
 */</span>
WeChat.prototype.getAccessToken = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
        <span class="hljs-comment">//获取当前时间 </span>
        <span class="hljs-keyword">var</span> currentTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
        <span class="hljs-comment">//格式化请求地址</span>
        <span class="hljs-keyword">var</span> url = util.format(that.apiURL.accessTokenApi,that.apiDomain,that.appID,that.appScrect);
        <span class="hljs-comment">//判断 本地存储的 access_token 是否有效</span>
        <span class="hljs-keyword">if</span>(accessTokenJson.access_token === <span class="hljs-string">""</span> || accessTokenJson.expires_time &lt; currentTime){
            that.requestGet(url).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
                <span class="hljs-keyword">var</span> result = <span class="hljs-built_in">JSON</span>.parse(data); 
                <span class="hljs-keyword">if</span>(data.indexOf(<span class="hljs-string">"errcode"</span>) &lt; <span class="hljs-number">0</span>){
                    accessTokenJson.access_token = result.access_token;
                    accessTokenJson.expires_time = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime() + (<span class="hljs-built_in">parseInt</span>(result.expires_in) - <span class="hljs-number">200</span>) * <span class="hljs-number">1000</span>;
                    <span class="hljs-comment">//更新本地存储的</span>
                    fs.writeFile(<span class="hljs-string">'./wechat/access_token.json'</span>,<span class="hljs-built_in">JSON</span>.stringify(accessTokenJson));
                    <span class="hljs-comment">//将获取后的 access_token 返回</span>
                    resolve(accessTokenJson.access_token);
                }<span class="hljs-keyword">else</span>{
                    <span class="hljs-comment">//将错误返回</span>
                    resolve(result);
                } 
            });
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-comment">//将本地存储的 access_token 返回</span>
            resolve(accessTokenJson.access_token);  
        }
    });
}</code></pre>
<p>  在 app.js  中添加新的监听链接用于测试 我们获取的token</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//用于请求获取 access_token
app.get('/getAccessToken',function(req,res){
    wechatApp.getAccessToken().then(function(data){
        res.send(data);
    });    
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//用于请求获取 access_token</span>
app.get(<span class="hljs-string">'/getAccessToken'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res</span>)</span>{
    wechatApp.getAccessToken().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
        res.send(data);
    });    
});</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012428090?w=2354&amp;h=1316" src="https://static.alili.tech/img/remote/1460000012428090?w=2354&amp;h=1316" alt="获取access_token的效果图" title="获取access_token的效果图" style="cursor: pointer; display: inline;"></span></p>
<p>  这样我们就大功告成了！</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012428091?w=440&amp;h=440" src="https://static.alili.tech/img/remote/1460000012428091?w=440&amp;h=440" alt="年轻人恭喜你" title="年轻人恭喜你" style="cursor: pointer; display: inline;"></span></p>
<p>  文章源代码：<a href="https://github.com/SilenceHVK/wechatByNode" rel="nofollow noreferrer" target="_blank">https://github.com/SilenceHVK...</a> 。对文章有不正确之处，请给予纠正。github源代码请顺手给个 Star，最后感谢您的阅读。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【Node.js 微信公众号实战】2.Node.js access_token的获取、存储及更新

## 原文链接
[https://segmentfault.com/a/1190000012428077](https://segmentfault.com/a/1190000012428077)

