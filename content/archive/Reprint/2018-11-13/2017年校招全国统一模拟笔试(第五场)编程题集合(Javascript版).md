---
title: 2017年校招全国统一模拟笔试(第五场)编程题集合(Javascript版)
reprint: true
categories: reprint
abbrlink: 8a9263c
date: 2018-11-13 02:30:09
---

{{% raw %}}
<blockquote>&#x5730;&#x5740;&#xFF1A;<a href="https://www.nowcoder.com/test/5986669/summary" rel="nofollow noreferrer">2017&#x5E74;&#x6821;&#x62DB;&#x5168;&#x56FD;&#x7EDF;&#x4E00;&#x6A21;&#x62DF;&#x7B14;&#x8BD5;(&#x7B2C;&#x4E94;&#x573A;)&#x7F16;&#x7A0B;&#x9898;&#x96C6;&#x5408;</a></blockquote><h3>&#x5076;&#x4E32; (AC)</h3><p>&#x5982;&#x679C;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x7531;&#x4E24;&#x4E2A;&#x76F8;&#x540C;&#x5B57;&#x7B26;&#x4E32;&#x8FDE;&#x63A5;&#x800C;&#x6210;,&#x5C31;&#x79F0;&#x8FD9;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x662F;&#x5076;&#x4E32;&#x3002;&#x4F8B;&#x5982;&quot;xyzxyz&quot;&#x548C;&quot;aaaaaa&quot;&#x662F;&#x5076;&#x4E32;,&#x4F46;&#x662F;&quot;ababab&quot;&#x548C;&quot;xyzxy&quot;&#x5374;&#x4E0D;&#x662F;&#x3002;<br>&#x725B;&#x725B;&#x73B0;&#x5728;&#x7ED9;&#x4F60;&#x4E00;&#x4E2A;&#x53EA;&#x5305;&#x542B;&#x5C0F;&#x5199;&#x5B57;&#x6BCD;&#x7684;&#x5076;&#x4E32;s,&#x4F60;&#x53EF;&#x4EE5;&#x4ECE;&#x5B57;&#x7B26;&#x4E32;s&#x7684;&#x672B;&#x5C3E;&#x5220;&#x9664;1&#x548C;&#x6216;&#x8005;&#x591A;&#x4E2A;&#x5B57;&#x7B26;,&#x4FDD;&#x8BC1;&#x5220;&#x9664;&#x4E4B;&#x540E;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x8FD8;&#x662F;&#x4E00;&#x4E2A;&#x5076;&#x4E32;,&#x725B;&#x725B;&#x60F3;&#x77E5;&#x9053;&#x5220;&#x9664;&#x4E4B;&#x540E;&#x5F97;&#x5230;&#x6700;&#x957F;&#x5076;&#x4E32;&#x957F;&#x5EA6;&#x662F;&#x591A;&#x5C11;&#x3002;</p><p>&#x8F93;&#x5165;&#x63CF;&#x8FF0;:<br>&#x8F93;&#x5165;&#x5305;&#x62EC;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;s,&#x5B57;&#x7B26;&#x4E32;&#x957F;&#x5EA6;length(2 &#x2264; length &#x2264; 200),&#x4FDD;&#x8BC1;s&#x662F;&#x4E00;&#x4E2A;&#x5076;&#x4E32;&#x4E14;&#x7531;&#x5C0F;&#x5199;&#x5B57;&#x6BCD;&#x6784;&#x6210;</p><p>&#x8F93;&#x51FA;&#x63CF;&#x8FF0;:<br>&#x8F93;&#x51FA;&#x4E00;&#x4E2A;&#x6574;&#x6570;,&#x8868;&#x793A;&#x5220;&#x9664;&#x4E4B;&#x540E;&#x80FD;&#x5F97;&#x5230;&#x7684;&#x6700;&#x957F;&#x5076;&#x4E32;&#x957F;&#x5EA6;&#x662F;&#x591A;&#x5C11;&#x3002;&#x4FDD;&#x8BC1;&#x6D4B;&#x8BD5;&#x6570;&#x636E;&#x6709;&#x975E;&#x96F6;&#x89E3;</p><p>&#x8F93;&#x5165;&#x4F8B;&#x5B50;1:</p><blockquote>abaababaab</blockquote><p>&#x8F93;&#x51FA;&#x4F8B;&#x5B50;1:</p><blockquote>6</blockquote><pre><code class="js">var readline = require(&apos;readline&apos;);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on(&apos;line&apos;, function(line) {
  var str = line.trim();
  str = strWithoutLast(str);
  while(str.length){
    if(str.length &amp; 1 === 1){
      str = strWithoutLast(str);
    }
    if(isEvenStr(str)){
      console.log(str.length);
      break;
    } else {
      str = strWithoutLast(str);
    }
  }
  function isEvenStr(str){
    var len = str.length;
    var left = str.slice(0, len / 2);
    var right = str.slice(len / 2, len);
    return left === right;
  }
  function strWithoutLast(str){
    var len = str.length;
    return str.slice(0, len - 1);
  }
});</code></pre><h3>&#x5236;&#x9020;&#x56DE;&#x6587; (AC)</h3><p>&#x725B;&#x725B;&#x6709;&#x4E00;&#x4E9B;&#x5B57;&#x6BCD;&#x5361;&#x7247;,&#x6BCF;&#x5F20;&#x5361;&#x7247;&#x4E0A;&#x90FD;&#x6709;&#x4E00;&#x4E2A;&#x5C0F;&#x5199;&#x5B57;&#x6BCD;,&#x6240;&#x6709;&#x5361;&#x7247;&#x7EC4;&#x6210;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;s&#x3002;&#x725B;&#x725B;&#x4E00;&#x76F4;&#x8BA4;&#x4E3A;&#x56DE;&#x6587;&#x8FD9;&#x79CD;&#x6027;&#x8D28;&#x5341;&#x5206;&#x4F18;&#x96C5;,&#x4E8E;&#x662F;&#x725B;&#x725B;&#x5E0C;&#x671B;&#x7528;&#x8FD9;&#x4E9B;&#x5361;&#x7247;&#x62FC;&#x51D1;&#x51FA;&#x4E00;&#x4E9B;&#x56DE;&#x6587;&#x4E32;,&#x4F46;&#x662F;&#x6709;&#x4EE5;&#x4E0B;&#x8981;&#x6C42;:<br>1&#x3001;&#x6BCF;&#x5F20;&#x5361;&#x7247;&#x53EA;&#x80FD;&#x4F7F;&#x7528;&#x4E00;&#x6B21;<br>2&#x3001;&#x8981;&#x6C42;&#x6784;&#x6210;&#x7684;&#x56DE;&#x6587;&#x4E32;&#x7684;&#x6570;&#x91CF;&#x6700;&#x5C11;<br>&#x725B;&#x725B;&#x60F3;&#x77E5;&#x9053;&#x7528;&#x8FD9;&#x4E9B;&#x5B57;&#x6BCD;&#x5361;&#x7247;,&#x6700;&#x5C11;&#x80FD;&#x62FC;&#x51D1;&#x51FA;&#x591A;&#x5C11;&#x4E2A;&#x56DE;&#x6587;&#x4E32;&#x3002;<br>&#x4F8B;&#x5982;: s = &quot;abbaa&quot;,&#x8F93;&#x51FA;1,&#x56E0;&#x4E3A;&#x6700;&#x5C11;&#x53EF;&#x4EE5;&#x62FC;&#x51D1;&#x51FA;&quot;ababa&quot;&#x8FD9;&#x4E00;&#x4E2A;&#x56DE;&#x6587;&#x4E32;<br>s = &quot;abc&quot;, &#x8F93;&#x51FA;3,&#x56E0;&#x4E3A;&#x6700;&#x5C11;&#x53EA;&#x80FD;&#x62FC;&#x51D1;&#x51FA;&quot;a&quot;,&quot;b&quot;,&quot;c&quot;&#x8FD9;&#x4E09;&#x4E2A;&#x56DE;&#x6587;&#x4E32;</p><p>&#x8F93;&#x5165;&#x63CF;&#x8FF0;:<br>&#x8F93;&#x5165;&#x5305;&#x62EC;&#x4E00;&#x884C;,&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;s,&#x5B57;&#x7B26;&#x4E32;s&#x957F;&#x5EA6;length(1 &#x2264; length &#x2264; 1000).<br>s&#x4E2D;&#x6BCF;&#x4E2A;&#x5B57;&#x7B26;&#x90FD;&#x662F;&#x5C0F;&#x5199;&#x5B57;&#x6BCD;</p><p>&#x8F93;&#x51FA;&#x63CF;&#x8FF0;:<br>&#x8F93;&#x51FA;&#x4E00;&#x4E2A;&#x6574;&#x6570;,&#x5373;&#x6700;&#x5C11;&#x7684;&#x56DE;&#x6587;&#x4E32;&#x4E2A;&#x6570;&#x3002;</p><p>&#x8F93;&#x5165;&#x4F8B;&#x5B50;1:</p><blockquote>abc</blockquote><p>&#x8F93;&#x51FA;&#x4F8B;&#x5B50;1:</p><blockquote>3</blockquote><pre><code class="js">var readline = require(&apos;readline&apos;);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on(&apos;line&apos;, function(line) {
  var alpha = 26;
  var strArr = line.trim().split(&apos;&apos;);
  var arr = [];
  var odd = 0;
  while(alpha){arr.push(0); alpha--;}
  for(var i = 0, len = strArr.length; i &lt; len; i++){
    var index = strArr[i].charCodeAt(0) - 97;
    arr[index]++;
  }
  arr.forEach(function(item){
    if(item &amp; 1 === 1){
      odd++;
    }
  });
  console.log(odd);
});</code></pre><h3>&#x731C;&#x6570; (Memory out)</h3><p>&#x725B;&#x725B;&#x548C;&#x7F8A;&#x7F8A;&#x5728;&#x73A9;&#x4E00;&#x4E2A;&#x6709;&#x8DA3;&#x7684;&#x731C;&#x6570;&#x6E38;&#x620F;&#x3002;&#x5728;&#x8FD9;&#x4E2A;&#x6E38;&#x620F;&#x4E2D;,&#x725B;&#x725B;&#x73A9;&#x5BB6;&#x9009;&#x62E9;&#x4E00;&#x4E2A;&#x6B63;&#x6574;&#x6570;,&#x7F8A;&#x7F8A;&#x6839;&#x636E;&#x5DF2;&#x7ED9;&#x7684;&#x63D0;&#x793A;&#x731C;&#x8FD9;&#x4E2A;&#x6570;&#x5B57;&#x3002;&#x7B2C;i&#x4E2A;&#x63D0;&#x793A;&#x662F;&quot;Y&quot;&#x6216;&#x8005;&quot;N&quot;,&#x8868;&#x793A;&#x725B;&#x725B;&#x9009;&#x62E9;&#x7684;&#x6570;&#x662F;&#x5426;&#x662F;i&#x7684;&#x500D;&#x6570;&#x3002;<br>&#x4F8B;&#x5982;,&#x5982;&#x679C;&#x63D0;&#x793A;&#x662F;&quot;YYNYY&quot;,&#x5B83;&#x8868;&#x793A;&#x8FD9;&#x4E2A;&#x6570;&#x4F7F;1,2,4,5&#x7684;&#x500D;&#x6570;,&#x4F46;&#x4E0D;&#x662F;3&#x7684;&#x500D;&#x6570;&#x3002;<br>&#x6CE8;&#x610F;&#x5230;&#x4E00;&#x4E9B;&#x63D0;&#x793A;&#x4F1A;&#x51FA;&#x73B0;&#x9519;&#x8BEF;&#x3002;&#x4F8B;&#x5982;: &#x63D0;&#x793A;&quot;NYYY&quot;&#x662F;&#x9519;&#x8BEF;&#x7684;,&#x56E0;&#x4E3A;&#x6240;&#x6709;&#x7684;&#x6574;&#x6570;&#x90FD;&#x662F;1&#x7684;&#x500D;&#x6570;,&#x6240;&#x4EE5;&#x8D77;&#x59CB;&#x5143;&#x7D20;&#x80AF;&#x5B9A;&#x4E0D;&#x4F1A;&#x662F;&quot;N&quot;&#x3002;&#x6B64;&#x5916;,&#x4F8B;&#x5982;&quot;YNNY&quot;&#x7684;&#x63D0;&#x793A;&#x4E5F;&#x662F;&#x9519;&#x8BEF;&#x7684;,&#x56E0;&#x4E3A;&#x7ED3;&#x679C;&#x4E0D;&#x53EF;&#x80FD;&#x662F;4&#x7684;&#x500D;&#x6570;&#x4F46;&#x4E0D;&#x662F;2&#x7684;&#x500D;&#x6570;&#x3002;<br>&#x73B0;&#x5728;&#x7ED9;&#x51FA;&#x4E00;&#x4E2A;&#x6574;&#x6570;n,&#x8868;&#x793A;&#x5DF2;&#x7ED9;&#x7684;&#x63D0;&#x793A;&#x7684;&#x957F;&#x5EA6;&#x3002;&#x8BF7;&#x8BA1;&#x7B97;&#x51FA;&#x957F;&#x5EA6;&#x4E3A;n&#x7684;&#x5408;&#x6CD5;&#x7684;&#x63D0;&#x793A;&#x7684;&#x4E2A;&#x6570;&#x3002;<br>&#x4F8B;&#x5982; n = 5:<br>&#x5408;&#x6CD5;&#x7684;&#x63D0;&#x793A;&#x6709;:<br>YNNNN YNNNY YNYNN YNYNY YYNNN YYNNY<br>YYNYN YYNYY YYYNN YYYNY YYYYN YYYYY<br>&#x6240;&#x4EE5;&#x8F93;&#x51FA;12</p><p>&#x8F93;&#x5165;&#x63CF;&#x8FF0;:<br>&#x8F93;&#x5165;&#x5305;&#x62EC;&#x4E00;&#x4E2A;&#x6574;&#x6570;n(1 &#x2264; n &#x2264; 10^6),&#x8868;&#x793A;&#x5DF2;&#x7ED9;&#x63D0;&#x793A;&#x7684;&#x957F;&#x5EA6;&#x3002;</p><p>&#x8F93;&#x51FA;&#x63CF;&#x8FF0;:<br>&#x8F93;&#x51FA;&#x4E00;&#x4E2A;&#x6574;&#x6570;,&#x8868;&#x793A;&#x5408;&#x6CD5;&#x7684;&#x63D0;&#x793A;&#x4E2A;&#x6570;&#x3002;&#x56E0;&#x4E3A;&#x7B54;&#x6848;&#x53EF;&#x80FD;&#x4F1A;&#x5F88;&#x5927;,&#x6240;&#x4EE5;&#x8F93;&#x51FA;&#x5BF9;&#x4E8E;1000000007&#x7684;&#x6A21;</p><p>&#x8F93;&#x5165;&#x4F8B;&#x5B50;1:</p><blockquote>5</blockquote><p>&#x8F93;&#x51FA;&#x4F8B;&#x5B50;1:</p><blockquote>12</blockquote><pre><code class="js">var readline = require(&apos;readline&apos;);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.on(&apos;line&apos;, function(line) {
  var mod = 1000000007;
  var ans = 1;
  var n = parseInt(line.trim());
  var vis = [];
  debugger;
  for(var i = 2; i &lt;= n; i++){
    if(vis[i]) continue;
    for(var j = 2 * i; j &lt;= n; j += i){
        vis[j] = 1;
    }
    var tmp = n;
    var cnt = 0;
    while(tmp &gt;= i){
        tmp /= i;
        cnt++;
    }
    ans = ans * (cnt + 1) % mod;
  }
  console.log(ans);
});</code></pre><h3>DNA</h3><p>DNA&#x7247;&#x6BB5;<br>&#x65F6;&#x95F4;&#x9650;&#x5236;&#xFF1A;1&#x79D2;<br>&#x7A7A;&#x95F4;&#x9650;&#x5236;&#xFF1A;32768K<br>&#x725B;&#x725B;&#x4ECE;&#x751F;&#x7269;&#x79D1;&#x7814;&#x5DE5;&#x4F5C;&#x8005;&#x90A3;&#x91CC;&#x83B7;&#x5F97;&#x4E00;&#x6BB5;&#x5B57;&#x7B26;&#x4E32;&#x6570;&#x636E;s,&#x725B;&#x725B;&#x9700;&#x8981;&#x5E2E;&#x52A9;&#x79D1;&#x7814;&#x5DE5;&#x4F5C;&#x8005;&#x4ECE;&#x4E2D;&#x627E;&#x51FA;&#x6700;&#x957F;&#x7684;DNA&#x5E8F;&#x5217;&#x3002;DNA&#x5E8F;&#x5217;&#x6307;&#x7684;&#x662F;&#x5E8F;&#x5217;&#x4E2D;&#x53EA;&#x5305;&#x62EC;&apos;A&apos;,&apos;T&apos;,&apos;C&apos;,&apos;G&apos;&#x3002;&#x725B;&#x725B;&#x89C9;&#x5F97;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x592A;&#x7B80;&#x5355;&#x4E86;,&#x5C31;&#x628A;&#x95EE;&#x9898;&#x4EA4;&#x7ED9;&#x4F60;&#x6765;&#x89E3;&#x51B3;&#x3002;<br>&#x4F8B;&#x5982;: s = &quot;ABCBOATER&quot;&#x4E2D;&#x5305;&#x542B;&#x6700;&#x957F;&#x7684;DNA&#x7247;&#x6BB5;&#x662F;&quot;AT&quot;,&#x6240;&#x4EE5;&#x6700;&#x957F;&#x7684;&#x957F;&#x5EA6;&#x662F;2&#x3002;<br>&#x8F93;&#x5165;&#x63CF;&#x8FF0;:<br>&#x8F93;&#x5165;&#x5305;&#x62EC;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;s,&#x5B57;&#x7B26;&#x4E32;&#x957F;&#x5EA6;length(1 &#x2264; length &#x2264; 50),&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x53EA;&#x5305;&#x62EC;&#x5927;&#x5199;&#x5B57;&#x6BCD;(&apos;A&apos;~&apos;Z&apos;)&#x3002;</p><p>&#x8F93;&#x51FA;&#x63CF;&#x8FF0;:<br>&#x8F93;&#x51FA;&#x4E00;&#x4E2A;&#x6574;&#x6570;,&#x8868;&#x793A;&#x6700;&#x957F;&#x7684;DNA&#x7247;&#x6BB5;</p><p>&#x8F93;&#x5165;&#x4F8B;&#x5B50;1:<br>ABCBOATER</p><p>&#x8F93;&#x51FA;&#x4F8B;&#x5B50;1:<br>2</p><pre><code class="js">var readline = require(&apos;readline&apos;);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.on(&apos;line&apos;, function(line) {
  var str = line.trim();
  var len =  line.match(/[ATCG]*/g).reduce(function(a, b){
    return a &lt; b.length ? b.length : a;
  }, 0);
  console.log(len);
});</code></pre><h3>&#x5F69;&#x8272;&#x74F7;&#x7816;</h3><p>&#x725B;&#x725B;&#x559C;&#x6B22;&#x5F69;&#x8272;&#x7684;&#x4E1C;&#x897F;,&#x5C24;&#x5176;&#x662F;&#x5F69;&#x8272;&#x7684;&#x74F7;&#x7816;&#x3002;&#x725B;&#x725B;&#x7684;&#x623F;&#x95F4;&#x5185;&#x94FA;&#x6709;L&#x5757;&#x6B63;&#x65B9;&#x5F62;&#x74F7;&#x7816;&#x3002;&#x6BCF;&#x5757;&#x7816;&#x7684;&#x989C;&#x8272;&#x6709;&#x56DB;&#x79CD;&#x53EF;&#x80FD;:&#x7EA2;&#x3001;&#x7EFF;&#x3001;&#x84DD;&#x3001;&#x9EC4;&#x3002;&#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;S, &#x5982;&#x679C;S&#x7684;&#x7B2C;i&#x4E2A;&#x5B57;&#x7B26;&#x662F;&apos;R&apos;, &apos;G&apos;, &apos;B&apos;&#x6216;&apos;Y&apos;,&#x90A3;&#x4E48;&#x7B2C;i&#x5757;&#x74F7;&#x7816;&#x7684;&#x989C;&#x8272;&#x5C31;&#x5206;&#x522B;&#x662F;&#x7EA2;&#x3001;&#x7EFF;&#x3001;&#x84DD;&#x6216;&#x8005;&#x9EC4;&#x3002;<br>&#x725B;&#x725B;&#x51B3;&#x5B9A;&#x6362;&#x6389;&#x4E00;&#x4E9B;&#x74F7;&#x7816;&#x7684;&#x989C;&#x8272;,&#x4F7F;&#x5F97;&#x76F8;&#x90BB;&#x4E24;&#x5757;&#x74F7;&#x7816;&#x7684;&#x989C;&#x8272;&#x5747;&#x4E0D;&#x76F8;&#x540C;&#x3002;&#x8BF7;&#x5E2E;&#x725B;&#x725B;&#x8BA1;&#x7B97;&#x4ED6;&#x6700;&#x5C11;&#x9700;&#x8981;&#x6362;&#x6389;&#x7684;&#x74F7;&#x7816;&#x6570;&#x91CF;&#x3002;</p><p>&#x8F93;&#x5165;&#x63CF;&#x8FF0;:<br>&#x8F93;&#x5165;&#x5305;&#x62EC;&#x4E00;&#x884C;,&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;S,&#x5B57;&#x7B26;&#x4E32;&#x957F;&#x5EA6;length(1 &#x2264; length &#x2264; 10),&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x6BCF;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x90FD;&#x662F;&apos;R&apos;, &apos;G&apos;, &apos;B&apos;&#x6216;&#x8005;&apos;Y&apos;&#x3002;</p><p>&#x8F93;&#x51FA;&#x63CF;&#x8FF0;:<br>&#x8F93;&#x51FA;&#x4E00;&#x4E2A;&#x6574;&#x6570;,&#x8868;&#x793A;&#x725B;&#x725B;&#x6700;&#x5C11;&#x9700;&#x8981;&#x6362;&#x6389;&#x7684;&#x74F7;&#x7816;&#x6570;&#x91CF;</p><p>&#x8F93;&#x5165;&#x4F8B;&#x5B50;1:</p><blockquote>RRRRRR</blockquote><p>&#x8F93;&#x51FA;&#x4F8B;&#x5B50;1:</p><blockquote>3</blockquote><pre><code class="js">var readline = require(&apos;readline&apos;);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.on(&apos;line&apos;, function(line) {
  var str = line.trim();
  var arr = str.match(/([RGBY])\1+/g);
  var num = 0;
  if(arr){
    num = arr.reduce(function(a, b){
      return Math.floor(b.length / 2) + a;
    }, 0);
  }
  console.log(num);
});</code></pre>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
2017年校招全国统一模拟笔试(第五场)编程题集合(Javascript版)

## 原文链接
[https://segmentfault.com/a/1190000016256607](https://segmentfault.com/a/1190000016256607)

