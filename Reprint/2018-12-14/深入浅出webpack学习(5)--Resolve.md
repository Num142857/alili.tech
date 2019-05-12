---
title: '深入浅出webpack学习(5)--Resolve' 
date: 2018-12-14 2:30:11
hidden: true
slug: i9sr4xmqvml
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">Resolve</h3>
<p>webpack在启动后会从配置的入口模块触发找出所有依赖的模块，<strong>Resolve配置webpack如何寻找模块对应的文件。</strong>webpack内置JavaScript模块化语法解析功能，默认会采用模块化标准里约定好的规则去寻找，但你可以根据自己的需要修改默认的规则。</p>
<h4>1. alias</h4>
<p><strong>resolve.alias</strong>配置项通过别名来把原来导入路径映射成一个新的导入路径。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack alias配置
resolve: {
    alias: {
        componets: './src/components/'
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">//webpack alias配置</span>
<span class="hljs-attribute">resolve</span>: {
    <span class="hljs-attribute">alias</span>: {
        <span class="hljs-attribute">componets</span>: <span class="hljs-string">'./src/components/'</span>
    }
}</code></pre>
<p>当你通过<strong>import Button from 'components/button'</strong>导入时，实际上被<strong>alias</strong>等价替换成<strong>import Button from './src/components/button'</strong>。</p>
<p>以上alias配置的含义是把导入语句里的components关键字替换成./src/components。</p>
<p>这</p>
<p>样做可能会命中太多的导入语句， alias还支持$符号来缩小范围只命中以关键字结尾的导入语句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {
    alias: {
        'react$' : '/path/to/react.min.js'
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">resolve</span>: {
    <span class="hljs-attribute">alias</span>: {
        <span class="hljs-string">'react$'</span> : <span class="hljs-string">'/path/to/react.min.js'</span>
    }
}
</code></pre>
<p>这样<strong>react$</strong>只会命中以react结尾的导入语句，即只会把<strong>import react</strong>关键字替换成<strong>import '/path/to/react.min.js'</strong></p>
<h4>2. mainFields</h4>
<p>有一些第三方模块会针对不同环境提供几份代码。例如分别提供采用ES5 和 ES6的2份代码，这2份代码的位置写在package.json文件里：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;jsnext: main&quot;: &quot;es/index.js&quot;, //采用ES6语法的代码入口文件
    &quot;main&quot;: &quot;lib/index.js&quot;//采用ES5语法的代码入口文件
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>{
    <span class="hljs-string">"jsnext: main"</span>: <span class="hljs-string">"es/index.js"</span>, <span class="hljs-comment">//采用ES6语法的代码入口文件</span>
    <span class="hljs-string">"main"</span>: <span class="hljs-string">"lib/index.js"</span><span class="hljs-comment">//采用ES5语法的代码入口文件</span>
}</code></pre>
<p>webpack会根据<strong>mainFields</strong>的配置去决定有限采用哪份代码， <strong>mainFields</strong>默认如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mainFields: ['browser', 'main']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">mainFields:</span> [<span class="hljs-string">'browser'</span>, <span class="hljs-string">'main'</span>]</code></pre>
<p>webpack会按照数组里的顺序去package.json文件里面找，只会使用找到的第一个。</p>
<p>假如我们想要ES6的那份代码，可以这样进行配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mainFields: ['jsnext:main', 'browser', 'main']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">mainFields:</span> [<span class="hljs-string">'jsnext:main'</span>, <span class="hljs-string">'browser'</span>, <span class="hljs-string">'main'</span>]</code></pre>
<h4>3. extensions</h4>
<p>在导入语句没带文件后缀时，webpack会自动带上后缀去尝试访问文件是否存在。<strong>resolve.extensions</strong>用于配置在尝试过程中用到的后缀列表，默认是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="extensions:['.js', '.json']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">extensions:</span>[<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.json'</span>]</code></pre>
<p>也就是说当遇到<strong>require('./data')</strong>这样的导入语句时，webpack会先去寻找<strong>./data.js</strong>文件，如果找不到则去找<strong>./data.json</strong>文件，如果还是找不到则会报错。</p>
<h4>4. modules</h4>
<p><strong>resolve.modules</strong>配置webpack去哪些目录下寻找第三方模块。默认是去<strong>node_modules</strong>目录下寻找。有时你的项目中会有一些模块大量被其他模块依赖和导入，由于其他模块的位置分布不定，针对不同的文件都要去计算被导入模块文件的相对路径，这个路径有时候会很长，例如：<strong>import './../../components/button'</strong>，这时你可以利用modules配置项优化，假如那些大量导入的模块都在<strong>./src/components</strong>目录下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="modules:['./src/components', 'node_modules']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">modules:</span>[<span class="hljs-string">'./src/components'</span>, <span class="hljs-string">'node_modules'</span>]</code></pre>
<h4>5. descriptionFiles</h4>
<p><strong>resolve.descriptionFiles</strong>配置描述第三方模块的文件名称，也就是package.json文件。默认如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="descriptionFiles: ['package.json']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">descriptionFiles:</span> [<span class="hljs-string">'package.json'</span>]</code></pre>
<h4>6. enforceExtension</h4>
<p><strong>resolve.enforceExtension</strong>如果配置为true，所有导入语句都必须带文件后缀。</p>
<h4>7. enforceModuleExtension</h4>
<p>enforceModuleExtension 和 enforceExtension 作用类似，但 enforceModuleExtension 只对 node_modules 下的模块生效。 enforceModuleExtension 通常搭配 enforceExtension 使用，在 enforceExtension:true 时，因为安装的第三方模块中大多数导入语句没带文件后缀， 所以这时通过配置 enforceModuleExtension:false 来兼容第三方模块。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入浅出webpack学习(5)--Resolve

## 原文链接
[https://segmentfault.com/a/1190000013176083](https://segmentfault.com/a/1190000013176083)

