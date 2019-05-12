---
title: '微信小程序开发实战——使用UUID、Base64、Chance等' 
date: 2019-02-02 2:30:11
hidden: true
slug: cuvdsjj2yv4
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">UUID</h2>
<p><a href="https://github.com/broofa/node-uuid" rel="nofollow noreferrer" target="_blank">node-uuid</a>模块，可以快速地生成符合 RFC4122 规范 version 1 或者 version 4 的 UUID。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var uuid = require('../../libs/node-uuid/uuid.modified.js');

// v1 是基于时间戳生成uuid
console.log(uuid.v1());
// v4 是随机生成uuid
console.log(uuid.v4());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> uuid = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../../libs/node-uuid/uuid.modified.js'</span>);

<span class="hljs-comment">// v1 是基于时间戳生成uuid</span>
<span class="hljs-built_in">console</span>.log(uuid.v1());
<span class="hljs-comment">// v4 是随机生成uuid</span>
<span class="hljs-built_in">console</span>.log(uuid.v4());</code></pre>
<h2 id="articleHeader1">Base64</h2>
<p><a href="https://github.com/dankogai/js-base64" rel="nofollow noreferrer" target="_blank">js-base64</a> 是 Base64 的 JavaScript 实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Base64 = require('../../libs/js-base64/base64.modified.js');

console.log(Base64.encode('Wechat'));
console.log(Base64.encode('微信'));
console.log(Base64.decode('V2VjaGF0'));
console.log(Base64.decode('5b6u5L+h'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> Base64 = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../../libs/js-base64/base64.modified.js'</span>);

<span class="hljs-built_in">console</span>.log(Base64.encode(<span class="hljs-string">'Wechat'</span>));
<span class="hljs-built_in">console</span>.log(Base64.encode(<span class="hljs-string">'微信'</span>));
<span class="hljs-built_in">console</span>.log(Base64.decode(<span class="hljs-string">'V2VjaGF0'</span>));
<span class="hljs-built_in">console</span>.log(Base64.decode(<span class="hljs-string">'5b6u5L+h'</span>));</code></pre>
<h2 id="articleHeader2">Chance</h2>
<p><a href="http://chancejs.com/" rel="nofollow noreferrer" target="_blank">Chance</a> 是一个基于 JavaScript 的随机数工具类。可以生成随机数字，名称，地址，域名，邮箱，时间等等，几乎网站中使用的任何形式的内容都能够生成。这个随机数工具可以帮助减少单调的测试数据编写工作，特别是编写自动化测试的时候。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Chance = require('../../libs/chance/chance.modified.js');

var chance = new Chance();
console.log(chance.string());
console.log(chance.integer());
console.log(chance.bool());
console.log(chance.phone());
console.log(chance.zip());
console.log(chance.guid());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> Chance = <span class="hljs-keyword">require</span>(<span class="hljs-string">'../../libs/chance/chance.modified.js'</span>);

<span class="hljs-built_in">var</span> chance = <span class="hljs-literal">new</span> Chance();
console.<span class="hljs-keyword">log</span>(chance.<span class="hljs-built_in">string</span>());
console.<span class="hljs-keyword">log</span>(chance.<span class="hljs-built_in">integer</span>());
console.<span class="hljs-keyword">log</span>(chance.bool());
console.<span class="hljs-keyword">log</span>(chance.phone());
console.<span class="hljs-keyword">log</span>(chance.zip());
console.<span class="hljs-keyword">log</span>(chance.guid());</code></pre>
<h2 id="articleHeader3">其他</h2>
<p>完整代码 <a href="https://github.com/guyoung/GyWxappCases/tree/master/Modularity" rel="nofollow noreferrer" target="_blank">https://github.com/guyoung/Gy...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
微信小程序开发实战——使用UUID、Base64、Chance等

## 原文链接
[https://segmentfault.com/a/1190000007086274](https://segmentfault.com/a/1190000007086274)

