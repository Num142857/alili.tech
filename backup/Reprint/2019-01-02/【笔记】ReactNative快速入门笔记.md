---
title: '【笔记】ReactNative快速入门笔记' 
date: 2019-01-02 2:30:08
hidden: true
slug: 9engzcqzqjo
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000010989350" src="https://static.alili.tech/img/remote/1460000010989350" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>ReactNative的文档地址有多个，如果你英文够好，就去研读<a href="http://facebook.github.io/react-native/docs/getting-started.html" rel="nofollow noreferrer" target="_blank">官方的文档</a>吧，<br>如果读原文比较吃力，<a href="http://reactnative.cn/docs/0.45/getting-started.html" rel="nofollow noreferrer" target="_blank">中文官网</a>也是不错的选择。</p></blockquote>
<p><em>下面是我个人记录的一些笔记，仅供初学者入门参考</em></p>
<h1 id="articleHeader0">预科</h1>
<p>入门React Native前需要了解一下知识，这样能帮助你更快的掌握RN<br>Node：<a href="http://www.runoob.com/nodejs/nodejs-tutorial.html" rel="nofollow noreferrer" target="_blank">Node.js 教程</a><br>ReactJS：<a href="http://www.ruanyifeng.com/blog/2015/03/react.html" rel="nofollow noreferrer" target="_blank">《React 入门实例教程》</a><br>ES6：<a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">《ECMAScript 6 入门》</a></p>
<h1 id="articleHeader1">环境</h1>
<h2 id="articleHeader2">系统环境要求</h2>
<p>IOS : <code>MacOS</code>, <code>黑苹果</code><br>Android :<code>MacOS</code>,  <code>Linux</code>, <code>Windows</code></p>
<h2 id="articleHeader3">配置</h2>
<p>所有的技术学习都应该从环境搭建开始，这里也没什么好总结的，最好的方法就是跟着<a href="http://reactnative.cn/docs/0.45/getting-started.html#content" rel="nofollow noreferrer" target="_blank">官网指导配置环境</a><br>如果你是node的老手，那就直接动手安装以下环境吧：</p>
<ul>
<li>node</li>
<li>npm</li>
<li>react-native-cli</li>
<li>Xcode<br>安装Xcode IDE和Xcode的命令行工具（IOS开发依赖）</li>
<li>Android Studio<br><strong>下载必须的插件：</strong>
</li>
</ul>
<p>a) JDK1.8+<br>b) Show Package Details<br>c) Android SDK Build Tools <strong>（指定23.0.1版本）</strong><br>d) Android Support Repository<br><strong>配置基础环境：</strong><br>a) ANDROID_HOME （如运行是遇到问题可参考此文<a href="http://www.jianshu.com/p/a77396301b22" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/a77396301b22</a>）<br>b) JAVA_HOME</p>
<h2 id="articleHeader4">测试</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="react-native init RNDemo
cd RNDemo
react-native run-ios" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>react-<span class="hljs-keyword">native</span> init RNDemo
cd RNDemo
react-<span class="hljs-keyword">native</span> run-ios</code></pre>
<p>如果你的虚拟机启动了，那么恭喜你，你的环境已经配置成功！<br>如果运行报错，可以文章最后找寻解决方案。<br><span class="img-wrap"><img data-src="/img/remote/1460000010989351" src="https://static.alili.tech/img/remote/1460000010989351" alt="虚拟机启动界面" title="虚拟机启动界面" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader5">语法</h1>
<p>首先需要了解一些基本的React的概念，比如JSX语法、组件、state状态以及props属性。<br>还需要掌握一些React Native特有的知识，比如原生组件的使用。</p>
<blockquote><p>教程上的东西我就不多说了，<a href="http://reactnative.cn/docs/0.45/getting-started.html" rel="nofollow noreferrer" target="_blank">官方文档</a>上有详细的讲解</p></blockquote>
<p>直接从代码上讲解新手注意点吧</p>
<h2 id="articleHeader6">Hello World</h2>
<p>传统惯例，入门先行，Hello World</p>
<p><em>你可以新建一个项目，然后用上面的代码覆盖你的index.ios.js或是index.android.js 文件，然后运行看看。</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text } from 'react-native';
class HelloWorldApp extends Component {
  render() {
    return (
      <Text style={styles.red}>Hello world!</Text>
    );
  }
}
const styles = StyleSheet.create({
  red: {
    color: 'red',
    fontWeight: 'bold',
  }
});
// 注意，这里用引号括起来的'HelloWorldApp'必须和你init创建的项目名一致
AppRegistry.registerComponent('HelloWorldApp', () => HelloWorldApp);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t';
<span class="hljs-keyword">import</span> { <span class="hljs-type">AppRegistry</span>, <span class="hljs-type">StyleSheet</span>, <span class="hljs-type">Text</span> } from <span class="hljs-symbol">'react</span>-native';
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloWorldApp</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;<span class="hljs-type">Text</span> style={styles.red}&gt;<span class="hljs-type">Hello</span> world!&lt;/<span class="hljs-type">Text</span>&gt;
    );
  }
}
const styles = <span class="hljs-type">StyleSheet</span>.create({
  red: {
    color: <span class="hljs-symbol">'re</span>d',
    fontWeight: <span class="hljs-symbol">'bol</span>d',
  }
});
<span class="hljs-comment">// 注意，这里用引号括起来的'HelloWorldApp'必须和你init创建的项目名一致</span>
<span class="hljs-type">AppRegistry</span>.registerComponent(<span class="hljs-symbol">'HelloWorldAp</span>p', () =&gt; <span class="hljs-type">HelloWorldApp</span>);</code></pre>
<p>从语法上看，RN和ReactJS语法区别不大，都是采用JSX和ES6的形式，如果你对ReactJS和ES6不熟悉，建议你先拜读下阮一峰的博文教程：<a href="http://www.ruanyifeng.com/blog/2015/03/react.html" rel="nofollow noreferrer" target="_blank">《React 入门实例教程》</a>，<a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">《ECMAScript 6 入门》</a></p>
<p>相较写Web App，区别在于RN的语法引入了原生的组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { AppRegistry, StyleSheet, Text } from 'react-native';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs capnproto"><code class="jsx" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> { AppRegistry, StyleSheet, <span class="hljs-built_in">Text</span> } <span class="hljs-keyword">from</span> 'react-native';</code></pre>
<p>RN中虽然使用JS写原生UI，但不再使用常规HTML标签 <code>&lt;div&gt;</code> 或是 <code>&lt;span&gt;</code> ，而是使用RN的组件 <code>&lt;Text&gt;</code><br><code>AppRegistry</code> 模块写在index.ios.js或是index.android.js文件里，用来告知React Native哪一个组件被注册为整个应用的根容器，一般一个应用只运行一次。</p>
<p>仅仅使用props和基础的View、Text、Image以及TextInput组件，就足以编写各式各样的UI组件了</p>
<h2 id="articleHeader7">样式</h2>
<p>按照JSX的语法要求使用了驼峰命名法：</p>
<ul>
<li>font-weight -&gt; fontWeight</li>
<li>background-color -&gt; backgroundColor</li>
</ul>
<p>React Native中的尺寸都是无单位的，表示的是与设备像素密度无关的逻辑像素点：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<View style="{{"width: 50, height: 50, backgroundColor: 'powderblue'"}}" />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">View</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"width:</span> <span class="hljs-attr">50</span>, <span class="hljs-attr">height:</span> <span class="hljs-attr">50</span>, <span class="hljs-attr">backgroundColor:</span> '<span class="hljs-attr">powderblue</span>'"}}" /&gt;</span></code></pre>
<h2 id="articleHeader8">事件</h2>
<p>事件的注册跟ReactJS没什么区别</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyButton extends Component {
  _onPressButton() {
    console.log(&quot;You tapped the button!&quot;);
  }

  render() {
    return (
      <TouchableHighlight onPress={this._onPressButton}>
        <Text>Button</Text>
      </TouchableHighlight>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyButton</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  _onPressButton() {
    console.log(<span class="hljs-string">"You tapped the button!"</span>);
  }

  render() {
    <span class="hljs-keyword">return</span> (
      &lt;<span class="hljs-type">TouchableHighlight</span> onPress={<span class="hljs-keyword">this</span>._onPressButton}&gt;
        &lt;<span class="hljs-type">Text</span>&gt;<span class="hljs-type">Button</span>&lt;/<span class="hljs-type">Text</span>&gt;
      &lt;/<span class="hljs-type">TouchableHighlight</span>&gt;
    );
  }
}</code></pre>
<p>此处注册的组件为<code>TouchableHighlight</code>，具体使用哪种组件，取决于你希望给用户什么样的视觉反馈</p>
<ul>
<li>一般来说，你可以使用<a href="http://reactnative.cn/docs/0.45/touchablehighlight.html" rel="nofollow noreferrer" target="_blank"><strong>TouchableHighlight</strong></a>来制作按钮或者链接。注意此组件的背景会在用户手指按下时变暗。</li>
<li>在Android上还可以使用<a href="http://reactnative.cn/docs/0.45/touchablenativefeedback.html" rel="nofollow noreferrer" target="_blank"><strong>TouchableNativeFeedback</strong></a>，它会在用户手指按下时形成类似墨水涟漪的视觉效果。</li>
<li>
<a href="http://reactnative.cn/docs/0.45/touchableopacity.html" rel="nofollow noreferrer" target="_blank"><strong>TouchableOpacity</strong></a>会在用户手指按下时降低按钮的透明度，而不会改变背景的颜色。</li>
<li>如果你想在处理点击事件的同时不显示任何视觉反馈，则需要使用<a href="http://reactnative.cn/docs/0.45/touchablewithoutfeedback.html" rel="nofollow noreferrer" target="_blank"><strong>TouchableWithoutFeedback</strong></a>。</li>
</ul>
<p>常用的事件有：<br>点击：onPress<br>长按：onLongPress<br>缩放：maximumZoomScale，minimumZoomScale</p>
<blockquote><p>另外关于Props、State、样式、布局、事件等知识点的详解，<a href="http://reactnative.cn/docs/0.45/getting-started.html" rel="nofollow noreferrer" target="_blank">官方文档</a>上都有详细的讲解，比较基础，这里就不做介绍了</p></blockquote>
<h1 id="articleHeader9">跨平台</h1>
<blockquote><p>'Learn Once,Write Anywhere' and not 'Write Once,Running Anywhere'.</p></blockquote>
<p>RN并不能算上是真正的跨平台的语言，虽然可以通过打包实现不同平台打包不同组件，但是有些组件需要我们针对不同平台编写不同代码。这就要求我们不用储备一些原生开发的知识。</p>
<h1 id="articleHeader10">工作原理</h1>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010989352" src="https://static.alili.tech/img/remote/1460000010989352" alt="通信示意图" title="通信示意图" style="cursor: pointer; display: inline;"></span><br>RN的本质是在两个模块之间搭建双向桥梁，让他们可以相互调用和响应，简单的示意图为<br><span class="img-wrap"><img data-src="/img/remote/1460000010989353" src="https://static.alili.tech/img/remote/1460000010989353" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader11">Native模块</h2>
<p>运行在主线程上(可能会有些独立的后台线程处理运算，当前讨论中可忽略) <br>iOS平台上运行Object-C/Swift代码，Android平台上运行Java/Kotlin代码 <br>负责处理UI的渲染，事件响应。</p>
<h2 id="articleHeader12">JS模块</h2>
<p>运行在JS引擎的JS线程上 <br>运行JS代码 <br>负责处理业务逻辑，还包括了应该显示哪个界面，以及如何给页面加样式。</p>
<h2 id="articleHeader13">Bridge模块</h2>
<p>Native和JS模块之间不能直接通信，只能通过Bridge做序列化和反序列化，查找模块，调用模块等各种逻辑，最终反应到应用上</p>
<h1 id="articleHeader14">性能</h1>
<p>使用React Native替代基于WebView的框架，使App刷新可以达到每秒60帧（足够流畅），并且能有类似原生App的外观和手感，虽然RN框架已经提供了这个平衡的能力，但平衡点的选择却掌握在开发者手中，即便是Native也无法避免开发方式带来的性能消耗</p>
<h2 id="articleHeader15">性能影响原因</h2>
<p>业务逻辑运行在JS线程上，负责API的调用，事件的处理，状态的更新，而事件的响应UI的变化发生在主线程上，60帧/s的频率要求每一帧的响应处理只有16.67(1000/60)ms，如果超过了16.67ms就会发生丢帧，如果丢帧超过100ms就会产生明显的卡顿现象。所有降低每一帧运算的消耗才能提升性能。</p>
<h2 id="articleHeader16">性能影响切面</h2>
<p><strong>UI事件响应：</strong> 性能影响小<br><strong>UI更新：</strong> JS侧会向Native侧同步大量的UI结构和数据，界面复杂、变动数据大，或者做动画、变动频繁，容易出现性能问题。<br><strong>UI事件响应和UI更新同时出现：</strong> 两种事件如果占用了过多的线程，就会导致另一种事件不能及时响应，表现在应用上就是卡顿</p>
<h2 id="articleHeader17">常见影响性能的点</h2>
<p>console，ListView，动画Animated</p>
<h1 id="articleHeader18">性能优化</h1>
<p>经过多年的发展和优化，JS和Native可以在各自的模块线程高效迅速的运行，性能的瓶颈主要在Bridge模块上，尤其是在JS和Native模块间频繁的调用会导致Bridge压力过大，产生卡顿</p>
<ol>
<li>利用React自带的Virtual Dom的Diff算法尽量减少需要同步的数据，<strong>合理利用setState方法</strong>
</li>
<li>在遇到动画性能问题时，可以<strong>使用Annimated类的库</strong>，一次性把如何变化的声明发送到Native侧，Native侧根据接收到的声明自己负责接下来的UI更新。不需要每帧的UI变化都同步一次数据。</li>
<li>Native和JS混编，把会大量变化的组件做成<strong>Native组件</strong>
</li>
<li>遇到UI事件响应和UI更新同时，可以使用<strong>Interaction Manager</strong>把那些耗时较长的<strong>工作安排到所有互动或动画完成之后再进行</strong>
</li>
</ol>
<h1 id="articleHeader19">App高性能开发引导</h1>
<p>RN的开发并没有一种高质量产出的方法，因为各个项目间有着不同的组件组合，因此只能通过高效的开发方式来尽可能的优化应用。<br>一般来说，通过几版优化都能达到“极致体验”的要求。<br>下面列一下高效开发方式的流水：</p>
<ol>
<li>
<strong>全JS实现</strong>，保证开发的高效率，高产出</li>
<li>发现问题<strong>先在JS测做优化</strong>，如上面提到的Annimated类库，Interaction Manager。</li>
<li>真机测试，找全问题再做处理，<strong>避免出现连锁bug</strong>
</li>
<li>JS测解决不了的问题再有<strong>Native组件</strong>完成。</li>
</ol>
<h1 id="articleHeader20">关于热更新</h1>
<h2 id="articleHeader21">原理</h2>
<p>1、RN是使用脚本语言来编写的，是的代码可以不用事先编译便可即读即运行<br>2、RN在发布时将代码资源打包成一个文件 bundle js文件<br>3、其他的基础插件不变，仅仅替换一个bundle文件就实现了热更新</p>
<h2 id="articleHeader22">流程</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010989354" src="https://static.alili.tech/img/remote/1460000010989354" alt="热更新的流程图" title="热更新的流程图" style="cursor: pointer;"></span></p>
<h2 id="articleHeader23">Rushy</h2>
<p>Rushy是国内RN团队自主研发的一套热更新包管理平台</p>
<h3 id="articleHeader24">Pushy的特点：</h3>
<ol>
<li>命令行工具&amp;网页双端管理，版本发布过程简单便捷，完全可以集成CI。</li>
<li>基于bsdiff算法创建的超小更新包，通常版本迭代后在1-10KB之间，避免数百KB的流量消耗。</li>
<li>支持崩溃回滚，安全可靠。</li>
<li>meta信息及开放API，提供更高扩展性。</li>
<li>跨越多个版本进行更新时，只需要下载一个更新包，不需要逐版本依次更新。</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010989355" src="https://static.alili.tech/img/remote/1460000010989355" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader25">社区</h1>
<p>RN同ReactJS一样，有着强大的社区，从RN版本更新的速度上就可以看出来<br><span class="img-wrap"><img data-src="/img/remote/1460000010989356" src="https://static.alili.tech/img/remote/1460000010989356" alt="发布序列表" title="发布序列表" style="cursor: pointer; display: inline;"></span><br>平均2个月一个版本</p>
<p>google的搜索结果也能说明RN的影响力</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010989357" src="https://static.alili.tech/img/remote/1460000010989357" alt="google搜索结果" title="google搜索结果" style="cursor: pointer; display: inline;"></span></p>
<p>开发者需要用到的组件在JS.Coach基本都可以找到。<br><span class="img-wrap"><img data-src="/img/remote/1460000010989358" src="https://static.alili.tech/img/remote/1460000010989358" alt="image.png" title="image.png" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader26">参考&amp;分享</h1>
<ul>
<li><a href="http://reactnative.com" rel="nofollow noreferrer" target="_blank">ReactNative 官方网站：http://reactnative.com</a></li>
<li><a href="http://reactnative.cn" rel="nofollow noreferrer" target="_blank">ReactNative 中文官方网站：http://reactnative.cn</a></li>
<li><a href="http://zhuanlan.51cto.com/art/201704/537115.htm" rel="nofollow noreferrer" target="_blank">React Native性能和效率平衡之谜：http://zhuanlan.51cto.com/art/201704/537115.htm</a></li>
<li><a href="http://blog.cnbang.net/tech/2698/" rel="nofollow noreferrer" target="_blank">React Native通信机制详解：http://blog.cnbang.net/tech/2698/</a></li>
<li><a href="http://www.jianshu.com/p/978c4bd3a759" rel="nofollow noreferrer" target="_blank">React Native 从入门到原理：http://www.jianshu.com/p/978c4bd3a759</a></li>
<li><a href="http://www.jianshu.com/p/fd4591a978ba" rel="nofollow noreferrer" target="_blank">React-Native学习指南：http://www.jianshu.com/p/fd4591a978ba</a></li>
<li><a href="http://www.jianshu.com/c/45054b9e38c7" rel="nofollow noreferrer" target="_blank">【简书专题】React Native开发经验集：http://www.jianshu.com/c/45054b9e38c7</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【笔记】ReactNative快速入门笔记

## 原文链接
[https://segmentfault.com/a/1190000010989345](https://segmentfault.com/a/1190000010989345)

