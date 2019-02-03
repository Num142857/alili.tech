---
title: 'React 组件性能优化' 
date: 2019-02-04 2:30:58
hidden: true
slug: bcpy0n0sq0b
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">React组件性能优化</h1>
<h3 id="articleHeader1">前言</h3>
<p>众所周知，浏览器的<code>重绘和重排版(reflows &amp; repaints)</code>（DOM操作都会引起）才是导致网页性能问题的关键。而React<code>虚拟DOM</code>的目的就是为了减少浏览器的<code>重绘和重排版</code>。</p>
<p>说到React优化问题，就必须提下<code>虚拟DOM</code>。<code>虚拟DOM</code>是React核心，通过高新的比较算法，实现了对界面上真正变化的部分进行实际的DOM操作（只是说在大部分场景下这种方式更加效率，而不是一定就是最效率的）。虽然<code>虚拟DOM</code>很牛逼（实际开发中我们根本无需关系其是如何运行的），但是也有缺点。如当React组件如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Components>
  <Components-1 />
  <Components-2 />
  <Components-3 />
</Components>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;Components&gt;</span>
  <span class="hljs-section">&lt;Components-1 /&gt;</span>
  <span class="hljs-section">&lt;Components-2 /&gt;</span>
  <span class="hljs-section">&lt;Components-3 /&gt;</span>
<span class="hljs-section">&lt;/Components&gt;</span></code></pre>
<p>数据变化从<code>Components-&gt;Components-1</code>传递下来，React不会只重渲染<code>Components-1</code>和其父组件，React会以变化（props和state的变化）的最上层的组件为准生成对比的<code>虚拟DOM</code>，就导致了组件没必要的重渲染（即组件render方法的运行）。下面的3张图是借用网上的，是对上面组件更新的图表说明。</p>
<ul><li><p>更新绿色点组件（从根组件传递下来应用在绿色组件上的数据发生改变）</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006762530" src="https://static.alili.tech/img/remote/1460000006762530" alt="react 组件渲染 更新子组件" title="react 组件渲染 更新子组件" style="cursor: pointer; display: inline;"></span></p>
<ul><li><p>理想状态我们想只更新绿色点的组件</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006741744" src="https://static.alili.tech/img/remote/1460000006741744" alt="react 组件渲染 理想渲染" title="react 组件渲染 理想渲染" style="cursor: pointer; display: inline;"></span></p>
<ul><li><p>实际图中的组件都会重渲染（黄色的点是不必要的渲染，优化的方向）</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006741747" src="https://static.alili.tech/img/remote/1460000006741747" alt="react 组件渲染 实际渲染" title="react 组件渲染 实际渲染" style="cursor: pointer; display: inline;"></span></p>
<p>React开发团队也考虑到这个问题，为我们提供了一个组件函数处理数据量大的性能问题，<code>shouldComponentUpdate</code>，这个方法是我们的性能优化切入点。</p>
<h3 id="articleHeader2">虚拟DOM</h3>
<p><code>虚拟DOM</code>其实就是一个 JavaScript 对象。 React 使用<code>虚拟DOM</code>来渲染 UI，当组件状态有更改的时候，React 会自动调用组件的&nbsp;<code>render</code>&nbsp;方法重新渲染整个组件的 UI。</p>
<p>当然如果真的这样大面积的操作 DOM，性能会是一个很大的问题，所以 React 实现了一个<em>虚拟 DOM</em>，组件 DOM 结构就是映射到这个虚拟 DOM 上，React 在这个虚拟 DOM 上实现了一个 diff 算法，当要更新组件的时候，会通过 diff 寻找到要变更的 DOM 节点，再把这个修改更新到浏览器实际的 DOM 节点上，所以实际上不是真的渲染整个 DOM 树。这个虚拟 DOM 是一个纯粹的 JS 数据结构，所以性能会比原生 DOM 快很多。</p>
<h3 id="articleHeader3">组件渲染方式</h3>
<p>组件渲染方式有两种<code>初始渲染</code>和<code>更新渲染</code>，而我们需要优化的地方就是更新渲染。</p>
<h3 id="articleHeader4">优化关键<code>shouldComponentUpdate</code>
</h3>
<p>组件更新生命周期中必调用<code>shouldComponentUpdate</code>，字面意思是<strong>组件是否应该更新</strong>。<code>shouldComponentUpdate</code>默认返回<code>true</code>，必更新。所有当我们判断出组件没必要更新是，<code>shouldComponentUpdate</code>可以返回<code>false</code>，就达到优化效果。那如何编写判断代码呢？看下以下几种方式。</p>
<h4>官方PureRenderMixin</h4>
<p>React 官方提供了 PureRenderMixin 插件，其使用方法如下：</p>
<p><a href="https://facebook.github.io/react/docs/pure-render-mixin.html" rel="nofollow noreferrer" target="_blank">官方说明</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//官方例子
import PureRenderMixin from 'react-addons-pure-render-mixin';
class FooComponent extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return <div className={this.props.className}>foo</div>;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-comment">//官方例子</span>
<span class="hljs-keyword">import</span> <span class="hljs-type">PureRenderMixin</span> from <span class="hljs-symbol">'react</span>-addons-pure-render-mixin';
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">FooComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.shouldComponentUpdate = <span class="hljs-type">PureRenderMixin</span>.shouldComponentUpdate.bind(<span class="hljs-keyword">this</span>);
  }

  render() {
    <span class="hljs-keyword">return</span> &lt;div className={<span class="hljs-keyword">this</span>.props.className}&gt;foo&lt;/div&gt;;
  }
}</code></pre>
<p>在 React 的最新版本里面，提供了 React.PureComponent 的基础类，而不需要使用这个插件。</p>
<p>这个插件其实就是重写了 shouldComponentUpdate 方法，但是这都是最上层对象浅显的比较，没有进行对象深度比较，场景有所限制。那就需要我们自己重写新的PureRenderMixin。</p>
<h4>自定义PureRenderMixin</h4>
<p>以下重写方式是采用ES6，和<a href="https://segmentfault.com/a/1190000006727526">React高阶组件写法</a>，使用了<code>lodash</code>进行深度比较。可以看我在CodePen的例子<a href="http://codepen.io/nange/pen/PGYBBw/" rel="nofollow noreferrer" target="_blank">React组件优化之lodash深度对比</a><button class="btn btn-xs btn-default ml10 preview" data-url="nange/pen/PGYBBw/" data-typeid="3">点击预览</button></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import _ from 'lodash';

function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  const bHasOwnProperty = hasOwnProperty.bind(objB);
  for (let i = 0; i < keysA.length; i++) {
    const keyA = keysA[i];

    if (objA[keyA] === objB[keyA]) {
      continue;
    }

    // special diff with Array or Object
    if (_.isArray(objA[keyA])) {
      if (!_.isArray(objB[keyA]) || objA[keyA].length !== objB[keyA].length) {
        return false;
      } else if (!_.isEqual(objA[keyA], objB[keyA])) {
        return false;
      }
    } else if (_.isPlainObject(objA[keyA])) {
      if (!_.isPlainObject(objB[keyA]) || !_.isEqual(objA[keyA], objB[keyA])) {
        return false;
      }
    } else if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}


function shallowCompare(instance, nextProps, nextState) {
  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
}

function shouldComponentUpdate(nextProps, nextState) {
  return shallowCompare(this, nextProps, nextState);
}
/* eslint-disable no-param-reassign */
function pureRenderDecorator(component) {
  //覆盖了component中的shouldComponentUpdate方法
  component.prototype.shouldComponentUpdate = shouldComponentUpdate;
  return component;//Decorator不用返回,直接使用高阶组件需要return
}
/*****
*使用ES6 class 语法糖如下，decorator的没试过，decorator请使用上面的，不要return
*let pureRenderDecorator = component => class {
*  constructor(props) {
*    super(props);
*    component.prototype.shouldComponentUpdate = shouldComponentUpdate;
*  }
*  render(){
*    var Component = component;//自定义组件使用时要大写
*   return (
*        <Component {...this.props}/>
*    )
*  }
*}
******/
export { shallowEqual };
export default pureRenderDecorator;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shallowEqual</span>(<span class="hljs-params">objA, objB</span>) </span>{
  <span class="hljs-keyword">if</span> (objA === objB) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> objA !== <span class="hljs-string">'object'</span> || objA === <span class="hljs-literal">null</span> || <span class="hljs-keyword">typeof</span> objB !== <span class="hljs-string">'object'</span> || objB === <span class="hljs-literal">null</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }

  <span class="hljs-keyword">const</span> keysA = <span class="hljs-built_in">Object</span>.keys(objA);
  <span class="hljs-keyword">const</span> keysB = <span class="hljs-built_in">Object</span>.keys(objB);

  <span class="hljs-keyword">if</span> (keysA.length !== keysB.length) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }

  <span class="hljs-keyword">const</span> bHasOwnProperty = hasOwnProperty.bind(objB);
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; keysA.length; i++) {
    <span class="hljs-keyword">const</span> keyA = keysA[i];

    <span class="hljs-keyword">if</span> (objA[keyA] === objB[keyA]) {
      <span class="hljs-keyword">continue</span>;
    }

    <span class="hljs-comment">// special diff with Array or Object</span>
    <span class="hljs-keyword">if</span> (_.isArray(objA[keyA])) {
      <span class="hljs-keyword">if</span> (!_.isArray(objB[keyA]) || objA[keyA].length !== objB[keyA].length) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!_.isEqual(objA[keyA], objB[keyA])) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
      }
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (_.isPlainObject(objA[keyA])) {
      <span class="hljs-keyword">if</span> (!_.isPlainObject(objB[keyA]) || !_.isEqual(objA[keyA], objB[keyA])) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
      }
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
  }

  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}


<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shallowCompare</span>(<span class="hljs-params">instance, nextProps, nextState</span>) </span>{
  <span class="hljs-keyword">return</span> !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shouldComponentUpdate</span>(<span class="hljs-params">nextProps, nextState</span>) </span>{
  <span class="hljs-keyword">return</span> shallowCompare(<span class="hljs-keyword">this</span>, nextProps, nextState);
}
<span class="hljs-comment">/* eslint-disable no-param-reassign */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pureRenderDecorator</span>(<span class="hljs-params">component</span>) </span>{
  <span class="hljs-comment">//覆盖了component中的shouldComponentUpdate方法</span>
  component.prototype.shouldComponentUpdate = shouldComponentUpdate;
  <span class="hljs-keyword">return</span> component;<span class="hljs-comment">//Decorator不用返回,直接使用高阶组件需要return</span>
}
<span class="hljs-comment">/*****
*使用ES6 class 语法糖如下，decorator的没试过，decorator请使用上面的，不要return
*let pureRenderDecorator = component =&gt; class {
*  constructor(props) {
*    super(props);
*    component.prototype.shouldComponentUpdate = shouldComponentUpdate;
*  }
*  render(){
*    var Component = component;//自定义组件使用时要大写
*   return (
*        &lt;Component {...this.props}/&gt;
*    )
*  }
*}
******/</span>
<span class="hljs-keyword">export</span> { shallowEqual };
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> pureRenderDecorator;</code></pre>
<p>这种方式可以确保props和state数无变化的情况下，不重新渲染组件。但是进行了对象深度比较，是比较不划算的。这点Facebook也是有考虑的，所以就有了<code>immutable-js</code>。</p>
<h4>immutable-js</h4>
<p><code>immutable-js</code>这里就不详说，这里贴一下React组件优化代码，重写<code>shouldComponentUpdate</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { is } from 'immutable'
...//省略代码
shouldComponentUpdate(nextProps = {}, nextState = {}){
  const thisProps = this.props || {},
  thisState = this.state || {};

  if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
    Object.keys(thisState).length !== Object.keys(nextState).length) {
    return true;
  }

  for (const key in nextProps) {
    if (thisProps[key] !== nextProps[key] || !is(thisProps[key], nextProps[key])) {
      //console.debug(thisProps[key],nextProps[key])
      return true;
    }
  }

  for (const key in nextState) {
    if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
      return true;
    }
  }
  return false;
}
...//省略代码" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code class="jsx"><span class="hljs-keyword">import</span> { is } from <span class="hljs-string">'immutable'</span>
...<span class="hljs-comment">//省略代码</span>
shouldComponentUpdate(nextProps = {}, nextState = {}){
  <span class="hljs-keyword">const</span> thisProps = <span class="hljs-keyword">this</span>.props || {},
  thisState = <span class="hljs-keyword">this</span>.state || {};

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">Object</span>.keys(thisProps).length !== <span class="hljs-keyword">Object</span>.keys(nextProps).length ||
    <span class="hljs-keyword">Object</span>.keys(thisState).length !== <span class="hljs-keyword">Object</span>.keys(nextState).length) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">true</span>;
  }

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> <span class="hljs-built_in">key</span> in nextProps) {
    <span class="hljs-keyword">if</span> (thisProps[<span class="hljs-built_in">key</span>] !== nextProps[<span class="hljs-built_in">key</span>] || !is(thisProps[<span class="hljs-built_in">key</span>], nextProps[<span class="hljs-built_in">key</span>])) {
      <span class="hljs-comment">//console.debug(thisProps[key],nextProps[key])</span>
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">true</span>;
    }
  }

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> <span class="hljs-built_in">key</span> in nextState) {
    <span class="hljs-keyword">if</span> (thisState[<span class="hljs-built_in">key</span>] !== nextState[<span class="hljs-built_in">key</span>] || !is(thisState[<span class="hljs-built_in">key</span>], nextState[<span class="hljs-built_in">key</span>])) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">true</span>;
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>;
}
...<span class="hljs-comment">//省略代码</span></code></pre>
<p>这里面的处理前提是要使用immutable-js对象，上面的代码不是100%适合所有场景（如果全部的props和states都是immutable对象，这个是没问题的），当props中有函数对象（原生的）时，这个就会失效，需要做些而外处理。</p>
<p>对于 <code>Mutable</code> 的对象（原生的js对象就是Mutable的）的低效率操作主要体现在&nbsp;<strong>复制&nbsp;</strong>和&nbsp;<strong>比较&nbsp;</strong>上，而 <code>Immutable </code>对象就是解决了这两大低效的痛点。</p>
<p><code>immutable-js</code>的比较是比<code>lodash</code>深度对象比较是更有效率的。</p>
<h3 id="articleHeader5">总结</h3>
<p><code>immutable-js</code>的思想其实是跟React的<code>虚拟DOM</code>是一致的，都是为了减少不必要的消耗，提高性能。<code>虚拟DOM</code>内部处理比较复杂，而且可能还会带有一些开发人员的副作用（render中运行了一些耗时的程序）,算法比较完后会相对耗时。而 <code>immutable-js</code>和<code>lodash</code>只是纯净的比较数据，效率是相对比较高的，是目前比较适合使用的<code>PureRender</code>方式。建议采用<code>immutable-js</code>，也可以根据项目性质决定。（ps：持续更新欢迎指正）</p>
<h3 id="articleHeader6">参考文章</h3>
<ul>
<li><p><a href="http://imweb.io/topic/577512fe732b4107576230b9" rel="nofollow noreferrer" target="_blank">react组件性能优化探索实践</a></p></li>
<li><p><a href="http://www.alloyteam.com/2015/10/react-virtual-analysis-of-the-dom/" rel="nofollow noreferrer" target="_blank">React虚拟DOM浅析</a></p></li>
<li><p><a href="http://ju.outofmemory.cn/entry/255112" rel="nofollow noreferrer" target="_blank">Immutable 在 JavaScript 中的应用</a></p></li>
<li><p><a href="http://www.stubbornella.org/content/2009/03/27/reflows-repaints-css-performance-making-your-javascript-slow/" rel="nofollow noreferrer" target="_blank">REFLOWS &amp; REPAINTS:</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 组件性能优化

## 原文链接
[https://segmentfault.com/a/1190000006741741](https://segmentfault.com/a/1190000006741741)

