---
title: 'js 中一些意想不到的使用技巧（持续更新，欢迎补充）' 
date: 2018-11-15 2:30:08
hidden: true
categories: reprint
---

{{< raw >}}
<h1>js &#x4E2D;&#x4E00;&#x4E9B;&#x610F;&#x60F3;&#x4E0D;&#x5230;&#x7684;&#x4F7F;&#x7528;&#x6280;&#x5DE7;&#xFF08;&#x6301;&#x7EED;&#x66F4;&#x65B0;&#xFF0C;&#x6B22;&#x8FCE;&#x8865;&#x5145;&#xFF09;</h1><h3>1. &#x7BAD;&#x5934;&#x51FD;&#x6570; <code>=&gt;</code> &#x8FD4;&#x56DE; <code>map</code> &#x5BF9;&#x8C61;</h3><pre><code>// &#x4E00;&#x822C;&#x7684;&#x5199;&#x6CD5;
const makeMap = () =&gt; {
  return {key: &apos;value&apos;};
};

// &#x7B80;&#x6D01;&#x7684;&#x5199;&#x6CD5;
const makeMap = () =&gt; ({key: &apos;value&apos;});</code></pre><h3>2. &#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x540D;&#x4E0D;&#x786E;&#x5B9A;&#xFF0C;&#x9700;&#x8981;&#x52A8;&#x6001;&#x7684;&#x4F20;&#x5165;</h3><pre><code>// &#x4E00;&#x822C;&#x7684;&#x5199;&#x6CD5;
const makeMap = (key, value) =&gt; {
  const obj = {};
  obj[key] = value;
  return obj;
};

// &#x7B80;&#x6D01;&#x7684;&#x5199;&#x6CD5;
const makeMap = (key, value) =&gt; ({[key]: value});</code></pre><h3>3. &#x590D;&#x5236;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x5E76;&#x91CD;&#x5199;&#x5176;&#x4E2D;&#x7684;&#x4E00;&#x4E9B;&#x5C5E;&#x6027;</h3><pre><code>const source = {hello: &apos;hello&apos;, hi: &apos;hi&apos;};

// &#x4E00;&#x822C;&#x7684;&#x5199;&#x6CD5;
const target = Object.assign({}, source);
target.hello = &apos;hello everyone&apos;;

// &#x7B80;&#x6D01;&#x7684;&#x5199;&#x6CD5;
const target = {...source, hello: &apos;hello everyone&apos;};</code></pre><h3>4. &#x6570;&#x7EC4;&#x89E3;&#x6784;&#x4E3A;&#x51FD;&#x6570;&#x53C2;&#x6570;</h3><pre><code>const arr = [1, 2, 3];
const plus = (...args) =&gt; args.reduce((a, b) =&gt; a + b);

// &#x4E00;&#x822C;&#x7684;&#x5199;&#x6CD5;
plus(arr[0], arr[1], arr[2], 4, 5);

// &#x7B80;&#x6D01;&#x7684;&#x5199;&#x6CD5;
plus(...arr, 4, 5);</code></pre><h3>5. &#x5411;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x6DFB;&#x52A0;&#x53E6;&#x4E00;&#x6570;&#x7EC4;&#x7684;&#x6240;&#x6709;&#x5143;&#x7D20;</h3><pre><code>const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// &#x4E00;&#x822C;&#x7684;&#x5199;&#x6CD5;
arr1 = arr1.concat(arr2);

// &#x7B80;&#x6D01;&#x7684;&#x5199;&#x6CD5;
arr1.push(...arr2);</code></pre><h3>6. &#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7B80;&#x5199;</h3><pre><code>// &#x4E00;&#x822C;&#x7684;&#x5199;&#x6CD5;
promise.catch(e =&gt; {
  console.log(e);
});

// &#x7B80;&#x6D01;&#x7684;&#x5199;&#x6CD5;
promise.catch(console.log);</code></pre><h3>7. &#x591A;&#x7EA7;&#x7BAD;&#x5934;&#x51FD;&#x6570; <code>=&gt;</code></h3><pre><code>// &#x4E00;&#x822C;&#x7684;&#x5199;&#x6CD5;
const makeTimesFunc = times =&gt; {
  return value =&gt; {
    return value * times;
  };
};

// &#x7B80;&#x6D01;&#x7684;&#x5199;&#x6CD5;
const makeTimesFunc = times =&gt; value =&gt; value * times;</code></pre><h3>8. &#x4ECE;&#x53F3;&#x5411;&#x5DE6;&#x51FD;&#x6570;&#x590D;&#x5F0F;&#x8C03;&#x7528;</h3><pre><code> // &#x4E0D;&#x786E;&#x5B9A;&#x5143;&#x7D20;&#x4E2A;&#x6570;&#xFF0C;&#x4E3E;&#x4F8B; 3 &#x4E2A;
const fnCollection = [str =&gt; `${str} | fisrt`, str =&gt; `${str} | second`, str =&gt; `${str} | third`];

// &#x4E00;&#x822C;&#x7684;&#x5199;&#x6CD5;
const addManySuffixes = str =&gt; {
  let result = str;
  for(let i = fnCollection.length - 1; i &gt; -1; i -= 1) 
    result = fnCollection[i](result);
  
  return result; 
};

// &#x7B80;&#x6D01;&#x7684;&#x5199;&#x6CD5;
const addManySuffixes = fnCollection.reduce((a, b) =&gt; str =&gt; a(b(str)));
// &#x53EF;&#x4EE5;&#x628A; str &#x53C2;&#x6570;&#x6269;&#x5C55;&#x6210;&#x4EFB;&#x610F;&#x53C2;&#x6570;
const addManySuffixes = fnCollection.reduce((a, b) =&gt; (...args) =&gt; a(b(...args)));</code></pre><h2>&#x540E;&#x7EED;</h2><p>&#x66F4;&#x591A;&#x535A;&#x5BA2;&#xFF0C;&#x67E5;&#x770B; <a href="https://github.com/senntyou/blogs" rel="nofollow noreferrer">https://github.com/senntyou/blogs</a></p><p>&#x4F5C;&#x8005;&#xFF1A;<a href="https://github.com/senntyou" rel="nofollow noreferrer">&#x6DF1;&#x4E88;&#x4E4B; (@senntyou)</a></p><p>&#x7248;&#x6743;&#x58F0;&#x660E;&#xFF1A;&#x81EA;&#x7531;&#x8F6C;&#x8F7D;-&#x975E;&#x5546;&#x7528;-&#x975E;&#x884D;&#x751F;-&#x4FDD;&#x6301;&#x7F72;&#x540D;&#xFF08;<a href="https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh" rel="nofollow noreferrer">&#x521B;&#x610F;&#x5171;&#x4EAB;3.0&#x8BB8;&#x53EF;&#x8BC1;</a>&#xFF09;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js 中一些意想不到的使用技巧（持续更新，欢迎补充）

## 原文链接
[https://segmentfault.com/a/1190000016145299](https://segmentfault.com/a/1190000016145299)

