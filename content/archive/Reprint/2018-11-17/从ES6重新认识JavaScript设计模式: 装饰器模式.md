---
title: '从ES6重新认识JavaScript设计模式: 装饰器模式' 
date: 2018-11-17 2:30:13
hidden: true
slug: pn3xaiqueb
categories: reprint
---

{{< raw >}}
<h3 id="articleHeader0"><strong>1 &#x4EC0;&#x4E48;&#x662F;&#x88C5;&#x9970;&#x5668;&#x6A21;&#x5F0F;</strong></h3><p><span class="img-wrap"><img data-src="/img/remote/1460000015970102?w=1127&amp;h=563" src="https://static.alili.tech/img/remote/1460000015970102?w=1127&amp;h=563" alt="Decorator" title="Decorator" style="cursor:pointer;display:inline"></span></p><blockquote>&#x5411;&#x4E00;&#x4E2A;&#x73B0;&#x6709;&#x7684;&#x5BF9;&#x8C61;&#x6DFB;&#x52A0;&#x65B0;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x540C;&#x65F6;&#x53C8;&#x4E0D;&#x6539;&#x53D8;&#x5176;&#x7ED3;&#x6784;&#x7684;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x88AB;&#x79F0;&#x4E3A;&#x88C5;&#x9970;&#x5668;&#x6A21;&#x5F0F;&#xFF08;Decorator Pattern&#xFF09;&#xFF0C;&#x5B83;&#x662F;&#x4F5C;&#x4E3A;&#x73B0;&#x6709;&#x7684;&#x7C7B;&#x7684;&#x4E00;&#x4E2A;&#x5305;&#x88C5;&#xFF08;Wrapper&#xFF09;&#x3002;</blockquote><p>&#x53EF;&#x4EE5;&#x5C06;&#x88C5;&#x9970;&#x5668;&#x7406;&#x89E3;&#x4E3A;&#x6E38;&#x620F;&#x4EBA;&#x7269;&#x8D2D;&#x4E70;&#x7684;&#x88C5;&#x5907;&#xFF0C;&#x4F8B;&#x5982;LOL&#x4E2D;&#x7684;&#x82F1;&#x96C4;&#x521A;&#x5F00;&#x59CB;&#x6E38;&#x620F;&#x65F6;&#x53EA;&#x6709;&#x57FA;&#x7840;&#x7684;&#x653B;&#x51FB;&#x529B;&#x548C;&#x6CD5;&#x5F3A;&#x3002;&#x4F46;&#x662F;&#x5728;&#x8D2D;&#x4E70;&#x7684;&#x88C5;&#x5907;&#x540E;&#xFF0C;&#x5728;&#x89E6;&#x53D1;&#x653B;&#x51FB;&#x548C;&#x6280;&#x80FD;&#x65F6;&#xFF0C;&#x80FD;&#x591F;&#x4EAB;&#x53D7;&#x5230;&#x88C5;&#x5907;&#x5E26;&#x6765;&#x7684;&#x8F93;&#x51FA;&#x52A0;&#x6210;&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x8D2D;&#x4E70;&#x7684;&#x88C5;&#x5907;&#x7ED9;&#x82F1;&#x96C4;&#x7684;&#x653B;&#x51FB;&#x548C;&#x6280;&#x80FD;&#x7684;&#x76F8;&#x5173;&#x65B9;&#x6CD5;&#x8FDB;&#x884C;&#x4E86;&#x88C5;&#x9970;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x63A8;&#x8350;&#x4E00;&#x7BC7;<a href="http://taobaofed.org/blog/2015/11/16/es7-decorator/" rel="nofollow noreferrer" target="_blank">&#x6DD8;&#x5B9D;&#x524D;&#x7AEF;&#x56E2;&#x961F;&#x7684;&#x535A;&#x6587;</a>&#xFF0C;&#x5F88;&#x6709;&#x8DA3;&#x7684;&#x4EE5;&#x94A2;&#x94C1;&#x4FA0;&#x7684;&#x4F8B;&#x5B50;&#x6765;&#x8BB2;&#x89E3;&#x4E86;&#x88C5;&#x9970;&#x8005;&#x6A21;&#x5F0F;&#x3002;</p><h3 id="articleHeader1"><strong>2 ESnext&#x4E2D;&#x7684;&#x88C5;&#x9970;&#x5668;&#x6A21;&#x5F0F;</strong></h3><p>ESnext&#x4E2D;&#x6709;&#x4E00;&#x4E2A;<code>Decorator</code>&#x7684;<a href="https://github.com/tc39/proposal-decorators" rel="nofollow noreferrer" target="_blank">&#x63D0;&#x6848;</a>&#xFF0C;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x4EE5; <code>@</code> &#x5F00;&#x5934;&#x7684;&#x51FD;&#x6570;&#x5BF9;ES6&#x4E2D;&#x7684;<code>class</code>&#x53CA;&#x5176;&#x5C5E;&#x6027;&#x3001;&#x65B9;&#x6CD5;&#x8FDB;&#x884C;&#x4FEE;&#x9970;&#x3002;<code>Decorator</code>&#x7684;&#x8BE6;&#x7EC6;&#x8BED;&#x6CD5;&#x8BF7;&#x53C2;&#x8003;&#x962E;&#x4E00;&#x5CF0;&#x7684;<a href="http://es6.ruanyifeng.com/#docs/decorator" rel="nofollow noreferrer" target="_blank">&#x300A;ECMASciprt&#x5165;&#x95E8; &#x2014;&#x2014; Decorator&#x300B;</a>&#x3002;</p><p>&#x76EE;&#x524D;<code>Decorator</code>&#x7684;&#x8BED;&#x6CD5;&#x8FD8;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x63D0;&#x6848;&#xFF0C;&#x5982;&#x679C;&#x671F;&#x671B;&#x73B0;&#x5728;&#x4F7F;&#x7528;&#x88C5;&#x9970;&#x5668;&#x6A21;&#x5F0F;&#xFF0C;&#x9700;&#x8981;&#x5B89;&#x88C5;&#x914D;&#x5408;<code>babel</code> + <code>webpack</code>&#x5E76;&#x7ED3;&#x5408;&#x63D2;&#x4EF6;&#x5B9E;&#x73B0;&#x3002;</p><ul><li>npm&#x5B89;&#x88C5;&#x4F9D;&#x8D56;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install babel-core babel-loader babel-plugin-transform-decorators babel-plugin-transform-decorators-legacy babel-preset-env" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install </span><span class="hljs-keyword">babel-core </span><span class="hljs-keyword">babel-loader </span><span class="hljs-keyword">babel-plugin-transform-decorators </span><span class="hljs-keyword">babel-plugin-transform-decorators-legacy </span><span class="hljs-keyword">babel-preset-env</span></code></pre><ul><li>&#x914D;&#x7F6E;<code>.babelrc</code>&#x6587;&#x4EF6;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [&quot;env&quot;],
  &quot;plugins&quot;: [&quot;transform-decorators-legacy&quot;]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="JSON">{
  <span class="hljs-attr">&quot;presets&quot;</span>: [<span class="hljs-string">&quot;env&quot;</span>],
  <span class="hljs-attr">&quot;plugins&quot;</span>: [<span class="hljs-string">&quot;transform-decorators-legacy&quot;</span>]
}</code></pre><ul><li>&#x5728;<code>webpack.config.js</code>&#x4E2D;&#x6DFB;&#x52A0;<code>babel-loader</code></li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: &quot;babel-loader&quot; }
    ],
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript">  <span class="hljs-built_in">module</span>: {
    <span class="hljs-attr">rules</span>: [
      { <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>, <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>, <span class="hljs-attr">loader</span>: <span class="hljs-string">&quot;babel-loader&quot;</span> }
    ],
  }</code></pre><p>&#x5982;&#x679C;&#x4F60;&#x4F7F;&#x7528;&#x7684;IDE&#x4E3A;Visual Studio Code&#xFF0C;&#x53EF;&#x80FD;&#x8FD8;&#x9700;&#x8981;&#x5728;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x6DFB;&#x52A0;&#x4EE5;&#x4E0B;<code>tsconfig.json</code>&#x6587;&#x4EF6;&#x6765;&#x7EC4;&#x7EC7;&#x4E00;&#x4E2A;ts&#x68C0;&#x67E5;&#x7684;&#x62A5;&#x9519;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;compilerOptions&quot;: {
    &quot;experimentalDecorators&quot;: true,
    &quot;allowJs&quot;: true,
    &quot;lib&quot;: [
      &quot;es6&quot;
    ],
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="JSON">{
  <span class="hljs-attr">&quot;compilerOptions&quot;</span>: {
    <span class="hljs-attr">&quot;experimentalDecorators&quot;</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">&quot;allowJs&quot;</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">&quot;lib&quot;</span>: [
      <span class="hljs-string">&quot;es6&quot;</span>
    ],
  }
}</code></pre><p>&#x4E0B;&#x9762;&#x6211;&#x5C06;&#x5B9E;&#x73B0;3&#x4E2A;&#x88C5;&#x9970;&#x5668;&#xFF0C;&#x5206;&#x522B;&#x4E3A;<code>@autobind</code>&#x3001;<code>@debounce</code>&#x3001;<code>@deprecate</code>&#x3002;</p><h4><strong>2.1 <code>@autobind</code>&#x5B9E;&#x73B0;<code>this</code>&#x6307;&#x5411;&#x539F;&#x5BF9;&#x8C61;</strong></h4><p>&#x5728;JavaScript&#x4E2D;&#xFF0C;<code>this</code>&#x7684;&#x6307;&#x5411;&#x95EE;&#x9898;&#x4E00;&#x76F4;&#x662F;&#x4E00;&#x4E2A;&#x8001;&#x751F;&#x5E38;&#x8C08;&#x7684;&#x8BDD;&#x9898;&#xFF0C;&#x5728;Vue&#x6216;React&#x8FD9;&#x7C7B;&#x6846;&#x67B6;&#x7684;&#x4F7F;&#x7528;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x65B0;&#x624B;&#x5F88;&#x6709;&#x53EF;&#x80FD;&#x4E00;&#x4E0D;&#x5C0F;&#x5FC3;&#x5C31;&#x4E22;&#x5931;&#x4E86;<code>this</code>&#x7684;&#x6307;&#x5411;&#x5BFC;&#x81F4;&#x65B9;&#x6CD5;&#x8C03;&#x7528;&#x9519;&#x8BEF;&#x3002;&#x4F8B;&#x5982;&#x4E0B;&#x9762;&#x4E00;&#x6BB5;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Person {
  getPerson() {
    return this;
  }
}

let person = new Person();
let { getPerson } = person;

console.log(getPerson() === person); // false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
  getPerson() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  }
}

<span class="hljs-keyword">let</span> person = <span class="hljs-keyword">new</span> Person();
<span class="hljs-keyword">let</span> { getPerson } = person;

<span class="hljs-built_in">console</span>.log(getPerson() === person); <span class="hljs-comment">// false</span></code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C; <code>getPerson</code>&#x65B9;&#x6CD5;&#x4E2D;&#x7684;<code>this</code>&#x9ED8;&#x8BA4;&#x6307;&#x5411;<code>Person</code>&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x4F46;&#x662F;&#x5982;&#x679C;&#x5C06;<code>Person</code>&#x901A;&#x8FC7;&#x89E3;&#x6784;&#x8D4B;&#x503C;&#x7684;&#x65B9;&#x5F0F;&#x63D0;&#x53D6;&#x51FA;&#x6765;&#xFF0C;&#x90A3;&#x4E48;&#x6B64;&#x65F6;&#x7684;<code>this</code>&#x6307;&#x5411;&#x4E3A;<code>undefined</code>&#x3002;&#x6240;&#x4EE5;&#x6700;&#x7EC8;&#x7684;&#x6253;&#x5370;&#x7ED3;&#x679C;&#x4E3A;<code>false</code>&#x3002;</p><p>&#x6B64;&#x65F6;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;<code>autobind</code>&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x7528;&#x6765;&#x88C5;&#x9970;<code>getPerson</code>&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x5B9E;&#x73B0;<code>this</code>&#x6C38;&#x8FDC;&#x6307;&#x5411;<code>Person</code>&#x7684;&#x5B9E;&#x4F8B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function autobind(target, key, descriptor) {
  var fn = descriptor.value;
  var configurable = descriptor.configurable;
  var enumerable = descriptor.enumerable;

  // &#x8FD4;&#x56DE;descriptor
  return {
    configurable: configurable,
    enumerable: enumerable,
    get: function get() {
      // &#x5C06;&#x8BE5;&#x65B9;&#x6CD5;&#x7ED1;&#x5B9A;this
      var boundFn = fn.bind(this);
      // &#x4F7F;&#x7528;Object.defineProperty&#x91CD;&#x65B0;&#x5B9A;&#x4E49;&#x8BE5;&#x65B9;&#x6CD5;
      Object.defineProperty(this, key, {
        configurable: true,
        writable: true,
        enumerable: false,
        value: boundFn
      })

      return boundFn;
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">autobind</span>(<span class="hljs-params">target, key, descriptor</span>) </span>{
  <span class="hljs-keyword">var</span> fn = descriptor.value;
  <span class="hljs-keyword">var</span> configurable = descriptor.configurable;
  <span class="hljs-keyword">var</span> enumerable = descriptor.enumerable;

  <span class="hljs-comment">// &#x8FD4;&#x56DE;descriptor</span>
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">configurable</span>: configurable,
    <span class="hljs-attr">enumerable</span>: enumerable,
    <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">get</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// &#x5C06;&#x8BE5;&#x65B9;&#x6CD5;&#x7ED1;&#x5B9A;this</span>
      <span class="hljs-keyword">var</span> boundFn = fn.bind(<span class="hljs-keyword">this</span>);
      <span class="hljs-comment">// &#x4F7F;&#x7528;Object.defineProperty&#x91CD;&#x65B0;&#x5B9A;&#x4E49;&#x8BE5;&#x65B9;&#x6CD5;</span>
      <span class="hljs-built_in">Object</span>.defineProperty(<span class="hljs-keyword">this</span>, key, {
        <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">value</span>: boundFn
      })

      <span class="hljs-keyword">return</span> boundFn;
    }
  }
}</code></pre><p>&#x6211;&#x4EEC;&#x901A;&#x8FC7;<code>bind</code>&#x5B9E;&#x73B0;&#x4E86;<code>this</code>&#x7684;&#x7ED1;&#x5B9A;&#xFF0C;&#x5E76;&#x5728;<code>get</code>&#x4E2D;&#x5229;&#x7528;<code>Object.defineProperty</code>&#x91CD;&#x5199;&#x4E86;&#x8BE5;&#x65B9;&#x6CD5;&#xFF0C;&#x5C06;<code>value</code>&#x5B9A;&#x4E49;&#x4E3A;&#x901A;&#x8FC7;<code>bind</code>&#x7ED1;&#x5B9A;&#x540E;&#x7684;&#x51FD;&#x6570;<code>boundFn</code>&#xFF0C;&#x4EE5;&#x6B64;&#x5B9E;&#x73B0;&#x4E86;<code>this</code>&#x6C38;&#x8FDC;&#x6307;&#x5411;&#x5B9E;&#x4F8B;&#x3002;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x4E3A;<code>getPerson</code>&#x65B9;&#x6CD5;&#x52A0;&#x4E0A;&#x88C5;&#x9970;&#x5E76;&#x8C03;&#x7528;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Person {
  @autobind
  getPerson() {
    return this;
  }
}

let person = new Person();
let { getPerson } = person;

console.log(getPerson() === person); // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
  @autobind
  getPerson() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  }
}

<span class="hljs-keyword">let</span> person = <span class="hljs-keyword">new</span> Person();
<span class="hljs-keyword">let</span> { getPerson } = person;

<span class="hljs-built_in">console</span>.log(getPerson() === person); <span class="hljs-comment">// true</span></code></pre><h3 id="articleHeader2"><strong>2.2 <code>@debounce</code>&#x5B9E;&#x73B0;&#x51FD;&#x6570;&#x9632;&#x6296;</strong></h3><p>&#x51FD;&#x6570;&#x9632;&#x6296;(debounce)&#x5728;&#x524D;&#x7AEF;&#x9879;&#x76EE;&#x4E2D;&#x6709;&#x7740;&#x5F88;&#x591A;&#x7684;&#x5E94;&#x7528;&#xFF0C;&#x4F8B;&#x5982;&#x5728;<code>resize</code>&#x6216;<code>scroll</code>&#x7B49;&#x4E8B;&#x4EF6;&#x4E2D;&#x64CD;&#x4F5C;DOM&#xFF0C;&#x6216;&#x5BF9;&#x7528;&#x6237;&#x8F93;&#x5165;&#x5B9E;&#x73B0;&#x5B9E;&#x65F6;ajax&#x641C;&#x7D22;&#x7B49;&#x4F1A;&#x88AB;&#x9AD8;&#x9891;&#x7684;&#x89E6;&#x53D1;&#xFF0C;&#x524D;&#x8005;&#x4F1A;&#x5BF9;&#x6D4F;&#x89C8;&#x5668;&#x6027;&#x80FD;&#x4EA7;&#x751F;&#x76F4;&#x89C2;&#x7684;&#x5F71;&#x54CD;&#xFF0C;&#x540E;&#x8005;&#x4F1A;&#x5BF9;&#x670D;&#x52A1;&#x5668;&#x4EA7;&#x751F;&#x8F83;&#x5927;&#x7684;&#x538B;&#x529B;&#xFF0C;&#x6211;&#x4EEC;&#x671F;&#x671B;&#x8FD9;&#x7C7B;&#x9AD8;&#x9891;&#x8FDE;&#x7EED;&#x89E6;&#x53D1;&#x7684;&#x4E8B;&#x4EF6;&#x5728;&#x89E6;&#x53D1;&#x7ED3;&#x675F;&#x540E;&#x518D;&#x505A;&#x51FA;&#x54CD;&#x5E94;&#xFF0C;&#x8FD9;&#x5C31;&#x662F;&#x51FD;&#x6570;&#x9632;&#x6296;&#x7684;&#x5E94;&#x7528;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Editor {
  constructor() {
    this.content = &apos;&apos;;
  }

  updateContent(content) {
    console.log(content);
    this.content = content;
    // &#x540E;&#x9762;&#x6709;&#x4E00;&#x4E9B;&#x6D88;&#x8017;&#x6027;&#x80FD;&#x7684;&#x64CD;&#x4F5C;
  }
}

const editor1 = new Editor();
editor1.updateContent(1);
setTimeout(() =&gt; { editor1.updateContent(2); }, 400);


const editor2= new Editor();
editor2.updateContent(3);
setTimeout(() =&gt; { editor2.updateContent(4); }, 600);

// &#x6253;&#x5370;&#x7ED3;&#x679C;: 1 3 2 4" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Editor</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.content = <span class="hljs-string">&apos;&apos;</span>;
  }

  updateContent(content) {
    <span class="hljs-built_in">console</span>.log(content);
    <span class="hljs-keyword">this</span>.content = content;
    <span class="hljs-comment">// &#x540E;&#x9762;&#x6709;&#x4E00;&#x4E9B;&#x6D88;&#x8017;&#x6027;&#x80FD;&#x7684;&#x64CD;&#x4F5C;</span>
  }
}

<span class="hljs-keyword">const</span> editor1 = <span class="hljs-keyword">new</span> Editor();
editor1.updateContent(<span class="hljs-number">1</span>);
setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { editor1.updateContent(<span class="hljs-number">2</span>); }, <span class="hljs-number">400</span>);


<span class="hljs-keyword">const</span> editor2= <span class="hljs-keyword">new</span> Editor();
editor2.updateContent(<span class="hljs-number">3</span>);
setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { editor2.updateContent(<span class="hljs-number">4</span>); }, <span class="hljs-number">600</span>);

<span class="hljs-comment">// &#x6253;&#x5370;&#x7ED3;&#x679C;: 1 3 2 4</span></code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#x6211;&#x4EEC;&#x5B9A;&#x4E49;&#x4E86;<code>Editor</code>&#x8FD9;&#x4E2A;&#x7C7B;&#xFF0C;&#x5176;&#x4E2D;<code>updateContent</code>&#x65B9;&#x6CD5;&#x4F1A;&#x5728;&#x7528;&#x6237;&#x8F93;&#x5165;&#x65F6;&#x6267;&#x884C;&#x5E76;&#x53EF;&#x80FD;&#x6709;&#x4E00;&#x4E9B;&#x6D88;&#x8017;&#x6027;&#x80FD;&#x7684;DOM&#x64CD;&#x4F5C;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x5728;&#x8BE5;&#x65B9;&#x6CD5;&#x5185;&#x90E8;&#x6253;&#x5370;&#x4E86;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#x4EE5;&#x9A8C;&#x8BC1;&#x8C03;&#x7528;&#x8FC7;&#x7A0B;&#x3002;&#x53EF;&#x4EE5;&#x770B;&#x5230;4&#x6B21;&#x7684;&#x8C03;&#x7528;&#x7ED3;&#x679C;&#x5206;&#x522B;&#x4E3A;<code>1 3 2 4</code>&#x3002;</p><p>&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;<code>debounce</code>&#x51FD;&#x6570;&#xFF0C;&#x8BE5;&#x65B9;&#x6CD5;&#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x6570;&#x5B57;&#x7C7B;&#x578B;&#x7684;<code>timeout</code>&#x53C2;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function debounce(timeout) {
  const instanceMap = new Map(); // &#x521B;&#x5EFA;&#x4E00;&#x4E2A;Map&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF0C;&#x5C06;&#x5B9E;&#x4F8B;&#x5316;&#x5BF9;&#x8C61;&#x4F5C;&#x4E3A;key

  return function (target, key, descriptor) {

    return Object.assign({}, descriptor, {
      value: function value() {

        // &#x6E05;&#x9664;&#x5EF6;&#x65F6;&#x5668;
        clearTimeout(instanceMap.get(this));
        // &#x8BBE;&#x7F6E;&#x5EF6;&#x65F6;&#x5668;
        instanceMap.set(this, setTimeout(() =&gt; {
          // &#x8C03;&#x7528;&#x8BE5;&#x65B9;&#x6CD5;
          descriptor.value.apply(this, arguments);
          // &#x5C06;&#x5EF6;&#x65F6;&#x5668;&#x8BBE;&#x7F6E;&#x4E3A; null
          instanceMap.set(this, null);
        }, timeout));
      }
    })
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">debounce</span>(<span class="hljs-params">timeout</span>) </span>{
  <span class="hljs-keyword">const</span> instanceMap = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>(); <span class="hljs-comment">// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;Map&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF0C;&#x5C06;&#x5B9E;&#x4F8B;&#x5316;&#x5BF9;&#x8C61;&#x4F5C;&#x4E3A;key</span>

  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">target, key, descriptor</span>) </span>{

    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.assign({}, descriptor, {
      <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">value</span>(<span class="hljs-params"></span>) </span>{

        <span class="hljs-comment">// &#x6E05;&#x9664;&#x5EF6;&#x65F6;&#x5668;</span>
        clearTimeout(instanceMap.get(<span class="hljs-keyword">this</span>));
        <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x5EF6;&#x65F6;&#x5668;</span>
        instanceMap.set(<span class="hljs-keyword">this</span>, setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
          <span class="hljs-comment">// &#x8C03;&#x7528;&#x8BE5;&#x65B9;&#x6CD5;</span>
          descriptor.value.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
          <span class="hljs-comment">// &#x5C06;&#x5EF6;&#x65F6;&#x5668;&#x8BBE;&#x7F6E;&#x4E3A; null</span>
          instanceMap.set(<span class="hljs-keyword">this</span>, <span class="hljs-literal">null</span>);
        }, timeout));
      }
    })
  }
}</code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x65B9;&#x6CD5;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x91C7;&#x7528;&#x4E86;ES6&#x63D0;&#x4F9B;&#x7684;<code>Map</code>&#x6570;&#x636E;&#x7ED3;&#x6784;&#x53BB;&#x5B9E;&#x73B0;&#x5B9E;&#x4F8B;&#x5316;&#x5BF9;&#x8C61;&#x548C;&#x5EF6;&#x65F6;&#x5668;&#x7684;&#x6620;&#x5C04;&#x3002;&#x5728;&#x51FD;&#x6570;&#x7684;&#x5185;&#x90E8;&#xFF0C;&#x9996;&#x5148;&#x6E05;&#x9664;&#x5EF6;&#x65F6;&#x5668;&#xFF0C;&#x63A5;&#x7740;&#x8BBE;&#x7F6E;&#x5EF6;&#x65F6;&#x6267;&#x884C;&#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x662F;&#x5B9E;&#x73B0;<code>debounce</code>&#x7684;&#x901A;&#x7528;&#x65B9;&#x6CD5;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x6765;&#x6D4B;&#x8BD5;&#x4E00;&#x4E0B;<code>debounce</code>&#x88C5;&#x9970;&#x5668;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Editor {
  constructor() {
    this.content = &apos;&apos;;
  }

  @debounce(500)  
  updateContent(content) {
    console.log(content);
    this.content = content;
  }
}

const editor1 = new Editor();
editor1.updateContent(1);
setTimeout(() =&gt; { editor1.updateContent(2); }, 400);


const editor2= new Editor();
editor2.updateContent(3);
setTimeout(() =&gt; { editor2.updateContent(4); }, 600);

//&#x6253;&#x5370;&#x7ED3;&#x679C;&#xFF1A; 3 2 4" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Editor</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.content = <span class="hljs-string">&apos;&apos;</span>;
  }

  @debounce(<span class="hljs-number">500</span>)  
  updateContent(content) {
    <span class="hljs-built_in">console</span>.log(content);
    <span class="hljs-keyword">this</span>.content = content;
  }
}

<span class="hljs-keyword">const</span> editor1 = <span class="hljs-keyword">new</span> Editor();
editor1.updateContent(<span class="hljs-number">1</span>);
setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { editor1.updateContent(<span class="hljs-number">2</span>); }, <span class="hljs-number">400</span>);


<span class="hljs-keyword">const</span> editor2= <span class="hljs-keyword">new</span> Editor();
editor2.updateContent(<span class="hljs-number">3</span>);
setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { editor2.updateContent(<span class="hljs-number">4</span>); }, <span class="hljs-number">600</span>);

<span class="hljs-comment">//&#x6253;&#x5370;&#x7ED3;&#x679C;&#xFF1A; 3 2 4</span></code></pre><p>&#x4E0A;&#x9762;&#x8C03;&#x7528;&#x4E86;4&#x6B21;<code>updateContent</code>&#x65B9;&#x6CD5;&#xFF0C;&#x6253;&#x5370;&#x7ED3;&#x679C;&#x4E3A;<code>3 2 4</code>&#x3002;<code>1</code>&#x7531;&#x4E8E;&#x5728;<code>400ms</code>&#x5185;&#x88AB;&#x91CD;&#x590D;&#x8C03;&#x7528;&#x800C;&#x6CA1;&#x6709;&#x88AB;&#x6253;&#x5370;&#xFF0C;&#x8FD9;&#x7B26;&#x5408;&#x6211;&#x4EEC;&#x7684;&#x53C2;&#x6570;&#x4E3A;<code>500</code>&#x7684;&#x9884;&#x671F;&#x3002;</p><h3 id="articleHeader3"><strong>2.3 <code>@deprecate</code>&#x5B9E;&#x73B0;&#x8B66;&#x544A;&#x63D0;&#x793A;</strong></h3><p>&#x5728;&#x4F7F;&#x7528;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x65F6;&#x4E0D;&#x65F6;&#x7684;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x9047;&#x89C1;&#x4E00;&#x4E9B;&#x8B66;&#x544A;&#xFF0C;&#x8FD9;&#x4E9B;&#x8B66;&#x544A;&#x7528;&#x6765;&#x63D0;&#x9192;&#x5F00;&#x53D1;&#x8005;&#x6240;&#x8C03;&#x7528;&#x7684;&#x65B9;&#x6CD5;&#x4F1A;&#x5728;&#x4E0B;&#x4E2A;&#x7248;&#x672C;&#x4E2D;&#x88AB;&#x5F03;&#x7528;&#x3002;&#x8FD9;&#x6837;&#x7684;&#x4E00;&#x884C;&#x6253;&#x5370;&#x4FE1;&#x606F;&#x4E5F;&#x8BB8;&#x6211;&#x4EEC;&#x7684;&#x5E38;&#x89C4;&#x505A;&#x6CD5;&#x662F;&#x5728;&#x65B9;&#x6CD5;&#x5185;&#x90E8;&#x6DFB;&#x52A0;&#x4E00;&#x884C;&#x4EE3;&#x7801;&#x5373;&#x53EF;&#xFF0C;&#x8FD9;&#x6837;&#x5176;&#x5B9E;&#x5728;&#x6E90;&#x7801;&#x9605;&#x8BFB;&#x4E0A;&#x5E76;&#x4E0D;&#x53CB;&#x597D;&#xFF0C;&#x4E5F;&#x4E0D;&#x7B26;&#x5408;&#x5355;&#x4E00;&#x804C;&#x8D23;&#x539F;&#x5219;&#x3002;&#x5982;&#x679C;&#x5728;&#x9700;&#x8981;&#x629B;&#x51FA;&#x8B66;&#x544A;&#x7684;&#x65B9;&#x6CD5;&#x524D;&#x9762;&#x52A0;&#x4E00;&#x4E2A;<code>@deprecate</code>&#x7684;&#x88C5;&#x9970;&#x5668;&#x6765;&#x5B9E;&#x73B0;&#x8B66;&#x544A;&#xFF0C;&#x4F1A;&#x53CB;&#x597D;&#x5F97;&#x591A;&#x3002;</p><p>&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x6765;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;<code>@deprecate</code>&#x7684;&#x88C5;&#x9970;&#x5668;&#xFF0C;&#x5176;&#x5B9E;&#x8FD9;&#x7C7B;&#x7684;&#x88C5;&#x9970;&#x5668;&#x4E5F;&#x53EF;&#x4EE5;&#x6269;&#x5C55;&#x6210;&#x4E3A;&#x6253;&#x5370;&#x65E5;&#x5FD7;&#x88C5;&#x9970;&#x5668;<code>@log</code>&#xFF0C;&#x4E0A;&#x62A5;&#x4FE1;&#x606F;&#x88C5;&#x9970;&#x5668;<code>@fetchInfo</code>&#x7B49;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function deprecate(deprecatedObj) {

  return function(target, key, descriptor) {
    const deprecatedInfo = deprecatedObj.info;
    const deprecatedUrl = deprecatedObj.url;
    // &#x8B66;&#x544A;&#x4FE1;&#x606F;
    const txt = `DEPRECATION ${target.constructor.name}#${key}: ${deprecatedInfo}. ${deprecatedUrl ? &apos;See &apos;+ deprecatedUrl + &apos; for more detail&apos; : &apos;&apos;}`;
    
    return Object.assign({}, descriptor, {
      value: function value() {
        // &#x6253;&#x5370;&#x8B66;&#x544A;&#x4FE1;&#x606F;
        console.warn(txt);
        descriptor.value.apply(this, arguments);
      }
    })
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deprecate</span>(<span class="hljs-params">deprecatedObj</span>) </span>{

  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">target, key, descriptor</span>) </span>{
    <span class="hljs-keyword">const</span> deprecatedInfo = deprecatedObj.info;
    <span class="hljs-keyword">const</span> deprecatedUrl = deprecatedObj.url;
    <span class="hljs-comment">// &#x8B66;&#x544A;&#x4FE1;&#x606F;</span>
    <span class="hljs-keyword">const</span> txt = <span class="hljs-string">`DEPRECATION <span class="hljs-subst">${target.constructor.name}</span>#<span class="hljs-subst">${key}</span>: <span class="hljs-subst">${deprecatedInfo}</span>. <span class="hljs-subst">${deprecatedUrl ? <span class="hljs-string">&apos;See &apos;</span>+ deprecatedUrl + <span class="hljs-string">&apos; for more detail&apos;</span> : <span class="hljs-string">&apos;&apos;</span>}</span>`</span>;
    
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.assign({}, descriptor, {
      <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">value</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// &#x6253;&#x5370;&#x8B66;&#x544A;&#x4FE1;&#x606F;</span>
        <span class="hljs-built_in">console</span>.warn(txt);
        descriptor.value.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
      }
    })
  }
}</code></pre><p>&#x4E0A;&#x9762;&#x7684;<code>deprecate</code>&#x51FD;&#x6570;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x53C2;&#x6570;&#xFF0C;&#x8BE5;&#x53C2;&#x6570;&#x5206;&#x522B;&#x6709;<code>info</code>&#x548C;<code>url</code>&#x4E24;&#x4E2A;&#x952E;&#x503C;&#xFF0C;&#x5176;&#x4E2D;<code>info</code>&#x586B;&#x5165;&#x8B66;&#x544A;&#x4FE1;&#x606F;&#xFF0C;<code>url</code>&#x4E3A;&#x9009;&#x586B;&#x7684;&#x8BE6;&#x60C5;&#x7F51;&#x9875;&#x5730;&#x5740;&#x3002;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x6765;&#x4E3A;&#x4E00;&#x4E2A;&#x540D;&#x4E3A;<code>MyLib</code>&#x7684;&#x5E93;&#x7684;<code>deprecatedMethod</code>&#x65B9;&#x6CD5;&#x6DFB;&#x52A0;&#x8BE5;&#x88C5;&#x9970;&#x5668;&#x5427;&#xFF01;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyLib {
  @deprecate({
    info: &apos;The methods will be deprecated in next version&apos;, 
    url: &apos;http://www.baidu.com&apos;
  })
  deprecatedMethod(txt) {
    console.log(txt)
  }
}

const lib = new MyLib();
lib.deprecatedMethod(&apos;&#x8C03;&#x7528;&#x4E86;&#x4E00;&#x4E2A;&#x8981;&#x5728;&#x4E0B;&#x4E2A;&#x7248;&#x672C;&#x88AB;&#x79FB;&#x9664;&#x7684;&#x65B9;&#x6CD5;&apos;);
// DEPRECATION MyLib#deprecatedMethod: The methods will be deprecated in next version. See http://www.baidu.com for more detail
// &#x8C03;&#x7528;&#x4E86;&#x4E00;&#x4E2A;&#x8981;&#x5728;&#x4E0B;&#x4E2A;&#x7248;&#x672C;&#x88AB;&#x79FB;&#x9664;&#x7684;&#x65B9;&#x6CD5;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyLib</span> </span>{
  @deprecate({
    <span class="hljs-attr">info</span>: <span class="hljs-string">&apos;The methods will be deprecated in next version&apos;</span>, 
    <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;http://www.baidu.com&apos;</span>
  })
  deprecatedMethod(txt) {
    <span class="hljs-built_in">console</span>.log(txt)
  }
}

<span class="hljs-keyword">const</span> lib = <span class="hljs-keyword">new</span> MyLib();
lib.deprecatedMethod(<span class="hljs-string">&apos;&#x8C03;&#x7528;&#x4E86;&#x4E00;&#x4E2A;&#x8981;&#x5728;&#x4E0B;&#x4E2A;&#x7248;&#x672C;&#x88AB;&#x79FB;&#x9664;&#x7684;&#x65B9;&#x6CD5;&apos;</span>);
<span class="hljs-comment">// DEPRECATION MyLib#deprecatedMethod: The methods will be deprecated in next version. See http://www.baidu.com for more detail</span>
<span class="hljs-comment">// &#x8C03;&#x7528;&#x4E86;&#x4E00;&#x4E2A;&#x8981;&#x5728;&#x4E0B;&#x4E2A;&#x7248;&#x672C;&#x88AB;&#x79FB;&#x9664;&#x7684;&#x65B9;&#x6CD5;</span></code></pre><h3 id="articleHeader4"><strong>3 &#x603B;&#x7ED3;</strong></h3><p>&#x901A;&#x8FC7;ESnext&#x4E2D;&#x7684;&#x88C5;&#x9970;&#x5668;&#x5B9E;&#x73B0;&#x88C5;&#x9970;&#x5668;&#x6A21;&#x5F0F;&#xFF0C;&#x4E0D;&#x4EC5;&#x6709;&#x4E3A;&#x7C7B;&#x6269;&#x5145;&#x529F;&#x80FD;&#x7684;&#x4F5C;&#x7528;&#xFF0C;&#x800C;&#x4E14;&#x5728;&#x9605;&#x8BFB;&#x6E90;&#x7801;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x8D77;&#x5230;&#x4E86;&#x63D0;&#x793A;&#x4F5C;&#x7528;&#x3002;&#x4E0A;&#x9762;&#x6240;&#x4E3E;&#x5230;&#x7684;&#x4F8B;&#x5B50;&#x53EA;&#x662F;&#x7ED3;&#x5408;&#x88C5;&#x9970;&#x5668;&#x7684;&#x65B0;&#x8BED;&#x6CD5;&#x548C;&#x88C5;&#x9970;&#x5668;&#x6A21;&#x5F0F;&#x505A;&#x4E86;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x5C01;&#x88C5;&#xFF0C;&#x8BF7;&#x52FF;&#x7528;&#x4E8E;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x3002;&#x5982;&#x679C;&#x4F60;&#x73B0;&#x5728;&#x5DF2;&#x7ECF;&#x4F53;&#x4F1A;&#x5230;&#x4E86;&#x88C5;&#x9970;&#x5668;&#x6A21;&#x5F0F;&#x7684;&#x597D;&#x5904;&#xFF0C;&#x5E76;&#x60F3;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x5927;&#x91CF;&#x4F7F;&#x7528;&#xFF0C;&#x4E0D;&#x59A8;&#x770B;&#x4E00;&#x4E0B;<a href="https://www.npmjs.com/package/core-decorators" rel="nofollow noreferrer" target="_blank"><code>core-decorators</code></a>&#x8FD9;&#x4E2A;&#x5E93;&#xFF0C;&#x5176;&#x4E2D;&#x5C01;&#x88C5;&#x4E86;&#x5F88;&#x591A;&#x5E38;&#x7528;&#x7684;&#x88C5;&#x9970;&#x5668;.</p><h3 id="articleHeader5"><strong>&#x53C2;&#x8003;&#x6587;&#x732E;</strong></h3><ol><li><a href="http://imweb.io/topic/5b1403bbd4c96b9b1b4c4e9e" rel="nofollow noreferrer" target="_blank">IMWeb&#x7684;&#x524D;&#x7AEF;&#x535A;&#x5BA2;&#xFF1A;&#x6D45;&#x8C08;JS&#x4E2D;&#x7684;&#x88C5;&#x9970;&#x5668;&#x6A21;&#x5F0F;</a></li><li><a href="http://taobaofed.org/blog/2015/11/16/es7-decorator/" rel="nofollow noreferrer" target="_blank">&#x6DD8;&#x5B9D;&#x524D;&#x7AEF;&#x56E2;&#x961F;&#xFF1A;ES7 Decorator &#x88C5;&#x9970;&#x8005;&#x6A21;&#x5F0F;</a></li><li><a href="http://es6.ruanyifeng.com/#docs/decorator" rel="nofollow noreferrer" target="_blank">&#x962E;&#x4E00;&#x5CF0;&#xFF1A;ECMAScript 6 &#x5165;&#x95E8;</a></li></ol>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从ES6重新认识JavaScript设计模式: 装饰器模式

## 原文链接
[https://segmentfault.com/a/1190000015970099](https://segmentfault.com/a/1190000015970099)

