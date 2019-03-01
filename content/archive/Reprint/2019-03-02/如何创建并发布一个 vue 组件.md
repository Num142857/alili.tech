---
title: '如何创建并发布一个 vue 组件' 
date: 2019-03-02 2:30:07
hidden: true
slug: jzw687hzij
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">步骤</h2>
<h3 id="articleHeader1">创建 vue 的脚手架</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g @vue/cli
vue init webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> install -g @vue/cli
vue init webpack</code></pre>
<h3 id="articleHeader2">绑定 git 项目</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd existing_folder
git init
git remote add origin http://gitlab.alipay-inc.com/ampg/my-projec.git
git add .
git commit
git push -u origin master" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>cd existing_folder
git init
git remote <span class="hljs-keyword">add</span><span class="bash"> origin http://gitlab.alipay-inc.com/ampg/my-projec.git
</span>git <span class="hljs-keyword">add</span><span class="bash"> .
</span>git commit
git push -u origin master</code></pre>
<h3 id="articleHeader3">写组件</h3>
<p>创建组件 <code>src/components/xxx.vue</code></p>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;hello&quot;>
    <h1>"{{" msg "}}"</h1>
    <h2>Essential Links</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add &quot;scoped&quot; attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hello"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{" msg "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Essential Links<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'HelloWorld'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">'Welcome to Your Vue.js App'</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Add "scoped" attribute to limit CSS to this component only --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">h1</span>, <span class="hljs-selector-tag">h2</span> {
  <span class="hljs-attribute">font-weight</span>: normal;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<h3 id="articleHeader4">发布</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm publish" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> publish</code></pre>
<h3 id="articleHeader5">展示</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016945986?w=835&amp;h=414" src="https://static.alili.tech/img/remote/1460000016945986?w=835&amp;h=414" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">代码参考</h3>
<ol><li><a href="https://github.com/wangfulin/vue-component-popup" rel="nofollow noreferrer" target="_blank">vue-component-popup</a></li></ol>
<h2 id="articleHeader7">参考文档</h2>
<ol>
<li><a href="https://vuejs.org/v2/cookbook/packaging-sfc-for-npm.html#How-do-I-make-multiple-versions-of-my-component" rel="nofollow noreferrer" target="_blank">Packaging Vue Components for npm</a></li>
<li><a href="https://cli.vuejs.org/" rel="nofollow noreferrer" target="_blank">Vue CLI 3</a></li>
<li><a href="https://www.npmjs.com/package/vue-sfc-rollup" rel="nofollow noreferrer" target="_blank">vue-sfc-rollup</a></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何创建并发布一个 vue 组件

## 原文链接
[https://segmentfault.com/a/1190000016945983](https://segmentfault.com/a/1190000016945983)

