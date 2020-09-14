---
title: 'weex踩坑之旅第一弹 ~ 搭建具有入口文件的weex脚手架' 
date: 2018-12-20 2:30:10
hidden: true
slug: v1fder003jr
categories: [reprint]
---

{{< raw >}}

                    
<p>写在前面的话：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="注意！该文档是2017年年底的文章，那个时候weex还有很多问题，现在weex已经全面更新，文档也比较全。下面的讲解可能不太适应新的weex框架，后面我会再立贴讲解。谢谢各位关注。

weex官方文档不完善，在整个实施过程中遇到过很多坑，中途几次想放弃，总是有些不甘心。攻坚克难，总也是会有一些收获，先将收获进行分享也或是记录，防止忘记。要想用好weex必须对es5/es6基础，vue体系，打包工具webpack有较深的了解；对ios，android有了解。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>注意！该文档是<span class="hljs-number">2017</span>年年底的文章，那个时候weex还有很多问题，现在weex已经全面更新，文档也比较全。下面的讲解可能不太适应新的weex框架，后面我会再立贴讲解。谢谢各位关注。

weex官方文档不完善，在整个实施过程中遇到过很多坑，中途几次想放弃，总是有些不甘心。攻坚克难，总也是会有一些收获，先将收获进行分享也或是记录，防止忘记。要想用好weex必须对es5/es6基础，vue体系，打包工具webpack有较深的了解；对ios，android有了解。</code></pre>
<p>官方提供的weex脚手架不能指定入口文件，如果我们想要在项目中使用vuex,vue-router，没有入口文件将会变得比较复杂。那么该如何搭建具有入口文件的脚手架呢？首先，我们先把官方提供的脚手架使用一下，然后再其基础上进行修改</p>
<p>一. 初始化weex项目</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ weex init helloweex" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>weex init helloweex</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV0WiY?w=1774&amp;h=274" src="https://static.alili.tech/img/bV0WiY?w=1774&amp;h=274" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br> 二. 安装依赖包</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cd helloweex
$ npm install
或者可以使用淘宝镜像安装
$ cnpm install

**注意！如果使用npm安装依赖，建议先手动创建node_modules目录再进行安装，避免后期出现权限不足的问题**
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$ </span>cd helloweex
<span class="hljs-variable">$ </span>npm install
或者可以使用淘宝镜像安装
<span class="hljs-variable">$ </span>cnpm install

**注意！如果使用npm安装依赖，建议先手动创建node_modules目录再进行安装，避免后期出现权限不足的问题**
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV0Wjb?w=1790&amp;h=230" src="https://static.alili.tech/img/bV0Wjb?w=1790&amp;h=230" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br> 三. 在浏览器中进行测试</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="注意！在浏览器中显示成功并不意味着在本地就可以显示成功！因为这是两个不同的执行环境。
$ npm run serve
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>注意！在浏览器中显示成功并不意味着在本地就可以显示成功！因为这是两个不同的执行环境。
$ npm <span class="hljs-keyword">run</span><span class="bash"> serve
</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV0Wjh?w=1780&amp;h=624" src="https://static.alili.tech/img/bV0Wjh?w=1780&amp;h=624" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br> 四. 此时会遇到第一个坑</p>
<p><span class="img-wrap"><img data-src="/img/bV0Wjq?w=1786&amp;h=330" src="https://static.alili.tech/img/bV0Wjq?w=1786&amp;h=330" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="原因：" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">原因：</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV0WjE?w=2198&amp;h=882" src="https://static.alili.tech/img/bV0WjE?w=2198&amp;h=882" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://www.npmjs.com/package/uglifyjs-webpack-plugin
   
解决方案：
1）安装 uglifyjs-webpack-plugin
    $ cnpm i -D uglifyjs-webpack-plugin
2) 应用
    const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
    module.exports = {
      plugins: [
        new UglifyJsPlugin()
      ]
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code>https:<span class="hljs-comment">//www.npmjs.com/package/uglifyjs-webpack-plugin</span>
   
解决方案：
<span class="hljs-number">1</span>）安装 uglifyjs-webpack-plugin
    $ cnpm i -D uglifyjs-webpack-plugin
<span class="hljs-number">2</span>) 应用
    <span class="hljs-keyword">const</span> UglifyJsPlugin = require(<span class="hljs-string">'uglifyjs-webpack-plugin'</span>)
    <span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
      plugins: [
        <span class="hljs-keyword">new</span> UglifyJsPlugin()
      ]
    }</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV0Wj2?w=1916&amp;h=690" src="https://static.alili.tech/img/bV0Wj2?w=1916&amp;h=690" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="3) 重新部署，不再报错！
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">3</span>) 重新部署，不再报错！
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV0Wlv?w=1566&amp;h=926" src="https://static.alili.tech/img/bV0Wlv?w=1566&amp;h=926" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>五. 模拟器上运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="如果之前步骤可以完成，只能说明当前代码在浏览器上可以执行，能不能本地运行还需要再进行测试。要想本地测试必须安装模拟器（ios或android），本文章不提供具体的安装过程，如有需要，请自行查看其它文章。
本章以ios环境为例进行测试
依次执行如下命令
1) 安装ios平台
    $ weex platform add ios        " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>如果之前步骤可以完成，只能说明当前代码在浏览器上可以执行，能不能本地运行还需要再进行测试。要想本地测试必须安装模拟器（ios或<span class="hljs-keyword">android），本文章不提供具体的安装过程，如有需要，请自行查看其它文章。
</span>本章以ios环境为例进行测试
依次执行如下命令
<span class="hljs-number">1</span>) 安装ios平台
    $ weex platform <span class="hljs-keyword">add </span>ios        </code></pre>
<p><span class="img-wrap"><img data-src="/img/bV0WkO?w=1784&amp;h=244" src="https://static.alili.tech/img/bV0WkO?w=1784&amp;h=244" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2) 安装依赖
    $ cd platforms/ios
    $ pod install
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-number">2</span>) 安装依赖
    <span class="hljs-variable">$ </span>cd platforms/ios
    <span class="hljs-variable">$ </span>pod install
    </code></pre>
<p><span class="img-wrap"><img data-src="/img/bV0Wk1?w=1780&amp;h=1112" src="https://static.alili.tech/img/bV0Wk1?w=1780&amp;h=1112" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="3) 运行
    $ cd ../..
    $ weex run ios (次过程较慢，需等待一会)
4) 选择运行环境后启动模拟器" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code><span class="hljs-number">3</span>) 运行
    $ cd ../..
    $ weex <span class="hljs-keyword">run</span><span class="bash"> ios (次过程较慢，需等待一会)
</span><span class="hljs-number">4</span>) 选择运行环境后启动模拟器</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV0WlY?w=1780&amp;h=1112" src="https://static.alili.tech/img/bV0WlY?w=1780&amp;h=1112" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV0WnX?w=780&amp;h=1518" src="https://static.alili.tech/img/bV0WnX?w=780&amp;h=1518" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>六. 编写代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="查看webpack.config.js得知会，该脚手架会根据src下vue文件产生一个对应的.js文件存放到demo目录下，但是传统的vue开发，我们都希望有个入口文件（main.js或者entry.js）,然后在该文件中导入其他模块，进行页面的总体配置等操作。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>查看<span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>得知会，该脚手架会根据<span class="hljs-selector-tag">src</span>下<span class="hljs-selector-tag">vue</span>文件产生一个对应的<span class="hljs-selector-class">.js</span>文件存放到<span class="hljs-selector-tag">demo</span>目录下，但是传统的<span class="hljs-selector-tag">vue</span>开发，我们都希望有个入口文件（<span class="hljs-selector-tag">main</span><span class="hljs-selector-class">.js</span>或者<span class="hljs-selector-tag">entry</span><span class="hljs-selector-class">.js</span>）,然后在该文件中导入其他模块，进行页面的总体配置等操作。
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV0Woi?w=1282&amp;h=802" src="https://static.alili.tech/img/bV0Woi?w=1282&amp;h=802" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>那么，我们应该如何使得当前项目具有入口文件呢？答案是只能修改webpack.config.js文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1）添加入口文件配置
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1</span>）添加入口文件配置
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV0WoQ?w=1884&amp;h=390" src="https://static.alili.tech/img/bV0WoQ?w=1884&amp;h=390" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2) 删除多余配置信息
删除getEntryFileContent函数
删除walk函数
删除walk() walk函数的调用
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">2</span>) 删除多余配置信息
删除<span class="hljs-selector-tag">getEntryFileContent</span>函数
删除<span class="hljs-selector-tag">walk</span>函数
删除<span class="hljs-selector-tag">walk</span>() <span class="hljs-selector-tag">walk</span>函数的调用
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV0Wpf?w=1876&amp;h=790" src="https://static.alili.tech/img/bV0Wpf?w=1876&amp;h=790" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="3) 在src目录下添加主vue,App.vue
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-number">3</span>) 在src目录下添加主vue,App<span class="hljs-selector-class">.vue</span>
    </code></pre>
<p><span class="img-wrap"><img data-src="/img/bV0Wqk?w=1186&amp;h=778" src="https://static.alili.tech/img/bV0Wqk?w=1186&amp;h=778" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="4) 在src目录下添加入口文件entry.js，并且删除temp目录

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-number">4</span>) 在src目录下添加入口文件<span class="hljs-keyword">entry</span>.js，并且删除temp目录

</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV0Wqv?w=1538&amp;h=464" src="https://static.alili.tech/img/bV0Wqv?w=1538&amp;h=464" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="5) 在浏览器中进行测试
    $ npm run serve
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code><span class="hljs-number">5</span>) 在浏览器中进行测试
    $ npm <span class="hljs-keyword">run</span><span class="bash"> serve
</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV0WqA?w=1222&amp;h=444" src="https://static.alili.tech/img/bV0WqA?w=1222&amp;h=444" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="6) 在ios模拟器上进行测试
    $ weex run ios
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code><span class="hljs-number">6</span>) 在ios模拟器上进行测试
    $ weex <span class="hljs-keyword">run</span><span class="bash"> ios
</span>    </code></pre>
<p><span class="img-wrap"><img data-src="/img/bV0Ww0?w=780&amp;h=1518" src="https://static.alili.tech/img/bV0Ww0?w=780&amp;h=1518" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    
7) 如果发现打包后的文件不叫index.js可以修改webpack.config.js
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    
7) 如果发现打包后的文件不叫<span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>可以修改<span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV0WtD?w=1370&amp;h=618" src="https://static.alili.tech/img/bV0WtD?w=1370&amp;h=618" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="8）解决页面无法覆盖整个屏幕的问题
需要在原生代码中进行简单的修改
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">8</span>）解决页面无法覆盖整个屏幕的问题
需要在原生代码中进行简单的修改
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV0Wxo?w=2024&amp;h=844" src="https://static.alili.tech/img/bV0Wxo?w=2024&amp;h=844" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV0Wxx?w=688&amp;h=1326" src="https://static.alili.tech/img/bV0Wxx?w=688&amp;h=1326" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
weex踩坑之旅第一弹 ~ 搭建具有入口文件的weex脚手架

## 原文链接
[https://segmentfault.com/a/1190000012579051](https://segmentfault.com/a/1190000012579051)

