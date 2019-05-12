---
title: '杂谈：前端Web通信' 
date: 2018-11-20 2:30:10
hidden: true
slug: 3g7o1qbfpid
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/remote/1460000015809507" src="https://static.alili.tech/img/remote/1460000015809507" alt="&#x524D;&#x7AEF;Web&#x901A;&#x4FE1;" title="&#x524D;&#x7AEF;Web&#x901A;&#x4FE1;"></span></p><p>Web2.0&#x4EE5;&#x6765;&#xFF0C;Ajax&#x7684;&#x51FA;&#x4E16;&#xFF0C;&#x89E3;&#x51B3;&#x4E86;&#x4F20;&#x7EDF;&#x8868;&#x5355;&#x63D0;&#x4EA4;&#x9875;&#x9762;&#x8DF3;&#x8F6C;&#xFF0C;&#x95EA;&#x70C1;&#x767D;&#x5C4F;&#x7B49;&#x95EE;&#x9898;&#x3002;&#x4F7F;&#x5F97;Web&#x9875;&#x9762;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x5C40;&#x90E8;&#x66F4;&#x65B0;&#xFF0C;&#x4E0D;&#x4EC5;&#x51CF;&#x5C11;&#x4E86;&#x7F51;&#x7EDC;&#x5E26;&#x5BBD;&#xFF0C;&#x8FD8;&#x5927;&#x5927;&#x63D0;&#x5347;&#x4E86;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#x3002;</p><p>&#x4F46;Ajax&#x5E76;&#x975E;&#x662F;&#x4E00;&#x628A;&#x4E07;&#x80FD;&#x7684;&#x94A5;&#x5319;&#xFF0C;&#x8DB3;&#x4EE5;&#x6253;&#x5F00;Web&#x901A;&#x4FE1;&#x8FD9;&#x6247;&#x5927;&#x95E8;&#xFF0C;&#x5F53;&#x8BF7;&#x6C42;&#x9047;&#x5230;&#x8DE8;&#x57DF;&#x901A;&#x4FE1;&#x65F6;&#xFF0C;Ajax&#x5C31;&#x6CA1;&#x8F99;&#x4E86;&#x3002;</p><p>Web&#x7684;&#x5FEB;&#x901F;&#x53D1;&#x5C55;&#x8BA9;&#x5F00;&#x53D1;&#x8D70;&#x5411;&#x5DE5;&#x7A0B;&#x5316;&#x7684;&#x540C;&#x65F6;&#xFF0C;&#x8981;&#x6C42;&#x5DE5;&#x4F5C;&#x7EF4;&#x5EA6;&#x8FDB;&#x884C;&#x5212;&#x5206;&#xFF08;&#x524D;&#x7AEF;&#x540E;&#x7AEF;&#x5206;&#x5DE5;&#x660E;&#x7EC6;&#xFF09;&#xFF0C;&#x4EE5;&#x4FBF;&#x6269;&#x5C55;&#x7EF4;&#x62A4;&#x65E5;&#x76CA;&#x590D;&#x6742;&#x5E9E;&#x5927;&#x7684;&#x9879;&#x76EE;&#x9700;&#x6C42;&#x3002;&#x800C;&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;&#x7684;&#x5F00;&#x53D1;&#x65B9;&#x5F0F;&#x6B63;&#x662F;&#x8FD9;&#x79CD;&#x9700;&#x6C42;&#x80CC;&#x666F;&#x4E0B;&#x884D;&#x751F;&#x7684;&#x4EA7;&#x7269;&#x3002;&#xFF08;&#x4EE5;&#x524D;&#x6DF7;&#x7F16;&#x7684;&#x4EE3;&#x7801;&#x73B0;&#x5728;&#x662F;&#x518D;&#x4E5F;&#x4E0D;&#x60F3;&#x770B;&#x5230;&#xFF09;</p><p>&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;&#x7684;&#x5F00;&#x53D1;&#x65B9;&#x5F0F;&#xFF0C;&#x5982;&#x4F55;&#x8FDB;&#x884C;&#x6570;&#x636E;&#x901A;&#x4FE1;&#x662F;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x7ED5;&#x4E0D;&#x8FC7;&#x53BB;&#x7684;&#x95EE;&#x9898;&#x3002;&#x4F5C;&#x4E3A;&#x5F00;&#x53D1;&#x540C;&#x5B66;&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x6709;&#x70B9;&#x5C0F;&#x8C03;&#x76AE;&#x8FD8;&#x505A;&#x4E86;&#x4E00;&#x4E2A;&#x540C;&#x6E90;&#x7B56;&#x7565;&#x7684;&#x9650;&#x5236;&#xFF0C;&#x5F53;&#x6211;&#x4EEC;&#x7684;&#x6570;&#x636E;&#x8BF7;&#x6C42;&#x9047;&#x5230;&#x4E0D;&#x540C;&#x6E90;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF08;&#x8DE8;&#x57DF;&#xFF09;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x5F97;&#x5C1D;&#x8BD5;&#x5176;&#x5B83;&#x7684;&#x901A;&#x4FE1;&#x65B9;&#x6CD5;&#xFF0C;&#x4E0D;&#x80FD;Ajax&#x4E00;&#x6761;&#x9053;&#x8D70;&#x5230;&#x9ED1;&#x3002;</p><h3>&#x4EC0;&#x4E48;&#x662F;&#x540C;&#x6E90;&#x7B56;&#x7565;&#x53CA;&#x9650;&#x5236;</h3><blockquote>&#x540C;&#x6E90;&#x7B56;&#x7565;&#x9650;&#x5236;&#x4ECE;&#x4E00;&#x4E2A;&#x6E90;&#x52A0;&#x8F7D;&#x7684;&#x6587;&#x6863;&#x6216;&#x811A;&#x672C;&#x5982;&#x4F55;&#x4E0E;&#x6765;&#x81EA;&#x53E6;&#x4E00;&#x4E2A;&#x6E90;&#x7684;&#x8D44;&#x6E90;&#x8FDB;&#x884C;&#x4EA4;&#x4E92;&#x3002;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x7528;&#x4E8E;&#x9694;&#x79BB;&#x6F5C;&#x5728;&#x6076;&#x610F;&#x6587;&#x4EF6;&#x7684;&#x5173;&#x952E;&#x7684;&#x5B89;&#x5168;&#x673A;&#x5236;&#x3002;</blockquote><p><strong>&#x540C;&#x6E90;&#x8981;&#x6C42;&#x534F;&#x8BAE;&#xFF0C;&#x57DF;&#x540D;&#xFF0C;&#x7AEF;&#x53E3;(&#x9ED8;&#x8BA4;80)&#x4E09;&#x8005;&#x90FD;&#x76F8;&#x540C;&#xFF0C;&#x5426;&#x5219;&#x4E3A;&#x975E;&#x540C;&#x6E90;&#x3002;</strong></p><h4>&#x540C;&#x6E90;&#x7B56;&#x7565;&#x9650;&#x5236;&#xFF1A;</h4><ul><li>Cookie&#xFF0C; LocalStorage&#x548C;IndexDB&#x65E0;&#x6CD5;&#x8BFB;&#x53D6;</li><li>Dom&#x65E0;&#x6CD5;&#x83B7;&#x53D6;</li><li>Ajax&#x8BF7;&#x6C42;&#x4E0D;&#x80FD;&#x53D1;&#x9001;</li></ul><hr><h3>&#x524D;&#x540E;&#x7AEF;&#x5982;&#x4F55;&#x901A;&#x4FE1;</h3><ol><li>Ajax&#xFF08;&#x4EC5;&#x652F;&#x6301;&#x540C;&#x6E90;&#xFF09;</li><li>WebSocket &#xFF08;&#x4E0D;&#x53D7;&#x540C;&#x6E90;&#x9650;&#x5236;&#xFF09;</li><li>CORS &#xFF08;&#x90FD;&#x652F;&#x6301;&#xFF0C;&#x65B0;&#x7684;W3C&#x901A;&#x4FE1;&#x6807;&#x51C6;&#xFF09;</li></ol><h3>&#x5982;&#x4F55;&#x521B;&#x5EFA;Ajax</h3><ul><li>XMLHttpRequest&#x5BF9;&#x8C61;&#x7684;&#x5DE5;&#x4F5C;&#x6D41;&#x7A0B;</li><li>&#x517C;&#x5BB9;&#x6027;&#x5904;&#x7406;</li><li>&#x4E8B;&#x4EF6;&#x7684;&#x89E6;&#x53D1;&#x6761;&#x4EF6;</li><li>&#x4E8B;&#x4EF6;&#x7684;&#x89E6;&#x53D1;&#x987A;&#x5E8F;</li></ul><pre><code>var xhr = XMLHttpRequest ? new XMLHttpRequest() : new window.ActiveXObject(&apos;Microsoft&apos;)
var data = opt.data,
    url = opt.url,
    type = opt.type.toUpperCase(),
    dataArr = [];
for (var k in data) {
    dataArr.push(k + &apos;=&apos; + data[k]);
}
if (type === &apos;GET&apos;) {
    url = url + &apos;?&apos; + dataArr.join(&apos;&amp;&apos;);
    xhr.open(type, url.replace(/\?$/g, &apos;&apos;, true);
    xhr.send();
} 
if (type === &apos;POST&apos;) {
    xhr.open(type, url, true);
    xhr.setRequestHeader(&apos;Content-type&apos;, &apos;application/x-www-form-urlencoded&apos;);
    xhr.send(data.join(&apos;&amp;&apos;));
}
xhr.onload = function() {
    if (xhr.status === 200 || xhr.status === 304) {
        var res;
        if (opt.success &amp;&amp; opt.success instanceof Function) {
            res = xhr.responseText;
            if (typeof res === &apos;string&apos;) {
                res = JSON.parse(res);
                opt.success.call(xhr, res)
            }
        } else {
            if (opt.error &amp;&amp; opt.error instanceof Function) {
                opt.error.call(xhr, res);
            }
        }
    }
}</code></pre><p>&#x540C;&#x6E90;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528;Ajax&#x6765;&#x4E0E;&#x540E;&#x7AEF;&#x540C;&#x5B66;&#x505A;&#x6570;&#x636E;&#x901A;&#x4FE1;&#xFF0C;&#x4F46;&#x662F;&#x9047;&#x5230;&#x8DE8;&#x57DF;&#x8BF7;&#x6C42;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x5F97;&#x66F4;&#x6362;&#x624B;&#x4E2D;&#x8FD9;&#x628A;Ajax&#x7684;&#x94A5;&#x5319;&#xFF0C;&#x6765;&#x91CD;&#x65B0;&#x914D;&#x94A5;&#x5319;&#x5F00;&#x9501;</p><h3>&#x8DE8;&#x57DF;&#x901A;&#x4FE1;&#x7684;&#x51E0;&#x79CD;&#x65B9;&#x5F0F;</h3><ol><li>JSONP</li><li>Hash</li><li>postMessage (HTML5)</li><li>WebSocket</li><li>CORS (&#x65B0;&#x7684;W3C&#x901A;&#x4FE1;&#x6807;&#x51C6;)</li></ol><h4>1. JSONP</h4><p>JSONP&#x539F;&#x7406;&#xFF1A;&#x5BA2;&#x6237;&#x7AEF;&#x901A;&#x8FC7;&#x52A8;&#x6001;&#x521B;&#x5EFA;script&#x6807;&#x7B7E;&#x5F02;&#x6B65;&#x52A0;&#x8F7D;&#x6765;&#x5B9E;&#x73B0;&#xFF0C;&#x670D;&#x52A1;&#x7AEF;callback&#x8FD4;&#x56DE;&#x5BA2;&#x6237;&#x7AEF;&#x5B9A;&#x4E49;&#x7684;&#x65B9;&#x6CD5;&#x540D;&#xFF0C;&#x8BA9;&#x5BA2;&#x6237;&#x7AEF;&#x8FDB;&#x884C;&#x8C03;&#x7528;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x3002;</p><p><strong>&#x53EA;&#x652F;&#x6301;Get&#x8BF7;&#x6C42;</strong> (GET&#x4E0E;POST&#x7684;&#x533A;&#x522B;&#x8FD9;&#x91CC;&#x6682;&#x4E0D;&#x7EC6;&#x8BB2;)</p><pre><code>// &#x5BA2;&#x6237;&#x7AEF;&#x53D1;&#x9001;&#x8BF7;&#x6C42;
&lt;script src=&quot;http://www.abc.com?data=name&amp;callback=jsonpname&quot;&gt;&lt;/script&gt;
&lt;script&gt;
jsonpname({
    data: {
        ...
    }
})
&lt;/script&gt;</code></pre><h4>2. Hash</h4><p>Hash&#x539F;&#x7406;&#xFF1A;&#x901A;&#x8FC7;<code>window.onhashchange</code>&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x6765;&#x83B7;&#x53D6;url&#x4E2D;hash&#x503C;&#x6765;&#x5B9E;&#x73B0;&#x6570;&#x636E;&#x4F20;&#x8F93;&#x3002;&#x4E0E;Get&#x4E00;&#x6837;&#xFF0C;&#x6709;Url&#x957F;&#x5EA6;&#x9650;&#x5236;</p><pre><code>// A&#x4E2D;&#x4EE3;&#x7801;
var B = document.getElementdByTagName(&apos;iframe&apos;);
B.src = B.src + &apos;#&apos; + &apos;data&apos;;
// B&#x4E2D;&#x4EE3;&#x7801;
window.onhashchange = function(){
    var data = window.location.hash;
}</code></pre><h4>3. postMessage</h4><p>postMessage&#x662F;HTML5&#x7684;API&#xFF0C;&#x53EF;&#x53C2;&#x8003;&#x5F00;&#x53D1;&#x6587;&#x6863;<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage" rel="nofollow noreferrer">window.postMessage</a></p><pre><code>// A.com&#x5411;B.com&#x53D1;&#x9001;&#x4FE1;&#x606F;
Bwindow.postMessage(&apos;data&apos;,&apos;http://B.com&apos;)
// B&#x4E2D;&#x76D1;&#x542C;
window.addEventListener(&apos;message&apos;, function(event){
    console.log(event.origin); // http://A.com
    console.log(event.source); // Bwindow
    console.log(event.data); // data
}, false)</code></pre><p>&#x9879;&#x76EE;&#x4E2D;&#x5E94;&#x7528;&#x573A;&#x666F;&#xFF1A;</p><ol><li>&#x9875;&#x9762;&#x548C;&#x5176;&#x6253;&#x5F00;&#x7684;&#x65B0;&#x7A97;&#x53E3;&#x7684;&#x6570;&#x636E;&#x4F20;&#x9012;</li><li>&#x591A;&#x7A97;&#x53E3;&#x4E4B;&#x95F4;&#x6D88;&#x606F;&#x4F20;&#x9012;</li><li>&#x9875;&#x9762;&#x4E0E;&#x5D4C;&#x5957;&#x7684;iframe&#x6D88;&#x606F;&#x4F20;&#x9012;</li><li>&#x4E0A;&#x9762;&#x4E09;&#x4E2A;&#x95EE;&#x9898;&#x7684;&#x8DE8;&#x57DF;&#x6570;&#x636E;&#x4F20;&#x9012;</li></ol><h4>4. WebSocket</h4><p>WebSocket&#x662F;HTML5&#x5F00;&#x59CB;&#x63D0;&#x4F9B;&#x7684;&#x4E00;&#x79CD;&#x5728;&#x5355;&#x4E2A; TCP &#x8FDE;&#x63A5;&#x4E0A;&#x8FDB;&#x884C;&#x5168;&#x53CC;&#x5DE5;&#x901A;&#x8BAF;&#x7684;&#x534F;&#x8BAE;&#xFF0C;&#x672C;&#x8EAB;&#x4E0D;&#x53D7;&#x540C;&#x6E90;&#x9650;&#x5236;&#x3002;</p><pre><code>// WebSocket&#x4EE3;&#x7801;&#x793A;&#x4F8B;
var ws = new WebSocket(&apos;wss://echo.websocket.org&apos;);

ws.onopen = function (evt) {
    console.log(&apos;Connection open ...&apos;);
    ws.send(&apos;Hello WebSocket!&apos;);
};

ws.onmessage = function (evt) {
    console.log(&apos;Received Message: &apos; + evt.data);
    ws.close();
}

ws.onclose = function (evt) {
    console.log(&apos;Connection closed.&apos;);
}</code></pre><h4>5. CORS</h4><p>CORS&#x662F;&#x4E00;&#x4E2A;W3C&#x6807;&#x51C6;&#xFF0C;&#x5168;&#x79F0;&#x662F;&quot;&#x8DE8;&#x57DF;&#x8D44;&#x6E90;&#x5171;&#x4EAB;&quot;&#xFF08;Cross-origin resource sharing&#xFF09;&#x3002;&#x5B83;&#x5141;&#x8BB8;&#x6D4F;&#x89C8;&#x5668;&#x5411;&#x8DE8;&#x6E90;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x53D1;&#x51FA;XMLHttpRequest&#x8BF7;&#x6C42;&#xFF0C;&#x4ECE;&#x800C;&#x514B;&#x670D;&#x4E86;AJAX&#x53EA;&#x80FD;&#x540C;&#x6E90;&#x4F7F;&#x7528;&#x7684;&#x9650;&#x5236;&#x3002;</p><p>&#x6D4F;&#x89C8;&#x5668;&#x517C;&#x5BB9;&#x5728;XHR(IE8/9)&#x53CA;XHR2(&gt;=IE10)&#x4E0B;&#x9700;&#x8981;&#x505A;&#x517C;&#x5BB9;&#x5904;&#x7406;&#x3002;</p><pre><code>// CORS&#x4EE3;&#x7801;&#x793A;&#x4F8B;
fetch(&apos;/url&apos;, {
    method: &apos;get&apos;&#xFF0C;
}).then(function(res){
    ...
}).catch(function(err) {
    // &#x9519;&#x8BEF;
})</code></pre><h3>-- End --</h3><p>JSONP&#x6709;&#x66F4;&#x597D;&#x7684;&#x517C;&#x5BB9;&#x6027;&#xFF0C;&#x80FD;&#x517C;&#x5BB9;&#x4F4E;&#x7248;&#x672C;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x4F46;&#x662F;&#x57FA;&#x4E8E;Get&#x4F20;&#x8F93;&#x6570;&#x636E;&#xFF0C;&#x4F1A;&#x56E0;&#x4E3A;&#x6D4F;&#x89C8;&#x5668;Url&#x957F;&#x5EA6;&#x9650;&#x5236;&#x800C;&#x9650;&#x5236;&#x6570;&#x636E;&#x5927;&#x5C0F;&#x3002;CORS&#x5728;&#x4E0D;&#x8003;&#x8651;&#x4F4E;&#x7248;&#x672C;&#x6D4F;&#x89C8;&#x5668;&#x65F6;&#xFF0C;&#x65E0;&#x7591;&#x662F;&#x76EE;&#x524D;&#x6700;&#x597D;&#x524D;&#x540E;&#x7AEF;&#x901A;&#x4FE1;&#x65B9;&#x6848;&#xFF08;&#x5355;&#x5411;&#xFF09;&#xFF0C;&#x53CC;&#x5411;&#x9009;&#x62E9;WebSocket&#xFF0C;&#x800C;&#x591A;&#x4E2A;&#x9875;&#x9762;&#x4E4B;&#x95F4;&#x7684;&#x6570;&#x636E;&#x901A;&#x4FE1;&#xFF0C;&#x5982;&#x5185;&#x5D4C;iFrame&#x7B49;&#xFF0C;&#x5219;&#x63A8;&#x8350;postMessage&#x3002;</p><p>&#x6BCF;&#x79CD;&#x65B9;&#x6848;&#x6709;&#x4E0D;&#x540C;&#x7684;&#x5E94;&#x7528;&#x573A;&#x666F;&#xFF0C;&#x89E3;&#x51B3;&#x95EE;&#x9898;&#x4E0D;&#x53EA;&#x6709;&#x4E00;&#x79CD;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF0C;&#x5B9E;&#x9645;&#x9879;&#x76EE;&#x5F00;&#x53D1;&#x4E2D;&#xFF0C;&#x9700;&#x6839;&#x636E;&#x5B9E;&#x9645;&#x9700;&#x6C42;&#x6765;&#x6311;&#x9009;&#x6700;&#x4F18;&#x7684;&#x65B9;&#x6848;&#x3002;</p><hr><p>&#x53C2;&#x8003;&#x8D44;&#x6599;</p><ol><li><a href="https://www.cnblogs.com/dolphinX/p/3464056.html" rel="nofollow noreferrer">html5 postMessage&#x89E3;&#x51B3;&#x8DE8;&#x57DF;&#x3001;&#x8DE8;&#x7A97;&#x53E3;&#x6D88;&#x606F;&#x4F20;&#x9012;</a></li><li><a href="https://mp.weixin.qq.com/s?__biz=MjM5MDI3MjA5MQ==&amp;mid=2697266201&amp;idx=2&amp;sn=1b2ca738a21c6d899e82fa6fe769446b&amp;chksm=8376fb2db401723b8a88295bfb74f98bddc2eb52dabffe221ec2f06ed49885f3e606231796d5&amp;mpshare=1&amp;scene=1&amp;srcid=0703jbtAFe3qTgBHtxuzBfgt&amp;pass_ticket=ml9eF7+G5p9IAyQPuOX/q0esEXgr51fhWBL88VWLmzU=#rd" rel="nofollow noreferrer">&#x5E72;&#x8D27; | &#x524D;&#x7AEF;&#x5E38;&#x7528;&#x7684;&#x901A;&#x4FE1;&#x6280;&#x672F;</a></li><li><a href="http://www.ruanyifeng.com/blog/2016/04/cors.html" rel="nofollow noreferrer">&#x962E;&#x4E00;&#x5CF0; &#x2014; &#x8DE8;&#x57DF;&#x8D44;&#x6E90;&#x5171;&#x4EAB; CORS &#x8BE6;&#x89E3;</a></li><li><a href="https://blog.csdn.net/jlin991/article/details/57083865" rel="nofollow noreferrer">CORS&#x6B63;&#x786E;&#x4F7F;&#x7528;&#x59FF;&#x52BF;</a></li></ol><blockquote>&#x4F5C;&#x8005;&#xFF1A;&#x4EE5;&#x4E50;&#x4E4B;&#x540D;<br>&#x672C;&#x6587;&#x539F;&#x521B;&#xFF0C;&#x6709;&#x4E0D;&#x5F53;&#x7684;&#x5730;&#x65B9;&#x6B22;&#x8FCE;&#x6307;&#x51FA;&#x3002;&#x8F6C;&#x8F7D;&#x8BF7;&#x6307;&#x660E;&#x51FA;&#x5904;&#x3002;</blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
杂谈：前端Web通信

## 原文链接
[https://segmentfault.com/a/1190000015809504](https://segmentfault.com/a/1190000015809504)

