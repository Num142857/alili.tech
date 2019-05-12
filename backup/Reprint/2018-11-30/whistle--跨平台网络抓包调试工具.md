---
title: 'whistle--跨平台网络抓包调试工具' 
date: 2018-11-30 2:30:11
hidden: true
slug: dpw23v06y4
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">whistle--跨平台网络抓包调试工具</h1>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014891585?w=160&amp;h=160" src="https://static.alili.tech/img/remote/1460000014891585?w=160&amp;h=160" alt="whistle" title="whistle" style="cursor: pointer; display: inline;"></span></p>
<p>[TOC]</p>
<h2 id="articleHeader1">简介</h2>
<p><a href="https://github.com/avwo/whistle" rel="nofollow noreferrer" target="_blank">whistle</a>是一款跨平台的网络抓包调试工具，基于node开发。支持抓包，重放，替换，修改等方式来调试http(s),WebSocket请求，也可以作为普通的http代理。其功能和常用的fiddler(windows),Charles(Mac)工具功能相同，不过对于开发者更加友好，操作和调试更加方便，还支持node模块的插件。</p>
<h2 id="articleHeader2">快速上手</h2>
<h3 id="articleHeader3">安装</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g whistle // 全局安装whistle" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">npm install -g whistle <span class="hljs-comment">// 全局安装whistle</span></code></pre>
<h3 id="articleHeader4">启动</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="w2 start  //启动whistle" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">w2 start  <span class="hljs-comment">//启动whistle</span></code></pre>
<h3 id="articleHeader5">配置代理 (推荐使用浏览器插件)</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="127.0.0.1:8899" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">127<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1</span><span class="hljs-selector-pseudo">:8899</span></code></pre>
<h3 id="articleHeader6">配置规则</h3>
<p>浏览器访问<a href="http://local.whistlejs.com" rel="nofollow noreferrer" target="_blank">http://local.whistlejs.com</a> 打开whistle界面，在rule里面配置:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jd.com  127.0.0.1
taobao.com  127.0.0.1
tmall.com 127.0.0.1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">jd.com  <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>
taobao.com  <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>
tmall.com <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span></code></pre>
<p>OK，就是这么简单</p>
<h2 id="articleHeader7">安装使用</h2>
<p>首先需要安装好node,官方推荐使用最新的LTS版本node</p>
<h3 id="articleHeader8">安装whistle</h3>
<p>node环境配置成功后开始安装whistle，非root用户加sudo</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g whistle" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">npm install -g whistle</code></pre>
<p>安装完成后，执行命令<code>whistle help</code>或者<code>w2 help</code>可以查看whistle的帮助信息，有输出则证明已安装成功</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ w2 help
Usage: whistle <command> [options]

Commands:

    run       Start a front service
    start     Start a background service
    stop      Stop current background service
    restart   Restart current background service
    help      Display help information
    
Options:

    -h, --help                                      output usage information
    -D, --baseDir [baseDir]                         the base dir of config data
    -A, --ATS                                       generate Root CA for iOS ATS (Node >= 6 is required)
    -z, --certDir [directory]                       custom certificate path
    -l, --localUIHost [hostname]                    local ui host (local.whistlejs.com by default)
    -n, --username [username]                       the username of whistle
    -w, --password [password]                       the password of whistle
    -N, --guestName [username]                      the guest name
    -W, --guestPassword [password]                  the guest password
    -s, --sockets [number]                          max sockets (60 by default)
    -S, --storage [newStorageDir]                   the new local storage directory
    -C, --copy [storageDir]                         copy storageDir to newStorageDir
    -c, --dnsCache [time]                           the cache time of DNS (30000ms by default)
    -H, --host [host]                               whistle listening host(:: or 0.0.0.0 by default)
    -p, --port [port]                               whistle listening port (8899 by default)
    -P, --uiport [uiport]                           whistle ui port (8900 by default)
    -m, --middlewares [script path or module name]  express middlewares path (as: xx,yy/zz.js)
    -M, --mode [mode]                               the whistle mode (as: pureProxy|debug|multiEnv)
    -u, --uipath [script path]                      web ui plugin path
    -t, --timeout [ms]                              request timeout (66000 ms by default)
    -e, --extra [extraData]                         extra data for plugin
    -f, --secureFilter [secureFilter]               the script path of secure filter
    -R, --reqCacheSize [reqCacheSize]               the cache size of request data (512 by default)
    -F, --frameCacheSize [frameCacheSize]           the cache size of socket frames (512 by default)
    -V, --version                                   output the version number" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$ w2 help
Usage: whistle &lt;command&gt; [options]

Commands:

    run       Start a front service
    start     Start a background service
    stop      Stop current background service
    restart   Restart current background service
    help      Display help information
    
Options:

    -h, --help                                      output usage information
    -D, --baseDir [baseDir]                         the base dir <span class="hljs-keyword">of</span> config data
    -A, --ATS                                       generate Root CA <span class="hljs-keyword">for</span> iOS ATS (Node &gt;= <span class="hljs-number">6</span> is required)
    -z, --certDir [directory]                       custom certificate path
    -l, --localUIHost [hostname]                    local ui host (local.whistlejs.com by <span class="hljs-keyword">default</span>)
    -n, --username [username]                       the username <span class="hljs-keyword">of</span> whistle
    -w, --password [password]                       the password <span class="hljs-keyword">of</span> whistle
    -N, --guestName [username]                      the guest name
    -W, --guestPassword [password]                  the guest password
    -s, --sockets [number]                          max sockets (<span class="hljs-number">60</span> by <span class="hljs-keyword">default</span>)
    -S, --storage [newStorageDir]                   the <span class="hljs-keyword">new</span> local storage directory
    -C, --copy [storageDir]                         copy storageDir to newStorageDir
    -c, --dnsCache [time]                           the cache time <span class="hljs-keyword">of</span> DNS (<span class="hljs-number">30000</span>ms by <span class="hljs-keyword">default</span>)
    -H, --host [host]                               whistle listening host(:: or <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span> by <span class="hljs-keyword">default</span>)
    -p, --port [port]                               whistle listening port (<span class="hljs-number">8899</span> by <span class="hljs-keyword">default</span>)
    -P, --uiport [uiport]                           whistle ui port (<span class="hljs-number">8900</span> by <span class="hljs-keyword">default</span>)
    -m, --middlewares [script path or <span class="hljs-built_in">module</span> name]  express middlewares path (<span class="hljs-keyword">as</span>: xx,yy/zz.js)
    -M, --mode [mode]                               the whistle mode (<span class="hljs-keyword">as</span>: pureProxy|debug|multiEnv)
    -u, --uipath [script path]                      web ui plugin path
    -t, --timeout [ms]                              request timeout (<span class="hljs-number">66000</span> ms by <span class="hljs-keyword">default</span>)
    -e, --extra [extraData]                         extra data <span class="hljs-keyword">for</span> plugin
    -f, --secureFilter [secureFilter]               the script path <span class="hljs-keyword">of</span> secure filter
    -R, --reqCacheSize [reqCacheSize]               the cache size <span class="hljs-keyword">of</span> request data (<span class="hljs-number">512</span> by <span class="hljs-keyword">default</span>)
    -F, --frameCacheSize [frameCacheSize]           the cache size <span class="hljs-keyword">of</span> socket frames (<span class="hljs-number">512</span> by <span class="hljs-keyword">default</span>)
    -V, --version                                   output the version number</code></pre>
<h3 id="articleHeader9">启动whistle</h3>
<p>新版本的whistle支持三种等价命令<code>whistle</code>,<code>w2</code>,<code>wproxy</code></p>
<p>启动whistle</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="w2 start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">w2 start</code></pre>
<p>重启whistle</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="w2 stop" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">w2 stop</code></pre>
<p>停止whistle</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="w2 stop" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">w2 stop</code></pre>
<p>启动调试模式（启动了一个前台服务,主要用于查看whistle的异常及插件开发）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="w2 run" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">w2 <span class="hljs-keyword">run</span></code><span class="bash"></span></pre>
<h3 id="articleHeader10">配置代理</h3>
<p>代理服务器，如果在本地则为<code>127.0.0.1</code>，如果部署在远程服务器或者虚拟机上，就改成对应IP即可。<br>默认端口为8899，如果端口被占用，要修改端口号，可以通过 <code>-p</code>来指定新的端口号</p>
<p><strong>代理方式</strong></p>
<ol>
<li>
<p>直接配置系统代理</p>
<ul>
<li><a href="http://jingyan.baidu.com/article/0aa22375866c8988cc0d648c.html" rel="nofollow noreferrer" target="_blank">Windows</a></li>
<li><a href="http://jingyan.baidu.com/article/a378c960849144b3282830dc.html" rel="nofollow noreferrer" target="_blank">Mac</a></li>
</ul>
</li>
<li>
<p>安装浏览器代理插件，推荐方式</p>
<ul>
<li>Chrome插件：<a href="https://chrome.google.com/webstore/detail/padekgcemlokbadohgkifijomclgjgif" rel="nofollow noreferrer" target="_blank">SwitchyOmega</a>
</li>
<li>Firefox插件： <a href="https://addons.mozilla.org/zh-cn/firefox/addon/proxy-selector/" rel="nofollow noreferrer" target="_blank">ProxySelector</a>
</li>
</ul>
</li>
<li>移动端需要配置当前WIFI的代理</li>
</ol>
<h2 id="articleHeader11">如何使用</h2>
<p>通过<code>w2 start</code>启动后，访问<a href="http://local.whistlejs.com" rel="nofollow noreferrer" target="_blank">http://local.whistlejs.com</a> 即可打开whistle界面。<br><span class="img-wrap"><img data-src="/img/remote/1460000014891586?w=1808&amp;h=1054" src="https://static.alili.tech/img/remote/1460000014891586?w=1808&amp;h=1054" alt="图片" title="图片" style="cursor: pointer;"></span></p>
<p>所有通过whistle的篡改操作，都可以用过下面的配置方式实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pattern operatorURL" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">pattern</span> operatorURL</code></pre>
<p>pattern为匹配请求URL，支持域名，路径，正则，通配符等多种方式</p>
<p>operatorURI为对应的操作，由协议和值组成（operatorURL = opProtocol://opValue）<br>支持的协议类型：<a href="http://wproxy.org/whistle/rules/" rel="nofollow noreferrer" target="_blank">协议列表</a></p>
<p>PS; {value} 则对应工具栏Values下的文件</p>
<p>两边结合一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 域名匹配IP
 www.example.com  127.0.0.1
 # 带端口的域名匹配
 www.example.com:6666  127.0.0.1
 # 带协议的域名，支持：http、https、ws、wss、tunnel
 http://www.example.com  127.0.0.1

 # 路径匹配，同样支持带协议、端口
 www.example.com/test  http://127.0.0.1:9090
 https:/www.exapmle.com/test http://127.0.0.1:9090
 https:/www.exapmle.com:6666/test  http://127.0.0.1:9090

 # 正则匹配
 /^https?://www\.example\.com\/test/(.*)/ referer://http://www.test.com/$1

 # 通配符匹配
 ^www.example.com/test/*** referer://http://www.test.com/$1
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs x86asm"><code># 域名匹配<span class="hljs-built_in">IP</span>
 www.example.com  <span class="hljs-number">127.0</span><span class="hljs-meta">.0</span><span class="hljs-meta">.1</span>
 # 带端口的域名匹配
<span class="hljs-symbol"> www.example.com:</span><span class="hljs-number">6666</span>  <span class="hljs-number">127.0</span><span class="hljs-meta">.0</span><span class="hljs-meta">.1</span>
 # 带协议的域名，支持：http、https、ws、wss、tunnel
<span class="hljs-symbol"> http:</span>//www.example.com  <span class="hljs-number">127.0</span><span class="hljs-meta">.0</span><span class="hljs-meta">.1</span>

 # 路径匹配，同样支持带协议、端口
 www.example.com/<span class="hljs-keyword">test</span>  http://<span class="hljs-number">127.0</span><span class="hljs-meta">.0</span><span class="hljs-meta">.1</span>:<span class="hljs-number">9090</span>
<span class="hljs-symbol"> https:</span>/www.exapmle.com/<span class="hljs-keyword">test</span> http://<span class="hljs-number">127.0</span><span class="hljs-meta">.0</span><span class="hljs-meta">.1</span>:<span class="hljs-number">9090</span>
<span class="hljs-symbol"> https:</span>/www.exapmle.com:<span class="hljs-number">6666</span>/<span class="hljs-keyword">test</span>  http://<span class="hljs-number">127.0</span><span class="hljs-meta">.0</span><span class="hljs-meta">.1</span>:<span class="hljs-number">9090</span>

 # 正则匹配
 /^https?://www\.example\.com\/<span class="hljs-keyword">test</span>/(.*)/ referer://http://www.test.com/<span class="hljs-number">$1</span>

 # 通配符匹配
 ^www.example.com/<span class="hljs-keyword">test</span>/*** referer://http://www.test.com/<span class="hljs-number">$1</span>
</code></pre>
<h2 id="articleHeader12">功能详解</h2>
<p>whistle功能概括：<br><span class="img-wrap"><img data-src="/img/remote/1460000014891587?w=1829&amp;h=1725" src="https://static.alili.tech/img/remote/1460000014891587?w=1829&amp;h=1725" alt="" title="" style="cursor: pointer;"></span></p>
<h4>代理设置</h4>
<h5>设置http代理</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pattern proxy://ip:port
# 加用户名密码
pattern proxy://username:password@ip:port
www.jd.com proxy://test:123@127.0.0.1:8888" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">pattern</span> proxy://ip:port
<span class="hljs-comment"># 加用户名密码</span>
pattern proxy://username:password<span class="hljs-variable">@ip</span>:port
www.jd.com proxy://test:123@127.0.0.1:8888</code></pre>
<h5>设置socks代理</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pattern socks://ip:port
# 加用户名密码
pattern socks://username:password@ip:port

www.jd.com socks://test:123@127.0.0.1:8888" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">pattern</span> socks://ip:port
<span class="hljs-comment"># 加用户名密码</span>
pattern socks://username:password<span class="hljs-variable">@ip</span>:port

www.jd.com socks://test:123@127.0.0.1:8888</code></pre>
<h5>设置pac代理</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pattern pac://filepath

/./ pac://https://raw.githubusercontent.com/imweb/node-pac/master/test/scripts/normal.pac" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>pattern pac:<span class="hljs-regexp">//</span>filepath

<span class="hljs-regexp">/./</span> pac:<span class="hljs-regexp">//</span>https:<span class="hljs-regexp">//</span>raw.githubusercontent.com<span class="hljs-regexp">/imweb/</span>node-pac<span class="hljs-regexp">/master/</span>test<span class="hljs-regexp">/scripts/</span>normal.pac</code></pre>
<h5>设置反向代理</h5>
<p>区别于正向代理，具体可参考 <a href="https://www.cnblogs.com/Anker/p/6056540.html" rel="nofollow noreferrer" target="_blank">正向代理与反向代理</a><br>whistle作为反向代理只支持http访问，启动whistle时设置监听的端口为6060:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="w2 start -p 6060
#或
w2 restart -p 6060" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>w2 start -<span class="hljs-selector-tag">p</span> <span class="hljs-number">6060</span>
#或
w2 restart -<span class="hljs-selector-tag">p</span> <span class="hljs-number">6060</span></code></pre>
<p>非root用户需要加<code>sudo w2 start -p 6060</code>。 ​ 根据域名、或路径、或正则表达式配置带端口的host：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="localhost:6060/aa host://10.8.43.82:8080
localhost:6060/bb host://10.8.43.82:8081" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">localhost</span>:<span class="hljs-number">6060</span>/aa <span class="hljs-attribute">host</span>:<span class="hljs-comment">//10.8.43.82:8080</span>
<span class="hljs-attribute">localhost</span>:<span class="hljs-number">6060</span>/bb <span class="hljs-attribute">host</span>:<span class="hljs-comment">//10.8.43.82:8081</span></code></pre>
<p>这样访问localhost:6060的请求会自动转到8080或8181端口，实现无端口访问。 PS：如果要用IP访问，可以采用 <a href="http://127.0.0.1/-/xxx" rel="nofollow noreferrer" target="_blank">http://127.0.0.1/-/xxx</a> 或 <a href="http://127.0.0.1/_/xxx" rel="nofollow noreferrer" target="_blank">http://127.0.0.1/_/xxx</a>，whistle会自动转成 <a href="http://127.0.0.1/xxx" rel="nofollow noreferrer" target="_blank">http://127.0.0.1/xxx</a></p>
<h4>移动端调试</h4>
<p>移动端调试的时候需要在同一个局域网内，涉及到https的连接需要开启https拦截。</p>
<h5>开启https拦截</h5>
<p>如果要拦截https和websockets请求，必须安装根证书和开启https拦截。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014891588?w=1283&amp;h=767" src="https://static.alili.tech/img/remote/1460000014891588?w=1283&amp;h=767" alt="下载根证书" title="下载根证书" style="cursor: pointer;"></span></p>
<p>在工具栏=&gt;https 下载 RootCA, 并勾选 <code>intercept HTTPS CONNECTs</code> 选项</p>
<h5>安装CA证书</h5>
<p>具体参见：<a href="http://wproxy.org/whistle/webui/https.html" rel="nofollow noreferrer" target="_blank">安装根证书</a></p>
<h5>设置手机代理</h5>
<p>设置 =&gt; 无线局域网 =&gt; 找到对应局域网点击感叹号 =&gt; HTTP代理 配置代理 =&gt; 选择手动 =&gt; 填写whistle服务的IP和端口号</p>
<p>PS: 如果配置完代理，手机无法访问，可能是whistle所在的电脑防火墙限制了远程访问whistle的端口，关闭防火墙或者设置白名单： <a href="http://jingyan.baidu.com/article/870c6fc317cae7b03ee4be48.html" rel="nofollow noreferrer" target="_blank">http://jingyan.baidu.com/arti...</a></p>
<h5>访问界面</h5>
<p>whistle集成了weinre的功能，只需要简单配置<code>pattern weinre://id</code>即可使用。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014891589?w=1283&amp;h=767" src="https://static.alili.tech/img/remote/1460000014891589?w=1283&amp;h=767" alt="weinre in whistle" title="weinre in whistle" style="cursor: pointer;"></span></p>
<p>然后点击工具栏的weinre，选择对应的ID打开weinre界面</p>
<h5>移动调试</h5>
<p>相对于PC调试，移动端调试会常遇到以下问题</p>
<ol>
<li>无法通过console输出错误，也无法看到页面的js报错</li>
<li>无法查看和修改页面的DOM和样式</li>
<li>无法debug</li>
</ol>
<h6>1.来捕获页面的错误和log</h6>
<p>whistle可以通过类似console的log平台，来捕获页面的错误和log</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="www.jd.com log://
# 如果你想同时注入js脚本，可以用下面一种方式
# 在mac或linux中
www.jd.com log:////Users/willhu/work/whistle-test/log-test.js
# 在windows中
www.jd.com log://D:\xxx\test.js
# 直接从whistle的Values配置的key-value里面获取脚本
www.jd.com log://{log-test.js}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>www.jd.<span class="hljs-keyword">com</span> <span class="hljs-keyword">lo</span><span class="hljs-variable">g:</span>//
# 如果你想同时注入js脚本，可以用下面一种方式
# 在mac或linux中
www.jd.<span class="hljs-keyword">com</span> <span class="hljs-keyword">lo</span><span class="hljs-variable">g:</span>////Users/willhu/work/whistle-test/<span class="hljs-built_in">log</span>-test.js
# 在windows中
www.jd.<span class="hljs-keyword">com</span> <span class="hljs-keyword">lo</span><span class="hljs-variable">g:</span>//D:\xxx\test.js
# 直接从whistle的Values配置的key-value里面获取脚本
www.jd.<span class="hljs-keyword">com</span> <span class="hljs-keyword">lo</span><span class="hljs-variable">g:</span>//{<span class="hljs-built_in">log</span>-test.js}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014891590?w=1295&amp;h=652" src="https://static.alili.tech/img/remote/1460000014891590?w=1295&amp;h=652" alt="log-test" title="log-test" style="cursor: pointer; display: inline;"></span></p>
<h6>2.查看、修改页面的DOM和样式</h6>
<p>集成了weinre的功能，用户只需通过简单配置(pattern weinre://id)即可使用即可通过在pc上通过weinre修改网页的DOM结构及其样式,这里的ID只是一个分类，避免一个weinre调试页面出现太多链接</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="m.jd.com weinre://test-weinre" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">m<span class="hljs-selector-class">.jd</span><span class="hljs-selector-class">.com</span> weinre:<span class="hljs-comment">//test-weinre</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014891591?w=1295&amp;h=652" src="https://static.alili.tech/img/remote/1460000014891591?w=1295&amp;h=652" alt="test-weinre" title="test-weinre" style="cursor: pointer;"></span></p>
<h6>3. 暂不支持debug功能,可以通过log来替代</h6>
<p>推荐腾讯的vConsole插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="m.jd.com js:///Users/willhu/work/whistle-test/vconsole.min.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">m<span class="hljs-selector-class">.jd</span><span class="hljs-selector-class">.com</span> js:<span class="hljs-comment">///Users/willhu/work/whistle-test/vconsole.min.js</span></code></pre>
<p>vConsole: <a href="https://github.com/Tencent/vConsole" rel="nofollow noreferrer" target="_blank">https://github.com/Tencent/vC...</a></p>
<p>demo: <a href="http://wechatfe.github.io/vconsole/demo.html" rel="nofollow noreferrer" target="_blank">vConsole</a></p>
<h4>文件导入导出</h4>
<p>在network中右键点击请求列表，可以将请求的数据导出到txt.saz文件，也可导入txt.saz.har文件。</p>
<h4>抓包重放</h4>
<h5>查看请求响应数据</h5>
<p>在network中可以看到每条请求的详细情况。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014891592?w=1280&amp;h=710" src="https://static.alili.tech/img/remote/1460000014891592?w=1280&amp;h=710" alt="network" title="network" style="cursor: pointer;"></span></p>
<h5>重放请求</h5>
<p>打开network ==&gt; 选中请求 ==&gt; 右键选择replay</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014891593?w=866&amp;h=880" src="https://static.alili.tech/img/remote/1460000014891593?w=866&amp;h=880" alt="replay-w433" title="replay-w433" style="cursor: pointer;"></span></p>
<p><em>重构请求</em></p>
<p>可以自定义请求的URL、请求方法、请求头，请求内容<br><span class="img-wrap"><img data-src="/img/remote/1460000014891594?w=1283&amp;h=767" src="https://static.alili.tech/img/remote/1460000014891594?w=1283&amp;h=767" alt="Composer" title="Composer" style="cursor: pointer;"></span></p>
<h5>请求和响应修改</h5>
<h6>修改请求URL或者参数</h6>
<p>设置静态规则列表</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pattern reqScript://filepath
www.jd.com reqScript:///Users/willhu/work/whistle-test/rulelist.txt" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>pattern reqScript:<span class="hljs-comment">//filepath</span>
www<span class="hljs-selector-class">.jd</span><span class="hljs-selector-class">.com</span> reqScript:<span class="hljs-comment">///Users/willhu/work/whistle-test/rulelist.txt</span></code></pre>
<p>rulelist.txt如果文件的第一行为规则的注释，即<code>#</code>开头则任务filepath指定的是规则列表，会加载该列表，并进行二次匹配获取规则</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# rules
pattern1 operatorURI1
pattern2 operatorURI2
patternN operatorURIN" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-comment"># rules</span>
<span class="hljs-attribute">pattern1</span> operatorURI1
pattern2 operatorURI2
patternN operatorURIN</code></pre>
<p>通过脚本设置规则列表</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="www.jd.com reqScript://{rulelist.js}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">www<span class="hljs-selector-class">.jd</span><span class="hljs-selector-class">.com</span> reqScript:<span class="hljs-comment">//{rulelist.js}</span></code></pre>
<h6>设置服务器IP(host)</h6>
<p>支持两种配置方式，这样就不用查找本机的host文件了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ip pattern
或者
pattern host://ip" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>ip <span class="hljs-built_in">pattern</span>
或者
<span class="hljs-built_in">pattern</span> host://ip</code></pre>
<p>例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 传统hosts配置
127.0.0.1 www.example.com # 等价于： www.example.com  127.0.0.1
127.0.0.1 a.example.com b.example.com c.example.com

# 支持带端口
127.0.0.1:8080 www.example.com # 等价于： www.example.com  127.0.0.1：8080
127.0.0.1:8080 a.example.com b.example.com c.example.com

# 支持通过域名获取host，类似DNS的cname
host://www.qq.com:8080 www.example.com # 等价于： www.example.com  host://www.qq.com:8080
host://www.qq.com:8080 a.example.com b.example.com c.example.com

# 支持通过正则表达式匹配
127.0.0.1:8080 /example\.com/i # 等价于： /example\.com/i  127.0.0.1：8080
127.0.0.1:8080 /example\.com/ /test\.com/

# 支持路径匹配
127.0.0.1:8080 example.com/test # 等价于： example.com/test 127.0.0.1：8080
127.0.0.1:8080 http://example.com:5555/index.html www.example.com:6666 https://www.test.com/test

# 支持精确匹配
127.0.0.1:8080 $example.com/test # 等价于： $example.com/test 127.0.0.1：8080
127.0.0.1:8080 $http://example.com:5555/index.html $www.example.com:6666 $https://www.test.com/test" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code># 传统hosts配置
<span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span> www.example.<span class="hljs-keyword">com</span> # 等价于： www.example.<span class="hljs-keyword">com</span>  <span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>
<span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span> <span class="hljs-keyword">a</span>.example.<span class="hljs-keyword">com</span> <span class="hljs-keyword">b</span>.example.<span class="hljs-keyword">com</span> <span class="hljs-keyword">c</span>.example.<span class="hljs-keyword">com</span>

# 支持带端口
<span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>:<span class="hljs-number">8080</span> www.example.<span class="hljs-keyword">com</span> # 等价于： www.example.<span class="hljs-keyword">com</span>  <span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>：<span class="hljs-number">8080</span>
<span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>:<span class="hljs-number">8080</span> <span class="hljs-keyword">a</span>.example.<span class="hljs-keyword">com</span> <span class="hljs-keyword">b</span>.example.<span class="hljs-keyword">com</span> <span class="hljs-keyword">c</span>.example.<span class="hljs-keyword">com</span>

# 支持通过域名获取host，类似DNS的cname
hos<span class="hljs-variable">t:</span>//www.qq.<span class="hljs-keyword">com</span>:<span class="hljs-number">8080</span> www.example.<span class="hljs-keyword">com</span> # 等价于： www.example.<span class="hljs-keyword">com</span>  hos<span class="hljs-variable">t:</span>//www.qq.<span class="hljs-keyword">com</span>:<span class="hljs-number">8080</span>
hos<span class="hljs-variable">t:</span>//www.qq.<span class="hljs-keyword">com</span>:<span class="hljs-number">8080</span> <span class="hljs-keyword">a</span>.example.<span class="hljs-keyword">com</span> <span class="hljs-keyword">b</span>.example.<span class="hljs-keyword">com</span> <span class="hljs-keyword">c</span>.example.<span class="hljs-keyword">com</span>

# 支持通过正则表达式匹配
<span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>:<span class="hljs-number">8080</span> /example\.<span class="hljs-keyword">com</span>/i # 等价于： /example\.<span class="hljs-keyword">com</span>/i  <span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>：<span class="hljs-number">8080</span>
<span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>:<span class="hljs-number">8080</span> /example\.<span class="hljs-keyword">com</span>/ /test\.<span class="hljs-keyword">com</span>/

# 支持路径匹配
<span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>:<span class="hljs-number">8080</span> example.<span class="hljs-keyword">com</span>/test # 等价于： example.<span class="hljs-keyword">com</span>/test <span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>：<span class="hljs-number">8080</span>
<span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>:<span class="hljs-number">8080</span> http://example.<span class="hljs-keyword">com</span>:<span class="hljs-number">5555</span>/<span class="hljs-built_in">index</span>.html www.example.<span class="hljs-keyword">com</span>:<span class="hljs-number">6666</span> http<span class="hljs-variable">s:</span>//www.test.<span class="hljs-keyword">com</span>/test

# 支持精确匹配
<span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>:<span class="hljs-number">8080</span> $example.<span class="hljs-keyword">com</span>/test # 等价于： $example.<span class="hljs-keyword">com</span>/test <span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>：<span class="hljs-number">8080</span>
<span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>:<span class="hljs-number">8080</span> $http://example.<span class="hljs-keyword">com</span>:<span class="hljs-number">5555</span>/<span class="hljs-built_in">index</span>.html $www.example.<span class="hljs-keyword">com</span>:<span class="hljs-number">6666</span> $http<span class="hljs-variable">s:</span>//www.test.<span class="hljs-keyword">com</span>/test</code></pre>
<h6>替换请求</h6>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://jd.com https://baidu.com/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code style="word-break: break-word; white-space: initial;">http<span class="hljs-variable">s:</span>//jd.<span class="hljs-keyword">com</span> http<span class="hljs-variable">s:</span>//baidu.<span class="hljs-keyword">com</span>/</code></pre>
<h6>修改请求方法</h6>
<p>配置方式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pattern method://newMethod
jd.com method://post" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code>pattern <span class="hljs-function"><span class="hljs-keyword">method</span>:</span><span class="hljs-comment">//newMethod</span>
jd.com <span class="hljs-function"><span class="hljs-keyword">method</span>:</span><span class="hljs-comment">//post</span></code></pre>
<h6>修改请求头</h6>
<p>修改请求头，配置方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pattern reqHeaders://filepath
jd.com reqHeaders://{reqHeaders.json}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>pattern <span class="hljs-string">reqHeaders:</span><span class="hljs-comment">//filepath</span>
jd.com <span class="hljs-string">reqHeaders:</span><span class="hljs-comment">//{reqHeaders.json}</span></code></pre>
<h6>修改请求内容</h6>
<p>把指定的内容替换请求内容(GET等请求没有内容没有替换一说)，配置方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pattern reqBody://filepath
www.jd.com method://post reqBody://{test-reqBody.html}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code>pattern reqBody:<span class="hljs-comment">//filepath</span>
www.jd.com <span class="hljs-function"><span class="hljs-keyword">method</span>:</span><span class="hljs-comment">//post reqBody://{test-reqBody.html}</span></code></pre>
<h6>注入或替换内容</h6>
<p>把指定的内容添加到请求内容前面(GET等请求没有内容无法添加)，配置方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pattern reqPrepend://filepath" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">pattern <span class="hljs-string">reqPrepend:</span><span class="hljs-comment">//filepath</span></code></pre>
<h6>限速或者延迟请求</h6>
<p>延迟请求</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pattern reqDelay://timeMS
www.jd.com reqDelay://3000" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>pattern reqDelay:<span class="hljs-comment">//timeMS</span>
www<span class="hljs-selector-class">.jd</span><span class="hljs-selector-class">.com</span> reqDelay:<span class="hljs-comment">//3000</span></code></pre>
<p>设置速度</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pattern reqSpeed://kbs
www.jd.com reqSpeed://3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>pattern reqSpeed:<span class="hljs-comment">//kbs</span>
www<span class="hljs-selector-class">.jd</span><span class="hljs-selector-class">.com</span> reqSpeed:<span class="hljs-comment">//3</span></code></pre>
<h6>修改相应状态码</h6>
<p>设置响应状态码(状态码范围100~999)，请求会直接根据设置的状态码返回，不会请求到线上，配置方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pattern statusCode://code
jd.com statusCode://404" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>pattern <span class="hljs-string">statusCode:</span><span class="hljs-comment">//code</span>
jd.com <span class="hljs-string">statusCode:</span><span class="hljs-comment">//404</span></code></pre>
<h6>修改响应头</h6>
<p>方式同请求头</p>
<h6>修改响应内容</h6>
<p>把指定的内容替换响应内容(304等响应没有内容无法替换)，配置方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pattern resBody://filepath
st.360buyimg.com/m/css/2014/layout/layout2015.css resBody://{myAppend.css}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>pattern <span class="hljs-string">resBody:</span><span class="hljs-comment">//filepath</span>
st<span class="hljs-number">.360</span>buyimg.com<span class="hljs-regexp">/m/</span>css<span class="hljs-regexp">/2014/</span>layout<span class="hljs-regexp">/layout2015.css resBody:/</span>/{myAppend.css}</code></pre>
<h6>注入或者替换内容</h6>
<p>把指定的内容追加到响应内容后面(304等响应没有内容无法追加)，配置方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pattern resAppend://filepath
st.360buyimg.com/m/css/2014/layout/layout2015.css resAppend://{myAppend.css}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>pattern <span class="hljs-string">resAppend:</span><span class="hljs-comment">//filepath</span>
st<span class="hljs-number">.360</span>buyimg.com<span class="hljs-regexp">/m/</span>css<span class="hljs-regexp">/2014/</span>layout<span class="hljs-regexp">/layout2015.css resAppend:/</span>/{myAppend.css}</code></pre>
<h5>限制速度或延迟响应</h5>
<p>延迟响应</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pattern resDelay://timeMS
www.jd.com resDelay://3000" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>pattern resDelay:<span class="hljs-comment">//timeMS</span>
www<span class="hljs-selector-class">.jd</span><span class="hljs-selector-class">.com</span> resDelay:<span class="hljs-comment">//3000</span></code></pre>
<p>设置速度</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pattern resSpeed://kbs
www.jd.com resSpeed://3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>pattern resSpeed:<span class="hljs-comment">//kbs</span>
www<span class="hljs-selector-class">.jd</span><span class="hljs-selector-class">.com</span> resSpeed:<span class="hljs-comment">//3</span></code></pre>
<h4>插件扩展</h4>
<p>有些很少用的功能，及一些跟业务相关的功能，考虑到会导致安装过程比较长或者占用内存空间或者适应范围比较小，whistle没有把这些功能加进去，但提供了插件的方式扩展这些功能。whistle本身就是一个Node模块，只需要按照whistle.xxx的形式命名即可。</p>
<p>编写whistle插件：<a href="http://wproxy.org/whistle/plugins.html" rel="nofollow noreferrer" target="_blank">如何编写插件</a></p>
<p>官方提供的插件列表：<a href="https://github.com/whistle-plugins" rel="nofollow noreferrer" target="_blank">官方插件列表</a></p>
<h4>socket和websocket</h4>
<p><a href="http://imweb.io/topic/5a11b1b8ef79bc941c30d91a" rel="nofollow noreferrer" target="_blank">利用whistle调试socket和webscoket</a></p>
<p>测试用的文件：<a>whistle-test-files</a></p>
<p>测试用的rules: <a>rules</a></p>
<p>整理的有些凌乱，如有不对之处，请指正，谢谢。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
whistle--跨平台网络抓包调试工具

## 原文链接
[https://segmentfault.com/a/1190000014891582](https://segmentfault.com/a/1190000014891582)

