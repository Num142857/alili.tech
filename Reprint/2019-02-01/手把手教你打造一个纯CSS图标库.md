---
title: '手把手教你打造一个纯CSS图标库' 
date: 2019-02-01 2:30:10
hidden: true
slug: 5rl8bgfrd1w
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">来，干了这碗安利</h2>
<p><strong>写这篇文章的目的其实就是为了安利一下我的图标库：<strong><a href="https://github.com/qieguo2016/iconoo" rel="nofollow noreferrer" target="_blank">iconoo</a></strong>，所以，开门见山，star吧少年少妇们！（这样的我是不是应该要加个github互粉的团伙了？）</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007319507" src="https://static.alili.tech/img/remote/1460000007319507" alt="iconoo" title="iconoo" style="cursor: pointer; display: inline;"></span></p>
<p><strong>主题说完了，下面进入正题。</strong></p>
<p>在web开发中，我们经常要用到一些小图标（加减勾叉等）。通常做法就两种：</p>
<ol>
<li><p>直接使用图片；</p></li>
<li><p>使用css/svg直接在浏览器中绘制图标。</p></li>
</ol>
<p><strong>方案1</strong>：由于图标图片比较多，而且体积很小，为了减少请求所以很多时候我们会用雪碧图这种技术来将图标拼凑在同一张图片里面。你也能想到，一堆图标的雪碧图，修改维护会相当麻烦！现在比较好的方案是使用webpack引入图片，小图直接转换成base64插入css中。直接使用图片比较简单，这也是目前比较主流的做法。</p>
<p><strong>方案2</strong>： 相比方案1，明显可以减小资源的体积，只需要几条css/svg命令就可以绘制出精美的图标，而且不受图片尺寸限制，可大可小非常灵活。初看方案2的一堆代码可能会觉得非常难，但其实很多简单的图标都是非常容易实现的。</p>
<p>接下来就是妹子们最期待的茄果叔叔手把手教学时间啦。</p>
<h2 id="articleHeader1">手抓手教学时间</h2>
<p>使用CSS绘制线条，用到的不外乎两个属性：<code>border</code> &amp; <code>box-shadow</code>。而形状则可以用<code>border-radius</code>、<code>transform</code>控制变形，位置则会用到<code>绝对定位</code>、<code>transform</code>、<code>margin</code>等属性来调整。CSS的绘图，做过几个就知道大概是怎么回事了，归根到底，还是几何。如果觉得几何烧脑，那就直接用 <strong><a href="https://github.com/qieguo2016/iconoo" rel="nofollow noreferrer" target="_blank">iconoo</a></strong> 吧~~~</p>
<p>基本原理说了，下面来撸一发，先看看最简单的加号：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".plus {
    box-sizing : border-box;
    display    : inline-block;
    position   : relative;
    font-size  : 20px;
}

.plus:before, .plus:after {
    content        : '';
    pointer-events : none;
    position       : absolute;
    left           : 50%;
    top            : 50%;
    transform      : translate(-50%, -50%);
    box-shadow     : inset 0 0 0 1em;
}

.plus:before {
    width  : 1em;
    height : 2px;
}

.plus:after {
    height : 1em;
    width  : 2px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="CSS"><span class="hljs-selector-class">.plus</span> {
    <span class="hljs-attribute">box-sizing </span>: border-box;
    <span class="hljs-attribute">display    </span>: inline-block;
    <span class="hljs-attribute">position   </span>: relative;
    <span class="hljs-attribute">font-size  </span>: <span class="hljs-number">20px</span>;
}

<span class="hljs-selector-class">.plus</span><span class="hljs-selector-pseudo">:before</span>, <span class="hljs-selector-class">.plus</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content        </span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">pointer-events </span>: none;
    <span class="hljs-attribute">position       </span>: absolute;
    <span class="hljs-attribute">left           </span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">top            </span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform      </span>: <span class="hljs-built_in">translate</span>(-50%, -50%);
    <span class="hljs-attribute">box-shadow     </span>: inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">1em</span>;
}

<span class="hljs-selector-class">.plus</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">width  </span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">height </span>: <span class="hljs-number">2px</span>;
}

<span class="hljs-selector-class">.plus</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">height </span>: <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">width  </span>: <span class="hljs-number">2px</span>;
}</code></pre>
<p>代码还是非常简单的，首先我们这里用到了<code>before</code>和<code>after</code>两个伪类增加可用的标签，不然只有一个标签，要玩出花来实在是太难。<code>content</code>顾名思义就是内容，里面可以加各种字符，甚至是换行之类的控制符。而<code>pointer-events:none</code>则是消除了鼠标指针事件，这样元素就具有穿透性了，具体细节还请自行搜索哈，这里就不多说了。绘图的核心，就是通过设置两个伪类的宽高和阴影来绘制横竖两条线，位置方面是通过<code>绝对定位</code>+<code>反向偏移</code>的方式，巧妙利用了这两个属性百分比参照的不同实现了横竖的居中。所有尺寸除了线宽（2px）外都使用<code>em</code>这个相对单位，所以调整<code>font-size</code>的值就可以调整图标的大小了。要调整线宽呢，就将所有<code>px</code>单位的尺寸都一并改了即可。</p>
<h2 id="articleHeader2">进阶玩法</h2>
<p>首先来看看这个图片图标：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007319508" src="https://static.alili.tech/img/remote/1460000007319508" alt="icon-image" title="icon-image" style="cursor: pointer; display: inline;"></span></p>
<p>这个图形网上说的应该还是比较多的了，然而我第一眼看到的时候还是懵逼了。。。分析一下，最外层的边框明显可以用<code>border</code>来做，然后用个<code>before</code>来做圆点也非常简单，关键是两座大山要如何绘制呢？<code>box-shadow</code>貌似可以做多层边框呢，然后加个旋转是不是就出来了呢？最后隐藏边框之外的部分就可以了。绘制流程如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007319509" src="https://static.alili.tech/img/remote/1460000007319509" alt="icon-image-design" title="icon-image-design" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".icon-img {
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    width: 90px;
    height: 80px;
    border: 5px solid;
    border-radius: 10px;
    color: #2ba5bb;
    overflow: hidden;
}

.icon-img:before,.icon-img:after {
    content: '';
    pointer-events: none;
    position: absolute;
}

.icon-img:before {
    width: 10px;
    height: 10px;
    top: 18px;
    right: 20px;
    box-shadow: inset 0 0 0 1em;
    border-radius: 50%;
}

.icon-img:after {
    width: 60px;
    height: 50px;
    left: 0;
    bottom: -27px;
    box-shadow: inset 0 0 0 50px,30px -20px 0 0;
    transform: rotate(45deg);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="CSS"><span class="hljs-selector-class">.icon-img</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">90px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">80px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">5px</span> solid;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#2ba5bb</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
}

<span class="hljs-selector-class">.icon-img</span><span class="hljs-selector-pseudo">:before</span>,<span class="hljs-selector-class">.icon-img</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">pointer-events</span>: none;
    <span class="hljs-attribute">position</span>: absolute;
}

<span class="hljs-selector-class">.icon-img</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">18px</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
}

<span class="hljs-selector-class">.icon-img</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">60px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">bottom</span>: -<span class="hljs-number">27px</span>;
    <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">50px</span>,<span class="hljs-number">30px</span> -<span class="hljs-number">20px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(45deg);
}</code></pre>
<p>代码是临时拼的，就没做成<code>em</code>单位了。呃，为什么要做成<code>em</code>单位呢？</p>
<p>我们在使用图标的时候，可能尺寸每次都不一样，但图标的尺寸都是有关联的，调整起来相当费劲。当然你可以会想到用<code>zoom</code>、<code>scale</code>来做缩放，但是这样的缩放线宽也会随之变化了。设置<code>em</code>的话，在icon级设置<code>font-size</code>，然后icon本身以及后代都以这个<code>font-size</code>为参照，只调整<code>font-size</code>就完成了图标的等比缩放了。</p>
<p>再来看一个带变形的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007319510" src="https://static.alili.tech/img/remote/1460000007319510" alt="codepen" title="codepen" style="cursor: pointer;"></span></p>
<p>这个一看其实就能猜到是怎么画的，几何关系貌似也比较简单，但是要映射到css的规则里面却非常复杂。先看看流程：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007319511" src="https://static.alili.tech/img/remote/1460000007319511" alt="codepen-design" title="codepen-design" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".icon-codepen {
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    color: #2ba5bb;
    width: 2px;
    height: 10px;
    box-shadow: inset 0 0 0 32px,0 15px,-11px 7px,11px 7px;
}

.icon-codepen:before,
.icon-codepen:after {
    content: '';
    pointer-events: none;
    position: absolute;
    width: 11px;
    height: 4px;
}

.icon-codepen:before {
    right: 2px;
    top: 3px;
    transform: skew(0,-35deg) scaleY(0.6);
    box-shadow: inset 0 0 0 32px,0 13px,11px 26px,12px 39px;
}

.icon-codepen:after {
    left: 2px;
    top: 3px;
    transform: skew(0,35deg) scaleY(0.6);
    box-shadow: inset 0 0 0 32px,0 13px,-11px 26px,-12px 39px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="CSS"><span class="hljs-selector-class">.icon-codepen</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#2ba5bb</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">2px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">32px</span>,<span class="hljs-number">0</span> <span class="hljs-number">15px</span>,-<span class="hljs-number">11px</span> <span class="hljs-number">7px</span>,<span class="hljs-number">11px</span> <span class="hljs-number">7px</span>;
}

<span class="hljs-selector-class">.icon-codepen</span><span class="hljs-selector-pseudo">:before</span>,
<span class="hljs-selector-class">.icon-codepen</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">pointer-events</span>: none;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">11px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">4px</span>;
}

<span class="hljs-selector-class">.icon-codepen</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">right</span>: <span class="hljs-number">2px</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">3px</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">skew</span>(0,-35deg) <span class="hljs-built_in">scaleY</span>(0.6);
    <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">32px</span>,<span class="hljs-number">0</span> <span class="hljs-number">13px</span>,<span class="hljs-number">11px</span> <span class="hljs-number">26px</span>,<span class="hljs-number">12px</span> <span class="hljs-number">39px</span>;
}

<span class="hljs-selector-class">.icon-codepen</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">2px</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">3px</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">skew</span>(0,35deg) <span class="hljs-built_in">scaleY</span>(0.6);
    <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">32px</span>,<span class="hljs-number">0</span> <span class="hljs-number">13px</span>,-<span class="hljs-number">11px</span> <span class="hljs-number">26px</span>,-<span class="hljs-number">12px</span> <span class="hljs-number">39px</span>;
}</code></pre>
<p>难点就在长宽的变形上，对于变形比较简单的方法是使用变换矩阵来求解。图形学学的不好的话，那就比较痛苦了，如果不追求单标签的话，可以将每条边用一个标签表示，这样就很好处理了。</p>
<h2 id="articleHeader3">叔叔，我想装逼</h2>
<p><strong>怎么样？觉得上面这些都是小玩意？想装逼了？好，叔叔教你！</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007319512" src="https://static.alili.tech/img/remote/1460000007319512" alt="蒙娜丽莎" title="蒙娜丽莎" style="cursor: pointer; display: inline;"></span></p>
<p><strong>蒙娜丽莎？什么鬼？我会告诉你这也可以用一个单标签纯CSS画出来的吗？</strong></p>
<p><a href="http://codepen.io/jaysalvat/pen/HaqBf" rel="nofollow noreferrer" target="_blank">http://codepen.io/jaysalvat/p...</a><button class="btn btn-xs btn-default ml10 preview" data-url="jaysalvat/pen/HaqBf" data-typeid="3">点击预览</button> ，自己看去，几千条box-shadow构成的蒙娜丽莎，看的我内分泌都失调了。。。</p>
<p>静态的还不够，那来点动态的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007319513?w=623&amp;h=408" src="https://static.alili.tech/img/remote/1460000007319513?w=623&amp;h=408" alt="weather" title="weather" style="cursor: pointer;"></span></p>
<p><a href="http://codepen.io/fbrz/pen/iqtlk" rel="nofollow noreferrer" target="_blank">http://codepen.io/fbrz/pen/iqtlk</a><button class="btn btn-xs btn-default ml10 preview" data-url="fbrz/pen/iqtlk" data-typeid="3">点击预览</button> ，不多说，拿去不谢！</p>
<p>更多CSS玩意儿，请到<a href="http://codepen.io" rel="nofollow noreferrer" target="_blank">codepen</a>上去探宝吧！如果codepen都打不开，可以到我博客园去下载相应的css文件吧！什么，没有提供下载链接？F12大法搞起！</p>
<h2 id="articleHeader4">首尾呼应</h2>
<p><strong>语文老师说了，文章要首尾呼应升华主题，so one more time：写这篇文章的目的其实就是为了安利一下我的图标库：<strong><a href="https://github.com/qieguo2016/iconoo" rel="nofollow noreferrer" target="_blank">iconoo</a></strong>，所以，开门见山，star吧少年少妇们！</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手把手教你打造一个纯CSS图标库

## 原文链接
[https://segmentfault.com/a/1190000007319504](https://segmentfault.com/a/1190000007319504)

