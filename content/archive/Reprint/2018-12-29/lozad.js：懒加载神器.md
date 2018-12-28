---
title: 'lozad.js：懒加载神器' 
date: 2018-12-29 2:30:10
hidden: true
slug: nam4co9c3
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="https://github.com/ApoorvSaxena/lozad.js/raw/master/banner/lozad-banner.jpg" src="https://static.alili.techhttps://github.com/ApoorvSaxena/lozad.js/raw/master/banner/lozad-banner.jpg" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>Lozad.js 是基于 IntersectionObserver API 的轻量级、高性能、可配置的纯 JavaScript并且无依赖的懒加载器，其能够被用于进行图片、iframe 等多种形式的元素。通过gzip压缩过后，仅仅535字节大小，相对于常用的jquery.lazyload.js来说，lozad.js实力碾压，虽然jquery.lazyload.js也才几kb大小。在<a href="https://github.com/ApoorvSaxena/lozad.js" rel="nofollow noreferrer" target="_blank">github</a>上，至今短短的一个月的时间，已经收获了2300+的star。</p>
<blockquote><p>传送门：<a href="http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html?utm_source=tuicool&amp;utm_medium=referral" rel="nofollow noreferrer" target="_blank">阮一峰老师IntersectionObserver使用教程</a></p></blockquote>
<h2 id="articleHeader0">懒加载</h2>
<p>懒加载其实就是延迟加载。通俗的讲就是，当你访问一个页面的时候，先不设置img元素或者其他元素的background-image的图片的src（还有其他的懒加载形式），只有当它们进入视口的才开始加载，这样可能节省带宽从而提高网页性能，页面加载速度更加快、减轻服务器的压力。</p>
<p>一般懒加载实现的方法为不设置资源文件的src，而把真是的url放置在<code>data-url</code>（也可根据自己喜好设置）属性里面，这样在载入页面的时候不会对资源文件发起请求。当网页滚动条滚动到需要加载这个标签的时候，设置真实的url从而开始加载资源文件。</p>
<h2 id="articleHeader1">lozad</h2>
<h3 id="articleHeader2">安装</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install --save lozad
//or
$ yarn add lozad
//or
$ bower install lozad" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>$ npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save lozad</span>
//<span class="hljs-keyword">or</span>
$ yarn <span class="hljs-keyword">add</span> lozad
//<span class="hljs-keyword">or</span>
$ bower <span class="hljs-keyword">install</span> lozad</code></pre>
<p>然后根据ES6标准或者CommonJS的规范将lozad模块引入，当然也可以用CDN引入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot; src=&quot;https://cdn.jsdelivr.net/npm/lozad/dist/lozad.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/npm/lozad/dist/lozad.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader3">使用</h3>
<p>在html中，给需要懒加载的元素加上<code>lozad</code>的类名，并将src改为data-src，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img class='lozad' data-src='image.png' />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code style="word-break: break-word; white-space: initial;">&lt;img <span class="hljs-keyword">class</span>=<span class="hljs-string">'lozad'</span> data-src=<span class="hljs-string">'image.png'</span> /&gt;</code></pre>
<p>接下来，你所要做的就仅仅只是将<code>lozad</code>实例化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const observer = lozad();
observer.observe();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>const observer = lozad()<span class="hljs-comment">;</span>
observer.observe()<span class="hljs-comment">;</span></code></pre>
<p>或者使用个性化设置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const observer = lozad('.lozad',{
  rootMargin: '10px 0px',
  threshold: 0.1
});
observer.observe();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">const</span> observer = lozad(<span class="hljs-string">'.lozad'</span>,{
  rootMargin: <span class="hljs-string">'10px 0px'</span>,
  threshold: <span class="hljs-number">0.1</span>
});
observer.observe();</code></pre>
<p>rootMargin和threshold均为IntersectionObserver的参数，具体使用参考阮一峰老师的教程吧。</p>
<p>要是你想要在加载该元素的同时执行某些函数时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="lozad('.lozad',{
  load: function(el){
      console.log('loading element');
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>lozad(<span class="hljs-string">'.lozad'</span>,{
  <span class="hljs-built_in">load</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(el)</span>{</span>
      console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'loading element'</span>);
  }
});</code></pre>
<p>相似的，当你使用背景图片的时候，你可以这么操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class='lozad' data-background-image='image.png'>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">'lozad'</span> data-background-image=<span class="hljs-string">'image.png'</span>&gt;
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>以上就是lozad的基本用法了，显而易见，lozad相当的便捷。</p>
<h3 id="articleHeader4">兼容性</h3>
<p>但是lozad也并不是没有缺点。因为它使用了IntersectionObserver的API，导致兼容性不好，chrome也刚从51版本开始使用，更不用说那些上古年代的浏览器了。</p>
<p>PC端兼容性：<br><span class="img-wrap"><img data-src="/img/bVWIxf" src="https://static.alili.tech/img/bVWIxf" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>移动端兼容性：<br><span class="img-wrap"><img data-src="/img/bVWIwC" src="https://static.alili.tech/img/bVWIwC" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>文章同步于<a href="http://www.yorklin.cn/#/artical/2e9a5ed5-b2c2-498b-917f-67c8ed8df66e" rel="nofollow noreferrer" target="_blank">个人小站</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
lozad.js：懒加载神器

## 原文链接
[https://segmentfault.com/a/1190000011527281](https://segmentfault.com/a/1190000011527281)

