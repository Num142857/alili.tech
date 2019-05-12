---
title: 'vue2.0 proxyTable配置，解决跨域' 
date: 2018-12-05 2:30:09
hidden: true
slug: 7vo0ujtq4ia
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">vue浏览器跨域问题及解决办法</h1>
<h2 id="articleHeader1">一、 问题</h2>
<p>当浏览器报如下错误时，则说明请求跨域了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="localhost/:1 Failed to load http://www.thenewstep.cn/test/testToken.php: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:8080' is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">localhost/:1 Failed to <span class="hljs-keyword">load</span> <span class="hljs-keyword">http</span>://www.thenewstep.cn/<span class="hljs-keyword">test</span>/testToken.php: Response <span class="hljs-keyword">to</span> preflight request doesn<span class="hljs-string">'t pass access control check: No '</span><span class="hljs-keyword">Access</span>-Control-<span class="hljs-keyword">Allow</span>-Origin<span class="hljs-string">' header is present on the requested resource. Origin '</span><span class="hljs-keyword">http</span>://localhost:<span class="hljs-number">8080</span><span class="hljs-string">' is therefore not allowed access. If an opaque response serves your needs, set the request'</span>s <span class="hljs-keyword">mode</span> <span class="hljs-keyword">to</span> <span class="hljs-string">'no-cors'</span> <span class="hljs-keyword">to</span> <span class="hljs-keyword">fetch</span> the <span class="hljs-keyword">resource</span> <span class="hljs-keyword">with</span> CORS disabled.</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV8ynA?w=665&amp;h=78" src="https://static.alili.tech/img/bV8ynA?w=665&amp;h=78" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br><br></p>
<ul>
<li>为什么会跨域:<br>因为浏览器<code>同源策略</code>的限制，不是同源的脚本不能操作其他源下面的对象。<br><br>
</li>
<li>什么是<code>同源策略</code>:<br>同源策略（Same origin policy）是一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，则浏览器的正常功能可能都会受到影响。可以说Web是构建在同源策略基础之上的，浏览器只是针对同源策略的一种实现。<p>简单的来说:<strong><code>协议、IP、端口三者都相同，则为同源</code></strong></p>
<p><span class="img-wrap"><img data-src="/img/bV8yqB?w=485&amp;h=148" src="https://static.alili.tech/img/bV8yqB?w=485&amp;h=148" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
</li>
</ul>
<h2 id="articleHeader2">二、解决办法</h2>
<p>跨域的解决办法有很多，比如<code>script标签</code>   、<code>jsonp</code>、<code>后端设置cros</code>等等...,但是我这里讲的是<code>webpack配置vue 的  proxyTable</code>解决跨域。</p>
<p><code>这里我请求的地址是 http://www.thenewstep.cn/test/testToken.php</code></p>
<p>那么在ProxyTable中具体配置如下:</p>
<p><span class="img-wrap"><img data-src="/img/bV8ysc?w=862&amp;h=589" src="https://static.alili.tech/img/bV8ysc?w=862&amp;h=589" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proxyTable: {
      '/apis': {
        // 测试环境
        target: 'http://www.thenewstep.cn/',  // 接口域名
        changeOrigin: true,  //是否跨域
        pathRewrite: {
            '^/apis': ''   //需要rewrite重写的,
        }              
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">proxyTable</span>: {
      <span class="hljs-string">'/apis'</span>: {
        <span class="hljs-comment">// 测试环境</span>
        <span class="hljs-attribute">target</span>: <span class="hljs-string">'http://www.thenewstep.cn/'</span>,  <span class="hljs-comment">// 接口域名</span>
        <span class="hljs-attribute">changeOrigin</span>: true,  <span class="hljs-comment">//是否跨域</span>
        <span class="hljs-attribute">pathRewrite</span>: {
            <span class="hljs-string">'^/apis'</span>: <span class="hljs-string">''</span>   <span class="hljs-comment">//需要rewrite重写的,</span>
        }              
      }</code></pre>
<p><strong>target</strong>：就是需要请求地址的接口域名</p>
<h3 id="articleHeader3">这里列举了2种数据请求方式： <strong><code>fecth和axios</code></strong>
</h3>
<h4>1、 <code>fetch</code>方式:</h4>
<p>在需要请求的页面，只需要这样写(/apis+具体请求参数)，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch(&quot;/apis/test/testToken.php&quot;, {
      method: &quot;POST&quot;,
      headers: {
        &quot;Content-type&quot;: &quot;application/json&quot;,
        token: &quot;f4c902c9ae5a2a9d8f84868ad064e706&quot;
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code>fetch(<span class="hljs-string">"/apis/test/testToken.php"</span>, {
      method: <span class="hljs-string">"<span class="hljs-keyword">POST</span>"</span>,
      headers: {
        <span class="hljs-string">"Content-type"</span>: <span class="hljs-string">"application/json"</span>,
        token: <span class="hljs-string">"f4c902c9ae5a2a9d8f84868ad064e706"</span>
      },
      body: JSON.stringify(data)
    })
      .then(res =&gt; res.json())
      .then(data =&gt; {
        console.log(data);
      });</code></pre>
<h4>2、<code>axios</code>方式:</h4>
<p><strong>main.js代码</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './App'
import axios from 'axios'
Vue.config.productionTip = false

Vue.prototype.$axios = axios //将axios挂载在Vue实例原型上

// 设置axios请求的token
axios.defaults.headers.common['token'] = 'f4c902c9ae5a2a9d8f84868ad064e706'
//设置请求头
axios.defaults.headers.post[&quot;Content-type&quot;] = &quot;application/json&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>import Vue from <span class="hljs-string">'vue'</span>
import App from <span class="hljs-string">'./App'</span>
import axios from <span class="hljs-string">'axios'</span>
Vue<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.productionTip</span> = false

Vue<span class="hljs-selector-class">.prototype</span>.<span class="hljs-variable">$axios</span> = axios <span class="hljs-comment">//将axios挂载在Vue实例原型上</span>

<span class="hljs-comment">// 设置axios请求的token</span>
axios<span class="hljs-selector-class">.defaults</span><span class="hljs-selector-class">.headers</span><span class="hljs-selector-class">.common</span>[<span class="hljs-string">'token'</span>] = <span class="hljs-string">'f4c902c9ae5a2a9d8f84868ad064e706'</span>
<span class="hljs-comment">//设置请求头</span>
axios<span class="hljs-selector-class">.defaults</span><span class="hljs-selector-class">.headers</span><span class="hljs-selector-class">.post</span>[<span class="hljs-string">"Content-type"</span>] = <span class="hljs-string">"application/json"</span></code></pre>
<p><strong>axios请求页面代码</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$axios.post('/apis/test/testToken.php',data).then(res=>{
        console.log(res)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">this</span>.$axios.post(<span class="hljs-string">'/apis/test/testToken.php'</span>,data).then(<span class="hljs-function"><span class="hljs-params">res</span>=&gt;</span>{
        <span class="hljs-built_in">console</span>.log(res)
})</code></pre>
<p><strong>源码地址:</strong> <a href="https://github.com/LJZJIANG/vueCross" rel="nofollow noreferrer" target="_blank">从这里飞过去</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2.0 proxyTable配置，解决跨域

## 原文链接
[https://segmentfault.com/a/1190000014396546](https://segmentfault.com/a/1190000014396546)

