---
title: '在使用es6语法class的时候，babel到底做了什么？' 
date: 2018-11-29 9:27:39
hidden: true
slug: kp7lss0k8q
categories: [reprint]
---

{{< raw >}}

                    
<p>&#x81EA;&#x4ECE;&#x6709;&#x4E86;webpack&#x4E4B;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x8FD9;&#x4E9B;jscoder&#x4F3C;&#x4E4E;&#x5F97;&#x5230;&#x4E86;&#x524D;&#x6240;&#x672A;&#x6709;&#x7684;&#x89E3;&#x653E;&#xFF0C;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF0C;&#x5BF9;&#x8C61;&#x89E3;&#x6784;&#xFF0C;let&#xFF0C;const&#x5173;&#x952E;&#x5B57;&#xFF0C;&#x4EE5;&#x53CA;class&#x3001;extends&#x7B49;&#x7B49;&#x5173;&#x952E;&#x5B57;&#x4F7F;&#x7528;&#x5F97;&#x4E0D;&#x4EA6;&#x4E50;&#x4E4E;&#xFF0C;&#x53CD;&#x6B63;&#xFF0C;webpack&#x4F1A;&#x5E2E;&#x6211;&#x4EEC;&#x628A;&#x8FD9;&#x4E9B;es6&#x4EE3;&#x7801;&#x8F6C;&#x6362;&#x6210;&#x6D4F;&#x89C8;&#x5668;&#x80FD;&#x591F;&#x8BC6;&#x522B;&#x7684;es5&#x4EE3;&#x7801;&#xFF0C;&#x90A3;&#x4E48;&#xFF0C;&#x6211;&#x4EEC;&#x6709;&#x591A;&#x5C11;&#x4EBA;&#x771F;&#x6B63;&#x7684;&#x770B;&#x8FC7;&#xFF0C;babel&#x8F6C;&#x6362;&#x4E4B;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x5462;&#xFF1F;&#x4ECA;&#x5929;&#xFF0C;&#x6211;&#x5C31;&#x6765;&#x770B;&#x4E00;&#x4E0B;&#xFF0C;<strong>&#x5F53;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x5173;&#x952E;&#x8BCD;class&#x7684;&#x65F6;&#x5019;&#xFF0C;babel&#x5230;&#x5E95;&#x505A;&#x4E86;&#x4EC0;&#x4E48;&#xFF1F;</strong></p>
<h1 id="articleHeader0">1&#x3001;&#x6253;&#x5F00;&#x7F51;&#x5740;&#xFF1A;<a href="https://babeljs.io/repl" rel="nofollow noreferrer" target="_blank">https://babeljs.io/repl</a>
</h1>
<p>&#x6211;&#x63A8;&#x8350;&#x6253;&#x5F00;&#x7F51;&#x5740;&#xFF1A;<a href="https://babeljs.io/repl" rel="nofollow noreferrer" target="_blank">https://babeljs.io/repl</a>&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x5DE6;&#x8FB9;&#x5199;es6&#x4EE3;&#x7801;&#xFF0C;&#x9A6C;&#x4E0A;&#x53F3;&#x8FB9;&#x5C31;&#x80FD;&#x8F6C;&#x8BD1;&#x51FA;es5&#x4EE3;&#x7801;&#xFF0C;&#x7136;&#x540E;&#xFF0C;&#x6211;&#x5728;&#x5DE6;&#x8FB9;&#x8F93;&#x5165;&#x4E86;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class A {
  constructor(name) {
      this.name = name
  }
  
  getName() {
      return this.name
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">A</span> </span>{
  <span class="hljs-keyword">constructor</span>(name) {
      <span class="hljs-keyword">this</span>.name = name
  }
  
  getName() {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name
  }
}</code></pre>
<p>&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x6700;&#x7B80;&#x5355;&#x7684;&#x7C7B;&#xFF0C;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x3002;</p>
<p>&#x8FD9;&#x65F6;&#x5019;&#xFF0C;&#x53F3;&#x8FB9;&#x6846;&#x5DF2;&#x7ECF;&#x7ED9;&#x6211;&#x8F6C;&#x8BD1;&#x51FA;&#x4E86;&#x6D4F;&#x89C8;&#x5668;&#x53EF;&#x8BC6;&#x522B;&#x7684;es5&#x4EE3;&#x7801;&#x4E86;&#xFF0C;&#x683C;&#x5F0F;&#x5316;&#x4E4B;&#x540E;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&apos;use strict&apos;;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i &lt; props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if (&apos;value&apos; in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError(&apos;Cannot call a class as a function&apos;);
    }
}

var A = function () {
    function A(name) {
        _classCallCheck(this, A);

        this.name = name;
    }

    _createClass(A, [{
        key: &apos;getName&apos;,
        value: function getName() {
            return this.name;
        }
    }]);

    return A;
}();" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">&apos;use strict&apos;</span>;

<span class="hljs-keyword">var</span> _createClass = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineProperties</span>(<span class="hljs-params">target, props</span>) </span>{
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; props.length; i++) {
            <span class="hljs-keyword">var</span> descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || <span class="hljs-literal">false</span>;
            descriptor.configurable = <span class="hljs-literal">true</span>;
            <span class="hljs-keyword">if</span> (<span class="hljs-string">&apos;value&apos;</span> <span class="hljs-keyword">in</span> descriptor) descriptor.writable = <span class="hljs-literal">true</span>;
            <span class="hljs-built_in">Object</span>.defineProperty(target, descriptor.key, descriptor);
        }
    }

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">Constructor, protoProps, staticProps</span>) </span>{
        <span class="hljs-keyword">if</span> (protoProps) defineProperties(Constructor.prototype, protoProps);
        <span class="hljs-keyword">if</span> (staticProps) defineProperties(Constructor, staticProps);
        <span class="hljs-keyword">return</span> Constructor;
    };
}();

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_classCallCheck</span>(<span class="hljs-params">instance, Constructor</span>) </span>{
    <span class="hljs-keyword">if</span> (!(instance <span class="hljs-keyword">instanceof</span> Constructor)) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">&apos;Cannot call a class as a function&apos;</span>);
    }
}

<span class="hljs-keyword">var</span> A = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params">name</span>) </span>{
        _classCallCheck(<span class="hljs-keyword">this</span>, A);

        <span class="hljs-keyword">this</span>.name = name;
    }

    _createClass(A, [{
        <span class="hljs-attr">key</span>: <span class="hljs-string">&apos;getName&apos;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getName</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
        }
    }]);

    <span class="hljs-keyword">return</span> A;
}();</code></pre>
<p>&#x597D;&#xFF0C;&#x73B0;&#x5728;&#x6765;&#x5206;&#x6790;&#x4E00;&#x4E0B;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x3002;</p>
<h1 id="articleHeader1">2&#x3001;es6&#x91CC;&#x9762;&#x7684;&#x7C7B;&#xFF0C;&#x672C;&#x8D28;&#x4E0A;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x81EA;&#x6267;&#x884C;&#x51FD;&#x6570;
var A = function () {
    function A(name) {
        // &#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x76EE;&#x7684;&#x5176;&#x5B9E;&#x662F;&#x9632;&#x6B62;&#x8FD9;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x88AB;&#x5F53;&#x505A;&#x666E;&#x901A;&#x51FD;&#x6570;&#x6267;&#x884C;
        _classCallCheck(this, A);
        
        this.name = name;
    }

    // &#x5BF9;&#x51FD;&#x6570;A&#x6267;&#x884C;_createClass&#x65B9;&#x6CD5;&#xFF0C;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x7ED9;A&#x7684;&#x539F;&#x578B;&#x4E0A;&#x7ED1;&#x5B9A;&#x65B9;&#x6CD5;
    _createClass(A, [{
        key: &apos;getName&apos;, //&#x65B9;&#x6CD5;&#x540D;
        value: function getName() { //&#x51FD;&#x6570;&#x4F53;
            return this.name;
        }
    }]);

    return A;
}();" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// &#x81EA;&#x6267;&#x884C;&#x51FD;&#x6570;</span>
<span class="hljs-keyword">var</span> A = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span><span class="hljs-params">(name)</span> </span>{
        <span class="hljs-comment">// &#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x76EE;&#x7684;&#x5176;&#x5B9E;&#x662F;&#x9632;&#x6B62;&#x8FD9;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x88AB;&#x5F53;&#x505A;&#x666E;&#x901A;&#x51FD;&#x6570;&#x6267;&#x884C;</span>
        _classCallCheck(<span class="hljs-keyword">this</span>, A);
        
        <span class="hljs-keyword">this</span>.name = name;
    }

    <span class="hljs-comment">// &#x5BF9;&#x51FD;&#x6570;A&#x6267;&#x884C;_createClass&#x65B9;&#x6CD5;&#xFF0C;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x7ED9;A&#x7684;&#x539F;&#x578B;&#x4E0A;&#x7ED1;&#x5B9A;&#x65B9;&#x6CD5;</span>
    _createClass(A, [{
        key: <span class="hljs-string">&apos;getName&apos;</span>, <span class="hljs-comment">//&#x65B9;&#x6CD5;&#x540D;</span>
        value: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getName</span><span class="hljs-params">()</span> </span>{ <span class="hljs-comment">//&#x51FD;&#x6570;&#x4F53;</span>
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
        }
    }]);

    <span class="hljs-keyword">return</span> A;
}();</code></pre>
<p>&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#xFF0C;&#x53D8;&#x91CF;A&#x662F;&#x4E00;&#x4E2A;&#x81EA;&#x6267;&#x884C;&#x51FD;&#x6570;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#xFF0C;&#x8BE5;&#x81EA;&#x6267;&#x884C;&#x51FD;&#x6570;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x719F;&#x6089;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;es6&#x91CC;&#x9762;&#x7684;&#x7C7B;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;</p>
<h1 id="articleHeader2">3&#x3001;_classCallCheck&#x51FD;&#x6570;</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError(&apos;Cannot call a class as a function&apos;);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_classCallCheck</span>(<span class="hljs-params">instance, Constructor</span>) </span>{
    <span class="hljs-keyword">if</span> (!(instance <span class="hljs-keyword">instanceof</span> Constructor)) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">&apos;Cannot call a class as a function&apos;</span>);
    }
}</code></pre>
<p>&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x7279;&#x522B;&#x7B80;&#x5355;&#xFF0C;&#x5F53;&#x6267;&#x884C;&#x51FD;&#x6570;A&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E0D;&#x5141;&#x8BB8;this&#x4E0D;&#x662F;A&#x7684;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#xFF0C;&#x6BD4;&#x5982;&#x76F4;&#x63A5;&#x8FD9;&#x6837;&#x8C03;&#x7528;A()&#xFF0C;&#x4F46;&#x662F;&#x5728;A&#x7684;&#x5B50;&#x7C7B;B&#x4E2D;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x8C03;&#x7528;&#xFF1A;A.apply(this, arguments)&#x3002;<br>&#x8BE5;&#x51FD;&#x6570;&#x7684;&#x76EE;&#x7684;&#x662F;&#x9632;&#x6B62;&#x6784;&#x9020;&#x51FD;&#x6570;&#x88AB;&#x5F53;&#x505A;&#x666E;&#x901A;&#x51FD;&#x6570;&#x6267;&#x884C;&#x3002;</p>
<h1 id="articleHeader3">4&#x3001;_createClass&#x51FD;&#x6570;</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x8BE5;&#x51FD;&#x6570;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x81EA;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x5176;&#x8FD4;&#x56DE;&#x503C;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;
var _createClass = function () {
    // &#x628A;props&#x6570;&#x7EC4;&#x4E0A;&#x6BCF;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x901A;&#x8FC7;Object.defineProperty&#x65B9;&#x6CD5;&#xFF0C;&#x90FD;&#x5B9A;&#x4E49;&#x5230;&#x76EE;&#x6807;&#x5BF9;&#x8C61;target&#x4E0A;&#x53BB;
    function defineProperties(target, props) {
        for (var i = 0; i &lt; props.length; i++) {
            //&#x8FD9;&#x91CC;&#x8981;&#x786E;&#x4FDD;props[i]&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x5E76;&#x4E14;&#x6709;key&#x548C;value&#x4E24;&#x4E2A;&#x952E;
            var descriptor = props[i];
            // &#x5B9A;&#x4E49;&#x662F;&#x5426;&#x53EF;&#x4EE5;&#x4ECE;&#x539F;&#x578B;&#x4E0A;&#x8BBF;&#x95EE;
            descriptor.enumerable = descriptor.enumerable || false;
            // &#x5B9A;&#x4E49;&#x5176;&#x662F;&#x5426;&#x53EF;&#x5220;&#x9664;
            descriptor.configurable = true;
            // &#x5B9A;&#x4E49;&#x8BE5;&#x5C5E;&#x6027;&#x662F;&#x5426;&#x53EF;&#x5199;
            if (&apos;value&apos; in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        // &#x5982;&#x679C;&#x4F20;&#x5165;&#x4E86;&#x539F;&#x578B;&#x5C5E;&#x6027;&#x6570;&#x7EC4;&#xFF0C;&#x5C31;&#x628A;&#x5C5E;&#x6027;&#x5168;&#x90E8;&#x5B9A;&#x4E49;&#x5230;Constructor&#x7684;&#x539F;&#x578B;&#x4E0A;&#x53BB;
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        // &#x5982;&#x679C;&#x4F20;&#x5165;&#x4E86;&#x9759;&#x6001;&#x5C5E;&#x6027;&#x6570;&#x7EC4;&#xFF0C;&#x5C31;&#x628A;&#x5C5E;&#x6027;&#x5168;&#x90E8;&#x5B9A;&#x4E49;&#x5230;Constructor&#x5BF9;&#x8C61;&#x81EA;&#x8EAB;&#x4E0A;&#x53BB;
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x8BE5;&#x51FD;&#x6570;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x81EA;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x5176;&#x8FD4;&#x56DE;&#x503C;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;</span>
<span class="hljs-keyword">var</span> _createClass = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// &#x628A;props&#x6570;&#x7EC4;&#x4E0A;&#x6BCF;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x901A;&#x8FC7;Object.defineProperty&#x65B9;&#x6CD5;&#xFF0C;&#x90FD;&#x5B9A;&#x4E49;&#x5230;&#x76EE;&#x6807;&#x5BF9;&#x8C61;target&#x4E0A;&#x53BB;</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineProperties</span>(<span class="hljs-params">target, props</span>) </span>{
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; props.length; i++) {
            <span class="hljs-comment">//&#x8FD9;&#x91CC;&#x8981;&#x786E;&#x4FDD;props[i]&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x5E76;&#x4E14;&#x6709;key&#x548C;value&#x4E24;&#x4E2A;&#x952E;</span>
            <span class="hljs-keyword">var</span> descriptor = props[i];
            <span class="hljs-comment">// &#x5B9A;&#x4E49;&#x662F;&#x5426;&#x53EF;&#x4EE5;&#x4ECE;&#x539F;&#x578B;&#x4E0A;&#x8BBF;&#x95EE;</span>
            descriptor.enumerable = descriptor.enumerable || <span class="hljs-literal">false</span>;
            <span class="hljs-comment">// &#x5B9A;&#x4E49;&#x5176;&#x662F;&#x5426;&#x53EF;&#x5220;&#x9664;</span>
            descriptor.configurable = <span class="hljs-literal">true</span>;
            <span class="hljs-comment">// &#x5B9A;&#x4E49;&#x8BE5;&#x5C5E;&#x6027;&#x662F;&#x5426;&#x53EF;&#x5199;</span>
            <span class="hljs-keyword">if</span> (<span class="hljs-string">&apos;value&apos;</span> <span class="hljs-keyword">in</span> descriptor) descriptor.writable = <span class="hljs-literal">true</span>;
            <span class="hljs-built_in">Object</span>.defineProperty(target, descriptor.key, descriptor);
        }
    }

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">Constructor, protoProps, staticProps</span>) </span>{
        <span class="hljs-comment">// &#x5982;&#x679C;&#x4F20;&#x5165;&#x4E86;&#x539F;&#x578B;&#x5C5E;&#x6027;&#x6570;&#x7EC4;&#xFF0C;&#x5C31;&#x628A;&#x5C5E;&#x6027;&#x5168;&#x90E8;&#x5B9A;&#x4E49;&#x5230;Constructor&#x7684;&#x539F;&#x578B;&#x4E0A;&#x53BB;</span>
        <span class="hljs-keyword">if</span> (protoProps) defineProperties(Constructor.prototype, protoProps);
        <span class="hljs-comment">// &#x5982;&#x679C;&#x4F20;&#x5165;&#x4E86;&#x9759;&#x6001;&#x5C5E;&#x6027;&#x6570;&#x7EC4;&#xFF0C;&#x5C31;&#x628A;&#x5C5E;&#x6027;&#x5168;&#x90E8;&#x5B9A;&#x4E49;&#x5230;Constructor&#x5BF9;&#x8C61;&#x81EA;&#x8EAB;&#x4E0A;&#x53BB;</span>
        <span class="hljs-keyword">if</span> (staticProps) defineProperties(Constructor, staticProps);
        <span class="hljs-keyword">return</span> Constructor;
    };
}();</code></pre>
<p>&#x5176;&#x5B9E;_createClass&#x51FD;&#x6570;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x5C31;&#x662F;&#x628A;&#x51E0;&#x4E2A;&#x65B9;&#x6CD5;&#x62F7;&#x8D1D;&#x5230;&#x6784;&#x9020;&#x51FD;&#x6570;A&#x7684;&#x539F;&#x578B;&#x4E0A;&#x53BB;&#x3002;</p>
<h1 id="articleHeader4">4&#x3001;&#x4F7F;&#x7528;&#x5173;&#x952E;&#x8BCD;extends&#xFF0C;&#x53D1;&#x751F;&#x4E86;&#x4EC0;&#x4E48;&#xFF1F;</h1>
<p>&#x6211;&#x5728;<a href="https://babeljs.io/repl" rel="nofollow noreferrer" target="_blank">https://babeljs.io/repl</a> &#x5DE6;&#x4FA7;&#x8F93;&#x5165;&#x6846;&#x4E0A;&#x52A0;&#x4E86;&#x4E0B;&#x9762;&#x8FD9;&#x884C;&#x4EE3;&#x7801;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" class B extends A {}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs scala"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">B</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">A</span> </span>{}</code></pre>
<p>&#x8FD9;&#x65F6;&#x5019;&#xFF0C;&#x53F3;&#x4FA7;&#x591A;&#x51FA;&#x4E86;&#x4EE5;&#x4E0B;&#x51E0;&#x884C;&#x4EE3;&#x7801;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError(&apos;this hasn\&apos;t been initialised - super() hasn\&apos;t been called&apos;);
    }
    return call &amp;&amp; (typeof call === &apos;object&apos; || typeof call === &apos;function&apos;) ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== &apos;function&apos; &amp;&amp; superClass !== null) {
        throw new TypeError(&apos;Super expression must either be null or a function, not &apos; + typeof superClass);
    }
    subClass.prototype = Object.create(superClass &amp;&amp; superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var B = function (_A) {
    _inherits(B, _A);

    function B() {
        _classCallCheck(this, B);
        //&#x8FD9;&#x91CC;&#x7684;&#x91CD;&#x70B9;&#x662F;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;(B.__proto__ || Object.getPrototypeOf(B)).apply(this, arguments);
        //&#x8FD9;&#x91CC;&#x5176;&#x5B9E;&#x662F;&#x5C06;&#x5B50;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#xFF0C;&#x8C03;&#x7528;&#x4E86;&#x7236;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x6837;&#x7236;&#x7C7B;&#x7684;&#x5C5E;&#x6027;&#x5C31;&#x90FD;&#x53EF;&#x4EE5;&#x62F7;&#x8D1D;&#x5230;&#x5B50;&#x7C7B;&#x4E0A;&#x6765;
        return _possibleConstructorReturn(this, (B.__proto__ || Object.getPrototypeOf(B)).apply(this, arguments));
    }

    return B;
}(A);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_possibleConstructorReturn</span>(<span class="hljs-params">self, call</span>) </span>{
    <span class="hljs-keyword">if</span> (!self) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">ReferenceError</span>(<span class="hljs-string">&apos;this hasn\&apos;t been initialised - super() hasn\&apos;t been called&apos;</span>);
    }
    <span class="hljs-keyword">return</span> call &amp;&amp; (<span class="hljs-keyword">typeof</span> call === <span class="hljs-string">&apos;object&apos;</span> || <span class="hljs-keyword">typeof</span> call === <span class="hljs-string">&apos;function&apos;</span>) ? call : self;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_inherits</span>(<span class="hljs-params">subClass, superClass</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> superClass !== <span class="hljs-string">&apos;function&apos;</span> &amp;&amp; superClass !== <span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">&apos;Super expression must either be null or a function, not &apos;</span> + <span class="hljs-keyword">typeof</span> superClass);
    }
    subClass.prototype = <span class="hljs-built_in">Object</span>.create(superClass &amp;&amp; superClass.prototype, {
        <span class="hljs-attr">constructor</span>: {
            <span class="hljs-attr">value</span>: subClass,
            <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>
        }
    });
    <span class="hljs-keyword">if</span> (superClass) <span class="hljs-built_in">Object</span>.setPrototypeOf ? <span class="hljs-built_in">Object</span>.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

<span class="hljs-keyword">var</span> B = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_A</span>) </span>{
    _inherits(B, _A);

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">B</span>(<span class="hljs-params"></span>) </span>{
        _classCallCheck(<span class="hljs-keyword">this</span>, B);
        <span class="hljs-comment">//&#x8FD9;&#x91CC;&#x7684;&#x91CD;&#x70B9;&#x662F;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;(B.__proto__ || Object.getPrototypeOf(B)).apply(this, arguments);</span>
        <span class="hljs-comment">//&#x8FD9;&#x91CC;&#x5176;&#x5B9E;&#x662F;&#x5C06;&#x5B50;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#xFF0C;&#x8C03;&#x7528;&#x4E86;&#x7236;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x6837;&#x7236;&#x7C7B;&#x7684;&#x5C5E;&#x6027;&#x5C31;&#x90FD;&#x53EF;&#x4EE5;&#x62F7;&#x8D1D;&#x5230;&#x5B50;&#x7C7B;&#x4E0A;&#x6765;</span>
        <span class="hljs-keyword">return</span> _possibleConstructorReturn(<span class="hljs-keyword">this</span>, (B.__proto__ || <span class="hljs-built_in">Object</span>.getPrototypeOf(B)).apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>));
    }

    <span class="hljs-keyword">return</span> B;
}(A);</code></pre>
<h1 id="articleHeader5">5&#x3001;_inherits&#x51FD;&#x6570;</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function _inherits(subClass, superClass) {
    //&#x7B80;&#x5355;&#x6821;&#x9A8C;
    if (typeof superClass !== &apos;function&apos; &amp;&amp; superClass !== null) {
        throw new TypeError(&apos;Super expression must either be null or a function, not &apos; + typeof superClass);
    }
    //&#x628A;&#x5B50;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x6307;&#x5411;&#x7236;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x521B;&#x5EFA;&#x51FA;&#x6765;&#x7684;&#x5BF9;&#x8C61;&#xFF08;&#x6CE8;&#x610F;&#x4E0D;&#x662F;&#x76F4;&#x63A5;&#x6307;&#x5411;&#x7236;&#x7C7B;&#x539F;&#x578B;&#xFF09;&#xFF0C;&#x5E76;&#x4E14;&#x4FEE;&#x6B63;constructor&#x5C5E;&#x6027;&#x4E3A;&#x5B50;&#x7C7B;&#x81EA;&#x5DF1;
    subClass.prototype = Object.create(superClass &amp;&amp; superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    // &#x8FD9;&#x4E00;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x5176;&#x5B9E;&#x662F;&#x60F3;&#x628A;superClass&#x653E;&#x5230;subClass&#x4E0B;&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;subClass.super = superClass&#xFF0C;&#x8FD9;&#x6837;&#x540E;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;subClass&#x91CC;&#x9762;&#x80FD;&#x65B9;&#x4FBF;&#x7684;&#x5F15;&#x7528;&#x5230;superClass&#x51FD;&#x6570;
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_inherits</span>(<span class="hljs-params">subClass, superClass</span>) </span>{
    <span class="hljs-comment">//&#x7B80;&#x5355;&#x6821;&#x9A8C;</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> superClass !== <span class="hljs-string">&apos;function&apos;</span> &amp;&amp; superClass !== <span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">&apos;Super expression must either be null or a function, not &apos;</span> + <span class="hljs-keyword">typeof</span> superClass);
    }
    <span class="hljs-comment">//&#x628A;&#x5B50;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x6307;&#x5411;&#x7236;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x521B;&#x5EFA;&#x51FA;&#x6765;&#x7684;&#x5BF9;&#x8C61;&#xFF08;&#x6CE8;&#x610F;&#x4E0D;&#x662F;&#x76F4;&#x63A5;&#x6307;&#x5411;&#x7236;&#x7C7B;&#x539F;&#x578B;&#xFF09;&#xFF0C;&#x5E76;&#x4E14;&#x4FEE;&#x6B63;constructor&#x5C5E;&#x6027;&#x4E3A;&#x5B50;&#x7C7B;&#x81EA;&#x5DF1;</span>
    subClass.prototype = <span class="hljs-built_in">Object</span>.create(superClass &amp;&amp; superClass.prototype, {
        <span class="hljs-keyword">constructor</span>: {
            value: subClass,
            enumerable: <span class="hljs-literal">false</span>,
            writable: <span class="hljs-literal">true</span>,
            configurable: <span class="hljs-literal">true</span>
        }
    });
    <span class="hljs-comment">// &#x8FD9;&#x4E00;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x5176;&#x5B9E;&#x662F;&#x60F3;&#x628A;superClass&#x653E;&#x5230;subClass&#x4E0B;&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;subClass.super = superClass&#xFF0C;&#x8FD9;&#x6837;&#x540E;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;subClass&#x91CC;&#x9762;&#x80FD;&#x65B9;&#x4FBF;&#x7684;&#x5F15;&#x7528;&#x5230;superClass&#x51FD;&#x6570;</span>
    <span class="hljs-keyword">if</span> (superClass) <span class="hljs-built_in">Object</span>.setPrototypeOf ? <span class="hljs-built_in">Object</span>.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}</code></pre>
<h1 id="articleHeader6">6&#x3001;_possibleConstructorReturn&#x51FD;&#x6570;</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError(&apos;this hasn\&apos;t been initialised - super() hasn\&apos;t been called&apos;);
    }
    return call &amp;&amp; (typeof call === &apos;object&apos; || typeof call === &apos;function&apos;) ? call : self;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs sqf"><code>function <span class="hljs-variable">_possibleConstructorReturn</span>(self, <span class="hljs-built_in">call</span>) {
    <span class="hljs-keyword">if</span> (!self) {
        <span class="hljs-keyword">throw</span> new ReferenceError(<span class="hljs-string">&apos;this hasn\&apos;</span>t been initialised - super() hasn\<span class="hljs-string">&apos;t been called&apos;</span>);
    }
    return <span class="hljs-built_in">call</span> &amp;&amp; (<span class="hljs-built_in">typeof</span> <span class="hljs-built_in">call</span> === <span class="hljs-string">&apos;object&apos;</span> || <span class="hljs-built_in">typeof</span> <span class="hljs-built_in">call</span> === <span class="hljs-string">&apos;function&apos;</span>) ? <span class="hljs-built_in">call</span> : self;
}</code></pre>
<p>&#x5982;&#x679C;call&#x4E0D;&#x662F;&#x5BF9;&#x8C61;&#x6216;&#x8005;&#x51FD;&#x6570;&#xFF0C;&#x5373;&#x8BE5;&#x8C03;&#x7528;&#xFF1A;(B.__proto__ || Object.getPrototypeOf(B)).apply(this, arguments)&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x65E2;&#x4E0D;&#x662F;&#x5BF9;&#x8C61;&#xFF0C;&#x4E5F;&#x4E0D;&#x662F;&#x51FD;&#x6570;&#xFF0C;&#x90A3;&#x4E48;&#xFF0C;&#x5C31;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x5F53;&#x524D;&#x7684;self&#xFF0C;&#x800C;self&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x5B50;&#x7C7B;B&#x91CC;&#x9762;&#x7684;&#x5B9E;&#x4F8B;&#x6307;&#x9488;this&#x3002;&#x6B63;&#x5E38;&#x60C5;&#x51B5;&#xFF0C;(B.__proto__ || Object.getPrototypeOf(B)).apply(this, arguments)&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x5176;&#x5B9E;&#x4E5F;&#x5C31;&#x662F;&#x5BF9;&#x8C61;&#x3002;</p>
<p>&#x597D;&#x4E86;&#xFF0C;&#x4E0A;&#x9762;&#x7B97;&#x662F;&#x57FA;&#x672C;&#x8BF4;&#x6E05;&#x695A;&#x4E86;&#x4F7F;&#x7528;es6&#x9884;&#x53D1;&#x5B9A;&#x4E49;&#x7C7B;&#x3001;&#x7EE7;&#x627F;&#x7C7B;&#xFF0C;&#x5230;&#x5E95;&#x53D1;&#x751F;&#x4E86;&#x4EC0;&#x4E48;&#xFF0C;&#x5982;&#x679C;&#x9519;&#x8BEF;&#xFF0C;&#x8FD8;&#x8BF7;&#x6307;&#x6B63;&#xFF0C;&#x8C22;&#x8C22;&#xFF01;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在使用es6语法class的时候，babel到底做了什么？

## 原文链接
[https://segmentfault.com/a/1190000015125847](https://segmentfault.com/a/1190000015125847)

