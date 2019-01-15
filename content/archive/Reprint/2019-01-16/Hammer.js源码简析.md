---
title: 'Hammer.js源码简析' 
date: 2019-01-16 2:30:08
hidden: true
slug: 9xxcznrq047
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">开始</h1>
<p>话说上周周末闲的蛋疼，突然想了解一下前端手势如何处理，好解开自己一个知识盲点，于是开始啃源码。。。并纪录一下。</p>
<h1 id="articleHeader1">一个手势</h1>
<p>在我们的前端页面里面复杂的手势应该是不多见的，一般常用就是拖拉，双击，放大缩小这几个，但是合理运用手势很明显也能为我们页面的交互体验有一点增色，那么问题来了，如何识别一个手势尼？</p>
<h1 id="articleHeader2">Hammer.js</h1>
<p>Hammer.js 应该算是前端使用的比较广泛的一个手势框架了（我所了解的还有一个AlloyTouch，更小，当然它提供的抽象程度是不如Hammer.js的），今天就拿这个框架来开刀吧。</p>
<h2 id="articleHeader3">配置参数</h2>
<p>我们先来看Hammer.js的配置参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
      //手势事件触发时，是否同时触发对应的一个自定义的dom事件，当然这个没有直接绑定事件回调高效
      domEvents: false, 
      //这个会影响对应的css属性touch-action的值，下面会接着说
      touchAction: TOUCH_ACTION_COMPUTE, 
      enable: true, //是否开启手势识别
      //可以指定在其他的元素上来检测与touch相关的事件并作为输入源，如果没设置就是当前检测的元素了
      inputTarget: null, 
      inputClass: null, //输入源类型，鼠标还是触摸或者是混合
      recognizers: [], //我们配置的手势识别器
      //预设的一些手势识别器，格式：[RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]]
      preset: [ 
          [RotateRecognizer, { enable: false }],
          [PinchRecognizer, { enable: false }, ['rotate']],
          [SwipeRecognizer, { direction: DIRECTION_HORIZONTAL }],
          [PanRecognizer, { direction: DIRECTION_HORIZONTAL }, ['swipe']],
          [TapRecognizer],
          [TapRecognizer, { event: 'doubletap', taps: 2 }, ['tap']],
          [PressRecognizer]
      ],
      cssProps: { //额外的一些css属性
        userSelect: 'none',
        touchSelect: 'none',
        touchCallout: 'none',
        contentZooming: 'none',
        userDrag: 'none',
        tapHighlightColor: 'rgba(0,0,0,0)'
     }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
      <span class="hljs-comment">//手势事件触发时，是否同时触发对应的一个自定义的dom事件，当然这个没有直接绑定事件回调高效</span>
      domEvents: <span class="hljs-literal">false</span>, 
      <span class="hljs-comment">//这个会影响对应的css属性touch-action的值，下面会接着说</span>
      touchAction: TOUCH_ACTION_COMPUTE, 
      <span class="hljs-attr">enable</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">//是否开启手势识别</span>
      <span class="hljs-comment">//可以指定在其他的元素上来检测与touch相关的事件并作为输入源，如果没设置就是当前检测的元素了</span>
      inputTarget: <span class="hljs-literal">null</span>, 
      <span class="hljs-attr">inputClass</span>: <span class="hljs-literal">null</span>, <span class="hljs-comment">//输入源类型，鼠标还是触摸或者是混合</span>
      recognizers: [], <span class="hljs-comment">//我们配置的手势识别器</span>
      <span class="hljs-comment">//预设的一些手势识别器，格式：[RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]]</span>
      preset: [ 
          [RotateRecognizer, { <span class="hljs-attr">enable</span>: <span class="hljs-literal">false</span> }],
          [PinchRecognizer, { <span class="hljs-attr">enable</span>: <span class="hljs-literal">false</span> }, [<span class="hljs-string">'rotate'</span>]],
          [SwipeRecognizer, { <span class="hljs-attr">direction</span>: DIRECTION_HORIZONTAL }],
          [PanRecognizer, { <span class="hljs-attr">direction</span>: DIRECTION_HORIZONTAL }, [<span class="hljs-string">'swipe'</span>]],
          [TapRecognizer],
          [TapRecognizer, { <span class="hljs-attr">event</span>: <span class="hljs-string">'doubletap'</span>, <span class="hljs-attr">taps</span>: <span class="hljs-number">2</span> }, [<span class="hljs-string">'tap'</span>]],
          [PressRecognizer]
      ],
      <span class="hljs-attr">cssProps</span>: { <span class="hljs-comment">//额外的一些css属性</span>
        userSelect: <span class="hljs-string">'none'</span>,
        <span class="hljs-attr">touchSelect</span>: <span class="hljs-string">'none'</span>,
        <span class="hljs-attr">touchCallout</span>: <span class="hljs-string">'none'</span>,
        <span class="hljs-attr">contentZooming</span>: <span class="hljs-string">'none'</span>,
        <span class="hljs-attr">userDrag</span>: <span class="hljs-string">'none'</span>,
        <span class="hljs-attr">tapHighlightColor</span>: <span class="hljs-string">'rgba(0,0,0,0)'</span>
     }
}</code></pre>
<p>总的来说配置参数不多，也不算复杂，这个框架基本也算是开箱即用了，好，我们接着再深入一点。</p>
<h2 id="articleHeader4">初始化</h2>
<p>接着来到源码里面manager.js，可以看到以下一段的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class Manager {
    constructor() {
        ...
        this.element = element;
        this.input = createInputInstance(this);// 1
        this.touchAction = new TouchAction(this,this.options.touchAction);// 2

        toggleCssProps(this, true);
        
        each(this.options.recognizers, (item) => { //3
           let recognizer = this.add(new (item[0])(item[1]));
               item[2] &amp;&amp; recognizer.recognizeWith(item[2]);
               item[3] &amp;&amp; recognizer.requireFailure(item[3]);
           }, this);
        }
    ...
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Manager</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
        ...
        this.element = element;
        <span class="hljs-keyword">this</span>.input = createInputInstance(<span class="hljs-keyword">this</span>);<span class="hljs-comment">// 1</span>
        <span class="hljs-keyword">this</span>.touchAction = <span class="hljs-keyword">new</span> TouchAction(<span class="hljs-keyword">this</span>,<span class="hljs-keyword">this</span>.options.touchAction);<span class="hljs-comment">// 2</span>

        toggleCssProps(<span class="hljs-keyword">this</span>, <span class="hljs-literal">true</span>);
        
        each(<span class="hljs-keyword">this</span>.options.recognizers, (item) =&gt; { <span class="hljs-comment">//3</span>
           <span class="hljs-keyword">let</span> recognizer = <span class="hljs-keyword">this</span>.add(<span class="hljs-keyword">new</span> (item[<span class="hljs-number">0</span>])(item[<span class="hljs-number">1</span>]));
               item[<span class="hljs-number">2</span>] &amp;&amp; recognizer.recognizeWith(item[<span class="hljs-number">2</span>]);
               item[<span class="hljs-number">3</span>] &amp;&amp; recognizer.requireFailure(item[<span class="hljs-number">3</span>]);
           }, <span class="hljs-keyword">this</span>);
        }
    ...
} </code></pre>
<p>1.新建一个输入源<br>根据设备的不同手势可能是来自鼠标也有可能来自手机上的触摸屏，而且mouse event的属性和touch event的属性是有一丝差异的（还有pointer event），所以为了方便后续处理，Hammer.js也分别定义了不同类型输入源：MouseInput，PointerEventInput，SingleTouchInput，TouchInput和TouchMouseInput；并针对不同的事件，对参数做了一个简单处理（handler方法），最终得到统一格式的数据输出，就像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    {
       pointers: touches[0],
       changedPointers: touches[1],
       pointerType: INPUT_TYPE_TOUCH,
       srcEvent: ev
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    {
       <span class="hljs-attr">pointers</span>: touches[<span class="hljs-number">0</span>],
       <span class="hljs-attr">changedPointers</span>: touches[<span class="hljs-number">1</span>],
       <span class="hljs-attr">pointerType</span>: INPUT_TYPE_TOUCH,
       <span class="hljs-attr">srcEvent</span>: ev
    }</code></pre>
<p>在获取统一格式的输入数据后，会交由InputHandler进一步处理，会判断这次输入是手势的开始还是结束，如果是开始就会新建一个手势识别的session，并且计算一些与手势相关的数据（角度，偏移距离，移动方向等），具体可以在compute-input-data.js里面看到。<br>经过以这一轮计算，我们已经有足够的数据来支持之后的手势识别了。<br>另外一提的是，这五种输入源都继承了Input，在Input里面事件是这样绑定的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    this.evEl &amp;&amp; addEventListeners(this.element, this.evEl, this.domHandler);
    this.evTarget &amp;&amp; addEventListeners(this.target, this.evTarget, this.domHandler);
    this.evWin &amp;&amp; addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
    <span class="hljs-keyword">this</span>.evEl &amp;&amp; addEventListeners(<span class="hljs-keyword">this</span>.element, <span class="hljs-keyword">this</span>.evEl, <span class="hljs-keyword">this</span>.domHandler);
    <span class="hljs-keyword">this</span>.evTarget &amp;&amp; addEventListeners(<span class="hljs-keyword">this</span>.target, <span class="hljs-keyword">this</span>.evTarget, <span class="hljs-keyword">this</span>.domHandler);
    <span class="hljs-keyword">this</span>.evWin &amp;&amp; addEventListeners(getWindowForElement(<span class="hljs-keyword">this</span>.element), <span class="hljs-keyword">this</span>.evWin, <span class="hljs-keyword">this</span>.domHandler);
</code></pre>
<p>有三种绑定目标，当前的element，inputTarget，element所属的window，在window上绑定事件处理器还是很必要的（例如拖拉一个元素的时候）；另外翻了一下代码，inputTarget绑定都是touch相关的事件，不是很明白它的意图和场景，为什么要分离一个目标单独处理触摸事件。</p>
<p>2.设置元素样式里touch-action的值<br>在手机浏览器里面，一般也会自带一些手势处理，例如向右滑动或者向左滑动就是前进和后退，所以除了我们自己定义手势，还需要对浏览器的手势做一些限制或者禁止。<br>这里也举个栗子吧，在Hammer.js里面默认提供拖拉手势的识别器（就是pan.js），当在检测水平方向的拖拉的时候，这个识别器会把touch-action的值设为pay-y（允许浏览器处理垂直方向的拖拉，可以是一个垂直的滚动或者其他），那如果我又接着定义一个垂直方向拖拉的识别器时，touch-action的值是多少尼？（答案就是none，浏览器不会帮我们再处理了，垂直方向滚动也只能靠自己），那是怎样计算出来的尼？</p>
<p>在创建TouchAction对象时，如果配置参数中touchAction的值为TOUCH_ACTION_COMPUTE，便调用compute方法开始遍历recognizers，收集它们所希望设置的touch-action的值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    compute() {
        let actions = [];
        each(this.manager.recognizers, (recognizer) => {
          if (boolOrFn(recognizer.options.enable, [recognizer])) {
            actions = actions.concat(recognizer.getTouchAction());
          }
        });
        return cleanTouchActions(actions.join(' '));
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    compute() {
        <span class="hljs-keyword">let</span> actions = [];
        each(<span class="hljs-keyword">this</span>.manager.recognizers, (recognizer) =&gt; {
          <span class="hljs-keyword">if</span> (boolOrFn(recognizer.options.enable, [recognizer])) {
            actions = actions.concat(recognizer.getTouchAction());
          }
        });
        <span class="hljs-keyword">return</span> cleanTouchActions(actions.join(<span class="hljs-string">' '</span>));
      }</code></pre>
<p>最终在cleanTouchActions方法集中计算最终的值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     ...
     let hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
     let hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
     if (hasPanX &amp;&amp; hasPanY) {
       return TOUCH_ACTION_NONE;
     }
     ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">     ...
     let hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
     <span class="hljs-keyword">let</span> hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
     <span class="hljs-keyword">if</span> (hasPanX &amp;&amp; hasPanY) {
       <span class="hljs-keyword">return</span> TOUCH_ACTION_NONE;
     }
     ...</code></pre>
<p>3.配置手势识别器<br>主要是配置各个手势识别器之间的关系，是否可以协同还是互斥，用官网一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    var hammer = new Hammer(el, {});
    
    var singleTap = new Hammer.Tap({ event: 'singletap' });
    var doubleTap = new Hammer.Tap({event: 'doubletap', taps: 2 });
    var tripleTap = new Hammer.Tap({event: 'tripletap', taps: 3 });
    
    hammer.add([doubleTap, doubleTap, singleTap]);
    
    tripleTap.recognizeWith([doubleTap, singleTap]);
    doubleTap.recognizeWith(singleTap);
    
    doubleTap.requireFailure(tripleTap);
    singleTap.requireFailure([tripleTap, doubleTap]);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
    <span class="hljs-keyword">var</span> hammer = <span class="hljs-keyword">new</span> Hammer(el, {});
    
    <span class="hljs-keyword">var</span> singleTap = <span class="hljs-keyword">new</span> Hammer.Tap({ <span class="hljs-attr">event</span>: <span class="hljs-string">'singletap'</span> });
    <span class="hljs-keyword">var</span> doubleTap = <span class="hljs-keyword">new</span> Hammer.Tap({<span class="hljs-attr">event</span>: <span class="hljs-string">'doubletap'</span>, <span class="hljs-attr">taps</span>: <span class="hljs-number">2</span> });
    <span class="hljs-keyword">var</span> tripleTap = <span class="hljs-keyword">new</span> Hammer.Tap({<span class="hljs-attr">event</span>: <span class="hljs-string">'tripletap'</span>, <span class="hljs-attr">taps</span>: <span class="hljs-number">3</span> });
    
    hammer.add([doubleTap, doubleTap, singleTap]);
    
    tripleTap.recognizeWith([doubleTap, singleTap]);
    doubleTap.recognizeWith(singleTap);
    
    doubleTap.requireFailure(tripleTap);
    singleTap.requireFailure([tripleTap, doubleTap]);
</code></pre>
<p>以上定义了三个手势识别器：singleTap，doubleTap和tripleTap，很明显这个三个识别器是互斥的，如果用户点三下屏幕时都触发就比较尴尬了；<br>这里得注意添加的顺序，因为Hammer.js是会按顺序遍历识别器调用他们的recognize方法，因为我们已经设置了手势的互斥，Hammer.js为了知道手势是单击还是双击，singleTap，doubleTap，tripleTap识别器都设置了300ms等待时间来判断之后还会不会有点击事件，根据识别顺序，singleTap总能获取tripleTap和doubleTap的识别结果来判断是否要触发事件，假如我们不设置他们之间的互斥关系，Hammer.js默认一满足条件就会触发，就会出现刚才说的那种尴尬的场景。<br>那recognizeWith有啥作用尼，看以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    if (!curRecognizer || (curRecognizer &amp;&amp; curRecognizer.state &amp; STATE_RECOGNIZED)) {
          curRecognizer = session.curRecognizer = null;
        }
    
        let i = 0;
        while (i < recognizers.length) {
          recognizer = recognizers[i];
          if (session.stopped !== FORCED_STOP &amp;&amp; (
                  !curRecognizer || recognizer === curRecognizer || 
                  recognizer.canRecognizeWith(curRecognizer))) {
            recognizer.recognize(inputData);
          } else {
            recognizer.reset();
          }
          if (!curRecognizer &amp;&amp; recognizer.state &amp; (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
            curRecognizer = session.curRecognizer = recognizer;
          }
          i++;
        }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
    <span class="hljs-keyword">if</span> (!curRecognizer || (curRecognizer &amp;&amp; curRecognizer.state &amp; STATE_RECOGNIZED)) {
          curRecognizer = session.curRecognizer = <span class="hljs-literal">null</span>;
        }
    
        <span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">while</span> (i &lt; recognizers.length) {
          recognizer = recognizers[i];
          <span class="hljs-keyword">if</span> (session.stopped !== FORCED_STOP &amp;&amp; (
                  !curRecognizer || recognizer === curRecognizer || 
                  recognizer.canRecognizeWith(curRecognizer))) {
            recognizer.recognize(inputData);
          } <span class="hljs-keyword">else</span> {
            recognizer.reset();
          }
          <span class="hljs-keyword">if</span> (!curRecognizer &amp;&amp; recognizer.state &amp; (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
            curRecognizer = session.curRecognizer = recognizer;
          }
          i++;
        }
</code></pre>
<p>虽然singleTap，doubleTap和tripleTap从最终结果上应该是互斥的，但是同样的数据输入时可能会同时让几个手势识别器识别，例如当用户点击一下屏幕，singleTap识别器的状态可能是STATE_RECOGNIZED或者STATE_BEGAN（等待doubleTap和tripleTap识别器的结果），session会把singTap识别器记录为当前的手势识别器，但是doubleTap和tripleTap也是需要记录一些状态（例如当前点击次数），因为很有可能接下来又是一个单击，变成双击手势；当用户接着再单击一下，doubleTap识别器因为设置了recognizeWith(singleTap)和以协同singleTap识别数据输入，然后doubleTap识别器开始进入STATE_RECOGNIZED或者STATE_BEGAN（等待tripleTap识别器的结果），此时session当前的手势识别器就是doubleTap了，而singleTap识别器因为没有设置recognizeWith(doubleTap)，会被重置。</p>
<h2 id="articleHeader5">一点小的细节</h2>
<p>我们在旋转一张图片时，如何实现旋转，怎么知道旋转的角度尼？<br>再回到computeInputData方法，有这样一行代码获取偏转角度：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ...
    let center = input.center = getCenter(pointers);
    ...
    input.angle = getAngle(offsetCenter, center);
    ...
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    ...
    let center = input.center = getCenter(pointers);
    ...
    input.angle = getAngle(offsetCenter, center);
    ...
</code></pre>
<p>再跟踪一下getCenter方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
     while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
      }
    
     return {
        x: round(x / pointersLength),
        y: round(y / pointersLength)
      };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
     <span class="hljs-keyword">while</span> (i &lt; pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
      }
    
     <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">x</span>: round(x / pointersLength),
        <span class="hljs-attr">y</span>: round(y / pointersLength)
      };
</code></pre>
<p>很简单的算出手势的中心位置，当我们双指旋转时，中心位置也会跟着移动，很容易计算出前后偏转角度。</p>
<h1 id="articleHeader6">最后一点思考</h1>
<p>Hammer.js都是在冒泡阶段绑定事件处理器，为什么不在捕获阶段拦截事件尼，如果一个向右活动的手势被识别，后续的事件（如touchMove）已经没必要再传给子节点，完全可以在拦截的元素上处理，这样性能上也应该会有一点提升，挖个坑给自己以后实现一下。<br>最后的最后。。。<br>因为没有使用经验，单靠啃源码，难免有所错漏，望指正。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Hammer.js源码简析

## 原文链接
[https://segmentfault.com/a/1190000009122378](https://segmentfault.com/a/1190000009122378)

