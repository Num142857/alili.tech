---
title: RN自定义组件封装 - 神奇移动
hidden: true
categories: reprint
slug: a47f9bfe
date: 2018-11-01 02:30:09
---

{{< raw >}}
<p><a href="https://github.com/SmallStoneSK/Blog/issues/4" rel="nofollow noreferrer" target="_blank">&#x539F;&#x6587;&#x5730;&#x5740;: https://github.com/SmallStoneSK/Blog/issues/4</a></p><h2 id="articleHeader0">1. &#x524D;&#x8A00;</h2><p>&#x6700;&#x8FD1;&#x76EF;&#x4E0A;&#x4E86;app store&#x4E2D;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;&#x611F;&#x89C9;&#x633A;&#x597D;&#x73A9;&#x7684;&#xFF0C;&#x563F;&#x563F;~ &#x6070;&#x9022;&#x5468;&#x672B;&#xFF0C;&#x5F97;&#x7A7A;&#x5C31;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x8BD5;&#x8BD5;&#x3002;&#x4E0D;&#x8BD5;&#x4E0D;&#x77E5;&#x9053;&#xFF0C;&#x505A;&#x5B8C;&#x4E86;&#x624D;&#x53D1;&#x73B0;&#x5176;&#x5B9E;&#x8FD8;&#x633A;&#x7B80;&#x5355;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x548C;&#x5927;&#x5BB6;&#x5206;&#x4EAB;&#x4E00;&#x4E0B;&#x5C01;&#x88C5;&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x7684;&#x8FC7;&#x7A0B;&#x548C;&#x601D;&#x8DEF;&#x3002;</p><h2 id="articleHeader1">2. &#x9700;&#x6C42;&#x5206;&#x6790;</h2><p>&#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x5148;&#x6765;&#x770B;&#x770B;app store&#x4E2D;&#x7684;&#x6548;&#x679C;&#x662F;&#x600E;&#x4E48;&#x6837;&#x7684;&#xFF0C;&#x770B;&#x4E0B;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015246235?w=375&amp;h=662" src="https://static.alili.tech/img/remote/1460000015246235?w=375&amp;h=662" alt="image" title="image" style="cursor:pointer"></span></p><p>&#x54C7;&#xFF0C;&#x8FD9;&#x4E2A;&#x52A8;&#x753B;&#x662F;&#x4E0D;&#x662F;&#x5F88;&#x6709;&#x8DA3;&#xFF0C;&#x5F88;&#x795E;&#x5947;&#x3002;&#x4E3A;&#x6B64;&#xFF0C;&#x53EF;&#x4EE5;&#x7ED9;&#x5B83;&#x53D6;&#x4E2A;&#x6D0B;&#x6C14;&#x7684;&#x540D;&#x5B57;&#xFF1A;&#x795E;&#x5947;&#x79FB;&#x52A8;&#xFF0C;&#x82F1;&#x6587;&#x540D;&#x53EB;magicMoving~</p><p>&#x76AE;&#x5B8C;&#x4E4B;&#x540E;&#x518D;&#x56DE;&#x5230;&#x73B0;&#x5B9E;&#x4E2D;&#x6765;&#xFF0C;&#x8FD9;&#x4E2A;&#x52A8;&#x753B;&#x8BE5;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x5462;&#xFF1F;</p><p>&#x6211;&#x4EEC;&#x6765;&#x770B;&#x8FD9;&#x4E2A;&#x52A8;&#x753B;&#xFF0C;&#x9996;&#x5148;&#x4E00;&#x5F00;&#x59CB;&#x662F;&#x4E00;&#x4E2A;&#x957F;&#x5217;&#x8868;&#xFF0C;&#x70B9;&#x51FB;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#x5361;&#x7247;&#x4E4B;&#x540E;&#x5F39;&#x51FA;&#x4E00;&#x4E2A;&#x6D6E;&#x5C42;&#xFF0C;&#x800C;&#x4E14;&#x8FD9;&#x4E2D;&#x95F4;&#x6709;&#x4E00;&#x4E2A;&#x4ECE;&#x5361;&#x7247;&#x653E;&#x5927;&#x5230;&#x6D6E;&#x5C42;&#x7684;&#x8FC7;&#x6E21;&#x6548;&#x679C;&#x3002;&#x4E4D;&#x4E00;&#x770B;&#x597D;&#x50CF;&#x633A;&#x96BE;&#x7684;&#xFF0C;&#x4F46;&#x5982;&#x679C;&#x628A;&#x6574;&#x4E2A;&#x8FC7;&#x7A0B;&#x5206;&#x89E3;&#x4E00;&#x4E0B;&#x4F3C;&#x4E4E;&#x5C31;&#x8FCE;&#x5203;&#x800C;&#x89E3;&#x4E86;&#x3002;</p><ol><li>&#x7528;FlatList&#x6E32;&#x67D3;&#x957F;&#x5217;&#x8868;&#xFF1B;</li><li>&#x70B9;&#x51FB;&#x5361;&#x7247;&#x65F6;&#xFF0C;&#x83B7;&#x53D6;&#x70B9;&#x51FB;&#x5361;&#x7247;&#x5728;&#x5C4F;&#x5E55;&#x4E2D;&#x7684;&#x4F4D;&#x7F6E;&#xFF08;pageX, pageY&#xFF09;&#xFF1B;</li><li>clone&#x70B9;&#x51FB;&#x7684;&#x5361;&#x7247;&#x751F;&#x6210;&#x6D6E;&#x5C42;&#xFF0C;&#x5229;&#x7528;Animated&#x521B;&#x5EFA;&#x52A8;&#x753B;&#xFF0C;&#x63A7;&#x5236;&#x6D6E;&#x5C42;&#x7684;&#x5BBD;&#x9AD8;&#x548C;&#x4F4D;&#x79FB;&#xFF1B;</li><li>&#x70B9;&#x51FB;&#x5173;&#x95ED;&#x65F6;&#xFF0C;&#x5229;&#x7528;Animated&#x63A7;&#x5236;&#x6D6E;&#x5C42;&#x7F29;&#x5C0F;&#xFF0C;&#x52A8;&#x753B;&#x7ED3;&#x675F;&#x540E;&#x9500;&#x6BC1;&#x6D6E;&#x5C42;&#x3002;</li></ol><p>&#x5F53;&#x7136;&#x4E86;&#xFF0C;&#x4EE5;&#x4E0A;&#x7684;&#x8FD9;&#x4E2A;&#x601D;&#x8DEF;&#x5B9E;&#x73B0;&#x7684;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x6BDB;&#x80DA;&#x7248;&#x7684;&#x795E;&#x5947;&#x79FB;&#x52A8;&#x3002;&#x3002;&#x3002;&#x8FD8;&#x6709;&#x5F88;&#x591A;&#x7EC6;&#x8282;&#x53EF;&#x4EE5;&#x8FD8;&#x539F;&#x5730;&#x66F4;&#x597D;&#xFF0C;&#x6BD4;&#x5982;&#x80CC;&#x666F;&#x865A;&#x5316;&#xFF0C;&#x70B9;&#x51FB;&#x5361;&#x7247;&#x7F29;&#x5C0F;&#x7B49;&#x7B49;&#xFF0C;&#x4E0D;&#x8FC7;&#x8FD9;&#x4E9B;&#x4E0D;&#x662F;&#x672C;&#x6587;&#x63A2;&#x8BA8;&#x7684;&#x91CD;&#x70B9;&#x3002;</p><h2 id="articleHeader2">3. &#x5177;&#x4F53;&#x5B9E;&#x73B0;</h2><p>&#x5728;&#x5177;&#x4F53;&#x5B9E;&#x73B0;&#x4E4B;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x5F97;&#x8003;&#x8651;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;&#x7531;&#x4E8E;&#x7EC4;&#x4EF6;&#x7684;&#x901A;&#x7528;&#x6027;&#xFF0C;&#x6D6E;&#x5C42;&#x53EF;&#x80FD;&#x5728;&#x5404;&#x79CD;&#x573A;&#x666F;&#x4E0B;&#x88AB;&#x5524;&#x51FA;&#xFF0C;&#x4F46;&#x662F;&#x53C8;&#x9700;&#x8981;&#x80FD;&#x591F;&#x94FA;&#x6EE1;&#x5168;&#x5C4F;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;Modal&#x7EC4;&#x4EF6;&#x3002;</p><p>&#x7136;&#x540E;&#xFF0C;&#x6839;&#x636E;&#x5927;&#x6982;&#x7684;&#x601D;&#x8DEF;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5148;&#x642D;&#x597D;&#x6574;&#x4E2A;&#x7EC4;&#x4EF6;&#x7684;&#x6846;&#x67B6;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class MagicMoving extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      showPopupLayer: false
    };
  }
  
  _onRequestClose = () =&gt; {
    // TODO: ...
  }

  _renderList() {
    // TODO: ...
  }

  _renderPopupLayer() {
    const {showPopupLayer} = this.state;
    return (
      &lt;Modal
        transparent={true}
        visible={showPopupLayer}
        onRequestClose={this._onRequestClose}
      &gt;
        {...}
      &lt;/Modal&gt;
    );
  }

  render() {
    const {style} = this.props;
    return (
      &lt;View style={style}&gt;
        {this._renderList()}
        {this._renderPopupLayer()}
      &lt;/View&gt;
    );
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MagicMoving</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">selectedIndex</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">showPopupLayer</span>: <span class="hljs-literal">false</span>
    };
  }
  
  _onRequestClose = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-comment">// <span class="hljs-doctag">TODO:</span> ...</span>
  }

  _renderList() {
    <span class="hljs-comment">// <span class="hljs-doctag">TODO:</span> ...</span>
  }

  _renderPopupLayer() {
    <span class="hljs-keyword">const</span> {showPopupLayer} = <span class="hljs-keyword">this</span>.state;
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Modal</span>
        <span class="hljs-attr">transparent</span>=<span class="hljs-string">{true}</span>
        <span class="hljs-attr">visible</span>=<span class="hljs-string">{showPopupLayer}</span>
        <span class="hljs-attr">onRequestClose</span>=<span class="hljs-string">{this._onRequestClose}</span>
      &gt;</span>
        {...}
      <span class="hljs-tag">&lt;/<span class="hljs-name">Modal</span>&gt;</span></span>
    );
  }

  render() {
    <span class="hljs-keyword">const</span> {style} = <span class="hljs-keyword">this</span>.props;
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">View</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{style}</span>&gt;</span>
        {this._renderList()}
        {this._renderPopupLayer()}
      <span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span></span>
    );
  }
}</code></pre><h3 id="articleHeader3">3.1 &#x6784;&#x9020;&#x5217;&#x8868;</h3><p>&#x5217;&#x8868;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x53EA;&#x8981;&#x8C03;&#x7528;&#x65B9;&#x6307;&#x5B9A;&#x4E86;data&#xFF0C;&#x7528;&#x4E00;&#x4E2A;FlatList&#x5C31;&#x80FD;&#x641E;&#x5B9A;&#x3002;&#x4F46;&#x662F;card&#x4E2D;&#x7684;&#x5177;&#x4F53;&#x6837;&#x5F0F;&#xFF0C;&#x6211;&#x4EEC;&#x5E94;&#x8BE5;&#x4EA4;&#x7531;&#x8C03;&#x7528;&#x65B9;&#x6765;&#x786E;&#x5B9A;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x66B4;&#x9732;renderCardContent&#x65B9;&#x6CD5;&#x51FA;&#x6765;&#x3002;&#x9664;&#x6B64;&#x4E4B;&#x5916;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x9700;&#x8981;&#x4FDD;&#x5B58;&#x4E0B;&#x6BCF;&#x4E2A;card&#x7684;ref&#xFF0C;&#x8FD9;&#x4E2A;&#x5728;&#x540E;&#x9762;&#x83B7;&#x53D6;&#x5361;&#x7247;&#x4F4D;&#x7F6E;&#x6709;&#x7740;&#x81F3;&#x5173;&#x91CD;&#x8981;&#x7684;&#x4F5C;&#x7528;&#xFF0C;&#x770B;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class MagicMoving extends Component {

  constructor(props) {
    // ...
    this._cardRefs = [];
  }
  
  _onPressCard = index =&gt; {
    // TODO: ...
  };

  _renderCard = ({item, index}) =&gt; {
    const {cardStyle, renderCardContent} = this.props;
    return (
      &lt;TouchableOpacity
        style={cardStyle}
        ref={_ =&gt; this._cardRefs[index] = _}
        onPress={() =&gt; this._onPressCard(index)}
      &gt;
        {renderCardContent(item, index)}
      &lt;/TouchableOpacity&gt;
    );
  };

  _renderList() {
    const {data} = this.props;
    return (
      &lt;FlatList
        data={data}
        keyExtractor={(item, index) =&gt; index.toString()}
        renderItem={this._renderCard}
      /&gt;
    );
  }

  // ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MagicMoving</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">this</span>._cardRefs = [];
  }
  
  _onPressCard = <span class="hljs-function"><span class="hljs-params">index</span> =&gt;</span> {
    <span class="hljs-comment">// <span class="hljs-doctag">TODO:</span> ...</span>
  };

  _renderCard = <span class="hljs-function">(<span class="hljs-params">{item, index}</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> {cardStyle, renderCardContent} = <span class="hljs-keyword">this</span>.props;
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">TouchableOpacity</span>
        <span class="hljs-attr">style</span>=<span class="hljs-string">{cardStyle}</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">{_</span> =&gt;</span> this._cardRefs[index] = _}
        onPress={() =&gt; this._onPressCard(index)}
      &gt;
        {renderCardContent(item, index)}
      <span class="hljs-tag">&lt;/<span class="hljs-name">TouchableOpacity</span>&gt;</span></span>
    );
  };

  _renderList() {
    <span class="hljs-keyword">const</span> {data} = <span class="hljs-keyword">this</span>.props;
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">FlatList</span>
        <span class="hljs-attr">data</span>=<span class="hljs-string">{data}</span>
        <span class="hljs-attr">keyExtractor</span>=<span class="hljs-string">{(item,</span> <span class="hljs-attr">index</span>) =&gt;</span> index.toString()}
        renderItem={this._renderCard}
      /&gt;
    );
  }

  // ...
}</span></code></pre><h3 id="articleHeader4">3.2 &#x83B7;&#x53D6;&#x70B9;&#x51FB;&#x5361;&#x7247;&#x7684;&#x4F4D;&#x7F6E;</h3><p>&#x83B7;&#x53D6;&#x70B9;&#x51FB;&#x5361;&#x7247;&#x7684;&#x4F4D;&#x7F6E;&#x662F;&#x795E;&#x5947;&#x79FB;&#x52A8;&#x6548;&#x679C;&#x4E2D;&#x6700;&#x4E3A;&#x5173;&#x952E;&#x7684;&#x4E00;&#x73AF;&#xFF0C;&#x90A3;&#x4E48;&#x5982;&#x4F55;&#x83B7;&#x53D6;&#x5462;&#xFF1F;</p><p>&#x5176;&#x5B9E;&#x5728;<a href="https://github.com/SmallStoneSK/Blog/issues/2" rel="nofollow noreferrer" target="_blank">RN&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x5C01;&#x88C5; - &#x62D6;&#x62FD;&#x9009;&#x62E9;&#x65E5;&#x671F;&#x7684;&#x65E5;&#x5386;</a>&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x5DF2;&#x7ECF;&#x5C0F;&#x8BD5;&#x725B;&#x5200;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="UIManager.measure(findNodeHandle(ref), (x, y, width, height, pageX, pageY) =&gt; {
  // x:      &#x76F8;&#x5BF9;&#x4E8E;&#x7236;&#x7EC4;&#x4EF6;&#x7684;x&#x5750;&#x6807;
  // y:      &#x76F8;&#x5BF9;&#x4E8E;&#x7236;&#x7EC4;&#x4EF6;&#x7684;y&#x5750;&#x6807;
  // width:  &#x7EC4;&#x4EF6;&#x5BBD;&#x5EA6;
  // height: &#x7EC4;&#x4EF6;&#x9AD8;&#x5EA6;
  // pageX:  &#x7EC4;&#x4EF6;&#x5728;&#x5C4F;&#x5E55;&#x4E2D;&#x7684;x&#x5750;&#x6807;
  // pageY:  &#x7EC4;&#x4EF6;&#x5728;&#x5C4F;&#x5E55;&#x4E2D;&#x7684;y&#x5750;&#x6807;
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs arduino"><code>UIManager.measure(findNodeHandle(ref), (x, y, <span class="hljs-built_in">width</span>, <span class="hljs-built_in">height</span>, pageX, pageY) =&gt; {
  <span class="hljs-comment">// x:      &#x76F8;&#x5BF9;&#x4E8E;&#x7236;&#x7EC4;&#x4EF6;&#x7684;x&#x5750;&#x6807;</span>
  <span class="hljs-comment">// y:      &#x76F8;&#x5BF9;&#x4E8E;&#x7236;&#x7EC4;&#x4EF6;&#x7684;y&#x5750;&#x6807;</span>
  <span class="hljs-comment">// width:  &#x7EC4;&#x4EF6;&#x5BBD;&#x5EA6;</span>
  <span class="hljs-comment">// height: &#x7EC4;&#x4EF6;&#x9AD8;&#x5EA6;</span>
  <span class="hljs-comment">// pageX:  &#x7EC4;&#x4EF6;&#x5728;&#x5C4F;&#x5E55;&#x4E2D;&#x7684;x&#x5750;&#x6807;</span>
  <span class="hljs-comment">// pageY:  &#x7EC4;&#x4EF6;&#x5728;&#x5C4F;&#x5E55;&#x4E2D;&#x7684;y&#x5750;&#x6807;</span>
});</code></pre><p>&#x56E0;&#x6B64;&#xFF0C;&#x501F;&#x52A9;UIManager.measure&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5F88;&#x8F7B;&#x6613;&#x5730;&#x83B7;&#x5F97;&#x5361;&#x7247;&#x5728;&#x5C4F;&#x5E55;&#x4E2D;&#x7684;&#x5750;&#x6807;&#xFF0C;&#x4E0A;&#x4E00;&#x6B65;&#x4FDD;&#x5B58;&#x4E0B;&#x6765;&#x7684;ref&#x4E5F;&#x6D3E;&#x4E0A;&#x4E86;&#x7528;&#x573A;&#x3002;</p><p>&#x53E6;&#x5916;&#xFF0C;&#x7531;&#x4E8E;&#x5F39;&#x51FA;&#x5C42;&#x4ECE;&#x5361;&#x7247;&#x7684;&#x4F4D;&#x7F6E;&#x5C55;&#x5F00;&#x6210;&#x94FA;&#x6EE1;&#x5168;&#x5C4F;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x6709;&#x4E00;&#x4E2A;&#x8FC7;&#x6E21;&#x7684;&#x52A8;&#x753B;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7528;&#x5230;Animated&#x6765;&#x63A7;&#x5236;&#x8FD9;&#x4E2A;&#x53D8;&#x5316;&#x8FC7;&#x7A0B;&#x3002;&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x4E00;&#x4E0B;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Constants.js
export const DeviceSize = {
  WIDTH: Dimensions.get(&apos;window&apos;).width,
  HEIGHT: Dimensions.get(&apos;window&apos;).height
};

// Utils.js
export const Utils = {
  interpolate(animatedValue, inputRange, outputRange) {
    if(animatedValue &amp;&amp; animatedValue.interpolate) {
      return animatedValue.interpolate({inputRange, outputRange});
    }
  }
};

// MagicMoving.js
export class MagicMoving extends Component {

  constructor(props) {
    // ...
    this.popupAnimatedValue = new Animated.Value(0);
  }

  _onPressCard = index =&gt; {
    UIManager.measure(findNodeHandle(this._cardRefs[index]), (x, y, width, height, pageX, pageY) =&gt; {
      
      // &#x751F;&#x6210;&#x6D6E;&#x5C42;&#x6837;&#x5F0F;
      this.popupLayerStyle = {
        top: Utils.interpolate(this.popupAnimatedValue, [0, 1], [pageY, 0]),
        left: Utils.interpolate(this.popupAnimatedValue, [0, 1], [pageX, 0]),
        width: Utils.interpolate(this.popupAnimatedValue, [0, 1], [width, DeviceSize.WIDTH]),
        height: Utils.interpolate(this.popupAnimatedValue, [0, 1], [height, DeviceSize.HEIGHT])
      };
      
      // &#x8BBE;&#x7F6E;&#x6D6E;&#x5C42;&#x53EF;&#x89C1;&#xFF0C;&#x7136;&#x540E;&#x5F00;&#x542F;&#x5C55;&#x5F00;&#x6D6E;&#x5C42;&#x52A8;&#x753B;
      this.setState({selectedIndex: index, showPopupLayer: true}, () =&gt; {
        Animated.spring(this.popupAnimatedValue, {toValue: 1, friction: 6}).start();
      });
    });
  };
  
  _renderPopupLayer() {
    const {data} = this.props;
    const {selectedIndex, showPopupLayer} = this.state;
    return (
      &lt;Modal
        transparent={true}
        visible={showPopupLayer}
        onRequestClose={this._onRequestClose}
      &gt;
        {showPopupLayer &amp;&amp; (
          &lt;Animated.View style={[styles.popupLayer, this.popupLayerStyle]}&gt;
            {this._renderPopupLayerContent(data[selectedIndex], selectedIndex)}
          &lt;/Animated.View&gt;
        )}
      &lt;/Modal&gt;
    );
  }
  
  _renderPopupLayerContent(item, index) {
    // TODO: ...
  }
  
  // ...
}

const styles = StyleSheet.create({
  popupLayer: {
    position: &apos;absolute&apos;,
    overflow: &apos;hidden&apos;,
    backgroundColor: &apos;#FFF&apos;
  }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Constants.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> DeviceSize = {
  <span class="hljs-attr">WIDTH</span>: Dimensions.get(<span class="hljs-string">&apos;window&apos;</span>).width,
  <span class="hljs-attr">HEIGHT</span>: Dimensions.get(<span class="hljs-string">&apos;window&apos;</span>).height
};

<span class="hljs-comment">// Utils.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> Utils = {
  interpolate(animatedValue, inputRange, outputRange) {
    <span class="hljs-keyword">if</span>(animatedValue &amp;&amp; animatedValue.interpolate) {
      <span class="hljs-keyword">return</span> animatedValue.interpolate({inputRange, outputRange});
    }
  }
};

<span class="hljs-comment">// MagicMoving.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MagicMoving</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">this</span>.popupAnimatedValue = <span class="hljs-keyword">new</span> Animated.Value(<span class="hljs-number">0</span>);
  }

  _onPressCard = <span class="hljs-function"><span class="hljs-params">index</span> =&gt;</span> {
    UIManager.measure(findNodeHandle(<span class="hljs-keyword">this</span>._cardRefs[index]), (x, y, width, height, pageX, pageY) =&gt; {
      
      <span class="hljs-comment">// &#x751F;&#x6210;&#x6D6E;&#x5C42;&#x6837;&#x5F0F;</span>
      <span class="hljs-keyword">this</span>.popupLayerStyle = {
        <span class="hljs-attr">top</span>: Utils.interpolate(<span class="hljs-keyword">this</span>.popupAnimatedValue, [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [pageY, <span class="hljs-number">0</span>]),
        <span class="hljs-attr">left</span>: Utils.interpolate(<span class="hljs-keyword">this</span>.popupAnimatedValue, [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [pageX, <span class="hljs-number">0</span>]),
        <span class="hljs-attr">width</span>: Utils.interpolate(<span class="hljs-keyword">this</span>.popupAnimatedValue, [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [width, DeviceSize.WIDTH]),
        <span class="hljs-attr">height</span>: Utils.interpolate(<span class="hljs-keyword">this</span>.popupAnimatedValue, [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [height, DeviceSize.HEIGHT])
      };
      
      <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x6D6E;&#x5C42;&#x53EF;&#x89C1;&#xFF0C;&#x7136;&#x540E;&#x5F00;&#x542F;&#x5C55;&#x5F00;&#x6D6E;&#x5C42;&#x52A8;&#x753B;</span>
      <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">selectedIndex</span>: index, <span class="hljs-attr">showPopupLayer</span>: <span class="hljs-literal">true</span>}, () =&gt; {
        Animated.spring(<span class="hljs-keyword">this</span>.popupAnimatedValue, {<span class="hljs-attr">toValue</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">friction</span>: <span class="hljs-number">6</span>}).start();
      });
    });
  };
  
  _renderPopupLayer() {
    <span class="hljs-keyword">const</span> {data} = <span class="hljs-keyword">this</span>.props;
    <span class="hljs-keyword">const</span> {selectedIndex, showPopupLayer} = <span class="hljs-keyword">this</span>.state;
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Modal</span>
        <span class="hljs-attr">transparent</span>=<span class="hljs-string">{true}</span>
        <span class="hljs-attr">visible</span>=<span class="hljs-string">{showPopupLayer}</span>
        <span class="hljs-attr">onRequestClose</span>=<span class="hljs-string">{this._onRequestClose}</span>
      &gt;</span>
        {showPopupLayer &amp;&amp; (
          <span class="hljs-tag">&lt;<span class="hljs-name">Animated.View</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{[styles.popupLayer,</span> <span class="hljs-attr">this.popupLayerStyle</span>]}&gt;</span>
            {this._renderPopupLayerContent(data[selectedIndex], selectedIndex)}
          <span class="hljs-tag">&lt;/<span class="hljs-name">Animated.View</span>&gt;</span>
        )}
      <span class="hljs-tag">&lt;/<span class="hljs-name">Modal</span>&gt;</span>
    );
  }
  
  _renderPopupLayerContent(item, index) {
    // TODO: ...
  }
  
  // ...
}

const styles = StyleSheet.create({
  popupLayer: {
    position: &apos;absolute&apos;,
    overflow: &apos;hidden&apos;,
    backgroundColor: &apos;#FFF&apos;
  }
});</span></code></pre><p>&#x4ED4;&#x7EC6;&#x770B;appStore&#x4E2D;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x53D1;&#x73B0;&#x6D6E;&#x5C42;&#x5728;&#x94FA;&#x6EE1;&#x5168;&#x5C4F;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x6709;&#x4E00;&#x4E2A;&#x6296;&#x4E00;&#x6296;&#x7684;&#x6548;&#x679C;&#x3002;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x5F39;&#x7C27;&#x8FD0;&#x52A8;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x7528;&#x4E86;Animated.spring&#x6765;&#x8FC7;&#x6E21;&#x6548;&#x679C;&#xFF08;&#x8981;&#x4E86;&#x89E3;&#x66F4;&#x591A;&#x7684;&#xFF0C;&#x53EF;&#x4EE5;&#x53BB;&#x5B98;&#x7F51;&#x4E0A;&#x770B;&#x66F4;&#x8BE6;&#x7EC6;&#x7684;&#x4ECB;&#x7ECD;&#x54E6;&#xFF09;&#x3002;</p><h3 id="articleHeader5">3.3 &#x6784;&#x9020;&#x6D6E;&#x5C42;&#x5185;&#x5BB9;</h3><p>&#x7ECF;&#x8FC7;&#x524D;&#x4E24;&#x6B65;&#xFF0C;&#x5176;&#x5B9E;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x521D;&#x6B65;&#x8FBE;&#x5230;&#x795E;&#x5947;&#x79FB;&#x52A8;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x5373;&#x65E0;&#x8BBA;&#x70B9;&#x51FB;&#x54EA;&#x4E2A;&#x5361;&#x7247;&#xFF0C;&#x6D6E;&#x5C42;&#x90FD;&#x4F1A;&#x4ECE;&#x5361;&#x7247;&#x7684;&#x4F4D;&#x7F6E;&#x5C55;&#x5F00;&#x94FA;&#x6EE1;&#x5168;&#x5C4F;&#x3002;&#x53EA;&#x4E0D;&#x8FC7;&#x73B0;&#x5728;&#x7684;&#x6D6E;&#x5C42;&#x8FD8;&#x672A;&#x6DFB;&#x52A0;&#x4EFB;&#x4F55;&#x5185;&#x5BB9;&#xFF0C;&#x6240;&#x4EE5;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x5C31;&#x6765;&#x6784;&#x9020;&#x6D6E;&#x5C42;&#x5185;&#x5BB9;&#x3002;</p><p>&#x5176;&#x4E2D;&#xFF0C;&#x6D6E;&#x5C42;&#x4E2D;&#x6700;&#x91CD;&#x8981;&#x7684;&#x4E00;&#x70B9;&#x5C31;&#x662F;&#x5934;&#x90E8;&#x7684;banner&#x533A;&#x57DF;&#xFF0C;&#x800C;&#x4E14;&#x8FD9;&#x91CC;&#x7684;banner&#x5E94;&#x8BE5;&#x662F;&#x548C;&#x5361;&#x7247;&#x7684;&#x56FE;&#x7247;&#x76F8;&#x5339;&#x914D;&#x7684;&#x3002;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;&#x8FD9;&#x91CC;&#x7684;banner&#x56FE;&#x7247;&#x5176;&#x5B9E;&#x4E5F;&#x6709;&#x4E00;&#x4E2A;&#x52A8;&#x753B;&#x3002;&#x6CA1;&#x9519;&#xFF0C;&#x5B83;&#x968F;&#x7740;&#x6D6E;&#x5C42;&#x7684;&#x5C55;&#x5F00;&#x53D8;&#x5927;&#x4E86;&#x3002;&#x6240;&#x4EE5;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x518D;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;AnimatedValue&#x6765;&#x63A7;&#x5236;banner&#x56FE;&#x7247;&#x52A8;&#x753B;&#x3002;&#x6765;&#x770B;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class MagicMoving extends Component {

  constructor(props) {
    // ...
    this.bannerImageAnimatedValue = new Animated.Value(0);
  }
  
  _updateAnimatedStyles(x, y, width, height, pageX, pageY) {
    this.popupLayerStyle = {
      top: Utils.interpolate(this.popupAnimatedValue, [0, 1], [pageY, 0]),
      left: Utils.interpolate(this.popupAnimatedValue, [0, 1], [pageX, 0]),
      width: Utils.interpolate(this.popupAnimatedValue, [0, 1], [width, DeviceSize.WIDTH]),
      height: Utils.interpolate(this.popupAnimatedValue, [0, 1], [height, DeviceSize.HEIGHT])
    };
    this.bannerImageStyle = {
      width: Utils.interpolate(this.bannerImageAnimatedValue, [0, 1], [width, DeviceSize.WIDTH]),
      height: Utils.interpolate(this.bannerImageAnimatedValue, [0, 1], [height, DeviceSize.WIDTH * height / width])
    };
  }

  _onPressCard = index =&gt; {
    UIManager.measure(findNodeHandle(this._cardRefs[index]), (x, y, width, height, pageX, pageY) =&gt; {
      this._updateAnimatedStyles(x, y, width, height, pageX, pageY);
      this.setState({
        selectedIndex: index,
        showPopupLayer: true
      }, () =&gt; {
        Animated.parallel([
          Animated.timing(this.closeAnimatedValue, {toValue: 1}),
          Animated.spring(this.bannerImageAnimatedValue, {toValue: 1, friction: 6})
        ]).start();
      });
    });
  };

  _renderPopupLayerContent(item, index) {
    const {renderPopupLayerBanner, renderPopupLayerContent} = this.props;
    return (
      &lt;ScrollView bounces={false}&gt;
        {renderPopupLayerBanner ? renderPopupLayerBanner(item, index, this.bannerImageStyle) : (
          &lt;Animated.Image source={item.image} style={this.bannerImageStyle}/&gt;
        )}
        {renderPopupLayerContent(item, index)}
        {this._renderClose()}
      &lt;/ScrollView&gt;
    );
  }
  
  _renderClose() {
    // TODO: ...
  }
  
  // ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MagicMoving</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">this</span>.bannerImageAnimatedValue = <span class="hljs-keyword">new</span> Animated.Value(<span class="hljs-number">0</span>);
  }
  
  _updateAnimatedStyles(x, y, width, height, pageX, pageY) {
    <span class="hljs-keyword">this</span>.popupLayerStyle = {
      <span class="hljs-attr">top</span>: Utils.interpolate(<span class="hljs-keyword">this</span>.popupAnimatedValue, [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [pageY, <span class="hljs-number">0</span>]),
      <span class="hljs-attr">left</span>: Utils.interpolate(<span class="hljs-keyword">this</span>.popupAnimatedValue, [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [pageX, <span class="hljs-number">0</span>]),
      <span class="hljs-attr">width</span>: Utils.interpolate(<span class="hljs-keyword">this</span>.popupAnimatedValue, [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [width, DeviceSize.WIDTH]),
      <span class="hljs-attr">height</span>: Utils.interpolate(<span class="hljs-keyword">this</span>.popupAnimatedValue, [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [height, DeviceSize.HEIGHT])
    };
    <span class="hljs-keyword">this</span>.bannerImageStyle = {
      <span class="hljs-attr">width</span>: Utils.interpolate(<span class="hljs-keyword">this</span>.bannerImageAnimatedValue, [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [width, DeviceSize.WIDTH]),
      <span class="hljs-attr">height</span>: Utils.interpolate(<span class="hljs-keyword">this</span>.bannerImageAnimatedValue, [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [height, DeviceSize.WIDTH * height / width])
    };
  }

  _onPressCard = <span class="hljs-function"><span class="hljs-params">index</span> =&gt;</span> {
    UIManager.measure(findNodeHandle(<span class="hljs-keyword">this</span>._cardRefs[index]), (x, y, width, height, pageX, pageY) =&gt; {
      <span class="hljs-keyword">this</span>._updateAnimatedStyles(x, y, width, height, pageX, pageY);
      <span class="hljs-keyword">this</span>.setState({
        <span class="hljs-attr">selectedIndex</span>: index,
        <span class="hljs-attr">showPopupLayer</span>: <span class="hljs-literal">true</span>
      }, () =&gt; {
        Animated.parallel([
          Animated.timing(<span class="hljs-keyword">this</span>.closeAnimatedValue, {<span class="hljs-attr">toValue</span>: <span class="hljs-number">1</span>}),
          Animated.spring(<span class="hljs-keyword">this</span>.bannerImageAnimatedValue, {<span class="hljs-attr">toValue</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">friction</span>: <span class="hljs-number">6</span>})
        ]).start();
      });
    });
  };

  _renderPopupLayerContent(item, index) {
    <span class="hljs-keyword">const</span> {renderPopupLayerBanner, renderPopupLayerContent} = <span class="hljs-keyword">this</span>.props;
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ScrollView</span> <span class="hljs-attr">bounces</span>=<span class="hljs-string">{false}</span>&gt;</span>
        {renderPopupLayerBanner ? renderPopupLayerBanner(item, index, this.bannerImageStyle) : (
          <span class="hljs-tag">&lt;<span class="hljs-name">Animated.Image</span> <span class="hljs-attr">source</span>=<span class="hljs-string">{item.image}</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{this.bannerImageStyle}/</span>&gt;</span>
        )}
        {renderPopupLayerContent(item, index)}
        {this._renderClose()}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ScrollView</span>&gt;</span>
    );
  }
  
  _renderClose() {
    // TODO: ...
  }
  
  // ...
}</span></code></pre><p>&#x4ECE;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x6211;&#x4EEC;&#x4E3B;&#x8981;&#x6709;&#x4E24;&#x4E2A;&#x53D8;&#x5316;&#x3002;</p><ol><li>&#x4E3A;&#x4E86;&#x4FDD;&#x8BC1;popupLayer&#x548C;bannerImage&#x4FDD;&#x6301;&#x540C;&#x6B65;&#x7684;&#x5C55;&#x5F00;&#x52A8;&#x753B;&#xFF0C;&#x6211;&#x4EEC;&#x7528;&#x4E0A;&#x4E86;Animated.parallel&#x65B9;&#x6CD5;&#x3002;</li><li>&#x5728;&#x6E32;&#x67D3;&#x6D6E;&#x5C42;&#x5185;&#x5BB9;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x6211;&#x4EEC;&#x66B4;&#x9732;&#x51FA;&#x4E86;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#xFF1A;renderPopupLayerBanner&#x548C;renderPopupLayerContent&#x3002;&#x800C;&#x8FD9;&#x4E9B;&#x90FD;&#x662F;&#x4E3A;&#x4E86;&#x53EF;&#x4EE5;&#x8BA9;&#x8C03;&#x7528;&#x65B9;&#x53EF;&#x4EE5;&#x66F4;&#x5927;&#x9650;&#x5EA6;&#x5730;&#x81EA;&#x5B9A;&#x4E49;&#x81EA;&#x5DF1;&#x60F3;&#x8981;&#x7684;&#x6837;&#x5F0F;&#x548C;&#x5185;&#x5BB9;&#x3002;</li></ol><p>&#x6DFB;&#x52A0;&#x5B8C;&#x4E86;bannerImage&#x4E4B;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x522B;&#x5FD8;&#x4E86;&#x7ED9;&#x6D6E;&#x5C42;&#x518D;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x5173;&#x95ED;&#x6309;&#x94AE;&#x3002;&#x4E3A;&#x4E86;&#x66F4;&#x597D;&#x7684;&#x8FC7;&#x6E21;&#x6548;&#x679C;&#xFF0C;&#x6211;&#x4EEC;&#x751A;&#x81F3;&#x53EF;&#x4EE5;&#x7ED9;&#x5173;&#x95ED;&#x6309;&#x94AE;&#x52A0;&#x4E00;&#x4E2A;&#x6DE1;&#x5165;&#x6DE1;&#x51FA;&#x7684;&#x6548;&#x679C;&#x3002;&#x6240;&#x4EE5;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x5F97;&#x518D;&#x52A0;&#x4E00;&#x4E2A;AnimatedValue&#x3002;&#x3002;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class MagicMoving extends Component {

  constructor(props) {
    // ...
    this.closeAnimatedValue = new Animated.Value(0);
  }
  
  _updateAnimatedStyles(x, y, width, height, pageX, pageY) {
    // ...
    this.closeStyle = {
      justifyContent: &apos;center&apos;,
      alignItems: &apos;center&apos;,
      position: &apos;absolute&apos;, top: 30, right: 20,
      opacity: Utils.interpolate(this.closeAnimatedValue, [0, 1], [0, 1])
    };
  }
  
  _onPressCard = index =&gt; {
    UIManager.measure(findNodeHandle(this._cardRefs[index]), (x, y, width, height, pageX, pageY) =&gt; {
      this._updateAnimatedStyles(x, y, width, height, pageX, pageY);
      this.setState({
        selectedIndex: index,
        showPopupLayer: true
      }, () =&gt; {
        Animated.parallel([
          Animated.timing(this.closeAnimatedValue, {toValue: 1, duration: openDuration}),
          Animated.spring(this.popupAnimatedValue, {toValue: 1, friction: 6, duration: openDuration}),
          Animated.spring(this.bannerImageAnimatedValue, {toValue: 1, friction: 6, duration: openDuration})
        ]).start();
      });
    });
  };
  
  _onPressClose = () =&gt; {
    // TODO: ...
  }
  
  _renderClose = () =&gt; {
    return (
      &lt;Animated.View style={this.closeStyle}&gt;
        &lt;TouchableOpacity style={styles.closeContainer} onPress={this._onPressClose}&gt;
          &lt;View style={[styles.forkLine, {top: +.5, transform: [{rotateZ: &apos;45deg&apos;}]}]}/&gt;
          &lt;View style={[styles.forkLine, {top: -.5, transform: [{rotateZ: &apos;-45deg&apos;}]}]}/&gt;
        &lt;/TouchableOpacity&gt;
      &lt;/Animated.View&gt;
    );
  };
  
  // ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MagicMoving</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">this</span>.closeAnimatedValue = <span class="hljs-keyword">new</span> Animated.Value(<span class="hljs-number">0</span>);
  }
  
  _updateAnimatedStyles(x, y, width, height, pageX, pageY) {
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">this</span>.closeStyle = {
      <span class="hljs-attr">justifyContent</span>: <span class="hljs-string">&apos;center&apos;</span>,
      <span class="hljs-attr">alignItems</span>: <span class="hljs-string">&apos;center&apos;</span>,
      <span class="hljs-attr">position</span>: <span class="hljs-string">&apos;absolute&apos;</span>, <span class="hljs-attr">top</span>: <span class="hljs-number">30</span>, <span class="hljs-attr">right</span>: <span class="hljs-number">20</span>,
      <span class="hljs-attr">opacity</span>: Utils.interpolate(<span class="hljs-keyword">this</span>.closeAnimatedValue, [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>])
    };
  }
  
  _onPressCard = <span class="hljs-function"><span class="hljs-params">index</span> =&gt;</span> {
    UIManager.measure(findNodeHandle(<span class="hljs-keyword">this</span>._cardRefs[index]), (x, y, width, height, pageX, pageY) =&gt; {
      <span class="hljs-keyword">this</span>._updateAnimatedStyles(x, y, width, height, pageX, pageY);
      <span class="hljs-keyword">this</span>.setState({
        <span class="hljs-attr">selectedIndex</span>: index,
        <span class="hljs-attr">showPopupLayer</span>: <span class="hljs-literal">true</span>
      }, () =&gt; {
        Animated.parallel([
          Animated.timing(<span class="hljs-keyword">this</span>.closeAnimatedValue, {<span class="hljs-attr">toValue</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">duration</span>: openDuration}),
          Animated.spring(<span class="hljs-keyword">this</span>.popupAnimatedValue, {<span class="hljs-attr">toValue</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">friction</span>: <span class="hljs-number">6</span>, <span class="hljs-attr">duration</span>: openDuration}),
          Animated.spring(<span class="hljs-keyword">this</span>.bannerImageAnimatedValue, {<span class="hljs-attr">toValue</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">friction</span>: <span class="hljs-number">6</span>, <span class="hljs-attr">duration</span>: openDuration})
        ]).start();
      });
    });
  };
  
  _onPressClose = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-comment">// <span class="hljs-doctag">TODO:</span> ...</span>
  }
  
  _renderClose = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> (
      &lt;Animated.View style={this.closeStyle}&gt;
        &lt;TouchableOpacity style={styles.closeContainer} onPress={this._onPressClose}&gt;
          &lt;View style={[styles.forkLine, {top: +.5, transform: [{rotateZ: &apos;45deg&apos;}]}]}/&gt;
          &lt;View style={[styles.forkLine, {top: -.5, transform: [{rotateZ: &apos;-45deg&apos;}]}]}/&gt;
        &lt;/TouchableOpacity&gt;
      &lt;/Animated.View&gt;
    );
  };
  
  // ...
}</code></pre><h3 id="articleHeader6">3.4 &#x6DFB;&#x52A0;&#x6D6E;&#x5C42;&#x5173;&#x95ED;&#x52A8;&#x753B;</h3><p>&#x6D6E;&#x5C42;&#x5173;&#x95ED;&#x7684;&#x52A8;&#x753B;&#x5176;&#x5B9E;&#x80A5;&#x80A0;&#x7B80;&#x5355;&#xFF0C;&#x53EA;&#x8981;&#x628A;&#x76F8;&#x5E94;&#x7684;AnimatedValue&#x5168;&#x90FD;&#x53D8;&#x4E3A;0&#x5373;&#x53EF;&#x3002;&#x4E3A;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x5728;&#x6253;&#x5F00;&#x6D6E;&#x5C42;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x751F;&#x6210;&#x7684;&#x6620;&#x5C04;&#x6837;&#x5F0F;&#x5C31;&#x662F;&#x5B9A;&#x4E49;&#x4E86;&#x6D6E;&#x5C42;&#x6536;&#x8D77;&#x65F6;&#x5019;&#x7684;&#x6837;&#x5F0F;&#xFF0C;&#x800C;&#x5173;&#x95ED;&#x6D6E;&#x5C42;&#x4E4B;&#x524D;&#x662F;&#x4E0D;&#x53EF;&#x80FD;&#x6253;&#x7834;&#x8FD9;&#x4E2A;&#x6620;&#x5C04;&#x5173;&#x7CFB;&#x7684;&#x3002;&#x56E0;&#x6B64;&#xFF0C;&#x4EE3;&#x7801;&#x5F88;&#x7B80;&#x5355;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_onPressClose = () =&gt; {
  Animated.parallel([
    Animated.timing(this.closeAnimatedValue, {toValue: 0}),
    Animated.timing(this.popupAnimatedValue, {toValue: 0}),
    Animated.timing(this.bannerImageAnimatedValue, {toValue: 0})
  ]).start(() =&gt; {
    this.setState({showPopupLayer: false});
  });
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">_onPressClose = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  Animated.parallel([
    Animated.timing(<span class="hljs-keyword">this</span>.closeAnimatedValue, {<span class="hljs-attr">toValue</span>: <span class="hljs-number">0</span>}),
    Animated.timing(<span class="hljs-keyword">this</span>.popupAnimatedValue, {<span class="hljs-attr">toValue</span>: <span class="hljs-number">0</span>}),
    Animated.timing(<span class="hljs-keyword">this</span>.bannerImageAnimatedValue, {<span class="hljs-attr">toValue</span>: <span class="hljs-number">0</span>})
  ]).start(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">showPopupLayer</span>: <span class="hljs-literal">false</span>});
  });
};</code></pre><h3 id="articleHeader7">3.5 &#x5C0F;&#x7ED3;</h3><p>&#x5176;&#x5B9E;&#x5230;&#x8FD9;&#x513F;&#xFF0C;&#x5305;&#x62EC;&#x5C55;&#x5F00;/&#x6536;&#x8D77;&#x52A8;&#x753B;&#x7684;&#x795E;&#x5947;&#x79FB;&#x52A8;&#x6548;&#x679C;&#x57FA;&#x672C;&#x4E0A;&#x5DF2;&#x7ECF;&#x5B9E;&#x73B0;&#x4E86;&#x3002;&#x5173;&#x952E;&#x70B9;&#x5C31;&#x5728;&#x4E8E;&#x5229;&#x7528;UIManager.measure&#x83B7;&#x53D6;&#x5230;&#x70B9;&#x51FB;&#x5361;&#x7247;&#x5728;&#x5C4F;&#x5E55;&#x4E2D;&#x7684;&#x5750;&#x6807;&#x4F4D;&#x7F6E;&#xFF0C;&#x518D;&#x914D;&#x4E0A;Animated&#x6765;&#x63A7;&#x5236;&#x52A8;&#x753B;&#x5373;&#x53EF;&#x3002;</p><p>&#x4E0D;&#x8FC7;&#xFF0C;&#x8FD8;&#x662F;&#x6709;&#x5F88;&#x591A;&#x53EF;&#x4EE5;&#x8FDB;&#x4E00;&#x6B65;&#x5B8C;&#x5584;&#x7684;&#x5C0F;&#x70B9;&#x3002;&#x6BD4;&#x5982;&#xFF1A;</p><ol><li>&#x7531;&#x8C03;&#x7528;&#x65B9;&#x63A7;&#x5236;&#x5C55;&#x5F00;/&#x6536;&#x8D77;&#x6D6E;&#x5C42;&#x52A8;&#x753B;&#x7684;&#x8FD0;&#x884C;&#x65F6;&#x957F;&#xFF1B;</li><li>&#x66B4;&#x9732;&#x5C55;&#x5F00;/&#x6536;&#x8D77;&#x6D6E;&#x5C42;&#x7684;&#x4E8B;&#x4EF6;&#xFF1A;onPopupLayerWillShow&#xFF0C;onPopupLayerDidShow&#xFF0C;onPopupLayerDidHide</li><li>&#x652F;&#x6301;&#x6D6E;&#x5C42;&#x5185;&#x5BB9;&#x5F02;&#x6B65;&#x52A0;&#x8F7D;</li><li>...</li></ol><p>&#x8FD9;&#x4E9B;&#x5C0F;&#x70B9;&#x9650;&#x4E8E;&#x6587;&#x7AE0;&#x7BC7;&#x5E45;&#x5C31;&#x4E0D;&#x518D;&#x5C55;&#x5F00;&#x8BE6;&#x8FF0;&#xFF0C;&#x53EF;&#x4EE5;&#x67E5;&#x770B;&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x3002;</p><h2 id="articleHeader8">4. &#x5B9E;&#x6218;</h2><p>&#x662F;&#x9AA1;&#x5B50;&#x662F;&#x9A6C;&#xFF0C;&#x905B;&#x905B;&#x5C31;&#x77E5;&#x9053;&#x3002;&#x968F;&#x4FBF;&#x6293;&#x4E86;10&#x7BC7;&#x7B80;&#x4E66;&#x4E0A;&#x7684;&#x6587;&#x7AE0;&#x4F5C;&#x4E3A;&#x5185;&#x5BB9;&#xFF0C;&#x5229;&#x7528;MagicMoving&#x7B80;&#x5355;&#x5730;&#x505A;&#x4E86;&#x4E00;&#x4E0B;&#x8FD9;&#x4E2A;demo&#x3002;&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x770B;&#x6548;&#x679C;&#x600E;&#x4E48;&#x6837;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015246236?w=377&amp;h=669" src="https://static.alili.tech/img/remote/1460000015246236?w=377&amp;h=669" alt="&#x6D6E;&#x5C42;&#x6570;&#x636E;&#x5185;&#x5BB9;&#x5DF2;ready" title="&#x6D6E;&#x5C42;&#x6570;&#x636E;&#x5185;&#x5BB9;&#x5DF2;ready" style="cursor:pointer"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000015246237?w=377&amp;h=669" src="https://static.alili.tech/img/remote/1460000015246237?w=377&amp;h=669" alt="&#x6D6E;&#x5C42;&#x6570;&#x636E;&#x5185;&#x5BB9;&#x5F02;&#x6B65;&#x52A0;&#x8F7D;" title="&#x6D6E;&#x5C42;&#x6570;&#x636E;&#x5185;&#x5BB9;&#x5F02;&#x6B65;&#x52A0;&#x8F7D;" style="cursor:pointer"></span></p><h2 id="articleHeader9">5. &#x5199;&#x5728;&#x6700;&#x540E;</h2><p>&#x505A;&#x5B8C;&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x4E4B;&#x540E;&#x6700;&#x5927;&#x7684;&#x611F;&#x609F;&#x5C31;&#x662F;&#xFF0C;&#x6709;&#x4E9B;&#x770B;&#x4E0A;&#x53BB;&#x53EF;&#x80FD;&#x6BD4;&#x8F83;&#x65B0;&#x9896;&#x7684;&#x4EA4;&#x4E92;&#x52A8;&#x753B;&#x5176;&#x5B9E;&#x505A;&#x8D77;&#x6765;&#x53EF;&#x80FD;&#x80A5;&#x80A0;&#x7B80;&#x5355;&#x3002;&#x3002;&#x3002;&#x8D35;&#x5728;&#x591A;&#x52A8;&#x624B;&#xFF0C;&#x591A;&#x719F;&#x6089;&#x3002;&#x5C31;&#x6BD4;&#x5982;&#x8FD9;&#x6B21;&#xFF0C;&#x4E5F;&#x662F;&#x66F4;&#x52A0;&#x719F;&#x6089;&#x4E86;Animated&#x548C;UIManager.measure&#x7684;&#x7528;&#x6CD5;&#x3002;&#x603B;&#x4E4B;&#xFF0C;&#x8FD8;&#x662F;&#x5C0F;&#x6709;&#x6210;&#x5C31;&#x611F;&#x7684;&#xFF0C;hia hia hia~</p><p>&#x8001;&#x89C4;&#x77E9;&#xFF0C;&#x672C;&#x6587;&#x4EE3;&#x7801;&#x5730;&#x5740;&#xFF1A;</p><p><a href="https://github.com/SmallStoneSK/react-native-magic-moving" rel="nofollow noreferrer" target="_blank">https://github.com/SmallStoneSK/react-native-magic-moving</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
RN自定义组件封装 - 神奇移动

## 原文链接
[https://segmentfault.com/a/1190000015246232](https://segmentfault.com/a/1190000015246232)

