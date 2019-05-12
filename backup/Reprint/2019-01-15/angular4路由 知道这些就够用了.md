---
title: 'angular4路由 知道这些就够用了' 
date: 2019-01-15 2:30:12
hidden: true
slug: nipb49qnsy
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">angular 4 路由</h1>
<p>使用cli命令创建根路由模块 <code>ng g cl app.router</code> 或自己建一个路由配置文件 如:<code>app/app.router.ts</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/app.router.ts
// 将文件修改为

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // 以后在这里改动配置
  { path: '**', pathMatch: 'full', redirectTo: '' }
];
// 将路由配置导出为 appRouting 以供调用, 子模块中的路由使用 forChild 而不是 forRoot
export const appRouting = RouterModule.forRoot(routes);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">// app/app.router.ts</span>
<span class="hljs-comment">// 将文件修改为</span>

<span class="hljs-keyword">import</span> { RouterModule, Routes } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/router'</span>;

<span class="hljs-keyword">const</span> routes: Routes = [
  <span class="hljs-comment">// 以后在这里改动配置</span>
  { path: <span class="hljs-string">'**'</span>, pathMatch: <span class="hljs-string">'full'</span>, redirectTo: <span class="hljs-string">''</span> }
];
<span class="hljs-comment">// 将路由配置导出为 appRouting 以供调用, 子模块中的路由使用 forChild 而不是 forRoot</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> appRouting = RouterModule.forRoot(routes);</code></pre>
<p>在根模块中引入路由, 为特性模块定义的路由在其模块中引入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/app.module.ts
import { appRouting } from &quot;./router/router.module&quot;
// @NgModule({
//  imports: [ ... ,
  appRouting
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">// app/app.module.ts</span>
<span class="hljs-keyword">import</span> { appRouting } <span class="hljs-keyword">from</span> <span class="hljs-string">"./router/router.module"</span>
<span class="hljs-comment">// @NgModule({</span>
<span class="hljs-comment">//  imports: [ ... ,</span>
  appRouting
<span class="hljs-comment">// ...</span></code></pre>
<h2 id="articleHeader1">路由配置</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const routes: Routes = [
  // path:路径 /news component:组件
  { path: 'news',  component: Newsomponent },
  // path:路径 /detail/1 component:组件
  { path: 'detail/:id', component: DetailComponent },
  // 懒加载子模块, 子模块需要配置路由设置启动子组件
  { path: 'other', loadChildren:&quot;./other/other.module#otherModule&quot; },
  // 重定向
  { path: '**', pathMatch: 'full', redirectTo: '' }
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-keyword">const</span> routes: Routes = [
  <span class="hljs-comment">// path:路径 /news component:组件</span>
  { path: <span class="hljs-string">'news'</span>,  component: Newsomponent },
  <span class="hljs-comment">// path:路径 /detail/1 component:组件</span>
  { path: <span class="hljs-string">'detail/:id'</span>, component: DetailComponent },
  <span class="hljs-comment">// 懒加载子模块, 子模块需要配置路由设置启动子组件</span>
  { path: <span class="hljs-string">'other'</span>, loadChildren:<span class="hljs-string">"./other/other.module#otherModule"</span> },
  <span class="hljs-comment">// 重定向</span>
  { path: <span class="hljs-string">'**'</span>, pathMatch: <span class="hljs-string">'full'</span>, redirectTo: <span class="hljs-string">''</span> }
];</code></pre>
<ul>
<li><p>pathMatch?: string; 默认为前缀匹配 "prefix"; "full" 为完全匹配</p></li>
<li><p>outlet?: string; 路由目标</p></li>
<li><p>children?: Routes; 子路由的规则</p></li>
</ul>
<h2 id="articleHeader2">加载路由</h2>
<p>在根组件或当前组件的模板中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-outlet></router-outlet>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">router-outlet</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-outlet</span>&gt;</span></code></pre>
<h2 id="articleHeader3">多个路由区域</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  { path: 'news', outlet:'let1'  component: NewsComponent }
  { path: 'news', outlet:'let2'  component: News2Cmponent }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  { <span class="hljs-attr">path</span>: <span class="hljs-string">'news'</span>, <span class="hljs-attr">outlet</span>:<span class="hljs-string">'let1'</span>  component: NewsComponent }
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'news'</span>, <span class="hljs-attr">outlet</span>:<span class="hljs-string">'let2'</span>  component: News2Cmponent }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-outlet name=&quot;let1&quot;></router-outlet>
<router-outlet name=&quot;let2&quot;></router-outlet>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">router-outlet</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"let1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-outlet</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">router-outlet</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"let2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-outlet</span>&gt;</span></code></pre>
<p>即访问 <code>/news/</code> 时同时加载 <code>NewsComponent</code> 和 <code>News2Cmponent</code> 两个组件</p>
<h2 id="articleHeader4">链接及访问</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a routerLink=&quot;/detail/1&quot; routerLinkActive=&quot;active&quot;>detail</a>
<a [routerLink]=&quot;['/detail', news.id]&quot;>"{{"news.title"}}"</a>
<a [routerLink]=&quot;[{ outlets: { let2: ['news'] } }]&quot;>Contact</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">routerLink</span>=<span class="hljs-string">"/detail/1"</span> <span class="hljs-attr">routerLinkActive</span>=<span class="hljs-string">"active"</span>&gt;</span>detail<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> [<span class="hljs-attr">routerLink</span>]=<span class="hljs-string">"['/detail', news.id]"</span>&gt;</span>"{{"news.title"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> [<span class="hljs-attr">routerLink</span>]=<span class="hljs-string">"[{ outlets: { let2: ['news'] } }]"</span>&gt;</span>Contact<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<p><code>routerLinkActive="active"</code> 即在本路由激活时添加样式 <code>.active</code></p>
<p>或</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Router } from '@angular/router';
// ...
constructor(private router: Router) {}

// ...

this.router.navigate(['/detail', this.news.id])
this.router.navigate([{ outlets: { let2: null "}}"]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-keyword">import</span> { Router } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/router'</span>;
<span class="hljs-comment">// ...</span>
<span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> router: Router</span>) {}

<span class="hljs-comment">// ...</span>

<span class="hljs-keyword">this</span>.router.navigate([<span class="hljs-string">'/detail'</span>, <span class="hljs-keyword">this</span>.news.id])
<span class="hljs-keyword">this</span>.router.navigate([{ outlets: { let2: <span class="hljs-literal">null</span> "}}"]);</code></pre>
<p>navigateByUrl 方法指向完整的绝对路径</p>
<h2 id="articleHeader5">路由守卫</h2>
<p>适用于后台管理等需要登录才能使用的模块</p>
<p>创建一个认证服务</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/auth.service.ts

import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';

@Injectable()
export class AuthService implements CanActivate {
  canActivate() {
    // 这里判断登录状态, 返回 true 或 false
    return true;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">// app/auth.service.ts</span>

<span class="hljs-keyword">import</span> { Injectable }     <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { CanActivate }    <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/router'</span>;

<span class="hljs-meta">@Injectable</span>()
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AuthService <span class="hljs-keyword">implements</span> CanActivate {
  canActivate() {
    <span class="hljs-comment">// 这里判断登录状态, 返回 true 或 false</span>
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }
}</code></pre>
<p>添加或修改路由配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/app.router.ts

// 增加 CanActivate
import { CanActivate ... } from '@angular/router';


  // 配置中增加 canActivate 如:
  { path: 'admin', canActivate:[AuthService] ... }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">// app/app.router.ts</span>

<span class="hljs-comment">// 增加 CanActivate</span>
<span class="hljs-keyword">import</span> { CanActivate ... } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/router'</span>;


  <span class="hljs-comment">// 配置中增加 canActivate 如:</span>
  { path: <span class="hljs-string">'admin'</span>, canActivate:[AuthService] ... }
</code></pre>
<h2 id="articleHeader6">退出守卫</h2>
<p>适合于编辑器修改后的保存提示等场景</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/deac.service.ts

import { Injectable }     from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot }    from '@angular/router';

// CanDeactivateComponent 是定义的接口,见下段代码
import { CanDeactivateComponent } from './can-deactivate.omponent';

@Injectable()
export class DeacService implements CanDeactivate<CanDeactivateComponent> {
  canDeactivate(
    canDeactivateComponent: CanDeactivateComponent,
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    routerStateSnapshot: RouterStateSnapshot
  ) {
    // 目标路由和当前路由
    console.log(activatedRouteSnapshot);
    console.log(routerStateSnapshot);

    // 判断并返回
    return canDeactivateComponent.canDeactivate ? canDeactivateComponent.canDeactivate() : true

  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">// app/deac.service.ts</span>

<span class="hljs-keyword">import</span> { Injectable }     <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot }    <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/router'</span>;

<span class="hljs-comment">// CanDeactivateComponent 是定义的接口,见下段代码</span>
<span class="hljs-keyword">import</span> { CanDeactivateComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./can-deactivate.omponent'</span>;

<span class="hljs-meta">@Injectable</span>()
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> DeacService <span class="hljs-keyword">implements</span> CanDeactivate&lt;CanDeactivateComponent&gt; {
  canDeactivate(
    canDeactivateComponent: CanDeactivateComponent,
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    routerStateSnapshot: RouterStateSnapshot
  ) {
    <span class="hljs-comment">// 目标路由和当前路由</span>
    <span class="hljs-built_in">console</span>.log(activatedRouteSnapshot);
    <span class="hljs-built_in">console</span>.log(routerStateSnapshot);

    <span class="hljs-comment">// 判断并返回</span>
    <span class="hljs-keyword">return</span> canDeactivateComponent.canDeactivate ? canDeactivateComponent.canDeactivate() : <span class="hljs-literal">true</span>

  }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// can-deactivate.omponent.ts

// 接口组件, 返回 true 或 false 如表单发生改变则调用对话框服务
export interface CanDeactivateComponent {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">// can-deactivate.omponent.ts</span>

<span class="hljs-comment">// 接口组件, 返回 true 或 false 如表单发生改变则调用对话框服务</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> CanDeactivateComponent {
  canDeactivate: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> Observable&lt;<span class="hljs-built_in">boolean</span>&gt; | <span class="hljs-built_in">Promise</span>&lt;<span class="hljs-built_in">boolean</span>&gt; | <span class="hljs-built_in">boolean</span>;
}</code></pre>
<p>路由配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  path: ...,
  canDeactivate: [DeacService],
  component: ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts">{
  path: ...,
  canDeactivate: [DeacService],
  component: ...
}</code></pre>
<p>模块中添加服务</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="providers: [
  DeactivateGuardService
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts">providers: [
  DeactivateGuardService
]</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
angular4路由 知道这些就够用了

## 原文链接
[https://segmentfault.com/a/1190000009357922](https://segmentfault.com/a/1190000009357922)

