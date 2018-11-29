---
title: '从ES6重新认识JavaScript设计模式(三): 建造者模式' 
date: 2018-11-29 9:27:39
hidden: true
slug: opuc4iixuzb
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000015147692" src="https://static.alili.tech/img/remote/1460000015147692" alt="design-pattern-builder" title="design-pattern-builder" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">1 &#x4EC0;&#x4E48;&#x662F;&#x5EFA;&#x9020;&#x8005;&#x6A21;&#x5F0F;?</h2>
<p><strong>&#x5EFA;&#x9020;&#x8005;&#x6A21;&#x5F0F;(Builder)</strong>&#x662F;&#x5C06;&#x4E00;&#x4E2A;&#x590D;&#x6742;&#x5BF9;&#x8C61;&#x7684;&#x6784;&#x5EFA;&#x5C42;&#x4E0E;&#x5176;&#x8868;&#x793A;&#x5C42;&#x76F8;&#x4E92;&#x5206;&#x79BB;&#xFF0C;&#x540C;&#x6837;&#x7684;&#x6784;&#x5EFA;&#x8FC7;&#x7A0B;&#x53EF;&#x91C7;&#x7528;&#x4E0D;&#x540C;&#x7684;&#x8868;&#x793A;&#x3002;</p>
<p>&#x5EFA;&#x9020;&#x8005;&#x6A21;&#x5F0F;&#x7684;&#x7279;&#x70B9;&#x662F;&#x5206;&#x6B65;&#x6784;&#x5EFA;&#x4E00;&#x4E2A;&#x590D;&#x6742;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x53EF;&#x4EE5;&#x7528;&#x4E0D;&#x540C;&#x7EC4;&#x5408;&#x6216;&#x987A;&#x5E8F;&#x5EFA;&#x9020;&#x51FA;&#x4E0D;&#x540C;&#x610F;&#x4E49;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x901A;&#x5E38;&#x4F7F;&#x7528;&#x8005;&#x5E76;&#x4E0D;&#x9700;&#x8981;&#x77E5;&#x9053;&#x5EFA;&#x9020;&#x7684;&#x7EC6;&#x8282;&#xFF0C;&#x901A;&#x5E38;&#x4F7F;&#x7528;<strong>&#x94FE;&#x5F0F;&#x8C03;&#x7528;</strong>&#x6765;&#x8FDB;&#x884C;&#x5EFA;&#x9020;&#x8FC7;&#x7A0B;&#xFF0C;&#x6700;&#x540E;&#x8C03;&#x7528;<code>build</code>&#x65B9;&#x6CD5;&#x6765;&#x751F;&#x6210;&#x6700;&#x7EC8;&#x5BF9;&#x8C61;&#x3002; </p>
<p>&#x540C;&#x6837;&#x4F5C;&#x4E3A;&#x521B;&#x5EFA;&#x578B;&#x7684;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#xFF0C;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x548C;&#x5DE5;&#x5382;&#x6A21;&#x5F0F;&#x7684;&#x533A;&#x522B;&#xFF0C;&#x5DE5;&#x5382;&#x867D;&#x7136;&#x4E5F;&#x662F;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#xFF0C;&#x4F46;&#x600E;&#x6837;&#x521B;&#x5EFA;&#x65E0;&#x6240;&#x8C13;&#xFF0C;<strong>&#x5DE5;&#x5382;&#x6A21;&#x5F0F;&#x5173;&#x6CE8;&#x7684;&#x662F;&#x521B;&#x5EFA;&#x7684;&#x7ED3;&#x679C;</strong>&#xFF1B;&#x800C;&#x5EFA;&#x9020;&#x8005;&#x6A21;&#x5F0F;&#x4E0D;&#x4EC5;&#x5F97;&#x5230;&#x4E86;&#x7ED3;&#x679C;&#xFF0C;&#x540C;&#x65F6;&#x4E5F;<strong>&#x53C2;&#x4E0E;&#x4E86;&#x521B;&#x5EFA;&#x7684;&#x5177;&#x4F53;&#x8FC7;&#x7A0B;</strong>&#xFF0C;&#x9002;&#x5408;&#x7528;&#x6765;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x590D;&#x6742;&#x7684;&#x590D;&#x5408;&#x5BF9;&#x8C61;&#x3002;</p>
<h2 id="articleHeader1">2 ES6&#x4E2D;&#x7684;&#x5EFA;&#x9020;&#x8005;&#x6A21;&#x5F0F;</h2>
<p>&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x6765;&#x5047;&#x8BBE;&#x4E00;&#x4E2A;&#x51FA;&#x7248;&#x793E;&#x7684;&#x4E66;&#x7C4D;&#x540E;&#x53F0;&#x5F55;&#x5165;&#x7CFB;&#x7EDF;&#x7684;&#x4E1A;&#x52A1;&#x573A;&#x666F;&#xFF0C;&#x4E66;&#x7C4D;&#x6709;&#x56DB;&#x4E2A;&#x5FC5;&#x586B;&#x4FE1;&#x606F;&#xFF0C;&#x5206;&#x522B;&#x662F;&#xFF1A;&#x4E66;&#x540D;&#xFF0C;&#x4F5C;&#x8005;&#xFF0C;&#x4EF7;&#x683C;&#xFF0C;&#x5206;&#x7C7B;&#xFF1B;&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x4E66;&#x7C4D;&#x5BF9;&#x8C61;&#x8FD4;&#x56DE;&#x7ED9;&#x540E;&#x7AEF;&#x3002;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x6765;&#x4E00;&#x6B65;&#x4E00;&#x6B65;&#x6DF1;&#x5165;&#x4F7F;&#x7528;ES6&#x7684;&#x8BED;&#x6CD5;&#x7ED3;&#x5408;&#x5EFA;&#x9020;&#x8005;&#x6A21;&#x5F0F;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x4E66;&#x7C4D;&#x5EFA;&#x9020;&#x8005;&#x7C7B;
class BookBuilder {
  constructor() {
    this.name = &apos;&apos;;
    this.author = &apos;&apos;;
    this.price = 0;
    this.category = &apos;&apos;;
  }
  
  withName(name) {
    this.name = name;
    return this;
  }

  withAuthor(author) {
    this.author = author;
    return this;
  }

  withPrice(price) {
    this.price = price;
    return this;
  }

  withCategory(category) {
    this.category = category;
    return  this;
  }

  build() {
    return {
      name: this.name,
      author: this.author,
      prices: this.price,
      category: this.category
    }
  }
}

//&#x8C03;&#x7528;&#x5EFA;&#x9020;&#x8005;&#x7C7B;
const book = new BookBuilder()
  .withName(&quot;&#x9AD8;&#x6548;&#x80FD;&#x4EBA;&#x58EB;&#x7684;&#x4E03;&#x4E2A;&#x4E60;&#x60EF;&quot;)
  .withAuthor(&apos;&#x53F2;&#x8482;&#x82AC;&#xB7;&#x67EF;&#x7EF4;&apos;)
  .withPrice(51)
  .withCategory(&apos;&#x52B1;&#x5FD7;&apos;)
  .build();" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">//&#x4E66;&#x7C4D;&#x5EFA;&#x9020;&#x8005;&#x7C7B;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BookBuilder</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-keyword">this</span>.author = <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-keyword">this</span>.price = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>.category = <span class="hljs-string">&apos;&apos;</span>;
  }
  
  withName(name) {
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  }

  withAuthor(author) {
    <span class="hljs-keyword">this</span>.author = author;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  }

  withPrice(price) {
    <span class="hljs-keyword">this</span>.price = price;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  }

  withCategory(category) {
    <span class="hljs-keyword">this</span>.category = category;
    <span class="hljs-keyword">return</span>  <span class="hljs-keyword">this</span>;
  }

  build() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">name</span>: <span class="hljs-keyword">this</span>.name,
      <span class="hljs-attr">author</span>: <span class="hljs-keyword">this</span>.author,
      <span class="hljs-attr">prices</span>: <span class="hljs-keyword">this</span>.price,
      <span class="hljs-attr">category</span>: <span class="hljs-keyword">this</span>.category
    }
  }
}

<span class="hljs-comment">//&#x8C03;&#x7528;&#x5EFA;&#x9020;&#x8005;&#x7C7B;</span>
<span class="hljs-keyword">const</span> book = <span class="hljs-keyword">new</span> BookBuilder()
  .withName(<span class="hljs-string">&quot;&#x9AD8;&#x6548;&#x80FD;&#x4EBA;&#x58EB;&#x7684;&#x4E03;&#x4E2A;&#x4E60;&#x60EF;&quot;</span>)
  .withAuthor(<span class="hljs-string">&apos;&#x53F2;&#x8482;&#x82AC;&#xB7;&#x67EF;&#x7EF4;&apos;</span>)
  .withPrice(<span class="hljs-number">51</span>)
  .withCategory(<span class="hljs-string">&apos;&#x52B1;&#x5FD7;&apos;</span>)
  .build();</code></pre>
<p>&#x4E0A;&#x9762;&#x5C31;&#x901A;&#x8FC7;&#x6211;<code>BookBuilder</code>&#x8FD9;&#x4E2A;&#x521B;&#x5EFA;&#x8005;&#x7C7B;&#x7684;&#x5199;&#x6CD5;&#x548C;&#x8C03;&#x7528;&#x65B9;&#x6CD5;&#xFF0C;&#x4F46;&#x662F;&#x4EC5;&#x4EC5;&#x662F;&#x4E00;&#x4E2A;4&#x4E2A;&#x5C5E;&#x6027;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x4E86;&#x5982;&#x6B64;&#x591A;&#x7684;&#x4EE3;&#x7801;&#x53BB;&#x521B;&#x5EFA;&#xFF0C;&#x8FD9;&#x8FDC;&#x6BD4;&#x76F4;&#x63A5;&#x5728;<code>constructor</code>&#x4F20;&#x9012;&#x53C2;&#x6570;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x8981;&#x590D;&#x6742;&#x5F97;&#x591A;&#x3002;&#x8FD9;&#x662F;&#x7531;&#x4E8E;&#x5728;&#x521B;&#x5EFA;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x6709;&#x592A;&#x591A;&#x7684;<code>withxxxx</code>&#x65B9;&#x6CD5;&#x3002;&#x6211;&#x4EEC;&#x5176;&#x5B9E;&#x53EF;&#x4EE5;&#x81EA;&#x52A8;&#x521B;&#x5EFA;&#x8FD9;&#x7C7B;<code>withxxxx</code>&#x65B9;&#x6CD5;&#x4EE5;&#x7B80;&#x5316;&#x4EE3;&#x7801;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x4E66;&#x7C4D;&#x5EFA;&#x9020;&#x8005;&#x7C7B;
class BookBuilder {
  constructor() {
    this.name = &apos;&apos;;
    this.author = &apos;&apos;;
    this.price = 0;
    this.category = &apos;&apos;;
  
    Object.keys(this).forEach(key =&gt; {
      const withName = `with${key.substring(0, 1).toUpperCase()}${key.substring(1)}`;
      this[withName] = value =&gt; {
        this[key] = value;
        return this;
      }
    })
  }
  
  //&#x8C03;&#x7528;&#x5EFA;&#x9020;&#x8005;
  build() {
    const keysNoWithers = Object.keys(this).filter(key =&gt; typeof this[key] !== &apos;function&apos;);

    return keysNoWithers.reduce((returnValue, key) =&gt; {
      return {
        ...returnValue,
        [key]: this[key]
      }
    }, {})
  }
}

const book = new BookBuilder()
  .withName(&quot;&#x9AD8;&#x6548;&#x80FD;&#x4EBA;&#x58EB;&#x7684;&#x4E03;&#x4E2A;&#x4E60;&#x60EF;&quot;)
  .withAuthor(&apos;&#x53F2;&#x8482;&#x82AC;&#xB7;&#x67EF;&#x7EF4;&apos;)
  .withPrice(51)
  .withCategory(&apos;&#x52B1;&#x5FD7;&apos;)
  .build();" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">//&#x4E66;&#x7C4D;&#x5EFA;&#x9020;&#x8005;&#x7C7B;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BookBuilder</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-keyword">this</span>.author = <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-keyword">this</span>.price = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>.category = <span class="hljs-string">&apos;&apos;</span>;
  
    <span class="hljs-built_in">Object</span>.keys(<span class="hljs-keyword">this</span>).forEach(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> {
      <span class="hljs-keyword">const</span> withName = <span class="hljs-string">`with<span class="hljs-subst">${key.substring(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>).toUpperCase()}</span><span class="hljs-subst">${key.substring(<span class="hljs-number">1</span>)}</span>`</span>;
      <span class="hljs-keyword">this</span>[withName] = <span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>[key] = value;
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
      }
    })
  }
  
  <span class="hljs-comment">//&#x8C03;&#x7528;&#x5EFA;&#x9020;&#x8005;</span>
  build() {
    <span class="hljs-keyword">const</span> keysNoWithers = <span class="hljs-built_in">Object</span>.keys(<span class="hljs-keyword">this</span>).filter(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> <span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span>[key] !== <span class="hljs-string">&apos;function&apos;</span>);

    <span class="hljs-keyword">return</span> keysNoWithers.reduce(<span class="hljs-function">(<span class="hljs-params">returnValue, key</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> {
        ...returnValue,
        [key]: <span class="hljs-keyword">this</span>[key]
      }
    }, {})
  }
}

<span class="hljs-keyword">const</span> book = <span class="hljs-keyword">new</span> BookBuilder()
  .withName(<span class="hljs-string">&quot;&#x9AD8;&#x6548;&#x80FD;&#x4EBA;&#x58EB;&#x7684;&#x4E03;&#x4E2A;&#x4E60;&#x60EF;&quot;</span>)
  .withAuthor(<span class="hljs-string">&apos;&#x53F2;&#x8482;&#x82AC;&#xB7;&#x67EF;&#x7EF4;&apos;</span>)
  .withPrice(<span class="hljs-number">51</span>)
  .withCategory(<span class="hljs-string">&apos;&#x52B1;&#x5FD7;&apos;</span>)
  .build();</code></pre>
<p>&#x4E0A;&#x9762;&#x7684;<code>BookBuilder</code>&#x8FD9;&#x4E2A;&#x7C7B;&#x548C;&#x7B2C;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#x7684;&#x6548;&#x679C;&#x4E00;&#x6837;&#xFF0C;&#x4F46;&#x662F;&#x957F;&#x5EA6;&#x786E;&#x51CF;&#x5C11;&#x4E0D;&#x5C11;&#xFF0C;&#x5728;&#x6709;&#x66F4;&#x591A;&#x5C5E;&#x6027;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x51CF;&#x5C11;&#x7684;&#x4EE3;&#x7801;&#x91CF;&#x4F1A;&#x66F4;&#x4E3A;&#x660E;&#x663E;&#x3002;&#x6211;&#x4EEC;&#x5C06;&#x6240;&#x6709;&#x7684;&#x5EFA;&#x9020;&#x65B9;&#x6CD5;<code>withxxxx</code>&#x5728;<code>constructor</code>&#x8C03;&#x7528;&#x65F6;&#x81EA;&#x52A8;&#x88AB;&#x521B;&#x5EFA;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x4E86;&#x4E00;&#x4E9B;ES6&#x7684;&#x65B0;&#x8BED;&#x6CD5;&#xFF1A;<code>Object.keys</code>&#x83B7;&#x53D6;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x6570;&#x7EC4;&#xFF0C;<code>...</code>&#x7684;&#x5408;&#x5E76;&#x5BF9;&#x8C61;&#x7684;&#x8BED;&#x6CD5;&#x3002;</p>
<p>&#x867D;&#x7136;&#x8BE5;&#x5199;&#x6CD5;&#x5728;&#x9605;&#x8BFB;&#x8D77;&#x6765;&#x4F1A;&#x6BD4;&#x7B2C;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x96BE;&#x4EE5;&#x7406;&#x89E3;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x6837;&#x5199;&#x6CD5;&#x7684;&#x771F;&#x6B63;&#x4F5C;&#x7528;&#x5728;&#x4E8E;&#xFF0C;&#x5F53;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x8BB8;&#x591A;&#x7684;&#x5EFA;&#x9020;&#x8005;&#x7C7B;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5C06;&#x4E0A;&#x9762;&#x81EA;&#x52A8;&#x521B;&#x5EFA;<code>withxxx</code>&#x548C;<code>build</code>&#x7684;&#x4EE3;&#x7801;&#x63D0;&#x53D6;&#x4E3A;&#x4E00;&#x4E2A;&#x7236;&#x7C7B;&#x3002;&#x5728;&#x521B;&#x5EFA;&#x5176;&#x4ED6;&#x5EFA;&#x9020;&#x8005;&#x7C7B;&#x65F6;&#x7EE7;&#x627F;&#x8BE5;&#x7236;&#x7C7B;&#xFF0C;&#x8FD9;&#x4F7F;&#x5F97;&#x5728;&#x521B;&#x5EFA;&#x591A;&#x4E2A;&#x5EFA;&#x9020;&#x8005;&#x7C7B;&#x65F6;&#x53D8;&#x5F97;&#x5341;&#x5206;&#x5BB9;&#x6613;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x7236;&#x7C7B;
class BaseBuilder {
  init() {
    Object.keys(this).forEach(key =&gt; {
      const withName = `with${key.substring(0, 1).toUpperCase()}${key.substring(1)}`;
      this[withName] = value =&gt; {
        this[key] = value;
        return this;
      }
    })
  }

  build() {
    const keysNoWithers = Object.keys(this).filter(key =&gt; typeof this[key] !== &apos;function&apos;);

    return keysNoWithers.reduce((returnValue, key) =&gt; {
      return {
        ...returnValue,
        [key]: this[key]
      }
    }, {})
  }
}

//&#x5B50;&#x7C7B;1: &#x4E66;&#x7C4D;&#x5EFA;&#x9020;&#x8005;&#x7C7B;
class BookBuilder extends BaseBuilder {
  constructor() {
    super();

    this.name = &apos;&apos;;
    this.author = &apos;&apos;;
    this.price = 0;
    this.category = &apos;&apos;;
    
    super.init();
  }
}

//&#x5B50;&#x7C7B;2: &#x5370;&#x5237;&#x5382;&#x5EFA;&#x9020;&#x8005;&#x7C7B;
class printHouseBuilder extends BaseBuilder {
  constructor() {
    super();

    this.name = &apos;&apos;;
    this.location = &apos;&apos;;
    this.quality = &apos;&apos;;

    super.init();
  }
}

//&#x8C03;&#x7528;&#x4E66;&#x7C4D;&#x5EFA;&#x9020;&#x8005;&#x7C7B;
const book = new BookBuilder()
  .withName(&quot;&#x9AD8;&#x6548;&#x80FD;&#x4EBA;&#x58EB;&#x7684;&#x4E03;&#x4E2A;&#x4E60;&#x60EF;&quot;)
  .withAuthor(&apos;&#x53F2;&#x8482;&#x82AC;&#xB7;&#x67EF;&#x7EF4;&apos;)
  .withPrice(51)
  .withCategory(&apos;&#x52B1;&#x5FD7;&apos;)
  .build();


//&#x8C03;&#x7528;&#x5370;&#x5237;&#x5382;&#x5EFA;&#x9020;&#x7C7B;
const printHouse = new printHouseBuilder()
  .withName(&apos;&#x65B0;&#x534E;&#x5370;&#x5237;&#x5382;&apos;)
  .withLocation(&apos;&#x5317;&#x4EAC;&#x6D77;&#x6DC0;&#x533A;&apos;)
  .withQuality(&apos;A&apos;)
  .build();" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">//&#x7236;&#x7C7B;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BaseBuilder</span> </span>{
  init() {
    <span class="hljs-built_in">Object</span>.keys(<span class="hljs-keyword">this</span>).forEach(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> {
      <span class="hljs-keyword">const</span> withName = <span class="hljs-string">`with<span class="hljs-subst">${key.substring(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>).toUpperCase()}</span><span class="hljs-subst">${key.substring(<span class="hljs-number">1</span>)}</span>`</span>;
      <span class="hljs-keyword">this</span>[withName] = <span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>[key] = value;
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
      }
    })
  }

  build() {
    <span class="hljs-keyword">const</span> keysNoWithers = <span class="hljs-built_in">Object</span>.keys(<span class="hljs-keyword">this</span>).filter(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> <span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span>[key] !== <span class="hljs-string">&apos;function&apos;</span>);

    <span class="hljs-keyword">return</span> keysNoWithers.reduce(<span class="hljs-function">(<span class="hljs-params">returnValue, key</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> {
        ...returnValue,
        [key]: <span class="hljs-keyword">this</span>[key]
      }
    }, {})
  }
}

<span class="hljs-comment">//&#x5B50;&#x7C7B;1: &#x4E66;&#x7C4D;&#x5EFA;&#x9020;&#x8005;&#x7C7B;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BookBuilder</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">BaseBuilder</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">super</span>();

    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-keyword">this</span>.author = <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-keyword">this</span>.price = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>.category = <span class="hljs-string">&apos;&apos;</span>;
    
    <span class="hljs-keyword">super</span>.init();
  }
}

<span class="hljs-comment">//&#x5B50;&#x7C7B;2: &#x5370;&#x5237;&#x5382;&#x5EFA;&#x9020;&#x8005;&#x7C7B;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">printHouseBuilder</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">BaseBuilder</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">super</span>();

    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-keyword">this</span>.location = <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-keyword">this</span>.quality = <span class="hljs-string">&apos;&apos;</span>;

    <span class="hljs-keyword">super</span>.init();
  }
}

<span class="hljs-comment">//&#x8C03;&#x7528;&#x4E66;&#x7C4D;&#x5EFA;&#x9020;&#x8005;&#x7C7B;</span>
<span class="hljs-keyword">const</span> book = <span class="hljs-keyword">new</span> BookBuilder()
  .withName(<span class="hljs-string">&quot;&#x9AD8;&#x6548;&#x80FD;&#x4EBA;&#x58EB;&#x7684;&#x4E03;&#x4E2A;&#x4E60;&#x60EF;&quot;</span>)
  .withAuthor(<span class="hljs-string">&apos;&#x53F2;&#x8482;&#x82AC;&#xB7;&#x67EF;&#x7EF4;&apos;</span>)
  .withPrice(<span class="hljs-number">51</span>)
  .withCategory(<span class="hljs-string">&apos;&#x52B1;&#x5FD7;&apos;</span>)
  .build();


<span class="hljs-comment">//&#x8C03;&#x7528;&#x5370;&#x5237;&#x5382;&#x5EFA;&#x9020;&#x7C7B;</span>
<span class="hljs-keyword">const</span> printHouse = <span class="hljs-keyword">new</span> printHouseBuilder()
  .withName(<span class="hljs-string">&apos;&#x65B0;&#x534E;&#x5370;&#x5237;&#x5382;&apos;</span>)
  .withLocation(<span class="hljs-string">&apos;&#x5317;&#x4EAC;&#x6D77;&#x6DC0;&#x533A;&apos;</span>)
  .withQuality(<span class="hljs-string">&apos;A&apos;</span>)
  .build();</code></pre>
<h2 id="articleHeader2">&#x603B;&#x7ED3;</h2>
<p>&#x5728;&#x4E4B;&#x524D;&#x63D0;&#x5230;&#x7684;&#x51E0;&#x79CD;&#x5DE5;&#x5382;&#x6A21;&#x5F0F;&#x4E2D;&#xFF0C;&#x4ED6;&#x4EEC;&#x90FD;&#x6709;&#x4E00;&#x4E2A;&#x5171;&#x540C;&#x7279;&#x70B9;&#xFF0C;&#x5C31;&#x662F;&#x5BF9;&#x8C61;&#x7684;&#x521B;&#x5EFA;&#x8FC7;&#x7A0B;&#x4E0D;&#x5F97;&#x800C;&#x77E5;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x8C03;&#x7528;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x540E;&#x8FD4;&#x56DE;&#x4E86;&#x6700;&#x7EC8;&#x7684;&#x7ED3;&#x679C;&#x5BF9;&#x8C61;&#x3002;&#x4F46;&#x662F;&#x5728;&#x521B;&#x5EFA;&#x8005;&#x6A21;&#x5F0F;&#x4E2D;&#x6211;&#x4EEC;&#x5173;&#x5FC3;&#x7684;&#x662F;&#x5BF9;&#x8C61;&#x7684;&#x521B;&#x5EFA;&#x8FC7;&#x7A0B;&#xFF0C;&#x6211;&#x4EEC;&#x901A;&#x5E38;&#x5C06;&#x521B;&#x5EFA;&#x590D;&#x6742;&#x5BF9;&#x8C61;&#x7684;&#x5404;&#x4E2A;&#x7C7B;&#x6A21;&#x5757;&#x5316;&#xFF0C;&#x5728;ES6&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x91C7;&#x7528;<code>import</code>&#x548C;<code>export</code>&#x7684;&#x8BED;&#x6CD5;&#x53EF;&#x4EE5;&#x5F88;&#x7075;&#x6D3B;&#x7684;&#x5F15;&#x7528;&#x548C;&#x5BFC;&#x51FA;&#x8FD9;&#x4E9B;&#x6A21;&#x5757;&#x8FDB;&#x884C;&#x6211;&#x4EEC;&#x7684;&#x5EFA;&#x9020;&#x6A21;&#x5F0F;&#x6700;&#x7EC8;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x7ED3;&#x679C;&#x5BF9;&#x8C61;&#x3002;</p>
<p>&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;&#x5EFA;&#x9020;&#x8005;&#x6A21;&#x5F0F;&#x7684;&#x4F7F;&#x7528;&#x6709;&#x4E14;&#x53EA;&#x9002;&#x5408;&#x521B;&#x5EFA;&#x6781;&#x4E3A;&#x590D;&#x6742;&#x7684;&#x5BF9;&#x8C61;&#x3002;&#x5728;&#x524D;&#x7AEF;&#x7684;&#x5B9E;&#x9645;&#x4E1A;&#x52A1;&#x4E2D;&#xFF0C;&#x5728;&#x6CA1;&#x6709;&#x8FD9;&#x7C7B;&#x6781;&#x4E3A;&#x590D;&#x6742;&#x7684;&#x5BF9;&#x8C61;&#x7684;&#x521B;&#x5EFA;&#x65F6;&#xFF0C;&#x8FD8;&#x662F;&#x5E94;&#x8BE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x5BF9;&#x8C61;&#x5B57;&#x9762;&#x6216;&#x5DE5;&#x5382;&#x6A21;&#x5F0F;&#x7B49;&#x65B9;&#x5F0F;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x3002;</p>
<hr>
<blockquote>&#x53C2;&#x8003;&#x5185;&#x5BB9;: <br>[1]  <a href="http://ryanogles.by/an-exploration-of-javascript-builders/" rel="nofollow noreferrer" target="_blank">An Exploration of JavaScript Builders</a> &#x2014;&#x2014; Ryan Oglesby<br>[2] &#x300A; JavaScript&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F; &#x300B;&#x2014;&#x2014; &#x5F20;&#x5BB9;&#x94ED;</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从ES6重新认识JavaScript设计模式(三): 建造者模式

## 原文链接
[https://segmentfault.com/a/1190000015147687](https://segmentfault.com/a/1190000015147687)

