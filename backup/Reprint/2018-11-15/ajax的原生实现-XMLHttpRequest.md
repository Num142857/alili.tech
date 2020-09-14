---
title: 'ajax的原生实现-XMLHttpRequest' 
date: 2018-11-15 21:20:48
hidden: true
slug: 273qf47m3vk
categories: [reprint]
---

{{< raw >}}
<blockquote>ajax &#x5373;&#x201C;Asynchronous Javascript And XML&#x201D;&#xFF08;&#x5F02;&#x6B65; JavaScript &#x548C; XML&#xFF09;&#xFF0C;&#x662F;&#x6307;&#x4E00;&#x79CD;&#x521B;&#x5EFA;&#x4EA4;&#x4E92;&#x5F0F;&#x7F51;&#x9875;&#x5E94;&#x7528;&#x7684;&#x7F51;&#x9875;&#x5F00;&#x53D1;&#x6280;&#x672F;&#x3002;&#x5F53;&#x521D;JavaScript&#x7684;&#x53D8;&#x9769;&#x5C31;&#x662F;ajax&#x7684;&#x51FA;&#x73B0;&#x800C;&#x6539;&#x53D8;&#x3002;&#x5728;&#x73B0;&#x4EE3;web&#x9886;&#x57DF;&#x5BF9;&#x6570;&#x636E;&#x7684;&#x5F02;&#x6B65;&#x52A0;&#x8F7D;&#x548C;&#x5C40;&#x90E8;&#x66F4;&#x65B0;&#x4E0A;&#x4E5F;&#x5728;&#x5927;&#x91CF;&#x91C7;&#x7528;ajax&#x8FD9;&#x9879;&#x6280;&#x672F;&#x3002;<br>&#x76EE;&#x524D;&#x6D4F;&#x89C8;&#x5668;&#x5728;&#x4F7F;&#x7528;ajax&#x6280;&#x672F;&#x4E0A;&#x90FD;&#x662F;&#x4F7F;&#x7528;XMLHttpRequest(XHR)&#x5BF9;&#x8C61;&#x6765;&#x5BF9;&#x670D;&#x52A1;&#x5668;&#x8FDB;&#x884C;&#x4EA4;&#x4E92;&#x3002;&#x5BF9;&#x4E8E;IE&#x4F4E;&#x7248;&#x672C;&#xFF08;6/7&#xFF09;&#x4E0A;&#x5219;&#x662F;&#x4F7F;&#x7528;&#x7684;&#x53E6;&#x4E00;&#x79CD;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#xFF08;ActiveXObject),&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4ECE;URL&#x83B7;&#x53D6;&#x6570;&#x636E;&#xFF0C;&#x800C;&#x4E0D;&#x7528;&#x8BA9;&#x6574;&#x4E2A;&#x9875;&#x9762;&#x5237;&#x65B0;&#xFF0C;&#x4ECE;&#x800C;&#x5B9E;&#x73B0;&#x5C40;&#x90E8;&#x5237;&#x65B0;&#x3002;&#x8FD9;&#x6837;&#x8BF7;&#x6C42;&#x7684;&#x6B21;&#x6570;&#x4E5F;&#x4F1A;&#x5927;&#x5927;&#x51CF;&#x5C11;,&#x6709;&#x6548;&#x8282;&#x7EA6;&#x8D44;&#x6E90;&#x6D6A;&#x8D39;&#x3002;XMLHttpRequest&#x7684;&#x4EA4;&#x4E92;&#x539F;&#x7406;&#x5219;&#x662F;XMLHttpRequst&#x8BF7;&#x6C42;&#x4E8B;&#x4EF6;&#x76EE;&#x6807;&#xFF08;XMLHttpRequestEventTarget)&#x4ECE;&#x800C;&#x5230;&#x8FBE;&#x540E;&#x7AEF;&#x4E8B;&#x4EF6;&#x76EE;&#x6807;&#x3002;&#x4E8B;&#x4EF6;&#x76EE;&#x6807;&#x5BF9;&#x8BF7;&#x6C42;&#x4E8B;&#x4EF6;&#x8FDB;&#x884C;&#x9A8C;&#x8BC1;&#x5B9E;&#x73B0;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#xFF0C;&#x6700;&#x540E;&#x53EF;&#x4EE5;&#x54CD;&#x5E94;&#x5904;&#x7406;&#x7ED3;&#x679C;&#x4E0E;&#x524D;&#x7AEF;&#x4EA4;&#x4E92;&#x3002;XMLHttpRequest&#x4E0D;&#x5149;&#x80FD;&#x8BF7;&#x6C42;XML&#x7C7B;&#x578B;&#x7684;&#x6570;&#x636E;&#xFF08;&#x6587;&#x672C;&#x3001;&#x56FE;&#x7247;&#x3001;html&#xFF0C;&#x4FE1;&#x606F;&#x6D41;&#x7B49;&#xFF09;&#xFF0C;&#x540C;&#x6837;&#x8FD8;&#x652F;&#x6301;HTTP&#x4EE5;&#x5916;&#x7684;&#x534F;&#x8BAE;&#xFF0C;&#x6BD4;&#x5982;&#x6587;&#x4EF6;&#x6D41;&#x548C;ftp&#x7B49;&#x7B49;&#x3002;&#x7C7B;&#x4F3C;&#x7684;&#x8FD8;&#x6709;WebSockets&#xFF08;&#x5168;&#x53CC;&#x5DE5;&#x901A;&#x4FE1;&#xFF09;&#xFF0C;Server-Sent event&#xFF08;HTML5&#x670D;&#x52A1;&#x5668;&#x53D1;&#x9001;&#x4E8B;&#x4EF6;&#xFF09;&#x3002;</blockquote><h2>XMLHttpRequest&#x5BF9;&#x8C61;&#x7684;&#x4F7F;&#x7528;</h2><p>&#x5728;&#x4F7F;&#x7528;<code>XMLHttpRequest</code>&#x4E4B;&#x524D;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x521D;&#x59CB;&#x5316;&#x4E00;&#x4E2A;<code>XMLHttpRequest</code>&#x5BF9;&#x8C61;&#xFF0C;&#x624D;&#x80FD;&#x4F7F;&#x7528;&#x5B83;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x3002;</p><p><strong>&#x5E38;&#x7528;&#x65B9;&#x6CD5;&#x548C;&#x5C5E;&#x6027;&#xFF1A;</strong></p><pre><code class="text">// &#x521D;&#x59CB;&#x5316;&#x5BF9;&#x8C61;&#xFF0C;&#x5C06;&#x6700;&#x5148;&#x8C03;&#x7528;&#x8BE5;&#x5BF9;&#x8C61;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;
var oReq = new XMLHttpRequest(); &#xA0;
oReq.open(method,url,async);  // &#x521D;&#x59CB;&#x5316;&#x4E00;&#x4E2A;&#x8BF7;&#x6C42;&#xFF0C;&#x4F8B;&#x5982; oReq.open(&apos;GET&apos;,url,true)


++++++++++++++++++++++++++++++++++++++++++
function reqListener () {
  console.log(this.responseText);
}
var oReq = new XMLHttpRequest();
oReq.onload = reqListener; // &#x8BF7;&#x6C42;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;&#x8C03;&#x7528;&#x6B64;&#x65B9;&#x6CD5;
oReq.open(&quot;get&quot;, &quot;yourFile.txt&quot;, true);
oReq.send();
// XMLHttpRequest&#x540C;&#x6837;&#x4E5F;&#x652F;&#x6301;&#x591A;&#x79CD;&#x65F6;&#x95F4;&#x7ED1;&#x5B9A;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x89E6;&#x53D1;&#x65F6;&#x95F4;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x7ED1;&#x5B9A;&#x6267;&#x884C;&#x51FD;&#x6570;
var req = new XMLHttpRequest();
req.addEventListener(&quot;progress&quot;, updateProgress, false);
req.addEventListener(&quot;load&quot;, transferComplete, false);
req.addEventListener(&quot;error&quot;, transferFailed, false);
req.addEventListener(&quot;abort&quot;, transferCanceled, false);
req.open();
//&#x6CE8;&#x610F;&#xFF1A;&#x5FC5;&#x987B;&#x5728;open()&#x4E4B;&#x524D;&#x6DFB;&#x52A0;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#xFF0C;&#x5426;&#x5219;progress(&#x8FDB;&#x5EA6;)&#x4E8B;&#x4EF6;&#x5C06;&#x4E0D;&#x4F1A;&#x88AB;&#x89E6;&#x53D1;
// &#x6B64;&#x5916;XMLHttpRequest&#x8FD8;&#x80FD;&#x591F;&#x63A5;&#x6536;&#x4E8C;&#x8FDB;&#x5236;&#x6570;&#x636E;&#xFF0C;&#x5177;&#x4F53;&#x64CD;&#x4F5C;&#x53EF;&#x4EE5;&#x9605;&#x8BFB;&#x76F8;&#x5173;&#x6587;&#x6863;
var BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder || window.BlobBuilder;
var oReq = new XMLHttpRequest();
oReq.open(&quot;GET&quot;, &quot;/myfile.png&quot;, true);
oReq.responseType = &quot;arraybuffer&quot;;
oReq.onload = function(oEvent) {
  var blobBuilder = new BlobBuilder();
  blobBuilder.append(oReq.response);
  var blob = blobBuilder.getBlob(&quot;image/png&quot;);
  // ...
};
oReq.send();
+++++++++++++++++++++++++++++++++++++++++++++


oReq.setRequestHeader(header,value); //&#x9488;&#x5BF9;post&#x65B9;&#x6CD5;&#x9700;&#x8981;&#x8BBE;&#x7F6E;&#x5934;&#x90E8;&#x4FE1;&#x606F;&#x624D;&#x80FD;&#x6709;&#x6548;&#x89E3;&#x6790;&#x53C2;&#x6570;
oReq.setRequestHeader(&apos;content-type&apos;,&apos;application/x-www-form-urlencoded&apos;);
oReq.send()&#x65B9;&#x6CD5;&#xFF0C;&#x5982;&#x679C;&#x662F;get&#x534F;&#x8BAE;&#x53EF;&#x4EE5;&#x4E3A;&#x7A7A;&#xFF0C;&#x4F46;&#x662F;&#x5982;&#x679C;&#x662F;post&#x534F;&#x8BAE;&#xFF0C;&#x5219;&#x4F20;&#x9012;&#x7ED9;&#x670D;&#x52A1;&#x7AEF;&#x7684;&#x53C2;&#x6570;&#x9700;&#x8981;&#x5728;&#x8FD9;&#x91CC;&#x9762;&#x6307;&#x5B9A;
xhr.send(&quot;foo=bar&amp;lorem=ipsum&quot;);  // post&#x8868;&#x5355;&#x6570;&#x636E;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;for/in&#x62FC;&#x63A5;&#x5B57;&#x7B26;&#x4E32;&#x6765;&#x8FDB;&#x884C;
// xhr.send(&apos;string&apos;); 
// xhr.send(new Blob()); 
// xhr.send(new Int8Array()); 
// xhr.send({ form: &apos;data&apos; }); 
// xhr.send(document);
oReq.onreadystatechange = fn;  // &#x5728;readyStatus&#x5C5E;&#x6027;&#x72B6;&#x6001;&#x53D1;&#x751F;&#x6539;&#x53D8;&#x65F6;&#x89E6;&#x53D1;
// &#x5F53;readyStatus&#x5C31;&#x7EEA;&#x72B6;&#x6001;&#x53D1;&#x751F;&#x6539;&#x53D8;&#x65F6;&#x8C03;&#x7528;&#x51FD;&#x6570;&#xFF0C;&#x72B6;&#x6001;&#x6709;0-4
xhr.onreadystatechange = function() {
 &#xA0;  if(xhr.readyState == XMLHttpRequest.DONE &amp;&amp; xhr.status == 200) {
 &#xA0; &#xA0; &#xA0;  // &#x8BF7;&#x6C42;&#x7ED3;&#x675F;&#x540E;,&#x5728;&#x6B64;&#x5904;&#x5199;&#x5904;&#x7406;&#x4EE3;&#x7801;
 &#xA0;  }
}
oReq.response // &#x8FD4;&#x56DE;&#x54CD;&#x5E94;&#x7684;&#x6B63;&#x6587;&#xFF0C;&#x5B83;&#x548C;reponseText&#x7684;&#x533A;&#x522B;&#x662F;&#xFF0C;response&#x8FD8;&#x53EF;&#x4EE5;&#x662F;&#x5176;&#x4ED6;&#x7C7B;&#x578B;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x4E0D;&#x5149;&#x662F;&#x6587;&#x672C;&#x7C7B;&#x578B;
oReq.responseText // &#x8BF7;&#x6C42;&#x6210;&#x529F;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x54CD;&#x5E94;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x5982;&#x679C;&#x53D1;&#x9001;&#x5931;&#x8D25;&#x6216;&#x672A;&#x53D1;&#x9001;&#x5219;&#x8FD4;&#x56DE;null
var xhr = new XMLHttpRequest();
xhr.open(&apos;GET&apos;, &apos;/server&apos;, true);
// If specified, responseType must be empty string or &quot;text&quot;
xhr.responseType = &apos;text&apos;;
xhr.onload = function () {
 &#xA0;  if (xhr.readyState === xhr.DONE) {
 &#xA0; &#xA0; &#xA0;  if (xhr.status === 200) {
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;  console.log(xhr.response);
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;  console.log(xhr.responseText);
 &#xA0; &#xA0; &#xA0;  }
 &#xA0;  }
};
xhr.send(null);
// &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65E0;&#x7B26;&#x53F7;&#x8BF7;&#x6C42;&#x54CD;&#x5E94;&#x72B6;&#x6001;&#xFF0C;&#x6BD4;&#x5982; 200&#xFF0C;304,501,404
oReq.status 
&#x5176;&#x4ED6;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x6253;&#x5370;XMLHttpRequest&#x5BF9;&#x8C61;&#x6216;&#x8005;&#x53C2;&#x8003;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x6765;&#x8FDB;&#x884C;&#x4F7F;&#x7528;
</code></pre><h2>get&#x65B9;&#x5F0F;</h2><p>&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7F13;&#x5B58;&#x95EE;&#x9898;&#x548C;&#x7F16;&#x7801;,&#x9488;&#x5BF9;&#x4E2D;&#x6587;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;url&#x7F16;&#x7801;&#x5DE5;&#x5177;&#x8FDB;&#x884C;&#x5904;&#x7406;&#xFF0C;&#x5BF9;&#x4E8E;&#x7F13;&#x5B58;&#x95EE;&#x9898;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x6DFB;&#x52A0;&#x65F6;&#x95F4;&#x968F;&#x673A;&#x6570;&#x6765;&#x89E3;&#x51B3;&#x3002;</p><pre><code class="javascript">var xhr = new XMLHttpRequest();
// &#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;true&#x5219;&#x4F7F;&#x7528;&#x5F02;&#x6B65;I/O&#x5904;&#x7406;&#x65B9;&#x5F0F;&#xFF0C;fase&#x4E3A;&#x540C;&#x6B65;I/O&#x5904;&#x7406;&#x65B9;&#x5F0F;(&#x963B;&#x585E;&#x5F0F;&#xFF0C;&#x5728;&#x6CA1;&#x6709;&#x54CD;&#x5E94;&#x6570;&#x636E;&#x8FD4;&#x56DE;&#x65F6;&#x7A0B;&#x5E8F;&#x4F1A;&#x7B49;&#x5F85;&#xFF09;
xhr.open(&apos;get&apos;,&apos;index.php?username&apos;+encodeURI(&apos;&#x4E25;&#x603B;&apos;)+&apos;&amp;age=30&amp;&apos;+ new Date().getTime(),true);
xhr.send();
xhr.onreadystatechange = function(){
 &#xA0; &#xA0;if(xhr.readyState == 4){
 &#xA0; &#xA0; &#xA0; &#xA0;consoel.log(xhr.responseText);
 &#xA0;  } else {
 &#xA0; &#xA0; &#xA0; &#xA0;console.log(&apos;status:&apos;+xhr.status);
 &#xA0; &#xA0; &#xA0; &#xA0;return false;
 &#xA0;  }
};
</code></pre><h2>post&#x65B9;&#x5F0F;&#xFF1A;</h2><p>&#x58F0;&#x660E;&#x4E86;&#x8BF7;&#x6C42;&#x5934;&#x4E4B;&#x540E;&#x4F1A;&#x81EA;&#x52A8;&#x8FDB;&#x884C;&#x7F16;&#x7801;&#xFF0C;&#x4E5F;&#x6CA1;&#x6709;&#x7F13;&#x5B58;&#x95EE;&#x9898;</p><pre><code class="html">&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
 &#xA0; &#xA0;&lt;meta charset=&quot;UTF-8&quot;&gt;
 &#xA0; &#xA0;&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
 &#xA0; &#xA0;&lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
 &#xA0; &#xA0;&lt;title&gt;Document&lt;/title&gt;
 &#xA0; &#xA0;&lt;style&gt;
 &#xA0; &#xA0; &#xA0; &#xA0;
 &#xA0; &#xA0;&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;input type=&quot;button&quot; id=&quot;btn&quot; value=&quot;request&quot;&gt;
&lt;/body&gt;
&lt;script&gt;
 &#xA0; var oBtn = document.querySelector(&apos;#btn&apos;);
 &#xA0; var userData = {
 &#xA0; &#xA0; &#xA0; &#xA0;username:&apos;boole&apos;,
 &#xA0; &#xA0; &#xA0; &#xA0;age:30,
 &#xA0; &#xA0; &#xA0; &#xA0;address:&apos;china&apos;
 &#xA0;  };
 &#xA0; oBtn.addEventListener(&apos;click&apos;,function(){
 &#xA0; &#xA0; &#xA0; var xhr = null;
 &#xA0; &#xA0; &#xA0; // &#x517C;&#x5BB9;&#x4F4E;&#x7248;&#x672C;IE&#xFF0C;&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x5F02;&#x5E38;&#x5904;&#x7406;&#x5206;&#x652F;&#x5B8C;&#x6210;&#xFF0C;&#x9632;&#x6B62;&#x62A5;&#x9519;&#x963B;&#x65AD;&#x7A0B;&#x5E8F;&#x8FD0;&#x884C;
 &#xA0; &#xA0; &#xA0; try{
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; xhr = new XMLHttpRequest(); &#xA0; 
 &#xA0; &#xA0; &#xA0; } catch(e){
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; xhr = new ActiveXObject(&apos;Microsoft.XMLHTTP&apos;);
 &#xA0; &#xA0; &#xA0; }
 &#xA0; &#xA0; &#xA0; &#xA0;xhr.open(&apos;post&apos;,&apos;index.php&apos;,true);
 &#xA0; &#xA0; &#xA0; &#xA0;xhr.setRequestHeader(&apos;content-type&apos;,&apos;application/x-www-form-urlencoded&apos;);
 &#xA0; &#xA0; &#xA0; &#xA0;xhr.send(changeData(userData));
 &#xA0; &#xA0; &#xA0; &#xA0;xhr.onreadystatechange = function(){
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;if(xhr.readyState ==4){
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;console.log(xhr.responseText);
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;//&#x5B57;&#x7B26;&#x4E32;&#x5F62;&#x5F0F;&#x7684;&#x54CD;&#x5E94;&#x6570;&#x636E;&#x9700;&#x8981;&#x8FDB;&#x884C;&#x8F6C;&#x6362;&#x6210;&#x5BF9;&#x8C61;&#x624D;&#x80FD;&#x4F7F;&#x7528;
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;console.log(JSON.parse(xhr.responseText).username);
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;// &#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;eval&#x9884;&#x6267;&#x884C;&#x7684;&#x65B9;&#x5F0F;&#x8FDB;&#x884C;&#x8F6C;&#x6362;
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;var responseData = eval(&apos;(&apos;+xhr.responseText+&apos;)&apos;);
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;for(item in responseData){
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;console.log(item + &apos;=&apos; + responseData[item]);
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;  }
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;  } else {
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;console.log(xhr.status);
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;  }
 &#xA0; &#xA0; &#xA0;  };
});
function changeData(oData){
 &#xA0; &#xA0;var str = &apos;&apos;;
 &#xA0; &#xA0;for(item in oData){
 &#xA0; &#xA0; &#xA0; &#xA0;str += &apos;&amp;&apos; + item + &apos;=&apos; + oData[item];
 &#xA0;  }
 &#xA0; &#xA0;return str.slice(1);
}
&lt;/script&gt;
&lt;/html&gt;
</code></pre><p>&#x540E;&#x53F0;&#x5728;&#x63A5;&#x6536;&#x5230;&#x6570;&#x636E;&#x4E4B;&#x540E;&#xFF0C;&#x5728;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#x7684;&#x65F6;&#x5019;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;json&#x7684;&#x683C;&#x5F0F;&#x8FDB;&#x884C;&#x8FD4;&#x56DE;&#xFF08;&#x4F8B;&#x5982;&#xFF1A;echo json_encode($arr);)</p><p>&#x6CE8;&#x610F;&#xFF1A; &#x540E;&#x7AEF;&#x8FD4;&#x56DE;&#x7684;responseText&#x603B;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x683C;&#x5F0F;&#xFF0C;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x5C5E;&#x6027;&#x65B9;&#x6CD5;&#x662F;&#x4E0D;&#x80FD;&#x83B7;&#x53D6;&#x5230;&#x6570;&#x636E;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5BF9;&#x54CD;&#x5E94;&#x7684;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x683C;&#x5F0F;&#x8F6C;&#x6362;&#x3002;<br>&#x65B9;&#x6CD5;&#x6709;&#x4E24;&#x79CD;&#xFF0C;&#x5982;&#x679C;&#x540E;&#x7AEF;&#x8FD4;&#x56DE;&#x7684;&#x662F;json&#x683C;&#x5F0F;&#x7684;&#xFF0C;&#x90A3;&#x4E48;XMLHttpRequest&#x63A5;&#x6536;&#x7684;&#x65F6;&#x5019;&#x56DE;&#x8F6C;&#x6362;&#x6210;&#x5B57;&#x7B26;&#x4E32;&#x5F62;&#x5F0F;&#x7684;&#xFF0C;<br>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;JSON.parse(str)&#xA0;&#x548C;&#xA0;eval(&apos;(&apos;+str+&apos;)&apos;)&#x8FDB;&#x884C;&#x8F6C;&#x6362;&#x6210;json&#x5BF9;&#x8C61;&#x7684;&#x5F62;&#x5F0F;&#xFF0C;&#x8FD9;&#x6837;&#x4E00;&#x6765;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;for/in&#x5BF9;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x8FED;&#x4EE3;&#x5904;&#x7406;&#x3002;&#x53EF;&#x4EE5;&#x52A8;&#x6001;&#x66F4;&#x65B0;&#x9875;&#x9762;&#x6570;&#x636E;</p><pre><code class="javascript">// &#x6B64;&#x5904;&#x56DE;&#x63D0;&#x793A;undefined&#xFF0C;&#x56E0;&#x4E3A;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x5F62;&#x5F0F;&#x7684;&#x6570;&#x636E;
console.log(xhr.responseText.username);
// &#x8F6C;&#x6362;&#x65B9;&#x5F0F;&#x4E00;
var reponseData = JSON.parse(xhr.responseText);
// &#x6293;&#x6362;&#x65B9;&#x5F0F;&#x4E8C;
var reponseData = eval(&apos;(&apos;+xhr.responseText+&apos;)&apos;);
</code></pre><h2>XMLHttpRequest&#x51FD;&#x6570;&#x7684;&#x5C01;&#x88C5;</h2><pre><code class="html">&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
 &lt;head&gt; 
 &#xA0;&lt;meta charset=&quot;UTF-8&quot; /&gt; 
 &#xA0;&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt; 
 &#xA0;&lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot; /&gt; 
 &#xA0;&lt;title&gt;Document&lt;/title&gt; 
 &#xA0;&lt;style&gt;
 &#xA0; &#xA0; &#xA0; &#xA0;
 &#xA0; &#xA0;&lt;/style&gt; 
 &lt;/head&gt; 
 &lt;body&gt; 
 &#xA0;&lt;input type=&quot;button&quot; id=&quot;btn&quot; value=&quot;request&quot; /&gt; 
 &#xA0;&lt;ul id=&quot;ul&quot;&gt;&lt;/ul&gt; &#xA0;
 &#xA0;&lt;script&gt;
 &#xA0; var oBtn = document.querySelector(&apos;#btn&apos;);
 &#xA0; var userData = {
 &#xA0; &#xA0; &#xA0; &#xA0;username:&apos;boole&apos;,
 &#xA0; &#xA0; &#xA0; &#xA0;age:30,
 &#xA0; &#xA0; &#xA0; &#xA0;address:&apos;china&apos;
 &#xA0;  };
 &#xA0; oBtn.addEventListener(&apos;click&apos;,function(){
 &#xA0; &#xA0;// &#x5B9A;&#x65F6;&#x8BF7;&#x6C42;&#x5C40;&#x90E8;&#x66F4;&#x65B0;
 &#xA0; &#xA0;setInterval(
 &#xA0; &#xA0;ajax(&apos;post&apos;,&apos;index.php&apos;,userData,function(data){
 &#xA0; &#xA0; &#xA0; &#xA0;var data = JSON.parse(data);
 &#xA0; &#xA0; &#xA0; &#xA0;var oUl = document.querySelector(&apos;#ul&apos;);
 &#xA0; &#xA0; &#xA0; &#xA0;var aLi = &apos;&apos;;
 &#xA0; &#xA0; &#xA0; &#xA0;for (item in data){
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;aLi +=&apos;&lt;li&gt;&apos; + item + &apos;[&apos; + data[item] + &apos;]&lt;/li&gt;&apos;;
 &#xA0; &#xA0; &#xA0;  }
 &#xA0; &#xA0; &#xA0; &#xA0;oUl.innerHTML = aLi,document.innerHTML = oUl;
 &#xA0;  }),2000 &#xA0; &#xA0;
 &#xA0;  );
});
// ajax&#x51FD;&#x6570;&#x5C01;&#x88C5;&#xFF0C;&#x5BF9;&#x53EF;&#x53D8;&#x6570;&#x636E;&#x8BBE;&#x7F6E;&#x5F62;&#x53C2;
function ajax(method,url,data,success){
 &#xA0; &#xA0;var str = &apos;&apos;,xhr = null;
 &#xA0; &#xA0;if(data instanceof Array || (typeof data == &apos;string&apos;)){
 &#xA0; &#xA0; &#xA0; &#xA0;console.log(&apos;parameter type error&apos;);
 &#xA0; &#xA0; &#xA0; &#xA0;return false;
 &#xA0;  } else {
 &#xA0; &#xA0; &#xA0; &#xA0;for(item in data){
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;str += &apos;&amp;&apos; + item + &apos;=&apos; + data[item];
 &#xA0; &#xA0; &#xA0;  }
 &#xA0; &#xA0; &#xA0; &#xA0;str = str.slice(1);
 &#xA0;  }
 &#xA0; &#xA0;console.log(str);
 &#xA0; &#xA0; &#xA0; // &#x517C;&#x5BB9;&#x4F4E;&#x7248;&#x672C;IE&#xFF0C;&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x5F02;&#x5E38;&#x5904;&#x7406;&#x5206;&#x652F;&#x5B8C;&#x6210;&#xFF0C;&#x9632;&#x6B62;&#x62A5;&#x9519;&#x963B;&#x65AD;&#x7A0B;&#x5E8F;&#x8FD0;&#x884C;
 &#xA0; &#xA0; &#xA0; try{
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; xhr = new XMLHttpRequest(); &#xA0; 
 &#xA0; &#xA0; &#xA0; } catch(e){
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; xhr = new ActiveXObject(&apos;Microsoft.XMLHTTP&apos;);
 &#xA0; &#xA0; &#xA0; }
 &#xA0; &#xA0; &#xA0; if(method == &apos;get&apos; &amp;&amp; data){
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; url += &apos;?&apos; + str + &apos;&amp;&apos; + new Date().getTime();
 &#xA0; &#xA0; &#xA0; } 
 &#xA0; &#xA0; &#xA0; &#xA0;xhr.open(method,url,true);
 &#xA0; &#xA0; &#xA0; &#xA0;if(method == &apos;get&apos;){
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;xhr.send();
 &#xA0; &#xA0; &#xA0;  } else {
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;xhr.setRequestHeader(&apos;content-type&apos;,&apos;application/x-www-form-urlencoded&apos;);
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;xhr.send(str);
 &#xA0; &#xA0; &#xA0;  }
 &#xA0; &#xA0; &#xA0; 
 &#xA0; &#xA0; &#xA0; &#xA0;xhr.onreadystatechange = function(){
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;if(xhr.readyState == 4){
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;if(xhr.status == 200){
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;console.log(xhr.responseText);
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;success &amp;&amp; success(xhr.responseText);
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;  } else {
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;alert(&apos;&#x8BF7;&#x6C42;&#x5931;&#x8D25;&#xFF0C;&#x72B6;&#x6001;&#x7801;&#xFF1A;&apos;+ xhr.status);
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;  }
 &#xA0; &#xA0; &#xA0; &#xA0; &#xA0;  }
 &#xA0; &#xA0; &#xA0;  };
}
&lt;/script&gt; &#xA0;
 &lt;/body&gt;
&lt;/html&gt;</code></pre><p>&#x53C2;&#x8003;&#x6587;&#x732E;&#xFF1A;<br><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest" rel="nofollow noreferrer">MDN-Web-DOCS-XMLHttpRequest</a><br><a href="https://xhr.spec.whatwg.org/#introduction" rel="nofollow noreferrer">W3C.ORG-XMLHttpRequest</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ajax的原生实现-XMLHttpRequest

## 原文链接
[https://segmentfault.com/a/1190000016068856](https://segmentfault.com/a/1190000016068856)

