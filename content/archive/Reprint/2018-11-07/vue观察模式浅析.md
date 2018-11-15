---
title: vue观察模式浅析
reprint: true
categories: reprint
abbrlink: 5e3e3550
date: 2018-11-07 02:30:16
---

{{% raw %}}
<p><strong><em>&#x4EE5;&#x4E0B;&#x662F;&#x6211;&#x5BF9;vue&#x89C2;&#x5BDF;&#x8005;&#x6A21;&#x5F0F;&#x7684;&#x7406;&#x89E3;:</em></strong><br>github L6zt</p><hr><p><strong>&#x52A0;&#x5165;tip 2018-10-14 &#x6700;&#x8FD1;&#x53C8;&#x770B;&#x5230;&#x300A;js&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x8BBE;&#x8BA1;&#x300B;&#x4E66; &#x63A8;&#x8350;&#x53BB;&#x6402;&#x6402;</strong><br><em>&#x4E0D;&#x8981;&#x5BF9;&#x6846;&#x67B6;&#x7684;&#x504F;&#x89C1;, &#x4F60;&#x771F;&#x7684;&#x4E86;&#x89E3;jquery&#x3001;angular&#x3001;react &#x7B49;&#x7B49;&#xFF0C;&#x6846;&#x67B6;&#x662F;&#x4EC0;&#x4E48;&#x53EA;&#x662F;&#x5DE5;&#x5177;&#x800C;&#x5DF2;&#x3002;</em><br>&#x4F60;&#x7528;&#x8FC7;jquery&#x7684; trigger&#x3001;on&#x3001;off &#x4E8B;&#x4EF6;&#x7ED1;&#x5B9A;&#x7684;&#x65B9;&#x6CD5;&#x5417;&#xFF1F;&#x4E8B;&#x5B9E;&#x4E0A; vue &#x4E0D;&#x8FC7;&#x4E5F;&#x662F;&#x8FD9;&#x79CD;&#x6A21;&#x5F0F;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;vue &#x662F;&#x81EA;&#x52A8;&#x8C03;&#x7528;on&#x65B9;&#x6CD5;&#xFF0C;&#x81EA;&#x52A8;&#x89E6;&#x53D1;trigger&#x3002;&#x751A;&#x81F3;&#x53EF;&#x4EE5;&#x4E0D;&#x7528;jquery&#x5BF9;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x89E6;&#x53D1;&#x7684;&#x5B9E;&#x73B0;&#x3002;&#x5176;&#x5B9E;&#x6700;&#x7EC8;&#x89E3;&#x91CA;&#x5C31;&#x662F;&#x5BF9;&#x67D0;&#x79CD;&#x4E8B;&#x4EF6;&#x7684;callback&#xFF08;&#x57FA;&#x7840;&#x539F;&#x7406;&#xFF09;&#x3002;<br>&#x4EE5;&#x4E0B;&#x662F;&#x6E90;&#x7801;&#x76EE;&#x5F55;&#x622A;&#x56FE;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbhnpx?w=696&amp;h=1276" src="https://static.alili.tech/img/bVbhnpx?w=696&amp;h=1276" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span><br>1... vue &#x5B9E;&#x4F8B;&#x521D;&#x59CB;&#x5316;&#x65F6;&#xFF0C;&#x4F1A;&#x5BF9;data&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x7684;&#x5BF9;&#x8C61;&#x91CC;&#x7684;&#x5C5E;&#x6027;&#x8C03;&#x7528;&#x4EE5;&#x4E0B;&#x65B9;&#x6CD5;&#xFF0C;&#x4EE3;&#x7801;&#x6CE8;&#x91CA;&#x5982;&#x4E0B;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // &#x8FD9;&#x4E2A;&#x662F; vue &#x7ED1;&#x5B9A;&#x81EA;&#x52A8;&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;&#x548C;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#x65B9;&#x6CD5;, &#x4F1A;&#x628A;data&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x7684;&#x5BF9;&#x8C61;&#x53D8;&#x91CF;&#x5C5E;&#x6027;&#xFF0C;&#x91CD;&#x5199;&#x5BF9;&#x5E94;&#x5C5E;&#x6027;&#x7684; &#x8D4B;&#x503C; &#x548C;&#x83B7;&#x53D6;&#x7684;&#x64CD;&#x4F5C;&#x3002;&#x5177;&#x4F53;&#x67E5;&#x770B; &#xFF08;mdn  Object.defineProperty api&#xFF09;
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      // watcher &#x5BF9;&#x8C61;&#xFF0C; &#x5982;&#x679C;&#x5B58;&#x5728;
      if (Dep.target) {
        // &#x628A;Watcher &#x5B9E;&#x4F8B; &#x63A8;&#x5165; Dep &#x5B9E;&#x4F8B;&#x7684; subs &#x6570;&#x7EC4;&#x91CC;&#xFF0C; &#x8FD9;&#x4E2A;&#x5C31;&#x76F8;&#x5F53;&#x4E8E; on
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal &amp;&amp; value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== &apos;production&apos; &amp;&amp; customSetter) {
        customSetter()
      }
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = !shallow &amp;&amp; observe(newVal)
      // &#x901A;&#x77E5; Dep &#x5B9E;&#x4F8B; &#x4E2D;subs &#x91CC;&#x6570;&#x7EC4; &#x4E2D;&#x6240;&#x6709; Watcher &#x5B9E;&#x4F8B;, &#x7136;&#x540E;&#x8C03;&#x7528;Watcher&#x5B9E;&#x4F8B;&#x91CC;&#x7684; update&#x65B9;&#x6CD5;(), &#x8FD9;&#x4E2A;&#x5C31;&#x76F8;&#x5F53;&#x4E8E; trigger&#x3002;
      dep.notify()
    }
  })" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code> <span class="hljs-comment">// &#x8FD9;&#x4E2A;&#x662F; vue &#x7ED1;&#x5B9A;&#x81EA;&#x52A8;&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;&#x548C;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#x65B9;&#x6CD5;, &#x4F1A;&#x628A;data&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x7684;&#x5BF9;&#x8C61;&#x53D8;&#x91CF;&#x5C5E;&#x6027;&#xFF0C;&#x91CD;&#x5199;&#x5BF9;&#x5E94;&#x5C5E;&#x6027;&#x7684; &#x8D4B;&#x503C; &#x548C;&#x83B7;&#x53D6;&#x7684;&#x64CD;&#x4F5C;&#x3002;&#x5177;&#x4F53;&#x67E5;&#x770B; &#xFF08;mdn  Object.defineProperty api&#xFF09;</span>
  Object.defineProperty(obj, key, {
    enumerable: <span class="hljs-type">true</span>,
    configurable: <span class="hljs-type">true</span>,
    <span class="hljs-keyword">get</span>: <span class="hljs-type">function reactiveGetter </span>() {
      const value = getter ? getter.call(obj) : <span class="hljs-type">val</span>
      <span class="hljs-comment">// watcher &#x5BF9;&#x8C61;&#xFF0C; &#x5982;&#x679C;&#x5B58;&#x5728;</span>
      <span class="hljs-keyword">if</span> (Dep.target) {
        <span class="hljs-comment">// &#x628A;Watcher &#x5B9E;&#x4F8B; &#x63A8;&#x5165; Dep &#x5B9E;&#x4F8B;&#x7684; subs &#x6570;&#x7EC4;&#x91CC;&#xFF0C; &#x8FD9;&#x4E2A;&#x5C31;&#x76F8;&#x5F53;&#x4E8E; on</span>
        dep.depend()
        <span class="hljs-keyword">if</span> (childOb) {
          childOb.dep.depend()
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">Array</span>.isArray(value)) {
            dependArray(value)
          }
        }
      }
      <span class="hljs-keyword">return</span> value
    },
    <span class="hljs-keyword">set</span>: <span class="hljs-type">function reactiveSetter </span>(<span class="hljs-keyword">new</span><span class="hljs-type">Val</span>) {
      const value = getter ? getter.call(obj) : <span class="hljs-type">val</span>
      <span class="hljs-comment">/* eslint-disable no-self-compare */</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">new</span><span class="hljs-type">Val</span> === value || (<span class="hljs-keyword">new</span><span class="hljs-type">Val</span> !== <span class="hljs-keyword">new</span><span class="hljs-type">Val</span> &amp;&amp; value !== value)) {
        <span class="hljs-keyword">return</span>
      }
      <span class="hljs-comment">/* eslint-enable no-self-compare */</span>
      <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">&apos;production&apos;</span> &amp;&amp; customSetter) {
        customSetter()
      }
      <span class="hljs-keyword">if</span> (setter) {
        setter.call(obj, <span class="hljs-keyword">new</span><span class="hljs-type">Val</span>)
      } <span class="hljs-keyword">else</span> {
        val = <span class="hljs-keyword">new</span><span class="hljs-type">Val</span>
      }
      childOb = !shallow &amp;&amp; observe(<span class="hljs-keyword">new</span><span class="hljs-type">Val</span>)
      <span class="hljs-comment">// &#x901A;&#x77E5; Dep &#x5B9E;&#x4F8B; &#x4E2D;subs &#x91CC;&#x6570;&#x7EC4; &#x4E2D;&#x6240;&#x6709; Watcher &#x5B9E;&#x4F8B;, &#x7136;&#x540E;&#x8C03;&#x7528;Watcher&#x5B9E;&#x4F8B;&#x91CC;&#x7684; update&#x65B9;&#x6CD5;(), &#x8FD9;&#x4E2A;&#x5C31;&#x76F8;&#x5F53;&#x4E8E; trigger&#x3002;</span>
      dep.notify()
    }
  })</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Watcher &#x6784;&#x9020;&#x51FD;&#x6570; 
 constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  )" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs delphi"><code><span class="hljs-comment">// Watcher &#x6784;&#x9020;&#x51FD;&#x6570; </span>
 <span class="hljs-function"><span class="hljs-keyword">constructor</span> <span class="hljs-params">(
    vm: Component,
    expOrFn: <span class="hljs-keyword">string</span> | <span class="hljs-keyword">Function</span>,
    cb: <span class="hljs-keyword">Function</span>,
    options?: ?<span class="hljs-keyword">Object</span>,
    isRenderWatcher?: boolean
  )</span></span></code></pre><p>2...Watcher&#x521D;&#x59CB;&#x5316;&#x65F6;&#xFF0C;&#x4F1A;&#x8C03;&#x7528;Dep.pushTarget&#x65B9;&#x6CD5;, &#x628A; Wathcer&#x5B9E;&#x4F8B;&#x8D4B;&#x503C;&#x5230;dep.js &#x91CC;&#x7684;Dep.target, &#x63A5;&#x7740;&#x4F1A;&#x6839;&#x636E; exporFn&#xFF0C;&#x8FD0;&#x884C;exporFn &#x6240;&#x4EE3;&#x8868;&#x7684;&#x65B9;&#x6CD5;&#x3002;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x91CC;&#x57FA;&#x672C;&#x4E0A;&#x5305;&#x542B;&#x8C03;&#x7528; 1...&#x91CC;&#x7684;getter&#x65B9;&#x6CD5;<strong><em>(&#x60F3;&#x60F3;render&#x94A9;&#x5B50;&#x91CC;&#x7684;&#x64CD;&#x4F5C;&#x57FA;&#x672C;&#x6709;&#x83B7;&#x53D6;vue&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;data&#x91CC;&#x7684;&#x503C;&#x6216;&#x8005;&#x83B7;&#x53D6;vue&#x5B9E;&#x4F8B;&#x7684;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684;&#x503C;)</em></strong>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
    data () {
        return {msg: &apos;&#x627E;&#x4E2A;&#x5C0F;&#x59D0;&#x59D0;&#xFF01;&apos;}
    },
    // &#x76F8;&#x5F53;&#x4E8E; exporFn
    render(h) {
        return h(&apos;h3&apos;, {},
          // &#x8FD9;&#x91CC;&#x9762;&#x5C31;&#x4F1A;&#x8C03;&#x7528; msg &#x5BF9;&#x5E94;&#x7684; getter&#x65B9;&#x6CD5;
          this.msg
        )
    }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> vm = new Vue({
    <span class="hljs-keyword">data</span> () {
        <span class="hljs-keyword">return</span> {msg: <span class="hljs-string">&apos;&#x627E;&#x4E2A;&#x5C0F;&#x59D0;&#x59D0;&#xFF01;&apos;</span>}
    },
    <span class="hljs-comment">// &#x76F8;&#x5F53;&#x4E8E; exporFn</span>
    render(h) {
        <span class="hljs-keyword">return</span> h(<span class="hljs-string">&apos;h3&apos;</span>, {},
          <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x9762;&#x5C31;&#x4F1A;&#x8C03;&#x7528; msg &#x5BF9;&#x5E94;&#x7684; getter&#x65B9;&#x6CD5;</span>
          <span class="hljs-keyword">this</span>.msg
        )
    }
})</code></pre><p>&#x6240;&#x4EE5;&#x5C31;&#x4F1A;&#x4F7F; render &#x51FD;&#x6570; &#x4E0E; Vue &#x5B9E;&#x4F8B; &#x7684; &#x6570;&#x636E; data&#x5C5E;&#x6027; &#x548C;&#x89C2;&#x5BDF;&#x5C5E;&#x6027;&#x7B49;&#x4EA7;&#x751F;&#x8054;&#x7CFB;&#xFF0C;&#x8FD9;&#x5C31;&#x5F62;&#x6210;&#x4E00;&#x4E2A;&#x95ED;&#x73AF;&#x3002;&#x5F53;&#x5176;&#x4E2D;&#x7684;&#x5C5E;&#x6027;&#x53D8;&#x5316;&#xFF0C;&#x5C31;&#x4F1A;&#x81EA;&#x52A8;&#x8C03;&#x7528; setter &#x65B9;&#x6CD5;&#xFF0C;&#x4ECE;&#x800C;&#x89E6;&#x53D1;dep.notify &#x65B9;&#x6CD5;&#xFF0C;&#x8FDB;&#x800C;&#x53C8;&#x4F1A;&#x89E6;&#x53D1; dep.subs &#x91CC;&#x7684; Watcher &#x5B9E;&#x4F8B;&#x8C03;&#x7528; update&#x65B9;&#x6CD5;&#xFF0C;&#x8FDB;&#x800C;&#x66F4;&#x65B0;&#x3002;<br>&#xFF08;&#x8FD9;&#x90E8;&#x5206;&#x4EE3;&#x7801;&#x4E0D;&#x77E5;&#x5982;&#x4F55;&#x8BF4;&#xFF0C;&#x6545;&#x6B64;&#x6CA1;&#x5199;, &#x5177;&#x4F53;&#x67E5;&#x770B;&#x6E90;&#x7801;&#xFF09;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue观察模式浅析

## 原文链接
[https://segmentfault.com/a/1190000016495810](https://segmentfault.com/a/1190000016495810)

