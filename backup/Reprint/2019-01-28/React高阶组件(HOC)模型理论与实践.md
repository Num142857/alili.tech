---
title: 'React高阶组件(HOC)模型理论与实践' 
date: 2019-01-28 2:30:09
hidden: true
slug: jz8mfdr5gc
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">什么是HOC?</h2>
<p>HOC(全称Higher-order component)是一种React的进阶使用方法，主要还是为了便于组件的复用。HOC就是一个方法，获取一个组件，返回一个更高级的组件。</p>
<h2 id="articleHeader1">什么时候使用HOC?</h2>
<p>在React开发过程中，发现有很多情况下，组件需要被"增强"，比如说给组件添加或者修改一些特定的props，一些权限的管理，或者一些其他的优化之类的。而如果这个功能是针对多个组件的，同时每一个组件都写一套相同的代码，明显显得不是很明智，所以就可以考虑使用HOC。</p>
<p>栗子：react-redux的connect方法就是一个HOC，他获取wrappedComponent，在connect中给wrappedComponent添加需要的props。</p>
<h2 id="articleHeader2">HOC的简单实现</h2>
<p>HOC不仅仅是一个方法，确切说应该是一个组件工厂，获取低阶组件，生成高阶组件。</p>
<p>一个最简单的HOC实现是这个样子的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function HOCFactory(WrappedComponent) {
  return class HOC extends React.Component {
    render(){
      return <WrappedComponent {...this.props} />
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">HOCFactory</span>(<span class="hljs-params">WrappedComponent</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HOC</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render(){
      <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">WrappedComponent</span> {<span class="hljs-attr">...this.props</span>} /&gt;</span>
    }
  }
}</span></code></pre>
<h2 id="articleHeader3">HOC可以做什么？</h2>
<ul>
<li>代码复用，代码模块化</li>
<li>增删改props</li>
<li>渲染劫持</li>
</ul>
<p>其实，除了代码复用和模块化，HOC做的其实就是<strong>劫持</strong>，由于传入的wrappedComponent是作为一个child进行渲染的，上级传入的props都是直接传给HOC的，所以HOC组件拥有很大的权限去修改props和控制渲染。</p>
<h3 id="articleHeader4">增删改props</h3>
<p>可以通过对传入的props进行修改，或者添加新的props来达到增删改props的效果。</p>
<p>比如你想要给wrappedComponent增加一个props，可以这么搞：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function control(wrappedComponent) {
  return class Control extends React.Component {
    render(){
      let props = {
        ...this.props,
        message: &quot;You are under control&quot;
      };
      return <wrappedComponent {...props} />
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">control</span>(<span class="hljs-params">wrappedComponent</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Control</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render(){
      <span class="hljs-keyword">let</span> props = {
        ...this.props,
        <span class="hljs-attr">message</span>: <span class="hljs-string">"You are under control"</span>
      };
      <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">wrappedComponent</span> {<span class="hljs-attr">...props</span>} /&gt;</span>
    }
  }
}</span></code></pre>
<p>这样，你就可以在你的组件中使用message这个props:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyComponent extends React.Component {
  render(){
    return <div>{this.props.message}</div>
  }
}

export default control(MyComponent);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render(){
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{this.props.message}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> control(MyComponent);</code></pre>
<h3 id="articleHeader5">渲染劫持</h3>
<p>这里的渲染劫持并不是你能控制它渲染的细节，而是控制是否去渲染。由于细节属于组件内部的render方法控制，所以你无法控制渲染细节。</p>
<p>比如，组件要在data没有加载完的时候，现实loading...，就可以这么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function loading(wrappedComponent) {
  return class Loading extends React.Component {
    render(){
      if(!this.props.data) {
        return <div>loading...</div>
      }
      return <wrappedComponent {...props} />
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loading</span>(<span class="hljs-params">wrappedComponent</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Loading</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render(){
      <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.props.data) {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      }
      <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">wrappedComponent</span> {<span class="hljs-attr">...props</span>} /&gt;</span>
    }
  }
}</span></code></pre>
<p>这个样子，在父级没有传入data的时候，这一块儿就只会显示loading...,不会显示组件的具体内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyComponent extends React.Component {
  render(){
    return <div>{this.props.data}</div>
  }
}

export default control(MyComponent);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render(){
    <span class="hljs-keyword">return</span> &lt;div&gt;{<span class="hljs-keyword">this</span>.props.data}&lt;/div&gt;
  }
}

export <span class="hljs-keyword">default</span> control(<span class="hljs-type">MyComponent</span>);</code></pre>
<h2 id="articleHeader6">HOC有什么用例？</h2>
<h3 id="articleHeader7">React Redux</h3>
<p>最经典的就是React Redux的connect方法(具体在<a href="https://github.com/reactjs/react-redux/blob/master/src/components/connectAdvanced.js" rel="nofollow noreferrer" target="_blank">connectAdvanced</a>中实现)。</p>
<p>通过这个HOC方法，监听redux store，然后把下级组件需要的state(通过mapStateToProps获取)和action creator(通过mapDispatchToProps获取)绑定到wrappedComponent的props上。</p>
<h3 id="articleHeader8">logger和debugger</h3>
<p>这个是<a href="https://facebook.github.io/react/docs/higher-order-components.html#dont-mutate-the-original-component.-use-composition." rel="nofollow noreferrer" target="_blank">官网上的一个示例</a>，可以用来监控父级组件传入的props的改变:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function logProps(WrappedComponent) {
  return class extends React.Component {
    componentWillReceiveProps(nextProps) {
      console.log(`WrappedComponent: ${WrappedComponent.displayName}, Current props: `, this.props);
      console.log(`WrappedComponent: ${WrappedComponent.displayName}, Next props: `, nextProps);
    }
    render() {
      // Wraps the input component in a container, without mutating it. Good!
      return <WrappedComponent {...this.props} />;
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logProps</span>(<span class="hljs-params">WrappedComponent</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    componentWillReceiveProps(nextProps) {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`WrappedComponent: <span class="hljs-subst">${WrappedComponent.displayName}</span>, Current props: `</span>, <span class="hljs-keyword">this</span>.props);
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`WrappedComponent: <span class="hljs-subst">${WrappedComponent.displayName}</span>, Next props: `</span>, nextProps);
    }
    render() {
      <span class="hljs-comment">// Wraps the input component in a container, without mutating it. Good!</span>
      <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">WrappedComponent</span> {<span class="hljs-attr">...this.props</span>} /&gt;</span>;
    }
  }
}</span></code></pre>
<h3 id="articleHeader9">页面权限管理</h3>
<p>可以通过HOC对组件进行包裹，当跳转到当前页面的时候，检查用户是否含有对应的权限。如果有的话，渲染页面。如果没有的话，跳转到其他页面(比如无权限页面，或者登陆页面)。</p>
<p>也可以给当前组件提供权限的API，页面内部也可以进行权限的逻辑判断。</p>
<p>本来准备把详细代码当个栗子贴出来的，结果突然想到公司保密协议，所以。。。</p>
<h2 id="articleHeader10">使用HOC需要注意什么？</h2>
<h3 id="articleHeader11">尽量不要随意修改下级组件需要的props</h3>
<p>之所以这么说，是因为修改父级传给下级的props是有一定风险的，可能会造成下级组件发生错误。比如，原本需要一个name的props，但是在HOC中给删掉了，那么下级组件或许就无法正常渲染，甚至报错。</p>
<h3 id="articleHeader12">Ref无法获取你想要的ref</h3>
<p>以前你在父组件中使用<code>&lt;component ref="component"/&gt;</code>的时候，你可以直接通过<code>this.refs.component</code>进行获取。但是因为这里的component经过HOC的封装，已经是HOC里面的那个component了，所以你无法获取你想要的那个ref(wrappedComponent的ref)。</p>
<p>要解决这个问题，这里有两个方法：</p>
<p><strong>a)</strong> 像React Redux的connect方法一样，在里面添加一个参数，比如<code>withRef</code>，组件中检查到这个flag了，就给下级组件添加一个ref，并通过getWrappedInstance方法获取。</p>
<p>栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function HOCFactory(wrappedComponent) {
  return class HOC extends React.Component {
    getWrappedInstance = ()=>{
      if(this.props.widthRef) {
        return this.wrappedInstance;
      }
    }

    setWrappedInstance = (ref)=>{
      this.wrappedInstance = ref;
    }

    render(){
      let props = {
        ...this.props
      };

      if(this.props.withRef) {
        props.ref = this.setWrappedInstance;
      }

      return <wrappedComponent {...props} />
    }
  }
}

export default HOCFactory(MyComponent);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>function <span class="hljs-type">HOCFactory</span>(wrappedComponent) {
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HOC</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    getWrappedInstance = ()=&gt;{
      <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.props.widthRef) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.wrappedInstance;
      }
    }

    setWrappedInstance = (ref)=&gt;{
      <span class="hljs-keyword">this</span>.wrappedInstance = ref;
    }

    render(){
      let props = {
        ...<span class="hljs-keyword">this</span>.props
      };

      <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.props.withRef) {
        props.ref = <span class="hljs-keyword">this</span>.setWrappedInstance;
      }

      <span class="hljs-keyword">return</span> &lt;wrappedComponent {...props} /&gt;
    }
  }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">HOCFactory</span>(<span class="hljs-type">MyComponent</span>);</code></pre>
<p>这样子你就可以在父组件中这样获取MyComponent的ref值了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ParentCompoent extends React.Component {
  doSomethingWithMyComponent(){
    let instance = this.refs.child.getWrappedInstance();
    // ....
  }

  render(){
    return <MyComponent ref=&quot;child&quot; withRef />
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ParentCompoent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  doSomethingWithMyComponent(){
    let instance = <span class="hljs-keyword">this</span>.refs.child.getWrappedInstance();
    <span class="hljs-comment">// ....</span>
  }

  render(){
    <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">MyComponent</span> ref=<span class="hljs-string">"child"</span> withRef /&gt;
  }
}</code></pre>
<p><strong>b)</strong> 还有一种方法，在<a href="https://facebook.github.io/react/docs/higher-order-components.html#refs-arent-passed-through" rel="nofollow noreferrer" target="_blank">官网中有提到过</a>：<br>父级通过传递一个方法，来获取ref，具体看栗子：</p>
<p>先看父级组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ParentCompoent extends React.Component {
  getInstance = (ref)=>{
    this.wrappedInstance = ref;
  }

  render(){
    return <MyComponent getInstance={this.getInstance} />
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ParentCompoent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  getInstance = (ref)=&gt;{
    <span class="hljs-keyword">this</span>.wrappedInstance = ref;
  }

  render(){
    <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">MyComponent</span> getInstance={<span class="hljs-keyword">this</span>.getInstance} /&gt;
  }
}</code></pre>
<p>HOC里面把getInstance方法当作ref的方法传入就好</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function HOCFactory(wrappedComponent) {
  return class HOC extends React.Component {
    render(){
      let props = {
        ...this.props
      };

      if(typeof this.props.getInstance === &quot;function&quot;) {
        props.ref = this.props.getInstance;
      }

      return <wrappedComponent {...props} />
    }
  }
}

export default HOCFactory(MyComponent);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>function <span class="hljs-type">HOCFactory</span>(wrappedComponent) {
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HOC</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render(){
      let props = {
        ...<span class="hljs-keyword">this</span>.props
      };

      <span class="hljs-keyword">if</span>(typeof <span class="hljs-keyword">this</span>.props.getInstance === <span class="hljs-string">"function"</span>) {
        props.ref = <span class="hljs-keyword">this</span>.props.getInstance;
      }

      <span class="hljs-keyword">return</span> &lt;wrappedComponent {...props} /&gt;
    }
  }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">HOCFactory</span>(<span class="hljs-type">MyComponent</span>);</code></pre>
<blockquote>感谢@wmzy的指出，在上面的两个方法<code>getInstance</code>和<code>setWrappedInstance</code>，由于<code>ES6 class</code>的写法并不会自动绑定<code>this</code>，所以<code>需要用bind(this)</code>到两个方法上，确保<code>this</code>的正确性。或者使用箭头函数来写两个方法，ES6的箭头函数会自动绑定<code>this</code>。</blockquote>
<h3 id="articleHeader13">Component上面绑定的Static方法会丢失</h3>
<p>比如，你原来在Component上面绑定了一些static方法<code>MyComponent.staticMethod = o=&gt;o</code>。但是由于经过HOC的包裹，父级组件拿到的已经不是原来的组件了，所以当然无法获取到staticMethod方法了。</p>
<p>官网上的示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 定义一个static方法
WrappedComponent.staticMethod = function() {/*...*/}
// 利用HOC包裹
const EnhancedComponent = enhance(WrappedComponent);

// 返回的方法无法获取到staticMethod
typeof EnhancedComponent.staticMethod === 'undefined' // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 定义一个static方法</span>
WrappedComponent.staticMethod = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{<span class="hljs-comment">/*...*/</span>}
<span class="hljs-comment">// 利用HOC包裹</span>
<span class="hljs-keyword">const</span> EnhancedComponent = enhance(WrappedComponent);

<span class="hljs-comment">// 返回的方法无法获取到staticMethod</span>
<span class="hljs-keyword">typeof</span> EnhancedComponent.staticMethod === <span class="hljs-string">'undefined'</span> <span class="hljs-comment">// true</span></code></pre>
<p>这里有一个解决方法，就是<code>hoist-non-react-statics</code>组件，这个组件会自动把所有绑定在对象上的非React方法都绑定到新的对象上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import hoistNonReactStatic from 'hoist-non-react-statics';
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> hoistNonReactStatic from <span class="hljs-symbol">'hoist</span>-non-react-statics';
function enhance(<span class="hljs-type">WrappedComponent</span>) {
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Enhance</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{<span class="hljs-comment">/*...*/</span>}
  hoistNonReactStatic(<span class="hljs-type">Enhance</span>, <span class="hljs-type">WrappedComponent</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-type">Enhance</span>;
}</code></pre>
<h2 id="articleHeader14">结束语</h2>
<p>当你需要做React插件的时候，HOC模型是一个很实用的模型。</p>
<p>希望这篇文章能帮你对HOC有一个大概的了解和启发。</p>
<p>另外，<a href="https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#.wwp0tbukh" rel="nofollow noreferrer" target="_blank">这篇medium上的文章</a>会给你更多的启发，在这篇文章中，我这里讲的被分为Props Proxy HOC，还有另外一种Inheritance Inversion HOC，强烈推荐看一看。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React高阶组件(HOC)模型理论与实践

## 原文链接
[https://segmentfault.com/a/1190000008112017](https://segmentfault.com/a/1190000008112017)

