---
title: '前端渲染与SEO优化踩坑小记' 
date: 2019-02-04 2:30:58
hidden: true
slug: ik9448cg6rt
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>在网站页面后端渲染的时代，开发者只需要按照规范制作搜索引擎友好的页面便可以快速让搜索引擎收录自己网站的各个页面。</p>
<p>随着前后端技术的更新，越来越多的前端框架进入开发者们的视野，网站的前后分离架构越来越得到开发者们的喜爱与认可。 后端只提供数据接口、业务逻辑与持久化服务，而视图、控制与渲染则交给前端。 因此，越来越多的网站从后端渲染变成了前端渲染，而由此带来的直接问题就是各大搜索引擎爬虫对于前端渲染的页面（ 动态内容 ）还无法比较完善的爬取，这就导致了网站的内容无法被搜索引擎收录，直接影响网站流量与曝光度。</p>
<p>博主的网站从去年五月开始也开始采用了前后分离的构架，使用了 AngularJS 框架搭建了 <a href="https://github.com/bluedazzle/django-angularjs-blog" rel="nofollow noreferrer" target="_blank">NewRaPo</a> ， 之后又使用 Vue.js 框架进行了整体重构 <a href="https://github.com/bluedazzle/django-vue.js-blog" rel="nofollow noreferrer" target="_blank">RaPo3</a>。 无一例外，他们都是基于前端渲染的，然后在此后的一年多时间里，搜索引擎收录的页面都是这样的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006756588" src="https://static.alili.tech/img/remote/1460000006756588" alt="" title="" style="cursor: pointer; display: inline;"></span><br>（ 其他搜索引擎也一样，最早的截图已经找不到了，先拿这个应付一下 ）</p>
<p>快照是这样的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006756609" src="https://static.alili.tech/img/remote/1460000006756609" alt="" title="" style="cursor: pointer;"></span></p>
<p>而博主实际的网站是这样的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006756596" src="https://static.alili.tech/img/remote/1460000006756596" alt="" title="" style="cursor: pointer;"></span></p>
<p>和这样的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006756599" src="https://static.alili.tech/img/remote/1460000006756599" alt="" title="" style="cursor: pointer;"></span></p>
<p>感觉完全被搜索引擎抛弃了好嘛！这东西谁能搜到啊！搜到了谁会点啊！</p>
<p>为了能让搜索引擎正常的收录博主的网站，于是博主踏上了动态 SEO 优化的踩坑之路：</p>
<h2 id="articleHeader1">1、fragment 标签</h2>
<p>首先，博主 Google 到了在动态页面中加入 <code>&lt;meta name="fragment" content="!"&gt;</code> 会告诉爬虫这是个动态内容的页面，然后爬虫会在当前链接后面加上 <code>?_escaped_fragment_=tag</code> 来获取相应页面的静态版，于是果断盘算在路由里改一下，然后重写一套后端渲染的页面返回给所有带 <code>?_escaped_fragment_=tag</code> 的链接。</p>
<p>正当我高兴这个问题这么容易解决的时候突然发现网上资料都表示这个方法只有 Google 的爬虫认可，其他搜索引擎全部没用！ wtf，白高兴一场。</p>
<h2 id="articleHeader2">2、PhantomJS</h2>
<p>PhantomJS 是一个基于 WebKit 的服务器端 JavaScript API。它全面支持web而不需浏览器支持，其快速，原生支持各种Web标准： DOM 处理, CSS 选择器, JSON, Canvas, 和 SVG。 PhantomJS 可以用于 页面自动化 ， 网络监测 ， 网页截屏 ，以及 无界面测试 等</p>
<p>简单来说就是 PhantomJS 能在服务端解析HTML、js。</p>
<p>具体怎么使用，简而言之就是判断爬虫来爬取页面的时候把每个动态页面先让 PhantomJS 跑一遍，然后把得到的静态结果返回给爬虫，具体过程可以参考：<a href="http://f2er.info/article/29" rel="nofollow noreferrer" target="_blank">用PhantomJS来给AJAX站点做SEO优化</a></p>
<p>当然博主看过之后没用采用自己搭 PhantomJS 服务做动态内容优化，主要因为：</p>
<ol>
<li><p>爬虫每访问一个页面就要让 PhantomJS 渲染一次，相当于爬虫访问一次实际服务器要响应两次，第一次响应爬虫，第二次响应 PhantomJS 自己，这种方式不仅浪费资源，而且并不优雅；</p></li>
<li><p>PhantomJS 对于新的前端技术兼容性会存在问题，可能会出现渲染失败的情况；</p></li>
<li><p>渲染页面无缓存，每访问一次就重新渲染一次，会造成网站响应速度变慢。</p></li>
</ol>
<h2 id="articleHeader3">3、Prerender.io</h2>
<p>Prerender.io 是一个基于 PhantomJS 开发的专为动态页面 SEO 提供静态页面渲染的在线服务，基本上解决了自己搭建 PhantomJS 服务所遇到的问题，网站配置 Prerender.io 后 Prerender 将会直接取代网站后端对爬虫请求进行响应，将提前渲染好的动态页面直接返回给爬虫。</p>
<p>具体配置：</p>
<ol>
<li><p>注册 Prerender.io 账号，免费用户可以渲染 250 个页面，对于博客网站来说足够了；</p></li>
<li><p>安装中间件并设置 token，博主直接采用了 nginx 配置方案，（ Prerender.io 也提供了其他解决方案：<a href="https://prerender.io/documentation/install-middleware" rel="nofollow noreferrer" target="_blank">https://prerender.io/document...</a> ）博主后端服务器是 uWSGI, 根据 Prerender.io 提供的 nginx.conf 中做如下修改：</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="server {
    listen 80;
    server_name www.rapospectre.com;
 
    location @prerender {
        proxy_set_header X-Prerender-Token YOUR_TOKEN;
        include        uwsgi_params;
        
        set $prerender 0;
        if ($http_user_agent ~* &quot;baiduspider|twitterbot|facebookexternalhit|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator&quot;) {
            set $prerender 1;
        }
        if ($args ~ &quot;_escaped_fragment_&quot;) {
            set $prerender 1;
        }
        if ($http_user_agent ~ &quot;Prerender&quot;) {
            set $prerender 0;
        }
        if ($uri ~* &quot;\.(js|css|xml|less|png|jpg|jpeg|gif|pdf|doc|txt|ico|rss|zip|mp3|rar|exe|wmv|doc|avi|ppt|mpg|mpeg|tif|wav|mov|psd|ai|xls|mp4|m4a|swf|dat|dmg|iso|flv|m4v|torrent|ttf|woff|svg|eot)&quot;) {
            set $prerender 0;
        }
        
        #resolve using Google's DNS server to force DNS resolution and prevent caching of IPs
        resolver 8.8.8.8;
 
        if ($prerender = 1) {
            
            #setting prerender as a variable forces DNS resolution since nginx caches IPs and doesnt play well with load balancing
            set $prerender &quot;service.prerender.io&quot;;
            rewrite .* /$scheme://$host$request_uri? break;
            proxy_pass http://$prerender;
        }
        if ($prerender = 0) {
            uwsgi_pass     127.0.0.1:xxxx;
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code class="shell">server {
    listen 80;
    server_name www.rapospectre.com;
 
    location @prerender {
        proxy_set_header X-Prerender-Token YOUR_TOKEN;
        include        uwsgi_params;
        
        <span class="hljs-built_in">set</span> <span class="hljs-variable">$prerender</span> 0;
        <span class="hljs-keyword">if</span> (<span class="hljs-variable">$http_user_agent</span> ~* <span class="hljs-string">"baiduspider|twitterbot|facebookexternalhit|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator"</span>) {
            <span class="hljs-built_in">set</span> <span class="hljs-variable">$prerender</span> 1;
        }
        <span class="hljs-keyword">if</span> (<span class="hljs-variable">$args</span> ~ <span class="hljs-string">"_escaped_fragment_"</span>) {
            <span class="hljs-built_in">set</span> <span class="hljs-variable">$prerender</span> 1;
        }
        <span class="hljs-keyword">if</span> (<span class="hljs-variable">$http_user_agent</span> ~ <span class="hljs-string">"Prerender"</span>) {
            <span class="hljs-built_in">set</span> <span class="hljs-variable">$prerender</span> 0;
        }
        <span class="hljs-keyword">if</span> (<span class="hljs-variable">$uri</span> ~* <span class="hljs-string">"\.(js|css|xml|less|png|jpg|jpeg|gif|pdf|doc|txt|ico|rss|zip|mp3|rar|exe|wmv|doc|avi|ppt|mpg|mpeg|tif|wav|mov|psd|ai|xls|mp4|m4a|swf|dat|dmg|iso|flv|m4v|torrent|ttf|woff|svg|eot)"</span>) {
            <span class="hljs-built_in">set</span> <span class="hljs-variable">$prerender</span> 0;
        }
        
        <span class="hljs-comment">#resolve using Google's DNS server to force DNS resolution and prevent caching of IPs</span>
        resolver 8.8.8.8;
 
        <span class="hljs-keyword">if</span> (<span class="hljs-variable">$prerender</span> = 1) {
            
            <span class="hljs-comment">#setting prerender as a variable forces DNS resolution since nginx caches IPs and doesnt play well with load balancing</span>
            <span class="hljs-built_in">set</span> <span class="hljs-variable">$prerender</span> <span class="hljs-string">"service.prerender.io"</span>;
            rewrite .* /<span class="hljs-variable">$scheme</span>://<span class="hljs-variable">$host</span><span class="hljs-variable">$request_uri</span>? <span class="hljs-built_in">break</span>;
            proxy_pass http://<span class="hljs-variable">$prerender</span>;
        }
        <span class="hljs-keyword">if</span> (<span class="hljs-variable">$prerender</span> = 0) {
            uwsgi_pass     127.0.0.1:xxxx;
        }
    }
}</code></pre>
<p>然后重启服务器，通过 Google Search Console 或其他站长工具提交页面进行爬取检测，可以看到，Prerender.io 成功截取了爬虫请求并进行了渲染：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006756629" src="https://static.alili.tech/img/remote/1460000006756629" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>嗯，终于解决了嘛，正当博主感叹不容易的时候，Google Search Console 的抓取结果却让人发现然并卵：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006756631" src="https://static.alili.tech/img/remote/1460000006756631" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>抓取的内容依然是满满的 <code>${ article.views "}}"</code> 渲染模版，当时我认为应该是网站缓存的问题，所以没有多想，然而一周后再次测试，情况依旧，回头再看 Prerender 渲染的网页：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006756609" src="https://static.alili.tech/img/remote/1460000006756609" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>原来压根没起作用！之后又检查了配置和文档，尝试联系了 Prerender.io 的技术支持甚至向 Prerender 的 Github 提了相关 issue，都没有解决问题。 最后，不得已博主还是放弃了 Prerender。</p>
<h2 id="articleHeader4">4、自己搭建后端渲染服务</h2>
<p>Prerender 的方案启发了我，通过判断来访请求的 User-Agent 来让不同的后端服务器进行响应，虽然网上关于 SEO 优化的讨论中明确提到过判断 UA 返回不同页面将会得到搜索引擎的惩罚，但我猜测这只是返回不同内容才会惩罚，如果返回的是相同的内容搜索引擎就不会进行惩罚，区别在于一个是直接通过前端渲染的页面，而另一个则是后端渲染的页面，两个页面渲染出的内容基本相同，那么搜索引擎就不会发现。</p>
<p>自己动手，丰衣足食，有了想法立即验证，首先把网站代码中前端渲染的部分改为后端渲染，然后 push 到一个新的分支，博主网站修改十分简单，大概只修改了 50 行不到的代码就完成了需求： <a href="https://github.com/bluedazzle/django-vue.js-blog/tree/shadow" rel="nofollow noreferrer" target="_blank">RaPo3-Shadow</a></p>
<p>接着将后端渲染代码部署到服务器，然后假设用 uWSGI 将它跑在 11011 端口，<br>此时前端渲染的代码由 uWSGI 假设跑在 11000 端口；</p>
<p>最后修改 nginx 配置文件 nginx.conf：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="server {
    listen 80;
    server_name www.rapospectre.com;
 
    location @prerender {
        include        uwsgi_params;
        
        set $prerender 0;
        if ($http_user_agent ~* &quot;baiduspider|twitterbot|facebookexternalhit|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator&quot;) {
            set $prerender 1;
        }
        #resolve using Google's DNS server to force DNS resolution and prevent caching of IPs
        resolver 8.8.8.8;
 
        if ($prerender = 1) {
            uwsgi_pass     127.0.0.1:11011;
        }
        if ($prerender = 0) {
            uwsgi_pass     127.0.0.1:11000;
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code class="shell"><span class="hljs-section">server</span> {
    <span class="hljs-attribute">listen</span> <span class="hljs-number">80</span>;
    <span class="hljs-attribute">server_name</span> www.rapospectre.com;
 
    <span class="hljs-attribute">location</span> <span class="hljs-variable">@prerender</span> {
        <span class="hljs-attribute">include</span>        uwsgi_params;
        
        <span class="hljs-attribute">set</span> <span class="hljs-variable">$prerender</span> <span class="hljs-number">0</span>;
        <span class="hljs-attribute">if</span> (<span class="hljs-variable">$http_user_agent</span> <span class="hljs-regexp">~* "baiduspider|twitterbot|facebookexternalhit|rogerbot|linkedinbot|embedly|quora</span> link preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator<span class="hljs-string">") {
            set <span class="hljs-variable">$prerender</span> 1;
        }
        #resolve using Google's DNS server to force DNS resolution and prevent caching of IPs
        resolver 8.8.8.8;
 
        if (<span class="hljs-variable">$prerender</span> = 1) {
            uwsgi_pass     127.0.0.1:11011;
        }
        if (<span class="hljs-variable">$prerender</span> = 0) {
            uwsgi_pass     127.0.0.1:11000;
        }
    }
}</span></code></pre>
<p>就是通过 UA 判断爬虫，如果是则转发给 11011 端口，不是就转发给 11000 端口，当然两个端口返回的页面基本是相同的，所以也就不用担心会被搜索引擎惩罚了。</p>
<p>通过以上配置后，动态页面的 SEO 问题终于得到了解决，反应最快的是 Google，第二天就爬取并更新到了搜索引擎：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006756633" src="https://static.alili.tech/img/remote/1460000006756633" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>接着 360 搜索：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006756641" src="https://static.alili.tech/img/remote/1460000006756641" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>然后其他没有提交过网址的搜索引擎也分分收录了网站：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006756639" src="https://static.alili.tech/img/remote/1460000006756639" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006756643" src="https://static.alili.tech/img/remote/1460000006756643" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>（ bing 没有收录正常的页面应该是由于 nginx.conf 里没有加入 bing 爬虫 UA 的缘故 ）</p>
<p>当然，不知道什么原因百度过了两个多月还是没有收录，在站长工具中提交网页甚至申诉都没有收录新的网页。没错，开头那个用来应付一下的图片就是百度的结果，刚截的。</p>
<p>我该说幸好没更新，否则找不到以前的例子了嘛，哈哈哈哈。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006756588" src="https://static.alili.tech/img/remote/1460000006756588" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">5、最后一点猜想</h2>
<p>通过博主自己搭建后端渲染服务已经解决了动态页面 SEO 优化问题，但博主还有一个可行办法的猜想，不知是否可行，写在这里如果看了以上办法都不好用的朋友可以试试。</p>
<p>canonical 标签是 Google 、雅虎、微软等搜索引擎一起推出的一个标签，它的主要作用是用来解决由于网址形式不同内容相同而造成的内容重复问题。 这个标签的制定时间已经很久了，所以现在主流的搜索引擎都支持这个标签，它原本的作用是将 url 不同但内容相同的网址权重全部集中到其中一个网址上，这样可以避免大量重复内容网页被搜索引擎收录，举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://www.rapospectre.com/archives/1
http://www.rapospectre.com/archives/1?comments=true
http://www.rapospectre.com/archives/1?postcomment=true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code class="c">http:<span class="hljs-regexp">//</span>www.rapospectre.com<span class="hljs-regexp">/archives/</span><span class="hljs-number">1</span>
http:<span class="hljs-regexp">//</span>www.rapospectre.com<span class="hljs-regexp">/archives/</span><span class="hljs-number">1</span>?comments=true
http:<span class="hljs-regexp">//</span>www.rapospectre.com<span class="hljs-regexp">/archives/</span><span class="hljs-number">1</span>?postcomment=true</code></pre>
<p>这三个网址的内容其实完全一样，为了避免重复收录和分权，在原始网页加上 <code>&lt;link rel='canonical' href='http://www.rapospectre.com/archives/1' /&gt;</code> 这样其他重复网页将被看作都是 <code>http://www.rapospectre.com/archives/1</code></p>
<p>那么假设对于动态网页 <code>http://www.rapospectre.com/dynamic/1</code>，我们编写他的静态网页：<code>http://www.rapospectre.com/static/1</code>, 然后在 <code>http://www.rapospectre.com/dynamic/1</code> 的页面内加入： <code>&lt;link rel='canonical' href='http://www.rapospectre.com/static/1</code>, 这样是否也能达到动态 SEO 优化的目的呢？</p>
<h2 id="articleHeader6">总结</h2>
<p>随着前端渲染的页面越来越多，动态页面的 SEO 优化逐渐进入人们的视野，博主将自己动态页面的 SEO 优化经历写出，希望能帮到其他注意到这个领域或遇到相同问题的人，提供一些思路。 谢谢。</p>
<p><a href="http://www.rapospectre.com/blog/38" rel="nofollow noreferrer" target="_blank">原文地址</a></p>
<p>作者：<a href="http://www.rapospectre.com" rel="nofollow noreferrer" target="_blank">rapospectre</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端渲染与SEO优化踩坑小记

## 原文链接
[https://segmentfault.com/a/1190000006756585](https://segmentfault.com/a/1190000006756585)

