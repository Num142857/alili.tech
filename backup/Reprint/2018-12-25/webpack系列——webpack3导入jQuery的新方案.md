---
title: 'webpack系列——webpack3导入jQuery的新方案' 
date: 2018-12-25 2:30:11
hidden: true
slug: 6rf481q50wr
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">本文的目的</h3>
<h4>拒绝全局导入jQuery！！</h4>
<h4>拒绝script导入jQuery！！</h4>
<h4>找到一种只在当前js组件中引入jQuery，并且使用webpack切割打包的方案！</h4>
<h3 id="articleHeader1">测试环境</h3>
<p>以下测试在webpack3.8.1，jQuery3.2.1，react16+中进行</p>
<h3 id="articleHeader2">思路分析</h3>
<p>如果说要我在react中全局引入jQuery，我是十分感动，然后拒绝的。</p>
<p>但是，有时候可能react的一些库不够牛逼，还需要用到jQuery的相关插件来辅助完成，这些插件又和jQuery形成了依赖，最终，和我一样，你也可能需要在react中导入jQuery。</p>
<p>这个时候webpack就派上用场了，你也别百度了，网上的方案我试过很多，说句不好听的，大部分都是乐色！</p>
<p>举个例子，很多博客说用下面这种方案，还有其他一堆乱七八糟的辅助方案。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    'window.$': 'jquery',
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> webpack.ProvidePlugin({
    <span class="hljs-attr">$</span>: <span class="hljs-string">'jquery'</span>,
    <span class="hljs-attr">jQuery</span>: <span class="hljs-string">'jquery'</span>,
    <span class="hljs-string">'window.jQuery'</span>: <span class="hljs-string">'jquery'</span>,
    <span class="hljs-string">'window.$'</span>: <span class="hljs-string">'jquery'</span>,
  });</code></pre>
<p>一开始的尝试，我以为是成功的，因为$可以打印出来了啊！但是，当我打印jQuery的时候，报错了!!</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jQuery is not defined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">jQuery is not defined</code></pre>
<p>接着，就是一个漫长的探索过程，我以为是CMD的锅、我以为是AMD的锅、我还以为是ES6的锅、甚至我坚定的认为是webpack的锅！！</p>
<h3 id="articleHeader3">最终答案</h3>
<p>最终我发现就是webpack的锅，幸好webpack提供了另外一种支持方案。</p>
<p>1、安装expose-loader</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save expose-loader" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save expose-loader</span></code></pre>
<p>2、在webpack.config中加入下面这段loader代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
   test: require.resolve('jquery'),
   use: [{
      loader: 'expose-loader',
      options: 'jQuery'
   },{
      loader: 'expose-loader',
      options: '$'
   }]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
   <span class="hljs-attribute">test</span>: require.<span class="hljs-built_in">resolve</span>(<span class="hljs-string">'jquery'</span>),
   use: [{
      loader: <span class="hljs-string">'expose-loader'</span>,
      options: <span class="hljs-string">'jQuery'</span>
   },{
      <span class="hljs-attribute">loader</span>: <span class="hljs-string">'expose-loader'</span>,
      options: <span class="hljs-string">'$'</span>
   }]
}</code></pre>
<p>3、下面该干嘛？放心，你什么都不用干了，接着很轻松的在你的react组件中导入jQuery</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'

require('jquery')
require('jQuery第三方插件')

class Components extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
         $(document).ready(function() {
            //做爱做的事情
        })
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>

<span class="hljs-built_in">require</span>(<span class="hljs-string">'jquery'</span>)
<span class="hljs-built_in">require</span>(<span class="hljs-string">'jQuery第三方插件'</span>)

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Components</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props)
    }
    componentDidMount() {
         $(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">//做爱做的事情</span>
        })
    }
}
</code></pre>
<p>4、这里可能还存在一个小坑，就是很多jQuery第三方插件的作者写的代码不规范，我就遇到了一些变量没有声明的情况，在那些老程序员眼里，js变量不声明表示全局变量，但在webpack眼里，你不声明就未定义了！如果你遇到jQuery插件未定义的报错，通常给这个变量加上var就行了！</p>
<p>5、最后，我自己写的组件本身已经融入了异步打包功能，所以当前包含jQuery的react组件不会污染其他react组件，不会导致其他组件的体积变大，也不会导致公共js的体积变化，前提是你也实现了react组件的异步加载功能。</p>
<p>6、<strong>关于webpack异步打包组件的方案，请看我的其他文章！</strong></p>
<h4>只要你使用了webpack，无论是react，还是vue开发者也同样适用这种方案</h4>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack系列——webpack3导入jQuery的新方案

## 原文链接
[https://segmentfault.com/a/1190000012112912](https://segmentfault.com/a/1190000012112912)

