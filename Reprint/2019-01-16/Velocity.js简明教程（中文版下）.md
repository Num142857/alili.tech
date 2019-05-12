---
title: 'Velocity.js简明教程（中文版下）' 
date: 2019-01-16 2:30:08
hidden: true
slug: 9r3d4qtw8dl
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://segmentfault.com/a/1190000009151459">Velocity.js简明教程（中文版上）</a></p>
<hr>
<blockquote><h3 id="articleHeader0">滚动动画</h3></blockquote>
<p>使用Velocity.js，你可以快速实现垂直和水平滚动动画。滚动可以与整个页面或元素相关。无论哪种方式，都要在即将滚动到视图中的元素上调用Velocity。</p>
<p>下面的demo使用两个链接：点击顶部链接将容器滚动到最后一部分，单击底部链接将容器滚动到第一部分。</p>
<p>由于两个链接的滚动动作相同，为避免写重复的代码，将其组织成一个函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const scrolling = (element, container, direction) => {
    let offsetDistance = 0;
    direction === 'up' ? offsetDistance = -200 : 200;
    Velocity(element, 'scroll', {
        container: container,
        duration: 500,
        offset: offsetDistance,
        easing: 'ease-out'
    });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> scrolling = <span class="hljs-function">(<span class="hljs-params">element, container, direction</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> offsetDistance = <span class="hljs-number">0</span>;
    direction === <span class="hljs-string">'up'</span> ? offsetDistance = <span class="hljs-number">-200</span> : <span class="hljs-number">200</span>;
    Velocity(element, <span class="hljs-string">'scroll'</span>, {
        <span class="hljs-attr">container</span>: container,
        <span class="hljs-attr">duration</span>: <span class="hljs-number">500</span>,
        <span class="hljs-attr">offset</span>: offsetDistance,
        <span class="hljs-attr">easing</span>: <span class="hljs-string">'ease-out'</span>
    });
};</code></pre>
<ul>
<li><p><code>element</code>代表要滚动到视图中的元素，在这个demo中指的是<code>第一个部分</code>或<code>最后一个部分</code>，具体取决于滚动的方向。</p></li>
<li><p>滚动的方向存储在<code>direction</code>中。如果值为'up'，那么<code>offsetDistance</code>的值为-200px，即滚动到相对当前<code>element</code>向上偏移200px的位置，否则<code>offsetDistance</code>的值将为200px。<code>offsetDistance</code>将为Velocity的<code>offset</code>属性存储一个值，可以将目标滚动位置偏移指定的量。</p></li>
<li><p>因为demo中的滚动不是相对于浏览器窗口，而是容器元素，上面的代码将这个信息存储在<code>container</code>参数中。因为这样，将容器元素CSS的<code>position</code>属性设置为<code>relative</code>，<code>absolute</code>或<code>fixed</code>不起作用。</p></li>
</ul>
<p>最后，通过调用上面的函数来处理相关链接上的点击事件。 例如，要滚动到最后一部分，您的事件处理函数可能如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Link.addEventListener('click', (e) => {
    e.preventDefault();
    scrolling(lastSection, scrollerContainer, 'down');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>Link.<span class="hljs-keyword">addEventListener('click', </span>(e) =&gt; {
    e.preventDefault()<span class="hljs-comment">;</span>
    <span class="hljs-keyword">scrolling(lastSection, </span><span class="hljs-keyword">scrollerContainer, </span><span class="hljs-string">'down'</span>)<span class="hljs-comment">;</span>
})<span class="hljs-comment">;</span></code></pre>
<p>具体实现效果如下：<br><a href="https://codepen.io/mengmengpro/pen/GmqrVe" rel="nofollow noreferrer" target="_blank">https://codepen.io/mengmengpr...</a><button class="btn btn-xs btn-default ml10 preview" data-url="mengmengpro/pen/GmqrVe" data-typeid="3">点击预览</button></p>
<hr>
<blockquote><h3 id="articleHeader1">SVG动画</h3></blockquote>
<p>Velocity可以用一个number值对任何属性进行动画处理，包括应用于SVG的CSS属性，例如<code>fill</code>，<code>stroke</code>，<code>stroke-width</code>，<code>stroke-color</code>，<code>rx</code>，<code>ry</code>等。</p>
<p>有关Velocity可以操控的SVG属性完整列表，可以去<a href="http://www.mrfront.com/docs/velocity.js/feature.html" rel="nofollow noreferrer" target="_blank">这里</a>查看。</p>
<p>下面的demo显示了一条微笑鱼的SVG图像。气泡淡入淡出，眼睛每隔几秒钟闪烁一次。如果单击播放按钮，鱼将移动到其容器的左侧，消失，返回并转动。</p>
<p><strong>Bug alert</strong>：不幸的是，IE/Edge浏览器不支持CSS的<code>transform</code>，并且Velocity没有为此错误提供兼容性修补程序。 因此，demo在这些浏览器中无法正常工作。</p>
<h4>让SVG图像准备动画</h4>
<p>在编写任何代码之前，请确保你的SVG图像可以使用Velocity.js进行动画。</p>
<ul>
<li><p>将<code>class</code>或<code>id</code>添加到即将动画的SVG。</p></li>
<li><p>如果要将某些元素作为一个整体进行动画，请将元素包含在<code>&lt;g&gt;&lt;/g&gt;</code>标签中</p></li>
<li><p><a href="https://jakearchibald.github.io/svgomg/" rel="nofollow noreferrer" target="_blank">简化和优化</a>你的图形。</p></li>
</ul>
<h4>使用Velocity.js</h4>
<p>下面是移动鱼的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const moveFish = (elem, moveBy, initialPos, btn, bool = false) => {
    Velocity(elem, {
        translateX: [moveBy, initialPos]
    }, {
        duration: 5000,
        easing: 'linear',
        complete: () => {
            if (bool) {
                btn.disable = false;
            }
        }
    });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>const moveFish = <span class="hljs-function"><span class="hljs-params">(elem, moveBy, initialPos, btn, bool = <span class="hljs-literal">false</span>)</span> =&gt;</span> {
    Velocity(elem, {
        translateX: [moveBy, initialPos]
    }, {
        duration: <span class="hljs-number">5000</span>,
        easing: <span class="hljs-string">'linear'</span>,
        complete: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-keyword">if</span> (bool) {
                btn.disable = <span class="hljs-literal">false</span>;
            }
        }
    });
};</code></pre>
<p>分析上面的代码：</p>
<ul>
<li><p>调用Velocity，并使用<code>forcefeeding</code>设置<code>translateX</code>属性的值，该值决定了元素的最终和初始位置。当稍后调用此函数时，提供的<code>elem</code>参数将是对SVG鱼的引用。</p></li>
<li><p>只有在整个动画结束之后，才能利用Velocity.js内置的<code>complete()</code>方法来激活“播放”按钮。这是为了防止用户在动画过程中重复按下按钮，这将构建动画队列。</p></li>
<li><p>动画完成后，播放按钮再次激活，用户可以选择重播动画。此功能通过<code>bool</code>参数实现。</p></li>
<li><p>我们还使用了一个ES6特性功能：默认参数，即代码中的<code>bool = false</code>。当你调用<code>moveFish()</code>时，你可以选择不输入相应的参数，因为设置的默认值将自动应用。或者，你可以通过显式输入参数来更改默认值。</p></li>
</ul>
<p>要实现不同的移动动画，在主函数内使用不同的参数多次调用<code>moveFish()</code>，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const play = () => { 
  moveFish(fish, '-1000', 0, btnPlay);
  moveFish(fish, 0, '-1000', btnPlay, true);
  //可以继续调用
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> play = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { 
  moveFish(fish, <span class="hljs-string">'-1000'</span>, <span class="hljs-number">0</span>, btnPlay);
  moveFish(fish, <span class="hljs-number">0</span>, <span class="hljs-string">'-1000'</span>, btnPlay, <span class="hljs-literal">true</span>);
  <span class="hljs-comment">//可以继续调用</span>
};</code></pre>
<p>注意你调用<code>moveFish()</code>的不同方式：第一次没有第五个参数，第二次第五个参数的值为<code>true</code>。在第一种情况下，第五个参数的值是您在构建<code>moveFish()</code>函数时提供的默认参数。</p>
<p>最后，只需在开始按钮的click事件上调用上面的<code>play()</code>函数即可。</p>
<p>可以试试做出来的效果哦：<br><a href="https://codepen.io/mengmengpro/pen/wdWJEz" rel="nofollow noreferrer" target="_blank">https://codepen.io/mengmengpr...</a><button class="btn btn-xs btn-default ml10 preview" data-url="mengmengpro/pen/wdWJEz" data-typeid="3">点击预览</button></p>
<hr>
<blockquote><h3 id="articleHeader2">Velocity UI Pack</h3></blockquote>
<p>我们称之为UI包。你可以用它来补充Velocity.js，这是一个大大提高了动画工作流程的插件。</p>
<p>你需要<a href="https://github.com/julianshapiro/velocity" rel="nofollow noreferrer" target="_blank">下载UI Pack</a>并且在引用Velocity.js之后引用它。</p>
<p>你可以在<a href="http://www.mrfront.com/docs/velocity.js/plugins.html" rel="nofollow noreferrer" target="_blank">UI Pack文档</a>中看到可以获得的所有效果的列表。此外，你还可以注册自己的自定义效果。</p>
<p>在下面的demo中，我使用UI Pack在提交后隐藏表单，并向用户显示成功图标。</p>
<p>这是Velocity隐藏表单的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Velocity(formEl, 'transition.bounceUpOut', 500);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code style="word-break: break-word; white-space: initial;">Velocity(<span class="hljs-name">formEl</span>, 'transition.bounceUpOut', <span class="hljs-number">500</span>)<span class="hljs-comment">;</span></code></pre>
<ul>
<li><p>第一个参数是要操作的元素，在这个demo中即为表单。</p></li>
<li><p>第二个参数是UI Pack中的一个预定义特效。</p></li>
<li><p>第三个参数是动画时长。</p></li>
</ul>
<p>下面是具体的效果：<br><a href="https://codepen.io/mengmengpro/pen/pPbeMa" rel="nofollow noreferrer" target="_blank">https://codepen.io/mengmengpr...</a><button class="btn btn-xs btn-default ml10 preview" data-url="mengmengpro/pen/pPbeMa" data-typeid="3">点击预览</button></p>
<hr>
<blockquote><h3 id="articleHeader3">更多资料</h3></blockquote>
<p>这里还有一些学习Velocity.js的资料：</p>
<ul>
<li><p><a href="https://www.sitepoint.com/incredibly-fast-ui-animation-using-velocity-js/" rel="nofollow noreferrer" target="_blank">Incredibly Fast UI Animation Using Velocity.js</a></p></li>
<li><p><a href="https://www.smashingmagazine.com/2014/06/faster-ui-animations-with-velocity-js/" rel="nofollow noreferrer" target="_blank">Faster UI Animations With Velocity.js</a></p></li>
<li><p><a href="https://css-tricks.com/improving-ui-animation-workflow-velocity-js/" rel="nofollow noreferrer" target="_blank">Improving UI Animation Workflow with Velocity.js</a></p></li>
<li><p><a href="https://codepen.io/collection/tIjGb/#" rel="nofollow noreferrer" target="_blank">Velocity.js: The Official Collection</a><button class="btn btn-xs btn-default ml10 preview" data-url="collection/tIjGb/" data-typeid="3">点击预览</button></p></li>
</ul>
<blockquote><p>来自译者：</p></blockquote>
<p>这篇文章大致介绍了Velocity.js，在阅读完后推荐先大致浏览一遍<a href="http://www.mrfront.com/docs/velocity.js/index.html" rel="nofollow noreferrer" target="_blank">官方文档</a>，然后再自己动手写demo。<br>昨天发布的上半部分被官博分享了，很开心，以后会继续分享高质量文章的。喜欢的话可以关注我或者我的<a href="http://weibo.com/3166703024/profile?topnav=1&amp;wvr=6&amp;is_all=1" rel="nofollow noreferrer" target="_blank">微博</a>，谢谢支持！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Velocity.js简明教程（中文版下）

## 原文链接
[https://segmentfault.com/a/1190000009159742](https://segmentfault.com/a/1190000009159742)

