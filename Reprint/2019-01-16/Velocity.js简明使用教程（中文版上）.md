---
title: 'Velocity.js简明使用教程（中文版上）' 
date: 2019-01-16 2:30:08
hidden: true
slug: 65j0uoo137
categories: [reprint]
---

{{< raw >}}

                    
<p>本文翻译自<a href="https://www.sitepoint.com/how-to-use-velocity-js-without-jquery/" rel="nofollow noreferrer" target="_blank">https://www.sitepoint.com/how...</a></p>
<p>在本文中，我将介绍<code>Velocity.js</code>，这是一个快速，高性能的JavaScript动画引擎。当您浏览完所有的demo时，您可以使用Velocity.js创建自己的动画，并使您的网站更具互动性和用户友好性。本文所讲内容不使用jQuery。</p>
<blockquote><h3 id="articleHeader0">Velocity.js功能概览</h3></blockquote>
<p>Velocity.js是一个功能强大的库，它将DOM置于你的指尖！它的动画涵盖：</p>
<ul>
<li><p>CSS动画属性的数值，包括颜色</p></li>
<li><p>Transform（变换）</p></li>
<li><p>SVG属性</p></li>
<li><p>滚动事件，相对于页面或页面中的容器元素</p></li>
<li><p>淡入淡出动画</p></li>
</ul>
<p>一般来说，Velocity一次可以操控一个数值属性值的动画。 <br>例如，如果要沿X和Y坐标移动元素，则不能使用<code>translate['10px', '15px']</code>。 相反，应该将<code>translate</code>属性与其相应的轴结合在一起，如：<code>translateX：'10px'，translateY：'15px'</code>。 <br>Velocity有一个功能称为<code>forcefeeding</code>，它可以让你同时指定两个值。 将在本文后面介绍这个功能。</p>
<hr>
<blockquote><h3 id="articleHeader1">配置项</h3></blockquote>
<p>Velocity的配置项在制作动画时给予了相当的灵活性。</p>
<p>以下是本文的demo中将会看到的配置项：</p>
<ul>
<li><p>Durantion：每个动画持续的时间，测量单位为毫秒。</p></li>
<li><p>Easing：Velocity支持大多数的easing类型。<code>ease</code>，<code>ease-in</code>，<code>ease-out</code>, <code>ease-in-out</code>，贝塞尔曲线，甚至是很酷的物理弹簧效果。 可以在这个demo中查看弹簧效果：<a href="https://codepen.io/mengmengpro/pen/xdVOEr" rel="nofollow noreferrer" target="_blank">https://codepen.io/mengmengpr...</a><button class="btn btn-xs btn-default ml10 preview" data-url="mengmengpro/pen/xdVOEr" data-typeid="3">点击预览</button>。</p></li>
<li><p>Loop：动画应该重复的次数。如果将此选项设置为true，它将无限期运行。</p></li>
<li><p>Delay：动画开始之前的延迟时长。</p></li>
</ul>
<p>全部的配置项可以在<a href="http://velocityjs.org/#duration" rel="nofollow noreferrer" target="_blank">Velocity的官网</a>查看，此处也附上<a href="http://www.mrfront.com/docs/velocity.js/option.html" rel="nofollow noreferrer" target="_blank">Velocity中文网站</a>。</p>
<hr>
<blockquote><h3 id="articleHeader2">语法</h3></blockquote>
<p>如果你使用jQuery，Velocity.js可以轻松上手。 事实上，Velocity与jQuery具有相同的API：<br><em>下载Velocity，引入你的项目，然后将<code>$.animate()</code>替换成<code>$.velocity()</code></em></p>
<p>但是，你也可以不用jQuery来使用Velocity，并且本文中的demo也将不使用jQuery。语法与使用jQuery的方式有所不同：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Velocity(element, {property: value}, {option: optionValue});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">Velocity</span>(<span class="hljs-selector-tag">element</span>, {<span class="hljs-attribute">property</span>: value}, {<span class="hljs-attribute">option</span>: optionValue});</code></pre>
<p>要在同一个元素上链接另一个动画，只需在之前的velocity后再添加一个：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Velocity(element1, {property: value}, {option: optionValue});
Velocity(element1, {property: value}, {option: optionValue});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">Velocity</span>(<span class="hljs-selector-tag">element1</span>, {<span class="hljs-attribute">property</span>: value}, {<span class="hljs-attribute">option</span>: optionValue});
<span class="hljs-selector-tag">Velocity</span>(<span class="hljs-selector-tag">element1</span>, {<span class="hljs-attribute">property</span>: value}, {<span class="hljs-attribute">option</span>: optionValue});</code></pre>
<p>要将动画同时应用于多个元素，只需将所有元素存储到变量中，并将Velocity应用于该变量，无需通过循环实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const elements = document.querySelectorAll('<div>');
Velocity(elements, {property: value}, {option: optionValue});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-keyword">const</span> elements = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'&lt;div&gt;'</span>);
Velocity(elements, {<span class="hljs-keyword">property</span><span class="hljs-string"></span>: value}, {<span class="hljs-attribute">option</span>: optionValue});</code></pre>
<p>对于选项值单位，你可以使用px，％，rem，em，vw/vh和deg。如果不添加单位，Velocity将提供适当的单位，通常为px。</p>
<h4>
<code>forcefeeding</code>功能：传递初始值</h4>
<p>这个功能可以让你不用Velocity.js查询DOM以获取元素的初始值，而使用以下语法自行设置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Velocity(element, {
  translateX: [endValue, startValue],
  backgroundColor: [endValue, easing, startValue]
}, {
  //options here
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">Velocity</span>(element, {
  <span class="hljs-attribute">translateX</span>: [endValue, startValue],
  <span class="hljs-attribute">backgroundColor</span>: [endValue, easing, startValue]
}, {
  <span class="hljs-comment">//options here</span>
});</code></pre>
<p>在上面的代码中，<code>translateX</code>和<code>backgroundColor</code>分别设置了一个数组：</p>
<ul>
<li><p>第一个值代表动画的结束状态。</p></li>
<li><p>第二个值（可选）是特定属性的<code>easing</code>选项。</p></li>
<li><p>第三个值即是指定动画的起始状态。</p></li>
</ul>
<p>你可以去<a href="http://www.mrfront.com/docs/velocity.js/advanced.html" rel="nofollow noreferrer" target="_blank">这里</a>阅读更详细的<code>forcefeeding</code>。</p>
<h4>控制Velocity.js动画</h4>
<p>您可以使用以下语法停止，暂停，反向以及恢复元素上的所有Velocity调用：</p>
<ul>
<li><p>停止：<code>Velocity(elem, 'stop')</code>；</p></li>
<li><p>暂停：<code>Velocity(elem, 'pause')</code>；</p></li>
<li><p>反向：<code>Velocity(elem, 'reverse')</code>；</p></li>
<li><p>恢复：<code>Velocity(elem, 'resume')</code>；</p></li>
</ul>
<p>根据这些基本指导，你可以开始进入一些实际的例子。</p>
<hr>
<blockquote><h3 id="articleHeader3">Demo: 掉落的小球</h3></blockquote>
<p>我们从一个由顶部落下的球开始。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ball = document.querySelector('.ball');

Velocity(ball, {
    translateY: '200px'
}, {
    easing: [2000, 15],
    durantion: 3000
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">const</span> ball = <span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">'.ball'</span>);

Velocity(ball, {
    translateY: <span class="hljs-string">'200px'</span>
}, {
    easing: [<span class="hljs-number">2000</span>, <span class="hljs-number">15</span>],
    durantion: <span class="hljs-number">3000</span>
});</code></pre>
<p>上面的代码选择了一个class为ball的HTML元素，它在Y轴上移动200px，持续3秒。随着小球的下落不断加速，并在最后得到弹性。</p>
<p>你可以使用Velocity的弹簧效果快速实现此功能，通过向velocity的<code>easing</code>选项传递一个数组：第一个数组项表示张力，第二个表示摩擦。<br>高张力值会增加总速度和波峰（默认值为500），较低的摩擦值会增加振动速度（默认值为20）。</p>
<p>为了好玩，我们让球的背景颜色从蓝色的初始值变成深色。 要设置背景颜色的初始值，您需要使用Velocity.js的<code>forcefeeding</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Velocity(ball, {
    translateY: '130px',
    backgroundColor: ['#222', '#043d99']
}, {
    easing: [2000, 15],
    duration: '3000'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">Velocity</span>(<span class="hljs-selector-tag">ball</span>, {
    <span class="hljs-attribute">translateY</span>: <span class="hljs-string">'130px'</span>,
    backgroundColor: [<span class="hljs-string">'#222'</span>, <span class="hljs-string">'#043d99'</span>]
}, {
    <span class="hljs-attribute">easing</span>: [<span class="hljs-number">2000</span>, <span class="hljs-number">15</span>],
    duration: <span class="hljs-string">'3000'</span>
});</code></pre>
<p>具体实现效果点此看看：<br><a href="https://codepen.io/mengmengpro/pen/wdGmgZ" rel="nofollow noreferrer" target="_blank">https://codepen.io/mengmengpr...</a><button class="btn btn-xs btn-default ml10 preview" data-url="mengmengpro/pen/wdGmgZ" data-typeid="3">点击预览</button></p>
<hr>
<blockquote><h3 id="articleHeader4">Demo：按钮控制的弹簧小球</h3></blockquote>
<p>接下来的这个demo，目标是创建一个动画序列：</p>
<ul>
<li><p>小球从顶端落下</p></li>
<li><p>当小球撞击地面的时候样式有所挤压</p></li>
<li><p>当小球反弹回来的时候样式恢复正常</p></li>
<li><p>这个动画会一直循环</p></li>
<li><p>你可以通过一个按钮控制动画的循环和停止</p></li>
</ul>
<p>实现这种动画需要将各种各样的片断连在一起，并使用按钮来整体控制它们的动画。</p>
<p>理想的工具将是一个时间表，它将涵盖所有的片断，并可以控制所有片断的开始和结束。Velocity.js没有原生的时间轴，但有几个解决方案：</p>
<ul>
<li><p>使用<a href="http://tweene.com/" rel="nofollow noreferrer" target="_blank">Tweene</a> - 这是一个动画代理，是一个可以使用很多Javascript动画库的包装器，包括Velocity.js。Tweene需要Velocity使用jQuery，本文未使用jQuery，所以暂不考虑。</p></li>
<li><p>JavaScript的<code>requestAnimationFrame()</code>。这是一个原生API，用于在浏览器环境中运行任何平滑，高效的动画，例如CSS，画布等。目前除了Opera Mini外，所有主流浏览器都支持。</p></li>
</ul>
<h4>将片断分割成函数</h4>
<p>为了保持代码整洁，可以根据你需要的动画场景构建一个函数。 然后，只需要在主函数中调用这些函数，主函数包含<code>requestAnimationFrame()</code>方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const changeBallPosition = (elem, propVal, easingVal, durationVal) => {
    Velocity(elem, {
        translateY: propVal
    }, {
        easing: easingVal, 
        duration: durationVal
    });
};

const changeBallWidth = (elem, propVal, easingVal, durationVal) => {
    Velocity(elem, {
        scaleX: propVal
    }, {
        easing: easingVal,
        duration: durationVal
    });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>const changeBallPosition = <span class="hljs-function"><span class="hljs-params">(elem, propVal, easingVal, durationVal)</span> =&gt;</span> {
    Velocity(elem, {
        translateY: propVal
    }, {
        easing: easingVal, 
        duration: durationVal
    });
};

const changeBallWidth = <span class="hljs-function"><span class="hljs-params">(elem, propVal, easingVal, durationVal)</span> =&gt;</span> {
    Velocity(elem, {
        scaleX: propVal
    }, {
        easing: easingVal,
        duration: durationVal
    });
};</code></pre>
<p>上面的代码片段包含了如何编写ES6箭头函数的示例。<br>每个函数使用<code>const</code>关键字存储在常量中。如果需要在整个程序中存储需要更新的值，请改用<code>let</code>。 </p>
<p>可以看到，每个功能都调用了Velocity来让小球进行特定的移动。注意，要移动球并更改其宽度，代码没有分别更改CSS的<code>top</code>和<code>width</code>。相反，它改变了<code>translate</code>和<code>scale</code>的值，从而带来更好效的动画效果。</p>
<p>下面是有计时器的主函数。在主函数里调用以上函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let animationFrameId;
const launchBall = (elem) => {
    changeBallPosition(elem, '130px', 'easeInQuart', 300);
    changeBallWidth(elem, 1.2, 'linear', 50);
    changeBallWidth(elem, 1, 'linear', 50);
    changeBallPosition(elem, '-10px', 'easeOutQuart', 300);
    changeBallWidth(elem, 1, 'linear', 50);
    animationFrameId = requestAnimationFrame(() => {
        launchBall(elem);
    });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>let animationFrameId;
const launchBall = <span class="hljs-function"><span class="hljs-params">(elem)</span> =&gt;</span> {
    changeBallPosition(elem, <span class="hljs-string">'130px'</span>, <span class="hljs-string">'easeInQuart'</span>, <span class="hljs-number">300</span>);
    changeBallWidth(elem, <span class="hljs-number">1.2</span>, <span class="hljs-string">'linear'</span>, <span class="hljs-number">50</span>);
    changeBallWidth(elem, <span class="hljs-number">1</span>, <span class="hljs-string">'linear'</span>, <span class="hljs-number">50</span>);
    changeBallPosition(elem, <span class="hljs-string">'-10px'</span>, <span class="hljs-string">'easeOutQuart'</span>, <span class="hljs-number">300</span>);
    changeBallWidth(elem, <span class="hljs-number">1</span>, <span class="hljs-string">'linear'</span>, <span class="hljs-number">50</span>);
    animationFrameId = requestAnimationFrame(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        launchBall(elem);
    });
};</code></pre>
<p>注意全局变量<code>animationFrameId</code>。后面将需要在<code>cancelAnimationFrame()</code>中用这个变量停止动画。</p>
<p>要使球运动，需要在按钮的点击事件中调用<code>launchBall()</code>函数，我们需要把小球这个变量传递给函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="btnPlay.addEventListener('click', function () {
    launchBall(ball);
    this.enabled = true;
    btnStop.disabled = false;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>btnPlay.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    launchBall(ball);
    <span class="hljs-keyword">this</span>.enabled = <span class="hljs-literal">true</span>;
    btnStop.disabled = <span class="hljs-literal">false</span>;
});</code></pre>
<p>注意，在这个点击函数的回调中用了<code>this</code>关键字，这里的<code>this</code>指向被点击的按钮。如果使用箭头函数，<code>this</code>关键字将引用全局的<code>window</code>对象。简而言之，不要在动态上下文的回调函数中使用箭头函数。</p>
<p>为了让小球停止，需要一个新的函数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const removeAnimFrame = () => {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameID);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>const removeAnimFrame = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (animationFrameId) {
        cancelAnimationFrame(animationFrameID);
    }
}</code></pre>
<p>在这里，你通过传递<code>animationFrameId</code>来调用<code>cancelAnimationFrame()</code>，<code>animationFrameId</code>包含一个对小球循环动画的引用。</p>
<p>停止动画的点击事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="btnStop.addEventListener('click', function () {
    removeAnimFrame();
    Velocity(ball, 'stop', true);
    this.disabled = true;
    btnPlay.disabled = false;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>btnStop.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    removeAnimFrame();
    Velocity(ball, <span class="hljs-string">'stop'</span>, <span class="hljs-literal">true</span>);
    <span class="hljs-keyword">this</span>.disabled = <span class="hljs-literal">true</span>;
    btnPlay.disabled = <span class="hljs-literal">false</span>;
});</code></pre>
<p>有趣的是，调用Velocity的<code>stop()</code>方法时用了一个额外的布尔值。这是清除动画队列所必需的。如果你不用这个参数，点击停止按钮，球不会立即停止动画。等所有排队的Velocity调用完成执行，它才会停止动画。</p>
<p>具体实现效果请看如下demo：<br><a href="https://codepen.io/mengmengpro/pen/rmeqBo" rel="nofollow noreferrer" target="_blank">https://codepen.io/mengmengpr...</a><button class="btn btn-xs btn-default ml10 preview" data-url="mengmengpro/pen/rmeqBo" data-typeid="3">点击预览</button></p>
<blockquote><p>中文版下已经出炉，点击<a href="https://segmentfault.com/a/1190000009159742">这里</a>直达。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Velocity.js简明使用教程（中文版上）

## 原文链接
[https://segmentfault.com/a/1190000009151459](https://segmentfault.com/a/1190000009151459)

