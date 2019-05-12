---
title: '避免并发的重复请求 for Angular' 
date: 2019-02-15 2:30:44
hidden: true
slug: hfugmpqxd6i
categories: [reprint]
---

{{< raw >}}

                    
<p>在项目的实际开发中偶然遇到了相同的GET请求被连续触发的问题，典型用例如CMS系统首页打开时导航栏需要加载栏目数据，页面中的栏目列表也同样请求该数据。当然，理想状态下可以要求导航栏先加载并缓存，然后其它组件从缓存中获取，然而实际上这些功能可能由不同的开发者编写，那么协调起来就麻烦一些了。而且越复杂的系统就更容易的出现这个问题，所以不得不解决一下了。<br>最初遇到这个问题是在一个AngularJS（AngularJS1.6测试通过）项目中，所以先丢这个出来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 这只是一个简单的例子，请自行扩展。
 * 返回的值总是一个promise，这样就默默的拦截了重复的请求
 * 注意：这里使用了本地缓存，这可能造成数据无法更新，
 * 而下一个例子则仅仅是过滤掉一个请求周期之内重复的请求
 */
function get(url) {
    var defer = $q.defer();
    if (localStage.getItem('cachedRequest-' + url) !== null) {
        if (localStage.getItem('cachedRequest-' + url).then) {
            //then方法不是undefined那么这就是个promise对象，扔回去
            return localStage.getItem('cachedRequest-' + url);
        } else {
            //数据已经本地缓存了那就放到defer里面返回
            defer.resolve(JSON.parse(localStage.getItem('cachedRequest-' + url)));
        }
    } else {
        //不好解释，要打太多字...明白就好
        var promise = $http.get(url).then(function(res){
            localStage.setItem('cachedRequest-' + url, JSON.stringify(res));
            return defer.resolve(res);
        });
        defer.resolve(promise);
    }
    return defer.promise();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">/**
 * 这只是一个简单的例子，请自行扩展。
 * 返回的值总是一个promise，这样就默默的拦截了重复的请求
 * 注意：这里使用了本地缓存，这可能造成数据无法更新，
 * 而下一个例子则仅仅是过滤掉一个请求周期之内重复的请求
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">get</span>(<span class="hljs-params">url</span>) </span>{
    <span class="hljs-built_in">var</span> defer = $q.defer();
    <span class="hljs-keyword">if</span> (localStage.getItem(<span class="hljs-string">'cachedRequest-'</span> + <span class="hljs-built_in">url</span>) !== <span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">if</span> (localStage.getItem(<span class="hljs-string">'cachedRequest-'</span> + <span class="hljs-built_in">url</span>).then) {
            <span class="hljs-comment">//then方法不是undefined那么这就是个promise对象，扔回去</span>
            <span class="hljs-keyword">return</span> localStage.getItem(<span class="hljs-string">'cachedRequest-'</span> + <span class="hljs-built_in">url</span>);
        } <span class="hljs-title">else</span> {
            <span class="hljs-comment">//数据已经本地缓存了那就放到defer里面返回</span>
            defer.resolve(<span class="hljs-built_in">JSON</span>.parse(localStage.getItem(<span class="hljs-string">'cachedRequest-'</span> + <span class="hljs-built_in">url</span>)));
        }
    } <span class="hljs-title">else</span> {
        <span class="hljs-comment">//不好解释，要打太多字...明白就好</span>
        <span class="hljs-built_in">var</span> promise = $http.get(<span class="hljs-built_in">url</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{
            localStage.setItem(<span class="hljs-string">'cachedRequest-'</span> + <span class="hljs-built_in">url</span>, <span class="hljs-built_in">JSON</span>.stringify(res));
            <span class="hljs-keyword">return</span> defer.resolve(res);
        });
        defer.resolve(promise);
    }
    <span class="hljs-keyword">return</span> defer.promise();
}</code></pre>
<p>Angular版本 （Angular6测试通过）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 这是最简代码，错误处理等是使用拦截器实现的
 */
import { Injectable } from '@angular/core';
import { throwError, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

//如果配置文件中设置了代理那么可以丢掉这个
const BEServer = &quot;http://localhost&quot;;

@Injectable({
    providedIn: 'root'
})

export class ApiRequestService {

    private apiSubjects = {};
    
    constructor(
            private http: HttpClient
    ) {
    }
    
    private extractData(res: Response) {
        let body = res;
        return body || { };
    }
    
    private buildUrl(url, params) {
        /* 此处略去N行代码和迭代方法 */
        return url;
    }
    
    private getHttpOptions(type) {
        /* 各种略 */
       return {headers:{"}}";
    }
    
    exec(type, url, data = null) {
        url = BEServer + url;
        let method = type.toLowerCase();
        if ((['get', 'post', 'put', 'delete', 'file']).indexOf(method) < 0) {
            return throwError('Request method is invalid.');
        }
        let httpOptions = this.getHttpOptions(method);
        if (method == 'get') {
            if (data) {
                url = this.buildUrl(url, data);
            }
        }
        if (method == 'get') {
            if (! this.apiSubjects[url]) {
                this.apiSubjects[url] = {
                        subscribe: this.http[method](url, httpOptions).pipe(map(this.extractData)).subscribe(data => {
                            this.apiSubjects[url].subject.next(data);
                            //这个delete的处理感觉不顺，但是实测也找不到更好的办法
                            delete(this.apiSubjects[url]);
                        }), 
                        subject: new Subject<Object>()
                };
            }
            return this.apiSubjects[url].subject;
        } else if (method == 'delete') {
            return this.http[method](url, httpOptions).pipe(map(this.extractData));
        } else {
            return this.http[method](url, data, httpOptions).pipe(map(this.extractData));
        }
    }
}

//调用测试，不必要的代码全略掉
instanceOfApiRequestService.exec('GET', '/api/dashboard').subscribe(data => {
    console.log(data);
});
instanceOfApiRequestService.exec('GET', '/api/dashboard').subscribe(data => {
    console.log(data);
});
instanceOfApiRequestService.exec('GET', '/api/dashboard').subscribe(data => {
    console.log(data);
});
//三次log都被触发，但是只有一次http请求。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">/**
 * 这是最简代码，错误处理等是使用拦截器实现的
 */</span>
<span class="hljs-keyword">import</span> { Injectable } from <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { throwError, Subject } from <span class="hljs-string">'rxjs'</span>;
<span class="hljs-keyword">import</span> { HttpClient, HttpHeaders } from <span class="hljs-string">'@angular/common/http'</span>;
<span class="hljs-keyword">import</span> { map } from <span class="hljs-string">'rxjs/operators'</span>;

<span class="hljs-comment">//如果配置文件中设置了代理那么可以丢掉这个</span>
const BEServer = <span class="hljs-string">"http://localhost"</span>;

<span class="hljs-meta">@Injectable({
    providedIn: <span class="hljs-meta-string">'root'</span>
})</span>

export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ApiRequestService</span> </span>{

    <span class="hljs-keyword">private</span> apiSubjects = {};
    
    <span class="hljs-keyword">constructor</span>(
            <span class="hljs-keyword">private</span> http: HttpClient
    ) {
    }
    
    <span class="hljs-keyword">private</span> extractData(res: Response) {
        let body = res;
        <span class="hljs-keyword">return</span> body || { };
    }
    
    <span class="hljs-keyword">private</span> buildUrl(url, params) {
        <span class="hljs-comment">/* 此处略去N行代码和迭代方法 */</span>
        <span class="hljs-keyword">return</span> url;
    }
    
    <span class="hljs-keyword">private</span> getHttpOptions(type) {
        <span class="hljs-comment">/* 各种略 */</span>
       <span class="hljs-keyword">return</span> {headers:{"}}";
    }
    
    exec(type, url, <span class="hljs-keyword">data</span> = <span class="hljs-literal">null</span>) {
        url = BEServer + url;
        let method = type.toLowerCase();
        <span class="hljs-keyword">if</span> (([<span class="hljs-string">'get'</span>, <span class="hljs-string">'post'</span>, <span class="hljs-string">'put'</span>, <span class="hljs-string">'delete'</span>, <span class="hljs-string">'file'</span>]).indexOf(method) &lt; <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">return</span> throwError(<span class="hljs-string">'Request method is invalid.'</span>);
        }
        let httpOptions = <span class="hljs-keyword">this</span>.getHttpOptions(method);
        <span class="hljs-keyword">if</span> (method == <span class="hljs-string">'get'</span>) {
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">data</span>) {
                url = <span class="hljs-keyword">this</span>.buildUrl(url, <span class="hljs-keyword">data</span>);
            }
        }
        <span class="hljs-keyword">if</span> (method == <span class="hljs-string">'get'</span>) {
            <span class="hljs-keyword">if</span> (! <span class="hljs-keyword">this</span>.apiSubjects[url]) {
                <span class="hljs-keyword">this</span>.apiSubjects[url] = {
                        subscribe: <span class="hljs-keyword">this</span>.http[method](url, httpOptions).pipe(map(<span class="hljs-keyword">this</span>.extractData)).subscribe(<span class="hljs-keyword">data</span> =&gt; {
                            <span class="hljs-keyword">this</span>.apiSubjects[url].subject.next(<span class="hljs-keyword">data</span>);
                            <span class="hljs-comment">//这个delete的处理感觉不顺，但是实测也找不到更好的办法</span>
                            delete(<span class="hljs-keyword">this</span>.apiSubjects[url]);
                        }), 
                        subject: new Subject&lt;Object&gt;()
                };
            }
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.apiSubjects[url].subject;
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (method == <span class="hljs-string">'delete'</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.http[method](url, httpOptions).pipe(map(<span class="hljs-keyword">this</span>.extractData));
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.http[method](url, <span class="hljs-keyword">data</span>, httpOptions).pipe(map(<span class="hljs-keyword">this</span>.extractData));
        }
    }
}

<span class="hljs-comment">//调用测试，不必要的代码全略掉</span>
instanceOfApiRequestService.exec(<span class="hljs-string">'GET'</span>, <span class="hljs-string">'/api/dashboard'</span>).subscribe(<span class="hljs-keyword">data</span> =&gt; {
    console.log(<span class="hljs-keyword">data</span>);
});
instanceOfApiRequestService.exec(<span class="hljs-string">'GET'</span>, <span class="hljs-string">'/api/dashboard'</span>).subscribe(<span class="hljs-keyword">data</span> =&gt; {
    console.log(<span class="hljs-keyword">data</span>);
});
instanceOfApiRequestService.exec(<span class="hljs-string">'GET'</span>, <span class="hljs-string">'/api/dashboard'</span>).subscribe(<span class="hljs-keyword">data</span> =&gt; {
    console.log(<span class="hljs-keyword">data</span>);
});
<span class="hljs-comment">//三次log都被触发，但是只有一次http请求。</span></code></pre>
<p>刚接触Angular6不久，不管是我这个想法本身有错误还是解决的方式有问题都请拍砖不要客气，只求大侠的砖头上绘制一下示例代码，不胜感激。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
避免并发的重复请求 for Angular

## 原文链接
[https://segmentfault.com/a/1190000016907260](https://segmentfault.com/a/1190000016907260)

