---
title: '关于写手机密码锁页面的css技巧' 
date: 2018-12-25 2:30:11
hidden: true
slug: f4dlxscaauf
categories: [reprint]
---

{{< raw >}}

                    
<p>昨天用html5写了一个手机密码锁界面，中途碰到一些小问题，解决了后总结了一些小方法来和大家一起分享，如果有不成熟的地方希望大家指出来，大家有更好的方法我也很乐意倾听哦~好啦，不说那么多啦，先附上一张页面截图，我们再来分析分析吧~</p>
<p><span class="img-wrap"><img data-src="/img/bVYG6b?w=311&amp;h=553" src="https://static.alili.tech/img/bVYG6b?w=311&amp;h=553" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这是一个很简单的手机密码锁界面，主要由3部分组成，我在html里先建了一个大盒子lock囊括了整个界面，把头部定义为lock_hd,中间的部分定义为lock_bd，底下的部分定义为lock_ft，这样就先大概地建立了一个框架。友情提示一下，大家最好由BEM的命名方式哦~</p>
<p>好啦，接下来就是我们的重点内容啦。<br>  先来看看lock的css样式吧</p>
<p><span class="img-wrap"><img data-src="/img/bVYG8P?w=726&amp;h=222" src="https://static.alili.tech/img/bVYG8P?w=726&amp;h=222" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这里值得一提的是我们的width定义的是10rem,这样写的好处是它能适配不同类型的手机的界面宽度，毕竟现在市面上手机类型太多，我们不可能为每一款手机都设置一个宽度。其次，我们为什么要定义overflow-x: hidden呢？这样可以使我们的页面充满整个手机页面，不会滚动。</p>
<hr>
<p>接下来看看中间部分，可以看到，我在中间部分的盒子里又定义了一个盒子，这个新盒子就是我们的数字键所在的地方啦，这样做会更利于我们后面关于给数字的定位。</p>
<p><span class="img-wrap"><img data-src="/img/bVYHcI?w=350&amp;h=272" src="https://static.alili.tech/img/bVYHcI?w=350&amp;h=272" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>中间部分的数字样式还是挺简单的，附图一张，咱们就算过了。</p>
<p><span class="img-wrap"><img data-src="/img/bVYHeU?w=323&amp;h=461" src="https://static.alili.tech/img/bVYHeU?w=323&amp;h=461" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>接下来本文最重要的部分来啦~</p>
<hr>
<ul><li><p>重点内容</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVYHfZ?w=376&amp;h=165" src="https://static.alili.tech/img/bVYHfZ?w=376&amp;h=165" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>lock_circle--last是最后的数字0，我们要把它和其他数字区分开来，而下面这句呢，是因为我把1~9的类名都定义为lock_circle__item，因为在上面我让每一个数字的margin-right都为1rem,但是如果这样的话最边上的3，6，9就会像这样：</p>
<p><span class="img-wrap"><img data-src="/img/bVYHi9?w=286&amp;h=424" src="https://static.alili.tech/img/bVYHi9?w=286&amp;h=424" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>当初这些数字的排列问题困扰了我好久，甚至生出了把每个数字都定义一个单独的盒子的想法，但这显然是不正确的。后来请教了同学才知道，我只要在下面加上这一句就好啦~<br>`<br>.lock_circle__item:nth-child(3n){</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="margin-right: 0;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">margin-right</span>: <span class="hljs-number">0</span>;</code></pre>
<p>}<br>`<br>  我们让排列为3的倍数的元素的margin-right为零，排列就能整齐啦~</p>
<p>至于lock_ft就只要定义两个盒子都浮动在左边，设置一下margin的值就能完成整个页面了。</p>
<p>感谢大家阅读我的文章，不知道这篇文章能不能对各位产生点帮助，但是我会继续努力哒，争取早日写出让大家点赞的文章^_^</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于写手机密码锁页面的css技巧

## 原文链接
[https://segmentfault.com/a/1190000012044142](https://segmentfault.com/a/1190000012044142)

