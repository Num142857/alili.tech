---
title: '如何在真实世界构建你的Mobx应用程序' 
date: 2019-01-25 2:30:23
hidden: true
slug: 7aff5og0w3i
categories: [reprint]
---

{{< raw >}}

            <p>本文是受到<a href="https://medium.com/@mweststrate">@mwestrase</a>许多文章的启发， 以及经过几个星期将一个大型的Backbone应用程序重构为React + MobX应用程序，是<a href="https://swizec.com/blog/livecoding-25-adding-mobx-vanilla-react-project/swizec/7170">将Mobx添加到一个普通的React项目</a>的“衣钵传人”。 或许这不是构建Mobx应用程序的_ 最佳方式_ ，但这种方式到目前为止一直在我的项目中很好的运作。</p>
<p><img src="http://p0.qhimg.com/t0173a460123de2d3b6.jpg" alt=""></p>
<p>设计本架构的目标是：</p>
<ul>
<li><p>样板最小化</p>
</li>
<li><p>使应用程序成为一个状态机</p>
</li>
<li><p>灵活移动元素</p>
</li>
</ul>
<p>我们将通过React上下文和MobX的出色的<code>inject</code>函数来实现样板最小化。这样的组合使数据集无需进行任何接线和props传递就可以在应用程序的任何地方使用。 如果组件需要访问状态机， 注入到store中。</p>
<p>你的UI设计师大可以根据其想法重新调整页面，而你所要做的只是更改组件的位置。 除非业务逻辑本身改变，否则不需要重新接线业务逻辑。 对我而言，这曾经是React的一个难题。 使用这种方法，你的组件变得真正独立，你可以做任何你想要的。</p>
<p>这非常有趣，我甚至为此早早来上班！ 如果你了解我，你会知道我有多喜欢过属于自己的早晨。</p>
<h2>这是如何完成的</h2>
<p>通过上下文和注入给了我们灵活性，并消除样板。 那么状态机呢？</p>
<p>我们把MobX的store视为应用程序中的唯一真实来源，并且我们将把actions置于其中。通过actions改变状态，并可以在任何地方调用。将它们放在store中以减少样板，并确保所有组件都可以访问它们，这会让你可以把整个状态机看成一个单文件。</p>
<p>这也会使你的应用程序更容易测试。 如果你的状态机工作正常，那么就一切正常。 这是因为：</p>
<ul>
<li><p>在严格模式下MobX保证状态只会在actions中改变</p>
</li>
<li><p>React保证DOM是一个纯粹的状态表达式</p>
</li>
</ul>
<p>是的，MobX运作通过可变状态，改变观察者以及所有有趣的东西。 如果在过去几年你一直听言关于不可变状态的函数式编程的倡导，那么这听起来很糟糕。</p>
<p>但是你知道什么才是酷的？ 无论如何，你可以获得所有的好处。 MobX将你的状态变化包装在getter和setter中，但它也可以支持那些具有不可变数据结构的应用程序，并且actions可以为时间旅行调试器建立一个更新日志。</p>
<p>这可能会是一个有趣的项目。 我可以使用MobX的时间旅行调试器？</p>
<p>model是另一个难题。</p>
<p>model表示整个数据结构中的特定对象。 MobX的store会关注你的整个应用程序的状态；model是为了说明一个特定的React组件所关注的特定实例。</p>
<p>这听起来model应该在组件状态中，对吧？ 但这是一个糟糕的主意，因为这样会让你的东西更难测试并且会打破状态机的理想状态。</p>
<p>model也是存放与后端交互的actions的好地方。 诸如保存，获取，更新。</p>
<hr>
<h2>让我们构建一盒柿子</h2>
<p>你可以把它想象成伪代码。</p>
<p>让我们构建一盒 <a href="https://en.wikipedia.org/wiki/Diospyros_kaki" title="日本柿子">柿子</a>。 现在我的厨房柜台上就有一盒，因为柿子就长在我女朋友的妈妈的后院。 谁知道？ ¯<em>(ツ)</em>/¯</p>
<p><img src="http://p0.qhimg.com/t01b696e6e333497c57.jpg" alt=""></p>
<p>盒子可以被打开或关闭。盒子里有柿子时，可以用胶带密封它， 它的状态机看起来像这样：</p>
<p><img src="http://p0.qhimg.com/t0173a460123de2d3b6.jpg" alt=""></p>
<p>一旦盒子被打开, 只要你想，你可以放入或取出尽可能多的柿子。你可以从任何<code>N kaki</code>状态关闭这个盒子，但你必须通过打开它来放入或取出柿子。 但只有在关闭时才能密封，只有在启封时才能打开。</p>
<h3>盒子，model</h3>
<p>作为MobX的store和model，你的盒子可能像这样：</p>
<pre><code class="hljs kotlin"><span class="hljs-comment">// src/models/Box.js</span>

<span class="hljs-keyword">import</span> { observable, computed, action, extendObservable } from <span class="hljs-string">'mobx'</span>;

export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Box</span> </span>{
    <span class="hljs-meta">@observable</span> <span class="hljs-keyword">sealed</span> = <span class="hljs-literal">true</span>;
    <span class="hljs-meta">@observable</span> closed = <span class="hljs-literal">true</span>;
    <span class="hljs-meta">@observable</span> kakis = [];

    <span class="hljs-keyword">constructor</span>(store, initialState) {
        <span class="hljs-keyword">this</span>.store = store;
        extendObservable(<span class="hljs-keyword">this</span>, initialState);
    }

    <span class="hljs-meta">@computed</span> <span class="hljs-keyword">get</span> canSeal() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.closed;
    }

    <span class="hljs-meta">@computed</span> <span class="hljs-keyword">get</span> canOpen() {
        <span class="hljs-keyword">return</span> !<span class="hljs-keyword">this</span>.<span class="hljs-keyword">sealed</span>;
    }

    <span class="hljs-meta">@computed</span> <span class="hljs-keyword">get</span> canManipulatekakis() {
        <span class="hljs-keyword">return</span> !<span class="hljs-keyword">this</span>.closed;
    }

    <span class="hljs-meta">@action</span> addkaki() {
        <span class="hljs-keyword">this</span>.kakis.push(new kaki());
    }

    <span class="hljs-meta">@action</span> takekaki() {
        <span class="hljs-keyword">this</span>.kakis.pop();
    }

    <span class="hljs-meta">@action</span> <span class="hljs-keyword">open</span>() {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.canOpen) {
            <span class="hljs-keyword">this</span>.opened = <span class="hljs-literal">true</span>;
        }
    }

    <span class="hljs-meta">@action</span> close() {
        <span class="hljs-keyword">this</span>.closed = <span class="hljs-literal">true</span>;
    }

    <span class="hljs-meta">@action</span> seal() {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.canSeal) {
            <span class="hljs-keyword">this</span>.<span class="hljs-keyword">sealed</span> = <span class="hljs-literal">true</span>;
        }
    }

    <span class="hljs-meta">@action</span> unseal() {
        <span class="hljs-keyword">this</span>.<span class="hljs-keyword">sealed</span> = <span class="hljs-literal">false</span>;
    }
}

</code></pre><p><code>@ observable</code>是一个MobX装饰器，MobX会使得属性可观察。<code>extendObservable</code>是在对象上设置许多可观察值的一种方便的方法。<code>@ computed</code>会标记一些纯粹从状态派生出的属性，MobX可以记忆它们。<code>@action</code>会将方法标记为动作。</p>
<p>看看那张状态机的图片。观察者和计算属性放在一起是圆圈（状态），动作是箭头（状态之间的转换）。</p>
<h3>主应用程序组件</h3>
<p>为了一个盒子做了很多工作吧？ 看看我们把它放在React组件里会发生什么：</p>
<pre><code class="hljs javascript"><span class="hljs-comment">// src/components/App.js</span>

<span class="hljs-keyword">import</span> { Provider } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react'</span>;

<span class="hljs-keyword">import</span> { Box } <span class="hljs-keyword">from</span> <span class="hljs-string">'./models/Box'</span>;

<span class="hljs-comment">// would normally go in src/stores/...</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MainStore</span> </span>{
    @observable box = <span class="hljs-literal">null</span>;

    @action getBoxFromMail() {
        <span class="hljs-keyword">this</span>.box = <span class="hljs-keyword">new</span> Box({
            <span class="hljs-attr">sealed</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">closed</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">kakis</span>: [<span class="hljs-keyword">new</span> kaki(), <span class="hljs-keyword">new</span> kaki()]
        });
    }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    mainStore = <span class="hljs-keyword">new</span> MainStore();

    render() {
        <span class="hljs-keyword">const</span> mainStore = <span class="hljs-keyword">this</span>.mainStore;

        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">mainStore</span>=<span class="hljs-string">{mainStore}</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{mainStore.getBoxFromMail.bind(mainStore)}</span>&gt;</span>
                        Get Mail
                    <span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>

                    <span class="hljs-tag">&lt;<span class="hljs-name">Box</span> /&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span></span>
        );
    }
}

</code></pre><p>我们建立了一个新的<code>MainStore</code>，它保存了我们应用程序的主要状态。诸如是否从邮箱取出一盒柿子，柜台是否是黑色，冰箱是否在工作之类的。</p>
<p>在render函数中，我们使用<code>Provider</code>将<code>mainStore</code>添加到React上下文。 如果需要，<code>Provider</code>中的任何组件都可以访问<code>mainStore</code>。</p>
<p>将actions与store和model捆绑在一起好处是，你可以在<code>onClick</code>处理程序中使用它们。 这意味着你的大部分组件可以是无状态的功能组件。</p>
<h3>盒子, React组件</h3>
<p>我来给你展示。</p>
<pre><code class="hljs javascript"><span class="hljs-comment">// src/components/Box.js</span>

<span class="hljs-keyword">import</span> { inject, observer } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react'</span>;

<span class="hljs-keyword">const</span> SealedOrOpened = observer(<span class="hljs-function">(<span class="hljs-params">{ box }</span>) =&gt;</span> (
    <span class="hljs-keyword">if</span> (box.sealed) {
        <span class="hljs-keyword">return</span> <span class="hljs-string">'Sealed and Closed'</span>;
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!box.sealed &amp;&amp; !box.opened) {
        <span class="hljs-keyword">return</span> <span class="hljs-string">'You should open the box'</span>;
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">'Take some kakis!'</span>;
    }
));

<span class="hljs-comment">// this helper normally goes somewhere else</span>
<span class="hljs-keyword">const</span> If = <span class="hljs-function">(<span class="hljs-params">{ cond, children }</span>) =&gt;</span> cond ? children : <span class="hljs-literal">null</span>;

<span class="hljs-keyword">const</span> Box = inject(<span class="hljs-string">'mainStore'</span>)(observer(<span class="hljs-function">(<span class="hljs-params">{ mainStore }</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> box = mainStore.box;

    <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">SealedOrOpened</span> <span class="hljs-attr">box</span>=<span class="hljs-string">{box}</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">If</span> <span class="hljs-attr">cond</span>=<span class="hljs-string">{box.canOpen}</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{box.open.bind(box)}</span>&gt;</span>Open box<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">If</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">If</span> <span class="hljs-attr">cond</span>=<span class="hljs-string">{box.opened}</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                {box.kakis.map(kaki =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">kaki</span> /&gt;</span>)}
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{box.takekaki.bind(box)}</span>&gt;</span>
                Take a kaki
            <span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">If</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
));

</span></code></pre><p>这就是本质上的<code>Box</code>组件。它会渲染一些文本，告诉你如何处理这个盒子，并给你一个打开它的按钮。是的，我知道应该有一个按钮来取下胶带。</p>
<p>一旦你打开盒子，就会出现一个柿子列表和一个按钮，来把它们一个接一个地取出来。</p>
<p>请注意，<code>Box</code>是一个函数式无状态的组件。 你可以这样做，因为所有的状态和所有的操作都在<code>Box</code>，即MobX的model中。 没有必要在本地建立点击处理程序。</p>
<p>您可能还会注意到，我们已经将<code>inject('mainStore')</code>注入到Box组件中。这使得我们可以将组件移动到<code>Provider</code>内的DOM树中的任何位置，并且它将继续工作。不需要任何的修改。</p>
<h3>❤️ 总结</h3>
<p>你的UI设计师会喜欢这种灵活性，你的PM会决定你的速度超乎想象。</p>
<p>哦，那个<code>observer</code>呢？ 它可以确保你的组件在状态更改时重新渲染。</p>
<p>下周，我要写一篇关于将这些更改保留到某种后端的文章。 我仍在努力如何使这部分省事且整洁。</p>
<p>也许我应该写一本关于React和MobX构建Web应用程序的书？ 如果你感兴趣，<a href="mailto:hi@swizec.com">请告诉我</a>.</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在真实世界构建你的Mobx应用程序

## 原文链接
[https://www.zcfy.cc/article/how-to-structure-your-mobx-app-for-the-real-world](https://www.zcfy.cc/article/how-to-structure-your-mobx-app-for-the-real-world)

