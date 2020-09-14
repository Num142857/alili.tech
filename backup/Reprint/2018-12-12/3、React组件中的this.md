---
title: '3、React组件中的this' 
date: 2018-12-12 2:30:10
hidden: true
slug: 08yjb6t8g5pj
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">React组件的this是什么</h2>
<ul><li>通过编写一个简单组件，并渲染出来，分别打印出自定义函数和render中的this：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

const STR = '被调用，this指向：';

class App extends React.Component{
    constructor(){
        super()
    }

    //测试函数
    handler() {
        console.log(`handler ${STR}`,this);
    }

    render(){

        console.log(`render ${STR}`,this);
        return(
            <div>
                <h1>hello World</h1>
                <label htmlFor = 'btn'>单击打印函数handler中this的指向</label>
                <input id = &quot;btn&quot; type=&quot;button&quot; value = '单击' onClick = {this.handler}/>
            </div>        
        )
    }
}
export default App" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">const</span> STR = <span class="hljs-string">'被调用，this指向：'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
    <span class="hljs-keyword">constructor</span>(){
        <span class="hljs-keyword">super</span>()
    }

    <span class="hljs-comment">//测试函数</span>
    handler() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`handler <span class="hljs-subst">${STR}</span>`</span>,<span class="hljs-keyword">this</span>);
    }

    render(){

        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`render <span class="hljs-subst">${STR}</span>`</span>,<span class="hljs-keyword">this</span>);
        <span class="hljs-keyword">return</span>(
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>hello World<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">htmlFor</span> = <span class="hljs-string">'btn'</span>&gt;</span>单击打印函数handler中this的指向<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span> = <span class="hljs-string">"btn"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">value</span> = <span class="hljs-string">'单击'</span> <span class="hljs-attr">onClick</span> = <span class="hljs-string">{this.handler}/</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>        
        )
    }
}
export default App</span></code></pre>
<p>结果如图：<br><span class="img-wrap"><img data-src="/img/bV4umE?w=866&amp;h=297" src="https://static.alili.tech/img/bV4umE?w=866&amp;h=297" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ul><li>可以看到，render函数中的this指向了组件实例，而handler（）函数中的this则为undefined，这是为何？</li></ul>
<h2 id="articleHeader1">JavaScript函数中的this</h2>
<ul><li>我们都知道JavaScript函数中的this不是在函数声明的时候定义的，而是在函数调用（即运行）的时候定义的</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var student = {
    func: function() {
        console.log(this);
    };
};

student.func();
var studentFunc = student.func;
studentFunc();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs go"><code><span class="hljs-keyword">var</span> student = {
    <span class="hljs-function"><span class="hljs-keyword">func</span>: <span class="hljs-title">function</span><span class="hljs-params">()</span></span> {
        console.log(this);
    };
};

student.<span class="hljs-keyword">func</span>();
<span class="hljs-keyword">var</span> studentFunc = student.<span class="hljs-keyword">func</span>;
studentFunc();</code></pre>
<p>这段代码运行，可以看到student.func()打印了student对象，因为此时this指向student对象；而studentFunc()打印了window，因为此时由window调用的，this指向window。</p>
<p>这段代码形象的验证了，JavaScript函数中的this不是在函数声明的时候，而是在函数运行的时候定义的；</p>
<p>同样，React组件也遵循JavaScript的这种特性，所以组件方法的‘调用者’不同会导致this的不同（<strong>这里的 “调用者” 指的是函数执行时的当前对象</strong>）</p>
<h2 id="articleHeader2">“调用者”不同导致this不同</h2>
<ul><li>测试：分别在组件自带的生命周期函数以及自定义函数中打印this，并在render（）方法中分别使用this.handler(),window.handler(),onCilck={this.handler}这三种方法调用handler（）：</li></ul>
<blockquote>/App.jsx</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';


const STR = '被调用，this指向：';

class App extends React.Component{
    constructor(){
        super()
    }

    ComponentDidMount() {
        console.log(`ComponentDidMount ${STR}`,this);
    }

    componentWillReceiveProps() {
        console.log(`componentWillReceiveProps ${STR}`,this);
    }

    shouldComponentUpdate() {
        console.log(`shouldComponentUpdate ${STR}`,this);
        return true;
    }

    componentDidUpdate() {
        console.log(`componentDidUpdate ${STR}`,this);
    }

    componentWillUnmount() {
        console.log(`componentWillUnmount ${STR}`,this);
    }


    //测试函数
    handler() {
        console.log(`handler ${STR}`,this);
    }

    render(){
        console.log(`render ${STR}`,this);

        this.handler();
        window.handler = this.handler;
        window.handler();

        return(

            <div>
                <h1>hello World</h1>
                <label htmlFor = 'btn'>单击打印函数handler中this的指向</label>
                <input id = &quot;btn&quot; type=&quot;button&quot; value = '单击' onClick = {this.handler}/>
            </div>        
        )
    }
}
export default App" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;


<span class="hljs-keyword">const</span> STR = <span class="hljs-string">'被调用，this指向：'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
    <span class="hljs-keyword">constructor</span>(){
        <span class="hljs-keyword">super</span>()
    }

    ComponentDidMount() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`ComponentDidMount <span class="hljs-subst">${STR}</span>`</span>,<span class="hljs-keyword">this</span>);
    }

    componentWillReceiveProps() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`componentWillReceiveProps <span class="hljs-subst">${STR}</span>`</span>,<span class="hljs-keyword">this</span>);
    }

    shouldComponentUpdate() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`shouldComponentUpdate <span class="hljs-subst">${STR}</span>`</span>,<span class="hljs-keyword">this</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }

    componentDidUpdate() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`componentDidUpdate <span class="hljs-subst">${STR}</span>`</span>,<span class="hljs-keyword">this</span>);
    }

    componentWillUnmount() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`componentWillUnmount <span class="hljs-subst">${STR}</span>`</span>,<span class="hljs-keyword">this</span>);
    }


    <span class="hljs-comment">//测试函数</span>
    handler() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`handler <span class="hljs-subst">${STR}</span>`</span>,<span class="hljs-keyword">this</span>);
    }

    render(){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`render <span class="hljs-subst">${STR}</span>`</span>,<span class="hljs-keyword">this</span>);

        <span class="hljs-keyword">this</span>.handler();
        <span class="hljs-built_in">window</span>.handler = <span class="hljs-keyword">this</span>.handler;
        <span class="hljs-built_in">window</span>.handler();

        <span class="hljs-keyword">return</span>(

            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>hello World<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">htmlFor</span> = <span class="hljs-string">'btn'</span>&gt;</span>单击打印函数handler中this的指向<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span> = <span class="hljs-string">"btn"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">value</span> = <span class="hljs-string">'单击'</span> <span class="hljs-attr">onClick</span> = <span class="hljs-string">{this.handler}/</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>        
        )
    }
}
export default App</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV4uEe?w=898&amp;h=311" src="https://static.alili.tech/img/bV4uEe?w=898&amp;h=311" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>
<p>可以看到：</p>
<ol>
<li>render中this -&gt; 组件实例App对象；</li>
<li>render中this.handler() -&gt; 组件实例App对象 ;</li>
<li>render中window.handler() -&gt; window对象；</li>
<li>onClick ={this.handler} -&gt; undefined</li>
</ol>
</li>
<li><strong>继续使用事件触发组件的装载、更新和卸载过程：</strong></li>
</ul>
<blockquote>/index.js</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import {render,unmountComponentAtNode} from 'react-dom'

import App from './App.jsx'


const root=document.getElementById('root')

console.log(&quot;首次挂载&quot;);
let instance = render(<App />,root);

window.renderComponent = () => {
    console.log(&quot;挂载&quot;);
    instance = render(<App />,root);
}

window.setState = () => {
    console.log(&quot;更新&quot;);
    instance.setState({foo: 'bar'});
}


window.unmountComponentAtNode = () => {
    console.log('卸载');
    unmountComponentAtNode(root);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> {render,unmountComponentAtNode} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>

<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App.jsx'</span>


const root=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>)

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"首次挂载"</span>);
let instance = render(&lt;App /&gt;,root);

<span class="hljs-built_in">window</span>.renderComponent = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"挂载"</span>);
    instance = render(&lt;App /&gt;,root);
}

<span class="hljs-built_in">window</span>.setState = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"更新"</span>);
    instance.setState({foo: <span class="hljs-string">'bar'</span>});
}


<span class="hljs-built_in">window</span>.unmountComponentAtNode = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'卸载'</span>);
    unmountComponentAtNode(root);
}</code></pre>
<p>使用三个按钮触发组件的装载、更新和卸载过程：</p>
<blockquote>/index.html</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
    <title>react-this</title>
</head>
<body>
    <button onclick=&quot;window.renderComponent()&quot;>挂载</button>
    <button onclick=&quot;window.setState()&quot;>更新</button>
    <button onclick=&quot;window.unmountComponentAtNode()&quot;>卸载</button>
    <div id=&quot;root&quot;>
        <!-- app -->
    </div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>react-this<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"window.renderComponent()"</span>&gt;</span>挂载<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"window.setState()"</span>&gt;</span>更新<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"window.unmountComponentAtNode()"</span>&gt;</span>卸载<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"root"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- app --&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<ul><li>运行程序，依次单击“挂载”，绑定onClick={this.handler}“单击”按钮，“更新”和“卸载”按钮结果如下：</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV4uG1?w=959&amp;h=498" src="https://static.alili.tech/img/bV4uG1?w=959&amp;h=498" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. render()以及componentDIdMount()、componentDIdUpdate()等其他生命周期函数中的this都是组件实例；
2. this.handler()的调用者，为render（）中的this，所以打印组件实例；
3. window.handler()的“调用者”，为window，所以打印window；
4. onClick={this.handler}的“调用者”为事件绑定，来源多样，这里打印undefined。
- 面对如此混乱的场景，如果我们想在onClick中调用自定义的组件方法，并在该方法中获取组将实例，我们就得进行转换上下文即绑定上下文：" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-number">1.</span> render()以及componentDIdMount()、componentDIdUpdate()等其他生命周期函数中的<span class="hljs-keyword">this</span>都是组件实例；
<span class="hljs-number">2.</span> <span class="hljs-keyword">this</span>.handler()的调用者，为render（）中的<span class="hljs-keyword">this</span>，所以打印组件实例；
<span class="hljs-number">3.</span> <span class="hljs-built_in">window</span>.handler()的“调用者”，为<span class="hljs-built_in">window</span>，所以打印<span class="hljs-built_in">window</span>；
<span class="hljs-number">4.</span> onClick={<span class="hljs-keyword">this</span>.handler}的“调用者”为事件绑定，来源多样，这里打印<span class="hljs-literal">undefined</span>。
- 面对如此混乱的场景，如果我们想在onClick中调用自定义的组件方法，并在该方法中获取组将实例，我们就得进行转换上下文即绑定上下文：</code></pre>
<h2 id="articleHeader3">自动绑定和手动绑定</h2>
<ul>
<li>React.createClass有一个内置的魔法，可以自动绑定所用的方法，使得其this指向组件的实例化对象，但是其他JavaScript类并没有这种特性；</li>
<li>所以React团队决定不再React组件类中实现自动绑定，把上下文转换的自由权交给开发者；</li>
<li>所以我们通常在构造函数中绑定方法的this指向：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';


const STR = '被调用，this指向：';

class App extends React.Component{
    constructor(){
        super();

        this.handler = this.handler.bind(this);
    }
//测试函数
    handler() {
        console.log(`handler ${STR}`,this);
    }

    render(){
        console.log(`render ${STR}`,this);

        this.handler();
        window.handler = this.handler;
        window.handler();

        return(

            <div>
                <h1>hello World</h1>
                <label htmlFor = 'btn'>单击打印函数handler中this的指向</label>
                <input id = &quot;btn&quot; type=&quot;button&quot; value = '单击' onClick = {this.handler}/>
            </div>        
        )
    }
}
export default App" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;


<span class="hljs-keyword">const</span> STR = <span class="hljs-string">'被调用，this指向：'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
    <span class="hljs-keyword">constructor</span>(){
        <span class="hljs-keyword">super</span>();

        <span class="hljs-keyword">this</span>.handler = <span class="hljs-keyword">this</span>.handler.bind(<span class="hljs-keyword">this</span>);
    }
<span class="hljs-comment">//测试函数</span>
    handler() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`handler <span class="hljs-subst">${STR}</span>`</span>,<span class="hljs-keyword">this</span>);
    }

    render(){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`render <span class="hljs-subst">${STR}</span>`</span>,<span class="hljs-keyword">this</span>);

        <span class="hljs-keyword">this</span>.handler();
        <span class="hljs-built_in">window</span>.handler = <span class="hljs-keyword">this</span>.handler;
        <span class="hljs-built_in">window</span>.handler();

        <span class="hljs-keyword">return</span>(

            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>hello World<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">htmlFor</span> = <span class="hljs-string">'btn'</span>&gt;</span>单击打印函数handler中this的指向<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span> = <span class="hljs-string">"btn"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">value</span> = <span class="hljs-string">'单击'</span> <span class="hljs-attr">onClick</span> = <span class="hljs-string">{this.handler}/</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>        
        )
    }
}
export default App</span></code></pre>
<ul><li>将this.handler()绑定为组件实例后，this.handler()中的this就指向组将实例，即onClick={this.handler}打印出来的为组件实例；</li></ul>
<h2 id="articleHeader4">总结：</h2>
<ul>
<li>React组件生命周期函数中的this指向组件实例；</li>
<li>自定义组件方法的this会因调用者不同而不同；</li>
<li>为了在组件的自定义方法中获取组件实例，需要手动绑定this到组将实例。</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
3、React组件中的this

## 原文链接
[https://segmentfault.com/a/1190000013425634](https://segmentfault.com/a/1190000013425634)

