---
title: React Native Fetch封装那点事...
hidden: true
categories: [reprint]
slug: 427b815b
date: 2018-11-13 02:30:09
---

{{< raw >}}
<p>&#x6BCF;&#x4E00;&#x95E8;&#x8BED;&#x8A00;&#x90FD;&#x79BB;&#x4E0D;&#x5F00;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#xFF0C;&#x6709;&#x81EA;&#x5DF1;&#x7684;&#x4E00;&#x5957;Networking Api&#x3002;React Native&#x4F7F;&#x7528;&#x7684;&#x662F;Fetch&#x3002; &#x4ECA;&#x5929;&#x6211;&#x4EEC;&#x6765;&#x8C08;&#x8C08;&#x4E0E;Fetch&#x76F8;&#x5173;&#x7684;&#x4E00;&#x4E9B;&#x4E8B;&#x60C5;&#x3002;</p><h2>purpose</h2><p>&#x901A;&#x8FC7;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#xFF0C;&#x4F60;&#x5C06;&#x4E86;&#x89E3;&#x5230;&#x4EE5;&#x4E0B;&#x51E0;&#x70B9;&#x5173;&#x4E8E;Fetch&#x7684;&#x72EC;&#x5BB6;&#x62A5;&#x9053;</p><ul><li>Fetch&#x7684;&#x7B80;&#x5355;&#x8FD0;&#x7528;</li><li>Fetch&#x7684;&#x4E3B;&#x8981;Api</li><li>Fetch&#x4F7F;&#x7528;&#x6CE8;&#x610F;&#x4E8B;&#x9879;</li><li>Fetch&#x7684;Promise&#x5C01;&#x88C5;</li></ul><h2>fetch</h2><p>fetch&#x7684;&#x4F7F;&#x7528;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x53EA;&#x9700;&#x4F20;&#x5165;&#x8BF7;&#x6C42;&#x7684;url</p><pre><code>fetch(&apos;https://facebook.github.io/react-native/movies.json&apos;);</code></pre><p>&#x5F53;&#x7136;&#x662F;&#x5426;&#x8BF7;&#x6C42;&#x6210;&#x529F;&#x4E0E;&#x6570;&#x636E;&#x7684;&#x5904;&#x7406;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x9700;&#x5904;&#x7406;&#x6210;&#x529F;&#x4E0E;&#x5931;&#x8D25;&#x7684;&#x56DE;&#x8C03;</p><pre><code>function getMoviesFromApiAsync() {
  return fetch(&apos;https://facebook.github.io/react-native/movies.json&apos;)
    .then((response) =&gt; response.json())
    .then((responseJson) =&gt; {
      return responseJson.movies;
    })
    .catch((error) =&gt; {
      console.error(error);
    });
}</code></pre><p>&#x901A;&#x8FC7;response.json()&#x5C06;&#x8BF7;&#x6C42;&#x7684;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#x8F6C;&#x5316;&#x6210;json&#x6570;&#x636E;&#x4EE5;&#x4FBF;&#x4F7F;&#x7528;&#x3002;&#x901A;&#x8FC7;<code>.then</code>&#x6765;&#x5BF9;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x8F6C;&#x5316;&#x5904;&#x7406;&#x6216;&#x6700;&#x7EC8;&#x66B4;&#x9732;&#x7ED9;&#x8C03;&#x7528;&#x8005;&#xFF1B;<code>.catch</code>&#x5BF9;&#x5F02;&#x5E38;&#x7684;&#x5904;&#x7406;&#x3002;</p><p>&#x4EE5;&#x4E0A;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#xFF0C;&#x8BE5;&#x8BF7;&#x6C42;&#x9ED8;&#x8BA4;&#x662F;get&#x65B9;&#x5F0F;&#x3002;&#x90A3;&#x4E48;post&#x53C8;&#x8BE5;&#x5982;&#x4F55;&#x8BF7;&#x6C42;&#x5462;&#xFF1F;</p><h2>Api &amp; Note</h2><p>&#x5728;fetch&#x4E2D;&#x6211;&#x4EEC;&#x76F4;&#x63A5;&#x4F20;&#x5165;url&#x8FDB;&#x884C;&#x8BF7;&#x6C42;&#xFF0C;&#x5176;&#x5B9E;&#x5185;&#x90E8;&#x672C;&#x8D28;&#x662F;&#x4F7F;&#x7528;&#x4E86;Request&#x5BF9;&#x8C61;&#xFF0C;&#x53EA;&#x662F;&#x5C06;url&#x51FA;&#x5165;&#x5230;&#x4E86;Request&#x5BF9;&#x8C61;&#x4E2D;&#x3002;</p><pre><code>const myRequest = new Request(&apos;https://facebook.github.io/react-native/movies.json&apos;);
 
const myURL = myRequest.url; // https://facebook.github.io/react-native/movies.jsonflowers.jpg
const myMethod = myRequest.method; // GET
 
fetch(myRequest)
  .then(response =&gt; response.json())
  .then(responseJson =&gt; {
    //todo
  });</code></pre><p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x8BF7;&#x6C42;post&#xFF0C;&#x9700;&#x8981;&#x6539;&#x53D8;Request&#x7684;method&#x5C5E;&#x6027;&#x3002;</p><pre><code>fetch(&apos;https://mywebsite.com/endpoint/&apos;, {
  method: &apos;POST&apos;,
  headers: {
    Accept: &apos;application/json&apos;,
    &apos;Content-Type&apos;: &apos;application/json&apos;,
  },
  body: JSON.stringify({
    firstParam: &apos;yourValue&apos;,
    secondParam: &apos;yourOtherValue&apos;,
  }),
});</code></pre><p>&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x5728;url&#x540E;&#x76F4;&#x63A5;&#x4F20;&#x5165;{}&#x5BF9;&#x8C61;&#xFF0C;&#x5176;&#x4E2D;&#x6307;&#x5B9A;method&#x4F7F;&#x7528;post&#x3002;</p><p>&#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x5E94;&#x8BE5;&#x90FD;&#x77E5;&#x9053;get&#x4E0E;post&#x7684;&#x4E00;&#x4E2A;&#x4E3B;&#x8981;&#x533A;&#x522B;&#x662F;get&#x53EF;&#x4EE5;&#x5728;url&#x4E0A;&#x76F4;&#x63A5;&#x6DFB;&#x52A0;&#x53C2;&#x6570;&#xFF0C;&#x800C;post&#x4E3A;&#x4E86;&#x5B89;&#x5168;&#x90FD;&#x4E0D;&#x91C7;&#x7528;&#x76F4;&#x63A5;&#x5C06;&#x53C2;&#x6570;&#x8FFD;&#x52A0;&#x5230;url&#x4E0A;&#xFF0C;&#x800C;&#x662F;&#x4F7F;&#x7528;body&#x6765;&#x4F20;&#x7ED9;service&#x7AEF;&#x3002;</p><p>&#x5728;&#x4F7F;&#x7528;body&#x524D;&#xFF0C;&#x8FD9;&#x91CC;&#x8FD8;&#x9700;&#x77E5;&#x9053;headers&#x3002;&#x4E0B;&#x9762;&#x67D0;&#x4E2A;post&#x8BF7;&#x6C42;&#x7684;headers&#x4FE1;&#x606F;</p><p><span class="img-wrap"><img data-src="/img/bVbf8wY?w=564&amp;h=170" src="https://static.alili.tech/img/bVbf8wY?w=564&amp;h=170" alt="clipboard.png" title="clipboard.png"></span></p><blockquote>&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;Content-Type&#x5B57;&#x6BB5;&#xFF0C;&#x5B83;&#x4EE3;&#x8868;&#x7684;&#x662F;service&#x7AEF;&#x63A5;&#x6536;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;&#xFF0C;&#x56FE;&#x7247;&#x4E2D;&#x4F7F;&#x7528;&#x7684;&#x662F;application/x-www-form-urlencoded&#x3002;&#x8FD9;&#x5BF9;&#x4E8E;&#x6211;&#x4EEC;&#x7684;body&#x6765;&#x8BF4;&#x662F;&#x975E;&#x5E38;&#x91CD;&#x8981;&#x7684;&#x3002;&#x53EA;&#x6709;&#x5339;&#x914D;Content-Type&#x7684;&#x7C7B;&#x578B;&#x624D;&#x80FD;&#x6B63;&#x786E;&#x7684;&#x4F20;&#x9012;&#x53C2;&#x6570;&#x4FE1;&#x606F;&#x3002;</blockquote><p>&#x793A;&#x4F8B;&#x7684;&#x4EE3;&#x7801;&#x4F7F;&#x7528;&#x7684;&#x662F;application/json&#xFF0C;&#x6240;&#x4EE5;body&#x4F7F;&#x7528;Json.stringify()&#x8FDB;&#x884C;&#x53C2;&#x6570;&#x8F6C;&#x6362;&#xFF0C;&#x800C;&#x5BF9;&#x4E8E;Content-Type&#x4E3A;application/x-www-form-urlencoded&#xFF0C;&#x9700;&#x8981;&#x4F7F;&#x7528;queryString.stringify()&#x3002;</p><p>Request&#x4E2D;&#x9664;&#x4E86;method&#x3001;headers&#x4E0E;body&#xFF0C;&#x8FD8;&#x6709;&#x4EE5;&#x4E0B;&#x5C5E;&#x6027;</p><ul><li>Request.cache: &#x8BF7;&#x6C42;&#x7684;&#x7F13;&#x5B58;&#x6A21;&#x5F0F;(default/reload/no-cache)</li><li>Request.context: &#x8BF7;&#x6C42;&#x7684;&#x4E0A;&#x4E0B;&#x6587;(audio/image/iframe)</li><li>Request.credentials: &#x8BF7;&#x6C42;&#x7684;&#x8BC1;&#x4E66;(omit/same-origin/include)</li><li>Request.destination: &#x8BF7;&#x6C42;&#x7684;&#x5185;&#x5BB9;&#x63CF;&#x8FF0;&#x7C7B;&#x578B;</li><li>Request.integrity: &#x8BF7;&#x6C42;&#x7684; subresource integrity</li><li>Request.mode: &#x8BF7;&#x6C42;&#x7684;&#x6A21;&#x5F0F;(cors/no-cors/same-origin/navigate)</li><li>Request.redirect: &#x8BF7;&#x6C42;&#x7684;&#x91CD;&#x5B9A;&#x5411;&#x65B9;&#x5F0F;(follow/error/manual)</li><li>Request.referrer: &#x8BF7;&#x6C42;&#x7684;&#x6765;&#x6E90;(client)</li><li>Request.referrerPolicy: &#x8BF7;&#x6C42;&#x7684;&#x6765;&#x6E90;&#x653F;&#x7B56;(no-referrer)</li><li>Request.bodyUsed: &#x58F0;&#x660E;body&#x662F;&#x5426;&#x4F7F;&#x7528;&#x5728;response&#x4E2D;</li></ul><p>&#x8BF7;&#x6C42;&#x6210;&#x529F;&#x4E4B;&#x540E;&#xFF0C;&#x4F7F;&#x7528;.then&#x6765;&#x8F6C;&#x6362;&#x6570;&#x636E;&#xFF0C;&#x4F7F;&#x7528;&#x6700;&#x591A;&#x7684;&#x662F;Body.json()&#xFF0C;&#x5F53;&#x7136;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4EE5;&#x4E0B;&#x7684;&#x51E0;&#x79CD;&#x6570;&#x636E;&#x8F6C;&#x6362;&#x7C7B;&#x578B;</p><ul><li>Body.arrayBuffer</li><li>Body.blob</li><li>Body.formData</li><li>Body.text</li></ul><p>&#x4EE5;&#x4E0A;&#x662F;fetch&#x8BF7;&#x6C42;&#x76F8;&#x5173;&#x7684;&#x5C5E;&#x6027;&#x4E0E;&#x65B9;&#x6CD5;&#x3002;&#x5982;&#x679C;&#x4F60;&#x5DF2;&#x7ECF;&#x6709;&#x6240;&#x4E86;&#x89E3;&#xFF0C;&#x90A3;&#x4E48;&#x606D;&#x559C;&#x4F60;&#x5BF9;fetch&#x7684;&#x57FA;&#x672C;&#x4F7F;&#x7528;&#x5DF2;&#x7ECF;&#x8FC7;&#x5173;&#x4E86;&#xFF0C;&#x4E0B;&#x9762;&#x5BF9;fetch&#x7684;&#x4F7F;&#x7528;&#x8FDB;&#x884C;&#x5C01;&#x88C5;&#x3002;</p><h2>&#x5C01;&#x88C5;</h2><p>&#x5728;&#x5B9E;&#x9645;&#x5F00;&#x53D1;&#x4E2D;&#xFF0C;url&#x7684;host&#x90FD;&#x662F;&#x76F8;&#x540C;&#x7684;&#xFF0C;&#x4E0D;&#x540C;&#x7684;&#x662F;&#x8BF7;&#x6C42;&#x7684;&#x65B9;&#x6CD5;&#x540D;&#x4E0E;&#x53C2;&#x6570;&#x3002;&#x800C;&#x5BF9;&#x4E8E;&#x4E0D;&#x540C;&#x7684;&#x73AF;&#x5883;(debug|release)&#x8BF7;&#x6C42;&#x7684;&#x65B9;&#x5F0F;&#x4E5F;&#x53EF;&#x80FD;&#x4E0D;&#x540C;&#x3002;&#x4F8B;&#x5982;&#xFF1A;&#x5728;debug&#x73AF;&#x5883;&#x4E2D;&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x8C03;&#x8BD5;&#x67E5;&#x770B;&#x8BF7;&#x6C42;&#x7684;&#x53C2;&#x6570;&#x662F;&#x5426;&#x6B63;&#x786E;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x4F7F;&#x7528;get&#x6765;&#x8FDB;&#x884C;&#x8BF7;&#x6C42;&#x3002;&#x6240;&#x4EE5;&#x5728;&#x5C01;&#x88C5;&#x4E4B;&#x524D;&#x8981;&#x660E;&#x786E;&#x4EC0;&#x4E48;&#x662F;&#x4E0D;&#x53D8;&#x7684;&#xFF0C;&#x4EC0;&#x4E48;&#x662F;&#x53D8;&#x5316;&#x7684;&#xFF0C;&#x6210;&#x529F;&#x4E0E;&#x5931;&#x8D25;&#x7684;&#x54CD;&#x5E94;&#x5904;&#x7406;&#x3002;</p><p>&#x7ECF;&#x8FC7;&#x4E0A;&#x9762;&#x7684;&#x5206;&#x6790;&#xFF0C;&#x7F57;&#x5217;&#x4E00;&#x4E0B;&#x5C01;&#x88C5;&#x9700;&#x8981;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x3002;</p><ul><li>&#x4E0D;&#x53D8;&#x7684;: host,headers,body.json()</li><li>&#x53D8;&#x5316;&#x7684;: url,method,body</li><li>&#x54CD;&#x5E94;&#x65B9;&#x5F0F;: Promise(resolve/reject)</li></ul><pre><code>function convertUrl(url, params) {
    let realUrl = ApiModule.isDebug?
        url + &quot;?&quot; + queryString.stringify(Object.assign({}, params, commonParams)) : url;

    if (ApiModule.isDebug) {
        console.log(&quot;request: &quot; + realUrl);
    }
    return realUrl;
}</code></pre><p>&#x9996;&#x5148;&#x5BF9;url&#x4E0E;&#x53C2;&#x6570;params&#x8FDB;&#x884C;&#x62FC;&#x63A5;&#xFF0C;&#x5982;&#x679C;&#x4E3A;debug&#x6A21;&#x5F0F;&#x5C06;params&#x62FC;&#x63A5;&#x5230;url&#x540E;&#x3002;&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x5230;&#x4E86;Object.assign()&#x5C06;params&#x4E0E;commonParams&#x7EC4;&#x5408;&#x6210;&#x4E00;&#x4E2A;{}&#x5BF9;&#x8C61;&#x3002;&#x6700;&#x7EC8;&#x901A;&#x8FC7;queryString.stringify&#x8F6C;&#x5316;&#x6210;string&#x3002;</p><blockquote>ApiModule.isDebug&#x662F;&#x539F;&#x751F;&#x4F20;&#x9012;&#x8FC7;&#x6765;&#x7684;&#x503C;&#xFF0C;&#x5BF9;&#x4E8E;Android/IOS&#x53EA;&#x9700;&#x4F20;&#x9012;&#x81EA;&#x5DF1;&#x7684;ApiModule&#x5373;&#x53EF;&#x3002;</blockquote><pre><code>function getMethod() {
    return ApiModule.isDebug? &quot;get&quot;: &quot;post&quot;;
}</code></pre><p>&#x4E0A;&#x8FF0;&#x63D0;&#x5230;&#x7684;get&#x4E0E;post&#x7684;&#x8BF7;&#x6C42;&#x65F6;&#x673A;&#x3002;</p><pre><code>const headers = {
    Accept: &apos;application/json&apos;,
    &quot;Content-Type&quot;: &quot;application/x-www-form-urlencoded;charset=UTF-8&quot;
};</code></pre><p>&#x5728;headers&#x4E2D;Content-Type&#x7C7B;&#x578B;&#x4E3A;application/x-www-form-urlencode</p><pre><code>function convertBody(params) {
    return ApiModule.isDebug? undefined : queryString.stringify(Object.assign({}, params, commonParams));
}</code></pre><p>&#x7531;&#x4E8E;debug&#x6A21;&#x5F0F;&#x4F7F;&#x7528;&#x7684;&#x662F;get&#x65B9;&#x5F0F;&#xFF0C;&#x4F46;get&#x89C4;&#x5B9A;&#x662F;&#x4E0D;&#x80FD;&#x6709;body&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x4E86;undefined&#x6765;&#x6807;&#x8BC6;&#x3002;&#x540C;&#x65F6;&#x4E3A;&#x4E86;&#x5339;&#x914D;headers&#x4E2D;&#x7684;Content-Type&#xFF0C;params&#x7684;&#x8F6C;&#x5316;&#x5FC5;&#x987B;&#x4F7F;&#x7528;queryString.stringify&#xFF1B;&#x5982;&#x679C;&#x63A5;&#x53D7;&#x7684;&#x662F;json,&#x53EF;&#x4EE5;&#x4F7F;&#x7528;JSON.stringify&#x3002;</p><p>&#x5B9A;&#x4E49;&#x5B8C;&#x4E4B;&#x540E;fetch&#x5BF9;&#x5916;&#x53EA;&#x9700;&#x63A5;&#x53D7;params&#x53C2;&#x6570;&#x5373;&#x53EF;&#x3002;</p><pre><code>async function fetchRequest(params){
    let body = convertBody(params);
    fetch(convertUrl(baseUrl, params),{
        method: method,
        headers: headers,
        body: body
    })
    .then((response) =&gt; response.json())
    .then((responseJson) =&gt; {
        //todo success
    })
    .catch((error) =&gt; {
        if (ApiModule.isDebug) {
            console.error(&quot;request error: &quot; + error);
        };
        //todo error
    });
}</code></pre><p>fetch&#x7684;&#x8BF7;&#x6C42;&#x5C01;&#x88C5;&#x5B8C;&#x6210;&#xFF0C;&#x4F46;&#x6211;&#x4EEC;&#x7684;&#x6210;&#x529F;&#x4E0E;&#x5931;&#x8D25;&#x7684;&#x72B6;&#x6001;&#x5E76;&#x6CA1;&#x6709;&#x901A;&#x77E5;&#x7ED9;&#x8C03;&#x7528;&#x8005;&#xFF0C;&#x6240;&#x4EE5;&#x8FD8;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x56DE;&#x8C03;&#x673A;&#x5236;&#x3002;Promise&#x662F;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x6700;&#x7EC8;&#x5B8C;&#x6210;&#x6216;&#x8005;&#x5931;&#x8D25;&#x7684;&#x5BF9;&#x8C61;&#x3002;&#x5B83;&#x53EF;&#x4EE5;&#x63A5;&#x53D7;&#x4E24;&#x4E2A;&#x51FD;&#x6570;resolve&#x3001;reject</p><pre><code>const p = new Promise((resolve, reject){
    ...
    //success
    resolve(&apos;success&apos;)
    //error
    reject(&apos;error&apos;)
});
//use
p.then(success =&gt; {
        console.log(success);
    }, error =&gt; {
          console.log(error)    
});</code></pre><p>&#x5C06;fetch&#x8BF7;&#x6C42;&#x653E;&#x5165;&#x5230;Promise&#x7684;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x4E2D;&#xFF0C;&#x8FD9;&#x6837;&#x4E00;&#x65E6;&#x6570;&#x636E;&#x6210;&#x529F;&#x8FD4;&#x56DE;&#x5C31;&#x8C03;&#x7528;resolve&#x51FD;&#x6570;&#x56DE;&#x8C03;&#x7ED9;&#x8C03;&#x7528;&#x8005;&#xFF1B;&#x5931;&#x8D25;&#x8C03;&#x7528;reject&#x51FD;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x5931;&#x8D25;&#x4FE1;&#x606F;&#x3002;&#x800C;&#x8C03;&#x7528;&#x8005;&#x53EA;&#x9700;&#x4F7F;&#x7528;Promise&#x7684;.then&#x65B9;&#x6CD5;&#x7B49;&#x5019;&#x6570;&#x636E;&#x7684;&#x56DE;&#x8C03;&#x901A;&#x77E5;&#x3002;&#x4E0B;&#x9762;&#x6765;&#x770B;&#x4E0B;&#x5B8C;&#x6574;&#x7684;fetch&#x5C01;&#x88C5;&#x3002;</p><pre><code>async function fetchRequest(params){
    let body = convertBody(params);
    return new Promise(function(resolve, reject){
        fetch(convertUrl(baseUrl, params),{
            method: method,
            headers: headers,
            body: body
        })
        .then((response) =&gt; response.json())
        .then((responseJson) =&gt; {
            resolve(responseJson);
        })
        .catch((error) =&gt; {
            if (ApiModule.isDebug) {
                console.error(&quot;request error: &quot; + error);
            };
            reject(error);
        });
    });
}</code></pre><p>&#x4E4B;&#x540E;&#x5BF9;fetch&#x7684;&#x4F7F;&#x7528;&#x5C31;&#x975E;&#x5E38;&#x7B80;&#x5355;&#x4E86;&#xFF0C;&#x53EA;&#x9700;&#x4F20;&#x5165;&#x9700;&#x8981;&#x7684;&#x53C2;&#x6570;&#x5373;&#x53EF;&#x3002;</p><pre><code>fetchRequest({method: &quot;goods.getInfo&quot;, goodsId: 27021599158370074})
.then(res =&gt;{
    this.setState({
        shareInfo: res.data.shareInfo
    });
});</code></pre><p>&#x4EE5;&#x4E0A;&#x662F;&#x6709;&#x5173;fetch&#x7684;&#x5168;&#x90E8;&#x5185;&#x5BB9;&#xFF0C;&#x5F53;&#x7136;&#x5728;React Native&#x4E2D;&#x8FD8;&#x6709;&#x5176;&#x5B83;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x8BF7;&#x6C42;&#x5E93;&#xFF1A;XMLHttpRequest&#xFF0C;&#x540C;&#x65F6;&#x4E5F;&#x652F;&#x6301;WebSockets&#x3002;&#x611F;&#x5174;&#x8DA3;&#x7684;&#x4E5F;&#x53EF;&#x4EE5;&#x53BB;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;&#xFF0C;&#x76F8;&#x4FE1;&#x4F1A;&#x6709;&#x4E0D;&#x9519;&#x7684;&#x6536;&#x83B7;&#x3002;</p><h2>&#x7CBE;&#x9009;&#x6587;&#x7AE0;</h2><p><a href="https://segmentfault.com/a/1190000016149881">5&#x5206;&#x949F;&#x5403;&#x900F;React Native Flexbox</a></p><p><a href="https://segmentfault.com/a/1190000016128693">ViewDragHelper&#x4E4B;&#x624B;&#x52BF;&#x64CD;&#x4F5C;&#x795E;&#x5668;</a></p><p><a href="https://segmentfault.com/a/1190000011994447">tensorflow-&#x68AF;&#x5EA6;&#x4E0B;&#x964D;,&#x6709;&#x8FD9;&#x4E00;&#x7BC7;&#x5C31;&#x8DB3;&#x591F;&#x4E86;</a></p><p><a href="https://segmentfault.com/a/1190000005753446">&#x4E03;&#x5927;&#x6392;&#x5E8F;&#x7B97;&#x6CD5;&#x603B;&#x7ED3;(java)</a></p><p>&#x62C9;&#x7C89;&#x73AF;&#x8282;&#xFF1A;&#x611F;&#x89C9;&#x4E0D;&#x9519;&#x7684;&#x53EF;&#x4EE5;&#x6765;&#x4E00;&#x6CE2;&#x5173;&#x6CE8;&#xFF0C;&#x626B;&#x63CF;&#x4E0B;&#x65B9;&#x4E8C;&#x7EF4;&#x7801;&#xFF0C;&#x5173;&#x6CE8;&#x516C;&#x4F17;&#x53F7;&#xFF0C;&#x53CA;&#x65F6;&#x83B7;&#x53D6;&#x6700;&#x65B0;&#x77E5;&#x8BC6;&#x6280;&#x5DE7;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbfPXQ?w=600&amp;h=600" src="https://static.alili.tech/img/bVbfPXQ?w=600&amp;h=600" alt="clipboard.png" title="clipboard.png"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React Native Fetch封装那点事...

## 原文链接
[https://segmentfault.com/a/1190000016200068](https://segmentfault.com/a/1190000016200068)

