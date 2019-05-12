---
title: '[译]React ES6 class constructor super()' 
date: 2019-01-28 2:30:09
hidden: true
slug: jx520605u4l
categories: [reprint]
---

{{< raw >}}

                    
<p>原博文地址: <a href="http://cheng.logdown.com/posts/2016/03/26/683329" rel="nofollow noreferrer" target="_blank">http://cheng.logdown.com/posts/2016/03/26/683329</a></p>
<p>当我们像下面这样使用<code>React</code>的<code>ES6</code> class语法创建一个组件的时候：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyClass extends React.component {
    constructor(){
        super()
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyClass</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">component</span> </span>{
    constructor(){
        <span class="hljs-keyword">super</span>()
    }
}</code></pre>
<p>不禁会提出两个问题：</p>
<ol>
<li><p>在<code>constructor</code>里面调用<code>super</code>是否是必要的？</p></li>
<li><p><code>super</code>与<code>super(props)</code>的区别？</p></li>
</ol>
<h4>解答一：</h4>
<p><em>仅当存在constructor的时候必须调用<code>super</code>，如果没有，则不用</em></p>
<p>如果在你声明的组件中存在<code>constructor</code>，则必须要加<code>super</code>，举个栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyClass extends React.component {
    render(){
        return <div>Hello { this.props.world }</div>;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyClass</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">component</span> </span>{
    render(){
        <span class="hljs-keyword">return</span> &lt;div&gt;<span class="hljs-type">Hello</span> { <span class="hljs-keyword">this</span>.props.world }&lt;/div&gt;;
    }
}</code></pre>
<p>这段代码完美无误，你不需要为之去调用<code>super</code>，然而，如果在你的代码中存在<code>consturctor</code>，那你<strong>必须调用</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyClass extends React.component {
    constructor(){
        console.log(this) //Error: 'this' is not allowed before super()

    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyClass</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">component</span> </span>{
    constructor(){
        console.log(<span class="hljs-keyword">this</span>) <span class="hljs-comment">//Error: 'this' is not allowed before super()</span>

    }
}</code></pre>
<p>之所以会报错，是因为若不执行<code>super</code>，则<code>this</code>无法初始化。</p>
<p>你也许会抱着侥幸心理猜测：那我直接写个空的<code>constructor</code>就得了呗~，然而，在<code>ES6</code>中的<code>class</code>语法中，只要你的<code>class</code>是子类，那必须得调用<code>super</code>，换句话说，有<code>constructor</code>就得有<code>super</code>（当然，子类也可以没有<code>constructor</code>）</p>
<h4>解答二</h4>
<p><em>仅当你想在<code>constructor</code>内使用props才将<code>props</code>传入<code>super</code>。<code>React</code>会自行<code>props</code>设置在组件的其他地方（以供访问）。</em><br>将<code>props</code>传入<code>super</code>的作用是可以使你在<code>constructor</code>内访问它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyClass extends React.component{
    constructor(props){
        super();
        console.log(this.props); // this.props is undefined

    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyClass</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">component</span></span>{
    constructor(props){
        <span class="hljs-keyword">super</span>();
        console.log(<span class="hljs-keyword">this</span>.props); <span class="hljs-comment">// this.props is undefined</span>

    }
}</code></pre>
<p>完善后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyClass extends React.component{
    constructor(props){
        super(props);
        console.log(this.props); // prints out whatever is inside props

    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyClass</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">component</span></span>{
    constructor(props){
        <span class="hljs-keyword">super</span>(props);
        console.log(<span class="hljs-keyword">this</span>.props); <span class="hljs-comment">// prints out whatever is inside props</span>

    }
}</code></pre>
<p>如果你只是想在别处访问它，是不必传入<code>props</code>的，因为<code>React</code>会自动为你设置好：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyClass extends React.component{
    render(){
        // There is no need to call `super(props)` or even having a constructor 

        // this.props is automatically set for you by React 

        // not just in render but another where else other than the constructor

        console.log(this.props);  // it works!

    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyClass</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">component</span></span>{
    render(){
        <span class="hljs-comment">// There is no need to call `super(props)` or even having a constructor </span>

        <span class="hljs-comment">// this.props is automatically set for you by React </span>

        <span class="hljs-comment">// not just in render but another where else other than the constructor</span>

        console.log(<span class="hljs-keyword">this</span>.props);  <span class="hljs-comment">// it works!</span>

    }
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译]React ES6 class constructor super()

## 原文链接
[https://segmentfault.com/a/1190000008165717](https://segmentfault.com/a/1190000008165717)

