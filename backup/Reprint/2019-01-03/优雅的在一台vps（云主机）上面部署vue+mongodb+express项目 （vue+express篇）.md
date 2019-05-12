---
title: '优雅的在一台vps（云主机）上面部署vue+mongodb+express项目 （vue+express篇）' 
date: 2019-01-03 2:30:11
hidden: true
slug: 66dg6d1o7xx
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">优雅的在一台vps（云主机）上面部署vue+mongodb+express项目 （vue+express篇）</h1>
<blockquote><p>项目： vue + express + mongodb<br>项目前后分离部署在一台服务器上面</p></blockquote>
<p>express端口：3000<br>mongodb端口：27017<br>vue端口：本地是8080 服务端是：80</p>
<h2 id="articleHeader1">本地开发配置</h2>
<blockquote><p>本地开发基于vue cli 端口是 8080如果请求api的时候在前缀加上localhost:3000会提示跨域问题，我们可以使用下面方式来解决这个问题</p></blockquote>
<h4>在vue项目路径找到这个文件 /vue-item/config/index.js 找到这行代码：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proxyTable: {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">proxyTable:</span> {}</code></pre>
<p>添加如下配置<br>demo:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proxyTable: {
       '/v1/**':{
        target: 'http://localhost:3000/',
        pathRewrite: {
          '^/v1': '/'
        }
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">proxyTable</span>: {
       <span class="hljs-string">'/v1/**'</span>:{
        <span class="hljs-attribute">target</span>: <span class="hljs-string">'http://localhost:3000/'</span>,
        <span class="hljs-attribute">pathRewrite</span>: {
          <span class="hljs-string">'^/v1'</span>: <span class="hljs-string">'/'</span>
        }
      }
    }</code></pre>
<p>v1 是我给api自动添加的前缀<br>这个前缀可以使用 axios 配置添加<br>在main.js 主入口文件添加<br>如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import apiConfig from '../config/api.config'
// import axios
import Axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, Axios)
// Axios.defaults.baseURL = apiConfig.baseUrl;
Axios.defaults.baseURL = 'v1/'  这样也ok的" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> apiConfig <span class="hljs-keyword">from</span> <span class="hljs-string">'../config/api.config'</span>
<span class="hljs-comment">// import axios</span>
<span class="hljs-keyword">import</span> Axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
<span class="hljs-keyword">import</span> VueAxios <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-axios'</span>
Vue.use(VueAxios, Axios)
<span class="hljs-comment">// Axios.defaults.baseURL = apiConfig.baseUrl;</span>
Axios.defaults.baseURL = <span class="hljs-string">'v1/'</span>  这样也ok的</code></pre>
<p>api.config</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="判断是开发模式还是本地模式，其实不需要这么麻烦 直接
const isProdMode = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
  baseUrl: isProdMode ? 'api.shudong.wang/v1/' : 'v1/'
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>判断是开发模式还是本地模式，其实不需要这么麻烦 直接
<span class="hljs-keyword">const</span> isProdMode = Object.is(<span class="hljs-built_in">process</span>.env.NODE_ENV, <span class="hljs-string">'production'</span>)

<span class="hljs-keyword">module</span>.exports = {
  baseUrl: isProdMode ? <span class="hljs-string">'api.shudong.wang/v1/'</span> : <span class="hljs-string">'v1/'</span>
}
</code></pre>
<p>如果把axios 配置了自动前缀<br>每次访问的时候</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  data(){
    return {
      articleList:Object
    }
  },
  mounted: function(){
    this.getArticleList()
  },
  methods:{
    getArticleList(){
      console.log(111111111)
          this.$http.get(&quot;/article/list&quot;) // this.$http  axios使用的一种方式
          .then((response)=>{
              console.log(response.data)
              let res = response.data;
              this.articleList = res.data;

          })
          .catch((error) =>{
            console.log(error)
          })
    }
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  data(){
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">articleList</span>:<span class="hljs-built_in">Object</span>
    }
  },
  <span class="hljs-attr">mounted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.getArticleList()
  },
  <span class="hljs-attr">methods</span>:{
    getArticleList(){
      <span class="hljs-built_in">console</span>.log(<span class="hljs-number">111111111</span>)
          <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">"/article/list"</span>) <span class="hljs-comment">// this.$http  axios使用的一种方式</span>
          .then(<span class="hljs-function">(<span class="hljs-params">response</span>)=&gt;</span>{
              <span class="hljs-built_in">console</span>.log(response.data)
              <span class="hljs-keyword">let</span> res = response.data;
              <span class="hljs-keyword">this</span>.articleList = res.data;

          })
          .catch(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span>{
            <span class="hljs-built_in">console</span>.log(error)
          })
    }
  },</code></pre>
<blockquote><p>上面请求的例子中相当于访问： localhost:8080/v1/article/list</p></blockquote>
<p>这样就可以解决跨域问题<br>其实最终访问的是 localhost:3000/article/list  express的api<br>这个v1只是api版本的标识，如果想带着，并且api是可以v1版本方式访问的，把代理的路径重新规则去掉就可以 <br>操作如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        proxyTable: {
       '/v1/**':{
        target: 'http://localhost:3000/',
        //pathRewrite: {  //这个规则去掉
        //  '^/v1': '/'
        //}
      },
      '/goods/*':{
        target:'http://localhost:3000'
      },
      '/users/**':{
        target:'http://localhost:3000'
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>        proxyTable: {
       <span class="hljs-string">'/v1/**'</span>:{
        target: <span class="hljs-string">'http://localhost:3000/'</span>,
        //pathRewrite: {  //这个规则去掉
        //  <span class="hljs-string">'^/v1'</span>: <span class="hljs-string">'/'</span>
        //}
      },
      <span class="hljs-string">'/goods/*'</span>:{
        target:<span class="hljs-string">'http://localhost:3000'</span>
      },
      <span class="hljs-string">'/users/**'</span>:{
        target:<span class="hljs-string">'http://localhost:3000'</span>
      }
    }</code></pre>
<h2 id="articleHeader2">服务端部署</h2>
<blockquote><p>本地可以使用proxyTable 解决跨域问题，那么服务端怎么解决跨域问题呢？</p></blockquote>
<p>answer：使用nginx反向代理</p>
<p>nginx配置： 仔细分析一下看看是否适合自己的业务场景</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="server
    {
        listen 80;
        #listen [::]:80;
        server_name zhenfan.shudong.wang ; #  你的域名不需要加http 
        index index.html index.htm index.php default.html default.htm default.php;
        root  /home/wwwroot/zhenfan/dist;

        include none.conf;
        #error_page   404   /404.html;

        # Deny access to PHP files in specific directory
        #location ~ /(wp-content|uploads|wp-includes|images)/.*\.php$ { deny all; }

        include enable-php.conf;

        location /v1 {
           proxy_pass http://127.0.0.1:3000/; # 当访问v1的时候默认转发到 3000端口
        }

        location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
        {
            expires      30d;
        }

        location ~ .*\.(js|css)?$
        {
            expires      12h;
        }

        location ~ /.well-known {
            allow all;
        }

        location ~ /\.
        {
            deny all;
        }

        access_log off;
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-section">server</span>
    {
        <span class="hljs-attribute">listen</span> <span class="hljs-number">80</span>;
        <span class="hljs-comment">#listen [::]:80;</span>
        <span class="hljs-attribute">server_name</span> zhenfan.shudong.wang ; <span class="hljs-comment">#  你的域名不需要加http </span>
        <span class="hljs-attribute">index</span> index.html index.htm index.php default.html default.htm default.php;
        <span class="hljs-attribute">root</span>  /home/wwwroot/zhenfan/dist;

        <span class="hljs-attribute">include</span> <span class="hljs-literal">none</span>.conf;
        <span class="hljs-comment">#error_page   404   /404.html;</span>

        <span class="hljs-comment"># Deny access to PHP files in specific directory</span>
        <span class="hljs-comment">#location ~ /(wp-content|uploads|wp-includes|images)/.*\.php$ { deny all; }</span>

        <span class="hljs-attribute">include</span> enable-php.conf;

        <span class="hljs-attribute">location</span> /v1 {
           <span class="hljs-attribute">proxy_pass</span> http://127.0.0.1:3000/; <span class="hljs-comment"># 当访问v1的时候默认转发到 3000端口</span>
        }

        <span class="hljs-attribute">location</span> <span class="hljs-regexp">~ .*\.(gif|jpg|jpeg|png|bmp|swf)$</span>
        {
            <span class="hljs-attribute">expires</span>      <span class="hljs-number">30d</span>;
        }

        <span class="hljs-attribute">location</span> <span class="hljs-regexp">~ .*\.(js|css)?$</span>
        {
            <span class="hljs-attribute">expires</span>      <span class="hljs-number">12h</span>;
        }

        <span class="hljs-attribute">location</span> <span class="hljs-regexp">~ /.well-known</span> {
            <span class="hljs-attribute">allow</span> all;
        }

        <span class="hljs-attribute">location</span> <span class="hljs-regexp">~ /\.</span>
        {
            <span class="hljs-attribute">deny</span> all;
        }

        <span class="hljs-attribute">access_log</span> <span class="hljs-literal">off</span>;
    }
</code></pre>
<p>关于express链接mongodb可以直接填写端口号，不存在跨域问题，直接 127.0.0.1：27017就ok，<br>怎么在服务器上面搭建可以参考上篇 mongodb篇</p>
<p>关于有什么问题，可以在下面留言，希望你是来讨论技术的。<br>上次写完一篇，一个小朋友，来到这里咬文嚼字，针对 部署这个词，说用的不当，还口口声声说是来讨论技术，把注意力放在这个上面上真没意义。<br>希望本篇文章能帮到你，解决你的问题。</p>
<p>github: wsdo</p>
<p><span class="img-wrap"><img data-src="/img/bVRMPD?w=1867&amp;h=833" src="https://static.alili.tech/img/bVRMPD?w=1867&amp;h=833" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
优雅的在一台vps（云主机）上面部署vue+mongodb+express项目 （vue+express篇）

## 原文链接
[https://segmentfault.com/a/1190000010792260](https://segmentfault.com/a/1190000010792260)

