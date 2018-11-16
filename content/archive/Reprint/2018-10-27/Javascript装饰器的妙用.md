---
title: Javascript装饰器的妙用
hidden: true
categories: [reprint]
slug: cbaa1f9d
date: 2018-10-27 02:30:17
---

{{< raw >}}
<p>&#x6700;&#x8FD1;&#x65B0;&#x5F00;&#x4E86;&#x4E00;&#x4E2A;Node&#x9879;&#x76EE;&#xFF0C;&#x91C7;&#x7528;TypeScript&#x6765;&#x5F00;&#x53D1;&#xFF0C;&#x5728;&#x6570;&#x636E;&#x5E93;&#x53CA;&#x8DEF;&#x7531;&#x7BA1;&#x7406;&#x65B9;&#x9762;&#x7528;&#x4E86;&#x4E0D;&#x5C11;&#x7684;&#x88C5;&#x9970;&#x5668;&#xFF0C;&#x53D1;&#x89C9;&#x8FD9;&#x7684;&#x786E;&#x662F;&#x4E00;&#x4E2A;&#x597D;&#x4E1C;&#x897F;&#x3002;<br>&#x88C5;&#x9970;&#x5668;&#x662F;&#x4E00;&#x4E2A;&#x8FD8;&#x5904;&#x4E8E;&#x8349;&#x6848;&#x4E2D;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x76EE;&#x524D;&#x6728;&#x6709;&#x76F4;&#x63A5;&#x652F;&#x6301;&#x8BE5;&#x8BED;&#x6CD5;&#x7684;&#x73AF;&#x5883;&#xFF0C;&#x4F46;&#x662F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; babel &#x4E4B;&#x7C7B;&#x7684;&#x8FDB;&#x884C;&#x8F6C;&#x6362;&#x4E3A;&#x65E7;&#x8BED;&#x6CD5;&#x6765;&#x5B9E;&#x73B0;&#x6548;&#x679C;&#xFF0C;&#x6240;&#x4EE5;&#x5728;TypeScript&#x4E2D;&#xFF0C;&#x53EF;&#x4EE5;&#x653E;&#x5FC3;&#x7684;&#x4F7F;&#x7528;<code>@Decorator</code>&#x3002;</p><h2 id="articleHeader0">&#x4EC0;&#x4E48;&#x662F;&#x88C5;&#x9970;&#x5668;</h2><p>&#x88C5;&#x9970;&#x5668;&#x662F;&#x5BF9;&#x7C7B;&#x3001;&#x51FD;&#x6570;&#x3001;&#x5C5E;&#x6027;&#x4E4B;&#x7C7B;&#x7684;&#x4E00;&#x79CD;&#x88C5;&#x9970;&#xFF0C;&#x53EF;&#x4EE5;&#x9488;&#x5BF9;&#x5176;&#x6DFB;&#x52A0;&#x4E00;&#x4E9B;&#x989D;&#x5916;&#x7684;&#x884C;&#x4E3A;&#x3002;<br>&#x901A;&#x4FD7;&#x7684;&#x7406;&#x89E3;&#x53EF;&#x4EE5;&#x8BA4;&#x4E3A;&#x5C31;&#x662F;&#x5728;&#x539F;&#x6709;&#x4EE3;&#x7801;&#x5916;&#x5C42;&#x5305;&#x88C5;&#x4E86;&#x4E00;&#x5C42;&#x5904;&#x7406;&#x903B;&#x8F91;&#x3002;<br>&#x4E2A;&#x4EBA;&#x8BA4;&#x4E3A;&#x88C5;&#x9970;&#x5668;&#x662F;&#x4E00;&#x79CD;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF0C;&#x800C;&#x5E76;&#x975E;&#x662F;&#x72ED;&#x4E49;&#x7684;<code>@Decorator</code>&#xFF0C;&#x540E;&#x8005;&#x4EC5;&#x4EC5;&#x662F;&#x4E00;&#x4E2A;&#x8BED;&#x6CD5;&#x7CD6;&#x7F62;&#x4E86;&#x3002;</p><p>&#x88C5;&#x9970;&#x5668;&#x5728;&#x8EAB;&#x8FB9;&#x7684;&#x4F8B;&#x5B50;&#x968F;&#x5904;&#x53EF;&#x89C1;&#xFF0C;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x6C34;&#x9F99;&#x5934;&#x4E0A;&#x8FB9;&#x7684;&#x8D77;&#x6CE1;&#x5668;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x88C5;&#x9970;&#x5668;&#xFF0C;&#x5728;&#x88C5;&#x4E0A;&#x4EE5;&#x540E;&#x5C31;&#x4F1A;&#x628A;&#x7A7A;&#x6C14;&#x6DF7;&#x5165;&#x6C34;&#x6D41;&#x4E2D;&#xFF0C;&#x63BA;&#x6742;&#x5F88;&#x591A;&#x6CE1;&#x6CE1;&#x5728;&#x6C34;&#x91CC;&#x3002;<br>&#x4F46;&#x662F;&#x8D77;&#x6CE1;&#x5668;&#x5B89;&#x88C5;&#x4E0E;&#x5426;&#x5BF9;&#x6C34;&#x9F99;&#x5934;&#x672C;&#x8EAB;&#x5E76;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x5F71;&#x54CD;&#xFF0C;&#x5373;&#x4F7F;&#x62C6;&#x6389;&#x8D77;&#x6CE1;&#x5668;&#xFF0C;&#x4E5F;&#x4F1A;&#x7167;&#x6837;&#x5DE5;&#x4F5C;&#xFF0C;&#x6C34;&#x9F99;&#x5934;&#x7684;&#x4F5C;&#x7528;&#x5728;&#x4E8E;&#x9600;&#x95E8;&#x7684;&#x63A7;&#x5236;&#xFF0C;&#x81F3;&#x4E8E;&#x6C34;&#x4E2D;&#x63BA;&#x4E0D;&#x63BA;&#x6742;&#x6C14;&#x6CE1;&#x5219;&#x4E0D;&#x662F;&#x6C34;&#x9F99;&#x5934;&#x9700;&#x8981;&#x5173;&#x5FC3;&#x7684;&#x3002;</p><p>&#x6240;&#x4EE5;&#xFF0C;&#x5BF9;&#x4E8E;&#x88C5;&#x9970;&#x5668;&#xFF0C;&#x53EF;&#x4EE5;&#x7B80;&#x5355;&#x5730;&#x7406;&#x89E3;&#x4E3A;&#x662F;&#x975E;&#x4FB5;&#x5165;&#x5F0F;&#x7684;&#x884C;&#x4E3A;&#x4FEE;&#x6539;&#x3002;</p><h2 id="articleHeader1">&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x7528;&#x88C5;&#x9970;&#x5668;</h2><p>&#x53EF;&#x80FD;&#x6709;&#x4E9B;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x5BF9;&#x4F20;&#x5165;&#x53C2;&#x6570;&#x7684;&#x7C7B;&#x578B;&#x5224;&#x65AD;&#x3001;&#x5BF9;&#x8FD4;&#x56DE;&#x503C;&#x7684;&#x6392;&#x5E8F;&#x3001;&#x8FC7;&#x6EE4;&#xFF0C;&#x5BF9;&#x51FD;&#x6570;&#x6DFB;&#x52A0;&#x8282;&#x6D41;&#x3001;&#x9632;&#x6296;&#x6216;&#x5176;&#x4ED6;&#x7684;&#x529F;&#x80FD;&#x6027;&#x4EE3;&#x7801;&#xFF0C;&#x57FA;&#x4E8E;&#x591A;&#x4E2A;&#x7C7B;&#x7684;&#x7EE7;&#x627F;&#xFF0C;&#x5404;&#x79CD;&#x5404;&#x6837;&#x7684;&#x4E0E;&#x51FD;&#x6570;&#x903B;&#x8F91;&#x672C;&#x8EAB;&#x65E0;&#x5173;&#x7684;&#x3001;&#x91CD;&#x590D;&#x6027;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><h3 id="articleHeader2">&#x51FD;&#x6570;&#x4E2D;&#x7684;&#x4F5C;&#x7528;</h3><p>&#x53EF;&#x4EE5;&#x60F3;&#x50CF;&#x4E00;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E2A;&#x5DE5;&#x5177;&#x7C7B;&#xFF0C;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x7684;&#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Model1 {
  getData() {
    // &#x6B64;&#x5904;&#x7701;&#x7565;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x7684;&#x903B;&#x8F91;
    return [{
      id: 1,
      name: &apos;Niko&apos;
    }, {
      id: 2,
      name: &apos;Bellic&apos;
    }]
  }
}

console.log(new Model1().getData())     // [ { id: 1, name: &apos;Niko&apos;}, { id: 2, name: &apos;Bellic&apos; } ]
console.log(Model1.prototype.getData()) // [ { id: 1, name: &apos;Niko&apos;}, { id: 2, name: &apos;Bellic&apos; } ]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Model1</span> </span>{
  getData() {
    <span class="hljs-comment">// &#x6B64;&#x5904;&#x7701;&#x7565;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x7684;&#x903B;&#x8F91;</span>
    <span class="hljs-keyword">return</span> [{
      <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Niko&apos;</span>
    }, {
      <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Bellic&apos;</span>
    }]
  }
}

<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span> Model1().getData())     <span class="hljs-comment">// [ { id: 1, name: &apos;Niko&apos;}, { id: 2, name: &apos;Bellic&apos; } ]</span>
<span class="hljs-built_in">console</span>.log(Model1.prototype.getData()) <span class="hljs-comment">// [ { id: 1, name: &apos;Niko&apos;}, { id: 2, name: &apos;Bellic&apos; } ]</span></code></pre><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x529F;&#x80FD;&#xFF0C;&#x8BB0;&#x5F55;&#x8BE5;&#x51FD;&#x6570;&#x6267;&#x884C;&#x7684;&#x8017;&#x65F6;&#x3002;<br>&#x56E0;&#x4E3A;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x88AB;&#x5F88;&#x591A;&#x4EBA;&#x4F7F;&#x7528;&#xFF0C;&#x5728;&#x8C03;&#x7528;&#x65B9;&#x6DFB;&#x52A0;&#x8017;&#x65F6;&#x7EDF;&#x8BA1;&#x903B;&#x8F91;&#x662F;&#x4E0D;&#x53EF;&#x53D6;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x8981;&#x5728;<code>Model1</code>&#x4E2D;&#x8FDB;&#x884C;&#x4FEE;&#x6539;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Model1 {
  getData() {
+   let start = new Date().valueOf()
+   try {
      // &#x6B64;&#x5904;&#x7701;&#x7565;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x7684;&#x903B;&#x8F91;
      return [{
        id: 1,
        name: &apos;Niko&apos;
      }, {
        id: 2,
        name: &apos;Bellic&apos;
      }]
+   } finally {
+     let end = new Date().valueOf()
+     console.log(`start: ${start} end: ${end} consume: ${end - start}`)
+   }
  }
}

// start: XXX end: XXX consume: XXX
console.log(new Model1().getData())     // [ { id: 1, name: &apos;Niko&apos;}, { id: 2, name: &apos;Bellic&apos; } ]
// start: XXX end: XXX consume: XXX
console.log(Model1.prototype.getData()) // [ { id: 1, name: &apos;Niko&apos;}, { id: 2, name: &apos;Bellic&apos; } ]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Model1</span> </span>{
  getData() {
+   <span class="hljs-keyword">let</span> start = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().valueOf()
+   <span class="hljs-keyword">try</span> {
      <span class="hljs-comment">// &#x6B64;&#x5904;&#x7701;&#x7565;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x7684;&#x903B;&#x8F91;</span>
      <span class="hljs-keyword">return</span> [{
        <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Niko&apos;</span>
      }, {
        <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Bellic&apos;</span>
      }]
+   } <span class="hljs-keyword">finally</span> {
+     <span class="hljs-keyword">let</span> end = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().valueOf()
+     <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`start: <span class="hljs-subst">${start}</span> end: <span class="hljs-subst">${end}</span> consume: <span class="hljs-subst">${end - start}</span>`</span>)
+   }
  }
}

<span class="hljs-comment">// start: XXX end: XXX consume: XXX</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span> Model1().getData())     <span class="hljs-comment">// [ { id: 1, name: &apos;Niko&apos;}, { id: 2, name: &apos;Bellic&apos; } ]</span>
<span class="hljs-comment">// start: XXX end: XXX consume: XXX</span>
<span class="hljs-built_in">console</span>.log(Model1.prototype.getData()) <span class="hljs-comment">// [ { id: 1, name: &apos;Niko&apos;}, { id: 2, name: &apos;Bellic&apos; } ]</span></code></pre><p>&#x8FD9;&#x6837;&#x5728;&#x8C03;&#x7528;&#x65B9;&#x6CD5;&#x540E;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x770B;&#x5230;&#x8017;&#x65F6;&#x7684;&#x8F93;&#x51FA;&#x4E86;&#x3002;<br>&#x4F46;&#x662F;&#x8FD9;&#x6837;&#x76F4;&#x63A5;&#x4FEE;&#x6539;&#x539F;&#x51FD;&#x6570;&#x4EE3;&#x7801;&#x6709;&#x4EE5;&#x4E0B;&#x51E0;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;</p><ol><li>&#x7EDF;&#x8BA1;&#x8017;&#x65F6;&#x7684;&#x76F8;&#x5173;&#x4EE3;&#x7801;&#x4E0E;&#x51FD;&#x6570;&#x672C;&#x8EAB;&#x903B;&#x8F91;&#x5E76;&#x65E0;&#x4E00;&#x70B9;&#x5173;&#x7CFB;&#xFF0C;&#x5F71;&#x54CD;&#x5230;&#x4E86;&#x5BF9;&#x539F;&#x51FD;&#x6570;&#x672C;&#x8EAB;&#x7684;&#x7406;&#x89E3;&#xFF0C;&#x5BF9;&#x51FD;&#x6570;&#x7ED3;&#x6784;&#x9020;&#x6210;&#x4E86;&#x7834;&#x574F;&#x6027;&#x7684;&#x4FEE;&#x6539;</li><li>&#x5982;&#x679C;&#x540E;&#x671F;&#x8FD8;&#x6709;&#x66F4;&#x591A;&#x7C7B;&#x4F3C;&#x7684;&#x51FD;&#x6570;&#x9700;&#x8981;&#x6DFB;&#x52A0;&#x7EDF;&#x8BA1;&#x8017;&#x65F6;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5728;&#x6BCF;&#x4E2A;&#x51FD;&#x6570;&#x4E2D;&#x90FD;&#x6DFB;&#x52A0;&#x8FD9;&#x6837;&#x7684;&#x4EE3;&#x7801;&#x663E;&#x7136;&#x662F;&#x4F4E;&#x6548;&#x7684;&#xFF0C;&#x7EF4;&#x62A4;&#x6210;&#x672C;&#x592A;&#x9AD8;</li></ol><p>&#x6240;&#x4EE5;&#xFF0C;&#x4E3A;&#x4E86;&#x8BA9;&#x7EDF;&#x8BA1;&#x8017;&#x65F6;&#x7684;&#x903B;&#x8F91;&#x53D8;&#x5F97;&#x66F4;&#x52A0;&#x7075;&#x6D3B;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x5DE5;&#x5177;&#x51FD;&#x6570;&#xFF0C;&#x7528;&#x6765;&#x5305;&#x88C5;&#x9700;&#x8981;&#x8BBE;&#x7F6E;&#x7EDF;&#x8BA1;&#x8017;&#x65F6;&#x7684;&#x51FD;&#x6570;&#x3002;<br>&#x901A;&#x8FC7;&#x5C06;<code>Class</code>&#x4E0E;&#x76EE;&#x6807;&#x51FD;&#x6570;&#x7684;<code>name</code>&#x4F20;&#x9012;&#x5230;&#x51FD;&#x6570;&#x4E2D;&#xFF0C;&#x5B9E;&#x73B0;&#x4E86;&#x901A;&#x7528;&#x7684;&#x8017;&#x65F6;&#x7EDF;&#x8BA1;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function wrap(Model, key) {
  // &#x83B7;&#x53D6;Class&#x5BF9;&#x5E94;&#x7684;&#x539F;&#x578B;
  let target = Model.prototype

  // &#x83B7;&#x53D6;&#x51FD;&#x6570;&#x5BF9;&#x5E94;&#x7684;&#x63CF;&#x8FF0;&#x7B26;
  let descriptor = Object.getOwnPropertyDescriptor(target, key)

  // &#x751F;&#x6210;&#x65B0;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x6DFB;&#x52A0;&#x8017;&#x65F6;&#x7EDF;&#x8BA1;&#x903B;&#x8F91;
  let log = function (...arg) {
    let start = new Date().valueOf()
    try {
      return descriptor.value.apply(this, arg) // &#x8C03;&#x7528;&#x4E4B;&#x524D;&#x7684;&#x51FD;&#x6570;
    } finally {
      let end = new Date().valueOf()
      console.log(`start: ${start} end: ${end} consume: ${end - start}`)
    }
  }

  // &#x5C06;&#x4FEE;&#x6539;&#x540E;&#x7684;&#x51FD;&#x6570;&#x91CD;&#x65B0;&#x5B9A;&#x4E49;&#x5230;&#x539F;&#x578B;&#x94FE;&#x4E0A;
  Object.defineProperty(target, key, {
    ...descriptor,
    value: log      // &#x8986;&#x76D6;&#x63CF;&#x8FF0;&#x7B26;&#x91CD;&#x7684;value
  })
}

wrap(Model1, &apos;getData&apos;)
wrap(Model2, &apos;getData&apos;)

// start: XXX end: XXX consume: XXX
console.log(new Model1().getData())     // [ { id: 1, name: &apos;Niko&apos;}, { id: 2, name: &apos;Bellic&apos; } ]
// start: XXX end: XXX consume: XXX
console.log(Model2.prototype.getData()) // [ { id: 1, name: &apos;Niko&apos;}, { id: 2, name: &apos;Bellic&apos; } ]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wrap</span>(<span class="hljs-params">Model, key</span>) </span>{
  <span class="hljs-comment">// &#x83B7;&#x53D6;Class&#x5BF9;&#x5E94;&#x7684;&#x539F;&#x578B;</span>
  <span class="hljs-keyword">let</span> target = Model.prototype

  <span class="hljs-comment">// &#x83B7;&#x53D6;&#x51FD;&#x6570;&#x5BF9;&#x5E94;&#x7684;&#x63CF;&#x8FF0;&#x7B26;</span>
  <span class="hljs-keyword">let</span> descriptor = <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(target, key)

  <span class="hljs-comment">// &#x751F;&#x6210;&#x65B0;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x6DFB;&#x52A0;&#x8017;&#x65F6;&#x7EDF;&#x8BA1;&#x903B;&#x8F91;</span>
  <span class="hljs-keyword">let</span> log = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">...arg</span>) </span>{
    <span class="hljs-keyword">let</span> start = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().valueOf()
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">return</span> descriptor.value.apply(<span class="hljs-keyword">this</span>, arg) <span class="hljs-comment">// &#x8C03;&#x7528;&#x4E4B;&#x524D;&#x7684;&#x51FD;&#x6570;</span>
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-keyword">let</span> end = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().valueOf()
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`start: <span class="hljs-subst">${start}</span> end: <span class="hljs-subst">${end}</span> consume: <span class="hljs-subst">${end - start}</span>`</span>)
    }
  }

  <span class="hljs-comment">// &#x5C06;&#x4FEE;&#x6539;&#x540E;&#x7684;&#x51FD;&#x6570;&#x91CD;&#x65B0;&#x5B9A;&#x4E49;&#x5230;&#x539F;&#x578B;&#x94FE;&#x4E0A;</span>
  <span class="hljs-built_in">Object</span>.defineProperty(target, key, {
    ...descriptor,
    <span class="hljs-attr">value</span>: log      <span class="hljs-comment">// &#x8986;&#x76D6;&#x63CF;&#x8FF0;&#x7B26;&#x91CD;&#x7684;value</span>
  })
}

wrap(Model1, <span class="hljs-string">&apos;getData&apos;</span>)
wrap(Model2, <span class="hljs-string">&apos;getData&apos;</span>)

<span class="hljs-comment">// start: XXX end: XXX consume: XXX</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span> Model1().getData())     <span class="hljs-comment">// [ { id: 1, name: &apos;Niko&apos;}, { id: 2, name: &apos;Bellic&apos; } ]</span>
<span class="hljs-comment">// start: XXX end: XXX consume: XXX</span>
<span class="hljs-built_in">console</span>.log(Model2.prototype.getData()) <span class="hljs-comment">// [ { id: 1, name: &apos;Niko&apos;}, { id: 2, name: &apos;Bellic&apos; } ]</span></code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x60F3;&#x63A7;&#x5236;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;<code>Model</code>&#x7684;&#x51FD;&#x6570;&#x4E0D;&#x53EF;&#x88AB;&#x5176;&#x4ED6;&#x4EBA;&#x4FEE;&#x6539;&#x8986;&#x76D6;&#xFF0C;&#x6240;&#x4EE5;&#x8981;&#x6DFB;&#x52A0;&#x4E00;&#x4E9B;&#x65B0;&#x7684;&#x903B;&#x8F91;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function wrap(Model, key) {
  // &#x83B7;&#x53D6;Class&#x5BF9;&#x5E94;&#x7684;&#x539F;&#x578B;
  let target = Model.prototype

  // &#x83B7;&#x53D6;&#x51FD;&#x6570;&#x5BF9;&#x5E94;&#x7684;&#x63CF;&#x8FF0;&#x7B26;
  let descriptor = Object.getOwnPropertyDescriptor(target, key)

  Object.defineProperty(target, key, {
    ...descriptor,
    writable: false      // &#x8BBE;&#x7F6E;&#x5C5E;&#x6027;&#x4E0D;&#x53EF;&#x88AB;&#x4FEE;&#x6539;
  })
}

wrap(Model1, &apos;getData&apos;)

Model1.prototype.getData = 1 // &#x65E0;&#x6548;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wrap</span>(<span class="hljs-params">Model, key</span>) </span>{
  <span class="hljs-comment">// &#x83B7;&#x53D6;Class&#x5BF9;&#x5E94;&#x7684;&#x539F;&#x578B;</span>
  <span class="hljs-keyword">let</span> target = Model.prototype

  <span class="hljs-comment">// &#x83B7;&#x53D6;&#x51FD;&#x6570;&#x5BF9;&#x5E94;&#x7684;&#x63CF;&#x8FF0;&#x7B26;</span>
  <span class="hljs-keyword">let</span> descriptor = <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(target, key)

  <span class="hljs-built_in">Object</span>.defineProperty(target, key, {
    ...descriptor,
    <span class="hljs-attr">writable</span>: <span class="hljs-literal">false</span>      <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x5C5E;&#x6027;&#x4E0D;&#x53EF;&#x88AB;&#x4FEE;&#x6539;</span>
  })
}

wrap(Model1, <span class="hljs-string">&apos;getData&apos;</span>)

Model1.prototype.getData = <span class="hljs-number">1</span> <span class="hljs-comment">// &#x65E0;&#x6548;</span></code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;&#x4E24;&#x4E2A;<code>wrap</code>&#x51FD;&#x6570;&#x4E2D;&#x6709;&#x4E0D;&#x5C11;&#x91CD;&#x590D;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x800C;&#x4FEE;&#x6539;&#x7A0B;&#x5E8F;&#x884C;&#x4E3A;&#x7684;&#x903B;&#x8F91;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x4F9D;&#x8D56;&#x7684;&#x662F;<code>Object.defineProperty</code>&#x4E2D;&#x4F20;&#x9012;&#x7684;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x3002;<br>&#x6240;&#x4EE5;&#xFF0C;&#x6211;&#x4EEC;&#x9488;&#x5BF9;<code>wrap</code>&#x5728;&#x8FDB;&#x884C;&#x4E00;&#x6B21;&#x4FEE;&#x6539;&#xFF0C;&#x5C06;&#x5176;&#x53D8;&#x4E3A;&#x4E00;&#x4E2A;&#x901A;&#x7528;&#x7C7B;&#x7684;&#x8F6C;&#x6362;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function wrap(decorator) {
  return function (Model, key) {
    let target = Model.prototype
    let dscriptor = Object.getOwnPropertyDescriptor(target, key)

    decorator(target, key, descriptor)
  }
}

let log = function (target, key, descriptor) {
  // &#x5C06;&#x4FEE;&#x6539;&#x540E;&#x7684;&#x51FD;&#x6570;&#x91CD;&#x65B0;&#x5B9A;&#x4E49;&#x5230;&#x539F;&#x578B;&#x94FE;&#x4E0A;
  Object.defineProperty(target, key, {
    ...descriptor,
    value: function (...arg) {
      let start = new Date().valueOf()
      try {
        return descriptor.value.apply(this, arg) // &#x8C03;&#x7528;&#x4E4B;&#x524D;&#x7684;&#x51FD;&#x6570;
      } finally {
        let end = new Date().valueOf()
        console.log(`start: ${start} end: ${end} consume: ${end - start}`)
      }
    }
  })
}

let seal = function (target, key, descriptor) {
  Object.defineProperty(target, key, {
    ...descriptor,
    writable: false
  })
}

// &#x53C2;&#x6570;&#x7684;&#x8F6C;&#x6362;&#x5904;&#x7406;
log = wrap(log)
seal = warp(seal)

// &#x6DFB;&#x52A0;&#x8017;&#x65F6;&#x7EDF;&#x8BA1;
log(Model1, &apos;getData&apos;)
log(Model2, &apos;getData&apos;)

// &#x8BBE;&#x7F6E;&#x5C5E;&#x6027;&#x4E0D;&#x53EF;&#x88AB;&#x4FEE;&#x6539;
seal(Model1, &apos;getData&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wrap</span>(<span class="hljs-params">decorator</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">Model, key</span>) </span>{
    <span class="hljs-keyword">let</span> target = Model.prototype
    <span class="hljs-keyword">let</span> dscriptor = <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(target, key)

    decorator(target, key, descriptor)
  }
}

<span class="hljs-keyword">let</span> log = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">target, key, descriptor</span>) </span>{
  <span class="hljs-comment">// &#x5C06;&#x4FEE;&#x6539;&#x540E;&#x7684;&#x51FD;&#x6570;&#x91CD;&#x65B0;&#x5B9A;&#x4E49;&#x5230;&#x539F;&#x578B;&#x94FE;&#x4E0A;</span>
  <span class="hljs-built_in">Object</span>.defineProperty(target, key, {
    ...descriptor,
    <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">...arg</span>) </span>{
      <span class="hljs-keyword">let</span> start = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().valueOf()
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">return</span> descriptor.value.apply(<span class="hljs-keyword">this</span>, arg) <span class="hljs-comment">// &#x8C03;&#x7528;&#x4E4B;&#x524D;&#x7684;&#x51FD;&#x6570;</span>
      } <span class="hljs-keyword">finally</span> {
        <span class="hljs-keyword">let</span> end = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().valueOf()
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`start: <span class="hljs-subst">${start}</span> end: <span class="hljs-subst">${end}</span> consume: <span class="hljs-subst">${end - start}</span>`</span>)
      }
    }
  })
}

<span class="hljs-keyword">let</span> seal = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">target, key, descriptor</span>) </span>{
  <span class="hljs-built_in">Object</span>.defineProperty(target, key, {
    ...descriptor,
    <span class="hljs-attr">writable</span>: <span class="hljs-literal">false</span>
  })
}

<span class="hljs-comment">// &#x53C2;&#x6570;&#x7684;&#x8F6C;&#x6362;&#x5904;&#x7406;</span>
log = wrap(log)
seal = warp(seal)

<span class="hljs-comment">// &#x6DFB;&#x52A0;&#x8017;&#x65F6;&#x7EDF;&#x8BA1;</span>
log(Model1, <span class="hljs-string">&apos;getData&apos;</span>)
log(Model2, <span class="hljs-string">&apos;getData&apos;</span>)

<span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x5C5E;&#x6027;&#x4E0D;&#x53EF;&#x88AB;&#x4FEE;&#x6539;</span>
seal(Model1, <span class="hljs-string">&apos;getData&apos;</span>)</code></pre><p>&#x5230;&#x4E86;&#x8FD9;&#x4E00;&#x6B65;&#x4EE5;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x79F0;<code>log</code>&#x548C;<code>seal</code>&#x4E3A;&#x88C5;&#x9970;&#x5668;&#x4E86;&#xFF0C;&#x53EF;&#x4EE5;&#x5F88;&#x65B9;&#x4FBF;&#x7684;&#x8BA9;&#x6211;&#x4EEC;&#x5BF9;&#x4E00;&#x4E9B;&#x51FD;&#x6570;&#x6DFB;&#x52A0;&#x884C;&#x4E3A;&#x3002;<br>&#x800C;&#x62C6;&#x5206;&#x51FA;&#x6765;&#x7684;&#x8FD9;&#x4E9B;&#x529F;&#x80FD;&#x53EF;&#x4EE5;&#x7528;&#x4E8E;&#x672A;&#x6765;&#x53EF;&#x80FD;&#x4F1A;&#x6709;&#x9700;&#x8981;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x800C;&#x4E0D;&#x7528;&#x91CD;&#x65B0;&#x5F00;&#x53D1;&#x4E00;&#x904D;&#x76F8;&#x540C;&#x7684;&#x903B;&#x8F91;&#x3002;</p><h3 id="articleHeader3">Class &#x4E2D;&#x7684;&#x4F5C;&#x7528;</h3><p>&#x5C31;&#x50CF;&#x4E0A;&#x8FB9;&#x63D0;&#x5230;&#x4E86;&#xFF0C;&#x73B0;&#x9636;&#x6BB5;&#x5728;JS&#x4E2D;&#x7EE7;&#x627F;&#x591A;&#x4E2A;<code>Class</code>&#x662F;&#x4E00;&#x4EF6;&#x5934;&#x75BC;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x6CA1;&#x6709;&#x76F4;&#x63A5;&#x7684;&#x8BED;&#x6CD5;&#x80FD;&#x591F;&#x7EE7;&#x627F;&#x591A;&#x4E2A; Class&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class A { say () { return 1 } }
class B { hi () { return 2 } }
class C extends A, B {}        // Error
class C extends A extends B {} // Error

// &#x8FD9;&#x6837;&#x624D;&#x662F;&#x53EF;&#x4EE5;&#x7684;
class C {}
for (let key of Object.getOwnPropertyNames(A.prototype)) {
  if (key === &apos;constructor&apos;) continue
  Object.defineProperty(C.prototype, key, Object.getOwnPropertyDescriptor(A.prototype, key))
}
for (let key of Object.getOwnPropertyNames(B.prototype)) {
  if (key === &apos;constructor&apos;) continue
  Object.defineProperty(C.prototype, key, Object.getOwnPropertyDescriptor(B.prototype, key))
}

let c = new C()
console.log(c.say(), c.hi()) // 1, 2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">A</span> </span>{ say () { <span class="hljs-keyword">return</span> <span class="hljs-number">1</span> } }
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">B</span> </span>{ hi () { <span class="hljs-keyword">return</span> <span class="hljs-number">2</span> } }
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">A</span>, <span class="hljs-title">B</span> </span>{}        <span class="hljs-comment">// Error</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">A</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">B</span> </span>{} <span class="hljs-comment">// Error</span>

<span class="hljs-comment">// &#x8FD9;&#x6837;&#x624D;&#x662F;&#x53EF;&#x4EE5;&#x7684;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C</span> </span>{}
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">of</span> <span class="hljs-built_in">Object</span>.getOwnPropertyNames(A.prototype)) {
  <span class="hljs-keyword">if</span> (key === <span class="hljs-string">&apos;constructor&apos;</span>) <span class="hljs-keyword">continue</span>
  <span class="hljs-built_in">Object</span>.defineProperty(C.prototype, key, <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(A.prototype, key))
}
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">of</span> <span class="hljs-built_in">Object</span>.getOwnPropertyNames(B.prototype)) {
  <span class="hljs-keyword">if</span> (key === <span class="hljs-string">&apos;constructor&apos;</span>) <span class="hljs-keyword">continue</span>
  <span class="hljs-built_in">Object</span>.defineProperty(C.prototype, key, <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(B.prototype, key))
}

<span class="hljs-keyword">let</span> c = <span class="hljs-keyword">new</span> C()
<span class="hljs-built_in">console</span>.log(c.say(), c.hi()) <span class="hljs-comment">// 1, 2</span></code></pre><p>&#x6240;&#x4EE5;&#xFF0C;&#x5728;<code>React</code>&#x4E2D;&#x5C31;&#x6709;&#x4E86;&#x4E00;&#x4E2A;<code>mixin</code>&#x7684;&#x6982;&#x5FF5;&#xFF0C;&#x7528;&#x6765;&#x5C06;&#x591A;&#x4E2A;<code>Class</code>&#x7684;&#x529F;&#x80FD;&#x590D;&#x5236;&#x5230;&#x4E00;&#x4E2A;&#x65B0;&#x7684;<code>Class</code>&#x4E0A;&#x3002;<br>&#x5927;&#x81F4;&#x601D;&#x8DEF;&#x5C31;&#x662F;&#x4E0A;&#x8FB9;&#x5217;&#x51FA;&#x6765;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x4E2A;<code>mixin</code>&#x662F;<code>React</code>&#x4E2D;&#x5185;&#x7F6E;&#x7684;&#x4E00;&#x4E2A;&#x64CD;&#x4F5C;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5C06;&#x5176;&#x8F6C;&#x6362;&#x4E3A;&#x66F4;&#x63A5;&#x8FD1;&#x88C5;&#x9970;&#x5668;&#x7684;&#x5B9E;&#x73B0;&#x3002;<br>&#x5728;&#x4E0D;&#x4FEE;&#x6539;&#x539F;<code>Class</code>&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x5C06;&#x5176;&#x4ED6;<code>Class</code>&#x7684;&#x5C5E;&#x6027;&#x590D;&#x5236;&#x8FC7;&#x6765;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function mixin(constructor) {
  return function (...args) {
    for (let arg of args) {
      for (let key of Object.getOwnPropertyNames(arg.prototype)) {
        if (key === &apos;constructor&apos;) continue // &#x8DF3;&#x8FC7;&#x6784;&#x9020;&#x51FD;&#x6570;
        Object.defineProperty(constructor.prototype, key, Object.getOwnPropertyDescriptor(arg.prototype, key))
      }
    }
  }
}

mixin(C)(A, B)

let c = new C()
console.log(c.say(), c.hi()) // 1, 2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mixin</span>(<span class="hljs-params">constructor</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">...args</span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> arg <span class="hljs-keyword">of</span> args) {
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">of</span> <span class="hljs-built_in">Object</span>.getOwnPropertyNames(arg.prototype)) {
        <span class="hljs-keyword">if</span> (key === <span class="hljs-string">&apos;constructor&apos;</span>) <span class="hljs-keyword">continue</span> <span class="hljs-comment">// &#x8DF3;&#x8FC7;&#x6784;&#x9020;&#x51FD;&#x6570;</span>
        <span class="hljs-built_in">Object</span>.defineProperty(<span class="hljs-keyword">constructor</span>.prototype, key, Object.getOwnPropertyDescriptor(arg.prototype, key))
      }
    }
  }
}

mixin(C)(A, B)

let c = new C()
console.log(c.say(), c.hi()) // 1, 2</code></pre><p>&#x4EE5;&#x4E0A;&#xFF0C;&#x5C31;&#x662F;&#x88C5;&#x9970;&#x5668;&#x5728;&#x51FD;&#x6570;&#x3001;<code>Class</code>&#x4E0A;&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x6CD5;&#xFF08;&#x81F3;&#x5C11;&#x76EE;&#x524D;&#x662F;&#x7684;&#xFF09;&#xFF0C;&#x4F46;&#x662F;&#x8349;&#x6848;&#x4E2D;&#x8FD8;&#x6709;&#x4E00;&#x9897;&#x7279;&#x522B;&#x751C;&#x7684;&#x8BED;&#x6CD5;&#x7CD6;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;<code>@Decorator</code>&#x4E86;&#x3002;<br>&#x80FD;&#x591F;&#x5E2E;&#x4F60;&#x7701;&#x53BB;&#x5F88;&#x591A;&#x7E41;&#x7410;&#x7684;&#x6B65;&#x9AA4;&#x6765;&#x7528;&#x4E0A;&#x88C5;&#x9970;&#x5668;&#x3002;</p><h2 id="articleHeader4">@Decorator&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;</h2><p>&#x8349;&#x6848;&#x4E2D;&#x7684;&#x88C5;&#x9970;&#x5668;&#x3001;&#x6216;&#x8005;&#x53EF;&#x4EE5;&#x8BF4;&#x662F;TS&#x5B9E;&#x73B0;&#x7684;&#x88C5;&#x9970;&#x5668;&#xFF0C;&#x5C06;&#x4E0A;&#x8FB9;&#x7684;&#x4E24;&#x79CD;&#x8FDB;&#x4E00;&#x6B65;&#x5730;&#x5C01;&#x88C5;&#xFF0C;&#x5C06;&#x5176;&#x62C6;&#x5206;&#x6210;&#x4E3A;&#x66F4;&#x7EC6;&#x7684;&#x88C5;&#x9970;&#x5668;&#x5E94;&#x7528;&#xFF0C;&#x76EE;&#x524D;&#x652F;&#x6301;&#x4EE5;&#x4E0B;&#x51E0;&#x5904;&#x4F7F;&#x7528;&#xFF1A;</p><ol><li>Class</li><li>&#x51FD;&#x6570;</li><li>get set&#x8BBF;&#x95EE;&#x5668;</li><li>&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x3001;&#x9759;&#x6001;&#x51FD;&#x6570;&#x53CA;&#x5C5E;&#x6027;</li><li>&#x51FD;&#x6570;&#x53C2;&#x6570;</li></ol><p>@Decorator&#x7684;&#x8BED;&#x6CD5;&#x89C4;&#x5B9A;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x5C31;&#x662F;&#x901A;&#x8FC7;<code>@</code>&#x7B26;&#x53F7;&#x540E;&#x8FB9;&#x8DDF;&#x4E00;&#x4E2A;&#x88C5;&#x9970;&#x5668;&#x51FD;&#x6570;&#x7684;&#x5F15;&#x7528;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@tag
class A { 
  @method
  hi () {}
}

function tag(constructor) {
  console.log(constructor === A) // true
}

function method(target) {
  console.log(target.constructor === A, target === A.prototype) // true, true
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">@tag
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">A</span> </span>{ 
  @method
  hi () {}
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tag</span>(<span class="hljs-params">constructor</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">constructor</span> === A) // true
}

function method(target) {
  <span class="hljs-built_in">console</span>.log(target.constructor === A, target === A.prototype) <span class="hljs-comment">// true, true</span>
}</code></pre><p>&#x51FD;&#x6570;<code>tag</code>&#x4E0E;<code>method</code>&#x4F1A;&#x5728;<code>class A</code>&#x5B9A;&#x4E49;&#x7684;&#x65F6;&#x5019;&#x6267;&#x884C;&#x3002;</p><h3 id="articleHeader5">@Decorator &#x5728; Class &#x4E2D;&#x7684;&#x4F7F;&#x7528;</h3><p>&#x8BE5;&#x88C5;&#x9970;&#x5668;&#x4F1A;&#x5728;class&#x5B9A;&#x4E49;&#x524D;&#x8C03;&#x7528;&#xFF0C;&#x5982;&#x679C;&#x51FD;&#x6570;&#x6709;&#x8FD4;&#x56DE;&#x503C;&#xFF0C;&#x5219;&#x4F1A;&#x8BA4;&#x4E3A;&#x662F;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6765;&#x66FF;&#x4EE3;&#x4E4B;&#x524D;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;</p><p>&#x51FD;&#x6570;&#x63A5;&#x6536;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;</p><ol><li>constructor &#x4E4B;&#x524D;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;</li></ol><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x9488;&#x5BF9;&#x539F;&#x6709;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x8FDB;&#x884C;&#x4E00;&#x4E9B;&#x6539;&#x9020;:</p><h4>&#x65B0;&#x589E;&#x4E00;&#x4E9B;&#x5C5E;&#x6027;</h4><p>&#x5982;&#x679C;&#x60F3;&#x8981;&#x65B0;&#x589E;&#x4E00;&#x4E9B;&#x5C5E;&#x6027;&#x4E4B;&#x7C7B;&#x7684;&#xFF0C;&#x6709;&#x4E24;&#x79CD;&#x65B9;&#x6848;&#x53EF;&#x4EE5;&#x9009;&#x62E9;&#xFF1A;</p><ol><li>&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7684;<code>class</code>&#x7EE7;&#x627F;&#x81EA;&#x539F;&#x6709;<code>class</code>&#xFF0C;&#x5E76;&#x6DFB;&#x52A0;&#x5C5E;&#x6027;</li><li>&#x9488;&#x5BF9;&#x5F53;&#x524D;<code>class</code>&#x8FDB;&#x884C;&#x4FEE;&#x6539;</li></ol><p>&#x540E;&#x8005;&#x7684;&#x9002;&#x7528;&#x8303;&#x56F4;&#x66F4;&#x7A84;&#x4E00;&#x4E9B;&#xFF0C;&#x66F4;&#x63A5;&#x8FD1;mixin&#x7684;&#x5904;&#x7406;&#x65B9;&#x5F0F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@name
class Person {
  sayHi() {
    console.log(`My name is: ${this.name}`)
  }
}

// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7EE7;&#x627F;&#x81EA;Person&#x7684;&#x533F;&#x540D;&#x7C7B;
// &#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x5E76;&#x66FF;&#x6362;&#x539F;&#x6709;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;
function name(constructor) {
  return class extends constructor {
    name = &apos;Niko&apos;
  }
}

new Person().sayHi()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">@name
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
  sayHi() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`My name is: <span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span>`</span>)
  }
}

<span class="hljs-comment">// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7EE7;&#x627F;&#x81EA;Person&#x7684;&#x533F;&#x540D;&#x7C7B;</span>
<span class="hljs-comment">// &#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x5E76;&#x66FF;&#x6362;&#x539F;&#x6709;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">name</span>(<span class="hljs-params">constructor</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">constructor</span> </span>{
    name = <span class="hljs-string">&apos;Niko&apos;</span>
  }
}

<span class="hljs-keyword">new</span> Person().sayHi()</code></pre><h4>&#x4FEE;&#x6539;&#x539F;&#x6709;&#x5C5E;&#x6027;&#x7684;&#x63CF;&#x8FF0;&#x7B26;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@seal
class Person {
  sayHi() {}
}

function seal(constructor) {
  let descriptor = Object.getOwnPropertyDescriptor(constructor.prototype, &apos;sayHi&apos;)
  Object.defineProperty(constructor.prototype, &apos;sayHi&apos;, {
    ...descriptor,
    writable: false
  })
}

Person.prototype.sayHi = 1 // &#x65E0;&#x6548;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">@seal
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
  sayHi() {}
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">seal</span>(<span class="hljs-params">constructor</span>) </span>{
  <span class="hljs-keyword">let</span> descriptor = <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(<span class="hljs-keyword">constructor</span>.prototype, &apos;sayHi&apos;)
  Object.defineProperty(<span class="hljs-keyword">constructor</span>.prototype, &apos;sayHi&apos;, {
    ...descriptor,
    <span class="hljs-attr">writable</span>: <span class="hljs-literal">false</span>
  })
}

Person.prototype.sayHi = <span class="hljs-number">1</span> <span class="hljs-comment">// &#x65E0;&#x6548;</span></code></pre><h4>&#x4F7F;&#x7528;&#x95ED;&#x5305;&#x6765;&#x589E;&#x5F3A;&#x88C5;&#x9970;&#x5668;&#x7684;&#x529F;&#x80FD;</h4><blockquote>&#x5728;TS&#x6587;&#x6863;&#x4E2D;&#x88AB;&#x79F0;&#x4E3A;&#x88C5;&#x9970;&#x5668;&#x5DE5;&#x5382;</blockquote><p>&#x56E0;&#x4E3A;<code>@</code>&#x7B26;&#x53F7;&#x540E;&#x8FB9;&#x8DDF;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x6240;&#x4EE5;&#x5BF9;&#x4E8E;mixin&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5F88;&#x8F7B;&#x6613;&#x7684;&#x4F7F;&#x7528;&#x95ED;&#x5305;&#x6765;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class A { say() { return 1 } }
class B { hi() { return 2 } }

@mixin(A, B)
class C { }

function mixin(...args) {
  // &#x8C03;&#x7528;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x88C5;&#x9970;&#x5668;&#x5B9E;&#x9645;&#x5E94;&#x7528;&#x7684;&#x51FD;&#x6570;
  return function(constructor) {
    for (let arg of args) {
      for (let key of Object.getOwnPropertyNames(arg.prototype)) {
        if (key === &apos;constructor&apos;) continue // &#x8DF3;&#x8FC7;&#x6784;&#x9020;&#x51FD;&#x6570;
        Object.defineProperty(constructor.prototype, key, Object.getOwnPropertyDescriptor(arg.prototype, key))
      }
    }
  }
}

let c = new C()
console.log(c.say(), c.hi()) // 1, 2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">A</span> </span>{ say() { <span class="hljs-keyword">return</span> <span class="hljs-number">1</span> } }
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">B</span> </span>{ hi() { <span class="hljs-keyword">return</span> <span class="hljs-number">2</span> } }

@mixin(A, B)
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C</span> </span>{ }

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mixin</span>(<span class="hljs-params">...args</span>) </span>{
  <span class="hljs-comment">// &#x8C03;&#x7528;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x88C5;&#x9970;&#x5668;&#x5B9E;&#x9645;&#x5E94;&#x7528;&#x7684;&#x51FD;&#x6570;</span>
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">constructor</span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> arg <span class="hljs-keyword">of</span> args) {
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">of</span> <span class="hljs-built_in">Object</span>.getOwnPropertyNames(arg.prototype)) {
        <span class="hljs-keyword">if</span> (key === <span class="hljs-string">&apos;constructor&apos;</span>) <span class="hljs-keyword">continue</span> <span class="hljs-comment">// &#x8DF3;&#x8FC7;&#x6784;&#x9020;&#x51FD;&#x6570;</span>
        <span class="hljs-built_in">Object</span>.defineProperty(<span class="hljs-keyword">constructor</span>.prototype, key, Object.getOwnPropertyDescriptor(arg.prototype, key))
      }
    }
  }
}

let c = new C()
console.log(c.say(), c.hi()) // 1, 2</code></pre><h4>&#x591A;&#x4E2A;&#x88C5;&#x9970;&#x5668;&#x7684;&#x5E94;&#x7528;</h4><p>&#x88C5;&#x9970;&#x5668;&#x662F;&#x53EF;&#x4EE5;&#x540C;&#x65F6;&#x5E94;&#x7528;&#x591A;&#x4E2A;&#x7684;&#xFF08;&#x4E0D;&#x7136;&#x4E5F;&#x5C31;&#x5931;&#x53BB;&#x4E86;&#x6700;&#x521D;&#x7684;&#x610F;&#x4E49;&#xFF09;&#x3002;<br>&#x7528;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@decorator1
@decorator2
class { }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">@decorator1
@decorator2
<span class="hljs-class"><span class="hljs-keyword">class</span> </span>{ }</code></pre><p>&#x6267;&#x884C;&#x7684;&#x987A;&#x5E8F;&#x4E3A;<code>decorator2</code> -&gt; <code>decorator1</code>&#xFF0C;&#x79BB;<code>class</code>&#x5B9A;&#x4E49;&#x6700;&#x8FD1;&#x7684;&#x5148;&#x6267;&#x884C;&#x3002;<br>&#x53EF;&#x4EE5;&#x60F3;&#x50CF;&#x6210;&#x51FD;&#x6570;&#x5D4C;&#x5957;&#x7684;&#x5F62;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="decorator1(decorator2(class {}))" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial">decorator1(decorator2(<span class="hljs-class"><span class="hljs-keyword">class</span> </span>{}))</code></pre><h3 id="articleHeader6">@Decorator &#x5728; Class &#x6210;&#x5458;&#x4E2D;&#x7684;&#x4F7F;&#x7528;</h3><p>&#x7C7B;&#x6210;&#x5458;&#x4E0A;&#x7684; @Decorator &#x5E94;&#x8BE5;&#x662F;&#x5E94;&#x7528;&#x6700;&#x4E3A;&#x5E7F;&#x6CDB;&#x7684;&#x4E00;&#x5904;&#x4E86;&#xFF0C;&#x51FD;&#x6570;&#xFF0C;&#x5C5E;&#x6027;&#xFF0C;<code>get</code>&#x3001;<code>set</code>&#x8BBF;&#x95EE;&#x5668;&#xFF0C;&#x8FD9;&#x51E0;&#x5904;&#x90FD;&#x53EF;&#x4EE5;&#x8BA4;&#x4E3A;&#x662F;&#x7C7B;&#x6210;&#x5458;&#x3002;<br>&#x5728;TS&#x6587;&#x6863;&#x4E2D;&#x88AB;&#x5206;&#x4E3A;&#x4E86;<code>Method Decorator</code>&#x3001;<code>Accessor Decorator</code>&#x548C;<code>Property Decorator</code>&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x5982;&#x51FA;&#x4E00;&#x8F99;&#x3002;</p><p>&#x5173;&#x4E8E;&#x8FD9;&#x7C7B;&#x88C5;&#x9970;&#x5668;&#xFF0C;&#x4F1A;&#x63A5;&#x6536;&#x5982;&#x4E0B;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;</p><ol><li>&#x5982;&#x679C;&#x88C5;&#x9970;&#x5668;&#x6302;&#x8F7D;&#x4E8E;&#x9759;&#x6001;&#x6210;&#x5458;&#x4E0A;&#xFF0C;&#x5219;&#x4F1A;&#x8FD4;&#x56DE;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x5982;&#x679C;&#x6302;&#x8F7D;&#x4E8E;&#x5B9E;&#x4F8B;&#x6210;&#x5458;&#x4E0A;&#x5219;&#x4F1A;&#x8FD4;&#x56DE;&#x7C7B;&#x7684;&#x539F;&#x578B;</li><li>&#x88C5;&#x9970;&#x5668;&#x6302;&#x8F7D;&#x7684;&#x6210;&#x5458;&#x540D;&#x79F0;</li><li>&#x6210;&#x5458;&#x7684;&#x63CF;&#x8FF0;&#x7B26;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;<code>Object.getOwnPropertyDescriptor</code>&#x7684;&#x8FD4;&#x56DE;&#x503C;</li></ol><blockquote><code>Property Decorator</code>&#x4E0D;&#x4F1A;&#x8FD4;&#x56DE;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x4F46;&#x662F;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x624B;&#x52A8;&#x83B7;&#x53D6;<br>&#x524D;&#x63D0;&#x662F;&#x9759;&#x6001;&#x6210;&#x5458;&#xFF0C;&#x800C;&#x975E;&#x5B9E;&#x4F8B;&#x6210;&#x5458;&#xFF0C;&#x56E0;&#x4E3A;&#x88C5;&#x9970;&#x5668;&#x90FD;&#x662F;&#x8FD0;&#x884C;&#x5728;&#x7C7B;&#x521B;&#x5EFA;&#x65F6;&#xFF0C;&#x800C;&#x5B9E;&#x4F8B;&#x6210;&#x5458;&#x662F;&#x5728;&#x5B9E;&#x4F8B;&#x5316;&#x4E00;&#x4E2A;&#x7C7B;&#x7684;&#x65F6;&#x5019;&#x624D;&#x4F1A;&#x6267;&#x884C;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x6CA1;&#x6709;&#x529E;&#x6CD5;&#x83B7;&#x53D6;&#x5BF9;&#x5E94;&#x7684;descriptor</blockquote><h4>&#x9759;&#x6001;&#x6210;&#x5458;&#x4E0E;&#x5B9E;&#x4F8B;&#x6210;&#x5458;&#x5728;&#x8FD4;&#x56DE;&#x503C;&#x4E0A;&#x7684;&#x533A;&#x522B;</h4><p>&#x53EF;&#x4EE5;&#x7A0D;&#x5FAE;&#x660E;&#x786E;&#x4E00;&#x4E0B;&#xFF0C;&#x9759;&#x6001;&#x6210;&#x5458;&#x4E0E;&#x5B9E;&#x4F8B;&#x6210;&#x5458;&#x7684;&#x533A;&#x522B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Model {
  // &#x5B9E;&#x4F8B;&#x6210;&#x5458;
  method1 () {}
  method2 = () =&gt; {}

  // &#x9759;&#x6001;&#x6210;&#x5458;
  static method3 () {}
  static method4 = () =&gt; {}
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Model</span> </span>{
  <span class="hljs-comment">// &#x5B9E;&#x4F8B;&#x6210;&#x5458;</span>
  method1 () {}
  method2 = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {}

  <span class="hljs-comment">// &#x9759;&#x6001;&#x6210;&#x5458;</span>
  <span class="hljs-keyword">static</span> method3 () {}
  <span class="hljs-keyword">static</span> method4 = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {}
}</code></pre><p><code>method1</code>&#x548C;<code>method2</code>&#x662F;&#x5B9E;&#x4F8B;&#x6210;&#x5458;&#xFF0C;<code>method1</code>&#x5B58;&#x5728;&#x4E8E;<code>prototype</code>&#x4E4B;&#x4E0A;&#xFF0C;&#x800C;<code>method2</code>&#x53EA;&#x5728;&#x5B9E;&#x4F8B;&#x5316;&#x5BF9;&#x8C61;&#x4EE5;&#x540E;&#x624D;&#x6709;&#x3002;<br>&#x4F5C;&#x4E3A;&#x9759;&#x6001;&#x6210;&#x5458;&#x7684;<code>method3</code>&#x548C;<code>method4</code>&#xFF0C;&#x4E24;&#x8005;&#x7684;&#x533A;&#x522B;&#x5728;&#x4E8E;&#x662F;&#x5426;&#x53EF;&#x679A;&#x4E3E;&#x63CF;&#x8FF0;&#x7B26;&#x7684;&#x8BBE;&#x7F6E;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x7B80;&#x5355;&#x5730;&#x8BA4;&#x4E3A;&#xFF0C;&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#x8F6C;&#x6362;&#x4E3A;ES5&#x7248;&#x672C;&#x540E;&#x662F;&#x8FD9;&#x6837;&#x5B50;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Model () {
  // &#x6210;&#x5458;&#x4EC5;&#x5728;&#x5B9E;&#x4F8B;&#x5316;&#x65F6;&#x8D4B;&#x503C;
  this.method2 = function () {}
}

// &#x6210;&#x5458;&#x88AB;&#x5B9A;&#x4E49;&#x5728;&#x539F;&#x578B;&#x94FE;&#x4E0A;
Object.defineProperty(Model.prototype, &apos;method1&apos;, {
  value: function () {}, 
  writable: true, 
  enumerable: false,  // &#x8BBE;&#x7F6E;&#x4E0D;&#x53EF;&#x88AB;&#x679A;&#x4E3E;
  configurable: true
})

// &#x6210;&#x5458;&#x88AB;&#x5B9A;&#x4E49;&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E0A;&#xFF0C;&#x4E14;&#x662F;&#x9ED8;&#x8BA4;&#x7684;&#x53EF;&#x88AB;&#x679A;&#x4E3E;
Model.method4 = function () {}

// &#x6210;&#x5458;&#x88AB;&#x5B9A;&#x4E49;&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E0A;
Object.defineProperty(Model, &apos;method3&apos;, {
  value: function () {}, 
  writable: true, 
  enumerable: false,  // &#x8BBE;&#x7F6E;&#x4E0D;&#x53EF;&#x88AB;&#x679A;&#x4E3E;
  configurable: true
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Model</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// &#x6210;&#x5458;&#x4EC5;&#x5728;&#x5B9E;&#x4F8B;&#x5316;&#x65F6;&#x8D4B;&#x503C;</span>
  <span class="hljs-keyword">this</span>.method2 = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{}
}

<span class="hljs-comment">// &#x6210;&#x5458;&#x88AB;&#x5B9A;&#x4E49;&#x5728;&#x539F;&#x578B;&#x94FE;&#x4E0A;</span>
<span class="hljs-built_in">Object</span>.defineProperty(Model.prototype, <span class="hljs-string">&apos;method1&apos;</span>, {
  <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{}, 
  <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>, 
  <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>,  <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x4E0D;&#x53EF;&#x88AB;&#x679A;&#x4E3E;</span>
  configurable: <span class="hljs-literal">true</span>
})

<span class="hljs-comment">// &#x6210;&#x5458;&#x88AB;&#x5B9A;&#x4E49;&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E0A;&#xFF0C;&#x4E14;&#x662F;&#x9ED8;&#x8BA4;&#x7684;&#x53EF;&#x88AB;&#x679A;&#x4E3E;</span>
Model.method4 = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{}

<span class="hljs-comment">// &#x6210;&#x5458;&#x88AB;&#x5B9A;&#x4E49;&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E0A;</span>
<span class="hljs-built_in">Object</span>.defineProperty(Model, <span class="hljs-string">&apos;method3&apos;</span>, {
  <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{}, 
  <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>, 
  <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>,  <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x4E0D;&#x53EF;&#x88AB;&#x679A;&#x4E3E;</span>
  configurable: <span class="hljs-literal">true</span>
})</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;&#x53EA;&#x6709;<code>method2</code>&#x662F;&#x5728;&#x5B9E;&#x4F8B;&#x5316;&#x65F6;&#x624D;&#x8D4B;&#x503C;&#x7684;&#xFF0C;&#x4E00;&#x4E2A;&#x4E0D;&#x5B58;&#x5728;&#x7684;&#x5C5E;&#x6027;&#x662F;&#x4E0D;&#x4F1A;&#x6709;<code>descriptor</code>&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x5C31;&#x662F;&#x4E3A;&#x4EC0;&#x4E48;TS&#x5728;&#x9488;&#x5BF9;<code>Property Decorator</code>&#x4E0D;&#x4F20;&#x9012;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x539F;&#x56E0;&#xFF0C;&#x81F3;&#x4E8E;&#x4E3A;&#x4EC0;&#x4E48;&#x9759;&#x6001;&#x6210;&#x5458;&#x4E5F;&#x6CA1;&#x6709;&#x4F20;&#x9012;<code>descriptor</code>&#xFF0C;&#x76EE;&#x524D;&#x6CA1;&#x6709;&#x627E;&#x5230;&#x5408;&#x7406;&#x7684;&#x89E3;&#x91CA;&#xFF0C;&#x4F46;&#x662F;&#x5982;&#x679C;&#x660E;&#x786E;&#x7684;&#x8981;&#x4F7F;&#x7528;&#xFF0C;&#x662F;&#x53EF;&#x4EE5;&#x624B;&#x52A8;&#x83B7;&#x53D6;&#x7684;&#x3002;</p><p>&#x5C31;&#x50CF;&#x4E0A;&#x8FF0;&#x7684;&#x793A;&#x4F8B;&#xFF0C;&#x6211;&#x4EEC;&#x9488;&#x5BF9;&#x56DB;&#x4E2A;&#x6210;&#x5458;&#x90FD;&#x6DFB;&#x52A0;&#x4E86;&#x88C5;&#x9970;&#x5668;&#x4EE5;&#x540E;&#xFF0C;<code>method1</code>&#x548C;<code>method2</code>&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x5C31;&#x662F;<code>Model.prototype</code>&#xFF0C;&#x800C;<code>method3</code>&#x548C;<code>method4</code>&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x5C31;&#x662F;<code>Model</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Model {
  // &#x5B9E;&#x4F8B;&#x6210;&#x5458;
  @instance
  method1 () {}
  @instance
  method2 = () =&gt; {}

  // &#x9759;&#x6001;&#x6210;&#x5458;
  @static
  static method3 () {}
  @static
  static method4 = () =&gt; {}
}

function instance(target) {
  console.log(target.constructor === Model)
}

function static(target) {
  console.log(target === Model)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Model</span> </span>{
  <span class="hljs-comment">// &#x5B9E;&#x4F8B;&#x6210;&#x5458;</span>
  @instance
  method1 () {}
  @instance
  method2 = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {}

  <span class="hljs-comment">// &#x9759;&#x6001;&#x6210;&#x5458;</span>
  @<span class="hljs-keyword">static</span>
  <span class="hljs-keyword">static</span> method3 () {}
  @<span class="hljs-keyword">static</span>
  <span class="hljs-keyword">static</span> method4 = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {}
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">instance</span>(<span class="hljs-params">target</span>) </span>{
  <span class="hljs-built_in">console</span>.log(target.constructor === Model)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">static</span>(<span class="hljs-params">target</span>) </span>{
  <span class="hljs-built_in">console</span>.log(target === Model)
}</code></pre><h3 id="articleHeader7">&#x51FD;&#x6570;&#xFF0C;&#x8BBF;&#x95EE;&#x5668;&#xFF0C;&#x548C;&#x5C5E;&#x6027;&#x88C5;&#x9970;&#x5668;&#x4E09;&#x8005;&#x4E4B;&#x95F4;&#x7684;&#x533A;&#x522B;</h3><h4>&#x51FD;&#x6570;</h4><p>&#x9996;&#x5148;&#x662F;&#x51FD;&#x6570;&#xFF0C;&#x51FD;&#x6570;&#x88C5;&#x9970;&#x5668;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x4F1A;&#x9ED8;&#x8BA4;&#x4F5C;&#x4E3A;&#x5C5E;&#x6027;&#x7684;<code>value</code>&#x63CF;&#x8FF0;&#x7B26;&#x5B58;&#x5728;&#xFF0C;&#x5982;&#x679C;&#x8FD4;&#x56DE;&#x503C;&#x4E3A;<code>undefined</code>&#x5219;&#x4F1A;&#x5FFD;&#x7565;&#xFF0C;&#x4F7F;&#x7528;&#x4E4B;&#x524D;&#x7684;<code>descriptor</code>&#x5F15;&#x7528;&#x4F5C;&#x4E3A;&#x51FD;&#x6570;&#x7684;&#x63CF;&#x8FF0;&#x7B26;&#x3002;<br>&#x6240;&#x4EE5;&#x9488;&#x5BF9;&#x6211;&#x4EEC;&#x6700;&#x5F00;&#x59CB;&#x7684;&#x7EDF;&#x8BA1;&#x8017;&#x65F6;&#x7684;&#x903B;&#x8F91;&#x53EF;&#x4EE5;&#x8FD9;&#x4E48;&#x6765;&#x505A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Model {
  @log1
  getData1() {}
  @log2
  getData2() {}
}

// &#x65B9;&#x6848;&#x4E00;&#xFF0C;&#x8FD4;&#x56DE;&#x65B0;&#x7684;value&#x63CF;&#x8FF0;&#x7B26;
function log1(tag, name, descriptor) {
  return {
    ...descriptor,
    value(...args) {
      let start = new Date().valueOf()
      try {
        return descriptor.value.apply(this, args)
      } finally {
        let end = new Date().valueOf()
        console.log(`start: ${start} end: ${end} consume: ${end - start}`)
      }
    }
  }
}

// &#x65B9;&#x6848;&#x4E8C;&#x3001;&#x4FEE;&#x6539;&#x73B0;&#x6709;&#x63CF;&#x8FF0;&#x7B26;
function log2(tag, name, descriptor) {
  let func = descriptor.value // &#x5148;&#x83B7;&#x53D6;&#x4E4B;&#x524D;&#x7684;&#x51FD;&#x6570;

  // &#x4FEE;&#x6539;&#x5BF9;&#x5E94;&#x7684;value
  descriptor.value = function (...args) {
    let start = new Date().valueOf()
    try {
      return func.apply(this, args)
    } finally {
      let end = new Date().valueOf()
      console.log(`start: ${start} end: ${end} consume: ${end - start}`)
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Model</span> </span>{
  @log1
  getData1() {}
  @log2
  getData2() {}
}

<span class="hljs-comment">// &#x65B9;&#x6848;&#x4E00;&#xFF0C;&#x8FD4;&#x56DE;&#x65B0;&#x7684;value&#x63CF;&#x8FF0;&#x7B26;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">log1</span>(<span class="hljs-params">tag, name, descriptor</span>) </span>{
  <span class="hljs-keyword">return</span> {
    ...descriptor,
    value(...args) {
      <span class="hljs-keyword">let</span> start = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().valueOf()
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">return</span> descriptor.value.apply(<span class="hljs-keyword">this</span>, args)
      } <span class="hljs-keyword">finally</span> {
        <span class="hljs-keyword">let</span> end = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().valueOf()
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`start: <span class="hljs-subst">${start}</span> end: <span class="hljs-subst">${end}</span> consume: <span class="hljs-subst">${end - start}</span>`</span>)
      }
    }
  }
}

<span class="hljs-comment">// &#x65B9;&#x6848;&#x4E8C;&#x3001;&#x4FEE;&#x6539;&#x73B0;&#x6709;&#x63CF;&#x8FF0;&#x7B26;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">log2</span>(<span class="hljs-params">tag, name, descriptor</span>) </span>{
  <span class="hljs-keyword">let</span> func = descriptor.value <span class="hljs-comment">// &#x5148;&#x83B7;&#x53D6;&#x4E4B;&#x524D;&#x7684;&#x51FD;&#x6570;</span>

  <span class="hljs-comment">// &#x4FEE;&#x6539;&#x5BF9;&#x5E94;&#x7684;value</span>
  descriptor.value = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">...args</span>) </span>{
    <span class="hljs-keyword">let</span> start = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().valueOf()
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">return</span> func.apply(<span class="hljs-keyword">this</span>, args)
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-keyword">let</span> end = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().valueOf()
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`start: <span class="hljs-subst">${start}</span> end: <span class="hljs-subst">${end}</span> consume: <span class="hljs-subst">${end - start}</span>`</span>)
    }
  }
}</code></pre><h4>&#x8BBF;&#x95EE;&#x5668;</h4><p>&#x8BBF;&#x95EE;&#x5668;&#x5C31;&#x662F;&#x6DFB;&#x52A0;&#x6709;<code>get</code>&#x3001;<code>set</code>&#x524D;&#x7F00;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x7528;&#x4E8E;&#x63A7;&#x5236;&#x5C5E;&#x6027;&#x7684;&#x8D4B;&#x503C;&#x53CA;&#x53D6;&#x503C;&#x64CD;&#x4F5C;&#xFF0C;&#x5728;&#x4F7F;&#x7528;&#x4E0A;&#x4E0E;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x533A;&#x522B;&#xFF0C;&#x751A;&#x81F3;&#x5728;&#x8FD4;&#x56DE;&#x503C;&#x7684;&#x5904;&#x7406;&#x4E0A;&#x4E5F;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x533A;&#x522B;&#x3002;<br>&#x53EA;&#x4E0D;&#x8FC7;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x6309;&#x7167;&#x89C4;&#x5B9A;&#x8BBE;&#x7F6E;&#x5BF9;&#x5E94;&#x7684;<code>get</code>&#x6216;&#x8005;<code>set</code>&#x63CF;&#x8FF0;&#x7B26;&#x7F62;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Modal {
  _name = &apos;Niko&apos;

  @prefix
  get name() { return this._name }
}

function prefix(target, name, descriptor) {
  return {
    ...descriptor,
    get () {
      return `wrap_${this._name}`
    }
  }
}

console.log(new Modal().name) // wrap_Niko" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Modal</span> </span>{
  _name = <span class="hljs-string">&apos;Niko&apos;</span>

  @prefix
  get name() { <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._name }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">prefix</span>(<span class="hljs-params">target, name, descriptor</span>) </span>{
  <span class="hljs-keyword">return</span> {
    ...descriptor,
    get () {
      <span class="hljs-keyword">return</span> <span class="hljs-string">`wrap_<span class="hljs-subst">${<span class="hljs-keyword">this</span>._name}</span>`</span>
    }
  }
}

<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span> Modal().name) <span class="hljs-comment">// wrap_Niko</span></code></pre><h4>&#x5C5E;&#x6027;</h4><p>&#x5BF9;&#x4E8E;&#x5C5E;&#x6027;&#x7684;&#x88C5;&#x9970;&#x5668;&#xFF0C;&#x662F;&#x6CA1;&#x6709;&#x8FD4;&#x56DE;<code>descriptor</code>&#x7684;&#xFF0C;&#x5E76;&#x4E14;&#x88C5;&#x9970;&#x5668;&#x51FD;&#x6570;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x4E5F;&#x4F1A;&#x88AB;&#x5FFD;&#x7565;&#x6389;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x4FEE;&#x6539;&#x67D0;&#x4E00;&#x4E2A;&#x9759;&#x6001;&#x5C5E;&#x6027;&#xFF0C;&#x5219;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x83B7;&#x53D6;<code>descriptor</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Modal {
  @prefix
  static name1 = &apos;Niko&apos;
}

function prefix(target, name) {
  let descriptor = Object.getOwnPropertyDescriptor(target, name)

  Object.defineProperty(target, name, {
    ...descriptor,
    value: `wrap_${descriptor.value}`
  })
}

console.log(Modal.name1) // wrap_Niko" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Modal</span> </span>{
  @prefix
  <span class="hljs-keyword">static</span> name1 = <span class="hljs-string">&apos;Niko&apos;</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">prefix</span>(<span class="hljs-params">target, name</span>) </span>{
  <span class="hljs-keyword">let</span> descriptor = <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(target, name)

  <span class="hljs-built_in">Object</span>.defineProperty(target, name, {
    ...descriptor,
    <span class="hljs-attr">value</span>: <span class="hljs-string">`wrap_<span class="hljs-subst">${descriptor.value}</span>`</span>
  })
}

<span class="hljs-built_in">console</span>.log(Modal.name1) <span class="hljs-comment">// wrap_Niko</span></code></pre><p>&#x5BF9;&#x4E8E;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5219;&#x6CA1;&#x6709;&#x76F4;&#x63A5;&#x4FEE;&#x6539;&#x7684;&#x65B9;&#x6848;&#xFF0C;&#x4E0D;&#x8FC7;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7ED3;&#x5408;&#x7740;&#x4E00;&#x4E9B;&#x5176;&#x4ED6;&#x88C5;&#x9970;&#x5668;&#x6765;&#x66F2;&#x7EBF;&#x6551;&#x56FD;&#x3002;</p><p>&#x6BD4;&#x5982;&#xFF0C;&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E2A;&#x7C7B;&#xFF0C;&#x4F1A;&#x4F20;&#x5165;&#x59D3;&#x540D;&#x548C;&#x5E74;&#x9F84;&#x4F5C;&#x4E3A;&#x521D;&#x59CB;&#x5316;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x6211;&#x4EEC;&#x8981;&#x9488;&#x5BF9;&#x8FD9;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x8BBE;&#x7F6E;&#x5BF9;&#x5E94;&#x7684;&#x683C;&#x5F0F;&#x6821;&#x9A8C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const validateConf = {} // &#x5B58;&#x50A8;&#x6821;&#x9A8C;&#x4FE1;&#x606F;

@validator
class Person {
  @validate(&apos;string&apos;)
  name
  @validate(&apos;number&apos;)
  age

  constructor(name, age) {
    this.name = name
    this.age = age
  }
}

function validator(constructor) {
  return class extends constructor {
    constructor(...args) {
      super(...args)

      // &#x904D;&#x5386;&#x6240;&#x6709;&#x7684;&#x6821;&#x9A8C;&#x4FE1;&#x606F;&#x8FDB;&#x884C;&#x9A8C;&#x8BC1;
      for (let [key, type] of Object.entries(validateConf)) {
        if (typeof this[key] !== type) throw new Error(`${key} must be ${type}`)
      }
    }
  }
}

function validate(type) {
  return function (target, name, descriptor) {
    // &#x5411;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x4E2D;&#x4F20;&#x5165;&#x8981;&#x6821;&#x9A8C;&#x7684;&#x5C5E;&#x6027;&#x540D;&#x53CA;&#x7C7B;&#x578B;
    validateConf[name] = type
  }
}

new Person(&apos;Niko&apos;, &apos;18&apos;)  // throw new error: [age must be number]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> validateConf = {} <span class="hljs-comment">// &#x5B58;&#x50A8;&#x6821;&#x9A8C;&#x4FE1;&#x606F;</span>

@validator
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
  @validate(<span class="hljs-string">&apos;string&apos;</span>)
  name
  @validate(<span class="hljs-string">&apos;number&apos;</span>)
  age

  <span class="hljs-keyword">constructor</span>(name, age) {
    <span class="hljs-keyword">this</span>.name = name
    <span class="hljs-keyword">this</span>.age = age
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">validator</span>(<span class="hljs-params">constructor</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">constructor</span> </span>{
    <span class="hljs-keyword">constructor</span>(...args) {
      <span class="hljs-keyword">super</span>(...args)

      <span class="hljs-comment">// &#x904D;&#x5386;&#x6240;&#x6709;&#x7684;&#x6821;&#x9A8C;&#x4FE1;&#x606F;&#x8FDB;&#x884C;&#x9A8C;&#x8BC1;</span>
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> [key, type] <span class="hljs-keyword">of</span> <span class="hljs-built_in">Object</span>.entries(validateConf)) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span>[key] !== type) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">`<span class="hljs-subst">${key}</span> must be <span class="hljs-subst">${type}</span>`</span>)
      }
    }
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">validate</span>(<span class="hljs-params">type</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">target, name, descriptor</span>) </span>{
    <span class="hljs-comment">// &#x5411;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x4E2D;&#x4F20;&#x5165;&#x8981;&#x6821;&#x9A8C;&#x7684;&#x5C5E;&#x6027;&#x540D;&#x53CA;&#x7C7B;&#x578B;</span>
    validateConf[name] = type
  }
}

<span class="hljs-keyword">new</span> Person(<span class="hljs-string">&apos;Niko&apos;</span>, <span class="hljs-string">&apos;18&apos;</span>)  <span class="hljs-comment">// throw new error: [age must be number]</span></code></pre><p>&#x9996;&#x5148;&#xFF0C;&#x5728;&#x7C7B;&#x4E0A;&#x8FB9;&#x6DFB;&#x52A0;&#x88C5;&#x9970;&#x5668;<code>@validator</code>&#xFF0C;&#x7136;&#x540E;&#x5728;&#x9700;&#x8981;&#x6821;&#x9A8C;&#x7684;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x4E0A;&#x6DFB;&#x52A0;<code>@validate</code>&#x88C5;&#x9970;&#x5668;&#xFF0C;&#x4E24;&#x4E2A;&#x88C5;&#x9970;&#x5668;&#x7528;&#x6765;&#x5411;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x4F20;&#x5165;&#x4FE1;&#x606F;&#xFF0C;&#x6765;&#x8BB0;&#x5F55;&#x54EA;&#x4E9B;&#x5C5E;&#x6027;&#x662F;&#x9700;&#x8981;&#x8FDB;&#x884C;&#x6821;&#x9A8C;&#x7684;&#x3002;<br>&#x7136;&#x540E;&#x5728;<code>validator</code>&#x4E2D;&#x7EE7;&#x627F;&#x539F;&#x6709;&#x7684;&#x7C7B;&#x5BF9;&#x8C61;&#xFF0C;&#x5E76;&#x5728;&#x5B9E;&#x4F8B;&#x5316;&#x4E4B;&#x540E;&#x904D;&#x5386;&#x521A;&#x624D;&#x8BBE;&#x7F6E;&#x7684;&#x6240;&#x6709;&#x6821;&#x9A8C;&#x4FE1;&#x606F;&#x8FDB;&#x884C;&#x9A8C;&#x8BC1;&#xFF0C;&#x5982;&#x679C;&#x53D1;&#x73B0;&#x6709;&#x7C7B;&#x578B;&#x9519;&#x8BEF;&#x7684;&#xFF0C;&#x76F4;&#x63A5;&#x629B;&#x51FA;&#x5F02;&#x5E38;&#x3002;<br>&#x8FD9;&#x4E2A;&#x7C7B;&#x578B;&#x9A8C;&#x8BC1;&#x7684;&#x64CD;&#x4F5C;&#x5BF9;&#x4E8E;&#x539F;<code>Class</code>&#x6765;&#x8BF4;&#x51E0;&#x4E4E;&#x662F;&#x65E0;&#x611F;&#x77E5;&#x7684;&#x3002;</p><h3 id="articleHeader8">&#x51FD;&#x6570;&#x53C2;&#x6570;&#x88C5;&#x9970;&#x5668;</h3><p>&#x6700;&#x540E;&#xFF0C;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x7528;&#x4E8E;&#x51FD;&#x6570;&#x53C2;&#x6570;&#x7684;&#x88C5;&#x9970;&#x5668;&#xFF0C;&#x8FD9;&#x4E2A;&#x88C5;&#x9970;&#x5668;&#x4E5F;&#x662F;&#x50CF;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x6CA1;&#x6709;&#x529E;&#x6CD5;&#x5355;&#x72EC;&#x4F7F;&#x7528;&#xFF0C;&#x6BD5;&#x7ADF;&#x51FD;&#x6570;&#x662F;&#x5728;&#x8FD0;&#x884C;&#x65F6;&#x8C03;&#x7528;&#x7684;&#xFF0C;&#x800C;&#x65E0;&#x8BBA;&#x662F;&#x4F55;&#x79CD;&#x88C5;&#x9970;&#x5668;&#xFF0C;&#x90FD;&#x662F;&#x5728;&#x58F0;&#x660E;&#x7C7B;&#x65F6;&#xFF08;&#x53EF;&#x4EE5;&#x8BA4;&#x4E3A;&#x662F;&#x4F2A;&#x7F16;&#x8BD1;&#x671F;&#xFF09;&#x8C03;&#x7528;&#x7684;&#x3002;</p><p>&#x51FD;&#x6570;&#x53C2;&#x6570;&#x88C5;&#x9970;&#x5668;&#x4F1A;&#x63A5;&#x6536;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;</p><ol><li>&#x7C7B;&#x4F3C;&#x4E0A;&#x8FF0;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x6216;&#x8005;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;</li><li>&#x53C2;&#x6570;&#x6240;&#x5904;&#x7684;&#x51FD;&#x6570;&#x540D;&#x79F0;</li><li>&#x53C2;&#x6570;&#x5728;&#x51FD;&#x6570;&#x4E2D;&#x5F62;&#x53C2;&#x4E2D;&#x7684;&#x4F4D;&#x7F6E;&#xFF08;&#x51FD;&#x6570;&#x7B7E;&#x540D;&#x4E2D;&#x7684;&#x7B2C;&#x51E0;&#x4E2A;&#x53C2;&#x6570;&#xFF09;</li></ol><p>&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x793A;&#x4F8B;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7ED3;&#x5408;&#x7740;&#x51FD;&#x6570;&#x88C5;&#x9970;&#x5668;&#x6765;&#x5B8C;&#x6210;&#x5BF9;&#x51FD;&#x6570;&#x53C2;&#x6570;&#x7684;&#x7C7B;&#x578B;&#x8F6C;&#x6362;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const parseConf = {}
class Modal {
  @parseFunc
  addOne(@parse(&apos;number&apos;) num) {
    return num + 1
  }
}

// &#x5728;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x524D;&#x6267;&#x884C;&#x683C;&#x5F0F;&#x5316;&#x64CD;&#x4F5C;
function parseFunc (target, name, descriptor) {
  return {
    ...descriptor,
    value (...arg) {
      // &#x83B7;&#x53D6;&#x683C;&#x5F0F;&#x5316;&#x914D;&#x7F6E;
      for (let [index, type] of parseConf) {
        switch (type) {
          case &apos;number&apos;:  arg[index] = Number(arg[index])             break
          case &apos;string&apos;:  arg[index] = String(arg[index])             break
          case &apos;boolean&apos;: arg[index] = String(arg[index]) === &apos;true&apos;  break
        }

        return descriptor.value.apply(this, arg)
      }
    }
  }
}

// &#x5411;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x4E2D;&#x6DFB;&#x52A0;&#x5BF9;&#x5E94;&#x7684;&#x683C;&#x5F0F;&#x5316;&#x4FE1;&#x606F;
function parse(type) {
  return function (target, name, index) {
    parseConf[index] = type
  }
}

console.log(new Modal().addOne(&apos;10&apos;)) // 11" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> parseConf = {}
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Modal</span> </span>{
  @parseFunc
  addOne(@parse(<span class="hljs-string">&apos;number&apos;</span>) num) {
    <span class="hljs-keyword">return</span> num + <span class="hljs-number">1</span>
  }
}

<span class="hljs-comment">// &#x5728;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x524D;&#x6267;&#x884C;&#x683C;&#x5F0F;&#x5316;&#x64CD;&#x4F5C;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parseFunc</span> (<span class="hljs-params">target, name, descriptor</span>) </span>{
  <span class="hljs-keyword">return</span> {
    ...descriptor,
    value (...arg) {
      <span class="hljs-comment">// &#x83B7;&#x53D6;&#x683C;&#x5F0F;&#x5316;&#x914D;&#x7F6E;</span>
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> [index, type] <span class="hljs-keyword">of</span> parseConf) {
        <span class="hljs-keyword">switch</span> (type) {
          <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;number&apos;</span>:  arg[index] = <span class="hljs-built_in">Number</span>(arg[index])             <span class="hljs-keyword">break</span>
          <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;string&apos;</span>:  arg[index] = <span class="hljs-built_in">String</span>(arg[index])             <span class="hljs-keyword">break</span>
          <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;boolean&apos;</span>: arg[index] = <span class="hljs-built_in">String</span>(arg[index]) === <span class="hljs-string">&apos;true&apos;</span>  <span class="hljs-keyword">break</span>
        }

        <span class="hljs-keyword">return</span> descriptor.value.apply(<span class="hljs-keyword">this</span>, arg)
      }
    }
  }
}

<span class="hljs-comment">// &#x5411;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x4E2D;&#x6DFB;&#x52A0;&#x5BF9;&#x5E94;&#x7684;&#x683C;&#x5F0F;&#x5316;&#x4FE1;&#x606F;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parse</span>(<span class="hljs-params">type</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">target, name, index</span>) </span>{
    parseConf[index] = type
  }
}

<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span> Modal().addOne(<span class="hljs-string">&apos;10&apos;</span>)) <span class="hljs-comment">// 11</span></code></pre><h2 id="articleHeader9">&#x4F7F;&#x7528;&#x88C5;&#x9970;&#x5668;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x6709;&#x8DA3;&#x7684;Koa&#x5C01;&#x88C5;</h2><p>&#x6BD4;&#x5982;&#x5728;&#x5199;Node&#x63A5;&#x53E3;&#x65F6;&#xFF0C;&#x53EF;&#x80FD;&#x662F;&#x7528;&#x7684;<code>koa</code>&#x6216;&#x8005;<code>express</code>&#xFF0C;&#x4E00;&#x822C;&#x6765;&#x8BF4;&#x53EF;&#x80FD;&#x8981;&#x5904;&#x7406;&#x5F88;&#x591A;&#x7684;&#x8BF7;&#x6C42;&#x53C2;&#x6570;&#xFF0C;&#x6709;&#x6765;&#x81EA;<code>headers</code>&#x7684;&#xFF0C;&#x6709;&#x6765;&#x81EA;<code>body</code>&#x7684;&#xFF0C;&#x751A;&#x81F3;&#x6709;&#x6765;&#x81EA;<code>query</code>&#x3001;<code>cookie</code>&#x7684;&#x3002;<br>&#x6240;&#x4EE5;&#x5F88;&#x6709;&#x53EF;&#x80FD;&#x5728;<code>router</code>&#x7684;&#x5F00;&#x5934;&#x6570;&#x884C;&#x90FD;&#x662F;&#x8FD9;&#x6837;&#x7684;&#x64CD;&#x4F5C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.get(&apos;/&apos;, async (ctx, next) =&gt; {
  let id = ctx.query.id
  let uid = ctx.cookies.get(&apos;uid&apos;)
  let device = ctx.header[&apos;device&apos;]
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">router.get(<span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-keyword">let</span> id = ctx.query.id
  <span class="hljs-keyword">let</span> uid = ctx.cookies.get(<span class="hljs-string">&apos;uid&apos;</span>)
  <span class="hljs-keyword">let</span> device = ctx.header[<span class="hljs-string">&apos;device&apos;</span>]
})</code></pre><p>&#x4EE5;&#x53CA;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x6709;&#x5927;&#x91CF;&#x7684;&#x63A5;&#x53E3;&#xFF0C;&#x53EF;&#x80FD;&#x5C31;&#x4F1A;&#x6709;&#x5927;&#x91CF;&#x7684;<code>router.get</code>&#x3001;<code>router.post</code>&#x3002;<br>&#x4EE5;&#x53CA;&#x5982;&#x679C;&#x8981;&#x9488;&#x5BF9;&#x6A21;&#x5757;&#x8FDB;&#x884C;&#x5206;&#x7C7B;&#xFF0C;&#x53EF;&#x80FD;&#x8FD8;&#x4F1A;&#x6709;&#x5927;&#x91CF;&#x7684;<code>new Router</code>&#x7684;&#x64CD;&#x4F5C;&#x3002;</p><p>&#x8FD9;&#x4E9B;&#x4EE3;&#x7801;&#x90FD;&#x662F;&#x4E0E;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x672C;&#x8EAB;&#x65E0;&#x5173;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x5E94;&#x8BE5;&#x5C3D;&#x53EF;&#x80FD;&#x7684;&#x7B80;&#x5316;&#x8FD9;&#x4E9B;&#x4EE3;&#x7801;&#x7684;&#x5360;&#x6BD4;&#xFF0C;&#x800C;&#x4F7F;&#x7528;&#x88C5;&#x9970;&#x5668;&#x5C31;&#x80FD;&#x591F;&#x5E2E;&#x52A9;&#x6211;&#x4EEC;&#x8FBE;&#x5230;&#x8FD9;&#x4E2A;&#x76EE;&#x7684;&#x3002;</p><h3 id="articleHeader10">&#x88C5;&#x9970;&#x5668;&#x7684;&#x51C6;&#x5907;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x521B;&#x5EFA;&#x51E0;&#x4E2A;&#x7528;&#x6765;&#x5B58;&#x50A8;&#x4FE1;&#x606F;&#x7684;&#x5168;&#x5C40;List
export const routerList      = []
export const controllerList  = []
export const parseList       = []
export const paramList       = []

// &#x867D;&#x8BF4;&#x6211;&#x4EEC;&#x8981;&#x6709;&#x4E00;&#x4E2A;&#x80FD;&#x591F;&#x521B;&#x5EFA;Router&#x5B9E;&#x4F8B;&#x7684;&#x88C5;&#x9970;&#x5668;
// &#x4F46;&#x662F;&#x5E76;&#x4E0D;&#x4F1A;&#x76F4;&#x63A5;&#x53BB;&#x521B;&#x5EFA;&#xFF0C;&#x800C;&#x662F;&#x5728;&#x88C5;&#x9970;&#x5668;&#x6267;&#x884C;&#x7684;&#x65F6;&#x5019;&#x8FDB;&#x884C;&#x4E00;&#x6B21;&#x6CE8;&#x518C;
export function Router(basename = &apos;&apos;) {
  return (constrcutor) =&gt; {
    routerList.push({
      constrcutor,
      basename
    })
  }
}

// &#x7136;&#x540E;&#x6211;&#x4EEC;&#x5728;&#x521B;&#x5EFA;&#x5BF9;&#x5E94;&#x7684;Get Post&#x8BF7;&#x6C42;&#x76D1;&#x542C;&#x7684;&#x88C5;&#x9970;&#x5668;
// &#x540C;&#x6837;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x5E76;&#x4E0D;&#x6253;&#x7B97;&#x53BB;&#x4FEE;&#x6539;&#x4ED6;&#x7684;&#x4EFB;&#x4F55;&#x5C5E;&#x6027;&#xFF0C;&#x53EA;&#x662F;&#x4E3A;&#x4E86;&#x83B7;&#x53D6;&#x51FD;&#x6570;&#x7684;&#x5F15;&#x7528;
export function Method(type) {
  return (path) =&gt; (target, name, descriptor) =&gt; {
    controllerList.push({
      target,
      type,
      path,
      method: name,
      controller: descriptor.value
    })
  }
}

// &#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x8FD8;&#x9700;&#x8981;&#x7528;&#x6765;&#x683C;&#x5F0F;&#x5316;&#x53C2;&#x6570;&#x7684;&#x88C5;&#x9970;&#x5668;
export function Parse(type) {
  return (target, name, index) =&gt; {
    parseList.push({
      target,
      type,
      method: name,
      index
    })
  }
}

// &#x4EE5;&#x53CA;&#x6700;&#x540E;&#x6211;&#x4EEC;&#x8981;&#x5904;&#x7406;&#x7684;&#x5404;&#x79CD;&#x53C2;&#x6570;&#x7684;&#x83B7;&#x53D6;
export function Param(position) {
  return (key) =&gt; (target, name, index) =&gt; {
    paramList.push({
      target,
      key,
      position,
      method: name,
      index
    })
  }
}

export const Body   = Param(&apos;body&apos;)
export const Header = Param(&apos;header&apos;)
export const Cookie = Param(&apos;cookie&apos;)
export const Query  = Param(&apos;query&apos;)
export const Get    = Method(&apos;get&apos;)
export const Post   = Method(&apos;post&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x521B;&#x5EFA;&#x51E0;&#x4E2A;&#x7528;&#x6765;&#x5B58;&#x50A8;&#x4FE1;&#x606F;&#x7684;&#x5168;&#x5C40;List</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> routerList      = []
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> controllerList  = []
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> parseList       = []
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> paramList       = []

<span class="hljs-comment">// &#x867D;&#x8BF4;&#x6211;&#x4EEC;&#x8981;&#x6709;&#x4E00;&#x4E2A;&#x80FD;&#x591F;&#x521B;&#x5EFA;Router&#x5B9E;&#x4F8B;&#x7684;&#x88C5;&#x9970;&#x5668;</span>
<span class="hljs-comment">// &#x4F46;&#x662F;&#x5E76;&#x4E0D;&#x4F1A;&#x76F4;&#x63A5;&#x53BB;&#x521B;&#x5EFA;&#xFF0C;&#x800C;&#x662F;&#x5728;&#x88C5;&#x9970;&#x5668;&#x6267;&#x884C;&#x7684;&#x65F6;&#x5019;&#x8FDB;&#x884C;&#x4E00;&#x6B21;&#x6CE8;&#x518C;</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Router</span>(<span class="hljs-params">basename = <span class="hljs-string">&apos;&apos;</span></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">constrcutor</span>) =&gt;</span> {
    routerList.push({
      constrcutor,
      basename
    })
  }
}

<span class="hljs-comment">// &#x7136;&#x540E;&#x6211;&#x4EEC;&#x5728;&#x521B;&#x5EFA;&#x5BF9;&#x5E94;&#x7684;Get Post&#x8BF7;&#x6C42;&#x76D1;&#x542C;&#x7684;&#x88C5;&#x9970;&#x5668;</span>
<span class="hljs-comment">// &#x540C;&#x6837;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x5E76;&#x4E0D;&#x6253;&#x7B97;&#x53BB;&#x4FEE;&#x6539;&#x4ED6;&#x7684;&#x4EFB;&#x4F55;&#x5C5E;&#x6027;&#xFF0C;&#x53EA;&#x662F;&#x4E3A;&#x4E86;&#x83B7;&#x53D6;&#x51FD;&#x6570;&#x7684;&#x5F15;&#x7528;</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Method</span>(<span class="hljs-params">type</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">path</span>) =&gt;</span> (target, name, descriptor) =&gt; {
    controllerList.push({
      target,
      type,
      path,
      <span class="hljs-attr">method</span>: name,
      <span class="hljs-attr">controller</span>: descriptor.value
    })
  }
}

<span class="hljs-comment">// &#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x8FD8;&#x9700;&#x8981;&#x7528;&#x6765;&#x683C;&#x5F0F;&#x5316;&#x53C2;&#x6570;&#x7684;&#x88C5;&#x9970;&#x5668;</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parse</span>(<span class="hljs-params">type</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">target, name, index</span>) =&gt;</span> {
    parseList.push({
      target,
      type,
      <span class="hljs-attr">method</span>: name,
      index
    })
  }
}

<span class="hljs-comment">// &#x4EE5;&#x53CA;&#x6700;&#x540E;&#x6211;&#x4EEC;&#x8981;&#x5904;&#x7406;&#x7684;&#x5404;&#x79CD;&#x53C2;&#x6570;&#x7684;&#x83B7;&#x53D6;</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Param</span>(<span class="hljs-params">position</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">key</span>) =&gt;</span> (target, name, index) =&gt; {
    paramList.push({
      target,
      key,
      position,
      <span class="hljs-attr">method</span>: name,
      index
    })
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> Body   = Param(<span class="hljs-string">&apos;body&apos;</span>)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> Header = Param(<span class="hljs-string">&apos;header&apos;</span>)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> Cookie = Param(<span class="hljs-string">&apos;cookie&apos;</span>)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> Query  = Param(<span class="hljs-string">&apos;query&apos;</span>)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> Get    = Method(<span class="hljs-string">&apos;get&apos;</span>)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> Post   = Method(<span class="hljs-string">&apos;post&apos;</span>)</code></pre><h3 id="articleHeader11">Koa&#x670D;&#x52A1;&#x7684;&#x5904;&#x7406;</h3><p>&#x4E0A;&#x8FB9;&#x662F;&#x521B;&#x5EFA;&#x4E86;&#x6240;&#x6709;&#x9700;&#x8981;&#x7528;&#x5230;&#x7684;&#x88C5;&#x9970;&#x5668;&#xFF0C;&#x4F46;&#x662F;&#x4E5F;&#x4EC5;&#x4EC5;&#x662F;&#x628A;&#x6211;&#x4EEC;&#x6240;&#x9700;&#x8981;&#x7684;&#x5404;&#x79CD;&#x4FE1;&#x606F;&#x5B58;&#x4E86;&#x8D77;&#x6765;&#xFF0C;&#x800C;&#x600E;&#x4E48;&#x5229;&#x7528;&#x8FD9;&#x4E9B;&#x88C5;&#x9970;&#x5668;&#x5219;&#x662F;&#x4E0B;&#x4E00;&#x6B65;&#x9700;&#x8981;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const routers = []

// &#x904D;&#x5386;&#x6240;&#x6709;&#x6DFB;&#x52A0;&#x4E86;&#x88C5;&#x9970;&#x5668;&#x7684;Class&#xFF0C;&#x5E76;&#x521B;&#x5EFA;&#x5BF9;&#x5E94;&#x7684;Router&#x5BF9;&#x8C61;
routerList.forEach(item =&gt; {
  let { basename, constrcutor } = item
  let router = new Router({
    prefix: basename
  })

  controllerList
    .filter(i =&gt; i.target === constrcutor.prototype)
    .forEach(controller =&gt; {
      router[controller.type](controller.path, async (ctx, next) =&gt; {
        let args = []
        // &#x83B7;&#x53D6;&#x5F53;&#x524D;&#x51FD;&#x6570;&#x5BF9;&#x5E94;&#x7684;&#x53C2;&#x6570;&#x83B7;&#x53D6;
        paramList
          .filter( param =&gt; param.target === constrcutor.prototype &amp;&amp; param.method === controller.method )
          .map(param =&gt; {
            let { index, key } = param
            switch (param.position) {
              case &apos;body&apos;:    args[index] = ctx.request.body[key] break
              case &apos;header&apos;:  args[index] = ctx.headers[key]      break
              case &apos;cookie&apos;:  args[index] = ctx.cookies.get(key)  break
              case &apos;query&apos;:   args[index] = ctx.query[key]        break
            }
          })

        // &#x83B7;&#x53D6;&#x5F53;&#x524D;&#x51FD;&#x6570;&#x5BF9;&#x5E94;&#x7684;&#x53C2;&#x6570;&#x683C;&#x5F0F;&#x5316;
        parseList
          .filter( parse =&gt; parse.target === constrcutor.prototype &amp;&amp; parse.method === controller.method )
          .map(parse =&gt; {
            let { index } = parse
            switch (parse.type) {
              case &apos;number&apos;:  args[index] = Number(args[index])             break
              case &apos;string&apos;:  args[index] = String(args[index])             break
              case &apos;boolean&apos;: args[index] = String(args[index]) === &apos;true&apos;  break
            }
          })

        // &#x8C03;&#x7528;&#x5B9E;&#x9645;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x5904;&#x7406;&#x4E1A;&#x52A1;&#x903B;&#x8F91;
        let results = controller.controller(...args)

        ctx.body = results
      })
    })

  routers.push(router.routes())
})

const app = new Koa()

app.use(bodyParse())
app.use(compose(routers))

app.listen(12306, () =&gt; console.log(&apos;server run as http://127.0.0.1:12306&apos;))" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> routers = []

<span class="hljs-comment">// &#x904D;&#x5386;&#x6240;&#x6709;&#x6DFB;&#x52A0;&#x4E86;&#x88C5;&#x9970;&#x5668;&#x7684;Class&#xFF0C;&#x5E76;&#x521B;&#x5EFA;&#x5BF9;&#x5E94;&#x7684;Router&#x5BF9;&#x8C61;</span>
routerList.forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
  <span class="hljs-keyword">let</span> { basename, constrcutor } = item
  <span class="hljs-keyword">let</span> router = <span class="hljs-keyword">new</span> Router({
    <span class="hljs-attr">prefix</span>: basename
  })

  controllerList
    .filter(<span class="hljs-function"><span class="hljs-params">i</span> =&gt;</span> i.target === constrcutor.prototype)
    .forEach(<span class="hljs-function"><span class="hljs-params">controller</span> =&gt;</span> {
      router[controller.type](controller.path, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
        <span class="hljs-keyword">let</span> args = []
        <span class="hljs-comment">// &#x83B7;&#x53D6;&#x5F53;&#x524D;&#x51FD;&#x6570;&#x5BF9;&#x5E94;&#x7684;&#x53C2;&#x6570;&#x83B7;&#x53D6;</span>
        paramList
          .filter( <span class="hljs-function"><span class="hljs-params">param</span> =&gt;</span> param.target === constrcutor.prototype &amp;&amp; param.method === controller.method )
          .map(<span class="hljs-function"><span class="hljs-params">param</span> =&gt;</span> {
            <span class="hljs-keyword">let</span> { index, key } = param
            <span class="hljs-keyword">switch</span> (param.position) {
              <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;body&apos;</span>:    args[index] = ctx.request.body[key] <span class="hljs-keyword">break</span>
              <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;header&apos;</span>:  args[index] = ctx.headers[key]      <span class="hljs-keyword">break</span>
              <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;cookie&apos;</span>:  args[index] = ctx.cookies.get(key)  <span class="hljs-keyword">break</span>
              <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;query&apos;</span>:   args[index] = ctx.query[key]        <span class="hljs-keyword">break</span>
            }
          })

        <span class="hljs-comment">// &#x83B7;&#x53D6;&#x5F53;&#x524D;&#x51FD;&#x6570;&#x5BF9;&#x5E94;&#x7684;&#x53C2;&#x6570;&#x683C;&#x5F0F;&#x5316;</span>
        parseList
          .filter( <span class="hljs-function"><span class="hljs-params">parse</span> =&gt;</span> parse.target === constrcutor.prototype &amp;&amp; parse.method === controller.method )
          .map(<span class="hljs-function"><span class="hljs-params">parse</span> =&gt;</span> {
            <span class="hljs-keyword">let</span> { index } = parse
            <span class="hljs-keyword">switch</span> (parse.type) {
              <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;number&apos;</span>:  args[index] = <span class="hljs-built_in">Number</span>(args[index])             <span class="hljs-keyword">break</span>
              <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;string&apos;</span>:  args[index] = <span class="hljs-built_in">String</span>(args[index])             <span class="hljs-keyword">break</span>
              <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;boolean&apos;</span>: args[index] = <span class="hljs-built_in">String</span>(args[index]) === <span class="hljs-string">&apos;true&apos;</span>  <span class="hljs-keyword">break</span>
            }
          })

        <span class="hljs-comment">// &#x8C03;&#x7528;&#x5B9E;&#x9645;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x5904;&#x7406;&#x4E1A;&#x52A1;&#x903B;&#x8F91;</span>
        <span class="hljs-keyword">let</span> results = controller.controller(...args)

        ctx.body = results
      })
    })

  routers.push(router.routes())
})

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()

app.use(bodyParse())
app.use(compose(routers))

app.listen(<span class="hljs-number">12306</span>, () =&gt; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;server run as http://127.0.0.1:12306&apos;</span>))</code></pre><p>&#x4E0A;&#x8FB9;&#x7684;&#x4EE3;&#x7801;&#x5C31;&#x5DF2;&#x7ECF;&#x642D;&#x5EFA;&#x51FA;&#x6765;&#x4E86;&#x4E00;&#x4E2A;Koa&#x7684;&#x5C01;&#x88C5;&#xFF0C;&#x4EE5;&#x53CA;&#x5305;&#x542B;&#x4E86;&#x5BF9;&#x5404;&#x79CD;&#x88C5;&#x9970;&#x5668;&#x7684;&#x5904;&#x7406;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x662F;&#x8FD9;&#x4E9B;&#x88C5;&#x9970;&#x5668;&#x7684;&#x5B9E;&#x9645;&#x5E94;&#x7528;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Router, Get, Query, Parse } from &quot;../decorators&quot;

@Router(&apos;&apos;)
export default class {
  @Get(&apos;/&apos;)
  index (@Parse(&apos;number&apos;) @Query(&apos;id&apos;) id: number) {
    return {
      code: 200,
      id,
      type: typeof id
    }
  }

  @Post(&apos;/detail&apos;)
  detail (
    @Parse(&apos;number&apos;) @Query(&apos;id&apos;) id: number, 
    @Parse(&apos;number&apos;) @Body(&apos;age&apos;) age: number
  ) {
    return {
      code: 200,
      age: age + 1
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { Router, Get, Query, Parse } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;../decorators&quot;</span>

@Router(<span class="hljs-string">&apos;&apos;</span>)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> </span>{
  @Get(<span class="hljs-string">&apos;/&apos;</span>)
  index (@Parse(<span class="hljs-string">&apos;number&apos;</span>) @Query(<span class="hljs-string">&apos;id&apos;</span>) id: number) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">code</span>: <span class="hljs-number">200</span>,
      id,
      <span class="hljs-attr">type</span>: <span class="hljs-keyword">typeof</span> id
    }
  }

  @Post(<span class="hljs-string">&apos;/detail&apos;</span>)
  detail (
    @Parse(<span class="hljs-string">&apos;number&apos;</span>) @Query(<span class="hljs-string">&apos;id&apos;</span>) id: number, 
    @Parse(<span class="hljs-string">&apos;number&apos;</span>) @Body(<span class="hljs-string">&apos;age&apos;</span>) age: number
  ) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">code</span>: <span class="hljs-number">200</span>,
      <span class="hljs-attr">age</span>: age + <span class="hljs-number">1</span>
    }
  }
}</code></pre><p>&#x5F88;&#x8F7B;&#x6613;&#x7684;&#x5C31;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;<code>router</code>&#x7684;&#x521B;&#x5EFA;&#xFF0C;&#x8DEF;&#x5F84;&#x3001;method&#x7684;&#x5904;&#x7406;&#xFF0C;&#x5305;&#x62EC;&#x5404;&#x79CD;&#x53C2;&#x6570;&#x7684;&#x83B7;&#x53D6;&#xFF0C;&#x7C7B;&#x578B;&#x8F6C;&#x6362;&#x3002;<br>&#x5C06;&#x5404;&#x79CD;&#x975E;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x76F8;&#x5173;&#x7684;&#x4EE3;&#x7801;&#x7EDF;&#x7EDF;&#x4EA4;&#x7531;&#x88C5;&#x9970;&#x5668;&#x6765;&#x505A;&#xFF0C;&#x800C;&#x51FD;&#x6570;&#x672C;&#x8EAB;&#x53EA;&#x8D1F;&#x8D23;&#x5904;&#x7406;&#x81EA;&#x8EAB;&#x903B;&#x8F91;&#x5373;&#x53EF;&#x3002;<br>&#x8FD9;&#x91CC;&#x6709;&#x5B8C;&#x6574;&#x7684;&#x4EE3;&#x7801;&#xFF1A;<a href="https://github.com/Jiasm/notebook/tree/master/labs/demo/typescript/koa-decorators" rel="nofollow noreferrer" target="_blank">GitHub</a>&#x3002;&#x5B89;&#x88C5;&#x4F9D;&#x8D56;&#x540E;<code>npm start</code>&#x5373;&#x53EF;&#x770B;&#x5230;&#x6548;&#x679C;&#x3002;</p><p>&#x8FD9;&#x6837;&#x5F00;&#x53D1;&#x5E26;&#x6765;&#x7684;&#x597D;&#x5904;&#x5C31;&#x662F;&#xFF0C;&#x8BA9;&#x4EE3;&#x7801;&#x53EF;&#x8BFB;&#x6027;&#x53D8;&#x5F97;&#x66F4;&#x9AD8;&#xFF0C;&#x5728;&#x51FD;&#x6570;&#x4E2D;&#x66F4;&#x4E13;&#x6CE8;&#x7684;&#x505A;&#x81EA;&#x5DF1;&#x5E94;&#x8BE5;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x3002;<br>&#x800C;&#x4E14;&#x88C5;&#x9970;&#x5668;&#x672C;&#x8EAB;&#x5982;&#x679C;&#x540D;&#x5B57;&#x8D77;&#x7684;&#x8DB3;&#x591F;&#x597D;&#x7684;&#x597D;&#xFF0C;&#x4E5F;&#x662F;&#x5728;&#x4E00;&#x5B9A;&#x7A0B;&#x5EA6;&#x4E0A;&#x53EF;&#x4EE5;&#x5F53;&#x4F5C;&#x6587;&#x6863;&#x6CE8;&#x91CA;&#x6765;&#x770B;&#x5F85;&#x4E86;&#xFF08;Java&#x4E2D;&#x6709;&#x4E2A;&#x7C7B;&#x4F3C;&#x7684;&#x73A9;&#x610F;&#x513F;&#x53EB;&#x505A;&#x6CE8;&#x89E3;&#xFF09;&#x3002;</p><h2 id="articleHeader12">&#x603B;&#x7ED3;</h2><p>&#x5408;&#x7406;&#x5229;&#x7528;&#x88C5;&#x9970;&#x5668;&#x53EF;&#x4EE5;&#x6781;&#x5927;&#x7684;&#x63D0;&#x9AD8;&#x5F00;&#x53D1;&#x6548;&#x7387;&#xFF0C;&#x5BF9;&#x4E00;&#x4E9B;&#x975E;&#x903B;&#x8F91;&#x76F8;&#x5173;&#x7684;&#x4EE3;&#x7801;&#x8FDB;&#x884C;&#x5C01;&#x88C5;&#x63D0;&#x70BC;&#x80FD;&#x591F;&#x5E2E;&#x52A9;&#x6211;&#x4EEC;&#x5FEB;&#x901F;&#x5B8C;&#x6210;&#x91CD;&#x590D;&#x6027;&#x7684;&#x5DE5;&#x4F5C;&#xFF0C;&#x8282;&#x7701;&#x65F6;&#x95F4;&#x3002;<br>&#x4F46;&#x662F;&#x7CD6;&#x518D;&#x597D;&#x5403;&#xFF0C;&#x4E5F;&#x4E0D;&#x8981;&#x5403;&#x592A;&#x591A;&#xFF0C;&#x5BB9;&#x6613;&#x574F;&#x7259;&#x9F7F;&#x7684;&#xFF0C;&#x540C;&#x6837;&#x7684;&#x6EE5;&#x7528;&#x88C5;&#x9970;&#x5668;&#x4E5F;&#x4F1A;&#x4F7F;&#x4EE3;&#x7801;&#x672C;&#x8EAB;&#x903B;&#x8F91;&#x53D8;&#x5F97;&#x6251;&#x6714;&#x8FF7;&#x79BB;&#xFF0C;&#x5982;&#x679C;&#x786E;&#x5B9A;&#x4E00;&#x6BB5;&#x4EE3;&#x7801;&#x4E0D;&#x4F1A;&#x5728;&#x5176;&#x4ED6;&#x5730;&#x65B9;&#x7528;&#x5230;&#xFF0C;&#x6216;&#x8005;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x6838;&#x5FC3;&#x903B;&#x8F91;&#x5C31;&#x662F;&#x8FD9;&#x4E9B;&#x4EE3;&#x7801;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x6CA1;&#x6709;&#x5FC5;&#x8981;&#x5C06;&#x5B83;&#x53D6;&#x51FA;&#x6765;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x88C5;&#x9970;&#x5668;&#x6765;&#x5B58;&#x5728;&#x3002;</p><h3 id="articleHeader13">&#x53C2;&#x8003;&#x8D44;&#x6599;</h3><ol><li><a href="https://www.typescriptlang.org/docs/handbook/decorators.html" rel="nofollow noreferrer" target="_blank">typescript | decorators</a></li><li><a href="https://github.com/typestack/routing-controllers" rel="nofollow noreferrer" target="_blank">koa&#x793A;&#x4F8B;&#x7684;&#x539F;&#x7248;&#xFF0C;&#x7B80;&#x5316;&#x4EE3;&#x7801;&#x4FBF;&#x4E8E;&#x4E3E;&#x4F8B;</a></li></ol><h3 id="articleHeader14">One more thing</h3><p>&#x6211;&#x53F8;&#x73B0;&#x5728;&#x5927;&#x91CF;&#x62DB;&#x4EBA;&#x54AF;&#xFF0C;&#x524D;&#x7AEF;&#x3001;Node&#x65B9;&#x5411;&#x90FD;&#x6709;HC<br>&#x516C;&#x53F8;&#x540D;&#xFF1A;<strong>Blued</strong>&#xFF0C;&#x5750;&#x6807;&#x5E1D;&#x90FD;&#x671D;&#x9633;&#x53CC;&#x4E95;<br>&#x4E3B;&#x8981;&#x6280;&#x672F;&#x6808;&#x662F;React&#xFF0C;&#x4E5F;&#x4F1A;&#x6709;&#x673A;&#x4F1A;&#x73A9;ReactNative&#x548C;Electron<br>Node&#x65B9;&#x5411;8.x&#x7248;&#x672C;+koa &#x65B0;&#x9879;&#x76EE;&#x4F1A;&#x4EE5;TS&#x4E3A;&#x4E3B;<br>&#x6709;&#x5174;&#x8DA3;&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#x53EF;&#x4EE5;&#x8054;&#x7CFB;&#x6211;&#x8BE6;&#x8C08;&#xFF1A;<br>email: jiashunming@blued.com<br>wechat: github_jiasm</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript装饰器的妙用

## 原文链接
[https://segmentfault.com/a/1190000015566627](https://segmentfault.com/a/1190000015566627)

