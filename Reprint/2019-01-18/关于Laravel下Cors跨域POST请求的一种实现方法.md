---
title: '关于Laravel下Cors跨域POST请求的一种实现方法' 
date: 2019-01-18 2:30:35
hidden: true
slug: 8y74raa7dse
categories: [reprint]
---

{{< raw >}}

                    
<p>之前做了一个公司的内部管理系统，现在希望通过在钉钉上开发一个小应用查看相关数据，在此过程中涉及了HTTP的跨域请求的问题，在了解相关信息后，打算基于CORS实现。关于CORS（跨域资源共享），见<a href="http://www.ruanyifeng.com/blog/2016/04/cors.html" rel="nofollow noreferrer" target="_blank">这篇文章</a>。<br>CORS中，对于简单请求，只需在服务器进行相关的字段验证后进行响应即可，主要是验证请求的来源及请求的方法等是否是服务器许可的。<br>而对于复杂请求，则浏览器会先发送一个options请求到服务器进行验证，验证通过后，再发送用户的请求。再options请求中，服务器会返回允许的请求源、请求方法及头部字段等。</p>
<p>对于CORS在Laravel中的实现需要在项目中加入一个中间件Cors，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php

namespace App\Http\Middleware;

use Closure;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        

        header(&quot;Access-Control-Allow-Origin: *&quot;);

        $headers = [
            'Access-Control-Allow-Methods'=> 'POST, GET, OPTIONS, PUT, DELETE',
            'Access-Control-Allow-Headers'=> 'Content-Type, X-Auth-Token, Origin'
        ];

        $response = $next($request);
        foreach($headers as $key => $value) 
            $response->header($key, $value);
        return $response;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span>

<span class="hljs-keyword">namespace</span> <span class="hljs-title">App</span>\<span class="hljs-title">Http</span>\<span class="hljs-title">Middleware</span>;

<span class="hljs-keyword">use</span> <span class="hljs-title">Closure</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Cors</span>
</span>{
    <span class="hljs-comment">/**
     * Handle an incoming request.
     *
     * <span class="hljs-doctag">@param</span>  \Illuminate\Http\Request  $request
     * <span class="hljs-doctag">@param</span>  \Closure  $next
     * <span class="hljs-doctag">@return</span> mixed
     */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handle</span><span class="hljs-params">($request, Closure $next)</span>
    </span>{
        

        header(<span class="hljs-string">"Access-Control-Allow-Origin: *"</span>);

        $headers = [
            <span class="hljs-string">'Access-Control-Allow-Methods'</span>=&gt; <span class="hljs-string">'POST, GET, OPTIONS, PUT, DELETE'</span>,
            <span class="hljs-string">'Access-Control-Allow-Headers'</span>=&gt; <span class="hljs-string">'Content-Type, X-Auth-Token, Origin'</span>
        ];

        $response = $next($request);
        <span class="hljs-keyword">foreach</span>($headers <span class="hljs-keyword">as</span> $key =&gt; $value) 
            $response-&gt;header($key, $value);
        <span class="hljs-keyword">return</span> $response;
    }
}</span></code></pre>
<p>对于简单请求，比如get请求，在路由中加入该中间件即可。<br>但对于复杂请求，则处理不了。（根据文档，POST请求满足某些条件是才是复杂请求，但不知道为何，我发出的POST请求都是复杂请求，即浏览器首先会触发一次options请求，再提交客户的实际请求）。<br>对于只是采取与简单请求相同的方法，则对于复杂请求无法正确响应。</p>
<p>以下是GET请求的请求-响应信息：<br><span class="img-wrap"><img data-src="/img/bVKOM4?w=602&amp;h=475" src="https://static.alili.tech/img/bVKOM4?w=602&amp;h=475" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>以下是POST请求的响应：<br><span class="img-wrap"><img data-src="/img/bVKONc?w=611&amp;h=500" src="https://static.alili.tech/img/bVKONc?w=611&amp;h=500" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>可见POST请求中，浏览器先进行了OPTIONS请求，但该请求的响应中，并没有GET响应中的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Access-Control-Allow-Headers:Content-Type, X-Auth-Token, Origin
Access-Control-Allow-Methods:POST, GET, OPTIONS, PUT, DELETE
Access-Control-Allow-Origin:*" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">Access</span>-Control-Allow-Headers:Content-<span class="hljs-keyword">Type</span>, X-Auth-Token, Origin
<span class="hljs-keyword">Access</span>-Control-Allow-Methods:POST, GET, OPTIONS, PUT, DELETE
<span class="hljs-keyword">Access</span>-Control-Allow-Origin:*</code></pre>
<p>等跨域控制字段。</p>
<p>通过查询资料，Laravel对于OPTIONS请求会自动常规响应200。所以缺少必要的头部信息。<br>所以，我通过在路由中专门加入一个处理options的路由</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Route::options('cors/test',function(){
    return response('ok')
                         ->header('Access-Control-Allow-Methods','POST, GET, OPTIONS, PUT, DELETE')
                         ->header('Access-Control-Allow-Headers','Content-Type, X-Auth-Token, Origin');
})->middleware('cors');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code>Route::options(<span class="hljs-string">'cors/test'</span>,<span class="hljs-keyword">function</span>(){
    <span class="hljs-keyword">return</span> response<span class="hljs-function"><span class="hljs-params">(<span class="hljs-string">'ok'</span>)</span>
                         -&gt;</span>header<span class="hljs-function"><span class="hljs-params">(<span class="hljs-string">'Access-Control-Allow-Methods'</span>,<span class="hljs-string">'POST, GET, OPTIONS, PUT, DELETE'</span>)</span>
                         -&gt;</span>header(<span class="hljs-string">'Access-Control-Allow-Headers'</span>,<span class="hljs-string">'Content-Type, X-Auth-Token, Origin'</span>);
})<span class="hljs-function">-&gt;</span>middleware(<span class="hljs-string">'cors'</span>);</code></pre>
<p>即保证了OPTIONS响应了必要的头部信息。<br>但该方法需要关闭Laravel中相应路由的CSRF功能，具体在AppHttpMiddlewareVerifyCsrfToken添加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="protected $except = [
        'cors/*'
    ];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">protected</span> $<span class="hljs-keyword">except</span> = [
        <span class="hljs-string">'cors/*'</span>
    ];</code></pre>
<p>虽然解决了问题，但对于其中的很多细节还是不了解，需要进一步学习。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于Laravel下Cors跨域POST请求的一种实现方法

## 原文链接
[https://segmentfault.com/a/1190000008736168](https://segmentfault.com/a/1190000008736168)

