---
title: '去哪儿网迷你React的研发心得' 
date: 2018-12-31 2:30:29
hidden: true
slug: 0c9la8y5nnub
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>去哪儿网迷你React</strong>是年初立项的新作品，在这前，去哪儿网已经深耕多年，拥有<strong>QRN</strong>（react-native的公司制定版），<strong>HY</strong>（基于React的hybird方案）， <strong>yo</strong>(基于React的移动UI库)，<strong>QRN-web</strong>(基于React的三端合一移植方案)，此外，像机票等部门也大规模将React用于前台页面，后台页面就更不在话下。</p>
<p>如此广泛地应用React，我们熟晓其优缺点。优点是代码的可维护性大大提高，性能卓然！但缺点也明显，由于体积太大，React.js+React-DOM.js超过3万行，体量过3MB，已经加上immutable.js , redux, redux-react, react-router等全家桶，工程师一行代码没有写，已经好几MB了。这在过去绝对不可想象，要知道，体积意味着流量，流量代表着金钱，越大越烧钱，越大下载速度越慢，用户体验越差，用户就会流失。现在问题摆在我们面前，我们就得解决。虽然webpack官网有各种瘦身方案，但瘦死的大象也比马大。这是一个如此普遍存在的问题，因此外国人肯定也遇到过，思考过，提出什么新点子——所有这一切，都指向一个名词，“迷你React”。</p>
<p>作为一个生态圈成熟的标志，一个库出名了，就各种偏门补丁，闪光效果往上加，库难免会膨胀，不爽的人就会推出迷你化方案。上一个世代是jQuery与zepto。React的迷你方案也有不少，preact, inferno, react-lite, dio, rax……</p>
<p><span class="img-wrap"><img data-src="/img/bVVjQA?w=459&amp;h=198" src="https://static.alili.tech/img/bVVjQA?w=459&amp;h=198" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>但问题不是简单到直接从github找一个迷你React库替换上就能搞定。之所以称为迷你，肯定有所欠缺，如果是内部实现的改良也罢，如果阉割了功能可不是闹着玩。恰恰他们就好这口，因此现有方案不能满足我们。我们需要一个能直接替换，或至少95％的业务代码不用动。这意味着这迷你框架，需要与React的接口完全一致，并且全面支持它的全家桶。当然细化一下来的需来就更多了，早期说只要支持移动，因此取名为react-mobile，后来连iE8也要支持，因此这活不能指望别人，我们自己动手撸了。</p>
<p><span class="img-wrap"><img data-src="/img/bVVjQI?w=456&amp;h=156" src="https://static.alili.tech/img/bVVjQI?w=456&amp;h=156" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>我们先来一趟竞品分析。为了加快产出速度，能借鉴的尽可能借鉴。React推出以后，针对其性能研究衍生出不少库，针对其体积也诞生出大量仿品。它比jQuery更加缤纷多采。市面上竟然拥有100多个虚拟DOM库。虚拟DOM库，就是React出来后的一种新式库，以虚拟DOM与diff算法为核心，屏蔽DOM操作，操作数据即操作视图。这听起来有点像MVVM，MVVM也是屏蔽DOM操作，操作数据即操作视图，但它是以VM为核心。</p>
<p><span class="img-wrap"><img data-src="/img/bVVjQK?w=526&amp;h=292" src="https://static.alili.tech/img/bVVjQK?w=526&amp;h=292" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>React及其他虚拟DOM库已经将虚拟DOM的生成交由JSX与babel处理了，因此不同点是，虚拟DOM的结构与diff算法。虚拟DOM万宗不离其变是三大属性，type, props, children，当然也可以改一下别名，babel可以做相应配置。此外，虚拟DOM可以加入更多冗余标识，以帮diff算法的改良。</p>
<p>React最初推出时也不火，那时的招牌与现在性能不什么两样，也是高性能。但是JSX离经背道，与业界宣扬了多年的前后端分离，数据结构样式分离等教条差太远了，一直默默在角落里画圈。直到RN出来，解决原生编写界面的痛苦才一炮而红。大家才留意它的性能，它的性能背后的diff算法。最早研究React的diff算法是virtual-dom这个库，是基于经典的DFS算法。后来相应的算法就多起来。最后才是从接口进行模拟，就是所谓的React-like框架。因此虚拟DOM库是分为两大派系：算法派与拟态派。</p>
<p><span class="img-wrap"><img data-src="/img/bVVjQR?w=492&amp;h=228" src="https://static.alili.tech/img/bVVjQR?w=492&amp;h=228" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>下面将从这两大派系进行扼要的描述。</p>
<p>将前端回归到算法上的探索是前端框架史上的一个巨大进步。之前是MVVM将数据从繁复的DOM操作分离出来。正因为有了纯数据，并且数据结构可控，那么算法才有发挥的余地。</p>
<p>最开始出现的是 virtual-dom这个库，是大家好奇React为什么这么快而搞鼓出来的。它的实现是非常学院风格，通过深度优先搜索与in-order tree来实现高效的diff。它与React后来公开出来的算法是很不一样。</p>
<p>然后是cito.js的横空出世，它对今后所有虚拟DOM的算法都有重大影响。它采用两端同时进行比较的算法，将diff速度拉高到几个层次。</p>
<p>紧随其后的是kivi.js，在cito.js的基出提出两项优化方案，使用key实现移动追踪及基于key的编辑长度矩离算法应用（算法复杂度 为O(n^2)）。</p>
<p>但这样的diff算法太过复杂了，于是后来者snabbdom将kivi.js进行简化，去掉编辑长度矩离算法，调整两端比较算法。速度略有损失，但可读性大大提高。再之后，就是著名的vue2.0 把sanbbdom整个库整合掉了。</p>
<p>当然算法派的老大是inferno，它使用多种优化方案将性能提至最高，因此其作者便邀请进react core team，负责react的性能优化了。这个我后面会详细。</p>
<p><span class="img-wrap"><img data-src="/img/bVVjQW?w=473&amp;h=279" src="https://static.alili.tech/img/bVVjQW?w=473&amp;h=279" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>再看拟态派。React的接口并不多，但是其组件的实现是相当有难度。它的生命周期是如何运作，需要对源码有深刻的理解，因此它们出来得比较晚。我们的学习对象也就是它们几个。</p>
<p><span class="img-wrap"><img data-src="/img/bVVjQ2?w=464&amp;h=237" src="https://static.alili.tech/img/bVVjQ2?w=464&amp;h=237" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>先说虚拟DOM。虚拟DOM就是一个普通的JS对象，通常拥有三个属性，type, props, children。但无状态组件出来后，children改放到props中。此外，有些元素还有ref属性，可以是字符串与函数。在数组里，为了提高diff速度，又多出了key属性。bable会将JSX这些属性转换为一个VNode对象。这是虚拟DOM的最小单元。所有虚拟DOM会组成一棵树，叫虚拟DOM树。</p>
<p>为了防止每次都是整个树进行diff，需要形成子树的概念，于是出现组件了。组件有render方法，会返回一个虚拟DOM，这个虚拟DOM及其子孙，就形成一棵子树。但render方法不是虚拟DOM的东西，于是我们规定当虚拟DOM为一个函数时，如果这个函数继承于React.Component，这个方法的实例必须有render方法。于是我们就像虚拟DOM与组件统合起来了。或者衍生这两个称呼，原子虚拟DOM与组件虚拟DOM。原子虚拟DOM对应元素节点，而组件则是用来产出原子虚拟DOM。此外，原子虚拟DOM还能包含一些东西，字符串与数字与null。字符串与数字对应文本节点，null对应注释节点。</p>
<p><span class="img-wrap"><img data-src="/img/bVVjQ4?w=440&amp;h=287" src="https://static.alili.tech/img/bVVjQ4?w=440&amp;h=287" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>一个组件虚拟DOM实例化为组件后，会返回原子虚拟DOM或另一个组件虚拟DOM。这就形成函数式编程上的高阶函数的机制，因此进行出无状态函数组件，就是虚拟DOM的type属性就是一个函数，不继承其他东西了。</p>
<p>组件虚拟DOM的实例化过程是非常复杂，如果能简化这过程，简化其结构，这性能就上去了。</p>
<p><span class="img-wrap"><img data-src="/img/bVVjQ6?w=399&amp;h=286" src="https://static.alili.tech/img/bVVjQ6?w=399&amp;h=286" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>此外组件的实例本身就巨耗性能，因此官方推荐页面的结构如下，通过最少量的有状态组件（smart component）控制无状态组件(dumb component)的变化，所有状态通过redux在路由进行分发。</p>
<p><span class="img-wrap"><img data-src="/img/bVVjQ9?w=579&amp;h=506" src="https://static.alili.tech/img/bVVjQ9?w=579&amp;h=506" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>经过一番比较后，我们着手开发自己的迷你React。这个过程也比较坎坷，这还是有前人参照物的情况下，可想而知，当初facebook开发出React这样一个独行特立的框架时，是多么艰辛。我们在这半年总共搞了三个东西，第一还孵化失败。</p>
<p><span class="img-wrap"><img data-src="/img/bVVjRb?w=513&amp;h=136" src="https://static.alili.tech/img/bVVjRb?w=513&amp;h=136" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>最初是基于react-lite，考虑时当时是我们母公司的人搞的，方便交流。但后来发现它的事件系统太鸡肋，难以扩展，最后放弃了。</p>
<p>第二代是基于preact，代号qreact， 国内也有许多公司基于它做自己的迷你化方案，因为官方提供了一个preact-compat的模块。但是preact-compat是使用Object.defineProperty来实现一些属性名映射与同步的，因此不支持IE8，并且使用了Object.defineProperty会严重拖慢速度。preact本身也有不少BUG，最著名的有三个，生命周期的unmount钩子不能保证在mount之前执行，元素节点的重复利用没有清理样式会导致出错，同一组孩子下可能存在同名的key导致排序失败。这些我们都为官方提issue，并且在我们的版本中进行修复了。第二代也公司内部几个项目中试水落地，反映不错。</p>
<p>第三代是我们团队独力开发，a内部代号anu，正式名称仍然是 QReact，不过演进到了 QReact 1.0 了  （现在的版本使用了 1.0 大版本，因为之前这个版本没被占用，所以没跳到 2.0）。在对preact缝缝补补的过程，掌握不少核心知识，新的框架是使用全新的算法，全新的结构。由于不使用高级API，理论上能支持到IE6，但我们公司只需支持到IE8。</p>
<p>Qreact1.0使用requestAnimationFrame来稳定它的运行帧数，保证在60帧每秒的流畅速度。由于bable会对type进行打补丁，内部统一用typeNumber代替type进行类型判定。使用列队保证生命周期钩子按顺序执行。使用__rerender标识一个组件在一次大的更新只会被render一次。凡此种种，经过大量测试，它们的接口与React别无二致，甚至React废弃的接口createClass, PropTypes，我们都有相应的polyfill。</p>
<p>下面是Qreact1.0的测试数据。<br>从性能上，直追preact。</p>
<p><span class="img-wrap"><img data-src="/img/bVVjRe?w=652&amp;h=491" src="https://static.alili.tech/img/bVVjRe?w=652&amp;h=491" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>从体积上，是官方react的1/4至1/5之间。</p>
<p><span class="img-wrap"><img data-src="/img/bVVjRl?w=1350&amp;h=270" src="https://static.alili.tech/img/bVVjRl?w=1350&amp;h=270" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这里透露一下React性能爆表的秘密，除了diff算法外，setState的合并操作也是一个关键。当组件没有插入到DOM树前，用户在componentWillMount方法多次执行setState，这些state是不会触发更新，而是存放到一个数组中，然后在render方法里进行合并与应用。当一个组件进行更新，可能是用户在componentDidMount或者事件回调执行setState，这时更新是即时的，同步的，但这之次再setState，它就不会更新了，它的state会进入列队。此外，如果用户在componentWillReceiveProps多次执行setState，也会产生延迟。React这种行为是保证页面的更新次数最少，同时用户不会察觉它没有更新。它只是将state进行了合并。Qreact1.0是完全遵循了这些规则，从而实现了高性能。</p>
<p>而在体积上，则通过删除一些对线上没用的代码实现迷你化效果。</p>
<p><span class="img-wrap"><img data-src="/img/bVVjRm?w=415&amp;h=250" src="https://static.alili.tech/img/bVVjRm?w=415&amp;h=250" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>但仅是这样不足以大吹特吹了。为了超越React的性能，从inferno与preact借签了不少手段。</p>
<p><span class="img-wrap"><img data-src="/img/bVVjRt?w=477&amp;h=266" src="https://static.alili.tech/img/bVVjRt?w=477&amp;h=266" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>最值得一提的是hydrate机制，通过合并相邻字符串，从而减少文本节点的生成，从而减少diff次数。</p>
<p><span class="img-wrap"><img data-src="/img/bVVjRB?w=846&amp;h=418" src="https://static.alili.tech/img/bVVjRB?w=846&amp;h=418" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>最后还有一个压轴大戏，不做测试不知道，原来高级API是如何耗性能。通过去掉Object.freeze, Object.defineProperty这些es5方法, 框架就有10帧的提升！</p>
<p><span class="img-wrap"><img data-src="/img/bVVjRF?w=463&amp;h=247" src="https://static.alili.tech/img/bVVjRF?w=463&amp;h=247" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>说了这么多，来些实际可运行的例子吧。目前，Qreact跑通内部几套测试，已经在金融与大搜的项目使用。它的第二版也在机票一个拥有820个模块的大项目中试水，在IE8下良好运行。</p>
<p><span class="img-wrap"><img data-src="/img/bVVjRO?w=285&amp;h=283" src="https://static.alili.tech/img/bVVjRO?w=285&amp;h=283" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如果大家想在项目中使用qreact,可以在webpack或ykit的config中如下配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
resolve: {
   alias: {
      'react': 'anujs',
      'react-dom': 'anujs',
        // 若要兼容 IE 请使用以下配置
        // 'react': 'anujs/dist/ReactIE',
        // 'react-dom': 'anujs/dist/ReactIE',
    
        // 如果引用了 prop-types 或 create-react-class
        // 需要添加如下别名
        'prop-types': 'anujs/lib/ReactPropTypes',
        'create-react-class': 'anujs/lib/createClass'
        //如果你在移动端用到了onTouchTap事件
        'react-tap-event-plugin': 'anujs/lib/injectTapEventPlugin',  
   }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
resolve: {
   <span class="hljs-attr">alias</span>: {
      <span class="hljs-string">'react'</span>: <span class="hljs-string">'anujs'</span>,
      <span class="hljs-string">'react-dom'</span>: <span class="hljs-string">'anujs'</span>,
        <span class="hljs-comment">// 若要兼容 IE 请使用以下配置</span>
        <span class="hljs-comment">// 'react': 'anujs/dist/ReactIE',</span>
        <span class="hljs-comment">// 'react-dom': 'anujs/dist/ReactIE',</span>
    
        <span class="hljs-comment">// 如果引用了 prop-types 或 create-react-class</span>
        <span class="hljs-comment">// 需要添加如下别名</span>
        <span class="hljs-string">'prop-types'</span>: <span class="hljs-string">'anujs/lib/ReactPropTypes'</span>,
        <span class="hljs-string">'create-react-class'</span>: <span class="hljs-string">'anujs/lib/createClass'</span>
        <span class="hljs-comment">//如果你在移动端用到了onTouchTap事件</span>
        <span class="hljs-string">'react-tap-event-plugin'</span>: <span class="hljs-string">'anujs/lib/injectTapEventPlugin'</span>,  
   }
},</code></pre>
<p>如果大家对qreact在感兴趣，欢迎与我联系，也欢迎大家为我的框架加星。</p>
<p><a href="https://github.com/RubyLouvre/anu/" rel="nofollow noreferrer" target="_blank">https://github.com/RubyLouvre/anu/</a><br><a href="https://github.com/YMFE/qreact" rel="nofollow noreferrer" target="_blank">https://github.com/YMFE/qreact</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
去哪儿网迷你React的研发心得

## 原文链接
[https://segmentfault.com/a/1190000011235844](https://segmentfault.com/a/1190000011235844)

