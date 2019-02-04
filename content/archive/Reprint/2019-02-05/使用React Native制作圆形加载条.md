---
title: '使用React Native制作圆形加载条' 
date: 2019-02-05 2:30:09
hidden: true
slug: v6o5kjf4voo
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVCkNJ" src="https://static.alili.tech/img/bVCkNJ" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>先放运行截图说明做什么吧，</p>
<p><span class="img-wrap"><img data-src="/img/bVCkND" src="https://static.alili.tech/img/bVCkND" alt="vued467c4a48f880b36ace99599d3f2d776f.png" title="vued467c4a48f880b36ace99599d3f2d776f.png" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://github.com/JackPu/react-native-percentage-circle" rel="nofollow noreferrer" target="_blank">react-native-percentage-circle 项目地址</a></p>
<p>最近需求需要一个显示百分比的加载条。然而去搜索了很久，没能发现比较满意的组件，只好自己解决了。当然对于大多数前端而言，这个并不是特别难的，可能思路众多，然而面对React Native似乎就有点相形见绌了。解决这样的问题，我们还是得回归前端本身，看看有什么可以嫁接的方案没。</p>
<h3 id="articleHeader0">前端常规制作进度条方法</h3>
<p>前端实现相对容易点，我们可以用canvas去绘制圆，也可以用SVG去绘制.</p>
<h4>使用SVG</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<svg style=&quot;width:2.8rem&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; xmlns:xlink=&quot;http://www.w3.org/1999/xlink&quot; x=&quot;0px&quot; y=&quot;0px&quot; viewBox=&quot;0 0 130 130&quot; overflow=&quot;visible&quot; enable-background=&quot;new 0 0 130 130&quot; id=&quot;progress&quot;>
    <circle fill=&quot;none&quot; stroke=&quot;#ccc&quot; stroke-width=&quot;4&quot; stroke-miterlimit=&quot;10&quot; cx=&quot;64.8&quot; cy=&quot;64.8&quot; r=&quot;59.8&quot;></circle>
    <circle class=&quot;styled&quot; fill=&quot;none&quot; stroke=&quot;#2ecc71&quot; stroke-width=&quot;4&quot; stroke-miterlimit=&quot;10&quot; cx=&quot;64.8&quot; cy=&quot;64.8&quot; r=&quot;59.8&quot; style=&quot;stroke-dashoffset: -93.9336; stroke-dasharray: 375.734;&quot;></circle>
 
 </svg>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:2.8rem"</span> <span class="hljs-attr">version</span>=<span class="hljs-string">"1.1"</span> <span class="hljs-attr">xmlns</span>=<span class="hljs-string">"http://www.w3.org/2000/svg"</span> <span class="hljs-attr">xmlns:xlink</span>=<span class="hljs-string">"http://www.w3.org/1999/xlink"</span> <span class="hljs-attr">x</span>=<span class="hljs-string">"0px"</span> <span class="hljs-attr">y</span>=<span class="hljs-string">"0px"</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">"0 0 130 130"</span> <span class="hljs-attr">overflow</span>=<span class="hljs-string">"visible"</span> <span class="hljs-attr">enable-background</span>=<span class="hljs-string">"new 0 0 130 130"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"progress"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">circle</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">"none"</span> <span class="hljs-attr">stroke</span>=<span class="hljs-string">"#ccc"</span> <span class="hljs-attr">stroke-width</span>=<span class="hljs-string">"4"</span> <span class="hljs-attr">stroke-miterlimit</span>=<span class="hljs-string">"10"</span> <span class="hljs-attr">cx</span>=<span class="hljs-string">"64.8"</span> <span class="hljs-attr">cy</span>=<span class="hljs-string">"64.8"</span> <span class="hljs-attr">r</span>=<span class="hljs-string">"59.8"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">circle</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">circle</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"styled"</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">"none"</span> <span class="hljs-attr">stroke</span>=<span class="hljs-string">"#2ecc71"</span> <span class="hljs-attr">stroke-width</span>=<span class="hljs-string">"4"</span> <span class="hljs-attr">stroke-miterlimit</span>=<span class="hljs-string">"10"</span> <span class="hljs-attr">cx</span>=<span class="hljs-string">"64.8"</span> <span class="hljs-attr">cy</span>=<span class="hljs-string">"64.8"</span> <span class="hljs-attr">r</span>=<span class="hljs-string">"59.8"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"stroke-dashoffset: -93.9336; stroke-dasharray: 375.734;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">circle</span>&gt;</span>
 
 <span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span></code></pre>
<p>SVG主要是用<code>Circle</code>进行绘制，关于Circle使用可以看 <a href="http://events.jackpu.com/svg/#/ele-circle-and-ellipse" rel="nofollow noreferrer" target="_blank">这里</a> 。我们先绘制第一个圆，用于底色。接下来我们只需要在上面绘制一个带有色彩的圆(切记不要填充颜色fill="none")。这个时候我们需要了解两个关键的属性;</p>
<p>stroke-dasharray:  用于控制路径绘制中虚线和间距的。例子中的即圆的周长。</p>
<p>stroke-dashoffset: 用于指定距离虚线绘制的起点</p>
<p>如果我们知道了这个的话，我们只需要计算出圆的周长</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CircleLength = R * 2 * Math.PI;

var PercentOffset = － CircleLength * yourPercent;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> CircleLength = R * <span class="hljs-number">2</span> * <span class="hljs-built_in">Math</span>.PI;

<span class="hljs-keyword">var</span> PercentOffset = － CircleLength * yourPercent;</code></pre>
<p>然后将这个第二个Circle属性赋予到style中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="style=&quot;stroke-dashoffset: -93.9336; stroke-dasharray: 375.734;&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;">style="stroke-dashoffset: -93.9336; stroke-dasharray: 375.734;"</code></pre>
<p>SVG相对来说还算是比较易用的解决方案， <a href="http://codepen.io/Jack_Pu/pen/xOowAZ" rel="nofollow noreferrer" target="_blank">Demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="Jack_Pu/pen/xOowAZ" data-typeid="3">点击预览</button>;</p>
<h4>使用 CSS渐变</h4>
<p>还有一个更加直接的方法，就是利用 CSS3 中的<code>linear-gradient</code>：</p>
<p>效果如图：</p>
<p><span class="img-wrap"><img data-src="/img/bVCkNO" src="https://static.alili.tech/img/bVCkNO" alt="vued0540dac2f68979c1a631a5a8e8d1e7de.png" title="vued0540dac2f68979c1a631a5a8e8d1e7de.png" style="cursor: pointer; display: inline;"></span></p>
<p>我们只需要指定line-grdient中通过旋转的角度然后设置好间隔的渐变百分比就行啦。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="background-image:linear-gradient(90deg, transparent 50%, #16a085 50%),     linear-gradient(90deg, #eee 50%, transparent 50%);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">background-image</span><span class="hljs-selector-pseudo">:linear-gradient(90deg</span>, <span class="hljs-selector-tag">transparent</span> 50%, <span class="hljs-selector-id">#16a085</span> 50%),     <span class="hljs-selector-tag">linear-gradient</span>(90<span class="hljs-selector-tag">deg</span>, <span class="hljs-selector-id">#eee</span> 50%, <span class="hljs-selector-tag">transparent</span> 50%);</code></pre>
<p>下图为隐藏掉遮挡的小圆的样子。<br><span class="img-wrap"><img data-src="/img/bVCkNT" src="https://static.alili.tech/img/bVCkNT" alt="vued224f221ee72e1b143419483d5dbd47ea.png" title="vued224f221ee72e1b143419483d5dbd47ea.png" style="cursor: pointer; display: inline;"></span></p>
<p>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".circle1{
  position:relative;
  width:110px;
  height:110px;
  border-radius:100%;
  background-color: #eee;
  background-image:linear-gradient(90deg, transparent 50%, #16a085 50%),     linear-gradient(90deg, #eee 50%, transparent 50%);
 }
.circle2{
  position:relative;
  top:5px;
  left:5px;
  width:100px;
  height:100px;
  border-radius:100%;
  background-color: #fff;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="CSS"><span class="hljs-selector-class">.circle1</span>{
  <span class="hljs-attribute">position</span>:relative;
  <span class="hljs-attribute">width</span>:<span class="hljs-number">110px</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">110px</span>;
  <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">100%</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#eee</span>;
  <span class="hljs-attribute">background-image</span>:<span class="hljs-built_in">linear-gradient</span>(90deg, transparent 50%, #16a085 50%),     <span class="hljs-built_in">linear-gradient</span>(90deg, #eee 50%, transparent 50%);
 }
<span class="hljs-selector-class">.circle2</span>{
  <span class="hljs-attribute">position</span>:relative;
  <span class="hljs-attribute">top</span>:<span class="hljs-number">5px</span>;
  <span class="hljs-attribute">left</span>:<span class="hljs-number">5px</span>;
  <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
  <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">100%</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;circle1&quot;>
    <div class=&quot;circle2&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"circle1"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"circle2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><a href="http://codepen.io/Jack_Pu/pen/xOowAZ" rel="nofollow noreferrer" target="_blank">DEMO</a><button class="btn btn-xs btn-default ml10 preview" data-url="Jack_Pu/pen/xOowAZ" data-typeid="3">点击预览</button></p>
<h4>使用CSS Transform</h4>
<p>如果要用Transform 的话，这个脑洞就比较大了，解决的方案也有很多，今天自己分享一个相对不烧脑的解决方案：</p>
<p><span class="img-wrap"><img data-src="/img/bVCkOr" src="https://static.alili.tech/img/bVCkOr" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>图3-1</p>
<p><span class="img-wrap"><img data-src="/img/bVCkNW" src="https://static.alili.tech/img/bVCkNW" alt="vueda8bd72e3f10eb74cfde516ac3cce26f0.png" title="vueda8bd72e3f10eb74cfde516ac3cce26f0.png" style="cursor: pointer;"></span><br>图3-2</p>
<p>如图 我们需要建立一个外部的圆，也就是用于绘制灰色的底色，然后再用一个区域进行层级遮挡(也可以自己用border来模拟啦)。记住属性一定要有<code>overflow:hidden</code>.</p>
<p>接下来我们需要添加左右两个分区，用于放置进行彩条绘制的容器。如图3-1我们设置左分区一个，里面是一个左半圆，而这个半圆距离容器距离是100%,默认是不可见的。然后它需要围绕圆心旋转，比较巧妙的是，它需要旋转过180度后，才会回到它的父容器可见区域。如图3-2同理我们可以设置右半区，然后将半圆放在-100%的距离，即右半圆默认也不可见的。当它开始旋转的时候即如下图红色区域就是我们的角度：<br><span class="img-wrap"><img data-src="/img/bVCkN1" src="https://static.alili.tech/img/bVCkN1" alt="vued702057d32db43d43e19852eb09441d57.png" title="vued702057d32db43d43e19852eb09441d57.png" style="cursor: pointer; display: inline;"></span></p>
<p>注意由于是两个圆进行配合，因此角度过180度，时候，左半圆则开始旋转，而右半圆则保持180度即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left-wrap{
    overflow: hidden;
    position: absolute;
    left:0;
    top:0;
    width: 50%;
    height:100%;
    
}
.left-wrap .loader{
    position: absolute;
    left:100%;
    top:0;
    width:100%;
    height:100%;
    border-radius: 1000px;
    background-color: #333; 
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    transform-origin:0 50% 0;
}
// 省略一些右半区代码

.right-wrap{
    ....
    left:50%;
}
.right-wrap .loader{ 
    ...
    left:-100%;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;    
    transform-origin:100% 50% 0;    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="less hljs"><code class="less"><span class="hljs-selector-class">.left-wrap</span>{
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">100%</span>;
    
}
<span class="hljs-selector-class">.left-wrap</span> <span class="hljs-selector-class">.loader</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">1000px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#333</span>; 
    <span class="hljs-attribute">border-top-left-radius</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-bottom-left-radius</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform-origin</span>:<span class="hljs-number">0</span> <span class="hljs-number">50%</span> <span class="hljs-number">0</span>;
}
<span class="hljs-comment">// 省略一些右半区代码</span>

<span class="hljs-selector-class">.right-wrap</span>{
    ....
    <span class="hljs-selector-tag">left</span><span class="hljs-selector-pseudo">:50</span>%;
}
<span class="hljs-selector-class">.right-wrap</span> <span class="hljs-selector-class">.loader</span>{ 
    ...
    <span class="hljs-selector-tag">left</span><span class="hljs-selector-pseudo">:-100</span>%;
    <span class="hljs-attribute">border-bottom-right-radius</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-top-right-radius</span>: <span class="hljs-number">0</span>;    
    <span class="hljs-attribute">transform-origin</span>:<span class="hljs-number">100%</span> <span class="hljs-number">50%</span> <span class="hljs-number">0</span>;    
}</code></pre>
<p><a href="http://codepen.io/Jack_Pu/pen/citru" rel="nofollow noreferrer" target="_blank">DEMO</a><button class="btn btn-xs btn-default ml10 preview" data-url="Jack_Pu/pen/citru" data-typeid="3">点击预览</button></p>
<p>这些就是前端的一些解决方法当然你也可以选择开源的框架，比如:</p>
<ul>
<li><p><a href="https://github.com/toubou91/percircle" rel="nofollow noreferrer" target="_blank">CSS percentage circle built with jQuery</a></p></li>
<li><p><a href="https://kimmobrunfeldt.github.io/progressbar.js/" rel="nofollow noreferrer" target="_blank">progressbar.js</a></p></li>
<li><p><a href="https://github.com/afuersch/css-percentage-circle" rel="nofollow noreferrer" target="_blank">Pure CSS percentage circle</a></p></li>
</ul>
<h3 id="articleHeader1">如何使用React Native写这样的进度条呢？</h3>
<p>前面的前端思路自己倒是有了，于是觉得很easy嘛，不过在开始写的时候发现 尴尬了。 SVG成本比较大，你需要安装依赖<a href="https://github.com/react-native-community/react-native-svg" rel="nofollow noreferrer" target="_blank">react-native-art-svg</a>。用渐变的话，当然也比较麻烦，也需呀安装依赖，自己内心觉得：画一个圆至于么！！！</p>
<p>于是乎开始自己造轮子了，采用了第三种方案，就用view + transform进行组件封装。才开始还挺顺的，不过看官方文档，发现没有对 transform origin支持。虽然支持了rotate ,scale,translate，但是发现这个缺陷，无疑陷入一丝困境。随后发现有人早已提了自己的<a href="https://github.com/facebook/react-native/pull/2106" rel="nofollow noreferrer" target="_blank">pr</a>给官方，希望得到支持。类似于 <code>transformOrgin:{x:100}</code>这样子。 当然目前最新版依旧没有纳入到计划中。不过官方支持了transformMatrix , 这个虽好，可是楼主数学却是渣，能不能有一个让学渣快速理解的方案。</p>
<blockquote><p>The transform-origin property lets you modify the origin for transformations of an element. For example, the transform-origin of the rotate() function is the centre of rotation. (This property is applied by first translating the element by the negated value of the property, then applying the element's transform, then translating by the property value.)</p></blockquote>
<p>大致意思就是这个属性在进行选择时指定origin的时候，会先将元素平移过去，然后再移回来。所以我们可以在旋转时这样指定：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<View style={[styles.leftWrap,{
  // ....
  <View style={[styles.loader,{
     ...  radius: 半径
     transform:[{translateX:-this.props.radius/2},{rotate:this.state.leftTransformerDegree},{translateX:this.props.radius/2}],  
     }]}></View>
 </View>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;View style={[styles.leftWrap,{
  <span class="hljs-comment">// ....</span>
  &lt;View style={[styles.loader,{
     ...  radius: 半径
     transform:[{<span class="hljs-attr">translateX</span>:-<span class="hljs-keyword">this</span>.props.radius/<span class="hljs-number">2</span>},{<span class="hljs-attr">rotate</span>:<span class="hljs-keyword">this</span>.state.leftTransformerDegree},{<span class="hljs-attr">translateX</span>:<span class="hljs-keyword">this</span>.props.radius/<span class="hljs-number">2</span>}],  
     }]}&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span></span>
 &lt;<span class="hljs-regexp">/View&gt;</span></code></pre>
<p>这样自己就可以解决transform origin的问题了。这样写进度就非常easy 啦。自己简单封装了这个组件 <a href="https://github.com/JackPu/react-native-percentage-circle" rel="nofollow noreferrer" target="_blank">react-native-percentage-circle</a></p>
<p>简单开始：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i react-native-percentage-circle --save
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">npm i react-native-percentage-circle --save
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import PercentageCircle from 'react-native-percentage-circle';

//...

redner() {
  <View>
    <PercentageCircle radius={35} percent={50} color={&quot;#3498db&quot;}></PercentageCircle>  
  </View>
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-keyword">import</span> PercentageCircle <span class="hljs-keyword">from</span> <span class="hljs-string">'react-native-percentage-circle'</span>;

<span class="hljs-comment">//...</span>

redner() {
  &lt;View&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">PercentageCircle</span> <span class="hljs-attr">radius</span>=<span class="hljs-string">{35}</span> <span class="hljs-attr">percent</span>=<span class="hljs-string">{50}</span> <span class="hljs-attr">color</span>=<span class="hljs-string">{</span>"#<span class="hljs-attr">3498db</span>"}&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">PercentageCircle</span>&gt;</span></span>  
  &lt;<span class="hljs-regexp">/View&gt;
}
</span></code></pre>
<p>选项说明</p>
<table>
<thead><tr>
<th>Props</th>
<th align="center">Type</th>
<th align="right">Example</th>
<th align="right">Description</th>
</tr></thead>
<tbody>
<tr>
<td>color</td>
<td align="center">string</td>
<td align="right">'#000'</td>
<td align="right">进度条颜色</td>
</tr>
<tr>
<td>percent</td>
<td align="center">Number</td>
<td align="right">30</td>
<td align="right">百分之多少</td>
</tr>
<tr>
<td>radius</td>
<td align="center">Number</td>
<td align="right">20</td>
<td align="right"> 圆的半径</td>
</tr>
</tbody>
</table>
<p>当然目前的参数自己想到的就这些，当然大家可以自己写，也可以提PR ,将它扩展。</p>
<p>文章同步博客 : <a href="http://www.jackpu.com/shi-yong-react-nativezhi-zuo-yuan-xing-jia-zai-tiao/" rel="nofollow noreferrer" target="_blank">http://www.jackpu.com/shi-yon...</a></p>
<h3 id="articleHeader2">参考</h3>
<ul>
<li><p><a href="https://developer.mozilla.org/en/docs/Web/SVG/Attribute/stroke-dasharray" rel="nofollow noreferrer" target="_blank">stroke-dasharray MDN</a></p></li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient" rel="nofollow noreferrer" target="_blank">linear-gradient MDN</a></p></li>
<li><p><a href="http://www.zhangxinxu.com/life/2016/07/2016-year-center/" rel="nofollow noreferrer" target="_blank">理解CSS3 transform中的Matrix(矩阵)</a></p></li>
<li><p><a href="http://www.useragentman.com/blog/2011/01/07/css3-matrix-transform-for-the-mathematically-challenged/" rel="nofollow noreferrer" target="_blank">The CSS3 matrix() Transform for the Mathematically Challenged</a></p></li>
<li><p><a href="https://facebook.github.io/react-native/docs/transforms.html" rel="nofollow noreferrer" target="_blank">React Native Transforms</a></p></li>
<li><p><a href="https://github.com/facebook/react-native/issues/1964" rel="nofollow noreferrer" target="_blank">transform-origin support</a></p></li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin" rel="nofollow noreferrer" target="_blank">transform-origin</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用React Native制作圆形加载条

## 原文链接
[https://segmentfault.com/a/1190000006714122](https://segmentfault.com/a/1190000006714122)

