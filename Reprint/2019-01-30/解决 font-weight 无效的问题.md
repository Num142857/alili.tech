---
title: '解决 font-weight 无效的问题' 
date: 2019-01-30 2:30:22
hidden: true
slug: 3ziaz48fucw
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVGP7v?w=1392&amp;h=252" src="https://static.alili.tech/img/bVGP7v?w=1392&amp;h=252" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>近期调页面时有几个 font-weight 需要修改，无论怎么调整字体粗细都没有变化，深入研究后总结下文</p>
<h2 id="articleHeader0">初探</h2>
<p>本地写个例子，代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p class=&quot;thin&quot;>This is a paragraph</p>
<p class=&quot;normal&quot;>This is a paragraph</p>
<p class=&quot;thick&quot;>This is a paragraph</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"thin"</span>&gt;</span>This is a paragraph<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"normal"</span>&gt;</span>This is a paragraph<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"thick"</span>&gt;</span>This is a paragraph<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p {
  font-size: 50px;
}
p.thin {
  font-weight: 100;
}
p.normal {
  font-weight: normal;
}
p.thick {
  font-weight: bold;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">p</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">50px</span>;
}
<span class="hljs-selector-tag">p</span><span class="hljs-selector-class">.thin</span> {
  <span class="hljs-attribute">font-weight</span>: <span class="hljs-number">100</span>;
}
<span class="hljs-selector-tag">p</span><span class="hljs-selector-class">.normal</span> {
  <span class="hljs-attribute">font-weight</span>: normal;
}
<span class="hljs-selector-tag">p</span><span class="hljs-selector-class">.thick</span> {
  <span class="hljs-attribute">font-weight</span>: bold;
}</code></pre>
<p>在 Mac OS 下 Chrome、Firefox、Safari 结果分别如下(从左到右)</p>
<p><span class="img-wrap"><img data-src="/img/bVGP7w?w=1386&amp;h=286" src="https://static.alili.tech/img/bVGP7w?w=1386&amp;h=286" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>我的浏览器均为最新版本，发现一个简单的 <code>font-weight</code> 属性，在三个浏览器有三个表现。</p>
<ul>
<li>Chrome 下所有字重均一样</li>
<li>Firefox 下表现正常，是我们期待的结果</li>
<li>Safari 下 100 无效，被解析为 normal</li>
</ul>
<h2 id="articleHeader1">解决表现不一致的问题</h2>
<p>这种不同浏览器表现不同是我们不能接受的，对于后期排错造成困难，于是我首先想到是字体的惹得货，修改我的样式文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p {
  font-size: 50px;
  font-family: Arial;
}
p.thin {
  font-weight: 100;
}
p.normal {
  font-weight: normal;
}
p.thick {
  font-weight: bold;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">p</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">50px</span>;
  <span class="hljs-attribute">font-family</span>: Arial;
}
<span class="hljs-selector-tag">p</span><span class="hljs-selector-class">.thin</span> {
  <span class="hljs-attribute">font-weight</span>: <span class="hljs-number">100</span>;
}
<span class="hljs-selector-tag">p</span><span class="hljs-selector-class">.normal</span> {
  <span class="hljs-attribute">font-weight</span>: normal;
}
<span class="hljs-selector-tag">p</span><span class="hljs-selector-class">.thick</span> {
  <span class="hljs-attribute">font-weight</span>: bold;
}</code></pre>
<p>效果如下</p>
<p><span class="img-wrap"><img data-src="/img/bVGP7x?w=1386&amp;h=286" src="https://static.alili.tech/img/bVGP7x?w=1386&amp;h=286" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这里的表现倒是一样的，我们可以忽略图中字体大小（截屏的误差导致），只看字体粗细就好，<code>font-weight: 100;</code> 都失效了。</p>
<p>MDN 文档的解释</p>
<blockquote>This means that for fonts that provide only normal and bold, 100-500 are normal, and 600-900 are bold.</blockquote>
<p>文章开始没有介绍基本语法，相信前端们都知道，normal 等同于 400， bold 等同于 700。</p>
<p>这也很好的解释了这个例子的表象，但我瞬间推翻了这句话，因为在例子1中 Firefox 在没有设置字体的情况下可以正常显示。</p>
<h2 id="articleHeader2">问题根源</h2>
<p>到这里相信你已经知道答案了，我们要针对不同浏览器和运行环境进行全面配置 <code>font-family</code> 属性，<strong>全局的字体建议放在 body 选择器下</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p {
  font-size: 50px;
  font-family: -apple-system, BlinkMacSystemFont,
    &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;,
    &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;,
    sans-serif;
}
p.thin {
  font-weight: 100;
}
p.normal {
  font-weight: normal;
}
p.thick {
  font-weight: bold;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">p</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">50px</span>;
  <span class="hljs-attribute">font-family</span>: -apple-system, BlinkMacSystemFont,
    <span class="hljs-string">"Segoe UI"</span>, <span class="hljs-string">"Roboto"</span>, <span class="hljs-string">"Oxygen"</span>, <span class="hljs-string">"Ubuntu"</span>, <span class="hljs-string">"Cantarell"</span>,
    <span class="hljs-string">"Fira Sans"</span>, <span class="hljs-string">"Droid Sans"</span>, <span class="hljs-string">"Helvetica Neue"</span>,
    sans-serif;
}
<span class="hljs-selector-tag">p</span><span class="hljs-selector-class">.thin</span> {
  <span class="hljs-attribute">font-weight</span>: <span class="hljs-number">100</span>;
}
<span class="hljs-selector-tag">p</span><span class="hljs-selector-class">.normal</span> {
  <span class="hljs-attribute">font-weight</span>: normal;
}
<span class="hljs-selector-tag">p</span><span class="hljs-selector-class">.thick</span> {
  <span class="hljs-attribute">font-weight</span>: bold;
}</code></pre>
<p>看下三个浏览器的表现</p>
<p><span class="img-wrap"><img data-src="/img/bVGP7y?w=1386&amp;h=304" src="https://static.alili.tech/img/bVGP7y?w=1386&amp;h=304" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>在字体和字重上达到了完全一致，仔细的观察会发现，Chrome 与 Safari 渲染不同字重的字体总宽度变化明显，而 Firefox 下则不是十分明显</p>
<blockquote>温馨提示：尽量不要用字体去撑容器的宽度，尽量避免 hover 改变字重。因为不同环境下渲染的差异会导致表现不一致。</blockquote>
<p>上面给的一大串字体又代表兼容那些环境和设备哪？</p>
<p>首先我们分成三组来解释</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="font-family:
/* 1 */ -apple-system, BlinkMacSystemFont,
/* 2 */ &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;,
/* 3 */ &quot;Helvetica Neue&quot;, sans-serif;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs hsp"><code><span class="hljs-keyword">font</span>-family:
<span class="hljs-comment">/* 1 */</span> -apple-<span class="hljs-keyword">system</span>, BlinkMacSystemFont,
<span class="hljs-comment">/* 2 */</span> <span class="hljs-string">"Segoe UI"</span>, <span class="hljs-string">"Roboto"</span>, <span class="hljs-string">"Oxygen"</span>, <span class="hljs-string">"Ubuntu"</span>, <span class="hljs-string">"Cantarell"</span>, <span class="hljs-string">"Fira Sans"</span>, <span class="hljs-string">"Droid Sans"</span>,
<span class="hljs-comment">/* 3 */</span> <span class="hljs-string">"Helvetica Neue"</span>, sans-serif<span class="hljs-comment">;</span></code></pre>
<p>1.第一个分组是映射到系统 UI 字体的 CSS 属性。这涵盖了很多环境，并且不会将这些字体误认为别的字体</p>
<ul>
<li>
<code>-apple-system</code> 在 Mac OS X 和 iOS 上的 Safari 中设置 San Francisco，并在旧版本的 Mac OS X 上设置成 Neue Helvetica 和 Lucida Grande。它根据字体大小正确选择 San Francisco Text 和 San Francisco Display。</li>
<li>
<code>BlinkMacSystemFont</code> 只针对于 Mac OS X 上的 Chrome。</li>
</ul>
<p>2.第二个分组用于已知的系统 UI 字体</p>
<ul>
<li>
<code>Segoe UI</code> 针对 Windows 和 Windows Phone。</li>
<li>
<code>Roboto</code> 针对 Android 和更高版本的 Chrome 操作系统。故意列出在 Segoe UI 后，因为如果你是 Windows 上的 Android 开发人员，并安装 Roboto，将使用 Segoe UI。</li>
<li>
<code>Oxygen</code> 针对 KDE，Ubuntu，你可以猜到，Cantarell 针对 GNOME。这一开始感到徒劳，因为一些 Linux 发行版有许多这样的字体。</li>
<li>
<code>Fira Sans</code> 针对 Firefox OS 系统。</li>
<li>
<code>Droid Sans</code> 针对旧版本系统的安卓</li>
</ul>
<blockquote>请注意，我们不需要添加 San Francisco。在 iOS 和 Mac OS X 上，San Francisco 并不是显而易见的，而是作为“隐藏”字体存在。我们也不使用 .SFNSText-Regular，在 Mac OS X 上的 San Francisco 的内部 PostScript 名称来指定 San Francisco。它只适用于 Chrome，并且不如 BlinkMacSystemFont 通用。</blockquote>
<p>3.第三个分组是我们的后备字体</p>
<ul>
<li>
<code>Helvetica Neue</code> 针对旧 El Capitan 版本的 Mac OS X。它被列在接近结尾，因为它是一个流行的字体在其他非 El Capitan 计算机上。</li>
<li>
<code>sans-serif</code> 默认的是 sans-serif 后备字体。</li>
</ul>
<p>以下是目前已知的的问题：</p>
<ol>
<li>在 Mac OS X 的 Firefox 中，San Francisco 的字母间距比 Safari 和 Chrome 更紧。</li>
<li>它不会使 Lucida Grande 在 Mac OS X 的 pre-Yosemite 版本上降级到 Neue Helvetica。并且它可能不匹配不太受欢迎的操作系统上的正确字体或更复杂的配置。</li>
</ol>
<p>说到这里上面都是英文的字体，我们需要针对中文设置字体，可以针对不同操作系统给中文字体。</p>
<h2 id="articleHeader3">总结</h2>
<p>对于字体的统一展示，目前为止还没有完善的解决办法，只能针对不同设备给出对应的解决方案，至于为什么不引入外部的三方字库来统一字体呢？因为会增加网页的请求时长，渲染也会耗时，尽量避免三方字库。下次再有类似字重渲染误差问题可以先从字体下手，整个例子没有跑过 Windows 系统，可能在 Windows 下还会有问题。至少切入点有了改变，并不是 Chrome 下 font-weight 无效。</p>
<blockquote>文章出自 orange 的 个人博客 <a href="http://orangexc.xyz/" rel="nofollow noreferrer" target="_blank">http://orangexc.xyz/</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
解决 font-weight 无效的问题

## 原文链接
[https://segmentfault.com/a/1190000007787731](https://segmentfault.com/a/1190000007787731)

