---
title: ReactV16.3即将更改的生命周期
hidden: true
categories: [reprint]
slug: 66f04d69
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p>March 27, 2018 by <a href="https://github.com/bvaughn">Brian Vaughn</a></p>
<p>一年多来，React团队一直致力于实现异步渲染。上个月，他在JSConf冰岛的演讲中，<a href="https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html">丹揭示了一些令人兴奋的新的异步渲染可能性</a>。现在，我们希望与您分享我们在学习这些功能时学到的一些经验教训，以及一些帮助您准备组件以在启动时进行异步渲染的方法。</p>
<p>我们了解到的最大问题之一是，我们的一些传统组件生命周期会导致一些不安全的编码实践。他们是：</p>
<ul>
<li><code>componentWillMount</code></li>
<li><code>componentWillReceiveProps</code></li>
<li><code>componentWillUpdate</code></li>
</ul>
<p>这些生命周期方法经常被误解和滥用;此外，我们预计他们的潜在滥用可能在异步渲染方面有更大的问题。因此，我们将在即将发布的版本中为这些生命周期添加一个“UNSAFE_”前缀。 （这里，“不安全”不是指安全性，而是表示使用这些生命周期的代码将更有可能在未来的React版本中存在缺陷，特别是一旦启用了异步渲染）。</p>
<h2><a href="https://reactjs.org/#gradual-migration-path"></a>逐步迁移路径</h2>
<p><a href="https://reactjs.org/blog/2016/02/19/new-versioning-scheme.html">React遵循语义版本控制</a>, 所以这种改变将是渐进的。我们目前的计划是：</p>
<ul>
<li><strong>16.3</strong>：为不安全生命周期引入别名UNSAFE_componentWillMount，UNSAFE_componentWillReceiveProps和UNSAFE_componentWillUpdate。 （旧的生命周期名称和新的别名都可以在此版本中使用。） </li>
<li><strong>未来的16.x版本</strong>：为componentWillMount，componentWillReceiveProps和componentWillUpdate启用弃用警告。 （旧的生命周期名称和新的别名都可以在此版本中使用，但旧名称会记录DEV模式警告。） </li>
<li><strong>17.0：</strong>删除componentWillMount，componentWillReceiveProps和componentWillUpdate。 （从现在开始，只有新的“UNSAFE_”生命周期名称将起作用。）</li>
</ul>
<p><strong>请注意，如果您是React应用程序开发人员，那么您不必对遗留方法进行任何操作。即将发布的16.3版本的主要目的是让开源项目维护人员在任何弃用警告之前更新其库。这些警告将在未来的16.x版本发布之前不会启用。</strong></p>
<p>我们在Facebook上维护了超过50,000个React组件，我们不打算立即重写它们。我们知道迁移需要时间。我们将采用逐步迁移路径以及React社区中的所有人。</p>
<hr>
<h2><a href="https://reactjs.org/#migrating-from-legacy-lifecycles">从传统生命周期迁移</a></h2>
<p>如果您想开始使用React 16.3中引入的新组件API（或者如果您是维护人员提前更新库），以下是一些示例，我们希望这些示例可以帮助您开始考虑组件的变化。随着时间的推移，我们计划在文档中添加额外的“配方”，以展示如何以避免有问题的生命周期的方式执行常见任务。</p>
<p>在开始之前，我们将简要概述为16.3版计划的生命周期更改：</p>
<ul>
<li>We are <strong>adding the following lifecycle aliases</strong>: <code>UNSAFE_componentWillMount</code>, <code>UNSAFE_componentWillReceiveProps</code>, and <code>UNSAFE_componentWillUpdate</code>. (Both the old lifecycle names and the new aliases will be supported.)</li>
<li><p>We are <strong>introducing two new lifecycles</strong>, static <code>getDerivedStateFromProps</code> and <code>getSnapshotBeforeUpdate</code>.</p>
</li>
<li><p>我们正在<strong>添加以下生命周期别名</strong>：</p>
</li>
</ul>
<p>(1) UNSAFE_componentWillMount，</p>
<p>(2) UNSAFE_componentWillReceiveProps</p>
<p>(3) UNSAFE_componentWillUpdate。 （旧的生命周期名称和新的别名都将受支持。） </p>
<ul>
<li>我们介绍了<strong>两个新的生命周期</strong>，分别是getDerivedStateFromProps和getSnapshotBeforeUpdate。</li>
</ul>
<h3><a href="https://reactjs.org/#new-lifecycle-getderivedstatefromprops">新的生命周期:</a> <code>getDerivedStateFromProps</code></h3>
<pre><code class="hljs scala"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Example</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  static getDerivedStateFromProps(nextProps, prevState) {
    <span class="hljs-comment">// ...</span>
  }
}

</code></pre><p>新的静态<code>getDerivedStateFromProps</code>生命周期在组件实例化以及接收新<code>props</code>后调用。它可以返回一个对象来更新<code>state</code>，或者返回null来表示新的<code>props</code>不需要任何<code>state</code>更新。</p>
<p>与<code>componentDidUpdate</code>一起，这个新的生命周期应该覆盖传统<code>componentWillReceiveProps</code>的所有用例。</p>
<h3><a href="https://reactjs.org/#new-lifecycle-getsnapshotbeforeupdate">新的生命周期:</a> <code>getSnapshotBeforeUpdate</code></h3>
<pre><code class="hljs scala"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Example</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  getSnapshotBeforeUpdate(prevProps, prevState) {
    <span class="hljs-comment">// ...</span>
  }
}

</code></pre><p>新的<code>getSnapshotBeforeUpdate</code>生命周期在更新之前被调用（例如，在DOM被更新之前）。此生命周期的返回值将作为第三个参数传递给<code>componentDidUpdate</code>。 （这个生命周期不是经常需要的，但可以用于在恢复期间手动保存滚动位置的情况。）</p>
<p>与<code>componentDidUpdate</code>一起，这个新的生命周期将覆盖旧版<code>componentWillUpdate</code>的所有用例。</p>
<p>You can find their type signatures <a href="https://gist.github.com/gaearon/88634d27abbc4feeb40a698f760f3264">in this gist</a>.</p>
<p>我们看看如何在使用这两种生命周期的，例子如下:</p>
<h2><a href="https://reactjs.org/#examples">例如：</a></h2>
<ul>
<li><a href="https://reactjs.org/#initializing-state">Initializing state</a>（初始化状态）</li>
<li><a href="https://reactjs.org/#fetching-external-data">Fetching external data</a>（获取外部数据）</li>
<li><a href="https://reactjs.org/#adding-event-listeners-or-subscriptions">Adding event listeners (or subscriptions)</a>（添加事件监听）</li>
<li><a href="https://reactjs.org/#updating-state-based-on-props">Updating <code>state</code> based on props</a>（基于<code>props</code>更新<code>state</code>）</li>
<li><a href="https://reactjs.org/#invoking-external-callbacks">Invoking external callbacks</a>(调用外部的<code>callbacks</code>)</li>
<li><a href="https://reactjs.org/#side-effects-on-props-change">Side effects on props change</a></li>
<li><a href="https://reactjs.org/#fetching-external-data-when-props-change">Fetching external data when props change</a>（<code>props</code>改变时获取外部数据）</li>
<li><a href="https://reactjs.org/#reading-dom-properties-before-an-update">Reading DOM properties before an update</a>(在更新之前读取DOM属性)</li>
</ul>
<blockquote>
<p>注意</p>
</blockquote>
<p>为简洁起见，下面的示例是使用实验类属性转换编写的，但如果没有它，则应用相同的迁移策略。</p>
<h3><a href="https://reactjs.org/#initializing-state">初始化状态：</a></h3>
<p>这个例子展示了一个调用<code>componentWillMount</code>中带有<code>setState</code>的组件：</p>
<pre><code class="hljs scala"><span class="hljs-comment">// Before</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ExampleComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  state = {};

  componentWillMount() {
    <span class="hljs-keyword">this</span>.setState({
      currentColor: <span class="hljs-keyword">this</span>.props.defaultColor,
      palette: <span class="hljs-symbol">'rg</span>b',
    });
  }
}

</code></pre><p>这种类型的组件最简单的重构是将状态初始化移动到构造函数或属性初始值设定项，如下所示：</p>
<pre><code class="hljs scala"><span class="hljs-comment">// After</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ExampleComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  state = {
    currentColor: <span class="hljs-keyword">this</span>.props.defaultColor,
    palette: <span class="hljs-symbol">'rg</span>b',
  };
}

</code></pre><h3><a href="https://reactjs.org/#fetching-external-data">获取外部数据</a></h3>
<p>以下是使用<code>componentWillMount</code>获取外部数据的组件示例：</p>
<pre><code class="hljs scala"><span class="hljs-comment">// Before</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ExampleComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  state = {
    externalData: <span class="hljs-literal">null</span>,
  };

  componentWillMount() {
    <span class="hljs-keyword">this</span>._asyncRequest = asyncLoadData().then(
      externalData =&gt; {
        <span class="hljs-keyword">this</span>._asyncRequest = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">this</span>.setState({externalData});
      }
    );
  }

  componentWillUnmount() {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._asyncRequest) {
      <span class="hljs-keyword">this</span>._asyncRequest.cancel();
    }
  }

  render() {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state.externalData === <span class="hljs-literal">null</span>) {
      <span class="hljs-comment">// Render loading state ...</span>
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// Render real UI ...</span>
    }
  }
}

</code></pre><p>上述代码对于服务器呈现（其中不使用外部数据的地方）和即将到来的异步呈现模式（其中请求可能被多次启动）是有问题的。</p>
<p>对于大多数用例，建议的升级路径是将数据提取移入<code>componentDidMount</code>：</p>
<pre><code class="hljs scala"><span class="hljs-comment">// After</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ExampleComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  state = {
    externalData: <span class="hljs-literal">null</span>,
  };

  componentDidMount() {
    <span class="hljs-keyword">this</span>._asyncRequest = asyncLoadData().then(
      externalData =&gt; {
        <span class="hljs-keyword">this</span>._asyncRequest = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">this</span>.setState({externalData});
      }
    );
  }

  componentWillUnmount() {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._asyncRequest) {
      <span class="hljs-keyword">this</span>._asyncRequest.cancel();
    }
  }

  render() {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state.externalData === <span class="hljs-literal">null</span>) {
      <span class="hljs-comment">// Render loading state ...</span>
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// Render real UI ...</span>
    }
  }
}

</code></pre><p>有一个常见的错误观念认为，在<code>componentWillMount中</code>提取可以避免第一个空的渲染。在实践中，这从来都不是真的，因为React总是在<code>componentWillMount</code>之后立即执行渲染。如果数据在<code>componentWillMount</code>触发的时间内不可用，则无论你在哪里提取数据，第一个渲染仍将显示加载状态。这就是为什么在绝大多数情况下将提取移到<code>componentDidMount</code>没有明显效果。</p>
<blockquote>
<blockquote>
<p>注意：</p>
</blockquote>
</blockquote>
<p>一些高级用例（例如，像Relay这样的库）可能想要尝试使用热切的预取异步数据。在这里可以找到一个这样做的<a href="https://gist.github.com/bvaughn/89700e525ff423a75ffb63b1b1e30a8f">例子</a>。 </p>
<p>从长远来看，在React组件中获取数据的规范方式可能基于<a href="https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html">JSConf冰岛推出的“悬念”API</a>。简单的数据提取解决方案以及像Apollo和Relay这样的库都可以在后台使用。它比上述任一解决方案的冗余性都要小得多，但不会在16.3版本中及时完成。 </p>
<p>当支持服务器渲染时，目前需要同步提供数据 - <code>componentWillMount</code>通常用于此目的，但构造函数可以用作替换。即将到来的<code>悬念API</code>将使得异步数据在客户端和服务器呈现中都可以清晰地获取。</p>
<h3><a href="https://reactjs.org/#adding-event-listeners-or-subscriptions">添加时间监听</a></h3>
<p>下面是一个在安装时监听外部事件调度程序的组件示例：</p>
<pre><code class="hljs scala"><span class="hljs-comment">// Before</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ExampleComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  componentWillMount() {
    <span class="hljs-keyword">this</span>.setState({
      subscribedValue: <span class="hljs-keyword">this</span>.props.dataSource.value,
    });

    <span class="hljs-comment">// This is not safe; it can leak!</span>
    <span class="hljs-keyword">this</span>.props.dataSource.subscribe(
      <span class="hljs-keyword">this</span>.handleSubscriptionChange
    );
  }

  componentWillUnmount() {
    <span class="hljs-keyword">this</span>.props.dataSource.unsubscribe(
      <span class="hljs-keyword">this</span>.handleSubscriptionChange
    );
  }

  handleSubscriptionChange = dataSource =&gt; {
    <span class="hljs-keyword">this</span>.setState({
      subscribedValue: dataSource.value,
    });
  };
}

</code></pre><p>不幸的是，这会导致服务器渲染（<code>componentWillUnmount</code>永远不会被调用）和异步渲染（在渲染完成之前渲染可能被中断，导致<code>componentWillUnmount</code>不被调用）的内存泄漏。</p>
<p>人们经常认为<code>componentWillMount</code>和<code>componentWillUnmount</code>总是配对，但这并不能保证。只有调用<code>componentDidMount</code>后，React才能保证稍后调用<code>componentWillUnmount</code>进行清理。</p>
<p>出于这个原因，添加事件监听的推荐方式是使用componentDidMount生命周期：</p>
<pre><code class="hljs scala"><span class="hljs-comment">// After</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ExampleComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  state = {
    subscribedValue: <span class="hljs-keyword">this</span>.props.dataSource.value,
  };

  componentDidMount() {
    <span class="hljs-comment">// Event listeners are only safe to add after mount,</span>
    <span class="hljs-comment">// So they won't leak if mount is interrupted or errors.</span>
    <span class="hljs-keyword">this</span>.props.dataSource.subscribe(
      <span class="hljs-keyword">this</span>.handleSubscriptionChange
    );

    <span class="hljs-comment">// External values could change between render and mount,</span>
    <span class="hljs-comment">// In some cases it may be important to handle this case.</span>
    <span class="hljs-keyword">if</span> (
      <span class="hljs-keyword">this</span>.state.subscribedValue !==
      <span class="hljs-keyword">this</span>.props.dataSource.value
    ) {
      <span class="hljs-keyword">this</span>.setState({
        subscribedValue: <span class="hljs-keyword">this</span>.props.dataSource.value,
      });
    }
  }

  componentWillUnmount() {
    <span class="hljs-keyword">this</span>.props.dataSource.unsubscribe(
      <span class="hljs-keyword">this</span>.handleSubscriptionChange
    );
  }

  handleSubscriptionChange = dataSource =&gt; {
    <span class="hljs-keyword">this</span>.setState({
      subscribedValue: dataSource.value,
    });
  };
}

</code></pre><p>有时候更新监听以响应属性变化很重要。如果您使用的是像Redux或MobX这样的库，库的容器组件会为您处理。对于应用程序作者，我们创建了一个小型库create-subscription来帮助解决这个问题。我们会将它与React 16.3一起发布。</p>
<p>Rather than passing a subscribable <code>dataSource</code> prop as we did in the example above, we could use <code>create-subscription</code> to pass in the subscribed value:</p>
<p>我们可以使用create-subscription来传递监听的值，而不是像上例那样传递监听 的<code>dataSource</code> prop。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">import</span> {createSubscription} <span class="hljs-keyword">from</span> <span class="hljs-string">'create-subscription'</span>;

<span class="hljs-keyword">const</span> Subscription = createSubscription({
  getCurrentValue(sourceProp) {
    <span class="hljs-comment">// Return the current value of the subscription (sourceProp).</span>
    <span class="hljs-keyword">return</span> sourceProp.value;
  },

  subscribe(sourceProp, callback) {
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleSubscriptionChange</span>(<span class="hljs-params"></span>) </span>{
      callback(sourceProp.value);
    }

    <span class="hljs-comment">// Subscribe (e.g. add an event listener) to the subscription (sourceProp).</span>
    <span class="hljs-comment">// Call callback(newValue) whenever a subscription changes.</span>
    sourceProp.subscribe(handleSubscriptionChange);

    <span class="hljs-comment">// Return an unsubscribe method.</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unsubscribe</span>(<span class="hljs-params"></span>) </span>{
      sourceProp.unsubscribe(handleSubscriptionChange);
    };
  },
});

<span class="hljs-comment">// Rather than passing the subscribable source to our ExampleComponent,</span>
<span class="hljs-comment">// We could just pass the subscribed value directly:</span>
<span class="hljs-string">`&lt;Subscription source={dataSource}&gt;`</span>
  {value =&gt; <span class="hljs-string">`&lt;ExampleComponent subscribedValue={value} /&gt;`</span>}
<span class="hljs-string">`&lt;/Subscription&gt;`</span>;

</code></pre><blockquote>
<p>注意&gt;&gt;像Relay / Apollo这样的库应该使用与创建订阅相同的技术手动管理订阅（如此处所引用的），并采用最适合其库使用的优化方式。</p>
</blockquote>
<h3><a href="https://reactjs.org/#updating-state-based-on-props">基于<code>props</code>更新<code>state</code></a></h3>
<p>以下是使用旧版<code>componentWillReceiveProps</code>生命周期基于新的道具值更新状态的组件示例：</p>
<pre><code class="hljs scala"><span class="hljs-comment">// Before</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ExampleComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  state = {
    isScrollingDown: <span class="hljs-literal">false</span>,
  };

  componentWillReceiveProps(nextProps) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.currentRow !== nextProps.currentRow) {
      <span class="hljs-keyword">this</span>.setState({
        isScrollingDown:
          nextProps.currentRow &gt; <span class="hljs-keyword">this</span>.props.currentRow,
      });
    }
  }
}

</code></pre><p>尽管上面的代码本身并没有问题，但<code>componentWillReceiveProps</code>生命周期通常会被错误地用于解决问题。因此，该方法将被弃用。</p>
<p>从版本16.3开始，更新<code>state</code>以响应<code>props</code>更改的推荐方法是使用新的静态getDerivedStateFromProps生命周期。 （生命周期在组件创建时以及每次收到新道具时调用）：</p>
<pre><code class="hljs scala"><span class="hljs-comment">// After</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ExampleComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-comment">// Initialize state in constructor,</span>
  <span class="hljs-comment">// Or with a property initializer.</span>
  state = {
    isScrollingDown: <span class="hljs-literal">false</span>,
    lastRow: <span class="hljs-literal">null</span>,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    <span class="hljs-keyword">if</span> (nextProps.currentRow !== prevState.lastRow) {
      <span class="hljs-keyword">return</span> {
        isScrollingDown:
          nextProps.currentRow &gt; prevState.lastRow,
        lastRow: nextProps.currentRow,
      };
    }

    <span class="hljs-comment">// Return null to indicate no change to state.</span>
    <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
  }
}

</code></pre><p>You may notice in the example above that <code>props.currentRow</code> is mirrored in state (as <code>state.lastRow</code>). This enables <code>getDerivedStateFromProps</code> to access the previous props value in the same way as is done in <code>componentWillReceiveProps</code>.</p>
<p>你可能会注意到在上面的例子中，<code>props.currentRow</code>是一个镜像状态（如state.lastRow）。这使得<code>getDerivedStateFromProp</code>s可以像在<code>componentWillReceiveProp</code>s中一样访问以前的props值。</p>
<p>您可能想知道为什么我们不只是将先前的<code>props</code>作为参数传递给<code>getDerivedStateFromProps</code>。我们在设计API时考虑了这个选项，但最终决定反对它，原因有两个：</p>
<ul>
<li>A <code>prevProps</code> parameter would be null the first time <code>getDerivedStateFromProps</code> was called (after instantiation), requiring an if-not-null check to be added any time <code>prevProps</code> was accessed.</li>
<li><p>Not passing the previous props to this function is a step toward freeing up memory in future versions of React. (If React does not need to pass previous props to lifecycles, then it does not need to keep the previous <code>props</code> object in memory.)</p>
</li>
<li><p>在第一次调用<code>getDerivedStateFromProps</code>（实例化后）时，<code>prevProps</code>参数将为null，需要在访问prevProps时添加if-not-null检查。</p>
</li>
<li><p>没有将以前的<code>props</code>传递给这个函数，在未来版本的React中释放内存的一个步骤。 （如果React不需要将先前的道具传递给生命周期，那么它不需要将先前的道具对象保留在内存中。）</p>
</li>
</ul>
<blockquote>
<p>Note</p>
<blockquote>
<blockquote>
<p>如果您正在编写共享组件，那么<code>react-lifecycles-compat polyfill</code>可以使新的<code>getDerivedStateFromProps</code>生命周期与旧版本的React一起使用。详细了解如何在下面使用它。</p>
</blockquote>
</blockquote>
</blockquote>
<h3><a href="https://reactjs.org/#invoking-external-callbacks">调用外部回调函数</a></h3>
<p>下面是一个在内部状态发生变化时调用外部函数的组件示例：</p>
<pre><code class="hljs scala"><span class="hljs-comment">// Before</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ExampleComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  componentWillUpdate(nextProps, nextState) {
    <span class="hljs-keyword">if</span> (
      <span class="hljs-keyword">this</span>.state.someStatefulValue !==
      nextState.someStatefulValue
    ) {
      nextProps.onChange(nextState.someStatefulValue);
    }
  }
}

</code></pre><p>在异步模式下使用<code>componentWillUpdate</code>都是不安全的，因为外部回调可能会多次调用只更新一次。相反，应该使用<code>componentDidUpdate</code>生命周期，因为它保证每次更新只调用一次：</p>
<pre><code class="hljs scala"><span class="hljs-comment">// After</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ExampleComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  componentDidUpdate(prevProps, prevState) {
    <span class="hljs-keyword">if</span> (
      <span class="hljs-keyword">this</span>.state.someStatefulValue !==
      prevState.someStatefulValue
    ) {
      <span class="hljs-keyword">this</span>.props.onChange(<span class="hljs-keyword">this</span>.state.someStatefulValue);
    }
  }
}

</code></pre><h3><a href="https://reactjs.org/#side-effects-on-props-change">props改变的副作用</a></h3>
<p>与上述 <a href="https://reactjs.org/#invoking-external-callbacks">事例</a>类似，有时组件在道具更改时会产生副作用。</p>
<pre><code class="hljs scala"><span class="hljs-comment">// Before</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ExampleComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  componentWillReceiveProps(nextProps) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.isVisible !== nextProps.isVisible) {
      logVisibleChange(nextProps.isVisible);
    }
  }
}

</code></pre><p>与<code>componentWillUpdate</code>一样，<code>componentWillReceiveProps</code>可能会多次调用但是只更新一次。出于这个原因，避免在此方法中导致的副作用非常重要。相反，应该使用<code>componentDidUpdate</code>，因为它保证每次更新只调用一次：</p>
<pre><code class="hljs scala"><span class="hljs-comment">// After</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ExampleComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  componentDidUpdate(prevProps, prevState) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.isVisible !== prevProps.isVisible) {
      logVisibleChange(<span class="hljs-keyword">this</span>.props.isVisible);
    }
  }
}

</code></pre><h3><a href="https://reactjs.org/#fetching-external-data-when-props-change">props改变时获取外部数据</a></h3>
<p>以下是根据<code>props</code>values提取外部数据的组件示例：</p>
<pre><code class="hljs kotlin"><span class="hljs-comment">// Before</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ExampleComponent</span> <span class="hljs-title">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  state = {
    externalData: <span class="hljs-literal">null</span>,
  };

  componentDidMount() {
    <span class="hljs-keyword">this</span>._loadAsyncData(<span class="hljs-keyword">this</span>.props.id);
  }

  componentWillReceiveProps(nextProps) {
    <span class="hljs-keyword">if</span> (nextProps.id !== <span class="hljs-keyword">this</span>.props.id) {
      <span class="hljs-keyword">this</span>.setState({externalData: <span class="hljs-literal">null</span>});
      <span class="hljs-keyword">this</span>._loadAsyncData(nextProps.id);
    }
  }

  componentWillUnmount() {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._asyncRequest) {
      <span class="hljs-keyword">this</span>._asyncRequest.cancel();
    }
  }

  render() {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state.externalData === <span class="hljs-literal">null</span>) {
      <span class="hljs-comment">// Render loading state ...</span>
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// Render real UI ...</span>
    }
  }

  _loadAsyncData(id) {
    <span class="hljs-keyword">this</span>._asyncRequest = asyncLoadData(id).then(
      externalData =&gt; {
        <span class="hljs-keyword">this</span>._asyncRequest = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">this</span>.setState({externalData});
      }
    );
  }
}

</code></pre><p>此组件的推荐升级路径是将数据更新移动到<code>componentDidUpdate</code>中。在渲染新道具之前，您还可以使用新的<code>getDerivedStateFromProps</code>生命周期清除陈旧的数据：</p>
<pre><code class="hljs kotlin"><span class="hljs-comment">// After</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ExampleComponent</span> <span class="hljs-title">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  state = {
    externalData: <span class="hljs-literal">null</span>,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    <span class="hljs-comment">// Store prevId in state so we can compare when props change.</span>
    <span class="hljs-comment">// Clear out previously-loaded data (so we don't render stale stuff).</span>
    <span class="hljs-keyword">if</span> (nextProps.id !== prevState.prevId) {
      <span class="hljs-keyword">return</span> {
        externalData: <span class="hljs-literal">null</span>,
        prevId: nextProps.id,
      };
    }

    <span class="hljs-comment">// No state update necessary</span>
    <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
  }

  componentDidMount() {
    <span class="hljs-keyword">this</span>._loadAsyncData(<span class="hljs-keyword">this</span>.props.id);
  }

  componentDidUpdate(prevProps, prevState) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state.externalData === <span class="hljs-literal">null</span>) {
      <span class="hljs-keyword">this</span>._loadAsyncData(<span class="hljs-keyword">this</span>.props.id);
    }
  }

  componentWillUnmount() {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._asyncRequest) {
      <span class="hljs-keyword">this</span>._asyncRequest.cancel();
    }
  }

  render() {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state.externalData === <span class="hljs-literal">null</span>) {
      <span class="hljs-comment">// Render loading state ...</span>
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// Render real UI ...</span>
    }
  }

  _loadAsyncData(id) {
    <span class="hljs-keyword">this</span>._asyncRequest = asyncLoadData(id).then(
      externalData =&gt; {
        <span class="hljs-keyword">this</span>._asyncRequest = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">this</span>.setState({externalData});
      }
    );
  }
}

</code></pre><blockquote>
<p>注意&gt;如果您使用支持取消的HTTP库（如<a href="https://www.npmjs.com/package/axios">axios</a>），那么卸载时取消正在进行的请求很简单。对于原生Promise，<a href="https://gist.github.com/bvaughn/982ab689a41097237f6e9860db7ca8d6">您可以使用如下所示的方法</a>。</p>
</blockquote>
<h3><a href="https://reactjs.org/#reading-dom-properties-before-an-update">在更新之前读取DOM属性</a></h3>
<p>下面是一个组件的例子，它在更新之前从DOM中读取属性，以便在列表中保持滚动位置：</p>
<pre><code class="hljs kotlin"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ScrollingList</span> <span class="hljs-title">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  listRef = <span class="hljs-literal">null</span>;
  previousScrollOffset = <span class="hljs-literal">null</span>;

  componentWillUpdate(nextProps, nextState) {
    <span class="hljs-comment">// Are we adding new items to the list?</span>
    <span class="hljs-comment">// Capture the scroll position so we can adjust scroll later.</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.list.length &lt; nextProps.list.length) {
      <span class="hljs-keyword">this</span>.previousScrollOffset =
        <span class="hljs-keyword">this</span>.listRef.scrollHeight - <span class="hljs-keyword">this</span>.listRef.scrollTop;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    <span class="hljs-comment">// If previousScrollOffset is set, we've just added new items.</span>
    <span class="hljs-comment">// Adjust scroll so these new items don't push the old ones out of view.</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.previousScrollOffset !== <span class="hljs-literal">null</span>) {
      <span class="hljs-keyword">this</span>.listRef.scrollTop =
        <span class="hljs-keyword">this</span>.listRef.scrollHeight -
        <span class="hljs-keyword">this</span>.previousScrollOffset;
      <span class="hljs-keyword">this</span>.previousScrollOffset = <span class="hljs-literal">null</span>;
    }
  }

  render() {
    <span class="hljs-keyword">return</span> (
      `&lt;div&gt;`
        {<span class="hljs-comment">/* ...contents... */</span>}
      `&lt;/div&gt;`
    );
  }

  setListRef = ref =&gt; {
    <span class="hljs-keyword">this</span>.listRef = ref;
  };
}

</code></pre><p>在上面的例子中，<code>componentWillUpdate</code>被用来读取DOM属性。但是，对于异步渲染，“render”阶段生命周期（如<code>componentWillUpdate</code>和<code>render</code>）与“commit”阶段生命周期（如<code>componentDidUpdate</code>）之间可能存在延迟。如果用户在这段时间内做了类似调整窗口大小的操作，则从<code>componentWillUpdate</code>中读取的<code>scrollHeight</code>值将失效。</p>
<p>解决此问题的方法是使用新的“commit”阶段生命周期<code>getSnapshotBeforeUpdate</code>。在数据发生变化之前立即调用该方法（例如，在更新DOM之前）。它可以将React的值作为参数传递给<code>componentDidUpdate</code>，在数据发生变化后立即调用它。</p>
<p>这两个生命周期可以像这样一起使用：</p>
<pre><code class="hljs scala"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ScrollingList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  listRef = <span class="hljs-literal">null</span>;

  getSnapshotBeforeUpdate(prevProps, prevState) {
    <span class="hljs-comment">// Are we adding new items to the list?</span>
    <span class="hljs-comment">// Capture the scroll position so we can adjust scroll later.</span>
    <span class="hljs-keyword">if</span> (prevProps.list.length &lt; <span class="hljs-keyword">this</span>.props.list.length) {
      <span class="hljs-keyword">return</span> (
        <span class="hljs-keyword">this</span>.listRef.scrollHeight - <span class="hljs-keyword">this</span>.listRef.scrollTop
      );
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    <span class="hljs-comment">// If we have a snapshot value, we've just added new items.</span>
    <span class="hljs-comment">// Adjust scroll so these new items don't push the old ones out of view.</span>
    <span class="hljs-comment">// (snapshot here is the value returned from getSnapshotBeforeUpdate)</span>
    <span class="hljs-keyword">if</span> (snapshot !== <span class="hljs-literal">null</span>) {
      <span class="hljs-keyword">this</span>.listRef.scrollTop =
        <span class="hljs-keyword">this</span>.listRef.scrollHeight - snapshot;
    }
  }

  render() {
    <span class="hljs-keyword">return</span> (
      `&lt;div&gt;`
        {<span class="hljs-comment">/* ...contents... */</span>}
      `&lt;/div&gt;`
    );
  }

  setListRef = ref =&gt; {
    <span class="hljs-keyword">this</span>.listRef = ref;
  };
}

</code></pre><blockquote>
<p>注意&gt;&gt;如果您正在编写共享组件，那么<code>react-lifecycles-compat polyfill</code>可以使新的<code>getSnapshotBeforeUpdate</code>生命周期与旧版本的React一起使用。<a href="https://reactjs.org/#open-source-project-maintainers">详细了解如何使用它</a>。</p>
</blockquote>
<h2><a href="https://reactjs.org/#other-scenarios">其它情况</a></h2>
<p>除了以上的一些常见的例子，还可能会有别的情况本篇文章没有涵盖到，如果您以本博文未涉及的方式使用<code>componentWillMount</code>，<code>componentWillUpdate</code>或<code>componentWillReceiveProps</code>，并且不确定如何迁移这些传统生命周期，你可以提供您的代码示例和我们的文档，并且一起提交一个新问题。我们将在更新这份文件时提供新的替代模式。</p>
<h2><a href="https://reactjs.org/#open-source-project-maintainers">开源项目维护者</a></h2>
<p>开源维护人员可能想知道这些更改对于共享组件意味着什么。如果实现上述建议，那么依赖于新的静态<code>getDerivedStateFromProps</code>生命周期的组件会发生什么情况？你是否还必须发布一个新的主要版本，并降低React 16.2及更高版本的兼容性？</p>
<p>当React 16.3发布时，我们还将发布一个新的npm包， <a href="https://github.com/reactjs/react-lifecycles-compat"><code>react-lifecycles-compat</code></a>。该npm包会填充组件，以便新的<code>getDerivedStateFromProps</code>和<code>getSnapshotBeforeUpdate</code>生命周期也可以与旧版本的React（0.14.9+）一起使用。</p>
<p>要使用这个polyfill，首先将它作为依赖项添加到您的库中：</p>
<pre><code class="hljs dockerfile"><span class="hljs-comment"># Yarn</span>
yarn <span class="hljs-keyword">add</span><span class="bash"> react-lifecycles-compat
</span>
<span class="hljs-comment"># NPM</span>
npm install react-lifecycles-compat --save

</code></pre><p>接下来，更新您的组件以使用新的生命周期（如上所述）。</p>
<p>最后，使用polyfill将组件向后兼容旧版本的React：</p>
<pre><code class="hljs scala"><span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">'reac</span>t';
<span class="hljs-keyword">import</span> {polyfill} from <span class="hljs-symbol">'react</span>-lifecycles-compat';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ExampleComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  static getDerivedStateFromProps(nextProps, prevState) {
    <span class="hljs-comment">// Your state update logic here ...</span>
  }
}

<span class="hljs-comment">// Polyfill your component to work with older versions of React:</span>
polyfill(<span class="hljs-type">ExampleComponent</span>);

export <span class="hljs-keyword">default</span> <span class="hljs-type">ExampleComponent</span>;

</code></pre><p><a href="https://github.com/reactjs/reactjs.org/tree/master/content/blog/2018-03-27-update-on-async-rendering.md">文章来源</a></p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/update-on-async-rendering](https://www.zcfy.cc/article/update-on-async-rendering)
原文标题: ReactV16.3即将更改的生命周期
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
