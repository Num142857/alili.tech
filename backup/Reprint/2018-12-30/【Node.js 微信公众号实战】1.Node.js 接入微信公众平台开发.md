---
title: '【Node.js 微信公众号实战】1.Node.js 接入微信公众平台开发' 
date: 2018-12-30 2:30:10
hidden: true
slug: oqn50rvq4ce
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、写在前面的话</h2>
<blockquote>  Node.js是一个开放源代码、跨平台的JavaScript语言运行环境，采用Google开发的V8运行代码,使用事件驱动、非阻塞和异步输入输出模型等技术来提高性能，可优化应用程序的传输量和规模。这些技术通常用于数据密集的事实应用程序。——<a href="https://zh.wikipedia.org/wiki/Node.js" rel="nofollow noreferrer" target="_blank">来自维基百科</a>
</blockquote>
<p>  最近花了差不多近一个月的时间去学习Node.js，由于它的代码语言是 Javascript ，因此对于语法上就没有过多的去研究，毕竟做过Web开发的程序员，很少有不会Javascript的。而写这篇文章，也只是为了<br><span class="img-wrap"><img data-src="/img/remote/1460000016526993?w=240&amp;h=240" src="https://static.alili.tech/img/remote/1460000016526993?w=240&amp;h=240" alt="记录装逼的过程" title="记录装逼的过程" style="cursor: pointer; display: inline;"></span></p>
<p>如有不正确的地方，希望大家指正。</p>
<h2 id="articleHeader1">二、准备工作</h2>
<p>  在正式开始码代码之前，我们需要准备以下东西：</p>
<ol>
<li>搭建 Node 环境。Node的安装过程太过简单，网上也有太多的教程，大家可以自行百度；</li>
<li>申请微信公众号，同样这里也不做介绍，大家自行百度。</li>
<li>服务器和域名。</li>
<li>打开 Node.js中文网文档</li>
<li>打开 微信开发者文档</li>
</ol>
<h2 id="articleHeader2">三、接入微信公众平台</h2>
<h3 id="articleHeader3">1.创建Node.js 项目</h3>
<p>  首先我们在电脑的任意磁盘上创建文件夹，命名随意，我这命名为 wechat;<br>  随后在文件夹中创建两个文件,一个是config.json，另一个为app.js。如下图所示：<br><span class="img-wrap"><img data-src="/img/remote/1460000016526994?w=1167&amp;h=624" src="https://static.alili.tech/img/remote/1460000016526994?w=1167&amp;h=624" alt="Node.js项目" title="Node.js项目" style="cursor: pointer;"></span><br>PS:这里我的 IDE 是 VSCode，各位可随意使用自己喜欢的 IDE。</p>
<p>  为了后续功能的扩展，我加入了Express框架，具体操作如下：</p>
<ol><li>电脑打开运行界面，快捷键为：win+R，输入cmd后回车，进入dos界面，输入命令</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" npm install -g express" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;"> npm <span class="hljs-keyword">install</span> -g express</code></pre>
<p>进行全局安装；由于 Express 自 4.x 版本中将命令工具分离出来，因此还需要输入下一个命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g express-generator@4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code style="word-break: break-word; white-space: initial;">npm install -g express-generator<span class="hljs-symbol">@4</span></code></pre>
<p>安装成功后，在dos界面中输入以下 命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="express -h" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">express -h</span></code></pre>
<p>结果如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016526995?w=677&amp;h=442" src="https://static.alili.tech/img/remote/1460000016526995?w=677&amp;h=442" alt="express 安装成功" title="express 安装成功" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016526996" src="https://static.alili.tech/img/remote/1460000016526996" alt="震惊" title="震惊" style="cursor: pointer; display: inline;"></span>什么？你的运行结果提示：express不是内部或外部命令。那你必须要检查一下安装 node.js 的时候有没有添加环境变量。点击<a href="http://jingyan.baidu.com/article/1876c8529c79e2890b1376dd.html?st=2&amp;net_type=&amp;bd_page_type=1&amp;os=0&amp;rst=&amp;word=WWWDHZJS.ORG" rel="nofollow noreferrer" target="_blank">解决express不是内部或外部命令问题</a></p>
<h3 id="articleHeader4">2.微信文档步骤</h3>
<p>  如果在没有考虑清楚之前，就开始码代码的话，这样做是非常危险的。我们先打开微信文档，点击 开始开发 中的 接入指南，如图：<br><span class="img-wrap"><img data-src="/img/remote/1460000016526997?w=1103&amp;h=537" src="https://static.alili.tech/img/remote/1460000016526997?w=1103&amp;h=537" alt="接入指南" title="接入指南" style="cursor: pointer;"></span></p>
<p>跳过第一步，直接看第二步，如图：<br><span class="img-wrap"><img data-src="/img/remote/1460000016526998" src="https://static.alili.tech/img/remote/1460000016526998" alt="验证消息来自微信服务器" title="验证消息来自微信服务器" style="cursor: pointer; display: inline;"></span></p>
<p>正如帮助文档所说的那样，我们总结以四个步骤：</p>
<ol>
<li>获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr</li>
<li>将token、timestamp、nonce三个参数进行字典序排序</li>
<li>将三个参数字符串拼接成一个字符串进行sha1加密</li>
<li>开发者获得加密后的字符串可与signature对比，标识该请求来源于微信</li>
</ol>
<h3 id="articleHeader5">3.接入功能的实现</h3>
<p>   整理好思路后我们就按照上一节的步骤去实现。首先我们在打开 config.json 文件,输入以下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;token&quot;:&quot;wechat&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"token"</span>:<span class="hljs-string">"wechat"</span>
}</code></pre>
<p>   config.json 文件是我们程序的配置文件，在后面的文章中，我们会将程序名称、微信定义的参数名称、请求地址等配置内容存放在该文件中。<br>   打开 app.js 文件，该文件属于我们程序的入口，在文件启动及以后路由配置都是再次实现的，首先我们导入重要的模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const express = require('express'), //express 框架 
       crypto = require('crypto'),  //引入加密模块
       config = require('./config');//引入配置文件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>), <span class="hljs-comment">//express 框架 </span>
       crypto = <span class="hljs-built_in">require</span>(<span class="hljs-string">'crypto'</span>),  <span class="hljs-comment">//引入加密模块</span>
       config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./config'</span>);<span class="hljs-comment">//引入配置文件</span></code></pre>
<p>上面的代码不难理解，require  就是导入模块的意思。这里主要针对我们自定义的config.json文件讲解一下：<br> "./" 表示与 app.js 在同一及目录下，为什么要这么写呢？原因很简单就是在我们通过 npm 命令安装模块时，如果我们指定了全局安装，也就是 -g，安装后的文件则会保存在我们 node.js 安装路径下的 node_modules 文件夹中；同理，我们不指定全局安装，安装后的文件则会保存在我们安装命令输入时所在的文件夹根目录下的  node_modules  文件夹中，此时如果没有该文件，系统会自动创建。</p>
<p> 这里我们都是使用  require 去导入模块的，node.js 怎么分辨系统模块和我们自定义的模块呢，聪明的你一定想到了，没错就是 "./" 这个，如果你不想用它的话，你也可以把自定义的模块文件移到  node_modules 文件夹中。</p>
<p>  require 是通过模块名称去导入模块文件的，因此在引入的时候不需要写入文件的后缀名。如果两个文件重名，但后缀名不同， require  会按照 Node.js 的加载优先级顺序进行导入，即 js文件 &gt; json文件 &gt; node文件。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016526999" src="https://static.alili.tech/img/remote/1460000016526999" alt="原来如此" title="原来如此" style="cursor: pointer; display: inline;"></span><br> 实际上就是这么简单，我们也就不再纠结这个问题，继续下面的工作。</p>
<p>   实例 express 以及 创建服务器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//实例 express
var app = express();
//用于处理所有进入 3000 端口 get 的连接请求
app.get('/',function(req,res){
    //对请求连接返回内容
    res.send(&quot;Hello Node.js&quot;);
});
//监听3000端口
app.listen(3000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//实例 express</span>
<span class="hljs-keyword">var</span> app = express();
<span class="hljs-comment">//用于处理所有进入 3000 端口 get 的连接请求</span>
app.get(<span class="hljs-string">'/'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res</span>)</span>{
    <span class="hljs-comment">//对请求连接返回内容</span>
    res.send(<span class="hljs-string">"Hello Node.js"</span>);
});
<span class="hljs-comment">//监听3000端口</span>
app.listen(<span class="hljs-number">3000</span>);</code></pre>
<p>  上面的代码通过注释，我们就能明白其意思，这里我就不再做细致的讲解。再次进入 dos 界面，通过命令进入我们项目的文件的根目录下，如图：<br><span class="img-wrap"><img data-src="/img/remote/1460000016527000?w=677&amp;h=442" src="https://static.alili.tech/img/remote/1460000016527000?w=677&amp;h=442" alt="进入项目根目录下" title="进入项目根目录下" style="cursor: pointer; display: inline;"></span><br>输入命令，启动我们的Node.js项目</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node app.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">node</span> <span class="hljs-title">app</span>.js</code></pre>
<p>启动成功后，我们打开浏览器输入地址：<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000 访问我们的node.js项目，如图<br><span class="img-wrap"><img data-src="/img/remote/1460000016527001?w=677&amp;h=442" src="https://static.alili.tech/img/remote/1460000016527001?w=677&amp;h=442" alt="启动node.js项目" title="启动node.js项目" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016527002?w=734&amp;h=533" src="https://static.alili.tech/img/remote/1460000016527002?w=734&amp;h=533" alt="范文结果" title="范文结果" style="cursor: pointer;"></span></p>
<blockquote>小技巧 ：<br>  在每次更改完 node.js 项目后，我们都需要先将 node.js停止（快捷键: Ctrl+C），然后再通过命令再次运行，这样特别麻烦。这里我推荐使用 supervisor  工具，npm 安装命令为：npm install -g supervisor。这样我们启动 node.js 项目命令改为 supervisor app.js，更改项目后只需要保存，刷新浏览器页面就可以得到更改后的结果了。</blockquote>
<p>  完成上面的工作后，我们就可以正式开始写接入微信公众平台的主要代码，废话不多说直接贴代码<br><span class="img-wrap"><img data-src="/img/remote/1460000016527003?w=248&amp;h=220" src="https://static.alili.tech/img/remote/1460000016527003?w=248&amp;h=220" alt="后退！我要开始装逼了" title="后退！我要开始装逼了" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const express = require('express'), //express 框架 
       crypto =  require('crypto'), //引入加密模块
       config = require('./config');//引入配置文件

var app = express();//实例express框架

//用于处理所有进入 3000 端口 get 的连接请求
app.get('/',function(req,res){
    //1.获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr
    var signature = req.query.signature,//微信加密签名
        timestamp = req.query.timestamp,//时间戳
            nonce = req.query.nonce,//随机数
          echostr = req.query.echostr;//随机字符串

    //2.将token、timestamp、nonce三个参数进行字典序排序
    var array = [config.token,timestamp,nonce];
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
});

//监听3000端口
app.listen(3000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>), <span class="hljs-comment">//express 框架 </span>
       crypto =  <span class="hljs-built_in">require</span>(<span class="hljs-string">'crypto'</span>), <span class="hljs-comment">//引入加密模块</span>
       config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./config'</span>);<span class="hljs-comment">//引入配置文件</span>

<span class="hljs-keyword">var</span> app = express();<span class="hljs-comment">//实例express框架</span>

<span class="hljs-comment">//用于处理所有进入 3000 端口 get 的连接请求</span>
app.get(<span class="hljs-string">'/'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res</span>)</span>{
    <span class="hljs-comment">//1.获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr</span>
    <span class="hljs-keyword">var</span> signature = req.query.signature,<span class="hljs-comment">//微信加密签名</span>
        timestamp = req.query.timestamp,<span class="hljs-comment">//时间戳</span>
            nonce = req.query.nonce,<span class="hljs-comment">//随机数</span>
          echostr = req.query.echostr;<span class="hljs-comment">//随机字符串</span>

    <span class="hljs-comment">//2.将token、timestamp、nonce三个参数进行字典序排序</span>
    <span class="hljs-keyword">var</span> array = [config.token,timestamp,nonce];
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
});

<span class="hljs-comment">//监听3000端口</span>
app.listen(<span class="hljs-number">3000</span>);</code></pre>
<h3 id="articleHeader6">4.部署项目</h3>
<p>   完成了代码后我们就可以把项目发布到外网上了，这里我用的是花生壳内网映射外网的软件，各位可以随意使用其他工具。<br>1.打开花生壳的软件，点击内网穿透:<br><span class="img-wrap"><img data-src="/img/remote/1460000016527004" src="https://static.alili.tech/img/remote/1460000016527004" alt="花生壳" title="花生壳" style="cursor: pointer; display: inline;"></span><br>2.点击添加映射<br><span class="img-wrap"><img data-src="/img/remote/1460000016527005" src="https://static.alili.tech/img/remote/1460000016527005" alt="点击添加映射" title="点击添加映射" style="cursor: pointer; display: inline;"></span><br>3.配置映射<br><span class="img-wrap"><img data-src="/img/remote/1460000016527006?w=839&amp;h=460" src="https://static.alili.tech/img/remote/1460000016527006?w=839&amp;h=460" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span><br>  由于微信只接受80端口，我们在映射类型选择为 网站80端口；内网主机就是我们电脑的 IP 地址；内网端口号就是node.js的监听端口；点击确定后，就成功映射到外网了，可以通过花生壳提供的域名进行访问。</p>
<h3 id="articleHeader7">5.接入验证</h3>
<p>  再次进入 <a href="https://mp.weixin.qq.com/" rel="nofollow noreferrer" target="_blank">微信公众平台</a><br>在左侧菜单点击基本配置，如图：<br><span class="img-wrap"><img data-src="/img/remote/1460000016527007?w=732&amp;h=411" src="https://static.alili.tech/img/remote/1460000016527007?w=732&amp;h=411" alt="基本配置" title="基本配置" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016527008" src="https://static.alili.tech/img/remote/1460000016527008" alt="修改服务器配置" title="修改服务器配置" style="cursor: pointer; display: inline;"></span></p>
<p>点击修改配置。其中服务器地址，就是我们外网映射的地址；令牌（Token）就是我们在 config.json 文件中 定义的 token 值；消息加密可以点击随机生成按钮，当然你也可以随便定义；消息加解密方式这块可以随便选择，这里我就使用默认的，如图：<br><span class="img-wrap"><img data-src="/img/remote/1460000016527009" src="https://static.alili.tech/img/remote/1460000016527009" alt="微信服务器配置" title="微信服务器配置" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016527010?w=928&amp;h=703" src="https://static.alili.tech/img/remote/1460000016527010?w=928&amp;h=703" alt="微信公众平台接入" title="微信公众平台接入" style="cursor: pointer; display: inline;"></span></p>
<p>  点击提交按钮，提示 提交成功，那么我就要祝贺你了<span class="img-wrap"><img data-src="/img/remote/1460000016527011?w=300&amp;h=300" src="https://static.alili.tech/img/remote/1460000016527011?w=300&amp;h=300" alt="哎呦不错哦" title="哎呦不错哦" style="cursor: pointer; display: inline;"></span><br>  你已经成功的步入了Node.js开发微信的开发的第一步。</p>
<p>   文章源代码：<a href="https://github.com/SilenceHVK/wechatByNode" rel="nofollow noreferrer" target="_blank">https://github.com/SilenceHVK...</a> 。对文章有不正确之处，请给予纠正。github源代码请顺手给个 Star，最后感谢您的阅读。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【Node.js 微信公众号实战】1.Node.js 接入微信公众平台开发

## 原文链接
[https://segmentfault.com/a/1190000011393747](https://segmentfault.com/a/1190000011393747)

