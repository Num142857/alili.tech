---
title: 'CSS 3D Panorama（全景） - 淘宝造物节技术剖析' 
date: 2019-02-04 2:30:58
hidden: true
slug: qav250y5utj
categories: [reprint]
---

{{< raw >}}

                    
<p>本文转自<strong>凹凸实验室</strong>：<a href="https://aotu.io/notes/2016/08/24/2016-8-24-css-3d-panorama/" rel="nofollow noreferrer" target="_blank">https://aotu.io/notes/2016/08...</a>  </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011381045" src="https://static.alili.tech/img/remote/1460000011381045" alt="cover.jpg" title="cover.jpg" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader0">前言</h3>
<p>3D 全景并不是什么新鲜事物了，但以前我们在 Web 上看到的 3D 全景一般是通过 Flash 实现的。若我们能将 <code>CSS3 Transform</code> 的相关知识运用得当，也是能实现类似的效果。换句话说，3D 全景其实就是 CSS3 3D 的应用场景之一。</p>
<h3 id="articleHeader1">准备</h3>
<p>在实现 CSS3 3D 全景之前，我们先理清部分 CSS3 Transform 相关的属性：</p>
<ul>
<li>
<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-origin" rel="nofollow noreferrer" target="_blank">transform-origin</a>：元素变形的原点（默认值为 50% 50% 0，该数值和后续提及的百分比默认均基于元素自身的宽高算出具体数值）；</li>
<li>
</li>
<li>
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style" rel="nofollow noreferrer" target="_blank">transform-style</a>：为子元素提供 2D 还是 3D 的场景。另外，该属性是非继承的；</li>
<li>
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform" rel="nofollow noreferrer" target="_blank">transform</a>：修改 CSS 可视化模型的坐标空间，包括 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate3d" rel="nofollow noreferrer" target="_blank">平移（translate）</a>、<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate" rel="nofollow noreferrer" target="_blank">旋转（rotate）</a>、<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale" rel="nofollow noreferrer" target="_blank">缩放（scale）</a> 和 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skew" rel="nofollow noreferrer" target="_blank">扭曲（skew）</a>。</li>
</ul>
<p>下面我们对上述的一些点进行更深入的分析：</p>
<ul><li>对于 <code>perspective</code>，该属性指定了“眼睛”与元素的 <code>perspective-origin</code>（默认值是 <code>50% 50% 0</code>）点的距离。那么问题来了：“当我们以 <code>px</code> 作为衡量单位时，它的实际距离该如何量化呢？”   <br>答：当屏幕分辨率是 1080P（1920*1080px）且该元素或其祖先元素的 <code>perspective</code> 数值的值为 <code>1920px</code> 时，应用了 CSS3 3D Transform 的子元素的立体效果就相当于我们在距离一个屏幕宽度（1920px）的屏幕前观看该元素时的真实效果。尽管如此，目前笔者也不知道如何准确地为元素设置一个合适的 <code>perspective</code> 值，只能猜测大概值后进行调整，以达到满意的呈现效果。</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006880859?w=680&amp;h=465" src="https://static.alili.tech/img/remote/1460000006880859?w=680&amp;h=465" alt="此处输入图片的描述" title="此处输入图片的描述" style="cursor: pointer;"></span><br>根据 <a href="https://zh.wikipedia.org/wiki/%E7%9B%B8%E4%BC%BC%E4%B8%89%E8%A7%92%E5%BD%A2" rel="nofollow noreferrer" target="_blank">相似三角形</a> 的性质可计算出被前移的元素最终在屏幕上显示的实际大小  </p>
<p>另外，关于 <code>perspective</code> 还有另外一个重要的点是：因为 <code>perspective-origin</code> 属性的默认值是 <code>50% 50% 0</code>，所以对哪个元素应用 <code>perspective</code> 属性，就决定了“眼睛”的位置（即我们的“眼睛”是在哪个角度看物体）。一般来说，当我们需要正视物体时，就会将该属性设置在与该元素中心重合的<strong>某一祖先元素</strong>上。</p>
<p>再另外，如果说：“如何让一个元素（的背面）不可见？”，你可能会回答 <code>backface-visibility:hidden;</code>。其实，对于在“眼睛”背后的元素（以元素的 <code>transform-origin</code> 为参考点），即元素的 <code>Z</code> 轴坐标值大于 <code>perspective</code> 的值时，浏览器是不会将其渲染出来的。</p>
<ul>
<li>对于 <code>transform-style</code>，该属性指定了其<strong>子元素</strong>是处于 3D 场景还是 2D 场景。对于 2D 场景，元素的前后位置是按照平时的渲染方式（即若在普通文档流中，同层级元素是按照代码中元素的先后编写顺序，后面的元素会遮住在其前面的元素）；对于 3D 场景，元素的前后位置则按照真实世界的规则排序（即靠近“眼睛”的元素，会遮住离“眼睛”远的元素）。<p>另外，由于 <code>transform-style</code> 属性是非继承的，对于中间节点需要显式设定。</p>
</li>
<li>对于 <code>transform</code> 属性：下图整理了 rotate3d、translate3d 的变换方向：  <br><span class="img-wrap"><img data-src="/img/remote/1460000006880860?w=423&amp;h=424" src="https://static.alili.tech/img/remote/1460000006880860?w=423&amp;h=424" alt="transform" title="transform" style="cursor: pointer; display: inline;"></span>
</li>
</ul>
<p>需要注意的是：transform 中的变换属性的顺序是有关系的，如 translateX(10px) rotate(30deg) 与 rotate(30deg) translateX(10px) 是不等价的。</p>
<p>另外，需要注意的是 scale 中如果有负值，则该方向会产生 180 度的翻转；</p>
<p>再另外，部分 transform 效果会导致元素（字体）模糊，如 translate 的数值存在小数、通过 translateZ 或 scale 放大元素等等。<strong>每个浏览器都有其不同的表现</strong>。</p>
<h3 id="articleHeader2">实现</h3>
<p>上面理清了一些 CSS Transform 相关的知识点，下面就讲讲如何实现 CSS 3D 全景 ：</p>
<p>想象一下，当我们站在十字路口中间，身体旋转 360°，这个过程中所看到的画面就是一幅以你为中心的全景图了。其实，当焦距不变时，我们就等同于站在一个圆柱体的中心。  </p>
<p>但是，虚拟世界与现实世界的最大不同是：没有东西是连续的，即所有东西都是离散的。例如，你无法在屏幕上显示一个完美的圆。你只能以一个正多边形表示圆：边越多，圆就越“完美”。 </p>
<p>同理，在三维空间中，每个 3D 模型都是一个多面体（即 3D 模型由不可弯曲的平面组成）。当我们讨论一个本身就是多面体（如立方体）的模型时并不足以为奇，但我们想展示其它模型时，如球体，就需要记住这个原理了。<br><span class="img-wrap"><img data-src="/img/remote/1460000006880861?w=700&amp;h=405" src="https://static.alili.tech/img/remote/1460000006880861?w=700&amp;h=405" alt="三维环境的球体" title="三维环境的球体" style="cursor: pointer;"></span></p>
<p><a href="http://zwj360.im20.com.cn" rel="nofollow noreferrer" target="_blank">淘宝造物节的活动页</a> 就是 CSS 3D 全景的一个很赞的页面，它将全景图分割成 20 等份，相邻的元素构成的夹角 18°（360/20，相邻两侧面相对于棱柱中心所构成的夹角）。需要注意的是：我们要确保<strong>每个元素的正面是指向棱柱中心的</strong>。所以要计算好每等份的旋转角度值后，再将元素向外（即 Z 轴方向）平移 <code>r</code> px。对于立方体的 <code>r</code> 就是 <code>边长/2</code>，而对于其它更复杂的正多面体呢？  </p>
<p>举例：对于正九棱柱，每个元素的宽为 <code>210px</code>，对应的角度为 <code>40°</code>，即如下图：  <br>图片来自：<a href="https://desandro.github.io/3dtransforms/docs/carousel.html" rel="nofollow noreferrer" target="_blank">https://desandro.github.io/3d...</a>  <br><span class="img-wrap"><img data-src="/img/remote/1460000006880862?w=540&amp;h=402" src="https://static.alili.tech/img/remote/1460000006880862?w=540&amp;h=402" alt="正九棱柱的俯视图" title="正九棱柱的俯视图" style="cursor: pointer;"></span><br>正九棱柱的俯视图  </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006880863?w=329&amp;h=383" src="https://static.alili.tech/img/remote/1460000006880863?w=329&amp;h=383" alt="计算过程" title="计算过程" style="cursor: pointer;"></span><br>计算过程  </p>
<p>由此可得到一个公用函数，只需传入含有<strong>元素的宽度</strong>和<strong>元素数量</strong>的对象，即可得到 <code>r</code> 值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function calTranslateZ(opts) {
  return Math.round(opts.width / (2 * Math.tan(Math.PI / opts.number)))
}

calTranlateZ({
    width: 210,
    number: 9
});  // 288" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">calTranslateZ</span>(<span class="hljs-params">opts</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.round(opts.width / (<span class="hljs-number">2</span> * <span class="hljs-built_in">Math</span>.tan(<span class="hljs-built_in">Math</span>.PI / opts.number)))
}

calTranlateZ({
    <span class="hljs-attr">width</span>: <span class="hljs-number">210</span>,
    <span class="hljs-attr">number</span>: <span class="hljs-number">9</span>
});  <span class="hljs-comment">// 288</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006880864?w=387&amp;h=386" src="https://static.alili.tech/img/remote/1460000006880864?w=387&amp;h=386" alt="俯视时所看到的元素外移动画" title="俯视时所看到的元素外移动画" style="cursor: pointer; display: inline;"></span><br>俯视时所看到的元素外移动画  </p>
<p>另外，为了让下文易于理解，我们约定 HTML 的结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#view(perspective:1000px)
    #stage(transform-style:preserve-3d)
        #cube(transform-style:preserve-3d)
            .div（width:600px;height:600px;） /*组成立方体的元素*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs leaf"><code><span class="hljs-function"><span class="hljs-keyword">#</span><span class="hljs-title">view</span><span class="hljs-params">(<span class="hljs-variable">perspective</span>:1000<span class="hljs-variable">px</span>)</span></span>
    <span class="hljs-function"><span class="hljs-keyword">#</span><span class="hljs-title">stage</span><span class="hljs-params">(<span class="hljs-variable">transform</span>-<span class="hljs-variable">style</span>:<span class="hljs-variable">preserve</span>-3<span class="hljs-variable">d</span>)</span></span>
        <span class="hljs-function"><span class="hljs-keyword">#</span><span class="hljs-title">cube</span><span class="hljs-params">(<span class="hljs-variable">transform</span>-<span class="hljs-variable">style</span>:<span class="hljs-variable">preserve</span>-3<span class="hljs-variable">d</span>)</span></span>
            .div（width:600px;height:600px;） /*组成立方体的元素*/</code></pre>
<p>正棱柱构建完成后，就需要将我们的“眼睛”放置在正棱柱内。由于在“眼睛”后的元素是不会被浏览器渲染的（与 <code>.div元素</code> 是否设置 <code>backface-visibility:hidden;</code> 无关），而且我们保证 <code>.div元素</code> 的<strong>正面</strong>都是指向正棱柱中心，这样就形成 360° 被环绕的效果了。</p>
<p>那“眼睛”具体被放置在哪个位置呢？  <br>答：通过设置 <code>#stage</code> 元素的 <code>translateZ</code> 值，让不能被看到的 <code>.div元素</code> 在 <code>Z</code> 轴上的最终坐标值（即其自身 <code>Z</code> 坐标和祖先元素 <code>Z</code> 坐标相加）大于 <code>#view</code> 元素的 <code>perspective</code> 值即可。如：立方体的正面的 <code>translateZ</code> 是 <code>-300px</code>（为了保证立方体的正面是指向立方体中心，正面元素需要以自身水平方向上的中线为轴，旋转 <code>180度</code>，即 <code>rotateY(-180deg) translateZ(-300px)</code>，即正面元素向“眼球”方向平移了 300px），而 <code>#view</code> 的 <code>perspective</code> 值为 <code>1000px</code>，那么 <code>#stage</code> 的 <code>translateZ</code> 值应该大于 <code>700px</code> 且小于 <code>1300px</code> 即可，具体数值则取决于你想要的呈现效果。</p>
<p>根据上述知识，笔者粗略地模仿了“造物节”的效果：<a href="http://jdc.jd.com/lab/zaowu/index_new.html" rel="nofollow noreferrer" target="_blank">http://jdc.jd.com/lab/zaowu/i...</a></p>
<p>另外，只需 6 幅图就可以实现一张常见的无死角全景图。  <br>笔者自己又试验了下：<a href="http://jdc.jd.com/lab/zaowu/index2.html" rel="nofollow noreferrer" target="_blank">http://jdc.jd.com/lab/zaowu/i...</a>   </p>
<p>可由下图看出，将水平的 4 张图片合成后就是一张全景图：  <br><span class="img-wrap"><img data-src="/img/remote/1460000006880865?w=1000&amp;h=250" src="https://static.alili.tech/img/remote/1460000006880865?w=1000&amp;h=250" alt="此处输入图片的描述" title="此处输入图片的描述" style="cursor: pointer;"></span></p>
<p>因此，理解上述知识后，通过 CSS3 Transform 相关属性就可以实现可交互的全景效果了。当然，交互的效果可以是拖拽，也可以是重力感应等。</p>
<p>正如在上文提到的：“没有东西是连续的，即所有东西都是离散的...”。通过两个案例的对比可以发现：图片数量越多，对图片的要求也越低。你觉得呢？<br><span class="img-wrap"><img data-src="/img/remote/1460000006880866?w=1000&amp;h=453" src="https://static.alili.tech/img/remote/1460000006880866?w=1000&amp;h=453" alt="淘宝造物节整体效果图" title="淘宝造物节整体效果图" style="cursor: pointer;"></span><br>造物节全景图</p>
<h3 id="articleHeader3">全景图素材的制作</h3>
<p>将全景图制作分为设计类与实景类：</p>
<h4>设计类</h4>
<p>要制作类似 <a href="http://zwj360.im20.com.cn" rel="nofollow noreferrer" target="_blank">《淘宝造物节》</a> 的全景页面，设计稿需要有以下这些要求。</p>
<p>注：下面提及的具体数据均基于《造物节》，可根据自身要求进行调整（若发现欠缺，欢迎作出补充）。</p>
<p>整体背景设计图如下（2580*1170px，被分成 20 等份）：  <br><span class="img-wrap"><img data-src="/img/remote/1460000006880866?w=1000&amp;h=453" src="https://static.alili.tech/img/remote/1460000006880866?w=1000&amp;h=453" alt="淘宝造物节整体效果图" title="淘宝造物节整体效果图" style="cursor: pointer;"></span></p>
<p>基本要求：</p>
<ol>
<li>水平方向上需要首尾相连；</li>
<li>因为效果图最终需要切成 <strong>N 等份</strong>，所以尽可能让 <strong>设计图的宽度能被 N 整除</strong>；</li>
<li>图片尺寸不仅要考虑正视图的大小，还要考虑元素在上下旋转时依然能覆盖视野（可选）。</li>
</ol>
<p>当然，上图只是作为背景，我们还可以添加一些小物体素材（与背景图的运动速度不同时，可形成视差效果，增强立体感），如：   <br><span class="img-wrap"><img data-src="/img/remote/1460000006880867?w=516&amp;h=220" src="https://static.alili.tech/img/remote/1460000006880867?w=516&amp;h=220" alt="物体小元素1" title="物体小元素1" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000006880868?w=322&amp;h=339" src="https://static.alili.tech/img/remote/1460000006880868?w=322&amp;h=339" alt="物体小元素2" title="物体小元素2" style="cursor: pointer;"></span><br>小物体元素（虚线用于参考，造物节中共有 21 个小物体）</p>
<p>如上图所示，每个图片也被等分成 M 等份，而且 M 的宽度应该与 N（背景元素）的宽度相等（具体原因，请看文章评论）。</p>
<p>对于顶部和底图图片，则无特殊要求。</p>
<h4>实景类</h4>
<p>如果想制作实景的全景效果，可以看看 Google 街景：  </p>
<p><a href="https://www.google.com/streetview/publish/" rel="nofollow noreferrer" target="_blank">Google 街景</a> 推荐的设备如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000006880869?w=1000&amp;h=1640" src="https://static.alili.tech/img/remote/1460000006880869?w=1000&amp;h=1640" alt="Google 街景推荐的设备" title="Google 街景推荐的设备" style="cursor: pointer; display: inline;"></span></p>
<p>如上图，最实惠的方式就是最后一个选项——<a href="https://www.google.com/streetview/apps/" rel="nofollow noreferrer" target="_blank">Google 街景 APP</a>，该应用提供了全景相机功能，但正如图片介绍所说，这是需要练习的，因此对操作要求比较高。</p>
<p>补充：<br>上周六（2016.8.20）参加了 TGDC 的分享会，嘉宾分享了他们处理全景的方式：</p>
<ol>
<li>利用 RICOH THETA S 等专业设备拍出全景图</li>
<li>导出静态图像</li>
<li>利用设备专门提供的 APP 或 krpamo tools、pano2vr、Glsky box 等工具将静态图像转为 6 张图</li>
<li>利用 Web 技术制作可交互的全景图</li>
</ol>
<p>其中 Web 技术有以下 3 种可选方式（当然，还有其它）：</p>
<ul>
<li>CSS3（本文所提及的方式）</li>
<li>Three.js</li>
<li>krpano（为全景而生，低级浏览器则回退到 Flash），<a href="http://krpano.com/docu/tutorials/quickstart/?from=groupmessage&amp;isappinstalled=0#top" rel="nofollow noreferrer" target="_blank">查看教程</a>
</li>
</ul>
<p>当时，嘉宾现场快速制作的 <a href="http://wt.qq.com/act/tgdc_lottery/lottery.html" rel="nofollow noreferrer" target="_blank">会议现场全景</a>。</p>
<p>可见，优秀硬件设备的出现，大大减少了后期处理的时间，而 Web 则提供了一个很好的展现平台。</p>
<hr>
<h3 id="articleHeader4">最后</h3>
<p>随着终端设备的软硬件不断完善和提高，Web 在 3D 领域也不甘落后，如果你玩腻了 2D 的 H5 或者想为用户提供更加新颖优秀的体验，全景也许是一种选择。</p>
<p>最后，如有不清晰或不明白的地方，可以留言，我会尽可能解决的。谢谢谢~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS 3D Panorama（全景） - 淘宝造物节技术剖析

## 原文链接
[https://segmentfault.com/a/1190000006880856](https://segmentfault.com/a/1190000006880856)

