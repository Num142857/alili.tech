---
title: '如何在Chrome中完全不使用鼠标（Vim）' 
date: 2019-01-03 2:30:10
hidden: true
slug: sw0ybf21jhs
categories: [reprint]
---

{{< raw >}}

                    
<p>Surfingkeys是Chrome下的一个仿Vim式快捷键的插件，之前在Chrome下一直使用的是Vimium，最近使用国人开发的Surfingkeys后发现功能和用户体验上都要比Vimium强大很多倍，下面我就分享一下自己使用的心得，即使是之前没有接触过Vim的朋友也可以考虑上手一下这款插件，用熟练之后几乎可以完全放弃鼠标和触摸板了。</p>
<p>同时对于大部分人想学习Vim的朋友而言，可能在初期因为陡峭的学习曲线所以很快就放弃了，我认为也可以用Surfingkeys作为一个跳板，在Chrome下面通过大量的实践来将常见的快捷键用熟。</p>
<blockquote><p>最近正在自己的<a href="https://github.com/ziwenxie" rel="nofollow noreferrer" target="_blank">GitHub</a>上面整理一些常用开发工具的使用心得，本文就是其中的一篇，欢迎关注 :-)</p></blockquote>
<h2 id="articleHeader0">基础快捷键</h2>
<p>Surfingkeys下载地址 -&gt; <a href="https://chrome.google.com/webstore/detail/surfingkeys/gfbliohnnapiefjpjlpjnehglfpaknnc" rel="nofollow noreferrer" target="_blank">传送门</a> (要翻墙）</p>
<p>第一次接触Surfingkeys的朋友，唯一需要记住的快捷键就是<code>?</code>，使用<code>?</code>可以调所有快捷键的说明，对于这些众多的快捷键没有必要去死记硬背，有需求但是忘记快捷键的时候再利用<code>?</code>翻阅：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010843414" src="https://static.alili.tech/img/remote/1460000010843414" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>首先我们来看一下四个日常中使用最频繁的快捷键，记住了这四个快捷键鼠标滚轮基本可以弃用了：</p>
<ol>
<li>
<code>kj</code>分别代表向上移动和向下移动，相当于方向键。</li>
<li>
<code>ed</code>分别代表向上翻页和向下翻半页。</li>
</ol>
<p>对于网页中的link或者button，以前我们都是通过鼠标左键去点击，通过使用Surfingkeys，我们只需要直接使用输入<code>f</code>就可以了，就会出现如下的页面：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010843415" src="https://static.alili.tech/img/remote/1460000010843415" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>然后输入link或者button对应的字母组合就可以跳转，默认在同一个tab中会打开新的网页，如果我们想在一个新的tab打开网页，可以改成使用<code>af</code>，或者通过<code>gf</code>在后台打开。</p>
<p>敲击<code>t</code>可以打开一个全局的搜索框，可以搜索bookmark和history，如果没有对应的匹配项，Surfingkeys则会调用google帮我们在网上搜索。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010843416" src="https://static.alili.tech/img/remote/1460000010843416" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>另外两个使用非常频繁的快捷键是大写的<code>S</code>和<code>D</code>，相当于Chrome左上角的history之间的切换。对于第一次接触Vim的朋友而言，<strong>下面的内容可以忽视了</strong>，在开始阶段只需要通过反复使用将上面十个快捷键用熟练就行了，然后可以结合鼠标慢慢过渡。</p>
<h2 id="articleHeader1">标签页之间的切换</h2>
<p>通过使用大写的<code>E</code>和<code>R</code>我们可以移动至左边或者右边的TAB，但是这样的话如果我们打开了多个标签页的话，这样切换效率是极低的，我们可以通过使用大写的<code>T</code>就可以调出和<code>f</code>相似的页面，输入标签页对应的字母我们就可以快速跳转到指定的标签页。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010843417" src="https://static.alili.tech/img/remote/1460000010843417" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>如果我们想关闭当前标签页，敲击<code>x</code>即可（等价于Chrome默认的Ctrl-W)，如果我们后悔刚刚关闭的标签页，使用大写的<code>X</code>即可恢复上一个关闭的标签页（等价于Chrome默认的Ctrl-Shift-T)。</p>
<p>关于更多的标签页之间的切换操作，比如使用<code>&lt;&lt;</code>或者<code>&gt;&gt;</code>可以将当前标签页左移或者右移，大家都可以使用<code>?</code>查看对应的文档说明，大部分时候上面提及的五个操作都可以满足我们的需求。</p>
<h2 id="articleHeader2">查找</h2>
<p>通过使用<code>/</code>来在当dee前网页中查找搜索指定的内容，如果出现了多个匹配项的话，可以通过<code>n</code>定位到下一项，<code>N</code>定位到上一项。这比Chrome默认的Ctrl-F要舒服很多。</p>
<p>同时除了我们上面提及的使用<code>t</code>来全局搜索之外，也可以使用敲击<code>b</code>只在书签中进行搜索，这里搜索并只是简单的搜索，大家使用之后就明白了，用户体验非常好。</p>
<p>另外一个值得提及的功能就是有时候我们会在其他应用中复制了一些文字或者url然后回到chrome中进行粘贴，利用Sufingkeys我们可以在复制之后直接敲击<code>sg</code>直接谷歌搜索省去用鼠标paste then search的步骤，如果复制的是url的话可以敲击<code>cc</code>。</p>
<h2 id="articleHeader3">截屏</h2>
<p>利用Sufingkeys提供的几个快捷键，我们可以非常快速的截屏，使用<code>yg</code>可以捕捉当前屏幕，而使用<code>yG</code>则可以捕获整个屏幕（包括滚动的部分）。</p>
<h2 id="articleHeader4">markdown预览</h2>
<p>利用Sufingkeys我们可以预览剪切板中的markdown文字，只需要在复制完markdown文字之后在chrome中敲击<code>sm</code>即可。跳转到预览页面时候，不仅仅可以预览markdown的渲染效果，而且也可以像使用vim编辑器一样对文本进行实时编辑。</p>
<h2 id="articleHeader5">编辑模式</h2>
<p>使用<code>I</code>进入插入模式，我们可以像使用Vim一样编辑当前网页的input或者textarea标签中的内容：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010843418" src="https://static.alili.tech/img/remote/1460000010843418" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>敲击<code>su</code>可以弹出来一个url编辑栏，可以编辑当前的url：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010843419" src="https://static.alili.tech/img/remote/1460000010843419" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader6">选择模式</h2>
<p>熟悉Vim的朋友都知道，和Emacs不同Vim的哲学是通过集成若干个模式来提供众多的快捷模式的，比如insert mode, command mode, visual mode, normal mode。如果不理解这些原理也没有关系，只需要记住这些快捷键就行了。</p>
<p>比如在一个网页中我想选取一段文字，完全没有必要使用鼠标去选取。首先输入<code>v</code>进入如下的模式（即visual mode)定位到大致要选取的段落：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010843420" src="https://static.alili.tech/img/remote/1460000010843420" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>大致定位之后可以继续使用<code>kjhl</code>分别对光标进行上下左右的移动，或者通过<code>web</code>在word之间移动，精准的定位之后再次敲击<code>v</code>然后通过<code>kjhl</code>移动光标来选则文字即可就会出现下图这样的效果：</p>
<p>p.s: <code>kjhl</code>分别代表上下左右移动光标。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010843421" src="https://static.alili.tech/img/remote/1460000010843421" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">未完待续</h2>
<p>文章写的比较急上面只是描述了一些非常基础的操作，比如书签/代理/pdf以及如何自定义去配置还没有提及，晚点再来补充 :-D</p>
<blockquote><p>本文为作者原创，如需转载请于开头明显处声明<a href="https://www.ziwenxie.site/2017/08/18/chrome-surfingkeys/" rel="nofollow noreferrer" target="_blank">个人博客地址</a> :-)</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在Chrome中完全不使用鼠标（Vim）

## 原文链接
[https://segmentfault.com/a/1190000010843409](https://segmentfault.com/a/1190000010843409)

