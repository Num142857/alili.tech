---
title: 'CSS进阶篇--你用过css3的这个currentColor新属性吗？使用与兼容性' 
date: 2019-01-14 2:30:07
hidden: true
slug: j7ye228saha
categories: [reprint]
---

{{< raw >}}

                    
<p>currentColor顾名思意就是“当前颜色”，准确讲应该是“当前的文字颜色”，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".xxx { border: 1px solid currentColor; }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.xxx</span> { <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid currentColor; }
</code></pre>
<p>currentColor表示“当前的标签所继承的文字颜色”，换种方式表示就是：currentColor = color的值。</p>
<p>凡事需要使用颜色值的地方，都可以使用currentColor替换，比方说背景色 – background-color, 渐变色 – gradient, 盒阴影 – box-shadow, SVG的填充色 – fill等等。很灵活，很好用！</p>
<p>当然可以使用css实现背景色镂空，可以方便控制图标的颜色。实现的原理是图标形状区域是透明镂空的，而周边是实色的。</p>
<p>CSS代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".icon {
    display: inline-block;
    width: 16px; height: 20px;
    background-image: url(sprite_icons.png);
    background-color: #34538b; /* 该颜色控制图标的颜色 */
}
.icon1 { background-position: 0 0; }
.icon2 { background-position: -20px 0; }
.icon3 { background-position: -40px 0; }
.icon4 { background-position: -60px 0; }
.link { margin-right: 15px; }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.icon</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">16px</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(sprite_icons.png);
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#34538b</span>; <span class="hljs-comment">/* 该颜色控制图标的颜色 */</span>
}
<span class="hljs-selector-class">.icon1</span> { <span class="hljs-attribute">background-position</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span>; }
<span class="hljs-selector-class">.icon2</span> { <span class="hljs-attribute">background-position</span>: -<span class="hljs-number">20px</span> <span class="hljs-number">0</span>; }
<span class="hljs-selector-class">.icon3</span> { <span class="hljs-attribute">background-position</span>: -<span class="hljs-number">40px</span> <span class="hljs-number">0</span>; }
<span class="hljs-selector-class">.icon4</span> { <span class="hljs-attribute">background-position</span>: -<span class="hljs-number">60px</span> <span class="hljs-number">0</span>; }
<span class="hljs-selector-class">.link</span> { <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">15px</span>; }
</code></pre>
<p>HTML代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="更改颜色：<input id=&quot;colorInput&quot; type=&quot;color&quot; value=&quot;#34538b&quot; autocomplete=&quot;off&quot;>
<p>
    <i class=&quot;icon icon1&quot;></i><a href=&quot;##&quot; class=&quot;link&quot;>返回</a>
    <i class=&quot;icon icon2&quot;></i><a href=&quot;##&quot; class=&quot;link&quot;>刷新</a>
    <i class=&quot;icon icon3&quot;></i><a href=&quot;##&quot; class=&quot;link&quot;>收藏</a>
    <i class=&quot;icon icon4&quot;></i><a href=&quot;##&quot; class=&quot;link&quot;>展开图片</a>
</p>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>更改颜色：<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"colorInput"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"color"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"#34538b"</span> <span class="hljs-attr">autocomplete</span>=<span class="hljs-string">"off"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon icon1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"##"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"link"</span>&gt;</span>返回<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon icon2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"##"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"link"</span>&gt;</span>刷新<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon icon3"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"##"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"link"</span>&gt;</span>收藏<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon icon4"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"##"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"link"</span>&gt;</span>展开图片<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</code></pre>
<p>JS代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var eleInput = document.getElementById(&quot;colorInput&quot;),
    eleIcons = document.getElementsByTagName(&quot;i&quot;);
eleInput.onchange = function() {
    var i = 0, l = eleIcons.length;
    for (; i<l; i+=1) {
        eleIcons[i].style.backgroundColor = this.value;
    }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> eleInput = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"colorInput"</span>),
    eleIcons = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">"i"</span>);
eleInput.onchange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, l = eleIcons.length;
    <span class="hljs-keyword">for</span> (; i&lt;l; i+=<span class="hljs-number">1</span>) {
        eleIcons[i].style.backgroundColor = <span class="hljs-keyword">this</span>.value;
    }
};
</code></pre>
<p>只需要改变背景图片的color就更改变图片的颜色。IE低版本也支持。</p>
<p>效果地址：<a href="http://www.zhangxinxu.com/study/201307/background-color-insert-background-image.html" rel="nofollow noreferrer" target="_blank">http://www.zhangxinxu.com/stu...</a></p>
<p>那么现在使用currentColor来实现这个效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".icon {
    display: inline-block;
    width: 16px; height: 20px;
    background-image: url(../201307/sprite_icons.png);
    background-color: currentColor; /* 该颜色控制图标的颜色 */
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.icon</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">16px</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(../201307/sprite_icons.png);
    <span class="hljs-attribute">background-color</span>: currentColor; <span class="hljs-comment">/* 该颜色控制图标的颜色 */</span>
}
</code></pre>
<p>于是，我们想要鼠标hover文字链接，其图标颜色要跟着一起变化，只要改变文字颜色就可以了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".link:hover { color: #333; }/* 虽然改变的是文字颜色，但是图标颜色也一起变化了 */
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.link</span><span class="hljs-selector-pseudo">:hover</span> { <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>; }<span class="hljs-comment">/* 虽然改变的是文字颜色，但是图标颜色也一起变化了 */</span>
</code></pre>
<p>说明：</p>
<p>border和box-shadow默认的颜色就是当前的文字颜色，也就是类似currentColor；</p>
<p>在iOS Safari浏览器下(iOS8)下，currentColor还是有一些bug的，例如伪元素hover时候，background:currentColor的背景色不会跟着变化，怎么办呢？等升级，或者使用border来模拟。</p>
<p>currentColor浏览器兼容情况：</p>
<p>支持的浏览器：谷歌，火狐，QQ浏览器，IE9+</p>
<p>不支持的浏览器：360，IE低版本浏览器</p>
<p>详细介绍请查看：<a href="http://www.zhangxinxu.com/wordpress/2014/10/currentcolor-css3-powerful-css-keyword/" rel="nofollow noreferrer" target="_blank">http://www.zhangxinxu.com/wor...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS进阶篇--你用过css3的这个currentColor新属性吗？使用与兼容性

## 原文链接
[https://segmentfault.com/a/1190000009530124](https://segmentfault.com/a/1190000009530124)

