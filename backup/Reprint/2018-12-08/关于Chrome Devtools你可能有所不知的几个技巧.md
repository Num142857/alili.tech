---
title: '关于Chrome Devtools你可能有所不知的几个技巧' 
date: 2018-12-08 2:30:30
hidden: true
slug: 3l7pvieaod
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><a href="https://medium.freecodecamp.org/cool-chrome-devtools-tips-and-tricks-you-wish-you-knew-already-f54f65df88d2" rel="nofollow noreferrer" target="_blank">Cool Chrome DevTools tips and tricks you wish you knew already</a></blockquote>
<p><span class="img-wrap"><img data-src="/img/bV66kg?w=2558&amp;h=822" src="https://static.alili.tech/img/bV66kg?w=2558&amp;h=822" alt="devtools.png" title="devtools.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">在Elements面板中拖拽元素</h2>
<p>在<code>Elements面板</code>移动HTML元素，和UE沟通时快速预览效果。之前我只知道可以删除元素?。</p>
<p><span class="img-wrap"><img data-src="/img/bV66pG?w=1265&amp;h=599" src="https://static.alili.tech/img/bV66pG?w=1265&amp;h=599" alt="drag-drop" title="drag-drop" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">在Console面板中获取当前选中的元素</h2>
<p>首先在<code>Elements面板</code>选中一个元素，然后在<code>Console面板</code>中输入<code>$0</code>回车。如果你的前端项目有使用jQuery，还可以使用<code>$($0)</code>进一步使用jQuery的API函数。<br><span class="img-wrap"><img data-src="/img/bV66qv?w=1265&amp;h=599" src="https://static.alili.tech/img/bV66qv?w=1265&amp;h=599" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">在Console面板中操作上次表达式的结果</h2>
<p>在Console的执行上下文中，使用<code>$_</code>获取上次表达式结果，并可以做进一步操作使用。</p>
<p><span class="img-wrap"><img data-src="/img/bV66nF?w=742&amp;h=420" src="https://static.alili.tech/img/bV66nF?w=742&amp;h=420" alt="$_.gif" title="$_.gif" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">给元素添加样式、改变元素的状态?</h2>
<p>在<code>Elements面板</code>面板中还有3个特别有用的按钮。?</p>
<p><code>+</code>号按钮创建新的样式组合空间，同时我们也可以修改选择器。翻译的不好大家看图体会。<br><span class="img-wrap"><img data-src="/img/bV66m0?w=920&amp;h=764" src="https://static.alili.tech/img/bV66m0?w=920&amp;h=764" alt="plus-btn.gif" title="plus-btn.gif" style="cursor: pointer;"></span></p>
<p><code>:hov</code>使你可以手动更改元素状态，<code>hover</code>、<code>active</code>、<code>focus</code>等等</p>
<p><span class="img-wrap"><img data-src="/img/bV66lH?w=624&amp;h=311" src="https://static.alili.tech/img/bV66lH?w=624&amp;h=311" alt="hov-btn.png" title="hov-btn.png" style="cursor: pointer; display: inline;"></span></p>
<p><code>:cls</code>快捷的给选中节点添加<code>class</code></p>
<p><span class="img-wrap"><img data-src="/img/bV66lQ?w=1277&amp;h=325" src="https://static.alili.tech/img/bV66lQ?w=1277&amp;h=325" alt="cls-btn.gif" title="cls-btn.gif" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">截屏</h2>
<p>整个浏览器截屏&amp;某个元素截屏<br>在<code>Elements面板</code>中选择一个元素然后输入快捷键<code>cmd-shift-p (or ctrl-shift-p in Windows)</code>输入shot然后有三个选项。如下图：</p>
<p><span class="img-wrap"><img data-src="/img/bV66lV?w=1740&amp;h=432" src="https://static.alili.tech/img/bV66lV?w=1740&amp;h=432" alt="screenshot.png" title="screenshot.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">使用CSS选择器进行元素选择</h2>
<p>打开<code>Elements面板</code>，输入快捷键<code>cmd-f (ctrl-f in Windows)</code>，调出搜索框。</p>
<p><span class="img-wrap"><img data-src="/img/bV66l0?w=955&amp;h=535" src="https://static.alili.tech/img/bV66l0?w=955&amp;h=535" alt="findDom.gif" title="findDom.gif" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">XHR/Fetch调试</h2>
<p>不推荐用，更喜欢在代码中添加<code>debugger;短语</code>。 需在<code>Source面板</code>中进行操作,如下图：</p>
<p><span class="img-wrap"><img data-src="/img/bV66mr?w=781&amp;h=369" src="https://static.alili.tech/img/bV66mr?w=781&amp;h=369" alt="xhr.png" title="xhr.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">对元素节点打断点</h2>
<p>选中元素节点、右键、<code>Break-on</code>下有三个选项，根据需求进行选择，分别为<code>属性变更</code>、<code>子元素更改</code>、<code>元素移除</code>时触发断点。</p>
<p><span class="img-wrap"><img data-src="/img/bV66mO?w=742&amp;h=409" src="https://static.alili.tech/img/bV66mO?w=742&amp;h=409" alt="nodemodiefiy.png" title="nodemodiefiy.png" style="cursor: pointer; display: inline;"></span></p>
<p>大家有啥好用的技巧欢迎补充?</p>
<blockquote>【开发环境推荐】<a href="https://studio.coding.net/intro" rel="nofollow noreferrer" target="_blank">Cloud Studio</a> 是基于浏览器的集成式开发环境，支持绝大部分编程语言，包括 HTML5、PHP、Python、Java、Ruby、C/C++、.NET 小程序等等，无需下载安装程序，一键切换开发环境。 Cloud Studio提供了完整的 Linux 环境，并且支持自定义域名指向，动态计算资源调整，可以完成各种应用的开发编译与部署。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于Chrome Devtools你可能有所不知的几个技巧

## 原文链接
[https://segmentfault.com/a/1190000014047009](https://segmentfault.com/a/1190000014047009)

