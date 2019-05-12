---
title: '从Mixin到hooks，谈谈对React16.7.0-alpha中即将引入的hooks的理解' 
date: 2019-02-15 2:30:44
hidden: true
slug: 9g59u4ar8ed
categories: [reprint]
---

{{< raw >}}

                    
<hr>
<p>  为了实现分离业务逻辑代码，实现组件内部相关业务逻辑的复用，在React的迭代中针对类组件中的代码复用依次发布了Mixin、HOC、Render props等几个方案。此外，针对函数组件，在React v16.7.0-alpha 中提出了hooks的概念，在本身无状态的函数组件，引入独立的状态空间，也就是说在函数组件中，也可以引入类组件中的state和组件生命周期，使得函数组件变得丰富多彩起来，此外，hooks也保证了逻辑代码的复用性和独立性。</p>
<p>  本文从针对类组件的复用解决方案开始说起，先后介绍了从Mixin、HOC到Render props的演进，最后介绍了React v16.7.0-alpha 中的 hooks以及自定义一个hooks</p>
<blockquote><ul>
<li>Mixin</li>
<li>HOC</li>
<li>Render props</li>
<li>React hooks的介绍以及如何自定义一个hooks</li>
</ul></blockquote>
<p>原文地址在我的博客中：<a href="https://github.com/forthealllight/blog/issues/29" rel="nofollow noreferrer" target="_blank">https://github.com/forthealll...</a></p>
<p>欢迎star和fork～</p>
<hr>
<h3 id="articleHeader0">一、Mixin</h3>
<p>Mixin是最早出现的复用类组件中业务逻辑代码的解决方案，首先来介绍以下如何适应Mixin。下面是一个Mixin的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const someMixins={
  printColor(){
    console.log(this.state.color);
  }
  setColor(newColor){
    this.setState({color:newColor})
  }
  componentDidMount(){
    ..
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> someMixins={
  printColor(){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.state.color);
  }
  setColor(newColor){
    <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">color</span>:newColor})
  }
  componentDidMount(){
    ..
  }
}
</code></pre>
<p>下面是一个使用Mixin的组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Apple extends React.Component{
  //仅仅作为演示，mixins一般是通过React.createClass创建，并且ES6中没有这种写法
  mixins:[someMixins]
  constructor(props){
    super(props);
    this.state={
      color:'red'
    }
    this.printColor=this.printColor.bind(this);
  }
  render(){
    return <div className=&quot;m-box&quot; onClick={this.printColor}>
                这是一个苹果
           </div>
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Apple</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
  <span class="hljs-comment">//仅仅作为演示，mixins一般是通过React.createClass创建，并且ES6中没有这种写法</span>
  mixins:[someMixins]
  <span class="hljs-keyword">constructor</span>(props){
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state={
      <span class="hljs-attr">color</span>:<span class="hljs-string">'red'</span>
    }
    <span class="hljs-keyword">this</span>.printColor=<span class="hljs-keyword">this</span>.printColor.bind(<span class="hljs-keyword">this</span>);
  }
  render(){
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"m-box"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.printColor}</span>&gt;</span>
                这是一个苹果
           <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  }
}</code></pre>
<p>在类中mixin引入公共业务逻辑：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mixins:[someMixins]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">mixins:[someMixins]</code></pre>
<p>从上面的例子，我们来总结以下mixin的缺点：</p>
<ul>
<li>Mixin是可以存在多个的，是一个数组的形式，且Mixin中的函数是可以调用setState方法组件中的state的，因此如果有多处Mixin的模块中修改了相同的state，会无法确定state的更新来源</li>
<li>ES6 classes支持的是继承的模式，而不支持Mixins</li>
<li>Mixin会存在覆盖，比如说两个Mixin模块，存在相同生命周期函数或者相同函数名的函数，那么会存在相同函数的覆盖问题。</li>
</ul>
<p>Mixin已经被废除，具体缺陷可以参考<a href="https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html" rel="nofollow noreferrer" target="_blank">Mixins Considered Harmful</a></p>
<h3 id="articleHeader1">二、HOC</h3>
<p>  为了解决Mixin的缺陷，第二种解决方案是高阶组件（high order component,简称HOC）。</p>
<h4>1、举例几种HOC的形式</h4>
<p>  HOC简单理解就是组件工厂，接受原始组件作为参数，添加完功能与业务后，返回新的组件。下面来介绍HOC参数的几个例子。</p>
<h4>(1)参数仅为原始组件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const redApple = withFruit(Apple);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> redApple = withFruit(Apple);</code></pre>
<h4>(2)参数为原始组件和一个对象</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const redApple = withFruit(Apple，{color:'red',weight:'200g'});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> redApple = withFruit(Apple，{<span class="hljs-attr">color</span>:<span class="hljs-string">'red'</span>,<span class="hljs-attr">weight</span>:<span class="hljs-string">'200g'</span>});</code></pre>
<p>但是这种情况比较少用，如果对象中仅仅传递的是属性，其实完全可以通过组件的props实现值的传递，我们用HOC的主要目的是分离业务，关于UI的展示，以及一些组件中的属性和状态，我们一般通过props来指定比较方便</p>
<h4>(3)参数为原始组件和一个函数</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const redApp=withFruit(App,()=>{console.log('I am a fruit')})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> redApp=withFruit(App,()=&gt;{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'I am a fruit'</span>)})</code></pre>
<h4>(4)柯里化</h4>
<p>最常见的是仅以一个原始组件作为参数，但是在外层包裹了业务逻辑，比如react-redux的conect函数中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Admin extends React.Component{

}
const mapStateToProps=(state)=>{
  return {
  };
}
const mapDispatchToProps=(dispatch)=>{
  return {

  }
}

const connect(mapStateToProps,mapDispatchToProps)(Admin)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Admin</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{

}
<span class="hljs-keyword">const</span> mapStateToProps=<span class="hljs-function">(<span class="hljs-params">state</span>)=&gt;</span>{
  <span class="hljs-keyword">return</span> {
  };
}
<span class="hljs-keyword">const</span> mapDispatchToProps=<span class="hljs-function">(<span class="hljs-params">dispatch</span>)=&gt;</span>{
  <span class="hljs-keyword">return</span> {

  }
}

<span class="hljs-keyword">const</span> connect(mapStateToProps,mapDispatchToProps)(Admin)</code></pre>
<h4>2、HOC的缺点</h4>
<p>HOC解决了Mixin的一些缺陷，但是HOC本身也有一些缺点：</p>
<h4>(1)难以溯源，且存在属性覆盖问题</h4>
<p>  如果原始组件A，先后通过工厂函数1，工厂函数2，工厂函数3….构造，最后生成了组件B，我们知道组件B中有很多与A组件不同的props，但是我们仅仅通过组件B，并不能知道哪个组件来自于哪个工厂函数。同时，如果有2个工厂函数同时修改了组件A的某个同名属性，那么会有属性覆盖的问题，会使得前一个工厂函数的修改结果失效。</p>
<h4>(2)HOC是静态构建的</h4>
<p>  所谓静态构建，也就是说生成的是一个新的组件，并不会马上render，HOC组件工厂是静态构建一个组件，这类似于重新声明一个组件的部分。也就是说，HOC工厂函数里面的声明周期函数，也只有在新组件被渲染的时候才会执行。</p>
<h4>(3)会产生无用的空组件</h4>
<h3 id="articleHeader2">三、Render Prop</h3>
<p>  Render Props从名知义，也是一种剥离重复使用的逻辑代码，提升组件复用性的解决方案。在被复用的组件中，通过一个名为“render”(属性名也可以不是render，只要值是一个函数即可)的属性，该属性是一个函数，这个函数接受一个对象并返回一个子组件，会将这个函数参数中的对象作为props传入给新生成的组件。</p>
<p>  这种方法跟直接的在父组件中，将父组件中的state直接传给子组件的区别是，通过Render Props不用写死子组件，可以动态的决定父组件需要渲染哪一个子组件。</p>
<p>或者再概括一点：</p>
<p><strong><em>Render Props就是一个函数，做为一个属性被赋值给父组件，使得父组件可以根据该属性去渲染子组件。</em></strong></p>
<h4>(1)标准父子组件通信方法</h4>
<p>  首先来看常用的在类组件中常用的父子组件，父组件将自己的状态state，通过props传递给子组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Son extends React.Component{
  render(){
  const {feature} = this.props;
   return <div>
             <span>My hair is {feature.hair}</span>
             <span>My nose is {feature.nose}</span>
          </div>
  }
}

class FatherToSon extends React.Component{
   constructor(){
      this.state = {
        hair:'black',
        nose:'high'
      }
   }
  render(){
    return <Son feature = {this.state}>
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Son</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
  render(){
  <span class="hljs-keyword">const</span> {feature} = <span class="hljs-keyword">this</span>.props;
   <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
             <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>My hair is {feature.hair}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
             <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>My nose is {feature.nose}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">FatherToSon</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
   <span class="hljs-keyword">constructor</span>(){
      <span class="hljs-keyword">this</span>.state = {
        <span class="hljs-attr">hair</span>:<span class="hljs-string">'black'</span>,
        <span class="hljs-attr">nose</span>:<span class="hljs-string">'high'</span>
      }
   }
  render(){
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Son</span> <span class="hljs-attr">feature</span> = <span class="hljs-string">{this.state}</span>&gt;</span>
  }
}</span></code></pre>
<p>  我们定义了父组件FatherToSon，存在自身的state，并且将自身的state通过props的方式传递给了子组件。</p>
<p>  这种就是常见的利用组件的props父子间传值的方式，这个值可以是变量，对象，也可以是方法，但是仅仅使用只能一次性的给特定的子组件使用。如果现在有个Daughter组件也想复用父组件中的方法或者状态，那么必须新构建一个新组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class FatherToDaughter extends React.Component{
   constructor(){
      this.state = {
        hair:'black',
        nose:'high'
      }
   }
  render(){
    return <Daughter feature = {this.state}>
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">FatherToDaughter</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
   <span class="hljs-keyword">constructor</span>(){
      <span class="hljs-keyword">this</span>.state = {
        <span class="hljs-attr">hair</span>:<span class="hljs-string">'black'</span>,
        <span class="hljs-attr">nose</span>:<span class="hljs-string">'high'</span>
      }
   }
  render(){
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Daughter</span> <span class="hljs-attr">feature</span> = <span class="hljs-string">{this.state}</span>&gt;</span>
  }
}</span></code></pre>
<p>从上面的例子可以看出通过标准模式的父子组件的通信方法，虽然能够传递父组件的状态和函数，但是无法实现复用。</p>
<h4>(2)Render Props的引出</h4>
<p>我们根据Render Props的特点：</p>
<p>Render Props就是一个函数，做为一个属性被赋值给父组件，使得父组件可以根据该属性去渲染子组件。</p>
<p>重新去实现上述的(1)中的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class FatherChild extends React.Component{
   constructor(){
      this.state = {
        hair:'black',
        nose:'high'
      }
   }
  render(){
    <React.Fragment>
      {this.props.render}
    </React.Fragment>
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">FatherChild</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
   <span class="hljs-keyword">constructor</span>(){
      <span class="hljs-keyword">this</span>.state = {
        <span class="hljs-attr">hair</span>:<span class="hljs-string">'black'</span>,
        <span class="hljs-attr">nose</span>:<span class="hljs-string">'high'</span>
      }
   }
  render(){
    &lt;React.Fragment&gt;
      {<span class="hljs-keyword">this</span>.props.render}
    &lt;<span class="hljs-regexp">/React.Fragment&gt;
  }
}</span></code></pre>
<p>此时如果子组件要复用父组件中的属性或者函数，则可以直接使用，比如子组件Son现在可以直接调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<FatherChild render={(obj)=>(<Son feature={obj}>)} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">&lt;FatherChild render={(obj)=&gt;(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Son</span> <span class="hljs-attr">feature</span>=<span class="hljs-string">{obj}</span>&gt;</span>)} /&gt;</span></code></pre>
<p>如果子组件Daughter要复用父组件的方法，可以直接调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<FatherChild render={(obj)=>(<Daughter feature={obj}>)} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">&lt;FatherChild render={(obj)=&gt;(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Daughter</span> <span class="hljs-attr">feature</span>=<span class="hljs-string">{obj}</span>&gt;</span>)} /&gt;</span></code></pre>
<p>  从这个例子中可以看出，通过Render Props我们实现同样实现了一个组件工厂，可以实现业务逻辑代码的复用，相比与HOC，Render Props有以下几个优点。</p>
<ul>
<li>不用担心props的命名问题</li>
<li>可以溯源，子组件的props一定是来自于直接父组件</li>
<li>是动态构建的</li>
</ul>
<p>Render Props也有一个缺点：</p>
<p><strong><em>就是无法利用SCU这个生命周期，来实现渲染性能的优化。</em></strong></p>
<h3 id="articleHeader3">四、React hooks的介绍以及如何自定义一个hooks</h3>
<p>  hooks概念在React Conf 2018被提出来，并将在未来的版本中被引入，hooks遵循函数式编程的理念，主旨是在函数组件中引入类组件中的状态和生命周期，并且这些状态和生命周期函数也可以被抽离，实现复用的同时，减少函数组件的复杂性和易用性。</p>
<p>  hooks相关的定义还在beta中，可以在React v16.7.0-alpha中体验，为了渲染hooks定义的函数组件，必须执行React-dom的版本也为v16.7.0-alpha，引入hooks必须先安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -s React@16.7.0-alpha

npm i -s React-dom@16.7.0-alpha" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">npm i -s React@<span class="hljs-number">16.7</span><span class="hljs-number">.0</span>-alpha

npm i -s React-dom@<span class="hljs-number">16.7</span><span class="hljs-number">.0</span>-alpha</code></pre>
<p>  hooks主要有三部分组成，State Hooks、Effect Hooks和Custom Hooks，下面分别来一一介绍。</p>
<h4>(1)State Hooks</h4>
<p>  跟类组件一样，这里的state就是状态的含义，将state引入到函数组件中，同时类组件中更新state的方法为setState，在State Hooks中也有相应的更新状态的方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ExampleWithManyStates() {
  // 声明各种state以及更新相应的state的方法
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ExampleWithManyStates</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// 声明各种state以及更新相应的state的方法</span>
  <span class="hljs-keyword">const</span> [age, setAge] = useState(<span class="hljs-number">42</span>);
  <span class="hljs-keyword">const</span> [fruit, setFruit] = useState(<span class="hljs-string">'banana'</span>);
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState([{ <span class="hljs-attr">text</span>: <span class="hljs-string">'Learn Hooks'</span> }]);
  <span class="hljs-comment">// ...</span>
}</code></pre>
<p>  上述就声明了3个State hooks，相应的方法为useState，该方法创建一个传入初始值，创建一个state。返回一个标识该state的变量，以及更新该state的方法。</p>
<p>  从上述例子我们来看，一个函数组件是可以通过useState创建多个state的。此外State Hooks的定义必须在函数组件的最高一级，不能在嵌套，循环等语句中使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ExampleWithManyStates() {
  // 声明各种state以及更新相应的state的方法
  if(Math.random()>1){
    const [age, setAge] = useState(42);
    const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  }else{
    const [fruit, setFruit] = useState('banana');
    const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  }
  
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ExampleWithManyStates</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// 声明各种state以及更新相应的state的方法</span>
  <span class="hljs-keyword">if</span>(<span class="hljs-built_in">Math</span>.random()&gt;<span class="hljs-number">1</span>){
    <span class="hljs-keyword">const</span> [age, setAge] = useState(<span class="hljs-number">42</span>);
    <span class="hljs-keyword">const</span> [todos, setTodos] = useState([{ <span class="hljs-attr">text</span>: <span class="hljs-string">'Learn Hooks'</span> }]);
  }<span class="hljs-keyword">else</span>{
    <span class="hljs-keyword">const</span> [fruit, setFruit] = useState(<span class="hljs-string">'banana'</span>);
    <span class="hljs-keyword">const</span> [todos, setTodos] = useState([{ <span class="hljs-attr">text</span>: <span class="hljs-string">'Learn Hooks'</span> }]);
  }
  
  <span class="hljs-comment">// ...</span>
}</code></pre>
<p>  上述的方式是不被允许的，因为一个函数组件可以存在多个State Hooks，并且useState返回的是一个数组，数组的每一个元素是没有标识信息的，完全依靠调用useState的顺序来确定哪个状态对应于哪个变量，所以必须保证使用useState在函数组件的最外层，此外后面要介绍的Effect Hooks的函数useEffect也必须在函数组件的最外层，之后会详细解释。</p>
<h4>(2)Effect Hooks</h4>
<p>  通过State Hooks来定义组件的状态，同样通过Effect Hooks来引入生命周期，Effect hooks通过一个useEffect的方法，以一种极为简化的方式来引入生命周期。<br>来看一个更新的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { useState, useEffect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Example</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> [count, setCount] = useState(<span class="hljs-number">0</span>);

  useEffect(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">document</span>.title = <span class="hljs-string">`You clicked <span class="hljs-subst">${count}</span> times`</span>;
  });

  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>You clicked {count} times<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setCount(count + 1)}&gt;
        Click me
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}</code></pre>
<p>上述就是一个通过useEffect来实现组件中生命周期的例子，useEffect整合了componentDidMount和componentDidUpdate，也就是说在componentDidMount和componentDidUpdate的时候都会执行一遍useEffect的函数，此外为了实现componentWillUnmount这个生命周期函数，useEffect函数如果返回值是一个函数，这个函数就被定义成在componentWillUnmount这个周期内执行的函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="useEffect(() => {
    //componentDidMount和componentDidUpdate周期的函数体
    return ()=>{ 
       //componentWillUnmount周期的函数体
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">useEffect(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-comment">//componentDidMount和componentDidUpdate周期的函数体</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{ 
       <span class="hljs-comment">//componentWillUnmount周期的函数体</span>
    }
});</code></pre>
<p>如果存在多个useState和useEffect时，必须按顺序书写，定义一个useState后，紧接着就使用一个useEffect函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="useState('Mary')           
useEffect(persistForm)    
useState('Poppins')       
useEffect(updateTitle)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">useState(<span class="hljs-string">'Mary'</span>)           
useEffect(persistForm)    
useState(<span class="hljs-string">'Poppins'</span>)       
useEffect(updateTitle)</code></pre>
<p>因此通useState一样，useEffect函数也必须位于函数组件的最高一级。</p>
<h4>(3)Effect Hooks的补充</h4>
<p>上述我们知道useEffect其实包含了componentDidMount和componentDidUpdate，如果我们的方法仅仅是想在componentDidMount的时候被执行，那么必须传递一个空数组作为第二个参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="useEffect(() => {
  //仅在componentDidMount的时候执行
},[]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">useEffect(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-comment">//仅在componentDidMount的时候执行</span>
},[]);</code></pre>
<p>上述的方法会仅仅在componentDidMount，也就是函数组件第一次被渲染的时候执行，此后及时状态更新，也不会执行。</p>
<p>此外，为了减少不必要的状态更新和渲染，可以如下操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="useEffect(() => {
  //仅在componentDidMount的时候执行
},[stateName]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">useEffect(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-comment">//仅在componentDidMount的时候执行</span>
},[stateName]);</code></pre>
<p>在上述的这个例子中，只有stateName的值发生改变，才会去执行useEffect函数。</p>
<h4>(4)Custom Hooks自定义hooks</h4>
<p>可以将useState和useEffect的状态和生命周期函数抽离，组成一个新的函数，该函数就是一个自定义的封装完毕的hooks。</p>
<p>这是我写的一个hooks ---&gt; <a href="https://github.com/forthealllight/dom-location" rel="nofollow noreferrer" target="_blank">dom-location</a>,</p>
<p>可以这样引入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -s dom-location " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">npm i -s dom-location </code></pre>
<p>并且可以在函数组件中使用。这个自定义的hooks也很简单，就是封装了状态和生命周期函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { useState, useEffect } from 'react'

const useDomLocation = (element) =>  {
  let [elementlocation,setElementlocation] = useState(getlocation(element));
  useEffect(()=>{
    element.addEventListener('resize',handleResize);
    return ()=>{
      element.removeEventListener('resize', handleResize);
    }
  },[]);
  function handleResize(){
    setElementlocation(getlocation(element));
  }
  function getlocation(E){
    let rect = E.getBoundingClientRect()
    let top = document.documentElement.clientTop
    let left= document.documentElement.clientLeft
    return{
        top    :   rect.top - top,
        bottom :   rect.bottom - top,
        left   :   rect.left - left,
        right  :   rect.right - left
    };
  }
  return elementlocation

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { useState, useEffect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>

<span class="hljs-keyword">const</span> useDomLocation = <span class="hljs-function">(<span class="hljs-params">element</span>) =&gt;</span>  {
  <span class="hljs-keyword">let</span> [elementlocation,setElementlocation] = useState(getlocation(element));
  useEffect(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    element.addEventListener(<span class="hljs-string">'resize'</span>,handleResize);
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
      element.removeEventListener(<span class="hljs-string">'resize'</span>, handleResize);
    }
  },[]);
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleResize</span>(<span class="hljs-params"></span>)</span>{
    setElementlocation(getlocation(element));
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getlocation</span>(<span class="hljs-params">E</span>)</span>{
    <span class="hljs-keyword">let</span> rect = E.getBoundingClientRect()
    <span class="hljs-keyword">let</span> top = <span class="hljs-built_in">document</span>.documentElement.clientTop
    <span class="hljs-keyword">let</span> left= <span class="hljs-built_in">document</span>.documentElement.clientLeft
    <span class="hljs-keyword">return</span>{
        <span class="hljs-attr">top</span>    :   rect.top - top,
        <span class="hljs-attr">bottom</span> :   rect.bottom - top,
        <span class="hljs-attr">left</span>   :   rect.left - left,
        <span class="hljs-attr">right</span>  :   rect.right - left
    };
  }
  <span class="hljs-keyword">return</span> elementlocation

}</code></pre>
<p>然后直接在函数中使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import useDomLocation from 'dom-location';
function App() {
  ....
  let obj = useDomLocation(element);
  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> useDomLocation <span class="hljs-keyword">from</span> <span class="hljs-string">'dom-location'</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">App</span>(<span class="hljs-params"></span>) </span>{
  ....
  let obj = useDomLocation(element);
  
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从Mixin到hooks，谈谈对React16.7.0-alpha中即将引入的hooks的理解

## 原文链接
[https://segmentfault.com/a/1190000016876476](https://segmentfault.com/a/1190000016876476)

