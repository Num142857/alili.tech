---
title: 'JavaScript新鲜事·第4期' 
date: 2019-02-05 2:30:09
hidden: true
slug: 7tsrokjxjsh
categories: [reprint]
---

{{< raw >}}

                    
<h4>Vue 2.0 RC1发布</h4>
<p><span class="img-wrap"><img data-src="/img/bVAqQ0" src="https://static.alili.tech/img/bVAqQ0" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>Vue在四月份的时候已经公布了2.0，最近Vue发布了2.0的第一个RC版本，也就是说从RC1到正式版发布，API已经不再会有大的变动了，喜欢尝鲜的朋友已经可以去试试了。<br>链接：<a href="https://medium.com/the-vue-point/the-state-of-vue-1655e10a340a" rel="nofollow noreferrer" target="_blank">https://medium.com/the-vue-point/the-state-of-vue-1655e10a340a</a></p>
<h4>PyMiniRacer</h4>
<p><span class="img-wrap"><img data-src="/img/bVAqQ2" src="https://static.alili.tech/img/bVAqQ2" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>这是一个Python项目，嵌入式的V8引擎，能运行JavaScript代码，与此前的pyv8做着同样的事，这个轮子又有什么优势呢？有兴趣的可以去探究一下。<br>项目地址：<a href="https://github.com/sqreen/PyMiniRacer" rel="nofollow noreferrer" target="_blank">https://github.com/sqreen/PyMiniRacer</a></p>
<h4>baffle.js</h4>
<p>这是一个实现文字效果的库，使文字变成乱码然后逐渐恢复，实际感受还得自行体会。<br><span class="img-wrap"><img data-src="/img/bVAqRa" src="https://static.alili.tech/img/bVAqRa" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>官网：<a href="https://camwiegert.github.io/baffle" rel="nofollow noreferrer" target="_blank">https://camwiegert.github.io/baffle</a></p>
<h4>js-joda</h4>
<p>js-joda是一个提供不可变Date和Time类型的库。不可变的数据类型(Immutable)一直是函数式编程必备，Facebook虽然提供了ImmutableJS，但是只有集合类型，如Set、Map、List等，如果你需要到不可变的Date和Time，那js-joda也是一个不错的选择。<br>项目地址：<a href="https://github.com/js-joda/js-joda" rel="nofollow noreferrer" target="_blank">https://github.com/js-joda/js-joda</a></p>
<h4>Typr.js</h4>
<p>一个用于处理字体（TTF、OTF）的库，是一个opentype.js的替代方案，声称解析速度比opentype.js快2到5倍，但体积却小了4倍！<br>项目地址：<a href="https://github.com/photopea/Typr.js" rel="nofollow noreferrer" target="_blank">https://github.com/photopea/Typr.js</a></p>
<h4>lightgallery.js</h4>
<p>顾名思义，一个模块化的图片轮播、相册画廊的轻量级js库，无依赖、功能齐全、响应式的，还支持HTML5视频。<br><span class="img-wrap"><img data-src="/img/bVAqRd" src="https://static.alili.tech/img/bVAqRd" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>官网：<a href="https://sachinchoolur.github.io/lightgallery.js/" rel="nofollow noreferrer" target="_blank">https://sachinchoolur.github.io/lightgallery.js/</a></p>
<h4>react-media</h4>
<p>一个让React支持CSS媒体查询(media query)的组件，用法比较简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import Media from 'react-media'

class App extends React.Component {
  render() {
    return (
      <div>
        <Media query=&quot;(max-width: 599px)&quot;>
          {matches => matches ? (
            <p>The document is less than 600px wide.</p>
          ) : (
            <p>The document is at least 600px wide.</p>
          )}
        </Media>
      </div>
    )
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> Media <span class="hljs-keyword">from</span> <span class="hljs-string">'react-media'</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Media</span> <span class="hljs-attr">query</span>=<span class="hljs-string">"(max-width: 599px)"</span>&gt;</span>
          {matches =&gt; matches ? (
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>The document is less than 600px wide.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          ) : (
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>The document is at least 600px wide.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          )}
        <span class="hljs-tag">&lt;/<span class="hljs-name">Media</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}
</code></pre>
<p>项目地址：<a href="https://github.com/ReactTraining/react-media" rel="nofollow noreferrer" target="_blank">https://github.com/ReactTraining/react-media</a></p>
<h4>dn2a-javascript</h4>
<p>一个dn2a（Digital Neural Network Architecture<br>：数字神经网络架构）的javascript实现，这货分明是一个跟人工智能的有关的东西，有兴趣的同学可以研究研究。<br>项目地址：<a href="https://github.com/dn2a/dn2a-javascript" rel="nofollow noreferrer" target="_blank">https://github.com/dn2a/dn2a-javascript</a></p>
<h4>Mister-Poster</h4>
<p><span class="img-wrap"><img data-src="/img/bVAqRo" src="https://static.alili.tech/img/bVAqRo" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>一个用React Native、Redux和Firebase做出来的移动端App。<br>项目地址：<a href="https://github.com/shoumma/Mister-Poster" rel="nofollow noreferrer" target="_blank">https://github.com/shoumma/Mister-Poster</a></p>
<p>原文链接：<a href="http://t.cn/RtjikDk" rel="nofollow noreferrer" target="_blank">http://t.cn/RtjikDk</a><br>微信号：程序员晋级之路『code-learning』</p>
<p><span class="img-wrap"><img data-src="/img/bVAqVW" src="https://static.alili.tech/img/bVAqVW" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript新鲜事·第4期

## 原文链接
[https://segmentfault.com/a/1190000006261003](https://segmentfault.com/a/1190000006261003)

