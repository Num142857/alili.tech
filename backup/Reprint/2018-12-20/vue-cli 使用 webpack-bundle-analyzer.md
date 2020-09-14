---
title: 'vue-cli 使用 webpack-bundle-analyzer' 
date: 2018-12-20 2:30:10
hidden: true
slug: avwdl0uymo7
categories: [reprint]
---

{{< raw >}}

                    
<p>浪费几多时间。 才来公司，填坑。然后发现项目打包越来越大。然后就满世界找解决方法。网上看到 webpack-bundle-analyzer 这个神器。然后各种说配置 package.json 文件。然后我配置完毕各种报错。</p>
<p>折腾一番，感觉玩不下去了。然后去看 vue-cli 的官方文档。然后找到 vuejs-templates/webpack 然后再看文档。我能说啥。看这段：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# build for production and view the bundle analyzer report
npm run build --report" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code># <span class="hljs-keyword">build</span> <span class="hljs-keyword">for</span> production <span class="hljs-keyword">and</span> <span class="hljs-keyword">view</span> the bundle analyzer report
npm run <span class="hljs-keyword">build</span> --report</code></pre>
<p>不用配置任何 script ，在 build 的时候添加参数 就好啦。然后运行一下，浏览器访问 <code>http://127.0.0.1:8888</code> 。</p>
<p>然后开始填坑。。。</p>
<p><span class="img-wrap"><img data-src="/img/bV1bZD?w=1920&amp;h=947" src="https://static.alili.tech/img/bV1bZD?w=1920&amp;h=947" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli 使用 webpack-bundle-analyzer

## 原文链接
[https://segmentfault.com/a/1190000012638455](https://segmentfault.com/a/1190000012638455)

