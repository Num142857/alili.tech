---
title: 'Angular HTTP Client 快速入门' 
date: 2019-01-08 2:30:11
hidden: true
slug: qvz2vyf099
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>阅读新版<a href="http://semlinker.com/ng-http-client/" rel="nofollow noreferrer" target="_blank">Angular 6 HttpClient 快速入门</a>
</blockquote>
<p>之前 <a href="https://segmentfault.com/a/1190000010116848">激动人心的 Angular HttpClient</a> 这篇文章已经介绍过 <code>HttpClient</code> ，今天看到 angular-university 博客中介绍 HttpClient 的文章，内容很详细，我就简单做了整理。有兴趣的话，建议直接阅读 <a href="http://blog.angular-university.io/angular-http/" rel="nofollow noreferrer" target="_blank">原文</a>。</p>
<h2 id="articleHeader0">HttpClientModule 应用</h2>
<h3 id="articleHeader1">导入新的 HTTP Module</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> {HttpClientModule} <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/common/http'</span>;

<span class="hljs-meta">@NgModule</span>({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule {}</code></pre>
<p>需要注意的是，现在 JSON 是默认的数据格式，我们不需要再进行显式的解析。即我们不需要再使用以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http.get(url).map(res => res.json()).subscribe(...)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code style="word-break: break-word; white-space: initial;">http.<span class="hljs-built_in">get</span>(url).<span class="hljs-keyword">map</span>(<span class="hljs-keyword">res</span> =&gt; <span class="hljs-keyword">res</span>.json()).subscribe(...)</code></pre>
<p>现在我们可以这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http.get(url).subscribe(...)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">http</span><span class="hljs-selector-class">.get</span>(<span class="hljs-selector-tag">url</span>)<span class="hljs-selector-class">.subscribe</span>(...)</code></pre>
<h3 id="articleHeader2">发送 Get 请求</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {Component, OnInit} from '@angular/core';
import {Observable} from &quot;rxjs/Observable&quot;;
import {HttpClient} from &quot;@angular/common/http&quot;;
import * as _ from 'lodash';

interface Course {
    description: string;
    courseListIcon:string;
    iconUrl:string;
    longDescription:string;
    url:string;
}

@Component({
  selector: 'app-root',
  template: `
      <ul *ngIf=&quot;courses$ | async as courses else noData&quot;>
          <li *ngFor=&quot;let course of courses&quot;>
              "{{"course.description"}}"
          </li> 
      </ul>
      <ng-template #noData>No Data Available</ng-template>
  `})
export class AppComponent implements OnInit {
    courses$: Observable<any>;
    constructor(private http:HttpClient) {}

    ngOnInit() {
        this.courses$ = this.http
            .get(&quot;https://angular-http-guide.firebaseio.com/courses.json&quot;)
            .map(data => _.values(data))
            .do(console.log);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> {Component, OnInit} <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> {Observable} <span class="hljs-keyword">from</span> <span class="hljs-string">"rxjs/Observable"</span>;
<span class="hljs-keyword">import</span> {HttpClient} <span class="hljs-keyword">from</span> <span class="hljs-string">"@angular/common/http"</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>;

<span class="hljs-keyword">interface</span> Course {
    description: <span class="hljs-built_in">string</span>;
    courseListIcon:<span class="hljs-built_in">string</span>;
    iconUrl:<span class="hljs-built_in">string</span>;
    longDescription:<span class="hljs-built_in">string</span>;
    url:<span class="hljs-built_in">string</span>;
}

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-root'</span>,
  template: <span class="hljs-string">`
      &lt;ul *ngIf="courses$ | async as courses else noData"&gt;
          &lt;li *ngFor="let course of courses"&gt;
              "{{"course.description"}}"
          &lt;/li&gt; 
      &lt;/ul&gt;
      &lt;ng-template #noData&gt;No Data Available&lt;/ng-template&gt;
  `</span>})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent <span class="hljs-keyword">implements</span> OnInit {
    courses$: Observable&lt;<span class="hljs-built_in">any</span>&gt;;
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> http:HttpClient</span>) {}

    ngOnInit() {
        <span class="hljs-keyword">this</span>.courses$ = <span class="hljs-keyword">this</span>.http
            .get(<span class="hljs-string">"https://angular-http-guide.firebaseio.com/courses.json"</span>)
            .map(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> _.values(data))
            .do(<span class="hljs-built_in">console</span>.log);
    }
}</code></pre>
<h3 id="articleHeader3">设置查询参数</h3>
<p>假设发送 Get 请求时，需要设置对应的查询参数，预期的 URL 地址如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://angular-http-guide.firebaseio.com/courses.json?orderBy=&quot;$key&quot;&amp;limitToFirst=1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">https:<span class="hljs-comment">//angular-http-guide.firebaseio.com/courses.json?orderBy="$key"&amp;limitToFirst=1</span></code></pre>
<h4>创建 HttpParams 对象</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {HttpParams} from &quot;@angular/common/http&quot;;

const params = new HttpParams()
    .set('orderBy', '&quot;$key&quot;')
    .set('limitToFirst', &quot;1&quot;);

this.courses$ = this.http
    .get(&quot;/courses.json&quot;, {params})
    .do(console.log)
    .map(data => _.values(data))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> {HttpParams} <span class="hljs-keyword">from</span> <span class="hljs-string">"@angular/common/http"</span>;

<span class="hljs-keyword">const</span> params = <span class="hljs-keyword">new</span> HttpParams()
    .set(<span class="hljs-string">'orderBy'</span>, <span class="hljs-string">'"$key"'</span>)
    .set(<span class="hljs-string">'limitToFirst'</span>, <span class="hljs-string">"1"</span>);

<span class="hljs-keyword">this</span>.courses$ = <span class="hljs-keyword">this</span>.http
    .get(<span class="hljs-string">"/courses.json"</span>, {params})
    .do(<span class="hljs-built_in">console</span>.log)
    .map(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> _.values(data))</code></pre>
<p>需要注意的是，我们通过链式语法调用 <code>set()</code> 方法，构建 <code>HttpParams</code> 对象。这是因为 <code>HttpParams</code> 对象是不可变的，通过 <code>set()</code> 方法可以防止该对象被修改。</p>
<p>每当调用 <code>set()</code> 方法，将会返回包含新值的 <code>HttpParams</code> 对象，因此如果使用下面的方式，将不能正确的设置参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const params = new HttpParams();

params.set('orderBy', '&quot;$key&quot;')
params.set('limitToFirst', &quot;1&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">const</span> params = <span class="hljs-keyword">new</span> HttpParams();

params.set(<span class="hljs-string">'orderBy'</span>, <span class="hljs-string">'"$key"'</span>)
params.set(<span class="hljs-string">'limitToFirst'</span>, <span class="hljs-string">"1"</span>);</code></pre>
<h3 id="articleHeader4">使用 <code>fromString</code> 语法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const params = new HttpParams({fromString: 'orderBy=&quot;$key&quot;&amp;limitToFirst=1'});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> params = <span class="hljs-keyword">new</span> HttpParams({fromString: <span class="hljs-string">'orderBy="$key"&amp;limitToFirst=1'</span>});</code></pre>
<h3 id="articleHeader5">使用 <code>request()</code> API</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const params = new HttpParams({fromString: 'orderBy=&quot;$key&quot;&amp;limitToFirst=1'});

this.courses$ = this.http
    .request(
        &quot;GET&quot;,
        &quot;/courses.json&quot;, 
        {
            responseType:&quot;json&quot;,
            params
        })
    .do(console.log)
    .map(data => _.values(data));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">const</span> params = <span class="hljs-keyword">new</span> HttpParams({fromString: <span class="hljs-string">'orderBy="$key"&amp;limitToFirst=1'</span>});

<span class="hljs-keyword">this</span>.courses$ = <span class="hljs-keyword">this</span>.http
    .request(
        <span class="hljs-string">"GET"</span>,
        <span class="hljs-string">"/courses.json"</span>, 
        {
            responseType:<span class="hljs-string">"json"</span>,
            params
        })
    .do(<span class="hljs-built_in">console</span>.log)
    .map(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> _.values(data));</code></pre>
<h3 id="articleHeader6">设置 HTTP Headers</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const headers = new HttpHeaders().set(&quot;X-CustomHeader&quot;, &quot;custom header value&quot;);

this.courses$ = this.http
    .get(
        &quot;/courses.json&quot;,
        {headers})
    .do(console.log)
    .map(data => _.values(data));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">const</span> headers = <span class="hljs-keyword">new</span> HttpHeaders().set(<span class="hljs-string">"X-CustomHeader"</span>, <span class="hljs-string">"custom header value"</span>);

<span class="hljs-keyword">this</span>.courses$ = <span class="hljs-keyword">this</span>.http
    .get(
        <span class="hljs-string">"/courses.json"</span>,
        {headers})
    .do(<span class="hljs-built_in">console</span>.log)
    .map(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> _.values(data));</code></pre>
<h3 id="articleHeader7">发送 Put 请求</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="httpPutExample() {
    const headers = new HttpHeaders().set(&quot;Content-Type&quot;, &quot;application/json&quot;);

    this.http.put(&quot;/courses/-KgVwECOnlc-LHb_B0cQ.json&quot;,
        {
            &quot;courseListIcon&quot;: &quot;.../main-page-logo-small-hat.png&quot;,
            &quot;description&quot;: &quot;Angular Tutorial For Beginners TEST&quot;,
            &quot;iconUrl&quot;: &quot;.../angular2-for-beginners.jpg&quot;,
            &quot;longDescription&quot;: &quot;...&quot;,
            &quot;url&quot;: &quot;new-value-for-url&quot;
        },
        {headers})
        .subscribe(
            val => {
                console.log(&quot;PUT call successful value returned in body&quot;, 
                  val);
            },
            response => {
                console.log(&quot;PUT call in error&quot;, response);
            },
            () => {
                console.log(&quot;The PUT observable is now completed.&quot;);
            }
        );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">httpPutExample() {
    <span class="hljs-keyword">const</span> headers = <span class="hljs-keyword">new</span> HttpHeaders().set(<span class="hljs-string">"Content-Type"</span>, <span class="hljs-string">"application/json"</span>);

    <span class="hljs-keyword">this</span>.http.put(<span class="hljs-string">"/courses/-KgVwECOnlc-LHb_B0cQ.json"</span>,
        {
            <span class="hljs-string">"courseListIcon"</span>: <span class="hljs-string">".../main-page-logo-small-hat.png"</span>,
            <span class="hljs-string">"description"</span>: <span class="hljs-string">"Angular Tutorial For Beginners TEST"</span>,
            <span class="hljs-string">"iconUrl"</span>: <span class="hljs-string">".../angular2-for-beginners.jpg"</span>,
            <span class="hljs-string">"longDescription"</span>: <span class="hljs-string">"..."</span>,
            <span class="hljs-string">"url"</span>: <span class="hljs-string">"new-value-for-url"</span>
        },
        {headers})
        .subscribe(
            <span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"PUT call successful value returned in body"</span>, 
                  val);
            },
            <span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"PUT call in error"</span>, response);
            },
            <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"The PUT observable is now completed."</span>);
            }
        );
}</code></pre>
<h3 id="articleHeader8">发送 Patch 请求</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="httpPatchExample() {
    this.http.patch(&quot;/courses/-KgVwECOnlc-LHb_B0cQ.json&quot;,
        {
            &quot;description&quot;: &quot;Angular Tutorial For Beginners PATCH TEST&quot;,
        })
        .subscribe(
            (val) => {
                console.log(&quot;PATCH call successful value returned in body&quot;, 
                  val);
            },
            response => {
                console.log(&quot;PATCH call in error&quot;, response);
            },
            () => {
                console.log(&quot;The PATCH observable is now completed.&quot;);
            });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">httpPatchExample() {
    <span class="hljs-keyword">this</span>.http.patch(<span class="hljs-string">"/courses/-KgVwECOnlc-LHb_B0cQ.json"</span>,
        {
            <span class="hljs-string">"description"</span>: <span class="hljs-string">"Angular Tutorial For Beginners PATCH TEST"</span>,
        })
        .subscribe(
            <span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"PATCH call successful value returned in body"</span>, 
                  val);
            },
            <span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"PATCH call in error"</span>, response);
            },
            <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"The PATCH observable is now completed."</span>);
            });
}</code></pre>
<h3 id="articleHeader9">发送 Delete 请求</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="httpDeleteExample() {
    this.http.delete(&quot;/courses/-KgVwECOnlc-LHb_B0cQ.json&quot;)
        .subscribe(
            (val) => {
                console.log(&quot;DELETE call successful value returned in body&quot;, 
                  val);
            },
            response => {
                console.log(&quot;DELETE call in error&quot;, response);
            },
            () => {
                console.log(&quot;The DELETE observable is now completed.&quot;);
            });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">httpDeleteExample() {
    <span class="hljs-keyword">this</span>.http.delete(<span class="hljs-string">"/courses/-KgVwECOnlc-LHb_B0cQ.json"</span>)
        .subscribe(
            <span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"DELETE call successful value returned in body"</span>, 
                  val);
            },
            <span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"DELETE call in error"</span>, response);
            },
            <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"The DELETE observable is now completed."</span>);
            });
}</code></pre>
<h3 id="articleHeader10">发送 Post 请求</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="httpPostExample() {
    this.http.post(&quot;/courses/-KgVwECOnlc-LHb_B0cQ.json&quot;,
        {
            &quot;courseListIcon&quot;: &quot;...&quot;,
            &quot;description&quot;: &quot;TEST&quot;,
            &quot;iconUrl&quot;: &quot;..&quot;,
            &quot;longDescription&quot;: &quot;...&quot;,
            &quot;url&quot;: &quot;new-url&quot;
        })
        .subscribe(
            (val) => {
                console.log(&quot;POST call successful value returned in body&quot;, 
                  val);
            },
            response => {
                console.log(&quot;POST call in error&quot;, response);
            },
            () => {
                console.log(&quot;The POST observable is now completed.&quot;);
            });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">httpPostExample() {
    <span class="hljs-keyword">this</span>.http.post(<span class="hljs-string">"/courses/-KgVwECOnlc-LHb_B0cQ.json"</span>,
        {
            <span class="hljs-string">"courseListIcon"</span>: <span class="hljs-string">"..."</span>,
            <span class="hljs-string">"description"</span>: <span class="hljs-string">"TEST"</span>,
            <span class="hljs-string">"iconUrl"</span>: <span class="hljs-string">".."</span>,
            <span class="hljs-string">"longDescription"</span>: <span class="hljs-string">"..."</span>,
            <span class="hljs-string">"url"</span>: <span class="hljs-string">"new-url"</span>
        })
        .subscribe(
            <span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"POST call successful value returned in body"</span>, 
                  val);
            },
            <span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"POST call in error"</span>, response);
            },
            <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"The POST observable is now completed."</span>);
            });
}</code></pre>
<h3 id="articleHeader11">避免重复请求</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="duplicateRequestsExample() {
    const httpGet$ = this.http
        .get(&quot;/courses.json&quot;)
        .map(data => _.values(data));

    httpGet$.subscribe(
        (val) => console.log(&quot;logging GET value&quot;, val)
    );

    this.courses$ = httpGet$;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">duplicateRequestsExample() {
    <span class="hljs-keyword">const</span> httpGet$ = <span class="hljs-keyword">this</span>.http
        .get(<span class="hljs-string">"/courses.json"</span>)
        .map(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> _.values(data));

    httpGet$.subscribe(
        <span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"logging GET value"</span>, val)
    );

    <span class="hljs-keyword">this</span>.courses$ = httpGet$;
}</code></pre>
<p>在上面例子中，我们正在创建了一个 HTTP observable 对象 <code>httpGet$</code>，接着我们直接订阅该对象。然后，我们把 <code>httpGet$</code> 对象赋值给 <code>courses$</code> 成员变量，最后在模板中使用 <code>async</code> 管道订阅该对象。</p>
<p>这将导致发送两个 HTTP 请求，在这种情况下，请求显然是重复的，因为我们只希望从后端查询一次数据。为了避免发送冗余的请求，我们可以使用 RxJS 提供的 <code>shareReplay</code> 操作符：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// put this next to the other RxJs operator imports
import 'rxjs/add/operator/shareReplay';

const httpGet$ = this.http
    .get(&quot;/courses.json&quot;)
    .map(data => _.values(data))
    .shareReplay();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// put this next to the other RxJs operator imports</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'rxjs/add/operator/shareReplay'</span>;

<span class="hljs-keyword">const</span> httpGet$ = <span class="hljs-keyword">this</span>.http
    .get(<span class="hljs-string">"/courses.json"</span>)
    .map(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> _.values(data))
    .shareReplay();</code></pre>
<h3 id="articleHeader12">并行发送多个请求</h3>
<p>并行发送 HTTP 请求的一种方法是使用 RxJs 中的 <code>forkjoin</code> 操作符：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'rxjs/add/observable/forkJoin';

parallelRequests() {

    const parallel$ = Observable.forkJoin(
        this.http.get('/courses/-KgVwEBq5wbFnjj7O8Fp.json'),
        this.http.get('/courses/-KgVwECOnlc-LHb_B0cQ.json')
    );

    parallel$.subscribe(
        values => {
            console.log(&quot;all values&quot;, values)
        }
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> <span class="hljs-string">'rxjs/add/observable/forkJoin'</span>;

parallelRequests() {

    <span class="hljs-keyword">const</span> parallel$ = Observable.forkJoin(
        <span class="hljs-keyword">this</span>.http.get(<span class="hljs-string">'/courses/-KgVwEBq5wbFnjj7O8Fp.json'</span>),
        <span class="hljs-keyword">this</span>.http.get(<span class="hljs-string">'/courses/-KgVwECOnlc-LHb_B0cQ.json'</span>)
    );

    parallel$.subscribe(
        <span class="hljs-function"><span class="hljs-params">values</span> =&gt;</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"all values"</span>, values)
        }
    );
}</code></pre>
<h3 id="articleHeader13">顺序发送 Http 请求</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sequentialRequests() {
    const sequence$ = this.http.get<Course>('/courses/-KgVwEBq5wbFnjj7O8Fp.json')
        .switchMap(course => {
            course.description+= ' - TEST ';
            return this.http.put('/courses/-KgVwEBq5wbFnjj7O8Fp.json', course)
        });
        
    sequence$.subscribe();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">sequentialRequests() {
    <span class="hljs-keyword">const</span> sequence$ = <span class="hljs-keyword">this</span>.http.get&lt;Course&gt;(<span class="hljs-string">'/courses/-KgVwEBq5wbFnjj7O8Fp.json'</span>)
        .switchMap(<span class="hljs-function"><span class="hljs-params">course</span> =&gt;</span> {
            course.description+= <span class="hljs-string">' - TEST '</span>;
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.http.put(<span class="hljs-string">'/courses/-KgVwEBq5wbFnjj7O8Fp.json'</span>, course)
        });
        
    sequence$.subscribe();
}</code></pre>
<h3 id="articleHeader14">获取顺序发送 Http 请求的结果</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sequentialRequests() {
    const sequence$ = this.http.get<Course>('/courses/-KgVwEBq5wbFnjj7O8Fp.json')
        .switchMap(course => {
            course.description+= ' - TEST ';
            return this.http.put('/courses/-KgVwEBq5wbFnjj7O8Fp.json', course)
        },
            (firstHTTPResult, secondHTTPResult)  => [firstHTTPResult, secondHTTPResult]);

    sequence$.subscribe(values => console.log(&quot;result observable &quot;, values) );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">sequentialRequests() {
    <span class="hljs-keyword">const</span> sequence$ = <span class="hljs-keyword">this</span>.http.get&lt;Course&gt;(<span class="hljs-string">'/courses/-KgVwEBq5wbFnjj7O8Fp.json'</span>)
        .switchMap(<span class="hljs-function"><span class="hljs-params">course</span> =&gt;</span> {
            course.description+= <span class="hljs-string">' - TEST '</span>;
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.http.put(<span class="hljs-string">'/courses/-KgVwEBq5wbFnjj7O8Fp.json'</span>, course)
        },
            <span class="hljs-function">(<span class="hljs-params">firstHTTPResult, secondHTTPResult</span>)  =&gt;</span> [firstHTTPResult, secondHTTPResult]);

    sequence$.subscribe(<span class="hljs-function"><span class="hljs-params">values</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"result observable "</span>, values) );
}</code></pre>
<h3 id="articleHeader15">请求异常处理</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="throwError() {
    this.http
        .get(&quot;/api/simulate-error&quot;)
        .catch( error => {
            // here we can show an error message to the user,
            // for example via a service
            console.error(&quot;error catched&quot;, error);

            return Observable.of({description: &quot;Error Value Emitted&quot;});
        })
        .subscribe(
            val => console.log('Value emitted successfully', val),
            error => {
                console.error(&quot;This line is never called &quot;,error);
            },
            () => console.log(&quot;HTTP Observable completed...&quot;)
        );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">throwError() {
    <span class="hljs-keyword">this</span>.http
        .get(<span class="hljs-string">"/api/simulate-error"</span>)
        .catch( <span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
            <span class="hljs-comment">// here we can show an error message to the user,</span>
            <span class="hljs-comment">// for example via a service</span>
            <span class="hljs-built_in">console</span>.error(<span class="hljs-string">"error catched"</span>, error);

            <span class="hljs-keyword">return</span> Observable.of({description: <span class="hljs-string">"Error Value Emitted"</span>});
        })
        .subscribe(
            <span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Value emitted successfully'</span>, val),
            <span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
                <span class="hljs-built_in">console</span>.error(<span class="hljs-string">"This line is never called "</span>,error);
            },
            <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"HTTP Observable completed..."</span>)
        );
}</code></pre>
<p>当发生异常时，控制台的输出结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Error catched 

HttpErrorResponse {headers: HttpHeaders, status: 404, statusText: &quot;Not Found&quot;, url: &quot;http://localhost:4200/api/simulate-error&quot;, ok: false, … }

Value emitted successfully {description: &quot;Error Value Emitted&quot;}
HTTP Observable completed..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs puppet"><code class="shell">Error catched 

<span class="hljs-keyword">HttpErrorResponse</span> {headers: HttpHeaders, <span class="hljs-literal">status</span>: <span class="hljs-number">404</span>, statusText: <span class="hljs-string">"Not Found"</span>, url: <span class="hljs-string">"http://localhost:4200/api/simulate-error"</span>, ok: <span class="hljs-keyword">false</span>, … }

<span class="hljs-keyword">Value</span> <span class="hljs-keyword">emitted</span> <span class="hljs-keyword">successfully</span> {<span class="hljs-literal">description</span>: <span class="hljs-string">"Error Value Emitted"</span>}
<span class="hljs-keyword">HTTP</span> <span class="hljs-keyword">Observable</span> <span class="hljs-keyword">completed</span>...</code></pre>
<h3 id="articleHeader16">Http 拦截器</h3>
<h4>定义拦截器</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {Injectable} from &quot;@angular/core&quot;;
import {HttpEvent, HttpHandler, HttpInterceptor} from &quot;@angular/common/http&quot;;
import {HttpRequest} from &quot;@angular/common/http&quot;;
import {Observable} from &quot;rxjs/Observable&quot;;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedRequest = req.clone({
            headers: req.headers.set('X-CustomAuthHeader', authService.getToken())
        });
        console.log(&quot;new headers&quot;, clonedRequest.headers.keys());
        return next.handle(clonedRequest);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> {Injectable} <span class="hljs-keyword">from</span> <span class="hljs-string">"@angular/core"</span>;
<span class="hljs-keyword">import</span> {HttpEvent, HttpHandler, HttpInterceptor} <span class="hljs-keyword">from</span> <span class="hljs-string">"@angular/common/http"</span>;
<span class="hljs-keyword">import</span> {HttpRequest} <span class="hljs-keyword">from</span> <span class="hljs-string">"@angular/common/http"</span>;
<span class="hljs-keyword">import</span> {Observable} <span class="hljs-keyword">from</span> <span class="hljs-string">"rxjs/Observable"</span>;

<span class="hljs-meta">@Injectable</span>()
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AuthInterceptor <span class="hljs-keyword">implements</span> HttpInterceptor {
    
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> authService: AuthService</span>) {
    }

    intercept(req: HttpRequest&lt;<span class="hljs-built_in">any</span>&gt;, next: HttpHandler): Observable&lt;HttpEvent&lt;<span class="hljs-built_in">any</span>&gt;&gt; {
        <span class="hljs-keyword">const</span> clonedRequest = req.clone({
            headers: req.headers.set(<span class="hljs-string">'X-CustomAuthHeader'</span>, authService.getToken())
        });
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"new headers"</span>, clonedRequest.headers.keys());
        <span class="hljs-keyword">return</span> next.handle(clonedRequest);
    }
}</code></pre>
<h4>配置拦截器</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ]
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@NgModule</span>({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: <span class="hljs-literal">true</span> } ]
    ],
    bootstrap: [AppComponent]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule { }</code></pre>
<h3 id="articleHeader17">Http 进度事件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="longRequest() {
    const request = new HttpRequest(
        &quot;POST&quot;, &quot;/api/test-request&quot;, {}, 
         {reportProgress: true});

    this.http.request(request)
        .subscribe(
            event => {
                if (event.type === HttpEventType.DownloadProgress) {
                    console.log(&quot;Download progress event&quot;, event);
                }
                if (event.type === HttpEventType.UploadProgress) {
                    console.log(&quot;Upload progress event&quot;, event);
                }
                if (event.type === HttpEventType.Response) {
                    console.log(&quot;response received...&quot;, event.body);
                }
            }
        );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">longRequest() {
    <span class="hljs-keyword">const</span> request = <span class="hljs-keyword">new</span> HttpRequest(
        <span class="hljs-string">"POST"</span>, <span class="hljs-string">"/api/test-request"</span>, {}, 
         {reportProgress: <span class="hljs-literal">true</span>});

    <span class="hljs-keyword">this</span>.http.request(request)
        .subscribe(
            <span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> {
                <span class="hljs-keyword">if</span> (event.type === HttpEventType.DownloadProgress) {
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Download progress event"</span>, event);
                }
                <span class="hljs-keyword">if</span> (event.type === HttpEventType.UploadProgress) {
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Upload progress event"</span>, event);
                }
                <span class="hljs-keyword">if</span> (event.type === HttpEventType.Response) {
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"response received..."</span>, event.body);
                }
            }
        );
}</code></pre>
<p>上面示例运行后，控制台的可能的输出结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Upload progress event Object {type: 1, loaded: 2, total: 2}
Download progress event Object {type: 3, loaded: 31, total: 31}
Response Received... Object {description: &quot;POST Response&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code class="shell"><span class="hljs-selector-tag">Upload</span> <span class="hljs-selector-tag">progress</span> <span class="hljs-selector-tag">event</span> <span class="hljs-selector-tag">Object</span> {<span class="hljs-attribute">type</span>: <span class="hljs-number">1</span>, loaded: <span class="hljs-number">2</span>, total: <span class="hljs-number">2</span>}
<span class="hljs-selector-tag">Download</span> <span class="hljs-selector-tag">progress</span> <span class="hljs-selector-tag">event</span> <span class="hljs-selector-tag">Object</span> {<span class="hljs-attribute">type</span>: <span class="hljs-number">3</span>, loaded: <span class="hljs-number">31</span>, total: <span class="hljs-number">31</span>}
<span class="hljs-selector-tag">Response</span> <span class="hljs-selector-tag">Received</span>... <span class="hljs-selector-tag">Object</span> {<span class="hljs-attribute">description</span>: <span class="hljs-string">"POST Response"</span>}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular HTTP Client 快速入门

## 原文链接
[https://segmentfault.com/a/1190000010259536](https://segmentfault.com/a/1190000010259536)

