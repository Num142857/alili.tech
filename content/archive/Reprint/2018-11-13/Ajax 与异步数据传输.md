---
title: Ajax 与异步数据传输
reprint: true
categories: reprint
abbrlink: a25a6f68
date: 2018-11-13 02:30:09
---

{{% raw %}}
<h2>&#x57FA;&#x672C;&#x6982;&#x5FF5;</h2><p>Ajax &#x5168;&#x79F0;&#x662F;&#x5F02;&#x6B65;&#x7684; JavaScript &#x548C; XML &#x3002; &#x901A;&#x8FC7;&#x5728;&#x540E;&#x53F0;&#x4E0E;&#x670D;&#x52A1;&#x5668;&#x8FDB;&#x884C;&#x5C11;&#x91CF;&#x6570;&#x636E;&#x4EA4;&#x6362;&#xFF0C;AJAX &#x53EF;&#x4EE5;&#x4F7F;&#x7F51;&#x9875;&#x5B9E;&#x73B0;&#x5F02;&#x6B65;&#x66F4;&#x65B0;&#x3002;&#x8FD9;&#x610F;&#x5473;&#x7740;&#x53EF;&#x4EE5;&#x5728;&#x4E0D;&#x91CD;&#x65B0;&#x52A0;&#x8F7D;&#x6574;&#x4E2A;&#x7F51;&#x9875;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x5BF9;&#x7F51;&#x9875;&#x7684;&#x67D0;&#x90E8;&#x5206;&#x8FDB;&#x884C;&#x66F4;&#x65B0;&#x3002;&#x4F20;&#x7EDF;&#x7684;&#x7F51;&#x9875;&#xFF08;&#x4E0D;&#x4F7F;&#x7528; AJAX&#xFF09;&#x5982;&#x679C;&#x9700;&#x8981;&#x66F4;&#x65B0;&#x5185;&#x5BB9;&#xFF0C;&#x5FC5;&#x987B;&#x91CD;&#x8F7D;&#x6574;&#x4E2A;&#x7F51;&#x9875;&#x9875;&#x9762;&#x3002;</p><p>Ajax &#x5177;&#x6709;&#x4EE5;&#x4E0B;&#x4F18;&#x70B9;&#x548C;&#x7F3A;&#x70B9;&#xFF1A;</p><ul><li>&#x4F18;&#x70B9;</li></ul><ol><li>&#x65E0;&#x9700;&#x5237;&#x65B0;&#x9875;&#x9762;&#xFF0C;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#x597D;&#xFF1B;</li><li>&#x5F02;&#x6B65;&#x4E0E;&#x670D;&#x52A1;&#x5668;&#x901A;&#x4FE1;&#xFF0C;&#x4E0D;&#x5F71;&#x54CD;&#x4E3B;&#x8FDB;&#x7A0B;&#xFF0C;&#x54CD;&#x5E94;&#x66F4;&#x8FC5;&#x901F;&#xFF1B;</li><li>&#x53EF;&#x4EE5;&#x628A;&#x90E8;&#x5206;&#x670D;&#x52A1;&#x5668;&#x7684;&#x5DE5;&#x4F5C;&#x653E;&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x5B8C;&#x6210;&#xFF0C;&#x51CF;&#x8F7B;&#x670D;&#x52A1;&#x5668;&#x538B;&#x529B;&#xFF0C;&#x51CF;&#x5C11;&#x5197;&#x4F59;&#x8BF7;&#x6C42;&#x548C;&#x54CD;&#x5E94;&#xFF1B;</li><li>Ajax &#x662F;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x7684;&#x6807;&#x51C6;&#x5316;&#x6280;&#x672F;&#xFF0C;&#x65E0;&#x9700;&#x63D2;&#x4EF6;&#x652F;&#x6301;&#xFF0C;&#x8DE8;&#x5E73;&#x53F0;&#x6027;&#x80FD;&#x597D;&#xFF1B;</li></ol><ul><li>&#x7F3A;&#x70B9;</li></ul><ol><li>Ajax &#x8BF7;&#x6C42;&#x4E0D;&#x4FEE;&#x6539;&#x6D4F;&#x89C8;&#x5668;&#x5386;&#x53F2;&#x8BB0;&#x5F55;&#xFF0C;&#x56E0;&#x6B64;&#x4E0D;&#x652F;&#x6301;&#x524D;&#x8FDB;&#x540E;&#x9000;&#x529F;&#x80FD;&#xFF1B;</li><li>Ajax &#x66B4;&#x9732;&#x4E86;&#x8FC7;&#x591A;&#x548C;&#x670D;&#x52A1;&#x5668;&#x4EA4;&#x4E92;&#x7684;&#x7EC6;&#x8282;&#xFF1B;</li><li>&#x7834;&#x574F;&#x4E86;&#x7A0B;&#x5E8F;&#x7684;&#x5F02;&#x5E38;&#x673A;&#x5236;&#xFF0C;&#x5BB9;&#x6613;&#x8C03;&#x8BD5;&#xFF1B;</li><li>&#x4E0D;&#x5229;&#x4E8E;&#x641C;&#x7D22;&#x5F15;&#x64CE;&#x6293;&#x53D6;&#x4FE1;&#x606F;&#xFF1B;</li></ol><h2>&#x540C;&#x6E90;&#x7B56;&#x7565;</h2><p>&#x540C;&#x6E90;&#x7B56;&#x7565;&#x662F;Netscape&#x63D0;&#x51FA;&#x7684;&#x4E00;&#x4E2A;&#x8457;&#x540D;&#x7684;&#x5B89;&#x5168;&#x7B56;&#x7565;&#xFF0C;&#x5B83;&#x662F;&#x6307;&#x540C;&#x4E00;&#x4E2A;&#x201C;&#x6E90;&#x5934;&#x201D;&#x7684;&#x6570;&#x636E;&#x53EF;&#x4EE5;&#x81EA;&#x7531;&#x8BBF;&#x95EE;&#xFF0C;&#x4F46;&#x4E0D;&#x540C;&#x6E90;&#x7684;&#x6570;&#x636E;&#x76F8;&#x4E92;&#x4E4B;&#x95F4;&#x90FD;&#x4E0D;&#x80FD;&#x8BBF;&#x95EE;&#x3002;&#x6211;&#x4EEC;&#x8BD5;&#x60F3;&#x4E00;&#x4E0B;&#x4EE5;&#x4E0B;&#x51E0;&#x79CD;&#x60C5;&#x51B5;&#xFF1A;</p><ol><li>&#x6211;&#x4EEC;&#x6253;&#x5F00;&#x4E86;&#x4E00;&#x4E2A;&#x5929;&#x732B;&#x5E76;&#x4E14;&#x767B;&#x5F55;&#x4E86;&#x81EA;&#x5DF1;&#x7684;&#x8D26;&#x53F7;&#xFF0C;&#x8FD9;&#x65F6;&#x6211;&#x4EEC;&#x518D;&#x6253;&#x5F00;&#x4E00;&#x4E2A;&#x5929;&#x732B;&#x7684;&#x5546;&#x54C1;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x9700;&#x8981;&#x518D;&#x8FDB;&#x884C;&#x4E00;&#x6B21;&#x767B;&#x5F55;&#x5C31;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x8D2D;&#x4E70;&#x5546;&#x54C1;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x4E24;&#x4E2A;&#x7F51;&#x9875;&#x662F;&#x540C;&#x6E90;&#x7684;&#xFF0C;&#x53EF;&#x4EE5;&#x5171;&#x4EAB;&#x767B;&#x5F55;&#x76F8;&#x5173;&#x7684; cookie &#x6216; localStorage &#x6570;&#x636E;&#xFF1B;</li><li>&#x5982;&#x679C;&#x4F60;&#x6B63;&#x5728;&#x7528;&#x652F;&#x4ED8;&#x5B9D;&#x6216;&#x8005;&#x7F51;&#x94F6;&#xFF0C;&#x540C;&#x65F6;&#x6253;&#x5F00;&#x4E86;&#x4E00;&#x4E2A;&#x4E0D;&#x77E5;&#x540D;&#x7684;&#x7F51;&#x9875;&#xFF0C;&#x5982;&#x679C;&#x8FD9;&#x4E2A;&#x7F51;&#x9875;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x4F60;&#x652F;&#x4ED8;&#x5B9D;&#x6216;&#x8005;&#x7F51;&#x94F6;&#x9875;&#x9762;&#x7684;&#x4FE1;&#x606F;&#xFF0C;&#x5C31;&#x4F1A;&#x4EA7;&#x751F;&#x4E25;&#x91CD;&#x7684;&#x5B89;&#x5168;&#x7684;&#x95EE;&#x9898;&#x3002;&#x663E;&#x7136;&#x6D4F;&#x89C8;&#x5668;&#x4E0D;&#x5141;&#x8BB8;&#x8FD9;&#x6837;&#x7684;&#x4E8B;&#x60C5;&#x53D1;&#x751F;&#xFF1B;</li><li>&#x60F3;&#x5FC5;&#x4F60;&#x4E5F;&#x6709;&#x8FC7;&#x540C;&#x65F6;&#x767B;&#x9646;&#x597D;&#x51E0;&#x4E2A; qq &#x8D26;&#x53F7;&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x5982;&#x679C;&#x540C;&#x65F6;&#x6253;&#x5F00;&#x5404;&#x81EA;&#x7684; qq &#x7A7A;&#x95F4;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x6709;&#x4E00;&#x4E2A;&#x5C0F;&#x53F7;&#x6A21;&#x5F0F;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x53E6;&#x5916;&#x518D;&#x6253;&#x5F00;&#x4E00;&#x4E2A;&#x7A97;&#x53E3;&#x4E13;&#x95E8;&#x7528;&#x6765;&#x6253;&#x5F00;&#x7B2C;&#x4E8C;&#x4E2A; qq &#x8D26;&#x53F7;&#x7684;&#x7A7A;&#x95F4;&#x3002;</li></ol><p>&#x5F88;&#x660E;&#x663E;&#xFF0C;&#x7B2C;1&#x4E2A;&#x548C;&#x7B2C;3&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x4E0D;&#x540C;&#x7684;&#x5929;&#x732B;&#x5546;&#x5E97;&#x548C; qq &#x7A7A;&#x95F4;&#x5C5E;&#x4E8E;&#x540C;&#x6E90;&#xFF0C;&#x53EF;&#x4EE5;&#x5171;&#x4EAB;&#x767B;&#x5F55;&#x4FE1;&#x606F;&#x3002;qq &#x4E3A;&#x4E86;&#x533A;&#x522B;&#x4E0D;&#x540C;&#x7684; qq &#x7684;&#x767B;&#x5F55;&#x4FE1;&#x606F;&#xFF0C;&#x91CD;&#x65B0;&#x6253;&#x5F00;&#x4E86;&#x4E00;&#x4E2A;&#x7A97;&#x53E3;&#xFF0C;&#x56E0;&#x4E3A;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x4E0D;&#x540C;&#x7A97;&#x53E3;&#x662F;&#x4E0D;&#x80FD;&#x5171;&#x4EAB;&#x4FE1;&#x606F;&#x7684;&#x3002;&#x800C;&#x7B2C;2&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D;&#x7684;&#x652F;&#x4ED8;&#x5B9D;&#x3001;&#x7F51;&#x94F6;&#x3001;&#x4E0D;&#x77E5;&#x540D;&#x7F51;&#x7AD9;&#x4E4B;&#x95F4;&#x662F;&#x975E;&#x540C;&#x6E90;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5F7C;&#x6B64;&#x4E4B;&#x95F4;&#x65E0;&#x6CD5;&#x8BBF;&#x95EE;&#x4FE1;&#x606F;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x6267;&#x610F;&#x60F3;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#xFF0C;&#x4F1A;&#x63D0;&#x793A;&#x5F02;&#x5E38;&#xFF1A;</p><pre><code>No &apos;Access-Control-Allow-Origin&apos; header is present on the requested resource. Origin &apos;null&apos; is therefore not allowed access.</code></pre><p>&#x90A3;&#x4E48;&#x4EC0;&#x4E48;&#x662F;&#x540C;&#x6E90;&#x7684;&#x8BF7;&#x6C42;&#x5462;&#xFF1F;&#x540C;&#x6E90;&#x8BF7;&#x6C42;&#x8981;&#x6C42;&#x88AB;&#x8BF7;&#x6C42;&#x8D44;&#x6E90;&#x9875;&#x9762;&#x548C;&#x53D1;&#x51FA;&#x8BF7;&#x6C42;&#x9875;&#x9762;&#x6EE1;&#x8DB3;3&#x4E2A;&#x76F8;&#x540C;&#xFF1A;</p><blockquote>&#x534F;&#x8BAE;&#x76F8;&#x540C;<br>&#x57DF;&#x540D;&#x76F8;&#x540C;<br>&#x7AEF;&#x53E3;&#x76F8;&#x540C;</blockquote><p>&#x7B80;&#x5355;&#x7406;&#x89E3;&#x4E00;&#x4E0B;&#xFF1A;</p><pre><code>/*&#x4EE5;&#x4E0B;&#x4E24;&#x4E2A;&#x6570;&#x636E;&#x975E;&#x540C;&#x6E90;&#xFF0C;&#x56E0;&#x4E3A;&#x534F;&#x8BAE;&#x4E0D;&#x540C;*/
http://www.abc123.com.cn/item/a.js
https://www.abc123.com.cn/item/a.js

/*&#x4EE5;&#x4E0B;&#x4E24;&#x4E2A;&#x6570;&#x636E;&#x975E;&#x540C;&#x6E90;&#xFF0C;&#x56E0;&#x4E3A;&#x57DF;&#x540D;&#x4E0D;&#x540C;*/
http://www.abc123.com.cn/item/a.js
http://www.abc123.com/item/a.js

/*&#x4EE5;&#x4E0B;&#x4E24;&#x4E2A;&#x6570;&#x636E;&#x975E;&#x540C;&#x6E90;&#xFF0C;&#x56E0;&#x4E3A;&#x4E3B;&#x673A;&#x540D;&#x4E0D;&#x540C;*/
http://www.abc123.com.cn/item/a.js
http://item.abc123.com.cn/item/a.js

/*&#x4EE5;&#x4E0B;&#x4E24;&#x4E2A;&#x6570;&#x636E;&#x975E;&#x540C;&#x6E90;&#xFF0C;&#x56E0;&#x4E3A;&#x534F;&#x8BAE;&#x4E0D;&#x540C;*/
http://www.abc123.com.cn/item/a.js
http://www.abc123.com.cn:8080/item/a.js

/* &#x4EE5;&#x4E0B;&#x4E24;&#x4E2A;&#x6570;&#x636E;&#x975E;&#x540C;&#x6E90;&#xFF0C;&#x57DF;&#x540D;&#x548C; ip &#x89C6;&#x4E3A;&#x4E0D;&#x540C;&#x6E90;
 * &#x8FD9;&#x91CC;&#x5E94;&#x6CE8;&#x610F;&#xFF0C;ip&#x548C;&#x57DF;&#x540D;&#x66FF;&#x6362;&#x4E00;&#x6837;&#x4E0D;&#x662F;&#x540C;&#x6E90;&#x7684;
 * &#x5047;&#x8BBE;www.abc123.com.cn&#x89E3;&#x6790;&#x540E;&#x7684; ip &#x662F; 195.155.200.134
 */
http://www.abc123.com.cn/
http://195.155.200.134/

/*&#x4EE5;&#x4E0B;&#x4E24;&#x4E2A;&#x6570;&#x636E;&#x540C;&#x6E90;*/                               /* &#x8FD9;&#x4E2A;&#x662F;&#x540C;&#x6E90;&#x7684;*/
http://www.abc123.com.cn/source/a.html
http://www.abc123.com.cn/item/b.js</code></pre><h2>Ajax</h2><p>Ajax&#x5728;&#x7F16;&#x5199;&#x65F6;&#x4E00;&#x5171;4&#x4E2A;&#x6B65;&#x9AA4;&#xFF1A;</p><ol><li>&#x521B;&#x5EFA; xhr &#x5BF9;&#x8C61;</li><li>&#x8BBE;&#x7F6E;&#x4F20;&#x8F93;&#x5730;&#x5740;</li><li>&#x8BBE;&#x7F6E;&#x56DE;&#x8C03;&#x51FD;&#x6570;</li><li>&#x53D1;&#x9001;&#x6570;&#x636E;</li></ol><p>&#x5E38;&#x89C1;&#x7684;&#x53D1;&#x9001;&#x65B9;&#x5F0F;&#x6709; GET &#x548C; POST&#xFF0C;&#x9664;&#x6B64;&#x4E4B;&#x5916;&#x8FD8;&#x6709; HEAD, DELETE, TRACE, PUT, CONNECT, OPTIONS&#x548C; PATCH&#x7B49;&#xFF0C;&#x8FD9;&#x91CC;&#x53EA;&#x4E3E;&#x4F8B;&#x524D;&#x4E24;&#x4E2A; GET &#x548C; POST&#x3002;</p><p>&#x4F8B;&#x5982;&#x6839;&#x636E;&#x59D3;&#x540D;&#x67E5;&#x8BE2;&#x4E00;&#x4E2A;&#x4EBA;&#x7684;&#x4FE1;&#x606F;&#x5E76;&#x5199;&#x5728;div#output&#x4E2D;</p><pre><code>//GET &#x65B9;&#x6CD5;
function search(name, fun){
  var xhr = new XMLHttpRequest();
  var url = &quot;search.php?name=&quot; + window.encodeURIComponent(name) + &quot;&amp;t=&quot; + Math.random();
  xhr.open(&quot;GET&quot;, url);
  xhr.send();
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 &amp;&amp; xhr.status == 200){
        var data = JSON.parse(xhr.responseText);   //&#x83B7;&#x53D6;&#x4E86; JSON &#x5B57;&#x7B26;&#x4E32;
        fun(data);
    }
  }
}
function show(data){
    this.innerHTML = &quot;&#x59D3;&#x540D;&#xFF1A;&quot; + data.name + &quot;&lt;br /&gt;&#x6027;&#x522B;&#xFF1A;&quot; + data.gender + &quot;&lt;br /&gt;&#x5E74;&#x9F84;&#xFF1A;&quot; + data.age + &quot;&lt;br /&gt;&#x5730;&#x5740;&#xFF1A;&quot; + data.address + &quot;&lt;br /&gt;&#x7535;&#x8BDD;&#xFF1A;&quot; + data.tel;
}
var output = document.getElementById(&quot;output&quot;);
search(&quot;&#x674E;&#x534E;&quot;, show.bind(output));

//&#x670D;&#x52A1;&#x5668;&#x7AEF; search.php
&lt;?php
 $name = $_GET[name];
 //&#x6A21;&#x62DF;&#x6570;&#x636E;&#x67E5;&#x8BE2;&#x7ED3;&#x679C;
 echo &apos;{&quot;name&quot;:&quot;&apos; . $name .&apos;&quot;,&quot;age&quot;:18,&quot;gender&quot;:&quot;&#x7537;&quot;,&quot;tel&quot;:&quot;13211112222&quot;,&quot;address&quot;:&quot;&#x5317;&#x4EAC;&#x5E02;&#x6D77;&#x6DC0;&#x533A;xxxxxxxx&quot;}&apos;;
?&gt;</code></pre><pre><code>//POST&#x65B9;&#x6CD5;
function search(name, fun){
  var xhr = new XMLHttpRequest();
  var url = &quot;search.php&quot;;
  var para = &quot;name=&quot; + window.encodeURIComponent(name) + &quot;&amp;t=&quot; + Math.random();
  xhr.open(&quot;POST&quot;, url);
  //POST&#x65B9;&#x5F0F;&#x4E0B;&#xFF0C;&#x5FC5;&#x987B;&#x628A; Content-Type &#x8BBE;&#x7F6E;&#x4E3A;application/x-www-form-urlencoded
  xhr.setRequestHeader(&quot;Content-Type&quot;, &quot;application/x-www-form-urlencoded&quot;);
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 &amp;&amp; xhr.status == 200){
      console.log(xhr.responseText);
        var data = JSON.parse(xhr.responseText);   //&#x83B7;&#x53D6;&#x4E86; JSON &#x5B57;&#x7B26;&#x4E32;
        fun(data);
    }
  }
  xhr.send(para);
}
function show(data){
    this.innerHTML = &quot;&#x59D3;&#x540D;&#xFF1A;&quot; + data.name + &quot;&lt;br /&gt;&#x6027;&#x522B;&#xFF1A;&quot; + data.gender + &quot;&lt;br /&gt;&#x5E74;&#x9F84;&#xFF1A;&quot; + data.age + &quot;&lt;br /&gt;&#x5730;&#x5740;&#xFF1A;&quot; + data.address + &quot;&lt;br /&gt;&#x7535;&#x8BDD;&#xFF1A;&quot; + data.tel;
}
var output = document.getElementById(&quot;output&quot;);
search(&quot;&#x674E;&#x534E;&quot;, show.bind(output));


//&#x670D;&#x52A1;&#x5668;&#x7AEF; search.php
&lt;?php
 $name = $_POST[name];
 //&#x6A21;&#x62DF;&#x6570;&#x636E;&#x67E5;&#x8BE2;&#x7ED3;&#x679C;
 echo &apos;{&quot;name&quot;:&quot;&apos; . $name .&apos;&quot;,&quot;age&quot;:18,&quot;gender&quot;:&quot;&#x7537;&quot;,&quot;tel&quot;:&quot;13211112222&quot;,&quot;address&quot;:&quot;&#x5317;&#x4EAC;&#x5E02;&#x6D77;&#x6DC0;&#x533A;xxxxxxxx&apos;;
?&gt;</code></pre><p>&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#x7684; jQuery &#x5199;&#x6CD5;&#xFF1A;</p><pre><code>//GET &#x65B9;&#x5F0F;
function search(name, fun){
  var url = &quot;search.php?name=&quot; + window.encodeURIComponent(name) + &quot;&amp;t=&quot; + Math.random();
  $.get(url, fun);
}
function show(data){
  data = JSON.parse(data);
    this.innerHTML = &quot;&#x59D3;&#x540D;&#xFF1A;&quot; + data.name + &quot;&lt;br /&gt;&#x6027;&#x522B;&#xFF1A;&quot; + data.gender + &quot;&lt;br /&gt;&#x5E74;&#x9F84;&#xFF1A;&quot; + data.age + &quot;&lt;br /&gt;&#x5730;&#x5740;&#xFF1A;&quot; + data.address + &quot;&lt;br /&gt;&#x7535;&#x8BDD;&#xFF1A;&quot; + data.tel;
}
var output = document.getElementById(&quot;output&quot;);
search(&quot;&#x674E;&#x534E;&quot;, show.bind(output));</code></pre><pre><code>//POST &#x65B9;&#x5F0F;
function search(name, fun){
  var url = &quot;search.php&quot;;
  var obj = {};
  obj.name = name;
  obj.t = Math.random();
  $.post(url, obj, fun);
}
function show(data){
  data = JSON.parse(data);
    this.innerHTML = &quot;&#x59D3;&#x540D;&#xFF1A;&quot; + data.name + &quot;&lt;br /&gt;&#x6027;&#x522B;&#xFF1A;&quot; + data.gender + &quot;&lt;br /&gt;&#x5E74;&#x9F84;&#xFF1A;&quot; + data.age + &quot;&lt;br /&gt;&#x5730;&#x5740;&#xFF1A;&quot; + data.address + &quot;&lt;br /&gt;&#x7535;&#x8BDD;&#xFF1A;&quot; + data.tel;
}
var output = document.getElementById(&quot;output&quot;);
search(&quot;&#x674E;&#x534E;&quot;, show.bind(output));
</code></pre><h2>Ajax&#x5E38;&#x89C1;&#x95EE;&#x9898;</h2><h3>&#x7F13;&#x5B58;&#x95EE;&#x9898;</h3><p>&#x7EC6;&#x5FC3;&#x4E00;&#x4E9B;&#x53EF;&#x4EE5;&#x53D1;&#x73B0;&#xFF0C;&#x4E0A;&#x9762;&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#x7684;&#x6570;&#x636E;&#x4E2D;&#x52A0;&#x5165;&#x4E86;&#x4E00;&#x4E2A;&#x968F;&#x673A;&#x6570; t&#x3002;&#x56E0;&#x4E3A;&#x6709;&#x65F6;&#x670D;&#x52A1;&#x5668;&#x66F4;&#x65B0;&#x7684;&#x4E86;&#x6570;&#x636E;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x518D;&#x4E00;&#x6B21;&#x6267;&#x884C; Ajax &#x8BF7;&#x6C42;&#x4E0D;&#x80FD;&#x663E;&#x793A;&#x65B0;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x8FD9;&#x662F;&#x7531;&#x4E8E; js &#x4E3A;&#x4E86;&#x52A0;&#x901F;&#xFF0C;&#x9875;&#x9762;&#x4F1A;&#x4F7F;&#x7528;&#x7F13;&#x5B58;&#x4FDD;&#x6301;&#x5F53;&#x524D;&#x8C03;&#x7528;&#x7684;&#x76F8;&#x540C;&#x94FE;&#x63A5;&#x3002;&#x6211;&#x4EEC;&#x52A0;&#x4E86;&#x4E00;&#x4E2A;&#x968F;&#x673A;&#x6570;&#x4EE5;&#x540E;&#xFF0C;&#x6BCF;&#x6B21;&#x8BF7;&#x6C42;&#x4E0D;&#x540C;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x5C31;&#x4E0D;&#x4F1A;&#x4F7F;&#x7528;&#x7F13;&#x5B58;&#x6570;&#x636E;&#x4E86;&#x3002;</p><h3>&#x4E2D;&#x6587;&#x4E71;&#x7801;&#x95EE;&#x9898;</h3><p>&#x8FD4;&#x56DE;&#x7684;&#x4E2D;&#x6587;&#x6570;&#x636E;&#x4E71;&#x7801;&#x662F;&#x56E0;&#x4E3A; js &#x9875;&#x9762;&#x548C;action&#x9875;&#x9762;&#x4E2D;&#x4F7F;&#x7528;&#x4E86;&#x4E0D;&#x540C;&#x7684;&#x7F16;&#x7801;&#x65B9;&#x5F0F;&#x5BFC;&#x81F4;&#x7684;&#x3002;&#x53EF;&#x4EE5;&#x6709;&#x4EE5;&#x4E0B;2&#x4E2D;&#x65B9;&#x5F0F;&#x89E3;&#x51B3;(&#x6D4F;&#x89C8;&#x5668; html &#x6587;&#x4EF6;&#x662F; urf-8 &#x7F16;&#x7801;&#x7684;):</p><ol><li>&#x5BF9;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x5B57;&#x6BB5;&#x8FDB;&#x884C;2&#x6B21; encodeURI &#x7F16;&#x7801;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x540E;&#x505A;&#x4E00;&#x6B21; UTF-8 &#x8F6C;&#x7801;</li><li>&#x5BF9;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x5B57;&#x6BB5;&#x8FDB;&#x884C;1&#x6B21; encodeURI &#x7F16;&#x7801;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x540E;&#x505A;&#x4E00;&#x6B21; ISO-8859-1 &#x8F6C;&#x6362; &#x548C;&#x4E00;&#x6B21; UTF-8 &#x8F6C;&#x7801;</li></ol><p>tips: &#x8003;&#x8651;&#x5230;&#x517C;&#x5BB9;&#x6027;&#xFF0C;&#x7B2C;1&#x4E2A;&#x65B9;&#x6CD5;&#x66F4;&#x597D;</p><h3>&#x517C;&#x5BB9;&#x6027;&#x95EE;&#x9898;</h3><p>&#x4E4B;&#x524D;&#x7684;&#x4EE3;&#x7801;&#x5E76;&#x6CA1;&#x6709;&#x6309;&#x517C;&#x5BB9;&#x6027;&#x7684;&#x683C;&#x5F0F;&#x4E66;&#x5199;&#xFF0C;&#x4E0D;&#x8FC7; Ajax &#x7684;&#x517C;&#x5BB9;&#x4E5F;&#x4E0D;&#x96BE;&#xFF0C;&#x4E3B;&#x8981;&#x8868;&#x73B0;&#x5728; XMLHTTPRequest&#x5BF9;&#x8C61;&#x83B7;&#x53D6;&#x73AF;&#x8282;:</p><pre><code>var xhr;
if(XMLHttpRequest){
  xhr = new XMLHttpRequest();    //chrome, safari, opera, firefox
} else if(ActionXObject){
  try{
    xhr = new ActionXObject(&quot;Msxml2.XMLHTTP&quot;);   //IE &#x4E2D; Msxml &#x63D2;&#x4EF6;
  }catch(e){
    xhr = new ActionXObject(&quot;Microsoft.XMLHTTP&quot;);   //IE
  }
}</code></pre><h2>GET&#x548C;POST&#x65B9;&#x5F0F;&#x5BF9;&#x6BD4;</h2><table><thead><tr><th>---</th><th>GET</th><th>POST</th></tr></thead><tbody><tr><td>&#x540E;&#x9000;/&#x5237;&#x65B0;</td><td>&#x65E0;&#x5BB3;</td><td>&#x6570;&#x636E;&#x4F1A;&#x91CD;&#x65B0;&#x63D0;&#x4EA4;</td></tr><tr><td>&#x4E66;&#x7B7E;</td><td>&#x53EF;&#x85CF;&#x4E3A;&#x4E66;&#x7B7E;</td><td>&#x65E0;&#x6CD5;&#x85CF;&#x4E3A;&#x4E66;&#x7B7E;</td></tr><tr><td>&#x7F13;&#x5B58;</td><td>&#x53EF;&#x4EE5;&#x7F13;&#x5B58;</td><td>&#x4E0D;&#x53EF;&#x4EE5;&#x7F13;&#x5B58;</td></tr><tr><td>MIME&#x7C7B;&#x578B;</td><td>application/x-www-from-urlencode</td><td>application/x-www-from-urlencode&#x6216; multipart/form-data (&#x4E8C;&#x8FDB;&#x5236;&#x4E3A;&#x591A;&#x91CD;&#x7F16;&#x7801;</td></tr><tr><td>&#x5386;&#x53F2;&#x8BB0;&#x5F55;</td><td>&#x53C2;&#x6570;&#x4FDD;&#x7559;&#x5728;&#x5386;&#x53F2;&#x8BB0;&#x5F55;&#x4E2D;</td><td>&#x53C2;&#x6570;&#x4E0D;&#x4F1A;&#x7559;&#x5728;&#x5386;&#x53F2;&#x8BB0;&#x5F55;</td></tr><tr><td>&#x6570;&#x636E;&#x957F;&#x5EA6;</td><td>URL&#x6700;&#x957F;2048&#x4E2A;&#x5B57;&#x7B26;(2kB)</td><td>&#x65E0;&#x9650;</td></tr><tr><td>&#x6570;&#x636E;&#x7C7B;&#x578B;</td><td>ASCII&#x5B57;&#x7B26;</td><td>&#x65E0;&#x9650;</td></tr><tr><td>&#x5B89;&#x5168;&#x6027;</td><td>&#x5DEE;</td><td>&#x8F83;</td></tr><tr><td>&#x53EF;&#x89C1;&#x6027;</td><td>&#x6570;&#x636E;&#x53EF;&#x89C1;</td><td>&#x6570;&#x636E;&#x4E0D;&#x53EF;&#x89C1;</td></tr></tbody></table><h2>&#x8DE8;&#x57DF;&#x6570;&#x636E;&#x8BBF;&#x95EE;</h2><h3>JSONP</h3><p>&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x5F3A;&#x8C03;&#x7684;&#x662F;&#xFF0C;jsonp&#x4E0D;&#x5C5E;&#x4E8E;Ajax&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x5B83;&#x53EA;&#x662F;&#x5427;url&#x653E;&#x5165;script&#x6807;&#x7B7E;&#x4E2D;&#x5B9E;&#x73B0;&#x7684;&#x6570;&#x636E;&#x4F20;&#x8F93;&#xFF0C;&#x4E3B;&#x8981;&#x4F18;&#x70B9;&#x662F;&#x4E0D;&#x53D7;&#x540C;&#x6E90;&#x7B56;&#x7565;&#x9650;&#x5236;&#x3002;&#x7531;&#x4E8E;&#x4E00;&#x822C;&#x5E93;&#x4E5F;&#x4F1A;&#x628A;&#x5B83;&#x548C;Ajax&#x5C01;&#x88C5;&#x5728;&#x4E00;&#x8D77;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x653E;&#x5728;&#x4E00;&#x8D77;&#x8BA8;&#x8BBA;&#x3002;&#x4E0B;&#x9762;&#x662F;&#x4E00;&#x4E2A;jsonp&#x7684;&#x4F8B;&#x5B50;&#xFF08;&#x5B9E;&#x73B0;&#x529F;&#x80FD;&#xFF1A;&#x8F93;&#x5165;&#x624B;&#x673A;&#x53F7;&#x7801;&#x67E5;&#x8BE2;&#x5F52;&#x5C5E;&#x5730;&#x548C;&#x8FD0;&#x8425;&#x5546;&#xFF09;&#xFF1A;</p><pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot; /&gt;
    &lt;title&gt;&#x517C;&#x5BB9;&#x95EE;&#x9898;&lt;/title&gt;
    
&lt;/head&gt;
&lt;body&gt;
&lt;form&gt;
    &lt;input type=&quot;text&quot; name=&quot;tel&quot; id=&quot;tel&quot; /&gt;
    &lt;input type=&quot;button&quot; value=&quot;search&quot; id=&quot;search&quot;/&gt;
    &lt;br/&gt;
&lt;/form&gt;
&lt;div id=&quot;output&quot;&gt;&lt;/div&gt;
&lt;/body&gt;

&lt;script&gt;
    function jsonpCallback(data) {
        document.getElementById(&apos;output&apos;).innerHTML = data.province + &quot; &quot; + data.catName;
    } 
    document.getElementById(&apos;search&apos;).onclick = function(){
        var num = document.getElementById(&apos;tel&apos;).value;
        if(/^1[34578]\d{9}$/.test(num)){
            var url = &quot;http://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=&quot; + num + &quot;t=&quot; + Math.random() + &quot;&amp;callback=jsonpCallback&quot;;   
            var JSONP=document.createElement(&quot;script&quot;);    
            JSONP.type=&quot;text/javascript&quot;;    
            JSONP.src= url;    
            document.getElementsByTagName(&quot;head&quot;)[0].appendChild(JSONP);
        } else {
            alert(&quot;&#x60A8;&#x8F93;&#x5165;&#x7684;&#x624B;&#x673A;&#x53F7;&#x6709;&#x8BEF;&quot;)
        }
    };
&lt;/script&gt;
&lt;/html&gt;</code></pre><p>&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#x7684;&#x5168;&#x90E8;js&#x90E8;&#x5206;&#x53EF;&#x4EE5;&#x7528;jQuery&#x5B9E;&#x73B0;&#xFF0C;&#x5982;&#x4E0B;&#xFF1A;</p><pre><code>function jsonpCallback(data) {        
    $(&apos;#output&apos;).text(data.province + &quot; &quot; + data.catName);    
}
$(&apos;#search&apos;).click(function(){
    var num = $(&apos;#tel&apos;).val();
    if(/^1[34578]\d{9}$/.test(num)){
        var url = &quot;http://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=&quot; + num&quot; + &quot;t=&quot; + Math.random();   
        $.ajax({
            url: url, 
            type: &apos;GET&apos;, 
            dataType: &apos;JSONP&apos;,  // &#x5904;&#x7406;Ajax&#x8DE8;&#x57DF;&#x95EE;&#x9898;(&#x672C;&#x8D28;&#x5DF2;&#x4E0D;&#x662F;Ajax)
            success: function(data){ 
                $(&apos;#output&apos;).text(data.province + &quot; &quot; + data.catName);
            }
        });
    } else {
        alert(&quot;&#x60A8;&#x8F93;&#x5165;&#x7684;&#x624B;&#x673A;&#x53F7;&#x6709;&#x8BEF;&quot;)
    }
});</code></pre><h2>&#x5176;&#x4ED6; Ajax &#x53C2;&#x6570;&#x53CA;&#x65B9;&#x6CD5;</h2><ul><li>javascript</li></ul><pre><code>//&#x5C5E;&#x6027;
xhr.responseText;   //&#x4ECE;&#x670D;&#x52A1;&#x5668;&#x8FD4;&#x56DE;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x6570;&#x636E;
xhr.responseXML;   //&#x4ECE;&#x670D;&#x52A1;&#x5668;&#x8FD4;&#x56DE;&#x7684; XML &#x6570;&#x636E;
xhr.status;    //&#x670D;&#x52A1;&#x5668;&#x76F8;&#x5E94;&#x72B6;&#x6001;
xhr.readyState;    //0: &#x8BF7;&#x6C42;&#x672A;&#x521D;&#x59CB;&#x5316;; 1: &#x5DF2;&#x5EFA;&#x7ACB;&#x8FDE;&#x63A5;; 2: &#x8BF7;&#x6C42;&#x5DF2;&#x63A5;&#x6536;; 3: &#x8BF7;&#x6C42;&#x5904;&#x7406;&#x4E2D;; 4: &#x54CD;&#x5E94;&#x5DF2;&#x5C31;&#x7EEA;
xhr.timeout;    //&#x6307;&#x5B9A;&#x591A;&#x5C11;&#x6BEB;&#x79D2;&#x540E;&#x8D85;&#x65F6;&#xFF0C;&#x957F;&#x6574;&#x578B;
xhr.upload;    //&#x83B7;&#x53D6;&#x4E0A;&#x4F20;&#x8FDB;&#x5EA6;
xhr.withCredentials;    //&#x662F;&#x5426;&#x53EF;&#x4EE5;&#x8DE8;&#x6E90;&#xFF0C;boolean &#x578B;&#xFF0C;&#x9ED8;&#x8BA4; false
//&#x65B9;&#x6CD5;
xhr.getResponseHeader(&apos;connection&apos;);   //&#x83B7;&#x53D6;&#x6307;&#x5B9A;&#x5934;&#x4FE1;&#x606F;
xhr.getAllResponseHeaders();   //&#x83B7;&#x5168;&#x90E8;&#x5B9A;&#x5934;&#x4FE1;&#x606F;
xhr.open(&quot;METHOD&quot;, url, isAsyn);   //open&#x65B9;&#x6CD5;&#x6709;3&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F; Boolean &#x578B;&#xFF0C;&#x8868;&#x793A;&#x662F;&#x5426;&#x5F02;&#x6B65;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A; true
xhr.abort();   //&#x7EC8;&#x6B62;&#x8BF7;&#x6C42;&#xFF0C;&#x7F6E;xhr.readyState&#x4E3A;0&#xFF0C;&#x4F46;&#x4E0D;&#x89E6;&#x53D1;onreadystatechange
xhr.overrideMimeType()   //&#x5F3A;&#x5236;&#x91CD;&#x5199; http &#x5934;&#x7684; MIME &#x7C7B;&#x578B;
//&#x4E8B;&#x4EF6;
XMLHttpRequestEventTarget.onreadystatechange   //&#x5728;xhr.readyState&#x5C5E;&#x6027;&#x6539;&#x53D8;&#x65F6;&#x89E6;&#x53D1;
XMLHttpRequestEventTarget.ontimeout   //&#x5728;&#x54CD;&#x5E94;&#x8D85;&#x65F6;&#x65F6;&#x89E6;&#x53D1;
XMLHttpRequestEventTarget.onabort   //&#x5F53;&#x8BF7;&#x6C42;&#x5931;&#x8D25;&#x65F6;&#x8C03;&#x7528;&#x8BE5;&#x65B9;&#x6CD5;
XMLHttpRequestEventTarget.onerror   //&#x5F53;&#x8BF7;&#x6C42;&#x53D1;&#x751F;&#x9519;&#x8BEF;&#x65F6;&#x8C03;&#x7528;&#x8BE5;&#x65B9;&#x6CD5;
XMLHttpRequestEventTarget.onload   //&#x5F53;&#x4E00;&#x4E2A;HTTP&#x8BF7;&#x6C42;&#x6B63;&#x786E;&#x52A0;&#x8F7D;&#x51FA;&#x5185;&#x5BB9;&#x540E;&#x8FD4;&#x56DE;&#x65F6;&#x8C03;&#x7528;&#x3002;
XMLHttpRequestEventTarget.onloadstart   //&#x5F53;&#x4E00;&#x4E2A;HTTP&#x8BF7;&#x6C42;&#x5F00;&#x59CB;&#x52A0;&#x8F7D;&#x6570;&#x636E;&#x65F6;&#x8C03;&#x7528;&#x3002;
XMLHttpRequestEventTarget.onloadend   //&#x5F53;&#x5185;&#x5BB9;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;&#xFF0C;&#x4E0D;&#x7BA1;&#x5931;&#x8D25;&#x4E0E;&#x5426;&#xFF0C;&#x90FD;&#x4F1A;&#x8C03;&#x7528;&#x8BE5;&#x65B9;&#x6CD5;
XMLHttpRequestEventTarget.onprogress   //&#x95F4;&#x6B47;&#x8C03;&#x7528;&#x8BE5;&#x65B9;&#x6CD5;&#x7528;&#x6765;&#x83B7;&#x53D6;&#x8BF7;&#x6C42;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x4FE1;&#x606F;&#x3002;</code></pre><p>&#x6CE8;&#xFF1A;&#x5173;&#x4E8E; xhr.status &#x53EF;&#x80FD;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#xFF0C;&#x8BE6;&#x89C1; <a href="http://blog.csdn.net/faremax/article/details/53703808" rel="nofollow noreferrer">http&#x72B6;&#x6001;&#x7801;</a></p><h2>jQuery &#x4E2D;&#x7684; Ajax &#x65B9;&#x6CD5;</h2><h3>ajax &#x9759;&#x6001;&#x65B9;&#x6CD5;</h3><pre><code>$.ajax({options})    //&#x53D1;&#x8D77;&#x4E00;&#x4E2A; ajax &#x8BF7;&#x6C42;
options &#x5E38;&#x7528;&#x4EE5;&#x4E0B;&#x5C5E;&#x6027;&#x8BBE;&#x7F6E;&#xFF1A;url, method(&quot;GET&quot;/&quot;POST&quot;), crossDomain, accepts(&#x53EF;&#x63A5;&#x53D7;&#x7684;&#x7C7B;&#x578B;), dataType, cache, contentType(&#x7F16;&#x7801;&#x683C;&#x5F0F;), success, error&#x7B49;
$.ajaxSetup({options});    //options&#x540C;&#x4E0A;&#xFF0C;&#x8BBE;&#x7F6E; ajax &#x9ED8;&#x8BA4;&#x53C2;&#x6570;&#xFF0C;&#x4E0D;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528;
$.post(url, data, success, datatype);    //&#x53D1;&#x8D77;&#x4E00;&#x4E2A; POST &#x8BF7;&#x6C42; data&#x4E3A;&#x4F20;&#x9012;&#x53C2;&#x6570;(&#x53EF;&#x9009;), success(reponseText, statusText, xhr)  &#x4E3A;&#x6210;&#x529F;&#x65F6;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;(&#x53EF;&#x9009;), datatype(xml/html/script/json/jsonp/text,&#x53EF;&#x9009;)
$.get(url, data, success, datatype);    //&#x53D1;&#x8D77;&#x4E00;&#x4E2A; GET &#x8BF7;&#x6C42;, &#x53C2;&#x6570;&#x540C;&#x4E0A;
$.getScript(url, data, success)    //&#x4EE5; GET &#x8BF7;&#x6C42;&#x83B7;&#x53D6;&#x4E00;&#x4E2A; JS &#x6587;&#x4EF6;&#x5E76;&#x6267;&#x884C;&#xFF0C;&#x53C2;&#x6570;&#x542B;&#x4E49;&#x540C;&#x4E0A;
$.getJSON(url, data, success)    //&#x4EE5; GET &#x8BF7;&#x6C42;&#x83B7;&#x53D6;&#x4E00;&#x4E2A; JSON &#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x53C2;&#x6570;&#x542B;&#x4E49;&#x540C;&#x4E0A;</code></pre><h3>ajax &#x52A8;&#x6001;&#x65B9;&#x6CD5;</h3><pre><code>$().ajaxComplete(function(){});    //&#x6CE8;&#x518C;Ajax&#x8BF7;&#x6C42;&#x5B8C;&#x6210;&#x65F6;&#x8981;&#x8C03;&#x7528;&#x7684;&#x5904;&#x7406;&#x7A0B;&#x5E8F;
$().ajaxError(function(){});    //&#x6CE8;&#x518C;&#x8981;&#x5728;Ajax&#x8BF7;&#x6C42;&#x5B8C;&#x6210;&#x65F6;&#x9047;&#x5230;&#x9519;&#x8BEF;&#x800C;&#x8C03;&#x7528;&#x7684;&#x5904;&#x7406;&#x7A0B;&#x5E8F;
$().ajaxSend(function(){});    //&#x9644;&#x52A0;&#x8981;&#x5728;&#x53D1;&#x9001;Ajax&#x8BF7;&#x6C42;&#x4E4B;&#x524D;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;
$().ajaxStart(function(){});    //&#x6CE8;&#x518C;&#x5728;&#x7B2C;&#x4E00;&#x4E2A;Ajax&#x8BF7;&#x6C42;&#x5F00;&#x59CB;&#x65F6;&#x8981;&#x8C03;&#x7528;&#x7684;&#x5904;&#x7406;&#x7A0B;&#x5E8F;
$().ajaxStop(function(){});    //&#x6CE8;&#x518C;&#x8981;&#x5728;&#x6240;&#x6709;Ajax&#x8BF7;&#x6C42;&#x5B8C;&#x6210;&#x540E;&#x8C03;&#x7528;&#x7684;&#x5904;&#x7406;&#x7A0B;&#x5E8F;
$().ajaxSuccess(function(){});    //&#x9644;&#x52A0;&#x8981;&#x5728;Ajax&#x8BF7;&#x6C42;&#x6210;&#x529F;&#x5B8C;&#x6210;&#x65F6;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;
$().load(url, data, callback);    //&#x8FD4;&#x56DE;&#x67D0; url &#x7684;&#x6570;&#x636E;&#xFF0C;data&#x4E3A;&#x4F20;&#x9012;&#x53C2;&#x6570;(&#x53EF;&#x9009;), callback(reponseText, statusText, xhr) &#x56DE;&#x8C03;&#x51FD;&#x6570;(&#x53EF;&#x9009;)</code></pre><h3>&#x5176;&#x4ED6;&#x76F8;&#x5173;&#x65B9;&#x6CD5;</h3><pre><code>$.param(obj);    //&#x5C06;&#x5BF9;&#x8C61;&#x8F6C;&#x5316;&#x4E3A;&#x4E00;&#x4E2A; url &#x53C2;&#x6570;&#x5217;&#x8868;
$(form).serialize();    //&#x8868;&#x5355;&#x6570;&#x636E;&#x5E8F;&#x5217;&#x5316;&#x4E3A; url &#x53C2;&#x6570;&#x5217;&#x8868;
$(form).serializeArray();    //&#x540C;&#x4E0A;&#xFF0C;&#x4F46;&#x8FD4;&#x56DE; JSON &#x4E32;</code></pre><h2>&#x7B80;&#x5355;&#x5C01;&#x88C5; Ajax &#x76F8;&#x5173;&#x65B9;&#x6CD5;</h2><p>&#x7B80;&#x5355;&#x6A21;&#x4EFF; jQuery &#x4E2D; <code>$.ajax()</code> &#x65B9;&#x6CD5;</p><pre><code>(function(){
  // Ajax &#x9009;&#x9879;
  var options = {
    type: &quot;GET&quot;,   //&#x63D0;&#x4EA4;&#x65B9;&#x5F0F;
    url: &quot;&quot;,    //&#x8DEF;&#x5F84;
    params: {},   //&#x8BF7;&#x6C42;&#x53C2;&#x6570;
    dataType: &quot;text&quot;,   //&#x5185;&#x5BB9;&#x7C7B;&#x578B;
    success: function(){},   //&#x56DE;&#x8C03;&#x51FD;&#x6570;
    error: function(){}
  };

  //&#x83B7;&#x53D6; XMLHTTPRequest &#x5BF9;&#x8C61;
  var createRequest = function(){
    var xmlhttp;
    if(xmlhttp.XMLHttpRequest){
      xmlhttp = new XMLHttpRequest();
    }
    else{
      xmlhttp = new ActiveXObject(&apos;Microsoft.XMLHTTP&apos;);
    }
    if(xmlhttp.overrideMimeType){
      xmlhttp.overrideMimeType(&apos;text/xml&apos;);  //&#x4FEE;&#x6539; MIME &#x7C7B;&#x578B;
    }
    return xmlhttp;
  },

  // &#x8BBE;&#x5B9A; Ajax &#x9009;&#x9879;
  var setOptions = function(newOptions){
    for(var prop in newOptions){
      if(newOptions.hasOwnProperty(prop)){
        this.option[prop] = newOptions[prop];
      }
    }
  },

  //&#x683C;&#x5F0F;&#x5316;&#x53C2;&#x6570;&#x5217;&#x8868;
  var formatParameters = function(){
    var paramsArr = [];
    var params = this.options.params;
    for(var prop in params){
      if(params.hasOwnProperty(prop)){
        paramsArr.push(prop + &quot;=&quot; + encodeURIComponent(params[prop]));
      }
    }
    return paramsArr.join(&apos;&amp;&apos;);
  },

  //&#x9884;&#x5904;&#x7406;&#x5E76;&#x8C03;&#x7528;&#x76F8;&#x5E94;&#x51FD;&#x6570;
  var readystatechange = function(xmlhttp){
    var returnValue;
    if(xmlhttp.readyState == 4 &amp;&amp; xmlhttp.status == 200){
      switch(this.options.dataType){
        case &apos;xml&apos;:
          returnValue = xmlhttp.responseXML;
          break;
        case &apos;json&apos;:
          returnVaue = xmlhttp.responseText;
          if(returnValue){
            returnValue = eval(&quot;(&quot; + returnValue + &quot;)&quot;);
          }
          break;
        default:
          returnVaue = xmlhttp.responseText;
          break;
      }
      if(returnValue){
        this.options.success(returnValue);
      }
      else{
        this.options.success();
      }
    } else{
      this.options.error();
    }
  },

  //&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;$.ajax()&#x51FD;&#x6570;
  var request = function(options){
    // var ajaxObj = this;

    var xmlhttp = this.createRequest();
    this.setOptions(options);
    xmlhttp.onreadystatechange = this.readystatechange.bind(null, xmlhttp);

    var formatParams = this.formatParameters();
    var type = this.options.type;
    var url = this.options.url;

    if(&quot;GET&quot; === type.toUpperCase()){
      url += &quot;?&quot; + formatParameters;
    }
      xmlhttp.open(type, url, true);

    if(&quot;GET&quot; === type.toUpperCase()){
      xmlhttp.send();
    } else if(&quot;POST&quot; === type.toUpperCase()){
      xmlhttp.setRequestHeader(&quot;Content-Type&quot;, &quot;application/x-www-form-urlencoded&quot;);
      xmlhttp.send(formatParameters);
    }
  }

  window.$.ajax = request;  //&#x66B4;&#x9732;&#x65B9;&#x6CD5;&#x5230;&#x95ED;&#x5305;&#x5916;&#x9762;&#x53BB;
})();</code></pre>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Ajax 与异步数据传输

## 原文链接
[https://segmentfault.com/a/1190000016256627](https://segmentfault.com/a/1190000016256627)

