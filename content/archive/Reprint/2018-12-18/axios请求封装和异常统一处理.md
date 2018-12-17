---
title: 'axios请求封装和异常统一处理' 
date: 2018-12-18 2:30:10
hidden: true
slug: kulxf2kgnir
categories: [reprint]
---

{{< raw >}}

                    
<p>当前后端分离时，权限问题的处理也和我们传统的处理方式有一点差异。笔者前几天刚好在负责一个项目的权限管理模块，现在权限管理模块已经做完了，我想通过5-6篇文章，来介绍一下项目中遇到的问题以及我的解决方案，希望这个系列能够给小伙伴一些帮助。本系列文章并不是手把手的教程，主要介绍了核心思路并讲解了核心代码，完整的代码小伙伴们可以在GitHub上star并clone下来研究。另外，原本计划把项目跑起来放到网上供小伙伴们查看，但是之前买服务器为了省钱，内存只有512M，两个应用跑不起来(已经有一个<a href="https://github.com/lenve/VBlog" rel="nofollow noreferrer" target="_blank">V部落开源项目</a>在运行)，因此小伙伴们只能将就看一下下面的截图了，GitHub上有部署教程，部署到本地也可以查看完整效果。</p>
<hr>
<p>项目地址：<a href="https://github.com/lenve/vhr" rel="nofollow noreferrer" target="_blank">https://github.com/lenve/vhr</a>  </p>
<p>前面几篇文章，我们已经基本解决了服务端的问题，本文我们主要来聊聊前端网络请求的封装。  </p>
<p>本文是本系列的第四篇，建议先阅读前面的文章有助于更好的理解本文：  </p>
<p>1.<a href="http://mp.weixin.qq.com/s/lpznrVx6Bh9X7ZnunrWQSA" rel="nofollow noreferrer" target="_blank">SpringBoot+Vue前后端分离，使用SpringSecurity完美处理权限问题(一)</a>  <br>2.<a href="https://mp.weixin.qq.com/s/9Do-kQOvJGLsw9m36_LrFA" rel="nofollow noreferrer" target="_blank">SpringBoot+Vue前后端分离，使用SpringSecurity完美处理权限问题(二)</a>  <br>3.<a href="https://mp.weixin.qq.com/s/9c0j2GzCNmtdOL8EfCV_bA" rel="nofollow noreferrer" target="_blank">SpringSecurity中密码加盐与SpringBoot中异常统一处理</a></p>
<h1 id="articleHeader0">前端网络请求封装</h1>
<p>前端采用了axios来处理网络请求，为了避免在每次请求时都去判断各种各样的网络情况，比如连接超时、服务器内部错误、权限不足等等不一而足，我对axios进行了简单的封装，这里主要使用了axios中的拦截器功能。  </p>
<p>封装后的网络请求工具js如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios'
import {Message} from 'element-ui'

axios.interceptors.request.use(config=> {
  return config;
}, err=> {
  Message.error({message: '请求超时!'});
  return Promise.resolve(err);
})
axios.interceptors.response.use(data=> {
  if (data.status &amp;&amp; data.status == 200 &amp;&amp; data.data.status == 'error') {
    Message.error({message: data.data.msg});
    return;
  }
  return data;
}, err=> {
  if (err.response.status == 504||err.response.status == 404) {
    Message.error({message: '服务器被吃了⊙﹏⊙∥'});
  } else if (err.response.status == 403) {
    Message.error({message: '权限不足,请联系管理员!'});
  }else {
    Message.error({message: '未知错误!'});
  }
  return Promise.resolve(err);
})

let base = '';

export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&amp;'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&amp;'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`
  });
}
export const getRequest = (url) => {
  return axios({
    method: 'get',
    url: `${base}${url}`
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
<span class="hljs-keyword">import</span> {Message} <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui'</span>

axios.interceptors.request.use(<span class="hljs-function"><span class="hljs-params">config</span>=&gt;</span> {
  <span class="hljs-keyword">return</span> config;
}, <span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span> {
  Message.error({message: <span class="hljs-string">'请求超时!'</span>});
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(err);
})
axios.interceptors.response.use(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span> {
  <span class="hljs-keyword">if</span> (data.status &amp;&amp; data.status == <span class="hljs-number">200</span> &amp;&amp; data.data.status == <span class="hljs-string">'error'</span>) {
    Message.error({message: data.data.msg});
    <span class="hljs-keyword">return</span>;
  }
  <span class="hljs-keyword">return</span> data;
}, <span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span> {
  <span class="hljs-keyword">if</span> (err.response.status == <span class="hljs-number">504</span>||err.response.status == <span class="hljs-number">404</span>) {
    Message.error({message: <span class="hljs-string">'服务器被吃了⊙﹏⊙∥'</span>});
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (err.response.status == <span class="hljs-number">403</span>) {
    Message.error({message: <span class="hljs-string">'权限不足,请联系管理员!'</span>});
  }<span class="hljs-keyword">else</span> {
    Message.error({message: <span class="hljs-string">'未知错误!'</span>});
  }
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(err);
})

<span class="hljs-keyword">let</span> base = <span class="hljs-string">''</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> postRequest = <span class="hljs-function">(<span class="hljs-params">url, params</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> axios({
    method: <span class="hljs-string">'post'</span>,
    url: <span class="hljs-string">`<span class="hljs-subst">${base}</span><span class="hljs-subst">${url}</span>`</span>,
    data: params,
    transformRequest: [<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
      <span class="hljs-keyword">let</span> ret = <span class="hljs-string">''</span>
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> it <span class="hljs-keyword">in</span> data) {
        ret += <span class="hljs-built_in">encodeURIComponent</span>(it) + <span class="hljs-string">'='</span> + <span class="hljs-built_in">encodeURIComponent</span>(data[it]) + <span class="hljs-string">'&amp;'</span>
      }
      <span class="hljs-keyword">return</span> ret
    }],
    headers: {
      <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/x-www-form-urlencoded'</span>
    }
  });
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> uploadFileRequest = <span class="hljs-function">(<span class="hljs-params">url, params</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> axios({
    method: <span class="hljs-string">'post'</span>,
    url: <span class="hljs-string">`<span class="hljs-subst">${base}</span><span class="hljs-subst">${url}</span>`</span>,
    data: params,
    headers: {
      <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'multipart/form-data'</span>
    }
  });
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> putRequest = <span class="hljs-function">(<span class="hljs-params">url, params</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> axios({
    method: <span class="hljs-string">'put'</span>,
    url: <span class="hljs-string">`<span class="hljs-subst">${base}</span><span class="hljs-subst">${url}</span>`</span>,
    data: params,
    transformRequest: [<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
      <span class="hljs-keyword">let</span> ret = <span class="hljs-string">''</span>
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> it <span class="hljs-keyword">in</span> data) {
        ret += <span class="hljs-built_in">encodeURIComponent</span>(it) + <span class="hljs-string">'='</span> + <span class="hljs-built_in">encodeURIComponent</span>(data[it]) + <span class="hljs-string">'&amp;'</span>
      }
      <span class="hljs-keyword">return</span> ret
    }],
    headers: {
      <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/x-www-form-urlencoded'</span>
    }
  });
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> deleteRequest = <span class="hljs-function">(<span class="hljs-params">url</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> axios({
    method: <span class="hljs-string">'delete'</span>,
    url: <span class="hljs-string">`<span class="hljs-subst">${base}</span><span class="hljs-subst">${url}</span>`</span>
  });
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> getRequest = <span class="hljs-function">(<span class="hljs-params">url</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> axios({
    method: <span class="hljs-string">'get'</span>,
    url: <span class="hljs-string">`<span class="hljs-subst">${base}</span><span class="hljs-subst">${url}</span>`</span>
  });
}</code></pre>
<p>封装之后的错误信息这个大家一目了然，没啥好说的，唯一要说的是当出错的时候我执行的是：<code>Promise.resolve(err);</code>，而不是<code>Promise.reject(err);</code>  </p>
<p>这是什么原因呢？因为封装axios一个重要的目的就是希望能够对错误进行统一处理，不用在每一次发起网络请求的时候都去处理各种异常情况，将所有的异常情况都在工具js中进行统一的处理。但是这种方式也带来一个问题，就是我在发起网络请求的时候，一般都会开启一个进度条，当网络请求结束时，不论请求成功还是失败，我都要将这个进度条关闭掉，而失败的处理我都统一写在工具js里边了，因此就没在请求失败时关闭进度条了，解决这个问题，有两种方案：  </p>
<p>1.直接在request的拦截器中开启一个fullscreen的loading，然后在response的拦截器中将其关闭，即我将进度条也封装到工具js中了，但是非常不推荐这种方式，因为这种方式的用户体验非常之差，有兴趣的小伙伴可以自己试一下就知道了。  </p>
<p>2.第二种解决方案就是大家看到的，我返回一个<code>Promise.resolve(err)</code>，则这个请求不会就此结束，错误的message我已经弹出来了，但是这条消息还是会继续传到then中，也就是说，无论请求成功还是失败，我在成功的回调中都能收到通知，这样我就可以将loading关闭了，比如下面这个登录请求：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _this = this;
this.loading = true;
this.postRequest('/login', {
    username: this.loginForm.username,
    password: this.loginForm.password
}).then(resp=> {
    _this.loading = false;
    if (resp &amp;&amp; resp.status == 200) {
    _this.getRequest(&quot;/config/hr&quot;).then(resp=> {
        if (resp &amp;&amp; resp.status == 200) {
        var data = resp.data;
        _this.$store.commit('login', data);
        var path = _this.$route.query.redirect;
        _this.$router.replace({path: path == '/' || path == undefined ? '/home' : path});
        }
    })
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
<span class="hljs-keyword">this</span>.loading = <span class="hljs-literal">true</span>;
<span class="hljs-keyword">this</span>.postRequest(<span class="hljs-string">'/login'</span>, {
    username: <span class="hljs-keyword">this</span>.loginForm.username,
    password: <span class="hljs-keyword">this</span>.loginForm.password
}).then(resp=&gt; {
    _this.loading = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">if</span> (resp &amp;&amp; resp.status == <span class="hljs-number">200</span>) {
    _this.getRequest(<span class="hljs-string">"/config/hr"</span>).then(resp=&gt; {
        <span class="hljs-keyword">if</span> (resp &amp;&amp; resp.status == <span class="hljs-number">200</span>) {
        <span class="hljs-keyword">var</span> <span class="hljs-keyword">data</span> = resp.<span class="hljs-keyword">data</span>;
        _this.$store.commit(<span class="hljs-string">'login'</span>, <span class="hljs-keyword">data</span>);
        <span class="hljs-keyword">var</span> path = _this.$route.query.redirect;
        _this.$router.replace({path: path == <span class="hljs-string">'/'</span> || path == undefined ? <span class="hljs-string">'/home'</span> : path});
        }
    })
    }
});</code></pre>
<h1 id="articleHeader1">添加Vue插件</h1>
<p>由于我对axios进行了封装，因此在每一个需要使用axios的地方，都需要导入相应的请求，略显麻烦，参考<a href="https://cn.vuejs.org/v2/guide/plugins.html" rel="nofollow noreferrer" target="_blank">https://cn.vuejs.org/v2/guide...</a>，我将请求方法挂到Vue上，具体操作如下：  </p>
<p>1.在main.js中导入所有的请求方法，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {getRequest} from './utils/api'
import {postRequest} from './utils/api'
import {deleteRequest} from './utils/api'
import {putRequest} from './utils/api'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> {getRequest} <span class="hljs-keyword">from</span> <span class="hljs-string">'./utils/api'</span>
<span class="hljs-keyword">import</span> {postRequest} <span class="hljs-keyword">from</span> <span class="hljs-string">'./utils/api'</span>
<span class="hljs-keyword">import</span> {deleteRequest} <span class="hljs-keyword">from</span> <span class="hljs-string">'./utils/api'</span>
<span class="hljs-keyword">import</span> {putRequest} <span class="hljs-keyword">from</span> <span class="hljs-string">'./utils/api'</span></code></pre>
<p>2.把它们添加到 Vue.prototype 上，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code><span class="hljs-type">Vue</span>.proto<span class="hljs-keyword">type</span>.getRequest = getRequest;
<span class="hljs-type">Vue</span>.proto<span class="hljs-keyword">type</span>.postRequest = postRequest;
<span class="hljs-type">Vue</span>.proto<span class="hljs-keyword">type</span>.deleteRequest = deleteRequest;
<span class="hljs-type">Vue</span>.proto<span class="hljs-keyword">type</span>.putRequest = putRequest;</code></pre>
<p>如此之后，以后再需要发送网络请求，就不需要导入api了，直接通过下面这种方式即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.postRequest('/login', {
    username: this.loginForm.username,
    password: this.loginForm.password
}).then(resp=> {
    ...
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">this</span>.postRequest(<span class="hljs-string">'/login'</span>, {
    username: <span class="hljs-keyword">this</span>.loginForm.username,
    password: <span class="hljs-keyword">this</span>.loginForm.password
}).then(resp=&gt; {
    ...
    }
});</code></pre>
<p>OK，如此之后，网络请求处理就so easy了。  </p>
<p>关注公众号，可以及时接收到最新文章:  </p>
<p><span class="img-wrap"><img data-src="/img/bVUERD?w=258&amp;h=258" src="https://static.alili.tech/img/bVUERD?w=258&amp;h=258" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
axios请求封装和异常统一处理

## 原文链接
[https://segmentfault.com/a/1190000012804684](https://segmentfault.com/a/1190000012804684)

