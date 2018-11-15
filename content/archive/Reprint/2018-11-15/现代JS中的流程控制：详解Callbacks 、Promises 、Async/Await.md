---
title: '现代JS中的流程控制：详解Callbacks 、Promises 、Async/Await' 
date: 2018-11-15 2:30:08
hidden: true
categories: reprint
---

{{< raw >}}
<p><strong>JavaScript&#x7ECF;&#x5E38;&#x58F0;&#x79F0;&#x662F;_&#x5F02;&#x6B65;_&#x3002;&#x90A3;&#x662F;&#x4EC0;&#x4E48;&#x610F;&#x601D;&#xFF1F;&#x5B83;&#x5982;&#x4F55;&#x5F71;&#x54CD;&#x53D1;&#x5C55;&#xFF1F;&#x8FD1;&#x5E74;&#x6765;&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x6709;&#x4F55;&#x53D8;&#x5316;&#xFF1F;</strong></p><p>&#x8BF7;&#x601D;&#x8003;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;&#xFF1A;</p><pre><code>result1 = doSomething1();
result2 = doSomething2(result1);</code></pre><p>&#x5927;&#x591A;&#x6570;&#x8BED;&#x8A00;&#x90FD;&#x5904;&#x7406;&#x6BCF;&#x4E00;&#x884C;&#x540C;&#x6B65;&#x3002;&#x7B2C;&#x4E00;&#x884C;&#x8FD0;&#x884C;&#x5E76;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x3002;&#x7B2C;&#x4E8C;&#x884C;&#x5728;&#x7B2C;&#x4E00;&#x884C;&#x5B8C;&#x6210;&#x540E;&#x8FD0;&#x884C;&#x65E0;&#x8BBA;&#x9700;&#x8981;&#x591A;&#x957F;&#x65F6;&#x95F4;&#x3002;</p><h3>&#x5355;&#x7EBF;&#x7A0B;&#x5904;&#x7406;</h3><p>JavaScript&#x5728;&#x5355;&#x4E2A;&#x5904;&#x7406;&#x7EBF;&#x7A0B;&#x4E0A;&#x8FD0;&#x884C;&#x3002;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x9009;&#x9879;&#x5361;&#x4E2D;&#x6267;&#x884C;&#x65F6;&#xFF0C;&#x5176;&#x4ED6;&#x6240;&#x6709;&#x5185;&#x5BB9;&#x90FD;&#x4F1A;&#x505C;&#x6B62;&#xFF0C;&#x56E0;&#x4E3A;&#x5728;&#x5E76;&#x884C;&#x7EBF;&#x7A0B;&#x4E0A;&#x4E0D;&#x4F1A;&#x53D1;&#x751F;&#x5BF9;&#x9875;&#x9762;DOM&#x7684;&#x66F4;&#x6539;;&#x5C06;&#x4E00;&#x4E2A;&#x7EBF;&#x7A0B;&#x91CD;&#x5B9A;&#x5411;&#x5230;&#x53E6;&#x4E00;&#x4E2A;URL&#x800C;&#x53E6;&#x4E00;&#x4E2A;&#x7EBF;&#x7A0B;&#x5C1D;&#x8BD5;&#x8FFD;&#x52A0;&#x5B50;&#x8282;&#x70B9;&#x662F;&#x5371;&#x9669;&#x7684;&#x3002;</p><p>&#x8FD9;&#x5BF9;&#x7528;&#x6237;&#x6765;&#x8BF4;&#x662F;&#x663E;&#x800C;&#x6613;&#x89C1;&#x3002;&#x4F8B;&#x5982;&#xFF0C;JavaScript&#x68C0;&#x6D4B;&#x5230;&#x6309;&#x94AE;&#x5355;&#x51FB;&#xFF0C;&#x8FD0;&#x884C;&#x8BA1;&#x7B97;&#x5E76;&#x66F4;&#x65B0;DOM&#x3002;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x53EF;&#x4EE5;&#x81EA;&#x7531;&#x5904;&#x7406;&#x961F;&#x5217;&#x4E2D;&#x7684;&#x4E0B;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x3002;</p><p>&#xFF08;&#x65C1;&#x6CE8;&#xFF1A;&#x5176;&#x4ED6;&#x8BED;&#x8A00;&#x5982;PHP&#x4E5F;&#x4F7F;&#x7528;&#x5355;&#x4E2A;&#x7EBF;&#x7A0B;&#xFF0C;&#x4F46;&#x53EF;&#x4EE5;&#x7531;&#x591A;&#x7EBF;&#x7A0B;&#x670D;&#x52A1;&#x5668;&#xFF08;&#x5982;Apache&#xFF09;&#x7BA1;&#x7406;&#x3002;&#x540C;&#x65F6;&#x5BF9;&#x540C;&#x4E00;&#x4E2A;PHP&#x8FD0;&#x884C;&#x65F6;&#x9875;&#x9762;&#x7684;&#x4E24;&#x4E2A;&#x8BF7;&#x6C42;&#x53EF;&#x4EE5;&#x542F;&#x52A8;&#x4E24;&#x4E2A;&#x8FD0;&#x884C;&#x9694;&#x79BB;&#x7684;&#x5B9E;&#x4F8B;&#x7684;&#x7EBF;&#x7A0B;&#x3002;&#xFF09;</p><h3>&#x4F7F;&#x7528;&#x56DE;&#x8C03;&#x8FDB;&#x884C;&#x5F02;&#x6B65;</h3><p>&#x5355;&#x7EBF;&#x7A0B;&#x5F15;&#x53D1;&#x4E86;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#x3002;&#x5F53;JavaScript&#x8C03;&#x7528;&#x201C;&#x6162;&#x201D;&#x8FDB;&#x7A0B;&#xFF08;&#x4F8B;&#x5982;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x7684;Ajax&#x8BF7;&#x6C42;&#x6216;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#x7684;&#x6570;&#x636E;&#x5E93;&#x64CD;&#x4F5C;&#xFF09;&#x65F6;&#x4F1A;&#x53D1;&#x751F;&#x4EC0;&#x4E48;&#xFF1F;&#x8FD9;&#x4E2A;&#x64CD;&#x4F5C;&#x53EF;&#x80FD;&#x9700;&#x8981;&#x51E0;&#x79D2;&#x949F; - &#x751A;&#x81F3;&#x51E0;&#x5206;&#x949F;&#x3002;&#x6D4F;&#x89C8;&#x5668;&#x5728;&#x7B49;&#x5F85;&#x54CD;&#x5E94;&#x65F6;&#x4F1A;&#x88AB;&#x9501;&#x5B9A;&#x3002;&#x5728;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#xFF0C;Node.js&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x5C06;&#x65E0;&#x6CD5;&#x8FDB;&#x4E00;&#x6B65;&#x5904;&#x7406;&#x7528;&#x6237;&#x8BF7;&#x6C42;&#x3002;</p><p>&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x662F;&#x5F02;&#x6B65;&#x5904;&#x7406;&#x3002;&#x800C;&#x4E0D;&#x662F;&#x7B49;&#x5F85;&#x5B8C;&#x6210;&#xFF0C;&#x4E00;&#x4E2A;&#x8FDB;&#x7A0B;&#x88AB;&#x544A;&#x77E5;&#x5728;&#x7ED3;&#x679C;&#x51C6;&#x5907;&#x597D;&#x65F6;&#x8C03;&#x7528;&#x53E6;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x3002;&#x8FD9;&#x79F0;&#x4E3A;callback&#xFF0C;&#x5B83;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x4F20;&#x9012;&#x7ED9;&#x4EFB;&#x4F55;&#x5F02;&#x6B65;&#x51FD;&#x6570;&#x3002;&#x4F8B;&#x5982;&#xFF1A;</p><pre><code>doSomethingAsync(callback1);
console.log(&apos;finished&apos;);

// call when doSomethingAsync completes
function callback1(error) {
  if (!error) console.log(&apos;doSomethingAsync complete&apos;);
}</code></pre><p>doSomethingAsync&#xFF08;&#xFF09;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF08;&#x53EA;&#x4F20;&#x9012;&#x5BF9;&#x8BE5;&#x51FD;&#x6570;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x56E0;&#x6B64;&#x51E0;&#x4E4E;&#x6CA1;&#x6709;&#x5F00;&#x9500;&#xFF09;&#x3002;doSomethingAsync&#xFF08;&#xFF09;&#x9700;&#x8981;&#x591A;&#x957F;&#x65F6;&#x95F4;&#x5E76;&#x4E0D;&#x91CD;&#x8981;;&#x6211;&#x4EEC;&#x6240;&#x77E5;&#x9053;&#x7684;&#x662F;callback1&#xFF08;&#xFF09;&#x5C06;&#x5728;&#x672A;&#x6765;&#x7684;&#x67D0;&#x4E2A;&#x65F6;&#x523B;&#x6267;&#x884C;&#x3002;&#x63A7;&#x5236;&#x53F0;&#x5C06;&#x663E;&#x793A;&#xFF1A;</p><pre><code>finished
doSomethingAsync complete</code></pre><h3>&#x56DE;&#x8C03;&#x5730;&#x72F1;</h3><p>&#x901A;&#x5E38;&#xFF0C;&#x56DE;&#x8C03;&#x53EA;&#x80FD;&#x7531;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x3002;&#x56E0;&#x6B64;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x7B80;&#x6D01;&#x7684;&#x533F;&#x540D;&#x5185;&#x8054;&#x51FD;&#x6570;&#xFF1A;</p><pre><code>doSomethingAsync(error =&gt; {
  if (!error) console.log(&apos;doSomethingAsync complete&apos;);
});</code></pre><p>&#x901A;&#x8FC7;&#x5D4C;&#x5957;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x53EF;&#x4EE5;&#x4E32;&#x884C;&#x5B8C;&#x6210;&#x4E00;&#x7CFB;&#x5217;&#x4E24;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x5F02;&#x6B65;&#x8C03;&#x7528;&#x3002;&#x4F8B;&#x5982;&#xFF1A;</p><pre><code>async1((err, res) =&gt; {
  if (!err) async2(res, (err, res) =&gt; {
    if (!err) async3(res, (err, res) =&gt; {
      console.log(&apos;async1, async2, async3 complete.&apos;);
    });
  });
});</code></pre><p>&#x4E0D;&#x5E78;&#x7684;&#x662F;&#xFF0C;&#x8FD9;&#x5F15;&#x5165;&#x4E86;<strong>&#x56DE;&#x8C03;&#x5730;&#x72F1;</strong> - &#x4E00;&#x4E2A;&#x81ED;&#x540D;&#x662D;&#x7740;&#x7684;&#x6982;&#x5FF5;(<a href="http://callbackhell.com/" rel="nofollow noreferrer">http://callbackhell.com/</a>) &#xFF01;&#x4EE3;&#x7801;&#x96BE;&#x4EE5;&#x9605;&#x8BFB;&#xFF0C;&#x5E76;&#x4E14;&#x5728;&#x6DFB;&#x52A0;&#x9519;&#x8BEF;&#x5904;&#x7406;&#x903B;&#x8F91;&#x65F6;&#x4F1A;&#x53D8;&#x5F97;&#x66F4;&#x7CDF;&#x3002;</p><p>&#x56DE;&#x8C03;&#x5730;&#x72F1;&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x7F16;&#x7801;&#x4E2D;&#x76F8;&#x5BF9;&#x8F83;&#x5C11;&#x3002;&#x5982;&#x679C;&#x60A8;&#x6B63;&#x5728;&#x8FDB;&#x884C;Ajax&#x8C03;&#x7528;&#xFF0C;&#x66F4;&#x65B0;DOM&#x5E76;&#x7B49;&#x5F85;&#x52A8;&#x753B;&#x5B8C;&#x6210;&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;&#x6DF1;&#x5165;&#x4E24;&#x5230;&#x4E09;&#x4E2A;&#x7EA7;&#x522B;&#xFF0C;&#x4F46;&#x5B83;&#x901A;&#x5E38;&#x4ECD;&#x7136;&#x53EF;&#x4EE5;&#x7BA1;&#x7406;&#x3002;</p><p>&#x64CD;&#x4F5C;&#x7CFB;&#x7EDF;&#x6216;&#x670D;&#x52A1;&#x5668;&#x8FDB;&#x7A0B;&#x7684;&#x60C5;&#x51B5;&#x4E0D;&#x540C;&#x3002;Node.js API&#x8C03;&#x7528;&#x53EF;&#x4EE5;&#x63A5;&#x6536;&#x6587;&#x4EF6;&#x4E0A;&#x8F7D;&#xFF0C;&#x66F4;&#x65B0;&#x591A;&#x4E2A;&#x6570;&#x636E;&#x5E93;&#x8868;&#xFF0C;&#x5199;&#x5165;&#x65E5;&#x5FD7;&#xFF0C;&#x5E76;&#x5728;&#x53D1;&#x9001;&#x54CD;&#x5E94;&#x4E4B;&#x524D;&#x8FDB;&#x884C;&#x8FDB;&#x4E00;&#x6B65;&#x7684;API&#x8C03;&#x7528;&#x3002;</p><h3>Promises</h3><p>ES2015&#xFF08;ES6&#xFF09;&#x63A8;&#x51FA;&#x4E86;Promises&#x3002;&#x56DE;&#x8C03;&#x4ECD;&#x7136;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#xFF0C;&#x4F46;Promises&#x63D0;&#x4F9B;&#x4E86;&#x66F4;&#x6E05;&#x6670;&#x7684;&#x8BED;&#x6CD5;chains&#x5F02;&#x6B65;&#x547D;&#x4EE4;&#xFF0C;&#x56E0;&#x6B64;&#x5B83;&#x4EEC;&#x53EF;&#x4EE5;&#x4E32;&#x884C;&#x8FD0;&#x884C;&#xFF08;&#x66F4;&#x591A;&#x76F8;&#x5173;&#x5185;&#x5BB9;&#xFF09;&#x3002;</p><p>&#x8981;&#x542F;&#x7528;&#x57FA;&#x4E8E;Promise&#x7684;&#x6267;&#x884C;&#xFF0C;&#x5FC5;&#x987B;&#x66F4;&#x6539;&#x57FA;&#x4E8E;&#x5F02;&#x6B65;&#x56DE;&#x8C03;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x4EE5;&#x4FBF;&#x5B83;&#x4EEC;&#x7ACB;&#x5373;&#x8FD4;&#x56DE;Promise&#x5BF9;&#x8C61;&#x3002;&#x8BE5;promises&#x5BF9;&#x8C61;&#x5728;&#x5C06;&#x6765;&#x7684;&#x67D0;&#x4E2A;&#x65F6;&#x523B;&#x8FD0;&#x884C;&#x4E24;&#x4E2A;&#x51FD;&#x6570;&#x4E4B;&#x4E00;&#xFF08;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x4F20;&#x9012;&#xFF09;&#xFF1A;</p><ul><li>resolve &#xFF1A;&#x5904;&#x7406;&#x6210;&#x529F;&#x5B8C;&#x6210;&#x65F6;&#x8FD0;&#x884C;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;</li><li>reject &#xFF1A;&#x53D1;&#x751F;&#x6545;&#x969C;&#x65F6;&#x8FD0;&#x884C;&#x7684;&#x53EF;&#x9009;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;</li></ul><p>&#x5728;&#x4E0B;&#x9762;&#x7684;&#x793A;&#x4F8B;&#x4E2D;&#xFF0C;&#x6570;&#x636E;&#x5E93;API&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x63A5;&#x53D7;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;connect&#xFF08;&#xFF09;&#x65B9;&#x6CD5;&#x3002;&#x5916;&#x90E8;asyncDBconnect&#xFF08;&#xFF09;&#x51FD;&#x6570;&#x7ACB;&#x5373;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;Promise&#xFF0C;&#x5E76;&#x5728;&#x5EFA;&#x7ACB;&#x8FDE;&#x63A5;&#x6216;&#x5931;&#x8D25;&#x540E;&#x8FD0;&#x884C;resolve&#xFF08;&#xFF09;&#x6216;reject&#xFF08;&#xFF09;&#xFF1A;</p><pre><code>const db = require(&apos;database&apos;);

// connect to database
function asyncDBconnect(param) {

  return new Promise((resolve, reject) =&gt; {

    db.connect(param, (err, connection) =&gt; {
      if (err) reject(err);
      else resolve(connection);
    });

  });

}</code></pre><p>Node.js 8.0+&#x63D0;&#x4F9B;&#x4E86;<a href="https://nodejs.org/api/util.html#util_util_promisify_original" rel="nofollow noreferrer">util.promisify&#xFF08;&#xFF09;&#x5B9E;&#x7528;&#x7A0B;&#x5E8F;</a>&#xFF0C;&#x5C06;&#x57FA;&#x4E8E;&#x56DE;&#x8C03;&#x7684;&#x51FD;&#x6570;&#x8F6C;&#x6362;&#x4E3A;&#x57FA;&#x4E8E;Promise&#x7684;&#x66FF;&#x4EE3;&#x65B9;&#x6CD5;&#x3002;&#x6709;&#x51E0;&#x4E2A;&#x6761;&#x4EF6;&#xFF1A;</p><ol><li>&#x5C06;&#x56DE;&#x8C03;&#x4F5C;&#x4E3A;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4F20;&#x9012;&#x7ED9;&#x5F02;&#x6B65;&#x51FD;&#x6570;</li><li>&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5FC5;&#x987B;&#x6307;&#x5411;&#x4E00;&#x4E2A;&#x9519;&#x8BEF;&#xFF0C;&#x540E;&#x8DDF;&#x4E00;&#x4E2A;&#x503C;&#x53C2;&#x6570;&#x3002;</li></ol><p>&#x4F8B;&#x5B50;:</p><pre><code>// Node.js: promisify fs.readFile
const
  util = require(&apos;util&apos;),
  fs = require(&apos;fs&apos;),
  readFileAsync = util.promisify(fs.readFile);

readFileAsync(&apos;file.txt&apos;);</code></pre><p>&#x5404;&#x79CD;&#x5BA2;&#x6237;&#x7AEF;&#x5E93;&#x4E5F;&#x63D0;&#x4F9B;promisify&#x9009;&#x9879;&#xFF0C;&#x4F46;&#x60A8;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x521B;&#x5EFA;&#x51E0;&#x4E2A;&#xFF1A;</p><pre><code>// promisify a callback function passed as the last parameter
// the callback function must accept (err, data) parameters
function promisify(fn) {
  return function() {
      return new Promise(
        (resolve, reject) =&gt; fn(
          ...Array.from(arguments),
        (err, data) =&gt; err ? reject(err) : resolve(data)
      )
    );
  }
}

// example
function wait(time, callback) {
  setTimeout(() =&gt; { callback(null, &apos;done&apos;); }, time);
}

const asyncWait = promisify(wait);

ayscWait(1000);</code></pre><h3>&#x5F02;&#x6B65;&#x94FE;</h3><p>&#x4EFB;&#x4F55;&#x8FD4;&#x56DE;Promise&#x7684;&#x4E1C;&#x897F;&#x90FD;&#x53EF;&#x4EE5;&#x542F;&#x52A8;.then&#xFF08;&#xFF09;&#x65B9;&#x6CD5;&#x4E2D;&#x5B9A;&#x4E49;&#x7684;&#x4E00;&#x7CFB;&#x5217;&#x5F02;&#x6B65;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x3002;&#x6BCF;&#x4E2A;&#x90FD;&#x4F20;&#x9012;&#x4E86;&#x4E0A;&#x4E00;&#x4E2A;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x7684;&#x7ED3;&#x679C;&#xFF1A;</p><pre><code>asyncDBconnect(&apos;http://localhost:1234&apos;)
  .then(asyncGetSession)      // passed result of asyncDBconnect
  .then(asyncGetUser)         // passed result of asyncGetSession
  .then(asyncLogAccess)       // passed result of asyncGetUser
  .then(result =&gt; {           // non-asynchronous function
    console.log(&apos;complete&apos;);  //   (passed result of asyncLogAccess)
    return result;            //   (result passed to next .then())
  })
  .catch(err =&gt; {             // called on any reject
    console.log(&apos;error&apos;, err);
  });</code></pre><p>&#x540C;&#x6B65;&#x51FD;&#x6570;&#x4E5F;&#x53EF;&#x4EE5;&#x5728;.then&#xFF08;&#xFF09;&#x5757;&#x4E2D;&#x6267;&#x884C;&#x3002;&#x8FD4;&#x56DE;&#x7684;&#x503C;&#x5C06;&#x4F20;&#x9012;&#x7ED9;&#x4E0B;&#x4E00;&#x4E2A;.then&#xFF08;&#xFF09;&#xFF08;&#x5982;&#x679C;&#x6709;&#xFF09;&#x3002;</p><p>.catch&#xFF08;&#xFF09;&#x65B9;&#x6CD5;&#x5B9A;&#x4E49;&#x4E86;&#x5728;&#x89E6;&#x53D1;&#x4EFB;&#x4F55;&#x5148;&#x524D;&#x62D2;&#x7EDD;&#x65F6;&#x8C03;&#x7528;&#x7684;&#x51FD;&#x6570;&#x3002;&#x6B64;&#x65F6;&#xFF0C;&#x4E0D;&#x4F1A;&#x518D;&#x8FD0;&#x884C;.then&#xFF08;&#xFF09;&#x65B9;&#x6CD5;&#x3002;&#x60A8;&#x53EF;&#x4EE5;&#x5728;&#x6574;&#x4E2A;&#x94FE;&#x4E2D;&#x4F7F;&#x7528;&#x591A;&#x4E2A;.catch&#xFF08;&#xFF09;&#x65B9;&#x6CD5;&#x6765;&#x6355;&#x83B7;&#x4E0D;&#x540C;&#x7684;&#x9519;&#x8BEF;&#x3002;</p><p>ES2018&#x5F15;&#x5165;&#x4E86;&#x4E00;&#x4E2A;.finally&#xFF08;&#xFF09;&#x65B9;&#x6CD5;&#xFF0C;&#x65E0;&#x8BBA;&#x7ED3;&#x679C;&#x5982;&#x4F55;&#x90FD;&#x8FD0;&#x884C;&#x4EFB;&#x4F55;&#x6700;&#x7EC8;&#x903B;&#x8F91; - &#x4F8B;&#x5982;&#xFF0C;&#x6E05;&#x7406;&#xFF0C;&#x5173;&#x95ED;&#x6570;&#x636E;&#x5E93;&#x8FDE;&#x63A5;&#x7B49;&#x3002;&#x76EE;&#x524D;&#x4EC5;&#x652F;&#x6301;Chrome&#x548C;Firefox&#xFF0C;&#x4F46;&#x6280;&#x672F;&#x59D4;&#x5458;&#x4F1A;39&#x5DF2;&#x53D1;&#x5E03;&#x4E86; <a href="https://github.com/tc39/proposal-promise-finally/blob/fd934c0b42d59bf8d9446e737ba14d50a9067216/polyfill.js" rel="nofollow noreferrer">.finally() polyfill.</a></p><pre><code>function doSomething() {
  doSomething1()
  .then(doSomething2)
  .then(doSomething3)
  .catch(err =&gt; {
    console.log(err);
  })
  .finally(() =&gt; {
    // tidy-up here!
  });
}</code></pre><h3>&#x4F7F;&#x7528;Promise.all&#xFF08;&#xFF09;&#x8FDB;&#x884C;&#x591A;&#x4E2A;&#x5F02;&#x6B65;&#x8C03;&#x7528;</h3><p>Promise .then&#xFF08;&#xFF09;&#x65B9;&#x6CD5;&#x4E00;&#x4E2A;&#x63A5;&#x4E00;&#x4E2A;&#x5730;&#x8FD0;&#x884C;&#x5F02;&#x6B65;&#x51FD;&#x6570;&#x3002;&#x5982;&#x679C;&#x987A;&#x5E8F;&#x65E0;&#x5173;&#x7D27;&#x8981; - &#x4F8B;&#x5982;&#xFF0C;&#x521D;&#x59CB;&#x5316;&#x4E0D;&#x76F8;&#x5173;&#x7684;&#x7EC4;&#x4EF6; - &#x540C;&#x65F6;&#x542F;&#x52A8;&#x6240;&#x6709;&#x5F02;&#x6B65;&#x51FD;&#x6570;&#x5E76;&#x5728;&#x6700;&#x540E;&#xFF08;&#x6700;&#x6162;&#xFF09;&#x51FD;&#x6570;&#x8FD0;&#x884C;&#x89E3;&#x6790;&#x65F6;&#x7ED3;&#x675F;&#x66F4;&#x5FEB;&#x3002;</p><p>&#x8FD9;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;Promise.all&#xFF08;&#xFF09;&#x6765;&#x5B9E;&#x73B0;&#x3002;&#x5B83;&#x63A5;&#x53D7;&#x4E00;&#x7EC4;&#x51FD;&#x6570;&#x5E76;&#x8FD4;&#x56DE;&#x53E6;&#x4E00;&#x4E2A;Promise&#x3002;&#x4F8B;&#x5982;&#xFF1A;</p><pre><code>Promise.all([ async1, async2, async3 ])
  .then(values =&gt; {           // array of resolved values
    console.log(values);      // (in same order as function array)
    return values;
  })
  .catch(err =&gt; {             // called on any reject
    console.log(&apos;error&apos;, err);
  });</code></pre><p>&#x5982;&#x679C;&#x4EFB;&#x4F55;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x5931;&#x8D25;&#xFF0C;&#x5219;Promise.all&#xFF08;&#xFF09;&#x7ACB;&#x5373;&#x7EC8;&#x6B62;&#x3002;</p><h3>&#x4F7F;&#x7528;Promise.race&#x7684;&#x591A;&#x4E2A;&#x5F02;&#x6B65;&#x8C03;&#x7528;&#xFF08;&#xFF09;</h3><p>Promise.race&#xFF08;&#xFF09;&#x4E0E;Promise.all&#xFF08;&#xFF09;&#x7C7B;&#x4F3C;&#xFF0C;&#x53EA;&#x662F;&#x5B83;&#x4F1A;&#x5728;first Promise&#x89E3;&#x6790;&#x6216;&#x62D2;&#x7EDD;&#x540E;&#x7ACB;&#x5373;&#x89E3;&#x6790;&#x6216;&#x62D2;&#x7EDD;&#x3002;&#x53EA;&#x6709;&#x6700;&#x5FEB;&#x7684;&#x57FA;&#x4E8E;Promise&#x7684;&#x5F02;&#x6B65;&#x51FD;&#x6570;&#x624D;&#x80FD;&#x5B8C;&#x6210;&#xFF1A;</p><pre><code>Promise.race([ async1, async2, async3 ])
  .then(value =&gt; {            // single value
    console.log(value);
    return value;
  })
  .catch(err =&gt; {             // called on any reject
    console.log(&apos;error&apos;, err);
  });</code></pre><h3>&#x4F46;&#x662F;&#x6709;&#x4EC0;&#x4E48;&#x522B;&#x7684;&#x95EE;&#x9898;&#x5417;&#xFF1F;</h3><p>Promises &#x51CF;&#x5C11;&#x4E86;&#x56DE;&#x8C03;&#x5730;&#x72F1;&#x4F46;&#x5F15;&#x5165;&#x4E86;&#x522B;&#x7684;&#x95EE;&#x9898;&#x3002;</p><p>&#x6559;&#x7A0B;&#x7ECF;&#x5E38;&#x6CA1;&#x6709;&#x63D0;&#x5230;_&#x6574;&#x4E2A;Promise&#x94FE;&#x662F;&#x5F02;&#x6B65;&#x7684;&#x3002;&#x4F7F;&#x7528;&#x4E00;&#x7CFB;&#x5217;promise&#x7684;&#x4EFB;&#x4F55;&#x51FD;&#x6570;&#x90FD;&#x5E94;&#x8FD4;&#x56DE;&#x81EA;&#x5DF1;&#x7684;Promise&#x6216;&#x5728;&#x6700;&#x7EC8;&#x7684;.then&#xFF08;&#xFF09;,. catch&#xFF08;&#xFF09;&#x6216;.finally&#xFF08;&#xFF09;&#x65B9;&#x6CD5;&#x4E2D;&#x8FD0;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;</p><p>&#x5B66;&#x4E60;&#x57FA;&#x7840;&#x77E5;&#x8BC6;&#x81F3;&#x5173;&#x91CD;&#x8981;&#x3002;</p><p>&#x66F4;&#x591A;&#x7684;&#x5173;&#x4E8E;Promises&#x7684;&#x8D44;&#x6E90;&#xFF1A;</p><ul><li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" rel="nofollow noreferrer">MDN Promise&#x6587;&#x6863;</a></li><li><a href="https://developers.google.com/web/fundamentals/primers/promises" rel="nofollow noreferrer">JavaScript Promises: &#x7B80;&#x4ECB;</a></li><li><a href="http://www.mattgreer.org/articles/promises-in-wicked-detail/" rel="nofollow noreferrer">JavaScript Promises &#x2026;&#x76F8;&#x5173;&#x7EC6;&#x8282;</a></li><li><a href="http://exploringjs.com/es6/ch_promises.html" rel="nofollow noreferrer">Promises&#x5F02;&#x6B65;&#x7F16;&#x7A0B;</a></li></ul><h3>Async/Await</h3><p>Promises &#x53EF;&#x80FD;&#x4EE4;&#x4EBA;&#x751F;&#x754F;&#xFF0C;&#x56E0;&#x6B64;ES2017&#x5F15;&#x5165;&#x4E86;async and await&#x3002; &#x867D;&#x7136;&#x5B83;&#x53EF;&#x80FD;&#x53EA;&#x662F;&#x8BED;&#x6CD5;&#x7CD6;&#xFF0C;&#x5B83;&#x4F7F;Promise&#x66F4;&#x5B8C;&#x5584;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x5B8C;&#x5168;&#x907F;&#x514D;.then&#xFF08;&#xFF09;&#x94FE;&#x3002; &#x8003;&#x8651;&#x4E0B;&#x9762;&#x7684;&#x57FA;&#x4E8E;Promise&#x7684;&#x793A;&#x4F8B;&#xFF1A;</p><pre><code>function connect() {

  return new Promise((resolve, reject) =&gt; {

    asyncDBconnect(&apos;http://localhost:1234&apos;)
      .then(asyncGetSession)
      .then(asyncGetUser)
      .then(asyncLogAccess)
      .then(result =&gt; resolve(result))
      .catch(err =&gt; reject(err))

  });
}

// run connect (self-executing function)
(() =&gt; {
  connect();
    .then(result =&gt; console.log(result))
    .catch(err =&gt; console.log(err))
})();</code></pre><p>&#x7528;&#x8FD9;&#x4E2A;&#x91CD;&#x5199;&#x4E00;&#x4E0B;async/await:</p><ul><li>&#x5916;&#x90E8;&#x51FD;&#x6570;&#x5FC5;&#x987B;&#x4EE5;async&#x8BED;&#x53E5;&#x5F00;&#x5934;</li><li>&#x5BF9;&#x5F02;&#x6B65;&#x7684;&#x57FA;&#x4E8E;Promise&#x7684;&#x51FD;&#x6570;&#x7684;&#x8C03;&#x7528;&#x5FC5;&#x987B;&#x5728;await&#x4E4B;&#x524D;&#xFF0C;&#x4EE5;&#x786E;&#x4FDD;&#x5728;&#x4E0B;&#x4E00;&#x4E2A;&#x547D;&#x4EE4;&#x6267;&#x884C;&#x4E4B;&#x524D;&#x5B8C;&#x6210;&#x5904;&#x7406;&#x3002;</li></ul><pre><code>async function connect() {

  try {
    const
      connection = await asyncDBconnect(&apos;http://localhost:1234&apos;),
      session = await asyncGetSession(connection),
      user = await asyncGetUser(session),
      log = await asyncLogAccess(user);

    return log;
  }
  catch (e) {
    console.log(&apos;error&apos;, err);
    return null;
  }

}

// run connect (self-executing async function)
(async () =&gt; { await connect(); })();</code></pre><p>await&#x6709;&#x6548;&#x5730;&#x4F7F;&#x6BCF;&#x4E2A;&#x8C03;&#x7528;&#x770B;&#x8D77;&#x6765;&#x597D;&#x50CF;&#x662F;&#x540C;&#x6B65;&#x7684;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x963B;&#x6B62;JavaScript&#x7684;&#x5355;&#x4E2A;&#x5904;&#x7406;&#x7EBF;&#x7A0B;&#x3002; &#x6B64;&#x5916;&#xFF0C;&#x5F02;&#x6B65;&#x51FD;&#x6570;&#x603B;&#x662F;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;Promise&#xFF0C;&#x56E0;&#x6B64;&#x5B83;&#x4EEC;&#x53EF;&#x4EE5;&#x88AB;&#x5176;&#x4ED6;&#x5F02;&#x6B65;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x3002;</p><p>async/await &#x4EE3;&#x7801;&#x53EF;&#x80FD;&#x4E0D;&#x4F1A;&#x66F4;&#x77ED;&#xFF0C;&#x4F46;&#x6709;&#x76F8;&#x5F53;&#x5927;&#x7684;&#x597D;&#x5904;:</p><p>1&#x3001;&#x8BED;&#x6CD5;&#x66F4;&#x6E05;&#x6670;&#x3002;&#x62EC;&#x53F7;&#x66F4;&#x5C11;&#xFF0C;&#x9519;&#x8BEF;&#x66F4;&#x5C11;&#x3002;</p><p>2&#x3001;&#x8C03;&#x8BD5;&#x66F4;&#x5BB9;&#x6613;&#x3002;&#x53EF;&#x4EE5;&#x5728;&#x4EFB;&#x4F55;await&#x8BED;&#x53E5;&#x4E0A;&#x8BBE;&#x7F6E;&#x65AD;&#x70B9;&#x3002;<br>3&#x3001;&#x9519;&#x8BEF;&#x5904;&#x7406;&#x66F4;&#x597D;&#x3002;try / catch&#x5757;&#x53EF;&#x4EE5;&#x4E0E;&#x540C;&#x6B65;&#x4EE3;&#x7801;&#x4E00;&#x6837;&#x4F7F;&#x7528;&#x3002;</p><p>4&#x3001;&#x652F;&#x6301;&#x5F88;&#x597D;&#x3002;&#x5B83;&#x5728;&#x6240;&#x6709;&#x6D4F;&#x89C8;&#x5668;&#xFF08;IE&#x548C;Opera Mini&#x9664;&#x5916;&#xFF09;&#x548C;Node 7.6+&#x4E2D;&#x90FD;&#x5F97;&#x5230;&#x4E86;&#x652F;&#x6301;&#x3002;</p><p>&#x4F46;&#x662F;&#x5E76;&#x975E;&#x6240;&#x6709;&#x90FD;&#x662F;&#x5B8C;&#x7F8E;&#x7684;......</p><h3>&#x5207;&#x52FF;&#x6EE5;&#x7528;async/await</h3><p>async / await&#x4ECD;&#x7136;&#x4F9D;&#x8D56;&#x4E8E;Promises&#xFF0C;&#x5B83;&#x6700;&#x7EC8;&#x4F9D;&#x8D56;&#x4E8E;&#x56DE;&#x8C03;&#x3002;&#x4F60;&#x9700;&#x8981;&#x4E86;&#x89E3;Promises&#x662F;&#x5982;&#x4F55;&#x5DE5;&#x4F5C;&#x7684;&#xFF0C;&#x5E76;&#x4E14;&#x6CA1;&#x6709;Promise.all&#xFF08;&#xFF09;&#x548C;Promise.race&#xFF08;&#xFF09;&#x7684;&#x76F4;&#x63A5;&#x7B49;&#x4EF7;&#x7269;&#x3002;&#x5E76;&#x4E14;&#x4E0D;&#x8981;&#x5FD8;&#x8BB0;Promise.all&#xFF08;&#xFF09;&#xFF0C;&#x5B83;&#x6BD4;&#x4F7F;&#x7528;&#x4E00;&#x7CFB;&#x5217;&#x4E0D;&#x76F8;&#x5173;&#x7684;await&#x547D;&#x4EE4;&#x66F4;&#x6709;&#x6548;&#x3002;</p><h3>&#x540C;&#x6B65;&#x5FAA;&#x73AF;&#x4E2D;&#x7684;&#x5F02;&#x6B65;&#x7B49;&#x5F85;</h3><p>&#x5728;&#x67D0;&#x4E9B;&#x65F6;&#x5019;&#xFF0C;&#x60A8;&#x5C06;&#x5C1D;&#x8BD5;&#x8C03;&#x7528;&#x5F02;&#x6B65;&#x51FD;&#x6570;&#x4E2D;&#x7684;&#x540C;&#x6B65;&#x5FAA;&#x73AF;&#x3002;&#x4F8B;&#x5982;&#xFF1A;</p><pre><code>async function process(array) {
  for (let i of array) {
    await doSomething(i);
  }
}</code></pre><p>&#x5B83;&#x4E0D;&#x4F1A;&#x8D77;&#x4F5C;&#x7528;&#x3002;&#x8FD9;&#x4E5F;&#x4E0D;&#x4F1A;&#xFF1A;</p><pre><code>async function process(array) {
  array.forEach(async i =&gt; {
    await doSomething(i);
  });
}</code></pre><p>&#x5FAA;&#x73AF;&#x672C;&#x8EAB;&#x4FDD;&#x6301;&#x540C;&#x6B65;&#xFF0C;&#x5E76;&#x4E14;&#x603B;&#x662F;&#x5728;&#x5B83;&#x4EEC;&#x7684;&#x5185;&#x90E8;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x4E4B;&#x524D;&#x5B8C;&#x6210;&#x3002;</p><p>ES2018&#x5F15;&#x5165;&#x4E86;&#x5F02;&#x6B65;&#x8FED;&#x4EE3;&#x5668;&#xFF0C;&#x5B83;&#x4E0E;&#x5E38;&#x89C4;&#x8FED;&#x4EE3;&#x5668;&#x4E00;&#x6837;&#xFF0C;&#x4F46;next&#xFF08;&#xFF09;&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;Promise&#x3002;&#x56E0;&#x6B64;&#xFF0C;await&#x5173;&#x952E;&#x5B57;&#x53EF;&#x4EE5;&#x4E0E;for&#x5FAA;&#x73AF;&#x4E00;&#x8D77;&#x7528;&#x4E8E;&#x4E32;&#x884C;&#x8FD0;&#x884C;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x3002;&#x4F8B;&#x5982;&#xFF1A;</p><pre><code>async function process(array) {
  for await (let i of array) {
    doSomething(i);
  }
}</code></pre><p>&#x4F46;&#x662F;&#xFF0C;&#x5728;&#x5B9E;&#x73B0;&#x5F02;&#x6B65;&#x8FED;&#x4EE3;&#x5668;&#x4E4B;&#x524D;&#xFF0C;&#x6700;&#x597D;&#x5C06;&#x6570;&#x7EC4;&#x9879;&#x6620;&#x5C04;&#x5230;&#x5F02;&#x6B65;&#x51FD;&#x6570;&#x5E76;&#x4F7F;&#x7528;Promise.all&#xFF08;&#xFF09;&#x8FD0;&#x884C;&#x5B83;&#x4EEC;&#x3002;&#x4F8B;&#x5982;&#xFF1A;</p><pre><code>const
  todo = [&apos;a&apos;, &apos;b&apos;, &apos;c&apos;],
  alltodo = todo.map(async (v, i) =&gt; {
    console.log(&apos;iteration&apos;, i);
    await processSomething(v);
});

await Promise.all(alltodo);</code></pre><p>&#x8FD9;&#x5177;&#x6709;&#x5E76;&#x884C;&#x8FD0;&#x884C;&#x4EFB;&#x52A1;&#x7684;&#x597D;&#x5904;&#xFF0C;&#x4F46;&#x662F;&#x4E0D;&#x53EF;&#x80FD;&#x5C06;&#x4E00;&#x6B21;&#x8FED;&#x4EE3;&#x7684;&#x7ED3;&#x679C;&#x4F20;&#x9012;&#x7ED9;&#x53E6;&#x4E00;&#x6B21;&#x8FED;&#x4EE3;&#xFF0C;&#x5E76;&#x4E14;&#x6620;&#x5C04;&#x5927;&#x578B;&#x6570;&#x7EC4;&#x53EF;&#x80FD;&#x5728;&#x6027;&#x80FD;&#x6D88;&#x8017;&#x4E0A;&#x662F;&#x5F88;&#x6602;&#x8D35;&#x3002;</p><h3>try/catch &#x6709;&#x54EA;&#x4E9B;&#x95EE;&#x9898;&#x4E86;&#xFF1F;</h3><p>&#x5982;&#x679C;&#x7701;&#x7565;&#x4EFB;&#x4F55;await&#x5931;&#x8D25;&#x7684;try / catch&#xFF0C;async&#x51FD;&#x6570;&#x5C06;&#x4EE5;&#x9759;&#x9ED8;&#x65B9;&#x5F0F;&#x9000;&#x51FA;&#x3002;&#x5982;&#x679C;&#x60A8;&#x6709;&#x4E00;&#x7EC4;&#x5F88;&#x957F;&#x7684;&#x5F02;&#x6B65;await&#x547D;&#x4EE4;&#xFF0C;&#x5219;&#x53EF;&#x80FD;&#x9700;&#x8981;&#x591A;&#x4E2A;try / catch&#x5757;&#x3002;</p><p>&#x4E00;&#x79CD;&#x66FF;&#x4EE3;&#x65B9;&#x6848;&#x662F;&#x9AD8;&#x9636;&#x51FD;&#x6570;&#xFF0C;&#x5B83;&#x6355;&#x83B7;&#x9519;&#x8BEF;&#xFF0C;&#x56E0;&#x6B64;try / catch&#x5757;&#x53D8;&#x5F97;&#x4E0D;&#x5FC5;&#x8981;(thanks to <a href="https://twitter.com/wesbos/status/911309291545559041" rel="nofollow noreferrer">@wesbos</a> for the suggestion):</p><pre><code>async function connect() {

  const
    connection = await asyncDBconnect(&apos;http://localhost:1234&apos;),
    session = await asyncGetSession(connection),
    user = await asyncGetUser(session),
    log = await asyncLogAccess(user);

  return true;
}

// higher-order function to catch errors
function catchErrors(fn) {
  return function (...args) {
    return fn(...args).catch(err =&gt; {
      console.log(&apos;ERROR&apos;, err);
    });
  }
}

(async () =&gt; {
  await catchErrors(connect)();
})();</code></pre><p>&#x4F46;&#x662F;&#xFF0C;&#x5728;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x5FC5;&#x987B;&#x4EE5;&#x4E0E;&#x5176;&#x4ED6;&#x9519;&#x8BEF;&#x4E0D;&#x540C;&#x7684;&#x65B9;&#x5F0F;&#x5BF9;&#x67D0;&#x4E9B;&#x9519;&#x8BEF;&#x505A;&#x51FA;&#x53CD;&#x5E94;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x6B64;&#x9009;&#x9879;&#x53EF;&#x80FD;&#x4E0D;&#x5B9E;&#x7528;&#x3002;</p><p>&#x5C3D;&#x7BA1;&#x6709;&#x4E00;&#x4E9B;&#x9677;&#x9631;&#xFF0C;async / await&#x662F;JavaScript&#x7684;&#x4E00;&#x4E2A;&#x4F18;&#x96C5;&#x8865;&#x5145;&#x3002;&#x66F4;&#x591A;&#x8D44;&#x6E90;&#xFF1A;</p><ul><li>MDN <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function" rel="nofollow noreferrer">async</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await" rel="nofollow noreferrer">await</a></li><li><a href="https://developers.google.com/web/fundamentals/primers/async-functions" rel="nofollow noreferrer">Async functions &#x2013; &#x4F7F; promises &#x66F4;&#x53CB;&#x597D;</a></li><li><a href="https://tc39.github.io/ecmascript-asyncawait/" rel="nofollow noreferrer">TC39 Async Functions &#x89C4;&#x8303;</a></li><li><a href="https://www.sitepoint.com/simplifying-asynchronous-coding-async-functions/" rel="nofollow noreferrer">&#x4F7F;&#x7528;&#x5F02;&#x6B65;&#x51FD;&#x6570;&#x7B80;&#x5316;&#x5F02;&#x6B65;&#x7F16;&#x7801;</a></li></ul><h3>JavaScript &#x65C5;&#x7A0B;</h3><p>&#x5F02;&#x6B65;&#x7F16;&#x7A0B;&#x662F;&#x4E00;&#x9879;&#x5728;JavaScript&#x4E2D;&#x65E0;&#x6CD5;&#x907F;&#x514D;&#x7684;&#x6311;&#x6218;&#x3002;&#x56DE;&#x8C03;&#x5728;&#x5927;&#x591A;&#x6570;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x4E2D;&#x90FD;&#x662F;&#x5FC5;&#x4E0D;&#x53EF;&#x5C11;&#x7684;&#xFF0C;&#x4F46;&#x5B83;&#x5F88;&#x5BB9;&#x6613;&#x9677;&#x5165;&#x6DF1;&#x5C42;&#x5D4C;&#x5957;&#x7684;&#x51FD;&#x6570;&#x4E2D;&#x3002;</p><p>Promises &#x62BD;&#x8C61;&#x56DE;&#x8C03;&#xFF0C;&#x4F46;&#x6709;&#x8BB8;&#x591A;&#x8BED;&#x6CD5;&#x9677;&#x9631;&#x3002; &#x8F6C;&#x6362;&#x73B0;&#x6709;&#x51FD;&#x6570;&#x53EF;&#x80FD;&#x662F;&#x4E00;&#x4EF6;&#x82E6;&#x5DEE;&#x4E8B;&#xFF0C;&#x800C;.then&#xFF08;&#xFF09;&#x94FE;&#x4ECD;&#x7136;&#x770B;&#x8D77;&#x6765;&#x5F88;&#x6DF7;&#x4E71;&#x3002;</p><p>&#x5E78;&#x8FD0;&#x7684;&#x662F;&#xFF0C;async / await&#x63D0;&#x4F9B;&#x4E86;&#x6E05;&#x6670;&#x5EA6;&#x3002;&#x4EE3;&#x7801;&#x770B;&#x8D77;&#x6765;&#x662F;&#x540C;&#x6B65;&#x7684;&#xFF0C;&#x4F46;&#x5B83;&#x4E0D;&#x80FD;&#x72EC;&#x5360;&#x5355;&#x4E2A;&#x5904;&#x7406;&#x7EBF;&#x7A0B;&#x3002;&#x5B83;&#x5C06;&#x6539;&#x53D8;&#x4F60;&#x7F16;&#x5199;JavaScript&#x7684;&#x65B9;&#x5F0F;&#xFF01;</p><p>(&#x8BD1;&#x8005;&#x6CE8;&#xFF1A;Craig Buckler&#x8BB2;&#x89E3;JavaScript&#x7684;&#x6587;&#x7AE0;&#x90FD;&#x8FD8;&#x4E0D;&#x9519;&#xFF0C;&#x57FA;&#x672C;&#x662F;&#x7528;&#x4E00;&#x4E9B;&#x6BD4;&#x8F83;&#x901A;&#x4FD7;&#x7684;&#x8BED;&#x8A00;&#x548C;&#x4EE3;&#x7801;&#x4E8B;&#x4F8B;&#x8BB2;&#x89E3;&#x4E86;JavaScript&#x7684;&#x4E00;&#x4E9B;&#x7279;&#x6027;&#x548C;&#x4E00;&#x4E9B;&#x8BED;&#x6CD5;&#x53EF;&#x80FD;&#x51FA;&#x73B0;&#x7684;&#x95EE;&#x9898;&#x3002;&#x611F;&#x5174;&#x8DA3;&#x7684;&#x670B;&#x53CB;&#x53EF;&#x4EE5;&#x770B;&#x4E00;&#x4E0B;&#xFF08;<a href="https://www.sitepoint.com/author/craig-buckler/" rel="nofollow noreferrer">https://www.sitepoint.com/aut...</a>&#xFF09;)</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
现代JS中的流程控制：详解Callbacks 、Promises 、Async/Await

## 原文链接
[https://segmentfault.com/a/1190000016143319](https://segmentfault.com/a/1190000016143319)

