---
title: '从零开始搭建vue-ssr系列之三：服务器渲染的奥秘' 
date: 2019-01-14 2:30:07
hidden: true
slug: 00dfix924fysd
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>Vue全家桶都是必要的吗？</blockquote>
<p>当然不是，<del>只有Vuex是必须的</del>，实践发现，<code>vuex</code>也不是必须的，使用<code>vuex</code>可以很方便的管理前后端共享的数据。如果要不作用<code>vuex</code>，可以在<code>created</code>中使用如下方法来获取数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let context = this.$ssrContext ? this.$ssrContext.state : window['__INITIAL_STATE__']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code style="word-break: break-word; white-space: initial;">let context = this.<span class="hljs-variable">$ssrContext</span> ? this.<span class="hljs-variable">$ssrContext</span>.<span class="hljs-keyword">state</span> : window['__INITIAL_STATE__']</code></pre>
<p>注：一定要在<code>created</code>里面使用，如果在<code>mounted</code>里面使用，<code>Node</code>端是不认识<code>window</code>对象，从而报错。</p>
<blockquote>为什么必须要用到vuex？</blockquote>
<ul><li>你想啊，使用服务器渲染，数据必须得从服务器取，取了数据之后，怎么才能达到前后端共享数据？就得用Vuex!</li></ul>
<blockquote>即然数据在服务器端已经取到了，为什么还要共享到前端？</blockquote>
<ul><li>这就涉及到ssr渲染的奥秘了，按理说，服务端把数据取到之后，渲染成HTML返回到前端，这样前端就用不到这些数据了，取数据只为了渲染，这种情况只适用于纯静态的渲染，就是拿到10条数据，渲染成一个列表，这个列表上没有交互，没有click、hover等效果，但是一些有click事件，就像例子上面那样，点击每个item，都会弹出title，这些是需要js来做的，但是<strong>vue-<em>ssr不能绑定javascript事件</em></strong>，只能是HTML+CSS，也就是说服务器端使用vue-ssr渲染出来的返回到浏览器的也只能是HTML+CSS。再强调一次：<strong>vue-ssr渲染出来只是HTML+CSS的字符串，绑定事件需要在浏览器端来做</strong>，前端需要数据和已经渲染好的DOM做比对，从而添加上各种事件！</li></ul>
<blockquote>那事件怎么办？</blockquote>
<ul><li>这就回到了第一个问题，为什么前端也需要数据，既然服务器不能增加事件，那只能前端增加喽。vue-ssr有一个比较关键的地方就是，前后必须共用同一套vue文件，也就是说一个.vue文件，前端也要用，后端也要用，为什么要这样做，大家想过没有？答案：就是<strong>后端从vuex里面取到数据</strong>之后，对&lt;template&gt;里面的HTML使用vue的语法进渲染，最终渲染成真正的HTML，对&lt;style&gt;里面的内容，使用loader，抽取成css，所以服务端渲染的成果是HTML+CSS；前端也是从vuex里面取到数据，前端的渲染主要做2件事，1.拿到数据，使用<code>virtual-dom</code>进行预渲染，然后和服务端渲染出来的进行比对，比对两边渲染的内容是不是一致的；2.对DOM元素的事件进行绑定，也就是回答的问题，事件在这块进行的处理。</li></ul>
<blockquote>一点小建议: 多多理解原理, 多多实践</blockquote>
<ul><li>我想只有理解了原理性的东西，再看代码，再看流程，才能理解是为什么要这么搞，因为这些东西官方文档上面说的也不是很清楚，网上的例子也不少，但是很少提这块，刚开始我拿到各种例子之后，也很蒙，这写的都是啥！啥！啥！尤其是官方给的例子，根本就没有头绪。现在理清了，分享给大家，希望有帮忙，下一篇我们来看下代码实现。</li></ul>
<blockquote>Vue-SSR系列目录</blockquote>
<p><a href="https://segmentfault.com/a/1190000009352740">从零开始搭建vue-ssr系列之一：写在前面的话</a></p>
<p><a href="https://segmentfault.com/a/1190000009372772" target="_blank">从零开始搭建vue-ssr系列之二：纯client端渲染以及webpack2+vue2注意事项</a></p>
<p><a href="https://segmentfault.com/a/1190000009373793">从零开始搭建vue-ssr系列之三：服务器渲染的奥秘</a></p>
<p><a href="https://segmentfault.com/a/1190000009452832" target="_blank">从零开始搭建vue-ssr系列之四：Vuex详解</a></p>
<p><a href="https://segmentfault.com/a/1190000009510509">从零开始搭建vue-ssr系列之五：开始第一个简单的server-render</a></p>
<p><a href="https://segmentfault.com/a/1190000009554693" target="_blank">从零开始搭建vue-ssr系列之六：一个完整的项目</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零开始搭建vue-ssr系列之三：服务器渲染的奥秘

## 原文链接
[https://segmentfault.com/a/1190000009373793](https://segmentfault.com/a/1190000009373793)

