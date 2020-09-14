---
title: '在实际项目中如何用Vuex？' 
date: 2019-01-13 2:30:11
hidden: true
slug: hsgc9yn9d1i
categories: [reprint]
---

{{< raw >}}

                    
<p>Github: <a href="https://github.com/shuiRong/VueCnodeJS/tree/master/vuexVersion" rel="nofollow noreferrer" target="_blank">https://github.com/shuiRong/V...</a></p>
<h3 id="articleHeader0">前言</h3>
<hr>
<p>看完<a href="https://vuex.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">Vuex</a>文档之后，对于如何把它应用到<code>实际项目</code>中还是有点茫然。</p>
<p>找了一圈Gayhub，有Vuex的项目不是太大，就是太小，或者就是对Vuex的一些重要概念没有给出实际用例。</p>
<p>贼气。干脆，我把之前的项目用Vuex改造下得了。所以我就把<a href="https://github.com/shuiRong/VueCnodeJS" rel="nofollow noreferrer" target="_blank">VueCnodeJS</a>给改造了下。</p>
<p>因为这个VueCnodeJS这个项目呢，是初级Vue项目，逻辑不复杂，但也涉及了5个组件，而且有从服务器获取数据的步骤，正好为Vuex的异步<code>actions</code>提供了很好的场景。</p>
<p><strong>所以，如果你看完了Vuex文档，但是对在实际项目中怎么用它不太懂的话，这个项目就是为你准备的！</strong></p>
<p><strong>涉及了Vuex的 State，Getters，Mutations，Actions</strong></p>
<p>PS: 其实没必要把组件里的所有数据都放到<code>state.js</code>里。但是为了练习Vuex嘛，就全从组件里分离出来了。(什么样的数据才应该放到state.js中？看文档 : )</p>
<h4>本地运行</h4>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/shuiRong/VueCnodeJS.git 
cd VueCnodeJS/vuexVersion
npm install
npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">git <span class="hljs-built_in">clone</span> https://github.com/shuiRong/VueCnodeJS.git 
<span class="hljs-built_in">cd</span> VueCnodeJS/vuexVersion
npm install
npm run dev</code></pre>
<p>(默认用的是8080端口)</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在实际项目中如何用Vuex？

## 原文链接
[https://segmentfault.com/a/1190000009546104](https://segmentfault.com/a/1190000009546104)

