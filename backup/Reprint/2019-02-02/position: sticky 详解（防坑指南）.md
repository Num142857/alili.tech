---
title: 'position: sticky 详解（防坑指南）' 
date: 2019-02-02 2:30:10
hidden: true
slug: gsfzmbs23kw
categories: [reprint]
---

{{< raw >}}

                    
<p>写这篇文章的原因是无论中文还是英文关于 sticky 的文章，只是说了 sticky 这个性感的 css 新特性可以拿来用，简单写一个 demo 完事，并没有详细的解析它。我希望这篇文章能帮助大家在使用 sticky 的时候更顺手。</p>
<h2 id="articleHeader0">属性效果</h2>
<p>sticky 的本意是粘糊糊的，但在 css 中的表现更像是吸附。常见的吸顶、吸底（移动端网站的头部返回栏，底部切换栏之类）的效果用这个属性非常适合。例如下图中的导航，也可以点<a href="https://m.taobao.com" rel="nofollow noreferrer" target="_blank">链接</a>看实际效果。<br><span class="img-wrap"><img data-src="/img/bVEiQd?w=634&amp;h=1100" src="https://static.alili.tech/img/bVEiQd?w=634&amp;h=1100" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>导航的效果更像是在页面打开的时候是 relative 的，向下滑动的时候 fixed 并且 top：0 为零。</p>
<p>而 sticky 代码仅需要如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".sticky {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.sticky</span> {
    <span class="hljs-attribute">position</span>: sticky;
    <span class="hljs-attribute">position</span>: -webkit-sticky;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
}</code></pre>
<p><a href="http://codepen.io/flashback313/pen/GjBZPd" rel="nofollow noreferrer" target="_blank">demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="flashback313/pen/GjBZPd" data-typeid="3">点击预览</button>在这,请用 safari 看，幺蛾子的 chrome 需要开 flag 才能看，兼容性我会在后面提到。</p>
<h2 id="articleHeader1">兼容性</h2>
<p><span class="img-wrap"><img data-src="/img/bVEiP8?w=784&amp;h=588" src="https://static.alili.tech/img/bVEiP8?w=784&amp;h=588" alt="caniuse" title="caniuse" style="cursor: pointer; display: inline;"></span><br>所以放心大胆的在 ios 上用吧。<br><a href="https://github.com/search?utf8=%E2%9C%93&amp;q=position+sticky&amp;type=Repositories&amp;ref=searchresults" rel="nofollow noreferrer" target="_blank">polyfill</a></p>
<p>如果是检测浏览器是否支持 sticky 我更建议使用如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (CSS.supports(&quot;position&quot;, &quot;sticky&quot;) || CSS.supports(&quot;position&quot;, &quot;-webkit-sticky&quot;)) {
    // 支持 sticky
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (CSS.supports(<span class="hljs-string">"position"</span>, <span class="hljs-string">"sticky"</span>) || CSS.supports(<span class="hljs-string">"position"</span>, <span class="hljs-string">"-webkit-sticky"</span>)) {
    <span class="hljs-comment">// 支持 sticky</span>
}</code></pre>
<h2 id="articleHeader2">特性（坑）</h2>
<p>1、sticky 不会触发 BFC。如果不知道 BFC 可以看<a href="http://www.cnblogs.com/heimanba/p/3774086.html" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<p>2、样式表 z－index 无效。行内 style 写有效。</p>
<p>3、sticky 是容器相关的，也就说 sticky 的特性只会在他所处的容器里生效。这个比较抽象，<a href="http://codepen.io/flashback313/pen/GjBZPd" rel="nofollow noreferrer" target="_blank">demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="flashback313/pen/GjBZPd" data-typeid="3">点击预览</button> 在这里，看完之后就懂了。强调这一点是因为在实际使用中，碰到 body 设置 height：100% 的时候 sticky 元素停在某一个位置不动了。</p>
<p>inspired by<br><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/position" rel="nofollow noreferrer" target="_blank">mdn</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
position: sticky 详解（防坑指南）

## 原文链接
[https://segmentfault.com/a/1190000007183209](https://segmentfault.com/a/1190000007183209)

