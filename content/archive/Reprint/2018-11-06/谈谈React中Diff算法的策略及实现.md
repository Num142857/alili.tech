---
title: 谈谈React中Diff算法的策略及实现
hidden: true
categories: reprint
slug: b35399aa
date: 2018-11-06 15:28:32
---

{{< raw >}}
<h2 id="articleHeader0">1&#x3001;&#x4EC0;&#x4E48;&#x662F;Diff&#x7B97;&#x6CD5;</h2><ul><li><strong>&#x4F20;&#x7EDF;Diff&#xFF1A;</strong>diff&#x7B97;&#x6CD5;&#x5373;&#x5DEE;&#x5F02;&#x67E5;&#x627E;&#x7B97;&#x6CD5;&#xFF1B;&#x5BF9;&#x4E8E;Html DOM&#x7ED3;&#x6784;&#x5373;&#x4E3A;tree&#x7684;&#x5DEE;&#x5F02;&#x67E5;&#x627E;&#x7B97;&#x6CD5;&#xFF1B;&#x800C;&#x5BF9;&#x4E8E;&#x8BA1;&#x7B97;&#x4E24;&#x9897;&#x6811;&#x7684;&#x5DEE;&#x5F02;&#x65F6;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#x4E3A;O&#xFF08;n^3&#xFF09;,&#x663E;&#x7136;&#x6210;&#x672C;&#x592A;&#x9AD8;&#xFF0C;React&#x4E0D;&#x53EF;&#x80FD;&#x91C7;&#x7528;&#x8FD9;&#x79CD;&#x4F20;&#x7EDF;&#x7B97;&#x6CD5;&#xFF1B;</li><li><p><strong>React Diff&#xFF1A;</strong></p><ul><li>&#x4E4B;&#x524D;&#x8BF4;&#x8FC7;&#xFF0C;React&#x91C7;&#x7528;&#x865A;&#x62DF;DOM&#x6280;&#x672F;&#x5B9E;&#x73B0;&#x5BF9;&#x771F;&#x5B9E;DOM&#x7684;&#x6620;&#x5C04;&#xFF0C;&#x5373;React Diff&#x7B97;&#x6CD5;&#x7684;&#x5DEE;&#x5F02;&#x67E5;&#x627E;&#x5B9E;&#x8D28;&#x662F;&#x5BF9;&#x4E24;&#x4E2A;JavaScript&#x5BF9;&#x8C61;&#x7684;&#x5DEE;&#x5F02;&#x67E5;&#x627E;&#xFF1B;</li><li>&#x57FA;&#x4E8E;&#x4E09;&#x4E2A;&#x7B56;&#x7565;&#xFF1A;</li></ul><ol><li>Web UI &#x4E2D; DOM &#x8282;&#x70B9;&#x8DE8;&#x5C42;&#x7EA7;&#x7684;&#x79FB;&#x52A8;&#x64CD;&#x4F5C;&#x7279;&#x522B;&#x5C11;&#xFF0C;&#x53EF;&#x4EE5;&#x5FFD;&#x7565;&#x4E0D;&#x8BA1;&#x3002;&#xFF08;tree diff&#xFF09;</li><li>&#x62E5;&#x6709;&#x76F8;&#x540C;&#x7C7B;&#x7684;&#x4E24;&#x4E2A;&#x7EC4;&#x4EF6;&#x5C06;&#x4F1A;&#x751F;&#x6210;&#x76F8;&#x4F3C;&#x7684;&#x6811;&#x5F62;&#x7ED3;&#x6784;&#xFF0C;&#x62E5;&#x6709;&#x4E0D;&#x540C;&#x7C7B;&#x7684;&#x4E24;&#x4E2A;&#x7EC4;&#x4EF6;&#x5C06;&#x4F1A;&#x751F;&#x6210;&#x4E0D;&#x540C;&#x7684;&#x6811;&#x5F62;&#x7ED3;&#xFF08;component diff&#xFF09;</li><li>&#x5BF9;&#x4E8E;&#x540C;&#x4E00;&#x5C42;&#x7EA7;&#x7684;&#x4E00;&#x7EC4;&#x5B50;&#x8282;&#x70B9;&#xFF0C;&#x5B83;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x552F;&#x4E00; id &#x8FDB;&#x884C;&#x533A;&#x5206;&#x3002;&#xFF08;element diff&#xFF09;</li></ol></li></ul><hr><h2 id="articleHeader1">2&#x3001;React Diff&#x7B97;&#x6CD5;&#x89E3;&#x8BFB;</h2><ul><li>&#x9996;&#x5148;&#x9700;&#x8981;&#x660E;&#x786E;&#xFF0C;&#x53EA;&#x6709;&#x5728;React&#x66F4;&#x65B0;&#x9636;&#x6BB5;&#x624D;&#x4F1A;&#x6709;Diff&#x7B97;&#x6CD5;&#x7684;&#x8FD0;&#x7528;&#xFF1B;</li><li><strong>React&#x66F4;&#x65B0;&#x673A;&#x5236;&#xFF1A;</strong></li></ul><p><span class="img-wrap"><img data-src="/img/bVbf8HN?w=1265&amp;h=1181" src="https://static.alili.tech/img/bVbf8HN?w=1265&amp;h=1181" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><ul><li>React Diff&#x7B97;&#x6CD5;&#x4F18;&#x5316;&#x7B56;&#x7565;&#x56FE;&#xFF1A;</li></ul><p><span class="img-wrap"><img data-src="/img/bVbgaj4?w=2194&amp;h=1118" src="https://static.alili.tech/img/bVbgaj4?w=2194&amp;h=1118" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><ul><li>React&#x66F4;&#x65B0;&#x9636;&#x6BB5;&#x4F1A;&#x5BF9;ReactElement&#x7C7B;&#x578B;&#x5224;&#x65AD;&#x800C;&#x8FDB;&#x884C;&#x4E0D;&#x540C;&#x7684;&#x64CD;&#x4F5C;&#xFF1B;ReactElement&#x7C7B;&#x578B;&#x5305;&#x542B;&#x4E09;&#x79CD;&#x5373;&#xFF1A;&#x6587;&#x672C;&#x3001;Dom&#x3001;&#x7EC4;&#x4EF6;&#xFF1B;</li><li><p>&#x6BCF;&#x4E2A;&#x7C7B;&#x578B;&#x7684;&#x5143;&#x7D20;&#x66F4;&#x65B0;&#x5904;&#x7406;&#x65B9;&#x5F0F;&#xFF1A;</p><ul><li>&#x81EA;&#x5B9A;&#x4E49;&#x5143;&#x7D20;&#x7684;&#x66F4;&#x65B0;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x66F4;&#x65B0;render&#x51FA;&#x7684;&#x8282;&#x70B9;&#xFF0C;&#x505A;&#x7529;&#x624B;&#x638C;&#x67DC;&#x4EA4;&#x7ED9;render&#x51FA;&#x7684;&#x8282;&#x70B9;&#x7684;&#x5BF9;&#x5E94;component&#x53BB;&#x7BA1;&#x7406;&#x66F4;&#x65B0;&#x3002;</li><li>text&#x8282;&#x70B9;&#x7684;&#x66F4;&#x65B0;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x76F4;&#x63A5;&#x66F4;&#x65B0;&#x6587;&#x6848;&#x3002;</li><li><p>&#x6D4F;&#x89C8;&#x5668;&#x57FA;&#x672C;&#x5143;&#x7D20;&#x7684;&#x66F4;&#x65B0;&#xFF0C;&#x5206;&#x4E3A;&#x4E24;&#x5757;&#xFF1A;</p><ol><li>&#x66F4;&#x65B0;&#x5C5E;&#x6027;&#xFF0C;&#x5BF9;&#x6BD4;&#x51FA;&#x524D;&#x540E;&#x5C5E;&#x6027;&#x7684;&#x4E0D;&#x540C;&#xFF0C;&#x5C40;&#x90E8;&#x66F4;&#x65B0;&#x3002;&#x5E76;&#x4E14;&#x5904;&#x7406;&#x7279;&#x6B8A;&#x5C5E;&#x6027;&#xFF0C;&#x6BD4;&#x5982;&#x4E8B;&#x4EF6;&#x7ED1;&#x5B9A;&#x3002;</li><li>&#x5B50;&#x8282;&#x70B9;&#x7684;&#x66F4;&#x65B0;&#xFF0C;&#x5B50;&#x8282;&#x70B9;&#x66F4;&#x65B0;&#x4E3B;&#x8981;&#x662F;&#x627E;&#x51FA;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#xFF0C;&#x627E;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#x7684;&#x65F6;&#x5019;&#x4E5F;&#x4F1A;&#x4F7F;&#x7528;&#x4E0A;&#x9762;&#x7684;shouldUpdateReactComponent&#x6765;&#x5224;&#x65AD;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x66F4;&#x65B0;&#x7684;&#x5C31;&#x4F1A;&#x9012;&#x5F52;&#x8C03;&#x7528;&#x5B50;&#x8282;&#x70B9;&#x7684;&#x66F4;&#x65B0;,&#x8FD9;&#x6837;&#x4E5F;&#x4F1A;&#x9012;&#x5F52;&#x67E5;&#x627E;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#x3002;&#x4E0D;&#x53EF;&#x76F4;&#x63A5;&#x66F4;&#x65B0;&#x7684;&#x5220;&#x9664;&#x4E4B;&#x524D;&#x7684;&#x5BF9;&#x8C61;&#x6216;&#x6DFB;&#x52A0;&#x65B0;&#x7684;&#x5BF9;&#x8C61;&#x3002;&#x4E4B;&#x540E;&#x6839;&#x636E;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#x64CD;&#x4F5C;dom&#x5143;&#x7D20;&#xFF08;&#x4F4D;&#x7F6E;&#x53D8;&#x52A8;&#xFF0C;&#x5220;&#x9664;&#xFF0C;&#x6DFB;&#x52A0;&#x7B49;&#xFF09;&#x3002;</li></ol></li></ul></li></ul><hr><ul><li>&#x4E8B;&#x5B9E;&#x4E0A;Diff&#x7B97;&#x6CD5;&#x53EA;&#x88AB;&#x8C03;&#x7528;&#x4E8E;React&#x66F4;&#x65B0;&#x9636;&#x6BB5;&#x7684;DOM&#x5143;&#x7D20;&#x66F4;&#x65B0;&#x8FC7;&#x7A0B;&#xFF1B;<strong>&#x4E3A;&#x4EC0;&#x4E48;&#x8FD9;&#x4E48;&#x8BF4;&#xFF1F;</strong></li></ul><p><strong>1&#x3001; &#x5982;&#x679C;&#x4E3A;&#x66F4;&#x65B0;&#x6587;&#x672C;&#x7C7B;&#x578B;</strong>&#xFF0C;&#x5185;&#x5BB9;&#x4E0D;&#x540C;&#x5C31;&#x76F4;&#x63A5;&#x66F4;&#x65B0;&#x66FF;&#x6362;&#xFF0C;&#x5E76;&#x4E0D;&#x4F1A;&#x8C03;&#x7528;&#x590D;&#x6742;&#x7684;Diff&#x7B97;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" ReactDOMTextComponent.prototype.receiveComponent(nextText, transaction) {
    //&#x4E0E;&#x4E4B;&#x524D;&#x4FDD;&#x5B58;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x6BD4;&#x8F83;
    if (nextText !== this._currentElement) {
      this._currentElement = nextText;
      var nextStringText = &apos;&apos; + nextText;
      if (nextStringText !== this._stringText) {
        this._stringText = nextStringText;
        var commentNodes = this.getHostNode();
        // &#x66FF;&#x6362;&#x6587;&#x672C;&#x5143;&#x7D20;
        DOMChildrenOperations.replaceDelimitedText(
          commentNodes[0],
          commentNodes[1],
          nextStringText
        );
      }
    }
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code> ReactDOMTextComponent.prototype.receiveComponent(nextText, transaction) {
    <span class="hljs-comment">//&#x4E0E;&#x4E4B;&#x524D;&#x4FDD;&#x5B58;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x6BD4;&#x8F83;</span>
    <span class="hljs-keyword">if</span> (nextText !== <span class="hljs-keyword">this</span>._currentElement) {
      <span class="hljs-keyword">this</span>._currentElement = nextText;
      <span class="hljs-keyword">var</span> nextStringText = <span class="hljs-string">&apos;&apos;</span> + nextText;
      <span class="hljs-keyword">if</span> (nextStringText !== <span class="hljs-keyword">this</span>._stringText) {
        <span class="hljs-keyword">this</span>._stringText = nextStringText;
        <span class="hljs-keyword">var</span> commentNodes = <span class="hljs-keyword">this</span>.getHostNode();
        <span class="hljs-comment">// &#x66FF;&#x6362;&#x6587;&#x672C;&#x5143;&#x7D20;</span>
        DOMChildrenOperations.replaceDelimitedText(
          commentNodes[<span class="hljs-number">0</span>],
          commentNodes[<span class="hljs-number">1</span>],
          nextStringText
        );
      }
    }
  }</code></pre><p><strong>2&#x3001;&#x5BF9;&#x4E8E;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x5143;&#x7D20;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 1,
        }
    }
    shouldComponentUpdate() {
        ....
    }
    render() {
        return (
            &lt;div&gt;
                &lt;p&gt;item1&lt;/p&gt;
                &lt;p&gt;item1&lt;/p&gt;
            &lt;/div&gt;
        )
    }
    
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Tab</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">index</span>: <span class="hljs-number">1</span>,
        }
    }
    shouldComponentUpdate() {
        ....
    }
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>item1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>item1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
    
}</code></pre><ul><li>&#x9700;&#x8981;&#x660E;&#x786E;&#x7684;&#x662F;&#xFF0C;&#x4F55;&#x4E3A;&#x7EC4;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x8BF4;&#x7EC4;&#x4EF6;&#x53EA;&#x4E0D;&#x8FC7;&#x662F;&#x4E00;&#x6BB5;Html&#x7ED3;&#x6784;&#x7684;&#x5305;&#x88C5;&#x5BB9;&#x5668;&#xFF0C;&#x5E76;&#x4E14;&#x5177;&#x5907;&#x7BA1;&#x7406;&#x8FD9;&#x6BB5;Html&#x7ED3;&#x6784;&#x7684;&#x72B6;&#x6001;&#x7B49;&#x80FD;&#x529B;&#xFF1B;</li><li>&#x5982;&#x4E0A;&#x8FF0;Tab&#x7EC4;&#x4EF6;&#xFF1A;&#x5B83;&#x7684;&#x5B9E;&#x8D28;&#x5185;&#x5BB9;&#x5C31;&#x662F;render&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x7684;Html&#x7ED3;&#x6784;&#xFF0C;&#x800C;&#x6211;&#x4EEC;&#x6240;&#x8BF4;&#x7684;Tab&#x7C7B;&#x5C31;&#x662F;&#x8FD9;&#x6BB5;Html&#x7ED3;&#x6784;&#x7684;&#x5305;&#x88C5;&#x5BB9;&#x5668;&#xFF08;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x4E00;&#x4E2A;&#x5305;&#x88C5;&#x76D2;&#x5B50;&#xFF09;&#xFF1B;</li><li>&#x5728;React&#x6E32;&#x67D3;&#x673A;&#x5236;&#x56FE;&#x4E2D;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x7684;&#x6700;&#x540E;&#x7ED3;&#x5408;React Diff&#x4F18;&#x5316;&#x7B56;&#x7565;&#x4E00;&#xFF08;&#x4E0D;&#x540C;&#x7C7B;&#x7684;&#x4E24;&#x4E2A;&#x7EC4;&#x4EF6;&#x5177;&#x5907;&#x4E0D;&#x540C;&#x7684;&#x7ED3;&#x6784;&#xFF09;</li></ul><p><strong>3&#x3001;&#x57FA;&#x672C;&#x5143;&#x7D20;:</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactDOMComponent.prototype.receiveComponent = function(nextElement, transaction, context) {
    var prevElement = this._currentElement;
    this._currentElement = nextElement;
    this.updateComponent(transaction, prevElement, nextElement, context);
}

ReactDOMComponent.prototype.updateComponent = function(transaction, prevElement, nextElement, context) {
    //&#x9700;&#x8981;&#x5355;&#x72EC;&#x7684;&#x66F4;&#x65B0;&#x5C5E;&#x6027;
    this._updateDOMProperties(lastProps, nextProps, transaction, isCustomComponentTag);
    //&#x518D;&#x66F4;&#x65B0;&#x5B50;&#x8282;&#x70B9;
    this._updateDOMChildren(
      lastProps,
      nextProps,
      transaction,
      context
    );

    // ......
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>ReactDOMComponent.prototype.receiveComponent = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(nextElement, transaction, context)</span> </span>{
    <span class="hljs-keyword">var</span> prevElement = <span class="hljs-keyword">this</span>._currentElement;
    <span class="hljs-keyword">this</span>._currentElement = nextElement;
    <span class="hljs-keyword">this</span>.updateComponent(transaction, prevElement, nextElement, context);
}

ReactDOMComponent.prototype.updateComponent = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(transaction, prevElement, nextElement, context)</span> </span>{
    <span class="hljs-comment">//&#x9700;&#x8981;&#x5355;&#x72EC;&#x7684;&#x66F4;&#x65B0;&#x5C5E;&#x6027;</span>
    <span class="hljs-keyword">this</span>._updateDOMProperties(lastProps, nextProps, transaction, isCustomComponentTag);
    <span class="hljs-comment">//&#x518D;&#x66F4;&#x65B0;&#x5B50;&#x8282;&#x70B9;</span>
    <span class="hljs-keyword">this</span>._updateDOMChildren(
      lastProps,
      nextProps,
      transaction,
      context
    );

    <span class="hljs-comment">// ......</span>
}</code></pre><ul><li>&#x5728;this._updateDOMChildren&#x65B9;&#x6CD5;&#x5185;&#x90E8;&#x624D;&#x8C03;&#x7528;&#x4E86;diff&#x7B97;&#x6CD5;&#x3002;</li></ul><hr><h2 id="articleHeader2">3&#x3001;React&#x4E2D;Diff&#x7B97;&#x6CD5;&#x7684;&#x5B9E;&#x73B0;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_updateChildren: function(nextNestedChildrenElements, transaction, context) {
    var prevChildren = this._renderedChildren;
    var removedNodes = {};
    var mountImages = [];

    // &#x83B7;&#x53D6;&#x65B0;&#x7684;&#x5B50;&#x5143;&#x7D20;&#x6570;&#x7EC4;
    var nextChildren = this._reconcilerUpdateChildren(
      prevChildren,
      nextNestedChildrenElements,
      mountImages,
      removedNodes,
      transaction,
      context
    );

    if (!nextChildren &amp;&amp; !prevChildren) {
      return;
    }

    var updates = null;
    var name;
    var nextIndex = 0;
    var lastIndex = 0;
    var nextMountIndex = 0;
    var lastPlacedNode = null;

    for (name in nextChildren) {
      if (!nextChildren.hasOwnProperty(name)) {
        continue;
      }
      var prevChild = prevChildren &amp;&amp; prevChildren[name];
      var nextChild = nextChildren[name];
      if (prevChild === nextChild) {
        // &#x540C;&#x4E00;&#x4E2A;&#x5F15;&#x7528;&#xFF0C;&#x8BF4;&#x660E;&#x662F;&#x4F7F;&#x7528;&#x7684;&#x540C;&#x4E00;&#x4E2A;component,&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x505A;&#x79FB;&#x52A8;&#x7684;&#x64CD;&#x4F5C;
        // &#x79FB;&#x52A8;&#x5DF2;&#x6709;&#x7684;&#x5B50;&#x8282;&#x70B9;
        // NOTICE&#xFF1A;&#x8FD9;&#x91CC;&#x6839;&#x636E;nextIndex, lastIndex&#x51B3;&#x5B9A;&#x662F;&#x5426;&#x79FB;&#x52A8;
        updates = enqueue(
          updates,
          this.moveChild(prevChild, lastPlacedNode, nextIndex, lastIndex)
        );

        // &#x66F4;&#x65B0;lastIndex
        lastIndex = Math.max(prevChild._mountIndex, lastIndex);
        // &#x66F4;&#x65B0;component&#x7684;.mountIndex&#x5C5E;&#x6027;
        prevChild._mountIndex = nextIndex;

      } else {
        if (prevChild) {
          // &#x66F4;&#x65B0;lastIndex
          lastIndex = Math.max(prevChild._mountIndex, lastIndex);
        }

        // &#x6DFB;&#x52A0;&#x65B0;&#x7684;&#x5B50;&#x8282;&#x70B9;&#x5728;&#x6307;&#x5B9A;&#x7684;&#x4F4D;&#x7F6E;&#x4E0A;
        updates = enqueue(
          updates,
          this._mountChildAtIndex(
            nextChild,
            mountImages[nextMountIndex],
            lastPlacedNode,
            nextIndex,
            transaction,
            context
          )
        );


        nextMountIndex++;
      }

      // &#x66F4;&#x65B0;nextIndex
      nextIndex++;
      lastPlacedNode = ReactReconciler.getHostNode(nextChild);
    }

    // &#x79FB;&#x9664;&#x6389;&#x4E0D;&#x5B58;&#x5728;&#x7684;&#x65E7;&#x5B50;&#x8282;&#x70B9;&#xFF0C;&#x548C;&#x65E7;&#x5B50;&#x8282;&#x70B9;&#x548C;&#x65B0;&#x5B50;&#x8282;&#x70B9;&#x4E0D;&#x540C;&#x7684;&#x65E7;&#x5B50;&#x8282;&#x70B9;
    for (name in removedNodes) {
      if (removedNodes.hasOwnProperty(name)) {
        updates = enqueue(
          updates,
          this._unmountChild(prevChildren[name], removedNodes[name])
        );
      }
    }
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>_updateChildren: function(nextNestedChildrenElements, transaction, context) {
    <span class="hljs-keyword">var</span> prevChildren = <span class="hljs-keyword">this</span>._renderedChildren;
    <span class="hljs-keyword">var</span> removedNodes = {};
    <span class="hljs-keyword">var</span> mountImages = [];

    <span class="hljs-comment">// &#x83B7;&#x53D6;&#x65B0;&#x7684;&#x5B50;&#x5143;&#x7D20;&#x6570;&#x7EC4;</span>
    <span class="hljs-keyword">var</span> nextChildren = <span class="hljs-keyword">this</span>._reconcilerUpdateChildren(
      prevChildren,
      nextNestedChildrenElements,
      mountImages,
      removedNodes,
      transaction,
      context
    );

    <span class="hljs-keyword">if</span> (!nextChildren &amp;&amp; !prevChildren) {
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">var</span> updates = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">var</span> name;
    <span class="hljs-keyword">var</span> nextIndex = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> lastIndex = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> nextMountIndex = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> lastPlacedNode = <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">for</span> (name <span class="hljs-keyword">in</span> nextChildren) {
      <span class="hljs-keyword">if</span> (!nextChildren.hasOwnProperty(name)) {
        <span class="hljs-keyword">continue</span>;
      }
      <span class="hljs-keyword">var</span> prevChild = prevChildren &amp;&amp; prevChildren[name];
      <span class="hljs-keyword">var</span> nextChild = nextChildren[name];
      <span class="hljs-keyword">if</span> (prevChild === nextChild) {
        <span class="hljs-comment">// &#x540C;&#x4E00;&#x4E2A;&#x5F15;&#x7528;&#xFF0C;&#x8BF4;&#x660E;&#x662F;&#x4F7F;&#x7528;&#x7684;&#x540C;&#x4E00;&#x4E2A;component,&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x505A;&#x79FB;&#x52A8;&#x7684;&#x64CD;&#x4F5C;</span>
        <span class="hljs-comment">// &#x79FB;&#x52A8;&#x5DF2;&#x6709;&#x7684;&#x5B50;&#x8282;&#x70B9;</span>
        <span class="hljs-comment">// NOTICE&#xFF1A;&#x8FD9;&#x91CC;&#x6839;&#x636E;nextIndex, lastIndex&#x51B3;&#x5B9A;&#x662F;&#x5426;&#x79FB;&#x52A8;</span>
        updates = enqueue(
          updates,
          <span class="hljs-keyword">this</span>.moveChild(prevChild, lastPlacedNode, nextIndex, lastIndex)
        );

        <span class="hljs-comment">// &#x66F4;&#x65B0;lastIndex</span>
        lastIndex = Math.max(prevChild._mountIndex, lastIndex);
        <span class="hljs-comment">// &#x66F4;&#x65B0;component&#x7684;.mountIndex&#x5C5E;&#x6027;</span>
        prevChild._mountIndex = nextIndex;

      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">if</span> (prevChild) {
          <span class="hljs-comment">// &#x66F4;&#x65B0;lastIndex</span>
          lastIndex = Math.max(prevChild._mountIndex, lastIndex);
        }

        <span class="hljs-comment">// &#x6DFB;&#x52A0;&#x65B0;&#x7684;&#x5B50;&#x8282;&#x70B9;&#x5728;&#x6307;&#x5B9A;&#x7684;&#x4F4D;&#x7F6E;&#x4E0A;</span>
        updates = enqueue(
          updates,
          <span class="hljs-keyword">this</span>._mountChildAtIndex(
            nextChild,
            mountImages[nextMountIndex],
            lastPlacedNode,
            nextIndex,
            transaction,
            context
          )
        );


        nextMountIndex++;
      }

      <span class="hljs-comment">// &#x66F4;&#x65B0;nextIndex</span>
      nextIndex++;
      lastPlacedNode = ReactReconciler.getHostNode(nextChild);
    }

    <span class="hljs-comment">// &#x79FB;&#x9664;&#x6389;&#x4E0D;&#x5B58;&#x5728;&#x7684;&#x65E7;&#x5B50;&#x8282;&#x70B9;&#xFF0C;&#x548C;&#x65E7;&#x5B50;&#x8282;&#x70B9;&#x548C;&#x65B0;&#x5B50;&#x8282;&#x70B9;&#x4E0D;&#x540C;&#x7684;&#x65E7;&#x5B50;&#x8282;&#x70B9;</span>
    <span class="hljs-keyword">for</span> (name <span class="hljs-keyword">in</span> removedNodes) {
      <span class="hljs-keyword">if</span> (removedNodes.hasOwnProperty(name)) {
        updates = enqueue(
          updates,
          <span class="hljs-keyword">this</span>._unmountChild(prevChildren[name], removedNodes[name])
        );
      }
    }
  }</code></pre><hr><h2 id="articleHeader3">5&#x3001;&#x57FA;&#x4E8E;&#x4E2D;Diff&#x7684;&#x5F00;&#x53D1;&#x5EFA;&#x8BAE;</h2><ul><li><p><strong>&#x57FA;&#x4E8E;tree diff&#xFF1A;</strong></p><ol><li>&#x5F00;&#x53D1;&#x7EC4;&#x4EF6;&#x65F6;&#xFF0C;&#x6CE8;&#x610F;&#x4FDD;&#x6301;DOM&#x7ED3;&#x6784;&#x7684;&#x7A33;&#x5B9A;&#xFF1B;&#x5373;&#xFF0C;&#x5C3D;&#x53EF;&#x80FD;&#x5C11;&#x5730;&#x52A8;&#x6001;&#x64CD;&#x4F5C;DOM&#x7ED3;&#x6784;&#xFF0C;&#x5C24;&#x5176;&#x662F;&#x79FB;&#x52A8;&#x64CD;&#x4F5C;&#x3002;</li><li>&#x5F53;&#x8282;&#x70B9;&#x6570;&#x8FC7;&#x5927;&#x6216;&#x8005;&#x9875;&#x9762;&#x66F4;&#x65B0;&#x6B21;&#x6570;&#x8FC7;&#x591A;&#x65F6;&#xFF0C;&#x9875;&#x9762;&#x5361;&#x987F;&#x7684;&#x73B0;&#x8C61;&#x4F1A;&#x6BD4;&#x8F83;&#x660E;&#x663E;&#x3002;</li><li>&#x8FD9;&#x65F6;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; CSS &#x9690;&#x85CF;&#x6216;&#x663E;&#x793A;&#x8282;&#x70B9;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x771F;&#x7684;&#x79FB;&#x9664;&#x6216;&#x6DFB;&#x52A0; DOM &#x8282;&#x70B9;&#x3002;</li></ol></li><li><p><strong>&#x57FA;&#x4E8E;component diff</strong>&#xFF1A;</p><ol><li>&#x6CE8;&#x610F;&#x4F7F;&#x7528; shouldComponentUpdate() &#x6765;&#x51CF;&#x5C11;&#x7EC4;&#x4EF6;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x66F4;&#x65B0;&#x3002;</li><li>&#x5BF9;&#x4E8E;&#x7C7B;&#x4F3C;&#x7684;&#x7ED3;&#x6784;&#x5E94;&#x8BE5;&#x5C3D;&#x91CF;&#x5C01;&#x88C5;&#x6210;&#x7EC4;&#x4EF6;&#xFF0C;&#x65E2;&#x51CF;&#x5C11;&#x4EE3;&#x7801;&#x91CF;&#xFF0C;&#x53C8;&#x80FD;&#x51CF;&#x5C11;component diff&#x7684;&#x6027;&#x80FD;&#x6D88;&#x8017;&#x3002;</li></ol></li><li><p><strong>&#x57FA;&#x4E8E;element diff</strong>&#xFF1A;</p><ol><li>&#x5BF9;&#x4E8E;&#x5217;&#x8868;&#x7ED3;&#x6784;&#xFF0C;&#x5C3D;&#x91CF;&#x51CF;&#x5C11;&#x7C7B;&#x4F3C;&#x5C06;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x8282;&#x70B9;&#x79FB;&#x52A8;&#x5230;&#x5217;&#x8868;&#x9996;&#x90E8;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x5F53;&#x8282;&#x70B9;&#x6570;&#x91CF;&#x8FC7;&#x5927;&#x6216;&#x66F4;&#x65B0;&#x64CD;&#x4F5C;&#x8FC7;&#x4E8E;&#x9891;&#x7E41;&#x65F6;&#xFF0C;&#x5728;&#x4E00;&#x5B9A;&#x7A0B;&#x5EA6;&#x4E0A;&#x4F1A;&#x5F71;&#x54CD; React &#x7684;&#x6E32;&#x67D3;&#x6027;&#x80FD;&#x3002;</li></ol></li><li><strong>&#x63A5;&#x4E0B;&#x6765;&#x624B;&#x52A8;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;Diff&#x7B97;&#x6CD5;&#x5373;&#x5C06;&#x66F4;&#x65B0;&#xFF0C;&#x656C;&#x8BF7;&#x671F;&#x5F85;&#xFF5E;&#xFF5E;&#xFF5E;</strong></li></ul><blockquote><strong>&#x201C;&#x79EF;&#x8DEC;&#x6B65;&#x3001;&#x884C;&#x5343;&#x91CC;&#x201D;</strong>&#x2014;&#x2014; &#x6301;&#x7EED;&#x66F4;&#x65B0;&#x4E2D;~&#xFF0C;&#x559C;&#x6B22;&#x7559;&#x4E0B;&#x4E2A;&#x8D5E;&#x54E6;&#xFF01;</blockquote><ul><li><p>&#x5F80;&#x671F;&#x7ECF;&#x5178;&#x597D;&#x6587;&#xFF1A;</p><ol><li><a href="https://segmentfault.com/a/1190000015676846">&#x56E2;&#x961F;&#x5408;&#x4F5C;&#x5FC5;&#x5907;&#x7684;Git&#x64CD;&#x4F5C;</a></li><li><a href="https://segmentfault.com/a/1190000015991869" target="_blank">&#x8C08;&#x8C08;Js&#x524D;&#x7AEF;&#x89C4;&#x8303;&#x5316;</a></li><li><a href="https://segmentfault.com/a/1190000016304921">&#x4ECE;React&#x6E32;&#x67D3;&#x6D41;&#x7A0B;&#x5206;&#x6790;Diff&#x7B97;&#x6CD5;</a></li></ol></li><li><p>&#x76F8;&#x5173;&#x4E13;&#x680F;&#x63A8;&#x8350;&#xFF1A;</p><ol><li><a href="https://segmentfault.com/blog/hui01" target="_blank">React&#x5B66;&#x4E60;&#x4E4B;&#x8DEF;</a></li></ol></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
谈谈React中Diff算法的策略及实现

## 原文链接
[https://segmentfault.com/a/1190000016539430](https://segmentfault.com/a/1190000016539430)

