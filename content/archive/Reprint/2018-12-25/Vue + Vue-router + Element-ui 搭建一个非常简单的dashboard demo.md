---
title: 'Vue + Vue-router + Element-ui 搭建一个非常简单的dashboard demo' 
date: 2018-12-25 2:30:11
hidden: true
slug: 7lqhn4xqyb
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>做完这个demo后，我体会到，Vue组件化，webpack, Vue-router等，并不是很难学习，<code>你需要的只是拿起斧头的勇气</code><p>在做demo的过程中，我遇到一个问题，就是vue-router懒加载一直实现不了，纠结了半天。<code>后来回到原点，去vue-route官网看文档，发现是因为syntax-dynamic-import插件没有安装</code>。</p>
<p>所以说：<code>你以为的bug, 实际上是你没看透文档</code></p>
</blockquote>
<p><code>初次学习这个教程，你不需要有任何担忧某些东西不会，你也不需要写任何代码。因为基本上所有代码都是从element官网上拷贝的，你所做的只是把他们组装在一起罢了。</code></p>
<p><a href="https://wangduanduan.github.io/vue-el-dashboard/#/" rel="nofollow noreferrer" target="_blank">在线预览</a><br>仓库地址：<a href="https://github.com/wangduanduan/vue-el-dashboard" rel="nofollow noreferrer" target="_blank">https://github.com/wangduandu...</a></p>
<p>效果图：<br><span class="img-wrap"><img data-src="/img/bVYzUb?w=2848&amp;h=1072" src="https://static.alili.tech/img/bVYzUb?w=2848&amp;h=1072" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>使用到的技术：</p>
<ul>
<li>Vue</li>
<li>Vue-router</li>
<li>Element-ui</li>
<li>webpack</li>
<li>Normalize.css</li>
<li>vue-awesome</li>
<li>babel</li>
</ul>
<h1 id="articleHeader0">1 vue-cli 安装模板</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="➜  vue-el-dashboard git:(master) vue init webpack

? Generate project in current directory? Yes
? Project name vue-el-dashboard
? Project description A Vue.js project
? Author wangdd <wangdd@welljoint.com>
? Vue build standalone
? Install vue-router? Yes
? Use ESLint to lint your code? Yes
? Pick an ESLint preset Standard
? Setup unit tests No
? Setup e2e tests with Nightwatch? No

   vue-cli · Generated &quot;vue-el-dashboard&quot;.

   To get started:

     npm install
     npm run dev

   Documentation can be found at https://vuejs-templates.github.io/webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">➜</span>  <span class="hljs-string">vue-el-dashboard</span> <span class="hljs-attr">git:(master)</span> <span class="hljs-string">vue</span> <span class="hljs-string">init</span> <span class="hljs-string">webpack</span>

<span class="hljs-string">?</span> <span class="hljs-string">Generate</span> <span class="hljs-string">project</span> <span class="hljs-string">in</span> <span class="hljs-string">current</span> <span class="hljs-string">directory?</span> <span class="hljs-literal">Yes</span>
<span class="hljs-string">?</span> <span class="hljs-string">Project</span> <span class="hljs-string">name</span> <span class="hljs-string">vue-el-dashboard</span>
<span class="hljs-string">?</span> <span class="hljs-string">Project</span> <span class="hljs-string">description</span> <span class="hljs-string">A</span> <span class="hljs-string">Vue.js</span> <span class="hljs-string">project</span>
<span class="hljs-string">?</span> <span class="hljs-string">Author</span> <span class="hljs-string">wangdd</span> <span class="hljs-string">&lt;wangdd@welljoint.com&gt;</span>
<span class="hljs-string">?</span> <span class="hljs-string">Vue</span> <span class="hljs-string">build</span> <span class="hljs-string">standalone</span>
<span class="hljs-string">?</span> <span class="hljs-string">Install</span> <span class="hljs-string">vue-router?</span> <span class="hljs-literal">Yes</span>
<span class="hljs-string">?</span> <span class="hljs-string">Use</span> <span class="hljs-string">ESLint</span> <span class="hljs-string">to</span> <span class="hljs-string">lint</span> <span class="hljs-string">your</span> <span class="hljs-string">code?</span> <span class="hljs-literal">Yes</span>
<span class="hljs-string">?</span> <span class="hljs-string">Pick</span> <span class="hljs-string">an</span> <span class="hljs-string">ESLint</span> <span class="hljs-string">preset</span> <span class="hljs-string">Standard</span>
<span class="hljs-string">?</span> <span class="hljs-string">Setup</span> <span class="hljs-string">unit</span> <span class="hljs-string">tests</span> <span class="hljs-literal">No</span>
<span class="hljs-string">?</span> <span class="hljs-string">Setup</span> <span class="hljs-string">e2e</span> <span class="hljs-string">tests</span> <span class="hljs-string">with</span> <span class="hljs-string">Nightwatch?</span> <span class="hljs-literal">No</span>

   <span class="hljs-string">vue-cli</span> <span class="hljs-string">·</span> <span class="hljs-string">Generated</span> <span class="hljs-string">"vue-el-dashboard"</span><span class="hljs-string">.</span>

   <span class="hljs-string">To</span> <span class="hljs-string">get</span> <span class="hljs-attr">started:</span>

     <span class="hljs-string">npm</span> <span class="hljs-string">install</span>
     <span class="hljs-string">npm</span> <span class="hljs-string">run</span> <span class="hljs-string">dev</span>

   <span class="hljs-string">Documentation</span> <span class="hljs-string">can</span> <span class="hljs-string">be</span> <span class="hljs-string">found</span> <span class="hljs-string">at</span> <span class="hljs-attr">https://vuejs-templates.github.io/webpack</span></code></pre>
<h1 id="articleHeader1">2 安装依赖并运行</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="➜  vue-el-dashboard git:(master) ✗ cnpm i
✔ Installed 44 packages
✔ Linked 680 latest versions
➜ npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>➜  vue-el-dashboard git:(master) ✗ cnpm i
✔ Installed <span class="hljs-number">44</span> packages
✔ Linked <span class="hljs-number">680</span> latest versions
➜ npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<p><code>浏览器打开如下页面</code>:</p>
<p><span class="img-wrap"><img data-src="/img/bVYzWi?w=1928&amp;h=1188" src="https://static.alili.tech/img/bVYzWi?w=1928&amp;h=1188" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader2">3 安装初始化页面布局</h1>
<p>安装并使用Element UI</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm i element-ui -S" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">cnpm <span class="hljs-selector-tag">i</span> element-ui -S</code></pre>
<p>修改 /src/main.js 为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'

Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> ElementUI <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'element-ui/lib/theme-chalk/index.css'</span>

<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>

Vue.config.productionTip = <span class="hljs-keyword">false</span>

Vue.use(ElementUI)

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#app'</span>,
  template: <span class="hljs-string">'&lt;App/&gt;'</span>,
  components: { App }
})
</code></pre>
<p>我需要的布局是这种：<br><span class="img-wrap"><img data-src="/img/bVYzWx?w=2530&amp;h=634" src="https://static.alili.tech/img/bVYzWx?w=2530&amp;h=634" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>在 <a href="http://element-cn.eleme.io/#/zh-CN/component/container" rel="nofollow noreferrer" target="_blank">Element</a> 上复制对应的代码,<br>并粘贴到 /src/App.vue文件中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>

    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width=&quot;200px&quot;>Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>

export default {
  name: 'app'
}

</script>

<style>

</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">el-container</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-header</span>&gt;</span>Header<span class="hljs-tag">&lt;/<span class="hljs-name">el-header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-container</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-aside</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200px"</span>&gt;</span>Aside<span class="hljs-tag">&lt;/<span class="hljs-name">el-aside</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-main</span>&gt;</span>Main<span class="hljs-tag">&lt;/<span class="hljs-name">el-main</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-container</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-container</span>&gt;</span>

  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>
}

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>不出意外的话，你可以在浏览器上看到如下布局：<br><span class="img-wrap"><img data-src="/img/bVYzWF?w=1118&amp;h=524" src="https://static.alili.tech/img/bVYzWF?w=1118&amp;h=524" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><code>现在，布局就这么成了。</code></p>
<h1 id="articleHeader3">4 安装侧边菜单栏</h1>
<p>我需要侧边栏是下图右边的自定义颜色的那种菜单<br><span class="img-wrap"><img data-src="/img/bVYzWY?w=2406&amp;h=1218" src="https://static.alili.tech/img/bVYzWY?w=2406&amp;h=1218" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在components文件夹下新建NavMenu.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <el-row class=&quot;tac&quot;>
    <el-col :span=&quot;12&quot;>
      <h5>默认颜色</h5>
      <el-menu default-active=&quot;2&quot; class=&quot;el-menu-vertical-demo&quot; @open=&quot;handleOpen&quot; @close=&quot;handleClose&quot;>
        <el-submenu index=&quot;1&quot;>
          <template slot=&quot;title&quot;>
            <i class=&quot;el-icon-location&quot;></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot=&quot;title&quot;>分组一</template>
            <el-menu-item index=&quot;1-1&quot;>选项1</el-menu-item>
            <el-menu-item index=&quot;1-2&quot;>选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title=&quot;分组2&quot;>
            <el-menu-item index=&quot;1-3&quot;>选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index=&quot;1-4&quot;>
            <template slot=&quot;title&quot;>选项4</template>
            <el-menu-item index=&quot;1-4-1&quot;>选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index=&quot;2&quot;>
          <i class=&quot;el-icon-menu&quot;></i>
          <span slot=&quot;title&quot;>导航二</span>
        </el-menu-item>
        <el-menu-item index=&quot;3&quot;>
          <i class=&quot;el-icon-setting&quot;></i>
          <span slot=&quot;title&quot;>导航三</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span=&quot;12&quot;>
      <h5>自定义颜色</h5>
      <el-menu default-active=&quot;2&quot; class=&quot;el-menu-vertical-demo&quot; @open=&quot;handleOpen&quot; @close=&quot;handleClose&quot; background-color=&quot;#545c64&quot; text-color=&quot;#fff&quot; active-text-color=&quot;#ffd04b&quot;>
        <el-submenu index=&quot;1&quot;>
          <template slot=&quot;title&quot;>
            <i class=&quot;el-icon-location&quot;></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot=&quot;title&quot;>分组一</template>
            <el-menu-item index=&quot;1-1&quot;>选项1</el-menu-item>
            <el-menu-item index=&quot;1-2&quot;>选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title=&quot;分组2&quot;>
            <el-menu-item index=&quot;1-3&quot;>选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index=&quot;1-4&quot;>
            <template slot=&quot;title&quot;>选项4</template>
            <el-menu-item index=&quot;1-4-1&quot;>选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index=&quot;2&quot;>
          <i class=&quot;el-icon-menu&quot;></i>
          <span slot=&quot;title&quot;>导航二</span>
        </el-menu-item>
        <el-menu-item index=&quot;3&quot;>
          <i class=&quot;el-icon-setting&quot;></i>
          <span slot=&quot;title&quot;>导航三</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">el-row</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tac"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-col</span> <span class="hljs-attr">:span</span>=<span class="hljs-string">"12"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h5</span>&gt;</span>默认颜色<span class="hljs-tag">&lt;/<span class="hljs-name">h5</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-menu</span> <span class="hljs-attr">default-active</span>=<span class="hljs-string">"2"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-menu-vertical-demo"</span> @<span class="hljs-attr">open</span>=<span class="hljs-string">"handleOpen"</span> @<span class="hljs-attr">close</span>=<span class="hljs-string">"handleClose"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-submenu</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"1"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"title"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-icon-location"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>导航一<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item-group</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"title"</span>&gt;</span>分组一<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"1-1"</span>&gt;</span>选项1<span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"1-2"</span>&gt;</span>选项2<span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item-group</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item-group</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"分组2"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"1-3"</span>&gt;</span>选项3<span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item-group</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">el-submenu</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"1-4"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"title"</span>&gt;</span>选项4<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"1-4-1"</span>&gt;</span>选项1<span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">el-submenu</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-submenu</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"2"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-icon-menu"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"title"</span>&gt;</span>导航二<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"3"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-icon-setting"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"title"</span>&gt;</span>导航三<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-menu</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-col</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-col</span> <span class="hljs-attr">:span</span>=<span class="hljs-string">"12"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h5</span>&gt;</span>自定义颜色<span class="hljs-tag">&lt;/<span class="hljs-name">h5</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-menu</span> <span class="hljs-attr">default-active</span>=<span class="hljs-string">"2"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-menu-vertical-demo"</span> @<span class="hljs-attr">open</span>=<span class="hljs-string">"handleOpen"</span> @<span class="hljs-attr">close</span>=<span class="hljs-string">"handleClose"</span> <span class="hljs-attr">background-color</span>=<span class="hljs-string">"#545c64"</span> <span class="hljs-attr">text-color</span>=<span class="hljs-string">"#fff"</span> <span class="hljs-attr">active-text-color</span>=<span class="hljs-string">"#ffd04b"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-submenu</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"1"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"title"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-icon-location"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>导航一<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item-group</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"title"</span>&gt;</span>分组一<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"1-1"</span>&gt;</span>选项1<span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"1-2"</span>&gt;</span>选项2<span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item-group</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item-group</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"分组2"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"1-3"</span>&gt;</span>选项3<span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item-group</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">el-submenu</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"1-4"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"title"</span>&gt;</span>选项4<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"1-4-1"</span>&gt;</span>选项1<span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">el-submenu</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-submenu</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"2"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-icon-menu"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"title"</span>&gt;</span>导航二<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"3"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-icon-setting"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"title"</span>&gt;</span>导航三<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-menu</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-col</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">el-row</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">methods</span>: {
      handleOpen(key, keyPath) {
        <span class="hljs-built_in">console</span>.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        <span class="hljs-built_in">console</span>.log(key, keyPath);
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>然后将NavMenu组件导入到App.vue中, 修改App.vue：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>

    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width=&quot;200px&quot;>
          <navmenu></navmenu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import NavMenu from '@/components/NavMenu'

export default {
  name: 'app',
  components: {
    'navmenu': NavMenu
  }
}

</script>

<style>

</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">el-container</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-header</span>&gt;</span>Header<span class="hljs-tag">&lt;/<span class="hljs-name">el-header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-container</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-aside</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200px"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">navmenu</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navmenu</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-aside</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-main</span>&gt;</span>Main<span class="hljs-tag">&lt;/<span class="hljs-name">el-main</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-container</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-container</span>&gt;</span>

  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> NavMenu <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/NavMenu'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
  <span class="hljs-attr">components</span>: {
    <span class="hljs-string">'navmenu'</span>: NavMenu
  }
}

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>这里要解释一下这条语句, 该语句中的<code>@</code>, 符号是什么意思？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import NavMenu from '@/components/NavMenu'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> NavMenu <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/NavMenu'</span></code></pre>
<p>在build/webpack.base.conf.js中有如下代码, alias就是起别名，<code>@符号就是代表src路径， 所以@/components/NavMenu就是src/components/NavMenu</code>。 这样webpack就知道如何引入文件了。这样做的好处是不必到处去写<code>src</code>了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>  <span class="hljs-selector-tag">resolve</span>: {
    <span class="hljs-attribute">extensions</span>: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>],
    alias: {
      <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.esm.js'</span>,
      <span class="hljs-string">'@'</span>: <span class="hljs-built_in">resolve</span>(<span class="hljs-string">'src'</span>),
    }
  },</code></pre>
<p>现在打开浏览器，应该可以看到如下界面：<br><span class="img-wrap"><img data-src="/img/bVYzW6?w=1322&amp;h=922" src="https://static.alili.tech/img/bVYzW6?w=1322&amp;h=922" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>可以看到菜单已经引入进来了，但是是两个菜单，下面我们需要修改一下，只要右边的菜单，并删除一些多余的元素。<br>修改NavMenu.vue文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <el-row class=&quot;tac&quot;>
    <el-col :span=&quot;24&quot;>
      <el-menu default-active=&quot;2&quot; class=&quot;el-menu-vertical-demo&quot; @open=&quot;handleOpen&quot; @close=&quot;handleClose&quot;
      unique-opened
      router
      background-color=&quot;#545c64&quot; text-color=&quot;#fff&quot; active-text-color=&quot;#ffd04b&quot;>
        <el-submenu index=&quot;1&quot;>
          <template slot=&quot;title&quot;>
            <i class=&quot;el-icon-location&quot;></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index=&quot;1-1&quot;>选项1</el-menu-item>
            <el-menu-item index=&quot;1-2&quot;>选项2</el-menu-item>
            <el-menu-item index=&quot;1-3&quot;>选项3</el-menu-item>
            <el-menu-item index=&quot;1-4&quot;>选项4</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index=&quot;2&quot;>
          <template slot=&quot;title&quot;>
            <i class=&quot;el-icon-location&quot;></i>
            <span>导航二</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index=&quot;2-1&quot;>选项1</el-menu-item>
            <el-menu-item index=&quot;2-2&quot;>选项2</el-menu-item>
            <el-menu-item index=&quot;2-3&quot;>选项3</el-menu-item>
            <el-menu-item index=&quot;2-4&quot;>选项4</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-symbol">&lt;template&gt;</span>
  &lt;<span class="hljs-keyword">el</span>-row class=<span class="hljs-string">"tac"</span>&gt;
    &lt;<span class="hljs-keyword">el</span>-<span class="hljs-keyword">col</span> :span=<span class="hljs-string">"24"</span>&gt;
      &lt;<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span> default-active=<span class="hljs-string">"2"</span> class=<span class="hljs-string">"el-menu-vertical-demo"</span> @open=<span class="hljs-string">"handleOpen"</span> @close=<span class="hljs-string">"handleClose"</span>
      unique-opened
      router
      background-color=<span class="hljs-string">"#545c64"</span> text-color=<span class="hljs-string">"#fff"</span> active-text-color=<span class="hljs-string">"#ffd04b"</span>&gt;
        &lt;<span class="hljs-keyword">el</span>-submenu <span class="hljs-built_in">index</span>=<span class="hljs-string">"1"</span>&gt;
          &lt;template slot=<span class="hljs-string">"title"</span>&gt;
            &lt;i class=<span class="hljs-string">"el-icon-location"</span>&gt;&lt;/i&gt;
            <span class="hljs-symbol">&lt;span&gt;</span>导航一&lt;/span&gt;
          &lt;/template&gt;
          <span class="hljs-symbol">&lt;el-menu-item-group&gt;</span>
            &lt;<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item <span class="hljs-built_in">index</span>=<span class="hljs-string">"1-1"</span>&gt;选项<span class="hljs-number">1</span>&lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item&gt;
            &lt;<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item <span class="hljs-built_in">index</span>=<span class="hljs-string">"1-2"</span>&gt;选项<span class="hljs-number">2</span>&lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item&gt;
            &lt;<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item <span class="hljs-built_in">index</span>=<span class="hljs-string">"1-3"</span>&gt;选项<span class="hljs-number">3</span>&lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item&gt;
            &lt;<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item <span class="hljs-built_in">index</span>=<span class="hljs-string">"1-4"</span>&gt;选项<span class="hljs-number">4</span>&lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item&gt;
          &lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item-group&gt;
        &lt;/<span class="hljs-keyword">el</span>-submenu&gt;

        &lt;<span class="hljs-keyword">el</span>-submenu <span class="hljs-built_in">index</span>=<span class="hljs-string">"2"</span>&gt;
          &lt;template slot=<span class="hljs-string">"title"</span>&gt;
            &lt;i class=<span class="hljs-string">"el-icon-location"</span>&gt;&lt;/i&gt;
            <span class="hljs-symbol">&lt;span&gt;</span>导航二&lt;/span&gt;
          &lt;/template&gt;
          <span class="hljs-symbol">&lt;el-menu-item-group&gt;</span>
            &lt;<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item <span class="hljs-built_in">index</span>=<span class="hljs-string">"2-1"</span>&gt;选项<span class="hljs-number">1</span>&lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item&gt;
            &lt;<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item <span class="hljs-built_in">index</span>=<span class="hljs-string">"2-2"</span>&gt;选项<span class="hljs-number">2</span>&lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item&gt;
            &lt;<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item <span class="hljs-built_in">index</span>=<span class="hljs-string">"2-3"</span>&gt;选项<span class="hljs-number">3</span>&lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item&gt;
            &lt;<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item <span class="hljs-built_in">index</span>=<span class="hljs-string">"2-4"</span>&gt;选项<span class="hljs-number">4</span>&lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item&gt;
          &lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item-group&gt;
        &lt;/<span class="hljs-keyword">el</span>-submenu&gt;

      &lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>&gt;
    &lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">col</span>&gt;
  &lt;/<span class="hljs-keyword">el</span>-row&gt;
&lt;/template&gt;

<span class="hljs-symbol">&lt;script&gt;</span>
  export default {
    method<span class="hljs-variable">s:</span> {
      handleOpen(key, keyPath) {
        console.<span class="hljs-built_in">log</span>(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.<span class="hljs-built_in">log</span>(key, keyPath)
      }
    }
  }
&lt;/script&gt;</code></pre>
<p>现在打开浏览器看看：<br><span class="img-wrap"><img data-src="/img/bVYzXh?w=1068&amp;h=476" src="https://static.alili.tech/img/bVYzXh?w=1068&amp;h=476" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>点击展开菜单看看：<br><span class="img-wrap"><img data-src="/img/bVYzXo?w=1228&amp;h=1336" src="https://static.alili.tech/img/bVYzXo?w=1228&amp;h=1336" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader4">5 侧边菜单栏进阶</h1>
<p>我们需要的功能：</p>
<ol>
<li>每次只能展开一个一级菜单</li>
<li>每次点击一个二级菜单可以自动改变路由，跳转到对应的组件</li>
<li>由于菜单在路由中也会使用，所以最好抽象出来，做成一个配置文件</li>
</ol>
<p>第1点和第二点比较好搞，Element上已经有配置文档:</p>
<ul>
<li>unique-opened: 是否只保持一个子菜单的展开</li>
<li>router: 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVYzXq?w=2446&amp;h=1422" src="https://static.alili.tech/img/bVYzXq?w=2446&amp;h=1422" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>修改NavMenu.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <el-row class=&quot;tac&quot;>
    <el-col :span=&quot;24&quot;>
      <el-menu default-active=&quot;2&quot; class=&quot;el-menu-vertical-demo&quot; @open=&quot;handleOpen&quot; @close=&quot;handleClose&quot;
      unique-opened
      router
      background-color=&quot;#545c64&quot; text-color=&quot;#fff&quot; active-text-color=&quot;#ffd04b&quot;>
        <el-submenu index=&quot;1&quot;>
          <template slot=&quot;title&quot;>
            <i class=&quot;el-icon-location&quot;></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index=&quot;1-1&quot;>选项1</el-menu-item>
            <el-menu-item index=&quot;1-2&quot;>选项2</el-menu-item>
            <el-menu-item index=&quot;1-3&quot;>选项3</el-menu-item>
            <el-menu-item index=&quot;1-4&quot;>选项4</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index=&quot;2&quot;>
          <template slot=&quot;title&quot;>
            <i class=&quot;el-icon-location&quot;></i>
            <span>导航二</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index=&quot;2-1&quot;>选项1</el-menu-item>
            <el-menu-item index=&quot;2-2&quot;>选项2</el-menu-item>
            <el-menu-item index=&quot;2-3&quot;>选项3</el-menu-item>
            <el-menu-item index=&quot;2-4&quot;>选项4</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-symbol">&lt;template&gt;</span>
  &lt;<span class="hljs-keyword">el</span>-row class=<span class="hljs-string">"tac"</span>&gt;
    &lt;<span class="hljs-keyword">el</span>-<span class="hljs-keyword">col</span> :span=<span class="hljs-string">"24"</span>&gt;
      &lt;<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span> default-active=<span class="hljs-string">"2"</span> class=<span class="hljs-string">"el-menu-vertical-demo"</span> @open=<span class="hljs-string">"handleOpen"</span> @close=<span class="hljs-string">"handleClose"</span>
      unique-opened
      router
      background-color=<span class="hljs-string">"#545c64"</span> text-color=<span class="hljs-string">"#fff"</span> active-text-color=<span class="hljs-string">"#ffd04b"</span>&gt;
        &lt;<span class="hljs-keyword">el</span>-submenu <span class="hljs-built_in">index</span>=<span class="hljs-string">"1"</span>&gt;
          &lt;template slot=<span class="hljs-string">"title"</span>&gt;
            &lt;i class=<span class="hljs-string">"el-icon-location"</span>&gt;&lt;/i&gt;
            <span class="hljs-symbol">&lt;span&gt;</span>导航一&lt;/span&gt;
          &lt;/template&gt;
          <span class="hljs-symbol">&lt;el-menu-item-group&gt;</span>
            &lt;<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item <span class="hljs-built_in">index</span>=<span class="hljs-string">"1-1"</span>&gt;选项<span class="hljs-number">1</span>&lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item&gt;
            &lt;<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item <span class="hljs-built_in">index</span>=<span class="hljs-string">"1-2"</span>&gt;选项<span class="hljs-number">2</span>&lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item&gt;
            &lt;<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item <span class="hljs-built_in">index</span>=<span class="hljs-string">"1-3"</span>&gt;选项<span class="hljs-number">3</span>&lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item&gt;
            &lt;<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item <span class="hljs-built_in">index</span>=<span class="hljs-string">"1-4"</span>&gt;选项<span class="hljs-number">4</span>&lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item&gt;
          &lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item-group&gt;
        &lt;/<span class="hljs-keyword">el</span>-submenu&gt;

        &lt;<span class="hljs-keyword">el</span>-submenu <span class="hljs-built_in">index</span>=<span class="hljs-string">"2"</span>&gt;
          &lt;template slot=<span class="hljs-string">"title"</span>&gt;
            &lt;i class=<span class="hljs-string">"el-icon-location"</span>&gt;&lt;/i&gt;
            <span class="hljs-symbol">&lt;span&gt;</span>导航二&lt;/span&gt;
          &lt;/template&gt;
          <span class="hljs-symbol">&lt;el-menu-item-group&gt;</span>
            &lt;<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item <span class="hljs-built_in">index</span>=<span class="hljs-string">"2-1"</span>&gt;选项<span class="hljs-number">1</span>&lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item&gt;
            &lt;<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item <span class="hljs-built_in">index</span>=<span class="hljs-string">"2-2"</span>&gt;选项<span class="hljs-number">2</span>&lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item&gt;
            &lt;<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item <span class="hljs-built_in">index</span>=<span class="hljs-string">"2-3"</span>&gt;选项<span class="hljs-number">3</span>&lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item&gt;
            &lt;<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item <span class="hljs-built_in">index</span>=<span class="hljs-string">"2-4"</span>&gt;选项<span class="hljs-number">4</span>&lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item&gt;
          &lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>-item-group&gt;
        &lt;/<span class="hljs-keyword">el</span>-submenu&gt;

      &lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">menu</span>&gt;
    &lt;/<span class="hljs-keyword">el</span>-<span class="hljs-keyword">col</span>&gt;
  &lt;/<span class="hljs-keyword">el</span>-row&gt;
&lt;/template&gt;

<span class="hljs-symbol">&lt;script&gt;</span>
  export default {
    method<span class="hljs-variable">s:</span> {
      handleOpen (key, keyPath) {
        console.<span class="hljs-built_in">log</span>(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.<span class="hljs-built_in">log</span>(key, keyPath)
      }
    }
  }
&lt;/script&gt;</code></pre>
<p>打开浏览器，点击一个二级菜单看看，你会发现，效果并不像预期那样，而且控制台还向你扔出一个bug：<br><span class="img-wrap"><img data-src="/img/bVYzXB?w=1922&amp;h=1492" src="https://static.alili.tech/img/bVYzXB?w=1922&amp;h=1492" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>添加一个暂时的路由: 修改main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> ElementUI <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'element-ui/lib/theme-chalk/index.css'</span>

<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>

Vue.config.productionTip = <span class="hljs-keyword">false</span>

Vue.use(ElementUI)

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#app'</span>,
  router,
  template: <span class="hljs-string">'&lt;App/&gt;'</span>,
  components: { App }
})</code></pre>
<p>打开浏览器，点击一个二级菜单，这时候没有报错，浏览器的路径也变了, 变成<code>http://localhost:8080/#/1-3</code><br><span class="img-wrap"><img data-src="/img/bVYzXG?w=1620&amp;h=1196" src="https://static.alili.tech/img/bVYzXG?w=1620&amp;h=1196" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><code>每次增加一个菜单都要写点html是不能忍的，能用js的，就别用html</code>。</p>
<p>在src目录下创建一个config目录，目录下创建一个menu-config.js 文件：<br>外层的数组代表一级菜单，内层sub数组代表二级菜单。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = [{
  name: '基础',
  id: 'basic',
  sub: [{
    name: 'Layout 布局',
    componentName: 'BasicLayout'
  }, {
    name: 'Container 布局容器',
    componentName: 'BasicContainer'
  }]
}, {
  name: 'Form',
  id: 'form',
  sub: [{
    name: 'Radio 单选框',
    componentName: 'FormRadio'
  }, {
    name: 'Checkbox 多选框',
    componentName: 'FormCheckbox'
  }]
}]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code>module.exports = [{
  name: <span class="hljs-string">'基础'</span>,
  id: <span class="hljs-string">'basic'</span>,
  <span class="hljs-function"><span class="hljs-keyword">sub</span>: [</span>{
    name: <span class="hljs-string">'Layout 布局'</span>,
    componentName: <span class="hljs-string">'BasicLayout'</span>
  }, {
    name: <span class="hljs-string">'Container 布局容器'</span>,
    componentName: <span class="hljs-string">'BasicContainer'</span>
  }]
}, {
  name: <span class="hljs-string">'Form'</span>,
  id: <span class="hljs-string">'form'</span>,
  <span class="hljs-function"><span class="hljs-keyword">sub</span>: [</span>{
    name: <span class="hljs-string">'Radio 单选框'</span>,
    componentName: <span class="hljs-string">'FormRadio'</span>
  }, {
    name: <span class="hljs-string">'Checkbox 多选框'</span>,
    componentName: <span class="hljs-string">'FormCheckbox'</span>
  }]
}]
</code></pre>
<p>在NavMenu.vue中引入这个文件，并使用<code>v-for</code>循环去渲染这个菜单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <el-row class=&quot;tac&quot;>
  <el-col :span=&quot;24&quot;>
    <el-menu
      class=&quot;el-menu-vertical-demo&quot;
      router
      unique-opened
      @open=&quot;handleOpen&quot;
      @close=&quot;handleClose&quot;
      background-color=&quot;#545c64&quot;
      text-color=&quot;#fff&quot;
      active-text-color=&quot;#ffd04b&quot;>

      <el-submenu v-for=&quot;item in menu&quot; :index=&quot;item.id&quot; :key=&quot;item.id&quot;>
        <template slot=&quot;title&quot;>
          <span v-text=&quot;item.name&quot;></span>
        </template>
        <el-menu-item-group class=&quot;over-hide&quot; v-for=&quot;sub in item.sub&quot; :key=&quot;sub.componentName&quot;>
          <el-menu-item :index=&quot;sub.componentName&quot; v-text=&quot;sub.name&quot;>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>
  </el-col>
</el-row>
</template>

<style scoped>
  .over-hide{
    overflow: hidden;
  }
</style>

<script>
  import menu from '@/config/menu-config'

  export default {
    data () {
      return {
        menu: menu
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">el-row</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tac"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">el-col</span> <span class="hljs-attr">:span</span>=<span class="hljs-string">"24"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-menu</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">"el-menu-vertical-demo"</span>
      <span class="hljs-attr">router</span>
      <span class="hljs-attr">unique-opened</span>
      @<span class="hljs-attr">open</span>=<span class="hljs-string">"handleOpen"</span>
      @<span class="hljs-attr">close</span>=<span class="hljs-string">"handleClose"</span>
      <span class="hljs-attr">background-color</span>=<span class="hljs-string">"#545c64"</span>
      <span class="hljs-attr">text-color</span>=<span class="hljs-string">"#fff"</span>
      <span class="hljs-attr">active-text-color</span>=<span class="hljs-string">"#ffd04b"</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">el-submenu</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in menu"</span> <span class="hljs-attr">:index</span>=<span class="hljs-string">"item.id"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"item.id"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"title"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"item.name"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item-group</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"over-hide"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"sub in item.sub"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"sub.componentName"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item</span> <span class="hljs-attr">:index</span>=<span class="hljs-string">"sub.componentName"</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"sub.name"</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item-group</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-submenu</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">el-menu</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">el-col</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">el-row</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.over-hide</span>{
    <span class="hljs-attribute">overflow</span>: hidden;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> menu <span class="hljs-keyword">from</span> <span class="hljs-string">'@/config/menu-config'</span>

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data () {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">menu</span>: menu
      }
    },
    <span class="hljs-attr">methods</span>: {
      handleOpen (key, keyPath) {
        <span class="hljs-built_in">console</span>.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        <span class="hljs-built_in">console</span>.log(key, keyPath)
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这里要说明一下，我给二级菜单加上了<code>over-hide</code>类，二级菜单在展开时，有点溢出父元素了。<br>打开浏览器看看, 这时候菜单已经是根据配置文件渲染的了。</p>
<p><span class="img-wrap"><img data-src="/img/bVYzXN?w=1616&amp;h=1374" src="https://static.alili.tech/img/bVYzXN?w=1616&amp;h=1374" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h1 id="articleHeader5">6 先加个头部吧，秃顶太丑了</h1>
<p>在componets文件夹下创建一个Header.vue, 并在App.vue中引入，</p>
<p>Header.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <el-row>
    <el-col :span=&quot;24&quot;
      <div class=&quot;head-wrap&quot;>Element</div>
    </el-col>
  </el-row>
</template>

<style scoped>
.head-wrap{

}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">el-row</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-col</span> <span class="hljs-attr">:span</span>=<span class="hljs-string">"24"</span>
      &lt;<span class="hljs-attr">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"head-wrap"</span>&gt;</span>Element<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-col</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">el-row</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.head-wrap</span>{

}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<p>App.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <el-container>
      <el-header class=&quot;header&quot;>
        <vheader />
      </el-header>
      <el-container>
        <el-aside width=&quot;200px&quot;>
          <navmenu></navmenu>
        </el-aside>
        <el-main>Main
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import NavMenu from '@/components/NavMenu'
import Header from '@/components/Header'

export default {
  name: 'app',
  components: {
    'navmenu': NavMenu,
    'vheader': Header
  }
}

</script>

<style>
.header {
  background-color: #409EFF;
  color: #fff;
  line-height: 60px;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-container</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"header"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">vheader</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-container</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-aside</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200px"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">navmenu</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">navmenu</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-aside</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-main</span>&gt;</span>Main
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-main</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-container</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-container</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> NavMenu <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/NavMenu'</span>
<span class="hljs-keyword">import</span> Header <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/Header'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
  <span class="hljs-attr">components</span>: {
    <span class="hljs-string">'navmenu'</span>: NavMenu,
    <span class="hljs-string">'vheader'</span>: Header
  }
}

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.header</span> {
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#409EFF</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">60px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>这时候打开浏览器看看, 是不是已经好看一点了。但是body有边框，不好看啊！<br><span class="img-wrap"><img data-src="/img/bVYzXT?w=1254&amp;h=992" src="https://static.alili.tech/img/bVYzXT?w=1254&amp;h=992" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><code>再次美化</code></p>
<ul>
<li>使用css reset <a href="http://necolas.github.io/normalize.css/" rel="nofollow noreferrer" target="_blank">Normalize.css</a>
</li>
<li>使用font-awesome <a href="https://github.com/Justineo/vue-awesome" rel="nofollow noreferrer" target="_blank">vue-awesome图标库</a>
</li>
</ul>
<p><code>安装Normalize.css, vue-awesome</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm i normalize.css -D
cnpm i vue-awesome -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>cnpm <span class="hljs-selector-tag">i</span> normalize<span class="hljs-selector-class">.css</span> -D
cnpm <span class="hljs-selector-tag">i</span> vue-awesome -D</code></pre>
<p>这里主要贴一下main.js的改动，其他的代码就不贴了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import NormailizeCss from 'normalize.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> ElementUI <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'element-ui/lib/theme-chalk/index.css'</span>
<span class="hljs-keyword">import</span> NormailizeCss <span class="hljs-keyword">from</span> <span class="hljs-string">'normalize.css'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'vue-awesome/icons'</span>
<span class="hljs-keyword">import</span> Icon <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-awesome/components/Icon'</span>

<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>

Vue.config.productionTip = <span class="hljs-keyword">false</span>

Vue.use(ElementUI)
Vue.component(<span class="hljs-string">'icon'</span>, Icon)

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#app'</span>,
  router,
  template: <span class="hljs-string">'&lt;App/&gt;'</span>,
  components: { App }
})</code></pre>
<p>看下效果, 图标什么的都有了。<br><span class="img-wrap"><img data-src="/img/bVYzYg?w=1160&amp;h=1198" src="https://static.alili.tech/img/bVYzYg?w=1160&amp;h=1198" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h1 id="articleHeader6">7 组件路由与懒加载</h1>
<p>在components新增四个文件：</p>
<p>BasicContainer.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    这是：Container 布局容器
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    这是：Container 布局容器
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>BasicLayout.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    这是：Layout 布局
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    这是：Layout 布局
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>FormCheckbox.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    这是：Checkbox 多选框
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    这是：Checkbox 多选框
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>FormRadio.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    这是：Radio 单选框
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    这是：Radio 单选框
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>修改route/index.js文件, 关于路由和懒加载就不在此赘述，任何文档都没有官方文档说的好。</p>
<p><code>注意：如果您使用的是 Babel，你将需要添加 syntax-dynamic-import 插件，才能使 Babel 可以正确地解析语法。</code><br>也就是说，你要先安装<code>syntax-dynamic-import</code>, 不然懒加载根本不行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install --save-dev babel-plugin-syntax-dynamic-import" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code style="word-break: break-word; white-space: initial;">cnpm install --<span class="hljs-keyword">save</span>-dev babel-<span class="hljs-keyword">plugin</span>-<span class="hljs-keyword">syntax</span>-dynamic-import</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Router from 'vue-router'
import menus from '@/config/menu-config'

Vue.use(Router)

var routes = []

menus.forEach((item) => {
  item.sub.forEach((sub) => {
    routes.push({
      path: `/${sub.componentName}`,
      name: sub.componentName,
      component: () => import(`@/components/${sub.componentName}`)
    })
  })
})

export default new Router({ routes })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> menus <span class="hljs-keyword">from</span> <span class="hljs-string">'@/config/menu-config'</span>

Vue.use(Router)

var routes = []

menus.forEach(<span class="hljs-function"><span class="hljs-params">(item)</span> =&gt;</span> {
  item.sub.forEach(<span class="hljs-function"><span class="hljs-params">(sub)</span> =&gt;</span> {
    routes.push({
      path: `<span class="javascript">/${sub.componentName}</span>`,
      name: sub.componentName,
      component: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(`<span class="javascript">@/components/${sub.componentName}</span>`)
    })
  })
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({ routes })</code></pre>
<p>另外App.vue文件需要加上 router-view</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-main>
  <router-view></router-view>
</el-main>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;el-main&gt;</span>
  <span class="hljs-section">&lt;router-view&gt;</span><span class="hljs-section">&lt;/router-view&gt;</span>
<span class="hljs-section">&lt;/el-main&gt;</span></code></pre>
<p>看看效果：点击菜单，路径跳转，并且每次都是单独去加载路由的文件。</p>
<p><span class="img-wrap"><img data-src="/img/bVYzYw?w=782&amp;h=619" src="https://static.alili.tech/img/bVYzYw?w=782&amp;h=619" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader7">8 github 部署</h1>
<p>如果你想在github上部署，那么你要修改config/index.js的以下代码, 不然有些文件因为路径问题可能会找不到。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" build: {
    // Template for index.html
    index: path.resolve(__dirname, '../docs/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../docs'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/vue-el-dashboard/'," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code> <span class="hljs-attribute">build</span>: {
    <span class="hljs-comment">// Template for index.html</span>
    <span class="hljs-attribute">index</span>: path.resolve(__dirname, <span class="hljs-string">'../docs/index.html'</span>),

    <span class="hljs-comment">// Paths</span>
    <span class="hljs-attribute">assetsRoot</span>: path.resolve(__dirname, <span class="hljs-string">'../docs'</span>),
    <span class="hljs-attribute">assetsSubDirectory</span>: <span class="hljs-string">'static'</span>,
    <span class="hljs-attribute">assetsPublicPath</span>: <span class="hljs-string">'/vue-el-dashboard/'</span>,</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue + Vue-router + Element-ui 搭建一个非常简单的dashboard demo

## 原文链接
[https://segmentfault.com/a/1190000012015667](https://segmentfault.com/a/1190000012015667)

