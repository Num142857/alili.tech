---
title: '自定义 Angular 4 首屏加载动画' 
date: 2019-01-11 2:30:07
hidden: true
slug: 9tpomsc6a1g
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>默认情况下，Angular应用程序在首次加载根组件时，会在浏览器的显示一个<code>loading... </code>我们可以轻松地将loading修改成我们自己定义的动画。</p></blockquote>
<h4>这是我们要实现首次加载的效果:</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009929756?w=600&amp;h=360" src="https://static.alili.tech/img/remote/1460000009929756?w=600&amp;h=360" alt="loading" title="loading" style="cursor: pointer; display: inline;"></span></p>
<h4>根组件标签中的内容</h4>
<p>请注意，在你的入口文件index.html中，默认的<code>loading...</code>只是插入到根组件标签之间：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html>
<head>
  <meta charset=&quot;utf-8&quot;>
  <title>Fancy Loading Screen</title>
  <base href=&quot;/&quot;>
  <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;>
  <link rel=&quot;icon&quot; type=&quot;image/x-icon&quot; href=&quot;favicon.ico&quot;>
</head>
<body>

  <app-root>Loading...</app-root>

</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Fancy Loading Screen<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">base</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"icon"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"image/x-icon"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"favicon.ico"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">app-root</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">app-root</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>如果您在加载完根组件检查应用程序，则无法找到<code>loading...</code> 的文字，因为它在应用加载完成后被我们自己定义的组件替换掉。</p>
<p>这意味着我们可以在这些标签之间放置任何内容，包括样式定义，一旦<code>Angular</code>加载完根组件，就可以完全清除它们。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<app-root>
  <style>
    app-root {
      color: purple;
    }
  </style>
  I'm a purple loading message!
</app-root>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">app-root</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">app-root</span> {
      <span class="hljs-attribute">color</span>: purple;
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
  I'm a purple loading message!
<span class="hljs-tag">&lt;/<span class="hljs-name">app-root</span>&gt;</span>
</code></pre>
<p>我们不必担心这些样式会影响我们的应用程序加载后的内容，因为一切都被完全替换掉。</p>
<p>现在你可以在那里随意的做任何事情。使用<code>css</code>或者<code>svg</code>实现自定义加载动画。</p>
<p>在我们的示例中，我们给页面一个粉红色的背景，我们使用<code>Flexbox</code> 将loading设置居中，给它设置一个更漂亮的字体，我们甚至在省略号上添加一个自定义动画：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<app-root>
  <style>
  app-root {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    color: pink;
    text-transform: uppercase;
    font-family: -apple-system,
        BlinkMacSystemFont,
        &quot;Segoe UI&quot;,
        Roboto,
        Oxygen-Sans,
        Ubuntu,
        Cantarell,
        Helvetica,
        sans-serif;
    font-size: 2.5em;
    text-shadow: 2px 2px 10px rgba(0,0,0,0.2);
  }
  body {
    background: salmon;
    margin: 0;
    padding: 0;
  }

  @keyframes dots {
    50% {
      transform: translateY(-.4rem);
    }
    100% {
      transform: translateY(0);
    }
  }

  .d {
    animation: dots 1.5s ease-out infinite;
  }
  .d-2 {
    animation-delay: .5s;
  }
  .d-3 {
    animation-delay: 1s;
  }
  </style>

  Loading<span class=&quot;d&quot;>.</span><span class=&quot;d d-2&quot;>.</span><span class=&quot;d d-3&quot;>.</span>
</app-root>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">app-root</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-tag">app-root</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;

    <span class="hljs-attribute">color</span>: pink;
    <span class="hljs-attribute">text-transform</span>: uppercase;
    <span class="hljs-attribute">font-family</span>: -apple-system,
        BlinkMacSystemFont,
        <span class="hljs-string">"Segoe UI"</span>,
        Roboto,
        Oxygen-Sans,
        Ubuntu,
        Cantarell,
        Helvetica,
        sans-serif;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">2.5em</span>;
    <span class="hljs-attribute">text-shadow</span>: <span class="hljs-number">2px</span> <span class="hljs-number">2px</span> <span class="hljs-number">10px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.2);
  }
  <span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">background</span>: salmon;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
  }

  @<span class="hljs-keyword">keyframes</span> dots {
    50% {
      <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-.4rem);
    }
    100% {
      <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(0);
    }
  }

  <span class="hljs-selector-class">.d</span> {
    <span class="hljs-attribute">animation</span>: dots <span class="hljs-number">1.5s</span> ease-out infinite;
  }
  <span class="hljs-selector-class">.d-2</span> {
    <span class="hljs-attribute">animation-delay</span>: .<span class="hljs-number">5s</span>;
  }
  <span class="hljs-selector-class">.d-3</span> {
    <span class="hljs-attribute">animation-delay</span>: <span class="hljs-number">1s</span>;
  }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

  Loading<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"d"</span>&gt;</span>.<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"d d-2"</span>&gt;</span>.<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"d d-3"</span>&gt;</span>.<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">app-root</span>&gt;</span></code></pre>
<p>这样我们就实现了上图的加载效果了，<a href="https://alligator.io/angular/custom-loading-screen/" rel="nofollow noreferrer" target="_blank">点击这里查看原文</a></p>
<p>分享几个loading效果的在线素材网：</p>
<ul>
<li><p><a href="https://loading.io/" rel="nofollow noreferrer" target="_blank">loading.io</a></p></li>
<li><p><a href="https://projects.lukehaas.me/css-loaders/" rel="nofollow noreferrer" target="_blank">css-loaders</a></p></li>
<li><p><a href="http://cssload.net/" rel="nofollow noreferrer" target="_blank">cssload</a></p></li>
</ul>
<p>好了，去创建属于你自己的loading吧!</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
自定义 Angular 4 首屏加载动画

## 原文链接
[https://segmentfault.com/a/1190000009929751](https://segmentfault.com/a/1190000009929751)

