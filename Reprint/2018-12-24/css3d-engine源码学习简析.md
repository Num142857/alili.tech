---
title: 'css3d-engine源码学习简析' 
date: 2018-12-24 2:30:07
hidden: true
slug: 2tna69lc9nr
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">开始</h1>
<p>从这里开始准备攻略webgl（准备挖新坑），Flutter框架当然也会继续补充，但是今天学习的不是webgl，而是<a href="https://github.com/shrekshrek/css3d-engine" rel="nofollow noreferrer" target="_blank">css3d-engine</a>这个库，因为之前搞活动看到了一个全景旋转活动就是使用这个库完成，颇为惊艳（一开始以为是webgl实现的，但是看了代码才知道用CSS3就可以完成，虽然觉得还是应该用webgl做比较合适），抱着好奇心于是学习一下，嗯，这个库设计相当精简，整个库的代码才800多行，所以代码看下来没啥压力，今天顺着一个例子来分析一下。</p>
<h1 id="articleHeader1">全景旋转</h1>
<p>首先学习一下基础坐标系：<br><span class="img-wrap"><img data-src="/img/bVqE7v" src="https://static.alili.tech/img/bVqE7v" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>这个只要记住一下x,y,z轴各自方向就可以，下面分析会用到。</p>
<p>接下来就是今天分析的例子，也是来自css3d-engine的例子：<br><span class="img-wrap"><img data-src="/img/bVY65p?w=1209&amp;h=901" src="https://static.alili.tech/img/bVY65p?w=1209&amp;h=901" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>一个不停旋转的全景图，当然我们把镜头拉开一点，发现其实它是一个圆柱体不停在旋转：<br><span class="img-wrap"><img data-src="/img/bVY650?w=864&amp;h=888" src="https://static.alili.tech/img/bVY650?w=864&amp;h=888" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>只是我们的镜头刚好在圆柱体的里面，所以就看到全景图不停在旋转了。</p>
<p>再接着分析构建整个场景的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var s = new C3D.Stage();
 s.size(window.innerWidth, window.innerHeight).material({
    color: &quot;#cccccc&quot;
 }).update();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code> <span class="hljs-keyword">var</span> s = <span class="hljs-keyword">new</span> C3D.Stage();
 s.size(<span class="hljs-built_in">window</span>.innerWidth, <span class="hljs-built_in">window</span>.innerHeight).material({
    color: <span class="hljs-string">"<span class="hljs-subst">#cccccc</span>"</span>
 }).update();</code></pre>
<p>这里会初始化整个舞台，也会创建默认的摄像机：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="initialize: function (params) {
    ...
    this.el.style[prefix + 'Perspective'] = '800px';
    this.el.style[prefix + 'TransformStyle'] = 'flat';
    this.el.style[prefix + 'Transform'] = '';
    this.el.style.overflow = 'hidden';
    
    this.__rfix = new C3D.Sprite();
    this.el.appendChild(this.__rfix.el);
    
    this.__pfix = new C3D.Sprite();
    this.__rfix.el.appendChild(this.__pfix.el);
    
    this.setCamera(new C3D.Camera());
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>initialize: function (params) {
    ...
    <span class="hljs-keyword">this</span>.el.style[prefix + <span class="hljs-string">'Perspective'</span>] = <span class="hljs-string">'800px'</span>;
    <span class="hljs-keyword">this</span>.el.style[prefix + <span class="hljs-string">'TransformStyle'</span>] = <span class="hljs-string">'flat'</span>;
    <span class="hljs-keyword">this</span>.el.style[prefix + <span class="hljs-string">'Transform'</span>] = <span class="hljs-string">''</span>;
    <span class="hljs-keyword">this</span>.el.style.overflow = <span class="hljs-string">'hidden'</span>;
    
    <span class="hljs-keyword">this</span>.__rfix = new C3D.Sprite();
    <span class="hljs-keyword">this</span>.el.appendChild(<span class="hljs-keyword">this</span>.__rfix.el);
    
    <span class="hljs-keyword">this</span>.__pfix = new C3D.Sprite();
    <span class="hljs-keyword">this</span>.__rfix.el.appendChild(<span class="hljs-keyword">this</span>.__pfix.el);
    
    <span class="hljs-keyword">this</span>.setCamera(new C3D.Camera());
}</code></pre>
<p>Stage初始化的时候，设置默认的perspective是设为800px，而且会创建两个Sprite辅助构建场景（这两个Sprite作用相当的大，场景旋转，拉进拉远都是靠这两个Sprite），最后设置摄像机；当调起update方法然后会顺着调起Stage的updateT方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="updateT: function () {
            this.fov = fixed0(0.5 / Math.tan((this.camera.fov * 0.5) / 180 * Math.PI) * this.height);
            this.el.style[prefix + 'Perspective'] = this.fov + 'px';
            this.__rfix.position(fixed0(this.width / 2), fixed0(this.height / 2), this.fov).rotation(-this.camera.rotationX, -this.camera.rotationY, -this.camera.rotationZ).updateT();
            this.__pfix.position(-this.camera.x, -this.camera.y, -this.camera.z).updateT();
            return this;
        }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>updateT: function () {
            <span class="hljs-keyword">this</span>.fov = fixed0(<span class="hljs-number">0.5</span> / Math.tan((<span class="hljs-keyword">this</span>.camera.fov * <span class="hljs-number">0.5</span>) / <span class="hljs-number">180</span> * Math.PI) * <span class="hljs-keyword">this</span>.height);
            <span class="hljs-keyword">this</span>.el.style[prefix + <span class="hljs-string">'Perspective'</span>] = <span class="hljs-keyword">this</span>.fov + <span class="hljs-string">'px'</span>;
            <span class="hljs-keyword">this</span>.__rfix.position(fixed0(<span class="hljs-keyword">this</span>.width / <span class="hljs-number">2</span>), fixed0(<span class="hljs-keyword">this</span>.height / <span class="hljs-number">2</span>), <span class="hljs-keyword">this</span>.fov).rotation(-<span class="hljs-keyword">this</span>.camera.rotationX, -<span class="hljs-keyword">this</span>.camera.rotationY, -<span class="hljs-keyword">this</span>.camera.rotationZ).updateT();
            <span class="hljs-keyword">this</span>.__pfix.position(-<span class="hljs-keyword">this</span>.camera.x, -<span class="hljs-keyword">this</span>.camera.y, -<span class="hljs-keyword">this</span>.camera.z).updateT();
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
        },</code></pre>
<p>这里可以算是整个Stage计算的核心了，首先是Stage的fov计算，它依赖了Camera的fov，而Camera的fov默认就是75（因为人的有效视角就是75度），接着整个计算其实就是一个已知角度和对边求邻边的公式：<br><span class="img-wrap"><img data-src="/img/bVY705?w=858&amp;h=599" src="https://static.alili.tech/img/bVY705?w=858&amp;h=599" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这里计算方式其实出自Three.js，<a href="https://github.com/mrdoob/three.js/issues/1239" rel="nofollow noreferrer" target="_blank">github上的讨论</a>。<br>回到Stage刚才初始化的时候，一开始一口气创建三个嵌套的div:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--示例，方便分析-->
<div id=&quot;stage&quot;>
    <div id=&quot;__rfix&quot;>
        <div id=&quot;__pfix&quot;></div>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!--示例，方便分析--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"stage"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"__rfix"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"__pfix"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>我们在stage设置好perspective属性，在我的电脑（全屏）上计算出来的是619px，根据刚才的公式，是跟大家的浏览器高度有关，然后设置__rfix元素位置：屏幕居中，重点是Z轴位置的设置，可以看到设置的刚计算出来perspective等于translateZ(619px)，所以现在的位置（记住一开始的坐标系，往屏幕外的为正，也就靠近视点）：<br><span class="img-wrap"><img data-src="/img/bVY77x?w=821&amp;h=521" src="https://static.alili.tech/img/bVY77x?w=821&amp;h=521" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>然后设置__pfix的位置，Z轴方向上，取了摄像机相反的方向，因为我们一般理解摄像机拉远拉近都是摄像机在移动，但是整个场景往相反方向移动其实也可以达到相同效果，所以这里就是整个场景移动来到做到的：<br><span class="img-wrap"><img data-src="/img/bVY79w?w=830&amp;h=526" src="https://static.alili.tech/img/bVY79w?w=830&amp;h=526" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>现在再看，在刚才代码可以看到当camera的x,y,z更新的时候，其实通过位移__pfix来做到的；而camera的rotateX,rotageY,rotateZ更新的时候，则是通过旋转__rfix来做到的。为什么这样的设置，我们刚才看到__rfix把tranlateZ设置到视点上，其实目的是为了让后面的元素可以以视点为原点进行布局，这样我们布局时可以通过控制跟视点的距离进而控制用户视野；而旋转的时候也可以以视点为原点进行旋转，x，y，z移动也是以视点为原点进行，可以想象当镜头拉远200px，再沿x轴旋转45度的场景。</p>
<p>基本舞台的构建已经明白了，继续全景旋转是怎样做出来的：<br>首先整个场景是由20张129*1170的图片组成一个圆柱体，那么这个圆柱体的半径是多少尼？通过以下计算：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="0.5* 129 / Math.tan(360 / 20 / 2 / 180 * Math.PI)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;"><span class="hljs-number">0.5</span>* <span class="hljs-number">129</span> / Math.tan(<span class="hljs-number">360</span> / <span class="hljs-number">20</span> / <span class="hljs-number">2</span> / <span class="hljs-number">180</span> * Math.<span class="hljs-literal">PI</span>)</code></pre>
<p>得出407px，所以代码上把整个场景放到-400px也是应该根据这个半径得出来的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var pano = this.createPano(bgData, panoRect);
  pano.position(0, 0, -400).updateT();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>  <span class="hljs-keyword">var</span> pano = <span class="hljs-keyword">this</span>.createPano(bgData, panoRect);
  pano.position(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">-400</span>).updateT();</code></pre>
<p>所以现在整个场景是这样的(可能椭圆更合适一点):<br><span class="img-wrap"><img data-src="/img/bVY8xB?w=627&amp;h=529" src="https://static.alili.tech/img/bVY8xB?w=627&amp;h=529" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h1 id="articleHeader2">总结</h1>
<p>这个库还是很不错的库，也学习到一些3D相关的知识，可以考虑怎样融入日常的活动或者页面里面，增加吸引力。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css3d-engine源码学习简析

## 原文链接
[https://segmentfault.com/a/1190000012148527](https://segmentfault.com/a/1190000012148527)

