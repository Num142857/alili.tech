---
title: 'cors跨域之简单请求与预检请求（发送请求头带令牌token）' 
date: 2019-01-10 2:30:08
hidden: true
slug: a8gzczukyqo
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">引子</h3>
<p>自从从JAVA伪全栈转前端以来，学习的路上就充满了荆棘（奇葩问题），而涉及前后端分离这个问题，对cors的应用不断增多，暴露出的问题也接踵而至。<br>这两天动手实践基于Token的WEB后台认证机制，看过诸多理论（<a href="http://www.cnblogs.com/xiekeli/p/5607107.html" rel="nofollow noreferrer" target="_blank">较好一篇</a>推荐），正所谓虑一千次，不如去做一次。 犹豫一万次，不如实践一次，所以就有了下文，关于token的生成，另外一篇文章会细讲，本篇主要讨论在发送ajax请求，头部带上自定义token验证验证，暴露出的跨域问题。</p>
<h3 id="articleHeader1">先说说定义</h3>
<p>CORS：跨来源资源共享（CORS）是一份浏览器技术的规范，提供了 Web 服务从不同网域传来沙盒脚本的方法，以避开浏览器的同源策略，是 JSONP 模式的现代版。与 JSONP 不同，CORS 除了 GET 要求方法以外也支持其他的 HTTP 要求。用 CORS 可以让网页设计师用一般的 XMLHttpRequest，这种方式的错误处理比JSONP要来的好，JSONP对于 RESTful 的 API 来说，发送 POST/PUT/DELET 请求将成为问题，不利于接口的统一。但另一方面，JSONP 可以在不支持 CORS 的老旧浏览器上运作。不过现代的浏览器（IE10以上）基本都支持 CORS。<br>预检请求（option）:在 CORS 中，可以使用 OPTIONS 方法发起一个预检请求(一般都是浏览检测到请求跨域时，会自动发起)，以检测实际请求是否可以被服务器所接受。预检请求报文中的 Access-Control-Request-Method 首部字段告知服务器实际请求所使用的 HTTP 方法；Access-Control-Request-Headers 首部字段告知服务器实际请求所携带的自定义首部字段。服务器基于从预检请求获得的信息来判断，是否接受接下来的实际请求。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="OPTIONS /resources/post-here/ HTTP/1.1 
Host: bar.other 
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8 
Accept-Language: en-us,en;q=0.5 
Accept-Encoding: gzip,deflate 
Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7 
Connection: keep-alive 
Origin: http://foo.example 
Access-Control-Request-Method: POST 
Access-Control-Request-Headers: X-PINGOTHER, Content-Type" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>OPTIONS <span class="hljs-regexp">/resources/</span>post-here<span class="hljs-regexp">/ HTTP/</span><span class="hljs-number">1.1</span> 
<span class="hljs-string">Host:</span> bar.other 
<span class="hljs-string">Accept:</span> text<span class="hljs-regexp">/html,application/</span>xhtml+xml,application<span class="hljs-regexp">/xml;q=0.9,*/</span>*;q=<span class="hljs-number">0.8</span> 
Accept-<span class="hljs-string">Language:</span> en-us,en;q=<span class="hljs-number">0.5</span> 
Accept-<span class="hljs-string">Encoding:</span> gzip,deflate 
Accept-<span class="hljs-string">Charset:</span> ISO<span class="hljs-number">-8859</span><span class="hljs-number">-1</span>,utf<span class="hljs-number">-8</span>;q=<span class="hljs-number">0.7</span>,*;q=<span class="hljs-number">0.7</span> 
<span class="hljs-string">Connection:</span> keep-alive 
<span class="hljs-string">Origin:</span> <span class="hljs-string">http:</span><span class="hljs-comment">//foo.example </span>
Access-Control-Request-<span class="hljs-string">Method:</span> POST 
Access-Control-Request-<span class="hljs-string">Headers:</span> X-PINGOTHER, Content-Type</code></pre>
<p>服务器所返回的 Access-Control-Allow-Methods 首部字段将所有允许的请求方法告知客户端。该首部字段与 Allow 类似，但只能用于涉及到 CORS 的场景中。</p>
<h3 id="articleHeader2">问题描述</h3>
<p>话不多说，先上代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="前端（ajax库：vue-resource）
        userLogin:function(){
            this.$http({
                method:'post',
                url:'http://localhost:8089/StockAnalyse/LoginServlet',
                params:{&quot;flag&quot;:&quot;ajaxlogin&quot;,&quot;loginName&quot;:this.userInfo.id,&quot;loginPwd&quot;:this.userInfo.psd}, 
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}, 
                credientials:false, 
                emulateJSON: true                    
            }).then(function(response){
                sessionStorage.setItem(&quot;token&quot;,response.data);
                this.isActive =false;
                document.querySelector(&quot;#showInfo&quot;).classList.toggle(&quot;isLogin&quot;);
            })                 
        }
后端相关配置：
        response.setHeader(&quot;Access-Control-Allow-Origin&quot;, &quot;http://localhost&quot;); //允许来之域名为http://localhost的请求        
    response.setHeader(&quot;Access-Control-Allow-Headers&quot;, &quot;Origin,No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With, userId, token&quot;);
    response.setHeader(&quot;Access-Control-Allow-Methods&quot;, &quot;POST, GET, OPTIONS, DELETE&quot;); //请求允许的方法
    response.setHeader(&quot;Access-Control-Max-Age&quot;, &quot;3600&quot;);    //身份认证(预检)后，xxS以内发送请求不在需要预检，既可以直接跳过预检，进行请求(前面只是照猫画虎，后面才理解)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>前端（ajax库：vue-resource）
        userLogin:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">this</span>.$http({
                <span class="hljs-attr">method</span>:<span class="hljs-string">'post'</span>,
                <span class="hljs-attr">url</span>:<span class="hljs-string">'http://localhost:8089/StockAnalyse/LoginServlet'</span>,
                <span class="hljs-attr">params</span>:{<span class="hljs-string">"flag"</span>:<span class="hljs-string">"ajaxlogin"</span>,<span class="hljs-string">"loginName"</span>:<span class="hljs-keyword">this</span>.userInfo.id,<span class="hljs-string">"loginPwd"</span>:<span class="hljs-keyword">this</span>.userInfo.psd}, 
                <span class="hljs-attr">headers</span>: {<span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/x-www-form-urlencoded'</span>}, 
                <span class="hljs-attr">credientials</span>:<span class="hljs-literal">false</span>, 
                <span class="hljs-attr">emulateJSON</span>: <span class="hljs-literal">true</span>                    
            }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>)</span>{
                sessionStorage.setItem(<span class="hljs-string">"token"</span>,response.data);
                <span class="hljs-keyword">this</span>.isActive =<span class="hljs-literal">false</span>;
                <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"#showInfo"</span>).classList.toggle(<span class="hljs-string">"isLogin"</span>);
            })                 
        }
后端相关配置：
        response.setHeader(<span class="hljs-string">"Access-Control-Allow-Origin"</span>, <span class="hljs-string">"http://localhost"</span>); <span class="hljs-comment">//允许来之域名为http://localhost的请求        </span>
    response.setHeader(<span class="hljs-string">"Access-Control-Allow-Headers"</span>, <span class="hljs-string">"Origin,No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With, userId, token"</span>);
    response.setHeader(<span class="hljs-string">"Access-Control-Allow-Methods"</span>, <span class="hljs-string">"POST, GET, OPTIONS, DELETE"</span>); <span class="hljs-comment">//请求允许的方法</span>
    response.setHeader(<span class="hljs-string">"Access-Control-Max-Age"</span>, <span class="hljs-string">"3600"</span>);    <span class="hljs-comment">//身份认证(预检)后，xxS以内发送请求不在需要预检，既可以直接跳过预检，进行请求(前面只是照猫画虎，后面才理解)</span></code></pre>
<p>关于上面一段代码，是我的用户首次登录认证，生成token令牌，保存在sessionStorage中，供后面调用；需要说明的是，前端服务器地址是：localhost:80,后端服务器地址：localhost:8089，所以前后端涉及到跨域，自己在后端做了相应的跨域设置：response.setHeader("Access-Control-Allow-Origin", "http://localhost"); 所以登录认证,安全的实现了跨域信息认证，后端相应发送回来了相应的token信息。<br>但获取到token后，想在需要的时候，在请求的头部携带上这个令牌，来做相应的身份认证，所以自己在请求中做了这些改动（有标注），后端没改动，源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        checkIdentity:function(){
            let token =sessionStorage.getItem('token');
            this.$http({
                method:'post',
                url:'http://localhost:8089/StockAnalyse/LoginServlet',
                params:{&quot;flag&quot;:&quot;checklogin&quot;,&quot;isLogin&quot;:true,&quot;token&quot;:token}, 
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}, 
                headers:{'token':token},        //header中携带令牌信息            
                credientials:false, 
                emulateJSON: true                    
            }).then(function(response){
                console.log(response.data);
            })                 
        }   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>        checkIdentity:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">let</span> token =sessionStorage.getItem(<span class="hljs-string">'token'</span>);
            <span class="hljs-keyword">this</span>.$http({
                <span class="hljs-attr">method</span>:<span class="hljs-string">'post'</span>,
                <span class="hljs-attr">url</span>:<span class="hljs-string">'http://localhost:8089/StockAnalyse/LoginServlet'</span>,
                <span class="hljs-attr">params</span>:{<span class="hljs-string">"flag"</span>:<span class="hljs-string">"checklogin"</span>,<span class="hljs-string">"isLogin"</span>:<span class="hljs-literal">true</span>,<span class="hljs-string">"token"</span>:token}, 
                <span class="hljs-attr">headers</span>: {<span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/x-www-form-urlencoded'</span>}, 
                <span class="hljs-attr">headers</span>:{<span class="hljs-string">'token'</span>:token},        <span class="hljs-comment">//header中携带令牌信息            </span>
                credientials:<span class="hljs-literal">false</span>, 
                <span class="hljs-attr">emulateJSON</span>: <span class="hljs-literal">true</span>                    
            }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>)</span>{
                <span class="hljs-built_in">console</span>.log(response.data);
            })                 
        }   </code></pre>
<p>但实际上在devtools打印了如下错误信息：Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin '<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>' is therefore not allowed access.仔细想一想，好像，似乎这个问题遇到过，还提过问，确实提过，<a href="https://segmentfault.com/q/1010000009255088">链接在这里</a>。但这次的设置和上次一样，就在header里多加了一个自定义token，但却报了和上次没有设置headers: {'Content-Type': 'application/x-www-form-urlencoded'}一样的错误信息，于是，不知所措，算了，重头再来，好好百度，研究一下cors跨域。</p>
<h3 id="articleHeader3">理论学习</h3>
<p>运气不错，找到了<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS" rel="nofollow noreferrer" target="_blank">一篇好文</a>，文章讲的很细，也找到自己问题的所在：触发 CORS 预检请求。引用原文的话加以自己总结：跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站有权限访问哪些资源。另外，规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request：似曾相识有没有？诶，对，上面那个错误信息中，就有一个这样陌生的词汇），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）。所以跨域请求分两种：简单请求和预检请求。一次完整的请求不需要服务端预检，直接响应的，归为简单请求；而响应前需要预检的，称为预检请求，只有预检请求通过，才有接下来的简单请求。对于那些是简单请求，那些会触发预检请求，文章做了详细的总结，这里列出触发预检请求的条件（不知道脑子为啥会想到那些会触发BFC的条件），不要跑题，原文是这样总结的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="当请求满足下述任一条件时，即应首先发送预检请求：
使用了下面任一 HTTP 方法：
PUT
DELETE
CONNECT
OPTIONS
TRACE
PATCH
人为设置了对 CORS 安全的首部字段集合之外的其他首部字段。该集合为：
Accept
Accept-Language
Content-Language
Content-Type (but note the additional requirements below)
DPR
Downlink
Save-Data
Viewport-Width
Width
 Content-Type 的值不属于下列之一:
application/x-www-form-urlencoded
multipart/form-data
text/plain" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>当请求满足下述任一条件时，即应首先发送预检请求：
使用了下面任一 HTTP 方法：
PUT
<span class="hljs-keyword">DELETE</span>
<span class="hljs-keyword">CONNECT</span>
OPTIONS
<span class="hljs-keyword">TRACE</span>
<span class="hljs-keyword">PATCH</span>
人为设置了对 CORS 安全的首部字段集合之外的其他首部字段。该集合为：
<span class="hljs-keyword">Accept</span>
<span class="hljs-keyword">Accept</span>-<span class="hljs-keyword">Language</span>
<span class="hljs-keyword">Content</span>-<span class="hljs-keyword">Language</span>
<span class="hljs-keyword">Content</span>-<span class="hljs-keyword">Type</span> (but note the additional requirements below)
DPR
Downlink
<span class="hljs-keyword">Save</span>-<span class="hljs-keyword">Data</span>
Viewport-Width
Width
 <span class="hljs-keyword">Content</span>-<span class="hljs-keyword">Type</span> 的值不属于下列之一:
application/x-www-<span class="hljs-keyword">form</span>-urlencoded
multipart/<span class="hljs-keyword">form</span>-<span class="hljs-keyword">data</span>
<span class="hljs-built_in">text</span>/plain</code></pre>
<h3 id="articleHeader4">问题分析</h3>
<p>所以，再来看自己两次犯错（第一次是没有设置：headers: {'Content-Type': 'application/x-www-form-urlencoded'}, 第二次是设置自定义header，headers:{'token':token}。很巧，有没有，一次少，一次多，都点燃了导火索），其实都是触发了预检请求。对于第一次的错误，很好解决，增加headers: {'Content-Type': 'application/x-www-form-urlencoded'}，就解决了，<a href="http://zccst.iteye.com/blog/2180127" rel="nofollow noreferrer" target="_blank">关于Conten-Type的几种取值，你需要知道的</a>。但对于第二个错误，好像没法向第一种那样，将预检请求转变为简单请求，所以，只有寻找方法怎么在后端实现相应的预检请求，来返回一个状态码2xx，告诉浏览器此次跨域请求可以继续。所以注意力转向后端。<br>关于JAVA实现预检请求，基本都是采用过滤器，不要问我为什么不是监听器或者拦截器（我就是个伪全栈，就不要相互为难了，自己百度之），自定义（copy）了一个filter,并在web.xml中进行了设置。源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Filter接口实现部分：
package stock.model;
import java.io.IOException;   
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;    
import org.apache.commons.httpclient.HttpStatus;   //这里需要添加commons-httpclient-3.1.jar
public class CorsFilter implements Filter {     //filter 接口的自定义实现
    public void init(FilterConfig filterConfig) throws ServletException {
    }
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        response.setHeader(&quot;Access-Control-Allow-Origin&quot;, &quot;*&quot;);           
        String token = request.getHeader(&quot;token&quot;);
        System.out.println(&quot;filter origin:&quot;+token);//通过打印，可以看到一次非简单请求，会被过滤两次，即请求两次，第一次请求确认是否符合跨域要求（预检），这一次是不带headers的自定义信息，第二次请求会携带自定义信息。
        if (&quot;OPTIONS&quot;.equals(request.getMethod())){//这里通过判断请求的方法，判断此次是否是预检请求，如果是，立即返回一个204状态吗，标示，允许跨域；预检后，正式请求，这个方法参数就是我们设置的post了
          response.setStatus(HttpStatus.SC_NO_CONTENT); //HttpStatus.SC_NO_CONTENT = 204
          response.setHeader(&quot;Access-Control-Allow-Methods&quot;, &quot;POST, GET, DELETE, OPTIONS, DELETE&quot;);//当判定为预检请求后，设定允许请求的方法
          response.setHeader(&quot;Access-Control-Allow-Headers&quot;, &quot;Content-Type, x-requested-with, Token&quot;); //当判定为预检请求后，设定允许请求的头部类型
          response.addHeader(&quot;Access-Control-Max-Age&quot;, &quot;1&quot;);                           
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }
    @Override
    public void destroy() {     
    }
}
web.xml配置部分
<filter>
<filter-name>cors</filter-name>
<filter-class>stock.model.CorsFilter</filter-class>
</filter>
<filter-mapping>
<filter-name>cors</filter-name>
<url-pattern>/*</url-pattern>
</filter-mapping> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs swift"><code><span class="hljs-type">Filter</span>接口实现部分：
package stock.model;
<span class="hljs-keyword">import</span> java.io.IOException;   
<span class="hljs-keyword">import</span> javax.servlet.Filter;
<span class="hljs-keyword">import</span> javax.servlet.FilterChain;
<span class="hljs-keyword">import</span> javax.servlet.FilterConfig;
<span class="hljs-keyword">import</span> javax.servlet.ServletException;
<span class="hljs-keyword">import</span> javax.servlet.ServletRequest;
<span class="hljs-keyword">import</span> javax.servlet.ServletResponse;
<span class="hljs-keyword">import</span> javax.servlet.http.HttpServletRequest;
<span class="hljs-keyword">import</span> javax.servlet.http.HttpServletResponse;    
<span class="hljs-keyword">import</span> org.apache.commons.httpclient.HttpStatus;   <span class="hljs-comment">//这里需要添加commons-httpclient-3.1.jar</span>
<span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CorsFilter</span> <span class="hljs-title">implements</span> <span class="hljs-title">Filter</span> </span>{     <span class="hljs-comment">//filter 接口的自定义实现</span>
    <span class="hljs-keyword">public</span> void <span class="hljs-keyword">init</span>(<span class="hljs-type">FilterConfig</span> filterConfig) <span class="hljs-keyword">throws</span> <span class="hljs-type">ServletException</span> {
    }
    @<span class="hljs-type">Override</span>
    <span class="hljs-keyword">public</span> void doFilter(<span class="hljs-type">ServletRequest</span> servletRequest, <span class="hljs-type">ServletResponse</span> servletResponse, <span class="hljs-type">FilterChain</span> filterChain) <span class="hljs-keyword">throws</span> <span class="hljs-type">IOException</span>, <span class="hljs-type">ServletException</span> {
        <span class="hljs-type">HttpServletResponse</span> response = (<span class="hljs-type">HttpServletResponse</span>) servletResponse;
        <span class="hljs-type">HttpServletRequest</span> request = (<span class="hljs-type">HttpServletRequest</span>) servletRequest;
        response.setHeader(<span class="hljs-string">"Access-Control-Allow-Origin"</span>, <span class="hljs-string">"*"</span>);           
        <span class="hljs-type">String</span> token = request.getHeader(<span class="hljs-string">"token"</span>);
        <span class="hljs-type">System</span>.out.<span class="hljs-built_in">println</span>(<span class="hljs-string">"filter origin:"</span>+token);<span class="hljs-comment">//通过打印，可以看到一次非简单请求，会被过滤两次，即请求两次，第一次请求确认是否符合跨域要求（预检），这一次是不带headers的自定义信息，第二次请求会携带自定义信息。</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-string">"OPTIONS"</span>.equals(request.getMethod())){<span class="hljs-comment">//这里通过判断请求的方法，判断此次是否是预检请求，如果是，立即返回一个204状态吗，标示，允许跨域；预检后，正式请求，这个方法参数就是我们设置的post了</span>
          response.setStatus(<span class="hljs-type">HttpStatus</span>.<span class="hljs-type">SC_NO_CONTENT</span>); <span class="hljs-comment">//HttpStatus.SC_NO_CONTENT = 204</span>
          response.setHeader(<span class="hljs-string">"Access-Control-Allow-Methods"</span>, <span class="hljs-string">"POST, GET, DELETE, OPTIONS, DELETE"</span>);<span class="hljs-comment">//当判定为预检请求后，设定允许请求的方法</span>
          response.setHeader(<span class="hljs-string">"Access-Control-Allow-Headers"</span>, <span class="hljs-string">"Content-Type, x-requested-with, Token"</span>); <span class="hljs-comment">//当判定为预检请求后，设定允许请求的头部类型</span>
          response.addHeader(<span class="hljs-string">"Access-Control-Max-Age"</span>, <span class="hljs-string">"1"</span>);                           
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }
    @<span class="hljs-type">Override</span>
    <span class="hljs-keyword">public</span> void destroy() {     
    }
}
web.xml配置部分
&lt;<span class="hljs-built_in">filter</span>&gt;
&lt;<span class="hljs-built_in">filter</span>-name&gt;cors&lt;/<span class="hljs-built_in">filter</span>-name&gt;
&lt;<span class="hljs-built_in">filter</span>-<span class="hljs-class"><span class="hljs-keyword">class</span>&gt;<span class="hljs-title">stock</span>.<span class="hljs-title">model</span>.<span class="hljs-title">CorsFilter</span>&lt;/<span class="hljs-title">filter</span>-<span class="hljs-title">class</span>&gt;
&lt;/<span class="hljs-title">filter</span>&gt;
&lt;<span class="hljs-title">filter</span>-<span class="hljs-title">mapping</span>&gt;
&lt;<span class="hljs-title">filter</span>-<span class="hljs-title">name</span>&gt;<span class="hljs-title">cors</span>&lt;/<span class="hljs-title">filter</span>-<span class="hljs-title">name</span>&gt;
&lt;<span class="hljs-title">url</span>-<span class="hljs-title">pattern</span>&gt;/*&lt;/<span class="hljs-title">url</span>-<span class="hljs-title">pattern</span>&gt;
&lt;/<span class="hljs-title">filter</span>-<span class="hljs-title">mapping</span>&gt; </span></code></pre>
<h3 id="articleHeader5">结论</h3>
<p>当在后端实现添加上面的源码后，皆大欢喜，问题得以解决，补上失败和成功,自己截下的两张请求响应图。<span class="img-wrap"><img data-src="/img/bVPZ8K?w=1470&amp;h=1123" src="https://static.alili.tech/img/bVPZ8K?w=1470&amp;h=1123" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>仔细看请求响应失败发起响应那张图，在General的数据集中，可以看到方法是options，而非代码指定的post请求，所以这是一次浏览器发出的一次预检请求，让服务器确认此IP是否有访问的权限，如果有，服务器需要返回一个2xx的状态码给浏览器。紧接着再发起一次简单请求。如下面在devtools中的截取图片（为了对比清除，我把两次分别截取，做了拼接，因为不会做动态图）。可以看到同一个post请求，实际上产生了两次网络连接。<span class="img-wrap"><img data-src="/img/bVP7FU?w=1235&amp;h=742" src="https://static.alili.tech/img/bVP7FU?w=1235&amp;h=742" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>但关于cors,要去探索的，还有很多很多，所以遵循革命语录：实践（有时也可以是时间）是检验真理的唯一标准，是没有错的。后续有新的收获，再补充。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
cors跨域之简单请求与预检请求（发送请求头带令牌token）

## 原文链接
[https://segmentfault.com/a/1190000009971254](https://segmentfault.com/a/1190000009971254)

