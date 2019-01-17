---
title: 'Angular 4.x 修仙之路' 
date: 2019-01-18 2:30:34
hidden: true
slug: cvo1836hsva
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><strong>阅读 Angular 6/RxJS 最新教程，请访问<a href="http://www.semlinker.com/" rel="nofollow noreferrer" target="_blank">前端修仙之路</a></strong></blockquote>
<p>本人的前端修仙之路订阅号，会定期分享 Angular、RxJS、TypeScript 和 Node.js 相关文章，欢迎感兴趣的小伙伴订阅哈！</p>
<p><span class="img-wrap"><img data-src="/img/bVbhWcc?w=258&amp;h=258" src="https://static.alili.tech/img/bVbhWcc?w=258&amp;h=258" alt="fer_road_qrcode" title="fer_road_qrcode" style="cursor: pointer; display: inline;"></span></p>
<p>近期回答了 SF 上和 QQ 群里面的一些问题，发现一些问题对初学者来说，都可能会遇到。个人精力有限，建了个群有兴趣的朋友可以加一下 QQ 群：<strong>Angular 修仙之路(1)群 - 153742079 (已满)，请加 Angular 修仙之路(2)群 - 648681235</strong>。此外该文章也会持续更新，希望有兴趣的读者多提建议哈，谢谢！</p>
<blockquote>首先自我介绍一下：我不是"大神"，因为还在修仙中哈。下面是在学习 Angular 过程中整理的学习笔记，希望对大家能有所帮助，更详细和更权威的学习资源，请大家阅读官方文档。另外，本系列的出发点是从点到面的思路，把 Angular 中的知识点打散掉，然后逐一介绍，尽量会使用简单的示例，让大家基础掌握每个知识点，最后才会通过具体实例把知识点串起来。(不喜欢该方式的读者，请见谅哈)</blockquote>
<h3 id="articleHeader0">Angular 6.x 新版教程</h3>
<ul>
<li>
<p>入门篇</p>
<ul>
<li><a href="https://semlinker.com/ng-quick-start/" rel="nofollow noreferrer" target="_blank">Angular 6 快速入门</a></li>
<li><a href="https://semlinker.com/ng-base-tutorial/" rel="nofollow noreferrer" target="_blank">Angular 6 基础教程</a></li>
<li><a href="https://semlinker.com/ng-pipe-quick-start/" rel="nofollow noreferrer" target="_blank">Angular 6 管道快速入门</a></li>
<li><a href="https://semlinker.com/ng-form-quick-start/" rel="nofollow noreferrer" target="_blank">Angular 6 表单快速入门</a></li>
<li><a href="https://semlinker.com/ng-directive-quick-start/" rel="nofollow noreferrer" target="_blank">Angular 6 指令快速入门</a></li>
<li><a href="https://semlinker.com/ng-http-client/" rel="nofollow noreferrer" target="_blank">Angular 6 HttpClient 快速入门</a></li>
<li><a href="https://semlinker.com/ng-library-quickstart/" rel="nofollow noreferrer" target="_blank">Angular Library 快速入门</a></li>
</ul>
</li>
<li>
<p>工具篇</p>
<ul>
<li><a href="https://semlinker.com/ng-compodoc-intro/" rel="nofollow noreferrer" target="_blank">Angular 工具篇之文档管理</a></li>
<li><a href="https://semlinker.com/ng-verson-manage/" rel="nofollow noreferrer" target="_blank">Angular 工具篇之规范化Git版本管理</a></li>
<li><a href="https://semlinker.com/ng-vsc-debugger/" rel="nofollow noreferrer" target="_blank">Angular 工具篇之VSCode调试</a></li>
<li><a href="https://semlinker.com/ng-storybook/" rel="nofollow noreferrer" target="_blank">Angular 工具篇之Storybook</a></li>
<li><a href="https://semlinker.com/ng-translate-and-extract/" rel="nofollow noreferrer" target="_blank">Angular 工具篇之国际化处理</a></li>
<li><a href="https://semlinker.com/ng-npx-and-ghpages/" rel="nofollow noreferrer" target="_blank">Angular 工具篇之npx及angular-cli-ghpages</a></li>
<li><a href="https://semlinker.com/ng-bundle-analyzer/" rel="nofollow noreferrer" target="_blank">Angular 工具篇之分析包的大小</a></li>
</ul>
</li>
<li>
<p>服务篇</p>
<ul>
<li><a href="https://semlinker.com/ng-meta-service/" rel="nofollow noreferrer" target="_blank">Angular Meta Service 详解</a></li>
<li><a href="https://semlinker.com/ng-title-service/" rel="nofollow noreferrer" target="_blank">Angular Title Service 详解</a></li>
</ul>
</li>
<li>
<p>Provider篇</p>
<ul><li><a href="https://semlinker.com/ng-app-initializer/" rel="nofollow noreferrer" target="_blank">Angular Multi Providers 和 APP_INITIALIZER</a></li></ul>
</li>
<li>
<p>Element篇</p>
<ul>
<li><a href="https://semlinker.com/viewchild-and-viewchildren/" rel="nofollow noreferrer" target="_blank">Angular ViewChild和ViewChildren</a></li>
<li><a href="https://semlinker.com/ng-template-vs-ng-container/" rel="nofollow noreferrer" target="_blank">Angular ng-template vs ng-container</a></li>
<li><a href="https://semlinker.com/ng-content-projection/" rel="nofollow noreferrer" target="_blank">Angular 内容投影</a></li>
</ul>
</li>
<li>
<p>RxJS篇</p>
<ul>
<li><a href="https://semlinker.com/rxjs-observable/" rel="nofollow noreferrer" target="_blank">RxJS Observable</a></li>
<li><a href="https://semlinker.com/rxjs-create-observable/" rel="nofollow noreferrer" target="_blank">创建 Observable</a></li>
<li><a href="https://semlinker.com/rxjs-merge-map-and-switch-map/" rel="nofollow noreferrer" target="_blank">RxJS mergeMap和switchMap</a></li>
<li><a href="https://semlinker.com/rxjs-handle-multi-http-request/" rel="nofollow noreferrer" target="_blank">RxJS 处理多个Http请求</a></li>
</ul>
</li>
</ul>
<h3 id="articleHeader1">Angular 4.x 快速入门</h3>
<ul>
<li>
<p><a href="https://segmentfault.com/a/1190000009733649">Angular 4 快速入门</a></p>
<ul><li>涉及 Angular 简介、环境搭建、插件表达式、自定义组件、表单模块、Http 模块等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009819720" target="_blank">Angular 4 基础教程</a></p>
<ul><li>涉及 Angular CLI 使用、创建组件、事件、自定义服务、 ngFor 指令、Input、Output 装饰器等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009674089">Angular 4 指令快速入门</a></p>
<ul><li>涉及如何创建指令、定义输入属性、事件处理、如何获取宿主元素属性值、如何创建结构指令等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009652980" target="_blank">Angular 4 表单快速入门</a></p>
<ul><li>涉及如何创建表单、表单验证、表单控件状态、单选控件、多选控件的使用等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009971088">Angular 表单简介</a></p>
<ul><li>涉及 Template-driven 表单与 Reactive 表单的特点、表单控件状态、Reactive 表单简介等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009265310" target="_blank">Angular 4.x 路由快速入门</a></p>
<ul><li>涉及路由简介、如何配置路由、动态路由、子路由、路由指令及路由相关 API 等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009873313">TypeScript 简介</a></p>
<ul><li>涉及 TypeScript 数据类型、复合类型、箭头函数、可选参数、默认参数、对象解构、数组解构等</li></ul>
</li>
</ul>
<h3 id="articleHeader2">Angular 4.x 组件学习线路 (仅供参考)</h3>
<p>对于刚从 Angular 1.x 转到 Angular 4.x 的用户，建议先阅读一下 <code>Angular 4.x vs Angular 1.x</code> 章节 (目前还不够完善)。下面提供的学习线路仅供参考，读者可以自行选读。该学习线路基本包含 Angular 4.x 组件相关知识，如果有遗漏，欢迎大家指出。(友情提示：初学者不用完整了解每个部分的内容，特别是设计源码分析的部分，只需了解基本用法，然后多实践哈)</p>
<ul>
<li>
<p><a href="https://segmentfault.com/a/1190000008625978" target="_blank">Angular 4.x Template Syntax &amp; Common Directives</a></p>
<ul><li>了解 Angular 4.x 模板语法和常用内建指令(更新ngIf...Else)</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008626070">Angular 4.x Directive</a></p>
<ul><li>了解指令与组件的区别及Metadata信息</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008716308" target="_blank">Angular 4.x Directive Lifecycle</a></p>
<ul><li>了解常用的 ngOnInit、ngOnChanges、ngAfterViewInit、ngAfterContentInit 声明周期钩子和触发顺序</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008685752">Angular 4.x constructor &amp; ngOnInit</a></p>
<ul><li>了解 constructor 与 ngOnInit 钩子的应用场景</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008677532" target="_blank">Angular 4.x ViewEncapsulation</a></p>
<ul><li>了解 ViewEncapsulation 三种封装模式的区别</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008780672">Angular 4.x Input</a></p>
<ul><li>了解 @Input() 装饰器的用法，掌握如何实现父 -&gt; 子组件通信</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008794323" target="_blank">Angular 4.x Output</a></p>
<ul><li>了解 @Output() 装饰器的用法，掌握如何实现子 -&gt; 父组件通信</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008695459">Angular 4.x ViewChild &amp; ViewChildren</a></p>
<ul><li>了解 @ViewChild()、@ViewChildren() 装饰器用法，掌握如何获取子组件</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008707828" target="_blank">Angular 4.x ContentChild &amp; ContentChildren</a></p>
<ul><li>了解 @ContentChild()、@ContentChildren() 装饰器用法及与@ViewChild()、@ViewChildren() 装饰器的区别</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008878888">Angular 4.x HostListener &amp; HostBinding</a></p>
<ul><li>了解宿主元素的概念及 @HostListener()、@HostBinding() 装饰器的作用</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008653690" target="_blank">Angular 4.x ElementRef</a></p>
<ul><li>了解 ElementRef 的作用、定义及应用、Renderer API 常用方法</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008672478">Angular 4.x TemplateRef &amp; ViewContainerRef</a></p>
<ul><li>了解 TemplateRef 及 ViewContainerRef 的应用</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008959575" target="_blank">Angular 4.x Components Communicate</a></p>
<ul><li>了解组件通信的常用方式</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008976996">Angular 4.x Component Inheritance</a></p>
<ul><li>了解面向对象中类和继承的概念及Angular 4.x 组件继承的应用</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008747225" target="_blank">Angular 4.x Change Detection - 1</a>、<a href="https://segmentfault.com/a/1190000008754052">Angular 4.x Change Detection - 2</a></p>
<ul><li>了解 Angular 4.x 变化检测、组件变化检测器及OnPush 策略、Mutable &amp; Immutable、ChangeDetectorRef、Observables 等内容</li></ul>
</li>
</ul>
<h3 id="articleHeader3">Angular 4.x vs Angular 1.x</h3>
<ul>
<li>
<p><a href="https://segmentfault.com/a/1190000008938966" target="_blank">Angular 4.x NgModule vs Angular 1 module</a></p>
<ul><li>涉及 Angular 1.x 根模块、子模块及 Angular 4.x 根模块、根组件、子组件的定义使用</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008936740">Angular 4.x Service vs Angular 1 Service</a></p>
<ul><li>涉及 Angular 4.x 和 Angular 1 如何定义 service及使用方式</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008937627" target="_blank">Angular 4.x Pipe vs Angular 1 filter</a></p>
<ul><li>涉及 Angular 自定义管道(过滤器)、管道(过滤器)传参、管道对象($filter) 服务的使用</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008938059">Angular 4.x ngFor vs Angular 1 ng-repeat</a></p>
<ul><li>涉及 Angular *ngFor(ng-repeat) 指令使用、index($index)、trackBy(track by ) 的应用的区别</li></ul>
</li>
</ul>
<h3 id="articleHeader4">Provider</h3>
<ul>
<li>
<p><a href="https://segmentfault.com/a/1190000008626130" target="_blank">Angular 4.x Provider</a></p>
<ul><li>涉及 useClass、useValue、useExisting、useFactory 及 Provider 使用方式</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008626215">Angular 4.x Multi Providers</a></p>
<ul><li>涉及 multi provider 作用及 Angular 4.x 内部应用</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008626276" target="_blank">Angular 4.x Forward Reference</a></p>
<ul><li>涉及 forwardRef 的作用及内部工作原理，同时解释 JavaScript 解释器不能自动提升 Class</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008626348">Angular 4.x OpaqueToken &amp; InjectionToken</a></p>
<ul><li>涉及使用字符串作为 Token存在问题，详细介绍如何使用 OpaqueToken、InjectionToken 解决问题</li></ul>
</li>
</ul>
<h3 id="articleHeader5">Directive(指令)</h3>
<ul>
<li>
<p><a href="https://segmentfault.com/a/1190000008625978" target="_blank">Angular 4.x Template Syntax &amp; Common Directives</a></p>
<ul><li>涉及模板语法、常用指令简介及 NgStyle 指令解析、*ngFor trackBy 应用等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008626070">Angular 4.x Directive</a></p>
<ul><li>涉及指令分类、Angular 4.x 内置属性指令、结构指令、<code>*directive</code> 结构指令语法糖、自定义属性指令、结构指令等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009307714" target="_blank">Angular 2.x 结构指令</a></p>
<ul><li>涉及结构指令定义、<code>*</code> 号语法及具体应用示例</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008716308">Angular 4.x Directive Lifecycle</a></p>
<ul><li>涉及指令与组件的区别、指令生命周期钩子的作用及调用顺序、生命周期钩子详解、Angular 4.x LifecycleHooks、SimpleChanges 相关接口等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009499160" target="_blank">Angular 4.x NgIf</a></p>
<ul><li>涉及 NgIf 指令作用、语法、基础用法及 NgIf 指令源码分析</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009536294">Angular 4.x NgForOf</a></p>
<ul><li>涉及 NgForOf 指令作用、语法、基础用法及 NgForOf 指令源码分析</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009530554" target="_blank">Angular 4.x NgTemplateOutlet</a></p>
<ul><li>涉及 NgTemplateOutlet 指令作用、语法、基础用法及 NgTemplateOutlet 指令源码分析</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000010350758">Angular 中自定义 Debounce Click 指令</a></p>
<ul><li>涉及 Directive API 来创建自定义 debounce click 指令，用于处理指定时间内多次点击事件</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008959575" target="_blank">Angular 4.x Components Communicate</a></p>
<ul><li>涉及组件通信的常用方式：@Input、@Output、@ViewChild、模板变量、MessageService、Broadcaster (Angular 1.x $rootScope 中 $on、$broadcast ) 和 Pub - Sub 模式、RxJS Subject 存在的问题</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008986205">Angular 4.x Pass Async Data</a></p>
<ul><li>涉及父子组件通信时，处理异步输入属性的方案</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008976996" target="_blank">Angular 4.x Component Inheritance</a></p>
<ul><li>涉及面向对象中类和继承的概念及Angular 4.x 组件继承的应用及注意事项</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009175508">Angular 4.x Dynamically Creating Components</a></p>
<ul><li>涉及 Angular 中如何动态创建组件及介绍 <code>&lt;ng-container&gt;</code> 指令的作用</li></ul>
</li>
</ul>
<h3 id="articleHeader6">Decorator(装饰器)</h3>
<ul>
<li>
<p><a href="https://segmentfault.com/a/1190000008626417" target="_blank">Angular 4.x Decorator - 1</a></p>
<ul><li>涉及装饰器定义和分类、TypeScript 类装饰器、属性装饰器、方法装饰器、参数装饰器等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008626579">Angualr 4.x Decorator - 2</a></p>
<ul><li>涉及 Angular 4.x 类装饰器、属性装饰器、方法装饰器、参数装饰器示例</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008626625" target="_blank">Angular 4.x Decorator - 3</a></p>
<ul><li>涉及 Angular 4.x Metadata 分类：annotations、design:paramtypes、propMetadata、parameters 及映射关系</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008780672">Angular 4.x Input</a></p>
<ul><li>涉及 @Input、@Input('bindingPropertyName')、@Component() - inputs、setter &amp; getter 、ngOnChanges 等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008794323" target="_blank">Angular 4.x Output</a></p>
<ul><li>涉及 @Output、@Output('bindingPropertyName')、@Component() - outputs、Two-Way Data Binding、[()] 语法示例、ngModel 等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008634359">Angular 4.x Inject Decorator</a></p>
<ul><li>涉及 @Inject 装饰器的作用、实际应用及内部实现，并解释了非 Type 类型的参数只能用 @Inject(Something) 的方式注入的原因，此外还介绍了 @Injectable、Reflect API 等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008695459" target="_blank">Angular 4.x ViewChild &amp; ViewChildren</a></p>
<ul><li>涉及 @ViewChild、@ViewChildren 装饰器使用及 @ViewChild 装饰器原理详解</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008707828">Angular 4.x ContentChild &amp; ContentChildren</a></p>
<ul><li>涉及 @ContentChild、@ContentChildren 装饰器使用及 @ContentChild 接口及装饰器，同时介绍了  Content Projection (内容投影) 的概念及 @ContentChild 与 @ViewChild 装饰器的区别等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008878888" target="_blank">Angular 4.x HostListener &amp; HostBinding</a></p>
<ul><li>涉及 Host Element、HostListener 装饰器定义及应用、Host  Event Listener、HostBinding 装饰器定义及应用、Host Property Bindings 等</li></ul>
</li>
</ul>
<h3 id="articleHeader7">Pipe(管道)</h3>
<ul>
<li>
<p><a href="https://segmentfault.com/a/1190000008646187">Angular 4.x Pipe</a></p>
<ul><li>Angular 4.x 内建管道分类及使用示例、管道参数、管道链、自定义管道、管道分类、管道探秘等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008759314" target="_blank">Angular 4.x AsyncPipe</a></p>
<ul><li>涉及 AsyncPipe with Promise、AsyncPipe with Observables、使用 AsyncPipe 重复发送请求的解决方案及 AsyncPipe 内部执行流程 (源码解析)</li></ul>
</li>
</ul>
<h3 id="articleHeader8">Dependency Injection(依赖注入)</h3>
<ul>
<li>
<p><a href="https://segmentfault.com/a/1190000009612113">Angular 4 依赖注入教程之一 依赖注入简介</a></p>
<ul><li>涉及依赖注入的基础知识及在 Angular 中的应用</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009631138" target="_blank">Angular 4 依赖注入教程之二 组件服务注入</a></p>
<ul><li>涉及 Angular 服务的定义及组件中服务的注入方式</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009632566">Angular 4 依赖注入教程之三 ClassProvider的使用</a></p>
<ul><li>涉及 Angular 中 ClassProvider 的基础知识及使用</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009642753" target="_blank">Angular 4 依赖注入教程之四 FactoryProvider的使用</a></p>
<ul><li>涉及 Angular 中 FactoryProvider 的基础知识及使用</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009643271">Angular 4 依赖注入教程之五 FactoryProvider配置依赖对象</a></p>
<ul><li>涉及 Angular 中 FactoryProvider 如何配置依赖对象</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009645391" target="_blank">Angular 4 依赖注入教程之六 Injectable 装饰器</a></p>
<ul><li>涉及 Angular 中 Injectable 装饰器的作用</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009646551">Angular 4 依赖注入教程之七 ValueProvider的使用</a></p>
<ul><li>涉及 Angular 中 ValueProvider 的基础知识及使用</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009648572" target="_blank">Angular 4 依赖注入教程之八 InjectToken的使用</a></p>
<ul><li>涉及 Angular 中 InjectToken 的基础知识及作用</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008626680">Angular 4.x IoC &amp; DI</a></p>
<ul><li>涉及 IoC 和 DI、DI 在 AngularJS 1.x 中的应用、内部工作原理及存在的问题等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009283057" target="_blank">Angular 4.x Injector</a></p>
<ul><li>涉及依赖注入的概念及Angular 4.x 注入器的内部实现</li></ul>
</li>
</ul>
<h3 id="articleHeader9">Change Detection(变化检测)</h3>
<ul>
<li>
<p><a href="https://segmentfault.com/a/1190000008747225">Angular 4.x Change Detection - 1</a></p>
<ul><li>涉及变化和变化触发源、Zones、NgZone 及如何访问 Zone 打补丁前的方法，如 setTimeout、clearTimeout 等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008754052" target="_blank">Angular 4.x Change Detection - 2</a></p>
<ul><li>涉及组件和变化检测器、OnChanges、变化检测性能优化、OnPush 策略、Mutable &amp; Immutable、ChangeDetectorRef、Observables 等</li></ul>
</li>
</ul>
<h3 id="articleHeader10">Http</h3>
<ul>
<li>
<p><a href="https://segmentfault.com/a/1190000008900299">Angular 4.x Http Module - HTTP</a></p>
<ul><li>涉及 B/S、URI、MIME、HTTP请求和响应报文、HTTP 请求方法和状态码，并收录了 HTTP 经典教程和相关工具，如 Cookie 与 Session、HTTP 缓存、CORS、HTTP/2、HTTPS及常用的HTTP抓包工具、Chrome相关插件、各平台HTTP包、压力测试工具等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008950789" target="_blank">Angular 4.x Http Module - XMLHttpRequest</a></p>
<ul><li>涉及 AJAX、XMLHTTP、XMLHttpRequest详解、XMLHttpRequest Level 1、Level 2 详解、XHR 上传、下载数据、XHR 流式传输、XHR 定时轮询和长轮询区别与优缺点、XMLHttpRequest 常用代码片段、常见问题等</li></ul>
</li>
<li><a href="https://juejin.im/entry/58ea34eda22b9d0058a59836/detail" rel="nofollow noreferrer" target="_blank">Angular 4.x HttpModule 脑图(思维导图)</a></li>
<li>
<p><a href="https://segmentfault.com/a/1190000009028150">Angular 4.x HttpModule Reveal(源码揭秘)</a></p>
<ul><li>涉及 HTTP 协议、HTTP 请求报文、HTTP 响应报文、HttpModule Request、Response、RequestOptions、ResponseOptions、XHRBackend 对象等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000010088631" target="_blank">使用 RxJS 处理多个 Http 请求</a></p>
<ul><li>涉及使用 RxJS mergeMap 和 forkJoin 操作符处理多个 Http 请求</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000010116848">激动人心的 Angular HttpClient</a></p>
<ul><li>涉及 Angular 4.3 版本中 HttpClient 的主要特性，如默认 JOSN 解析、支持拦截器和进度事件等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000010259536" target="_blank">Angular HTTP Client 快速入门</a></p>
<ul><li>涉及 Angular 4.3 版本中 HttpClient 的使用示例，如发送 Get 请求、设置查询参数、设置请求头、发送其它 Http 请求、并行发送多个请求、顺序发送 Http 请求、异常处理、拦截器和进度事件等</li></ul>
</li>
</ul>
<h3 id="articleHeader11">Form(表单)</h3>
<ul>
<li>
<p><a href="https://segmentfault.com/a/1190000009912108">Angular 表单控件示例</a></p>
<ul><li>涉及 Template-driven 表单常用控件，如 text、radio、select (基本类型、对象)、multi select、cascading select (级联)、multi checkbox 等控件的使用</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009037539" target="_blank">Angular 4.x Template Driven Forms</a></p>
<ul><li>涉及 ngModel、[ngModel]、[(ngModel)]、ngModelGroup、Template-Driven error validation</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009041192">Angular 4.x Reactive Forms</a></p>
<ul><li>涉及 FormControl、FormGroup、Reactive Submit、Reactive Forms error validation、FormBuilder</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000010064866" target="_blank">Angular 4.x Reactive Form 表单验证</a></p>
<ul><li>涉及 Reactive 表单内建验证规则、动态调整验证规则、自定义验证器、跨字段验证等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009045615">Angular 4.x 基于AbstractControl自定义表单验证</a></p>
<ul><li>涉及 FormGroup、FormBuilder与FormGroup源码、AbstractControl、自定义验证规则等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009070500" target="_blank">Angular 4.x Custom Form Control</a></p>
<ul><li>涉及 ControlValueAccessor、自定义验证规则等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009053752">Angular 4.x Custom Validator Directive</a></p>
<ul><li>涉及 required、email、minlength 等内建 validators、自定义验证指令</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009090037" target="_blank">Angular 4.x Forms patchValue and setValue</a></p>
<ul><li>涉及 FormControl 和 FormGroup 类 patchValue() 和 setValue() 方法的使用和区别</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009126012">Angular 4.x ngModel 双向绑定原理揭秘</a></p>
<ul><li>涉及 ngModel 使用示例(单向绑定、双向绑定、ngModelOptions、disabled等)及ngModel 双向绑定实现原理</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009186703" target="_blank">Angular 4.x Creating Dynamic Form</a></p>
<ul><li>涉及动态创建表单的相关内容</li></ul>
</li>
</ul>
<h3 id="articleHeader12">Router</h3>
<ul>
<li>
<p><a href="https://segmentfault.com/a/1190000009265310">Angular 4.x 路由快速入门</a></p>
<ul><li>涉及路由配置、动态路由、子路由、routerLink、routerLinkActive 指令及 Router API。</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009238481" target="_blank">Angular 4.x LocationStrategy</a></p>
<ul><li>涉及 History 对象、Hash 模式和 HTML 5模式及 Angular 中的HashLocationStrategy 和 PathLocationStrategy 策略。</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009255145">Angular 4.x Router Link Directives</a></p>
<ul><li>涉及 Angular 4.x Router 中 RouterLink、RouterLinkWithHref 及 RouterLinkActive 指令的相关内容</li></ul>
</li>
</ul>
<h3 id="articleHeader13">Events</h3>
<ul>
<li>
<p><a href="https://segmentfault.com/a/1190000009149495" target="_blank">Angular 4.x Events Bubbling</a></p>
<ul><li>涉及 Angular 4.x 中事件冒泡机制及介绍如何基于 Angular 指令系统，实现阻止冒泡指令</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009156250">Angular 4.x EventManager &amp; Custom EventManagerPlugin</a></p>
<ul><li>涉及 Angular 4.x 中 EventManager (事件管理器) 工作原理及介绍如何自定义 EventManagerPlugin 插件</li></ul>
</li>
</ul>
<h3 id="articleHeader14">Compiler(编译器)</h3>
<ul>
<li>
<p><a href="https://segmentfault.com/a/1190000008739157" target="_blank">Angular 4.x JIT vs AOT</a></p>
<ul><li>涉及 Just-In-Time &amp; Ahead-Of-Time、JIT vs AOT 、AOT 详解、AOT 实战等</li></ul>
</li>
<li>Angular 4.x Compiler (未完成)</li>
</ul>
<h3 id="articleHeader15">Reference Object(引用对象)</h3>
<ul>
<li>
<p><a href="https://segmentfault.com/a/1190000008653690">Angular 4.x ElementRef</a></p>
<ul><li>涉及 ElementRef 的作用、定义及应用、Renderer API 常用方法</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008672478" target="_blank">Angular 4.x TemplateRef &amp; ViewContainerRef</a></p>
<ul><li>涉及 HTML 5 template、TemplateRef 及 ViewContainerRef 的应用，此外介绍了 Angular 4.x 视图类型、ViewRef 与 EmbeddedViewRef 之间的关系等</li></ul>
</li>
</ul>
<h3 id="articleHeader16">RxJS</h3>
<ul>
<li>
<p><a href="https://segmentfault.com/a/1190000008794344">Functional Programming</a></p>
<ul><li>涉及函数式编程概念、基础条件、重要特性、优势、常用方法等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008809168" target="_blank">Observable</a></p>
<ul><li>涉及观察者、迭代器模式、Observable提案、自定义Observable、Create Operators、Observer、Pull vs Push、Observable vs Promise 等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008834251">Operators</a></p>
<ul><li>涉及 Marble diagrams、Create Operators、Transformation Operators、Filtering Operators、Combination Operators、Utility Operators 等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008886598" target="_blank">Subject</a></p>
<ul><li>涉及观察者模式定义、结构及实战、Observable subscribe、自定义 Subject、RxJS Subject、Angular 4.x RxJS Subject 应用、BehaviorSubject、ReplaySubject、AsyncSubject 等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009924164">RxJS - Observables, observers 和 operators 简介</a></p>
<ul><li>涉及自定义 Observable、Operators 的相关知识</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000010011945" target="_blank">自定义 toJSON 操作符</a></p>
<ul><li>涉及 RxJS 中自定义操作符的相关知识</li></ul>
</li>
</ul>
<h3 id="articleHeader17">Others(其他)</h3>
<ul>
<li>
<p><a href="https://segmentfault.com/a/1190000008677532">Angular 4.x ViewEncapsulation</a></p>
<ul><li>涉及 Web Components、Shadow DOM 及 ViewEncapsulation 三种封装模式的区别</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008685752" target="_blank">Angular 4.x constructor &amp; ngOnInit</a></p>
<ul><li>涉及 constructor、ngOnInit、constructor &amp; ngOnInit 应用场景等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000008809095">Angular 4.x DomSanitizer</a></p>
<ul><li>涉及 Cross-site scripting、Angular 4.x XSS 防护、DomSanitizer、自定义 keepHtml 指令等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009396664" target="_blank">Angular NgModule 作用域相关问题</a></p>
<ul><li>涉及 Angular NgModule 作用域的相关问题</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009771946">Angular CLI 终极指南</a></p>
<ul><li>涉及 Angular CLI 简介及详细介绍了 Angular CLI 支持的功能，如新建项目、单元测试、项目构建等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000009824380" target="_blank">ng-conf-2017 - Angular Form Validation</a></p>
<ul><li>涉及表单验证概述、同步验证、异步验证及表单验证执行流程等</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000010104703">Angular 中何时取消订阅</a></p>
<ul><li>涉及 Angular 需手动释放资源和无需手动释放资源的场景</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000010438679" target="_blank">Angular 开发者常犯的错误</a></p>
<ul><li>涉及 Angular 开发过程中，常犯的错误，如 ngOnChanges vs ngDoCheck、未及时释放资源、额外取消订阅操作等内容</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000010730597">ng-content 中隐藏的内容</a></p>
<ul><li>涉及 targeted projection、ngProjectAs 及 ng-content 使用过程中可能遇到的问题及解决方案。</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000010326100" target="_blank">Angular Renderer (渲染器)</a></p>
<ul><li>涉及 Angular 中平台和渲染器的概念、Angular 渲染器工作原理、DefaultDomRenderer2 及 DomRendererFactory2 内部应用</li></ul>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000010130073">TypeScript 资源集</a></p>
<ul><li>涉及 TypeScript 技术选型、教程、项目实战、中英文视频教程和中英文书籍等</li></ul>
</li>
</ul>
<hr>
<h3 id="articleHeader18">PWA</h3>
<ul>
<li><a href="https://steemit.com/cn-programming/@semlinker/pwa-fetch-api" rel="nofollow noreferrer" target="_blank">PWA 学习笔记之 fetch API</a></li>
<li><a href="https://steemit.com/cn-programming/@semlinker/pwa-cachestorage-api" rel="nofollow noreferrer" target="_blank">PWA 学习笔记之 CacheStorage API</a></li>
<li><a href="https://steemit.com/cn-programming/@semlinker/pwa-service-workers" rel="nofollow noreferrer" target="_blank">PWA 学习笔记之 Service Workers</a></li>
<li><a href="https://steemit.com/cn-programming/@semlinker/pwa-service-workers-cache-control" rel="nofollow noreferrer" target="_blank">PWA 学习笔记之 Service Workers Cache Control</a></li>
<li><a href="https://steemit.com/cn-programming/@semlinker/pwa-web-notifications-api" rel="nofollow noreferrer" target="_blank">PWA 学习笔记之 Web Notifications API</a></li>
<li><a href="https://steemit.com/cn-programming/@semlinker/pwa-push-api" rel="nofollow noreferrer" target="_blank">PWA 学习笔记之 Push API</a></li>
</ul>
<h3 id="articleHeader19">Node.js</h3>
<h4>深入学习 Node.js</h4>
<ul>
<li><a href="https://github.com/semlinker/node-deep/blob/master/event/%E6%B7%B1%E5%85%A5%E5%AD%A6%E4%B9%A0%20Node.js%20EventEmitter.md" rel="nofollow noreferrer" target="_blank">深入学习 Node.js EventEmitter</a></li>
<li><a href="https://github.com/semlinker/node-deep/blob/master/buffer/%E6%B7%B1%E5%85%A5%E5%AD%A6%E4%B9%A0Node.js%20Buffer.md" rel="nofollow noreferrer" target="_blank">深入学习 Node.js Buffer</a></li>
<li><a href="https://github.com/semlinker/node-deep/blob/master/module/%E6%B7%B1%E5%85%A5%E5%AD%A6%E4%B9%A0%20Node.js%20Module.md" rel="nofollow noreferrer" target="_blank">深入学习 Node.js Module</a></li>
<li><a href="https://github.com/semlinker/node-deep/blob/master/module/%E6%B7%B1%E5%85%A5%E5%AD%A6%E4%B9%A0%20Node.js%20Module%20%E8%BF%9B%E9%98%B6%E7%AF%87.md" rel="nofollow noreferrer" target="_blank">深入学习 Node.js Module 进阶篇</a></li>
<li><a href="https://github.com/semlinker/node-deep/blob/master/http/%E6%B7%B1%E5%85%A5%E5%AD%A6%E4%B9%A0%20Node.js%20Http%20%E5%9F%BA%E7%A1%80%E7%AF%87.md" rel="nofollow noreferrer" target="_blank">深入学习 Node.js Http 基础篇</a></li>
<li><a href="https://github.com/semlinker/node-deep/blob/master/http/%E6%B7%B1%E5%85%A5%E5%AD%A6%E4%B9%A0%20Node.js%20Http.md" rel="nofollow noreferrer" target="_blank">深入学习 Node.js Http</a></li>
<li><a href="https://github.com/semlinker/node-deep/blob/master/net/%E6%B7%B1%E5%85%A5%E5%AD%A6%E4%B9%A0%20Node.js%20Net.md" rel="nofollow noreferrer" target="_blank">深入学习 Node.js Net</a></li>
</ul>
<h4>Sequelize 系列教程</h4>
<ul>
<li><a href="https://semlinker.com/node-sequelize-quickstart/" rel="nofollow noreferrer" target="_blank">Sequelize系列教程之快速入门</a></li>
<li><a href="https://semlinker.com/node-sequelize-1v1/" rel="nofollow noreferrer" target="_blank">Sequelize 系列教程之一对一模型关系</a></li>
<li><a href="https://semlinker.com/node-sequelize-1vm/" rel="nofollow noreferrer" target="_blank">Sequelize 系列教程之一对多模型关系</a></li>
<li><a href="https://semlinker.com/node-sequelize-nvm/" rel="nofollow noreferrer" target="_blank">Sequelize 系列教程之多对多模型关系</a></li>
</ul>
<h3 id="articleHeader20">TypeScript Design Patterns</h3>
<h4>Creational（创建型模式）</h4>
<ul>
<li><a href="https://github.com/semlinker/typescript-design-patterns/tree/master/src/singleton" rel="nofollow noreferrer" target="_blank">Singleton</a></li>
<li><a href="https://github.com/semlinker/typescript-design-patterns/tree/master/src/abstract-factory" rel="nofollow noreferrer" target="_blank">Abstract Factory</a></li>
<li><a href="https://github.com/semlinker/typescript-design-patterns/tree/master/src/factory-method" rel="nofollow noreferrer" target="_blank">Factory Method</a></li>
<li><a href="https://github.com/semlinker/typescript-design-patterns/tree/master/src/builder" rel="nofollow noreferrer" target="_blank">Builder</a></li>
<li><a href="https://github.com/semlinker/typescript-design-patterns/tree/master/src/prototype" rel="nofollow noreferrer" target="_blank">Prototype</a></li>
</ul>
<h4>Structural Patterns（结构型模式）</h4>
<ul>
<li><a href="https://github.com/semlinker/typescript-design-patterns/tree/master/src/adapter" rel="nofollow noreferrer" target="_blank">Adapter</a></li>
<li><a href="https://github.com/semlinker/typescript-design-patterns/tree/master/src/decorator" rel="nofollow noreferrer" target="_blank">Decorator</a></li>
<li><a href="https://github.com/semlinker/typescript-design-patterns/tree/master/src/facade" rel="nofollow noreferrer" target="_blank">Facade</a></li>
<li><a href="https://github.com/semlinker/typescript-design-patterns/tree/master/src/flyweight" rel="nofollow noreferrer" target="_blank">Flyweight</a></li>
<li><a href="https://github.com/semlinker/typescript-design-patterns/tree/master/src/proxy" rel="nofollow noreferrer" target="_blank">Proxy</a></li>
</ul>
<h4>Behavioral Patterns（行为型模式）</h4>
<ul>
<li><a href="https://github.com/semlinker/typescript-design-patterns/tree/master/src/chain-of-responsibility" rel="nofollow noreferrer" target="_blank">Chain of Responsibility</a></li>
<li><a href="https://github.com/semlinker/typescript-design-patterns/tree/master/src/iterator" rel="nofollow noreferrer" target="_blank">Iterator</a></li>
<li><a href="https://github.com/semlinker/typescript-design-patterns/tree/master/src/mediator" rel="nofollow noreferrer" target="_blank">Mediator</a></li>
<li><a href="https://github.com/semlinker/typescript-design-patterns/tree/master/src/observer" rel="nofollow noreferrer" target="_blank">Observer</a></li>
<li><a href="https://github.com/semlinker/typescript-design-patterns/tree/master/src/state" rel="nofollow noreferrer" target="_blank">State</a></li>
<li><a href="https://github.com/semlinker/typescript-design-patterns/tree/master/src/strategy" rel="nofollow noreferrer" target="_blank">Strategy</a></li>
<li><a href="https://github.com/semlinker/typescript-design-patterns/tree/master/src/template-method" rel="nofollow noreferrer" target="_blank">Template Method</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular 4.x 修仙之路

## 原文链接
[https://segmentfault.com/a/1190000008754631](https://segmentfault.com/a/1190000008754631)

