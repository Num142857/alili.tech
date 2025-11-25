---
title: 'redux源码分析之三：bindActionCreators.js' 
date: 2018-12-24 2:30:07
hidden: true
slug: fl3k4hs3dec
categories: [reprint]
---

{{< raw >}}

                    
<p>欢迎关注redux源码分析系列文章：<br><a href="https://segmentfault.com/a/1190000011468226">redux源码分析之一：createStore.js</a><br><a href="https://segmentfault.com/a/1190000011555477" target="_blank">redux源码分析之二：combineReducers.js</a><br><a href="https://segmentfault.com/a/1190000012169115">redux源码分析之三：bindActionCreators.js</a><br><a href="https://segmentfault.com/a/1190000016295375" target="_blank">redux源码分析之四：compose.js</a><br><a href="https://segmentfault.com/a/1190000016296209">redux源码分析之五：applyMiddleware</a></p>
<p>bindActionCreators.js文件算是非常简单的一个文件了，该文件就实现一个目的：以前这样触发一个action，即dispatch(actionCreator(args))，现在变成这样触发一个action: boundActionCreator(args)。目的很单纯，简化某个action的调用。</p>
<p>实现上面那个效果，仅需一行代码，也就是源码文件中的第一个函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function bindActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bindActionCreator</span>(<span class="hljs-params">actionCreator, dispatch</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> dispatch(actionCreator(...args))
}</code></pre>
<p>但是bindActionCreators.js文件对外提供的并不是上面的函数，而是另外一个，源码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function bindActionCreators(actionCreators, dispatch) {
  //如果actionCreators是一个函数，则说明只有一个actionCreator，那直接调用bindActionCreator就行了
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }

  //如果是actionCreator是对象，或者是null的话，报错喽
  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${actionCreators === null ? 'null' : typeof actionCreators}. ` +
      `Did you write &quot;import ActionCreators from&quot; instead of &quot;import * as ActionCreators from&quot;?`
    )
  }

  //保持actionCreators里面原来的key，只是把key对应的value都转成了boundActionCreator
  const keys = Object.keys(actionCreators)
  const boundActionCreators = {}
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const actionCreator = actionCreators[key]
    //只对value是函数的key进行转换，其他的都过滤掉了
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }

  //返回绑定之后的对象
  return boundActionCreators
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bindActionCreators</span>(<span class="hljs-params">actionCreators, dispatch</span>) </span>{
  <span class="hljs-comment">//如果actionCreators是一个函数，则说明只有一个actionCreator，那直接调用bindActionCreator就行了</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> actionCreators === <span class="hljs-string">'function'</span>) {
    <span class="hljs-keyword">return</span> bindActionCreator(actionCreators, dispatch)
  }

  <span class="hljs-comment">//如果是actionCreator是对象，或者是null的话，报错喽</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> actionCreators !== <span class="hljs-string">'object'</span> || actionCreators === <span class="hljs-literal">null</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(
      <span class="hljs-string">`bindActionCreators expected an object or a function, instead received <span class="hljs-subst">${actionCreators === <span class="hljs-literal">null</span> ? <span class="hljs-string">'null'</span> : <span class="hljs-keyword">typeof</span> actionCreators}</span>. `</span> +
      <span class="hljs-string">`Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`</span>
    )
  }

  <span class="hljs-comment">//保持actionCreators里面原来的key，只是把key对应的value都转成了boundActionCreator</span>
  <span class="hljs-keyword">const</span> keys = <span class="hljs-built_in">Object</span>.keys(actionCreators)
  <span class="hljs-keyword">const</span> boundActionCreators = {}
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; keys.length; i++) {
    <span class="hljs-keyword">const</span> key = keys[i]
    <span class="hljs-keyword">const</span> actionCreator = actionCreators[key]
    <span class="hljs-comment">//只对value是函数的key进行转换，其他的都过滤掉了</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> actionCreator === <span class="hljs-string">'function'</span>) {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }

  <span class="hljs-comment">//返回绑定之后的对象</span>
  <span class="hljs-keyword">return</span> boundActionCreators
}</code></pre>
<p>这个函数做的事情也很简单，只是把actionCreators这个对象里面包含的每一个actionCreator按照原来的key的方式全部都封装了一遍而已，具体看代码喽</p>
<p>完整解析请参考我的github：<a href="https://segmentfault.com/a/1190000016295375" target="_blank"></a><a href="https://github.com/abczhijia/redux" rel="nofollow noreferrer" target="_blank">https://github.com/abczhijia/...</a>，如果对您有帮助，欢迎star，有任何问题也请指正。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
redux源码分析之三：bindActionCreators.js

## 原文链接
[https://segmentfault.com/a/1190000012169115](https://segmentfault.com/a/1190000012169115)

