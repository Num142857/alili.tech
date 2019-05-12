---
title: 'React 手稿 - Component state' 
date: 2019-03-02 2:30:07
hidden: true
slug: 5tpnsqmgslq
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Component state</h1>
<p>实例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { PureComponent } from 'react';

export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { time: '' };
  }

  componentDidMount() {
    setInterval(() => {
      const now = new Date();
      let { time } = this.state;
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconde = now.getSeconds();
      time = `${`0000${year}`.slice(-4)}-${`00${month}`.slice(-2)}-${`00${day}`.slice(-2)} ${`00${hours}`.slice(-2)}:${`00${minutes}`.slice(-2)}:${`00${seconde}`.slice(-2)}`
      this.setState({ time });
    }, 1000);
  }

  render() {
    return (
      <div>{this.state.time}</div>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-keyword">import</span> React, { PureComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">PureComponent</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = { <span class="hljs-attr">time</span>: <span class="hljs-string">''</span> };
  }

  componentDidMount() {
    setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">const</span> now = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
      <span class="hljs-keyword">let</span> { time } = <span class="hljs-keyword">this</span>.state;
      <span class="hljs-keyword">const</span> year = now.getFullYear();
      <span class="hljs-keyword">const</span> month = now.getMonth() + <span class="hljs-number">1</span>;
      <span class="hljs-keyword">const</span> day = now.getDate();
      <span class="hljs-keyword">const</span> hours = now.getHours();
      <span class="hljs-keyword">const</span> minutes = now.getMinutes();
      <span class="hljs-keyword">const</span> seconde = now.getSeconds();
      time = <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-string">`0000<span class="hljs-subst">${year}</span>`</span>.slice(<span class="hljs-number">-4</span>)}</span>-<span class="hljs-subst">${<span class="hljs-string">`00<span class="hljs-subst">${month}</span>`</span>.slice(<span class="hljs-number">-2</span>)}</span>-<span class="hljs-subst">${<span class="hljs-string">`00<span class="hljs-subst">${day}</span>`</span>.slice(<span class="hljs-number">-2</span>)}</span> <span class="hljs-subst">${<span class="hljs-string">`00<span class="hljs-subst">${hours}</span>`</span>.slice(<span class="hljs-number">-2</span>)}</span>:<span class="hljs-subst">${<span class="hljs-string">`00<span class="hljs-subst">${minutes}</span>`</span>.slice(<span class="hljs-number">-2</span>)}</span>:<span class="hljs-subst">${<span class="hljs-string">`00<span class="hljs-subst">${seconde}</span>`</span>.slice(<span class="hljs-number">-2</span>)}</span>`</span>
      <span class="hljs-keyword">this</span>.setState({ time });
    }, <span class="hljs-number">1000</span>);
  }

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{this.state.time}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}</code></pre>
<p><a href="https://codesandbox.io/s/o551j5lmry" rel="nofollow noreferrer" target="_blank">Timer 在线实例</a></p>
<h2 id="articleHeader1">定义</h2>
<p>写在<code>constructor</code>函数中，是一个<code>Object</code>对象。一般情况下需要指定默认值，预防抛<code>undefined</code>.</p>
<h2 id="articleHeader2">使用</h2>
<p>在组件中通过访问组件对象属性的方式。直接获取：<code>this.state.time</code>.<br>  我们通常会先获取<code>state</code>数据，再渲然到页面，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  render() {
    const {time} = this.state;
    return (
      <div>{time}</div>
    );
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx">  render() {
    <span class="hljs-keyword">const</span> {time} = <span class="hljs-keyword">this</span>.state;
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{time}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }</code></pre>
<h2 id="articleHeader3">setState</h2>
<p>先看一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {PureComponent} from 'react';

export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {name: 'world'};
  }

  render() {
    const {name} = this.state;
    return (
      <div>
        <input defaultValue={name} name=&quot;name&quot; />
        <div>Holle, {name}!</div>
      </div>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-keyword">import</span> React, {PureComponent} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">PureComponent</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">name</span>: <span class="hljs-string">'world'</span>};
  }

  render() {
    <span class="hljs-keyword">const</span> {name} = <span class="hljs-keyword">this</span>.state;
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">defaultValue</span>=<span class="hljs-string">{name}</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"name"</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Holle, {name}!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  }
}</span></code></pre>
<ul>
<li>
<p>数据单和向性</p>
<p><code>input</code>与<code>div</code>中直接显示<code>name</code>的内容,但是，在<code>input</code>中直接输入内容，<code>div</code>的显示不会改变。</p>
<blockquote>把这种组件也称为非受控性组件。</blockquote>
</li>
<li>
<p>setState</p>
<p>通过React提供了<code>setState</code>方法，来实现<code>state</code>的修改。</p>
<p>我们只要将上述的非受控性组件修改为受控性组件即可，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <input value={name} onChange={e => this.setState({name: e.target.value})} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code class="jsx" style="word-break: break-word; white-space: initial;"> &lt;input <span class="hljs-keyword">value</span>={<span class="hljs-keyword">name</span>} onChange={e =&gt; this.setState({<span class="hljs-keyword">name</span>: e.<span class="hljs-keyword">target</span>.<span class="hljs-keyword">value</span>})} /&gt;</code></pre>
<p>使用<code>setState</code>方法需要注意以下几点：</p>
<ul>
<li>
<p>异步</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onChange () {
  this.setState({name: 'hasChanged'})
  console.log(this.state.name === 'hasChanged'); //false
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code class="jsx"><span class="hljs-keyword">on</span>Change () {
  this.<span class="hljs-built_in">set</span>State({name: 'hasChanged'})
  console.<span class="hljs-keyword">log</span>(this.<span class="hljs-keyword">state</span>.name === 'hasChanged'); //false
}</code></pre>
</li>
<li>
<p>合并</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  this.state = {name: 'xiaoshouyi', address: 'beijing'};

  this.setState({address: 'xi an'});

  //not
  //this.setState({...this.state, addree: 'xi an'});
  //但是这种方式在对象修改的时候非常有用。

  console.log(this.state) //{name: 'xiaoshouyi', address: 'xi an'}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code class="jsx">  this.<span class="hljs-keyword">state</span> = {name: 'xiaoshouyi', address: 'beijing'};

  this.<span class="hljs-built_in">set</span>State({address: 'xi an'});

  //not
  //this.<span class="hljs-built_in">set</span>State({...this.<span class="hljs-keyword">state</span>, addree: 'xi an'});
  //但是这种方式在对象修改的时候非常有用。

  console.<span class="hljs-keyword">log</span>(this.<span class="hljs-keyword">state</span>) //{name: 'xiaoshouyi', address: 'xi an'}</code></pre>
<p>类似与<code>Object.assgin()</code>。</p>
</li>
<li>
<p>回调</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState({name: 'changed'}, () => {
  console.log(this.state.name); // changed
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="jsx"><span class="hljs-keyword">this</span>.setState({name: <span class="hljs-string">'changed'</span>}, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.state.name); <span class="hljs-regexp">//</span> changed
});</code></pre>
</li>
</ul>
</li>
</ul>
<p><a href="https://codesandbox.io/s/0y658350z0" rel="nofollow noreferrer" target="_blank">非控组件 在线实例</a></p>
<p><a href="https://codesandbox.io/s/3yjkno9o3q" rel="nofollow noreferrer" target="_blank">受控组件 在线实例</a></p>
<p>推荐阅读<a href="https://kairi1227.github.io" rel="nofollow noreferrer" target="_blank">《React 手稿》</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 手稿 - Component state

## 原文链接
[https://segmentfault.com/a/1190000016946490](https://segmentfault.com/a/1190000016946490)

