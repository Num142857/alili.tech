---
title: 'Vue组件化时使用axios处理ajax请求的使用' 
date: 2019-01-03 2:30:10
hidden: true
slug: lvf4o9izl6
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">推荐方式</h3>
<h4>首先在 <code>main.js</code> 中引入 <code>axios</code>
</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入 axios
import axios from 'axios'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">// 引入 axios</span>
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span></code></pre>
<blockquote><p>这时候如果你想在其它的组件中使用<code>axios</code>进行ajax请求是或提示报错的，报错内容大致是<code>axios is undefined</code>。<br>我们通常的决绝方案是将<code>axios</code>改写为 <code>Vue</code> 的原型属性,如下</p></blockquote>
<h4>将<code>axios</code>写入<code>Vue</code>的原型链作为<code>Vue</code>的属性</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 设置axios请求的默认host
axios.defaults.baseURL = &quot;https://www.ifilm.ltd/api/&quot;
// 将axios绑定给vue成为一个属性
Vue.prototype.$http = axios" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 设置axios请求的默认host</span>
axios<span class="hljs-selector-class">.defaults</span><span class="hljs-selector-class">.baseURL</span> = <span class="hljs-string">"https://www.ifilm.ltd/api/"</span>
<span class="hljs-comment">// 将axios绑定给vue成为一个属性</span>
Vue<span class="hljs-selector-class">.prototype</span>.<span class="hljs-variable">$http</span> = axios</code></pre>
<h4>在其他组件中使用<code>axios</code>
</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$http.get('路由').then(response => {
        // todo something
      })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">this</span>.$http.<span class="hljs-keyword">get</span>(<span class="hljs-string">'路由'</span>).then(response =&gt; {
        <span class="hljs-comment">// todo something</span>
      })</code></pre>
<h4>此方式可以类比到Vue的其他库使用</h4>
<h3 id="articleHeader1">两种不推荐的使用示范</h3>
<h4>将<code>axios</code>全局化，作为全局变量</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入axios
import axios from 'axios'
// 将axios全局化
window.axios = axios;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 引入axios</span>
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
<span class="hljs-comment">// 将axios全局化</span>
<span class="hljs-built_in">window</span>.axios = axios;</code></pre>
<h4>另外一个不太优雅的方式就是在需要的每个组件中都引入对应的库</h4>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue组件化时使用axios处理ajax请求的使用

## 原文链接
[https://segmentfault.com/a/1190000010843251](https://segmentfault.com/a/1190000010843251)

