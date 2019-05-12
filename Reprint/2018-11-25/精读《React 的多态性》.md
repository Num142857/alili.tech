---
title: '精读《React 的多态性》' 
date: 2018-11-25 2:30:07
hidden: true
slug: tcyqs3l7z3t
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">1 &#x5F15;&#x8A00;</h2><p>&#x672C;&#x5468;&#x7CBE;&#x8BFB;&#x7684;&#x6587;&#x7AE0;&#x662F;&#xFF1A;<a href="https://medium.com/@bmeurer/surprising-polymorphism-in-react-applications-63015b50abc" rel="nofollow noreferrer" target="_blank">surprising-polymorphism-in-react-applications</a>&#xFF0C;&#x770B;&#x770B;&#x4F5C;&#x8005;&#x662F;&#x5982;&#x4F55;&#x89E3;&#x91CA;&#x8FD9;&#x4E2A;&#x591A;&#x6001;&#x6027;&#x542B;&#x4E49;&#x7684;&#x3002;</p><p>&#x8BFB;&#x5B8C;&#x6587;&#x7AE0;&#x624D;&#x53D1;&#x73B0;&#xFF0C;&#x6587;&#x7AE0;&#x6807;&#x9898;&#x6539;&#x4E3A; Redux &#x7684;&#x591A;&#x6001;&#x6027;&#x66F4;&#x59A5;&#x5F53;&#xFF0C;&#x56E0;&#x4E3A;&#x6574;&#x7BC7;&#x6587;&#x7AE0;&#x90FD;&#x5728;&#x8BF4; Redux&#xFF0C;&#x800C; Redux &#x4F7F;&#x7528;&#x573A;&#x666F;&#x4E0D;&#x5C40;&#x9650;&#x4E8E; React&#x3002;</p><h2 id="articleHeader1">2 &#x6982;&#x8FF0;</h2><p>Redux immutable &#x7279;&#x6027;&#x53EF;&#x80FD;&#x4EA7;&#x751F;&#x6D4F;&#x89C8;&#x5668;&#x65E0;&#x6CD5;&#x4F18;&#x5316;&#x7684;&#x6027;&#x80FD;&#x95EE;&#x9898;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6D4F;&#x89C8;&#x5668;&#x65E0;&#x6CD5;&#x505A; <a href="https://github.com/dt-fe/weekly/blob/master/62.%E7%B2%BE%E8%AF%BB%E3%80%8AJS%20%E5%BC%95%E6%93%8E%E5%9F%BA%E7%A1%80%E4%B9%8B%20Shapes%20and%20Inline%20Caches%E3%80%8B.md#shapes" rel="nofollow noreferrer" target="_blank">shapes &#x4F18;&#x5316;</a>&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x4E0A;&#x4E00;&#x7BC7;&#x7CBE;&#x8BFB;&#x300A;JS &#x5F15;&#x64CE;&#x57FA;&#x7840;&#x4E4B; Shapes and Inline Caches&#x300B; &#x91CC;&#x63D0;&#x5230;&#x7684;&#x3002;</p><p>&#x5148;&#x770B;&#x770B;&#x666E;&#x901A;&#x7684; redux &#x7684; reducer&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const todo = (state = {}, action) =&gt; {
  switch (action.type) {
    case &quot;ADD_TODO&quot;:
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case &quot;TOGGLE_TODO&quot;:
      if (state.id !== action.id) {
        return state;
      }

      return Object.assign({}, state, {
        completed: !state.completed
      });

    default:
      return state;
  }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">const</span> todo = <span class="hljs-function">(<span class="hljs-params">state = {}, action</span>) =&gt;</span> {
  <span class="hljs-keyword">switch</span> (action.type) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&quot;ADD_TODO&quot;</span>:
      <span class="hljs-keyword">return</span> {
        id: action.id,
        text: action.text,
        completed: <span class="hljs-literal">false</span>
      };
    <span class="hljs-keyword">case</span> <span class="hljs-string">&quot;TOGGLE_TODO&quot;</span>:
      <span class="hljs-keyword">if</span> (state.id !== action.id) {
        <span class="hljs-keyword">return</span> state;
      }

      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.assign({}, state, {
        completed: !state.completed
      });

    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">return</span> state;
  }
};</code></pre><p>&#x6211;&#x4EEC;&#x7B80;&#x5316;&#x4E00;&#x4E0B;&#x4F7F;&#x7528;&#x573A;&#x666F;&#xFF0C;&#x5047;&#x8BBE;&#x57FA;&#x4E8E;&#x8FD9;&#x4E2A; reducer <code>todo</code>&#xFF0C;&#x751F;&#x6210;&#x4E86;&#x4E24;&#x4E2A;&#x65B0; store <code>s1</code> <code>s2</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const s1 = todo(
  {},
  {
    type: &quot;ADD_TODO&quot;,
    id: 1,
    text: &quot;Finish blog post&quot;
  }
);

const s2 = todo(s1, {
  type: &quot;TOGGLE_TODO&quot;,
  id: 1
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">const</span> s1 = todo(
  {},
  {
    <span class="hljs-keyword">type</span>: <span class="hljs-string">&quot;ADD_TODO&quot;</span>,
    id: <span class="hljs-number">1</span>,
    text: <span class="hljs-string">&quot;Finish blog post&quot;</span>
  }
);

<span class="hljs-keyword">const</span> s2 = todo(s1, {
  <span class="hljs-keyword">type</span>: <span class="hljs-string">&quot;TOGGLE_TODO&quot;</span>,
  id: <span class="hljs-number">1</span>
});</code></pre><p>&#x770B;&#x4E0A;&#x53BB;&#x5F88;&#x5E38;&#x89C1;&#xFF0C;&#x4E5F;&#x7684;&#x786E;&#x5982;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x6BCF;&#x6B21; dispatch &#x90FD;&#x4F1A;&#x6839;&#x636E; reducer &#x751F;&#x6210;&#x65B0;&#x7684; store &#x6811;&#xFF0C;&#x800C;&#x4E14;&#x662F;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x5BF9;&#x8C61;&#x3002;&#x7136;&#x800C;&#x5BF9; js &#x5F15;&#x64CE;&#x800C;&#x8A00;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x4EE3;&#x7801;&#x53EF;&#x80FD;&#x505A;&#x4E0D;&#x4E86; Shapes &#x4F18;&#x5316;&#xFF08;&#x5173;&#x4E8E; Shapes &#x4F18;&#x5316;&#x5EFA;&#x8BAE;&#x9605;&#x8BFB;&#x4E0A;&#x4E00;&#x671F;&#x7CBE;&#x8BFB; <a href="https://github.com/dt-fe/weekly/blob/master/62.%E7%B2%BE%E8%AF%BB%E3%80%8AJS%20%E5%BC%95%E6%93%8E%E5%9F%BA%E7%A1%80%E4%B9%8B%20Shapes%20and%20Inline%20Caches%E3%80%8B.md#shapes" rel="nofollow noreferrer" target="_blank">Shapes &#x4F18;&#x5316;</a>&#xFF09;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6700;&#x9700;&#x8981;&#x505A;&#x4F18;&#x5316;&#x7684;&#x5168;&#x5C40; store&#xFF0C;&#x5728;&#x751F;&#x6210;&#x65B0; store &#x65F6;&#x65E0;&#x6CD5;&#x88AB;&#x6D4F;&#x89C8;&#x5668;&#x4F18;&#x5316;&#xFF0C;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x5F88;&#x5BB9;&#x6613;&#x88AB;&#x5FFD;&#x89C6;&#xFF0C;&#x4F46;&#x7684;&#x786E;&#x5F71;&#x54CD;&#x4E0D;&#x5C0F;&#x3002;</p><p>&#x81F3;&#x4E8E;&#x4E3A;&#x4EC0;&#x4E48;&#x4F1A;&#x963B;&#x6B62; js &#x5F15;&#x64CE;&#x7684; shapes &#x4F18;&#x5316;&#xFF0C;&#x770B;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// transition-trees.js
let a = {x:1, y:2, z:3};

let b = {};
b.x = 1;
b.y = 2;
b.z = 3;

console.log(&quot;a is&quot;, a);
console.log(&quot;b is&quot;, b);
console.log(&quot;a and b have same map:&quot;, %HaveSameMap(a, b));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// transition-trees.js</span>
<span class="hljs-keyword">let</span> a = {<span class="hljs-attr">x</span>:<span class="hljs-number">1</span>, <span class="hljs-attr">y</span>:<span class="hljs-number">2</span>, <span class="hljs-attr">z</span>:<span class="hljs-number">3</span>};

<span class="hljs-keyword">let</span> b = {};
b.x = <span class="hljs-number">1</span>;
b.y = <span class="hljs-number">2</span>;
b.z = <span class="hljs-number">3</span>;

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;a is&quot;</span>, a);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;b is&quot;</span>, b);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;a and b have same map:&quot;</span>, %HaveSameMap(a, b));</code></pre><p>&#x901A;&#x8FC7; <code>node --allow-natives-syntax test.js</code> &#x6267;&#x884C;&#xFF0C;&#x901A;&#x8FC7;&#x8C03;&#x7528; node &#x539F;&#x751F;&#x51FD;&#x6570; <code>%HaveSameMap</code> &#x5224;&#x65AD;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4E0B; <code>a</code> &#x4E0E; <code>b</code> &#x662F;&#x5426;&#x5171;&#x4EAB;&#x4E00;&#x4E2A; shape&#xFF08;v8 &#x5F15;&#x64CE;&#x7684; Shape &#x5B9E;&#x73B0;&#x79F0;&#x4E3A; Map&#xFF09;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015444860?w=1364&amp;h=1006" src="https://static.alili.tech/img/remote/1460000015444860?w=1364&amp;h=1006" alt="image" title="image" style="cursor:pointer;display:inline"></span></p><p>&#x7ED3;&#x679C;&#x662F; <code>false</code>&#xFF0C;&#x4E5F;&#x5C31;&#x662F; js &#x5F15;&#x64CE;&#x65E0;&#x6CD5;&#x5BF9; <code>a</code> <code>b</code> &#x505A; Shapes &#x4F18;&#x5316;&#xFF0C;&#x8FD9;&#x662F;&#x56E0;&#x4E3A; <code>a</code> &#x4E0E; <code>b</code> &#x5BF9;&#x8C61;&#x521D;&#x59CB;&#x5316;&#x7684;&#x65B9;&#x5F0F;&#x4E0D;&#x540C;&#x3002;</p><p>&#x540C;&#x6837;&#xFF0C;&#x5728; Redux &#x4EE3;&#x7801;&#x4E2D;&#x5E38;&#x7528;&#x7684; <code>Object.assign</code> &#x4E5F;&#x6709;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015444861" src="https://static.alili.tech/img/remote/1460000015444861" alt="image" title="image" style="cursor:pointer"></span></p><p>&#x56E0;&#x4E3A;&#x65B0;&#x7684;&#x5BF9;&#x8C61;&#x4EE5; <code>{}</code> &#x7A7A;&#x5BF9;&#x8C61;&#x4F5C;&#x4E3A;&#x6700;&#x521D;&#x72B6;&#x6001;&#xFF0C;js &#x5F15;&#x64CE;&#x4F1A;&#x4E3A;&#x65B0;&#x5BF9;&#x8C61;&#x521B;&#x5EFA; Empty Shape&#xFF0C;&#x8FD9;&#x4E0E;&#x539F;&#x5BF9;&#x8C61;&#x7684; Shape &#x4E00;&#x5B9A;&#x4E0D;&#x540C;&#x3002;</p><p>&#x987A;&#x5E26;&#x4E00;&#x63D0; es6 &#x7684;&#x89E3;&#x6784;&#x8BED;&#x6CD5;&#x4E5F;&#x5B58;&#x5728;&#x540C;&#x6837;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x56E0;&#x4E3A; <code>babel</code> &#x5C06;&#x89E3;&#x6784;&#x6700;&#x7EC8;&#x89E3;&#x6790;&#x4E3A; <code>Object.assign</code>&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015444862" src="https://static.alili.tech/img/remote/1460000015444862" alt="image" title="image" style="cursor:pointer;display:inline"></span></p><p>&#x5BF9;&#x8FD9;&#x79CD;&#x5C34;&#x5C2C;&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x4F5C;&#x8005;&#x7684;&#x5EFA;&#x8BAE;&#x662F;&#x5BF9;&#x6240;&#x6709;&#x5BF9;&#x8C61;&#x8D4B;&#x503C;&#x65F6;&#x90FD;&#x662F;&#x7528; <code>Object.assign</code> &#x4EE5;&#x4FDD;&#x8BC1; js &#x5F15;&#x64CE;&#x53EF;&#x4EE5;&#x505A; Shapes &#x4F18;&#x5316;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = Object.assign({}, {x:1, y:2, z:3});

let b = Object.assign({}, a);

console.log(&quot;a is&quot;, a);
console.log(&quot;b is&quot;, b);
console.log(&quot;a and b have same map:&quot;, %HaveSameMap(a, b)); // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> a = <span class="hljs-built_in">Object</span>.assign({}, {<span class="hljs-attr">x</span>:<span class="hljs-number">1</span>, <span class="hljs-attr">y</span>:<span class="hljs-number">2</span>, <span class="hljs-attr">z</span>:<span class="hljs-number">3</span>});

<span class="hljs-keyword">let</span> b = <span class="hljs-built_in">Object</span>.assign({}, a);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;a is&quot;</span>, a);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;b is&quot;</span>, b);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;a and b have same map:&quot;</span>, %HaveSameMap(a, b)); <span class="hljs-comment">// true</span></code></pre><h2 id="articleHeader2">3 &#x7CBE;&#x8BFB;</h2><p>&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x9700;&#x8981;&#x4E0E;&#x4E0A;&#x4E00;&#x7BC7; <a href="https://github.com/dt-fe/weekly/blob/master/62.%E7%B2%BE%E8%AF%BB%E3%80%8AJS%20%E5%BC%95%E6%93%8E%E5%9F%BA%E7%A1%80%E4%B9%8B%20Shapes%20and%20Inline%20Caches%E3%80%8B.md" rel="nofollow noreferrer" target="_blank">&#x7CBE;&#x8BFB;&#x300A;JS &#x5F15;&#x64CE;&#x57FA;&#x7840;&#x4E4B; Shapes and Inline Caches&#x300B;</a> &#x8FDE;&#x8D77;&#x6765;&#x770B;&#x5BB9;&#x6613;&#x7406;&#x89E3;&#x3002;</p><p>&#x4F5C;&#x8005;&#x63CF;&#x8FF0;&#x7684;&#x6027;&#x80FD;&#x95EE;&#x9898;&#x662F;&#x5F15;&#x64CE;&#x7EA7;&#x522B;&#x7684; Shapes &#x4F18;&#x5316;&#x95EE;&#x9898;&#xFF0C;&#x8BFB;&#x8FC7;&#x4E0A;&#x7BC7;&#x7CBE;&#x8BFB;&#x5C31;&#x5F88;&#x5BB9;&#x6613;&#x77E5;&#x9053;&#xFF0C;&#x53EA;&#x6709;&#x76F8;&#x540C;&#x521D;&#x59CB;&#x5316;&#x65B9;&#x5F0F;&#x7684;&#x5BF9;&#x8C61;&#x624D;&#x88AB; js &#x5F15;&#x64CE;&#x505A;&#x4F18;&#x5316;&#xFF0C;&#x800C; Redux &#x9891;&#x7E41;&#x751F;&#x6210;&#x7684; immutable &#x5168;&#x5C40; store &#x662F;&#x5426;&#x80FD;&#x88AB;&#x4F18;&#x5316;&#x5462;&#xFF1F;&#x7B54;&#x6848;&#x662F;&#x201C;&#x5F80;&#x5F80;&#x4E0D;&#x80FD;&#x201D;&#xFF0C;&#x56E0;&#x4E3A; immutable &#x8D4B;&#x503C;&#x95EE;&#x9898;&#xFF0C;&#x6211;&#x4EEC;&#x5F80;&#x5F80;&#x91C7;&#x7528; <code>Object.assign</code> &#x6216;&#x8005;&#x89E3;&#x6784;&#x65B9;&#x5F0F;&#x8D4B;&#x503C;&#xFF0C;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x4EA7;&#x751F;&#x7684;&#x65B0;&#x5BF9;&#x8C61;&#x4E0E;&#x539F;&#x5BF9;&#x8C61;&#x7684; Shape &#x4E0D;&#x540C;&#xFF0C;&#x5BFC;&#x81F4; Shape &#x65E0;&#x6CD5;&#x590D;&#x7528;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x89E3;&#x91CA;&#x4E00;&#x4E0B;&#x7591;&#x60D1;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x8BF4; immutable &#x5BF9;&#x8C61;&#x4E4B;&#x95F4;&#x4E5F;&#x8981;&#x4F18;&#x5316;&#x5462;&#xFF1F;&#x8FD9;&#x4E0D;&#x662F;&#x4E24;&#x4E2A;&#x4E0D;&#x540C;&#x7684;&#x5F15;&#x7528;&#x5417;&#xFF1F;&#x8FD9;&#x662F;&#x56E0;&#x4E3A; js &#x5F15;&#x64CE;&#x7EA7;&#x522B;&#x7684; Shapes &#x4F18;&#x5316;&#x5C31;&#x662F;&#x9488;&#x5BF9;&#x4E0D;&#x540C;&#x5F15;&#x7528;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x5C06;&#x5BF9;&#x8C61;&#x7684;&#x7ED3;&#x6784;&#xFF1A;Shape &#x4E0E;&#x6570;&#x636E;&#x5206;&#x79BB;&#x5F00;&#xFF0C;&#x8FD9;&#x6837;&#x53EF;&#x4EE5;&#x5927;&#x5E45;&#x4F18;&#x5316;&#x5B58;&#x50A8;&#x6548;&#x7387;&#xFF0C;&#x5BF9;&#x6570;&#x7EC4;&#x4E5F;&#x4E00;&#x6837;&#xFF0C;&#x4E0A;&#x4E00;&#x7BC7;&#x7CBE;&#x8BFB;&#x6709;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#x3002;</p><p>&#x6240;&#x4EE5;&#x7B14;&#x8005;&#x66F4;&#x63A8;&#x8350;&#x4F7F;&#x7528;&#x6BD4;&#x5982; <a href="https://github.com/facebook/immutable-js" rel="nofollow noreferrer" target="_blank">immutable-js</a> &#x8FD9;&#x79CD;&#x5E93;&#x64CD;&#x4F5C; immutable &#x5BF9;&#x8C61;&#xFF0C;&#x800C;&#x4E0D;&#x662F; Object.assign&#xFF0C;&#x56E0;&#x4E3A;&#x5C01;&#x88C5;&#x5E93;&#x5185;&#x90E8;&#x662F;&#x53EF;&#x80FD;&#x901A;&#x8FC7;&#x7EDF;&#x4E00;&#x5BF9;&#x8C61;&#x521D;&#x59CB;&#x5316;&#x65B9;&#x5F0F;&#x5229;&#x7528; js &#x5F15;&#x64CE;&#x8FDB;&#x884C;&#x4F18;&#x5316;&#x7684;&#x3002;</p><h2 id="articleHeader3">4 &#x603B;&#x7ED3;</h2><p>&#x539F;&#x6587;&#x63D0;&#x5230;&#x7684;&#x591A;&#x6001;&#x662F;&#x6307;&#x591A;&#x4E2A;&#x76F8;&#x540C;&#x7ED3;&#x6784;&#x5BF9;&#x8C61;&#xFF0C;&#x88AB;&#x62C6;&#x5206;&#x6210;&#x4E86;&#x591A;&#x4E2A; Shape&#xFF1B;&#x800C;&#x5355;&#x6001;&#x662F;&#x6307;&#x8FD9;&#x4E9B;&#x5BF9;&#x8C61;&#x53EF;&#x4EE5;&#x88AB;&#x4E00;&#x4E2A; Shape &#x590D;&#x7528;&#x3002;</p><p>&#x7B14;&#x8005;&#x4EE5;&#x524D;&#x4E5F;&#x7ECF;&#x5386;&#x8FC7;&#x4ECE; <code>Object.assign</code> &#x5230; Immutablejs &#x5E93;&#xFF0C;&#x6700;&#x540E;&#x53C8;&#x56DE;&#x5230;&#x89E3;&#x6784;&#x65B0;&#x8BED;&#x6CD5;&#x7684;&#x7ECF;&#x5386;&#xFF0C;&#x89C9;&#x5F97;&#x5728;&#x5C42;&#x7EA7;&#x4E0D;&#x6DF1;&#x60C5;&#x51B5;&#x4E0B;&#x89E3;&#x6784;&#x8BED;&#x6CD5;&#x53EF;&#x4EE5;&#x4EE3;&#x66FF; Immutablejs &#x5E93;&#x3002;</p><p>&#x901A;&#x8FC7;&#x6700;&#x8FD1;&#x4E24;&#x7BC7;&#x7CBE;&#x8BFB;&#x7684;&#x5206;&#x6790;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x91CD;&#x65B0;&#x601D;&#x8003;&#x8FD9;&#x6837;&#x505A;&#x5E26;&#x6765;&#x7684;&#x4F18;&#x7F3A;&#x70B9;&#xFF0C;&#x56E0;&#x4E3A;&#x5728; js &#x73AF;&#x5883;&#x4E2D;&#xFF0C;<code>Object.assign</code> &#x7684;&#x4F18;&#x5316;&#x6548;&#x7387;&#x6BD4; Immutablejs &#x5E93;&#x66F4;&#x4F4E;&#x3002;</p><p>&#x6700;&#x540E;&#xFF0C;&#x4E5F;&#x5B8C;&#x5168;&#x6CA1;&#x5FC5;&#x8981;&#x73B0;&#x5728;&#x5C31;&#x5F00;&#x59CB;&#x91CD;&#x6784;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x53EA;&#x662F; js &#x8FD0;&#x884C;&#x73AF;&#x5883;&#x4E2D;&#x5F88;&#x5C0F;&#x4E00;&#x90E8;&#x5206;&#x5F71;&#x54CD;&#x56E0;&#x7D20;&#xFF0C;&#x6BD4;&#x5982;&#x4E3A;&#x4E86;&#x5F15;&#x5165; Immutablejs &#x8BA9;&#x4F60;&#x7684;&#x7F51;&#x7EDC;&#x5EF6;&#x65F6;&#x589E;&#x52A0;&#x4E86; 100%&#xFF1F;&#x6240;&#x4EE5;&#x4EC5;&#x5728;&#x6709;&#x5FC5;&#x8981;&#x7684;&#x65F6;&#x5019;&#x4F18;&#x5316;&#x5B83;&#x3002;</p><h2 id="articleHeader4">5 &#x66F4;&#x591A;&#x8BA8;&#x8BBA;</h2><blockquote>&#x8BA8;&#x8BBA;&#x5730;&#x5740;&#x662F;&#xFF1A;<a href="https://github.com/dt-fe/weekly/issues/92" rel="nofollow noreferrer" target="_blank">&#x7CBE;&#x8BFB;&#x300A;React &#x7684;&#x591A;&#x6001;&#x6027;&#x300B; &#xB7; Issue #92 &#xB7; dt-fe/weekly</a></blockquote><p><strong>&#x5982;&#x679C;&#x4F60;&#x60F3;&#x53C2;&#x4E0E;&#x8BA8;&#x8BBA;&#xFF0C;&#x8BF7;<a href="https://github.com/dt-fe/weekly" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x51FB;&#x8FD9;&#x91CC;</a>&#xFF0C;&#x6BCF;&#x5468;&#x90FD;&#x6709;&#x65B0;&#x7684;&#x4E3B;&#x9898;&#xFF0C;&#x5468;&#x672B;&#x6216;&#x5468;&#x4E00;&#x53D1;&#x5E03;&#x3002;</strong></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
精读《React 的多态性》

## 原文链接
[https://segmentfault.com/a/1190000015444857](https://segmentfault.com/a/1190000015444857)

