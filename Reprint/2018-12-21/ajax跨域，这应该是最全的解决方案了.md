---
title: 'ajax跨域，这应该是最全的解决方案了' 
date: 2018-12-21 2:30:11
hidden: true
slug: vaj5jj7ve7
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>从刚接触前端开发起，<code>跨域</code>这个词就一直以很高的频率在身边重复出现，一直到现在，已经调试过N个跨域相关的问题了，16年时也整理过一篇相关文章，但是感觉还是差了点什么，于是现在重新梳理了一下。</p>
<p>个人见识有限，如有差错，请多多见谅，欢迎提出issue，另外看到这个标题，请勿喷~</p>
<h2 id="articleHeader1">题纲</h2>
<p>关于跨域，有N种类型，本文只专注于<code>ajax请求跨域</code>(,ajax跨域只是属于浏览器"同源策略"中的一部分,其它的还有Cookie跨域iframe跨域,LocalStorage跨域等这里不做介绍)，内容大概如下:</p>
<ul>
<li>
<p>什么是ajax跨域</p>
<ul>
<li>原理</li>
<li>表现(整理了一些遇到的问题以及解决方案)</li>
</ul>
</li>
<li>
<p>如何解决ajax跨域</p>
<ul>
<li>JSONP方式</li>
<li>CORS方式</li>
<li>代理请求方式</li>
</ul>
</li>
<li>
<p>如何分析ajax跨域</p>
<ul>
<li>http抓包的分析</li>
<li>一些示例</li>
</ul>
</li>
</ul>
<h2 id="articleHeader2">什么是ajax跨域</h2>
<h3 id="articleHeader3">ajax跨域的原理</h3>
<p>ajax出现请求跨域错误问题,主要原因就是因为浏览器的“同源策略”,可以参考</p>
<p><a href="http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html" rel="nofollow noreferrer" target="_blank">浏览器同源政策及其规避方法(阮一峰)</a></p>
<h3 id="articleHeader4">CORS请求原理</h3>
<p>CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。它允许浏览器向跨源服务器，发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制。</p>
<p>基本上目前所有的浏览器都实现了CORS标准,其实目前几乎所有的浏览器ajax请求都是基于CORS机制的,只不过可能平时前端开发人员并不关心而已(所以说其实现在CORS解决方案主要是考虑后台该如何实现的问题)。</p>
<p>关于CORS，强烈推荐阅读&nbsp;<br><a href="http://www.ruanyifeng.com/blog/2016/04/cors.html" rel="nofollow noreferrer" target="_blank">跨域资源共享 CORS 详解(阮一峰)</a></p>
<p>另外，这里也整理了一个实现原理图(简化版):</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012469718?w=1070&amp;h=827" src="https://static.alili.tech/img/remote/1460000012469718?w=1070&amp;h=827" alt="" title="" style="cursor: pointer;"></span></p>
<h4>如何判断是否是简单请求?</h4>
<p>浏览器将CORS请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。只要同时满足以下两大条件，就属于简单请求。</p>
<ul>
<li>请求方法是以下三种方法之一：HEAD,GET,POST</li>
<li>
<p>HTTP的头信息不超出以下几种字段：</p>
<ul>
<li>Accept</li>
<li>Accept-Language</li>
<li>Content-Language</li>
<li>Last-Event-ID</li>
<li>Content-Type(只限于三个值application/x-www-form-urlencoded、     multipart/form-data、text/plain)</li>
</ul>
</li>
</ul>
<p>凡是不同时满足上面两个条件，就属于非简单请求。</p>
<h3 id="articleHeader5">ajax跨域的表现</h3>
<p>说实话，当初整理过一篇文章，然后作为了一个解决方案，但是后来发现仍然有很多人还是不会。无奈只能耗时又耗力的调试。然而就算是我来分析，也只会根据对应的表现来判断是否是跨域，因此这一点是很重要的。</p>
<p>ajax请求时,如果存在跨域现象,并且没有进行解决,会有如下表现:(注意，是ajax请求，请不要说为什么http请求可以，而ajax不行，因为ajax是伴随着跨域的，所以仅仅是http请求ok是不行的)</p>
<p>注意:具体的后端跨域配置请看题纲位置。</p>
<h4>第一种现象:<code>No 'Access-Control-Allow-Origin' header is present on the requested resource</code>,并且<code>The response had HTTP status code 404</code>
</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012469719?w=858&amp;h=455" src="https://static.alili.tech/img/remote/1460000012469719?w=858&amp;h=455" alt="" title="" style="cursor: pointer;"></span></p>
<p>出现这种情况的原因如下：</p>
<ul>
<li>本次ajax请求是“非简单请求”,所以请求前会发送一次预检请求(OPTIONS)</li>
<li>服务器端后台接口没有允许OPTIONS请求,导致无法找到对应接口地址</li>
</ul>
<p>解决方案: 后端允许options请求</p>
<h4>第二种现象:<code>No 'Access-Control-Allow-Origin' header is present on the requested resource</code>,并且<code>The response had HTTP status code 405</code>
</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012469720?w=860&amp;h=443" src="https://static.alili.tech/img/remote/1460000012469720?w=860&amp;h=443" alt="" title="" style="cursor: pointer;"></span></p>
<p>这种现象和第一种有区别,这种情况下，后台方法允许OPTIONS请求,但是一些配置文件中(如<code>安全配置</code>),阻止了OPTIONS请求,才会导致这个现象</p>
<p>解决方案: 后端关闭对应的安全配置</p>
<h4>第三种现象:<code>No 'Access-Control-Allow-Origin' header is present on the requested resource</code>,并且<code>status 200</code>
</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012469721?w=858&amp;h=426" src="https://static.alili.tech/img/remote/1460000012469721?w=858&amp;h=426" alt="" title="" style="cursor: pointer;"></span></p>
<p>这种现象和第一种和第二种有区别,这种情况下，服务器端后台允许OPTIONS请求,并且接口也允许OPTIONS请求,但是头部匹配时出现不匹配现象</p>
<p>比如origin头部检查不匹配,比如少了一些头部的支持(如常见的X-Requested-With头部),然后服务端就会将response返回给前端,前端检测到这个后就触发XHR.onerror,导致前端控制台报错</p>
<p>解决方案: 后端增加对应的头部支持</p>
<h4>第四种现象:<code>heade contains multiple values '*,*'</code>
</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012469722?w=1234&amp;h=806" src="https://static.alili.tech/img/remote/1460000012469722?w=1234&amp;h=806" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012469723?w=810&amp;h=64" src="https://static.alili.tech/img/remote/1460000012469723?w=810&amp;h=64" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>表现现象是，后台响应的http头部信息有两个<code>Access-Control-Allow-Origin:*</code></p>
<p>说实话，这种问题出现的主要原因就是进行跨域配置的人不了解原理，导致了重复配置，如:</p>
<ul>
<li>常见于.net后台(一般在web.config中配置了一次origin,然后代码中又手动添加了一次origin(比如代码手动设置了返回*))</li>
<li>常见于.net后台(在IIS和项目的webconfig中同时设置Origin:*)</li>
</ul>
<p>解决方案(一一对应):</p>
<ul>
<li>建议删除代码中手动添加的*，只用项目配置中的即可</li>
<li>建议删除IIS下的配置*，只用项目配置中的即可</li>
</ul>
<h2 id="articleHeader6">如何解决ajax跨域</h2>
<p>一般ajax跨域解决就是通过JSONP解决或者CORS解决,如以下:(注意，现在已经几乎不会再使用JSONP了，所以JSONP了解下即可)</p>
<h3 id="articleHeader7">JSONP方式解决跨域问题</h3>
<p>jsonp解决跨域问题是一个比较古老的方案(实际中不推荐使用),这里做简单介绍(实际项目中如果要使用JSONP,一般会使用JQ等对JSONP进行了封装的类库来进行ajax请求)</p>
<h4>实现原理</h4>
<p>JSONP之所以能够用来解决跨域方案,主要是因为 &lt;script&gt; 脚本拥有跨域能力,而JSONP正是利用这一点来实现。具体原理如图</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012469724?w=901&amp;h=701" src="https://static.alili.tech/img/remote/1460000012469724?w=901&amp;h=701" alt="" title="" style="cursor: pointer;"></span></p>
<h4>实现流程</h4>
<p>JSONP的实现步骤大致如下(参考了来源中的文章)</p>
<ul>
<li>
<p>客户端网页网页通过添加一个&lt;script&gt;元素，向服务器请求JSON数据，这种做法不受同源政策限制</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function addScriptTag(src) {
  var script = document.createElement('script');
  script.setAttribute(&quot;type&quot;,&quot;text/javascript&quot;);
  script.src = src;
  document.body.appendChild(script);
}

window.onload = function () {
  addScriptTag('http://example.com/ip?callback=foo');
}

function foo(data) {
  console.log('response data: ' + JSON.stringify(data));
};                      
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addScriptTag</span>(<span class="hljs-params">src</span>) </span>{
  <span class="hljs-keyword">var</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
  script.setAttribute(<span class="hljs-string">"type"</span>,<span class="hljs-string">"text/javascript"</span>);
  script.src = src;
  <span class="hljs-built_in">document</span>.body.appendChild(script);
}

<span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  addScriptTag(<span class="hljs-string">'http://example.com/ip?callback=foo'</span>);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">data</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'response data: '</span> + <span class="hljs-built_in">JSON</span>.stringify(data));
};                      
    </code></pre>
<p>请求时,接口地址是作为构建出的脚本标签的src的,这样,当脚本标签构建出来时,最终的src是接口返回的内容</p>
</li>
<li>服务端对应的接口在返回参数外面添加函数包裹层</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo({
  &quot;test&quot;: &quot;testData&quot;
});                     " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">foo({
  <span class="hljs-string">"test"</span>: <span class="hljs-string">"testData"</span>
});                     </code></pre>
<ul><li>由于&lt;script&gt;元素请求的脚本，直接作为代码运行。这时，只要浏览器定义了foo函数，该函数就会立即调用。作为参数的JSON数据被视为JavaScript对象，而不是字符串，因此避免了使用JSON.parse的步骤。</li></ul>
<p>注意,一般的JSONP接口和普通接口返回数据是有区别的,所以接口如果要做JSONO兼容,需要进行判断是否有对应callback关键字参数,如果有则是JSONP请求,返回JSONP数据,否则返回普通数据</p>
<p><strong>使用注意</strong></p>
<p>基于JSONP的实现原理,所以JSONP只能是“GET”请求,不能进行较为复杂的POST和其它请求,所以遇到那种情况,就得参考下面的CORS解决跨域了(所以如今它也基本被淘汰了)</p>
<h3 id="articleHeader8">CORS解决跨域问题</h3>
<p>CORS的原理上文中已经介绍了，这里主要介绍的是，实际项目中，后端应该如何配置以解决问题(因为大量项目实践都是由后端进行解决的)，这里整理了一些常见的后端解决方案:</p>
<h4>PHP后台配置</h4>
<p>PHP后台得配置几乎是所有后台中最为简单的,遵循如下步骤即可:</p>
<ul><li>第一步:配置Php 后台允许跨域</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
//主要为跨域CORS配置的两大基本信息,Origin和headers" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;?php
header(<span class="hljs-string">'Access-Control-Allow-Origin: *'</span>);
header(<span class="hljs-string">'Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept'</span>);
<span class="hljs-comment">//主要为跨域CORS配置的两大基本信息,Origin和headers</span></code></pre>
<ul><li>第二步:配置Apache web服务器跨域(httpd.conf中)</li></ul>
<p>原始代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Directory />
    AllowOverride none
    Require all denied
</Directory>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">Directory</span> /&gt;</span>
    AllowOverride none
    Require all denied
<span class="hljs-tag">&lt;/<span class="hljs-name">Directory</span>&gt;</span></code></pre>
<p>改为以下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Directory />
    Options FollowSymLinks
    AllowOverride none
    Order deny,allow
    Allow from all
</Directory>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">Directory</span> /&gt;</span>
    Options FollowSymLinks
    AllowOverride none
    Order deny,allow
    Allow from all
<span class="hljs-tag">&lt;/<span class="hljs-name">Directory</span>&gt;</span></code></pre>
<h4>Node.js后台配置(express框架)</h4>
<p>Node.js的后台也相对来说比较简单就可以进行配置。只需用express如下配置:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.all('*', function(req, res, next) {
    res.header(&quot;Access-Control-Allow-Origin&quot;, &quot;*&quot;);
    res.header(&quot;Access-Control-Allow-Headers&quot;, &quot;X-Requested-With&quot;);
    res.header(&quot;Access-Control-Allow-Methods&quot;, &quot;PUT,POST,GET,DELETE,OPTIONS&quot;);
    res.header(&quot;X-Powered-By&quot;, ' 3.2.1')
        //这段仅仅为了方便返回json而已
    res.header(&quot;Content-Type&quot;, &quot;application/json;charset=utf-8&quot;);
    if(req.method == 'OPTIONS') {
        //让options请求快速返回
        res.sendStatus(200); 
    } else { 
        next(); 
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app.all(<span class="hljs-string">'*'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
    res.header(<span class="hljs-string">"Access-Control-Allow-Origin"</span>, <span class="hljs-string">"*"</span>);
    res.header(<span class="hljs-string">"Access-Control-Allow-Headers"</span>, <span class="hljs-string">"X-Requested-With"</span>);
    res.header(<span class="hljs-string">"Access-Control-Allow-Methods"</span>, <span class="hljs-string">"PUT,POST,GET,DELETE,OPTIONS"</span>);
    res.header(<span class="hljs-string">"X-Powered-By"</span>, <span class="hljs-string">' 3.2.1'</span>)
        <span class="hljs-comment">//这段仅仅为了方便返回json而已</span>
    res.header(<span class="hljs-string">"Content-Type"</span>, <span class="hljs-string">"application/json;charset=utf-8"</span>);
    <span class="hljs-keyword">if</span>(req.method == <span class="hljs-string">'OPTIONS'</span>) {
        <span class="hljs-comment">//让options请求快速返回</span>
        res.sendStatus(<span class="hljs-number">200</span>); 
    } <span class="hljs-keyword">else</span> { 
        next(); 
    }
});</code></pre>
<h4>JAVA后台配置</h4>
<p>JAVA后台配置只需要遵循如下步骤即可:</p>
<ul>
<li>第一步:获取依赖jar包<p>下载&nbsp;<a href="https://dailc.github.io/staticResource/blog/basicKnowledge/ajax/resource/cors-filter-2.4.jar" rel="nofollow noreferrer" target="_blank">cors-filter-1.7.jar</a>,&nbsp;<a href="https://dailc.github.io/staticResource/blog/basicKnowledge/ajax/resource/java-property-utils-1.9.1.jar" rel="nofollow noreferrer" target="_blank">java-property-utils-1.9.jar</a>&nbsp;这两个库文件放到lib目录下。(放到对应项目的webcontent/WEB-INF/lib/下)</p>
</li>
<li>第二步:如果项目用了Maven构建的,请添加如下依赖到pom.xml中:(非maven请忽视)</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<dependency>
    <groupId>com.thetransactioncompany</groupId>
    <artifactId>cors-filter</artifactId>
    <version>[ version ]</version>
</dependency>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>com.thetransactioncompany<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>cors-filter<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>[ version ]<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span></code></pre>
<p>其中版本应该是最新的稳定版本,CORS过滤器</p>
<ul><li>第三步:添加CORS配置到项目的Web.xml中( App/WEB-INF/web.xml)</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 跨域配置-->    
<filter>
        <!-- The CORS filter with parameters -->
        <filter-name>CORS</filter-name>
        <filter-class>com.thetransactioncompany.cors.CORSFilter</filter-class>
        
        <!-- Note: All parameters are options, if omitted the CORS 
             Filter will fall back to the respective default values.
          -->
        <init-param>
            <param-name>cors.allowGenericHttpRequests</param-name>
            <param-value>true</param-value>
        </init-param>
        
        <init-param>
            <param-name>cors.allowOrigin</param-name>
            <param-value>*</param-value>
        </init-param>
        
        <init-param>
            <param-name>cors.allowSubdomains</param-name>
            <param-value>false</param-value>
        </init-param>
        
        <init-param>
            <param-name>cors.supportedMethods</param-name>
            <param-value>GET, HEAD, POST, OPTIONS</param-value>
        </init-param>
        
        <init-param>
            <param-name>cors.supportedHeaders</param-name>
            <param-value>Accept, Origin, X-Requested-With, Content-Type, Last-Modified</param-value>
        </init-param>
        
        <init-param>
            <param-name>cors.exposedHeaders</param-name>
            <!--这里可以添加一些自己的暴露Headers   -->
            <param-value>X-Test-1, X-Test-2</param-value>
        </init-param>
        
        <init-param>
            <param-name>cors.supportsCredentials</param-name>
            <param-value>true</param-value>
        </init-param>
        
        <init-param>
            <param-name>cors.maxAge</param-name>
            <param-value>3600</param-value>
        </init-param>

    </filter>

    <filter-mapping>
        <!-- CORS Filter mapping -->
        <filter-name>CORS</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 跨域配置--&gt;</span>    
<span class="hljs-tag">&lt;<span class="hljs-name">filter</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- The CORS filter with parameters --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">filter-name</span>&gt;</span>CORS<span class="hljs-tag">&lt;/<span class="hljs-name">filter-name</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">filter-class</span>&gt;</span>com.thetransactioncompany.cors.CORSFilter<span class="hljs-tag">&lt;/<span class="hljs-name">filter-class</span>&gt;</span>
        
        <span class="hljs-comment">&lt;!-- <span class="hljs-doctag">Note:</span> All parameters are options, if omitted the CORS 
             Filter will fall back to the respective default values.
          --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">init-param</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">param-name</span>&gt;</span>cors.allowGenericHttpRequests<span class="hljs-tag">&lt;/<span class="hljs-name">param-name</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">param-value</span>&gt;</span>true<span class="hljs-tag">&lt;/<span class="hljs-name">param-value</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">init-param</span>&gt;</span>
        
        <span class="hljs-tag">&lt;<span class="hljs-name">init-param</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">param-name</span>&gt;</span>cors.allowOrigin<span class="hljs-tag">&lt;/<span class="hljs-name">param-name</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">param-value</span>&gt;</span>*<span class="hljs-tag">&lt;/<span class="hljs-name">param-value</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">init-param</span>&gt;</span>
        
        <span class="hljs-tag">&lt;<span class="hljs-name">init-param</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">param-name</span>&gt;</span>cors.allowSubdomains<span class="hljs-tag">&lt;/<span class="hljs-name">param-name</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">param-value</span>&gt;</span>false<span class="hljs-tag">&lt;/<span class="hljs-name">param-value</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">init-param</span>&gt;</span>
        
        <span class="hljs-tag">&lt;<span class="hljs-name">init-param</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">param-name</span>&gt;</span>cors.supportedMethods<span class="hljs-tag">&lt;/<span class="hljs-name">param-name</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">param-value</span>&gt;</span>GET, HEAD, POST, OPTIONS<span class="hljs-tag">&lt;/<span class="hljs-name">param-value</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">init-param</span>&gt;</span>
        
        <span class="hljs-tag">&lt;<span class="hljs-name">init-param</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">param-name</span>&gt;</span>cors.supportedHeaders<span class="hljs-tag">&lt;/<span class="hljs-name">param-name</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">param-value</span>&gt;</span>Accept, Origin, X-Requested-With, Content-Type, Last-Modified<span class="hljs-tag">&lt;/<span class="hljs-name">param-value</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">init-param</span>&gt;</span>
        
        <span class="hljs-tag">&lt;<span class="hljs-name">init-param</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">param-name</span>&gt;</span>cors.exposedHeaders<span class="hljs-tag">&lt;/<span class="hljs-name">param-name</span>&gt;</span>
            <span class="hljs-comment">&lt;!--这里可以添加一些自己的暴露Headers   --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">param-value</span>&gt;</span>X-Test-1, X-Test-2<span class="hljs-tag">&lt;/<span class="hljs-name">param-value</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">init-param</span>&gt;</span>
        
        <span class="hljs-tag">&lt;<span class="hljs-name">init-param</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">param-name</span>&gt;</span>cors.supportsCredentials<span class="hljs-tag">&lt;/<span class="hljs-name">param-name</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">param-value</span>&gt;</span>true<span class="hljs-tag">&lt;/<span class="hljs-name">param-value</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">init-param</span>&gt;</span>
        
        <span class="hljs-tag">&lt;<span class="hljs-name">init-param</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">param-name</span>&gt;</span>cors.maxAge<span class="hljs-tag">&lt;/<span class="hljs-name">param-name</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">param-value</span>&gt;</span>3600<span class="hljs-tag">&lt;/<span class="hljs-name">param-value</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">init-param</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">filter</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">filter-mapping</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- CORS Filter mapping --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">filter-name</span>&gt;</span>CORS<span class="hljs-tag">&lt;/<span class="hljs-name">filter-name</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">url-pattern</span>&gt;</span>/*<span class="hljs-tag">&lt;/<span class="hljs-name">url-pattern</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">filter-mapping</span>&gt;</span></code></pre>
<p>请注意,以上配置文件请放到web.xml的前面,作为第一个filter存在(可以有多个filter的)</p>
<ul><li>第四步:可能的安全模块配置错误(注意，某些框架中-譬如公司私人框架，有安全模块的，有时候这些安全模块配置会影响跨域配置，这时候可以先尝试关闭它们)</li></ul>
<h4>JAVA Spring Boot配置</h4>
<p><strong>20171230补充</strong></p>
<p>仅列举简单的全局配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Configuration
public class CorsConfig {

    private CorsConfiguration buildConfig() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        
        // 可以自行筛选
        corsConfiguration.addAllowedOrigin(&quot;*&quot;);
        corsConfiguration.addAllowedHeader(&quot;*&quot;);
        corsConfiguration.addAllowedMethod(&quot;*&quot;);
        
        return corsConfiguration;
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        
        source.registerCorsConfiguration(&quot;/**&quot;, buildConfig());
        
        return new CorsFilter(source);  
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">@Configuration
public <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CorsConfig</span> </span>{

    private CorsConfiguration buildConfig() {
        CorsConfiguration corsConfiguration = <span class="hljs-keyword">new</span> CorsConfiguration();
        
        <span class="hljs-comment">// 可以自行筛选</span>
        corsConfiguration.addAllowedOrigin(<span class="hljs-string">"*"</span>);
        corsConfiguration.addAllowedHeader(<span class="hljs-string">"*"</span>);
        corsConfiguration.addAllowedMethod(<span class="hljs-string">"*"</span>);
        
        <span class="hljs-keyword">return</span> corsConfiguration;
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = <span class="hljs-keyword">new</span> UrlBasedCorsConfigurationSource();
        
        source.registerCorsConfiguration(<span class="hljs-string">"/**"</span>, buildConfig());
        
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> CorsFilter(source);  
    }
}</code></pre>
<p>新建配置，然后添加Configuration注解即可配置成功</p>
<p><em>PS：这一部分方法是收录的，没有亲身实践过，但根据反馈，理论上可行</em></p>
<h4>NET后台配置</h4>
<p>.NET后台配置可以参考如下步骤:</p>
<ul><li>第一步:网站配置</li></ul>
<p>打开控制面板，选择管理工具,选择iis;右键单击自己的网站，选择浏览;打开网站所在目录,用记事本打开web.config文件添加下述配置信息,重启网站</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012469725?w=1240&amp;h=550" src="https://static.alili.tech/img/remote/1460000012469725?w=1240&amp;h=550" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>请注意,以上截图较老,如果配置仍然出问题,可以考虑增加更多的headers允许,比如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;Access-Control-Allow-Headers&quot;:&quot;X-Requested-With,Content-Type,Accept,Origin&quot;            " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;">"Access-Control-Allow-Headers":"X-Requested-With,Content-Type,Accept,Origin"            </code></pre>
<ul><li>
<p>第二步:其它更多配置,如果第一步进行了后,仍然有跨域问题，可能是:</p>
<ul>
<li>接口中有限制死一些请求类型(比如写死了POST等)，这时候请去除限    制</li>
<li>接口中，重复配置了<code>Origin:*</code>，请去除即可</li>
<li>IIS服务器中，重复配置了<code>Origin:*</code>，请去除即可</li>
</ul>
</li></ul>
<h3 id="articleHeader9">代理请求方式解决接口跨域问题</h3>
<p>注意，由于接口代理是有代价的，所以这个仅是开发过程中进行的。</p>
<p>与前面的方法不同，前面CORS是后端解决，而这个主要是前端对接口进行代理，也就是:</p>
<ul>
<li>前端ajax请求的是本地接口</li>
<li>本地接口接收到请求后向实际的接口请求数据，然后再将信息返回给前端</li>
<li>一般用node.js即可代理</li>
</ul>
<p>关于如何实现代理，这里就不重点描述了，方法和多，也不难，基本都是基于node.js的。</p>
<p>搜索关键字<code>node.js</code>,<code>代理请求</code>即可找到一大票的方案。</p>
<h3 id="articleHeader10">OPTIONS预检的优化</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Access-Control-Max-Age: " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">Access-Control-Max-Age: </code></pre>
<p>这个头部加上后，可以缓存此次请求的秒数。</p>
<p>在这个时间范围内，所有同类型的请求都将不再发送预检请求而是直接使用此次返回的头作为判断依据。</p>
<p>非常有用，可以大幅优化请求次数</p>
<h2 id="articleHeader11">如何分析ajax跨域</h2>
<p>上述已经介绍了跨域的原理以及如何解决，但实际过程中，发现仍然有很多人对照着类似的文档无法解决跨域问题，主要体现在，前端人员不知道什么时候是跨域问题造成的，什么时候不是，因此这里稍微介绍下如何分析一个请求是否跨域:</p>
<h3 id="articleHeader12">抓包请求数据</h3>
<p>第一步当然是得知道我们的ajax请求发送了什么数据，接收了什么，做到这一步并不难，也不需要<code>fiddler</code>等工具，仅基于<code>Chrome</code>即可</p>
<ul>
<li>
<code>Chrome</code>浏览器打开对应发生ajax的页面，<code>F12</code>打开<code>Dev Tools</code>
</li>
<li>发送ajax请求</li>
<li>右侧面板-&gt;<code>NetWork</code>-&gt;<code>XHR</code>，然后找到刚才的ajax请求，点进去</li>
</ul>
<h4>示例一(正常的ajax请求)</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012469726?w=659&amp;h=884" src="https://static.alili.tech/img/remote/1460000012469726?w=659&amp;h=884" alt="" title="" style="cursor: pointer;"></span></p>
<p>上述请求是一个正确的请求，为了方便，我把每一个头域的意思都表明了，我们可以清晰的看到，接口返回的响应头域中，包括了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Access-Control-Allow-Headers: X-Requested-With,Content-Type,Accept
Access-Control-Allow-Methods: Get,Post,Put,OPTIONS
Access-Control-Allow-Origin: *" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">Access-Control-Allow-Headers: X-Requested-With,Content-Type,Accept
Access-Control-Allow-Methods: Get,Post,Put,OPTIONS
Access-Control-Allow-Origin: *</code></pre>
<p>所以浏览器接收到响应时，判断的是正确的请求，自然不会报错，成功的拿到了响应数据。</p>
<h4>示例二(跨域错误的ajax请求)</h4>
<p>为了方便，我们仍然拿上面的错误表现示例举例。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012469721?w=858&amp;h=426" src="https://static.alili.tech/img/remote/1460000012469721?w=858&amp;h=426" alt="" title="" style="cursor: pointer;"></span></p>
<p>这个请求中，接口Allow里面没有包括<code>OPTIONS</code>，所以请求出现了跨域、</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012469722?w=1234&amp;h=806" src="https://static.alili.tech/img/remote/1460000012469722?w=1234&amp;h=806" alt="" title="" style="cursor: pointer;"></span><br>这个请求中，<code>Access-Control-Allow-Origin: *</code>出现了两次，导致了跨域配置没有正确配置，出现了错误。</p>
<p>更多跨域错误基本都是类似的，就是以上三样没有满足(Headers,Allow,Origin)，这里不再一一赘述。</p>
<h4>示例三(与跨域无关的ajax请求)</h4>
<p>当然，也并不是所有的ajax请求错误都与跨域有关，所以请不要混淆，比如以下:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012469727?w=656&amp;h=451" src="https://static.alili.tech/img/remote/1460000012469727?w=656&amp;h=451" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012469728?w=664&amp;h=157" src="https://static.alili.tech/img/remote/1460000012469728?w=664&amp;h=157" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>比如这个请求，它的跨域配置没有一点问题，它出错仅仅是因为request的<code>Accept</code>和response的<code>Content-Type</code>不匹配而已。</p>
<h3 id="articleHeader13">更多</h3>
<p>基本上都是这样去分析一个ajax请求，通过<code>Chrome</code>就可以知道了发送了什么数据，收到了什么数据，然后再一一比对就知道问题何在了。</p>
<h2 id="articleHeader14">写在最后的话</h2>
<p>跨域是一个老生常谈的话题，网上也有大量跨域的资料，并且有不少精品(比如阮一峰前辈的)，但是身为一个前端人员不应该浅尝而止，故而才有了本文。</p>
<p>漫漫前端路，望与诸君共勉之！</p>
<h2 id="articleHeader15">附录</h2>
<h3 id="articleHeader16">参考资料</h3>
<ul>
<li><a href="http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html" rel="nofollow noreferrer" target="_blank">浏览器同源政策及其规避方法(阮一峰)</a></li>
<li><a href="http://www.ruanyifeng.com/blog/2016/04/cors.html" rel="nofollow noreferrer" target="_blank">跨域资源共享 CORS 详解(阮一峰)</a></li>
<li><a href="http://www.cnblogs.com/dailc/p/5893341.html" rel="nofollow noreferrer" target="_blank">本人之前在cnblog上的文章</a></li>
</ul>
<h3 id="articleHeader17">博客</h3>
<p>初次发布<code>2017.03.22</code>于个人博客</p>
<ul><li><a href="http://www.dailichun.com/2017/03/22/ajaxCrossDomainSolution.html" rel="nofollow noreferrer" target="_blank">http://www.dailichun.com/2017/03/22/ajaxCrossDomainSolution.html</a></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ajax跨域，这应该是最全的解决方案了

## 原文链接
[https://segmentfault.com/a/1190000012469713](https://segmentfault.com/a/1190000012469713)

