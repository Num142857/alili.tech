---
title: 'js数组去重（包含ES6解决方案）' 
date: 2019-02-02 2:30:11
hidden: true
slug: 70uxao2wrcm
categories: [reprint]
---

{{< raw >}}

                    
<p>前几天在<a href="https://www.codewars.com/" rel="nofollow noreferrer" target="_blank">codewars</a>做了一道题，这道题的核心问题是数组去重。昨晚之后看到别人的solution，感觉自己的solution太low了。</p>
<h2 id="articleHeader0">题目</h2>
<blockquote><p>Take 2 strings s1 and s2 including only letters from ato z. Return a new sorted string, the longest possible, containing distinct letters, - each taken only once - coming from s1 or s2.</p></blockquote>
<p>有两个字符串s1和s2，值只能为a-z。现写一函数，返回一个新的升序的字符串，其值由s1、s2中的值组成，要求包含最多字符且不能重复。</p>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a = &quot;xyaabbbccccdefww&quot;
b = &quot;xxxxyyyyabklmopq&quot;
longest(a, b) -> &quot;abcdefklmopqwxy&quot;

a = &quot;abcdefghijklmnopqrstuvwxyz&quot;
longest(a, a) -> &quot;abcdefghijklmnopqrstuvwxyz&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">a = <span class="hljs-string">"xyaabbbccccdefww"</span>
b = <span class="hljs-string">"xxxxyyyyabklmopq"</span>
longest(a, b) -&gt; <span class="hljs-string">"abcdefklmopqwxy"</span>

a = <span class="hljs-string">"abcdefghijklmnopqrstuvwxyz"</span>
longest(a, a) -&gt; <span class="hljs-string">"abcdefghijklmnopqrstuvwxyz"</span></code></pre>
<h2 id="articleHeader1">My Solution</h2>
<p>先贴自己的代码。<br>我的方案是通过一个新数组存储字符串，<code>函数getDistinct</code>负责将s1、s2中的字符保存到<code>target数组</code>中且确保不会出现重复字符。<br>代码中的<a href="http://es6.ruanyifeng.com/#docs/array#Array-from" rel="nofollow noreferrer" target="_blank"><code>Array.from</code></a>和<a href="http://es6.ruanyifeng.com/#docs/array#%E6%95%B0%E7%BB%84%E5%AE%9E%E4%BE%8B%E7%9A%84includes" rel="nofollow noreferrer" target="_blank"><code>includes</code></a>函数是ES6中的数组方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function longest(s1, s2) {
      let distStr,
          value,
          distArr = []
      getDistinct(distArr, s1 + s2)
      // 数组排序并转成字符串
      distStr = distArr.sort().join('')
      return distStr
    }
    // 数组去重
    function getDistinct(target, source) {
      let value
      // 将字符串转成数组
      source = Array.from(source)
      for(value of source) {
        // 如果target数组中没有该value，则将其添加到数组中
        if(!target.includes(value)) {
          target.push(value)
        }
      }
    }
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">longest</span>(<span class="hljs-params">s1, s2</span>) </span>{
      <span class="hljs-keyword">let</span> distStr,
          value,
          distArr = []
      getDistinct(distArr, s1 + s2)
      <span class="hljs-comment">// 数组排序并转成字符串</span>
      distStr = distArr.sort().join(<span class="hljs-string">''</span>)
      <span class="hljs-keyword">return</span> distStr
    }
    <span class="hljs-comment">// 数组去重</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDistinct</span>(<span class="hljs-params">target, source</span>) </span>{
      <span class="hljs-keyword">let</span> value
      <span class="hljs-comment">// 将字符串转成数组</span>
      source = <span class="hljs-built_in">Array</span>.from(source)
      <span class="hljs-keyword">for</span>(value <span class="hljs-keyword">of</span> source) {
        <span class="hljs-comment">// 如果target数组中没有该value，则将其添加到数组中</span>
        <span class="hljs-keyword">if</span>(!target.includes(value)) {
          target.push(value)
        }
      }
    }
    </code></pre>
<h2 id="articleHeader2">Best Solution</h2>
<p>这是所有答案中最精妙的一个，仅用了一行就搞定了。（瞬间发现差距悬殊啊）<br>这个方案首先利用ES6中提供的<a href="http://es6.ruanyifeng.com/#docs/set-map#Set" rel="nofollow noreferrer" target="_blank"><code>Set</code></a>数据结构对字符串（s1+s2）“去重”，然后<a href="http://es6.ruanyifeng.com/#docs/destructuring#%E6%95%B0%E7%BB%84%E7%9A%84%E8%A7%A3%E6%9E%84%E8%B5%8B%E5%80%BC" rel="nofollow noreferrer" target="_blank">结构赋值</a>得到数组，最后进行排序并转成字符串。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const longest = (s1, s2) => [...new Set(s1+s2)].sort().join('')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> longest = <span class="hljs-function">(<span class="hljs-params">s1, s2</span>) =&gt;</span> [...new <span class="hljs-built_in">Set</span>(s1+s2)].sort().join(<span class="hljs-string">''</span>)</code></pre>
<h2 id="articleHeader3">Other Solution</h2>
<p>下面这个方案是我自己方案的ES5版本（不兼容IE8以下的浏览器）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function longest(s1, s2) {
      var distStr,
          value,
          distArr = []
      getDistinct(distArr, s1 + s2)
      // 数组排序并转成字符串
      distStr = distArr.sort().join('')
      return distStr
    }
    // 数组去重
    function getDistinct(target, source) {
      var index,
          value
      // 将字符串转成数组
      source = Array.prototype.slice.call(source, 0)
      for(index in source) {
        value = source[index]
        // 如果target数组中没有该value，则将其添加到数组中
        if(target.indexOf(value) === -1) {
          target.push(value)
        }
      }
    }
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">longest</span>(<span class="hljs-params">s1, s2</span>) </span>{
      <span class="hljs-keyword">var</span> distStr,
          value,
          distArr = []
      getDistinct(distArr, s1 + s2)
      <span class="hljs-comment">// 数组排序并转成字符串</span>
      distStr = distArr.sort().join(<span class="hljs-string">''</span>)
      <span class="hljs-keyword">return</span> distStr
    }
    <span class="hljs-comment">// 数组去重</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDistinct</span>(<span class="hljs-params">target, source</span>) </span>{
      <span class="hljs-keyword">var</span> index,
          value
      <span class="hljs-comment">// 将字符串转成数组</span>
      source = <span class="hljs-built_in">Array</span>.prototype.slice.call(source, <span class="hljs-number">0</span>)
      <span class="hljs-keyword">for</span>(index <span class="hljs-keyword">in</span> source) {
        value = source[index]
        <span class="hljs-comment">// 如果target数组中没有该value，则将其添加到数组中</span>
        <span class="hljs-keyword">if</span>(target.indexOf(value) === <span class="hljs-number">-1</span>) {
          target.push(value)
        }
      }
    }
    </code></pre>
<p>下面这个方案通过新建一个hash对象来记录已存储的字符。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function longest(s1, s2) {
      var distStr,
          value,
          distArr = []
      getDistinct(distArr, s1 + s2)
      // 数组排序并转成字符串
      distStr = distArr.sort().join('')
      return distStr
    }
    // 数组去重
    function getDistinct(target, source) {
      var hash = {},
          index,
          value
      // 将字符串转成数组
      source = Array.prototype.slice.call(source, 0)
      for(index in source) {
        value = source[index]
        // 如果hash对象中没有该key，则将其添加到数组中
        if(!hash[value]) {
          target.push(value)
          // 给hash添加一个value属性，值为true
          hash[value] = true
        }
      }
    }
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">longest</span>(<span class="hljs-params">s1, s2</span>) </span>{
      <span class="hljs-keyword">var</span> distStr,
          value,
          distArr = []
      getDistinct(distArr, s1 + s2)
      <span class="hljs-comment">// 数组排序并转成字符串</span>
      distStr = distArr.sort().join(<span class="hljs-string">''</span>)
      <span class="hljs-keyword">return</span> distStr
    }
    <span class="hljs-comment">// 数组去重</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDistinct</span>(<span class="hljs-params">target, source</span>) </span>{
      <span class="hljs-keyword">var</span> hash = {},
          index,
          value
      <span class="hljs-comment">// 将字符串转成数组</span>
      source = <span class="hljs-built_in">Array</span>.prototype.slice.call(source, <span class="hljs-number">0</span>)
      <span class="hljs-keyword">for</span>(index <span class="hljs-keyword">in</span> source) {
        value = source[index]
        <span class="hljs-comment">// 如果hash对象中没有该key，则将其添加到数组中</span>
        <span class="hljs-keyword">if</span>(!hash[value]) {
          target.push(value)
          <span class="hljs-comment">// 给hash添加一个value属性，值为true</span>
          hash[value] = <span class="hljs-literal">true</span>
        }
      }
    }
    </code></pre>
<p>还有一种方案是先排序，再比较相邻的两个字符，只有当前字符不等于下一个字符的时候，才存储当前字符。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function longest(s1, s2) {
      var distStr,
          value,
          distArr = []
      getDistinct(distArr, s1 + s2)
      // 数组排序并转成字符串
      distStr = distArr.join('')
      return distStr
    }
    // 数组去重
    function getDistinct(target, source) {
      var index,
          value
      // 将字符串转成数组
      source = Array.prototype.slice.call(source, 0)
      source = source.sort()
      for(index in source) {
        value = source[index]
        // 如果target数组中没有该value，则将其添加到数组中
        if(value !== source[index + 1]) {
          target.push(value)
        }
      }
    }        " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">longest</span>(<span class="hljs-params">s1, s2</span>) </span>{
      <span class="hljs-keyword">var</span> distStr,
          value,
          distArr = []
      getDistinct(distArr, s1 + s2)
      <span class="hljs-comment">// 数组排序并转成字符串</span>
      distStr = distArr.join(<span class="hljs-string">''</span>)
      <span class="hljs-keyword">return</span> distStr
    }
    <span class="hljs-comment">// 数组去重</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDistinct</span>(<span class="hljs-params">target, source</span>) </span>{
      <span class="hljs-keyword">var</span> index,
          value
      <span class="hljs-comment">// 将字符串转成数组</span>
      source = <span class="hljs-built_in">Array</span>.prototype.slice.call(source, <span class="hljs-number">0</span>)
      source = source.sort()
      <span class="hljs-keyword">for</span>(index <span class="hljs-keyword">in</span> source) {
        value = source[index]
        <span class="hljs-comment">// 如果target数组中没有该value，则将其添加到数组中</span>
        <span class="hljs-keyword">if</span>(value !== source[index + <span class="hljs-number">1</span>]) {
          target.push(value)
        }
      }
    }        </code></pre>
<h2 id="articleHeader4">结语</h2>
<p>由于这是我人生第一篇博文，用词和语法有不妥的地方，请多多包含。同时，如果文中有错误的地方，请狠狠地吐槽。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js数组去重（包含ES6解决方案）

## 原文链接
[https://segmentfault.com/a/1190000007055929](https://segmentfault.com/a/1190000007055929)

