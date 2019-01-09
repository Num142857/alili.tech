---
title: '最全的weex踩坑攻略-出自大量实践与沉淀' 
date: 2019-01-10 2:30:08
hidden: true
slug: pqz91ilw7h
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>在自己的业务环境中使用，并开放给第三方isv，企业开发者使用，这是一篇有内涵有故事的文章。</p></blockquote>
<p>如果你对weex微应用感兴趣，也在开发着微信小程序，不妨来看看为了让你减少顾虑而准备的技术对比表格，是的，开发钉钉的weex微应用是如此的简单。</p>
<p>访问这个链接阅读： <a href="http://www.jianshu.com/p/d5d7680335de" rel="nofollow noreferrer" target="_blank">钉钉Weex微应用与微信小程序技术对比表格</a> 。</p>
<h2 id="articleHeader0">技术概述</h2>
<p><code>weex</code>是阿里开源的一套构建高性能移动界面的原生跨平台技术框架，它的上层由<code>Vue</code>，<code>Rax（非常类似React的开发框架）</code>实现数据驱动，底层由iOS，Android实现render engine来驱动界面的最终落地。类比<code>React Native</code>它的优势在于难得的<code>一次编写，多端运行</code>，是的，它也很好的支持着移动Web端。</p>
<h3 id="articleHeader1">构建-build</h3>
<p><code>Native</code>使用<code>weex-loader</code>，<code>Web</code>则需要使用<code>vue-loader</code>，在<code>Web</code>端上<code>vue-loader</code>目前仅支持<code>^11.3.3</code>版本，以及<code>weex-vue-render</code>需要<code>&gt;= 0.11.50</code>，并且<code>vue-loader</code>的配置做如下修改：</p>
<ul><li><p>webpack 1.x</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
  loaders: [
    {
      test: /\.vue(\?[^?]+)?$/,
      loaders: ['vue-loader']
    }
  ]
},
vue: {
  /**
   * important! should use postTransformNode to add $processStyle for
   * inline style normalization.
   */
  compilerModules: [
    {
      postTransformNode: el => {
        el.staticStyle = `$processStyle(${el.staticStyle})`
        el.styleBinding = `$processStyle(${el.styleBinding})`
      }
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">module</span>: {
  <span class="hljs-attribute">loaders</span>: [
    {
      test: /\.<span class="hljs-built_in">vue</span>(\?[^?]+)?$/,
      loaders: [<span class="hljs-string">'vue-loader'</span>]
    }
  ]
},
<span class="hljs-selector-tag">vue</span>: {
  <span class="hljs-comment">/**
   * important! should use postTransformNode to add $processStyle for
   * inline style normalization.
   */</span>
  <span class="hljs-attribute">compilerModules</span>: [
    {
      postTransformNode: el =&gt; {
        el.staticStyle = `$<span class="hljs-built_in">processStyle</span>(${el.staticStyle})`
        el.styleBinding = `$<span class="hljs-built_in">processStyle</span>(${el.styleBinding})`
      }
    }
  ]
}</code></pre>
<ul><li><p>webpack 2.x</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerModules: [
            {
              postTransformNode: el => {
                el.staticStyle = `$processStyle(${el.staticStyle})`
                el.styleBinding = `$processStyle(${el.styleBinding})`
              }
            }
          ]
        }
      }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">module</span>: {
    <span class="hljs-attribute">rules</span>: [
      {
        test: /\.vue$/,
        loader: <span class="hljs-string">'vue-loader'</span>,
        options: {
          compilerModules: [
            {
              postTransformNode: el =&gt; {
                el.staticStyle = `$<span class="hljs-built_in">processStyle</span>(${el.staticStyle})`
                el.styleBinding = `$<span class="hljs-built_in">processStyle</span>(${el.styleBinding})`
              }
            }
          ]
        }
      }
    ]
}</code></pre>
<p>最佳的实践是推荐你使用目前为止我们内部评价最高的一份脚手架工程（支持三端一致，意味着处理了降级。）：<a href="https://github.com/dingtalk-templates/webpack" rel="nofollow noreferrer" target="_blank">dingtalk-templates/webpack</a>，你可以直接下载它，自行修改<code>package.json</code>文件中的<code>"{{""}}"</code> 配置，或者安装 <a href="https://github.com/open-dingtalk/weex-dingtalk-cli" rel="nofollow noreferrer" target="_blank">open-dingtalk/weex-dingtalk-cli</a> 这个命令行工具来玩转脚手架，这个命令行工具就像你使用<code>vue-cli</code>一样的简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install -g weex-dingtalk-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;">$ npm install -g weex-dingtalk-<span class="hljs-keyword">cli</span></code></pre>
<h3 id="articleHeader2">样式-style</h3>
<blockquote><p>weex支持的样式属于css子集</p></blockquote>
<ul>
<li><p>必须写完整，如<code>background:#000</code>需要写成<code>background-color:#000</code></p></li>
<li><p>样式不允许提取文件，必须写在<code>Vue</code>的单组件中</p></li>
<li><p>原则上不推荐使用<code>预处理器</code>，因为无法预期转译出来的样式符合weex的css子集</p></li>
<li><p>布局只能使用Flexbox</p></li>
<li><p>如果要显示文本必须使用<code>text</code>组件，并且你想改变字体大小必须写在<code>text</code>组件上</p></li>
<li><p>只支持<code>class</code>，不允许继承</p></li>
<li><p>单位只支持<code>px</code></p></li>
<li><p>不支持背景图片</p></li>
<li><p>基于<code>750px</code>进行缩放，会有<code>浮点</code>级别的误差</p></li>
<li><p>样式需要声明 <code>scoped</code> 属性</p></li>
<li><p>Android上处理圆角，必须在外层<code>div</code>中设置<code>border-radius</code></p></li>
<li><p>如果你想动态的替换<code>class</code>，只能使用数组表达式，<code>&lt;div :class=['name', a? 'b': 'c']&gt;&lt;/div&gt;</code></p></li>
</ul>
<p>如果你想使用<code>预处理器</code>（只是不推荐），可以如下配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
        loaders: {
          scss: 'vue-style-loader!css-loader!sass-loader'
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>{
    tes<span class="hljs-variable">t:</span> /\.vue$/,
    loader: <span class="hljs-string">'vue-loader'</span>,
    option<span class="hljs-variable">s:</span> {
        loader<span class="hljs-variable">s:</span> {
          <span class="hljs-keyword">scs</span><span class="hljs-variable">s:</span> <span class="hljs-string">'vue-style-loader!css-loader!sass-loader'</span>
        }
    }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style lang=&quot;sass&quot;>
    @import './common.scss'
    // ...
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"sass"</span>&gt;</span><span class="css">
    @<span class="hljs-keyword">import</span> <span class="hljs-string">'./common.scss'</span>
    // ...
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>如果你想使用更精准的适配（无法忍受浮点级别的误差），可以获取<code>scale</code>，<code>deviceWidth</code>自行进行适配，推荐在<code>loader</code>阶段去处理（自行开发转换工具）。</p>
<h3 id="articleHeader3">JavaScript与内存管理-JavaScript and memory manage</h3>
<blockquote><p>由于JS运行在JavaScriptCore/V8中，此与Web有较大差异。</p></blockquote>
<p>如下：</p>
<ul>
<li><p><code>jquery</code>，<code>axios</code> 之类的原来Web开发领域的库都不可以使用</p></li>
<li><p>不支持DOM操作</p></li>
<li><p>虽然提供了Native DOM可以操作界面的渲染，原则上不推荐使用，方法与DOM操作类似</p></li>
<li><p>既然不支持DOM操作，更改界面的方式应该使用数据驱动</p></li>
<li><p>仅支持部分事件</p></li>
<li><p>weex SDK <code>&gt;= 0.10.0</code> 的才支持事件冒泡</p></li>
<li><p>没有window，document，location，history等对象</p></li>
<li><p>runtime是一个“全局环境”，不允许往全局环境中挂载对象，因为无法释放且所有weex页面共享</p></li>
<li><p>只有scroller和list组件可以滚动</p></li>
<li><p>不允许在Vue中操作<code>style</code>，遍历是很耗性能的</p></li>
<li><p>Vue中的<code>v-show</code>等原来操作Dom的指令或Api都不可以使用</p></li>
<li><p>vue-router 只允许使用 <code>abstract</code> 模式</p></li>
<li><p>vuex必须在初始化之前使用<code>Vue.use</code>注入</p></li>
<li><p>native端只能使用网络图片，解决的方式是在最后上线时统一替换成CDN</p></li>
<li><p>热更新以及增量更新的方式都可以参考React Native目前成熟的方案</p></li>
<li><p>iOS由于使用了同一套URL System，UIWebView的cookie是会共享到weex中的，同理weex中的cookie也是会共享的，只有WKWebView不会。原则上，你不应该使用cookie来处理用户体系的问题</p></li>
</ul>
<blockquote><p>weex native 与 weex web 之间的差异较大，那么怎么办？</p></blockquote>
<p>我们提供了一套抹平一些常见差异的库，你也可以在<code>weex</code>环境中使用，<a href="https://github.com/open-dingtalk/weex-dingtalk-journey" rel="nofollow noreferrer" target="_blank">https://github.com/open-dingtalk/weex-dingtalk-journey</a>。</p>
<p>在说内存（memory）之前，大家先来看一副图，weex的内存分布：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010023505?w=916&amp;h=958" src="https://static.alili.tech/img/remote/1460000010023505?w=916&amp;h=958" alt="DingTalk20170701160256.png" title="DingTalk20170701160256.png" style="cursor: pointer; display: inline;"></span></p>
<p>正常情况下，Native memory 业务开发人员是无法处理的，而运行在js core 中的内存，我们知道如果不断开引用，js是无法回收释放内存的。</p>
<ul>
<li><p>不允许往 <code>runtime</code> 里去挂载对象</p></li>
<li><p>业务代码中的一些引用在<code>beforeDestroy</code> 中断开设置为<code>null</code></p></li>
<li><p>学会使用工具分析内存泄漏的问题，<a href="https://webkit.org/downloads/" rel="nofollow noreferrer" target="_blank">https://webkit.org/downloads/</a></p></li>
<li><p>不要随意的使用函数递归，缩短对象方法的执行路径（传统JS领域的内存管理最佳实践也适用一部分）</p></li>
<li><p>由于界面的渲染需要依赖<code>createInstance(id, code, config, data)</code>，<code>sendTasks(id, tasks)</code>，<code>receiveTasks(id, tasks)</code>发送指令的方式进行通信，你应该减少通信的次数，在更新界面时，合并不必要的通信指令的发送。</p></li>
<li><p>如果你使用vue-router的方式，尽量减少组件之间的共享。</p></li>
</ul>
<h3 id="articleHeader4">转场方式-navigator</h3>
<p>由于<code>weex</code>的特殊性，它的转场方式有几种构成。</p>
<ul>
<li><p><code>weex</code> to <code>weex</code>，如果你需要支持钉钉js-api，那么你应该使用<code>openLink</code>。（如果是你自己实现，使用weex自带的navigator模块）</p></li>
<li><p><code>weex</code> to <code>h5</code> 依然使用<code>openLink</code>，（如果是你自己实现，那么可以通过<code>module</code>的方式来打开一个WebViewController| UIWebView or WKWebView）</p></li>
<li><p><code>native</code> to <code>weex</code> 直接alloc weex 容器的Controller传入Url即可</p></li>
</ul>
<p>如果你使用<code>vue-router</code>，那么配置好你的路由path，使用<code>push</code>，<code>go</code>方法即可，唯一可惜的是使用<code>vue-router</code>的方式较为生硬。</p>
<h3 id="articleHeader5">页面级别的数据传输-Page level data transfer</h3>
<blockquote><p>页面级别的数据传输基本很少会发生，钉钉的开发者推荐统一使用domainStorage方案。</p></blockquote>
<ul>
<li><p><code>weex</code> to <code>weex</code> 通过URL传参数（携带的数据量有限），通过weex storage module</p></li>
<li><p><code>weex</code> to <code>h5</code>，<code>h5</code> to <code>weex</code> 通过URL传参数</p></li>
<li><p><code>native</code> to <code>weex</code> 通过alloc weex 容器中的option或者data传入，前者可以在weex.config中获取，后者可以在vm上下文中获取</p></li>
<li><p><code>weex</code> to <code>native</code> 定义一个跳转native的module，使用native的属性或者init时传入</p></li>
</ul>
<h3 id="articleHeader6">调试工具-Debug Kit used</h3>
<p>weex的调试工具需要额外安装<code>weex-toolkit</code>，<code>weex-devtool</code>，以及在你的Native工程中集成对应的<code>WXDevtool（iOS）</code>。</p>
<p>如果你运行<code>weex debug</code>遇到如下的错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Error: EACCES: permission denied, open '/Users/xxx/.xtoolkit/node_modules/weex-devtool/frontend/weex/weex-bundle.js'
    at Error (native)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code><span class="hljs-keyword">Error: </span>EACCES: permission denied, open '/Users/xxx/.xtoolkit/node_modules/weex-devtool/frontend/weex/weex-bundle.js'
    at Error (native)</code></pre>
<p>（非Windows用户）使用<code>sudo</code>即可。</p>
<ul><li><p>不集成 <code>WXDevtool SDK</code></p></li></ul>
<p>首先，你需要安装<code>Weex Playground</code>，可自行在各大市场中下载安装。</p>
<p>不需要指明文件路径，在终端输入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ weex debug" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs d"><code style="word-break: break-word; white-space: initial;">$ weex <span class="hljs-keyword">debug</span></code></pre>
<p>先使用 <code>Weex Playground</code> 扫码（启动成功后会弹出一个界面），然后将你的业务代码贴到 <a href="http://dotwe.org/vue" rel="nofollow noreferrer" target="_blank">这里</a>，注意：</p>
<ul>
<li><p>不允许出现<code>import</code>等导入模块的语法</p></li>
<li><p>安装了<code>Weex Playground</code>的设备和你的电脑必须在同一局域网内</p></li>
</ul>
<p>最后用安装了<code>Weex Playground</code>的设备扫码（业务代码贴过去那里的右侧会出现的二维码）。</p>
<ul><li><p>集成 <code>WXDevtool SDK</code></p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[WXDevTool setDebug:YES];
[WXDevTool launchDevToolDebugWithUrl:@&quot;ws://192.168.1.108:8088/debugProxy/native&quot;];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code>[<span class="hljs-name">WXDevTool</span> setDebug:YES]<span class="hljs-comment">;</span>
[<span class="hljs-name">WXDevTool</span> launchDevToolDebugWithUrl:@<span class="hljs-string">"ws://192.168.1.108:8088/debugProxy/native"</span>]<span class="hljs-comment">;</span></code></pre>
<p>ws:// xxx.xx..x 这个地址是在用weex debug 在终端里给你输出出来的，如果setDebug为YES会开启debugger模式，反之亦然。</p>
<p>注意<code>setDebug</code>设置为<code>YES</code>。</p>
<h3 id="articleHeader7">原生开发-Native</h3>
<p>请直接阅读 <a href="https://zhuanlan.zhihu.com/p/25182677" rel="nofollow noreferrer" target="_blank">技术 | Weex入坑之旅</a> ，这是用iOS视角写的一篇文章，大概在半年之前。</p>
<h3 id="articleHeader8">写在最后</h3>
<p>希望大家可以用一个开放的心态来看待<code>weex</code>，它的设计，实现有很多是值得学习的地方，比如多<code>framework</code>支持，<code>共享runtime</code>，<code>module</code>，<code>component</code>，<code>handler</code>等等，非常的自由领域，相当于它设计好了一个<code>render engine</code>，理论上你可以学习它的几个关键接口，知道Native DOM指令后，也能开发出替代Vue的上层框架，不信？你看看Rax即明白了。</p>
<p><code>weex</code>也有一些不足的地方，开发者数量少，社区活跃度不高，很多问题并不一定能被google搜录到。文档确实有一点不完善，native的实现也有一定的bug数量，你看<code>react</code>这么多年了，依然有bug，只要在逐步改进迭代修复，我觉得它就是非常棒的，万事没有十全十美，美中不足的一点瑕疵，说不定才是完美呢。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010023506?w=258&amp;h=258" src="https://static.alili.tech/img/remote/1460000010023506?w=258&amp;h=258" alt="qrcode_for_gh_a08ff7d69ad8_258.jpg" title="qrcode_for_gh_a08ff7d69ad8_258.jpg" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
最全的weex踩坑攻略-出自大量实践与沉淀

## 原文链接
[https://segmentfault.com/a/1190000010023500](https://segmentfault.com/a/1190000010023500)

