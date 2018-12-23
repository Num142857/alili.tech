---
title: '[译] 5个Vuex插件，给你的下个VueJS项目' 
date: 2018-12-24 2:30:07
hidden: true
slug: cjrb9fbmo5a
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVZhVD?w=1200&amp;h=642" src="https://static.alili.tech/img/bVZhVD?w=1200&amp;h=642" alt="vuex_plugins.jpg" title="vuex_plugins.jpg" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>原文：<a href="https://vuejsdevelopers.com/2017/09/11/vue-js-vuex-plugins/?jsdojo_id=medium_vpl" rel="nofollow noreferrer" target="_blank">5 Vuex Plugins For Your Next VueJS Project</a>  <br>作者：<a href="https://twitter.com/@anthonygore" rel="nofollow noreferrer" target="_blank">Anthony Gore</a></p></blockquote>
<p>使用 Vuex 来管理 Vue 的状态，有很多好的理由。其中之一就是，通过 Vuex 插件可以非常容易的扩展一些很酷的功能。Vuex 社区中的开发人员已经创建了大量的免费插件供你使用，有许多你能想象的功能，还有一些你可能没有想到的功能。</p>
<p>在本文中，将向你展示5个特性，你可以通过 Vuex 插件轻松地添加到下一个项目中。</p>
<ul>
<li>状态持久化</li>
<li>同步标签页、窗口</li>
<li>语言本地化</li>
<li>管理多个加载状态</li>
<li>缓存操作</li>
</ul>
<h1 id="articleHeader0">1. 状态持久化</h1>
<p><a href="https://github.com/robinvdvleuten/vuex-persistedstate" rel="nofollow noreferrer" target="_blank">vuex-persistedstate </a>使用浏览器的本地存储（ local storage ）对状态（ state ）进行持久化。这意味着刷新页面或关闭标签页都不会删除你的数据。</p>
<p>一个很好的例子就是购物车：如果用户不小心关闭了一个标签，他们可以重新打开并回到之前页面的状态。  </p>
<p><span class="img-wrap"><img data-src="/img/bVZhKv?w=400&amp;h=370" src="https://static.alili.tech/img/bVZhKv?w=400&amp;h=370" alt="vuex_plugins_01.gif" title="vuex_plugins_01.gif" style="cursor: pointer;"></span></p>
<h1 id="articleHeader1">2. 同步标签页、窗口</h1>
<p><a href="https://github.com/xanf/vuex-shared-mutations" rel="nofollow noreferrer" target="_blank">vuex-shared-mutations </a>可在不同的标签页之间同步状态。它通过 <code>mutation</code> 将状态储存到本地存储（local storage）来实现。选项卡、窗口中的内容更新时触发储存事件，重新调用 <code>mutation</code> ，从而保持状态同步。</p>
<p><span class="img-wrap"><img data-src="/img/bVZhMI?w=400&amp;h=370" src="https://static.alili.tech/img/bVZhMI?w=400&amp;h=370" alt="vuex_plugins_02.gif" title="vuex_plugins_02.gif" style="cursor: pointer;"></span></p>
<h1 id="articleHeader2">3. 语言本地化</h1>
<p><a href="https://github.com/dkfbasel/vuex-i18n" rel="nofollow noreferrer" target="_blank">vuex-i18n </a>允许你轻松地用多种语言存储内容。让你的应用切换语言时更容易。</p>
<p>一个很酷的功能是你可以存储带有标记的字符串，比如<code>"Hello {name}, this is your Vue.js app."</code>。所有的翻译版本都会在标记的地方使用相同的字符串。</p>
<p><span class="img-wrap"><img data-src="/img/bVZhPE?w=400&amp;h=370" src="https://static.alili.tech/img/bVZhPE?w=400&amp;h=370" alt="vuex_plugins_03.gif" title="vuex_plugins_03.gif" style="cursor: pointer;"></span></p>
<h1 id="articleHeader3">4. 管理多个加载状态</h1>
<p><a href="https://github.com/f/vuex-loading" rel="nofollow noreferrer" target="_blank">vuex-loading </a>有助于你管理应用中的多个加载状态。这个插件适用于状态变化频繁且复杂的实时应用程序。</p>
<p><span class="img-wrap"><img data-src="/img/bVZhQX?w=400&amp;h=370" src="https://static.alili.tech/img/bVZhQX?w=400&amp;h=370" alt="vuex_plugins_04.gif" title="vuex_plugins_04.gif" style="cursor: pointer;"></span></p>
<h1 id="articleHeader4">5. 缓存操作</h1>
<p><a href="https://github.com/superwf/vuex-cache" rel="nofollow noreferrer" target="_blank">vuex-cache </a>可以缓存 Vuex 的 <code>action</code>。例如，如果你从服务器检索数据，这个插件将在第一次调用该<code> action </code>时缓存结果，然后在之后的<code>dispatch</code>中，直接返回缓存的值。必要时清除缓存也很简单。</p>
<p><span class="img-wrap"><img data-src="/img/bVZhR6?w=400&amp;h=370" src="https://static.alili.tech/img/bVZhR6?w=400&amp;h=370" alt="vuex_plugins_05.gif" title="vuex_plugins_05.gif" style="cursor: pointer;"></span></p>
<p>欢迎在下面的评论中，写下你最喜欢的 Vuex 插件！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] 5个Vuex插件，给你的下个VueJS项目

## 原文链接
[https://segmentfault.com/a/1190000012184535](https://segmentfault.com/a/1190000012184535)

