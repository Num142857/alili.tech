---
title: 'Angular 2.x 从 0 到 1 (二）史上最简单的 Angular2 教程' 
date: 2019-01-27 2:30:59
hidden: true
slug: 43ak5cc9exx
categories: [reprint]
---

{{< raw >}}

                    
<p>第一节：<a href="https://segmentfault.com/a/1190000008213941">Angular 2.0 从0到1 （一）</a><br>第二节：<a href="https://segmentfault.com/a/1190000008213984" target="_blank">Angular 2.0 从0到1 （二）</a><br>第三节：<a href="https://segmentfault.com/a/1190000008242018">Angular 2.0 从0到1 （三）</a></p>
<h1 id="articleHeader0">第二节：用Form表单做一个登录控件</h1>
<h2 id="articleHeader1">对于login组件的小改造</h2>
<p>在 <code>hello-angular\src\app\login\login.component.ts</code> 中更改其模板为下面的样子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <div>
      <input type=&quot;text&quot;>
      <button>Login</button>
    </div>
  `,
  styles: []
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { Component, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

@Component({
  <span class="hljs-attr">selector</span>: <span class="hljs-string">'app-login'</span>,
  <span class="hljs-attr">template</span>: <span class="hljs-string">`
    &lt;div&gt;
      &lt;input type="text"&gt;
      &lt;button&gt;Login&lt;/button&gt;
    &lt;/div&gt;
  `</span>,
  <span class="hljs-attr">styles</span>: []
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LoginComponent</span> <span class="hljs-title">implements</span> <span class="hljs-title">OnInit</span> </span>{

  <span class="hljs-keyword">constructor</span>() { }

  ngOnInit() {
  }

}</code></pre>
<p>我们增加了一个文本输入框和一个按钮，保存后返回浏览器可以看到结果<br><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2016/12/26/8f0a5b809c418be8433a1d4848a46bf2.png" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2016/12/26/8f0a5b809c418be8433a1d4848a46bf2.png" alt="c2_s1_input_button_added.png-109.6kB" title="c2_s1_input_button_added.png-109.6kB" style="cursor: pointer;"></span><br>接下来我们尝试给Login按钮添加一个处理方法 <code>&lt;button (click)="onClick()"&gt;Login&lt;/button&gt;</code>。<code>(click)</code>表示我们要处理这个button的click事件，圆括号是说<strong>发生此事件时，调用等号后面的表达式或函数</strong>。等号后面的<code>onClick()</code>是我们自己定义在LoginComponent中的函数，这个名称你可以随便定成什么，不一定叫<code>onClick()</code>。下面我们就来定义这个函数，在LoginComponent中写一个叫<code>onClick()</code>的方法，内容很简单就是把“button was clicked”输出到Console。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  onClick() {
    console.log('button was clicked');
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  onClick() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'button was clicked'</span>);
  }</code></pre>
<p>返回浏览器，并按F12调出开发者工具。当你点击Login时，会发现Console窗口输出了我们期待的文字。<br><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2016/12/26/924a0e118d7d147a540af899de94b81d.png" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2016/12/26/924a0e118d7d147a540af899de94b81d.png" alt="c2_s1_handle_click_method.png-141kB" title="c2_s1_handle_click_method.png-141kB" style="cursor: pointer;"></span><br>那么如果要在onClick中传递一个参数，比如是上面的文本输入框输入的值怎么处理呢？我们可以在文本输入框标签内加一个#usernameRef，这个叫引用（reference）。注意这个<strong>引用是的input对象</strong>，我们如果想传递input的值，可以用<code>usernameRef.value</code>，然后就可以把<code>onClick()</code>方法改成<code>onClick(usernameRef.value)</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <input #usernameRef type=&quot;text&quot;>
  <button (click)=&quot;onClick(usernameRef.value)&quot;>Login</button>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;div&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> #<span class="hljs-attr">usernameRef</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">"onClick(usernameRef.value)"</span>&gt;</span>Login<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>在Component内部的onClick方法也要随之改写成一个接受username的方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  onClick(username) {
    console.log(username);
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  onClick(username) {
    <span class="hljs-built_in">console</span>.log(username);
  }</code></pre>
<p>现在我们再看看结果是什么样子，在文本输入框中键入“hello”，点击Login按钮，观察Console窗口：hello被输出了。<br><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2016/12/26/602aa9209c64943f26d9d2aa8f5cf57f.png" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2016/12/26/602aa9209c64943f26d9d2aa8f5cf57f.png" alt="c2_s1_input_button_ref.png-141.1kB" title="c2_s1_input_button_ref.png-141.1kB" style="cursor: pointer; display: inline;"></span><br>好了，现在我们再加一个密码输入框，然后改写onClick方法可以同时接收2个参数：用户名和密码。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <div>
      <input #usernameRef type=&quot;text&quot;>
      <input #passwordRef type=&quot;password&quot;>
      <button (click)=&quot;onClick(usernameRef.value, passwordRef.value)&quot;>Login</button>
    </div>
  `,
  styles: []
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onClick(username, password) {
    console.log('username:' + username + &quot;\n\r&quot; + &quot;password:&quot; + password);
  }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { Component, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

@Component({
  <span class="hljs-attr">selector</span>: <span class="hljs-string">'app-login'</span>,
  <span class="hljs-attr">template</span>: <span class="hljs-string">`
    &lt;div&gt;
      &lt;input #usernameRef type="text"&gt;
      &lt;input #passwordRef type="password"&gt;
      &lt;button (click)="onClick(usernameRef.value, passwordRef.value)"&gt;Login&lt;/button&gt;
    &lt;/div&gt;
  `</span>,
  <span class="hljs-attr">styles</span>: []
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LoginComponent</span> <span class="hljs-title">implements</span> <span class="hljs-title">OnInit</span> </span>{

  <span class="hljs-keyword">constructor</span>() { }

  ngOnInit() {
  }

  onClick(username, password) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'username:'</span> + username + <span class="hljs-string">"\n\r"</span> + <span class="hljs-string">"password:"</span> + password);
  }

}</code></pre>
<p>看看结果吧，在浏览器中第一个输入框输入“wang”，第二个输入框输入“1234567”，观察Console窗口，Bingo！<br><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2016/12/26/b7efcf6268635bc1c387cf85809d7602.png" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2016/12/26/b7efcf6268635bc1c387cf85809d7602.png" alt="c2_s1_username_password_ref.png-141.8kB" title="c2_s1_username_password_ref.png-141.8kB" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">建立一个服务去完成业务逻辑</h2>
<p>如果我们把登录的业务逻辑在onClick方法中完成，当然也可以，但是这样做的耦合性太强了。设想一下，如果我们增加了微信登录、微博登录等，业务逻辑会越来越复杂，显然我们需要把这个业务逻辑分离出去。那么我们接下来创建一个AuthService吧, 首先我们在srcapp下建立一个core的子文件夹（<code>src\app\core</code>）,然后命令行中输入 <code>ng g s core\auth</code> （s这里是service的缩写，coreauth是说在core的目录下建立auth服务相关文件）。<code>auth.service.ts</code>和<code>auth.service.spec.ts</code>这个两个文件应该已经出现在你的目录里了。</p>
<p>下面我们为这个service添加一个方法，你可能注意到这里我们为这个方法指定了返回类型和参数类型。这就是TypeScript带来的好处，有了类型约束，你在别处调用这个方法时，如果给出的参数类型或返回类型不正确，IDE就可以直接告诉你错了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  loginWithCredentials(username: string, password: string): boolean {
    if(username === 'wangpeng')
      return true;
    return false;
  }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { Injectable } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

@Injectable()
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AuthService</span> </span>{

  <span class="hljs-keyword">constructor</span>() { }

  loginWithCredentials(username: string, <span class="hljs-attr">password</span>: string): boolean {
    <span class="hljs-keyword">if</span>(username === <span class="hljs-string">'wangpeng'</span>)
      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }

}</code></pre>
<p>等一下，这个service虽然被创建了，但仍然无法在Component中使用。当然你可以在Component中import这个服务，然后实例化后使用，但是这样做并不好，仍然时一个紧耦合的模式，Angular2提供了一种依赖性注入（Dependency Injection）的方法。</p>
<h3 id="articleHeader3">什么是依赖性注入？</h3>
<p>如果不使用DI（依赖性注入）的时候，我们自然的想法是这样的，在<code>login.component.ts</code>中import引入AuthService，在构造中初始化service，在onClick中调用service。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, OnInit } from '@angular/core';
//引入AuthService
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div>
      <input #usernameRef type=&quot;text&quot;>
      <input #passwordRef type=&quot;password&quot;>
      <button (click)=&quot;onClick(usernameRef.value, passwordRef.value)&quot;>Login</button>
    </div>
  `,
  styles: []
})
export class LoginComponent implements OnInit {

  //声明成员变量，其类型为AuthService
  service: AuthService;

  constructor() {
    this.service = new AuthService();
  }

  ngOnInit() {
  }

  onClick(username, password) {
    //调用service的方法
    console.log('auth result is: ' + this.service.loginWithCredentials(username, password));
  }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { Component, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-comment">//引入AuthService</span>
<span class="hljs-keyword">import</span> { AuthService } <span class="hljs-keyword">from</span> <span class="hljs-string">'../core/auth.service'</span>;

@Component({
  <span class="hljs-attr">selector</span>: <span class="hljs-string">'app-login'</span>,
  <span class="hljs-attr">template</span>: <span class="hljs-string">`
    &lt;div&gt;
      &lt;input #usernameRef type="text"&gt;
      &lt;input #passwordRef type="password"&gt;
      &lt;button (click)="onClick(usernameRef.value, passwordRef.value)"&gt;Login&lt;/button&gt;
    &lt;/div&gt;
  `</span>,
  <span class="hljs-attr">styles</span>: []
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LoginComponent</span> <span class="hljs-title">implements</span> <span class="hljs-title">OnInit</span> </span>{

  <span class="hljs-comment">//声明成员变量，其类型为AuthService</span>
  service: AuthService;

  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.service = <span class="hljs-keyword">new</span> AuthService();
  }

  ngOnInit() {
  }

  onClick(username, password) {
    <span class="hljs-comment">//调用service的方法</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'auth result is: '</span> + <span class="hljs-keyword">this</span>.service.loginWithCredentials(username, password));
  }

}</code></pre>
<p>这么做呢也可以跑起来，但存在几个问题：</p>
<ul>
<li><p>由于实例化是在组件中进行的，意味着我们如果更改service的构造函数的话，组件也需要更改。</p></li>
<li><p>如果我们以后需要开发、测试和生产环境配置不同的AuthService，以这种方式实现会非常不方便。</p></li>
</ul>
<p>下面我们看看如果使用DI是什么样子的，首先我们需要在组件的修饰器中配置AuthService，然后在组件的构造函数中使用参数进行依赖注入。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div>
      <input #usernameRef type=&quot;text&quot;>
      <input #passwordRef type=&quot;password&quot;>
      <button (click)=&quot;onClick(usernameRef.value, passwordRef.value)&quot;>Login</button>
    </div>
  `,
  styles: [],
  //在providers中配置AuthService
  providers:[AuthService]
})
export class LoginComponent implements OnInit {
  //在构造函数中将AuthService示例注入到成员变量service中
  //而且我们不需要显式声明成员变量service了
  constructor(private service: AuthService) {
  }

  ngOnInit() {
  }

  onClick(username, password) {
    console.log('auth result is: ' + this.service.loginWithCredentials(username, password));
  }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { Component, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { AuthService } <span class="hljs-keyword">from</span> <span class="hljs-string">'../core/auth.service'</span>;

@Component({
  <span class="hljs-attr">selector</span>: <span class="hljs-string">'app-login'</span>,
  <span class="hljs-attr">template</span>: <span class="hljs-string">`
    &lt;div&gt;
      &lt;input #usernameRef type="text"&gt;
      &lt;input #passwordRef type="password"&gt;
      &lt;button (click)="onClick(usernameRef.value, passwordRef.value)"&gt;Login&lt;/button&gt;
    &lt;/div&gt;
  `</span>,
  <span class="hljs-attr">styles</span>: [],
  <span class="hljs-comment">//在providers中配置AuthService</span>
  providers:[AuthService]
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LoginComponent</span> <span class="hljs-title">implements</span> <span class="hljs-title">OnInit</span> </span>{
  <span class="hljs-comment">//在构造函数中将AuthService示例注入到成员变量service中</span>
  <span class="hljs-comment">//而且我们不需要显式声明成员变量service了</span>
  <span class="hljs-keyword">constructor</span>(private service: AuthService) {
  }

  ngOnInit() {
  }

  onClick(username, password) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'auth result is: '</span> + <span class="hljs-keyword">this</span>.service.loginWithCredentials(username, password));
  }

}</code></pre>
<p>看到这里你会发现我们仍然需要import相关的服务，这是import是要将类型引入进来，而provider里面会配置这个类型的实例。当然即使这样还是不太爽，可不可以不引入AuthService呢？答案是可以。</p>
<p>我们看一下<code>app.module.ts</code>，这个根模块文件中我们发现也有个providers，根模块中的这个providers是配置在模块中全局可用的service或参数的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="providers: [
    {provide: 'auth',  useClass: AuthService}
    ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">providers: [
    {<span class="hljs-attr">provide</span>: <span class="hljs-string">'auth'</span>,  <span class="hljs-attr">useClass</span>: AuthService}
    ]</code></pre>
<p>providers是一个数组，这个数组呢其实是把你想要注入到其他组件中的服务配置在这里。大家注意到我们这里的写法和上面优点区别，没有直接写成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="providers:[AuthService]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">providers:[AuthService]</code></pre>
<p>而是给出了一个对象，里面有两个属性，provide和useClass，provide定义了这个服务的名称，有需要注入这个服务的就引用这个名称就好。useClass指明这个名称对应的服务是一个类，本例中就是AuthService了。这样定义好之后，我们就可以在任意组件中注入这个依赖了。下面我们改动一下<code>login.component.ts</code>，去掉头部的<code>import { AuthService } from '../core/auth.service';</code>和组件修饰器中的providers，更改其构造函数为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onstructor(@Inject('auth') private service) {
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">onstructor(@Inject(<span class="hljs-string">'auth'</span>) private service) {
  }</code></pre>
<p>我们去掉了service的类型声明，但加了一个修饰符<code>@Inject('auth')</code>，这个修饰符的意思是请到系统配置中找到名称为<code>auth</code>的那个依赖注入到我修饰的变量中。当然这样改完后你会发现<code>Inject</code>这个修饰符系统不识别，我们需要在<code>@angular/core</code>中引用这个修饰符，现在<code>login.component.ts</code>看起来应该是下面这个样子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <div>
      <input #usernameRef type=&quot;text&quot;>
      <input #passwordRef type=&quot;password&quot;>
      <button (click)=&quot;onClick(usernameRef.value, passwordRef.value)&quot;>Login</button>
    </div>
  `,
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(@Inject('auth') private service) {
  }

  ngOnInit() {
  }

  onClick(username, password) {
    console.log('auth result is: ' + this.service.loginWithCredentials(username, password));
  }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { Component, OnInit, Inject } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

@Component({
  <span class="hljs-attr">selector</span>: <span class="hljs-string">'app-login'</span>,
  <span class="hljs-attr">template</span>: <span class="hljs-string">`
    &lt;div&gt;
      &lt;input #usernameRef type="text"&gt;
      &lt;input #passwordRef type="password"&gt;
      &lt;button (click)="onClick(usernameRef.value, passwordRef.value)"&gt;Login&lt;/button&gt;
    &lt;/div&gt;
  `</span>,
  <span class="hljs-attr">styles</span>: []
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LoginComponent</span> <span class="hljs-title">implements</span> <span class="hljs-title">OnInit</span> </span>{

  <span class="hljs-keyword">constructor</span>(@Inject('auth') private service) {
  }

  ngOnInit() {
  }

  onClick(username, password) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'auth result is: '</span> + <span class="hljs-keyword">this</span>.service.loginWithCredentials(username, password));
  }

}</code></pre>
<h2 id="articleHeader4">双向数据绑定</h2>
<p>接下来的问题是我们是否只能通过这种方式进行表现层和逻辑之间的数据交换呢？如果我们希望在组件内对数据进行操作后再反馈到界面怎么处理呢？Angular2提供了一个双向数据绑定的机制。这个机制是这样的，在组件中提供成员数据变量，然后在模板中引用这个数据变量。我们来改造一下<code>login.component.ts</code>，首先在class中声明2个数据变量username和password。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  username = &quot;&quot;;
  password = &quot;&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  username = <span class="hljs-string">""</span>;
  password = <span class="hljs-string">""</span>;</code></pre>
<p>然后去掉<code>onClick</code>方法的参数，并将内部的语句改造成如下样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('auth result is: '
      + this.service.loginWithCredentials(this.username, this.password));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'auth result is: '</span>
      + <span class="hljs-keyword">this</span>.service.loginWithCredentials(<span class="hljs-keyword">this</span>.username, <span class="hljs-keyword">this</span>.password));</code></pre>
<p>去掉参数的原因是双向绑定后，我们通过数据成员变量就可以知道用户名和密码了，不需要在传递参数了。而成员变量的引用方式是<code>this.成员变量</code>。<br>然后我们来改造模板：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div>
      <input type=&quot;text&quot;
        [(ngModel)]=&quot;username&quot;
        />
      <input type=&quot;password&quot;
        [(ngModel)]=&quot;password&quot;
        />
      <button (click)=&quot;onClick()&quot;>Login</button>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>
        [(<span class="hljs-attr">ngModel</span>)]=<span class="hljs-string">"username"</span>
        /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span>
        [(<span class="hljs-attr">ngModel</span>)]=<span class="hljs-string">"password"</span>
        /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">"onClick()"</span>&gt;</span>Login<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><code>[(ngModel)]="username"</code>这个看起来很别扭，稍微解释一下，方括号[]的作用是说把等号后面当成表达式来解析而不是当成字符串，如果我们去掉方括号那就等于说是直接给这个ngModel赋值成“username”这个字符串了。方括号的含义是单向绑定，就是说我们在组件中给model赋的值会设置到HTML的input控件中。<code>[()]</code>是双向绑定的意思，就是说HTML对应控件的状态的改变会反射设置到组件的model中。ngModel是FormModule中提供的指令，它负责从Domain Model（这里就是username或password，以后我们可用绑定更复杂的对象）中创建一个FormControl的实例，并将这个实例和表单的控件绑定起来。同样的对于click事件的处理，我们不需要传入参数了，因为其调用的是刚刚我们改造的组件中的onClick方法。现在我们保存文件后打开浏览器看一下，效果和上一节的应该一样的。本节的完整代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//login.component.ts
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <div>
      <input type=&quot;text&quot;
        [(ngModel)]=&quot;username&quot;
        />
      <input type=&quot;password&quot;
        [(ngModel)]=&quot;password&quot;
        />
      <button (click)=&quot;onClick()&quot;>Login</button>
    </div>
  `,
  styles: []
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  constructor(@Inject('auth') private service) {
  }

  ngOnInit() {
  }

  onClick() {
    console.log('auth result is: '
      + this.service.loginWithCredentials(this.username, this.password));
  }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//login.component.ts</span>
<span class="hljs-keyword">import</span> { Component, OnInit, Inject } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

@Component({
  <span class="hljs-attr">selector</span>: <span class="hljs-string">'app-login'</span>,
  <span class="hljs-attr">template</span>: <span class="hljs-string">`
    &lt;div&gt;
      &lt;input type="text"
        [(ngModel)]="username"
        /&gt;
      &lt;input type="password"
        [(ngModel)]="password"
        /&gt;
      &lt;button (click)="onClick()"&gt;Login&lt;/button&gt;
    &lt;/div&gt;
  `</span>,
  <span class="hljs-attr">styles</span>: []
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LoginComponent</span> <span class="hljs-title">implements</span> <span class="hljs-title">OnInit</span> </span>{

  username = <span class="hljs-string">''</span>;
  password = <span class="hljs-string">''</span>;

  <span class="hljs-keyword">constructor</span>(@Inject('auth') private service) {
  }

  ngOnInit() {
  }

  onClick() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'auth result is: '</span>
      + <span class="hljs-keyword">this</span>.service.loginWithCredentials(<span class="hljs-keyword">this</span>.username, <span class="hljs-keyword">this</span>.password));
  }

}</code></pre>
<h2 id="articleHeader5">表单数据的验证</h2>
<p>通常情况下，表单的数据是有一定的规则的，我们需要依照其规则对输入的数据做验证以及反馈验证结果。Angular2中对表单验证有非常完善的支持，我们继续上面的例子，在<code>login</code>组件中，我们定义了一个用户名和密码的输入框，现在我们来为它们加上规则。首先我们定义一下规则，用户名和密码都是必须输入的，也就是不能为空。更改<code>login.component.ts</code>中的模板为下面的样子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div>
      <input required type=&quot;text&quot;
        [(ngModel)]=&quot;username&quot;
        #usernameRef=&quot;ngModel&quot;
        />
        "{{"usernameRef.valid"}}"
      <input required type=&quot;password&quot;
        [(ngModel)]=&quot;password&quot;
        #passwordRef=&quot;ngModel&quot;
        />
        "{{"passwordRef.valid"}}"
      <button (click)=&quot;onClick()&quot;>Login</button>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">required</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>
        [(<span class="hljs-attr">ngModel</span>)]=<span class="hljs-string">"username"</span>
        #<span class="hljs-attr">usernameRef</span>=<span class="hljs-string">"ngModel"</span>
        /&gt;</span>
        "{{"usernameRef.valid"}}"
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">required</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span>
        [(<span class="hljs-attr">ngModel</span>)]=<span class="hljs-string">"password"</span>
        #<span class="hljs-attr">passwordRef</span>=<span class="hljs-string">"ngModel"</span>
        /&gt;</span>
        "{{"passwordRef.valid"}}"
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">"onClick()"</span>&gt;</span>Login<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>注意到我们只是为username和password两个控件加上了required这个属性，表明这两个控件为必填项。通过<code>#usernameRef="ngModel"</code>我们重新又加入了引用，这次的引用指向了ngModel，这个引用是要在模板中使用的，所以才加入这个引用如果不需要在模板中使用，可以不要这句。<code>"{{"表达式"}}"</code>双花括号表示解析括号中的表达式，并把这个值输出到模板中。这里我们为了可以显性的看到控件的验证状态，直接在对应控件后输出了验证的状态。初始状态可以看到2个控件的验证状态都是false，试着填写一些字符在两个输入框中，看看状态变化吧。<br><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2016/12/26/af41f156d4858f5151c53c90c0f7717b.png" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2016/12/26/af41f156d4858f5151c53c90c0f7717b.png" alt="c2_s2_form_validation.png-8.5kB" title="c2_s2_form_validation.png-8.5kB" style="cursor: pointer;"></span></p>
<p>我们是知道了验证的状态是什么，但是如果我们想知道验证失败的原因怎么办呢？我们只需要将<code>"{{"usernameRef.valid"}}"</code>替换成<code>"{{"usernameRef.errors | json"}}"</code>。<code>|</code>是管道操作符，用于将前面的结果通过管道输出成另一种格式，这里就是把errors对象输出成json格式的意思。看一下结果吧，返回的结果如下<br><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2016/12/26/254f4435d53e2422af4acd03c8bb5c69.png" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2016/12/26/254f4435d53e2422af4acd03c8bb5c69.png" alt="c2_s2_form_validation_errors.png-11kB" title="c2_s2_form_validation_errors.png-11kB" style="cursor: pointer;"></span><br>如果除了不能为空，我们为username再添加一个规则试试看呢，比如字符数不能少于3。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      <input type=&quot;text&quot;
        [(ngModel)]=&quot;username&quot;
        #usernameRef=&quot;ngModel&quot;
        required 
        minlength=&quot;3&quot;
        />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>
        [(<span class="hljs-attr">ngModel</span>)]=<span class="hljs-string">"username"</span>
        #<span class="hljs-attr">usernameRef</span>=<span class="hljs-string">"ngModel"</span>
        <span class="hljs-attr">required</span> 
        <span class="hljs-attr">minlength</span>=<span class="hljs-string">"3"</span>
        /&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2016/12/26/0655d1b4c93f6fcd88f811d185251f2b.png" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2016/12/26/0655d1b4c93f6fcd88f811d185251f2b.png" alt="c2_s2_form_validation_errors_multiple.png-14.4kB" title="c2_s2_form_validation_errors_multiple.png-14.4kB" style="cursor: pointer;"></span><br>现在我们试着把<code>"{{"表达式"}}"</code>替换成友好的错误提示，我们想在有错误发生时显示错误的提示信息。那么我们来改造一下template。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div>
      <input type=&quot;text&quot;
        [(ngModel)]=&quot;username&quot;
        #usernameRef=&quot;ngModel&quot;
        required
        minlength=&quot;3&quot;
        />
        "{{" usernameRef.errors | json "}}"
        <div *ngIf=&quot;usernameRef.errors?.required&quot;>this is required</div>
        <div *ngIf=&quot;usernameRef.errors?.minlength&quot;>should be at least 3 charactors</div>
      <input required type=&quot;password&quot;
        [(ngModel)]=&quot;password&quot;
        #passwordRef=&quot;ngModel&quot;
        />
        <div *ngIf=&quot;passwordRef.errors?.required&quot;>this is required</div>
      <button (click)=&quot;onClick()&quot;>Login</button>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>
        [(<span class="hljs-attr">ngModel</span>)]=<span class="hljs-string">"username"</span>
        #<span class="hljs-attr">usernameRef</span>=<span class="hljs-string">"ngModel"</span>
        <span class="hljs-attr">required</span>
        <span class="hljs-attr">minlength</span>=<span class="hljs-string">"3"</span>
        /&gt;</span>
        "{{" usernameRef.errors | json "}}"
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"usernameRef.errors?.required"</span>&gt;</span>this is required<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"usernameRef.errors?.minlength"</span>&gt;</span>should be at least 3 charactors<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">required</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span>
        [(<span class="hljs-attr">ngModel</span>)]=<span class="hljs-string">"password"</span>
        #<span class="hljs-attr">passwordRef</span>=<span class="hljs-string">"ngModel"</span>
        /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"passwordRef.errors?.required"</span>&gt;</span>this is required<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">"onClick()"</span>&gt;</span>Login<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><code>ngIf</code>也是一个Angular2的指令，顾名思义，是用于做条件判断的。<code>*ngIf="usernameRef.errors?.required"</code>的意思是当<code>usernameRef.errors.required</code>为<code>true</code>时显示<code>div</code>标签。那么那个<code>?</code>是干嘛的呢？因为<code>errors</code>可能是个null，如果这个时候调用<code>errors</code>的<code>required</code>属性肯定会引发异常，那么<code>?</code>就是标明<code>errors</code>可能为空，在其为空时就不用调用后面的属性了。</p>
<p>如果我们把用户名和密码整个看成一个表单的话，我们应该把它们放在一对<code>&lt;form&gt;&lt;/form&gt;</code>标签中，类似的加入一个表单的引用<code>formRef</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div>
      <form #formRef=&quot;ngForm&quot;>
        <input type=&quot;text&quot;
          [(ngModel)]=&quot;username&quot;
          #usernameRef=&quot;ngModel&quot;
          required
          minlength=&quot;3&quot;
          />
          <div *ngIf=&quot;usernameRef.errors?.required&quot;>this is required</div>
          <div *ngIf=&quot;usernameRef.errors?.minlength&quot;>should be at least 3 charactors</div>
        <input type=&quot;password&quot;
          [(ngModel)]=&quot;password&quot;
          #passwordRef=&quot;ngModel&quot;
          required
          />
          <div *ngIf=&quot;passwordRef.errors?.required&quot;>this is required</div>
        <button (click)=&quot;onClick()&quot;>Login</button>
      </form>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">form</span> #<span class="hljs-attr">formRef</span>=<span class="hljs-string">"ngForm"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>
          [(<span class="hljs-attr">ngModel</span>)]=<span class="hljs-string">"username"</span>
          #<span class="hljs-attr">usernameRef</span>=<span class="hljs-string">"ngModel"</span>
          <span class="hljs-attr">required</span>
          <span class="hljs-attr">minlength</span>=<span class="hljs-string">"3"</span>
          /&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"usernameRef.errors?.required"</span>&gt;</span>this is required<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"usernameRef.errors?.minlength"</span>&gt;</span>should be at least 3 charactors<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span>
          [(<span class="hljs-attr">ngModel</span>)]=<span class="hljs-string">"password"</span>
          #<span class="hljs-attr">passwordRef</span>=<span class="hljs-string">"ngModel"</span>
          <span class="hljs-attr">required</span>
          /&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"passwordRef.errors?.required"</span>&gt;</span>this is required<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">"onClick()"</span>&gt;</span>Login<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>这时运行后会发现原本好用的代码出错了，这是由于如果在一个大的表单中，ngModel会注册成Form的一个子控件，注册子控件需要一个name，这要求我们显式的指定对应控件的name，因此我们需要为<code>input</code>增加name属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div>
      <form #formRef=&quot;ngForm&quot;>
        <input type=&quot;text&quot;
          name=&quot;username&quot;
          [(ngModel)]=&quot;username&quot;
          #usernameRef=&quot;ngModel&quot;
          required
          minlength=&quot;3&quot;
          />
          <div *ngIf=&quot;usernameRef.errors?.required&quot;>this is required</div>
          <div *ngIf=&quot;usernameRef.errors?.minlength&quot;>should be at least 3 charactors</div>
        <input type=&quot;password&quot;
          name=&quot;password&quot;
          [(ngModel)]=&quot;password&quot;
          #passwordRef=&quot;ngModel&quot;
          required
          />
          <div *ngIf=&quot;passwordRef.errors?.required&quot;>this is required</div>
        <button (click)=&quot;onClick()&quot;>Login</button>
        <button type=&quot;submit&quot;>Submit</button>
      </form>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">form</span> #<span class="hljs-attr">formRef</span>=<span class="hljs-string">"ngForm"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>
          <span class="hljs-attr">name</span>=<span class="hljs-string">"username"</span>
          [(<span class="hljs-attr">ngModel</span>)]=<span class="hljs-string">"username"</span>
          #<span class="hljs-attr">usernameRef</span>=<span class="hljs-string">"ngModel"</span>
          <span class="hljs-attr">required</span>
          <span class="hljs-attr">minlength</span>=<span class="hljs-string">"3"</span>
          /&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"usernameRef.errors?.required"</span>&gt;</span>this is required<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"usernameRef.errors?.minlength"</span>&gt;</span>should be at least 3 charactors<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span>
          <span class="hljs-attr">name</span>=<span class="hljs-string">"password"</span>
          [(<span class="hljs-attr">ngModel</span>)]=<span class="hljs-string">"password"</span>
          #<span class="hljs-attr">passwordRef</span>=<span class="hljs-string">"ngModel"</span>
          <span class="hljs-attr">required</span>
          /&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"passwordRef.errors?.required"</span>&gt;</span>this is required<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">"onClick()"</span>&gt;</span>Login<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"submit"</span>&gt;</span>Submit<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>既然我们增加了一个<code>formRef</code>，我们就看看<code>formRef.value</code>有什么吧。<br>首先为form增加一个表单提交事件的处理<br><code>&lt;form #formRef="ngForm" (ngSubmit)="onSubmit(formRef.value)"&gt;</code>。<br>然后在组件中增加一个<code>onSubmit</code>方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  onSubmit(formValue) {
    console.log(formValue);
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  onSubmit(formValue) {
    <span class="hljs-built_in">console</span>.log(formValue);
  }</code></pre>
<p>你会发现<code>formRef.value</code>中包括了表单所有填写项的值。<br><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2016/12/26/5e041cda0ecc07e8c05990ca135741c7.png" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2016/12/26/5e041cda0ecc07e8c05990ca135741c7.png" alt="c2_s2_form_validation_form_submit.png-27.7kB" title="c2_s2_form_validation_form_submit.png-27.7kB" style="cursor: pointer;"></span><br>有时候在表单项过多时我们需要对表单项进行分组，HTML中提供了<code>fieldset</code>标签用来处理。那么我们看看怎么和Angular2结合吧：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div>
      <form #formRef=&quot;ngForm&quot; (ngSubmit)=&quot;onSubmit(formRef.value)&quot;>
        <fieldset ngModelGroup=&quot;login&quot;>
          <input type=&quot;text&quot;
            name=&quot;username&quot;
            [(ngModel)]=&quot;username&quot;
            #usernameRef=&quot;ngModel&quot;
            required
            minlength=&quot;3&quot;
            />
            <div *ngIf=&quot;usernameRef.errors?.required&quot;>this is required</div>
            <div *ngIf=&quot;usernameRef.errors?.minlength&quot;>should be at least 3 charactors</div>
          <input type=&quot;password&quot;
            name=&quot;password&quot;
            [(ngModel)]=&quot;password&quot;
            #passwordRef=&quot;ngModel&quot;
            required
            />
            <div *ngIf=&quot;passwordRef.errors?.required&quot;>this is required</div>
          <button (click)=&quot;onClick()&quot;>Login</button>
          <button type=&quot;submit&quot;>Submit</button>
        </fieldset>
      </form>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">form</span> #<span class="hljs-attr">formRef</span>=<span class="hljs-string">"ngForm"</span> (<span class="hljs-attr">ngSubmit</span>)=<span class="hljs-string">"onSubmit(formRef.value)"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">fieldset</span> <span class="hljs-attr">ngModelGroup</span>=<span class="hljs-string">"login"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>
            <span class="hljs-attr">name</span>=<span class="hljs-string">"username"</span>
            [(<span class="hljs-attr">ngModel</span>)]=<span class="hljs-string">"username"</span>
            #<span class="hljs-attr">usernameRef</span>=<span class="hljs-string">"ngModel"</span>
            <span class="hljs-attr">required</span>
            <span class="hljs-attr">minlength</span>=<span class="hljs-string">"3"</span>
            /&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"usernameRef.errors?.required"</span>&gt;</span>this is required<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"usernameRef.errors?.minlength"</span>&gt;</span>should be at least 3 charactors<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span>
            <span class="hljs-attr">name</span>=<span class="hljs-string">"password"</span>
            [(<span class="hljs-attr">ngModel</span>)]=<span class="hljs-string">"password"</span>
            #<span class="hljs-attr">passwordRef</span>=<span class="hljs-string">"ngModel"</span>
            <span class="hljs-attr">required</span>
            /&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"passwordRef.errors?.required"</span>&gt;</span>this is required<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">"onClick()"</span>&gt;</span>Login<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"submit"</span>&gt;</span>Submit<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">fieldset</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><code>&lt;fieldset ngModelGroup="login"&gt;</code>意味着我们对于fieldset之内的数据都分组到了<code>login</code>对象中。<br><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2016/12/26/f3e528074fb5a2d2351b24ee91a51a2d.png" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2016/12/26/f3e528074fb5a2d2351b24ee91a51a2d.png" alt="c2_s2_form_validation_fieldset.png-43.5kB" title="c2_s2_form_validation_fieldset.png-43.5kB" style="cursor: pointer;"></span><br>接下来我们改写onSubmit方法用来替代onClick，因为看起来这两个按钮重复了，我们需要去掉onClick。首先去掉template中的<code>&lt;button (click)="onClick()"&gt;Login&lt;/button&gt;</code>，然后把<code>&lt;button type="submit"&gt;</code>标签后的<code>Submit</code>文本替换成<code>Login</code>，最后改写onSubmit方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  onSubmit(formValue) {
    console.log('auth result is: '
      + this.service.loginWithCredentials(formValue.login.username, formValue.login.password));
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  onSubmit(formValue) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'auth result is: '</span>
      + <span class="hljs-keyword">this</span>.service.loginWithCredentials(formValue.login.username, formValue.login.password));
  }</code></pre>
<p>在浏览器中试验一下吧，所有功能正常工作。</p>
<h2 id="articleHeader6">验证结果的样式自定义</h2>
<p>如果我们在开发工具中查看网页源码，可以看到<br><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2016/12/26/153621d1c8024a02a9440ce4025f2e13.png" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2016/12/26/153621d1c8024a02a9440ce4025f2e13.png" alt="c2_s2_form_validation_form_styling.png-92.5kB" title="c2_s2_form_validation_form_styling.png-92.5kB" style="cursor: pointer;"></span><br>用户名控件的HTML代码是下面的样子：在验证结果为false时input的样式是<code>ng-invalid</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input 
    name=&quot;username&quot; 
    class=&quot;ng-pristine ng-invalid ng-touched&quot; 
    required=&quot;&quot; 
    type=&quot;text&quot; 
    minlength=&quot;3&quot; 
    ng-reflect-minlength=&quot;3&quot; 
    ng-reflect-name=&quot;username&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> 
    <span class="hljs-attr">name</span>=<span class="hljs-string">"username"</span> 
    <span class="hljs-attr">class</span>=<span class="hljs-string">"ng-pristine ng-invalid ng-touched"</span> 
    <span class="hljs-attr">required</span>=<span class="hljs-string">""</span> 
    <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> 
    <span class="hljs-attr">minlength</span>=<span class="hljs-string">"3"</span> 
    <span class="hljs-attr">ng-reflect-minlength</span>=<span class="hljs-string">"3"</span> 
    <span class="hljs-attr">ng-reflect-name</span>=<span class="hljs-string">"username"</span>&gt;</span></code></pre>
<p>类似的可以实验一下，填入一些字符满足验证要求之后，看input的HTML是下面的样子：在验证结果为true时input的样式是<code>ng-valid</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input 
    name=&quot;username&quot; 
    class=&quot;ng-touched ng-dirty ng-valid&quot; 
    required=&quot;&quot; 
    type=&quot;text&quot; 
    ng-reflect-model=&quot;ssdsds&quot; 
    minlength=&quot;3&quot; 
    ng-reflect-minlength=&quot;3&quot; 
    ng-reflect-name=&quot;username&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> 
    <span class="hljs-attr">name</span>=<span class="hljs-string">"username"</span> 
    <span class="hljs-attr">class</span>=<span class="hljs-string">"ng-touched ng-dirty ng-valid"</span> 
    <span class="hljs-attr">required</span>=<span class="hljs-string">""</span> 
    <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> 
    <span class="hljs-attr">ng-reflect-model</span>=<span class="hljs-string">"ssdsds"</span> 
    <span class="hljs-attr">minlength</span>=<span class="hljs-string">"3"</span> 
    <span class="hljs-attr">ng-reflect-minlength</span>=<span class="hljs-string">"3"</span> 
    <span class="hljs-attr">ng-reflect-name</span>=<span class="hljs-string">"username"</span>&gt;</span></code></pre>
<p>知道这个后，我们可以自定义不同验证状态下的控件样式。在组件的修饰符中把styles数组改写一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  styles: [`
    .ng-invalid{
      border: 3px solid red;
    }
    .ng-valid{
      border: 3px solid green;
    }
  `]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  styles: [<span class="hljs-string">`
    .ng-invalid{
      border: 3px solid red;
    }
    .ng-valid{
      border: 3px solid green;
    }
  `</span>]</code></pre>
<p>保存一下，返回浏览器可以看到，验证不通过时<br><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2016/12/26/faa2ea3d5e68f788bbfaedddb301a071.png" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2016/12/26/faa2ea3d5e68f788bbfaedddb301a071.png" alt="c2_s2_form_validation_style_fail.png-8.9kB" title="c2_s2_form_validation_style_fail.png-8.9kB" style="cursor: pointer;"></span><br>验证通过时是这样的：<br><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2016/12/26/881b8e497413bf10ba3a14399ba85ae8.png" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2016/12/26/881b8e497413bf10ba3a14399ba85ae8.png" alt="c2_s2_form_validation_style_pass.png-4.6kB" title="c2_s2_form_validation_style_pass.png-4.6kB" style="cursor: pointer;"></span></p>
<p>最后说一下，我们看到这样设置完样式后连form和fieldset都一起设置了，这是由于form和fieldset也在样式中应用了<code>.ng-valid</code>和<code>.ng-valid</code>，那怎么解决呢？只需要在<code>.ng-valid</code>加上<code>input</code>即可，它表明的是应用于input类型控件并且class引用了ng-invalid的元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  styles: [`
    input.ng-invalid{
      border: 3px solid red;
    }
    input.ng-valid{
      border: 3px solid green;
    }
  `]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  styles: [<span class="hljs-string">`
    input.ng-invalid{
      border: 3px solid red;
    }
    input.ng-valid{
      border: 3px solid green;
    }
  `</span>]</code></pre>
<p>很多开发人员不太了解CSS，其实CSS还是比较简单的，我建议先从Selector开始看，Selector的概念弄懂后Angular2的开发CSS就会顺畅很多。具体可见<a href="http://www.w3schools.com/cssref/css_selectors.asp" rel="nofollow noreferrer" target="_blank">W3School中对于CSS Selctor的参考</a>和<a href="https://css-tricks.com/multiple-class-id-selectors/" rel="nofollow noreferrer" target="_blank">https://css-tricks.com/multip...</a>。</p>
<p>本节代码： <a href="https://github.com/wpcfan/awesome-tutorials/tree/chap02/angular2/ng2-tut" rel="nofollow noreferrer" target="_blank">https://github.com/wpcfan/awe...</a></p>
<h2 id="articleHeader7">进一步的练习</h2>
<ul>
<li><p>练习1：如果我们想给username和password输入框设置默认值。比如“请输入用户名”和“请输入密码”，自己动手试一下吧。</p></li>
<li><p>练习2：如果我们想在输入框聚焦时把默认文字清除掉，该怎么做？</p></li>
<li><p>练习3：如果我们想把默认文字颜色设置成浅灰色该怎么做？</p></li>
</ul>
<p>第一节：<a href="http://www.jianshu.com/p/9af9f203e0b1" rel="nofollow noreferrer" target="_blank">Angular 2.0 从0到1 （一）</a><br>第二节：<a href="http://www.jianshu.com/p/22e035e82c36" rel="nofollow noreferrer" target="_blank">Angular 2.0 从0到1 （二）</a><br>第三节：<a href="http://www.jianshu.com/p/86c6249a2069" rel="nofollow noreferrer" target="_blank">Angular 2.0 从0到1 （三）</a><br>第四节：<a href="http://www.jianshu.com/p/e7dc5d111667" rel="nofollow noreferrer" target="_blank">Angular 2.0 从0到1 （四）</a><br>第五节：<a href="http://www.jianshu.com/p/e0b8ac701a62" rel="nofollow noreferrer" target="_blank">Angular 2.0 从0到1 （五）</a><br>第六节：<a href="http://www.jianshu.com/p/cb1d2474c899" rel="nofollow noreferrer" target="_blank">Angular 2.0 从0到1 （六）</a><br>第七节：<a href="http://www.jianshu.com/p/8d0d571def48" rel="nofollow noreferrer" target="_blank">Angular 2.0 从0到1 （七）</a><br>第八节：<a href="http://www.jianshu.com/p/869a3f74d3ca" rel="nofollow noreferrer" target="_blank">Angular 2.0 从0到1 （八）</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular 2.x 从 0 到 1 (二）史上最简单的 Angular2 教程

## 原文链接
[https://segmentfault.com/a/1190000008213984](https://segmentfault.com/a/1190000008213984)

