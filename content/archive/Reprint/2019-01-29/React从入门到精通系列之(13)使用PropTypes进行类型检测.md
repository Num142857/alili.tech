---
title: 'React从入门到精通系列之(13)使用PropTypes进行类型检测' 
date: 2019-01-29 2:30:10
hidden: true
slug: vu5jy5lago9
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">十三、使用PropTypes进行类型检测</h2>
<p>随着你的应用的变得越来越大，你可以通过<code>typechecking</code>来找到更多的bug。 对于某些应用，您可以使用JavaScript扩展（如<code>Flow</code>或<code>TypeScript</code>）对整个应用程序进行类型检查。 </p>
<p>即使你不使用这些，React也有一些内置的<code>typechecking</code>能力。 要在组件的<code>props</code>上运行<code>typechecking</code>，可以分配特殊的<code>propTypes</code>属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Greeting extends React.Component {
    render() {
        return (
            <h1>Hello {this.props.name}</h1>
        )
    };
}
Greeting.propTypes = {
    name: React.PropTypes.string.isRequired
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Greeting</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello {this.props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
        )
    };
}
Greeting.propTypes = {
    <span class="hljs-attr">name</span>: React.PropTypes.string.isRequired
};</code></pre>
<p><code>React.PropTypes</code>返回的是一系列验证函数，用于确保接收的数据类似是否是有效的。 <br>在这个例子中，我们使用<code>React.PropTypes.string.isRequire</code>检测<code>name</code>是否为字符串，并且是必填的。 <br>当为prop提供无效值时，JavaScript控制台中将显示警告。 出于性能原因，仅在开发模式下检查<code>propTypes</code>。</p>
<h3 id="articleHeader1">React.PropTypes</h3>
<p>下面是一个示例，其中提供了不同的验证函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyComponent.propTypes = {
  // 你可以定义一个js原始类型的prop,默认请情况下，这是都是可选的
  optionalArray: React.PropTypes.array,
  optionalBool: React.PropTypes.bool,
  optionalFunc: React.PropTypes.func,
  optionalNumber: React.PropTypes.number,
  optionalObject: React.PropTypes.object,
  optionalString: React.PropTypes.string,
  optionalSymbol: React.PropTypes.symbol,

  // 任何可以渲染的东西：数字，字符串，元素或数组（或片段）。
  optionalNode: React.PropTypes.node,

  // React元素
  optionalElement: React.PropTypes.element,

  // 你也可以声明prop是某个类的实例。 内部使用的是JS的instanceof运算符。
  optionalMessage: React.PropTypes.instanceOf(Message),

  // 你可以通过将它作为枚举来确保你的prop被限制到特定的值。
  optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),

  // 可以是许多类型之一的对象
  optionalUnion: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.instanceOf(Message)
  ]),

  // 某种类型的数组
  optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),

  // 具有某种类型的属性值的对象
  optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),

  // 采取特定样式的对象
  optionalObjectWithShape: React.PropTypes.shape({
    color: React.PropTypes.string,
    fontSize: React.PropTypes.number
  }),

  // 你可以用`isRequired`来连接到上面的任何一个类型，以确保如果没有提供props的话会显示一个警告。
  requiredFunc: React.PropTypes.func.isRequired,

  // 任何数据类型
  requiredAny: React.PropTypes.any.isRequired,

  // 您还可以指定自定义类型检查器。 如果检查失败，它应该返回一个Error对象。 不要`console.warn`或throw，因为这不会在`oneOfType`内工作。
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // 您还可以为`arrayOf`和`objectOf`提供自定义类型检查器。 如果检查失败，它应该返回一个Error对象。 
  // 检查器将为数组或对象中的每个键调用验证函数。 
  // 检查器有两个参数，第一个参数是数组或对象本身，第二个是当前项的键。
  customArrayProp: React.PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">MyComponent.propTypes = {
  <span class="hljs-comment">// 你可以定义一个js原始类型的prop,默认请情况下，这是都是可选的</span>
  optionalArray: React.PropTypes.array,
  <span class="hljs-attr">optionalBool</span>: React.PropTypes.bool,
  <span class="hljs-attr">optionalFunc</span>: React.PropTypes.func,
  <span class="hljs-attr">optionalNumber</span>: React.PropTypes.number,
  <span class="hljs-attr">optionalObject</span>: React.PropTypes.object,
  <span class="hljs-attr">optionalString</span>: React.PropTypes.string,
  <span class="hljs-attr">optionalSymbol</span>: React.PropTypes.symbol,

  <span class="hljs-comment">// 任何可以渲染的东西：数字，字符串，元素或数组（或片段）。</span>
  optionalNode: React.PropTypes.node,

  <span class="hljs-comment">// React元素</span>
  optionalElement: React.PropTypes.element,

  <span class="hljs-comment">// 你也可以声明prop是某个类的实例。 内部使用的是JS的instanceof运算符。</span>
  optionalMessage: React.PropTypes.instanceOf(Message),

  <span class="hljs-comment">// 你可以通过将它作为枚举来确保你的prop被限制到特定的值。</span>
  optionalEnum: React.PropTypes.oneOf([<span class="hljs-string">'News'</span>, <span class="hljs-string">'Photos'</span>]),

  <span class="hljs-comment">// 可以是许多类型之一的对象</span>
  optionalUnion: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.instanceOf(Message)
  ]),

  <span class="hljs-comment">// 某种类型的数组</span>
  optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),

  <span class="hljs-comment">// 具有某种类型的属性值的对象</span>
  optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),

  <span class="hljs-comment">// 采取特定样式的对象</span>
  optionalObjectWithShape: React.PropTypes.shape({
    <span class="hljs-attr">color</span>: React.PropTypes.string,
    <span class="hljs-attr">fontSize</span>: React.PropTypes.number
  }),

  <span class="hljs-comment">// 你可以用`isRequired`来连接到上面的任何一个类型，以确保如果没有提供props的话会显示一个警告。</span>
  requiredFunc: React.PropTypes.func.isRequired,

  <span class="hljs-comment">// 任何数据类型</span>
  requiredAny: React.PropTypes.any.isRequired,

  <span class="hljs-comment">// 您还可以指定自定义类型检查器。 如果检查失败，它应该返回一个Error对象。 不要`console.warn`或throw，因为这不会在`oneOfType`内工作。</span>
  customProp: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">props, propName, componentName</span>) </span>{
    <span class="hljs-keyword">if</span> (!<span class="hljs-regexp">/matchme/</span>.test(props[propName])) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(
        <span class="hljs-string">'Invalid prop `'</span> + propName + <span class="hljs-string">'` supplied to'</span> +
        <span class="hljs-string">' `'</span> + componentName + <span class="hljs-string">'`. Validation failed.'</span>
      );
    }
  },

  <span class="hljs-comment">// 您还可以为`arrayOf`和`objectOf`提供自定义类型检查器。 如果检查失败，它应该返回一个Error对象。 </span>
  <span class="hljs-comment">// 检查器将为数组或对象中的每个键调用验证函数。 </span>
  <span class="hljs-comment">// 检查器有两个参数，第一个参数是数组或对象本身，第二个是当前项的键。</span>
  customArrayProp: React.PropTypes.arrayOf(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">propValue, key, componentName, location, propFullName</span>) </span>{
    <span class="hljs-keyword">if</span> (!<span class="hljs-regexp">/matchme/</span>.test(propValue[key])) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(
        <span class="hljs-string">'Invalid prop `'</span> + propFullName + <span class="hljs-string">'` supplied to'</span> +
        <span class="hljs-string">' `'</span> + componentName + <span class="hljs-string">'`. Validation failed.'</span>
      );
    }
  })
};</code></pre>
<h4>要求只能是单个子元素</h4>
<p>使用<code>React.PropTypes.element</code>，您可以指定只有一个子元素可以作为内容传递的组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyComponent extends React.Component {
    render() {
        // 只能包含一个子元素，否则会给出警告
        const children = this.props.children;
        return (
            <div>{children}</div>
        );
    }
}

MyComponent.propTypes = {
    children: React.PropTypes.element.isRequired
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-comment">// 只能包含一个子元素，否则会给出警告</span>
        <span class="hljs-keyword">const</span> children = <span class="hljs-keyword">this</span>.props.children;
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }
}

MyComponent.propTypes = {
    <span class="hljs-attr">children</span>: React.PropTypes.element.isRequired
}</code></pre>
<h4>设置Prop默认值</h4>
<p>您可以通过使用<code>defaultProps</code>属性来定义props的默认值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Greeting extends React.Component {
    render() {
        return <h1>hello {this.props.name}</h1>;
    };
}

// 如果name没有传值，则会将name设置为默认的zhangyatao
Greeting.defaultProps = {
    name: 'zhangyatao'
}

// 会渲染处<h1>hi zhangyatao</h1>
ReactDOM.render(
    <Greeting />,
    document.getElementById('root')
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Greeting</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>hello {this.props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
    };
}

<span class="hljs-comment">// 如果name没有传值，则会将name设置为默认的zhangyatao</span>
Greeting.defaultProps = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'zhangyatao'</span>
}

<span class="hljs-comment">// 会渲染处&lt;h1&gt;hi zhangyatao&lt;/h1&gt;</span>
ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Greeting</span> /&gt;</span>,
    document.getElementById('root')
)</span></code></pre>
<p>如果父组件没有设置并传入<code>name</code>，<code>defaultProps</code>将确保<code>this.props.name</code>将有一个默认值。 <code>propTypes</code>类型检查发生在<code>defaultProps</code>解析之后，因此类型检查也将应用于<code>defaultProps</code>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React从入门到精通系列之(13)使用PropTypes进行类型检测

## 原文链接
[https://segmentfault.com/a/1190000007814801](https://segmentfault.com/a/1190000007814801)

