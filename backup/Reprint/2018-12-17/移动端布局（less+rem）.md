---
title: '移动端布局（less+rem）' 
date: 2018-12-17 2:30:07
hidden: true
slug: t4sjz3j3zrq
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">html</h2>
<p>  在html使用了网上阿里的函数来计算根元素的字体(当然可以写在其他地方，只要生效就可以)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;utf-8&quot;>
  <meta name=&quot;apple-mobile-web-app-capable&quot; content=&quot;yes&quot;>
  <meta name=&quot;viewport&quot; content=&quot;initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width&quot; />
  <title>xxx</title>
  <base href=&quot;./&quot;>
  <link rel=&quot;icon&quot; type=&quot;image/x-icon&quot; href=&quot;favicon.ico&quot;>
  <style type=&quot;text/css&quot;>
    .icon {
      width: 1em; height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <app-root></app-root>

  <!--调试插件-->
  <!--<script src=&quot;http://mtestzhanqi.artqiyi.com/views/common/libs/vconsole.min.js &quot;></script>-->
  <script>
    /*
     * 根据屏幕宽度改变根元素字体
     */
    (function(doc, win) {
      var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
          var clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          docEl.style.fontSize = window.screen.width / 10 + 'px';
        };
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
  </script>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"apple-mobile-web-app-capable"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"yes"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>xxx<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">base</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"./"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"icon"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"image/x-icon"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"favicon.ico"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.icon</span> {
      <span class="hljs-attribute">width</span>: <span class="hljs-number">1em</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">1em</span>;
      <span class="hljs-attribute">vertical-align</span>: -<span class="hljs-number">0.15em</span>;
      <span class="hljs-attribute">fill</span>: currentColor;
      <span class="hljs-attribute">overflow</span>: hidden;
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">app-root</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">app-root</span>&gt;</span>

  <span class="hljs-comment">&lt;!--调试插件--&gt;</span>
  <span class="hljs-comment">&lt;!--&lt;script src="http://mtestzhanqi.artqiyi.com/views/common/libs/vconsole.min.js "&gt;&lt;/script&gt;--&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">/*
     * 根据屏幕宽度改变根元素字体
     */</span>
    (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">doc, win</span>) </span>{
      <span class="hljs-keyword">var</span> docEl = doc.documentElement,
        resizeEvt = <span class="hljs-string">'orientationchange'</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span> ? <span class="hljs-string">'orientationchange'</span> : <span class="hljs-string">'resize'</span>,
        recalc = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">var</span> clientWidth = docEl.clientWidth;
          <span class="hljs-keyword">if</span> (!clientWidth) <span class="hljs-keyword">return</span>;
          docEl.style.fontSize = <span class="hljs-built_in">window</span>.screen.width / <span class="hljs-number">10</span> + <span class="hljs-string">'px'</span>;
        };
      <span class="hljs-keyword">if</span> (!doc.addEventListener) <span class="hljs-keyword">return</span>;
      win.addEventListener(resizeEvt, recalc, <span class="hljs-literal">false</span>);
      doc.addEventListener(<span class="hljs-string">'DOMContentLoaded'</span>, recalc, <span class="hljs-literal">false</span>);
    })(<span class="hljs-built_in">document</span>, <span class="hljs-built_in">window</span>);
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>  这里主要使用了函数计算根元素字体，将屏幕分成了10分，在iphone6下面根元素字体就是37.5px；</p>
<h2 id="articleHeader1">less函数</h2>
<p>  这是使用了less的unit函数来添加单位，将所有的需要转化的css都写到一个公共的less文件里面，通过@import导入进去。(这里只是粘贴了一部分)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fs(@px) {
  font-size: unit(@px / 37.5, rem);
}

/*----- 宽度 -----*/
.w(@px) {
  width: unit(@px / 37.5, rem);
}

/*----- 高度 -----*/
.h(@px) {
  height: unit(@px / 37.5, rem);
}

/*----- 行高 -----*/
.lh(@px) {
  line-height: unit(@px / 37.5, rem);
}

/*----- 背景尺寸 -----*/
.b_s(@px, @px) {
  -webkit-background-size: unit(@px / 37.5, rem) unit(@px / 37.5, rem);
  background-size: unit(@px / 37.5, rem) unit(@px / 37.5, rem);
}
/**
* [背景尺寸，设置宽度，高度auto]
 */
.b_s1(@px) {
  -webkit-background-size: unit(@px / 37.5, rem) auto;
  background-size: unit(@px / 37.5, rem) auto;
}

.b_s2(@px) {
  -webkit-background-size: auto unit(@px / 37.5, rem);
  background-size: auto unit(@px / 37.5, rem);
}

/*----- margin -----*/
.mt(@px) {
  margin-top: unit(@px / 37.5, rem);
}
.mr(@px) {
  margin-right: unit(@px / 37.5, rem);
}
.mb(@px) {
  margin-bottom: unit(@px / 37.5, rem);
}
.ml(@px) {
  margin-left: unit(@px / 37.5, rem);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.fs</span>(@<span class="hljs-keyword">px</span>) {
  <span class="hljs-selector-tag">font-size</span>: <span class="hljs-selector-tag">unit</span>(@<span class="hljs-keyword">px</span> / <span class="hljs-number">37.5</span>, rem);
}

<span class="hljs-comment">/*----- 宽度 -----*/</span>
<span class="hljs-selector-class">.w</span>(@<span class="hljs-keyword">px</span>) {
  <span class="hljs-selector-tag">width</span>: <span class="hljs-selector-tag">unit</span>(@<span class="hljs-keyword">px</span> / <span class="hljs-number">37.5</span>, rem);
}

<span class="hljs-comment">/*----- 高度 -----*/</span>
<span class="hljs-selector-class">.h</span>(@<span class="hljs-keyword">px</span>) {
  <span class="hljs-selector-tag">height</span>: <span class="hljs-selector-tag">unit</span>(@<span class="hljs-keyword">px</span> / <span class="hljs-number">37.5</span>, rem);
}

<span class="hljs-comment">/*----- 行高 -----*/</span>
<span class="hljs-selector-class">.lh</span>(@<span class="hljs-keyword">px</span>) {
  <span class="hljs-selector-tag">line-height</span>: <span class="hljs-selector-tag">unit</span>(@<span class="hljs-keyword">px</span> / <span class="hljs-number">37.5</span>, rem);
}

<span class="hljs-comment">/*----- 背景尺寸 -----*/</span>
<span class="hljs-selector-class">.b_s</span>(@<span class="hljs-keyword">px</span>, @px) {
  <span class="hljs-selector-tag">-webkit-background-size</span>: <span class="hljs-selector-tag">unit</span>(@<span class="hljs-keyword">px</span> / <span class="hljs-number">37.5</span>, rem) unit(@px / <span class="hljs-number">37.5</span>, rem);
  <span class="hljs-selector-tag">background-size</span>: <span class="hljs-selector-tag">unit</span>(@<span class="hljs-keyword">px</span> / <span class="hljs-number">37.5</span>, rem) unit(@px / <span class="hljs-number">37.5</span>, rem);
}
<span class="hljs-comment">/**
* [背景尺寸，设置宽度，高度auto]
 */</span>
<span class="hljs-selector-class">.b_s1</span>(@<span class="hljs-keyword">px</span>) {
  <span class="hljs-selector-tag">-webkit-background-size</span>: <span class="hljs-selector-tag">unit</span>(@<span class="hljs-keyword">px</span> / <span class="hljs-number">37.5</span>, rem) auto;
  <span class="hljs-selector-tag">background-size</span>: <span class="hljs-selector-tag">unit</span>(@<span class="hljs-keyword">px</span> / <span class="hljs-number">37.5</span>, rem) auto;
}

<span class="hljs-selector-class">.b_s2</span>(@<span class="hljs-keyword">px</span>) {
  <span class="hljs-selector-tag">-webkit-background-size</span>: <span class="hljs-selector-tag">auto</span> <span class="hljs-selector-tag">unit</span>(@<span class="hljs-keyword">px</span> / <span class="hljs-number">37.5</span>, rem);
  <span class="hljs-selector-tag">background-size</span>: <span class="hljs-selector-tag">auto</span> <span class="hljs-selector-tag">unit</span>(@<span class="hljs-keyword">px</span> / <span class="hljs-number">37.5</span>, rem);
}

<span class="hljs-comment">/*----- margin -----*/</span>
<span class="hljs-selector-class">.mt</span>(@<span class="hljs-keyword">px</span>) {
  <span class="hljs-selector-tag">margin-top</span>: <span class="hljs-selector-tag">unit</span>(@<span class="hljs-keyword">px</span> / <span class="hljs-number">37.5</span>, rem);
}
<span class="hljs-selector-class">.mr</span>(@<span class="hljs-keyword">px</span>) {
  <span class="hljs-selector-tag">margin-right</span>: <span class="hljs-selector-tag">unit</span>(@<span class="hljs-keyword">px</span> / <span class="hljs-number">37.5</span>, rem);
}
<span class="hljs-selector-class">.mb</span>(@<span class="hljs-keyword">px</span>) {
  <span class="hljs-selector-tag">margin-bottom</span>: <span class="hljs-selector-tag">unit</span>(@<span class="hljs-keyword">px</span> / <span class="hljs-number">37.5</span>, rem);
}
<span class="hljs-selector-class">.ml</span>(@<span class="hljs-keyword">px</span>) {
  <span class="hljs-selector-tag">margin-left</span>: <span class="hljs-selector-tag">unit</span>(@<span class="hljs-keyword">px</span> / <span class="hljs-number">37.5</span>, rem);
}
</code></pre>
<p>  将iphone6的屏幕分成10分，所以就除了37.5，用unit函数来添加单位（这里是相对iphone6的屏幕的，相信大部分公司移动端的设计图都是根据iphone6设计的）。</p>
<h2 id="articleHeader2">在其他less文件里面使用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@import &quot;../less/bass.less&quot;;
.sort-title {
  .fs(17);
  color: @color0;
  font-family: PingFang-SC-Medium;
  .mt(20);
  .mb(15);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">import</span> <span class="hljs-string">"../less/bass.less"</span>;
<span class="hljs-selector-class">.sort-title</span> {
  .fs(17);
  <span class="hljs-attribute">color</span>: @color0;
  <span class="hljs-attribute">font-family</span>: PingFang-SC-Medium;
  .mt(20);
  .mb(15);
}</code></pre>
<p>   .fs, .mt这些就是less的函数，最终编译好的文件就是rem了。（总之，在iphon6或者iphone7，屏幕是376px，无论你上面怎么分配比例，在chrome里面审查你编译后的css，鼠标放到元素上会显示大小，这时和你设计图上的大小相等就可以。）</p>
<h2 id="articleHeader3">总结</h2>
<p>  本人感觉这样还是比较方便的，不用像那样设置根元素100px，然后根据sublime的插件来计算，或者更复杂的计算等等。我们项目使用angular4，angular4可以自动编译less,只需向上面那样直接调用函数就可以，而且可以做一些运算，还是比较方便的，当然vue里面你只要安装less插件，就可以让vue-cli来编译了，如果这些你都没用，你还可以通过Koala来编译成css，通过link来引入。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
移动端布局（less+rem）

## 原文链接
[https://segmentfault.com/a/1190000012878202](https://segmentfault.com/a/1190000012878202)

