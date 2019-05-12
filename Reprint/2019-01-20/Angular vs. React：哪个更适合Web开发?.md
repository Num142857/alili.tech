---
title: 'Angular vs. React：哪个更适合Web开发?' 
date: 2019-01-20 2:30:11
hidden: true
slug: hsrdqx00qrt
categories: [reprint]
---

{{< raw >}}

            <h2>已经有数不尽的文章讨论React和Angular哪个更适合网站开发。那我为什么写这一篇文章呢？</h2>
<p>写这篇文章，是因为虽然已有的文章都含有很棒的观点，但没有一篇足够深入地为前端开发者评判哪一款可能满足他们的需求。</p>
<p>在这篇文章里，你将了解：
Angular和React是怎么通过不同的方案来解决相似的前端问题的？
选择Angular或React是否仅仅只是个人喜好问题？ 
为了对比它们，我们分别用Angular和React构建同一个应用。</p>
<h3>Angular的事先声明</h3>
<p>两年前，我写了一篇关于<a href="https://www.toptal.com/react/navigating-the-react-ecosystem">React生态系统</a>的文章。该文章表述，Angular已经成为了“事先宣布死亡”的受害者。那些不希望自己的项目搭建在过时框架上的人，选择Angular或还是其他任何框架，是很容易的。那时，Angular1已经过时，而Angular2处于 alpha版本，甚至都不可用。</p>
<p>事后看来，这些担心或多或少是有道理的。Angular2发生了戏剧性地变化，甚至在最终发布之前进行了重大改写。</p>
<p>两年后，我们有了Angular4，并且Google承诺从Angular4起相对稳定。</p>
<p>接下来，我们对比Angular和React。</p>
<h3>Angular vs. React：比较苹果和橘子</h3>
<p>有些人说比较React和Angular就像比较苹果和橘子。一个是处理视觉层的库，另一个是完整的框架。</p>
<p>当然，多数<a href="https://www.toptal.com/react">React开发人员</a>会添加一些库将React转化为完整的框架。然而，这个React堆栈的工作流与Angular的工作流是非常不同的，所以可比性仍然是有限的。</p>
<p>Angular和React最大的区别在于状态管理。Angular与数据绑定捆绑在一起，而React通常使用redux增强自己，提供单向数据流并处理不可变的数据。这两方法本身就是对立的，现在仍有数不尽的争论在进行：哪一种方案更优。</p>
<h3>公平的竞争环境</h3>
<p>由于React是很容易上手，出于比较的目的，我决定，先建立一个React应用，再改写成一个Angular应用，以便我们能并行地比较代码片段。</p>
<p>Angular内置添加一些突出的特征，但React没有：</p>
<p>依赖注入（DI）
计算属性
rxjs
基于组件的路由
Material design UI框架
组件范畴样式
表单校验
项目生成器</p>
<h3>数据绑定</h3>
<p>一个有争议的观点：比起单向绑定，双向数据绑定使开发更容易。当然，也可能完全相反，比如React搭配Redux或mobx-state-tree，Angular搭配ngrx。但这需要另写一篇文章来讨论了。</p>
<h3>计算属性</h3>
<p>在视图层上，Angular的每次渲染都调用getter方法，属性计算极其简单。Rxjs的BehaviorSubject对象可以做这项任务。</p>
<p>在React生态中，Mobx的@computed装饰器，可以不改变对象的引用，可能是更好的API。</p>
<h3>依赖注入</h3>
<p>依赖注入是具有争议的特征，它违背了当前响应式范式的函数式编程和不可改变性。事实证明，某种依赖注入在数据绑定环境中几乎是不可或缺的。因为没有单独的数据层架构，它有助于解耦（和模拟数据与测试）。</p>
<p>依赖注入（DI）的另一个优势是，不同的存储库，能够拥有独立的生命周期。当前多数的响应范式使用某种全局应用状态，它们能映射到不同的组件。但，根据我的经验，在组件卸载时清理全局状态，太容易引入bug。</p>
<p>在组件挂载时创建一个存储库，并且该组件的子组件无缝地可用，这似乎是非常有用的，但常常被忽略。</p>
<p>脱离Angular的作用域，依赖注入很容易被mobx复制。</p>
<h3>路由</h3>
<p>基于组件的路由允许组件管理自己的子路由，而不需要一个大的全局路由器配置。这种方法最终在版本4中通过“react-router”实现了。</p>
<h3>Material Design</h3>
<p>使用高级组件构建项目，总是不错的。material design已经成为一种普遍接纳的默认选择，即使是在非谷歌项目中。</p>
<p>我特意选择了<a href="http://react-toolbox.com/#/">React工具箱</a>，而不是通常推荐的<a href="http://react-toolbox.com/#/">Material UI</a>，因为在内联CSS上，Material UI已经承认，有严重的 <a href="https://github.com/callemall/material-ui/blob/master/ROADMAP.md#summarizing-what-are-our-main-problems-with-css">性能问题</a>，他们计划在下一版本解决。</p>
<p>此外，React工具箱使用的<a href="http://cssnext.io/">Post/cssnext</a> 已经开始取代Sass/LESS了。</p>
<h3>局部作用CSS</h3>
<p>CSS类名像全局变量。仅有几种可数的方法能防止CSS冲突，包括<a href="https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/">BEM</a>。但，现今有一个清晰可见的趋势，用第三方库处理CSS防止冲突，而不需要前端开发者去处理CSS的命名空间。</p>
<h3>表单校验</h3>
<p>表单验证是一个非常重要且广泛使用的特性。推荐使用防止代码重复和错误的库。</p>
<h3>项目生成器</h3>
<p>使用cli生成器生成项目比从github克隆模板要方便一点。</p>
<h3>相同的项目，构建两次</h3>
<p>我们将用React和Angular创建相同的应用程序。没什么特别的，只是一个允许任何人将消息发布到公共页面的Shoutboard。</p>
<p>你可以在这里查看效果：</p>
<ul>
<li><p><a href="http://shoutboard-angular.herokuapp.com/">Shoutboard Angular</a></p>
</li>
<li><p><a href="https://shoutboard-react.herokuapp.com/">Shoutboard React</a></p>
</li>
</ul>
<p><img src="http://p0.qhimg.com/t01d43ae366ab01f356.jpg" alt=""></p>
<p>如果你想获取源码，可以从Github获取：</p>
<ul>
<li><p><a href="https://github.com/tomaash/shoutboard-angular">Shoutboard Angular source</a></p>
</li>
<li><p><a href="https://github.com/tomaash/shoutboard-react">Shoutboard React source</a></p>
</li>
</ul>
<p>你会注意到，我们使用了TypeScript构建应用程序。TypeScript语法检测的优点很明显。现在， 随着TypeScript2引入了Imports优化内容、async/await和rest spread ，TypeScript2遗弃了Babel/ES7/<a href="https://flow.org/">Flow</a>。</p>
<p>另外，因为我们要使用GraphQL，我们将 <a href="https://github.com/apollographql/apollo-client">Apollo Client</a>添加在示例项目中。REST是很好的，但是大约十年后，就过时了。</p>
<h3>渲染和路由</h3>
<p>首先，让我们看看这两个实现的入口点。</p>
<h4>Angular</h4>
<pre><code class="hljs groovy">const <span class="hljs-string">appRoutes:</span> Routes = [
  { <span class="hljs-string">path:</span> <span class="hljs-string">'home'</span>, <span class="hljs-string">component:</span> HomeComponent },
  { <span class="hljs-string">path:</span> <span class="hljs-string">'posts'</span>, <span class="hljs-string">component:</span> PostsComponent },
  { <span class="hljs-string">path:</span> <span class="hljs-string">'form'</span>, <span class="hljs-string">component:</span> FormComponent },
  { <span class="hljs-string">path:</span> <span class="hljs-string">''</span>, <span class="hljs-string">redirectTo:</span> <span class="hljs-string">'/home'</span>, <span class="hljs-string">pathMatch:</span> <span class="hljs-string">'full'</span> }
]

<span class="hljs-meta">@NgModule</span>({
<span class="hljs-symbol">  declarations:</span> [
    AppComponent,
    PostsComponent,
    HomeComponent,
    FormComponent,
  ],
<span class="hljs-symbol">  imports:</span> [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ApolloModule.forRoot(provideClient),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdInputModule, MdSelectModule, MdButtonModule, MdCardModule, MdIconModule
  ],
<span class="hljs-symbol">  providers:</span> [
    AppService
  ],
<span class="hljs-symbol">  bootstrap:</span> [AppComponent]
})

</code></pre><pre><code class="hljs coffeescript">@Injectable()
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppService</span> {</span>
  username = <span class="hljs-string">'Mr. User'</span>
}

</code></pre><p>基础地，在应用程序使用的所有组件都需要添加到declarations，所有第三方库添加到imports，所有全局存储添加到providers。子组件可以访问所有这些内容，并有机会添加更多的本地内容。</p>
<h4>React</h4>
<pre><code class="hljs dust"><span class="xml">const appStore = AppStore.getInstance()
const routerStore = RouterStore.getInstance()

const rootStores = </span><span class="hljs-template-variable">{
  appStore,
  routerStore
}</span><span class="xml">

ReactDOM.render(
  <span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> </span></span><span class="hljs-template-variable">{...rootStores}</span><span class="xml"><span class="hljs-tag"> &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Router</span> <span class="hljs-attr">history</span>=</span></span><span class="hljs-template-variable">{routerStore.history}</span><span class="xml"><span class="hljs-tag"> &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">App</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Switch</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/home'</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{Home as any}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/posts'</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{Posts as any}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/form'</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{Form as any}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Redirect</span> <span class="hljs-attr">from</span>=<span class="hljs-string">'/'</span> <span class="hljs-attr">to</span>=<span class="hljs-string">'/home'</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Switch</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">App</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span> &gt;</span>,
  document.getElementById('root')
)

</span></code></pre><p>该组件用于mobx中的依赖注入。它将存储保存到上下文，以便响应组件稍后可以注入它们。React上下文可以<a href="https://medium.com/@mweststrate/how-to-safely-use-react-context-b7e343eff076">安全使用</a>。</p>
<p>由于没有模块声明，相对于Angular的代码，React的代码稍微短了一些——通常，您只需要导入就可以使用了。有时这种强依赖是不需要的，所以对于全局的存储，我不得不使用几十年历史的<a href="https://www.wikiwand.com/en/Design_Patterns">Gof</a> <a href="https://en.wikipedia.org/wiki/Singleton_pattern">模式</a>。</p>
<pre><code class="hljs dart"><span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppStore</span> </span>{
  <span class="hljs-keyword">static</span> instance: AppStore
  <span class="hljs-keyword">static</span> getInstance() {
    <span class="hljs-keyword">return</span> AppStore.instance || (AppStore.instance = <span class="hljs-keyword">new</span> AppStore())
  }
  <span class="hljs-meta">@observable</span> username = <span class="hljs-string">'Mr. User'</span>
}

</code></pre><p>Angular的 Router是可注入的，所以它在任何地方都能使用，不限于组件。为了在React中获得同样的效果，我们使用 <a href="https://github.com/alisd23/mobx-react-router">mobx-react-router</a>包，并注入<code>routerStore</code>。</p>
<p>总结：启动这两个应用程序非常简单。React有一个优势：更简单，使用imports替代modules。但是，正如将在后面看到的，modules可以非常方便。亲自制作单件有点麻烦。至于路由声明语法，JSON vs. JSX只是一个偏好问题。</p>
<h3>Links and Imperative Navigation</h3>
<p>有两种情况可以切换路由。声明式，使用“elements和 imperative”，直接调用路由API。</p>
<h4>Angular</h4>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span> Shoutboard Application <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>Posts<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">router-outlet</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-outlet</span>&gt;</span>

</code></pre><p>Angular路由器会自动检测到哪个“routerLink”是激活的，并在激活的元素上添加一个 “routerLinkActive”类名，这样它就可以附带相应的样式了。</p>
<p>路由使用特殊的“元素”来呈现当前路径所规定的任何内容。当我们深入研究应用程序的子组件时，可能会有很多的。</p>
<pre><code class="hljs kotlin"><span class="hljs-meta">@Injectable()</span>
export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">FormService</span> </span>{
  <span class="hljs-keyword">constructor</span>(<span class="hljs-keyword">private</span> router: Router) { }
  goBack() {
    <span class="hljs-keyword">this</span>.router.navigate([<span class="hljs-string">'/posts'</span>])
  }
}

</code></pre><p>路由模块可以注入到任何服务中，<code>private</code>将其存储在实例中，而无需显式分配。使用<code>navigate</code>方法切换URLs。</p>
<h4>React</h4>
<pre><code class="hljs dust"><span class="xml">import * as style from './app.css'
// …
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Shoutboard Application<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">NavLink</span> <span class="hljs-attr">to</span>=<span class="hljs-string">'/home'</span> <span class="hljs-attr">activeClassName</span>=</span></span><span class="hljs-template-variable">{style.active}</span><span class="xml"><span class="hljs-tag">&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">NavLink</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">NavLink</span> <span class="hljs-attr">to</span>=<span class="hljs-string">'/posts'</span> <span class="hljs-attr">activeClassName</span>=</span></span><span class="hljs-template-variable">{style.active}</span><span class="xml"><span class="hljs-tag">&gt;</span>Posts<span class="hljs-tag">&lt;/<span class="hljs-name">NavLink</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    </span><span class="hljs-template-variable">{this.props.children}</span><span class="xml">
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

</span></code></pre><p>React路由也可以在激活的链接上添加一个类名“activeClassName”。</p>
<p>在这里，我们不能直接提供类名称，因为css模块编译器使它变得唯一，我们需要使用<code>style</code>helper。以后再说吧。</p>
<p>如上所见，React路由是嵌入在其它元素内的元素。由于元素只是包裹和挂载当前的路由，这意味着当前组件的子路由就是‘this.props.children’。这也是可以合成的。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">FormStore</span> </span>{
  routerStore: RouterStore
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.routerStore = RouterStore.getInstance()
  }
  goBack = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.routerStore.history.push(<span class="hljs-string">'/posts'</span>)
  }
}

</code></pre><p><code>mobx-router-store</code> 包也可以注入和导航。</p>
<p>总结：两种路由方法是相当相似的。Angular似乎更直观，而React路由器有一些更直接的组合。</p>
<h3>Dependency Injection</h3>
<p>事实证明，将数据层与表示层分开是有益的。我们在这里试图使用依赖注入让数据层的组件（这里称为model/store/service）跟踪可视化组件的生命周期，从而创建一个或多个这样的组件的实例，而不需要接触全局状态。此外，还可以混合和匹配兼容的数据和可视化层。</p>
<p>本文中的示例非常简单，所以所有的依赖注入可能看起来都是多余的，但是随着应用程序的增长，它将变得非常有用。</p>
<h4>Angular</h4>
<pre><code class="hljs kotlin"><span class="hljs-meta">@Injectable()</span>
export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HomeService</span> </span>{
  message = <span class="hljs-string">'Welcome to home page'</span>
  counter = <span class="hljs-number">0</span>
  increment() {
    <span class="hljs-keyword">this</span>.counter++
  }
}

</code></pre><p>任何类都能使用'@inputable'装饰，然后它的属性和方法可以提供给组件。</p>
<pre><code class="hljs less"><span class="hljs-variable">@Component</span>({
  <span class="hljs-attribute">selector</span>: <span class="hljs-string">'app-home'</span>,
  <span class="hljs-attribute">templateUrl</span>: <span class="hljs-string">'./home.component.html'</span>,
  <span class="hljs-attribute">providers</span>: [
    HomeService
  ]
})
export class HomeComponent {
  <span class="hljs-selector-tag">constructor</span>(
    public <span class="hljs-attribute">homeService</span>: HomeService,
    public <span class="hljs-attribute">appService</span>: AppService,
  ) { }
}

</code></pre><p>将<code>HomeService</code>注册到组件的元数据<code>providers</code>中，该服务只对这个组件可用。它现在不是单例，但是组件的每个实例都将获得一个新的副本，在组件的挂载上都是新的。这意味着没有来自以前使用的旧数据。</p>
<p>相比之下，<code>AppService</code>注册到了<code>app.module</code> ，因此在应用程序的生命周期，它是一个单例，并且对所有组件保持不变。利用组件控制服务的生命周期是一个非常有用的，但却没有得到充分的重视。</p>
<p>依赖注入将服务实例注册到组件的构造函数<code>constructor</code>来工作，并由TypeScript类型标识。另外，<code>public</code>关键字自动将参数分配给<code>this</code>，这样我们就不再需要写无聊的<code>this.homeService = homeService</code>了。</p>
<pre><code class="hljs django"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Dashboard<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">md-input-container</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">mdInput</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">'Edit your name'</span> [(<span class="hljs-attr">ngModel</span>)]=<span class="hljs-string">'appService.username'</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">md-input-container</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Clicks since last visit: </span><span class="hljs-template-variable">"{{"homeService.counter"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">'homeService.increment()'</span>&gt;</span>Click!<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

</span></code></pre><p>Angular的模板语法，可以说相当优雅。我喜欢'[()]'快捷方式，它像双向数据绑定一样工作，但它实际上是一个属性绑定 + 事件。按服务的生命周期所述，在我们每次从“/home”导航出去时<code>homeService.counter</code>将重置，但是<code>appService.username</code>将保持，并且可以从任何地方访问。</p>
<h4>React</h4>
<pre><code class="hljs coffeescript"><span class="hljs-keyword">import</span> { observable } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx'</span>

<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HomeStore</span> {</span>
  @observable counter = <span class="hljs-number">0</span>
<span class="hljs-function">  <span class="hljs-title">increment</span> = <span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.counter++
  }
}

</code></pre><p>使用MobX，我们将<code>@observable</code>装饰器添加到我们想要进行观察的任何属性中。</p>
<pre><code class="hljs scala"><span class="hljs-meta">@observer</span>
export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Home</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component&lt;any</span>, <span class="hljs-title">any&gt;</span> </span>{

  homeStore: <span class="hljs-type">HomeStore</span>
  componentWillMount() {
    <span class="hljs-keyword">this</span>.homeStore = <span class="hljs-keyword">new</span> <span class="hljs-type">HomeStore</span>()
  }

  render() {
    <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">Provider</span> homeStore={<span class="hljs-keyword">this</span>.homeStore}&gt;
      &lt;<span class="hljs-type">HomeComponent</span> /&gt;
    &lt;/<span class="hljs-type">Provider</span>&gt;
  }
}

</code></pre><p>为了正确地管理生命周期，比Angular示例，我们需要多做一点工作。我们将<code>HomeComponent</code>包装在一个<code>Provider</code>中，在每次挂载时，接受一个<code>HomeStore</code>的新实例。</p>
<pre><code class="hljs javascript">interface HomeComponentProps {
  appStore?: AppStore,
  homeStore?: HomeStore
}

@inject(<span class="hljs-string">'appStore'</span>, <span class="hljs-string">'homeStore'</span>)
@observer
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HomeComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span>&lt;<span class="hljs-title">HomeComponentProps</span>, <span class="hljs-title">any</span>&gt; </span>{
  render() {
    <span class="hljs-keyword">const</span> { homeStore, appStore } = <span class="hljs-keyword">this</span>.props
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Dashboard<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Input</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">'text'</span>
        <span class="hljs-attr">label</span>=<span class="hljs-string">'Edit your name'</span>
        <span class="hljs-attr">name</span>=<span class="hljs-string">'username'</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{appStore.username}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{appStore.onUsernameChange}</span>
      /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Clicks since last visit: {homeStore.counter}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{homeStore.increment}</span>&gt;</span>Click!<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  }
}

</span></code></pre><p><code>HomeComponent</code>使用<code>@observer</code>装饰器来监听<code>@observable</code>属性的更改。</p>
<p>这其中的内在机制很有趣，让我们在这里简单地看一下。<code>@observable</code> 装饰器用getter和setter替换对象中的属性，允许拦截调用。当调用<code>@observable</code>增强组件的渲染函数时，调用那些属性的getter，并保持调用的引用。</p>
<p>然后，当修改属性值时，调用setter，调用应用这些属性的组件的渲染函数。现在，这些数据被更新，整个周期重新开始。</p>
<p>一个非常简单的机制，而且性能也很好。<a href="https://medium.com/@mweststrate/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254">这里</a>有深入的解释。</p>
<p><code>@inject</code>装饰器将<code>appStore</code>和<code>homeStore</code>的实例注入到<code>HomeComponent</code>的props对象中。此时，这些存储都有不同的生命周期。在应用程序的生命周期中<code>appStore</code>是不变的，但是在每一次导航到“/home”上时，<code>homeStore</code>是新建的。</p>
<p>这样做的好处是不必手动清理属性。当存储都是全局的，如果路由是包含不同数据的详情页面，这是一个痛苦。</p>
<p>总结：在Angular依赖注入的特性下，provider生命周期管理更容易实现。React版本也是可用的，但涉及更多的样板。</p>
<h3>计算属性</h3>
<h4>React</h4>
<p>这个问题让我们以React开始，它有一个更直接的解决方案。</p>
<pre><code class="hljs coffeescript"><span class="hljs-keyword">import</span> { observable, computed, action } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx'</span>

<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HomeStore</span> {</span>
<span class="hljs-keyword">import</span> { observable, computed, action } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx'</span>

<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HomeStore</span> {</span>
  @observable counter = <span class="hljs-number">0</span>
<span class="hljs-function">  <span class="hljs-title">increment</span> = <span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.counter++
  }
  @computed get counterMessage() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'recompute counterMessage!'</span>)
    <span class="hljs-keyword">return</span> `<span class="javascript">${<span class="hljs-keyword">this</span>.counter} ${<span class="hljs-keyword">this</span>.counter === <span class="hljs-number">1</span> ? <span class="hljs-string">'click'</span> : <span class="hljs-string">'clicks'</span>} since last visit</span>`
  }
}

</code></pre><p>因此，我们有一个计算的属性，它绑定到<code>counter</code>并返回一个正确的复数消息。缓存<code>counterMessage</code>的结果,并只在<code>counter</code>更改时重新计算.</p>
<pre><code class="hljs dust"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Input</span>
  <span class="hljs-attr">type</span>=<span class="hljs-string">'text'</span>
  <span class="hljs-attr">label</span>=<span class="hljs-string">'Edit your name'</span>
  <span class="hljs-attr">name</span>=<span class="hljs-string">'username'</span>
  <span class="hljs-attr">value</span>=</span></span><span class="hljs-template-variable">{appStore.username}</span><span class="xml"><span class="hljs-tag">
  <span class="hljs-attr">onChange</span>=</span></span><span class="hljs-template-variable">{appStore.onUsernameChange}</span><span class="xml"><span class="hljs-tag">
/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">{homeStore.counterMessage}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=</span></span><span class="hljs-template-variable">{homeStore.increment}</span><span class="xml"><span class="hljs-tag">&gt;</span>Click!<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

</span></code></pre><p>然后，我们引用JSX模板中的属性和<code>increment</code>方法。表单控件的值绑定到一个变量驱动，并且用<code>appStore</code>对象的方法来处理用户更新值的事件。</p>
<h4>Angular</h4>
<p>在Angular中，为了获得相同的效果，我们需要多做一点点创新。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">import</span> { Injectable } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>
<span class="hljs-keyword">import</span> { BehaviorSubject } <span class="hljs-keyword">from</span> <span class="hljs-string">'rxjs/BehaviorSubject'</span>

@Injectable()
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HomeService</span> </span>{
  message = <span class="hljs-string">'Welcome to home page'</span>
  counterSubject = <span class="hljs-keyword">new</span> BehaviorSubject(<span class="hljs-number">0</span>)
  <span class="hljs-comment">// Computed property can serve as basis for further computed properties</span>
  counterMessage = <span class="hljs-keyword">new</span> BehaviorSubject(<span class="hljs-string">''</span>)
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-comment">// Manually subscribe to each subject that couterMessage depends on</span>
    <span class="hljs-keyword">this</span>.counterSubject.subscribe(<span class="hljs-keyword">this</span>.recomputeCounterMessage)
  }

  <span class="hljs-comment">// Needs to have bound this</span>
  private recomputeCounterMessage = <span class="hljs-function">(<span class="hljs-params">x</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'recompute counterMessage!'</span>)
    <span class="hljs-keyword">this</span>.counterMessage.next(<span class="hljs-string">`<span class="hljs-subst">${x}</span> <span class="hljs-subst">${x === <span class="hljs-number">1</span> ? <span class="hljs-string">'click'</span> : <span class="hljs-string">'clicks'</span>}</span> since last visit`</span>)
  }

  increment() {
    <span class="hljs-keyword">this</span>.counterSubject.next(<span class="hljs-keyword">this</span>.counterSubject.getValue() + <span class="hljs-number">1</span>)
  }
}

</code></pre><p>我们需要将每一个计算属性定义为一个<code>BehaviorSubject</code>，并且赋予一个基础值。这样，计算属性本身也是<code>BehaviorSubject</code>，因为任何计算属性都可以作为另一个计算属性的输入。</p>
<p>当然，<a href="https://www.sitepoint.com/functional-reactive-programming-rxjs/">“RxJS”</a>可以做的不仅仅是这个，但这将是另一篇文章的主题。一个小缺陷：比起react示例，仅仅因为计算属性而使用RxJS，累赘一些，需要在构造函数中手动管理订阅。</p>
<pre><code class="hljs django"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">md-input-container</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">mdInput</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">'Edit your name'</span> [(<span class="hljs-attr">ngModel</span>)]=<span class="hljs-string">'appService.username'</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">md-input-container</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"homeService.counterMessage | async"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">'homeService.increment()'</span>&gt;</span>Click!<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

</span></code></pre><p>注意我们如何用<code>| async</code>管道使用RxJS subject。比起在组件中订阅的要求，这是一个很好的处理，简短得多。<code>input</code>组件由<code>[(ngModel)]</code>指令驱动。尽管看起来很奇怪，但它确实很优雅。<code>[(ngModel)]</code>只是一个语法糖，将值绑定到<code>appService.username</code>，用户触发输入事件自动更新表单值。</p>
<p>总结：与Angular/RxJS相比，在React/MobX中的计算属性更容易实现，但RxJS可能提供一些更有用的FRP特性，这些特性稍后可能会被欣赏。</p>
<h3>模板与样式</h3>
<p>为了显示模板如何相互层叠，让我们创建展示posts列表的<code>PostsComponent</code>。</p>
<h4>Angular</h4>
<pre><code class="hljs groovy"><span class="hljs-meta">@Component</span>({
<span class="hljs-symbol">  selector:</span> <span class="hljs-string">'app-posts'</span>,
<span class="hljs-symbol">  templateUrl:</span> <span class="hljs-string">'./posts.component.html'</span>,
<span class="hljs-symbol">  styleUrls:</span> [<span class="hljs-string">'./posts.component.css'</span>],
<span class="hljs-symbol">  providers:</span> [
    PostsService
  ]
})

export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">PostsComponent</span> <span class="hljs-keyword">implements</span> <span class="hljs-title">OnInit</span> {</span>
  constructor(
    <span class="hljs-keyword">public</span> <span class="hljs-string">postsService:</span> PostsService,
    <span class="hljs-keyword">public</span> <span class="hljs-string">appService:</span> AppService
  ) { }

  ngOnInit() {
    <span class="hljs-keyword">this</span>.postsService.initializePosts()
  }
}

</code></pre><p>这个组件关联着HTML、CSS和注入的服务，并且在初始化时调用函数从API加载posts。<code>AppService</code>是应用程序中定义的单例，而<code>AppService</code>是暂态的，在每次组件构造时，创建一个新实例。这个组件引用的CSS是针对这个组件的，这意味着该样式不能影响该组件之外的任何内容。</p>
<pre><code class="hljs django"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">md-fab</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">md-icon</span>&gt;</span>add<span class="hljs-tag">&lt;/<span class="hljs-name">md-icon</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Hello </span><span class="hljs-template-variable">"{{"appService.username"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">md-card</span> *<span class="hljs-attr">ngFor</span>=<span class="hljs-string">"let post of postsService.posts"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">md-card-title</span>&gt;</span></span><span class="hljs-template-variable">"{{"post.title"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">md-card-title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">md-card-subtitle</span>&gt;</span></span><span class="hljs-template-variable">"{{"post.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">md-card-subtitle</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">md-card-content</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
      </span><span class="hljs-template-variable">"{{"post.message"}}"</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">md-card-content</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">md-card</span>&gt;</span>

</span></code></pre><p>在HTML模板中，我们主要引用来自Angular Material的组件。为了使它们可用，必须在<code>app.module</code>的imports属性引入这些模块。<code>*ngFor</code>指令用于遍历post重复生成<code>md-card</code>组件。</p>
<p><strong>本地CSS：</strong></p>
<pre><code class="hljs css"><span class="hljs-selector-class">.mat-card</span> {
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">1rem</span>;
}

</code></pre><p>本地CSS只是在<code>md-card</code>组件上增加了一个类。</p>
<p><strong>全局CSS：</strong></p>
<pre><code class="hljs css"><span class="hljs-selector-class">.float-right</span> {
  <span class="hljs-attribute">float</span>: right;
}

</code></pre><p>这个类在全局<code>style.css</code>文件中定义，可用于所有组件。用标准的方式引用，'class="float-right"'。</p>
<p><strong>编译的CSS：</strong></p>
<pre><code class="hljs css"><span class="hljs-selector-class">.float-right</span> {
  <span class="hljs-attribute">float</span>: right;
}
<span class="hljs-selector-class">.mat-card</span><span class="hljs-selector-attr">[_ngcontent-c1]</span> {
    <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">1rem</span>;
}

</code></pre><p>在编译的CSS,中，我们可以看到， 本地CSS通过<code>[_ngcontent-c1]</code> 限定在已渲染的组件上。每个已渲染的Angular组件都有这样一个生成的类，用于界定CSS范围。</p>
<p>这种机制的优点是我们可以正常地引用类，而范围是在暗箱下处理的。</p>
<h4>React</h4>
<pre><code class="hljs javascript"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> style <span class="hljs-keyword">from</span> <span class="hljs-string">'./posts.css'</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> appStyle <span class="hljs-keyword">from</span> <span class="hljs-string">'../app.css'</span>

@observer
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Posts</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span>&lt;<span class="hljs-title">any</span>, <span class="hljs-title">any</span>&gt; </span>{

  postsStore: PostsStore
  componentWillMount() {
    <span class="hljs-keyword">this</span>.postsStore = <span class="hljs-keyword">new</span> PostsStore()
    <span class="hljs-keyword">this</span>.postsStore.initializePosts()
  }

  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">postsStore</span>=<span class="hljs-string">{this.postsStore}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">PostsComponent</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span></span>
  }
}

</code></pre><p>在React中，我们需要使用<code>Provider</code>方法让<code>PostsStore</code>依赖“transient”。我们还导入了CSS样式，引用为<code>style</code>和<code>appStyle</code>，以便能够使用JSX中那些CSS文件中的类。</p>
<pre><code class="hljs dust"><span class="xml">interface PostsComponentProps </span><span class="hljs-template-variable">{
  appStore?: AppStore,
  postsStore?: PostsStore
}</span><span class="xml">

@inject('appStore', 'postsStore')
@observer
export class PostsComponent extends React.Component<span class="hljs-tag">&lt;<span class="hljs-name">PostsComponentProps,</span> <span class="hljs-attr">any</span>&gt;</span> </span><span class="hljs-template-variable">{
  render() {
    const { postsStore, appStore }</span><span class="xml"> = this.props
    return <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">NavLink</span> <span class="hljs-attr">to</span>=<span class="hljs-string">'form'</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">'add'</span> <span class="hljs-attr">floating</span> <span class="hljs-attr">accent</span> <span class="hljs-attr">className</span>=</span></span><span class="hljs-template-variable">{appStyle.floatRight}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">NavLink</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Hello </span><span class="hljs-template-variable">{appStore.username}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      </span><span class="hljs-template-variable">{postsStore.posts.map(post =&gt;
        &lt;Card key={post.id}</span><span class="xml"> className=</span><span class="hljs-template-variable">{style.messageCard}</span><span class="xml">&gt;
          <span class="hljs-tag">&lt;<span class="hljs-name">CardTitle</span>
            <span class="hljs-attr">title</span>=</span></span><span class="hljs-template-variable">{post.title}</span><span class="xml"><span class="hljs-tag">
            <span class="hljs-attr">subtitle</span>=</span></span><span class="hljs-template-variable">{post.name}</span><span class="xml"><span class="hljs-tag">
          /&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">CardText</span>&gt;</span></span><span class="hljs-template-variable">{post.message}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">CardText</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Card</span>&gt;</span>
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  }
}

</span></code></pre><p>当然，JSX的JavaScript-y比Angular的HTML模板要多得多，这是好是坏，取决于你的品味。我们使用<code>map</code>方法来迭代文章，而不是<code>*ngFor</code>指令.</p>
<p>现在，Angular可能是最吹捧TypeScript的框架，但实际上，JSX才是TypeScript真正闪亮的平台。随着CSS模块的添加，它真正地将模板编码转化为完整的代码。每一样都是经过类型检测的，组件、属性，甚至css类（<code>appstyle.floatright</code>和<code>style.messagecard</code>，见下面）。当然，JSX的精益特性鼓励将其分解成组件和片段，这一点要比Angular模板多一点。</p>
<p><strong>本地CSS：</strong></p>
<pre><code class="hljs css"><span class="hljs-selector-class">.messageCard</span> {
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">1rem</span>;
}

</code></pre><p><strong>全局CSS：</strong></p>
<pre><code class="hljs css"><span class="hljs-selector-class">.floatRight</span> {
  <span class="hljs-attribute">float</span>: right;
}

</code></pre><p><strong>编译的CSS：</strong></p>
<pre><code class="hljs css"><span class="hljs-selector-class">.floatRight__qItBM</span> {
  <span class="hljs-attribute">float</span>: right;
}

<span class="hljs-selector-class">.messageCard__1Dt_9</span> {
    <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">1rem</span>;
}

</code></pre><p>如您所见，CSS模块使用随机后缀对每个CSS类进行后缀，这保证了惟一性，这是一个避免冲突的简单方法，然后通过webpack导入的对象引用类。这样做的一个可能的缺点是，您不能像我们在Angular示例中所做的那样，仅仅创建一个CSS类并对其进行增强。另一方面，这实际上是件好事，因为它迫使您正确地封装样式。</p>
<p>总结：由于代码完成和类型检查支持，我个人更喜欢JSX的Angular模板。这真是个很吸引人的特色。Angular现在有AOT编译，它也可以发现一些东西，代码完成也可以处理一半的内容，但是它还不像JSX/TypeScript那样完整。</p>
<h3>GraphQL—加载数据</h3>
<p>所以，我们决定使用GraphQL来存储这个应用程序的数据。创建GraphQL后端最简单的方法之一是使用一些BaaS，比如Graphcool。我们就是这么做的。基本上，你只需要定义模型和属性，你的CRUD就可以应用了。</p>
<h4>通用代码</h4>
<p>因为一些与 GraphQL相关的代码对于两种实现是100%相同的，所以我们不要重复两次：</p>
<pre><code class="hljs autohotkey">const PostsQuery = gql`
  query PostsQuery {
<span class="hljs-symbol">    allPosts(orderBy: createdAt_DESC, first:</span> <span class="hljs-number">5</span>)
    {
<span class="hljs-built_in">      id,</span>
<span class="hljs-built_in">      name,</span>
<span class="hljs-built_in">      title,</span>
      message
    }
  }
`

</code></pre><p>GraphQL是一种查询语言，旨在提供一组更丰富的功能，而不是传统的RESTful端点。让我们详细分析这个特别的查询语言。</p>
<ul>
<li><p><code>PostsQuery</code>只是这个查询的一个名称，以后可以引用，它可以重命名为任何名称。</p>
</li>
<li><p><code>allPosts</code> 是最重要的部分——它引用函数查询所有记录。这个名字是Graphcool创建的。</p>
</li>
<li><p><code>orderBy</code> 和<code>first</code>是<code>allPosts</code>函数的参数。<code>createdAt</code>是<code>Post</code>模型的属性之一。<code>first: 5</code>意味着它将仅仅返回查询的前5个结果。</p>
</li>
<li><p><code>id</code>， <code>name</code>， <code>title</code>，和 <code>message</code>是我们希望包含在结果中的<code>Post</code>模型的属性。其他属性将被过滤掉。</p>
</li>
</ul>
<p>正如你已经看到的，它很强大。请查看<a href="http://graphql.org/learn/queries/">这个页面</a>来让自己更熟悉GraphQL。</p>
<pre><code class="hljs routeros">interface Post {
  id: string
  name: string
  title: string
  message: string
}
<span class="hljs-built_in">
interface </span>PostsQueryResult {
  allPosts: Array&lt;Post&gt;
}

</code></pre><p>是的，作为一个好的TypeScript用户，我们为GraphQL结果创建接口。</p>
<h4>Angular</h4>
<pre><code class="hljs kotlin"><span class="hljs-meta">@Injectable()</span>
export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">PostsService</span> </span>{
  posts = []

  <span class="hljs-keyword">constructor</span>(<span class="hljs-keyword">private</span> apollo: Apollo) { }

  initializePosts() {
    <span class="hljs-keyword">this</span>.apollo.query&lt;PostsQueryResult&gt;({
      query: PostsQuery,
      fetchPolicy: <span class="hljs-string">'network-only'</span>
    }).subscribe(({ <span class="hljs-keyword">data</span> }) =&gt; {
      <span class="hljs-keyword">this</span>.posts = <span class="hljs-keyword">data</span>.allPosts
    })
  }
}

</code></pre><p>GraphQL查询是一个RxJS可观察对象，我们订阅它。它工作有点像promise，但不是很好，所以，不幸地，我们使用了<code>async/await</code>。当然，还有 <a href="https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/topromise.md">toPromise</a>，但这似乎不是一个Angular 写法。我们设置了<code>fetchPolicy: 'network-only'</code>，因为在这种情况下，我们不想缓存数据，而是每次都重新获取数据。</p>
<h4>React</h4>
<pre><code class="hljs typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> PostsStore {
  appStore: AppStore

  <span class="hljs-meta">@observable</span> posts: <span class="hljs-built_in">Array</span>&lt;Post&gt; = []

  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">this</span>.appStore = AppStore.getInstance()
  }

  <span class="hljs-keyword">async</span> initializePosts() {
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.appStore.apolloClient.query&lt;PostsQueryResult&gt;({
      query: PostsQuery,
      fetchPolicy: <span class="hljs-string">'network-only'</span>
    })
    <span class="hljs-keyword">this</span>.posts = result.data.allPosts
  }
}

</code></pre><p>React版本几乎是相同的，但是由于<code>apolloClient</code>在这里使用promises，我们能使用<code>async/await</code>语法。在React中还有一些其他的方法，它们只是将GraphQL查询“录制”到<a href="https://github.com/apollographql/react-apollo">高阶组件</a>上，但在我看来，它似乎把数据层和表示层混合得太紧密了。</p>
<p>总结：RxJS订阅与async/await的想法是完全相同的。</p>
<h3>GraphQL—保存数据</h3>
<h4>通用代码</h4>
<p>一些GraphQL相关代码：</p>
<pre><code class="hljs autoit"><span class="hljs-keyword">const</span> AddPostMutation = gql`
  mutation AddPostMutation($name: <span class="hljs-built_in">String</span>!, $title: <span class="hljs-built_in">String</span>!, $message: <span class="hljs-built_in">String</span>!) {
    createPost(
      name: $name,
      title: $title,
      message: $message
    ) {
      id
    }
  }
`

</code></pre><p><code>mutations</code>的目的是创建或更新记录。因此，用<code>mutation</code>声明一些变量是有帮助地，因为这是将数据传递到其中的方法。所以，我们有<code>name</code>, <code>title</code>, 和<code>message</code>变量，类型为<code>String</code>，我们每次mutation声明时都需要填充这些变量。同样, <code>createPost</code>函数也是由Graphcool定义的。我们指定<code>Post</code>模型的键绑定来自外部变化变量的值，并且我们希望只发送新创建Post的<code>id</code>作为交换。</p>
<h4>Angular</h4>
<pre><code class="hljs typescript"><span class="hljs-meta">@Injectable</span>()
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> FormService {
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params">
    <span class="hljs-keyword">private</span> apollo: Apollo,
    <span class="hljs-keyword">private</span> router: Router,
    <span class="hljs-keyword">private</span> appService: AppService
  </span>) { }

  addPost(value) {
    <span class="hljs-keyword">this</span>.apollo.mutate({
      mutation: AddPostMutation,
      variables: {
        name: <span class="hljs-keyword">this</span>.appService.username,
        title: value.title,
        message: value.message
      }
    }).subscribe(<span class="hljs-function">(<span class="hljs-params">{ data }</span>) =&gt;</span> {
      <span class="hljs-keyword">this</span>.router.navigate([<span class="hljs-string">'/posts'</span>])
    }, <span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'there was an error sending the query'</span>, error)
    })
  }

}

</code></pre><p>当调用<code>apollo.mutate</code>时，我们需要提供我们调用的变化和变量。我们得到<code>subscribe</code>回调的结果，并使用注入的<code>router</code>导航回post列表。</p>
<h4>React</h4>
<pre><code class="hljs stylus">export class FormStore {
  constructor() {
    this<span class="hljs-selector-class">.appStore</span> = AppStore.getInstance()
    this<span class="hljs-selector-class">.routerStore</span> = RouterStore.getInstance()
    this<span class="hljs-selector-class">.postFormState</span> = new PostFormState()
  }

  submit = async () =&gt; {
    await this<span class="hljs-selector-class">.postFormState</span><span class="hljs-selector-class">.form</span><span class="hljs-selector-class">.validate</span>()
    <span class="hljs-keyword">if</span> (this<span class="hljs-selector-class">.postFormState</span><span class="hljs-selector-class">.form</span><span class="hljs-selector-class">.error</span>) return
    const result = await this<span class="hljs-selector-class">.appStore</span><span class="hljs-selector-class">.apolloClient</span><span class="hljs-selector-class">.mutate</span>(
      {
        mutation: AddPostMutation,
        variables: {
          name: this<span class="hljs-selector-class">.appStore</span><span class="hljs-selector-class">.username</span>,
          title: this<span class="hljs-selector-class">.postFormState</span><span class="hljs-selector-class">.title</span><span class="hljs-selector-class">.value</span>,
          message: this<span class="hljs-selector-class">.postFormState</span><span class="hljs-selector-class">.message</span><span class="hljs-selector-class">.value</span>
        }
      }
    )
    this.goBack()
  }

  goBack = () =&gt; {
    this<span class="hljs-selector-class">.routerStore</span><span class="hljs-selector-class">.history</span><span class="hljs-selector-class">.push</span>(<span class="hljs-string">'/posts'</span>)
  }
}

</code></pre><p>和上面非常相似，有更多的“手动”依赖注入的区别，以及<code>async/await</code>的用法。</p>
<p>总结：同样，这里没有什么区别。subscribe与async/await从基本上是不同的。</p>
<h3>Forms</h3>
<p>我们希望在此应用程序中使用表格来实现以下目标：</p>
<ul>
<li><p>字段与模型的数据绑定</p>
</li>
<li><p>每个字段的验证消息，多个规则</p>
</li>
<li><p>支持检查整个表格是否有效</p>
</li>
</ul>
<h4>React</h4>
<pre><code class="hljs sql">export const <span class="hljs-keyword">check</span> = (validator, message, options) =&gt;
  (<span class="hljs-keyword">value</span>) =&gt; (!validator(<span class="hljs-keyword">value</span>, options) &amp;&amp; message)

<span class="hljs-keyword">export</span> const checkRequired = (msg: <span class="hljs-keyword">string</span>) =&gt; <span class="hljs-keyword">check</span>(nonEmpty, msg)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> PostFormState {
  title = <span class="hljs-keyword">new</span> FieldState(<span class="hljs-string">''</span>).validators(
    checkRequired(<span class="hljs-string">'Title is required'</span>),
    <span class="hljs-keyword">check</span>(isLength, <span class="hljs-string">'Title must be at least 4 characters long.'</span>, { <span class="hljs-keyword">min</span>: <span class="hljs-number">4</span> }),
    <span class="hljs-keyword">check</span>(isLength, <span class="hljs-string">'Title cannot be more than 24 characters long.'</span>, { <span class="hljs-keyword">max</span>: <span class="hljs-number">24</span> }),
  )
  message = <span class="hljs-keyword">new</span> FieldState(<span class="hljs-string">''</span>).validators(
    checkRequired(<span class="hljs-string">'Message cannot be blank.'</span>),
    <span class="hljs-keyword">check</span>(isLength, <span class="hljs-string">'Message is too short, minimum is 50 characters.'</span>, { <span class="hljs-keyword">min</span>: <span class="hljs-number">50</span> }),
    <span class="hljs-keyword">check</span>(isLength, <span class="hljs-string">'Message is too long, maximum is 1000 characters.'</span>, { <span class="hljs-keyword">max</span>: <span class="hljs-number">1000</span> }),
  )
  <span class="hljs-keyword">form</span> = <span class="hljs-keyword">new</span> FormState({
    title: this.title,
    message: this.message
  })
}

</code></pre><p><a href="https://formstate.github.io/#/">formstate</a>的工作原理如下：对于表单的每个字段，您定义一个<code>FieldState</code>。传递的参数是初始值。<code>validators</code>属性接受一个函数，该函数在值有效时返回<code>false</code>，在值无效时返回一条验证消息。使用<code>check</code>和<code>checkRequired</code>辅助函数，它看起来都可以很好地声明。</p>
<p>要对整个表单进行验证，用一个<code>FormState</code>实例来包装这些字段是很有效的，从而提供聚合有效性。</p>
<pre><code class="hljs scala"><span class="hljs-meta">@inject</span>(<span class="hljs-symbol">'appStor</span>e', <span class="hljs-symbol">'formStor</span>e')
<span class="hljs-meta">@observer</span>
export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">FormComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component&lt;FormComponentProps</span>, <span class="hljs-title">any&gt;</span> </span>{
  render() {
    const { appStore, formStore } = <span class="hljs-keyword">this</span>.props
    const { postFormState } = formStore
    <span class="hljs-keyword">return</span> &lt;div&gt;
      &lt;h2&gt; <span class="hljs-type">Create</span> a <span class="hljs-keyword">new</span> post &lt;/h2&gt;
      &lt;h3&gt; <span class="hljs-type">You</span> are now posting as {appStore.username} &lt;/h3&gt;
      &lt;<span class="hljs-type">Input</span>
        <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-symbol">'tex</span>t'
        label=<span class="hljs-symbol">'Titl</span>e'
        name=<span class="hljs-symbol">'titl</span>e'
        error={postFormState.title.error}
        value={postFormState.title.value}
        onChange={postFormState.title.onChange}
      /&gt;
      &lt;<span class="hljs-type">Input</span>
        <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-symbol">'tex</span>t'
        multiline={<span class="hljs-literal">true</span>}
        rows={<span class="hljs-number">3</span>}
        label=<span class="hljs-symbol">'Messag</span>e'
        name=<span class="hljs-symbol">'messag</span>e'
        error={postFormState.message.error}
        value={postFormState.message.value}
        onChange={postFormState.message.onChange}
      /&gt;

</code></pre><p><code>FormState</code>实例提供了<code>value</code>，<code>onChange</code>，和<code>error</code>属性，可以很容易地用于任何前端组件。</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span>
        <span class="hljs-attr">label</span>=<span class="hljs-string">'Cancel'</span>
        <span class="hljs-attr">onClick</span>=<span class="hljs-string">{formStore.goBack}</span>
        <span class="hljs-attr">raised</span>
        <span class="hljs-attr">accent</span>
      /&gt;</span>  
      <span class="hljs-tag">&lt;<span class="hljs-name">Button</span>
        <span class="hljs-attr">label</span>=<span class="hljs-string">'Submit'</span>
        <span class="hljs-attr">onClick</span>=<span class="hljs-string">{formStore.submit}</span>
        <span class="hljs-attr">raised</span>
        <span class="hljs-attr">disabled</span>=<span class="hljs-string">{postFormState.form.hasError}</span>
        <span class="hljs-attr">primary</span>
      /&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  }
}

</code></pre><p>当<code>form.hasError</code>是<code>true</code>时，我们保持按钮不可用。“提交”按钮将表单提交给前面出现的GraphQL mutation。</p>
<h4>Angular</h4>
<p>在Angular中，我们将使用<code>FormService</code> 和<code>FormBuilder</code>，它们是<code>@angular/forms</code>包地组成部分。</p>
<pre><code class="hljs ada">@Component({
  selector: <span class="hljs-symbol">'app</span>-form',
  templateUrl: './form.component.html',
  providers: [
    FormService
  ]
})
export class FormComponent {
  postForm: FormGroup
  validationMessages = {
    <span class="hljs-symbol">'title</span>': {
      <span class="hljs-symbol">'required</span>': <span class="hljs-symbol">'Title</span> <span class="hljs-keyword">is</span> required.',
      <span class="hljs-symbol">'minlength</span>': <span class="hljs-symbol">'Title</span> must be <span class="hljs-keyword">at</span> least <span class="hljs-number">4</span> characters long.',
      <span class="hljs-symbol">'maxlength</span>': <span class="hljs-symbol">'Title</span> cannot be more than <span class="hljs-number">24</span> characters long.'
    },
    <span class="hljs-symbol">'message</span>': {
      <span class="hljs-symbol">'required</span>': <span class="hljs-symbol">'Message</span> cannot be blank.',
      <span class="hljs-symbol">'minlength</span>': <span class="hljs-symbol">'Message</span> <span class="hljs-keyword">is</span> too short, minimum <span class="hljs-keyword">is</span> <span class="hljs-number">50</span> characters',
      <span class="hljs-symbol">'maxlength</span>': <span class="hljs-symbol">'Message</span> <span class="hljs-keyword">is</span> too long, maximum <span class="hljs-keyword">is</span> <span class="hljs-number">1000</span> characters'
    }
  }

</code></pre><p>首先，让我们定义验证消息。
First, let’s define the validation messages.</p>
<pre><code class="hljs delphi"><span class="hljs-function"><span class="hljs-keyword">constructor</span><span class="hljs-params">(
    <span class="hljs-keyword">private</span> router: Router,
    <span class="hljs-keyword">private</span> formService: FormService,
    <span class="hljs-keyword">public</span> appService: AppService,
    <span class="hljs-keyword">private</span> fb: FormBuilder,
  )</span> <span class="hljs-comment">{
    this.createForm()
  }</span>

  <span class="hljs-title">createForm</span><span class="hljs-params">()</span> <span class="hljs-comment">{
    this.postForm = this.fb.group({
      title: ['',
        [Validators.required,
        Validators.minLength(4),
        Validators.maxLength(24)]
      ],
      message: ['',
        [Validators.required,
        Validators.minLength(50),
        Validators.maxLength(1000)]
      ],
    }</span>)
  }

</span></code></pre><p>使用<code>FormBuilder</code>，可以很容易地创建表单结构，甚至比在React示例中更加简洁。</p>
<pre><code class="hljs processing"><span class="hljs-built_in">get</span> validationErrors() {
    <span class="hljs-keyword">const</span> errors = {}
    <span class="hljs-keyword">Object</span>.keys(<span class="hljs-keyword">this</span>.postForm.controls).forEach(<span class="hljs-built_in">key</span> =&gt; {
      errors[<span class="hljs-built_in">key</span>] = <span class="hljs-string">''</span>
      <span class="hljs-keyword">const</span> control = <span class="hljs-keyword">this</span>.postForm.controls[<span class="hljs-built_in">key</span>]
      <span class="hljs-keyword">if</span> (control &amp;&amp; !control.valid) {
        <span class="hljs-keyword">const</span> messages = <span class="hljs-keyword">this</span>.validationMessages[<span class="hljs-built_in">key</span>]
        <span class="hljs-keyword">Object</span>.keys(control.errors).forEach(error =&gt; {
          errors[<span class="hljs-built_in">key</span>] += messages[error] + <span class="hljs-string">' '</span>
        })
      }
    })
    <span class="hljs-keyword">return</span> errors
  }

</code></pre><p>为了将可绑定的验证消息放到正确的位置，我们需要做一些处理。这段代码是从官方文件中提取的，有一些小的改动。基本上，在<code>FormService</code>中，字段只保留对活动错误的引用（通过验证器名称识别），因此我们需要手动将所需的消息配对到受影响的字段。这不完全是一个缺点；例如，它更容易国际化。</p>
<pre><code class="hljs stylus"><span class="hljs-function"><span class="hljs-title">onSubmit</span><span class="hljs-params">({ value, valid })</span></span> {
    <span class="hljs-keyword">if</span> (!valid) {
      return
    }
    this<span class="hljs-selector-class">.formService</span><span class="hljs-selector-class">.addPost</span>(value)
  }

  onCancel() {
    this<span class="hljs-selector-class">.router</span><span class="hljs-selector-class">.navigate</span>([<span class="hljs-string">'/posts'</span>])
  }
}

</code></pre><p>当表单是有效的，数据可以发送到GraphQL mutation。</p>
<pre><code class="hljs django"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span> Create a new post <span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span> You are now posting as </span><span class="hljs-template-variable">"{{"appService.username"}}"</span><span class="xml"> <span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">form</span> [<span class="hljs-attr">formGroup</span>]=<span class="hljs-string">"postForm"</span> (<span class="hljs-attr">ngSubmit</span>)=<span class="hljs-string">"onSubmit(postForm)"</span> <span class="hljs-attr">novalidate</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">md-input-container</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">mdInput</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"Title"</span> <span class="hljs-attr">formControlName</span>=<span class="hljs-string">"title"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">md-error</span>&gt;</span></span><span class="hljs-template-variable">"{{"validationErrors['title']"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">md-error</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">md-input-container</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">md-input-container</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">mdInput</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"Message"</span> <span class="hljs-attr">formControlName</span>=<span class="hljs-string">"message"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">md-error</span>&gt;</span></span><span class="hljs-template-variable">"{{"validationErrors['message']"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">md-error</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">md-input-container</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">md-raised-button</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">"onCancel()"</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"warn"</span>&gt;</span>Cancel<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
    <span class="hljs-attr">md-raised-button</span>
    <span class="hljs-attr">type</span>=<span class="hljs-string">"submit"</span>
    <span class="hljs-attr">color</span>=<span class="hljs-string">"primary"</span>
    [<span class="hljs-attr">disabled</span>]=<span class="hljs-string">"postForm.dirty &amp;&amp; !postForm.valid"</span>&gt;</span>Submit<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>

</span></code></pre><p>最重要的事情是引用我们用FormBuilder创建的formGroup，即在模板中用<code>[formGroup]="postForm"</code>分配的。表单上的字段通过<code>formControlName</code>属性绑定到表单数据上。当表单无效时，我们禁用“提交”按钮。我们还需要添加脏检查，因为在这里，非肮脏的表单仍然是无效的。我们希望按钮的初始状态被“启用”。</p>
<p>总结：验证和模板方面，React和Angular这种形式的方法是相当不同的。Angular的方法涉及更多的“魔术”，而不是直截了当的绑定，但另一方面，更完整和彻底。</p>
<h3>打包尺寸</h3>
<p>使用应用程序生成器的默认设置：特别是React的Tree Shaking和Angular AOT编译，压缩的JS生产包大小：</p>
<ul>
<li><p>Angular: 1200 KB</p>
</li>
<li><p>React: 300 KB</p>
</li>
</ul>
<p>好吧，这没什么好惊讶的。Angular一直是更大的一个。</p>
<p>使用gzip时，尺寸分别降至275kb和127kb。</p>
<p>记住，这里基本上都是供应商库。相比之下，实际应用程序代码的数量是最小的，在real-world应用程序中并非如此。在那里，这个比率可能是1：2，而不是1：4。另外，当你开始包含许多具有React的第三方库时，包大小也会增长很快。</p>
<h3>库的灵活性 vs 框架的稳健性</h3>
<p>关于Angular或React是否更适合web开发，看来我们还是不能找到一个的明确答案。</p>
<p>结果表明，依赖于我们使用React的库，React和Angular上的开发工作流可能非常相似。这主要是个人偏好的问题。</p>
<p>如果你喜欢现成的堆栈，强大的依赖注入和计划使用一些RxJS的好东西，选择Angular。</p>
<p>如果你喜欢自己组装和构建堆栈，那么你喜欢JSX的直截了当，并且更喜欢更简单的可计算属性，选择React/MobX。</p>
<p>再次，您可以从<a href="https://github.com/tomaash/shoutboard-angular">Angular源码</a> 和 <a href="https://github.com/tomaash/shoutboard-react">React源码</a>获得本文中的完整源代码。</p>
<p>或者，如果你喜欢完整的，RealWorld例子：</p>
<ul>
<li><p><a href="https://github.com/gothinkster/angular-realworld-example-app">RealWorld Angular 4+</a></p>
</li>
<li><p><a href="https://github.com/gothinkster/react-mobx-realworld-example-app">RealWorld React/MobX</a></p>
</li>
</ul>
<h3>先选择你的编程范式</h3>
<p>用React/Mobx编程实际上比用React/Redux编程更接近Angular。虽然在模板和依赖关系管理方面存在一些显著的差异，但它们具有相同的可变数据绑定范式。</p>
<p>具有不变或单一范式的React/Redux是一个完全不同的模式。</p>
<p>别被Redux库的小巧给愚弄了。它可能很小，但却是一个框架。Redux的多数最佳实践都集中在应用Redux兼容的库，如<a href="https://redux-saga.js.org/">Redux Saga</a>用于同步代码和数据提取，<a href="http://redux-form.com/">Redux From</a>用于表单管理，<a href="https://github.com/reactjs/reselect">Reselect</a> 用于记忆选择器（Redux的计算值），<a href="https://github.com/acdlite/recompose">Recompose</a> 包括其他库用于生命周期管理。在Redux社区中，从<a href="https://facebook.github.io/immutable-js/">Immutable.js</a> 到 <a href="http://ramdajs.com/">Ramda</a> 或 <a href="https://github.com/lodash/lodash/wiki/FP-Guide">lodash/fp</a>，存在一个工具使用普通的js对象而不是转换它们。</p>
<p>Redux一个很好的例子是众所周知的 <a href="https://github.com/react-boilerplate/react-boilerplate">React Boilerplate</a>。它是一个强大的开发栈，但是如果你看看它，就会发现它与我们在这篇文章中看到的其它东西非常不同。</p>
<p>从javascript社区中较活跃的部分来看，我觉得Angular受到了不公平的对待。许多对它表示不满的人可能不会欣赏到在古老的AngularJS和今天的Angular之间发生的巨大变化。在我看来，这是一个非常干净和富有成效的框架，如果它出现在1-2年前，它将会给世界带来风暴。</p>
<p>然而，Angular正在夺取坚实的立足点，特别是在拥有大团队，需要标准化和长期支持的企业界。或者用另一种方式来说，如果还有什么意义的话，Angular是谷歌工程师认为的web应该如何开发的一种模式。</p>
<p>对于mobx，也适用类似的评估。本身很好，但没得到充分的赞赏。</p>
<p>最后：在选择React和Angular之前，先选择你的编程范式。</p>
<p>可变/数据绑定，或不变/单向，这似乎是真正的问题。</p>
<blockquote>
<p>希望你喜欢这篇文章！<a href="https://www.toptal.com/front-end/angular-vs-react-for-web-development">这篇文章</a> 最初是在<a href="https://www.toptal.com/front-end/">Toptal</a>发布的，并经许可重新发布。</p>
</blockquote>
<hr>
<h4>❤ 如果这篇文章有帮助，可以查看一下链接</h4>
<h4>❤ If this post was helpful, please hit the little blue heart</h4>
<ul>
<li><p><a href="https://codeburst.io/tagged/javascript?source=post">JavaScript</a></p>
</li>
<li><p><a href="https://codeburst.io/tagged/react?source=post">React</a></p>
</li>
<li><p><a href="https://codeburst.io/tagged/angularjs?source=post">Angularjs</a></p>
</li>
<li><p><a href="https://codeburst.io/tagged/technology?source=post">Technology</a></p>
</li>
<li><p><a href="https://codeburst.io/tagged/web-development?source=post">Web Development</a></p>
</li>
</ul>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular vs. React：哪个更适合Web开发?

## 原文链接
[https://www.zcfy.cc/article/angular-vs-react-which-is-better-for-web-development](https://www.zcfy.cc/article/angular-vs-react-which-is-better-for-web-development)

