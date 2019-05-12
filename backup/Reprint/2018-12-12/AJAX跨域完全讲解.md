---
title: 'AJAX跨域完全讲解' 
date: 2018-12-12 2:30:10
hidden: true
slug: 52dlcjq5lpf
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">AJAX跨域完全讲解</h1>
<p>今天在慕课网上学习了AJAX跨域完全讲解：<a href="https://www.imooc.com/learn/947" rel="nofollow noreferrer" target="_blank">https://www.imooc.com/learn/947</a></p>
<p>我在收集AJAX面试题的时候其实就已经有过AJAX跨域的问题的了，当时候知道了为什么会存在跨域，以及跨域解决的方案有哪些，今天随着课程的学习，又加深了AJAX跨域的理解，以此记录下来。</p>
<h2 id="articleHeader1">为什么会发生产生跨域问题？</h2>
<p>上面的图也很清晰了，因为浏览器为了安全(同源)，本身就限制了。</p>
<ul><li><strong>当我们发送XMLHttpRequest请求的时候，如果请求的是别的域(主机域名、端口)不同时，那么就会产生跨域问题(客户端无法获取服务端返回的数据)</strong></li></ul>
<p>值得注意的是：<strong>跨域的问题是发生在XMLHttpRequest请求的，也就是说，不是XMLHttpRequest请求是不会有跨域问题的</strong></p>
<ul><li>举个很简单的例子：在编写网页的时候，<code>&lt;img = src = www.xxxx.xxxx/ &gt;</code>，URL不是本域的还是可以正常获取该图片的</li></ul>
<h2 id="articleHeader2">解决跨域问题的思路</h2>
<p>明显地，跨域的问题是由于浏览器限制的，是XMLHttpRequest才会发生的，那么我们可以以这个思路去找找解决思路：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013473005?w=969&amp;h=581" src="https://static.alili.tech/img/remote/1460000013473005?w=969&amp;h=581" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>对于浏览器的问题，可以使用相关的参数进行启动浏览器，是可以解决跨域的问题，但是通用性是极低的，了解即可。</strong></p>
<h2 id="articleHeader3">JSONP解决跨域</h2>
<p>JSONP是JSON使用的一种补充方式，不是官方的协议。JSONP是一种解决跨域问题的一种<strong>协议</strong></p>
<p>JSONP这种解决方案其实现在已经很少用了(复杂一点，需要修改后台代码)，但我们可以适当了解一下。</p>
<h3 id="articleHeader4">使用步骤</h3>
<p><strong>在后端增加一个控制器，继承AbstractJsonpResponseBodyAdvice类，完整代码如下：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
@ControllerAdvice
public class JsonpAdvice extends AbstractJsonpResponseBodyAdvice {

    public JsonpAdvice() {
        // TODO Auto-generated constructor stub
        super(&quot;callback2&quot;);
    }
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java">
<span class="hljs-meta">@ControllerAdvice</span>
<span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">JsonpAdvice</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">AbstractJsonpResponseBodyAdvice</span> </span>{

    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-title">JsonpAdvice</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-comment">// TODO Auto-generated constructor stub</span>
        <span class="hljs-keyword">super</span>(<span class="hljs-string">"callback2"</span>);
    }
}

</code></pre>
<p>前端ajax请求：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

// 服务器返回的结果
    var result;

    $.ajax({
        url: base +&quot;/get1&quot;,
        dataType: &quot;jsonp&quot;,
        jsonp: &quot;callback2&quot;,

        //是否需要缓存，如果这里没有配置缓存，那么请求的URL还会有一个参数
        cache:true,
        success: function(json){
            result = json;
        }
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">

<span class="hljs-comment">// 服务器返回的结果</span>
    <span class="hljs-keyword">var</span> result;

    $.ajax({
        <span class="hljs-attr">url</span>: base +<span class="hljs-string">"/get1"</span>,
        <span class="hljs-attr">dataType</span>: <span class="hljs-string">"jsonp"</span>,
        <span class="hljs-attr">jsonp</span>: <span class="hljs-string">"callback2"</span>,

        <span class="hljs-comment">//是否需要缓存，如果这里没有配置缓存，那么请求的URL还会有一个参数</span>
        cache:<span class="hljs-literal">true</span>,
        <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">json</span>)</span>{
            result = json;
        }
    });</code></pre>
<p>注意的是，前端AJAX的<code>jsonp: "callback2",</code>要和我们的Controller<code>super("callback2");</code>是一致的，不然是不会有效的。</p>
<p>JSONP原理是动态创建script来进行请求的:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013473006?w=803&amp;h=164" src="https://static.alili.tech/img/remote/1460000013473006?w=803&amp;h=164" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>JSONP的弊端：</p>
<ul>
<li>要对服务器的代码进行改动</li>
<li>只支持GET方法(原理是动态创建script来进行请求的)</li>
<li>发送的不是XMLHttpRequest请求(XMLHttpRequest请求有很多好用的特性)</li>
</ul>
<p>参考资料：</p>
<ul><li><a href="https://www.cnblogs.com/blacksonny/p/5846411.html" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/blacksonny/p/5846411.html</a></li></ul>
<h2 id="articleHeader5">CORS解决跨域问题</h2>
<p><strong>CORS解决跨域问题(也就是我们服务端被调用方解决跨域的思路）</strong></p>
<p>对于CORS是怎么理解的，我就直接摘抄一下：<a href="https://segmentfault.com/a/1190000012469713#articleHeader8">https://segmentfault.com/a/1190000012469713#articleHeader8</a>的了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013473007?w=839&amp;h=875" src="https://static.alili.tech/img/remote/1460000013473007?w=839&amp;h=875" alt="" title="" style="cursor: pointer;"></span></p>
<p>在Java中，我们写下面这个过滤器，就可以完全解决跨域的问题了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

package com.imooc;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.buf.StringUtils;

public class CrosFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // TODO Auto-generated method stub

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        // TODO Auto-generated method stub

        HttpServletResponse res = (HttpServletResponse) response;
        
        HttpServletRequest req = (HttpServletRequest) request;
        
        
        //带cookie的时候，origin必须是全匹配，不能使用*
        String origin = req.getHeader(&quot;Origin&quot;);
        if (!org.springframework.util.StringUtils.isEmpty(origin)) {
            res.addHeader(&quot;Access-Control-Allow-Origin&quot;, origin);
        }
        res.addHeader(&quot;Access-Control-Allow-Methods&quot;, &quot;*&quot;);
        
        // 支持所有自定义头和预检命令(非简单请求会有预检命令)
        String headers = req.getHeader(&quot;Access-Control-Request-Headers&quot;);
        if (!org.springframework.util.StringUtils.isEmpty(headers)) {
            res.addHeader(&quot;Access-Control-Allow-Headers&quot;, headers);            
        }
        
        res.addHeader(&quot;Access-Control-Max-Age&quot;, &quot;3600&quot;);
        // enable cookie
        res.addHeader(&quot;Access-Control-Allow-Credentials&quot;, &quot;true&quot;);
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
        // TODO Auto-generated method stub

    }

}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java">

<span class="hljs-keyword">package</span> com.imooc;

<span class="hljs-keyword">import</span> java.io.IOException;

<span class="hljs-keyword">import</span> javax.servlet.Filter;
<span class="hljs-keyword">import</span> javax.servlet.FilterChain;
<span class="hljs-keyword">import</span> javax.servlet.FilterConfig;
<span class="hljs-keyword">import</span> javax.servlet.ServletException;
<span class="hljs-keyword">import</span> javax.servlet.ServletRequest;
<span class="hljs-keyword">import</span> javax.servlet.ServletResponse;
<span class="hljs-keyword">import</span> javax.servlet.http.HttpServletRequest;
<span class="hljs-keyword">import</span> javax.servlet.http.HttpServletResponse;

<span class="hljs-keyword">import</span> org.apache.tomcat.util.buf.StringUtils;

<span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CrosFilter</span> <span class="hljs-keyword">implements</span> <span class="hljs-title">Filter</span> </span>{

    <span class="hljs-meta">@Override</span>
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">init</span><span class="hljs-params">(FilterConfig filterConfig)</span> <span class="hljs-keyword">throws</span> ServletException </span>{
        <span class="hljs-comment">// TODO Auto-generated method stub</span>

    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">doFilter</span><span class="hljs-params">(ServletRequest request, ServletResponse response, FilterChain chain)</span>
            <span class="hljs-keyword">throws</span> IOException, ServletException </span>{
        <span class="hljs-comment">// TODO Auto-generated method stub</span>

        HttpServletResponse res = (HttpServletResponse) response;
        
        HttpServletRequest req = (HttpServletRequest) request;
        
        
        <span class="hljs-comment">//带cookie的时候，origin必须是全匹配，不能使用*</span>
        String origin = req.getHeader(<span class="hljs-string">"Origin"</span>);
        <span class="hljs-keyword">if</span> (!org.springframework.util.StringUtils.isEmpty(origin)) {
            res.addHeader(<span class="hljs-string">"Access-Control-Allow-Origin"</span>, origin);
        }
        res.addHeader(<span class="hljs-string">"Access-Control-Allow-Methods"</span>, <span class="hljs-string">"*"</span>);
        
        <span class="hljs-comment">// 支持所有自定义头和预检命令(非简单请求会有预检命令)</span>
        String headers = req.getHeader(<span class="hljs-string">"Access-Control-Request-Headers"</span>);
        <span class="hljs-keyword">if</span> (!org.springframework.util.StringUtils.isEmpty(headers)) {
            res.addHeader(<span class="hljs-string">"Access-Control-Allow-Headers"</span>, headers);            
        }
        
        res.addHeader(<span class="hljs-string">"Access-Control-Max-Age"</span>, <span class="hljs-string">"3600"</span>);
        <span class="hljs-comment">// enable cookie</span>
        res.addHeader(<span class="hljs-string">"Access-Control-Allow-Credentials"</span>, <span class="hljs-string">"true"</span>);
        chain.doFilter(request, response);
    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">destroy</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-comment">// TODO Auto-generated method stub</span>

    }

}
</code></pre>
<p>上面提到了<strong>非简单请求</strong>，那什么是非简单请求呢，可以看下面的图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013473008?w=678&amp;h=605" src="https://static.alili.tech/img/remote/1460000013473008?w=678&amp;h=605" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>非简单请求会发出一个预检命令的(当然了，我们上面的Filter已经解决预检命令的问题了):</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013473009?w=803&amp;h=164" src="https://static.alili.tech/img/remote/1460000013473009?w=803&amp;h=164" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">Spring框架解决</h3>
<p><strong>如果使用的是Spring框架的话，那就只需要一个注解就能够解决跨域的问题了</strong>：<code>@CrossOrigin</code></p>
<h3 id="articleHeader7">HTTP服务器层</h3>
<p>我们在的商用开发中，一般请求的过程是这样的：<strong>浏览器-&gt;HTTP服务器(Nginx,Apache)-&gt;应用服务器(Tomcat,Weblogic)</strong></p>
<p>上面编写的Filter、Spring框架都是在应用服务器上解决的，<strong>我们也是可以通过HTTP服务器(Nginx,Apache)来进行解决跨域问题的</strong>！</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013473010?w=761&amp;h=573" src="https://static.alili.tech/img/remote/1460000013473010?w=761&amp;h=573" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>Nginx我用过，Apache我倒是还没用过，下面就简单记录了Nginx和Apache是如何配置的：</p>
<p>Nginx配置：<br><span class="img-wrap"><img data-src="/img/remote/1460000013473011?w=843&amp;h=609" src="https://static.alili.tech/img/remote/1460000013473011?w=843&amp;h=609" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>Apache配置：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013473012?w=1190&amp;h=471" src="https://static.alili.tech/img/remote/1460000013473012?w=1190&amp;h=471" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">代理解决跨域问题</h2>
<p>在之前的图我们已经看到了，解决跨域的问题可以在“调用方”中来进行解决。</p>
<p>“调用方”解决跨域的问题是这个思路的：<strong>让发送出去的请求代理成是本域的</strong></p>
<p>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="www.zhongfucheng.top是调用方

www.zhongfucheng.site是被调用方
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>www<span class="hljs-selector-class">.zhongfucheng</span><span class="hljs-selector-class">.top</span>是调用方

www<span class="hljs-selector-class">.zhongfucheng</span><span class="hljs-selector-class">.site</span>是被调用方
</code></pre>
<p>它俩是不同域的，但我们可以在nginx或Apache上进行<strong>配置代理：将被调用方www.zhongfucheng.site映射成别的路径</strong></p>
<p>比如，像下面的图，<strong>将8080端口的映射成了ajaxServer，当调用方访问ajaxServer路径时，这样的方法在外部看起来就不像是跨域了，像是访问本地（8081端口），但实际访问别的域（8080端口）</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013473013?w=597&amp;h=362" src="https://static.alili.tech/img/remote/1460000013473013?w=597&amp;h=362" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader9">总结</h1>
<p>令我感到最简单的是通过Spring的注解就可以解决跨域的问题了，JSONP的方式已经是很少用的了，因为存在一定的弊端，但了解一下也无妨，毕竟可能面试的时候会问到。当没有用任何框架的时候，写Filter也不麻烦，也只是配置了一下HTTP头信息而已。如果使用Nginx、Apache时，也可以用代理或者配置HTTP头信息都可以解决。看完之后，有没有觉得跨域问题就迎刃而解了。</p>
<hr>
<blockquote>如果文章有错的地方欢迎指正，大家互相交流。习惯在微信看技术文章的同学，想要获取更多的Java资源的同学，可以<strong>关注微信公众号:Java3y</strong>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
AJAX跨域完全讲解

## 原文链接
[https://segmentfault.com/a/1190000013473001](https://segmentfault.com/a/1190000013473001)

