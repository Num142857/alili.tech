---
title: '打造一个属于自己的server' 
date: 2018-12-12 2:30:10
hidden: true
slug: vvyu2drubio
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">什么是server</h2>
<p>在开始打造自己的服务器之前,我们首先明确一下服务器的定义:一个管理资源并为用户提供服务的计算机软件。</p>
<h2 id="articleHeader1">根据功能服务器分为两类</h2>
<blockquote><ul>
<li>static web server,例如常见的nginx apache等等</li>
<li>dynamic web server,例如常见的tomcat,jboss,resin等等</li>
</ul></blockquote>
<h2 id="articleHeader2">动静态服务器区别</h2>
<p>对于静态服务器来说一般就是读取资源然后返回给browser;动态服务器意味着返回给browser的文件是经过逻辑处理动态产生的。</p>
<h1 id="articleHeader3">服务器具有的功能特性</h1>
<blockquote><ul><li>nginx,tomcat这个两个之前用过,也研究过,所以拿这两个举一下示例,不过现在很少用了,现在基本上都是使用node相关的,所以最后构建的serve会基于node。</li></ul></blockquote>
<h2 id="articleHeader4">nginx</h2>
<h3 id="articleHeader5">nginx特点</h3>
<blockquote><ul>
<li>配置简单,灵活(只有一个主配置文件nginx.conf)</li>
<li>支持高并发(静态小文件)</li>
<li>占用资源相对较少(2w并发,开启10个线程,内存消耗只有几百M)</li>
<li>功能种类多(例如proxy,cache,Log,Gzip等等)</li>
</ul></blockquote>
<h3 id="articleHeader6">nginx应用场景</h3>
<h4>静态服务器(图片,js,css等等)</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="server {
        listen       8080;
        server_name  localhost;

        location / {
            root   html;
            index  index.html index.htm;
        }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-section">server</span> {
        <span class="hljs-attribute">listen</span>       <span class="hljs-number">8080</span>;
        <span class="hljs-attribute">server_name</span>  localhost;

        <span class="hljs-attribute">location</span> / {
            <span class="hljs-attribute">root</span>   html;
            <span class="hljs-attribute">index</span>  index.html index.htm;
        }
}</code></pre>
<p><strong>说明</strong> 上面是nginx配置,指定访问根目录和默认主页,以及监听端口</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="➜  ~ clear
➜  ~ curl -i  http://127.0.0.1:8080
HTTP/1.1 200 OK
Server: nginx/1.12.2 //服务器类型和版本
Date: Fri, 02 Mar 2018 08:49:44 GMT
Content-Type: text/html
Content-Length: 11
Last-Modified: Fri, 02 Mar 2018 08:46:27 GMT //支持Last-Modified缓存机制
Connection: keep-alive //支持持久连接
ETag: &quot;5a990f63-b&quot;  //支持ETag缓存机制
Accept-Ranges: bytes // 支持断点续传

hello  jsdt% //响应体" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>➜  ~ clear
➜  ~ curl -i  <span class="hljs-string">http:</span><span class="hljs-comment">//127.0.0.1:8080</span>
HTTP/<span class="hljs-number">1.1</span> <span class="hljs-number">200</span> OK
<span class="hljs-string">Server:</span> nginx<span class="hljs-regexp">/1.12.2 /</span>/服务器类型和版本
<span class="hljs-string">Date:</span> Fri, <span class="hljs-number">02</span> Mar <span class="hljs-number">2018</span> <span class="hljs-number">08</span>:<span class="hljs-number">49</span>:<span class="hljs-number">44</span> GMT
Content-<span class="hljs-string">Type:</span> text/html
Content-<span class="hljs-string">Length:</span> <span class="hljs-number">11</span>
Last-<span class="hljs-string">Modified:</span> Fri, <span class="hljs-number">02</span> Mar <span class="hljs-number">2018</span> <span class="hljs-number">08</span>:<span class="hljs-number">46</span>:<span class="hljs-number">27</span> GMT <span class="hljs-comment">//支持Last-Modified缓存机制</span>
<span class="hljs-string">Connection:</span> keep-alive <span class="hljs-comment">//支持持久连接</span>
<span class="hljs-string">ETag:</span> <span class="hljs-string">"5a990f63-b"</span>  <span class="hljs-comment">//支持ETag缓存机制</span>
Accept-<span class="hljs-string">Ranges:</span> bytes <span class="hljs-comment">// 支持断点续传</span>

hello  jsdt% <span class="hljs-comment">//响应体</span></code></pre>
<p><strong>说明</strong>  上面是本地测试请求,从响应头中可以看到支持很多功能</p>
<h4>反向代理,负载均衡</h4>
<p><span class="img-wrap"><img data-src="https://img.wuage.com/151998515776555server-jsdt-demo.png" src="https://static.alili.techhttps://img.wuage.com/151998515776555server-jsdt-demo.png" alt="jsdt-server-demo" title="jsdt-server-demo" style="cursor: pointer; display: inline;"></span><br><strong>说明</strong>  上面是试验效果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" upstream  jsdt.com {  
          server    127.0.0.1:8083  max_fails=3 fail_timeout=30s weight=1;
          server    47.97.xxx.xxx:8084  max_fails=3 fail_timeout=30s  weight=2;  //为了安全 隐藏真实ip地址
      } 
    server {
        listen       8080;
        server_name  localhost; 

        location / {
            root   html;
           # index  index.html index.htm;
            proxy_pass http://jsdt.com;  
            proxy_redirect default;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        "}}"
        " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs puppet"><code> upstream  jsdt.<span class="hljs-keyword">com</span> {  
          server    <span class="hljs-number">127.0</span>.<span class="hljs-number">0</span>.<span class="hljs-number">1</span>:<span class="hljs-number">8083</span>  max_fails=<span class="hljs-number">3</span> fail_timeout=<span class="hljs-number">30</span>s weight=<span class="hljs-number">1</span>;
          server    <span class="hljs-number">47.97</span>.xxx.xxx:<span class="hljs-number">8084</span>  max_fails=<span class="hljs-number">3</span> fail_timeout=<span class="hljs-number">30</span>s  weight=<span class="hljs-number">2</span>;  //为了安全 隐藏真实<span class="hljs-literal">ip</span>地址
      } 
    <span class="hljs-keyword">server</span> {
        listen       <span class="hljs-number">8080</span>;
        server_name  localhost; 

        location / {
            <span class="hljs-literal">root</span>   html;
           <span class="hljs-comment"># index  index.html index.htm;</span>
            proxy_pass http://jsdt.com;  
            proxy_redirect <span class="hljs-keyword">default</span>;
        }
        <span class="hljs-keyword">error_page</span>   500 502 503 504  /50x.html;
        location = /50x.<span class="hljs-keyword">html</span> {
            <span class="hljs-literal">root</span>   html;
        "}}"
        </code></pre>
<p><strong>说明</strong>  上面我摘取了关键的部分配置,采用了轮训+weight算法,其它还有ip_hash、url_hash等算法。真实的应用情况,还需要考虑很多问题,例如集群的session同步,记得大学实习期间,当时公司用的是cookie+memcache集群的方案。</p>
<h2 id="articleHeader7">tomcat</h2>
<h3 id="articleHeader8">tomcat特点</h3>
<blockquote>tomcat运行在jvm上,跨平台,是一个Servlet容器(可以运行Servlet,编译jsp),实现了在http请求响应处理中所需要的http接口相关实现类。除此之外也支持虚拟主机,session共享,静态文件处理等等,只不过没那么专业而已。</blockquote>
<h3 id="articleHeader9">tomcat应用场景</h3>
<p><span class="img-wrap"><img data-src="https://img.wuage.com/152005445853060tomcat-jsdt.png" src="https://static.alili.techhttps://img.wuage.com/152005445853060tomcat-jsdt.png" alt="tomcat-jsdt" title="tomcat-jsdt" style="cursor: pointer; display: inline;"></span><br><strong>说明</strong> 如上所示,我们可以在页面中添加动态的处理逻辑,返回的数据根据用户可定制化(相比静态服务器优点),最终.jsp被tomcat编译为.java,然后被javac编译为通用字节码文件,最终运行在jvm上。</p>
<h2 id="articleHeader10">如何实现一个自己的服务器</h2>
<blockquote>在实现自己的服务器之前,首先我们明确一下server的本质,server属于应用层的协议,基于tcp的封装, 而tcp的应用实现是基于socket(无论是node,还是java都有socket)的封装。<br>socket监听某个端口,获取面向流的数据data,我们的server所要做的就是对data进行解析封装,以使其符合http的规范。</blockquote>
<h3 id="articleHeader11">接下来实现自己的静态server</h3>
<p>因为有http模块,所以node当中实现一个基础server很简单。但是如果附加额外的功能,例如压缩,缓存,断点续传,反向代理什么的就需要自己添加了。<br>接下来首先看一下项目结构,bin目录主要是放启动脚本相关的,主逻辑在app.js中,然后根据功能将代码拆分成不同的模块。templatet目录放置编译的原始模板。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|____bin
| |____.DS_Store
| |____deamon.js
| |____start
| |____yargsConfig.js
|____node_modules
|____package-lock.json
|____package.json
|____readme.md
|____src
| |____.DS_Store
| |____app.js
| |____asset
| |____cacheSupport.js
| |____config.js
| |____picGuard.js
| |____template
| |____util.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>|<span class="hljs-string">____bin
</span>|<span class="hljs-string"> </span>|<span class="hljs-string">____.DS_Store
</span>|<span class="hljs-string"> </span>|<span class="hljs-string">____deamon.js
</span>|<span class="hljs-string"> </span>|____start
|<span class="hljs-string"> </span>|<span class="hljs-string">____yargsConfig.js
</span>|____node_modules
|<span class="hljs-string">____package-lock.json
</span>|<span class="hljs-string">____package.json
</span>|<span class="hljs-string">____readme.md
</span>|____src
|<span class="hljs-string"> </span>|<span class="hljs-string">____.DS_Store
</span>|<span class="hljs-string"> </span>|<span class="hljs-string">____app.js
</span>|<span class="hljs-string"> </span>|____asset
|<span class="hljs-string"> </span>|<span class="hljs-string">____cacheSupport.js
</span>|<span class="hljs-string"> </span>|<span class="hljs-string">____config.js
</span>|<span class="hljs-string"> </span>|<span class="hljs-string">____picGuard.js
</span>|<span class="hljs-string"> </span>|____template
|<span class="hljs-string"> </span>|<span class="hljs-string">____util.js</span></code></pre>
<p>在server运行前,首先我们通过yargs模块获取解析好的命令行参数。如下所示</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(argv.D){
    let sp = cp.spawn(process.execPath, ['deamon.js'],{
        cwd: __dirname,
        stdio: ['ignore','ignore','ignore'],
        env: argv,
        detached: true  //http://nodejs.cn/api/child_process.html#child_process_child_process_spawn_command_args_options
    } )
    sp.unref()
} else {
    let config = Object.assign({}, defautConfig, argv)
    let server = new Server(config);
    server.start();
    console.log('server already started')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">if</span>(argv.D){
    <span class="hljs-keyword">let</span> sp = cp.spawn(process.execPath, [<span class="hljs-string">'deamon.js'</span>],{
        <span class="hljs-attr">cwd</span>: __dirname,
        <span class="hljs-attr">stdio</span>: [<span class="hljs-string">'ignore'</span>,<span class="hljs-string">'ignore'</span>,<span class="hljs-string">'ignore'</span>],
        <span class="hljs-attr">env</span>: argv,
        <span class="hljs-attr">detached</span>: <span class="hljs-literal">true</span>  <span class="hljs-comment">//http://nodejs.cn/api/child_process.html#child_process_child_process_spawn_command_args_options</span>
    } )
    sp.unref()
} <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">let</span> config = <span class="hljs-built_in">Object</span>.assign({}, defautConfig, argv)
    <span class="hljs-keyword">let</span> server = <span class="hljs-keyword">new</span> Server(config);
    server.start();
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'server already started'</span>)
}</code></pre>
<p><strong>说明</strong>  如果开启deamon模式,则通过子进程的方式让服务在后台运行,反之则直接启动server实例</p>
<p>在启动server之后,开始接受并处理请求,下面以断点续传功能模块作为示例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function byteRangeStream(req, res, filepath, statObj) {
    let start = 0
    let end = statObj.size-1
    let range = req.headers['range']
    if (range){
        res.setHeader('Accept-Range','bytes')
        res.statusCode = 206 //a part of content
        let result = range.match(/bytes=(\d*)-(\d*)/);
        if (result) {
            start = isNaN(result[1]) ? start : parseInt(result[1]);
            end = isNaN(result[2]) ? end : parseInt(result[2]) - 1;
        }
    }
    return fs.createReadStream(filepath,{
        start,
        end
    })
}
module.exports ={
    byteRangeStream
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>function byteRangeStream(req, res, filepath, statObj) {
    <span class="hljs-keyword">let</span> start = <span class="hljs-number">0</span>
    <span class="hljs-keyword">let</span> <span class="hljs-keyword">end</span> = statObj.size-<span class="hljs-number">1</span>
    <span class="hljs-keyword">let</span> <span class="hljs-built_in">range</span> = req.headers['<span class="hljs-built_in">range</span>']
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">range</span>){
        res.setHeader('<span class="hljs-type">Accept</span>-<span class="hljs-type">Range</span>','bytes')
        res.statusCode = <span class="hljs-number">206</span> //a part <span class="hljs-keyword">of</span> content
        <span class="hljs-keyword">let</span> <span class="hljs-literal">result</span> = <span class="hljs-built_in">range</span>.match(/bytes=(\d*)-(\d*)/);
        <span class="hljs-keyword">if</span> (<span class="hljs-literal">result</span>) {
            start = isNaN(<span class="hljs-literal">result</span>[<span class="hljs-number">1</span>]) ? start : parseInt(<span class="hljs-literal">result</span>[<span class="hljs-number">1</span>]);
            <span class="hljs-keyword">end</span> = isNaN(<span class="hljs-literal">result</span>[<span class="hljs-number">2</span>]) ? <span class="hljs-keyword">end</span> : parseInt(<span class="hljs-literal">result</span>[<span class="hljs-number">2</span>]) - <span class="hljs-number">1</span>;
        }
    }
    <span class="hljs-keyword">return</span> fs.createReadStream(filepath,{
        start,
        <span class="hljs-keyword">end</span>
    })
}
module.exports ={
    byteRangeStream
}</code></pre>
<p><strong>说明</strong> 在主模块app.js中,导入上述模块,如代码中所示首先判断客户端是否支持断点续传,依据range请求头,如果有请求范围,直接返回请求范围内的数据,否则全部读取返回,靠的是browser和server的协商机制,需要双方都支持才能完成整个过程。<br>更多功能模块可以参考我的<a href="https://github.com/gcyStar/server-cli" rel="nofollow noreferrer" target="_blank">github</a>, 欢迎star。</p>
<h2 id="articleHeader12">总结</h2>
<p>写这篇文章,总结了下server的相关知识,参考了之前大学时做的笔记,看到之前做的记录,回忆当时在学校学习和公司实习的经历,感慨万千。时光易逝,做好当下的自己。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
打造一个属于自己的server

## 原文链接
[https://segmentfault.com/a/1190000013501940](https://segmentfault.com/a/1190000013501940)

