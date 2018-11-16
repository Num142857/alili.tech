---
title: 分享一个好用的函数吧，将js中的对象转成url参数
hidden: true
categories: [reprint]
slug: 93c7e091
date: 2018-11-09 02:30:06
---

{{< raw >}}
<p>&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x5462;&#x662F;&#x81EA;&#x5DF1;&#x5728;&#x5199;&#x57FA;&#x4E8E;Vue+ElementUI&#x7BA1;&#x7406;&#x540E;&#x53F0;&#x65F6;&#x7528;&#x5230;&#x7684;,&#xFF0C;&#x4E0B;&#x9762;&#x5217;&#x51FA;&#x6765;&#x4E24;&#x79CD;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#xFF1A;</p><h3 id="articleHeader0">&#x6700;&#x666E;&#x901A;&#x7684;&#xFF0C;&#x5C01;&#x88C5;&#x4E00;&#x4E2A;<code>js</code>&#x51FD;&#x6570;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" /**
   * &#x5BF9;&#x8C61;&#x8F6C;url&#x53C2;&#x6570;
   * @param {*} data
   * @param {*} isPrefix
   */
 queryParams (data, isPrefix) {
    isPrefix = isPrefix ? isPrefix : false
    let prefix = isPrefix ? &apos;?&apos; : &apos;&apos;
    let _result = []
    for (let key in data) {
      let value = data[key]
      // &#x53BB;&#x6389;&#x4E3A;&#x7A7A;&#x7684;&#x53C2;&#x6570;
      if ([&apos;&apos;, undefined, null].includes(value)) {
        continue
      }
      if (value.constructor === Array) {
        value.forEach(_value =&gt; {
          _result.push(encodeURIComponent(key) + &apos;[]=&apos; + encodeURIComponent(_value))
        })
      } else {
        _result.push(encodeURIComponent(key) + &apos;=&apos; + encodeURIComponent(value))
      }
    }

    return _result.length ? prefix + _result.join(&apos;&amp;&apos;) : &apos;&apos;
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"> <span class="hljs-comment">/**
   * &#x5BF9;&#x8C61;&#x8F6C;url&#x53C2;&#x6570;
   * @param {*} data
   * @param {*} isPrefix
   */</span>
 queryParams (data, isPrefix) {
    isPrefix = isPrefix ? isPrefix : <span class="hljs-literal">false</span>
    <span class="hljs-keyword">let</span> prefix = isPrefix ? <span class="hljs-string">&apos;?&apos;</span> : <span class="hljs-string">&apos;&apos;</span>
    <span class="hljs-keyword">let</span> _result = []
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> data) {
      <span class="hljs-keyword">let</span> value = data[key]
      <span class="hljs-comment">// &#x53BB;&#x6389;&#x4E3A;&#x7A7A;&#x7684;&#x53C2;&#x6570;</span>
      <span class="hljs-keyword">if</span> ([<span class="hljs-string">&apos;&apos;</span>, <span class="hljs-literal">undefined</span>, <span class="hljs-literal">null</span>].includes(value)) {
        <span class="hljs-keyword">continue</span>
      }
      <span class="hljs-keyword">if</span> (value.constructor === <span class="hljs-built_in">Array</span>) {
        value.forEach(<span class="hljs-function"><span class="hljs-params">_value</span> =&gt;</span> {
          _result.push(<span class="hljs-built_in">encodeURIComponent</span>(key) + <span class="hljs-string">&apos;[]=&apos;</span> + <span class="hljs-built_in">encodeURIComponent</span>(_value))
        })
      } <span class="hljs-keyword">else</span> {
        _result.push(<span class="hljs-built_in">encodeURIComponent</span>(key) + <span class="hljs-string">&apos;=&apos;</span> + <span class="hljs-built_in">encodeURIComponent</span>(value))
      }
    }

    <span class="hljs-keyword">return</span> _result.length ? prefix + _result.join(<span class="hljs-string">&apos;&amp;&apos;</span>) : <span class="hljs-string">&apos;&apos;</span>
  }</code></pre><h3 id="articleHeader1">&#x5728;Vue&#x7EC4;&#x4EF6;&#x5316;&#x5F00;&#x53D1;&#x65F6;&#xFF0C;&#x6211;&#x662F;&#x8FD9;&#x6837;&#x5199;&#x7684;</h3><blockquote>&#x5199;&#x4E86;&#x4E00;&#x4E2A;&#x5DE5;&#x5177;&#x6587;&#x4EF6;<code>utils.js</code>&#xFF0C;&#x5C06;&#x5176;&#x4F5C;&#x4E3A;&#x5DE5;&#x5177;&#x5305;&#x5F15;&#x5165;Vue&#x7684;<code>main.js</code>&#xFF0C;&#x5E76;&#x5C06;&#x5176;&#x9644;&#x7ED9;<code>Vue</code>&#x539F;&#x578B;&#xFF0C;&#x8FD9;&#x6837;&#x5728;&#x6BCF;&#x4E2A;&#x7EC4;&#x4EF6;&#x4E2D;&#x5C31;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>this.$utils</code>&#x6765;&#x4F7F;&#x7528;&#x91CC;&#x9762;&#x7684;&#x4E00;&#x4E9B;&#x5DE5;&#x5177;&#x51FD;&#x6570;&#x4E86;</blockquote><h4><code>utils.js</code>&#x6587;&#x4EF6;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const utils = {
  /**
   * &#x5BF9;&#x8C61;&#x8F6C;url&#x53C2;&#x6570;
   * @param {*} data
   * @param {*} isPrefix
   */
  queryParams (data, isPrefix = false) {
    let prefix = isPrefix ? &apos;?&apos; : &apos;&apos;
    let _result = []
    for (let key in data) {
      let value = data[key]
      // &#x53BB;&#x6389;&#x4E3A;&#x7A7A;&#x7684;&#x53C2;&#x6570;
      if ([&apos;&apos;, undefined, null].includes(value)) {
        continue
      }
      if (value.constructor === Array) {
        value.forEach(_value =&gt; {
          _result.push(encodeURIComponent(key) + &apos;[]=&apos; + encodeURIComponent(_value))
        })
      } else {
        _result.push(encodeURIComponent(key) + &apos;=&apos; + encodeURIComponent(value))
      }
    }

    return _result.length ? prefix + _result.join(&apos;&amp;&apos;) : &apos;&apos;
  },

  // ....&#x5176;&#x4ED6;&#x51FD;&#x6570;....

}

export default utils
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> utils = {
  <span class="hljs-comment">/**
   * &#x5BF9;&#x8C61;&#x8F6C;url&#x53C2;&#x6570;
   * @param {*} data
   * @param {*} isPrefix
   */</span>
  queryParams (data, isPrefix = <span class="hljs-literal">false</span>) {
    <span class="hljs-keyword">let</span> prefix = isPrefix ? <span class="hljs-string">&apos;?&apos;</span> : <span class="hljs-string">&apos;&apos;</span>
    <span class="hljs-keyword">let</span> _result = []
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> data) {
      <span class="hljs-keyword">let</span> value = data[key]
      <span class="hljs-comment">// &#x53BB;&#x6389;&#x4E3A;&#x7A7A;&#x7684;&#x53C2;&#x6570;</span>
      <span class="hljs-keyword">if</span> ([<span class="hljs-string">&apos;&apos;</span>, <span class="hljs-literal">undefined</span>, <span class="hljs-literal">null</span>].includes(value)) {
        <span class="hljs-keyword">continue</span>
      }
      <span class="hljs-keyword">if</span> (value.constructor === <span class="hljs-built_in">Array</span>) {
        value.forEach(<span class="hljs-function"><span class="hljs-params">_value</span> =&gt;</span> {
          _result.push(<span class="hljs-built_in">encodeURIComponent</span>(key) + <span class="hljs-string">&apos;[]=&apos;</span> + <span class="hljs-built_in">encodeURIComponent</span>(_value))
        })
      } <span class="hljs-keyword">else</span> {
        _result.push(<span class="hljs-built_in">encodeURIComponent</span>(key) + <span class="hljs-string">&apos;=&apos;</span> + <span class="hljs-built_in">encodeURIComponent</span>(value))
      }
    }

    <span class="hljs-keyword">return</span> _result.length ? prefix + _result.join(<span class="hljs-string">&apos;&amp;&apos;</span>) : <span class="hljs-string">&apos;&apos;</span>
  },

  <span class="hljs-comment">// ....&#x5176;&#x4ED6;&#x51FD;&#x6570;....</span>

}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> utils
</code></pre><h4><code>main.js</code>&#x6587;&#x4EF6;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;
import App from &apos;./App.vue&apos;
import utils from &apos;@/utils/utils&apos;

// ...&#x5176;&#x4ED6;&#x4EE3;&#x7801;...

Vue.prototype.$utils = utils

// ...&#x5176;&#x4ED6;&#x4EE3;&#x7801;..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./App.vue&apos;</span>
<span class="hljs-keyword">import</span> utils <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/utils/utils&apos;</span>

<span class="hljs-comment">// ...&#x5176;&#x4ED6;&#x4EE3;&#x7801;...</span>

Vue.prototype.$utils = utils

<span class="hljs-comment">// ...&#x5176;&#x4ED6;&#x4EE3;&#x7801;...</span></code></pre><h4>&#x5728;&#x4F7F;&#x7528;&#x7684;&#x65F6;&#x5019;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x5199;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ....&#x5176;&#x4ED6;&#x4EE3;&#x7801;

this.$utils.queryParams(this.params)

// ...&#x5176;&#x4ED6;&#x4EE3;&#x7801;..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code class="javascipt"><span class="hljs-comment">// ....&#x5176;&#x4ED6;&#x4EE3;&#x7801;</span>

<span class="hljs-keyword">this</span>.$utils.queryParams(<span class="hljs-keyword">this</span>.params)

<span class="hljs-comment">// ...&#x5176;&#x4ED6;&#x4EE3;&#x7801;...</span></code></pre><blockquote>&#x5982;&#x679C;&#x6709;&#x5199;&#x7684;&#x4E0D;&#x5BF9;&#x6216;&#x8005;&#x4E0D;&#x5408;&#x9002;&#x7684;&#x5730;&#x65B9;&#x8BF7;&#x591A;&#x591A;&#x8D50;&#x6559;&#xFF0C;&#x6BD5;&#x7ADF;&#x6211;&#x8FD8;&#x662F;&#x4E2A;&#x524D;&#x7AEF;&#x5C0F;&#x83DC;&#x9E21;&#xFF0C;happy coding&#xFF01;</blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
分享一个好用的函数吧，将js中的对象转成url参数

## 原文链接
[https://segmentfault.com/a/1190000016416023](https://segmentfault.com/a/1190000016416023)

