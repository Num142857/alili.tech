---
title: 'angular2 ng2-router 路由，嵌套路由详解' 
date: 2019-01-30 2:30:23
hidden: true
slug: uhrax2956d
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>实现ng2-router路由，嵌套路由</strong></p>
<ol>
<li>
<p>首先配置angular2的时候router模块已经下载，只需要引入即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {RouterModule, Routes} from &quot;@angular/router&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs capnproto"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> {RouterModule, Routes} <span class="hljs-keyword">from</span> <span class="hljs-string">"@angular/router"</span>;</code></pre>
</li>
<li>
<p>我们要创建一个嵌套路由，所以需要创建以下文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="index.html
app.module.ts
app.component.ts
home.component.ts
list.component.ts
list-one.component.ts
list-two.component.ts" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>index<span class="hljs-selector-class">.html</span>
app<span class="hljs-selector-class">.module</span><span class="hljs-selector-class">.ts</span>
app<span class="hljs-selector-class">.component</span><span class="hljs-selector-class">.ts</span>
home<span class="hljs-selector-class">.component</span><span class="hljs-selector-class">.ts</span>
list<span class="hljs-selector-class">.component</span><span class="hljs-selector-class">.ts</span>
list-one<span class="hljs-selector-class">.component</span><span class="hljs-selector-class">.ts</span>
list-two<span class="hljs-selector-class">.component</span><span class="hljs-selector-class">.ts</span></code></pre>
</li>
<li>实现效果：<br>路由，单机“首页”加载home.component.ts<br>单机"列表“加载list.component.ts<br>列表中包含嵌套路由，tab页<br>单机"标签一"加载list-one.component.ts<br>单机"标签二"加载list-one.component.ts</li>
<li>
<p>开始配置</p>
<ul><li>
<p>index.html界面配置两点</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<head>标签中引入 <meta href=&quot;/&quot; />
引入路由代码显示标签 引入主组件标签 <my-app></my-app>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>标签中引入 <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/"</span> /&gt;</span>
引入路由代码显示标签 引入主组件标签 <span class="hljs-tag">&lt;<span class="hljs-name">my-app</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-app</span>&gt;</span></code></pre>
<p>就这么简单， index.html界面配置完毕</p>
</li></ul>
</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
* app.module.ts界面配置路由
        import {BrowserModule} from &quot;@angular/platform-browser&quot;;
        import {NgModule} from &quot;@angular/core&quot;;
        import {RouterModule, Routes} from &quot;@angular/router&quot;;
    
        // 表单 双向数据绑定
        import {FormsModule} from &quot;@angular/forms&quot;;
        import {AppComponent} from &quot;./app.component&quot;;
        // List中包含两个tab子组件
        import {ListComponent} from &quot;./list.component&quot;;
        import {ListOneComponent} from &quot;./list-one.component&quot;;
        import {ListTwoComponent} from &quot;./list-two.component&quot;;
        import {HomeComponent} from &quot;./home.component&quot;;
        // 定义路由, bootstrap默认加载组件就是AppComponent,所以他就是主页导航页,然后添加的路由都在他的模板中。
    
        // 可以所有代码写在NgModule中, 也可以这样自定义常量,然后使用。
    
        // 定义常量 嵌套自路由
        const appChildRoutes: Routes = [
          {path: &quot;one&quot;, component: ListOneComponent},
          {path: &quot;two&quot;, component: ListTwoComponent},
          // 如果地址栏中输入没有定义的路由就跳转到one路由界面
          {
            path: '**', redirectTo: &quot;one&quot;
          }
        ];
        // 定义常量 路由
        const appRoutes:Routes = [
          {path: '', component: HomeComponent},
          {
            path: 'list',
            component: ListComponent,
            children: appChildRoutes
        ];
        // 引用定义的路由
        @NgModule({
          imports: [
            BrowserModule,
            FormsModule,
            RouterModule.forRoot(appRoutes)
          ],
          declarations: [
            AppComponent,
            ListComponent,
            HomeComponent,
            ListOneComponent,
            ListTwoComponent
          ],
          bootstrap: [AppComponent]
        })
        export class AppModule {
        
        }
    这样就完成了嵌套路由的配置
*    显示路由内容

    * app.component.ts
    
    
        import {Component} from &quot;@angular/core&quot;;
        @Component({
          selector: &quot;my-app&quot;,
          // templateUrl: &quot;../views/one.html&quot;
          template: `
                    <div>
                    <!--使用了bootstrap样式的导航，routerLinkActive，表示路由激活的时候，谈价active类样式-->
                    
                    <!--
                    [routerLinkActiveOptions]=&quot;{exact: true}&quot; 完全匹配路由，如果不添加这个，有可能 path=&quot;&quot; 会一直添加激活的样式
                     -->
                    
                      <ul class=&quot;nav navbar-nav&quot;>
                        <li routerLinkActive=&quot;active&quot; [routerLinkActiveOptions]=&quot;{exact: true}&quot;><a routerLink=&quot;home&quot;>首页</a></li>
                        <li routerLinkActive=&quot;active&quot; [routerLinkActiveOptions]=&quot;{exact: true}&quot;><a routerLink=&quot;contact&quot;>联系我们</a></li>
                        <li routerLinkActive=&quot;active&quot; [routerLinkActiveOptions]=&quot;{exact: true}&quot;><a routerLink=&quot;product&quot;>产品</a></li>
                      </ul>
                      <!--路由内容显示区域-->
                      <router-outlet></router-outlet>
                    </div>
                    `
        })
        export class AppComponent {
        
        }
    * list.component.ts

    
    
        import {Component} from &quot;@angular/core&quot;;
        @Component({
            selector: &quot;my-list&quot;,
            // templateUrl: &quot;../views/list.html&quot;
            template: `
                  <div>
                    <!-- 子路由连接 -->
                    <a routerLink=&quot;one&quot;>one</a>
                    <a routerLink=&quot;two&quot;>two</a>
                    <!-- 路由内容显示标签 -->
                    <router-outlet></router-outlet>
                  </div>
               `
        })
        export class ListComponent {
            name = &quot;list&quot;;
        }
                
  
  
 * list-one.component.ts
 
     
    
    
        import {Component} from &quot;@angular/core&quot;
        @Component({
             selector: &quot;my-list-one&quot;,
             template:`
                "{{"name"}}"
             `
        })
        export class ListOneComponent {
             name = &quot;list-one&quot;;
            }

 * list-two.component.ts同理

 ```
 获取路由参数id  (about:id) 添加模块 ActivatedRoute
 ```
    
 ```

    import {ActivatedRoute} from &quot;@angular/router&quot;;
    
    export class AboutList {
        id: Object;
        constructor(public route:ActivatedRoute) {
            this.id = {};
        }
        ngOnInit() {
            this.route.params.subscribe(params => {
                this.id = params  // {id: &quot;xxx&quot;}
            });
        }
    }
    ----------------------
    路由：
    {
        path: 'contacts-detail/:id',
        component: ContactsDetailComponent
    },
    跳转
    界面跳转：
    "{{"row.instid"}}"
    <a (click)=&quot;contactsCheck(row)&quot;><i class=&quot;fa fa-delete&quot;></i>审核</a>
    <a class=&quot;fa fa-editor&quot; [routerLink]=&quot;['../contacts-detail/'+ row.instid]&quot;>查看详情</a>
    方法跳转：
    contactsCheck(value: any) {
    console.log(value);
    this.router.navigate(['./contacts/contacts-detail', value.instid]);
}
    ----------------------
    
    直接获取id值
    this.route.snapshot.params[&quot;id&quot;]
 ```
 
     补助： 路由中的界面跳转
 ```
     import {Router} from &quot;@angular/router&quot;;
     
     constructor(public router: Router) {
     // 相当于window.location.href，界面跳转
         router.navigateByUrl('home');
     }
 ``` 
 路由跳转默认以跟路由以为起点条状，如果想以当前路由为起点，设置路由跳转，添加如下内容
 ```
    import {ActiveRouter, Router} from &quot;router&quot;
    constructor(public acitveRouter: ActiveRouter; public router: Router) {
}

     this.router.navigate(['userList'],{relativeTo: activeRouter}); 
    
    1.this.router.navigate(['user', 1]); 
    以根路由为起点跳转
    2.this.router.navigate(['user', 1],{relativeTo: activeRouter}); 
    默认值为根路由，设置后相对当前路由跳转，activeRouter是ActivatedRoute的实例，使用需要导入ActivatedRoute
    3.this.router.navigate(['user', 1],{ queryParams: { id: 1 } }); 
    路由中传参数 /user/1?id=1,查询参数，用于路由跳转，返回时候，带回去一些参数，搜索条件，分页，等等
    4.this.router.navigate(['view', 1], { preserveQueryParams: true }); 
    默认值为false，设为true，保留之前路由中的查询参数/user?id=1 to /view?id=1
    5.this.router.navigate(['user', 1],{ fragment: 'top' }); 
    路由中锚点跳转 /user/1#top
    6.this.router.navigate(['/view'], { preserveFragment: true }); 
    默认值为false，设为true，保留之前路由中的锚点/user/1#top to /view#top
    7.this.router.navigate(['/user',1], { skipLocationChange: true }); 
    默认值为false，设为true路由跳转时浏览器中的url会保持不变，但是传入的参数依然有效
    8.this.router.navigate(['/user',1], { replaceUrl: true }); 
    未设置时默认为true，设置为false路由不会进行跳转
    二、router.navigate刷新页面问题
    造成这个问题一般是因为我们在<form>表单中使用<button>时忘记添加type属性，在表单中，如果忘记给按钮添加属性，会默认为submit
    ?
    1
    <button (click)=&quot;toDetail()&quot;>detail</button>
    ?
    1
    2
    3
    toDetail() {
     this._router.navigate(['/detail']);
    }
    解决方法： 
    1.添加type

    <button type=&quot;button&quot; (click)=&quot;toDetail()&quot;>detail</button>
    2.click添加false

    <button (click)=&quot;toDetail();false&quot;>detail</button>
 ```
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>
* app.module.ts界面配置路由
        <span class="hljs-keyword">import</span> {BrowserModule} from <span class="hljs-string">"@angular/platform-browser"</span>;
        <span class="hljs-keyword">import</span> {NgModule} from <span class="hljs-string">"@angular/core"</span>;
        <span class="hljs-keyword">import</span> {RouterModule, Routes} from <span class="hljs-string">"@angular/router"</span>;
    
        <span class="hljs-comment">// 表单 双向数据绑定</span>
        <span class="hljs-keyword">import</span> {FormsModule} from <span class="hljs-string">"@angular/forms"</span>;
        <span class="hljs-keyword">import</span> {AppComponent} from <span class="hljs-string">"./app.component"</span>;
        <span class="hljs-comment">// List中包含两个tab子组件</span>
        <span class="hljs-keyword">import</span> {ListComponent} from <span class="hljs-string">"./list.component"</span>;
        <span class="hljs-keyword">import</span> {ListOneComponent} from <span class="hljs-string">"./list-one.component"</span>;
        <span class="hljs-keyword">import</span> {ListTwoComponent} from <span class="hljs-string">"./list-two.component"</span>;
        <span class="hljs-keyword">import</span> {HomeComponent} from <span class="hljs-string">"./home.component"</span>;
        <span class="hljs-comment">// 定义路由, bootstrap默认加载组件就是AppComponent,所以他就是主页导航页,然后添加的路由都在他的模板中。</span>
    
        <span class="hljs-comment">// 可以所有代码写在NgModule中, 也可以这样自定义常量,然后使用。</span>
    
        <span class="hljs-comment">// 定义常量 嵌套自路由</span>
        const appChildRoutes: Routes = [
          {path: <span class="hljs-string">"one"</span>, component: ListOneComponent},
          {path: <span class="hljs-string">"two"</span>, component: ListTwoComponent},
          <span class="hljs-comment">// 如果地址栏中输入没有定义的路由就跳转到one路由界面</span>
          {
            path: <span class="hljs-string">'**'</span>, redirectTo: <span class="hljs-string">"one"</span>
          }
        ];
        <span class="hljs-comment">// 定义常量 路由</span>
        const appRoutes:Routes = [
          {path: <span class="hljs-string">''</span>, component: HomeComponent},
          {
            path: <span class="hljs-string">'list'</span>,
            component: ListComponent,
            children: appChildRoutes
        ];
        <span class="hljs-comment">// 引用定义的路由</span>
        <span class="hljs-meta">@NgModule({
          imports: [
            BrowserModule,
            FormsModule,
            RouterModule.forRoot(appRoutes)</span>
          ],
          declarations: [
            AppComponent,
            ListComponent,
            HomeComponent,
            ListOneComponent,
            ListTwoComponent
          ],
          bootstrap: [AppComponent]
        })
        export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppModule</span> </span>{
        
        }
    这样就完成了嵌套路由的配置
*    显示路由内容

    * app.component.ts
    
    
        <span class="hljs-keyword">import</span> {Component} from <span class="hljs-string">"@angular/core"</span>;
        <span class="hljs-meta">@Component({
          selector: <span class="hljs-meta-string">"my-app"</span>,
          // templateUrl: <span class="hljs-meta-string">"../views/one.html"</span>
          template: `
                    &lt;div&gt;
                    &lt;!--使用了bootstrap样式的导航，routerLinkActive，表示路由激活的时候，谈价active类样式--&gt;
                    
                    &lt;!--
                    [routerLinkActiveOptions]=<span class="hljs-meta-string">"{exact: true}"</span> 完全匹配路由，如果不添加这个，有可能 path=<span class="hljs-meta-string">""</span> 会一直添加激活的样式
                     --&gt;
                    
                      &lt;ul class=<span class="hljs-meta-string">"nav navbar-nav"</span>&gt;
                        &lt;li routerLinkActive=<span class="hljs-meta-string">"active"</span> [routerLinkActiveOptions]=<span class="hljs-meta-string">"{exact: true}"</span>&gt;&lt;a routerLink=<span class="hljs-meta-string">"home"</span>&gt;首页&lt;/a&gt;&lt;/li&gt;
                        &lt;li routerLinkActive=<span class="hljs-meta-string">"active"</span> [routerLinkActiveOptions]=<span class="hljs-meta-string">"{exact: true}"</span>&gt;&lt;a routerLink=<span class="hljs-meta-string">"contact"</span>&gt;联系我们&lt;/a&gt;&lt;/li&gt;
                        &lt;li routerLinkActive=<span class="hljs-meta-string">"active"</span> [routerLinkActiveOptions]=<span class="hljs-meta-string">"{exact: true}"</span>&gt;&lt;a routerLink=<span class="hljs-meta-string">"product"</span>&gt;产品&lt;/a&gt;&lt;/li&gt;
                      &lt;/ul&gt;
                      &lt;!--路由内容显示区域--&gt;
                      &lt;router-outlet&gt;&lt;/router-outlet&gt;
                    &lt;/div&gt;
                    `
        })</span>
        export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppComponent</span> </span>{
        
        }
    * list.component.ts

    
    
        <span class="hljs-keyword">import</span> {Component} from <span class="hljs-string">"@angular/core"</span>;
        <span class="hljs-meta">@Component({
            selector: <span class="hljs-meta-string">"my-list"</span>,
            // templateUrl: <span class="hljs-meta-string">"../views/list.html"</span>
            template: `
                  &lt;div&gt;
                    &lt;!-- 子路由连接 --&gt;
                    &lt;a routerLink=<span class="hljs-meta-string">"one"</span>&gt;one&lt;/a&gt;
                    &lt;a routerLink=<span class="hljs-meta-string">"two"</span>&gt;two&lt;/a&gt;
                    &lt;!-- 路由内容显示标签 --&gt;
                    &lt;router-outlet&gt;&lt;/router-outlet&gt;
                  &lt;/div&gt;
               `
        })</span>
        export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ListComponent</span> </span>{
            name = <span class="hljs-string">"list"</span>;
        }
                
  
  
 * list-one.component.ts
 
     
    
    
        <span class="hljs-keyword">import</span> {Component} from <span class="hljs-string">"@angular/core"</span>
        <span class="hljs-meta">@Component({
             selector: <span class="hljs-meta-string">"my-list-one"</span>,
             template:`
                "{{"name"}}"
             `
        })</span>
        export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ListOneComponent</span> </span>{
             name = <span class="hljs-string">"list-one"</span>;
            }

 * list-two.component.ts同理

 ```
 获取路由参数id  (about:id) 添加模块 ActivatedRoute
 ```
    
 ```

    <span class="hljs-keyword">import</span> {ActivatedRoute} from <span class="hljs-string">"@angular/router"</span>;
    
    export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AboutList</span> </span>{
        id: Object;
        <span class="hljs-keyword">constructor</span>(<span class="hljs-keyword">public</span> route:ActivatedRoute) {
            <span class="hljs-keyword">this</span>.id = {};
        }
        ngOnInit() {
            <span class="hljs-keyword">this</span>.route.params.subscribe(params =&gt; {
                <span class="hljs-keyword">this</span>.id = params  <span class="hljs-comment">// {id: "xxx"}</span>
            });
        }
    }
    ----------------------
    路由：
    {
        path: <span class="hljs-string">'contacts-detail/:id'</span>,
        component: ContactsDetailComponent
    },
    跳转
    界面跳转：
    "{{"row.instid"}}"
    &lt;a (click)=<span class="hljs-string">"contactsCheck(row)"</span>&gt;&lt;i <span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">fa</span> <span class="hljs-title">fa</span>-<span class="hljs-title">delete</span>"&gt;&lt;<span class="hljs-type">/i</span>&gt;审核&lt;<span class="hljs-type">/a</span>&gt;</span>
    &lt;a <span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">fa</span> <span class="hljs-title">fa</span>-<span class="hljs-title">editor</span>" [<span class="hljs-title">routerLink</span>]="['../<span class="hljs-title">contacts</span>-<span class="hljs-title">detail</span>/'+ <span class="hljs-title">row</span>.<span class="hljs-title">instid</span>]"&gt;查看详情&lt;<span class="hljs-type">/a</span>&gt;</span>
    方法跳转：
    contactsCheck(value: any) {
    console.log(value);
    <span class="hljs-keyword">this</span>.router.navigate([<span class="hljs-string">'./contacts/contacts-detail'</span>, value.instid]);
}
    ----------------------
    
    直接获取id值
    <span class="hljs-keyword">this</span>.route.snapshot.params[<span class="hljs-string">"id"</span>]
 ```
 
     补助： 路由中的界面跳转
 ```
     <span class="hljs-keyword">import</span> {Router} from <span class="hljs-string">"@angular/router"</span>;
     
     <span class="hljs-keyword">constructor</span>(<span class="hljs-keyword">public</span> router: Router) {
     <span class="hljs-comment">// 相当于window.location.href，界面跳转</span>
         router.navigateByUrl(<span class="hljs-string">'home'</span>);
     }
 ``` 
 路由跳转默认以跟路由以为起点条状，如果想以当前路由为起点，设置路由跳转，添加如下内容
 ```
    <span class="hljs-keyword">import</span> {ActiveRouter, Router} from <span class="hljs-string">"router"</span>
    <span class="hljs-keyword">constructor</span>(<span class="hljs-keyword">public</span> acitveRouter: ActiveRouter; <span class="hljs-keyword">public</span> router: Router) {
}

     <span class="hljs-keyword">this</span>.router.navigate([<span class="hljs-string">'userList'</span>],{relativeTo: activeRouter}); 
    
    <span class="hljs-number">1.</span><span class="hljs-keyword">this</span>.router.navigate([<span class="hljs-string">'user'</span>, <span class="hljs-number">1</span>]); 
    以根路由为起点跳转
    <span class="hljs-number">2.</span><span class="hljs-keyword">this</span>.router.navigate([<span class="hljs-string">'user'</span>, <span class="hljs-number">1</span>],{relativeTo: activeRouter}); 
    默认值为根路由，设置后相对当前路由跳转，activeRouter是ActivatedRoute的实例，使用需要导入ActivatedRoute
    <span class="hljs-number">3.</span><span class="hljs-keyword">this</span>.router.navigate([<span class="hljs-string">'user'</span>, <span class="hljs-number">1</span>],{ queryParams: { id: <span class="hljs-number">1</span> } }); 
    路由中传参数 /user/<span class="hljs-number">1</span>?id=<span class="hljs-number">1</span>,查询参数，用于路由跳转，返回时候，带回去一些参数，搜索条件，分页，等等
    <span class="hljs-number">4.</span><span class="hljs-keyword">this</span>.router.navigate([<span class="hljs-string">'view'</span>, <span class="hljs-number">1</span>], { preserveQueryParams: <span class="hljs-literal">true</span> }); 
    默认值为<span class="hljs-literal">false</span>，设为<span class="hljs-literal">true</span>，保留之前路由中的查询参数/user?id=<span class="hljs-number">1</span> to /view?id=<span class="hljs-number">1</span>
    <span class="hljs-number">5.</span><span class="hljs-keyword">this</span>.router.navigate([<span class="hljs-string">'user'</span>, <span class="hljs-number">1</span>],{ fragment: <span class="hljs-string">'top'</span> }); 
    路由中锚点跳转 /user/<span class="hljs-number">1</span>#top
    <span class="hljs-number">6.</span><span class="hljs-keyword">this</span>.router.navigate([<span class="hljs-string">'/view'</span>], { preserveFragment: <span class="hljs-literal">true</span> }); 
    默认值为<span class="hljs-literal">false</span>，设为<span class="hljs-literal">true</span>，保留之前路由中的锚点/user/<span class="hljs-number">1</span>#top to /view#top
    <span class="hljs-number">7.</span><span class="hljs-keyword">this</span>.router.navigate([<span class="hljs-string">'/user'</span>,<span class="hljs-number">1</span>], { skipLocationChange: <span class="hljs-literal">true</span> }); 
    默认值为<span class="hljs-literal">false</span>，设为<span class="hljs-literal">true</span>路由跳转时浏览器中的url会保持不变，但是传入的参数依然有效
    <span class="hljs-number">8.</span><span class="hljs-keyword">this</span>.router.navigate([<span class="hljs-string">'/user'</span>,<span class="hljs-number">1</span>], { replaceUrl: <span class="hljs-literal">true</span> }); 
    未设置时默认为<span class="hljs-literal">true</span>，设置为<span class="hljs-literal">false</span>路由不会进行跳转
    二、router.navigate刷新页面问题
    造成这个问题一般是因为我们在&lt;form&gt;表单中使用&lt;button&gt;时忘记添加type属性，在表单中，如果忘记给按钮添加属性，会默认为submit
    ?
    <span class="hljs-number">1</span>
    &lt;button (click)=<span class="hljs-string">"toDetail()"</span>&gt;detail&lt;/button&gt;
    ?
    <span class="hljs-number">1</span>
    <span class="hljs-number">2</span>
    <span class="hljs-number">3</span>
    toDetail() {
     <span class="hljs-keyword">this</span>._router.navigate([<span class="hljs-string">'/detail'</span>]);
    }
    解决方法： 
    <span class="hljs-number">1.</span>添加type

    &lt;button type=<span class="hljs-string">"button"</span> (click)=<span class="hljs-string">"toDetail()"</span>&gt;detail&lt;/button&gt;
    <span class="hljs-number">2.</span>click添加<span class="hljs-literal">false</span>

    &lt;button (click)=<span class="hljs-string">"toDetail();false"</span>&gt;detail&lt;/button&gt;
 ```
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
angular2 ng2-router 路由，嵌套路由详解

## 原文链接
[https://segmentfault.com/a/1190000007682605](https://segmentfault.com/a/1190000007682605)

