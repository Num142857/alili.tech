---
title: 'React中的三种类型组件介绍' 
date: 2018-12-25 2:30:11
hidden: true
slug: f0lcruichmf
categories: [reprint]
---

{{< raw >}}

                    
<p>React从诞生到现在，越来越多的前端开发者喜欢上该框架，其原因有很多，其中一个主要的原因是因为它的组件很灵活，而本博客主要介绍React的三种类型的组件：受控类型，无状态类型，高阶类型。</p>
<p>在讲组件之前，先介绍一下React组件的两个重要特性：</p>
<ol>
<li><p>props:组件属性，专门用来连接父子组件间通信，父组件传输父类成员，子组件可以利用但不能编辑父类成员；</p></li>
<li><p>state：专门负责保存和改变组件内部的状态；</p></li>
</ol>
<p>现在开始步入主题了</p>
<ul><li><p>受控类型组件：</p></li></ul>
<p>A）非受控组件<br>定义：该组件内部的状态不受state控制；<br>一般模式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<component defaultVaule='' />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">defaultVaule</span>=<span class="hljs-string">''</span> /&gt;</span></code></pre>
<p>缺点：组件的变化不容易管理；<br>demo：</p>
<p><span class="img-wrap"><img data-src="/img/bVY1mC?w=434&amp;h=138" src="https://static.alili.tech/img/bVY1mC?w=434&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>B）受控组件<br>定义：组件的状态变化受到state的控制；<br>模式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 组件的值----state控制；
 组件值得变换---通过触发onChange事件，然后由this.setState负责改变；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code> 组件的值<span class="hljs-comment">----state控制；</span>
 组件值得变换<span class="hljs-comment">---通过触发onChange事件，然后由this.setState负责改变；</span></code></pre>
<p>demo：</p>
<p><span class="img-wrap"><img data-src="/img/bVY1nT?w=448&amp;h=407" src="https://static.alili.tech/img/bVY1nT?w=448&amp;h=407" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul><li><p>无状态组件</p></li></ul>
<p>定义：若一个组件不含有状态和对状态的处理，则可以将render方法单独抽取出来，成为一个独立的组件函数；</p>
<p>特点：<br>1）不包含任何状态，但可以包含属性；<br>2）无状态组件生成时不用实例化；<br>3）无状态组件没有this，ref和生命周期；</p>
<p>作用：<br>1）单纯的UI表现，不用涉及太多的交互；<br>2）不用对DOM做过多的操作；<br>demo：</p>
<p><span class="img-wrap"><img data-src="/img/bVY1oM?w=290&amp;h=195" src="https://static.alili.tech/img/bVY1oM?w=290&amp;h=195" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>注意：<br>无状态组件转化为有状态组件，则通过高阶组件转化；方式就是高阶组件通过props传入state。</p>
<p>demo：</p>
<p><span class="img-wrap"><img data-src="/img/bVY1pB?w=476&amp;h=468" src="https://static.alili.tech/img/bVY1pB?w=476&amp;h=468" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul><li><p>高阶组件</p></li></ul>
<p>定义：一个包含了另一个React组件的React组件；本质上就是一个函数.<br>形式：</p>
<p><span class="img-wrap"><img data-src="/img/bVY1qw?w=632&amp;h=234" src="https://static.alili.tech/img/bVY1qw?w=632&amp;h=234" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>包装方式：属性代理和反向代理；<br>特点：不会改变被包装组件的内容，结构，不会复制它的行为，是利用它创建一个新的行为；</p>
<ul><li><p>属性代理：</p></li></ul>
<p>定义：高阶组件接受外界实行，然后通过包装环境传递给被包装组件；<br>形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function HOC(Com) {
  其他处理；
  return class [Name] extends Component {
     constructor(props) {
       super(props);
     }
     render() {
        return (
          <div>
             <Com {...this.props} />
          </div>
        )
     }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>function <span class="hljs-type">HOC</span>(<span class="hljs-type">Com</span>) {
  其他处理；
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> [<span class="hljs-type">Name</span>] <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
     constructor(props) {
       <span class="hljs-keyword">super</span>(props);
     }
     render() {
        <span class="hljs-keyword">return</span> (
          &lt;div&gt;
             &lt;<span class="hljs-type">Com</span> {...<span class="hljs-keyword">this</span>.props} /&gt;
          &lt;/div&gt;
        )
     }
  }
}</code></pre>
<p>Name:可以指定返回组件的名称；</p>
<ul><li><p>反向代理</p></li></ul>
<p>定义：指定的组件作为另一个组件的父类，而继承了的组件就是一个高阶组件<br>特点：<br> 1）该组件是被动被继承；<br> 2）高阶组件可以通过this来获取父类的state，props，生命周期函数和渲染函数；<br> 3）一般来说，若调用父类的生命周期和渲染函数，用super来调用，以便保护父类的生命周期和渲染函数；<br>优势：<br>渲染劫持：高阶组件通过props属性来决定父类的渲染树是否被渲染（props不能创建或者改变props的名称，但可以更改和操作props的值）；<br>demo：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function HOC(B){
       return class [A] extends B{
         render(){
             return super.render();
      }
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>function <span class="hljs-type">HOC</span>(<span class="hljs-type">B</span>){
       <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> [<span class="hljs-type">A</span>] <span class="hljs-keyword">extends</span> <span class="hljs-title">B</span></span>{
         render(){
             <span class="hljs-keyword">return</span> <span class="hljs-keyword">super</span>.render();
      }
 }</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React中的三种类型组件介绍

## 原文链接
[https://segmentfault.com/a/1190000012121241](https://segmentfault.com/a/1190000012121241)

