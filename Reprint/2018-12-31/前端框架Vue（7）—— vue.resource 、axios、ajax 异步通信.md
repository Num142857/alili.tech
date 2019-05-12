---
title: '前端框架Vue（7）—— vue.resource 、axios、ajax 异步通信' 
date: 2018-12-31 2:30:29
hidden: true
slug: lsm8mpondl
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>vue 中如何支持异步请求</strong></p>
<h2 id="articleHeader0">1、vue 支持开发者引入 jquery 使用 $.ajax()</h2>
<p>1、首先，在 package.json 中添加 jQuery，然后 npm install</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;dependencies&quot;: {
    &quot;jquery&quot;: &quot;^3.2.1&quot;,
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"dependencies"</span>: {
    <span class="hljs-string">"jquery"</span>: <span class="hljs-string">"^3.2.1"</span>,
  },</code></pre>
<p>2、在 webpack.config.js ( 这边用的 vue-cli-simple 脚手架 )</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // 增加一个plugins
  plugins: [
      new webpack.ProvidePlugin({
          $: &quot;jquery&quot;,
          jQuery: &quot;jquery&quot;
      })
   ]," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code> <span class="hljs-comment">// 增加一个plugins</span>
<span class="hljs-symbol">  plugins:</span> [
      new webpack.ProvidePlugin({
          $: <span class="hljs-string">"jquery"</span>,
<span class="hljs-symbol">          jQuery:</span> <span class="hljs-string">"jquery"</span>
      })
   ],</code></pre>
<p>3、最后，在全局（main.js）中去引用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import $ from 'jquery'   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> $ <span class="hljs-keyword">from</span> <span class="hljs-string">'jquery'</span>   </code></pre>
<h2 id="articleHeader1">2、vue.resource（ 2.0后不再更新）</h2>
<p>1、 npm 安装 vue-resource</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" npm install vue-resource" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;"> npm <span class="hljs-keyword">install</span> vue-<span class="hljs-keyword">resource</span></code></pre>
<p>2、 main.js 中引入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" import VueResource from 'vue-resource'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-keyword">import</span> VueResource <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-resource'</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  Vue.use(VueResource)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">  Vue.<span class="hljs-keyword">use</span>(VueResource)</code></pre>
<p>3、使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$http.get('../src/data/a.txt')
    .then(function(res){
              alert(res.data);
          },function(){
              alert('false')
          });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'../src/data/a.txt'</span>)
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(res)</span></span>{
              alert(res.data);
          },<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
              alert(<span class="hljs-string">'false'</span>)
          });</code></pre>
<h2 id="articleHeader2">3、推荐使用 axios</h2>
<p>github 地址：<a href="https://github.com/mzabriskie/axios" rel="nofollow noreferrer" target="_blank">https://github.com/mzabriskie...</a></p>
<p>url :绝对路径</p>
<p>1、npm 安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install axios" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> axios</code></pre>
<p>2、组件 中引入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Axios from 'axios'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span></code></pre>
<p>3、使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.get('url')
     .then(function(res){
    alert(res);
     })
     .catch(function(err){
    alert(err);
     })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>axios.get(<span class="hljs-string">'url'</span>)
     .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(res)</span>{</span>
    alert(res);
     })
     .<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err)</span>{</span>
    alert(err);
     })</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>axios.post(<span class="hljs-string">'/user'</span>, {
    firstName: <span class="hljs-string">'Fred'</span>,
    lastName: <span class="hljs-string">'Flintstone'</span>
  })
  .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(response)</span> {</span>
    console.<span class="hljs-built_in">log</span>(response);
  })
  .<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(error)</span> {</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">error</span>);
  });</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">axios</span>({
  <span class="hljs-attribute">method</span>: <span class="hljs-string">'post'</span>,
  <span class="hljs-attribute">url</span>: <span class="hljs-string">'/user/12345'</span>,
  <span class="hljs-attribute">data</span>: {
    <span class="hljs-attribute">firstName</span>: <span class="hljs-string">'Fred'</span>,
    <span class="hljs-attribute">lastName</span>: <span class="hljs-string">'Flintstone'</span>
  }
});</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" mounted: function() {
     this.$nextTick(function () {
    //先定义一个全局_this
        var _this=this;
        axios.get('../../src/data/a.txt')
             .then(function(res){
                  _this.msg=res.data;
                  console.log(_this.msg)
             })
             .catch(function(err){
                  alert(err);
             })
     })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> mounted: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
     <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//先定义一个全局_this</span>
        <span class="hljs-keyword">var</span> _this=<span class="hljs-keyword">this</span>;
        axios.get(<span class="hljs-string">'../../src/data/a.txt'</span>)
             .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{
                  _this.msg=res.data;
                  <span class="hljs-built_in">console</span>.log(_this.msg)
             })
             .catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
                  alert(err);
             })
     })
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端框架Vue（7）—— vue.resource 、axios、ajax 异步通信

## 原文链接
[https://segmentfault.com/a/1190000011275438](https://segmentfault.com/a/1190000011275438)

