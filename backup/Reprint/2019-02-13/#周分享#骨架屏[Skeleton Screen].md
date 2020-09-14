---
title: '#周分享#骨架屏[Skeleton Screen]' 
date: 2019-02-13 2:31:22
hidden: true
slug: 9eap8tdas9s
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">什么是骨架屏</h3>
<p><span class="img-wrap"><img data-src="/img/bVbikAZ?w=1179&amp;h=757" src="https://static.alili.tech/img/bVbikAZ?w=1179&amp;h=757" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVbikAd?w=560&amp;h=457" src="https://static.alili.tech/img/bVbikAd?w=560&amp;h=457" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>骨架屏就是在页面数据尚未加载前先给用户展示出页面的大致结构,直到请求数据返回后再渲染页面，补充进需要显示的数据内容。常用于文章列表、动态列表页等相对比较规则的列表页面</p>
<p>是进度条和菊花圈的进化产物</p>
<h4>作用</h4>
<p>1.作为首屏渲染的优化</p>
<p>2.比其他的加载提示更人性化，能让用户更直接感知布局和内容</p>
<p>3.提升用户体验，增加用户存留率</p>
<h4>组成</h4>
<p>类似一个静态的html</p>
<p><code>文本块：</code>仅包含文本节点（NodeType 为 Node.TEXT_NODE）的元素（NodeType 为 Node.ELEMENT_NODE），一个文本块可能是一个 p 元素也可能是 div 等。文本块将会被转化为灰色条纹。</p>
<p><code>图片块：</code>图片块是很好区分的，任何 img 元素都将被视为图片块，图片块的颜色将被处理成配置的颜色，形状也被修改为配置的矩形或者圆型。</p>
<p><code>按钮块：</code>任何 button 元素、 type 为 button 的 input 元素，role 为 button 的 a 元素，都将被视为按钮块。按钮块中的文本块不在处理。</p>
<p><code>svg 块：</code>任何最外层是 svg 的元素都被视为 svg 块。</p>
<p><code>伪类元素块：</code>任何伪类元素都将视为伪类元素块，如 ::before 或者 ::after。</p>
<h4>如何制作骨架屏svg</h4>
<p>1.<a href="https://github.com/egoist/vue-content-loader" rel="nofollow noreferrer" target="_blank">vue组件</a><br>2.<a href="https://link.juejin.im/?target=https://github.com/danilowoz/react-content-loader" rel="nofollow noreferrer" target="_blank">react组件</a><br>3.<a href="https://github.com/Gbuomprisco/ngx-content-loading" rel="nofollow noreferrer" target="_blank">ng组件</a><br>4.<a href="http://danilowoz.com/create-content-loader/" rel="nofollow noreferrer" target="_blank">自定义svg在线生成骨架屏</a></p>
<p>vue和react的组件中，除了可以自定义，也有一些现成的骨架屏svg，比如公司类型的Facebook Style，比如布局类型 List Style，功能类型的Code Style<br>如果适用自己的话可以直接引用组件就行</p>
<h4>可行性和构建原理</h4>
<p>1.vue/react/ng 这三大框架都有一个共同的特定，其都是 JS 驱动，在 JS 代码解析完成之前<br>直接展示的是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
  <!-- 内容为空 或者可以输入自己喜欢的东西，在js解析成功之前都会展示这里的内容，js展示完成会替换掉这里-->
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- 内容为空 或者可以输入自己喜欢的东西，在js解析成功之前都会展示这里的内容，js展示完成会替换掉这里--&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>所以骨架屏可以在js解析成功之前放在这里，以此类推</p>
<p>2.骨架屏的dom结构和css通过离线生成后构建的时候注入模板中的节点下面.</p>
<h4>如何引入到自己的项目</h4>
<p>1.手工工场时代</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="手写css配合svg注入页面
一旦页面布局有所更改我们就需要跟着去更改，所以出现了下面这张图" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>手写css配合svg注入页面
一旦页面布局有所更改我们就需要跟着去更改，所以出现了下面这张图</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbikNW?w=399&amp;h=257" src="https://static.alili.tech/img/bVbikNW?w=399&amp;h=257" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>2.蒸汽时代，借助插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="通过使用插件page-skeleton-webpack-plugin方式

通过Puppeteer API 结合webpackage动态生成 骨架屏，生成原理看[大神的这边文章][6]

该插件还不是很智能，目前只能支持首屏的骨架屏生成，还不支持局部的
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>通过使用插件page-skeleton-webpack-plugin方式

通过Puppeteer API 结合webpackage动态生成 骨架屏，生成原理看[<span class="hljs-string">大神的这边文章</span>][<span class="hljs-symbol">6</span>]

该插件还不是很智能，目前只能支持首屏的骨架屏生成，还不支持局部的
</code></pre>
<p>3.下个时代</p>
<h4>思索</h4>
<p>1.通过设置某个div含有某个属性或者class定性为需要骨架占位符，渲染的时候作为一个常规骨架屏输出，然后又真实内容再做替换</p>
<h4>参考</h4>
<p>1.<a href="https://github.com/Jocs/jocs.github.io/issues/22" rel="nofollow noreferrer" target="_blank">https://github.com/Jocs/jocs....</a><br>2.<a href="https://juejin.im/post/59ef52226fb9a0451543135f" rel="nofollow noreferrer" target="_blank">https://juejin.im/post/59ef52...</a><br>3.<a href="https://juejin.im/post/5b79a2786fb9a01a18267362" rel="nofollow noreferrer" target="_blank">https://juejin.im/post/5b79a2...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
#周分享#骨架屏[Skeleton Screen]

## 原文链接
[https://segmentfault.com/a/1190000016741596](https://segmentfault.com/a/1190000016741596)

