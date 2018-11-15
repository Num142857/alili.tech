---
title: RN自定义组件封装 - 播放类似PPT动画
hidden: true
categories: reprint
slug: f36da08f
date: 2018-11-01 02:30:09
---

{{< raw >}}
<h2 id="articleHeader0">1. &#x524D;&#x8A00;</h2><p>&#x8FD1;&#x65E5;&#xFF0C;&#x88AB;&#x5B89;&#x6392;&#x505A;&#x4E00;&#x4E2A;&#x5F00;&#x573A;&#x52A8;&#x753B;&#x7684;&#x4EFB;&#x52A1;&#x3002;&#x867D;&#x7136;RN&#x63D0;&#x4F9B;&#x4E86;Animated&#x6765;&#x81EA;&#x5B9A;&#x4E49;&#x52A8;&#x753B;&#xFF0C;&#x4F46;&#x662F;&#x672C;&#x6B21;&#x52A8;&#x753B;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x9887;&#x591A;&#xFF0C;&#x4EA4;&#x4E92;&#x751A;&#x70E6;&#x3002;&#x3002;&#x3002;&#x5728;&#x5B8C;&#x6210;&#x4EFB;&#x52A1;&#x7684;&#x540C;&#x65F6;&#xFF0C;&#x53D1;&#x73B0;&#x5F88;&#x591A;&#x6B65;&#x9AA4;&#x5176;&#x5B9E;&#x662F;&#x91CD;&#x590D;&#x7684;&#xFF0C;&#x4E8E;&#x662F;&#x5C01;&#x88C5;&#x4E86;&#x4E00;&#x4E2A;&#x5C0F;&#x7EC4;&#x4EF6;&#x8BB0;&#x5F55;&#x4E00;&#x4E0B;&#xFF0C;&#x5206;&#x4EAB;&#x7ED9;&#x5927;&#x5BB6;&#x3002;</p><h2 id="articleHeader1">2. &#x521D;&#x6B65;&#x5C1D;&#x8BD5;</h2><p>&#x5206;&#x6790;&#x4E00;&#x4E0B;&#xFF1A;&#x867D;&#x7136;&#x8FD9;&#x6B21;&#x7684;&#x52A8;&#x753B;&#x9700;&#x6C42;&#x6B65;&#x9AA4;&#x633A;&#x591A;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x628A;&#x6BCF;&#x4E00;&#x6B65;&#x52A8;&#x753B;&#x62C6;&#x89E3;&#x6210;step1, step2, step3, step4... &#x8BB2;&#x9053;&#x7406;&#x5E94;&#x8BE5;&#x8FD8;&#x662F;&#x80FD;&#x591F;&#x5B9E;&#x73B0;&#x7684;&#x5427;&#xFF1F;&#x55EF;&#xFF0C;&#x7528;Animated.Value()&#x521B;&#x5EFA;&#x503C;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x914D;&#x4E0A;Animated.timing&#x5E94;&#x8BE5;&#x5C31;&#x597D;&#x4E86;&#x3002;</p><p>&#x60F3;&#x5230;&#x8FD9;&#xFF0C;&#x53CD;&#x624B;&#x5C31;&#x662F;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;demo.js&#xFF0C;&#x5148;&#x505A;&#x4E2A;&#x5F80;&#x4E0A;&#x98D8;&#x7684;&#x6C14;&#x7403;&#x8BD5;&#x8BD5;&#x5148;&#x5427;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class Demo1 extends PureComponent {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this._initAnimation();
  }

  componentDidMount() {
    this._playAnimation();
  }

  _initAnimation() {
    this.topAnimatedValue = new Animated.Value(400);
    this.balloonStyle = {
      position: &apos;absolute&apos;,
      left: 137.5,
      top: this.topAnimatedValue.interpolate({
        inputRange: [-999999, 999999],
        outputRange: [-999999, 999999]
      })
    };
  }

  _playAnimation() {
    Animated.timing(this.topAnimatedValue, {
      toValue: 200,
      duration: 1500
    }).start();
  }

  render() {
    return (
      &lt;View style={styles.demoContainer}&gt;
        &lt;Animated.Image
          style={[styles.balloonImage, this.balloonStyle]}
          source={require(&apos;../../pic/demo1/balloon.png&apos;)}
          /&gt;
      &lt;/View&gt;
    );
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Demo1</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">PureComponent</span> </span>{

  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
  }

  componentWillMount() {
    <span class="hljs-keyword">this</span>._initAnimation();
  }

  componentDidMount() {
    <span class="hljs-keyword">this</span>._playAnimation();
  }

  _initAnimation() {
    <span class="hljs-keyword">this</span>.topAnimatedValue = <span class="hljs-keyword">new</span> Animated.Value(<span class="hljs-number">400</span>);
    <span class="hljs-keyword">this</span>.balloonStyle = {
      <span class="hljs-attr">position</span>: <span class="hljs-string">&apos;absolute&apos;</span>,
      <span class="hljs-attr">left</span>: <span class="hljs-number">137.5</span>,
      <span class="hljs-attr">top</span>: <span class="hljs-keyword">this</span>.topAnimatedValue.interpolate({
        <span class="hljs-attr">inputRange</span>: [<span class="hljs-number">-999999</span>, <span class="hljs-number">999999</span>],
        <span class="hljs-attr">outputRange</span>: [<span class="hljs-number">-999999</span>, <span class="hljs-number">999999</span>]
      })
    };
  }

  _playAnimation() {
    Animated.timing(<span class="hljs-keyword">this</span>.topAnimatedValue, {
      <span class="hljs-attr">toValue</span>: <span class="hljs-number">200</span>,
      <span class="hljs-attr">duration</span>: <span class="hljs-number">1500</span>
    }).start();
  }

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">View</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styles.demoContainer}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Animated.Image</span>
          <span class="hljs-attr">style</span>=<span class="hljs-string">{[styles.balloonImage,</span> <span class="hljs-attr">this.balloonStyle</span>]}
          <span class="hljs-attr">source</span>=<span class="hljs-string">{require(</span>&apos;<span class="hljs-attr">..</span>/<span class="hljs-attr">..</span>/<span class="hljs-attr">pic</span>/<span class="hljs-attr">demo1</span>/<span class="hljs-attr">balloon.png</span>&apos;)}
          /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span>
    );
  }
}</span></code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000015239365?w=377&amp;h=669" src="https://static.alili.tech/img/remote/1460000015239365?w=377&amp;h=669" alt="balloon.gif" title="balloon.gif" style="cursor:pointer;display:inline"></span></p><p>&#x5F53;&#x7136;&#xFF0C;&#x8FD9;&#x662F;&#x518D;&#x7B80;&#x5355;&#x4E0D;&#x8FC7;&#x7684;&#x57FA;&#x7840;&#x52A8;&#x753B;&#x4E86;&#x3002;&#x3002;&#x3002;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x8BA9;&#x8FD9;&#x91CC;&#x7684;&#x6C14;&#x7403;&#x4E00;&#x5F00;&#x59CB;&#x6700;&#x597D;&#x5148;&#x662F;&#x4ECE;&#x5E95;&#x90E8;&#x7684;&#x4E00;&#x4E2A;&#x70B9;&#x653E;&#x5927;&#xFF0C;&#x5E76;&#x4E14;&#x6709;&#x4E00;&#x4E2A;&#x6E10;&#x5165;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x5B8C;&#x4E86;&#x4E4B;&#x540E;&#x518D;&#x5F80;&#x4E0A;&#x98D8;&#xFF0C;&#x8FD9;&#x8BE5;&#x600E;&#x4E48;&#x5B9E;&#x73B0;&#x5462;&#xFF1F;&#x4E8E;&#x662F;&#x4EE3;&#x7801;&#x53D8;&#x6210;&#x4E86;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class Demo1 extends PureComponent {

  ...

  _interpolateAnimation(animatedValue, inputRange, outputRange) {
    return animatedValue.interpolate({inputRange, outputRange});
  }

  _initAnimation() {

    this.opacityAnimatedValue = new Animated.Value(0);
    this.scaleAnimatedValue = new Animated.Value(0);
    this.topAnimatedValue = new Animated.Value(400);

    this.balloonStyle = {
      position: &apos;absolute&apos;,
      left: 137.5,
      opacity: this._interpolateAnimation(this.opacityAnimatedValue, [0, 1], [0, 1]),
      top: this._interpolateAnimation(this.topAnimatedValue, [-999999, 999999], [-999999, 999999]),
      transform:[{scale: this._interpolateAnimation(this.scaleAnimatedValue, [0, 1], [0, 1])}]
    };
  }

  _playAnimation() {
    Animated.sequence([
      this.step1(),
      this.step2()
    ]).start();
  }

  step1() {
    return Animated.parallel([
      Animated.timing(this.opacityAnimatedValue, {
        toValue: 1,
        duration: 500
      }),
      Animated.timing(this.scaleAnimatedValue, {
        toValue: 1,
        duration: 500
      })
    ]);
  }

  step2() {
    return Animated.timing(this.topAnimatedValue, {
      toValue: 200,
      duration: 1500
    });
  }

  ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Demo1</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">PureComponent</span> </span>{

  ...

  _interpolateAnimation(animatedValue, inputRange, outputRange) {
    <span class="hljs-keyword">return</span> animatedValue.interpolate({inputRange, outputRange});
  }

  _initAnimation() {

    <span class="hljs-keyword">this</span>.opacityAnimatedValue = <span class="hljs-keyword">new</span> Animated.Value(<span class="hljs-number">0</span>);
    <span class="hljs-keyword">this</span>.scaleAnimatedValue = <span class="hljs-keyword">new</span> Animated.Value(<span class="hljs-number">0</span>);
    <span class="hljs-keyword">this</span>.topAnimatedValue = <span class="hljs-keyword">new</span> Animated.Value(<span class="hljs-number">400</span>);

    <span class="hljs-keyword">this</span>.balloonStyle = {
      <span class="hljs-attr">position</span>: <span class="hljs-string">&apos;absolute&apos;</span>,
      <span class="hljs-attr">left</span>: <span class="hljs-number">137.5</span>,
      <span class="hljs-attr">opacity</span>: <span class="hljs-keyword">this</span>._interpolateAnimation(<span class="hljs-keyword">this</span>.opacityAnimatedValue, [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>]),
      <span class="hljs-attr">top</span>: <span class="hljs-keyword">this</span>._interpolateAnimation(<span class="hljs-keyword">this</span>.topAnimatedValue, [<span class="hljs-number">-999999</span>, <span class="hljs-number">999999</span>], [<span class="hljs-number">-999999</span>, <span class="hljs-number">999999</span>]),
      <span class="hljs-attr">transform</span>:[{<span class="hljs-attr">scale</span>: <span class="hljs-keyword">this</span>._interpolateAnimation(<span class="hljs-keyword">this</span>.scaleAnimatedValue, [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>])}]
    };
  }

  _playAnimation() {
    Animated.sequence([
      <span class="hljs-keyword">this</span>.step1(),
      <span class="hljs-keyword">this</span>.step2()
    ]).start();
  }

  step1() {
    <span class="hljs-keyword">return</span> Animated.parallel([
      Animated.timing(<span class="hljs-keyword">this</span>.opacityAnimatedValue, {
        <span class="hljs-attr">toValue</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">duration</span>: <span class="hljs-number">500</span>
      }),
      Animated.timing(<span class="hljs-keyword">this</span>.scaleAnimatedValue, {
        <span class="hljs-attr">toValue</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">duration</span>: <span class="hljs-number">500</span>
      })
    ]);
  }

  step2() {
    <span class="hljs-keyword">return</span> Animated.timing(<span class="hljs-keyword">this</span>.topAnimatedValue, {
      <span class="hljs-attr">toValue</span>: <span class="hljs-number">200</span>,
      <span class="hljs-attr">duration</span>: <span class="hljs-number">1500</span>
    });
  }

  ...
}</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000015239366?w=377&amp;h=669" src="https://static.alili.tech/img/remote/1460000015239366?w=377&amp;h=669" alt="balloon-2.gif" title="balloon-2.gif" style="cursor:pointer"></span></p><p><strong>&#x63D2;&#x53E5;&#x8BDD;</strong>&#xFF1A;&#x5728;&#x52A8;&#x753B;&#x8854;&#x63A5;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8FD8;&#x662F;&#x7EA0;&#x7ED3;&#x4E86;&#x4E00;&#x4E0B;&#x3002;&#x56E0;&#x4E3A;Animated&#x63D0;&#x4F9B;&#x7684;&#x65B9;&#x6CD5;&#x8FD8;&#x662F;&#x6BD4;&#x8F83;&#x591A;&#x7684;&#xFF0C;&#x8FD9;&#x91CC;&#x7528;&#x5230;&#x4E86;sequence&#x3001;parallel&#xFF0C;&#x5206;&#x522B;&#x53EF;&#x4EE5;&#x8BA9;&#x52A8;&#x753B;&#x987A;&#x5E8F;&#x6267;&#x884C;&#x548C;&#x5E76;&#x884C;&#x3002;&#x9664;&#x6B64;&#x4E4B;&#x5916;&#xFF0C;animtaion&#x7684;start&#x65B9;&#x6CD5;&#x662F;&#x652F;&#x6301;&#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#xFF0C;&#x8868;&#x793A;&#x5728;&#x5F53;&#x524D;&#x52A8;&#x753B;&#x8FD0;&#x884C;&#x7ED3;&#x675F;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x89E6;&#x53D1;&#x8FD9;&#x4E2A;&#x56DE;&#x8C03;&#x3002;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x8FD8;&#x53EF;&#x4EE5;&#x8FD9;&#x4E48;&#x5199;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  _playAnimation() {
    this.step1(() =&gt; this.step2());    // &#x4E0D;&#x540C;&#x4E4B;&#x5904;1&#xFF1A;step2&#x4F5C;&#x4E3A;step1&#x52A8;&#x753B;&#x7ED3;&#x675F;&#x4E4B;&#x540E;&#x7684;&#x56DE;&#x8C03;&#x4F20;&#x5165;
  }

  step1(callback) {
    Animated.parallel([
      Animated.timing(this.opacityAnimatedValue, {
        toValue: 1,
        duration: 500
      }),
      Animated.timing(this.scaleAnimatedValue, {
        toValue: 1,
        duration: 500
      })
    ]).start(() =&gt; {
      callback &amp;&amp; callback();    // &#x4E0D;&#x540C;&#x4E4B;&#x5904;2&#xFF1A;&#x8C03;&#x7528;&#x4F20;&#x5165;&#x7684;&#x56DE;&#x8C03;
    });
  }

  step2() {
    Animated.timing(this.topAnimatedValue, {
      toValue: 200,
      duration: 1500
    }).start();
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code>  <span class="hljs-selector-tag">_playAnimation</span>() {
    <span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.step1</span>(() =&gt; this.step2());    <span class="hljs-comment">// &#x4E0D;&#x540C;&#x4E4B;&#x5904;1&#xFF1A;step2&#x4F5C;&#x4E3A;step1&#x52A8;&#x753B;&#x7ED3;&#x675F;&#x4E4B;&#x540E;&#x7684;&#x56DE;&#x8C03;&#x4F20;&#x5165;</span>
  }

  <span class="hljs-selector-tag">step1</span>(callback) {
    <span class="hljs-selector-tag">Animated</span><span class="hljs-selector-class">.parallel</span>([
      Animated.timing(this.opacityAnimatedValue, {
        <span class="hljs-attribute">toValue</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attribute">duration</span>: <span class="hljs-number">500</span>
      }),
      Animated.timing(this.scaleAnimatedValue, {
        <span class="hljs-attribute">toValue</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attribute">duration</span>: <span class="hljs-number">500</span>
      })
    ])<span class="hljs-selector-class">.start</span>(() =&gt; {
      <span class="hljs-selector-tag">callback</span> <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-tag">&amp;</span> <span class="hljs-selector-tag">callback</span>();    <span class="hljs-comment">// &#x4E0D;&#x540C;&#x4E4B;&#x5904;2&#xFF1A;&#x8C03;&#x7528;&#x4F20;&#x5165;&#x7684;&#x56DE;&#x8C03;</span>
    });
  }

  <span class="hljs-selector-tag">step2</span>() {
    <span class="hljs-selector-tag">Animated</span><span class="hljs-selector-class">.timing</span>(this.topAnimatedValue, {
      <span class="hljs-attribute">toValue</span>: <span class="hljs-number">200</span>,
      <span class="hljs-attribute">duration</span>: <span class="hljs-number">1500</span>
    })<span class="hljs-selector-class">.start</span>();
  }</code></pre><p>&#x867D;&#x7136;&#x540C;&#x6837;&#x80FD;&#x591F;&#x5B9E;&#x73B0;&#x6548;&#x679C;&#xFF0C;&#x4F46;&#x662F;&#x8FD8;&#x662F;&#x89C9;&#x5F97;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x4E0D;&#x662F;&#x5F88;&#x8212;&#x670D;&#xFF0C;&#x6240;&#x4EE5;&#x5F03;&#x4E4B;&#x3002;&#x3002;&#x3002;</p><p>&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x5BF9;&#x8FD9;&#x4E2A;&#x6C14;&#x7403;&#x505A;&#x4E86;&#x6E10;&#x53D8;&#x3001;&#x653E;&#x5927;&#x3001;&#x5E73;&#x79FB;&#x7B49;3&#x9879;&#x64CD;&#x4F5C;&#x3002;&#x4F46;&#x662F;&#xFF0C;&#x5982;&#x679C;&#x6709;5&#x4E2A;&#x6C14;&#x7403;&#xFF0C;&#x8FD8;&#x6709;&#x5176;&#x4ED6;&#x5404;&#x79CD;&#x5143;&#x7D20;&#x53C8;&#x8BE5;&#x600E;&#x4E48;&#x529E;&#x5462;&#xFF1F;&#x8FD9;&#x624D;&#x4E00;&#x4E2A;&#x6C14;&#x7403;&#x6211;&#x4EEC;&#x5C31;&#x5DF2;&#x7ECF;&#x7528;&#x4E86;opacityAnimatedValue&#xFF0C;scaleAnimatedValue&#xFF0C;topAnimatedValue&#x4E09;&#x4E2A;&#x53D8;&#x91CF;&#x6765;&#x63A7;&#x5236;&#xFF0C;&#x66F4;&#x591A;&#x7684;&#x52A8;&#x753B;&#x5143;&#x7D20;&#x90A3;&#x76F4;&#x5C31;gg&#xFF0C;&#x4E0D;&#x7528;&#x4E0B;&#x73ED;&#x4E86;&#x3002;&#x3002;&#x3002;</p><h2 id="articleHeader2">3. &#x5B9E;&#x73B0;&#x5347;&#x7EA7;</h2><p>&#x8BF4;&#x5B9E;&#x8BDD;&#xFF0C;&#x8981;&#x505A;&#x8FD9;&#x4E48;&#x4E2A;&#x4E1C;&#x897F;&#xFF0C;&#x600E;&#x4E48;&#x5C31;&#x90A3;&#x4E48;&#x50CF;&#x5728;&#x505A;&#x4E00;&#x4E2A;PPT&#x5462;&#x3002;&#x3002;&#x3002;</p><p>&#x201C;&#x5C4F;&#x5E55;&#x5C31;&#x597D;&#x6BD4;&#x662F;&#x4E00;&#x5F20;PPT&#x80CC;&#x666F;&#x56FE;&#xFF1B;&#x6BCF;&#x4E00;&#x4E2A;&#x6C14;&#x7403;&#x5C31;&#x662F;PPT&#x4E0A;&#x7684;&#x5143;&#x7D20;&#xFF1B;&#x4F60;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x62D6;&#x52A8;&#x9F20;&#x6807;&#x6765;&#x6446;&#x653E;&#x5404;&#x4E2A;&#x6C14;&#x7403;&#xFF0C;&#x6211;&#x53EF;&#x4EE5;&#x7528;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x6765;&#x786E;&#x5B9A;&#x6BCF;&#x4E2A;&#x6C14;&#x7403;&#x7684;&#x4F4D;&#x7F6E;&#xFF1B;&#x81F3;&#x4E8E;&#x52A8;&#x753B;&#x561B;&#xFF0C;&#x521A;&#x624D;&#x7684;demo&#x5DF2;&#x7ECF;&#x8BC1;&#x660E;&#x5E76;&#x4E0D;&#x96BE;&#x5B9E;&#x73B0;&#xFF0C;&#x65E0;&#x975E;&#x5C31;&#x662F;&#x63A7;&#x5236;&#x900F;&#x660E;&#x5EA6;&#x3001;xy&#x5750;&#x6807;&#x3001;&#x7F29;&#x653E;&#x6BD4;&#x4F8B;&#x7F62;&#x4E86;&#x3002;&#x201D;</p><p>&#x60F3;&#x5230;&#x8FD9;&#xFF0C;&#x5FC3;&#x4E2D;&#x4E0D;&#x514D;&#x4E00;&#x9635;&#x7A83;&#x559C;&#x3002;&#x54C8;&#x54C8;&#xFF0C;&#x6709;&#x8DEF;&#x5B50;&#x4E86;&#xFF0C;&#x53EF;&#x4EE5;&#x5BF9;PPT&#x4E0A;&#x7684;&#x8FD9;&#x4E9B;&#x5143;&#x7D20;&#x5C01;&#x88C5;&#x4E00;&#x4E2A;&#x901A;&#x7528;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x7136;&#x540E;&#x63D0;&#x4F9B;&#x5E38;&#x7528;&#x7684;&#x4E00;&#x4E9B;&#x52A8;&#x753B;&#x65B9;&#x6CD5;&#xFF0C;&#x5269;&#x4E0B;&#x7684;&#x4E8B;&#x60C5;&#x5C31;&#x662F;&#x8C03;&#x7528;&#x8FD9;&#x4E9B;&#x52A8;&#x753B;&#x65B9;&#x6CD5;&#x7EC4;&#x88C5;&#x6210;&#x66F4;&#x590D;&#x6742;&#x7684;&#x52A8;&#x753B;&#x4E86;&#x3002;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;PPT&#xFF1A;&#x201C;&#x51FA;&#x73B0;&#x3001;&#x98DE;&#x8DC3;&#x3001;&#x6DE1;&#x5316;&#x3001;&#x6D6E;&#x5165;&#x3001;&#x767E;&#x53F6;&#x7A97;&#x3001;&#x68CB;&#x76D8;&#x3002;&#x3002;&#x3002;&#x201D;&#x770B;&#x7740;&#x8FD9;&#x4EE4;&#x4EBA;&#x773C;&#x82B1;&#x7F2D;&#x4E71;&#x7684;&#x5404;&#x79CD;&#x52A8;&#x753B;&#xFF0C;&#x6211;&#x60F3;&#x4E86;&#x4E0B;&#xFF1A;&#x55EF;&#xFF0C;&#x6211;&#x8FD8;&#x662F;&#x4ECE;&#x6700;&#x7B80;&#x5355;&#x7684;&#x505A;&#x8D77;&#x5427;&#x3002;&#x3002;&#x3002;</p><p><strong>&#x9996;&#x5148;</strong>&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5C06;&#x52A8;&#x753B;&#x5206;&#x6210;&#x4E24;&#x79CD;&#xFF1A;&#x4E00;&#x6B21;&#x6027;&#x52A8;&#x753B;&#x548C;&#x5FAA;&#x73AF;&#x52A8;&#x753B;&#x3002;<br><strong>&#x5176;&#x6B21;</strong>&#xFF0C;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;&#x7528;&#x4F5C;&#x52A8;&#x753B;&#x7684;&#x5C5E;&#x6027;&#x4E3B;&#x8981;&#x5305;&#x62EC;&#x6709;&#xFF1A;opacity, x, y, scale, angle&#x7B49;&#xFF08;&#x8FD9;&#x91CC;&#x5148;&#x53EA;&#x8003;&#x8651;&#x4E86;&#x4E8C;&#x7EF4;&#x5E73;&#x9762;&#x7684;&#xFF0C;&#x5176;&#x5B9E;&#x8FD8;&#x53EF;&#x4EE5;&#x5EF6;&#x4F38;&#x6269;&#x5C55;&#x6210;&#x4E09;&#x7EF4;&#x7ACB;&#x4F53;&#x7684;&#xFF09;&#x3002;<br><strong>&#x6700;&#x540E;</strong>&#xFF0C;&#x57FA;&#x672C;&#x52A8;&#x753B;&#x90FD;&#x53EF;&#x4EE5;&#x62C6;&#x89E3;&#x4E3A;&#x8FD9;&#x51E0;&#x79CD;&#x884C;&#x4E3A;&#xFF1A;&#x51FA;&#x73B0;/&#x6D88;&#x5931;&#x3001;&#x79FB;&#x52A8;&#x3001;&#x7F29;&#x653E;&#x3001;&#x65CB;&#x8F6C;&#x3002;</p><h3 id="articleHeader3">3.1 &#x4E00;&#x6B21;&#x6027;&#x52A8;&#x753B;</h3><p>&#x60F3;&#x5230;&#x8FD9;&#xFF0C;&#x53CD;&#x624B;&#x5C31;&#x662F;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x6587;&#x4EF6;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Comstants.js
export const INF = 999999999;

// Helper.js
export const Helper = {
  sleep(millSeconds) {
    return new Promise(resolve =&gt; {
      setTimeout(() =&gt; resolve(), millSeconds);
    });
  },
  animateInterpolate(animatedValue, inputRange, outputRange) {
    if(animatedValue &amp;&amp; animatedValue.interpolate) {
      return animatedValue.interpolate({inputRange, outputRange});
    }
  }
};

// AnimatedContainer.js
import {INF} from &quot;./Constants&quot;;
import {Helper} from &quot;./Helper&quot;;

export class AnimatedContainer extends PureComponent {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this._initAnimationConfig();
  }

  _initAnimationConfig() {

    const {initialConfig} = this.props;
    const {opacity = 1, scale = 1, x = 0, y = 0, rotate = 0} = initialConfig;

    // create animated values: opacity, scale, x, y, rotate
    this.opacityAnimatedValue = new Animated.Value(opacity);
    this.scaleAnimatedValue = new Animated.Value(scale);
    this.rotateAnimatedValue = new Animated.Value(rotate);
    this.xAnimatedValue = new Animated.Value(x);
    this.yAnimatedValue = new Animated.Value(y);

    this.style = {
      position: &apos;absolute&apos;,
      left: this.xAnimatedValue,
      top: this.yAnimatedValue,
      opacity: Helper.animateInterpolate(this.opacityAnimatedValue, [0, 1], [0, 1]),
      transform: [
        {scale: this.scaleAnimatedValue},
        {rotate: Helper.animateInterpolate(this.rotateAnimatedValue, [-INF, INF], [`-${INF}rad`, `${INF}rad`])}
      ]
    };
  }

  show() {}

  hide() {}

  scaleTo() {}

  rotateTo() {}

  moveTo() {}

  render() {
    return (
      &lt;Animated.View style={[this.style, this.props.style]}&gt;
        {this.props.children}
      &lt;/Animated.View&gt;
    );
  }
}

AnimatedContainer.defaultProps = {
  initialConfig: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    rotate: 0
  }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Comstants.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> INF = <span class="hljs-number">999999999</span>;

<span class="hljs-comment">// Helper.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> Helper = {
  sleep(millSeconds) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
      setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve(), millSeconds);
    });
  },
  animateInterpolate(animatedValue, inputRange, outputRange) {
    <span class="hljs-keyword">if</span>(animatedValue &amp;&amp; animatedValue.interpolate) {
      <span class="hljs-keyword">return</span> animatedValue.interpolate({inputRange, outputRange});
    }
  }
};

<span class="hljs-comment">// AnimatedContainer.js</span>
<span class="hljs-keyword">import</span> {INF} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./Constants&quot;</span>;
<span class="hljs-keyword">import</span> {Helper} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./Helper&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AnimatedContainer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">PureComponent</span> </span>{

  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
  }

  componentWillMount() {
    <span class="hljs-keyword">this</span>._initAnimationConfig();
  }

  _initAnimationConfig() {

    <span class="hljs-keyword">const</span> {initialConfig} = <span class="hljs-keyword">this</span>.props;
    <span class="hljs-keyword">const</span> {opacity = <span class="hljs-number">1</span>, scale = <span class="hljs-number">1</span>, x = <span class="hljs-number">0</span>, y = <span class="hljs-number">0</span>, rotate = <span class="hljs-number">0</span>} = initialConfig;

    <span class="hljs-comment">// create animated values: opacity, scale, x, y, rotate</span>
    <span class="hljs-keyword">this</span>.opacityAnimatedValue = <span class="hljs-keyword">new</span> Animated.Value(opacity);
    <span class="hljs-keyword">this</span>.scaleAnimatedValue = <span class="hljs-keyword">new</span> Animated.Value(scale);
    <span class="hljs-keyword">this</span>.rotateAnimatedValue = <span class="hljs-keyword">new</span> Animated.Value(rotate);
    <span class="hljs-keyword">this</span>.xAnimatedValue = <span class="hljs-keyword">new</span> Animated.Value(x);
    <span class="hljs-keyword">this</span>.yAnimatedValue = <span class="hljs-keyword">new</span> Animated.Value(y);

    <span class="hljs-keyword">this</span>.style = {
      <span class="hljs-attr">position</span>: <span class="hljs-string">&apos;absolute&apos;</span>,
      <span class="hljs-attr">left</span>: <span class="hljs-keyword">this</span>.xAnimatedValue,
      <span class="hljs-attr">top</span>: <span class="hljs-keyword">this</span>.yAnimatedValue,
      <span class="hljs-attr">opacity</span>: Helper.animateInterpolate(<span class="hljs-keyword">this</span>.opacityAnimatedValue, [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>]),
      <span class="hljs-attr">transform</span>: [
        {<span class="hljs-attr">scale</span>: <span class="hljs-keyword">this</span>.scaleAnimatedValue},
        {<span class="hljs-attr">rotate</span>: Helper.animateInterpolate(<span class="hljs-keyword">this</span>.rotateAnimatedValue, [-INF, INF], [<span class="hljs-string">`-<span class="hljs-subst">${INF}</span>rad`</span>, <span class="hljs-string">`<span class="hljs-subst">${INF}</span>rad`</span>])}
      ]
    };
  }

  show() {}

  hide() {}

  scaleTo() {}

  rotateTo() {}

  moveTo() {}

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Animated.View</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{[this.style,</span> <span class="hljs-attr">this.props.style</span>]}&gt;</span>
        {this.props.children}
      <span class="hljs-tag">&lt;/<span class="hljs-name">Animated.View</span>&gt;</span>
    );
  }
}

AnimatedContainer.defaultProps = {
  initialConfig: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    rotate: 0
  }
};</span></code></pre><p>&#x7B2C;&#x4E00;&#x6B65;&#x7684;&#x9AA8;&#x67B6;&#x8FD9;&#x5C31;&#x642D;&#x597D;&#x4E86;&#xFF0C;&#x7B80;&#x5355;&#x5230;&#x81EA;&#x5DF1;&#x90FD;&#x96BE;&#x4EE5;&#x7F6E;&#x4FE1;&#x3002;&#x3002;&#x3002;&#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x662F;&#x5177;&#x4F53;&#x5B9E;&#x73B0;&#x6BCF;&#x4E00;&#x4E2A;&#x52A8;&#x753B;&#x7684;&#x65B9;&#x6CD5;&#x4E86;&#xFF0C;&#x5148;&#x62FF;show/hide&#x5F00;&#x5200;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="show(config = {opacity: 1, duration: 500}) {
  Animated.timing(this.opacityAnimatedValue, {
    toValue: config.opacity,
    duration: config.duration
  }).start();
}

hide(config = {opacity: 0, duration: 500}) {
  Animated.timing(this.opacityAnimatedValue, {
    toValue: config.opacity,
    duration: config.duration
  }).start();
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs roboconf"><code>show(config = {<span class="hljs-attribute">opacity</span>: 1, duration: 500}) {
  Animated<span class="hljs-variable">.timing</span>(this<span class="hljs-variable">.opacityAnimatedValue</span>, {
    toValue: config<span class="hljs-variable">.opacity</span>,
    duration: config<span class="hljs-variable">.duration</span>
  })<span class="hljs-variable">.start</span>();
}

hide(config = {<span class="hljs-attribute">opacity</span>: 0, duration: 500}) {
  Animated<span class="hljs-variable">.timing</span>(this<span class="hljs-variable">.opacityAnimatedValue</span>, {
    toValue: config<span class="hljs-variable">.opacity</span>,
    duration: config<span class="hljs-variable">.duration</span>
  })<span class="hljs-variable">.start</span>();
}</code></pre><p>&#x8BD5;&#x4E86;&#x4E00;&#x4E0B;&#xFF0C;&#x7B80;&#x76F4;&#x662F;&#x6587;&#x7F8E;~</p><p>&#x4F46;&#x662F;&#xFF01;&#x4ED4;&#x7EC6;&#x4E00;&#x60F3;&#xFF0C;&#x5374;&#x6709;&#x4E2A;&#x5F88;&#x4E25;&#x91CD;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x8FD9;&#x91CC;&#x7684;&#x52A8;&#x753B;&#x8854;&#x63A5;&#x8BE5;&#x600E;&#x5904;&#x7406;&#xFF1F;&#x8981;&#x60F3;&#x505A;&#x4E00;&#x4E2A;&#x5148;show&#xFF0C;&#x7136;&#x540E;&#x8FC7;1s&#x4E4B;&#x540E;&#x518D;hide&#x7684;&#x52A8;&#x753B;&#x8BE5;&#x600E;&#x4E48;&#x5B9E;&#x73B0;&#xFF1F;&#x8C8C;&#x4F3C;&#x53C8;&#x56DE;&#x5230;&#x4E86;&#x4E00;&#x5F00;&#x59CB;&#x8003;&#x8651;&#x8FC7;&#x7684;&#x95EE;&#x9898;&#x3002;&#x4E0D;&#x8FC7;&#x8FD9;&#x6B21;&#xFF0C;&#x6211;&#x5374;&#x662F;&#x7528;Promise&#x6765;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x3002;&#x4E8E;&#x662F;&#x4EE3;&#x7801;&#x53C8;&#x53D8;&#x6210;&#x4E86;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sleep(millSeconds) {
  return new Promise(resolve =&gt; setTimeout(() =&gt; resolve(), millSeconds));
}

show(config = {opacity: 1, duration: 500}) {
  return new Promise(resolve =&gt; {
    Animated.timing(this.opacityAnimatedValue, {
      toValue: config.opacity,
      duration: config.duration
    }).start(() =&gt; resolve());
  });
}

hide(config = {opacity: 0, duration: 500}) {
  return new Promise(resolve =&gt; {
    Animated.timing(this.opacityAnimatedValue, {
      toValue: config.opacity,
      duration: config.duration
    }).start(() =&gt; resolve());
  });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">sleep(millSeconds) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve(), millSeconds));
}

show(config = {<span class="hljs-attr">opacity</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">duration</span>: <span class="hljs-number">500</span>}) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    Animated.timing(<span class="hljs-keyword">this</span>.opacityAnimatedValue, {
      <span class="hljs-attr">toValue</span>: config.opacity,
      <span class="hljs-attr">duration</span>: config.duration
    }).start(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve());
  });
}

hide(config = {<span class="hljs-attr">opacity</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">duration</span>: <span class="hljs-number">500</span>}) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    Animated.timing(<span class="hljs-keyword">this</span>.opacityAnimatedValue, {
      <span class="hljs-attr">toValue</span>: config.opacity,
      <span class="hljs-attr">duration</span>: config.duration
    }).start(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve());
  });
}</code></pre><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x518D;&#x6765;&#x770B;&#x521A;&#x624D;&#x7684;&#x52A8;&#x753B;&#xFF0C;&#x53EA;&#x9700;&#x8FD9;&#x6837;&#x5C31;&#x80FD;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="playAnimation() {
  this.animationRef
    .show()                                 // &#x5148;&#x51FA;&#x73B0;
    .sleep(1000)                            // &#x7B49;&#x5F85;1s
    .then(() =&gt; this.animationRef.hide());  // &#x6D88;&#x5931;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">playAnimation() {
  <span class="hljs-keyword">this</span>.animationRef
    .show()                                 <span class="hljs-comment">// &#x5148;&#x51FA;&#x73B0;</span>
    .sleep(<span class="hljs-number">1000</span>)                            <span class="hljs-comment">// &#x7B49;&#x5F85;1s</span>
    .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>.animationRef.hide());  <span class="hljs-comment">// &#x6D88;&#x5931;</span>
}</code></pre><p>&#x751A;&#x81F3;&#x8FD8;&#x53EF;&#x4EE5;&#x5BF9;createPromise&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x518D;&#x5C01;&#x88C5;&#x4E00;&#x6CE2;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_createAnimation(animationConfig = []) {
  const len = animationConfig.length;
  if (len === 1) {
    const {animatedValue, toValue, duration} = animationConfig[0];
    return Animated.timing(animatedValue, {toValue, duration});
  } else if (len &gt;= 2) {
    return Animated.parallel(animationConfig.map(config =&gt; {
      return this._createAnimation([config]);
    }));
  }
}

_createAnimationPromise(animationConfig = []) {
  return new Promise(resolve =&gt; {
    const len = animationConfig.length;
    if(len &lt;= 0) {
      resolve();
    } else {
      this._createAnimation(animationConfig).start(() =&gt; resolve());
    }
  });
}

opacityTo(config = {opacity: .5, duration: 500}) {
  return this._createAnimationPromise([{
    toValue: config.opacity,
    duration: config.duration,
    animatedValue: this.opacityAnimatedValue
  }]);
}

show(config = {opacity: 1, duration: 500}) {
  this.opacityTo(config);
}

hide(config = {opacity: 0, duration: 500}) {
  this.opacityTo(config);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">_createAnimation(animationConfig = []) {
  <span class="hljs-keyword">const</span> len = animationConfig.length;
  <span class="hljs-keyword">if</span> (len === <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">const</span> {animatedValue, toValue, duration} = animationConfig[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">return</span> Animated.timing(animatedValue, {toValue, duration});
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (len &gt;= <span class="hljs-number">2</span>) {
    <span class="hljs-keyword">return</span> Animated.parallel(animationConfig.map(<span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._createAnimation([config]);
    }));
  }
}

_createAnimationPromise(animationConfig = []) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> len = animationConfig.length;
    <span class="hljs-keyword">if</span>(len &lt;= <span class="hljs-number">0</span>) {
      resolve();
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">this</span>._createAnimation(animationConfig).start(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve());
    }
  });
}

opacityTo(config = {<span class="hljs-attr">opacity</span>: <span class="hljs-number">.5</span>, <span class="hljs-attr">duration</span>: <span class="hljs-number">500</span>}) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._createAnimationPromise([{
    <span class="hljs-attr">toValue</span>: config.opacity,
    <span class="hljs-attr">duration</span>: config.duration,
    <span class="hljs-attr">animatedValue</span>: <span class="hljs-keyword">this</span>.opacityAnimatedValue
  }]);
}

show(config = {<span class="hljs-attr">opacity</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">duration</span>: <span class="hljs-number">500</span>}) {
  <span class="hljs-keyword">this</span>.opacityTo(config);
}

hide(config = {<span class="hljs-attr">opacity</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">duration</span>: <span class="hljs-number">500</span>}) {
  <span class="hljs-keyword">this</span>.opacityTo(config);
}</code></pre><p>&#x7136;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x518D;&#x628A;&#x5176;&#x4ED6;&#x7684;&#x51E0;&#x79CD;&#x57FA;&#x7840;&#x52A8;&#x753B;&#xFF08;scale, rotate, move&#xFF09;&#x5B9E;&#x73B0;&#x4E5F;&#x52A0;&#x4E0A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="scaleTo(config = {scale: 1, duration: 1000}) {
  return this._createAnimationPromise([{
    toValue: config.scale,
    duration: config.duration,
    animatedValue: this.scaleAnimatedValue
  }]);
}

rotateTo(config = {rotate: 0, duration: 500}) {
  return this._createAnimationPromise([{
    toValue: config.rotate,
    duration: config.duration,
    animatedValue: this.rotateAnimatedValue
  }]);
}

moveTo(config = {x: 0, y: 0, duration: 1000}) {
  return this._createAnimationPromise([{
    toValue: config.x,
    duration: config.duration,
    animatedValue: this.xAnimatedValue
  }, {
    toValue: config.y,
    duration: config.duration,
    animatedValue: this.yAnimatedValue
  }]);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">scaleTo(config = {<span class="hljs-attr">scale</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">duration</span>: <span class="hljs-number">1000</span>}) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._createAnimationPromise([{
    <span class="hljs-attr">toValue</span>: config.scale,
    <span class="hljs-attr">duration</span>: config.duration,
    <span class="hljs-attr">animatedValue</span>: <span class="hljs-keyword">this</span>.scaleAnimatedValue
  }]);
}

rotateTo(config = {<span class="hljs-attr">rotate</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">duration</span>: <span class="hljs-number">500</span>}) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._createAnimationPromise([{
    <span class="hljs-attr">toValue</span>: config.rotate,
    <span class="hljs-attr">duration</span>: config.duration,
    <span class="hljs-attr">animatedValue</span>: <span class="hljs-keyword">this</span>.rotateAnimatedValue
  }]);
}

moveTo(config = {<span class="hljs-attr">x</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">duration</span>: <span class="hljs-number">1000</span>}) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._createAnimationPromise([{
    <span class="hljs-attr">toValue</span>: config.x,
    <span class="hljs-attr">duration</span>: config.duration,
    <span class="hljs-attr">animatedValue</span>: <span class="hljs-keyword">this</span>.xAnimatedValue
  }, {
    <span class="hljs-attr">toValue</span>: config.y,
    <span class="hljs-attr">duration</span>: config.duration,
    <span class="hljs-attr">animatedValue</span>: <span class="hljs-keyword">this</span>.yAnimatedValue
  }]);
}</code></pre><h3 id="articleHeader4">3.2 &#x5FAA;&#x73AF;&#x52A8;&#x753B;</h3><p>&#x4E00;&#x6B21;&#x6027;&#x52A8;&#x753B;&#x95EE;&#x9898;&#x5C31;&#x8FD9;&#x6837;&#x89E3;&#x51B3;&#x4E86;&#xFF0C;&#x518D;&#x6765;&#x770B;&#x770B;&#x5FAA;&#x73AF;&#x52A8;&#x753B;&#x600E;&#x4E48;&#x529E;&#x3002;&#x6839;&#x636E;&#x5E73;&#x65F6;&#x7684;&#x7ECF;&#x9A8C;&#xFF0C;&#x4E00;&#x4E2A;&#x5FAA;&#x73AF;&#x64AD;&#x653E;&#x7684;&#x52A8;&#x753B;&#x4E00;&#x822C;&#x90FD;&#x4F1A;&#x8FD9;&#x4E48;&#x5199;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="roll() {

  this.rollAnimation = Animated.timing(this.rotateAnimatedValue, {
      toValue: Math.PI * 2,
      duration: 2000
  });

  this.rollAnimation.start(() =&gt; {
      this.rotateAnimatedValue.setValue(0);
      this.roll();
  });
}

play() {
  this.roll();
}

stop() {
  this.rollAnimation.stop();
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">roll() {

  <span class="hljs-keyword">this</span>.rollAnimation = Animated.timing(<span class="hljs-keyword">this</span>.rotateAnimatedValue, {
      <span class="hljs-attr">toValue</span>: <span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">2</span>,
      <span class="hljs-attr">duration</span>: <span class="hljs-number">2000</span>
  });

  <span class="hljs-keyword">this</span>.rollAnimation.start(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>.rotateAnimatedValue.setValue(<span class="hljs-number">0</span>);
      <span class="hljs-keyword">this</span>.roll();
  });
}

play() {
  <span class="hljs-keyword">this</span>.roll();
}

stop() {
  <span class="hljs-keyword">this</span>.rollAnimation.stop();
}</code></pre><p>&#x6CA1;&#x9519;&#xFF0C;&#x5C31;&#x662F;&#x5728;&#x4E00;&#x4E2A;&#x52A8;&#x753B;&#x7684;start&#x4E2D;&#x4F20;&#x5165;&#x56DE;&#x8C03;&#xFF0C;&#x800C;&#x8FD9;&#x4E2A;&#x56DE;&#x8C03;&#x5C31;&#x662F;&#x9012;&#x5F52;&#x5730;&#x8C03;&#x7528;&#x64AD;&#x653E;&#x52A8;&#x753B;&#x672C;&#x8EAB;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x3002;&#x90A3;&#x8981;&#x662F;&#x5BF9;&#x5E94;&#x5230;&#x6211;&#x4EEC;&#x8981;&#x5C01;&#x88C5;&#x7684;&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF0C;&#x53C8;&#x8BE5;&#x600E;&#x4E48;&#x5B9E;&#x73B0;&#x5462;&#xFF1F;</p><p>&#x601D;&#x8003;&#x826F;&#x4E45;&#xFF0C;&#x4E3A;&#x4E86;&#x4FDD;&#x6301;&#x548C;&#x4E00;&#x6B21;&#x6027;&#x52A8;&#x753B;API&#x7684;&#x4E00;&#x81F4;&#x6027;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7ED9;animatedContainer&#x65B0;&#x589E;&#x4E86;&#x4EE5;&#x4E0B;&#x51E0;&#x4E2A;&#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class AnimatedContainer extends PureComponent {

  ...
  
  constructor(props) {
    super(props);
    this.cyclicAnimations = {};
  }

  _createCyclicAnimation(name, animations) {
    this.cyclicAnimations[name] = Animated.sequence(animations);
  }
  
  _createCyclicAnimationPromise(name, animations) {
    return new Promise(resolve =&gt; {
      this._createCyclicAnimation(name, animations);
      this._playCyclicAnimation(name);
      resolve();
    });
  }  

  _playCyclicAnimation(name) {
    const animation = this.cyclicAnimations[name];
    animation.start(() =&gt; {
      animation.reset();
      this._playCyclicAnimation(name);
    });
  }

  _stopCyclicAnimation(name) {
    this.cyclicAnimations[name].stop();
  }

  ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AnimatedContainer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">PureComponent</span> </span>{

  ...
  
  constructor(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.cyclicAnimations = {};
  }

  _createCyclicAnimation(name, animations) {
    <span class="hljs-keyword">this</span>.cyclicAnimations[name] = Animated.sequence(animations);
  }
  
  _createCyclicAnimationPromise(name, animations) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>._createCyclicAnimation(name, animations);
      <span class="hljs-keyword">this</span>._playCyclicAnimation(name);
      resolve();
    });
  }  

  _playCyclicAnimation(name) {
    <span class="hljs-keyword">const</span> animation = <span class="hljs-keyword">this</span>.cyclicAnimations[name];
    animation.start(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      animation.reset();
      <span class="hljs-keyword">this</span>._playCyclicAnimation(name);
    });
  }

  _stopCyclicAnimation(name) {
    <span class="hljs-keyword">this</span>.cyclicAnimations[name].stop();
  }

  ...
}</code></pre><p>&#x5176;&#x4E2D;&#xFF0C;_createCyclicAnimation&#xFF0C;_createCyclicAnimationPromise&#x662F;&#x548C;&#x4E00;&#x6B21;&#x6027;&#x52A8;&#x753B;&#x7684;API&#x5BF9;&#x5E94;&#x7684;&#x3002;&#x4F46;&#x662F;&#xFF0C;&#x4E0D;&#x540C;&#x70B9;&#x5728;&#x4E8E;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#x53D1;&#x751F;&#x4E86;&#x5F88;&#x5927;&#x7684;&#x53D8;&#x5316;&#xFF1A;animationConfg -&gt; (name, animations)</p><ol><li>name&#x662F;&#x4E00;&#x4E2A;&#x6807;&#x5FD7;&#x7B26;&#xFF0C;&#x5FAA;&#x73AF;&#x52A8;&#x753B;&#x4E4B;&#x95F4;&#x4E0D;&#x80FD;&#x91CD;&#x540D;&#x3002;_playCyclicAnimation&#x548C;_stopCyclicAnimation&#x90FD;&#x662F;&#x901A;&#x8FC7;name&#x6765;&#x5339;&#x914D;&#x76F8;&#x5E94;animation&#x5E76;&#x8C03;&#x7528;&#x7684;&#x3002;</li><li>animations&#x662F;&#x4E00;&#x7EC4;&#x52A8;&#x753B;&#xFF0C;&#x5176;&#x4E2D;&#x6BCF;&#x4E2A;animation&#x662F;&#x8C03;&#x7528;_createAnimation&#x751F;&#x6210;&#x7684;&#x3002;&#x7531;&#x4E8E;&#x5FAA;&#x73AF;&#x52A8;&#x753B;&#x53EF;&#x4EE5;&#x662F;&#x7531;&#x4E00;&#x7EC4;&#x4E00;&#x6B21;&#x6027;&#x52A8;&#x753B;&#x7EC4;&#x6210;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5728;_createCyclicAnimation&#x4E2D;&#x4E5F;&#x662F;&#x76F4;&#x63A5;&#x8C03;&#x7528;&#x4E86;Animated.sequence&#xFF0C;&#x800C;&#x5FAA;&#x73AF;&#x64AD;&#x653E;&#x7684;&#x5B9E;&#x73B0;&#x5C31;&#x5728;&#x4E8E;_playCyclicAnimation&#x4E2D;&#x7684;&#x9012;&#x5F52;&#x8C03;&#x7528;&#x3002;</li></ol><p>&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x5FAA;&#x73AF;&#x52A8;&#x753B;&#x57FA;&#x672C;&#x4E5F;&#x5DF2;&#x7ECF;&#x5C01;&#x88C5;&#x5B8C;&#x6BD5;&#x3002;&#x518D;&#x6765;&#x5C01;&#x88C5;&#x4E24;&#x4E2A;&#x5FAA;&#x73AF;&#x52A8;&#x753B;roll&#xFF08;&#x65CB;&#x8F6C;&#xFF09;&#xFF0C;blink&#xFF08;&#x95EA;&#x70C1;&#xFF09;&#x8BD5;&#x8BD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="blink(config = {period: 2000}) {
  return this._createCyclicAnimationPromise(&apos;blink&apos;, [
    this._createAnimation([{
      toValue: 1,
      duration: config.period / 2,
      animatedValue: this.opacityAnimatedValue
    }]),
    this._createAnimation([{
      toValue: 0,
      duration: config.period / 2,
      animatedValue: this.opacityAnimatedValue
    }])
  ]);
}

stopBlink() {
  this._stopCyclicAnimation(&apos;blink&apos;);
}

roll(config = {period: 1000}) {
  return this._createCyclicAnimationPromise(&apos;roll&apos;, [
    this._createAnimation([{
      toValue: Math.PI * 2,
      duration: config.period,
      animatedValue: this.rotateAnimatedValue
    }])
  ]);
}

stopRoll() {
  this._stopCyclicAnimation(&apos;roll&apos;);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">blink(config = {<span class="hljs-attr">period</span>: <span class="hljs-number">2000</span>}) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._createCyclicAnimationPromise(<span class="hljs-string">&apos;blink&apos;</span>, [
    <span class="hljs-keyword">this</span>._createAnimation([{
      <span class="hljs-attr">toValue</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">duration</span>: config.period / <span class="hljs-number">2</span>,
      <span class="hljs-attr">animatedValue</span>: <span class="hljs-keyword">this</span>.opacityAnimatedValue
    }]),
    <span class="hljs-keyword">this</span>._createAnimation([{
      <span class="hljs-attr">toValue</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">duration</span>: config.period / <span class="hljs-number">2</span>,
      <span class="hljs-attr">animatedValue</span>: <span class="hljs-keyword">this</span>.opacityAnimatedValue
    }])
  ]);
}

stopBlink() {
  <span class="hljs-keyword">this</span>._stopCyclicAnimation(<span class="hljs-string">&apos;blink&apos;</span>);
}

roll(config = {<span class="hljs-attr">period</span>: <span class="hljs-number">1000</span>}) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._createCyclicAnimationPromise(<span class="hljs-string">&apos;roll&apos;</span>, [
    <span class="hljs-keyword">this</span>._createAnimation([{
      <span class="hljs-attr">toValue</span>: <span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">2</span>,
      <span class="hljs-attr">duration</span>: config.period,
      <span class="hljs-attr">animatedValue</span>: <span class="hljs-keyword">this</span>.rotateAnimatedValue
    }])
  ]);
}

stopRoll() {
  <span class="hljs-keyword">this</span>._stopCyclicAnimation(<span class="hljs-string">&apos;roll&apos;</span>);
}</code></pre><h2 id="articleHeader5">4. &#x5B9E;&#x6218;</h2><p>&#x5FD9;&#x6D3B;&#x4E86;&#x5927;&#x534A;&#x5929;&#xFF0C;&#x603B;&#x7B97;&#x662F;&#x628A;AnimatedContainer&#x5C01;&#x88C5;&#x597D;&#x4E86;&#x3002;&#x5148;&#x627E;&#x4E2A;&#x7D20;&#x6750;&#x7EC3;&#x7EC3;&#x624B;&#x5427;~&#x53EF;&#x662F;&#xFF0C;&#x627E;&#x4E2A;&#x5565;&#x5462;&#xFF1F;&#x201C;&#x53EE;&#x201D;&#xFF0C;&#x53EA;&#x89C1;&#x624B;&#x673A;&#x4E0A;&#x6316;&#x8D22;&#x7684;&#x4E00;&#x4E2A;&#x63D0;&#x9192;&#x4EAE;&#x4E86;&#x8D77;&#x6765;&#x3002;&#x563F;&#x563F;&#xFF0C;&#x5C31;&#x4F60;&#x4E86;&#xFF0C;&#x6316;&#x8D22;&#x7684;&#x7B7E;&#x5230;&#x9875;&#x9762;&#x771F;&#x7684;&#x5F88;&#x9002;&#x5408;&#xFF08;&#x6CA1;&#x6709;&#x505A;&#x5E7F;&#x544A;&#x3002;&#x3002;&#x3002;&#xFF09;&#x6548;&#x679C;&#x56FE;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015239367" src="https://static.alili.tech/img/remote/1460000015239367" alt="WACAI-DEMO.GIF" title="WACAI-DEMO.GIF" style="cursor:pointer;display:inline"></span></p><p>&#x6E32;&#x67D3;&#x5143;&#x7D20;&#x7684;render&#x4EE3;&#x7801;&#x5C31;&#x4E0D;&#x8D34;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x770B;&#x52A8;&#x753B;&#x64AD;&#x653E;&#x7684;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="startOpeningAnimation() {

  // &#x7B7E;&#x5230;&#xFF08;&#x4E00;&#x6B21;&#x6027;&#x52A8;&#x753B;&#xFF09;
  Promise
    .all([
      this._header.show(),
      this._header.scaleTo({scale: 1}),
      this._header.rotateTo({rotate: Math.PI * 2})
    ])
    .then(() =&gt; this._header.sleep(100))
    .then(() =&gt; this._header.moveTo({x: 64, y: 150}))
    .then(() =&gt; Promise.all([
      this._tips.show(),
      this._ladder.sleep(150).then(() =&gt; this._ladder.show())
    ]))
    .then(() =&gt; Promise.all([
      this._today.show(),
      this._today.moveTo({x: 105, y: 365})
    ]));

  // &#x661F;&#x661F;&#x95EA;&#x70C1;&#xFF08;&#x5FAA;&#x73AF;&#x52A8;&#x753B;&#xFF09;
  this._stars.forEach(item =&gt; item
    .sleep(Math.random() * 2000)
    .then(() =&gt; item.blink({period: 1000}))
  );
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">startOpeningAnimation() {

  <span class="hljs-comment">// &#x7B7E;&#x5230;&#xFF08;&#x4E00;&#x6B21;&#x6027;&#x52A8;&#x753B;&#xFF09;</span>
  <span class="hljs-built_in">Promise</span>
    .all([
      <span class="hljs-keyword">this</span>._header.show(),
      <span class="hljs-keyword">this</span>._header.scaleTo({<span class="hljs-attr">scale</span>: <span class="hljs-number">1</span>}),
      <span class="hljs-keyword">this</span>._header.rotateTo({<span class="hljs-attr">rotate</span>: <span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">2</span>})
    ])
    .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>._header.sleep(<span class="hljs-number">100</span>))
    .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>._header.moveTo({<span class="hljs-attr">x</span>: <span class="hljs-number">64</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">150</span>}))
    .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">Promise</span>.all([
      <span class="hljs-keyword">this</span>._tips.show(),
      <span class="hljs-keyword">this</span>._ladder.sleep(<span class="hljs-number">150</span>).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>._ladder.show())
    ]))
    .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">Promise</span>.all([
      <span class="hljs-keyword">this</span>._today.show(),
      <span class="hljs-keyword">this</span>._today.moveTo({<span class="hljs-attr">x</span>: <span class="hljs-number">105</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">365</span>})
    ]));

  <span class="hljs-comment">// &#x661F;&#x661F;&#x95EA;&#x70C1;&#xFF08;&#x5FAA;&#x73AF;&#x52A8;&#x753B;&#xFF09;</span>
  <span class="hljs-keyword">this</span>._stars.forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item
    .sleep(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">2000</span>)
    .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> item.blink({<span class="hljs-attr">period</span>: <span class="hljs-number">1000</span>}))
  );
}</code></pre><p>&#x5149;&#x770B;&#x4EE3;&#x7801;&#xFF0C;&#x662F;&#x4E0D;&#x662F;&#x5C31;&#x5DF2;&#x7ECF;&#x8111;&#x8865;&#x6574;&#x4E2A;&#x52A8;&#x753B;&#x4E86;~ &#x80A5;&#x80A0;&#x5730;&#x4E00;&#x76EE;&#x4E86;&#x7136;&#xFF0C;&#x771F;&#x7684;&#x662F;&#x7F8E;&#x6ECB;&#x6ECB;&#x3002;</p><h2 id="articleHeader6">5. &#x540E;&#x7EED;&#x601D;&#x8003;</h2><ol><li>&#x8BB2;&#x9053;&#x7406;&#xFF0C;&#x73B0;&#x5728;&#x8FD9;&#x4E2A;AnimatedContainer&#x80FD;&#x591F;&#x521B;&#x5EFA;&#x7684;&#x52A8;&#x753B;&#x8FD8;&#x662F;&#x7A0D;&#x663E;&#x5355;&#x8584;&#xFF0C;&#x4EC5;&#x5305;&#x542B;&#x4E86;&#x6700;&#x57FA;&#x7840;&#x7684;&#x4E00;&#x4E9B;&#x57FA;&#x672C;&#x64CD;&#x4F5C;&#x3002;&#x4E0D;&#x8FC7;&#xFF0C;&#x8FD9;&#x4E5F;&#x8BF4;&#x660E;&#x4E86;&#x8FD8;&#x6709;&#x5F88;&#x5927;&#x7684;&#x6269;&#x5C55;&#x7A7A;&#x95F4;&#xFF0C;&#x6839;&#x636E;_createCyclicAnimationPromise&#x548C;_createAnimationPromise&#x8FD9;&#x4E24;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x53EF;&#x4EE5;&#x81EA;&#x7531;&#x5730;&#x5C01;&#x88C5;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x5404;&#x79CD;&#x590D;&#x6742;&#x52A8;&#x753B;&#x6548;&#x679C;&#x3002;&#x800C;&#x8C03;&#x7528;&#x65B9;&#x5C31;&#x53EA;&#x8981;&#x901A;&#x8FC7;promise&#x7684;all&#x548C;then&#x65B9;&#x6CD5;&#x6765;&#x63A7;&#x5236;&#x52A8;&#x753B;&#x987A;&#x5E8F;&#x5C31;&#x884C;&#x4E86;&#x3002;&#x4E2A;&#x4EBA;&#x611F;&#x89C9;&#xFF0C;&#x751A;&#x81F3;&#x6709;&#x90A3;&#x4E48;&#x4E00;&#x4E01;&#x70B9;&#x5728;&#x4F7F;&#x7528;jQuery&#x3002;&#x3002;&#x3002;</li><li>&#x9664;&#x6B64;&#x4E4B;&#x5916;&#xFF0C;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#x5C31;&#x662F;&#xFF1A;&#x7531;&#x4E8E;&#x8FD9;&#x4E9B;&#x5143;&#x7D20;&#x90FD;&#x662F;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x5E03;&#x5C40;&#x7684;&#xFF0C;&#x90A3;&#x8FD9;&#x4E9B;&#x5143;&#x7D20;&#x7684;x, y&#x5750;&#x6807;&#x503C;&#x600E;&#x4E48;&#x529E;&#xFF1F;&#x5728;&#x6709;&#x89C6;&#x89C9;&#x6807;&#x6CE8;&#x7A3F;&#x7684;&#x524D;&#x63D0;&#x4E0B;&#xFF0C;&#x90A3;&#x611F;&#x89C9;&#x8FD8;&#x53EF;&#x884C;&#x3002;&#x4F46;&#x662F;&#x4E00;&#x65E6;&#x5143;&#x7D20;&#x7684;&#x6570;&#x91CF;&#x4E0A;&#x53BB;&#x4E86;&#xFF0C;&#x90A3;&#x5728;&#x4F7F;&#x7528;&#x4E0A;&#x8FD8;&#x662F;&#x6709;&#x70B9;&#x9EBB;&#x70E6;&#x7684;&#x3002;&#x3002;&#x3002;&#x6240;&#x4EE5;&#x554A;&#xFF0C;&#x8981;&#x662F;&#x6709;&#x4E2A;&#x4EC0;&#x4E48;&#x5DE5;&#x5177;&#x80FD;&#x591F;&#x771F;&#x7684;&#x50CF;&#x505A;PPT&#x4E00;&#x6837;&#xFF0C;&#x652F;&#x6301;&#x5143;&#x7D20;&#x62D6;&#x62FD;&#x5E76;&#x5B9E;&#x65F6;&#x83B7;&#x5F97;&#x5143;&#x7D20;&#x7684;&#x5750;&#x6807;&#xFF0C;&#x90A3;&#x5C31;&#x771F;&#x7684;&#x662F;&#x6587;&#x7F8E;&#x4E86;&#x3002;&#x3002;&#x3002;&#x3002;&#x3002;&#x3002;</li></ol><p>&#x8001;&#x89C4;&#x77E9;&#xFF0C;&#x672C;&#x6587;&#x4EE3;&#x7801;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/SmallStoneSK/AnimatedContainer" rel="nofollow noreferrer" target="_blank">https://github.com/SmallStoneSK/AnimatedContainer</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
RN自定义组件封装 - 播放类似PPT动画

## 原文链接
[https://segmentfault.com/a/1190000014216692](https://segmentfault.com/a/1190000014216692)

