---
title: '由React Router引起的组件重复渲染谈Route的使用姿势' 
date: 2018-12-25 2:30:11
hidden: true
slug: b6rib2ef08p
categories: [reprint]
---

{{< raw >}}

                    
<p>React Router 4 把<code>Route</code>当作普通的React组件，可以在任意组件内使用<code>Route</code>，而不再像之前的版本那样，必须在一个地方集中定义所有的<code>Route</code>。因此，使用React Router 4 的项目中，经常会有<code>Route</code>和其他组件出现在同一个组件内的情况。例如下面这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends Component {
  render() {
    const { isRequesting } = this.props;
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path=&quot;/&quot; component={Home} />
            <Route path=&quot;/login&quot; component={Login} />
            <Route path=&quot;/home&quot; component={Home} />
          </Switch>
        </Router>
        {isRequesting  &amp;&amp; <Loading />}
      </div>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    const { isRequesting } = <span class="hljs-keyword">this</span>.props;
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;<span class="hljs-type">Router</span>&gt;
          &lt;<span class="hljs-type">Switch</span>&gt;
            &lt;<span class="hljs-type">Route</span> exact path=<span class="hljs-string">"/"</span> component={<span class="hljs-type">Home</span>} /&gt;
            &lt;<span class="hljs-type">Route</span> path=<span class="hljs-string">"/login"</span> component={<span class="hljs-type">Login</span>} /&gt;
            &lt;<span class="hljs-type">Route</span> path=<span class="hljs-string">"/home"</span> component={<span class="hljs-type">Home</span>} /&gt;
          &lt;/<span class="hljs-type">Switch</span>&gt;
        &lt;/<span class="hljs-type">Router</span>&gt;
        {isRequesting  &amp;&amp; &lt;<span class="hljs-type">Loading</span> /&gt;}
      &lt;/div&gt;
    );
  }
}</code></pre>
<p>页面加载效果组件<code>Loading</code>和<code>Route</code>处于同一层级，这样，<code>Home</code>、<code>Login</code>等页面组件都共用外层的Loading组件。当和Redux一起使用时，isRequesting会存储到Redux的store中，<code>App</code>会作为Redux中的容器组件（container components），从store中获取isRequesting。<code>Home</code>、<code>Login</code>等页面根组件一般也会作为容器组件，从store中获取所需的state，进行组件的渲染。代码演化成这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends Component {
  render() {
    const { isRequesting } = this.props;
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path=&quot;/&quot; component={Home} />
            <Route path=&quot;/login&quot; component={Login} />
            <Route path=&quot;/home&quot; component={Home} />
          </Switch>
        </Router>
        {isRequesting  &amp;&amp; <Loading />}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    isRequesting: getRequestingState(state)
  };
};

export default connect(mapStateToProps)(App);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    const { isRequesting } = <span class="hljs-keyword">this</span>.props;
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;<span class="hljs-type">Router</span>&gt;
          &lt;<span class="hljs-type">Switch</span>&gt;
            &lt;<span class="hljs-type">Route</span> exact path=<span class="hljs-string">"/"</span> component={<span class="hljs-type">Home</span>} /&gt;
            &lt;<span class="hljs-type">Route</span> path=<span class="hljs-string">"/login"</span> component={<span class="hljs-type">Login</span>} /&gt;
            &lt;<span class="hljs-type">Route</span> path=<span class="hljs-string">"/home"</span> component={<span class="hljs-type">Home</span>} /&gt;
          &lt;/<span class="hljs-type">Switch</span>&gt;
        &lt;/<span class="hljs-type">Router</span>&gt;
        {isRequesting  &amp;&amp; &lt;<span class="hljs-type">Loading</span> /&gt;}
      &lt;/div&gt;
    );
  }
}

const mapStateToProps = (state, props) =&gt; {
  <span class="hljs-keyword">return</span> {
    isRequesting: getRequestingState(state)
  };
};

export <span class="hljs-keyword">default</span> connect(mapStateToProps)(<span class="hljs-type">App</span>);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Home extends Component {
  componentDidMount() {
    this.props.fetchHomeDataFromServer();
  }
  
  render() {
    return (
      <div>
       {homeData}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    homeData: getHomeData(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(homeActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Home</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  componentDidMount() {
    <span class="hljs-keyword">this</span>.props.fetchHomeDataFromServer();
  }
  
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
       {homeData}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}

<span class="hljs-keyword">const</span> mapStateToProps = <span class="hljs-function">(<span class="hljs-params">state, props</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">homeData</span>: getHomeData(state)
  };
};

<span class="hljs-keyword">const</span> mapDispatchToProps = <span class="hljs-function"><span class="hljs-params">dispatch</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> {
    ...bindActionCreators(homeActions, dispatch)
  };
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect(mapStateToProps, mapDispatchToProps)(Home);</code></pre>
<p><code>Home</code>组件挂载后，调用<code>this.props.fetchHomeDataFromServer()</code>这个异步action从服务器中获取页面所需数据。<code>fetchHomeDataFromServer</code>一般的结构会是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fetchHomeDataFromServer = () => {
  return (dispatch, getState) => {  
    dispatch(REQUEST_BEGIN);
    return fetchHomeData().then(data => {
      dispatch(REQUEST_END);   
      dispatch(setHomeData(data));
    });    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> fetchHomeDataFromServer = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">dispatch, getState</span>) =&gt;</span> {  
    dispatch(REQUEST_BEGIN);
    <span class="hljs-keyword">return</span> fetchHomeData().then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
      dispatch(REQUEST_END);   
      dispatch(setHomeData(data));
    });    
}</code></pre>
<p>这样，在<code>dispatch</code> <code>setHomeData(data)</code>前，会<code>dispatch</code>另外两个action改变isRequesting，进而控制<code>App</code>中<code>Loading</code>的显示和隐藏。正常来说，isRequesting的改变应该只会导致<code>App</code>组件重新render，而不会影响<code>Home</code>组件。因为经过Redux connect后的<code>Home</code>组件，在更新阶段，会使用浅比较（shallow comparison）判断接收到的props是否发生改变，如果没有改变，组件是不会重新render的。<code>Home</code>组件并不依赖isRequesting，render方法理应不被触发。</p>
<p>但实际的结果是，每一次<code>App</code>的重新render，都伴随着<code>Home</code>的重新render。Redux浅比较做的优化都被浪费掉了!</p>
<p>究竟是什么原因导致的呢？最后，我在React Router <code>Route</code>的源码中找到了罪魁祸首：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentWillReceiveProps(nextProps, nextContext) {
    warning(
      !(nextProps.location &amp;&amp; !this.props.location),
      '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no &quot;location&quot; prop and then provided one on a subsequent render.'
    )

    warning(
      !(!nextProps.location &amp;&amp; this.props.location),
      '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a &quot;location&quot; prop initially but omitted it on a subsequent render.'
    )

    // 注意这里，computeMatch每次返回的都是一个新对象，如此一来，每次Route更新，setState都会重新设置一个新的match对象
    this.setState({
      match: this.computeMatch(nextProps, nextContext.router)
    })
  }

  render() {
    const { match } = this.state
    const { children, component, render } = this.props
    const { history, route, staticContext } = this.context.router
    const location = this.props.location || route.location
    // 注意这里，这是传递给Route中的组件的属性
    const props = { match, location, history, staticContext }

    if (component)
      return match ? React.createElement(component, props) : null

    if (render)
      return match ? render(props) : null

    if (typeof children === 'function')
      return children(props)

    if (children &amp;&amp; !isEmptyChildren(children))
      return React.Children.only(children)

    return null
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code>componentWillReceiveProps(nextProps, nextContext) {
    <span class="hljs-keyword">warning</span>(
      !(nextProps.location &amp;&amp; !<span class="hljs-keyword">this</span>.props.location),
      <span class="hljs-string">'&lt;Route&gt; elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'</span>
    )

    <span class="hljs-keyword">warning</span>(
      !(!nextProps.location &amp;&amp; <span class="hljs-keyword">this</span>.props.location),
      <span class="hljs-string">'&lt;Route&gt; elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'</span>
    )

    <span class="hljs-comment">// 注意这里，computeMatch每次返回的都是一个新对象，如此一来，每次Route更新，setState都会重新设置一个新的match对象</span>
    <span class="hljs-keyword">this</span>.setState({
      match: <span class="hljs-keyword">this</span>.computeMatch(nextProps, nextContext.router)
    })
  }

  render() {
    <span class="hljs-keyword">const</span> { match } = <span class="hljs-keyword">this</span>.state
    <span class="hljs-keyword">const</span> { children, component, render } = <span class="hljs-keyword">this</span>.props
    <span class="hljs-keyword">const</span> { history, route, staticContext } = <span class="hljs-keyword">this</span>.context.router
    <span class="hljs-keyword">const</span> location = <span class="hljs-keyword">this</span>.props.location || route.location
    <span class="hljs-comment">// 注意这里，这是传递给Route中的组件的属性</span>
    <span class="hljs-keyword">const</span> props = { match, location, history, staticContext }

    <span class="hljs-keyword">if</span> (component)
      <span class="hljs-keyword">return</span> match ? React.createElement(component, props) : <span class="hljs-keyword">null</span>

    <span class="hljs-keyword">if</span> (render)
      <span class="hljs-keyword">return</span> match ? render(props) : <span class="hljs-keyword">null</span>

    <span class="hljs-keyword">if</span> (typeof children === 'function')
      <span class="hljs-keyword">return</span> children(props)

    <span class="hljs-keyword">if</span> (children &amp;&amp; !isEmptyChildren(children))
      <span class="hljs-keyword">return</span> React.Children.only(children)

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">null</span>
  }</code></pre>
<p><code>Route</code>的<code>componentWillReceiveProps</code>中，会调用<code>setState</code>设置match，match由<code>computeMatch</code>计算而来，<code>computeMatch</code>每次都会返回一个新的对象。这样，每次<code>Route</code>更新（componentWillReceiveProps被调用），都将创建一个新的match，而这个match由会作为props传递给<code>Route</code>中定义的组件（这个例子中，也就是<code>Home</code>）。于是，<code>Home</code>组件在更新阶段，总会收到一个新的<code>match</code>属性，导致Redux的浅比较失败，进而触发组件的重新渲染。事实上，上面的情况中，<code>Route</code>传递给<code>Home</code>的其他属性location、history、staticContext都没有改变，match虽然是一个新对象，但对象的内容并没有改变（一直处在同一页面，URL并没有发生变化，match的计算结果自然也没有变）。</p>
<p>如果你认为这个问题只是和Redux一起使用时才会遇到，那就大错特错了。再举两个不使用Redux的场景：</p>
<ol>
<li>
<code>App</code>结构基本不变，只是不再通过Redux获取isRequesting，而是作为组件自身的state维护。<code>Home</code>继承自<code>React.PureComponent</code>，<code>Home</code>通过<code>App</code>传递的回调函数，改变isRequesting，<code>App</code>重新render，由于同样的原因，<code>Home</code>也会重新render。<code>React.PureComponent</code>的功效也浪费了。</li>
<li>与Mobx结合使用，<code>App</code>和<code>Home</code>组件通过<code>@observer</code>修饰，<code>App</code>监听到isRequesting改变重新render，由于同样的原因，<code>Home</code>组件也会重新render。</li>
</ol>
<p>一个<code>Route</code>的问题，竟然导致所有的状态管理库的优化工作都大打折扣！痛心！</p>
<p>我已经在github上向React Router官方提了这个<a href="https://github.com/ReactTraining/react-router/issues/5738" rel="nofollow noreferrer" target="_blank">issue</a>，希望能在<code>componentWillReceiveProps</code>中先做一些简单的判断，再决定是否要重新<code>setState</code>。但令人失望的是，这个issue很快就被一个Collaborator给close掉了。</p>
<p>好吧，求人不如求己，自己找解决方案。</p>
<p>几个思路：</p>
<ol>
<li>既然<code>Loading</code>放在和<code>Route</code>同一层级的组件中会有这个问题，那么就把<code>Loading</code>放到更低层级的组件内，<code>Home</code>、<code>Login</code>中，大不了多引几次<code>Loading</code>组件。但这个方法治标不治本，<code>Home</code>组件内依然可能会定义其他<code>Route</code>，<code>Home</code>依赖状态的更新，同样又会导致这些<code>Route</code>内组件的重新渲染。也就是说，只要在container components中使用了<code>Route</code>，这个问题就绕不开。但在React Router 4 <code>Route</code>的分布式使用方式下，container components中是不可能完全避免使用<code>Route</code>的。</li>
<li>重写container components的<code>shouldComponentUpdate</code>方法，方法可行，但每个组件重写一遍，心累。</li>
<li>
<p>接着2的思路，通过创建一个高阶组件，在高阶组件内重写<code>shouldComponentUpdate</code>，如果<code>Route</code>传递的location属性没有发生变化（表示处于同一页面），那么就返回false。然后使用这个高阶组件包裹每一个要在<code>Route</code>中使用的组件。</p>
<p>新建一个高阶组件<code>connectRoute</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &quot;react&quot;;

export default function connectRoute(WrappedComponent) {
  return class extends React.Component {
    shouldComponentUpdate(nextProps) {
      return nextProps.location !== this.props.location;
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-string">"react"</span>;

export <span class="hljs-keyword">default</span> function connectRoute(<span class="hljs-type">WrappedComponent</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    shouldComponentUpdate(nextProps) {
      <span class="hljs-keyword">return</span> nextProps.location !== <span class="hljs-keyword">this</span>.props.location;
    }

    render() {
      <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">WrappedComponent</span> {...<span class="hljs-keyword">this</span>.props} /&gt;;
    }
  };
}
</code></pre>
<p>用<code>connectRoute</code>包裹<code>Home</code>、<code>Login</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const HomeWrapper = connectRoute(Home);
const LoginWrapper = connectRoute(Login);

class App extends Component {
  render() {
    const { isRequesting } = this.props;
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path=&quot;/&quot; component={HomeWrapper} />
            <Route path=&quot;/login&quot; component={LoginWrapper} />
            <Route path=&quot;/home&quot; component={HomeWrapper} />
          </Switch>
        </Router>
        {isRequesting  &amp;&amp; <Loading />}
      </div>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>const <span class="hljs-type">HomeWrapper</span> = connectRoute(<span class="hljs-type">Home</span>);
const <span class="hljs-type">LoginWrapper</span> = connectRoute(<span class="hljs-type">Login</span>);

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    const { isRequesting } = <span class="hljs-keyword">this</span>.props;
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;<span class="hljs-type">Router</span>&gt;
          &lt;<span class="hljs-type">Switch</span>&gt;
            &lt;<span class="hljs-type">Route</span> exact path=<span class="hljs-string">"/"</span> component={<span class="hljs-type">HomeWrapper</span>} /&gt;
            &lt;<span class="hljs-type">Route</span> path=<span class="hljs-string">"/login"</span> component={<span class="hljs-type">LoginWrapper</span>} /&gt;
            &lt;<span class="hljs-type">Route</span> path=<span class="hljs-string">"/home"</span> component={<span class="hljs-type">HomeWrapper</span>} /&gt;
          &lt;/<span class="hljs-type">Switch</span>&gt;
        &lt;/<span class="hljs-type">Router</span>&gt;
        {isRequesting  &amp;&amp; &lt;<span class="hljs-type">Loading</span> /&gt;}
      &lt;/div&gt;
    );
  }
}</code></pre>
</li>
</ol>
<p>这样就一劳永逸的解决问题了。</p>
<p>我们再来思考一种场景，如果<code>App</code>使用的状态同样会影响到<code>Route</code>的属性，比如<code>isRequesting</code>为true时，第三个<code>Route</code>的path也会改变，假设变成<code>&lt;Route path="/home/fetching" component={HomeWrapper} /&gt;</code>，而<code>Home</code>内部会用到<code>Route</code>传递的path（实际上是通过<code>match.path</code>获取）, 这时候就需要<code>Home</code>组件重新render。 但因为高阶组件的<code>shouldComponentUpdate</code>中我们只是根据location做判断，此时的location依然没有发生变化，导致<code>Home</code>并不会重新渲染。这是一种很特殊的场景，但是想通过这种场景告诉大家，高阶组件<code>shouldComponentUpdate</code>的判断条件需要根据实际业务场景做决策。绝大部分场景下，上面的高阶组件是足够使用。</p>
<p><code>Route</code>的使用姿势并不简单，且行且珍惜吧！</p>
<hr>
<p><strong>欢迎关注我的公众号：老干部的大前端，领取21本大前端精选书籍！</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV4lGT?w=540&amp;h=193" src="https://static.alili.tech/img/bV4lGT?w=540&amp;h=193" alt="3808299627-5a93ba468b59a" title="3808299627-5a93ba468b59a" style="cursor: pointer; display: inline;"></span></p>
<p>​</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
由React Router引起的组件重复渲染谈Route的使用姿势

## 原文链接
[https://segmentfault.com/a/1190000012078328](https://segmentfault.com/a/1190000012078328)

