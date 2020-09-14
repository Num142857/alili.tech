---
title: 'React系列——react 15.5+ 使用CSSTransitionGroup实现路由过渡动画' 
date: 2019-01-13 2:30:11
hidden: true
slug: 2bd3gfrgiw6
categories: [reprint]
---

{{< raw >}}

                    
<p>在做react项目过程中，有时候想实现app的那种上下左右切换路由的特效，但是一直没有找到合适的教程，要么说的不清楚，没有demo，要么就是版本太老，过时了，要抓狂啦?。</p>
<p>根据网上搜到的资料，以前实现react动画有这么几种方式：  </p>
<p>1、ReactCSSTransitionGroup</p>
<p>2、react-router-transition</p>
<p>3、还有的就是根据这2个库做了二次封装的一些动画插件。</p>
<p>但是，在这里我要分享的是 <a href="https://github.com/reactjs/react-transition-group" rel="nofollow noreferrer" target="_blank"><strong>react-transition-group</strong></a>，为什么是这个，而不是上面2个，因为这个动画插件兼容react15.4+版本，而且也是官方推荐的，上面2个插件只适合react老版本的动画。</p>
<h3 id="articleHeader0">注意，该教程只对react-transition-group的V1.1.1版本有效。对V2无效。V2的API被作者改了。</h3>
<p>你可以先浏览，觉得可以再看下面的内容：<a href="https://hyy1115.github.io/huangyongyue" rel="nofollow noreferrer" target="_blank">react过渡动画线上效果</a>（请点击右上角的搜索按钮查看动画）</p>
<h4>安装 react-transition-group</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install react-transition-group --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">npm install react-transition-<span class="hljs-keyword">group</span> <span class="hljs-title">--save</span></code></pre>
<h4>在react中使用 react-transition-group</h4>
<p>我使用的版本是 <strong>react15.5 + react-router4 + redux3.6</strong></p>
<p>为什么要提到这3个插件？</p>
<p>答：非常关键，如果你的项目没有使用redux，那么请寻找其他动画方案。</p>
<p>原理：在路由外层使用 react-transition-group ，配置动画样式、同时你还需要一个唯一的key表示子节点。</p>
<p>我们知道，react-router4被设计成了组件，可以在react组件中任意位置使用，常常你在入口处需要用到react-router，因为你希望一打开首页，就要加载首页路由，还有可以从首页跳往其他页面的路由组件。</p>
<p>在 App.js中，关键代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import createHistory from 'history/createHashHistory'
const history = createHistory()

export default class App extends React.Component {
    render() {
        const { animateCls } = this.props.global
        return (
            <Router history={history}>
              <Route render={({ location }) => {
                  return(
                      <CSSTransitionGroup
                          transitionName={animateCls}
                          transitionEnter={true}
                          transitionLeave={true}
                          transitionEnterTimeout={400}
                          transitionLeaveTimeout={400}
                      >
                          <div key={location.pathname}>
                              <Route location={location} exact path=&quot;/&quot; component={Home} />
                              <Route location={location} path=&quot;/search&quot; component={Search} />
                          </div>
                      </CSSTransitionGroup>
                  )
              "}}"/>
          </Router>
        )
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">CSSTransitionGroup</span> from <span class="hljs-symbol">'react</span>-transition-group/<span class="hljs-type">CSSTransitionGroup</span>'
<span class="hljs-keyword">import</span> createHistory from <span class="hljs-symbol">'history</span>/createHashHistory'
const history = createHistory()

export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        const { animateCls } = <span class="hljs-keyword">this</span>.props.global
        <span class="hljs-keyword">return</span> (
            &lt;<span class="hljs-type">Router</span> history={history}&gt;
              &lt;<span class="hljs-type">Route</span> render={({ location }) =&gt; {
                  <span class="hljs-keyword">return</span>(
                      &lt;<span class="hljs-type">CSSTransitionGroup</span>
                          transitionName={animateCls}
                          transitionEnter={<span class="hljs-literal">true</span>}
                          transitionLeave={<span class="hljs-literal">true</span>}
                          transitionEnterTimeout={<span class="hljs-number">400</span>}
                          transitionLeaveTimeout={<span class="hljs-number">400</span>}
                      &gt;
                          &lt;div key={location.pathname}&gt;
                              &lt;<span class="hljs-type">Route</span> location={location} exact path=<span class="hljs-string">"/"</span> component={<span class="hljs-type">Home</span>} /&gt;
                              &lt;<span class="hljs-type">Route</span> location={location} path=<span class="hljs-string">"/search"</span> component={<span class="hljs-type">Search</span>} /&gt;
                          &lt;/div&gt;
                      &lt;/<span class="hljs-type">CSSTransitionGroup</span>&gt;
                  )
              "}}"/&gt;
          &lt;/<span class="hljs-type">Router</span>&gt;
        )
    }
}</code></pre>
<p>你应该关注这段代码的下面几个部分，或许你在github上都能看到官方文档，但是官方文档没有教我们如何控制不同页面的动画动态展示。</p>
<p>1、const { animateCls } = this.props.global</p>
<p>animateCls是存储在store中的变量，他用来表示动画的transitionName，也就是动画样式，store是什么？是redux中的数据存储核心，我们需要实现在不同状态下面，transitionName的动画样式会按照我们的需求而改变，比如从首页切换到二级页面，然后从2级页面返回到首页，这2个过程执行的动画是相反的，这时候我们不能把transitionName写死。</p>
<p>我写了一个action，来控制animateCls值的变化。这个action很简单，就是传入一个样式参数，当不同的状态的时候，传入不同的参数就能实现动画的定制了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const currentAnimate = (cls) => ({
    type: 'CURRENT_ANIMATE',
    cls
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> currentAnimate = <span class="hljs-function">(<span class="hljs-params">cls</span>) =&gt;</span> ({
    <span class="hljs-keyword">type</span>: <span class="hljs-string">'CURRENT_ANIMATE'</span>,
    cls
})</code></pre>
<p>熟悉redux的你，就会知道还需要写reducer。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const initState = {
    animateCls: 'normal', //过渡动画样式
}

export const global = (state = initState, action) => {
    switch (action.type) {
        case &quot;CURRENT_ANIMATE&quot;:
            return {
                ...state,
                animateCls: action.cls
            }
        default:
            return state
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>const initState = {
    animateCls: 'normal', //过渡动画样式
}

export const <span class="hljs-keyword">global</span> = (<span class="hljs-keyword">state</span> = initState, action) =&gt; {
    switch (action.type) {
        case <span class="hljs-string">"CURRENT_ANIMATE"</span>:
            return {
                ...<span class="hljs-keyword">state</span>,
                animateCls: action.cls
            }
        <span class="hljs-keyword">default</span>:
            return <span class="hljs-keyword">state</span>
    }
}</code></pre>
<p>接着我们就回到了一开始的那一步，在组件中读取 const { animateCls } = this.props.global。</p>
<p>然后，我写了2个动画样式，一个是往左边移动、一个是往右边移动。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*路由切换动画——左移动*/
.left-enter {
    position: absolute;
    top: 0;
    background: #fff;
    z-index: 10000;
    opacity: 1;
    transform: translateX(100%);
}

.left-enter.left-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: all 0.4s ease-out;
}

.left-leave {
    opacity: 1;
    transform: translateX(0);
}

.left-leave.left-leave-active {
    opacity: 1;
    transform: translateX(-100%);
    transition: all 0.4s ease-out;
}

/*路由切换动画——右移动*/
.right-enter {
    transform: translateX(-100%);
}

.right-enter.right-enter-active {
    transform: translateX(0);
    transition: all 0.4s ease-out;
}

.right-leave {
    position: absolute;
    top: 0;
    background: #fff;
    z-index: 10000;
    opacity: 1;
    transform: translateX(0);
}

.right-leave.right-leave-active {
    opacity: 1;
    transform: translateX(100%);
    transition: all 0.4s ease-out;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/*路由切换动画——左移动*/</span>
<span class="hljs-selector-class">.left-enter</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">10000</span>;
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(100%);
}

<span class="hljs-selector-class">.left-enter</span><span class="hljs-selector-class">.left-enter-active</span> {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0);
    <span class="hljs-attribute">transition</span>: all <span class="hljs-number">0.4s</span> ease-out;
}

<span class="hljs-selector-class">.left-leave</span> {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0);
}

<span class="hljs-selector-class">.left-leave</span><span class="hljs-selector-class">.left-leave-active</span> {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-100%);
    <span class="hljs-attribute">transition</span>: all <span class="hljs-number">0.4s</span> ease-out;
}

<span class="hljs-comment">/*路由切换动画——右移动*/</span>
<span class="hljs-selector-class">.right-enter</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-100%);
}

<span class="hljs-selector-class">.right-enter</span><span class="hljs-selector-class">.right-enter-active</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0);
    <span class="hljs-attribute">transition</span>: all <span class="hljs-number">0.4s</span> ease-out;
}

<span class="hljs-selector-class">.right-leave</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">10000</span>;
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0);
}

<span class="hljs-selector-class">.right-leave</span><span class="hljs-selector-class">.right-leave-active</span> {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(100%);
    <span class="hljs-attribute">transition</span>: all <span class="hljs-number">0.4s</span> ease-out;
}</code></pre>
<p>关于CSS3的知识，我就不解释了，以右移样式为例子，对每个参数做一下说明。</p>
<p>一个动画完整流程，满足下面4个样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".right-enter {}

.right-enter.right-enter-active {}

.right-leave {}

.right-leave.right-leave-active {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.right-enter</span> {}

<span class="hljs-selector-class">.right-enter</span><span class="hljs-selector-class">.right-enter-active</span> {}

<span class="hljs-selector-class">.right-leave</span> {}

<span class="hljs-selector-class">.right-leave</span><span class="hljs-selector-class">.right-leave-active</span> {}</code></pre>
<p>right表示的是 animateCls，也就是我们要动态设置的值，react动画分为进入和离开，很多人可能不太理解进入和离开到底指什么。</p>
<p><strong>enter：新路由进入的动画。</strong><br><strong>leave：旧路由离开的动画。</strong></p>
<p>比如，从二级页面返回首页，当你点击返回按钮后，二级页面执行的是leave的动画，首页执行的是enter的动画，2个动画执行是同时进行的。</p>
<p><strong>因为animateCls默认是normal，要让他改成right，只需要在当前组件中监听返回按钮的onClick事件，然后执行dispatch action，传入参数“right”。</strong></p>
<p><strong>但是这样做不是很完善，因为浏览器和app不同，浏览器有自己的返回按钮，所以你还需要监听浏览器的返回按钮。这一步我还没有完善好，相信对于熟悉监听事件的你来说，是个很容易完善的功能?，如果是做react-native，那么可以省去监听浏览器返回按钮的步骤。</strong></p>
<p>比如我只监听了网页中的返回按钮onCLick事件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Link to=&quot;/&quot; className=&quot;style_a&quot; onClick={() => handleClick('right')}>返回首页</Link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">Link</span> <span class="hljs-keyword">to</span>=<span class="hljs-string">"/"</span> className=<span class="hljs-string">"style_a"</span> onClick={() =&gt; handleClick(<span class="hljs-string">'right'</span>)}&gt;返回首页&lt;/<span class="hljs-keyword">Link</span>&gt;</code></pre>
<p>2、别忘了设置一个唯一的key，如果你的组件是一个列表，那么需要在map的时候设置一个key。</p>
<p>整体实现方案就这么多，喜欢使用react过渡动画的上吧。</p>
<p>如果你想看具体代码，在这里：<a href="https://github.com/hyy1115/react-redux-webpack2/blob/master/src/App.js" rel="nofollow noreferrer" target="_blank">react路由动画关键代码</a></p>
<p><strong>如果文章对你有帮助，请点击一下推荐。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React系列——react 15.5+ 使用CSSTransitionGroup实现路由过渡动画

## 原文链接
[https://segmentfault.com/a/1190000009687861](https://segmentfault.com/a/1190000009687861)

