---
title: '从Vue数组响应化所引发的思考' 
date: 2018-11-28 2:30:10
hidden: true
slug: 626rrmsnl9l
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x3000;&#x3000;&#x9996;&#x5148;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x5173;&#x6CE8;&#x6211;&#x7684;<a href="https://github.com/MrErHu/blog" rel="nofollow noreferrer" target="_blank">Github&#x535A;&#x5BA2;</a>&#xFF0C;&#x4E5F;&#x7B97;&#x662F;&#x5BF9;&#x6211;&#x7684;&#x4E00;&#x70B9;&#x9F13;&#x52B1;&#xFF0C;&#x6BD5;&#x7ADF;&#x5199;&#x4E1C;&#x897F;&#x6CA1;&#x6CD5;&#x83B7;&#x5F97;&#x53D8;&#x73B0;&#xFF0C;&#x80FD;&#x575A;&#x6301;&#x4E0B;&#x53BB;&#x4E5F;&#x662F;&#x9760;&#x7684;&#x662F;&#x81EA;&#x5DF1;&#x7684;&#x70ED;&#x60C5;&#x548C;&#x5927;&#x5BB6;&#x7684;&#x9F13;&#x52B1;&#x3002;</p><p>&#x3000;&#x3000;&#x4ECE;&#x4E0A;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;<a href="https://github.com/MrErHu/blog/issues/28" rel="nofollow noreferrer" target="_blank">&#x54CD;&#x5E94;&#x5F0F;&#x6570;&#x636E;&#x4E0E;&#x6570;&#x636E;&#x4F9D;&#x8D56;&#x57FA;&#x672C;&#x539F;&#x7406;</a>&#x5F00;&#x59CB;&#xFF0C;&#x6211;&#x5C31;&#x840C;&#x53D1;&#x4E86;&#x60F3;&#x8981;&#x7814;&#x7A76;Vue&#x6E90;&#x7801;&#x7684;&#x60F3;&#x6CD5;&#x3002;&#x6700;&#x8FD1;&#x770B;&#x4E86;youngwind&#x7684;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;<a href="https://github.com/youngwind/blog/issues/85" rel="nofollow noreferrer" target="_blank">&#x5982;&#x4F55;&#x76D1;&#x542C;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x7684;&#x53D8;&#x5316;</a>&#x53D1;&#x73B0;Vue&#x65E9;&#x671F;&#x5B9E;&#x73B0;&#x76D1;&#x542C;&#x6570;&#x7EC4;&#x7684;&#x65B9;&#x5F0F;&#x548C;&#x6211;&#x7684;&#x5B9E;&#x73B0;&#x7A0D;&#x6709;&#x533A;&#x522B;&#x3002;&#x5E76;&#x4E14;&#x5728;&#x4E24;&#x5E74;&#x524D;&#x4F5C;&#x8005;&#x5BF9;&#x5176;&#x4E2D;&#x7684;&#x4E00;&#x4E9B;&#x4EE3;&#x7801;&#x7684;&#x7406;&#x89E3;&#x6709;&#x8BEF;&#xFF0C;&#x5728;&#x9605;&#x8BFB;&#x5B8C;&#x8BC4;&#x8BBA;&#x4E2D;@Ma63d&#x7684;<a href="https://github.com/youngwind/blog/issues/85#issuecomment-284974136" rel="nofollow noreferrer" target="_blank">&#x8BC4;&#x8BBA;</a>&#x4E4B;&#x540E;&#xFF0C;&#x611F;&#x89C9;&#x6536;&#x76CA;&#x532A;&#x6D45;&#x3002;</p><h2 id="articleHeader1">Vue&#x5B9E;&#x73B0;&#x6570;&#x636E;&#x76D1;&#x542C;&#x7684;&#x65B9;&#x5F0F;</h2><p>&#x3000;&#x3000;&#x5728;&#x6211;&#x4EEC;&#x7684;&#x4E0A;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x60F3;&#x5C1D;&#x8BD5;&#x76D1;&#x542C;&#x6570;&#x7EC4;&#x53D8;&#x5316;&#xFF0C;&#x91C7;&#x7528;&#x7684;&#x662F;&#x4E0B;&#x9762;&#x7684;&#x601D;&#x8DEF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function observifyArray(array){
  //&#x9700;&#x8981;&#x53D8;&#x5F02;&#x7684;&#x51FD;&#x6570;&#x540D;&#x5217;&#x8868;
  var methods = [&apos;push&apos;, &apos;pop&apos;, &apos;shift&apos;, &apos;unshift&apos;, &apos;splice&apos;, &apos;sort&apos;, &apos;reverse&apos;];
  var arrayProto = Object.create(Array.prototype);
  _.each(methods, function(method){
    arrayProto[method] = function(...args){
      // &#x52AB;&#x6301;&#x4FEE;&#x6539;&#x6570;&#x636E;
      var ret = Array.prototype[method].apply(this, args);
      //&#x53EF;&#x4EE5;&#x5728;&#x4FEE;&#x6539;&#x6570;&#x636E;&#x65F6;&#x89E6;&#x53D1;&#x5176;&#x4ED6;&#x7684;&#x64CD;&#x4F5C;
      console.log(&quot;newValue: &quot;, this);
      return ret;
    }
  });
  Object.setPrototypeOf(array, arrayProto);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">observifyArray</span>(<span class="hljs-params">array</span>)</span>{
  <span class="hljs-comment">//&#x9700;&#x8981;&#x53D8;&#x5F02;&#x7684;&#x51FD;&#x6570;&#x540D;&#x5217;&#x8868;</span>
  <span class="hljs-keyword">var</span> methods = [<span class="hljs-string">&apos;push&apos;</span>, <span class="hljs-string">&apos;pop&apos;</span>, <span class="hljs-string">&apos;shift&apos;</span>, <span class="hljs-string">&apos;unshift&apos;</span>, <span class="hljs-string">&apos;splice&apos;</span>, <span class="hljs-string">&apos;sort&apos;</span>, <span class="hljs-string">&apos;reverse&apos;</span>];
  <span class="hljs-keyword">var</span> arrayProto = <span class="hljs-built_in">Object</span>.create(<span class="hljs-built_in">Array</span>.prototype);
  _.each(methods, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">method</span>)</span>{
    arrayProto[method] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">...args</span>)</span>{
      <span class="hljs-comment">// &#x52AB;&#x6301;&#x4FEE;&#x6539;&#x6570;&#x636E;</span>
      <span class="hljs-keyword">var</span> ret = <span class="hljs-built_in">Array</span>.prototype[method].apply(<span class="hljs-keyword">this</span>, args);
      <span class="hljs-comment">//&#x53EF;&#x4EE5;&#x5728;&#x4FEE;&#x6539;&#x6570;&#x636E;&#x65F6;&#x89E6;&#x53D1;&#x5176;&#x4ED6;&#x7684;&#x64CD;&#x4F5C;</span>
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;newValue: &quot;</span>, <span class="hljs-keyword">this</span>);
      <span class="hljs-keyword">return</span> ret;
    }
  });
  <span class="hljs-built_in">Object</span>.setPrototypeOf(array, arrayProto);
}</code></pre><p>&#x3000;&#x3000;&#x6211;&#x4EEC;&#x662F;&#x901A;&#x8FC7;&#x4E3A;&#x6570;&#x7EC4;&#x5B9E;&#x4F8B;&#x8BBE;&#x7F6E;&#x539F;&#x578B;<code>prototype</code>&#x6765;&#x5B9E;&#x73B0;&#xFF0C;&#x65B0;&#x7684;<code>prototype</code>&#x91CD;&#x5199;&#x4E86;&#x539F;&#x751F;&#x6570;&#x7EC4;&#x539F;&#x578B;&#x7684;&#x90E8;&#x5206;&#x65B9;&#x6CD5;&#x3002;&#x56E0;&#x6B64;&#x5728;&#x8C03;&#x7528;&#x4E0A;&#x9762;&#x7684;&#x51E0;&#x4E2A;&#x53D8;&#x5F02;&#x65B9;&#x6CD5;&#x7684;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x4F1A;&#x5F97;&#x5230;&#x76F8;&#x5E94;&#x7684;&#x901A;&#x77E5;&#x3002;&#x4F46;&#x5176;&#x5B9E;<code>setPrototypeOf</code>&#x65B9;&#x6CD5;&#x662F;ECMAScript 6&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x80AF;&#x5B9A;&#x4E0D;&#x662F;Vue&#x5185;&#x90E8;&#x53EF;&#x9009;&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x6848;&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5927;&#x81F4;&#x770B;&#x770B;Vue&#x7684;&#x5B9E;&#x73B0;<strong>&#x601D;&#x8DEF;</strong>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function observifyArray(array){
    var aryMethods = [&apos;push&apos;, &apos;pop&apos;, &apos;shift&apos;, &apos;unshift&apos;, &apos;splice&apos;, &apos;sort&apos;, &apos;reverse&apos;];
    var arrayAugmentations = Object.create(Array.prototype);
    
    aryMethods.forEach((method)=&gt; {
    
        // &#x8FD9;&#x91CC;&#x662F;&#x539F;&#x751F;Array&#x7684;&#x539F;&#x578B;&#x65B9;&#x6CD5;
        let original = Array.prototype[method];
       // &#x5C06;push, pop&#x7B49;&#x5C01;&#x88C5;&#x597D;&#x7684;&#x65B9;&#x6CD5;&#x5B9A;&#x4E49;&#x5728;&#x5BF9;&#x8C61;arrayAugmentations&#x7684;&#x5C5E;&#x6027;&#x4E0A;
       // &#x6CE8;&#x610F;&#xFF1A;&#x662F;&#x5C5E;&#x6027;&#x800C;&#x975E;&#x539F;&#x578B;&#x5C5E;&#x6027;
        arrayAugmentations[method] = function () {
            console.log(&apos;&#x6211;&#x88AB;&#x6539;&#x53D8;&#x5566;!&apos;);
            // &#x8C03;&#x7528;&#x5BF9;&#x5E94;&#x7684;&#x539F;&#x751F;&#x65B9;&#x6CD5;&#x5E76;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;
            return original.apply(this, arguments);
        };
    });
    array.__proto__ = arrayAugmentations;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">observifyArray</span>(<span class="hljs-params">array</span>)</span>{
    <span class="hljs-keyword">var</span> aryMethods = [<span class="hljs-string">&apos;push&apos;</span>, <span class="hljs-string">&apos;pop&apos;</span>, <span class="hljs-string">&apos;shift&apos;</span>, <span class="hljs-string">&apos;unshift&apos;</span>, <span class="hljs-string">&apos;splice&apos;</span>, <span class="hljs-string">&apos;sort&apos;</span>, <span class="hljs-string">&apos;reverse&apos;</span>];
    <span class="hljs-keyword">var</span> arrayAugmentations = <span class="hljs-built_in">Object</span>.create(<span class="hljs-built_in">Array</span>.prototype);
    
    aryMethods.forEach(<span class="hljs-function">(<span class="hljs-params">method</span>)=&gt;</span> {
    
        <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x662F;&#x539F;&#x751F;Array&#x7684;&#x539F;&#x578B;&#x65B9;&#x6CD5;</span>
        <span class="hljs-keyword">let</span> original = <span class="hljs-built_in">Array</span>.prototype[method];
       <span class="hljs-comment">// &#x5C06;push, pop&#x7B49;&#x5C01;&#x88C5;&#x597D;&#x7684;&#x65B9;&#x6CD5;&#x5B9A;&#x4E49;&#x5728;&#x5BF9;&#x8C61;arrayAugmentations&#x7684;&#x5C5E;&#x6027;&#x4E0A;</span>
       <span class="hljs-comment">// &#x6CE8;&#x610F;&#xFF1A;&#x662F;&#x5C5E;&#x6027;&#x800C;&#x975E;&#x539F;&#x578B;&#x5C5E;&#x6027;</span>
        arrayAugmentations[method] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x6211;&#x88AB;&#x6539;&#x53D8;&#x5566;!&apos;</span>);
            <span class="hljs-comment">// &#x8C03;&#x7528;&#x5BF9;&#x5E94;&#x7684;&#x539F;&#x751F;&#x65B9;&#x6CD5;&#x5E76;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;</span>
            <span class="hljs-keyword">return</span> original.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
        };
    });
    array.__proto__ = arrayAugmentations;
}</code></pre><p>&#x3000;&#x3000;<code>__proto__</code>&#x662F;&#x6211;&#x4EEC;&#x5927;&#x5BB6;&#x7684;&#x975E;&#x5E38;&#x719F;&#x6089;&#x7684;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x5176;&#x6307;&#x5411;&#x7684;&#x662F;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x5BF9;&#x5E94;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x3002;&#x5728;ES5&#x4E2D;&#xFF0C;&#x5404;&#x4E2A;&#x5B9E;&#x4F8B;&#x4E2D;&#x5B58;&#x5728;&#x4E00;&#x4E2A;&#x5185;&#x90E8;&#x5C5E;&#x6027;<code>[[Prototype]]</code>&#x6307;&#x5411;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x5BF9;&#x5E94;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#xFF0C;&#x4F46;&#x662F;&#x5185;&#x90E8;&#x5C5E;&#x6027;&#x662F;&#x6CA1;&#x6CD5;&#x8BBF;&#x95EE;&#x7684;&#x3002;&#x6D4F;&#x89C8;&#x5668;&#x5404;&#x5BB6;&#x5382;&#x5546;&#x90FD;&#x652F;&#x6301;&#x975E;&#x6807;&#x51C6;&#x5C5E;&#x6027;<code>__proto__</code>&#x3002;&#x5176;&#x5B9E;Vue&#x7684;&#x5B9E;&#x73B0;&#x601D;&#x8DEF;&#x4E0E;&#x6211;&#x4EEC;&#x7684;&#x975E;&#x5E38;&#x76F8;&#x4F3C;&#x3002;&#x552F;&#x4E00;&#x4E0D;&#x540C;&#x7684;&#x662F;Vue&#x4F7F;&#x7528;&#x4E86;&#x7684;&#x975E;&#x6807;&#x51C6;&#x5C5E;&#x6027;<code>__proto__</code>&#x3002;</p><p>&#x3000;&#x3000;&#x5176;&#x5B9E;&#x9605;&#x8BFB;&#x8FC7;&#x300A;JavaScript&#x9AD8;&#x7EA7;&#x7A0B;&#x5E8F;&#x8BBE;&#x8BA1;&#x300B;&#x7684;&#x540C;&#x5B66;&#x5E94;&#x8BE5;&#x8FD8;&#x8BB0;&#x5F97;&#x539F;&#x578B;&#x5F0F;&#x7EE7;&#x627F;&#x3002;&#x5176;&#x91CD;&#x8981;&#x601D;&#x8DEF;&#x5C31;&#x662F;&#x501F;&#x52A9;&#x539F;&#x578B;&#x53EF;&#x4EE5;&#x57FA;&#x4E8E;&#x5DF2;&#x6709;&#x7684;&#x5BF9;&#x8C61;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x3002;&#x6BD4;&#x5982;&#x8BF4;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function object(o){
    function F(){}
    F.prototype = o;
    return new F();
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">object</span>(<span class="hljs-params">o</span>)</span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">F</span>(<span class="hljs-params"></span>)</span>{}
    F.prototype = o;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> F();
}</code></pre><p>&#x3000;&#x3000;&#x5176;&#x5B9E;&#x6211;&#x4EEC;&#x4E0A;&#x9762;Vue&#x7684;&#x601D;&#x8DEF;&#x4E5F;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x501F;&#x52A9;&#x539F;&#x578B;&#x521B;&#x5EFA;&#x7684;&#x57FA;&#x4E8E;arrayAugmentations&#x7684;&#x65B0;&#x5B9E;&#x4F8B;&#xFF0C;&#x4F7F;&#x5F97;&#x5B9E;&#x4F8B;&#x80FD;&#x591F;&#x8BBF;&#x95EE;&#x5230;&#x6211;&#x4EEC;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x53D8;&#x5F02;&#x65B9;&#x6CD5;&#x3002;</p><p>&#x3000;&#x3000;&#x4E0A;&#x9762;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x7684;&#x4F5C;&#x8005;youngwind&#x5199;&#x6587;&#x7AE0;&#x7684;&#x65F6;&#x5019;&#x5C31;&#x63D0;&#x51FA;&#x4E86;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x53BB;&#x91C7;&#x7528;&#x66F4;&#x4E3A;&#x5E38;&#x89C1;&#x7684;&#x7EC4;&#x5408;&#x5F0F;&#x7EE7;&#x627F;&#x53BB;&#x5B9E;&#x73B0;&#xFF0C;&#x6BD4;&#x5982;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function FakeArray() {
    Array.apply(this,arguments);
}

FakeArray.prototype = [];
FakeArray.prototype.constructor = FakeArray;

FakeArray.prototype.push = function () {
    console.log(&apos;&#x6211;&#x88AB;&#x6539;&#x53D8;&#x5566;&apos;);
    return Array.prototype.push.apply(this,arguments);
};

let list = [&apos;a&apos;,&apos;b&apos;,&apos;c&apos;];

let fakeList = new FakeArray(list);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">FakeArray</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">Array</span>.apply(<span class="hljs-keyword">this</span>,<span class="hljs-built_in">arguments</span>);
}

FakeArray.prototype = [];
FakeArray.prototype.constructor = FakeArray;

FakeArray.prototype.push = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x6211;&#x88AB;&#x6539;&#x53D8;&#x5566;&apos;</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.prototype.push.apply(<span class="hljs-keyword">this</span>,<span class="hljs-built_in">arguments</span>);
};

<span class="hljs-keyword">let</span> list = [<span class="hljs-string">&apos;a&apos;</span>,<span class="hljs-string">&apos;b&apos;</span>,<span class="hljs-string">&apos;c&apos;</span>];

<span class="hljs-keyword">let</span> fakeList = <span class="hljs-keyword">new</span> FakeArray(list);</code></pre><p>&#x3000;&#x3000;&#x7ED3;&#x679C;&#x53D1;&#x73B0;<code>fakeList</code>&#x5E76;&#x4E0D;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x800C;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x4F5C;&#x8005;&#x5F53;&#x65F6;&#x8FD9;&#x8FD9;&#x6837;&#x8BA4;&#x4E3A;&#x7684;:</p><blockquote>&#x6784;&#x9020;&#x51FD;&#x6570;&#x9ED8;&#x8BA4;&#x8FD4;&#x56DE;&#x7684;&#x672C;&#x6765;&#x5C31;&#x662F;this&#x5BF9;&#x8C61;&#xFF0C;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x800C;&#x975E;&#x6570;&#x7EC4;&#x3002;Array.apply(this,arguments);&#x8FD9;&#x4E2A;&#x8BED;&#x53E5;&#x8FD4;&#x56DE;&#x7684;&#x624D;&#x662F;&#x6570;&#x7EC4;<p>&#x6211;&#x4EEC;&#x80FD;&#x4E0D;&#x80FD;&#x5C06;Array.apply(this,arguments);&#x76F4;&#x63A5;return&#x51FA;&#x6765;&#x5462;?</p><p>&#x5982;&#x679C;&#x6211;&#x4EEC;return&#x8FD9;&#x4E2A;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x8FD9;&#x4E2A;&#x6570;&#x7EC4;&#x662F;&#x7531;&#x539F;&#x751F;&#x7684;Array&#x6784;&#x9020;&#x51FA;&#x6765;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5B83;&#x7684;push&#x7B49;&#x65B9;&#x6CD5;&#x4F9D;&#x7136;&#x662F;&#x539F;&#x751F;&#x6570;&#x7EC4;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x65E0;&#x6CD5;&#x5230;&#x8FBE;&#x91CD;&#x5199;&#x7684;&#x76EE;&#x7684;&#x3002;</p></blockquote><p>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x77E5;&#x9053;&#x91C7;&#x7528;<code>new</code>&#x64CD;&#x4F5C;&#x7B26;&#x8C03;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4F1A;&#x4F9D;&#x6B21;&#x7ECF;&#x5386;&#x4EE5;&#x4E0B;&#x56DB;&#x4E2A;&#x6B65;&#x9AA4;:</p><ol><li>&#x521B;&#x5EFA;&#x65B0;&#x5BF9;&#x8C61;</li><li>&#x5C06;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x7ED9;&#x5BF9;&#x8C61;(&#x56E0;&#x6B64;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#x7684;this&#x6307;&#x5411;&#x8FD9;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;)</li><li>&#x6267;&#x884C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x4EE3;&#x7801;</li><li>&#x8FD4;&#x56DE;&#x65B0;&#x5BF9;&#x8C61;(&#x5982;&#x679C;&#x6CA1;&#x6709;&#x663E;&#x5F0F;&#x8FD4;&#x56DE;&#x7684;&#x60C5;&#x51B5;&#x4E0B;)</li></ol><p>&#x3000;&#x3000;&#x5728;&#x6CA1;&#x6709;&#x663E;&#x5F0F;&#x8FD4;&#x56DE;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x65B0;&#x5BF9;&#x8C61;&#xFF0C;&#x56E0;&#x6B64;<code>fakeList</code>&#x662F;&#x5BF9;&#x8C61;&#x800C;&#x4E0D;&#x662F;&#x6570;&#x7EC4;&#x3002;&#x4F46;&#x662F;&#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x80FD;&#x5F3A;&#x5236;&#x8FD4;&#x56DE;<code>Array.apply(this,arguments)</code>&#x3002;&#x5176;&#x5B9E;&#x4E0B;&#x9762;&#x6709;&#x4EBA;&#x8BF4;&#x4F5C;&#x8005;&#x8FD9;&#x53E5;&#x8BDD;&#x6709;&#x95EE;&#x9898;</p><blockquote>&#x8FD9;&#x4E2A;&#x6570;&#x7EC4;&#x662F;&#x7531;&#x539F;&#x751F;&#x7684;Array&#x6784;&#x9020;&#x51FA;&#x6765;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5B83;&#x7684;push&#x7B49;&#x65B9;&#x6CD5;&#x4F9D;&#x7136;&#x662F;&#x539F;&#x751F;&#x6570;&#x7EC4;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x65E0;&#x6CD5;&#x5230;&#x8FBE;&#x91CD;&#x5199;&#x7684;&#x76EE;&#x7684;&#x3002;</blockquote><p>&#x3000;&#x3000;&#x5176;&#x5B9E;&#x4E0A;&#x9762;&#x8FD9;&#x53E5;&#x8BDD;&#x672C;&#x8EAB;&#x786E;&#x5B9E;&#x6CA1;&#x6709;&#x9519;&#x8BEF;&#xFF0C;&#x5F53;&#x6211;&#x4EEC;&#x7ED9;&#x6784;&#x9020;&#x51FD;&#x6570;&#x663E;&#x5F0F;&#x8FD4;&#x56DE;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x5F97;&#x5230;&#x7684;<code>fakeList</code>&#x5C31;&#x662F;&#x539F;&#x751F;&#x7684;&#x6570;&#x7EC4;&#x3002;&#x56E0;&#x6B64;&#x8C03;&#x7528;<code>push</code>&#x65B9;&#x6CD5;&#x662F;&#x6CA1;&#x6CD5;&#x89C2;&#x6D4B;&#x5230;&#x7684;&#x3002;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x4E0D;&#x80FD;&#x8FD4;&#x56DE;&#x7684;<code>Array.apply(this,arguments)</code>&#x66F4;&#x6DF1;&#x5C42;&#x7684;&#x539F;&#x56E0;&#x5728;&#x4E8E;&#x6211;&#x4EEC;&#x8FD9;&#x8FB9;&#x8C03;&#x7528;<code>Array.apply(this,arguments)</code>&#x7684;&#x76EE;&#x7684;&#x662F;&#x4E3A;&#x4E86;&#x501F;&#x7528;&#x539F;&#x751F;&#x7684;<code>Array</code>&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x5C06;<code>Array</code>&#x5C5E;&#x6027;&#x8D4B;&#x503C;&#x5230;&#x5F53;&#x524D;&#x5BF9;&#x8C61;&#x4E0A;&#x3002;</p><p>&#x4E3E;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Father(){
 this.name = &quot;Father&quot;;
}

Father.prototype.sayName = function(){
 console.log(&quot;name: &quot;, this.name);
}

function Son(){
 Father.apply(this);
 this.age = 100;
}

Son.prototype = new Father();
Son.prototype.constructor = Son;
Son.prototype.sayAge = function(){
 console.log(&quot;age: &quot;, this.age);
}


var instance = new Son();
instance.sayName(); //name:  Father
instance.sayAge(); //age:  100" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Father</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&quot;Father&quot;</span>;
}

Father.prototype.sayName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;name: &quot;</span>, <span class="hljs-keyword">this</span>.name);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Son</span>(<span class="hljs-params"></span>)</span>{
 Father.apply(<span class="hljs-keyword">this</span>);
 <span class="hljs-keyword">this</span>.age = <span class="hljs-number">100</span>;
}

Son.prototype = <span class="hljs-keyword">new</span> Father();
Son.prototype.constructor = Son;
Son.prototype.sayAge = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;age: &quot;</span>, <span class="hljs-keyword">this</span>.age);
}


<span class="hljs-keyword">var</span> instance = <span class="hljs-keyword">new</span> Son();
instance.sayName(); <span class="hljs-comment">//name:  Father</span>
instance.sayAge(); <span class="hljs-comment">//age:  100</span></code></pre><p>&#x3000;&#x3000;&#x5B50;&#x7C7B;<code>Son</code>&#x4E3A;&#x4E86;&#x7EE7;&#x627F;&#x7236;&#x7C7B;<code>Father</code>&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x4E24;&#x6B21;&#x8C03;&#x7528;<code>Father</code>&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;<code>Father.apply(this)</code>&#x5C31;&#x662F;&#x4E3A;&#x4E86;&#x521B;&#x5EFA;&#x7236;&#x7C7B;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x800C;<code>Son.prototype = new Father();</code>&#x76EE;&#x7684;&#x5C31;&#x662F;&#x4E3A;&#x4E86;&#x901A;&#x8FC7;&#x539F;&#x578B;&#x94FE;&#x7EE7;&#x627F;&#x7236;&#x7C7B;&#x7684;&#x65B9;&#x6CD5;&#x3002;&#x56E0;&#x6B64;&#x4E0A;&#x9762;&#x6240;&#x8BF4;&#x7684;&#x624D;&#x662F;&#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x80FD;&#x5C06;<code>Array.apply(this,arguments)</code>&#x5F3A;&#x5236;&#x8FD4;&#x56DE;&#x7684;&#x539F;&#x56E0;&#xFF0C;&#x5B83;&#x7684;&#x76EE;&#x7684;&#x5C31;&#x662F;&#x501F;&#x7528;&#x539F;&#x751F;&#x7684;<code>Array</code>&#x6784;&#x9020;&#x51FD;&#x6570;&#x521B;&#x5EFA;&#x5BF9;&#x5E94;&#x7684;&#x5C5E;&#x6027;&#x3002;</p><p>&#x3000;&#x3000;&#x4F46;&#x662F;&#x95EE;&#x9898;&#x6765;&#x4E86;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x65E0;&#x6CD5;&#x501F;&#x7528;&#x539F;&#x751F;&#x7684;<code>Array</code>&#x6784;&#x9020;&#x51FD;&#x6570;&#x521B;&#x5EFA;&#x5BF9;&#x8C61;&#x5462;&#xFF1F;&#x5B9E;&#x9645;&#x4E0A;&#x4E0D;&#x4EC5;&#x4EC5;&#x662F;<code>Array</code>,<code>String</code>&#x3001;<code>Number</code>&#x3001;<code>Regexp</code>&#x3001;<code>Object</code>&#x7B49;&#x7B49;JavaScript&#x7684;&#x5185;&#x7F6E;&#x7C7B;&#x90FD;&#x4E0D;&#x80FD;&#x901A;&#x8FC7;&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x65B9;&#x5F0F;&#x521B;&#x5EFA;&#x5E26;&#x6709;&#x529F;&#x80FD;&#x7684;&#x5C5E;&#x6027;(&#x4F8B;&#x5982;: <code>length</code>)&#x3002;JavaScript&#x6570;&#x7EC4;&#x4E2D;&#x6709;&#x4E00;&#x4E2A;&#x7279;&#x6B8A;&#x7684;&#x54CD;&#x5E94;&#x5F0F;&#x5C5E;&#x6027;<code>length</code>&#xFF0C;&#x4E00;&#x65B9;&#x9762;&#x5982;&#x679C;&#x6570;&#x7EC4;&#x6570;&#x503C;&#x7C7B;&#x578B;&#x4E0B;&#x6807;&#x7684;&#x6570;&#x636E;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x5728;<code>length</code>&#x4E0A;&#x4F53;&#x73B0;&#xFF0C;&#x53E6;&#x4E00;&#x65B9;&#x9762;&#xFF0C;&#x4FEE;&#x6539;<code>length</code>&#x4E5F;&#x4F1A;&#x5F71;&#x54CD;&#x5230;&#x6570;&#x7EC4;&#x7684;&#x6570;&#x503C;&#x6570;&#x636E;&#x3002;&#x56E0;&#x4E3A;&#x65E0;&#x6CD5;&#x901A;&#x8FC7;&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x65B9;&#x5F0F;&#x521B;&#x5EFA;&#x54CD;&#x5E94;&#x5F0F;<code>length</code>&#x5C5E;&#x6027;&#xFF08;&#x867D;&#x7136;&#x5C5E;&#x6027;&#x53EF;&#x4EE5;&#x88AB;&#x521B;&#x5EFA;&#xFF0C;&#x4F46;&#x4E0D;&#x5177;&#x5907;&#x54CD;&#x5E94;&#x5F0F;&#x529F;&#x80FD;&#xFF09;&#xFF0C;&#x56E0;&#x6B64;&#x5728;E55&#x6211;&#x4EEC;&#x662F;&#x6CA1;&#x6CD5;&#x7EE7;&#x627F;&#x6570;&#x7EC4;&#x7684;&#x3002;&#x6BD4;&#x5982;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function MyArray(){
    Array.apply(this, arguments);
}

MyArray.prototype = Object.create(Array.prototype, {
    constructor: {
        value: MyArray,
        writable: true,
        configurable: true,
        enumerable: true
    }
});

var colors = new MyArray();
colors[0] = &quot;red&quot;; 
console.log(colors.length); // 0

colors.length = 0;
console.log(colors[0]); //&quot;red&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyArray</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">Array</span>.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
}

MyArray.prototype = <span class="hljs-built_in">Object</span>.create(<span class="hljs-built_in">Array</span>.prototype, {
    <span class="hljs-attr">constructor</span>: {
        <span class="hljs-attr">value</span>: MyArray,
        <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>
    }
});

<span class="hljs-keyword">var</span> colors = <span class="hljs-keyword">new</span> MyArray();
colors[<span class="hljs-number">0</span>] = <span class="hljs-string">&quot;red&quot;</span>; 
<span class="hljs-built_in">console</span>.log(colors.length); <span class="hljs-comment">// 0</span>

colors.length = <span class="hljs-number">0</span>;
<span class="hljs-built_in">console</span>.log(colors[<span class="hljs-number">0</span>]); <span class="hljs-comment">//&quot;red&quot;</span></code></pre><p>&#x3000;&#x3000;&#x597D;&#x5728;&#x6211;&#x4EEC;&#x8FCE;&#x6765;ES6&#x7684;&#x66D9;&#x5149;&#xFF0C;&#x901A;&#x8FC7;&#x7C7B;class&#x7684;extends&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#x539F;&#x751F;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyArray extends Array {
}

var colors = new MyArray();
colors[0] = &quot;red&quot;;
console.log(colors.length); // 0

colors.length = 0;
cosole.log(colors[0]); // undefined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyArray</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Array</span> </span>{
}

<span class="hljs-keyword">var</span> colors = <span class="hljs-keyword">new</span> MyArray();
colors[<span class="hljs-number">0</span>] = <span class="hljs-string">&quot;red&quot;</span>;
<span class="hljs-built_in">console</span>.log(colors.length); <span class="hljs-comment">// 0</span>

colors.length = <span class="hljs-number">0</span>;
cosole.log(colors[<span class="hljs-number">0</span>]); <span class="hljs-comment">// undefined</span></code></pre><p>&#x3000;&#x3000;&#x4E3A;&#x4EC0;&#x4E48;ES6&#x7684;extends&#x53EF;&#x4EE5;&#x505A;&#x5230;ES5&#x6240;&#x4E0D;&#x80FD;&#x5B9E;&#x73B0;&#x7684;&#x6570;&#x7EC4;&#x7EE7;&#x627F;&#x5462;&#xFF1F;&#x8FD9;&#x662F;&#x7531;&#x4E8E;&#x4E8C;&#x8005;&#x7684;&#x7EE7;&#x627F;&#x539F;&#x7406;&#x4E0D;&#x540C;&#x5BFC;&#x81F4;&#x7684;&#x3002;ES5&#x7684;&#x7EE7;&#x627F;&#x65B9;&#x5F0F;&#x4E2D;&#xFF0C;&#x5148;&#x662F;&#x751F;&#x6210;&#x6D3E;&#x751F;&#x7C7B;&#x578B;&#x7684;<code>this</code>(&#x4F8B;&#x5982;&#xFF1A;MyArray)&#xFF0C;&#x7136;&#x540E;&#x8C03;&#x7528;&#x57FA;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;(&#x4F8B;&#x5982;&#xFF1A;Array.apply(this))&#xFF0C;&#x8FD9;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;<code>this</code>&#x9996;&#x5148;&#x6307;&#x5411;&#x7684;&#x662F;&#x6D3E;&#x751F;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x7136;&#x540E;&#x6307;&#x5411;&#x7684;&#x662F;&#x57FA;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x3002;&#x7531;&#x4E8E;&#x539F;&#x751F;&#x5BF9;&#x8C61;(&#x4F8B;&#x5982;: Array)&#x901A;&#x8FC7;&#x501F;&#x7528;&#x7684;&#x65B9;&#x5F0F;&#x5E76;&#x4E0D;&#x80FD;&#x7ED9;<code>this</code>&#x8D4B;&#x503C;<code>length</code>&#x7C7B;&#x4F3C;&#x7684;&#x5177;&#x6709;&#x529F;&#x80FD;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x6CA1;&#x6CD5;&#x5B9E;&#x73B0;&#x60F3;&#x8981;&#x7684;&#x7ED3;&#x679C;&#x3002;</p><p>&#x3000;&#x3000;&#x4F46;&#x662F;ES6&#x7684;<code>extends</code>&#x7684;&#x7EE7;&#x627F;&#x65B9;&#x5F0F;&#x5374;&#x662F;&#x4E0E;&#x4E4B;&#x76F8;&#x53CD;&#x7684;&#xFF0C;&#x9996;&#x5148;&#x662F;&#x7531;&#x57FA;&#x7C7B;(Array)&#x521B;&#x5EFA;<code>this</code>&#x7684;&#x503C;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x7531;&#x6D3E;&#x751F;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4FEE;&#x6539;&#x8FD9;&#x4E2A;&#x503C;&#xFF0C;&#x56E0;&#x6B64;&#x5728;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x4E00;&#x5F00;&#x59CB;&#x5C31;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>this</code>&#x521B;&#x5EFA;&#x57FA;&#x7C7B;&#x7684;&#x6240;&#x6709;&#x5167;&#x5EFA;&#x529F;&#x80FD;&#x5E76;&#x63A5;&#x53D7;&#x4E0E;&#x4E4B;&#x76F8;&#x5173;&#x7684;&#x529F;&#x80FD;(&#x5982;<code>length</code>)&#xFF0C;&#x7136;&#x540E;&#x5728;&#x6B64;<code>this</code>&#x7684;&#x57FA;&#x7840;&#x4E0A;&#x7528;&#x6D3E;&#x751F;&#x7C7B;&#x8FDB;&#x884C;&#x6269;&#x5C55;&#xFF0C;&#x56E0;&#x6B64;&#x5C31;&#x53EF;&#x4EE5;&#x8FBE;&#x5230;&#x6211;&#x4EEC;&#x7684;&#x7EE7;&#x627F;&#x539F;&#x751F;&#x6570;&#x7EC4;&#x7684;&#x76EE;&#x7684;&#x3002;</p><p>&#x3000;&#x3000;&#x4E0D;&#x4EC5;&#x4EC5;&#x5982;&#x6B64;&#x3002;ES6&#x5728;&#x6269;&#x5C55;&#x7C7B;&#x4F3C;&#x4E0A;&#x9762;&#x7684;&#x539F;&#x751F;&#x5BF9;&#x8C61;&#x65F6;&#x8FD8;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x65B9;&#x4FBF;&#x7684;&#x5C5E;&#x6027;: <code>Symbol.species</code>&#x3002;</p><h3 id="articleHeader2">Symbol.species</h3><p>&#x3000;&#x3000;<code>Symbol.species</code>&#x7684;&#x4E3B;&#x8981;&#x4F5C;&#x7528;&#x5C31;&#x662F;&#x53EF;&#x4EE5;&#x4F7F;&#x5F97;<strong>&#x539F;&#x672C;&#x8FD4;&#x56DE;&#x57FA;&#x7C7B;&#x5B9E;&#x4F8B;</strong>&#x7684;&#x7EE7;&#x627F;&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x6D3E;&#x751F;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#x5427;&#xFF0C;&#x6BD4;&#x5982;<code>Array.prototype.slice</code>&#x8FD4;&#x56DE;&#x7684;&#x5C31;&#x662F;&#x6570;&#x7EC4;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x4F46;&#x662F;&#x5F53;<code>MyArray</code>&#x7EE7;&#x627F;<code>Array</code>&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x4E5F;&#x5E0C;&#x671B;&#x5F53;&#x4F7F;&#x7528;<code>MyArray</code>&#x7684;&#x5B9E;&#x4F8B;&#x8C03;&#x7528;<code>slice</code>&#x65F6;&#x4E5F;&#x80FD;&#x8FD4;&#x56DE;<code>MyArray</code>&#x7684;&#x5B9E;&#x4F8B;&#x3002;&#x90A3;&#x6211;&#x4EEC;&#x8BE5;&#x5982;&#x4F55;&#x4F7F;&#x7528;&#x5462;&#xFF0C;&#x5176;&#x5B9E;<code>Symbol.species</code>&#x662F;&#x4E00;&#x4E2A;&#x9759;&#x6001;&#x8BBF;&#x95EE;&#x5668;&#x5C5E;&#x6027;&#xFF0C;&#x53EA;&#x8981;&#x5728;&#x5B9A;&#x4E49;&#x6D3E;&#x751F;&#x7C7B;&#x65F6;&#x5B9A;&#x4E49;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x6211;&#x4EEC;&#x7684;&#x76EE;&#x7684;&#x3002;&#x6BD4;&#x5982;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyArray extends Array {
  static get [Symbol.species](){
    return this;
  }
}

var myArray = new MyArray(); // MyArray[]
myArray.slice(); // MyArray []" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyArray</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Array</span> </span>{
  <span class="hljs-keyword">static</span> get [<span class="hljs-built_in">Symbol</span>.species](){
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  }
}

<span class="hljs-keyword">var</span> myArray = <span class="hljs-keyword">new</span> MyArray(); <span class="hljs-comment">// MyArray[]</span>
myArray.slice(); <span class="hljs-comment">// MyArray []</span></code></pre><p>&#x3000;&#x3000;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x53D1;&#x73B0;&#x8C03;&#x7528;&#x6570;&#x7EC4;&#x5B50;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;<code>myArray</code>&#x7684;<code>slice</code>&#x65B9;&#x6CD5;&#x65F6;&#x4E5F;&#x4F1A;&#x8FD4;&#x56DE;&#x7684;&#x662F;<code>MyArray</code>&#x7C7B;&#x578B;&#x7684;&#x5B9E;&#x4F8B;&#x3002;&#x5982;&#x679C;&#x4F60;&#x559C;&#x6B22;&#x5C1D;&#x8BD5;&#x7684;&#x8BDD;&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x5373;&#x4F7F;&#x53BB;&#x6389;&#x4E86;&#x9759;&#x6001;&#x8BBF;&#x95EE;&#x5668;&#x5C5E;&#x6027;<code>get [Symbol.species]</code>&#xFF0C;<code>myArray.slice()</code>&#x4E5F;&#x4F1A;&#x4ECD;&#x7136;&#x8FD4;&#x56DE;<code>MyArray</code>&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#x5373;&#x4F7F;&#x4F60;&#x4E0D;&#x663E;&#x5F0F;&#x5B9A;&#x4E49;&#xFF0C;&#x9ED8;&#x8BA4;&#x7684;<code>Symbol.species</code>&#x5C5E;&#x6027;&#x4E5F;&#x4F1A;&#x8FD4;&#x56DE;<code>this</code>&#x3002;&#x5F53;&#x7136;&#x4F60;&#x4E5F;&#x5C06;<code>this</code>&#x6539;&#x53D8;&#x4E3A;&#x5176;&#x4ED6;&#x503C;&#x6765;&#x6539;&#x53D8;&#x5BF9;&#x5E94;&#x65B9;&#x6CD5;&#x7684;&#x8FD4;&#x56DE;&#x7684;&#x5B9E;&#x4F8B;&#x7C7B;&#x578B;&#x3002;&#x4F8B;&#x5982;&#x6211;&#x5E0C;&#x671B;&#x5B9E;&#x4F8B;<code>myArray</code>&#x7684;<code>slice</code>&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x539F;&#x751F;&#x6570;&#x7EC4;&#x7C7B;&#x578B;<code>Array</code>&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x91C7;&#x7528;&#x5982;&#x4E0B;&#x7684;&#x5B9A;&#x4E49;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyArray extends Array {
  static get [Symbol.species](){
    return Array;
  }
}

var myArray = new MyArray(); // []
myArray.slice(); // []" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyArray</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Array</span> </span>{
  <span class="hljs-keyword">static</span> get [<span class="hljs-built_in">Symbol</span>.species](){
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>;
  }
}

<span class="hljs-keyword">var</span> myArray = <span class="hljs-keyword">new</span> MyArray(); <span class="hljs-comment">// []</span>
myArray.slice(); <span class="hljs-comment">// []</span></code></pre><p>&#x3000;&#x3000;&#x5F53;&#x7136;&#x4E86;&#xFF0C;&#x5982;&#x679C;&#x5728;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x5E0C;&#x671B;&#x5728;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x51FD;&#x6570;&#x4E2D;&#x8FD4;&#x56DE;&#x7684;&#x5B9E;&#x4F8B;&#x7C7B;&#x578B;&#x4E0E;<code>Symbol.species</code>&#x7684;&#x7C7B;&#x578B;&#x4FDD;&#x6301;&#x4E00;&#x81F4;&#x7684;&#x8BDD;&#xFF0C;&#x53EF;&#x4EE5;&#x5982;&#x4E0B;&#x5B9A;&#x4E49;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyArray extends Array {
  static get [Symbol.species](){
    return Array;
  }
  
  constructor(value){
    super();
    this.value = value;
  }
  
  clone(){
    return new this.constructor[Symbol.species](this.value)
  }
}

var myArray = new MyArray();
myArray.clone(); //[]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyArray</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Array</span> </span>{
  <span class="hljs-keyword">static</span> get [<span class="hljs-built_in">Symbol</span>.species](){
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>;
  }
  
  <span class="hljs-keyword">constructor</span>(value){
    <span class="hljs-keyword">super</span>();
    <span class="hljs-keyword">this</span>.value = value;
  }
  
  clone(){
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-keyword">this</span>.constructor[<span class="hljs-built_in">Symbol</span>.species](<span class="hljs-keyword">this</span>.value)
  }
}

<span class="hljs-keyword">var</span> myArray = <span class="hljs-keyword">new</span> MyArray();
myArray.clone(); <span class="hljs-comment">//[]</span></code></pre><p>&#x3000;&#x3000;&#x901A;&#x8FC7;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4E86;&#x89E3;&#x5230;&#xFF0C;&#x5728;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;&#x4E2D;&#x901A;&#x8FC7;&#x8C03;&#x7528;<code>this.constructor[Symbol.species]</code>&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x83B7;&#x53D6;&#x5230;<code>Symbol.species</code>&#x7EE7;&#x800C;&#x53EF;&#x4EE5;&#x521B;&#x9020;&#x5BF9;&#x5E94;&#x7C7B;&#x578B;&#x7684;&#x5B9E;&#x4F8B;&#x3002;</p><p>&#x3000;&#x3000;&#x4E0A;&#x9762;&#x6574;&#x4E2A;&#x7684;&#x6587;&#x7AE0;&#x90FD;&#x662F;&#x57FA;&#x4E8E;&#x76D1;&#x542C;&#x6570;&#x7EC4;&#x54CD;&#x5E94;&#x7684;&#x4E00;&#x4E2A;&#x70B9;&#x60F3;&#x5230;&#x7684;&#x3002;&#x8FD9;&#x91CC;&#x4EC5;&#x4EC5;&#x662F;&#x8D77;&#x5230;&#x629B;&#x7816;&#x5F15;&#x7389;&#x7684;&#x4F5C;&#x7528;&#xFF0C;&#x5E0C;&#x671B;&#x80FD;&#x5BF9;&#x5927;&#x5BB6;&#x6709;&#x6240;&#x5E2E;&#x52A9;&#x3002;&#x5982;&#x6709;&#x4E0D;&#x6B63;&#x786E;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x6307;&#x51FA;&#xFF0C;&#x613F;&#x5171;&#x540C;&#x5B66;&#x4E60;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从Vue数组响应化所引发的思考

## 原文链接
[https://segmentfault.com/a/1190000015283925](https://segmentfault.com/a/1190000015283925)

