---
title: 'React设计模式:深入理解React&Redux原理套路' 
date: 2019-02-06 2:30:09
hidden: true
slug: ek0qz0ara1s
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p><a href="https://github.com/krasimir/react-in-patterns" rel="nofollow noreferrer" target="_blank">原文地址</a></p>
<p><a href="https://github.com/wxyyxc1992/web-frontend-practice-handbook#react" rel="nofollow noreferrer" target="_blank">本文从属于笔者的React入门与最佳实践系列</a>，推荐阅读<a href="https://github.com/wxyyxc1992/just-coder-handbook/blob/master/SoftwareEngineering/SoftwareArchitecture/GUIArchitecture/evolution-of-gui-architectural-patterns.md" rel="nofollow noreferrer" target="_blank">GUI应用程序架构的十年变迁:MVC,MVP,MVVM,Unidirectional,Clean</a></p>
</blockquote>
<h1 id="articleHeader0">Communication</h1>
<p>React组件一个很大的特性在于其拥有自己完整的生命周期，因此我们可以将React组件视作可自运行的小型系统，它拥有自己的内部状态、输入与输出。</p>
<h2 id="articleHeader1">Input</h2>
<p>对于React组件而言，其输入的来源就是Props，我们会用如下方式向某个React组件传入数据:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// Title.jsx
class Title extends React.Component {
  render() {
    return <h1>{ this.props.text }</h1>;
  }
};
Title.propTypes = {
  text: React.PropTypes.string
};
Title.defaultProps = {
  text: 'Hello world'
};

// App.jsx
class App extends React.Component {
  render() {
    return <Title text='Hello React' />;
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>
<span class="hljs-comment">// Title.jsx</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Title</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;h1&gt;{ <span class="hljs-keyword">this</span>.props.text }&lt;/h1&gt;;
  }
};
<span class="hljs-type">Title</span>.propTypes = {
  text: <span class="hljs-type">React</span>.<span class="hljs-type">PropTypes</span>.string
};
<span class="hljs-type">Title</span>.defaultProps = {
  text: <span class="hljs-symbol">'Hello</span> world'
};

<span class="hljs-comment">// App.jsx</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">Title</span> text=<span class="hljs-symbol">'Hello</span> <span class="hljs-type">React</span>' /&gt;;
  }
};</code></pre>
<p><code>text</code>是<code>Text</code>组件自己的输入域，父组件<code>App</code>在使用子组件<code>Title</code>时候应该提供<code>text</code>属性值。除了标准的属性名之外，我们还会用到如下两个设置:</p>
<ul>
<li><p>propTypes:用于定义Props的类型，这有助于追踪运行时误设置的Prop值。</p></li>
<li><p>defaultProps:定义Props的默认值，这个在开发时很有帮助</p></li>
</ul>
<p>Props中还有一个特殊的属性<code>props.children</code>可以允许我们使用子组件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
class Title extends React.Component {
  render() {
    return (
      <h1>
        { this.props.text }
        { this.props.children }
      </h1>
    );
  }
};

class App extends React.Component {
  render() {
    return (
      <Title text='Hello React'>
        <span>community</span>
      </Title>
    );
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Title</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;h1&gt;
        { <span class="hljs-keyword">this</span>.props.text }
        { <span class="hljs-keyword">this</span>.props.children }
      &lt;/h1&gt;
    );
  }
};

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;<span class="hljs-type">Title</span> text=<span class="hljs-symbol">'Hello</span> <span class="hljs-type">React</span>'&gt;
        &lt;span&gt;community&lt;/span&gt;
      &lt;/<span class="hljs-type">Title</span>&gt;
    );
  }
};</code></pre>
<p>注意，如果我们不主动在<code>Title</code>组件的<code>render</code>函数中设置<code>{this.props.children}</code>，那么<code>span</code>标签是不会被渲染出来的。除了Props之外，另一个隐性的组件的输入即是<code>context</code>，整个React组件树会拥有一个<code>context</code>对象，它可以被树中挂载的每个组件所访问到，关于此部分更多的内容请参考<a href="https://github.com/krasimir/react-in-patterns/tree/master/patterns/dependency-injection" rel="nofollow noreferrer" target="_blank">依赖注入</a>这一章节。</p>
<h2 id="articleHeader2">Output</h2>
<p>组件最明显的输出就是渲染后的HTML文本，即是React组件渲染结果的可视化展示。当然，部分包含了逻辑的组件也可能发送或者触发某些Action或者Event。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
class Title extends React.Component {
  render() {
    return (
      <h1>
        <a onClick={ this.props.logoClicked }>
          <img src='path/to/logo.png' />
        </a>
      </h1>
    );
  }
};

class App extends React.Component {
  render() {
    return <Title logoClicked={ this.logoClicked } />;
  }
  logoClicked() {
    console.log('logo clicked');
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Title</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;h1&gt;
        &lt;a onClick={ <span class="hljs-keyword">this</span>.props.logoClicked }&gt;
          &lt;img src=<span class="hljs-symbol">'path</span>/to/logo.png' /&gt;
        &lt;/a&gt;
      &lt;/h1&gt;
    );
  }
};

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">Title</span> logoClicked={ <span class="hljs-keyword">this</span>.logoClicked } /&gt;;
  }
  logoClicked() {
    console.log(<span class="hljs-symbol">'logo</span> clicked');
  }
};</code></pre>
<p>在<code>App</code>组件中我们向<code>Title</code>组件传入了可以从<code>Title</code>调用的回调函数，在<code>logoClicked</code>函数中我们可以设置或者修改需要传回父组件的数据。需要注意的是，React并没有提供可以访问子组件状态的API，换言之，我们不能使用<code>this.props.children[0].state</code>或者类似的方法。正确的从子组件中获取数据的方法应该是在Props中传入回调函数，而这种隔离也有助于我们定义更加清晰的API并且促进了所谓单向数据流。</p>
<h1 id="articleHeader3">Composition</h1>
<p>React最大的特性之一即是其强大的组件的可组合性，实际上除了React之外，笔者并不知道还有哪个框架能够提供如此简单易用的方式来创建与组合各式各样的组件。本章我们会一起讨论些常用的组合技巧，我们以一个简单的例子来进行讲解。假设在我们的应用中有一个页首栏目，并且其中放置了导航栏。我们创建了三个独立的React组件:<code>App</code>,<code>Header</code>以及<code>Navigation</code>。将这三个组件依次嵌套组合，可以得到以下的代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<App>
  <Header>
    <Navigation> ... </Navigation>
  </Header>
</App>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
<span class="hljs-tag">&lt;<span class="hljs-name">App</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Navigation</span>&gt;</span> ... <span class="hljs-tag">&lt;/<span class="hljs-name">Navigation</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Header</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">App</span>&gt;</span></code></pre>
<p>而在JSX中组合这些组件的方式就是在需要的时候引用它们:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// app.jsx
import Header from './Header.jsx';

export default class App extends React.Component {
  render() {
    return <Header />;
  }
}

// Header.jsx
import Navigation from './Navigation.jsx';

export default class Header extends React.Component {
  render() {
    return <header><Navigation /></header>;
  }
}

// Navigation.jsx
export default class Navigation extends React.Component {
  render() {
    return (<nav> ... </nav>);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>
<span class="hljs-comment">// app.jsx</span>
<span class="hljs-keyword">import</span> <span class="hljs-type">Header</span> from './<span class="hljs-type">Header</span>.jsx';

export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">Header</span> /&gt;;
  }
}

<span class="hljs-comment">// Header.jsx</span>
<span class="hljs-keyword">import</span> <span class="hljs-type">Navigation</span> from './<span class="hljs-type">Navigation</span>.jsx';

export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Header</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;header&gt;&lt;<span class="hljs-type">Navigation</span> /&gt;&lt;/header&gt;;
  }
}

<span class="hljs-comment">// Navigation.jsx</span>
export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Navigation</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (&lt;nav&gt; ... &lt;/nav&gt;);
  }
}</code></pre>
<p>不过这种方式却可能存在以下的问题:</p>
<ul>
<li><p>我们将<code>App</code>当做各个组件间的连接线，也是整个应用的入口，因此在<code>App</code>中进行各个独立组件的组合是个不错的方法。不过<code>Header</code>元素中可能包含像图标、搜索栏或者Slogan这样的元素。而如果我们需要另一个不包含<code>Navigation</code>功能的<code>Header</code>组件时，像上面这种直接将<code>Navigation</code>组件硬编码进入<code>Header</code>的方式就会难于修改。</p></li>
<li><p>这种硬编码的方式会难以测试，如果我们在<code>Header</code>中加入一些自定义的业务逻辑代码，那么在测试的时候当我们要创建<code>Header</code>实例时，因为其依赖于其他组件而导致了这种依赖层次过深(这里不包含<a href="https://facebook.github.io/react/docs/test-utils.html#shallow-rendering" rel="nofollow noreferrer" target="_blank">Shallow Rendering</a>这种仅渲染父组件而不渲染嵌套的子组件方式)。</p></li>
</ul>
<h2 id="articleHeader4">使用React的<code>children</code>API</h2>
<p>React为我们提供了<code>this.props.children</code>来允许父组件访问其子组件，这种方式有助于保证我们的<code>Header</code>独立并且不需要与其他组件解耦合。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// App.jsx
export default class App extends React.Component {
  render() {
    return (
      <Header>
        <Navigation />
      </Header>
    );
  }
}

// Header.jsx
export default class Header extends React.Component {
  render() {
    return <header>{ this.props.children }</header>;
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>
<span class="hljs-comment">// App.jsx</span>
export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;<span class="hljs-type">Header</span>&gt;
        &lt;<span class="hljs-type">Navigation</span> /&gt;
      &lt;/<span class="hljs-type">Header</span>&gt;
    );
  }
}

<span class="hljs-comment">// Header.jsx</span>
export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Header</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;header&gt;{ <span class="hljs-keyword">this</span>.props.children }&lt;/header&gt;;
  }
};</code></pre>
<p>这种方式也有助于测试，我们可以选择输入空白的<code>div</code>元素，从而将要测试的目标元素隔离开来而专注于我们需要测试的部分。</p>
<h2 id="articleHeader5">将子组件以属性方式传入</h2>
<p>React组件可以接受Props作为输入，我们也可以选择将需要封装的组件以Props方式传入:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// App.jsx
class App extends React.Component {
  render() {
    var title = <h1>Hello there!</h1>;

    return (
      <Header title={ title }>
        <Navigation />
      </Header>
    );
  }
};

// Header.jsx
export default class Header extends React.Component {
  render() {
    return (
      <header>
        { this.props.title }
        <hr />
        { this.props.children }
      </header>
    );
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>
<span class="hljs-comment">// App.jsx</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">var</span> title = &lt;h1&gt;<span class="hljs-type">Hello</span> there!&lt;/h1&gt;;

    <span class="hljs-keyword">return</span> (
      &lt;<span class="hljs-type">Header</span> title={ title }&gt;
        &lt;<span class="hljs-type">Navigation</span> /&gt;
      &lt;/<span class="hljs-type">Header</span>&gt;
    );
  }
};

<span class="hljs-comment">// Header.jsx</span>
export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Header</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;header&gt;
        { <span class="hljs-keyword">this</span>.props.title }
        &lt;hr /&gt;
        { <span class="hljs-keyword">this</span>.props.children }
      &lt;/header&gt;
    );
  }
};</code></pre>
<p>这种方式在我们需要对传入的待组合组件进行一些修正时非常适用。</p>
<h1 id="articleHeader6">Higher-order components</h1>
<p>Higher-Order Components模式看上去非常类似于装饰器模式，它会用于包裹某个组件然后为其添加一些新的功能。这里展示一个简单的用于构造Higher-Order Component的函数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var enhanceComponent = (Component) =>
  class Enhance extends React.Component {
    render() {
      return (
        <Component
          {...this.state}
          {...this.props}
        />
      )
    }
  };

export default enhanceComponent;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>
<span class="hljs-keyword">var</span> enhanceComponent = (<span class="hljs-type">Component</span>) =&gt;
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Enhance</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
      <span class="hljs-keyword">return</span> (
        &lt;<span class="hljs-type">Component</span>
          {...<span class="hljs-keyword">this</span>.state}
          {...<span class="hljs-keyword">this</span>.props}
        /&gt;
      )
    }
  };

export <span class="hljs-keyword">default</span> enhanceComponent;</code></pre>
<p>通常情况下我们会构建一个工厂函数，接收原始的组件然后返回一个所谓的增强或者包裹后的版本，譬如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var OriginalComponent = () => <p>Hello world.</p>;

class App extends React.Component {
  render() {
    return React.createElement(enhanceComponent(OriginalComponent));
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>
<span class="hljs-keyword">var</span> <span class="hljs-type">OriginalComponent</span> = () =&gt; &lt;p&gt;<span class="hljs-type">Hello</span> world.&lt;/p&gt;;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> <span class="hljs-type">React</span>.createElement(enhanceComponent(<span class="hljs-type">OriginalComponent</span>));
  }
};</code></pre>
<p>一般来说，高阶组件的首要工作就是渲染原始的组件，我们经常也会将Props与State传递进去，将这两个属性传递进去会有助于我们建立一个数据代理。HOC模式允许我们控制组件的输入，即将需要传入的数据以Props传递进去。譬如我们需要为原始组件添加一些配置:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var config = require('path/to/configuration');

var enhanceComponent = (Component) =>
  class Enhance extends React.Component {
    render() {
      return (
        <Component
          {...this.state}
          {...this.props}
          title={ config.appTitle }
        />
      )
    }
  };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>
<span class="hljs-keyword">var</span> config = require(<span class="hljs-symbol">'path</span>/to/configuration');

<span class="hljs-keyword">var</span> enhanceComponent = (<span class="hljs-type">Component</span>) =&gt;
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Enhance</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
      <span class="hljs-keyword">return</span> (
        &lt;<span class="hljs-type">Component</span>
          {...<span class="hljs-keyword">this</span>.state}
          {...<span class="hljs-keyword">this</span>.props}
          title={ config.appTitle }
        /&gt;
      )
    }
  };</code></pre>
<p>这里对于<code>configuration</code>的细节实现会被隐藏到高阶组件中，原始组件只需要了解从Props中获取到<code>title</code>变量然后渲染到界面上。原始组件并不会关心变量存于何地，从何而来，这种模式最大的优势在于我们能够以独立的模式对该组件进行测试，并且可以非常方便地对该组件进行Mocking。在HOC模式下我们的原始组件会变成这样子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var OriginalComponent  = (props) => <p>{ props.title }</p>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>
<span class="hljs-built_in">var</span> OriginalComponent  = (<span class="hljs-built_in">props</span>) =&gt; &lt;p&gt;{ <span class="hljs-built_in">props</span>.<span class="hljs-built_in">title</span> }&lt;/p&gt;;</code></pre>
<h1 id="articleHeader7">Dependency injection</h1>
<p>我们写的大部分组件与模块都会包含一些依赖，合适的依赖管理有助于创建良好可维护的项目结构。而所谓的依赖注入技术正是解决这个问题的常用技巧，无论是在Java还是其他应用程序中，依赖注入都受到了广泛的使用。而React中对于依赖注入的需要也是显而易见的，让我们假设有如下的应用树结构:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// Title.jsx
export default function Title(props) {
  return <h1>{ props.title }</h1>;
}

// Header.jsx
import Title from './Title.jsx';
export default function Header() {
  return (
    <header>
      <Title />
    </header>
  );
}

// App.jsx
import Header from './Header.jsx';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: 'React in patterns' };
  }
  render() {
    return <Header />;
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-comment">// Title.jsx</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Title</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{ props.title }<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}

<span class="hljs-comment">// Header.jsx</span>
<span class="hljs-keyword">import</span> Title <span class="hljs-keyword">from</span> <span class="hljs-string">'./Title.jsx'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Header</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Title</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// App.jsx</span>
<span class="hljs-keyword">import</span> Header <span class="hljs-keyword">from</span> <span class="hljs-string">'./Header.jsx'</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = { <span class="hljs-attr">title</span>: <span class="hljs-string">'React in patterns'</span> };
  }
  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Header</span> /&gt;</span>;
  }
};</span></code></pre>
<p><code>title</code>这个变量的值是在<code>App</code>组件中被定义好的，我们需要将其传入到<code>Title</code>组件中。最直接的方法就是将其从<code>App</code>组件传入到<code>Header</code>组件，然后再由<code>Header</code>组件传入到<code>Title</code>组件中。这种方法在这里描述的简单的仅有三个组件的应用中还是非常清晰可维护的，不过随着项目功能与复杂度的增加，这种层次化的传值方式会导致很多的组件要去考虑它们并不需要的属性。在上文所讲的HOC模式中我们已经使用了数据注入的方式，这里我们使用同样的技术来注入<code>title</code>变量:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// enhance.jsx
var title = 'React in patterns';
var enhanceComponent = (Component) =>
  class Enhance extends React.Component {
    render() {
      return (
        <Component
          {...this.state}
          {...this.props}
          title={ title }
        />
      )
    }
  };
export default enhanceComponent;

// Header.jsx
import enhance from './enhance.jsx';
import Title from './Title.jsx';

var EnhancedTitle = enhance(Title);
export default function Header() {
  return (
    <header>
      <EnhancedTitle />
    </header>
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>
<span class="hljs-comment">// enhance.jsx</span>
<span class="hljs-keyword">var</span> title = <span class="hljs-symbol">'React</span> in patterns';
<span class="hljs-keyword">var</span> enhanceComponent = (<span class="hljs-type">Component</span>) =&gt;
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Enhance</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
      <span class="hljs-keyword">return</span> (
        &lt;<span class="hljs-type">Component</span>
          {...<span class="hljs-keyword">this</span>.state}
          {...<span class="hljs-keyword">this</span>.props}
          title={ title }
        /&gt;
      )
    }
  };
export <span class="hljs-keyword">default</span> enhanceComponent;

<span class="hljs-comment">// Header.jsx</span>
<span class="hljs-keyword">import</span> enhance from './enhance.jsx';
<span class="hljs-keyword">import</span> <span class="hljs-type">Title</span> from './<span class="hljs-type">Title</span>.jsx';

<span class="hljs-keyword">var</span> <span class="hljs-type">EnhancedTitle</span> = enhance(<span class="hljs-type">Title</span>);
export <span class="hljs-keyword">default</span> function <span class="hljs-type">Header</span>() {
  <span class="hljs-keyword">return</span> (
    &lt;header&gt;
      &lt;<span class="hljs-type">EnhancedTitle</span> /&gt;
    &lt;/header&gt;
  );
}</code></pre>
<p>在上文这种HOC模式中，<code>title</code>变量被包含在了一个隐藏的中间层中，我们将其作为Props值传入到原始的<code>Title</code>变量中并且得到一个新的组件。这种方式思想是不错，不过还是只解决了部分问题。现在我们可以不去显式地将<code>title</code>变量传递到<code>Title</code>组件中即可以达到同样的<code>enhance.jsx</code>效果。</p>
<p>React为我们提供了<code>context</code>的概念，<code>context</code>是贯穿于整个React组件树允许每个组件访问的对象。有点像所谓的Event Bus，一个简单的例子如下所示:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// a place where we'll define the context
var context = { title: 'React in patterns' };
class App extends React.Component {
  getChildContext() {
    return context;
  }
  ...
};
App.childContextTypes = {
  title: React.PropTypes.string
};

// a place where we need data
class Inject extends React.Component {
  render() {
    var title = this.context.title;
    ...
  }
}
Inject.contextTypes = {
  title: React.PropTypes.string
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>
<span class="hljs-comment">// a place where we'll define the context</span>
<span class="hljs-keyword">var</span> context = { title: <span class="hljs-symbol">'React</span> in patterns' };
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  getChildContext() {
    <span class="hljs-keyword">return</span> context;
  }
  ...
};
<span class="hljs-type">App</span>.childContextTypes = {
  title: <span class="hljs-type">React</span>.<span class="hljs-type">PropTypes</span>.string
};

<span class="hljs-comment">// a place where we need data</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Inject</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">var</span> title = <span class="hljs-keyword">this</span>.context.title;
    ...
  }
}
<span class="hljs-type">Inject</span>.contextTypes = {
  title: <span class="hljs-type">React</span>.<span class="hljs-type">PropTypes</span>.string
};</code></pre>
<p>注意，我们要使用context对象必须要通过<code>childContextTypes</code>与<code>contextTypes</code>指明其构成。如果在<code>context</code>对象中未指明这些那么<code>context</code>会被设置为空，这可能会添加些额外的代码。因此我们最好不要将<code>context</code>当做一个简单的object对象而为其设置一些封装方法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// dependencies.js
export default {
  data: {},
  get(key) {
    return this.data[key];
  },
  register(key, value) {
    this.data[key] = value;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>
<span class="hljs-comment">// dependencies.js</span>
export <span class="hljs-keyword">default</span> {
  <span class="hljs-keyword">data</span>: {},
  <span class="hljs-keyword">get</span>(key) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.<span class="hljs-keyword">data</span>[key];
  },
  register(key, value) {
    <span class="hljs-keyword">this</span>.<span class="hljs-keyword">data</span>[key] = value;
  }
}</code></pre>
<p>这样，我们的<code>App</code>组件会被改造成这样子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import dependencies from './dependencies';

dependencies.register('title', 'React in patterns');

class App extends React.Component {
  getChildContext() {
    return dependencies;
  }
  render() {
    return <Header />;
  }
};
App.childContextTypes = {
  data: React.PropTypes.object,
  get: React.PropTypes.func,
  register: React.PropTypes.func
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>
<span class="hljs-keyword">import</span> dependencies from './dependencies';

dependencies.register(<span class="hljs-symbol">'titl</span>e', <span class="hljs-symbol">'React</span> in patterns');

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  getChildContext() {
    <span class="hljs-keyword">return</span> dependencies;
  }
  render() {
    <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">Header</span> /&gt;;
  }
};
<span class="hljs-type">App</span>.childContextTypes = {
  data: <span class="hljs-type">React</span>.<span class="hljs-type">PropTypes</span>.<span class="hljs-keyword">object</span>,
  get: <span class="hljs-type">React</span>.<span class="hljs-type">PropTypes</span>.func,
  register: <span class="hljs-type">React</span>.<span class="hljs-type">PropTypes</span>.func
};</code></pre>
<p>而在<code>Title</code>组件中，我们需要进行如下设置:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// Title.jsx
export default class Title extends React.Component {
  render() {
    return <h1>{ this.context.get('title') }</h1>
  }
}
Title.contextTypes = {
  data: React.PropTypes.object,
  get: React.PropTypes.func,
  register: React.PropTypes.func
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>
<span class="hljs-comment">// Title.jsx</span>
export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Title</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;h1&gt;{ <span class="hljs-keyword">this</span>.context.get(<span class="hljs-symbol">'titl</span>e') }&lt;/h1&gt;
  }
}
<span class="hljs-type">Title</span>.contextTypes = {
  data: <span class="hljs-type">React</span>.<span class="hljs-type">PropTypes</span>.<span class="hljs-keyword">object</span>,
  get: <span class="hljs-type">React</span>.<span class="hljs-type">PropTypes</span>.func,
  register: <span class="hljs-type">React</span>.<span class="hljs-type">PropTypes</span>.func
};</code></pre>
<p>当然我们不希望在每次要使用<code>contextTypes</code>的时候都需要显式地声明一下，我们可以将这些声明细节包含在一个高阶组件中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// Title.jsx
import wire from './wire';

function Title(props) {
  return <h1>{ props.title }</h1>;
}

export default wire(Title, ['title'], function resolve(title) {
  return { title };
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-comment">// Title.jsx</span>
<span class="hljs-keyword">import</span> wire <span class="hljs-keyword">from</span> <span class="hljs-string">'./wire'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Title</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{ props.title }<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> wire(Title, [<span class="hljs-string">'title'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">title</span>) </span>{
  <span class="hljs-keyword">return</span> { title };
});</code></pre>
<p>这里的<code>wire</code>函数的第一个参数是React组件对象，第二个参数是一系列需要注入的依赖值，注意，这些依赖值务必已经调用过<code>register</code>函数。最后一个参数则是所谓的映射函数，它接收存储在<code>context</code>中的某个原始值然后返回React Props中需要的值。因为在这个例子里<code>context</code>中存储的值与<code>Title</code>组件中需要的值都是<code>title</code>变量，因此我们直接返回即可。不过在真实的应用中可能是一个数据集合、配置等等。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
export default function wire(Component, dependencies, mapper) {
  class Inject extends React.Component {
    render() {
      var resolved = dependencies.map(this.context.get.bind(this.context));
      var props = mapper(...resolved);

      return React.createElement(Component, props);
    }
  }
  Inject.contextTypes = {
    data: React.PropTypes.object,
    get: React.PropTypes.func,
    register: React.PropTypes.func
  };
  return Inject;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>
export <span class="hljs-keyword">default</span> function wire(<span class="hljs-type">Component</span>, dependencies, mapper) {
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Inject</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
      <span class="hljs-keyword">var</span> resolved = dependencies.map(<span class="hljs-keyword">this</span>.context.get.bind(<span class="hljs-keyword">this</span>.context));
      <span class="hljs-keyword">var</span> props = mapper(...resolved);

      <span class="hljs-keyword">return</span> <span class="hljs-type">React</span>.createElement(<span class="hljs-type">Component</span>, props);
    }
  }
  <span class="hljs-type">Inject</span>.contextTypes = {
    data: <span class="hljs-type">React</span>.<span class="hljs-type">PropTypes</span>.<span class="hljs-keyword">object</span>,
    get: <span class="hljs-type">React</span>.<span class="hljs-type">PropTypes</span>.func,
    register: <span class="hljs-type">React</span>.<span class="hljs-type">PropTypes</span>.func
  };
  <span class="hljs-keyword">return</span> <span class="hljs-type">Inject</span>;
};</code></pre>
<p>这里的Inject就是某个可以访问<code>context</code>的高阶组件，而<code>mapper</code>就是用于接收<code>context</code>中的数据并将其转化为组件所需要的Props的函数。实际上现在大部分的依赖注入的解决方案都是基于<code>context</code>，我觉得了解这种方式的底层原理还是很有意义的。譬如现在流行的<code>Redux</code>，其核心的<code>connect</code>函数与<code>Provider</code>组件都是基于<code>context</code>。</p>
<h1 id="articleHeader8">One direction data flow</h1>
<p>单向数据流是React中主要的数据驱动模式，其核心概念在于组件并不会修改它们接收到的数据，它们只是负责接收新的数据而后重新渲染到界面上或者发出某些Action以触发某些专门的业务代码来修改数据存储中的数据。我们先设置一个包含一个按钮的<code>Switcher</code>组件，当我们点击该按钮时会触发某个<code>flag</code>变量的改变:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
class Switcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flag: false };
    this._onButtonClick = e => this.setState({ flag: !this.state.flag });
  }
  render() {
    return (
      <button onClick={ this._onButtonClick }>
        { this.state.flag ? 'lights on' : 'lights off' }
      </button>
    );
  }
};

// ... and we render it
class App extends React.Component {
  render() {
    return <Switcher />;
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Switcher</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = { flag: <span class="hljs-literal">false</span> };
    <span class="hljs-keyword">this</span>._onButtonClick = e =&gt; <span class="hljs-keyword">this</span>.setState({ flag: !<span class="hljs-keyword">this</span>.state.flag });
  }
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;button onClick={ <span class="hljs-keyword">this</span>._onButtonClick }&gt;
        { <span class="hljs-keyword">this</span>.state.flag ? <span class="hljs-symbol">'lights</span> on' : <span class="hljs-symbol">'lights</span> off' }
      &lt;/button&gt;
    );
  }
};

<span class="hljs-comment">// ... and we render it</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">Switcher</span> /&gt;;
  }
};</code></pre>
<p>此时我们将所有的数据放置到组件内，换言之，<code>Switcher</code>是唯一的包含我们<code>flag</code>变量的地方，我们来尝试下将这些数据托管于专门的Store中:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var Store = {
  _flag: false,
  set: function(value) {
    this._flag = value;
  },
  get: function() {
    return this._flag;
  }
};

class Switcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flag: false };
    this._onButtonClick = e => {
      this.setState({ flag: !this.state.flag }, () => {
        this.props.onChange(this.state.flag);
      });
    }
  }
  render() {
    return (
      <button onClick={ this._onButtonClick }>
        { this.state.flag ? 'lights on' : 'lights off' }
      </button>
    );
  }
};

class App extends React.Component {
  render() {
    return <Switcher onChange={ Store.set.bind(Store) } />;
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>
<span class="hljs-keyword">var</span> <span class="hljs-type">Store</span> = {
  _flag: <span class="hljs-literal">false</span>,
  set: function(value) {
    <span class="hljs-keyword">this</span>._flag = value;
  },
  get: function() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._flag;
  }
};

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Switcher</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = { flag: <span class="hljs-literal">false</span> };
    <span class="hljs-keyword">this</span>._onButtonClick = e =&gt; {
      <span class="hljs-keyword">this</span>.setState({ flag: !<span class="hljs-keyword">this</span>.state.flag }, () =&gt; {
        <span class="hljs-keyword">this</span>.props.onChange(<span class="hljs-keyword">this</span>.state.flag);
      });
    }
  }
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;button onClick={ <span class="hljs-keyword">this</span>._onButtonClick }&gt;
        { <span class="hljs-keyword">this</span>.state.flag ? <span class="hljs-symbol">'lights</span> on' : <span class="hljs-symbol">'lights</span> off' }
      &lt;/button&gt;
    );
  }
};

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">Switcher</span> onChange={ <span class="hljs-type">Store</span>.set.bind(<span class="hljs-type">Store</span>) } /&gt;;
  }
};</code></pre>
<p>这里的<code>Store</code>对象是一个简单的单例对象，可以帮助我们设置与获取<code>_flag</code>属性值。而通过将<code>getter</code>函数传递到组件内，可以允许我们在<code>Store</code>外部修改这些变量，此时我们的应用工作流大概是这样的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
User's input
     |
  Switcher -------> Store" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>
User<span class="hljs-symbol">'s</span> input
     |
  Switcher <span class="hljs-comment">-------&gt; Store</span></code></pre>
<p>假设我们已经将<code>flag</code>值保存到某个后端服务中，我们需要为该组件设置一个合适的初始状态。此时就会存在一个问题在于同一份数据保存在了两个地方，对于UI与<code>Store</code>分别保存了各自独立的关于<code>flag</code>的数据状态，我们等于在<code>Store</code>与<code>Switcher</code>之间建立了双向的数据流:<code>Store ---&gt; Switcher</code>与<code>Switcher ---&gt; Store</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// ... in App component
<Switcher
  value={ Store.get() }
  onChange={ Store.set.bind(Store) } />

// ... in Switcher component
constructor(props) {
  super(props);
  this.state = { flag: this.props.value };
  ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code>
<span class="hljs-comment">// ... in App component</span>
&lt;Switcher
  value=<span class="hljs-comment">{ Store.get() }</span>
  onChange=<span class="hljs-comment">{ Store.set.bind(Store) }</span> /&gt;

<span class="hljs-comment">// ... in Switcher component</span>
<span class="hljs-function"><span class="hljs-keyword">constructor</span><span class="hljs-params">(props)</span> <span class="hljs-comment">{
  super(props);
  this.state = { flag: this.props.value }</span>;</span>
  ...</code></pre>
<p>此时我们的数据流向变成了:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
User's input
     |
  Switcher <-------> Store
                      ^ |
                      | |
                      | |
                      | v
    Service communicating
    with our backend" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>
User's input
     |<span class="hljs-string">
  Switcher &lt;-------&gt; Store
                      ^ </span>|
                      |<span class="hljs-string"> </span>|
                      |<span class="hljs-string"> </span>|
                      |<span class="hljs-string"> v
    Service communicating
    with our backend</span></code></pre>
<p>在这种双向数据流下，如果我们在外部改变了<code>Store</code>中的状态之后，我们需要将改变之后的最新值更新到<code>Switcher</code>中，这样也在无形之间增加了应用的复杂度。而单向数据流则是解决了这个问题，它强制在全局只保留一个状态存储，通常是存放在Store中。在单向数据流下，我们需要添加一些订阅Store中状态改变的响应函数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var Store = {
  _handlers: [],
  _flag: '',
  onChange: function(handler) {
    this._handlers.push(handler);
  },
  set: function(value) {
    this._flag = value;
    this._handlers.forEach(handler => handler())
  },
  get: function() {
    return this._flag;
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>
<span class="hljs-keyword">var</span> Store = {
  _handlers: [],
  _flag: <span class="hljs-string">''</span>,
  onChange: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(handler)</span> </span>{
    <span class="hljs-keyword">this</span>._handlers.push(handler);
  },
  <span class="hljs-keyword">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span> </span>{
    <span class="hljs-keyword">this</span>._flag = value;
    <span class="hljs-keyword">this</span>._handlers.forEach(handler =&gt; handler())
  },
  <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._flag;
  }
};</code></pre>
<p>然后我们在<code>App</code>组件中设置了钩子函数，这样每次<code>Store</code>改变其值的时候我们都会强制重新渲染:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
class App extends React.Component {
  constructor(props) {
    super(props);
    Store.onChange(this.forceUpdate.bind(this));
  }
  render() {
    return (
      <div>
        <Switcher
          value={ Store.get() }
          onChange={ Store.set.bind(Store) } />
      </div>
    );
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-type">Store</span>.onChange(<span class="hljs-keyword">this</span>.forceUpdate.bind(<span class="hljs-keyword">this</span>));
  }
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;<span class="hljs-type">Switcher</span>
          value={ <span class="hljs-type">Store</span>.get() }
          onChange={ <span class="hljs-type">Store</span>.set.bind(<span class="hljs-type">Store</span>) } /&gt;
      &lt;/div&gt;
    );
  }
};</code></pre>
<p>注意，这里使用的<code>forceUpdate</code>并不是一个推荐的用法，我们通常会使用HOC模式来进行重渲染，这里使用<code>forceUpdate</code>只是用于演示说明。在基于上述的改造，我们就不需要在组件中继续保留内部状态:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
class Switcher extends React.Component {
  constructor(props) {
    super(props);
    this._onButtonClick = e => {
      this.props.onChange(!this.props.value);
    }
  }
  render() {
    return (
      <button onClick={ this._onButtonClick }>
        { this.props.value ? 'lights on' : 'lights off' }
      </button>
    );
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Switcher</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>._onButtonClick = e =&gt; {
      <span class="hljs-keyword">this</span>.props.onChange(!<span class="hljs-keyword">this</span>.props.value);
    }
  }
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;button onClick={ <span class="hljs-keyword">this</span>._onButtonClick }&gt;
        { <span class="hljs-keyword">this</span>.props.value ? <span class="hljs-symbol">'lights</span> on' : <span class="hljs-symbol">'lights</span> off' }
      &lt;/button&gt;
    );
  }
};</code></pre>
<p>这种模式的优势在于会将我们的组件改造为简单的<code>Store</code>中数据的呈现，此时才是真正无状态的View。我们可以以完全声明式的方式来编写组件，而将应用中复杂的业务逻辑放置到单独的地方。此时我们应用程序的流图变成了:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
Service communicating
with our backend
    ^
    |
    v
  Store <-----
    |        |
    v        |
Switcher ---->
    ^
    |
    |
User input" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>
Service communicating
<span class="hljs-built_in">with</span> our backend
    ^
    |
    <span class="hljs-type">v</span>
  Store &lt;-----
    |        <span class="hljs-type">|
    v</span>        |
<span class="hljs-type">Switcher</span> ----&gt;
    ^
    |
    <span class="hljs-type">|
User</span> input</code></pre>
<p>在这种单向数据流中我们不再需要同步系统中的多个部分，这种单向数据流的概念并不仅仅适用于基于React的应用。</p>
<h1 id="articleHeader9">Flux</h1>
<blockquote><p>关于Flux的简单了解可以参考笔者的<a href="https://segmentfault.com/a/1190000006016817#articleHeader33">GUI应用程序架构的十年变迁:MVC,MVP,MVVM,Unidirectional,Clean</a></p></blockquote>
<p>Flux是用于构建用户交互界面的架构模式，最早由Facebook在f8大会上提出，自此之后，很多的公司开始尝试这种概念并且貌似这是个很不错的构建前端应用的模式。Flux经常和React一起搭配使用，笔者本身在日常的工作中也是使用React+Flux的搭配，给自己带来了很大的遍历。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006770026" src="https://static.alili.tech/img/remote/1460000006770026" alt="" title="" style="cursor: pointer;"></span></p>
<p>Flux中最主要的角色为Dispatcher，它是整个系统中所有的Events的中转站。Dispatcher负责接收我们称之为Actions的消息通知并且将其转发给所有的Stores。每个Store实例本身来决定是否对该Action感兴趣并且是否相应地改变其内部的状态。当我们将Flux与熟知的MVC相比较，你就会发现Store在某些意义上很类似于Model，二者都是用于存放状态与状态中的改变。而在系统中，除了View层的用户交互可能触发Actions之外，其他的类似于Service层也可能触发Actions，譬如在某个HTTP请求完成之后，请求模块也会发出相应类型的Action来触发Store中对于状态的变更。</p>
<p>而在Flux中有个最大的陷阱就是对于数据流的破坏，我们可以在Views中访问Store中的数据，但是我们不应该在Views中修改任何Store的内部状态，所有对于状态的修改都应该通过Actions进行。作者在这里介绍了其维护的某个Flux变种的项目<a href="https://github.com/krasimir/fluxiny" rel="nofollow noreferrer" target="_blank">fluxiny</a>。</p>
<h2 id="articleHeader10">Dispatcher</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006770027" src="https://static.alili.tech/img/remote/1460000006770027" alt="" title="" style="cursor: pointer;"></span></p>
<p>大部分情况下我们在系统中只需要单个的Dispatcher，它是类似于粘合剂的角色将系统的其他部分有机结合在一起。Dispatcher一般而言有两个输入:Actions与Stores。其中Actions需要被直接转发给Stores，因此我们并不需要记录Actions的对象，而Stores的引用则需要保存在Dispatcher中。基于这个考虑，我们可以编写一个简单的Dispatcher:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var Dispatcher = function () {
  return {
    _stores: [],
    register: function (store) {  
      this._stores.push({ store: store });
    },
    dispatch: function (action) {
      if (this._stores.length > 0) {
        this._stores.forEach(function (entry) {
          entry.store.update(action);
        });
      }
    }
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>
<span class="hljs-keyword">var</span> Dispatcher = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">return</span> {
    _stores: [],
    register: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(store)</span> </span>{  
      <span class="hljs-keyword">this</span>._stores.push({ store: store });
    },
    dispatch: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(action)</span> </span>{
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._stores.length &gt; <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">this</span>._stores.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(entry)</span> </span>{
          entry.store.update(action);
        });
      }
    }
  }
};</code></pre>
<p>在上述实现中我们会发现，每个传入的<code>Store</code>对象都应该拥有一个<code>update</code>方法，因此我们在进行Store的注册时也要来检测该方法是否存在:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
register: function (store) {
  if (!store || !store.update) {
    throw new Error('You should provide a store that has an `update` method.');
  } else {
    this._stores.push({ store: store });
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs monkey"><code>
register: <span class="hljs-function"><span class="hljs-keyword">function</span> (</span>store) {
  <span class="hljs-keyword">if</span> (!store || !store.update) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-comment">'You should provide a store that has an `update` method.');</span>
  } <span class="hljs-keyword">else</span> {
    this._stores.push({ store: store });
  }
}</code></pre>
<p>在完成了对于Store的注册之后，下一步我们就是需要将View与Store关联起来，从而在Store发生改变的时候能够触发View的重渲染:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006112128" src="https://static.alili.tech/img/remote/1460000006112128" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>很多flux的实现中都会使用如下的辅助函数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
Framework.attachToStore(view, store);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cos"><code>
Framework.attachToStore(<span class="hljs-keyword">view</span>, store)<span class="hljs-comment">;</span></code></pre>
<p>不过作者并不是很喜欢这种方式，这样这样会要求View中需要调用某个具体的API，换言之，在View中就需要了解到Store的实现细节，而使得View与Store又陷入了紧耦合的境地。当开发者打算切换到其他的Flux框架时就不得不修改每个View中的相对应的API，那又会增加项目的复杂度。另一种可选的方式就是使用<code>React mixins</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var View = React.createClass({
  mixins: [Framework.attachToStore(store)]
  ...
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code>
<span class="hljs-attribute">var View</span> = React.createClass({
  mixins: [Framework.attachToStore(store)]
  ...
});</code></pre>
<p>使用<code>mixin</code>是个不错的修改现有的React 组件而不影响其原有代码的方式，不过这种方式的缺陷在于它不能够以一种Predictable的方式去修改组件，用户的可控性较低。还有一种方式就是使用<code>React context</code>，这种方式允许我们将值跨层次地传递给React组件树中的组件而不需要了解它们处于组件树中的哪个层级。这种方式和mixins可能有相同的问题，开发者并不知道该数据从何而来。</p>
<p>作者最终选用的方式即是上面提及到的Higher-Order Components模式，它建立了一个包裹函数来对现有组件进行重新打包处理:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function attachToStore(Component, store, consumer) {
  const Wrapper = React.createClass({
    getInitialState() {
      return consumer(this.props, store);
    },
    componentDidMount() {
      store.onChangeEvent(this._handleStoreChange);
    },
    componentWillUnmount() {
      store.offChangeEvent(this._handleStoreChange);
    },
    _handleStoreChange() {
      if (this.isMounted()) {
        this.setState(consumer(this.props, store));
      }
    },
    render() {
      return <Component {...this.props} {...this.state} />;
    }
  });
  return Wrapper;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>
function attachToStore(Component, store, consumer) {
  const Wrapper = React.createClass({
    getInitialState() {
      <span class="hljs-keyword">return</span> consumer(<span class="hljs-keyword">this</span>.props, store);
    },
    componentDidMount() {
      store.onChangeEvent(<span class="hljs-keyword">this</span>._handleStoreChange);
    },
    componentWillUnmount() {
      store.offChangeEvent(<span class="hljs-keyword">this</span>._handleStoreChange);
    },
    _handleStoreChange() {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.isMounted()) {
        <span class="hljs-keyword">this</span>.setState(consumer(<span class="hljs-keyword">this</span>.props, store));
      }
    },
    render() {
      <span class="hljs-keyword">return</span> &lt;Component {...<span class="hljs-keyword">this</span>.props} {...<span class="hljs-keyword">this</span>.state} /&gt;;
    }
  });
  <span class="hljs-keyword">return</span> Wrapper;
};</code></pre>
<p>其中<code>Component</code>代指我们需要附着到<code>Store</code>中的View，而<code>consumer</code>则是应该被传递给View的Store中的部分的状态，简单的用法为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
class MyView extends React.Component {
  ...
}

ProfilePage = connectToStores(MyView, store, (props, store) => ({
  data: store.get('key')
}));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyView</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  ...
}

<span class="hljs-type">ProfilePage</span> = connectToStores(<span class="hljs-type">MyView</span>, store, (props, store) =&gt; ({
  data: store.get(<span class="hljs-symbol">'ke</span>y')
}));</code></pre>
<p>这种模式的优势在于其有效地分割了各个模块间的职责，在该模式中Store并不需要主动地推送消息给View，而主需要简单地修改数据然后广播说我的状态已经更新了，然后由HOC去主动地抓取数据。那么在作者具体的实现中，就是选用了HOC模式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
register: function (store) {
  if (!store || !store.update) {
    throw new Error('You should provide a store that has an `update` method.');
  } else {
    var consumers = [];
    var change = function () {
      consumers.forEach(function (l) {
        l(store);
      });
    };
    var subscribe = function (consumer) {
      consumers.push(consumer);
    };

    this._stores.push({ store: store, change: change });
    return subscribe;
  }
  return false;
},
dispatch: function (action) {
  if (this._stores.length > 0) {
    this._stores.forEach(function (entry) {
      entry.store.update(action, entry.change);
    });
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
register: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">store</span>) </span>{
  <span class="hljs-keyword">if</span> (!store || !store.update) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'You should provide a store that has an `update` method.'</span>);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">var</span> consumers = [];
    <span class="hljs-keyword">var</span> change = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      consumers.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">l</span>) </span>{
        l(store);
      });
    };
    <span class="hljs-keyword">var</span> subscribe = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">consumer</span>) </span>{
      consumers.push(consumer);
    };

    <span class="hljs-keyword">this</span>._stores.push({ <span class="hljs-attr">store</span>: store, <span class="hljs-attr">change</span>: change });
    <span class="hljs-keyword">return</span> subscribe;
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
},
<span class="hljs-attr">dispatch</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">action</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._stores.length &gt; <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">this</span>._stores.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">entry</span>) </span>{
      entry.store.update(action, entry.change);
    });
  }
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006112122" src="https://static.alili.tech/img/remote/1460000006112122" alt="" title="" style="cursor: pointer;"></span></p>
<p>另一个常见的用户场景就是我们需要为界面提供一些默认的状态，换言之当每个<code>consumer</code>注册的时候需要提供一些初始化的默认数据:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var subscribe = function (consumer, noInit) {
  consumers.push(consumer);
  !noInit ? consumer(store) : null;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>
var subscribe = <span class="hljs-keyword">function</span> <span class="hljs-title"></span>(consumer, noInit) {
  consumers.push(consumer);
  !noInit ? consumer(store) : <span class="hljs-keyword"><span class="hljs-keyword">null</span></span>;
};</code></pre>
<p>综上所述，最终的Dispatcher函数如下所示:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var Dispatcher = function () {
  return {
    _stores: [],
    register: function (store) {
      if (!store || !store.update) {
        throw new Error('You should provide a store that has an `update` method.');
      } else {
        var consumers = [];
        var change = function () {
          consumers.forEach(function (l) {
            l(store);
          });
        };
        var subscribe = function (consumer, noInit) {
          consumers.push(consumer);
          !noInit ? consumer(store) : null;
        };

        this._stores.push({ store: store, change: change });
        return subscribe;
      }
      return false;
    },
    dispatch: function (action) {
      if (this._stores.length > 0) {
        this._stores.forEach(function (entry) {
          entry.store.update(action, entry.change);
        });
      }
    }
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-keyword">var</span> Dispatcher = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">_stores</span>: [],
    <span class="hljs-attr">register</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">store</span>) </span>{
      <span class="hljs-keyword">if</span> (!store || !store.update) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'You should provide a store that has an `update` method.'</span>);
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">var</span> consumers = [];
        <span class="hljs-keyword">var</span> change = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          consumers.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">l</span>) </span>{
            l(store);
          });
        };
        <span class="hljs-keyword">var</span> subscribe = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">consumer, noInit</span>) </span>{
          consumers.push(consumer);
          !noInit ? consumer(store) : <span class="hljs-literal">null</span>;
        };

        <span class="hljs-keyword">this</span>._stores.push({ <span class="hljs-attr">store</span>: store, <span class="hljs-attr">change</span>: change });
        <span class="hljs-keyword">return</span> subscribe;
      }
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    },
    <span class="hljs-attr">dispatch</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">action</span>) </span>{
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._stores.length &gt; <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">this</span>._stores.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">entry</span>) </span>{
          entry.store.update(action, entry.change);
        });
      }
    }
  }
};</code></pre>
<h2 id="articleHeader11">Actions</h2>
<p>Actions就是在系统中各个模块之间传递的消息载体，作者觉得应该使用标准的Flux Action模式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
{
  type: 'USER_LOGIN_REQUEST',
  payload: {
    username: '...',
    password: '...'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>
{
  <span class="hljs-attribute">type</span>: <span class="hljs-string">'USER_LOGIN_REQUEST'</span>,
  payload: {
    username: <span class="hljs-string">'...'</span>,
    password: <span class="hljs-string">'...'</span>
  }
}</code></pre>
<p>其中的<code>type</code>属性表明该Action所代表的操作而<code>payload</code>中包含了相关的数据。另外，在某些情况下Action中没有带有Payload,因此可以使用Partial Application方式来创建标准的Action请求:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var createAction = function (type) {
  if (!type) {
    throw new Error('Please, provide action\'s type.');
  } else {
    return function (payload) {
      return dispatcher.dispatch({ type: type, payload: payload });
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>
<span class="hljs-keyword">var</span> createAction = function (<span class="hljs-class"><span class="hljs-keyword">type</span>) </span>{
  <span class="hljs-keyword">if</span> (!<span class="hljs-class"><span class="hljs-keyword">type</span>) </span>{
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-type">Error</span>(<span class="hljs-symbol">'Please</span>, provide action\<span class="hljs-symbol">'s</span> <span class="hljs-class"><span class="hljs-keyword">type</span>.')</span>;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> function (payload) {
      <span class="hljs-keyword">return</span> dispatcher.dispatch({ <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-class"><span class="hljs-keyword">type</span>, <span class="hljs-title">payload</span></span>: payload });
    }
  }
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006112125" src="https://static.alili.tech/img/remote/1460000006112125" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader12">Final Code</h2>
<p>上文我们已经了解了核心的Dispatcher与Action的构造过程，那么在这里我们将这二者组合起来:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var createSubscriber = function (store) {
  return dispatcher.register(store);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>
<span class="hljs-keyword">var</span> createSubscriber = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(store)</span> </span>{
  <span class="hljs-keyword">return</span> dispatcher.register(store);
}</code></pre>
<p>并且为了不直接暴露dispatcher对象，我们可以允许用户使用<code>createAction</code>与<code>createSubscriber</code>这两个函数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var Dispatcher = function () {
  return {
    _stores: [],
    register: function (store) {
      if (!store || !store.update) {
        throw new Error('You should provide a store that has an `update` method.');
      } else {
        var consumers = [];
        var change = function () {
          consumers.forEach(function (l) {
            l(store);
          });
        };
        var subscribe = function (consumer, noInit) {
          consumers.push(consumer);
          !noInit ? consumer(store) : null;
        };

        this._stores.push({ store: store, change: change });
        return subscribe;
      }
      return false;
    },
    dispatch: function (action) {
      if (this._stores.length > 0) {
        this._stores.forEach(function (entry) {
          entry.store.update(action, entry.change);
        });
      }
    }
  }
};

module.exports = {
  create: function () {
    var dispatcher = Dispatcher();

    return {
      createAction: function (type) {
        if (!type) {
          throw new Error('Please, provide action\'s type.');
        } else {
          return function (payload) {
            return dispatcher.dispatch({ type: type, payload: payload });
          }
        }
      },
      createSubscriber: function (store) {
        return dispatcher.register(store);
      }
    }
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-keyword">var</span> Dispatcher = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">_stores</span>: [],
    <span class="hljs-attr">register</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">store</span>) </span>{
      <span class="hljs-keyword">if</span> (!store || !store.update) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'You should provide a store that has an `update` method.'</span>);
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">var</span> consumers = [];
        <span class="hljs-keyword">var</span> change = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          consumers.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">l</span>) </span>{
            l(store);
          });
        };
        <span class="hljs-keyword">var</span> subscribe = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">consumer, noInit</span>) </span>{
          consumers.push(consumer);
          !noInit ? consumer(store) : <span class="hljs-literal">null</span>;
        };

        <span class="hljs-keyword">this</span>._stores.push({ <span class="hljs-attr">store</span>: store, <span class="hljs-attr">change</span>: change });
        <span class="hljs-keyword">return</span> subscribe;
      }
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    },
    <span class="hljs-attr">dispatch</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">action</span>) </span>{
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._stores.length &gt; <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">this</span>._stores.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">entry</span>) </span>{
          entry.store.update(action, entry.change);
        });
      }
    }
  }
};

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">create</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> dispatcher = Dispatcher();

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">createAction</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">type</span>) </span>{
        <span class="hljs-keyword">if</span> (!type) {
          <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Please, provide action\'s type.'</span>);
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">payload</span>) </span>{
            <span class="hljs-keyword">return</span> dispatcher.dispatch({ <span class="hljs-attr">type</span>: type, <span class="hljs-attr">payload</span>: payload });
          }
        }
      },
      <span class="hljs-attr">createSubscriber</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">store</span>) </span>{
        <span class="hljs-keyword">return</span> dispatcher.register(store);
      }
    }
  }
};</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006112127" src="https://static.alili.tech/img/remote/1460000006112127" alt="" title="" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React设计模式:深入理解React&Redux原理套路

## 原文链接
[https://segmentfault.com/a/1190000006112093](https://segmentfault.com/a/1190000006112093)

