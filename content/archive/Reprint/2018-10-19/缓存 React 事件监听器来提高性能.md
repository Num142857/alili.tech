---
title: 缓存 React 事件监听器来提高性能
hidden: true
categories: [reprint]
slug: 2e3f8879
date: 2018-10-19 00:00:00
---

{{< raw >}}

            <p><img src="https://p5.ssl.qhimg.com/t01786d1b810e4a8256.png" alt=""></p>
<p>在 js 里面有个不被重视的概念：对象和函数的引用，而这个却直接地影响了 React 的性能。如果你打算创建两个相同的函数，但是却又不相等。你可以试着：（译者注：无法在markdown中插入代码，请查看原文代码！） <code>const functionOne = function() { alert('Hello world!'); }; const functionTwo = function() { alert('Hello world!'); }; functionOne === functionTwo; // false</code></p>
<p>如果将一个变量指向一个已经存在的函数，看看它们的不同: <code>const functionThree = function() { alert('Hello world!'); }; const functionFour = functionThree; functionThree === functionFour; // true`</code></p>
<p>对象也是这样的。 <code>const object1 = {}; const object2 = {}; const object3 = object1; object1 === object2; // false object1 === object3; // true</code></p>
<p>如果你学过其他语言，可能会熟悉指针。每次你创建对象的时候，你都会为其分配设备内存。当声明 <code>oject1 = {}</code> 的时候，将会在用户的 RAM 中创建一串字节给到 <code>object1</code>。可想而知，<code>object1</code> 就是一个保存了键值对存放在 RAM 的地址。而声明 <code>object2 = {}</code>，将会在 RAM 中创建另外一串不同的字节给到<code>object2</code>。<code>object</code>上地址和<code>object2</code> 的一样吗？不是的。这也为什么这两个变量的是不相等。他们的键值对可能会完全相同，但是他们在内存中的地址是不一样的，这才是会被比较的地方。</p>
<p>若使得<code>object3 = object1</code>，会让<code>object3</code>的值为<code>object1</code>的地址。这不是一个新的对象。内存中的位置是一样的。可以如下验证： <code>const object1 = { x: true }; const object3 = object1; object3.x = false; object1.x; // false</code></p>
<p>这个例子里，在内存中创建对象并指向<code>object1</code>。让后让<code>object3</code>等于同样的内存地址。通过修改<code>object3</code>，可以改变对应内存中的值，这也意味着所有指向该内存的变量都会被修改。<code>obect1</code>，仍指向该内存，所以值也被改变了。</p>
<p>初级工程师会犯这种非常常见的错误，并且需要深入学习相关教程；只是本文是讨论 React 性能的，甚至是对变量引用有较深资历的开发者也可能需要学习。</p>
<p>这个和 React 有什么关系呢？React 有个节省执行时间的聪明方式，可以优化性能：如果组件的 props 和 state 都没有变化，render 的输出必然也是没有变化的。很清晰的，如果所有的都一样，那就意味着没有变化。如果没有变化，<code>render</code> 必须返回相同的输出，就不用执行了。这使得 React 更加快速，按需渲染。</p>
<p>React 采用和 JavaScript 一样的方式，通过简单的 <code>==</code> 操作符来判断 props 和 state 是否有变化。React 不会深入比较对象是否相等。深对比是对比对象的每一个键值对，而不是对比内存地址。React 处理方式就是浅对比，仅仅是对比一下引用是否相同而已。</p>
<p>如若将组件的 prop 从 <code>{ x: 1 }</code> 改为另外一个 <code>{ x: 1 }</code>，React 将会重新渲染，因为这两个对象在内存上有不用的引用。如果只是将组件的 prop 从上文中的 <code>object1</code> 改为 <code>object3</code> ，React 是不会重新渲染的，应为这两个对象是同一个引用。</p>
<p>在 Javascript，函数也是同样的处理方式。如果 React 接收到不同内存地址而功能相同的函数，React 也会重新渲染。如果 React 接收到相同函数的引用，就会不重新渲染。</p>
<p>在代码审核的时候，我就遇到下面这种常见误用的场景 <code>class SomeComponent extends React.PureComponent { get instructions() { if (this.props.do) { return 'Click the button: '; } return 'Do NOT click the button: '; } render() { return ( &lt;div&gt; {this.instructions} &lt;Button onClick={() =&amp;gt; alert('!')} /&gt;&lt;/div&gt; ); } }</code></p>
<p>这是非常直接的一个组件。当按钮被点击的时候，就 alert。instructions 用来表示是否点击了按钮。而 SomeComponent 的 prop 的 <code>do={true}</code> 或 <code>do={false}</code> 决定了 instructions。</p>
<p>这里有问题的是，当 <code>SomeComponent</code> 重新渲染的时候（例如 do 属性从 true 切换到 false），<code>Button</code> 也会重新渲染！尽管每次这个<code>onClick</code>方法都是相同的，但是每次渲染都会被重新创建。每次渲染都会在内存中创建新的函数（因为会在 render 函数里重新创建），一个指向新内存地址的引用被传递到 <code>&amp;lt;Button /&amp;gt;</code>，虽然输入完全没有变化，该 <code>Button</code> 组件还是会重新渲染。</p>
<h3>修改</h3>
<p>如果函数不依赖于组件（不是 <code>this</code> 上下文），你可以在组件的外部定义它。所有的组件实例都会用到相同的引用，因为都是同一个函数。 <code>const createAlertBox = () =&gt; alert('!'); class SomeComponent extends React.PureComponent { get instructions() { if (this.props.do) { return 'Click the button: '; } return 'Do NOT click the button: '; } render() { return ( &lt;div&gt; {this.instructions} &lt;Button onClick={createAlertBox} /&gt; &lt;/div&gt; ); } }</code></p>
<p>和前面的例子相反，<code>createAlertBox</code> 在每次渲染中仍然有着有相同的引用。因此按钮就不会重新渲染了。</p>
<p><code>Button</code> 就像一个又小又快速渲染的组件，你可能在大型、复杂、渲染速度慢的组件里面看到这些行内的定义，在 React 应用里面真的会有很多很多。最好不要在渲染方法里面定义这些函数。</p>
<p>如果函数确实依赖于组件，使得你不能在组件外部定义，你可以将组件的方法作为事件处理传递过去。 <code>class SomeComponent extends React.PureComponent { createAlertBox = () =&gt; { alert(this.props.message); }; get instructions() { if (this.props.do) { return 'Click the button: '; } return 'Do NOT click the button: '; } render() { return ( &lt;div&gt; {this.instructions} &lt;Button onClick={this.createAlertBox} /&gt;; &lt;/div&gt; ); } }</code></p>
<p>在本例中，每个<code>SomeComponent</code>的实例有不同的告警方式。按钮的点击事件处理需要独立于<code>SomeComponent</code>。通过传递<code>createAlertBox</code>方法，他就和<code>SomeComponent</code>是否渲染无关了。甚至和<code>message</code>这个属性是否修改也没有关系。<code>createAlertBox</code> 的内存地址没有改变，意味着<code>Button</code>没有重新渲染。这可以节省运行时间并提升应用的渲染速度。</p>
<p><em>但是如果函数是动态的怎么办呢？</em></p>
<h3>修改(高级)</h3>
<p>这里有个非常常见的使用情况，在简单的组件里面，有很多独立的动态事件监听器，例如在遍历数组的时候： <code>class SomeComponent extends React.PureComponent { render() { return ( &lt;ul&gt; {this.props.list.map(listItem =&gt; &lt;li&gt; &lt;Button onClick={() =&gt;alert(listItem.text)} /&gt; &lt;/li&gt; )} &lt;/ul&gt; ); } }</code></p>
<p>在这个例子里面，有不确定数量的按钮和监听器，每个按钮都有独立的函数，并且无法在组件<code>SomComponent</code>创建之前知道。要如何解决这个难题呢？</p>
<p>输入记忆，或者更简单的称之为缓存。对于每个唯一的值，创建和缓存对应的函数。对以后这个唯一值的所有引用，都返回之前的缓存函数。</p>
<p>这就是我如何实现上面的例子： <code>class SomeComponent extends React.PureComponent { // Each instance of SomeComponent has a cache of click handlers // that are unique to it. clickHandlers = {}; // Generate and/or return a click handler, // given a unique identifier. getClickHandler(key) { // If no click handler exists for this unique identifier, create one. if (!Object.prototype.hasOwnProperty.call(this.clickHandlers, key)) { this.clickHandlers[key] = () =&gt; alert(key); } return this.clickHandlers[key]; } render() { return ( &lt;ul&gt; {this.props.list.map(listItem =&gt; &lt;li&gt; &lt;Button onClick={this.getClickHandler(listItem.text)} /&gt;&lt;/li&gt; )} &lt;/ul&gt; ); } }</code></p>
<p>数组中的每一项都会被传入 <code>getClickHandler</code> 方法中。这个方法里面，第一次传值调用的时候，会对应这个唯一的值创建函数，并返回。以后通过这个值调用这个方法的时候，将会不会返回新的函数，相反会返回之前在内存里创建的函数的引用。</p>
<p>最终，重新渲染<code>SomeComponent</code>组件时，不会引起<code>Button</code>组件的重新渲染。相似的，在<code>list</code>里面添加项也会为按钮动态地创建事件监听器。</p>
<p>可能需要费点脑子为事件处理函数创建唯一的标识，来区分不同的函数，但是在遍历里面，没有比每个 JSX 对象生成的 <code>key</code> 更简单得了。</p>
<p>这里对使用 <code>index</code> 当作唯一标识有个提醒：如果数组顺序改了或者有删除项，可能会获得错误的返回。当将数组从 <code>[ 'soda', 'pizza' ]</code> 改为 <code>[ 'pizza' ]</code>，同时已经缓存了事件监听器为<code>listeners[0] = () =&amp;gt; alert('soda')</code>，但点击 <code>index</code> 为 0 的按钮 pizza 的时候，它将会弹出 <code>soda</code>。这也是React建议不要使用数组的索引作为 key 的原因。</p>
<h3>结论</h3>
<p>如果你喜欢本文，随意给它掌声吧。它很快，很容易，而且免费。如果你有其他的问题或则相关的建议，请在下面留言。</p>
<p>阅读更多我的专栏，可以在 <a href="https://www.linkedin.com/in/charles-stover">LinkedIn</a> 和 <a href="https://twitter.com/CharlesStover">Twitter</a>, 或 <a href="https://charlesstover.com/">check out my portfolio on CharlesStover.com</a>上关注我.</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/cache-your-react-event-listeners-to-improve-performance](https://www.zcfy.cc/article/cache-your-react-event-listeners-to-improve-performance)
原文标题: 缓存 React 事件监听器来提高性能
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
