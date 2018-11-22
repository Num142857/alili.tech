---
title: 'Babel转码关于 "super" 的注意事项' 
date: 2018-11-23 2:30:11
hidden: true
slug: 47snmk9qtvb
categories: [reprint]
---

{{< raw >}}
<p>&#x4E8B;&#x60C5;&#x7684;&#x8D77;&#x56E0;&#x662F;&#x5728;&#x95EE;&#x7B54;&#x4E0A;&#x770B;&#x5230;&#x4E00;&#x4E2A;&#x670B;&#x53CB;&#x7684;&#x63D0;&#x95EE;&#xFF0C;&#x95EE;&#x7684;&#x662F;&#x962E;&#x4E00;&#x5CF0;&#x8001;&#x5E08; <a href="http://es6.ruanyifeng.com" rel="nofollow noreferrer" target="_blank">ECMAScript 6 &#x5165;&#x95E8;</a> &#x4E0A;&#x5173;&#x4E8E;super&#x5173;&#x952E;&#x5B57;&#x7684;&#x4E00;&#x6BB5;&#x4EE3;&#x7801;&#x95EE;&#x9898;&#xFF0C;&#x4E0B;&#x9762;&#x662F;&#x8FD9;&#x4E2A;&#x4EE3;&#x7801;&#x7684;&#x622A;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbdC3Z?w=621&amp;h=477" src="https://static.alili.tech/img/bVbdC3Z?w=621&amp;h=477" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x8FD9;&#x4F4D;&#x697C;&#x4E3B;&#x8BF4;&#x4ED6;&#x89C9;&#x5F97; <code>this.x</code> &#x7684;&#x503C;&#x4E0D;&#x662F;3&#xFF0C;&#x4E0B;&#x9762;&#x6709;&#x7F51;&#x53CB;&#x8BF4;&#x628A;&#x4EE3;&#x7801;&#x7C98;&#x8D34;&#x5230; chrome &#x63A7;&#x5236;&#x53F0;&#x4E00;&#x8BD5;&#x5C31;&#x662F;&#x8FD9;&#x7ED3;&#x679C;&#x6CA1;&#x9519;&#xFF0C;&#x540E;&#x6765;&#x697C;&#x4E3B;&#x8BF4;&#x662F;&#x4ED6;&#x60F3;&#x9519;&#x4E86;&#x3002;&#x6211;&#x4E5F;&#x987A;&#x4FBF;&#x628A;&#x4EE3;&#x7801;&#x7C98;&#x8D34;&#x5230; chome &#x4E0B;&#x6267;&#x884C;&#x540E;&#x7B54;&#x6848;&#x4E5F;&#x786E;&#x5B9E;&#x662F;3&#x3002;</p><p>&#x672C;&#x6765;&#x8FD9;&#x4E2A;&#x4E8B;&#x6CA1;&#x5565;&#x5C31;&#x7ED3;&#x675F;&#x4E86;&#xFF0C;&#x6B63;&#x597D;&#x6211;&#x5F00;&#x7740; WebStorm &#x51C6;&#x5907;&#x5199;&#x4EE3;&#x7801;&#xFF0C;&#x987A;&#x624B;&#x7C98;&#x8D34;&#x5230;&#x4EE3;&#x7801;&#x6587;&#x4EF6;&#x91CC;&#x9762;&#xFF0C;&#x4FDD;&#x5B58; &gt; webpack&#x6253;&#x5305; &gt; &#x5237;&#x65B0;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x7785;&#x4E86;&#x4E00;&#x773C; Console&#xFF1A;</p><p><img src="https://static.alili.techundefined" class="emoji" alt="scream" title="scream"> <strong>&#xFF01;&#x8FD9;&#x662F;&#x795E;&#x9A6C;&#x60C5;&#x51B5;&#xFF0C;&#x8F93;&#x51FA;&#x7ADF;&#x7136;&#x662F;2&#xFF01;</strong></p><h2 id="articleHeader0">&#x95EE;&#x9898;&#x5206;&#x6790;</h2><p>&#x4E3A;&#x5565;&#x4E0E; chrome &#x76F4;&#x63A5;&#x8FD0;&#x884C;&#x7684;&#x7ED3;&#x679C;&#x4E0D;&#x4E00;&#x81F4;&#x5462;&#xFF1F;&#x60F3;&#x4E86;&#x60F3;&#x95EE;&#x9898;&#x5E94;&#x8BE5;&#x51FA;&#x5728; Babel &#x8F6C;&#x7801;&#x4E0A;&#x3002;&#x9A6C;&#x4E0A;&#x6253;&#x5F00;&#x8F6C;&#x7801;&#x540E;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x5B9A;&#x4F4D;&#x5230;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x7684;&#x4F4D;&#x7F6E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var B = function (_A) {
    _inherits(B, _A);

    function B() {
        _classCallCheck(this, B);

        var _this = _possibleConstructorReturn(this, (B.__proto__ || Object.getPrototypeOf(B)).call(this));

        _this.x = 2;
        _set(B.prototype.__proto__ || Object.getPrototypeOf(B.prototype), &apos;x&apos;, 3, _this);
        console.log(_get(B.prototype.__proto__ || Object.getPrototypeOf(B.prototype), &apos;x&apos;, _this)); // undefined
        console.log(_this.x); // 3
        return _this;
    }

    return B;
}(A);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> B = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_A</span>) </span>{
    _inherits(B, _A);

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">B</span>(<span class="hljs-params"></span>) </span>{
        _classCallCheck(<span class="hljs-keyword">this</span>, B);

        <span class="hljs-keyword">var</span> _this = _possibleConstructorReturn(<span class="hljs-keyword">this</span>, (B.__proto__ || <span class="hljs-built_in">Object</span>.getPrototypeOf(B)).call(<span class="hljs-keyword">this</span>));

        _this.x = <span class="hljs-number">2</span>;
        _set(B.prototype.__proto__ || <span class="hljs-built_in">Object</span>.getPrototypeOf(B.prototype), <span class="hljs-string">&apos;x&apos;</span>, <span class="hljs-number">3</span>, _this);
        <span class="hljs-built_in">console</span>.log(_get(B.prototype.__proto__ || <span class="hljs-built_in">Object</span>.getPrototypeOf(B.prototype), <span class="hljs-string">&apos;x&apos;</span>, _this)); <span class="hljs-comment">// undefined</span>
        <span class="hljs-built_in">console</span>.log(_this.x); <span class="hljs-comment">// 3</span>
        <span class="hljs-keyword">return</span> _this;
    }

    <span class="hljs-keyword">return</span> B;
}(A);</code></pre><p><code>super.x = 3;</code> &#x5BF9;&#x5E94;&#x7684;&#x662F; <code>_set(B.prototype.__proto__ || Object.getPrototypeOf(B.prototype), &apos;x&apos;, 3, _this);</code> &#x8FD9;&#x91CC;&#x6709;&#x4E2A; <code>_set()</code> &#x51FD;&#x6570;&#xFF0C;&#x518D;&#x770B;&#x4E0B;&#x8FD9;&#x4E2A; <code>_set()</code> &#x662F;&#x5565;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _set = function set(object, property, value, receiver) {
    var desc = Object.getOwnPropertyDescriptor(object, property);
    if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent !== null) {
            set(parent, property, value, receiver);
        }
    } else if (&apos;value&apos; in desc &amp;&amp; desc.writable) {
        desc.value = value;
    } else {
        var setter = desc.set;
        if (setter !== undefined) {
            setter.call(receiver, value);
        }
    }
    return value;
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> _set = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">set</span>(<span class="hljs-params">object, property, value, receiver</span>) </span>{
    <span class="hljs-keyword">var</span> desc = <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(object, property);
    <span class="hljs-keyword">if</span> (desc === <span class="hljs-literal">undefined</span>) {
        <span class="hljs-keyword">var</span> parent = <span class="hljs-built_in">Object</span>.getPrototypeOf(object);
        <span class="hljs-keyword">if</span> (parent !== <span class="hljs-literal">null</span>) {
            set(parent, property, value, receiver);
        }
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-string">&apos;value&apos;</span> <span class="hljs-keyword">in</span> desc &amp;&amp; desc.writable) {
        desc.value = value;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">var</span> setter = desc.set;
        <span class="hljs-keyword">if</span> (setter !== <span class="hljs-literal">undefined</span>) {
            setter.call(receiver, value);
        }
    }
    <span class="hljs-keyword">return</span> value;
};</code></pre><p>&#x4ED4;&#x7EC6;&#x770B;&#x770B;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x540E;&#xFF0C;&#x660E;&#x767D;&#x662F;&#x600E;&#x4E48;&#x56DE;&#x4E8B;&#x4E86;&#x3002;&#x7ED3;&#x5408;&#x962E;&#x4E00;&#x5CF0;&#x8001;&#x5E08;&#x7684;&#x4EE3;&#x7801;&#x548C;&#x4E0A;&#x9762;&#x7684;&#x8F6C;&#x7801;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;<code>_set()</code> &#x4F20;&#x8FDB;&#x6765;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F; <code>B.prototype.__proto__</code> -- &#x4E5F;&#x5C31;&#x662F;A&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61; -- <code>A.prototype</code>&#xFF0C;&#x7B2C;&#x4E00;&#x53E5;&#x4EE3;&#x7801;&#x4F1A;&#x5148;&#x627E; <code>x&#x5C5E;&#x6027;</code> &#x7684;&#x63CF;&#x8FF0;&#x7B26;&#xFF0C;&#x5982;&#x679C;&#x627E;&#x4E0D;&#x5230;&#x7EE7;&#x7EED;&#x987A;&#x7740;&#x539F;&#x578B;&#x94FE;&#x627E;... &#x5F53;&#x7136;&#x662F;&#x627E;&#x4E0D;&#x5230;&#x7684;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x76F8;&#x5F53;&#x4E8E;&#x5565;&#x4E5F;&#x6CA1;&#x6267;&#x884C;&#xFF0C;<code>this.x</code> &#x7684;&#x503C;&#x4F9D;&#x7136;&#x662F;2&#x3002;</p><p>&#x5982;&#x679C;&#x6309;&#x7167;&#x8FD9;&#x4E2A; <code>_set()</code> &#x51FD;&#x6570;&#x7684;&#x903B;&#x8F91;&#xFF0C;&#x5728;&#x4EC0;&#x4E48;&#x60C5;&#x51B5;&#x4E0B; <code>this.x</code> &#x7684;&#x503C;&#x624D;&#x4F1A;&#x662F;3&#x5462;&#xFF1F;&#x8981;&#x6EE1;&#x8DB3;&#x4E24;&#x4E2A;&#x6761;&#x4EF6;&#xFF1A;</p><ol><li><code>A.prototype</code> &#x4E0A;&#x5FC5;&#x987B;&#x6709; <code>x</code> &#x5C5E;&#x6027;&#x5B9A;&#x4E49;</li><li>&#x8FD9;&#x4E2A; <code>x</code> &#x5C5E;&#x6027;&#x5B9A;&#x4E49;&#x4E0A;&#x8FD8;&#x5FC5;&#x987B;&#x5B9A;&#x4E49; <code>set</code> &#x8BBF;&#x95EE;&#x5668;</li></ol><p>&#x6BD4;&#x5982;&#x50CF;&#x4E0B;&#x9762;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.defineProperty(A.prototype, &apos;x&apos;, {
    get: function () {
        return this._x;
    },
    set: function (value) {
        this._x = value;
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Object</span>.defineProperty(A.prototype, <span class="hljs-string">&apos;x&apos;</span>, {
    <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._x;
    },
    <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
        <span class="hljs-keyword">this</span>._x = value;
    }
});</code></pre><p>&#x7136;&#x540E;&#x518D;&#x8DD1;&#x4E00;&#x628A;&#xFF0C;&#x679C;&#x7136; <code>this.x</code> &#x7684;&#x503C;&#x662F;3&#x4E86;&#xFF01;&#x7B49;&#x4E00;&#x4E0B;... &#x600E;&#x4E48; <code>console.log(super.x); // undefined</code> &#x8FD9;&#x53E5;&#x7684;&#x7ED3;&#x679C;&#x4E0D;&#x662F; undefined &#x4E5F;&#x662F;3&#x4E86;&#x5462;&#xFF1F;&#x770B;&#x4E0B;&#x8F6C;&#x7801;&#x90A3;&#x91CC;&#x8FD8;&#x6709;&#x4E2A; <code>_get()</code> &#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);
    if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    } else if (&quot;value&quot; in desc) {
        return desc.value;
    } else {
        var getter = desc.get;
        if (getter === undefined) {
            return undefined;
        }
        return getter.call(receiver);
    }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> _get = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">get</span>(<span class="hljs-params">object, property, receiver</span>) </span>{
    <span class="hljs-keyword">if</span> (object === <span class="hljs-literal">null</span>) object = <span class="hljs-built_in">Function</span>.prototype;
    <span class="hljs-keyword">var</span> desc = <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(object, property);
    <span class="hljs-keyword">if</span> (desc === <span class="hljs-literal">undefined</span>) {
        <span class="hljs-keyword">var</span> parent = <span class="hljs-built_in">Object</span>.getPrototypeOf(object);
        <span class="hljs-keyword">if</span> (parent === <span class="hljs-literal">null</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> get(parent, property, receiver);
        }
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-string">&quot;value&quot;</span> <span class="hljs-keyword">in</span> desc) {
        <span class="hljs-keyword">return</span> desc.value;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">var</span> getter = desc.get;
        <span class="hljs-keyword">if</span> (getter === <span class="hljs-literal">undefined</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;
        }
        <span class="hljs-keyword">return</span> getter.call(receiver);
    }
};</code></pre><p>&#x597D;&#x5427;&#xFF0C;&#x4EE3;&#x7801;&#x8D70;&#x5230;&#x6700;&#x540E; else &#x7684; <code>getter</code> &#x90A3;&#x91CC;&#x4E86;&#xFF0C;&#x81EA;&#x7136; <code>super.x</code> &#x7684;&#x8BFB;&#x53D6;&#x7ED3;&#x679C;&#x5C31;&#x662F;3&#x4E86; <img src="https://static.alili.techundefined" class="emoji" alt="joy" title="joy"></p><p>&#x76EE;&#x524D;&#x8FD8;&#x6CA1;&#x65F6;&#x95F4;&#x770B;&#x4E3A;&#x5565; Babel &#x8981;&#x8FD9;&#x4E48;&#x8F6C;&#x7801;&#x5904;&#x7406;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x6709;&#x7B54;&#x6848;&#x4E86;&#x6B22;&#x8FCE;&#x7559;&#x8A00;&#x8BA8;&#x8BBA;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Babel转码关于 "super" 的注意事项

## 原文链接
[https://segmentfault.com/a/1190000015603885](https://segmentfault.com/a/1190000015603885)

