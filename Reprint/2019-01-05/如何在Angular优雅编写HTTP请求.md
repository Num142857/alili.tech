---
title: '如何在Angular优雅编写HTTP请求' 
date: 2019-01-05 2:30:10
hidden: true
slug: x1fuparr8ns
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">引言</h1>
<p>基本上当下的应用都会分为前端与后端，当然这种前端定义不在限于桌面浏览器、手机、APP等设备。一个良好的后端会通过一套所有前端都通用的 RESTful API 序列接口作为前后端之间的通信。</p>
<p>这其中对于身份认证都不可能再依赖传统的Session或Cookie；转而使用诸如OAuth2、JWT等这种更适合API接口的认证方式。当然本文并不讨论如何去构建它们。</p>
<h1 id="articleHeader1">一、API 设计</h1>
<p>首先虽然并不会讨论身份认证的技术，但不管是OAuth2还是JWT本质上身份认证都全靠一个 <strong>Token</strong> 来维持；因此，下面统一以 token 来表示身份认证所需要的值。</p>
<p>一套合理的API规则，会让前端编码更优雅。因此，希望在编写Angular之前，能与后端相互达成一种“协议”也很有必要。可以尝试从以下几点进行考虑。</p>
<p><strong>版本号</strong></p>
<p>可以在URL（例：<code>https://demo.com/v1/</code>）或Header（例：<code>headers: { version: 'v1' }</code>）中体现，相比较我更喜欢前者的直接。</p>
<p><strong>业务节点</strong></p>
<p>以一个节点来表示某个业务，比如：</p>
<ul>
<li>商品 <code>https://demo.com/v1/product/</code>
</li>
<li>商品SKU <code>https://demo.com/v1/product/sku/</code>
</li>
</ul>
<p><strong>动作</strong></p>
<p>由HTTP动词来表示：</p>
<ul>
<li>
<code>GET</code> 请求一个商品 <code>/product/${ID}</code>
</li>
<li>
<code>POST</code> 新建一个商品 <code>/product</code>
</li>
<li>
<code>PUT</code> 修改一个商品 <code>/product/${ID}</code>
</li>
<li>
<code>DELETE</code> 删除一个商品 <code>/product/${ID}</code>
</li>
</ul>
<p><strong>统一响应</strong></p>
<p>这一点非常重要，特别是当我们新建一个商品时，商品的属性非常多，但如果我们缺少某个属性时。可以使用这样的一种统一的响应格式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;code&quot;: 100, // 0 表示成功
    &quot;errors&quot;: { // 错误明细
        &quot;title&quot;: &quot;商品名称必填&quot;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-string">"code"</span>: <span class="hljs-number">100</span>, <span class="hljs-comment">// 0 表示成功</span>
    <span class="hljs-string">"errors"</span>: { <span class="hljs-comment">// 错误明细</span>
        <span class="hljs-string">"title"</span>: <span class="hljs-string">"商品名称必填"</span>
    }
}</code></pre>
<p>其中 <code>code</code> 不管成功与否都会有该属性。</p>
<p><strong>状态码</strong></p>
<p>后端响应一个请求是包括状态码和响应内容，而每一种状态码又包含着不同的含义。</p>
<ul>
<li>
<code>200</code> 成功返回请求数据</li>
<li>
<code>401</code> 无权限</li>
<li>
<code>404</code> 无效资源</li>
</ul>
<h1 id="articleHeader2">二、如何访问Http？</h1>
<p>首先，需要导入 <code>HttpClientModule</code> 模块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        HttpClientModule
    ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { HttpClientModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/common/http'</span>;

<span class="hljs-meta">@NgModule</span>({
    imports: [
        HttpClientModule
    ]
})</code></pre>
<p>然后，在组件类注入 <code>HttpClient</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class IndexComponent {
    constructor(private http: HttpClient) { }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> IndexComponent {
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> http: HttpClient</span>) { }
}</code></pre>
<p>最后，请求点击某个按钮发送一次GET请求。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="user: Observable<User>;
getUser() {
    this.user = this.http.get<User>('/assets/data/user.json');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">user: Observable&lt;User&gt;;
getUser() {
    <span class="hljs-keyword">this</span>.user = <span class="hljs-keyword">this</span>.http.get&lt;User&gt;(<span class="hljs-string">'/assets/data/user.json'</span>);
}</code></pre>
<p>打印结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{" user | async | json "}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;">"{{" user | async | json "}}"</code></pre>
<p>三个简单的步骤，就是一个完整的HTTP请求步骤。</p>
<p>然后，现实与实际是有一些距离，比如说身份认证、错误处理、状态码处理等问题，在上面并无任何体现。</p>
<p>可，上面已经足够优雅，要让我破坏这种优雅那么此文就变得无意义了！</p>
<p>因此……</p>
<h1 id="articleHeader3">三、拦截器</h1>
<h2 id="articleHeader4">1、<code>HttpInterceptor</code> 接口</h2>
<p>正如其名，我们在不改变上面应用层面的代码下，允许我们把身份认证、错误处理、状态码处理问题给解决了！</p>
<p>写一个拦截器也是非常的优雅，只需要实现 <code>HttpInterceptor</code> 接口即可，而且只有一个 <code>intercept</code> 方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Injectable()
export class JWTInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        // doing
    }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Injectable</span>()
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> JWTInterceptor <span class="hljs-keyword">implements</span> HttpInterceptor {

    intercept(req: HttpRequest&lt;<span class="hljs-built_in">any</span>&gt;, next: HttpHandler): Observable&lt;HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse&lt;<span class="hljs-built_in">any</span>&gt; | HttpUserEvent&lt;<span class="hljs-built_in">any</span>&gt;&gt; {
        <span class="hljs-comment">// doing</span>
    }

}</code></pre>
<p><code>intercept</code> 方法有两个参数，它几乎所当下流行的中间件概念一般，<code>req</code> 表示当前请求数据（包括：url、参数、header等），<code>next</code> 表示调用下一个“中间件”。</p>
<h2 id="articleHeader5">2、身份认证</h2>
<p><code>req</code> 有一个 <code>clone</code> 方法，允许对当前的请求参数进行克隆并且这一过程会自行根据一些参数推导，不管如何用它来产生一个新的请求数据，并在这个新数据中加入我们期望的数据，比如：token。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const jwtReq = req.clone({
    headers: req.headers.set('token', 'xxxxxxxxxxxxxxxxxxxxx')
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">const</span> jwtReq = req.clone({
    headers: req.headers.set(<span class="hljs-string">'token'</span>, <span class="hljs-string">'xxxxxxxxxxxxxxxxxxxxx'</span>)
});</code></pre>
<p>当然，你可以再折腾更多请求前的一些配置。</p>
<p>最后，把新请求参数传递给下一个“中间件”。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return next.handle(jwtReq);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">return</span> next.handle(jwtReq);</code></pre>
<p>等等，都 <code>return</code> 了，说好的状态码、异常处理呢？</p>
<h2 id="articleHeader6">3、异常处理</h2>
<p>仔细再瞧 <code>next.handle</code> 返回的是一个 <code>Observable</code> 类型。看到 <code>Observable</code> 我们会想到什么？<code>mergeMap</code>、<code>catch</code> 等一大堆东西。</p>
<p>因此，我们可以利用这些操作符来改变响应的值。</p>
<p><strong>mergeMap</strong></p>
<p>请求过程中会会有一些过程状态，比如请求前、上传进度条、请求结束等，Angular在每一次这类动作中都会触次 <code>next</code>。因此，我们只需要在返回 <code>Observable</code> 对象加上 <code>mergeMap</code> 来观察这些值的变更，这样有非常大的自由空间想象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return next.handle(jwtReq).mergeMap((event: any) => {
        if (event instanceof HttpResponse &amp;&amp; event.body.code !== 0) {
            return Observable.create(observer => observer.error(event));
        }
        return Observable.create(observer => observer.next(event));
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">return</span> next.handle(jwtReq).mergeMap(<span class="hljs-function">(<span class="hljs-params">event: <span class="hljs-built_in">any</span></span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (event <span class="hljs-keyword">instanceof</span> HttpResponse &amp;&amp; event.body.code !== <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">return</span> Observable.create(<span class="hljs-function"><span class="hljs-params">observer</span> =&gt;</span> observer.error(event));
        }
        <span class="hljs-keyword">return</span> Observable.create(<span class="hljs-function"><span class="hljs-params">observer</span> =&gt;</span> observer.next(event));
    })</code></pre>
<p>只会在请求成功才会返回一个 <code>HttpResponse</code> 类型，因此，我们可以大胆判断是否来源于 <code>HttpResponse</code> 来表示HTTP请求已经成功。</p>
<p>这里，统一对业务层级的错误 <code>code !== 0</code> 产生一个错误信号的 <code>Observable</code>。反之，产生一个成功的信息。</p>
<p><strong>catch</strong></p>
<p><code>catch</code> 来捕获非200以外的其他状态码的错误，比如：401。同时，前面的 <code>mergeMap</code> 所产生的错误信号，也会在这里被捕获到。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".catch((res: HttpResponse<any>) => {
    switch (res.status) {
        case 401:
            // 权限处理
            location.href = ''; // 重新登录
            break;
        case 200:
            // 业务层级错误处理
            alert('业务错误：' + res.body.code);
            break;
        case 404:
            alert('API不存在');
            break;
    }
    return Observable.throw(res);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">.catch(<span class="hljs-function">(<span class="hljs-params">res: HttpResponse&lt;<span class="hljs-built_in">any</span>&gt;</span>) =&gt;</span> {
    <span class="hljs-keyword">switch</span> (res.status) {
        <span class="hljs-keyword">case</span> <span class="hljs-number">401</span>:
            <span class="hljs-comment">// 权限处理</span>
            location.href = <span class="hljs-string">''</span>; <span class="hljs-comment">// 重新登录</span>
            <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">200</span>:
            <span class="hljs-comment">// 业务层级错误处理</span>
            alert(<span class="hljs-string">'业务错误：'</span> + res.body.code);
            <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">404</span>:
            alert(<span class="hljs-string">'API不存在'</span>);
            <span class="hljs-keyword">break</span>;
    }
    <span class="hljs-keyword">return</span> Observable.throw(res);
})</code></pre>
<h2 id="articleHeader7">4、完整代码</h2>
<p>至此，拦截器所要包括的身份认证token、统一响应处理、异常处理都解决了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Injectable()
export class JWTInterceptor implements HttpInterceptor {

    constructor(private notifySrv: NotifyService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        console.log('interceptor')
        const jwtReq = req.clone({
            headers: req.headers.set('token', 'asdf')
        });
        return next
            .handle(jwtReq)
            .mergeMap((event: any) => {
                if (event instanceof HttpResponse &amp;&amp; event.body.code !== 0) {
                    return Observable.create(observer => observer.error(event));
                }
                return Observable.create(observer => observer.next(event));
            })
            .catch((res: HttpResponse<any>) => {
                switch (res.status) {
                    case 401:
                        // 权限处理
                        location.href = ''; // 重新登录
                        break;
                    case 200:
                        // 业务层级错误处理
                        this.notifySrv.error('业务错误', `错误代码为：${res.body.code}`);
                        break;
                    case 404:
                        this.notifySrv.error('404', `API不存在`);
                        break;
                }
                // 以错误的形式结束本次请求
                return Observable.throw(res);
            })
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Injectable</span>()
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> JWTInterceptor <span class="hljs-keyword">implements</span> HttpInterceptor {

    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> notifySrv: NotifyService</span>) {}

    intercept(req: HttpRequest&lt;<span class="hljs-built_in">any</span>&gt;, next: HttpHandler): Observable&lt;HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse&lt;<span class="hljs-built_in">any</span>&gt; | HttpUserEvent&lt;<span class="hljs-built_in">any</span>&gt;&gt; {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'interceptor'</span>)
        <span class="hljs-keyword">const</span> jwtReq = req.clone({
            headers: req.headers.set(<span class="hljs-string">'token'</span>, <span class="hljs-string">'asdf'</span>)
        });
        <span class="hljs-keyword">return</span> next
            .handle(jwtReq)
            .mergeMap(<span class="hljs-function">(<span class="hljs-params">event: <span class="hljs-built_in">any</span></span>) =&gt;</span> {
                <span class="hljs-keyword">if</span> (event <span class="hljs-keyword">instanceof</span> HttpResponse &amp;&amp; event.body.code !== <span class="hljs-number">0</span>) {
                    <span class="hljs-keyword">return</span> Observable.create(<span class="hljs-function"><span class="hljs-params">observer</span> =&gt;</span> observer.error(event));
                }
                <span class="hljs-keyword">return</span> Observable.create(<span class="hljs-function"><span class="hljs-params">observer</span> =&gt;</span> observer.next(event));
            })
            .catch(<span class="hljs-function">(<span class="hljs-params">res: HttpResponse&lt;<span class="hljs-built_in">any</span>&gt;</span>) =&gt;</span> {
                <span class="hljs-keyword">switch</span> (res.status) {
                    <span class="hljs-keyword">case</span> <span class="hljs-number">401</span>:
                        <span class="hljs-comment">// 权限处理</span>
                        location.href = <span class="hljs-string">''</span>; <span class="hljs-comment">// 重新登录</span>
                        <span class="hljs-keyword">break</span>;
                    <span class="hljs-keyword">case</span> <span class="hljs-number">200</span>:
                        <span class="hljs-comment">// 业务层级错误处理</span>
                        <span class="hljs-keyword">this</span>.notifySrv.error(<span class="hljs-string">'业务错误'</span>, <span class="hljs-string">`错误代码为：<span class="hljs-subst">${res.body.code}</span>`</span>);
                        <span class="hljs-keyword">break</span>;
                    <span class="hljs-keyword">case</span> <span class="hljs-number">404</span>:
                        <span class="hljs-keyword">this</span>.notifySrv.error(<span class="hljs-string">'404'</span>, <span class="hljs-string">`API不存在`</span>);
                        <span class="hljs-keyword">break</span>;
                }
                <span class="hljs-comment">// 以错误的形式结束本次请求</span>
                <span class="hljs-keyword">return</span> Observable.throw(res);
            })
    }
}</code></pre>
<p>发现没有，我们并没有加一大堆并不认识的事物，单纯都只是对数据流的各种操作而已。</p>
<blockquote><p><a href="https://cipchk.github.io/ngx-notify/" rel="nofollow noreferrer" target="_blank">NotifyService</a> 是一个无须依赖HTML模板、极简Angular通知组件。</p></blockquote>
<h2 id="articleHeader8">5、注册拦截器</h2>
<p>拦截器构建后，还需要将其注册至 <code>HTTP_INTERCEPTORS</code> 标识符中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true}
    ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { HttpClientModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/common/http'</span>;

<span class="hljs-meta">@NgModule</span>({
    imports: [
        HttpClientModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: <span class="hljs-literal">true</span>}
    ]
})</code></pre>
<p>以上是拦截器的所有内容，在不改变原有的代码的情况下，我们只是利用短短几行的代码实现了身份认证所需要的TOKEN、业务级统一响应处理、错误处理动作。</p>
<h1 id="articleHeader9">四、<code>async</code> 管道</h1>
<p>一个 <code>Observable</code> 必须被订阅以后才会真正的开始动作，前面在HTML模板中我们利用了 <code>async</code> 管道简化了这种订阅过程。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{" user | async | json "}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;">"{{" user | async | json "}}"</code></pre>
<p>它相当于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let user: User;
get() {
    this.http.get<User>('/assets/data/user.json').subscribe(res => {
        this.user = res;
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">let</span> user: User;
<span class="hljs-keyword">get</span>() {
    <span class="hljs-keyword">this</span>.http.get&lt;User&gt;(<span class="hljs-string">'/assets/data/user.json'</span>).subscribe(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>.user = res;
    });
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{" user | json "}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;">"{{" user | json "}}"</code></pre>
<p>然而，<code>async</code> 这种简化，并不代表失去某些自由度，比如说当在获取数据过程中显示【加载中……】，怎么办？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div *ngIf=&quot;user | async as user; else loading&quot;>
    "{{" user | json "}}"
</div>
<ng-template #loading>加载中……</ng-template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"user | async as user; else loading"</span>&gt;</span>
    "{{" user | json "}}"
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ng-template</span> #<span class="hljs-attr">loading</span>&gt;</span>加载中……<span class="hljs-tag">&lt;/<span class="hljs-name">ng-template</span>&gt;</span></code></pre>
<p>恩！</p>
<h1 id="articleHeader10">五、结论</h1>
<p>Angular在HTTP请求过程中使用 <code>Observable</code> 异步数据流控制数据，而利用 rxjs 提供的大量操作符，来改变最终值；从而获得在应用层面最优雅的编码风格。</p>
<p>当我们说到优雅使用HTTP这件事时，<strong>易测试</strong>是一个非常重要，因此，我<strong>建议</strong>将HTTP从组件类中剥离并将所有请求放到 Service 当中。当对某个组件编写测试代码时，如果受到HTTP请求结果的限制会让测试更困难。</p>
<p>Happy coding!</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在Angular优雅编写HTTP请求

## 原文链接
[https://segmentfault.com/a/1190000010570799](https://segmentfault.com/a/1190000010570799)

