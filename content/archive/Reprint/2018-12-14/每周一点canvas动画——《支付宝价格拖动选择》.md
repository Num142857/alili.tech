---
title: '每周一点canvas动画——《支付宝价格拖动选择》' 
date: 2018-12-14 2:30:10
hidden: true
slug: yrdj8qx49k
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://github.com/supperjet/H5-Animation/tree/master/%E6%94%AF%E4%BB%98%E5%AE%9D%E4%BB%B7%E6%A0%BC%E6%8B%96%E5%8A%A8" rel="nofollow noreferrer" target="_blank">效果源码</a> </p>
<p>终于到年底了，再过两天我也要回家过年了，想想就激动呢！今天给大家带来一个基于移动端的canvas价格选择效果。</p>
<p><span class="img-wrap"><img data-src="/img/bV3QGd?w=733&amp;h=352" src="https://static.alili.tech/img/bV3QGd?w=733&amp;h=352" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>主要功能就是拖动标尺变动价格。而且支付宝和京东金融的里也有这样的效果（果然天下设计都是你抄我我抄你啊?）。</p>
<p><a href="https://codepen.io/supperjet/pen/paPVeM" rel="nofollow noreferrer" target="_blank">效果演示地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="supperjet/pen/paPVeM" data-typeid="3">点击预览</button></p>
<h4>1.实现思路</h4>
<p>整个效果的核心就是用canvas绘制的标尺。一共包括标尺主体，数字，和中间固定不变的标定轴，这几个部分都用canvas绘制。最上面的大号价格文字，因为其他地方会需要用它来计算相关的收益。所以，我们就用个DOM来呈现，这样比较方便获取。</p>
<p>标尺拖动的距离与价格之间有有一个映射关系，是整个效果最不好处理的部分，在具体处理到相关问题的时候我们再做分析。现在，我们先实现基础的标尺绘制。</p>
<h4>2.标尺属性定义</h4>
<p>我们先定义一个类叫<code>Rule.js</code>, 其具体属性如下。</p>
<p><span class="img-wrap"><img data-src="/img/bV3Phw?w=785&amp;h=800" src="https://static.alili.tech/img/bV3Phw?w=785&amp;h=800" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>现在我们来了解一下每个属性的含义：</p>
<ol>
<li>
<code>x, y</code>:  标尺的坐标位置</li>
<li>
<code>vx</code>: 标尺的移动速度</li>
<li>
<code>ax</code>: 标尺移动加速度</li>
<li>
<code>color</code>: 绘制标尺线条的颜色，与文字颜色</li>
<li>
<code>scaleX, scaleY</code>: 缩放比</li>
<li>
<code>markShort, markLong</code>: 标尺长短线的长度</li>
<li>
<code>textHeight</code>: 文字距离标尺主体的高度</li>
<li>
<code>min, max</code>: 要展示的最大值和最小值</li>
<li>
<code>width</code>: 标尺的像素宽度</li>
<li>
<code>step</code>: 步长</li>
<li>
<code>seg</code>: 段数</li>
<li>
<code>pxStep</code>: 在canvas上的实际步长(单位为px)</li>
<li>
<code>minPxStep</code>: 每个pxStep分10小段，每小段的实际像素宽度</li>
<li>
<code>lineBottom</code>: 底部横线参数</li>
<li>
<code>lineRed</code>: 标定轴参数</li>
</ol>
<p>参数比较多，但真正需要传入的参数其实并不是很多。这里我讲解一下（8）~（15）这几个参数的思路。</p>
<p><strong>min， max</strong> : 参数的作用是设置需要显示的最大金额和最小金额。这两个参数是外部传入的，比如设定用户最小能存100元，最大能存100000万元。那么min和max就分别对应100和100000。</p>
<p><strong>width</strong> : 是整个标尺的实际屏幕长度，比如你只想标尺绘制1000px,那这里就传1000就好了。</p>
<p><strong>step</strong> : 步长的含义就是每隔多少分一段，比如我们设定的最大金额为10000元， 那设置step为1000就意味着，每隔1000元表示一个小段，这也是canvas上标尺刻度需要绘制的数据。</p>
<p><strong>seg</strong> : 段数等于总金额max除以step。</p>
<p><strong>pxStep</strong> : 为真正映射到canvas上的像素步长。</p>
<p><strong>miniPxStep</strong> : 每个pxStep分为10小段，每小段的像素距离。</p>
<p><strong>lineBottom</strong> : 独立出来不和标尺刻度一起绘制，在绘制标尺的底部横线时，我是这样想的。底部横线的宽度其实就是canvas的宽度，没必要从标尺的初始画到标尺的结尾。而且为了用户体验，刻度的初始位置和结束位置都位于整个canvas的中心。所以，如果合在一起绘制，你需要先绘制一段没刻度的横线，然后再绘制刻度，到最后还要绘制一段没刻度的横线。这给无疑让绘制和后续的标尺移动变得相当麻烦。所以我把它抽出来，就是一条贯穿canvas的普通横线。</p>
<p><strong>lineRed</strong> : 标定轴，始终在canvas的中间，也独立出来不和标尺刻度一起绘制。</p>
<p>属性都有了，下面添加一个draw方法，把我们的标尺绘制出来。</p>
<h4>2.标尺绘制</h4>
<p>a) 绘制标尺刻度部分<br><span class="img-wrap"><img data-src="/img/bV3PhF?w=556&amp;h=664" src="https://static.alili.tech/img/bV3PhF?w=556&amp;h=664" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>这里有个截图错误，应该是<code>i+=this.miniPxStep</code>。这应该不难理解，就是每隔<code>miniPxStep</code>绘制一次线段，线段的类型根据<code>n</code>这个变量来确定。</p>
<p>b) 绘制标尺文字部分</p>
<p><span class="img-wrap"><img data-src="/img/bV3PhJ?w=799&amp;h=282" src="https://static.alili.tech/img/bV3PhJ?w=799&amp;h=282" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>文字的绘制不能以真实的屏幕像素为准，必须映射到金额上，所以，这里绘制的数字是<code>（n/10）* this.step</code>。同时，还做了一个特殊的处理，就是初始值是1，不是0。因为，我们的金额不允许输入0元。如果你不需要这个，把这里注释掉就ok了。</p>
<p>c) 绘制底部横线</p>
<p><span class="img-wrap"><img data-src="/img/bV3PhK?w=800&amp;h=495" src="https://static.alili.tech/img/bV3PhK?w=800&amp;h=495" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>d) 绘制标定轴</p>
<p><span class="img-wrap"><img data-src="/img/bV3PhM?w=552&amp;h=399" src="https://static.alili.tech/img/bV3PhM?w=552&amp;h=399" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这样整个标尺就完成了，rule.js文件在顶部的github中。现在我们调用一下这个文件，看看画出来的效果怎样。</p>
<p><span class="img-wrap"><img data-src="/img/bV3PhO?w=534&amp;h=800" src="https://static.alili.tech/img/bV3PhO?w=534&amp;h=800" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这里我们设置了最大额度为100000元，最小额度为500元。整个标尺的长度为5000px，步长step为1000元。效果图如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV3PhQ?w=394&amp;h=118" src="https://static.alili.tech/img/bV3PhQ?w=394&amp;h=118" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>让标尺偏移个200px, 比如设置: <code>x: ruleX - 200</code>, 效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV3PhS?w=392&amp;h=121" src="https://static.alili.tech/img/bV3PhS?w=392&amp;h=121" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>设置步长step为500,效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV3PhV?w=387&amp;h=115" src="https://static.alili.tech/img/bV3PhV?w=387&amp;h=115" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>ok，现在静态标尺就绘制完成，下一步就要完成交互功能，让标尺能够跟随鼠标滚动，并且展示当前拖动的金额。</p>
<h4>3.拖动标尺</h4>
<p>现在我们开始实现标尺的拖动。标尺的拖动原理很简单，就是让标尺的位置跟随鼠标移动。这里为了演示方便我换成了鼠标事件，到移动端换成touch事件即可。</p>
<p>首先引入我们的工具函数<code>utils.js</code>文件，然后定义几个变量。<br><span class="img-wrap"><img data-src="/img/bV3PhW?w=429&amp;h=195" src="https://static.alili.tech/img/bV3PhW?w=429&amp;h=195" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><code>isMouseDown</code>用来判断鼠标是否抬起， <code>oldX</code>用来记录上一次拖动的位置，<code>mouse</code>是使用<code>captureMouse</code>返回的对象，返回鼠标在canvas上的当前位置信息。</p>
<p>然后，监听canvas的鼠标事件<code>mousedown, mouseup, mousemove</code>。并改变rule的位置。</p>
<p><span class="img-wrap"><img data-src="/img/bV3Ph0?w=678&amp;h=481" src="https://static.alili.tech/img/bV3Ph0?w=678&amp;h=481" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>当鼠标按下时，<code>isMouseDown</code>变为true, <code>offsetX</code>在上面忘记写了，它的作用是记录鼠标按下的位置与标尺位置之间的偏移量。然后在鼠标移动时标尺的位置<code>rule.x = mouse.x - offsetX</code>。如果不这样做，在点击canvas并拖动标尺的一瞬间，你会发现标尺的初始位置会瞬移到鼠标点击位置，这样体验很不好，我们需要不管点击哪，标尺都会在现有的位置跟随鼠标移动。如果，无法体会，动手试一试去掉回事什么效果。</p>
<p><code>oldX</code>也很好理解，就是记录标尺上一次的位置，这里还没有用到它，后面可能会用到。<br>现在我们把标尺的绘制写进动画函数中</p>
<p><span class="img-wrap"><img data-src="/img/bV3Ph2?w=560&amp;h=240" src="https://static.alili.tech/img/bV3Ph2?w=560&amp;h=240" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>看看动画效果如何。</p>
<p><span class="img-wrap"><img data-src="/img/bV3Ph4?w=392&amp;h=112" src="https://static.alili.tech/img/bV3Ph4?w=392&amp;h=112" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>ok，现在我们已经实现了标尺跟随鼠标的拖动。下一步，我们就把拖动的金额显示出来。</p>
<h4>4.金额显示</h4>
<p>首先，增加一个<code>input</code>输入框，然后获取它。</p>
<p><span class="img-wrap"><img data-src="/img/bV3Ph6?w=359&amp;h=215" src="https://static.alili.tech/img/bV3Ph6?w=359&amp;h=215" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这里设置了输入框的最小值为标尺的最小额度，这里可以先不用管它。我们主要看<code>onMouseMove</code>函数</p>
<p><span class="img-wrap"><img data-src="/img/bV3Pib?w=569&amp;h=235" src="https://static.alili.tech/img/bV3Pib?w=569&amp;h=235" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>注意<code>money</code>的计算值，它为<code>(centerX - rule.x)*rule.ratioScale</code>。 <code>(centerX - rule.x)</code>比较好理解，因为，我们的标尺是从canvas的中心点绘制的。但<code>rule.ratioScale</code>在最开始的构造函数中并没有定义。这里需要在构造函数中加上，它的含义是每像素代表多少钱，可以认为是图形比例尺。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.ratioScale = Math.floor(this.max / this.width) //比列尺" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.ratioScale = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-keyword">this</span>.max / <span class="hljs-keyword">this</span>.width) <span class="hljs-comment">//比列尺</span></code></pre>
<p>那么自然，移动距离乘以比例尺就得出钱数了。我们看看效果。</p>
<p><span class="img-wrap"><img data-src="/img/bV3Pic?w=392&amp;h=112" src="https://static.alili.tech/img/bV3Pic?w=392&amp;h=112" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>注意到上面的效果中金额显示出现了负数，所以我们需要对移动范围做限制。让其只能在限定的最大和最小金额之间移动。</p>
<h4>5.移动范围限定</h4>
<p>对一定范围的限定主要分为两部分。一、标尺范围的限定。二、金额显示的限定。这两部分我们放在一起做。</p>
<p>1）重设标尺的初始位置<br>假设我们设置的最小金额为500元，那么初始标定轴的位置应该就是500元的位置。所以初始化标尺的位置后，我们给它重置为最小金额的位置。这时候需要把金额换算一下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="rule.x = centerX - rule.min / rule.ratioScale;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">rule</span>.x = centerX - <span class="hljs-keyword">rule</span>.<span class="hljs-keyword">min</span> / <span class="hljs-keyword">rule</span>.ratioScale;</code></pre>
<p>就是把金额值得计算倒一下。</p>
<p>2）限定标尺的移动范围</p>
<p><span class="img-wrap"><img data-src="/img/bV3Pif?w=460&amp;h=351" src="https://static.alili.tech/img/bV3Pif?w=460&amp;h=351" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这里定义了一个检测边界值得函数，当金额小于最小投资金额时，标尺的位置为初始位置start(注意这个初始位置是已经被重置过的), 并且设置金额为最小额度。最大位置同理。<br>然后，在<code>onMouseMove</code>中调用。</p>
<p><span class="img-wrap"><img data-src="/img/bV3Pii?w=612&amp;h=258" src="https://static.alili.tech/img/bV3Pii?w=612&amp;h=258" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>看看效果图。</p>
<p><span class="img-wrap"><img data-src="/img/bV3Pij?w=392&amp;h=112" src="https://static.alili.tech/img/bV3Pij?w=392&amp;h=112" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4>6.输入金额移动标尺</h4>
<p>标尺的移动除了拖动以外，我们也希望通过金额输入框来达到。即输入金额，标尺便移动到目标金额的位置。</p>
<p><span class="img-wrap"><img data-src="/img/bV3Pil?w=626&amp;h=335" src="https://static.alili.tech/img/bV3Pil?w=626&amp;h=335" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>同时我们也做了边界限定，当输入的金额小于或者大于设定值时会，设置标尺的位置和输入框的显示为边界值，看看效果。</p>
<p><span class="img-wrap"><img data-src="/img/bV3Pip?w=392&amp;h=112" src="https://static.alili.tech/img/bV3Pip?w=392&amp;h=112" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4>7.来个速度吧</h4>
<p>现在拖动的还比较不自然，我们想要手指离开后标尺还会继续移动，直到速度慢慢减为0。为此，新建两个变量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var speed = 0, fl = 0.95; //初始速度， 摩擦系数" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">var speed = <span class="hljs-number">0</span>, fl = <span class="hljs-number">0.95</span>; <span class="hljs-comment">//初始速度， 摩擦系数</span></code></pre>
<p>新建一个<code>move</code>函数，在动画循环中调用。</p>
<p><span class="img-wrap"><img data-src="/img/bV3Piv?w=738&amp;h=353" src="https://static.alili.tech/img/bV3Piv?w=738&amp;h=353" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV3PiA?w=392&amp;h=112" src="https://static.alili.tech/img/bV3PiA?w=392&amp;h=112" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>至此，拖动输入的核心功能就开发完了。如果你要在项目中使用，另一个需要注意的事情是canvas在移动端的模糊问题，这个已经有了很多的解决方案，你只需要耐心调试就好。最后还是祝大家新年快乐，源码在头部地址哦。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
每周一点canvas动画——《支付宝价格拖动选择》

## 原文链接
[https://segmentfault.com/a/1190000013266172](https://segmentfault.com/a/1190000013266172)

