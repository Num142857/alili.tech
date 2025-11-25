---
title: 'React系列——antd组件开发思路——alert分析' 
date: 2019-01-29 2:30:10
hidden: true
slug: u1071t0ddqf
categories: [reprint]
---

{{< raw >}}

                    
<p>先附上antd源码地址：<a href="https://github.com/ant-design/ant-design/tree/master/components/alert" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/ant-design/ant-design/tree/master/components/alert" rel="nofollow noreferrer" target="_blank">https://github.com/ant-design...</a></p>
<p>昨天写了一篇分析antd之button组件的分析，今晚继续讲antd组件篇，这篇文章主要介绍的是alert实现原理，以及我们可以从antd的组件思想中学习到的react组件开发知识。<br>ps：antd用的是typescript，如果是纯ES写法稍微有些不同。</p>
<p>下面这张图是alert组件的主要结构图。<br><span class="img-wrap"><img data-src="/img/bVHksO?w=1408&amp;h=664" src="https://static.alili.tech/img/bVHksO?w=1408&amp;h=664" alt="alert" title="alert" style="cursor: pointer; display: inline;"></span></p>
<p>有这么几个部分：<br>1、demo：alert组件的使用方法<br>2、style：组件内部可能用到的初始化样式<br>3、2个.md说明文档，一个是英文版，一个是中文版<br>4、index.tsx：alert组件（关于这个组件，我是有话要说的，这个命名应该用alert，然后index通常是用来导出alert组件，antd每个组件都不是同一个人写的，估计写alert组件的人也没考虑那么多。）</p>
<p>大概知道了alert项目文件的构成之后，如何去分析组件怎样实现的呢？<br>先别看代码，看一下?提供的中文文档。<br><span class="img-wrap"><img data-src="/img/bVHks8?w=1964&amp;h=1434" src="https://static.alili.tech/img/bVHks8?w=1964&amp;h=1434" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>主要看API部分，这些api就是组件内部需要定义的接口，一共有8个参数，包括类型、事件等可能需要用到的功能。假设你们公司也打算用react来封装自己的组件，首先要考虑的是制定这样一份API方案，确定需要实现的功能以及保留的功能。</p>
<p>看完文档之后，对alert组件的数据模型有了一个大概的了解，那么接下来就要看看代码是如何实现的。<br>react组件其实就是一个JSX语法组成的模板，给dom绑定事件，从外部传入需要的参数等。</p>
<p>下面这个是index.tsx的源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'; //react都认识了
import ReactDOM from 'react-dom'; //用来获取当前的dom节点，这里只有这一个用途
import Animate from 'rc-animate'; //动画组件，好吧，原来antd的组件内部是这么不纯净，导入这么多额外的插件，难怪有人觉得antd太庞大了。
import Icon from '../icon'; //icon又出现了，这小子几乎在好几个antd组件都会用到
import classNames from 'classnames'; //定义样式对象

//构造函数，干啥的呢，现在还不知道，往下看吧。
function noop() {}

//这些就是可以调用的API
export interface AlertProps {
  /**
   * Type of Alert styles, options:`success`, `info`, `warning`, `error`
   */
  type?: 'success' | 'info' | 'warning' | 'error';
  /** Whether Alert can be closed */
  closable?: boolean;
  /** Close text to show */
  closeText?: React.ReactNode;
  /** Content of Alert */
  message: React.ReactNode;
  /** Additional content of Alert */
  description?: React.ReactNode;
  /** Callback when close Alert */
  onClose?: React.MouseEventHandler<any>;
  /** Whether to show icon */
  showIcon?: boolean;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  banner?: boolean;
}

//组件的入口在这里，一个继承于React.Component的Alert子类。
export default class Alert extends React.Component<AlertProps, any> {
//defaultProps是react组件的一个参数
  static defaultProps = {
    type: 'info',
  };
//从类的思想来看，constructor是子类Alert的构造函数，这个组件和button组件的写法有所不同，可能是出自2个工程师之手，我们可以看到在构造函数里面初始化了state的2个参数closing、closed。
  constructor(props) {
    super(props);
    this.state = {
      closing: true,
      closed: false,
    };
  }
//组件内部的点击关闭事件
  handleClose = (e) => {
    e.preventDefault();
    let dom = ReactDOM.findDOMNode(this) as HTMLElement;
    dom.style.height = `${dom.offsetHeight}px`;
    // Magic code
    // 重复一次后才能正确设置 height
    dom.style.height = `${dom.offsetHeight}px`;
    
    //设置完高度之后通过setState来更新状态，关闭alert。
    this.setState({
      closing: false,
    });
    //关闭时触发的回调函数，onClose可以在外部定义，至于noop，在这个组件并没有实现任何功能。
    (this.props.onClose || noop)(e);
  }
//动画结束时触发的回调函数，是动画插件提供的功能，不能算作本组件自己定义的函数。该回调只做了一件事，更新state。
  animationEnd = () => {
    this.setState({
      closed: true,
      closing: true,
    });
  }
//终于到了render方法了，每个react组件都有一个render方法，然后必然又一个return dom。
  render() {
//从外部传入的参数，通过this.props传入，一般用const来定义，这里用let不太合适，但不是个错误。
    let {
      closable, description, type, prefixCls = 'ant-alert', message, closeText, showIcon, banner,
      className = '', style,
    } = this.props;

    // banner模式默认有 Icon，如果传入了showIcon，就显示showIcon，否则显示banner，那要是banner也没有传入呢，那就啥都不显示了。
    showIcon = showIcon || banner;
    // banner模式默认为警告，想要使用其他类型success、info、error，就不要传入banner，然后传入type即可。
    type = banner ? 'warning' : type;
    
    //根据传入的type类型来判断icon要显示那种类型样式。注意，icon也是一个小组件。
    let iconType = '';
    switch (type) {
      case 'success':
        iconType = 'check-circle';
        break;
      case 'info':
        iconType = 'info-circle';
        break;
      case 'error':
        iconType = 'cross-circle';
        break;
      case 'warning':
        iconType = 'exclamation-circle';
        break;
      default:
        iconType = 'default';
    }

    // use outline icon in alert with description
    if (!!description) {
      iconType += '-o';
    }
    //classNames用法很简单，冒号左边是类名，右边是bool，true就显示当前样式，false就不显示当前样式，而close、description、icon、banner的样式通过外部是否传入参数或者state的状态来判断，type的样式就默认显示。
    let alertCls = classNames(prefixCls, {
      [`${prefixCls}-${type}`]: true,
      [`${prefixCls}-close`]: !this.state.closing,
      [`${prefixCls}-with-description`]: !!description,
      [`${prefixCls}-no-icon`]: !showIcon,
      [`${prefixCls}-banner`]: !!banner,
    }, className);

    // 当closeText传入为true时，将closable设置为true，我很好奇closable不也是一个可以外部传入的值吗，为什么还需要通过closeText来判断呢，感觉这3行代码有点不合理。
    if (closeText) {
      closable = true;
    }
    //如果closable为true，则closeIcon等于a标签，否则等于空。
    const closeIcon = closable ? (
      <a onClick={this.handleClose} className={`${prefixCls}-close-icon`}>
        {closeText || <Icon type=&quot;cross&quot; />}
      </a>
    ) : null;
    //如果closed是true，就return null，false则return下面的组件。
    return this.state.closed ? null : (
      <Animate
        component=&quot;&quot;
        showProp=&quot;data-show&quot;
        transitionName={`${prefixCls}-slide-up`}
        onEnd={this.animationEnd}
      >
        <div data-show={this.state.closing} className={alertCls} style={style}>
          {showIcon ? <Icon className={`${prefixCls}-icon`} type={iconType} /> : null}
          <span className={`${prefixCls}-message`}>{message}</span>
          <span className={`${prefixCls}-description`}>{description}</span>
          {closeIcon}
        </div>
      </Animate>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>; <span class="hljs-comment">//react都认识了</span>
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>; <span class="hljs-comment">//用来获取当前的dom节点，这里只有这一个用途</span>
<span class="hljs-keyword">import</span> Animate <span class="hljs-keyword">from</span> <span class="hljs-string">'rc-animate'</span>; <span class="hljs-comment">//动画组件，好吧，原来antd的组件内部是这么不纯净，导入这么多额外的插件，难怪有人觉得antd太庞大了。</span>
<span class="hljs-keyword">import</span> Icon <span class="hljs-keyword">from</span> <span class="hljs-string">'../icon'</span>; <span class="hljs-comment">//icon又出现了，这小子几乎在好几个antd组件都会用到</span>
<span class="hljs-keyword">import</span> classNames <span class="hljs-keyword">from</span> <span class="hljs-string">'classnames'</span>; <span class="hljs-comment">//定义样式对象</span>

<span class="hljs-comment">//构造函数，干啥的呢，现在还不知道，往下看吧。</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">noop</span>(<span class="hljs-params"></span>) </span>{}

<span class="hljs-comment">//这些就是可以调用的API</span>
<span class="hljs-keyword">export</span> interface AlertProps {
  <span class="hljs-comment">/**
   * Type of Alert styles, options:`success`, `info`, `warning`, `error`
   */</span>
  type?: <span class="hljs-string">'success'</span> | <span class="hljs-string">'info'</span> | <span class="hljs-string">'warning'</span> | <span class="hljs-string">'error'</span>;
  <span class="hljs-comment">/** Whether Alert can be closed */</span>
  closable?: boolean;
  <span class="hljs-comment">/** Close text to show */</span>
  closeText?: React.ReactNode;
  <span class="hljs-comment">/** Content of Alert */</span>
  message: React.ReactNode;
  <span class="hljs-comment">/** Additional content of Alert */</span>
  description?: React.ReactNode;
  <span class="hljs-comment">/** Callback when close Alert */</span>
  onClose?: React.MouseEventHandler&lt;any&gt;;
  <span class="hljs-comment">/** Whether to show icon */</span>
  showIcon?: boolean;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  banner?: boolean;
}

<span class="hljs-comment">//组件的入口在这里，一个继承于React.Component的Alert子类。</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Alert</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span>&lt;<span class="hljs-title">AlertProps</span>, <span class="hljs-title">any</span>&gt; </span>{
<span class="hljs-comment">//defaultProps是react组件的一个参数</span>
  <span class="hljs-keyword">static</span> defaultProps = {
    <span class="hljs-attr">type</span>: <span class="hljs-string">'info'</span>,
  };
<span class="hljs-comment">//从类的思想来看，constructor是子类Alert的构造函数，这个组件和button组件的写法有所不同，可能是出自2个工程师之手，我们可以看到在构造函数里面初始化了state的2个参数closing、closed。</span>
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">closing</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">closed</span>: <span class="hljs-literal">false</span>,
    };
  }
<span class="hljs-comment">//组件内部的点击关闭事件</span>
  handleClose = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
    e.preventDefault();
    <span class="hljs-keyword">let</span> dom = ReactDOM.findDOMNode(<span class="hljs-keyword">this</span>) <span class="hljs-keyword">as</span> HTMLElement;
    dom.style.height = <span class="hljs-string">`<span class="hljs-subst">${dom.offsetHeight}</span>px`</span>;
    <span class="hljs-comment">// Magic code</span>
    <span class="hljs-comment">// 重复一次后才能正确设置 height</span>
    dom.style.height = <span class="hljs-string">`<span class="hljs-subst">${dom.offsetHeight}</span>px`</span>;
    
    <span class="hljs-comment">//设置完高度之后通过setState来更新状态，关闭alert。</span>
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">closing</span>: <span class="hljs-literal">false</span>,
    });
    <span class="hljs-comment">//关闭时触发的回调函数，onClose可以在外部定义，至于noop，在这个组件并没有实现任何功能。</span>
    (<span class="hljs-keyword">this</span>.props.onClose || noop)(e);
  }
<span class="hljs-comment">//动画结束时触发的回调函数，是动画插件提供的功能，不能算作本组件自己定义的函数。该回调只做了一件事，更新state。</span>
  animationEnd = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">closed</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">closing</span>: <span class="hljs-literal">true</span>,
    });
  }
<span class="hljs-comment">//终于到了render方法了，每个react组件都有一个render方法，然后必然又一个return dom。</span>
  render() {
<span class="hljs-comment">//从外部传入的参数，通过this.props传入，一般用const来定义，这里用let不太合适，但不是个错误。</span>
    <span class="hljs-keyword">let</span> {
      closable, description, type, prefixCls = <span class="hljs-string">'ant-alert'</span>, message, closeText, showIcon, banner,
      className = <span class="hljs-string">''</span>, style,
    } = <span class="hljs-keyword">this</span>.props;

    <span class="hljs-comment">// banner模式默认有 Icon，如果传入了showIcon，就显示showIcon，否则显示banner，那要是banner也没有传入呢，那就啥都不显示了。</span>
    showIcon = showIcon || banner;
    <span class="hljs-comment">// banner模式默认为警告，想要使用其他类型success、info、error，就不要传入banner，然后传入type即可。</span>
    type = banner ? <span class="hljs-string">'warning'</span> : type;
    
    <span class="hljs-comment">//根据传入的type类型来判断icon要显示那种类型样式。注意，icon也是一个小组件。</span>
    <span class="hljs-keyword">let</span> iconType = <span class="hljs-string">''</span>;
    <span class="hljs-keyword">switch</span> (type) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">'success'</span>:
        iconType = <span class="hljs-string">'check-circle'</span>;
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">'info'</span>:
        iconType = <span class="hljs-string">'info-circle'</span>;
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">'error'</span>:
        iconType = <span class="hljs-string">'cross-circle'</span>;
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">'warning'</span>:
        iconType = <span class="hljs-string">'exclamation-circle'</span>;
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">default</span>:
        iconType = <span class="hljs-string">'default'</span>;
    }

    <span class="hljs-comment">// use outline icon in alert with description</span>
    <span class="hljs-keyword">if</span> (!!description) {
      iconType += <span class="hljs-string">'-o'</span>;
    }
    <span class="hljs-comment">//classNames用法很简单，冒号左边是类名，右边是bool，true就显示当前样式，false就不显示当前样式，而close、description、icon、banner的样式通过外部是否传入参数或者state的状态来判断，type的样式就默认显示。</span>
    <span class="hljs-keyword">let</span> alertCls = classNames(prefixCls, {
      [<span class="hljs-string">`<span class="hljs-subst">${prefixCls}</span>-<span class="hljs-subst">${type}</span>`</span>]: <span class="hljs-literal">true</span>,
      [<span class="hljs-string">`<span class="hljs-subst">${prefixCls}</span>-close`</span>]: !<span class="hljs-keyword">this</span>.state.closing,
      [<span class="hljs-string">`<span class="hljs-subst">${prefixCls}</span>-with-description`</span>]: !!description,
      [<span class="hljs-string">`<span class="hljs-subst">${prefixCls}</span>-no-icon`</span>]: !showIcon,
      [<span class="hljs-string">`<span class="hljs-subst">${prefixCls}</span>-banner`</span>]: !!banner,
    }, className);

    <span class="hljs-comment">// 当closeText传入为true时，将closable设置为true，我很好奇closable不也是一个可以外部传入的值吗，为什么还需要通过closeText来判断呢，感觉这3行代码有点不合理。</span>
    <span class="hljs-keyword">if</span> (closeText) {
      closable = <span class="hljs-literal">true</span>;
    }
    <span class="hljs-comment">//如果closable为true，则closeIcon等于a标签，否则等于空。</span>
    <span class="hljs-keyword">const</span> closeIcon = closable ? (
      &lt;a onClick={this.handleClose} className={`${prefixCls}-close-icon`}&gt;
        {closeText || &lt;Icon type="cross" /&gt;}
      &lt;/a&gt;
    ) : null;
    //如果closed是true，就return null，false则return下面的组件。
    return this.state.closed ? null : (
      &lt;Animate
        component=""
        showProp="data-show"
        transitionName={`${prefixCls}-slide-up`}
        onEnd={this.animationEnd}
      &gt;
        &lt;div data-show={this.state.closing} className={alertCls} style={style}&gt;
          {showIcon ? &lt;Icon className={`${prefixCls}-icon`} type={iconType} /&gt; : null}
          &lt;span className={`${prefixCls}-message`}&gt;{message}&lt;/span&gt;
          &lt;span className={`${prefixCls}-description`}&gt;{description}&lt;/span&gt;
          {closeIcon}
        &lt;/div&gt;
      &lt;/Animate&gt;
    );
  }
}</code></pre>
<p>根据alert组件的模型，我们可以总结出其他react组件的开发模式。<br>1、写好API文档，这些API将作为组件的参数。<br>2、写一个基本的react组件架构，比如import、export class、render()、constructor()、interface。<br>3、接着就在render()方法里面写需要外部传入的参数，通过this.props来控制。<br>4、在return里面写好你的dom结构，你还可能在render方法定义可变的样式，类似上面的alert组件。<br>5、给dom绑定事件，然后在alert组件内部写这些事件的逻辑。<br>6、写逻辑这部分是最难的，要花多点心思去组织你的代码。</p>
<p>赶紧去自己尝试些一个类似的组件吧。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React系列——antd组件开发思路——alert分析

## 原文链接
[https://segmentfault.com/a/1190000007904615](https://segmentfault.com/a/1190000007904615)

