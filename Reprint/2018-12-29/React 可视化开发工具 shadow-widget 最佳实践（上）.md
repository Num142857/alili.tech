---
title: 'React 可视化开发工具 shadow-widget 最佳实践（上）' 
date: 2018-12-29 2:30:10
hidden: true
slug: gq78r0n66b
categories: [reprint]
---

{{< raw >}}

                    
<p>本文介绍 "React + Shadow Widget" 应用于通用 GUI 开发的最佳实践，只聚焦于典型场景下最优开发方法。分上、下两篇讲解，上篇概述最佳实践，介绍功能块划分。</p>
<p><span class="img-wrap"><img data-src="/img/bVWu3d?w=600&amp;h=400" src="https://static.alili.tech/img/bVWu3d?w=600&amp;h=400" alt="Thumbnail" title="Thumbnail" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">1. 最佳实践概述</h2>
<p>按遵循 ES5 与 ES6+ 区分，Shadow Widget 支持两种开发方式，一是用 ES5 做开发，二是搭建 Babel 转译环境用 ES6+ 做开发，之所以划分两大类，因为它们之间差别不仅仅是 javascript 代码转译，而是涉及在哪个层面定义 React Class，进而与源码在上层还是下层维护，以及与他人如何协作等相关。</p>
<p>如本系列博客《shadow-widget 的非可视开发方法》一文介绍，用 ES5 定义 React class 的方式是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var MyButton = T.Button._createClass( {
  getDefaultProps: function() {
    var props = T.Button.getDefaultProps();
    // props.attr = value;
    return props;
  },
  
  getInitialState: function() {
    var state = this._getInitialState(this);
    // ...
    return state;
  }
  
  $onClick: function(event) {
    alert('clicked');
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> MyButton = T.Button._createClass( {
  <span class="hljs-attr">getDefaultProps</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> props = T.Button.getDefaultProps();
    <span class="hljs-comment">// props.attr = value;</span>
    <span class="hljs-keyword">return</span> props;
  },
  
  <span class="hljs-attr">getInitialState</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> state = <span class="hljs-keyword">this</span>._getInitialState(<span class="hljs-keyword">this</span>);
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">return</span> state;
  }
  
  $onClick: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
    alert(<span class="hljs-string">'clicked'</span>);
  }
});</code></pre>
<p>而用 ES6+ 开发，这么定义 React class：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyButton_ extends T.Button_ {
  constructor(name,desc) {
    super(name,desc);
  }
  
  getDefaultProps() {
    var props = super.getDefaultProps();
    // props.attr = value;
    return props;
  }
  
  getInitialState() {
    var state = super.getInitialState();
    // ...
    return state;
  }

  $onClick: function(event) {
    alert('clicked');
  }
}

var AbstractButton = new MyButton_();  // MyButton_ is WTC
var MyButton = AbstractButton._createClass(); // MyButton is React class" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyButton_</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">T</span>.<span class="hljs-title">Button_</span> </span>{
  <span class="hljs-keyword">constructor</span>(name,desc) {
    <span class="hljs-keyword">super</span>(name,desc);
  }
  
  getDefaultProps() {
    <span class="hljs-keyword">var</span> props = <span class="hljs-keyword">super</span>.getDefaultProps();
    <span class="hljs-comment">// props.attr = value;</span>
    <span class="hljs-keyword">return</span> props;
  }
  
  getInitialState() {
    <span class="hljs-keyword">var</span> state = <span class="hljs-keyword">super</span>.getInitialState();
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">return</span> state;
  }

  $onClick: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
    alert(<span class="hljs-string">'clicked'</span>);
  }
}

<span class="hljs-keyword">var</span> AbstractButton = <span class="hljs-keyword">new</span> MyButton_();  <span class="hljs-comment">// MyButton_ is WTC</span>
<span class="hljs-keyword">var</span> MyButton = AbstractButton._createClass(); <span class="hljs-comment">// MyButton is React class</span></code></pre>
<p>由于 ES6+ 语法能兼容 ES5，所以，即使采用 ES6+ 开发方式，前一种 ES5 的 React class 定义方法仍然适用。但，自定义扩展一个 WTC 类必须用 ES6+，就象上面 <code>"class MyButton_ extends T.Button_"</code> 语法，只能在 ES6+ 下书写。</p>
<p>考虑到用 ES5 编程不必搭建 Babel 开发环境，ES5 能被 ES6+ 兼容，向 ES6+ 迁移只是整体平移，不必改源码。加上 Shadow Widget 及第 3 方类库，已提供够用的基础 WTC 类（这意味着我们并不迫切依赖于用 ES6+ 扩展 WTC），所以，我们将 Shadow Widget 最佳实践确定为：<strong>用 ES5 实施主体开发</strong>。</p>
<p>Shadow Widget 最佳开发实践的大致操作过程如下：</p>
<ol>
<li>创建一个新的工程，参见《Shadow Widget 用户手册》（下面简称《手册》）中 “5.1.1 创建工程” 一节   <br>应选择一个合适的 "网页样板" 来创建，Shadow Widget 是一个可继承重用的 lib 库体系，最基础的是 <a href="https://github.com/rewgt/shadow-server" rel="nofollow noreferrer" target="_blank"><code>shadow-widget</code></a> 库自身，其上还有 <a href="https://github.com/rewgt/shadow-slide" rel="nofollow noreferrer" target="_blank"><code>shadow-slide</code></a>，<a href="https://github.com/rewgt/blogs" rel="nofollow noreferrer" target="_blank"><code>pinp-blogs</code></a> 等扩展库，各个扩展项目一般会提供它本层的网页样板（通常放在 <code>&lt;project&gt;/output/shared/pages/</code> 目录下）。</li>
<li>在创建的网页文件追加 <code>&lt;script src='your_file.js'&gt;&lt;/script&gt;</code> 代码   <br>然后在 <code>your_file.js</code> 文件编写 ES5 代码。</li>
<li>使用 Shadow Widget 的可视设计器设计用户界面   <br>用户界面设计的结果以转义标签的形式，保存在你的 <code>"*.html"</code> 网页文件中，然后你可以在 <code>your_file.js</code> 同步编写 JS 代码。</li>
<li>完成开发与测试后，把相关的 <code>html, js, css</code> 等文件上传发布到服务器发布   <br>因为不必做 ES6 转译，发布操作很直接。或许您要调整 <code>js, css, png</code> 等文件位置，或许您需 minify 某个 JS 文件，这些都是前端开发的基本技能，不是 Shadow Widget 特有的。</li>
</ol>
<p>最佳实践还建议多用 idSetter 函数定义各 component 的行为，不用（或少用）在 <code>main[path]</code> 定义投影类的方式，因为 idSetter 的函数式风格，让 MVVM 与 Flux 两种框架的交汇点处理起来更便利。</p>
<p>接下来，在展开细节介绍之前，我们先梳理一下 Shadow Widget 技术体系的几个特色概念。</p>
<h2 id="articleHeader1">2. <code>p-state</code> 与 <code>v-state</code>
</h2>
<p><code>p-state</code> 与 <code>v-state</code> 是 uglee 在 <a href="https://segmentfault.com/a/1190000008592692">《少妇白洁系列之 React StateUp Pattern, Explained》</a> 一文提出的概念，我们借用过来解释 React 中的数据流转模式。<code>p-state</code> 指 <strong>persistent state</strong>，是生命周期超过组件本身的 state 数据，即使组件从 DOM 上销毁，这些数据仍然需要在组件外部持久化。<code>v-state</code> 指 <strong>volatile state</strong>，是生命周期和组件一样的 state 数据，如果组件从 DOM 上销毁，这些 state 将一起销毁。</p>
<p>结合 Flux 框架，<code>v-state</code> 就是 <code>comp.props.xxx</code> 与 <code>comp.state.xxx</code> 数据，<code>p-state</code> 就是 store 里的数据，这么说虽有失严谨，但大致如此。如果未使用 Flux 框架，对 <code>comp</code> 的 <code>render()</code> 过程产生影响的所有数据中，全局变量或其它节点（包括上级节点）中的属性，都算当前节点的 <code>p-state</code>。</p>
<p>不过，<strong><code>v-state</code> 与 <code>p-state</code> 划分是静态的，相对而言的</strong>。比如，初始设计界面只要求显示摄氏度（Celsius）格式的温度值，然后觉得要适应全球化应用，摄氏度与华氏度（Fahrenheit）都得显示，再往后发现，Celsius 与 Fahrenheit 并列显示不够友好，就改成动态可配置，取国别信息后自动设成两者中一个。这种设计变迁中，“当前温度格式” 与 “并列显示或只显示一种” 的配置数据经常在 <code>v-state</code> 与 <code>p-state</code> 之间变迁。</p>
<p>React 工具链上几个 Flux 框架主要区别在于，如何定位与使用 <code>p-state</code>，它们对 <code>v-state</code> 使用基本一致，我们拿 reflux、redux、shadow-widget 三者分别举例。</p>
<p>Reflux 采用多 store，其 store 设计与 component 很接近，可以这么简单理解：既然跨 Component 存在数据交互，父子关系可以用 <code>props</code> 传递，非父子关系传不了，怎么办呢？那就设立第三方实体（也就是 store）处理此事。Redux 采用单 store，把它理解成一大坨全局变量就好，它以 action 设计为提纲，围绕 action 组织 reducer 函数，而 Reflux 中提纲挈领的东西则是 store 中的数据，围绕数据组织 action 定义。若对比这两者，Reflux 方式更易理解，需求分解与设计展开过程更人性化，不过，Reflux 没有突破 React 固有限制，因为多 store 模式，实践中大家经常很纠结某项数据该放在 component 中，还是放在 store 中呢？如前所述，一项数据是否为 <code>v-state</code> 是相对的，产品功能叠代后，数据经常要从 <code>v-state</code> 提升到 <code>p-state</code>，或者，若原设计偏于宽泛，还需将 <code>p-state</code> 降回 <code>v-state</code>。Reflux 困境在于 Store 设计与 Component 不对称，顺应来回变迁的成本较高。</p>
<p>Shadow Widget 也是多 Store，Component 自身就是 store，这克服了 Reflux 主要不足。另外结合 MVVM 架构的可视化特点，Shadow Widget 还克服了 redux 主要不足。</p>
<h2 id="articleHeader2">3. 几种 Lift State Up 方式</h2>
<p>Shadow Widget 介绍了一种 “逆向同步 &amp; 单向依赖” 的机制，在如下节点树中，nodeE 要使用 nodeC 中的数据，但 nodeC 生存周期与 nodeE 并不一致，所以，引入一种机制，在它们共同的父节点 nodeA 设置一个属性（比如 <code>attrX</code>），nodeC 中的该数据能自动同步到 nodeA 中，然后让 nodeE 只依赖 nodeA 中的数据（比如 <code>attrX</code>），只要 NodeE 还存活，父节点 nodeD 与 nodeA 必然存活。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  nodeA
  +-- nodeB
  |   +-- nodeC
  +-- nodeD
  |   +-- nodeE" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>  nodeA
  +<span class="hljs-comment">-- nodeB</span>
  |   +<span class="hljs-comment">-- nodeC</span>
  +<span class="hljs-comment">-- nodeD</span>
  |   +<span class="hljs-comment">-- nodeE</span></code></pre>
<p>React 官方介绍了一种 <a href="https://facebook.github.io/react/docs/lifting-state-up.html" rel="nofollow noreferrer" target="_blank">"Lifting State Up"</a> 方法，借助函数式编程的特点，把控制界面显示效果的变量，从子节点提升到父节点，子节点的事件函数改在父节点定义，就达到 <code>Lift State Up</code> 的效果。</p>
<p>既然提升 state 能突破 React 对数据传递的限制，那么，极端一点，能否把所有用到的数据都改成全局变量呢？答案当然可以，不过缺少意义，这么做，无非将分散在各节点的逻辑，转移到处理一堆全局变量而己，设计过程本该分解，而非合并。可视节点分层分布本是天然的功能划分方式，放弃它改换门庭无疑把事情搞复杂了，可恶的 Redux 就是这么干的。</p>
<p>从本质上看，Redux 把 state 数据全局化了（成为单 store），但它又以 action 主导切割数据，你并不能直接存取全局 store，而是改由 action 驱动各个 reducer，各 reducer 只孤立处理它自身可见的 state。由此我有两点推论：</p>
<ol>
<li>弃用界面现成的分解方式，改建另一套体系并不明智   <br>就像描述双人博击，最直接的方式是先区分场上谁是谁，谁出击，谁防守，出击者挥拳，防守者缩头躲避。Redux 行事风格是先设计 “挥拳”、“缩头” 之类的 action，然后分解实施这些 action，来驱动各种 state 变化。该模式之所以行得通，不是 Redux 有多好，而是人脑太奇妙，编程中除了脑补产品应用场景，偶尔还会插帧处理俊男靓女图片 :)</li>
<li>数据隔离是必需的，否则无法应对大规模产品开发   <br>后文我们将介绍最佳实践中的数据隔离方法，以功能场景为依据。</li>
</ol>
<h2 id="articleHeader3">4. 功能块</h2>
<p>为方便说明问题，我们取 React 官方 <a href="https://facebook.github.io/react/docs/lifting-state-up.html" rel="nofollow noreferrer" target="_blank">"Lifting State Up"</a> 一文介绍的，判断温度是否达到沸点的应用场景，编写一段样例代码。</p>
<p>我们想设计如下界面：</p>
<p><span class="img-wrap"><img data-src="/img/bVWu5b?w=305&amp;h=106" src="https://static.alili.tech/img/bVWu5b?w=305&amp;h=106" alt="Temperature" title="Temperature" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">4.1 样例程序的功能</h3>
<p>如果输入温度未超沸点，界面显示 <code>"The water would not boil"</code>，若超沸点则显示 <code>"would boil"</code>。另外，用于输入温度的方框（即后述的 <code>field</code> 节点）要求可配置，用 <code>scale='c'</code> 指示以摄氏度表示，标题提示 <code>"Temperature in Celsius"</code>，否则 <code>scal='f'</code> 指示华氏度，提示 <code>"in Fahrenheit"</code>。</p>
<p>我们在 Shadow Widget 可视设计器中完成设计，存盘后生成的转义标签如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div $=BodyPanel key='body' klass='S5'>
  <div $=Panel key='calculator' klass='hidden-visible-auto row-reverse' 
      height='{null}' width='{300}' $id__='calculator'>
    <div $=Fieldset key='field' width='{0.9999}' scale='c'>
      <span $=Legend key='legend'>legend</span>
      <span $=Input key='input' type='text' default-value='0'></span>
    </div>
    <div $=P key='verdict' klass='visible-auto-hidden' width='{0.9999}'></div>
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> $=<span class="hljs-string">BodyPanel</span> <span class="hljs-attr">key</span>=<span class="hljs-string">'body'</span> <span class="hljs-attr">klass</span>=<span class="hljs-string">'S5'</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> $=<span class="hljs-string">Panel</span> <span class="hljs-attr">key</span>=<span class="hljs-string">'calculator'</span> <span class="hljs-attr">klass</span>=<span class="hljs-string">'hidden-visible-auto row-reverse'</span> 
      <span class="hljs-attr">height</span>=<span class="hljs-string">'{null}'</span> <span class="hljs-attr">width</span>=<span class="hljs-string">'{300}'</span> $<span class="hljs-attr">id__</span>=<span class="hljs-string">'calculator'</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> $=<span class="hljs-string">Fieldset</span> <span class="hljs-attr">key</span>=<span class="hljs-string">'field'</span> <span class="hljs-attr">width</span>=<span class="hljs-string">'{0.9999}'</span> <span class="hljs-attr">scale</span>=<span class="hljs-string">'c'</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> $=<span class="hljs-string">Legend</span> <span class="hljs-attr">key</span>=<span class="hljs-string">'legend'</span>&gt;</span>legend<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> $=<span class="hljs-string">Input</span> <span class="hljs-attr">key</span>=<span class="hljs-string">'input'</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'text'</span> <span class="hljs-attr">default-value</span>=<span class="hljs-string">'0'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> $=<span class="hljs-string">P</span> <span class="hljs-attr">key</span>=<span class="hljs-string">'verdict'</span> <span class="hljs-attr">klass</span>=<span class="hljs-string">'visible-auto-hidden'</span> <span class="hljs-attr">width</span>=<span class="hljs-string">'{0.9999}'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>然后在 JS 文件编写如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!window.W) { window.W = new Array(); W.$modules = [];}
W.$modules.push( function(require,module,exports) {

var React = require('react');
var ReactDOM = require('react-dom');
var W = require('shadow-widget');

var main = W.$main, utils = W.$utils, ex = W.$ex;
var idSetter = W.$idSetter;

if (W.__design__) return;

(function() { // functionarity block

var selfComp = null, verdictComp = null;
var scaleNames = { c:'Celsius', f:'Fahrenheit' };

idSetter['calculator'] = function(value,oldValue) {
  if (value <= 2) {
    if (value == 1) {      // init
      selfComp = this;
      this.defineDual('temperature', function(value,oldValue) {
        if (Array.isArray(value) &amp;&amp; verdictComp) {
          var scale = value[0], degree = value[1];
          var isBoil = degree >= (scale == 'c'?100:212);
          verdictComp.duals['html.'] = isBoil?
            'The water would boil.':
            'The water would not boil.';
        }
      });
    }
    else if (value == 2) { // mount
      verdictComp = this.componentOf('verdict');
      
      var field = this.componentOf('field');
      var inputComp = field.componentOf('input');
      var legend = field.componentOf('legend');
      var sScale = field.props.scale || 'c';
      legend.duals['html.'] = 'Temperature in ' + scaleNames[sScale];
      
      inputComp.listen('value',onInputChange.bind(inputComp));
      this.duals.temperature = [ sScale,
        parseFloat(inputComp.duals.value) || 0
      ];
    }
    else if (value == 0) { // unmount
      selfComp = verdictComp = null;
    }
    return;
  }
  
  function onInputChange(value,oldValue) {
    var scale = this.parentOf().props.scale || 'c';  // 'c' or 'f'
    var degree = parseFloat(value) || 0; // take NaN as 0
    selfComp.duals.temperature = [scale,degree];
  }
};

})();

});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (!<span class="hljs-built_in">window</span>.W) { <span class="hljs-built_in">window</span>.W = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(); W.$modules = [];}
W.$modules.push( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require,module,exports</span>) </span>{

<span class="hljs-keyword">var</span> React = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react'</span>);
<span class="hljs-keyword">var</span> ReactDOM = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react-dom'</span>);
<span class="hljs-keyword">var</span> W = <span class="hljs-built_in">require</span>(<span class="hljs-string">'shadow-widget'</span>);

<span class="hljs-keyword">var</span> main = W.$main, utils = W.$utils, ex = W.$ex;
<span class="hljs-keyword">var</span> idSetter = W.$idSetter;

<span class="hljs-keyword">if</span> (W.__design__) <span class="hljs-keyword">return</span>;

(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// functionarity block</span>

<span class="hljs-keyword">var</span> selfComp = <span class="hljs-literal">null</span>, verdictComp = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">var</span> scaleNames = { <span class="hljs-attr">c</span>:<span class="hljs-string">'Celsius'</span>, <span class="hljs-attr">f</span>:<span class="hljs-string">'Fahrenheit'</span> };

idSetter[<span class="hljs-string">'calculator'</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value,oldValue</span>) </span>{
  <span class="hljs-keyword">if</span> (value &lt;= <span class="hljs-number">2</span>) {
    <span class="hljs-keyword">if</span> (value == <span class="hljs-number">1</span>) {      <span class="hljs-comment">// init</span>
      selfComp = <span class="hljs-keyword">this</span>;
      <span class="hljs-keyword">this</span>.defineDual(<span class="hljs-string">'temperature'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value,oldValue</span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(value) &amp;&amp; verdictComp) {
          <span class="hljs-keyword">var</span> scale = value[<span class="hljs-number">0</span>], degree = value[<span class="hljs-number">1</span>];
          <span class="hljs-keyword">var</span> isBoil = degree &gt;= (scale == <span class="hljs-string">'c'</span>?<span class="hljs-number">100</span>:<span class="hljs-number">212</span>);
          verdictComp.duals[<span class="hljs-string">'html.'</span>] = isBoil?
            <span class="hljs-string">'The water would boil.'</span>:
            <span class="hljs-string">'The water would not boil.'</span>;
        }
      });
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (value == <span class="hljs-number">2</span>) { <span class="hljs-comment">// mount</span>
      verdictComp = <span class="hljs-keyword">this</span>.componentOf(<span class="hljs-string">'verdict'</span>);
      
      <span class="hljs-keyword">var</span> field = <span class="hljs-keyword">this</span>.componentOf(<span class="hljs-string">'field'</span>);
      <span class="hljs-keyword">var</span> inputComp = field.componentOf(<span class="hljs-string">'input'</span>);
      <span class="hljs-keyword">var</span> legend = field.componentOf(<span class="hljs-string">'legend'</span>);
      <span class="hljs-keyword">var</span> sScale = field.props.scale || <span class="hljs-string">'c'</span>;
      legend.duals[<span class="hljs-string">'html.'</span>] = <span class="hljs-string">'Temperature in '</span> + scaleNames[sScale];
      
      inputComp.listen(<span class="hljs-string">'value'</span>,onInputChange.bind(inputComp));
      <span class="hljs-keyword">this</span>.duals.temperature = [ sScale,
        <span class="hljs-built_in">parseFloat</span>(inputComp.duals.value) || <span class="hljs-number">0</span>
      ];
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (value == <span class="hljs-number">0</span>) { <span class="hljs-comment">// unmount</span>
      selfComp = verdictComp = <span class="hljs-literal">null</span>;
    }
    <span class="hljs-keyword">return</span>;
  }
  
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onInputChange</span>(<span class="hljs-params">value,oldValue</span>) </span>{
    <span class="hljs-keyword">var</span> scale = <span class="hljs-keyword">this</span>.parentOf().props.scale || <span class="hljs-string">'c'</span>;  <span class="hljs-comment">// 'c' or 'f'</span>
    <span class="hljs-keyword">var</span> degree = <span class="hljs-built_in">parseFloat</span>(value) || <span class="hljs-number">0</span>; <span class="hljs-comment">// take NaN as 0</span>
    selfComp.duals.temperature = [scale,degree];
  }
};

})();

});</code></pre>
<p>上面 <code>if (W.__design__) return</code> 一句，让其后代码在 <code>__design__</code> 态时（即，在可视设计器中）不生效。</p>
<h3 id="articleHeader5">4.2 功能块</h3>
<p>按我们最佳实践的做法，界面可视化设计的结果保存在页面 <code>*.html</code> 文件，而界面的代码实现（包括定义事件响应、绑捆数据驱动等）在 JS 文件编写。所以，上面例子的设计结果包括两部分：<code>*.html</code> 文件中的转义标签与 <code>*.js</code> 文件中的 javascript 脚本。</p>
<p>多个组件共同完成某项特定功能，他们合起来形成逻辑上的整体叫做 “功能块” （Functionarity Block）。典型的 JS 文件通常按这个样式编写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!window.W) { window.W = new Array(); W.$modules = [];}
W.$modules.push( function(require,module,exports) {

// 全局变量定义
var React = require('react');
var ReactDOM = require('react-dom');
var W = require('shadow-widget');

var main = W.$main, utils = W.$utils, ex = W.$ex;
var idSetter = W.$idSetter;

if (W.__design__) return;

// 功能块定义
(function() {

// ....

})()

// 初始化定义
main.$onLoad.push( function() {
  // ...
});

});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (!<span class="hljs-built_in">window</span>.W) { <span class="hljs-built_in">window</span>.W = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(); W.$modules = [];}
W.$modules.push( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require,module,exports</span>) </span>{

<span class="hljs-comment">// 全局变量定义</span>
<span class="hljs-keyword">var</span> React = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react'</span>);
<span class="hljs-keyword">var</span> ReactDOM = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react-dom'</span>);
<span class="hljs-keyword">var</span> W = <span class="hljs-built_in">require</span>(<span class="hljs-string">'shadow-widget'</span>);

<span class="hljs-keyword">var</span> main = W.$main, utils = W.$utils, ex = W.$ex;
<span class="hljs-keyword">var</span> idSetter = W.$idSetter;

<span class="hljs-keyword">if</span> (W.__design__) <span class="hljs-keyword">return</span>;

<span class="hljs-comment">// 功能块定义</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

<span class="hljs-comment">// ....</span>

})()

<span class="hljs-comment">// 初始化定义</span>
main.$onLoad.push( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// ...</span>
});

});</code></pre>
<p>头部用来定义若干全局变量，然后定义功能块，功能块可能有多个，上面举例的判断温度是否超沸点，比较简单，定义一个功能块就够了，最后定义 <code>main.$onLoad</code> 全局初始化函数。</p>
<p>之所以将一个功能块用一个函数包裹，主要为了构造独立的命名空间（Namespace），比如前面举例的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function() { // functionarity block

var selfComp = null, verdictComp = null;
var scaleNames = { c:'Celsius', f:'Fahrenheit' };

idSetter['calculator'] = function(value,oldValue) {
  // ...
};

})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// functionarity block</span>

<span class="hljs-keyword">var</span> selfComp = <span class="hljs-literal">null</span>, verdictComp = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">var</span> scaleNames = { <span class="hljs-attr">c</span>:<span class="hljs-string">'Celsius'</span>, <span class="hljs-attr">f</span>:<span class="hljs-string">'Fahrenheit'</span> };

idSetter[<span class="hljs-string">'calculator'</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value,oldValue</span>) </span>{
  <span class="hljs-comment">// ...</span>
};

})();</code></pre>
<p>由功能块函数构造的 Namespace 也称 “功能块空间”（Functionarity Block Space），在功能块内共享的变量在此定义，比如这里的 <code>selfComp, verdictComp, scaleNames</code> 变量。</p>
<h3 id="articleHeader6">4.3 功能块入口节点</h3>
<p>一个功能块的入口节点是特殊节点，它的生存周期反映了功能块的生存周期。它的各层子节点若还存在（即在 unmount 之前），入口节点必然存在。因为入口节点的生存期能完整覆盖它各级子节点的生存期，所以，我们一般在入口节点定义 idSetter 函数，承担本功能块的主体逻辑处理。</p>
<p>上例的功能块定义了如下节点树：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" Panel (key=calculator)
  +-- Fieldset (key=field)
  |   +-- Legend (key=legend)
  |   +-- Input (key=input)
  +-- P (key=verdict)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code> Panel (<span class="hljs-built_in">key</span>=calculator)
  +-- Fieldset (<span class="hljs-built_in">key</span>=field)
  |   +-- Legend (<span class="hljs-built_in">key</span>=<span class="hljs-built_in">legend</span>)
  |   +-- Input (<span class="hljs-built_in">key</span>=input)
  +-- P (<span class="hljs-built_in">key</span>=verdict)</code></pre>
<p>入口节点是 <code>calculator</code> 面板，结合该节点的 idSetter 函数书写特点，我们接着介绍 Shadow Widget 最佳实践如何处理 "功能块" 之内的编程。</p>
<p>&nbsp;</p>
<p>1) 为方便编程，不妨在 “功能块空间” 多定义变量</p>
<p>因为 “功能块空间” 的变量不外泄到其它功能块，我们不必担心多定义变量会给其它部分编码带来 Side Effects。功能块里各个节点，只要不是动态创建、删除、再创建那种，都可定义成 “功能块空间” 的变量，我们一般在入口节点 idSetter 函数的 unmount 代码段（即 <code>if (value == 0)</code>），把各个节点的变量置回 <code>null</code> 值。</p>
<p>对于动态增删的节点，不妨用 <code>this.componentOf(sPath)</code> 动态方式定位。</p>
<p>&nbsp;</p>
<p>2) 功能块内的数据主体流向，宜在界面设计时就指定</p>
<p>在功能块的 idSetter 函数也能以编程方式设计节点间数据流向，考虑到界面设计与数据流规则直接相关，能以描述方式（转义标签形式）表达数据流的，尽量用描述方式，不方便的才用 JS 编程方式去实现。因为，一方面，Shadow Widget 的指令式 UI 描述能力够强，另一方面，这么做有助于让 MVVM 中的 <code>ViewModel</code> 集中，从而降低设计复杂度。</p>
<p>界面设计时，不妨多用下述技巧：</p>
<ol>
<li>以 <code>$for=''</code> 或 <code>$$for=''</code> 开启一层 callspace，方便其下节点的可计算属性用 <code>duals.attr</code> 引用数据。</li>
<li>善用 <code>$trigger</code> 同步数据</li>
<li>如果节点层次复杂，不妨采用导航面板（<code>NavPanel</code> 与 <code>NavDiv</code>），用 <code>"./xx.xx"</code> 相对路径方式让节点定位更方便</li>
</ol>
<p>&nbsp;</p>
<p>3) 善用变量共享机制</p>
<p>若按 React 原始开发方式编码，不借助任何 Flux 框架工具，大家肯定觉得编程很不方便，因为各节点除了能往子节点单向传递 <code>props</code> 外，与其它节点的交互几乎隔了一道黑幕。然而，不幸的是，React 几个主流的 Flux 工具，均没有妥善解决几个主要问题，上面提到的 Reflux、Redux 均如此，React 官方的 <code>react-flux</code> 更难用。</p>
<p>相对而言，Shadow Widget 的解决方案好很多，一方面，在 Component 节点引入 “双源属性”，功能强大，能让基于过程组装的 UI 渲染，过渡到 <strong>以属性变化来驱动渲染</strong>，即：除了 “功能块” 的入口节点需集中编写控制逻辑，其它节点的编程，基本简化为定制若干 duals 函数（用 <code>defineDual()</code> 注册）。另一方面，Shadow Widget 借助 Functionarity Block 抽象层来重组数据，<strong>以功能远近作聚合依据</strong>，明显比以 Action 驱动的 Reducer 分割要高明。</p>
<p>从本质上讲，拎取 “功能块抽象层” 也是 <code>Lift State Up</code> 的一种手段，限制更少，结合于 JS 编程也更自然。虚拟 DOM 树中的各 component 节点有隔离措拖，不能互相识别，但函数编程没什么限制，比如上面例子，<code>selfComp = this</code> 把一个 Component 赋给 “功能块空间” 的变量 <code>selfComp</code> 后，同在一个功能块的其它函数都能使用它了。</p>
<p>（未完，下篇待续...）</p>
<p>&nbsp;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 可视化开发工具 shadow-widget 最佳实践（上）

## 原文链接
[https://segmentfault.com/a/1190000011520268](https://segmentfault.com/a/1190000011520268)

