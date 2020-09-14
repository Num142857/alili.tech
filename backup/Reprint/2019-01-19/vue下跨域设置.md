---
title: 'vue下跨域设置' 
date: 2019-01-19 2:30:10
hidden: true
slug: 8hbz7acpcd
categories: [reprint]
---

{{< raw >}}

                    
<p>1、在使用vue开发的时候经常要涉及到跨域的问题，其实在vue cli中是有我们设置跨域请求的文件的。</p>
<p>2、当跨域无法请求的时候我们可以修改工程下config文件夹下的index.js中的dev:{}部分。<br>dev: {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/api': {
            target: 'http://api.douban.com/v2',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        }
    },
    // CSS Sourcemaps off by default because relative paths are &quot;buggy&quot;
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>    <span class="hljs-attribute">env</span>: require(<span class="hljs-string">'./dev.env'</span>),
    <span class="hljs-attribute">port</span>: <span class="hljs-number">8080</span>,
    <span class="hljs-attribute">autoOpenBrowser</span>: false,
    <span class="hljs-attribute">assetsSubDirectory</span>: <span class="hljs-string">'static'</span>,
    <span class="hljs-attribute">assetsPublicPath</span>: <span class="hljs-string">'/'</span>,
    <span class="hljs-attribute">proxyTable</span>: {
        <span class="hljs-string">'/api'</span>: {
            <span class="hljs-attribute">target</span>: <span class="hljs-string">'http://api.douban.com/v2'</span>,
            <span class="hljs-attribute">changeOrigin</span>: true,
            <span class="hljs-attribute">pathRewrite</span>: {
                <span class="hljs-string">'^/api'</span>: <span class="hljs-string">''</span>
            }
        }
    },
    <span class="hljs-comment">// CSS Sourcemaps off by default because relative paths are "buggy"</span>
    <span class="hljs-comment">// with this option, according to the CSS-Loader README</span>
    <span class="hljs-comment">// (https://github.com/webpack/css-loader#sourcemaps)</span>
    <span class="hljs-comment">// In our experience, they generally work as expected,</span>
    <span class="hljs-comment">// just be aware of this issue when enabling this option.</span>
    <span class="hljs-attribute">cssSourceMap</span>: false
}</code></pre>
<p>将target设置为我们需要访问的域名。</p>
<p>3、然后在main.js中设置全局属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.prototype.HOST = '/api'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">Vue<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.HOST</span> = <span class="hljs-string">'/api'</span></code></pre>
<p>4、至此，我们就可以在全局使用这个域名了，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var url = this.HOST + '/movie/in_theaters'
    this.$http.get(url).then(res => {
      this.movieList = res.data.subjects;
    },res => {
      console.info('调用失败');
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> url = <span class="hljs-keyword">this</span>.HOST + <span class="hljs-string">'/movie/in_theaters'</span>
    <span class="hljs-keyword">this</span>.$http.<span class="hljs-keyword">get</span>(url).then(res =&gt; {
      <span class="hljs-keyword">this</span>.movieList = res.<span class="hljs-keyword">data</span>.subjects;
    },res =&gt; {
      console.info(<span class="hljs-string">'调用失败'</span>);
    });</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue下跨域设置

## 原文链接
[https://segmentfault.com/a/1190000008629361](https://segmentfault.com/a/1190000008629361)

