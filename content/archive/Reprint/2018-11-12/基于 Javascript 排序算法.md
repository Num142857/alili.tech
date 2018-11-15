---
title: 基于 Javascript 排序算法
hidden: true
categories: reprint
slug: ec056943
date: 2018-11-12 02:30:05
---

{{< raw >}}
<p><strong>&#x5199;&#x5728;&#x524D;&#x9762;</strong></p><blockquote>&#x4E2A;&#x4EBA;&#x611F;&#x89C9;&#xFF1A;javascript&#x5BF9;&#x7C7B;&#x4F3C;&#x6392;&#x5E8F;&#x67E5;&#x627E;&#x8FD9;&#x6837;&#x7684;&#x529F;&#x80FD;&#x5DF2;&#x7ECF;&#x6709;&#x4E86;&#x5F88;&#x597D;&#x7684;&#x5C01;&#x88C5;&#xFF0C;&#x4EE5;&#x81F4;&#x4E8E;&#x5F53;&#x6211;&#x4EEC;&#x60F3;&#x5BF9;&#x6570;&#x7EC4;&#x6392;&#x5E8F;&#x7684;&#x65F6;&#x5019;&#x53EA;&#x9700;&#x8981;&#x8C03;&#x7528;<code>arr.sort()</code>&#x65B9;&#x6CD5;&#xFF0C;&#x800C;&#x67E5;&#x627E;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x4E5F;&#x53EA;&#x9700;&#x8981;&#x8C03;&#x7528;<code>indexOf()</code>&#x65B9;&#x6CD5;&#x6216;<code>lastIndexOf()</code>&#x65B9;&#x6CD5;&#xFF0C;&#x6211;&#x4EEC;&#x5FFD;&#x7565;&#x4E86;&#x5176;&#x5185;&#x90E8;&#x7684;&#x5B9E;&#x73B0;&#x3002;&#x800C;&#x4ECA;&#xFF0C;js&#x80FD;&#x5F00;&#x53D1;&#x7684;&#x9879;&#x76EE;&#x8D8A;&#x6765;&#x8D8A;&#x5E9E;&#x5927;&#xFF0C;&#x5BF9;&#x6027;&#x80FD;&#x548C;&#x6548;&#x7387;&#x8981;&#x6C42;&#x4E5F;&#x8D8A;&#x6765;&#x8D8A;&#x9AD8;&#xFF0C;&#x867D;&#x7136;&#x4F17;&#x591A;&#x7684;&#x5E93;&#x548C;&#x6846;&#x67B6;&#x4E5F;&#x53EF;&#x4EE5;&#x5E2E;&#x6211;&#x4EEC;&#x5E94;&#x4ED8;&#x8FD9;&#x4E9B;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x5C0F;&#x7F16;&#x89C9;&#x5F97;&#x6846;&#x67B6;&#x8FC7;&#x773C;&#x4E91;&#x70DF;&#xFF0C;&#x628A;&#x63E1;&#x7A0B;&#x5E8F;&#x5F00;&#x53D1;&#x7684;&#x57FA;&#x7840;&#xFF0C;&#x624D;&#x80FD;&#x5728;&#x98DE;&#x901F;&#x7684;&#x66F4;&#x65B0;&#x6362;&#x4EE3;&#x4E2D;&#x5E94;&#x5BF9;&#x81EA;&#x5982;&#x3002;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x4E0D;&#x59A8;&#x4E5F;&#x7814;&#x7A76;&#x4E00;&#x4E0B;&#x8FD9;&#x4E9B;&#x7B97;&#x6CD5;&#xFF0C;&#x5176;&#x4E2D;&#x7684;&#x601D;&#x8DEF;&#x6709;&#x52A9;&#x4E8E;&#x6211;&#x4EEC;&#x81EA;&#x8EAB;&#x7684;&#x63D0;&#x9AD8;&#x3002;</blockquote><p>&#x58F0;&#x660E;&#xFF1A;&#x672C;&#x6587;&#x7AE0;&#x4E2D;&#x7684;&#x90E8;&#x5206;&#x56FE;&#x7247;&#x6765;&#x81EA;&#x767E;&#x5EA6;&#x641C;&#x7D22;&#xFF0C;&#x5982;&#x4FB5;&#x5220;&#x3002;</p><h2>&#x5192;&#x6CE1;&#x6392;&#x5E8F;</h2><p>&#x8FD9;&#x4E2A;&#x662F;&#x6700;&#x7B80;&#x5355;&#x7684;&#x6392;&#x5E8F;&#xFF0C;&#x5C31;&#x50CF;&#x6C14;&#x6CE1;&#x4ECE;&#x6C34;&#x91CC;&#x5192;&#x51FA;&#x6765;&#x3002;<br>&#x5B83;&#x6BCF;&#x6267;&#x884C;&#x4E00;&#x6B21;&#x5916;&#x5C42;&#x5FAA;&#x73AF;&#xFF0C;&#x5C31;&#x4F1A;&#x5C06;&#x6700;&#x5C0F;&#x6570;&#xFF08;&#x6216;&#x6700;&#x5927;&#x7684;&#xFF09;&#x653E;&#x5230;&#x6570;&#x7EC4;&#x6700;&#x540E;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x5BFB;&#x627E;&#x5269;&#x4F59;&#x90E8;&#x5206;&#x7684;&#x6700;&#x5C0F;&#x6570;&#xFF08;&#x6216;&#x6700;&#x5927;&#x7684;&#xFF09;&#x653E;&#x5728;&#x8FD9;&#x4E00;&#x90E8;&#x5206;&#x7684;&#x6700;&#x540E;&#xFF0C;&#x4EE5;&#x6B64;&#x7C7B;&#x63A8;&#x3002;<br>&#x6BCF;&#x4E00;&#x4E2A;&#x5916;&#x5C42;&#x5FAA;&#x73AF;&#x7684;&#x8FC7;&#x7A0B;&#x53EF;&#x4EE5;&#x7528;&#x4E00;&#x4E0B;&#x56FE;&#x6765;&#x63CF;&#x8FF0;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016286792?w=572&amp;h=357" src="https://static.alili.tech/img/remote/1460000016286792?w=572&amp;h=357" alt="bubble" title="bubble"></span></p><p>&#x5192;&#x6CE1;&#x6392;&#x5E8F;&#x7684;&#x65F6;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#x4E3A;$O(n^2)$&#xFF0C;&#x7A7A;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#x4E3A;$O(1)$&#xFF0C;&#x5C5E;&#x4E8E; <strong>&#x7A33;&#x5B9A;</strong> &#x6392;&#x5E8F;&#x3002;&#x9002;&#x7528;&#x4E8E;&#x6570;&#x636E;&#x6BD4;&#x8F83;&#x5C11;&#x6216;&#x57FA;&#x672C;&#x6709;&#x5E8F;&#x7684;&#x60C5;&#x51B5;&#x3002;</p><pre><code class="javascript">//&#x5192;&#x6CE1;&#x6392;&#x5E8F;
bubbleSort = function(arr){
  var len = arr.length;
  for (var i = 0; i &lt; len; i++){
    for (var j = 0; j &lt; len - i - 1; j++){
      if (arr[j] &gt; arr[j + 1])
        [arr[j + 1], arr[j]] = [arr[j],arr[j + 1]];
    }
  }
}</code></pre><h2>&#x9009;&#x62E9;&#x6392;&#x5E8F;</h2><p>&#x9009;&#x62E9;&#x6392;&#x5E8F;&#x4E5F;&#x5F88;&#x7B80;&#x5355;&#x3002;&#x5B83;&#x6BCF;&#x4E00;&#x6B21;&#x4ECE;&#x5F85;&#x6392;&#x5E8F;&#x7684;&#x6570;&#x636E;&#x5143;&#x7D20;&#x4E2D;&#x9009;&#x51FA;&#x6700;&#x5C0F;&#xFF08;&#x6216;&#x6700;&#x5927;&#xFF09;&#x7684;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5B58;&#x653E;&#x5728;&#x5E8F;&#x5217;&#x7684;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;&#xFF0C;&#x76F4;&#x5230;&#x5168;&#x90E8;&#x5F85;&#x6392;&#x5E8F;&#x7684;&#x6570;&#x636E;&#x5143;&#x7D20;&#x6392;&#x5B8C;&#x3002;&#x4E0B;&#x9762;&#x662F;&#x5B8C;&#x6574;&#x7684;&#x9009;&#x62E9;&#x6392;&#x5E8F;&#x8FC7;&#x7A0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016286793?w=1140&amp;h=534" src="https://static.alili.tech/img/remote/1460000016286793?w=1140&amp;h=534" alt="selection" title="selection"></span></p><p>&#x9009;&#x62E9;&#x6392;&#x5E8F;&#x7684;&#x65F6;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#x4E3A;$O(n^2)$&#xFF0C;&#x7A7A;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#x4E3A;$O(1)$&#xFF0C;&#x5C5E;&#x4E8E; <strong>&#x7A33;&#x5B9A;</strong> &#x6392;&#x5E8F;&#x3002;&#x9002;&#x7528;&#x4E8E;&#x6570;&#x636E;&#x6BD4;&#x8F83;&#x5C11;&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x7EFC;&#x5408;&#x5404;&#x79CD;&#x60C5;&#x51B5;&#x6765;&#x8BB2;&#x8FD8;&#x662F;&#x8FD9;&#x4E2A;&#x6700;&#x6162;&#x3002;</p><pre><code class="javascript">//&#x9009;&#x62E9;&#x6392;&#x5E8F;
 selectionSort = function(arr){
  var len = arr.length;
  var min, min_index;//min&#x6BCF;&#x6B21;&#x627E;&#x5230;&#x7684;&#x6700;&#x5C0F;&#x503C;&#xFF0C;min_index&#x6700;&#x5C0F;&#x503C;&#x5728;&#x65E0;&#x5E8F;&#x5E8F;&#x5217;&#x7684;&#x4F4D;&#x7F6E;
  for (var i = 0; i &lt; len - 1; i++){
    min = arr[i];
    for (var j = i + 1; j &lt; len; j++){//&#x627E;&#x5230;&#x6700;&#x5C0F;&#x503C;
      if (arr[j] &lt; min){
        min = arr[j];//&#x627E;&#x5230;&#x7684;&#x6700;&#x5C0F;&#x503C;
        min_index = j;//&#x627E;&#x5230;&#x7684;&#x6700;&#x5C0F;&#x503C;&#x7D22;&#x5F15;
      }
    }
    if (min != arr[i])
      [arr[min_index], arr[i]] = [arr[i], arr[min_index]];
  }
}</code></pre><h2>&#x63D2;&#x5165;&#x6392;&#x5E8F;</h2><p>&#x8FD9;&#x4E2A;&#x8981;&#x7565;&#x5FAE;&#x590D;&#x6742;&#x4E00;&#x70B9;&#x4E86;&#x3002;&#x5B83;&#x7684;&#x601D;&#x8DEF;&#x5C31;&#x662F;&#x5C06;&#x4E00;&#x4E2A;&#x6570;&#x636E;&#x63D2;&#x5165;&#x5230;&#x5DF2;&#x7ECF;&#x6392;&#x597D;&#x5E8F;&#x7684;&#x6709;&#x5E8F;&#x6570;&#x636E;&#x4E2D;&#xFF0C;&#x4F9D;&#x7136;&#x4FDD;&#x6301;&#x6709;&#x5E8F;&#x3002;&#x5B9E;&#x73B0;&#x8FC7;&#x7A0B;&#x628A;&#x6570;&#x7EC4;&#x770B;&#x4F5C;2&#x90E8;&#x5206;&#xFF0C;&#x4E00;&#x90E8;&#x5206;&#x662F;&#x6709;&#x5E8F;&#x7684;&#xFF0C;&#x4E00;&#x90E8;&#x5206;&#x662F;&#x65E0;&#x5E8F;&#x7684;&#xFF0C;&#x6BCF;&#x6B21;&#x5927;&#x5FAA;&#x73AF;&#x5C06;&#x65E0;&#x5E8F;&#x6570;&#x7EC4;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x63D2;&#x5165;&#x5230;&#x6709;&#x5E8F;&#x7684;&#x6570;&#x7EC4;&#x4E2D;&#x3002;<br><span class="img-wrap"><img data-src="/img/remote/1460000016286794?w=498&amp;h=209" src="https://static.alili.tech/img/remote/1460000016286794?w=498&amp;h=209" alt="insertion" title="insertion"></span></p><p>&#x63D2;&#x5165;&#x6392;&#x5E8F;&#x65F6;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#x4E3A;$O(n^2)$&#xFF0C;&#x7A7A;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#x4E3A;$O(1)$&#xFF0C;&#x5C5E;&#x4E8E; <strong>&#x7A33;&#x5B9A;</strong> &#x6392;&#x5E8F;&#x3002;&#x7B97;&#x6CD5;&#x9002;&#x7528;&#x4E8E;&#x5C11;&#x91CF;&#x6570;&#x636E;&#x7684;&#x6392;&#x5E8F;&#x3002;</p><p>&#x6CE8;&#xFF1A;&#x4E8C;&#x5206;&#x63D2;&#x5165;&#x548C;&#x76F4;&#x63A5;&#x63D2;&#x5165;&#x5404;&#x79CD;&#x60C5;&#x51B5;&#x590D;&#x6742;&#x5EA6;&#x4E00;&#x6837;</p><pre><code class="javascript">//&#x76F4;&#x63A5;&#x63D2;&#x5165;&#x6392;&#x5E8F;
insertionSort = function (arr){
  var len = arr.length;
  var temp;//temp&#x6BCF;&#x6B21;&#x8981;&#x6267;&#x884C;&#x63D2;&#x5165;&#x7684;&#x503C;
  var index;//index&#x63D2;&#x5165;&#x503C;&#x5728;&#x6709;&#x5E8F;&#x5E8F;&#x5217;&#x7684;&#x4F4D;&#x7F6E;
  for (var i = 1; i &lt; len; i++){
    temp = arr[i];
    for (var j = 0; j &lt; i; j++){//&#x627E;&#x5230;&#x63D2;&#x5165;&#x4F4D;&#x7F6E;
      index = i;
      if (arr[j] &gt; temp){
        index = j;//&#x627E;&#x5230;&#x7684;&#x63D2;&#x5165;&#x70B9;&#x7D22;&#x5F15;
        break;
      }
    }
    if (i != index){
      for (var j = i; j &gt; index; j--)//&#x63D2;&#x5165;&#x8BE5;&#x503C;
        [arr[j - 1], arr[j]] = [arr[j],arr[j - 1]];
    }
    arr[index] = temp;
  }
}</code></pre><h2>&#x5FEB;&#x901F;&#x6392;&#x5E8F;</h2><p>&#x8FD9;&#x4E2A;&#x60F3;&#x5FC5;&#x5927;&#x5BB6;&#x90FD;&#x8033;&#x719F;&#x80FD;&#x8BE6;&#xFF0C;20&#x4E16;&#x7EAA;&#x5341;&#x5927;&#x7ECF;&#x5178;&#x7B97;&#x6CD5;&#x4E4B;&#x4E00;&#x3002;&#x4E3B;&#x8981;&#x539F;&#x56E0;&#x8FD8;&#x662F;&#x5B83;&#x6781;&#x5927;&#x7684;&#x63A8;&#x52A8;&#x4E86;&#x4FE1;&#x606F;&#x6280;&#x672F;&#x7684;&#x53D1;&#x5C55;&#xFF0C;&#x53EF;&#x60DC;&#x5B83;&#x4E0D;&#x662F;&#x7A33;&#x5B9A;&#x7B97;&#x6CD5;&#x3002;<br>&#x8FD9;&#x4E2A;&#x7B97;&#x6CD5;&#x6BD4;&#x8F83;&#x5C31;&#x6BD4;&#x8F83;&#x96BE;&#x7406;&#x89E3;&#x4E86;&#xFF0C;&#x5B83;&#x901A;&#x8FC7;&#x4E00;&#x8D9F;&#x6392;&#x5E8F;&#x5C06;&#x8981;&#x6392;&#x5E8F;&#x7684;&#x6570;&#x636E;&#x5206;&#x5272;&#x6210;&#x72EC;&#x7ACB;&#x7684;&#x4E24;&#x90E8;&#x5206;&#xFF0C;&#x5176;&#x4E2D;&#x4E00;&#x90E8;&#x5206;&#x7684;&#x6240;&#x6709;&#x6570;&#x636E;&#x90FD;&#x6BD4;&#x53E6;&#x5916;&#x4E00;&#x90E8;&#x5206;&#x7684;&#x4EFB;&#x4E00;&#x6570;&#x636E;&#x90FD;&#x8981;&#x5C0F;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x6309;&#x6B64;&#x65B9;&#x6CD5;&#x5BF9;&#x8FD9;&#x4E24;&#x90E8;&#x5206;&#x6570;&#x636E;&#x5206;&#x522B;&#x8FDB;&#x884C;&#x5FEB;&#x901F;&#x6392;&#x5E8F;&#xFF0C;&#x6574;&#x4E2A;&#x6392;&#x5E8F;&#x8FC7;&#x7A0B;&#x53EF;&#x4EE5;&#x9012;&#x5F52;&#x8FDB;&#x884C;&#xFF0C;&#x4EE5;&#x6B64;&#x8FBE;&#x5230;&#x6574;&#x4E2A;&#x6570;&#x636E;&#x53D8;&#x6210;&#x6709;&#x5E8F;&#x5E8F;&#x5217;&#x3002;&#x8FD9;&#x91CC;&#x9762;&#x5305;&#x542B;&#x7684;&#x5206;&#x6CBB;&#x7684;&#x601D;&#x60F3;&#x3002;<br>&#x4E0B;&#x9762;&#x4E00;&#x4E2A;&#x56FE;&#x8868;&#x73B0;&#x4E86;&#x51FD;&#x6570;&#x7684;&#x4E00;&#x6B21;&#x6267;&#x884C;&#x8FC7;&#x7A0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016286795" src="https://static.alili.tech/img/remote/1460000016286795" alt="quick1" title="quick1"></span></p><p>&#x800C;&#x8FD9;&#x4E2A;&#x56FE;&#x8868;&#x73B0;&#x4E86;&#x6574;&#x4E2A;&#x6392;&#x5E8F;&#x8FC7;&#x7A0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016286796" src="https://static.alili.tech/img/remote/1460000016286796" alt="quick2" title="quick2"></span></p><p>&#x63D2;&#x5165;&#x6392;&#x5E8F;&#x65F6;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#x4E3A;$O(nlogn)$&#xFF0C;&#x7A7A;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#x4E3A;$O(logn)$&#xFF0C;&#x5C5E;&#x4E8E; <strong>&#x4E0D;&#x7A33;&#x5B9A;</strong> &#x6392;&#x5E8F;&#x3002;</p><pre><code class="javascript">////&#x5FEB;&#x901F;&#x6392;&#x5E8F;(&#x524D;&#x8F74;&#xFF09;
function quickSort(arr){
  qSort(0, arr.length - 1);
  return arr;

  function qSort(left, right){
    if (left &gt;= right)//&#x4E24;&#x4E2A;&#x6570;&#x76F8;&#x9047;&#x5219;&#x7ED3;&#x675F;&#x8BE5;&#x8F6E;&#x6392;&#x5E8F;
      return;
    var key = arr[left];//&#x53D6;&#x6700;&#x5DE6;&#x8FB9;&#x7684;&#x5143;&#x7D20;&#x4F5C;&#x4E3A;&#x6807;&#x8BC6;&#x6570;
    var i = left;
    var j = right;
    while (i != j){//&#x4E24;&#x4E2A;&#x6570;&#x76F8;&#x9047;&#x5219;&#x7ED3;&#x675F;&#x8BE5;&#x8F6E;&#x6392;&#x5E8F;
      while (i != j &amp;&amp; arr[j] &gt;= key) j--;//j&#x524D;&#x79FB;
      [arr[j], arr[i]] = [arr[i], arr[j]];
      while (i != j &amp;&amp; arr[i] &lt;= key) i++;//i&#x540E;&#x79FB;
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    qSort(left, j - 1);//&#x5BF9;&#x6807;&#x8BC6;&#x6570;&#x524D;&#x9762;&#x7684;&#x6570;&#x7EE7;&#x7EED;&#x8BE5;&#x65B9;&#x6CD5;&#x6392;&#x5E8F;
    qSort(j + 1, right);//&#x5BF9;&#x6807;&#x8BC6;&#x6570;&#x540E;&#x9762;&#x7684;&#x6570;&#x7EE7;&#x7EED;&#x8BE5;&#x65B9;&#x6CD5;&#x6392;&#x5E8F;
  }
}</code></pre><p><em>&#x8FD9;&#x91CC;&#x8865;&#x5145;&#x4E00;&#x4E0B;&#xFF1A;&#x5FEB;&#x901F;&#x6392;&#x5E8F;&#x7531;&#x4E8E;&#x5176;&#x5B9E;&#x8F74;&#x7684;&#x9009;&#x62E9;&#x4E0D;&#x540C;&#xFF0C;&#x5206;&#x4E3A;&#x524D;&#x8F74;&#x3001;&#x4E2D;&#x8F74;&#x3001;&#x540E;&#x8F74;&#x5FEB;&#x901F;&#x6392;&#x5E8F;&#xFF0C;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x662F;&#x524D;&#x8F74;&#x5FEB;&#x901F;&#x6392;&#x5E8F;&#xFF0C;&#x4E0B;&#x6587;&#x6BD4;&#x8F83;&#x7B97;&#x6CD5;&#x7684;&#x65F6;&#x5019;&#x4E5F;&#x624D;&#x7528;&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#x3002;&#x4E0D;&#x8FC7;&#xFF0C;&#x8FD9;&#x91CC;&#x8865;&#x5145;&#x53E6;&#x5916;2&#x79CD;&#x4EE3;&#x7801;&#xFF1A;</em></p><pre><code class="javascript">//&#x4E2D;&#x8F74;&#x5FEB;&#x901F;&#x6392;&#x5E8F;
function quickSortM(arr){
  qSort(0, arr.length - 1);
  return arr;

  function qSort(left, right){
    if (left &lt; right){
      var index = Math.floor((left + right) / 2);
      var key = arr[index];
      var i = left - 1;
      var j = right + 1;
      while (true){
        while (arr[++i] &lt; key); // &#x5411;&#x53F3;&#x627E;&#x5927;&#x4E8E;&#x8F74;&#x7684;&#x6570;
        while (arr[--j] &gt; key); // &#x5411;&#x5DE6;&#x627E;&#x5C0F;&#x4E8E;&#x8F74;&#x7684;&#x6570;
        if (i &gt;= j)//&#x4E24;&#x7D22;&#x5F15;&#x76F8;&#x540C;&#x7ED3;&#x675F;&#x6392;&#x5E8F;
          break;
        [arr[i], arr[j]] = [arr[j],arr[i]];//&#x4EA4;&#x6362;&#x627E;&#x5230;&#x7684;&#x6570;
      }
      qSort(left, i - 1); // &#x7EE7;&#x7EED;&#x8FD9;&#x6837;&#x5BF9;&#x8F74;&#x524D;&#x9762;&#x7684;&#x6392;&#x5E8F;
      qSort(j + 1, right); // &#x7EE7;&#x7EED;&#x8FD9;&#x6837;&#x5BF9;&#x8F74;&#x540E;&#x9762;&#x7684;&#x6392;&#x5E8F;
    }
  }
}

//&#x540E;&#x8F74;&#x5FEB;&#x901F;&#x6392;&#x5E8F;
function quickSortB(arr){
  qSort(0, arr.length - 1);
  return arr;

  function qSort(left, right){
    if (left &gt;= right)//&#x4E24;&#x7D22;&#x5F15;&#x76F8;&#x540C;&#x7ED3;&#x675F;&#x6392;&#x5E8F;
      return;
    var key = arr[right];
    var i = left - 1;//s&#x662F;&#x6700;&#x53F3;&#x8FB9;&#x7684;&#x8F74;
    for (var j = left; j &lt; right; j++){ //&#x5C06;&#x6570;&#x636E;&#x5206;&#x6210;&#x5927;&#x4E8E;&#x8F74;&#x548C;&#x5C0F;&#x4E8E;&#x8F74;&#x4E24;&#x90E8;&#x5206;
      if (arr[j] &lt;= key){
        i++;
        [arr[i], arr[j]] = [arr[j],arr[i]];
      }
    }
    i++;
    [arr[right], arr[i]] = [arr[i],arr[right]];//&#x5C06;&#x8F74;&#x63D2;&#x5165;&#x5230;&#x5927;&#x4E8E;&#x8F74;&#x548C;&#x5C0F;&#x4E8E;&#x8F74;&#x4E24;&#x90E8;&#x5206;&#x7684;&#x4E2D;&#x95F4;
    qSort(left, i - 1);//&#x7EE7;&#x7EED;&#x8FD9;&#x6837;&#x5BF9;&#x8F74;&#x524D;&#x9762;&#x7684;&#x6392;&#x5E8F;
    qSort(i, right);//&#x7EE7;&#x7EED;&#x8FD9;&#x6837;&#x5BF9;&#x8F74;&#x540E;&#x9762;&#x7684;&#x6392;&#x5E8F;
  }
}</code></pre><h2>&#x5F52;&#x5E76;&#x6392;&#x5E8F;</h2><p>&#x8FD9;&#x4E2A;&#x6392;&#x5E8F;&#x5728;&#x5C0F;&#x7F16;&#x773C;&#x91CC;&#x7528;&#x7684;&#x662F;&#x6700;&#x5E7F;&#x6CDB;&#x7684;&#xFF0C;&#x5F88;&#x591A;&#x51FD;&#x6570;&#x5C01;&#x88C5;&#x5185;&#x90E8;&#x90FD;&#x624D;&#x7528;&#x8FD9;&#x4E2A;&#x6392;&#x5E8F;&#xFF0C;&#x5305;&#x62EC;&#x6570;&#x636E;&#x5E93;&#x5728;&#x5185;&#x7684;&#x6392;&#x5E8F;&#x4E5F;&#x91C7;&#x7528;&#x4E86;&#x5F52;&#x5E76;&#x6392;&#x5E8F;&#x6216;&#x7EA2;&#x9ED1;&#x6811;&#x7684;&#x5F62;&#x5F0F;&#x3002;&#x8FD9;&#x4E2A;&#x6392;&#x5E8F;&#x4E5F;&#x7528;&#x5230;&#x4E86;&#x5206;&#x6CBB;&#x7684;&#x601D;&#x60F3;&#xFF1A;&#x5B83;&#x5C06;&#x4E00;&#x4E2A;&#x5E8F;&#x5217;&#x9010;&#x7EA7;&#x62C6;&#x5206;&#x6210;&#x5C0F;&#x5E8F;&#x5217;&#xFF0C;&#x5C06;&#x5C0F;&#x5E8F;&#x5217;&#x6392;&#x5E8F;&#x540E;&#x5408;&#x5E76;&#xFF0C;&#x5F97;&#x5230;&#x5B8C;&#x5168;&#x6709;&#x5E8F;&#x7684;&#x5E8F;&#x5217;&#x3002;&#x82E5;&#x6BCF;&#x6B21;&#x5C06;&#x5E8F;&#x5217;&#x5206;&#x6210;2&#x4E2A;&#x5B50;&#x5E8F;&#x5217;&#xFF0C;&#x518D;&#x4F9D;&#x6B64;&#x5408;&#x5E76;&#xFF0C;&#x79F0;&#x4E3A;&#x4E8C;&#x8DEF;&#x5F52;&#x5E76;&#x3002;<br>&#x6CA1;&#x7406;&#x89E3;&#xFF1F;&#x770B;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016286797?w=546&amp;h=417" src="https://static.alili.tech/img/remote/1460000016286797?w=546&amp;h=417" alt="merge" title="merge"></span></p><p>&#x63D2;&#x5165;&#x6392;&#x5E8F;&#x65F6;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#x4E3A;$O(nlogn)$&#xFF0C;&#x7A7A;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#x4E3A;$O(n)$&#xFF0C;&#x5C5E;&#x4E8E; <strong>&#x7A33;&#x5B9A;</strong> &#x6392;&#x5E8F;&#x3002;</p><pre><code class="javascript">//&#x5F52;&#x5E76;&#x6392;&#x5E8F;
function mergeSort(arr){
  var temp = [];
  merge(0, arr.length - 1);
  return arr;

  function merge(left, right){//temp&#x662F;&#x4E34;&#x65F6;&#x7A7A;&#x95F4;&#xFF0C;&#x5B58;&#x653E;&#x6392;&#x5E8F;&#x8FC7;&#x7A0B;&#x4E2D;&#x95F4;&#x7ED3;&#x679C;
    var mid;//&#x8BE5;&#x90E8;&#x5206;&#x4E2D;&#x95F4;&#x4F4D;&#x7F6E;
    if (left &gt;= right)//&#x5206;&#x7EC4;&#x5C0F;&#x4E8E;&#x7B49;&#x4E8E;1&#x65F6;&#x5F52;&#x5E76;&#x7ED3;&#x675F;
      return;
    mid = Math.floor((left + right) / 2);
    merge(left, mid);//&#x5BF9;&#x4E2D;&#x95F4;&#x4F4D;&#x7F6E;&#x4E4B;&#x524D;&#x90E8;&#x5206;&#x7EE7;&#x7EED;&#x8BE5;&#x65B9;&#x6CD5;&#x6392;&#x5E8F;
    merge(mid + 1, right);//&#x5BF9;&#x4E2D;&#x95F4;&#x4F4D;&#x7F6E;&#x4E4B;&#x540E;&#x90E8;&#x5206;&#x7EE7;&#x7EED;&#x8BE5;&#x65B9;&#x6CD5;&#x6392;&#x5E8F;
    var i = left, j = mid + 1, k = left;
    while (i != mid + 1 &amp;&amp; j != right + 1)//&#x6BD4;&#x8F83;&#x4E24;&#x90E8;&#x5206;&#x6BCF;&#x4E2A;&#x503C;&#xFF0C;&#x628A;&#x8F83;&#x5C0F;&#x7684;&#x653E;&#x5165;temp&#x4E2D;&#xFF0C;&#x5E76;&#x540E;&#x79FB;&#x8BE5;&#x6307;&#x9488;&#xFF0C;&#x76F4;&#x5230;&#x67D0;&#x90E8;&#x5206;&#x5168;&#x90E8;&#x904D;&#x5386;
      temp[k++] = arr[i] &lt; arr[j] ? arr[i++] : arr[j++];
    //&#x5C06;&#x672A;&#x5168;&#x90E8;&#x904D;&#x5386;&#x90E8;&#x5206;&#x6570;&#x636E;&#x987A;&#x6B21;&#x653E;&#x5165;temp&#x4E2D;
    while (i != mid + 1)
      temp[k++] = arr[i++];
    while (j != right + 1)
      temp[k++] = arr[j++];
    //&#x5C06;temp&#x590D;&#x5236;&#x4F1A;a&#x4E2D;
    for (i = left; i &lt;= right; i++)
      arr[i] = temp[i];
  }
}</code></pre><h2>&#x5E0C;&#x5C14;&#x6392;&#x5E8F;</h2><p>&#x8FD9;&#x662F;&#x60DF;&#x4E00;&#x4E00;&#x4E2A;&#x7528;&#x4EBA;&#x540D;&#x547D;&#x540D;&#x7684;&#x6392;&#x5E8F;&#x7B97;&#x6CD5;&#x3002;&#x5B83;&#x628A;&#x6570;&#x636E;&#x6309;&#x4E0B;&#x6807;&#x7684;&#x4E00;&#x5B9A;&#x589E;&#x91CF;&#x5206;&#x7EC4;&#xFF0C;&#x5BF9;&#x6BCF;&#x7EC4;&#x4F7F;&#x7528;&#x76F4;&#x63A5;&#x63D2;&#x5165;&#x6392;&#x5E8F;&#x7B97;&#x6CD5;&#x6392;&#x5E8F;&#xFF1B;&#x968F;&#x7740;&#x589E;&#x91CF;&#x9010;&#x6E10;&#x51CF;&#x5C11;&#xFF0C;&#x6BCF;&#x7EC4;&#x5305;&#x542B;&#x7684;&#x5173;&#x952E;&#x8BCD;&#x8D8A;&#x6765;&#x8D8A;&#x591A;&#xFF0C;&#x5F53;&#x589E;&#x91CF;&#x51CF;&#x81F3;1&#x65F6;&#xFF0C;&#x6574;&#x4E2A;&#x6587;&#x4EF6;&#x6070;&#x88AB;&#x5206;&#x6210;&#x4E00;&#x7EC4;&#xFF0C;&#x7B97;&#x6CD5;&#x4FBF;&#x7EC8;&#x6B62;&#x3002;<br>&#x8FD9;&#x4E2A;&#x4F30;&#x8BA1;&#x6700;&#x4E0D;&#x597D;&#x7406;&#x89E3;&#x4E86;&#xFF0C;&#x770B;&#x770B;&#x56FE;&#x5427;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016286798?w=480&amp;h=469" src="https://static.alili.tech/img/remote/1460000016286798?w=480&amp;h=469" alt="shell" title="shell"></span></p><p>&#x5E0C;&#x5C14;&#x6392;&#x5E8F;&#x65F6;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#x4E3A;$O(n^\frac1{3})$&#xFF0C;&#x7A7A;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#x4E3A;$O(1)$&#xFF0C;&#x5C5E;&#x4E8E; <strong>&#x4E0D;&#x7A33;&#x5B9A;</strong> &#x6392;&#x5E8F;&#x3002;</p><pre><code>//&#x5E0C;&#x5C14;&#x6392;&#x5E8F;
shellSort = function(arr){
  var len = arr.length;
  var index = Math.floor(len / 2);//&#x5F97;&#x5230;&#x6BD4;&#x8F83;&#x6B65;&#x957F;
  var j, temp;
  while (index &gt; 0){
    for (var i = index; i &lt; len; i++){//&#x904D;&#x5386;&#x8D77;&#x70B9;&#x540E;&#x79FB;&#xFF0C;&#x4FDD;&#x8BC1;&#x6BCF;&#x4E2A;&#x6570;&#x5728;&#x8BE5;&#x6B65;&#x957F;&#x4E0B;&#x53C2;&#x4E0E;&#x4E14;&#x53EA;&#x53C2;&#x4E0E;1&#x6B64;&#x6392;&#x5E8F;
      temp = arr[i];
      for (j = i; j &gt;= index &amp;&amp; arr[j - index] &gt; temp;){//&#x7B49;&#x6B65;&#x957F;&#x6570;&#x5217;&#x6267;&#x884C;&#x63D2;&#x5165;&#x6392;&#x5E8F;
        arr[j] = arr[j - index];
        j -= index;
        arr[j] = temp;
      }
    }
    index = Math.floor(index / 2);//&#x6B65;&#x957F;&#x51CF;&#x534A;
  }
}</code></pre><h2>&#x5806;&#x6392;&#x5E8F;</h2><p>&#x9996;&#x5148;&#x8BF4;&#x4E00;&#x4E0B;&#x4E00;&#x4E2A;&#x540D;&#x8BCD;&#xFF1A;&#x5927;&#x6839;&#x5806;&#x3002;&#x5927;&#x6839;&#x5806;&#x7684;&#x8981;&#x6C42;&#x662F;&#x6BCF;&#x4E2A;&#x8282;&#x70B9;&#x7684;&#x503C;&#x90FD;&#x4E0D;&#x5927;&#x4E8E;&#x5176;&#x7236;&#x8282;&#x70B9;&#x7684;&#x503C;&#xFF0C;&#x5373;$A[PARENT[i]] \geq A[i]$&#xFF0C; &#x5C5E;&#x4E8E;&#x5B8C;&#x5168;&#x4E8C;&#x53C9;&#x6811;&#x3002;<br>&#x6839;&#x636E;&#x5927;&#x6839;&#x5806;&#x7684;&#x8981;&#x6C42;&#x53EF;&#x77E5;&#xFF0C;&#x6700;&#x5927;&#x7684;&#x503C;&#x4E00;&#x5B9A;&#x5728;&#x5806;&#x9876;&#xFF0C;&#x6839;&#x636E;&#x5176;&#x7279;&#x70B9;&#xFF0C;&#x5982;&#x679C;&#x8981;&#x6C42;&#x6BCF;&#x4E2A;&#x8282;&#x70B9;&#x7684;&#x5DE6;&#x5B69;&#x5B50;&#x5C0F;&#x4E8E;&#x53F3;&#x5B69;&#x5B50;&#xFF0C;&#x5F97;&#x5230;&#x7684;&#x5C31;&#x662F;&#x6570;&#x636E;&#x4ECE;&#x5C0F;&#x5230;&#x5927;&#x7684;&#x6392;&#x5217;&#x3002;&#x53CD;&#x4E4B;&#x4ECE;&#x5927;&#x5230;&#x5C0F;&#x6392;&#x5217;&#x5E94;&#x8BE5;&#x4F7F;&#x7528;&#x5C0F;&#x6839;&#x5806;&#x3002;<br>&#x5982;&#x679C;&#x4F60;&#x5BF9;&#x4E8C;&#x53C9;&#x6811;&#x719F;&#x6089;&#x7684;&#x8BDD;&#xFF0C;&#x53EF;&#x4EE5;&#x7B80;&#x5355;&#x7528;&#x56FE;&#x7406;&#x89E3;&#x4E00;&#x4E0B;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016286799?w=454&amp;h=511" src="https://static.alili.tech/img/remote/1460000016286799?w=454&amp;h=511" alt="heap" title="heap"></span></p><p>&#x5806;&#x6392;&#x5E8F;&#x65F6;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#x4E3A;$O(nlogn)$&#xFF0C;&#x7A7A;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#x4E3A;$O(1)$&#xFF0C;&#x5C5E;&#x4E8E; <strong>&#x4E0D;&#x7A33;&#x5B9A;</strong> &#x6392;&#x5E8F;&#x3002;<br>&#x4E0B;&#x9762;&#x5229;&#x7528;&#x6570;&#x7EC4;&#x5FEB;&#x901F;&#x5B9A;&#x4F4D;&#x6307;&#x5B9A;&#x7D22;&#x5F15;&#x7684;&#x5143;&#x7D20;&#x6A21;&#x62DF;&#x5806;&#x64CD;&#x4F5C;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x5B9E;&#x9645;&#x5EFA;&#x7ACB;&#x4E8C;&#x53C9;&#x6811;&#x3002;</p><pre><code class="javascript">//&#x5806;&#x6392;&#x5E8F;
heapSort = function(arr){
  var len = arr.length;
  for (var i = len / 2 - 1; i &gt;= 0; i--)//&#x53CD;&#x5411;&#x904D;&#x5386;&#x6570;&#x7EC4;&#xFF0C;&#x5C06;&#x6570;&#x7EC4;&#x8C03;&#x6574;&#x4E3A;&#x5927;&#x6839;&#x5806;
    heapAdjust(arr, i, len);
  for (var i = len - 1; i &gt; 0; i--){
    [arr[0], arr[i]] = [arr[i], arr[0]];//&#x5C06;&#x65E0;&#x9700;&#x90E8;&#x5206;&#x6700;&#x5927;&#x6570;&#x653E;&#x5728;&#x6700;&#x540E;&#xFF0C;&#x5373;&#x6784;&#x6210;&#x6709;&#x5E8F;&#x90E8;&#x5206;
    heapAdjust(arr, 0, i);//&#x5C06;&#x5269;&#x4F59;&#x65E0;&#x9700;&#x90E8;&#x5206;&#x8C03;&#x6574;&#x4E3A;&#x5927;&#x6839;&#x5806;&#xFF0C;&#x76F4;&#x5230;&#x8BE5;&#x90E8;&#x5206;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x4E3A;&#x6B62;
  }
  return arr;

  function heapAdjust(arr, i, len){//&#x4E8C;&#x53C9;&#x5806;&#x8C03;&#x6574;&#x51FD;&#x6570;&#xFF0C;&#x8D1F;&#x8D23;&#x5C06;&#x5806;&#x8C03;&#x6574;&#x6210;&#x5927;&#x6839;&#x5806;&#xFF08;&#x56E0;&#x4E3A;&#x662F;&#x589E;&#x5E8F;&#x6392;&#x5217;&#xFF09;
    var child;//&#x6839;&#x5B69;&#x5B50;&#x7684;&#x7D22;&#x5F15;
    var temp;
    //&#x4EE5;&#x7B49;&#x500D;&#x6570;&#x95F4;&#x9694;&#xFF0C;&#x8C03;&#x6574;&#x5806;&#x4E3A;&#x5927;&#x6839;&#x5806;
    for (; 2 * i + 1 &lt; len; i = child){
      child = 2 * i + 1;  //&#x5B9A;&#x4F4D;&#x5176;&#x5DE6;&#x5B69;&#x5B50;
      if (child &lt; len - 1 &amp;&amp; arr[child + 1] &gt; arr[child])//&#x4ECE;&#x5176;&#x5DE6;&#x53F3;&#x5B69;&#x5B50;&#x4E2D;&#x9009;&#x62E9;&#x6700;&#x5927;&#x7684;&#x5B69;&#x5B50;
        child++;
      if (arr[i] &lt; arr[child])//&#x5982;&#x679C;&#x81EA;&#x5DF1;&#x6BD4;&#x6700;&#x5927;&#x7684;&#x5B69;&#x5B50;&#x5C0F;&#xFF0C;&#x548C;&#x8BE5;&#x5B69;&#x5B50;&#x4EA4;&#x6362;
        [arr[child], arr[i]] = [arr[i], arr[child]];
      else
        break;
    }
  }
}</code></pre><h2>&#x57FA;&#x6570;&#x6392;&#x5E8F;(&#x6876;&#x6392;&#x5E8F;)</h2><p>&#x8FD9;&#x4E2A;&#x6392;&#x5E8F;&#x662F;&#x5BF9;&#x8D39;&#x7A7A;&#x95F4;&#x7684;&#xFF0C;&#x4E0D;&#x8FC7;&#x8FD9;&#x4E2A;&#x601D;&#x60F3;&#x6709;&#x70B9;&#x50CF;&#x54C8;&#x5E0C;&#x8868;&#x7684;&#x610F;&#x601D;&#x3002;&#x987E;&#x540D;&#x601D;&#x4E49;&#xFF0C;&#x5B83;&#x662F;&#x900F;&#x8FC7;&#x952E;&#x503C;&#x7684;&#x90E8;&#x4EFD;&#x8D44;&#x8BAF;&#xFF0C;&#x6BD4;&#x5982;&#x6BCF;&#x4E2A;&#x6570;&#x7684;&#x6700;&#x9AD8;&#x4F4D;(&#x5982;&#x679C;&#x4F4D;&#x6570;&#x4E0D;&#x540C;&#x5728;&#x524D;&#x65B9;&#x8865;&#x96F6;)&#xFF0C;&#x5C06;&#x8981;&#x6392;&#x5E8F;&#x7684;&#x5143;&#x7D20;&#x5206;&#x914D;&#x81F3;&#x67D0;&#x4E9B;&#x201C;&#x6876;&#x201D;&#x4E2D;&#xFF0C;&#x4F9D;&#x6B21;&#x4ECE;&#x4F4E;&#x4F4D;&#x5230;&#x9AD8;&#x4F4D;&#x6267;&#x884C;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x628A;&#x6BCF;&#x4E2A;&#x6876;&#x7684;&#x6570;&#x636E;&#x987A;&#x5E8F;&#x7EFC;&#x5408;&#x8D77;&#x6765;&#xFF0C;&#x4EE5;&#x8FBE;&#x5230;&#x6392;&#x5E8F;&#x7684;&#x4F5C;&#x7528;&#x3002;&#x5C31;&#x50CF;&#x4E0B;&#x56FE;&#x8FD9;&#x6837;&#xFF0C;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x6876;&#x7684;&#x610F;&#x601D;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016286800" src="https://static.alili.tech/img/remote/1460000016286800" alt="radix" title="radix"></span></p><p>&#x4E0B;&#x56FE;&#x662F;&#x6574;&#x4E2A;&#x6392;&#x5E8F;&#x8FC7;&#x7A0B;&#x793A;&#x610F;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016286801" src="https://static.alili.tech/img/remote/1460000016286801" alt="radix2" title="radix2"></span></p><p>&#x57FA;&#x6570;&#x6392;&#x5E8F;&#x65F6;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#x4E3A;$O(d(r+n))$&#xFF0C;&#x7A7A;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#x4E3A;$O(rd+n)$&#xFF0C;&#x5C5E;&#x4E8E; <strong>&#x7A33;&#x5B9A;</strong> &#x6392;&#x5E8F;&#x3002;&#xFF08;&#x5176;&#x4E2D;r&#x4E3A;&#x57FA;&#x6570;&#xFF0C;n&#x4E3A;&#x6570;&#x636E;&#x603B;&#x6570;&#xFF0C;d&#x4E3A;&#x6876;&#x6570;&#xFF1B;&#x4E5F;&#x6709;&#x4E66;&#x5F97;&#x5230;&#x5176;&#x5E73;&#x5747;&#x65F6;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#x4E3A;$O(nlog_{r}d)$&#xFF09;</p><pre><code>//&#x57FA;&#x6570;&#x6392;&#x5E8F;(&#x6876;&#x6392;&#x5E8F;)
radixSort = function(arr){
  var len = arr.length;
  var bullet= [];
  var k=1, temp;//k&#x662F;&#x5904;&#x7406;&#x6570;&#x5B57;&#x7684;&#x6743;&#x91CD;&#xFF0C;k=1&#x8868;&#x793A;&#x5904;&#x7406;&#x4E2A;&#x4F4D;&#x6570;&#xFF0C;k=10&#x8868;&#x793A;&#x5904;&#x7406;&#x5341;&#x4F4D;&#x6570;&#xFF0C;&#x4EE5;&#x6B64;&#x7C7B;&#x63A8;
  for (var i = 0; i &lt; 10; i++)//&#x4E3A;&#x6BCF;&#x4E2A;&#x6876;&#x5206;&#x914D;&#x5185;&#x5B58;&#x7A7A;&#x95F4;
    bullet[i] = [];
  while (true){
    var num = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];//num&#x7528;&#x6765;&#x7EDF;&#x8BA1;0~9&#x6BCF;&#x4E2A;&#x6876;&#x91CC;&#x9762;&#x73B0;&#x6709;&#x6570;&#x5B57;&#x4E2A;&#x6570;
    for (var i = 0; i &lt; len; i++){//&#x7EDF;&#x8BA1;&#x5206;&#x914D;&#x6BCF;&#x4E2A;&#x6570;&#x5B57;&#x5230;&#x6876;&#x91CC;&#x9762;&#xFF0C;&#x5E76;&#x7EDF;&#x8BA1;&#x6BCF;&#x4E2A;&#x6876;&#x6570;&#x5B57;&#x4E2A;&#x6570;
      temp = Math.floor(arr[i] / k) % 10;
      bullet[temp][num[temp]++] = arr[i];
    }
    if (num[0] == len) break;//&#x5F53;&#x5168;&#x90E8;&#x6570;&#x5B57;&#x90FD;&#x5728;&#x7F16;&#x53F7;&#x4E3A;0&#x7684;&#x6876;&#x4E2D;&#xFF0C;&#x6392;&#x5E8F;&#x7ED3;&#x675F;
    //&#x5C06;&#x6876;&#x91CC;&#x7684;&#x6570;&#x4F9D;&#x6B21;&#x653E;&#x56DE;a&#x6570;&#x7EC4;&#x4E2D;
    for (var i = 0; i &lt; len; i++){
      for (var j = 0; j &lt; 10; j++){
        for (var r = 0; r &lt; num[j]; r++)
          arr[i++] = bullet[j][r];
      }
    }
    k *= 10;//k&#x589E;&#x52A0;10&#x500D;&#xFF0C;&#x4ECE;&#x53F3;&#x81F3;&#x5DE6;&#x5904;&#x7406;&#x4E0B;&#x4E00;&#x4F4D;&#x6570;&#x5B57;
  }
  return arr;
}</code></pre><h2>&#x6392;&#x5E8F;&#x5BF9;&#x6BD4;</h2><p>&#x4EE5;&#x4E0A;&#x662F;&#x5E38;&#x89C1;&#x7684;8&#x79CD;&#x6392;&#x5E8F;&#x7B97;&#x6CD5;&#xFF0C;&#x5C0F;&#x7F16;&#x4E5F;&#x628A;&#x7ED3;&#x679C;&#x5199;&#x51FA;&#x6765;&#x628A;&#x3002;&#x4E0B;&#x9762;&#x662F;10&#x4E2A;&#x968F;&#x673A;&#x6570;&#x7684;&#x6392;&#x5E8F;&#x6548;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016286802" src="https://static.alili.tech/img/remote/1460000016286802" alt="result" title="result"></span></p><p>&#x5F53;&#x7136;&#x8FD8;&#x6709;&#x7B97;&#x6CD5;&#x901F;&#x5EA6;&#xFF0C;&#x5C0F;&#x7F16;&#x7528;&#x4E86;2&#x4E07;&#x4E2A;&#x5747;&#x5300;&#x5206;&#x5E03;&#x5728;0&#x5230;10000&#x7684;&#x968F;&#x673A;&#x6570;&#xFF0C;&#x5F97;&#x5230;&#x5982;&#x4E0B;&#x7ED3;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016286803" src="https://static.alili.tech/img/remote/1460000016286803" alt="time" title="time"></span></p><p>&#x4E0D;&#x8FC7;&#x5B9E;&#x9645;&#x4F7F;&#x7528;&#x4E2D;&#xFF0C;&#x5E76;&#x4E0D;&#x662F;&#x8D8A;&#x5FEB;&#x8D8A;&#x597D;&#xFF0C;&#x800C;&#x4E14;&#x5373;&#x4FBF;&#x662F;&#x8FFD;&#x6C42;&#x5FEB;&#x4E5F;&#x548C;&#x6570;&#x636E;&#x672C;&#x8EAB;&#x7684;&#x8D28;&#x91CF;&#x6709;&#x5173;&#x7CFB;&#x3002;&#x5C31;&#x50CF;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x8868;&#x4E2D;&#x7684;&#xFF1A;</p><table><thead><tr><th>&#x7B97;&#x6CD5;</th><th>&#x65F6;&#x95F4;&#x590D;&#x6742;&#x5EA6;(&#x6700;&#x597D;)</th><th>&#x65F6;&#x95F4;&#x590D;&#x6742;&#x5EA6;(&#x6700;&#x597D;)</th><th>&#x65F6;&#x95F4;&#x590D;&#x6742;&#x5EA6;(&#x6700;&#x574F;)</th><th>&#x7A7A;&#x95F4;&#x590D;&#x6742;&#x5EA6;</th><th>&#x7A33;&#x5B9A;&#x6027;</th></tr></thead><tbody><tr><td>&#x63D2;&#x5165;&#x6392;&#x5E8F;</td><td>$O(n^2)$</td><td>$O(n)$</td><td>$O(n^2)$</td><td>$O(1)$</td><td>&#x7A33;&#x5B9A;</td></tr><tr><td>&#x5E0C;&#x5C14;&#x6392;&#x5E8F;</td><td>$O(n^{1.3})$</td><td>$O(n)$</td><td>$O(n^2)$</td><td>$O(1)$</td><td>&#x4E0D;&#x7A33;&#x5B9A;</td></tr><tr><td>&#x9009;&#x62E9;&#x6392;&#x5E8F;</td><td>$O(n^2)$</td><td>$O(n^2)$</td><td>$O(n^2)$</td><td>$O(1)$</td><td>&#x4E0D;&#x7A33;&#x5B9A;</td></tr><tr><td>&#x5806;&#x6392;&#x5E8F;</td><td>$O(nlog_2 n)$</td><td>$O(nlog_2 n)$</td><td>$O(nlog_2 n)$</td><td>$O(1)$</td><td>&#x4E0D;&#x7A33;&#x5B9A;</td></tr><tr><td>&#x5192;&#x6CE1;&#x6392;&#x5E8F;</td><td>$O(n^2)$</td><td>$O(n)$</td><td>$O(n^2)$</td><td>$O(1)$</td><td>&#x7A33;&#x5B9A;</td></tr><tr><td>&#x5FEB;&#x901F;&#x6392;&#x5E8F;</td><td>$O(nlog_2 n)$</td><td>$O(nlog_2 n)$</td><td>$O(n^2)$</td><td>$O(nlog_2 n)$</td><td>&#x4E0D;&#x7A33;&#x5B9A;</td></tr><tr><td>&#x5F52;&#x5E76;&#x6392;&#x5E8F;</td><td>$O(nlog_2 n)$</td><td>$O(nlog_2 n)$</td><td>$O(nlog_2 n)$</td><td>$O(n)$</td><td>&#x7A33;&#x5B9A;</td></tr><tr><td>&#x57FA;&#x6570;&#x6392;&#x5E8F;</td><td>$O(d(r+n))$</td><td>$O(d(n+rd))$</td><td>$O(d(r+n))$</td><td>$O(n+rd)$</td><td>&#x7A33;&#x5B9A;</td></tr></tbody></table><p>&#x6CE8;:</p><ol><li>&#x57FA;&#x6570;&#x6392;&#x5E8F;&#x7684;&#x590D;&#x6742;&#x5EA6;&#x4E2D;&#xFF0C;$r$ &#x4EE3;&#x8868;&#x5173;&#x952E;&#x5B57;&#x57FA;&#x6570;&#xFF0C;$d$ &#x4EE3;&#x8868;&#x957F;&#x5EA6;&#xFF0C;$n$ &#x4EE3;&#x8868;&#x5173;&#x952E;&#x5B57;&#x4E2A;&#x6570;</li><li>&#x6392;&#x5E8F;&#x7B97;&#x6CD5;&#x7684;&#x7A33;&#x5B9A;&#x6027;&#x6307;&#x5728;&#x539F;&#x5E8F;&#x5217;&#x4E2D;&#xFF0C;$r_i=r_j$&#xFF0C;&#x4E14; $r_i$ &#x5728; $r_j$ &#x4E4B;&#x524D;&#xFF0C;&#x800C;&#x5728;&#x6392;&#x5E8F;&#x540E;&#x7684;&#x5E8F;&#x5217;&#x4E2D;&#xFF0C;$r_i$ &#x4ECD;&#x5728; $r_j$ &#x4E4B;&#x524D;&#xFF0C;&#x5219;&#x79F0;&#x8FD9;&#x79CD;&#x6392;&#x5E8F;&#x7B97;&#x6CD5;&#x662F;&#x7A33;&#x5B9A;&#x7684;&#xFF1B;&#x5426;&#x5219;&#x79F0;&#x4E3A;&#x4E0D;&#x7A33;&#x5B9A;&#x7684;&#x3002;</li></ol><p>&#x5F00;&#x53D1;&#x7684;&#x65F6;&#x5019;&#x5E94;&#x8BE5;&#x7EFC;&#x5408;&#x6392;&#x5E8F;&#x539F;&#x59CB;&#x6570;&#x636E;&#x72B6;&#x6001;&#xFF0C;&#x9700;&#x6C42;&#xFF0C;&#x7A33;&#x5B9A;&#x6027;&#xFF0C;&#x7CFB;&#x7EDF;&#x8D44;&#x6E90;&#x7B49;&#x8BF8;&#x591A;&#x56E0;&#x7D20;&#x6765;&#x786E;&#x5B9A;&#x4F7F;&#x7528;&#x54EA;&#x79CD;&#x6392;&#x5E8F;&#x65B9;&#x5F0F;&#xFF0C;&#x4E5F;&#x53EF;&#x4E00;&#x5C06;&#x51E0;&#x79CD;&#x6392;&#x5E8F;&#x7EC4;&#x5408;&#x4F7F;&#x7528;&#x4EE5;&#x63D0;&#x9AD8;&#x6027;&#x80FD;&#xFF0C;&#x6BD4;&#x5982;&#x5C0F;&#x7F16;&#x5C31;&#x53D1;&#x73B0;&#x5728;&#x5FEB;&#x901F;&#x6392;&#x5E8F;&#x4E2D;&#xFF0C;&#x5F53;&#x6BCF;&#x4E2A;&#x90E8;&#x5206;&#x6570;&#x636E;&#x6570;&#x91CF;&#x5C0F;&#x4E8E;8&#x65F6;&#xFF0C;&#x5BF9;&#x6BCF;&#x4E2A;&#x90E8;&#x5206;&#x7528;&#x63D2;&#x5165;&#x6392;&#x5E8F;&#x5C31;&#x6BD4;&#x4E00;&#x76F4;&#x4F7F;&#x7528;&#x5FEB;&#x901F;&#x6392;&#x5E8F;&#x66F4;&#x5FEB;&#x3002;&#x5C0F;&#x7F16;&#x5728;&#x627E;&#x5230;&#x4E00;&#x4E2A;&#x52A8;&#x56FE;&#xFF0C;&#x5341;&#x5206;&#x751F;&#x52A8;&#x5F62;&#x8C61;&#x7684;&#x8868;&#x73B0;&#x4E86;&#x4E0D;&#x540C;&#x7B97;&#x6CD5;&#x7684;&#x901F;&#x5EA6;&#x4E0A;&#x7684;&#x5DEE;&#x5F02;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016286804" src="https://static.alili.tech/img/remote/1460000016286804" alt="difference" title="difference"></span></p><p>&#x672C;&#x7AE0;js&#x6E90;&#x7801;&#x53EF;&#x4EE5; <a href="https://file.faremax.info/sort.js" rel="nofollow noreferrer">&#x70B9;&#x6B64;&#x53BB;&#x4E0B;&#x8F7D;</a></p><p>&#x6392;&#x5E8F;&#x7B97;&#x6CD5;&#x5C31;&#x5199;&#x8FD9;&#x4E48;&#x591A;&#xFF0C;&#x6709;&#x4EC0;&#x4E48;&#x4E0D;&#x8DB3;&#x8FD8;&#x8BF7;&#x6307;&#x70B9;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于 Javascript 排序算法

## 原文链接
[https://segmentfault.com/a/1190000016286789](https://segmentfault.com/a/1190000016286789)

