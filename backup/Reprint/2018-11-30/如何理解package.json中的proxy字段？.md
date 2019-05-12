---
title: '如何理解package.json中的proxy字段？' 
date: 2018-11-30 2:30:11
hidden: true
slug: imovfeqjt
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000014891899" src="https://static.alili.tech/img/remote/1460000014891899" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote>入职新公司以来，第一个月接手vue项目，第二个月接手angularjs项目，第三个月加入react重构项目。心生感叹：业务驱动式学习是一种高效率的学习方式，保持好奇心，在业务中快速成长！<br>新项目中在package.json中有一个proxy字段，这是我从来没接触过的，因此就有了此文的诞生，我使用create-react-app 新建了一个最原始状态的项目，对proxy字段与create-react-app之间的纠葛展开了学习。</blockquote>
<p>在npm-configuration中，对proxy有如下解释：</p>
<blockquote>默认值为null，类型为url，一个为了发送http请求的代理。如果HTTP__PROXY或者http_proxy环境变量已经设置好了，那么proxy设置将被底层的请求库实现。</blockquote>
<p>这个proxy字段目前我只了解到可以与create-react-app的react-scripts结合使用:Proxying API Requests in Development，react-scripts应该是基于HTTP_PROXY环境变量做了一些封装。</p>
<p>阅读完本文，你将有一以下收获：</p>
<ul>
<li><strong>如何更优雅地为前端项目配置代理Proxy服务器</strong></li>
<li><strong>复现之前啃《HTTP权威指南》代理相关的知识</strong></li>
<li><strong>对easy-mock的使用限制有了新的认识</strong></li>
<li><strong>对process.env可以直接在React层展示感到震惊</strong></li>
<li><strong>了解到对process.env可以进行扩展的dotenv和expand-env两个库</strong></li>
</ul>
<p>主要分为3部分：</p>
<ul>
<li>开发过程中的Proxy API 请求设置</li>
<li>手动配置proxy</li>
<li>环境变量式配置Proxy</li>
</ul>
<h3 id="articleHeader0">开发过程中的Proxy API 请求设置</h3>
<blockquote>注意：这个特性可以在react-scripts@2.3以及更高版本中使用。</blockquote>
<p>人们通常从将服务于后端实现的host和port，同样也为前端react应用提供服务。<br>例如，在一个应用部署后，生产配置类似下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/                   -静态服务器返回React应用和index.html
/todos         -静态服务器返回React应用和index.html
/api/todos   -服务器会使用后端实现去处理所有/api/*的请求" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>/                   -静态服务器返回React应用和index<span class="hljs-selector-class">.html</span>
/todos         -静态服务器返回React应用和index<span class="hljs-selector-class">.html</span>
/api/todos   -服务器会使用后端实现去处理所有/api<span class="hljs-comment">/*的请求</span></code></pre>
<p>但其实这样的设置不是必须的。然而，如果你确实有一个这样的设置，在不考虑重定向它们到其他的host和port开发环境下，那么写出像fetch('/api/todos')这样的请求时正常的。</p>
<p>为了告诉开发环境的服务器去代理任何开发环境中未知的请求到我们自己的api服务器，添加一个proxy到package.json的字段，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;proxy&quot;:&quot;http://localhost:4000&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">"proxy"</span>:<span class="hljs-string">"http://localhost:4000"</span></code></pre>
<p>使用这种形式的话，当你在开发环境中使用fecth('api/todos')的时候，开发环境的服务器将识别出这不是一个静态资源，然后将代理转发你的请求到<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:4000/api/todos 作为一个回调。生产环境服务器只能代理没有text/html在Accept头中的请求。</p>
<p>方便的是，这就避免了CORS问题以及类似像下面这样的错误信息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Fetch API cannot load http://localhost:4000/api/todos. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:3000' is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">Fetch API cannot <span class="hljs-keyword">load</span> <span class="hljs-keyword">http</span>://localhost:<span class="hljs-number">4000</span>/api/todos. <span class="hljs-keyword">No</span> <span class="hljs-string">'Access-Control-Allow-Origin'</span> header <span class="hljs-keyword">is</span> <span class="hljs-keyword">present</span> <span class="hljs-keyword">on</span> the requested resource. Origin <span class="hljs-string">'http://localhost:3000'</span> <span class="hljs-keyword">is</span> therefore <span class="hljs-keyword">not</span> allowed access. <span class="hljs-keyword">If</span> an <span class="hljs-keyword">opaque</span> response serves your needs, <span class="hljs-keyword">set</span> the request<span class="hljs-string">'s mode to '</span><span class="hljs-keyword">no</span>-cors<span class="hljs-string">' to fetch the resource with CORS disabled.</span></code></pre>
<p>要知道proxy只有在开发环境中会有副作用，而且类似/api/todos 这样的URL在生产环境中是否指向正确取决于我们。你不需要使用/api前缀。任何没有text／html请求头的未识别的请求将会被代理到配置的服务器。</p>
<p>proxy选项支持HTTP，HTTPS以及WebSocket连接。<br>如果proxy选项还不够灵活的话，你可以去做自定义：</p>
<ul>
<li>
<a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#configuring-the-proxy-manually" rel="nofollow noreferrer" target="_blank">自己配置代理</a>（未实验）</li>
<li>服务器端开启CORS（亲测，<a href="https://enable-cors.org/server_expressjs.html" rel="nofollow noreferrer" target="_blank">express</a>和koa均可实现，koa可以直接使用koa-cors）</li>
<li>
<a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables" rel="nofollow noreferrer" target="_blank">使用环境变量注入正确的服务器以及端口到应用</a>（未实验）</li>
</ul>
<p>工科男的执着：）<br>为了更好的说明问题，我们来做一次本地实验：</p>
<ul><li>启动服务</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npx creat-react-app my-app
cd my-app
npm run start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>npx creat-react-<span class="hljs-keyword">app</span> my-<span class="hljs-keyword">app</span>
<span class="hljs-keyword">cd</span> my-<span class="hljs-keyword">app</span>
npm <span class="hljs-keyword">run</span> start</code></pre>
<ul><li>引入axios并发送请求</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i axios --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> axios --save</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidMount(){
    axios.get('/foo')
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>componentDidMount(){
    axios.get(<span class="hljs-string">'/foo'</span>)
        .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(response)</span> {</span>
          console.<span class="hljs-built_in">log</span>(response);
        })
        .<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(error)</span> {</span>
          console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">error</span>);
        });
}</code></pre>
<p>请求发送："http://localhost:3000/foo"<br>错误信息：404</p>
<p>我们为package.json新增proxy服务器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;proxy&quot;:&quot;http://0.0.0.89:7300&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">"proxy"</span>:<span class="hljs-string">"http://0.0.0.89:7300"</span></code></pre>
<p>ctrl + s 热更新react代码后，没有生效，依旧报404的错误。</p>
<p>npm run start 重启本地服务后，代理服务器生效，返回正常的数据。</p>
<p>实现了自动将"http://localhost:3000" 请求转发到"http://0.0.0.89:7300" 的服务器。</p>
<p>不知道聪明的你们发现没有，我们并没有遇到CORS问题，因为在浏览器眼里，我们还是将请求发送到"http://localhost:3000" 中的，它并不知道creat-react-app已经将请求转发到了"http://0.0.0.89:7300" 这个所谓的会触发浏览器CORS安全策略的其他Origin。</p>
<p>天真的浏览器：</p>
<p><span class="img-wrap"><img data-src="/img/bVbdNRf?w=700&amp;h=418" src="https://static.alili.tech/img/bVbdNRf?w=700&amp;h=418" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>请求发送路径：<br>"http://localhost:3000" →"http://0.0.0.89:7300/foo"</p>
<p>响应返回路径：<br>"http://0.0.0.89:7300/foo" →"http://localhost:3000"<br>备注：<br>1.此处需要重新运行npm run start 重启本地服务，否则在package.json中设置的proxy不会被检测到并生效。<br>2.此处的服务器可以是公司内网某台虚拟机上的启动的node服务，也可以是easy-mock等mock服务器（仅支持公司内网部署版，大搜车公网线上服务器不支持）。</p>
<p>因此我们得出一个结论：</p>
<blockquote>creat-react-app脚手架可以结合package.json中的proxy实现请求转发。</blockquote>
<p>实验成功！</p>
<h3 id="articleHeader1">手动配置proxy</h3>
<blockquote>注意：这个特性可以在react-scripts@1.0.0以及更高版本中使用。</blockquote>
<p>如果proxy的默认配置不够灵活，可以在package.json自定义一个像下面这样形式的对象。<br>你也可以http-proxy-middleware或者http-proxy去实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    “proxy”:{
        &quot;/api&quot;:{
            &quot;target&quot;:&quot;<url>&quot;,
            &quot;ws&quot;:true 
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
    “proxy”:{
        <span class="hljs-string">"/api"</span>:{
            <span class="hljs-string">"target"</span>:<span class="hljs-string">"&lt;url&gt;"</span>,
            <span class="hljs-string">"ws"</span><span class="hljs-symbol">:true</span> 
        }
    }
}</code></pre>
<p>所有与这个路径相互匹配的请求将被代理转发。这包括了text/html类型的请求，这种类型是标准proxy选项不支持的。</p>
<p>如果你需要配置多个代理，你需要在定义几个入口。匹配规则还是那样，这样你才能使用正则匹配多个路径。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  // ...
  &quot;proxy&quot;: {
    // Matches any request starting with /api
    &quot;/api&quot;: {
      &quot;target&quot;: &quot;<url_1>&quot;,
      &quot;ws&quot;: true
      // ...
    },
    // Matches any request starting with /foo
    &quot;/foo&quot;: {
      &quot;target&quot;: &quot;<url_2>&quot;,
      &quot;ssl&quot;: true,
      &quot;pathRewrite&quot;: {
        &quot;^/foo&quot;: &quot;/foo/beta&quot;
      }
      // ...
    },
    // Matches /bar/abc.html but not /bar/sub/def.html
    &quot;/bar/[^/]*[.]html&quot;: {
      &quot;target&quot;: &quot;<url_3>&quot;,
      // ...
    },
    // Matches /baz/abc.html and /baz/sub/def.html
    &quot;/baz/.*/.*[.]html&quot;: {
      &quot;target&quot;: &quot;<url_4>&quot;
      // ...
    }
  }
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>{
  <span class="hljs-comment">// ...</span>
  <span class="hljs-string">"proxy"</span>: {
    <span class="hljs-comment">// Matches any request starting with /api</span>
    <span class="hljs-string">"/api"</span>: {
      <span class="hljs-string">"target"</span>: <span class="hljs-string">"&lt;url_1&gt;"</span>,
      <span class="hljs-string">"ws"</span>: <span class="hljs-literal">true</span>
      <span class="hljs-comment">// ...</span>
    },
    <span class="hljs-comment">// Matches any request starting with /foo</span>
    <span class="hljs-string">"/foo"</span>: {
      <span class="hljs-string">"target"</span>: <span class="hljs-string">"&lt;url_2&gt;"</span>,
      <span class="hljs-string">"ssl"</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-string">"pathRewrite"</span>: {
        <span class="hljs-string">"^/foo"</span>: <span class="hljs-string">"/foo/beta"</span>
      }
      <span class="hljs-comment">// ...</span>
    },
    <span class="hljs-comment">// Matches /bar/abc.html but not /bar/sub/def.html</span>
    <span class="hljs-string">"/bar/[^/]*[.]html"</span>: {
      <span class="hljs-string">"target"</span>: <span class="hljs-string">"&lt;url_3&gt;"</span>,
      <span class="hljs-comment">// ...</span>
    },
    <span class="hljs-comment">// Matches /baz/abc.html and /baz/sub/def.html</span>
    <span class="hljs-string">"/baz/.*/.*[.]html"</span>: {
      <span class="hljs-string">"target"</span>: <span class="hljs-string">"&lt;url_4&gt;"</span>
      <span class="hljs-comment">// ...</span>
    }
  }
  <span class="hljs-comment">// ...</span>
}</code></pre>
<p>工科男的执着，继续来做一个实验：</p>
<p>依然使用上面的my-app项目，proxy配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;proxy&quot;:{
    &quot;/api&quot;: {
      &quot;target&quot;: &quot;http://0.0.0.89:7300&quot;,
      &quot;ws&quot;: true
    },
    &quot;/foo&quot;: {
      &quot;target&quot;: &quot;http://0.0.11.22:8848&quot;,
      &quot;ws&quot;: true,
      &quot;pathRewrite&quot;: {
        &quot;^/foo&quot;: &quot;/foo/beta&quot;
      }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"proxy"</span>:{
    <span class="hljs-string">"/api"</span>: {
      <span class="hljs-string">"target"</span>: <span class="hljs-string">"http://0.0.0.89:7300"</span>,
      <span class="hljs-string">"ws"</span>: true
    },
    <span class="hljs-string">"/foo"</span>: {
      <span class="hljs-string">"target"</span>: <span class="hljs-string">"http://0.0.11.22:8848"</span>,
      <span class="hljs-string">"ws"</span>: true,
      <span class="hljs-string">"pathRewrite"</span>: {
        <span class="hljs-string">"^/foo"</span>: <span class="hljs-string">"/foo/beta"</span>
      }
    }
}</code></pre>
<p>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    axios.get('/api')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    axios.get('/foo')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>    axios.get(<span class="hljs-string">'/api'</span>)
    .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(response)</span> {</span>
      console.<span class="hljs-built_in">log</span>(response);
    })
    .<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(error)</span> {</span>
      console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">error</span>);
    });
    axios.get(<span class="hljs-string">'/foo'</span>)
    .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(response)</span> {</span>
      console.<span class="hljs-built_in">log</span>(response);
    })
    .<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(error)</span> {</span>
      console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">error</span>);
    });</code></pre>
<p>执行结果：<br>api接口和之前一致，我们这里主要看重定向的foo接口。</p>
<p>请求发送路径：<br>"http://localhost:3000" →"http://0.0.11.22:8848/foo" →"http://0.0.11.22:8848/foo/beta"</p>
<p>响应返回路径：<br>"http://0.0.11.22:8848/foo/beta" →"http://localhost:3000"</p>
<p>可以配置对个代理，我们此处使用的是"http://0.0.0.89:7300" 和"http://0.0.11.22:8848" 这个两台代理服务器，其中<br>"http://0.0.0.89:7300" 提供了api接口，"http://0.0.11.22:8848" 提供了foo接口。而且我们可以在代理服务器上重定向接口。</p>
<p>因此我们得出一个结论：</p>
<blockquote>creat-react-app脚手架可以结合package.json中的proxy，可以配置对个代理，而且我们可以在代理服务器上重定向接口。</blockquote>
<p>实验成功！</p>
<h3 id="articleHeader2">环境变量式配置proxy</h3>
<blockquote>这个功能在react-scripts@0.2.3及更高本版中适用。</blockquote>
<p>react的项目可以使用已经声明好的环境变量，这些变量就像是在你的js文件中定义的本地变量一样。默认情况下，已经有NODE_ENV默认环境变量，以及其他的以REACT_APP_为前缀的环境变量。</p>
<p><strong>环境变量在构建期间是被嵌入进去的。</strong>因为Create React App提供了静态的HTML/CSS/JS打包，不能在runtime时被读取到。为了在runtime期间读取到环境变量，你需要还在HTML到服务器的内存，并且在运行时替换占位符，就像这里描述的这样：<a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#injecting-data-from-the-server-into-the-page" rel="nofollow noreferrer" target="_blank">Injecting Data from the Server into the Page</a>。另外你可以在任何你更改他们的时间里重新构建应用。</p>
<blockquote>你需要使用REACT_APP_创建通用的环境变量。除了NODE_ENV之外的任何其他的变量将被忽略，这是为了避免<a href="https://github.com/facebook/create-react-app/issues/865#issuecomment-252199527" rel="nofollow noreferrer" target="_blank">exposing a private key on the machine that could have the same name</a>。运行期间，只要你修改了环境变量，就需要重启开发服务器。</blockquote>
<p>这些环境变量将被定义在process.env。例如，有一个名叫REACT_APP_SECRET_CODE的环境变量，它可以通过process.env.REACT_APP_SECRET_CODE暴露在我们的javascript文件中。</p>
<p>我们这里同样也有一个内建的叫做NODE_ENV的环境变量。你可以通过process.env.NODE_ENV去读取它。当你运行npm start时，NODE_ENV的值是development，当你运行npm test时，NODE_ENV的值是test，而且当你运行npm run build构建生产环境的包的时候，它通常是production。<strong>你不能的手动覆盖NODE_ENV。</strong>这样可以预防开发者错把开发环境的代码部署到生产环境。</p>
<p>这些环境变量可以用于根据项目的部署位置或使用超出版本控制的敏感数据来有条件地显示信息。</p>
<p>首先，你需要一个已经定义的环境变量。例如，你想在form表单中控制一个secret变量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render(){
    return (
        <div>
            <small>你的应用运行在<b>{process.env.NODE_ENV}</b>模式。</small>
            <form>
               <input type=&quot;hidden&quot; defaultValue={process.env.REACT_APP_SECRET_CODE} />
            </form>
        </div>
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>render(){
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">small</span>&gt;</span>你的应用运行在<span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>{process.env.NODE_ENV}<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span>模式。<span class="hljs-tag">&lt;/<span class="hljs-name">small</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
               <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"hidden"</span> <span class="hljs-attr">defaultValue</span>=<span class="hljs-string">{process.env.REACT_APP_SECRET_CODE}</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
}</span></code></pre>
<p>在构建期间，process.env.REACT_APP_SECRET_CODE将会被环境变量中的当前值替代。谨记NODE_ENV是自动设置的变量。</p>
<p>当你在浏览器查看input时，它已经被设置成了abcde（或者是空）。<br>上面的表单从环境变量中搜索一个名叫REACT_APP_SECRET_CODE的变量。为了使用这个值，我们需要将其定义在环境中。使用两种方式可以做到，一种是在shell中定义，一种是.env文件中。</p>
<p>可以通过NODE_ENV去对一些操作进行控制：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(process.env.NODE_ENV !== 'production'){
   analytics.disable();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code><span class="hljs-keyword">if</span>(process.<span class="hljs-keyword">env</span>.NODE_ENV !== <span class="hljs-string">'production'</span>){
   analytics.<span class="hljs-keyword">disable</span>();
}</code></pre>
<p>当你使用npm run build编译app时，将会使文件变得更小。</p>
<p>在HTML中引用环境变量：</p>
<blockquote>注意：这个特性在react-scripts@0.9.0以及更高版本中使用。</blockquote>
<p>你可以在public/index.html中获取到以REACT_APP_为前缀的环境变量。例如：<br>&lt;title&gt;%REACT_APP_WEBSITE_NAME%&lt;/title&gt;</p>
<p>注意事项：</p>
<ul>
<li>除了内建变量(NODE_ENV和PUBLIC_URL)，变量名必须以REACT_APP_开头才能正常工作。</li>
<li>构建期间环境变量可以被注入进去。如果你想在运行期间注入它们，采用这个方法：<a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#generating-dynamic-meta-tags-on-the-server" rel="nofollow noreferrer" target="_blank">Generating Dynamic &lt;meta&gt; Tags on the Server</a>
</li>
</ul>
<p>在shell中添加临时的环境变量<br>对于不同的操作系统，环境变量的设置是不同的。但是更加需要注意的是，这是创建变量的方式仅仅是当前shell session窗口有效。</p>
<p>Linux和macOS(Bash)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="REACT_APP_SECRECT_CODE=abcdef npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attr">REACT_APP_SECRECT_CODE</span>=abcdef npm start</code></pre>
<p>还有一种创建.env文件定义环境变量的方式。</p>
<p>.env文件将被检如源代码控制。</p>
<p>其他.env文件将怎么使用？</p>
<blockquote>这个特性仅在react-scripts@1.0.0及更高中使用<br>使用dotenv可以将.env中的值注入到process.env中。例如：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('dotenv').config()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">require</span><span class="hljs-params">(<span class="hljs-string">'dotenv'</span>)</span></span>.config()</code></pre>
<p><strong>在项目的根目录定义一个.env文件并键入如下内容</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="DB_HOST=localhost
DB_USER=root
DB_PASS=s1mpl3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code><span class="hljs-attr">DB_HOST</span>=localhost
<span class="hljs-attr">DB_USER</span>=root
<span class="hljs-attr">DB_PASS</span>=s1mpl3</code></pre>
<p>然后就可以在process.env中访问到了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const db = require('db')
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>const db = require(<span class="hljs-string">'db'</span>)
db.connect({
  host: process<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.DB_HOST</span>,
  username: process<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.DB_USER</span>,
  password: process<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.DB_PASS</span>
})</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".env: Default.
.env.local: Local overrides. 加载除了test之外的环境变量。
.env.development, .env.test, .env.production: 公用的环境变量。
.env.development.local, .env.test.local, .env.production.local:本地的环境变量。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-class">.env</span>: Default.
<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.local</span>: Local overrides. 加载除了test之外的环境变量。
<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.development</span>, <span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.test</span>, <span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.production</span>: 公用的环境变量。
<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.development</span><span class="hljs-selector-class">.local</span>, <span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.test</span><span class="hljs-selector-class">.local</span>, <span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.production</span><span class="hljs-selector-class">.local</span>:本地的环境变量。</code></pre>
<p>左边的比右边的优先级高：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm start: .env.development.local, .env.development, .env.local, .env
npm run build: .env.production.local, .env.production, .env.local, .env
npm test: .env.test.local, .env.test, .env (note .env.local is missing)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>npm start: <span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.development</span><span class="hljs-selector-class">.local</span>, <span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.development</span>, <span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.local</span>, <span class="hljs-selector-class">.env</span>
npm run build: <span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.production</span><span class="hljs-selector-class">.local</span>, <span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.production</span>, <span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.local</span>, <span class="hljs-selector-class">.env</span>
npm test: <span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.test</span><span class="hljs-selector-class">.local</span>, <span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.test</span>, <span class="hljs-selector-class">.env</span> (note <span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.local</span> is missing)</code></pre>
<p>如何将系统环境变量扩展到我们项目下的.env文件使用：</p>
<p>使用dotenv-expand</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="REACT_APP_VERSION=$npm_package_version
# also works:
# REACT_APP_VERSION=${npm_package_version}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code><span class="hljs-attr">REACT_APP_VERSION</span>=<span class="hljs-variable">$npm_package_version</span>
<span class="hljs-comment"># also works:</span>
<span class="hljs-comment"># REACT_APP_VERSION=${npm_package_version}</span></code></pre>
<p>在.env文件内部也可以使用变量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="DOMAIN=www.example.com
REACT_APP_FOO=$DOMAIN/foo
REACT_APP_BAR=$DOMAIN/bar" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code><span class="hljs-attr">DOMAIN</span>=www.example.com
<span class="hljs-attr">REACT_APP_FOO</span>=<span class="hljs-variable">$DOMAIN</span>/foo
<span class="hljs-attr">REACT_APP_BAR</span>=<span class="hljs-variable">$DOMAIN</span>/bar</code></pre>
<p>工科男的执着：）<br>简单做个实验：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="touch .env
code .env" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>touch <span class="hljs-selector-class">.env</span>
<span class="hljs-selector-tag">code</span> .env</code></pre>
<p>键入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="DB_HOST=localhost
DB_USER=root
DB_PASS=s1mpl3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code><span class="hljs-attr">DB_HOST</span>=localhost
<span class="hljs-attr">DB_USER</span>=root
<span class="hljs-attr">DB_PASS</span>=s1mpl3</code></pre>
<p>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(&quot;process.env.DB_HOST-->%s,process.env.DB_USER-->%s,process.env.DB_PASS-->%s&quot;,process.env.DB_HOST,process.env.DB_USER,process.env.DB_PASS)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>("<span class="hljs-selector-tag">process</span><span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.DB_HOST--</span>&gt;%<span class="hljs-selector-tag">s</span>,<span class="hljs-selector-tag">process</span><span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.DB_USER--</span>&gt;%<span class="hljs-selector-tag">s</span>,<span class="hljs-selector-tag">process</span><span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.DB_PASS--</span>&gt;%<span class="hljs-selector-tag">s</span>",<span class="hljs-selector-tag">process</span><span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.DB_HOST</span>,<span class="hljs-selector-tag">process</span><span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.DB_USER</span>,<span class="hljs-selector-tag">process</span><span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.DB_PASS</span>)</code></pre>
<p>实验结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="process.env.DB_HOST-->undefined,process.env.DB_USER-->undefined,process.env.DB_PASS-->undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">process<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.DB_HOST--</span>&gt;undefined,process<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.DB_USER--</span>&gt;undefined,process<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.DB_PASS--</span>&gt;undefined</code></pre>
<p>实验结果并不总是令人满意，问题在于不知道在何处require('dotenv').config()，可能需要在node层引入，也可能需要借助webpack之类的工具，使得view层能访问到。</p>
<p>实验失败。<br>做一下总结：</p>
<ul>
<li>开发过程中的Proxy API 请求设置(默认选型，满足大多数情况下需求)</li>
<li>手动配置Proxy （可实现多代理，重定向）</li>
<li>环境变量式配置Proxy (临时变量方式简单易用，.env方式较为复杂，可以使用配置文件代替)</li>
</ul>
<p>努力成为优秀的前端工程师！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何理解package.json中的proxy字段？

## 原文链接
[https://segmentfault.com/a/1190000014891894](https://segmentfault.com/a/1190000014891894)

