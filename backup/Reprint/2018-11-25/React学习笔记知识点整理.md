---
title: 'React学习笔记知识点整理' 
date: 2018-11-25 2:30:08
hidden: true
slug: bfx65io8kzq
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">1. &#x51E0;&#x4E2A;&#x91CD;&#x8981;&#x6982;&#x5FF5;&#x7406;&#x89E3;</h2><ul><li><p>&#x6A21;&#x5757;&#x4E0E;&#x7EC4;&#x4EF6;</p><ul><li><p>&#x6A21;&#x5757;:</p><ul><li>&#x7406;&#x89E3;: &#x5411;&#x5916;&#x63D0;&#x4F9B;&#x7279;&#x5B9A;(&#x5C40;&#x90E8;)&#x529F;&#x80FD;&#x7684;js&#x7A0B;&#x5E8F;, &#x4E00;&#x822C;&#x5C31;&#x662F;&#x4E00;&#x4E2A;js&#x6587;&#x4EF6;</li><li>&#x4E3A;&#x4EC0;&#x4E48;: js&#x4EE3;&#x7801;&#x66F4;&#x591A;&#x66F4;&#x590D;&#x6742;</li><li>&#x4F5C;&#x7528;: &#x590D;&#x7528;js, &#x7B80;&#x5316;js&#x7684;&#x7F16;&#x5199;, &#x63D0;&#x9AD8;js&#x8FD0;&#x884C;&#x6548;&#x7387;</li></ul></li><li><p>&#x7EC4;&#x4EF6;:</p><ul><li>&#x7406;&#x89E3;: &#x7528;&#x6765;&#x5B9E;&#x73B0;&#x7279;&#x5B9A;&#x529F;&#x80FD;&#x6548;&#x679C;&#x7684;&#x4EE3;&#x7801;&#x96C6;&#x5408;(html/css/js)</li><li>&#x4E3A;&#x4EC0;&#x4E48;: &#x4E00;&#x4E2A;&#x754C;&#x9762;&#x7684;&#x529F;&#x80FD;&#x66F4;&#x590D;&#x6742;</li><li>&#x4F5C;&#x7528;: &#x590D;&#x7528;&#x7F16;&#x7801;, &#x7B80;&#x5316;&#x9879;&#x76EE;&#x7F16;&#x7801;, &#x63D0;&#x9AD8;&#x8FD0;&#x884C;&#x6548;&#x7387;</li></ul></li></ul></li><li><p>&#x6A21;&#x5757;&#x5316;&#x4E0E;&#x7EC4;&#x4EF6;&#x5316;</p><ul><li><p>&#x6A21;&#x5757;&#x5316;:</p><ul><li>&#x5F53;&#x5E94;&#x7528;&#x7684;js&#x90FD;&#x4EE5;&#x6A21;&#x5757;&#x6765;&#x7F16;&#x5199;&#x7684;, &#x8FD9;&#x4E2A;&#x5E94;&#x7528;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x6A21;&#x5757;&#x5316;&#x7684;&#x5E94;&#x7528;</li></ul></li><li><p>&#x7EC4;&#x4EF6;&#x5316;:</p><ul><li>&#x5F53;&#x5E94;&#x7528;&#x662F;&#x4EE5;&#x591A;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x529F;&#x80FD;, &#x8FD9;&#x4E0A;&#x5E94;&#x7528;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x5316;&#x7684;&#x5E94;&#x7528;</li></ul></li></ul></li></ul><h2 id="articleHeader1">2. React&#x7684;&#x57FA;&#x672C;&#x8BA4;&#x8BC6;</h2><ul><li>Facebook&#x5F00;&#x6E90;&#x7684;&#x4E00;&#x4E2A;js&#x5E93;</li><li>&#x4E00;&#x4E2A;&#x7528;&#x6765;&#x52A8;&#x6001;&#x6784;&#x5EFA;&#x7528;&#x6237;&#x754C;&#x9762;&#x7684;js&#x5E93;</li><li><p>React&#x7684;&#x7279;&#x70B9;</p><ul><li>Declarative(&#x58F0;&#x660E;&#x5F0F;&#x7F16;&#x7801;)</li><li>Component-Based(&#x7EC4;&#x4EF6;&#x5316;&#x7F16;&#x7801;)</li><li>Learn Once, Write Anywhere(&#x652F;&#x6301;&#x5BA2;&#x6237;&#x7AEF;&#x4E0E;&#x670D;&#x52A1;&#x5668;&#x6E32;&#x67D3;)</li><li>&#x9AD8;&#x6548;</li><li>&#x5355;&#x5411;&#x6570;&#x636E;&#x6D41;</li></ul></li><li><p>React&#x9AD8;&#x6548;&#x7684;&#x539F;&#x56E0;</p><ul><li>&#x865A;&#x62DF;(virtual)DOM, &#x4E0D;&#x603B;&#x662F;&#x76F4;&#x63A5;&#x64CD;&#x4F5C;DOM(&#x6279;&#x91CF;&#x66F4;&#x65B0;, &#x51CF;&#x5C11;&#x66F4;&#x65B0;&#x7684;&#x6B21;&#x6570;)</li><li>&#x9AD8;&#x6548;&#x7684;DOM Diff&#x7B97;&#x6CD5;, &#x6700;&#x5C0F;&#x5316;&#x9875;&#x9762;&#x91CD;&#x7ED8;(&#x51CF;&#x5C0F;&#x9875;&#x9762;&#x66F4;&#x65B0;&#x7684;&#x533A;&#x57DF;)</li></ul></li></ul><h2 id="articleHeader2">3. &#x4F7F;&#x7528;React</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="* &#x5BFC;&#x5165;&#x76F8;&#x5173;js&#x5E93;&#x6587;&#x4EF6;(react.js, react-dom.js, babel.min.js)
* &#x7F16;&#x7801;:
    ```
  &lt;div id=&quot;container&quot;&gt;&lt;/div&gt;
  &lt;script type=&quot;text/babel&quot;&gt;
    var aa = 123
    ReactDOM.render(&lt;h1&gt;{aa}&lt;/h1&gt;, containerDOM);
  &lt;/script&gt;
    ```" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>* &#x5BFC;&#x5165;&#x76F8;&#x5173;js&#x5E93;&#x6587;&#x4EF6;(react.js, react-dom.js, babel.min.js)
* &#x7F16;&#x7801;:
    ```
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/babel&quot;</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> aa = <span class="hljs-number">123</span>
    ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{aa}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>, containerDOM);
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    ```</code></pre><h2 id="articleHeader3">4. JSX</h2><ul><li>&#x5168;&#x79F0;: JavaScript XML</li><li><p>react&#x5B9A;&#x4E49;&#x7684;&#x4E00;&#x79CD;&#x7C7B;&#x4F3C;&#x4E8E;XML&#x7684;JS&#x6269;&#x5C55;&#x8BED;&#x6CD5;: XML+JS</p><ul><li><p>&#x4F5C;&#x7528;: &#x7528;&#x6765;&#x521B;&#x5EFA;react&#x865A;&#x62DF;DOM(&#x5143;&#x7D20;)&#x5BF9;&#x8C61;</p><ul><li>js&#x4E2D;&#x76F4;&#x63A5;&#x53EF;&#x4EE5;&#x5957;&#x6807;&#x7B7E;, &#x4F46;&#x6807;&#x7B7E;&#x8981;&#x5957;js&#x9700;&#x8981;&#x653E;&#x5728;{}&#x4E2D;</li><li>&#x5728;&#x89E3;&#x6790;&#x663E;&#x793A;js&#x6570;&#x7EC4;&#x65F6;, &#x4F1A;&#x81EA;&#x52A8;&#x904D;&#x5386;&#x663E;&#x793A;</li><li><p>&#x628A;&#x6570;&#x636E;&#x7684;&#x6570;&#x7EC4;&#x8F6C;&#x6362;&#x4E3A;&#x6807;&#x7B7E;&#x7684;&#x6570;&#x7EC4;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var liArr = dataArr.map(function(item, index){
return &lt;li key={index}&gt;{item}&lt;/li&gt;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> liArr = dataArr.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item, index</span>)</span>{
<span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span>&gt;</span>{item}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
})</code></pre></li></ul></li></ul></li><li><p>&#x6CE8;&#x610F;:</p><ul><li>&#x6807;&#x7B7E;&#x5FC5;&#x987B;&#x6709;&#x7ED3;&#x675F;</li><li>&#x6807;&#x7B7E;&#x7684;class&#x5C5E;&#x6027;&#x5FC5;&#x987B;&#x6539;&#x4E3A;className&#x5C5E;&#x6027;</li><li>&#x6807;&#x7B7E;&#x7684;style&#x5C5E;&#x6027;&#x503C;&#x5FC5;&#x987B;&#x4E3A;: "{{"color:&apos;red&apos;, width:12"}}"</li></ul></li></ul><h2 id="articleHeader4">5. Component : React&#x662F;&#x9762;&#x5411;&#x7EC4;&#x4EF6;&#x7F16;&#x7A0B;&#x7684;(&#x7EC4;&#x4EF6;&#x5316;&#x7F16;&#x7801;&#x5F00;&#x53D1;)</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="* &#x57FA;&#x672C;&#x7406;&#x89E3;&#x548C;&#x4F7F;&#x7528;
    * &#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x6807;&#x7B7E;: &#x7EC4;&#x4EF6;&#x7C7B;(&#x51FD;&#x6570;)/&#x6807;&#x7B7E;
    * &#x521B;&#x5EFA;&#x7EC4;&#x4EF6;&#x7C7B;
      ```
      //&#x65B9;&#x5F0F;1: &#x65E0;&#x72B6;&#x6001;&#x51FD;&#x6570;(&#x6700;&#x7B80;&#x6D01;, &#x63A8;&#x8350;&#x4F7F;&#x7528;)
      function MyComponent1() {
        return &lt;h1&gt;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x6807;&#x9898;11111&lt;/h1&gt;;
      }
      //&#x65B9;&#x5F0F;2: ES6&#x7C7B;&#x8BED;&#x6CD5;(&#x590D;&#x6742;&#x7EC4;&#x4EF6;, &#x63A8;&#x8350;&#x4F7F;&#x7528;)
      class MyComponent3 extends React.Component {
        render () {
          return &lt;h1&gt;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x6807;&#x9898;33333&lt;/h1&gt;;
        }
      }
      //&#x65B9;&#x5F0F;3: ES5&#x8001;&#x8BED;&#x6CD5;(&#x4E0D;&#x63A8;&#x8350;&#x4F7F;&#x7528;&#x4E86;)
      var MyComponent2 = React.createClass({
        render () {
          return &lt;h1&gt;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x6807;&#x9898;22222&lt;/h1&gt;;
        }
      });
      ```
    * &#x6E32;&#x67D3;&#x7EC4;&#x4EF6;&#x6807;&#x7B7E;
        ```
        ReactDOM.render(&lt;MyComp /&gt;,  cotainerEle);
        ```
* ReactDOM.render()&#x6E32;&#x67D3;&#x7EC4;&#x4EF6;&#x6807;&#x7B7E;&#x7684;&#x57FA;&#x672C;&#x6D41;&#x7A0B;
  * React&#x5185;&#x90E8;&#x4F1A;&#x521B;&#x5EFA;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;/&#x8C03;&#x7528;&#x7EC4;&#x4EF6;&#x51FD;&#x6570;, &#x5F97;&#x5230;&#x865A;&#x62DF;DOM&#x5BF9;&#x8C61;
  * &#x5C06;&#x865A;&#x62DF;DOM&#x5E76;&#x89E3;&#x6790;&#x4E3A;&#x771F;&#x5B9E;DOM
  * &#x63D2;&#x5165;&#x5230;&#x6307;&#x5B9A;&#x7684;&#x9875;&#x9762;&#x5143;&#x7D20;&#x5185;&#x90E8;
* props
    * &#x6240;&#x6709;&#x7EC4;&#x4EF6;&#x6807;&#x7B7E;&#x7684;&#x5C5E;&#x6027;&#x7684;&#x96C6;&#x5408;&#x5BF9;&#x8C61;
    * &#x7ED9;&#x6807;&#x7B7E;&#x6307;&#x5B9A;&#x5C5E;&#x6027;, &#x4FDD;&#x5B58;&#x5916;&#x90E8;&#x6570;&#x636E;(&#x53EF;&#x80FD;&#x662F;&#x4E00;&#x4E2A;function)
    * &#x5728;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x8BFB;&#x53D6;&#x5C5E;&#x6027;: this.props.propertyName
    * &#x4F5C;&#x7528;: &#x4ECE;&#x76EE;&#x6807;&#x7EC4;&#x4EF6;&#x5916;&#x90E8;&#x5411;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x4F20;&#x9012;&#x6570;&#x636E;
    * &#x5BF9;props&#x4E2D;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x8FDB;&#x884C;&#x7C7B;&#x578B;&#x9650;&#x5236;&#x548C;&#x5FC5;&#x8981;&#x6027;&#x9650;&#x5236;
     ```
     Person.propTypes = {
       name: React.PropTypes.string.isRequired,
       age: React.PropTypes.number.isRequired
     }
     ```
* &#x6269;&#x5C55;&#x5C5E;&#x6027;: &#x5C06;&#x5BF9;&#x8C61;&#x7684;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x901A;&#x8FC7;props&#x4F20;&#x9012;
    ```
    &lt;Person {...person}/&gt;
    ```
* &#x7EC4;&#x4EF6;&#x7684;&#x7EC4;&#x5408;
    * &#x7EC4;&#x4EF6;&#x6807;&#x7B7E;&#x4E2D;&#x5305;&#x542B;&#x5B50;&#x7EC4;&#x4EF6;&#x6807;&#x7B7E;
    * &#x62C6;&#x5206;&#x7EC4;&#x4EF6;: &#x62C6;&#x5206;&#x754C;&#x9762;, &#x62BD;&#x53D6;&#x7EC4;&#x4EF6;
    * &#x901A;&#x8FC7;props&#x4F20;&#x9012;&#x6570;&#x636E;
* refs
    * &#x7EC4;&#x4EF6;&#x5185;&#x5305;&#x542B;ref&#x5C5E;&#x6027;&#x7684;&#x6807;&#x7B7E;&#x5143;&#x7D20;&#x7684;&#x96C6;&#x5408;&#x5BF9;&#x8C61;
    * &#x7ED9;&#x64CD;&#x4F5C;&#x76EE;&#x6807;&#x6807;&#x7B7E;&#x6307;&#x5B9A;ref&#x5C5E;&#x6027;, &#x6253;&#x4E00;&#x4E2A;&#x6807;&#x8BC6;
    * &#x5728;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x83B7;&#x5F97;&#x6807;&#x7B7E;&#x5BF9;&#x8C61;: this.refs.refName(&#x53EA;&#x662F;&#x5F97;&#x5230;&#x4E86;&#x6807;&#x7B7E;&#x5143;&#x7D20;&#x5BF9;&#x8C61;)
    * &#x4F5C;&#x7528;: &#x64CD;&#x4F5C;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x7684;&#x771F;&#x5B9E;&#x6807;&#x7B7E;dom&#x5143;&#x7D20;&#x5BF9;&#x8C61;
* &#x4E8B;&#x4EF6;&#x5904;&#x7406;
    * &#x7ED9;&#x6807;&#x7B7E;&#x6DFB;&#x52A0;&#x5C5E;&#x6027;: onXxx={this.eventHandler}
    * &#x5728;&#x7EC4;&#x4EF6;&#x4E2D;&#x6DFB;&#x52A0;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x65B9;&#x6CD5;
      ```
        eventHandler(event) {
                    
        }
      ```
    * &#x4F7F;&#x81EA;&#x5B9A;&#x4E49;&#x65B9;&#x6CD5;&#x4E2D;&#x7684;this&#x4E3A;&#x7EC4;&#x4EF6;&#x5BF9;&#x8C61;
      * &#x5728;constructor()&#x4E2D;bind(this)
      * &#x4F7F;&#x7528;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x5B9A;&#x4E49;&#x65B9;&#x6CD5;(ES6&#x6A21;&#x5757;&#x5316;&#x7F16;&#x7801;&#x65F6;&#x624D;&#x80FD;&#x4F7F;&#x7528;)
* state
    * &#x7EC4;&#x4EF6;&#x88AB;&#x79F0;&#x4E3A;&quot;&#x72B6;&#x6001;&#x673A;&quot;, &#x9875;&#x9762;&#x7684;&#x663E;&#x793A;&#x662F;&#x6839;&#x636E;&#x7EC4;&#x4EF6;&#x7684;state&#x5C5E;&#x6027;&#x7684;&#x6570;&#x636E;&#x6765;&#x663E;&#x793A;
    * &#x521D;&#x59CB;&#x5316;&#x6307;&#x5B9A;:
        ```
        constructor() {
          super();
          this.state = {
            stateName1 : stateValue1,
            stateName2 : stateValue2
          };
        }
        ```
    * &#x8BFB;&#x53D6;&#x663E;&#x793A;: 
        this.state.stateName1
    * &#x66F4;&#x65B0;&#x72B6;&#x6001;--&gt;&#x66F4;&#x65B0;&#x754C;&#x9762; : 
        this.setState({stateName1 : newValue})
* &#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x7684;&#x7EC4;&#x4EF6;
    * React&#x662F;&#x5355;&#x5411;&#x6570;&#x636E;&#x6D41;
    * &#x9700;&#x8981;&#x901A;&#x8FC7;onChange&#x76D1;&#x542C;&#x624B;&#x52A8;&#x5B9E;&#x73B0;
* &#x7EC4;&#x4EF6;&#x751F;&#x547D;&#x5468;&#x671F;
    * &#x7EC4;&#x4EF6;&#x7684;&#x4E09;&#x4E2A;&#x751F;&#x547D;&#x5468;&#x671F;&#x72B6;&#x6001;:
    * Mount&#xFF1A;&#x63D2;&#x5165;&#x771F;&#x5B9E; DOM
    * Update&#xFF1A;&#x88AB;&#x91CD;&#x65B0;&#x6E32;&#x67D3;
    * Unmount&#xFF1A;&#x88AB;&#x79FB;&#x51FA;&#x771F;&#x5B9E; DOM
* &#x751F;&#x547D;&#x5468;&#x671F;&#x6D41;&#x7A0B;:
  * &#x7B2C;&#x4E00;&#x6B21;&#x521D;&#x59CB;&#x5316;&#x663E;&#x793A;
    ```
    constructor()
    componentWillMount() : &#x5C06;&#x8981;&#x63D2;&#x5165;&#x56DE;&#x8C03;
    render() : &#x7528;&#x4E8E;&#x63D2;&#x5165;&#x865A;&#x62DF;DOM&#x56DE;&#x8C03;
    componentDidMount() : &#x5DF2;&#x7ECF;&#x63D2;&#x5165;&#x56DE;&#x8C03;
    ```
  * &#x6BCF;&#x6B21;&#x66F4;&#x65B0;state
    ```
    componentWillReceiveProps(): &#x63A5;&#x6536;&#x7236;&#x7EC4;&#x4EF6;&#x65B0;&#x7684;&#x5C5E;&#x6027;
    componentWillUpdate() : &#x5C06;&#x8981;&#x66F4;&#x65B0;&#x56DE;&#x8C03;
    render() : &#x66F4;&#x65B0;(&#x91CD;&#x65B0;&#x6E32;&#x67D3;)
    componentDidUpdate() : &#x5DF2;&#x7ECF;&#x66F4;&#x65B0;&#x56DE;&#x8C03;
    ```
  * &#x5220;&#x9664;&#x7EC4;&#x4EF6;
    ```
    ReactDOM.unmountComponentAtNode(document.getElementById(&apos;example&apos;)) : &#x79FB;&#x9664;&#x7EC4;&#x4EF6;
    componentWillUnmount() : &#x7EC4;&#x4EF6;&#x5C06;&#x8981;&#x88AB;&#x79FB;&#x9664;&#x56DE;&#x8C03;
    ```
* &#x5E38;&#x7528;&#x7684;&#x65B9;&#x6CD5;
  ```
  render(): &#x5FC5;&#x987B;&#x91CD;&#x5199;, &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x865A;&#x62DF;DOM
  constructor(): &#x521D;&#x59CB;&#x5316;&#x72B6;&#x6001;, &#x7ED1;&#x5B9A;this(&#x53EF;&#x4EE5;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x4EE3;&#x66FF;)
  componentDidMount() : &#x53EA;&#x6267;&#x884C;&#x4E00;&#x6B21;, &#x5DF2;&#x7ECF;&#x5728;dom&#x6811;&#x4E2D;, &#x9002;&#x5408;&#x542F;&#x52A8;/&#x8BBE;&#x7F6E;&#x4E00;&#x4E9B;&#x76D1;&#x542C;
  ```   " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code>* &#x57FA;&#x672C;&#x7406;&#x89E3;&#x548C;&#x4F7F;&#x7528;
    * &#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x6807;&#x7B7E;: &#x7EC4;&#x4EF6;&#x7C7B;(&#x51FD;&#x6570;)/&#x6807;&#x7B7E;
    * &#x521B;&#x5EFA;&#x7EC4;&#x4EF6;&#x7C7B;
      ```
      <span class="hljs-comment">//&#x65B9;&#x5F0F;1: &#x65E0;&#x72B6;&#x6001;&#x51FD;&#x6570;(&#x6700;&#x7B80;&#x6D01;, &#x63A8;&#x8350;&#x4F7F;&#x7528;)</span>
      function MyComponent1() {
        return &lt;h1&gt;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x6807;&#x9898;<span class="hljs-number">11111</span>&lt;/h1&gt;;
      }
      <span class="hljs-comment">//&#x65B9;&#x5F0F;2: ES6&#x7C7B;&#x8BED;&#x6CD5;(&#x590D;&#x6742;&#x7EC4;&#x4EF6;, &#x63A8;&#x8350;&#x4F7F;&#x7528;)</span>
      <span class="hljs-keyword">class</span> MyComponent3 extends React.Component {
        render () {
          return &lt;h1&gt;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x6807;&#x9898;<span class="hljs-number">33333</span>&lt;/h1&gt;;
        }
      }
      <span class="hljs-comment">//&#x65B9;&#x5F0F;3: ES5&#x8001;&#x8BED;&#x6CD5;(&#x4E0D;&#x63A8;&#x8350;&#x4F7F;&#x7528;&#x4E86;)</span>
      var MyComponent2 = React.createClass({
        render () {
          return &lt;h1&gt;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x6807;&#x9898;<span class="hljs-number">22222</span>&lt;/h1&gt;;
        }
      });
      ```
    * &#x6E32;&#x67D3;&#x7EC4;&#x4EF6;&#x6807;&#x7B7E;
        ```
        ReactDOM.render(&lt;MyComp /&gt;,  cotainerEle);
        ```
* ReactDOM.render()&#x6E32;&#x67D3;&#x7EC4;&#x4EF6;&#x6807;&#x7B7E;&#x7684;&#x57FA;&#x672C;&#x6D41;&#x7A0B;
  * React&#x5185;&#x90E8;&#x4F1A;&#x521B;&#x5EFA;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;/&#x8C03;&#x7528;&#x7EC4;&#x4EF6;&#x51FD;&#x6570;, &#x5F97;&#x5230;&#x865A;&#x62DF;DOM&#x5BF9;&#x8C61;
  * &#x5C06;&#x865A;&#x62DF;DOM&#x5E76;&#x89E3;&#x6790;&#x4E3A;&#x771F;&#x5B9E;DOM
  * &#x63D2;&#x5165;&#x5230;&#x6307;&#x5B9A;&#x7684;&#x9875;&#x9762;&#x5143;&#x7D20;&#x5185;&#x90E8;
* props
    * &#x6240;&#x6709;&#x7EC4;&#x4EF6;&#x6807;&#x7B7E;&#x7684;&#x5C5E;&#x6027;&#x7684;&#x96C6;&#x5408;&#x5BF9;&#x8C61;
    * &#x7ED9;&#x6807;&#x7B7E;&#x6307;&#x5B9A;&#x5C5E;&#x6027;, &#x4FDD;&#x5B58;&#x5916;&#x90E8;&#x6570;&#x636E;(&#x53EF;&#x80FD;&#x662F;&#x4E00;&#x4E2A;function)
    * &#x5728;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x8BFB;&#x53D6;&#x5C5E;&#x6027;: this.props.propertyName
    * &#x4F5C;&#x7528;: &#x4ECE;&#x76EE;&#x6807;&#x7EC4;&#x4EF6;&#x5916;&#x90E8;&#x5411;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x4F20;&#x9012;&#x6570;&#x636E;
    * &#x5BF9;props&#x4E2D;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x8FDB;&#x884C;&#x7C7B;&#x578B;&#x9650;&#x5236;&#x548C;&#x5FC5;&#x8981;&#x6027;&#x9650;&#x5236;
     ```
     Person.propTypes = {
       name: React.PropTypes.string.isRequired,
       age: React.PropTypes.number.isRequired
     }
     ```
* &#x6269;&#x5C55;&#x5C5E;&#x6027;: &#x5C06;&#x5BF9;&#x8C61;&#x7684;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x901A;&#x8FC7;props&#x4F20;&#x9012;
    ```
    &lt;Person {...person}/&gt;
    ```
* &#x7EC4;&#x4EF6;&#x7684;&#x7EC4;&#x5408;
    * &#x7EC4;&#x4EF6;&#x6807;&#x7B7E;&#x4E2D;&#x5305;&#x542B;&#x5B50;&#x7EC4;&#x4EF6;&#x6807;&#x7B7E;
    * &#x62C6;&#x5206;&#x7EC4;&#x4EF6;: &#x62C6;&#x5206;&#x754C;&#x9762;, &#x62BD;&#x53D6;&#x7EC4;&#x4EF6;
    * &#x901A;&#x8FC7;props&#x4F20;&#x9012;&#x6570;&#x636E;
* refs
    * &#x7EC4;&#x4EF6;&#x5185;&#x5305;&#x542B;ref&#x5C5E;&#x6027;&#x7684;&#x6807;&#x7B7E;&#x5143;&#x7D20;&#x7684;&#x96C6;&#x5408;&#x5BF9;&#x8C61;
    * &#x7ED9;&#x64CD;&#x4F5C;&#x76EE;&#x6807;&#x6807;&#x7B7E;&#x6307;&#x5B9A;ref&#x5C5E;&#x6027;, &#x6253;&#x4E00;&#x4E2A;&#x6807;&#x8BC6;
    * &#x5728;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x83B7;&#x5F97;&#x6807;&#x7B7E;&#x5BF9;&#x8C61;: this.refs.refName(&#x53EA;&#x662F;&#x5F97;&#x5230;&#x4E86;&#x6807;&#x7B7E;&#x5143;&#x7D20;&#x5BF9;&#x8C61;)
    * &#x4F5C;&#x7528;: &#x64CD;&#x4F5C;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x7684;&#x771F;&#x5B9E;&#x6807;&#x7B7E;dom&#x5143;&#x7D20;&#x5BF9;&#x8C61;
* &#x4E8B;&#x4EF6;&#x5904;&#x7406;
    * &#x7ED9;&#x6807;&#x7B7E;&#x6DFB;&#x52A0;&#x5C5E;&#x6027;: onXxx={this.eventHandler}
    * &#x5728;&#x7EC4;&#x4EF6;&#x4E2D;&#x6DFB;&#x52A0;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x65B9;&#x6CD5;
      ```
        eventHandler(event) {
                    
        }
      ```
    * &#x4F7F;&#x81EA;&#x5B9A;&#x4E49;&#x65B9;&#x6CD5;&#x4E2D;&#x7684;this&#x4E3A;&#x7EC4;&#x4EF6;&#x5BF9;&#x8C61;
      * &#x5728;constructor()&#x4E2D;bind(this)
      * &#x4F7F;&#x7528;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x5B9A;&#x4E49;&#x65B9;&#x6CD5;(ES6&#x6A21;&#x5757;&#x5316;&#x7F16;&#x7801;&#x65F6;&#x624D;&#x80FD;&#x4F7F;&#x7528;)
* state
    * &#x7EC4;&#x4EF6;&#x88AB;&#x79F0;&#x4E3A;<span class="hljs-string">&quot;&#x72B6;&#x6001;&#x673A;&quot;</span>, &#x9875;&#x9762;&#x7684;&#x663E;&#x793A;&#x662F;&#x6839;&#x636E;&#x7EC4;&#x4EF6;&#x7684;state&#x5C5E;&#x6027;&#x7684;&#x6570;&#x636E;&#x6765;&#x663E;&#x793A;
    * &#x521D;&#x59CB;&#x5316;&#x6307;&#x5B9A;:
        ```
        constructor() {
          super();
          this.state = {
            stateName1 : stateValue1,
            stateName2 : stateValue2
          };
        }
        ```
    * &#x8BFB;&#x53D6;&#x663E;&#x793A;: 
        this.state.stateName1
    * &#x66F4;&#x65B0;&#x72B6;&#x6001;--&gt;&#x66F4;&#x65B0;&#x754C;&#x9762; : 
        this.setState({stateName1 : newValue})
* &#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x7684;&#x7EC4;&#x4EF6;
    * React&#x662F;&#x5355;&#x5411;&#x6570;&#x636E;&#x6D41;
    * &#x9700;&#x8981;&#x901A;&#x8FC7;onChange&#x76D1;&#x542C;&#x624B;&#x52A8;&#x5B9E;&#x73B0;
* &#x7EC4;&#x4EF6;&#x751F;&#x547D;&#x5468;&#x671F;
    * &#x7EC4;&#x4EF6;&#x7684;&#x4E09;&#x4E2A;&#x751F;&#x547D;&#x5468;&#x671F;&#x72B6;&#x6001;:
    * Mount&#xFF1A;&#x63D2;&#x5165;&#x771F;&#x5B9E; DOM
    * Update&#xFF1A;&#x88AB;&#x91CD;&#x65B0;&#x6E32;&#x67D3;
    * Unmount&#xFF1A;&#x88AB;&#x79FB;&#x51FA;&#x771F;&#x5B9E; DOM
* &#x751F;&#x547D;&#x5468;&#x671F;&#x6D41;&#x7A0B;:
  * &#x7B2C;&#x4E00;&#x6B21;&#x521D;&#x59CB;&#x5316;&#x663E;&#x793A;
    ```
    constructor()
    componentWillMount() : &#x5C06;&#x8981;&#x63D2;&#x5165;&#x56DE;&#x8C03;
    render() : &#x7528;&#x4E8E;&#x63D2;&#x5165;&#x865A;&#x62DF;DOM&#x56DE;&#x8C03;
    componentDidMount() : &#x5DF2;&#x7ECF;&#x63D2;&#x5165;&#x56DE;&#x8C03;
    ```
  * &#x6BCF;&#x6B21;&#x66F4;&#x65B0;state
    ```
    componentWillReceiveProps(): &#x63A5;&#x6536;&#x7236;&#x7EC4;&#x4EF6;&#x65B0;&#x7684;&#x5C5E;&#x6027;
    componentWillUpdate() : &#x5C06;&#x8981;&#x66F4;&#x65B0;&#x56DE;&#x8C03;
    render() : &#x66F4;&#x65B0;(&#x91CD;&#x65B0;&#x6E32;&#x67D3;)
    componentDidUpdate() : &#x5DF2;&#x7ECF;&#x66F4;&#x65B0;&#x56DE;&#x8C03;
    ```
  * &#x5220;&#x9664;&#x7EC4;&#x4EF6;
    ```
    ReactDOM.unmountComponentAtNode(document.getElementById(<span class="hljs-string">&apos;example&apos;</span>)) : &#x79FB;&#x9664;&#x7EC4;&#x4EF6;
    componentWillUnmount() : &#x7EC4;&#x4EF6;&#x5C06;&#x8981;&#x88AB;&#x79FB;&#x9664;&#x56DE;&#x8C03;
    ```
* &#x5E38;&#x7528;&#x7684;&#x65B9;&#x6CD5;
  ```
  render(): &#x5FC5;&#x987B;&#x91CD;&#x5199;, &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x865A;&#x62DF;DOM
  constructor(): &#x521D;&#x59CB;&#x5316;&#x72B6;&#x6001;, &#x7ED1;&#x5B9A;this(&#x53EF;&#x4EE5;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x4EE3;&#x66FF;)
  componentDidMount() : &#x53EA;&#x6267;&#x884C;&#x4E00;&#x6B21;, &#x5DF2;&#x7ECF;&#x5728;dom&#x6811;&#x4E2D;, &#x9002;&#x5408;&#x542F;&#x52A8;/&#x8BBE;&#x7F6E;&#x4E00;&#x4E9B;&#x76D1;&#x542C;
  ```   </code></pre><h2 id="articleHeader5">6. ajax</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="* React&#x6CA1;&#x6709;ajax&#x6A21;&#x5757;
* &#x96C6;&#x6210;&#x5176;&#x5B83;&#x7684;js&#x5E93;(&#x5982;axios/fetch/jQuery/), &#x53D1;&#x9001;ajax&#x8BF7;&#x6C42;
  * axios
    * &#x5C01;&#x88C5;XmlHttpRequest&#x5BF9;&#x8C61;&#x7684;ajax
    * promise
    * &#x53EF;&#x4EE5;&#x7528;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x548C;&#x670D;&#x52A1;&#x5668;
  * fetch
    * &#x4E0D;&#x518D;&#x4F7F;&#x7528;XmlHttpRequest&#x5BF9;&#x8C61;&#x63D0;&#x4EA4;ajax&#x8BF7;&#x6C42;
    * fetch&#x5C31;&#x662F;&#x7528;&#x6765;&#x63D0;&#x4EA4;ajax&#x8BF7;&#x6C42;&#x7684;&#x51FD;&#x6570;, &#x53EA;&#x662F;&#x65B0;&#x7684;&#x6D4F;&#x89C8;&#x624D;&#x5185;&#x7F6E;&#x4E86;fetch
    * &#x4E3A;&#x4E86;&#x517C;&#x5BB9;&#x4F4E;&#x7248;&#x672C;&#x7684;&#x6D4F;&#x89C8;&#x5668;, &#x53EF;&#x4EE5;&#x5F15;&#x5165;fetch.js
* &#x5728;&#x54EA;&#x4E2A;&#x65B9;&#x6CD5;&#x53BB;&#x53D1;&#x9001;ajax&#x8BF7;&#x6C42;
  * &#x53EA;&#x663E;&#x793A;&#x4E00;&#x6B21;(&#x8BF7;&#x6C42;&#x4E00;&#x6B21;): componentDidMount()
  * &#x663E;&#x793A;&#x591A;&#x6B21;(&#x8BF7;&#x6C42;&#x591A;&#x6B21;): componentWillReceiveProps()
  " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code><span class="hljs-comment">* React&#x6CA1;&#x6709;ajax&#x6A21;&#x5757;</span>
<span class="hljs-comment">* &#x96C6;&#x6210;&#x5176;&#x5B83;&#x7684;js&#x5E93;(&#x5982;axios/fetch/jQuery/), &#x53D1;&#x9001;ajax&#x8BF7;&#x6C42;</span>
<span class="hljs-comment">  * axios</span>
<span class="hljs-comment">    * &#x5C01;&#x88C5;XmlHttpRequest&#x5BF9;&#x8C61;&#x7684;ajax</span>
<span class="hljs-comment">    * promise</span>
<span class="hljs-comment">    * &#x53EF;&#x4EE5;&#x7528;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x548C;&#x670D;&#x52A1;&#x5668;</span>
<span class="hljs-comment">  * fetch</span>
<span class="hljs-comment">    * &#x4E0D;&#x518D;&#x4F7F;&#x7528;XmlHttpRequest&#x5BF9;&#x8C61;&#x63D0;&#x4EA4;ajax&#x8BF7;&#x6C42;</span>
<span class="hljs-comment">    * fetch&#x5C31;&#x662F;&#x7528;&#x6765;&#x63D0;&#x4EA4;ajax&#x8BF7;&#x6C42;&#x7684;&#x51FD;&#x6570;, &#x53EA;&#x662F;&#x65B0;&#x7684;&#x6D4F;&#x89C8;&#x624D;&#x5185;&#x7F6E;&#x4E86;fetch</span>
<span class="hljs-comment">    * &#x4E3A;&#x4E86;&#x517C;&#x5BB9;&#x4F4E;&#x7248;&#x672C;&#x7684;&#x6D4F;&#x89C8;&#x5668;, &#x53EF;&#x4EE5;&#x5F15;&#x5165;fetch.js</span>
<span class="hljs-comment">* &#x5728;&#x54EA;&#x4E2A;&#x65B9;&#x6CD5;&#x53BB;&#x53D1;&#x9001;ajax&#x8BF7;&#x6C42;</span>
<span class="hljs-comment">  * &#x53EA;&#x663E;&#x793A;&#x4E00;&#x6B21;(&#x8BF7;&#x6C42;&#x4E00;&#x6B21;): componentDidMount()</span>
<span class="hljs-comment">  * &#x663E;&#x793A;&#x591A;&#x6B21;(&#x8BF7;&#x6C42;&#x591A;&#x6B21;): componentWillReceiveProps()</span>
  </code></pre><h2 id="articleHeader6">7. &#x865A;&#x62DF;DOM</h2><ul><li><p>&#x865A;&#x62DF;DOM&#x662F;&#x4EC0;&#x4E48;?</p><ul><li>&#x4E00;&#x4E2A;&#x865A;&#x62DF;DOM(&#x5143;&#x7D20;)&#x662F;&#x4E00;&#x4E2A;&#x4E00;&#x822C;&#x7684;js&#x5BF9;&#x8C61;, &#x51C6;&#x786E;&#x7684;&#x8BF4;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x6811;(&#x5012;&#x7ACB;&#x7684;)</li><li>&#x865A;&#x62DF;DOM&#x4FDD;&#x5B58;&#x4E86;&#x771F;&#x5B9E;DOM&#x7684;&#x5C42;&#x6B21;&#x5173;&#x7CFB;&#x548C;&#x4E00;&#x4E9B;&#x57FA;&#x672C;&#x5C5E;&#x6027;&#xFF0C;&#x4E0E;&#x771F;&#x5B9E;DOM&#x4E00;&#x4E00;&#x5BF9;&#x5E94;</li><li>&#x5982;&#x679C;&#x53EA;&#x662F;&#x66F4;&#x65B0;&#x865A;&#x62DF;DOM, &#x9875;&#x9762;&#x662F;&#x4E0D;&#x4F1A;&#x91CD;&#x7ED8;&#x7684;</li></ul></li><li><p>Virtual DOM &#x7B97;&#x6CD5;&#x7684;&#x57FA;&#x672C;&#x6B65;&#x9AA4;</p><ul><li>&#x7528; JavaScript &#x5BF9;&#x8C61;&#x7ED3;&#x6784;&#x8868;&#x793A; DOM &#x6811;&#x7684;&#x7ED3;&#x6784;&#xFF1B;&#x7136;&#x540E;&#x7528;&#x8FD9;&#x4E2A;&#x6811;&#x6784;&#x5EFA;&#x4E00;&#x4E2A;&#x771F;&#x6B63;&#x7684; DOM &#x6811;&#xFF0C;&#x63D2;&#x5230;&#x6587;&#x6863;&#x5F53;&#x4E2D;</li><li>&#x5F53;&#x72B6;&#x6001;&#x53D8;&#x66F4;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x91CD;&#x65B0;&#x6784;&#x9020;&#x4E00;&#x68F5;&#x65B0;&#x7684;&#x5BF9;&#x8C61;&#x6811;&#x3002;&#x7136;&#x540E;&#x7528;&#x65B0;&#x7684;&#x6811;&#x548C;&#x65E7;&#x7684;&#x6811;&#x8FDB;&#x884C;&#x6BD4;&#x8F83;&#xFF0C;&#x8BB0;&#x5F55;&#x4E24;&#x68F5;&#x6811;&#x5DEE;&#x5F02;</li><li>&#x628A;2&#x6240;&#x8BB0;&#x5F55;&#x7684;&#x5DEE;&#x5F02;&#x5E94;&#x7528;&#x5230;&#x6B65;&#x9AA4;1&#x6240;&#x6784;&#x5EFA;&#x7684;&#x771F;&#x6B63;&#x7684;DOM&#x6811;&#x4E0A;&#xFF0C;&#x89C6;&#x56FE;&#x5C31;&#x66F4;&#x65B0;&#x4E86;</li></ul></li><li><p>&#x8FDB;&#x4E00;&#x6B65;&#x7406;&#x89E3;</p><ul><li>Virtual DOM &#x672C;&#x8D28;&#x4E0A;&#x5C31;&#x662F;&#x5728; JS &#x548C; DOM &#x4E4B;&#x95F4;&#x505A;&#x4E86;&#x4E00;&#x4E2A;&#x7F13;&#x5B58;&#x3002;</li><li>&#x53EF;&#x4EE5;&#x7C7B;&#x6BD4; CPU &#x548C;&#x786C;&#x76D8;&#xFF0C;&#x65E2;&#x7136;&#x786C;&#x76D8;&#x8FD9;&#x4E48;&#x6162;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x5728;&#x5B83;&#x4EEC;&#x4E4B;&#x95F4;&#x52A0;&#x4E2A;&#x7F13;&#x5B58;&#xFF1A;&#x65E2;&#x7136; DOM &#x8FD9;&#x4E48;&#x6162;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x5728;&#x5B83;&#x4EEC; JS &#x548C; DOM &#x4E4B;&#x95F4;&#x52A0;&#x4E2A;&#x7F13;&#x5B58;&#x3002;CPU&#xFF08;JS&#xFF09;&#x53EA;&#x64CD;&#x4F5C;&#x5185;&#x5B58;&#xFF08;Virtual DOM&#xFF09;&#xFF0C;&#x6700;&#x540E;&#x7684;&#x65F6;&#x5019;&#x518D;&#x628A;&#x53D8;&#x66F4;&#x5199;&#x5165;&#x786C;&#x76D8;&#xFF08;DOM&#xFF09;&#x3002;</li></ul></li></ul><h2 id="articleHeader7">8. &#x4F7F;&#x7528;React&#x811A;&#x624B;&#x67B6;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;React&#x5E94;&#x7528;</h2><ul><li><p>react&#x811A;&#x624B;&#x67B6;</p><ul><li><p>xxx&#x811A;&#x624B;&#x67B6;: &#x7528;&#x6765;&#x5E2E;&#x52A9;&#x7A0B;&#x5E8F;&#x5458;&#x5FEB;&#x901F;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E;xxx&#x5E93;&#x7684;&#x7A7A;&#x9879;&#x76EE;&#x7684;&#x5E93;</p><ul><li>&#x5305;&#x542B;&#x4E86;&#x6240;&#x6709;&#x9700;&#x8981;&#x7684;&#x914D;&#x7F6E;</li><li>&#x6307;&#x5B9A;&#x597D;&#x4E86;&#x6240;&#x6709;&#x7684;&#x4F9D;&#x8D56;</li><li>&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x5B89;&#x88C5;/&#x7F16;&#x8BD1;/&#x8FD0;&#x884C;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x6548;&#x679C;</li></ul></li><li>react&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x4E13;&#x95E8;&#x7528;&#x4E8E;&#x521B;&#x5EFA;react&#x9879;&#x76EE;&#x7684;&#x811A;&#x624B;&#x67B6;&#x5E93;: create-react-app</li><li>&#x9879;&#x76EE;&#x7684;&#x6574;&#x4F53;&#x6280;&#x672F;&#x67B6;&#x6784;&#x4E3A;: react + webpack + es6 + eslint</li></ul></li><li><p>&#x521B;&#x5EFA;&#x9879;&#x76EE;&#x5E76;&#x542F;&#x52A8;</p><ul><li>npm install -g create-react-app</li><li>create-react-app hello-react</li><li>cd hello-react</li><li>npm start</li></ul></li></ul><h2 id="articleHeader8">9. app1: &#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x8BC4;&#x8BBA;&#x7BA1;&#x7406;&#x529F;&#x80FD;</h2><ul><li><p>&#x62C6;&#x5206;&#x7EC4;&#x4EF6;:</p><ul><li>&#x5E94;&#x7528;&#x7EC4;&#x4EF6;: App</li><li>&#x6DFB;&#x52A0;&#x8BC4;&#x8BBA;&#x7EC4;&#x4EF6;: CommentAdd</li><li>&#x8BC4;&#x8BBA;&#x9879;&#x7EC4;&#x4EF6;: CommentItem</li><li>&#x8BC4;&#x8BBA;&#x5217;&#x8868;&#x7EC4;&#x4EF6;: CommentList</li></ul></li><li><p>&#x786E;&#x5B9A;&#x7EC4;&#x4EF6;&#x7684;state&#x548C;props:</p><ul><li><p>App:</p><ul><li>state: comments/array</li></ul></li><li><p>CommentAdd</p><ul><li>state: username/string, content/string</li><li>props: add/func</li></ul></li><li><p>commentList</p><ul><li>props: comments/array, delete/func</li></ul></li><li><p>CommentItem</p><ul><li>props: comment/object, delete/func, index/number</li></ul></li></ul></li><li><p>&#x7F16;&#x5199;&#x9759;&#x6001;&#x7EC4;&#x4EF6;</p><ul><li>&#x62C6;&#x5206;&#x9875;&#x9762;</li><li>&#x62C6;&#x5206;css</li></ul></li><li><p>&#x5B9E;&#x73B0;&#x52A8;&#x6001;&#x7EC4;&#x4EF6;</p><ul><li><p>&#x52A8;&#x6001;&#x5C55;&#x793A;&#x521D;&#x59CB;&#x5316;&#x6570;&#x636E;</p><ul><li>&#x521D;&#x59CB;&#x5316;&#x72B6;&#x6001;&#x6570;&#x636E;</li><li>&#x4F20;&#x9012;&#x5C5E;&#x6027;&#x6570;&#x636E;</li></ul></li><li><p>&#x54CD;&#x5E94;&#x7528;&#x6237;&#x64CD;&#x4F5C;, &#x66F4;&#x65B0;&#x7EC4;&#x4EF6;&#x754C;&#x9762;</p><ul><li>&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;, &#x5E76;&#x5904;&#x7406;</li><li>&#x66F4;&#x65B0;state</li></ul></li></ul></li></ul><h2 id="articleHeader9">10. app2: &#x5B9E;&#x73B0;github&#x7528;&#x6237;&#x641C;&#x7D22;&#x529F;&#x80FD;</h2><ul><li><p>&#x62C6;&#x5206;&#x7EC4;&#x4EF6;</p><ul><li>App</li><li>Search</li><li>List</li></ul></li><li><p>&#x786E;&#x5B9A;&#x7EC4;&#x4EF6;&#x7684;state&#x548C;props</p><ul><li><p>App</p><ul><li>state: searchName/string</li></ul></li><li><p>Search</p><ul><li>props: setSearchName/func</li></ul></li><li><p>List</p><ul><li>props: searchName/string</li><li>state: firstView/bool, loading/bool, users/array, errMsg/string</li></ul></li></ul></li><li>&#x7F16;&#x5199;&#x9759;&#x6001;&#x7EC4;&#x4EF6;</li><li><p>&#x7F16;&#x5199;&#x52A8;&#x6001;&#x7EC4;&#x4EF6;</p><ul><li>componentWillReceiveProps(nextProps): &#x76D1;&#x89C6;&#x63A5;&#x6536;&#x5230;&#x65B0;&#x7684;props, &#x53D1;&#x9001;ajax</li><li>&#x4F7F;&#x7528;axios&#x5E93;&#x53D1;&#x9001;ajax&#x8BF7;&#x6C42;</li></ul></li></ul><h2 id="articleHeader10">11. &#x7EC4;&#x4EF6;&#x95F4;&#x901A;&#x4FE1;&#x603B;&#x7ED3;</h2><ul><li><p>&#x65B9;&#x5F0F;&#x4E00;: &#x901A;&#x8FC7;props&#x4F20;&#x9012;</p><ul><li>&#x5171;&#x540C;&#x7684;&#x6570;&#x636E;&#x653E;&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x4E0A;, &#x7279;&#x6709;&#x7684;&#x6570;&#x636E;&#x653E;&#x5728;&#x81EA;&#x5DF1;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;(state)</li><li>&#x901A;&#x8FC7;props&#x53EF;&#x4EE5;&#x4F20;&#x9012;&#x4E00;&#x822C;&#x6570;&#x636E;&#x548C;&#x51FD;&#x6570;&#x6570;&#x636E;, &#x53EA;&#x80FD;&#x4E00;&#x5C42;&#x4E00;&#x5C42;&#x4F20;&#x9012;</li><li>&#x4E00;&#x822C;&#x6570;&#x636E;--&gt;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x6570;&#x636E;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;--&gt;&#x5B50;&#x7EC4;&#x4EF6;&#x8BFB;&#x53D6;&#x6570;&#x636E;</li><li>&#x51FD;&#x6570;&#x6570;&#x636E;--&gt;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x6570;&#x636E;&#x7ED9;&#x7236;&#x7EC4;&#x4EF6;--&gt;&#x5B50;&#x7EC4;&#x4EF6;&#x8C03;&#x7528;&#x51FD;&#x6570;</li></ul></li><li><p>&#x65B9;&#x5F0F;&#x4E8C;: &#x4F7F;&#x7528;&#x6D88;&#x606F;&#x8BA2;&#x9605;(subscribe)-&#x53D1;&#x5E03;(publish)&#x673A;&#x5236;: &#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#x673A;&#x5236;</p><ul><li>&#x5DE5;&#x5177;&#x5E93;: PubSubJS</li><li>&#x4E0B;&#x8F7D;: npm install pubsub-js --save</li><li><p>&#x4F7F;&#x7528;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import PubSub from &apos;pubsub-js&apos; //&#x5F15;&#x5165;
PubSub.subscribe(&apos;delete&apos;, function(data){ }); //&#x8BA2;&#x9605;
PubSub.publish(&apos;delete&apos;, data) //&#x53D1;&#x5E03;&#x6D88;&#x606F;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> PubSub <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;pubsub-js&apos;</span> <span class="hljs-comment">//&#x5F15;&#x5165;</span>
PubSub.subscribe(<span class="hljs-string">&apos;delete&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{ }); <span class="hljs-comment">//&#x8BA2;&#x9605;</span>
PubSub.publish(<span class="hljs-string">&apos;delete&apos;</span>, data) <span class="hljs-comment">//&#x53D1;&#x5E03;&#x6D88;&#x606F;</span></code></pre></li></ul></li></ul><h2 id="articleHeader11">12. ES6&#x65B0;&#x8BED;&#x6CD5;</h2><ul><li>const/let</li><li>&#x89E3;&#x6784;&#x8D4B;&#x503C;: let {a, b} = this.props</li><li>&#x5BF9;&#x8C61;&#x7684;&#x7B80;&#x6D01;&#x8868;&#x8FBE;</li><li><p>&#x7BAD;&#x5934;&#x51FD;&#x6570;:</p><ul><li>&#x7EC4;&#x4EF6;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x65B9;&#x6CD5;: xxx = () =&gt; {}</li><li>map/filter&#x7684;&#x56DE;&#x8C03;&#x65B9;&#x6CD5;: (item, index) =&gt; {}</li><li><p>&#x4F18;&#x70B9;:</p><ul><li>&#x7B80;&#x6D01;</li><li>&#x6CA1;&#x6709;&#x81EA;&#x5DF1;&#x7684;this,&#x4F7F;&#x7528;&#x5F15;&#x7528;this&#x67E5;&#x627E;&#x7684;&#x662F;&#x5916;&#x90E8;this</li></ul></li></ul></li><li><p>&#x6269;&#x5C55;&#x8FD0;&#x7B97;&#x7B26;(...)</p><ul><li>&#x89E3;&#x6784;&#x5BF9;&#x8C61;: const MyProps = {}, &lt;Xxx {...MyProps}&gt;</li></ul></li><li>class/extends/constructor/super</li><li>ES6&#x6A21;&#x5757;&#x5316;(Babel)</li></ul><h2 id="articleHeader12">13. &#x9879;&#x76EE;&#x6253;&#x5305;&#x8FD0;&#x884C;</h2><ul><li><p>&#x9879;&#x76EE;&#x7F16;&#x8BD1;&#x6253;&#x5305;&#x5E76;&#x8FD0;&#x884C;</p><ul><li>npm build</li><li>npm install -g pushstate-server</li><li>pushstate-server build</li><li>&#x8BBF;&#x95EE;: <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:9000</li></ul></li></ul><h2 id="articleHeader13">14. &#x4E0B;&#x8F7D;&#x76F8;&#x5173;&#x6A21;&#x5757;&#x5305;</h2><ul><li>&#x521B;&#x5EFA;package.json</li><li><p>react&#x76F8;&#x5173;&#x5E93;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install react react-dom --save" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> react react-dom <span class="hljs-comment">--save</span></code></pre></li><li><p>babel&#x76F8;&#x5173;&#x5E93;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install babel-core babel-preset-es2015 babel-preset-react --save-dev" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install </span><span class="hljs-keyword">babel-core </span><span class="hljs-keyword">babel-preset-es2015 </span><span class="hljs-keyword">babel-preset-react </span>--save-dev</code></pre></li><li><p>webpack&#x76F8;&#x5173;&#x5E93;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack babel-loader --save-dev
npm install webpack-dev-server" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> webpack babel-loader <span class="hljs-comment">--save-dev</span>
npm <span class="hljs-keyword">install</span> webpack-dev-<span class="hljs-keyword">server</span></code></pre></li></ul><h2 id="articleHeader14">15. webpack&#x914D;&#x7F6E;&#x6587;&#x4EF6;: webpack.config.js</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;); //path&#x5185;&#x7F6E;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x7528;&#x6765;&#x8BBE;&#x7F6E;&#x8DEF;&#x5F84;&#x3002;
        
module.exports = {
  entry: &apos;./src/main.js&apos;,   // &#x5165;&#x53E3;&#x6587;&#x4EF6;
  output: {                     // &#x8F93;&#x51FA;&#x914D;&#x7F6E;
    filename: &apos;bundle.js&apos;,      // &#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x540D;
    path: path.resolve(__dirname, &apos;dist&apos;)   //&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x8DEF;&#x5F84;&#x914D;&#x7F6E;
  },
   module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            &apos;style-loader&apos;,
            &apos;css-loader&apos;
          ]
        },
        //babel&#x5904;&#x7406;js
        {
          test: /\.js$/,
          exclude: /node_modules/, //&#x6392;&#x9664;&#x6B64;&#x6587;&#x4EF6;&#x5939;
          use: [
          &apos;babel-loader&apos;
          ]
        }
        
      ]
    }    
    
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>); <span class="hljs-comment">//path&#x5185;&#x7F6E;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x7528;&#x6765;&#x8BBE;&#x7F6E;&#x8DEF;&#x5F84;&#x3002;</span>
        
<span class="hljs-built_in">module</span>.exports = {
  entry: <span class="hljs-string">&apos;./src/main.js&apos;</span>,   <span class="hljs-comment">// &#x5165;&#x53E3;&#x6587;&#x4EF6;</span>
  output: {                     <span class="hljs-comment">// &#x8F93;&#x51FA;&#x914D;&#x7F6E;</span>
    filename: <span class="hljs-string">&apos;bundle.js&apos;</span>,      <span class="hljs-comment">// &#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x540D;</span>
    path: path.resolve(__dirname, <span class="hljs-string">&apos;dist&apos;</span>)   <span class="hljs-comment">//&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x8DEF;&#x5F84;&#x914D;&#x7F6E;</span>
  },
   <span class="hljs-keyword">module</span>: {
      rules: [
        {
          test: <span class="hljs-regexp">/\.css$/</span>,
          use: [
            <span class="hljs-string">&apos;style-loader&apos;</span>,
            <span class="hljs-string">&apos;css-loader&apos;</span>
          ]
        },
        <span class="hljs-comment">//babel&#x5904;&#x7406;js</span>
        {
          test: <span class="hljs-regexp">/\.js$/</span>,
          exclude: <span class="hljs-regexp">/node_modules/</span>, <span class="hljs-comment">//&#x6392;&#x9664;&#x6B64;&#x6587;&#x4EF6;&#x5939;</span>
          use: [
          <span class="hljs-string">&apos;babel-loader&apos;</span>
          ]
        }
        
      ]
    }    
    
};
</code></pre><h2 id="articleHeader15">16. babel&#x914D;&#x7F6E;&#x6587;&#x4EF6;: .babelrc</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [&quot;es2015&quot;, &quot;react&quot;]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs json"><code>{
  <span class="hljs-attr">&quot;presets&quot;</span>: [<span class="hljs-string">&quot;es2015&quot;</span>, <span class="hljs-string">&quot;react&quot;</span>]
}</code></pre><h2 id="articleHeader16">17. &#x7F16;&#x7801;</h2><ul><li><p>src/js/App.js: &#x5E94;&#x7528;&#x7EC4;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;
export default function App() {  //&#x66B4;&#x9732;&#x7EC4;&#x4EF6;&#x90FD;&#x5F97;&#x4F7F;&#x7528;&#x9ED8;&#x8BA4;&#x66B4;&#x9732;
  return &lt;h1&gt;Hello React Client Component&lt;/h1&gt;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">App</span>(<span class="hljs-params"></span>) </span>{  <span class="hljs-comment">//&#x66B4;&#x9732;&#x7EC4;&#x4EF6;&#x90FD;&#x5F97;&#x4F7F;&#x7528;&#x9ED8;&#x8BA4;&#x66B4;&#x9732;</span>
  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello React Client Component<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
}</code></pre></li><li><p>src/js/main.js: &#x5165;&#x53E3;js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;
import ReactDOM from &apos;react-dom&apos;
import App from &apos;./App&apos;

//&#x6E32;&#x67D3;&#x7EC4;&#x4EF6;&#x6807;&#x7B7E;&#x5230;&#x9875;&#x9762;&#x5143;&#x7D20;
ReactDOM.render(&lt;App /&gt;, document.getElementById(&apos;demo&apos;))" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-dom&apos;</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./App&apos;</span>

<span class="hljs-comment">//&#x6E32;&#x67D3;&#x7EC4;&#x4EF6;&#x6807;&#x7B7E;&#x5230;&#x9875;&#x9762;&#x5143;&#x7D20;</span>
ReactDOM.render(&lt;App /&gt;, <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;demo&apos;</span>))</code></pre></li></ul><h2 id="articleHeader17">18. &#x4E0B;&#x8F7D;css&#x52A0;&#x8F7D;&#x5668;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install style-loader css-loader --save-dev

&#x521B;&#x5EFA;css&#x6587;&#x4EF6;  src/css/test.css

body{
    background : red
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">style</span>-loader css-loader <span class="hljs-comment">--save-dev</span>

&#x521B;&#x5EFA;css&#x6587;&#x4EF6;  src/css/test.css

<span class="hljs-keyword">body</span>{
    background : red
}</code></pre><h2 id="articleHeader18">19. &#x914D;&#x7F6E;webpack-dev-server</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="devServer:{
    contentBase: &apos;./&apos;,//&#x5185;&#x7F6E;&#x670D;&#x52A1;&#x5668;&#x52A8;&#x6001;&#x52A0;&#x8F7D;&#x9875;&#x9762;&#x6240;&#x5728;&#x7684;&#x76EE;&#x5F55;
}
``
##20. &#x6267;&#x884C;&#x547D;&#x4EE4;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code>devServer:{
    contentBase: <span class="hljs-string">&apos;./&apos;</span>,<span class="hljs-comment">//&#x5185;&#x7F6E;&#x670D;&#x52A1;&#x5668;&#x52A8;&#x6001;&#x52A0;&#x8F7D;&#x9875;&#x9762;&#x6240;&#x5728;&#x7684;&#x76EE;&#x5F55;</span>
}
``
##<span class="hljs-number">20.</span> &#x6267;&#x884C;&#x547D;&#x4EE4;</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x6784;&#x5EFA;&#x4EFB;&#x52A1;&#xFF1A;webpack
&#x70ED;&#x52A0;&#x8F7D;&#x4EFB;&#x52A1;&#xFF1A; webpack-dev-server
```
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code>&#x6784;&#x5EFA;&#x4EFB;&#x52A1;&#xFF1A;webpack
&#x70ED;&#x52A0;&#x8F7D;&#x4EFB;&#x52A1;&#xFF1A; webpack-dev-server
```
</code></pre><h2 id="articleHeader19">21 package.json: &#x6DFB;&#x52A0;&#x7F16;&#x8BD1;/&#x8FD0;&#x884C;&#x811A;&#x672C;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  &quot;start&quot;: &quot;webpack-dev-server&quot;,
  &quot;build&quot;: &quot;webpack&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code><span class="hljs-string">&quot;scripts&quot;</span>: {
  <span class="hljs-string">&quot;start&quot;</span>: <span class="hljs-string">&quot;webpack-dev-server&quot;</span>,
  <span class="hljs-string">&quot;build&quot;</span>: <span class="hljs-string">&quot;webpack&quot;</span>
}</code></pre><h1 id="articleHeader20">react-router&#x4F7F;&#x7528;&#x6559;&#x7A0B;</h1><h2 id="articleHeader21">0. &#x5173;&#x4E8E;url&#x4E2D;#&#x7684;&#x4F5C;&#x7528;:</h2><ul><li>&#x5B66;&#x4E60;: <a href="http://www.ruanyifeng.com/blog/2011/03/url_hash.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blo...</a></li><li>&apos;#&apos;&#x4EE3;&#x8868;&#x7F51;&#x9875;&#x4E2D;&#x7684;&#x4E00;&#x4E2A;&#x4F4D;&#x7F6E;&#x3002;&#x5176;&#x53F3;&#x9762;&#x7684;&#x5B57;&#x7B26;&#xFF0C;&#x5C31;&#x662F;&#x8BE5;&#x4F4D;&#x7F6E;&#x7684;&#x6807;&#x8BC6;&#x7B26;</li><li>&#x6539;&#x53D8;#&#x4E0D;&#x89E6;&#x53D1;&#x7F51;&#x9875;&#x91CD;&#x8F7D;</li><li>&#x6539;&#x53D8;#&#x4F1A;&#x6539;&#x53D8;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x8BBF;&#x95EE;&#x5386;&#x53F2;</li><li>window.location.hash&#x8BFB;&#x53D6;#&#x503C;</li><li>window.onhashchange = func &#x76D1;&#x542C;hash&#x6539;&#x53D8;</li></ul><h2 id="articleHeader22">1. reat-router</h2><ul><li>github&#x4E3B;&#x9875;: <a href="https://github.com/ReactTraining/react-router" rel="nofollow noreferrer" target="_blank">https://github.com/ReactTrain...</a></li><li>&#x5B98;&#x7F51;&#x6559;&#x7A0B;: <a href="https://github.com/reactjs/react-router-tutorial/(%E5%AE%98%E6%96%B9%E6%95%99%E7%A8%8B)" rel="nofollow noreferrer" target="_blank">https://github.com/reactjs/re...</a></li><li>&#x4E00;&#x5CF0;&#x6559;&#x7A0B;: <a href="http://www.ruanyifeng.com/blog/2016/05/react_router.html?utm_source=tool.lu" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blo...</a></li></ul><h2 id="articleHeader23">2. react-router&#x5E93;&#x4E2D;&#x7684;&#x76F8;&#x5173;&#x7EC4;&#x4EF6;</h2><ul><li><p>&#x5305;&#x542B;&#x7684;&#x76F8;&#x5173;&#x7EC4;&#x4EF6;:</p><ul><li>Router: &#x8DEF;&#x7531;&#x5668;&#x7EC4;&#x4EF6;, &#x7528;&#x6765;&#x5305;&#x542B;&#x5404;&#x4E2A;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;</li><li>Route: &#x8DEF;&#x7531;&#x7EC4;&#x4EF6;, &#x6CE8;&#x518C;&#x8DEF;&#x7531;</li><li>IndexRoute: &#x9ED8;&#x8BA4;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;</li><li>hashHistory: &#x8DEF;&#x7531;&#x7684;&#x5207;&#x6362;&#x7531;URL&#x7684;hash&#x53D8;&#x5316;&#x51B3;&#x5B9A;&#xFF0C;&#x5373;URL&#x7684;#&#x90E8;&#x5206;&#x53D1;&#x751F;&#x53D8;&#x5316;</li><li>Link: &#x8DEF;&#x7531;&#x94FE;&#x63A5;&#x7EC4;&#x4EF6;</li></ul></li><li><p>Router: &#x8DEF;&#x7531;&#x5668;&#x7EC4;&#x4EF6;</p><ul><li>&#x5C5E;&#x6027;: history={hashHistory} &#x7528;&#x6765;&#x76D1;&#x542C;&#x6D4F;&#x89C8;&#x5668;&#x5730;&#x5740;&#x680F;&#x7684;&#x53D8;&#x5316;, &#x5E76;&#x5C06;URL&#x89E3;&#x6790;&#x6210;&#x4E00;&#x4E2A;&#x5730;&#x5740;&#x5BF9;&#x8C61;&#xFF0C;&#x4F9B;React Router&#x5339;&#x914D;</li><li>&#x5B50;&#x7EC4;&#x4EF6;: Route</li></ul></li><li><p>Route: &#x8DEF;&#x7531;&#x7EC4;&#x4EF6;</p><ul><li>&#x5C5E;&#x6027;1: path=&quot;/xxx&quot;</li><li>&#x5C5E;&#x6027;2: component={Xxx}</li><li>&#x6839;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;: path=&quot;/&quot;&#x7684;&#x7EC4;&#x4EF6;, &#x4E00;&#x822C;&#x4E3A;App</li><li>&#x5B50;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;: &#x5B50;&lt;Route&gt;&#x914D;&#x7F6E;&#x7684;&#x7EC4;&#x4EF6;</li></ul></li><li><p>IndexRoute: &#x9ED8;&#x8BA4;&#x8DEF;&#x7531;</p><ul><li>&#x5F53;&#x7236;&#x8DEF;&#x7531;&#x88AB;&#x8BF7;&#x6C42;&#x65F6;, &#x9ED8;&#x8BA4;&#x5C31;&#x4F1A;&#x8BF7;&#x6C42;&#x6B64;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;</li></ul></li><li><p>hashHistory</p><ul><li>&#x7528;&#x4E8E;Router&#x7EC4;&#x4EF6;&#x7684;history&#x5C5E;&#x6027;</li><li>&#x4F5C;&#x7528;: &#x4E3A;&#x5730;&#x5740;url&#x751F;&#x6210;?_k=hash, &#x7528;&#x4E8E;&#x5185;&#x90E8;&#x4FDD;&#x5B58;&#x5BF9;&#x5E94;&#x7684;state</li></ul></li><li><p>Link: &#x8DEF;&#x7531;&#x94FE;&#x63A5;</p><ul><li>&#x5C5E;&#x6027;1: to=&quot;/xxx&quot;</li><li>&#x5C5E;&#x6027;2: activeClassName=&quot;active&quot;</li></ul></li></ul><h2 id="articleHeader24">3. &#x914D;&#x7F6E;(&#x4ECE;&#x5B98;&#x65B9;&#x6559;&#x7A0B;&#x6837;&#x4F8B;&#x4E2D;&#x62F7;&#x8D1D;)</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  * webpack&#x914D;&#x7F6E;: webpack.config.js
    ```
    module.exports = {
      //&#x5165;&#x53E3;js
      entry: &apos;./index.js&apos;,
      //&#x7F16;&#x8BD1;&#x6253;&#x5305;&#x8F93;&#x51FA;
      output: {
        filename: &apos;bundle.js&apos;,
        publicPath: &apos;&apos;
      },
    
      module: {
        //&#x4F7F;&#x7528;&#x7684;loaders
        loaders: [
          {test: /\.js$/, exclude: /node_modules/, loader: &apos;babel-loader?presets[]=es2015&amp;presets[]=react&apos;}
        ]
      }
    }
    ```

  * &#x5305;&#x914D;&#x7F6E;: package.json
    ```
    {
      &quot;name&quot;: &quot;tutorial&quot;,
      &quot;version&quot;: &quot;1.0.0&quot;,
      &quot;description&quot;: &quot;&quot;,
      &quot;main&quot;: &quot;index.js&quot;,
      &quot;scripts&quot;: {
        &quot;start&quot;: &quot;webpack-dev-server --inline --content-base .&quot;
      },
      &quot;author&quot;: &quot;&quot;,
      &quot;license&quot;: &quot;ISC&quot;,
      &quot;dependencies&quot;: {
        &quot;react&quot;: &quot;^0.14.7&quot;,
        &quot;react-dom&quot;: &quot;^0.14.7&quot;,
        &quot;react-router&quot;: &quot;^2.0.0&quot;
      },
      &quot;devDependencies&quot;: {
        &quot;babel-core&quot;: &quot;^6.5.1&quot;,
        &quot;babel-loader&quot;: &quot;^6.2.2&quot;,
        &quot;babel-preset-es2015&quot;: &quot;^6.5.0&quot;,
        &quot;babel-preset-react&quot;: &quot;^6.5.0&quot;,
        &quot;http-server&quot;: &quot;^0.8.5&quot;,
        &quot;webpack&quot;: &quot;^1.12.13&quot;,
        &quot;webpack-dev-server&quot;: &quot;^1.14.1&quot;
      }
    }
    ```" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code>  * webpack&#x914D;&#x7F6E;: webpack.config.js
    ```
    <span class="hljs-keyword">module</span>.exports = {
      <span class="hljs-comment">//&#x5165;&#x53E3;js</span>
      entry: <span class="hljs-string">&apos;./index.js&apos;</span>,
      <span class="hljs-comment">//&#x7F16;&#x8BD1;&#x6253;&#x5305;&#x8F93;&#x51FA;</span>
      output: {
        filename: <span class="hljs-string">&apos;bundle.js&apos;</span>,
        publicPath: <span class="hljs-string">&apos;&apos;</span>
      },
    
      <span class="hljs-keyword">module</span>: {
        <span class="hljs-comment">//&#x4F7F;&#x7528;&#x7684;loaders</span>
        loaders: [
          {test: /\.js$/, exclude: /node_modules/, loader: <span class="hljs-string">&apos;babel-loader?presets[]=es2015&amp;presets[]=react&apos;</span>}
        ]
      }
    }
    ```

  * &#x5305;&#x914D;&#x7F6E;: package.json
    ```
    {
      <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;tutorial&quot;</span>,
      <span class="hljs-string">&quot;version&quot;</span>: <span class="hljs-string">&quot;1.0.0&quot;</span>,
      <span class="hljs-string">&quot;description&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
      <span class="hljs-string">&quot;main&quot;</span>: <span class="hljs-string">&quot;index.js&quot;</span>,
      <span class="hljs-string">&quot;scripts&quot;</span>: {
        <span class="hljs-string">&quot;start&quot;</span>: <span class="hljs-string">&quot;webpack-dev-server --inline --content-base .&quot;</span>
      },
      <span class="hljs-string">&quot;author&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
      <span class="hljs-string">&quot;license&quot;</span>: <span class="hljs-string">&quot;ISC&quot;</span>,
      <span class="hljs-string">&quot;dependencies&quot;</span>: {
        <span class="hljs-string">&quot;react&quot;</span>: <span class="hljs-string">&quot;^0.14.7&quot;</span>,
        <span class="hljs-string">&quot;react-dom&quot;</span>: <span class="hljs-string">&quot;^0.14.7&quot;</span>,
        <span class="hljs-string">&quot;react-router&quot;</span>: <span class="hljs-string">&quot;^2.0.0&quot;</span>
      },
      <span class="hljs-string">&quot;devDependencies&quot;</span>: {
        <span class="hljs-string">&quot;babel-core&quot;</span>: <span class="hljs-string">&quot;^6.5.1&quot;</span>,
        <span class="hljs-string">&quot;babel-loader&quot;</span>: <span class="hljs-string">&quot;^6.2.2&quot;</span>,
        <span class="hljs-string">&quot;babel-preset-es2015&quot;</span>: <span class="hljs-string">&quot;^6.5.0&quot;</span>,
        <span class="hljs-string">&quot;babel-preset-react&quot;</span>: <span class="hljs-string">&quot;^6.5.0&quot;</span>,
        <span class="hljs-string">&quot;http-server&quot;</span>: <span class="hljs-string">&quot;^0.8.5&quot;</span>,
        <span class="hljs-string">&quot;webpack&quot;</span>: <span class="hljs-string">&quot;^1.12.13&quot;</span>,
        <span class="hljs-string">&quot;webpack-dev-server&quot;</span>: <span class="hljs-string">&quot;^1.14.1&quot;</span>
      }
    }
    ```</code></pre><h2 id="articleHeader25">4. &#x7F16;&#x7801;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  * &#x5B9A;&#x4E49;&#x5404;&#x4E2A;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;
    * About.js
      ```
      import React from &apos;react&apos;
      function About() {
        return &lt;div&gt;About&#x7EC4;&#x4EF6;&#x5185;&#x5BB9;&lt;/div&gt;
      }
      export default About
      ```
    * Home.js
      ```
      import React from &apos;react&apos;
      function Home() {
        return &lt;div&gt;Home&#x7EC4;&#x4EF6;&#x5185;&#x5BB9;2&lt;/div&gt;
      }
      export default Home
      ```
    * Repos.js
      ```
      import React, {Component} from &apos;react&apos;
      export default class Repos extends Component {
        render() {
          return (
            &lt;div&gt;Repos&#x7EC4;&#x4EF6;&lt;/div&gt;
          )
        }
      }
      ```
  * &#x5B9A;&#x4E49;&#x5E94;&#x7528;&#x7EC4;&#x4EF6;: App.js
    ```
    import React, {Component} from &apos;react&apos;
    import {Link} from &apos;react-router&apos;
    
    export default class App extends Component {
      render() {
        return (
          &lt;div&gt;
            &lt;h2&gt;Hello, React Router!&lt;/h2&gt;
            &lt;ul&gt;
              &lt;li&gt;&lt;Link to=&quot;/about&quot; activeClassName=&quot;active&quot;&gt;About2&lt;/Link&gt;&lt;/li&gt;
              &lt;li&gt;&lt;Link to=&quot;/repos&quot; activeClassName=&quot;active&quot;&gt;Repos2&lt;/Link&gt;&lt;/li&gt;
            &lt;/ul&gt;
            {this.props.children}
          &lt;/div&gt;
        )
      }
    }
    ```
  * &#x5B9A;&#x4E49;&#x5165;&#x53E3;JS: index.js--&gt;&#x6E32;&#x67D3;&#x7EC4;&#x4EF6;
    ```
    import React from &apos;react&apos;
    import {render} from &apos;react-dom&apos;
    import {Router, Route, IndexRoute, hashHistory} from &apos;react-router&apos;
    import App from &apos;./modules/App&apos;
    import About from &apos;./modules/About&apos;
    import Repos from &apos;./modules/Repos&apos;
    import Home from &apos;./modules/Home&apos;
    
    render((
      &lt;Router history={hashHistory}&gt;
        &lt;Route path=&quot;/&quot; component={App}&gt;
          &lt;IndexRoute component={Home}/&gt;
          &lt;Route path=&quot;/about&quot; component={About}&gt;&lt;/Route&gt;
          &lt;Route path=&quot;/repos&quot; component={Repos}&gt;&lt;/Route&gt;
        &lt;/Route&gt;
      &lt;/Router&gt;
    ), document.getElementById(&apos;app&apos;))
    ```
  * &#x4E3B;&#x9875;&#x9762;: index.html
    ```
    &lt;style&gt;
      .active {
        color: red;
      }
    &lt;/style&gt;
    &lt;div id=app&gt;&lt;/div&gt;
    &lt;script src=&quot;bundle.js&quot;&gt;&lt;/script&gt;
    ```" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>  * &#x5B9A;&#x4E49;&#x5404;&#x4E2A;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;
    * About.js
      ```<span class="javascript">
      <span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">About</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>About&#x7EC4;&#x4EF6;&#x5185;&#x5BB9;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      }
      <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> About
      </span>```
    * Home.js
      ```<span class="javascript">
      <span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Home</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Home&#x7EC4;&#x4EF6;&#x5185;&#x5BB9;2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      }
      <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Home
      </span>```
    * Repos.js
      ```<span class="javascript">
      <span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>
      <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Repos</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
        render() {
          <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Repos&#x7EC4;&#x4EF6;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
          )
        }
      }
      </span>```
  * &#x5B9A;&#x4E49;&#x5E94;&#x7528;&#x7EC4;&#x4EF6;: App.js
    ```<span class="javascript">
    <span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>
    <span class="hljs-keyword">import</span> {Link} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-router&apos;</span>
    
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
      render() {
        <span class="hljs-keyword">return</span> (
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Hello, React Router!<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/about&quot;</span> <span class="hljs-attr">activeClassName</span>=<span class="hljs-string">&quot;active&quot;</span>&gt;</span>About2<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/repos&quot;</span> <span class="hljs-attr">activeClassName</span>=<span class="hljs-string">&quot;active&quot;</span>&gt;</span>Repos2<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            {this.props.children}
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
      }
    }
    </span>```
  * &#x5B9A;&#x4E49;&#x5165;&#x53E3;JS: index.js--&gt;&#x6E32;&#x67D3;&#x7EC4;&#x4EF6;
    ```<span class="javascript">
    <span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>
    <span class="hljs-keyword">import</span> {render} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-dom&apos;</span>
    <span class="hljs-keyword">import</span> {Router, Route, IndexRoute, hashHistory} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-router&apos;</span>
    <span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./modules/App&apos;</span>
    <span class="hljs-keyword">import</span> About <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./modules/About&apos;</span>
    <span class="hljs-keyword">import</span> Repos <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./modules/Repos&apos;</span>
    <span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./modules/Home&apos;</span>
    
    render((
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Router</span> <span class="hljs-attr">history</span>=<span class="hljs-string">{hashHistory}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/&quot;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{App}</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">IndexRoute</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Home}/</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/about&quot;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{About}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/repos&quot;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Repos}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span>
    ), document.getElementById(&apos;app&apos;))
    </span></span>```
  * &#x4E3B;&#x9875;&#x9762;: index.html
    ```<span class="javascript"><span class="xml">
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
      <span class="hljs-selector-class">.active</span> {
        <span class="hljs-attribute">color</span>: red;
      }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">app</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;bundle.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    </span></span>```</code></pre><h2 id="articleHeader26">5. &#x4F20;&#x9012;&#x8BF7;&#x6C42;&#x53C2;&#x6570;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  * repo.js: repos&#x7EC4;&#x4EF6;&#x4E0B;&#x7684;&#x5206;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;
    ```
    import React from &apos;react&apos;
    export default function ({params}) {
      let {username, repoName} = params
      return (
        &lt;div&gt;&#x7528;&#x6237;&#x540D;:{username}, &#x4ED3;&#x5E93;&#x540D;:{repoName}&lt;/div&gt;
      )
    }
    ```
  * repos.js
    ```
    import React from &apos;react&apos;
    import NavLink from &apos;./NavLink&apos;
    
    export default class Repos extends React.Component {
    
      constructor(props) {
        super(props);
        this.state = {
          repos: [
            {username: &apos;faceback&apos;, repoName: &apos;react&apos;},
            {username: &apos;faceback&apos;, repoName: &apos;react-router&apos;},
            {username: &apos;Angular&apos;, repoName: &apos;angular&apos;},
            {username: &apos;Angular&apos;, repoName: &apos;angular-cli&apos;}
          ]
        };
        this.handleSubmit = this.handleSubmit.bind(this)
      }
    
      handleSubmit () {
    
        const repos = this.state.repos
        repos.push({
          username: this.refs.username.value,
          repoName: this.refs.repoName.value
        })
        this.setState({repos})
        this.refs.username.value = &apos;&apos;
        this.refs.repoName.value = &apos;&apos;
      }
    
      render() {
        return (
          &lt;div&gt;
            &lt;h2&gt;Repos&lt;/h2&gt;
            &lt;ul&gt;
              {
                this.state.repos.map((repo, index) =&gt; {
                  const to = `/repos/${repo.username}/${repo.repoName}`
                  return (
                    &lt;li key={index}&gt;
                      &lt;Link to={to} activeClassName=&apos;active&apos;&gt;{repo.repoName}&lt;/Link&gt;
                    &lt;/li&gt;
                  )
                })
              }
              &lt;li&gt;
                &lt;form onSubmit={this.handleSubmit}&gt;
                  &lt;input type=&quot;text&quot; placeholder=&quot;&#x7528;&#x6237;&#x540D;&quot; ref=&apos;username&apos;/&gt; / {&apos; &apos;}
                  &lt;input type=&quot;text&quot; placeholder=&quot;&#x4ED3;&#x5E93;&#x540D;&quot; ref=&apos;repoName&apos;/&gt;{&apos; &apos;}
                  &lt;button type=&quot;submit&quot;&gt;&#x6DFB;&#x52A0;&lt;/button&gt;
                &lt;/form&gt;
              &lt;/li&gt;
            &lt;/ul&gt;
            {this.props.children}
          &lt;/div&gt;
        );
      }
    }
    ```
  * index.js: &#x914D;&#x7F6E;&#x8DEF;&#x7531;
    ```
    &lt;Route path=&quot;/repos&quot; component={Repos}&gt;
      &lt;Route path=&quot;/repos/:username/:repoName&quot; component={Repo}/&gt;
    &lt;/Route&gt;
    ```
6. &#x4F18;&#x5316;Link&#x7EC4;&#x4EF6;
  * NavLink.js
    ```
    import React from &apos;react&apos;
    import {Link} from &apos;react-router&apos;
    export default function NavLink(props) {
      return &lt;Link {...props} activeClassName=&quot;active&quot;/&gt;
    }
    ```
  * Repos.js
    ```
    &lt;NavLink to={to}&gt;{repo.repoName}&lt;/NavLink&gt;
    ```" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code>  * repo.js: repos&#x7EC4;&#x4EF6;&#x4E0B;&#x7684;&#x5206;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;
    ```
    <span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>
    <span class="hljs-keyword">export</span> default function ({params}) {
      <span class="hljs-keyword">let</span> {username, repoName} = params
      return (
        &lt;div&gt;&#x7528;&#x6237;&#x540D;:{username}, &#x4ED3;&#x5E93;&#x540D;:{repoName}&lt;/div&gt;
      )
    }
    ```
  * repos.js
    ```
    <span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>
    <span class="hljs-keyword">import</span> NavLink <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./NavLink&apos;</span>
    
    <span class="hljs-keyword">export</span> default <span class="hljs-keyword">class</span> Repos extends React.Component {
    
      constructor(props) {
        super(props);
        this.state = {
          repos: [
            {username: <span class="hljs-string">&apos;faceback&apos;</span>, repoName: <span class="hljs-string">&apos;react&apos;</span>},
            {username: <span class="hljs-string">&apos;faceback&apos;</span>, repoName: <span class="hljs-string">&apos;react-router&apos;</span>},
            {username: <span class="hljs-string">&apos;Angular&apos;</span>, repoName: <span class="hljs-string">&apos;angular&apos;</span>},
            {username: <span class="hljs-string">&apos;Angular&apos;</span>, repoName: <span class="hljs-string">&apos;angular-cli&apos;</span>}
          ]
        };
        this.handleSubmit = this.handleSubmit.bind(this)
      }
    
      handleSubmit () {
    
        const repos = this.state.repos
        repos.push({
          username: this.refs.username.value,
          repoName: this.refs.repoName.value
        })
        this.setState({repos})
        this.refs.username.value = <span class="hljs-string">&apos;&apos;</span>
        this.refs.repoName.value = <span class="hljs-string">&apos;&apos;</span>
      }
    
      render() {
        return (
          &lt;div&gt;
            &lt;h2&gt;Repos&lt;/h2&gt;
            &lt;ul&gt;
              {
                this.state.repos.map((repo, index) =&gt; {
                  const to = `/repos/${repo.username}/${repo.repoName}`
                  return (
                    &lt;li key={index}&gt;
                      &lt;Link to={to} activeClassName=<span class="hljs-string">&apos;active&apos;</span>&gt;{repo.repoName}&lt;/Link&gt;
                    &lt;/li&gt;
                  )
                })
              }
              &lt;li&gt;
                &lt;form onSubmit={this.handleSubmit}&gt;
                  &lt;input type=<span class="hljs-string">&quot;text&quot;</span> placeholder=<span class="hljs-string">&quot;&#x7528;&#x6237;&#x540D;&quot;</span> ref=<span class="hljs-string">&apos;username&apos;</span>/&gt; / {<span class="hljs-string">&apos; &apos;</span>}
                  &lt;input type=<span class="hljs-string">&quot;text&quot;</span> placeholder=<span class="hljs-string">&quot;&#x4ED3;&#x5E93;&#x540D;&quot;</span> ref=<span class="hljs-string">&apos;repoName&apos;</span>/&gt;{<span class="hljs-string">&apos; &apos;</span>}
                  &lt;button type=<span class="hljs-string">&quot;submit&quot;</span>&gt;&#x6DFB;&#x52A0;&lt;/button&gt;
                &lt;/form&gt;
              &lt;/li&gt;
            &lt;/ul&gt;
            {this.props.children}
          &lt;/div&gt;
        );
      }
    }
    ```
  * index.js: &#x914D;&#x7F6E;&#x8DEF;&#x7531;
    ```
    &lt;Route path=<span class="hljs-string">&quot;/repos&quot;</span> component={Repos}&gt;
      &lt;Route path=<span class="hljs-string">&quot;/repos/:username/:repoName&quot;</span> component={Repo}/&gt;
    &lt;/Route&gt;
    ```
<span class="hljs-number">6.</span> &#x4F18;&#x5316;Link&#x7EC4;&#x4EF6;
  * NavLink.js
    ```
    <span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>
    <span class="hljs-keyword">import</span> {Link} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-router&apos;</span>
    <span class="hljs-keyword">export</span> default function NavLink(props) {
      return &lt;Link {...props} activeClassName=<span class="hljs-string">&quot;active&quot;</span>/&gt;
    }
    ```
  * Repos.js
    ```
    &lt;NavLink to={to}&gt;{repo.repoName}&lt;/NavLink&gt;
    ```</code></pre><h1 id="articleHeader27">&#x4F7F;&#x7528;&#x5F00;&#x6E90;&#x7684;ant-design&#x5E93;&#x5F00;&#x53D1;&#x9879;&#x76EE;&#x6307;&#x5357;</h1><h2 id="articleHeader28">1. &#x6700;&#x6D41;&#x884C;&#x7684;&#x5F00;&#x6E90;React UI&#x7EC4;&#x4EF6;&#x5E93;</h2><ul><li><p>material-ui(&#x56FD;&#x5916;)</p><ul><li>&#x5B98;&#x7F51;: <a href="http://www.material-ui.com/#/" rel="nofollow noreferrer" target="_blank">http://www.material-ui.com/#/</a></li><li>github: <a href="https://github.com/callemall/material-ui" rel="nofollow noreferrer" target="_blank">https://github.com/callemall/...</a></li></ul></li><li><p>ant-design(&#x56FD;&#x5185;&#x8682;&#x8681;&#x91D1;&#x670D;)</p><ul><li>&#x5B98;&#x7F51;: <a href="https://ant.design/" rel="nofollow noreferrer" target="_blank">https://ant.design/</a></li><li>github: <a href="https://github.com/ant-design/ant-design/" rel="nofollow noreferrer" target="_blank">https://github.com/ant-design...</a></li></ul></li></ul><h2 id="articleHeader29">2. ant-design&#x4F7F;&#x7528;&#x5165;&#x95E8;</h2><h3 id="articleHeader30">&#x4F7F;&#x7528;create-react-app&#x642D;&#x5EFA;react&#x5F00;&#x53D1;&#x73AF;&#x5883;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install create-react-app -g
create-react-app antd-demo
cd antd-demo
npm start" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dsconfig"><code><span class="hljs-string">npm </span><span class="hljs-string">install </span><span class="hljs-built_in">create-react-app</span> -g
<span class="hljs-built_in">create-react-app</span> <span class="hljs-string">antd-demo
</span><span class="hljs-string">cd </span><span class="hljs-string">antd-demo
</span><span class="hljs-string">npm </span><span class="hljs-string">start</span></code></pre><h3 id="articleHeader31">&#x642D;&#x5EFA;antd&#x7684;&#x57FA;&#x672C;&#x5F00;&#x53D1;&#x73AF;&#x5883;</h3><ul><li><p>&#x4E0B;&#x8F7D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install antd --save" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> antd <span class="hljs-comment">--save</span></code></pre></li><li><p>src/App.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  
  import React, { Component } from &apos;react&apos;;
  import { Button } from &apos;antd&apos;;
  import &apos;./App.css&apos;;
  
  class App extends Component {
    render() {
      return (
        &lt;div className=&quot;App&quot;&gt;
          &lt;Button type=&quot;primary&quot;&gt;Button&lt;/Button&gt;
        &lt;/div&gt;
      );
    }
  }

  export default App;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code>  
  <span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">&apos;reac</span>t&apos;;
  <span class="hljs-keyword">import</span> { <span class="hljs-type">Button</span> } from <span class="hljs-symbol">&apos;ant</span>d&apos;;
  <span class="hljs-keyword">import</span> &apos;./<span class="hljs-type">App</span>.css&apos;;
  
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
      <span class="hljs-keyword">return</span> (
        &lt;div className=<span class="hljs-string">&quot;App&quot;</span>&gt;
          &lt;<span class="hljs-type">Button</span> <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">&quot;primary&quot;</span>&gt;<span class="hljs-type">Button</span>&lt;/<span class="hljs-type">Button</span>&gt;
        &lt;/div&gt;
      );
    }
  }

  export <span class="hljs-keyword">default</span> <span class="hljs-type">App</span>;
</code></pre></li><li><p>src/App.css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  @import &apos;~antd/dist/antd.css&apos;;
  
  .App {
    text-align: center;
  }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>  @<span class="hljs-keyword">import</span> <span class="hljs-string">&apos;~antd/dist/antd.css&apos;</span>;
  
  <span class="hljs-selector-class">.App</span> {
    <span class="hljs-attribute">text-align</span>: center;
  }
</code></pre></li></ul><h3 id="articleHeader32">&#x5B9E;&#x73B0;&#x6309;&#x9700;&#x52A0;&#x8F7D;(css/js)</h3><ul><li><p>&#x4F7F;&#x7528; eject &#x547D;&#x4EE4;&#x5C06;&#x6240;&#x6709;&#x5185;&#x5EFA;&#x7684;&#x914D;&#x7F6E;&#x66B4;&#x9732;&#x51FA;&#x6765;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run eject" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">run</span><span class="bash"> eject</span></code></pre></li><li><p>&#x4E0B;&#x8F7D;babel-plugin-import(&#x7528;&#x4E8E;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#x7EC4;&#x4EF6;&#x4EE3;&#x7801;&#x548C;&#x6837;&#x5F0F;&#x7684; babel &#x63D2;&#x4EF6;)</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install babel-plugin-import --save-dev" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> babel-<span class="hljs-keyword">plugin</span>-<span class="hljs-keyword">import</span> <span class="hljs-comment">--save-dev</span></code></pre></li><li><p>&#x4FEE;&#x6539;&#x914D;&#x7F6E;: config/webpack.config.dev.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // Process JS with Babel.
  {
    test: /\.(js|jsx)$/,
    include: paths.appSrc,
    loader: &apos;babel&apos;,
    query: {
  +   plugins: [
  +     [&apos;import&apos;, [{ libraryName: &quot;antd&quot;, style: &apos;css&apos; }]],
  +   ],
      // This is a feature of `babel-loader` for webpack (not Babel itself).
      // It enables caching results in ./node_modules/.cache/babel-loader/
      // directory for faster rebuilds.
      cacheDirectory: true
    }
   },
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>  <span class="hljs-regexp">//</span> Process JS with Babel.
  {
    test: <span class="hljs-regexp">/\.(js|jsx)$/</span>,
    include: paths.appSrc,
    loader: <span class="hljs-string">&apos;babel&apos;</span>,
    query: {
  +   plugins: [
  +     [<span class="hljs-string">&apos;import&apos;</span>, [{ libraryName: <span class="hljs-string">&quot;antd&quot;</span>, style: <span class="hljs-string">&apos;css&apos;</span> }]],
  +   ],
      <span class="hljs-regexp">//</span> This <span class="hljs-keyword">is</span> a feature <span class="hljs-keyword">of</span> `<span class="javascript">babel-loader</span>` <span class="hljs-keyword">for</span> webpack (<span class="hljs-keyword">not</span> Babel itself).
      <span class="hljs-regexp">//</span> It enables caching results <span class="hljs-keyword">in</span> .<span class="hljs-regexp">/node_modules/</span>.cache<span class="hljs-regexp">/babel-loader/</span>
      <span class="hljs-regexp">//</span> directory <span class="hljs-keyword">for</span> faster rebuilds.
      cacheDirectory: <span class="hljs-literal">true</span>
    }
   },
</code></pre></li><li><p>&#x53BB;&#x9664;&#x5F15;&#x5165;&#x5168;&#x91CF;&#x6837;&#x5F0F;&#x7684;&#x8BED;&#x53E5;: src/App.css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@import &apos;~antd/dist/antd.css&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs arduino"><code style="word-break:break-word;white-space:initial">@<span class="hljs-keyword">import</span> <span class="hljs-string">&apos;~antd/dist/antd.css&apos;</span></code></pre></li></ul><blockquote>&#x613F;&#x4F60;&#x6210;&#x4E3A;&#x7EC8;&#x8EAB;&#x5B66;&#x4E60;&#x8005;</blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React学习笔记知识点整理

## 原文链接
[https://segmentfault.com/a/1190000015427412](https://segmentfault.com/a/1190000015427412)

