---
title: '手机端 React 项目构建' 
date: 2019-02-06 2:30:08
hidden: true
slug: fmqo5g9xsel
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">项目地址：<a href="https://github.com/minooo/React-Study" rel="nofollow noreferrer" target="_blank">React-Study</a>
</h1>
<blockquote><p><a href="https://github.com/facebook/react" rel="nofollow noreferrer" target="_blank">react.js</a> 是一个构建用户界面的javascript库，它因<strong>单向数据绑定</strong>和<strong>虚拟 DOM</strong> 两大特点在前端界大放异彩。  因为它解决了当下网页性能陷入的瓶颈————由于直接操作DOM导致页面性能损失很大，而虚拟DOM避免了直接操作DOM(Jquery 是一个典型的操作DOM的库，所以 React 开发中，我们尽量不要使用Jquery)。再加上   React 单向数据绑定的特点使得业务逻辑更加清晰可控。  另外，<code>react.js</code> 是大名鼎鼎的 Facebook 一手打造维护，目前其在 github 上已有超过5万的 Star 量。  同时，react 社区也异常活跃，各种基于 React 的非常优秀的库和框架层出不穷，进而推动了 react 的流行和壮大，围绕 React 为核心的生态圈已悄然成型。</p></blockquote>
<h2 id="articleHeader1">认识React生态圈</h2>
<p>用阮一峰老师的话说就是：<strong>React已不是一个库，也不是一个框架，而是一个庞大的体系。想要发挥它的威力，整个技术栈都要配合它改造。你要学习一整套解决方案，从后端到前端，都是全新的做法。</strong>时至今日，围绕以React为核心的技术栈也日益成型，它主要包含：</p>
<ul>
<li><p>React,</p></li>
<li><p>npm</p></li>
<li><p>js打包工具（如：webpack）</p></li>
<li><p>ES6</p></li>
<li><p>Routing</p></li>
<li><p>Redux</p></li>
</ul>
<p>你不需要把这些都学完才去使用 React. 只需要在你遇到问题需要解决的时候, 才进入相关的学习。</p>
<h2 id="articleHeader2">学习React生态圈</h2>
<p>学习React生态圈是一个综合应用React技术栈的过程，这也是最接近我们实际开发运用React的情境，为此，笔者特地根据以往React开发经验，精心制作了<a href="https://github.com/minooo/React-Study" rel="nofollow noreferrer" target="_blank">React-Study</a>系列React技术栈学习模板，以实际项目开发情境为目标，从最简单的hello,world开始，通过逐步升级配置，来学习React生态圈并最终应用到公司项目中。</p>
<p>React-Study 系列模板主要包含四部分</p>
<ul><li><p><a href="https://github.com/minooo/React-Study/tree/master/step-01" rel="nofollow noreferrer" target="_blank">step-01</a>（已完成）<br>这部分就是基础的hello,world模板，前面说了，这系列模板是以实际项目开发情境为目标而构建的，虽说是  hello,world的示例，但是它综合应用了 React+webpack+es2015+npm ，并且分为开发模式（开启了热替换和sourcemap）和产品模式（也就是打包，开启了代码压缩等优化）</p></li></ul>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/111568-d1e9d663d38b5cc9.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/111568-d1e9d663d38b5cc9.gif?imageMogr2/auto-orient/strip" alt="react-study-01.gif" title="react-study-01.gif" style="cursor: pointer; display: inline;"></span></p>
<ul><li><p><a href="https://github.com/minooo/React-Study/tree/master/step-02" rel="nofollow noreferrer" target="_blank">step-02</a>（已完成）<br>step-02 是在 step-01的基础上添加额外配置完成的，这一部分添加了 样式，字形，图片，等加载器配置。并初步展示了在项目实践中，React技术栈的一个合理的目录结构应该是怎样的。由于应用了CSSModules以及相关的辅助插件，CSS的语法更加便利简洁，这些在项目的组件样式中都有体现。同时，也展示了在ES6下，React组件相关写法，以及标准语法的规范的推荐。总之，React带你走进组件化的美好时代。</p></li></ul>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/111568-68466d3184358594.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/111568-68466d3184358594.gif?imageMogr2/auto-orient/strip" alt="step-02-demo (2).gif" title="step-02-demo (2).gif" style="cursor: pointer;"></span></p>
<ul><li><p><a href="https://github.com/minooo/React-Study/tree/master/step-03" rel="nofollow noreferrer" target="_blank">step-03</a>（已完成）<br>step-03 是在 step-02 的基础上开发的  step-03 主要围绕添加 react-router 进行配置，以及在react移动端开发中，强烈推荐使用<a href="http://mobile.ant.design/docs/react/introduce" rel="nofollow noreferrer" target="_blank">antd-mobile</a>  这个特别符合我国国情的react组件库。本模板延续组件化的思想，以及样式的模块化（cssModules), 并以真实项目实践写了几个简单的组件，包括底部导航，好店列表，以及下拉菜单等。  目的就是展示下，在真实项目中，组件化的思想是如何实践的。</p></li></ul>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/111568-df62fb80202ad897.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/111568-df62fb80202ad897.gif?imageMogr2/auto-orient/strip" alt="step-03-demo.gif" title="step-03-demo.gif" style="cursor: pointer;"></span></p>
<ul><li><p><a href="https://github.com/minooo/React-Study/tree/master/step-04" rel="nofollow noreferrer" target="_blank">step-04</a> (已完成）<br>step-04 是在 step-03 的基础上添加额外配置完成，为了更好的解决react中组件之间的数据传递，</p></li></ul>
<p>此模板引入了<a href="https://github.com/reactjs/redux" rel="nofollow noreferrer" target="_blank">redux</a>，redux 的三大核心法宝就是 <code>action</code>, <code>reducer</code>, <code>store</code>，  <br>redux入门推荐教程 <a href="https://github.com/react-guide/redux-tutorial-cn/blob/master/00_introduction.js" rel="nofollow noreferrer" target="_blank">redux-tutorial 使用教程</a> <a href="http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html" rel="nofollow noreferrer" target="_blank">redux 入门教程</a>；  <br>同时为了更优雅的管理redux的异步操作，经过再三对比和考虑，本模板使用了<a href="https://github.com/yelouafi/redux-saga/" rel="nofollow noreferrer" target="_blank">redux-saga</a>,用来替代<a href="https://github.com/gaearon/redux-thunk" rel="nofollow noreferrer" target="_blank">redux-thunk</a>。  <br><a href="https://neighborhood999.github.io/redux-saga/" rel="nofollow noreferrer" target="_blank">redux-sage中文文档(繁体，同步)</a>  </p>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/111568-cb95dde30f8c87c4.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/111568-cb95dde30f8c87c4.gif?imageMogr2/auto-orient/strip" alt="step-04-demo.gif" title="step-04-demo.gif" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">启动React生态圈</h2>
<p>本项目启动前默认你已经安装<a href="http://nodejs.cn/" rel="nofollow noreferrer" target="_blank">node</a>（建议安装6.0+版本）</p>
<h6>克隆项目</h6>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/minooo/React-Study.git
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/minooo/React-Study.git
</code></pre>
<h6>进入目录（比如step-01)</h6>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd step-01
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>cd <span class="hljs-built_in">step</span><span class="hljs-number">-01</span>
</code></pre>
<h6>安装依赖</h6>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>npm <span class="hljs-keyword">install</span>
</code></pre>
<h6>启动开发模式（运行 npm run build，即可将项目打包）</h6>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm start
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> start
</code></pre>
<h6>启动就绪后，打开浏览器，输入 <a href="http://localhost:3000/" rel="nofollow noreferrer" target="_blank">http://localhost:3000/</a> ，看到惊喜了吗？</h6>
<hr>
<h2 id="articleHeader4">常见问题说明。（2016/10/19）</h2>
<ul>
<li><p>请保证电脑安装的 <a href="http://nodejs.cn/" rel="nofollow noreferrer" target="_blank">node</a> 版本在 <strong>6.0以上</strong> ，如果你“不幸”安装了4.0版本，    请先将其卸载，再安装6.0+版本</p></li>
<li><p>很多新手朋友可能事先跟着react官网实例做了一些练习，用的都是 es5 的语法。    而本项目代码采用的都是 es6 的语法，这也是react官网推荐的。如果你对es6语法不太熟悉    可以看下<a href="http://bbs.reactnative.cn/topic/15/react-react-native-%E7%9A%84es5-es6%E5%86%99%E6%B3%95%E5%AF%B9%E7%85%A7%E8%A1%A8" rel="nofollow noreferrer" target="_blank">React es5---es6 写法对照表</a>    同时也建议你花<a href="https://segmentfault.com/a/1190000004365693">30分钟，快速了解ES6语法</a>  当然，本项目所有组件示例也可以当作你学习es6写法的参考。</p></li>
<li><p>如果你有使用webstorm作为你的IDE，初次运行本项目，软件可能会提示你 <code>Add watcher</code> ，    由于本项目已配置好了一整套的编译流程，所以不要此类协助，直接忽略取消即可；另外由于    项目代码用的都是JSX语法，webstorm 可能默认的解析js语法是es5，    所以此时你会看到文件都是“一片红”错误标注，如下改下解析设置就行了：    <code>File</code> -&gt; <code>Settings</code> -&gt; <code>Languages &amp; Frameworks</code> -&gt; <code>JavaScript</code>     选择右侧面板中的下拉框，将选项 <code>JavaScript languaga version</code> 的值改为 <code>React JSX</code> 即可</p></li>
<li><p>如果你在学习本项目遇到问题，请加群交流： <a href="http://jq.qq.com/?_wv=1027&amp;k=2FnzuGM" rel="nofollow noreferrer" target="_blank">419922267</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手机端 React 项目构建

## 原文链接
[https://segmentfault.com/a/1190000006188403](https://segmentfault.com/a/1190000006188403)

