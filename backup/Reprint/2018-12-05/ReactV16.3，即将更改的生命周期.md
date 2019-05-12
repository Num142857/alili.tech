---
title: 'ReactV16.3，即将更改的生命周期' 
date: 2018-12-05 2:30:09
hidden: true
slug: ry8gh822u39
categories: [reprint]
---

{{< raw >}}

                    
<p>注释：本文是根据React的官方博客翻译而成（文章地址：<a href="https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html" rel="nofollow noreferrer">https://reactjs.org/blog/2018...</a>）。<br>主要讲述了React之后的更新方向，以及对之前生命周期所出现的问题的总结，之后的React将逐步弃用一些生命周期和增加一些更实用更符合实际情况的生命周期。其中也为从传统的生命周期迁移到新版本的React提出了一些解决方法。</p>
<hr>
<p>一年多来，React团队一直致力于实现异步渲染。上个月，他在JSConf冰岛的演讲中，<a href="https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html" rel="nofollow noreferrer">丹揭示了一些令人兴奋的新的异步渲染可能性</a>。现在，我们希望与您分享我们在学习这些功能时学到的一些经验教训，以及一些帮助您准备组件以在启动时进行异步渲染的方法。</p>
<p>我们了解到的最大问题之一是，我们的一些传统组件生命周期会导致一些不安全的编码实践。他们是：</p>
<ul>
<li><code>componentWillMount</code></li>
<li><code>componentWillReceiveProps</code></li>
<li><code>componentWillUpdate</code></li>
</ul>
<p>这些生命周期方法经常被误解和滥用;此外，我们预计他们的潜在滥用可能在异步渲染方面有更大的问题。因此，我们将在即将发布的版本中为这些生命周期添加一个“UNSAFE_”前缀。 （这里，“不安全”不是指安全性，而是表示使用这些生命周期的代码将更有可能在未来的React版本中存在缺陷，特别是一旦启用了异步渲染）。</p>
<h2>[](<a href="https://reactjs.org/#gradual-migration-path)%E9%80%90%E6%AD%A5%E8%BF%81%E7%A7%BB%E8%B7%AF%E5%BE%84" rel="nofollow noreferrer">https://reactjs.org/#gradual-...</a>
</h2>
<p><a href="https://reactjs.org/blog/2016/02/19/new-versioning-scheme.html" rel="nofollow noreferrer">React遵循语义版本控制</a>, 所以这种改变将是渐进的。我们目前的计划是：</p>
<ul>
<li>
<strong>16.3</strong>：为不安全生命周期引入别名UNSAFE_componentWillMount，UNSAFE_componentWillReceiveProps和UNSAFE_componentWillUpdate。 （旧的生命周期名称和新的别名都可以在此版本中使用。）</li>
<li>
<strong>未来的16.x版本</strong>：为componentWillMount，componentWillReceiveProps和componentWillUpdate启用弃用警告。 （旧的生命周期名称和新的别名都可以在此版本中使用，但旧名称会记录DEV模式警告。）</li>
<li>
<strong>17.0：</strong>删除componentWillMount，componentWillReceiveProps和componentWillUpdate。 （从现在开始，只有新的“UNSAFE_”生命周期名称将起作用。）</li>
</ul>
<p><strong>请注意，如果您是React应用程序开发人员，那么您不必对遗留方法进行任何操作。即将发布的16.3版本的主要目的是让开源项目维护人员在任何弃用警告之前更新其库。这些警告将在未来的16.x版本发布之前不会启用。</strong></p>
<p>我们在Facebook上维护了超过50,000个React组件，我们不打算立即重写它们。我们知道迁移需要时间。我们将采用逐步迁移路径以及React社区中的所有人。</p>
<hr>
<h2><a href="https://reactjs.org/#migrating-from-legacy-lifecycles" rel="nofollow noreferrer">从传统生命周期迁移</a></h2>
<p>如果您想开始使用React 16.3中引入的新组件API（或者如果您是维护人员提前更新库），以下是一些示例，我们希望这些示例可以帮助您开始考虑组件的变化。随着时间的推移，我们计划在文档中添加额外的“配方”，以展示如何以避免有问题的生命周期的方式执行常见任务。</p>
<p>在开始之前，我们将简要概述为16.3版计划的生命周期更改：</p>
<ul>
<li>We are <strong>adding the following lifecycle aliases</strong>: <code>UNSAFE_componentWillMount</code>, <code>UNSAFE_componentWillReceiveProps</code>, and <code>UNSAFE_componentWillUpdate</code>. (Both the old lifecycle names and the new aliases will be supported.)</li>
<li>We are <strong>introducing two new lifecycles</strong>, static <code>getDerivedStateFromProps</code> and <code>getSnapshotBeforeUpdate</code>.</li>
<li>我们正在<strong>添加以下生命周期别名</strong>：</li>
</ul>
<p>(1) UNSAFE_componentWillMount，</p>
<p>(2) UNSAFE_componentWillReceiveProps</p>
<p>(3) UNSAFE_componentWillUpdate。 （旧的生命周期名称和新的别名都将受支持。）</p>
<ul><li>我们介绍了<strong>两个新的生命周期</strong>，分别是getDerivedStateFromProps和getSnapshotBeforeUpdate。</li></ul>
<h3>
<a href="https://reactjs.org/#new-lifecycle-getderivedstatefromprops" rel="nofollow noreferrer">新的生命周期:</a> <code>getDerivedStateFromProps</code>
</h3>
<pre><code>class Example extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    // ...
  }
}
</code></pre>
<p>新的静态<code>getDerivedStateFromProps</code>生命周期在组件实例化以及接收新<code>props</code>后调用。它可以返回一个对象来更新<code>state</code>，或者返回null来表示新的<code>props</code>不需要任何<code>state</code>更新。</p>
<p>与<code>componentDidUpdate</code>一起，这个新的生命周期应该覆盖传统<code>componentWillReceiveProps</code>的所有用例。</p>
<h3>
<a href="https://reactjs.org/#new-lifecycle-getsnapshotbeforeupdate" rel="nofollow noreferrer">新的生命周期:</a> <code>getSnapshotBeforeUpdate</code>
</h3>
<pre><code>class Example extends React.Component {
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // ...
  }
}
</code></pre>
<p>新的<code>getSnapshotBeforeUpdate</code>生命周期在更新之前被调用（例如，在DOM被更新之前）。此生命周期的返回值将作为第三个参数传递给<code>componentDidUpdate</code>。 （这个生命周期不是经常需要的，但可以用于在恢复期间手动保存滚动位置的情况。）</p>
<p>与<code>componentDidUpdate</code>一起，这个新的生命周期将覆盖旧版<code>componentWillUpdate</code>的所有用例。</p>
<p>You can find their type signatures <a href="https://gist.github.com/gaearon/88634d27abbc4feeb40a698f760f3264" rel="nofollow noreferrer">in this gist</a>.</p>
<p>我们看看如何在使用这两种生命周期的，例子如下:</p>
<h2><a href="https://reactjs.org/#examples" rel="nofollow noreferrer">例如：</a></h2>
<ul>
<li>
<a href="https://reactjs.org/#initializing-state" rel="nofollow noreferrer">Initializing state</a>（初始化状态）</li>
<li>
<a href="https://reactjs.org/#fetching-external-data" rel="nofollow noreferrer">Fetching external data</a>（获取外部数据）</li>
<li>
<a href="https://reactjs.org/#adding-event-listeners-or-subscriptions" rel="nofollow noreferrer">Adding event listeners (or subscriptions)</a>（添加事件监听）</li>
<li>
<a href="https://reactjs.org/#updating-state-based-on-props" rel="nofollow noreferrer">Updating <code>state</code> based on props</a>（基于<code>props</code>更新<code>state</code>）</li>
<li>
<a href="https://reactjs.org/#invoking-external-callbacks" rel="nofollow noreferrer">Invoking external callbacks</a>(调用外部的<code>callbacks</code>)</li>
<li><a href="https://reactjs.org/#side-effects-on-props-change" rel="nofollow noreferrer">Side effects on props change</a></li>
<li>
<a href="https://reactjs.org/#fetching-external-data-when-props-change" rel="nofollow noreferrer">Fetching external data when props change</a>（<code>props</code>改变时获取外部数据）</li>
<li>
<a href="https://reactjs.org/#reading-dom-properties-before-an-update" rel="nofollow noreferrer">Reading DOM properties before an update</a>(在更新之前读取DOM属性)</li>
</ul>
<blockquote>注意<p>为简洁起见，下面的示例是使用实验类属性转换编写的，但如果没有它，则应用相同的迁移策略。</p>
</blockquote>
<h3><a href="https://reactjs.org/#initializing-state" rel="nofollow noreferrer">初始化状态：</a></h3>
<p>这个例子展示了一个调用<code>componentWillMount</code>中带有<code>setState</code>的组件：</p>
<pre><code>// Before
class ExampleComponent extends React.Component {
  state = {};

  componentWillMount() {
    this.setState({
      currentColor: this.props.defaultColor,
      palette: 'rgb',
    });
  }
}
</code></pre>
<p>这种类型的组件最简单的重构是将状态初始化移动到构造函数或属性初始值设定项，如下所示：</p>
<pre><code>// After
class ExampleComponent extends React.Component {
  state = {
    currentColor: this.props.defaultColor,
    palette: 'rgb',
  };
}
</code></pre>
<h3><a href="https://reactjs.org/#fetching-external-data" rel="nofollow noreferrer">获取外部数据</a></h3>
<p>以下是使用<code>componentWillMount</code>获取外部数据的组件示例：</p>
<pre><code>// Before
class ExampleComponent extends React.Component {
  state = {
    externalData: null,
  };

  componentWillMount() {
    this._asyncRequest = asyncLoadData().then(
      externalData =&gt; {
        this._asyncRequest = null;
        this.setState({externalData});
      }
    );
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  render() {
    if (this.state.externalData === null) {
      // Render loading state ...
    } else {
      // Render real UI ...
    }
  }
}
</code></pre>
<p>上述代码对于服务器呈现（其中不使用外部数据的地方）和即将到来的异步呈现模式（其中请求可能被多次启动）是有问题的。</p>
<p>对于大多数用例，建议的升级路径是将数据提取移入<code>componentDidMount</code>：</p>
<pre><code>// After
class ExampleComponent extends React.Component {
  state = {
    externalData: null,
  };

  componentDidMount() {
    this._asyncRequest = asyncLoadData().then(
      externalData =&gt; {
        this._asyncRequest = null;
        this.setState({externalData});
      }
    );
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  render() {
    if (this.state.externalData === null) {
      // Render loading state ...
    } else {
      // Render real UI ...
    }
  }
}
</code></pre>
<p>有一个常见的错误观念认为，在<code>componentWillMount中</code>提取可以避免第一个空的渲染。在实践中，这从来都不是真的，因为React总是在<code>componentWillMount</code>之后立即执行渲染。如果数据在<code>componentWillMount</code>触发的时间内不可用，则无论你在哪里提取数据，第一个渲染仍将显示加载状态。这就是为什么在绝大多数情况下将提取移到<code>componentDidMount</code>没有明显效果。</p>
<blockquote>注意：<br>一些高级用例（例如，像Relay这样的库）可能想要尝试使用热切的预取异步数据。在这里可以找到一个这样做的<a href="https://gist.github.com/bvaughn/89700e525ff423a75ffb63b1b1e30a8f" rel="nofollow noreferrer">例子</a>。</blockquote>
<p>从长远来看，在React组件中获取数据的规范方式可能基于<a href="https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html" rel="nofollow noreferrer">JSConf冰岛推出的“悬念”API</a>。简单的数据提取解决方案以及像Apollo和Relay这样的库都可以在后台使用。它比上述任一解决方案的冗余性都要小得多，但不会在16.3版本中及时完成。</p>
<p>当支持服务器渲染时，目前需要同步提供数据 - <code>componentWillMount</code>通常用于此目的，但构造函数可以用作替换。即将到来的<code>悬念API</code>将使得异步数据在客户端和服务器呈现中都可以清晰地获取。</p>
<h3><a href="https://reactjs.org/#adding-event-listeners-or-subscriptions" rel="nofollow noreferrer">添加时间监听</a></h3>
<p>下面是一个在安装时监听外部事件调度程序的组件示例：</p>
<pre><code>// Before
class ExampleComponent extends React.Component {
  componentWillMount() {
    this.setState({
      subscribedValue: this.props.dataSource.value,
    });

    // This is not safe; it can leak!
    this.props.dataSource.subscribe(
      this.handleSubscriptionChange
    );
  }

  componentWillUnmount() {
    this.props.dataSource.unsubscribe(
      this.handleSubscriptionChange
    );
  }

  handleSubscriptionChange = dataSource =&gt; {
    this.setState({
      subscribedValue: dataSource.value,
    });
  };
}
</code></pre>
<p>不幸的是，这会导致服务器渲染（<code>componentWillUnmount</code>永远不会被调用）和异步渲染（在渲染完成之前渲染可能被中断，导致<code>componentWillUnmount</code>不被调用）的内存泄漏。</p>
<p>人们经常认为<code>componentWillMount</code>和<code>componentWillUnmount</code>总是配对，但这并不能保证。只有调用<code>componentDidMount</code>后，React才能保证稍后调用<code>componentWillUnmount</code>进行清理。</p>
<p>出于这个原因，添加事件监听的推荐方式是使用componentDidMount生命周期：</p>
<pre><code>// After
class ExampleComponent extends React.Component {
  state = {
    subscribedValue: this.props.dataSource.value,
  };

  componentDidMount() {
    // Event listeners are only safe to add after mount,
    // So they won't leak if mount is interrupted or errors.
    this.props.dataSource.subscribe(
      this.handleSubscriptionChange
    );

    // External values could change between render and mount,
    // In some cases it may be important to handle this case.
    if (
      this.state.subscribedValue !==
      this.props.dataSource.value
    ) {
      this.setState({
        subscribedValue: this.props.dataSource.value,
      });
    }
  }

  componentWillUnmount() {
    this.props.dataSource.unsubscribe(
      this.handleSubscriptionChange
    );
  }

  handleSubscriptionChange = dataSource =&gt; {
    this.setState({
      subscribedValue: dataSource.value,
    });
  };
}
</code></pre>
<p>有时候更新监听以响应属性变化很重要。如果您使用的是像Redux或MobX这样的库，库的容器组件会为您处理。对于应用程序作者，我们创建了一个小型库create-subscription来帮助解决这个问题。我们会将它与React 16.3一起发布。</p>
<p>Rather than passing a subscribable <code>dataSource</code> prop as we did in the example above, we could use <code>create-subscription</code> to pass in the subscribed value:</p>
<p>我们可以使用create-subscription来传递监听的值，而不是像上例那样传递监听 的<code>dataSource</code> prop。</p>
<pre><code>import {createSubscription} from 'create-subscription';

const Subscription = createSubscription({
  getCurrentValue(sourceProp) {
    // Return the current value of the subscription (sourceProp).
    return sourceProp.value;
  },

  subscribe(sourceProp, callback) {
    function handleSubscriptionChange() {
      callback(sourceProp.value);
    }

    // Subscribe (e.g. add an event listener) to the subscription (sourceProp).
    // Call callback(newValue) whenever a subscription changes.
    sourceProp.subscribe(handleSubscriptionChange);

    // Return an unsubscribe method.
    return function unsubscribe() {
      sourceProp.unsubscribe(handleSubscriptionChange);
    };
  },
});

// Rather than passing the subscribable source to our ExampleComponent,
// We could just pass the subscribed value directly:
`&lt;Subscription source={dataSource}&gt;`
  {value =&gt; `&lt;ExampleComponent subscribedValue={value} /&gt;`}
`&lt;/Subscription&gt;`;
</code></pre>
<blockquote>注意&gt;&gt;像Relay / Apollo这样的库应该使用与创建订阅相同的技术手动管理订阅（如此处所引用的），并采用最适合其库使用的优化方式。</blockquote>
<h3><a href="https://reactjs.org/#updating-state-based-on-props" rel="nofollow noreferrer">基于<code>props</code>更新<code>state</code></a></h3>
<p>以下是使用旧版<code>componentWillReceiveProps</code>生命周期基于新的道具值更新状态的组件示例：</p>
<pre><code>// Before
class ExampleComponent extends React.Component {
  state = {
    isScrollingDown: false,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.currentRow !== nextProps.currentRow) {
      this.setState({
        isScrollingDown:
          nextProps.currentRow &gt; this.props.currentRow,
      });
    }
  }
}
</code></pre>
<p>尽管上面的代码本身并没有问题，但<code>componentWillReceiveProps</code>生命周期通常会被错误地用于解决问题。因此，该方法将被弃用。</p>
<p>从版本16.3开始，更新<code>state</code>以响应<code>props</code>更改的推荐方法是使用新的静态getDerivedStateFromProps生命周期。 （生命周期在组件创建时以及每次收到新道具时调用）：</p>
<pre><code>// After
class ExampleComponent extends React.Component {
  // Initialize state in constructor,
  // Or with a property initializer.
  state = {
    isScrollingDown: false,
    lastRow: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.currentRow !== prevState.lastRow) {
      return {
        isScrollingDown:
          nextProps.currentRow &gt; prevState.lastRow,
        lastRow: nextProps.currentRow,
      };
    }

    // Return null to indicate no change to state.
    return null;
  }
}
</code></pre>
<p>You may notice in the example above that <code>props.currentRow</code> is mirrored in state (as <code>state.lastRow</code>). This enables <code>getDerivedStateFromProps</code> to access the previous props value in the same way as is done in <code>componentWillReceiveProps</code>.</p>
<p>你可能会注意到在上面的例子中，<code>props.currentRow</code>是一个镜像状态（如state.lastRow）。这使得<code>getDerivedStateFromProp</code>s可以像在<code>componentWillReceiveProp</code>s中一样访问以前的props值。</p>
<p>您可能想知道为什么我们不只是将先前的<code>props</code>作为参数传递给<code>getDerivedStateFromProps</code>。我们在设计API时考虑了这个选项，但最终决定反对它，原因有两个：</p>
<ul>
<li>A <code>prevProps</code> parameter would be null the first time <code>getDerivedStateFromProps</code> was called (after instantiation), requiring an if-not-null check to be added any time <code>prevProps</code> was accessed.</li>
<li>Not passing the previous props to this function is a step toward freeing up memory in future versions of React. (If React does not need to pass previous props to lifecycles, then it does not need to keep the previous <code>props</code> object in memory.)</li>
</ul>
<ol>
<li>在第一次调用<code>getDerivedStateFromProps</code>（实例化后）时，<code>prevProps</code>参数将为null，需要在访问prevProps时添加if-not-null检查。</li>
<li>没有将以前的<code>props</code>传递给这个函数，在未来版本的React中释放内存的一个步骤。 （如果React不需要将先前的道具传递给生命周期，那么它不需要将先前的道具对象保留在内存中。）</li>
</ol>
<blockquote>注意：如果您正在编写共享组件，那么<code>react-lifecycles-compat polyfill</code>可以使新的<code>getDerivedStateFromProps</code>生命周期与旧版本的React一起使用。详细了解如何在下面使用它。</blockquote>
<h3><a href="https://reactjs.org/#invoking-external-callbacks" rel="nofollow noreferrer">调用外部回调函数</a></h3>
<p>下面是一个在内部状态发生变化时调用外部函数的组件示例：</p>
<pre><code>// Before
class ExampleComponent extends React.Component {
  componentWillUpdate(nextProps, nextState) {
    if (
      this.state.someStatefulValue !==
      nextState.someStatefulValue
    ) {
      nextProps.onChange(nextState.someStatefulValue);
    }
  }
}
</code></pre>
<p>在异步模式下使用<code>componentWillUpdate</code>都是不安全的，因为外部回调可能会多次调用只更新一次。相反，应该使用<code>componentDidUpdate</code>生命周期，因为它保证每次更新只调用一次：</p>
<pre><code>// After
class ExampleComponent extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.someStatefulValue !==
      prevState.someStatefulValue
    ) {
      this.props.onChange(this.state.someStatefulValue);
    }
  }
}
</code></pre>
<h3><a href="https://reactjs.org/#side-effects-on-props-change" rel="nofollow noreferrer">props改变的副作用</a></h3>
<p>与上述 <a href="https://reactjs.org/#invoking-external-callbacks" rel="nofollow noreferrer">事例</a>类似，有时组件在道具更改时会产生副作用。</p>
<pre><code>// Before
class ExampleComponent extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.isVisible !== nextProps.isVisible) {
      logVisibleChange(nextProps.isVisible);
    }
  }
}
</code></pre>
<p>与<code>componentWillUpdate</code>一样，<code>componentWillReceiveProps</code>可能会多次调用但是只更新一次。出于这个原因，避免在此方法中导致的副作用非常重要。相反，应该使用<code>componentDidUpdate</code>，因为它保证每次更新只调用一次：</p>
<pre><code>// After
class ExampleComponent extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.isVisible !== prevProps.isVisible) {
      logVisibleChange(this.props.isVisible);
    }
  }
}
</code></pre>
<h3><a href="https://reactjs.org/#fetching-external-data-when-props-change" rel="nofollow noreferrer">props改变时获取外部数据</a></h3>
<p>以下是根据<code>props</code>values提取外部数据的组件示例：</p>
<pre><code>// Before
class ExampleComponent extends React.Component {
  state = {
    externalData: null,
  };

  componentDidMount() {
    this._loadAsyncData(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({externalData: null});
      this._loadAsyncData(nextProps.id);
    }
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  render() {
    if (this.state.externalData === null) {
      // Render loading state ...
    } else {
      // Render real UI ...
    }
  }

  _loadAsyncData(id) {
    this._asyncRequest = asyncLoadData(id).then(
      externalData =&gt; {
        this._asyncRequest = null;
        this.setState({externalData});
      }
    );
  }
}
</code></pre>
<p>此组件的推荐升级路径是将数据更新移动到<code>componentDidUpdate</code>中。在渲染新道具之前，您还可以使用新的<code>getDerivedStateFromProps</code>生命周期清除陈旧的数据：</p>
<pre><code>// After
class ExampleComponent extends React.Component {
  state = {
    externalData: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (nextProps.id !== prevState.prevId) {
      return {
        externalData: null,
        prevId: nextProps.id,
      };
    }

    // No state update necessary
    return null;
  }

  componentDidMount() {
    this._loadAsyncData(this.props.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.externalData === null) {
      this._loadAsyncData(this.props.id);
    }
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  render() {
    if (this.state.externalData === null) {
      // Render loading state ...
    } else {
      // Render real UI ...
    }
  }

  _loadAsyncData(id) {
    this._asyncRequest = asyncLoadData(id).then(
      externalData =&gt; {
        this._asyncRequest = null;
        this.setState({externalData});
      }
    );
  }
}
</code></pre>
<blockquote>注意&gt;如果您使用支持取消的HTTP库（如<a href="https://www.npmjs.com/package/axios" rel="nofollow noreferrer">axios</a>），那么卸载时取消正在进行的请求很简单。对于原生Promise，<a href="https://gist.github.com/bvaughn/982ab689a41097237f6e9860db7ca8d6" rel="nofollow noreferrer">您可以使用如下所示的方法</a>。</blockquote>
<h3><a href="https://reactjs.org/#reading-dom-properties-before-an-update" rel="nofollow noreferrer">在更新之前读取DOM属性</a></h3>
<p>下面是一个组件的例子，它在更新之前从DOM中读取属性，以便在列表中保持滚动位置：</p>
<pre><code>class ScrollingList extends React.Component {
  listRef = null;
  previousScrollOffset = null;

  componentWillUpdate(nextProps, nextState) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (this.props.list.length &lt; nextProps.list.length) {
      this.previousScrollOffset =
        this.listRef.scrollHeight - this.listRef.scrollTop;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // If previousScrollOffset is set, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    if (this.previousScrollOffset !== null) {
      this.listRef.scrollTop =
        this.listRef.scrollHeight -
        this.previousScrollOffset;
      this.previousScrollOffset = null;
    }
  }

  render() {
    return (
      `&lt;div&gt;`
        {/* ...contents... */}
      `&lt;/div&gt;`
    );
  }

  setListRef = ref =&gt; {
    this.listRef = ref;
  };
}
</code></pre>
<p>在上面的例子中，<code>componentWillUpdate</code>被用来读取DOM属性。但是，对于异步渲染，“render”阶段生命周期（如<code>componentWillUpdate</code>和<code>render</code>）与“commit”阶段生命周期（如<code>componentDidUpdate</code>）之间可能存在延迟。如果用户在这段时间内做了类似调整窗口大小的操作，则从<code>componentWillUpdate</code>中读取的<code>scrollHeight</code>值将失效。</p>
<p>解决此问题的方法是使用新的“commit”阶段生命周期<code>getSnapshotBeforeUpdate</code>。在数据发生变化之前立即调用该方法（例如，在更新DOM之前）。它可以将React的值作为参数传递给<code>componentDidUpdate</code>，在数据发生变化后立即调用它。</p>
<p>这两个生命周期可以像这样一起使用：</p>
<pre><code>class ScrollingList extends React.Component {
  listRef = null;

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (prevProps.list.length &lt; this.props.list.length) {
      return (
        this.listRef.scrollHeight - this.listRef.scrollTop
      );
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    if (snapshot !== null) {
      this.listRef.scrollTop =
        this.listRef.scrollHeight - snapshot;
    }
  }

  render() {
    return (
      `&lt;div&gt;`
        {/* ...contents... */}
      `&lt;/div&gt;`
    );
  }

  setListRef = ref =&gt; {
    this.listRef = ref;
  };
}
</code></pre>
<blockquote>注意&gt;&gt;如果您正在编写共享组件，那么<code>react-lifecycles-compat polyfill</code>可以使新的<code>getSnapshotBeforeUpdate</code>生命周期与旧版本的React一起使用。<a href="https://reactjs.org/#open-source-project-maintainers" rel="nofollow noreferrer">详细了解如何使用它</a>。</blockquote>
<h2><a href="https://reactjs.org/#other-scenarios" rel="nofollow noreferrer">其它情况</a></h2>
<p>While we tried to cover the most common use cases in this post, we recognize that we might have missed some of them. If you are using <code>componentWillMount</code>, <code>componentWillUpdate</code>, or <code>componentWillReceiveProps</code> in ways that aren’t covered by this blog post, and aren’t sure how to migrate off these legacy lifecycles, please <a href="https://github.com/reactjs/reactjs.org/issues/new" rel="nofollow noreferrer">file a new issue against our documentation</a> with your code examples and as much background information as you can provide. We will update this document with new alternative patterns as they come up.</p>
<p>除了以上的一些常见的例子，还可能会有别的情况本篇文章没有涵盖到，如果您以本博文未涉及的方式使用<code>componentWillMount</code>，<code>componentWillUpdate</code>或<code>componentWillReceiveProps</code>，并且不确定如何迁移这些传统生命周期，你可以提供您的代码示例和我们的文档，并且一起提交一个新问题。我们将在更新这份文件时提供新的替代模式。</p>
<h2><a href="https://reactjs.org/#open-source-project-maintainers" rel="nofollow noreferrer">开源项目维护者</a></h2>
<p>开源维护人员可能想知道这些更改对于共享组件意味着什么。如果实现上述建议，那么依赖于新的静态<code>getDerivedStateFromProps</code>生命周期的组件会发生什么情况？你是否还必须发布一个新的主要版本，并降低React 16.2及更高版本的兼容性？</p>
<p>当React 16.3发布时，我们还将发布一个新的npm包， <a href="https://github.com/reactjs/react-lifecycles-compat" rel="nofollow noreferrer"><code>react-lifecycles-compat</code></a>。该npm包会填充组件，以便新的<code>getDerivedStateFromProps</code>和<code>getSnapshotBeforeUpdate</code>生命周期也可以与旧版本的React（0.14.9+）一起使用。</p>
<p>要使用这个polyfill，首先将它作为依赖项添加到您的库中：</p>
<pre><code># Yarn
yarn add react-lifecycles-compat

# NPM
npm install react-lifecycles-compat --save
</code></pre>
<p>接下来，更新您的组件以使用新的生命周期（如上所述）。</p>
<p>最后，使用polyfill将组件向后兼容旧版本的React：</p>
<pre><code>import React from 'react';
import {polyfill} from 'react-lifecycles-compat';

class ExampleComponent extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    // Your state update logic here ...
  }
}

// Polyfill your component to work with older versions of React:
polyfill(ExampleComponent);

export default ExampleComponent;
</code></pre>
<p><a href="https://github.com/reactjs/reactjs.org/tree/master/content/blog/2018-03-27-update-on-async-rendering.md" rel="nofollow noreferrer">文章来源</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ReactV16.3，即将更改的生命周期

## 原文链接
[https://segmentfault.com/a/1190000014456811](https://segmentfault.com/a/1190000014456811)

