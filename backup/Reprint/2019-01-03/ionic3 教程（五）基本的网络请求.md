---
title: 'ionic3 教程（五）基本的网络请求' 
date: 2019-01-03 2:30:11
hidden: true
slug: azxcbzvc2p
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000010805290" src="https://static.alili.tech/img/remote/1460000010805290" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>链接：  <br><a href="https://segmentfault.com/a/1190000009922225">ionic3教程（一）安装和配置</a>  <br><a href="https://segmentfault.com/a/1190000009922271" target="_blank">ionic3教程（二）登录页制作</a>  <br><a href="https://segmentfault.com/a/1190000009924710">ionic3教程（三）设置页制作</a>  <br><a href="https://segmentfault.com/a/1190000010364414" target="_blank">ionic3教程（四）安卓硬件返回键处理</a><br><a href="https://segmentfault.com/a/1190000010805285">ionic3 教程（五）基本的网络请求</a></p>
<p>这是最后一节，本节主要用最简单网络请求和基本的内置指令做一个演示。</p>
<ul>
<li>对 Angular 的基本架构不熟悉的请点<a href="http://www.jianshu.com/p/3c06260e6015" rel="nofollow noreferrer" target="_blank">Angular 4.0 架构详解</a>
</li>
<li>对 Angular 的内置指令不熟悉的请点<a href="http://www.jianshu.com/p/4cc3a04ca83a" rel="nofollow noreferrer" target="_blank">Angular 4.0 内置指令全攻略</a>
</li>
</ul>
<h2 id="articleHeader0">前言</h2>
<p>通常我们希望在 HTTP 请求的时候，页面不会失去响应，所以我们的 HTTP 请求是异步的。  <br>JavaScript 中，通常用 3 种方式处理异步代码。</p>
<ol>
<li>回调（callback）</li>
<li>承诺（promise）</li>
<li>可观察对象（observable）</li>
</ol>
<blockquote>promise 和 observable 主要三个主要不同：</blockquote>
<ul>
<li>observable 可以中途取消，promise 发出就不行</li>
<li>observable 可以持续发射很多值，而 promise 只能发射一个值就结束了</li>
<li>observable 提供了更多的工具函数，最常用的是 filter 等</li>
</ul>
<p>想更多了解 promise 的请看<br><a href="http://liubin.org/promises-book/" rel="nofollow noreferrer" target="_blank">《JavaScript Promise迷你书》</a></p>
<p>想更多了解  rxjs(observable) 的请看<br><a href="https://www.gitbook.com/book/buctwbzs/rxjs/details" rel="nofollow noreferrer" target="_blank">《rxjs中文教程》</a></p>
<p><code>在 Angular 中，处理异步代码的最佳方式就是使用可观察对象，所以接下来会用到</code></p>
<h2 id="articleHeader1">app.module.ts</h2>
<p>导入 Angular 的 HttpModule。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { HttpModule } from '@angular/http';

//然后在 imports 中插入 HttpModule 即可
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> { HttpModule } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/http'</span>;

<span class="hljs-comment">//然后在 imports 中插入 HttpModule 即可</span>
</code></pre>
<h2 id="articleHeader2">测试用接口</h2>
<p>本来找了一些别的接口作为测试，发现不会显示数据，打开 Chrome 测试了一下发现有<strong>跨域</strong>问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="XMLHttpRequest cannot load
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">XMLHttpRequest cannot load</span>
</code></pre>
<p>所以这里给大家推荐个网站，我们就用他来进行测试。<br><a href="http://jsonplaceholder.typicode.com/" rel="nofollow noreferrer" target="_blank">http://jsonplaceholder.typico...</a></p>
<p>拖到下面的 Resources 可以看到图片。从图中可以看出接口种类还是比较丰富的，我们选择带图片的 /photos 进行测试。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010805291" src="https://static.alili.tech/img/remote/1460000010805291" alt="Resources" title="Resources" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">home.ts</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Http, Response } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // 接收数据用
  listData: Object;

  // 依赖注入
  constructor(public navCtrl: NavController, private http: Http) {

  }

  ionViewDidLoad() {
    // 网络请求
    this.http.request('http://jsonplaceholder.typicode.com/photos')
    .subscribe((res: Response) => {
      this.listData = res.json();
    });
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> { Http, Response } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/http'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'page-home'</span>,
  templateUrl: <span class="hljs-string">'home.html'</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> HomePage {
  <span class="hljs-comment">// 接收数据用</span>
  listData: <span class="hljs-built_in">Object</span>;

  <span class="hljs-comment">// 依赖注入</span>
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">public</span> navCtrl: NavController, <span class="hljs-keyword">private</span> http: Http</span>) {

  }

  ionViewDidLoad() {
    <span class="hljs-comment">// 网络请求</span>
    <span class="hljs-keyword">this</span>.http.request(<span class="hljs-string">'http://jsonplaceholder.typicode.com/photos'</span>)
    .subscribe(<span class="hljs-function">(<span class="hljs-params">res: Response</span>) =&gt;</span> {
      <span class="hljs-keyword">this</span>.listData = res.json();
    });
  }
</code></pre>
<p>http.request 会返回一个 Observable 对象。我们可以使用 subscribe 订阅变化。</p>
<p>当 http.request 从服务器返回一个流时，它就会发出一个 Response 对象。我们用 json 方法提取出响应体解析成一个 Object，最后将它赋值给 this.listData。</p>
<h2 id="articleHeader4">home.html</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ion-header>
  <ion-navbar>
    <ion-title>首页</ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <ion-list *ngFor=&quot;let item of listData&quot;>
    <ion-item>
      <ion-avatar item-left>
        <img [src]=&quot;item?.url&quot;>
      </ion-avatar>
      "{{"item?.title"}}"
    </ion-item>
  </ion-list>
</ion-content>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ion-header</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ion-navbar</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ion-title</span>&gt;</span>首页<span class="hljs-tag">&lt;/<span class="hljs-name">ion-title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ion-navbar</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ion-header</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">ion-content</span> <span class="hljs-attr">padding</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ion-list</span> *<span class="hljs-attr">ngFor</span>=<span class="hljs-string">"let item of listData"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ion-item</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ion-avatar</span> <span class="hljs-attr">item-left</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> [<span class="hljs-attr">src</span>]=<span class="hljs-string">"item?.url"</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ion-avatar</span>&gt;</span>
      </span><span class="hljs-template-variable">"{{"item?.title"}}"</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">ion-item</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ion-list</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ion-content</span>&gt;</span>
</span></code></pre>
<p>这里使用了一个 ngFor 遍历了 listData，生成了一个列表数据。还有一点要提一下，这个 <code>item?.title</code> 是 Angular 的一种语法，如果对象为空就不会取值，可以防止报错。</p>
<p>最后效果如图所示<br><span class="img-wrap"><img data-src="/img/remote/1460000010805292" src="https://static.alili.tech/img/remote/1460000010805292" alt="效果图" title="效果图" style="cursor: pointer; display: inline;"></span></p>
<p>再补上一个 Promise 的写法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'rxjs/add/operator/toPromise';

this.http.request('http://jsonplaceholder.typicode.com/photos')
  .toPromise()
  .then(res => { this.listData = res.json(); })
  .catch(err => { console.error(err) });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> <span class="hljs-string">'rxjs/add/operator/toPromise'</span>;

<span class="hljs-keyword">this</span>.http.request(<span class="hljs-string">'http://jsonplaceholder.typicode.com/photos'</span>)
  .toPromise()
  .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> { <span class="hljs-keyword">this</span>.listData = res.json(); })
  .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> { <span class="hljs-built_in">console</span>.error(err) });
</code></pre>
<p>自己动手试一试吧。这个入门系列结束之后，应该会去找一些模块进行深入点的展开。</p>
<blockquote>Demo<a href="https://github.com/2015lym/ionic3Demo/tree/demo5" rel="nofollow noreferrer" target="_blank">下载地址</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ionic3 教程（五）基本的网络请求

## 原文链接
[https://segmentfault.com/a/1190000010805285](https://segmentfault.com/a/1190000010805285)

