---
title: '在格式化的场景下，React input 的光标的处理办法' 
date: 2019-02-13 2:31:23
hidden: true
slug: dl25z1wufyq
categories: [reprint]
---

{{< raw >}}

                    
<p>今天要来说的是有关于有数值格式化的场景中，React input 光标的一些异常的表现和对应的处理办法。故事要从一个 <a href="https://github.com/salt-ui/saltui/issues/288" rel="nofollow noreferrer" target="_blank">issue</a> 说起，有用户反映在使用 NumberField 组件输入时安卓下会出现光标位置异常，导致连续输入会达不到期望的结果。具体表现是什么样的呢？</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016758144" src="https://static.alili.tech/img/remote/1460000016758144" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote>图1 安卓下不期望的输入行为</blockquote>
<p>可以看到，在安卓手机下每次格式化发生的时候，本来应该一直在最后的光标会错格一位，导致连续输入出现问题。而这个问题在 PC Chrome 和 iOS 上都没有出现，于是可以判定是一个兼容性问题。但这个兼容性问题是如何产生的呢？</p>
<p>分析一下格式化的话的过程，如上面的情况，输入 18758 时，因为要做针对卡号的格式化，所以会将原有的值转变为 "1875 8"，从字符串长度上来看，从 5 位变成了 6 位，那么如果此时光标位置没有在值变化时跳到最后一位，则会停留在空格处，看起来就好像错格了一位，连续输入时就会有问题。</p>
<p>单从输入框的光标变化行为来看，这好像也不算是一种异常的变化，只是不响应值的变化跳到尾部而已。但引申出来的问题是为什么在 iOS 和 PC Chrome 下又会跳动到尾部呢。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016758145" src="https://static.alili.tech/img/remote/1460000016758145" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote>图2： 相同的代码在 PC Chrome 下表现与安卓不同。</blockquote>
<p>于是去网上搜索，辗转在 React 的 github 中找到这样一个 issue, <a href="https://github.com/facebook/react/issues/955" rel="nofollow noreferrer" target="_blank">Cursor jumps to end of controlled input</a>。在这里 React 的主要维护者之一的 @sophiebits(spicyj) 给出了一个比较确切的<a href="https://github.com/facebook/react/issues/955#issuecomment-160703606" rel="nofollow noreferrer" target="_blank">答案</a>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016758146" src="https://static.alili.tech/img/remote/1460000016758146" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote>图3 sophiebits 关于 React controlled input value 变化时光标行为的解释</blockquote>
<p>原来因为 value 的变化具有非常大的不确定性，因此 React 无法使用一种可靠且通用的逻辑去保存光标的位置在一个合适的位置，因此 React 在受控模式下的重新渲染都会时光标移动到最后的位置。这个至少解释了PC Chrome 和 iOS 下光标跳动到结尾的原因，但安卓下为什么没有表现出同样的行为到目前位置我还没有找到合理的解释。</p>
<p>那有没有办法使安卓上的表现和 iOS 中一致呢？又是一阵翻阅和尝试，最后发现如果将重新渲染的过程和 input 的 onChange 置于前后两个 tick 中就可以使安卓中 input 的表现和其他平台上表现一致，即表现为光标在重新渲染时跳到最后，示意代码如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'React';
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'xxx',
        };
    }
    
    handleChange(e) {
        const value = e.target.value;
        // 通过 setTimeout 异步
        // 使 re-render 和 onChange 处于两个 tick 中
        setTimeout(() => {
            this.setState({
                value,
            });
        });
    }
    
    render() {
        return (
            <input 
                value={this.state.value} 
                onChange={(e) => { this.handleChange(e); "}}"  
            />
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">'Reac</span>t';
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Demo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    constructor(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            value: <span class="hljs-symbol">'xx</span>x',
        };
    }
    
    handleChange(e) {
        const value = e.target.value;
        <span class="hljs-comment">// 通过 setTimeout 异步</span>
        <span class="hljs-comment">// 使 re-render 和 onChange 处于两个 tick 中</span>
        setTimeout(() =&gt; {
            <span class="hljs-keyword">this</span>.setState({
                value,
            });
        });
    }
    
    render() {
        <span class="hljs-keyword">return</span> (
            &lt;input 
                value={<span class="hljs-keyword">this</span>.state.value} 
                onChange={(e) =&gt; { <span class="hljs-keyword">this</span>.handleChange(e); "}}"  
            /&gt;
        );
    }
}</code></pre>
<p>这样终于使得表现的行为在安卓和 iOS 上表现一致，并且正常输入的情况下表现得比较符合期望了，然而等等，这样就可以了吗？从之前的 React issue 中得出的结论可以看出，无论是如何的修改都会跳至 input 的结尾，这样如果是从中间修改的话会变成什么样?</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016758147" src="https://static.alili.tech/img/remote/1460000016758147" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote>图4：中间编辑时又会出现问题</blockquote>
<p>从上面的图里可以看出，因为 React 无论何种修改都会将光标置尾，如果从中间进行修改，那么表现地又会很不符合用户预期，没有办法做到连续输入。这回倒是两端行为保持一致，都是不期望的状态。。</p>
<p>但是都不正常也有好处，不需要根据平台去写一些 ifelse，可以统一地去做处理。从上面的讨论中我们可以知道 React 没有保存光标的位置是因为没有一个通用并且可靠的算法去支撑这一行为。这是因为 input 的变化可能是增加空格做格式化，也可能是过滤过些字符，也可能是触发某些条件直接变成了其他字符等各种无法预测的变化行为。但是细化到数字格式化这一单一场景时，光标位置的保存逻辑就变得简单和清晰的多了。</p>
<p>在用户输入的过程中，只存在两种情况，在结尾中追加和在中间修改。在结尾追加的 case 中，例如 18758^ 时，由于一直是在向后追加的状态，我们只要一直保持光标在最后即可（即默认状态 1875 8^ ），在中间编辑的 case 下，光标并不处于结尾，如 187^5 8，此时如果在 7 后面追加了一个 8，那么理想的图标应该维持在 8 之后（即 1878^ 58），此时就应该保存光标的位置在上次 format 之前的状态。</p>
<p>逻辑清楚了，接下来就是如何实现的问题了。那么如何探测和修改光标位置呢？这就涉及了 input 中选区相关的属性，我们知道我们可以通过一些方式（如鼠标拖拽和长按屏幕等）在 input 中完成对一段话的选区，因此光标的位置其实是由选区的开始点（selectionStart）和结束点（selectionEnd）决定的。那么其实我们就可以通过读取，储存和设置这两个属性来达到我们想要实现的目的，实例代码如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Demo extends React.Component {
    ...
    
    componentDidUpdate(prevProps) {
        const { value } = prevProps;
        const { inputSelection } = this;
        if (inputSelection) {
          // 在 didUpdate 时根据情况恢复光标的位置
          // 如果光标的位置小于值的长度，那么可以判定属于中间编辑的情况
          // 此时恢复光标的位置
          if (inputSelection.start < this.formatValue(value).length) {
            const input = this.input;
            input.selectionStart = inputSelection.start;
            input.selectionEnd = inputSelection.end;
            this.inputSelection = null;
          }
        }
    }
    
    handleChange(e) {
        // 在 onChange 时记录光标的位置
        if (this.input) {
          this.inputSelection = {
            start: this.input.selectionStart,
            end: this.input.selectionEnd,
          };
        }
        ...
    }
    
    render() {
        return (
            <input 
                ref={(c) => { this.input = c; "}}"
                value={this.state.value} 
                onChange={(e) => { this.handleChange(e); "}}"  
            />
        );
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Demo</span> <span class="hljs-title">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    ...
    
    componentDidUpdate(prevProps) {
        const { value } = prevProps;
        const { inputSelection } = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">if</span> (inputSelection) {
          <span class="hljs-comment">// 在 didUpdate 时根据情况恢复光标的位置</span>
          <span class="hljs-comment">// 如果光标的位置小于值的长度，那么可以判定属于中间编辑的情况</span>
          <span class="hljs-comment">// 此时恢复光标的位置</span>
          <span class="hljs-keyword">if</span> (inputSelection.start &lt; <span class="hljs-keyword">this</span>.formatValue(value).length) {
            const input = <span class="hljs-keyword">this</span>.input;
            input.selectionStart = inputSelection.start;
            input.selectionEnd = inputSelection.end;
            <span class="hljs-keyword">this</span>.inputSelection = <span class="hljs-literal">null</span>;
          }
        }
    }
    
    handleChange(e) {
        <span class="hljs-comment">// 在 onChange 时记录光标的位置</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.input) {
          <span class="hljs-keyword">this</span>.inputSelection = {
            start: <span class="hljs-keyword">this</span>.input.selectionStart,
            end: <span class="hljs-keyword">this</span>.input.selectionEnd,
          };
        }
        ...
    }
    
    render() {
        <span class="hljs-keyword">return</span> (
            &lt;input 
                ref={(c) =&gt; { <span class="hljs-keyword">this</span>.input = c; "}}"
                value={<span class="hljs-keyword">this</span>.state.value} 
                onChange={(e) =&gt; { <span class="hljs-keyword">this</span>.handleChange(e); "}}"  
            /&gt;
        );
    }
}
</code></pre>
<p>至此，我们终于在追加和中间编辑的情况下都实现了我们想要的效果。这是一个比较小的技术点，但是由于里面涉及了一些 React 内部的处理逻辑及平台差异性问题，排查和解决起来并不是那么容易，希望可以给有类似问题的同学在处理时有所启发。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016758148" src="https://static.alili.tech/img/remote/1460000016758148" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>文中涉及的各端及浏览器信息</h4>
<ul><li>Android</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Mozilla/5.0 (Linux; U; Android 8.1.0; zh-CN; CLT-AL00 Build/HUAWEICLT-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.108 UCBrowser/11.9.4.974 UWS/2.13.1.48 Mobile Safari/537.36 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">Mozilla/<span class="hljs-number">5.0</span> (Linux; U; Android <span class="hljs-number">8.1</span><span class="hljs-number">.0</span>; zh-CN; CLT-AL00 Build/HUAWEICLT-AL00) AppleWebKit/<span class="hljs-number">537.36</span> (KHTML, like Gecko) Version/<span class="hljs-number">4.0</span> Chrome/<span class="hljs-number">57.0</span><span class="hljs-number">.2987</span><span class="hljs-number">.108</span> UCBrowser/<span class="hljs-number">11.9</span><span class="hljs-number">.4</span><span class="hljs-number">.974</span> UWS/<span class="hljs-number">2.13</span><span class="hljs-number">.1</span><span class="hljs-number">.48</span> Mobile Safari/<span class="hljs-number">537.36</span> </code></pre>
<ul><li>iOS</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15F79" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">Mozilla/<span class="hljs-number">5.0</span> (iPhone; CPU iPhone OS <span class="hljs-number">11</span>_4 like Mac OS X) AppleWebKit/<span class="hljs-number">605.1</span><span class="hljs-number">.15</span> (KHTML, like Gecko) Mobile/<span class="hljs-number">15</span>F79</code></pre>
<ul><li>PC Chrome</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Mobile Safari/537.36" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">Mozilla/<span class="hljs-number">5.0</span> (Linux; Android <span class="hljs-number">5.0</span>; SM-G900P Build/LRX21T) AppleWebKit/<span class="hljs-number">537.36</span> (KHTML, like Gecko) Chrome/<span class="hljs-number">69.0</span><span class="hljs-number">.3497</span><span class="hljs-number">.100</span> Mobile Safari/<span class="hljs-number">537.36</span></code></pre>
<h4>文中涉及的组件库</h4>
<ul><li>SaltUI: <a href="https://github.com/salt-ui/saltui" rel="nofollow noreferrer" target="_blank">https://github.com/salt-ui/sa...</a>
</li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在格式化的场景下，React input 的光标的处理办法

## 原文链接
[https://segmentfault.com/a/1190000016758141](https://segmentfault.com/a/1190000016758141)

