---
title: 'React事件机制' 
date: 2019-01-18 2:30:34
hidden: true
slug: 3ckpffaw715
categories: [reprint]
---

{{< raw >}}

                    
<p>　　最近在阅读<a href="https://book.douban.com/subject/26918038/" rel="nofollow noreferrer" target="_blank">《深入React技术栈》</a>一书中，发现了之前使用React中并没有注意到的React事件与浏览器原生事件之间的区别，鉴于好久已经没有写东西了，就想写一下关于React事件的文章。<br>　　首先我们举个例子，如果我们需要实现一个组件，这个组件点击按钮会显示一个二维码，点击二维码之外的区域可以隐藏二维码，但是点击二维码本身却不会关闭，代码如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//代码来源于《深入React技术栈》2.1.4节
class QrCode extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickQr = this.handleClickQr.bind(this);
    this.state = {
      active: false,
    };
  }
  
  componentDidMount() {
    document.body.addEventListener('click', e => {
      this.setState({
        active: false,
      });
    });
  }

  componentWillUnmount() {
    document.body.removeEventListener('click');
  }
  
  handleClick() {
    this.setState({
      active: !this.state.active,
    });
  }
  
  handleClickQr(e) {
    e.stopPropagation();
  }

  render() {
    return (
      <div className=&quot;qr-wrapper&quot;>
        <button className=&quot;qr&quot; onClick={this.handleClick}>二维码</button>
        <div
          className=&quot;code&quot;
          style="{{" display: this.state.active ? 'block' : 'none' "}}"
          onClick={this.handleClickQr}
        >
          <img src=&quot;qr.jpg&quot; alt=&quot;qr&quot; />
        </div>
      </div>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//代码来源于《深入React技术栈》2.1.4节</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">QrCode</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.handleClick = <span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.handleClickQr = <span class="hljs-keyword">this</span>.handleClickQr.bind(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">active</span>: <span class="hljs-literal">false</span>,
    };
  }
  
  componentDidMount() {
    <span class="hljs-built_in">document</span>.body.addEventListener(<span class="hljs-string">'click'</span>, e =&gt; {
      <span class="hljs-keyword">this</span>.setState({
        <span class="hljs-attr">active</span>: <span class="hljs-literal">false</span>,
      });
    });
  }

  componentWillUnmount() {
    <span class="hljs-built_in">document</span>.body.removeEventListener(<span class="hljs-string">'click'</span>);
  }
  
  handleClick() {
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">active</span>: !<span class="hljs-keyword">this</span>.state.active,
    });
  }
  
  handleClickQr(e) {
    e.stopPropagation();
  }

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"qr-wrapper"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"qr"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClick}</span>&gt;</span>二维码<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
          <span class="hljs-attr">className</span>=<span class="hljs-string">"code"</span>
          <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"</span> <span class="hljs-attr">display:</span> <span class="hljs-attr">this.state.active</span> ? '<span class="hljs-attr">block</span>' <span class="hljs-attr">:</span> '<span class="hljs-attr">none</span>' "}}"
          <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClickQr}</span>
        &gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"qr.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"qr"</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  }
}</span></code></pre>
<p>　　上面代码从感官上感觉确实可以实现要求的组件，但事实上我们运行上述代码可以发现，点击二维码本身也会导致二维码的隐藏，现在就有意思了，我们来仔细分析一下。<br>　　其实React事件并没有原生的绑定在真实的DOM上，而是使用了<strong>行为委托</strong>方式实现事件机制。<br>　　<span class="img-wrap"><img data-src="/img/remote/1460000008782648?w=407&amp;h=356" src="https://static.alili.tech/img/remote/1460000008782648?w=407&amp;h=356" alt="DOM事件机制" title="DOM事件机制" style="cursor: pointer; display: inline;"></span></p>
<p>　　如上图所示，在JavaScript中，事件的触发实质上是要经过三个阶段:事件捕获、目标对象本身的事件处理和事件冒泡，假设在<code>div</code>中触发了<code>click</code>事件，实际上首先经历<strong>捕获阶段</strong>会由父级元素将事件一直传递到事件发生的元素，执行完目标事件本身的处理事件后，然后经历<strong>冒泡阶段</strong>，将事件从子元素向父元素冒泡。正因为事件在DOM的传递经历这样一个过程，从而为行为委托提供了可能。通俗地讲，行为委托的实质就是将子元素事件的处理委托给父级元素处理。React会将所有的事件都绑定在最外层(<code>document</code>)，使用统一的事件监听，并在冒泡阶段处理事件，当挂载或者卸载组件时，只需要在通过的在统一的事件监听位置增加或者删除对象，因此可以提高效率。<br>　　并且React并没有使用原生的浏览器事件，而是在基于Virtual DOM的基础上实现了合成事件(SyntheticEvent)，事件处理程序接收到的是SyntheticEvent的实例。SyntheticEvent完全符合W3C的标准，因此在事件层次上具有浏览器兼容性，与原生的浏览器事件一样拥有同样的接口，可以通过<code>stopPropagation()</code>和<code>preventDefault()</code>相应的中断。如果需要访问当原生的事件对象，可以通过引用<code>nativeEvent</code>获得。<br>　　<span class="img-wrap"><img data-src="/img/remote/1460000008782649?w=885&amp;h=518" src="https://static.alili.tech/img/remote/1460000008782649?w=885&amp;h=518" alt="此处输入图片的描述" title="此处输入图片的描述" style="cursor: pointer; display: inline;"></span><br>　　上图为大致的React事件机制的流程图，React中的事件机制分为两个阶段:事件注册和事件触发:</p>
<ol>
<li><p>事件注册　　<br>　　React在组件加载(<code>mount</code>)和更新(<code>update</code>)时,其中的<code>ReactDOMComponent</code>会对传入的<strong>事件属性</strong>进行处理，对相关事件进行注册和存储。<code>document</code>中注册的事件不处理具体的事件，仅对事件进行分发。<code>ReactBrowserEventEmitter</code>作为事件注册入口，担负着事件注册和事件触发。注册事件的回调函数由<code>EventPluginHub</code>来统一管理，根据事件的类型(<code>type</code>)和组件标识(<code>_rootNodeID</code>)为<code>key</code>唯一标识事件并进行存储。</p></li>
<li><p>事件执行<br>　　事件执行时，document上绑定事件<code>ReactEventListener.dispatchEvent</code>会对事件进行分发，根据之前存储的类型(<code>type</code>)和组件标识(<code>_rootNodeID</code>)找到触发事件的组件。<code>ReactEventEmitter</code>利用<code>EventPluginHub</code>中注入(<code>inject</code>)的<code>plugins</code>(例如:<code>SimpleEventPlugin</code>、<code>EnterLeaveEventPlugin</code>)会将原生的DOM事件转化成合成的事件，然后批量执行存储的回调函，回调函数的执行分为两步，第一步是将所有的合成事件放到事件队列里面，第二步是逐个执行。需要注意的是，浏览器原生会为每个事件的每个listener创建一个事件对象，可以从这个事件对象获取到事件的引用。这会造成高额的内存分配，React在启动时就会为每种对象分配内存池，用到某一个事件对象时就可以从这个内存池进行复用，节省内存。</p></li>
</ol>
<p>　　再回到我们刚开始的问题，现在看起来就很没有很费解了，之所以会出现上面的问题是因为我们混用了React的事件机制和DOM原生的事件机制，认为通过:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleClickQr(e) {
    e.stopPropagation();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">handleClickQr(e) {
    e.stopPropagation();
}</code></pre>
<p>就能阻止原生的事件传播，其实在事件委托的情形下是不能实现这一点的。当然解决的办法也不复杂,不要将React事件和DOM原生事件混用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidMount() {
  document.body.addEventListener('click', e => {
    this.setState({
      active: false,
    });
  });
　
  document.querySelector('.code').addEventListener('click', e => {
    e.stopPropagation();
  })
}

componentWillUnmount() {
  document.body.removeEventListener('click');
  document.querySelector('.qr').removeEventListener('click');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">componentDidMount() {
  <span class="hljs-built_in">document</span>.body.addEventListener(<span class="hljs-string">'click'</span>, e =&gt; {
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">active</span>: <span class="hljs-literal">false</span>,
    });
  });
　
  <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.code'</span>).addEventListener(<span class="hljs-string">'click'</span>, e =&gt; {
    e.stopPropagation();
  })
}

componentWillUnmount() {
  <span class="hljs-built_in">document</span>.body.removeEventListener(<span class="hljs-string">'click'</span>);
  <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.qr'</span>).removeEventListener(<span class="hljs-string">'click'</span>);
}</code></pre>
<p>或者通过事件原件对象中的<code>target</code>进行判断:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidMount() {
  document.body.addEventListener('click', e => {
    if (e.target &amp;&amp; e.target.matches('div.code')) {
      return;
    }
　
    this.setState({
      active: false,
    });
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">componentDidMount() {
  <span class="hljs-built_in">document</span>.body.addEventListener(<span class="hljs-string">'click'</span>, e =&gt; {
    <span class="hljs-keyword">if</span> (e.target &amp;&amp; e.target.matches(<span class="hljs-string">'div.code'</span>)) {
      <span class="hljs-keyword">return</span>;
    }
　
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">active</span>: <span class="hljs-literal">false</span>,
    });
  });
}</code></pre>
<p>都可以解决异常关闭的问题。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React事件机制

## 原文链接
[https://segmentfault.com/a/1190000008782645](https://segmentfault.com/a/1190000008782645)

