---
title: '在多个文件中import同一个文件，webpack会多次打包吗' 
date: 2019-01-25 2:30:23
hidden: true
slug: 7r0dtojyc9l
categories: [reprint]
---

{{< raw >}}

                    
<p>最近自己在练习写React,Vue的时候，会在不同的子组件中多次import同一个文件，例如：<code>import React from 'react'</code>、<code>import Vue from 'vue'</code>，引入的次数多了慢慢让我产生了疑惑，引入这么多次，webpack会多次打包吗？直觉告诉我webpack并不傻，不会愚蠢的打包多次使打包后的文件异常臃肿，如果不会的话为什么不会呢？怀着好奇心在谷歌搜索很久也没有找到让我信服的的答案，于是我自己做了个<a href="https://github.com/Zegendary/jrg-pro/tree/master/import-test" rel="nofollow noreferrer" target="_blank">实验（源码）</a>，来证明自己的猜想：</p>
<h3 id="articleHeader0">1.模拟react/vue环境</h3>
<p>第一步是安装相关webpack、babel等相关依赖以及建好目录<br>webpack设置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack.config.js
module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&amp;presets[]=react'
      },
    ]
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//webpack.config.js</span>
<span class="hljs-built_in">module</span>.exports = {
  entry: <span class="hljs-string">'./app.js'</span>,
  output: {
    filename: <span class="hljs-string">'bundle.js'</span>
  },
  <span class="hljs-keyword">module</span>: {
    loaders:[
      {
        test: <span class="hljs-regexp">/\.js[x]?$/</span>,
        exclude: <span class="hljs-regexp">/node_modules/</span>,
        loader: <span class="hljs-string">'babel-loader?presets[]=es2015&amp;presets[]=react'</span>
      },
    ]
  }
}</code></pre>
<p>package.json所需依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//package.json
{
  &quot;name&quot;: &quot;test&quot;,
  &quot;version&quot;: &quot;0.0.1&quot;,
  &quot;devDependencies&quot;: {
    &quot;webpack&quot;: &quot;^1.14.0&quot;
  },
  &quot;dependencies&quot;: {
    &quot;babel-core&quot;: &quot;^6.21.0&quot;,
    &quot;babel-loader&quot;: &quot;^6.2.10&quot;,
    &quot;babel-preset-es2015&quot;: &quot;^6.18.0&quot;,
    &quot;babel-preset-react&quot;: &quot;^6.16.0&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>//package.json
{
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"test"</span>,
  <span class="hljs-string">"version"</span>: <span class="hljs-string">"0.0.1"</span>,
  <span class="hljs-string">"devDependencies"</span>: {
    <span class="hljs-string">"webpack"</span>: <span class="hljs-string">"^1.14.0"</span>
  },
  <span class="hljs-string">"dependencies"</span>: {
    <span class="hljs-string">"babel-core"</span>: <span class="hljs-string">"^6.21.0"</span>,
    <span class="hljs-string">"babel-loader"</span>: <span class="hljs-string">"^6.2.10"</span>,
    <span class="hljs-string">"babel-preset-es2015"</span>: <span class="hljs-string">"^6.18.0"</span>,
    <span class="hljs-string">"babel-preset-react"</span>: <span class="hljs-string">"^6.16.0"</span>
  }
}</code></pre>
<p>其他用于测试的文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//demo.js--相当于vue
export default {
  test(argu) {
    console.log(argu)
  }
}

//test1.js --相当于某个组件

import demo from './demo'

export default {
  test1() {
    demo.test(1)
  }
}

//test2.js --相当于另一个组件
import demo from './demo'

export default {
  test1() {
    demo.test(2)
  }
}

//add.js --入口文件

import Test1 from './test1'
import Test2 from './test2'

Test1.test1()
Test2.test2()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//demo.js--相当于vue</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  test(argu) {
    <span class="hljs-built_in">console</span>.log(argu)
  }
}

<span class="hljs-comment">//test1.js --相当于某个组件</span>

<span class="hljs-keyword">import</span> demo <span class="hljs-keyword">from</span> <span class="hljs-string">'./demo'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  test1() {
    demo.test(<span class="hljs-number">1</span>)
  }
}

<span class="hljs-comment">//test2.js --相当于另一个组件</span>
<span class="hljs-keyword">import</span> demo <span class="hljs-keyword">from</span> <span class="hljs-string">'./demo'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  test1() {
    demo.test(<span class="hljs-number">2</span>)
  }
}

<span class="hljs-comment">//add.js --入口文件</span>

<span class="hljs-keyword">import</span> Test1 <span class="hljs-keyword">from</span> <span class="hljs-string">'./test1'</span>
<span class="hljs-keyword">import</span> Test2 <span class="hljs-keyword">from</span> <span class="hljs-string">'./test2'</span>

Test1.test1()
Test2.test2()</code></pre>
<p>我在<code> test1.js</code>,<code> test2.js</code>中都引入<code>demo.js</code>,并且exoprt 出依赖<code>demo.js</code>的方法，然后再在<code>app.js</code>中引入<code> test1.js</code>,<code> test2.js</code> webpack打包后打开<a href="https://github.com/Zegendary/jrg-pro/blob/master/import-test/bundle.js" rel="nofollow noreferrer" target="_blank">bundle.js</a>，找到demo部分。<span class="img-wrap"><img data-src="/img/remote/1460000008521433" src="https://static.alili.tech/img/remote/1460000008521433" alt="demo部分" title="demo部分" style="cursor: pointer; display: inline;"></span><br>我们发现在<code>bundle.js</code>中引入的文件都被分成了带有序号(num)的“代码片”，通过<code>__webpack_require__(num)</code>来引入对应的模块，而我们<strong>import</strong>两次用来测试的<code>demo.js</code>也只是被打包成了序号为<strong>2</strong>的代码块，由此我们可以推论出：</p>
<h2 id="articleHeader1">不同文件中多次import同一个文件，webpack并不会多次打包，只会在打包后的文件中会多次引用打包后的该文件对应的函数。</h2>
<p>问题终于搞清楚了，很舒服！！👻</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在多个文件中import同一个文件，webpack会多次打包吗

## 原文链接
[https://segmentfault.com/a/1190000008521430](https://segmentfault.com/a/1190000008521430)

