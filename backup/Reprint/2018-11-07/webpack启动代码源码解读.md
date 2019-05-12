---
title: webpack启动代码源码解读
hidden: true
categories: [reprint]
slug: 510918a4
date: 2018-11-07 02:30:12
---

{{< raw >}}
<ul><li><h3 id="articleHeader0">&#x524D;&#x8A00;</h3></li></ul><p>&#x867D;&#x7136;&#x6BCF;&#x5929;&#x90FD;&#x5728;&#x7528;webpack&#xFF0C;&#x4F46;&#x4E00;&#x76F4;&#x89C9;&#x5F97;&#x9694;&#x7740;&#x4E00;&#x5C42;&#x795E;&#x79D8;&#x7684;&#x9762;&#x7EB1;&#xFF0C;&#x5BF9;&#x5B83;&#x7684;&#x5DE5;&#x4F5C;&#x539F;&#x7406;&#x4E00;&#x76F4;&#x4F3C;&#x61C2;&#x975E;&#x61C2;&#x3002;&#x5B83;&#x662F;&#x5982;&#x4F55;&#x7528;&#x539F;&#x751F;JS&#x5B9E;&#x73B0;&#x6A21;&#x5757;&#x95F4;&#x7684;&#x4F9D;&#x8D56;&#x7BA1;&#x7406;&#x7684;&#x5462;&#xFF1F;&#x5BF9;&#x4E8E;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x5B83;&#x662F;&#x901A;&#x8FC7;&#x4EC0;&#x4E48;&#x65B9;&#x5F0F;&#x52A8;&#x6001;&#x83B7;&#x53D6;&#x7684;&#xFF1F;&#x6253;&#x5305;&#x5B8C;&#x6210;&#x540E;&#x90A3;&#x4E00;&#x5806;<code>/******/</code>&#x5F00;&#x5934;&#x7684;&#x4EE3;&#x7801;&#x662F;&#x7528;&#x6765;&#x5E72;&#x4EC0;&#x4E48;&#x7684;&#xFF1F;&#x672C;&#x6587;&#x5C06;&#x56F4;&#x7ED5;&#x4EE5;&#x4E0A;3&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x5BF9;&#x7167;&#x7740;&#x6E90;&#x7801;&#x7ED9;&#x51FA;&#x89E3;&#x7B54;&#x3002;</p><p>&#x5982;&#x679C;&#x4F60;&#x5BF9;webpack&#x7684;&#x914D;&#x7F6E;&#x8C03;&#x4F18;&#x611F;&#x5174;&#x8DA3;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x770B;&#x6211;&#x4E4B;&#x524D;&#x5199;&#x7684;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#xFF1A;<a href="https://segmentfault.com/a/1190000016484002?_ea=4565036">webpack&#x8C03;&#x4F18;&#x603B;&#x7ED3;</a></p><ul><li><h3 id="articleHeader1">&#x6A21;&#x5757;&#x7BA1;&#x7406;</h3></li></ul><p>&#x5148;&#x5199;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;JS&#x6587;&#x4EF6;&#xFF0C;&#x770B;&#x770B;webpack&#x6253;&#x5305;&#x540E;&#x4F1A;&#x662F;&#x4EC0;&#x4E48;&#x6837;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js
console.log(&apos;Hello Dickens&apos;);

// webpack.config.js
const path = require(&apos;path&apos;);
module.exports = {
  entry: &apos;./main.js&apos;,
  output: {
    filename: &apos;bundle.js&apos;,
    path: path.resolve(__dirname, &apos;dist&apos;)
  }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// main.js</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Hello Dickens&apos;</span>);

<span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">&apos;./main.js&apos;</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;bundle.js&apos;</span>,
    <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">&apos;dist&apos;</span>)
  }
};</code></pre><p>&#x5728;&#x5F53;&#x524D;&#x76EE;&#x5F55;&#x4E0B;&#x8FD0;&#x884C;<code>webpack</code>&#xFF0C;&#x4F1A;&#x5728;dist&#x76EE;&#x5F55;&#x4E0B;&#x9762;&#x751F;&#x6210;&#x6253;&#x5305;&#x597D;&#x7684;bundle.js&#x6587;&#x4EF6;&#x3002;&#x53BB;&#x6389;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x5E72;&#x6270;&#x540E;&#xFF0C;&#x6838;&#x5FC3;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack&#x542F;&#x52A8;&#x4EE3;&#x7801;
(function (modules) { 
    // &#x6A21;&#x5757;&#x7F13;&#x5B58;&#x5BF9;&#x8C61;
    var installedModules = {};

    // webpack&#x5B9E;&#x73B0;&#x7684;require&#x51FD;&#x6570;
    function __webpack_require__(moduleId) {
        // &#x68C0;&#x67E5;&#x7F13;&#x5B58;&#x5BF9;&#x8C61;&#xFF0C;&#x770B;&#x6A21;&#x5757;&#x662F;&#x5426;&#x52A0;&#x8F7D;&#x8FC7;
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }

        // &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x6A21;&#x5757;&#x7F13;&#x5B58;&#xFF0C;&#x518D;&#x5B58;&#x5165;&#x7F13;&#x5B58;&#x5BF9;&#x8C61;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };

        // &#x6267;&#x884C;&#x6A21;&#x5757;&#x4EE3;&#x7801;
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        
        // &#x5C06;&#x6A21;&#x5757;&#x6807;&#x8BC6;&#x4E3A;&#x5DF2;&#x52A0;&#x8F7D;
        module.l = true;

        // &#x8FD4;&#x56DE;export&#x7684;&#x5185;&#x5BB9;
        return module.exports;
    }

    ...

    // &#x52A0;&#x8F7D;&#x5165;&#x53E3;&#x6A21;&#x5757;
    return __webpack_require__(__webpack_require__.s = 0);
})
([
    /* 0 */
    (function (module, exports) {
        console.log(&apos;Hello Dickens&apos;);
    })
]);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack&#x542F;&#x52A8;&#x4EE3;&#x7801;</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">modules</span>) </span>{ 
    <span class="hljs-comment">// &#x6A21;&#x5757;&#x7F13;&#x5B58;&#x5BF9;&#x8C61;</span>
    <span class="hljs-keyword">var</span> installedModules = {};

    <span class="hljs-comment">// webpack&#x5B9E;&#x73B0;&#x7684;require&#x51FD;&#x6570;</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">__webpack_require__</span>(<span class="hljs-params">moduleId</span>) </span>{
        <span class="hljs-comment">// &#x68C0;&#x67E5;&#x7F13;&#x5B58;&#x5BF9;&#x8C61;&#xFF0C;&#x770B;&#x6A21;&#x5757;&#x662F;&#x5426;&#x52A0;&#x8F7D;&#x8FC7;</span>
        <span class="hljs-keyword">if</span> (installedModules[moduleId]) {
            <span class="hljs-keyword">return</span> installedModules[moduleId].exports;
        }

        <span class="hljs-comment">// &#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x6A21;&#x5757;&#x7F13;&#x5B58;&#xFF0C;&#x518D;&#x5B58;&#x5165;&#x7F13;&#x5B58;&#x5BF9;&#x8C61;</span>
        <span class="hljs-keyword">var</span> <span class="hljs-built_in">module</span> = installedModules[moduleId] = {
            <span class="hljs-attr">i</span>: moduleId,
            <span class="hljs-attr">l</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">exports</span>: {}
        };

        <span class="hljs-comment">// &#x6267;&#x884C;&#x6A21;&#x5757;&#x4EE3;&#x7801;</span>
        modules[moduleId].call(<span class="hljs-built_in">module</span>.exports, <span class="hljs-built_in">module</span>, <span class="hljs-built_in">module</span>.exports, __webpack_require__);
        
        <span class="hljs-comment">// &#x5C06;&#x6A21;&#x5757;&#x6807;&#x8BC6;&#x4E3A;&#x5DF2;&#x52A0;&#x8F7D;</span>
        <span class="hljs-built_in">module</span>.l = <span class="hljs-literal">true</span>;

        <span class="hljs-comment">// &#x8FD4;&#x56DE;export&#x7684;&#x5185;&#x5BB9;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>.exports;
    }

    ...

    <span class="hljs-comment">// &#x52A0;&#x8F7D;&#x5165;&#x53E3;&#x6A21;&#x5757;</span>
    <span class="hljs-keyword">return</span> __webpack_require__(__webpack_require__.s = <span class="hljs-number">0</span>);
})
([
    <span class="hljs-comment">/* 0 */</span>
    (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, exports</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Hello Dickens&apos;</span>);
    })
]);</code></pre><p>&#x4EE3;&#x7801;&#x662F;&#x4E00;&#x4E2A;&#x7ACB;&#x5373;&#x6267;&#x884C;&#x51FD;&#x6570;&#xFF0C;&#x53C2;&#x6570;<code>modules</code>&#x662F;&#x7531;&#x5404;&#x4E2A;&#x6A21;&#x5757;&#x7EC4;&#x6210;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x672C;&#x4F8B;&#x5B50;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x7F16;&#x53F7;&#x4E3A;0&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x7531;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5305;&#x88F9;&#x7740;&#xFF0C;&#x6CE8;&#x5165;&#x4E86;<code>module</code>&#x548C;<code>exports</code>2&#x4E2A;&#x53D8;&#x91CF;&#xFF08;&#x672C;&#x4F8B;&#x6CA1;&#x7528;&#x5230;&#xFF09;&#x3002;</p><p>&#x6838;&#x5FC3;&#x4EE3;&#x7801;&#x662F;<code>__webpack_require__</code>&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x5B83;&#x7684;&#x529F;&#x80FD;&#x662F;&#x6839;&#x636E;&#x4F20;&#x5165;&#x7684;&#x6A21;&#x5757;id&#xFF0C;&#x8FD4;&#x56DE;&#x6A21;&#x5757;export&#x7684;&#x5185;&#x5BB9;&#x3002;&#x6A21;&#x5757;id&#x7531;webpack&#x6839;&#x636E;&#x6587;&#x4EF6;&#x7684;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#x81EA;&#x52A8;&#x751F;&#x6210;&#xFF0C;&#x662F;&#x4E00;&#x4E2A;&#x4ECE;0&#x5F00;&#x59CB;&#x9012;&#x589E;&#x7684;&#x6570;&#x5B57;&#xFF0C;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x7684;id&#x4E3A;0&#x3002;&#x6240;&#x6709;&#x7684;&#x6A21;&#x5757;&#x90FD;&#x4F1A;&#x88AB;webpack&#x7528;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5305;&#x88F9;&#xFF0C;&#x6309;&#x7167;&#x987A;&#x5E8F;&#x5B58;&#x5165;&#x4E0A;&#x9762;&#x63D0;&#x5230;&#x7684;&#x6570;&#x7EC4;&#x5B9E;&#x53C2;&#x5F53;&#x4E2D;&#x3002;</p><p>&#x6A21;&#x5757;export&#x7684;&#x5185;&#x5BB9;&#x4F1A;&#x88AB;&#x7F13;&#x5B58;&#x5728;<code>installedModules</code>&#x4E2D;&#x3002;&#x5F53;&#x83B7;&#x53D6;&#x6A21;&#x5757;&#x5185;&#x5BB9;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5982;&#x679C;&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;&#x8FC7;&#xFF0C;&#x5219;&#x76F4;&#x63A5;&#x4ECE;&#x7F13;&#x5B58;&#x8FD4;&#x56DE;&#xFF0C;&#x5426;&#x5219;&#x6839;&#x636E;id&#x4ECE;<code>modules</code>&#x5F62;&#x53C2;&#x4E2D;&#x53D6;&#x51FA;&#x6A21;&#x5757;&#x5185;&#x5BB9;&#x5E76;&#x6267;&#x884C;&#xFF0C;&#x540C;&#x65F6;&#x5C06;&#x7ED3;&#x679C;&#x4FDD;&#x5B58;&#x5230;&#x7F13;&#x5B58;&#x5BF9;&#x8C61;&#x5F53;&#x4E2D;&#xFF08;&#x5C06;&#x5728;&#x4E0B;&#x6587;&#x8BB2;&#x89E3;&#xFF09;&#x3002;</p><p>&#x6211;&#x4EEC;&#x518D;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x5728;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x5904;&#x5BFC;&#x5165;&#xFF0C;&#x518D;&#x6765;&#x770B;&#x770B;&#x751F;&#x6210;&#x7684;&#x542F;&#x52A8;&#x6587;&#x4EF6;&#x662F;&#x600E;&#x6837;&#x7684;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js
import logger from &apos;./logger&apos;;

console.log(&apos;Hello Dickens&apos;);
logger();

//logger.js
export default function log() {
    console.log(&apos;Log from logger&apos;);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// main.js</span>
<span class="hljs-keyword">import</span> logger <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./logger&apos;</span>;

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Hello Dickens&apos;</span>);
logger();

<span class="hljs-comment">//logger.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">log</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Log from logger&apos;</span>);
}</code></pre><p>&#x542F;&#x52A8;&#x6587;&#x4EF6;&#x7684;&#x6A21;&#x5757;&#x6570;&#x7EC4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
    /* 0 */
    (function (module, __webpack_exports__, __webpack_require__) {

        &quot;use strict&quot;;
        Object.defineProperty(__webpack_exports__, &quot;__esModule&quot;, {
            value: true
        });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__logger__ = __webpack_require__(1);

        console.log(&apos;Hello Dickens&apos;);

        Object(__WEBPACK_IMPORTED_MODULE_0__logger__[&quot;a&quot; /* default */ ])();
    }),
    /* 1 */
    (function (module, __webpack_exports__, __webpack_require__) {
    
        &quot;use strict&quot;;
        /* harmony export (immutable) */
        __webpack_exports__[&quot;a&quot;] = log;

        function log() {
            console.log(&apos;Log from logger&apos;);
        }
    })
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">[
    <span class="hljs-comment">/* 0 */</span>
    (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, __webpack_exports__, __webpack_require__</span>) </span>{
<span class="hljs-meta">
        &quot;use strict&quot;</span>;
        <span class="hljs-built_in">Object</span>.defineProperty(__webpack_exports__, <span class="hljs-string">&quot;__esModule&quot;</span>, {
            <span class="hljs-attr">value</span>: <span class="hljs-literal">true</span>
        });
        <span class="hljs-comment">/* harmony import */</span>
        <span class="hljs-keyword">var</span> __WEBPACK_IMPORTED_MODULE_0__logger__ = __webpack_require__(<span class="hljs-number">1</span>);

        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Hello Dickens&apos;</span>);

        <span class="hljs-built_in">Object</span>(__WEBPACK_IMPORTED_MODULE_0__logger__[<span class="hljs-string">&quot;a&quot;</span> <span class="hljs-comment">/* default */</span> ])();
    }),
    <span class="hljs-comment">/* 1 */</span>
    (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, __webpack_exports__, __webpack_require__</span>) </span>{
<span class="hljs-meta">    
        &quot;use strict&quot;</span>;
        <span class="hljs-comment">/* harmony export (immutable) */</span>
        __webpack_exports__[<span class="hljs-string">&quot;a&quot;</span>] = log;

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">log</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Log from logger&apos;</span>);
        }
    })
]</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x73B0;&#x5728;&#x6709;2&#x4E2A;&#x6A21;&#x5757;&#xFF0C;&#x6BCF;&#x4E2A;&#x6A21;&#x5757;&#x7684;&#x5305;&#x88F9;&#x51FD;&#x6570;&#x90FD;&#x4F20;&#x5165;&#x4E86;<code>module, __webpack_exports__, __webpack_require__</code>&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x5B83;&#x4EEC;&#x662F;&#x901A;&#x8FC7;&#x4E0A;&#x6587;&#x63D0;&#x5230;&#x7684;<code>__webpack_require__</code>&#x6CE8;&#x5165;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6267;&#x884C;&#x6A21;&#x5757;&#x4EE3;&#x7801;
modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x6267;&#x884C;&#x6A21;&#x5757;&#x4EE3;&#x7801;</span>
modules[moduleId].call(<span class="hljs-built_in">module</span>.exports, <span class="hljs-built_in">module</span>, <span class="hljs-built_in">module</span>.exports, __webpack_require__);</code></pre><p>&#x6267;&#x884C;&#x7684;&#x7ED3;&#x679C;&#x4E5F;&#x4FDD;&#x5B58;&#x5728;&#x7F13;&#x5B58;&#x5BF9;&#x8C61;&#x4E2D;&#x4E86;&#x3002;</p><ul><li><h3 id="articleHeader2">&#x6309;&#x9700;&#x52A0;&#x8F7D;</h3></li></ul><p>&#x518D;&#x5BF9;&#x4EE3;&#x7801;&#x8FDB;&#x884C;&#x6539;&#x9020;&#xFF0C;&#x6765;&#x7814;&#x7A76;webpack&#x662F;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x52A8;&#x6001;&#x52A0;&#x8F7D;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js
console.log(&apos;Hello Dickens&apos;);

import(&apos;./logger&apos;).then(logger =&gt; {
    logger.default();
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// main.js</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Hello Dickens&apos;</span>);

<span class="hljs-keyword">import</span>(<span class="hljs-string">&apos;./logger&apos;</span>).then(<span class="hljs-function"><span class="hljs-params">logger</span> =&gt;</span> {
    logger.default();
});</code></pre><p>logger&#x6587;&#x4EF6;&#x4FDD;&#x6301;&#x4E0D;&#x53D8;&#xFF0C;&#x7F16;&#x8BD1;&#x540E;&#x6BD4;&#x4E4B;&#x524D;&#x591A;&#x51FA;&#x4E86;1&#x4E2A;chunk&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbhujm?w=474&amp;h=137" src="https://static.alili.tech/img/bVbhujm?w=474&amp;h=137" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>bundle_asy&#x7684;&#x5185;&#x5BB9;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function (modules) {
    // &#x52A0;&#x8F7D;&#x6210;&#x529F;&#x540E;&#x7684;JSONP&#x56DE;&#x8C03;&#x51FD;&#x6570;
    var parentJsonpFunction = window[&quot;webpackJsonp&quot;];

    // &#x52A0;&#x8F7D;&#x6210;&#x529F;&#x540E;&#x7684;JSONP&#x56DE;&#x8C03;&#x51FD;&#x6570;
    window[&quot;webpackJsonp&quot;] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
        var moduleId, chunkId, i = 0,
            resolves = [],
            result;

        for (; i &lt; chunkIds.length; i++) {
            chunkId = chunkIds[i];
            
            // installedChunks[chunkId]&#x4E0D;&#x4E3A;0&#x4E14;&#x4E0D;&#x4E3A;undefined&#xFF0C;&#x5C06;&#x5176;&#x653E;&#x5165;&#x52A0;&#x8F7D;&#x6210;&#x529F;&#x6570;&#x7EC4;
            if (installedChunks[chunkId]) {
                // promise&#x7684;resolve
                resolves.push(installedChunks[chunkId][0]);
            }
            
            // &#x6807;&#x8BB0;&#x6A21;&#x5757;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;
            installedChunks[chunkId] = 0;
        }

        // &#x5C06;&#x52A8;&#x6001;&#x52A0;&#x8F7D;&#x7684;&#x6A21;&#x5757;&#x6DFB;&#x52A0;&#x5230;modules&#x6570;&#x7EC4;&#x4E2D;&#xFF0C;&#x4EE5;&#x4F9B;&#x540E;&#x7EED;&#x7684;require&#x4F7F;&#x7528;
        for (moduleId in moreModules) {
            if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
                modules[moduleId] = moreModules[moduleId];
            }
        }

        if (parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);

        while (resolves.length) {
            resolves.shift()();
        }
    };

    // &#x6A21;&#x5757;&#x7F13;&#x5B58;&#x5BF9;&#x8C61;
    var installedModules = {};

    // &#x8BB0;&#x5F55;&#x6B63;&#x5728;&#x52A0;&#x8F7D;&#x548C;&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;&#x7684;chunk&#x7684;&#x5BF9;&#x8C61;&#xFF0C;0&#x8868;&#x793A;&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;&#x6210;&#x529F;
    // 1&#x662F;&#x5F53;&#x524D;&#x6A21;&#x5757;&#x7684;&#x7F16;&#x53F7;&#xFF0C;&#x5DF2;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;
    var installedChunks = {
        1: 0
    };

    // require&#x51FD;&#x6570;&#xFF0C;&#x8DDF;&#x4E0A;&#x9762;&#x7684;&#x4E00;&#x6837;
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }

        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

        module.l = true;

        return module.exports;
    }

    // &#x6309;&#x9700;&#x52A0;&#x8F7D;&#xFF0C;&#x901A;&#x8FC7;&#x52A8;&#x6001;&#x6DFB;&#x52A0;script&#x6807;&#x7B7E;&#x5B9E;&#x73B0;
    __webpack_require__.e = function requireEnsure(chunkId) {
        var installedChunkData = installedChunks[chunkId];

        // chunk&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;&#x6210;&#x529F;
        if (installedChunkData === 0) {
            return new Promise(function (resolve) {
                resolve();
            });
        }

        // &#x52A0;&#x8F7D;&#x4E2D;&#xFF0C;&#x8FD4;&#x56DE;&#x4E4B;&#x524D;&#x521B;&#x5EFA;&#x7684;promise&#xFF08;&#x6570;&#x7EC4;&#x4E0B;&#x6807;&#x4E3A;2&#xFF09;
        if (installedChunkData) {
            return installedChunkData[2];
        }

        // &#x5C06;promise&#x76F8;&#x5173;&#x51FD;&#x6570;&#x4FDD;&#x6301;&#x5230;installedChunks&#x4E2D;&#x65B9;&#x4FBF;&#x540E;&#x7EED;resolve&#x6216;reject
        var promise = new Promise(function (resolve, reject) {
            installedChunkData = installedChunks[chunkId] = [resolve, reject];
        });
        installedChunkData[2] = promise;

        // &#x542F;&#x52A8;chunk&#x7684;&#x5F02;&#x6B65;&#x52A0;&#x8F7D;
        var head = document.getElementsByTagName(&apos;head&apos;)[0];
        var script = document.createElement(&apos;script&apos;);
        script.type = &apos;text/javascript&apos;;
        script.charset = &apos;utf-8&apos;;
        script.async = true;
        script.timeout = 120000;
        if (__webpack_require__.nc) {
            script.setAttribute(&quot;nonce&quot;, __webpack_require__.nc);
        }
        script.src = __webpack_require__.p + &quot;&quot; + chunkId + &quot;.bundle_async.js&quot;;
        script.onerror = script.onload = onScriptComplete;
        var timeout = setTimeout(onScriptComplete, 120000);

        function onScriptComplete() {
            script.onerror = script.onload = null;
            
            clearTimeout(timeout);
            
            var chunk = installedChunks[chunkId];
            
            // &#x6B63;&#x5E38;&#x7684;&#x6D41;&#x7A0B;&#xFF0C;&#x6A21;&#x5757;&#x52A0;&#x8F7D;&#x5B8C;&#x540E;&#x4F1A;&#x8C03;&#x7528;webpackJsonp&#x65B9;&#x6CD5;&#xFF0C;&#x5C06;chunk&#x7F6E;&#x4E3A;0
            // &#x5982;&#x679C;&#x4E0D;&#x4E3A;0&#xFF0C;&#x5219;&#x53EF;&#x80FD;&#x662F;&#x52A0;&#x8F7D;&#x5931;&#x8D25;&#x6216;&#x8005;&#x8D85;&#x65F6;
            if (chunk !== 0) {
                if (chunk) {
                    // &#x8C03;&#x7528;promise&#x7684;reject
                    chunk[1](new Error(&apos;Loading chunk &apos; + chunkId + &apos; failed.&apos;));
                }
                installedChunks[chunkId] = undefined;
            }
        };
        
        head.appendChild(script);
        
        return promise;
    };

    ...
    
    // &#x52A0;&#x8F7D;&#x5165;&#x53E3;&#x6A21;&#x5757;
    return __webpack_require__(__webpack_require__.s = 0);
})
([
    /* 0 */
    (function (module, exports, __webpack_require__) {

        console.log(&apos;Hello Dickens&apos;);

        // promise resolve&#x540E;&#xFF0C;&#x4F1A;&#x6307;&#x5B9A;&#x52A0;&#x8F7D;&#x54EA;&#x4E2A;&#x6A21;&#x5757;
        __webpack_require__.e /* import() */(0)
            .then(__webpack_require__.bind(null, 1))
            .then(logger =&gt; {
                logger.default();
            });
    })
]);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">modules</span>) </span>{
    <span class="hljs-comment">// &#x52A0;&#x8F7D;&#x6210;&#x529F;&#x540E;&#x7684;JSONP&#x56DE;&#x8C03;&#x51FD;&#x6570;</span>
    <span class="hljs-keyword">var</span> parentJsonpFunction = <span class="hljs-built_in">window</span>[<span class="hljs-string">&quot;webpackJsonp&quot;</span>];

    <span class="hljs-comment">// &#x52A0;&#x8F7D;&#x6210;&#x529F;&#x540E;&#x7684;JSONP&#x56DE;&#x8C03;&#x51FD;&#x6570;</span>
    <span class="hljs-built_in">window</span>[<span class="hljs-string">&quot;webpackJsonp&quot;</span>] = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">webpackJsonpCallback</span>(<span class="hljs-params">chunkIds, moreModules, executeModules</span>) </span>{
        <span class="hljs-keyword">var</span> moduleId, chunkId, i = <span class="hljs-number">0</span>,
            resolves = [],
            result;

        <span class="hljs-keyword">for</span> (; i &lt; chunkIds.length; i++) {
            chunkId = chunkIds[i];
            
            <span class="hljs-comment">// installedChunks[chunkId]&#x4E0D;&#x4E3A;0&#x4E14;&#x4E0D;&#x4E3A;undefined&#xFF0C;&#x5C06;&#x5176;&#x653E;&#x5165;&#x52A0;&#x8F7D;&#x6210;&#x529F;&#x6570;&#x7EC4;</span>
            <span class="hljs-keyword">if</span> (installedChunks[chunkId]) {
                <span class="hljs-comment">// promise&#x7684;resolve</span>
                resolves.push(installedChunks[chunkId][<span class="hljs-number">0</span>]);
            }
            
            <span class="hljs-comment">// &#x6807;&#x8BB0;&#x6A21;&#x5757;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;</span>
            installedChunks[chunkId] = <span class="hljs-number">0</span>;
        }

        <span class="hljs-comment">// &#x5C06;&#x52A8;&#x6001;&#x52A0;&#x8F7D;&#x7684;&#x6A21;&#x5757;&#x6DFB;&#x52A0;&#x5230;modules&#x6570;&#x7EC4;&#x4E2D;&#xFF0C;&#x4EE5;&#x4F9B;&#x540E;&#x7EED;&#x7684;require&#x4F7F;&#x7528;</span>
        <span class="hljs-keyword">for</span> (moduleId <span class="hljs-keyword">in</span> moreModules) {
            <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(moreModules, moduleId)) {
                modules[moduleId] = moreModules[moduleId];
            }
        }

        <span class="hljs-keyword">if</span> (parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);

        <span class="hljs-keyword">while</span> (resolves.length) {
            resolves.shift()();
        }
    };

    <span class="hljs-comment">// &#x6A21;&#x5757;&#x7F13;&#x5B58;&#x5BF9;&#x8C61;</span>
    <span class="hljs-keyword">var</span> installedModules = {};

    <span class="hljs-comment">// &#x8BB0;&#x5F55;&#x6B63;&#x5728;&#x52A0;&#x8F7D;&#x548C;&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;&#x7684;chunk&#x7684;&#x5BF9;&#x8C61;&#xFF0C;0&#x8868;&#x793A;&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;&#x6210;&#x529F;</span>
    <span class="hljs-comment">// 1&#x662F;&#x5F53;&#x524D;&#x6A21;&#x5757;&#x7684;&#x7F16;&#x53F7;&#xFF0C;&#x5DF2;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;</span>
    <span class="hljs-keyword">var</span> installedChunks = {
        <span class="hljs-number">1</span>: <span class="hljs-number">0</span>
    };

    <span class="hljs-comment">// require&#x51FD;&#x6570;&#xFF0C;&#x8DDF;&#x4E0A;&#x9762;&#x7684;&#x4E00;&#x6837;</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">__webpack_require__</span>(<span class="hljs-params">moduleId</span>) </span>{
        <span class="hljs-keyword">if</span> (installedModules[moduleId]) {
            <span class="hljs-keyword">return</span> installedModules[moduleId].exports;
        }

        <span class="hljs-keyword">var</span> <span class="hljs-built_in">module</span> = installedModules[moduleId] = {
            <span class="hljs-attr">i</span>: moduleId,
            <span class="hljs-attr">l</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">exports</span>: {}
        };

        modules[moduleId].call(<span class="hljs-built_in">module</span>.exports, <span class="hljs-built_in">module</span>, <span class="hljs-built_in">module</span>.exports, __webpack_require__);

        <span class="hljs-built_in">module</span>.l = <span class="hljs-literal">true</span>;

        <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>.exports;
    }

    <span class="hljs-comment">// &#x6309;&#x9700;&#x52A0;&#x8F7D;&#xFF0C;&#x901A;&#x8FC7;&#x52A8;&#x6001;&#x6DFB;&#x52A0;script&#x6807;&#x7B7E;&#x5B9E;&#x73B0;</span>
    __webpack_require__.e = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">requireEnsure</span>(<span class="hljs-params">chunkId</span>) </span>{
        <span class="hljs-keyword">var</span> installedChunkData = installedChunks[chunkId];

        <span class="hljs-comment">// chunk&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;&#x6210;&#x529F;</span>
        <span class="hljs-keyword">if</span> (installedChunkData === <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
                resolve();
            });
        }

        <span class="hljs-comment">// &#x52A0;&#x8F7D;&#x4E2D;&#xFF0C;&#x8FD4;&#x56DE;&#x4E4B;&#x524D;&#x521B;&#x5EFA;&#x7684;promise&#xFF08;&#x6570;&#x7EC4;&#x4E0B;&#x6807;&#x4E3A;2&#xFF09;</span>
        <span class="hljs-keyword">if</span> (installedChunkData) {
            <span class="hljs-keyword">return</span> installedChunkData[<span class="hljs-number">2</span>];
        }

        <span class="hljs-comment">// &#x5C06;promise&#x76F8;&#x5173;&#x51FD;&#x6570;&#x4FDD;&#x6301;&#x5230;installedChunks&#x4E2D;&#x65B9;&#x4FBF;&#x540E;&#x7EED;resolve&#x6216;reject</span>
        <span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
            installedChunkData = installedChunks[chunkId] = [resolve, reject];
        });
        installedChunkData[<span class="hljs-number">2</span>] = promise;

        <span class="hljs-comment">// &#x542F;&#x52A8;chunk&#x7684;&#x5F02;&#x6B65;&#x52A0;&#x8F7D;</span>
        <span class="hljs-keyword">var</span> head = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">&apos;head&apos;</span>)[<span class="hljs-number">0</span>];
        <span class="hljs-keyword">var</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;script&apos;</span>);
        script.type = <span class="hljs-string">&apos;text/javascript&apos;</span>;
        script.charset = <span class="hljs-string">&apos;utf-8&apos;</span>;
        script.async = <span class="hljs-literal">true</span>;
        script.timeout = <span class="hljs-number">120000</span>;
        <span class="hljs-keyword">if</span> (__webpack_require__.nc) {
            script.setAttribute(<span class="hljs-string">&quot;nonce&quot;</span>, __webpack_require__.nc);
        }
        script.src = __webpack_require__.p + <span class="hljs-string">&quot;&quot;</span> + chunkId + <span class="hljs-string">&quot;.bundle_async.js&quot;</span>;
        script.onerror = script.onload = onScriptComplete;
        <span class="hljs-keyword">var</span> timeout = setTimeout(onScriptComplete, <span class="hljs-number">120000</span>);

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onScriptComplete</span>(<span class="hljs-params"></span>) </span>{
            script.onerror = script.onload = <span class="hljs-literal">null</span>;
            
            clearTimeout(timeout);
            
            <span class="hljs-keyword">var</span> chunk = installedChunks[chunkId];
            
            <span class="hljs-comment">// &#x6B63;&#x5E38;&#x7684;&#x6D41;&#x7A0B;&#xFF0C;&#x6A21;&#x5757;&#x52A0;&#x8F7D;&#x5B8C;&#x540E;&#x4F1A;&#x8C03;&#x7528;webpackJsonp&#x65B9;&#x6CD5;&#xFF0C;&#x5C06;chunk&#x7F6E;&#x4E3A;0</span>
            <span class="hljs-comment">// &#x5982;&#x679C;&#x4E0D;&#x4E3A;0&#xFF0C;&#x5219;&#x53EF;&#x80FD;&#x662F;&#x52A0;&#x8F7D;&#x5931;&#x8D25;&#x6216;&#x8005;&#x8D85;&#x65F6;</span>
            <span class="hljs-keyword">if</span> (chunk !== <span class="hljs-number">0</span>) {
                <span class="hljs-keyword">if</span> (chunk) {
                    <span class="hljs-comment">// &#x8C03;&#x7528;promise&#x7684;reject</span>
                    chunk[<span class="hljs-number">1</span>](<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&apos;Loading chunk &apos;</span> + chunkId + <span class="hljs-string">&apos; failed.&apos;</span>));
                }
                installedChunks[chunkId] = <span class="hljs-literal">undefined</span>;
            }
        };
        
        head.appendChild(script);
        
        <span class="hljs-keyword">return</span> promise;
    };

    ...
    
    <span class="hljs-comment">// &#x52A0;&#x8F7D;&#x5165;&#x53E3;&#x6A21;&#x5757;</span>
    <span class="hljs-keyword">return</span> __webpack_require__(__webpack_require__.s = <span class="hljs-number">0</span>);
})
([
    <span class="hljs-comment">/* 0 */</span>
    (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, exports, __webpack_require__</span>) </span>{

        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Hello Dickens&apos;</span>);

        <span class="hljs-comment">// promise resolve&#x540E;&#xFF0C;&#x4F1A;&#x6307;&#x5B9A;&#x52A0;&#x8F7D;&#x54EA;&#x4E2A;&#x6A21;&#x5757;</span>
        __webpack_require__.e <span class="hljs-comment">/* import() */</span>(<span class="hljs-number">0</span>)
            .then(__webpack_require__.bind(<span class="hljs-literal">null</span>, <span class="hljs-number">1</span>))
            .then(<span class="hljs-function"><span class="hljs-params">logger</span> =&gt;</span> {
                logger.default();
            });
    })
]);</code></pre><p>&#x6302;&#x5728;&#x5230;window&#x4E0B;&#x9762;&#x7684;webpackJsonp&#x51FD;&#x6570;&#x662F;&#x52A8;&#x6001;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x4EE3;&#x7801;&#x4E0B;&#x8F7D;&#x540E;&#x7684;&#x56DE;&#x8C03;&#xFF0C;&#x5B83;&#x4F1A;&#x901A;&#x77E5;webpack&#x6A21;&#x5757;&#x4E0B;&#x8F7D;&#x5B8C;&#x6210;&#x5E76;&#x5C06;&#x6A21;&#x5757;&#x52A0;&#x5165;&#x5230;<code>modules</code>&#x5F53;&#x4E2D;&#x3002;</p><p><code>__webpack_require__.e</code>&#x51FD;&#x6570;&#x662F;&#x52A8;&#x6001;&#x52A0;&#x8F7D;&#x7684;&#x6838;&#x5FC3;&#x5B9E;&#x73B0;&#xFF0C;&#x5B83;&#x901A;&#x8FC7;&#x52A8;&#x6001;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;script&#x6807;&#x7B7E;&#x6765;&#x5B9E;&#x73B0;&#x4EE3;&#x7801;&#x7684;&#x5F02;&#x6B65;&#x52A0;&#x8F7D;&#x3002;&#x52A0;&#x8F7D;&#x5F00;&#x59CB;&#x524D;&#x4F1A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;promise&#x5B58;&#x5230;installedChunks&#x5BF9;&#x8C61;&#x5F53;&#x4E2D;&#xFF0C;&#x52A0;&#x8F7D;&#x6210;&#x529F;&#x5219;&#x8C03;&#x7528;resolve&#xFF0C;&#x5931;&#x8D25;&#x5219;&#x8C03;&#x7528;reject&#x3002;resolve&#x540E;&#x4E0D;&#x4F1A;&#x4F20;&#x5165;&#x6A21;&#x5757;&#x672C;&#x8EAB;&#xFF0C;&#x800C;&#x662F;&#x901A;&#x8FC7;<code>__webpack_require__</code>&#x6765;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x5185;&#x5BB9;&#xFF0C;require&#x7684;&#x6A21;&#x5757;id&#x7531;webpack&#x6765;&#x751F;&#x6210;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="__webpack_require__.e /* import() */(0)
    .then(__webpack_require__.bind(null, 1))
    .then(logger =&gt; {
        logger.default();
    });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">__webpack_require__.e <span class="hljs-comment">/* import() */</span>(<span class="hljs-number">0</span>)
    .then(__webpack_require__.bind(<span class="hljs-literal">null</span>, <span class="hljs-number">1</span>))
    .then(<span class="hljs-function"><span class="hljs-params">logger</span> =&gt;</span> {
        logger.default();
    });</code></pre><p>&#x8FD9;&#x91CC;&#x4E4B;&#x6240;&#x4EE5;&#x8981;&#x52A0;&#x4E0A;default&#x662F;&#x56E0;&#x4E3A;&#x9047;&#x5230;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#x65F6;&#xFF0C;&#x5982;&#x679C;&#x4F7F;&#x7528;&#x7684;&#x662F;ES Module&#xFF0C;webpack&#x4F1A;&#x5C06;<code>export default</code>&#x7F16;&#x8BD1;&#x6210;<code>__webpack_exports__</code>&#x5BF9;&#x8C61;&#x7684;<code>default</code>&#x5C5E;&#x6027;&#xFF08;&#x611F;&#x8C22;@MrCanJu&#x7684;&#x6307;&#x6B63;&#xFF09;&#x3002;&#x8BE6;&#x7EC6;&#x8BF7;&#x770B;&#x52A8;&#x6001;&#x52A0;&#x8F7D;&#x7684;chunk&#x7684;&#x4EE3;&#x7801;&#xFF0C;0.bundle_asy&#x7684;&#x5185;&#x5BB9;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpackJsonp([0], [
    /* 0 */
    ,
    /* 1 */
    (function (module, __webpack_exports__, __webpack_require__) {

        &quot;use strict&quot;;
        Object.defineProperty(__webpack_exports__, &quot;__esModule&quot;, {
            value: true
        });
        /* harmony export (immutable) */
        __webpack_exports__[&quot;default&quot;] = log;

        function log() {
            console.log(&apos;Log from logger&apos;);
        }
    })
]);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">webpackJsonp([<span class="hljs-number">0</span>], [
    <span class="hljs-comment">/* 0 */</span>
    ,
    <span class="hljs-comment">/* 1 */</span>
    (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, __webpack_exports__, __webpack_require__</span>) </span>{
<span class="hljs-meta">
        &quot;use strict&quot;</span>;
        <span class="hljs-built_in">Object</span>.defineProperty(__webpack_exports__, <span class="hljs-string">&quot;__esModule&quot;</span>, {
            <span class="hljs-attr">value</span>: <span class="hljs-literal">true</span>
        });
        <span class="hljs-comment">/* harmony export (immutable) */</span>
        __webpack_exports__[<span class="hljs-string">&quot;default&quot;</span>] = log;

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">log</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Log from logger&apos;</span>);
        }
    })
]);</code></pre><p>&#x4EE3;&#x7801;&#x975E;&#x5E38;&#x597D;&#x7406;&#x89E3;&#xFF0C;&#x52A0;&#x8F7D;&#x6210;&#x529F;&#x540E;&#x7ACB;&#x5373;&#x8C03;&#x7528;&#x4E0A;&#x6587;&#x63D0;&#x5230;&#x7684;<code>webpackJsonp</code>&#x65B9;&#x6CD5;&#xFF0C;&#x5C06;chunkId&#x548C;&#x6A21;&#x5757;&#x5185;&#x5BB9;&#x4F20;&#x5165;&#x3002;&#x8FD9;&#x91CC;&#x8981;&#x5206;&#x6E05;2&#x4E2A;&#x6982;&#x5FF5;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;chunkId&#xFF0C;&#x4E00;&#x4E2A;moduleId&#x3002;&#x8FD9;&#x4E2A;chunk&#x7684;chunkId&#x662F;0&#xFF0C;&#x91CC;&#x9762;&#x53EA;&#x5305;&#x542B;&#x4E00;&#x4E2A;module&#xFF0C;moduleId&#x662F;1&#x3002;&#x4E00;&#x4E2A;chunk&#x91CC;&#x9762;&#x53EF;&#x4EE5;&#x5305;&#x542B;&#x591A;&#x4E2A;module&#x3002;</p><ul><li><h3 id="articleHeader3">&#x603B;&#x7ED3;</h3></li></ul><p>&#x672C;&#x6587;&#x901A;&#x8FC7;&#x5206;&#x6790;webpack&#x751F;&#x6210;&#x7684;&#x542F;&#x52A8;&#x4EE3;&#x7801;&#xFF0C;&#x8BB2;&#x89E3;&#x4E86;webpack&#x662F;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x6A21;&#x5757;&#x7BA1;&#x7406;&#x548C;&#x52A8;&#x6001;&#x52A0;&#x8F7D;&#x7684;&#xFF0C;&#x5E0C;&#x671B;&#x5BF9;&#x4F60;&#x6709;&#x6240;&#x5E2E;&#x52A9;&#x3002;</p><p>&#x5982;&#x679C;&#x4F60;&#x5BF9;webpack&#x7684;&#x914D;&#x7F6E;&#x8C03;&#x4F18;&#x611F;&#x5174;&#x8DA3;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x770B;&#x6211;&#x4E4B;&#x524D;&#x5199;&#x7684;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#xFF1A;<a href="https://segmentfault.com/a/1190000016484002?_ea=4565036" target="_blank">webpack&#x8C03;&#x4F18;&#x603B;&#x7ED3;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack启动代码源码解读

## 原文链接
[https://segmentfault.com/a/1190000016524677](https://segmentfault.com/a/1190000016524677)

