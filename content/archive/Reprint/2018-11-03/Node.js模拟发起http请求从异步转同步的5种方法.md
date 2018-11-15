---
title: Node.js模拟发起http请求从异步转同步的5种方法
hidden: true
categories: reprint
slug: 112e24ba
date: 2018-11-03 02:30:12
---

{{< raw >}}
<p>&#x4F7F;&#x7528;<code>Node.js</code>&#x6A21;&#x62DF;&#x53D1;&#x8D77;<code>http</code>&#x8BF7;&#x6C42;&#x5F88;&#x5E38;&#x7528;&#x7684;,&#x4F46;&#x662F;&#x7531;&#x4E8E;<code>Node</code>&#x6A21;&#x5757;&#xFF08;&#x539F;&#x751F;&#x548C;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#xFF09;&#x63D0;&#x4F9B;&#x91CC;&#x9762;&#x7684;&#x65B9;&#x6CD5;&#x90FD;&#x662F;&#x5F02;&#x6B65;&#xFF0C;&#x5BF9;&#x4E8E;&#x5F88;&#x591A;&#x573A;&#x666F;&#x4E0B;&#x5E94;&#x7528;&#x5F88;&#x9EBB;&#x70E6;&#xFF0C;&#x4E0D;&#x5982;&#x540C;&#x6B65;&#x6765;&#x7684;&#x65B9;&#x4FBF;&#x3002;&#x4E0B;&#x9762;&#x603B;&#x7ED3;&#x4E86;&#x51E0;&#x4E2A;&#x5E38;&#x89C1;&#x7684;&#x5E93;<code>API</code>&#x4ECE;&#x5F02;&#x6B65;&#x8F6C;&#x540C;&#x6B65;&#x7684;&#x51E0;&#x79CD;&#x65B9;&#x6CD5;&#x3002;&#x6A21;&#x5757;&#x6709;&#xFF1A;<code>request</code>, <code>request-promise</code> , <code>request-promise-native</code> , <code>request-promise-any</code></p><p>PS&#xFF1A;<code>Node&#x7684;&#x7248;&#x672C;&gt;=8.0.0 &#x4E3A;&#x4E86;&#x4F7F;&#x7528; Async / Await</code><br>PS: &#x8FD9;&#x91CC;&#x52A0;&#x5165;<code>auth</code> &#x5B57;&#x6BB5;&#x662F;&#x4E3A;&#x4E86;&#x9700;&#x8981;&#x7528;&#x6237;&#x540D;&#x548C;&#x5BC6;&#x7801;&#x767B;&#x5F55;&#x7684;&#x5E94;&#x7528;&#x7684;&#x8BF7;&#x6C42; &#xFF0C;&#x6BD4;&#x5982;<code>rabbitmq</code> ,&#x4E0D;&#x9700;&#x8981;&#x767B;&#x5F55;&#x7684;&#x9875;&#x9762;&#x53EF;&#x4EE5;&#x53BB;&#x6389;&#x8FD9;&#x4E2A;&#x53C2;&#x6570;&#x3002;</p><h2 id="articleHeader0">&#x7B2C;&#x4E00;&#x79CD;</h2><p>&#x4F7F;&#x7528;&#x539F;&#x751F;&#x6A21;&#x5757; <code>util</code> , &#x5229;&#x7528;&#x5176; <code>promisify</code> <code>API</code> &#xFF0C; &#x4EE3;&#x7801;&#x793A;&#x4F8B;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const request = require(&apos;request&apos;);
const util = require(&apos;util&apos;);
var url = &quot;https://www.baidu.com/&quot;;
const getPromise = util.promisify(request.get);
// PS: &#x8FD9;&#x91CC;&#x52A0;&#x5165;auth &#x5B57;&#x6BB5;&#x662F;&#x4E3A;&#x4E86;&#x9700;&#x8981;&#x7528;&#x6237;&#x540D;&#x548C;&#x5BC6;&#x7801;&#x767B;&#x5F55;&#x7684;&#x5E94;&#x7528;&#x7684;&#x8BF7;&#x6C42; &#xFF0C;&#x6BD4;&#x5982;rabbitmq ,&#x4E0D;&#x9700;&#x8981;&#x767B;&#x5F55;&#x7684;&#x9875;&#x9762;&#x53EF;&#x4EE5;&#x53BB;&#x6389;&#x8FD9;&#x4E2A;&#x53C2;&#x6570;&#x3002;

//1&#xFF1A;  &#x539F;&#x751F;&#x5199;&#x6CD5;  &#x65E0;auth &#x53C2;&#x6570;
getPromise(url).then((value)=&gt;{
    console.log(&quot;value&quot; , value );
}).catch((err)=&gt;{
    console.log(&quot;err&quot; , err );
});

//2&#xFF1A;  &#x539F;&#x751F;&#x5199;&#x6CD5;  &#x6709;auth &#x53C2;&#x6570;
getPromise(url , {&apos;auth&apos; : {
    &apos;user&apos; : &apos;xx&apos;,
    &apos;pass&apos; : &apos;xx&apos;,
    &apos;sendImmediately&apos; : &apos;false&apos;,
}}).then((value)=&gt;{
    console.log(&quot;value&quot; , value );
}).catch((err)=&gt;{
    console.log(&quot;err&quot; , err );
});

// &#x7B2C;&#x4E8C;&#x79CD;&#x5199;&#x6CD5;   async/await

// &#x4E2A;&#x4EBA;&#x6700;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528;&#x8FD9;&#x79CD; &#xFF0C; &#x53EA;&#x4F7F;&#x7528;util &#x548C; request &#x3002;

async function handle(){

    let result = await getPromise(url , {&apos;auth&apos; : {
        &apos;user&apos; : &apos;xx&apos;,
        &apos;pass&apos; : &apos;xx&apos;,
        &apos;sendImmediately&apos; : &apos;false&apos;,
    }});
    // &#x53EF;&#x4EE5;&#x52A0;&#x5165; try catch &#x6355;&#x83B7;&#x5F02;&#x5E38;  &#x4E5F;&#x53EF;&#x4EE5;&#x52A0; .catch()
    console.log(&quot;result&quot; , result.);
}

handle();

PS: `auth` &#x53C2;&#x6570;&#x7684;&#x7528;&#x6CD5;&#x53C2;&#x8003;[&#x94FE;&#x63A5;][1]  , &#x5728;&#x5F02;&#x6B65;&#x53D8;&#x540C;&#x6B65;&#x4E2D; &#x4E0D;&#x80FD;&#x4F7F;&#x7528;  `request.get().auth()` &#x5199;&#x6CD5;&#x3002;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> request = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;request&apos;</span>);
<span class="hljs-keyword">const</span> util = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;util&apos;</span>);
<span class="hljs-keyword">var</span> url = <span class="hljs-string">&quot;https://www.baidu.com/&quot;</span>;
<span class="hljs-keyword">const</span> getPromise = util.promisify(request.get);
<span class="hljs-comment">// PS: &#x8FD9;&#x91CC;&#x52A0;&#x5165;auth &#x5B57;&#x6BB5;&#x662F;&#x4E3A;&#x4E86;&#x9700;&#x8981;&#x7528;&#x6237;&#x540D;&#x548C;&#x5BC6;&#x7801;&#x767B;&#x5F55;&#x7684;&#x5E94;&#x7528;&#x7684;&#x8BF7;&#x6C42; &#xFF0C;&#x6BD4;&#x5982;rabbitmq ,&#x4E0D;&#x9700;&#x8981;&#x767B;&#x5F55;&#x7684;&#x9875;&#x9762;&#x53EF;&#x4EE5;&#x53BB;&#x6389;&#x8FD9;&#x4E2A;&#x53C2;&#x6570;&#x3002;</span>

<span class="hljs-comment">//1&#xFF1A;  &#x539F;&#x751F;&#x5199;&#x6CD5;  &#x65E0;auth &#x53C2;&#x6570;</span>
getPromise(url).then(<span class="hljs-function">(<span class="hljs-params">value</span>)=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;value&quot;</span> , value );
}).catch(<span class="hljs-function">(<span class="hljs-params">err</span>)=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;err&quot;</span> , err );
});

<span class="hljs-comment">//2&#xFF1A;  &#x539F;&#x751F;&#x5199;&#x6CD5;  &#x6709;auth &#x53C2;&#x6570;</span>
getPromise(url , {<span class="hljs-string">&apos;auth&apos;</span> : {
    <span class="hljs-string">&apos;user&apos;</span> : <span class="hljs-string">&apos;xx&apos;</span>,
    <span class="hljs-string">&apos;pass&apos;</span> : <span class="hljs-string">&apos;xx&apos;</span>,
    <span class="hljs-string">&apos;sendImmediately&apos;</span> : <span class="hljs-string">&apos;false&apos;</span>,
}}).then(<span class="hljs-function">(<span class="hljs-params">value</span>)=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;value&quot;</span> , value );
}).catch(<span class="hljs-function">(<span class="hljs-params">err</span>)=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;err&quot;</span> , err );
});

<span class="hljs-comment">// &#x7B2C;&#x4E8C;&#x79CD;&#x5199;&#x6CD5;   async/await</span>

<span class="hljs-comment">// &#x4E2A;&#x4EBA;&#x6700;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528;&#x8FD9;&#x79CD; &#xFF0C; &#x53EA;&#x4F7F;&#x7528;util &#x548C; request &#x3002;</span>

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handle</span>(<span class="hljs-params"></span>)</span>{

    <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">await</span> getPromise(url , {<span class="hljs-string">&apos;auth&apos;</span> : {
        <span class="hljs-string">&apos;user&apos;</span> : <span class="hljs-string">&apos;xx&apos;</span>,
        <span class="hljs-string">&apos;pass&apos;</span> : <span class="hljs-string">&apos;xx&apos;</span>,
        <span class="hljs-string">&apos;sendImmediately&apos;</span> : <span class="hljs-string">&apos;false&apos;</span>,
    }});
    <span class="hljs-comment">// &#x53EF;&#x4EE5;&#x52A0;&#x5165; try catch &#x6355;&#x83B7;&#x5F02;&#x5E38;  &#x4E5F;&#x53EF;&#x4EE5;&#x52A0; .catch()</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;result&quot;</span> , result.);
}

handle();

PS: <span class="hljs-string">`auth`</span> &#x53C2;&#x6570;&#x7684;&#x7528;&#x6CD5;&#x53C2;&#x8003;[&#x94FE;&#x63A5;][<span class="hljs-number">1</span>]  , &#x5728;&#x5F02;&#x6B65;&#x53D8;&#x540C;&#x6B65;&#x4E2D; &#x4E0D;&#x80FD;&#x4F7F;&#x7528;  <span class="hljs-string">`request.get().auth()`</span> &#x5199;&#x6CD5;&#x3002;

</code></pre><h2 id="articleHeader1">&#x7B2C;&#x4E8C;&#x79CD;</h2><p>&#x4F7F;&#x7528;&#x6A21;&#x5757; <code>request-promise-native</code> , <code>request-promise-native</code>&#x662F;&#x4F7F;&#x7528; <code>native Promise</code> &#x5199;&#x7684;&#xFF0C;&#x67E5;&#x770B;&#x6E90;&#x7801;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x7EE7;&#x627F;&#x81EA; <code>Request</code> &#x6A21;&#x5757; &#xFF0C; &#x4EE3;&#x7801;&#x793A;&#x4F8B;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4E0D;&#x518D;&#x5199; &#x539F;&#x751F;&#x793A;&#x4F8B;  then()&#x94FE;&#x7684;&#x90A3;&#x79CD;&#xFF0C;&#x53C2;&#x8003;&#x7B2C;&#x4E00;&#x4E2A;&#x793A;&#x4F8B;&#x5373;&#x53EF;
//get &#x8BF7;&#x6C42;&#x793A;&#x4F8B;   
const rpn = require(&apos;request-promise-native&apos;);  
var url = &quot;https://www.baidu.com/&quot;;
async function useRequestPromiseNative(){
    // options &#x91CC;&#x9762;&#x7684;&#x53C2;&#x6570;&#x53EF;&#x4EE5;&#x53BB;&#x770B;request&#x7684;&#x6E90;&#x7801;  &#x67E5;&#x770B;&#x5176;index.d.ts &#x6587;&#x4EF6;&#x91CC;&#x9762;&#x7684; interface CoreOptions &#x91CC;&#x9762;&#x6709;&#x6240;&#x6709;&#x7684;&#x53C2;&#x6570;&#x3002;
    let options = {
        method: &apos;GET&apos;,
        uri: url,
        auth : {
            &apos;user&apos; : &apos;xx&apos;,
            &apos;pass&apos; : &apos;xx&apos;,
            &apos;sendImmediately&apos; : &apos;false&apos;,
        }
      };
    let  rpnbody = await rpn(options);       
    
    console.log(&quot;rpnbody&quot; , rpnbody );
}

useRequestPromiseNative();

// post &#x793A;&#x4F8B; 
const rpn = require(&apos;request-promise-native&apos;);
var url = &quot;https://www.baidu.com/&quot;;
async function useRequestPromiseNative(){
    let options = {
        method: &apos;POST&apos;,
        uri: url,
        body: {    // &#x8FD9;&#x91CC;&#x5B9A;&#x4E49;&#x4F60;&#x7684;body&#x53C2;&#x6570;
        }
        json: true, // &#x8FD9;&#x4E2A;&#x770B;&#x4F60;&#x7684;&#x53C2;&#x6570;&#x800C;&#x5B9A;
      };
    let  rpnbody = await rpn(options);       
    
    console.log(&quot;rpnbody&quot; , rpnbody );
}
useRequestPromiseNative();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code><span class="hljs-comment">// &#x4E0D;&#x518D;&#x5199; &#x539F;&#x751F;&#x793A;&#x4F8B;  then()&#x94FE;&#x7684;&#x90A3;&#x79CD;&#xFF0C;&#x53C2;&#x8003;&#x7B2C;&#x4E00;&#x4E2A;&#x793A;&#x4F8B;&#x5373;&#x53EF;</span>
<span class="hljs-comment">//get &#x8BF7;&#x6C42;&#x793A;&#x4F8B;   </span>
<span class="hljs-keyword">const</span> rpn = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;request-promise-native&apos;</span>);  
<span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = <span class="hljs-string">&quot;https://www.baidu.com/&quot;</span>;
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">useRequestPromiseNative</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// options &#x91CC;&#x9762;&#x7684;&#x53C2;&#x6570;&#x53EF;&#x4EE5;&#x53BB;&#x770B;request&#x7684;&#x6E90;&#x7801;  &#x67E5;&#x770B;&#x5176;index.d.ts &#x6587;&#x4EF6;&#x91CC;&#x9762;&#x7684; interface CoreOptions &#x91CC;&#x9762;&#x6709;&#x6240;&#x6709;&#x7684;&#x53C2;&#x6570;&#x3002;</span>
    <span class="hljs-keyword">let</span> options = {
        <span class="hljs-attribute">method</span>: <span class="hljs-string">&apos;GET&apos;</span>,
        <span class="hljs-attribute">uri</span>: <span class="hljs-built_in">url</span>,
        <span class="hljs-attribute">auth</span> : {
            <span class="hljs-string">&apos;user&apos;</span> : <span class="hljs-string">&apos;xx&apos;</span>,
            <span class="hljs-string">&apos;pass&apos;</span> : <span class="hljs-string">&apos;xx&apos;</span>,
            <span class="hljs-string">&apos;sendImmediately&apos;</span> : <span class="hljs-string">&apos;false&apos;</span>,
        }
      };
    <span class="hljs-keyword">let</span>  rpnbody = <span class="hljs-keyword">await</span> rpn(options);       
    
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;rpnbody&quot;</span> , rpnbody );
}

useRequestPromiseNative();

<span class="hljs-comment">// post &#x793A;&#x4F8B; </span>
<span class="hljs-keyword">const</span> rpn = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;request-promise-native&apos;</span>);
<span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = <span class="hljs-string">&quot;https://www.baidu.com/&quot;</span>;
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">useRequestPromiseNative</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">let</span> options = {
        <span class="hljs-attribute">method</span>: <span class="hljs-string">&apos;POST&apos;</span>,
        <span class="hljs-attribute">uri</span>: <span class="hljs-built_in">url</span>,
        <span class="hljs-attribute">body</span>: {    <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x5B9A;&#x4E49;&#x4F60;&#x7684;body&#x53C2;&#x6570;</span>
        }
        <span class="hljs-attribute">json</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// &#x8FD9;&#x4E2A;&#x770B;&#x4F60;&#x7684;&#x53C2;&#x6570;&#x800C;&#x5B9A;</span>
      };
    <span class="hljs-keyword">let</span>  rpnbody = <span class="hljs-keyword">await</span> rpn(options);       
    
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;rpnbody&quot;</span> , rpnbody );
}
useRequestPromiseNative();</code></pre><h2 id="articleHeader2">&#x7B2C;&#x4E09;&#x79CD;</h2><p>&#x4F7F;&#x7528;&#x6A21;&#x5757; <code>request-promise</code> , <code>request-promise</code>&#x662F;&#x57FA;&#x4E8E; <code>bluebird</code> &#x5199;&#x7684;&#xFF0C; &#x67E5;&#x770B;&#x6E90;&#x7801;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x7EE7;&#x627F;&#x81EA; <code>Request</code> &#x6A21;&#x5757; &#xFF0C; &#x4EE3;&#x7801;&#x793A;&#x4F8B;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4E0D;&#x518D;&#x5199;post &#x793A;&#x4F8B;

const rp  = require(&apos;request-promise&apos;);
var url = &quot;https://www.baidu.com/&quot;;
async function useRequestPromise(){
    let options = {
        method: &apos;GET&apos;,
        uri: url,
        auth : {      //&#x53EF;&#x4EE5;&#x62FF;&#x6389;
            &apos;user&apos; : &apos;xx&apos;,
            &apos;pass&apos; : &apos;xx&apos;,
            &apos;sendImmediately&apos; : &apos;false&apos;,
        }
      };
    let  rpbody = await rp(options);       
    console.log(&quot;rpnbody&quot; , rpbody );
}

useRequestPromise();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code><span class="hljs-comment">// &#x4E0D;&#x518D;&#x5199;post &#x793A;&#x4F8B;</span>

<span class="hljs-keyword">const</span> rp  = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;request-promise&apos;</span>);
<span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = <span class="hljs-string">&quot;https://www.baidu.com/&quot;</span>;
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">useRequestPromise</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">let</span> options = {
        <span class="hljs-attribute">method</span>: <span class="hljs-string">&apos;GET&apos;</span>,
        <span class="hljs-attribute">uri</span>: <span class="hljs-built_in">url</span>,
        <span class="hljs-attribute">auth</span> : {      <span class="hljs-comment">//&#x53EF;&#x4EE5;&#x62FF;&#x6389;</span>
            <span class="hljs-string">&apos;user&apos;</span> : <span class="hljs-string">&apos;xx&apos;</span>,
            <span class="hljs-string">&apos;pass&apos;</span> : <span class="hljs-string">&apos;xx&apos;</span>,
            <span class="hljs-string">&apos;sendImmediately&apos;</span> : <span class="hljs-string">&apos;false&apos;</span>,
        }
      };
    <span class="hljs-keyword">let</span>  rpbody = <span class="hljs-keyword">await</span> rp(options);       
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;rpnbody&quot;</span> , rpbody );
}

useRequestPromise();</code></pre><h2 id="articleHeader3">&#x7B2C;&#x56DB;&#x79CD;</h2><p>&#x4F7F;&#x7528;&#x6A21;&#x5757; <code>request-promise-any</code> , <code>request-promise-any</code>&#x4E5F;&#x662F;&#x57FA;&#x4E8E; <code>request</code> &#x5199;&#x7684;&#xFF0C; &#x4EE3;&#x7801;&#x793A;&#x4F8B;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4E0D;&#x518D;&#x5199;post &#x793A;&#x4F8B;

const rpa = require(&apos;request-promise-any&apos;);
var url = &quot;https://www.baidu.com/&quot;;
async function useRequestPromiseAny(){
    let options = {
        method: &apos;GET&apos;,
        uri: url,
        auth : {
            &apos;user&apos; : &apos;xx&apos;,
            &apos;pass&apos; : &apos;xx&apos;,
            &apos;sendImmediately&apos; : &apos;false&apos;,
        }
      };
    let  rpabody = await rpa(options);       
    console.log(&quot;rpabody&quot; , rpabody );
}

useRequestPromiseAny();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code><span class="hljs-comment">// &#x4E0D;&#x518D;&#x5199;post &#x793A;&#x4F8B;</span>

<span class="hljs-keyword">const</span> rpa = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;request-promise-any&apos;</span>);
<span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = <span class="hljs-string">&quot;https://www.baidu.com/&quot;</span>;
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">useRequestPromiseAny</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">let</span> options = {
        <span class="hljs-attribute">method</span>: <span class="hljs-string">&apos;GET&apos;</span>,
        <span class="hljs-attribute">uri</span>: <span class="hljs-built_in">url</span>,
        <span class="hljs-attribute">auth</span> : {
            <span class="hljs-string">&apos;user&apos;</span> : <span class="hljs-string">&apos;xx&apos;</span>,
            <span class="hljs-string">&apos;pass&apos;</span> : <span class="hljs-string">&apos;xx&apos;</span>,
            <span class="hljs-string">&apos;sendImmediately&apos;</span> : <span class="hljs-string">&apos;false&apos;</span>,
        }
      };
    <span class="hljs-keyword">let</span>  rpabody = <span class="hljs-keyword">await</span> rpa(options);       
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;rpabody&quot;</span> , rpabody );
}

useRequestPromiseAny();</code></pre><h2 id="articleHeader4">&#x7B2C;&#x4E94;&#x79CD;</h2><p>&#x4F7F;&#x7528;&#x6A21;&#x5757; <code>bluebird</code> , &#x5229;&#x7528;&#x5176; <code>promisifyAll</code> <code>API</code> &#x8F6C;&#x6210;<code>Promise</code> &#xFF0C; &#x4EE3;&#x7801;&#x793A;&#x4F8B;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Promise = require(&apos;bluebird&apos;);
const request = require(&apos;request&apos;);
var url = &quot;https://www.baidu.com/&quot;;
Promise.promisifyAll(request, { suffix: &apos;SC&apos; });  //suffix &#x81EA;&#x5B9A;&#x4E49; get --&gt; getSC

async function usebluebird(){

    let result = await request.getSC(url , {&apos;auth&apos; : {
        &apos;user&apos; : &apos;xx&apos;,
        &apos;pass&apos; : &apos;xxx&apos;,
        &apos;sendImmediately&apos; : &apos;false&apos;,
    }});
    console.log(&quot;result&quot; , result);
}

usebluebird()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> <span class="hljs-built_in">Promise</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;bluebird&apos;</span>);
<span class="hljs-keyword">const</span> request = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;request&apos;</span>);
<span class="hljs-keyword">var</span> url = <span class="hljs-string">&quot;https://www.baidu.com/&quot;</span>;
<span class="hljs-built_in">Promise</span>.promisifyAll(request, { <span class="hljs-attr">suffix</span>: <span class="hljs-string">&apos;SC&apos;</span> });  <span class="hljs-comment">//suffix &#x81EA;&#x5B9A;&#x4E49; get --&gt; getSC</span>

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">usebluebird</span>(<span class="hljs-params"></span>)</span>{

    <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">await</span> request.getSC(url , {<span class="hljs-string">&apos;auth&apos;</span> : {
        <span class="hljs-string">&apos;user&apos;</span> : <span class="hljs-string">&apos;xx&apos;</span>,
        <span class="hljs-string">&apos;pass&apos;</span> : <span class="hljs-string">&apos;xxx&apos;</span>,
        <span class="hljs-string">&apos;sendImmediately&apos;</span> : <span class="hljs-string">&apos;false&apos;</span>,
    }});
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;result&quot;</span> , result);
}

usebluebird()</code></pre><p>&#x4E0A;&#x9762;&#x603B;&#x7ED3;&#x4E86;5&#x79CD;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#xFF0C;&#x5176;&#x5B9E;&#x8981;&#x8BF4;&#x4E5F;&#x4E0D;&#x6B62;5&#x79CD;&#x4E86;&#xFF0C;&#x5927;&#x5BB6;&#x6839;&#x636E;&#x81EA;&#x5DF1;&#x9700;&#x8981;&#x6765;&#x9009;&#x62E9;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node.js模拟发起http请求从异步转同步的5种方法

## 原文链接
[https://segmentfault.com/a/1190000016402949](https://segmentfault.com/a/1190000016402949)

