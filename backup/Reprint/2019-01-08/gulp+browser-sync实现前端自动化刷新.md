---
title: 'gulp+browser-sync实现前端自动化刷新' 
date: 2019-01-08 2:30:11
hidden: true
slug: p03sfwjrzbk
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在前面</h2>
<ol>
<li><p>安装环境前，默认安装了<code>node</code>环境</p></li>
<li><p>会使用基本的命令行操作</p></li>
</ol>
<h2 id="articleHeader1">步骤</h2>
<h3 id="articleHeader2">初始化环境</h3>
<ol>
<li><p>新建一个文件夹</p></li>
<li>
<p>在文件夹打开命令行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm init" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> init</code></pre>
<p>一直回车默认选项就可以啦，也可以自己设置</p>
</li>
<li><p>最后一次回车结束后，会生成一个<code>package.json</code>文件</p></li>
</ol>
<h3 id="articleHeader3">安装<code>gulp</code>
</h3>
<ol>
<li>
<p>若是第一次使用<code>gulp</code>，则需要先全局安装<code>gulp</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --global gulp" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> install --<span class="hljs-built_in">global</span> gulp</code></pre>
</li>
<li>
<p>若已经全局安装<code>gulp</code>,则直接在工程根目录下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install gulp --save-dev " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install gulp --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> </code></pre>
</li>
<li><p>输入gulp -v,显示版本说明安装成功</p></li>
</ol>
<h3 id="articleHeader4">安装<code>browser-sync</code>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install browser-sync --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> browser-<span class="hljs-keyword">sync</span> <span class="hljs-comment">--save-dev</span></code></pre>
<h3 id="articleHeader5">配置<code>gulpfile</code>文件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
    var files = [
    '**/*.html',   // 监听html
    '**/*.css', // 监听css
    '**/*.js' // 监听js
    ];
    browserSync.init(files,{
        server: {
            baseDir: &quot;./&quot;
        }
    });
});

gulp.task('default',['browser-sync']); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> gulp        = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp'</span>);
<span class="hljs-keyword">var</span> browserSync = <span class="hljs-built_in">require</span>(<span class="hljs-string">'browser-sync'</span>).create();

<span class="hljs-comment">// Static server</span>
gulp.task(<span class="hljs-string">'browser-sync'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> files = [
    <span class="hljs-string">'**/*.html'</span>,   <span class="hljs-comment">// 监听html</span>
    <span class="hljs-string">'**/*.css'</span>, <span class="hljs-comment">// 监听css</span>
    <span class="hljs-string">'**/*.js'</span> <span class="hljs-comment">// 监听js</span>
    ];
    browserSync.init(files,{
        <span class="hljs-attr">server</span>: {
            <span class="hljs-attr">baseDir</span>: <span class="hljs-string">"./"</span>
        }
    });
});

gulp.task(<span class="hljs-string">'default'</span>,[<span class="hljs-string">'browser-sync'</span>]); </code></pre>
<h3 id="articleHeader6">测试</h3>
<p>在工程根目录下打开命令行运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">gulp</span></code></pre>
<p>若上述无错误，将会在浏览器打开3000端口，这时输入相应的<code>文件名.html</code>就可以访问页面并实时刷新。比如有一个文件名叫<code>主页.html</code>，在浏览器地址栏输入<code>http://localhost:3000/主页.html</code>即可。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
gulp+browser-sync实现前端自动化刷新

## 原文链接
[https://segmentfault.com/a/1190000010248318](https://segmentfault.com/a/1190000010248318)

