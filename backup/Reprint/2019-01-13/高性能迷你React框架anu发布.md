---
title: '高性能迷你React框架anu发布' 
date: 2019-01-13 2:30:11
hidden: true
slug: qs56jjusz2
categories: [reprint]
---

{{< raw >}}

                    
<p>随着react的流行，针对其改良方案也逐渐增多起来。有的在体积上进行优化，有的在性能上进行优化，有的在两者上做努力。anu就是最后一种情况。</p>
<p>anu是我继avalon之后又一个新框架，解决移动端打包过大的问题而诞生的。内部名字叫qreact，它早期是基于preact改进来的，已经在公司业务上使用了。</p>
<p>preact, react-lite是现在比较流行的react-like框架。当然也有人提到inferno，但inferno要改动过多。参考这些框架，我的迷你react框架anu走得更远，完全兼容<code>react-redux</code>, <code>react-router</code>, <code>官方chrome调试工具</code>。性能上也非常优秀。</p>
<p>下面是dbmonster的测试结果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009659322?w=2450&amp;h=768" src="https://static.alili.tech/img/remote/1460000009659322?w=2450&amp;h=768" alt="img" title="img" style="cursor: pointer; display: inline;"></span></p>
<p>preact想在业务线用其实还需要用preact-compat，用了后性能可能折损过半。</p>
<p>体积大概是原来的1/10, 从3万行变成1.7K</p>
<p>更多例子可以见GITHUB仓库</p>
<p><a href="https://github.com/RubyLouvre/anu" rel="nofollow noreferrer" target="_blank">https://github.com/RubyLouvre...</a></p>
<p><a href="https://github.com/RubyLouvre/anu/wiki" rel="nofollow noreferrer" target="_blank">https://github.com/RubyLouvre...</a></p>
<p>我会继续优化anu，让它的浏览器兼容性更好，性能更好。欢迎大家加星与试用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>

<head>
    <meta charset=&quot;utf-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width&quot;>

   <script type='text/javascript' src=&quot;./dist/React.js&quot;></script>

    <script src=&quot;./test/babel.js&quot;></script>
    <script type='text/babel'>
    var s
   var str = ''
        class Component1 extends React.Component {
            componentWillUnmount() {
                str += 'xxxx'
            }
            render() {
                return <div className=&quot;component1&quot;>{this.props.children}</div>
            }
        }
        class Component2 extends React.Component {
            componentWillUnmount() {
                str += ' yyyy'
            }
            render() {
                return <div className=&quot;component1&quot;>xxx</div>
            }
        }
        var index = 1
        function detect(a) {
            if (index === 1) {
               // expect(typeof a).toBe('object')
            } else {
               // expect(a).toBeNull()
            }
        }
        class App extends React.Component {
            constructor(props) {
                super(props)
                this.handleClick = this.handleClick.bind(this)
            }
            handleClick() {
                index = 0
                this.forceUpdate()
            }
            render() {
                return index ?
                    <div ref='a' onClick={this.handleClick.bind(this)}>
                        <Component1>
                            <p ref={detect}>这是子节点</p>
                            <Component2 />
                        </Component1>
                    </div> : <div>文本节点</div>

            }
        };

    window.onload = function(){
        s = ReactDOM.render( <App />, document.getElementById('example'))
    }
    </script>
</head>

<body>

    <div>这个默认会被清掉</div>
    <div id='example'></div>


</body>

</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width"</span>&gt;</span>

   <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'text/javascript'</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./dist/React.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./test/babel.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'text/babel'</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> s
   <span class="hljs-keyword">var</span> str = <span class="hljs-string">''</span>
        <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Component1</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
            componentWillUnmount() {
                str += <span class="hljs-string">'xxxx'</span>
            }
            render() {
                <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"component1"</span>&gt;</span>{this.props.children}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
            }
        }
        <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Component2</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
            componentWillUnmount() {
                str += <span class="hljs-string">' yyyy'</span>
            }
            render() {
                <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"component1"</span>&gt;</span>xxx<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
            }
        }
        <span class="hljs-keyword">var</span> index = <span class="hljs-number">1</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">detect</span>(<span class="hljs-params">a</span>) </span>{
            <span class="hljs-keyword">if</span> (index === <span class="hljs-number">1</span>) {
               <span class="hljs-comment">// expect(typeof a).toBe('object')</span>
            } <span class="hljs-keyword">else</span> {
               <span class="hljs-comment">// expect(a).toBeNull()</span>
            }
        }
        <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
            <span class="hljs-keyword">constructor</span>(props) {
                <span class="hljs-keyword">super</span>(props)
                <span class="hljs-keyword">this</span>.handleClick = <span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>)
            }
            handleClick() {
                index = <span class="hljs-number">0</span>
                <span class="hljs-keyword">this</span>.forceUpdate()
            }
            render() {
                <span class="hljs-keyword">return</span> index ?
                    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">'a'</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClick.bind(this)}</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">Component1</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{detect}</span>&gt;</span>这是子节点<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">Component2</span> /&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">Component1</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span> : <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>文本节点<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

            }
        };

    <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        s = ReactDOM.render( <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>, document.getElementById('example'))
    }
    </span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>这个默认会被清掉<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'example'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>


<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>脚手架： <a href="https://github.com/Levan-Du/anu-cli" rel="nofollow noreferrer" target="_blank">https://github.com/Levan-Du/a...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
高性能迷你React框架anu发布

## 原文链接
[https://segmentfault.com/a/1190000009659319](https://segmentfault.com/a/1190000009659319)

