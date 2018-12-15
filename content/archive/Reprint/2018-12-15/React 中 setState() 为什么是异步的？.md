---
title: 'React 中 setState() 为什么是异步的？' 
date: 2018-12-15 2:30:11
hidden: true
slug: j90m1zq86oc
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>不知道大家有没有过这个疑问，React 中 <code>setState()</code> 为什么是异步的？我一度认为 <code>setState()</code> 是同步的，知道它是异步的之后很是困惑，甚至期待 React 能出一个 <code>setStateSync()</code> 之类的 API。同样有此疑问的还有 MobX 的作者 <a href="https://twitter.com/mweststrate" rel="nofollow noreferrer" target="_blank">Michel Weststrate</a>，他认为经常听到的答案都很容易反驳，并认为这可能是一个历史包袱，所以开了一个 <a href="https://github.com/facebook/react/issues/11527" rel="nofollow noreferrer" target="_blank">issue</a> 询问真正的原因。最终这个 issue 得到了 React 核心成员 <a href="https://twitter.com/dan_abramov" rel="nofollow noreferrer" target="_blank">Dan Abramov</a> 的回复，Dan 的回复表明这不是一个历史包袱，而是一个经过深思熟虑的设计。</p>
<p>注意：这篇文章根据 Dan 的回复写成，但不是一篇翻译。我忽略了很多不太重要的内容，Dan 的完整回复请看<a href="https://github.com/facebook/react/issues/11527#issuecomment-360199710" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<h2 id="articleHeader1">正文</h2>
<p>Dan 在回复中表示为什么 <code>setState()</code> 是异步的，这并没有一个明显的答案（obvious answer），每种方案都有它的权衡。但是 React 的设计有以下几点考量：</p>
<h4>一、保证内部的一致性</h4>
<p>首先，我想我们都同意推迟并批量处理重渲染是有益而且对性能优化很重要的，无论 <code>setState()</code> 是同步的还是异步的。那么就算让 <code>state</code> 同步更新，<code>props</code> 也不行，因为当父组件重渲染（re-render ）了你才知道 <code>props</code>。</p>
<p>现在的设计保证了 React 提供的 objects（state，props，refs）的行为和表现都是一致的。为什么这很重要？Dan 举了个栗子：</p>
<p>假设 <code>state</code> 是同步更新的，那么下面的代码是可以按预期工作的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(this.state.value) // 0
this.setState({ value: this.state.value + 1 });
console.log(this.state.value) // 1
this.setState({ value: this.state.value + 1 });
console.log(this.state.value) // 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>console.<span class="hljs-keyword">log</span>(this.<span class="hljs-keyword">state</span>.value) // <span class="hljs-number">0</span>
this.<span class="hljs-built_in">set</span>State({ value: this.<span class="hljs-keyword">state</span>.value + <span class="hljs-number">1</span> });
console.<span class="hljs-keyword">log</span>(this.<span class="hljs-keyword">state</span>.value) // <span class="hljs-number">1</span>
this.<span class="hljs-built_in">set</span>State({ value: this.<span class="hljs-keyword">state</span>.value + <span class="hljs-number">1</span> });
console.<span class="hljs-keyword">log</span>(this.<span class="hljs-keyword">state</span>.value) // <span class="hljs-number">2</span></code></pre>
<p>然而，这时你需要将状态提升到父组件，以供多个兄弟组件共享：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-this.setState({ value: this.state.value + 1 });
+this.props.onIncrement(); // 在父组件中做同样的事" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff"><span class="hljs-deletion">-this.setState({ value: this.state.value + 1 });</span>
<span class="hljs-addition">+this.props.onIncrement(); // 在父组件中做同样的事</span></code></pre>
<p>需要指出的是，在 React 应用中这是一个很常见的重构，几乎每天都会发生。</p>
<p>然而下面的代码却不能按预期工作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(this.props.value) // 0
this.props.onIncrement();
console.log(this.props.value) // 0
this.props.onIncrement();
console.log(this.props.value) // 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>console.log(<span class="hljs-keyword">this</span>.props.value) <span class="hljs-comment">// 0</span>
<span class="hljs-keyword">this</span>.props.onIncrement();
console.log(<span class="hljs-keyword">this</span>.props.value) <span class="hljs-comment">// 0</span>
<span class="hljs-keyword">this</span>.props.onIncrement();
console.log(<span class="hljs-keyword">this</span>.props.value) <span class="hljs-comment">// 0</span></code></pre>
<p>这是因为同步模型中，虽然 <code>this.state</code> 会立即更新，但是 <code>this.props</code> 并不会。而且在没有重渲染父组件的情况下，我们不能立即更新 <code>this.props</code>。如果要立即更新 <code>this.props</code> （也就是立即重渲染父组件），就必须放弃批处理（根据情况的不同，性能可能会有显著的下降）。</p>
<p>所以为了解决这样的问题，在 React 中 <code>this.state</code> 和 <code>this.props</code> 都是异步更新的，在上面的例子中重构前跟重构后都会打印出 0。这会让状态提升更安全。</p>
<p>最后 Dan 总结说，React 模型更愿意保证内部的一致性和状态提升的安全性，而不总是追求代码的简洁性。</p>
<h4>二、性能优化</h4>
<p>我们通常认为状态更新会按照既定顺序被应用，无论 <code>state</code> 是同步更新还是异步更新。然而事实并不一定如此。</p>
<p>React 会依据不同的调用源，给不同的 <code>setState()</code> 调用分配不同的优先级。调用源包括事件处理、网络请求、动画等。</p>
<p>Dan 又举了个栗子。假设你在一个聊天窗口，你正在输入消息，<code>TextBox</code> 组件中的 <code>setState()</code> 调用需要被立即应用。然而，在你输入过程中又收到了一条新消息。更好的处理方式或许是延迟渲染新的 <code>MessageBubble</code> 组件，从而让你的输入更加顺畅，而不是立即渲染新的 <code>MessageBubble</code> 组件阻塞线程，导致你输入抖动和延迟。</p>
<p>如果给某些更新分配低优先级，那么就可以把它们的渲染分拆为几个毫秒的块，用户也不会注意到。</p>
<h4>三、更多的可能性</h4>
<p>Dan 最后说到，异步更新并不只关于性能优化，而是 React 组件模型能做什么的一个根本性转变（fundamental shift）。</p>
<p>Dan 还是举了个栗子。假设你从一个页面导航到到另一个页面，通常你需要展示一个加载动画，等待新页面的渲染。但是如果导航非常快，闪烁一下加载动画又会降低用户体验。</p>
<p>如果这样会不会好点，你只需要简单的调用 <code>setState()</code> 去渲染一个新的页面，React “在幕后”开始渲染这个新的页面。想象一下，不需要你写任何的协调代码，如果这个更新花了比较长的时间，你可以展示一个加载动画，否则在新页面准备好后，让 React 执行一个无缝的切换。此外，在等待过程中，旧的页面依然可以交互，但是如果花费的时间比较长，你必须展示一个加载动画。</p>
<p>事实证明，在现在的 React 模型基础上做一些<a href="https://github.com/reactjs/rfcs/pull/6" rel="nofollow noreferrer" target="_blank">生命周期调整</a>，真的可以实现这种设想。<a href="https://github.com/acdlite" rel="nofollow noreferrer" target="_blank">@acdlite</a> 已经为这个功能努力几周了，并且很快会发布一个 <a href="https://github.com/reactjs/rfcs" rel="nofollow noreferrer" target="_blank">RFC</a>（亦可赛艇！）。</p>
<p>需要注意的是，异步更新 <code>state</code> 是有可能实现这种设想的前提。如果同步更新 <code>state</code> 就没有办法在幕后渲染新的页面，还保持旧的页面可以交互。它们之间独立的状态更新会冲突。</p>
<p>Dan 最后对 Michel 说到：我希望我们能在接下来几个月说服你，并且你会欣赏到 React 模型的灵活性。据我理解，这种灵活性至少一部分要归功于 <code>state</code> 的异步更新。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 中 setState() 为什么是异步的？

## 原文链接
[https://segmentfault.com/a/1190000013040438](https://segmentfault.com/a/1190000013040438)

