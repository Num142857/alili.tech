---
title: '深入探究iOS下fixed定位导致的问题' 
date: 2019-01-05 2:30:11
hidden: true
slug: ux1b3sjrd3l
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">讨论背景</h2>
<p>众所周知，fixed元素在IOS下的表现是糟糕的，fixed元素在滚动页面中使用会出现各种奇怪的问题，在微信浏览器中使用就更甚（如：页面滚动，fixed元素与页面相互分离；页面滚动，fixed元素消失等）。这些表现过于离奇，显得没有逻辑，一时间很难找到对应的解决方案。<br>所以笔者决定从一个简单列表页出发，把遇到的各种奇怪问题都罗列出来，并探究其出现的原因。以便在开发中规避这些问题。</p>
<p>假定我们的需求是做一个列表页，列表页的顶部放置一些「其他」信息，底部放置一个「创建」按钮，中间显示「项目」列表内容。<br>设计稿大概是这样。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010510296" src="https://static.alili.tech/img/remote/1460000010510296" alt="设计稿" title="设计稿" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">实现方案</h2>
<p>根据需求，我们分别制作了三种解决方案。分别是</p>
<ul>
<li>利用fixed定位，将「按钮」放在滚动区「项目列表」外面，<a href="http://runjs.cn/code/twkmqhuy" rel="nofollow noreferrer" target="_blank">解决方案示例1</a>。</li>
<li>利用fixed定位，将「按钮」放在滚动区「项目列表」里面，<a href="http://runjs.cn/code/o40onm6i" rel="nofollow noreferrer" target="_blank">解决方案示例2</a>。</li>
<li>利用absolute定位，将「按钮」放在滚动区「项目列表」里面，并用「项目列表」去填充它所占的内容，<a href="http://runjs.cn/code/5qq6rfj8" rel="nofollow noreferrer" target="_blank">解决方案示例3</a>。</li>
</ul>
<p>分别在PC和IOS浏览器中运行这几个demo，我们发现，这些demo在PC中的表现都是符合设计需求的。但在IOS浏览器中运行，就会各种出现各种的问题，分别对应这几个现象。</p>
<ul>
<li>解决方案示例1：从「其他」内容区域开始触碰屏幕，进行页面滚动，「按钮」'脱离'页面内容区域。<br><span class="img-wrap"><img data-src="/img/remote/1460000010510297" src="https://static.alili.tech/img/remote/1460000010510297" alt="问题1" title="问题1" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/remote/1460000010510298" src="https://static.alili.tech/img/remote/1460000010510298" alt="对应二维码" title="对应二维码" style="cursor: pointer;"></span>
</li>
<li>解决方案示例2：从「其他」内容区域开始触碰屏幕，进行页面滚动，「按钮」消失了。<br><span class="img-wrap"><img data-src="/img/remote/1460000010510299" src="https://static.alili.tech/img/remote/1460000010510299" alt="问题2" title="问题2" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/remote/1460000010510300" src="https://static.alili.tech/img/remote/1460000010510300" alt="对应二维码" title="对应二维码" style="cursor: pointer;"></span>
</li>
<li>解决方案示例3：「其他」区域直接消失不见了。<br><span class="img-wrap"><img data-src="/img/remote/1460000010510299" src="https://static.alili.tech/img/remote/1460000010510299" alt="问题3" title="问题3" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/remote/1460000010510300" src="https://static.alili.tech/img/remote/1460000010510300" alt="对应二维码" title="对应二维码" style="cursor: pointer;"></span>
</li>
</ul>
<p>要解释这几个现象，我们需要从颜色填充说起。</p>
<h2 id="articleHeader2">滚动填充的颜色</h2>
<ul>
<li>
<p><a href="http://runjs.cn/code/vypofr3s" rel="nofollow noreferrer" target="_blank">颜色填充示例1</a>。</p>
<ul>
<li>重点代码：在这个示例里面，我们不对「项目列表」的高度进行限制，直接让内容在body中进行滚动。然后将body的背景颜色设置为橘红色。</li>
<li>操作：进入页面后直接向上拉动页面，拉动到不可拖动为止。</li>
<li>现象：我们发现「项目列表」的绿色区域下面，显示了body的背景颜色橘红色。</li>
<li>说明：填充的颜色是可以定制的。</li>
<li>疑问：这个颜色填充的区域会不会是body的延伸呢？<br><span class="img-wrap"><img data-src="/img/remote/1460000010510301" src="https://static.alili.tech/img/remote/1460000010510301" alt="颜色填充1" title="颜色填充1" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/remote/1460000010510302" src="https://static.alili.tech/img/remote/1460000010510302" alt="对应二维码" title="对应二维码" style="cursor: pointer; display: inline;"></span>
</li>
</ul>
</li>
<li>
<p><a href="http://runjs.cn/code/6r67awlf" rel="nofollow noreferrer" target="_blank">颜色填充示例2</a>。</p>
<ul>
<li>重点代码：去除了Body的背景颜色，改成body的背景图片并进行平铺。</li>
<li>操作：同上一个示例。</li>
<li>现象：我们发现「项目列表」的绿色区域下面，填充的依然body的背景颜色，而不是body的背景图片。</li>
<li>说明：填充的部分并不属于Body标签本身。</li>
<li>疑问：那如果我们将body的背景颜色去掉，而在html加上呢？<br><span class="img-wrap"><img data-src="/img/remote/1460000010510303" src="https://static.alili.tech/img/remote/1460000010510303" alt="颜色填充2" title="颜色填充2" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/remote/1460000010510304" src="https://static.alili.tech/img/remote/1460000010510304" alt="对应二维码" title="对应二维码" style="cursor: pointer;"></span>
</li>
</ul>
</li>
<li>
<p><a href="http://runjs.cn/code/npsv0ehg" rel="nofollow noreferrer" target="_blank">颜色填充示例3</a>。</p>
<ul>
<li>重点代码：将body的背景颜色去掉。</li>
<li>操作：同上一个示例。</li>
<li>现象：这次填充的颜色是html的背景颜色。</li>
<li>说明：这再次论证了填充的部分并不是固定某元素的内容，不是某个元素的延伸。而且说明系统找颜色是从滚动区域逐级往上找的，直到找到为止。</li>
<li>疑问：如果body和html的背景颜色都去掉，又会显示什么颜色呢？<br><span class="img-wrap"><img data-src="/img/remote/1460000010510305" src="https://static.alili.tech/img/remote/1460000010510305" alt="颜色填充3" title="颜色填充3" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/remote/1460000010510306" src="https://static.alili.tech/img/remote/1460000010510306" alt="对应二维码" title="对应二维码" style="cursor: pointer; display: inline;"></span>
</li>
</ul>
</li>
<li>
<p><a href="http://runjs.cn/code/yr3inanr" rel="nofollow noreferrer" target="_blank">颜色填充示例4</a>。</p>
<ul>
<li>重点代码：body和html的背景颜色去掉。</li>
<li>操作：同上一个示例。</li>
<li>现象：可以看到填充的是白色。</li>
<li>说明：默认的填充颜色是白色。<br><span class="img-wrap"><img data-src="/img/remote/1460000010510307" src="https://static.alili.tech/img/remote/1460000010510307" alt="颜色填充4" title="颜色填充4" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/remote/1460000010510308" src="https://static.alili.tech/img/remote/1460000010510308" alt="对应二维码" title="对应二维码" style="cursor: pointer; display: inline;"></span>
</li>
</ul>
</li>
<li>
<p>我们再回到<a href="http://runjs.cn/code/vypofr3s" rel="nofollow noreferrer" target="_blank">颜色填充示例1</a>。</p>
<ul>
<li>重点代码：与示例1相同</li>
<li>操作：这次我们在微信中打开，并改变操作方式，先上拉显示橘红色填充内容，再下拉显示微信的黑边(即显示顶部"此页面由XXX提供"文案)。再重新上拉，到不可拖动为止。</li>
<li>现象：原本下拉填充的橘红色变成了黑色。而且无论再怎么操作，都不会再重新显示回橘红色。</li>
<li>说明：微信内置浏览器修改了默认的颜色填充。<br><span class="img-wrap"><img data-src="/img/remote/1460000010510309" src="https://static.alili.tech/img/remote/1460000010510309" alt="颜色填充5" title="颜色填充5" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/remote/1460000010510302" src="https://static.alili.tech/img/remote/1460000010510302" alt="对应二维码" title="对应二维码" style="cursor: pointer;"></span>
</li>
</ul>
</li>
</ul>
<h5>小结</h5>
<ul>
<li>滚动填充的颜色是可定制的。</li>
<li>滚动填充的内容并不是标签的延伸，只会填充纯颜色。</li>
<li>滚动填充的颜色是滚动区域逐级往上找background-color确定的。</li>
<li>滚动填充的颜色默认值为白色。</li>
<li>微信会修改滚动填充的颜色值。</li>
</ul>
<h2 id="articleHeader3">IOS滚动回弹机制</h2>
<p>我们知道IOS是有滚动回弹机制的（即进行滚动时，滚动到最顶部或者最底部显示的一个回弹动画。我们上面讲的滚动颜色填充就是这个机制的具体实现）前面<a href="http://runjs.cn/code/twkmqhuy" rel="nofollow noreferrer" target="_blank">解决方案示例1</a>中遇到的问题（「按钮」'脱离'页面内容区域），就是由于这个机制引起的。<br>现在我们先来探究一下，这个滚动回弹机制具体的运行过程是怎么样的。以下操作均在解决方案示例1下进行。</p>
<p>重点操作如下过程：</p>
<ul>
<li>先将示例代码在IOS内置浏览器safari中打开。</li>
<li>
<p>用双指捏起整个页面（即类似于图片的缩小操作）。</p>
<ul>
<li>现象：我们发现，在页面是可以被缩小的。页面外部部分是纯颜色。</li>
<li>说明：有一个容器包裹着我们的页面。这个容器通常用于窗口缩放的时候，填充颜色。<br><span class="img-wrap"><img data-src="/img/remote/1460000010510310" src="https://static.alili.tech/img/remote/1460000010510310" alt="滚动回弹1" title="滚动回弹1" style="cursor: pointer; display: inline;"></span>
</li>
</ul>
</li>
<li>
<p>双指重复缓慢地捏起，放松整个页面。观察页面变化。</p>
<ul>
<li>现象：当刚开始缩小页面时，外部容器的颜色与滚动填充索引到的颜色（粉红色）相同。</li>
<li>现象：当逐渐缩小页面时，外部容器的颜色将从索引到的颜色渐变到白色(这个颜色和我们上面探讨到的默认填充颜色相同)。<br><span class="img-wrap"><img data-src="/img/remote/1460000010510311" src="https://static.alili.tech/img/remote/1460000010510311" alt="滚动回弹2" title="滚动回弹2" style="cursor: pointer; display: inline;"></span>
</li>
</ul>
</li>
<li>先将示例代码在微信内置浏览器中打开，重复上面操作。</li>
<li>
<p>用双指捏起整个页面（即类似于图片的缩小操作）。</p>
<ul>
<li>现象：外部容器的颜色变成了黑色，而且容器顶部出现了「此页面由 XXX 提供」文案。</li>
<li>说明：在微信下，为了显示「此页面由 XXX 提供」的提示语，微信自己重写了这个机制中的颜色，设置为黑色。<br><span class="img-wrap"><img data-src="/img/remote/1460000010510312" src="https://static.alili.tech/img/remote/1460000010510312" alt="滚动回弹3" title="滚动回弹3" style="cursor: pointer;"></span>
</li>
</ul>
</li>
<li>
<p>双指重复缓慢地捏起，放松整个页面。观察页面变化。</p>
<ul>
<li>现象：外部容器的颜色在黑色和粉红色之间闪动。</li>
<li>现象：越是放松页面，闪动越频繁。</li>
<li>说明：微信重设颜色的机制和原生滚动回弹中缩小页面渐变颜色的机制相冲突。</li>
<li>说明：无论是缩小页面还是恢复页面大小，微信都尝试将容器背景颜色设置为黑色。<br><span class="img-wrap"><img data-src="/img/remote/1460000010510313" src="https://static.alili.tech/img/remote/1460000010510313" alt="滚动回弹4" title="滚动回弹4" style="cursor: pointer;"></span>
</li>
</ul>
</li>
<li>
<p>打开页面，先滚动到底部，显示了粉红色，再滚动到顶部微信提示文案并显示黑色，再滚动到底部显示微信修改后的黑色，再缩小页面，在滚动到底部。</p>
<ul>
<li>现象：底部显示颜色的是粉红色。</li>
<li>说明：原生渐变颜色终止会覆盖微信重设颜色的机制。<br><span class="img-wrap"><img data-src="/img/remote/1460000010510314" src="https://static.alili.tech/img/remote/1460000010510314" alt="滚动回弹5" title="滚动回弹5" style="cursor: pointer;"></span>
</li>
</ul>
</li>
<li>
<p>在上一个操作的前提下，重新滚动到顶部，显示微信的提示文案，在滚动回底部。（整个过程不进行缩放）</p>
<ul>
<li>现象：底部显示的颜色重新被设置回黑色。</li>
<li>说明：只要滚动到顶部，为了显示微信顶部的提示文案部分，都会触发微信的颜色修改机制。</li>
<li>说明：由于不进行页面缩放，原生的渐变机制不会被触发，原生部分不会进行颜色重置。<br><span class="img-wrap"><img data-src="/img/remote/1460000010510315" src="https://static.alili.tech/img/remote/1460000010510315" alt="滚动回弹6" title="滚动回弹6" style="cursor: pointer;"></span>
</li>
</ul>
</li>
</ul>
<h5>这一系列的操作解释了这几个问题：</h5>
<ul>
<li>为什么在微信中，先往上滚再往下滚动页面，颜色的填充会变成了黑色，而不是body的背景色。因为微信对外部容器的背景色进行了重载。</li>
<li>为什么<a href="http://runjs.cn/code/twkmqhuy" rel="nofollow noreferrer" target="_blank">解决方案示例1</a>中,「按钮」看起来'脱离'了页面。<br>因为微信对外部容器的背景色设置成了黑色，所以滚动到底部进行回弹的时候，页面内容和按钮之间的区域（即颜色填充区域）变成了黑色。而黑色给让一种"空"的感觉，所以感觉到「按钮」脱离的页面内容的错觉。</li>
<li>在safari中并不会改成黑色，即填充的颜色和Body的背景颜色一致。所以不会有黑色，不会产生微信上。「按钮」脱离的页面内容的错觉。</li>
</ul>
<h2 id="articleHeader4">fixed定位基准值问题</h2>
<p>在刚才的示例操作中，不知道大家有没有发现一个奇怪的问题。<br>在页面缩放过程中，fixed元素与其他元素是在不同的显示层进行渲染了？</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010510316" src="https://static.alili.tech/img/remote/1460000010510316" alt="fixed问题1" title="fixed问题1" style="cursor: pointer; display: inline;"></span></p>
<p>重新执行前面的操作过程。我们发现：</p>
<ul>
<li>fixed元素的定位并不是基于手机屏幕，因为缩放的过程中，「按钮」随着缩放进行了上移。</li>
<li>fixed元素的定位也不是基于body元素的，因为从回弹机制来说，「按钮」早已经脱离了body区域(红色框标记的颜色深粉红色块就是body的背景色)。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010510317" src="https://static.alili.tech/img/remote/1460000010510317" alt="fixed问题2" title="fixed问题2" style="cursor: pointer; display: inline;"></span></p>
<p>fixed元素的基准值，其实是介于二者之间的一个显示窗口（类似于viewPort）。<br>这个显示窗口在不缩放的情况下，等于浏览器的窗口大小。<br>在缩放的情况下，显示窗口大概是这样子。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010510318" src="https://static.alili.tech/img/remote/1460000010510318" alt="fixed问题3" title="fixed问题3" style="cursor: pointer; display: inline;"></span></p>
<p>body内容超出了显示窗口就形成了回弹部分。<br>所以其实如果我们往页面的左右部分滑动，也是有回弹效果存在的。只是这个手势操作被IOS写为页面「前进」，「后退」这两个功能罢了。<br>如果我们将html的width设置为110%，小心滑动，就能重现左右的回弹效果。<a href="http://runjs.cn/code/tz3u5ldg" rel="nofollow noreferrer" target="_blank">左右回弹示例</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010510319" src="https://static.alili.tech/img/remote/1460000010510319" alt="左右回弹" title="左右回弹" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/remote/1460000010510320" src="https://static.alili.tech/img/remote/1460000010510320" alt="对应二维码" title="对应二维码" style="cursor: pointer;"></span></p>
<p>所以在页面缩放过程中，「fixed元素与其他元素是在不同的显示层进行渲染」的假像，<br>只是由于body相对于显示窗口同时在横坐标方向和纵坐标方向发现了位移，<br>形成了左右两部分的回弹颜色填充。<br>而fixed元素基于显示窗口固定，没有发生位移。而形成的分层的假想。<br>这解释了为什么fixed元素为什么一直在底部，而不是随着body在回弹机制下滚动。</p>
<h2 id="articleHeader5">IOS下position显示深度失效</h2>
<p>最后这个问题最简单，也最离奇，在IOS中，除了设置z-index外，元素只根据元素在代码中出现的顺序决定其显示的深度。布局格式并不能改变元素的显示深度。<br>分别在PC端和IOS端运行<a href="http://runjs.cn/code/dpltedhl" rel="nofollow noreferrer" target="_blank">布局示例</a>。</p>
<p>在PC中，由于「按钮」fixed定位和「其他」absolute定位脱离文档流。所以其显示层级比「项目列表」高，所以覆盖在「项目列表」外面。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010510321" src="https://static.alili.tech/img/remote/1460000010510321" alt="position深度1" title="position深度1" style="cursor: pointer;"></span></p>
<p>在IOS中，元素只根据元素在代码中出现的顺序决定其显示的深度。即：布局格式并不能改变元素的显示深度。<br>所以「项目列表」覆盖了「其他」和「按钮」。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010510322" src="https://static.alili.tech/img/remote/1460000010510322" alt="position深度2" title="position深度2" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/remote/1460000010510323" src="https://static.alili.tech/img/remote/1460000010510323" alt="对应二维码" title="对应二维码" style="cursor: pointer; display: inline;"></span></p>
<p>这解释了最后一个问题（「其他」区域消失不见）。这是由于「项目列表」的padding-top将「其他」区域遮盖住了。至于为什么要这么设计，后面会讲到。</p>
<p>也解释了第二个问题（页面滚动，「按钮」消失了）。</p>
<ul>
<li>第二个问题是由于不改变显示深度，所以「按钮」仍处于「项目列表」容器内。</li>
<li>而「按钮」的定位是根据显示容器，而不是body，所以滚动过程中不会跟着body移动，一定停留在底部。</li>
<li>在滚动时，「按钮」超出了「项目列表」的显示区域，「项目列表」设置了overflow，不在其显示区域的都不会被显示。所以滚动过程中，「按钮」逐渐消失。</li>
<li>而多出来的部分是回弹机制填充的内容。所以产生了颜色遮盖了「按钮」的错觉。</li>
</ul>
<h2 id="articleHeader6">常规解决方案</h2>
<p>讲了这么多，那到底有什么方法可以规避上面的问题呢？</p>
<ul>
<li>既然fixed布局这么多问题，我们改用absolute布局吧。我们改成<a href="http://runjs.cn/code/lp1pj4js" rel="nofollow noreferrer" target="_blank">absolute示例1</a>。但多次滚动后，我们发现了另一个问题，滚动时，「项目列表」的滚动会很容易与外部body下的滚动冲突。特别是当触碰到非「项目列表」区域的其他内容时（如「其他」或「按钮」），将触发的是body的滚动，无法滚动「项目列表」，违背操作意愿。<br><span class="img-wrap"><img data-src="/img/remote/1460000010510324" src="https://static.alili.tech/img/remote/1460000010510324" alt="对应二维码" title="对应二维码" style="cursor: pointer;"></span>
</li>
<li>为了减少body滚动的触发几率，可以用「项目列表」的padding值对「其他」和「按钮」区域进行占位。得到<a href="http://runjs.cn/code/ge7uvrrv" rel="nofollow noreferrer" target="_blank">absolute示例2</a>。这时，即使从「其他」区域或「按钮」区域进行触摸滚动，滚动的依然是「项目列表」中的内容。不会触发body的滚动回弹。这即是一个好事，也是一个错误现象。因为在这个时候，移动「按钮」和「其他」区域。也会滚动「项目列表」。这和我们的设计是不符的。<br><span class="img-wrap"><img data-src="/img/remote/1460000010510325" src="https://static.alili.tech/img/remote/1460000010510325" alt="对应二维码" title="对应二维码" style="cursor: pointer;"></span>
</li>
</ul>
<p>而且以上两个解决方案都还有另一个操作的问题，如果当「项目列表」滚动到最顶部，或者对底部。停止1秒左右（即等待滚动趋势结束），<br>再往相同方向强制滚动（例如，往下滚到最低，静置1s，再往下滚）。这时，滚动回弹就不会在「项目列表」中进行，而是被放到了body区域上进行。这时在body的滚动趋势还没有结束前，无论怎么进行滚动。都会在body中触发。<br>与用户期待的滚动不符。</p>
<h2 id="articleHeader7">最终解决方案</h2>
<p>上面的一切都是由于页面最外层的滚动回弹引起的。有没有方案禁止页面最外层的滚动回弹呢？很抱歉，笔者没有找到。<br>但是！笔者找到了不显示滚动回弹颜色填充内容的方法。</p>
<ul>
<li>那就是fixed大法。直接将整个body设置成position:fixed。这时整个body都基于显示窗口定位。不会再显示滚动回弹内容。<a href="http://runjs.cn/code/7fuorgkp" rel="nofollow noreferrer" target="_blank">fixed示例1</a>。然而这仅仅是不显示颜色填充的内容。滚动回弹其实还是存在的，只是被body挡住了显示不出来。页面依然会存在上面的两个问题。最外部的滚动回弹还是会与「项目列表」区相冲突。<br><span class="img-wrap"><img data-src="/img/remote/1460000010510326" src="https://static.alili.tech/img/remote/1460000010510326" alt="对应二维码" title="对应二维码" style="cursor: pointer; display: inline;"></span>
</li>
<li>怎么解决冲突？去掉「项目列表」的-webkit-overflow-scrolling: touch;样式，运行代码。<a href="http://runjs.cn/code/yfhfsd3i" rel="nofollow noreferrer" target="_blank">fixed示例2</a>。<br><span class="img-wrap"><img data-src="/img/remote/1460000010510327" src="https://static.alili.tech/img/remote/1460000010510327" alt="对应二维码" title="对应二维码" style="cursor: pointer; display: inline;"></span>
</li>
<li>冲突解决。不过滚动变卡顿了。怎么办？换个顺滑滚动的实现方案呗，例如用IScroll。<a href="http://runjs.cn/code/jthpkfzr" rel="nofollow noreferrer" target="_blank">fixed示例3</a><br><span class="img-wrap"><img data-src="/img/remote/1460000010510328" src="https://static.alili.tech/img/remote/1460000010510328" alt="对应二维码" title="对应二维码" style="cursor: pointer; display: inline;"></span>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入探究iOS下fixed定位导致的问题

## 原文链接
[https://segmentfault.com/a/1190000010510291](https://segmentfault.com/a/1190000010510291)

