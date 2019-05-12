---
title: 'VsCode 配置Eslint格式化代码（vue）以及常用插件' 
date: 2018-12-01 2:30:12
hidden: true
slug: ts2l2weum0n
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">配置eslint</h1>
<ol>
<li>插件扩展商店搜索 <code>eslint</code>，点击安装，并重新加载；<br><span class="img-wrap"><img data-src="/img/bVbae54?w=971&amp;h=532" src="https://static.alili.tech/img/bVbae54?w=971&amp;h=532" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>
</li>
<li>配置<code>eslint</code>，打开 <code>文件</code>==&gt;<code>首选项</code>==&gt;<code>设置</code>；<br><span class="img-wrap"><img data-src="/img/bVbae7D?w=1049&amp;h=642" src="https://static.alili.tech/img/bVbae7D?w=1049&amp;h=642" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>
</li>
<li>
<p>在用户设置中插入配置代码(支持vue):</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &quot;eslint.options&quot;: {
        &quot;plugins&quot;: [
            &quot;html&quot;
        ]
    },
    &quot;eslint.validate&quot;: [
        &quot;javascript&quot;,
        &quot;javascriptreact&quot;,
        &quot;html&quot;,
        &quot;vue&quot;,
        {
            &quot;language&quot;: &quot;html&quot;,
            &quot;autoFix&quot;: true
        },
        {
            &quot;language&quot;: &quot;vue&quot;,
            &quot;autoFix&quot;: true
        }
    ],
    &quot;eslint.autoFixOnSave&quot;: true,
     &quot;editor.tabSize&quot;: 2," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>    <span class="hljs-string">"eslint.options"</span>: {
        <span class="hljs-string">"plugins"</span>: [
            <span class="hljs-string">"html"</span>
        ]
    },
    <span class="hljs-string">"eslint.validate"</span>: [
        <span class="hljs-string">"javascript"</span>,
        <span class="hljs-string">"javascriptreact"</span>,
        <span class="hljs-string">"html"</span>,
        <span class="hljs-string">"vue"</span>,
        {
            <span class="hljs-string">"language"</span>: <span class="hljs-string">"html"</span>,
            <span class="hljs-string">"autoFix"</span>: true
        },
        {
            <span class="hljs-string">"language"</span>: <span class="hljs-string">"vue"</span>,
            <span class="hljs-string">"autoFix"</span>: true
        }
    ],
    <span class="hljs-string">"eslint.autoFixOnSave"</span>: <span class="hljs-literal">true</span>,
     <span class="hljs-string">"editor.tabSize"</span>: <span class="hljs-number">2</span>,</code></pre>
<p>此时，eslint就可以在项目中检测代码了</p>
</li>
</ol>
<h1 id="articleHeader1">eslint检测比较严格，若希望vue按照eslint格式化代码，进行以下操作：</h1>
<ol>
<li>安装插件<code>Vetur</code>，这是vscode上一个vue.js代码提示，语法高亮等功能的流行插件；</li>
<li>安装后在默认配置可以看到，<code>vetur</code>默认采用<code>prettier</code>格式化；<br><span class="img-wrap"><img data-src="/img/bVbafbU?w=489&amp;h=570" src="https://static.alili.tech/img/bVbafbU?w=489&amp;h=570" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>
</li>
<li>
<p>安装插件<code>prettier</code>,但他的格式化并不和eslint一样，所以在用户配置中添加以下配置；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//分号
&quot;prettier.semi&quot;: false,
//单引号包裹字符串
&quot;prettier.singleQuote&quot;: true,
//html格式化依赖  默认为none
&quot;vetur.format.defaultFormatter.html&quot;: &quot;js-beautify-html&quot;,
//函数前加空格
&quot;javascript.format.insertSpaceBeforeFunctionParenthesis&quot;: true,
//没有下边这个 上边不生效
&quot;vetur.format.defaultFormatter.js&quot;: &quot;vscode-typescript&quot;," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//分号</span>
<span class="hljs-string">"prettier.semi"</span>: <span class="hljs-literal">false</span>,
<span class="hljs-comment">//单引号包裹字符串</span>
<span class="hljs-string">"prettier.singleQuote"</span>: <span class="hljs-literal">true</span>,
<span class="hljs-comment">//html格式化依赖  默认为none</span>
<span class="hljs-string">"vetur.format.defaultFormatter.html"</span>: <span class="hljs-string">"js-beautify-html"</span>,
<span class="hljs-comment">//函数前加空格</span>
<span class="hljs-string">"javascript.format.insertSpaceBeforeFunctionParenthesis"</span>: <span class="hljs-literal">true</span>,
<span class="hljs-comment">//没有下边这个 上边不生效</span>
<span class="hljs-string">"vetur.format.defaultFormatter.js"</span>: <span class="hljs-string">"vscode-typescript"</span>,</code></pre>
</li>
</ol>
<h1 id="articleHeader2">vue扩展推荐</h1>
<ul>
<li>Vue VSCode Snippets</li>
<li>
<p>Vue 2 Snippets</p>
<blockquote>上面是两个很好用的vue代码片段</blockquote>
</li>
<li>Better Comments  高亮你注释的扩展 比如：<br><span class="img-wrap"><img data-src="/img/bVbafgN?w=426&amp;h=128" src="https://static.alili.tech/img/bVbafgN?w=426&amp;h=128" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>
</li>
<li>css peek  css转到定义</li>
<li>file peek file到定义</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VsCode 配置Eslint格式化代码（vue）以及常用插件

## 原文链接
[https://segmentfault.com/a/1190000014796012](https://segmentfault.com/a/1190000014796012)

