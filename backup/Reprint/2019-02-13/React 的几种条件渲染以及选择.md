---
title: 'React 的几种条件渲染以及选择' 
date: 2019-02-13 2:31:23
hidden: true
slug: 36netdjb4q
categories: [reprint]
---

{{< raw >}}

                    
<p>对于一个展示页面来讲, 通常有好几种展示状态(以列表页为例): </p>
<p>数据为空, 空页面<br>取数据时发生错误, 错误页面<br>数据正常<br>加载状态<br>针对以上三种情况, react渲染列表的时候要正确判断并渲染出相应的视图, 也就是条件渲染. 不同于vue的v-if, v-show等框架提供的api, react的条件渲染都是js原生的再加上一点点的hack. 比如react文档提到的. if/else, &amp;&amp; 和三目等等.</p>
<p>当然上面的都是常用的一些方法, 但是也存在着各种问题, 比如条件分支过多的的事时候代码也会越来越乱. 下面提供几种具有普适性的方法</p>
<h2 id="articleHeader0">if/else, 三目以及 短路运算符</h2>
<p>这三个方法都是官方文档提到的, 这里就放到一起了, 其实这三种方案都是类似的: 在render生命周期里做相应的判断. 不过三目和短路运算符可以在jsx行内使用.</p>
<h3 id="articleHeader1">if/else</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class List extends Component {
  static propTypes = {
    status: PropTypes.oneOf(['loading', 'error', 'success', 'empty'])
  }
  
  render () {
    const { status } = this.props
    if (status === 'loading') {
      return <div>
        加载状态
      </div>
    } 
    
    if (status === 'error') {
      return  <div>
        错误状态
      </div>
    }


    if (status === 'success') {
      return  <div>
        成功状态
      </div>
    }

    if (status === 'empty') {
      return  <div>
        空状态
      </div>
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">List</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">static</span> propTypes = {
    <span class="hljs-attr">status</span>: PropTypes.oneOf([<span class="hljs-string">'loading'</span>, <span class="hljs-string">'error'</span>, <span class="hljs-string">'success'</span>, <span class="hljs-string">'empty'</span>])
  }
  
  render () {
    <span class="hljs-keyword">const</span> { status } = <span class="hljs-keyword">this</span>.props
    <span class="hljs-keyword">if</span> (status === <span class="hljs-string">'loading'</span>) {
      <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        加载状态
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    } 
    
    <span class="hljs-keyword">if</span> (status === <span class="hljs-string">'error'</span>) {
      <span class="hljs-keyword">return</span>  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        错误状态
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    }


    <span class="hljs-keyword">if</span> (status === <span class="hljs-string">'success'</span>) {
      <span class="hljs-keyword">return</span>  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        成功状态
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    }

    <span class="hljs-keyword">if</span> (status === <span class="hljs-string">'empty'</span>) {
      <span class="hljs-keyword">return</span>  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        空状态
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    }
  }
}</code></pre>
<p>可以看到这种写法胜在清楚明了, 但是如果判断分支越来越多代码无可避免的会非常冗余, 同时复用性也堪忧.</p>
<h2 id="articleHeader2">Render(IF)组件</h2>
<p>这里的render当然不是生命周期里的render, 我们可以跟vue里的v-if对应起来</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Render ({ if: cond, children }) {
    return cond ? children : null
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Render</span> (<span class="hljs-params">{ if: cond, children }</span>) </span>{
    <span class="hljs-keyword">return</span> cond ? children : <span class="hljs-literal">null</span>
}</code></pre>
<p>上面是简单的Render组件, 使用起来是这样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class List extends Component {
    static propTypes = {
        status: PropTypes.oneOf(['loading', 'error', 'success', 'empty'])
    }
    
  render () {
    const { status }  = this.props
    return (
      <div>
        <Render if={status === 'loading'} >
          加载状态
        </Render>

        <Render if={status === 'error'} >
          错误状态
        </Render>

        <Render if={status === 'success'} >
          成功状态
        </Render>

        <Render if={status === 'empty'} >
          空状态
        </Render>
      </div>
    )
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">List</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">static</span> propTypes = {
        <span class="hljs-attr">status</span>: PropTypes.oneOf([<span class="hljs-string">'loading'</span>, <span class="hljs-string">'error'</span>, <span class="hljs-string">'success'</span>, <span class="hljs-string">'empty'</span>])
    }
    
  render () {
    <span class="hljs-keyword">const</span> { status }  = <span class="hljs-keyword">this</span>.props
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Render</span> <span class="hljs-attr">if</span>=<span class="hljs-string">{status</span> === <span class="hljs-string">'loading'</span>} &gt;</span>
          加载状态
        <span class="hljs-tag">&lt;/<span class="hljs-name">Render</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">Render</span> <span class="hljs-attr">if</span>=<span class="hljs-string">{status</span> === <span class="hljs-string">'error'</span>} &gt;</span>
          错误状态
        <span class="hljs-tag">&lt;/<span class="hljs-name">Render</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">Render</span> <span class="hljs-attr">if</span>=<span class="hljs-string">{status</span> === <span class="hljs-string">'success'</span>} &gt;</span>
          成功状态
        <span class="hljs-tag">&lt;/<span class="hljs-name">Render</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">Render</span> <span class="hljs-attr">if</span>=<span class="hljs-string">{status</span> === <span class="hljs-string">'empty'</span>} &gt;</span>
          空状态
        <span class="hljs-tag">&lt;/<span class="hljs-name">Render</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
    }
}</code></pre>
<p>相比使用在render里使用大量的if/else 上面的写法无疑更加清楚明了了. 如果所有列表业务组件统一起来, 状态保持一致, 我们可以做更高层次的抽象, 把其他状态都抽象到一个高阶函数之中, 我们写代码的时候只要确保success的状态能正确渲染即可</p>
<h2 id="articleHeader3">立即执行函数</h2>
<p>jsx里是可以写变量, 同时立即执行函数也是可以的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class List extends Component {
  static propTypes = {
      status: PropTypes.oneOf(['loading', 'error', 'success', 'empty'])
  }
  
  render () {
    const { status }  = this.props
    return (
      <div>
        {(() => {
          switch (status) {
            case 'loading':
              return <div>加载状态</div>
            
            case 'error':
              return <div>错误状态</div>
            
            case 'success':
              return <div>成功状态</div>
            
            case 'empty':
              return <div>空状态</div>
          }
        })()}
      </div>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">List</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">static</span> propTypes = {
      <span class="hljs-attr">status</span>: PropTypes.oneOf([<span class="hljs-string">'loading'</span>, <span class="hljs-string">'error'</span>, <span class="hljs-string">'success'</span>, <span class="hljs-string">'empty'</span>])
  }
  
  render () {
    <span class="hljs-keyword">const</span> { status }  = <span class="hljs-keyword">this</span>.props
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        {(() =&gt; {
          switch (status) {
            case 'loading':
              return <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>加载状态<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            
            case 'error':
              return <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>错误状态<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            
            case 'success':
              return <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>成功状态<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            
            case 'empty':
              return <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>空状态<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          }
        })()}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}</code></pre>
<p>立即函数的复用显然不太现实, 所以立即函数的适用场景是那种相对比较复杂但无法复用的组件</p>
<h2 id="articleHeader4">高阶组件</h2>
<p>对于高阶组件的概念就不做赘述了, 我们把条件渲染的逻辑放到高阶组件中, 除了逻辑的抽象外, 也可以提高组件的复用率.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const withList = WrappedComponent => {
  return class PP extends Component {
    render() {
      const { status } = this.props
      switch (status) {
        case 'loading':
          return <div>加载状态</div>
        
        case 'error':
          return <div>错误状态</div>
        
        case 'success':
          return <WrappedComponent {...this.props}/>
        
        case 'empty':
          return <div>空状态</div>
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> withList = <span class="hljs-function"><span class="hljs-params">WrappedComponent</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">PP</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
      <span class="hljs-keyword">const</span> { status } = <span class="hljs-keyword">this</span>.props
      <span class="hljs-keyword">switch</span> (status) {
        <span class="hljs-keyword">case</span> <span class="hljs-string">'loading'</span>:
          <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>加载状态<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        
        <span class="hljs-keyword">case</span> <span class="hljs-string">'error'</span>:
          <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>错误状态<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        
        <span class="hljs-keyword">case</span> <span class="hljs-string">'success'</span>:
          <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">WrappedComponent</span> {<span class="hljs-attr">...this.props</span>}/&gt;</span>
        
        case 'empty':
          return <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>空状态<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      }
    }
  }
}</span></code></pre>
<p>如果我们可以保证所有列表的props一致(也就是都使用status判断状态), 我们完全可以专注的写status为success的状态:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@withList
class List extends Component {
  static propTypes = {
    status: PropTypes.oneOf(['loading', 'error', 'success', 'empty'])
  }
  
  render () {
    return (
      <div>
        成功页面
      </div>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">@withList
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">List</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">static</span> propTypes = {
    <span class="hljs-attr">status</span>: PropTypes.oneOf([<span class="hljs-string">'loading'</span>, <span class="hljs-string">'error'</span>, <span class="hljs-string">'success'</span>, <span class="hljs-string">'empty'</span>])
  }
  
  render () {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        成功页面
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}</code></pre>
<p>其次我们可以把加载, 错误, 以及空状态统一抽成组件, 对于提高组件的复用率无疑可以起很大作用.</p>
<p><span class="img-wrap"><img data-src="/img/bVbiEEn?w=800&amp;h=558" src="https://static.alili.tech/img/bVbiEEn?w=800&amp;h=558" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 的几种条件渲染以及选择

## 原文链接
[https://segmentfault.com/a/1190000016765528](https://segmentfault.com/a/1190000016765528)

