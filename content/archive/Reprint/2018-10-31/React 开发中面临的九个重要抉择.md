---
title: React 开发中面临的九个重要抉择
reprint: true
categories: reprint
abbrlink: 5ee7110c
date: 2018-10-31 02:30:10
---

{{% raw %}}
<blockquote><p>&#x6289;&#x62E9;&#x7CFB;&#x5217;&#xFF1A;&#x5728;&#x6280;&#x672F;&#x5F00;&#x53D1;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x6211;&#x4EEC;&#x4F1A;&#x9762;&#x4E34;&#x7740;&#x5404;&#x79CD;&#x5404;&#x6837;&#x7684;&#x6289;&#x62E9;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x4E0D;&#x540C;&#x60C5;&#x5883;&#x4E0B;&#x8BE5;&#x5982;&#x4F55;&#x9009;&#x62E9;&#x6070;&#x5F53;&#x7684;&#x6280;&#x672F;&#xFF0C;&#x8FD9;&#x662F;&#x672C;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x60F3;&#x8981;&#x89E3;&#x51B3;&#x7684;&#x95EE;&#x9898;&#x3002;</p></blockquote><p>&#x5728; React &#x5F00;&#x53D1;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x6211;&#x4EEC;&#x5E38;&#x5E38;&#x4F1A;&#x9047;&#x5230;&#x4E00;&#x4E9B;&#x6289;&#x62E9;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x5C06;&#x9009;&#x53D6;&#x5176;&#x4E2D;&#x4E00;&#x4E9B;&#x4E2A;&#x4EBA;&#x8BA4;&#x4E3A;&#x91CD;&#x8981;&#x7684;&#x6289;&#x62E9;&#x6765;&#x4E00;&#x4E00;&#x5206;&#x6790;&#x3002;&#x4F46;&#x8BF7;&#x8BB0;&#x4F4F;&#x4EE5;&#x4E0B;&#x6240;&#x8BF4;&#x7684;&#x90FD;&#x53EA;&#x662F;&#x7684;&#x5EFA;&#x8BAE;&#xFF0C;&#x53EF;&#x80FD;&#x6709;&#x4E00;&#x4E9B;&#x65B9;&#x9762;&#x4E5F;&#x6CA1;&#x6709;&#x8003;&#x8651;&#x5230;&#xFF0C;&#x5927;&#x5BB6;&#x8FD8;&#x662F;&#x9700;&#x8981;&#x4F9D;&#x636E;&#x5B9E;&#x9645;&#x60C5;&#x51B5;&#x81EA;&#x5DF1;&#x9009;&#x62E9;&#x6700;&#x5408;&#x9002;&#x7684;&#xFF0C;&#x5207;&#x52FF;&#x968F;&#x6CE2;&#x9010;&#x6D41;&#x3002;</p><h2 id="articleHeader0">&#x6289;&#x62E9; 1&#xFF1A;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x642D;&#x5EFA;</h2><p>&#x5F53;&#x5F00;&#x59CB;React&#x5F00;&#x53D1;&#x4E4B;&#x524D;&#xFF0C;&#x4F60;&#x6216;&#x4F60;&#x7684;&#x56E2;&#x961F;&#x5FC5;&#x987B;&#x5148;&#x8003;&#x8651;&#x9009;&#x62E9;&#x4EC0;&#x4E48;&#x6837;&#x7684;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#xFF0C;&#x5148;&#x6109;&#x5FEB;&#x7684;&#x5448;&#x4E0A;&#x7FA4;&#x4F17;&#x7684;&#x9009;&#x62E9;&#x56FE;&#x3002;<br><span class="img-wrap"><img data-src="/img/remote/1460000011792693?w=1012&amp;h=776" src="https://static.alili.tech/img/remote/1460000011792693?w=1012&amp;h=776" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x901A;&#x7528;&#x573A;&#x666F;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528; <a href="https://github.com/facebookincubator/create-react-app" rel="nofollow noreferrer" target="_blank">create-react-app</a>&#xFF0C;&#x5B83;&#x5C06;&#x6EE1;&#x8DB3;&#x4F60;&#x5927;&#x90E8;&#x5206;&#x7684;&#x5F00;&#x53D1;&#x9700;&#x6C42;&#x3002;&#x5982;&#x679C;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#x4E0D;&#x80FD;&#x6EE1;&#x8DB3;&#x4F60;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x8FD0;&#x884C; <code>npm run eject</code> &#x6309;&#x9700;&#x4FEE;&#x6539;&#x4F60;&#x7684;&#x914D;&#x7F6E;&#x5427;&#xFF08;&#x6E29;&#x99A8;&#x63D0;&#x793A;&#xFF1A;&#x6B64;&#x8FC7;&#x7A0B;&#x5F0F;&#x4E0D;&#x53EF;&#x56DE;&#x9000;&#x7684;&#xFF09;&#x3002;</p><p>&#x5176;&#x4ED6;&#x53EF;&#x66FF;&#x4EE3;</p><ul><li><a href="https://github.com/gatsbyjs/gatsby" rel="nofollow noreferrer" target="_blank">Gatsby</a> &#x9002;&#x7528;&#x4E8E;&#x5F00;&#x53D1;&#x9759;&#x6001;&#x7F51;&#x7AD9;</li><li><a href="https://github.com/zeit/next.js" rel="nofollow noreferrer" target="_blank">Next.js</a> &#x9002;&#x7528;&#x4E8E;&#x524D;&#x540E;&#x7AEF;&#x540C;&#x6784;&#x65B9;&#x6848;</li></ul><p>&#x5982;&#x679C;&#x4EE5;&#x4E0A;&#x7686;&#x4E0D;&#x80FD;&#x6EE1;&#x8DB3;&#x4F60;&#x7684;&#x9700;&#x6C42;&#x65F6;&#xFF0C;&#x4EB2;&#xFF0C;&#x81EA;&#x5DF1;&#x52A8;&#x624B;&#xFF0C;&#x4E30;&#x8863;&#x8DB3;&#x98DF;&#x3002;</p><h2 id="articleHeader1">&#x6289;&#x62E9; 2&#xFF1A;&#x7C7B;&#x578B;</h2><p>JavaScript &#x662F;&#x5F31;&#x7C7B;&#x578B;&#x8BED;&#x8A00;&#xFF0C;&#x4F60;&#x53EF;&#x80FD;&#x5FFD;&#x89C6;&#x7C7B;&#x578B;&#x68C0;&#x67E5;&#xFF0C;&#x4E5F;&#x53EF;&#x80FD;&#x9700;&#x8981;&#x5F15;&#x5165;&#x7C7B;&#x578B;&#x68C0;&#x67E5;&#x3002;&#x4E0B;&#x56FE;&#x662F;&#x7FA4;&#x4F17;&#x7684;&#x9009;&#x62E9;&#x56FE;&#xFF0C;&#x4F60;&#x5C06;&#x5982;&#x4F55;&#x9009;&#x62E9;&#xFF1F;<br><span class="img-wrap"><img data-src="/img/remote/1460000011792694?w=1010&amp;h=820" src="https://static.alili.tech/img/remote/1460000011792694?w=1010&amp;h=820" alt="Types" title="Types" style="cursor:pointer;display:inline"></span></p><p>&#x5982;&#x679C;&#x4F60;&#x61D2;&#x5F97;&#x6298;&#x817E;&#xFF0C;&#x90A3; <a href="https://reactjs.org/docs/typechecking-with-proptypes.html" rel="nofollow noreferrer" target="_blank">prop-types</a> &#x53EF;&#x4EE5;&#x6EE1;&#x8DB3;&#x4F60;&#x7684;&#x7C7B;&#x578B;&#x9A8C;&#x8BC1;&#xFF0C;&#x4E5F;&#x4F1A;&#x907F;&#x514D;&#x5927;&#x90E8;&#x5206;&#x7684;&#x7C7B;&#x578B;&#x95EE;&#x9898;&#x3002;</p><p>&#x5982;&#x679C;&#x4F60;&#x559C;&#x6B22;&#x6298;&#x817E;&#xFF0C;&#x8FFD;&#x6C42;&#x5B8C;&#x7F8E;&#xFF0C;&#x6CA1;&#x6709;&#x95EE;&#x9898;&#x8FD8;&#x6709;&#x4E0B;&#x9762;&#x4E24;&#x79CD;&#x9009;&#x62E9;&#xFF1A;</p><ul><li><a href="https://github.com/Microsoft/TypeScript" rel="nofollow noreferrer" target="_blank">TypeScript</a> JavaScript &#x7684;&#x8D85;&#x96C6;&#xFF0C;&#x6700;&#x7EC8;&#x53EF;&#x7F16;&#x8BD1;&#x6210;&#x6E05;&#x6670;&#x4E0E;&#x6574;&#x6D01;&#x7684;&#x539F;&#x751F;JavaScript&#x4EE3;&#x7801;.</li><li><a href="https://github.com/facebook/flow" rel="nofollow noreferrer" target="_blank">Flow</a> &#x4E3A; Javascript &#x6DFB;&#x52A0;&#x9759;&#x6001;&#x7C7B;&#x578B;&#x68C0;&#x67E5;&#xFF0C;&#x7528;&#x4E8E;&#x63D0;&#x9AD8;&#x5F00;&#x53D1;&#x8005;&#x7684;&#x6548;&#x7387;&#x4E0E;&#x4EE3;&#x7801;&#x8D28;&#x91CF;&#x3002;</li></ul><h2 id="articleHeader2">&#x6289;&#x62E9; 3&#xFF1A;ES5(createClass) VS ES6(class)</h2><p>&#x5982;&#x679C;&#x4F60;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4F7F;&#x7528;&#x7684;&#x662F;ES5&#x8BED;&#x6CD5;&#xFF0C;&#x90A3;&#x4F60;&#x6CA1;&#x5F97;&#x9009;&#x62E9;&#x53EA;&#x80FD;&#x4F7F;&#x7528;createCalss&#xFF0C;&#x63A8;&#x8350;&#x5B98;&#x65B9;&#x6587;&#x7AE0;&#x300A;<a href="https://reactjs.org/docs/react-without-es6.html" rel="nofollow noreferrer" target="_blank">&#x975E;ES6&#x73AF;&#x5883;&#x4E0B;&#x5982;&#x4F55;&#x4F7F;&#x7528;React</a>&#x300B;</p><p>&#x5982;&#x679C;&#x4F60;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4F7F;&#x7528;ES6&#x8BED;&#x6CD5;&#xFF0C;&#x5F3A;&#x70C8;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528; class&#xFF0C;&#x4F7F;&#x7528;&#x8D77;&#x6765;&#x66F4;&#x7B80;&#x5355;&#xFF0C;Facebook &#x4E5F;&#x63A8;&#x8350;&#x4F7F;&#x7528; Class&#xFF0C;&#x793A;&#x4F8B;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  class SayHello extends React.Component {
    constructor(props) {
      super(props);
      this.state = {message: &apos;Hello!&apos;};
    }
    render() {
      return (
        &lt;p&gt;
          Say: {this.state.message}
        &lt;/p&gt;
      );
    }
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code class="jsx">  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SayHello</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    constructor(props) {
      <span class="hljs-keyword">super</span>(props);
      <span class="hljs-keyword">this</span>.state = {message: <span class="hljs-symbol">&apos;Hello</span>!&apos;};
    }
    render() {
      <span class="hljs-keyword">return</span> (
        &lt;p&gt;
          <span class="hljs-type">Say</span>: {<span class="hljs-keyword">this</span>.state.message}
        &lt;/p&gt;
      );
    }
  }</code></pre><h2 id="articleHeader3">&#x6289;&#x62E9; 4&#xFF1A;&#x7C7B; VS &#x7EAF;&#x51FD;&#x6570;</h2><p>&#x5982;&#x679C;&#x4F60;&#x4E0D;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x751F;&#x547D;&#x5468;&#x671F;&#xFF0C;&#x5C3D;&#x53EF;&#x80FD;&#x4F7F;&#x7528;&#x65E0;&#x72B6;&#x6001;&#x7EAF;&#x51FD;&#x6570;&#xFF08;Stateless functional components&#xFF1A;react-v0.14&#x7248;&#x672C;&#x6DFB;&#x52A0;&#x7684;&#x65B0;&#x7279;&#x6027;&#xFF09;&#x3002;</p><p>&#x65E0;&#x72B6;&#x6001;&#x7EAF;&#x51FD;&#x6570;&#x7B80;&#x5355;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // &#x65E0;&#x72B6;&#x6001;&#x7EAF;&#x51FD;&#x6570;&#x7EC4;&#x4EF6;&#xFF0C;&#x4F7F;&#x7528; ES5 
  var Aquarium = function(props) {
    var fish = getFish(props.species);
    return &lt;Tank&gt;{fish}&lt;/Tank&gt;;
  };

  // &#x65E0;&#x72B6;&#x6001;&#x7EAF;&#x51FD;&#x6570;&#x7EC4;&#x4EF6;&#xFF0C;&#x4F7F;&#x7528; ES2015 (ES6) &#x7BAD;&#x5934;&#x51FD;&#x6570;:
  var Aquarium = (props) =&gt; {
    var fish = getFish(props.species);
    return &lt;Tank&gt;{fish}&lt;/Tank&gt;;
  };

  // &#x6216;&#x8005;&#x518D;&#x4F7F;&#x7528;&#x5BF9;&#x8C61;&#x89E3;&#x6784;&#x4E0E;&#x9ED8;&#x8BA4;&#x7684;&#x8FD4;&#x56DE;&#xFF0C;&#x7B80;&#x5355;&#xFF1A;
  var Aquarium = ({species}) =&gt; (
    &lt;Tank&gt;
      {getFish(species)}
    &lt;/Tank&gt;
  );

  // &#x7136;&#x540E;&#x4F7F;&#x7528;: &lt;Aquarium species=&quot;rainbowfish&quot; /&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code class="jsx">  <span class="hljs-comment">// &#x65E0;&#x72B6;&#x6001;&#x7EAF;&#x51FD;&#x6570;&#x7EC4;&#x4EF6;&#xFF0C;&#x4F7F;&#x7528; ES5 </span>
  <span class="hljs-keyword">var</span> Aquarium = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">var</span> fish = getFish(props.species);
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Tank</span>&gt;</span>{fish}<span class="hljs-tag">&lt;/<span class="hljs-name">Tank</span>&gt;</span></span>;
  };

  <span class="hljs-comment">// &#x65E0;&#x72B6;&#x6001;&#x7EAF;&#x51FD;&#x6570;&#x7EC4;&#x4EF6;&#xFF0C;&#x4F7F;&#x7528; ES2015 (ES6) &#x7BAD;&#x5934;&#x51FD;&#x6570;:</span>
  <span class="hljs-keyword">var</span> Aquarium = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> {
    <span class="hljs-keyword">var</span> fish = getFish(props.species);
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Tank</span>&gt;</span>{fish}<span class="hljs-tag">&lt;/<span class="hljs-name">Tank</span>&gt;</span></span>;
  };

  <span class="hljs-comment">// &#x6216;&#x8005;&#x518D;&#x4F7F;&#x7528;&#x5BF9;&#x8C61;&#x89E3;&#x6784;&#x4E0E;&#x9ED8;&#x8BA4;&#x7684;&#x8FD4;&#x56DE;&#xFF0C;&#x7B80;&#x5355;&#xFF1A;</span>
  <span class="hljs-keyword">var</span> Aquarium = <span class="hljs-function">(<span class="hljs-params">{species}</span>) =&gt;</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Tank</span>&gt;</span>
      {getFish(species)}
    <span class="hljs-tag">&lt;/<span class="hljs-name">Tank</span>&gt;</span></span>
  );

  <span class="hljs-comment">// &#x7136;&#x540E;&#x4F7F;&#x7528;: &lt;Aquarium species=&quot;rainbowfish&quot; /&gt;</span></code></pre><p>&#x4F9D;&#x636E;&#x5355;&#x4E00;&#x804C;&#x8D23;&#x539F;&#x5219;&#xFF0C;&#x4F60;&#x7684;&#x7EC4;&#x4EF6;&#x5E94;&#x8BE5;&#x53EA;&#x6709;&#x4E14;&#x53EA;&#x4E00;&#x4E2A;&#x804C;&#x8D23;&#xFF0C;&#x5185;&#x90E8;&#x7684;&#x903B;&#x8F91;&#x5C3D;&#x91CF;&#x8BBE;&#x8BA1;&#x6241;&#x5E73;&#x3002;&#x5982;&#x679C;&#x903B;&#x8F91;&#x590D;&#x6742;&#xFF0C;&#x90A3;&#x4F60;&#x8981;&#x95EE;&#x81EA;&#x5DF1;&#x7EC4;&#x4EF6;&#x662F;&#x5426;&#x8FD8;&#x9700;&#x8981;&#x5206;&#x89E3;&#xFF0C;&#x4F7F;&#x7528;&#x7EAF;&#x51FD;&#x6570;&#x4F1A;&#x4F7F;&#x4F60;&#x65F6;&#x65F6;&#x523B;&#x523B;&#x8003;&#x8651;&#x7EC4;&#x4EF6;&#x7684;&#x8BBE;&#x8BA1;&#x662F;&#x5426;&#x5408;&#x7406;&#x3002;</p><p>&#x603B;&#x4E4B;&#x4E00;&#x53E5;&#x8BDD;&#xFF0C;&#x7EAF;&#x51FD;&#x6570;&#x80FD;&#x5E2E;&#x4F60;&#x66F4;&#x597D;&#x7684;&#x8BBE;&#x8BA1;&#x7684;&#x4F60;&#x7EC4;&#x4EF6;&#xFF0C;&#x5E95;&#x5C42;&#x7684;&#x539F;&#x5B50;&#x7EC4;&#x4EF6;&#x5C3D;&#x91CF;&#x4F7F;&#x7528;&#x7EAF;&#x51FD;&#x6570;&#xFF0C;&#x53EF;&#x590D;&#x7528;&#x6216;&#x8005;&#x66F4;&#x590D;&#x6742;&#x7684;&#x903B;&#x8F91;&#x53EF;&#x4EE5;&#x8003;&#x8651;&#x62BD;&#x79BB;&#x51FA;&#x9AD8;&#x4EF7;&#x903B;&#x8F91;&#x7EC4;&#x4EF6;&#x3002;</p><p>&#x4E5F;&#x5E76;&#x4E0D;&#x662F;&#x8BF4;&#x6240;&#x6709;&#x5730;&#x65B9;&#x90FD;&#x8981;&#x4F7F;&#x7528;&#x7EAF;&#x51FD;&#x6570;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x7684;&#x7EC4;&#x4EF6;&#x786E;&#x5B9E;&#x9700;&#x8981;&#x72B6;&#x6001;&#x4E0E;&#x751F;&#x547D;&#x5468;&#x671F;&#x76F8;&#x5173;&#x64CD;&#x4F5C;&#xFF0C;&#x90A3;&#x5C31;&#x4F7F;&#x7528;&#x7C7B;&#x3002;</p><p>&#x9644;&#x5E26;&#x4E24;&#x7BC7;&#x540C;&#x4E00;&#x4E2A;&#x4F5C;&#x8005;&#x7684;&#x4E0D;&#x540C;&#x89C2;&#x70B9;&#x7684;&#x6587;&#x7AE0;&#xFF08;&#x82F1;&#x6587;&#xFF09;&#xFF1A;</p><ul><li>&#x4F7F;&#x7528;&#x65E0;&#x72B6;&#x6001;&#x51FD;&#x6570;&#x7EC4;&#x4EF6;&#x7684;9&#x4E2A;&#x7406;&#x7531; <a href="https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc" rel="nofollow noreferrer" target="_blank">React Stateless Functional Components: Nine Wins You Might Have Overlooked</a></li><li>7&#x4E2A;&#x4E0D;&#x4F7F;&#x7528;&#x65E0;&#x72B6;&#x6001;&#x7EAF;&#x51FD;&#x6570;&#x7EC4;&#x4EF6;&#x7684;&#x7406;&#x7531; <a href="https://medium.freecodecamp.org/7-reasons-to-outlaw-reacts-functional-components-ff5b5ae09b7c" rel="nofollow noreferrer" target="_blank">7 Reasons to Outlaw React&#x2019;s Functional Components</a></li></ul><h2 id="articleHeader4">&#x6289;&#x62E9; 5&#xFF1A;State</h2><p>&#x63A5;&#x4E0B;&#x6765;&#x4F60;&#x8981;&#x8003;&#x8651;&#x7684;&#x662F;&#x5982;&#x4F55;&#x7BA1;&#x7406;&#x4F60;&#x7684;&#x72B6;&#x6001;&#x6570;&#x636E;&#xFF0C;&#x4E1A;&#x754C;&#x5DF2;&#x7ECF;&#x6709;&#x5F88;&#x591A;&#x65B9;&#x6848;&#xFF0C;&#x7FA4;&#x4F17;&#x7684;&#x9009;&#x62E9;&#x662F;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000011792695?w=1002&amp;h=842" src="https://static.alili.tech/img/remote/1460000011792695?w=1002&amp;h=842" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x5982;&#x679C;&#x662F;&#x7B80;&#x5355;WEB&#x7684;&#x5E94;&#x7528;&#xFF0C;&#x53EF;&#x80FD; React &#x63D0;&#x4F9B;&#x7684; setState() &#x5C31;&#x5B8C;&#x5168;&#x80FD;&#x6EE1;&#x8DB3;&#x4F60;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x591F;&#x7528;&#x5C31;&#x597D;&#x522B;&#x5F3A;&#x884C;&#x52A0;&#x5165;&#x5176;&#x5B83; State &#x7BA1;&#x7406;&#x6846;&#x67B6;&#x3002;</p><p>&#x5982;&#x679C;&#x662F;&#x5927;&#x578B;&#x7684;WEB&#x5E94;&#x7528;&#xFF0C;&#x4E2A;&#x4EBA;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528; <a href="https://github.com/reactjs/redux" rel="nofollow noreferrer" target="_blank">Redux</a>&#x3002;Redux&#x662F;JavaScript&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x7684;&#x53EF;&#x9884;&#x6D4B;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x5BB9;&#x5668;&#x3002;&#x5B83;&#x53EF;&#x4EE5;&#x5E2E;&#x52A9;&#x60A8;&#x7F16;&#x5199;&#x884C;&#x4E3A;&#x4E00;&#x81F4;&#x7684;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#xFF0C;&#x53EF;&#x5728;&#x4E0D;&#x540C;&#x73AF;&#x5883;&#xFF08;WEB&#x5BA2;&#x6237;&#x7AEF;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x548C;&#x624B;&#x673A;&#x5E94;&#x7528;&#x7B49;&#xFF09;&#x4E2D;&#x8FD0;&#x884C;&#xFF0C;&#x5E76;&#x4E14;&#x6613;&#x4E8E;&#x6D4B;&#x8BD5;&#x3002;</p><p>&#x987A;&#x4FBF;&#x63D0;&#x4E00;&#x4E0B;Redux&#x501F;&#x9274;&#x7684;&#x5176;&#x6838;&#x5FC3;&#x601D;&#x60F3;&#x4E4B;&#x4E00;&#x7684;&#x6846;&#x67B6; <a href="https://github.com/facebook/flux" rel="nofollow noreferrer" target="_blank">Flux</a>&#xFF0C;&#x6709;&#x5174;&#x8DA3;&#x53EF;&#x4EE5;&#x662F;&#x7814;&#x7A76;&#x4E00;&#x4E0B;&#x3002;</p><p><a href="https://github.com/mobxjs/mobx" rel="nofollow noreferrer" target="_blank">Bobx</a>&#xFF0C;&#x7B80;&#x5355;&#xFF0C;&#x53EF;&#x6269;&#x5C55;&#x7684;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x5E93;&#x3002;&#x672C;&#x4EBA;&#x4E5F;&#x6CA1;&#x6709;&#x4F7F;&#x7528;&#x5C31;&#x4E0D;&#x7EC6;&#x8BF4;&#x4E86;</p><h2 id="articleHeader5">&#x6289;&#x62E9; 6&#xFF1A;&#x7ED1;&#x5B9A;&#xFF08;Binding&#xFF09;</h2><p>&#x4E00;&#x5F20;&#x56FE;&#x80FD;&#x641E;&#x5B9A;&#xFF0C;&#x5C31;&#x4E0D;&#x591A;&#x505A;&#x89E3;&#x91CA;&#x4E86;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000011792696?w=481&amp;h=343" src="https://static.alili.tech/img/remote/1460000011792696?w=481&amp;h=343" alt="" title="" style="cursor:pointer"></span></p><p>&#x4F7F;&#x7528;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7ED1;&#x5B9A;&#x793A;&#x4F8B;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  class SayHello extends React.Component {
    constructor(props) {
      super(props);
      this.state = {message: &apos;Hello!&apos;};
    }

    // &#x4F7F;&#x7528;&#x7BAD;&#x5934;&#x51FD;&#x6570;banding
    handleClick = () =&gt; {
      alert(this.state.message);
    }

    render() {
      return (
        &lt;button onClick={this.handleClick}&gt;
          Say hello
        &lt;/button&gt;
      );
    }
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code class="jsx">  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SayHello</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    constructor(props) {
      <span class="hljs-keyword">super</span>(props);
      <span class="hljs-keyword">this</span>.state = {message: <span class="hljs-symbol">&apos;Hello</span>!&apos;};
    }

    <span class="hljs-comment">// &#x4F7F;&#x7528;&#x7BAD;&#x5934;&#x51FD;&#x6570;banding</span>
    handleClick = () =&gt; {
      alert(<span class="hljs-keyword">this</span>.state.message);
    }

    render() {
      <span class="hljs-keyword">return</span> (
        &lt;button onClick={<span class="hljs-keyword">this</span>.handleClick}&gt;
          <span class="hljs-type">Say</span> hello
        &lt;/button&gt;
      );
    }
  }</code></pre><p>&#x4F7F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#x7ED1;&#x5B9A;&#x793A;&#x4F8B;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  class SayHello extends React.Component {
    constructor(props) {
      super(props);
      this.state = {message: &apos;Hello!&apos;};
      
      // &#x5728;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;banding
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      alert(this.state.message);
    }

    render() {
      return (
        &lt;button onClick={this.handleClick}&gt;
          Say hello
        &lt;/button&gt;
      );
    }
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code class="jsx">  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SayHello</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    constructor(props) {
      <span class="hljs-keyword">super</span>(props);
      <span class="hljs-keyword">this</span>.state = {message: <span class="hljs-symbol">&apos;Hello</span>!&apos;};
      
      <span class="hljs-comment">// &#x5728;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;banding</span>
      <span class="hljs-keyword">this</span>.handleClick = <span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>);
    }

    handleClick() {
      alert(<span class="hljs-keyword">this</span>.state.message);
    }

    render() {
      <span class="hljs-keyword">return</span> (
        &lt;button onClick={<span class="hljs-keyword">this</span>.handleClick}&gt;
          <span class="hljs-type">Say</span> hello
        &lt;/button&gt;
      );
    }
  }</code></pre><h2 id="articleHeader6">&#x6289;&#x62E9; 7&#xFF1A;&#x6837;&#x5F0F;&#xFF08;Styling&#xFF09;</h2><p>&#x6837;&#x5F0F;&#x7684;&#x9009;&#x62E9;&#x592A;&#x591A;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x4E0D;&#x4E00;&#x4E00;&#x5217;&#x4E3E;&#xFF0C;&#x6211;&#x4EEC;&#x9009;&#x62E9;&#x51E0;&#x4E2A;React&#x5F00;&#x53D1;&#x8005;&#x5E38;&#x7528;&#x7684;&#x9009;&#x62E9;&#x9879;&#xFF0C;&#x7FA4;&#x4F17;&#x7684;&#x9009;&#x62E9;&#x5C3D;&#x5728;&#x4E0B;&#x56FE;&#x4E2D;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000011792697?w=1366&amp;h=828" src="https://static.alili.tech/img/remote/1460000011792697?w=1366&amp;h=828" alt="" title="" style="cursor:pointer"></span></p><p>&#x4F9D;&#x636E;&#x7FA4;&#x4F17;&#x7684;&#x9009;&#x62E9;&#xFF0C;&#x597D;&#x50CF;&#xFF08;&#x7531;&#x4E8E;&#x4E0A;&#x56FE;&#x7FA4;&#x4F17;&#x7684;&#x4EBA;&#x6570;&#x4E0D;&#x8BE6;&#xFF0C;&#x6837;&#x672C;&#x4E0D;&#x80FD;&#x8DB3;&#xFF0C;&#x53EA;&#x80FD;&#x8BF4;&#x597D;&#x50CF;&#xFF09; CSS-in-JS &#x6B63;&#x5728;&#x541E;&#x566C; CSS-Modules &#x7684;&#x4EFD;&#x989D;&#x3002;</p><p>Cory House &#x7684;&#x9009;&#x62E9;&#x7F16;&#x5199;&#x4EE3;&#x7801;&#x4F7F;&#x7528;SASS&#xFF0C;&#x547D;&#x540D;&#x4F7F;&#x7528;BEM&#x5DF2;&#x7ECF;&#x8DB3;&#x591F;&#xFF0C;&#x4ED6;&#x4E5F;&#x5173;&#x6CE8; <a href="https://github.com/styled-components/styled-components" rel="nofollow noreferrer" target="_blank">styled-components</a>&#x3002;</p><p>&#x672C;&#x4EBA;&#x503E;&#x5411;&#x903B;&#x8F91;&#xFF0C;&#x7ED3;&#x6784;&#x4E0E;&#x6837;&#x5F0F;&#x5206;&#x79BB;&#xFF0C;&#x73B0;&#x9636;&#x6BB5;&#x8FD8;&#x662F;&#x4F7F;&#x7528;SASS&#xFF0C;&#x547D;&#x540D;&#x4F7F;&#x7528;BEM&#x3002;&#x8FD1;&#x671F;&#x5728;&#x63A2;&#x8BA8;&#x66F4;&#x9002;&#x5408;&#x81EA;&#x5DF1;&#x7684;&#x6837;&#x5F0F;CSS&#x7EC4;&#x7EC7;&#x67B6;&#x4E0E;&#x547D;&#x540D;&#x65B9;&#x5F0F;&#xFF0C;&#x540E;&#x7EED;&#x4F1A;&#x6709;&#x4E13;&#x95E8;&#x7684;&#x6587;&#x7AE0;(&#x300A;CSS&#x67B6;&#x6784;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x7CFB;&#x5217;&#x300B;)&#xFF0C;&#x672C;&#x6587;&#x5C31;&#x4E0D;&#x505A;&#x6DF1;&#x5165;&#x7814;&#x7A76;&#x4E86;&#x3002;</p><p>&#x4E0B;&#x9762;&#x7B80;&#x5355;&#x7684;&#x7F57;&#x5217;&#x4E00;&#x4E0B;&#xFF0C;&#x5982;&#x4F55;&#x66F4;&#x597D;&#x7684;&#x7EC4;&#x7EC7;&#x6837;&#x5F0F;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF1A; <a href="https://github.com/stubbornella/oocss/wiki" rel="nofollow noreferrer" target="_blank">OOCSS</a>, <a href="https://smacss.com/" rel="nofollow noreferrer" target="_blank">SMACSS</a>, <a href="http://getbem.com/introduction/" rel="nofollow noreferrer" target="_blank">BEM</a>, <a href="https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/" rel="nofollow noreferrer" target="_blank">ITCSS</a>, <a href="http://ecss.io/slides2/" rel="nofollow noreferrer" target="_blank">ECSS</a>, <a href="http://suitcss.github.io/" rel="nofollow noreferrer" target="_blank">SUIT CSS</a>, <a href="http://patternlab.io/" rel="nofollow noreferrer" target="_blank">Atomic Design</a>, <a href="http://github.com/nemophrost/atomic-css" rel="nofollow noreferrer" target="_blank">Atomic</a>&#x3002;&#x6B22;&#x8FCE;&#x8865;&#x5145;&#xFF01;</p><h2 id="articleHeader7">&#x6289;&#x62E9; 8&#xFF1A;&#x590D;&#x7528;&#x903B;&#x8F91;</h2><p>&#x63A5;&#x4E0B;&#x6765;&#x4F60;&#x8981;&#x9762;&#x5BF9;&#x7684;&#x662F;&#x5982;&#x4F55;&#x590D;&#x7528;&#x4F60;&#x7684;&#x903B;&#x8F91;&#xFF0C;&#x7F16;&#x7A0B;&#x4E16;&#x754C;&#x7684;&#x4E00;&#x53E5;&#x540D;&#x8A00;&#x201C;&#x4E0D;&#x8981;&#x91CD;&#x590D;&#x81EA;&#x5DF1;&#x201D;&#x3002;&#x9ED8;&#x9ED8;&#x7684;&#x770B;&#x7740;&#x7FA4;&#x4F17;&#x7684;&#x9009;&#x62E9;&#x56FE;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000011792698?w=1010&amp;h=814" src="https://static.alili.tech/img/remote/1460000011792698?w=1010&amp;h=814" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>React &#x6700;&#x521D;&#x662F;&#x4F7F;&#x7528;<a href="https://reactjs.org/docs/react-without-es6.html#mixins" rel="nofollow noreferrer" target="_blank">Mixins</a>&#xFF0C;&#x4F46;&#x662F;&#x4F7F;&#x7528; mixins&#x4F1A;&#x5BFC;&#x81F4;&#x4E00;&#x4E9B;BUG&#x4E0E;<a href="https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html" rel="nofollow noreferrer" target="_blank">&#x88AB;&#x8BA4;&#x4E3A;&#x662F;&#x6709;&#x5BB3;&#x7684;&#xFF08;Mixins Considered Harmful&#xFF09;</a>&#x3002;</p><p>&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#xFF08;Heigher Order Components&#xFF09;, &#x5982;&#x679C;&#x4E0D;&#x4E86;&#x89E3;&#x53EF;&#x4EE5;&#x9605;&#x8BFB;&#x4E0B;&#x5217;&#x6587;&#x7AE0;&#xFF1A;</p><ul><li>Facebook&#x5B98;&#x65B9;&#x6587;&#x6863;&#x82F1;&#x6587; <a href="https://reactjs.org/docs/higher-order-components.html" rel="nofollow noreferrer" target="_blank">Higher-Order Components</a></li><li>&#x4E2D;&#x6587;&#x9605;&#x8BFB; <a href="https://zhuanlan.zhihu.com/p/24776678?group_id=802649040843051008" rel="nofollow noreferrer" target="_blank">&#x6DF1;&#x5165;&#x7406;&#x89E3; React &#x9AD8;&#x9636;&#x7EC4;&#x4EF6;</a></li></ul><p>&#x9AD8;&#x7EA7;&#x7EC4;&#x4EF6;&#x65F6;&#x73B0;&#x5728;&#x6700;&#x6D41;&#x884C;&#x7684;&#x65B9;&#x6848;&#xFF0C;&#x4F46;&#x8FD8;&#x662F;&#x9700;&#x8981;&#x4E86;&#x89E3; <a href="https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce" rel="nofollow noreferrer" target="_blank">render props</a>&#xFF0C;&#x5B83;&#x6BD4;&#x9AD8;&#x7EA7;&#x7EC4;&#x4EF6;&#x8DDF;&#x5BB9;&#x6613;&#x9605;&#x8BFB;&#x4E0E;&#x521B;&#x5EFA;&#x3002;&#x5176;&#x5B9E;&#x6211;&#x8FD8;&#x6CA1;&#x6709;&#x6DF1;&#x5165;&#x7406;&#x89E3;&#x4E0E;&#x5B9E;&#x8DF5; render props&#xFF0C;&#x65E0;&#x6CD5;&#x7ED9;&#x51FA;&#x5EFA;&#x8BAE;&#xFF0C;&#x770B;&#x4F60;&#x81EA;&#x5DF1;&#x7684;&#x9009;&#x62E9;&#x3002;</p><p>&#x6211;&#x73B0;&#x5728;&#x4F7F;&#x7528;&#x7684;&#x662F;&#x9AD8;&#x7EA7;&#x7EC4;&#x4EF6;&#xFF0C;&#x672A;&#x6765;&#x4E5F;&#x4E0D;&#x6392;&#x9664;&#x4F1A;&#x4F7F;&#x7528; render props&#xFF0C;&#x8F6F;&#x4EF6;&#x884C;&#x4E1A;&#x4E0D;&#x4E0D;&#x53D8;&#x7684;&#x4E3B;&#x9898;&#x5C31;&#x662F;&#x201C;&#x53D8;&#x5316;&#x201D;&#xFF0C;&#x8BF4;&#x4E0D;&#x5B9A;&#x8FD8;&#x4F1A;&#x6709;&#x66F4;&#x5408;&#x7406;&#x7684;&#x65B9;&#x6848;&#x5462;&#xFF1F;</p><h2 id="articleHeader8">&#x6289;&#x62E9; 9&#xFF1A;&#x76EE;&#x5F55;&#x7ED3;&#x6784;</h2><p>&#x4F60;&#x662F;&#x559C;&#x6B22;&#x6240;&#x6709;&#x7EC4;&#x4EF6;&#x5171;&#x7528;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#x5462;&#xFF0C;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  src/
  |- App.js
  |- RewarmView.js
  |- RewarmSearchInput.js
  |- RewarmImage.js
  |- RewarmLoading.js
  |- RewarmError.js
  |- giphyLoadData.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code>  src/
  <span class="hljs-string">|- App.js</span>
  <span class="hljs-string">|- RewarmView.js</span>
  <span class="hljs-string">|- RewarmSearchInput.js</span>
  <span class="hljs-string">|- RewarmImage.js</span>
  <span class="hljs-string">|- RewarmLoading.js</span>
  <span class="hljs-string">|- RewarmError.js</span>
  <span class="hljs-string">|- giphyLoadData.js</span></code></pre><p>&#x8FD8;&#x662F;&#x6BCF;&#x4E2A;&#x7EC4;&#x4EF6;&#x6709;&#x81EA;&#x5DF1;&#x7684;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x57FA;&#x672C;&#x7ED3;&#x6784;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  src/
  |- App.js
  |- RewarmSearch/
      |- index.js
      |- View.js
      |- SearchInput.js
      |- Image.js
      |- Loading.js
      |- Error.js
      |- loadData.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code>  src/
  <span class="hljs-string">|- App.js</span>
  <span class="hljs-string">|- RewarmSearch/</span>
      <span class="hljs-string">|- index.js</span>
      <span class="hljs-string">|- View.js</span>
      <span class="hljs-string">|- SearchInput.js</span>
      <span class="hljs-string">|- Image.js</span>
      <span class="hljs-string">|- Loading.js</span>
      <span class="hljs-string">|- Error.js</span>
      <span class="hljs-string">|- loadData.js</span></code></pre><p>&#x6536;&#x8D77;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x770B;&#x8D77;&#x6765;&#x662F;&#x4E0D;&#x662F;&#x5F88;&#x6574;&#x6D01;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  src/
  |- App.js
  |- RewarmSearch/" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code>  src/
  <span class="hljs-string">|- App.js</span>
  <span class="hljs-string">|- RewarmSearch/</span></code></pre><p>&#x6BCF;&#x4E2A;&#x7EC4;&#x4EF6;&#x5728;&#x5176;&#x5355;&#x72EC;&#x7684;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x66F4;&#x8BE6;&#x7EC6;&#x53EF;&#x9605;&#x8BFB;</p><ul><li><a href="https://hackernoon.com/the-100-correct-way-to-structure-a-react-app-or-why-theres-no-such-thing-3ede534ef1ed" rel="nofollow noreferrer" target="_blank">Writing Scalable React Apps with the Component Folder Pattern</a></li><li><a href="https://hackernoon.com/the-100-correct-way-to-structure-a-react-app-or-why-theres-no-such-thing-3ede534ef1ed" rel="nofollow noreferrer" target="_blank">The 100% correct way to structure a React app (or why there&#x2019;s no such thing</a></li></ul><p>&#x4E2A;&#x4EBA;&#x63A8;&#x8350;&#x7684;&#x662F;&#x6BCF;&#x4E2A;&#x7EC4;&#x4EF6;&#x62E5;&#x6709;&#x81EA;&#x5DF1;&#x7684;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x4F60;&#x5462;&#xFF1F;</p><h2 id="articleHeader9">&#x8BF4;&#x5728;&#x6700;&#x540E;</h2><p>&#x672C;&#x4EBA;&#x867D;&#x7136;&#x6709;6&#x5E74;&#x524D;&#x7AEF;&#x7684;&#x5F00;&#x53D1;&#x7ECF;&#x9A8C;&#xFF0C;&#x4F46;&#x6587;&#x7AE0;&#x96BE;&#x514D;&#x4F1A;&#x6709;&#x9057;&#x6F0F;&#xFF0C;&#x4E5F;&#x53EF;&#x80FD;&#x4E0E;&#x4F60;&#x7684;&#x60F3;&#x6CD5;&#x662F;&#x5BF9;&#x7ACB;&#x7684;&#xFF0C;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x63D0;&#x51FA;&#x5EFA;&#x8BAE;&#x6216;&#x8BF4;&#x51FA;&#x4F60;&#x4E0D;&#x4E00;&#x6837;&#x7684;&#x89C2;&#x70B9;&#x3002;</p><h2 id="articleHeader10">&#x53C2;&#x8003;&#x6587;&#x732E;</h2><p><a href="https://medium.com/m/global-identity?redirectUrl=https://medium.freecodecamp.org/8-key-react-component-decisions-cc965db11594" rel="nofollow noreferrer" target="_blank">&#x300A; 8 key React Component Decisions &#x300B;</a> &#xFF08;&#x672C;&#x94FE;&#x63A5;&#x9700;&#x8981;&#x7FFB;&#x5899;&#xFF09;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 开发中面临的九个重要抉择

## 原文链接
[https://segmentfault.com/a/1190000011792688](https://segmentfault.com/a/1190000011792688)

