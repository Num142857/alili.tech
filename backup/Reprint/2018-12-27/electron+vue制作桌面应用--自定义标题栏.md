---
title: 'electron+vue制作桌面应用--自定义标题栏' 
date: 2018-12-27 2:30:12
hidden: true
slug: fz8herb8blo
categories: [reprint]
---

{{< raw >}}

                    
<p>electron会默认显示边框和标题栏，如下图</p>
<p><span class="img-wrap"><img data-src="/img/bVXwA5?w=412&amp;h=62" src="https://static.alili.tech/img/bVXwA5?w=412&amp;h=62" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>我们来看一下如何自定义一个更加有(gao)意(da)思(shang)的标题栏，例如网易云音乐这种</p>
<p><span class="img-wrap"><img data-src="/img/bVXwBA?w=1063&amp;h=93" src="https://static.alili.tech/img/bVXwBA?w=1063&amp;h=93" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>首先我们要把默认的标题栏删掉，找到主进程中创建窗体部分，new BrowserWindow时添加参数frame: false即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mainWindow = new BrowserWindow({
    useContentSize: true,
    frame: false,
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">mainWindow</span> <span class="hljs-string">=</span> <span class="hljs-string">new</span> <span class="hljs-string">BrowserWindow({</span>
<span class="hljs-attr">    useContentSize:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    frame:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
  <span class="hljs-string">})</span></code></pre>
<p>这样会把标题栏和边框一并隐藏</p>
<p>然后我们开始制作自己的标题栏<br>创建Mytitle组件'\src\renderer\components\mytitle\Mytitle.vue'</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;mytitle&quot;>
  </div>
</template>

<script>

  export default {
    name: 'Mytitle',
    methods: {
    }
  }
</script>
    
<style>
#mytitle {
    width: 100%;
    height: 52px;
    background-color: rgb(198, 47, 47);
    -webkit-app-region: drag;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"mytitle"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'Mytitle'</span>,
    <span class="hljs-attr">methods</span>: {
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-id">#mytitle</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">52px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgb</span>(198, 47, 47);
    <span class="hljs-attribute">-webkit-app-region</span>: drag;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>这里需要注意的是，去掉标题栏后，应用就没法拖动了，需要拖动的话需要拖动的区域需要设置css样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-webkit-app-region: drag;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs diff"><code style="word-break: break-word; white-space: initial;"><span class="hljs-deletion">-webkit-app-region: drag;</span></code></pre>
<p>设置某一部分不可拖动为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-webkit-app-region: no-drag;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attr">-webkit-app-region:</span> <span class="hljs-literal">no</span><span class="hljs-bullet">-drag;</span></code></pre>
<p>然后在App.vue中添加我们新建的组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <!-- <router-view></router-view> -->
    <Mytitle />
  </div>
</template>

<script>
  import Mytitle from './components/mytitle/Mytitle';
  export default {
    name: 'vue-electron-demo',
    components: {
      Mytitle
    }
  }
</script>

<style>
html,
body,
div {
  margin: 0;
  padding: 0;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- &lt;router-view&gt;&lt;/router-view&gt; --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Mytitle</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> Mytitle <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/mytitle/Mytitle'</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'vue-electron-demo'</span>,
    <span class="hljs-attr">components</span>: {
      Mytitle
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">html</span>,
<span class="hljs-selector-tag">body</span>,
<span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>这里需要对默认样式进行重置，不然标题栏与窗体会有边距，like this</p>
<p><span class="img-wrap"><img data-src="/img/bVXwEO?w=680&amp;h=103" src="https://static.alili.tech/img/bVXwEO?w=680&amp;h=103" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>现在自定义标题栏的基本雏形已经完成，剩下的就是基本的请自由发挥吧</p>
<p><a href="https://segmentfault.com/a/1190000011765025">下一篇：electron+vue制作桌面应用--自定义标题栏最大/小化和关闭</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
electron+vue制作桌面应用--自定义标题栏

## 原文链接
[https://segmentfault.com/a/1190000011764559](https://segmentfault.com/a/1190000011764559)

