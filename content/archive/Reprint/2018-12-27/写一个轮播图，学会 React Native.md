---
title: '写一个轮播图，学会 React Native' 
date: 2018-12-27 2:30:12
hidden: true
slug: qe19amcr0z9
categories: [reprint]
---

{{< raw >}}

                    
<p>我学习 Web 的第一课，就是学习写一个轮播图，在写轮播图时自然地将 html、css、js、DOM、组件设计等各方面简单的知识点给串起来了。学习 React Native 的时候，也自然用起了这个思路，挺好用的。本文通过写一个轮播图，希望帮助到那些对 React Native 有兴趣的同学。</p>
<p>本文会一步一步和带领大家实现一个轮播图组件，帮助大家将一个个单独的知识点给串。学习本文之前，最好对 React Native 有所了解。其中的一些单独的知识点，如果不是很了解，可以在学习过程中点击相关链接学习。这个单独的知识点包括：</p>
<ul>
<li>Components: View、Touchble*</li>
<li>APIs: Animated、PanResponder、StyleSheet</li>
</ul>
<p>配合 github 项目学习效果更佳：<br><a href="https://github.com/jiangleo/learn-react-native" rel="nofollow noreferrer" target="_blank">https://github.com/jiangleo/l...</a></p>
<p>轮播图的最终效果图如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVXNIB?w=480&amp;h=324" src="https://static.alili.tech/img/bVXNIB?w=480&amp;h=324" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">简单轮播图组件</h2>
<h3 id="articleHeader1">接口设计</h3>
<p>一步实现最终效果图实现的效果是很难的，所以不如先把轮播图设计的简单点，然后一步一步地优化。<br>这个简单的轮播图组件，只拥有如下 3 个功能：</p>
<ul>
<li>在展现区域默认显示第 index 个项目的内容；</li>
<li>右滑，在展现区域显示上一个项目的内容；</li>
<li>左滑，在展现区域显示下一个项目的内容。</li>
</ul>
<p>轮播图的主要思想是，每次只显示一个个项目面，超出容器个项目面被隐藏，思路图如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVXNIN?w=720&amp;h=310" src="https://static.alili.tech/img/bVXNIN?w=720&amp;h=310" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><a href="https://zhuanlan.zhihu.com/p/29034015" rel="nofollow noreferrer" target="_blank">图片来源</a></p>
<p>为了达到复用的效果，还需要将组件调用方和组件本身分离。即组件本身只有一个，但是可以被多次调用。</p>
<p>在明确简单轮播图组件的设计要求后，就很自然地设计出其调用方式：</p>
<ul>
<li>
<code>style</code>: 设置外部容器的样式。</li>
<li>
<code>index</code>: 控制组件展示第 <code>index</code> 项目。</li>
<li>
<code>onChange</code>: 当用户点击上一个按钮、点击下一个按钮触发，并通过回调参数通知调用方，<code>index</code> 应该怎么改变。</li>
<li>
<code>children</code>: 所有轮播项目。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="state={
    index: 0,
}

render() {
    return (
        <Swiper
            style="{{"with: 100"}}"
            index={this.state.index}
            onChange={(index)=> {
                this.setState({
                    index: index
                })
            "}}"
        >
            <View />
            <View />
            <View />
        </Swiper>
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java">state={
    index: <span class="hljs-number">0</span>,
}

render() {
    <span class="hljs-keyword">return</span> (
        &lt;Swiper
            style="{{"with: <span class="hljs-number">100</span>"}}"
            index={<span class="hljs-keyword">this</span>.state.index}
            onChange={(index)=&gt; {
                <span class="hljs-keyword">this</span>.setState({
                    index: index
                })
            "}}"
        &gt;
            &lt;View /&gt;
            &lt;View /&gt;
            &lt;View /&gt;
        &lt;/Swiper&gt;
    );
}</code></pre>
<h3 id="articleHeader2">组件实现</h3>
<p>实现轮播的核心原理是，当 <code>index</code> 变化时，改变 Swiper 所有轮播项目的 <code>translateX</code> 值。超出 Swiper 容器的轮播项目会被隐藏，所以只会展现当前的第 <code>index</code> 个项目。其中有一个等式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="轮播项目位移距离 = - 当前展示的项 * 外部容器宽度
translateX =  - index *  layoutWidth
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>轮播项目位移距离 = - 当前展示的项 * 外部容器宽度
<span class="hljs-attribute">translateX</span> =  - index *  layoutWidth
</code></pre>
<p>在渲染之前，外部容器宽度 <code>layoutWidth</code> 是不知道的。因此只能在外部容器渲染后，通过 <code>onLayout</code> 函数，来获取外部容器宽度。在获取宽度后，再将正在的轮播项目渲染出来。但是这样做，需要两次渲染才能将轮播图显示出来。在一些对性能要求高的项目中，可以通过暴露一个外部容器初始化宽度 <code>initialWidth</code> 的接口来提前获取，避免两次渲染。</p>
<ul><li>新接口 <code>initialWidth</code>: 外部容器初始化宽度</li></ul>
<p>另外，我写代码的时候，有个小技巧，边写边测，通过小步迭代的方式，进行快速进行开发。因此，左滑、右滑切换的功能，不妨先用上一个、下一个按钮来代替。</p>
<p>其核心代码，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_handleLayout = ({nativeEvent}) => {
    this.setState({
        layoutWidth: nativeEvent.layout.width,
    })
}


render() {
    const {children, style, index} = this.props;
    const translateX =  - index * this.state.layoutWidth;
    const items = children.map((item, index) => React.cloneElement(
            item,
            {
                key: index,
                style: [
                    ...item.props.style,
                    {
                        width: this.state.layoutWidth,
                        transform: [{translateX,}],
                    }
                ]
            },
    ))

    return (
        <View
            style={[styles.container,style]}
            onLayout={this._handleLayout}
        >
            {items}
        </View>
    )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java">_handleLayout = ({nativeEvent}) =&gt; {
    <span class="hljs-keyword">this</span>.setState({
        layoutWidth: nativeEvent.layout.width,
    })
}


render() {
    <span class="hljs-keyword">const</span> {children, style, index} = <span class="hljs-keyword">this</span>.props;
    <span class="hljs-keyword">const</span> translateX =  - index * <span class="hljs-keyword">this</span>.state.layoutWidth;
    <span class="hljs-keyword">const</span> items = children.map((item, index) =&gt; React.cloneElement(
            item,
            {
                key: index,
                style: [
                    ...item.props.style,
                    {
                        width: <span class="hljs-keyword">this</span>.state.layoutWidth,
                        transform: [{translateX,}],
                    }
                ]
            },
    ))

    <span class="hljs-keyword">return</span> (
        &lt;View
            style={[styles.container,style]}
            onLayout={<span class="hljs-keyword">this</span>._handleLayout}
        &gt;
            {items}
        &lt;/View&gt;
    )
}</code></pre>
<p><a href="https://github.com/jiangleo/learn-react-native/blob/master/App/0_SimpleSwiper/SimpleSwiper.js" rel="nofollow noreferrer" target="_blank">完整代码</a></p>
<h2 id="articleHeader3">添加动画</h2>
<h3 id="articleHeader4">
<code>Animated</code> 声明式动画</h3>
<p>动画功能会用到 <code>Animated</code> 这个 API。</p>
<p><code>Animated</code> 和 <code>state</code> 一样，都符合符合声明式编程的原理。由于 <code>Animated</code> 的动画值也可以看做页面的某种状态。在官网的示例代码中，直接将<code>Animated</code> 的动画值直接挂在了 <code>this.state</code> 上，也证明了这一点。<br>下面我们将 <code>Animated</code> 和 <code>state</code> 进行对比，帮助大家进行理解：</p>
<p># | Animated | state<br>声明 | <code>this.animKey = animValue}</code> | <code>this.state={stateKey: stateValue}</code><br>--| --| --<br>赋值 | <code>&lt;Animated.View props={this.animKey}&gt;</code> | <code>&lt;View props={this.state.stateKey}&gt;</code><br>改变状态 | this.animKey.setValue(newAnimValue)  | <code>this.setState({stateKey: newStateValue})</code><br>改变状态_动画曲线形式 |   <code>Animated.spring(this.animKey, {toValue: newAnimValue}).toStart()</code>  | 无</p>
<h3 id="articleHeader5">功能描述和接口实现</h3>
<p>在完成轮播图组件的基础切换功能的基础上，要给它添加动画功能：</p>
<ul>
<li>点击上一个按钮，从当前显示项目逐渐右移至上一个项目；</li>
<li>点击下一个按钮，从当前显示项目逐渐左移至下一个项目。</li>
</ul>
<p>一开始我们使用 <code>index</code> 这个属性来控制要展现的项目。因为动画会有中间值，比如介于 0 和 1 之间的值，所以我们需要一个新的值来表示项目的位置。</p>
<ul><li>positionAnimated：控制项目的位移位置</li></ul>
<p>为了组件接口的设计方便，不应该把这个底层状态 <code>positionAnimated</code> 暴露给组件调用方去处理。组件调用方依旧只需要控制 <code>index</code> 即可动画改变当前展示的项目。而在组件内部，监听 <code>index</code> 的更新，然后驱动 <code>positionAnimated</code> 的改变项目位置即可。</p>
<p>动画版轮播图的核心原理和最初的简单版类似：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="translateX =  - index *  layoutWidth
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code><span class="hljs-attr">translateX</span> =  - index *  layoutWidth
</code></pre>
<p>核心代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="scrollTo = ( toIndex ) => {
    Animated.spring(this.state.positionAnimated, {
        toValue: - toIndex * this.state.layoutWidth,
        friction: 12,
        tension: 50,
    }).start()
}

render() {
    // ...
    const items = children.map((item, index) => (
        <Animated.View
            style="{{"
                width: layoutWidth,
                transform: [{
                    translateX: this.state.positionAnimated
                }],
            "}}"
            key={index}
        >
            {item}
        </Animated.View>
    ));
    // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java">scrollTo = ( toIndex ) =&gt; {
    Animated.spring(<span class="hljs-keyword">this</span>.state.positionAnimated, {
        toValue: - toIndex * <span class="hljs-keyword">this</span>.state.layoutWidth,
        friction: <span class="hljs-number">12</span>,
        tension: <span class="hljs-number">50</span>,
    }).start()
}

render() {
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">const</span> items = children.map((item, index) =&gt; (
        &lt;Animated.View
            style="{{"
                width: layoutWidth,
                transform: [{
                    translateX: <span class="hljs-keyword">this</span>.state.positionAnimated
                }],
            "}}"
            key={index}
        &gt;
            {item}
        &lt;/Animated.View&gt;
    ));
    <span class="hljs-comment">// ...</span>
}</code></pre>
<p><a href="https://github.com/jiangleo/learn-react-native/blob/master/App/1_AnimatedSwiper/AnimatedSwiper.js" rel="nofollow noreferrer" target="_blank">完整代码</a></p>
<h2 id="articleHeader6">支持手势控制</h2>
<h3 id="articleHeader7">手势事件简介</h3>
<p>React Native 的手势事件类似于 Web，但 React Native 的手势事件更加强大和灵活。</p>
<p>两者相似点有：</p>
<p># | React Native | Web<br>--|--|--<br>开始触碰 | onPanResponderGrant | touchstart<br>开始移动 | onResponderMove | touchmove<br>结束触碰 | onResponderRelease  | touchend<br>意外取消 |   onResponderTerminate  | touchcancel</p>
<p>两者不同点在于，React Native 可以针对具体元素绑定手势，而在 Web 中只能针对全局 <code>document</code> 进行手势监听。</p>
<p>在 React Native 手势接口设计上，大家可以先思考一个问题。因为 React Native 允许两个元素同时监听手势事件，如果两个元素都监听了手势，那么 React Native 应该响应那个元素呢？在 React Native 中设计了，成为响应者 <code>Responder</code> 的概念。大概可以描述为：如果没有响应者，任何元素都可以成为响应者；如果有元素是响应者，必须当前响应元素同意不再继续成为响应者后，其他元素才能变成响应者。总而言之，React Native 通过元素间的谈判，保障了手势响应者只有一个。谈判接口主要有：</p>
<p># | React Native | Web<br>--|--|--<br>开始触碰，是否成为响应者 | onStartShouldSetPanResponder =&gt; boolean | 无<br>开始移动，是否成为响应者 | onMoveShouldSetPanResponder =&gt; boolean | 无<br>有其他响应者，是否释放响应权 | onPanResponderTerminationRequest =&gt; boolean | 无</p>
<p>以上手势事件非常底层，写起来也很复杂。而一起简单的手势事件，如 click 事件，并不需要这么复杂。为此 React Native 基于以上手势事件，提供了 <code>TouchableHighlight</code> 等组件。该组件封装了一些常用的点击事件和点击相关的配置，如： <code>onPress</code>(click)、<code>underlayColor</code> 点击态背景色等。</p>
<p>在写简单轮播图时，用的是点击事件来代替滑动事件。点击事件的处理，用到的就是 <code>TouchableHighlight</code> 组件。</p>
<h3 id="articleHeader8">实现</h3>
<p>手势轮播图在动画轮播图上进行了升级，它需要支持以下功能：</p>
<ul>
<li>滑动：用户滑动时，轮播图跟着手指移动；</li>
<li>右滑：用户向右滑动超过某个阙值后，触发右滑动作，轮播图位移至上一个项目；</li>
<li>左滑：用户向左滑动超过某个阙值后，触发左滑动作，轮播图位移至下一个项目。</li>
</ul>
<p>当用户滑动时，需要相应的改变 <code>positionAnimated</code> 的值，使轮播图跟着手指移动。这里有个等式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="最终的位置 = 开始的位置 + 手势移动过的距离
position = startPosition + movePosition
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>最终的位置 = 开始的位置 + 手势移动过的距离
<span class="hljs-built_in">position</span> = startPosition + movePosition
</code></pre>
<p>开始的位置，需要在轮播图响应手势时 <code>onPanResponderGrant</code> 记录。手势移动过的距离可以在手势移动时 <code>onResponderMove</code> 获取，与此同时通过 <code>positionAnimated.setValue(position)</code> 改变轮播图的位置，让轮播图跟着手指移动。</p>
<p>左滑、右滑，是在用户抬起手指时 <code>onResponderRelease</code> 开始触发，触发的临界点我们可以简单的设置为外部容器一半的宽度。然后通过 <code>onChange</code> 事件告诉，调用方要改变的位置是什么，由调用方位移轮播图。</p>
<p>实现的核心代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onPanResponderEnd = () => {
    // 超过 50% 的距离，触发左滑、右滑
    const index = Math.round(-this.position / this.state.layoutWidth)
    const safeIndex = this.getSafeIndex(index);
    this.props.onChange(safeIndex)
};

responder = PanResponder.create({
    onPanResponderGrant: (evt, gestureState) => {
        // 用户手指触碰屏幕，停止动画
        this.state.positionAnimated.stopAnimation();
        // 记录手势响应时的位置
        this.startPosition = this.position;
    },
    onPanResponderMove: (evt, { dx }) => {
        // 要变化的位置 = 手势响应时的位置 + 移动的距离
        const position = this.startPosition + dx
        this.state.positionAnimated.setValue(position)
    },
    onPanResponderRelease: this.onPanResponderEnd,
    onPanResponderTerminate: this.onPanResponderEnd,
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java">onPanResponderEnd = () =&gt; {
    <span class="hljs-comment">// 超过 50% 的距离，触发左滑、右滑</span>
    <span class="hljs-keyword">const</span> index = Math.round(-<span class="hljs-keyword">this</span>.position / <span class="hljs-keyword">this</span>.state.layoutWidth)
    <span class="hljs-keyword">const</span> safeIndex = <span class="hljs-keyword">this</span>.getSafeIndex(index);
    <span class="hljs-keyword">this</span>.props.onChange(safeIndex)
};

responder = PanResponder.create({
    onPanResponderGrant: (evt, gestureState) =&gt; {
        <span class="hljs-comment">// 用户手指触碰屏幕，停止动画</span>
        <span class="hljs-keyword">this</span>.state.positionAnimated.stopAnimation();
        <span class="hljs-comment">// 记录手势响应时的位置</span>
        <span class="hljs-keyword">this</span>.startPosition = <span class="hljs-keyword">this</span>.position;
    },
    onPanResponderMove: (evt, { dx }) =&gt; {
        <span class="hljs-comment">// 要变化的位置 = 手势响应时的位置 + 移动的距离</span>
        <span class="hljs-keyword">const</span> position = <span class="hljs-keyword">this</span>.startPosition + dx
        <span class="hljs-keyword">this</span>.state.positionAnimated.setValue(position)
    },
    onPanResponderRelease: <span class="hljs-keyword">this</span>.onPanResponderEnd,
    onPanResponderTerminate: <span class="hljs-keyword">this</span>.onPanResponderEnd,
});</code></pre>
<p><a href="https://github.com/jiangleo/learn-react-native/blob/master/App/2_GestureSwiper/GestureSwiper.js" rel="nofollow noreferrer" target="_blank">完整代码</a></p>
<h2 id="articleHeader9">总结</h2>
<p>到此一个 React Native 轮播图的也已经实现了，相信大家也应该对 React Native 有了大概的了解和认知。</p>
<p>在写这个轮播图的过程中，应用了 <code>View</code>、<code>Touchble*</code> 组件和 <code>Animated</code>、<code>PanResponder</code>、<code>StyleSheet</code> API。</p>
<p>在写轮播图的过程中，还应用了小步迭代的开发方式。即实现的过程中，将这个轮播图分为了三个阶段进行开发：简单轮播图、动画轮播图、手势轮播图。每个阶段，又可以分为三个步骤：准备要应用的知识(google)、实现功能描述、实现。通过小步迭代的方式，可以将一个大问题分解为几个小问题，再把小问题分解为最基本的知识点，再去设法实现。</p>
<p>最后，这还只是一个轮播图的雏形，还有很多优化点可以做，比如：</p>
<ul>
<li>isLoop： 是否头尾衔接的循环轮播</li>
<li>horizontal：是否水平轮播</li>
<li>renderPager：接受一个组件，该用于处理手势和动画。比如可以使用 ScrollView 和 ViewPagerAnder，在一些特定场景下处理手势和动画，达到更高的性能。</li>
<li>showsPagination：实现展现轮播提示的视图，比如小圆点提示当前播到第几个轮播项目了。</li>
</ul>
<p>大家可以参考代码中的 SwiperAndroid 进行完成。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
写一个轮播图，学会 React Native

## 原文链接
[https://segmentfault.com/a/1190000011830204](https://segmentfault.com/a/1190000011830204)

