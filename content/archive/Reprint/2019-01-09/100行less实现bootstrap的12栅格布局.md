---
title: '100行less实现bootstrap的12栅格布局' 
date: 2019-01-09 2:30:12
hidden: true
slug: 303s2wo8l7x
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>less实现bootstrap的12栅格布局，其实代码不止100行，大概100多行吧</p></blockquote>
<p>使用过bootstrap的都知道，bootstrap的强大的12栅格系统；在响应式布局中这12栅格布局是非常有用的。<br>有时候做个简单的页面并不想把所有整个bootstrap引入到页面中，于是便在空余时间写了这个栅格布局，参照了bootstrap的做法，类名，当然这里可以自定义类名的。</p>
<p>详细less请看如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
@container: m-container;

@columns-name: m-col;
@columns-pading: 15px;
@grid-count: 12;

@screen-sm-min: 768px;
@screen-md-min: 992px;
@screen-lg-min: 1200px;

.@{container},
.@{container}-fluid{
    padding-left: @columns-pading;
    padding-right: @columns-pading;
    margin-right: auto;
    margin-left: auto;
    min-width: 960px;/*为了兼容不支持媒体选择的浏览器*/
    -webkit-transition:width 0.9s cubic-bezier(1,-0.02, 0, 1.04);// for Safari and Chrome
    -moz-transition:width 0.9s cubic-bezier(1,-0.02, 0, 1.04);// for Firefox
    -o-transition:width 0.9s cubic-bezier(1,-0.02, 0, 1.04);// for Opera
    -ms-transition:width 0.9s cubic-bezier(1,-0.02, 0, 1.04);// for ie
    transition:width 0.5s cubic-bezier(1,-0.02, 0, 1.04);
    -webkit-box-sizing: border-box;
    box-sizing:border-box;
    -moz-box-sizing:border-box;
}
.@{container}-fluid{
    min-width: 0;
    width: 100%;
}
.row{
    min-height: 1px;
    margin-left: -@columns-pading;
    margin-right: -@columns-pading;
    clear: both;
    &amp;:before,
    &amp;:after{
        content: &quot;&quot;;
        display: table;
        clear: both;
    }
}
// 列基础css
.columns-base-css() {
    position: relative;
    min-height: 1px;
    padding-right: @columns-pading;
    padding-left: @columns-pading;
    
    -webkit-box-sizing: border-box;
    box-sizing:border-box;
    -moz-box-sizing:border-box;
}
// 循环列，设置基础css
.make-grid-columns(@len: @grid-count) {
    .col(@i) {
        @classList: ~&quot;.@{columns-name}-xs-@{i},.@{columns-name}-sm-@{i},.@{columns-name}-md-@{i},.@{columns-name}-lg-@{i}&quot;;
        .col(@i + 1, ~&quot;@{classList}&quot;);
    }
    .col(@i, @list) when (@i =< @len){
        @classList: ~&quot;.@{columns-name}-xs-@{i},.@{columns-name}-sm-@{i},.@{columns-name}-md-@{i},.@{columns-name}-lg-@{i}&quot;;
        .col(@i + 1, ~&quot;@{classList},@{list}&quot;);
    }
    .col(@i, @list) when (@i > @len) {
        @{list} {
          .columns-base-css();
        }
    }
    .col(1)
}
.make-grid-columns(@grid-count);

// 循环生成列
.make-columns-loop(@type, @n, @i: 1) when (@i <= @n){
    @col-class-name: ~&quot;@{columns-name}-@{type}&quot;;
    .@{col-class-name}-@{i}{
        width: @i/@n*100%;
        float: left;
    }
    // 偏移
    .@{col-class-name}-offset-@{i}{
        margin-left: @i/@n*100%;
    }
    // 排序
    .@{col-class-name}-pull-@{i}{
        right: @i/@n*100%;
    }
    .@{col-class-name}-push-@{i}{
        left: @i/@n*100%;
    }
    .make-columns-loop(@type, @n, (@i + 1));
}
.make-columns-loop(xs, @grid-count);

// 媒体查询
.@{container}{
    @media (max-width: @screen-sm-min) {
        min-width: 0;
    }
    @media (min-width: @screen-sm-min) {
        width: 750px;
        min-width: 0;
    }
    @media (min-width: @screen-md-min) {
        width: 970px;
        min-width: 0;
    }
    @media (min-width: @screen-lg-min) {
        width: 1170px;
        min-width: 0;
    }
}
// 媒体查询设置对应列类型css
@media (min-width: @screen-sm-min) {
    .make-columns-loop(sm, @grid-count);
}
@media (min-width: @screen-md-min) {
    .make-columns-loop(md, @grid-count);
}
@media (min-width: @screen-lg-min) {
    .make-columns-loop(lg, @grid-count);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="less hljs"><code class="less">
<span class="hljs-variable">@container:</span> m-container;

<span class="hljs-variable">@columns-name:</span> m-col;
<span class="hljs-variable">@columns-pading:</span> <span class="hljs-number">15px</span>;
<span class="hljs-variable">@grid-count:</span> <span class="hljs-number">12</span>;

<span class="hljs-variable">@screen-sm-min:</span> <span class="hljs-number">768px</span>;
<span class="hljs-variable">@screen-md-min:</span> <span class="hljs-number">992px</span>;
<span class="hljs-variable">@screen-lg-min:</span> <span class="hljs-number">1200px</span>;

<span class="hljs-selector-class">.@{container}</span>,
<span class="hljs-selector-class">.@{container}</span><span class="hljs-selector-tag">-fluid</span>{
    <span class="hljs-attribute">padding-left</span>: <span class="hljs-variable">@columns-pading</span>;
    <span class="hljs-attribute">padding-right</span>: <span class="hljs-variable">@columns-pading</span>;
    <span class="hljs-attribute">margin-right</span>: auto;
    <span class="hljs-attribute">margin-left</span>: auto;
    <span class="hljs-attribute">min-width</span>: <span class="hljs-number">960px</span>;<span class="hljs-comment">/*为了兼容不支持媒体选择的浏览器*/</span>
    <span class="hljs-attribute">-webkit-transition</span>:width <span class="hljs-number">0.9s</span> cubic-bezier(<span class="hljs-number">1</span>,-<span class="hljs-number">0.02</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1.04</span>);<span class="hljs-comment">// for Safari and Chrome</span>
    <span class="hljs-attribute">-moz-transition</span>:width <span class="hljs-number">0.9s</span> cubic-bezier(<span class="hljs-number">1</span>,-<span class="hljs-number">0.02</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1.04</span>);<span class="hljs-comment">// for Firefox</span>
    <span class="hljs-attribute">-o-transition</span>:width <span class="hljs-number">0.9s</span> cubic-bezier(<span class="hljs-number">1</span>,-<span class="hljs-number">0.02</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1.04</span>);<span class="hljs-comment">// for Opera</span>
    <span class="hljs-attribute">-ms-transition</span>:width <span class="hljs-number">0.9s</span> cubic-bezier(<span class="hljs-number">1</span>,-<span class="hljs-number">0.02</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1.04</span>);<span class="hljs-comment">// for ie</span>
    <span class="hljs-attribute">transition</span>:width <span class="hljs-number">0.5s</span> cubic-bezier(<span class="hljs-number">1</span>,-<span class="hljs-number">0.02</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1.04</span>);
    <span class="hljs-attribute">-webkit-box-sizing</span>: border-box;
    <span class="hljs-attribute">box-sizing</span>:border-box;
    <span class="hljs-attribute">-moz-box-sizing</span>:border-box;
}
<span class="hljs-selector-class">.@{container}</span><span class="hljs-selector-tag">-fluid</span>{
    <span class="hljs-attribute">min-width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.row</span>{
    <span class="hljs-attribute">min-height</span>: <span class="hljs-number">1px</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-variable">@columns-pading</span>;
    <span class="hljs-attribute">margin-right</span>: -<span class="hljs-variable">@columns-pading</span>;
    <span class="hljs-attribute">clear</span>: both;
    <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-pseudo">:before</span>,
    <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-pseudo">:after</span>{
        <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
        <span class="hljs-attribute">display</span>: table;
        <span class="hljs-attribute">clear</span>: both;
    }
}
<span class="hljs-comment">// 列基础css</span>
<span class="hljs-selector-class">.columns-base-css</span>() {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">min-height</span>: <span class="hljs-number">1px</span>;
    <span class="hljs-attribute">padding-right</span>: <span class="hljs-variable">@columns-pading</span>;
    <span class="hljs-attribute">padding-left</span>: <span class="hljs-variable">@columns-pading</span>;
    
    <span class="hljs-attribute">-webkit-box-sizing</span>: border-box;
    <span class="hljs-attribute">box-sizing</span>:border-box;
    <span class="hljs-attribute">-moz-box-sizing</span>:border-box;
}
<span class="hljs-comment">// 循环列，设置基础css</span>
<span class="hljs-selector-class">.make-grid-columns</span>(<span class="hljs-variable">@len</span>: <span class="hljs-variable">@grid-count</span>) {
    <span class="hljs-selector-class">.col</span>(<span class="hljs-variable">@i</span>) {
        <span class="hljs-variable">@classList:</span> <span class="hljs-string">~".@{columns-name}-xs-@{i},.@{columns-name}-sm-@{i},.@{columns-name}-md-@{i},.@{columns-name}-lg-@{i}"</span>;
        <span class="hljs-selector-class">.col</span>(<span class="hljs-variable">@i</span> + <span class="hljs-number">1</span>, <span class="hljs-string">~"@{classList}"</span>);
    }
    <span class="hljs-selector-class">.col</span>(<span class="hljs-variable">@i</span>, <span class="hljs-variable">@list</span>) <span class="hljs-keyword">when</span> (<span class="hljs-variable">@i</span> =&lt; <span class="hljs-variable">@len</span>){
        <span class="hljs-variable">@classList:</span> <span class="hljs-string">~".@{columns-name}-xs-@{i},.@{columns-name}-sm-@{i},.@{columns-name}-md-@{i},.@{columns-name}-lg-@{i}"</span>;
        <span class="hljs-selector-class">.col</span>(<span class="hljs-variable">@i</span> + <span class="hljs-number">1</span>, <span class="hljs-string">~"@{classList},@{list}"</span>);
    }
    <span class="hljs-selector-class">.col</span>(<span class="hljs-variable">@i</span>, <span class="hljs-variable">@list</span>) <span class="hljs-keyword">when</span> (<span class="hljs-variable">@i</span> &gt; <span class="hljs-variable">@len</span>) {
        <span class="hljs-variable">@{list}</span> {
          <span class="hljs-selector-class">.columns-base-css</span>();
        }
    }
    <span class="hljs-selector-class">.col</span>(<span class="hljs-number">1</span>)
}
<span class="hljs-selector-class">.make-grid-columns</span>(<span class="hljs-variable">@grid-count</span>);

<span class="hljs-comment">// 循环生成列</span>
<span class="hljs-selector-class">.make-columns-loop</span>(<span class="hljs-variable">@type</span>, <span class="hljs-variable">@n</span>, <span class="hljs-variable">@i</span>: <span class="hljs-number">1</span>) <span class="hljs-keyword">when</span> (<span class="hljs-variable">@i</span> &lt;= <span class="hljs-variable">@n</span>){
    <span class="hljs-variable">@col-class-name:</span> <span class="hljs-string">~"@{columns-name}-@{type}"</span>;
    <span class="hljs-selector-class">.@{col-class-name}</span><span class="hljs-selector-tag">-</span><span class="hljs-variable">@{i}</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-variable">@i</span>/<span class="hljs-variable">@n</span>*<span class="hljs-number">100%</span>;
        <span class="hljs-attribute">float</span>: left;
    }
    <span class="hljs-comment">// 偏移</span>
    <span class="hljs-selector-class">.@{col-class-name}</span><span class="hljs-selector-tag">-offset-</span><span class="hljs-variable">@{i}</span>{
        <span class="hljs-attribute">margin-left</span>: <span class="hljs-variable">@i</span>/<span class="hljs-variable">@n</span>*<span class="hljs-number">100%</span>;
    }
    <span class="hljs-comment">// 排序</span>
    <span class="hljs-selector-class">.@{col-class-name}</span><span class="hljs-selector-tag">-pull-</span><span class="hljs-variable">@{i}</span>{
        <span class="hljs-attribute">right</span>: <span class="hljs-variable">@i</span>/<span class="hljs-variable">@n</span>*<span class="hljs-number">100%</span>;
    }
    <span class="hljs-selector-class">.@{col-class-name}</span><span class="hljs-selector-tag">-push-</span><span class="hljs-variable">@{i}</span>{
        <span class="hljs-attribute">left</span>: <span class="hljs-variable">@i</span>/<span class="hljs-variable">@n</span>*<span class="hljs-number">100%</span>;
    }
    <span class="hljs-selector-class">.make-columns-loop</span>(<span class="hljs-variable">@type</span>, <span class="hljs-variable">@n</span>, (<span class="hljs-variable">@i</span> + <span class="hljs-number">1</span>));
}
<span class="hljs-selector-class">.make-columns-loop</span>(xs, <span class="hljs-variable">@grid-count</span>);

<span class="hljs-comment">// 媒体查询</span>
<span class="hljs-selector-class">.@{container}</span>{
    <span class="hljs-keyword">@media</span> (<span class="hljs-attribute">max-width</span>: <span class="hljs-variable">@screen-sm-min</span>) {
        <span class="hljs-attribute">min-width</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-keyword">@media</span> (<span class="hljs-attribute">min-width</span>: <span class="hljs-variable">@screen-sm-min</span>) {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">750px</span>;
        <span class="hljs-attribute">min-width</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-keyword">@media</span> (<span class="hljs-attribute">min-width</span>: <span class="hljs-variable">@screen-md-min</span>) {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">970px</span>;
        <span class="hljs-attribute">min-width</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-keyword">@media</span> (<span class="hljs-attribute">min-width</span>: <span class="hljs-variable">@screen-lg-min</span>) {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">1170px</span>;
        <span class="hljs-attribute">min-width</span>: <span class="hljs-number">0</span>;
    }
}
<span class="hljs-comment">// 媒体查询设置对应列类型css</span>
<span class="hljs-keyword">@media</span> (<span class="hljs-attribute">min-width</span>: <span class="hljs-variable">@screen-sm-min</span>) {
    <span class="hljs-selector-class">.make-columns-loop</span>(sm, <span class="hljs-variable">@grid-count</span>);
}
<span class="hljs-keyword">@media</span> (<span class="hljs-attribute">min-width</span>: <span class="hljs-variable">@screen-md-min</span>) {
    <span class="hljs-selector-class">.make-columns-loop</span>(md, <span class="hljs-variable">@grid-count</span>);
}
<span class="hljs-keyword">@media</span> (<span class="hljs-attribute">min-width</span>: <span class="hljs-variable">@screen-lg-min</span>) {
    <span class="hljs-selector-class">.make-columns-loop</span>(lg, <span class="hljs-variable">@grid-count</span>);
}
</code></pre>
<p>这段less是可以直接复制到less环境编译的，如果你需要重新定义类名可以在开头修改</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 容器名
@container: m-container;
// 列名
@columns-name: m-col;
// 列边距
@columns-pading: 15px;
// 栅格数（把屏幕分为12份）
@grid-count: 12;

// 响应对应尺寸
@screen-sm-min: 768px;
@screen-md-min: 992px;
@screen-lg-min: 1200px;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="less hljs"><code class="less"><span class="hljs-comment">// 容器名</span>
<span class="hljs-variable">@container:</span> m-container;
<span class="hljs-comment">// 列名</span>
<span class="hljs-variable">@columns-name:</span> m-col;
<span class="hljs-comment">// 列边距</span>
<span class="hljs-variable">@columns-pading:</span> <span class="hljs-number">15px</span>;
<span class="hljs-comment">// 栅格数（把屏幕分为12份）</span>
<span class="hljs-variable">@grid-count:</span> <span class="hljs-number">12</span>;

<span class="hljs-comment">// 响应对应尺寸</span>
<span class="hljs-variable">@screen-sm-min:</span> <span class="hljs-number">768px</span>;
<span class="hljs-variable">@screen-md-min:</span> <span class="hljs-number">992px</span>;
<span class="hljs-variable">@screen-lg-min:</span> <span class="hljs-number">1200px</span>;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVQyNd?w=1500&amp;h=607" src="https://static.alili.tech/img/bVQyNd?w=1500&amp;h=607" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在线预览请移步这里： <a href="http://runjs.cn/code/n1fsajds" rel="nofollow noreferrer" target="_blank">http://runjs.cn/code/n1fsajds</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
100行less实现bootstrap的12栅格布局

## 原文链接
[https://segmentfault.com/a/1190000010104455](https://segmentfault.com/a/1190000010104455)

