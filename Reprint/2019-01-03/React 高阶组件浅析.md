---
title: 'React 高阶组件浅析' 
date: 2019-01-03 2:30:10
hidden: true
slug: ejcjhjmgt8
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">背景</h2>
<p>高阶组件的这种写法的诞生来自于社区的实践，目的是解决一些交叉问题(Cross-Cutting Concerns)。而最早时候 <code>React</code> 官方给出的解决方案是使用 <code>mixin</code> 。而 React 也在官网中写道：</p>
<blockquote><p>We previously recommended mixins as a way to handle cross-cutting concerns. We've since realized that mixins create more trouble than they are worth.</p></blockquote>
<p>官方明显也意识到了使用<code>mixins</code>技术来解决此类问题所带来的困扰远高于其本身的价值。<a href="https://react.bootcss.com/react/blog/2016/07/13/mixins-considered-harmful.html" rel="nofollow noreferrer" target="_blank">更多资料</a>可以查阅官方的说明。</p>
<h2 id="articleHeader1">高阶函数的定义</h2>
<p>说到高阶组件，就不得不先简单的介绍一下高阶函数。下面展示一个最简单的高阶函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const add = (x,y,f) => f(x)+f(y)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> add = <span class="hljs-function">(<span class="hljs-params">x,y,f</span>) =&gt;</span> f(x)+f(y)</code></pre>
<p>当我们调用<code>add(-5, 6, Math.abs)</code>时，参数 x，y 和f 分别接收 -5，6 和 <code>Math.abs</code>，根据函数定义，我们可以推导计算过程为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="x ==> -5
y ==> 6
f ==> abs
f(x) + f(y) ==> Math.abs(-5) + Math.abs(6) ==> 11" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-function"><span class="hljs-title">x</span> ==&gt;</span> <span class="hljs-number">-5</span>
<span class="hljs-function"><span class="hljs-title">y</span> ==&gt;</span> <span class="hljs-number">6</span>
<span class="hljs-function"><span class="hljs-title">f</span> ==&gt;</span> abs
f(x) + f(y) =<span class="hljs-function">=&gt;</span> Math.abs(<span class="hljs-number">-5</span>) + Math.abs(<span class="hljs-number">6</span>) =<span class="hljs-function">=&gt;</span> <span class="hljs-number">11</span></code></pre>
<p>用代码验证一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="add(-5, 6, Math.abs); //11" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">add(<span class="hljs-number">-5</span>, <span class="hljs-number">6</span>, <span class="hljs-built_in">Math</span>.abs); <span class="hljs-comment">//11</span></code></pre>
<p>高阶在维基百科的定义如下</p>
<blockquote>
<p>高阶函数是至少满足下列一个条件的函数：</p>
<ul>
<li><p>接受一个或多个函数作为输入</p></li>
<li><p>输出一个函数</p></li>
</ul>
</blockquote>
<h2 id="articleHeader2">高阶组件的定义</h2>
<p>那么，什么是高阶组件呢？类比高阶函数的定义，<strong>高阶组件就是接受一个组件作为参数并返回一个新组件的函数</strong>。这里需要注意<strong>高阶组件是一个函数</strong>，并不是组件，这一点一定要注意。<br>同时这里强调一点高阶组件本身并不是 <code>React</code> API。它只是一种模式，这种模式是由 <code>React</code> 自身的组合性质必然产生的。<br>更加通俗的讲，高阶组件通过包裹（wrapped）被传入的React组件，经过一系列处理，最终返回一个相对增强（enhanced）的 React 组件，供其他组件调用。</p>
<p>&lt;!-- more --&gt;</p>
<h2 id="articleHeader3">一个简单的高阶组件</h2>
<p>下面我们来实现一个简单的高阶组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default WrappedComponent => class HOC extends Component {
  render() {
    return (
      <fieldset>
        <legend>默认标题</legend>
        <WrappedComponent {...this.props} />
      </fieldset>
    );
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> WrappedComponent =&gt; <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HOC</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">fieldset</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">legend</span>&gt;</span>默认标题<span class="hljs-tag">&lt;/<span class="hljs-name">legend</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">WrappedComponent</span> {<span class="hljs-attr">...this.props</span>} /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">fieldset</span>&gt;</span>
    );
  }
};</span></code></pre>
<p>在其他组件中，我们引用这个高阶组件来强化它</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class Demo extends Component {
  render() {
    return (
      <div>
        我是一个普通组件
      </div>
    );
  }
}

const WithHeaderDemo = withHeader(Demo);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Demo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        我是一个普通组件
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}

<span class="hljs-keyword">const</span> WithHeaderDemo = withHeader(Demo);</code></pre>
<p>下面我们来看一下<code>React DOM Tree</code>，调用了高阶组件之后，发生了什么：<br><span class="img-wrap"><img data-src="/img/remote/1460000010845415" src="https://static.alili.tech/img/remote/1460000010845415" alt="图片" title="图片" style="cursor: pointer;"></span></p>
<p>可以看到，<code>Demo</code> 被 <code>HOC</code> 包裹(wrapped)了之后添加了一个标题默认标题。但是同样会发现，如果调用了多个 <code>HOC</code> 之后，我们会看到很多的<code>HOC</code>，所以应<br>该做一些优化，也就是在高阶组件包裹(wrapped)以后，应该保留原有的名称。</p>
<p>我们改写一下上述的高阶组件代码，增加一个 <code>getDisplayName</code> 函数，之后为<code>Demo</code> 添加一个静态属性 <code>displayName</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const getDisplayName = component => component.displayName || component.name || 'Component';

export default WrappedComponent => class HOC extends Component {
  static displayName = `HOC(${getDisplayName(WrappedComponent)})`;

  render() {
    return (
      <fieldset>
        <legend>默认标题</legend>
        <WrappedComponent {...this.props} />
      </fieldset>
    );
  }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> getDisplayName = <span class="hljs-function"><span class="hljs-params">component</span> =&gt;</span> component.displayName || component.name || <span class="hljs-string">'Component'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> WrappedComponent =&gt; <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HOC</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">static</span> displayName = <span class="hljs-string">`HOC(<span class="hljs-subst">${getDisplayName(WrappedComponent)}</span>)`</span>;

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">fieldset</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">legend</span>&gt;</span>默认标题<span class="hljs-tag">&lt;/<span class="hljs-name">legend</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">WrappedComponent</span> {<span class="hljs-attr">...this.props</span>} /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">fieldset</span>&gt;</span>
    );
  }
};
</span></code></pre>
<p>再次观察<code>React DOM Tree</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010845416" src="https://static.alili.tech/img/remote/1460000010845416" alt="图片" title="图片" style="cursor: pointer;"></span></p>
<p>可以看到，该组件原本的名称已经显示在<code>React DOM Tree</code>上了。<br>这个HOC 的功能是为原有的组件添加一个标题，也就是说所有需要添加标题的组件都可以通过调用此 HOC 进行包裹(wrapped) 后实现此功能。</p>
<h2 id="articleHeader4">为高阶组件传参</h2>
<p>现在，我们的 <code>HOC</code> 已经可以为其他任意组件提供标题了，但是我们还希望可以修改标题中的字段。由于我们的高阶组件是一个函数，所以可以为其添加一个参数<code>title</code>。下面我们对<code>HOC</code>进行改写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default (WrappedComponent, title = '默认标题') => class HOC extends Component {
  static displayName = `HOC(${getDisplayName(WrappedComponent)})`;

  render() {
    return (
      <fieldset>
        <legend>{title}</legend>
        <WrappedComponent {...this.props} />
      </fieldset>
    );
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> (WrappedComponent, title = <span class="hljs-string">'默认标题'</span>) =&gt; <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HOC</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">static</span> displayName = <span class="hljs-string">`HOC(<span class="hljs-subst">${getDisplayName(WrappedComponent)}</span>)`</span>;

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">fieldset</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">legend</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">legend</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">WrappedComponent</span> {<span class="hljs-attr">...this.props</span>} /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">fieldset</span>&gt;</span>
    );
  }
};</span></code></pre>
<p>之后我们进行调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const WithHeaderDemo = withHeader(Demo,'高阶组件添加标题');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> WithHeaderDemo = withHeader(Demo,<span class="hljs-string">'高阶组件添加标题'</span>);</code></pre>
<p>此时观察<code>React DOM Tree</code>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010845417" src="https://static.alili.tech/img/remote/1460000010845417" alt="图片" title="图片" style="cursor: pointer;"></span></p>
<p>可以看到，标题已经正确的进行了设置。</p>
<p>当然我们也可以对其进行柯里化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default (title = '默认标题') => WrappedComponent => class HOC extends Component {
  static displayName = `HOC(${getDisplayName(WrappedComponent)})`;

  render() {
    return (
      <fieldset>
        <legend>{title}</legend>
        <WrappedComponent {...this.props} />
      </fieldset>
    );
  }
};

const WithHeaderDemo = withHeader('高阶组件添加标题')(Demo);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> (title = <span class="hljs-string">'默认标题'</span>) =&gt; <span class="hljs-function"><span class="hljs-params">WrappedComponent</span> =&gt;</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HOC</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">static</span> displayName = <span class="hljs-string">`HOC(<span class="hljs-subst">${getDisplayName(WrappedComponent)}</span>)`</span>;

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">fieldset</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">legend</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">legend</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">WrappedComponent</span> {<span class="hljs-attr">...this.props</span>} /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">fieldset</span>&gt;</span>
    );
  }
};

const WithHeaderDemo = withHeader('高阶组件添加标题')(Demo);</span></code></pre>
<h2 id="articleHeader5">常见的HOC 实现方式</h2>
<h3 id="articleHeader6">基于属性代理（Props Proxy）的方式</h3>
<p>属性代理是最常见的高阶组件的使用方式，上面所说的高阶组件就是这种方式。<br>它通过做一些操作，将被包裹组件的<code>props</code>和新生成的<code>props</code>一起传递给此组件，这称之为属性代理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function GenerateId(WrappedComponent) {
  return class HOC extends Component {
    static displayName = `PropsBorkerHOC(${getDisplayName(WrappedComponent)})`;

    render() {
      const newProps = {
        id: Math.random().toString(36).substring(2).toUpperCase()
      };

      return createElement(WrappedComponent, {
        ...this.props,
        ...newProps
      });
    }
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">GenerateId</span>(<span class="hljs-params">WrappedComponent</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HOC</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">static</span> displayName = <span class="hljs-string">`PropsBorkerHOC(<span class="hljs-subst">${getDisplayName(WrappedComponent)}</span>)`</span>;

    render() {
      <span class="hljs-keyword">const</span> newProps = {
        <span class="hljs-attr">id</span>: <span class="hljs-built_in">Math</span>.random().toString(<span class="hljs-number">36</span>).substring(<span class="hljs-number">2</span>).toUpperCase()
      };

      <span class="hljs-keyword">return</span> createElement(WrappedComponent, {
        ...this.props,
        ...newProps
      });
    }
  };
}</code></pre>
<p>调用<code>GenerateId</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const PropsBorkerDemo = GenerateId(Demo);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> PropsBorkerDemo = GenerateId(Demo);</code></pre>
<p>之后我们观察<code>React Dom Tree</code>：<br><span class="img-wrap"><img data-src="/img/remote/1460000010845418" src="https://static.alili.tech/img/remote/1460000010845418" alt="图片" title="图片" style="cursor: pointer;"></span><br>可以看到我们通过 <code>GenerateId</code> 顺利的为 <code>Demo</code> 添加了 <code>id</code>。</p>
<h3 id="articleHeader7">基于反向继承（Inheritance Inversion）的方式</h3>
<p>首先来看一个简单的反向继承的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function (WrappedComponent) {
  return class Enhancer extends WrappedComponent {
    static displayName = `InheritanceHOC(${getDisplayName(WrappedComponent)})`;

    componentWillMount() {
      // 可以方便地得到state，做一些更深入的修改。
      this.setState({
        innerText: '我被Inheritance修改了值'
      });
    }

    render() {
      return super.render();
    }
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">WrappedComponent</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Enhancer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">WrappedComponent</span> </span>{
    <span class="hljs-keyword">static</span> displayName = <span class="hljs-string">`InheritanceHOC(<span class="hljs-subst">${getDisplayName(WrappedComponent)}</span>)`</span>;

    componentWillMount() {
      <span class="hljs-comment">// 可以方便地得到state，做一些更深入的修改。</span>
      <span class="hljs-keyword">this</span>.setState({
        <span class="hljs-attr">innerText</span>: <span class="hljs-string">'我被Inheritance修改了值'</span>
      });
    }

    render() {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">super</span>.render();
    }
  };
}</code></pre>
<p>如你所见返回的高阶组件类（<code>Enhancer</code>）继承了 <code>WrappedComponent</code>。而之所以被称为反向继承是因为 <code>WrappedComponent</code> 被动地被 <code>Enhancer</code> <br>继承，而不是 <code>WrappedComponent</code> 去继承 <code>Enhancer</code>。通过这种方式他们之间的关系倒转了。</p>
<p>反向继承允许高阶组件通过 <code>this</code> 关键词获取 <code>WrappedComponent</code>，意味着它可以获取到 <code>state</code>，<code>props</code>，组件生命周期（Component Lifecycle）钩子，以及渲染方法（render）。<a href="http://www.jianshu.com/p/0aae7d4d9bc1" rel="nofollow noreferrer" target="_blank">深入了解</a>可以阅读__@Wenliang__文章中<code>Inheritance Inversion（II）</code>这一节的内容。</p>
<h2 id="articleHeader8">使用高阶组件遇到的问题</h2>
<h3 id="articleHeader9">静态方法丢失</h3>
<p>当使用高阶组件包装组件，原始组件被容器组件包裹，也就意味着新组件会丢失原始组件的所有静态方法。<br>下面为 Demo 添加一个静态方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Demo.getDisplayName = () => 'Demo';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">Demo.getDisplayName = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-string">'Demo'</span>;</code></pre>
<p>之后调用 <code>HOC</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用高阶组件
const WithHeaderDemo = HOC(Demo);

// 调用后的组件是没有 `getDisplayName` 方法的
typeof WithHeaderDemo.getDisplayName === 'undefined' // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 使用高阶组件</span>
<span class="hljs-keyword">const</span> WithHeaderDemo = HOC(Demo);

<span class="hljs-comment">// 调用后的组件是没有 `getDisplayName` 方法的</span>
<span class="hljs-keyword">typeof</span> WithHeaderDemo.getDisplayName === <span class="hljs-string">'undefined'</span> <span class="hljs-comment">// true</span></code></pre>
<p>解决这个问题最简单(Yǘ Chǚn)的方法就是，将原始组件的所有静态方法全部拷贝给新组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default (title = '默认标题') => (WrappedComponent) => {
  class HOC extends Component {
    static displayName = `HOC(${getDisplayName(WrappedComponent)})`;

    render() {
      return (
        <fieldset>
          <legend>{title}</legend>
          <WrappedComponent {...this.props} />
        </fieldset>
      );
    }
  }

 HOC.getDisplayName = WrappedComponent.getDisplayName;

  return HOC;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> (title = <span class="hljs-string">'默认标题'</span>) =&gt; <span class="hljs-function">(<span class="hljs-params">WrappedComponent</span>) =&gt;</span> {
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HOC</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">static</span> displayName = <span class="hljs-string">`HOC(<span class="hljs-subst">${getDisplayName(WrappedComponent)}</span>)`</span>;

    render() {
      <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">fieldset</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">legend</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">legend</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">WrappedComponent</span> {<span class="hljs-attr">...this.props</span>} /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">fieldset</span>&gt;</span>
      );
    }
  }

 HOC.getDisplayName = WrappedComponent.getDisplayName;

  return HOC;
};</span></code></pre>
<p>这样做，就需要你清楚的知道都有哪些静态方法需要拷贝的。或者你也可是使用<a href="https://github.com/mridgway/hoist-non-react-statics" rel="nofollow noreferrer" target="_blank">hoist-non-react-statics</a>来帮你自动处理，它会自动拷贝所有非React的静态方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import hoistNonReactStatic from 'hoist-non-react-statics';

export default (title = '默认标题') => (WrappedComponent) => {
  class HOC extends Component {
    static displayName = `HOC(${getDisplayName(WrappedComponent)})`;

    render() {
      return (
        <fieldset>
          <legend>{title}</legend>
          <WrappedComponent {...this.props} />
        </fieldset>
      );
    }
  }

  // 拷贝静态方法
  hoistNonReactStatic(HOC, WrappedComponent);

  return HOC;
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> hoistNonReactStatic <span class="hljs-keyword">from</span> <span class="hljs-string">'hoist-non-react-statics'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> (title = <span class="hljs-string">'默认标题'</span>) =&gt; <span class="hljs-function">(<span class="hljs-params">WrappedComponent</span>) =&gt;</span> {
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HOC</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">static</span> displayName = <span class="hljs-string">`HOC(<span class="hljs-subst">${getDisplayName(WrappedComponent)}</span>)`</span>;

    render() {
      <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">fieldset</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">legend</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">legend</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">WrappedComponent</span> {<span class="hljs-attr">...this.props</span>} /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">fieldset</span>&gt;</span>
      );
    }
  }

  // 拷贝静态方法
  hoistNonReactStatic(HOC, WrappedComponent);

  return HOC;
};
</span></code></pre>
<h3 id="articleHeader10">Refs属性不能传递</h3>
<p>一般来说，高阶组件可以传递所有的props属性给包裹的组件，但是不能传递 <code>refs</code> 引用。因为并不是像 <code>key</code> 一样，<code>refs</code> 是一个伪属性，<code>React</code> 对它进行了特殊处理。<br>如果你向一个由高级组件创建的组件的元素添加 <code>ref</code> 应用，那么 <code>ref</code> 指向的是最外层容器组件实例的，而不是包裹组件。<br>但有的时候，我们不可避免要使用 <code>refs</code>，官方给出的解决方案是：</p>
<blockquote><p>传递一个ref回调函数属性，也就是给ref应用一个不同的名字</p></blockquote>
<p>同时还强调道：<strong>React在任何时候都不建议使用 ref应用</strong><br>改写 <code>Demo</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Demo extends Component {
  static propTypes = {
    getRef: PropTypes.func
  }

  static getDisplayName() {
    return 'Demo';
  }

  constructor(props) {
    super(props);
    this.state = {
      innerText: '我是一个普通组件'
    };
  }

  render() {
    const { getRef, ...props } = this.props;
    return (
      <div ref={getRef} {...props}>
        {this.state.innerText}
      </div>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Demo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">static</span> propTypes = {
    <span class="hljs-attr">getRef</span>: PropTypes.func
  }

  <span class="hljs-keyword">static</span> getDisplayName() {
    <span class="hljs-keyword">return</span> <span class="hljs-string">'Demo'</span>;
  }

  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">innerText</span>: <span class="hljs-string">'我是一个普通组件'</span>
    };
  }

  render() {
    <span class="hljs-keyword">const</span> { getRef, ...props } = <span class="hljs-keyword">this</span>.props;
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{getRef}</span> {<span class="hljs-attr">...props</span>}&gt;</span>
        {this.state.innerText}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}</code></pre>
<p>之后我们进行调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<WithHeaderDemo
  getRef={(ref) => {
    // 该回调函数被作为常规的props属性传递
    this.headerDemo = ref;
  "}}"
/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;WithHeaderDemo
  getRef={(ref) =&gt; {
    <span class="hljs-comment">// 该回调函数被作为常规的props属性传递</span>
    <span class="hljs-keyword">this</span>.headerDemo = ref;
  "}}"
/&gt;</code></pre>
<p>虽然这并不是最完美的解决方案，但是<code>React</code>官方说他们正在探索解决这个问题的方法，能够让我们安心的使用高阶组件而不必关注这个问题。</p>
<h2 id="articleHeader11">结语</h2>
<p>这篇文章只是简单的介绍了高阶组件的两种最常见的使用方式：<code>属性代理</code>和<code>反向继承</code>。以及高阶组件的常见问题。希望通过本文的阅读使你对高阶组件有一个基本的认识。<br>写本文所产生的代码在<a href="https://github.com/hiyangguo/study-hoc" rel="nofollow noreferrer" target="_blank">study-hoc</a>中。</p>
<blockquote><p>本文作者：<a href="https://github.com/hiyangguo" rel="nofollow noreferrer" target="_blank">Godfery</a><br>本文同步发表于：<a href="http://blog.hypers.io/2017/08/24/react-hoc-simple-analysis/" rel="nofollow noreferrer" target="_blank">HYPERS 前端博客</a></p></blockquote>
<p>参考文章:</p>
<blockquote><p><a href="https://facebook.github.io/react/docs/higher-order-components.html" rel="nofollow noreferrer" target="_blank">Higher-Order Components</a><br><a href="https://mp.weixin.qq.com/s/AdP-3oA9ofv9hQfDc2r7KA" rel="nofollow noreferrer" target="_blank">深入浅出React高阶组件</a><br><a href="https://juejin.im/post/59818a485188255694568ff2" rel="nofollow noreferrer" target="_blank">带着三个问题一起深入浅出React高阶组件</a><br><a href="http://t.cn/RKWUqko" rel="nofollow noreferrer" target="_blank">阮一峰 - 高阶函数</a><br><a href="http://www.jianshu.com/p/0aae7d4d9bc1" rel="nofollow noreferrer" target="_blank">深入理解高阶组件</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 高阶组件浅析

## 原文链接
[https://segmentfault.com/a/1190000010845410](https://segmentfault.com/a/1190000010845410)

