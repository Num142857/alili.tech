---
title: 'webpack手动构建vue和vue-cli构建使用 px2rem-loader ,全局自动转换px单位,让自适应来的更简单点!' 
date: 2018-12-08 2:30:30
hidden: true
slug: f0i67oxjdrh
categories: [reprint]
---

{{< raw >}}

                    
<p>做移动端时，适配 是必须的。使用rem单位，可在不同屏幕上完美显示相同的布局。px2rem 插件方便的将px单位转为了rem。</p>
<h2 id="articleHeader0">1. 自己手动构建vue webpck配置</h2>
<p>我们在开发过程中，我们在css文件中，直接按设计稿，直接以px像素为单位，然后在真正的应用中，我们想让px自动转制为rem单位，那这个要怎么让构建工具自动转换呢？</p>
<p>大家想一下，我们的构建工具，其实最主要还是来自vue，vue这个文件中我们使用了vue-loader,那如果说你使用了vue-cli脚手架的话，那么你想增加这个功能，并不简单，但是我们手工打造构建工具，就不受限制，想怎么用就怎么用，按照刚才的思路，我们知道，所有的文件几乎是vue文件，所有的loader是vue-loader。</p>
<p>在webpack配置，我们一个文件可以使用多个loader, 我们使用vue-loader也可以用其它loader，那怎么用呢？这就要去看vue官方文档了。</p>
<p>这边我为大家找到这个<a href="https://vue-loader.vuejs.org/zh-cn/configurations/pre-processors.html" rel="nofollow noreferrer" target="_blank">文档</a></p>
<p><span class="img-wrap"><img data-src="/img/bV6YvI?w=811&amp;h=525" src="https://static.alili.tech/img/bV6YvI?w=811&amp;h=525" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>通过官方文档，我们可以了解到，要使用sass-loader,要需要在vue-loader中，增加一个options进行相应的配置就可以使用对应的loader了。</p>
<p>我们现在要做的是能自动将px转换成rem,所以跟这也有相似类，只要我们将转换的loader添加进行就可以了，那能将px自动转换成rem是哪个loader呢？</p>
<p>那我们要怎么找呢？当我们不会的时候，可以到<a href="https://www.npmjs.com/" rel="nofollow noreferrer" target="_blank">npm.js官网</a>，然后可以猜想一到输入px, rem,一回车就可以看到</p>
<p><span class="img-wrap"><img data-src="/img/bV6YCl?w=808&amp;h=579" src="https://static.alili.tech/img/bV6YCl?w=808&amp;h=579" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>从图中我们可以看到有个px2rem2-loader，下面还有一个px2rem，我们直接搜索px2rem</p>
<p><span class="img-wrap"><img data-src="/img/bV6YCR?w=991&amp;h=361" src="https://static.alili.tech/img/bV6YCR?w=991&amp;h=361" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这种loader有多个，平常我们用的比较多的还是px2rem，所以这边 就介绍px2rem，其它loader可以自行研究噢！点击进去我们可以发现</p>
<p><span class="img-wrap"><img data-src="/img/bV6YFG?w=791&amp;h=338" src="https://static.alili.tech/img/bV6YFG?w=791&amp;h=338" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>里面有介绍我们怎么安装，以及怎么引入，我们可以模仿vue官网的写法 </p>
<p><span class="img-wrap"><img data-src="/img/bV6YGD?w=783&amp;h=204" src="https://static.alili.tech/img/bV6YGD?w=783&amp;h=204" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如上图,我们主要注意几点</p>
<ol>
<li>loader解析顺序是按从右到左的方法解析的。</li>
<li>px2rem官网是没有带后缀.loader,webpack2.0之后是没允许的，所以这边我们要加上后缀。</li>
<li>scss文件首先要把scss转成正常的css，在交给px2rem.loader来做，所以是外还需要加上一个sass-loader</li>
<li>remUnit: 750//设计稿宽度/10,remPrecision:表示转换过程小数保留几位。</li>
</ol>
<h2 id="articleHeader1">2. 使用vue-cli构建px2rem.loader</h2>
<h4>1）.下载lib-flexible</h4>
<p>我使用的是vue-cli+webpack，所以是通过npm来安装的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i lib-flexible --save
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>npm i <span class="hljs-class"><span class="hljs-keyword">lib</span>-<span class="hljs-title">flexible</span> --<span class="hljs-title">save</span></span>
</code></pre>
<h4>2）引入lib-flexible</h4>
<p>在main.js中引入lib-flexible</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'lib-flexible/flexible'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">import</span> <span class="hljs-string">'lib-flexible/flexible'</span>
</code></pre>
<h4>3) 安装px2rem-loader</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install px2rem-loader
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>npm <span class="hljs-keyword">install</span> px2rem-loader
</code></pre>
<h4>4).配置px2rem-loader</h4>
<p>在build下的 utils.js中，找到generateLoaders 方法，在这里添加 。</p>
<p><span class="img-wrap"><img data-src="/img/bV6YRP?w=647&amp;h=420" src="https://static.alili.tech/img/bV6YRP?w=647&amp;h=420" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>安装配置结束后，重启项目 。然后再浏览器中查看。会发现自己设置的px被转为rem 了。</p>
<blockquote>愿你成为终身学习者</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack手动构建vue和vue-cli构建使用 px2rem-loader ,全局自动转换px单位,让自适应来的更简单点!

## 原文链接
[https://segmentfault.com/a/1190000014018114](https://segmentfault.com/a/1190000014018114)

