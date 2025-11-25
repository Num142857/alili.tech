---
title: 'Javascript常见排序算法的笔记' 
date: 2018-11-27 2:30:12
hidden: true
slug: ejo8lknyw8
categories: [reprint]
---

{{< raw >}}
<p>&#x2003;&#x2003;&#x6392;&#x5E8F;&#x7B97;&#x6CD5;&#x4E3B;&#x8981;&#x9488;&#x5BF9;&#x7684;&#x662F;&#x6570;&#x7EC4;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x5728;&#x5F00;&#x59CB;&#x5B66;&#x4E60;&#x4E4B;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x5148;&#x81EA;&#x5DF1;&#x65B0;&#x5EFA;&#x4E00;&#x79CD;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x6765;&#x65B9;&#x4FBF;&#x6211;&#x4EEC;&#x7684;&#x5B66;&#x4E60;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ArrayData () {
  let ret = []
  this.times = 0  // &#x7EDF;&#x8BA1;&#x6267;&#x884C;&#x6B21;&#x6570;
  this.push = (item) =&gt; {
    ret.push(item)
  }
  this.toString = () =&gt; {
    return ret.join()
  }
}

const arr = [34, 11, 45, 22, 31, 99, 68, 54]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ArrayData</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> ret = []
  <span class="hljs-keyword">this</span>.times = <span class="hljs-number">0</span>  <span class="hljs-comment">// &#x7EDF;&#x8BA1;&#x6267;&#x884C;&#x6B21;&#x6570;</span>
  <span class="hljs-keyword">this</span>.push = <span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
    ret.push(item)
  }
  <span class="hljs-keyword">this</span>.toString = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> ret.join()
  }
}

<span class="hljs-keyword">const</span> arr = [<span class="hljs-number">34</span>, <span class="hljs-number">11</span>, <span class="hljs-number">45</span>, <span class="hljs-number">22</span>, <span class="hljs-number">31</span>, <span class="hljs-number">99</span>, <span class="hljs-number">68</span>, <span class="hljs-number">54</span>]</code></pre><h2 id="articleHeader0">&#x5192;&#x6CE1;&#x6392;&#x5E8F;</h2><p>&#x2003;&#x2003;&#x6BD4;&#x8F83;&#x76F8;&#x90BB;&#x4E24;&#x4E2A;&#x6570;&#x7684;&#x5927;&#x5C0F;&#xFF0C;&#x5982;&#x679C;&#x524D;&#x9762;&#x7684;&#x6570;&#x5927;&#x4E8E;&#x540E;&#x9762;&#xFF0C;&#x5219;&#x4EA4;&#x6362;&#x8FD9;&#x4E24;&#x4E2A;&#x6570;&#x7684;&#x4F4D;&#x7F6E;&#x3002;&#x8981;&#x6392;&#x5E8F;n&#x4E2A;&#x6570;&#x5B57;&#xFF0C;&#x9700;&#x8981;&#x7ECF;&#x5386;n-1&#x6B21;&#x7684;&#x904D;&#x5386;&#x3002;</p><p>&#x2003;&#x2003;&#x6309;&#x7167;&#x5B57;&#x9762;&#x8981;&#x6C42;&#xFF0C;&#x6211;&#x4EEC;&#x5199;&#x51FA;&#x6765;&#x7684;&#x4EE3;&#x7801;&#x662F;&#x8FD9;&#x6837;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ArrayData () {
    // ......
    this.bubbleSort = function () {
        let length = ret.length;
        for (let i = 0; i &lt; length; i++) {
          for (let j = 0; j &lt; length - 1; j++) {
            this.times++
            if (ret[j] &gt; ret[j + 1]) {
              [ret[j], ret[j + 1]] = [ret[j + 1], ret[j]]
            }
          }
        }
    }
}

let tmp = new ArrayData()
arr.forEach((item) =&gt; {
    tmp.push(item)
})
tmp.bubbleSort()
console.log(tmp.times)    //  56" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ArrayData</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// ......</span>
    <span class="hljs-keyword">this</span>.bubbleSort = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">let</span> length = ret.length;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; length; i++) {
          <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; length - <span class="hljs-number">1</span>; j++) {
            <span class="hljs-keyword">this</span>.times++
            <span class="hljs-keyword">if</span> (ret[j] &gt; ret[j + <span class="hljs-number">1</span>]) {
              [ret[j], ret[j + <span class="hljs-number">1</span>]] = [ret[j + <span class="hljs-number">1</span>], ret[j]]
            }
          }
        }
    }
}

<span class="hljs-keyword">let</span> tmp = <span class="hljs-keyword">new</span> ArrayData()
arr.forEach(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
    tmp.push(item)
})
tmp.bubbleSort()
<span class="hljs-built_in">console</span>.log(tmp.times)    <span class="hljs-comment">//  56</span></code></pre><p>&#x2003;&#x2003;&#x663E;&#x7136;&#x8FD9;&#x79CD;&#x7B80;&#x5355;&#x7C97;&#x66B4;&#x7684;&#x6392;&#x5E8F;&#x65B9;&#x5F0F;&#x6709;&#x5F88;&#x5927;&#x7684;&#x63D0;&#x5347;&#x7A7A;&#x95F4;&#xFF0C;&#x6BD4;&#x5982;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x68C0;&#x6D4B;&#x6BCF;&#x6B21;&#x6392;&#x5E8F;&#xFF0C;&#x5982;&#x679C;&#x987A;&#x5E8F;&#x5DF2;&#x7ECF;&#x6392;&#x5217;&#x6210;&#x529F;&#xFF0C;&#x5C31;&#x6CA1;&#x5FC5;&#x8981;&#x6267;&#x884C;&#x4E4B;&#x540E;&#x7684;&#x5FAA;&#x73AF;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ArrayData () {
    // ......
    this.bubbleSort = function () {
        let length = ret.length;
        for (let i = 0; i &lt; length; i++) {
          let change = false
          for (let j = 0; j &lt; length - 1; j++) {
            this.times++&#xCF;
            if (ret[j] &gt; ret[j + 1]) {
              [ret[j], ret[j + 1]] = [ret[j + 1], ret[j]]
              change = true
            }
          }
          if (!change) {
            break
          }
        }
    }
}

let tmp = new ArrayData()
arr.forEach((item) =&gt; {
    tmp.push(item)
})
tmp.bubbleSort()
console.log(tmp.times)    //  21" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ArrayData</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// ......</span>
    <span class="hljs-keyword">this</span>.bubbleSort = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">let</span> length = ret.length;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; length; i++) {
          <span class="hljs-keyword">let</span> change = <span class="hljs-literal">false</span>
          <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; length - <span class="hljs-number">1</span>; j++) {
            <span class="hljs-keyword">this</span>.times++&#xCF;
            <span class="hljs-keyword">if</span> (ret[j] &gt; ret[j + <span class="hljs-number">1</span>]) {
              [ret[j], ret[j + <span class="hljs-number">1</span>]] = [ret[j + <span class="hljs-number">1</span>], ret[j]]
              change = <span class="hljs-literal">true</span>
            }
          }
          <span class="hljs-keyword">if</span> (!change) {
            <span class="hljs-keyword">break</span>
          }
        }
    }
}

<span class="hljs-keyword">let</span> tmp = <span class="hljs-keyword">new</span> ArrayData()
arr.forEach(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
    tmp.push(item)
})
tmp.bubbleSort()
<span class="hljs-built_in">console</span>.log(tmp.times)    <span class="hljs-comment">//  21</span></code></pre><p>&#x2003;&#x2003;&#x5176;&#x5B9E;&#x8FD8;&#x662F;&#x6709;&#x4F18;&#x5316;&#x7684;&#x7A7A;&#x95F4;&#x7684;&#x3002;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x5047;&#x8BBE;&#x4E00;&#x5171;8&#x4E2A;&#x6570;&#xFF0C;&#x7B2C;&#x4E00;&#x8F6E;&#x5FAA;&#x73AF;&#xFF0C;&#x4F1A;&#x628A;&#x6700;&#x5927;&#x7684;&#x6570;&#x5192;&#x6CE1;&#x6392;&#x5230;&#x7B2C;8&#x4F4D;&#xFF0C;&#x7B2C;&#x4E8C;&#x8F6E;&#x5FAA;&#x73AF;&#xFF0C;&#x4F1A;&#x628A;&#x7B2C;&#x4E8C;&#x5927;&#x7684;&#x6570;&#x6392;&#x5230;&#x7B2C;7&#x4F4D;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x672C;&#x8F6E;&#x5FAA;&#x574F;&#x5176;&#x5B9E;&#x6CA1;&#x5FC5;&#x8981;&#x8003;&#x8651;&#x6700;&#x540E;&#x4E00;&#x4F4D;&#x4E86;&#x3002;&#x540C;&#x7406;&#xFF0C;&#x4E0B;&#x4E00;&#x8F6E;&#x5FAA;&#x73AF;&#x5C31;&#x4E0D;&#x9700;&#x8981;&#x8003;&#x8651;&#x540E;&#x4E24;&#x4F4D;&#x3002;&#x6539;&#x8FDB;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x5982;&#x4E0B;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ArrayData () {
    // ......
    this.bubbleSort = function () {
        let length = ret.length;
        for (let i = 0; i &lt; length; i++) {
          let change = false
          for (let j = 0; j &lt; length - 1 - i; j++) {
            this.times++
            if (ret[j] &gt; ret[j + 1]) {
              [ret[j], ret[j + 1]] = [ret[j + 1], ret[j]]
              change = true
            }
          }
          if (!change) {
            break
          }
        }
    }
}

let tmp = new ArrayData()
arr.forEach((item) =&gt; {
    tmp.push(item)
})
tmp.bubbleSort()
console.log(tmp.times)    //  18" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ArrayData</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// ......</span>
    <span class="hljs-keyword">this</span>.bubbleSort = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">let</span> length = ret.length;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; length; i++) {
          <span class="hljs-keyword">let</span> change = <span class="hljs-literal">false</span>
          <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; length - <span class="hljs-number">1</span> - i; j++) {
            <span class="hljs-keyword">this</span>.times++
            <span class="hljs-keyword">if</span> (ret[j] &gt; ret[j + <span class="hljs-number">1</span>]) {
              [ret[j], ret[j + <span class="hljs-number">1</span>]] = [ret[j + <span class="hljs-number">1</span>], ret[j]]
              change = <span class="hljs-literal">true</span>
            }
          }
          <span class="hljs-keyword">if</span> (!change) {
            <span class="hljs-keyword">break</span>
          }
        }
    }
}

<span class="hljs-keyword">let</span> tmp = <span class="hljs-keyword">new</span> ArrayData()
arr.forEach(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
    tmp.push(item)
})
tmp.bubbleSort()
<span class="hljs-built_in">console</span>.log(tmp.times)    <span class="hljs-comment">//  18</span></code></pre><h2 id="articleHeader1">&#x9009;&#x62E9;&#x6392;&#x5E8F;</h2><p>&#x2003;&#x2003;&#x904D;&#x5386;&#x6570;&#x7EC4;&#xFF0C;&#x627E;&#x51FA;&#x6700;&#x5C0F;&#x7684;&#x6570;&#x6392;&#x5728;&#x7B2C;&#x4E00;&#x4F4D;&#xFF0C;&#x7B2C;&#x4E8C;&#x8F6E;&#x5FAA;&#x73AF;&#x627E;&#x51FA;&#x7B2C;&#x4E8C;&#x5C0F;&#x7684;&#x6570;&#x653E;&#x5728;&#x7B2C;&#x4E8C;&#x4F4D;&#xFF0C;&#x4EE5;&#x6B64;&#x7C7B;&#x63A8;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ArrayData () {
    // ......
  this.selectionSort = function () {
    let length = ret.length
    for (let i = 0; i &lt; length - 1; i++) {
      let minIndex = i
      for (let j = i; j &lt; length; j++) {
        if (ret[j] &lt; ret[minIndex]) {
          minIndex = j
        }
      }
      if (i !== minIndex) {
        [ret[i], ret[minIndex]] = [ret[minIndex], ret[i]]
      }
    }
  }
}

let tmp = new ArrayData()
arr.forEach((item) =&gt; {
    tmp.push(item)
})
tmp.selectionSort()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ArrayData</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// ......</span>
  <span class="hljs-keyword">this</span>.selectionSort = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> length = ret.length
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; length - <span class="hljs-number">1</span>; i++) {
      <span class="hljs-keyword">let</span> minIndex = i
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = i; j &lt; length; j++) {
        <span class="hljs-keyword">if</span> (ret[j] &lt; ret[minIndex]) {
          minIndex = j
        }
      }
      <span class="hljs-keyword">if</span> (i !== minIndex) {
        [ret[i], ret[minIndex]] = [ret[minIndex], ret[i]]
      }
    }
  }
}

<span class="hljs-keyword">let</span> tmp = <span class="hljs-keyword">new</span> ArrayData()
arr.forEach(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
    tmp.push(item)
})
tmp.selectionSort()</code></pre><h2 id="articleHeader2">&#x63D2;&#x5165;&#x6392;&#x5E8F;</h2><p>&#x2003;&#x2003;&#x628A;&#x6570;&#x7EC4;&#x5206;&#x6210;&#x524D;&#x540E;&#x4E24;&#x90E8;&#x5206;&#xFF0C;&#x524D;&#x9762;&#x7684;&#x4E00;&#x90E8;&#x5206;&#x662F;&#x6392;&#x597D;&#x5E8F;&#x7684;&#xFF0C;&#x7136;&#x540E;&#x5206;&#x522B;&#x628A;&#x540E;&#x9762;&#x4E00;&#x90E8;&#x5206;&#x7684;&#x6570;&#x5B57;&#x63D2;&#x5165;&#x5230;&#x524D;&#x9762;&#x6392;&#x597D;&#x5E8F;&#x7684;&#x6570;&#x7EC4;&#x4E2D;&#x3002;&#x6240;&#x4EE5;&#xFF0C;&#x521A;&#x5F00;&#x59CB;&#x65F6;&#x8BBE;&#x5B9A;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x4E3A;&#x6392;&#x597D;&#x5E8F;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x5206;&#x522B;&#x628A;&#x540E;&#x9762;&#x7684;&#x6570;&#x5B57;&#x63D2;&#x5165;&#x8FDB;&#x6765;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ArrayData () {
    // ......
  this.insertSort = function () {
    let length = ret.length
    let j
    for (let i = 1; i &lt; length; i++) {
      let currentNumber = ret[i]
      for (j = i - 1; j &gt;= 0 &amp;&amp; ret[j] &gt; currentNumber; j--) {
        ret[j + 1] = ret[j] 
      }
      ret[j + 1] = currentNumber 
    }
  }
}

let tmp = new ArrayData()
arr.forEach((item) =&gt; {
    tmp.push(item)
})
tmp.insertSort()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ArrayData</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// ......</span>
  <span class="hljs-keyword">this</span>.insertSort = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> length = ret.length
    <span class="hljs-keyword">let</span> j
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">1</span>; i &lt; length; i++) {
      <span class="hljs-keyword">let</span> currentNumber = ret[i]
      <span class="hljs-keyword">for</span> (j = i - <span class="hljs-number">1</span>; j &gt;= <span class="hljs-number">0</span> &amp;&amp; ret[j] &gt; currentNumber; j--) {
        ret[j + <span class="hljs-number">1</span>] = ret[j] 
      }
      ret[j + <span class="hljs-number">1</span>] = currentNumber 
    }
  }
}

<span class="hljs-keyword">let</span> tmp = <span class="hljs-keyword">new</span> ArrayData()
arr.forEach(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
    tmp.push(item)
})
tmp.insertSort()</code></pre><h2 id="articleHeader3">&#x5FEB;&#x901F;&#x6392;&#x5E8F;</h2><p>&#x2003;&#x2003;&#x9009;&#x4E00;&#x4E2A;&#x6570;&#x4F5C;&#x4E3A;&#x57FA;&#x51C6;&#x6570;&#xFF0C;&#x904D;&#x5386;&#x6570;&#x5217;&#xFF0C;&#x628A;&#x6BD4;&#x5B83;<br>&#x653E;&#x5230;&#x4ED6;&#x524D;&#x9762;&#xFF0C;&#x6BD4;&#x4ED6;&#x5C0F;&#x7684;&#x653E;&#x5230;&#x4ED6;&#x540E;&#x9762;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x5BF9;&#x57FA;&#x51C6;&#x6570;&#x524D;&#x540E;&#x7684;&#x6570;&#x5217;&#x9012;&#x5F52;&#x4E0A;&#x8FF0;&#x64CD;&#x4F5C;&#xFF0C;&#x76F4;&#x5230;&#x6570;&#x5217;&#x957F;&#x5EA6;&#x4E3A;1&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ArrayData () {
    // ......
    this.quickSort = function () {
        quick(ret, 0, ret.length - 1);
    
        function quick(array, left, right) {
          let index
          if (array.length &gt; 1) {
            index = partition(array, left, right)
            if (left &lt; index - 1) {
              quick(array, left, index - 1)
            }
            if (right &gt; index) {
              quick(array, index, right)
            }
          }
          return array
        }
    
        function partition(array, left, right) {
          let pivot = array[Math.floor((right + left) / 2)],
            i = left,
            j = right;
          while (i &lt;= j) {
            while (array[i] &lt; pivot) {
              i++
            }
            while (array[j] &gt; pivot) {
              j--
            }
            if (i &lt;= j) {
              swap(array, i, j);
              i++;
              j--;
            }
          }
          return i
        }
    
        function swap(array, i, j) {
          [array[i], array[j]] = [array[j], array[i]]
        }
    }
}

let tmp = new ArrayData()
arr.forEach((item) =&gt; {
  tmp.push(item)
})
tmp.quickSort()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ArrayData</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// ......</span>
    <span class="hljs-keyword">this</span>.quickSort = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        quick(ret, <span class="hljs-number">0</span>, ret.length - <span class="hljs-number">1</span>);
    
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">quick</span>(<span class="hljs-params">array, left, right</span>) </span>{
          <span class="hljs-keyword">let</span> index
          <span class="hljs-keyword">if</span> (array.length &gt; <span class="hljs-number">1</span>) {
            index = partition(array, left, right)
            <span class="hljs-keyword">if</span> (left &lt; index - <span class="hljs-number">1</span>) {
              quick(array, left, index - <span class="hljs-number">1</span>)
            }
            <span class="hljs-keyword">if</span> (right &gt; index) {
              quick(array, index, right)
            }
          }
          <span class="hljs-keyword">return</span> array
        }
    
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">partition</span>(<span class="hljs-params">array, left, right</span>) </span>{
          <span class="hljs-keyword">let</span> pivot = array[<span class="hljs-built_in">Math</span>.floor((right + left) / <span class="hljs-number">2</span>)],
            i = left,
            j = right;
          <span class="hljs-keyword">while</span> (i &lt;= j) {
            <span class="hljs-keyword">while</span> (array[i] &lt; pivot) {
              i++
            }
            <span class="hljs-keyword">while</span> (array[j] &gt; pivot) {
              j--
            }
            <span class="hljs-keyword">if</span> (i &lt;= j) {
              swap(array, i, j);
              i++;
              j--;
            }
          }
          <span class="hljs-keyword">return</span> i
        }
    
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">swap</span>(<span class="hljs-params">array, i, j</span>) </span>{
          [array[i], array[j]] = [array[j], array[i]]
        }
    }
}

<span class="hljs-keyword">let</span> tmp = <span class="hljs-keyword">new</span> ArrayData()
arr.forEach(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
  tmp.push(item)
})
tmp.quickSort()</code></pre><p>&#x2003;&#x2003;&#x4E00;&#x53E5;&#x8BDD;&#x5B9E;&#x73B0;&#x5FEB;&#x901F;&#x6392;&#x5E8F;&#x3002;&#x9009;&#x62E9;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x4F5C;&#x4E3A;&#x53C2;&#x8003;&#x5143;&#x7D20;&#xFF0C;&#x5229;&#x7528;filter&#x628A;&#x6570;&#x7EC4;&#x5206;&#x6210;&#x5927;&#x4E8E;&#x53C2;&#x8003;&#x5143;&#x7D20;&#x548C;&#x5C0F;&#x4E8E;&#x53C2;&#x8003;&#x5143;&#x7D20;&#x7684;&#x4E24;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x5E76;&#x5BF9;&#x8FD9;&#x4E24;&#x4E2A;&#x6570;&#x7EC4;&#x9012;&#x5F52;&#x8C03;&#x7528;&#x5FEB;&#x6392;&#x51FD;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function quickSort(arr) {
  return arr.length &lt;= 1 ? arr : quickSort(arr.slice(1).filter((item) =&gt; item &lt;= arr[0])).concat(arr[0], quickSort(arr.slice(1).filter((item) =&gt; item &gt; arr[0])))
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">quickSort</span>(<span class="hljs-params">arr</span>) </span>{
  <span class="hljs-keyword">return</span> arr.length &lt;= <span class="hljs-number">1</span> ? arr : quickSort(arr.slice(<span class="hljs-number">1</span>).filter(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item &lt;= arr[<span class="hljs-number">0</span>])).concat(arr[<span class="hljs-number">0</span>], quickSort(arr.slice(<span class="hljs-number">1</span>).filter(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item &gt; arr[<span class="hljs-number">0</span>])))
}</code></pre><h2 id="articleHeader4">&#x5E0C;&#x5C14;&#x6392;&#x5E8F;</h2><p>&#x2003;&#x2003;&#x5E0C;&#x5C14;&#x6392;&#x5E8F;&#x662F;&#x628A;&#x6570;&#x7EC4;&#x6309;&#x4E0B;&#x6807;&#x7684;&#x4E00;&#x5B9A;&#x589E;&#x91CF;&#x5206;&#x7EC4;&#xFF0C;&#x5BF9;&#x6BCF;&#x7EC4;&#x8FDB;&#x884C;&#x63D2;&#x5165;&#x6392;&#xFF0C;&#x968F;&#x7740;&#x589E;&#x91CF;&#x9010;&#x6E10;&#x51CF;&#x5C11;&#xFF0C;&#x6BCF;&#x4E2A;&#x6570;&#x7EC4;&#x7684;&#x957F;&#x5EA6;&#x8D8A;&#x6765;&#x8D8A;&#x591A;&#xFF0C;&#x5F53;&#x589E;&#x91CF;&#x51CF;&#x81F3;1&#x65F6;&#xFF0C;&#x6574;&#x4E2A;&#x6587;&#x4EF6;&#x6070;&#x88AB;&#x5206;&#x6210;&#x4E00;&#x7EC4;&#xFF0C;&#x7B97;&#x6CD5;&#x4FBF;&#x7EC8;&#x6B62;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ArrayData () {
    // ......
  this.shellSort = function () {
    let length = ret.length
    for (let step = Math.floor(length / 2); step &gt; 0; step = Math.floor(step / 2)) {
      for (let i = 0; i &lt; step; i++) {
        shellInsertSort(i, step)
      }
    }

    function shellInsertSort(index, step) {
      let length = ret.length
      let j
      for (let i = index; i &lt; length; i += step) {
        let currentNumber = ret[i]
        for (j = i - step; j &gt;= 0 &amp;&amp; ret[j] &gt; currentNumber; j -= step) {
          ret[j + step] = ret[j]
        }
        ret[j + step] = currentNumber
      }
    }
  }
}

let tmp = new ArrayData()
arr.forEach((item) =&gt; {
  tmp.push(item)
})
tmp.shellSort()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ArrayData</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// ......</span>
  <span class="hljs-keyword">this</span>.shellSort = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> length = ret.length
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> step = <span class="hljs-built_in">Math</span>.floor(length / <span class="hljs-number">2</span>); step &gt; <span class="hljs-number">0</span>; step = <span class="hljs-built_in">Math</span>.floor(step / <span class="hljs-number">2</span>)) {
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; step; i++) {
        shellInsertSort(i, step)
      }
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shellInsertSort</span>(<span class="hljs-params">index, step</span>) </span>{
      <span class="hljs-keyword">let</span> length = ret.length
      <span class="hljs-keyword">let</span> j
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = index; i &lt; length; i += step) {
        <span class="hljs-keyword">let</span> currentNumber = ret[i]
        <span class="hljs-keyword">for</span> (j = i - step; j &gt;= <span class="hljs-number">0</span> &amp;&amp; ret[j] &gt; currentNumber; j -= step) {
          ret[j + step] = ret[j]
        }
        ret[j + step] = currentNumber
      }
    }
  }
}

<span class="hljs-keyword">let</span> tmp = <span class="hljs-keyword">new</span> ArrayData()
arr.forEach(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
  tmp.push(item)
})
tmp.shellSort()</code></pre><h2 id="articleHeader5">&#x5F52;&#x5E76;&#x6392;&#x5E8F;</h2><p>&#x2003;&#x2003;&#x5F52;&#x5E76;&#x6392;&#x5E8F;&#x91C7;&#x7528;&#x5206;&#x6CBB;&#x7684;&#x601D;&#x60F3;&#xFF0C;&#x5C06;&#x5DF2;&#x6709;&#x5E8F;&#x7684;&#x5B50;&#x5E8F;&#x5217;&#x5408;&#x5E76;&#xFF0C;&#x5F97;&#x5230;&#x5B8C;&#x5168;&#x6709;&#x5E8F;&#x7684;&#x5E8F;&#x5217;&#x3002;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x628A;&#x6570;&#x5217;&#x5206;&#x5272;&#x6210;&#x4E0D;&#x8D85;&#x8FC7;&#x4E24;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x7136;&#x540E;&#x5C06;&#x5176;&#x5408;&#x5E76;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ArrayData () {
    // ......
  this.mergeSort = function () {
    ret = mergeSortFun(ret)

    function mergeSortFun(arr) {
      let length = arr.length
      if (length &lt;= 1) {
        return arr
      }
      let mid = Math.floor(length / 2),
        left = arr.slice(0, mid),
        right = arr.slice(mid, length)
      return mengeConnect(mergeSortFun(left), mergeSortFun(right))
    }

    function mengeConnect(left, right) {
      let
        leftIndex = 0,
        rightIndex = 0,
        result = []
      while (leftIndex &lt; left.length &amp;&amp; rightIndex &lt; right.length) {
        result.push(left[leftIndex] &lt; right[rightIndex] ? left[leftIndex++] : right[rightIndex++])
      }
      while (leftIndex &lt; left.length) {
        result.push(left[leftIndex++])
      }
      while (rightIndex &lt; right.length) {
        result.push(right[rightIndex++])
      }
      return result
    }
  }
}

let tmp = new ArrayData()
arr.forEach((item) =&gt; {
  tmp.push(item)
})
tmp.mergeSort()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ArrayData</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// ......</span>
  <span class="hljs-keyword">this</span>.mergeSort = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    ret = mergeSortFun(ret)

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mergeSortFun</span>(<span class="hljs-params">arr</span>) </span>{
      <span class="hljs-keyword">let</span> length = arr.length
      <span class="hljs-keyword">if</span> (length &lt;= <span class="hljs-number">1</span>) {
        <span class="hljs-keyword">return</span> arr
      }
      <span class="hljs-keyword">let</span> mid = <span class="hljs-built_in">Math</span>.floor(length / <span class="hljs-number">2</span>),
        left = arr.slice(<span class="hljs-number">0</span>, mid),
        right = arr.slice(mid, length)
      <span class="hljs-keyword">return</span> mengeConnect(mergeSortFun(left), mergeSortFun(right))
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mengeConnect</span>(<span class="hljs-params">left, right</span>) </span>{
      <span class="hljs-keyword">let</span>
        leftIndex = <span class="hljs-number">0</span>,
        rightIndex = <span class="hljs-number">0</span>,
        result = []
      <span class="hljs-keyword">while</span> (leftIndex &lt; left.length &amp;&amp; rightIndex &lt; right.length) {
        result.push(left[leftIndex] &lt; right[rightIndex] ? left[leftIndex++] : right[rightIndex++])
      }
      <span class="hljs-keyword">while</span> (leftIndex &lt; left.length) {
        result.push(left[leftIndex++])
      }
      <span class="hljs-keyword">while</span> (rightIndex &lt; right.length) {
        result.push(right[rightIndex++])
      }
      <span class="hljs-keyword">return</span> result
    }
  }
}

<span class="hljs-keyword">let</span> tmp = <span class="hljs-keyword">new</span> ArrayData()
arr.forEach(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
  tmp.push(item)
})
tmp.mergeSort()</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript常见排序算法的笔记

## 原文链接
[https://segmentfault.com/a/1190000015347051](https://segmentfault.com/a/1190000015347051)

