---
title: 'vue-cli创建的项目部署在相对路径，你需要做这些。' 
date: 2019-01-07 2:30:10
hidden: true
slug: mp663bk23f
categories: [reprint]
---

{{< raw >}}

                    
<p>如果静态文件不是部署在网站根目录下，vue-cli将给你造成巨大的麻烦。</p>
<p>你不能直接把build好的文件抛进一个目录。<br>你不能直接在本地打开用vue做好的静态网站。</p>
<p>改成相对路径，主要需要做两步。</p>
<p>1、修改config =&gt; index.js =&gt; build =&gt; assetsPublicPath 中的'/'成为'./'</p>
<p><span class="img-wrap"><img data-src="/img/bVRBK9?w=1053&amp;h=401" src="https://static.alili.tech/img/bVRBK9?w=1053&amp;h=401" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>2、在build =&gt; util.js 里找到ExtractTextPlugin.extract</p>
<p>增加一行：publicPath: '../../'</p>
<p><span class="img-wrap"><img data-src="/img/bVRBMp?w=1698&amp;h=776" src="https://static.alili.tech/img/bVRBMp?w=1698&amp;h=776" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong> 之后，你使用npm run build打包出来的文件，就可以直接打开运行啦！也可以直接作为HTML静态页面仍进服务器</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli创建的项目部署在相对路径，你需要做这些。

## 原文链接
[https://segmentfault.com/a/1190000010354315](https://segmentfault.com/a/1190000010354315)

