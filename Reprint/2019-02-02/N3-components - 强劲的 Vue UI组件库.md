---
title: 'N3-components - 强劲的 Vue UI组件库' 
date: 2019-02-02 2:30:11
hidden: true
slug: rnj4z8l02t
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">N3-components - 强大的Vue组件库。</h1>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007099392" src="https://static.alili.tech/img/remote/1460000007099392" alt="Shippable branch" title="Shippable branch" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/remote/1460000007085130" src="https://static.alili.tech/img/remote/1460000007085130" alt="Test Coverage" title="Test Coverage" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/remote/1460000007099393" src="https://static.alili.tech/img/remote/1460000007099393" alt="Gitter" title="Gitter" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/remote/1460000007085132" src="https://static.alili.tech/img/remote/1460000007085132" alt="Code Climate" title="Code Climate" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/remote/1460000007099394" src="https://static.alili.tech/img/remote/1460000007099394" alt="npm" title="npm" style="cursor: pointer; display: inline;"></span></p>
<p>N3组件库是基于Vue.js构建的，让前端工程师和全栈工程师能快速构建页面和应用。</p>
<p><a href="https://n3-components.github.io/N3-components/" rel="nofollow noreferrer" target="_blank">官方主页</a> | <a href="https://github.com/N3-components/N3-components" rel="nofollow noreferrer" target="_blank">English Introduction</a> | <a href="https://n3-components.github.io/N3-components/component.html" rel="nofollow noreferrer" target="_blank">文档</a></p>
<h2 id="articleHeader1">相关介绍</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007085134?w=692&amp;h=445" src="https://static.alili.tech/img/remote/1460000007085134?w=692&amp;h=445" alt="logo" title="logo" style="cursor: pointer; display: inline;"></span></p>
<p>N3组件库致力于构建良好的Vue开发者生态圈，提供良好的开发体验。下面是其中的一些特色：</p>
<ul>
<li><p>超过60个组件 <a href="https://github.com/N3-components/N3-components/tree/master/src" rel="nofollow noreferrer" target="_blank">组件列表</a></p></li>
<li><p>自定义样式</p></li>
<li><p>支持多种模块化范式（UMD）</p></li>
<li><p>使用ES6进行开发</p></li>
</ul>
<h2 id="articleHeader2">NPM</h2>
<p>链接：<a href="https://www.npmjs.com/package/N3-components" rel="nofollow noreferrer" target="_blank">https://www.npmjs.com/package/N3-components</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install N3-components" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install N3-components</code></pre>
<h2 id="articleHeader3">快速上手</h2>
<p>您可以把N3组件安装到全局的Vue上，示例代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import N3Components from 'N3-components'
N3Components.install(Vue)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> N3Components <span class="hljs-keyword">from</span> <span class="hljs-string">'N3-components'</span>
N3Components.install(Vue)</code></pre>
<p>也可以在需要的时候引入该组件，示例代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import N3Components from 'N3-components'
import {n3Alert} from N3Components" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> N3Components <span class="hljs-keyword">from</span> <span class="hljs-string">'N3-components'</span>
<span class="hljs-keyword">import</span> {n3Alert} <span class="hljs-keyword">from</span> N3Components</code></pre>
<h2 id="articleHeader4">依赖的项目</h2>
<ul>
<li><p>vue</p></li>
<li><p>vue-focus</p></li>
<li><p>velocity-animate</p></li>
</ul>
<h2 id="articleHeader5">讨论区</h2>
<ul>
<li><p><a href="https://github.com/N3-components/N3-components/issues/new" rel="nofollow noreferrer" target="_blank">提交ISSUE</a> : bug反馈，建议提交等</p></li>
<li><p>email: zhangking520@gmail.com</p></li>
<li><p>gitter: <a href="https://gitter.im/N3-components/chinese?utm_source=share-link&amp;utm_medium=link&amp;utm_campaign=share-link" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000007085131" src="https://static.alili.tech/img/remote/1460000007085131" alt="Gitter" title="Gitter" style="cursor: pointer; display: inline;"></span></a></p></li>
<li><p>QQ群: 556286036 <a href="http://shang.qq.com/wpa/qunwpa?idkey=ae2b542ef32e8595664c746572d9a48187167e269ef5b6c80d8ed326fce5efdd" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000004838443" src="https://static.alili.tech/img/remote/1460000004838443" alt="N3-components交流群" title="N3-components交流群" style="cursor: pointer; display: inline;"></span></a></p></li>
<li><p>QQ群二维码:<br><span class="img-wrap"><img data-src="/img/remote/1460000007085135?w=302&amp;h=302" src="https://static.alili.tech/img/remote/1460000007085135?w=302&amp;h=302" alt="qrcode" title="qrcode" style="cursor: pointer; display: inline;"></span></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
N3-components - 强劲的 Vue UI组件库

## 原文链接
[https://segmentfault.com/a/1190000007085126](https://segmentfault.com/a/1190000007085126)

