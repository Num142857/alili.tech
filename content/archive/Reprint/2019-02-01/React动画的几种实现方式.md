---
title: 'React动画的几种实现方式' 
date: 2019-02-01 2:30:10
hidden: true
slug: x3k4cbf879
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>在很久之前动画是需要操作DOM的</p></blockquote>
<h2 id="articleHeader0">前言</h2>
<p>俗话说得好，饱暖思淫欲。使用React开发已经有一段时间了，在度过了初期的学习阶段和繁重的业务开发之后，总得来点更高级的东西。说到更高级的东西，无非就是体验优化、性能优化、代码质量、开发发布流程或运维监控等等，仅此而已。</p>
<p>今天咱们先来讲讲简单的体验优化方面的，也就是React动画，探索一下React动画有哪些实现方式。</p>
<h2 id="articleHeader1">手动实现</h2>
<p>在很久以前，React还没有<code>ReactCSStransitionGroup</code>（ react.js 0.14 发布）的时候，我也还是一个初学者，曾经手动实现了一段动画，方法比较low，原理很简单，大家看看就好。</p>
<h3 id="articleHeader2">原理</h3>
<ul><li><p>显示：直接通过添加类的方式执行动画。<br>这个方式比较简单，通过props.show控制<code>display none</code>从而控制DOM元素的显示隐藏，因此，在组件挂载之后，当props.show发生变化后，先通过添加类的方式来执行动画。</p></li></ul>
<p>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidUpdate(preProps) {//显示的时候执行动画
    if (this.props.show === true &amp;&amp; preProps.show === false) {
      this.inAnimationTime = setTimeout(()=> {
        ReactDOM.findDOMNode(this).getElementsByClassName(&quot;modal&quot;)[0].classList.add(&quot;in&quot;);
      }, 50);
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>componentDidUpdate(preProps) {<span class="hljs-comment">//显示的时候执行动画</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.show === <span class="hljs-literal">true</span> &amp;&amp; preProps.show === <span class="hljs-literal">false</span>) {
      <span class="hljs-keyword">this</span>.inAnimationTime = setTimeout(()=&gt; {
        ReactDOM.findDOMNode(<span class="hljs-keyword">this</span>).getElementsByClassName(<span class="hljs-string">"modal"</span>)[<span class="hljs-number">0</span>].classList.add(<span class="hljs-string">"in"</span>);
      }, <span class="hljs-number">50</span>);
    }
  }</code></pre>
<p>这里的适当的延时是为了保证动画的有效执行。</p>
<ul><li><p>隐藏：先将<code>state.inOutAnimation</code>（动画执行中）设置为<code>true</code>，在<code>componentWillReceiveProps</code>里监听到nextProps.show设置为false时，先通过添加类的方式执行动画，再将<code>inOutAnimation</code>设置为false。<br>我们都知道，<code>display:none</code>会导致动画失效。所以只能在动画执行完之后，才能将display设置为none。</p></li></ul>
<p>只有当<code>this.props.show</code>和<code>this.state.inOutAnimation}</code>都为false时，<code>display none</code>才会生效。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{&quot;com-modal&quot;: true, &quot;show&quot;: this.props.show || this.state.inOutAnimation}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code style="word-break: break-word; white-space: initial;">{<span class="hljs-string">"com-modal"</span>: true, <span class="hljs-string">"show"</span>: this.props.show || this.<span class="hljs-keyword">state</span>.<span class="hljs-keyword">in</span>OutAnimation}</code></pre>
<p>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  componentWillReceiveProps(nextProps) {//隐藏的时候执行动画
    if (this.props.show === true &amp;&amp; nextProps.show === false) {
      this.setState({
        inOutAnimation: true
      });
      ReactDOM.findDOMNode(this).getElementsByClassName(&quot;modal&quot;)[0].classList.remove(&quot;in&quot;);
      this.outAnimationTime = setTimeout(()=> {
        this.setState({
          inOutAnimation: false
        });
      }, 300);
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>  componentWillReceiveProps(nextProps) {<span class="hljs-comment">//隐藏的时候执行动画</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.show === <span class="hljs-literal">true</span> &amp;&amp; nextProps.show === <span class="hljs-literal">false</span>) {
      <span class="hljs-keyword">this</span>.setState({
        inOutAnimation: <span class="hljs-literal">true</span>
      });
      ReactDOM.findDOMNode(<span class="hljs-keyword">this</span>).getElementsByClassName(<span class="hljs-string">"modal"</span>)[<span class="hljs-number">0</span>].classList.remove(<span class="hljs-string">"in"</span>);
      <span class="hljs-keyword">this</span>.outAnimationTime = setTimeout(()=&gt; {
        <span class="hljs-keyword">this</span>.setState({
          inOutAnimation: <span class="hljs-literal">false</span>
        });
      }, <span class="hljs-number">300</span>);
    }
  }</code></pre>
<p>说实话，实现的方式真的很low，又是延时，又是DOM操作的，感觉又回到了jQuery那个战火纷飞、刀耕火种的时代。代码臃肿冗余，基本就只能算实现了功能而已。（但是效果还是可以的）</p>
<h3 id="articleHeader3">效果</h3>
<p><span class="img-wrap"><img data-src="/img/bVE90O?w=681&amp;h=649" src="https://static.alili.tech/img/bVE90O?w=681&amp;h=649" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">Animation Add-Ons</h2>
<p><a href="https://facebook.github.io/react/docs/animation.html" rel="nofollow noreferrer" target="_blank">React animation官方文档</a></p>
<h3 id="articleHeader5">ReactCSStransitionGroup</h3>
<p>首先感谢React发布了<code>Animation Add-Ons</code>，具体包含这才<code>ReactCSStransitionGroup</code>和<code>ReactTransitionGroup </code>是React写动画的正确姿势嘛。<br>先将讲简单的和实用的，那就是ReactCSStransitionGroup 。ReactCSStransitionGroup是在插件类ReactTransitionGroup这个底层API基础上进一步封装的高级API，来简单的实现基本的CSS动画和过渡。</p>
<h4>属性</h4>
<ul><li><p>transitionName:关联CSS类<br>需要自己实现css动画实现的类。如<code>transitionName="up-to-down"</code>，那么你需要在css写以下类，分别是进入前后的状态和离开前后的状态：</p></li></ul>
<p>`</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".right-to-left-enter {
  opacity: 0;
  transform: translate(5%, 0);
}

.right-to-left-enter.right-to-left-enter-active {
  opacity: 1;
  transform: translate(0, 0);
  transition: opacity 150ms linear, transform 200ms ease-out;
}

.right-to-left-leave {
  opacity: 1;
  transform: translate(0, 0);
}

.right-to-left-leave.right-to-left-leave-active {
  opacity: 0;
  transform: translate(1%, 0);
  transition: opacity 100ms linear, transform 200ms linear;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.right-to-left-enter</span> {
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(5%, 0);
}

<span class="hljs-selector-class">.right-to-left-enter</span><span class="hljs-selector-class">.right-to-left-enter-active</span> {
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(0, 0);
  <span class="hljs-attribute">transition</span>: opacity <span class="hljs-number">150ms</span> linear, transform <span class="hljs-number">200ms</span> ease-out;
}

<span class="hljs-selector-class">.right-to-left-leave</span> {
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(0, 0);
}

<span class="hljs-selector-class">.right-to-left-leave</span><span class="hljs-selector-class">.right-to-left-leave-active</span> {
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(1%, 0);
  <span class="hljs-attribute">transition</span>: opacity <span class="hljs-number">100ms</span> linear, transform <span class="hljs-number">200ms</span> linear;
}</code></pre>
<ul>
<li><p>transitionEnterTimeout 进入动画执行的时间</p></li>
<li><p>transitionLeaveTimeout 离开的动画执行的时间</p></li>
<li><p>transitionAppear 是否在初次挂载的时候执行动画<br>如果你选择true，那么你还要加上挂载前后端的类。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".up-to-down-appear {
  opacity: 0;
  transform: translate(0, -45%);
}

.up-to-down-appear.up-to-down-appear-active {
  opacity: 1;
  transform: translate(0, 0);
  transition: opacity 150ms linear, transform 200ms ease-out;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.up-to-down-appear</span> {
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(0, -45%);
}

<span class="hljs-selector-class">.up-to-down-appear</span><span class="hljs-selector-class">.up-to-down-appear-active</span> {
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(0, 0);
  <span class="hljs-attribute">transition</span>: opacity <span class="hljs-number">150ms</span> linear, transform <span class="hljs-number">200ms</span> ease-out;
}</code></pre>
<p>这个方法实现需要添加的CSS类还是挺多的，但是无论如何，也比之前的sou动实现的方式强太多。</p>
<h4>效果：</h4>
<p><span class="img-wrap"><img data-src="/img/bVE95m?w=689&amp;h=718" src="https://static.alili.tech/img/bVE95m?w=689&amp;h=718" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>注意</h4>
<ul>
<li><p>一定要为ReactCSSTransitionGroup的所有子级提供 key属性。即使只渲染一个项目。React靠key来决定哪一个子级进入，离开，或者停留。</p></li>
<li><p>ReactCSSTransitionGroup必须已经挂载到了DOM才能工作。为了使过渡效果应用到子级上，ReactCSSTransitionGroup必须已经挂载到了DOM或者 prop transitionAppear 必须被设置为 true。ReactCSSTransitionGroup 不能随同新项目被挂载，而是新项目应该在它内部被挂载。</p></li>
<li><p>该动画只对子级元素有效，对孙子级元素无效。</p></li>
</ul>
<h3 id="articleHeader6">ReactTransitionGroup</h3>
<p>ReactTransitionGroup是底层的API，相对来说会复杂点，后面再补充吧。</p>
<h2 id="articleHeader7">第三方库</h2>
<p>如果你觉得React提供的<code>Animation Add-Ons</code>不好用或者是不够用，那么尝试一下下面的几个React动画相关的开源项目吧。</p>
<h3 id="articleHeader8"><a href="https://github.com/chenglou/react-motion" rel="nofollow noreferrer" target="_blank">react-motion</a></h3>
<h3 id="articleHeader9"><a href="https://www.npmjs.com/package/velocity-react" rel="nofollow noreferrer" target="_blank">velocity-react</a></h3>
<h3 id="articleHeader10"><a href="https://github.com/react-component/animate" rel="nofollow noreferrer" target="_blank">animation</a></h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React动画的几种实现方式

## 原文链接
[https://segmentfault.com/a/1190000007388260](https://segmentfault.com/a/1190000007388260)

