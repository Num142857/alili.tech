---
title: '[React Native Android 安利系列]ReactNative中的reactjs基础' 
date: 2019-02-02 2:30:11
hidden: true
slug: pkedmi91nzr
categories: [reprint]
---

{{< raw >}}

                    
<p>这一系列课程说了很多关于react-native的知识，都是有关于样式，底层，环境等知识的，现在我们来学习一下reactjs的基础知识。我们的代码，我们创建的组件的相关知识。<br>欢迎大家收看react-native-android系列教程，跟着本系列教程学习，可以熟练掌握react-native-android的开发，你值得拥有：<br><a href="https://segmentfault.com/blog/frontenddriver">https://segmentfault.com/blog...</a><br>回顾前几期，我们做过了这么多实践，是时候回过头来看看我们写的JS文件了。</p>
<h1 id="articleHeader0">1. 语法</h1>
<p>我们书写reactjs的时候，当然可以使用ES5的语法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reactNative = require('react-native');
var React = require('react');
var View = reactNative.View;
var Text = reactNative.Text;
var StyleSheet = reactNative.StyleSheet;
var AppRegistry = reactNative.AppRegistry;

var hellowReact = React.createClass({
    render: function () {
        return (
            <View>
                <Text>欢迎收看react-native-android系列教程</Text>
            </View>
        );  
    }   
});
AppRegistry.registerComponent('hellowReact', () => hellowReact);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> reactNative = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react-native'</span>);
<span class="hljs-keyword">var</span> React = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react'</span>);
<span class="hljs-keyword">var</span> View = reactNative.View;
<span class="hljs-keyword">var</span> Text = reactNative.Text;
<span class="hljs-keyword">var</span> StyleSheet = reactNative.StyleSheet;
<span class="hljs-keyword">var</span> AppRegistry = reactNative.AppRegistry;

<span class="hljs-keyword">var</span> hellowReact = React.createClass({
    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">View</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Text</span>&gt;</span>欢迎收看react-native-android系列教程<span class="hljs-tag">&lt;/<span class="hljs-name">Text</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span></span>
        );  
    }   
});
AppRegistry.registerComponent(<span class="hljs-string">'hellowReact'</span>, () =&gt; hellowReact);</code></pre>
<p>也可以使用ES6的语法，react中内置了packager帮我们进行转换。<br>如果使用了es5的语法的话，我们可以看到，我们创建了一个『类』---hellowReact，确切的说，是一个组件。这个『类』必须要有一个render方法。这个render方法的返回值，指定了渲染在APP上的原生层。个人感觉这与android中的xml布局文件类似。</p>
<p>当然，我们也可以像之前一样，使用es6的语法进行描述。使用真正的类。这里，笔者建议使用ES6的语法去书写RN程序:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    AppRegistry 
} from 'react-native';

class hellowReact extends Component {
    render() {
        return (
            <View>
                <Text>欢迎收看react-native-android系列教程</Text>
            </View>
        );  
    }   
}
AppRegistry.registerComponent('hellowReact', () => hellowReact);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, {<span class="hljs-type">Component</span>} from <span class="hljs-symbol">'reac</span>t';
<span class="hljs-keyword">import</span> {
    <span class="hljs-type">StyleSheet</span>,
    <span class="hljs-type">Text</span>,
    <span class="hljs-type">View</span>,
    <span class="hljs-type">AppRegistry</span> 
} from <span class="hljs-symbol">'react</span>-native';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">hellowReact</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            &lt;<span class="hljs-type">View</span>&gt;
                &lt;<span class="hljs-type">Text</span>&gt;欢迎收看react-native-android系列教程&lt;/<span class="hljs-type">Text</span>&gt;
            &lt;/<span class="hljs-type">View</span>&gt;
        );  
    }   
}
<span class="hljs-type">AppRegistry</span>.registerComponent(<span class="hljs-symbol">'hellowReac</span>t', () =&gt; hellowReact);</code></pre>
<h1 id="articleHeader1">2. JSX</h1>
<p>不得不说，jsx真是一个神奇的设计，在js代码中，混入xml风格的标签。刚开始接触的话，可能你会不习惯这样的代码形式，但当你习惯了这种语法之后，将浴霸不能<span class="img-wrap"><img data-src="/img/bVDMsJ?w=50&amp;h=42" src="https://static.alili.tech/img/bVDMsJ?w=50&amp;h=42" alt="图片描述" title="图片描述" style="cursor: pointer;"></span>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class hellowReact extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>欢迎收看react-native-android系列教程</Text>
            </View>
        );  
    }   
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">hellowReact</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            &lt;<span class="hljs-type">View</span> style={styles.container}&gt;
                &lt;<span class="hljs-type">Text</span>&gt;欢迎收看react-native-android系列教程&lt;/<span class="hljs-type">Text</span>&gt;
            &lt;/<span class="hljs-type">View</span>&gt;
        );  
    }   
}</code></pre>
<p>从上述代码我们可以看出，jsx中标签的形式与html类似，同样也是需要嵌套的标签层。同样需要闭合的标签。如果需要在JSX中混入js变量的话，则需要使用界符<code>{}</code>进行包裹。其中的js会被解析。JSX中的标签，由react-native基础库提供。当然，我们的标签也可以使用自己创建的组件。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Com extends Component {
    render() {
        return (
            <Text>欢迎收看react-native-android系列教程</Text>
        );  
    }   
}

class hellowReact extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Com />
            </View>
        );  
    }   
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Com</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            &lt;<span class="hljs-type">Text</span>&gt;欢迎收看react-native-android系列教程&lt;/<span class="hljs-type">Text</span>&gt;
        );  
    }   
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">hellowReact</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            &lt;<span class="hljs-type">View</span> style={styles.container}&gt;
                &lt;<span class="hljs-type">Com</span> /&gt;
            &lt;/<span class="hljs-type">View</span>&gt;
        );  
    }   
}</code></pre>
<p>这里需要注意下，文字需要包裹在Text标签中。标签开头接受属性。每个标签的样式可以加载在自己的style属性中。另外还需注意，我们渲染的jsx，最外层只能有一个顶级的元素进行包裹。</p>
<h1 id="articleHeader2">3. 组件</h1>
<p>上面，我们已经说到了标签可以是自己创建的组件。我们也写了一个简单的组件。react中，书写自己的组件，可以将应用更加细化的拆分为多个模块。便于模块化的维护代码。自定义的组件在渲染时，可以传入一些属性，在组件内这些属性可以被获取，如图3.0.1：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Com extends Component {
    render() {
        return (
            <Text>传过来的参数是：{this.props.param}</Text>
        );
    }
}

class hellowReact extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Com param={'我是传入的参数!'} />
            </View>
        );  
    }   
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Com</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            &lt;<span class="hljs-type">Text</span>&gt;传过来的参数是：{<span class="hljs-keyword">this</span>.props.param}&lt;/<span class="hljs-type">Text</span>&gt;
        );
    }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">hellowReact</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            &lt;<span class="hljs-type">View</span> style={styles.container}&gt;
                &lt;<span class="hljs-type">Com</span> param={'我是传入的参数!'} /&gt;
            &lt;/<span class="hljs-type">View</span>&gt;
        );  
    }   
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVDMsQ?w=344&amp;h=614" src="https://static.alili.tech/img/bVDMsQ?w=344&amp;h=614" alt="195637_Ysvm_1177792.png" title="195637_Ysvm_1177792.png" style="cursor: pointer; display: inline;"></span></p>
<p>图3.0.1</p>
<p>其实我们在JSX中插入的是一个类名，但是在渲染的时候，会生成一个类的实例。 这里提示一下大家，类的第一个字母需要大写，否则你会收到一个错误.....(如图3.0.2)：<br><span class="img-wrap"><img data-src="/img/bVDMsS?w=344&amp;h=611" src="https://static.alili.tech/img/bVDMsS?w=344&amp;h=611" alt="200126_HE9c_1177792.png" title="200126_HE9c_1177792.png" style="cursor: pointer; display: inline;"></span></p>
<p>图3.0.2</p>
<h1 id="articleHeader3">4 状态与更新</h1>
<p>在网页开发中，我们的思维总是自己获取数据，自己去更改视图。但是reactjs给我们带来了完全不同的体验。reactjs认为，我们的程序是一个状态机。reactjs为我们提供了VM层，其实我们再回头来看看，我们在写render函数的返回值的时候，不就已经将我们的状态与视图融合在一起了吗？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class hellowReact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'hy'
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>当前的状态是：{this.state.name}</Text>
            </View>
        );  
    }   
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">hellowReact</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    constructor(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            name: <span class="hljs-symbol">'h</span>y'
        };
    }
    render() {
        <span class="hljs-keyword">return</span> (
            &lt;<span class="hljs-type">View</span> style={styles.container}&gt;
                &lt;<span class="hljs-type">Text</span>&gt;当前的状态是：{<span class="hljs-keyword">this</span>.state.name}&lt;/<span class="hljs-type">Text</span>&gt;
            &lt;/<span class="hljs-type">View</span>&gt;
        );  
    }   
}</code></pre>
<p>上面的代码展示了，我们将当前组建的状态(this.state)混入到了当前组件的视图中。我们在组件创建的时候会给定一个初始状态(initialState)，这个状态在getInitialState这个钩子函数的返回值中给到组件。</p>
<p>reactjs支持我们更改状态，从而引起视图的变化。我们将上述代码进行改造，增加更改视图的时机：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    AppRegistry 
} from 'react-native';

class hellowReact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'hy'
        };
    }
    changeState() {
        this.setState({
            name: 'hysg'
        });
    }
    render() {
        return (
            <View style={styles.container} onTouchEnd={this.changeState.bind(this)}>
                <Text>当前的状态是：{this.state.name}</Text>
            </View>
        );  
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
    },
});

AppRegistry.registerComponent('hellowReact', () => hellowReact);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> {
    StyleSheet,
    Text,
    View,
    AppRegistry 
} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-native'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">hellowReact</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">name</span>: <span class="hljs-string">'hy'</span>
        };
    }
    changeState() {
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">name</span>: <span class="hljs-string">'hysg'</span>
        });
    }
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">View</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styles.container}</span> <span class="hljs-attr">onTouchEnd</span>=<span class="hljs-string">{this.changeState.bind(this)}</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Text</span>&gt;</span>当前的状态是：{this.state.name}<span class="hljs-tag">&lt;/<span class="hljs-name">Text</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span></span>
        );  
    }
}

<span class="hljs-keyword">const</span> styles = StyleSheet.create({
    <span class="hljs-attr">container</span>: {
        <span class="hljs-attr">flex</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">flexDirection</span>: <span class="hljs-string">'row'</span>,
        <span class="hljs-attr">alignItems</span>: <span class="hljs-string">'flex-start'</span>,
        <span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">'#fff'</span>,
    },
});

AppRegistry.registerComponent(<span class="hljs-string">'hellowReact'</span>, () =&gt; hellowReact);</code></pre>
<p>我们看一下上面的代码，在view点击的时候，更新当前组件的状态。并没有强制去更改状态。但是，状态改变了，随即而来的就是视图自动发生了变化，初始状态如图4.0.1，点击后，状态更新，视图随即更新至图4.0.2：<br><span class="img-wrap"><img data-src="/img/bVDMsW?w=343&amp;h=612" src="https://static.alili.tech/img/bVDMsW?w=343&amp;h=612" alt="203533_Irvy_1177792.png" title="203533_Irvy_1177792.png" style="cursor: pointer;"></span></p>
<p>图4.0.1</p>
<p><span class="img-wrap"><img data-src="/img/bVDMs0?w=345&amp;h=615" src="https://static.alili.tech/img/bVDMs0?w=345&amp;h=615" alt="091509_YFXO_1177792.png" title="091509_YFXO_1177792.png" style="cursor: pointer;"></span></p>
<p>图4.0.2</p>
<p>其实我们也能猜到，setState方法，最终就是再次调用render，但是其中会有一些特殊的处理。不过，从上述代码的角度看来，我们只是更改了状态(调用了setState)，最终引起了视图的变化，这就是reactjs非常特别的思想。</p>
<h1 id="articleHeader4">5 事件的绑定</h1>
<p>不同于我们的js或者原生android，我们总是在视图之外，在自己的逻辑代码中，去选取特定元素，并在其上绑定事件。reactjs绑定事件是放在JSX中的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class hellowReact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'hy'
        };
    }
    changeState() {
        this.setState({
            name: 'hysg'
        });
    }
    render() {
        return (
            <View style={styles.container} onTouchEnd={this.changeState}>
                <Text>当前的状态是：{this.state.name}</Text>
            </View>
        );  
    }   
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">hellowReact</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    constructor(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            name: <span class="hljs-symbol">'h</span>y'
        };
    }
    changeState() {
        <span class="hljs-keyword">this</span>.setState({
            name: <span class="hljs-symbol">'hys</span>g'
        });
    }
    render() {
        <span class="hljs-keyword">return</span> (
            &lt;<span class="hljs-type">View</span> style={styles.container} onTouchEnd={<span class="hljs-keyword">this</span>.changeState}&gt;
                &lt;<span class="hljs-type">Text</span>&gt;当前的状态是：{<span class="hljs-keyword">this</span>.state.name}&lt;/<span class="hljs-type">Text</span>&gt;
            &lt;/<span class="hljs-type">View</span>&gt;
        );  
    }   
};</code></pre>
<p>如上，我们把TouchEnd事件绑定在了最外层的View上。事件名称直接写为标签的属性，其值则是对应的事件处理函数。</p>
<p>请注意，与react-web不同的是，事件触发函数的上下文，默认就是本组件。本例中，我们changeState中的this，指代的就是hellowReact的实例。</p>
<h1 id="articleHeader5">6 获取元素</h1>
<p>相信做前端的同学们，还是习惯了jQuery的模式，用选择器去选择DOM，并操作。但是对于React来讲，平时使用state与jsx更新视图就够了。虽然RN不是DOM，没有选择器去选取DOM，但是我们还是免不了要去获取元素。这时就得使用"对组建的引用---refs属性"了。<br>举个简单的例子，我们要获取一个元素并测量一个这个元素在页面上的位置与长度&amp;宽度，我们就要使用refs，先来获取到那个元素，再来测量了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class hellowReact extends Component {
    getPos() {
        this.refs.measureme
        .measure((fx, fy, width, height, px, py) => {
            console.log('我的位置是：', 'x:', fx, 'y:', fy);
        });
    }
    render() {
        return (
            <View onTouchEnd={this.getPos}>
                <Text ref={&quot;measureme&quot;}>测量我</Text>
            </View>
        );  
    }   
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">hellowReact</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    getPos() {
        <span class="hljs-keyword">this</span>.refs.measureme
        .measure(<span class="hljs-function">(<span class="hljs-params">fx, fy, width, height, px, py</span>) =&gt;</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我的位置是：'</span>, <span class="hljs-string">'x:'</span>, fx, <span class="hljs-string">'y:'</span>, fy);
        });
    }
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">View</span> <span class="hljs-attr">onTouchEnd</span>=<span class="hljs-string">{this.getPos}</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Text</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{</span>"<span class="hljs-attr">measureme</span>"}&gt;</span>测量我<span class="hljs-tag">&lt;/<span class="hljs-name">Text</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span></span>
        );  
    }   
}</code></pre>
<p>这样，点击后就能测量到元素的位置啦。</p>
<h1 id="articleHeader6">7 全局对象</h1>
<p>在reactNative中，引用全局对象可以使用window或者global，它们都指向一个对象--DedicatedWorkerGlobalScope，其中有jscore提供的方法，也有reactnative注入的方法。我们之后会详细讲解react注入的方法。</p>
<h1 id="articleHeader7">8 模块化</h1>
<p>ReactNative可以直接使用commonjs的方式去编写模块化的代码，因为使用的packager打包的方式类似于webpack或者browserfy，可以通过require，导入模块，可以通过exports暴露出模块中的方法或者变量。当然，直接使用es6 import的方式，也是可以更加方便的导入自己写的模块的。如下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import amodule from './amodule';
var hellowReact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: amodule.getName()
        };
    }
    changeState() {
        this.setState({
            name: 'hysg'
        });
    }
    render() {
        return (
            <View style={styles.container} onTouchEnd={this.changeState}>
                <Text>当前的状态是：{this.state.name}</Text>
            </View>
        );  
    }  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> amodule <span class="hljs-keyword">from</span> <span class="hljs-string">'./amodule'</span>;
<span class="hljs-keyword">var</span> hellowReact extends Component {
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">name</span>: amodule.getName()
        };
    }
    changeState() {
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">name</span>: <span class="hljs-string">'hysg'</span>
        });
    }
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">View</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styles.container}</span> <span class="hljs-attr">onTouchEnd</span>=<span class="hljs-string">{this.changeState}</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Text</span>&gt;</span>当前的状态是：{this.state.name}<span class="hljs-tag">&lt;/<span class="hljs-name">Text</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span></span>
        );  
    }  
}</code></pre>
<p>amodule.js中的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function () {
    return 'hy';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">'hy'</span>;
}</code></pre>
<p>不过切记一个模块是一个单例。</p>
<h1 id="articleHeader8">9 课后作业</h1>
<p>本节重在基础学习，所以就没有上传代码例子。各位请自行敲一下上面的代码进行实践。</p>
<p>接下来，我会和大家一起聊聊react-native的源码编译。另外，近期我也会开设一套react-native-ios的系列教程，不要走开，请关注我.....</p>
<p><strong>如果喜欢本文请点击下方的推荐哦，你的推荐会变为我继续更文的动力。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[React Native Android 安利系列]ReactNative中的reactjs基础

## 原文链接
[https://segmentfault.com/a/1190000007058805](https://segmentfault.com/a/1190000007058805)

