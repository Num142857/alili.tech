---
title: 'wepy - 一个小程序的组件化开发框架' 
date: 2019-01-31 2:31:16
hidden: true
slug: nblhbm9ux1a
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">小程序框架wepy文档</h1>
<p><a href="https://github.com/wepyjs/wepy" rel="nofollow noreferrer" target="_blank">Github地址</a></p>
<h2 id="articleHeader1">快速入门</h2>
<h3 id="articleHeader2">项目创建与使用</h3>
<h4>安装wepy</h4>
<p>以下安装都通过<code>npm</code>安装</p>
<p>安装 wepy 命令行工具。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install wepy-cli -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install wepy-cli -g</code></pre>
<p>在开发目录生成开发DEMO。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="wepy new myproject" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">wepy new myproject</code></pre>
<p>开发实时编译。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="wepy build --watch" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">wepy build --watch</code></pre>
<h4>项目目录结构</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    dist
    node_modules
    src
        components
            com_a.wpy
            com_b.wpy
        pages
            index.wpy
            page2.wpy
        app.wpy
    package.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    dist
    node_modules
    src
        components
            com_a<span class="hljs-selector-class">.wpy</span>
            com_b<span class="hljs-selector-class">.wpy</span>
        pages
            index<span class="hljs-selector-class">.wpy</span>
            page2<span class="hljs-selector-class">.wpy</span>
        app<span class="hljs-selector-class">.wpy</span>
    package.json</code></pre>
<h4>开发使用说明</h4>
<ol>
<li><p>使用<code>微信开发者工具</code>新建项目，本地开发选择<code>dist</code>目录。</p></li>
<li><p><code>微信开发者工具</code> --&gt; 项目 --&gt; 关闭ES6转ES5。</p></li>
<li><p>本地项目根目录运行<code>wepy build --watch</code>，开启实时编译。</p></li>
</ol>
<h3 id="articleHeader3">代码规范：</h3>
<ol>
<li><p>变量与方法使用尽量使用驼峰式命名，避免使用<code>$</code>开头。<br>以<code>$</code>开头的方法或者属性为框架内建方法或者属性，可以被使用，使用前请[参考API文档]()。</p></li>
<li><p>入口，页面，组件的命名后缀为<code>.wpy</code>。外链的文件可以是其它后缀。<br>请参考<a>wpy文件说明</a></p></li>
<li><p>使用ES6语法开发。<br>框架在ES6下开发，因此也需要使用ES6开发小程序，ES6中有大量的语法糖可以让我们的代码更加简洁高效。</p></li>
<li><p>使用Promise<br>框架默认对小程序提供的API全都进行了 Promise 处理，甚至可以直接使用<code>async/await</code>等新特性进行开发。</p></li>
</ol>
<h2 id="articleHeader4">主要解决问题：</h2>
<h3 id="articleHeader5">1. 开发模式转换</h3>
<p>在原有的小程序的开发模式下进行再次封装，更贴近于现有MVVM框架开发模式。框架在开发过程中参考了一些现在框架的一些特性，并且融入其中，以下是使用wepy前后的代码对比图。</p>
<p>官方DEMO代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    console.log('button clicked')
  },
  onLoad: function () {
    console.log('onLoad')
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//index.js</span>
<span class="hljs-comment">//获取应用实例</span>
<span class="hljs-keyword">var</span> app = getApp()
Page({
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">motto</span>: <span class="hljs-string">'Hello World'</span>,
    <span class="hljs-attr">userInfo</span>: {}
  },
  <span class="hljs-comment">//事件处理函数</span>
  bindViewTap: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'button clicked'</span>)
  },
  <span class="hljs-attr">onLoad</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'onLoad'</span>)
  }
})</code></pre>
<p>基于wepy的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import wepy from 'wepy';

export default class Index extends wepy.page {

    data = {
        motto: 'Hello World',
        userInfo: {}
    };
    methods = {
        bindViewTap () {
            console.log('button clicked');
        }
    };
    onLoad() {
        console.log('onLoad');
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> wepy <span class="hljs-keyword">from</span> <span class="hljs-string">'wepy'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Index</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">wepy</span>.<span class="hljs-title">page</span> </span>{

    data = {
        <span class="hljs-attr">motto</span>: <span class="hljs-string">'Hello World'</span>,
        <span class="hljs-attr">userInfo</span>: {}
    };
    methods = {
        bindViewTap () {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'button clicked'</span>);
        }
    };
    onLoad() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'onLoad'</span>);
    };
}</code></pre>
<h3 id="articleHeader6">2. 支持组件化开发。</h3>
<p>参见章节：<a>组件</a><br>示例代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.wpy
<template>
    <view>
        <component id=&quot;pannel&quot; path=&quot;pannel&quot;></component>
        <component id=&quot;counter1&quot; path=&quot;counter&quot;></component>
        <component id=&quot;counter2&quot; path=&quot;counter&quot;></component>
        <component id=&quot;list&quot; path=&quot;list&quot;></component>
    </view>
</template>
<script>
import wepy from 'wepy';
import List from '../components/list';
import Panel from '../components/panel';
import Counter from '../components/counter';

export default class Index extends wepy.page {

    config = {
        &quot;navigationBarTitleText&quot;: &quot;test&quot;
    };
    components = {
        panel: Panel,
        counter1: Counter,
        counter2: Counter,
        list: List
    };
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">// index.wpy
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">view</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"pannel"</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"pannel"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"counter1"</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"counter"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"counter2"</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"counter"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"list"</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"list"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> wepy <span class="hljs-keyword">from</span> <span class="hljs-string">'wepy'</span>;
<span class="hljs-keyword">import</span> List <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/list'</span>;
<span class="hljs-keyword">import</span> Panel <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/panel'</span>;
<span class="hljs-keyword">import</span> Counter <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/counter'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Index</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">wepy</span>.<span class="hljs-title">page</span> </span>{

    config = {
        <span class="hljs-string">"navigationBarTitleText"</span>: <span class="hljs-string">"test"</span>
    };
    components = {
        <span class="hljs-attr">panel</span>: Panel,
        <span class="hljs-attr">counter1</span>: Counter,
        <span class="hljs-attr">counter2</span>: Counter,
        <span class="hljs-attr">list</span>: List
    };
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader7">3. 支持加载外部NPM包。</h3>
<p>在编译过程当中，会递归遍历代码中的<code>require</code>然后将对应依赖文件从node_modules当中拷贝出来，并且修改<code>require</code>为相对路径，从而实现对外部NPM包的支持。如下图：</p>
<p><span class="img-wrap"><img data-src="https://cloud.githubusercontent.com/assets/2182004/20554645/482b0f64-b198-11e6-8d4e-70c92326004f.png" src="https://static.alili.techhttps://cloud.githubusercontent.com/assets/2182004/20554645/482b0f64-b198-11e6-8d4e-70c92326004f.png" alt="npm" title="npm" style="cursor: pointer;"></span></p>
<h3 id="articleHeader8">4. 单文件模式，使得目录结构更加清晰。</h3>
<p><a href="https://mp.weixin.qq.com/debug/wxadoc/dev/framework/structure.html?t=20161107" rel="nofollow noreferrer" target="_blank">官方目录结构</a>要求app必须有三个文件<code>app.json</code>，<code>app.js</code>，<code>app.wxss</code>，页面有4个文件 <code>index.json</code>，<code>index.js</code>，<code>index.wxml</code>，<code>index.wxss</code>。而且文件必须同名。<br>所以使用wepy开发前后开发目录对比如下：<br>官方DEMO：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="project
    pages
        index
            index.json
            index.js
            index.wxml
            index.wxss
        log
            log.json
            log.wxml
            log.js
            log.wxss
    app.js
    app.json
    app.wxss" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>project
    pages
        index
            index<span class="hljs-selector-class">.json</span>
            index<span class="hljs-selector-class">.js</span>
            index<span class="hljs-selector-class">.wxml</span>
            index<span class="hljs-selector-class">.wxss</span>
        log
            log<span class="hljs-selector-class">.json</span>
            log<span class="hljs-selector-class">.wxml</span>
            log<span class="hljs-selector-class">.js</span>
            log<span class="hljs-selector-class">.wxss</span>
    app<span class="hljs-selector-class">.js</span>
    app<span class="hljs-selector-class">.json</span>
    app.wxss</code></pre>
<p>使用wepy框架后目录结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="project
    src
        pages
            index.wpy
            log.wpy
        app.wpy" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>project
    src
        pages
            index<span class="hljs-selector-class">.wpy</span>
            log<span class="hljs-selector-class">.wpy</span>
        app.wpy</code></pre>
<h3 id="articleHeader9">5. 默认使用babel编译，支持ES6/7的一些新特性。</h3>
<p>用户可以通过修改<code>.wepyrc</code>配置文件，配置自己熟悉的babel环境进行开发。默认开启使用了一些新的特性如<code>promise</code>，<code>async/await</code>等等。</p>
<p>示例代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import wepy from 'wepy';

export default class Index extends wepy.page {

    getData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({data: 123});
            }, 3000);
        });
    };
    async onLoad() {
        let data = await this.getData();
        console.log(data.data);
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> wepy <span class="hljs-keyword">from</span> <span class="hljs-string">'wepy'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Index</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">wepy</span>.<span class="hljs-title">page</span> </span>{

    getData() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
            setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                resolve({<span class="hljs-attr">data</span>: <span class="hljs-number">123</span>});
            }, <span class="hljs-number">3000</span>);
        });
    };
    <span class="hljs-keyword">async</span> onLoad() {
        <span class="hljs-keyword">let</span> data = <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.getData();
        <span class="hljs-built_in">console</span>.log(data.data);
    };
}</code></pre>
<h3 id="articleHeader10">6. 针对原生API进行优化。</h3>
<p>对现在API进行promise处理，同时修复一些现有API的缺陷，比如：wx.request并发问题等。<br>原有代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onLoad = function () {
    var self = this;
    wx.login({
        success: function (data) {
            wx.getUserInfo({
                success: function (userinfo) {
                    self.setData({userInfo: userinfo});
                }
            });
        }
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">onLoad = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
    wx.login({
        <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
            wx.getUserInfo({
                <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">userinfo</span>) </span>{
                    self.setData({<span class="hljs-attr">userInfo</span>: userinfo});
                }
            });
        }
    });
}</code></pre>
<p>基于wepy实现代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async onLoad() {
    await wx.login();
    this.userInfo = await wx.getUserInfo();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> onLoad() {
    <span class="hljs-keyword">await</span> wx.login();
    <span class="hljs-keyword">this</span>.userInfo = <span class="hljs-keyword">await</span> wx.getUserInfo();
}</code></pre>
<p>在同时并发10个request请求测试时：<br>不使用wepy:</p>
<p><span class="img-wrap"><img data-src="https://cloud.githubusercontent.com/assets/2182004/20554651/5185f740-b198-11e6-88f8-45e359090dc3.png" src="https://static.alili.techhttps://cloud.githubusercontent.com/assets/2182004/20554651/5185f740-b198-11e6-88f8-45e359090dc3.png" alt="2 small" title="2 small" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="https://cloud.githubusercontent.com/assets/2182004/20554886/c30e802a-b199-11e6-927d-08cd4e5ed0b0.png" src="https://static.alili.techhttps://cloud.githubusercontent.com/assets/2182004/20554886/c30e802a-b199-11e6-927d-08cd4e5ed0b0.png" alt="3 small" title="3 small" style="cursor: pointer;"></span></p>
<p>使用wepy后：</p>
<p><span class="img-wrap"><img data-src="https://cloud.githubusercontent.com/assets/2182004/20554663/65704c2e-b198-11e6-8277-abb77e0c7b3e.png" src="https://static.alili.techhttps://cloud.githubusercontent.com/assets/2182004/20554663/65704c2e-b198-11e6-8277-abb77e0c7b3e.png" alt="4 small" title="4 small" style="cursor: pointer;"></span></p>
<h2 id="articleHeader11">进阶说明</h2>
<h3 id="articleHeader12">.wepyrc 配置文件说明</h3>
<p>执行<code>wepy new demo</code>后，会生成类似配置文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;wpyExt&quot;: &quot;.wpy&quot;,
  &quot;sass&quot;: {},
  &quot;less&quot;: {},
  &quot;babel&quot;: {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"wpyExt"</span>: <span class="hljs-string">".wpy"</span>,
  <span class="hljs-attr">"sass"</span>: {},
  <span class="hljs-attr">"less"</span>: {},
  <span class="hljs-attr">"babel"</span>: {}
}</code></pre>
<p><strong>wpyExt：</strong>缺省值为'.wpy'，IDE默认情况下不会对此文件类型高亮，此时可以修改所有文件为<code>.vue</code>后缀(因为与vue高亮规则一样)，然后将此选项修改为<code>.vue</code>，就能解决部分IDE代码高亮问题。</p>
<p><strong>sass：</strong>sass编译配置，参见<a href="https://github.com/sass/node-sass" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<p><strong>less：</strong>less编译配置，参见<a href="http://lesscss.org/#using-less-usage-in-code" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<p><strong>babel：</strong>babel编译配置，参见<a href="http://babeljs.io/docs/usage/options/" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<h3 id="articleHeader13">wpy文件说明</h3>
<p><code>wpy</code>文件的编译过程过下：</p>
<p><span class="img-wrap"><img data-src="https://cloud.githubusercontent.com/assets/2182004/20554671/70a797a0-b198-11e6-8355-b7c234713d0c.png" src="https://static.alili.techhttps://cloud.githubusercontent.com/assets/2182004/20554671/70a797a0-b198-11e6-8355-b7c234713d0c.png" alt="5 small" title="5 small" style="cursor: pointer;"></span></p>
<p>一个<code>.wpy</code>文件分为三个部分：</p>
<ol>
<li><p>样式<code>&lt;style&gt;&lt;/style&gt;</code>对应原有<code>wxss</code>。</p></li>
<li><p>模板<code>&lt;template&gt;&lt;/template&gt;</code>对应原有<code>wxml</code>。</p></li>
<li><p>代码<code>&lt;script&gt;&lt;/script&gt;</code>对应原有<code>js</code>。</p></li>
</ol>
<p>其中入口文件<code>app.wpy</code>不需要<code>template</code>，所以编译时会被忽略。这三个标签都支持<code>type</code>和<code>src</code>属性，<code>type</code>决定了其代码编译过程，<code>src</code>决定是否外联代码，存在<code>src</code>属性且有效时，忽略内联代码，示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;less&quot; src=&quot;page1.less&quot;></style>
<template type=&quot;wxml&quot; src=&quot;page1.wxml&quot;></template>
<script>
    // some code
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"less"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"page1.less"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"wxml"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"page1.wxml"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-comment">// some code</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>标签对应 <code>type</code> 值如下表所示：</p>
<table>
<thead><tr>
<th>标签</th>
<th>type默认值</th>
<th>type支持值</th>
</tr></thead>
<tbody>
<tr>
<td>style</td>
<td><code>css</code></td>
<td>
<code>css</code>，<code>less</code>，<code>sass（待完成）</code>
</td>
</tr>
<tr>
<td>template</td>
<td><code>wxml</code></td>
<td>
<code>wxml</code>，<code>xml</code>，<code>html（待完成）</code>
</td>
</tr>
<tr>
<td>script</td>
<td><code>js</code></td>
<td>
<code>js</code>，<code>TypeScript(待完成)</code>
</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader14">script说明</h3>
<h4>程序入口app.wpy</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;less&quot;>
/** less **/
</style>
<script>
import wepy from 'wepy';
export default class extends wepy.app {
    config = {
            &quot;pages&quot;:[
            &quot;pages/index/index&quot;
        ],
        &quot;window&quot;:{
            &quot;backgroundTextStyle&quot;: &quot;light&quot;,
            &quot;navigationBarBackgroundColor&quot;: &quot;#fff&quot;,
            &quot;navigationBarTitleText&quot;: &quot;WeChat&quot;,
            &quot;navigationBarTextStyle&quot;: &quot;black&quot;
        }
    };
    onLaunch() {
        console.log(this);
    }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"less"</span>&gt;</span><span class="css">
<span class="hljs-comment">/** less **/</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> wepy <span class="hljs-keyword">from</span> <span class="hljs-string">'wepy'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">wepy</span>.<span class="hljs-title">app</span> </span>{
    config = {
            <span class="hljs-string">"pages"</span>:[
            <span class="hljs-string">"pages/index/index"</span>
        ],
        <span class="hljs-string">"window"</span>:{
            <span class="hljs-string">"backgroundTextStyle"</span>: <span class="hljs-string">"light"</span>,
            <span class="hljs-string">"navigationBarBackgroundColor"</span>: <span class="hljs-string">"#fff"</span>,
            <span class="hljs-string">"navigationBarTitleText"</span>: <span class="hljs-string">"WeChat"</span>,
            <span class="hljs-string">"navigationBarTextStyle"</span>: <span class="hljs-string">"black"</span>
        }
    };
    onLaunch() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>入口<code>app.wpy</code>继承自<code>wepy.app</code>，包含一个<code>config</code>属性和其全局属性、方法、事件。其中<code>config</code>属性对应原有的<code>app.json</code>，编译时会根据<code>config</code>生成<code>app.json</code>文件，如果需要修改<code>config</code>中的内容，请使用系统提供API。</p>
<h4>页面index.wpy</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;less&quot;>
/** less **/
</style>
<template type=&quot;wxml&quot;>
    <view>
    </view>
    <component id=&quot;counter1&quot; path=&quot;counter&quot;></component>
</template>
<script>
import wepy form 'wepy';
import Counter from '../components/counter';
export default class Index extends wepy.page {

    config = {};
    components = {counter1: Counter};

    data = {};
    methods = {};

    events = {};
    onLoad() {};
    // Other properties
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"less"</span>&gt;</span><span class="css">
<span class="hljs-comment">/** less **/</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"wxml"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">view</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"counter1"</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"counter"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> wepy form <span class="hljs-string">'wepy'</span>;
<span class="hljs-keyword">import</span> Counter <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/counter'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Index</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">wepy</span>.<span class="hljs-title">page</span> </span></span></span><span class="hljs-template-variable">{

    config = {}</span><span class="xml"><span class="undefined">;
    components = </span></span><span class="hljs-template-variable">{counter1: Counter}</span><span class="xml"><span class="undefined">;

    data = </span></span><span class="hljs-template-variable">{}</span><span class="xml"><span class="undefined">;
    methods = </span></span><span class="hljs-template-variable">{}</span><span class="xml"><span class="undefined">;

    events = </span></span><span class="hljs-template-variable">{}</span><span class="xml"><span class="undefined">;
    onLoad() </span></span><span class="hljs-template-variable">{}</span><span class="xml"><span class="actionscript">;
    <span class="hljs-comment">// Other properties</span>
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>页面入口继承自<code>wepy.page</code>，主要属性说明如下：</p>
<table>
<thead><tr>
<th>属性</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>config</td>
<td>页面config，相当于原来的index.json，同<code>app.wpy</code>中的config</td>
</tr>
<tr>
<td>components</td>
<td>页面引入的组件列表</td>
</tr>
<tr>
<td>data</td>
<td>页面需要渲染的数据</td>
</tr>
<tr>
<td>methods</td>
<td>wmxl的事件捕捉，如<code>bindtap</code>，<code>bindchange</code>
</td>
</tr>
<tr>
<td>events</td>
<td>组件之间通过<code>broadcast</code>，<code>emit</code>传递的事件</td>
</tr>
<tr>
<td>其它</td>
<td>如<code>onLoad</code>，<code>onReady</code>等小程序事件以及其它自定义方法与属性</td>
</tr>
</tbody>
</table>
<h4>组件com.wpy</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;less&quot;>
/** less **/
</style>
<template type=&quot;wxml&quot;>
    <view>  </view>
</template>
<script>
import wepy form 'wepy';
export default class Com extends wepy.component {

    components = {};

    data = {};
    methods = {};

    events = {};
    // Other properties
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"less"</span>&gt;</span><span class="css">
<span class="hljs-comment">/** less **/</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"wxml"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">view</span>&gt;</span>  <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> wepy form <span class="hljs-string">'wepy'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Com</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">wepy</span>.<span class="hljs-title">component</span> </span></span></span><span class="hljs-template-variable">{

    components = {}</span><span class="xml"><span class="undefined">;

    data = </span></span><span class="hljs-template-variable">{}</span><span class="xml"><span class="undefined">;
    methods = </span></span><span class="hljs-template-variable">{}</span><span class="xml"><span class="undefined">;

    events = </span></span><span class="hljs-template-variable">{}</span><span class="xml"><span class="actionscript">;
    <span class="hljs-comment">// Other properties</span>
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>页面入口继承自<code>wepy.component</code>，属性与页面属性一样，除了不需要<code>config</code>以及页面特有的一些小程序事件等等。</p>
<h3 id="articleHeader15">组件</h3>
<p>小程序支持js<a href="https://mp.weixin.qq.com/debug/wxadoc/dev/framework/app-service/module.html?t=20161107" rel="nofollow noreferrer" target="_blank">模块化</a>引用，也支持<a href="https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/template.html?t=20161107" rel="nofollow noreferrer" target="_blank">wxml模板</a>，但彼此独立，业务代码与交互事件仍需在页面处理。无法实现组件化的松耦合与复用的效果。<br>例如模板A中绑定一个<code>bindtap="myclick"</code>，模板B中同样绑定一样<code>bindtap="myclick"</code>，那么就会影响同一个页面事件。对于数据同样如此。因此只有通过改变变量或者事件方法，或者给其加不同前缀才能实现绑定不同事件或者不同数据。当页面复杂之后就十分不利于开发维护。<br>因此wepy让小程序支持组件化开发，组件的所有业务与功能在组件本身实现，组件与组件之间彼此隔离，上述例子在wepy的组件化开发过程中，A组件只会影响到A绑定的<code>myclick</code>，B也如此。</p>
<h4>组件引用</h4>
<p>当页面或者组件需要引入子组件时，需要在页面或者<code>script</code>中的<code>components</code>给组件分配唯一id，并且在<code>template</code>中添加<code>&lt;component&gt;</code>标签，如<a>index.wpy</a>。</p>
<p>页面和组件都可以引入子组件，引入若干组件后，如下图：</p>
<p><span class="img-wrap"><img data-src="https://cloud.githubusercontent.com/assets/2182004/20554681/796da1ae-b198-11e6-91ab-e90f485c594d.png" src="https://static.alili.techhttps://cloud.githubusercontent.com/assets/2182004/20554681/796da1ae-b198-11e6-91ab-e90f485c594d.png" alt="6 small" title="6 small" style="cursor: pointer; display: inline;"></span></p>
<p>Index页面引入A，B，C三个组件，同时组件A和B又有自己的子组件D，E，F，G，H。</p>
<h4>组件通信与交互</h4>
<p><code>wepy.component</code>基类提供三个方法<code>$broadcast</code>，<code>$emit</code>，<code>$invoke</code>，因此任一页面或任一组件都可以调用上述三种方法实现通信与交互，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$this.$emit('some-event', 1, 2, 3, 4);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">$this.$emit('some-event', <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>);</code></pre>
<p>组件的事件监听需要写在<code>events</code>属性下，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import wepy form 'wepy';
export default class Com extends wepy.component {

    components = {};

    data = {};
    methods = {};

    events = {
        'some-event': ($event, ...args) {
               console.log(`${this.name} receive ${$event.name} from ${$event.source.name}`);
        }
    };
    // Other properties
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> wepy form <span class="hljs-string">'wepy'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Com</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">wepy</span>.<span class="hljs-title">component</span> </span>{

    components = {};

    data = {};
    methods = {};

    events = {
        <span class="hljs-string">'some-event'</span>: ($event, ...args) {
               <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span> receive <span class="hljs-subst">${$event.name}</span> from <span class="hljs-subst">${$event.source.name}</span>`</span>);
        }
    };
    <span class="hljs-comment">// Other properties</span>
}</code></pre>
<ol><li><p><strong>$broadcast</strong><br><code>$broadcast</code>事件是由父组件发起，所有子组件都会收到此广播事件，除非事件被手动取消。事件广播的顺序为广度优先搜索顺序，如上图，如果<code>Page_Index</code>发起一个<code>$broadcast</code>事件，那么接收到事件的先后顺序为：A, B, C, D, E, F, G, H。如下图：</p></li></ol>
<p><span class="img-wrap"><img data-src="https://cloud.githubusercontent.com/assets/2182004/20554688/800089e6-b198-11e6-84c5-352d2d0e2f7e.png" src="https://static.alili.techhttps://cloud.githubusercontent.com/assets/2182004/20554688/800089e6-b198-11e6-84c5-352d2d0e2f7e.png" alt="7 small" title="7 small" style="cursor: pointer;"></span></p>
<ol><li><p><strong>$emit</strong><br><code>$emit</code>与<code>$broadcast</code>正好相反，事件发起组件的父组件会依次接收到<code>$emit</code>事件，如上图，如果E发起一个<code>$emit</code>事件，那么接收到事件的先后顺序为：A, Page_Index。如下图：</p></li></ol>
<p><span class="img-wrap"><img data-src="https://cloud.githubusercontent.com/assets/2182004/20554704/9997932c-b198-11e6-9840-3edae2194f47.png" src="https://static.alili.techhttps://cloud.githubusercontent.com/assets/2182004/20554704/9997932c-b198-11e6-9840-3edae2194f47.png" alt="8 small" title="8 small" style="cursor: pointer;"></span></p>
<ol><li><p><strong>$invoke</strong><br><code>$invoke</code>是一个组件对另一个组件的直接调用，通过传入的组件路径找到相应组件，然后再调用其方法。</p></li></ol>
<p>如果想在<code>Page_Index</code>中调用组件A的某个方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$invoke('ComA', 'someMethod', 'someArgs');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.$invoke(<span class="hljs-string">'ComA'</span>, <span class="hljs-string">'someMethod'</span>, <span class="hljs-string">'someArgs'</span>);</code></pre>
<p>如果想在组件A中调用组件G的某个方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$invoke('./../ComB/ComG', 'someMethod', 'someArgs');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.$invoke(<span class="hljs-string">'./../ComB/ComG'</span>, <span class="hljs-string">'someMethod'</span>, <span class="hljs-string">'someArgs'</span>);</code></pre>
<h3 id="articleHeader16">数据绑定</h3>
<h4>小程序数据绑定方式</h4>
<p>小程序通过<code>Page</code>提供的<code>setData</code>方法去绑定数据，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setData({title: 'this is title'});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.setData</span>({<span class="hljs-attribute">title</span>: <span class="hljs-string">'this is title'</span>});</code></pre>
<p>因为小程序架构本身原因，页面渲染层和JS逻辑层分开的，setData操作实际就是JS逻辑层与页面渲染层之间的通信，那么如果在同一次运行周期内多次执行<code>setData</code>操作时，那么通信的次数是一次还是多次呢？这个取决于API本身的设计。</p>
<h4>wepy数据绑定方式</h4>
<p>wepy使用脏数据检查对setData进行封装，在函数运行周期结束时执行脏数据检查，一来可以不用关心页面多次setData是否会有性能上的问题，二来可以更加简洁去修改数据实现绑定，不用重复去写setData方法。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.title = 'this is title';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.title = <span class="hljs-string">'this is title'</span>;</code></pre>
<p>但需注意，在函数运行周期之外的函数里去修改数据需要手动调用<code>$apply</code>方法。如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(() => {
    this.title = 'this is title';
    this.$apply();
}, 3000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.title = <span class="hljs-string">'this is title'</span>;
    <span class="hljs-keyword">this</span>.$apply();
}, <span class="hljs-number">3000</span>);</code></pre>
<h4>wepy脏数据检查流程</h4>
<p>在执行脏数据检查是，会通过<code>this.$$phase</code>标识当前检查状态，并且会保证在并发的流程当中，只会有一个脏数据检查流程在运行，以下是执行脏数据检查的流程图：</p>
<p><span class="img-wrap"><img data-src="https://cloud.githubusercontent.com/assets/2182004/20554709/a0d8b1e8-b198-11e6-9034-0997b33bdf95.png" src="https://static.alili.techhttps://cloud.githubusercontent.com/assets/2182004/20554709/a0d8b1e8-b198-11e6-9034-0997b33bdf95.png" alt="9 small" title="9 small" style="cursor: pointer;"></span></p>
<h3 id="articleHeader17">其它优化细节</h3>
<h4>1. wx.request 接收参数修改</h4>
<p>点这里查看<a href="https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-request.html?t=20161122" rel="nofollow noreferrer" target="_blank">官方文档</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 官方
wx.request({
    url: 'xxx',
    success: function (data) {
        console.log(data);
    }
});

// wepy 使用方式
// request 接口从只接收Object变为可接收String
wx.request('xxxx').then((d) => console.log(d));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 官方</span>
wx.request({
    <span class="hljs-attr">url</span>: <span class="hljs-string">'xxx'</span>,
    <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
        <span class="hljs-built_in">console</span>.log(data);
    }
});

<span class="hljs-comment">// wepy 使用方式</span>
<span class="hljs-comment">// request 接口从只接收Object变为可接收String</span>
wx.request(<span class="hljs-string">'xxxx'</span>).then(<span class="hljs-function">(<span class="hljs-params">d</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(d));</code></pre>
<h4>2. 优化事件参数传递</h4>
<p>点这里查看<a href="https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/event.html?t=20161122" rel="nofollow noreferrer" target="_blank">官方文档</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 官方
<view id=&quot;tapTest&quot; data-hi=&quot;WeChat&quot; bindtap=&quot;tapName&quot;> Click me! </view>
Page({
  tapName: function(event) {
    console.log(event.currentTarget.hi)// output: WeChat
  }
});

// wepy 建议传参方式
<view id=&quot;tapTest&quot; data-wepy-params=&quot;1-wepy-something&quot; bindtap=&quot;tapName&quot;> Click me! </view>

events: {
    tapName (event, id, title, other) {
        console.log(id, title, other)// output: 1, wepy, something
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 官方</span>
&lt;view id=<span class="hljs-string">"tapTest"</span> data-hi=<span class="hljs-string">"WeChat"</span> bindtap=<span class="hljs-string">"tapName"</span>&gt; Click me! <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span></span>
Page({
  <span class="hljs-attr">tapName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
    <span class="hljs-built_in">console</span>.log(event.currentTarget.hi)<span class="hljs-comment">// output: WeChat</span>
  }
});

<span class="hljs-comment">// wepy 建议传参方式</span>
&lt;view id=<span class="hljs-string">"tapTest"</span> data-wepy-params=<span class="hljs-string">"1-wepy-something"</span> bindtap=<span class="hljs-string">"tapName"</span>&gt; Click me! <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span></span>

events: {
    tapName (event, id, title, other) {
        <span class="hljs-built_in">console</span>.log(id, title, other)<span class="hljs-comment">// output: 1, wepy, something</span>
    }
}</code></pre>
<h4>3. 改变数据绑定方式</h4>
<p>保留setData方法，但不建议使用setData执行绑定，修复传入<code>undefined</code>的bug，并且修改入参支持：<br><code>this.setData(target, value)</code><br><code>this.setData(object)</code></p>
<p>点这里查看<a href="https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/template.html?t=20161122" rel="nofollow noreferrer" target="_blank">官方文档</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 官方
<view> "{{" message "}}" </view>

onLoad: function () {
    this.setData({message: 'hello world'});
}


// wepy
<view> "{{" message "}}" </view>

onLoad () {
    this.message = 'hello world';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs protobuf"><code><span class="hljs-comment">// 官方</span>
&lt;view&gt; "{{" <span class="hljs-class"><span class="hljs-keyword">message</span> "}}" &lt;/<span class="hljs-title">view</span>&gt;

onLoad: function () </span>{
    this.setData({<span class="hljs-class"><span class="hljs-keyword">message</span>: '<span class="hljs-title">hello</span> world'});
}


// wepy
&lt;view&gt; </span>"{{" <span class="hljs-class"><span class="hljs-keyword">message</span> "}}" &lt;/<span class="hljs-title">view</span>&gt;

onLoad () </span>{
    this.message = 'hello world';
}</code></pre>
<h4>4. 组件代替模板和模块</h4>
<p>点这里查看<a href="https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/data.html?t=20161122" rel="nofollow noreferrer" target="_blank">官方文档</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 官方
<!-- item.wxml -->
<template name=&quot;item&quot;>
  <text>"{{"text"}}"</text>
</template>

<!-- index.wxml -->
<import src=&quot;item.wxml&quot;/>
<template is=&quot;item&quot; data=&quot;"{{"text: 'forbar'"}}"&quot;/>

<!-- index.js -->
var item = require('item.js')




// wepy
<!-- /components/item.wpy -->
 <text>"{{"text"}}"</text>

<!-- index.wpy -->
<template>
    <component id=&quot;item&quot;></component>
</template>
<script>
    import wepy from 'wepy';
    import Item from '../components/item';
    export default class Index extends wepy.page {
        components = { Item }
    }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">// 官方
<span class="hljs-comment">&lt;!-- item.wxml --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"item"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">text</span>&gt;</span></span><span class="hljs-template-variable">"{{"text"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-comment">&lt;!-- index.wxml --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">import</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"item.wxml"</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">is</span>=<span class="hljs-string">"item"</span> <span class="hljs-attr">data</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"text: 'forbar'"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>/&gt;</span>

<span class="hljs-comment">&lt;!-- index.js --&gt;</span>
var item = require('item.js')




// wepy
<span class="hljs-comment">&lt;!-- /components/item.wpy --&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">text</span>&gt;</span></span><span class="hljs-template-variable">"{{"text"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>

<span class="hljs-comment">&lt;!-- index.wpy --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"item"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> wepy <span class="hljs-keyword">from</span> <span class="hljs-string">'wepy'</span>;
    <span class="hljs-keyword">import</span> Item <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/item'</span>;
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Index</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">wepy</span>.<span class="hljs-title">page</span> </span>{
        components = { Item }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<h2 id="articleHeader18">API</h2>
<h3 id="articleHeader19">wepy.event</h3>
<p>|父类 | 无 |<br>| ---- | ---- |</p>
<table>
<thead><tr>
<th>属性</th>
<th>类型</th>
<th>默认值</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>name</td>
<td>String</td>
<td>-</td>
<td>事件名称</td>
</tr>
<tr>
<td>source</td>
<td>wepy.component</td>
<td>-</td>
<td>事件来源</td>
</tr>
<tr>
<td>type</td>
<td>String</td>
<td>-</td>
<td>emit 或者 broadcast</td>
</tr>
</tbody>
</table>
<table>
<thead><tr>
<th>方法</th>
<th>参数</th>
<th>返回值</th>
<th>说明</th>
</tr></thead>
<tbody><tr>
<td>destroy</td>
<td>-</td>
<td>-</td>
<td>在 emit 或者 broadcast 过程中，调用destroy方法将会停止事件传播。</td>
</tr></tbody>
</table>
<h3 id="articleHeader20">wepy.component</h3>
<table><thead><tr>
<th>父类</th>
<th>无</th>
</tr></thead></table>
<table>
<thead><tr>
<th>属性</th>
<th>类型</th>
<th>默认值</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>isComponent</td>
<td>Boolean</td>
<td>true</td>
<td>是否是组件，如果是页面，此值为false</td>
</tr>
<tr>
<td>prefix</td>
<td>String</td>
<td>''</td>
<td>组件前缀，组件前缀+组件方法属性才是在小程序中真实存在的方法或属性。</td>
</tr>
<tr>
<td>$root</td>
<td>wepy.page</td>
<td>-</td>
<td>根组件，一般都是页面</td>
</tr>
<tr>
<td>$parent</td>
<td>wepy.component</td>
<td>-</td>
<td>父组件</td>
</tr>
<tr>
<td>$wxpage</td>
<td>Page</td>
<td>-</td>
<td>小程序Page对象</td>
</tr>
<tr>
<td>$coms</td>
<td>List(wepy.component)</td>
<td>{}</td>
<td>子组件列表</td>
</tr>
</tbody>
</table>
<table>
<thead><tr>
<th>方法</th>
<th>参数</th>
<th>返回值</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>init</td>
<td>-</td>
<td>-</td>
<td>组件初始化。</td>
</tr>
<tr>
<td>getWxPage</td>
<td>-</td>
<td>Page</td>
<td>返回小程序Page对象。</td>
</tr>
<tr>
<td>$getComponent</td>
<td>path(String)</td>
<td>wepy.component</td>
<td>通过组件路径返回组件对象。</td>
</tr>
<tr>
<td>$invoke</td>
<td>com(String/wepy.component), method(String), [args]</td>
<td>-</td>
<td>调用其它组件方法</td>
</tr>
<tr>
<td>$broadcast</td>
<td>evtName(String), [args]</td>
<td>-</td>
<td>broadcast事件。</td>
</tr>
<tr>
<td>$emit</td>
<td>evtName(String), [args]</td>
<td>-</td>
<td>emit事件。</td>
</tr>
<tr>
<td>$apply</td>
<td>fn(Function)</td>
<td>-</td>
<td>准备执行脏数据检查。</td>
</tr>
<tr>
<td>$digest</td>
<td>-</td>
<td>-</td>
<td>脏检查。</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader21">wepy.page</h3>
<table><thead><tr>
<th>父类</th>
<th>wepy.component</th>
</tr></thead></table>
<table><thead><tr>
<th>属性</th>
<th>类型</th>
<th>默认值</th>
<th>说明</th>
</tr></thead></table>
<table>
<thead><tr>
<th>方法</th>
<th>参数</th>
<th>返回值</th>
<th>说明</th>
</tr></thead>
<tbody><tr>
<td>init</td>
<td>-</td>
<td>-</td>
<td>页面始化。</td>
</tr></tbody>
</table>
<h3 id="articleHeader22">wepy.app</h3>
<table><thead><tr>
<th>父类</th>
<th>无</th>
</tr></thead></table>
<table>
<thead><tr>
<th>属性</th>
<th>类型</th>
<th>默认值</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>$wxapp</td>
<td>App</td>
<td>-</td>
<td>小程序getApp()</td>
</tr>
<tr>
<td>init</td>
<td>-</td>
<td>-</td>
<td>应用始化包括对原生API的改造与优化</td>
</tr>
</tbody>
</table>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
wepy - 一个小程序的组件化开发框架

## 原文链接
[https://segmentfault.com/a/1190000007580866](https://segmentfault.com/a/1190000007580866)

