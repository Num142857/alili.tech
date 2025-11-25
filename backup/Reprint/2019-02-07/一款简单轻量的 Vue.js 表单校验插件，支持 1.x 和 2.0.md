---
title: '一款简单轻量的 Vue.js 表单校验插件，支持 1.x 和 2.0' 
date: 2019-02-07 2:30:15
hidden: true
slug: dsyh9jpnjx4
categories: [reprint]
---

{{< raw >}}

                    
<p>Github: <a href="https://github.com/QingWei-Li/vuerify" rel="nofollow noreferrer" target="_blank">https://github.com/QingWei-Li/vuerify</a></p>
<p>Vuerify 是一个简单轻量的数据校验插件。内置基础的校验规则和错误提示。可自定义规则，规则类型支持正则、函数或者字符串。校验规则可全局注册也可以组件内注册。插件会给 vm 添加 $vuerify 对象，同时 watch 数据并校验合法性，如果有错误会存入 vm.$vuerify.$errors。</p>
<h2 id="articleHeader0">演示</h2>
<ul>
<li><p><a href="https://qingwei-li.github.io/vuerify/signup" rel="nofollow noreferrer" target="_blank">basic</a> 基础用法</p></li>
<li><p><a href="https://qingwei-li.github.io/vuerify/directive" rel="nofollow noreferrer" target="_blank">directive</a> 结合指令使用</p></li>
<li><p><a href="https://qingwei-li.github.io/vuerify/directive-next" rel="nofollow noreferrer" target="_blank">directive for Vue2.0</a></p></li>
<li><p><a href="https://qingwei-li.github.io/vuerify/mint-ui" rel="nofollow noreferrer" target="_blank">mint-ui</a> 结合组件库使用</p></li>
</ul>
<h2 id="articleHeader1">安装</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i vuerify -S" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell" style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> vuerify -S</code></pre>
<h2 id="articleHeader2">使用</h2>
<h3 id="articleHeader3">安装插件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Vuerify from 'vuerify'

Vue.use(Vuerify, /* 添加自定义规则 */)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuerify <span class="hljs-keyword">from</span> <span class="hljs-string">'vuerify'</span>

Vue.use(Vuerify, <span class="hljs-comment">/* 添加自定义规则 */</span>)</code></pre>
<h3 id="articleHeader4">添加自定义规则</h3>
<p><code>test</code> 可以是正则或者函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  required: {
    test: /\S+$/,
    message: '必填项'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">required</span>: {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\S+$/</span>,
    <span class="hljs-attr">message</span>: <span class="hljs-string">'必填项'</span>
  }
}</code></pre>
<h3 id="articleHeader5">组件内注册</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  data () {
    username: '',
    password: ''
  },

  vuerify: {
    username: {
      test: /\w{4,}/,  // 自定义规则，可以是函数，正则或者全局注册的规则（填字符串）
      message: '至少 4 位字符'
    },
    password: 'required' // 使用全局注册的规则
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  data () {
    <span class="hljs-attr">username</span>: <span class="hljs-string">''</span>,
    <span class="hljs-attr">password</span>: <span class="hljs-string">''</span>
  },

  <span class="hljs-attr">vuerify</span>: {
    <span class="hljs-attr">username</span>: {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\w{4,}/</span>,  <span class="hljs-comment">// 自定义规则，可以是函数，正则或者全局注册的规则（填字符串）</span>
      message: <span class="hljs-string">'至少 4 位字符'</span>
    },
    <span class="hljs-attr">password</span>: <span class="hljs-string">'required'</span> <span class="hljs-comment">// 使用全局注册的规则</span>
  }
}</code></pre>
<h2 id="articleHeader6">API</h2>
<p>$vuerify 包含如下属性</p>
<table>
<thead><tr>
<th>name</th>
<th>description</th>
<th>type</th>
<th>default Value</th>
</tr></thead>
<tbody>
<tr>
<td>$errors</td>
<td>数据校验失败的错误信息, 例如 username 校验失败会返回 <code>{ username: '至少 4 位字符' }</code>
</td>
<td>Object</td>
<td>{}</td>
</tr>
<tr>
<td>invalid</td>
<td>存在校验失败的字段</td>
<td>Boolean</td>
<td>true</td>
</tr>
<tr>
<td>valid</td>
<td>不存在校验失败的字段</td>
<td>Boolean</td>
<td>false</td>
</tr>
<tr>
<td>check</td>
<td>检查指定字段，传入数组，返回 Boolean</td>
<td>Function(Array)</td>
<td>-</td>
</tr>
<tr>
<td>clear</td>
<td>清空错误列表</td>
<td>Function</td>
<td>-</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader7">v-vuerify</h2>
<p>该指令可以在表单组件触发 blur 事件时验证数据并为组件设置类名(默认为 .vuerify-invalid)。可以是 <code>input</code> 等原生组件，也可以是自己封装过的组件。提供两个版本</p>
<h3 id="articleHeader8">安装</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Vue 1.x
npm v-vuerify -S

# Vue 2.0
npm v-vuerify-next -S" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="shell"><span class="hljs-comment"># Vue 1.x</span>
<span class="hljs-built_in">npm</span> v-vuerify -S

<span class="hljs-comment"># Vue 2.0</span>
<span class="hljs-built_in">npm</span> v-vuerify-next -S</code></pre>
<h3 id="articleHeader9">用法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import VuerifyDirective from 'v-vuerify' // Vue1.x
import VuerifyDirective from 'v-vuerify-next' // Vue2.0

Vue.use(VuerifyDirective)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> VuerifyDirective <span class="hljs-keyword">from</span> <span class="hljs-string">'v-vuerify'</span> <span class="hljs-comment">// Vue1.x</span>
<span class="hljs-keyword">import</span> VuerifyDirective <span class="hljs-keyword">from</span> <span class="hljs-string">'v-vuerify-next'</span> <span class="hljs-comment">// Vue2.0</span>

Vue.use(VuerifyDirective)</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input v-model=&quot;username&quot; v-vuerify=&quot;'username'&quot;>

<x-input :value.sync=&quot;password&quot; v-vuerify=&quot;'password'&quot;></x-input>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"username"</span> <span class="hljs-attr">v-vuerify</span>=<span class="hljs-string">"'username'"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">x-input</span> <span class="hljs-attr">:value.sync</span>=<span class="hljs-string">"password"</span> <span class="hljs-attr">v-vuerify</span>=<span class="hljs-string">"'password'"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">x-input</span>&gt;</span></code></pre>
<h3 id="articleHeader10">Params</h3>
<ul><li><p>verifyInvalidClass</p></li></ul>
<p>默认类名为 vuerify-invalid</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input v-model=&quot;username&quot; v-vuerify=&quot;'username'&quot; vuerify-invalid-class=&quot;error&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"username"</span> <span class="hljs-attr">v-vuerify</span>=<span class="hljs-string">"'username'"</span> <span class="hljs-attr">vuerify-invalid-class</span>=<span class="hljs-string">"error"</span>&gt;</span></code></pre>
<h3 id="articleHeader11">Modifiers</h3>
<ul><li><p>parent</p></li></ul>
<p>如果 vuerify 是在父组件注册的，那么就需要指定 parent，让指令可以从父组件获取对应的 $vuerify，具体看 <a href="https://github.com/QingWei-Li/vuerify/blob/master/examples/directive/entry.js#L23" rel="nofollow noreferrer" target="_blank">demo</a></p>
<h3 id="articleHeader12">Events</h3>
<ul>
<li><p>vuerify-invalid</p></li>
<li><p>vuerify-valid</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一款简单轻量的 Vue.js 表单校验插件，支持 1.x 和 2.0

## 原文链接
[https://segmentfault.com/a/1190000006002592](https://segmentfault.com/a/1190000006002592)

