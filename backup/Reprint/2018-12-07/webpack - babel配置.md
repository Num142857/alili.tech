---
title: 'webpack - babel配置' 
date: 2018-12-07 2:30:10
hidden: true
slug: xt76b36ikkj
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">webpack - babel配置</h1>
<p>babel是一个javascript编译器，是前端开发中的一个利器。它突破了浏览器实现es标准的限制，使我们在开发中可以使用最新的javascript语法。</p>
<p>通过构建和babel，可以使用最新js语法进行开发，最后自动编译成用于浏览器或node环境的代码。</p>
<h2 id="articleHeader1">webpack中使用babel</h2>
<p>配合webpack使用babel前，需要首先使用<code>npm init</code>初始化一个项目，<code>npm install -g webpack</code>安装webpack（全局安装是为了在命令行使用webpack命令）。</p>
<ul><li>安装babel-loader, babel-core, babel-preset-env。</li></ul>
<p><code>npm install --save-dev babel-loader babel-core babel-preset-env</code><br>其中，babel-preset-env插件是为了告诉babel只编译批准的内容，相当于babel-preset-es2015, es2016, es2017及最新版本。通过它可以使用最新的js语法。</p>
<ul><li>配置webpack.config.js</li></ul>
<p>在webpack配置文件中配置bable-loader</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
    rules: [
        {
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env',{
                            targets: {
                                browsers: ['> 1%', 'last 2 versions']
                            }
                        }]
                    ]
                }
            },
            exclude: '/node_modules/'
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>module: {
    rule<span class="hljs-variable">s:</span> [
        {
            tes<span class="hljs-variable">t:</span> /\.js$/,
            use: {
                loader: <span class="hljs-string">'babel-loader'</span>,
                option<span class="hljs-variable">s:</span> {
                    preset<span class="hljs-variable">s:</span> [
                        [<span class="hljs-string">'env'</span>,{
                            target<span class="hljs-variable">s:</span> {
                                browser<span class="hljs-variable">s:</span> [<span class="hljs-string">'&gt; 1%'</span>, <span class="hljs-string">'last 2 versions'</span>]
                            }
                        }]
                    ]
                }
            },
            exclude: <span class="hljs-string">'/node_modules/'</span>
        }
    ]
}</code></pre>
<p>其中，exclude是定义不希望babel处理的文件。targets是presets的一些预设选项，这里表示将js用于浏览器，只确保占比大于1%的浏览器的特性，主流浏览器的最新两个主版本。<br>更多与配置有关的信息，可以参考：<br><a href="https://babeljs.cn/docs/plugins/preset-env/" rel="nofollow noreferrer" target="_blank">babel env preset设置</a>,<br><a href="https://github.com/browserslist/browserslist" rel="nofollow noreferrer" target="_blank">browserlist预设置</a>.</p>
<ul>
<li>在命令行中运行相应webpack命令即可。</li>
<li>由于babel-preset配置选项较多，我们一般可以在根目录下建立.babelrc文件，专门用来放置babel preset配置，这是一个json文件。可以将上述配置修改如下：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//.bablerc文件
{
    &quot;presets&quot;: [
        ['env',{
            &quot;targets&quot;: {
                &quot;browsers&quot;: ['> 1%', 'last 2 versions']
            }
        }]
    ]
}

//原webpack.config.js文件
module: {
    rules: [
        {
            test: /\.js$/,
            use: {
                loader: 'babel-loader'
            },
            exclude: '/node_modules/'
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>//.bablerc文件
{
    <span class="hljs-string">"presets"</span>: [
        [<span class="hljs-string">'env'</span>,{
            <span class="hljs-string">"targets"</span>: {
                <span class="hljs-string">"browsers"</span>: [<span class="hljs-string">'&gt; 1%'</span>, <span class="hljs-string">'last 2 versions'</span>]
            }
        }]
    ]
}

//原webpack.config.js文件
module: {
    rules: [
        {
            test: /\.js$/,
            use: {
                loader: <span class="hljs-string">'babel-loader'</span>
            },
            exclude: <span class="hljs-string">'/node_modules/'</span>
        }
    ]
}</code></pre>
<h2 id="articleHeader2">babel-polifill插件</h2>
<p>在上面的babel配置中，babel只是将一些es6，es7-8的语法转换成符合目标的js代码，但是如果我们使用一些特性或方法，比如Generator, Set, 或者一些方法。babel并不能转换为低版本浏览器识别的代码。这时就需要babel-polifill。</p>
<p>简单的说，polifill就是一个垫片，提供了一些低版本es标准对高级特性的实现。使用polifill的方法如下：</p>
<p><code>npm install --save babel-polifill</code></p>
<p>然后在应用入口引入polifill，要确保它在任何其他代码/依赖声明前被调用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//CommonJS module
require('babel-polyfill');

//es module
import 'babel-polifill';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-regexp">//</span>CommonJS <span class="hljs-built_in">module</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'babel-polyfill'</span>);

<span class="hljs-regexp">//</span>es <span class="hljs-built_in">module</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'babel-polifill'</span>;</code></pre>
<p>在webpack.config.js中，将babel-polifill加入entry数组中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: [&quot;babel-polifill&quot;, &quot;./app.js&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">entry</span>: [<span class="hljs-string">"babel-polifill"</span>, <span class="hljs-string">"./app.js"</span>]</code></pre>
<p>相比于runtime-transform，polifill用于应用开发中。会添加相应变量到全局，所以会污染全局变量。</p>
<p>更多细节参考<a href="https://babeljs.cn/docs/usage/polyfill/" rel="nofollow noreferrer" target="_blank">babel-polifill</a>。</p>
<h2 id="articleHeader3">runtime-transform插件</h2>
<p>runtime transform也是一个插件，它与polifill有些类似，但它不污染全局变量，所以经常用于框架开发。</p>
<p>安装：<br><code>npm install --save-dev babel-plugin-transform-runtime</code></p>
<p><code>npm install --save babel-runtime</code></p>
<p>用法：<br>将下面内容添加到.bablerc文件中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;plugins&quot;: [&quot;transform-runtime&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"plugins"</span>: [<span class="hljs-string">"transform-runtime"</span>]
}</code></pre>
<p>更多细节参考<a href="https://babeljs.cn/docs/plugins/transform-runtime/" rel="nofollow noreferrer" target="_blank">bable-runtime-transform插件</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack - babel配置

## 原文链接
[https://segmentfault.com/a/1190000014167121](https://segmentfault.com/a/1190000014167121)

