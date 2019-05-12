---
title: 'React-router 4 按需加载的实现方式及原理(Code Splitting)' 
date: 2019-01-14 2:30:07
hidden: true
slug: qlqfbahle1n
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">React-router 4</h2>
<h6>介绍了在router4以后，如何去实现按需加载Component，在router4以前，我们是使用getComponent的的方式来实现按需加载的，router4中，getComponent方法已经被移除，下面就介绍一下react-router4是入围和来实现按需加载的。</h6>
<h3 id="articleHeader1">1.router3的按需加载方式</h3>
<h6>route3中实现按需加载只需要按照下面代码的方式实现就可以了。</h6>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const about = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/about').default)
    },'about')
}

//配置route
<Route path=&quot;helpCenter&quot; getComponent={about} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> about = <span class="hljs-function">(<span class="hljs-params">location, cb</span>) =&gt;</span> {
    <span class="hljs-built_in">require</span>.ensure([], <span class="hljs-built_in">require</span> =&gt; {
        cb(<span class="hljs-literal">null</span>, <span class="hljs-built_in">require</span>(<span class="hljs-string">'../Component/about'</span>).default)
    },<span class="hljs-string">'about'</span>)
}

<span class="hljs-comment">//配置route</span>
&lt;Route path=<span class="hljs-string">"helpCenter"</span> getComponent={about} /&gt;</code></pre>
<h3 id="articleHeader2">2.router4按需加载方式（three steps）</h3>
<h4>one step:</h4>
<h6>创建Bundle.js文件,这个文件其实是个通过bundle-loader包装后的组件来使用，下面会具体讲这个东西。</h6>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import PropTypes from 'prop-types';

class Bundle extends React.Component {
  state = {
    // short for &quot;module&quot; but that's a keyword in js, so &quot;mod&quot;
    mod: null
  }

  componentWillMount() {
    // 加载初始状态
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props) {
    // 重置状态
    this.setState({
      mod: null
    });
    // 传入组件的组件
    props.load((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      });
    });
  }

  render() {
    // if state mode not undefined,The container will render children
    return this.state.mod ? this.props.children(this.state.mod) : null;
  }
}

Bundle.propTypes = {
  load: PropTypes.func,
  children: PropTypes.func
};

export default Bundle;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> PropTypes <span class="hljs-keyword">from</span> <span class="hljs-string">'prop-types'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Bundle</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  state = {
    <span class="hljs-comment">// short for "module" but that's a keyword in js, so "mod"</span>
    mod: <span class="hljs-literal">null</span>
  }

  componentWillMount() {
    <span class="hljs-comment">// 加载初始状态</span>
    <span class="hljs-keyword">this</span>.load(<span class="hljs-keyword">this</span>.props);
  }

  componentWillReceiveProps(nextProps) {
    <span class="hljs-keyword">if</span> (nextProps.load !== <span class="hljs-keyword">this</span>.props.load) {
      <span class="hljs-keyword">this</span>.load(nextProps);
    }
  }

  load(props) {
    <span class="hljs-comment">// 重置状态</span>
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">mod</span>: <span class="hljs-literal">null</span>
    });
    <span class="hljs-comment">// 传入组件的组件</span>
    props.load(<span class="hljs-function">(<span class="hljs-params">mod</span>) =&gt;</span> {
      <span class="hljs-keyword">this</span>.setState({
        <span class="hljs-comment">// handle both es imports and cjs</span>
        mod: mod.default ? mod.default : mod
      });
    });
  }

  render() {
    <span class="hljs-comment">// if state mode not undefined,The container will render children</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.state.mod ? <span class="hljs-keyword">this</span>.props.children(<span class="hljs-keyword">this</span>.state.mod) : <span class="hljs-literal">null</span>;
  }
}

Bundle.propTypes = {
  <span class="hljs-attr">load</span>: PropTypes.func,
  <span class="hljs-attr">children</span>: PropTypes.func
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Bundle;
</code></pre>
<h4>second step:</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import aContainer from 'bundle-loader?lazy!./containers/A'

const A = (props) => (
  <Bundle load={aContainer}>
      //这里只是给this.props.child传一个方法，最后在Bundle的render里面调用
    {(Container) => <Container {...props}/>}
  </Bundle>
)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> aContainer <span class="hljs-keyword">from</span> <span class="hljs-string">'bundle-loader?lazy!./containers/A'</span>

<span class="hljs-keyword">const</span> A = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Bundle</span> <span class="hljs-attr">load</span>=<span class="hljs-string">{aContainer}</span>&gt;</span>
      //这里只是给this.props.child传一个方法，最后在Bundle的render里面调用
    {(Container) =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">Container</span> {<span class="hljs-attr">...props</span>}/&gt;</span>}
  <span class="hljs-tag">&lt;/<span class="hljs-name">Bundle</span>&gt;</span>
)
</span></code></pre>
<h4>third step:</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <Route path=&quot;/about&quot; component={About}/>
        <Route path=&quot;/dashboard&quot; component={A}/>
      </div>
    )
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;h1&gt;Welcome!&lt;/h1&gt;
        &lt;Route path="/about" component={About}/&gt;
        &lt;Route path="/dashboard" component={A}/&gt;
      &lt;/div&gt;
    )
  }</code></pre>
<h3 id="articleHeader3">3.router4按需加载方方式解析</h3>
<h4>(1).首先解释一下按需加载，通俗的将就是我当前的location在Home,那么我只应该加载Home的东西，而不应该去加载About等等其他的。</h4>
<h4>(2).Bundle.js这个文件的作用</h4>
<p>先看这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function (cb) {
    __webpack_require__.e/* require.ensure */(2).then((function (require) {
        cb(__webpack_require__(305));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">cb</span>) </span>{
    __webpack_require__.e<span class="hljs-comment">/* require.ensure */</span>(<span class="hljs-number">2</span>).then((<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">require</span>) </span>{
        cb(__webpack_require__(<span class="hljs-number">305</span>));
    }).bind(<span class="hljs-literal">null</span>, __webpack_require__)).catch(__webpack_require__.oe);
};
</code></pre>
<p>这里是我们通过<code>import loadDashboard from 'bundle-loader?lazy!./containers/A'</code>这种方式引入的container控件。我们使用了bundle-loader将<a href="#">A的源码</a>转化成了上面的代码，具体实现大家可以看<a href="#bundle-loader">bundle-loader源码</a>，代码很少。</p>
<p>上面说到Bundle.js其实就使用来处理这个文件的，这个文件需要一个callback的参数，在Bundle的load方法中，我们会设置这个callback，当路由要调到A Container这里的时候，就回去加载A Container,然后调用这个callback，这个callback会调用setState方法，将我们之前传入的load设置给mod，然后渲染出来。</p>
<h3 id="articleHeader4">4.webpack进行bundle-loader统一配置</h3>
<p>这里匹配的是src/routers/下面的containers文件夹下面所有的js文件，包括二级目录。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  {
      // 匹配routers下面所有文件
      // ([^/]+)\/?([^/]*) 匹配xxx/xxx 或者 xxx
      test: /containers\/([^/]+)\/?([^/]*)\.jsx?$/,
      include: path.resolve(__dirname, 'src/routers/'),
      // loader: 'bundle-loader?lazy'
      loaders: ['bundle-loader?lazy', 'babel-loader']
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  {
      <span class="hljs-comment">// 匹配routers下面所有文件</span>
      <span class="hljs-comment">// ([^/]+)\/?([^/]*) 匹配xxx/xxx 或者 xxx</span>
      test: <span class="hljs-regexp">/containers\/([^/]+)\/?([^/]*)\.jsx?$/</span>,
      <span class="hljs-attr">include</span>: path.resolve(__dirname, <span class="hljs-string">'src/routers/'</span>),
      <span class="hljs-comment">// loader: 'bundle-loader?lazy'</span>
      loaders: [<span class="hljs-string">'bundle-loader?lazy'</span>, <span class="hljs-string">'babel-loader'</span>]
    }</code></pre>
<h3 id="articleHeader5">5.部分源码</h3>
<p><a></a></p>
<h4>1.bundle-loader的源码</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra
*/
var loaderUtils = require(&quot;loader-utils&quot;);

module.exports = function() {};
module.exports.pitch = function(remainingRequest) {
    this.cacheable &amp;&amp; this.cacheable();
    var query = loaderUtils.getOptions(this) || {};
    if(query.name) {
        var options = {
            context: query.context || this.options.context,
            regExp: query.regExp
        };
        var chunkName = loaderUtils.interpolateName(this, query.name, options);
        var chunkNameParam = &quot;, &quot; + JSON.stringify(chunkName);
    } else {
        var chunkNameParam = '';
    }
    var result;
    if(query.lazy) {
        result = [
            &quot;module.exports = function(cb) {\n&quot;,
            &quot;    require.ensure([], function(require) {\n&quot;,
            &quot;        cb(require(&quot;, loaderUtils.stringifyRequest(this, &quot;!!&quot; + remainingRequest), &quot;));\n&quot;,
            &quot;    }&quot; + chunkNameParam + &quot;);\n&quot;,
            &quot;}&quot;];
    } else {
        result = [
            &quot;var cbs = [], \n&quot;,
            &quot;    data;\n&quot;,
            &quot;module.exports = function(cb) {\n&quot;,
            &quot;    if(cbs) cbs.push(cb);\n&quot;,
            &quot;    else cb(data);\n&quot;,
            &quot;}\n&quot;,
            &quot;require.ensure([], function(require) {\n&quot;,
            &quot;    data = require(&quot;, loaderUtils.stringifyRequest(this, &quot;!!&quot; + remainingRequest), &quot;);\n&quot;,
            &quot;    var callbacks = cbs;\n&quot;,
            &quot;    cbs = null;\n&quot;,
            &quot;    for(var i = 0, l = callbacks.length; i < l; i++) {\n&quot;,
            &quot;        callbacks[i](data);\n&quot;,
            &quot;    }\n&quot;,
            &quot;}&quot; + chunkNameParam + &quot;);&quot;];
    }
    return result.join(&quot;&quot;);
}

/*
Output format:

    var cbs = [],
        data;
    module.exports = function(cb) {
        if(cbs) cbs.push(cb);
        else cb(data);
    }
    require.ensure([], function(require) {
        data = require(&quot;xxx&quot;);
        var callbacks = cbs;
        cbs = null;
        for(var i = 0, l = callbacks.length; i < l; i++) {
            callbacks[i](data);
        }
    });

*/
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra
*/</span>
<span class="hljs-keyword">var</span> loaderUtils = <span class="hljs-built_in">require</span>(<span class="hljs-string">"loader-utils"</span>);

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{};
<span class="hljs-built_in">module</span>.exports.pitch = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">remainingRequest</span>) </span>{
    <span class="hljs-keyword">this</span>.cacheable &amp;&amp; <span class="hljs-keyword">this</span>.cacheable();
    <span class="hljs-keyword">var</span> query = loaderUtils.getOptions(<span class="hljs-keyword">this</span>) || {};
    <span class="hljs-keyword">if</span>(query.name) {
        <span class="hljs-keyword">var</span> options = {
            <span class="hljs-attr">context</span>: query.context || <span class="hljs-keyword">this</span>.options.context,
            <span class="hljs-attr">regExp</span>: query.regExp
        };
        <span class="hljs-keyword">var</span> chunkName = loaderUtils.interpolateName(<span class="hljs-keyword">this</span>, query.name, options);
        <span class="hljs-keyword">var</span> chunkNameParam = <span class="hljs-string">", "</span> + <span class="hljs-built_in">JSON</span>.stringify(chunkName);
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">var</span> chunkNameParam = <span class="hljs-string">''</span>;
    }
    <span class="hljs-keyword">var</span> result;
    <span class="hljs-keyword">if</span>(query.lazy) {
        result = [
            <span class="hljs-string">"module.exports = function(cb) {\n"</span>,
            <span class="hljs-string">"    require.ensure([], function(require) {\n"</span>,
            <span class="hljs-string">"        cb(require("</span>, loaderUtils.stringifyRequest(<span class="hljs-keyword">this</span>, <span class="hljs-string">"!!"</span> + remainingRequest), <span class="hljs-string">"));\n"</span>,
            <span class="hljs-string">"    }"</span> + chunkNameParam + <span class="hljs-string">");\n"</span>,
            <span class="hljs-string">"}"</span>];
    } <span class="hljs-keyword">else</span> {
        result = [
            <span class="hljs-string">"var cbs = [], \n"</span>,
            <span class="hljs-string">"    data;\n"</span>,
            <span class="hljs-string">"module.exports = function(cb) {\n"</span>,
            <span class="hljs-string">"    if(cbs) cbs.push(cb);\n"</span>,
            <span class="hljs-string">"    else cb(data);\n"</span>,
            <span class="hljs-string">"}\n"</span>,
            <span class="hljs-string">"require.ensure([], function(require) {\n"</span>,
            <span class="hljs-string">"    data = require("</span>, loaderUtils.stringifyRequest(<span class="hljs-keyword">this</span>, <span class="hljs-string">"!!"</span> + remainingRequest), <span class="hljs-string">");\n"</span>,
            <span class="hljs-string">"    var callbacks = cbs;\n"</span>,
            <span class="hljs-string">"    cbs = null;\n"</span>,
            <span class="hljs-string">"    for(var i = 0, l = callbacks.length; i &lt; l; i++) {\n"</span>,
            <span class="hljs-string">"        callbacks[i](data);\n"</span>,
            <span class="hljs-string">"    }\n"</span>,
            <span class="hljs-string">"}"</span> + chunkNameParam + <span class="hljs-string">");"</span>];
    }
    <span class="hljs-keyword">return</span> result.join(<span class="hljs-string">""</span>);
}

<span class="hljs-comment">/*
Output format:

    var cbs = [],
        data;
    module.exports = function(cb) {
        if(cbs) cbs.push(cb);
        else cb(data);
    }
    require.ensure([], function(require) {
        data = require("xxx");
        var callbacks = cbs;
        cbs = null;
        for(var i = 0, l = callbacks.length; i &lt; l; i++) {
            callbacks[i](data);
        }
    });

*/</span>
</code></pre>
<h4>2.A的源码</h4>
<p><a></a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import PropTypes from 'prop-types';
import * as reactRedux from 'react-redux';
import BaseContainer from '../../../containers/ReactBaseContainer';

class A extends BaseContainer {
  constructor(props) {
    super(props);
    this.renderCustom = function renderCustom() {
      return (
        <div >
          Hello world In A
        </div>
      );
    };
  }
  render() {
    // 返回父级view
    return super.render();
  }
}

A.propTypes = {
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return { state };
}

export default reactRedux.connect(mapStateToProps)(A);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> PropTypes <span class="hljs-keyword">from</span> <span class="hljs-string">'prop-types'</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> reactRedux <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>;
<span class="hljs-keyword">import</span> BaseContainer <span class="hljs-keyword">from</span> <span class="hljs-string">'../../../containers/ReactBaseContainer'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">A</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">BaseContainer</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.renderCustom = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">renderCustom</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> &gt;</span>
          Hello world In A
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      );
    };
  }
  render() {
    <span class="hljs-comment">// 返回父级view</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">super</span>.render();
  }
}

A.propTypes = {
  <span class="hljs-attr">dispatch</span>: PropTypes.func,
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mapStateToProps</span>(<span class="hljs-params">state</span>) </span>{
  <span class="hljs-keyword">return</span> { state };
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> reactRedux.connect(mapStateToProps)(A);
</code></pre>
<h4>3.route.js的源码</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import { BrowserRouter, Switch, Link } from 'react-router-dom';
import { Route } from 'react-router';
import PostContainer from '../containers/PostsContainer';
// 设置trunk文件的名字  the basename of the resource
import aContainer from './containers/A';
import bContainer from './containers/B';
import cContainer from './containers/C';
import Bundle from '../utils/Bundle';

const A = () => (
  <Bundle load={aContainer}>
    {Component => <Component />}
  </Bundle>
)

const app = () =>
  <div>
    {/* path = &quot;/about&quot; */}
    {/* &quot;/about/&quot; 可以，但&quot;/about/1&quot;就不可以了 exact 配置之后，需要路径绝对匹配,多个斜杠没有关系，这里直接在浏览器里面设置还有问题*/}
    {/* path = &quot;/about/&quot; */}
    {/* &quot;/about/1&quot; 可以，但&quot;/about&quot;就不可以了 用了strict，path要大于等于的关系，少一个斜杠都不行 */}
    {/* exact 和 strick 都用了就必须一模一样，连斜杠都一样 */}
    <Link to=&quot;/about/&quot;> Link to about</Link>
    <Route  path=&quot;/&quot; component={PostContainer} />
    <Route path=&quot;/about/&quot; component={A} />
    {/* <Route path=&quot;/home&quot; component={B} />
    <Route component={C} /> */}
  </div>
;
export default function () {
  // 用来判断本地浏览器是否支持刷新
  const supportsHistory = 'pushState' in window.history;
  return (
    <BrowserRouter forceRefresh={!supportsHistory} keyLength={12}>
      <div>
        {app()}
      </div>
    </BrowserRouter>

  );
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { BrowserRouter, Switch, Link } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>;
<span class="hljs-keyword">import</span> { Route } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>;
<span class="hljs-keyword">import</span> PostContainer <span class="hljs-keyword">from</span> <span class="hljs-string">'../containers/PostsContainer'</span>;
<span class="hljs-comment">// 设置trunk文件的名字  the basename of the resource</span>
<span class="hljs-keyword">import</span> aContainer <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/A'</span>;
<span class="hljs-keyword">import</span> bContainer <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/B'</span>;
<span class="hljs-keyword">import</span> cContainer <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/C'</span>;
<span class="hljs-keyword">import</span> Bundle <span class="hljs-keyword">from</span> <span class="hljs-string">'../utils/Bundle'</span>;

<span class="hljs-keyword">const</span> A = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Bundle</span> <span class="hljs-attr">load</span>=<span class="hljs-string">{aContainer}</span>&gt;</span>
    {Component =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">Component</span> /&gt;</span>}
  <span class="hljs-tag">&lt;/<span class="hljs-name">Bundle</span>&gt;</span></span>
)

<span class="hljs-keyword">const</span> app = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>
  &lt;div&gt;
    {<span class="hljs-comment">/* path = "/about" */</span>}
    {<span class="hljs-comment">/* "/about/" 可以，但"/about/1"就不可以了 exact 配置之后，需要路径绝对匹配,多个斜杠没有关系，这里直接在浏览器里面设置还有问题*/</span>}
    {<span class="hljs-comment">/* path = "/about/" */</span>}
    {<span class="hljs-comment">/* "/about/1" 可以，但"/about"就不可以了 用了strict，path要大于等于的关系，少一个斜杠都不行 */</span>}
    {<span class="hljs-comment">/* exact 和 strick 都用了就必须一模一样，连斜杠都一样 */</span>}
    &lt;Link to=<span class="hljs-string">"/about/"</span>&gt; Link to about&lt;<span class="hljs-regexp">/Link&gt;
    &lt;Route  path="/</span><span class="hljs-string">" component={PostContainer} /&gt;
    &lt;Route path="</span>/about/<span class="hljs-string">" component={A} /&gt;
    {/* &lt;Route path="</span>/home<span class="hljs-string">" component={B} /&gt;
    &lt;Route component={C} /&gt; */}
  &lt;/div&gt;
;
export default function () {
  // 用来判断本地浏览器是否支持刷新
  const supportsHistory = 'pushState' in window.history;
  return (
    &lt;BrowserRouter forceRefresh={!supportsHistory} keyLength={12}&gt;
      &lt;div&gt;
        {app()}
      &lt;/div&gt;
    &lt;/BrowserRouter&gt;

  );
}
</span></code></pre>
<h3 id="articleHeader6">更新(按需加载)</h3>
<h4>oneStep</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &quot;react&quot;;

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncComponent</span>(<span class="hljs-params">importComponent</span>) </span>{
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AsyncComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
      <span class="hljs-keyword">super</span>(props);

      <span class="hljs-keyword">this</span>.state = {
        <span class="hljs-attr">component</span>: <span class="hljs-literal">null</span>
      };
    }

    <span class="hljs-keyword">async</span> componentDidMount() {
      <span class="hljs-keyword">const</span> { <span class="hljs-attr">default</span>: component } = <span class="hljs-keyword">await</span> importComponent();

      <span class="hljs-keyword">this</span>.setState({
        <span class="hljs-attr">component</span>: component
      });
    }

    render() {
      <span class="hljs-keyword">const</span> C = <span class="hljs-keyword">this</span>.state.component;

      <span class="hljs-keyword">return</span> C ? <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">C</span> {<span class="hljs-attr">...this.props</span>} /&gt;</span> : null;
    }
  }

  return AsyncComponent;
}</span></code></pre>
<h4>Second Step</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Buttons = asyncComponent(() => import(&quot;./button&quot;));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> Buttons = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">"./button"</span>));</code></pre>
<h4>babel 中需要配置一下</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;presets&quot;: [
        [
          &quot;es2015&quot;
        ],
        &quot;stage-1&quot;, // 应用了es7的语法，所以必须有这个配置
        &quot;react&quot;
      ]," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code><span class="hljs-string">"presets"</span>: [
        [
          <span class="hljs-string">"es2015"</span>
        ],
        <span class="hljs-string">"stage-1"</span>, // 应用了es7的语法，所以必须有这个配置
        <span class="hljs-string">"react"</span>
      ],</code></pre>
<h5>文章引用</h5>
<ul>
<li><a href="http://henleyedition.com/implicit-code-splitting-with-react-router-and-webpack/" rel="nofollow noreferrer" target="_blank">http://henleyedition.com</a></li>
<li><a href="https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/code-splitting.md" rel="nofollow noreferrer" target="_blank">react-router官方文档</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React-router 4 按需加载的实现方式及原理(Code Splitting)

## 原文链接
[https://segmentfault.com/a/1190000009539836](https://segmentfault.com/a/1190000009539836)

