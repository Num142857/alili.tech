---
title: 使用Jest测试JavaScript (入门篇)
hidden: true
categories: [reprint]
slug: 624d0c17
date: 2018-11-13 02:30:09
---

{{< raw >}}
<h3><strong>1 &#x4EC0;&#x4E48;&#x662F; Jest?</strong></h3><p><span class="img-wrap"><img data-src="/img/remote/1460000016232251?w=972&amp;h=503" src="https://static.alili.tech/img/remote/1460000016232251?w=972&amp;h=503" alt="image_1cm920qh8c84igb1o1lbsi16jb16.png-43.4kB" title="image_1cm920qh8c84igb1o1lbsi16jb16.png-43.4kB"></span></p><p>Jest&#x662F; Facebook &#x7684;&#x4E00;&#x5957;&#x5F00;&#x6E90;&#x7684; JavaScript &#x6D4B;&#x8BD5;&#x6846;&#x67B6;&#xFF0C; &#x5B83;&#x81EA;&#x52A8;&#x96C6;&#x6210;&#x4E86;&#x65AD;&#x8A00;&#x3001;JSDom&#x3001;&#x8986;&#x76D6;&#x7387;&#x62A5;&#x544A;&#x7B49;&#x5F00;&#x53D1;&#x8005;&#x6240;&#x9700;&#x8981;&#x7684;&#x6240;&#x6709;&#x6D4B;&#x8BD5;&#x5DE5;&#x5177;&#xFF0C;&#x662F;&#x4E00;&#x6B3E;&#x51E0;&#x4E4E;&#x96F6;&#x914D;&#x7F6E;&#x7684;&#x6D4B;&#x8BD5;&#x6846;&#x67B6;&#x3002;&#x5E76;&#x4E14;&#x5B83;&#x5BF9;&#x540C;&#x6837;&#x662F; Facebook &#x7684;&#x5F00;&#x6E90;&#x524D;&#x7AEF;&#x6846;&#x67B6; React &#x7684;&#x6D4B;&#x8BD5;&#x5341;&#x5206;&#x53CB;&#x597D;&#x3002;</p><h3><strong>2 &#x5B89;&#x88C5;Jest</strong></h3><h4><strong>2.1 &#x521D;&#x59CB;&#x5316;<code>package.json</code></strong></h4><p>&#x5728;<code>shell</code>&#x4E2D;&#x8F93;&#x5165;&#x4EE5;&#x4E0B;&#x547D;&#x4EE4;&#xFF0C;&#x521D;&#x59CB;&#x5316;&#x524D;&#x7AEF;&#x9879;&#x76EE;&#x5E76;&#x751F;&#x6210;<code>package.json</code>&#xFF1A;</p><pre><code>npm init -y</code></pre><h4><strong>2.2 &#x5B89;&#x88C5;Jest&#x53CA;&#x76F8;&#x5173;&#x4F9D;&#x8D56;</strong></h4><p>&#x5728;<code>shell</code>&#x4E2D;&#x8F93;&#x5165;&#x4EE5;&#x4E0B;&#x547D;&#x4EE4;&#xFF0C;&#x5B89;&#x88C5;&#x6D4B;&#x8BD5;&#x6240;&#x9700;&#x8981;&#x7684;&#x4F9D;&#x8D56;&#xFF1A;</p><pre><code>npm install -D jest babel-jest babel-core babel-preset-env regenerator-runtime</code></pre><p><code>babel-jest</code>&#x3001; <code>babel-core</code>&#x3001; <code>regenerator-runtime</code>&#x3001;<code>babel-preset-env</code>&#x8FD9;&#x51E0;&#x4E2A;&#x4F9D;&#x8D56;&#x662F;&#x4E3A;&#x4E86;&#x8BA9;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;ES6&#x7684;&#x8BED;&#x6CD5;&#x7279;&#x6027;&#x8FDB;&#x884C;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#xFF0C;ES6&#x63D0;&#x4F9B;&#x7684; <code>import</code> &#x6765;&#x5BFC;&#x5165;&#x6A21;&#x5757;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;Jest&#x672C;&#x8EAB;&#x662F;&#x4E0D;&#x652F;&#x6301;&#x7684;&#x3002;</p><h4><strong>2.3 &#x6DFB;&#x52A0;<code>.babelrc</code>&#x6587;&#x4EF6;</strong></h4><p>&#x5728;&#x9879;&#x76EE;&#x7684;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x6DFB;&#x52A0;<code>.babelrc</code>&#x6587;&#x4EF6;&#xFF0C;&#x5E76;&#x5728;&#x6587;&#x4EF6;&#x590D;&#x5236;&#x5982;&#x4E0B;&#x5185;&#x5BB9;:</p><pre><code class="JSON">{
  &quot;presets&quot;: [&quot;env&quot;]
}</code></pre><h4><strong>2.4 &#x4FEE;&#x6539;<code>package.json</code>&#x4E2D;&#x7684;<code>test</code>&#x811A;&#x672C;</strong></h4><p>&#x6253;&#x5F00;<code>package.json</code>&#x6587;&#x4EF6;&#xFF0C;&#x5C06;<code>script</code>&#x4E0B;&#x7684;<code>test</code>&#x7684;&#x503C;&#x4FEE;&#x6539;&#x4E3A;<code>jest</code>&#xFF1A;</p><pre><code>&quot;scripts&quot;: {
  &quot;test&quot;: &quot;jest&quot;
}</code></pre><h3><strong>3. &#x7F16;&#x5199;&#x4F60;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;Jest&#x6D4B;&#x8BD5;</strong></h3><p><strong>&#x521B;&#x5EFA;<code>src</code>&#x548C;<code>test</code>&#x76EE;&#x5F55;&#x53CA;&#x76F8;&#x5173;&#x6587;&#x4EF6;</strong></p><ul><li>&#x5728;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x521B;&#x5EFA;<code>src</code>&#x76EE;&#x5F55;&#xFF0C;&#x5E76;&#x5728;<code>src</code>&#x76EE;&#x5F55;&#x4E0B;&#x6DFB;&#x52A0;<code>functions.js</code>&#x6587;&#x4EF6;</li><li>&#x5728;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x521B;&#x5EFA;<code>test</code>&#x76EE;&#x5F55;&#xFF0C;&#x5E76;&#x5728;<code>test</code>&#x76EE;&#x5F55;&#x4E0B;&#x521B;&#x5EFA;<code>functions.test.js</code>&#x6587;&#x4EF6;</li></ul><p>Jest&#x4F1A;&#x81EA;&#x52A8;&#x627E;&#x5230;&#x9879;&#x76EE;&#x4E2D;&#x6240;&#x6709;&#x4F7F;&#x7528;<code>.spec.js</code>&#x6216;<code>.test.js</code>&#x6587;&#x4EF6;&#x547D;&#x540D;&#x7684;&#x6D4B;&#x8BD5;&#x6587;&#x4EF6;&#x5E76;&#x6267;&#x884C;&#xFF0C;&#x901A;&#x5E38;&#x6211;&#x4EEC;&#x5728;&#x7F16;&#x5199;&#x6D4B;&#x8BD5;&#x6587;&#x4EF6;&#x65F6;&#x9075;&#x5FAA;&#x7684;&#x547D;&#x540D;&#x89C4;&#x8303;&#xFF1A;<strong>&#x6D4B;&#x8BD5;&#x6587;&#x4EF6;&#x7684;&#x6587;&#x4EF6;&#x540D; = &#x88AB;&#x6D4B;&#x8BD5;&#x6A21;&#x5757;&#x540D; + <code>.test.js</code></strong>&#xFF0C;&#x4F8B;&#x5982;&#x88AB;&#x6D4B;&#x8BD5;&#x6A21;&#x5757;&#x4E3A;<code>functions.js</code>&#xFF0C;&#x90A3;&#x4E48;&#x5BF9;&#x5E94;&#x7684;&#x6D4B;&#x8BD5;&#x6587;&#x4EF6;&#x547D;&#x540D;&#x4E3A;<code>functions.test.js</code>&#x3002;</p><p><strong>&#x5728;<code>src/functions.js</code>&#x4E2D;&#x521B;&#x5EFA;&#x88AB;&#x6D4B;&#x8BD5;&#x7684;&#x6A21;&#x5757;</strong></p><pre><code class="JavaScript">export default {
  sum(a, b) {
    return a + b;
  }
}</code></pre><p><strong>&#x5728;<code>test/functions.test.js</code>&#x6587;&#x4EF6;&#x4E2D;&#x521B;&#x5EFA;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;</strong></p><pre><code class="JavaScript">import functions  from &apos;../src/functions&apos;;

test(&apos;sum(2 + 2) &#x7B49;&#x4E8E; 4&apos;, () =&gt; {
  expect(functions.sum(2, 2)).toBe(4);
})</code></pre><p><strong>&#x8FD0;&#x884C;<code>npm run test</code>, Jest&#x4F1A;&#x5728;<code>shell</code>&#x4E2D;&#x6253;&#x5370;&#x51FA;&#x4EE5;&#x4E0B;&#x6D88;&#x606F;&#xFF1A;</strong></p><pre><code class="JavaScript"> PASS  test/functions.test.js
  &#x221A; sum(2 + 2) &#x7B49;&#x4E8E; 4 (7ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        4.8s</code></pre><h3><strong>4.&#x5E38;&#x7528;&#x7684;&#x51E0;&#x4E2A;Jest&#x65AD;&#x8A00;</strong></h3><p>&#x4E0A;&#x9762;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x4E2D;&#x7684;<code>expect(functions.sum(2, 2)).toBe(4)</code>&#x4E3A;&#x4E00;&#x53E5;&#x65AD;&#x8A00;&#xFF0C;Jest&#x4E3A;&#x6211;&#x4EEC;&#x63D0;&#x4F9B;&#x4E86;<code>expect</code>&#x51FD;&#x6570;&#x7528;&#x6765;&#x5305;&#x88C5;&#x88AB;&#x6D4B;&#x8BD5;&#x7684;&#x65B9;&#x6CD5;&#x5E76;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x8BE5;&#x5BF9;&#x8C61;&#x4E2D;&#x5305;&#x542B;&#x4E00;&#x7CFB;&#x5217;&#x7684;&#x5339;&#x914D;&#x5668;&#x6765;&#x8BA9;&#x6211;&#x4EEC;&#x66F4;&#x65B9;&#x4FBF;&#x7684;&#x8FDB;&#x884C;&#x65AD;&#x8A00;&#xFF0C;&#x4E0A;&#x9762;&#x7684;<code>toBe</code>&#x51FD;&#x6570;&#x5373;&#x4E3A;&#x4E00;&#x4E2A;&#x5339;&#x914D;&#x5668;&#x3002;&#x6211;&#x4EEC;&#x6765;&#x4ECB;&#x7ECD;&#x51E0;&#x79CD;&#x5E38;&#x7528;&#x7684;Jest&#x65AD;&#x8A00;&#xFF0C;&#x5176;&#x4E2D;&#x4F1A;&#x6D89;&#x53CA;&#x591A;&#x4E2A;&#x5339;&#x914D;&#x5668;&#x3002;</p><p><strong><code>.not</code></strong></p><pre><code class="JavaScript">//functions.test.js
import functions  from &apos;../src/functions&apos;

test(&apos;sum(2, 2) &#x4E0D;&#x7B49;&#x4E8E; 5&apos;, () =&gt; {
  expect(functions.sum(2, 2)).not.toBe(5);
})</code></pre><p><code>.not</code>&#x4FEE;&#x9970;&#x7B26;&#x5141;&#x8BB8;&#x4F60;&#x6D4B;&#x8BD5;&#x7ED3;&#x679C;&#x4E0D;&#x7B49;&#x4E8E;&#x67D0;&#x4E2A;&#x503C;&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x8FD9;&#x548C;&#x82F1;&#x8BED;&#x7684;&#x8BED;&#x6CD5;&#x51E0;&#x4E4E;&#x5B8C;&#x5168;&#x4E00;&#x6837;&#xFF0C;&#x5F88;&#x597D;&#x7406;&#x89E3;&#x3002;</p><p><strong><code>.toEqual()</code></strong></p><pre><code class="JavaScript">// functions.js
export default {
  getAuthor() {
    return {
      name: &apos;LITANGHUI&apos;,
      age: 24,
    }
  }
}</code></pre><pre><code class="JavaScript">// functions.test.js
import functions  from &apos;../src/functions&apos;;

test(&apos;getAuthor()&#x8FD4;&#x56DE;&#x7684;&#x5BF9;&#x8C61;&#x6DF1;&#x5EA6;&#x76F8;&#x7B49;&apos;, () =&gt; {
  expect(functions.getAuthor()).toEqual(functions.getAuthor());
})

test(&apos;getAuthor()&#x8FD4;&#x56DE;&#x7684;&#x5BF9;&#x8C61;&#x5185;&#x5B58;&#x5730;&#x5740;&#x4E0D;&#x540C;&apos;, () =&gt; {
  expect(functions.getAuthor()).not.toBe(functions.getAuthor());
})</code></pre><p><code>.toEqual</code>&#x5339;&#x914D;&#x5668;&#x4F1A;&#x9012;&#x5F52;&#x7684;&#x68C0;&#x67E5;&#x5BF9;&#x8C61;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x548C;&#x5C5E;&#x6027;&#x503C;&#x662F;&#x5426;&#x76F8;&#x7B49;&#xFF0C;&#x6240;&#x4EE5;&#x5982;&#x679C;&#x8981;&#x8FDB;&#x884C;&#x5E94;&#x7528;&#x7C7B;&#x578B;&#x7684;&#x6BD4;&#x8F83;&#x65F6;&#xFF0C;&#x8BF7;&#x4F7F;&#x7528;<code>.toEqual</code>&#x5339;&#x914D;&#x5668;&#x800C;&#x4E0D;&#x662F;<code>.toBe</code>&#x3002;</p><p><strong><code>.toHaveLength</code></strong></p><pre><code class="JavaScript">// functions.js
export default {
  getIntArray(num) {
    if (!Number.isInteger(num)) {
      throw Error(&apos;&quot;getIntArray&quot;&#x53EA;&#x63A5;&#x53D7;&#x6574;&#x6570;&#x7C7B;&#x578B;&#x7684;&#x53C2;&#x6570;&apos;);
    }

    let result = [];
    for (let i = 0, len = num; i &lt; len; i++) {
      result.push(i);
    }
    
    return result;
  }
}</code></pre><pre><code class="JavaScript">// functions.test.js
import functions  from &apos;../src/functions&apos;;

test(&apos;getIntArray(3)&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#x5E94;&#x8BE5;&#x4E3A;3&apos;, () =&gt; {
  expect(functions.getIntArray(3)).toHaveLength(3);
})</code></pre><p><code>.toHaveLength</code>&#x53EF;&#x4EE5;&#x5F88;&#x65B9;&#x4FBF;&#x7684;&#x7528;&#x6765;&#x6D4B;&#x8BD5;&#x5B57;&#x7B26;&#x4E32;&#x548C;&#x6570;&#x7EC4;&#x7C7B;&#x578B;&#x7684;&#x957F;&#x5EA6;&#x662F;&#x5426;&#x6EE1;&#x8DB3;&#x9884;&#x671F;&#x3002;</p><p><strong><code>.toThrow</code></strong></p><pre><code class="JavaScript">// functions.test.js
import functions  from &apos;../src/functions&apos;;

test(&apos;getIntArray(3.3)&#x5E94;&#x8BE5;&#x629B;&#x51FA;&#x9519;&#x8BEF;&apos;, () =&gt; {
  function getIntArrayWrapFn() {
    functions.getIntArray(3.3);
  }
  expect(getIntArrayWrapFn).toThrow(&apos;&quot;getIntArray&quot;&#x53EA;&#x63A5;&#x53D7;&#x6574;&#x6570;&#x7C7B;&#x578B;&#x7684;&#x53C2;&#x6570;&apos;);
})</code></pre><p><code>.toThorw</code>&#x53EF;&#x80FD;&#x591F;&#x8BA9;&#x6211;&#x4EEC;&#x6D4B;&#x8BD5;&#x88AB;&#x6D4B;&#x8BD5;&#x65B9;&#x6CD5;&#x662F;&#x5426;&#x6309;&#x7167;&#x9884;&#x671F;&#x629B;&#x51FA;&#x5F02;&#x5E38;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x4F7F;&#x7528;&#x65F6;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF1A;<strong>&#x6211;&#x4EEC;&#x5FC5;&#x987B;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5C06;&#x5C06;&#x88AB;&#x6D4B;&#x8BD5;&#x7684;&#x51FD;&#x6570;&#x505A;&#x4E00;&#x4E2A;&#x5305;&#x88C5;</strong>&#xFF0C;&#x6B63;&#x5982;&#x4E0A;&#x9762;<code>getIntArrayWrapFn</code>&#x6240;&#x505A;&#x7684;&#x90A3;&#x6837;&#xFF0C;&#x5426;&#x5219;&#x4F1A;&#x56E0;&#x4E3A;&#x51FD;&#x6570;&#x629B;&#x51FA;&#x5BFC;&#x81F4;&#x8BE5;&#x65AD;&#x8A00;&#x5931;&#x8D25;&#x3002;</p><p><strong><code>.toMatch</code></strong></p><pre><code class="JavaScript">// functions.test.js
import functions  from &apos;../src/functions&apos;;

test(&apos;getAuthor().name&#x5E94;&#x8BE5;&#x5305;&#x542B;&quot;li&quot;&#x8FD9;&#x4E2A;&#x59D3;&#x6C0F;&apos;, () =&gt; {
  expect(functions.getAuthor().name).toMatch(/li/i);
})</code></pre><p><code>.toMatch</code>&#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x5B83;&#x5141;&#x8BB8;&#x6211;&#x4EEC;&#x7528;&#x6765;&#x8FDB;&#x884C;&#x5B57;&#x7B26;&#x4E32;&#x7C7B;&#x578B;&#x7684;&#x6B63;&#x5219;&#x5339;&#x914D;&#x3002;</p><h3><strong>5 &#x6D4B;&#x8BD5;&#x5F02;&#x6B65;&#x51FD;&#x6570;</strong></h3><p><strong>&#x5B89;&#x88C5;<code>axios</code></strong><br>&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x6700;&#x5E38;&#x7528;&#x7684;http&#x8BF7;&#x6C42;&#x5E93;<code>axios</code>&#x6765;&#x8FDB;&#x884C;&#x8BF7;&#x6C42;&#x5904;&#x7406;</p><pre><code>npm install axios</code></pre><p><strong>&#x7F16;&#x5199;http&#x8BF7;&#x6C42;&#x51FD;&#x6570;</strong><br>&#x6211;&#x4EEC;&#x5C06;&#x8BF7;&#x6C42;<code>http://jsonplaceholder.typicode.com/users/1</code>&#xFF0C;&#x8FD9;&#x662F;&#x7531;<strong>JSONPlaceholder</strong>&#x63D0;&#x4F9B;&#x7684;mock&#x8BF7;&#x6C42;&#x5730;&#x5740;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016232252" src="https://static.alili.tech/img/remote/1460000016232252" alt="image_1cm9b6gjprkq1ij11o48a4b1as01j.png-36.1kB" title="image_1cm9b6gjprkq1ij11o48a4b1as01j.png-36.1kB"></span></p><pre><code class="JavaScript">// functions.js
import axios from &apos;axios&apos;;

export default {
  fetchUser() {
    return axios.get(&apos;http://jsonplaceholder.typicode.com/users/1&apos;)
      .then(res =&gt; res.data)
      .catch(error =&gt; console.log(error));
  }
}</code></pre><pre><code>// functions.test.js
import functions  from &apos;../src/functions&apos;;

test(&apos;fetchUser() &#x53EF;&#x4EE5;&#x8BF7;&#x6C42;&#x5230;&#x4E00;&#x4E2A;&#x542B;&#x6709;name&#x5C5E;&#x6027;&#x503C;&#x4E3A;Leanne Graham&#x7684;&#x5BF9;&#x8C61;&apos;, () =&gt; {
  expect.assertions(1);
  return functions.fetchUser()
    .then(data =&gt; {
      expect(data.name).toBe(&apos;Leanne Graham&apos;);
    });
})</code></pre><p>&#x4E0A;&#x9762;&#x6211;&#x4EEC;&#x8C03;&#x7528;&#x4E86;<code>expect.assertions(1)</code>&#xFF0C;&#x5B83;&#x80FD;&#x786E;&#x4FDD;&#x5728;&#x5F02;&#x6B65;&#x7684;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x4E2D;&#xFF0C;&#x6709;&#x4E00;&#x4E2A;&#x65AD;&#x8A00;&#x4F1A;&#x5728;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;&#x88AB;&#x6267;&#x884C;&#x3002;&#x8FD9;&#x5728;&#x8FDB;&#x884C;&#x5F02;&#x6B65;&#x4EE3;&#x7801;&#x7684;&#x6D4B;&#x8BD5;&#x4E2D;&#x5341;&#x5206;&#x6709;&#x6548;&#x3002;</p><p><strong>&#x4F7F;&#x7528;<code>async</code>&#x548C;<code>await</code>&#x7CBE;&#x7B80;&#x5F02;&#x6B65;&#x4EE3;&#x7801;</strong></p><pre><code class="JavaScript">test(&apos;fetchUser() &#x53EF;&#x4EE5;&#x8BF7;&#x6C42;&#x5230;&#x4E00;&#x4E2A;&#x7528;&#x6237;&#x540D;&#x5B57;&#x4E3A;Leanne Graham&apos;, async () =&gt; {
  expect.assertions(1);
  const data =  await functions.fetchUser();
  expect(data.name).toBe(&apos;Leanne Graham&apos;)
})</code></pre><p>&#x5F53;&#x7136;&#x6211;&#x4EEC;&#x65E2;&#x7136;&#x5B89;&#x88C5;&#x4E86;<code>Babel</code>&#xFF0C;&#x4E3A;&#x4F55;&#x4E0D;&#x4F7F;&#x7528;<code>async</code>&#x548C;<code>await</code>&#x7684;&#x8BED;&#x6CD5;&#x6765;&#x7CBE;&#x7B80;&#x6211;&#x4EEC;&#x7684;&#x5F02;&#x6B65;&#x6D4B;&#x8BD5;&#x4EE3;&#x7801;&#x5462;? &#x4F46;&#x662F;&#x522B;&#x5FD8;&#x8BB0;&#x90FD;&#x9700;&#x8981;&#x8C03;&#x7528;<code>expect.assertions</code>&#x65B9;&#x6CD5;</p><h2>&#x53C2;&#x8003;&#x8D44;&#x6599;</h2><p>&#x3010;1&#x3011; Jest&#x5B98;&#x65B9;&#x6587;&#x6863;(<a href="https://jestjs.io/zh-Hans/)" rel="nofollow noreferrer">https://jestjs.io/zh-Hans/)</a><br>&#x3010;2&#x3011; Jest Crash Course - Unit Testing in JavaScript(<a href="https://www.youtube.com/watch?v=7r4xVDI2vho)" rel="nofollow noreferrer">https://www.youtube.com/watch...</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Jest测试JavaScript (入门篇)

## 原文链接
[https://segmentfault.com/a/1190000016232248](https://segmentfault.com/a/1190000016232248)

