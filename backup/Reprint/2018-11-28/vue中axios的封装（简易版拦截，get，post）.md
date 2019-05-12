---
title: 'vue中axios的封装（简易版拦截，get，post）' 
date: 2018-11-28 2:30:10
hidden: true
slug: 9h3spkhvnbc
categories: [reprint]
---

{{< raw >}}
<p>&#x7B2C;&#x4E00;&#x6B65;&#x8FD8;&#x662F;&#x5148;&#x4E0B;&#x8F7D;axios</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install axios --save" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> axios <span class="hljs-comment">--save</span></code></pre><p>&#x7B2C;&#x4E8C;&#x6B65;/src/utils/&#x76EE;&#x5F55;&#x4E0B;&#x5EFA;&#x7ACB;&#x4E00;&#x4E2A;htttp.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from &apos;axios&apos;;


axios.defaults.timeout = 5000;
axios.defaults.baseURL =&apos;&apos;;


//http request &#x62E6;&#x622A;&#x5668;
axios.interceptors.request.use(
  config =&gt; {
    // const token = getCookie(&apos;&#x540D;&#x79F0;&apos;);
    config.data = JSON.stringify(config.data);
    config.headers = {
      &apos;Content-Type&apos;:&apos;application/x-www-form-urlencoded&apos;
    }
    // if(token){
    //   config.params = {&apos;token&apos;:token}
    // }
    return config;
  },
  error =&gt; {
    return Promise.reject(err);
  }
);


//http response &#x62E6;&#x622A;&#x5668;
axios.interceptors.response.use(
  response =&gt; {
    if(response.data.errCode ==2){
      router.push({
        path:&quot;/login&quot;,
        querry:{redirect:router.currentRoute.fullPath}//&#x4ECE;&#x54EA;&#x4E2A;&#x9875;&#x9762;&#x8DF3;&#x8F6C;
      })
    }
    return response;
  },
  error =&gt; {
    return Promise.reject(error)
  }
)


/**
 * &#x5C01;&#x88C5;get&#x65B9;&#x6CD5;
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
  return new Promise((resolve,reject) =&gt; {
    axios.get(url,{
      params:params
    })
    .then(response =&gt; {
      resolve(response.data);
    })
    .catch(err =&gt; {
      reject(err)
    })
  })
}


/**
 * &#x5C01;&#x88C5;post&#x8BF7;&#x6C42;
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}){
   return new Promise((resolve,reject) =&gt; {
     axios.post(url,data)
          .then(response =&gt; {
            resolve(response.data);
          },err =&gt; {
            reject(err)
          })
   })
 }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;axios&apos;</span>;


axios.defaults.timeout = <span class="hljs-number">5000</span>;
axios.defaults.baseURL =<span class="hljs-string">&apos;&apos;</span>;


<span class="hljs-comment">//http request &#x62E6;&#x622A;&#x5668;</span>
axios.interceptors.request.use(
  <span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> {
    <span class="hljs-comment">// const token = getCookie(&apos;&#x540D;&#x79F0;&apos;);</span>
    config.data = <span class="hljs-built_in">JSON</span>.stringify(config.data);
    config.headers = {
      <span class="hljs-string">&apos;Content-Type&apos;</span>:<span class="hljs-string">&apos;application/x-www-form-urlencoded&apos;</span>
    }
    <span class="hljs-comment">// if(token){</span>
    <span class="hljs-comment">//   config.params = {&apos;token&apos;:token}</span>
    <span class="hljs-comment">// }</span>
    <span class="hljs-keyword">return</span> config;
  },
  <span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(err);
  }
);


<span class="hljs-comment">//http response &#x62E6;&#x622A;&#x5668;</span>
axios.interceptors.response.use(
  <span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
    <span class="hljs-keyword">if</span>(response.data.errCode ==<span class="hljs-number">2</span>){
      router.push({
        path:<span class="hljs-string">&quot;/login&quot;</span>,
        querry:{redirect:router.currentRoute.fullPath}<span class="hljs-comment">//&#x4ECE;&#x54EA;&#x4E2A;&#x9875;&#x9762;&#x8DF3;&#x8F6C;</span>
      })
    }
    <span class="hljs-keyword">return</span> response;
  },
  <span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error)
  }
)


<span class="hljs-comment">/**
 * &#x5C01;&#x88C5;get&#x65B9;&#x6CD5;
 * @param url
 * @param data
 * @returns {Promise}
 */</span>

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetch</span>(<span class="hljs-params">url,params={}</span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>) =&gt;</span> {
    axios.get(url,{
      params:params
    })
    .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
      resolve(response.data);
    })
    .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
      reject(err)
    })
  })
}


<span class="hljs-comment">/**
 * &#x5C01;&#x88C5;post&#x8BF7;&#x6C42;
 * @param url
 * @param data
 * @returns {Promise}
 */</span>

 <span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">post</span>(<span class="hljs-params">url,data = {}</span>)</span>{
   <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>) =&gt;</span> {
     axios.post(url,data)
          .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
            resolve(response.data);
          },<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
            reject(err)
          })
   })
 }</code></pre><p>&#x7B2C;&#x4E09;&#x6B65;</p><p>&#x5728;main.js&#x4E2D;&#x5F15;&#x5165;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {post,get} from &apos;./utils/http&apos;
//&#x5B9A;&#x4E49;&#x5168;&#x5C40;&#x53D8;&#x91CF;
Vue.prototype.$post=post;
Vue.prototype.$get=get;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> {post,<span class="hljs-keyword">get</span>} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./utils/http&apos;</span>
<span class="hljs-comment">//&#x5B9A;&#x4E49;&#x5168;&#x5C40;&#x53D8;&#x91CF;</span>
Vue.prototype.$post=post;
Vue.prototype.$<span class="hljs-keyword">get</span>=<span class="hljs-keyword">get</span>;</code></pre><p>&#x6700;&#x540E;&#x5728;&#x7EC4;&#x4EF6;&#x91CC;&#x76F4;&#x63A5;&#x4F7F;&#x7528;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mounted(){
    this.$post(&apos;/api/v2/movie/top250&apos;)
      .then((response) =&gt; {
        console.log(response)
      })
  },

&#x5176;&#x4F59;&#x7684;&#x65B9;&#x6CD5;&#x4E00;&#x6837;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>mounted(){
    <span class="hljs-keyword">this</span>.$post(<span class="hljs-string">&apos;/api/v2/movie/top250&apos;</span>)
      .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(response)</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(response)
      })
  },

&#x5176;&#x4F59;&#x7684;&#x65B9;&#x6CD5;&#x4E00;&#x6837;</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue中axios的封装（简易版拦截，get，post）

## 原文链接
[https://segmentfault.com/a/1190000015294743](https://segmentfault.com/a/1190000015294743)

