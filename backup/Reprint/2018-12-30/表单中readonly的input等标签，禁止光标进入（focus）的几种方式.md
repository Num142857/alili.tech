---
title: '表单中readonly的input等标签，禁止光标进入（focus）的几种方式' 
date: 2018-12-30 2:30:10
hidden: true
slug: b87h1bfts7c
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">需求及问题描述</h3>
<p>在做移动端页面，需要在订单页面中显示表单数据，由于UI统一，所以就依旧采用form的结构来写结构，只读数据的标签自然要加readonly=”readonly”，以为这样就行了。<br>测试中Chrome模拟移动端是看不出问题的。然而iOS手机上一看，虽然表单元素不能编辑内容，但是会出现闪动的光标以及页面底部有一条系统自带的控制bar（安卓的没有测试，我猜想也有问题吧？）。如下图：</p>
<p><span class="img-wrap"><img data-src="/img/bVVX9l?w=750&amp;h=1334" src="https://static.alili.tech/img/bVVX9l?w=750&amp;h=1334" alt="form.png" title="form.png" style="cursor: pointer; display: inline;"></span></p>
<p>这种情况对我来说并不好。于是网上找了一些解决方案，现在总结如下：</p>
<h3 id="articleHeader1">方案一（JS）：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot; value=&quot;test&quot; onfocus=&quot;this.blur()&quot; readonly=&quot;readonly&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;">&lt;input <span class="hljs-built_in">type</span>=<span class="hljs-string">"text"</span> value=<span class="hljs-string">"test"</span> onfocus=<span class="hljs-string">"this.blur()"</span> <span class="hljs-built_in">readonly</span>=<span class="hljs-string">"readonly"</span>&gt;</code></pre>
<p>这个很好理解就是进入的时候自动跳出。但是缺点是一方面js处理没有css好，二是如果需要在该元素上绑定其他事件，其他人开发不留意可能会造成事件覆盖。</p>
<h3 id="articleHeader2">方案二（CSS）：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[readonly=&quot;readonly&quot;] {
  user-select: none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-attr">[readonly="readonly"]</span> {
  <span class="hljs-attribute">user-select</span>: none;
}</code></pre>
<p>这是个新的实验性属性，具体说明及兼容性可参考user-select MDN<br>用起来感觉很好，但是同样有两个问题：一，非标准属性（请尽量不要在生产环境中使用它！）；二，如果用户想要复制该表单内容就不行了，这个问题个人感觉很严重！</p>
<h3 id="articleHeader3">方案三（CSS）：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[readonly=&quot;readonly&quot;] {
  pointer-events: none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-attr">[readonly="readonly"]</span> {
  <span class="hljs-attribute">pointer-events</span>: none;
}</code></pre>
<p>这个是我感觉比较适合我的，因此最后我采纳了该方案，当然也是有弊端的，绑定在只读表单元素的所有事件将无法生效。除此之外都表现完美，就我目前需求来看，也不需要什么事件。因此采用了~</p>
<p>当然，如果你也遇到相似的问题，可以根据情况选择对应的方案，当然，如果你也有更好的方法也欢迎留言~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
表单中readonly的input等标签，禁止光标进入（focus）的几种方式

## 原文链接
[https://segmentfault.com/a/1190000011393682](https://segmentfault.com/a/1190000011393682)

