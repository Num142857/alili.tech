---
title: 'Antd Trigger 类组件结构简析' 
date: 2019-01-28 2:30:09
hidden: true
slug: ool4snf0fw9
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://ant.design/" rel="nofollow noreferrer" target="_blank">Antd</a> 组件库中，包含有 Trigger 的组件，它们都有类似的组件结构。以下组件都可以归为这一类：</p>
<ul>
<li><p>ToolTip</p></li>
<li><p>Popover</p></li>
<li><p>PopConfrim</p></li>
<li><p>Cascader</p></li>
<li><p>DataPicker</p></li>
<li><p>TimePicker</p></li>
<li><p>Select</p></li>
<li><p>TreeSelect</p></li>
<li><p>Dropdown</p></li>
</ul>
<p>这些组件的特点，就是都有弹框。通过点击, hover, 或是改变焦点的方式，打开或关闭弹框。而这个特点，就是 Trigger 组件所要实现的功能：弹框可见性的控制。</p>
<h1 id="articleHeader0">看图</h1>
<p><span class="img-wrap"><img data-src="/img/bVHTxe?w=954&amp;h=637" src="https://static.alili.tech/img/bVHTxe?w=954&amp;h=637" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">黄</h2>
<p><span class="img-wrap"><img data-src="/img/bVHTyk?w=682&amp;h=152" src="https://static.alili.tech/img/bVHTyk?w=682&amp;h=152" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>先看很黄的这一组，Popover/PopConfirm -&gt; Tooltip -&gt; rcTooltip -&gt; <strong>rcTrigger</strong> -&gt; child  </p>
<p>这类组件，可以为弹框传入自定义的内容或组件。Popover 和 PopConfirm 都是从 Tooltip 整容来的，为弹窗添加了常用的功能。</p>
<p>其中，内部组件 Trigger，负责为组件添加监听事件，来控制弹框的可见性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// rc-trigger\lib\Trigger.js
var ALL_HANDLERS = ['onClick', 'onMouseDown', 'onTouchStart', 'onMouseEnter', 'onMouseLeave', 'onFocus', 'onBlur'];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// rc-trigger\lib\Trigger.js</span>
<span class="hljs-keyword">var</span> ALL_HANDLERS = [<span class="hljs-string">'onClick'</span>, <span class="hljs-string">'onMouseDown'</span>, <span class="hljs-string">'onTouchStart'</span>, <span class="hljs-string">'onMouseEnter'</span>, <span class="hljs-string">'onMouseLeave'</span>, <span class="hljs-string">'onFocus'</span>, <span class="hljs-string">'onBlur'</span>];</code></pre>
<p>可以看出，Trigger 支持 onClick, onMouseDown, onTouchStart, onMouseEnter, onFocus 来触发弹窗，通过 onClick, onMouseLeave, onBlur 来取消弹窗。弹窗的打开与关闭方式可以不是对应的，例如可以 mouseEnter 打开，click 关闭。我们写弹窗组件的时候，也能把这一部分逻辑抽象出来，感觉应该很棒。</p>
<p>当我们用 React 写弹窗组件的时候，肯定想过要如何添加点击取消功能。使用遮罩，会有一次无效操作，对选框类弹框就不太好了。Antd 的做法是添加全局监听事件，通过判断点击的元素，是否包含在组件或弹框中，即可判断是否为取消弹框的点击。下面是 Antd 中判断组件包含性的方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function contains(root, n) {
    var node = n;
    while (node) {
        if (node === root) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>function contains(root, n) {
    var <span class="hljs-keyword">node</span> <span class="hljs-title">= n</span>;
    while (<span class="hljs-keyword">node</span><span class="hljs-title">) {
        if</span> (<span class="hljs-keyword">node</span> <span class="hljs-title">=== root</span>) {
            return <span class="hljs-literal">true</span>;
        }
        <span class="hljs-keyword">node</span> <span class="hljs-title">= node</span>.parentNode;
    }
    return <span class="hljs-literal">false</span>;
}</code></pre>
<p>除了添加监听事件，Trigger 还有一个很重要的功能，就是弹框的渲染。Trigger 中的弹框并没有渲染进正常的文档流中，它 mixin 了一个 getContainerRenderMixin 内部组件，该组件通过 React 的非稳定方法 unstable_renderSubtreeIntoContainer()，将组件挂载到 document.body 下。因为如果把弹窗渲染在正常文档流中，组件的定位会受到父元素定位的影响，我们知道，如果父元素为静态定位，定位标的就会变成再父一级元素。将弹窗挂载在 body 下，就能解决这个问题。</p>
<p>虽然弹框脱离了正常文档流，但其仍受父组件控制。而组件包裹的子组件仍然渲染在正常文档流。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// rc-util\lib\getContainerRenderMixin2
_reactDom2[&quot;default&quot;].unstable_renderSubtreeIntoContainer(instance, component, instance._container, function callback() {
   instance._component = this;
   if (ready) {
       ready.call(this);
   }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code><span class="hljs-comment">// rc-util\lib\getContainerRenderMixin2</span>
<span class="hljs-number">_</span>reactDom2[<span class="hljs-string">"default"</span>]<span class="hljs-variable">.unstable_renderSubtreeIntoContainer</span>(<span class="hljs-keyword">instance</span>, component, <span class="hljs-keyword">instance</span><span class="hljs-variable">._container</span>, <span class="hljs-keyword">function</span> callback() {
   <span class="hljs-keyword">instance</span><span class="hljs-variable">._component</span> = <span class="hljs-keyword">this</span>;
   <span class="hljs-keyword">if</span> (ready) {
       ready<span class="hljs-variable">.call</span>(<span class="hljs-keyword">this</span>);
   }
});</code></pre>
<h2 id="articleHeader2">绿</h2>
<p><span class="img-wrap"><img data-src="/img/bVHTyl?w=533&amp;h=116" src="https://static.alili.tech/img/bVHTyl?w=533&amp;h=116" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>很绿的一组，也是寄生于 Trigger，但不属于 Tooltip 一族，它们的弹窗内容被传入了定义好的组件，定制性更强。从 Trigger 这一层开始，结构都差不多。</p>
<h2 id="articleHeader3">蓝</h2>
<p>蓝色代表忧伤，看到这么多层嵌套，看着是挺忧伤的。Popup -&gt; Animate -&gt; AnimateChild -&gt; rcAlign -&gt; PopupInner -&gt; LazyRenderBox -&gt; content</p>
<p><span class="img-wrap"><img data-src="/img/bVHTxF?w=1248&amp;h=401" src="https://static.alili.tech/img/bVHTxF?w=1248&amp;h=401" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">Popup</h3>
<p>Popup 组件负责按参数，配置弹框的各种特性，像要不要遮罩、zIndex设多少、隐藏要不要卸载掉弹框等，把这些属性渲染到功能组件中</p>
<h3 id="articleHeader5">Animate</h3>
<p>Animate 和 AnimateChild，顾名思义，就是搞动画的。Animate 组件类似于 React 的 ReactTransitionGroup 组件，它会调用子组件中的钩子函数，来控制动画效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// rc-animate\lib\AnimateChild.js
componentWillUnmount: function componentWillUnmount() {
    this.stop();
},
componentWillEnter: function componentWillEnter(done) {
    if (_util2[&quot;default&quot;].isEnterSupported(this.props)) {
        this.transition('enter', done);
    } else {
        done();
    }
},
componentWillAppear: function componentWillAppear(done) {
    if (_util2[&quot;default&quot;].isAppearSupported(this.props)) {
        this.transition('appear', done);
    } else {
        done();
    }
},
componentWillLeave: function componentWillLeave(done) {
    if (_util2[&quot;default&quot;].isLeaveSupported(this.props)) {
      this.transition('leave', done);
    } else {
      done();
    }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// rc-animate\lib\AnimateChild.js</span>
componentWillUnmount: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">componentWillUnmount</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">this</span>.stop();
},
componentWillEnter: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">componentWillEnter</span><span class="hljs-params">(done)</span> </span>{
    <span class="hljs-keyword">if</span> (_util2[<span class="hljs-string">"default"</span>].isEnterSupported(<span class="hljs-keyword">this</span>.props)) {
        <span class="hljs-keyword">this</span>.transition(<span class="hljs-string">'enter'</span>, done);
    } <span class="hljs-keyword">else</span> {
        done();
    }
},
componentWillAppear: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">componentWillAppear</span><span class="hljs-params">(done)</span> </span>{
    <span class="hljs-keyword">if</span> (_util2[<span class="hljs-string">"default"</span>].isAppearSupported(<span class="hljs-keyword">this</span>.props)) {
        <span class="hljs-keyword">this</span>.transition(<span class="hljs-string">'appear'</span>, done);
    } <span class="hljs-keyword">else</span> {
        done();
    }
},
componentWillLeave: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">componentWillLeave</span><span class="hljs-params">(done)</span> </span>{
    <span class="hljs-keyword">if</span> (_util2[<span class="hljs-string">"default"</span>].isLeaveSupported(<span class="hljs-keyword">this</span>.props)) {
      <span class="hljs-keyword">this</span>.transition(<span class="hljs-string">'leave'</span>, done);
    } <span class="hljs-keyword">else</span> {
      done();
    }
},</code></pre>
<h3 id="articleHeader6">AnimateChild</h3>
<p>AnimateChild 在生命周期的钩子函数中，通过改变类名，如改变后缀 -appear, -enter, -leave，来执行动画效果。Antd 动画主要是 CSS3 动画。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".zoom-motion(@className, @keyframeName, @duration: @animation-duration-base) {
  .make-motion(@className, @keyframeName, @duration);
  .@{className}-enter,
  .@{className}-appear {
    transform: scale(0); // need this by yiminghe
    animation-timing-function: @ease-out-circ;
  }
  .@{className}-leave {
    animation-timing-function: @ease-in-out-circ;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-class">.zoom-motion</span>(<span class="hljs-variable">@className</span>, <span class="hljs-variable">@keyframeName</span>, <span class="hljs-variable">@duration</span>: <span class="hljs-variable">@animation-duration-base</span>) {
  <span class="hljs-selector-class">.make-motion</span>(<span class="hljs-variable">@className</span>, <span class="hljs-variable">@keyframeName</span>, <span class="hljs-variable">@duration</span>);
  <span class="hljs-selector-class">.@{className}</span><span class="hljs-selector-tag">-enter</span>,
  <span class="hljs-selector-class">.@{className}</span><span class="hljs-selector-tag">-appear</span> {
    <span class="hljs-attribute">transform</span>: scale(<span class="hljs-number">0</span>); <span class="hljs-comment">// need this by yiminghe</span>
    <span class="hljs-attribute">animation-timing-function</span>: <span class="hljs-variable">@ease-out-circ</span>;
  }
  <span class="hljs-selector-class">.@{className}</span><span class="hljs-selector-tag">-leave</span> {
    <span class="hljs-attribute">animation-timing-function</span>: <span class="hljs-variable">@ease-in-out-circ</span>;
  }
}</code></pre>
<h3 id="articleHeader7">Align</h3>
<p>Align 组件负责对齐元素。前面说了，Popup 脱离了正常文档流，挂在了 document.body 上。那如何把两个风马牛不相及的元素对齐呢？还要考虑到窗口改变时也能对得上。靠的是<a href="http://yiminghe.iteye.com/blog/1124720" rel="nofollow noreferrer" target="_blank">元素的可视矩阵（区域）计算</a>，说的挺轻巧，反正代码我还没看懂。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// rc-align\node_modules\dom-align\lib\index.js
function domAlign(el, refNode, align) {
    // masive code
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// rc-align\node_modules\dom-align\lib\index.js</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">domAlign</span><span class="hljs-params">(el, refNode, align)</span> </span>{
    <span class="hljs-comment">// masive code</span>
}</code></pre>
<h3 id="articleHeader8">PopupInner</h3>
<p>渲染了个div，添了个 LazyRenderBox 功能组件</p>
<h3 id="articleHeader9">LazyRenderBox</h3>
<p>这个组件很懒，因为你看不见它的时候，它就不干活了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
    return nextProps.hiddenClassName || nextProps.visible;
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>shouldComponentUpdate: <span class="hljs-keyword">function</span> <span class="hljs-title">shouldComponentUpdate</span>(nextProps) {
    <span class="hljs-keyword">return</span> <span class="hljs-type">nextProps.hiddenClassName</span> || nextProps.visible;
},</code></pre>
<h3 id="articleHeader10">content</h3>
<p>之前的一沓都是套在外面的衣服，你的 content 才是用户想看的。</p>
<p><span class="img-wrap"><img data-src="/img/bVHTym?w=361&amp;h=120" src="https://static.alili.tech/img/bVHTym?w=361&amp;h=120" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>尽管 React 组件树很复杂，但是最终渲染出来的 Dom 树却是格外的清爽。</p>
<h1 id="articleHeader11">最后</h1>
<p>Antd 不简单，看来写一套靠谱的组件可不是闹着玩的，一些看似简单的功能，实现起来却是十分的复杂。一沓代码看下来，可能就领悟了皮毛，却感觉已经受益匪浅了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Antd Trigger 类组件结构简析

## 原文链接
[https://segmentfault.com/a/1190000008039293](https://segmentfault.com/a/1190000008039293)

