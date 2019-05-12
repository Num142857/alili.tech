---
title: 'React系列——iscroll卡顿？使用JRoll封装react插件，逃离卡顿的套路！' 
date: 2019-01-10 2:30:08
hidden: true
slug: itagywzj03
categories: [reprint]
---

{{< raw >}}

                    
<p>非常对不起关注了专栏的小伙伴，最近一个月更新的文章很少。</p>
<p>这次分享一个react移动端封装滚动插件。</p>
<p>我们在做移动端垂直滚动的时候，会出现各种问题，卡顿、穿透、兼容性，最不能容忍的是卡顿，比如使用 <a href="https://github.com/cubiq/iscroll" rel="nofollow noreferrer" target="_blank">IScroll5</a>的时候，<strong>使用transition来实时计算滚动的状态，非常消耗性能</strong>，你能百度搜索到的各种iscroll卡顿解决方案都尝试了，最后还是不得不放弃，在IOS上的体验还行，但是在Android的滚动体验，一个字：cao。</p>
<p>然后，我就使用了 <a href="https://github.com/chjtx/JRoll" rel="nofollow noreferrer" target="_blank">JRoll2</a>，该作者使用的是translate滚动方式，大大减小了卡顿的情况，打开京东移动端网站，点击底bar的分类，然后左侧的分类导航就是使用translate的滚动方式实现的。</p>
<p>Iscroll和JRoll使用的方式几乎一样，我仅仅改变了一个require('Iscroll') =&gt; require('jroll')，就能无缝切换。</p>
<p>下面就讲解封装JRoll和具体使用的方法。</p>
<h3 id="articleHeader0">使用</h3>
<p>你可以用npm安装到项目中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i --save react-roll-container" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code class="npm" style="word-break: break-word; white-space: initial;">npm i --save react-<span class="hljs-keyword">roll</span>-<span class="hljs-keyword">container</span></code></pre>
<p>也可以去github看使用文档</p>
<p><a href="https://github.com/hyy1115/react-roll-container" rel="nofollow noreferrer" target="_blank">react-roll-container</a></p>
<h4>封装JRoll</h4>
<p>新建一个MyScroll.js：jroll体积非常小，用起来很方便，我简单封装了3个配置参数<strong>ID</strong>和<strong>height</strong>、<strong>children</strong>。ID是配置div容器的id属性，height是指div容器的高度（必须设置），children是滚动的元素列表。</p>
<p>我们在componentDidMount实例化jroll对象，当componentDidUpdate的时候，也就是数据发生更新的时候，滚动区域的高度可能发生了变化，那么执行refresh重新计算滚动区域。你如果需要更强大的配置，还可以添加option参数的设置，在这里我就采用默认配置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
const JRoll = require('jroll')

export default class MyJRoll extends React.Component {
    constructor(props) {
        super(props)
        this.jroll = null
    }
    componentDidMount() {
        let wrappers = this.props.ID || 'wrappers'
        this.jroll = new JRoll(`#${wrappers}`)
        this.jroll.refresh()
    }
    componentDidUpdate() {
        this.jroll.refresh()
    }
    render() {
        const { height } = this.props
        return (
            <div id={this.props.ID ? this.props.ID : 'wrappers'} style="{{"height: height ? height : &quot;100%&quot;"}}">
                <ul id=&quot;scroller&quot;>
                    {this.props.children}
                </ul>
            </div>
        )
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">const</span> JRoll = <span class="hljs-built_in">require</span>(<span class="hljs-string">'jroll'</span>)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyJRoll</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props)
        <span class="hljs-keyword">this</span>.jroll = <span class="hljs-literal">null</span>
    }
    componentDidMount() {
        <span class="hljs-keyword">let</span> wrappers = <span class="hljs-keyword">this</span>.props.ID || <span class="hljs-string">'wrappers'</span>
        <span class="hljs-keyword">this</span>.jroll = <span class="hljs-keyword">new</span> JRoll(<span class="hljs-string">`#<span class="hljs-subst">${wrappers}</span>`</span>)
        <span class="hljs-keyword">this</span>.jroll.refresh()
    }
    componentDidUpdate() {
        <span class="hljs-keyword">this</span>.jroll.refresh()
    }
    render() {
        <span class="hljs-keyword">const</span> { height } = <span class="hljs-keyword">this</span>.props
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">{this.props.ID</span> ? <span class="hljs-attr">this.props.ID</span> <span class="hljs-attr">:</span> '<span class="hljs-attr">wrappers</span>'} <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"height:</span> <span class="hljs-attr">height</span> ? <span class="hljs-attr">height</span> <span class="hljs-attr">:</span> "<span class="hljs-attr">100</span>%""}}"&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"scroller"</span>&gt;</span>
                    {this.props.children}
                <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}
</code></pre>
<h4>在react组件中使用MyScroll.js</h4>
<p><strong>记住，一定要给滚动容器设置一个具体的高度</strong>，最好的办法是在组件渲染完成之后，去计算滚动区域需要的高度，然后设置给state，如果你使用了redux，那么传递到store里面保存这个高度。在组件内设置state可能存在异步无法即使更新的问题，但是在store中保存和读取就不存在。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import MyScroll from './MyScroll'
export class ReportPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            scrollHeight: 0
        }
    }
    
    componentDidMount() {
        //1、使用函数获取你当前MyScroll的滚动高度
        //2、将计算出来的高度存储到state或者store
        //这2个步骤推荐封装成一个函数。
        this.setState({scrollHeight: newHeight + 'px'})
    }
    
    render() {
        return (
            <MyScroll ID=&quot;myWrapper&quot; height={this.state.scrollHeight} ref={myRoll => this.myRoll = myRoll}>
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>
            </MyScroll>
        )
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> MyScroll <span class="hljs-keyword">from</span> <span class="hljs-string">'./MyScroll'</span>
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ReportPage</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props)
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">scrollHeight</span>: <span class="hljs-number">0</span>
        }
    }
    
    componentDidMount() {
        <span class="hljs-comment">//1、使用函数获取你当前MyScroll的滚动高度</span>
        <span class="hljs-comment">//2、将计算出来的高度存储到state或者store</span>
        <span class="hljs-comment">//这2个步骤推荐封装成一个函数。</span>
        <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">scrollHeight</span>: newHeight + <span class="hljs-string">'px'</span>})
    }
    
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">MyScroll</span> <span class="hljs-attr">ID</span>=<span class="hljs-string">"myWrapper"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">{this.state.scrollHeight}</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{myRoll</span> =&gt;</span> this.myRoll = myRoll}&gt;
                  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">MyScroll</span>&gt;</span></span>
        )
    }
}
</code></pre>
<h4>额外的一些操作</h4>
<p>1、推荐在移动端添加FastClick插件解决移动端点击事件的一些bug。</p>
<p>2、在全局使用MyScroll滚动插件，你需要全局设置下面的代码，禁用触摸的默认事件，设置html/body的高度。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.addEventListener('touchmove', (event) => event.preventDefault(), false);


html, body {
    height: 100%
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'touchmove'</span>, <span class="hljs-function"><span class="hljs-params">(event)</span> =&gt;</span> event.preventDefault(), <span class="hljs-literal">false</span>);


html, body {
    height: <span class="hljs-number">100</span>%
}
</code></pre>
<p>3、在组件内部使用滚动插件，你需要在组件内部的componentDidMount()设置禁用函数，并且在卸载组件的时候取消禁用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidMonut() {
    document.addEventListener('touchmove', this.handler(), false);
}

handler() {
    event.preventDefault()
}

componentWillUnmount() {
    document.removeEventListener('touchmove', this.handler(), false);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code>componentDidMonut() {
    document.addEventListener(<span class="hljs-string">'touchmove'</span>, <span class="hljs-keyword">this</span>.<span class="hljs-keyword">handler</span>(), <span class="hljs-keyword">false</span>);
}

<span class="hljs-keyword">handler</span>() {
    event.preventDefault()
}

componentWillUnmount() {
    document.removeEventListener(<span class="hljs-string">'touchmove'</span>, <span class="hljs-keyword">this</span>.<span class="hljs-keyword">handler</span>(), <span class="hljs-keyword">false</span>);
}
</code></pre>
<p>4、支持MyScroll插件嵌套使用，请使用新的ID命名和高度。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<MyScroll ID=&quot;myWrapper&quot; height={this.state.scrollHeight} ref={myRoll => this.myRoll = myRoll}>
         <div>1</div>
         <MyScroll ID=&quot;childWrapper&quot; height={this.state.childHeight} ref={childRoll => this.childRoll = childRoll}>
         </MyScroll>
</MyScroll>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">MyScroll</span> <span class="hljs-attr">ID</span>=<span class="hljs-string">"myWrapper"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">{this.state.scrollHeight}</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{myRoll</span> =&gt;</span> this.myRoll = myRoll}&gt;
         <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">MyScroll</span> <span class="hljs-attr">ID</span>=<span class="hljs-string">"childWrapper"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">{this.state.childHeight}</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{childRoll</span> =&gt;</span> this.childRoll = childRoll}&gt;
         <span class="hljs-tag">&lt;/<span class="hljs-name">MyScroll</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">MyScroll</span>&gt;</span>

</code></pre>
<p><strong>如果文章对你有帮助，请点击一下推荐。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React系列——iscroll卡顿？使用JRoll封装react插件，逃离卡顿的套路！

## 原文链接
[https://segmentfault.com/a/1190000010042474](https://segmentfault.com/a/1190000010042474)

