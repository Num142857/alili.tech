---
title: '高性能迷你React框架 anu1.2.1 发布' 
date: 2018-12-20 2:30:10
hidden: true
slug: 5wxozvmgv66
categories: [reprint]
---

{{< raw >}}

                    
<p>anu1.2.1这次更新主要是改善了对焦点的处理及react16.2的Fragment语法糖的支持</p>
<ol>
<li>优化fiberizeChildren的性能，将原方法内部用到函数与对象提到全局上来，这就比官方的对象池技术更能提升性能。</li>
<li>修复受控组件在textarea, radio的BUG，将受控事件放到用户事件后集中执行</li>
<li>添加焦点系统的支持</li>
<li>解决多次引入React时，事件系统的option.async有问题的BUG</li>
<li>简化createPortal的实现</li>
<li>添加对React16.2的Fragment语法糖的支持（这需要babel7.beta32+才行）</li>
<li>对antd3的支持情况，还差dropdown与mention组件</li>
</ol>
<p><strong>Fragment例子</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>

<head>
    <meta charset=&quot;utf-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width&quot;>
    <script type='text/javascript' src=&quot;./dist/React.js&quot;></script>
    <script src=&quot;https://unpkg.com/@babel/standalone/babel.js&quot;></script>
</head>

<body>

    <h1>测试</h1>
    <h1 id='app-root' className=&quot;root&quot;>

    </h1>
    <script type='text/babel'>
            var check = function () {
                return null;
            };
            check.isRequired = check;
            var PropTypes = React.PropTypes || {
                string: check
            }
            if(!window.ReactDOM){
              window.ReactDOM = React
            }
            var container = document.getElementById(&quot;app-root&quot;)
  
            function Example() {
                return (
                <>
                    Some text.
                    <h2>A heading</h2>
                    More text.
                    <h2>Another heading</h2>
                    Even more text.
                </>
                );
            }
            ReactDOM.render(<Example />, container);

 
          </script>

</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'text/javascript'</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./dist/React.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/@babel/standalone/babel.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>测试<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'app-root'</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"root"</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'text/babel'</span>&gt;</span><span class="javascript">
            <span class="hljs-keyword">var</span> check = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
            };
            check.isRequired = check;
            <span class="hljs-keyword">var</span> PropTypes = React.PropTypes || {
                <span class="hljs-attr">string</span>: check
            }
            <span class="hljs-keyword">if</span>(!<span class="hljs-built_in">window</span>.ReactDOM){
              <span class="hljs-built_in">window</span>.ReactDOM = React
            }
            <span class="hljs-keyword">var</span> container = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"app-root"</span>)
  
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Example</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> (
                <span class="xml"><span class="hljs-tag">&lt;&gt;</span>
                    Some text.
                    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>A heading<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
                    More text.
                    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Another heading<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
                    Even more text.
                <span class="hljs-tag">&lt;/&gt;</span>
                );
            }
            ReactDOM.render(<span class="hljs-tag">&lt;<span class="hljs-name">Example</span> /&gt;</span>, container);

 
          </span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i anujs" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> anujs</code></pre>
<p>或者使用架手架 <a href="https://github.com/Levan-Du/anu-cli" rel="nofollow noreferrer" target="_blank">https://github.com/Levan-Du/a...</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -g anu-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> -g anu-cli</code></pre>
<p>webpack.config中如何代替原来用React编写的项目</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {
   alias: {
      'react': 'anujs',
      'react-dom': 'anujs',
        // 若要兼容 IE 请使用以下配置
        // 'react': 'anujs/dist/ReactIE',
        // 'react-dom': 'anujs/dist/ReactIE',
    
        // 如果引用了 prop-types 或 create-react-class
        // 需要添加如下别名
        'prop-types': 'anujs/lib/ReactPropTypes',
        'create-react-class': 'anujs/lib/createClass'
        //如果你在移动端用到了onTouchTap事件
        'react-tap-event-plugin': 'anujs/lib/injectTapEventPlugin',  
   }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dsconfig"><code><span class="hljs-string">resolve:</span> {
   <span class="hljs-string">alias:</span> {
      <span class="hljs-string">'react'</span>: <span class="hljs-string">'anujs'</span>,
      <span class="hljs-string">'react-dom'</span>: <span class="hljs-string">'anujs'</span>,
        // 若要兼容 <span class="hljs-string">IE </span>请使用以下配置
        // <span class="hljs-string">'react'</span>: <span class="hljs-string">'anujs/dist/ReactIE'</span>,
        // <span class="hljs-string">'react-dom'</span>: <span class="hljs-string">'anujs/dist/ReactIE'</span>,
    
        // 如果引用了 <span class="hljs-string">prop-types </span>或 <span class="hljs-built_in">create-react-class</span>
        // 需要添加如下别名
        <span class="hljs-string">'prop-types'</span>: <span class="hljs-string">'anujs/lib/ReactPropTypes'</span>,
        <span class="hljs-string">'create-react-class'</span>: <span class="hljs-string">'anujs/lib/createClass'</span>
        //如果你在移动端用到了<span class="hljs-string">onTouchTap事</span>件
        <span class="hljs-string">'react-tap-event-plugin'</span>: <span class="hljs-string">'anujs/lib/injectTapEventPlugin'</span>,  
   }
},</code></pre>
<p>欢迎大家为anujs加星星与试用！！！</p>
<p><a href="https://github.com/RubyLouvre/anu" rel="nofollow noreferrer" target="_blank">https://github.com/RubyLouvre...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
高性能迷你React框架 anu1.2.1 发布

## 原文链接
[https://segmentfault.com/a/1190000012607716](https://segmentfault.com/a/1190000012607716)

