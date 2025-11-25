---
title: '巧妙使用transform实现环形路径平移动画' 
date: 2019-02-01 2:30:10
hidden: true
slug: zmep5j7bvc
categories: [reprint]
---

{{< raw >}}

                    
<p>最近在<a href="https://github.com/cssmagic/CSS-Secrets" rel="nofollow noreferrer" target="_blank">CSS Secrets</a>一书看到了这样一节：让一个元素沿环形路径平移。这是一个css动画的问题，但却没有看上去那么简单，其关键点是<strong>元素是平移的</strong>，也就是说，元素自身并不发生旋转，只是稳定地沿着一个环形的路径移动，像这样：</p>
<p><span class="img-wrap"><img data-src="/img/bVFiNH?w=400&amp;h=212" src="https://static.alili.tech/img/bVFiNH?w=400&amp;h=212" alt="环形路径平移" title="环形路径平移" style="cursor: pointer; display: inline;"></span></p>
<p>在书中作者Lea Verou已经给出了解答（实际上，可以追溯到作者更早的<a href="http://lea.verou.me/2012/02/moving-an-element-along-a-circle/" rel="nofollow noreferrer" target="_blank">这篇博文</a>），不过，我认为再补充一点周边细节知识可能会更易于理解。因此，本文整理了一些东西，将尝试更详细地解答这个问题。</p>
<h2 id="articleHeader0">从旋转动画开始</h2>
<p>最开始看到这个问题的时候，会很容易想到用<code>transform-origin</code>定义圆心的位置，然后用<code>rotate()</code>进行旋转。css代码大概是这样（半径为150px）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes spin {
    to {
        transform: rotate(1turn);
    }
}

.avatar{
    animation: spin 10s infinite linear;
    transform-origin: 50% 150px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> spin {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(1turn);
    }
}

<span class="hljs-selector-class">.avatar</span>{
    <span class="hljs-attribute">animation</span>: spin <span class="hljs-number">10s</span> infinite linear;
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">50%</span> <span class="hljs-number">150px</span>;
}</code></pre>
<p>搭配的html很简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img class=&quot;avatar&quot; src=&quot;edwardup_avatar.jpg&quot; alt=&quot;&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"avatar"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"edwardup_avatar.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> /&gt;</span></code></pre>
<p>对应的效果是：</p>
<p><span class="img-wrap"><img data-src="/img/bVFiNJ?w=400&amp;h=200" src="https://static.alili.tech/img/bVFiNJ?w=400&amp;h=200" alt="环形旋转" title="环形旋转" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到，这是一个旋转动画，元素在沿着环形路径移动的同时，自身也会围绕圆心发生旋转。因此，这并不是我们想要的平移效果。</p>
<p>但另一方面，元素沿环形路径移动这一点是符合我们的目标的。所以，可以在这个基础上思考如何改进。</p>
<h2 id="articleHeader1">利用多元素的变形相消</h2>
<p>w3c的<a href="https://www.w3.org/TR/css-transforms-1/#transform-function-lists" rel="nofollow noreferrer" target="_blank">The Transform Function Lists</a>里提到：</p>
<blockquote><p>If a list of &lt;transform-function&gt; is provided, then the net effect is as if each transform function had been specified separately in the order provided.</p></blockquote>
<p>意思是，<strong>当一个元素的<code>transform</code>添加了多个变换函数时，其效果等同于按照这些变换函数的顺序依次分散添加在多层元素中</strong>。例如，以下元素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div style=&quot;transform:translate(-10px,-20px) scale(2) rotate(45deg) translate(5px,10px)&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"transform:translate(-10px,-20px) scale(2) rotate(45deg) translate(5px,10px)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>其变换结果等效于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div style=&quot;transform:translate(-10px,-20px)&quot;>
  <div style=&quot;transform:scale(2)&quot;>
    <div style=&quot;transform:rotate(45deg)&quot;>
      <div style=&quot;transform:translate(5px,10px)&quot;>
      </div>
    </div>
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"transform:translate(-10px,-20px)"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"transform:scale(2)"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"transform:rotate(45deg)"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"transform:translate(5px,10px)"</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>这是一条非常有用的规则。现在，假如有一个应用了旋转变换函数的元素是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div style=&quot;transform:rotate(45deg) rotate(-45deg)&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"transform:rotate(45deg) rotate(-45deg)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>显然，这个元素其实是没有旋转的，因为两个旋转变换函数刚好抵消。这时候，我们再用一下前面的规则，就知道它等同于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div style=&quot;transform:rotate(45deg)&quot;>
    <div style=&quot;transform:rotate(-45deg)&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"transform:rotate(45deg)"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"transform:rotate(-45deg)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>也就是说，<strong>内层元素可以通过变形来抵消外层的变形效果</strong>。</p>
<p>现在回到旋转动画，既然元素已经是沿环形路径移动了，我们要做的就是抵消掉元素自身的旋转。参考上面的原理，我们可以增加一个容器元素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;avatar&quot;>
    <img src=&quot;edwardup_avatar.jpg&quot; alt=&quot;&quot; />
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"avatar"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"edwardup_avatar.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>然后为它们搭配不同的动画：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes spin {
    to { transform: rotate(1turn); }
}
@keyframes spin-reverse {
    from { transform: rotate(1turn); }
}
.avatar {
    animation: spin 10s infinite linear;
    transform-origin: 50% 150px;
}
.avatar > img {
    animation: spin-reverse 10s infinite linear;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> spin {
    <span class="hljs-selector-tag">to</span> { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(1turn); }
}
@<span class="hljs-keyword">keyframes</span> spin-reverse {
    <span class="hljs-selector-tag">from</span> { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(1turn); }
}
<span class="hljs-selector-class">.avatar</span> {
    <span class="hljs-attribute">animation</span>: spin <span class="hljs-number">10s</span> infinite linear;
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">50%</span> <span class="hljs-number">150px</span>;
}
<span class="hljs-selector-class">.avatar</span> &gt; <span class="hljs-selector-tag">img</span> {
    <span class="hljs-attribute">animation</span>: spin-reverse <span class="hljs-number">10s</span> infinite linear;
}</code></pre>
<p>这段代码把旋转动画搬到了<code>div.avatar</code>这个容器元素上，然后为<code>&lt;img&gt;</code>元素添加了一个刚好相反的旋转动画。</p>
<p>运行一下，会发现这就是我们想要达到的效果（参见文章开头的图）。</p>
<h2 id="articleHeader2">只使用单个元素</h2>
<p>在前面的解决方案中，为了让元素自身不发生旋转，增加了额外的容器元素。那么，如果<strong>只用单个元素</strong>，有办法实现吗？</p>
<h3 id="articleHeader3">多transform-origin的问题</h3>
<p>前面说过，一个元素的多个变换函数可以分散给多层元素。反过来，多层元素的变换函数，也可以集中到单个元素。</p>
<p>这个思路是可行的，只不过，有一个必须解决的问题，就是<code>transform-origin</code>。</p>
<p>在两个元素的解决方案中，<code>div.avatar</code>设置了<code>transform-origin</code>为另一个点（环形路径的圆心），而<code>&lt;img&gt;</code>的<code>transform-origin</code>则取默认值，也就是图片的中心（<code>50%, 50%</code>），这两个变形原点是不一样的：</p>
<p><span class="img-wrap"><img data-src="/img/bVFiNX?w=400&amp;h=212" src="https://static.alili.tech/img/bVFiNX?w=400&amp;h=212" alt="多个transform-oirgin" title="多个transform-oirgin" style="cursor: pointer;"></span></p>
<p>在现在的css中，我们并不能为单个元素同时指定多个<code>transform-origin</code>（尽管在<code>@keyframes</code>的不同关键帧可以设置不同的值），所以，我们需要一点特别的技巧。</p>
<h3 id="articleHeader4">transform-origin的本质</h3>
<p>我们知道，一个元素最终的变形效果，与<code>transform</code>及<code>transform-origin</code>都有关。事实上，在w3c规范中，使用了<strong>transformation matrix</strong>一词来代表这个最终变形效果（从数学角度来说，一般用一个矩阵来表示从一个坐标系到另一个坐标系的变换效果）。</p>
<p>参考w3c的<a href="https://www.w3.org/TR/css-transforms-1/#transformation-matrix-computation" rel="nofollow noreferrer" target="_blank">Transformation Matrix Computation</a>，我们可以知道transformation matrix是这样计算的：</p>
<ul>
<li><p>[1] 从一个单位矩阵（identity matrix）开始</p></li>
<li><p>[2] 根据<code>transform-origin</code>的x、y、z坐标值，进行平移（translate）</p></li>
<li><p>[3] 从左向右依次对<code>transform</code>里的变换函数执行乘法</p></li>
<li><p>[4] 根据<code>transform-origin</code>的x、y、z坐标值，进行<strong>反向</strong>平移</p></li>
</ul>
<p>注意<code>transform-origin</code>在这里被表述为两次方向相反的平移，也就是说，<code>transform-origin</code>并不是什么特别的东西，它可以被<code>translate()</code>替代。</p>
<p>在CSS Secrets一书中，作者Lea Verou也引用了css变形规范的当时的一位编辑Aryeh Gregor的这样一句话：</p>
<blockquote><p><strong>transform-origin 只是一个语法糖而已。实际上你总是可以用 translate() 来代替它</strong>。</p></blockquote>
<p>举例来说，这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".avatar{
    transform: rotate(30deg);
    transform-origin: 200px 300px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.avatar</span>{
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(30deg);
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">200px</span> <span class="hljs-number">300px</span>;
}</code></pre>
<p>等效于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".avatar{
    transform: translate(200px, 300px) rotate(30deg) translate(-200px, -300px);
    transform-origin: 0 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.avatar</span>{
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(200px, 300px) <span class="hljs-built_in">rotate</span>(30deg) <span class="hljs-built_in">translate</span>(-200px, -300px);
    <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
}</code></pre>
<p>了解到这一点，我们就有办法继续了。</p>
<h3 id="articleHeader5">精简的单元素解决方案</h3>
<p>利用前面的原理，我们把前面两个元素的<code>transform-origin</code>的差异抹去（全部变为<code>transform-origin: 0 0;</code>的等效），转移到<code>transform</code>上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes spin {
    from { transform: translate(50%, 150px) rotate(0turn) translate(-50%, -150px); }
    to { transform: translate(50%, 150px) rotate(1turn) translate(-50%, -150px); }
}
@keyframes spin-reverse {
    from { transform: translate(50%, 50%) rotate(1turn) translate(-50%, -50%); }
    to { transform: translate(50%, 50%) rotate(0turn) translate(-50%, -50%); }
}
.avatar {
    animation: spin 10s infinite linear;
}
.avatar > img {
    animation: spin-reverse 10s infinite linear;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> spin {
    <span class="hljs-selector-tag">from</span> { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(50%, 150px) <span class="hljs-built_in">rotate</span>(0turn) <span class="hljs-built_in">translate</span>(-50%, -150px); }
    <span class="hljs-selector-tag">to</span> { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(50%, 150px) <span class="hljs-built_in">rotate</span>(1turn) <span class="hljs-built_in">translate</span>(-50%, -150px); }
}
@<span class="hljs-keyword">keyframes</span> spin-reverse {
    <span class="hljs-selector-tag">from</span> { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(50%, 50%) <span class="hljs-built_in">rotate</span>(1turn) <span class="hljs-built_in">translate</span>(-50%, -50%); }
    <span class="hljs-selector-tag">to</span> { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(50%, 50%) <span class="hljs-built_in">rotate</span>(0turn) <span class="hljs-built_in">translate</span>(-50%, -50%); }
}
<span class="hljs-selector-class">.avatar</span> {
    <span class="hljs-attribute">animation</span>: spin <span class="hljs-number">10s</span> infinite linear;
}
<span class="hljs-selector-class">.avatar</span> &gt; <span class="hljs-selector-tag">img</span> {
    <span class="hljs-attribute">animation</span>: spin-reverse <span class="hljs-number">10s</span> infinite linear;
}</code></pre>
<p>现在这段代码中，两个元素的<code>transform-origin</code>已经一致了，然后我们根据变换函数合并规则，将它们集中到一个元素上，此时html重新变为单个元素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img class=&quot;avatar&quot; src=&quot;edwardup_avatar.jpg&quot; alt=&quot;&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"avatar"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"edwardup_avatar.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> /&gt;</span></code></pre>
<p>对应的css：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes spin {
    from { transform: 
        translate(50%, 150px) rotate(0turn) translate(-50%, -150px)
        translate(50%, 50%) rotate(1turn) translate(-50%, -50%); }
    to { transform: 
        translate(50%, 150px) rotate(1turn) translate(-50%, -150px)
        translate(50%, 50%) rotate(0turn) translate(-50%, -50%); }
}
.avatar {
    animation: spin 10s infinite linear;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> spin {
    <span class="hljs-selector-tag">from</span> { <span class="hljs-attribute">transform</span>: 
        <span class="hljs-built_in">translate</span>(50%, 150px) <span class="hljs-built_in">rotate</span>(0turn) <span class="hljs-built_in">translate</span>(-50%, -150px)
        <span class="hljs-built_in">translate</span>(50%, 50%) <span class="hljs-built_in">rotate</span>(1turn) <span class="hljs-built_in">translate</span>(-50%, -50%); }
    <span class="hljs-selector-tag">to</span> { <span class="hljs-attribute">transform</span>: 
        <span class="hljs-built_in">translate</span>(50%, 150px) <span class="hljs-built_in">rotate</span>(1turn) <span class="hljs-built_in">translate</span>(-50%, -150px)
        <span class="hljs-built_in">translate</span>(50%, 50%) <span class="hljs-built_in">rotate</span>(0turn) <span class="hljs-built_in">translate</span>(-50%, -50%); }
}
<span class="hljs-selector-class">.avatar</span> {
    <span class="hljs-attribute">animation</span>: spin <span class="hljs-number">10s</span> infinite linear;
}</code></pre>
<p>上面的代码特意把<code>transform</code>的值分成两行，分别代表原来的两个元素各自的变换函数。到此，这段代码就已经可以让单个元素达成前文的两个元素的效果了。不过，这段代码还比较冗长，可以再做一点简化。</p>
<p>我们很清楚<code>transform</code>的变换函数的顺序很重要，不能随意交换，但相邻的同类变换函数可以考虑合并。</p>
<p>首先，可以找到位于中间的<code>translate(-50%, -150px)</code>和<code>translate(50%, 50%)</code>可以合并，得到<code>translateY(-150px) translateY(50%)</code>（百分比和像素值则不能再合并）。</p>
<p>然后，以<code>from</code>的部分为例，注意<code>rotate(0turn)</code>和<code>rotate(1turn)</code>分别来自原来的两个元素，它们的角度值是为了互相抵消准备的，因此必须和为<code>360deg</code>（<code>1turn</code> = <code>360deg</code>）：其中一个的角度值为<strong>x</strong>，另一个则为<strong>360 - x</strong>。</p>
<p>也就是说，元素在<code>rotate(0turn)</code>之前（未发生旋转），和<code>rotate(1turn)</code>之后（发生了两次旋转），元素的角度是一致的（合计刚好转了<code>360deg</code>），此时发生的<code>translate()</code>也可以合并。以此找到最前的<code>translate(50%, 150px)</code>和最后的<code>translate(-50%, -50%)</code>，它们可以合并，得到<code>translateY(150px) translateY(-50%)</code>。</p>
<p>至此，代码变为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes spin {
    from { transform: 
        translateY(150px) translateY(-50%) rotate(0turn) 
        translateY(-150px) translateY(50%) rotate(1turn); }
    to { transform: 
        translateY(150px) translateY(-50%) rotate(1turn) 
        translateY(-150px) translateY(50%) rotate(0turn); }
}
.avatar {
    animation: spin 10s infinite linear;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> spin {
    <span class="hljs-selector-tag">from</span> { <span class="hljs-attribute">transform</span>: 
        <span class="hljs-built_in">translateY</span>(150px) <span class="hljs-built_in">translateY</span>(-50%) <span class="hljs-built_in">rotate</span>(0turn) 
        <span class="hljs-built_in">translateY</span>(-150px) <span class="hljs-built_in">translateY</span>(50%) <span class="hljs-built_in">rotate</span>(1turn); }
    <span class="hljs-selector-tag">to</span> { <span class="hljs-attribute">transform</span>: 
        <span class="hljs-built_in">translateY</span>(150px) <span class="hljs-built_in">translateY</span>(-50%) <span class="hljs-built_in">rotate</span>(1turn) 
        <span class="hljs-built_in">translateY</span>(-150px) <span class="hljs-built_in">translateY</span>(50%) <span class="hljs-built_in">rotate</span>(0turn); }
}
<span class="hljs-selector-class">.avatar</span> {
    <span class="hljs-attribute">animation</span>: spin <span class="hljs-number">10s</span> infinite linear;
}</code></pre>
<p>代码虽然看起来没怎么变短，但变换函数更细致明确了。最后，注意最开始的两个<code>translateY()</code>，它们在<code>from</code>和<code>to</code>里都是一样的，因此，完全可以在动画之外，一开始就把元素放在那个位置，从而消除这两个<code>translateY()</code>。</p>
<p>实际上，这两个<code>translateY()</code>的位移做的事就是把这个元素放到环形路径的圆心。</p>
<p>这样，代码再变为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes spin {
    from { transform: 
        rotate(0turn) 
        translateY(-150px) translateY(50%)
        rotate(1turn); }
    to { transform: 
        rotate(1turn) 
        translateY(-150px) translateY(50%) 
        rotate(0turn); }
}
.avatar {
    animation: spin 10s infinite linear;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> spin {
    <span class="hljs-selector-tag">from</span> { <span class="hljs-attribute">transform</span>: 
        <span class="hljs-built_in">rotate</span>(0turn) 
        <span class="hljs-built_in">translateY</span>(-150px) <span class="hljs-built_in">translateY</span>(50%)
        <span class="hljs-built_in">rotate</span>(1turn); }
    <span class="hljs-selector-tag">to</span> { <span class="hljs-attribute">transform</span>: 
        <span class="hljs-built_in">rotate</span>(1turn) 
        <span class="hljs-built_in">translateY</span>(-150px) <span class="hljs-built_in">translateY</span>(50%) 
        <span class="hljs-built_in">rotate</span>(0turn); }
}
<span class="hljs-selector-class">.avatar</span> {
    <span class="hljs-attribute">animation</span>: spin <span class="hljs-number">10s</span> infinite linear;
}</code></pre>
<p>这就是精简后的单元素环形路径平移的解决方案了。代码直观看上去，可能会觉得比较难理解，毕竟它是我们经过前面这样一大段的分析推理得到的。</p>
<p>尽管如此，也有<a href="http://www.useragentman.com/blog/2013/03/03/animating-circular-paths-using-css3-transitions/" rel="nofollow noreferrer" target="_blank">一篇文章</a>介绍了如何直接理解这段环形路径平移的代码，推荐有兴趣的你看看。</p>
<h2 id="articleHeader6">一点额外的尝试</h2>
<h3 id="articleHeader7">螺旋路径平移</h3>
<p>在环形平移路径的代码的基础上，改变起点或终点的圆环半径，可以得到螺旋路径：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes spin {
    from { transform: 
        rotate(0turn) 
        translateY(-150px) translateY(50%)
        rotate(2turn); }
    to { transform: 
        rotate(2turn) 
        translateY(-50px) translateY(50%) 
        rotate(0turn); }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> spin {
    <span class="hljs-selector-tag">from</span> { <span class="hljs-attribute">transform</span>: 
        <span class="hljs-built_in">rotate</span>(0turn) 
        <span class="hljs-built_in">translateY</span>(-150px) <span class="hljs-built_in">translateY</span>(50%)
        <span class="hljs-built_in">rotate</span>(2turn); }
    <span class="hljs-selector-tag">to</span> { <span class="hljs-attribute">transform</span>: 
        <span class="hljs-built_in">rotate</span>(2turn) 
        <span class="hljs-built_in">translateY</span>(-50px) <span class="hljs-built_in">translateY</span>(50%) 
        <span class="hljs-built_in">rotate</span>(0turn); }
}</code></pre>
<p>对应的效果：</p>
<p><span class="img-wrap"><img data-src="/img/bVFiN0?w=425&amp;h=317" src="https://static.alili.tech/img/bVFiN0?w=425&amp;h=317" alt="螺旋路径平移" title="螺旋路径平移" style="cursor: pointer;"></span></p>
<p>这里为了体现螺旋效果，把圈数增加到了2圈。</p>
<h3 id="articleHeader8">S形路径</h3>
<p>把两个环形各取一半拼在一起，就可以得到S型路径。参考环形路径平移的方案，做一些调整，就可以得到S型路径平移的写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes spin{
    0%{
        transform: 
            rotate(-90deg) translateX(50px) rotate(90deg);}
    49.9%{
        transform: 
            rotate(-270deg) translateX(50px) rotate(270deg);}
    50.0% {
        transform: 
            translateY(100px) rotate(-90deg) translateX(50px) rotate(90deg);}
    100% {
        transform:
            translateY(100px) rotate(90deg) translateX(50px) rotate(-90deg);}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> spin{
    0%{
        <span class="hljs-attribute">transform</span>: 
            <span class="hljs-built_in">rotate</span>(-90deg) <span class="hljs-built_in">translateX</span>(50px) <span class="hljs-built_in">rotate</span>(90deg);}
    49<span class="hljs-selector-class">.9</span>%{
        <span class="hljs-attribute">transform</span>: 
            <span class="hljs-built_in">rotate</span>(-270deg) <span class="hljs-built_in">translateX</span>(50px) <span class="hljs-built_in">rotate</span>(270deg);}
    50<span class="hljs-selector-class">.0</span>% {
        <span class="hljs-attribute">transform</span>: 
            <span class="hljs-built_in">translateY</span>(100px) <span class="hljs-built_in">rotate</span>(-90deg) <span class="hljs-built_in">translateX</span>(50px) <span class="hljs-built_in">rotate</span>(90deg);}
    100% {
        <span class="hljs-attribute">transform</span>:
            <span class="hljs-built_in">translateY</span>(100px) <span class="hljs-built_in">rotate</span>(90deg) <span class="hljs-built_in">translateX</span>(50px) <span class="hljs-built_in">rotate</span>(-90deg);}
}</code></pre>
<p>这里初始把元素放在了上面那个半圆环的圆心，然后在<code>50.0%</code>的关键帧位置切换为下面的半圆环路径。由于这个切换过程会让元素小小地停滞一下，并不是我们想要的动画，所以这里用带小数的关键帧位置来尽可能缩短它的时长，使整个动画更平滑。最终效果是：</p>
<p><span class="img-wrap"><img data-src="/img/bVFiN3?w=205&amp;h=302" src="https://static.alili.tech/img/bVFiN3?w=205&amp;h=302" alt="S路径平移" title="S路径平移" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader9">一点补充</h2>
<p><code>matrix()</code>是<code>transform</code>里一个特殊的变换函数，它可以通过矩阵乘法把<code>rotate()</code>、<code>translate()</code>等其他变换函数全部合并在一起。但是，<code>matrix()</code>并不能简化本文的动画代码，因为css动画将无法确认如何生成关键帧之间的补间动画，如果关键帧里只有一个合并后的<code>matrix()</code>，css动画只会按照平铺的方式去完成过渡。</p>
<p>以文章最开始的旋转动画为例，<code>rotate(1turn)</code>转换后是<code>matrix(1, 0, 0, 1, 0, 0)</code>，但如果直接写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes spin {
    to {
        transform: matrix(1, 0, 0, 1, 0, 0);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">keyframes</span> spin {
    <span class="hljs-selector-tag">to</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">matrix</span>(1, 0, 0, 1, 0, 0);
    }
}</code></pre>
<p>结果就是，什么也不会发生。</p>
<h2 id="articleHeader10">结语</h2>
<p>只通过一个<code>transform</code>加上一段神秘代码，就可以做这样特别的动画，我觉得是很有意思的。希望本文的这样一番解读，可以帮助你加深对css的<code>transform</code>的理解。</p>
<p>（重新编辑自我的博客，原文地址：<a href="http://acgtofe.com/posts/2016/11/arc-path-movement" rel="nofollow noreferrer" target="_blank">http://acgtofe.com/posts/2016...</a>）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
巧妙使用transform实现环形路径平移动画

## 原文链接
[https://segmentfault.com/a/1190000007421401](https://segmentfault.com/a/1190000007421401)

