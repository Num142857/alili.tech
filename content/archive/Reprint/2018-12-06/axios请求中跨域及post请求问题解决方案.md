---
title: 'axios请求中跨域及post请求问题解决方案' 
date: 2018-12-06 2:30:09
hidden: true
slug: mc1pnpkr9x
categories: [reprint]
---

{{< raw >}}

                    
<p>闲话不多说，用到vue的童鞋们应该大部分都会遇到请求中的各种奇葩问题，昨天研究一天，终于搞出来个所以然了，写篇文章拯救一下广大的童鞋们，某度娘当然也可以搜到，但一般解决了一个问题后就会出现另外一个问题，一个接一个，不断的问题涌现在我的console里面。印象中，我应该遇到过403,405,302,这几个错误，403错误通常是因为跨域请求无权限，而405是因为方法不允许method not allowed,偶尔还会遇到302的错误。以下是我在换了无数次配置后的最好的解决方案了。</p>
<p>1.首先，本地请求测试环境的接口需要跨域，解决跨域问题当然用配置就解决了，找到config/index.js文件中的module.exports中的dev</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proxyTable: {
        '/api': {
            target: 'https://api.douban.com',//设置你调用的接口域名和端口号 别忘了加http
            changeOrigin: true,
            pathRewrite: {
              '^/api': '' //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'https://api.douban.com/user/add'，直接写‘/api/user/add’即可，此处的‘api’可以设置为自己想要设置的任何词语，符合规范即可
            }
        }
    },
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>proxyTable: {
        <span class="hljs-string">'/api'</span>: {
            target: <span class="hljs-string">'https://api.douban.com'</span>,<span class="hljs-regexp">//</span>设置你调用的接口域名和端口号 别忘了加http
            changeOrigin: true,
            pathRewrite: {
              <span class="hljs-string">'^/api'</span>: <span class="hljs-string">''</span> <span class="hljs-regexp">//</span>这里理解成用‘<span class="hljs-regexp">/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'https:/</span><span class="hljs-regexp">/api.douban.com/u</span>ser<span class="hljs-regexp">/add'，直接写‘/</span>api<span class="hljs-regexp">/user/</span>add’即可，此处的‘api’可以设置为自己想要设置的任何词语，符合规范即可
            }
        }
    },
</code></pre>
<p>2.在vue的项目入口文件main.js中，引入我们所需要axios(已经封装好的ajax，也可以用fetch，但是兼容性不如axios好)，同时需要引入qs模块(我们在做post请求的时候需要用到)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios' // 引入axios 
import qs from 'qs' // 引入qs
Vue.prototype.$http = axios;
Vue.prototype.HOST = '/api' // 此处可根据个人习惯设置 此处的‘api’ 跟index.js中的‘api’一致，则所有的请求只需要使用this.HOST即可

//添加请求拦截器
axios.interceptors.request.use(function (config) {
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  if(config.method === 'post') { // post请求时，处理数据
      config.data = qs.stringify( {
          ...config.data //后台数据接收这块需要以表单形式提交数据，而axios中post默认的提交是json数据,所以这里选用qs模块来处理数据，也有其他处理方式，但个人觉得这个方式最简单好用
      })
  } 
  return config;
}, function (error) {
  loadinginstace.close()
  return Promise.reject(error);
})
//添加响应拦截器
axios.interceptors.response.use(function(response){
  return response;
},function(error){
 return Promise.reject(error);
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span> <span class="hljs-comment">// 引入axios </span>
<span class="hljs-keyword">import</span> qs <span class="hljs-keyword">from</span> <span class="hljs-string">'qs'</span> <span class="hljs-comment">// 引入qs</span>
Vue.prototype.$http = axios;
Vue.prototype.HOST = <span class="hljs-string">'/api'</span> <span class="hljs-comment">// 此处可根据个人习惯设置 此处的‘api’ 跟index.js中的‘api’一致，则所有的请求只需要使用this.HOST即可</span>

<span class="hljs-comment">//添加请求拦截器</span>
axios.interceptors.request.use(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">config</span>) </span>{
  config.headers[<span class="hljs-string">'Content-Type'</span>] = <span class="hljs-string">'application/x-www-form-urlencoded'</span>
  <span class="hljs-keyword">if</span>(config.method === <span class="hljs-string">'post'</span>) { <span class="hljs-comment">// post请求时，处理数据</span>
      config.data = qs.stringify( {
          ...config.data <span class="hljs-comment">//后台数据接收这块需要以表单形式提交数据，而axios中post默认的提交是json数据,所以这里选用qs模块来处理数据，也有其他处理方式，但个人觉得这个方式最简单好用</span>
      })
  } 
  <span class="hljs-keyword">return</span> config;
}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
  loadinginstace.close()
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
})
<span class="hljs-comment">//添加响应拦截器</span>
axios.interceptors.response.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>)</span>{
  <span class="hljs-keyword">return</span> response;
},<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>)</span>{
 <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
});
</code></pre>
<p>3.在vue文件中的使用方法，get与post方法均可~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // 以下为请求测试环境的get接口测试
  this.$http.get(this.HOST + '/init',{
    params:{
      &quot;cityCode&quot;:&quot;010&quot;
    }
  }).then((response) => {
    console.log(&quot;get:&quot;+response.data);
  });

  // 以下为请求测试环境的post接口测试 处理数据这块儿，试用过很多种方法，没效果…… 例如 用字符串拼接，以及用params.append,亲测数据丢失，嗯，还是乖乖的用qs吧……
  let url = this.HOST + '/mod';
  let data = {
    &quot;savestatus&quot;:1,&quot;favType&quot;:1,&quot;tag&quot;:&quot;danny&quot;
  };
  this.$http.post(url,data).then((response) => {
      console.log(&quot;post:&quot;+response.data);
  })
  // 以下为请求本地json文件的方法，本地json文件必须放在最外层的static/xxx.json
  this.$http.get(&quot;../static/datagrid_data1.json&quot;).then(response => {  
    console.log(&quot;static:&quot;+response.data); 
  }); 

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>  <span class="hljs-comment">// 以下为请求测试环境的get接口测试</span>
  <span class="hljs-keyword">this</span>.$http.<span class="hljs-keyword">get</span>(<span class="hljs-keyword">this</span>.HOST + <span class="hljs-string">'/init'</span>,{
    params:{
      <span class="hljs-string">"cityCode"</span>:<span class="hljs-string">"010"</span>
    }
  }).then((response) =&gt; {
    console.log(<span class="hljs-string">"get:"</span>+response.<span class="hljs-keyword">data</span>);
  });

  <span class="hljs-comment">// 以下为请求测试环境的post接口测试 处理数据这块儿，试用过很多种方法，没效果…… 例如 用字符串拼接，以及用params.append,亲测数据丢失，嗯，还是乖乖的用qs吧……</span>
  let url = <span class="hljs-keyword">this</span>.HOST + <span class="hljs-string">'/mod'</span>;
  let <span class="hljs-keyword">data</span> = {
    <span class="hljs-string">"savestatus"</span>:<span class="hljs-number">1</span>,<span class="hljs-string">"favType"</span>:<span class="hljs-number">1</span>,<span class="hljs-string">"tag"</span>:<span class="hljs-string">"danny"</span>
  };
  <span class="hljs-keyword">this</span>.$http.post(url,<span class="hljs-keyword">data</span>).then((response) =&gt; {
      console.log(<span class="hljs-string">"post:"</span>+response.<span class="hljs-keyword">data</span>);
  })
  <span class="hljs-comment">// 以下为请求本地json文件的方法，本地json文件必须放在最外层的static/xxx.json</span>
  <span class="hljs-keyword">this</span>.$http.<span class="hljs-keyword">get</span>(<span class="hljs-string">"../static/datagrid_data1.json"</span>).then(response =&gt; {  
    console.log(<span class="hljs-string">"static:"</span>+response.<span class="hljs-keyword">data</span>); 
  }); 

</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV7085?w=638&amp;h=92" src="https://static.alili.tech/img/bV7085?w=638&amp;h=92" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>所有请求均成功！！！开森~~~ 撒花<br>以上就是整个axios的跨域以及post请求的解决方案。如果大家还有其他更好的建议，欢迎私信我补充，或者评论补充~~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
axios请求中跨域及post请求问题解决方案

## 原文链接
[https://segmentfault.com/a/1190000014265711](https://segmentfault.com/a/1190000014265711)

