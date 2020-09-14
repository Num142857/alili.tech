---
title: '网易严选App感受Weex开发（已完结）' 
date: 2019-01-01 2:30:07
hidden: true
slug: knj76exbwnm
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000012869672" src="https://static.alili.tech/img/remote/1460000012869672" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote>自打出生的那一天起，Weex 就免不了被拿来同 React Native「一决高下」的命运。React Native 宣称「Learn Once, Write Anywhere」，而 Weex 宣称「Write Once, Run Everywhere」。在我看来，并没有谁更好，只有谁更合适。下面我将围绕 Weex 入门进行讲解。<br>（如果你尚不了解 React Native，并想简单入门，可以阅读<a href="https://github.com/zwwill/blog/issues/9" rel="nofollow noreferrer" target="_blank">【整理】React Native 快速入门笔记</a>）</blockquote>
<h1 id="articleHeader0">网易严选 App 感受 Weex 开发</h1>
<p>什么都不说，先给你感受下 Weex 的效果。以下就是我使用 Weex，4*8h（不连续）做出来的 demo，其中还包括素材收集，踩坑总结等时间。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012846334?w=1266&amp;h=727" src="https://static.alili.tech/img/remote/1460000012846334?w=1266&amp;h=727" alt="demo 截图" title="demo 截图" style="cursor: pointer;"></span></p>
<blockquote>此处是 demo 源码：<br><a href="https://github.com/zwwill/yanxuan-weex-demo" rel="nofollow noreferrer" target="_blank">https://github.com/zwwill/yanxuan-weex-demo</a>
</blockquote>
<p>不得不说，使用 Weex 开发 app 对于我们纯前端人员来说，是件「<strong><em>很爽</em></strong>」的事情，只要你熟悉了他的语法，基本可以做到一周上手写 app。极其适合交互要求不高，时间紧迫，人手不足的同构开发需求。</p>
<p>但是，当然有但是，如果你想写出一个完美的 app，你就需要在性能优化上下很大的功夫，包括动画的优化，过场的优化，图片的优化，细节的打磨等等，再者，就是你需要掌握或者「能写」一些原生的代码，不然有些功能你是实现不了的，比如 status bar 的属性更改，开场动画的制作，内存的回收，webview 的监听等等。</p>
<p>下面我们具体讲讲入门知识</p>
<h1 id="articleHeader1">Write Once, Run Everywhere</h1>
<p>Weex 提供了多端一致的技术方案。</p>
<ul>
<li>首先，Weex 的开发和 web 开发体验可以说是几乎一样。包括语法设计和工程链路等。</li>
<li>其次，Weex 的组件、模块设计都是 iOS、Android、Web 的开发者共同讨论出来的，有一定的通用性和普遍性。</li>
<li>Weex 开发同一份代码，可以在不同的端上分别执行，避免了多端的重复研发成本。</li>
</ul>
<p>在同构这条路上，Weex 比 React Native做得更彻底，他「几乎」做到了，「你来使用 vue 写一个webapp，我顺便给你编译成了 ios 和 android 的原生 app」</p>
<p>至于为什么要造这个轮子，官方给了以下说法</p>
<blockquote>1、今天在技术社区有大量的 web 开发者，Weex 可以赋能更多的 web 开发者构建高性能和高体验的移动应用。<br>2、Web 开发本身具有非常强的高效率和灵活性，这和 Weex 想解决的移动端动态性问题不谋而合。<br>3、Web 标准和开发体验是很多顶尖而优秀的科技公司共同讨论和建设的结果，本身的设计和理念都有极高的品质保障<br>4、同时 Weex 也希望可以借此机会努力为标准贡献一点自己的微薄之力。<br>5、Web 是一种标准化的技术，标准本身就是一种力量，基于标准、尊重标准、贴近标准都意味着拥有更多的可能性。<br>6、Web 今天的生态和社区是非常繁荣的，有很多成熟的工具、库、工程体系、最佳实践可以使用、引入和借鉴。</blockquote>
<p>在我看来，Weex 其实是 Alibaba 团队提高生产效率的产物，在淘宝这类要求多端统一迭代快速的部门，三端约定一种便于统一的规范，在加上时间的发酵，渐渐的就有了此类脚手架的雏形，同时在脸书 React Native 开源带来的极大轰动后，自己也坐不住了吧^_^</p>
<p>好了，闲话就说到这，下面就来让我们解剖一下WEEX的优劣良莠。</p>
<h1 id="articleHeader2">预科</h1>
<p>入门 Weex 前需要了解以下知识，这样能帮助你更快的掌握<br>Node：<a href="http://www.runoob.com/nodejs/nodejs-tutorial.html" rel="nofollow noreferrer" target="_blank">《Node.js 教程》</a><br>Vue：<a href="https://cn.vuejs.org/v2/guide/" rel="nofollow noreferrer" target="_blank">《Vue.js官方教程》</a><br>ES6：<a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">《ECMAScript 6 入门》</a><br>再者就是 ios 和 android 开发语法的入门和编辑器的使用</p>
<h1 id="articleHeader3">环境</h1>
<h2 id="articleHeader4">系统环境要求</h2>
<p>IOS : <code>MacOS</code>, <code>黑苹果</code><br>Android :<code>MacOS</code>,  <code>Linux</code>, <code>Windows</code></p>
<h2 id="articleHeader5">配置环境</h2>
<p>你可以参考官方文档安装必须的依赖环境 <a href="http://weex.apache.org/cn/guide/set-up-env.html" rel="nofollow noreferrer" target="_blank">http://weex.apache.org/cn/guide/set-up-env.html</a>，<br>也可以直接安装以下环境</p>
<ul>
<li><a href="https://nodejs.org/" rel="nofollow noreferrer" target="_blank">node</a></li>
<li>npm</li>
<li><a href="https://github.com/weexteam/weex-toolkit" rel="nofollow noreferrer" target="_blank">weex-toolkit</a></li>
<li><a href="https://developer.apple.com/xcode/" rel="nofollow noreferrer" target="_blank">Xcode</a></li>
</ul>
<p>安装 Xcode IDE 和 Xcode 的命令行工具（IOS 开发依赖）</p>
<ul><li>
<a href="http://www.android-studio.org/" rel="nofollow noreferrer" target="_blank">Android Studio</a><p><strong>下载必须的插件：</strong></p>
</li></ul>
<p>a) JDK1.8+<br>b) Show Package Details<br>c) Android SDK Build Tools <br>d) Android Support Repository</p>
<p><strong>配置基础环境：</strong><br>a) ANDROID_HOME （如运行是遇到问题可参考此文 <a href="http://www.jianshu.com/p/a77396301b22" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/a77396301b22</a>）<br>b) JAVA_HOME</p>
<h2 id="articleHeader6">Hello Weex</h2>
<p>官方文档上的入门 Hello world 是 web 端的，紧接着介绍了如何「<strong>集成 Weex 到已有应用</strong>」</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012869673" src="https://static.alili.tech/img/remote/1460000012869673" alt="" title="" style="cursor: pointer;"></span></p>
<p>但是，身为一个 web 前端开发者，如果你不懂原生语音的话，介绍这些并不能起到很好的引导作用，因为web前端开发者都有「<strong><em>一统前端界</em></strong>」的野心（Web+Android+IOS），「寄人篱下」只能是暂时的。</p>
<p>快速创建并运行一个纯 Weex App 对于「纯」前端同学来说，才是有意思的事儿。<br>但：</p>
<blockquote><strong><em>为什么文档要这么设计也是跟Weex的定位有关的，读完下文后续你就慢慢懂了，后面我将做总结解释</em></strong></blockquote>
<p>如果你在官方教程里没有找到创建工程的教程，可以阅读此文<a href="http://www.jianshu.com/p/084b5b1e7ffe" rel="nofollow noreferrer" target="_blank">《Weex 快速创建工程 Hello World》</a></p>
<h1 id="articleHeader7">Vue Native</h1>
<p>Weex 在迭代的过程中选择了于 Vue 2.0 握手，因为该版本的 Vue 加入了 Virtual-DOM 和预编译器的设计，使得该框架在运行时能够脱离 HTML 和 CSS 解析，只依赖 JavaScript，如此，Vue 在和 Weex 合作后，便获得了使用 JS 预编译原生的组件 UI 的能力。</p>
<p>同 React Native 一样，有人也将 Weex 叫做 Vue Native。</p>
<p>如果你对 Vue 还不了解，可以先学习【预科】部分推荐的<a href="https://cn.vuejs.org/v2/guide/" rel="nofollow noreferrer" target="_blank">《Vue.js 官方教程》</a>。</p>
<p>那么接下来我们讲讲，Vue 在 Weex 中的不同</p>
<h1 id="articleHeader8">Vue 在 Weex 中的不同</h1>
<p>虽说 Weex 使用 Vue 语言写的，但毕竟是需要在不同平台间运行的，虽然大部分语法都有支持，但是依然有部分语法是不同的</p>
<h2 id="articleHeader9">语法差异</h2>
<h3 id="articleHeader10">1、“html标签”</h3>
<p>目前 Weex 支持了基本的容器 (div)、文本 (text)、图片 (image)、视频 (video) 等<strong>组件</strong>，注意是组件，而不是标签，虽然使用起来跟 html 标签很像，至于其他标签基本可以使用以上组件组合而成。</p>
<h3 id="articleHeader11">2、Weex 环境中没有 DOM</h3>
<p>因为 Weex 解析 vue 得到的并不是 dom，而是原生布局树</p>
<h3 id="articleHeader12">3、支持有限的事件</h3>
<p>并不支持 Web 中所有的事件类型，详情请参考<a href="http://weex.apache.org/cn/references/common-event.html" rel="nofollow noreferrer" target="_blank">《通用事件》</a></p>
<h3 id="articleHeader13">4、没有 BOM 但可以调用原生 API</h3>
<p>在 Weex 中能够调用移动设备原生 API，使用方法是通过注册、调用模块来实现。其中有一些模块是 Weex 内置的，如 clipboard 、 navigator 、storage 等。<br><a href="http://weex.apache.org/cn/references/modules/clipboard.html" rel="nofollow noreferrer" target="_blank">《clipboard 剪切板》</a><br><a href="http://weex.apache.org/cn/references/modules/navigator.html" rel="nofollow noreferrer" target="_blank">《navigator 导航控制》</a><br><a href="http://weex.apache.org/cn/references/modules/storage.html" rel="nofollow noreferrer" target="_blank">《storage 本地存储 》</a><br>为了保持框架的通用性，Weex 内置的原生模块有限，不过 Weex 提供了横向扩展的能力，可以扩展原生模块，具体的扩展方法请参考<a href="http://weex.apache.org/cn/references/advanced/index.html" rel="nofollow noreferrer" target="_blank">《iOS 扩展》</a>&nbsp;和<a href="http://weex.apache.org/cn/references/advanced/extend-to-android.html" rel="nofollow noreferrer" target="_blank">《Android 扩展》</a>。</p>
<h2 id="articleHeader14">样式差异</h2>
<p>Weex 中的样式是由原生渲染器解析的，出于性能和功能复杂度的考虑，Weex 对 CSS 的特性做了一些取舍<br>1、Weex 中只支持单个类名选择器，不支持关系选择器，也不支持属性选择器。<br>2、组件级别的作用域，为了保持 web 和 Native 的一致性，需要<code>&lt;style scoped&gt;</code>写法<br>3、支持了基本的盒模型和 flexbox 布局，详情可参考<a href="http://weex.apache.org/cn/references/common-style.html" rel="nofollow noreferrer" target="_blank">Weex 通用样式文档</a>。但是需要注意的是，</p>
<ul>
<li>不支持<code>display: none;</code>可用<code>opacity: 0;</code>代替，（opacity&lt;=0.01时，元素可点透）</li>
<li>样式属性暂不支持简写（提高解析效率）</li>
<li>flex 布局需要注意 web 的兼容性</li>
<li>css 不支持 3D 变换</li>
</ul>
<h1 id="articleHeader15">Weex 开发&amp;调试</h1>
<h2 id="articleHeader16">Vue 语法</h2>
<p>举个栗子，以下是严选App Demo首页的简化代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;wrapper&quot;>
        <text class=&quot;iconfont&quot;></text>
        <home-header></home-header>
        <scroller class=&quot;main-list&quot; offset-accuracy=&quot;300px&quot;>
            <refresher></refresher>
            <div class=&quot;cell-button&quot; @click=&quot;jumpWeb('https://m.you.163.com')&quot;>
                <yx-slider :imageList=&quot;YXBanners&quot; ></yx-slider>
            </div>
            <div class=&quot;cell-button&quot;>
                <block-1 :title=&quot;block1.title&quot; :items=&quot;block1.items&quot;></block-1>
            </div>
        </scroller>
    </div>
</template>
<style scoped>
    .iconfont {  font-family:iconfont;  }
    .main-list{ position: fixed; top: 168px; bottom: 90px; left: 0; right: 0;  }
</style>
<script>
    var navigator = weex.requireModule('navigator');
    import util from '../../src/assets/util';
    import Header from '../components/Header.vue';
    import refresher from '../components/refresh.vue';
    import YXSlider from '../components/YXSlider.vue';
    import Block1 from '../components/Block1.vue';
    export default {
        components: {
            'home-header': Header,
            'refresher': refresher,
            'yx-slider': YXSlider,
            'block-1': Block1
        },
        data () {
            return {
                YXBanners: [
                    { title: '', src: 'http://doc.zwwill.com/yanxuan/imgs/banner-1.jpg'},
                    { title: '', src: 'http://doc.zwwill.com/yanxuan/imgs/banner-2.jpg'},
                    { title: '', src: 'http://doc.zwwill.com/yanxuan/imgs/banner-3.jpg'}
                ]
            }
        },
        methods: {
            jumpWeb (_url) {
                const url = this.$getConfig().bundleUrl;
                navigator.push({
                    url: util.setBundleUrl(url, 'page/web.js?weburl='+_url) ,
                    animated: &quot;true&quot;
                });
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="vue"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrapper"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">home-header</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">home-header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">scroller</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main-list"</span> <span class="hljs-attr">offset-accuracy</span>=<span class="hljs-string">"300px"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">refresher</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">refresher</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cell-button"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"jumpWeb('https://m.you.163.com')"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">yx-slider</span> <span class="hljs-attr">:imageList</span>=<span class="hljs-string">"YXBanners"</span> &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">yx-slider</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cell-button"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">block-1</span> <span class="hljs-attr">:title</span>=<span class="hljs-string">"block1.title"</span> <span class="hljs-attr">:items</span>=<span class="hljs-string">"block1.items"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">block-1</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">scroller</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.iconfont</span> {  <span class="hljs-attribute">font-family</span>:iconfont;  }
    <span class="hljs-selector-class">.main-list</span>{ <span class="hljs-attribute">position</span>: fixed; <span class="hljs-attribute">top</span>: <span class="hljs-number">168px</span>; <span class="hljs-attribute">bottom</span>: <span class="hljs-number">90px</span>; <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> navigator = weex.requireModule(<span class="hljs-string">'navigator'</span>);
    <span class="hljs-keyword">import</span> util <span class="hljs-keyword">from</span> <span class="hljs-string">'../../src/assets/util'</span>;
    <span class="hljs-keyword">import</span> Header <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/Header.vue'</span>;
    <span class="hljs-keyword">import</span> refresher <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/refresh.vue'</span>;
    <span class="hljs-keyword">import</span> YXSlider <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/YXSlider.vue'</span>;
    <span class="hljs-keyword">import</span> Block1 <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/Block1.vue'</span>;
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">components</span>: {
            <span class="hljs-string">'home-header'</span>: Header,
            <span class="hljs-string">'refresher'</span>: refresher,
            <span class="hljs-string">'yx-slider'</span>: YXSlider,
            <span class="hljs-string">'block-1'</span>: Block1
        },
        data () {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">YXBanners</span>: [
                    { <span class="hljs-attr">title</span>: <span class="hljs-string">''</span>, <span class="hljs-attr">src</span>: <span class="hljs-string">'http://doc.zwwill.com/yanxuan/imgs/banner-1.jpg'</span>},
                    { <span class="hljs-attr">title</span>: <span class="hljs-string">''</span>, <span class="hljs-attr">src</span>: <span class="hljs-string">'http://doc.zwwill.com/yanxuan/imgs/banner-2.jpg'</span>},
                    { <span class="hljs-attr">title</span>: <span class="hljs-string">''</span>, <span class="hljs-attr">src</span>: <span class="hljs-string">'http://doc.zwwill.com/yanxuan/imgs/banner-3.jpg'</span>}
                ]
            }
        },
        <span class="hljs-attr">methods</span>: {
            jumpWeb (_url) {
                <span class="hljs-keyword">const</span> url = <span class="hljs-keyword">this</span>.$getConfig().bundleUrl;
                navigator.push({
                    <span class="hljs-attr">url</span>: util.setBundleUrl(url, <span class="hljs-string">'page/web.js?weburl='</span>+_url) ,
                    <span class="hljs-attr">animated</span>: <span class="hljs-string">"true"</span>
                });
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>如果以上代码脱离工程单独出现，基本上是无法得知他是 Weex 工程。此处可切实感受到 Weex 的 web 开发体验</p>
<h2 id="articleHeader17">名存实亡的&lt;标签/&gt;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <text v-for=&quot;(v, i) in list&quot; class=&quot;text&quot;>"{{"v"}}"</text>
    <image style=&quot;&quot; src=&quot;&quot;></image>
    <video class=&quot;video&quot; :src=&quot;src&quot; autoplay controls @start=&quot;onstart&quot; @pause=&quot;onpause&quot; @finish=&quot;onfinish&quot; @fail=&quot;onfail&quot;></video>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(v, i) in list"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>&gt;</span>"{{"v"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">image</span> <span class="hljs-attr">style</span>=<span class="hljs-string">""</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">image</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"video"</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"src"</span> <span class="hljs-attr">autoplay</span> <span class="hljs-attr">controls</span> @<span class="hljs-attr">start</span>=<span class="hljs-string">"onstart"</span> @<span class="hljs-attr">pause</span>=<span class="hljs-string">"onpause"</span> @<span class="hljs-attr">finish</span>=<span class="hljs-string">"onfinish"</span> @<span class="hljs-attr">fail</span>=<span class="hljs-string">"onfail"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>Weex 工程中常用的标签有<code>&lt;div /&gt;</code>，<code>&lt;text /&gt;</code>，<code>&lt;image /&gt;</code>，<code>&lt;video /&gt;</code>（组件另算），由此四种标签基本可以满足绝大多数场景的需求，虽说此标签同 web 工程下的标签用法一致，但此处的标签已不再是我们前端口中常提的 html 标签，而且名存实亡的 Weex 标签，确切讲是 Weex 组件。</p>
<p>通过<strong>weex-loader、vue-loader、weex-vue-render</strong>的解析最终转换输出的便是实际的组件，有此设计只是为了完成「<strong>web开发体验</strong>」的目标。但是我们身为上层的开发人员要清楚自己每天「把玩」的到底是个什么「鬼」。</p>
<h2 id="articleHeader18">阉割版 CSS</h2>
<p>其实用阉割版来形容 Weex 的 css 支持度并不合适，但如果从「web开发体验」的角度来衡量，那么这个形容词也是可以理解的。（此处对 Weex 寄有厚望^_^）</p>
<h3 id="articleHeader19">单位</h3>
<p>Weex 中的所有 css 属性值的单位均为 <code>px</code>，也可省略不写，系统会默认为  <code>px</code> 单位。</p>
<h3 id="articleHeader20">选择器</h3>
<p>Weex 中只支持单个类名选择器，不支持关系选择器，也不支持属性选择器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 支持单个类名选择器 */
.one-class {
  font-size: 36px;
}
/* 不支持关系选择器 */
.parent > .child {
  padding-top: 10px;
}
/* 不支持属性选择器，不支持 `v-cloak` 指令 */
[v-cloak] {
  color: #FF6600;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* 支持单个类名选择器 */</span>
<span class="hljs-selector-class">.one-class</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">36px</span>;
}
<span class="hljs-comment">/* 不支持关系选择器 */</span>
<span class="hljs-selector-class">.parent</span> &gt; <span class="hljs-selector-class">.child</span> {
  <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">10px</span>;
}
<span class="hljs-comment">/* 不支持属性选择器，不支持 `v-cloak` 指令 */</span>
<span class="hljs-selector-attr">[v-cloak]</span> {
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#FF6600</span>;
}</code></pre>
<p>这个只是对样式定义的限制，不影响样式类名的使用，在标签中可以添加多个样式类名，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;one two three&quot;><div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"one two three"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<h3 id="articleHeader21">盒模型</h3>
<p>weex支持css基本的盒模型结构，但需要注意的是</p>
<ul>
<li>
<code>box-sizing</code> 属性值默认为 <code>border-box</code>
</li>
<li>
<code>margin</code>，<code>padding</code>，<code>border</code>等属性暂不支持合并简写</li>
</ul>
<h3 id="articleHeader22">FlexBox</h3>
<p>Weex 中对 flexbox 布局支持度很高，但依然有部分属性并不支持，如 <code>align-items:baseline;</code>、<code>align-content:space-around;</code>、<code>align-self:wrap_reverse;</code>等。</p>
<p>具体 Weex 对 flexbox 的支持和布局算法，可通过此文进行了解<a href="http://www.jianshu.com/p/d085032d4788" rel="nofollow noreferrer" target="_blank">由 FlexBox 算法强力驱动的 Weex 布局引擎</a>，此处便不再赘述。</p>
<h3 id="articleHeader23">显隐性</h3>
<p>在 Weex 的 ios 和 android 端，并不支持 <code>display</code> 属性。</p>
<p>因此，不能使用 <code>display:none;</code> 来控制元素的显隐性，所以 vue 语法中的 <code>v-show</code> 条件渲染是不生效的。</p>
<p>我们可以使用  <code>v-if</code> 代替，或者用  <code>opacity:0;</code> 来模拟。</p>
<p>需要注意的是，ios和android端并不能使用 <code>opacity:0;</code> 来完全模拟 <code>visibility: hidden;</code>，因为，当<br> opacity 的只小于等于 0.01 时，native 控件便会消失，占位空间还在，但用户无法进行交互操作，点击时会发生点透效果。</p>
<h3 id="articleHeader24">CSS 3</h3>
<p>Weex 支持 css3 属性，虽然支持并不够，但相较 React Native 的「不能用」已经是强大很多了。</p>
<p>以下几种属性我们在开发前需要知道她的支持度</p>
<ul>
<li>transform：目前只支持 2D 转换</li>
<li>transition：v0.16.0+ 的 SDK 版本支持css过度动画，可根据情况配合内建组件 <code>animation</code> 实现动画交互</li>
<li>linear-gradient：目前只支持双色渐变色</li>
<li>font-family：Weex 目前只支持 ttf 和 woff 字体格式的自定义字体</li>
</ul>
<h2 id="articleHeader25">第三方工具库</h2>
<p>由于使用了增强版的 webpak 打包工具 weexpack，支持第三方框架也是件自然而然的事情。</p>
<p>常用的有 <code>vuex</code>、<code>vue-router</code> 等，可根据项目实际情况引入需要的第三方工具库</p>
<h2 id="articleHeader26">npm 包管理</h2>
<p>npm 包管理是前端开发朋友们再熟悉不过的包管理方式了。这也是为什么 React Native 和 Weex 都选择这种管理方式的原因。</p>
<p>以下是本工程的 package.json 文件，这里就不做讲解了，不熟悉的朋友点这里-&gt;<a href="http://www.runoob.com/nodejs/nodejs-npm.html" rel="nofollow noreferrer" target="_blank">NPM 使用介绍</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;yanxuan-weex&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;a weex project&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;scripts&quot;: {
    &quot;build&quot;: &quot;webpack&quot;,
    &quot;build_plugin&quot;: &quot;webpack --config ./tools/webpack.config.plugin.js --color&quot;,
    &quot;dev&quot;: &quot;weex-builder src dist -w&quot;,
    &quot;serve&quot;: &quot;webpack-dev-server --config webpack.dev.js -p --open&quot;
  },
  &quot;keywords&quot;: [&quot;weex&quot;],
  &quot;author&quot;: &quot;zwwill&quot;,
  &quot;license&quot;: &quot;MIT&quot;,
  &quot;dependencies&quot;: {
    &quot;vue&quot;: &quot;^2.4.2&quot;,
    &quot;vue-router&quot;: &quot;^2.7.0&quot;,
    &quot;vuex&quot;: &quot;^2.1.1&quot;,
    &quot;vuex-router-sync&quot;: &quot;^4.3.0&quot;,
    &quot;weex-html5&quot;: &quot;^0.4.1&quot;,
    &quot;weex-vue-render&quot;: &quot;^0.11.2&quot;
  },
  &quot;devDependencies&quot;: {
    &quot;babel-core&quot;: &quot;^6.21.0&quot;,
    &quot;babel-loader&quot;: &quot;^6.2.4&quot;,
    &quot;babel-plugin-add-module-exports&quot;: &quot;^0.2.1&quot;,
    &quot;babel-plugin-transform-runtime&quot;: &quot;^6.9.0&quot;,
    &quot;babel-preset-es2015&quot;: &quot;^6.9.0&quot;,
    &quot;babel-runtime&quot;: &quot;^6.9.2&quot;,
    &quot;css-loader&quot;: &quot;^0.26.1&quot;,
    &quot;history&quot;: &quot;^4.7.2&quot;,
    &quot;quick-local-ip&quot;: &quot;^1.0.7&quot;,
    &quot;vue-loader&quot;: &quot;^13.0.4&quot;,
    &quot;vue-template-compiler&quot;: &quot;^2.4.2&quot;,
    &quot;webpack&quot;: &quot;^2.7.0&quot;,
    &quot;webpack-dev-server&quot;: &quot;^2.4.2&quot;,
    &quot;weex-builder&quot;: &quot;^0.2.7&quot;,
    &quot;weex-loader&quot;: &quot;^0.4.5&quot;,
    &quot;weex-router&quot;: &quot;0.0.1&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"yanxuan-weex"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">"a weex project"</span>,
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"index.js"</span>,
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"build"</span>: <span class="hljs-string">"webpack"</span>,
    <span class="hljs-attr">"build_plugin"</span>: <span class="hljs-string">"webpack --config ./tools/webpack.config.plugin.js --color"</span>,
    <span class="hljs-attr">"dev"</span>: <span class="hljs-string">"weex-builder src dist -w"</span>,
    <span class="hljs-attr">"serve"</span>: <span class="hljs-string">"webpack-dev-server --config webpack.dev.js -p --open"</span>
  },
  <span class="hljs-attr">"keywords"</span>: [<span class="hljs-string">"weex"</span>],
  <span class="hljs-attr">"author"</span>: <span class="hljs-string">"zwwill"</span>,
  <span class="hljs-attr">"license"</span>: <span class="hljs-string">"MIT"</span>,
  <span class="hljs-attr">"dependencies"</span>: {
    <span class="hljs-attr">"vue"</span>: <span class="hljs-string">"^2.4.2"</span>,
    <span class="hljs-attr">"vue-router"</span>: <span class="hljs-string">"^2.7.0"</span>,
    <span class="hljs-attr">"vuex"</span>: <span class="hljs-string">"^2.1.1"</span>,
    <span class="hljs-attr">"vuex-router-sync"</span>: <span class="hljs-string">"^4.3.0"</span>,
    <span class="hljs-attr">"weex-html5"</span>: <span class="hljs-string">"^0.4.1"</span>,
    <span class="hljs-attr">"weex-vue-render"</span>: <span class="hljs-string">"^0.11.2"</span>
  },
  <span class="hljs-attr">"devDependencies"</span>: {
    <span class="hljs-attr">"babel-core"</span>: <span class="hljs-string">"^6.21.0"</span>,
    <span class="hljs-attr">"babel-loader"</span>: <span class="hljs-string">"^6.2.4"</span>,
    <span class="hljs-attr">"babel-plugin-add-module-exports"</span>: <span class="hljs-string">"^0.2.1"</span>,
    <span class="hljs-attr">"babel-plugin-transform-runtime"</span>: <span class="hljs-string">"^6.9.0"</span>,
    <span class="hljs-attr">"babel-preset-es2015"</span>: <span class="hljs-string">"^6.9.0"</span>,
    <span class="hljs-attr">"babel-runtime"</span>: <span class="hljs-string">"^6.9.2"</span>,
    <span class="hljs-attr">"css-loader"</span>: <span class="hljs-string">"^0.26.1"</span>,
    <span class="hljs-attr">"history"</span>: <span class="hljs-string">"^4.7.2"</span>,
    <span class="hljs-attr">"quick-local-ip"</span>: <span class="hljs-string">"^1.0.7"</span>,
    <span class="hljs-attr">"vue-loader"</span>: <span class="hljs-string">"^13.0.4"</span>,
    <span class="hljs-attr">"vue-template-compiler"</span>: <span class="hljs-string">"^2.4.2"</span>,
    <span class="hljs-attr">"webpack"</span>: <span class="hljs-string">"^2.7.0"</span>,
    <span class="hljs-attr">"webpack-dev-server"</span>: <span class="hljs-string">"^2.4.2"</span>,
    <span class="hljs-attr">"weex-builder"</span>: <span class="hljs-string">"^0.2.7"</span>,
    <span class="hljs-attr">"weex-loader"</span>: <span class="hljs-string">"^0.4.5"</span>,
    <span class="hljs-attr">"weex-router"</span>: <span class="hljs-string">"0.0.1"</span>
  }
}</code></pre>
<h2 id="articleHeader27">UI 尺寸适配</h2>
<p>Weex 容器默认的显示宽度 (viewport) 是 750px，页面中的所有组件都会以 750px 作为满屏宽度。</p>
<p>这很像移动设备的逻辑像，比如 iPhone 6 的物理像素宽为 750，逻辑像素</p>
<table>
<thead><tr>
<th align="center">Type</th>
<th align="center">iPhone 3G</th>
<th align="center">iPhone 4</th>
<th align="center">iPhone 6</th>
<th colspan="2" align="center">iPhone 6Plus</th>
</tr></thead>
<tbody>
<tr>
<td align="center">物理像素</td>
<td align="center">320x480</td>
<td align="center">640x960</td>
<td align="center">750x1134</td>
<td align="center">1080x1920</td>
</tr>
<tr>
<td align="center">逻辑像素</td>
<td align="center">320x480</td>
<td align="center">320x480</td>
<td align="center">375x667</td>
<td align="center">414x736</td>
</tr>
<tr>
<td align="center">像素比</td>
<td align="center">@1x</td>
<td align="center">@2x</td>
<td align="center">@2x</td>
<td align="center">@3x</td>
</tr>
</tbody>
</table>
<p>类比在 Weex 中，如果所有的显示宽度都是用默认值 750，那么显示出来的实际像素信息为</p>
<table>
<thead><tr>
<th align="center">Type</th>
<th align="center">iPhone 3G</th>
<th align="center">iPhone 4</th>
<th align="center">iPhone 6</th>
<th colspan="2" align="center">iPhone 6Plus</th>
</tr></thead>
<tbody>
<tr>
<td align="center">物理像素</td>
<td align="center">320x480</td>
<td align="center">640x960</td>
<td align="center">750x1134</td>
<td align="center">1080x1920</td>
</tr>
<tr>
<td align="center">显示像素</td>
<td align="center">750x1125</td>
<td align="center">750x1125</td>
<td align="center">750x1134</td>
<td align="center">750x1333</td>
</tr>
<tr>
<td align="center">像素比</td>
<td align="center">@0.427x</td>
<td align="center">@0.85x</td>
<td align="center">@1x</td>
<td align="center">@1.44x</td>
</tr>
</tbody>
</table>
<p>所以我们在使用 Weex 做 UI 适配时就没有所谓的 @2x 图和 @3x 图，所有的尺寸都是Weex帮我们根据<br> 750 作为基数宽做的缩放。</p>
<p>当然，Weex 提供了改变此显示宽度的 API，<code>setViewport</code>，通过此方法可以改变页面的显示宽度，可以实现每个页面根据自己的需求改变基数逻辑尺寸</p>
<p>因此对于一些固定的 icon，不建议使用普通的静态图片或者雪碧图，这里建议使用矢量的字体图片，有以下优点：</p>
<ol>
<li>适量图不会变糊</li>
<li>使用方便，通过 css 的字号控制大小，不用适配机型和屏幕尺寸</li>
<li>引用 ttf 文件，体积小，且容易更新</li>
</ol>
<h2 id="articleHeader28">本地调试</h2>
<p>Weex 的调试方式有多种，如果说RN的调试模式是解放了原生开发的调试，那么 Weex 的调试方式可以说是赋予了 web 模式调试原生应用的能力。</p>
<h3 id="articleHeader29">方法一</h3>
<p>此方法多用于解决 bug，检测控件的布局问题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 调试单个页面
$ weex debug your_weex.vue
# 调试整个工程
$weex debug your/path -e App.vue" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code><span class="hljs-comment"># 调试单个页面</span>
$ weex <span class="hljs-keyword">debug</span> your_weex.vue
<span class="hljs-comment"># 调试整个工程</span>
<span class="hljs-variable">$weex</span> <span class="hljs-keyword">debug</span> your/path -e App.vue</code></pre>
<p>执行调试命令后，会将指定的文件打包成 JSBundle，并启动一个 weex Devtool 服务（<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:8088可访问，如下图），同时将 JSBundle 文件传递至该服务跟路径下的weex文件夹内（<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:8088/weex/App.js，实际是下图右边二维码的的内容）。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011150040" src="https://static.alili.tech/img/remote/1460000011150040" alt="" title="" style="cursor: pointer;"></span></p>
<p>使用 Weex Playground App 扫下左二维码进入调试模，见下图</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011150041" src="https://static.alili.tech/img/remote/1460000011150041" alt="" title="" style="cursor: pointer;"></span></p>
<p>再次扫码右方二维码，点击【inspector】即可进入调试模式。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011150042" src="https://static.alili.tech/img/remote/1460000011150042" alt="" title="" style="cursor: pointer;"></span></p>
<p>每一个控件都是相同的数据结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<view class=&quot;WXText&quot; frame=&quot;"{{"0,0},{414,736"}}"&quot; hidden=&quot;NO&quot; alpha=&quot;1&quot; opaque=&quot;YES&quot;></view>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code style="word-break: break-word; white-space: initial;"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"WXText"</span> <span class="hljs-attr">frame</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"0,0}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">,</span></span></span><span class="hljs-template-variable">{414,736}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">}"</span> <span class="hljs-attr">hidden</span>=<span class="hljs-string">"NO"</span> <span class="hljs-attr">alpha</span>=<span class="hljs-string">"1"</span> <span class="hljs-attr">opaque</span>=<span class="hljs-string">"YES"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span></span></code></pre>
<ul>
<li>class：代表原声空间类型</li>
<li>frame：表示空间的坐标和大小</li>
<li>hidden：代表显隐性，css中visibility设置的值</li>
<li>alpha：不透明度，css中opacity设置的值</li>
<li>opaque：默认为YES，打开绘图系统性能优化的开关，即不去计算多透明块重合后的真正颜色，从而减小GPU的压力，weex中具体有没有地方可以设置这个开关暂时不清楚，有猎奇心的朋友可以研究下。</li>
</ul>
<h3 id="articleHeader30">方法二</h3>
<p>此方法多用于开发调试，试试观察结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ weex your_weex.vue" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>weex your_weex.vue</code></pre>
<p>如果出现 access 权限报错，使用管理员指令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ sudo weex your_weex.vue" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>sudo weex your_weex.vue</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011150043" src="https://static.alili.tech/img/remote/1460000011150043" alt="" title="" style="cursor: pointer;"></span></p>
<p>此时本地同时启动一个watch的服务器用于检查代码变更，自动重新构建 JSBundle，视觉同步刷新。</p>
<p>上图看到的效果即为H5页面的效果，我们一般在整个单页编写完成后在使用 Weex Playground App 扫码查看真机效果，或者你也可以在编写的同时使用真机观察代码的运行效果，每次重新构建包到重绘的速度还是很快的。</p>
<p>但前提是你要保证，你的手机和电脑的连在同一个局域网下，并且使用IP访问。</p>
<h1 id="articleHeader31">Weex 的原理</h1>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011150044" src="https://static.alili.tech/img/remote/1460000011150044" alt="" title="" style="cursor: pointer;"></span></p>
<p>虽然说，Weex 可以抹平三端开发的差异，但是知其然也应知其所以然使用起来才能游刃有余。</p>
<h2 id="articleHeader32">打包</h2>
<p>熟悉 React Native 的人都知道， React Native 的发布实际上就是发布一个 JSBundle，Weex 也是这样，但不同的是，Weex 将工程进行分包，发布多个 JSBundle。因为 Weex 是单页独立开发的，每个页面都将通过 Weex 打包器将 vue/we 页面打包成一个单独的 JSBundle，这样的好处在于减少单个 bundle 包的大小，使其变的足够小巧轻量，提高增量更新的效率。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 仅打包
$ npm run build
# 打包+构建
$ weex build ios
# 打包+构建+安装执行
$ weex run ios" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code><span class="hljs-comment"># 仅打包</span>
$ npm <span class="hljs-keyword">run</span><span class="bash"> build
</span><span class="hljs-comment"># 打包+构建</span>
$ weex build ios
<span class="hljs-comment"># 打包+构建+安装执行</span>
$ weex <span class="hljs-keyword">run</span><span class="bash"> ios</span></code></pre>
<p>以上三种均会触发 Weex 对工程进行打包。<br>在我们执行了以上打包命令后，所有的工程文件将被单独打成一个独立的 JSBundle，如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011150045" src="https://static.alili.tech/img/remote/1460000011150045" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>打包后的 JSBundle 有两种格式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 由.vue文件打包出来的包格式（简写），使用 vue 2.0 语法编写
// { &quot;framework&quot;: &quot;Vue&quot;} 
/******/ (function(modules) { 
          .......
/******/ })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"># 由.vue文件打包出来的包格式（简写），使用 vue <span class="hljs-number">2.0</span> 语法编写
<span class="hljs-comment">// { "framework": "Vue"} </span>
<span class="hljs-comment">/******/</span> (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">modules</span>) </span>{ 
          .......
<span class="hljs-comment">/******/</span> })</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 由.we文件打包出来的包格式（简写），使用 weex 语法编写
// { &quot;framework&quot;: &quot;Weex&quot; }
/******/ (function(modules) { 
          .......
/******/ })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"># 由.we文件打包出来的包格式（简写），使用 weex 语法编写
<span class="hljs-comment">// { "framework": "Weex" }</span>
<span class="hljs-comment">/******/</span> (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">modules</span>) </span>{ 
          .......
<span class="hljs-comment">/******/</span> })</code></pre>
<p>不同的头部是要告诉使用什么语法解析此JSBundle。</p>
<p>至此，我们准备「热更新的包」就已经准备完毕了，接下就是发包执行了。</p>
<h2 id="articleHeader33">发包</h2>
<p>打包后的 JSBundle 一般发布到发包服务器上，客户端从服务器更新包后即可在下次启动执行新的版本，而无需重新下载 app，因为运行依赖的 WeexSDK 已经存在于客户端了，除非新包依赖于新的 SDK，这也是热更新的基本原理。</p>
<blockquote>
<p>【WeexSDK】包括</p>
<ul>
<li>【JS Framework】JSBundle 的执行环境</li>
<li>【JS-Native Bridge】中间件或者叫通讯桥梁，也叫【Weex Runtime】</li>
<li>【Native Render Engine】解析 js 端发出的指令做原生控件布局渲染</li>
</ul>
</blockquote>
<h2 id="articleHeader34">执行</h2>
<p>Weex 的 iOS 和 Android 客户端的【JSFramework】中都会运行一个 JavaScript 引擎，来执行 JS bundle，同时向各端的渲染层发送规范化的指令，调度客户端的渲染和其它各种能力。iOS 下选择了 JavaScriptCore 内核，而在 Android 下选择了 UC 提供的 v8 内核（RN两端都是JavaScriptCore 内核）。</p>
<p>JSBundle 被 push 到客户端后就会在 JSFramework 中执行，最终输出三端可读性的 VNode 节点，数据结构简化如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  tag: 'div',
  data: {
    staticStyle: { justifyContent: 'center' }
  },
  children: [{
    tag: 'text',
    data: {
      staticClass: 'txt'
    },
    context: {
      $options: {
        style: {
          freestyle: {
            textAlign: 'center',
            fontSize: 200
          }
        }
      }
    },
    children: [{
      tag: '',
      text: '文字'
    }]
  }]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>{
  <span class="hljs-keyword">ta</span><span class="hljs-variable">g:</span> <span class="hljs-string">'div'</span>,
  dat<span class="hljs-variable">a:</span> {
    staticStyle: { justifyConten<span class="hljs-variable">t:</span> <span class="hljs-string">'center'</span> }
  },
  children: [{
    <span class="hljs-keyword">ta</span><span class="hljs-variable">g:</span> <span class="hljs-string">'text'</span>,
    dat<span class="hljs-variable">a:</span> {
      staticClas<span class="hljs-variable">s:</span> <span class="hljs-string">'txt'</span>
    },
    contex<span class="hljs-variable">t:</span> {
      $option<span class="hljs-variable">s:</span> {
        style: {
          freestyle: {
            textAlign: <span class="hljs-string">'center'</span>,
            fontSize: <span class="hljs-number">200</span>
          }
        }
      }
    },
    children: [{
      <span class="hljs-keyword">ta</span><span class="hljs-variable">g:</span> <span class="hljs-string">''</span>,
      tex<span class="hljs-variable">t:</span> <span class="hljs-string">'文字'</span>
    }]
  }]
}</code></pre>
<p>有了统一的 VNode 节点，各端即可根据自己的方法解析渲染原生UI了，之前的所有操作都是一致的，包括文件格式、打包编译过程、模板指令、组件的生命周期、数据绑定等。</p>
<p>然而由于目标执行环境不同（浏览器和 Weex 容器），在渲染真实原生 UI 的时候调用的接口也不同。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011150046" src="https://static.alili.tech/img/remote/1460000011150046" alt="" title="" style="cursor: pointer;"></span></p>
<p>此过程发生在【Weex SDK】的【Weex Runtime】中。</p>
<p>最总【Weex Runtime】发起渲染指令<code>callNative({...})</code>有RenderEngine完成渲染</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011150047" src="https://static.alili.tech/img/remote/1460000011150047" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011150048" src="https://static.alili.tech/img/remote/1460000011150048" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader35">总结一下</h2>
<ul>
<li>Weex 文件分包打包成单个 JSBundle 文件</li>
<li>发布到发包服务器上，通过热更新 push 到用户的客户端，交由【Weex SDK】执行解析</li>
<li>SDK 中的【JS Framework】执行 Bundle 脚本生成 Virtual DOM</li>
<li>Virtual DOM 经由各端执行环境【Weex Runtime】解析翻译成执行指令</li>
<li>【Native RenderEngine】接收到指令后执行渲染操作，作出渲染出完整的界面</li>
</ul>
<p>官方配图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011150049" src="https://static.alili.tech/img/remote/1460000011150049" alt="" title="" style="cursor: pointer;"></span></p>
<p>扩充配图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011150050" src="https://static.alili.tech/img/remote/1460000011150050" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader36">Weex 的工作模式</h1>
<h2 id="articleHeader37">1. 全页模式</h2>
<p>目前支持单页使用或整个 App 使用 Weex 开发（还不完善，需要开发 Router 和生命周期管理）。</p>
<p>本文先行的严选 demo 便是使用第二种全屏模式，使用 Weex 开发整个 App，期间触碰到 Weex 的在此模式下诸多不足，如 StatusBar 控制、Tab 切换、开场动画自定义、3DTouch、 Widget 等等原生的特色功能没有现成的 API，需要我们自己扩展，甚至扩展不了。因此并不能完全“灭掉”原生。</p>
<p>所以，目前在阿里内部使用较多的是此模式中的单页模式，这也是为什么官方文档在介绍原理后就直接奔入<strong>集成到原生应用</strong>的主题上去了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011150051" src="https://static.alili.tech/img/remote/1460000011150051" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader38">2. Native Component 模式</h2>
<p>把 Weex 当作一个 iOS/Android 组件来使用，类比 ImageView。这类需求遍布手淘主链路，如首页、主搜结果、交易组件化等，这类 Native 页面主体已经很稳定，但是局部动态化需求旺盛导致频繁发版，解决这类问题也是 Weex 的重点。</p>
<h2 id="articleHeader39">3. H5 Component 模式</h2>
<p>在 H5 种使用 Weex，类比 WVC。一些较复杂或特殊的 H5 页面短期内无法完全转为 Weex 全页模式（或RN），比如互动类页面、一些复杂频道页等。这个痛点的解决办法是：在现有的H5页面上做微调，引入Native 解决长列表内存暴增、滚动不流畅、动画/手势体验差等问题。</p>
<p>另外，WVC 将会融入到 Weex 中，成为 Weex 的 H5 Components 模式。</p>
<h1 id="articleHeader40">严选 App Demo 实现过程中的感想</h1>
<h2 id="articleHeader41">Vue-Router &amp; Tab</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011150052" src="https://static.alili.tech/img/remote/1460000011150052" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>由于 Weex 没有封装 Tab 的组件，因此笔者使用了很多方法来实现Tab切换的功能。</p>
<p>1、vue-router：router 思想方便管理，但是每次切换都是新的实例，没有tab模式<br>2、opacity、visablity：此处需要注意，Weex的渲染机制和web是有区别的，对夫层设置 opacity 或者visiablity隐藏是无法同时隐藏定位为<code>position:fixed;</code> 的子元素。<br>3、position、transform：改变 tab 层的位置，此方法在定位为 <code>position:fixed;</code> 的子元素上依然无效。</p>
<h2 id="articleHeader42">image &amp; iconfont</h2>
<p>Weex 中所有的静态资源基本都是网络资源，包括图片、字体图片等，所以使用 iconfont 图标是再合适不过的了。</p>
<p>此 demo 中所有的 icon 均使用 的iconfont。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011150053" src="https://static.alili.tech/img/remote/1460000011150053" alt="" title="" style="cursor: pointer;"></span></p>
<p>此处强烈推荐一个站点 <a href="http://www.iconfont.cn" rel="nofollow noreferrer" target="_blank">www.iconfont.cn</a>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011150054" src="https://static.alili.tech/img/remote/1460000011150054" alt="" title="" style="cursor: pointer;"></span></p>
<p>在此平台你可以找到几乎所有你需要的 icon，你也可以上传自己的 icon 到自己创建的项目中。同时该系统还提供生成ttf、woff 资源，并且做了 cdn 加速和 gzip 压缩，是不是跟 Weex很配呢？</p>
<p>不过也有风险，就是，如果哪天阿里不在维护并回收该平台的资源了，你的 app 可能就会变成这样，全是方框，或者 padding 掉你 H5 的页面</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011150055" src="https://static.alili.tech/img/remote/1460000011150055" alt="" title="" style="cursor: pointer;"></span></p>
<p>当然，这种及情况出现的几率很小，如果你是一个大公司，你手上有更好的资源急速方案，那就自己保存吧。</p>
<h2 id="articleHeader43">webview</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011150056" src="https://static.alili.tech/img/remote/1460000011150056" alt="" title="" style="cursor: pointer;"></span></p>
<p>UIWebView是我们开发App常用的一个控件，不过Weex帮我们封装好的API明显时不够用的，目前只有<code>pagestart </code>、<code>pagefinish </code>、<code>error </code>，并没有封装像RN那样的<code>onShouldStartLoadWithRequest</code>拦截地址请求的API，在我看来，这有些不合理，并不清楚轮子的制造者是什么意图。</p>
<h2 id="articleHeader44">性能</h2>
<p>性能是一个大课题，在此就不做展开了，只稍微提及一些我们开发需要注意的几点</p>
<ul>
<li>性能影响点：UI更新&gt;UI事件响应&gt;后台运算</li>
<li>合理优化过场&amp;动画，过场和 console 容易引起 app crash 需要注意</li>
<li>降低 js &lt;-&gt; native 的通信频率</li>
<li>优化list结构，降低重排重绘压力</li>
<li>把优先级低且耗时较长的工作推后处理</li>
</ul>
<h2 id="articleHeader45">Weex 的现状</h2>
<h3 id="articleHeader46">Weex 解决了的</h3>
<h4>我的发布我做主（热更新）</h4>
<p>脚本语言天生自带“热更新”，Weex 针对 React Native 的热更新策略做了优化，将 WeexSDK 事先绑到了客户端上，并且对 JSBundle 进行分包增量更新，大大提高了热更新的效率。</p>
<p>但优点也是缺点，如果新包依赖于心的 SDK，此情况下，我们需要发布还有新 SDK 的 app 到应用市场，用户也须从市场更新此 app。不够随着 WeexSDK 版本的稳定后，相信此策略的优势就会凸显出来。</p>
<h4>性能问题</h4>
<p>Weex 是一种轻量级、可扩展、高性能框架。集成也很方便，可以直接在 HTML5 页面嵌入，也可嵌在原生UI中。由于和 React Native 一样，都会调用 Native 端的原生控件，所以在性能上比 Hybrid 高出一个层次。</p>
<h4>统一三端</h4>
<p>虽说这是一个大胆的实践，但对于大前端社区的统一有着推动作用，显然阿里在这一方面已经迈出了第一步。基本解决了三端同等需求导致资源浪费的痛点。</p>
<p>但后期可能会出现这种现象，开发一个三端的 App 会从原来的个人变成四个人，多出来的那一个人负责开发 Weex 单页。</p>
<p>意思就是，三端统一的不够彻底，但就目前的环境下，这一句是最优方案了，却是提高了开发效率。大前端将来将如何一统三国我们且行且观望吧。</p>
<h4>做游戏</h4>
<p>对于一些交互视觉统一且没有很大的性能需求的游戏，Weex 还是可以胜任的。</p>
<p>近期笔者将尝试发布一款纯Weex构建的益智小游戏，敬请期待。</p>
<p>朋友们可以用这个demo体验下 <a href="https://yq.aliyun.com/articles/42627?spm=5176.100239.blogcont57995.19.OsYCTt" rel="nofollow noreferrer" target="_blank">Weex 版扫雷游戏开发</a></p>
<h3 id="articleHeader47">Weex “暂时”放弃的</h3>
<p>虽然说大一统事件百利的事，但并非无一害。</p>
<h4>差异化</h4>
<p>对于一些有差异化完美体验追求的项目就只能收敛或者放弃了。</p>
<h4>独立的 bug 修复</h4>
<p>对于三端同时上线，一端存在 bug 的情况，Weex 并不能保证做到牵一发而不动全身。</p>
<h4>个性化功能</h4>
<p>比如安卓的波纹按钮、3DTouch、 Widget、iWatch版本等，目前这些功能还是没有的，不知道以后 Weex<br> 是否将其加入到官方文档中。</p>
<h1 id="articleHeader48">声明</h1>
<p>以上均为个人见解，不代表官方。如有不当之处还望指正。</p>
<h1 id="articleHeader49">参考</h1>
<p>[ 1 ] <a>Weex官方文档</a> - <a href="http://weex.apache.org/cn/references/" rel="nofollow noreferrer" target="_blank">http://weex.apache.org/cn/references/</a><br>[ 2 ] <a href="https://yq.aliyun.com/users/1429056118386139" rel="nofollow noreferrer" target="_blank">场景研读</a> - <a href="https://yq.aliyun.com/articles/69005" rel="nofollow noreferrer" target="_blank">Native 性能稳定性极致优化 - https://yq.aliyun.com/articles/69005</a><br>[ 3 ] <a href="https://yq.aliyun.com/users/1860372613355779" rel="nofollow noreferrer" target="_blank">门柳</a> - <a href="https://yq.aliyun.com/articles/59935?spm=5176.8067842.tagmain.66.1QA1fL" rel="nofollow noreferrer" target="_blank">详解 Weex JS Framework 的编译过程 - https://yq.aliyun.com/articles/59935?spm=5176.8067842.tagmain.66.1QA1fL</a><br>[ 4 ] <a href="https://segmentfault.com/u/alibaichuan">阿里百川</a> - <a href="https://segmentfault.com/a/1190000005031818" target="_blank">深度揭秘阿里移动端高性能动态化方案Weex - https://segmentfault.com/a/1190000005031818</a><br>[ 5 ] <a href="http://www.jianshu.com/u/12201cdd5d7a" rel="nofollow noreferrer" target="_blank">一缕殇流化隐半边冰霜</a> - <a href="http://www.jianshu.com/p/41cde2c62b81" rel="nofollow noreferrer" target="_blank">Weex 是如何在 iOS 客户端上跑起来的 - http://www.jianshu.com/p/41cde2c62b81</a></p>
<blockquote>转载请标明出处<br>作者：<a href="https://github.com/zwwill" rel="nofollow noreferrer" target="_blank">木羽 zwwill</a><br>首发地址：<a href="https://github.com/zwwill/blog/issues/11" rel="nofollow noreferrer" target="_blank">https://github.com/zwwill/blo...</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
网易严选App感受Weex开发（已完结）

## 原文链接
[https://segmentfault.com/a/1190000011027225](https://segmentfault.com/a/1190000011027225)

