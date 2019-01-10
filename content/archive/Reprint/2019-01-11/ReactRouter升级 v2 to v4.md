---
title: 'ReactRouter升级 v2 to v4' 
date: 2019-01-11 2:30:08
hidden: true
slug: 7t66asewtio
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">概述</h2>
<p><em>react-router V4 </em>相对于<em>react-router V2 or V3</em> 几乎是重写了, 新版的react-router更偏向于组件化(everything is component)。</p>
<p><code>V4</code>汲取了很多思想，路由即是组件，使路由更具声明式，且方便组合。如果你习惯使用<code>react</code>，那么一定会很快上手新版的<code>react-router</code>。</p>
<p><em>react-router V4</em> 被一分为三: <code>react-router-dom</code>(for web)、<code>react-router-native</code>(for native)、<code>react-router</code>(core)。但如果仅在浏览器中使用的话，一般只需要用到<code>react-router-dom</code>就可以了。</p>
<h2 id="articleHeader1">改动点</h2>
<h3 id="articleHeader2">1. Router/Route 的改变</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// V2 or V3
import { Router, Route, hashHistory } from 'react-router';

<Router history={hashHistory}>
  <Route path='/foo' component={Foo} />
  <Route path='/bar' component={Bar} />
</Router>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// V2 or V3</span>
<span class="hljs-keyword">import</span> { Router, Route, hashHistory } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>;

&lt;Router history={hashHistory}&gt;
  &lt;Route path='/foo' component={Foo} /&gt;
  &lt;Route path='/bar' component={Bar} /&gt;
&lt;/Router&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// V4 Router组件里只能渲染一个组件
import {
    HashRouter as Router,
    Route
} from 'react-router-dom';

<Router>
  <div>
    <Route path='/foo' component={Foo} />
    <Route path='/bar' component={Bar} />
  </div>
</Router>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// V4 Router组件里只能渲染一个组件</span>
<span class="hljs-keyword">import</span> {
    HashRouter <span class="hljs-keyword">as</span> Router,
    Route
} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>;

&lt;Router&gt;
  &lt;div&gt;
    &lt;Route path='/foo' component={Foo} /&gt;
    &lt;Route path='/bar' component={Bar} /&gt;
  &lt;/div&gt;
&lt;/Router&gt;</code></pre>
<h3 id="articleHeader3">2. 组件嵌套</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// V2 or V3 路由组件嵌套
import { Router, Route, hashHistory } from 'react-router';

<Router history={hashHistory}>
  <Route path='/' component={App}>
    <Route path='foo' component={Foo} />
    <Route path='bar' component={Bar} />
  </Route>
</Router>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// V2 or V3 路由组件嵌套</span>
<span class="hljs-keyword">import</span> { Router, Route, hashHistory } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>;

&lt;Router history={hashHistory}&gt;
  &lt;Route path='/' component={App}&gt;
    &lt;Route path='foo' component={Foo} /&gt;
    &lt;Route path='bar' component={Bar} /&gt;
  &lt;/Route&gt;
&lt;/Router&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// V4 Router 的路由组件嵌套
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

<Router>
 <Route path=&quot;/&quot; component={(props) => (
    <App {...props}>
      <Switch>
        <Route path='/foo' component={Foo} />
        <Route path='/bar' component={Bar} />
      </Switch>
    </App>
  )}/>
</Router>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// V4 Router 的路由组件嵌套</span>
<span class="hljs-keyword">import</span> {
    HashRouter <span class="hljs-keyword">as</span> Router,
    Route,
    Switch
} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>;

&lt;Router&gt;
 &lt;Route path="/" component={(props) =&gt; (
    &lt;App {...props}&gt;
      &lt;Switch&gt;
        &lt;Route path='/foo' component={Foo} /&gt;
        &lt;Route path='/bar' component={Bar} /&gt;
      &lt;/Switch&gt;
    &lt;/App&gt;
  )}/&gt;
&lt;/Router&gt;</code></pre>
<h3 id="articleHeader4">3. 路由的生命周期</h3>
<p>在<code>react-router V4</code>中去掉了<code>on****</code>的路由生命周期的钩子，但是你可以在组件中用<code>componentDidMount</code> 或 <code>componentWillMount</code> 代替 <code>onEnter</code>，可以用<code>componentWillUpdate</code> 或 <code>componentWillReceiveProps</code>代替 <code>onUpdate</code>，你可以用<code>componentWillUnmount</code> 代替 <code>onLeave</code>。</p>
<h3 id="articleHeader5">4. Link</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// V2 or V3
import { Link } from 'react-router';

// V4
import { Link } from 'react-router-dom';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// V2 or V3</span>
<span class="hljs-keyword">import</span> { Link } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>;

<span class="hljs-comment">// V4</span>
<span class="hljs-keyword">import</span> { Link } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>;</code></pre>
<h3 id="articleHeader6">5. history.push and history.replace</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// V2 or V3
history.push({
    pathname: '/home',
    query: {
        foo: 'test',
bar: 'temp'
    }
});
history.replace({
    pathname: '/home',
    query: {
        foo: 'test',
bar: 'temp'
    }
});

// V4
history.push({
    pathname: '/home',
    search: '?foo=test&amp;bar=temp',
});
history.replace({
    pathname: '/home',
    search: '?foo=test&amp;bar=temp',
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// V2 or V3</span>
history.push({
    <span class="hljs-attr">pathname</span>: <span class="hljs-string">'/home'</span>,
    <span class="hljs-attr">query</span>: {
        <span class="hljs-attr">foo</span>: <span class="hljs-string">'test'</span>,
<span class="hljs-attr">bar</span>: <span class="hljs-string">'temp'</span>
    }
});
history.replace({
    <span class="hljs-attr">pathname</span>: <span class="hljs-string">'/home'</span>,
    <span class="hljs-attr">query</span>: {
        <span class="hljs-attr">foo</span>: <span class="hljs-string">'test'</span>,
<span class="hljs-attr">bar</span>: <span class="hljs-string">'temp'</span>
    }
});

<span class="hljs-comment">// V4</span>
history.push({
    <span class="hljs-attr">pathname</span>: <span class="hljs-string">'/home'</span>,
    <span class="hljs-attr">search</span>: <span class="hljs-string">'?foo=test&amp;bar=temp'</span>,
});
history.replace({
    <span class="hljs-attr">pathname</span>: <span class="hljs-string">'/home'</span>,
    <span class="hljs-attr">search</span>: <span class="hljs-string">'?foo=test&amp;bar=temp'</span>,
});</code></pre>
<h3 id="articleHeader7">6. props.params</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// V2 or V3 获取params可以这么获取
this.props.params

// V4
this.props.match.params" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// V2 or V3 获取params可以这么获取</span>
<span class="hljs-keyword">this</span>.props.params

<span class="hljs-comment">// V4</span>
<span class="hljs-keyword">this</span>.props.match.params</code></pre>
<h3 id="articleHeader8">7. location.query</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// V2 or V3 获取query可以这么获取
this.props.location.query

// V4 去掉了location.query，只能使用search来获取，为了让其跟浏览器一样
// 如果想要兼容以前的location.query，可以使用query-string库解析一下
// 如: queryString.parse(props.location.search)
this.props.location.search" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// V2 or V3 获取query可以这么获取</span>
<span class="hljs-keyword">this</span>.props.location.query

<span class="hljs-comment">// V4 去掉了location.query，只能使用search来获取，为了让其跟浏览器一样</span>
<span class="hljs-comment">// 如果想要兼容以前的location.query，可以使用query-string库解析一下</span>
<span class="hljs-comment">// 如: queryString.parse(props.location.search)</span>
<span class="hljs-keyword">this</span>.props.location.search</code></pre>
<h3 id="articleHeader9">8. location.action</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// V2 or V3 获取location的action
this.props.location.action

// V4 去掉了location.action, 放在了history里面
history.action" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// V2 or V3 获取location的action</span>
<span class="hljs-keyword">this</span>.props.location.action

<span class="hljs-comment">// V4 去掉了location.action, 放在了history里面</span>
history.action</code></pre>
<h3 id="articleHeader10">9.关于history</h3>
<p>以前获取react-router里面的history库，可以这么获取:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {hashHistory as history} from 'react-router';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> {hashHistory <span class="hljs-keyword">as</span> history} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>;</code></pre>
<p>react-router V4:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import createHashHistory as history from 'history/createHashHistory';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> createHashHistory <span class="hljs-keyword">as</span> history <span class="hljs-keyword">from</span> <span class="hljs-string">'history/createHashHistory'</span>;</code></pre>
<h2 id="articleHeader11">兼容处理</h2>
<p>因为要从<code>react-router V2</code>完全迁移到<code>react-router V4</code>工作量还是挺大的，一下子难以完全迁移，所以对某些地方做了兼容处理。</p>
<h3 id="articleHeader12">history</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import _ from 'lodash';
import queryString from 'query-string';

function processHistory(history) {
    const _push = history.push;
    const _replace = history.replace;

    history.push = function (one) {
        if (!_.isPlainObject(one)) {
            return _push.apply(this, arguments);
        }
        const o = Object.assign({}, one);
        if (o.query) {
            o.search = queryString.stringify(o.query);
        }
        _push.apply(this, [o]);
    };

    history.replace = function (one) {
        if (!_.isPlainObject(one)) {
            return _replace.apply(this, arguments);
        }
        const o = Object.assign({}, one);
        if (o.query) {
            o.search = queryString.stringify(o.query);
        }
        _replace.apply(this, [o]);
    };

    return history;
}

export default processHistory;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>;
<span class="hljs-keyword">import</span> queryString <span class="hljs-keyword">from</span> <span class="hljs-string">'query-string'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">processHistory</span>(<span class="hljs-params">history</span>) </span>{
    <span class="hljs-keyword">const</span> _push = history.push;
    <span class="hljs-keyword">const</span> _replace = history.replace;

    history.push = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">one</span>) </span>{
        <span class="hljs-keyword">if</span> (!_.isPlainObject(one)) {
            <span class="hljs-keyword">return</span> _push.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
        }
        <span class="hljs-keyword">const</span> o = <span class="hljs-built_in">Object</span>.assign({}, one);
        <span class="hljs-keyword">if</span> (o.query) {
            o.search = queryString.stringify(o.query);
        }
        _push.apply(<span class="hljs-keyword">this</span>, [o]);
    };

    history.replace = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">one</span>) </span>{
        <span class="hljs-keyword">if</span> (!_.isPlainObject(one)) {
            <span class="hljs-keyword">return</span> _replace.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
        }
        <span class="hljs-keyword">const</span> o = <span class="hljs-built_in">Object</span>.assign({}, one);
        <span class="hljs-keyword">if</span> (o.query) {
            o.search = queryString.stringify(o.query);
        }
        _replace.apply(<span class="hljs-keyword">this</span>, [o]);
    };

    <span class="hljs-keyword">return</span> history;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> processHistory;</code></pre>
<h3 id="articleHeader13">props</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import queryString from 'query-string';

const processReactRouterProps = (props) => {
    const newProps = Object.assign({}, props);
    newProps.location.query = queryString.parse(props.location.search);
    newProps.location.action = newProps.history.action;
    newProps.params = props.match.params || {}; // 不止 || 是否有意义
    return newProps;
}
export default processReactRouterProps; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> queryString <span class="hljs-keyword">from</span> <span class="hljs-string">'query-string'</span>;

<span class="hljs-keyword">const</span> processReactRouterProps = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> newProps = <span class="hljs-built_in">Object</span>.assign({}, props);
    newProps.location.query = queryString.parse(props.location.search);
    newProps.location.action = newProps.history.action;
    newProps.params = props.match.params || {}; <span class="hljs-comment">// 不止 || 是否有意义</span>
    <span class="hljs-keyword">return</span> newProps;
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> processReactRouterProps; </code></pre>
<p>参考资料:</p>
<p><a href="https://github.com/gmfe/blog/issues/6" rel="nofollow noreferrer" target="_blank">react-router2 迁移到 react-router4 关注点</a><br><a href="https://reacttraining.com/" rel="nofollow noreferrer" target="_blank">react-router 官方文档</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ReactRouter升级 v2 to v4

## 原文链接
[https://segmentfault.com/a/1190000009876077](https://segmentfault.com/a/1190000009876077)

