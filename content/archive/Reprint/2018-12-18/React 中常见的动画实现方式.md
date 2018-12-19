---
title: 'React 中常见的动画实现方式' 
date: 2018-12-18 2:30:11
hidden: true
slug: biugy3wesk5
categories: [reprint]
---

{{< raw >}}

                    
<p>现在，用户对于前端页面的要求已经不能满足于实现功能，更要有颜值，有趣味。除了整体 UI 的美观，在合适的地方添加合适的动画效果往往比静态页面更具有表现力，达到更自然的效果。比如，一个简单的 loading 动画或者页面切换效果不仅能缓解用户的等待情绪，甚至通过使用品牌 logo 等形式，默默达到品牌宣传的效果。</p>
<p>React 作为最近几年比较流行的前端开发框架，提出了虚拟 DOM 概念，所有 DOM 的变化都先发生在虚拟 DOM 上，通过 DOM diff 来分析网页的实际变化，然后反映在真实 DOM 上，从而极大地提升网页性能。然而，在动画实现方面，React 作为框架并不会直接给组件提供动画效果，需要开发者自行实现，而传统 web 动画大多数都通过直接操作实际 DOM 元素来实现，这在 React 中显然是不被提倡的。那么，在 React 中动画都是如何实现的呢？</p>
<p>所有动画的本质都是连续修改 DOM 元素的一个或者多个属性，使其产生连贯的变化效果，从而形成动画。在 React 中实现动画本质上与传统 web 动画一样，仍然是两种方式： 通过 css3 动画实现和通过 js 修改元素属性。只不过在具体实现时，要更为符合 React 的框架特性，可以概括为几类：</p>
<ol>
<li>基于定时器或 requestAnimationFrame(RAF) 的间隔动画；</li>
<li>基于 css3 的简单动画；</li>
<li>React 动画插件 <code>CssTransitionGroup</code>；</li>
<li>结合 hook 实现复杂动画；</li>
<li>其他第三方动画库。</li>
</ol>
<h1 id="articleHeader0">一、基于定时器或 RAF 的间隔动画</h1>
<p>最早，动画的实现都是依靠定时器 <code>setInterval</code>，<code>setTimeout</code> 或者 <code>requestAnimationFrame</code>(RAF) 直接修改 DOM 元素的属性。不熟悉 React 特性的开发者可能会习惯性地通过 <code>ref</code> 或者 <code>findDOMNode()</code> 获取真实的 DOM 节点，直接修改其样式。然而，通过 <code>ref</code> 直接获取真实 DOM 并对其操作是是不被提倡使用，应当尽量避免这种操作。</p>
<p>因此，我们需要将定时器或者 RAF 等方法与 DOM 节点属性通过 <code>state</code> 联系起来。首先，需要提取出与变化样式相关的属性，替换为 <code>state</code>，然后在合适的生命周期函数中添加定时器或者 <code>requestAnimationFrame</code> 不断修改 <code>state</code>，触发组件更新，从而实现动画效果。</p>
<h2 id="articleHeader1">示例</h2>
<p>以一个进度条为例，代码如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用requestAnimationFrame改变state
import React, { Component } from 'react';

export default class Progress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 10
        };
    }

    increase = () => {
        const percent = this.state.percent;
        const targetPercent = percent >= 90 ? 100 : percent + 10;
        const speed = (targetPercent - percent) / 400;
        let start = null;
        const animate = timestamp => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const currentProgress = Math.min(parseInt(speed * progress + percent, 10), targetPercent);
            this.setState({
                percent: currentProgress
            });
            if (currentProgress < targetPercent) {
                window.requestAnimationFrame(animate);
            }
        };
        window.requestAnimationFrame(animate);
    }

    decrease = () => {
        const percent = this.state.percent;
        const targetPercent = percent < 10 ? 0 : percent - 10;
        const speed = (percent - targetPercent) / 400;
        let start = null;
        const animate = timestamp => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const currentProgress = Math.max(parseInt(percent - speed * progress, 10), targetPercent);
            this.setState({
                    percent: currentProgress
                });
            if (currentProgress > targetPercent) {
                window.requestAnimationFrame(animate);
            }
        };
        window.requestAnimationFrame(animate);
    }

    render() {
        const { percent } = this.state;

        return (
            <div>
                <div className=&quot;progress&quot;>
                    <div className=&quot;progress-wrapper&quot; >
                        <div className=&quot;progress-inner&quot; style = "{{"width: `${percent}%`"}}" ></div>
                    </div>
                    <div className=&quot;progress-info&quot; >{percent}%</div>
                </div>
                <div className=&quot;btns&quot;>
                    <button onClick={this.decrease}>-</button>
                    <button onClick={this.increase}>+</button>
                </div>
            </div>
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 使用requestAnimationFrame改变state</span>
<span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Progress</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">percent</span>: <span class="hljs-number">10</span>
        };
    }

    increase = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> percent = <span class="hljs-keyword">this</span>.state.percent;
        <span class="hljs-keyword">const</span> targetPercent = percent &gt;= <span class="hljs-number">90</span> ? <span class="hljs-number">100</span> : percent + <span class="hljs-number">10</span>;
        <span class="hljs-keyword">const</span> speed = (targetPercent - percent) / <span class="hljs-number">400</span>;
        <span class="hljs-keyword">let</span> start = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">const</span> animate = <span class="hljs-function"><span class="hljs-params">timestamp</span> =&gt;</span> {
            <span class="hljs-keyword">if</span> (!start) start = timestamp;
            <span class="hljs-keyword">const</span> progress = timestamp - start;
            <span class="hljs-keyword">const</span> currentProgress = <span class="hljs-built_in">Math</span>.min(<span class="hljs-built_in">parseInt</span>(speed * progress + percent, <span class="hljs-number">10</span>), targetPercent);
            <span class="hljs-keyword">this</span>.setState({
                <span class="hljs-attr">percent</span>: currentProgress
            });
            <span class="hljs-keyword">if</span> (currentProgress &lt; targetPercent) {
                <span class="hljs-built_in">window</span>.requestAnimationFrame(animate);
            }
        };
        <span class="hljs-built_in">window</span>.requestAnimationFrame(animate);
    }

    decrease = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> percent = <span class="hljs-keyword">this</span>.state.percent;
        <span class="hljs-keyword">const</span> targetPercent = percent &lt; <span class="hljs-number">10</span> ? <span class="hljs-number">0</span> : percent - <span class="hljs-number">10</span>;
        <span class="hljs-keyword">const</span> speed = (percent - targetPercent) / <span class="hljs-number">400</span>;
        <span class="hljs-keyword">let</span> start = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">const</span> animate = <span class="hljs-function"><span class="hljs-params">timestamp</span> =&gt;</span> {
            <span class="hljs-keyword">if</span> (!start) start = timestamp;
            <span class="hljs-keyword">const</span> progress = timestamp - start;
            <span class="hljs-keyword">const</span> currentProgress = <span class="hljs-built_in">Math</span>.max(<span class="hljs-built_in">parseInt</span>(percent - speed * progress, <span class="hljs-number">10</span>), targetPercent);
            <span class="hljs-keyword">this</span>.setState({
                    <span class="hljs-attr">percent</span>: currentProgress
                });
            <span class="hljs-keyword">if</span> (currentProgress &gt; targetPercent) {
                <span class="hljs-built_in">window</span>.requestAnimationFrame(animate);
            }
        };
        <span class="hljs-built_in">window</span>.requestAnimationFrame(animate);
    }

    render() {
        <span class="hljs-keyword">const</span> { percent } = <span class="hljs-keyword">this</span>.state;

        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"progress"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"progress-wrapper"</span> &gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"progress-inner"</span> <span class="hljs-attr">style</span> = <span class="hljs-string">"{{"width:</span> `${<span class="hljs-attr">percent</span>}%`"}}" &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"progress-info"</span> &gt;</span>{percent}%<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"btns"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.decrease}</span>&gt;</span>-<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.increase}</span>&gt;</span>+<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }
}</code></pre>
<p>在示例中，我们在 <code>increase</code> 和 <code>decrease</code> 函数中构建线性过渡函数 <code>animation</code>，<code>requestAnimationFrame</code> 在浏览器每次重绘前执行会执行过渡函数，计算当前进度条<code>width</code> 属性并更新该 <code>state</code>，使得进度条重新渲染。该示例的效果如下所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012783444?w=599&amp;h=62" src="https://static.alili.tech/img/remote/1460000012783444?w=599&amp;h=62" alt="RAF实现进度条效果" title="RAF实现进度条效果" style="cursor: pointer;"></span></p>
<p>这种实现方式在使用 <code>requestAnimationFrame</code> 时性能不错，完全使用纯 js 实现，不依赖于 css，使用定时器时可能出现掉帧卡顿现象。此外，还需要开发者根据速度函数自己计算状态，比较复杂。</p>
<h1 id="articleHeader2">二、基于 css3 的简单动画</h1>
<p>当 css3 中的 <code>animation</code> 和 <code>transition</code> 出现和普及后，我们可以轻松地利用 css 实现元素样式的变化，而不用通过人为计算实时样式。</p>
<h2 id="articleHeader3">示例</h2>
<p>我们仍以上面的进度条为例，使用 css3 实现进度条动态效果，代码如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';

export default class Progress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 10
        };
    }

    increase = () => {
        const percent = this.state.percent + 10;
        this.setState({
            percent: percent > 100 ? 100 : percent,
        })
    }

    decrease = () => {
        const percent = this.state.percent - 10;
        this.setState({
            percent: percent < 0 ? 0 : percent,
        })
    }

    render() {
        // 同上例， 省略
        ....
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Progress</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">percent</span>: <span class="hljs-number">10</span>
        };
    }

    increase = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> percent = <span class="hljs-keyword">this</span>.state.percent + <span class="hljs-number">10</span>;
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">percent</span>: percent &gt; <span class="hljs-number">100</span> ? <span class="hljs-number">100</span> : percent,
        })
    }

    decrease = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> percent = <span class="hljs-keyword">this</span>.state.percent - <span class="hljs-number">10</span>;
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">percent</span>: percent &lt; <span class="hljs-number">0</span> ? <span class="hljs-number">0</span> : percent,
        })
    }

    render() {
        <span class="hljs-comment">// 同上例， 省略</span>
        ....
    }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".progress-inner {
  transition: width 400ms cubic-bezier(0.08, 0.82, 0.17, 1);
  // 其他样式同上，省略
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.progress-inner</span> {
  <span class="hljs-attribute">transition</span>: width <span class="hljs-number">400ms</span> <span class="hljs-built_in">cubic-bezier</span>(0.08, 0.82, 0.17, 1);
  // 其他样式同上，省略
  ...
}</code></pre>
<p>在示例中，<code>increase</code> 和 <code>decrease</code> 函数中不再计算 <code>width</code>，而是直接设置增减后的宽度。需要注意的是，在 css 样式中设置了 <code>transition</code> 属性，当 width 属性发生变化时自动实现样式的动态变化效果，并且可以设置不同的速度效果的速度曲线。该示例的效果如下图所示，可以发现，与上一个例子不同的是，右侧的进度数据是直接变化为目标数字，没有具体的变化过程，而进度条的动态效果因为不再是线性变化，效果更为生动。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012783445?w=599&amp;h=66" src="https://static.alili.tech/img/remote/1460000012783445?w=599&amp;h=66" alt="进度条效果" title="进度条效果" style="cursor: pointer;"></span></p>
<p>基于 css3 的实现方式具有较高的性能，代码量少，但是只能依赖于 css 效果，对于复杂动画也很难实现。此外，通过修改 <code>state</code> 实现动画效果，只能作用于已经存在于 DOM 树中的节点。如果想用这种方式为组件添加入场和离场动画，需要维持至少两个 <code>state</code> 来实现入场和离场动画，其中一个 <code>state</code> 用于控制元素是否显示，另一个 <code>state</code> 用于控制元素在动画中的变化属性。在这种情况下，开发者需要花费大量精力来维护组件的动画逻辑，十分复杂繁琐。</p>
<h1 id="articleHeader4">三、React 动画插件 <code>CssTransitionGroup</code>
</h1>
<p>React 曾为开发者提供过动画插件 <a href="https://reactjs.org/docs/animation.html" rel="nofollow noreferrer" target="_blank"><code>react-addons-css-transition-group</code></a>，后交由社区维护，形成现在的 <a href="https://github.com/reactjs/react-transition-group/tree/v1-stable" rel="nofollow noreferrer" target="_blank"><code>react-transition-group</code></a>，该插件可以方便地实现组件的入场和离场动画，使用时需要开发者额外安装。<code>react-transition-group</code> 包含 <code>CSSTransitionGroup</code> 和 <code>TransitionGroup</code> 两个动画插件，其中，后者是底层 api，前者是后者的进一步封装，可以较为便捷地实现 css 动画。</p>
<h2 id="articleHeader5">示例</h2>
<p>以一个动态增加tab的为例，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

let uid = 2;
export default class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeId: 1,
            tabData: [{
                id: 1,
                panel: '选项1'
            }, {
                id: 2,
                panel: '选项2'
            }]
        };
    }

    addTab = () => {
        // 添加tab代码
        ...
    }

    deleteTab = (id) => {
        // 删除tab代码
        ...
    }

    render() {
        const { tabData, activeId } = this.state;

        const renderTabs = () => {
            return tabData.map((item, index) => {
                return (
                    <div
                        className={`tab-item${item.id === activeId ? ' tab-item-active' : ''}`}
                        key={`tab${item.id}`}
                    >
                        {item.panel}
                        <span className=&quot;btns btn-delete&quot; onClick={() => this.deleteTab(item.id)}>✕</span>
                    </div>
                );
            })
        }

        return (
            <div>
                <div className=&quot;tabs&quot; >
                    <CSSTransitionGroup
                      transitionName=&quot;tabs-wrap&quot;
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={500}
                    >
                      {renderTabs()}
                    </CSSTransitionGroup>
                    <span className=&quot;btns btn-add&quot; onClick={this.addTab}>+</span>
                </div>
                <div className=&quot;tab-cont&quot;>
                    cont
                </div>
            </div>
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { CSSTransitionGroup } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-transition-group'</span>;

<span class="hljs-keyword">let</span> uid = <span class="hljs-number">2</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Tabs</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">activeId</span>: <span class="hljs-number">1</span>,
            <span class="hljs-attr">tabData</span>: [{
                <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
                <span class="hljs-attr">panel</span>: <span class="hljs-string">'选项1'</span>
            }, {
                <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>,
                <span class="hljs-attr">panel</span>: <span class="hljs-string">'选项2'</span>
            }]
        };
    }

    addTab = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-comment">// 添加tab代码</span>
        ...
    }

    deleteTab = <span class="hljs-function">(<span class="hljs-params">id</span>) =&gt;</span> {
        <span class="hljs-comment">// 删除tab代码</span>
        ...
    }

    render() {
        <span class="hljs-keyword">const</span> { tabData, activeId } = <span class="hljs-keyword">this</span>.state;

        <span class="hljs-keyword">const</span> renderTabs = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-keyword">return</span> tabData.map(<span class="hljs-function">(<span class="hljs-params">item, index</span>) =&gt;</span> {
                <span class="hljs-keyword">return</span> (
                    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
                        <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>`<span class="hljs-attr">tab-item</span>${<span class="hljs-attr">item.id</span> === <span class="hljs-string">activeId</span> ? ' <span class="hljs-attr">tab-item-active</span>' <span class="hljs-attr">:</span> ''}`}
                        <span class="hljs-attr">key</span>=<span class="hljs-string">{</span>`<span class="hljs-attr">tab</span>${<span class="hljs-attr">item.id</span>}`}
                    &gt;</span>
                        {item.panel}
                        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"btns btn-delete"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> this.deleteTab(item.id)}&gt;✕<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
                );
            })
        }

        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"tabs"</span> &gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">CSSTransitionGroup</span>
                      <span class="hljs-attr">transitionName</span>=<span class="hljs-string">"tabs-wrap"</span>
                      <span class="hljs-attr">transitionEnterTimeout</span>=<span class="hljs-string">{500}</span>
                      <span class="hljs-attr">transitionLeaveTimeout</span>=<span class="hljs-string">{500}</span>
                    &gt;</span>
                      {renderTabs()}
                    <span class="hljs-tag">&lt;/<span class="hljs-name">CSSTransitionGroup</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"btns btn-add"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.addTab}</span>&gt;</span>+<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"tab-cont"</span>&gt;</span>
                    cont
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* tab动态增加动画 */
.tabs-wrap-enter {
  opacity: 0.01;
}

.tabs-wrap-enter.tabs-wrap-enter-active {
  opacity: 1;
  transition: all 500ms ease-in;
}

.tabs-wrap-leave {
  opacity: 1;
}

.tabs-wrap-leave.tabs-wrap-leave-active {
  opacity: 0.01;
  transition: all 500ms ease-in;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* tab动态增加动画 */</span>
<span class="hljs-selector-class">.tabs-wrap-enter</span> {
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.01</span>;
}

<span class="hljs-selector-class">.tabs-wrap-enter</span><span class="hljs-selector-class">.tabs-wrap-enter-active</span> {
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
  <span class="hljs-attribute">transition</span>: all <span class="hljs-number">500ms</span> ease-in;
}

<span class="hljs-selector-class">.tabs-wrap-leave</span> {
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
}

<span class="hljs-selector-class">.tabs-wrap-leave</span><span class="hljs-selector-class">.tabs-wrap-leave-active</span> {
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.01</span>;
  <span class="hljs-attribute">transition</span>: all <span class="hljs-number">500ms</span> ease-in;
}</code></pre>
<p><code>CSSTransitionGroup</code> 可以为其子节点添加额外的 css 类，然后通过 css 动画达到入场和离场动画效果。为了给每个 tab 节点添加动画效果，需要先将它们包裹在 <code>CSSTransitionGroup</code> 组件中。 当设定 <code>transitionName</code> 属性为 <code>'tabs-wrapper'</code>，<code>transitionEnterTimeout</code> 为400毫秒后，一旦 <code>CSSTransitionGroup</code> 中新增节点，该新增节点会在出现时被添加上 css 类 <code>'tabs-wrapper-enter'</code>，然后在下一帧时被添加上 css 类 <code>'tabs-wrapper-enter-active'</code>。由于这两个 css 类中设定了不同的透明度和 css3 transition 属性，所以节点实现了透明度由小到大的入场效果。400毫秒后 css 类 <code>'tabs-wrapper-enter'</code> 和 <code>'tabs-wrapper-enter-active'</code> 将会同时被移除，节点完成整个入场动画过程。离场动画的实现类似于入场动画，只不过被添加的 css 类名为 <code>'tabs-wrapper-leave'</code> 和 <code>'tabs-wrapper-leave-active'</code>。该示例效果如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012783446?w=600&amp;h=72" src="https://static.alili.tech/img/remote/1460000012783446?w=600&amp;h=72" alt="动态增加tab效果" title="动态增加tab效果" style="cursor: pointer;"></span></p>
<p><code>CSSTransitionGroup</code> 支持以下7个属性：<br><span class="img-wrap"><img data-src="/img/remote/1460000012783447?w=1404&amp;h=546" src="https://static.alili.tech/img/remote/1460000012783447?w=1404&amp;h=546" alt="CSSTransitionGroup 属性" title="CSSTransitionGroup 属性" style="cursor: pointer;"></span></p>
<p>其中，入场和离场动画是默认开启的，使用时需要设置 <code>transitionEnterTimeout</code> 和 <code>transitionLeaveTimeout</code>。值得注意的是，<code>CSSTransitionGroup</code> 还提供出现动画（appear），使用时需要设置 <code>transitionAppearTimeout</code>。那么，出现动画和入场动画有什么区别呢？当设定 <code>transitionAppear</code> 为 <code>true</code> 时，<code>CSSTransitionGroup</code> 在<strong>初次渲染</strong>时，会添加一个出现阶段。在该阶段中，<code>CSSTransitionGroup</code> 的已有子节点都会被相继添加 css 类  <code>'tabs-wrapper-appear'</code> 和 <code>'tabs-wrapper-appear-active'</code>，实现出现动画效果。因此，<strong>出现动画仅适用于 <code>CSSTransitionGroup</code> 在初次渲染时就存在的子节点</strong>，一旦 <code>CSSTransitionGroup</code> 完成渲染，其子节点就只可能有入场动画（enter），不可能有出现动画（appear）。</p>
<p>此外，使用 <code>CSSTransitionGroup</code> 需要注意以下几点：</p>
<ul>
<li>
<code>CSSTransitionGroup</code> 默认在 DOM 树中生成一个 <code>span</code> 标签包裹其子节点，如果想要使用其他 html 标签，可设定 <code>CSSTransitionGroup</code> 的 <code>component</code> 属性；</li>
<li>
<code>CSSTransitionGroup</code> 的子元素必须添加 <code>key</code> 值才会在节点发生变化时，准确地计算出哪些节点需要添加入场动画，哪些节点需要添加离场动画；</li>
<li>
<code>CSSTransitionGroup</code> 的动画效果只作用于直接子节点，不作用于其孙子节点；</li>
<li>动画的结束时间不以 css 中 transition-duration 为准，而是以 <code>transitionEnterTimeout</code>，<code>transitionLeaveTimeout</code>，<code>TransitionAppearTimeout</code> 为准，因为某些情况下 transitionend 事件不会被触发，详见<a href="https://developer.mozilla.org/en-US/docs/Web/Events/transitionend" rel="nofollow noreferrer" target="_blank">MDN transitionend</a>。</li>
</ul>
<p><code>CSSTransitionGroup</code> 实现动画的优点是：</p>
<ul>
<li>简单易用，可以方便快捷地实现元素的入场和离场动画；</li>
<li>与 React 结合，性能比较好。</li>
</ul>
<p><code>CSSTransitionGroup</code> 缺点也十分明显：</p>
<ul>
<li>局限于出现动画，入场动画和离场动画；</li>
<li>由于需要制定 <code>transitionName</code>，灵活性不够；</li>
<li>只能依靠 css 实现简单的动画。</li>
</ul>
<h1 id="articleHeader6">四、结合 hook 实现复杂动画</h1>
<p>在实际项目中，可能需要一些更炫酷的动画效果，这些效果仅依赖于 css3 往往较难实现。此时，我们不妨借助一些成熟的第三方库，如 jQuery 或 GASP，结合 React 组件中的生命周期钩子方法 hook 函数，实现复杂动画效果。除了 React 组件正常的生命周期外，<code>CSSTransitionGroup</code> 的底层 api <code>TransitonGroup</code> 还为其子元素额外提供了一系列特殊的生命周期 hook 函数，在这些 hook 函数中结合第三方动画库可以实现丰富的入场、离场动画效果。</p>
<p><code>TransisitonGroup</code> 分别提供一下六个生命周期 hook 函数：</p>
<ul>
<li>componentWillAppear(callback)</li>
<li>componentDidAppear()</li>
<li>componentWillEnter(callback)</li>
<li>componentDidEnter()</li>
<li>componentWillLeave(callback)</li>
<li>componentDidLeave()</li>
</ul>
<p>它们的触发时机如图所示：<br><span class="img-wrap"><img data-src="/img/remote/1460000012783448?w=1442&amp;h=890" src="https://static.alili.tech/img/remote/1460000012783448?w=1442&amp;h=890" alt="TransitionGroup组件生命周期与自组件生命周期的关系" title="TransitionGroup组件生命周期与自组件生命周期的关系" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">示例</h2>
<p><a href="https://greensock.com/gsap" rel="nofollow noreferrer" target="_blank">GASP</a> 是一个 flash 时代发展至今的动画库，借鉴视频帧的概念，特别适合做长时间的序列动画效果。本文中，我们用 <code>TransitonGroup</code> 和 <a href="https://github.com/azazdeaz/react-gsap-enhancer" rel="nofollow noreferrer" target="_blank"><code>react-gsap-enhancer</code></a>（一个可以将 GSAP 应用于 React 的增强库）完成一个图片画廊，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import { TransitionGroup } from 'react-transition-group';
import GSAP from 'react-gsap-enhancer'
import { TimelineMax, Back, Sine } from 'gsap';

class Photo extends Component {
    constructor(props) {
        super(props);
    }

    componentWillEnter(callback) {
        this.addAnimation(this.enterAnim, {callback: callback})
    }

    componentWillLeave(callback) {
        this.addAnimation(this.leaveAnim, {callback: callback})
    }

    enterAnim = (utils) => {
        const { id } = this.props;
        return new TimelineMax()
            .from(utils.target, 1, {
                x: `+=${( 4 - id ) * 60}px`,
                autoAlpha: 0,
                onComplete: utils.options.callback,
            }, id * 0.7);
    }

    leaveAnim = (utils) => {
        const { id } = this.props;
        return new TimelineMax()
            .to(utils.target, 0.5, {
                scale: 0,
                ease: Sine.easeOut,
                onComplete: utils.options.callback,
            }, (4 - id) * 0.7);
    }

    render() {
        const { url } = this.props;
        return (
            <div className=&quot;photo&quot;>
                <img src={url} />
            </div>
        )
    }
}

const WrappedPhoto = GSAP()(Photo);

export default class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            photos: [{
                id: 1,
                url: 'http://img4.imgtn.bdimg.com/it/u=1032683424,3204785822&amp;fm=214&amp;gp=0.jpg'
            }, {
                id: 2,
                url: 'http://imgtu.5011.net/uploads/content/20170323/7488001490262119.jpg'
            }, {
                id: 3,
                url: 'http://tupian.enterdesk.com/2014/lxy/2014/12/03/18/10.jpg'
            }, {
                id: 4,
                url: 'http://img4.imgtn.bdimg.com/it/u=360498760,1598118672&amp;fm=27&amp;gp=0.jpg'
            }]
        };
    }

    toggle = () => {
        this.setState({
            show: !this.state.show
        })
    }

    render() {
        const { show, photos } = this.state;

        const renderPhotos = () => {
            return photos.map((item, index) => {
                return <WrappedPhoto id={item.id} url={item.url} key={`photo${item.id}`} />;
            })
        }

        return (
            <div>
                <button onClick={this.toggle}>toggle</button>
                <TransitionGroup component=&quot;div&quot;>
                    {show &amp;&amp; renderPhotos()}
                </TransitionGroup>
            </div>
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { TransitionGroup } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-transition-group'</span>;
<span class="hljs-keyword">import</span> GSAP <span class="hljs-keyword">from</span> <span class="hljs-string">'react-gsap-enhancer'</span>
<span class="hljs-keyword">import</span> { TimelineMax, Back, Sine } <span class="hljs-keyword">from</span> <span class="hljs-string">'gsap'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Photo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
    }

    componentWillEnter(callback) {
        <span class="hljs-keyword">this</span>.addAnimation(<span class="hljs-keyword">this</span>.enterAnim, {<span class="hljs-attr">callback</span>: callback})
    }

    componentWillLeave(callback) {
        <span class="hljs-keyword">this</span>.addAnimation(<span class="hljs-keyword">this</span>.leaveAnim, {<span class="hljs-attr">callback</span>: callback})
    }

    enterAnim = <span class="hljs-function">(<span class="hljs-params">utils</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> { id } = <span class="hljs-keyword">this</span>.props;
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> TimelineMax()
            .from(utils.target, <span class="hljs-number">1</span>, {
                <span class="hljs-attr">x</span>: <span class="hljs-string">`+=<span class="hljs-subst">${( <span class="hljs-number">4</span> - id ) * <span class="hljs-number">60</span>}</span>px`</span>,
                <span class="hljs-attr">autoAlpha</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">onComplete</span>: utils.options.callback,
            }, id * <span class="hljs-number">0.7</span>);
    }

    leaveAnim = <span class="hljs-function">(<span class="hljs-params">utils</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> { id } = <span class="hljs-keyword">this</span>.props;
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> TimelineMax()
            .to(utils.target, <span class="hljs-number">0.5</span>, {
                <span class="hljs-attr">scale</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">ease</span>: Sine.easeOut,
                <span class="hljs-attr">onComplete</span>: utils.options.callback,
            }, (<span class="hljs-number">4</span> - id) * <span class="hljs-number">0.7</span>);
    }

    render() {
        <span class="hljs-keyword">const</span> { url } = <span class="hljs-keyword">this</span>.props;
        <span class="hljs-keyword">return</span> (
            &lt;div className="photo"&gt;
                &lt;img src={url} /&gt;
            &lt;/div&gt;
        )
    }
}

const WrappedPhoto = GSAP()(Photo);

export default class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            photos: [{
                id: 1,
                url: 'http://img4.imgtn.bdimg.com/it/u=1032683424,3204785822&amp;fm=214&amp;gp=0.jpg'
            }, {
                id: 2,
                url: 'http://imgtu.5011.net/uploads/content/20170323/7488001490262119.jpg'
            }, {
                id: 3,
                url: 'http://tupian.enterdesk.com/2014/lxy/2014/12/03/18/10.jpg'
            }, {
                id: 4,
                url: 'http://img4.imgtn.bdimg.com/it/u=360498760,1598118672&amp;fm=27&amp;gp=0.jpg'
            }]
        };
    }

    toggle = () =&gt; {
        this.setState({
            show: !this.state.show
        })
    }

    render() {
        const { show, photos } = this.state;

        const renderPhotos = () =&gt; {
            return photos.map((item, index) =&gt; {
                return &lt;WrappedPhoto id={item.id} url={item.url} key={`photo${item.id}`} /&gt;;
            })
        }

        return (
            &lt;div&gt;
                &lt;button onClick={this.toggle}&gt;toggle&lt;/button&gt;
                &lt;TransitionGroup component="div"&gt;
                    {show &amp;&amp; renderPhotos()}
                &lt;/TransitionGroup&gt;
            &lt;/div&gt;
        );
    }
}</code></pre>
<p>在该示例中，我们在子组件 <code>Photo</code> 的 <code>componentWillEnter</code> 和 <code>componentWillLeave</code> 两个 hook 函数中为每个子组件添加了入场动画 <code>enterAnim</code> 和 离场动画 <code>LeaveAnim</code>。在入场动画中，使用 <code>TimeLineMax.from(target, duration, vars, delay)</code> 方式建立时间轴动画，指定了每个子组件的动画移动距离随 <code>id</code> 增大而减小，延期时间随着 <code>id</code> 增大而增大，离场动画中每个子组件的延期时间随着 <code>id</code> 增大而减小，从而实现根据组件 <code>id</code> 不同具有不同的动画效果。实际使用时，你可以根据需求对任一子组件添加不同的效果。该示例的效果如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012783449?w=600&amp;h=181" src="https://static.alili.tech/img/remote/1460000012783449?w=600&amp;h=181" alt="图片画廊效果" title="图片画廊效果" style="cursor: pointer; display: inline;"></span></p>
<p>在使用 <code>TransitionGroup</code> 时，在 <code>componentnWillAppear(callback)</code>，<code>componentnWillEntercallback)</code>，<code>componentnWillLeave(callback)</code> 函数中一定要<strong>在函数逻辑结束后调用 <code>callback</code>，以保证 <code>TransitionGroup</code> 能正确维护子节点的状态序列</strong>。关于 GASP 的详细使用方法可参考<a href="https://greensock.com/gsap" rel="nofollow noreferrer" target="_blank">GASP官方文档</a>和博文<a href="http://acgtofe.com/posts/2016/05/gsap-for-animation-pro" rel="nofollow noreferrer" target="_blank">GSAP，专业的Web动画库</a>，本文不再赘述。</p>
<p>结合 hook 实现动画可以支持各种复杂动画，如时间序列动画等，由于依赖第三方库，往往动画效果比较流畅，用户体验较好。但是第三方库的引入，需要开发者额外学习对应的 api，也提升了代码复杂度。</p>
<h1 id="articleHeader8">五、其他第三方动画库</h1>
<p>此外，还有很多优秀的第三方动画库，如 <a href="https://github.com/chenglou/react-motion" rel="nofollow noreferrer" target="_blank">react-motion</a>，Animated，<a href="https://github.com/google-fabric/velocity-react" rel="nofollow noreferrer" target="_blank">velocity-react</a>等，这些动画库在使用时也各有千秋。</p>
<h2 id="articleHeader9">Animated</h2>
<p><a href="https://github.com/animatedjs/animated" rel="nofollow noreferrer" target="_blank">Animated</a> 是一个跨平台的动画库，兼容 React 和 React Native。由于在动画过程中，我们只关心动画的初始状态、结束状态和变化函数，并不关心每个时刻元素属性的具体值，所以 Animated 采用声明式的动画，通过它提供的特定方法计算 css 对象，并传入 <code>Animated.div</code> 实现动画效果。</p>
<h4>示例</h4>
<p>我们使用 Animated 实现一个图片翻转的效果，代码如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import Animated from 'animated/lib/targets/react-dom';

export default class PhotoPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anim: new Animated.Value(0)
        };
    }

    handleClick = () => {
        const { anim } = this.state;
        anim.stopAnimation(value => {
            Animated.spring(anim, {
                toValue: Math.round(value) + 1
            }).start();
        });
    }

    render() {
        const { anim } = this.state;

        const rotateDegree = anim.interpolate({
            inputRange: [0, 4],
            outputRange: ['0deg', '360deg']
        });

        return (
            <div>
                <button onClick={this.handleClick}>向右翻转</button>
                <Animated.div
                    style="{{"
                        transform: [{
                            rotate: rotateDegree
                        }]
                    "}}"
                    className=&quot;preivew-wrapper&quot;
                >
                    <img
                        alt=&quot;img&quot;
                        src=&quot;http://img4.imgtn.bdimg.com/it/u=1032683424,3204785822&amp;fm=214&amp;gp=0.jpg&quot;
                    />
                </Animated.div>
            </div>
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> Animated <span class="hljs-keyword">from</span> <span class="hljs-string">'animated/lib/targets/react-dom'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">PhotoPreview</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">anim</span>: <span class="hljs-keyword">new</span> Animated.Value(<span class="hljs-number">0</span>)
        };
    }

    handleClick = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> { anim } = <span class="hljs-keyword">this</span>.state;
        anim.stopAnimation(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
            Animated.spring(anim, {
                <span class="hljs-attr">toValue</span>: <span class="hljs-built_in">Math</span>.round(value) + <span class="hljs-number">1</span>
            }).start();
        });
    }

    render() {
        <span class="hljs-keyword">const</span> { anim } = <span class="hljs-keyword">this</span>.state;

        <span class="hljs-keyword">const</span> rotateDegree = anim.interpolate({
            <span class="hljs-attr">inputRange</span>: [<span class="hljs-number">0</span>, <span class="hljs-number">4</span>],
            <span class="hljs-attr">outputRange</span>: [<span class="hljs-string">'0deg'</span>, <span class="hljs-string">'360deg'</span>]
        });

        <span class="hljs-keyword">return</span> (
            &lt;div&gt;
                &lt;button onClick={this.handleClick}&gt;向右翻转&lt;/button&gt;
                &lt;Animated.div
                    style="{{"
                        transform: [{
                            rotate: rotateDegree
                        }]
                    "}}"
                    className="preivew-wrapper"
                &gt;
                    &lt;img
                        alt="img"
                        src="http://img4.imgtn.bdimg.com/it/u=1032683424,3204785822&amp;fm=214&amp;gp=0.jpg"
                    /&gt;
                &lt;/Animated.div&gt;
            &lt;/div&gt;
        );
    }
}</code></pre>
<p>在该示例中，我们希望实现每点击一次按钮，图片向右旋转90°。在组件初始化时新建了一个初始值为 0 的 <code>Animated</code> 对象 <code>this.state.anim</code>。<code>Animated</code> 对象中有插值函数 <code>interpolate</code>，当设定输入区间 <code>inputRange</code> 和输出区间 <code>outputRange</code> 后，插值函数可以根据 <code>Animated</code> 对象的当前值进行线性插值，计算得到对应的映射值。</p>
<p>在本例中，我们假设每点击一次按钮，<code>this.state.anim</code> 的值加 1，图像需要转动90°。在 render 函数中，我们设置插值函数 <code>this.state.anim.interpolate</code> 的输入区间为[0, 4]，输出区间为['0deg', '360deg']。当执行动画时，<code>this.state.anim</code> 的值发生变化，插值函数根据 <code>this.state.anim</code> 当前值，计算得到旋转角度 <code>rotateDegree</code>，触发组件的重新渲染。因此，如果 <code>Animated</code> 对象当前值为 2，对应的旋转角度就是 180deg。在组件渲染结构中，需要使用 <code>Animated.div</code> 包裹动画节点，并将 <code>rotateDegree</code> 封装为 css 对象作为 stlye 传入 <code>Animated.div</code> 中，实现节点 css 属性的变化。</p>
<p>在点击事件中，考虑到按钮可能连续多次点击，我们首先使用 <code>stopAnimation</code> 停止当前正在进行的动画，该函数会在回调函数中返回一个 <code>{value : number}</code> 对象，<code>value</code> 对应最后一刻的动画属性值。根据获取的 <code>value</code> 值，随后使用 <code>Animated.spring</code> 函数开启一次新的弹簧动画过程，从而实现一个流畅的动画效果。由于每次转动停止时，我们希望图片的翻转角度都是90°的整数倍，所以需要对 <code>Animated.spring</code> 的终止值进行取整。最终我们实现了如下效果:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012783450?w=599&amp;h=404" src="https://static.alili.tech/img/remote/1460000012783450?w=599&amp;h=404" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>使用时需要注意一下几点：</p>
<ul>
<li>
<code>Animated</code> 对象的值和其插值结果只能作用于 <code>Animated.div</code> 节点；</li>
<li>
<code>interpolate</code> 默认会根据输入区间和输出区间进行线性插值，如果输入值超出输入区间不受影响，插值结果默认会根据输出区间向外延展插值，可以通过设置 <code>extrapolate</code> 属性限制插值结果区间。</li>
</ul>
<p>Animated 在动画过程中不直接修改组件 <code>state</code>，而是通过其新建对象的组件和方法直接修改元素的属性，不会重复触发 render 函数，是 React Native 中非常稳定的动画库。但是在 React 中存在低版本浏览器兼容问题，且具有一定学习成本。</p>
<h1 id="articleHeader10">结语</h1>
<p>当我们在 React 中实现动画时，首先要考量动画的难易程度和使用场景，对于简单动画，优先使用 css3 实现，其次是基于 js 的时间间隔动画。如果是元素入场动画和离场动画，则建议结合 <code>CSSTransitionGroup</code> 或者 <code>TransitionGroup</code> 实现。当要实现的动画效果较为复杂时，不妨尝试一些优秀的第三方库，打开精彩的动效大门。</p>
<p>Ps. 本文所有示例代码可访问 <a href="https://github.com/fairyaierl/react-animation-demos" rel="nofollow noreferrer" target="_blank">github</a> 查看</p>
<h1 id="articleHeader11">参考资料：</h1>
<p><a href="https://github.com/reactjs/react-transition-group/tree/v1-stable" rel="nofollow noreferrer" target="_blank">react-transition-group</a></p>
<p><a href="http://azazdeaz.github.io/react-gsap-enhancer/#/demo/using-transition-group?_k=n0lcbb" rel="nofollow noreferrer" target="_blank">react-gsap-enhancer</a></p>
<p><a href="https://css-tricks.com/comparison-animation-technologies/" rel="nofollow noreferrer" target="_blank">A Comparison of Animation Technologies</a></p>
<p><a href="https://medium.com/react-native-training/react-animations-in-depth-433e2b3f0e8e" rel="nofollow noreferrer" target="_blank">React Animations in Depth</a></p>
<blockquote>本文首发于<a href="https://tech.youzan.com/react-animations/" rel="nofollow noreferrer" target="_blank">有赞技术博客</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 中常见的动画实现方式

## 原文链接
[https://segmentfault.com/a/1190000012783439](https://segmentfault.com/a/1190000012783439)

