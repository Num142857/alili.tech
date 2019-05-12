---
title: 'SVG Sprite 技术实践' 
date: 2019-02-06 2:30:08
hidden: true
slug: xfsng4f1ya
categories: [reprint]
---

{{< raw >}}

                    
<p>SVG Sprite（这里特指基于svg symbol）作为传统css sprite和icon font的替代方案，在现代浏览器（ie9+）上能够正常运行，关于它的技术背景、特点和降级方案等不再赘述，可以参考以下几篇文章，写的都非常不错：</p>
<ul>
<li><p><a href="http://www.zhangxinxu.com/wordpress/2014/07/introduce-svg-sprite-technology/" rel="nofollow noreferrer" target="_blank">未来必热：SVG Sprite技术介绍</a></p></li>
<li><p><a href="http://www.w3ctech.com/topic/92" rel="nofollow noreferrer" target="_blank">Web 设计新趋势: 使用 SVG 代替 Web Icon Font</a></p></li>
<li><p><a href="https://isux.tencent.com/16292.html" rel="nofollow noreferrer" target="_blank">使用SVG中的Symbol元素制作Icon</a></p></li>
<li><p><a href="https://github.com/vincenthou/vincenthou.github.io/issues/36" rel="nofollow noreferrer" target="_blank">面向未来的图标图片精灵</a></p></li>
</ul>
<p>在具体实践过程中，遇到以下两个问题：</p>
<ol>
<li><p>IE浏览器不支持外链svg sprite文件，也就是说svg sprite必须嵌入到页面里面（最前面）</p></li>
<li><p>IE浏览器下，拥有use标签到svg元素上到点击事件无法冒泡，现象是在使用代理的方式绑定事件时（绑定到svg元素的父元素上，绑定到svg元素本身就更没办法了），点击svg元素本身无法触发点击事件。</p></li>
</ol>
<p>下面就这两个问题逐个看看解决方案。</p>
<h4>问题1</h4>
<p>我们一是要保证ie下svg sprite图标能正常显示，所以必须采用嵌入到页面的方案，同时还要解决缓存的问题，如果直接放在模版文件里，那每次都需要重新下载，就失去了原来css spirte和icon font可以缓存的特点。</p>
<p>这里我采用的方案是本地利用构建工具（我用的是基于grunt的grunt-svg-sprite，gulp也有对应的插件）生成svg sprite文件，然后单独在页面最前面放一个js文件，js文件包含svg sprite的内容，并在自身加载完成后把svg sprite插入到页面最前面。</p>
<p>tpl:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
<script type=&quot;text/javascript&quot; src=&quot;/static/js/svgsprite.js&quot; async></script>
...
</body>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/static/js/svgsprite.js"</span> <span class="hljs-attr">async</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
...
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
</code></pre>
<p>svgsprite.js:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 构建工具生成的svg sprite文件
var svgsprite = require('./svg/symbol/svg/sprite.symbol.svg');

document.body.insertAdjacentHTML(
    'afterBegin', // 插入body第一个子节点前面
    '<div class=&quot;hide&quot;>' + svgsprite + '</div>'
);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 构建工具生成的svg sprite文件</span>
<span class="hljs-keyword">var</span> svgsprite = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./svg/symbol/svg/sprite.symbol.svg'</span>);

<span class="hljs-built_in">document</span>.body.insertAdjacentHTML(
    <span class="hljs-string">'afterBegin'</span>, <span class="hljs-comment">// 插入body第一个子节点前面</span>
    <span class="hljs-string">'&lt;div class="hide"&gt;'</span> + svgsprite + <span class="hljs-string">'&lt;/div&gt;'</span>
);
</code></pre>
<p>browserify配置:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 是svg文件可以作为string类型被require
brs.transform(stringify(['.svg']));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// 是svg文件可以作为string类型被require</span>
<span class="hljs-selector-tag">brs</span><span class="hljs-selector-class">.transform</span>(stringify([<span class="hljs-string">'.svg'</span>]));
</code></pre>
<p>因为js文件是可以缓存的，所以相当于变相把svg sprite缓存起来了。</p>
<h4>问题2</h4>
<p>第二个问题比较棘手一点，关于这个问题，jquery开发人员也做了解答：</p>
<p><a href="https://bugs.jquery.com/ticket/13180" rel="nofollow noreferrer" target="_blank">Delegated event not firing for click within SVG use element</a></p>
<p>前面说了是由于包含use标签的svg元素无法冒泡，那么直接在svg元素或者svg父元素上绑定事件就可以了，但是在涉及新增、删除等操作时，可操作的按钮都是动态添加的，如果每次添加元素都要重新绑定事件，是非常麻烦的。</p>
<p>幸好有<code>pointer-events</code>这个神器，这是css3的新属性，虽然对于普通html元素的支持性不是太好，但对于支持svg的浏览器，基本都支持这个属性。</p>
<p><a href="http://caniuse.com/#search=pointer-events" rel="nofollow noreferrer" target="_blank">http://caniuse.com/#search=pointer-events</a></p>
<blockquote><p>Already part of the SVG specification, and all SVG-supporting browsers appear to support the property on SVG elements.</p></blockquote>
<p>通过对svg元素应用<code>pointer-events:none</code>，可以让svg相对点击事件“透明”，只要事件绑定到svg的父元素上，且父元素具备宽高（<strong>需要设置为inline-block,或者应用float、position:absolute等，否则ie下点不中</strong>）。</p>
<p>针对以上需求，我写了个简单的sass mixin：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@mixin svg-sprite(
    $width,
    $heigth,
    $fill: default,
    $hover-fill: default
) {
    display: inline-block;
    width:  $width;
    height: $heigth;
    svg.g-ico {
        width:  $width;
        height: $heigth;
        pointer-events:none;
    }
    @if $fill != default {
        svg {
            fill: $fill;
        }
    }
    @if $hover-fill != default {
        &amp;:hover { // tips: hover是在父元素上
            svg {
                fill: $hover-fill;
            }
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code class="sass">@<span class="hljs-keyword">mixin</span> svg-sprite(
    <span class="hljs-variable">$width</span>,
    <span class="hljs-variable">$heigth</span>,
    <span class="hljs-variable">$fill</span>: default,
    <span class="hljs-variable">$hover-fill</span>: default
) {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">width</span>:  <span class="hljs-variable">$width</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-variable">$heigth</span>;
    svg<span class="hljs-selector-class">.g-ico</span> {
        <span class="hljs-attribute">width</span>:  <span class="hljs-variable">$width</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-variable">$heigth</span>;
        <span class="hljs-attribute">pointer-events</span>:none;
    }
    @<span class="hljs-keyword">if</span> <span class="hljs-variable">$fill</span> != default {
        svg {
            fill: <span class="hljs-variable">$fill</span>;
        }
    }
    @<span class="hljs-keyword">if</span> <span class="hljs-variable">$hover-fill</span> != default {
        &amp;:hover { <span class="hljs-comment">// tips: hover是在父元素上</span>
            svg {
                fill: <span class="hljs-variable">$hover-fill</span>;
            }
        }
    }
}</code></pre>
<p>给svg元素的父元素应用这个mixin，这样就算是圆满解决了这个问题。</p>
<p>Tips: 因为我们的网站兼容ie9+，所以ie9以下的没有做降级处理，如果需要，可以参考前面列出的几篇文章。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
SVG Sprite 技术实践

## 原文链接
[https://segmentfault.com/a/1190000006202310](https://segmentfault.com/a/1190000006202310)

