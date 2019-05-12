---
title: '在小程序开发中使用 npm' 
date: 2019-02-13 2:31:22
hidden: true
slug: ihnzwyw00q8
categories: [reprint]
---

{{< raw >}}

                    
<p>微信小程序在 2.2.1 版本后增加了对 npm 包加载的支持，使得小程序支持使用 npm 安装第三方包。</p>
<h2 id="articleHeader0">1、在小程序中加载 npm 包</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install miniprogram-datepicker --production
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> miniprogram-datepicker <span class="hljs-comment">--production</span>
</code></pre>
<p>node_modules可以 在小程序根目录下，也可以存在于小程序根目录下的各个子目录中。但是不可以 在小程序根目录外。使用--production选项，可以减少安装一些业务无关的 npm 包，从而减少整个小程序包的大小。</p>
<h2 id="articleHeader1">2、构建 npm 包</h2>
<p>在微信小程序开发工具的「工具」菜单下点击「构建 npm」命令，进行 npm 包的构建，此构建可以将 npm 包构建成在小程序中可加载使用的包。</p>
<p>node_modules 目录不会参与编译、上传和打包中，所以小程序想要使用 npm 包必须走一遍“构建 npm”的过程，在最外层的 node_modules 的同级目录下会生成一个 miniprogram_npm 目录，里面会存放构建打包后的 npm 包，也就是小程序真正使用的 npm 包。</p>
<p>构建打包分为两种：小程序 npm 包会直接拷贝构建文件生成目录下的所有文件到 miniprogram_npm 中；其他 npm 包则会从入口 js 文件开始走一遍依赖分析和打包过程（类似 webpack）。</p>
<p>寻找 npm 包的过程和 npm 的实现类似，从依赖 npm 包的文件所在目录开始逐层往外找，直到找到可用的 npm 包或是小程序根目录为止。<br><span class="img-wrap"><img data-src="/img/bVbigfs?w=1366&amp;h=728" src="https://static.alili.tech/img/bVbigfs?w=1366&amp;h=728" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>构建完成后还需要确认项目已勾选了「使用 npm 模块」。<br><span class="img-wrap"><img data-src="/img/bVbigfC?w=1366&amp;h=728" src="https://static.alili.tech/img/bVbigfC?w=1366&amp;h=728" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">3、使用npm包</h2>
<p>js 中引入 npm 包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const package = require('packageName')
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-keyword">const</span> <span class="hljs-keyword">package</span> = require(<span class="hljs-string">'packageName'</span>)
</code></pre>
<p>使用 npm 包中的自定义组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;usingComponents&quot;: {
      &quot;datepicker&quot;: &quot;miniprogram-datepicker&quot;
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"usingComponents"</span>: {
      <span class="hljs-attr">"datepicker"</span>: <span class="hljs-string">"miniprogram-datepicker"</span>
    }
}
</code></pre>
<p>miniprogram-datepicker组件运行效果<br><span class="img-wrap"><img data-src="/img/bVbigfD?w=489&amp;h=661" src="https://static.alili.tech/img/bVbigfD?w=489&amp;h=661" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3"><strong>其他</strong></h2>
<p>微信小程序npm支持文档：<a href="https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html" rel="nofollow noreferrer" target="_blank">https://developers.weixin.qq....</a></p>
<h2 id="articleHeader4"><strong>【小程序推荐】百科知识词典</strong></h2>
<p><span class="img-wrap"><img data-src="/img/bVbigfT?w=640&amp;h=360" src="https://static.alili.tech/img/bVbigfT?w=640&amp;h=360" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在小程序开发中使用 npm

## 原文链接
[https://segmentfault.com/a/1190000016706395](https://segmentfault.com/a/1190000016706395)

