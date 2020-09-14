---
title: 'React高阶组件替代Mixins' 
date: 2019-02-05 2:30:09
hidden: true
slug: fcbxpy5am0u
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">React高阶组件替代Mixins</h1>
<blockquote><p>minins将死，ES6的Class不对其进行支持,HOC就是解决办法。</p></blockquote>
<p>那什么是高级组件？首先你得先了解请求ES6中的<code>class</code>只是<code>语法糖</code>，本质还是<code>原型继承</code>。能够更好的进行说明，我们将不会修改<code>组件</code>的代码。而是通过提供一些能够包裹<code>组件</code>的<code>组件</code>， 并通过一些额外的功能来增强<code>组件</code>。这样的<code>组件</code>我们称之为高阶组件（Higher-Order Component）。</p>
<p>ES7中的新特性<code>decorator(装饰器)</code>就是使用高阶组件模式，<code>transform-decorators-legacy</code>是目前babel插件转换<code>decorator</code>的，可以研究下。下面看下如何实现React的PureRender功能（高阶组件和decorator一起讲解）。</p>
<p><code>PureRenderDecorator</code>,decorator其实就是一个高阶组件。</p>
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
<p>如何使用？假设要使用的组件是<strong>Test</strong></p>
<ul><li>
<p>直接使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import { pureRenderDecorator } from &quot;./pureRenderDecorator&quot;;

class Test extends React.Component {
    // component code here
}
export default pureRenderDecorator(Test)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">'reac</span>t';
<span class="hljs-keyword">import</span> { pureRenderDecorator } from <span class="hljs-string">"./pureRenderDecorator"</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Test</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-comment">// component code here</span>
}
export <span class="hljs-keyword">default</span> pureRenderDecorator(<span class="hljs-type">Test</span>)</code></pre>
</li></ul>
<p>​</p>
<ul><li>
<p>通过<code>decorator</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import { pureRenderDecorator } from &quot;./pureRenderDecorator&quot;;

@pureRenderDecorator
export default class Test extends React.Component {
    // component code here
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">'reac</span>t';
<span class="hljs-keyword">import</span> { pureRenderDecorator } from <span class="hljs-string">"./pureRenderDecorator"</span>;

<span class="hljs-meta">@pureRenderDecorator</span>
export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Test</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-comment">// component code here</span>
}</code></pre>
</li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React高阶组件替代Mixins

## 原文链接
[https://segmentfault.com/a/1190000006727526](https://segmentfault.com/a/1190000006727526)

