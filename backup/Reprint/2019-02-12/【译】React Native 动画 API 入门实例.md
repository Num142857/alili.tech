---
title: '【译】React Native 动画 API 入门实例' 
date: 2019-02-12 2:30:12
hidden: true
slug: oyxc28j2vj9
categories: [reprint]
---

{{< raw >}}

                    
<p>翻译自 <a href="http://browniefed.com/blog/2015/07/26/react-native-animated-api-basic-example/" rel="nofollow noreferrer" target="_blank">React-native Animated API Basic Example</a> <br>翻译过程中有删改</p>
<hr>
<h1 id="articleHeader0">简介</h1>
<p>本文是探索 <code>react-native</code> 中实现的的 <code>Animated API</code>，Web 版本上的 React 没有该 API，不过可以使用在 react-europe 大会上发布的 <a href="https://github.com/chenglou/react-motion" rel="nofollow noreferrer" target="_blank">react-motion</a>。<br>本文中将会完成一个动画例子，效果如下图<br><span class="img-wrap"><img data-src="/img/bVtvQi" src="https://static.alili.tech/img/bVtvQi" alt="JlX4nV0.gif" title="JlX4nV0.gif" style="cursor: pointer;"></span></p>
<h1 id="articleHeader1">原理</h1>
<p><code>Animated API</code>的原理并非通过 <code>setState</code> 方法使 react 重渲染，而是使用 <code>setNativeProps</code> 方法更新 native 视图。<br><code>Animated API</code> 导出了几个特殊的 components：<code>Animated.View</code>, <code>Animated.Text</code>, 和 <code>Animated.Image</code>。Animated API 直接在 Objective-C 的 native 环境中调整这些 components 的外观样式，跳过了 JS 环境中 react 的 diff 与 reconciliation 过程，从而获得流畅、高效的动画。<br>简而言之，它将对动画中变化的属性数值做插值运算并且刷新 native 视图。</p>
<h1 id="articleHeader2">动画效果：沿屏幕移动的方块</h1>
<p>我们将实现一个简单的动画效果：沿手机屏幕四个边，按照左上角 -&gt; 左下角 -&gt; 右下角 -&gt; 右上角的顺序，移动一个正方形。示意图大概如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="< -- <           
|    |          
V -- ^  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>&lt; <span class="hljs-comment">-- &lt;           </span>
|    |          
V <span class="hljs-comment">-- ^  </span></code></pre>
<h1 id="articleHeader3">开始</h1>
<h2 id="articleHeader4">导入依赖</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {  
    AppRegistry,
    Component, 
    Dimensions,  
    StyleSheet,  
    View,  
    Animated 
} from 'react-native';
const { width,  height } = Dimensions.get('window');
const SQUARE_DIMENSIONS = 30;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, {  
    AppRegistry,
    Component, 
    Dimensions,  
    StyleSheet,  
    View,  
    Animated 
} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-native'</span>;
<span class="hljs-keyword">const</span> { width,  height } = Dimensions.get(<span class="hljs-string">'window'</span>);
<span class="hljs-keyword">const</span> SQUARE_DIMENSIONS = <span class="hljs-number">30</span>;</code></pre>
<h2 id="articleHeader5">样式</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const styles = StyleSheet.create({  
    container: {    
        flex: 1  
    },  
    square: {    
        width: SQUARE_DIMENSIONS,    
        height: SQUARE_DIMENSIONS,    
        backgroundColor: 'blue'  
    } 
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> styles = StyleSheet.create({  
    <span class="hljs-attr">container</span>: {    
        <span class="hljs-attr">flex</span>: <span class="hljs-number">1</span>  
    },  
    <span class="hljs-attr">square</span>: {    
        <span class="hljs-attr">width</span>: SQUARE_DIMENSIONS,    
        <span class="hljs-attr">height</span>: SQUARE_DIMENSIONS,    
        <span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">'blue'</span>  
    } 
});</code></pre>
<h2 id="articleHeader6">基本逻辑</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class AnimatedSquare extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pan: new Animated.ValueXY()
        }
    }
    
    getStyle() {
        return [styles.square, {
            transform: this.state.pan.getTranslateTransform()
        }];
    }
    
    render() {
        return (
          <View style={styles.container}>
              <Animated.View style={this.getStyle()} />
          </View>
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AnimatedSquare</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);

        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">pan</span>: <span class="hljs-keyword">new</span> Animated.ValueXY()
        }
    }
    
    getStyle() {
        <span class="hljs-keyword">return</span> [styles.square, {
            <span class="hljs-attr">transform</span>: <span class="hljs-keyword">this</span>.state.pan.getTranslateTransform()
        }];
    }
    
    render() {
        <span class="hljs-keyword">return</span> (
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">View</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styles.container}</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">Animated.View</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{this.getStyle()}</span> /&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span>
        );
    }
}</span></code></pre>
<p>上面代码中有几个需要解释的地方。<br>注意我们所建立的 <code>component</code> 的 <code>state</code>  是 <code>Animated.ValueXY</code> 的一个实例。这个 API 将在 <code>X</code>、<code>Y</code> 两个值上进行插值。</p>
<p><code>getStyle()</code> 方法，返回一个样式对象数组。包括描述了方块宽高大小的 <code>square</code> 基本样式，以及最为重要的，一个 <code>transform</code> 样式对象。<br>我们使用 <code>getTranslateTransform</code> 这个 Animated API 中的 helper 方法，来返回一个适合 <code>transform</code> 属性结构的值。<br>这个返回值的结构类似于<code>[{ translateX: xValue}, {translateY: yValue}]</code>，xValue 和 yValue 是计算后的插值。</p>
<p>最后我们使用 <code>Animated.View</code>，表示这个组件是可动画组件。</p>
<h1 id="articleHeader7">移动正方形</h1>
<p>一开始正方形是静止在左上角的，现在我们把它从左上角（<code>x = 0, y = 0</code>）移动到左下角（<code>x = 0, y = (屏幕高 - 正方形高)</code>）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const SPRING_CONFIG = {tension: 2, friction: 3}; //Soft spring
//...
    componentDidMount() {
        Animated.spring(this.state.pan, {
          ...SPRING_CONFIG,
          toValue: {x: 0, y: height - SQUARE_DIMENSIONS}  // return to start
        }).start();
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>const SPRING_CONFIG = {<span class="hljs-string">tension:</span> <span class="hljs-number">2</span>, <span class="hljs-string">friction:</span> <span class="hljs-number">3</span>}; <span class="hljs-comment">//Soft spring</span>
<span class="hljs-comment">//...</span>
    componentDidMount() {
        Animated.spring(<span class="hljs-keyword">this</span>.state.pan, {
          ...SPRING_CONFIG,
<span class="hljs-symbol">          toValue:</span> {<span class="hljs-string">x:</span> <span class="hljs-number">0</span>, <span class="hljs-string">y:</span> height - SQUARE_DIMENSIONS}  <span class="hljs-comment">// return to start</span>
        }).start();
    }</code></pre>
<p>在组件装载后，我们通过 <code>Animated.spring</code> 进行 Spring（弹性）动画 ，我们给弹性动画设置了 <code>SPRING_CONFIG</code> 配置，包括 tension（张力）和 friction（摩擦）值，所以正方形到达左下角后，会有一个小小回弹动画。</p>
<h1 id="articleHeader8">再动，又动，还动</h1>
<p>我们会建立一个顺序的动画序列，让动画一个接一个进行。当然除了 sequence（顺序），你还可以按 parallel（并行）组合动画效果，让动画同时进行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidMount() {
    Animated.sequence([
      Animated.spring(this.state.pan, {
        ...SPRING_CONFIG,
        toValue: {x: 0, y: height - SQUARE_DIMENSIONS} //animate to bottom left
      }),
      Animated.spring(this.state.pan, {
          ...SPRING_CONFIG,
          toValue: {x: width - SQUARE_DIMENSIONS, y: height - SQUARE_DIMENSIONS} // animated to bottom right
      }),
      Animated.spring(this.state.pan, {
          ...SPRING_CONFIG,
          toValue: {x: width - SQUARE_DIMENSIONS, y: 0} //animate to top right
      }),
      Animated.spring(this.state.pan, {
          ...SPRING_CONFIG,
          toValue: {x: 0, y: 0} // return to start
      })
    ]).start();
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>componentDidMount() {
    Animated.sequence([
      Animated.spring(this.<span class="hljs-keyword">state</span>.pan, {
        ...SPRING_CONFIG,
        <span class="hljs-keyword">to</span>Value: {x: <span class="hljs-number">0</span>, y: height - SQUARE_DIMENSIONS} //animate <span class="hljs-keyword">to</span> bottom left
      }),
      Animated.spring(this.<span class="hljs-keyword">state</span>.pan, {
          ...SPRING_CONFIG,
          <span class="hljs-keyword">to</span>Value: {x: width - SQUARE_DIMENSIONS, y: height - SQUARE_DIMENSIONS} // animated <span class="hljs-keyword">to</span> bottom right
      }),
      Animated.spring(this.<span class="hljs-keyword">state</span>.pan, {
          ...SPRING_CONFIG,
          <span class="hljs-keyword">to</span>Value: {x: width - SQUARE_DIMENSIONS, y: <span class="hljs-number">0</span>} //animate <span class="hljs-keyword">to</span> top right
      }),
      Animated.spring(this.<span class="hljs-keyword">state</span>.pan, {
          ...SPRING_CONFIG,
          <span class="hljs-keyword">to</span>Value: {x: <span class="hljs-number">0</span>, y: <span class="hljs-number">0</span>} // return <span class="hljs-keyword">to</span> start
      })
    ]).start();
}
</code></pre>
<p>如之前设想的一样，我们定义了4个弹性动画。注释解释了动画移动方向。</p>
<h1 id="articleHeader9">一直不停动</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Animated.sequence(animtionList: Arrary).start(cb: Function);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">Animated</span><span class="hljs-selector-class">.sequence</span>(<span class="hljs-attribute">animtionList</span>: Arrary)<span class="hljs-selector-class">.start</span>(<span class="hljs-attribute">cb</span>: Function);
</code></pre>
<p>动画序列的<code>start</code>方法可以传一个回调函数，在动画全部执行完时触发。在我们的例子中，这时候正方形回到了起点，我们可以重新开始一遍动画。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidMount() {
    this.startAndRepeat();
}

startAndRepeat() {
    this.triggerAnimation(this.startAndRepeat);
}

triggerAnimation(cb) {
    Animated.sequence([
        Animated.spring(this.state.pan, {
            ...SPRING_CONFIG,
            toValue: {x: 0, y: height - SQUARE_DIMENSIONS} //animate to bottom left
        }),
        Animated.spring(this.state.pan, {
            ...SPRING_CONFIG,
            toValue: {x: width - SQUARE_DIMENSIONS, y: height - SQUARE_DIMENSIONS} // animated to bottom right
        }),
        Animated.spring(this.state.pan, {
            ...SPRING_CONFIG,
            toValue: {x: width - SQUARE_DIMENSIONS, y: 0} //animate to top right
        }),
        Animated.spring(this.state.pan, {
            ...SPRING_CONFIG,
            toValue: {x: 0, y: 0} // return to start
        })
     ]).start(cb);
 }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>componentDidMount() {
    this.startAndRepeat();
}

startAndRepeat() {
    this.triggerAnimation(this.startAndRepeat);
}

triggerAnimation(cb) {
    Animated.sequence([
        Animated.spring(this.<span class="hljs-keyword">state</span>.pan, {
            ...SPRING_CONFIG,
            <span class="hljs-keyword">to</span>Value: {x: <span class="hljs-number">0</span>, y: height - SQUARE_DIMENSIONS} //animate <span class="hljs-keyword">to</span> bottom left
        }),
        Animated.spring(this.<span class="hljs-keyword">state</span>.pan, {
            ...SPRING_CONFIG,
            <span class="hljs-keyword">to</span>Value: {x: width - SQUARE_DIMENSIONS, y: height - SQUARE_DIMENSIONS} // animated <span class="hljs-keyword">to</span> bottom right
        }),
        Animated.spring(this.<span class="hljs-keyword">state</span>.pan, {
            ...SPRING_CONFIG,
            <span class="hljs-keyword">to</span>Value: {x: width - SQUARE_DIMENSIONS, y: <span class="hljs-number">0</span>} //animate <span class="hljs-keyword">to</span> top right
        }),
        Animated.spring(this.<span class="hljs-keyword">state</span>.pan, {
            ...SPRING_CONFIG,
            <span class="hljs-keyword">to</span>Value: {x: <span class="hljs-number">0</span>, y: <span class="hljs-number">0</span>} // return <span class="hljs-keyword">to</span> start
        })
     ]).start(cb);
 }
</code></pre>
<p>我们把动画逻辑提取为一个方法，在完成回调函数中触发它。</p>
<h1 id="articleHeader10">全部代码</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {  
    AppRegistry,
    Component, 
    Dimensions,  
    StyleSheet,  
    View,  
    Animated 
} from 'react-native';
const { width,  height } = Dimensions.get('window');
const SQUARE_DIMENSIONS = 30;

const SPRING_CONFIG = {tension: 2, friction: 3};


class AnimatedSquare extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pan: new Animated.ValueXY()
        }
    }
    
    componentDidMount() {
        this.startAndRepeat();
    }

    startAndRepeat() {
        this.triggerAnimation(this.startAndRepeat);
    }
    
    triggerAnimation(cb) {
        Animated.sequence([
            Animated.spring(this.state.pan, {
                ...SPRING_CONFIG,
                toValue: {x: 0, y: height - SQUARE_DIMENSIONS} //animate to bottom left
            }),
            Animated.spring(this.state.pan, {
                ...SPRING_CONFIG,
                toValue: {x: width - SQUARE_DIMENSIONS, y: height - SQUARE_DIMENSIONS} // animated to bottom right
            }),
            Animated.spring(this.state.pan, {
                ...SPRING_CONFIG,
                toValue: {x: width - SQUARE_DIMENSIONS, y: 0} //animate to top right
            }),
            Animated.spring(this.state.pan, {
                ...SPRING_CONFIG,
                toValue: {x: 0, y: 0} // return to start
            })
         ]).start(cb);
    }
     
    getStyle() {
        return [styles.square, {
            transform: this.state.pan.getTranslateTransform()
        }];
    }
    
    render() {
        return (
          <View style={styles.container}>
              <Animated.View style={this.getStyle()} />
          </View>
        );
    }
}

const styles = StyleSheet.create({  
    container: {    
        flex: 1  
    },  
    square: {    
        width: SQUARE_DIMENSIONS,    
        height: SQUARE_DIMENSIONS,    
        backgroundColor: 'blue'  
    } 
});

AppRegistry.registerComponent('AnimatedSquare', () => AnimatedSquare);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, {  
    AppRegistry,
    Component, 
    Dimensions,  
    StyleSheet,  
    View,  
    Animated 
} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-native'</span>;
<span class="hljs-keyword">const</span> { width,  height } = Dimensions.get(<span class="hljs-string">'window'</span>);
<span class="hljs-keyword">const</span> SQUARE_DIMENSIONS = <span class="hljs-number">30</span>;

<span class="hljs-keyword">const</span> SPRING_CONFIG = {<span class="hljs-attr">tension</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">friction</span>: <span class="hljs-number">3</span>};


<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AnimatedSquare</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);

        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">pan</span>: <span class="hljs-keyword">new</span> Animated.ValueXY()
        }
    }
    
    componentDidMount() {
        <span class="hljs-keyword">this</span>.startAndRepeat();
    }

    startAndRepeat() {
        <span class="hljs-keyword">this</span>.triggerAnimation(<span class="hljs-keyword">this</span>.startAndRepeat);
    }
    
    triggerAnimation(cb) {
        Animated.sequence([
            Animated.spring(<span class="hljs-keyword">this</span>.state.pan, {
                ...SPRING_CONFIG,
                <span class="hljs-attr">toValue</span>: {<span class="hljs-attr">x</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">y</span>: height - SQUARE_DIMENSIONS} <span class="hljs-comment">//animate to bottom left</span>
            }),
            Animated.spring(<span class="hljs-keyword">this</span>.state.pan, {
                ...SPRING_CONFIG,
                <span class="hljs-attr">toValue</span>: {<span class="hljs-attr">x</span>: width - SQUARE_DIMENSIONS, <span class="hljs-attr">y</span>: height - SQUARE_DIMENSIONS} <span class="hljs-comment">// animated to bottom right</span>
            }),
            Animated.spring(<span class="hljs-keyword">this</span>.state.pan, {
                ...SPRING_CONFIG,
                <span class="hljs-attr">toValue</span>: {<span class="hljs-attr">x</span>: width - SQUARE_DIMENSIONS, <span class="hljs-attr">y</span>: <span class="hljs-number">0</span>} <span class="hljs-comment">//animate to top right</span>
            }),
            Animated.spring(<span class="hljs-keyword">this</span>.state.pan, {
                ...SPRING_CONFIG,
                <span class="hljs-attr">toValue</span>: {<span class="hljs-attr">x</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">0</span>} <span class="hljs-comment">// return to start</span>
            })
         ]).start(cb);
    }
     
    getStyle() {
        <span class="hljs-keyword">return</span> [styles.square, {
            <span class="hljs-attr">transform</span>: <span class="hljs-keyword">this</span>.state.pan.getTranslateTransform()
        }];
    }
    
    render() {
        <span class="hljs-keyword">return</span> (
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">View</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styles.container}</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">Animated.View</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{this.getStyle()}</span> /&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span>
        );
    }
}

const styles = StyleSheet.create({  
    container: {    
        flex: 1  
    },  
    square: {    
        width: SQUARE_DIMENSIONS,    
        height: SQUARE_DIMENSIONS,    
        backgroundColor: 'blue'  
    } 
});

AppRegistry.registerComponent('AnimatedSquare', () =&gt; AnimatedSquare);
</span></code></pre>
<h1 id="articleHeader11">其它一些范例</h1>
<p><a href="https://github.com/brentvatne/react-native-animated-demo-tinder" rel="nofollow noreferrer" target="_blank">react-native-animated-demo-tinder</a><br><a href="https://github.com/facebook/react-native/tree/master/Examples/UIExplorer/AnimationExample" rel="nofollow noreferrer" target="_blank">UIExplorer Animated example</a></p>
<h1 id="articleHeader12">相关资源</h1>
<p><a href="https://www.youtube.com/watch?v=1tavDv5hXpo" rel="nofollow noreferrer" target="_blank">Cheng Lou – The State of Animation in React at react-europe 2015</a><br><a href="https://github.com/chenglou/react-motion" rel="nofollow noreferrer" target="_blank">react-motion – Github</a><br><a href="https://facebook.github.io/react-native/docs/animations.html#content" rel="nofollow noreferrer" target="_blank">React Native Animation API</a><br><a>Spencer Ahrens – React Native: Building Fluid User Experiences at react-europe 2015</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】React Native 动画 API 入门实例

## 原文链接
[https://segmentfault.com/a/1190000004636579](https://segmentfault.com/a/1190000004636579)

