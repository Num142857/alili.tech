---
title: 'React从入门到精通系列之(12)深入理解JSX' 
date: 2019-01-29 2:30:10
hidden: true
slug: 6k3of8hotzi
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">十二、深入理解JSX</h2>
<p>从根本上讲，JSX就是提供了一个<code>React.createElement(component, props, ...children)</code>函数的语法糖。就像下面的JSX代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<MyButton color=&quot;blue&quot; shadow={2}>
    Click Me
</MyButton>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;MyButton color=<span class="hljs-string">"blue"</span> shadow={<span class="hljs-number">2</span>}&gt;
    Click Me
&lt;<span class="hljs-regexp">/MyButton&gt;</span></code></pre>
<p>经过编译后为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.createElement(
    MyButton,
    {color: 'blue', shadow: 2},
    'Click Me'
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">React.createElement(
    MyButton,
    {<span class="hljs-attr">color</span>: <span class="hljs-string">'blue'</span>, <span class="hljs-attr">shadow</span>: <span class="hljs-number">2</span>},
    <span class="hljs-string">'Click Me'</span>
)</code></pre>
<p>如果一个标签没有子元素的话，你可以使用<code>/&gt;</code>来自动闭合。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div className=&quot;sidebar&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&lt;div className=<span class="hljs-string">"sidebar"</span> /&gt;</code></pre>
<p>经过编译后为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.createElement(
    'div',
    {className: 'sidebar'},
    null
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">React.createElement(
    <span class="hljs-string">'div'</span>,
    {<span class="hljs-attr">className</span>: <span class="hljs-string">'sidebar'</span>},
    <span class="hljs-literal">null</span>
)</code></pre>
<p>如果你想测试一些特定的JSX是如何转换成JavaScript的话，你可以试试<code>在线Babel编译器</code>。</p>
<h3 id="articleHeader1">指定React元素类型</h3>
<p>JSX标记的第一部分决定了React元素的类型。</p>
<p>首字母大写的类型表示JSX标记指的为React组件。 这些标签被编译为对指定变量的直接引用，因此如果使用JSX <code>&lt;Foo /&gt;</code>表达式，Foo必须在当前的作用域内。</p>
<h4>React必须在作用域内</h4>
<p>由于JSX编译的本质是对<code>React.createElement</code>的调用，因此React库也必须始终在JSX代码的作用域中。<br>例如，虽然<code>CustomButton</code>没有直接引用<code>React</code>，但是这两个导入的模块在这段代码中也还是很有必要的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';

function WarningButton(props) {
    // return React.createElement(CustomButton, {color: 'red'}, null);
    return <CustomButton color=&quot;red&quot; />
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">WarningButton</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-comment">// return React.createElement(CustomButton, {color: 'red'}, null);</span>
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">CustomButton</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"red"</span> /&gt;</span>
}</span></code></pre>
<p>如果不使用JavaScript打包工具并将React通过script标签引入，那么它就会作为一个全局变量<code>React</code>。</p>
<h4>对JSX类型使用『点』表示符</h4>
<p>您还可以使用JSX中的点表示符来引用React组件。 如果您有一个模块会导出很多React组件的话，使用这种方法就会十分方便。 例如，如果<code>MyComponents.DatePicker</code>是一个组件，您可以直接从JSX使用它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';

const MyComponents = {
    DatePicker(props) {
        return <div>这里有一个颜色为{props.color}的日期选择器</div>
    }
};

function BlueDataPicker(props) {
    return <MyComponents.DatePicker color=&quot;blue&quot; />
}

ReactDOM.render(
    <BlueDataPicker />,
    document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-keyword">const</span> MyComponents = {
    DatePicker(props) {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>这里有一个颜色为{props.color}的日期选择器<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    }
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">BlueDataPicker</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">MyComponents.DatePicker</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"blue"</span> /&gt;</span>
}

ReactDOM.render(
    <span class="hljs-tag">&lt;<span class="hljs-name">BlueDataPicker</span> /&gt;</span>,
    document.getElementById('root')
);</span></code></pre>
<h4>用户自定义组件必须是首字母大写</h4>
<p>当元素类型以是小写字母开头时，它指向一个内置组件，如<code>&lt;div&gt;</code>或<code>&lt;span&gt;</code>，并生成一个字符串<code>'div'</code>或<code>'span'</code>传递给<code>React.createElement</code>。 以大写字母开头的类型，如<code>&lt;Foo /&gt;</code>编译为<code>React.createElement(Foo)</code>，并且在当前作用域内寻找这个名称为<code>Foo</code>的已定义或已导入组件。</p>
<p>我们建议使用<code>首字母大写</code>命名组件。 如果你有一个以小写字母开头的组件，请在JSX中使用它之前请将它赋值给一个首字母大写的变量。</p>
<p>下面代码不会按预期运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

//这是错误的，这个组件应该为首字母大写
function hello(props) {
    // 这是正确的，因为div是一个有效的html标签
    return <div>Hello {props.name}</div>;
}

function HelloWorld(props) {
    // 这是错误的，因为它是首字母小写，所以React认为<hello />是一个html标签
    return <hello name=&quot;zhangyatao&quot; />
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-comment">//这是错误的，这个组件应该为首字母大写</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hello</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-comment">// 这是正确的，因为div是一个有效的html标签</span>
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello {props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">HelloWorld</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-comment">// 这是错误的，因为它是首字母小写，所以React认为&lt;hello /&gt;是一个html标签</span>
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">hello</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"zhangyatao"</span> /&gt;</span>
}</span></code></pre>
<p>想要修复上面的问题，我们必须将<code>hello</code>重命名为<code>Hello</code>，通过<code>&lt;Hello /&gt;</code>来使用该组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

// 这是正确的
function Hello(props) {
    return <div>Hello {props.name}</div>;
}

function HelloWorld(props) {
    // 这是正确的
    return <Hello name=&quot;zhangyatao&quot; />;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-comment">// 这是正确的</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Hello</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello {props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">HelloWorld</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-comment">// 这是正确的</span>
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Hello</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"zhangyatao"</span> /&gt;</span>;
}</span></code></pre>
<h4>在运行的时候选择组件类型</h4>
<p>不能将常规的javascript表达式用作React元素类型。 如果你想使用一个通用表达式来表示元素的类型，只需将它赋值给一个首字母大写的变量即可。<br> 这通常出现在当你想基于同一个props渲染一个不同的组件的情况下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import {Com1, Com2} from './Components';

const components = {
    myCom1: Com1,
    myCom2: Com2
}

function RunCom(props) {
    // 这是错误的，JSX的类型不能这么写
    return <components[props.comType] type={props.type} />;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> {Com1, Com2} <span class="hljs-keyword">from</span> <span class="hljs-string">'./Components'</span>;

<span class="hljs-keyword">const</span> components = {
    <span class="hljs-attr">myCom1</span>: Com1,
    <span class="hljs-attr">myCom2</span>: Com2
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">RunCom</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-comment">// 这是错误的，JSX的类型不能这么写</span>
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">components[props.comType]</span> <span class="hljs-attr">type</span>=<span class="hljs-string">{props.type}</span> /&gt;</span>;
}</span></code></pre>
<p>想要解决上面的问题，只需要将它们赋值给一个首字母大写的变量即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import {Com1, Com2} from './Components';


const components = {
    myCom1: Com1,
    myCom2: Com2
}

function RunCom(props) {
    // 这是正确的，将它们赋值给一个首字母大写的变量
    const MyCom = components[props.comType];
    return <MyCom type={props.type} />;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> {Com1, Com2} <span class="hljs-keyword">from</span> <span class="hljs-string">'./Components'</span>;


<span class="hljs-keyword">const</span> components = {
    <span class="hljs-attr">myCom1</span>: Com1,
    <span class="hljs-attr">myCom2</span>: Com2
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">RunCom</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-comment">// 这是正确的，将它们赋值给一个首字母大写的变量</span>
    <span class="hljs-keyword">const</span> MyCom = components[props.comType];
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">MyCom</span> <span class="hljs-attr">type</span>=<span class="hljs-string">{props.type}</span> /&gt;</span>;
}</span></code></pre>
<h3 id="articleHeader2">JSX中的Props</h3>
<p>在JSX中指定Props有以下几种不同的方法。</p>
<h4>JavaScript表达式</h4>
<p>你可以传递任何JavaScript表达式作为Props，用<code>{}</code>括住它们就可以使用。 例如，在这个JSX中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<MyComponents foo={1 + 2 + 3 + 4} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&lt;MyComponents foo={<span class="hljs-number">1</span> + <span class="hljs-number">2</span> + <span class="hljs-number">3</span> + <span class="hljs-number">4</span>} /&gt;</code></pre>
<p>对于<code>MyComponent</code>来说，<code>props.foo</code>的值将为<code>10</code>，因为是通过表达式<code>1 + 2 + 3 + 4</code>计算得到的。</p>
<p><code>if</code>语句和<code>for</code>循环在JavaScript中不是表达式，因此它们不能在JSX中直接使用。 相反，写完它们之后你可以把JSX放在里面。 例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function NumberDescriber(props) {
    let description;
    if (props.number % 2 === 0) {
        description = <strong>偶数</strong>
    } else {
        description = <strong>奇数</strong>
    }
    return <div>{props.number}是一个{description}.</div>;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">NumberDescriber</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">let</span> description;
    <span class="hljs-keyword">if</span> (props.number % <span class="hljs-number">2</span> === <span class="hljs-number">0</span>) {
        description = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>偶数<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span></span>
    } <span class="hljs-keyword">else</span> {
        description = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>奇数<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span></span>
    }
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{props.number}是一个{description}.<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}</code></pre>
<h4>字符串直接量</h4>
<p>你可以传递一个字符串内容作为props。 这两个JSX表达式是等价的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<MyComponent message=&quot;hi zhangyatao&quot; />

<MyComponent message={'hi zhangyatao'} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;MyComponent message=<span class="hljs-string">"hi zhangyatao"</span> /&gt;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">MyComponent</span> <span class="hljs-attr">message</span>=<span class="hljs-string">{</span>'<span class="hljs-attr">hi</span> <span class="hljs-attr">zhangyatao</span>'} /&gt;</span></span></code></pre>
<p>当你传递一个字符串直接量时，它的值是经过html转义的。 所以这两个JSX表达式是等价的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<MyComponent message='&amp;lt;3' />

<MyComponent message={'<3'} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;MyComponent message=<span class="hljs-string">'&amp;lt;3'</span> /&gt;

&lt;MyComponent message={'&lt;3'} /&gt;</code></pre>
<h4>Props默认值为true</h4>
<p>如果你没有给Props传入一个值，那么它的默认值为<code>true</code>，这两个JSX表达式是等价的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<MyTextBox autocomplete />

<MyTextBox autocomplete={true} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;MyTextBox autocomplete /&gt;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">MyTextBox</span> <span class="hljs-attr">autocomplete</span>=<span class="hljs-string">{true}</span> /&gt;</span></span></code></pre>
<p>一般来说，我们不建议使用它，因为它可以使用ES6对象的简写<code>{foo}</code>，也就是<code>{foo：foo}</code>的简称会和<code>{foo：true}</code>混淆。 这种行为在这里只是方便它匹配到HTML行为。</p>
<h4>Props传递</h4>
<p>如果你有一个对象类似的数据作为props，并且想在JSX中传递它，你可以使用<code>...</code>作为一个<code>“spread”</code>运算符传递整个props对象。 这两个组件是等效的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function App() {
    return <Greeting firstName=&quot;yatao&quot; lastName=&quot;zhang&quot; />;
}

function App() {
    const props = {firstName: 'yatao', lastName: 'zhang'};
    return <Greeting {...props} />;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">App</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> &lt;Greeting firstName="yatao" lastName="zhang" /&gt;;
}

function App() {
    const props = {firstName: 'yatao', lastName: 'zhang'};
    return &lt;Greeting {...props} /&gt;;
}</code></pre>
<p>当创建一个通用容器时，<code>spread</code> props很有用。 <br>然而，他们也可以让你的代码变得有点凌乱，这样很容易使大量不相关的prps传递给那些不关心它们的组件。 建议您谨慎使用此语法。</p>
<h3 id="articleHeader3">JSX中的子元素和子组件</h3>
<p>在包含开始标记和结束标记的JSX表达式中，这些标记之间的内容通过一种特殊的prop：<code>props.children</code>传递。 有几种不同的方式传递子组件：</p>
<h4>字符串直接量</h4>
<p>你可以在开始和结束标签之间放一个字符串，那么<code>props.children</code>就是那个字符串。 这对许多内置的HTML元素很有用。 例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function MyComponent(props) {
    return <div>{props.children}<div>; //=> <div>hello zhangyatao</div>
}

<MyComponent>Hello zhangyatao</MyComponent>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyComponent</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> &lt;div&gt;{props.children}&lt;div&gt;; //=&gt; &lt;div&gt;hello zhangyatao&lt;/div&gt;
}

&lt;MyComponent&gt;Hello zhangyatao&lt;/MyComponent&gt;
</code></pre>
<p>这是有效的JSX，并且<code>MyComponent</code>中的<code>props.children</code>将是字符串<code>“Hello zhangyatao”</code>。 HTML标签是不会经过转义的，所以你一般可以写JSX就像你写HTML一样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>这是一个html标签 &amp;amp; 同时也是个JSX</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&lt;div&gt;这是一个html标签 &amp;amp; 同时也是个JSX&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>JSX会删除行的开始和结尾处的空格。 它也会删除中间的空行。 与标签相邻的空行被会被删除;<br>在字符串文本中间出现的空行会缩合成一个空格。 所以这些都渲染相同的事情：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>hello zhangyatao</div>

<div>
    hello zhangyatao
</div>

<div>
    hello
    zhangyatao
</div>

<div>

hello zhangyatao
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;div&gt;hello zhangyatao&lt;<span class="hljs-regexp">/div&gt;

&lt;div&gt;
    hello zhangyatao
&lt;/</span>div&gt;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    hello
    zhangyatao
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;div&gt;

hello zhangyatao
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<h4>JSX子元素</h4>
<p>你可以使用很多个JSX元素作为子元素。 这对需要嵌套的显示类型组件很有用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Dialog>
    <DialogHeader />
    <DialogBody />
    <DialogFooter />
</Dialog>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;Dialog&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">DialogHeader</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">DialogBody</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">DialogFooter</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Dialog</span>&gt;</span></span></code></pre>
<p>你可以将不同类型的子元素混合在一起，因此JSX子元素可以与字符串直接量一起使用。 这是JSX的另一种方式，就像一个HTML一样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    这是一个列表
    <ul>
        <li>item 1</li>
        <li>item 2</li>
    </ul>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;div&gt;
    这是一个列表
    &lt;ul&gt;
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>item 1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
        &lt;li&gt;item <span class="hljs-number">2</span>&lt;<span class="hljs-regexp">/li&gt;
    &lt;/u</span>l&gt;
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>一个React组件不可能返回多个React元素，但是一个JSX表达式可以包含多个子元素，因此如果你想让一个组件渲染多个东西，你可以将它们统一放置在就像上面那样的div中。</p>
<h4>Javascript表达式</h4>
<p>您可以将任何JavaScript表达式放在<code>{}</code>中作为子组件传递。 例如，下面这些表达式是等价的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function MyComponent(props) {
    return <div>{props.children}<div>; //=> <div>hi zhangyatao</div>
}

<MyComponent>hi zhangyatao</MyComponent>

<MyComponent>{'hi zhangyatao'}</MyComponent>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyComponent</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> &lt;div&gt;{props.children}&lt;div&gt;; //=&gt; &lt;div&gt;hi zhangyatao&lt;/div&gt;
}

&lt;MyComponent&gt;hi zhangyatao&lt;/MyComponent&gt;

&lt;MyComponent&gt;{'hi zhangyatao'}&lt;/MyComponent&gt;</code></pre>
<p>这通常用于渲染任意长度的JSX表达式列表。 例如，这将渲染一个HTML列表：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Item(props) {
    return <li>{props.message}</li>;
}

function TodoList(props) {
    const todos = ['完成文档', '出去逛街', '打一局dota'];
    return (
        <ul>
            {todos.map(message => <Item key={message} message={message} />)}
        </ul>
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Item</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>{props.message}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">TodoList</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">const</span> todos = [<span class="hljs-string">'完成文档'</span>, <span class="hljs-string">'出去逛街'</span>, <span class="hljs-string">'打一局dota'</span>];
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            {todos.map(message =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">Item</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{message}</span> <span class="hljs-attr">message</span>=<span class="hljs-string">{message}</span> /&gt;</span>)}
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    );
}</span></code></pre>
<p>JavaScript表达式可以与其他类型的子元素混合使用。 这通常用于替换字符串模板：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Hello(props) {
    return <div>Hello {props.name}</div>;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Hello</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello {props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}</code></pre>
<h4>使用函数作为子元素</h4>
<p>通常，插入JSX中的JavaScript表达式都最终返回为一个字符串、React元素、一个列表。</p>
<p>当然，<code>props.children</code>可以像任何其他props那样工作，它可以传递任何类型的数据，并不局限于那些告诉React应该如何渲染的东东。 例如，如果您有一个自定义组件，您可以将<code>props.children</code>作为一个回调函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';

function Repeat(props) {
    let items = [];
    let callback = props.children;
    var numTimes = props.numTimes;
    for(var i = 0 ; i < numTimes ; i++ ){
        items.push(callback(i));
    }
    return <div>{items}</div>;
}

function ListOfTenThings(props) {
    return (
        <Repeat numTimes={10}>
            {index => <div key={index}>这是列表中的第{index}项</div>}
        </Repeat>
    );
}
ReactDOM.render(
    <ListOfTenThings/>,
    document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Repeat</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">let</span> items = [];
    <span class="hljs-keyword">let</span> callback = props.children;
    <span class="hljs-keyword">var</span> numTimes = props.numTimes;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span> ; i &lt; numTimes ; i++ ){
        items.push(callback(i));
    }
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{items}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ListOfTenThings</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Repeat</span> <span class="hljs-attr">numTimes</span>=<span class="hljs-string">{10}</span>&gt;</span>
            {index =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span>&gt;</span>这是列表中的第{index}项<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}
        <span class="hljs-tag">&lt;/<span class="hljs-name">Repeat</span>&gt;</span></span>
    );
}
ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ListOfTenThings</span>/&gt;</span></span>,
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>)
);</code></pre>
<p>传递给自定义组件的子元素可以是任何东西，只要在React在渲染之前，该组件将它们转换为可以理解的东西即可。 这种用法并不常见，如果你想扩展JSX的其他能力，可以通过这个例子了解下它的工作原理。</p>
<h4>布尔值、null、undefined在渲染时会被自动忽略</h4>
<p><code>false</code>，<code>null</code>，<code>undefined</code>和<code>true</code>是有效的子元素，不过他们从根本上讲是不参与渲染的。 这些JSX表达式将渲染处相同的东西：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div />

<div></div>

<div>{false}</div>

<div>{null}</div>

<div>{true}</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;div /&gt;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;div&gt;{<span class="hljs-literal">false</span>}&lt;<span class="hljs-regexp">/div&gt;

&lt;div&gt;{null}&lt;/</span>div&gt;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{true}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>这对于有条件地呈现React元素很有用。 如果<code>showHeader</code>为<code>true</code>，那么这个JSX只渲染一个<code>&lt;Header /&gt;</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    {showHeader &amp;&amp; <Header />}
    <Content />
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;div&gt;
    {showHeader &amp;&amp; <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Header</span> /&gt;</span>}
    <span class="hljs-tag">&lt;<span class="hljs-name">Content</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>如果返回一些<code>“假的”</code>值就会收到一个警告，如数字<code>0</code>，不过React仍然会渲染。 例如，此代码将不会像您预期的那样工作，因为当<code>props.messages</code>是空数组时将打印<code>0</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    {props.messages.length &amp;&amp; <Message messages={props.messages} />}
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;div&gt;
    {props.messages.length &amp;&amp; <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Message</span> <span class="hljs-attr">messages</span>=<span class="hljs-string">{props.messages}</span> /&gt;</span>}
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>想要修复上面的问题，你要确定这个表达式在&amp;&amp;之前总返回<code>布尔值</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    {props.messages.length > 0 &amp;&amp; <Message messages={props.messages} />}
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;div&gt;
    {props.messages.length &gt; <span class="hljs-number">0</span> &amp;&amp; <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Message</span> <span class="hljs-attr">messages</span>=<span class="hljs-string">{props.messages}</span> /&gt;</span>}
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>相反，如果你想要一个值如<code>false</code>，<code>true</code>，<code>null</code>或<code>undefined</code>出现在输出中，你必须先将它转换为<code>字符串</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';

function MyVariable(props) {
    const myVariable = false;
    // 如果这里不把false转换为字符串，这只会输出『我的javascript变量是』
    const convertedVar = String(myVariable);
    return (
        <div>
            我的javascript变量是{convertedVar}
        </div>
    );
}
ReactDOM.render(
    <MyVariable/>,
    document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyVariable</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">const</span> myVariable = <span class="hljs-literal">false</span>;
    <span class="hljs-comment">// 如果这里不把false转换为字符串，这只会输出『我的javascript变量是』</span>
    <span class="hljs-keyword">const</span> convertedVar = <span class="hljs-built_in">String</span>(myVariable);
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            我的javascript变量是{convertedVar}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
}
ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">MyVariable</span>/&gt;</span></span>,
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>)
);</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React从入门到精通系列之(12)深入理解JSX

## 原文链接
[https://segmentfault.com/a/1190000007814334](https://segmentfault.com/a/1190000007814334)

