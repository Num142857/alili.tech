---
title: React Native with MobX — 入门
hidden: true
categories: [reprint]
slug: dbf4a6bc
date: 2018-10-19 00:00:00
---

{{< raw >}}

            <p>在这里，我们将结合MobX和React Native来创建一个简单的列表应用程序。 如果您正在寻找如何开始使用MobX和React Native，那么这应该是一个很好的选择。</p>
<p><em>想学习React Native？ 查看</em> <a href="http://reactnative.training/"><em>React Native Training</em></a>_._</p>
<p><img src="https://p0.ssl.qhimg.com/t01dde62db56c35af01.png" alt=""></p>
<p>要查看最终仓库，请单击 <a href="https://github.com/dabit3/react-native-mobx-list-app">这个</a>.</p>
<blockquote>
<p>MobX是一个非常直观的状态管理库，我很容易掌握并启动和运行。 我在开发React和React Native应用程序时使用了Flux，Alt，Redux和Reflux，我可以毫无疑问地说MobX很快成为我最喜欢的管理状态的方法，因为它很简单。 我期待在未来的项目中使用它，看看项目从何处开始。</p>
</blockquote>
<p>这个应用程序将有两个主要组件，一个允许我们创建新列表，另一个允许我们在列表中添加新项目。</p>
<p><img src="https://p0.ssl.qhimg.com/t010251351af16d482e.gif" alt=""></p>
<p>首先，我们首先需要创建一个新的React Native应用程序：</p>
<pre><code class="hljs actionscript">react-<span class="hljs-keyword">native</span> init ReactNativeMobX

</code></pre><p>接下来，我们将继续进入我们创建的新目录并安装我们需要的依赖项： <a href="https://github.com/mobxjs/mobx"><strong>mobx</strong></a> 和<a href="https://github.com/mobxjs/mobx-react"><strong>mobx-react</strong></a></p>
<pre><code class="hljs stylus">npm <span class="hljs-selector-tag">i</span> mobx mobx-react --save

</code></pre><p>我们还需要安装一个babel插件，以便我们可以使用ES7装饰器：</p>
<pre><code class="hljs stylus">npm <span class="hljs-selector-tag">i</span> babel-plugin-<span class="hljs-attribute">transform</span>-decorators-legacy --save-dev

</code></pre><p>现在，让我们更新.babelrc文件来配置我们的babel插件：</p>
<pre><code class="hljs json">{  <span class="hljs-attr">"presets"</span>: [<span class="hljs-string">"react-native"</span>],  <span class="hljs-attr">"plugins"</span>: [<span class="hljs-string">"transform-decorators-legacy"</span>]}

</code></pre><blockquote>
<p>我们只需要设置react-native预设，因为我们正在编写一个自定义的.babelrc文件。 我们将react-native预设设置为获取默认配置，然后指定更多在其之前运行的插件（在我们的示例中为transform-decorators-legacy插件）。</p>
</blockquote>
<p>现在我们已经配置了项目，我们将开始编写一些代码。</p>
<p>在根目录中，创建一个名为app的文件夹。 在应用程序中，创建一个名为mobx的文件夹。 在mobx中，创建一个名为listStore.js的文件：</p>
<ol>
<li><p>从 <strong>mobx</strong> 导入 <strong>observable</strong> - <strong>observable</strong> 为现有数据结构（如对象，数组和类实例）添加了可观察的功能。 这可以通过使用 <a href="http://mobxjs.github.io/mobx/refguide/observable-decorator.html"><strong>@ observable</strong></a> 装饰器（ES.Next）或通过调用<a href="http://mobxjs.github.io/mobx/refguide/observable.html">observable</a>或<a href="http://mobxjs.github.io/mobx/refguide/extend-observable.html">extendObservable</a> 函数（ES5）来注释类属性来完成。</p>
</li>
<li><p>创建一个新的命名为<strong>ObservableListStore</strong>的类</p>
</li>
<li><p>创建一个可观察的数组叫 <strong>list</strong></p>
</li>
<li><p>创建三个要在列表数组上使用的方法</p>
</li>
<li><p>创建 <strong>ObservableListStore</strong> 的新实例并将其存储在 <strong>observableListStore</strong> 变量中</p>
</li>
<li><p>导出store</p>
</li>
</ol>
<p>现在我们已经创建了一个store，让我们进入应用程序的index文件并更改入口文件以使用store并添加创建导航。 如果您正在为Android开发，那将是 <strong>index.android.js</strong> 。 如果您正在为iOS开发，那将是 <strong>index.ios.js</strong> :</p>
<p>在我们的index文件中，我们创建了一个基本的导航状态并导入了我们新创建的store。 我们在 <strong>initialRoute</strong> 中将store作为prop传递下来。 我们还将我们的初始路由设置为我们尚未创建的组件， <strong>App</strong> 。 我们的 <strong>App</strong> 组件可以通过props访问store。</p>
<p>在configureScene中，我们检查类型是否为“Modal”，如果是，我们调用floatFromBottom sceneConfig，它将我们的下一个场景作为modal。</p>
<p>现在，让我们创建App组件。 这将是一个相当大的组件，并在将来包含很多，但基本上我们正在创建一个用户界面，允许我们添加和删除列表项。 我们将通过props从我们的store访问我们的store提供方法，并将使用它们与我们的应用程序状态进行交互。 在 <strong>app / App.js</strong> 中：</p>
<p>我将尝试回顾一下这个文件中可能不明显的所有主要内容。 如果您有任何问题或有些问题不明确，请发表评论，我会尝试更新或回复。</p>
<ol>
<li><p>我们从<strong>mobx-react/native</strong>导入<strong>observer</strong></p>
</li>
<li><p>我们用 <strong>@ observer</strong> 装饰器装饰我们的类。 这将确保在相关数据更改时每个组件单独重新渲染。</p>
</li>
<li><p>我们导入一个尚未创建的组件 - <strong>NewItem</strong> 。 当我们想要将新项目添加到列表中时，这将是我们导航到的组件。</p>
</li>
<li><p>在 <strong>addListItem</strong> 中，我们调用 <strong>this.props.store.addListItem</strong> 传入 <strong>this.state.text</strong> 。 <strong>this.state.text</strong> 将在附加到TextInput的 <strong>updateText</strong> 方法中更新。</p>
</li>
<li><p>在 <strong>removeListItem</strong> 我们调用 <strong>this.props.store.removeListItem</strong> 然后传递他们</p>
</li>
<li><p>在 <strong>addItemToList</strong> 中，我们调用this.props.navigator.push并将item和store作为props传递。</p>
</li>
<li><p>在render方法中，我们通过从props中解构来访问store：</p>
</li>
</ol>
<pre><code class="hljs cpp"><span class="hljs-keyword">const</span> { <span class="hljs-built_in">list</span> } = <span class="hljs-keyword">this</span>.props.store

</code></pre><p>8. 在render方法中，我们还创建了一个ui并连接了我们的类方法。</p>
<p>最后，我们创建NewItem组件：</p>
<p>如果你熟悉React或React Native，那么这里没什么特别之处。 我们基本上可以使用props访问我们的项目并循环遍历项目的项目数组，如果其中存在任何项目。 如果没有，我们会显示一条消息。</p>
<p>我们在这个组件中与store交互的唯一方法是调用addItem，它调用 <strong>this.props.store.addItem</strong> 并传入 <strong>this.props.item和this.state.newItem</strong> 。</p>
<p>那应该是它！</p>
<p>要查看最终仓库，请单击 <a href="https://github.com/dabit3/react-native-mobx-list-app">这个</a>.</p>
<blockquote>
<p>我的名字是<a href="https://twitter.com/dabit3）我是[AWS Mobile](https://aws.amazon.com/mobile/">Nader Dabit</a>的开发人员倡导者，负责<a href="https://aws.amazon.com/appsync/">AppSync</a>和<a href="https://github.com/aws/aws-amplify">Amplify</a>等项目，以及<a href="http://reactnative.training/">React Native Training</a>的创始人。</p>
</blockquote>
<blockquote>
<p>如果您喜欢React和React Native，请查看我们的播客 — <a href="https://devchat.tv/react-native-radio">React Native Radio</a> 在 <a href="http://devchat.tv/">Devchat.tv</a></p>
</blockquote>
<blockquote>
<p>另外，看看我的书, <a href="https://www.manning.com/books/react-native-in-action">React Native in Action</a> 现在可从Manning Publications获得</p>
</blockquote>
<blockquote>
<p>如果您喜欢这篇文章，请推荐并分享！ 谢谢你抽时间阅读</p>
</blockquote>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/react-native-with-mobx-getting-started](https://www.zcfy.cc/article/react-native-with-mobx-getting-started)
原文标题: React Native with MobX — 入门
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
