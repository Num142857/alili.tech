---
title: 'React16.2的fiber架构详解(3)' 
date: 2018-12-10 2:30:07
hidden: true
slug: 3b71seoyvw
categories: [reprint]
---

{{< raw >}}

                    
<p>React16是否能异步渲染，在于内部一个变量。在开始之前，我们需要准备一个例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;utf-8&quot;>
    <title>by 司徒正美</title>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width&quot;>
    <!-- <script type='text/javascript' src=&quot;./src/React2.js&quot;></script>-->
    <script type='text/javascript' src=&quot;./test/react.js&quot;></script>
    <script type='text/javascript' src=&quot;./test/react-dom.js&quot;></script>
    <script src=&quot;test/babel.js&quot;></script>
</head>

<body>
    <div id=&quot;test&quot;></div>
    <div id=&quot;content&quot;></div>
</body>
<script type=&quot;text/babel&quot;>
    var container = document.getElementById(&quot;test&quot;);
    class Root extends React.Component{
        constructor(props){
            super(props)
            this.props = props
        }
        render(){
            console.log(&quot;Root render..&quot;, Date.now())
            return <div><A /></div>
        }
    }
    class A extends React.Component{
        constructor(props){
            super(props)
            this.props = props
        }
        render(){
            console.log(&quot;A render..&quot;, Date.now())
            return <div>{1111}</div>
        }
    }
    ReactDOM.render(<Root />, container, function(){
        console.log(&quot;callback&quot;,Date.now())
    })
   console.log(&quot;end&quot;, Date.now())
</script>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>by 司徒正美<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- &lt;script type='text/javascript' src="./src/React2.js"&gt;&lt;/script&gt;--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'text/javascript'</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./test/react.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'text/javascript'</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./test/react-dom.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"test/babel.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"test"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"content"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/babel"</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> container = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"test"</span>);
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Root</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
        <span class="hljs-keyword">constructor</span>(props){
            <span class="hljs-keyword">super</span>(props)
            <span class="hljs-keyword">this</span>.props = props
        }
        render(){
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Root render.."</span>, <span class="hljs-built_in">Date</span>.now())
            <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">A</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        }
    }
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">A</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
        <span class="hljs-keyword">constructor</span>(props){
            <span class="hljs-keyword">super</span>(props)
            <span class="hljs-keyword">this</span>.props = props
        }
        render(){
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"A render.."</span>, <span class="hljs-built_in">Date</span>.now())
            <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{1111}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        }
    }
    ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Root</span> /&gt;</span>, container, function(){
        console.log("callback",Date.now())
    })
   console.log("end", Date.now())
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>当中的react.js与react-dom.js是React16.4beta,大家可以在bootcdn上下载。</p>
<p>前文已经提过，<code>ReactDOM.render/hydrate/unstable_renderSubtreeIntoContainer/unmountComponentAtNode</code>都是legacyRenderSubtreeIntoContainer方法的加壳方法。</p>
<p><span class="img-wrap"><img data-src="/img/bV5LaW?w=1306&amp;h=1006" src="https://static.alili.tech/img/bV5LaW?w=1306&amp;h=1006" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>legacyRenderSubtreeIntoContainer里面调用legacyCreateRootFromDOMContainer创建一个ReactRoot对象，然后再调用其render或legacy_renderSubtreeIntoContainer方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//by 司徒正美
function legacyCreateRootFromDOMContainer(container, forceHydrate) {
  var shouldHydrate = forceHydrate || shouldHydrateDueToLegacyHeuristic(container);
  // First clear any existing content.
  if (!shouldHydrate) {
    var warned = false;
    var rootSibling = void 0;
    while (rootSibling = container.lastChild) {
      {
        if (!warned &amp;&amp; rootSibling.nodeType === ELEMENT_NODE &amp;&amp; rootSibling.hasAttribute(ROOT_ATTRIBUTE_NAME)) {
          warned = true;
          warning_1(false, 'render(): Target node has markup rendered by React, but there ' + 'are unrelated nodes as well. This is most commonly caused by ' + 'white-space inserted around server-rendered markup.');
        }
      }
      container.removeChild(rootSibling);
    }
  }
  {
    if (shouldHydrate &amp;&amp; !forceHydrate &amp;&amp; !warnedAboutHydrateAPI) {
      warnedAboutHydrateAPI = true;
      lowPriorityWarning$1(false, 'render(): Calling ReactDOM.render() to hydrate server-rendered markup ' + 'will stop working in React v17. Replace the ReactDOM.render() call ' + 'with ReactDOM.hydrate() if you want React to attach to the server HTML.');
    }
  }
  // Legacy roots are not async by default.
  var isAsync = false;
  console.log(&quot;new ReactRoot&quot;,container, isAsync, shouldHydrate)
  return new ReactRoot(container, isAsync, shouldHydrate);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//by 司徒正美</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">legacyCreateRootFromDOMContainer</span>(<span class="hljs-params">container, forceHydrate</span>) </span>{
  <span class="hljs-keyword">var</span> shouldHydrate = forceHydrate || shouldHydrateDueToLegacyHeuristic(container);
  <span class="hljs-comment">// First clear any existing content.</span>
  <span class="hljs-keyword">if</span> (!shouldHydrate) {
    <span class="hljs-keyword">var</span> warned = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">var</span> rootSibling = <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>;
    <span class="hljs-keyword">while</span> (rootSibling = container.lastChild) {
      {
        <span class="hljs-keyword">if</span> (!warned &amp;&amp; rootSibling.nodeType === ELEMENT_NODE &amp;&amp; rootSibling.hasAttribute(ROOT_ATTRIBUTE_NAME)) {
          warned = <span class="hljs-literal">true</span>;
          warning_1(<span class="hljs-literal">false</span>, <span class="hljs-string">'render(): Target node has markup rendered by React, but there '</span> + <span class="hljs-string">'are unrelated nodes as well. This is most commonly caused by '</span> + <span class="hljs-string">'white-space inserted around server-rendered markup.'</span>);
        }
      }
      container.removeChild(rootSibling);
    }
  }
  {
    <span class="hljs-keyword">if</span> (shouldHydrate &amp;&amp; !forceHydrate &amp;&amp; !warnedAboutHydrateAPI) {
      warnedAboutHydrateAPI = <span class="hljs-literal">true</span>;
      lowPriorityWarning$<span class="hljs-number">1</span>(<span class="hljs-literal">false</span>, <span class="hljs-string">'render(): Calling ReactDOM.render() to hydrate server-rendered markup '</span> + <span class="hljs-string">'will stop working in React v17. Replace the ReactDOM.render() call '</span> + <span class="hljs-string">'with ReactDOM.hydrate() if you want React to attach to the server HTML.'</span>);
    }
  }
  <span class="hljs-comment">// Legacy roots are not async by default.</span>
  <span class="hljs-keyword">var</span> isAsync = <span class="hljs-literal">false</span>;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"new ReactRoot"</span>,container, isAsync, shouldHydrate)
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> ReactRoot(container, isAsync, shouldHydrate);
}</code></pre>
<p>留意里面的isAsync，是写死的，强制使用同步，我们可以改一改，就能使用异步</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var isAsync = true;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> isAsync = <span class="hljs-literal">true</span>;</code></pre>
<blockquote>本节的内容就准备读如何<strong>异步渲染</strong>。</blockquote>
<p>ReactRoot之前已经说过，再贴一下源码。</p>
<p>￼<span class="img-wrap"><img data-src="/img/bV5KbH?w=1030&amp;h=850" src="https://static.alili.tech/img/bV5KbH?w=1030&amp;h=850" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>从DOMRenderer.updateContainer到达updateContainerAtExpirationTime到达scheduleWork到达scheduleWork到达sch￼eduleWorkImpl到达requestWork，我们一路加点注释</p>
<p>下面是scheduleWorkImpl的代码：</p>
<p><span class="img-wrap"><img data-src="/img/bV5Kba?w=1396&amp;h=1080" src="https://static.alili.tech/img/bV5Kba?w=1396&amp;h=1080" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>requestWork里面才进行同步异步逻辑分家</p>
<p><span class="img-wrap"><img data-src="/img/bV5Kaf?w=1150&amp;h=1138" src="https://static.alili.tech/img/bV5Kaf?w=1150&amp;h=1138" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>scheduleCallbackWithExpiration是干了什么呢？它会判定是否工作与不干作，工作就是重新计算过期时间，然后执行scheduleDeferredCallback方法。scheduleDeferredCallback有两个参数，第一个是回调函数，第二个是对象，里面的timeout决定它在执行scheduleDeferredCallback最迟多少ms才执行。</p>
<p>scheduleDeferredCallback是何方神圣呢？它是大名鼎鼎的requestIdleCallback</p>
<p><span class="img-wrap"><img data-src="/img/bV5Ken?w=682&amp;h=176" src="https://static.alili.tech/img/bV5Ken?w=682&amp;h=176" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV5Keu?w=1356&amp;h=832" src="https://static.alili.tech/img/bV5Keu?w=1356&amp;h=832" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>requestIdleCallback的语法如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV5KfB?w=1352&amp;h=1024" src="https://static.alili.tech/img/bV5KfB?w=1352&amp;h=1024" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>performAsyncWork与performSyncWork也是一对兄弟。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//by 司徒正美

  function performAsyncWork(dl) {
    performWork(NoWork, true, dl);
  }

  function performSyncWork() {
    performWork(Sync, false, null);
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//by 司徒正美</span>

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">performAsyncWork</span>(<span class="hljs-params">dl</span>) </span>{
    performWork(NoWork, <span class="hljs-literal">true</span>, dl);
  }

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">performSyncWork</span>(<span class="hljs-params"></span>) </span>{
    performWork(Sync, <span class="hljs-literal">false</span>, <span class="hljs-literal">null</span>);
  }
</code></pre>
<p>performWork的源码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function performWork(minExpirationTime, isAsync, dl) {
    deadline = dl;
    // Keep working on roots until there's no more work, or until the we reach
    // the deadline.
    findHighestPriorityRoot();
    if (enableUserTimingAPI &amp;&amp; deadline !== null) {
      var didExpire = nextFlushedExpirationTime < recalculateCurrentTime();
      stopRequestCallbackTimer(didExpire);
    }
    if (isAsync) {
      while (nextFlushedRoot !== null &amp;&amp; nextFlushedExpirationTime !== NoWork &amp;&amp; 
        (minExpirationTime === NoWork ||
         minExpirationTime >= nextFlushedExpirationTime) &amp;&amp; (!deadlineDidExpire || recalculateCurrentTime() >= nextFlushedExpirationTime)) {
        performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, !deadlineDidExpire);
        findHighestPriorityRoot();
      }
    } else {
      while (nextFlushedRoot !== null &amp;&amp; nextFlushedExpirationTime !== NoWork &amp;&amp; 
        (minExpirationTime === NoWork || minExpirationTime >= nextFlushedExpirationTime)) {
        performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, false);
        findHighestPriorityRoot();
      }
    }
    // We're done flushing work. Either we ran out of time in this callback,
    // or there's no more work left with sufficient priority.
    // If we're inside a callback, set this to false since we just completed it.
    if (deadline !== null) {
      callbackExpirationTime = NoWork;
      callbackID = -1;
    }
    // If there's work left over, schedule a new callback.
    if (nextFlushedExpirationTime !== NoWork) {
      scheduleCallbackWithExpiration(nextFlushedExpirationTime);
    }
    // Clean-up.
    deadline = null;
    deadlineDidExpire = false;

    finishRendering();
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">performWork</span>(<span class="hljs-params">minExpirationTime, isAsync, dl</span>) </span>{
    deadline = dl;
    <span class="hljs-comment">// Keep working on roots until there's no more work, or until the we reach</span>
    <span class="hljs-comment">// the deadline.</span>
    findHighestPriorityRoot();
    <span class="hljs-keyword">if</span> (enableUserTimingAPI &amp;&amp; deadline !== <span class="hljs-literal">null</span>) {
      <span class="hljs-keyword">var</span> didExpire = nextFlushedExpirationTime &lt; recalculateCurrentTime();
      stopRequestCallbackTimer(didExpire);
    }
    <span class="hljs-keyword">if</span> (isAsync) {
      <span class="hljs-keyword">while</span> (nextFlushedRoot !== <span class="hljs-literal">null</span> &amp;&amp; nextFlushedExpirationTime !== NoWork &amp;&amp; 
        (minExpirationTime === NoWork ||
         minExpirationTime &gt;= nextFlushedExpirationTime) &amp;&amp; (!deadlineDidExpire || recalculateCurrentTime() &gt;= nextFlushedExpirationTime)) {
        performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, !deadlineDidExpire);
        findHighestPriorityRoot();
      }
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">while</span> (nextFlushedRoot !== <span class="hljs-literal">null</span> &amp;&amp; nextFlushedExpirationTime !== NoWork &amp;&amp; 
        (minExpirationTime === NoWork || minExpirationTime &gt;= nextFlushedExpirationTime)) {
        performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, <span class="hljs-literal">false</span>);
        findHighestPriorityRoot();
      }
    }
    <span class="hljs-comment">// We're done flushing work. Either we ran out of time in this callback,</span>
    <span class="hljs-comment">// or there's no more work left with sufficient priority.</span>
    <span class="hljs-comment">// If we're inside a callback, set this to false since we just completed it.</span>
    <span class="hljs-keyword">if</span> (deadline !== <span class="hljs-literal">null</span>) {
      callbackExpirationTime = NoWork;
      callbackID = <span class="hljs-number">-1</span>;
    }
    <span class="hljs-comment">// If there's work left over, schedule a new callback.</span>
    <span class="hljs-keyword">if</span> (nextFlushedExpirationTime !== NoWork) {
      scheduleCallbackWithExpiration(nextFlushedExpirationTime);
    }
    <span class="hljs-comment">// Clean-up.</span>
    deadline = <span class="hljs-literal">null</span>;
    deadlineDidExpire = <span class="hljs-literal">false</span>;

    finishRendering();
  }</code></pre>
<p>下面是同步与异步的执行情况 </p>
<p><span class="img-wrap"><img data-src="/img/bV5KQZ?w=864&amp;h=550" src="https://static.alili.tech/img/bV5KQZ?w=864&amp;h=550" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV5KR7?w=902&amp;h=754" src="https://static.alili.tech/img/bV5KR7?w=902&amp;h=754" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>但异步模式为什么会调用两次render呢？估计这还在测试阶段，许多BUG。我们追踪到finishClassComponent方法，看到它的render方法：</p>
<p><span class="img-wrap"><img data-src="/img/bV5K2w?w=1164&amp;h=496" src="https://static.alili.tech/img/bV5K2w?w=1164&amp;h=496" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>我们再改一下Root组件的代码，添加一个componentDidMount.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Root extends React.Component{
        constructor(props){
            super(props)
            this.props = props
            this.state = {
                x: 1
            }
        }
        render(){
            console.log(&quot;Root render..&quot;, Date.now())
            return <h1><A x={this.state.x} /></h1>
        }
        componentDidMount(){
            console.log(&quot;Root componentDidMount&quot;)
            this.setState({
                x: 2
            })
        }
    }
     class A extends React.Component{
        constructor(props){
            super(props)
            this.props = props
            this.state = {
                text: props.x
            }
        }
        componentWillReceiveProps(p){
            this.setState({
               text: p.x
            })
        }
        render(){
            console.log(&quot;A render..&quot;, Date.now())
            return <h2>{this.state.text}</h2>
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Root</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
        <span class="hljs-keyword">constructor</span>(props){
            <span class="hljs-keyword">super</span>(props)
            <span class="hljs-keyword">this</span>.props = props
            <span class="hljs-keyword">this</span>.state = {
                <span class="hljs-attr">x</span>: <span class="hljs-number">1</span>
            }
        }
        render(){
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Root render.."</span>, <span class="hljs-built_in">Date</span>.now())
            <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">A</span> <span class="hljs-attr">x</span>=<span class="hljs-string">{this.state.x}</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        }
        componentDidMount(){
            console.log("Root componentDidMount")
            this.setState({
                x: 2
            })
        }
    }
     class A extends React.Component{
        constructor(props){
            super(props)
            this.props = props
            this.state = {
                text: props.x
            }
        }
        componentWillReceiveProps(p){
            this.setState({
               text: p.x
            })
        }
        render(){
            console.log("A render..", Date.now())
            return <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{this.state.text}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        }
    }</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV5Li5?w=854&amp;h=486" src="https://static.alili.tech/img/bV5Li5?w=854&amp;h=486" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>我们再看一下fiber树。fiber有许多种类型，但主要是四种， ClassFiber, FunctionFiber, HostComponentFiber, HostTextFiber，分别对应原来的类组件，无状态组件，元素虚拟节点，文本虚拟节点。Fiber表面上比React15的虚拟DOM多了一些属性，如parent, child, sibling。换言之，fiber可以像真实DOM一样上下右遍历（没有左）。</p>
<p><span class="img-wrap"><img data-src="/img/bV5LAG?w=1486&amp;h=856" src="https://static.alili.tech/img/bV5LAG?w=1486&amp;h=856" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>React16的源码里面有两个方法<strong>beginWork</strong>与<strong>finishWork</strong>重要方法。beginWork，就是从一个Fiber开始，初始化它的state（如果fiber.type为函数，则new 实例或一个类似类似的东西，如果type为标签名，则创建元素节点或文本节点），并遍历它的第一重孩子，让孩子们加上parent,sibling（注意这时孩子没有stateNode）。最后返回第一个孩子，作为刚才fiber的child。 然后对这个child再执行beginWork操作。</p>
<p>beginWork的过程中，确到组件，需要用到context,context是来自contextStack。这是一个全局对象。在顶层，默认会push一个空对象。然后到达某个组件时，peek一下（不使用pop方法）。 如果这个组件有getChildContext方法呢，这时就会产生一个新context, push进去。</p>
<p>有些fiber是没有孩子的，比如说文本节点，或一些元素节点，这样它开始 finishWork操作，找它的sibling,对sibling进行beginWork操作，没有sibling就往上找，这时就会再次访问到某个组件，如果这个组件有getChildContext，于是就pop一下。</p>
<p>finishWork还有一个重要任务，就是收集DOM操作指令，一开始所有fiber的effects都PLACEMENT，叫做置换，其实相当于append。每次往上找时，父fiber就把它所有孩子的effect收集一下，最后到顶层Root组件时， contextStack为空，而effects则装得满满的，然后交给commintAllWork执行这些指令。</p>
<blockquote>fiber架构是很好地解决context的往下传送问题。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React16.2的fiber架构详解(3)

## 原文链接
[https://segmentfault.com/a/1190000013722981](https://segmentfault.com/a/1190000013722981)

