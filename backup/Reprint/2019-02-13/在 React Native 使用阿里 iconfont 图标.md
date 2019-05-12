---
title: '在 React Native 使用阿里 iconfont 图标' 
date: 2019-02-13 2:31:23
hidden: true
slug: jrdzjtu4hom
categories: [reprint]
---

{{< raw >}}

                    
<p>熟悉前端开发的大家都一定知道 iconfont.cn，在网站下载图标集，会自带教程告诉你如何在网页使用 iconfont。但是在 React Native 中，跟网页使用的步骤就不同了。我最开始百度出来的文章，不少都推荐借用 <code>react-native-vector-icons</code>，但是我觉得这一步还是增加了不少无用代码。<br>其实使用 iconfont，本质上就是使用一种“图标形状的字体”，所以解决问题只需要三步：</p>
<ol>
<li>安装字体</li>
<li>找到图标对应的 unicode，直接放到 <code>&lt;Text&gt;</code> 标签中</li>
<li>在该标签应用你的“图标字体”</li>
</ol>
<h1 id="articleHeader0">安装字体</h1>
<p>这是一个把配置都交给 react-native 的一个简单方法：<br>首先在 <code>package.json</code> 添加代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;rnpm&quot;: {
    &quot;assets&quot;: [
    &quot;./assets/fonts/&quot;
    ]
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code><span class="hljs-string">"rnpm"</span>: {
    <span class="hljs-string">"assets"</span>: [
    <span class="hljs-string">"./assets/fonts/"</span>
    ]
},</code></pre>
<p>然后运行<br><code>react-native link</code><br>你就可以在 plist 文件（iOS）或 android/app/src/main/assets/fonts（安卓）中看到对应配置<br><strong>安装后需要重启 react-native</strong></p>
<h1 id="articleHeader1">添加图标</h1>
<p>打开在 <a href="http://www.iconfont.cn/" rel="nofollow noreferrer" target="_blank">iconfont</a> 下载的图标集会有这个文件</p>
<p><span class="img-wrap"><img data-src="/img/bVbi3IM?w=308&amp;h=116" src="https://static.alili.tech/img/bVbi3IM?w=308&amp;h=116" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>里面可以看到对应图标的 unicode</p>
<p><span class="img-wrap"><img data-src="/img/bVbi3IR?w=1434&amp;h=520" src="https://static.alili.tech/img/bVbi3IR?w=1434&amp;h=520" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>把你使用的图标放到标签中 <code>&lt;Text&gt;{'\ue936'}&lt;/Text&gt;</code></p>
<h1 id="articleHeader2">应用字体</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Text style="{{"
    fontFamily: &quot;iconfont&quot;,
    fontSize: FONTSIZE,
    marginRight: 9
"}}">{'\ue936'}</Text>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>&lt;Text style="{{"
    fontFamily: <span class="hljs-string">"iconfont"</span>,
    fontSize: FONTSIZE,
    marginRight: <span class="hljs-number">9</span>
"}}"&gt;{<span class="hljs-string">'\ue936'</span>}&lt;/Text&gt;</code></pre>
<p>有一点需要注意，<strong>写在 fontFamily 的字体名称要使用全名（而不是文件名）</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVbi3JP?w=728&amp;h=326" src="https://static.alili.tech/img/bVbi3JP?w=728&amp;h=326" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>不过 iconfont 三个名字都一样就是了</p>
<p><span class="img-wrap"><img data-src="/img/bVbi3JT?w=634&amp;h=278" src="https://static.alili.tech/img/bVbi3JT?w=634&amp;h=278" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote>参考文章：<br><a href="https://medium.com/react-native-training/react-native-custom-fonts-ccc9aacf9e5e" rel="nofollow noreferrer" target="_blank">https://medium.com/react-nati...</a><br><a href="http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blo...</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 React Native 使用阿里 iconfont 图标

## 原文链接
[https://segmentfault.com/a/1190000016896623](https://segmentfault.com/a/1190000016896623)

