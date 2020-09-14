---
title: '基于react-native & antd-mobile进行三端开发' 
date: 2019-01-07 2:30:11
hidden: true
slug: yi984a8maep
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>要做移动端应用，同时要适配ios、android和微信。搜索、试验、思考...几天内进行了好几轮，最终决定采用react-native &amp; antd-mobile来实现我们的目的。</p></blockquote>
<h2 id="articleHeader0">思路&amp;选择</h2>
<p>在网上搜索，看到了多种方案。第一种，利用redux，共享业务逻辑，自己维护两套UI组件；第二种，利用react-native-web，先写移动端，再将移动端转换成H5；第三种：利用styled-components来封装UI组件，也要维护两套UI；第四种：利用antd-mobile来适配三端。<br>最终决定选择antd-mobile方式，因为其本身就是一套很好的解决方案，文档较全，实现方式简单，虽然是两套代码，但现有组件已经很多，也容易扩展。我已经修复了一个小bug，自行发布到了npm，并替换到项目中，这样能够快速方便的实现自己想要的组件。</p>
<h2 id="articleHeader1">代码编写原则</h2>
<p>所有的界面元素都使用antd-mobile的组件来实现，不够用的，不符合要求的，直接改动antd-mobile。</p>
<h2 id="articleHeader2">关键步骤</h2>
<h3 id="articleHeader3">webpack2配置</h3>
<blockquote><p>antd-mobile要支持H5，在要webpack中进行配置，打包web版的代码。</p></blockquote>
<p>import antd-mobile</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="           {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader:'babel-loader',
                    options:{
                        presets: ['es2015', &quot;stage-2&quot;, 'react'],
                        plugins: [ [&quot;transform-runtime&quot;],[&quot;import&quot;, {libraryName: &quot;antdm&quot;, style: true}]
                        ],
                    }
                }],
            }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>           {
                test: <span class="hljs-regexp">/\.(js|jsx)$/</span>,
                <span class="hljs-keyword">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
                use: [{
                    loader:<span class="hljs-string">'babel-loader'</span>,
                    <span class="hljs-keyword">options</span>:{
                        presets: [<span class="hljs-string">'es2015'</span>, <span class="hljs-string">"stage-2"</span>, <span class="hljs-string">'react'</span>],
                        plugins: [ [<span class="hljs-string">"transform-runtime"</span>],[<span class="hljs-string">"import"</span>, {libraryName: <span class="hljs-string">"antdm"</span>, style: <span class="hljs-keyword">true</span>}]
                        ],
                    }
                }],
            },</code></pre>
<p>resolve web.*</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {
        mainFiles: [&quot;index.web&quot;,&quot;index&quot;],// 这里哦
        modules: ['app', 'node_modules', path.join(__dirname, '../node_modules')],
        extensions: [
            '.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx',
            '.js',
            '.jsx',
            '.react.js',
        ],
        mainFields: [
            'browser',
            'jsnext:main',
            'main',
        ],
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">resolve</span>: {
        <span class="hljs-attribute">mainFiles</span>: [<span class="hljs-string">"index.web"</span>,<span class="hljs-string">"index"</span>],// 这里哦
        modules: [<span class="hljs-string">'app'</span>, <span class="hljs-string">'node_modules'</span>, path.<span class="hljs-built_in">join</span>(__dirname, <span class="hljs-string">'../node_modules'</span>)],
        extensions: [
            <span class="hljs-string">'.web.tsx'</span>, <span class="hljs-string">'.web.ts'</span>, <span class="hljs-string">'.web.jsx'</span>, <span class="hljs-string">'.web.js'</span>, <span class="hljs-string">'.ts'</span>, <span class="hljs-string">'.tsx'</span>,
            <span class="hljs-string">'.js'</span>,
            <span class="hljs-string">'.jsx'</span>,
            <span class="hljs-string">'.react.js'</span>,
        ],
        mainFields: [
            <span class="hljs-string">'browser'</span>,
            <span class="hljs-string">'jsnext:main'</span>,
            <span class="hljs-string">'main'</span>,
        ],
    },</code></pre>
<h3 id="articleHeader4">布局组件</h3>
<blockquote><p>antd-mobile文档中只提了复杂的组件，但我们在H5中经常用的div与native中的View应该如何处理呢？看文档、搜索，都没有找到我想要的方法；在github中看别人家的代码，发现都是直接用了div或native的View，不能同时适配三端。以至于我一度想引入styled-components来封装，但总觉得引入styled-components只用来处理几个基本元素，不划算。最后是想起来要看看antd-mobile的源码，在antd-mobile中来做引入styled-components做的事，不就可以了吗！结果发现antd-mobile已经有封装了，就是View。</p></blockquote>
<p>问题基本解决了，但运行时会有如下的警告信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Warning: Unknown prop `Component` on <div> tag. Remove this prop from the element. For details, see https://fb.me/react-unknown-prop
    in div (created by View)
    in View (at Root.js:15)
    in Provider (at Root.js:14)
    in Root (at index.js:20)
    in AppContainer (at index.js:19)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>Warning: Unknown prop `Component` on &lt;div&gt; tag. Remove this prop from the element. For <span class="hljs-selector-tag">details</span>, see https:<span class="hljs-comment">//fb.me/react-unknown-prop</span>
    <span class="hljs-keyword">in</span> <span class="hljs-selector-tag">div</span> (created by View)
    <span class="hljs-keyword">in</span> View (at Root<span class="hljs-selector-class">.js</span>:<span class="hljs-number">15</span>)
    <span class="hljs-keyword">in</span> Provider (at Root<span class="hljs-selector-class">.js</span>:<span class="hljs-number">14</span>)
    <span class="hljs-keyword">in</span> Root (at index<span class="hljs-selector-class">.js</span>:<span class="hljs-number">20</span>)
    <span class="hljs-keyword">in</span> AppContainer (at index<span class="hljs-selector-class">.js</span>:<span class="hljs-number">19</span>)</code></pre>
<p>看源代码，是有个小bug，顺手修改了，编译，运行，问题解决。提交pull requests，人家不可能很快的更新，而且可能有的改动只是为了适应我们自己的项目，因此发布到npm中，名字叫antdm。</p>
<h3 id="articleHeader5">程序入口</h3>
<blockquote><p>入口文件会有三个，原则是尽量保持简单</p></blockquote>
<p>ios:index.ios.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Root from  './src/containers/Root';
import configureStore from './src/store/configureStore.js';
const store = configureStore();
class T3 extends Component {
    render() {
        return (
            <Root store={store}/>
        );
    }
}

AppRegistry.registerComponent('t3', () => T3);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> {
    AppRegistry,
    StyleSheet,
    Text,
    View
} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-native'</span>;
<span class="hljs-keyword">import</span> Root <span class="hljs-keyword">from</span>  <span class="hljs-string">'./src/containers/Root'</span>;
<span class="hljs-keyword">import</span> configureStore <span class="hljs-keyword">from</span> <span class="hljs-string">'./src/store/configureStore.js'</span>;
const store = configureStore();
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">T3</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> {</span>
    render() {
        <span class="hljs-keyword">return</span> (
            &lt;Root store={store}/&gt;
        );
    }
}

AppRegistry.registerComponent(<span class="hljs-string">'t3'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> T3);</code></pre>
<p>web:/src/web/index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React          from 'react';
import { render }     from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root           from '../containers/Root';
import configureStore from '../store/configureStore';
const store = configureStore();
render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  document.getElementById('root')
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React          <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { render }     <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> { AppContainer } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-hot-loader'</span>;
<span class="hljs-keyword">import</span> Root           <span class="hljs-keyword">from</span> <span class="hljs-string">'../containers/Root'</span>;
<span class="hljs-keyword">import</span> configureStore <span class="hljs-keyword">from</span> <span class="hljs-string">'../store/configureStore'</span>;
<span class="hljs-keyword">const</span> store = configureStore();
render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">AppContainer</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Root</span> <span class="hljs-attr">store</span>=<span class="hljs-string">{store}</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">AppContainer</span>&gt;</span>,
  document.getElementById('root')
)</span></code></pre>
<p>android:index.android.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="还未编写，应该与ios差不多。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">还未编写，应该与ios差不多。</code></pre>
<h2 id="articleHeader6">项目地址</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://git.oschina.net/zhoutk/t3.git
https://github.com/zhoutk/t3.git" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>https:<span class="hljs-regexp">//gi</span>t.oschina.net<span class="hljs-regexp">/zhoutk/</span>t3.git
https:<span class="hljs-regexp">//gi</span>thub.com<span class="hljs-regexp">/zhoutk/</span>t3.git</code></pre>
<h2 id="articleHeader7">使用方法</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://git.oschina.net/zhoutk/t3.git
or git clone https://github.com/zhoutk/t3.git
cd t3
npm i
ios: npm run ios
web: npm run web" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://git.oschina.net/zhoutk/t3.git
<span class="hljs-keyword">or</span> git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/zhoutk/t3.git
cd t3
npm i
ios: npm run ios
web: npm run web</code></pre>
<h2 id="articleHeader8">小结</h2>
<p>利用react-native和antd-mobie基本达到移动端适配三端的要求，但在做项目的同时，可能需要基于antd-mobile逐步建立起一套适合自己的UI组件。谢谢阿里的兄弟们！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于react-native & antd-mobile进行三端开发

## 原文链接
[https://segmentfault.com/a/1190000010313569](https://segmentfault.com/a/1190000010313569)

