---
title: 'vue封装axios基本思路' 
date: 2018-11-17 02:30:12
hidden: true
slug: kdb6wsoortq
categories: [reprint]
---

{{< raw >}}
<p>Axios &#x662F;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E; promise &#x7684; HTTP &#x5E93;&#xFF0C;&#x53EF;&#x4EE5;&#x7528;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x548C; node.js &#x4E2D;&#x3002;&#x5728;vue&#x9879;&#x76EE;&#x4E4B;&#x4E2D;&#x4F7F;&#x7528;axios&#x662F;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x660E;&#x667A;&#x7684;&#x9009;&#x62E9;&#xFF0C;&#x56E0;&#x4E3A;vue&#x5B98;&#x65B9;&#x5DF2;&#x7ECF;&#x5BA3;&#x79F0;&#x4E0D;&#x518D;&#x7EF4;&#x62A4;vue-resource,&#x5E76;&#x4E14;&#x63A8;&#x8350;&#x4F7F;&#x7528;axios.</p><p>1 &#x4E3A;&#x4EC0;&#x4E48;&#x9009;&#x62E9;axios&#xFF1F;</p><ol><li>&#x4F7F;&#x7528;axios&#x53EF;&#x4EE5;&#x7EDF;&#x4E00;&#x505A;&#x8BF7;&#x6C42;-&#x54CD;&#x5E94;&#x62E6;&#x622A;&#xFF0C;&#x4F8B;&#x5982;&#x54CD;&#x5E94;&#x65F6;&#x6211;&#x4EEC;&#x5C06;&#x54CD;&#x5E94;&#x4FE1;&#x606F;&#x62E6;&#x622A;&#x8D77;&#x6765;&#xFF0C;&#x5224;&#x65AD;&#x72B6;&#x6001;&#x7801;&#xFF0C;&#x4ECE;&#x800C;&#x5F39;&#x51FA;&#x62A5;&#x9519;&#x4FE1;&#x606F;</li><li>&#x8BBE;&#x5B9A;&#x8BF7;&#x6C42;&#x8D85;&#x65F6;,&#x4F8B;&#x5982;3000ms&#x672A;&#x54CD;&#x5E94;&#x5219;&#x505C;&#x6B62;&#x8BF7;&#x6C42;</li><li>&#x57FA;&#x4E8E;promise,&#x53EF;&#x4EE5;&#x5F88;&#x65B9;&#x4FBF;&#x5730;&#x4F7F;&#x7528;then&#x6216;&#x8005;catch&#x6765;&#x5904;&#x7406;&#x8BF7;&#x6C42;</li><li>&#x81EA;&#x52A8;&#x8F6C;&#x6362;json&#x6570;&#x636E;</li></ol><p>2 &#x5982;&#x4F55;&#x4F7F;&#x7528;&#xFF1F;</p><p>&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4EE5;&#x4E0B;&#x65B9;&#x5F0F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. npm install axios --save
2. bower install axios --save
3. &lt;script src=&quot;https://unpkg.com/axios/dist/axios.min.js&quot;&gt;&lt;/script&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code><span class="hljs-number">1.</span> npm install axios <span class="hljs-comment">--save</span>
<span class="hljs-number">2.</span> bower install axios <span class="hljs-comment">--save</span>
<span class="hljs-number">3.</span> &lt;<span class="hljs-keyword">script</span> src=<span class="hljs-string">&quot;https://unpkg.com/axios/dist/axios.min.js&quot;</span>&gt;&lt;/<span class="hljs-keyword">script</span>&gt;
</code></pre><p>3 &#x5C01;&#x88C5;http&#x8BF7;&#x6C42;<br>&#x5B98;&#x7F51;&#x7ED9;&#x5B9A;&#x7684;&#x5B9E;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.get(&apos;/user?ID=12345&apos;)
  .then(function(response){
    console.log(response);
  })
  .catch(function(err){
    console.log(err);
  });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scilab"><code>axios.get(<span class="hljs-string">&apos;/user?ID=12345&apos;</span>)
  .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(response)</span>{</span>
    console.<span class="hljs-built_in">log</span>(response);
  })
  .<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err)</span>{</span>
    console.<span class="hljs-built_in">log</span>(err);
  });</code></pre><p>&#x5728;&#x6B64;&#x57FA;&#x7840;&#x4E0A;&#x6211;&#x4EEC;&#x5E94;&#x8BE5;&#x518D;&#x6B21;&#x5C01;&#x88C5;http&#x4E2D;&#x7684;post get put delete&#x65B9;&#x6CD5;&#xFF0C;&#x5728;&#x5177;&#x4F53;&#x9875;&#x9762;&#x53EA;&#x9700;&#x8981;&#x8C03;&#x7528;&#x63A5;&#x53E3;&#x51FD;&#x6570;&#x4EE5;&#x53CA;&#x4F20;&#x5165;params&#x5373;&#x53EF;&#xFF0C;&#x5176;&#x4F59;&#x4F8B;&#x5982;url,header&#x4E4B;&#x7C7B;&#x7684;&#x6211;&#x4EEC;&#x5E94;&#x8BE5;&#x8FDB;&#x884C;&#x5C01;&#x88C5;&#x3002;<br>&#x4F8B;&#x5982;&#x5728;index.vue&#x4E4B;&#x4E2D;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x6765;&#x5B9E;&#x73B0;&#x901A;&#x8FC7;id&#x6765;&#x83B7;&#x53D6;&#x5BF9;&#x5E94;&#x7684;&#x7528;&#x6237;&#x4FE1;&#x606F;&#xFF0C;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x5728;then&#x65B9;&#x6CD5;&#x7684;result&#x4E4B;&#x4E2D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="API.getUserInfo({id:&apos;01&apos;}).then((result)=&gt;{})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code style="word-break:break-word;white-space:initial">API.getUserInfo({id:<span class="hljs-string">&apos;01&apos;</span>}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(result)</span>=&gt;</span>{})</code></pre><p>4 &#x5B9E;&#x73B0;&#x601D;&#x8DEF;<br>&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x6784;&#x5EFA;&#x4E00;&#x4E2A;axios&#x5BF9;&#x8C61;&#x5B9E;&#x4F8B; &#x4F8B;&#x5982;axios.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from &apos;axios&apos;;
import router from &apos;../router&apos;;
// &#x521B;&#x5EFA;axios&#x5B9E;&#x4F8B;
const service = axios.create({            
  timeout: 30000 // &#x8BF7;&#x6C42;&#x8D85;&#x65F6;&#x65F6;&#x95F4;                                   
})
// &#x6DFB;&#x52A0;request&#x62E6;&#x622A;&#x5668; 
service.interceptors.request.use(config =&gt; {         
  return config
}, error =&gt; {
  Promise.reject(error)
})
// &#x6DFB;&#x52A0;respone&#x62E6;&#x622A;&#x5668;
service.interceptors.response.use(                  
  response =&gt; {
    let res={}; 
    res.status=response.status
    res.data=response.data;
    return res;
  },
  error =&gt; {
    if(error.response &amp;&amp; error.response.status == 404){
     router.push(&apos;/blank.vue&apos;)
    }
   
        
    return Promise.reject(error.response)
  }
)

export function get(url, params = {}) {
  params.t = new Date().getTime(); //get&#x65B9;&#x6CD5;&#x52A0;&#x4E00;&#x4E2A;&#x65F6;&#x95F4;&#x53C2;&#x6570;,&#x89E3;&#x51B3;ie&#x4E0B;&#x53EF;&#x80FD;&#x7F13;&#x5B58;&#x95EE;&#x9898;.
  return service({
    url: url,
    method: &apos;get&apos;,
    headers: {     
    },
    params
  })
}


//&#x5C01;&#x88C5;post&#x8BF7;&#x6C42;
export function post(url, data = {}) { 
  //&#x9ED8;&#x8BA4;&#x914D;&#x7F6E; 
  let sendObject={
    url: url,
    method: &apos;post&apos;,
    headers: {
      &apos;Content-Type&apos;:&apos;application/json;charset=UTF-8&apos;       
    },
    data:data
  };
  sendObject.data=JSON.stringify(data);
  return service(sendObject)
}

//&#x5C01;&#x88C5;put&#x65B9;&#x6CD5; (resfulAPI&#x5E38;&#x7528;)
export function put(url,data = {}){
  return service({
    url: url,
    method: &apos;put&apos;,
    headers: {
      &apos;Content-Type&apos;:&apos;application/json;charset=UTF-8&apos;       
    },
    data:JSON.stringify(data)
  }) 
}
//&#x5220;&#x9664;&#x65B9;&#x6CD5;(resfulAPI&#x5E38;&#x7528;)
export function deletes(url){
  return service({
    url: url,
    method: &apos;delete&apos;,
    headers: {}
  }) 
}

//&#x4E0D;&#x8981;&#x5FD8;&#x8BB0;export
export {
  service
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;axios&apos;</span>;
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../router&apos;</span>;
<span class="hljs-comment">// &#x521B;&#x5EFA;axios&#x5B9E;&#x4F8B;</span>
<span class="hljs-keyword">const</span> service = axios.create({            
  <span class="hljs-attr">timeout</span>: <span class="hljs-number">30000</span> <span class="hljs-comment">// &#x8BF7;&#x6C42;&#x8D85;&#x65F6;&#x65F6;&#x95F4;                                   </span>
})
<span class="hljs-comment">// &#x6DFB;&#x52A0;request&#x62E6;&#x622A;&#x5668; </span>
service.interceptors.request.use(<span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> {         
  <span class="hljs-keyword">return</span> config
}, error =&gt; {
  <span class="hljs-built_in">Promise</span>.reject(error)
})
<span class="hljs-comment">// &#x6DFB;&#x52A0;respone&#x62E6;&#x622A;&#x5668;</span>
service.interceptors.response.use(                  
  <span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
    <span class="hljs-keyword">let</span> res={}; 
    res.status=response.status
    res.data=response.data;
    <span class="hljs-keyword">return</span> res;
  },
  error =&gt; {
    <span class="hljs-keyword">if</span>(error.response &amp;&amp; error.response.status == <span class="hljs-number">404</span>){
     router.push(<span class="hljs-string">&apos;/blank.vue&apos;</span>)
    }
   
        
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error.response)
  }
)

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">get</span>(<span class="hljs-params">url, params = {}</span>) </span>{
  params.t = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime(); <span class="hljs-comment">//get&#x65B9;&#x6CD5;&#x52A0;&#x4E00;&#x4E2A;&#x65F6;&#x95F4;&#x53C2;&#x6570;,&#x89E3;&#x51B3;ie&#x4E0B;&#x53EF;&#x80FD;&#x7F13;&#x5B58;&#x95EE;&#x9898;.</span>
  <span class="hljs-keyword">return</span> service({
    <span class="hljs-attr">url</span>: url,
    <span class="hljs-attr">method</span>: <span class="hljs-string">&apos;get&apos;</span>,
    <span class="hljs-attr">headers</span>: {     
    },
    params
  })
}


<span class="hljs-comment">//&#x5C01;&#x88C5;post&#x8BF7;&#x6C42;</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">post</span>(<span class="hljs-params">url, data = {}</span>) </span>{ 
  <span class="hljs-comment">//&#x9ED8;&#x8BA4;&#x914D;&#x7F6E; </span>
  <span class="hljs-keyword">let</span> sendObject={
    <span class="hljs-attr">url</span>: url,
    <span class="hljs-attr">method</span>: <span class="hljs-string">&apos;post&apos;</span>,
    <span class="hljs-attr">headers</span>: {
      <span class="hljs-string">&apos;Content-Type&apos;</span>:<span class="hljs-string">&apos;application/json;charset=UTF-8&apos;</span>       
    },
    <span class="hljs-attr">data</span>:data
  };
  sendObject.data=<span class="hljs-built_in">JSON</span>.stringify(data);
  <span class="hljs-keyword">return</span> service(sendObject)
}

<span class="hljs-comment">//&#x5C01;&#x88C5;put&#x65B9;&#x6CD5; (resfulAPI&#x5E38;&#x7528;)</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">put</span>(<span class="hljs-params">url,data = {}</span>)</span>{
  <span class="hljs-keyword">return</span> service({
    <span class="hljs-attr">url</span>: url,
    <span class="hljs-attr">method</span>: <span class="hljs-string">&apos;put&apos;</span>,
    <span class="hljs-attr">headers</span>: {
      <span class="hljs-string">&apos;Content-Type&apos;</span>:<span class="hljs-string">&apos;application/json;charset=UTF-8&apos;</span>       
    },
    <span class="hljs-attr">data</span>:<span class="hljs-built_in">JSON</span>.stringify(data)
  }) 
}
<span class="hljs-comment">//&#x5220;&#x9664;&#x65B9;&#x6CD5;(resfulAPI&#x5E38;&#x7528;)</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deletes</span>(<span class="hljs-params">url</span>)</span>{
  <span class="hljs-keyword">return</span> service({
    <span class="hljs-attr">url</span>: url,
    <span class="hljs-attr">method</span>: <span class="hljs-string">&apos;delete&apos;</span>,
    <span class="hljs-attr">headers</span>: {}
  }) 
}

<span class="hljs-comment">//&#x4E0D;&#x8981;&#x5FD8;&#x8BB0;export</span>
<span class="hljs-keyword">export</span> {
  service
}</code></pre><p>&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#x4E3B;&#x8981;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x57FA;&#x672C;&#x7684;axios&#x5C01;&#x88C5;&#xFF0C;&#x8BF7;&#x6C42;&#x6210;&#x529F;&#x65F6;&#x83B7;&#x53D6;&#x54CD;&#x5E94;&#x5BF9;&#x8C61;&#xFF0C;&#x6211;&#x4EEC;&#x4E3B;&#x9700;&#x8981;&#x83B7;&#x53D6;&#x51E0;&#x4E2A;&#x6709;&#x7528;&#x7684;&#x4FE1;&#x606F;&#x5373;&#x53EF;&#xFF0C;&#x4F8B;&#x5982;&#x72B6;&#x6001;&#x7801;&#xFF0C;&#x6570;&#x636E;&#x5373;&#x53EF;&#xFF0C;&#x540C;&#x65F6;&#x5904;&#x7406;&#x9519;&#x8BEF;&#xFF0C;&#x4F8B;&#x5982;&#x8FD4;&#x56DE;404&#x6211;&#x4EEC;&#x8DF3;&#x8F6C;&#x5230;&#x4E00;&#x4E2A;&#x65B0;&#x754C;&#x9762;</p><p>&#x5C01;&#x88C5;&#x63A5;&#x53E3;&#x51FD;&#x6570;<br>&#x65B0;&#x5EFA;&#x6587;&#x4EF6;&#xFF0C;&#x4F8B;&#x5982;api.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {get, post,deletes,put} from &apos;./axios.js&apos; ;//&#x5BFC;&#x5165;axios&#x5B9E;&#x4F8B;&#x6587;&#x4EF6;&#x4E2D;&#x65B9;&#x6CD5;
let bsae_api = process.env.BASE_API ? &apos;./&apos;+process.env.BASE_API :&apos;..&apos; //&#x83B7;&#x53D6;&#x9879;&#x76EE;api&#x8BF7;&#x6C42;&#x5730;&#x5740;
//&#x6839;&#x636E;id&#x83B7;&#x53D6;&#x7528;&#x6237;&#x4FE1;&#x606F;
export const getUserInfoById=(id)=&gt;{
    return get(`${bsae_api}/web/user/${id}`); //resfulapi&#x98CE;&#x683C;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> {<span class="hljs-keyword">get</span>, post,deletes,put} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./axios.js&apos;</span> ;<span class="hljs-comment">//&#x5BFC;&#x5165;axios&#x5B9E;&#x4F8B;&#x6587;&#x4EF6;&#x4E2D;&#x65B9;&#x6CD5;</span>
<span class="hljs-keyword">let</span> bsae_api = process.env.BASE_API ? <span class="hljs-string">&apos;./&apos;</span>+process.env.BASE_API :<span class="hljs-string">&apos;..&apos;</span> <span class="hljs-comment">//&#x83B7;&#x53D6;&#x9879;&#x76EE;api&#x8BF7;&#x6C42;&#x5730;&#x5740;</span>
<span class="hljs-comment">//&#x6839;&#x636E;id&#x83B7;&#x53D6;&#x7528;&#x6237;&#x4FE1;&#x606F;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> getUserInfoById=<span class="hljs-function">(<span class="hljs-params">id</span>)=&gt;</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">get</span>(<span class="hljs-string">`<span class="hljs-subst">${bsae_api}</span>/web/user/<span class="hljs-subst">${id}</span>`</span>); <span class="hljs-comment">//resfulapi&#x98CE;&#x683C;</span>
}</code></pre><p>&#x5177;&#x4F53;&#x9875;&#x9762;&#x4F7F;&#x7528; index.vue</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import API from &apos;@/utils/api&apos;
getUserInfo(){
  API.getUserInfoById(&apos;01).then((result)=&gt;{
   }).catch((error)=&gt;{
 })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs erlang"><code>import API from &apos;@/utils/api&apos;
<span class="hljs-function"><span class="hljs-title">getUserInfo</span><span class="hljs-params">()</span>{
  API.<span class="hljs-title">getUserInfoById</span><span class="hljs-params">(&apos;<span class="hljs-number">01</span>)</span>.<span class="hljs-title">then</span><span class="hljs-params">((result)</span>=&gt;{
   }).<span class="hljs-title">catch</span><span class="hljs-params">((error)</span>=&gt;{
 })
}</span></code></pre><p>&#x4EE5;&#x4E0A;&#x5C31;&#x662F;&#x4E00;&#x4E9B;axios&#x5C01;&#x88C5;&#x7684;&#x57FA;&#x672C;&#x4ECB;&#x7ECD;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue封装axios基本思路

## 原文链接
[https://segmentfault.com/a/1190000016003454](https://segmentfault.com/a/1190000016003454)

