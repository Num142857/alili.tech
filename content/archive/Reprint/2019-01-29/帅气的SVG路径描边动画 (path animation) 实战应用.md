---
title: '帅气的SVG路径描边动画 (path animation) 实战应用' 
date: 2019-01-29 2:30:10
hidden: true
slug: b9gktimg665
categories: [reprint]
---

{{< raw >}}

                    
<p>这是我的一个关于SVG的应用的技术分享网站<a href="http://svgtrick.com/" rel="nofollow noreferrer" target="_blank">svgtrick.com</a>，会同步一些文章到这里来，更多关于SVG技术应用可以去<a href="http://svgtrick.com/" rel="nofollow noreferrer" target="_blank">网站</a>看看。</p>
<p>要是觉得文章还不错的话，可以多多推荐哦。</p>
<p>今天这篇文章来聊聊SVG路径描边动画。</p>
<p>关于路径描边动画大家可以去看看这两个网站，<a href="http://www.polygon.com/a/ps4-review" rel="nofollow noreferrer" target="_blank">Playstation 4</a>和<a href="http://www.polygon.com/a/xbox-one-review" rel="nofollow noreferrer" target="_blank">Xbox One</a>，这两个网站中就使用了SVG中的路径（path）来实现的描边动画效果。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007811314?w=480&amp;h=567" src="https://static.alili.tech/img/remote/1460000007811314?w=480&amp;h=567" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>上面图所示的效果就是我们要实现的效果。</p>
<h3 id="articleHeader0">准备矢量文件</h3>
<p>在实际编写动画效果前，最重要的是要准备矢量文件。第一步是要使用Illustrator来创建你需要描边效果的矢量文件，需要使用钢笔工具来创建描边效果的矢量文件。当然如果你仅仅是对怎么实现描边的动画效果感兴趣，可以跳过这一步。</p>
<h3 id="articleHeader1">命名图层</h3>
<p>在设计图形的时候，要养成良好的图层命名习惯，尤其是要导出SVG文件的时候更应如此。如果不对图层命好命，那么导出来的SVG文件会异常复杂难以辨认，所以为了后面开发方便，还是好好的对图层命好命吧。图层的名字保持简洁容易理解就可以了。对于嵌套的子图层也要命好名，如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007811315?w=480&amp;h=449" src="https://static.alili.tech/img/remote/1460000007811315?w=480&amp;h=449" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader2">导出</h3>
<p>设计好图形后，就可以使用Illustrator来导出为SVG文件了，在导出文件前需要对图形进行一些设置，相关的设置可以去看看我以前写<a href="http://svgtrick.com/tricks/d78bde81f9d533589c3a3c1946d6c450" rel="nofollow noreferrer" target="_blank">一篇文章</a>，这里就不再阐述了。</p>
<h3 id="articleHeader3">输出SVG文件</h3>
<p>再一次提醒在输出SVG文件前，记得把图层命好名。上面的图像导出SVG后，使用代码编辑器工具打开SVG文件：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007811316?w=800&amp;h=380" src="https://static.alili.tech/img/remote/1460000007811316?w=800&amp;h=380" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>看到代码里的ID了么？通过ID我们就可以清楚的知道每条路径（patn）所对应的图形，这就是图层命名带来的好处。想象一下，如果你在导出前没有命好名，为了找到每条路径（path）所对应的图形那是怎样的一种痛苦。</p>
<h3 id="articleHeader4">优化</h3>
<p>当然导出SVG后，还需要进一步优化和压缩SVG文件，一般使用像<a href="https://github.com/svg/svgo-gui" rel="nofollow noreferrer" target="_blank">SVGO</a>类似的工具就可以很好的对SVG文件进行优化。不过，像我们现在这样要直接来操纵SVG文件来编写动画效果，最好是不要以开始就对SVG文件进行优化。我们可以在边写完动画效果后再对它进行优化。</p>
<p>至于SVG文件的优化可以去看看<a href="http://svgtrick.com/tricks/d78bde81f9d533589c3a3c1946d6c450" rel="nofollow noreferrer" target="_blank">这篇文章</a>。</p>
<h3 id="articleHeader5">动起来</h3>
<p>在开始实现路径（path）描边动画前，先要明白<em>stroke-dasharray</em> 和<em>stroke-dashoffset</em>这两个概念。</p>
<h4>Stroke Dash Array</h4>
<p>在SVG中也可以像CSS中那样指定边框为虚线要用到属性<strong>stroke-dasharray</strong>。stroke-dasharray属性的参数，是一组用逗号分割的数字组成的序列。需要注意的是，这里的数字必须用逗号分割，虽然也可以插入空格，但是数字之间必须用逗号分开。每一组数字，第一个用来表示实线，第二个用来表示空白。</p>
<p>如果只有一个数字5，则表示会先画5px实线，紧接着是5px空白，然后又是5px实线，从而形成虚线。</p>
<p>比如我有一条200px的线，我把<strong>stroke-dasharray</strong>的指定为200，它就表示先画200px实线，紧接着是200px空白，然后又是200px实线，从而形成虚线。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007811317?w=480&amp;h=190" src="https://static.alili.tech/img/remote/1460000007811317?w=480&amp;h=190" alt="" title="" style="cursor: pointer;"></span></p>
<h4>Stroke Dash Offset</h4>
<p><strong>stroke-dashoffset</strong>属性表示路径从开始位置的偏移量。比如在下面我定义了<strong>stroke-dasharray</strong>的值为5、10、30、10表示5px的虚线、10px的空白、30px的虚线、10px的空白，如此循环。然后，通过改变它的<strong>stroke-dashoffset</strong>的值来看看会发生什么：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007811318?w=480&amp;h=230" src="https://static.alili.tech/img/remote/1460000007811318?w=480&amp;h=230" alt="" title="" style="cursor: pointer;"></span></p>
<p>从图片中可以看到，通过调整<strong>stroke-dashoffset</strong>的值，可以重新设置路径开始的位置。在上面的实例中，我设置<strong>stroke-dashoffset</strong>的值为15px，可以看到路径移动了15px的距离。</p>
<h3 id="articleHeader6">动态改变偏移值</h3>
<p>我们把路径的<strong>stroke-dasharray</strong>和<strong>stroke-dashoffset</strong>都设置为200px的值，会发现什么也看不到了，因为路径的虚线和空白距离都是一样的，而<strong>stroke-dashoffset</strong>的值也是200px，即表示路径从开始的位置偏移了200px的值（记住路径的偏移是从左边的原点开始的），所以就看到一片空白。</p>
<p>如果使用CSS3的来动态改变路径的偏移值即从200px到0，就会看到路径就像是用笔慢慢画出来的。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007811319?w=480&amp;h=372" src="https://static.alili.tech/img/remote/1460000007811319?w=480&amp;h=372" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">冰淇淋描边动画效果</h3>
<p>原理明白，下面正式开干了。</p>
<p>首先在Illustrator中得到相关路径的长度，可以在文档信息面板中得到路径的长度。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007811320?w=800&amp;h=539" src="https://static.alili.tech/img/remote/1460000007811320?w=800&amp;h=539" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>为了更好的来编写动画效果，需要给每一个路径赋予了一个类名，这样可以针对每一条路径来更加精细控制动画效果。</p>
<p>然后，使用上面说的<em>stroke-dasharray</em> 和<em>stroke-dashoffset</em>两个属性来实现描边动画效果。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007811321?w=800&amp;h=602" src="https://static.alili.tech/img/remote/1460000007811321?w=800&amp;h=602" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>一个帅气的路径描边动画效果就实现了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007811322?w=800&amp;h=494" src="https://static.alili.tech/img/remote/1460000007811322?w=800&amp;h=494" alt="" title="" style="cursor: pointer;"></span></p>
<p>看起来好像不错了，但是还有优化的空间。</p>
<h3 id="articleHeader8">进一步优化</h3>
<p>通过改变一些路径的虚线的长度，可以达到加快路径绘制的动画效果。很好理解，同样在2s内绘制一个短的虚线肯定要比绘制一个长的虚线的要快，即移动小一点的偏移量要比大一点的偏移值在同样的时间内肯定是要快一点。配合动画的延迟执行即<strong>animation-delay</strong>可以使动画效果更有趣一点。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007811323?w=800&amp;h=547" src="https://static.alili.tech/img/remote/1460000007811323?w=800&amp;h=547" alt="" title="" style="cursor: pointer;"></span></p>
<p>最终线上代码效果可以去这里看看<a href="http://codepen.io/edennington/pen/pNgRzz" rel="nofollow noreferrer" target="_blank">demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="edennington/pen/pNgRzz" data-typeid="3">点击预览</button>。</p>
<p>最后要提醒一点的是：这种动画效果对于使用embedded方式来引入SVG的情形是不支持的。如果要使用这样的动画效果，最好是使用inline svg的方式来引入svg即直接把SVG文件代码写到html文件中。</p>
<h3 id="articleHeader9">友情提醒</h3>
<p>下面来说说一些浏览器的支持情况。</p>
<h4>Mircosoft Edge</h4>
<p>最新的Mircosoft Edge浏览器是支持这种描边动画效果的，不过它要求使用有明确单位的值，比如<strong>stroke-dasharray</strong>的值就必须为200px。</p>
<h4>Internet Explorer</h4>
<p>不幸的的是，Internet Explorer浏览器不支持在CSS中使用动画来控制<strong>stroke-dashoffset</strong>的值。</p>
<p>如果你一定要在IE上也实现描边动画效果，可以借助下面两种javascript方法来实现：</p>
<p><a href="http://stackoverflow.com/questions/24918529/animate-path-in-internet-explorer" rel="nofollow noreferrer" target="_blank">解决方法1</a>。</p>
<p>解决方法2是使用一个javascript的库来实现，<a href="https://maxwellito.github.io/vivus/" rel="nofollow noreferrer" target="_blank">vivus</a>。</p>
<p><a href="https://medium.com/bitmatica-lab/svg-line-animation-for-the-uninitiated-5a65d91c6044#.on4xv2w85" rel="nofollow noreferrer" target="_blank">原文地址</a>，根据自己的理解有所删减。</p>
<p>推荐参考资料：</p>
<p><a href="https://css-tricks.com/svg-line-animation-works/" rel="nofollow noreferrer" target="_blank">How SVG Line Animation Works</a></p>
<p><a href="https://product.voxmedia.com/2013/11/25/5426880/polygon-feature-design-svg-animations-for-fun-and-profit" rel="nofollow noreferrer" target="_blank">Polygon feature design: SVG animations for fun and profit</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
帅气的SVG路径描边动画 (path animation) 实战应用

## 原文链接
[https://segmentfault.com/a/1190000007811310](https://segmentfault.com/a/1190000007811310)

