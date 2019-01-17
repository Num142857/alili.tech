---
title: 'React之ref详细用法' 
date: 2019-01-18 2:30:35
hidden: true
slug: 5pxzq6n21cd
categories: [reprint]
---

{{< raw >}}

                    
<p>在react典型的数据流中，<code>props</code>传递是父子组件交互的唯一方式；通过传递一个新的<code>props</code>值来使子组件重新<code>re-render</code>,从而达到父子组件通信。当然，就像react官网所描述的一样，在react典型的数据量之外，某些情况下（例如和第三方的dom库整合，或者某个dom元素focus等）为了修改子组件我们可能需要另一种方式，这就是<code>ref</code>方式。</p>
<h3 id="articleHeader0">ref 简介</h3>
<p>React提供的这个<code>ref</code>属性，<strong>表示为对组件真正实例的引用，其实就是<code>ReactDOM.render()返回的组件实例</code></strong>；需要区分一下，<code>ReactDOM.render()</code>渲染组件时返回的是组件实例；而渲染dom元素时，返回是具体的dom节点。</p>
<p>例如，下面代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    const domCom = <button type=&quot;button&quot;>button</button>;
    const refDom = ReactDOM.render(domCom，container);
    //ConfirmPass的组件内容省略
    const refCom = ReactDOM.render(<ConfirmPass/>,container);
    console.log(refDom);
    console.log(refCom);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
    <span class="hljs-keyword">const</span> domCom = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span>&gt;</span>button<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
    <span class="hljs-keyword">const</span> refDom = ReactDOM.render(domCom，container);
    <span class="hljs-comment">//ConfirmPass的组件内容省略</span>
    <span class="hljs-keyword">const</span> refCom = ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ConfirmPass</span>/&gt;</span></span>,container);
    <span class="hljs-built_in">console</span>.log(refDom);
    <span class="hljs-built_in">console</span>.log(refCom);
</code></pre>
<p>上述代码返回控制台结果如下图所示：。</p>
<p><span class="img-wrap"><img data-src="/img/bVKvsR?w=1464&amp;h=348" src="https://static.alili.tech/img/bVKvsR?w=1464&amp;h=348" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><code>ref</code>可以挂到任何组件上，可以挂到组件上也可以是dom元素上；二者不同是与上图答案一样：</p>
<blockquote><p>挂到组件（这里组件指的是有状态组件）上的ref表示对组件实例的引用，而挂载到dom元素上时表示具体的dom元素节点。</p></blockquote>
<h3 id="articleHeader1">ref可以设置回调函数</h3>
<p>ref属性可以设置为一个回调函数，这也是官方强烈推荐的用法；这个函数执行的时机为：</p>
<ul>
<li><p><code>组件被挂载后</code>，回调函数被立即执行，回调函数的参数为该组件的具体实例。</p></li>
<li><p><code>组件被卸载或者原有的ref属性本身发生变化时</code>，回调也会被立即执行，此时回调函数参数为<code>null</code>，以确保内存泄露。</p></li>
</ul>
<p>例如下面代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    RegisterStepTwo = React.createClass({
        getInitialState(){
          return {visible: true};
        },
      changeVisible(){
        this.setState({visible: !this.state.visible});
      },
      refCb(instance){
        console.log(instance);
      },
      render(){
        return(
          <div>
            <button type=&quot;button&quot; onClick={this.changeVisible}>{this.state.visible ? '卸载' : '挂载'}ConfirmPass
            </button>
            {
              this.state.visible ?
                <ConfirmPass ref={this.refCb} onChange={this.handleChange}/>: null
             }
           </div>
         )
      }
    });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>
    RegisterStepTwo = React.createClass({
        getInitialState(){
          <span class="hljs-keyword">return</span> {visible: <span class="hljs-literal">true</span>};
        },
      changeVisible(){
        <span class="hljs-keyword">this</span>.setState({visible: !<span class="hljs-keyword">this</span>.state.visible});
      },
      refCb(instance){
        console.log(instance);
      },
      render(){
        <span class="hljs-keyword">return</span>(
          &lt;div&gt;
            &lt;button type=<span class="hljs-string">"button"</span> onClick={<span class="hljs-keyword">this</span>.changeVisible}&gt;{<span class="hljs-keyword">this</span>.state.visible ? <span class="hljs-string">'卸载'</span> : <span class="hljs-string">'挂载'</span>}ConfirmPass
            &lt;/button&gt;
            {
              <span class="hljs-keyword">this</span>.state.visible ?
                &lt;ConfirmPass ref={<span class="hljs-keyword">this</span>.refCb} onChange={<span class="hljs-keyword">this</span>.handleChange}/&gt;: <span class="hljs-literal">null</span>
             }
           &lt;/div&gt;
         )
      }
    });
</code></pre>
<p>上述代码，渲染到页面时可以发现console.log出对应的组件实例，切换按钮时，<code>ConfirmPass</code>也在挂载与卸载之间切换，所以能看到不同的console.log结果。</p>
<h3 id="articleHeader2">ref可以设置字符串</h3>
<p>ref还可以设置为字符串值，而不是回调函数；这种方式基本不推荐使用，或者在未来的react版本中不会再支持该方式，但是可以了解一下。</p>
<p>例如下面<code>input</code>设置ref的值为字符串。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input ref=&quot;input&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">input</span> ref=<span class="hljs-string">"input"</span> /&gt;</code></pre>
<p>然后在其他地方如事件回调中通过<code>this.refs.input</code>可以访问到该组件实例，其实就是dom元素节点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let inputEl = this.refs.input;
//然后通过inputEl来完成后续的逻辑，如focus、获取其值等等" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code><span class="hljs-keyword">let</span> inputEl = <span class="hljs-keyword">this</span>.refs.input;
<span class="hljs-comment">//然后通过inputEl来完成后续的逻辑，如focus、获取其值等等</span></code></pre>
<h3 id="articleHeader3">获取ref引用组件对应的dom节点</h3>
<p>不管ref设置值是回调函数还是字符串，都可以通过<code>ReactDOM.findDOMNode(ref)</code>来获取组件挂载后真正的dom节点。</p>
<p>但是对于html元素使用ref的情况，ref本身引用的就是该元素的实际dom节点，无需使用<code>ReactDOM.findDOMNode(ref)</code>来获取，该方法常用于React组件上的ref。</p>
<h3 id="articleHeader4">ref在有状态组件中的使用</h3>
<p>上文说到过<code>ref</code>用到react有状态组件时，ref引用的是组件的实例；所以可以通过子组件的<code>ref</code>可以访问到子组件实例的<code>props</code>、<code>state</code>、<code>refs</code>、实例方法(非继承而来的方法)等等。</p>
<p>使用ref访问子组件情况可能是以下case：</p>
<ul>
<li><p>访问子组件的某个具体的dom节点完成某些逻辑，通过<code>this.refs.childComponentRefName.refs.someDomRefName</code>来完成，例如<a href="https://segmentfault.com/q/1010000006253845/a-1020000008661267">segmentfault上提问者提出的问题</a>。</p></li>
<li><p>可以访问子组件的公共实例方法完成某写逻辑。例如子组件定义了一个<code>reset</code>方法用来重置子组件表单元素值，这时父组件可以通过<code>this.refs.childComponentRefName.reset()</code>来完成子组件表单元素的重置。</p></li>
<li><p>...</p></li>
</ul>
<p>不过话说回来，react不建议在父组件中直接访问子组件的实例方法来完成某些逻辑，在大部分情况下请使用标准的react数据流的方式来代替则更为清晰；</p>
<p>另外，上述case在组件关系嵌套很深时，这种方式就显得极为丑陋。</p>
<h3 id="articleHeader5">ref在无状态组件中的使用</h3>
<p>上文说到的react组件都是指有状态的，对于无状态组件<code>stateless component</code>而言，正如这篇文章<a href="http://www.cnblogs.com/wonyun/p/5930333.html" rel="nofollow noreferrer" target="_blank">React创建组件的三种方式及其区别</a>里描述的一样，<strong>无状态组件是不会被实例化的</strong>，在父组件中通过<code>ref</code>来获取无状态子组件时，其值为<code>null</code>，所以：</p>
<blockquote><p>无法通过<code>ref</code>来获取无状态组件实例。</p></blockquote>
<p>虽然无法通过ref获取无状态组件实例，但是可以结合复合组件来包装无状态组件来在其上使用ref引用。</p>
<p>另外，对于无状态组件我们想访问的无非是其中包含的组件或者dom元素，我们可以通过一个变量来保存我们想要的组件或者dom元素组件的实例引用。例如下面代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function TestComp(props){
    let refDom;
    return (<div>
        <div ref={(node) => refDom = node}>
            ...
        </div>
    </div>)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">TestComp</span>(<span class="hljs-params">props</span>)</span>{
    <span class="hljs-keyword">let</span> refDom;
    <span class="hljs-keyword">return</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{(node)</span> =&gt;</span> refDom = node}&gt;
            ...
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>)
}</code></pre>
<p>这样，可以通过变量<code>refDom</code>来访问到无状态组件中的指定dom元素了，访问其中的其他组件实例类似。</p>
<h3 id="articleHeader6">ref在HOC中存在问题</h3>
<p>react的<code>HOC</code>是高阶组件，简单理解就是包装了一个低阶的组件，最后返回一个高阶的组件；高阶组件其实是在低阶组件基础上做了一些事情，比方说<a href="https://ant.design/docs/react/introduce-cn" rel="nofollow noreferrer" target="_blank"><code>antd</code></a>组件的<code>Form create</code>的方法，它就是在为低阶组件封装了一些特殊的属性，比如<code>form</code>属性。</p>
<p>既然<code>HOC</code>会基于低阶组件生成一个新的高阶组件，若用<code>ref</code>就不能访问到我们真正需要的低阶组件实例，我们访问到的其实是高阶组件实例。所以:</p>
<blockquote><p>若HOC不做特殊处理，ref是无法访问到低阶组件实例的</p></blockquote>
<p>要想用<code>ref</code>访问低阶组件实例，就必须得HOC支持，就像<code>Redux</code>的connect方法提供的<code>withRef</code>属性来访问低阶组件一样。具体可以参考<a href="https://segmentfault.com/a/1190000008112017#articleHeader12">这里</a>。</p>
<h3 id="articleHeader7">总结</h3>
<p><code>ref</code>提供了一种对于react标准的数据流不太适用的情况下组件间交互的方式，例如管理dom元素focus、text selection以及与第三方的dom库整合等等。 但是在大多数情况下应该使用react响应数据流那种方式，不要过度使用ref。</p>
<p>另外，在使用ref时，不用担心会导致内存泄露的问题，react会自动帮你管理好，在组件卸载时ref值也会被销毁。</p>
<p>最后补充一点：</p>
<blockquote><p>不要在组件的<code>render</code>方法中访问<code>ref</code>引用，<code>render</code>方法只是返回一个虚拟dom，这时组件不一定挂载到dom中或者render返回的虚拟dom不一定会更新到dom中。</p></blockquote>
<h3 id="articleHeader8">参考</h3>
<ul>
<li><p><a href="https://facebook.github.io/react/docs/refs-and-the-dom.html" rel="nofollow noreferrer" target="_blank">Refs and the DOM</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000007815434">React从入门到精通系列之(14)refs和DOM元素</a></p></li>
<li><p><a href="http://bbs.reactnative.cn/topic/608/%E5%AF%B9%E7%BB%84%E4%BB%B6%E7%9A%84%E5%BC%95%E7%94%A8-refs" rel="nofollow noreferrer" target="_blank">对组件的引用（refs）</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React之ref详细用法

## 原文链接
[https://segmentfault.com/a/1190000008665915](https://segmentfault.com/a/1190000008665915)

