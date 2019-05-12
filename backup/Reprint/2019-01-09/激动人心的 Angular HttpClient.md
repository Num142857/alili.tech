---
title: '激动人心的 Angular HttpClient' 
date: 2019-01-09 2:30:12
hidden: true
slug: wcsb24lq8a
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>阅读 Angular 6/RxJS 最新教程，请访问<a href="http://www.semlinker.com/" rel="nofollow noreferrer" target="_blank">前端修仙之路</a>
</blockquote>
<p>Angular <a href="https://github.com/angular/angular/compare/4.3.0-beta.1...4.3.0-rc.0" rel="nofollow noreferrer" target="_blank">4.3.0-rc.0</a> 版本已经发布?。在这个版本中，我们等到了一个令人兴奋的新功能 -  HTTPClient API 的改进版本，以后妈妈再也不用担心我处理 HTTP 请求了?。</p>
<blockquote>HttpClient 是已有 Angular HTTP API 的演进，它在一个单独的 <code>@angular/common/http</code> 包中。这是为了确保现有的代码库可以缓慢迁移到新的 API。</blockquote>
<p>接下来让我们开启 Angular 新版 <a href="https://github.com/angular/angular/blob/master/packages/common/http/src/client.ts" rel="nofollow noreferrer" target="_blank">Http Client</a> 之旅。</p>
<h2 id="articleHeader0">安装</h2>
<p>首先，我们需要更新所有的包到 <code>4.3.0-rc.0</code> 版本。然后，我们需要在 <code>AppModule</code> 中导入 <code>HttpClientModule</code> 模块。具体如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { HttpClientModule } from '@angular/common/http';
@NgModule({
 declarations: [
   AppComponent
 ],
 imports: [
   BrowserModule,
   HttpClientModule
 ],
 bootstrap: [AppComponent]
})
export class AppModule { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { HttpClientModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/common/http'</span>;
<span class="hljs-meta">@NgModule</span>({
 declarations: [
   AppComponent
 ],
 imports: [
   BrowserModule,
   HttpClientModule
 ],
 bootstrap: [AppComponent]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule { }</code></pre>
<p>现在一切准备就绪。让我们来体验一下我们一直期待的三个新特性。</p>
<h2 id="articleHeader1">特性一 默认 JSON 解析</h2>
<p>现在 JSON 是默认的数据格式，我们不需要再进行显式的解析。即我们不需要再使用以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http.get(url).map(res => res.json()).subscribe(...)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript" style="word-break: break-word; white-space: initial;">http.get(url).map(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.json()).subscribe(...)</code></pre>
<p>现在我们可以这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http.get(url).subscribe(...)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript" style="word-break: break-word; white-space: initial;">http.get(url).subscribe(...)</code></pre>
<h2 id="articleHeader2">特性二 支持拦截器 (Interceptors)</h2>
<p>拦截器允许我们将中间件逻辑插入管线中。</p>
<h3 id="articleHeader3">请求拦截器 (Request Interceptor)</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

@Injectable()
class JWTInterceptor implements HttpInterceptor {
  
  constructor(private userService: UserService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const JWT = `Bearer ${this.userService.getToken()}`;
    req = req.clone({
      setHeaders: {
        Authorization: JWT
      }
    });
    return next.handle(req);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> {
  HttpRequest,
  HttpHandler,
  HttpEvent
} <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/common/http'</span>;

<span class="hljs-meta">@Injectable</span>()
<span class="hljs-keyword">class</span> JWTInterceptor <span class="hljs-keyword">implements</span> HttpInterceptor {
  
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> userService: UserService</span>) {}
  
  intercept(req: HttpRequest&lt;<span class="hljs-built_in">any</span>&gt;, next: HttpHandler): Observable&lt;HttpEvent&lt;<span class="hljs-built_in">any</span>&gt;&gt; {

    <span class="hljs-keyword">const</span> JWT = <span class="hljs-string">`Bearer <span class="hljs-subst">${this.userService.getToken()}</span>`</span>;
    req = req.clone({
      setHeaders: {
        Authorization: JWT
      }
    });
    <span class="hljs-keyword">return</span> next.handle(req);
  }
}</code></pre>
<p>如果我们想要注册新的拦截器 (interceptor)，我们需要实现 <code>HttpInterceptor</code> 接口，然后实现该接口中的 <code>intercept</code> 方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export interface HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> HttpInterceptor {
  intercept(req: HttpRequest&lt;<span class="hljs-built_in">any</span>&gt;, next: HttpHandler): Observable&lt;HttpEvent&lt;<span class="hljs-built_in">any</span>&gt;&gt;;
}</code></pre>
<p>需要注意的是，请求对象和响应对象必须是不可修改的 (immutable)。因此，我们在返回请求对象前，我们需要克隆原始的请求对象。</p>
<p><code>next.handle(req)</code> 方法使用新的请求对象，调用底层的 XHR 对象，并返回响应事件流。</p>
<h3 id="articleHeader4">响应拦截器 (Response Interceptor)</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Injectable()
class JWTInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}
  
  intercept(req: HttpRequest < any > ,
    next: HttpHandler): Observable < HttpEvent < any >> {

    return next.handle(req).map(event => {
        if (event instanceof HttpResponse) {
          if (event.status === 401) {
            // JWT expired, go to login
          }
        }
        return event;
      }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Injectable</span>()
<span class="hljs-keyword">class</span> JWTInterceptor <span class="hljs-keyword">implements</span> HttpInterceptor {

  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> router: Router</span>) {}
  
  intercept(req: HttpRequest &lt; <span class="hljs-built_in">any</span> &gt; ,
    next: HttpHandler): Observable &lt; HttpEvent &lt; <span class="hljs-built_in">any</span> &gt;&gt; {

    <span class="hljs-keyword">return</span> next.handle(req).map(<span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (event <span class="hljs-keyword">instanceof</span> HttpResponse) {
          <span class="hljs-keyword">if</span> (event.status === <span class="hljs-number">401</span>) {
            <span class="hljs-comment">// JWT expired, go to login</span>
          }
        }
        <span class="hljs-keyword">return</span> event;
      }
    }
}</code></pre>
<p>响应拦截器可以通过在 <code>next.handle(req)</code> 返回的流对象 (即 Observable 对象) 上应用附加的 Rx 操作符来转换响应事件流对象。</p>
<p>接下来要应用 <code>JWTInterceptor</code> 响应拦截器的最后一件事是注册该拦截器，即使用 <code>HTTP_INTERCEPTORS</code> 作为 token，注册 multi Provider：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[{ provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true }]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript" style="word-break: break-word; white-space: initial;">[{ provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: <span class="hljs-literal">true</span> }]</code></pre>
<h2 id="articleHeader5">特性三 进度事件 (Progress Events)</h2>
<p>进度事件可以用于跟踪文件上传和下载。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {
  HttpEventType,
  HttpClient,
  HttpRequest
} from '@angular/common/http';

http.request(new HttpRequest(
  'POST',
   URL,
   body, 
  {
    reportProgress: true
  })).subscribe(event => {

  if (event.type === HttpEventType.DownloadProgress) {
    // {
    // loaded:11, // Number of bytes uploaded or downloaded.
    // total :11 // Total number of bytes to upload or download
    // }
  }

  if (event.type === HttpEventType.UploadProgress) {
    // {
    // loaded:11, // Number of bytes uploaded or downloaded.
    // total :11 // Total number of bytes to upload or download
    // }
  }

  if (event.type === HttpEventType.Response) {
    console.log(event.body);
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> {
  HttpEventType,
  HttpClient,
  HttpRequest
} <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/common/http'</span>;

http.request(<span class="hljs-keyword">new</span> HttpRequest(
  <span class="hljs-string">'POST'</span>,
   URL,
   body, 
  {
    reportProgress: <span class="hljs-literal">true</span>
  })).subscribe(<span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> {

  <span class="hljs-keyword">if</span> (event.type === HttpEventType.DownloadProgress) {
    <span class="hljs-comment">// {</span>
    <span class="hljs-comment">// loaded:11, // Number of bytes uploaded or downloaded.</span>
    <span class="hljs-comment">// total :11 // Total number of bytes to upload or download</span>
    <span class="hljs-comment">// }</span>
  }

  <span class="hljs-keyword">if</span> (event.type === HttpEventType.UploadProgress) {
    <span class="hljs-comment">// {</span>
    <span class="hljs-comment">// loaded:11, // Number of bytes uploaded or downloaded.</span>
    <span class="hljs-comment">// total :11 // Total number of bytes to upload or download</span>
    <span class="hljs-comment">// }</span>
  }

  <span class="hljs-keyword">if</span> (event.type === HttpEventType.Response) {
    <span class="hljs-built_in">console</span>.log(event.body);
  }
})</code></pre>
<p>如果我们想要跟踪文件上传或下载的进度，在创建请求对象时，我们需要配置 <code>{reportProgress: true}</code> 参数。</p>
<p>此外在回调函数中，我们通过 <code>event.type</code> 来判断不同的事件类型，从进行相应的事件处理。</p>
<p><code>HttpEventType</code> 枚举定义如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export enum HttpEventType {
  /**
   * 表示请求已经被发送
   */
  Sent,

  /**
   * 已接收到上传进度事件
   */
  UploadProgress,

  /**
   * 已接收到响应状态码和响应头
   */
  ResponseHeader,

  /**
   * 已接收到下载进度事件
   */
  DownloadProgress,

  /**
   * 已接收全部响应，包含响应体 
   */
  Response,

  /**
   * 用户自定义事件，来自拦截器或后端
   */
  User,
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">enum</span> HttpEventType {
  <span class="hljs-comment">/**
   * 表示请求已经被发送
   */</span>
  Sent,

  <span class="hljs-comment">/**
   * 已接收到上传进度事件
   */</span>
  UploadProgress,

  <span class="hljs-comment">/**
   * 已接收到响应状态码和响应头
   */</span>
  ResponseHeader,

  <span class="hljs-comment">/**
   * 已接收到下载进度事件
   */</span>
  DownloadProgress,

  <span class="hljs-comment">/**
   * 已接收全部响应，包含响应体 
   */</span>
  Response,

  <span class="hljs-comment">/**
   * 用户自定义事件，来自拦截器或后端
   */</span>
  User,
}</code></pre>
<p>其实除了上面介绍三个新的功能之外，还有以下两个新的功能：</p>
<ul>
<li>基于 Angular 内部测试框架的 <code>Post-request verification</code> 和 <code>flush</code> 功能</li>
<li>类型化，同步响应体访问，包括对 JSON 响应体类型的支持。</li>
</ul>
<p>最后我们来通过 <a href="https://github.com/angular/angular/blob/master/packages/common/http/test/client_spec.ts" rel="nofollow noreferrer" target="_blank">client_spec.ts</a> 文件中的测试用例，来进一步感受一下上述的新特性。</p>
<h2 id="articleHeader6">其它特性</h2>
<h3 id="articleHeader7">发送 GET 请求</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('HttpClient', () => {
    let client: HttpClient = null !;
    let backend: HttpClientTestingBackend = null !;
    beforeEach(() => {
      backend = new HttpClientTestingBackend();
      client = new HttpClient(backend);
    });
    afterEach(() => { backend.verify(); }); // 请求验证
  
    describe('makes a basic request', () => {
      it('for JSON data', (done: DoneFn) => {
        client.get('/test').subscribe(res => {
          expect((res as any)['data']).toEqual('hello world');
          done();
        });
        backend.expectOne('/test').flush({'data': 'hello world'});
      });
      
      it('for an arraybuffer', (done: DoneFn) => {
        const body = new ArrayBuffer(4);
        // 还支持 {responseType: 'text'}、{responseType: 'blob'}
        client.get('/test', {responseType: 'arraybuffer'}).subscribe(res => {
          expect(res).toBe(body);
          done();
        });
        backend.expectOne('/test').flush(body);
      });
      
      it('that returns a response', (done: DoneFn) => {
        const body = {'data': 'hello world'};
        client.get('/test', {observe: 'response'}).subscribe(res => {
          expect(res instanceof HttpResponse).toBe(true);
          expect(res.body).toBe(body);
          done();
        });
        backend.expectOne('/test').flush(body);
      });
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">describe(<span class="hljs-string">'HttpClient'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">let</span> client: HttpClient = <span class="hljs-literal">null</span> !;
    <span class="hljs-keyword">let</span> backend: HttpClientTestingBackend = <span class="hljs-literal">null</span> !;
    beforeEach(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      backend = <span class="hljs-keyword">new</span> HttpClientTestingBackend();
      client = <span class="hljs-keyword">new</span> HttpClient(backend);
    });
    afterEach(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { backend.verify(); }); <span class="hljs-comment">// 请求验证</span>
  
    describe(<span class="hljs-string">'makes a basic request'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      it(<span class="hljs-string">'for JSON data'</span>, <span class="hljs-function">(<span class="hljs-params">done: DoneFn</span>) =&gt;</span> {
        client.get(<span class="hljs-string">'/test'</span>).subscribe(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
          expect((res <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>)[<span class="hljs-string">'data'</span>]).toEqual(<span class="hljs-string">'hello world'</span>);
          done();
        });
        backend.expectOne(<span class="hljs-string">'/test'</span>).flush({<span class="hljs-string">'data'</span>: <span class="hljs-string">'hello world'</span>});
      });
      
      it(<span class="hljs-string">'for an arraybuffer'</span>, <span class="hljs-function">(<span class="hljs-params">done: DoneFn</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> body = <span class="hljs-keyword">new</span> <span class="hljs-built_in">ArrayBuffer</span>(<span class="hljs-number">4</span>);
        <span class="hljs-comment">// 还支持 {responseType: 'text'}、{responseType: 'blob'}</span>
        client.get(<span class="hljs-string">'/test'</span>, {responseType: <span class="hljs-string">'arraybuffer'</span>}).subscribe(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
          expect(res).toBe(body);
          done();
        });
        backend.expectOne(<span class="hljs-string">'/test'</span>).flush(body);
      });
      
      it(<span class="hljs-string">'that returns a response'</span>, <span class="hljs-function">(<span class="hljs-params">done: DoneFn</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> body = {<span class="hljs-string">'data'</span>: <span class="hljs-string">'hello world'</span>};
        client.get(<span class="hljs-string">'/test'</span>, {observe: <span class="hljs-string">'response'</span>}).subscribe(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
          expect(res <span class="hljs-keyword">instanceof</span> HttpResponse).toBe(<span class="hljs-literal">true</span>);
          expect(res.body).toBe(body);
          done();
        });
        backend.expectOne(<span class="hljs-string">'/test'</span>).flush(body);
      });
    });
});</code></pre>
<h3 id="articleHeader8">发送 POST 请求</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('makes a POST request', () => {
      it('with text data', (done: DoneFn) => {
        client.post('/test', 'text body', {observe: 'response', responseType: 'text'})
            .subscribe(res => {
              expect(res.ok).toBeTruthy();
              expect(res.status).toBe(200);
              done();
            });
        backend.expectOne('/test').flush('hello world');
      });
  
      it('with json data', (done: DoneFn) => {
        const body = {data: 'json body'};
        client.post('/test', body, {observe: 'response', 
          responseType: 'text'}).subscribe(res => {
          expect(res.ok).toBeTruthy();
          expect(res.status).toBe(200);
          done();
        });
        const testReq = backend.expectOne('/test');
        expect(testReq.request.body).toBe(body);
        testReq.flush('hello world');
      });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">describe(<span class="hljs-string">'makes a POST request'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      it(<span class="hljs-string">'with text data'</span>, <span class="hljs-function">(<span class="hljs-params">done: DoneFn</span>) =&gt;</span> {
        client.post(<span class="hljs-string">'/test'</span>, <span class="hljs-string">'text body'</span>, {observe: <span class="hljs-string">'response'</span>, responseType: <span class="hljs-string">'text'</span>})
            .subscribe(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
              expect(res.ok).toBeTruthy();
              expect(res.status).toBe(<span class="hljs-number">200</span>);
              done();
            });
        backend.expectOne(<span class="hljs-string">'/test'</span>).flush(<span class="hljs-string">'hello world'</span>);
      });
  
      it(<span class="hljs-string">'with json data'</span>, <span class="hljs-function">(<span class="hljs-params">done: DoneFn</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> body = {data: <span class="hljs-string">'json body'</span>};
        client.post(<span class="hljs-string">'/test'</span>, body, {observe: <span class="hljs-string">'response'</span>, 
          responseType: <span class="hljs-string">'text'</span>}).subscribe(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
          expect(res.ok).toBeTruthy();
          expect(res.status).toBe(<span class="hljs-number">200</span>);
          done();
        });
        <span class="hljs-keyword">const</span> testReq = backend.expectOne(<span class="hljs-string">'/test'</span>);
        expect(testReq.request.body).toBe(body);
        testReq.flush(<span class="hljs-string">'hello world'</span>);
      });
});</code></pre>
<h3 id="articleHeader9">发送 JSONP 请求</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('makes a JSONP request', () => {
      it('with properly set method and callback', (done: DoneFn) => {
        client.jsonp('/test', 'myCallback').subscribe(() => done());
        backend.expectOne({method: 'JSONP', url: '/test?myCallback=JSONP_CALLBACK'})
            .flush('hello world');
      });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">describe(<span class="hljs-string">'makes a JSONP request'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      it(<span class="hljs-string">'with properly set method and callback'</span>, <span class="hljs-function">(<span class="hljs-params">done: DoneFn</span>) =&gt;</span> {
        client.jsonp(<span class="hljs-string">'/test'</span>, <span class="hljs-string">'myCallback'</span>).subscribe(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> done());
        backend.expectOne({method: <span class="hljs-string">'JSONP'</span>, url: <span class="hljs-string">'/test?myCallback=JSONP_CALLBACK'</span>})
            .flush(<span class="hljs-string">'hello world'</span>);
      });
});</code></pre>
<h2 id="articleHeader10">参考资源</h2>
<ul><li><a href="https://netbasal.com/a-taste-from-the-new-angular-http-client-38fcdc6b359b" rel="nofollow noreferrer" target="_blank">A Taste From The New Angular HTTP Client</a></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
激动人心的 Angular HttpClient

## 原文链接
[https://segmentfault.com/a/1190000010116848](https://segmentfault.com/a/1190000010116848)

