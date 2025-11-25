---
title: '分享一个vue的生成头像组件' 
date: 2019-01-08 2:30:11
hidden: true
slug: 1j7h6sblizm
categories: [reprint]
---

{{< raw >}}

                    
<p>今天看到一个vue的生成头像的组件--<a href="http://www.wheelsfactory.cn/#/detail?id=83" rel="nofollow noreferrer" target="_blank">vue-avator</a>。这个组件很实用，可以生成手机或者邮箱通讯录里常见的用户名缩写形式的头像。当然也支持用户上传图片的头像。</p>
<p><span class="img-wrap"><img data-src="/img/bVQ4vJ?w=878&amp;h=318" src="https://static.alili.tech/img/bVQ4vJ?w=878&amp;h=318" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>它可以支持用户自定义头像的首字母颜色和背景色，当然如果你不设定，它会根据用户名的长度计算出相应的背景色，并且通过背景色计算出相匹配的字母颜色。</p>
<p><span class="img-wrap"><img data-src="/img/bVQ4vM?w=1514&amp;h=1600" src="https://static.alili.tech/img/bVQ4vM?w=1514&amp;h=1600" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">用来计算用户姓名大写字母的规则</h2>
<ul>
<li><p>空格和连字符处分隔用户名</p></li>
<li><p>使用每部分的第一个字母</p></li>
<li><p>不要使用多于3个字母做姓名大写</p></li>
<li><p>不要使用多于3个字母做姓名大写</p></li>
</ul>
<h2 id="articleHeader1">安装</h2>
<p>通过NPM安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-avatar
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>npm <span class="hljs-keyword">install</span> vue-avatar
</code></pre>
<h2 id="articleHeader2">插件应用</h2>
<p>vue-avatar是一个UMD模块，可以在CommonJS和AMD的环境中被当作模块使用，在无模块的环境中，Avatar将被注册为全局变量。<br>ES6</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Avatar from 'vue-avatar/dist/Avatar'

export default {

  components: {
    Avatar
  },

}
<avatar username=&quot;Jane Doe&quot;></avatar>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Avatar <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-avatar/dist/Avatar'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {

  <span class="hljs-attr">components</span>: {
    Avatar
  },

}
&lt;avatar username=<span class="hljs-string">"Jane Doe"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">avatar</span>&gt;</span></span>
</code></pre>
<p>CommonJS</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Vue = require('vue')
var Avatar = require('vue-avatar')

var YourComponent = Vue.extend({
  components: {
    'avatar': Avatar.Avatar
  }
})
Browser
    <script src=&quot;path/to/vue/vue.min.js&quot;></script>
    <script src=&quot;path/to/vue-avatar/dist/vue-avatar.min.js&quot;></script>

new Vue({
  components: {
    'avatar': Avatar.Avatar
  }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> Vue = <span class="hljs-built_in">require</span>(<span class="hljs-string">'vue'</span>)
<span class="hljs-keyword">var</span> Avatar = <span class="hljs-built_in">require</span>(<span class="hljs-string">'vue-avatar'</span>)

<span class="hljs-keyword">var</span> YourComponent = Vue.extend({
  <span class="hljs-attr">components</span>: {
    <span class="hljs-string">'avatar'</span>: Avatar.Avatar
  }
})
Browser
    &lt;script src=<span class="hljs-string">"path/to/vue/vue.min.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
    &lt;script src=<span class="hljs-string">"path/to/vue-avatar/dist/vue-avatar.min.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">components</span>: {
    <span class="hljs-string">'avatar'</span>: Avatar.Avatar
  }
})
</code></pre>
<p><a href="http://www.wheelsfactory.cn/" rel="nofollow noreferrer" target="_blank">轮子工厂</a>--一个分享优秀的vue,angular组件的网站</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
分享一个vue的生成头像组件

## 原文链接
[https://segmentfault.com/a/1190000010226370](https://segmentfault.com/a/1190000010226370)

