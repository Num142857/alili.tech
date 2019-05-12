---
title: '初探 amaze-vue（ 基于vue.js封装的Amaze UI 组件库）' 
date: 2018-12-23 2:30:07
hidden: true
slug: tsf223b06l
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="http://amazeui.org/" rel="nofollow noreferrer" target="_blank">Amaze UI </a> 是以移动优先（Mobile first）为理念，面向 HTML5 开发的国产优秀组件库。因官方未提供vue.js版本，而且民间一直对vue.js版本的 Amaze UI 组件库呼声很高，今天特来分享一个完整版的基于Amaze UI 封装的vue.js组件库。</p></blockquote>
<h2 id="articleHeader0">项目地址</h2>
<p><a href="https://github.com/sunshineJi/amaze-vue" rel="nofollow noreferrer" target="_blank">amaze-vue</a></p>
<h2 id="articleHeader1">使用文档</h2>
<p><a href="https://sunshineji.github.io/amaze-vue-docs/#/" rel="nofollow noreferrer" target="_blank">document</a></p>
<h2 id="articleHeader2">开发</h2>
<h3 id="articleHeader3">结合webpack + vue + amaze-vue进行快速开发</h3>
<h4>使用vue-cli快速构建</h4>
<p><a href="http://www.jianshu.com/p/2769efeaa10a" rel="nofollow noreferrer" target="_blank">传送门</a></p>
<h4>通过npm安装amaze-vue</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install amaze-vue --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code class="hash" style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> amaze-vue <span class="hljs-comment">--save</span></code></pre>
<h3 id="articleHeader4">使用amaze-vue进行开发</h3>
<p>修改<code>src/main.js</code> 文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue';
import App from './App';
import AmazeVue from 'amaze-vue';
import 'amaze-vue/dist/amaze-vue.css';
Vue.use(AmazeVue);
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="vue"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>;
<span class="hljs-keyword">import</span> AmazeVue <span class="hljs-keyword">from</span> <span class="hljs-string">'amaze-vue'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'amaze-vue/dist/amaze-vue.css'</span>;
Vue.use(AmazeVue);
<span class="hljs-keyword">new</span> Vue({
    el: <span class="hljs-string">'#app'</span>,
    router,
    template: <span class="hljs-string">'&lt;App/&gt;'</span>,
    components: { App }
});</code></pre>
<h3 id="articleHeader5">原生js开发</h3>
<h4>克隆源代码到本地</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/sunshineJi/amaze-vue.git" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">git <span class="hljs-built_in">clone</span> https://github.com/sunshineJi/amaze-vue.git</code></pre>
<h4>引入文件</h4>
<p>打开clone下来的文件夹<br><span class="img-wrap"><img data-src="/img/remote/1460000012327579?w=530&amp;h=962" src="https://static.alili.tech/img/remote/1460000012327579?w=530&amp;h=962" alt="文件目录" title="文件目录" style="cursor: pointer; display: inline;"></span></p>
<p>将<code>dist</code>目录下的文件拷贝到工程目录下进行后引入<br><code>AMAZEVUE_PATH</code> 是将<code>dist</code> 目录拷贝到项目后的位置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
    <title>amaze-vue</title>
    <link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;AMAZEVUE_PATH/amaze-vue.css&quot;/>
</head>
<body>
    <div id=&quot;app&quot;>
        <am-warning color=&quot;success&quot; :closeBtn=&quot;true&quot;><h1>这是一个warning提示</h1></am-warning>
    </div>
    <script src=&quot;http://unpkg.com/vue&quot; type=&quot;text/javascript&quot;></script>
    <script type=&quot;text/javascript&quot; src=&quot;AMAZEVUE_PATH/amaze-vue.js&quot;></script>
    <script type=&quot;text/javascript&quot;>
        new Vue({
            el: '#app'
        })
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>amaze-vue<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"AMAZEVUE_PATH/amaze-vue.css"</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">am-warning</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"success"</span> <span class="hljs-attr">:closeBtn</span>=<span class="hljs-string">"true"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>这是一个warning提示<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">am-warning</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://unpkg.com/vue"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"AMAZEVUE_PATH/amaze-vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
        <span class="hljs-keyword">new</span> Vue({
            el: <span class="hljs-string">'#app'</span>
        })
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
初探 amaze-vue（ 基于vue.js封装的Amaze UI 组件库）

## 原文链接
[https://segmentfault.com/a/1190000012327574](https://segmentfault.com/a/1190000012327574)

