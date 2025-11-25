---
title: 'React 设计模式和场景分析' 
date: 2018-12-04 2:30:05
hidden: true
slug: wncoh1gmrys
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000014482098" src="https://static.alili.tech/img/remote/1460000014482098" alt="Kygo on live" title="Kygo on live"></span></p>
<p>这一周连续发表了两篇关于 React 的文章：</p>
<ul>
<li><a href="https://zhuanlan.zhihu.com/p/35789551" rel="nofollow noreferrer">组件复用那些事儿 - React 实现按需加载轮子</a></li>
<li><a href="https://zhuanlan.zhihu.com/p/35833143" rel="nofollow noreferrer">React 应用设计之道 - curry 化妙用</a></li>
</ul>
<p>其中涉及到 React 组件复用、轮子设计相关话题，并配合相关场景实例进行了分析。这些内容都算是 React 设计模式，一提到 Design Patterns，读者大可不必恐惧，事实上这都是 React 开发应用灵活性的体现。今天这篇文章，我们继续通过一个场景，循序渐进，通过一步步优化设计来进行加深理解。</p>
<h2>场景介绍</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014482099?w=435&amp;h=408" src="https://static.alili.tech/img/remote/1460000014482099?w=435&amp;h=408" alt="页面展现" title="页面展现"></span></p>
<p>屏幕左侧大面积展现区块内容，点击 continue 按钮，切换为下条内容信息；右侧是一个导航条，指示当前区块展示信息条目。</p>
<p>如果看 Gif 图不过瘾，可以到 <a href="https://codesandbox.io/s/5x22900pnl?from-embed" rel="nofollow noreferrer">CodeSandbox</a> 进行在线了解。</p>
<p>具体代码结构为：</p>
<pre><code>class App extends Component {
  render() {
    return (
        &lt;Stepper stage={1}/&gt;
    );
  }
}
</code></pre>
<p>Stepper 组件 'stage' prop 表示默认开始第几个区块，同时具用同名 'stage' 状态。stage 在这里表示左侧一个个内容区块。<br>handleClick 方法对 this.stata.stage 进行切换。</p>
<pre><code>
class Stepper extends Component {
  state = {
    stage: this.props.stage
  }
  static defaultProps = {
    stage: 1
  }
  handleClick = () =&gt; {
    this.setState({ stage: this.state.stage + 1 })
  }
  render() {
    const { stage } = this.state;
    return (
      &lt;div style={styles.container}&gt;
            &lt;Progress stage={stage}/&gt;
            &lt;Steps handleClick={this.handleClick} stage={stage}/&gt;
      &lt;/div&gt;
    );
  }
}
</code></pre>
<p>我们看到，Stepper 组件包含 Progress 组件（左侧导航）以及 Steps 组件。<br>这样的代码运行良好，但是在复用性和灵活性上有一些问题。比如：</p>
<ul>
<li>如果我们需要切换 Progress 和 Steps 组件（左右）展示顺序怎么办？</li>
<li>如果我们的 Stepper 需要承载更多的 stages 怎么办？</li>
<li>如果我们需要更改某个 stage 内容怎么办？</li>
<li>如果我们想要切换 stages 顺序该怎么办？</li>
</ul>
<p>现有代码基础上，这些问题都可以解决。但是需要重新更改组件编写内容。如果某天又新增或者调整了需求，组件内容同样又需要改写。</p>
<p><strong>接下来，我们用另一种方式实现需求，使得代码更加灵活，复用性更强。</strong></p>
<h2>重新设计</h2>
<p>仔细观察 Stepper 组件：它包含了当前区块 stage，以及一个更改 stage 的方法，渲染了两个子组件。</p>
<p>我们使用 Function as Child Component 手段，将 Stepper 组件重构。（如果对 Function as Child Component 不熟悉，请参考我之前文章 <a href="https://zhuanlan.zhihu.com/p/35789551" rel="nofollow noreferrer">组件复用那些事儿 - React 实现按需加载轮子</a>）</p>
<p>如下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014482100" src="https://static.alili.tech/img/remote/1460000014482100" alt=" Function as Child Component 重构" title=" Function as Child Component 重构"></span></p>
<p>Progress 和 Steps 组件不再直接出现在 Stepper 组件的 render 方法中。我们使用 this.props.children 对 Stepper 组件的所有子组件进行渲染。这样 Stepper 组件渲染的内容更加灵活。</p>
<p>但是仅仅这样的修改是不可能完成需求的，当用户点击 continue 按钮，stage 并不会进行切换。因为 Progress 和 Steps 组件无法再通过 props 感知 stage 和 handleClick 方法。</p>
<p>为了解决这个问题，<strong>我们可以手动遍历 Stepper 组件的子节点，并对相应 props 一一注入</strong>。如下代码：</p>
<pre><code>const children = React.Children.map(this.props.children, child =&gt; {
        return React.cloneElement(child, {stage, handleClick: this.handleClick})
    })
</code></pre>
<p>借助 React.Children.map 进行子节点遍历，并通过 React.cloneElement 方法对子组件进行拷贝，这个方法通过第二个参数，具有添加额外 props 的能力。Stepper 组件的 render 方法只需要具体应用：</p>
<pre><code>const { stage } = this.state;
const children = React.Children.map(this.props.children, child =&gt; {
    return React.cloneElement(child, {stage, handleClick: this.handleClick})
})
return (
    &lt;div style={styles.container}&gt;
        {children}
    &lt;/div&gt;
    );
</code></pre>
<p>这样一来，应用又一次正确运转！</p>
<pre><code>class App extends Component {
  render() {
    return (
      &lt;div&gt;
        &lt;Stepper stage={1}&gt;
          &lt;Progress /&gt;
          &lt;Steps /&gt;
        &lt;/Stepper&gt;
      &lt;/div&gt;
    );
  }
}
</code></pre>
<p>同样的手段，我们也可以应用到 Progress 组件当中。这里不再一一展开。</p>
<h2>使用 Static Properties</h2>
<p>值得一提的是，我们可以使用 Static Properties 增强代码的可读性。Static Properties 允许我们在 class 当中直接对方法进行调用。首先，我们在 Stepper 组件中创建两个 static 方法，并赋值给 Progress 组件和 Steps 组件：</p>
<pre><code>static Progress = Progress;
static Steps = Steps

</code></pre>
<p>现在，在 App.js 中我们可以直接：</p>
<pre><code>
import React, { Component } from 'react';
import Stepper from "./Stepper"

class App extends Component {
  render() {
    return (
      &lt;Stepper stage={1}&gt;
        &lt;Stepper.Progress /&gt;
        &lt;Stepper.Steps /&gt;
      &lt;/Stepper&gt;
    );
  }
}
export default App;
</code></pre>
<p>这样的好处体现在不用一次次地 import 进来 Progress 组件和 Steps 组件，它们都将作为 Stepper 的静态属性出现。我个人并不是很喜欢这种做法。</p>
<h2>使用 React Transition Group</h2>
<p>我们使用 React Transition Group 对 Steps 组件内容添加过渡动画。只有当 props.num 与 this.props.stage 相等时，区块内容设置为可见：</p>
<pre><code>
class Steps extends Component {
    render() {
        const {stage,handleClick} = this.props
        const children = React.Children.map(this.props.children, child =&gt; {
            console.log(child.props)
            return (
                stage === child.props.num &amp;&amp;
                &lt;Transition appear={true} timeout={300} onEntering={entering} onExiting={exiting}&gt;
                    {child}
                &lt;/Transition&gt;
            )
        })
        return (
            &lt;div style={styles.stagesContainer}&gt;
                &lt;div style={styles.stages}&gt;
                    &lt;TransitionGroup&gt;
                        {children}
                    &lt;/TransitionGroup&gt;
                &lt;/div&gt;
                &lt;div style={styles.stageButton}&gt;
                    &lt;Button disabled={stage === 4} click={handleClick}&gt;Continue&lt;/Button&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        );
    }
}
</code></pre>
<p>我们也可以给 Steps 组件添加任意个内容：</p>
<pre><code>import Stepper from "./Stepper"

class App extends Component {
  render() {
    return (
        &lt;Stepper stage={1}&gt;
          &lt;Stepper.Progress&gt;
            &lt;Stepper.Stage num={1} /&gt;
            &lt;Stepper.Stage num={2} /&gt;
            &lt;Stepper.Stage num={3} /&gt;
          &lt;/Stepper.Progress&gt;
          &lt;Stepper.Steps&gt;
            &lt;Stepper.Step num={1} text={"Stage 1"}/&gt;
            &lt;Stepper.Step num={2} text={"Stage 2"}/&gt;
            &lt;Stepper.Step num={3} text={"Stage 3"}/&gt;
            &lt;Stepper.Step num={4} text={"Stage 4"}/&gt;
          &lt;/Stepper.Steps&gt;
        &lt;/Stepper&gt;
    );
  }
}
</code></pre>
<p>重新设计之后，整个应用变得更加灵活，复用性更强。我们可以指定任意个 stages，每一个 stage 文本内容也可以自定义设置，同样 stages 排列顺序等都可以随意搭配。</p>
<p>重构代码以及效果可以访问<a href="https://codesandbox.io/s/5x22900pnl?from-embed" rel="nofollow noreferrer">这里</a>查看。</p>
<h2>思考及待续</h2>
<p>如果你觉得上述代码完美无懈可击，那显然想简单了。需求是变化多端的，如果我们想在 Steps 区块上，加一个大标题呢？</p>
<pre><code>class App extends Component {
  render() {
    return (
        &lt;Stepper stage={1}&gt;
          &lt;Stepper.Progress&gt;
            &lt;Stepper.Stage num={1} /&gt;
            &lt;Stepper.Stage num={2} /&gt;
            &lt;Stepper.Stage num={3} /&gt;
          &lt;/Stepper.Progress&gt;
          &lt;div&gt;
            &lt;div&gt;Title&lt;/div&gt;
            &lt;Stepper.Steps&gt;
              &lt;Stepper.Step num={1} text={"Stage 1"}/&gt;
              &lt;Stepper.Step num={2} text={"Stage 2"}/&gt;
              &lt;Stepper.Step num={3} text={"Stage 3"}/&gt;
              &lt;Stepper.Step num={4} text={"Complete!"}/&gt;
            &lt;/Stepper.Steps&gt;
          &lt;/div&gt;
        &lt;/Stepper&gt;
    );
  }
}
</code></pre>
<p>如图，</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014482101" src="https://static.alili.tech/img/remote/1460000014482101" alt="加入标题" title="加入标题"></span></p>
<p>这样一来，Stepper.Steps 组件再也不是 Stepper 组件的直接唯一子节点了，那预期之中的 props 自然又一次无法取得！</p>
<p><strong>问题也不仅仅于此</strong>。笔者本人不是很喜欢类似 React.cloneElement 顶层 API，除了偏好以外，也有一个难以规避的问题：<strong>在使用 React.cloneElement 扩充 props 时，如果出现 props 命名冲突怎么办？</strong></p>
<p>比如一个 &lt;input&gt; 遇见了命名为 value 的 prop，后果可想而知。</p>
<p>那么问题来了，是否有更优雅高效的方法解决上述问题？或者，是否有更好的方式，实现更灵活的设计？</p>
<p><strong>答案一定是有的，我将会留在下一篇文章进行讲解。</strong></p>
<p>本文源于：<a href="https://itnext.io/using-advanced-design-patterns-to-create-flexible-and-reusable-react-components-part-1-dd495fa1823" rel="nofollow noreferrer">How To Master Advanced React Design Patterns</a>，部分内容有改动。</p>
<p><strong>广告时间：</strong><br>如果你对前端发展，尤其对 React 技术栈感兴趣：我的新书中，也许有你想看到的内容。关注作者 <a href="https://www.zhihu.com/people/lucas-hc/activities" rel="nofollow noreferrer">Lucas HC</a>，新书出版将会有送书活动。</p>
<p>Happy Coding!</p>
<p>PS: 作者&nbsp;<a href="http://link.zhihu.com/?target=https%3A//github.com/HOUCe" rel="nofollow noreferrer">Github仓库</a>&nbsp;和&nbsp;<a href="https://www.zhihu.com/people/lucas-hc/answers" rel="nofollow noreferrer">知乎问答链接</a>&nbsp;欢迎各种形式交流！</p>
<p>我的其他几篇关于React技术栈的文章：</p>
<p><a href="https://zhuanlan.zhihu.com/p/28905707" rel="nofollow noreferrer">从setState promise化的探讨 体会React团队设计思想</a></p>
<p><a href="https://zhuanlan.zhihu.com/p/35833143" rel="nofollow noreferrer">React 应用设计之道 - curry 化妙用</a></p>
<p><a href="https://zhuanlan.zhihu.com/p/35789551" rel="nofollow noreferrer">组件复用那些事儿 - React 实现按需加载轮子</a></p>
<p><a href="https://zhuanlan.zhihu.com/p/27825741" rel="nofollow noreferrer">通过实例，学习编写 React 组件的“最佳实践”</a></p>
<p><a href="https://zhuanlan.zhihu.com/p/27727292" rel="nofollow noreferrer">React 组件设计和分解思考</a></p>
<p><a href="https://zhuanlan.zhihu.com/p/28905707/edit" rel="nofollow noreferrer">从 React 绑定 this，看 JS 语言发展和框架设计</a></p>
<p><a href="http://link.zhihu.com/?target=http%3A//www.jianshu.com/p/49029b49f2b4" rel="nofollow noreferrer">做出Uber移动网页版还不够 极致性能打造才见真章**</a></p>
<p><a href="http://link.zhihu.com/?target=http%3A//www.jianshu.com/p/cde3cf7e2760" rel="nofollow noreferrer">React+Redux打造“NEWS EARLY”单页应用 一个项目理解最前沿技术栈真谛</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 设计模式和场景分析

## 原文链接
[https://segmentfault.com/a/1190000014482093](https://segmentfault.com/a/1190000014482093)

