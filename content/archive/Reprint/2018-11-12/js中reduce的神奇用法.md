---
title: js中reduce的神奇用法
reprint: true
categories: reprint
abbrlink: 3ec7546c
date: 2018-11-12 02:30:05
---

{{% raw %}}
<h2><span class="img-wrap"><img data-src="/img/remote/1460000016287314?w=6000&amp;h=3000" src="https://static.alili.tech/img/remote/1460000016287314?w=6000&amp;h=3000" alt="" title=""></span></h2><blockquote>&#x6700;&#x8FD1;&#x7ECF;&#x5E38;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x7ECF;&#x5E38;&#x770B;&#x5230;&#x522B;&#x4EBA;&#x7528;reduce&#x5904;&#x7406;&#x6570;&#x636E;&#xFF0C;&#x5F88;&#x662F;&#x725B;&#x63B0;&#xFF0C;&#x5F88;&#x68A6;&#x5E7B;&#xFF0C; &#x4E0D;&#x5982;&#x81EA;&#x5DF1;&#x7422;&#x78E8;&#x7422;&#x78E8;&#x3002;</blockquote><h3>&#x5148;&#x770B;w3c&#x8BED;&#x6CD5;</h3><pre><code>array.reduce(function(total, currentValue, currentIndex, arr), initialValue);
/*
  total: &#x5FC5;&#x9700;&#x3002;&#x521D;&#x59CB;&#x503C;, &#x6216;&#x8005;&#x8BA1;&#x7B97;&#x7ED3;&#x675F;&#x540E;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x3002;
  currentValue&#xFF1A; &#x5FC5;&#x9700;&#x3002;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x3002;
  currentIndex&#xFF1A; &#x53EF;&#x9009;&#x3002;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#xFF1B;                     
  arr&#xFF1A; &#x53EF;&#x9009;&#x3002;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x6240;&#x5C5E;&#x7684;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x3002;
  initialValue: &#x53EF;&#x9009;&#x3002;&#x4F20;&#x9012;&#x7ED9;&#x51FD;&#x6570;&#x7684;&#x521D;&#x59CB;&#x503C;&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;total&#x7684;&#x521D;&#x59CB;&#x503C;&#x3002;
*/</code></pre><h3>&#x5E38;&#x89C1;&#x7528;&#x6CD5;</h3><h4>&#x6570;&#x7EC4;&#x6C42;&#x548C;</h4><pre><code>const arr = [12, 34, 23];
const sum = arr.reduce((total, num) =&gt; total + num);
&lt;!-- &#x8BBE;&#x5B9A;&#x521D;&#x59CB;&#x503C;&#x6C42;&#x548C; --&gt;
const arr = [12, 34, 23];
const sum = arr.reduce((total, num) =&gt; total + num, 10);  // &#x4EE5;10&#x4E3A;&#x521D;&#x59CB;&#x503C;&#x6C42;&#x548C;
&lt;!-- &#x5BF9;&#x8C61;&#x6570;&#x7EC4;&#x6C42;&#x548C; --&gt;
var result = [
  { subject: &apos;math&apos;, score: 88 },
  { subject: &apos;chinese&apos;, score: 95 },
  { subject: &apos;english&apos;, score: 80 }
];
const sum = result.reduce((accumulator, cur) =&gt; accumulator + cur.score, 0); 
const sum = result.reduce((accumulator, cur) =&gt; accumulator + cur.score, -10);  // &#x603B;&#x5206;&#x6263;&#x9664;10&#x5206;</code></pre><h4>&#x6570;&#x7EC4;&#x6700;&#x5927;&#x503C;</h4><pre><code>const a = [23,123,342,12];
const max = a.reduce(function(pre,cur,inde,arr){return pre&gt;cur?pre:cur;}); // 342
</code></pre><h3>&#x8FDB;&#x9636;&#x7528;&#x6CD5;</h3><h4>&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x7528;&#x6CD5;</h4><pre><code>&lt;!-- &#x6BD4;&#x5982;&#x751F;&#x6210;&#x201C;&#x8001;&#x5927;&#x3001;&#x8001;&#x4E8C;&#x548C;&#x8001;&#x4E09;&#x201D; --&gt;
const objArr = [{name: &apos;&#x8001;&#x5927;&apos;}, {name: &apos;&#x8001;&#x4E8C;&apos;}, {name: &apos;&#x8001;&#x4E09;&apos;}];
const res = objArr.reduce((pre, cur, index, arr) =&gt; {
  if (index === 0) {
    return cur.name;
  }
  else if (index === (arr.length - 1)) {
    return pre + &apos;&#x548C;&apos; + cur.name;
  }
  else {
    return pre + &apos;&#x3001;&apos; + cur.name;
  }
}, &apos;&apos;);</code></pre><h4>&#x6C42;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x5B57;&#x6BCD;&#x51FA;&#x73B0;&#x7684;&#x6B21;&#x6570;</h4><pre><code>const str = &apos;sfhjasfjgfasjuwqrqadqeiqsajsdaiwqdaklldflas-cmxzmnha&apos;;
const res = str.split(&apos;&apos;).reduce((accumulator, cur) =&gt; {accumulator[cur] ? accumulator[cur]++ : accumulator[cur] = 1; return accumulator;}, {});</code></pre><h4>&#x6570;&#x7EC4;&#x8F6C;&#x6570;&#x7EC4;</h4><pre><code>&lt;!-- &#x6309;&#x7167;&#x4E00;&#x5B9A;&#x7684;&#x89C4;&#x5219;&#x8F6C;&#x6210;&#x6570;&#x7EC4; --&gt;
var arr1 = [2, 3, 4, 5, 6]; // &#x6BCF;&#x4E2A;&#x503C;&#x7684;&#x5E73;&#x65B9;
var newarr = arr1.reduce((accumulator, cur) =&gt; {accumulator.push(cur * cur); return accumulator;}, []);
</code></pre><h4>&#x6570;&#x7EC4;&#x8F6C;&#x5BF9;&#x8C61;</h4><pre><code>&lt;!-- &#x6309;&#x7167;id &#x53D6;&#x51FA;stream --&gt;
var streams = [{name: &apos;&#x6280;&#x672F;&apos;, id: 1}, {name: &apos;&#x8BBE;&#x8BA1;&apos;, id: 2}];
var obj = streams.reduce((accumulator, cur) =&gt; {accumulator[cur.id] = cur; return accumulator;}, {});</code></pre><h3>&#x9AD8;&#x7EA7;&#x7528;&#x6CD5;</h3><h4>&#x591A;&#x7EF4;&#x7684;&#x53E0;&#x52A0;&#x6267;&#x884C;&#x64CD;&#x4F5C;</h4><pre><code>&lt;!-- &#x5404;&#x79D1;&#x6210;&#x7EE9;&#x5360;&#x6BD4;&#x91CD;&#x4E0D;&#x4E00;&#x6837;&#xFF0C; &#x6C42;&#x7ED3;&#x679C; --&gt;
var result = [
  { subject: &apos;math&apos;, score: 88 },
  { subject: &apos;chinese&apos;, score: 95 },
  { subject: &apos;english&apos;, score: 80 }
];
var dis = {
    math: 0.5,
    chinese: 0.3,
    english: 0.2
};
var res = result.reduce((accumulator, cur) =&gt; dis[cur.subject] * cur.score + accumulator, 0);

&lt;!-- &#x52A0;&#x5927;&#x96BE;&#x5EA6;&#xFF0C; &#x5546;&#x54C1;&#x5BF9;&#x5E94;&#x4E0D;&#x540C;&#x56FD;&#x5BB6;&#x6C47;&#x7387;&#x4E0D;&#x540C;&#xFF0C;&#x6C42;&#x603B;&#x4EF7;&#x683C; --&gt;
var prices = [{price: 23}, {price: 45}, {price: 56}];
var rates = {
  us: &apos;6.5&apos;,
  eu: &apos;7.5&apos;,
};
var initialState = {usTotal:0, euTotal: 0};
var res = prices.reduce((accumulator, cur1) =&gt; Object.keys(rates).reduce((prev2, cur2) =&gt; {
  console.log(accumulator, cur1, prev2, cur2);
  accumulator[`${cur2}Total`] += cur1.price * rates[cur2];
  return accumulator;
}, {}), initialState);

var manageReducers = function() {
  return function(state, item) {
    return Object.keys(rates).reduce((nextState, key) =&gt; {
        state[`${key}Total`] += item.price * rates[key];
        return state;
      }, {});
  }
};
var res1= prices.reduce(manageReducers(), initialState);
</code></pre><h4>&#x6241;&#x5E73;&#x4E00;&#x4E2A;&#x591A;&#x7EF4;&#x6570;&#x7EC4;</h4><pre><code>var arr = [[1, 2, 8], [3, 4, 9], [5, 6, 10]];
var res = arr.reduce((x, y) =&gt; x.concat(y), []);</code></pre><h4>&#x5BF9;&#x8C61;&#x6570;&#x7EC4;&#x53BB;&#x91CD;</h4><pre><code>const hash = {};
  chatlists = chatlists.reduce((obj, next: Object) =&gt; {
    const hashId = `${next.topic}_${next.stream_id}`;
    if (!hash[hashId]) {
      hash[`${next.topic}_${next.stream_id}`] = true;
      obj.push(next);
    }
    return obj;
  }, []);</code></pre><blockquote>&#x53C2;&#x8003;&#x6587;&#x7AE0;<br><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce" rel="nofollow noreferrer"></a><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce" rel="nofollow noreferrer">https://developer.mozilla.org...</a><br><a href="https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001435119854495d29b9b3d7028477a96ed74db95032675000" rel="nofollow noreferrer"></a><a href="https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001435119854495d29b9b3d7028477a96ed74db95032675000" rel="nofollow noreferrer">https://www.liaoxuefeng.com/w...</a><br><a href="https://aotu.io/notes/2016/04/14/js-reduce/index.html" rel="nofollow noreferrer"></a><a href="https://aotu.io/notes/2016/04/14/js-reduce/index.html" rel="nofollow noreferrer">https://aotu.io/notes/2016/04...</a></blockquote>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js中reduce的神奇用法

## 原文链接
[https://segmentfault.com/a/1190000016265344](https://segmentfault.com/a/1190000016265344)

