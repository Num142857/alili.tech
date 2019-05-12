---
title: 'React源码解读之ComponentMount' 
date: 2018-11-23 2:30:10
hidden: true
slug: 32sd9qlb8ju
categories: [reprint]
---

{{< raw >}}
<p>&#x4F5C;&#x4E3A;&#x521D;&#x7EA7;&#x7801;&#x519C;&#x4E0D;&#x8BE5;&#x5929;&#x82B1;&#x4E71;&#x5760;&#x5927;&#x8BB2;&#x60C5;&#x6000;&#xFF0C;&#x4E00;&#x5F00;&#x59CB;&#x5165;&#x5751;&#x4E86;&#x51E0;&#x5929;&#x5BF9;&#x4E8E;&#x5F88;&#x591A;&#x5730;&#x65B9;&#x5145;&#x6EE1;&#x4E86;&#x7231;&#x8FEA;&#x751F;&#x822C;&#x7684;&#x8BF8;&#x591A;&#x7591;&#x95EE;(&#x83AB;&#x540D;&#x628A;&#x81EA;&#x5DF1;&#x5938;&#x4E86;&#x4E00;&#x6CE2;&#xFF0C;XD)&#xFF0C;&#x6240;&#x4EE5;&#x6253;&#x7B97;&#x770B;&#x4E00;&#x6CE2;&#x6E90;&#x4EE3;&#x7801;&#xFF0C;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x53EF;&#x4EE5;&#x8BF4;&#x662F;&#x975E;&#x5E38;&#x66F2;&#x6298;&#xFF0C;&#x672C;&#x4EBA;&#x667A;&#x5546;&#x4E0D;&#x9AD8;&#xFF0C;&#x770B;&#x4E86;&#x56DB;&#x4E94;&#x904D;&#x90E8;&#x5206;&#x6E90;&#x7801;&#x540E;&#xFF0C;&#x4E00;&#x8138;&#x61F5;&#x903C;&#xFF0C;&#x4E8E;&#x662F;&#x5728;&#x63A5;&#x4E0B;&#x6765;&#x7684;&#x4E00;&#x5468;&#x5185;&#x5904;&#x4E8E;&#x6D51;&#x6D51;&#x5669;&#x5669;&#xFF0C;&#x82E5;&#x5373;&#x82E5;&#x79BB;&#x7684;&#x62BD;&#x79BB;&#x72B6;&#x6001;&#xFF0C;&#x4E8E;&#x662F;&#x653E;&#x5F03;&#x4E86;&#x89E3;&#x8BFB;&#xFF0C;&#x6700;&#x8FD1;&#x611F;&#x89C9;&#x5B66;&#x4E60;react&#x6709;&#x4E24;&#x4E2A;&#x6708;&#x4E86;&#xFF0C;&#x516C;&#x53F8;&#x5927;&#x725B;&#x7684;&#x6559;&#x8BF2;&#x548C;&#x542F;&#x53D1;&#xFF0C;&#x6253;&#x7B97;&#x539F;&#x8DEF;&#x6298;&#x56DE;&#x518D;&#x6B21;&#x62FE;&#x8D77;react&#x8FD9;&#x4E2A;&#x80D6;&#x5C0F;&#x5B69;&#xFF0C;&#x4E0D;&#x5F97;&#x4E0D;&#x8BF4;&#x6709;&#x5927;&#x725B;&#x7684;&#x5E2E;&#x52A9;&#x771F;&#x4F1A;&#x8BA9;&#x4F60;&#x8FDB;&#x6B65;&#x98DE;&#x5FEB;&#x3002;</p><p>&#x8FD9;&#x662F;&#x672C;&#x4EBA;&#x7684;&#x7B2C;&#x4E00;&#x7BC7;react&#x76F8;&#x5173;&#x7684;&#x6587;&#x7AE0;&#xFF0C;&#x672C;&#x6765;&#x53EA;&#x662F;&#x7559;&#x4F5C;&#x81EA;&#x5DF1;&#x7B14;&#x8BB0;&#x4E4B;&#x7528;&#xFF0C;&#x7ED3;&#x679C;&#x7B14;&#x8BB0;&#x8D8A;&#x5199;&#x8D8A;&#x591A;&#xFF0C;&#x4E00;&#x65B9;&#x9762;&#x662F;&#x4E3A;&#x4E86;&#x52A0;&#x6DF1;&#x81EA;&#x5DF1;&#x5BF9;&#x4E8E;&#x4F18;&#x96C5;&#x7684;react&#x7684;&#x7406;&#x89E3;&#xFF0C;&#x53E6;&#x4E00;&#x65B9;&#x9762;&#x4E3A;&#x4E86;&#x7ED9;&#x8BA1;&#x5212;&#x5B66;&#x4E60;react&#x7684;&#x65C1;&#x53CB;&#x4EEC;&#x63D0;&#x4F9B;&#x4E00;&#x70B9;&#x5FAE;&#x4E0D;&#x8DB3;&#x9053;&#x7684;&#x5C0F;&#x601D;&#x8DEF;&#x3002; &#x5F53;&#x7136;&#x4E00;&#x63D0;&#x5230;&#x5206;&#x6790;&#x89E3;&#x8BFB;&#x6E90;&#x7801;&#xFF0C;&#x8FD9;&#x51E0;&#x4E2A;&#x5E84;&#x91CD;&#x7684;&#x5B57;&#x773C;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x9996;&#x5148;&#x662F;&#x6CB9;&#x7136;&#x800C;&#x751F;&#x7684;&#x6D53;&#x6D53;&#x7684;&#x81EA;&#x8C6A;&#x611F;&#xFF0C;&#x81EA;&#x8C6A;&#x611F;&#x4E0D;&#x80FD;&#x767D;&#x6765;&#xFF0C;&#x56E0;&#x6B64;&#x4E5F;&#x662F;&#x8C28;&#x614E;&#x5730;&#x7FFB;&#x5899;&#x770B;&#x4E86;&#x5F88;&#x591A;&#x522B;&#x4EBA;&#x7684;&#x89E3;&#x8BFB;&#xFF0C;&#x5BF9;&#x4E8E;&#x4E00;&#x4E9B;&#x5927;&#x795E;&#x4EEC;&#x89E3;&#x8BFB;&#x9996;&#x5148;&#x662F;&#x656C;&#x4F69;&#xFF0C;&#x7136;&#x540E;&#x89C9;&#x5F97;&#x5E94;&#x8BE5;&#x4EFF;&#x6548;&#x4ED6;&#x4EEC;&#x8FDB;&#x884C;&#x66F4;&#x591A;&#x8BE6;&#x7EC6;&#x7684;&#x8865;&#x5145;&#xFF0C;&#x5F53;&#x7136;&#x5199;&#x7684;&#x6709;&#x6240;&#x7EB0;&#x6F0F;&#xFF0C;&#x4E0D;&#x8DB3;&#x4E4B;&#x5904;&#x8FD8;&#x5E0C;&#x671B;&#x5927;&#x795E;&#x4EEC;&#x6307;&#x51FA;&#x3002;</p><p>&#x5E9F;&#x8BDD;&#x592A;&#x591A;&#x4E86;&#xFF0C;&#x8FDB;&#x5165;&#x6B63;&#x9898;&#xFF0C;&#x4E0B;&#x9762;&#x662F;&#x6211;&#x81EA;&#x5DF1;&#x5217;&#x51FA;&#x7684;TODOList&#xFF0C;&#x5728;&#x8BFB;&#x6E90;&#x7801;&#x524D;&#x5E94;&#x8BE5;&#x9700;&#x8981;&#x7406;&#x89E3;&#x4E00;&#x4E9B;&#x76F8;&#x5173;&#x7684;&#x8981;&#x70B9;</p><h2 id="articleHeader0">1.&#x4EC0;&#x4E48;&#x662F;JSX?</h2><p>JSX &#x7684;&#x5B98;&#x65B9;&#x5B9A;&#x4E49;&#x662F;&#x7C7B; XML &#x8BED;&#x6CD5;&#x7684; ECMAScript &#x6269;&#x5C55;&#x3002;&#x5B83;&#x5B8C;&#x7F8E;&#x5730;&#x5229;&#x7528;&#x4E86; JavaScript &#x81EA;&#x5E26;&#x7684;&#x8BED;&#x6CD5; &#x548C;&#x7279;&#x6027;&#xFF0C;&#x5E76;&#x4F7F;&#x7528;&#x5927;&#x5BB6;&#x719F;&#x6089;&#x7684; HTML &#x8BED;&#x6CD5;&#x6765;&#x521B;&#x5EFA;&#x865A;&#x62DF;&#x5143;&#x7D20;&#x3002;&#x4F7F;&#x7528;&#x7C7B; XML &#x8BED;&#x6CD5;&#x7684;&#x597D;&#x5904;&#x662F;&#x6807;&#x7B7E;&#x53EF;&#x4EE5;&#x4EFB;&#x610F;&#x5D4C;&#x5957;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x50CF;HTML&#x4E00;&#x6837;&#x6E05;&#x6670;&#x5730;&#x770B;&#x5230;DOM&#x6811;</p><p>JSX &#x5C06; HTML &#x8BED;&#x6CD5;&#x76F4;&#x63A5;&#x52A0;&#x5165;&#x5230; JavaScript&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x5728;&#x5B9E;&#x9645;&#x5F00;&#x53D1;&#x4E2D;&#xFF0C;JSX&#x5728;&#x4EA7;&#x54C1;&#x6253;&#x5305;&#x9636;&#x6BB5;&#x90FD;&#x5DF2;&#x7ECF;&#x7F16;&#x8BD1;&#x6210;&#x7EAF;JavaScript&#xFF0C;&#x4E0D;&#x4F1A;&#x5E26;&#x6765;&#x4EFB;&#x4F55;&#x526F;&#x4F5C;&#x7528;&#xFF0C;&#x53CD;&#x800C;&#x4F1A;&#x8BA9;&#x4EE3;&#x7801;&#x66F4;&#x52A0;&#x76F4;&#x89C2;&#x5E76;&#x6613;&#x4E8E;&#x7EF4;&#x62A4;&#x3002;</p><p>&#x66F4;&#x591A;&#x8BE6;&#x89C1;&#xFF1A;<a href="https://blog.csdn.net/a153375250/article/details/53434299" rel="nofollow noreferrer" target="_blank">CSDN</a></p><h2 id="articleHeader1">2.React.createElement</h2><p>React.createElement(type, config, children) &#x505A;&#x4E86;&#x4E09;&#x4EF6;&#x4E8B;&#xFF1A;</p><ul><li>&#x628A; config&#x91CC;&#x7684;&#x6570;&#x636E;&#x4E00;&#x9879;&#x4E00;&#x9879;&#x62F7;&#x5165;props,</li><li>&#x62F7;&#x8D1D; children &#x5230; props.children,</li><li>&#x62F7;&#x8D1D; type.defaultProps &#x5230; props;</li></ul><h2 id="articleHeader2">3.&#x7EC4;&#x4EF6;&#x751F;&#x547D;&#x5468;&#x671F;</h2><p><span class="img-wrap"><img data-src="/img/bVOZrW?w=2803&amp;h=2945" src="https://static.alili.tech/img/bVOZrW?w=2803&amp;h=2945" alt="1b2ff98c-1ee1-11e7-9f5a-59eb84171b53.png" title="1b2ff98c-1ee1-11e7-9f5a-59eb84171b53.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader3">4.renderedElement&#x548C;ReactDOMComponent</h2><p><code>ReactElement</code>&#x662F;React&#x5143;&#x7D20;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#x7684;&#x8868;&#x793A;&#x5F62;&#x5F0F;,&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x4E00;&#x4E2A;&#x6570;&#x636E;&#x7C7B;&#xFF0C;&#x5305;&#x542B;type&#xFF0C;key&#xFF0C;refs&#xFF0C;props&#x7B49;&#x6210;&#x5458;&#x53D8;&#x91CF;,<br><code>ReactComponent</code>&#x662F;React&#x5143;&#x7D20;&#x7684;&#x64CD;&#x4F5C;&#x7C7B;&#xFF0C;&#x5305;&#x542B;mountComponent(), updateComponent()&#x7B49;&#x5F88;&#x591A;&#x64CD;&#x4F5C;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x4E3B;&#x8981;&#x6709;ReactDOMComponent, ReactCompositeComponent, ReactDOMTextComponent, ReactDOMEmptyComponent&#x56DB;&#x4E2A;&#x7C7B;&#x578B;</p><p><strong>&#x63A5;&#x4E0B;&#x6765;&#x914D;&#x5408;&#x4E00;&#x4E2A;&#x5C0F;&#x4F8B;&#x5B50;&#x6765;&#x5927;&#x6982;&#x5206;&#x6790;&#x4E0B;react&#x5185;&#x90E8;&#x795E;&#x79D8;&#x7684;&#x7EC4;&#x4EF6;&#x6302;&#x8F7D;&#x64CD;&#x4F5C;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
    &lt;head&gt;
        &lt;meta charset=&quot;UTF-8&quot;&gt;
        &lt;title&gt;Document&lt;/title&gt;
        &lt;script src=&quot;./js/react.js&quot;&gt;&lt;/script&gt;
        &lt;script src=&quot;./js/react-dom.js&quot;&gt;&lt;/script&gt;
        &lt;script src=&quot;./js/browser.js&quot;&gt;&lt;/script&gt;
        &lt;script type=&quot;text/babel&quot;&gt;
          class Children extends React.Component {
              constructor(...args) {
                  super(...args);
              }

              render() {
                  return &lt;div&gt;children&lt;/div&gt;
              }
          }

            class Comp extends React.Component{
                constructor(...args) {
                    super(...args);
                    this.state = {i: 0}
                }
                render(){
                    return &lt;div onClick={() =&gt; {
                        this.setState({i: this.state.i + 1})
                    "}}"&gt;Hello, world! {this.props.name}, &#x5E74;&#x9F84;{this.props.age} {this.state.i} &lt;i&gt;222&lt;/i&gt;&lt;Children /&gt;&lt;/div&gt;;
                }
            }
            window.onload = function(){
                var oDiv = document.getElementById(&apos;div1&apos;);
                ReactDOM.render(
                    &lt;Comp name=&quot;zjf&quot; age=&apos;24&apos;/&gt;,
                    oDiv
                );
            }
        &lt;/script&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;div id=&quot;div1&quot;&gt;&lt;div&gt;2222&lt;/div&gt;&lt;/div&gt;
    &lt;/body&gt;
&lt;/html&gt;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./js/react.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./js/react-dom.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./js/browser.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/babel&quot;</span>&gt;</span><span class="javascript">
          <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Children</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
              <span class="hljs-keyword">constructor</span>(...args) {
                  <span class="hljs-keyword">super</span>(...args);
              }

              render() {
                  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>children<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
              }
          }

            <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Comp</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
                <span class="hljs-keyword">constructor</span>(...args) {
                    <span class="hljs-keyword">super</span>(...args);
                    <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">i</span>: <span class="hljs-number">0</span>}
                }
                render(){
                    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> {
                        this.setState({i: this.state.i + 1})
                    "}}"&gt;Hello, world! {this.props.name}, &#x5E74;&#x9F84;{this.props.age} {this.state.i} <span class="hljs-tag">&lt;<span class="hljs-name">i</span>&gt;</span>222<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Children</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
                }
            }
            <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-keyword">var</span> oDiv = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;div1&apos;</span>);
                ReactDOM.render(
                    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Comp</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;zjf&quot;</span> <span class="hljs-attr">age</span>=<span class="hljs-string">&apos;24&apos;</span>/&gt;</span>,
                    oDiv
                );
            }
        </span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;div1&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>2222<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>

</code></pre><p><strong>&#x672C;&#x6B21;&#x6E90;&#x7801;&#x5206;&#x6790;&#x7684;&#x7248;&#x672C;&#x53F7;&#x662F;v15.6.0(160&#x4E4B;&#x540E;&#x53D8;&#x5316;&#x5F88;&#x5927;&#x6709;&#x70B9;&#x770B;&#x4E0D;&#x61C2;),&#x53EF;&#x4EE5;&#x4F7F;&#x7528;git reset --hard v15.6.0&#x64CD;&#x4F5C;&#x8FDB;&#x884C;&#x7248;&#x672C;&#x56DE;&#x9000;</strong><br>&#x9996;&#x5148;&#x51FD;&#x6570;&#x7684;&#x5165;&#x53E3;&#x662F;reactDOM.render(), &#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x653E;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x4E3A;&#x9700;&#x8981;&#x6E32;&#x67D3;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x4E3A;&#x7B2C;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x6302;&#x8F7D;&#x7684;&#x5BF9;&#x8C61;&#x3002;<br>&#x901A;&#x8FC7;&#x8C03;&#x7528;ReactDom.render() -&gt; &#x8C03;&#x7528;ReactMount.render() -&gt; &#x8C03;&#x7528;renderSubtreeIntoContainer, &#x5728;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x91CC;&#x4E2A;&#x4EBA;&#x8BA4;&#x4E3A;&#x9700;&#x8981;&#x77E5;&#x9053;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// parentComponent&#x4E00;&#x822C;&#x4E3A;null, nextElement&#xFF0C;container&#x5206;&#x522B;&#x4E3A;reactDOM.render&#x4E2D;&#x7684;&#x524D;&#x4E24;&#x4E2A;&#x53C2;&#x6570;
renderSubtreeIntoContainer(parentComponent, nextElement, container, callback){
    // ...
    // TopLevelWrapper&#x4E3A;&#x9876;&#x7EA7;&#x5BB9;&#x5668;&#xFF0C;&#x7C7B;&#x578B;&#x4E3A;object(&#x5176;&#x5B9E;&#x662F;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;)&#xFF0C;&#x5185;&#x90E8;&#x6709;&#x4E2A;rootID&#x5C5E;&#x6027;&#xFF0C;&#x503C;&#x5F97;&#x6CE8;&#x610F;&#x7684;&#x662F;&#x8BE5;&#x65B9;&#x6CD5;&#x539F;&#x578B;&#x94FE;&#x4E0A;&#x6709;render&#x65B9;&#x6CD5;,&#x8BE5;&#x65B9;&#x6CD5;&#x662F;&#x7B2C;&#x4E00;&#x4E2A;&#x88AB;&#x8C03;&#x7528;&#x7684;&#xFF0C;&#x5B83;&#x5E94;&#x8BE5;&#x5F88;&#x81EA;&#x8C6A;
    var nextWrappedElement = React.createElement(TopLevelWrapper, {
      child: nextElement
    });
    // &#x5F00;&#x59CB;&#x8FDB;&#x5165;&#x6B63;&#x8F68;&#xFF0C;&#x8BE5;&#x65B9;&#x6CD5;&#x5185;&#x90E8;&#x4F1A;&#x6839;&#x636E;nextWrapperElement&#x751F;&#x6210;&#x76F8;&#x5E94;&#x7C7B;&#x578B;&#x7684;&#x7EC4;&#x4EF6;
    var component = ReactMount._renderNewRootComponent(nextWrappedElement, container, shouldReuseMarkup, nextContext)._renderedComponent.getPublicInstance()
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code><span class="hljs-comment">// parentComponent&#x4E00;&#x822C;&#x4E3A;null, nextElement&#xFF0C;container&#x5206;&#x522B;&#x4E3A;reactDOM.render&#x4E2D;&#x7684;&#x524D;&#x4E24;&#x4E2A;&#x53C2;&#x6570;</span>
renderSubtreeIntoContainer(parentComponent, nextElement, container, <span class="hljs-keyword">callback</span>){
    <span class="hljs-comment">// ...</span>
    <span class="hljs-comment">// TopLevelWrapper&#x4E3A;&#x9876;&#x7EA7;&#x5BB9;&#x5668;&#xFF0C;&#x7C7B;&#x578B;&#x4E3A;object(&#x5176;&#x5B9E;&#x662F;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;)&#xFF0C;&#x5185;&#x90E8;&#x6709;&#x4E2A;rootID&#x5C5E;&#x6027;&#xFF0C;&#x503C;&#x5F97;&#x6CE8;&#x610F;&#x7684;&#x662F;&#x8BE5;&#x65B9;&#x6CD5;&#x539F;&#x578B;&#x94FE;&#x4E0A;&#x6709;render&#x65B9;&#x6CD5;,&#x8BE5;&#x65B9;&#x6CD5;&#x662F;&#x7B2C;&#x4E00;&#x4E2A;&#x88AB;&#x8C03;&#x7528;&#x7684;&#xFF0C;&#x5B83;&#x5E94;&#x8BE5;&#x5F88;&#x81EA;&#x8C6A;</span>
    <span class="hljs-keyword">var</span> nextWrappedElement = React.createElement(TopLevelWrapper, {
      child: <span class="hljs-type">nextElement</span>
    });
    <span class="hljs-comment">// &#x5F00;&#x59CB;&#x8FDB;&#x5165;&#x6B63;&#x8F68;&#xFF0C;&#x8BE5;&#x65B9;&#x6CD5;&#x5185;&#x90E8;&#x4F1A;&#x6839;&#x636E;nextWrapperElement&#x751F;&#x6210;&#x76F8;&#x5E94;&#x7C7B;&#x578B;&#x7684;&#x7EC4;&#x4EF6;</span>
    <span class="hljs-keyword">var</span> component = ReactMount._renderNewRootComponent(nextWrappedElement, container, shouldReuseMarkup, nextContext)._renderedComponent.getPublicInstance()
}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_renderNewRootComponent: function (nextElement, container, shouldReuseMarkup, context) {

  // &#x5B9E;&#x4F8B;&#x5316;&#x7EC4;&#x4EF6;&#xFF0C;&#x901A;&#x8FC7;nextElement.type&#x5224;&#x65AD;&#xFF0C;string,object&#x751F;&#x6210;ReactDOMComponent&#xFF0C; ReactCompositeComponent&#x5982;&#x679C;&#x4E0D;&#x5B58;&#x5728;nextElement&#x5219;&#x751F;&#x6210;ReactEmptyComponent&#xFF0C;&#x5982;&#x679C;typeof nextElement&#x7C7B;&#x578B;&#x4E3A;string&#x6216;&#x8005;number&#x76F4;&#x63A5;&#x751F;&#x6210;ReactDOMTextComponent
  var componentInstance = instantiateReactComponent(nextElement, false);

  // The initial render is synchronous but any updates that happen during, rendering, in componentWillMount or componentDidMount, will be batched according to the current batching strategy.

  ReactUpdates.batchedUpdates(batchedMountComponentIntoNode, componentInstance, container, shouldReuseMarkup, context);
  
  return componentInstance;
}," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">_renderNewRootComponent: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">nextElement, container, shouldReuseMarkup, context</span>) </span>{

  <span class="hljs-comment">// &#x5B9E;&#x4F8B;&#x5316;&#x7EC4;&#x4EF6;&#xFF0C;&#x901A;&#x8FC7;nextElement.type&#x5224;&#x65AD;&#xFF0C;string,object&#x751F;&#x6210;ReactDOMComponent&#xFF0C; ReactCompositeComponent&#x5982;&#x679C;&#x4E0D;&#x5B58;&#x5728;nextElement&#x5219;&#x751F;&#x6210;ReactEmptyComponent&#xFF0C;&#x5982;&#x679C;typeof nextElement&#x7C7B;&#x578B;&#x4E3A;string&#x6216;&#x8005;number&#x76F4;&#x63A5;&#x751F;&#x6210;ReactDOMTextComponent</span>
  <span class="hljs-keyword">var</span> componentInstance = instantiateReactComponent(nextElement, <span class="hljs-literal">false</span>);

  <span class="hljs-comment">// The initial render is synchronous but any updates that happen during, rendering, in componentWillMount or componentDidMount, will be batched according to the current batching strategy.</span>

  ReactUpdates.batchedUpdates(batchedMountComponentIntoNode, componentInstance, container, shouldReuseMarkup, context);
  
  <span class="hljs-keyword">return</span> componentInstance;
},</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// transaction.perform&#x5176;&#x5B9E;&#x662F;&#x4E8B;&#x52A1;&#xFF0C;&#x4E8B;&#x52A1;&#x4E2D;&#x7B80;&#x5355;&#x5730;&#x8BF4;&#x6709;initialize-&gt;&#x6267;&#x884C;perform&#x7B2C;&#x4E00;&#x4E2A;callback-&gt;close&#x64CD;&#x4F5C;&#xFF0C;&#x51C6;&#x5907;&#x5728;setState&#x4ECB;&#x7ECD;
function batchedMountComponentIntoNode(componentInstance, container, shouldReuseMarkup, context) {
  //
  var transaction = ReactUpdates.ReactReconcileTransaction.getPooled(
  /* useCreateElement */
  !shouldReuseMarkup &amp;&amp; ReactDOMFeatureFlags.useCreateElement);
  transaction.perform(mountComponentIntoNode, null, componentInstance, container, transaction, shouldReuseMarkup, context);
  ReactUpdates.ReactReconcileTransaction.release(transaction);
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-comment">// transaction.perform&#x5176;&#x5B9E;&#x662F;&#x4E8B;&#x52A1;&#xFF0C;&#x4E8B;&#x52A1;&#x4E2D;&#x7B80;&#x5355;&#x5730;&#x8BF4;&#x6709;initialize-&gt;&#x6267;&#x884C;perform&#x7B2C;&#x4E00;&#x4E2A;callback-&gt;close&#x64CD;&#x4F5C;&#xFF0C;&#x51C6;&#x5907;&#x5728;setState&#x4ECB;&#x7ECD;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">batchedMountComponentIntoNode</span><span class="hljs-params">(componentInstance, container, shouldReuseMarkup, context)</span> </span>{
  <span class="hljs-comment">//</span>
  <span class="hljs-keyword">var</span> transaction = ReactUpdates.ReactReconcileTransaction.getPooled(
  <span class="hljs-comment">/* useCreateElement */</span>
  !shouldReuseMarkup &amp;&amp; ReactDOMFeatureFlags.useCreateElement);
  transaction.perform(mountComponentIntoNode, <span class="hljs-literal">null</span>, componentInstance, container, transaction, shouldReuseMarkup, context);
  ReactUpdates.ReactReconcileTransaction.release(transaction);
}
</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function mountComponentIntoNode(wrapperInstance, container, transaction, shouldReuseMarkup, context) {
  // &#x6839;&#x636E;wrapperInstance&#x6765;&#x8C03;&#x7528;&#x4E0D;&#x540C;&#x7EC4;&#x4EF6;&#x7C7B;&#x578B;&#x7684;mountComponent&#x65B9;&#x6CD5;
  var markup = ReactReconciler.mountComponent(wrapperInstance, transaction, null, ReactDOMContainerInfo(wrapperInstance, container), context, 0 /* parentDebugID */);
  wrapperInstance._renderedComponent._topLevelWrapper = wrapperInstance;
  // setInnerHTML(container, markup)&#xFF0C;&#x6700;&#x7EC8;&#x4F1A;&#x5C06;markup&#x865A;&#x62DF;&#x8282;&#x70B9;&#x63D2;&#x5165;&#x771F;&#x6B63;&#x7684;DOM&#x6811;
  ReactMount._mountImageIntoNode(markup, container, wrapperInstance, shouldReuseMarkup, transaction);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mountComponentIntoNode</span><span class="hljs-params">(wrapperInstance, container, transaction, shouldReuseMarkup, context)</span> </span>{
  <span class="hljs-comment">// &#x6839;&#x636E;wrapperInstance&#x6765;&#x8C03;&#x7528;&#x4E0D;&#x540C;&#x7EC4;&#x4EF6;&#x7C7B;&#x578B;&#x7684;mountComponent&#x65B9;&#x6CD5;</span>
  <span class="hljs-keyword">var</span> markup = ReactReconciler.mountComponent(wrapperInstance, transaction, <span class="hljs-literal">null</span>, ReactDOMContainerInfo(wrapperInstance, container), context, <span class="hljs-number">0</span> <span class="hljs-comment">/* parentDebugID */</span>);
  wrapperInstance._renderedComponent._topLevelWrapper = wrapperInstance;
  <span class="hljs-comment">// setInnerHTML(container, markup)&#xFF0C;&#x6700;&#x7EC8;&#x4F1A;&#x5C06;markup&#x865A;&#x62DF;&#x8282;&#x70B9;&#x63D2;&#x5165;&#x771F;&#x6B63;&#x7684;DOM&#x6811;</span>
  ReactMount._mountImageIntoNode(markup, container, wrapperInstance, shouldReuseMarkup, transaction);
}</code></pre><p><code>mountComponent:</code><br><code>&#x4E0D;&#x540C;&#x7684;React&#x7EC4;&#x4EF6;&#x7684;mountComponent&#x5B9E;&#x73B0;&#x90FD;&#x6709;&#x6240;&#x533A;&#x522B;&#xFF0C;&#x4E0B;&#x9762;&#x5206;&#x6790;React&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x7C7B;</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6765;&#x5230;&#x4E86;&#x7EC4;&#x4EF6;&#x7684;&#x6302;&#x8F7D;&#xFF0C;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x51E0;&#x4E2A;&#x53D8;&#x91CF;:
renderedElement, _renderedComponent,
inst, ReactInstanceMap.set(inst, this), 
_pendingStateQueue, _pendingForceUpdate, _processPendingState&#xFF0C;_processContext, 
componentWillMount, componentDidMount 
// &#x672C;&#x8D28;&#x4E0A;&#x662F;&#x8C03;&#x7528;Component&#x6784;&#x9020;&#x65B9;&#x6CD5;&#x7684;&#x65B0;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#xFF0C;&#x8FD9;&#x4E2A;instance&#x4E0A;&#x4F1A;&#x65B0;&#x589E;&#xFF0C;context&#xFF0C;props&#xFF0C;refs&#x4EE5;&#x53CA;updater&#x5C5E;&#x6027;(&#x89C1;&#x56FE;&#x4E8C;)&#xFF0C;&#x540E;&#x7EED;&#x4F7F;&#x7528;Map&#x7684;&#x5F62;&#x5F0F;&#x7528;&#x6B64;&#x4F5C;&#x4E3A;key&#xFF0C;&#x7EC4;&#x4EF6;&#x4F5C;&#x4E3A;value&#xFF0C;&#x65B9;&#x4FBF;&#x4E4B;&#x540E;&#x83B7;&#x53D6;&#x7EC4;&#x4EF6;&#xFF0C;&#x6BD4;&#x5982;&#x4E0A;&#x9762;&#x6240;&#x8BF4;&#x7684;type&#x4E3A;TopLevelWrapper&#xFF0C;&#x6784;&#x9020;&#x5176;&#x5B9E;&#x4F8B;
var Component = this._currentElement.type;
var inst = this._constructComponent(doConstruct, publicProps, publicContext, updateQueue);
// inst&#x6216;&#x8005;inst.render&#x4E3A;&#x7A7A;&#x5BF9;&#x5E94;&#x7684;&#x662F;stateless&#x7EC4;&#x4EF6;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;
// &#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#x6CA1;&#x6709;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#xFF0C;&#x5B83;&#x672C;&#x8D28;&#x4E0A;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x8FD4;&#x56DE;JSX&#x7684;&#x51FD;&#x6570;&#x800C;&#x5DF2;&#x3002;&#x662F;&#x4E00;&#x79CD;&#x8F7B;&#x91CF;&#x7EA7;&#x7684;React&#x7EC4;&#x4EF6;
if (!shouldConstruct(Component) &amp;&amp; (inst == null || inst.render == null)) {
  renderedElement = inst;
  warnIfInvalidElement(Component, renderedElement);
  inst = new StatelessComponent(Component);
}
// Store a reference from the instance back to the internal representation
ReactInstanceMap.set(inst, this);
this._pendingStateQueue = null;
this._pendingReplaceState = false;
this._pendingForceUpdate = false;
// ...
// &#x521D;&#x59CB;&#x5316;&#x6302;&#x8F7D;
markup = this.performInitialMount(renderedElement, nativeParent, nativeContainerInfo, transaction, context);
// &#x5C06;componentDidMount&#x4EE5;&#x4E8B;&#x52A1;&#x7684;&#x5F62;&#x5F0F;&#x8FDB;&#x884C;&#x8C03;&#x7528;
transaction.getReactMountReady().enqueue(function () {
  measureLifeCyclePerf(function () {
    return inst.componentDidMount();
  }, _this._debugID, &apos;componentDidMount&apos;);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x6765;&#x5230;&#x4E86;&#x7EC4;&#x4EF6;&#x7684;&#x6302;&#x8F7D;&#xFF0C;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x51E0;&#x4E2A;&#x53D8;&#x91CF;:</span>
renderedElement, _renderedComponent,
inst, ReactInstanceMap.set(inst, <span class="hljs-keyword">this</span>), 
_pendingStateQueue, _pendingForceUpdate, _processPendingState&#xFF0C;_processContext, 
componentWillMount, componentDidMount 
<span class="hljs-comment">// &#x672C;&#x8D28;&#x4E0A;&#x662F;&#x8C03;&#x7528;Component&#x6784;&#x9020;&#x65B9;&#x6CD5;&#x7684;&#x65B0;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#xFF0C;&#x8FD9;&#x4E2A;instance&#x4E0A;&#x4F1A;&#x65B0;&#x589E;&#xFF0C;context&#xFF0C;props&#xFF0C;refs&#x4EE5;&#x53CA;updater&#x5C5E;&#x6027;(&#x89C1;&#x56FE;&#x4E8C;)&#xFF0C;&#x540E;&#x7EED;&#x4F7F;&#x7528;Map&#x7684;&#x5F62;&#x5F0F;&#x7528;&#x6B64;&#x4F5C;&#x4E3A;key&#xFF0C;&#x7EC4;&#x4EF6;&#x4F5C;&#x4E3A;value&#xFF0C;&#x65B9;&#x4FBF;&#x4E4B;&#x540E;&#x83B7;&#x53D6;&#x7EC4;&#x4EF6;&#xFF0C;&#x6BD4;&#x5982;&#x4E0A;&#x9762;&#x6240;&#x8BF4;&#x7684;type&#x4E3A;TopLevelWrapper&#xFF0C;&#x6784;&#x9020;&#x5176;&#x5B9E;&#x4F8B;</span>
<span class="hljs-keyword">var</span> Component = <span class="hljs-keyword">this</span>._currentElement.type;
<span class="hljs-keyword">var</span> inst = <span class="hljs-keyword">this</span>._constructComponent(doConstruct, publicProps, publicContext, updateQueue);
<span class="hljs-comment">// inst&#x6216;&#x8005;inst.render&#x4E3A;&#x7A7A;&#x5BF9;&#x5E94;&#x7684;&#x662F;stateless&#x7EC4;&#x4EF6;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;</span>
<span class="hljs-comment">// &#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#x6CA1;&#x6709;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#xFF0C;&#x5B83;&#x672C;&#x8D28;&#x4E0A;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x8FD4;&#x56DE;JSX&#x7684;&#x51FD;&#x6570;&#x800C;&#x5DF2;&#x3002;&#x662F;&#x4E00;&#x79CD;&#x8F7B;&#x91CF;&#x7EA7;&#x7684;React&#x7EC4;&#x4EF6;</span>
<span class="hljs-keyword">if</span> (!shouldConstruct(Component) &amp;&amp; (inst == <span class="hljs-literal">null</span> || inst.render == <span class="hljs-literal">null</span>)) {
  renderedElement = inst;
  warnIfInvalidElement(Component, renderedElement);
  inst = <span class="hljs-keyword">new</span> StatelessComponent(Component);
}
<span class="hljs-comment">// Store a reference from the instance back to the internal representation</span>
ReactInstanceMap.set(inst, <span class="hljs-keyword">this</span>);
<span class="hljs-keyword">this</span>._pendingStateQueue = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">this</span>._pendingReplaceState = <span class="hljs-literal">false</span>;
<span class="hljs-keyword">this</span>._pendingForceUpdate = <span class="hljs-literal">false</span>;
<span class="hljs-comment">// ...</span>
<span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x6302;&#x8F7D;</span>
markup = <span class="hljs-keyword">this</span>.performInitialMount(renderedElement, nativeParent, nativeContainerInfo, transaction, context);
<span class="hljs-comment">// &#x5C06;componentDidMount&#x4EE5;&#x4E8B;&#x52A1;&#x7684;&#x5F62;&#x5F0F;&#x8FDB;&#x884C;&#x8C03;&#x7528;</span>
transaction.getReactMountReady().enqueue(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  measureLifeCyclePerf(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> inst.componentDidMount();
  }, _this._debugID, <span class="hljs-string">&apos;componentDidMount&apos;</span>);
});</code></pre><p><code>&#x56FE;&#x4E8C;:</code><br><span class="img-wrap"><img data-src="/img/bVbdMPI?w=1642&amp;h=604" src="https://static.alili.tech/img/bVbdMPI?w=1642&amp;h=604" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p><code>performInitialMount:</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// render&#x524D;&#x8C03;&#x7528;componentWillMount
inst.componentWillMount()
// &#x5C06;state&#x63D0;&#x524D;&#x5408;&#x5E76;&#xFF0C;&#x6545;&#x5728;componentWillMount&#x4E2D;&#x8C03;&#x7528;setState&#x4E0D;&#x4F1A;&#x89E6;&#x53D1;&#x91CD;&#x65B0;render&#xFF0C;&#x800C;&#x662F;&#x505A;&#x4E00;&#x6B21;state&#x5408;&#x5E76;&#x3002;&#x8FD9;&#x6837;&#x505A;&#x7684;&#x76EE;&#x7684;&#x662F;&#x51CF;&#x5C11;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x91CD;&#x65B0;&#x6E32;&#x67D3;
// _processPendingState&#x8FDB;&#x884C;&#x539F;&#x6709;state&#x7684;&#x5408;&#x5E76;, _assign(nextState, typeof partial === &apos;function&apos; ? partial.call(inst, nextState, props, context) : partial); &#x4EE5;&#x53CA;&#x8BBE;&#x7F6E;this._pendingStateQueue = null&#xFF0C;&#x8FD9;&#x4E5F;&#x5C31;&#x610F;&#x5473;&#x7740;dirtyComponents&#x8FDB;&#x5165;&#x4E0B;&#x4E00;&#x6B21;&#x5FAA;&#x73AF;&#x65F6;&#xFF0C;&#x6267;&#x884C;performUpdateIfNecessary&#x4E0D;&#x4F1A;&#x518D;&#x53BB;&#x66F4;&#x65B0;&#x7EC4;&#x4EF6;
if (this._pendingStateQueue) {
    inst.state = this._processPendingState(inst.props, inst.context);
 }
 // &#x5982;&#x679C;&#x4E0D;&#x662F;stateless&#xFF0C;&#x5373;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#xFF0C;&#x5219;&#x8C03;&#x7528;render&#xFF0C;&#x8FD4;&#x56DE;ReactElement
if (renderedElement === undefined) {
    renderedElement = this._renderValidatedComponent();
}
var nodeType = ReactNodeTypes.getType(renderedElement);
this._renderedNodeType = nodeType;
var child = this._instantiateReactComponent(renderedElement, nodeType !== ReactNodeTypes.EMPTY /* shouldHaveDebugID */
);
this._renderedComponent = child;

// &#x9012;&#x5F52;&#x6E32;&#x67D3;&#xFF0C;&#x6E32;&#x67D3;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x8FD4;&#x56DE;markup&#xFF0C;&#x5339;&#x914D;&#x540C;&#x7C7B;&#x578B;&#x7684;&#x7EC4;&#x4EF6;,&#x8FD4;&#x56DE;markup
var markup = ReactReconciler.mountComponent(child, transaction, hostParent, hostContainerInfo, this._processChildContext(context), debugID);
}
// &#x6BD4;&#x5982;
    var markup = internalInstance.mountComponent(transaction, hostParent, hostContainerInfo, context, parentDebugID);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// render&#x524D;&#x8C03;&#x7528;componentWillMount</span>
inst.componentWillMount()
<span class="hljs-comment">// &#x5C06;state&#x63D0;&#x524D;&#x5408;&#x5E76;&#xFF0C;&#x6545;&#x5728;componentWillMount&#x4E2D;&#x8C03;&#x7528;setState&#x4E0D;&#x4F1A;&#x89E6;&#x53D1;&#x91CD;&#x65B0;render&#xFF0C;&#x800C;&#x662F;&#x505A;&#x4E00;&#x6B21;state&#x5408;&#x5E76;&#x3002;&#x8FD9;&#x6837;&#x505A;&#x7684;&#x76EE;&#x7684;&#x662F;&#x51CF;&#x5C11;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x91CD;&#x65B0;&#x6E32;&#x67D3;</span>
<span class="hljs-comment">// _processPendingState&#x8FDB;&#x884C;&#x539F;&#x6709;state&#x7684;&#x5408;&#x5E76;, _assign(nextState, typeof partial === &apos;function&apos; ? partial.call(inst, nextState, props, context) : partial); &#x4EE5;&#x53CA;&#x8BBE;&#x7F6E;this._pendingStateQueue = null&#xFF0C;&#x8FD9;&#x4E5F;&#x5C31;&#x610F;&#x5473;&#x7740;dirtyComponents&#x8FDB;&#x5165;&#x4E0B;&#x4E00;&#x6B21;&#x5FAA;&#x73AF;&#x65F6;&#xFF0C;&#x6267;&#x884C;performUpdateIfNecessary&#x4E0D;&#x4F1A;&#x518D;&#x53BB;&#x66F4;&#x65B0;&#x7EC4;&#x4EF6;</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._pendingStateQueue) {
    inst.state = <span class="hljs-keyword">this</span>._processPendingState(inst.props, inst.context);
 }
 <span class="hljs-comment">// &#x5982;&#x679C;&#x4E0D;&#x662F;stateless&#xFF0C;&#x5373;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#xFF0C;&#x5219;&#x8C03;&#x7528;render&#xFF0C;&#x8FD4;&#x56DE;ReactElement</span>
<span class="hljs-keyword">if</span> (renderedElement === <span class="hljs-literal">undefined</span>) {
    renderedElement = <span class="hljs-keyword">this</span>._renderValidatedComponent();
}
<span class="hljs-keyword">var</span> nodeType = ReactNodeTypes.getType(renderedElement);
<span class="hljs-keyword">this</span>._renderedNodeType = nodeType;
<span class="hljs-keyword">var</span> child = <span class="hljs-keyword">this</span>._instantiateReactComponent(renderedElement, nodeType !== ReactNodeTypes.EMPTY <span class="hljs-comment">/* shouldHaveDebugID */</span>
);
<span class="hljs-keyword">this</span>._renderedComponent = child;

<span class="hljs-comment">// &#x9012;&#x5F52;&#x6E32;&#x67D3;&#xFF0C;&#x6E32;&#x67D3;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x8FD4;&#x56DE;markup&#xFF0C;&#x5339;&#x914D;&#x540C;&#x7C7B;&#x578B;&#x7684;&#x7EC4;&#x4EF6;,&#x8FD4;&#x56DE;markup</span>
<span class="hljs-keyword">var</span> markup = ReactReconciler.mountComponent(child, transaction, hostParent, hostContainerInfo, <span class="hljs-keyword">this</span>._processChildContext(context), debugID);
}
<span class="hljs-comment">// &#x6BD4;&#x5982;</span>
    <span class="hljs-keyword">var</span> markup = internalInstance.mountComponent(transaction, hostParent, hostContainerInfo, context, parentDebugID);</code></pre><p><code>_renderValidatedComponent:</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x8C03;&#x7528;render&#x65B9;&#x6CD5;&#xFF0C;&#x5F97;&#x5230;ReactElement&#x3002;JSX&#x7ECF;&#x8FC7;babel&#x8F6C;&#x8BD1;&#x540E;&#x5176;&#x5B9E;&#x5C31;&#x662F;createElement()&#x65B9;&#x6CD5;&#xFF0C;&#x6BD4;&#x5982;&#x4E0A;&#x9762;&#x6240;&#x63D0;&#x5230;&#x7684;TopLevelWrapper&#x5185;&#x6709;render&#x65B9;&#x6CD5;(&#x56FE;&#x4E09;,&#x56FE;&#x56DB;)
var renderedComponent = inst.render();   " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-comment">// &#x8C03;&#x7528;render&#x65B9;&#x6CD5;&#xFF0C;&#x5F97;&#x5230;ReactElement&#x3002;JSX&#x7ECF;&#x8FC7;babel&#x8F6C;&#x8BD1;&#x540E;&#x5176;&#x5B9E;&#x5C31;&#x662F;createElement()&#x65B9;&#x6CD5;&#xFF0C;&#x6BD4;&#x5982;&#x4E0A;&#x9762;&#x6240;&#x63D0;&#x5230;&#x7684;TopLevelWrapper&#x5185;&#x6709;render&#x65B9;&#x6CD5;(&#x56FE;&#x4E09;,&#x56FE;&#x56DB;)</span>
<span class="hljs-keyword">var</span> renderedComponent = inst.render();   </code></pre><p><code>&#x56FE;&#x4E09;:</code><br><span class="img-wrap"><img data-src="/img/bVbdMPO?w=890&amp;h=600" src="https://static.alili.tech/img/bVbdMPO?w=890&amp;h=600" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span><br><code>&#x56FE;&#x56DB;:</code><br><span class="img-wrap"><img data-src="/img/bVbdMPP?w=1948&amp;h=846" src="https://static.alili.tech/img/bVbdMPP?w=1948&amp;h=846" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x7531;renderedElement.type&#x7C7B;&#x578B;&#x53EF;&#x4EE5;&#x77E5;&#x9053;&#x6240;&#x8981;&#x751F;&#x6210;&#x7684;&#x7EC4;&#x4EF6;&#x7C7B;&#x578B;&#x4E3A;reactDOMComponent&#xFF0C;&#x6765;&#x770B;&#x4E0B;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x4E0B;&#x7684;<code>mountComponent</code>&#x65B9;&#x6CD5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (namespaceURI === DOMNamespaces.html) {
   if (this._tag === &apos;script&apos;) {
     // &#x5F53;&#x63D2;&#x5165;&#x6807;&#x7B7E;&#x4E3A;script&#x7684;&#x65F6;&#x5019;react&#x4E5F;&#x8FDB;&#x884C;&#x4E86;&#x5305;&#x88C5;&#xFF0C;&#x8FD9;&#x6837;script&#x5C31;&#x53EA;&#x662F;innerHTML&#x4E0D;&#x4F1A;&#x8FDB;&#x884C;&#x6267;&#x884C;&#xFF0C;&#x4E0D;&#x7136;&#x4F1A;&#x6709;&#x6CE8;&#x5165;&#x7684;&#x5371;&#x9669;
     var div = ownerDocument.createElement(&apos;div&apos;);
     var type = this._currentElement.type;
     div.innerHTML = &apos;&lt;&apos; + type + &apos;&gt;&lt;/&apos; + type + &apos;&gt;&apos;;
     el = div.removeChild(div.firstChild);
   } else if (props.is) {
     el = ownerDocument.createElement(this._currentElement.type, props.is);
   } else {
     // Separate else branch instead of using `props.is || undefined` above becuase of a Firefox bug.
     // See discussion in https://github.com/facebook/react/pull/6896
     // and discussion in https://bugzilla.mozilla.org/show_bug.cgi?id=1276240
     el = ownerDocument.createElement(this._currentElement.type);
   }
 } else {
   el = ownerDocument.createElementNS(namespaceURI, this._currentElement.type);
 }
 // Populate `_hostNode` on the rendered host/text component with the given DOM node.
 ReactDOMComponentTree.precacheNode(this, el);
 this._flags |= Flags.hasCachedChildNodes;
 if (!this._hostParent) {
     // &#x5728;&#x6839;&#x8282;&#x70B9;&#x4E0A;&#x8BBE;&#x7F6E;data-root&#x5C5E;&#x6027;
     DOMPropertyOperations.setAttributeForRoot(el);
 }
 this._updateDOMProperties(null, props, transaction);
 // &#x521D;&#x59CB;&#x5316;lazyTree&#xFF0C;&#x8FD4;&#x56DE;&#x5B9E;&#x4F8B;    
 // node: node,
 // children: [],
 // html: null,
 // text: null,
 // toString: toString
 var lazyTree = DOMLazyTree(el);
 // &#x904D;&#x5386;&#x5185;&#x90E8;props&#xFF0C;&#x5224;&#x65AD;props.children&#x5185;&#x90E8;&#x662F;string/number&#x7C7B;&#x578B;&#x8FD8;&#x662F;&#x5176;&#x4ED6;&#x7C7B;&#x578B;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x524D;&#x8005;&#x76F4;&#x63A5;&#x5C06;&#x5185;&#x90E8;children&#x63D2;&#x5165;&#x5230;node&#x4E2D;&#x53BB;&#xFF0C;&#x5426;&#x5219;&#x5C31;&#x9700;&#x8981;&#x975E;string/number&#x7C7B;&#x578B;&#x8FDB;&#x884C;&#x7EE7;&#x7EED;&#x6E32;&#x67D3;
 this._createInitialChildren(transaction, props, context, lazyTree);
 mountImage = lazyTree;
 return mountImage;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-keyword">if</span> (namespaceURI === DOMNamespaces.html) {
   <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._tag === <span class="hljs-string">&apos;script&apos;</span>) {
     <span class="hljs-comment">// &#x5F53;&#x63D2;&#x5165;&#x6807;&#x7B7E;&#x4E3A;script&#x7684;&#x65F6;&#x5019;react&#x4E5F;&#x8FDB;&#x884C;&#x4E86;&#x5305;&#x88C5;&#xFF0C;&#x8FD9;&#x6837;script&#x5C31;&#x53EA;&#x662F;innerHTML&#x4E0D;&#x4F1A;&#x8FDB;&#x884C;&#x6267;&#x884C;&#xFF0C;&#x4E0D;&#x7136;&#x4F1A;&#x6709;&#x6CE8;&#x5165;&#x7684;&#x5371;&#x9669;</span>
     <span class="hljs-keyword">var</span> div = ownerDocument.createElement(<span class="hljs-string">&apos;div&apos;</span>);
     <span class="hljs-keyword">var</span> type = <span class="hljs-keyword">this</span>._currentElement.type;
     div.innerHTML = <span class="hljs-string">&apos;&lt;&apos;</span> + type + <span class="hljs-string">&apos;&gt;&lt;/&apos;</span> + type + <span class="hljs-string">&apos;&gt;&apos;</span>;
     el = div.removeChild(div.firstChild);
   } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (props.<span class="hljs-keyword">is</span>) {
     el = ownerDocument.createElement(<span class="hljs-keyword">this</span>._currentElement.type, props.<span class="hljs-keyword">is</span>);
   } <span class="hljs-keyword">else</span> {
     <span class="hljs-comment">// Separate else branch instead of using `props.is || undefined` above becuase of a Firefox bug.</span>
     <span class="hljs-comment">// See discussion in https://github.com/facebook/react/pull/6896</span>
     <span class="hljs-comment">// and discussion in https://bugzilla.mozilla.org/show_bug.cgi?id=1276240</span>
     el = ownerDocument.createElement(<span class="hljs-keyword">this</span>._currentElement.type);
   }
 } <span class="hljs-keyword">else</span> {
   el = ownerDocument.createElementNS(namespaceURI, <span class="hljs-keyword">this</span>._currentElement.type);
 }
 <span class="hljs-comment">// Populate `_hostNode` on the rendered host/text component with the given DOM node.</span>
 ReactDOMComponentTree.precacheNode(<span class="hljs-keyword">this</span>, el);
 <span class="hljs-keyword">this</span>._flags |= Flags.hasCachedChildNodes;
 <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>._hostParent) {
     <span class="hljs-comment">// &#x5728;&#x6839;&#x8282;&#x70B9;&#x4E0A;&#x8BBE;&#x7F6E;data-root&#x5C5E;&#x6027;</span>
     DOMPropertyOperations.setAttributeForRoot(el);
 }
 <span class="hljs-keyword">this</span>._updateDOMProperties(<span class="hljs-literal">null</span>, props, transaction);
 <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;lazyTree&#xFF0C;&#x8FD4;&#x56DE;&#x5B9E;&#x4F8B;    </span>
 <span class="hljs-comment">// node: node,</span>
 <span class="hljs-comment">// children: [],</span>
 <span class="hljs-comment">// html: null,</span>
 <span class="hljs-comment">// text: null,</span>
 <span class="hljs-comment">// toString: toString</span>
 <span class="hljs-keyword">var</span> lazyTree = DOMLazyTree(el);
 <span class="hljs-comment">// &#x904D;&#x5386;&#x5185;&#x90E8;props&#xFF0C;&#x5224;&#x65AD;props.children&#x5185;&#x90E8;&#x662F;string/number&#x7C7B;&#x578B;&#x8FD8;&#x662F;&#x5176;&#x4ED6;&#x7C7B;&#x578B;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x524D;&#x8005;&#x76F4;&#x63A5;&#x5C06;&#x5185;&#x90E8;children&#x63D2;&#x5165;&#x5230;node&#x4E2D;&#x53BB;&#xFF0C;&#x5426;&#x5219;&#x5C31;&#x9700;&#x8981;&#x975E;string/number&#x7C7B;&#x578B;&#x8FDB;&#x884C;&#x7EE7;&#x7EED;&#x6E32;&#x67D3;</span>
 <span class="hljs-keyword">this</span>._createInitialChildren(transaction, props, context, lazyTree);
 mountImage = lazyTree;
 <span class="hljs-keyword">return</span> mountImage;</code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x5176;&#x4E2D;&#x6709;&#x5FC5;&#x8981;&#x4E86;&#x89E3;&#x4E0B;DOMLazyTree&#x7684;&#x4E00;&#x4E9B;&#x5C5E;&#x6027;&#x65B9;&#x6CD5;&#x56E0;&#x4E3A;&#x4E4B;&#x540E;&#x4F1A;&#x6709;&#x8C03;&#x7528;&#x4EE5;&#x53CA;_createInitialChildren&#xFF0C;&#x8FD9;&#x4E2A;&#x662F;&#x5C06;props.children&#x8F6C;&#x6362;&#x4E3A;innerHTML&#x7684;&#x5173;&#x952E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function DOMLazyTree(node) {
  return {
    node: node,
    children: [],
    html: null,
    text: null,
    toString: toString
  };
}

DOMLazyTree.insertTreeBefore = insertTreeBefore;
DOMLazyTree.replaceChildWithTree = replaceChildWithTree;
// &#x6309;&#x5E8F;&#x5411;&#x8282;&#x70B9;&#x7684;&#x5B50;&#x8282;&#x70B9;&#x5217;&#x8868;&#x7684;&#x672B;&#x5C3E;&#x6DFB;&#x52A0;&#x65B0;&#x7684;&#x5B50;&#x8282;&#x70B9;
DOMLazyTree.queueChild = queueChild;
// &#x6309;&#x5E8F;&#x63D2;&#x5165;HTML
DOMLazyTree.queueHTML = queueHTML;
// &#x6309;&#x5E8F;&#x63D2;&#x5165;&#x6587;&#x5B57;
DOMLazyTree.queueText = queueText;
function queueChild(parentTree, childTree) {
  if (enableLazy) {
    parentTree.children.push(childTree);
  } else {
    parentTree.node.appendChild(childTree.node);
  }
}

function queueHTML(tree, html) {
  if (enableLazy) {
    tree.html = html;
  } else {
    setInnerHTML(tree.node, html);
  }
}

function queueText(tree, text) {
  if (enableLazy) {
    tree.text = text;
  } else {
    // &#x5185;&#x90E8;&#x5176;&#x5B9E;&#x5C06;node.textContent = text;
    setTextContent(tree.node, text);
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs openscad"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">DOMLazyTree</span><span class="hljs-params">(node)</span> {</span>
  return {
    node: node,
    <span class="hljs-built_in">children</span>: [],
    html: null,
    <span class="hljs-built_in">text</span>: null,
    toString: toString
  };
}

DOMLazyTree.insertTreeBefore = insertTreeBefore;
DOMLazyTree.replaceChildWithTree = replaceChildWithTree;
<span class="hljs-comment">// &#x6309;&#x5E8F;&#x5411;&#x8282;&#x70B9;&#x7684;&#x5B50;&#x8282;&#x70B9;&#x5217;&#x8868;&#x7684;&#x672B;&#x5C3E;&#x6DFB;&#x52A0;&#x65B0;&#x7684;&#x5B50;&#x8282;&#x70B9;</span>
DOMLazyTree.queueChild = queueChild;
<span class="hljs-comment">// &#x6309;&#x5E8F;&#x63D2;&#x5165;HTML</span>
DOMLazyTree.queueHTML = queueHTML;
<span class="hljs-comment">// &#x6309;&#x5E8F;&#x63D2;&#x5165;&#x6587;&#x5B57;</span>
DOMLazyTree.queueText = queueText;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">queueChild</span><span class="hljs-params">(parentTree, childTree)</span> {</span>
  <span class="hljs-keyword">if</span> (enableLazy) {
    parentTree.<span class="hljs-built_in">children</span>.push(childTree);
  } <span class="hljs-keyword">else</span> {
    parentTree.node.appendChild(childTree.node);
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">queueHTML</span><span class="hljs-params">(tree, html)</span> {</span>
  <span class="hljs-keyword">if</span> (enableLazy) {
    tree.html = html;
  } <span class="hljs-keyword">else</span> {
    setInnerHTML(tree.node, html);
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">queueText</span><span class="hljs-params">(tree, text)</span> {</span>
  <span class="hljs-keyword">if</span> (enableLazy) {
    tree.<span class="hljs-built_in">text</span> = <span class="hljs-built_in">text</span>;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// &#x5185;&#x90E8;&#x5176;&#x5B9E;&#x5C06;node.textContent = text;</span>
    setTextContent(tree.node, <span class="hljs-built_in">text</span>);
  }
}</code></pre><p>&#x770B;&#x4E86;&#x8FD9;&#x4E48;&#x591A;&#x662F;&#x4E0D;&#x662F;&#x611F;&#x89C9;&#x5230;&#x6D53;&#x6D53;&#x7684;&#x57FA;&#x7840;&#x77E5;&#x8BC6;&#xFF0C;insertBefore, appendChild, textContent,<br>createElement&#xFF0C;createElementNS&#xFF0C;nodeType</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  _createInitialChildren: function (transaction, props, context, lazyTree) {
    // Intentional use of != to avoid catching zero/false.
    var innerHTML = props.dangerouslySetInnerHTML;
    if (innerHTML != null) {
      if (innerHTML.__html != null) {
        DOMLazyTree.queueHTML(lazyTree, innerHTML.__html);
      }
    } else {
      // &#x8FD9;&#x4E24;&#x4E2A;&#x662F;&#x4E92;&#x65A5;&#x7684;&#x6761;&#x4EF6;&#xFF0C;contentToUse&#x7528;&#x6765;&#x5224;&#x8BFB;&#x662F;&#x4E0D;&#x662F;string&#xFF0C;number&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x662F;&#x5219;&#x8FD4;&#x56DE;null&#xFF0C;childrenToUse&#x751F;&#x6548;
      var contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null;
      var childrenToUse = contentToUse != null ? null : props.children;
      // TODO: Validate that text is allowed as a child of this node
      if (contentToUse != null) {
        // &#x7701;&#x7565;&#x4E00;&#x4E9B;&#x4EE3;&#x7801;...
        // &#x4E0A;&#x9762;&#x6709;&#x8BF4;&#x8FC7;&#x5C06;&#x5185;&#x90E8;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x63D2;&#x5165;text&#x7684;&#x64CD;&#x4F5C;, node.concontentText = contentToUse
        DOMLazyTree.queueText(lazyTree, contentToUse);
      } else if (childrenToUse != null) {
        // &#x5BF9;&#x4E8E;&#x5176;&#x4ED6;&#x7C7B;&#x578B;&#x7EE7;&#x7EED;&#x8FDB;&#x884C;&#x6E32;&#x67D3;
        var mountImages = this.mountChildren(childrenToUse, transaction, context);
        for (var i = 0; i &lt; mountImages.length; i++) {
          // &#x5411;&#x8282;&#x70B9;&#x7684;&#x5B50;&#x8282;&#x70B9;&#x5217;&#x8868;&#x7684;&#x672B;&#x5C3E;&#x6DFB;&#x52A0;&#x65B0;&#x7684;&#x5B50;&#x8282;&#x70B9;
          DOMLazyTree.queueChild(lazyTree, mountImages[i]);
        }
      }
    }
  }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>  _createInitialChildren: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(transaction, props, context, lazyTree)</span> </span>{
    <span class="hljs-comment">// Intentional use of != to avoid catching zero/false.</span>
    <span class="hljs-keyword">var</span> innerHTML = props.dangerouslySetInnerHTML;
    <span class="hljs-keyword">if</span> (innerHTML != <span class="hljs-literal">null</span>) {
      <span class="hljs-keyword">if</span> (innerHTML.__html != <span class="hljs-literal">null</span>) {
        DOMLazyTree.queueHTML(lazyTree, innerHTML.__html);
      }
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// &#x8FD9;&#x4E24;&#x4E2A;&#x662F;&#x4E92;&#x65A5;&#x7684;&#x6761;&#x4EF6;&#xFF0C;contentToUse&#x7528;&#x6765;&#x5224;&#x8BFB;&#x662F;&#x4E0D;&#x662F;string&#xFF0C;number&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x662F;&#x5219;&#x8FD4;&#x56DE;null&#xFF0C;childrenToUse&#x751F;&#x6548;</span>
      <span class="hljs-keyword">var</span> contentToUse = CONTENT_TYPES[<span class="hljs-keyword">typeof</span> props.children] ? props.children : <span class="hljs-literal">null</span>;
      <span class="hljs-keyword">var</span> childrenToUse = contentToUse != <span class="hljs-literal">null</span> ? <span class="hljs-literal">null</span> : props.children;
      <span class="hljs-comment">// <span class="hljs-doctag">TODO:</span> Validate that text is allowed as a child of this node</span>
      <span class="hljs-keyword">if</span> (contentToUse != <span class="hljs-literal">null</span>) {
        <span class="hljs-comment">// &#x7701;&#x7565;&#x4E00;&#x4E9B;&#x4EE3;&#x7801;...</span>
        <span class="hljs-comment">// &#x4E0A;&#x9762;&#x6709;&#x8BF4;&#x8FC7;&#x5C06;&#x5185;&#x90E8;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x63D2;&#x5165;text&#x7684;&#x64CD;&#x4F5C;, node.concontentText = contentToUse</span>
        DOMLazyTree.queueText(lazyTree, contentToUse);
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (childrenToUse != <span class="hljs-literal">null</span>) {
        <span class="hljs-comment">// &#x5BF9;&#x4E8E;&#x5176;&#x4ED6;&#x7C7B;&#x578B;&#x7EE7;&#x7EED;&#x8FDB;&#x884C;&#x6E32;&#x67D3;</span>
        <span class="hljs-keyword">var</span> mountImages = <span class="hljs-keyword">this</span>.mountChildren(childrenToUse, transaction, context);
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; mountImages.length; i++) {
          <span class="hljs-comment">// &#x5411;&#x8282;&#x70B9;&#x7684;&#x5B50;&#x8282;&#x70B9;&#x5217;&#x8868;&#x7684;&#x672B;&#x5C3E;&#x6DFB;&#x52A0;&#x65B0;&#x7684;&#x5B50;&#x8282;&#x70B9;</span>
          DOMLazyTree.queueChild(lazyTree, mountImages[i]);
        }
      }
    }
  },</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x8FD9;&#x4E24;&#x4E2A;&#x662F;&#x4E92;&#x65A5;&#x7684;&#x6761;&#x4EF6;&#xFF0C;contentToUse&#x7528;&#x6765;&#x5224;&#x8BFB;&#x662F;&#x4E0D;&#x662F;string&#xFF0C;number&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x662F;&#x5219;&#x8FD4;&#x56DE;null&#xFF0C;childrenToUse&#x751F;&#x6548;
var contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null;
// &#x5982;&#x679C;&#x8FD9;&#x4E2A;&#x6761;&#x4EF6;&#x4E0D;&#x4E3A;null
var childrenToUse = contentToUse != null ? null : props.children;
var mountImages = this.mountChildren(childrenToUse, transaction, context);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x8FD9;&#x4E24;&#x4E2A;&#x662F;&#x4E92;&#x65A5;&#x7684;&#x6761;&#x4EF6;&#xFF0C;contentToUse&#x7528;&#x6765;&#x5224;&#x8BFB;&#x662F;&#x4E0D;&#x662F;string&#xFF0C;number&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x662F;&#x5219;&#x8FD4;&#x56DE;null&#xFF0C;childrenToUse&#x751F;&#x6548;</span>
<span class="hljs-keyword">var</span> contentToUse = CONTENT_TYPES[<span class="hljs-keyword">typeof</span> props.children] ? props.children : <span class="hljs-literal">null</span>;
<span class="hljs-comment">// &#x5982;&#x679C;&#x8FD9;&#x4E2A;&#x6761;&#x4EF6;&#x4E0D;&#x4E3A;null</span>
<span class="hljs-keyword">var</span> childrenToUse = contentToUse != <span class="hljs-literal">null</span> ? <span class="hljs-literal">null</span> : props.children;
<span class="hljs-keyword">var</span> mountImages = <span class="hljs-keyword">this</span>.mountChildren(childrenToUse, transaction, context);</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mountChildren: function (nestedChildren, transaction, context) {
  // ...
  var mountImages = [];
  var index = 0;
  for (var name in children) {
    if (children.hasOwnProperty(name)) {
      var child = children[name];
      // &#x901A;&#x8FC7;child&#x7684;&#x7C7B;&#x578B;&#x6765;&#x5B9E;&#x4F8B;&#x5316;&#x4E0D;&#x540C;&#x7C7B;&#x578B;&#x7684;&#x7EC4;&#x4EF6;
      var mountImage = ReactReconciler.mountComponent(child, transaction, this, this._hostContainerInfo, context, selfDebugID);
      child._mountIndex = index++;
      mountImages.push(mountImage);
    }
  }
  return mountImages;
}," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>mountChildren: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(nestedChildren, transaction, context)</span> </span>{
  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">var</span> mountImages = [];
  <span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> name <span class="hljs-keyword">in</span> children) {
    <span class="hljs-keyword">if</span> (children.hasOwnProperty(name)) {
      <span class="hljs-keyword">var</span> child = children[name];
      <span class="hljs-comment">// &#x901A;&#x8FC7;child&#x7684;&#x7C7B;&#x578B;&#x6765;&#x5B9E;&#x4F8B;&#x5316;&#x4E0D;&#x540C;&#x7C7B;&#x578B;&#x7684;&#x7EC4;&#x4EF6;</span>
      <span class="hljs-keyword">var</span> mountImage = ReactReconciler.mountComponent(child, transaction, <span class="hljs-keyword">this</span>, <span class="hljs-keyword">this</span>._hostContainerInfo, context, selfDebugID);
      child._mountIndex = index++;
      mountImages.push(mountImage);
    }
  }
  <span class="hljs-keyword">return</span> mountImages;
},</code></pre><p><code>&#x603B;&#x7684;&#x6765;&#x8BF4;&#x7EC4;&#x4EF6;&#x6302;&#x8F7D;&#x5927;&#x6982;&#x53EF;&#x4EE5;&#x6982;&#x62EC;&#x4E3A;&#x4EE5;&#x4E0B;&#x7684;&#x6B65;&#x9AA4;&#xFF1A;</code></p><p><span class="img-wrap"><img data-src="/img/bVbdMPW?w=869&amp;h=887" src="https://static.alili.tech/img/bVbdMPW?w=869&amp;h=887" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x7406;&#x89E3;&#x90E8;&#x5206;&#x6E90;&#x7801;&#x540E;&#x90A3;&#x79CD;&#x559C;&#x60A6;&#x7684;&#x5FC3;&#x60C5;&#x603B;&#x662F;&#x4F1A;&#x968F;&#x65F6;&#x5728;&#x4F60;&#x5199;&#x7EC4;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#x4F34;&#x968F;&#x7740;&#x4F60;&#xFF0C;&#x4E0D;&#x8FC7;react&#x7559;&#x7740;&#x7684;&#x5751;&#x8FD8;&#x6709;&#x5F88;&#x591A;&#x9700;&#x8981;&#x6211;&#x53BB;&#x586B;&#x8865;&#xFF0C;&#x6211;&#x4E5F;&#x4F1A;&#x575A;&#x6301;&#x4E0D;&#x61C8;&#x4E0B;&#x53BB;&#xFF0C;&#x6700;&#x540E;&#x606D;&#x559C;&#x6CD5;&#x56FD;&#x961F;&#x8D62;&#x5F97;&#x4E16;&#x754C;&#x676F;&#x51A0;&#x519B;~</p><p><code>&#x53C2;&#x8003;:</code><br><a href="https://www.kancloud.cn/kancloud/react-in-depth/47779" rel="nofollow noreferrer" target="_blank">&#x6DF1;&#x5165;&#x6D45;&#x51FA;React</a><br><a href="https://zhuanlan.zhihu.com/p/25882388" rel="nofollow noreferrer" target="_blank">&#x77E5;&#x4E4E;</a><br><a href="https://blog.csdn.net/a153375250/article/details/53434299" rel="nofollow noreferrer" target="_blank">CSDN</a><br><a href="https://github.com/purplebamboo/blog/issues/3" rel="nofollow noreferrer" target="_blank">&#x6398;&#x91D1;</a><br><a href="https://segmentfault.com/a/1190000014442208">segfaultment</a><br><a href="https://reactjs.org/docs/reconciliation.html" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x7F51;</a><br><a href="https://github.com/superman66/Front-End-Blog/issues/2" rel="nofollow noreferrer" target="_blank">github</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React源码解读之ComponentMount

## 原文链接
[https://segmentfault.com/a/1190000015642978](https://segmentfault.com/a/1190000015642978)

