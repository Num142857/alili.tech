---
title: Async：简洁优雅的异步之道
reprint: true
categories: reprint
abbrlink: 36abf0e
date: 2018-11-13 02:30:09
---

{{% raw %}}
<h2>&#x524D;&#x8A00;</h2><p>&#x5728;&#x5F02;&#x6B65;&#x5904;&#x7406;&#x65B9;&#x6848;&#x4E2D;&#xFF0C;&#x76EE;&#x524D;&#x6700;&#x4E3A;&#x7B80;&#x6D01;&#x4F18;&#x96C5;&#x7684;&#x4FBF;&#x662F;<code>async</code>&#x51FD;&#x6570;&#xFF08;&#x4EE5;&#x4E0B;&#x7B80;&#x79F0;A&#x51FD;&#x6570;&#xFF09;&#x3002;&#x7ECF;&#x8FC7;&#x5FC5;&#x8981;&#x7684;&#x5206;&#x5757;&#x5305;&#x88C5;&#x540E;&#xFF0C;A&#x51FD;&#x6570;&#x80FD;&#x4F7F;&#x591A;&#x4E2A;&#x76F8;&#x5173;&#x7684;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x5982;&#x540C;&#x540C;&#x6B65;&#x64CD;&#x4F5C;&#x4E00;&#x6837;&#x805A;&#x5408;&#x8D77;&#x6765;&#xFF0C;&#x4F7F;&#x5176;&#x76F8;&#x4E92;&#x95F4;&#x7684;&#x5173;&#x7CFB;&#x66F4;&#x4E3A;&#x6E05;&#x6670;&#x3001;&#x8FC7;&#x7A0B;&#x66F4;&#x4E3A;&#x7B80;&#x6D01;&#x3001;&#x8C03;&#x8BD5;&#x66F4;&#x4E3A;&#x65B9;&#x4FBF;&#x3002;&#x5B83;&#x672C;&#x8D28;&#x662F;<code>Generator</code>&#x51FD;&#x6570;&#x7684;&#x8BED;&#x6CD5;&#x7CD6;&#xFF0C;&#x901A;&#x4FD7;&#x7684;&#x8BF4;&#x6CD5;&#x662F;&#x4F7F;&#x7528;G&#x51FD;&#x6570;&#x8FDB;&#x884C;&#x5F02;&#x6B65;&#x5904;&#x7406;&#x7684;&#x589E;&#x5F3A;&#x7248;&#x3002;</p><h2>&#x5C1D;&#x8BD5;</h2><p>&#x5B66;&#x4E60;A&#x51FD;&#x6570;&#x5FC5;&#x987B;&#x6709;<code>Promise</code>&#x57FA;&#x7840;&#xFF0C;&#x6700;&#x597D;&#x8FD8;&#x4E86;&#x89E3;<code>Generator</code>&#x51FD;&#x6570;&#xFF0C;&#x6709;&#x9700;&#x8981;&#x7684;&#x53EF;&#x67E5;&#x770B;<a href="https://segmentfault.com/a/1190000016212269#articleHeader11">&#x5EF6;&#x4F38;</a>&#x5C0F;&#x8282;&#x3002;</p><p>&#x4E3A;&#x4E86;&#x76F4;&#x89C2;&#x7684;&#x611F;&#x53D7;A&#x51FD;&#x6570;&#x7684;&#x9B45;&#x529B;&#xFF0C;&#x4E0B;&#x9762;&#x4F7F;&#x7528;<code>Promise</code>&#x548C;A&#x51FD;&#x6570;&#x8FDB;&#x884C;&#x4E86;&#x76F8;&#x540C;&#x7684;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x3002;&#x8BE5;&#x5F02;&#x6B65;&#x7684;&#x76EE;&#x7684;&#x662F;&#x83B7;&#x53D6;&#x7528;&#x6237;&#x7684;&#x7559;&#x8A00;&#x5217;&#x8868;&#xFF0C;&#x9700;&#x8981;&#x5206;&#x9875;&#xFF0C;&#x5206;&#x9875;&#x7531;&#x540E;&#x53F0;&#x63A7;&#x5236;&#x3002;&#x5177;&#x4F53;&#x7684;&#x64CD;&#x4F5C;&#x662F;&#xFF1A;&#x5148;&#x83B7;&#x53D6;&#x5230;&#x7559;&#x8A00;&#x7684;&#x603B;&#x6761;&#x6570;&#xFF0C;&#x518D;&#x66F4;&#x6B63;&#x5F53;&#x524D;&#x9700;&#x8981;&#x663E;&#x793A;&#x7684;&#x9875;&#x6570;&#xFF08;&#x6BCF;&#x6B21;&#x5207;&#x6362;&#x5230;&#x4E0D;&#x540C;&#x9875;&#x65F6;&#xFF0C;&#x603B;&#x6570;&#x76EE;&#x53EF;&#x80FD;&#x4F1A;&#x53D1;&#x751F;&#x53D8;&#x5316;&#xFF09;&#xFF0C;&#x6700;&#x540E;&#x4F20;&#x9012;&#x53C2;&#x6570;&#x5E76;&#x83B7;&#x53D6;&#x5230;&#x76F8;&#x5E94;&#x7684;&#x6570;&#x636E;&#x3002;</p><pre><code class="js">let totalNum = 0; // Total comments number.
let curPage = 1; // Current page index.
let pageSize = 10; // The number of comment displayed in one page.

// &#x4F7F;&#x7528;A&#x51FD;&#x6570;&#x7684;&#x4E3B;&#x4EE3;&#x7801;&#x3002;
async function dealWithAsync() {
  totalNum = await getListCount();
  console.log(&apos;Get count&apos;, totalNum);
  if (pageSize * (curPage - 1) &gt; totalNum) {
    curPage = 1;
  }

  return getListData();
}

// &#x4F7F;&#x7528;Promise&#x7684;&#x4E3B;&#x4EE3;&#x7801;&#x3002;
function dealWithPromise() {
  return new Promise((resolve, reject) =&gt; {
    getListCount().then(res =&gt; {
      totalNum = res;
      console.log(&apos;Get count&apos;, res);
      if (pageSize * (curPage - 1) &gt; totalNum) {
        curPage = 1;
      }

      return getListData()
    }).then(resolve).catch(reject);
  });
}

// &#x5F00;&#x59CB;&#x6267;&#x884C;dealWithAsync&#x51FD;&#x6570;&#x3002;
// dealWithAsync().then(res =&gt; {
//   console.log(&apos;Get Data&apos;, res)
// }).catch(err =&gt; {
//   console.log(err);
// });

// &#x5F00;&#x59CB;&#x6267;&#x884C;dealWithPromise&#x51FD;&#x6570;&#x3002;
// dealWithPromise().then(res =&gt; {
//   console.log(&apos;Get Data&apos;, res)
// }).catch(err =&gt; {
//   console.log(err);
// });

function getListCount() {
  return createPromise(100).catch(() =&gt; {
    throw &apos;Get list count error&apos;;
  });
}

function getListData() {
  return createPromise([], {
    curPage: curPage,
    pageSize: pageSize,
  }).catch(() =&gt; {
    throw &apos;Get list data error&apos;;
  });
}


function createPromise(
  data, // Reback data
  params = null, // Request params
  isSucceed = true,
  timeout = 1000,
) {
  return new Promise((resolve, reject) =&gt; {
    setTimeout(() =&gt; {
      isSucceed ? resolve(data) : reject(data);
    }, timeout);
  });
}</code></pre><p>&#x5BF9;&#x6BD4;<code>dealWithAsync</code>&#x548C;<code>dealWithPromise</code>&#x4E24;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x80FD;&#x76F4;&#x89C2;&#x7684;&#x53D1;&#x73B0;&#xFF1A;&#x4F7F;&#x7528;A&#x51FD;&#x6570;&#xFF0C;&#x9664;&#x4E86;&#x6709;<code>await</code>&#x5173;&#x952E;&#x5B57;&#x5916;&#xFF0C;&#x4E0E;&#x540C;&#x6B65;&#x4EE3;&#x7801;&#x65E0;&#x5F02;&#x3002;&#x800C;&#x4F7F;&#x7528;<code>Promise</code>&#x5219;&#x9700;&#x8981;&#x6839;&#x636E;&#x89C4;&#x5219;&#x589E;&#x52A0;&#x5F88;&#x591A;&#x5305;&#x88F9;&#x6027;&#x7684;&#x94FE;&#x5F0F;&#x64CD;&#x4F5C;&#xFF0C;&#x4EA7;&#x751F;&#x4E86;&#x592A;&#x591A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x4E0D;&#x591F;&#x7B80;&#x7EA6;&#x3002;&#x53E6;&#x5916;&#xFF0C;&#x8FD9;&#x91CC;&#x5206;&#x5F00;&#x4E86;&#x6BCF;&#x4E2A;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x5E76;&#x89C4;&#x5B9A;&#x597D;&#x5404;&#x81EA;&#x6210;&#x529F;&#x6216;&#x5931;&#x8D25;&#x65F6;&#x4F20;&#x9012;&#x51FA;&#x6765;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x8FD1;&#x4E4E;&#x5B9E;&#x9645;&#x5F00;&#x53D1;&#x3002;</p><h2>1 &#x767B;&#x5802;</h2><h3>1.1 &#x5F62;&#x5F0F;</h3><p>A&#x51FD;&#x6570;&#x4E5F;&#x662F;&#x51FD;&#x6570;&#xFF0C;&#x6240;&#x4EE5;&#x5177;&#x6709;&#x666E;&#x901A;&#x51FD;&#x6570;&#x8BE5;&#x6709;&#x7684;&#x6027;&#x8D28;&#x3002;&#x4E0D;&#x8FC7;&#x5F62;&#x5F0F;&#x4E0A;&#x6709;&#x4E24;&#x70B9;&#x4E0D;&#x540C;&#xFF1A;&#x4E00;&#x662F;&#x5B9A;&#x4E49;A&#x51FD;&#x6570;&#x65F6;&#xFF0C;<code>function</code>&#x5173;&#x952E;&#x5B57;&#x524D;&#x9700;&#x8981;&#x6709;<code>async</code>&#x5173;&#x952E;&#x5B57;&#xFF08;&#x610F;&#x4E3A;&#x5F02;&#x6B65;&#xFF09;&#xFF0C;&#x8868;&#x793A;&#x8FD9;&#x662F;&#x4E2A;A&#x51FD;&#x6570;&#x3002;&#x4E8C;&#x662F;&#x5728;A&#x51FD;&#x6570;&#x5185;&#x90E8;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>await</code>&#x5173;&#x952E;&#x5B57;&#xFF08;&#x610F;&#x4E3A;&#x7B49;&#x5F85;&#xFF09;&#xFF0C;&#x8868;&#x793A;&#x4F1A;&#x5C06;&#x5176;&#x540E;&#x9762;&#x8DDF;&#x968F;&#x7684;&#x7ED3;&#x679C;&#x5F53;&#x6210;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x5E76;&#x7B49;&#x5F85;&#x5176;&#x5B8C;&#x6210;&#x3002;</p><p>&#x4EE5;&#x4E0B;&#x662F;&#x5B83;&#x7684;&#x51E0;&#x79CD;&#x5B9A;&#x4E49;&#x65B9;&#x5F0F;&#x3002;</p><pre><code class="js">// &#x58F0;&#x660E;&#x5F0F;
async function A() {}

// &#x8868;&#x8FBE;&#x5F0F;
let A = async function () {};

// &#x4F5C;&#x4E3A;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;
let o = {
  A: async function () {}
};

// &#x4F5C;&#x4E3A;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x7684;&#x7B80;&#x5199;&#x5F0F;
let o = {
  async A() {}
};

// &#x7BAD;&#x5934;&#x51FD;&#x6570;
let o = {
  A: async () =&gt; {}
};</code></pre><h3>1.2 &#x8FD4;&#x56DE;&#x503C;</h3><p>&#x6267;&#x884C;A&#x51FD;&#x6570;&#xFF0C;&#x4F1A;&#x56FA;&#x5B9A;&#x7684;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;<code>Promise</code>&#x5BF9;&#x8C61;&#x3002;</p><p>&#x5F97;&#x5230;&#x8BE5;&#x5BF9;&#x8C61;&#x540E;&#x4FBF;&#x53EF;&#x76D1;&#x8BBE;&#x7F6E;&#x6210;&#x529F;&#x6216;&#x5931;&#x8D25;&#x65F6;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x8FDB;&#x884C;&#x76D1;&#x542C;&#x3002;&#x5982;&#x679C;&#x51FD;&#x6570;&#x6267;&#x884C;&#x987A;&#x5229;&#x5E76;&#x7ED3;&#x675F;&#xFF0C;&#x8FD4;&#x56DE;&#x7684;P&#x5BF9;&#x8C61;&#x7684;&#x72B6;&#x6001;&#x4F1A;&#x4ECE;&#x7B49;&#x5F85;&#x8F6C;&#x53D8;&#x6210;&#x6210;&#x529F;&#xFF0C;&#x5E76;&#x8F93;&#x51FA;<code>return</code>&#x547D;&#x4EE4;&#x7684;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#xFF08;&#x6CA1;&#x6709;&#x5219;&#x4E3A;<code>undefined</code>&#xFF09;&#x3002;&#x5982;&#x679C;&#x51FD;&#x6570;&#x6267;&#x884C;&#x9014;&#x4E2D;&#x5931;&#x8D25;&#xFF0C;JS&#x4F1A;&#x8BA4;&#x4E3A;A&#x51FD;&#x6570;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x6267;&#x884C;&#xFF0C;&#x8FD4;&#x56DE;&#x7684;P&#x5BF9;&#x8C61;&#x7684;&#x72B6;&#x6001;&#x4F1A;&#x4ECE;&#x7B49;&#x5F85;&#x8F6C;&#x53D8;&#x6210;&#x5931;&#x8D25;&#xFF0C;&#x5E76;&#x8F93;&#x51FA;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#x3002;</p><pre><code class="js">// &#x6210;&#x529F;&#x6267;&#x884C;&#x6848;&#x4F8B;

A1().then(res =&gt; {
  console.log(&apos;&#x6267;&#x884C;&#x6210;&#x529F;&apos;, res); // 10
});

async function A1() {
  let n = 1 * 10;
  return n;
}

// &#x5931;&#x8D25;&#x6267;&#x884C;&#x6848;&#x4F8B;

A2().catch(err =&gt; {
  console.log(&apos;&#x6267;&#x884C;&#x5931;&#x8D25;&apos;, err); // i is not defined.
});

async function A2() {
  let n = 1 * i;
  return n;
}</code></pre><h3>1.3 await</h3><p>&#x53EA;&#x6709;&#x5728;A&#x51FD;&#x6570;&#x5185;&#x90E8;&#x624D;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>await</code>&#x547D;&#x4EE4;&#xFF0C;&#x5B58;&#x5728;&#x4E8E;A&#x51FD;&#x6570;&#x5185;&#x90E8;&#x7684;&#x666E;&#x901A;&#x51FD;&#x6570;&#x4E5F;&#x4E0D;&#x884C;&#x3002;</p><p>&#x5F15;&#x64CE;&#x4F1A;&#x7EDF;&#x4E00;&#x5C06;<code>await</code>&#x540E;&#x9762;&#x7684;&#x8DDF;&#x968F;&#x503C;&#x89C6;&#x4E3A;&#x4E00;&#x4E2A;<code>Promise</code>&#xFF0C;&#x5BF9;&#x4E8E;&#x4E0D;&#x662F;<code>Promise</code>&#x5BF9;&#x8C61;&#x7684;&#x503C;&#x4F1A;&#x8C03;&#x7528;<code>Promise.resolve()</code>&#x8FDB;&#x884C;&#x8F6C;&#x5316;&#x3002;&#x5373;&#x4FBF;&#x6B64;&#x503C;&#x4E3A;&#x4E00;&#x4E2A;<code>Error</code>&#x5B9E;&#x4F8B;&#xFF0C;&#x7ECF;&#x8FC7;&#x8F6C;&#x5316;&#x540E;&#xFF0C;&#x5F15;&#x64CE;&#x4F9D;&#x7136;&#x89C6;&#x5176;&#x4E3A;&#x4E00;&#x4E2A;&#x6210;&#x529F;&#x7684;<code>Promise</code>&#xFF0C;&#x5176;&#x6570;&#x636E;&#x4E3A;<code>Error</code>&#x7684;&#x5B9E;&#x4F8B;&#x3002;</p><p>&#x5F53;&#x51FD;&#x6570;&#x6267;&#x884C;&#x5230;<code>await</code>&#x547D;&#x4EE4;&#x65F6;&#xFF0C;&#x4F1A;&#x6682;&#x505C;&#x6267;&#x884C;&#x5E76;&#x7B49;&#x5F85;&#x5176;&#x540E;&#x7684;<code>Promise</code>&#x7ED3;&#x675F;&#x3002;&#x5982;&#x679C;&#x8BE5;P&#x5BF9;&#x8C61;&#x6700;&#x7EC8;&#x6210;&#x529F;&#xFF0C;&#x5219;&#x4F1A;&#x8FD4;&#x56DE;&#x6210;&#x529F;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#xFF0C;&#x76F8;&#x5F53;&#x5C06;<code>await xxx</code>&#x66FF;&#x6362;&#x6210;<code>&#x8FD4;&#x56DE;&#x503C;</code>&#x3002;&#x5982;&#x679C;&#x8BE5;P&#x5BF9;&#x8C61;&#x6700;&#x7EC8;&#x5931;&#x8D25;&#xFF0C;&#x4E14;&#x9519;&#x8BEF;&#x6CA1;&#x6709;&#x88AB;&#x6355;&#x83B7;&#xFF0C;&#x5F15;&#x64CE;&#x4F1A;&#x76F4;&#x63A5;&#x505C;&#x6B62;&#x6267;&#x884C;A&#x51FD;&#x6570;&#x5E76;&#x5C06;&#x5176;&#x8FD4;&#x56DE;&#x5BF9;&#x8C61;&#x7684;&#x72B6;&#x6001;&#x66F4;&#x6539;&#x4E3A;&#x5931;&#x8D25;&#xFF0C;&#x8F93;&#x51FA;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#x3002;</p><p>&#x6700;&#x540E;&#xFF0C;A&#x51FD;&#x6570;&#x4E2D;&#x7684;<code>return x</code>&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;<code>return await x</code>&#x7684;&#x7B80;&#x5199;&#x3002;</p><pre><code class="js">// &#x6210;&#x529F;&#x6267;&#x884C;&#x6848;&#x4F8B;

A1().then(res =&gt; {
  console.log(&apos;&#x6267;&#x884C;&#x6210;&#x529F;&apos;, res); // &#x7EA6;&#x4E24;&#x79D2;&#x540E;&#x8F93;&#x51FA;100&#x3002;
});

async function A1() {
  let n1 = await 10;
  let n2 = await new Promise(resolve =&gt; {
    setTimeout(() =&gt; {
      resolve(10);
    }, 2000);
  });
  return n1 * n2;
}

// &#x5931;&#x8D25;&#x6267;&#x884C;&#x6848;&#x4F8B;

A2().catch(err =&gt; {
  console.log(&apos;&#x6267;&#x884C;&#x5931;&#x8D25;&apos;, err); // &#x7EA6;&#x4E24;&#x79D2;&#x540E;&#x8F93;&#x51FA;10&#x3002;
});

async function A2() {
  let n1 = await 10;
  let n2 = await new Promise((resolve, reject) =&gt; {
    setTimeout(() =&gt; {
      reject(10);
    }, 2000);
  });
  return n1 * n2;
}</code></pre><h2>2 &#x5165;&#x5BA4;</h2><h3>2.1 &#x7EE7;&#x53D1;&#x4E0E;&#x5E76;&#x53D1;</h3><p>&#x5BF9;&#x4E8E;&#x5B58;&#x5728;&#x4E8E;JS&#x8BED;&#x53E5;&#xFF08;<code>for</code>, <code>while</code>&#x7B49;&#xFF09;&#x7684;<code>await</code>&#x547D;&#x4EE4;&#xFF0C;&#x5F15;&#x64CE;&#x9047;&#x5230;&#x65F6;&#x4E5F;&#x4F1A;&#x6682;&#x505C;&#x6267;&#x884C;&#x3002;&#x8FD9;&#x610F;&#x5473;&#x7740;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x5FAA;&#x73AF;&#x8BED;&#x53E5;&#x5904;&#x7406;&#x591A;&#x4E2A;&#x5F02;&#x6B65;&#x3002;</p><p>&#x4EE5;&#x4E0B;&#x662F;&#x5904;&#x7406;&#x7EE7;&#x53D1;&#x7684;&#x4E24;&#x4E2A;&#x4F8B;&#x5B50;&#x3002;A&#x51FD;&#x6570;&#x5904;&#x7406;&#x76F8;&#x7EE7;&#x53D1;&#x751F;&#x7684;&#x5F02;&#x6B65;&#x5C24;&#x4E3A;&#x7B80;&#x6D01;&#xFF0C;&#x6574;&#x4F53;&#x4E0A;&#x4E0E;&#x540C;&#x6B65;&#x4EE3;&#x7801;&#x65E0;&#x5F02;&#x3002;</p><pre><code class="js">// &#x4E24;&#x4E2A;&#x65B9;&#x6CD5;A1&#x548C;A2&#x7684;&#x884C;&#x4E3A;&#x7ED3;&#x679C;&#x76F8;&#x540C;&#xFF0C;&#x90FD;&#x662F;&#x6BCF;&#x9694;&#x4E00;&#x79D2;&#x8F93;&#x51FA;10&#xFF0C;&#x8F93;&#x51FA;&#x4E09;&#x6B21;&#x3002;

async function A1() {
  let n1 = await createPromise();
  console.log(&apos;N1&apos;, n1);
  let n2 = await createPromise();
  console.log(&apos;N2&apos;, n2);
  let n3 = await createPromise();
  console.log(&apos;N3&apos;, n3);
}

async function A2() {
  for (let i = 0; i&lt; 3; i++) {
    let n = await createPromise();
    console.log(&apos;N&apos; + (i + 1), n);
  }
}

function createPromise() {
  return new Promise(resolve =&gt; {
    setTimeout(() =&gt; {
      resolve(10);
    }, 1000);
  });
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x662F;&#x5904;&#x7406;&#x5E76;&#x53D1;&#x7684;&#x4E09;&#x4E2A;&#x4F8B;&#x5B50;&#x3002;A1&#x51FD;&#x6570;&#x4F7F;&#x7528;&#x4E86;<code>Promise.all</code>&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x805A;&#x5408;&#x5F02;&#x6B65;&#xFF0C;&#x867D;&#x7136;&#x7B80;&#x5355;&#x4F46;&#x7075;&#x6D3B;&#x6027;&#x964D;&#x4F4E;&#x4E86;&#xFF0C;&#x53EA;&#x6709;&#x90FD;&#x6210;&#x529F;&#x548C;&#x5931;&#x8D25;&#x4E24;&#x79CD;&#x60C5;&#x51B5;&#x3002;A3&#x51FD;&#x6570;&#x76F8;&#x5BF9;A2&#x4EC5;&#x4EC5;&#x4E3A;&#x4E86;&#x8BF4;&#x660E;&#x5E94;&#x8BE5;&#x600E;&#x6837;&#x914D;&#x5408;&#x6570;&#x7EC4;&#x7684;&#x904D;&#x5386;&#x65B9;&#x6CD5;&#x4F7F;&#x7528;<code>async</code>&#x51FD;&#x6570;&#x3002;&#x91CD;&#x70B9;&#x5728;A2&#x51FD;&#x6570;&#x7684;&#x7406;&#x89E3;&#x4E0A;&#x3002;</p><p>A2&#x51FD;&#x6570;&#x4F7F;&#x7528;&#x4E86;&#x5FAA;&#x73AF;&#x8BED;&#x53E5;&#xFF0C;&#x5B9E;&#x9645;&#x662F;&#x7EE7;&#x53D1;&#x7684;&#x83B7;&#x53D6;&#x5230;&#x5404;&#x4E2A;&#x5F02;&#x6B65;&#x503C;&#xFF0C;&#x4F46;&#x5728;&#x603B;&#x4F53;&#x7684;&#x65F6;&#x95F4;&#x4E0A;&#x76F8;&#x5F53;&#x5E76;&#x53D1;&#xFF08;&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x597D;&#x597D;&#x7406;&#x89E3;&#x4E00;&#x756A;&#xFF09;&#x3002;&#x56E0;&#x4E3A;&#x4E00;&#x5F00;&#x59CB;&#x521B;&#x5EFA;<code>reqs</code>&#x6570;&#x7EC4;&#x65F6;&#xFF0C;&#x5C31;&#x5DF2;&#x7ECF;&#x5F00;&#x59CB;&#x6267;&#x884C;&#x4E86;&#x5404;&#x4E2A;&#x5F02;&#x6B65;&#xFF0C;&#x4E4B;&#x540E;&#x867D;&#x7136;&#x662F;&#x9010;&#x4E00;&#x7EE7;&#x53D1;&#x83B7;&#x53D6;&#xFF0C;&#x4F46;&#x603B;&#x82B1;&#x8D39;&#x65F6;&#x95F4;&#x4E0E;&#x904D;&#x5386;&#x987A;&#x5E8F;&#x65E0;&#x5173;&#xFF0C;&#x6052;&#x7B49;&#x4E8E;&#x8017;&#x65F6;&#x6700;&#x591A;&#x7684;&#x5F02;&#x6B65;&#x6240;&#x82B1;&#x8D39;&#x7684;&#x65F6;&#x95F4;&#xFF08;&#x4E0D;&#x8003;&#x8651;&#x904D;&#x5386;&#x3001;&#x6267;&#x884C;&#x7B49;&#x5176;&#x5B83;&#x7684;&#x65F6;&#x95F4;&#x6D88;&#x8017;&#xFF09;&#x3002;</p><pre><code class="js">// &#x4E09;&#x4E2A;&#x65B9;&#x6CD5;A1, A2&#x548C;A3&#x7684;&#x884C;&#x4E3A;&#x7ED3;&#x679C;&#x76F8;&#x540C;&#xFF0C;&#x90FD;&#x662F;&#x5728;&#x7EA6;&#x4E00;&#x79D2;&#x540E;&#x8F93;&#x51FA;[10, 10, 10]&#x3002;

async function A1() {
  let res = await Promise.all([createPromise(), createPromise(), createPromise()]);
  console.log(&apos;Data&apos;, res);
}

async function A2() {
  let res = [];
  let reqs = [createPromise(), createPromise(), createPromise()];
  for (let i = 0; i&lt; reqs.length; i++) {
    res[i] = await reqs[i];
  }
  console.log(&apos;Data&apos;, res);
}

async function A3() {
  let res = [];
  let reqs = [9, 9, 9].map(async (item) =&gt; {
    let n = await createPromise(item);
    return n + 1;
  });
  for (let i = 0; i&lt; reqs.length; i++) {
    res[i] = await reqs[i];
  }
  console.log(&apos;Data&apos;, res);
}

function createPromise(n = 10) {
  return new Promise(resolve =&gt; {
    setTimeout(() =&gt; {
      resolve(n);
    }, 1000);
  });
}</code></pre><h3>2.2 &#x9519;&#x8BEF;&#x5904;&#x7406;</h3><p>&#x4E00;&#x65E6;<code>await</code>&#x540E;&#x9762;&#x7684;<code>Promise</code>&#x8F6C;&#x53D8;&#x6210;<code>rejected</code>&#xFF0C;&#x6574;&#x4E2A;<code>async</code>&#x51FD;&#x6570;&#x4FBF;&#x4F1A;&#x7EC8;&#x6B62;&#x3002;&#x7136;&#x800C;&#x5F88;&#x591A;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x4E0D;&#x5E0C;&#x671B;&#x56E0;&#x4E3A;&#x67D0;&#x4E2A;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x7684;&#x5931;&#x8D25;&#xFF0C;&#x5C31;&#x7EC8;&#x6B62;&#x6574;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x56E0;&#x6B64;&#x9700;&#x8981;&#x8FDB;&#x884C;&#x5408;&#x7406;&#x9519;&#x8BEF;&#x5904;&#x7406;&#x3002;&#x6CE8;&#x610F;&#xFF0C;&#x8FD9;&#x91CC;&#x6240;&#x8BF4;&#x7684;&#x9519;&#x8BEF;&#x4E0D;&#x5305;&#x62EC;&#x5F15;&#x64CE;&#x89E3;&#x6790;&#x6216;&#x6267;&#x884C;&#x7684;&#x9519;&#x8BEF;&#xFF0C;&#x4EC5;&#x4EC5;&#x662F;&#x72B6;&#x6001;&#x53D8;&#x4E3A;<code>rejected</code>&#x7684;<code>Promise</code>&#x5BF9;&#x8C61;&#x3002;</p><p>&#x5904;&#x7406;&#x7684;&#x65B9;&#x5F0F;&#x6709;&#x4E24;&#x79CD;&#xFF1A;&#x4E00;&#x662F;&#x5148;&#x884C;&#x5305;&#x88C5;<code>Promise</code>&#x5BF9;&#x8C61;&#xFF0C;&#x4F7F;&#x5176;&#x59CB;&#x7EC8;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x6210;&#x529F;&#x7684;<code>Promise</code>&#x3002;&#x4E8C;&#x662F;&#x4F7F;&#x7528;<code>try.catch</code>&#x6355;&#x83B7;&#x9519;&#x8BEF;&#x3002;</p><pre><code class="js">// A1&#x548C;A2&#x90FD;&#x6267;&#x884C;&#x6210;&#xFF0C;&#x4E14;&#x8FD4;&#x56DE;&#x503C;&#x4E3A;10&#x3002;
A1().then(console.log);
A2().then(console.log);

async function A1() {
  let n;
  n = await createPromise(true);
  return n;
}

async function A2() {
  let n;
  try {
    n = await createPromise(false);
  } catch (e) {
    n = e;
  }
  return n;
}

function createPromise(needCatch) {
  let p = new Promise((resolve, reject) =&gt; {
    reject(10);
  });
  return needCatch ? p.catch(err =&gt; err) : p;
}</code></pre><h3>2.3 &#x5B9E;&#x73B0;&#x539F;&#x7406;</h3><p>&#x524D;&#x8A00;&#x4E2D;&#x5DF2;&#x7ECF;&#x63D0;&#x53CA;&#xFF0C;A&#x51FD;&#x6570;&#x662F;&#x4F7F;&#x7528;G&#x51FD;&#x6570;&#x8FDB;&#x884C;&#x5F02;&#x6B65;&#x5904;&#x7406;&#x7684;&#x589E;&#x5F3A;&#x7248;&#x3002;&#x65E2;&#x7136;&#x5982;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x4ECE;&#x5176;&#x6539;&#x8FDB;&#x7684;&#x65B9;&#x9762;&#x5165;&#x624B;&#xFF0C;&#x6765;&#x770B;&#x770B;&#x5176;&#x57FA;&#x4E8E;G&#x51FD;&#x6570;&#x7684;&#x5B9E;&#x73B0;&#x539F;&#x7406;&#x3002;A&#x51FD;&#x6570;&#x76F8;&#x5BF9;G&#x51FD;&#x6570;&#x7684;&#x6539;&#x8FDB;&#x4F53;&#x73B0;&#x5728;&#x8FD9;&#x51E0;&#x4E2A;&#x65B9;&#x9762;&#xFF1A;&#x66F4;&#x597D;&#x7684;&#x8BED;&#x4E49;&#xFF0C;&#x5185;&#x7F6E;&#x6267;&#x884C;&#x5668;&#x548C;&#x8FD4;&#x56DE;&#x503C;&#x662F;<code>Promise</code>&#x3002;</p><p>&#x66F4;&#x597D;&#x7684;&#x8BED;&#x4E49;&#x3002;G&#x51FD;&#x6570;&#x901A;&#x8FC7;&#x5728;<code>function</code>&#x540E;&#x4F7F;&#x7528;<code>*</code>&#x6765;&#x6807;&#x8BC6;&#x6B64;&#x4E3A;G&#x51FD;&#x6570;&#xFF0C;&#x800C;A&#x51FD;&#x6570;&#x5219;&#x662F;&#x5728;<code>function</code>&#x524D;&#x52A0;&#x4E0A;<code>async</code>&#x5173;&#x952E;&#x5B57;&#x3002;&#x5728;G&#x51FD;&#x6570;&#x4E2D;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>yield</code>&#x547D;&#x4EE4;&#x6682;&#x505C;&#x6267;&#x884C;&#x548C;&#x4EA4;&#x51FA;&#x6267;&#x884C;&#x6743;&#xFF0C;&#x800C;A&#x51FD;&#x6570;&#x662F;&#x4F7F;&#x7528;<code>await</code>&#x6765;&#x7B49;&#x5F85;&#x5F02;&#x6B65;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x3002;&#x5F88;&#x660E;&#x663E;&#xFF0C;<code>async</code>&#x548C;<code>await</code>&#x66F4;&#x4E3A;&#x8BED;&#x4E49;&#x5316;&#x3002;</p><pre><code class="js">// G&#x51FD;&#x6570;
function* request() {
  let n = yield createPromise();
}

// A&#x51FD;&#x6570;
async function request() {
  let n = await createPromise();
}

function createPromise() {
  return new Promise(resolve =&gt; {
    setTimeout(() =&gt; {
      resolve(10);
    }, 1000);
  });
}</code></pre><p>&#x5185;&#x7F6E;&#x6267;&#x884C;&#x5668;&#x3002;&#x8C03;&#x7528;A&#x51FD;&#x6570;&#x4FBF;&#x4F1A;&#x4E00;&#x6B65;&#x6B65;&#x81EA;&#x52A8;&#x6267;&#x884C;&#x548C;&#x7B49;&#x5F85;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x76F4;&#x5230;&#x7ED3;&#x675F;&#x3002;&#x5982;&#x679C;&#x9700;&#x8981;&#x4F7F;&#x7528;G&#x51FD;&#x6570;&#x6765;&#x81EA;&#x52A8;&#x6267;&#x884C;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x9700;&#x8981;&#x4E3A;&#x5176;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;<a href="https://segmentfault.com/a/1190000016047312#articleHeader8">&#x81EA;&#x6267;&#x884C;&#x5668;</a>&#x3002;&#x901A;&#x8FC7;&#x81EA;&#x6267;&#x884C;&#x5668;&#x6765;&#x81EA;&#x52A8;&#x5316;G&#x51FD;&#x6570;&#x7684;&#x6267;&#x884C;&#xFF0C;&#x5176;&#x884C;&#x4E3A;&#x4E0E;A&#x51FD;&#x6570;&#x57FA;&#x672C;&#x76F8;&#x540C;&#x3002;&#x53EF;&#x4EE5;&#x8BF4;&#xFF0C;A&#x51FD;&#x6570;&#x76F8;&#x5BF9;G&#x51FD;&#x6570;&#x6700;&#x5927;&#x6539;&#x8FDB;&#x4FBF;&#x662F;&#x5185;&#x7F6E;&#x4E86;&#x81EA;&#x6267;&#x884C;&#x5668;&#x3002;</p><pre><code class="js">// &#x4E24;&#x8005;&#x90FD;&#x662F;&#x6BCF;&#x9694;&#x4E00;&#x79D2;&#x949F;&#x6253;&#x5370;&#x51FA;10&#xFF0C;&#x91CD;&#x590D;&#x4E24;&#x6B21;&#x3002;

// A&#x51FD;&#x6570;
A();

async function A() {
  let n1 = await createPromise();
  console.log(n1);
  let n2 = await createPromise();
  console.log(n2);
}

// G&#x51FD;&#x6570;&#xFF0C;&#x4F7F;&#x7528;&#x81EA;&#x6267;&#x884C;&#x5668;&#x6267;&#x884C;&#x3002;
spawn(G);

function* G() {
  let n1 = yield createPromise();
  console.log(n1);
  let n2 = yield createPromise();
  console.log(n2);
}

function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}


function createPromise() {
  return new Promise(resolve =&gt; {
    setTimeout(() =&gt; {
      resolve(10);
    }, 1000);
  });
}</code></pre><h3>2.4 &#x6267;&#x884C;&#x987A;&#x5E8F;</h3><p>&#x5728;&#x4E86;&#x89E3;A&#x51FD;&#x6570;&#x5185;&#x90E8;&#x4E0E;&#x5305;&#x542B;&#x5B83;&#x5916;&#x90E8;&#x95F4;&#x7684;&#x6267;&#x884C;&#x987A;&#x5E8F;&#x524D;&#xFF0C;&#x9700;&#x8981;&#x660E;&#x767D;&#x4E24;&#x70B9;&#xFF1A;&#x4E00;&#x4E3A;<code>Promise</code>&#x7684;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;&#x662F;&#x63A8;&#x8FDF;&#x5230;&#x672C;&#x8F6E;&#x4E8B;&#x4EF6;&#x672B;&#x5C3E;&#x624D;&#x6267;&#x884C;&#x7684;&#x540E;&#x6267;&#x884C;&#x64CD;&#x4F5C;&#xFF0C;&#x8BE6;&#x60C5;&#x8BF7;&#x67E5;&#x770B;<a href="https://segmentfault.com/a/1190000015423360#articleHeader3">&#x94FE;&#x63A5;</a>&#x3002;&#x4E8C;&#x4E3A;<code>Generator</code>&#x51FD;&#x6570;&#x662F;&#x901A;&#x8FC7;&#x8C03;&#x7528;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;&#x6765;&#x5207;&#x6362;&#x6267;&#x884C;&#x6743;&#x8FDB;&#x800C;&#x63A7;&#x5236;&#x7A0B;&#x5E8F;&#x6267;&#x884C;&#x987A;&#x5E8F;&#xFF0C;&#x8BE6;&#x60C5;&#x8BF7;&#x67E5;&#x770B;<a href="https://segmentfault.com/a/1190000016047312#articleHeader4">&#x94FE;&#x63A5;</a>&#x3002;&#x7406;&#x89E3;&#x597D;A&#x51FD;&#x6570;&#x7684;&#x6267;&#x884C;&#x987A;&#x5E8F;&#xFF0C;&#x80FD;&#x66F4;&#x52A0;&#x6E05;&#x695A;&#x7684;&#x628A;&#x63E1;&#x6B64;&#x4E09;&#x8005;&#x7684;&#x5B58;&#x5728;&#x3002;</p><p>&#x5148;&#x770B;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;&#xFF0C;&#x5BF9;&#x6BD4;A1&#x3001;A2&#x548C;A3&#x65B9;&#x6CD5;&#x7684;&#x7ED3;&#x679C;&#x3002;</p><pre><code class="js">F(A1); // &#x63A5;&#x8FDE;&#x6253;&#x5370;&#x51FA;&#xFF1A;1 3 4 2 5&#x3002;
F(A2); // &#x63A5;&#x8FDE;&#x6253;&#x5370;&#x51FA;&#xFF1A;1 3 2 4 5&#x3002;
F(A3); // &#x5148;&#x6253;&#x5370;&#x51FA;&#xFF1A;1 3 2&#xFF0C;&#x9694;&#x4E24;&#x79D2;&#x540E;&#x6253;&#x5370;&#x51FA;&#xFF1A;4 9&#x3002;

function F(A) {
  console.log(1);
  A().then(console.log);
  console.log(2);
}

async function A1() {
  console.log(3);
  console.log(4);
  return 5;
}

async function A2() {
  console.log(3);
  let n = await 5;
  console.log(4);
  return n;
}

async function A3() {
  console.log(3);
  let n = await createPromise();
  console.log(4);
  return n;
}

function createPromise() {
  return new Promise(resolve =&gt; {
    setTimeout(() =&gt; {
      resolve(9);
    }, 2000);
  });
}</code></pre><p>&#x4ECE;&#x7ED3;&#x679C;&#x4E0A;&#x53EF;&#x5F52;&#x7EB3;&#x51FA;&#x4E00;&#x4E9B;&#x8868;&#x9762;&#x5F62;&#x6001;&#x3002;&#x6267;&#x884C;A&#x51FD;&#x6570;&#xFF0C;&#x4F1A;&#x5373;&#x523B;&#x6267;&#x884C;&#x5176;&#x51FD;&#x6570;&#x4F53;&#xFF0C;&#x76F4;&#x5230;&#x9047;&#x5230;<code>await</code>&#x547D;&#x4EE4;&#x3002;&#x9047;&#x5230;<code>await</code>&#x547D;&#x4EE4;&#x540E;&#xFF0C;&#x6267;&#x884C;&#x6743;&#x4F1A;&#x8F6C;&#x5411;A&#x51FD;&#x6570;&#x5916;&#x90E8;&#xFF0C;&#x5373;&#x4E0D;&#x7BA1;A&#x51FD;&#x6570;&#x5185;&#x90E8;&#x6267;&#x884C;&#x800C;&#x5F00;&#x59CB;&#x6267;&#x884C;&#x5916;&#x90E8;&#x4EE3;&#x7801;&#x3002;&#x6267;&#x884C;&#x5B8C;&#x5916;&#x90E8;&#x4EE3;&#x7801;&#xFF08;&#x672C;&#x8F6E;&#x4E8B;&#x4EF6;&#xFF09;&#x540E;&#xFF0C;&#x624D;&#x7EE7;&#x7EED;&#x6267;&#x884C;&#x4E4B;&#x524D;<code>await</code>&#x547D;&#x4EE4;&#x540E;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x5F52;&#x7EB3;&#x5230;&#x6B64;&#x5DF2;&#x6210;&#x529F;&#x4E00;&#x534A;&#xFF0C;&#x4E4B;&#x540E;&#x7740;&#x624B;&#x5206;&#x6790;&#x5176;&#x6210;&#x56E0;&#x3002;&#x5982;&#x679C;&#x5BA2;&#x5B98;&#x60A8;&#x5BF9;&#x672C;&#x697C;&#x6709;&#x6240;&#x4E86;&#x89E3;&#xFF0C;&#x90A3;&#x4E00;&#x5B9A;&#x4E0D;&#x4F1A;&#x5FD8;&#x8BB0;&#x2018;&#x81EA;&#x6267;&#x884C;&#x5668;&#x2019;&#x8FD9;&#x4F4D;&#x5927;&#x5A76;&#x5427;&#xFF1F;&#x4F30;&#x8BA1;&#x662F;&#x5FD8;&#x8BB0;&#x4E86;&#x3002;A&#x51FD;&#x6570;&#x7684;&#x672C;&#x8D28;&#x5C31;&#x662F;&#x5E26;&#x6709;&#x81EA;&#x6267;&#x884C;&#x5668;&#x7684;G&#x51FD;&#x6570;&#xFF0C;&#x6240;&#x4EE5;&#x63A2;&#x7A76;A&#x51FD;&#x6570;&#x7684;&#x6267;&#x884C;&#x539F;&#x7406;&#x5C31;&#x662F;&#x63A2;&#x7A76;&#x4F7F;&#x7528;&#x81EA;&#x6267;&#x884C;&#x5668;&#x7684;G&#x51FD;&#x6570;&#x7684;&#x6267;&#x884C;&#x539F;&#x7406;&#x3002;&#x60F3;&#x8D77;&#x4E86;&#xFF1F;</p><p>&#x518D;&#x770B;&#x4E0B;&#x9762;&#x4EE3;&#x7801;&#xFF0C;&#x4F7F;&#x7528;&#x76F8;&#x540C;&#x903B;&#x8F91;&#x7684;G&#x51FD;&#x6570;&#x4F1A;&#x5F97;&#x5230;&#x4E0E;A&#x51FD;&#x6570;&#x76F8;&#x540C;&#x7684;&#x7ED3;&#x679C;&#x3002;</p><pre><code class="js">F(A); // &#x5148;&#x6253;&#x5370;&#x51FA;&#xFF1A;1 3 2&#xFF0C;&#x9694;&#x4E24;&#x79D2;&#x540E;&#x6253;&#x5370;&#x51FA;&#xFF1A;4 9&#x3002;
F(() =&gt; {
  return spawn(G);
}); // &#x5148;&#x6253;&#x5370;&#x51FA;&#xFF1A;1 3 2&#xFF0C;&#x9694;&#x4E24;&#x79D2;&#x540E;&#x6253;&#x5370;&#x51FA;&#xFF1A;4 9&#x3002;

function F(A) {
  console.log(1);
  A().then(console.log);
  console.log(2);
}

async function A() {
  console.log(3);
  let n = await createPromise();
  console.log(4);
  return n;
}

function* G() {
  console.log(3);
  let n = yield createPromise();
  console.log(4);
  return n;
}

function createPromise() {
  return new Promise(resolve =&gt; {
    setTimeout(() =&gt; {
      resolve(9);
    }, 2000);
  });
}

function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}</code></pre><p>&#x81EA;&#x52A8;&#x6267;&#x884C;G&#x51FD;&#x6570;&#x65F6;&#xFF0C;&#x9047;&#x5230;<code>yield</code>&#x547D;&#x4EE4;&#x540E;&#x4F1A;&#x4F7F;&#x7528;<code>Promise.resolve</code>&#x5305;&#x88F9;&#x5176;&#x540E;&#x7684;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x5E76;&#x4E3A;&#x5176;&#x8BBE;&#x7F6E;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;&#x65E0;&#x8BBA;&#x8BE5;<code>Promise</code>&#x662F;&#x7ACB;&#x523B;&#x6709;&#x4E86;&#x7ED3;&#x679C;&#x8FD8;&#x662F;&#x8FC7;&#x67D0;&#x6BB5;&#x65F6;&#x95F4;&#x4E4B;&#x540E;&#xFF0C;&#x5176;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x90FD;&#x4F1A;&#x88AB;&#x63A8;&#x8FDF;&#x5230;&#x5728;&#x672C;&#x8F6E;&#x4E8B;&#x4EF6;&#x672B;&#x5C3E;&#x6267;&#x884C;&#x3002;&#x4E4B;&#x540E;&#x518D;&#x662F;&#x4E0B;&#x4E00;&#x6B65;&#xFF0C;&#x518D;&#x4E0B;&#x4E00;&#x6B65;&#x3002;&#x540C;&#x6837;&#x7684;&#x9053;&#x7406;&#x9002;&#x7528;&#x4E8E;A&#x51FD;&#x6570;&#xFF0C;&#x5F53;&#x9047;&#x5230;<code>await</code>&#x547D;&#x4EE4;&#x65F6;&#xFF08;&#x6B64;&#x5904;&#x7565;&#x53BB;&#x4E09;&#x4E94;&#x5B57;&#xFF09;&#xFF0C;&#x6240;&#x4EE5;&#x6709;&#x4E86;&#x5982;&#x6B64;&#x8FD9;&#x822C;&#x7684;&#x6267;&#x884C;&#x987A;&#x5E8F;&#x3002;&#x8C22;&#x5E55;&#x3002;</p><h2>&#x5EF6;&#x4F38;</h2><p><a href="https://segmentfault.com/a/1190000015423360">ES6&#x7CBE;&#x534E;&#xFF1A;Promise</a><br><a href="https://segmentfault.com/a/1190000016047312">Generator&#xFF1A;JS&#x6267;&#x884C;&#x6743;&#x7684;&#x771F;&#x5B9E;&#x64CD;&#x4F5C;&#x8005;</a></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Async：简洁优雅的异步之道

## 原文链接
[https://segmentfault.com/a/1190000016212269](https://segmentfault.com/a/1190000016212269)

