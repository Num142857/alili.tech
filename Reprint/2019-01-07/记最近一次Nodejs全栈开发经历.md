---
title: '记最近一次Nodejs全栈开发经历' 
date: 2019-01-07 2:30:11
hidden: true
slug: 7j5cy44e9uw
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">背景：</h2>
<p>前段时间大部门下新成立了一个推广百度<strong>OCR</strong>、<strong>文字识别</strong>、<strong>图像识别</strong>等科技能力在金融领域应用的子部门。因为部门刚成立，基础设施和人力都是欠缺的。当时分到我们部门的任务是抽调一个人做新部门主站前端开发工作。本来说的是只负责页面的开发工作。当我参加过需求品审会后，了解到新部门人力不足，而我今年主要任务又是在我们部门做基于Nodejs的前端后端分离的架构升级工作。</p>
<p>在这之前就是用Nodejs写了两个内部系统，并没有大型的线上Web开发经验，也想趁着这个机会锻炼下。然后就主动的跟老板商量了这件事，老板非常支持。之后又跟新部门的产品商量，本来就缺人手的他们也非常乐意我这边承担更多的开发任务。</p>
<p><strong>这篇文章和自己之前的文章的风格会有很大的区别，不会再去写一些具体技术点和遇到问题的具体解决办法，主要谈的是我整个开发过程中遇到的一些问题和思考解决他们的方法。</strong></p>
<h2 id="articleHeader1">内容列表</h2>
<ul>
<li>技术选型的思考</li>
<li>相关服务申请</li>
<li>前端工程</li>
<li>技术目标</li>
<li>Web安全</li>
<li>内网机器访问外网</li>
<li>发送邮件</li>
<li>网络优化</li>
<li>收获</li>
</ul>
<h2 id="articleHeader2">技术选型的思考</h2>
<p>在文章的最开头背景介绍中大概说了网站后端采用Nodejs的开发。为了突出科技能力，网站要求了一些特效。因为我要用CSS3来写这些特效，跟产品PK后结果是浏览器兼容性是<strong>IE8.0</strong>以上，特效满足大多数主流浏览器即可。那么基于Nodejs的其它技术选型如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010303554" src="https://static.alili.tech/img/remote/1460000010303554" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>以下选择这些技术的原因：</strong></p>
<ul>
<li>yog2（<a href="http://fex.baidu.com/yog2/docs/advance/isomorphic.html" rel="nofollow noreferrer" target="_blank">点击到达主页</a>））是百度公司内部基于<strong>Express</strong>开发的比较成熟的Nodejs Web框架。提供的能力都是跟公司内部的基础服务（同机房访问、运维、日志等）接轨的，而且有一些部门已经在线上大规模使用，如果遇到问题可以有很多经验可以借鉴。</li>
<li>swig是yog2默认支持的模板引擎。</li>
<li>因为Nodejs的语法是遵循CMD规范的。而且在百度内部提倡的也是使用FIS3和Mod.js。所以就选择了公司内部的<strong>FIS3</strong>（<a href="http://fis.baidu.com/" rel="nofollow noreferrer" target="_blank">点击到达主页</a>）和<strong>Mod.js</strong>（<a href="https://github.com/fex-team/mod" rel="nofollow noreferrer" target="_blank">点击到达主页</a>）。FIS3不仅有百度自己内部在用，也有很多的外部公司在用，比如滴滴等。</li>
<li>因为交互要求兼容一些低版本浏览器和一些奇葩的国产浏览器。为了保证开发时间的可控就选择了自己熟悉的jQuery；</li>
</ul>
<h2 id="articleHeader3">相关服务的申请</h2>
<p>确定了技术选型之后就是开始申请服务，主要包括以下相关内容：</p>
<ul>
<li>域名申请</li>
<li>服务器申请</li>
<li>Mysql数据库申请</li>
<li>bos存储服务（使用的是百度云的bos存储）</li>
</ul>
<p>以上都是走的公司的内部流程，具体的就不介绍了。主要介绍下一些服务的作用。一个在网络上运行的网站肯定是需要一个域名的，能让网站跑起来很定是需要线上服务器的。存储用户的注册数据需要数据库。因为使用<strong>OCR</strong>进行人脸识别，要满足识别一张图片上的多张脸。是需要对用户的图片裁切。因为网站是部署在多台机器上，肯定不能存储在网站运行的服务器上需要将裁切好的图片存储在专门的存储服务器上，并且返回给网站图片链接，</p>
<h2 id="articleHeader4">前端工程</h2>
<p>使用Nodejs开发的话，前端的工程的概念可能还要广一些会涉及到Nodejs相关的工程化。这部分分两部分介绍：</p>
<h3 id="articleHeader5">1.前端</h3>
<p><strong>目标：</strong></p>
<ul>
<li>将不同页面的公共模块开发成组件，以方便在不同页面间进行引用；</li>
<li>使用 <strong>SASS</strong> 来做css的模块化管理，并且实时编译成<strong>css</strong>，生成map文件便于本地调试；</li>
<li>将使用 CMD 规范编写的组件和模块化的代码打包编程供页面的业务代码引用；</li>
<li>给需要加厂商前缀的css属性自动加厂商前缀；</li>
<li>能够实时的将代码部署到测试环境，以方便QA测试；</li>
</ul>
<p>以上的这些目标都可以使用 <strong>FIS3</strong>和相关插件来实现。</p>
<p><strong>拆分公共模块为组件</strong></p>
<p>当我们观察一个页面的时候可以发现一个页面的这几块是不同页面间可以公用的。我把这些页面的<code>js</code>、<code>css（scss）</code>、<code>html（tpl）</code>写在一个目录以方便管理他们。就是我没一次一次就可以在所有页面应用自己的修改。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011207551" src="https://static.alili.tech/img/remote/1460000011207551" alt="" title="" style="cursor: pointer;"></span></p>
<p>组织组件的目录：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011207552" src="https://static.alili.tech/img/remote/1460000011207552" alt="" title="" style="cursor: pointer;"></span></p>
<p>当我在不同页面间使用相同的<code>nav</code> 和<code>footer</code>的时候，只需要include一次就可以了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011207553" src="https://static.alili.tech/img/remote/1460000011207553" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">2.后端</h3>
<p>因为我们线上大规模使用的Nodejs版本是6.x版本。但是开发过程中处理异步又是使用<code>async</code>和<code>await</code>。所以需要借助编译引擎将这些es7的语法编译成6.x支持的语法。</p>
<p>另外就是借助<code>process.env.NODE_ENV</code>可以读取环境变量的特性，来区分配置一些线上和线下的配置，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const YOG_DEBUG = process.env.YOG_DEBUG;
const PANSHI_DEBUG = process.env.PANSHI_DEBUG;

let mysqlConf;

if (PANSHI_DEBUG === 'true') {
    mysqlConf = {
        host: '10.00.00.00',
        user: 'ppui',
        password: 'ppui',
        database: 'excel',
        port: '5003'
    };
} else if (YOG_DEBUG === 'true') {
    mysqlConf = {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'pass_panshi',
        port: '3306'
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> YOG_DEBUG = process.env.YOG_DEBUG;
<span class="hljs-keyword">const</span> PANSHI_DEBUG = process.env.PANSHI_DEBUG;

<span class="hljs-keyword">let</span> mysqlConf;

<span class="hljs-keyword">if</span> (PANSHI_DEBUG === <span class="hljs-string">'true'</span>) {
    mysqlConf = {
        <span class="hljs-attr">host</span>: <span class="hljs-string">'10.00.00.00'</span>,
        <span class="hljs-attr">user</span>: <span class="hljs-string">'ppui'</span>,
        <span class="hljs-attr">password</span>: <span class="hljs-string">'ppui'</span>,
        <span class="hljs-attr">database</span>: <span class="hljs-string">'excel'</span>,
        <span class="hljs-attr">port</span>: <span class="hljs-string">'5003'</span>
    };
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (YOG_DEBUG === <span class="hljs-string">'true'</span>) {
    mysqlConf = {
        <span class="hljs-attr">host</span>: <span class="hljs-string">'127.0.0.1'</span>,
        <span class="hljs-attr">user</span>: <span class="hljs-string">'root'</span>,
        <span class="hljs-attr">password</span>: <span class="hljs-string">''</span>,
        <span class="hljs-attr">database</span>: <span class="hljs-string">'pass_panshi'</span>,
        <span class="hljs-attr">port</span>: <span class="hljs-string">'3306'</span>
    };
}</code></pre>
<h2 id="articleHeader7">技术目标</h2>
<p>这里主要谈一些前端的技术目标</p>
<h3 id="articleHeader8">1.样式显示和dom操作分离</h3>
<p>之前开发过程中经常遇到的情况是我需要该一个html节点的样式，不小心改了<code>class</code>类名。而js又恰恰使用了这个<code>class</code>操作了dom。这个时候页面运行的时候肯定会报错的，增加了项目的维护成本。</p>
<p>有两种方案可以有效的解决这种问题，第一就是添加自定义属性，比如<code>&lt;div class="section" node-type="pagesecond"&gt;&lt;/div&gt;</code>当我需要操作dom的时候就通过jQuery的属性选择器来操作这个dom而不会去使用class。这样在我调整样式、需要修改<code>class</code>名称的时候也不会影响js代码。第二种就是根据大家经常说的使用<code>-</code>来做html 类名的连接符，而我们就规定一个规范就是使用下划线（<code>_</code>）来标记我要操作dom节点的名称，比如<code>&lt;div class="section _pagesecond"&gt;&lt;/div&gt;</code>。</p>
<p>这两种方式，<strong>如果是在开发多人维护的项目是都是需要提前预定规范，我在项目中是使用的前者。</strong></p>
<h3 id="articleHeader9">2.业务代码和功能代码分离</h3>
<p>在前面已经介绍过就是使用cmd规范来组织前端代码。比如为了能够满足我使用属性选择器来作为操作dom的需求。我特地自己封装了一些代码段，比如在base.js文件中有一段这样的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
/**
 * 根据node-type获取节点信息
 *
 * @param {any} params 获取节点元素
 * @param {any} context 上下文环境
 * @returns
 */
exports.nodeTypeDom = function (params, context) {
    if (context &amp;&amp; context !== '') {
        return $('[node-type=&quot;' + params + '&quot;]', $('[node-type=&quot;' + context + '&quot;]'));
    } else {
        return $('[node-type=&quot;' + params + '&quot;]');
    }
};

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">/**
 * 根据node-type获取节点信息
 *
 * @param {any} params 获取节点元素
 * @param {any} context 上下文环境
 * @returns
 */</span>
exports.nodeTypeDom = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">params, context</span>) </span>{
    <span class="hljs-keyword">if</span> (context &amp;&amp; context !== <span class="hljs-string">''</span>) {
        <span class="hljs-keyword">return</span> $(<span class="hljs-string">'[node-type="'</span> + params + <span class="hljs-string">'"]'</span>, $(<span class="hljs-string">'[node-type="'</span> + context + <span class="hljs-string">'"]'</span>));
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> $(<span class="hljs-string">'[node-type="'</span> + params + <span class="hljs-string">'"]'</span>);
    }
};

</code></pre>
<p>我在其他文件中需要使用这个代码段的时候，只需要像下面这样就可以了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var baseJs = require('../libjs/base');
var node = baseJs.nodeTypeDom;

// 需要选择 dom 的地方，直接传入自定义属性的值

node('pagesecond').xxxx
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">var</span> baseJs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../libjs/base'</span>);
<span class="hljs-keyword">var</span> node = baseJs.nodeTypeDom;

<span class="hljs-comment">// 需要选择 dom 的地方，直接传入自定义属性的值</span>

node(<span class="hljs-string">'pagesecond'</span>).xxxx
</code></pre>
<p>除了一些常用的代码段这样封装，一些组件也按照这样的方式封装。比如：轮播图组件、文件上传组件、表单校验组件、tab滚动组件。</p>
<p><strong>以上两种方式的好处都能够极大的提高代码的可维护性、阅读性。</strong></p>
<h2 id="articleHeader10">Web安全</h2>
<p>我在开发过程中关注的Web安全主要是</p>
<ul>
<li>sql注入</li>
<li>接口攻击</li>
</ul>
<h3 id="articleHeader11">1.防范sql注入</h3>
<p>sql注入简单些说就是指一些违法用户拼接一个<strong>特殊</strong>的用户名或者是密码，因为我们要把用户名和密码插入数据库，肯定会根据这个用户名和密码拼接一个sql语句。而违法用户的这个<strong>特殊</strong>用户名语句有可能删掉我们数据库的所有数据。</p>
<p>因为使用的是<code>mysql</code>数据库。Nodejs模块使用的也是npm上使用最多的Mysql模块。本身这个模块已经提供了访问mysql集群的能力和防注入的能力。</p>
<p>具体方法可以参考官方文档<a href="https://github.com/mysqljs/mysql#escaping-query-values" rel="nofollow noreferrer" target="_blank">点击这里直达</a></p>
<h3 id="articleHeader12">2.防范接口攻击</h3>
<p>这里要做的就是有些违法用户拿到我们接口的时候，写一个循环频繁的访问我们的接口。为了防止有些违法用户就是给请求加token。就是在向服务端发起请求的时候返回给前端的一个token，前端请求后端的时候带上这个token。如果token在后端校验通过就销毁这个token 。还有比如验证请求的源IP，这里注意的是我们验证IP的时候应该获取的是HTTP协议header字段中的<strong>x-forwarded-for</strong>属性的值。（这两种方法可以一起使用）</p>
<p>不过后来从后端RD那边了解到公司有专门的服务可以用来做<strong>反作弊</strong>，而且策略更全面些。目前在研究准备接入。</p>
<h2 id="articleHeader13">内网机器访问外网</h2>
<p>关于跨机房访问、同机房访问和内网访问外网，这些基本上都会涉及到运维的话题。百度内部有现成的服务接入文档。各个公司可能提供能力的方式不一样。这里不多介绍。</p>
<p>这里谈一些小的细节点。先看下面的一张图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010550978" src="https://static.alili.tech/img/remote/1460000010550978" alt="" title="" style="cursor: pointer;"></span></p>
<p>一句话总结：当一条请求到达接入层之前是不知道要访问内网环境下那个机房的服务器的。相反的内网的机器上如果有一条请求外网的链接，比如：<a href="http://weibo.com" rel="nofollow noreferrer" target="_blank">http://weibo.com</a> 。需要通过一个<strong>proxy</strong>访问外网服务器。</p>
<p>访问接口我使用<code>request</code>模块。配合promise npm上有<code>request-promise</code>由名字我们就知道他的每个方法或者是调用结果返回的是什么了。这个模块默认已经提供了代理参数的相关配置。具体的可以参考文档<a href="https://github.com/request/request#requestoptions-callback" rel="nofollow noreferrer" target="_blank">点击直达</a></p>
<p>这里涉及的知识比较多，比如代理隧道、https请求的代理。在阅读官方配置文档的时候搜索一些关键字了解一些其它相关知识即可。</p>
<p>如果有相关的需求，可以参考我的配置，如果我的配置不能解决你的问题，请仔细阅读官方文档哈。、</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let options = {
        'url': params.url,
        'encoding': 'binary',
        'rejectUnauthorized': false   // 取消https证书的校验
    };

    // 解决代理https请求的行为 测试机需要配置环境变量 PANSHI_HTTPS_PROXY
    if (process.env.PANSHI_DEBUG !== 'true' || PANSHI_HTTPS_PROXY) {
        options.tunnel = false;
        options.proxy = 'http://xxxx.proxy.com:8080';
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> options = {
        <span class="hljs-string">'url'</span>: params.url,
        <span class="hljs-string">'encoding'</span>: <span class="hljs-string">'binary'</span>,
        <span class="hljs-string">'rejectUnauthorized'</span>: <span class="hljs-literal">false</span>   <span class="hljs-comment">// 取消https证书的校验</span>
    };

    <span class="hljs-comment">// 解决代理https请求的行为 测试机需要配置环境变量 PANSHI_HTTPS_PROXY</span>
    <span class="hljs-keyword">if</span> (process.env.PANSHI_DEBUG !== <span class="hljs-string">'true'</span> || PANSHI_HTTPS_PROXY) {
        options.tunnel = <span class="hljs-literal">false</span>;
        options.proxy = <span class="hljs-string">'http://xxxx.proxy.com:8080'</span>;
    }
</code></pre>
<h2 id="articleHeader14">发送邮件</h2>
<p>到这里关于开发相关介绍已经完毕。这里介绍的就是运营和产品需求的一些功能开发。每天将注册的用户发送给相应的责任人。</p>
<p>如果要满足这个功能需要有邮件服务器。这个在公司内部有公用的可以很容易找到。其它就是配置服务的<code>crontab</code>定时执行脚本查询数据库发送邮件。</p>
<p>这里主要使用了nodejs模块<code>nodemailer</code>。具体的相关配置和发送邮件的方法可以参考官方文档配置<a href="https://nodemailer.com/about/" rel="nofollow noreferrer" target="_blank">点击直达</a></p>
<h2 id="articleHeader15">网络优化</h2>
<ul>
<li>静态文件cdn部署；</li>
<li>合并静态文件；</li>
<li>缓存静态文件；</li>
<li>icon使用Base64</li>
</ul>
<p>上面列举的是比较典型的几个点。比如像css放head标签头部，script标签放到body标签底部。这些应该属于一个前端工程师的常识吧。</p>
<p>静态文件部署CDN这个不多介绍，每个公司都会自己的一套方法。这里主要介绍下合并静态文件和缓存静态文件。</p>
<h3 id="articleHeader16">1.合并静态文件</h3>
<p>默认FIS3是有插件支持合并静态文件的。因为我这次开发的页面较多（总共11个主站页面），且因为采用的分块开发加载模块和静态文件。如果不做合并的话，一个页面加载完需要有10-20条的静态文件的请求。会影响页面的加载速度。</p>
<p>当我准备使用FIS3的插件来合并静态文件的时候发现还是有些麻烦的需要一个页面一个页面去配置要打包合并的静态文件。最后请教了下其它部门的同事使用我们接入层服务器提供的comb功能，由服务器帮我们合并静态文件（其实就是Nginx 的concat模块提供的功能）。这里也不做过多的介绍，自行搜索文章了解就可以了。</p>
<h3 id="articleHeader17">2.缓存静态文件</h3>
<p>先来看下一张图<br><span class="img-wrap"><img data-src="/img/remote/1460000010303556" src="https://static.alili.tech/img/remote/1460000010303556" alt="" title="" style="cursor: pointer;"></span></p>
<p>上图中红色框出来的都是跟静态文件缓存有关的http协议的字段。如果对这些字段的概念比较模糊可以阅读这篇文章加深下印象《HTTP缓存》<a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching?hl=zh-cn" rel="nofollow noreferrer" target="_blank">点击直达</a></p>
<p>不管使用<code>express</code>还是<code>koa</code>（<em>koa可以使用koa-static-cache中间件</em>）都用相应的静态文件服务的中间件提供配置这几个字段的能力。express可以通过一下方式配置（具体的可以阅读express文档）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const express = require('express')

// 配置与静态文件相关的参数
express.static('xxxxx')
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>)

<span class="hljs-comment">// 配置与静态文件相关的参数</span>
express.static(<span class="hljs-string">'xxxxx'</span>)
</code></pre>
<h2 id="articleHeader18">收获</h2>
<p>最后就是谈谈这次开发的收获</p>
<ul>
<li>这个项目开发上线以后，刚好到了大部门的年中总结会，因为自己独立负责了前后端的开发工作，获得了大部门的“闪耀之星”奖励和一些物质奖励（虽然还没见到影??）。</li>
<li>对公司内部申请相关服务流程的熟悉和使用这些服务的方法，以及对整个公司后端服务体系的了解；</li>
<li>这次开发还是遇到很多坑的，也被别人说过代码写的“烂”，但我觉得最主要的原因就是不具有后端思维吧。想写好Nodejs就是用后端思维去写Nodejs，这个需要多写，多踩坑。</li>
</ul>
<p>在这个过程经历的好多事情，心态上也是考验。<strong>既然下决心做一件事情了，自己不放弃自己，就没有人能够有放弃自己。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
记最近一次Nodejs全栈开发经历

## 原文链接
[https://segmentfault.com/a/1190000010303551](https://segmentfault.com/a/1190000010303551)

