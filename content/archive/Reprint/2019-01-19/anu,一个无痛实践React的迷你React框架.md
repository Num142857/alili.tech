---
title: 'anu,一个无痛实践React的迷你React框架' 
date: 2019-01-19 2:30:10
hidden: true
slug: kz5zpazm30a
categories: [reprint]
---

{{< raw >}}

                    
<p>近年来，冒出大量MVVM框架，但它几乎无一例外依赖于babel, webpack等编译或手脚架，这让小公司出身的前端们望洋兴叹。因此小城市的前端们，没有高手带着，许多培训班出身，或自学成才转行，如果引用react, ng2这类框架无异于自杀。出问题，webpack配置问N个群都没有问题。依赖于编译的框架也很难调试。</p>
<p>而我们公司则出于另一个目的开发这个框架，手机端需要体积更少的框架。学习了preact, react-lite，我造出了这个类React框架。</p>
<p>此外，它还有一个好处，它是面向未来的。它所依赖的高级语法，都是可以通过简单的pollfill来修复。而JSX，则依赖于babel。anu将JSX改造成字符串，三年后，http2流行了，不需要打包，没有体积的压力。我们就没有维护一个破旧的 webpack的压力。因此这是一个很轻量的框架，回复到jQuery时代，简单直接用页面引用JS主文件就行，其余的交由es6 modules来管理。</p>
<p>由于它与React极其相似，因此React生态圈的东西简单改造一下便能用了。</p>
<p>下面是一个例子，用于三个文件。以后可能会考虑合成一个。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>

<head>
    <meta charset=&quot;utf-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width&quot;>
    <script src='./dist/jsx-parser.js'></script>
    <script src='./dist/evalJSX.js'></script>
    <script src='./dist/anu.js'></script>
    <script>
        class Hello extends anu.Component {
            constructor() {
                super() //Must write, or throw ReferenceError: |this| used uninitialized in Hello class constructor
                this.handleClick = this.handleClick.bind(this)
            }
            componentWillMount() {
                console.log('准备插入DOM树')
            }
            componentDidMount() {
                console.log('已经插入DOM树')
            }
            handleClick() {
                this.setState({
                    title: new Date - 0,
                    child: new Date - 1
                })
            }
            static className() {
                return 'Point';
            }
            render() {
                return evalJSX(`<div tilte={this.state.title} onClick={this.handleClick} >{this.state.child || &quot;点我&quot;}</div>`, {
                    this: this
                })
            }
        }

        function main() {
            return evalJSX(`<h2>对象使用anu<br /><Hello /></h2>`, {
                Hello: Hello
            })
        }
        window.onload = function() {
            var result = anu.render(main(), document.body)
            console.log(result)
        }
    </script>
</head>

<body>
    <div>这个默认会被清掉</div>
</body>

</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'./dist/jsx-parser.js'</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'./dist/evalJSX.js'</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'./dist/anu.js'</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Hello</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">anu</span>.<span class="hljs-title">Component</span> </span>{
            <span class="hljs-keyword">constructor</span>() {
                <span class="hljs-keyword">super</span>() <span class="hljs-comment">//Must write, or throw ReferenceError: |this| used uninitialized in Hello class constructor</span>
                <span class="hljs-keyword">this</span>.handleClick = <span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>)
            }
            componentWillMount() {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'准备插入DOM树'</span>)
            }
            componentDidMount() {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'已经插入DOM树'</span>)
            }
            handleClick() {
                <span class="hljs-keyword">this</span>.setState({
                    <span class="hljs-attr">title</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span> - <span class="hljs-number">0</span>,
                    <span class="hljs-attr">child</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span> - <span class="hljs-number">1</span>
                })
            }
            <span class="hljs-keyword">static</span> className() {
                <span class="hljs-keyword">return</span> <span class="hljs-string">'Point'</span>;
            }
            render() {
                <span class="hljs-keyword">return</span> evalJSX(<span class="hljs-string">`&lt;div tilte={this.state.title} onClick={this.handleClick} &gt;{this.state.child || "点我"}&lt;/div&gt;`</span>, {
                    <span class="hljs-attr">this</span>: <span class="hljs-keyword">this</span>
                })
            }
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> evalJSX(<span class="hljs-string">`&lt;h2&gt;对象使用anu&lt;br /&gt;&lt;Hello /&gt;&lt;/h2&gt;`</span>, {
                <span class="hljs-attr">Hello</span>: Hello
            })
        }
        <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> result = anu.render(main(), <span class="hljs-built_in">document</span>.body)
            <span class="hljs-built_in">console</span>.log(result)
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>这个默认会被清掉<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>目前定义组件时是用es6方式，如果你想支持IE8等老旧浏览器，也可以用createClass来定义类。</p>
<p>目前anu是支持React的多种定义组件方式，包括Stateless Component, InPure Component, Pure Component。</p>
<p>如果你想减少改动，继续用React命名，可以做以下处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var React = window.anu
evalJSX.globalNs = &quot;React&quot;。

var myComponent = React.createClass({
    getDefaultProps(){
       return {children: &quot;xxxx&quot;}
    }
    render(){
      return evalJSX(&quot;<div>{this.props.children}</div>&quot;,{this.this})
   }
})

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> React = window.anu
evalJSX.globalNs = <span class="hljs-string">"React"</span>。

<span class="hljs-keyword">var</span> myComponent = React.createClass({
    getDefaultProps(){
       <span class="hljs-keyword">return</span> {children: <span class="hljs-string">"xxxx"</span>}
    }
    render(){
      <span class="hljs-keyword">return</span> evalJSX(<span class="hljs-string">"&lt;div&gt;{this.props.children}&lt;/div&gt;"</span>,{<span class="hljs-keyword">this</span>.<span class="hljs-keyword">this</span>})
   }
})

</code></pre>
<p>基本上我是朝着100%模仿React来打造它，但一些过旧的官方不推荐的功能，我也像React那样做成插件。</p>
<p>目前没有支持的方法与对象</p>
<ol>
<li><p>PropTypes</p></li>
<li><p>childContextTypes</p></li>
<li><p>Children的方法集合</p></li>
<li><p>mixin机制</p></li>
</ol>
<p>更多介绍可见它的GITHUB homepage</p>
<p><a href="https://github.com/RubyLouvre/anu" rel="nofollow noreferrer" target="_blank">https://github.com/RubyLouvre...</a></p>
<p>欢迎加星星与试用</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
anu,一个无痛实践React的迷你React框架

## 原文链接
[https://segmentfault.com/a/1190000008603928](https://segmentfault.com/a/1190000008603928)

