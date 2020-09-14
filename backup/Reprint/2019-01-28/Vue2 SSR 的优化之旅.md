---
title: 'Vue2 SSR 的优化之旅' 
date: 2019-01-28 2:30:10
hidden: true
slug: shv09bbtbfd
categories: [reprint]
---

{{< raw >}}

                    
<p>自从 Vue2 出正式版后, 就开始了 SSR 之旅, 不过之前用的都是虚拟主机, 部署不了 SSR, 所以也只是在本地写着玩, 双 11 的时候, 买了个某云主机, 正式开始了 SSR 之旅, 然后过程并不顺利, 部署, 运行都没问题, 但是发现内存泄漏严重, 1核1G内存的主机根本负担不了, 没什么访问量的情况下, 几个小时的时间, 1G 内存就用光, 明显有很严重的内存泄漏, 在本地环境压测, rps(每秒请求数) 无限接近于 1, 在云服务器更是压测都完成不了, 于是开始了优化之旅</p>
<h2 id="articleHeader0">1. 内存泄漏</h2>
<p>经过查资料和测试, 发现 axios 和 vue-meta 都有内存泄漏之嫌</p>
<h4>vue-meta</h4>
<p>之前有写过一篇 <a href="http://www.mmxiaowu.com/article/585005b24b8f0c283f7ce0d1" rel="nofollow noreferrer" target="_blank">Vue2 SSR渲染, 如何根据不同页面修改 meta?</a>, 既然这个有内存泄漏的嫌疑, 只好先把代码恢复回去</p>
<h4>axios</h4>
<p>axios 的拦截器在 node 端也会导致内存泄漏, 因为之前版本是 SPA 版的, axios 配置也是针对 SPA 的配置, 里面有用到拦截器, 并且有大量的逻辑处理在里面, 包括加载进度, 错误处理等等, 这些逻辑在 node 端是没有任何意义的, 那么我们就需要对 node 端写个专门的 axios 配置文件</p>
<ul>
<li><p>api/index-server.js (server端)<br><a href="https://github.com/lincenying/mmf-blog-vue2-ssr/blob/master/src/api/index-server.js" rel="nofollow noreferrer" target="_blank">https://github.com/lincenying...</a></p></li>
<li><p>api/index-client.js (client端)<br><a href="https://github.com/lincenying/mmf-blog-vue2-ssr/blob/master/src/api/index-client.js" rel="nofollow noreferrer" target="_blank">https://github.com/lincenying...</a></p></li>
</ul>
<h2 id="articleHeader1">2. 缓存</h2>
<p>缓存主要包括两个部分:</p>
<ul>
<li><p>服务端的 api 数据缓存</p></li>
<li><p>组件的缓存</p></li>
</ul>
<h4>服务端的 api 数据缓存</h4>
<p>昨天已经写了一篇文章: <a href="http://www.mmxiaowu.com/article/58666e94b31b4b0734dd01be" rel="nofollow noreferrer" target="_blank">Vue2 SSR 缓存 Api 数据</a>, 这里不再多说, 上面 axios 服务端配置文件中, 也有相关代码</p>
<h4>组件的缓存</h4>
<p>首先先安装<code>lru-cache</code><br>然后在<code>server.js</code>里<code>createBundleRenderer</code>的时候带上缓存的配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('vue-server-renderer').createBundleRenderer(bundle, {
    cache: require('lru-cache')({
        max: 1000, // 缓存最大数量
        maxAge: 1000 * 60 * 15, // 缓存时间 15分钟
    })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">require</span>(<span class="hljs-string">'vue-server-renderer'</span>).createBundleRenderer(bundle, {
    <span class="hljs-attr">cache</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'lru-cache'</span>)({
        <span class="hljs-attr">max</span>: <span class="hljs-number">1000</span>, <span class="hljs-comment">// 缓存最大数量</span>
        maxAge: <span class="hljs-number">1000</span> * <span class="hljs-number">60</span> * <span class="hljs-number">15</span>, <span class="hljs-comment">// 缓存时间 15分钟</span>
    })
})</code></pre>
<p>在组件里申明 key</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="serverCacheKey: () => {
    return `aside::account`
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>serverCacheKey: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> `<span class="javascript">aside::account</span>`
}</code></pre>
<p>组件缓存的相关用法, 请参考官方文档:<br><a href="https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#component-caching" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue/...</a></p>
<p>注意: 一般情况下, 我们不要给容器型组件, 只给展示型组件加缓存, 如一个组件是静态组件, 如组件的数据是通过 props 传进去的</p>
<h2 id="articleHeader2">3. 配置 nginx</h2>
<p>一般情况我们都需要用 nginx 或者 apache 做端口转发,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="server {
    listen 80;
    server_name mmxiaowu.com www.mmxiaowu.com ssr.mmxiaowu.com;
    location / {
         proxy_set_header X-Real-IP $remote_addr;
         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
         proxy_set_header Host  $http_host;
         proxy_set_header X-Nginx-Proxy true;
         proxy_set_header Connection &quot;&quot;;
         proxy_pass http://127.0.0.1:8080;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-section">server</span> {
    <span class="hljs-attribute">listen</span> <span class="hljs-number">80</span>;
    <span class="hljs-attribute">server_name</span> mmxiaowu.com www.mmxiaowu.com ssr.mmxiaowu.com;
    <span class="hljs-attribute">location</span> / {
         <span class="hljs-attribute">proxy_set_header</span> X-Real-IP <span class="hljs-variable">$remote_addr</span>;
         <span class="hljs-attribute">proxy_set_header</span> X-Forwarded-For <span class="hljs-variable">$proxy_add_x_forwarded_for</span>;
         <span class="hljs-attribute">proxy_set_header</span> Host  <span class="hljs-variable">$http_host</span>;
         <span class="hljs-attribute">proxy_set_header</span> X-Nginx-Proxy <span class="hljs-literal">true</span>;
         <span class="hljs-attribute">proxy_set_header</span> Connection <span class="hljs-string">""</span>;
         <span class="hljs-attribute">proxy_pass</span> http://127.0.0.1:8080;
    }
}</code></pre>
<p>我们可以修改下配置文件, 让静态文件直接走 nginx, 不再经过 nodejs</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="server {
    listen 80;
    server_name mmxiaowu.com www.mmxiaowu.com ssr.mmxiaowu.com;
    location ~ ^/(static|upload)/  {
         root /your/webroot/mmf-blog-vue2-ssr/dist;
         expires 30d;
    }
    location / {
         proxy_set_header X-Real-IP $remote_addr;
         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
         proxy_set_header Host  $http_host;
         proxy_set_header X-Nginx-Proxy true;
         proxy_set_header Connection &quot;&quot;;
         proxy_pass http://127.0.0.1:8080;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-section">server</span> {
    <span class="hljs-attribute">listen</span> <span class="hljs-number">80</span>;
    <span class="hljs-attribute">server_name</span> mmxiaowu.com www.mmxiaowu.com ssr.mmxiaowu.com;
    <span class="hljs-attribute">location</span> <span class="hljs-regexp">~ ^/(static|upload)/</span>  {
         <span class="hljs-attribute">root</span> /your/webroot/mmf-blog-vue2-ssr/dist;
         <span class="hljs-attribute">expires</span> <span class="hljs-number">30d</span>;
    }
    <span class="hljs-attribute">location</span> / {
         <span class="hljs-attribute">proxy_set_header</span> X-Real-IP <span class="hljs-variable">$remote_addr</span>;
         <span class="hljs-attribute">proxy_set_header</span> X-Forwarded-For <span class="hljs-variable">$proxy_add_x_forwarded_for</span>;
         <span class="hljs-attribute">proxy_set_header</span> Host  <span class="hljs-variable">$http_host</span>;
         <span class="hljs-attribute">proxy_set_header</span> X-Nginx-Proxy <span class="hljs-literal">true</span>;
         <span class="hljs-attribute">proxy_set_header</span> Connection <span class="hljs-string">""</span>;
         <span class="hljs-attribute">proxy_pass</span> http://127.0.0.1:8080;
    }
}</code></pre>
<p>经过以上一些优化后, 再进行一次压测:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="E:\web\webpack\mmf-blog-vue2-ssr>loadtest -n 2000 http://localhost:8080/
[Sat Dec 31 2016 14:12:17] INFO Requests: 0 (0%), requests per second: 0, mean latency: 0 ms
[Sat Dec 31 2016 14:12:22] INFO Requests: 246 (12%), requests per second: 49, mean latency: 20.3 ms
[Sat Dec 31 2016 14:12:27] INFO Requests: 508 (25%), requests per second: 52, mean latency: 19 ms
[Sat Dec 31 2016 14:12:32] INFO Requests: 773 (39%), requests per second: 53, mean latency: 18.8 ms
[Sat Dec 31 2016 14:12:37] INFO Requests: 1036 (52%), requests per second: 53, mean latency: 19 ms
[Sat Dec 31 2016 14:12:42] INFO Requests: 1296 (65%), requests per second: 52, mean latency: 19.2 ms
[Sat Dec 31 2016 14:12:47] INFO Requests: 1548 (77%), requests per second: 50, mean latency: 19.9 ms
[Sat Dec 31 2016 14:12:52] INFO Requests: 1776 (89%), requests per second: 46, mean latency: 21.8 ms
[Sat Dec 31 2016 14:12:57] INFO
[Sat Dec 31 2016 14:12:57] INFO Target URL:          http://localhost:8080/
[Sat Dec 31 2016 14:12:57] INFO Max requests:        2000
[Sat Dec 31 2016 14:12:57] INFO Concurrency level:   1
[Sat Dec 31 2016 14:12:57] INFO Agent:               none
[Sat Dec 31 2016 14:12:57] INFO
[Sat Dec 31 2016 14:12:57] INFO Completed requests:  2000
[Sat Dec 31 2016 14:12:57] INFO Total errors:        0
[Sat Dec 31 2016 14:12:57] INFO Total time:          39.933183222 s
[Sat Dec 31 2016 14:12:57] INFO Requests per second: 50
[Sat Dec 31 2016 14:12:57] INFO Mean latency:        19.9 ms
[Sat Dec 31 2016 14:12:57] INFO
[Sat Dec 31 2016 14:12:57] INFO Percentage of the requests served within a certain time
[Sat Dec 31 2016 14:12:57] INFO   50%      16 ms
[Sat Dec 31 2016 14:12:57] INFO   90%      27 ms
[Sat Dec 31 2016 14:12:57] INFO   95%      43 ms
[Sat Dec 31 2016 14:12:57] INFO   99%      57 ms
[Sat Dec 31 2016 14:12:57] INFO  100%      133 ms (longest request)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs tap"><code>E:\web\webpack\mmf-blog-vue2-ssr&gt;loadtest -n<span class="hljs-number"> 2000 </span>http://localhost:8080/
[Sat Dec<span class="hljs-number"> 31 </span>2016 14:12:17] INFO Requests:<span class="hljs-number"> 0 </span>(0%), requests per second: 0, mean latency:<span class="hljs-number"> 0 </span>ms
[Sat Dec<span class="hljs-number"> 31 </span>2016 14:12:22] INFO Requests:<span class="hljs-number"> 246 </span>(12%), requests per second: 49, mean latency: 20.3 ms
[Sat Dec<span class="hljs-number"> 31 </span>2016 14:12:27] INFO Requests:<span class="hljs-number"> 508 </span>(25%), requests per second: 52, mean latency:<span class="hljs-number"> 19 </span>ms
[Sat Dec<span class="hljs-number"> 31 </span>2016 14:12:32] INFO Requests:<span class="hljs-number"> 773 </span>(39%), requests per second: 53, mean latency: 18.8 ms
[Sat Dec<span class="hljs-number"> 31 </span>2016 14:12:37] INFO Requests:<span class="hljs-number"> 1036 </span>(52%), requests per second: 53, mean latency:<span class="hljs-number"> 19 </span>ms
[Sat Dec<span class="hljs-number"> 31 </span>2016 14:12:42] INFO Requests:<span class="hljs-number"> 1296 </span>(65%), requests per second: 52, mean latency: 19.2 ms
[Sat Dec<span class="hljs-number"> 31 </span>2016 14:12:47] INFO Requests:<span class="hljs-number"> 1548 </span>(77%), requests per second: 50, mean latency: 19.9 ms
[Sat Dec<span class="hljs-number"> 31 </span>2016 14:12:52] INFO Requests:<span class="hljs-number"> 1776 </span>(89%), requests per second: 46, mean latency: 21.8 ms
[Sat Dec<span class="hljs-number"> 31 </span>2016 14:12:57] INFO
[Sat Dec<span class="hljs-number"> 31 </span>2016 14:12:57] INFO Target URL:          http://localhost:8080/
[Sat Dec<span class="hljs-number"> 31 </span>2016 14:12:57] INFO Max requests:        2000
[Sat Dec<span class="hljs-number"> 31 </span>2016 14:12:57] INFO Concurrency level:   1
[Sat Dec<span class="hljs-number"> 31 </span>2016 14:12:57] INFO Agent:               none
[Sat Dec<span class="hljs-number"> 31 </span>2016 14:12:57] INFO
[Sat Dec<span class="hljs-number"> 31 </span>2016 14:12:57] INFO Completed requests:  2000
[Sat Dec<span class="hljs-number"> 31 </span>2016 14:12:57] INFO Total errors:        0
[Sat Dec<span class="hljs-number"> 31 </span>2016 14:12:57] INFO Total time:          39.933183222 s
[Sat Dec<span class="hljs-number"> 31 </span>2016 14:12:57] INFO Requests per second: 50
[Sat Dec<span class="hljs-number"> 31 </span>2016 14:12:57] INFO Mean latency:        19.9 ms
[Sat Dec<span class="hljs-number"> 31 </span>2016 14:12:57] INFO
[Sat Dec<span class="hljs-number"> 31 </span>2016 14:12:57] INFO Percentage of the requests served within a certain time
[Sat Dec<span class="hljs-number"> 31 </span>2016 14:12:57] INFO   50%     <span class="hljs-number"> 16 </span>ms
[Sat Dec<span class="hljs-number"> 31 </span>2016 14:12:57] INFO   90%     <span class="hljs-number"> 27 </span>ms
[Sat Dec<span class="hljs-number"> 31 </span>2016 14:12:57] INFO   95%     <span class="hljs-number"> 43 </span>ms
[Sat Dec<span class="hljs-number"> 31 </span>2016 14:12:57] INFO   99%     <span class="hljs-number"> 57 </span>ms
[Sat Dec<span class="hljs-number"> 31 </span>2016 14:12:57] INFO  100%     <span class="hljs-number"> 133 </span>ms (longest request)</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007985489?w=660&amp;h=108" src="https://static.alili.tech/img/remote/1460000007985489?w=660&amp;h=108" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>效果非常不错, rps 已经能达到 50 了, 内存使用也大弧度下降了, 不过在云服务器上依然不够理想, 因为可能是云服务器上数据比本地的多, 另外云服务器的配置太烂...但是随着运行时间的增加, 内存肯定也会上升, 毕竟缓存也是需要占用内存的, 不过这个是属于合理开支...</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007985490?w=661&amp;h=107" src="https://static.alili.tech/img/remote/1460000007985490?w=661&amp;h=107" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>过了差不多一天的时间, 内存只涨了 7M 左右...</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2 SSR 的优化之旅

## 原文链接
[https://segmentfault.com/a/1190000007985486](https://segmentfault.com/a/1190000007985486)

