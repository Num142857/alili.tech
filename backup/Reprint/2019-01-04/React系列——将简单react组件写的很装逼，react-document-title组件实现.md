---
title: 'React系列——将简单react组件写的很装逼，react-document-title组件实现' 
date: 2019-01-04 2:30:10
hidden: true
slug: de3lwi8ja5u
categories: [reprint]
---

{{< raw >}}

                    
<p>因为react是单页应用，所以我们可能需要根据不同的路由改变文档的title，那么，这时候你可能就会用到<a href="https://github.com/gaearon/react-document-title" rel="nofollow noreferrer" target="_blank">react-document-title</a>插件。</p>
<p>这个插件主文件代码41行，主要导入了下面3个依赖包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var React = require('react'),
PropTypes = require('prop-types'),
withSideEffect = require('react-side-effect');    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> React = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react'</span>),
PropTypes = <span class="hljs-built_in">require</span>(<span class="hljs-string">'prop-types'</span>),
withSideEffect = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react-side-effect'</span>);    </code></pre>
<p>react-side-effect是一个类似Connect组件的容器，通常它被称为高阶组件。</p>
<p>但是，实际上，我们可以思考，是否可以不使用这个插件完成不同路由修改title的功能，答案是当然可以。</p>
<p>如果使用原生js，修改title的代码只需要一行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.title = '我是标题'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">document<span class="hljs-selector-class">.title</span> = <span class="hljs-string">'我是标题'</span></code></pre>
<p><strong>在react中，我们可以使用非常少的代码封装出一个公共组件，来修改每个路由的title。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import PropTypes from 'prop-types'
export default class ReactDocumentTitle extends React.Component {
    setTitle() {
        const { title } = this.props
        document.title = title
    }
    componentDidMount() {
        this.setTitle()
    }
    componentDidUpdate() {
        this.setTitle()
    }
    render() {
        return React.Children.only(this.props.children)
    }
}
ReactDocumentTitle.propTypes = {
    title: PropTypes.string.isRequired
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">'reac</span>t'
<span class="hljs-keyword">import</span> <span class="hljs-type">PropTypes</span> from <span class="hljs-symbol">'prop</span>-types'
export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ReactDocumentTitle</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    setTitle() {
        const { title } = <span class="hljs-keyword">this</span>.props
        document.title = title
    }
    componentDidMount() {
        <span class="hljs-keyword">this</span>.setTitle()
    }
    componentDidUpdate() {
        <span class="hljs-keyword">this</span>.setTitle()
    }
    render() {
        <span class="hljs-keyword">return</span> <span class="hljs-type">React</span>.<span class="hljs-type">Children</span>.only(<span class="hljs-keyword">this</span>.props.children)
    }
}
<span class="hljs-type">ReactDocumentTitle</span>.propTypes = {
    title: <span class="hljs-type">PropTypes</span>.string.isRequired
}</code></pre>
<p>这份代码是将react-side-effect和react-document-title合并到一起做的事情，我把它叫做精简版。</p>
<p><strong>使用该组件：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import ReactDocumentTitle from 'path/ReactDocumentTitle'

render() {
    return (
        <ReactDocumentTitle title=&quot;文档标题&quot;>
            //这里仅能有一个唯一的root元素。
        </ReactDocumentTitle>
    )
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> ReactDocumentTitle <span class="hljs-keyword">from</span> <span class="hljs-string">'path/ReactDocumentTitle'</span>

render() {
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ReactDocumentTitle</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"文档标题"</span>&gt;</span>
            //这里仅能有一个唯一的root元素。
        <span class="hljs-tag">&lt;/<span class="hljs-name">ReactDocumentTitle</span>&gt;</span></span>
    )
}
</code></pre>
<p>如果你对高阶组件的写法有兴趣，可以研究一下<a href="https://github.com/gaearon/react-side-effect" rel="nofollow noreferrer" target="_blank">react-side-effect</a>。需要注意的是，这个高阶组件的代码是使用了babel编译后的结果，你可能看起来没那么容易理解。</p>
<p><strong>如果把我上面写的那段代码使用babel编译，你再试着理解一下：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj &amp;&amp; obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(&quot;Cannot call a class as a function&quot;); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(&quot;this hasn't been initialised - super() hasn't been called&quot;); } return call &amp;&amp; (typeof call === &quot;object&quot; || typeof call === &quot;function&quot;) ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== &quot;function&quot; &amp;&amp; superClass !== null) { throw new TypeError(&quot;Super expression must either be null or a function, not &quot; + typeof superClass); } subClass.prototype = Object.create(superClass &amp;&amp; superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactDocumentTitle = function (_React$Component) {
    _inherits(ReactDocumentTitle, _React$Component);

    function ReactDocumentTitle() {
        _classCallCheck(this, ReactDocumentTitle);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    ReactDocumentTitle.prototype.setTitle = function setTitle() {
        var title = this.props.title;

        document.title = title;
    };

    ReactDocumentTitle.prototype.componentDidMount = function componentDidMount() {
        this.setTitle();
    };

    ReactDocumentTitle.prototype.componentDidUpdate = function componentDidUpdate() {
        this.setTitle();
    };

    ReactDocumentTitle.prototype.render = function render() {
        return _react2.default.Children.only(this.props.children);
    };

    return ReactDocumentTitle;
}(_react2.default.Component);

exports.default = ReactDocumentTitle;

ReactDocumentTitle.propTypes = {
    title: _propTypes2.default.string.isRequired
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">'use strict'</span>;

exports.__esModule = <span class="hljs-literal">true</span>;

<span class="hljs-keyword">var</span> _react = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react'</span>);

<span class="hljs-keyword">var</span> _react2 = _interopRequireDefault(_react);

<span class="hljs-keyword">var</span> _propTypes = <span class="hljs-built_in">require</span>(<span class="hljs-string">'prop-types'</span>);

<span class="hljs-keyword">var</span> _propTypes2 = _interopRequireDefault(_propTypes);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_interopRequireDefault</span>(<span class="hljs-params">obj</span>) </span>{ <span class="hljs-keyword">return</span> obj &amp;&amp; obj.__esModule ? obj : { <span class="hljs-attr">default</span>: obj }; }

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_classCallCheck</span>(<span class="hljs-params">instance, Constructor</span>) </span>{ <span class="hljs-keyword">if</span> (!(instance <span class="hljs-keyword">instanceof</span> Constructor)) { <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">"Cannot call a class as a function"</span>); } }

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_possibleConstructorReturn</span>(<span class="hljs-params">self, call</span>) </span>{ <span class="hljs-keyword">if</span> (!self) { <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">ReferenceError</span>(<span class="hljs-string">"this hasn't been initialised - super() hasn't been called"</span>); } <span class="hljs-keyword">return</span> call &amp;&amp; (<span class="hljs-keyword">typeof</span> call === <span class="hljs-string">"object"</span> || <span class="hljs-keyword">typeof</span> call === <span class="hljs-string">"function"</span>) ? call : self; }

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_inherits</span>(<span class="hljs-params">subClass, superClass</span>) </span>{ <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> superClass !== <span class="hljs-string">"function"</span> &amp;&amp; superClass !== <span class="hljs-literal">null</span>) { <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">"Super expression must either be null or a function, not "</span> + <span class="hljs-keyword">typeof</span> superClass); } subClass.prototype = <span class="hljs-built_in">Object</span>.create(superClass &amp;&amp; superClass.prototype, { <span class="hljs-attr">constructor</span>: { <span class="hljs-attr">value</span>: subClass, <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span> } }); <span class="hljs-keyword">if</span> (superClass) <span class="hljs-built_in">Object</span>.setPrototypeOf ? <span class="hljs-built_in">Object</span>.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

<span class="hljs-keyword">var</span> ReactDocumentTitle = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_React$Component</span>) </span>{
    _inherits(ReactDocumentTitle, _React$Component);

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ReactDocumentTitle</span>(<span class="hljs-params"></span>) </span>{
        _classCallCheck(<span class="hljs-keyword">this</span>, ReactDocumentTitle);

        <span class="hljs-keyword">return</span> _possibleConstructorReturn(<span class="hljs-keyword">this</span>, _React$Component.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>));
    }

    ReactDocumentTitle.prototype.setTitle = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setTitle</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> title = <span class="hljs-keyword">this</span>.props.title;

        <span class="hljs-built_in">document</span>.title = title;
    };

    ReactDocumentTitle.prototype.componentDidMount = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">componentDidMount</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.setTitle();
    };

    ReactDocumentTitle.prototype.componentDidUpdate = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">componentDidUpdate</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.setTitle();
    };

    ReactDocumentTitle.prototype.render = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> _react2.default.Children.only(<span class="hljs-keyword">this</span>.props.children);
    };

    <span class="hljs-keyword">return</span> ReactDocumentTitle;
}(_react2.default.Component);

exports.default = ReactDocumentTitle;

ReactDocumentTitle.propTypes = {
    <span class="hljs-attr">title</span>: _propTypes2.default.string.isRequired
};
</code></pre>
<p><strong>这里就有一个非常有趣的地方，以后你使用ES6写了一个react组件，然后再编译成ES5之后，发布到github上，别人就会觉得你的代码高大上很多。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React系列——将简单react组件写的很装逼，react-document-title组件实现

## 原文链接
[https://segmentfault.com/a/1190000010705479](https://segmentfault.com/a/1190000010705479)

