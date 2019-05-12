---
title: 'webpack 配置中的路径' 
date: 2018-12-24 2:30:07
hidden: true
slug: m7q7g7aihj
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">resolve.alias</h1>
<p><code>resolve.alias</code> 用于给模块路径指定别名。</p>
<p>为什么要给模块路径取别名呢？</p>
<p>假设在我们的源码中有如下 <code>import</code> 语句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import BaseModel from '../../../../common/BaseModel';

export default class ProductModel extends BaseModel {

    // some code here
    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> BaseModel <span class="hljs-keyword">from</span> <span class="hljs-string">'../../../../common/BaseModel'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ProductModel</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">BaseModel</span> </span>{

    <span class="hljs-comment">// some code here</span>
    
}</code></pre>
<p>那么每次引入 <code>BaseModel</code> 的时候，很可能都会面临着写很长一堆 <code>../../../../</code> 的问题，而且如果没有编辑器的智能提示，很容易少写（或者多写）一层 <code>../</code> 。</p>
<p>此时就可以在 webpack 配置中为 <code>BaseModel</code> 指定一个别名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    // some other configs
    
    resolve: {
        alias: {
            common: require('path').resolve(__dirname, '../src/common')
        }
    }
    
    // some other configs
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-comment">// some other configs</span>
    
    resolve: {
        <span class="hljs-attr">alias</span>: {
            <span class="hljs-attr">common</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>).resolve(__dirname, <span class="hljs-string">'../src/common'</span>)
        }
    }
    
    <span class="hljs-comment">// some other configs</span>
}</code></pre>
<p>这样一来，引入 <code>BaseModel</code> 的代码就变成下面这样了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import BaseModel from 'common/BaseModel';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> BaseModel <span class="hljs-keyword">from</span> <span class="hljs-string">'common/BaseModel'</span>;</code></pre>
<p>另外一种场景，就是去掉路径中的无意义的一层（站在使用者角度来说无意义）。比如安装了 <code>vue</code> 模块之后，如果不做任何配置，引入 <code>vue</code> 的代码看起来是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue/dist/vue.esm.js';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue/dist/vue.esm.js'</span>;</code></pre>
<p>看起来多多少少会觉得别扭，而且还不好调整成不同的版本（开发时用 <code>vue.esm.js</code> ，发布的时候用 <code>vue.runtime.js</code> ）。</p>
<p>此时在 webpack 中加上不同环境的别名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    // some other configs
    
    resolve: {
        alias: {
            vue$: process.env.NODE_ENV === 'production'
                ? 'vue/dist/vue.runtime.js' : 'vue/dist/vue.esm.js'
        }
    }
    
    // some other configs
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-comment">// some other configs</span>
    
    resolve: {
        <span class="hljs-attr">alias</span>: {
            <span class="hljs-attr">vue$</span>: process.env.NODE_ENV === <span class="hljs-string">'production'</span>
                ? <span class="hljs-string">'vue/dist/vue.runtime.js'</span> : <span class="hljs-string">'vue/dist/vue.esm.js'</span>
        }
    }
    
    <span class="hljs-comment">// some other configs</span>
}</code></pre>
<p>看起来就优雅很多了。</p>
<p>那么 <code>alias</code> 的原理是怎么样的呢？</p>
<p><strong>配置了 <code>alias</code> 之后，在 webpack 解析引入（通过 import 或者 require ）的模块的时候，会先将源码中的模块路径中匹配 alias 里 key 的部分替换成 value 部分，再做查找。</strong></p>
<p>比如源码中有如下引入语句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Test1 from 'xyz/file';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> Test1 <span class="hljs-keyword">from</span> <span class="hljs-string">'xyz/file'</span>;</code></pre>
<p><code>alias</code> 中有如下配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    // some other configs
    
    resolve: {
        alias: {
            xyz: './dir'
        }
    }
    
    // some other configs
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-comment">// some other configs</span>
    
    resolve: {
        <span class="hljs-attr">alias</span>: {
            <span class="hljs-attr">xyz</span>: <span class="hljs-string">'./dir'</span>
        }
    }
    
    <span class="hljs-comment">// some other configs</span>
}</code></pre>
<p>在解析路径的时候，会先将 <code>xyz</code> 替换成 <code>./dir</code> ，那么之前的 <code>import</code> 语句就相当于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Test1 from './dir/file.js';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> Test1 <span class="hljs-keyword">from</span> <span class="hljs-string">'./dir/file.js'</span>;</code></pre>
<p>然后 webpack 再基于 <code>./dir/file.js</code> 去查找需要引入的模块。</p>
<p>当然，也可以配置绝对路径：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    // some other configs
    
    resolve: {
        alias: {
            xyz: require('path').resolve(__dirname, '../dir')
        }
    }
    
    // some other configs
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-comment">// some other configs</span>
    
    resolve: {
        <span class="hljs-attr">alias</span>: {
            <span class="hljs-attr">xyz</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>).resolve(__dirname, <span class="hljs-string">'../dir'</span>)
        }
    }
    
    <span class="hljs-comment">// some other configs</span>
}</code></pre>
<p>依然按照之前<strong>先替换后解析</strong>的流程执行。</p>
<p>另外，<code>alias</code> 还有一种特殊的语法：key 的末尾带一个 $ 字符，表示精确匹配。</p>
<p>假设有下面 <code>alias</code> 配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    // some other configs
    
    resolve: {
        alias: {
            xyz$: 'xyz/dir'
        }
    }
    
    // some other configs
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-comment">// some other configs</span>
    
    resolve: {
        <span class="hljs-attr">alias</span>: {
            <span class="hljs-attr">xyz$</span>: <span class="hljs-string">'xyz/dir'</span>
        }
    }
    
    <span class="hljs-comment">// some other configs</span>
}</code></pre>
<p>对于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'xyz/file.js';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> <span class="hljs-string">'xyz/file.js'</span>;</code></pre>
<p>这种 <code>import</code> 语句，就无法匹配上这条 <code>alias</code> 规则。</p>
<p>而：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'xyz';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> <span class="hljs-string">'xyz'</span>;</code></pre>
<p>才能匹配上。</p>
<p>更多 <code>alias</code> 的匹配示例，参考<a href="https://webpack.js.org/configuration/resolve/#resolve-alias" rel="nofollow noreferrer" target="_blank">官网文档</a>。</p>
<h1 id="articleHeader1">resolveLoader.modules</h1>
<p>可以通过 <code>resolveLoader.modules</code> 配置在哪些目录下查找 <code>loader</code> ，默认是在 <code>node_modules</code> 目录下查找。</p>
<p>那么问题就来了，这个默认的 <code>node_modules</code> 指的是哪里的 <code>node_modules</code> 目录呢？换句话说，这里的 <code>node_modules</code> 目录对应的绝对路径是怎么构造的？</p>
<p><strong>webpack 会以当前进程目录（ <code>process.cwd()</code> ）开始，逐层往上查找 <code>node_modules</code> 目录，如果查到根目录，还没找到，就抛出错误。这与 Node 查找 <code>node_modules</code> 目录的行为是一致的，只不过 Node 是从当前模块所在目录开始查找的。</strong></p>
<p><strong>对于其他的相对目录配置，查找逻辑与默认的 <code>node_modules</code> 一样</strong></p>
<p><strong>对于绝对路径，就直接找这个路径对应的目录了。</strong></p>
<blockquote><p>权威说明，可参考<a href="https://webpack.js.org/configuration/resolve/#resolve-modules" rel="nofollow noreferrer" target="_blank">官网文档</a>。</p></blockquote>
<p>找到 <code>resolveLoader.modules</code> 的具体目录之后，就按照配置的顺序去查找 <code>loader</code> 了。</p>
<p>假设有如下配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    // some other configs
    
    resolveLoader: {
        modules: ['loaders1', 'loaders2']
    }
    
    // some other configs
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-comment">// some other configs</span>
    
    resolveLoader: {
        <span class="hljs-attr">modules</span>: [<span class="hljs-string">'loaders1'</span>, <span class="hljs-string">'loaders2'</span>]
    }
    
    <span class="hljs-comment">// some other configs</span>
}</code></pre>
<p>如果当前进程目录是 <code>/a/b/c</code> ，现在要查找 <code>babel-loader</code> ，就会按照如下顺序查找：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/a/b/c/loaders1/babel-loader/...
/a/b/c/loaders2/babel-loader/...

/a/b/loaders1/babel-loader/...
/a/b/loaders2/babel-loader/...

/a/loaders1/babel-loader/...
/a/loaders2/babel-loader/...

/loaders1/babel-loader/...
/loaders2/babel-loader/..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-meta-keyword">/a/</span>b<span class="hljs-meta-keyword">/c/</span>loaders1<span class="hljs-meta-keyword">/babel-loader/</span>...
<span class="hljs-meta-keyword">/a/</span>b<span class="hljs-meta-keyword">/c/</span>loaders2<span class="hljs-meta-keyword">/babel-loader/</span>...

<span class="hljs-meta-keyword">/a/</span>b<span class="hljs-meta-keyword">/loaders1/</span>babel-loader/...
<span class="hljs-meta-keyword">/a/</span>b<span class="hljs-meta-keyword">/loaders2/</span>babel-loader/...

<span class="hljs-meta-keyword">/a/</span>loaders1<span class="hljs-meta-keyword">/babel-loader/</span>...
<span class="hljs-meta-keyword">/a/</span>loaders2<span class="hljs-meta-keyword">/babel-loader/</span>...

<span class="hljs-meta-keyword">/loaders1/</span>babel-loader/...
<span class="hljs-meta-keyword">/loaders2/</span>babel-loader/...</code></pre>
<blockquote><p>注：上述示例省略号后面的内容根据其他配置确定，具体参看<a href="https://webpack.js.org/concepts/module-resolution/#module-paths" rel="nofollow noreferrer" target="_blank">官网文档</a>，此处不赘述。</p></blockquote>
<h1 id="articleHeader2">Rule.include 、 Rule.exclude 等路径配置</h1>
<p><code>Rule</code> 中的 <code>test</code> 、 <code>include</code> 、 <code>exclude</code> 的值都是 <code>Condition</code> 实例。</p>
<p><code>Condition</code> 实例可以使下面的某一种值：</p>
<ul>
<li>一个字符串：输入值必须以该字符串开始。</li>
<li>一个正则表达式。</li>
<li>一个由 <code>Condition</code> 实例组成的数组。</li>
<li>一个对象：必须匹配所有属性，每一个属性的行为都是预先定义好的（属性 key 只能是 <code>and</code> 、 <code>or</code> 或者 <code>not</code> ）。</li>
</ul>
<p>对于 <code>Rule.test</code> ，值只能是一个正则表达式或者一个正则表达式数组。</p>
<p>对于 <code>Rule.include</code> ，值只能是一个字符串或者一个字符串数组。</p>
<p><code>Rule.exclude</code> 的值和 <code>Rule.include</code> 一样。</p>
<blockquote><p>更详细的描述，参考<a href="https://webpack.js.org/configuration/module/#condition" rel="nofollow noreferrer" target="_blank">官网文档</a>。</p></blockquote>
<p>所以，<code>Rule.include</code> 和 <code>Rule.exclude</code> 配置都会使用绝对路径。</p>
<h1 id="articleHeader3">entry</h1>
<p>entry 中配置的相对路径，是相对于 <code>process.cwd()</code> 去查找的。</p>
<h1 id="articleHeader4">output.path</h1>
<p>必须配置成一个绝对路径。</p>
<h1 id="articleHeader5">babelrc 中的 <code>plugins</code> 和 <code>presets</code> 路径</h1>
<p><strong>babelrc 中 <code>plugins</code> 和 <code>presets</code> 配置的相对路径是相对于待转换文件解析的。</strong></p>
<p>比如在转换 <code>/a/b/c/d.js</code> 模块的时候，查找 <code>babel-plugin-veui</code> 的顺序是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/a/b/c/node_modules/babel-plugin-veui/...
/a/b/node_modules/babel-plugin-veui/...
/a/node_modules/babel-plugin-veui/...
/node_modules/babel-plugin-veui/..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-meta-keyword">/a/</span>b<span class="hljs-meta-keyword">/c/</span>node_modules<span class="hljs-meta-keyword">/babel-plugin-veui/</span>...
<span class="hljs-meta-keyword">/a/</span>b/node_modules<span class="hljs-meta-keyword">/babel-plugin-veui/</span>...
<span class="hljs-meta-keyword">/a/</span>node_modules<span class="hljs-meta-keyword">/babel-plugin-veui/</span>...
/node_modules<span class="hljs-meta-keyword">/babel-plugin-veui/</span>...</code></pre>
<p><code>presets</code> 的解析逻辑与 <code>plugins</code> 一致。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack 配置中的路径

## 原文链接
[https://segmentfault.com/a/1190000012219806](https://segmentfault.com/a/1190000012219806)

