---
title: 'React还是Vue？' 
date: 2019-01-15 2:30:12
hidden: true
slug: 7zabl64gty2
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文链接：React or Vue: Which Javascript UI Library Should You Be Using? | Codementor<br>作者：Anthony Gore<br>译者：sunny<br>转载需提前联系译者，未经允许不得转载。<br>本文首发于<a href="https://zhuanlan.zhihu.com/fe-guide" rel="nofollow noreferrer" target="_blank">前端指南</a></p></blockquote>
<p>2016年，React巩固了它JavaScript web框架之王的地位。在这一年里，Web和原生APP的库都迅速发展，同时与Angular相比，也具有明显优势。</p>
<p>与此同时，2016年对于Vue而言，也是很重要的一年。Vue2的发布给JavaScript社区带来了巨大的冲击，在Github上获得了25000个star。</p>
<p>不可否认，React和Vue的范围十分类似：它们都是轻量级的组件库，都用于构建用户界面，专注于视图层。两者都可以在简单项目中，也可以使用工具将它们扩展为复杂的应用程序。</p>
<p>因此，很多web开发人员都想知道，到底应该选择哪一个？一个明显优于另一个？有什么需要注意的利弊吗？还是说，两者基本相同？</p>
<h2 id="articleHeader0">两个框架，两个倡导者</h2>
<p>在本文中，我想彻底地公正地比较两者之前的区别。唯一的问题就是：我是Vue的爱好者，必然会有一些偏见。我经常在我的项目中使用Vue，还发布了一些在线教程，即<a href="https://www.udemy.com/vuejs-2-essentials/?couponCode=JSDOJO-CM" rel="nofollow noreferrer" target="_blank">Ultimate Vue.js Developers course</a></p>
<p>为了摆脱我偏见的影响，我找到了我的朋友Alexis Mangin，他是一名优秀的JavaScript开发者，也是React的爱好者。他沉浸在React中，经常在Web和移动APP开发中使用React。</p>
<p>Alexis曾经问我：“为什么你这么喜欢Vue，从来不用React？”。由于我不太了解React，我很难回答这个问题。所以，我决定，一起坐下来，展示我们选择的库，看看它们究竟能提供什么东西。</p>
<p><span class="img-wrap"><img data-src="/img/bVM3pO?w=600&amp;h=380" src="https://static.alili.tech/img/bVM3pO?w=600&amp;h=380" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>经过激烈的讨论和互相学习，我们得出了以下6个结论。</p>
<h3 id="articleHeader1">如果你喜欢使用模板（ 或需要一些其中的选项）构建应用程序，那么请选择Vue</h3>
<p>将标记放在HTML文件中是Vue应用程序的默认选项。与Angular类似，大括号用于数据绑定表达式，指令（特殊的HTML属性）用于向模板添加功能。下面是一个简单的Vue程序例子。它可以输出一条消息，有一个按钮可以动态反转消息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
  <p>"{{" message "}}"</p>
  <button v-on:click=&quot;reverseMessage&quot;>Reverse Message</button>
</div>

new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('');
    }
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>&lt;div id=<span class="hljs-string">"app"</span>&gt;
  &lt;p&gt;"{{" <span class="hljs-keyword">message</span> "}}"&lt;/p&gt;
  &lt;button v-<span class="hljs-keyword">on</span>:click=<span class="hljs-string">"reverseMessage"</span>&gt;Reverse <span class="hljs-keyword">Message</span>&lt;/button&gt;
&lt;/div&gt;

new Vue({
  el: '<span class="hljs-comment">#app',</span>
  data: {
    <span class="hljs-keyword">message</span>: 'Hello Vue.js!
  },
  methods: {
    reverseMessage: <span class="hljs-keyword">function</span> () {
      this.<span class="hljs-keyword">message</span> = this.<span class="hljs-keyword">message</span>.split('').reverse().join('');
    }
  }
});</code></pre>
<p>相比之下，React应用程序避开模板，要求开放人员在JavaScript中创建DOM，通常用JSX辅助，下面是用React来实现同样的功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Hello React.js!'
    };
  }
  reverseMessage() {
    this.setState({ 
      message: this.state.message.split('').reverse().join('') 
    });
  }
  render() {
    return (
      <div>
        <p>{this.state.message}</p>
        <button onClick={() => this.reverseMessage()}>
          Reverse Message
        </button>
      </div>
    )
  }
}
ReactDOM.render(App, document.getElementById('app'));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">message</span>: <span class="hljs-string">'Hello React.js!'</span>
    };
  }
  reverseMessage() {
    <span class="hljs-keyword">this</span>.setState({ 
      <span class="hljs-attr">message</span>: <span class="hljs-keyword">this</span>.state.message.split(<span class="hljs-string">''</span>).reverse().join(<span class="hljs-string">''</span>) 
    });
  }
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{this.state.message}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> this.reverseMessage()}&gt;
          Reverse Message
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}
ReactDOM.render(App, <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>));
</code></pre>
<p>对于学习标准的web初级开发者而言，模板更容易理解。但是也有很多经验丰富的开发人员乐意使用模板，因为模板可以更好地分离布局和功能，同时也可以选择向Pug这样的预处理器。</p>
<p>但是，使用模板需要学习所有的HTML扩展语法，渲染函数只需要了解标准的HTML和JavaScript</p>
<h3 id="articleHeader2">如果你喜欢简单的能正常工作的，那么请选择Vue</h3>
<p>一个简单的Vue项目可以不需要解析，直接在浏览器中运行，这允许Vue可以像jQuery一样在项目中引用。</p>
<p>虽然在技术上使用React也是可行的，但是典型的React代码更倾向于像classes和non-mulating 数组方法这样的JSX和ES6的特性。但是Vue在简洁设计方面更为深入。我们来比较两者如何处理应用程序的数据（即“状态”）。</p>
<p>在React中State是不可以直接改变的，需要调用setState接口：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState({ 
    message: this.state.message.split('').reverse().join('') 
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.setState</span>({ 
    <span class="hljs-attribute">message</span>: this.state.message.<span class="hljs-built_in">split</span>(<span class="hljs-string">''</span>).<span class="hljs-built_in">reverse</span>().<span class="hljs-built_in">join</span>(<span class="hljs-string">''</span>) 
});</code></pre>
<p>当前和之前的状态差异让React知道什么时候在DOM中重新渲染以及渲染什么，因此不可变的状态是非常必要的。</p>
<p>相比之下，数据可以在Vue中突变。相同的数据属性在Vue中发生变化更为简单。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Note that data properties are available as properties of 
// the Vue instance
this.message = this.message.split('').reverse().join('');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-comment">// Note that data properties are available as properties of </span>
<span class="hljs-comment">// the Vue instance</span>
<span class="hljs-keyword">this</span>.message = <span class="hljs-keyword">this</span>.message.<span class="hljs-built_in">split</span>(<span class="hljs-string">''</span>).<span class="hljs-built_in">reverse</span>().<span class="hljs-built_in">join</span>(<span class="hljs-string">''</span>);</code></pre>
<p>在你得出Vue渲染系统比React渲染低效的结论之前，让我们来看看Vue中的状态管理：当你向状态添加新对象时，Vue会遍历它的所有属性并且转换为getter和setter。Vue系统会持续追踪状态并且在状态发生变化时，自动重新渲染DOM。</p>
<p>令人印象深刻的是，Vue中的状态改变更为简洁的同时，重新渲染系统的效率其实比React更好。</p>
<p>Vue的反应系统确实有值得注意的事项。例如：它不能检测到属性的添加、删除以及特定数组的变化。在这种情况下，可以使用Vue API中类似React的set方法。</p>
<h3 id="articleHeader3">如果你希望你的程序更小更快，那么请选择Vue</h3>
<p>React和Vue都将构建一个虚拟DOM，并且在应用程序状态更改时同步更新实际的DOM。两者都有自己的优化方法。Vue核心开发人员提供了一个基准测试，展示了Vue的渲染系统比React的更快。在这个测试中，10000个项目的列表被渲染了100次。下面的表格展示了比较的结果。</p>
<p><span class="img-wrap"><img data-src="/img/bVLS68?w=600&amp;h=226" src="https://static.alili.tech/img/bVLS68?w=600&amp;h=226" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>从实际角度而言，这种基准只与边缘情况有关。大多数应用程序不需要经常进行这种操作，因此不能将其视为比较的一个重要因素。</p>
<p>虽然页面的大小与项目相关，Vue又占据了优势。目前发布的Vue库只有25.6KB。</p>
<p>要用React实现类似的功能，你需要使用React DOM（37.4KB）和React with Addons库（11.4KB），总共为48.8KB，几乎是Vue的两倍。为了公平起见，你可以使用React获得更多的API，但是不会有双倍的功能。</p>
<h3 id="articleHeader4">如果你想要构建大型应用程序，那么请选择React</h3>
<p>用Vue和React来实现简单的应用程序，就像本文开头所说的一样，大部分开发者会偏向于Vue。这是因为基于模板的应用程序乍看更容易理解，并且能够更快启动。</p>
<p>但是这些初始的好处会导致大型程序进展缓慢。模板很容易出现运行时错误，难以测试，也不容易重构或分解。</p>
<p>相比之下，JavaScript制作的模板可以被组织成可分解的组件，DRY code也更容易重用和测试。</p>
<p>Vue也具有组件系统和渲染功能。但是React的渲染系统配置性更高，并且具有浅渲染的特性，与React的测试程序结合时，可以提供更多可测试和可维护的代码。</p>
<p>同时，React不可变的代码并不简单，当透明度和可测试性至关重要时，它会发挥更大的作用。</p>
<h3 id="articleHeader5">如果你想要一个同时适用于web和原生APP的库，那么请选择React</h3>
<p>React Native是用JavaScript创建原生APP的库。它与React相同，只是将web组件换成了原生组件。如果你学习了React.js，那么你很快就可以学会React Native，反之亦然。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'; 
import { AppRegistry, Text, View } from 'react-native';  
class HelloWorld extends Component {   
  render() {     
    return (       
      <View>         
        <Text>Hello, React Native!</Text>
      </View>
    );   
  }
}
AppRegistry.registerComponent('HelloWorld', () => HelloWorld);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t'; 
<span class="hljs-keyword">import</span> { <span class="hljs-type">AppRegistry</span>, <span class="hljs-type">Text</span>, <span class="hljs-type">View</span> } from <span class="hljs-symbol">'react</span>-native';  
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloWorld</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{   
  render() {     
    <span class="hljs-keyword">return</span> (       
      &lt;<span class="hljs-type">View</span>&gt;         
        &lt;<span class="hljs-type">Text</span>&gt;<span class="hljs-type">Hello</span>, <span class="hljs-type">React</span> <span class="hljs-type">Native</span>!&lt;/<span class="hljs-type">Text</span>&gt;
      &lt;/<span class="hljs-type">View</span>&gt;
    );   
  }
}
<span class="hljs-type">AppRegistry</span>.registerComponent(<span class="hljs-symbol">'HelloWorl</span>d', () =&gt; <span class="hljs-type">HelloWorld</span>);</code></pre>
<p>重要的是，开发人员可以构建一个web或者原生APP，他们不需要不同的知识体系和工具。如果您打算开发web和移动APP，React会给你带来巨大冲击。</p>
<p>阿里巴巴的Weex是另一个跨平台UI项目。目前，它认为Vue提供了灵感，并且使用了很多相同的语法，并计划完全集成Vue。但是，这个计划的时间表和细节尚未清晰。</p>
<p>由于Vue将HTML模板作为其设计的核心部分，也没有将客户端渲染作为当前的特性，因此很难看到原生的Vue像React.js或React Native一样紧密。</p>
<h3 id="articleHeader6">如果你想要最大的生态系统，那么请选择React</h3>
<p>毫无疑问，React目前是最受欢迎的库，NPM下载量每月约2.5M，Vue每月的下载量为225k。</p>
<p><span class="img-wrap"><img data-src="/img/bVHAjs?w=800&amp;h=326" src="https://static.alili.tech/img/bVHAjs?w=800&amp;h=326" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>人气带来的好处不止一点半点。这意味有更多的文章、教程和Stack Overflow回答能够帮助。也意味着在项目中有更多的工具和附加组件可用，同时节省了开发人员自己构建所有模块的时间。</p>
<p>两者都是开源的，但是React诞生自Facebook，受益于它。开发者和热爱React的公司都可以保障React一直被维护。</p>
<p>相比之下，Evan You一个人创建了Vue，同时他也是Vue唯一的全职维护人员。Vue得到了一些企业的赞助，但是还达不到Facebook或是Google的规模。</p>
<p>为了使得Vue团队更为可信，它的小体积和独立性目前并不被当做劣势。Vue有规律的发布周期，令人印象深刻的是，Vue在Github上只有54个公开的问题，3456个关闭的问题，而React有530个开放问题，3447个关闭的问题。</p>
<h3 id="articleHeader7">如果你已经选择了其中的一个，那么也不需要换了</h3>
<p>总而言之，我们发现，Vue的优势是：</p>
<ul>
<li><p>模板或渲染的灵活选项</p></li>
<li><p>语法以及项目设置的简单</p></li>
<li><p>渲染速度更快，体积更小</p></li>
</ul>
<p>React的优势是：</p>
<ul>
<li><p>更大的规模、更多的使用者、更好的可测试性</p></li>
<li><p>Web和原生APP</p></li>
<li><p>能提供更多支持和工具的更大的生态系统</p></li>
</ul>
<p>然而，React和Vue都是优秀的UI库，并且具有更多的相似之处。它们都有的优势是：</p>
<ul>
<li><p>使用虚拟DOM快速渲染</p></li>
<li><p>轻量级</p></li>
<li><p>响应式组件</p></li>
<li><p>服务端渲染</p></li>
<li><p>轻松集成的的路由、捆绑和状态管理</p></li>
<li><p>强大的支持和社区</p></li>
</ul>
<p>如果你认为我们漏掉了一些东西，欢迎在评论中说明。Happy developing！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React还是Vue？

## 原文链接
[https://segmentfault.com/a/1190000009268926](https://segmentfault.com/a/1190000009268926)

