---
title: 'webpack雪碧图实现（webpack管理小图标素材）' 
date: 2019-01-19 2:30:10
hidden: true
slug: 3cssk32364y
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>雪碧图也叫CSS精灵， 是一CSS图像合成技术，这里介绍webpack实现雪碧图</strong></p>
<p>//新手建议先看上一篇文章，结合实例容易理解；<br>//<a href="https://segmentfault.com/a/1190000008602934">webpack+vue+vueRouter模块化构建完整项目实例超详细步骤（附截图、代码、入门篇）</a> </p>
<p>这是我的文件目录：<br><span class="img-wrap"><img data-src="/img/bVKnaH?w=314&amp;h=706" src="https://static.alili.tech/img/bVKnaH?w=314&amp;h=706" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>// 在上个实例项目上增加了icons文件夹；</p>
<p>// dist/sprites/目录是后面执行webpack打包命令自动生成的，先不用管；</p>
<p>1、安装webpack-spritesmith；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev webpack-spritesmith" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> webpack-spritesmith</code></pre>
<p>2、webpack.config.js添加如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var SpritesmithPlugin = require('webpack-spritesmith');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var SpritesmithPlugin</span> = require(<span class="hljs-string">'webpack-spritesmith'</span>);
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//module.exports = {//代码}
  plugins: [
        new SpritesmithPlugin({
            // 目标小图标
            src: {
                cwd: path.resolve(__dirname, './src/assets/imgs/icons'),
                glob: '*.png'
            },
            // 输出雪碧图文件及样式文件
            target: {
                image: path.resolve(__dirname, './dist/sprites/sprite.png'),
                css: path.resolve(__dirname, './dist/sprites/sprite.css')
            },
            // 样式文件中调用雪碧图地址写法
            apiOptions: {
                cssImageRef: '../sprites/sprite.png'
            },
            spritesmithOptions: {
                algorithm: 'top-down'
            }
        })
    ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">//module.exports = {//代码}</span>
  <span class="hljs-attribute">plugins</span>: [
        new SpritesmithPlugin({
            <span class="hljs-comment">// 目标小图标</span>
            <span class="hljs-attribute">src</span>: {
                <span class="hljs-attribute">cwd</span>: path.resolve(__dirname, <span class="hljs-string">'./src/assets/imgs/icons'</span>),
                <span class="hljs-attribute">glob</span>: <span class="hljs-string">'*.png'</span>
            },
            <span class="hljs-comment">// 输出雪碧图文件及样式文件</span>
            <span class="hljs-attribute">target</span>: {
                <span class="hljs-attribute">image</span>: path.resolve(__dirname, <span class="hljs-string">'./dist/sprites/sprite.png'</span>),
                <span class="hljs-attribute">css</span>: path.resolve(__dirname, <span class="hljs-string">'./dist/sprites/sprite.css'</span>)
            },
            <span class="hljs-comment">// 样式文件中调用雪碧图地址写法</span>
            <span class="hljs-attribute">apiOptions</span>: {
                <span class="hljs-attribute">cssImageRef</span>: <span class="hljs-string">'../sprites/sprite.png'</span>
            },
            <span class="hljs-attribute">spritesmithOptions</span>: {
                <span class="hljs-attribute">algorithm</span>: <span class="hljs-string">'top-down'</span>
            }
        })
    ]</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVKnbk?w=700&amp;h=876" src="https://static.alili.tech/img/bVKnbk?w=700&amp;h=876" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>3、执行webpack打包指令,执行后打包生成dist/sprites/文件(或者上一篇文章写的npm run build指令)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">webpack</span>
</code></pre>
<p>4、index.html文件中引入sprite.css，如：</p>
<p>&lt;link rel="stylesheet" type="text/css" href="./dist/sprites/sprite.css" /&gt;</p>
<p>5、App.vue中通过class引用小图标，如：（具体图标class进入sprite.css查看）<br><br><br><span class="img-wrap"><img data-src="/img/bVKndB?w=482&amp;h=231" src="https://static.alili.tech/img/bVKndB?w=482&amp;h=231" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>i标签是行内元素，可以添加css为i.icon{display:inline-block}</p>
<p>6、执行命令webpack-dev-server，生产链接浏览器打开（或者上一篇文章写的npm run dev）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack-dev-server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code style="word-break: break-word; white-space: initial;">webpack-dev-<span class="hljs-keyword">server</span></code></pre>
<p>ok,效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVKnfe?w=722&amp;h=635" src="https://static.alili.tech/img/bVKnfe?w=722&amp;h=635" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack雪碧图实现（webpack管理小图标素材）

## 原文链接
[https://segmentfault.com/a/1190000008630212](https://segmentfault.com/a/1190000008630212)

