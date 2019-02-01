---
title: '[译注] MVVM 模式' 
date: 2019-02-02 2:30:11
hidden: true
slug: d4maovsmied
categories: [reprint]
---

{{< raw >}}

                    
<p>原文：<a href="https://github.com/kuitos/kuitos.github.io/issues/35" rel="nofollow noreferrer" target="_blank">https://github.com/kuitos/kui...</a><br>全部文章：<a href="https://github.com/kuitos/kuitos.github.io/issues" rel="nofollow noreferrer" target="_blank">https://github.com/kuitos/kui...</a></p>
<h1 id="articleHeader0">[译注] MVVM 模式</h1>
<blockquote><p>原文：<a href="https://msdn.microsoft.com/en-us/library/hh848246.aspx" rel="nofollow noreferrer" target="_blank">The MVVM Pattern</a></p></blockquote>
<p>MVVM 模式跟 Silverlight 这类 XAML 应用平台是天生合拍的。这是因为 MVVM 模式利用了Silverlight 的一些特殊能力，比如说 数据绑定，命令，行为等。MVVM 跟其他一些将表现及UI布局 与展示层逻辑的职责进行分离的模式很相似；如果你对 MVC 模式熟悉的话，你会发现它与 MVVM 之间存在很多相似的概念。</p>
<blockquote><p>译者注：XAML(Extensible Application Markup Language)是微软为构建GUI程序而创建的一种标记语言，你可以将它等同于 web 体系中 HTML。以下译文中，web 开发者可以将 XAML 统一代入为 HTML。Silverlight 则是微软开发的一个 富互联网应用(Rich Internet Application) 开发平台。</p></blockquote>
<h2 id="articleHeader1">MVVM 模式的设计动机</h2>
<p>诸如 Windows Forms，WPF，Silverlight 以及 Windows Phone 这类开发技术都提供了一个默认的体验，那就是它可以让开发者从工具箱中拖拽控件到设计面板，然后在代码文件中编写一定格式的代码就能完成整个开发。但是随着这类应用的增长规模及作用范围的变化，复杂的维护性问题就会随之而来。由于 UI控件 与 业务逻辑 之间的紧耦合，相应带来的问题就是 UI 变更的代价增大，以及难以编写针对性的单元测试。</p>
<p>使用 MVVM 模式来实现应用的主要动机有以下几点：</p>
<ol>
<li><p>它提供了一系列分离的概念。紧耦合，难变化，脆弱的代码导致了各种各样的长期维护的问题，最后导致了客户对交付的软件较低的满意度。在应用逻辑及 UI 之间进行干净的分离将会让应用更容易测试，维护以及拓展。它提高了代码的重用性同时使得 开发-设计 的工作流变为可能。</p></li>
<li><p>它与 XAML 平台是天生合拍的。MVVM 模式的关键推动力来自于 Silverlight 平台丰富的数据绑定技术栈及一些依赖属性。这些东西的组合提供了 UI 到 VM(译者注：view model 视图模型后面统一简称 VM) 之间的连接方式。</p></li>
<li><p>它使得 开发-设计 的工作流成为可能。当 UI XAML 不是与代码紧耦合时，设计师们就很容易去自由的发挥他们的创造力，从而做出一个更优秀的产品。<strong>(译者：简单来说就是 视图层 跟 M/VM 层的开发可以是正交的。)</strong></p></li>
<li><p>它增强了应用的可测试性。将 UI 逻辑转移到一个可以独立实例化的类中，可以让单元测试的编写更加容易。<strong>(译者：这一点其实非常重要)</strong></p></li>
</ol>
<h2 id="articleHeader2">MVVM 模式</h2>
<p>Model-View-ViewModel 的模式可以用到所有的 XAML 平台上。它的意图是在 UI 控件和它们的逻辑之间进行一个纯净的概念分离。</p>
<p>MVVM 模式中有三个核心的组件：model(模型)，view(视图) 以及 view-model(视图模型)(译者注：为保证交流中术语的一致性，model、view、view-model后面均不作翻译)，它们彼此间扮演一个截然不同的角色。下面的插图展示了这三个组件之间的关系：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000004838984" src="https://static.alili.tech/img/remote/1460000004838984" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>每个组件之间都是相互解耦的，这也使得：</p>
<ul>
<li><p>组件可以被交换</p></li>
<li><p>内部实现可以在不影响其他组件的情况下修改</p></li>
<li><p>组件可以独立的运作</p></li>
<li><p>隔离的单元测试</p></li>
</ul>
<p>除了理解这三个组件的职责，理解组件之间是如何交互的也同样重要。在最高的层级上，view 能感知到 view-model，view-model 能感知到 model，但是 model 并不会察觉到 view-model 的存在，同样的，view-model 也察觉不到 view。</p>
<p>view-model 将 model 类 与 view 隔离开来，这也使得 model 可以独立于 view 进行演化。</p>
<h3 id="articleHeader3">View</h3>
<p>view 的职责是用来定义 结构、布局，及用户在屏幕上看到的外观表现。理想情况下，view 仅通过 XAML 定义，以及一些有限的不包含业务逻辑的代码。</p>
<p>在一个 Windows Phone 应用中，view 通常是一个页面。除此之外，一个 view 也可以是一个父 view 的子组件，或者一个 ItemsControl 中的 DataTemplate对象。</p>
<p>一个 view 可以有自己的 view-model，或者继承自父级 view 的 view-model。<strong>视图通过绑定，或者调用 view-model 上的方法来获取数据。</strong>在运行期间，UI 控件将会响应 view-model 属性触发的变化通知，从而改变 view。</p>
<p>有一些 view 上的交互会触发 view-model 上的代码执行，比如说按钮点击或者选项选中事件。如果这个控件是一个命令源，这个控件的 Command 属性可以在 view-model 上绑定成一个 ICommand 属性。当这个控件的命令被调用，view-model 上相应的代码就会被执行。除了命令，行为也能被附加到 view 的一个对象中，然后监听命令调用及事件触发。作为回应，这个行为之后可以调用 view-mode 上的 ICommand 或者方法。<strong>(译者：web 领域里这些就是指的模板上的事件绑定语法，通常由框架提供)</strong></p>
<h3 id="articleHeader4">Model</h3>
<p>model 在 MVVM 中是应用的域模型(domain model)实现，它<strong>包含数据模型以及相应的业务和校验逻辑</strong>。model 对象的例子包括，数据仓库(repositories)，业务对象，数据转换对象(DTOs)，POCO对象，以及生成的实体及代理对象。</p>
<blockquote><p>译者：一个 model 应该包含基本的模型数据、基本的业务逻辑、业务规则、数据转换、依赖校验逻辑等。这里要提到的一个概念就是，域模型分为两个类型，一类是贫血的(Anemic domain model)，一类是非贫血的(non-anemic)。贫血的域模型只包含基础的数据信息，而不含有其他数据校验、业务规则等逻辑，它更像是一种数据库结构在代码层面的还原。在贫血域模型设计中，业务逻辑通常作为一个独立的代码部分，用来转换模型对象的状态，且各个处理之间可以组合嵌套（用过Redux的同学有没有觉得很熟悉的感觉？）。在面向对象设计领域，这通常被视为一个反模式。（OO与FP之间的冲突）</p></blockquote>
<h3 id="articleHeader5">View Model</h3>
<p>view-mode 作为 view 和 model 的中间人，它的职责是用于处理 view 的逻辑。<strong>通常情况下，view-model 与 model 之间的交互是通过调用 model 类中的方法来完成的。之后 view-model 依据 model 中的数据提供一种方便 view 使用的格式。</strong>view-model 从 model 中获取数据然后使其对 view 可用的同时，为了让 view 操作起来更简单，可能会通过一些方式做数据格式转换。view-model 还提供了一些命令的实现让应用的用户可以在 view 中使用。比如说，当用户点击了 UI 中的一个 button，这个动作可以触发 view-model 中的一个命令。view-model 同样有职责去定义一些某些方面会影响 view 展示的逻辑状态的变化，比如说一个表明一些操作是挂起的状态。</p>
<p>为了让 view-model 参与到与 view 的双向数据绑定当中，它的属性必须触发 PropertyChanged 事件。</p>
<p><strong>(译者注：后面这两段是基于 .NET 平台的具体代码实践，换算到 web 领域，基本上说的就是在 VM 中监听数据变化，然后做出对应的反应。)</strong></p>
<p>View-model 通过实现 INotifyPropertyChanged 接口以及属性变化时触发的 PropertyChanged 事件来满足这个需求。当属性发生变更时，监听者可以适当做回应。</p>
<p>对于集合而言，相应的提供了视图友好的工具System.Collections.ObjectModel.ObservableCollection&lt;T&gt; 。这个工具实现了集合变更通知，从而减轻了开发者自己在集合上实现 INotifyCollectionChanged 接口的负担。</p>
<blockquote><p>译者：这里提到了一个很重要的事情，就是 vm 获取到 model 中的数据后，可能需要做一些相应的数据格式化，以方便 view 使用。在 ng1.x 及 vue1.x 中，这类操作通常是通过在视图模板上绑定过滤器语法实现的(<code>ng-bind="model | upperCase"</code>)，然而 MVVM 定义中，数据转换/格式化 的操作本身也是属于 VM 的一部分。这也是为什么我非常赞同 vue2 中废除 filter 的一部分原因：<a href="https://github.com/vuejs/vue/issues/2756#issuecomment-215503966" rel="nofollow noreferrer" target="_blank">Vue 2.0 - Bring back filters please</a></p></blockquote>
<h2 id="articleHeader6">连接 View Models 到 Views</h2>
<p>MVVM 利用了 Silverlight 中的数据绑定能力以及行为和事件触发器来管理 view 和 view-model 之间的联系。这些能力将业务代码需要出现在视图代码中必要性变得很低。</p>
<p>有很多用来连接 view-model 和 view 的方法，包括直接的关系以及基于容器的方式。然而，所有的方式共有的一个目标就是，给 view 的 DataContext 属性分配一个 view-model。</p>
<p>Views 可以与 view models 在独立代码文件里建立连接，也可以直接在 view 中。</p>
<blockquote><p>译者：这里提到了 silverlight 里的 DataContext，换到 web 领域的 MVVM 框架里我们可以理解成作用域，即框架通过给某个视图的作用域分配一个 view-model 的方式，来完成 view 和 view-model 的衔接。</p></blockquote>
<h3 id="articleHeader7">Code-Behind(独立代码)</h3>
<p>一个 view 的代码可以是在独立代码文件中，于此同时 view-model 需要分配成它的 DataContext 属性。这可以是通过一个简单的 view 初始化一个新的 view-model 然后分配给它的 DataContext 属性来完成，也可以通过 view 使用控制反转(IOC)容器注入一个 view-model 来实现。</p>
<p><del>但是，在独立代码中 连接一个 view-model 到 view 中的做法是不推荐的，它可能给同时使用 VS 及 MSB(Microsoft Expression Blend®) 设计软件的设计师造成问题。</del></p>
<h3 id="articleHeader8">View</h3>
<p>如果一个 view-model 没有任何的构造器参数，它可以被当做 view 的 DataContext 来实例化。一个通常的实现方法是使用一个 view-model 定位器。这个资源可以公开应用的 view models 作为属性，从而使得独立的 view 可以绑定上去。这种方式意味着应用只有一个类用来连接 view models 到 views。此外，它仍然让开发者可以自由选择手动执行 view-model 定位器内的连接，或者使用一个依赖注入容器。</p>
<blockquote><p>译者：框架实现指导</p></blockquote>
<h2 id="articleHeader9">MVVM 的优势</h2>
<p>MVVM 使得完美的 开发-设计 工作流变为可能，它具备以下优点：</p>
<ul>
<li><p>开发期间，工程师和设计师可以更独立并行的在各自的组件上工作。设计师可以专注于 view，如果他们使用 Expression Blend，他们可以轻松的生成示例数据，而这个时候开发者只需要专注于 view model 和 model 组件。</p></li>
<li><p>开发者可以为 view-model 和 model 编写单元测试，而不用去管 view。view-model 的单元测试可以完全模拟在 view 上用的那些功能。</p></li>
<li><p>由于 view 是完全由 XAML 实现的，这也让应用的 UI 重新设计变得简单，而且还不用去触碰到逻辑代码。一个新的版本的 view 应该依然可以与之前已存在的 view-model 一起运行。</p></li>
<li><p>如果已经存在一个封装好了已有业务逻辑的 model ，改这个 model 可能会比较困难或有风险。在这个场景中，view-model 应该作为一个 model 类的适配器，从而避免 model 的代码需要做大的变动。(译者注：也就是说，view-model 应该对 model 中的数据做一些基础转换，从而去适配新的 view 或交互逻辑)</p></li>
</ul>
<p>更多关于 MVVM 的信息，参考以下文档： <a href="https://msdn.microsoft.com/en-us/library/gg405484(v=pandp.40" rel="nofollow noreferrer" target="_blank">Implementing the MVVM Pattern</a>.aspx) <a href="https://msdn.microsoft.com/en-us/library/gg405494(v=pandp.40" rel="nofollow noreferrer" target="_blank">Advanced MVVM Scenarios</a>.aspx)</p>
<h2 id="articleHeader10">译者按：</h2>
<p>MVVM 作为2005年微软提出来的 UI 架构，我认为在经过这么多年的检验之后，还是非常值得信赖的。虽然在这一两年随着 React 的兴起，以及在前端领域“起死回生”的函数式编程，MVVM 被各种错误或‘恶意’的解读导致其花式被黑。但是在我看来，MVVM 作为一个完整的 GUI 架构，跟 Flux 流派的数据层架构本身理念上是并不冲突的。我们依然可以 M/VM 层实践 Flux。</p>
<p>我认为就前端领域而言，MVVM 最大的意义在于，如果我们能很干净的分离出应用的 view 和 M/VM，我们就可以使得整个应用的业务模型能独立于框架运行。相比于现在换一个框架就<strong>重写</strong>一次应用的做法(老实说我受够了而且觉得没什么价值)，再结合当前前端‘欣欣向荣’的状态，如果能做到只需要花费很小的代价，我们就能快速的享受到新技术带来的红利，那基本上就非常美好了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译注] MVVM 模式

## 原文链接
[https://segmentfault.com/a/1190000007047009](https://segmentfault.com/a/1190000007047009)

