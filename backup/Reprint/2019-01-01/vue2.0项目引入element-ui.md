---
title: 'vue2.0项目引入element-ui' 
date: 2019-01-01 2:30:07
hidden: true
slug: dmdcybix19t
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">从新建vue项目到引入组件Element</h3>
<h2 id="articleHeader1">一、新建项目</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.查看 node和npm是不是已经安装好命令：node -v  npm -v (没有安装的先安装环境);
2.npm install -g cnpm --registry=https://registry.npm.taobao.org  (安装国内的淘宝镜像文件，后面的安装npm可以全部改为cnpm)
3.安装 vue-cli   
    1、cnpm install -g vue
    2、cnpm install -g vue-cli 
4. 安装 webpack   cnpm install -g webpack 
5.cd  你的运行目录
6.新建vue项目      vue init webpack vuedemo
7.进入项目目录     cd vuedemo
8.安装依赖        cnpm install
9.运行项目        cnpm run dev
10.发布项目       cnpm run build
注：mac电脑需要在安装淘宝镜像前执行： sudo chown -R $USER /usr/local
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-number">1</span>.查看 <span class="hljs-keyword">node</span><span class="hljs-title">和npm</span>是不是已经安装好命令：<span class="hljs-keyword">node</span> <span class="hljs-title">-v</span>  npm -v (没有安装的先安装环境);
<span class="hljs-number">2</span>.npm install -g cnpm --<span class="hljs-attr">registry=</span>https://registry.npm.taobao.org  (安装国内的淘宝镜像文件，后面的安装npm可以全部改为cnpm)
<span class="hljs-number">3</span>.安装 vue-cli   
    <span class="hljs-number">1</span>、cnpm install -g vue
    <span class="hljs-number">2</span>、cnpm install -g vue-cli 
<span class="hljs-number">4</span>. 安装 webpack   cnpm install -g webpack 
<span class="hljs-number">5</span>.cd  你的运行目录
<span class="hljs-number">6</span>.新建vue项目      vue init webpack vuedemo
<span class="hljs-number">7</span>.进入项目目录     cd vuedemo
<span class="hljs-number">8</span>.安装依赖        cnpm install
<span class="hljs-number">9</span>.运行项目        cnpm run dev
<span class="hljs-number">10</span>.发布项目       cnpm run build
注：mac电脑需要在安装淘宝镜像前执行： sudo chown -R $<span class="hljs-keyword">USER</span> <span class="hljs-title">/usr</span>/local
</code></pre>
<h2 id="articleHeader2">二、使用element-ui前需安装修改的配置：</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 安装 loader 模块：
    cnpm install style-loader -D
    cnpm install css-loader -D
    cnpm install file-loader -D
2. 安装 Element-UI 模块
   cnpm install element-ui --save 
   
3. 修改 webpack.base.conf.js 的配置，位置：如下图：" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>1. 安装 loader 模块：
    cnpm <span class="hljs-keyword">install</span> <span class="hljs-keyword">style</span>-loader -D
    cnpm <span class="hljs-keyword">install</span> css-loader -D
    cnpm <span class="hljs-keyword">install</span> <span class="hljs-keyword">file</span>-loader -D
<span class="hljs-number">2.</span> 安装 <span class="hljs-keyword">Element</span>-UI 模块
   cnpm <span class="hljs-keyword">install</span> <span class="hljs-keyword">element</span>-ui <span class="hljs-comment">--save </span>
   
<span class="hljs-number">3.</span> 修改 webpack.base.conf.js 的配置，位置：如下图：</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVUpJH?w=1251&amp;h=889" src="https://static.alili.tech/img/bVUpJH?w=1251&amp;h=889" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h5>下面是需添加的代码：</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     {
        test: /\\\\\\\\.css$/,
        loader: &quot;style!css&quot;
    },
    {
        test: /\\\\\\\\.(eot|woff|woff2|ttf)([\\\\\\\\?]?.*)$/,
        loader: &quot;file&quot;
    }     
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs taggerscript"><code>     {
        test: /<span class="hljs-symbol">\\</span><span class="hljs-symbol">\\</span><span class="hljs-symbol">\\</span><span class="hljs-symbol">\\</span>.css$/,
        loader: "style!css"
    },
    {
        test: /<span class="hljs-symbol">\\</span><span class="hljs-symbol">\\</span><span class="hljs-symbol">\\</span><span class="hljs-symbol">\\</span>.(eot|woff|woff2|ttf)([<span class="hljs-symbol">\\</span><span class="hljs-symbol">\\</span><span class="hljs-symbol">\\</span><span class="hljs-symbol">\\</span>?]?.*)$/,
        loader: "file"
    }     
</code></pre>
<h2 id="articleHeader3">三、引入Element，前面已经全局安装了element-ui，只需要在Vue项目中引入即可</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 1、打开项目：src/main.js,添加下面三条
      import ElementUI from 'element-ui'
   import 'element-ui/lib/theme-chalk/index.css'
   Vue.use(ElementUI)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code> <span class="hljs-number">1</span>、打开项目：src/main.js,添加下面三条
      <span class="hljs-keyword">import</span> ElementUI <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui'</span>
   <span class="hljs-keyword">import</span> <span class="hljs-string">'element-ui/lib/theme-chalk/index.css'</span>
   Vue.use(ElementUI)</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVUpJV?w=487&amp;h=406" src="https://static.alili.tech/img/bVUpJV?w=487&amp;h=406" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">四、然后在.vue文件里就直接可以用了</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="例如：做一下修改,加入element-button按钮：
<template>
<div class=&quot;login&quot;>
    <form name = 'form' action=&quot;&quot;>
        <input id=&quot;username&quot; type=&quot;text&quot; placeholder=&quot;请输入手机号码或用户名&quot; />
        <input id='pwd' type=&quot;password&quot; placeholder=&quot;请输入密码&quot; />
        <button onclick=&quot;login()&quot;>登录</button>
    </form>
    <div class=&quot;account&quot;>
        <p class=&quot;forget&quot; style=&quot;float:right&quot;>忘记密码?</p>
        <div class=&quot;register&quot;>
            <span>还没有账号?</span>
            <a href=&quot;#&quot;>手机注册</a>
        </div>
    </div>
        <el-button>默认按钮</el-button>
        <el-button type=&quot;primary&quot;>主要按钮</el-button>
        <el-button type=&quot;text&quot;>文字按钮</el-button>
    </div>
</template>
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>例如：做一下修改,加入element-button按钮：
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"login"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">name</span> = <span class="hljs-string">'form'</span> <span class="hljs-attr">action</span>=<span class="hljs-string">""</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"username"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入手机号码或用户名"</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'pwd'</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入密码"</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"login()"</span>&gt;</span>登录<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"account"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"forget"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"float:right"</span>&gt;</span>忘记密码?<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"register"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>还没有账号?<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>手机注册<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span>&gt;</span>默认按钮<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span>&gt;</span>主要按钮<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>&gt;</span>文字按钮<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
 </code></pre>
<h2 id="articleHeader5">五、成功后的截图：</h2>
<p><span class="img-wrap"><img data-src="/img/bVUpLE?w=317&amp;h=568" src="https://static.alili.tech/img/bVUpLE?w=317&amp;h=568" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2.0项目引入element-ui

## 原文链接
[https://segmentfault.com/a/1190000011023102](https://segmentfault.com/a/1190000011023102)

