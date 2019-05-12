---
title: 'vue-cli本地环境API代理设置和解决跨域' 
date: 2019-01-01 2:30:07
hidden: true
slug: k1oh4hbf3tj
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>我们在使用vue-cli启动项目的时候<code>npm run dev</code>便可以启动我们的项目了，通常我们的请求地址是以localhost:8080来请求接口数据的，localhost是没有办法设置cookie的。</p>
<p>我们可以在vue-cli配置文件里面设置一个代理，跨域的方法有很多，通常需要后台来进行配置。我们可以直接通过node.js代理服务器来实现跨域请求。</p>
<h2 id="articleHeader1">vue proxyTable接口跨域请求调试</h2>
<p>在vue-cli项目中的<code>config</code>文件夹下的<code>index.js</code>配置文件中，<code>dev</code>长这样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},   
    cssSourceMap: false
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-attr">dev:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    env:</span> <span class="hljs-string">require('./dev.env'),</span>
<span class="hljs-attr">    port:</span> <span class="hljs-number">8080</span><span class="hljs-string">,</span>
<span class="hljs-attr">    autoOpenBrowser:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    assetsSubDirectory:</span> <span class="hljs-string">'static'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    assetsPublicPath:</span> <span class="hljs-string">'/'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    proxyTable:</span> <span class="hljs-string">{},</span>   
<span class="hljs-attr">    cssSourceMap:</span> <span class="hljs-literal">false</span>
  <span class="hljs-string">}</span>
</code></pre>
<p>服务器提供的接口如果长这样<code>https://www.exaple.com/server_new/login</code>，我们把域名提取出来如<code>https://www.exaple.com</code>；</p>
<p>在config中新建一个文件命名为<code>proxyConfig.js </code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  proxy: {
        '/apis': {    //将www.exaple.com印射为/apis
            target: 'https://www.exaple.com',  // 接口域名
            secure: false,  // 如果是https接口，需要配置这个参数
            changeOrigin: true,  //是否跨域
            pathRewrite: {
                '^/apis': ''   //需要rewrite的,
            }              
        }
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  proxy: {
        <span class="hljs-string">'/apis'</span>: {    <span class="hljs-comment">//将www.exaple.com印射为/apis</span>
            target: <span class="hljs-string">'https://www.exaple.com'</span>,  <span class="hljs-comment">// 接口域名</span>
            secure: <span class="hljs-keyword">false</span>,  <span class="hljs-comment">// 如果是https接口，需要配置这个参数</span>
            changeOrigin: <span class="hljs-keyword">true</span>,  <span class="hljs-comment">//是否跨域</span>
            pathRewrite: {
                <span class="hljs-string">'^/apis'</span>: <span class="hljs-string">''</span>   <span class="hljs-comment">//需要rewrite的,</span>
            }              
        }
  }
}
</code></pre>
<p>如果本身的接口地址就有 '/api' 这种通用前缀，也就是说<code>https://www.exaple.com/api</code>，就可以把 <code>pathRewrite</code> 删掉。</p>
<p><code>config</code>文件夹下的<code>index.js</code>引入<code>proxyConfig.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var proxyConfig = require('./proxyConfig')
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> proxyConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./proxyConfig'</span>)
</code></pre>
<p><code>config</code>文件夹下的<code>index.js</code>中的<code>dev</code>改成:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: proxyConfig.proxy,
    cssSourceMap: false
  }
  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-attr">dev:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    env:</span> <span class="hljs-string">require('./dev.env'),</span>
<span class="hljs-attr">    port:</span> <span class="hljs-number">8080</span><span class="hljs-string">,</span>
<span class="hljs-attr">    autoOpenBrowser:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    assetsSubDirectory:</span> <span class="hljs-string">'static'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    assetsPublicPath:</span> <span class="hljs-string">'/'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    proxyTable:</span> <span class="hljs-string">proxyConfig.proxy,</span>
<span class="hljs-attr">    cssSourceMap:</span> <span class="hljs-literal">false</span>
  <span class="hljs-string">}</span>
  
</code></pre>
<p>重启项目<code>npm run dev</code>：</p>
<p>你会发现出现了这个</p>
<p><span class="img-wrap"><img data-src="/img/bVUlEp?w=455&amp;h=88" src="https://static.alili.tech/img/bVUlEp?w=455&amp;h=88" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这个时候我们已经设置好了本地API代理了</p>
<h2 id="articleHeader2">修改本地<code>hosts</code>文件</h2>
<p><code>window</code>文件路径一般是<code>C:\Window\System32\drivers\etc</code>，<code>mac</code>则直接前往文件夹<code>/etc/hosts</code>，打开<code>hosts</code>文件，在这一段下面把<code>localhost</code>设置进去</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# localhost name resolution is handled within DNS itself.
# 127.0.0.1       localhost
# ::1             localhost
127.0.0.1                   activate.adobe.com
127.0.0.1                   practivate.adobe.com
127.0.0.1                   lmlicenses.wip4.adobe.com
127.0.0.1                   lm.licenses.adobe.com
127.0.0.1                   na1r.services.adobe.com
127.0.0.1                   hlrcv.stage.adobe.com

localhost                   www.exaple.com            
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code># <span class="hljs-selector-tag">localhost</span> <span class="hljs-selector-tag">name</span> <span class="hljs-selector-tag">resolution</span> <span class="hljs-selector-tag">is</span> <span class="hljs-selector-tag">handled</span> <span class="hljs-selector-tag">within</span> <span class="hljs-selector-tag">DNS</span> <span class="hljs-selector-tag">itself</span>.
# 127<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1</span>       <span class="hljs-selector-tag">localhost</span>
# <span class="hljs-selector-pseudo">::1</span>             <span class="hljs-selector-tag">localhost</span>
127<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1</span>                   <span class="hljs-selector-tag">activate</span><span class="hljs-selector-class">.adobe</span><span class="hljs-selector-class">.com</span>
127<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1</span>                   <span class="hljs-selector-tag">practivate</span><span class="hljs-selector-class">.adobe</span><span class="hljs-selector-class">.com</span>
127<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1</span>                   <span class="hljs-selector-tag">lmlicenses</span><span class="hljs-selector-class">.wip4</span><span class="hljs-selector-class">.adobe</span><span class="hljs-selector-class">.com</span>
127<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1</span>                   <span class="hljs-selector-tag">lm</span><span class="hljs-selector-class">.licenses</span><span class="hljs-selector-class">.adobe</span><span class="hljs-selector-class">.com</span>
127<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1</span>                   <span class="hljs-selector-tag">na1r</span><span class="hljs-selector-class">.services</span><span class="hljs-selector-class">.adobe</span><span class="hljs-selector-class">.com</span>
127<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1</span>                   <span class="hljs-selector-tag">hlrcv</span><span class="hljs-selector-class">.stage</span><span class="hljs-selector-class">.adobe</span><span class="hljs-selector-class">.com</span>

<span class="hljs-selector-tag">localhost</span>                   <span class="hljs-selector-tag">www</span><span class="hljs-selector-class">.exaple</span><span class="hljs-selector-class">.com</span>            
</code></pre>
<h2 id="articleHeader3">搞定</h2>
<p>此时我们已经完全解决了跨域问题，以及本地测试后台无法向我们本地环境设置<code>cookie</code>的情况了。</p>
<h2 id="articleHeader4">补充</h2>
<p>这个文章发布很久了，很多人私信我问我开发地址是什么，上线地址是什么。</p>
<p>在这里进行一下补充，教大家一个一劳永逸的方法；</p>
<p>写一个<code>config.js</code>文件，作为项目地址的配置。</p>
<p>如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//项目域名地址
const url = 'https://exaple.com';


let ROOT;
//由于封装的axios请求中，会将ROOT打包进去，为了方便之后不再更改，判断了当前环境，而生成的不同的ROOT
if (process.env.NODE_ENV === 'development') {
    //开发环境下的代理地址，解决本地跨域跨域，配置在config目录下的index.js dev.proxyTable中
    ROOT = &quot;/apis&quot;
} else {
    //生产环境下的地址
    ROOT = url;
}

exports.PROXYROOT = url; //代理指向地址
exports.ROOT = ROOT;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">//项目域名地址</span>
<span class="hljs-keyword">const</span> <span class="hljs-built_in">url</span> = <span class="hljs-string">'https://exaple.com'</span>;


<span class="hljs-keyword">let</span> ROOT;
<span class="hljs-comment">//由于封装的axios请求中，会将ROOT打包进去，为了方便之后不再更改，判断了当前环境，而生成的不同的ROOT</span>
<span class="hljs-keyword">if</span> (process.env.NODE_ENV === <span class="hljs-string">'development'</span>) {
    <span class="hljs-comment">//开发环境下的代理地址，解决本地跨域跨域，配置在config目录下的index.js dev.proxyTable中</span>
    ROOT = <span class="hljs-string">"/apis"</span>
} <span class="hljs-title">else</span> {
    <span class="hljs-comment">//生产环境下的地址</span>
    ROOT = <span class="hljs-built_in">url</span>;
}

exports.PROXYROOT = <span class="hljs-built_in">url</span>; <span class="hljs-comment">//代理指向地址</span>
exports.ROOT = ROOT;</code></pre>
<p>这里暴露出去了两个接口，一个作为代理指向地址，也就是真正的请求地址，一个则为我们的<code>ajax</code>请求的地址。</p>
<p>我们将<code>ROOT</code>引入我们配置的<code>ajax</code>中，再将<code>proxyConfig.js</code>修改如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const config = require(&quot;../src/fetch/config&quot;);  //路径你们改下
module.exports = {
  proxy: {
        [config.ROOT]: {    //将www.exaple.com印射为/apis
            target: config.PROXYROOT,,  // 接口域名
            secure: false,  // 如果是https接口，需要配置这个参数
            changeOrigin: true,  //是否跨域
            pathRewrite: {
                [`^${config.ROOT}`]: ''   //需要rewrite的
            }              
        }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">"../src/fetch/config"</span>);  <span class="hljs-comment">//路径你们改下</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">proxy</span>: {
        [config.ROOT]: {    <span class="hljs-comment">//将www.exaple.com印射为/apis</span>
            target: config.PROXYROOT,,  <span class="hljs-comment">// 接口域名</span>
            secure: <span class="hljs-literal">false</span>,  <span class="hljs-comment">// 如果是https接口，需要配置这个参数</span>
            changeOrigin: <span class="hljs-literal">true</span>,  <span class="hljs-comment">//是否跨域</span>
            pathRewrite: {
                [<span class="hljs-string">`^<span class="hljs-subst">${config.ROOT}</span>`</span>]: <span class="hljs-string">''</span>   <span class="hljs-comment">//需要rewrite的</span>
            }              
        }
  }
}</code></pre>
<p>之后不管是生产环境，还是开发环境，都不用再修改我们的请求地址了。</p>
<p>写的比较潦草，没有整理思路，总结一下。</p>
<p>也就是说，之前我们的方法，在<code>npm run dev</code>的时候，<code>ajax</code>请求接口地址需要带上<code>/apis</code>，而如果我们在<code>npm run build</code>的时候，则需要将<code>ajax</code>接口地址改为真正的地址<code>www.exaple.com</code>，这样极其不方便，每次都要改。那我们便通过<code>process.env.NODE_ENV</code>来判断环境，从而导出不一样的接口。</p>
<p>好了，如果有小伙伴不太清楚的，私信我我重新整理一下当前教程，如果都能看懂我补充的，就不改啦哈哈😄。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli本地环境API代理设置和解决跨域

## 原文链接
[https://segmentfault.com/a/1190000011007043](https://segmentfault.com/a/1190000011007043)

