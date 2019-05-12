---
title: '【react源码】理解jsx从深入了解createElement源码开始' 
date: 2019-02-14 2:30:37
hidden: true
slug: v1d15c4rahh
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>此文章源码解读版本 react16.6<br>作者：starkwang<br>欢迎关注订阅号：rd-hub<br>如需转载请标明作者和出处</blockquote>
<h2 id="articleHeader0">开始</h2>
<blockquote>从一个最简单的jsx开始</blockquote>
<p><span class="img-wrap"><img data-src="http://md.shudong.wang/2018-10-28-16-15-18.png" src="https://static.alili.techhttp://md.shudong.wang/2018-10-28-16-15-18.png" alt="2018-10-28-16-15-18" title="2018-10-28-16-15-18" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';
ReactDOM.render(<h2 style="{{" &quot;color&quot;: &quot;#53cde2&quot; "}}">hi stark wang</h2>, document.getElementById('root'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"</span> "<span class="hljs-attr">color</span>"<span class="hljs-attr">:</span> "#<span class="hljs-attr">53cde2</span>" "}}"&gt;</span>hi stark wang<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span></span>, <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>));</code></pre>
<p>bable 会转译成（编译原理会另有篇幅橡树）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';
ReactDOM.render(React.createElement(
  'h2',
  { style: { &quot;color&quot;: &quot;#53cde2&quot; } },
  'hi stark wang'
), document.getElementById('root'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
ReactDOM.render(React.createElement(
  <span class="hljs-string">'h2'</span>,
  { style: { <span class="hljs-string">"color"</span>: <span class="hljs-string">"#53cde2"</span> } },
  <span class="hljs-string">'hi stark wang'</span>
), <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>));</code></pre>
<h4>编译 在这只勾选 一个react选项（为了保证阅读体验，编译后还是es6）</h4>
<p><span class="img-wrap"><img data-src="http://md.shudong.wang/2018-10-28-16-20-44.png" src="https://static.alili.techhttp://md.shudong.wang/2018-10-28-16-20-44.png" alt="2018-10-28-16-20-44" title="2018-10-28-16-20-44" style="cursor: pointer; display: inline;"></span></p>
<h4>React.createElement</h4>
<blockquote>在此我们看到在ReactDOM.render(）函数里面有两个参数，下面我们来看看React.createElement()源码</blockquote>
<p>createElement() 源码如下：</p>
<p><span class="img-wrap"><img data-src="http://md.shudong.wang/2018-10-28-16-43-06.png" src="https://static.alili.techhttp://md.shudong.wang/2018-10-28-16-43-06.png" alt="2018-10-28-16-43-06" title="2018-10-28-16-43-06" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">分析 createElement（）源码</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createElement(type, config, children) {

}
从函数来看，三个参数：type,config,children
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code><span class="hljs-title">function</span> createElement(<span class="hljs-keyword">type</span>, config, children) {

}
从函数来看，三个参数：<span class="hljs-keyword">type</span>,config,children
</code></pre>
<h4>参数 type</h4>
<p>表示类型比如我们传入的是 <code>&lt;h2 style="{{" "color": "#53cde2" "}}"&gt;hi stark wang&lt;/h2&gt;</code> 此时的type就是 <code>h2</code></p>
<blockquote>为了增加文章的严谨，我专门在源码里面做了调试</blockquote>
<p><span class="img-wrap"><img data-src="http://md.shudong.wang/2018-10-28-16-54-38.png" src="https://static.alili.techhttp://md.shudong.wang/2018-10-28-16-54-38.png" alt="2018-10-28-16-54-38" title="2018-10-28-16-54-38" style="cursor: pointer; display: inline;"></span></p>
<h4>参数 config</h4>
<blockquote>config 就是dom属性: <code>style="{{" "color": "#53cde2" "}}"</code>
</blockquote>
<p><span class="img-wrap"><img data-src="http://md.shudong.wang/2018-10-28-16-59-49.png" src="https://static.alili.techhttp://md.shudong.wang/2018-10-28-16-59-49.png" alt="2018-10-28-16-59-49" title="2018-10-28-16-59-49" style="cursor: pointer;"></span></p>
<h4>参数 children</h4>
<blockquote>children 就是我们在dom里面的内容了<br><span class="img-wrap"><img data-src="http://md.shudong.wang/2018-10-28-17-02-15.png" src="https://static.alili.techhttp://md.shudong.wang/2018-10-28-17-02-15.png" alt="2018-10-28-17-02-15" title="2018-10-28-17-02-15" style="cursor: pointer;"></span>
</blockquote>
<h4>把config的属性放在props上面</h4>
<p><span class="img-wrap"><img data-src="http://md.shudong.wang/2018-10-28-17-32-29.png" src="https://static.alili.techhttp://md.shudong.wang/2018-10-28-17-32-29.png" alt="2018-10-28-17-32-29" title="2018-10-28-17-32-29" style="cursor: pointer;"></span></p>
<h6>检查是否有ref 和 key 源码 （上面用到的源码）</h6>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter &amp;&amp; getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter &amp;&amp; getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hasValidRef</span>(<span class="hljs-params">config</span>) </span>{
  {
    <span class="hljs-keyword">if</span> (hasOwnProperty.call(config, <span class="hljs-string">'ref'</span>)) {
      <span class="hljs-keyword">var</span> getter = <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(config, <span class="hljs-string">'ref'</span>).get;
      <span class="hljs-keyword">if</span> (getter &amp;&amp; getter.isReactWarning) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
      }
    }
  }
  <span class="hljs-keyword">return</span> config.ref !== <span class="hljs-literal">undefined</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hasValidKey</span>(<span class="hljs-params">config</span>) </span>{
  {
    <span class="hljs-keyword">if</span> (hasOwnProperty.call(config, <span class="hljs-string">'key'</span>)) {
      <span class="hljs-keyword">var</span> getter = <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(config, <span class="hljs-string">'key'</span>).get;
      <span class="hljs-keyword">if</span> (getter &amp;&amp; getter.isReactWarning) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
      }
    }
  }
  <span class="hljs-keyword">return</span> config.key !== <span class="hljs-literal">undefined</span>;
}</code></pre>
<h4>把dom里面的内容放在props上面</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 通过arguments 的长度来判断dom里面的内容
  var childrenLength = arguments.length - 2; // 2 :代表默认的 type 和 config，减去就是 children了
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 通过arguments 的长度来判断dom里面的内容</span>
  <span class="hljs-keyword">var</span> childrenLength = <span class="hljs-built_in">arguments</span>.length - <span class="hljs-number">2</span>; <span class="hljs-comment">// 2 :代表默认的 type 和 config，减去就是 children了</span>
  <span class="hljs-keyword">if</span> (childrenLength === <span class="hljs-number">1</span>) {
    props.children = children;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (childrenLength &gt; <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">var</span> childArray = <span class="hljs-built_in">Array</span>(childrenLength);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; childrenLength; i++) {
      childArray[i] = <span class="hljs-built_in">arguments</span>[i + <span class="hljs-number">2</span>];
    }
    {
      <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.freeze) {
        <span class="hljs-built_in">Object</span>.freeze(childArray);
      }
    }
    props.children = childArray;
  }</code></pre>
<blockquote>如果dom属性内容为<code>&lt;h2&gt;hi stark {shudong} {rdhub.cn} {starkwang}&lt;/h2&gt;</code> 则参数为 8个<br>默认有有两个，剩下都是 children 所以剩下有6个分别是</blockquote>
<ul>
<li><code>{shudong}</code></li>
<li>''</li>
<li>{rdhub.cn}</li>
<li>''</li>
<li>{starkwang}</li>
</ul>
<blockquote>每个变量中间的隔得内容都算一个参数</blockquote>
<p><span class="img-wrap"><img data-src="http://md.shudong.wang/2018-10-28-17-42-46.png" src="https://static.alili.techhttp://md.shudong.wang/2018-10-28-17-42-46.png" alt="2018-10-28-17-42-46" title="2018-10-28-17-42-46" style="cursor: pointer;"></span></p>
<h4>type.defaultProps 到 props</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  if (type &amp;&amp; type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">type</span> &amp;&amp; <span class="hljs-keyword">type</span>.defaultProps) {
    <span class="hljs-keyword">var</span> defaultProps = <span class="hljs-keyword">type</span>.defaultProps;
    <span class="hljs-keyword">for</span> (propName <span class="hljs-keyword">in</span> defaultProps) {
      <span class="hljs-keyword">if</span> (props[propName] === <span class="hljs-literal">undefined</span>) {
        props[propName] = defaultProps[propName];
      }
    }
  }</code></pre>
<h4>返回一个构造函数 ReactElement</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-built_in">return</span> ReactElement(<span class="hljs-built_in">type</span>, key, ref, self, <span class="hljs-built_in">source</span>, ReactCurrentOwner.current, props);</code></pre>
<h2 id="articleHeader2">总结一下createElement（）做了哪些事情</h2>
<ol>
<li>把 config里的内容拷入props</li>
<li>把 children 到 props.children</li>
<li>把 type.defaultProps 到 props</li>
<li>返回一个构造函数 ReactElement</li>
</ol>
<h4>关于我</h4>
<p><a href="https://www.yuque.com/rdhub/about/info" rel="nofollow noreferrer" target="_blank">https://www.yuque.com/rdhub/a...</a><br><span class="img-wrap"><img data-src="http://md.shudong.wang/2018-10-20-19-06-01.png" src="https://static.alili.techhttp://md.shudong.wang/2018-10-20-19-06-01.png" alt="2018-10-20-19-06-01" title="2018-10-20-19-06-01" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【react源码】理解jsx从深入了解createElement源码开始

## 原文链接
[https://segmentfault.com/a/1190000016829329](https://segmentfault.com/a/1190000016829329)

