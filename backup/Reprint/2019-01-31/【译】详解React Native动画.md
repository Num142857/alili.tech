---
title: '【译】详解React Native动画' 
date: 2019-01-31 2:31:16
hidden: true
slug: xkevtl20zdi
categories: [reprint]
---

{{< raw >}}

                    
<p>大多数情况下，在 React Native 中创建动画是推荐使用 <a href="https://facebook.github.io/react-native/docs/animated.html" rel="nofollow noreferrer" target="_blank">Animated API</a> 的，其提供了三个主要的方法用于创建动画：</p>
<ol>
<li><p><strong>Animated.timing()</strong> -- 推动一个值按照一个过渡曲线而随时间变化。<code>Easing</code> 模块定义了很多缓冲曲线函数。</p></li>
<li><p><strong>Animated.decay()</strong> -- 推动一个值以一个初始的速度和一个衰减系数逐渐变为0。</p></li>
<li><p><strong>Animated.spring()</strong> -- 产生一个基于 <a href="http://facebook.github.io/rebound/" rel="nofollow noreferrer" target="_blank">Rebound</a> 和 <a href="https://facebook.github.io/origami/" rel="nofollow noreferrer" target="_blank">Origami</a> 实现的Spring动画。它会在 <code>toValue</code> 值更新的同时跟踪当前的速度状态，以确保动画连贯。</p></li>
</ol>
<blockquote><p>译者注：React Native(0.37) 目前只支持Animated.Text/Animated.View/Animated.Image</p></blockquote>
<p>以我的经验来看，<strong>Animated.timing()</strong> 和 <strong>Animated.spring()</strong> 在创建动画方面是非常有效的。</p>
<p>除了这三个创建动画的方法，对于每个独立的方法都有三种调用该动画的方式：</p>
<ol>
<li><p><strong>Animated.parallel()</strong> -- 同时开始一个动画数组里的全部动画。默认情况下，如果有任何一个动画停止了，其余的也会被停止。你可以通过<code>stopTogether</code> 选项来改变这个效果。</p></li>
<li><p><strong>Animated.sequence()</strong> -- 按顺序执行一个动画数组里的动画，等待一个完成后再执行下一个。如果当前的动画被中止，后面的动画则不会继续执行。</p></li>
<li><p><strong>Animated.stagger()</strong> -- 一个动画数组，里面的动画有可能会同时执行（重叠），不过会以指定的延迟来开始。</p></li>
</ol>
<h2 id="articleHeader0">1. Animated.timing()</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007615215" src="https://static.alili.tech/img/remote/1460000007615215" alt="timing" title="timing" style="cursor: pointer;"></span></p>
<p>第一个要创建的动画是使用 <code>Animated.timing</code> 创建的旋转动画。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Example implementation:
Animated.timing(
  someValue,
  {
    toValue: number,
    duration: number,
    easing: easingFunction,
    delay: number
  }
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">// Example implementation:</span>
Animated.timing(
  someValue,
  {
<span class="hljs-symbol">    toValue:</span> number,
<span class="hljs-symbol">    duration:</span> number,
<span class="hljs-symbol">    easing:</span> easingFunction,
<span class="hljs-symbol">    delay:</span> number
  }
)</code></pre>
<p>这种方式常用于创建需要loading指示的动画，在我使用React Native的项目中，这也是创建动画最有效的方式。这个理念也可以用于其它诸如按比例放大和缩小类型的指示动画。</p>
<p>开始之前，我们需要创建一个新的React Native 项目或者一个空的React Native项目。创建新项目之前，需要输入 <code>react-native init</code> 来初始化一个项目，并切换到该项目目录：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="react-native init animations
cd animations" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>react-<span class="hljs-keyword">native</span> init animations
cd animations</code></pre>
<p>然后打开 <code>index.android.js</code> 和 <code>index.ios.js</code>。</p>
<p>现在已经创建了一个新项目，则第一件事是在已经引入的 <strong>View</strong> 之后从 <code>react native</code> 中引入 <strong>Animated</strong>,<strong>Image</strong> 和 <strong>Easing</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Easing
} from 'react-native'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>import {
  AppRegistry,
  StyleSheet,
  <span class="hljs-built_in">Text</span>,
  View,
  Animated,
  <span class="hljs-built_in">Image</span>,
  Easing
} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-native'</span></code></pre>
<p><strong><a href="https://facebook.github.io/react-native/docs/animated.html" rel="nofollow noreferrer" target="_blank">Animated</a></strong> 是我们将用于创建动画的库，和React Native交互的载体。</p>
<p><strong>Image</strong> 用于在UI中显示图片。</p>
<p><strong>Easing</strong> 也是用React Native创建动画的载体，它允许我们使用已经定义好的各种缓冲函数，例如：<strong>linear</strong>, <strong>ease</strong>, <strong>quad</strong>, <strong>cubic</strong>, <strong>sin</strong>, <strong>elastic</strong>, <strong>bounce</strong>, <strong>back</strong>, <strong>bezier</strong>, <strong>in</strong>, <strong>out</strong>, <strong>inout</strong> 。由于有直线运动，我们将使用 <strong>linear</strong>。在这节(阅读)完成之后，对于实现直线运动的动画，你或许会有更好的实现方式。</p>
<p>接下来，需要在构造函数中初始化一个带动画属性的值用于旋转动画的初始值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor () {
  super()
  this.spinValue = new Animated.Value(0)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">constructor</span> <span class="hljs-params">()</span> <span class="hljs-comment">{
  super()
  this.spinValue = new Animated.Value(0)
}</span></span></code></pre>
<p>我们使用 <strong> Animated.Value</strong> 声明了一个 <strong>spinValue</strong> 变量，并传了一个 <strong>0</strong> 作为初始值。</p>
<p>然后创建了一个名为 <code>spin</code> 的方法，并在 <code>componentDidMount</code> 中调用它，目的是在 app 加载之后运行动画：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidMount () {
  this.spin()
}
spin () {
  this.spinValue.setValue(0)
  Animated.timing(
    this.spinValue,
    {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear
    }
  ).start(() => this.spin())
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">componentDidMount</span> () {
  <span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.spin</span>()
}
<span class="hljs-selector-tag">spin</span> () {
  <span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.spinValue</span><span class="hljs-selector-class">.setValue</span>(<span class="hljs-number">0</span>)
  <span class="hljs-selector-tag">Animated</span><span class="hljs-selector-class">.timing</span>(
    this.spinValue,
    {
      <span class="hljs-attribute">toValue</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attribute">duration</span>: <span class="hljs-number">4000</span>,
      <span class="hljs-attribute">easing</span>: Easing.linear
    }
  )<span class="hljs-selector-class">.start</span>(() =&gt; this.spin())
}</code></pre>
<p><code>spin()</code> 方法的作用如下：</p>
<ol>
<li><p>将 <strong>this.spinValue</strong> 重置成 0</p></li>
<li><p>调用 <strong>Animated.timing</strong> ，并驱动 <code>this.spinValue</code> 的值以 <code>Easing.linear</code> 的动画方式在 4000 毫秒从 0 变成 1。<strong>Animated.timing</strong> 需要两个参数，一个要变化的值(本文中是 <strong>this.spinValue</strong>) 和一个可配置对象。这个配置对象有四个属性：<strong>toValue</strong>(终值)、<strong>duration</strong>(一次动画的持续时间)、<strong>easing</strong>(缓存函数)和<strong>delay</strong>(延迟执行的时间)</p></li>
<li><p>调用 <strong>start()</strong>，并将 <strong>this.spin</strong> 作为回调传递给 <code>start</code>，它将在(一次)动画完成之后调用，这也是创建无穷动画的一种基本方式。<code>start()</code> 需要一个完成回调，该回调在动画正常的运行完成之后会被调用，并有一个参数是 <code>{finished: true}</code>，但如果动画是在它正常运行完成之前而被停止了(如：被手势动作或者其它动画中断)，则回调函数的参数变为 <code>{finished: false}</code>。</p></li>
</ol>
<blockquote><p>译者注：如果在回调中将动画的初始值设置成其终值，该动画就不会再执行。如将 this.spinValue.setValue(0) 改为 this.spinValue.setValue(1)，spin动画不会执行了</p></blockquote>
<p>现在方法已经创建好了，接下来就是在UI中渲染动画了。为了渲染动画，需要更新 <code>render</code> 方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render () {
  const spin = this.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })
  return (
    <View style={styles.container}>
      <Animated.Image
        style="{{"
          width: 227,
          height: 200,
          transform: [{rotate: spin}] "}}"
          source="{{"uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'"}}"
      />
    </View>
  )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>render () {
  <span class="hljs-keyword">const</span> spin = <span class="hljs-keyword">this</span>.spinValue.interpolate({
    <span class="hljs-attr">inputRange</span>: [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>],
    <span class="hljs-attr">outputRange</span>: [<span class="hljs-string">'0deg'</span>, <span class="hljs-string">'360deg'</span>]
  })
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">View</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styles.container}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Animated.Image</span>
        <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"</span>
          <span class="hljs-attr">width:</span> <span class="hljs-attr">227</span>,
          <span class="hljs-attr">height:</span> <span class="hljs-attr">200</span>,
          <span class="hljs-attr">transform:</span> [{<span class="hljs-attr">rotate:</span> <span class="hljs-attr">spin</span>}] "}}"
          <span class="hljs-attr">source</span>=<span class="hljs-string">"{{"uri:</span> '<span class="hljs-attr">https:</span>//<span class="hljs-attr">s3.amazonaws.com</span>/<span class="hljs-attr">media-p.slid.es</span>/<span class="hljs-attr">uploads</span>/<span class="hljs-attr">alexanderfarennikov</span>/<span class="hljs-attr">images</span>/<span class="hljs-attr">1198519</span>/<span class="hljs-attr">reactjs.png</span>'"}}"
      /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span>
  )
}</span></code></pre>
<ol>
<li><p>在 <code>render</code> 方法中，创建了一个 <strong>spin</strong> 变量，并调用了 <strong>this.spinValue</strong> 的 <strong>interpolate</strong> 方法。<strong>interpolate</strong> 方法可以在任何一个 <strong>Animated.Value</strong> 返回的实例上调用，该方法会在属性更新之前插入一个新值，如将 0~1 映射到 1~10。在我们的demo中，利用 <strong>interpolate</strong> 方法将数值 0~1 映射到了 0deg~360deg。我们传递了 <code>inputRange</code> 和 <code>outputRange</code> 参数给<strong>interpolate</strong> 方法，并分别赋值为 <strong>[0,1]</strong> 和 &amp;<strong>[‘0deg’, ‘360deg’]</strong>。</p></li>
<li><p>我们返回了一个带 <code>container</code> 样式值的 <strong>View</strong>和 带 <strong>height</strong>, <strong>width</strong>和 <strong>transform</strong> 属性的<strong>Animated.Image</strong>，并将 <strong>spin</strong> 的值赋给 <code>transform</code> 的 <strong>rotate</strong> 属性，这也是动画发生的地方：</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="transform: [{rotate: spin}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">transform:</span> [{<span class="hljs-string">rotate:</span> spin}]</code></pre>
<p>最后，在 <code>container</code> 样式中，使所有元素都居中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">const</span> <span class="hljs-string">styles</span> <span class="hljs-string">=</span> <span class="hljs-string">StyleSheet.create({</span>
<span class="hljs-attr">  container:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    flex:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span>
<span class="hljs-attr">    justifyContent:</span> <span class="hljs-string">'center'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    alignItems:</span> <span class="hljs-string">'center'</span>
  <span class="hljs-string">}</span>
<span class="hljs-string">})</span></code></pre>
<p>这个示例动画的最终代码在<a href="https://rnplay.org/apps/5TMGHg" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<h3 id="articleHeader1">关于Easing</h3>
<p><a href="https://github.com/facebook/react-native/blob/master/Libraries/Animated/src/Easing.js" rel="nofollow noreferrer" target="_blank">这是</a> <code>Easing</code> 模块的源码链接，从源码中可以看到每一个 easing 方法。</p>
<p>我创建了另外一个示例项目，里面包含了大部分 easing 动画的实现，可以供你参考，链接在<a href="https://rnplay.org/apps/CtoheQ" rel="nofollow noreferrer" target="_blank">这里</a>。(项目的运行截图)依据在下面：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007615216?w=300&amp;h=595" src="https://static.alili.tech/img/remote/1460000007615216?w=300&amp;h=595" alt="gist" title="gist" style="cursor: pointer; display: inline;"></span></p>
<p>该项目实现的 easing 动画在 RNPlay 的地址在<a href="https://rnplay.org/apps/CtoheQ" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<h2 id="articleHeader2">2. Animated.timing 示例</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007615217" src="https://static.alili.tech/img/remote/1460000007615217" alt="timing exam" title="timing exam" style="cursor: pointer; display: inline;"></span></p>
<p>上文已经说过了 <strong>Animated.timing</strong> 的基础知识，这一节会例举更多使用 <strong>Animated.timing</strong> 与 <strong>interpolate</strong> 结合实现的动画示例。</p>
<p>下一个示例中，会声明一个单一的动画值， <code>this.animatedValue</code> ，然后将该值和 <code>interpolate</code> 一起使用来驱动下列属性值的变化来创建复杂动画：</p>
<ol>
<li><p>marginLeft</p></li>
<li><p>opacity</p></li>
<li><p>fontSize</p></li>
<li><p>rotateX</p></li>
</ol>
<p>在开始之前，可以创建一个新分支或者清除上一个项目的旧代码。</p>
<p>第一件事是在构造函数中初始化一个需要用到的动画属性值:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor () {
  super()
  this.animatedValue = new Animated.Value(0)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">constructor</span> <span class="hljs-params">()</span> <span class="hljs-comment">{
  super()
  this.animatedValue = new Animated.Value(0)
}</span></span></code></pre>
<p>接下来，创建一个名为<code>animate</code>的方法，并在 <strong>componentDidMount()</strong> 中调用该方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidMount () {
  this.animate()
}
animate () {
  this.animatedValue.setValue(0)
  Animated.timing(
    this.animatedValue,
    {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear
    }
  ).start(() => this.animate())
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">componentDidMount</span> () {
  <span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.animate</span>()
}
<span class="hljs-selector-tag">animate</span> () {
  <span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.animatedValue</span><span class="hljs-selector-class">.setValue</span>(<span class="hljs-number">0</span>)
  <span class="hljs-selector-tag">Animated</span><span class="hljs-selector-class">.timing</span>(
    this.animatedValue,
    {
      <span class="hljs-attribute">toValue</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attribute">duration</span>: <span class="hljs-number">2000</span>,
      <span class="hljs-attribute">easing</span>: Easing.linear
    }
  )<span class="hljs-selector-class">.start</span>(() =&gt; this.animate())
}</code></pre>
<p>在 <code>render</code> 方法中，我们创建 5 个不同的插值变量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render () { 
  const marginLeft = this.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300]
  })
  const opacity = this.animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0]
  })
  const movingMargin = this.animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 300, 0]
  })
  const textSize = this.animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [18, 32, 18]
  })
  const rotateX = this.animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '180deg', '0deg']
  })
...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>render () { 
  <span class="hljs-keyword">const</span> marginLeft = <span class="hljs-keyword">this</span>.animatedValue.interpolate({
    inputRange: [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>],
    outputRange: [<span class="hljs-number">0</span>, <span class="hljs-number">300</span>]
  })
  <span class="hljs-keyword">const</span> opacity = <span class="hljs-keyword">this</span>.animatedValue.interpolate({
    inputRange: [<span class="hljs-number">0</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">1</span>],
    outputRange: [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>]
  })
  <span class="hljs-keyword">const</span> movingMargin = <span class="hljs-keyword">this</span>.animatedValue.interpolate({
    inputRange: [<span class="hljs-number">0</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">1</span>],
    outputRange: [<span class="hljs-number">0</span>, <span class="hljs-number">300</span>, <span class="hljs-number">0</span>]
  })
  <span class="hljs-keyword">const</span> <span class="hljs-built_in">textSize</span> = <span class="hljs-keyword">this</span>.animatedValue.interpolate({
    inputRange: [<span class="hljs-number">0</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">1</span>],
    outputRange: [<span class="hljs-number">18</span>, <span class="hljs-number">32</span>, <span class="hljs-number">18</span>]
  })
  <span class="hljs-keyword">const</span> <span class="hljs-built_in">rotateX</span> = <span class="hljs-keyword">this</span>.animatedValue.interpolate({
    inputRange: [<span class="hljs-number">0</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">1</span>],
    outputRange: [<span class="hljs-string">'0deg'</span>, <span class="hljs-string">'180deg'</span>, <span class="hljs-string">'0deg'</span>]
  })
...
}</code></pre>
<p><strong>interpolate</strong> 是一个很强大的方法，允许我们用多种方式来使用单一的动画属性值：<strong>this.animatedValue</strong>。因为 <code>this.animatedValue</code> 只是简单的从0变到1，因而我们能将这个值插入到 opacity、margins、text sizes 和 rotation 等样式属性中。</p>
<p>最后，返回实现了上述变量的 Animated.View 和 Animated.Text 组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return (
    <View style={styles.container}>
      <Animated.View
        style="{{"
          marginLeft,
          height: 30,
          width: 40,
          backgroundColor: 'red'"}}" />
      <Animated.View
        style="{{"
          opacity,
          marginTop: 10,
          height: 30,
          width: 40,
          backgroundColor: 'blue'"}}" />
      <Animated.View
        style="{{"
          marginLeft: movingMargin,
          marginTop: 10,
          height: 30,
          width: 40,
          backgroundColor: 'orange'"}}" />
      <Animated.Text
        style="{{"
          fontSize: textSize,
          marginTop: 10,
          color: 'green'"}}" >
          Animated Text!
      </Animated.Text>
      <Animated.View
        style="{{"
          transform: [{rotateX}],
          marginTop: 50,
          height: 30,
          width: 40,
          backgroundColor: 'black'"}}">
        <Text style="{{"color: 'white'"}}">Hello from TransformX</Text>
      </Animated.View>
    </View>
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>return (
    &lt;View style={styles.container}&gt;
      &lt;Animated<span class="hljs-selector-class">.View</span>
        style="{{"
          marginLeft,
          <span class="hljs-attribute">height</span>: <span class="hljs-number">30</span>,
          <span class="hljs-attribute">width</span>: <span class="hljs-number">40</span>,
          backgroundColor: <span class="hljs-string">'red'</span>"}}" /&gt;
      &lt;Animated<span class="hljs-selector-class">.View</span>
        style="{{"
          <span class="hljs-attribute">opacity</span>,
          marginTop: <span class="hljs-number">10</span>,
          <span class="hljs-attribute">height</span>: <span class="hljs-number">30</span>,
          <span class="hljs-attribute">width</span>: <span class="hljs-number">40</span>,
          backgroundColor: <span class="hljs-string">'blue'</span>"}}" /&gt;
      &lt;Animated<span class="hljs-selector-class">.View</span>
        style="{{"
          marginLeft: movingMargin,
          marginTop: <span class="hljs-number">10</span>,
          <span class="hljs-attribute">height</span>: <span class="hljs-number">30</span>,
          <span class="hljs-attribute">width</span>: <span class="hljs-number">40</span>,
          backgroundColor: <span class="hljs-string">'orange'</span>"}}" /&gt;
      &lt;Animated<span class="hljs-selector-class">.Text</span>
        style="{{"
          fontSize: textSize,
          marginTop: <span class="hljs-number">10</span>,
          <span class="hljs-attribute">color</span>: <span class="hljs-string">'green'</span>"}}" &gt;
          Animated Text!
      &lt;/Animated.Text&gt;
      &lt;Animated<span class="hljs-selector-class">.View</span>
        style="{{"
          <span class="hljs-attribute">transform</span>: [{rotateX}],
          marginTop: <span class="hljs-number">50</span>,
          <span class="hljs-attribute">height</span>: <span class="hljs-number">30</span>,
          <span class="hljs-attribute">width</span>: <span class="hljs-number">40</span>,
          backgroundColor: <span class="hljs-string">'black'</span>"}}"&gt;
        &lt;Text style="{{"<span class="hljs-attribute">color</span>: <span class="hljs-string">'white'</span>"}}"&gt;Hello from TransformX&lt;/Text&gt;
      &lt;/Animated.View&gt;
    &lt;/View&gt;
)</code></pre>
<p>当然，也需要更新下 <code>container</code> 样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>const styles = StyleSheet.create({
<span class="hljs-symbol">  container:</span> {
<span class="hljs-symbol">    flex:</span> <span class="hljs-number">1</span>,
<span class="hljs-symbol">    paddingTop:</span> <span class="hljs-number">150</span>
  }
})</code></pre>
<p>这个示例动画的最终代码在<a href="https://rnplay.org/apps/k9Pfpw" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<h2 id="articleHeader3">3. Animated.spring()</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007615218" src="https://static.alili.tech/img/remote/1460000007615218" alt="sring" title="sring" style="cursor: pointer;"></span></p>
<p>接下来，我们将会使用 <strong>Animated.spring()</strong> 方法创建动画。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Example implementation:
Animated.spring(
    someValue,
    {
      toValue: number,
      friction: number
    }
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">// Example implementation:</span>
Animated.spring(
    someValue,
    {
<span class="hljs-symbol">      toValue:</span> number,
<span class="hljs-symbol">      friction:</span> number
    }
)</code></pre>
<p>我们继续使用上一个项目，并只需要更新少量代码就行。在构造函数中，创建一个 <strong>springValue</strong> 变量，初始化其值为0.3：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor () {
  super()
  this.springValue = new Animated.Value(0.3)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">constructor</span> <span class="hljs-params">()</span> <span class="hljs-comment">{
  super()
  this.springValue = new Animated.Value(0.3)
}</span></span></code></pre>
<p>然后，删除 <code>animated</code> 方法和<code>componentDidMount</code>方法，创建一个新的 <code>spring</code> 方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="spring () {
  this.springValue.setValue(0.3)
  Animated.spring(
    this.springValue,
    {
      toValue: 1,
      friction: 1
    }
  ).start()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">spring</span> () {
  <span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.springValue</span><span class="hljs-selector-class">.setValue</span>(<span class="hljs-number">0.3</span>)
  <span class="hljs-selector-tag">Animated</span><span class="hljs-selector-class">.spring</span>(
    this.springValue,
    {
      <span class="hljs-attribute">toValue</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attribute">friction</span>: <span class="hljs-number">1</span>
    }
  )<span class="hljs-selector-class">.start</span>()
}</code></pre>
<ol>
<li><p>将 <code>springValue</code> 的值重置为 0.3</p></li>
<li><p>调用 <code>Animated.spring</code> 方法，并传递两个参数：一个要变化的值和一个可配置对象。可配置对象的属性可以是下列的任何值：<strong>toValue</strong> (number), <strong>overshootClamping</strong> (boolean), <strong>restDisplacementThreshold</strong> (number), <strong>restSpeedThreshold</strong> (number), <strong>velocity</strong> (number), <strong>bounciness</strong> (number), <strong>speed</strong> (number), <strong>tension</strong>(number), 和 <strong>friction</strong> (number)。除了 <strong>toValue</strong> 是必须的，其他值都是可选的，但 <strong>friction</strong> 和 <strong>tension</strong> 能帮你更好地控制 spring 动画。</p></li>
<li><p>调用 <code>start()</code> 启动动画</p></li>
</ol>
<p>动画已经设置好了，我们将其放在 View 的click事件中，动画元素依然是之前使用过的 React logo 图片：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<View style={styles.container}>
  <Text
    style="{{"marginBottom: 100"}}"
    onPress={this.spring.bind(this)}>Spring</Text>
    <Animated.Image
      style="{{" width: 227, height: 200, transform: [{scale: this.springValue}] "}}"
      source="{{"uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'"}}"/>
</View>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">View</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styles.container}</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Text</span>
    <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"marginBottom:</span> <span class="hljs-attr">100</span>"}}"
    <span class="hljs-attr">onPress</span>=<span class="hljs-string">{this.spring.bind(this)}</span>&gt;</span>Spring<span class="hljs-tag">&lt;/<span class="hljs-name">Text</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Animated.Image</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"</span> <span class="hljs-attr">width:</span> <span class="hljs-attr">227</span>, <span class="hljs-attr">height:</span> <span class="hljs-attr">200</span>, <span class="hljs-attr">transform:</span> [{<span class="hljs-attr">scale:</span> <span class="hljs-attr">this.springValue</span>}] "}}"
      <span class="hljs-attr">source</span>=<span class="hljs-string">"{{"uri:</span> '<span class="hljs-attr">https:</span>//<span class="hljs-attr">s3.amazonaws.com</span>/<span class="hljs-attr">media-p.slid.es</span>/<span class="hljs-attr">uploads</span>/<span class="hljs-attr">alexanderfarennikov</span>/<span class="hljs-attr">images</span>/<span class="hljs-attr">1198519</span>/<span class="hljs-attr">reactjs.png</span>'"}}"/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span></code></pre>
<ol>
<li><p>我们返回一个Text组件，并将 <strong>spring()</strong> 添加到组件的onPress事件中</p></li>
<li><p>我们返回一个 <code>Animated.Image</code>，并为其 <code>scale</code> 属性添加 <code>this.springValue</code></p></li>
</ol>
<p>这个示例动画的最终代码在<a href="https://rnplay.org/apps/z4g5tw" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<h2 id="articleHeader4">4. Animated.parallel()</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007615219" src="https://static.alili.tech/img/remote/1460000007615219" alt="parallel" title="parallel" style="cursor: pointer;"></span></p>
<p><strong>Animated.parallel()</strong> 会同时开始一个动画数组里的全部动画。</p>
<p>先看一下这个api是怎么调用的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// API
Animated.parallel(arrayOfAnimations)
// In use:
Animated.parallel([
  Animated.spring(
    animatedValue,
    {
      //config options
    }
  ),
  Animated.timing(
     animatedValue2,
     {
       //config options
     }
  )
])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// API</span>
<span class="hljs-selector-tag">Animated</span><span class="hljs-selector-class">.parallel</span>(arrayOfAnimations)
<span class="hljs-comment">// In use:</span>
<span class="hljs-selector-tag">Animated</span><span class="hljs-selector-class">.parallel</span>([
  Animated.spring(
    animatedValue,
    {
      <span class="hljs-comment">//config options</span>
    }
  ),
  Animated.timing(
     animatedValue2,
     {
       <span class="hljs-comment">//config options</span>
     }
  )
])</code></pre>
<p>开始之前，我们先直接创建三个我们需要的动画属性值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor () {
  super()
  this.animatedValue1 = new Animated.Value(0)
  this.animatedValue2 = new Animated.Value(0)
  this.animatedValue3 = new Animated.Value(0)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">constructor</span> <span class="hljs-params">()</span> <span class="hljs-comment">{
  super()
  this.animatedValue1 = new Animated.Value(0)
  this.animatedValue2 = new Animated.Value(0)
  this.animatedValue3 = new Animated.Value(0)
}</span></span></code></pre>
<p>然后，创建一个 <code>animate</code> 方法并在 <strong>componendDidMount()</strong> 中调用它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidMount () {
  this.animate()
}
animate () {
  this.animatedValue1.setValue(0)
  this.animatedValue2.setValue(0)
  this.animatedValue3.setValue(0)
  const createAnimation = function (value, duration, easing, delay = 0) {
    return Animated.timing(
      value,
      {
        toValue: 1,
        duration,
        easing,
        delay
      }
    )
  }
  Animated.parallel([
    createAnimation(this.animatedValue1, 2000, Easing.ease),
    createAnimation(this.animatedValue2, 1000, Easing.ease, 1000),
    createAnimation(this.animatedValue3, 1000, Easing.ease, 2000)        
  ]).start()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>componentDidMount () {
  this.animate()
}
animate () {
  this<span class="hljs-selector-class">.animatedValue1</span><span class="hljs-selector-class">.setValue</span>(<span class="hljs-number">0</span>)
  this<span class="hljs-selector-class">.animatedValue2</span><span class="hljs-selector-class">.setValue</span>(<span class="hljs-number">0</span>)
  this<span class="hljs-selector-class">.animatedValue3</span><span class="hljs-selector-class">.setValue</span>(<span class="hljs-number">0</span>)
  const createAnimation = function (value, duration, easing, delay = <span class="hljs-number">0</span>) {
    return Animated.timing(
      value,
      {
        toValue: <span class="hljs-number">1</span>,
        duration,
        easing,
        delay
      }
    )
  }
  Animated.parallel([
    createAnimation(this<span class="hljs-selector-class">.animatedValue1</span>, <span class="hljs-number">2000</span>, Easing.ease),
    createAnimation(this<span class="hljs-selector-class">.animatedValue2</span>, <span class="hljs-number">1000</span>, Easing<span class="hljs-selector-class">.ease</span>, <span class="hljs-number">1000</span>),
    createAnimation(this<span class="hljs-selector-class">.animatedValue3</span>, <span class="hljs-number">1000</span>, Easing<span class="hljs-selector-class">.ease</span>, <span class="hljs-number">2000</span>)        
  ]).start()
}</code></pre>
<p>在 <code>animate</code> 方法中，我们将三个动画属性值重置为0。此外，还创建了一个 <strong>createAnimation</strong> 方法，该方法接受四个参数：value, duration, easing, delay(默认值是0)，返回一个新的动画。</p>
<p>然后，调用 <code>Animated.parallel()</code>，并将三个使用 <code>createAnimation</code> 创建的动画作为参数传递给它。</p>
<p>在 <code>render</code> 方法中，我们需要设置插值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render () {
  const scaleText = this.animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 2]
  })
  const spinText = this.animatedValue2.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg']
  })
  const introButton = this.animatedValue3.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 400]
  })
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>render () {
  const scaleText = this<span class="hljs-selector-class">.animatedValue1</span><span class="hljs-selector-class">.interpolate</span>({
    inputRange: [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>],
    outputRange: [<span class="hljs-number">0.5</span>, <span class="hljs-number">2</span>]
  })
  const spinText = this<span class="hljs-selector-class">.animatedValue2</span><span class="hljs-selector-class">.interpolate</span>({
    inputRange: [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>],
    outputRange: [<span class="hljs-string">'0deg'</span>, <span class="hljs-string">'720deg'</span>]
  })
  const introButton = this<span class="hljs-selector-class">.animatedValue3</span><span class="hljs-selector-class">.interpolate</span>({
    inputRange: [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>],
    outputRange: [-<span class="hljs-number">100</span>, <span class="hljs-number">400</span>]
  })
  ...
}</code></pre>
<ol>
<li><p><strong>scaleText</strong> -- 插值的输出范围是从0.5到2，我们会用这个值对文本按0.5到2的比例进行缩放</p></li>
<li><p><strong>spinText</strong> -- 插值的输出范围是 0 degrees 到 720 degrees，即将元素旋转两周</p></li>
<li><p><strong>introButton</strong> -- 插值的输出范围是 -100 到 400，该值会用于 View 的 margin 属性</p></li>
</ol>
<p>最后，我们用一个主 View 包裹三个 Animated.Views：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<View style={[styles.container]}>
  <Animated.View 
    style="{{" transform: [{scale: scaleText}] "}}">
    <Text>Welcome</Text>
  </Animated.View>
  <Animated.View
    style="{{" marginTop: 20, transform: [{rotate: spinText}] "}}">
    <Text
      style="{{"fontSize: 20"}}">
      to the App!
    </Text>
  </Animated.View>
  <Animated.View
    style="{{"top: introButton, position: 'absolute'"}}">
    <TouchableHighlight
      onPress={this.animate.bind(this)}
      style={styles.button}>
      <Text
        style="{{"color: 'white', fontSize: 20"}}">
        Click Here To Start
      </Text>
   </TouchableHighlight>
  </Animated.View>
</View>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">View</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{[styles.container]}</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Animated.View</span> 
    <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"</span> <span class="hljs-attr">transform:</span> [{<span class="hljs-attr">scale:</span> <span class="hljs-attr">scaleText</span>}] "}}"&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Text</span>&gt;</span>Welcome<span class="hljs-tag">&lt;/<span class="hljs-name">Text</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Animated.View</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Animated.View</span>
    <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"</span> <span class="hljs-attr">marginTop:</span> <span class="hljs-attr">20</span>, <span class="hljs-attr">transform:</span> [{<span class="hljs-attr">rotate:</span> <span class="hljs-attr">spinText</span>}] "}}"&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Text</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"fontSize:</span> <span class="hljs-attr">20</span>"}}"&gt;</span>
      to the App!
    <span class="hljs-tag">&lt;/<span class="hljs-name">Text</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Animated.View</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Animated.View</span>
    <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"top:</span> <span class="hljs-attr">introButton</span>, <span class="hljs-attr">position:</span> '<span class="hljs-attr">absolute</span>'"}}"&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">TouchableHighlight</span>
      <span class="hljs-attr">onPress</span>=<span class="hljs-string">{this.animate.bind(this)}</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">{styles.button}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Text</span>
        <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"color:</span> '<span class="hljs-attr">white</span>', <span class="hljs-attr">fontSize:</span> <span class="hljs-attr">20</span>"}}"&gt;</span>
        Click Here To Start
      <span class="hljs-tag">&lt;/<span class="hljs-name">Text</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">TouchableHighlight</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Animated.View</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span></code></pre>
<p>当 <code>animate()</code> 被调用时，三个动画会同时执行。</p>
<p>这个示例动画的最终代码在<a href="https://rnplay.org/apps/hGhBOA" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<h2 id="articleHeader5">5. Animated.Sequence()</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007615220" src="https://static.alili.tech/img/remote/1460000007615220" alt="sequence" title="sequence" style="cursor: pointer;"></span></p>
<p>先看一下这个api是怎么调用的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// API
Animated.sequence(arrayOfAnimations)
// In use
Animated.sequence([
  Animated.timing(
    animatedValue,
    {
      //config options
    }
  ),
  Animated.spring(
     animatedValue2,
     {
       //config options
     }
  )
])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// API</span>
<span class="hljs-selector-tag">Animated</span><span class="hljs-selector-class">.sequence</span>(arrayOfAnimations)
<span class="hljs-comment">// In use</span>
<span class="hljs-selector-tag">Animated</span><span class="hljs-selector-class">.sequence</span>([
  Animated.timing(
    animatedValue,
    {
      <span class="hljs-comment">//config options</span>
    }
  ),
  Animated.spring(
     animatedValue2,
     {
       <span class="hljs-comment">//config options</span>
     }
  )
])</code></pre>
<p>和 <strong>Animated.parallel()</strong> 一样， <strong>Animated.sequence()</strong> 接受一个动画数组。但不同的是，<strong>Animated.sequence()</strong> 是按顺序执行一个动画数组里的动画，等待一个完成后再执行下一个。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';

import {

  AppRegistry,

  StyleSheet,

  Text,

  View,

  Animated

} from 'react-native'

const arr = []

for (var i = 0; i < 500; i++) {

  arr.push(i)

}

class animations extends Component {



  constructor () {

    super()

    this.animatedValue = []

    arr.forEach((value) => {

      this.animatedValue[value] = new Animated.Value(0)

    })

  }

  componentDidMount () {

    this.animate()

  }

  animate () {

    const animations = arr.map((item) => {

      return Animated.timing(

        this.animatedValue[item],

        {

          toValue: 1,

          duration: 50

        }

      )

    })

    Animated.sequence(animations).start()

  }

  render () {

    const animations = arr.map((a, i) => {

      return <Animated.View key={i} style="{{"opacity: this.animatedValue[a], height: 20, width: 20, backgroundColor: 'red', marginLeft: 3, marginTop: 3"}}" />

    })

    return (

      <View style={styles.container}>

        {animations}

      </View>

    )

  }

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    flexDirection: 'row',

    flexWrap: 'wrap'

  }

})

AppRegistry.registerComponent('animations', () => animations);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">import</span> {

  AppRegistry,

  StyleSheet,

  Text,

  View,

  Animated

} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-native'</span>

const arr = []

<span class="hljs-keyword">for</span> (var i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">500</span>; i++) {

  arr.push(i)

}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">animations</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> {</span>



  constructor () {

    <span class="hljs-keyword">super</span>()

    <span class="hljs-keyword">this</span>.animatedValue = []

    arr.forEach(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {

      <span class="hljs-keyword">this</span>.animatedValue[value] = <span class="hljs-keyword">new</span> Animated.Value(<span class="hljs-number">0</span>)

    })

  }

  componentDidMount () {

    <span class="hljs-keyword">this</span>.animate()

  }

  animate () {

    const animations = arr.map(<span class="hljs-function"><span class="hljs-params">(item)</span> =&gt;</span> {

      <span class="hljs-keyword">return</span> Animated.timing(

        <span class="hljs-keyword">this</span>.animatedValue[item],

        {

          toValue: <span class="hljs-number">1</span>,

          duration: <span class="hljs-number">50</span>

        }

      )

    })

    Animated.sequence(animations).start()

  }

  render () {

    const animations = arr.map(<span class="hljs-function"><span class="hljs-params">(a, i)</span> =&gt;</span> {

      <span class="hljs-keyword">return</span> &lt;Animated.View key={i} style="{{"opacity: <span class="hljs-keyword">this</span>.animatedValue[a], height: <span class="hljs-number">20</span>, width: <span class="hljs-number">20</span>, backgroundColor: <span class="hljs-string">'red'</span>, marginLeft: <span class="hljs-number">3</span>, marginTop: <span class="hljs-number">3</span>"}}" /&gt;

    })

    <span class="hljs-keyword">return</span> (

      &lt;View style={styles.container}&gt;

        {animations}

      &lt;/View&gt;

    )

  }

}

const styles = StyleSheet.create({

  container: {

    flex: <span class="hljs-number">1</span>,

    flexDirection: <span class="hljs-string">'row'</span>,

    flexWrap: <span class="hljs-string">'wrap'</span>

  }

})

AppRegistry.registerComponent(<span class="hljs-string">'animations'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> animations);</code></pre>
<p>由于 <code>Animated.sequence()</code> 和 <code>Animated.parallel()</code> 很相似，因而对 <code>Animated.sequence()</code> 就不多作介绍了。主要不同的一点是我们是使用循环创建 Animated.Values。</p>
<p>这个示例动画的最终代码在<a href="https://rnplay.org/apps/6oNWdQ" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<h2 id="articleHeader6">6. Animated.Stagger()</h2>
<p>(图片太大，上传不了。<a href="https://cdn-images-1.medium.com/max/1600/1" rel="nofollow noreferrer" target="_blank">gif动态图</a>)</p>
<p>先看一下这个api是怎么调用的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// API
Animated.stagger(delay, arrayOfAnimations)
// In use:
Animated.stagger(1000, [
  Animated.timing(
    animatedValue,
    {
      //config options
    }
  ),
  Animated.spring(
     animatedValue2,
     {
       //config options
     }
  )
])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// API</span>
<span class="hljs-selector-tag">Animated</span><span class="hljs-selector-class">.stagger</span>(delay, arrayOfAnimations)
<span class="hljs-comment">// In use:</span>
<span class="hljs-selector-tag">Animated</span><span class="hljs-selector-class">.stagger</span>(<span class="hljs-number">1000</span>, [
  Animated.timing(
    animatedValue,
    {
      <span class="hljs-comment">//config options</span>
    }
  ),
  Animated.spring(
     animatedValue2,
     {
       <span class="hljs-comment">//config options</span>
     }
  )
])</code></pre>
<p>和 Animated.parallel() 和 Animated.sequence() 一样， Animated.Stagger 接受一个动画数组。但不同的是，Animated.Stagger 里面的动画有可能会同时执行（重叠），不过会以指定的延迟来开始。</p>
<p>与上述两个动画主要的不同点是 Animated.Stagger 的第一个参数，<code>delay</code> 会被应用到每一个动画：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';

import {

  AppRegistry,

  StyleSheet,

  Text,

  View,

  Animated

} from 'react-native'

const arr = []

for (var i = 0; i < 500; i++) {

  arr.push(i)

}

class animations extends Component {

  constructor () {

    super()

    this.animatedValue = []

    arr.forEach((value) => {

      this.animatedValue[value] = new Animated.Value(0)

    })

  }

  componentDidMount () {

    this.animate()

  }

  animate () {

    const animations = arr.map((item) => {

      return Animated.timing(

        this.animatedValue[item],

        {

          toValue: 1,

          duration: 4000

        }

      )

    })

    Animated.stagger(10, animations).start()

  }
  
  render () {

    const animations = arr.map((a, i) => {

      return <Animated.View key={i} style="{{"opacity: this.animatedValue[a], height: 20, width: 20, backgroundColor: 'red', marginLeft: 3, marginTop: 3"}}" />

    })

    return (

      <View style={styles.container}>

        {animations}

      </View>

    )

  }

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    flexDirection: 'row',

    flexWrap: 'wrap'

  }

})

AppRegistry.registerComponent('SampleApp', () => animations);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">import</span> {

  AppRegistry,

  StyleSheet,

  Text,

  View,

  Animated

} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-native'</span>

const arr = []

<span class="hljs-keyword">for</span> (var i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">500</span>; i++) {

  arr.push(i)

}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">animations</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> {</span>

  constructor () {

    <span class="hljs-keyword">super</span>()

    <span class="hljs-keyword">this</span>.animatedValue = []

    arr.forEach(<span class="hljs-function"><span class="hljs-params">(value)</span> =&gt;</span> {

      <span class="hljs-keyword">this</span>.animatedValue[value] = <span class="hljs-keyword">new</span> Animated.Value(<span class="hljs-number">0</span>)

    })

  }

  componentDidMount () {

    <span class="hljs-keyword">this</span>.animate()

  }

  animate () {

    const animations = arr.map(<span class="hljs-function"><span class="hljs-params">(item)</span> =&gt;</span> {

      <span class="hljs-keyword">return</span> Animated.timing(

        <span class="hljs-keyword">this</span>.animatedValue[item],

        {

          toValue: <span class="hljs-number">1</span>,

          duration: <span class="hljs-number">4000</span>

        }

      )

    })

    Animated.stagger(<span class="hljs-number">10</span>, animations).start()

  }
  
  render () {

    const animations = arr.map(<span class="hljs-function"><span class="hljs-params">(a, i)</span> =&gt;</span> {

      <span class="hljs-keyword">return</span> &lt;Animated.View key={i} style="{{"opacity: <span class="hljs-keyword">this</span>.animatedValue[a], height: <span class="hljs-number">20</span>, width: <span class="hljs-number">20</span>, backgroundColor: <span class="hljs-string">'red'</span>, marginLeft: <span class="hljs-number">3</span>, marginTop: <span class="hljs-number">3</span>"}}" /&gt;

    })

    <span class="hljs-keyword">return</span> (

      &lt;View style={styles.container}&gt;

        {animations}

      &lt;/View&gt;

    )

  }

}

const styles = StyleSheet.create({

  container: {

    flex: <span class="hljs-number">1</span>,

    flexDirection: <span class="hljs-string">'row'</span>,

    flexWrap: <span class="hljs-string">'wrap'</span>

  }

})

AppRegistry.registerComponent(<span class="hljs-string">'SampleApp'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> animations);</code></pre>
<p>这个示例动画的最终代码在<a href="https://rnplay.org/apps/VG0lEg" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<blockquote><p>文中使用的demo repo: <a href="https://github.com/dabit3/react-native-animations" rel="nofollow noreferrer" target="_blank">react native animations</a></p></blockquote>
<h2 id="articleHeader7">原文地址</h2>
<p><a href="https://github.com/dwqs/blog/issues/41" rel="nofollow noreferrer" target="_blank">https://github.com/dwqs/blog/...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】详解React Native动画

## 原文链接
[https://segmentfault.com/a/1190000007621628](https://segmentfault.com/a/1190000007621628)

