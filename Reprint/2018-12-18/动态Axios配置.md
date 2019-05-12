---
title: '动态Axios配置' 
date: 2018-12-18 2:30:10
hidden: true
slug: eqi20eb84jn
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>推荐使用Vue-cli工具来创建和管理项目，就算刚开始不熟悉，用着用着便可知晓其中的奥妙。前一段时间官方所推荐的数据请求插件还是<code>Vue-resource</code>，但现在已经变了，变成了<code>Axios</code>,不用知道为什么变了，反正这个用起来比那个好一些，用就是了，下面是一些封装<code>axios</code>请求的一些经验，不对之处，还望多多指教！</blockquote>
<h4>01</h4>
<p><strong>创建文件</strong>，Vue项目初始化之后，在<code>src</code>目录下再创建一个<code>util</code>工具文件夹，一般就是用来存放一些封装的函数方法，现在让我们在<code>util</code>文件目录下创建一个<code>http.js</code>文件，封装<code>axios</code>方法。</p>
<h4>02</h4>
<p><strong>直接上代码（常规版）</strong>，代码中有详细的注释</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios' //引用axios
import {Promise} from 'es6-promise'   //引入Promise

// axios 配置
axios.defaults.timeout = 5000;  //设置超时时间
axios.defaults.baseURL = 'http://localhost:4000/api/v1/'; //这是调用数据接口

// http request 拦截器（所有发送的请求都要从这儿过一次），通过这个，我们就可以把token传到后台，我这里是使用sessionStorage来存储token等权限信息和用户信息，若要使用cookie可以自己封装一个函数并import便可使用
axios.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem(&quot;token&quot;); //获取存储在本地的token
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type':'application/json' //设置跨域头部,虽然很多浏览器默认都是使用json传数据，但咱要考虑IE浏览器。
        };
        if (token) {
            config.headers.Authorization = &quot;Token &quot; + token; //携带权限参数
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);


// http response 拦截器（所有接收到的请求都要从这儿过一次）
axios.interceptors.response.use(
    response => {
//response.status===401是我和后台约定的权限丢失或者权限不够返回的状态码，这个可以自己和后台约定，约定返回某个自定义字段也是可以的
        if(response.status == 401) {
            router.push({ //push后面是一个参数对象，可以携带很多参数，具体可以去vue-router上查看，例如query字段表示携带的参数
                path: '/login' 
            })
        }
        return response;
    },
    error => {
        return Promise.reject(error.response.data)
    });

export default axios;

/**
 * fetch 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function fetch(url, params = {}) {

    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
        .then(response => {
            resolve(response.data);
        })
        .catch(err => {
            reject(err)
        })
    })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
    })
}

/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
    })
}

/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span> <span class="hljs-comment">//引用axios</span>
<span class="hljs-keyword">import</span> {<span class="hljs-built_in">Promise</span>} <span class="hljs-keyword">from</span> <span class="hljs-string">'es6-promise'</span>   <span class="hljs-comment">//引入Promise</span>

<span class="hljs-comment">// axios 配置</span>
axios.defaults.timeout = <span class="hljs-number">5000</span>;  <span class="hljs-comment">//设置超时时间</span>
axios.defaults.baseURL = <span class="hljs-string">'http://localhost:4000/api/v1/'</span>; <span class="hljs-comment">//这是调用数据接口</span>

<span class="hljs-comment">// http request 拦截器（所有发送的请求都要从这儿过一次），通过这个，我们就可以把token传到后台，我这里是使用sessionStorage来存储token等权限信息和用户信息，若要使用cookie可以自己封装一个函数并import便可使用</span>
axios.interceptors.request.use(
    <span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> token = sessionStorage.getItem(<span class="hljs-string">"token"</span>); <span class="hljs-comment">//获取存储在本地的token</span>
        config.data = <span class="hljs-built_in">JSON</span>.stringify(config.data);
        config.headers = {
            <span class="hljs-string">'Content-Type'</span>:<span class="hljs-string">'application/json'</span> <span class="hljs-comment">//设置跨域头部,虽然很多浏览器默认都是使用json传数据，但咱要考虑IE浏览器。</span>
        };
        <span class="hljs-keyword">if</span> (token) {
            config.headers.Authorization = <span class="hljs-string">"Token "</span> + token; <span class="hljs-comment">//携带权限参数</span>
        }
        <span class="hljs-keyword">return</span> config;
    },
    <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(err);
    }
);


<span class="hljs-comment">// http response 拦截器（所有接收到的请求都要从这儿过一次）</span>
axios.interceptors.response.use(
    <span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
<span class="hljs-comment">//response.status===401是我和后台约定的权限丢失或者权限不够返回的状态码，这个可以自己和后台约定，约定返回某个自定义字段也是可以的</span>
        <span class="hljs-keyword">if</span>(response.status == <span class="hljs-number">401</span>) {
            router.push({ <span class="hljs-comment">//push后面是一个参数对象，可以携带很多参数，具体可以去vue-router上查看，例如query字段表示携带的参数</span>
                path: <span class="hljs-string">'/login'</span> 
            })
        }
        <span class="hljs-keyword">return</span> response;
    },
    <span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error.response.data)
    });

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> axios;

<span class="hljs-comment">/**
 * fetch 请求方法
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
 * post 请求方法
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
 * patch 方法封装
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
 * put 方法封装
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
}</code></pre>
<h4>03</h4>
<p><strong>（动态版）</strong>，<code>axios</code>的拦截器不是必要的，不是每个项目都需要，而且<code>headers</code>里面的<code>Content-Type</code>和<code>Authorization</code>不止一种，这时就需要使用另一种方法。</p>
<blockquote>util/http.js</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios' //引用axios
import {Promise} from 'es6-promise'   //引入Promise

// axios 配置和拦截器都不用了，这里我使用了一个动态配置数据请求地址，在App.vue中，代码在下面，这个也不是必须的。


//^_^下面都设置一个默认的头部，使用的时候可以传入数据覆盖^_^,例如使用fetch(GET)方法时，没有请求数据，但是请求头有变化，则应写成 fetch(&quot;地址&quot;, {}, {&quot;这里写头部的内容&quot;})   记住没数据用一个空对象占位置
/**
 * fetch 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function fetch(url, params = {}, headers = {
    'Content-Type': 'application/json', //设置跨域头部
    &quot;Authorization&quot;: 'JWT ' + sessionStorage.getItem(&quot;authToken&quot;)
}) {

    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
            headers: headers
        })
        .then(response => {
            resolve(response.data);
        })
        .catch(err => {
            reject(err.response)
        })
    })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}, config = {
    &quot;headers&quot;: {
        'Content-Type': 'application/json', //设置跨域头部
        &quot;Authorization&quot;: 'JWT ' + sessionStorage.getItem(&quot;authToken&quot;)
    }
}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data, config)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err.response);
            })
    })
}

/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}, config = {
    &quot;headers&quot;: {
        'Content-Type': 'application/json', //设置跨域头部
        &quot;Authorization&quot;: 'JWT ' + sessionStorage.getItem(&quot;authToken&quot;)
    }
}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data, config)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err.response);
            })
    })
}

/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}, config = {
    &quot;headers&quot;: {
        'Content-Type': 'application/json', //设置跨域头部
        &quot;Authorization&quot;: 'JWT ' + sessionStorage.getItem(&quot;authToken&quot;)
    }
}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data, config)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err.response);
            })
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span> <span class="hljs-comment">//引用axios</span>
<span class="hljs-keyword">import</span> {<span class="hljs-built_in">Promise</span>} <span class="hljs-keyword">from</span> <span class="hljs-string">'es6-promise'</span>   <span class="hljs-comment">//引入Promise</span>

<span class="hljs-comment">// axios 配置和拦截器都不用了，这里我使用了一个动态配置数据请求地址，在App.vue中，代码在下面，这个也不是必须的。</span>


<span class="hljs-comment">//^_^下面都设置一个默认的头部，使用的时候可以传入数据覆盖^_^,例如使用fetch(GET)方法时，没有请求数据，但是请求头有变化，则应写成 fetch("地址", {}, {"这里写头部的内容"})   记住没数据用一个空对象占位置</span>
<span class="hljs-comment">/**
 * fetch 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetch</span>(<span class="hljs-params">url, params = {}, headers = {
    <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/json'</span>, <span class="hljs-regexp">//</span>设置跨域头部
    <span class="hljs-string">"Authorization"</span>: <span class="hljs-string">'JWT '</span> + sessionStorage.getItem(<span class="hljs-string">"authToken"</span></span>)
}) </span>{

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        axios.get(url, {
            <span class="hljs-attr">params</span>: params,
            <span class="hljs-attr">headers</span>: headers
        })
        .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
            resolve(response.data);
        })
        .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
            reject(err.response)
        })
    })
}

<span class="hljs-comment">/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">post</span>(<span class="hljs-params">url, data = {}, config = {
    <span class="hljs-string">"headers"</span>: {
        <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/json'</span>, <span class="hljs-regexp">//</span>设置跨域头部
        <span class="hljs-string">"Authorization"</span>: <span class="hljs-string">'JWT '</span> + sessionStorage.getItem(<span class="hljs-string">"authToken"</span></span>)
    }
}) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        axios.post(url, data, config)
            .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
                resolve(response.data);
            }, err =&gt; {
                reject(err.response);
            })
    })
}

<span class="hljs-comment">/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">patch</span>(<span class="hljs-params">url, data = {}, config = {
    <span class="hljs-string">"headers"</span>: {
        <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/json'</span>, <span class="hljs-regexp">//</span>设置跨域头部
        <span class="hljs-string">"Authorization"</span>: <span class="hljs-string">'JWT '</span> + sessionStorage.getItem(<span class="hljs-string">"authToken"</span></span>)
    }
}) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        axios.patch(url, data, config)
            .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
                resolve(response.data);
            }, err =&gt; {
                reject(err.response);
            })
    })
}

<span class="hljs-comment">/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">put</span>(<span class="hljs-params">url, data = {}, config = {
    <span class="hljs-string">"headers"</span>: {
        <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/json'</span>, <span class="hljs-regexp">//</span>设置跨域头部
        <span class="hljs-string">"Authorization"</span>: <span class="hljs-string">'JWT '</span> + sessionStorage.getItem(<span class="hljs-string">"authToken"</span></span>)
    }
}) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        axios.put(url, data, config)
            .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
                resolve(response.data);
            }, err =&gt; {
                reject(err.response);
            })
    })
}</code></pre>
<blockquote>App.vue(这是在<code>src</code>目录下的程序入口文件)</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios';
let protocol = window.location.protocol; //协议
let host = window.location.host; //主机
let reg = /^localhost+/;
if(reg.test(host)) {
  //若本地项目调试使用
  axios.defaults.baseURL = 'http://10.0.xx.xxx:xxxx/api/';
} else {
  //动态请求地址
  axios.defaults.baseURL = protocol + &quot;//&quot; + host + &quot;/api/&quot;;
}
axios.defaults.timeout = 30000;
export default {
  name: 'app',
  axios   //这里记得导出，若请求地址永久固定一个，则就按照`普通版`配置一个baserURL就可以了
}
</script>

<style lang=&quot;scss&quot;>  //这里我使用的是scss
@import '~@/style/style'
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>/&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>;
<span class="hljs-keyword">let</span> protocol = <span class="hljs-built_in">window</span>.location.protocol; <span class="hljs-comment">//协议</span>
<span class="hljs-keyword">let</span> host = <span class="hljs-built_in">window</span>.location.host; <span class="hljs-comment">//主机</span>
<span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/^localhost+/</span>;
<span class="hljs-keyword">if</span>(reg.test(host)) {
  <span class="hljs-comment">//若本地项目调试使用</span>
  axios.defaults.baseURL = <span class="hljs-string">'http://10.0.xx.xxx:xxxx/api/'</span>;
} <span class="hljs-keyword">else</span> {
  <span class="hljs-comment">//动态请求地址</span>
  axios.defaults.baseURL = protocol + <span class="hljs-string">"//"</span> + host + <span class="hljs-string">"/api/"</span>;
}
axios.defaults.timeout = <span class="hljs-number">30000</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
  axios   <span class="hljs-comment">//这里记得导出，若请求地址永久固定一个，则就按照`普通版`配置一个baserURL就可以了</span>
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span>&gt;</span><span class="undefined">  //这里我使用的是scss
@import '~@/style/style'
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h4>04</h4>
<p><strong>总结</strong></p>
<ul>
<li>
<p>常见问题</p>
<ul>
<li>在使用动态版时，为什么称为动态呢，是因为访问地址和请求地址是同一个地址可端口号，例如我通过<code>http://www.cmgos.com</code>(默认端口80)访问项目，那么我的<code>baseURL</code>会自动的变为<code>http:www.cmgos.com:80/api/</code>，这么做的原因是当某一天项目迁移或者<code>http</code>改为<code>https</code>时，不用你再去更改请求地址，程序自动就完成了</li>
<li>数据请求地址配置不正确？如果你配置了<code>baseURL</code>，那么你封装的函数在使用时仅需传入基于<code>baseURL</code>的请求地址，例如传入<code>login/</code>那么请求地址会自动变为<code>http:www.cmgos.com:80/api/login/</code>，若未配置，那么可以直接传入整个请求地址</li>
</ul>
</li>
<li>
<p>注意事项</p>
<ul><li>在使用动态版时，由于没有使用拦截器，所以下面封装的函数在返回错误的时候需要写成<code>err.response.data</code>来获取返回的数据，但我写的是<code>err.response</code>，因为这样可以拿到<code>(status)状态码</code>等信息，若不需要判断返回的状态码，则改为<code>err.response.data</code>便可</li></ul>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
动态Axios配置

## 原文链接
[https://segmentfault.com/a/1190000012805726](https://segmentfault.com/a/1190000012805726)

