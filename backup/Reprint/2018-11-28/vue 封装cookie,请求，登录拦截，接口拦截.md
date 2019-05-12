---
title: 'vue 封装cookie,请求，登录拦截，接口拦截' 
date: 2018-11-28 2:30:10
hidden: true
slug: owl49wjaqp
categories: [reprint]
---

{{< raw >}}
<p>&#x4E00;&#xFF1A;&#x5C01;&#x88C5;Cookie&#x65B9;&#x6CD5;<br>&#x5728;util&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x521B;&#x5EFA;util.js&#x6587;&#x4EF6;&#xFF0C;&#x7136;&#x540E;&#x4E0A;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x8BBE;&#x7F6E;cookie
export function setCookie (c_name, value, expire) {
    var date = new Date()
    date.setSeconds(date.getSeconds() + expire)
    document.cookie = c_name + &quot;=&quot; + escape(value) + &quot;; expires=&quot; + date.toGMTString()
    console.log(document.cookie)
};
//&#x83B7;&#x53D6;cookie
export function getCookie(c_name){
    if (document.cookie.length&gt;0){
        let c_start=document.cookie.indexOf(c_name + &quot;=&quot;)
        if (c_start!=-1){ 
            c_start=c_start + c_name.length+1 
            let c_end=document.cookie.indexOf(&quot;;&quot;,c_start)
            if (c_end==-1) c_end=document.cookie.length
                return unescape(document.cookie.substring(c_start,c_end))
            } 
        }
    return &quot;&quot;
};
/*&#x5220;&#x9664;cookie*/
export function delCookie(c_name) {
    setCookie(c_name, &quot;&quot;, -1)
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code><span class="hljs-comment">//&#x8BBE;&#x7F6E;cookie</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setCookie</span> (<span class="hljs-params">c_name, value, expire</span>) </span>{
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">date</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
    <span class="hljs-built_in">date</span>.setSeconds(<span class="hljs-built_in">date</span>.getSeconds() + expire)
    <span class="hljs-built_in">document</span>.cookie = c_name + <span class="hljs-string">&quot;=&quot;</span> + <span class="hljs-built_in">escape</span>(value) + <span class="hljs-string">&quot;; expires=&quot;</span> + <span class="hljs-built_in">date</span>.toGMTString()
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">document</span>.cookie)
};
<span class="hljs-comment">//&#x83B7;&#x53D6;cookie</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getCookie</span>(<span class="hljs-params">c_name</span>)</span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.cookie.length&gt;<span class="hljs-number">0</span>){
        <span class="hljs-keyword">let</span> c_start=<span class="hljs-built_in">document</span>.cookie.indexOf(c_name + <span class="hljs-string">&quot;=&quot;</span>)
        <span class="hljs-keyword">if</span> (c_start!=<span class="hljs-number">-1</span>){ 
            c_start=c_start + c_name.length+<span class="hljs-number">1</span> 
            <span class="hljs-keyword">let</span> c_end=<span class="hljs-built_in">document</span>.cookie.indexOf(<span class="hljs-string">&quot;;&quot;</span>,c_start)
            <span class="hljs-keyword">if</span> (c_end==<span class="hljs-number">-1</span>) c_end=<span class="hljs-built_in">document</span>.cookie.length
                <span class="hljs-keyword">return</span> <span class="hljs-built_in">unescape</span>(<span class="hljs-built_in">document</span>.cookie.substring(c_start,c_end))
            } 
        }
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;&quot;</span>
};
<span class="hljs-comment">/*&#x5220;&#x9664;cookie*/</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">delCookie</span>(<span class="hljs-params">c_name</span>) </span>{
    setCookie(c_name, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-number">-1</span>)
};</code></pre><p>&#x4E8C;&#x3001;&#x5728;HTTP&#x4E2D;&#x628A;Cookie&#x4F20;&#x5230;&#x540E;&#x53F0;<br>&#x5173;&#x4E8E;&#x8FD9;&#x70B9;&#xFF0C;&#x6211;&#x9700;&#x8981;&#x8BF4;&#x660E;&#x4E00;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x7684;&#x662F;axios&#x8FDB;&#x884C;HTTP&#x4F20;&#x8F93;&#x6570;&#x636E;&#xFF0C;&#x4E3A;&#x4E86;&#x66F4;&#x597D;&#x7684;&#x4F7F;&#x7528;axios,&#x6211;&#x4EEC;&#x5728;util&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x521B;&#x5EFA;http.js&#x6587;&#x4EF6;&#xFF0C;&#x7136;&#x540E;&#x5C01;&#x88C5;GET,POST&#x7B49;&#x65B9;&#x6CD5;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from &apos;axios&apos; //&#x5F15;&#x7528;axios
import {getCookie} from &apos;./util&apos; //&#x5F15;&#x7528;&#x521A;&#x624D;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x7684;util.js&#x6587;&#x4EF6;&#xFF0C;&#x5E76;&#x4F7F;&#x7528;getCookie&#x65B9;&#x6CD5;
 
// axios &#x914D;&#x7F6E;
axios.defaults.timeout = 5000; 
axios.defaults.baseURL = &apos;http://localhost/pjm-shield-api/public/v1/&apos;; //&#x8FD9;&#x662F;&#x8C03;&#x7528;&#x6570;&#x636E;&#x63A5;&#x53E3;
 
// http request &#x62E6;&#x622A;&#x5668;&#xFF0C;&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x628A;Cookie&#x4F20;&#x5230;&#x540E;&#x53F0;
axios.interceptors.request.use(
  config =&gt; {
    const token = getCookie(&apos;session&apos;); //&#x83B7;&#x53D6;Cookie
    config.data = JSON.stringify(config.data);
    config.headers = {
      &apos;Content-Type&apos;:&apos;application/x-www-form-urlencoded&apos; //&#x8BBE;&#x7F6E;&#x8DE8;&#x57DF;&#x5934;&#x90E8;
    };
    if (token) {
      config.params = {&apos;token&apos;: token} //&#x540E;&#x53F0;&#x63A5;&#x6536;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x540E;&#x9762;&#x6211;&#x4EEC;&#x5C06;&#x8BF4;&#x660E;&#x540E;&#x53F0;&#x5982;&#x4F55;&#x63A5;&#x6536;
    }
    return config;
  },
  err =&gt; {
    return Promise.reject(err);
  }
);
 
 
// http response &#x62E6;&#x622A;&#x5668;
axios.interceptors.response.use(
  response =&gt; {
//response.data.errCode&#x662F;&#x6211;&#x63A5;&#x53E3;&#x8FD4;&#x56DE;&#x7684;&#x503C;&#xFF0C;&#x5982;&#x679C;&#x503C;&#x4E3A;2&#xFF0C;&#x8BF4;&#x660E;Cookie&#x4E22;&#x5931;&#xFF0C;&#x7136;&#x540E;&#x8DF3;&#x8F6C;&#x5230;&#x767B;&#x5F55;&#x9875;&#xFF0C;&#x8FD9;&#x91CC;&#x6839;&#x636E;&#x5927;&#x5BB6;&#x81EA;&#x5DF1;&#x7684;&#x60C5;&#x51B5;&#x6765;&#x8BBE;&#x5B9A;
    if(response.data.errCode == 2) {
      router.push({
        path: &apos;/login&apos;,
        query: {redirect: router.currentRoute.fullPath} //&#x4ECE;&#x54EA;&#x4E2A;&#x9875;&#x9762;&#x8DF3;&#x8F6C;
      })
    }
    return response;
  },
  error =&gt; {
    return Promise.reject(error.response.data)
  });
 
export default axios;
 
/**
 * fetch &#x8BF7;&#x6C42;&#x65B9;&#x6CD5;
 * @param url
 * @param params
 * @returns {Promise}
 */
export function fetch(url, params = {}) {
 
  return new Promise((resolve, reject) =&gt; {
    axios.get(url, {
      params: params
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
 * post &#x8BF7;&#x6C42;&#x65B9;&#x6CD5;
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) =&gt; {
    axios.post(url, data)
      .then(response =&gt; {
        resolve(response.data);
      }, err =&gt; {
        reject(err);
      })
  })
}
 
/**
 * patch &#x65B9;&#x6CD5;&#x5C01;&#x88C5;
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) =&gt; {
    axios.patch(url, data)
      .then(response =&gt; {
        resolve(response.data);
      }, err =&gt; {
        reject(err);
      })
  })
}
 
/**
 * put &#x65B9;&#x6CD5;&#x5C01;&#x88C5;
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
  return new Promise((resolve, reject) =&gt; {
    axios.put(url, data)
      .then(response =&gt; {
        resolve(response.data);
      }, err =&gt; {
        reject(err);
      })
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;axios&apos;</span> <span class="hljs-comment">//&#x5F15;&#x7528;axios</span>
<span class="hljs-keyword">import</span> {getCookie} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./util&apos;</span> <span class="hljs-comment">//&#x5F15;&#x7528;&#x521A;&#x624D;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x7684;util.js&#x6587;&#x4EF6;&#xFF0C;&#x5E76;&#x4F7F;&#x7528;getCookie&#x65B9;&#x6CD5;</span>
 
<span class="hljs-comment">// axios &#x914D;&#x7F6E;</span>
axios.defaults.timeout = <span class="hljs-number">5000</span>; 
axios.defaults.baseURL = <span class="hljs-string">&apos;http://localhost/pjm-shield-api/public/v1/&apos;</span>; <span class="hljs-comment">//&#x8FD9;&#x662F;&#x8C03;&#x7528;&#x6570;&#x636E;&#x63A5;&#x53E3;</span>
 
<span class="hljs-comment">// http request &#x62E6;&#x622A;&#x5668;&#xFF0C;&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x628A;Cookie&#x4F20;&#x5230;&#x540E;&#x53F0;</span>
axios.interceptors.request.use(
  <span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> token = getCookie(<span class="hljs-string">&apos;session&apos;</span>); <span class="hljs-comment">//&#x83B7;&#x53D6;Cookie</span>
    config.data = <span class="hljs-built_in">JSON</span>.stringify(config.data);
    config.headers = {
      <span class="hljs-string">&apos;Content-Type&apos;</span>:<span class="hljs-string">&apos;application/x-www-form-urlencoded&apos;</span> <span class="hljs-comment">//&#x8BBE;&#x7F6E;&#x8DE8;&#x57DF;&#x5934;&#x90E8;</span>
    };
    <span class="hljs-keyword">if</span> (token) {
      config.params = {<span class="hljs-string">&apos;token&apos;</span>: token} <span class="hljs-comment">//&#x540E;&#x53F0;&#x63A5;&#x6536;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x540E;&#x9762;&#x6211;&#x4EEC;&#x5C06;&#x8BF4;&#x660E;&#x540E;&#x53F0;&#x5982;&#x4F55;&#x63A5;&#x6536;</span>
    }
    <span class="hljs-keyword">return</span> config;
  },
  <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(err);
  }
);
 
 
<span class="hljs-comment">// http response &#x62E6;&#x622A;&#x5668;</span>
axios.interceptors.response.use(
  <span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
<span class="hljs-comment">//response.data.errCode&#x662F;&#x6211;&#x63A5;&#x53E3;&#x8FD4;&#x56DE;&#x7684;&#x503C;&#xFF0C;&#x5982;&#x679C;&#x503C;&#x4E3A;2&#xFF0C;&#x8BF4;&#x660E;Cookie&#x4E22;&#x5931;&#xFF0C;&#x7136;&#x540E;&#x8DF3;&#x8F6C;&#x5230;&#x767B;&#x5F55;&#x9875;&#xFF0C;&#x8FD9;&#x91CC;&#x6839;&#x636E;&#x5927;&#x5BB6;&#x81EA;&#x5DF1;&#x7684;&#x60C5;&#x51B5;&#x6765;&#x8BBE;&#x5B9A;</span>
    <span class="hljs-keyword">if</span>(response.data.errCode == <span class="hljs-number">2</span>) {
      router.push({
        path: <span class="hljs-string">&apos;/login&apos;</span>,
        query: {redirect: router.currentRoute.fullPath} <span class="hljs-comment">//&#x4ECE;&#x54EA;&#x4E2A;&#x9875;&#x9762;&#x8DF3;&#x8F6C;</span>
      })
    }
    <span class="hljs-keyword">return</span> response;
  },
  <span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error.response.data)
  });
 
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> axios;
 
<span class="hljs-comment">/**
 * fetch &#x8BF7;&#x6C42;&#x65B9;&#x6CD5;
 * @param url
 * @param params
 * @returns {Promise}
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetch</span>(<span class="hljs-params">url, params = {}</span>) </span>{
 
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    axios.get(url, {
      params: params
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
 * post &#x8BF7;&#x6C42;&#x65B9;&#x6CD5;
 * @param url
 * @param data
 * @returns {Promise}
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">post</span>(<span class="hljs-params">url, data = {}</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    axios.post(url, data)
      .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        resolve(response.data);
      }, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
        reject(err);
      })
  })
}
 
<span class="hljs-comment">/**
 * patch &#x65B9;&#x6CD5;&#x5C01;&#x88C5;
 * @param url
 * @param data
 * @returns {Promise}
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">patch</span>(<span class="hljs-params">url, data = {}</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    axios.patch(url, data)
      .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        resolve(response.data);
      }, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
        reject(err);
      })
  })
}
 
<span class="hljs-comment">/**
 * put &#x65B9;&#x6CD5;&#x5C01;&#x88C5;
 * @param url
 * @param data
 * @returns {Promise}
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">put</span>(<span class="hljs-params">url, data = {}</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    axios.put(url, data)
      .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        resolve(response.data);
      }, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
        reject(err);
      })
  })
}</code></pre><p>&#x4E09;&#x3001;&#x5728;&#x767B;&#x5F55;&#x7EC4;&#x4EF6;&#x4F7F;&#x7528;Cookie<br>&#x7531;&#x4E8E;&#x767B;&#x5F55;&#x7EC4;&#x4EF6;&#x6211;&#x7528;&#x7684;&#x662F;Element-ui&#x5E03;&#x5C40;&#xFF0C;&#x5BF9;&#x5E94;&#x4E0D;&#x719F;&#x6089;Element-ui&#x7684;&#x670B;&#x53CB;&#x4EEC;&#xFF0C;&#x53EF;&#x4EE5;&#x53BB;&#x6076;&#x8865;&#x4E00;&#x4E0B;&#x3002;&#x540E;&#x9762;&#x6211;&#x4EEC;&#x5C06;&#x8BB2;&#x89E3;&#x5982;&#x4F55;&#x4F7F;&#x7528;&#x5B83;&#x8FDB;&#x884C;&#x5E03;&#x5C40;&#x3002;&#x767B;&#x5F55;&#x7EC4;&#x4EF6;&#x7684;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
 &lt;el-form ref=&quot;AccountFrom&quot; :model=&quot;account&quot; :rules=&quot;rules&quot; label-position=&quot;left&quot; label-width=&quot;0px&quot;
      class=&quot;demo-ruleForm login-container&quot;&gt;
  &lt;h3 class=&quot;title&quot;&gt;&#x540E;&#x53F0;&#x7BA1;&#x7406;&#x7CFB;&#x7EDF;&lt;/h3&gt;
  &lt;el-form-item prop=&quot;u_telephone&quot;&gt;
   &lt;el-input type=&quot;text&quot; v-model=&quot;account.u_telephone&quot; auto-complete=&quot;off&quot; placeholder=&quot;&#x8BF7;&#x8F93;&#x5165;&#x8D26;&#x53F7;&quot;&gt;&lt;/el-input&gt;
  &lt;/el-form-item&gt;
  &lt;el-form-item prod=&quot;u_password&quot;&gt;
   &lt;el-input type=&quot;password&quot; v-model=&quot;account.u_password&quot; auto-complete=&quot;off&quot; placeholder=&quot;&#x8BF7;&#x8F93;&#x5165;&#x5BC6;&#x7801;&quot;&gt;&lt;/el-input&gt;
  &lt;/el-form-item&gt;
  &lt;el-form-item style=&quot;width:100%;&quot;&gt;
   &lt;el-button type=&quot;primary&quot; style=&quot;width:100%&quot; @click=&quot;handleLogin&quot; :loading=&quot;logining&quot;&gt;&#x767B;&#x5F55;&lt;/el-button&gt;
  &lt;/el-form-item&gt;
 &lt;/el-form&gt;
&lt;/template&gt;
 
&lt;script&gt;
 export default {
  data() {
   return {
    logining: false,
    account: {
     u_telephone:&apos;&apos;,
     u_password:&apos;&apos;
    },
    //&#x8868;&#x5355;&#x9A8C;&#x8BC1;&#x89C4;&#x5219;
    rules: {
     u_telephone: [
      {required: true, message:&apos;&#x8BF7;&#x8F93;&#x5165;&#x8D26;&#x53F7;&apos;,trigger: &apos;blur&apos;}
     ],
     u_password: [
      {required: true,message:&apos;&#x8BF7;&#x8F93;&#x5165;&#x5BC6;&#x7801;&apos;,trigger: &apos;blur&apos;}
     ]
    }
   }
  },
  mounted() {
   //&#x521D;&#x59CB;&#x5316;
  },
  methods: {
   handleLogin() {
    this.$refs.AccountFrom.validate((valid) =&gt; {
     if(valid) {
      this.logining = true;
//&#x5176;&#x4E2D; &apos;m/login&apos; &#x4E3A;&#x8C03;&#x7528;&#x7684;&#x63A5;&#x53E3;&#xFF0C;this.account&#x4E3A;&#x53C2;&#x6570;
      this.$post(&apos;m/login&apos;,this.account).then(res =&gt; {
       this.logining = false;
       if(res.errCode !== 200) {
        this.$message({
         message: res.errMsg,
         type:&apos;error&apos;
        });
       } else {
        let expireDays = 1000 * 60 * 60 ;
        this.setCookie(&apos;session&apos;,res.errData.token,expireDays); //&#x8BBE;&#x7F6E;Session
        this.setCookie(&apos;u_uuid&apos;,res.errData.u_uuid,expireDays); //&#x8BBE;&#x7F6E;&#x7528;&#x6237;&#x7F16;&#x53F7;
        if(this.$route.query.redirect) {
         this.$router.push(this.$route.query.redirect);
        } else {
         this.$router.push(&apos;/home&apos;); //&#x8DF3;&#x8F6C;&#x7528;&#x6237;&#x4E2D;&#x5FC3;&#x9875;
        }
       }
      });
     } else {
      console.log(&apos;error submit&apos;);
      return false;
     }
    });
   }
  }
 }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">el-form</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;AccountFrom&quot;</span> <span class="hljs-attr">:model</span>=<span class="hljs-string">&quot;account&quot;</span> <span class="hljs-attr">:rules</span>=<span class="hljs-string">&quot;rules&quot;</span> <span class="hljs-attr">label-position</span>=<span class="hljs-string">&quot;left&quot;</span> <span class="hljs-attr">label-width</span>=<span class="hljs-string">&quot;0px&quot;</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;demo-ruleForm login-container&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;title&quot;</span>&gt;</span>&#x540E;&#x53F0;&#x7BA1;&#x7406;&#x7CFB;&#x7EDF;<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> <span class="hljs-attr">prop</span>=<span class="hljs-string">&quot;u_telephone&quot;</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;account.u_telephone&quot;</span> <span class="hljs-attr">auto-complete</span>=<span class="hljs-string">&quot;off&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;&#x8BF7;&#x8F93;&#x5165;&#x8D26;&#x53F7;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> <span class="hljs-attr">prod</span>=<span class="hljs-string">&quot;u_password&quot;</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;password&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;account.u_password&quot;</span> <span class="hljs-attr">auto-complete</span>=<span class="hljs-string">&quot;off&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;&#x8BF7;&#x8F93;&#x5165;&#x5BC6;&#x7801;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;width:100%;&quot;</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;primary&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;width:100%&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;handleLogin&quot;</span> <span class="hljs-attr">:loading</span>=<span class="hljs-string">&quot;logining&quot;</span>&gt;</span>&#x767B;&#x5F55;<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">el-form</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
 
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
 <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data() {
   <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">logining</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">account</span>: {
     <span class="hljs-attr">u_telephone</span>:<span class="hljs-string">&apos;&apos;</span>,
     <span class="hljs-attr">u_password</span>:<span class="hljs-string">&apos;&apos;</span>
    },
    <span class="hljs-comment">//&#x8868;&#x5355;&#x9A8C;&#x8BC1;&#x89C4;&#x5219;</span>
    rules: {
     <span class="hljs-attr">u_telephone</span>: [
      {<span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">message</span>:<span class="hljs-string">&apos;&#x8BF7;&#x8F93;&#x5165;&#x8D26;&#x53F7;&apos;</span>,<span class="hljs-attr">trigger</span>: <span class="hljs-string">&apos;blur&apos;</span>}
     ],
     <span class="hljs-attr">u_password</span>: [
      {<span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>,<span class="hljs-attr">message</span>:<span class="hljs-string">&apos;&#x8BF7;&#x8F93;&#x5165;&#x5BC6;&#x7801;&apos;</span>,<span class="hljs-attr">trigger</span>: <span class="hljs-string">&apos;blur&apos;</span>}
     ]
    }
   }
  },
  mounted() {
   <span class="hljs-comment">//&#x521D;&#x59CB;&#x5316;</span>
  },
  <span class="hljs-attr">methods</span>: {
   handleLogin() {
    <span class="hljs-keyword">this</span>.$refs.AccountFrom.validate(<span class="hljs-function">(<span class="hljs-params">valid</span>) =&gt;</span> {
     <span class="hljs-keyword">if</span>(valid) {
      <span class="hljs-keyword">this</span>.logining = <span class="hljs-literal">true</span>;
<span class="hljs-comment">//&#x5176;&#x4E2D; &apos;m/login&apos; &#x4E3A;&#x8C03;&#x7528;&#x7684;&#x63A5;&#x53E3;&#xFF0C;this.account&#x4E3A;&#x53C2;&#x6570;</span>
      <span class="hljs-keyword">this</span>.$post(<span class="hljs-string">&apos;m/login&apos;</span>,<span class="hljs-keyword">this</span>.account).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
       <span class="hljs-keyword">this</span>.logining = <span class="hljs-literal">false</span>;
       <span class="hljs-keyword">if</span>(res.errCode !== <span class="hljs-number">200</span>) {
        <span class="hljs-keyword">this</span>.$message({
         <span class="hljs-attr">message</span>: res.errMsg,
         <span class="hljs-attr">type</span>:<span class="hljs-string">&apos;error&apos;</span>
        });
       } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">let</span> expireDays = <span class="hljs-number">1000</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span> ;
        <span class="hljs-keyword">this</span>.setCookie(<span class="hljs-string">&apos;session&apos;</span>,res.errData.token,expireDays); <span class="hljs-comment">//&#x8BBE;&#x7F6E;Session</span>
        <span class="hljs-keyword">this</span>.setCookie(<span class="hljs-string">&apos;u_uuid&apos;</span>,res.errData.u_uuid,expireDays); <span class="hljs-comment">//&#x8BBE;&#x7F6E;&#x7528;&#x6237;&#x7F16;&#x53F7;</span>
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.$route.query.redirect) {
         <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-keyword">this</span>.$route.query.redirect);
        } <span class="hljs-keyword">else</span> {
         <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">&apos;/home&apos;</span>); <span class="hljs-comment">//&#x8DF3;&#x8F6C;&#x7528;&#x6237;&#x4E2D;&#x5FC3;&#x9875;</span>
        }
       }
      });
     } <span class="hljs-keyword">else</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;error submit&apos;</span>);
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
     }
    });
   }
  }
 }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x56DB;&#x3001;&#x5728;&#x8DEF;&#x7531;&#x4E2D;&#x9A8C;&#x8BC1;token&#x5B58;&#x4E0D;&#x5B58;&#x5728;&#xFF0C;&#x4E0D;&#x5B58;&#x5728;&#x7684;&#x8BDD;&#x4F1A;&#x5230;&#x767B;&#x5F55;&#x9875;<br>&#x5728; router/index.js&#x4E2D;&#x8BBE;&#x7F6E;&#x8DEF;&#x7531;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;
import Router from &apos;vue-router&apos;
import {post,fetch,patch,put} from &apos;@/util/http&apos;
import {delCookie,getCookie} from &apos;@/util/util&apos;

Vue.use(Router);

const router= new Router({
    mode: &apos;history&apos;,
    routes: [
        {
            path: &apos;/&apos;,
            redirect: &apos;/home&apos;
        },
        {
            path: &apos;/user&apos;,
            name: &apos;User&apos;,
            component: User,
            meta:{
                title:&apos;&#x7528;&#x6237;&#x4FE1;&#x606F;&apos;,
                requireAuth: true
            }
        },
     ]
});
//&#x8FD9;&#x4E2A;&#x662F;&#x8BF7;&#x6C42;&#x9875;&#x9762;&#x8DEF;&#x7531;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x9A8C;&#x8BC1;token&#x5B58;&#x4E0D;&#x5B58;&#x5728;&#xFF0C;&#x4E0D;&#x5B58;&#x5728;&#x7684;&#x8BDD;&#x4F1A;&#x5230;&#x767B;&#x5F55;&#x9875;
router.beforeEach((to, from, next) =&gt; {
 if(to.meta.requireAuth) {
  fetch(&apos;m/is/login&apos;).then(res =&gt; {
   if(res.errCode == 200) {
    next();
   } else {
    if(getCookie(&apos;session&apos;)) {
     delCookie(&apos;session&apos;);
    }
    if(getCookie(&apos;u_uuid&apos;)) {
     delCookie(&apos;u_uuid&apos;);
    }
    next({
     path: &apos;/&apos;
    });
   }
  });
 } else {
  next();
 }
});
export default router" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue-router&apos;</span>
<span class="hljs-keyword">import</span> {post,fetch,patch,put} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/util/http&apos;</span>
<span class="hljs-keyword">import</span> {delCookie,getCookie} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/util/util&apos;</span>

Vue.use(Router);

<span class="hljs-keyword">const</span> router= <span class="hljs-keyword">new</span> Router({
    <span class="hljs-attr">mode</span>: <span class="hljs-string">&apos;history&apos;</span>,
    <span class="hljs-attr">routes</span>: [
        {
            <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/&apos;</span>,
            <span class="hljs-attr">redirect</span>: <span class="hljs-string">&apos;/home&apos;</span>
        },
        {
            <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/user&apos;</span>,
            <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;User&apos;</span>,
            <span class="hljs-attr">component</span>: User,
            <span class="hljs-attr">meta</span>:{
                <span class="hljs-attr">title</span>:<span class="hljs-string">&apos;&#x7528;&#x6237;&#x4FE1;&#x606F;&apos;</span>,
                <span class="hljs-attr">requireAuth</span>: <span class="hljs-literal">true</span>
            }
        },
     ]
});
<span class="hljs-comment">//&#x8FD9;&#x4E2A;&#x662F;&#x8BF7;&#x6C42;&#x9875;&#x9762;&#x8DEF;&#x7531;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x9A8C;&#x8BC1;token&#x5B58;&#x4E0D;&#x5B58;&#x5728;&#xFF0C;&#x4E0D;&#x5B58;&#x5728;&#x7684;&#x8BDD;&#x4F1A;&#x5230;&#x767B;&#x5F55;&#x9875;</span>
router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
 <span class="hljs-keyword">if</span>(to.meta.requireAuth) {
  fetch(<span class="hljs-string">&apos;m/is/login&apos;</span>).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
   <span class="hljs-keyword">if</span>(res.errCode == <span class="hljs-number">200</span>) {
    next();
   } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">if</span>(getCookie(<span class="hljs-string">&apos;session&apos;</span>)) {
     delCookie(<span class="hljs-string">&apos;session&apos;</span>);
    }
    <span class="hljs-keyword">if</span>(getCookie(<span class="hljs-string">&apos;u_uuid&apos;</span>)) {
     delCookie(<span class="hljs-string">&apos;u_uuid&apos;</span>);
    }
    next({
     <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/&apos;</span>
    });
   }
  });
 } <span class="hljs-keyword">else</span> {
  next();
 }
});
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> router</code></pre><p>&#x5907;&#x6CE8;&#xFF1A;&#x8BF7;&#x6CE8;&#x610F;&#x8DEF;&#x7531;&#x4E2D;&#x7684; meta:{requireAuth: true }&#xFF0C;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#xFF0C;&#x4E3B;&#x8981;&#x4E3A;&#x4E0B;&#x9762;&#x7684;&#x9A8C;&#x8BC1;&#x505A;&#x670D;&#x52A1;&#x3002;</p><p>if(to.meta.requireAuth)&#xFF0C;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x610F;&#x601D;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x5982;&#x679C;requireAuth: true ,&#x90A3;&#x5C31;&#x5224;&#x65AD;&#x7528;&#x6237;&#x662F;&#x5426;&#x5B58;&#x5728;&#x3002;</p><p>&#x5982;&#x679C;&#x5B58;&#x5728;&#xFF0C;&#x5C31;&#x7EE7;&#x7EED;&#x6267;&#x884C;&#x4E0B;&#x9762;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x5B58;&#x5728;&#xFF0C;&#x5C31;&#x5220;&#x9664;&#x5BA2;&#x6237;&#x7AEF;&#x7684;Cookie,&#x540C;&#x65F6;&#x9875;&#x9762;&#x8DF3;&#x8F6C;&#x5230;&#x767B;&#x5F55;&#x9875;&#x3002;</p><p>&#x4EE5;&#x4E0A;&#x5C31;&#x662F;Cookie&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x7684;&#x4F7F;&#x7528;&#xFF0C;&#x5E0C;&#x671B;&#x5BF9;&#x5927;&#x5BB6;&#x7684;&#x5B66;&#x4E60;&#x6709;&#x6240;&#x5E2E;&#x52A9;&#xFF0C;&#x4E5F;&#x5E0C;&#x671B;&#x5927;&#x5BB6;&#x591A;&#x591A;&#x652F;&#x6301;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 封装cookie,请求，登录拦截，接口拦截

## 原文链接
[https://segmentfault.com/a/1190000015278958](https://segmentfault.com/a/1190000015278958)

