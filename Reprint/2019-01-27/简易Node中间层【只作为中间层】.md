---
title: '简易Node中间层【只作为中间层】' 
date: 2019-01-27 2:30:59
hidden: true
slug: l6z5xijr8us
categories: [reprint]
---

{{< raw >}}

                    
<p>初衷：我并不想改变团队原有开发模式，前端负责展现和界面路由，后端单纯负责API;<br>要解决的问题：<br>1.服务端渲染（部分界面【商品界面】需要使用服务器端渲染，但是管理类型界面并不需要服务器端渲染）；<br>2.由于问题1的出现，所以我们需要服务器端渲染，需要控制路由，需要部分界面使用后端模板引擎。<br>3.当然我不想写两套api请求方式，Node.js可以搞定使用一套方案；<br>4.后台服务请求当然走代理服务。<br>方案选择：<br>1.koa2基础框架<br>2.axios--api请求服务<br>3.http-proxy--代理转发<br>其余日志处理，路由，后端模板引擎，异步语法自己选择了。<br>具体实现【仅供参考】：<br>1.代理转发【写koa2中间件】：匹配请求路由代理转发目标服务器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//中间件request_proxy.js
var httpProxy = require('http-proxy'); 
//EG:http://localhost:3001/rs-server-api/v1/goods/list
var proxy = new httpProxy.createProxyServer({
    target: 'https://stage.recovery-server.jiahuyunyi.com/',
    changeOrigin: true              // for vhosted sites, changes host header to match to target's host
});
var response_formatter = (ctx) => {
    proxy.web(ctx.req, ctx.res);
    ctx.body = ctx.res;
} 
var url_filter = (pattern) => {
    return async (ctx, next) => {
        var reg = new RegExp(pattern);
        try {
            //通过正则的url进行格式化处理
            if (reg.test(ctx.originalUrl)) {
                response_formatter(ctx);
            }
            await next();
        } catch (error) { 
            //继续抛，让外层中间件处理日志
            throw error;
        } 
    }
}
module.exports = url_filter;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//中间件request_proxy.js</span>
<span class="hljs-keyword">var</span> httpProxy = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http-proxy'</span>); 
<span class="hljs-comment">//EG:http://localhost:3001/rs-server-api/v1/goods/list</span>
<span class="hljs-keyword">var</span> proxy = <span class="hljs-keyword">new</span> httpProxy.createProxyServer({
    <span class="hljs-attr">target</span>: <span class="hljs-string">'https://stage.recovery-server.jiahuyunyi.com/'</span>,
    <span class="hljs-attr">changeOrigin</span>: <span class="hljs-literal">true</span>              <span class="hljs-comment">// for vhosted sites, changes host header to match to target's host</span>
});
<span class="hljs-keyword">var</span> response_formatter = <span class="hljs-function">(<span class="hljs-params">ctx</span>) =&gt;</span> {
    proxy.web(ctx.req, ctx.res);
    ctx.body = ctx.res;
} 
<span class="hljs-keyword">var</span> url_filter = <span class="hljs-function">(<span class="hljs-params">pattern</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
        <span class="hljs-keyword">var</span> reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(pattern);
        <span class="hljs-keyword">try</span> {
            <span class="hljs-comment">//通过正则的url进行格式化处理</span>
            <span class="hljs-keyword">if</span> (reg.test(ctx.originalUrl)) {
                response_formatter(ctx);
            }
            <span class="hljs-keyword">await</span> next();
        } <span class="hljs-keyword">catch</span> (error) { 
            <span class="hljs-comment">//继续抛，让外层中间件处理日志</span>
            <span class="hljs-keyword">throw</span> error;
        } 
    }
}
<span class="hljs-built_in">module</span>.exports = url_filter;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const request_proxy = require('./middlewares/request_proxy');
//匹配路由/rs-server-api/v1/
app.use(request_proxy('^/rs-server-api/v1/'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code class="app.js"><span class="hljs-keyword">const</span> request_proxy = <span class="hljs-keyword">require</span>(<span class="hljs-string">'./middlewares/request_proxy'</span>);
<span class="hljs-comment">//匹配路由/rs-server-api/v1/</span>
app.<span class="hljs-keyword">use</span>(request_proxy(<span class="hljs-string">'^/rs-server-api/v1/'</span>));</code></pre>
<p>2.后端服务：当然ajax请求也是用这个js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from &quot;axios&quot;;
//没有权限直接跳转到登录界面
function fetchGoodsList() {
    return axios.get('http://localhost:3001/rs-server-api/v1/goods/list');
}
export default {
    fetchGoodsList: fetchGoodsList
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">"axios"</span>;
<span class="hljs-comment">//没有权限直接跳转到登录界面</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchGoodsList</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> axios.get(<span class="hljs-string">'http://localhost:3001/rs-server-api/v1/goods/list'</span>);
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">fetchGoodsList</span>: fetchGoodsList
}</code></pre>
<p>在controller中调用服务</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var router = require('koa-router')();
var Service = require('../services/index.js');
router.get('/', async function (ctx, next) {
  ctx.state = {
    title: await Service.fetchGoodsList().then((response) => {
      return JSON.stringify(response.data);
    })
  };
  await ctx.render('index', {
  });
})
module.exports = router;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> router = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-router'</span>)();
<span class="hljs-keyword">var</span> Service = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../services/index.js'</span>);
router.get(<span class="hljs-string">'/'</span>, <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ctx, next</span>) </span>{
  ctx.state = {
    <span class="hljs-attr">title</span>: <span class="hljs-keyword">await</span> Service.fetchGoodsList().then(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">JSON</span>.stringify(response.data);
    })
  };
  <span class="hljs-keyword">await</span> ctx.render(<span class="hljs-string">'index'</span>, {
  });
})
<span class="hljs-built_in">module</span>.exports = router;
</code></pre>
<p>最后项目DEMO地址，基于很多位前辈代码，仅仅加入代理转发<br><a href="https://github.com/HereSinceres/nodeMiddleWay" rel="nofollow noreferrer" target="_blank">https://github.com/HereSincer...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
简易Node中间层【只作为中间层】

## 原文链接
[https://segmentfault.com/a/1190000008250900](https://segmentfault.com/a/1190000008250900)

