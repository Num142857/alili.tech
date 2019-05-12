---
title: '使用React.setState需要注意的三点' 
date: 2019-01-27 2:30:59
hidden: true
slug: pthw6xa8vgk
categories: [reprint]
---

{{< raw >}}

                    
<p>原文: <a href="https://medium.com/@mweststrate/3-reasons-why-i-stopped-using-react-setstate-ab73fc67a42e#.yeam8iov0" rel="nofollow noreferrer" target="_blank">https://medium.com/@mweststra...</a><br>作者: Michel Weststrate</p>
<hr>
<h2 id="articleHeader0">前言</h2>
<p>这篇文章原标题是<strong>3 Reasons why I stopped using React.setState</strong>，但是我对原文作者提出的论点不是很感冒，但是作者提出的三点对<code>React</code>新手来说是很容易忽略的地方，所以我在这里只提出部分内容，而且把标题改为<strong>使用React.setState需要注意的三点</strong>。</p>
<h2 id="articleHeader1">正文</h2>
<p>对<code>React</code>新手来说，使用<code>setState</code>是一件很复杂的事情。即使是熟练的<code>React</code>开发，也很有可能因为<code>React</code>的一些机制而产生一些bug，比如下面这个例子：</p>
<p><span class="img-wrap"><img data-src="/img/bVIRIT?w=800&amp;h=265" src="https://static.alili.tech/img/bVIRIT?w=800&amp;h=265" alt="由于异步的setState造成的bug。log永远比当前的慢一步" title="由于异步的setState造成的bug。log永远比当前的慢一步" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://www.gitbook.com/book/chenyitian/react-docs/details" rel="nofollow noreferrer" target="_blank">文档</a>中也说明了当使用<code>setState</code>的时候，需要注意什么问题：</p>
<blockquote>
<p><strong>注意：</strong><br>绝对不要 直接改变<code>this.state</code>，因为之后调用<code>setState()</code>可能会替换掉你做的改变。把<code>this.state</code>当做是不可变的。</p>
<p><code>setState()</code>不会立刻改变<code>this.state</code>，而是创建一个即将处理的<code>state</code>转变。在调用该方法之后访问<code>this.state</code>可能会返回现有的值。</p>
<p>对<code>setState</code>的调用没有任何同步性的保证，并且调用可能会为了性能收益批量执行。</p>
<p><code>setState()</code>将总是触发一次重绘，除非在<code>shouldComponentUpdate()</code>中实现了条件渲染逻辑。如果可变对象被使用了，但又不能在<code>shouldComponentUpdate()</code>中实现这种逻辑，仅在新<code>state</code>和之前的<code>state</code>存在差异的时候调用<code>setState()</code>可以避免不必要的重新渲染。</p>
</blockquote>
<p>总结出来，当使用<code>setState</code>的时候，有三个问题需要注意:</p>
<h3 id="articleHeader2">1. setState是异步的(译者注：不保证同步的)</h3>
<p>很多开发刚开始没有注意到<code>setState</code>是异步的。如果你修改一些<code>state</code>，然后直接查看它，你会看到之前的<code>state</code>。这是<code>setState</code>中最容易出错的地方。 <code>setState</code>这个词看起来并不像是异步的，所以如果你不假思索的用它，可能会造成<code>bugs</code>。下面这个例子很好的展示了这个问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Select extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      selection: props.values[0]
    };
  }
  
  render() {
    return (
      <ul onKeyDown={this.onKeyDown} tabIndex={0}>
        {this.props.values.map(value =>
          <li
            className={value === this.state.selection ? 'selected' : ''}
            key={value}
            onClick={() => this.onSelect(value)}
          >
            {value}
          </li> 
        )}  
      </ul>
    )
  }
  
  onSelect(value) {
    this.setState({
      selection: value
    })
    this.fireOnSelect()
  }

  onKeyDown = (e) => {
    const {values} = this.props
    const idx = values.indexOf(this.state.selection)
    if (e.keyCode === 38 &amp;&amp; idx > 0) { /* up */
      this.setState({
        selection: values[idx - 1]
      })
    } else if (e.keyCode === 40 &amp;&amp; idx < values.length -1) { /* down */
      this.setState({
        selection: values[idx + 1]
      })  
    }
    this.fireOnSelect()
  }
   
  fireOnSelect() {
    if (typeof this.props.onSelect === &quot;function&quot;)
      this.props.onSelect(this.state.selection) /* not what you expected..*/
  }
}

ReactDOM.render(
  <Select 
    values={[&quot;State.&quot;, &quot;Should.&quot;, &quot;Be.&quot;, &quot;Synchronous.&quot;]} 
    onSelect={value => console.log(value)}
  />,
  document.getElementById(&quot;app&quot;)
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Select</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props, context) {
    <span class="hljs-keyword">super</span>(props, context)
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">selection</span>: props.values[<span class="hljs-number">0</span>]
    };
  }
  
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">onKeyDown</span>=<span class="hljs-string">{this.onKeyDown}</span> <span class="hljs-attr">tabIndex</span>=<span class="hljs-string">{0}</span>&gt;</span>
        {this.props.values.map(value =&gt;
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>
            <span class="hljs-attr">className</span>=<span class="hljs-string">{value</span> === <span class="hljs-string">this.state.selection</span> ? '<span class="hljs-attr">selected</span>' <span class="hljs-attr">:</span> ''}
            <span class="hljs-attr">key</span>=<span class="hljs-string">{value}</span>
            <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> this.onSelect(value)}
          &gt;
            {value}
          <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span> 
        )}  
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
    )
  }
  
  onSelect(value) {
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">selection</span>: value
    })
    <span class="hljs-keyword">this</span>.fireOnSelect()
  }

  onKeyDown = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> {values} = <span class="hljs-keyword">this</span>.props
    <span class="hljs-keyword">const</span> idx = values.indexOf(<span class="hljs-keyword">this</span>.state.selection)
    <span class="hljs-keyword">if</span> (e.keyCode === <span class="hljs-number">38</span> &amp;&amp; idx &gt; <span class="hljs-number">0</span>) { <span class="hljs-comment">/* up */</span>
      <span class="hljs-keyword">this</span>.setState({
        <span class="hljs-attr">selection</span>: values[idx - <span class="hljs-number">1</span>]
      })
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (e.keyCode === <span class="hljs-number">40</span> &amp;&amp; idx &lt; values.length <span class="hljs-number">-1</span>) { <span class="hljs-comment">/* down */</span>
      <span class="hljs-keyword">this</span>.setState({
        <span class="hljs-attr">selection</span>: values[idx + <span class="hljs-number">1</span>]
      })  
    }
    <span class="hljs-keyword">this</span>.fireOnSelect()
  }
   
  fireOnSelect() {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span>.props.onSelect === <span class="hljs-string">"function"</span>)
      <span class="hljs-keyword">this</span>.props.onSelect(<span class="hljs-keyword">this</span>.state.selection) <span class="hljs-comment">/* not what you expected..*/</span>
  }
}

ReactDOM.render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Select</span> 
    <span class="hljs-attr">values</span>=<span class="hljs-string">{[</span>"<span class="hljs-attr">State.</span>", "<span class="hljs-attr">Should.</span>", "<span class="hljs-attr">Be.</span>", "<span class="hljs-attr">Synchronous.</span>"]} 
    <span class="hljs-attr">onSelect</span>=<span class="hljs-string">{value</span> =&gt;</span> console.log(value)}
  /&gt;,
  document.getElementById("app")
)</span></code></pre>
<p>第一眼看上去，这个代码似乎没有什么问题。两个事件处理中调用<code>onSelect</code>方法。但是，这个<code>Select</code>组件中有一个<code>bug</code>很好的展现了之前的<code>GIF</code>图。<code>onSelect</code>方法永远传递的是之前的<code>state.selection</code>值，因为当<code>fireOnSelect</code>调用的时候，<code>setState</code>还没有完成它的工作。我认为<code>React</code>至少要把<code>setState</code>改名为<code>scheduleState</code>或者把回掉函数设为必须参数。</p>
<blockquote><p>这个bug很容易修改，最难的地方在于你要知道有这个问题。</p></blockquote>
<h3 id="articleHeader3">2. setState会造成不必要的渲染</h3>
<p><code>setState</code>造成的第二个问题是：每次调用都会造成重新渲染。很多时候，这些重新渲染是不必要的。你可以用<code>React performance tools</code>中的<a href="https://facebook.github.io/react/docs/perf.html#perf.printwastedmeasurements" rel="nofollow noreferrer" target="_blank">printWasted</a>来查看什么时候会发生不必要渲染。但是，大概的说，不必要的渲染有以下几个原因：</p>
<ul>
<li><p>新的<code>state</code>其实和之前的是一样的。这个问题通常可以通过<code>shouldComponentUpdate</code>来解决。也可以用<code>pure render</code>或者其他的库来解决这个问题。</p></li>
<li><p>通常发生改变的<code>state</code>是和渲染有关的，但是也有例外。比如，有些数据是根据某些状态来显示的。</p></li>
<li><p>第三，有些<code>state</code>和渲染一点关系都没有。有一些<code>state</code>可能是和事件、<code>timer ID</code>有关的。</p></li>
</ul>
<h3 id="articleHeader4">3.setState并不能很有效的管理所有的组件状态</h3>
<p>基于上面的最后一条，并不是所有的组件状态都应该用<code>setState</code>来进行保存和更新的。复杂的组件可能会有各种各样的状态需要管理。用<code>setState</code>来管理这些状态不但会造成很多不需要的重新渲染，也会造成相关的生命周期钩子一直被调用，从而造成很多奇怪的问题。</p>
<h2 id="articleHeader5">后话</h2>
<p>在原文中作者推荐了一个叫做<code>MobX</code>的库来管理部分状态，我不是很感冒，所以我就不介绍。如果感兴趣的，可以通过最上面的链接看看原文中的介绍。</p>
<p>基于上面提出的三点，我认为新手应该注意的地方是：</p>
<h3 id="articleHeader6">
<code>setState</code>是不保证同步的</h3>
<p><code>setState</code>是不保证同步的，是不保证同步的，是不保证同步的。重要的事情说三遍。之所以不说它是异步的，是因为<code>setState</code>在某些情况下也是同步更新的。<a href="https://www.bennadel.com/blog/2893-setstate-state-mutation-operation-may-be-synchronous-in-reactjs.htm" rel="nofollow noreferrer" target="_blank">可以参考这篇文章</a></p>
<p>如果需要在<code>setState</code>后直接获取修改后的值，那么有几个方案：</p>
<h4>传入对应的参数，不通过<code>this.state</code>获取</h4>
<p>针对于之前的例子，完全可以在调用<code>fireOnSelect</code>的时候，传入需要的值。而不是在方法中在通过<code>this.state</code>来获取</p>
<h4>使用回调函数</h4>
<p><code>setState</code>方法接收一个<code>function</code>作为回调函数。这个回掉函数会在<code>setState</code>完成以后直接调用，这样就可以获取最新的<code>state</code>。对于之前的例子，就可以这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState({
  selection: value
}, this.fireOnSelect)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.setState</span>({
  <span class="hljs-attribute">selection</span>: value
}, <span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.fireOnSelect</span>)</code></pre>
<h4>使用setTimeout</h4>
<p>在<code>setState</code>使用<code>setTimeout</code>来让<code>setState</code>先完成以后再执行里面内容。这样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState({
  selection: value
});

setTimeout(this.fireOnSelect, 0);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.setState</span>({
  <span class="hljs-attribute">selection</span>: value
});

<span class="hljs-selector-tag">setTimeout</span>(<span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.fireOnSelect</span>, 0);</code></pre>
<p><strong>直接输出，回调函数，<code>setTimeout</code>对比</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    componentDidMount(){
    this.setState({val: this.state.val + 1}, ()=>{
      console.log(&quot;In callback &quot; + this.state.val);
    });

    console.log(&quot;Direct call &quot; + this.state.val);   

    setTimeout(()=>{
      console.log(&quot;begin of setTimeout&quot; + this.state.val);

       this.setState({val: this.state.val + 1}, ()=>{
          console.log(&quot;setTimeout setState callback &quot; + this.state.val);
       });

      setTimeout(()=>{
        console.log(&quot;setTimeout of settimeout &quot; + this.state.val);
      }, 0);

      console.log(&quot;end of setTimeout &quot; + this.state.val);
    }, 0);
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>    componentDidMount(){
    this.<span class="hljs-built_in">set</span>State({val: this.<span class="hljs-keyword">state</span>.val + <span class="hljs-number">1</span>}, ()=&gt;{
      console.<span class="hljs-keyword">log</span>(<span class="hljs-string">"In callback "</span> + this.<span class="hljs-keyword">state</span>.val);
    });

    console.<span class="hljs-keyword">log</span>(<span class="hljs-string">"Direct call "</span> + this.<span class="hljs-keyword">state</span>.val);   

    <span class="hljs-built_in">set</span>Timeout(()=&gt;{
      console.<span class="hljs-keyword">log</span>(<span class="hljs-string">"begin of setTimeout"</span> + this.<span class="hljs-keyword">state</span>.val);

       this.<span class="hljs-built_in">set</span>State({val: this.<span class="hljs-keyword">state</span>.val + <span class="hljs-number">1</span>}, ()=&gt;{
          console.<span class="hljs-keyword">log</span>(<span class="hljs-string">"setTimeout setState callback "</span> + this.<span class="hljs-keyword">state</span>.val);
       });

      <span class="hljs-built_in">set</span>Timeout(()=&gt;{
        console.<span class="hljs-keyword">log</span>(<span class="hljs-string">"setTimeout of settimeout "</span> + this.<span class="hljs-keyword">state</span>.val);
      }, <span class="hljs-number">0</span>);

      console.<span class="hljs-keyword">log</span>(<span class="hljs-string">"end of setTimeout "</span> + this.<span class="hljs-keyword">state</span>.val);
    }, <span class="hljs-number">0</span>);
  }</code></pre>
<p>如果val默认为0, 输入的结果是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> Direct call 0
> In callback 1
> begin of setTimeout 1
> setTimeout setState callback 2
> end of setTimeout 2
> setTimeout of settimeout 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>&gt; Direct call <span class="hljs-number">0</span>
&gt; <span class="hljs-keyword">In</span> callback <span class="hljs-number">1</span>
&gt; <span class="hljs-keyword">begin</span> <span class="hljs-keyword">of</span> setTimeout <span class="hljs-number">1</span>
&gt; setTimeout setState callback <span class="hljs-number">2</span>
&gt; <span class="hljs-keyword">end</span> <span class="hljs-keyword">of</span> setTimeout <span class="hljs-number">2</span>
&gt; setTimeout <span class="hljs-keyword">of</span> settimeout <span class="hljs-number">2</span></code></pre>
<h3 id="articleHeader7">和渲染无关的状态尽量不要放在<code>state</code>中来管理</h3>
<p><strong>通常<code>state</code>中只来管理和渲染有关的状态</strong>，从而保证<code>setState</code>改变的状态都是和渲染有关的状态。这样子就可以避免不必要的重复渲染。其他和渲染无关的状态，可以直接以属性的形式保存在组件中，在需要的时候调用和改变，不会造成渲染。或者参考原文中的<code>MobX</code>。</p>
<p><strong>避免不必要的修改</strong>，当<code>state</code>的值没有发生改变的时候，尽量不要使用<code>setState</code>。虽然<code>shouldComponentUpdate</code>和<code>PureComponent</code>可以避免不必要的重复渲染，但是还是增加了一层<code>shallowEqual</code>的调用，造成多余的浪费。</p>
<p>以上</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用React.setState需要注意的三点

## 原文链接
[https://segmentfault.com/a/1190000008271880](https://segmentfault.com/a/1190000008271880)

