---
title: 'ES6 + Webpack + React + Babel 如何在低版本浏览器上愉快的玩耍（上）' 
date: 2019-02-03 2:30:40
hidden: true
slug: sj57jxyoook
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">起因</h2>
<p>某天，某测试说：“这个页面在 IE8 下白屏，9也白。。”</p>
<p>某前端开发: 吭哧吭哧。。。一上午的时间就过去了，搞定了。</p>
<p>第二天，某测试说：“IE 又白了。。”</p>
<p>某前端开发: 吭哧吭哧。。。谁用的 <code>Object.assign</code>，出来我保证削不屎你。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006929964?w=458&amp;h=231" src="https://static.alili.tech/img/remote/1460000006929964?w=458&amp;h=231" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>原谅我不禁又黑了一把 IE。</p>
<p>有人可能会想，都要淘汰了，还有什么好讲的？</p>
<p>也许几年后，确实没用了，但目前我们的系统还是要对 ie8+ 做兼容，因为确实还有个别用户，尽管他没朋友。。。</p>
<p>记录下本次在 IE 下踩得坑，让后面的同学能够不再在这上面浪费时间了。</p>
<h2 id="articleHeader1">经过</h2>
<h3 id="articleHeader2">测试</h3>
<p>首先，看下面代码(以下测试在 IE9)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Test extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>{this.props.content}</div>;
  }
}

module.exports = Test;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Test</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
  }
  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{this.props.content}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }
}

<span class="hljs-built_in">module</span>.exports = Test;</code></pre>
<p>这段代码跑的妥妥的，没什么问题。</p>
<p>一般来说，babel 在转换继承时，可能会出现兼容问题，那么，再看这一段</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Test extends React.Component {
  constructor(props) {
    super(props);
  }
  test() {
      console.log('test');
  }
  render() {
    return <div>{this.props.content}</div>;
  }
}

Test.defaultProps = {
  content: &quot;测试&quot;
};

class Test2 extends Test {
  constructor(props) {
    super(props);
    this.test();
  }
}

Test2.displayName = 'Test2';

module.exports = Test2;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Test</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
  }
  test() {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'test'</span>);
  }
  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{this.props.content}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }
}

Test.defaultProps = {
  <span class="hljs-attr">content</span>: <span class="hljs-string">"测试"</span>
};

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Test2</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Test</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.test();
  }
}

Test2.displayName = <span class="hljs-string">'Test2'</span>;

<span class="hljs-built_in">module</span>.exports = Test2;</code></pre>
<p>这段代码同样也可以正常运行</p>
<p>也就是说在上述这两种情况下，不做任何处理（前提是已经加载了 es5-shim/es5-sham），在 IE9 下都可以正常运行。</p>
<p>然后我们再看下会跑挂的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 1,
    };
  }
  test() {
      console.log(this.state.value);
  }
  render() {
    return <div>{this.props.content}</div>;
  }
}

Test.defaultProps = {
  content: &quot;测试&quot;
};

class Test2 extends Test {
  constructor(props) {
    super(props);
    // SCRIPT5007: 无法获取属性 &quot;value&quot; 的值，对象为 null 或未定义
    this.test();
    
    // SCRIPT5007: 无法获取属性 &quot;b&quot; 的值，对象为 null 或未定义
    this.a = this.props.b;
  }
}
// undefined
console.log(Test2.defaultProps);

Test2.displayName = 'Test2';

module.exports = Test2;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Test</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">test</span>: <span class="hljs-number">1</span>,
    };
  }
  test() {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.state.value);
  }
  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{this.props.content}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }
}

Test.defaultProps = {
  <span class="hljs-attr">content</span>: <span class="hljs-string">"测试"</span>
};

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Test2</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Test</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-comment">// SCRIPT5007: 无法获取属性 "value" 的值，对象为 null 或未定义</span>
    <span class="hljs-keyword">this</span>.test();
    
    <span class="hljs-comment">// SCRIPT5007: 无法获取属性 "b" 的值，对象为 null 或未定义</span>
    <span class="hljs-keyword">this</span>.a = <span class="hljs-keyword">this</span>.props.b;
  }
}
<span class="hljs-comment">// undefined</span>
<span class="hljs-built_in">console</span>.log(Test2.defaultProps);

Test2.displayName = <span class="hljs-string">'Test2'</span>;

<span class="hljs-built_in">module</span>.exports = Test2;</code></pre>
<p>这段代码在高级浏览器中是没问题的，在 IE9 中会出现注释所描述的问题</p>
<p>从这些问题分析，可得出3个结论</p>
<ol>
<li><p>在构造函数里的定义的属性无法被继承</p></li>
<li><p>在构造函数里不能使用 <code>this.props.xx</code></p></li>
<li><p>类属性或方法是无法被继承的</p></li>
</ol>
<p>也就是说，只要规避了这三个条件的话，不做任何处理（前提是已经加载了 es5-shim/es5-sham），在 IE9 下都可以正常运行。</p>
<blockquote>
<p>第二点，是完全可以避免的，切记在 <code>constructor</code> 直接使用 <code>props.xxx</code>, 不要再用 <code>this.props.xxx</code></p>
<p>第三点，也是可以完全避免的，因为从理论上来说，类属性就不该被继承，如果想使用父类的类属性可以直接<code>Test2.defaultProps = Test.defaultProps;</code></p>
<p>第一点，可避免，但无法完全避免</p>
</blockquote>
<h3 id="articleHeader3">原因</h3>
<p>第一点，有时是无法完全避免的，那么就要查询原因，才能找到解决方案</p>
<p>我们把 babel 转义后的代码放出来就能查出原因了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';

var _createClass = function () {
  ...
}();

function _classCallCheck(instance, Constructor) { 
  ...
}

function _possibleConstructorReturn(self, call) { 
  ...
  // 这个方法只是做了下判断，返回第一个或第二参数
  return call &amp;&amp; (typeof call === &quot;object&quot; || typeof call === &quot;function&quot;) ? call : self; }

function _inherits(subClass, superClass) { 
  ...; 
  // 这里的 _inherits 是通过将子类的原型[[prototype]]指向了父类，所以如果在高级浏览器下，子类的可以继承到类属性
  // 根本问题也是出在这里，IE9 下既没有 `setPrototypeOf` 也没有 `__proto__`
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; 
}

var Test = function (_React$Component) {
  ...
  return Test;
}(React.Component);

Test.defaultProps = {
  content: &quot;测试&quot;
};

var Test2 = function (_Test) {
  _inherits(Test2, _Test);

  function Test2(props) {
    _classCallCheck(this, Test2);
     // 这里的 this 会通过 _possibleConstructorReturn，来获取父类构造函数里定义的属性
     // _possibleConstructorReturn 只是做了下判断，如果第二个参数得到了正确执行，则返回执行结果，否则返回第一个参数，也就是子类的 this
     // 也就是说问题出在 Object.getPrototypeOf 
     // 在 _inherits 中将子类的原型指向了父类， 这里通过 getPrototypeOf 来获取父类，其实就是 _Test
     // Object.getPrototypeOf 不能正确的执行，导致了子类无法继承到在构造函数里定义的属性或方法，也无法继承到类属性或方法
    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Test2).call(this, props));

    _this2.test();
    console.log(_this2.props.children);
    return _this2;
  }

  return Test2;
}(Test);

console.log(Test2.defaultProps);

Test2.displayName = 'Test';

module.exports = Test2;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span>;

<span class="hljs-keyword">var</span> _createClass = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  ...
}();

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_classCallCheck</span>(<span class="hljs-params">instance, Constructor</span>) </span>{ 
  ...
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_possibleConstructorReturn</span>(<span class="hljs-params">self, call</span>) </span>{ 
  ...
  <span class="hljs-comment">// 这个方法只是做了下判断，返回第一个或第二参数</span>
  <span class="hljs-keyword">return</span> call &amp;&amp; (<span class="hljs-keyword">typeof</span> call === <span class="hljs-string">"object"</span> || <span class="hljs-keyword">typeof</span> call === <span class="hljs-string">"function"</span>) ? call : self; }

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_inherits</span>(<span class="hljs-params">subClass, superClass</span>) </span>{ 
  ...; 
  <span class="hljs-comment">// 这里的 _inherits 是通过将子类的原型[[prototype]]指向了父类，所以如果在高级浏览器下，子类的可以继承到类属性</span>
  <span class="hljs-comment">// 根本问题也是出在这里，IE9 下既没有 `setPrototypeOf` 也没有 `__proto__`</span>
  <span class="hljs-keyword">if</span> (superClass) <span class="hljs-built_in">Object</span>.setPrototypeOf ? <span class="hljs-built_in">Object</span>.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; 
}

<span class="hljs-keyword">var</span> Test = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_React$Component</span>) </span>{
  ...
  return Test;
}(React.Component);

Test.defaultProps = {
  <span class="hljs-attr">content</span>: <span class="hljs-string">"测试"</span>
};

<span class="hljs-keyword">var</span> Test2 = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_Test</span>) </span>{
  _inherits(Test2, _Test);

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Test2</span>(<span class="hljs-params">props</span>) </span>{
    _classCallCheck(<span class="hljs-keyword">this</span>, Test2);
     <span class="hljs-comment">// 这里的 this 会通过 _possibleConstructorReturn，来获取父类构造函数里定义的属性</span>
     <span class="hljs-comment">// _possibleConstructorReturn 只是做了下判断，如果第二个参数得到了正确执行，则返回执行结果，否则返回第一个参数，也就是子类的 this</span>
     <span class="hljs-comment">// 也就是说问题出在 Object.getPrototypeOf </span>
     <span class="hljs-comment">// 在 _inherits 中将子类的原型指向了父类， 这里通过 getPrototypeOf 来获取父类，其实就是 _Test</span>
     <span class="hljs-comment">// Object.getPrototypeOf 不能正确的执行，导致了子类无法继承到在构造函数里定义的属性或方法，也无法继承到类属性或方法</span>
    <span class="hljs-keyword">var</span> _this2 = _possibleConstructorReturn(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">Object</span>.getPrototypeOf(Test2).call(<span class="hljs-keyword">this</span>, props));

    _this2.test();
    <span class="hljs-built_in">console</span>.log(_this2.props.children);
    <span class="hljs-keyword">return</span> _this2;
  }

  <span class="hljs-keyword">return</span> Test2;
}(Test);

<span class="hljs-built_in">console</span>.log(Test2.defaultProps);

Test2.displayName = <span class="hljs-string">'Test'</span>;

<span class="hljs-built_in">module</span>.exports = Test2;</code></pre>
<p>通过上述的代码注释，可以得出有两处问题需要解决</p>
<ol>
<li><p>正确的获取父类（解决无法继承到在构造函数里定义的属性或方法）</p></li>
<li><p>正确的将子类的原型指向了父类（解决无法继承到类属性或方法）</p></li>
</ol>
<h3 id="articleHeader4">解决方案</h3>
<p>通过文档的查询，发现只要开启 es2015-classes 的 loose 模式即可解决第一个问题</p>
<h4>loose 模式</h4>
<blockquote>
<p>Babel have two modes:</p>
<ul>
<li><p>A normal mode follows the semantics of ECMAScript 6 as closely as possible.</p></li>
<li><p>A loose mode produces simpler ES5 code.</p></li>
</ul>
</blockquote>
<p>Babel 有两种模式：</p>
<ul>
<li><p>尽可能符合 ES6 语义的 normal 模式。</p></li>
<li><p>提供更简单 ES5 代码的 loose 模式。</p></li>
</ul>
<p>尽管官方是更推荐使用 normal 模式，但为了兼容 IE，我们目前也只能开启 loose 模式。</p>
<p>在 babel6 中，主要是通过 babel-preset-2015 这个插件，来进行转义的<br>我们看下 babel-preset-2015</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" plugins: [
    require(&quot;babel-plugin-transform-es2015-template-literals&quot;),
    require(&quot;babel-plugin-transform-es2015-literals&quot;),
    require(&quot;babel-plugin-transform-es2015-function-name&quot;),
    ...
    require(&quot;babel-plugin-transform-es2015-classes&quot;),
    ...
    require(&quot;babel-plugin-transform-es2015-typeof-symbol&quot;),
    require(&quot;babel-plugin-transform-es2015-modules-commonjs&quot;),
    [require(&quot;babel-plugin-transform-regenerator&quot;), { async: false, asyncGenerators: false }],
  ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> plugins: [
    <span class="hljs-built_in">require</span>(<span class="hljs-string">"babel-plugin-transform-es2015-template-literals"</span>),
    <span class="hljs-built_in">require</span>(<span class="hljs-string">"babel-plugin-transform-es2015-literals"</span>),
    <span class="hljs-built_in">require</span>(<span class="hljs-string">"babel-plugin-transform-es2015-function-name"</span>),
    ...
    require(<span class="hljs-string">"babel-plugin-transform-es2015-classes"</span>),
    ...
    require(<span class="hljs-string">"babel-plugin-transform-es2015-typeof-symbol"</span>),
    <span class="hljs-built_in">require</span>(<span class="hljs-string">"babel-plugin-transform-es2015-modules-commonjs"</span>),
    [<span class="hljs-built_in">require</span>(<span class="hljs-string">"babel-plugin-transform-regenerator"</span>), { <span class="hljs-attr">async</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">asyncGenerators</span>: <span class="hljs-literal">false</span> }],
  ]</code></pre>
<p>是一堆对应转义的插件，从命名上也可看出了大概，比如 babel-plugin-transform-es2015-classes 就是做类的转义的，也就是我们只需把它开启 loose 模式，即可解决我们的一个问题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[require('babel-plugin-transform-es2015-classes'), {loose: true}]," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">[<span class="hljs-built_in">require</span>(<span class="hljs-string">'babel-plugin-transform-es2015-classes'</span>), {<span class="hljs-attr">loose</span>: <span class="hljs-literal">true</span>}],</code></pre>
<p>看下开启了 loose 模式的代码，你会发现它的确更接近 ES5</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Test = function (_React$Component) {
  ...
  // 这里是 ES5 的写法
  Test.prototype.test = function test() {
    console.log(this.state.value);
  };
  /* normal 模式是这样的
  {
    key: 'test',
    value: function test() {
      console.log(this.state.value);
    }
  }
  */
  return Test;
}(React.Component);

var Test2 = function (_Test) {
  _inherits(Test2, _Test);

  function Test2(props) {
    _classCallCheck(this, Test2);
    // 这里直接拿到了父类 _Test, 即解决了无法继承到在构造函数里定义的属性或方法
    var _this2 = _possibleConstructorReturn(this, _Test.call(this, props));

    _this2.test();
    return _this2;
  }

  return Test2;
}(Test);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Test = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_React$Component</span>) </span>{
  ...
  <span class="hljs-comment">// 这里是 ES5 的写法</span>
  Test.prototype.test = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.state.value);
  };
  <span class="hljs-comment">/* normal 模式是这样的
  {
    key: 'test',
    value: function test() {
      console.log(this.state.value);
    }
  }
  */</span>
  <span class="hljs-keyword">return</span> Test;
}(React.Component);

<span class="hljs-keyword">var</span> Test2 = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_Test</span>) </span>{
  _inherits(Test2, _Test);

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Test2</span>(<span class="hljs-params">props</span>) </span>{
    _classCallCheck(<span class="hljs-keyword">this</span>, Test2);
    <span class="hljs-comment">// 这里直接拿到了父类 _Test, 即解决了无法继承到在构造函数里定义的属性或方法</span>
    <span class="hljs-keyword">var</span> _this2 = _possibleConstructorReturn(<span class="hljs-keyword">this</span>, _Test.call(<span class="hljs-keyword">this</span>, props));

    _this2.test();
    <span class="hljs-keyword">return</span> _this2;
  }

  <span class="hljs-keyword">return</span> Test2;
}(Test);</code></pre>
<p>我们可以通过去安装 <a href="https://github.com/bkonkle/babel-preset-es2015-loose" rel="nofollow noreferrer" target="_blank">babel-preset-es2015-loose</a>, 这个插件来开启 loose 模式。</p>
<p>但从我们团队的 <strong>老司机</strong> 口中</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006929965" src="https://static.alili.tech/img/remote/1460000006929965" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>得到了一个更好插件<a href="https://github.com/jmcriffey/babel-preset-es2015-ie" rel="nofollow noreferrer" target="_blank">babel-preset-es2015-ie</a>，看下这个插件的代码，发现它和原来的 babel-preset-2015 只有两行区别</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  [require('babel-plugin-transform-es2015-classes'), {loose: true}],
  require('babel-plugin-transform-proto-to-assign'),
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">[
  [<span class="hljs-built_in">require</span>(<span class="hljs-string">'babel-plugin-transform-es2015-classes'</span>), {<span class="hljs-attr">loose</span>: <span class="hljs-literal">true</span>}],
  <span class="hljs-built_in">require</span>(<span class="hljs-string">'babel-plugin-transform-proto-to-assign'</span>),
]</code></pre>
<p>刚好解决我们上述碰到的两个问题</p>
<p>这个 <code>babel-plugin-transform-proto-to-assign</code> 插件会生成一个 _defaults 方法来处理原型</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function _inherits(subClass, superClass) { 
  ...; 
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_inherits</span>(<span class="hljs-params">subClass, superClass</span>) </span>{ 
  ...; 
  <span class="hljs-keyword">if</span> (superClass) <span class="hljs-built_in">Object</span>.setPrototypeOf ? <span class="hljs-built_in">Object</span>.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function _defaults(obj, defaults) {
 var keys = Object.getOwnPropertyNames(defaults);
  for (var i = 0; i < keys.length; i++) {
   var key = keys[i]; 
   var value = Object.getOwnPropertyDescriptor(defaults, key);
    if (value &amp;&amp; value.configurable &amp;&amp; obj[key] === undefined) {
     Object.defineProperty(obj, key, value); 
     } 
   }
  return obj;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_defaults</span>(<span class="hljs-params">obj, defaults</span>) </span>{
 <span class="hljs-keyword">var</span> keys = <span class="hljs-built_in">Object</span>.getOwnPropertyNames(defaults);
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; keys.length; i++) {
   <span class="hljs-keyword">var</span> key = keys[i]; 
   <span class="hljs-keyword">var</span> value = <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(defaults, key);
    <span class="hljs-keyword">if</span> (value &amp;&amp; value.configurable &amp;&amp; obj[key] === <span class="hljs-literal">undefined</span>) {
     <span class="hljs-built_in">Object</span>.defineProperty(obj, key, value); 
     } 
   }
  <span class="hljs-keyword">return</span> obj;
}
</code></pre>
<blockquote><p>这个插件正确的将子类的原型指向了父类（解决无法继承到类属性或方法）</p></blockquote>
<h2 id="articleHeader5">总结</h2>
<p>本文讲述低版本浏览器报错的原因和解决方案</p>
<ul>
<li><p>一方面是提示下在构造函数里不要使用 <code>this.props.xx</code></p></li>
<li><p>另一方面也对继承的机制有了更好的理解</p></li>
</ul>
<p>在这次项目中发现在低版本浏览器跑不起来的两点主要原因：</p>
<ol>
<li><p><code>SCRIPT5007: 无法获取属性 xxx 的值，对象为 null 或未定义</code>，这种情况一般是组件继承后，无法继承到在构造函数里定义的属性或方法，同样类属性或方法也同样无法继承</p></li>
<li><p><code>SCRIPT438: 对象不支持 xxx 属性或方法</code>，这种情况一般是使用了 es6、es7 的高级语法，<code>Object.assgin</code> <code>Object.keys</code> 等，这种情况在移动端的一些 ‘神机’ 也一样会挂。</p></li>
</ol>
<p>第一点本文已经分析，预知第二点讲解请见下篇。</p>
<p>备注：下篇会主要介绍下如何让 用了 <code>Object.assign</code> 的那位同学可以继续用，又不会被削。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 + Webpack + React + Babel 如何在低版本浏览器上愉快的玩耍（上）

## 原文链接
[https://segmentfault.com/a/1190000006929961](https://segmentfault.com/a/1190000006929961)

