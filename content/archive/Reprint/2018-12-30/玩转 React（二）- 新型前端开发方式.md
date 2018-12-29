---
title: '玩转 React（二）- 新型前端开发方式' 
date: 2018-12-30 2:30:10
hidden: true
slug: aiiexm9y42s
categories: [reprint]
---

{{< raw >}}

                    
<p>这是《玩转 React》系列的第二篇。在该篇中，我们来了解下，React 的出现到底给我们的开发方式带来了什么样的变化。</p>
<p>我的感触可以用一个字来形容，爽！主要爽在以下两个方面。</p>
<h2 id="articleHeader0">视图是数据的映射（单向数据流）</h2>
<p>React 是一个视图层的框架，所谓视图层就是我们在网页上能看到的部分。在传统的方式中，我们通过编写HTML代码来设计网页的结构，通过 JavaScript 以及 getElementById 等 api 来获取某个节点，通过节点的 innerHTML，innerText，appendChild 等属性或者方法（或者你也可能用JQuery）来更新视图。</p>
<p>在 React 时代，你除了需要自己考虑网页的结构和CSS样式外，视图的更新 React 统统帮你搞定。</p>
<p>那么，用了 React 我们如何来更新视图呢，先看下面这个张图：</p>
<p><span class="img-wrap"><img data-src="/img/bVVKli?w=305&amp;h=94" src="https://static.alili.tech/img/bVVKli?w=305&amp;h=94" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在 React 中视图是数据的映射，你想要视图发生变化，那你只要改变数据就好了，就是这么简单。</p>
<p>举个简单的例子，你打算在你的页面上展示用户的名片，名片上有照片、姓名、年龄、地址等基本信息，如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVVKlr?w=283&amp;h=156" src="https://static.alili.tech/img/bVVKlr?w=283&amp;h=156" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这个名片，作为视图的一部分，在 React 中是由某个用户的数据映射而来的，可能长得像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    photo: &quot;my-photo.jpeg&quot;,
    name: &quot;sarike&quot;,
    age: 18,
    address: &quot;北京&quot;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">photo</span>: <span class="hljs-string">"my-photo.jpeg"</span>,
    name: <span class="hljs-string">"sarike"</span>,
    age: <span class="hljs-number">18</span>,
    address: <span class="hljs-string">"北京"</span>
}
</code></pre>
<p>如果你希望网页的浏览者，可以切换查看不同用户的名片，你要做的只是用下一个用户的数据替换一下当前的数据就可以了。至于新的数据是如何替换掉页面上的旧数据的，就无需关心了，React 会以最高效的方式帮你完成。</p>
<p>这也就是所谓的单向数据流，在这种开发方式下，会让你更新视图的逻辑非常清晰、简单，哪怕你的前端交互很复杂，也不至于让你的代码那么容易变成一坨。</p>
<p>是不是很爽？</p>
<h2 id="articleHeader1">面向组件编程</h2>
<p>上一部分说的 React 中更新视图只需要更新数据就可以了，如果你觉得也就一般般吧，那下面要说的一定爽到爆。</p>
<p>先说一下什么是组件，顾名思义，<strong>组件就是用来组合成更高级东西的物件</strong>。打个比方，比如一辆汽车，汽车中的各种螺丝、铁块等零件就可以看作是一个个组件，这些小的组件我们还可以继续组合，比如组合成发动机、轮胎、车架等有特定功能的组件，然后这些组件又可以继续组合成一辆完整的汽车。</p>
<p>对应到我们的前端开发中，HTML中的各种元素（如：div，table，input，select等）就是一个个最基本的组件，你可以把他们继续组合，组合成第一部分说的名片，或者一个填写用户信息的表单，展示所用用户的一个列表等有特定业务功能的组件，各种各样的业务组件最终组合成一个完整的前端页面。</p>
<p>组件最大的特点就是可以<strong>重复利用</strong>，比如说用户名片这个组件，你可以放到个人信息页面，也可以放到文章详情页面来展示作者信息，制作完成，到处利用。</p>
<p>言归正传，那在使用 React 是，是如何面向组件编程的呢，现在你可以这样来理解，<strong>React 提供了一种可以创造新的 HTML 标签的能力</strong>。</p>
<p>例如第一部分讲的用户名片的例子，通过 React 你可以制作这样一个组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Card name=&quot;sarike&quot; age=&quot;18&quot; address=&quot;北京&quot; />
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;Card <span class="hljs-built_in">name</span>=<span class="hljs-string">"sarike"</span> age=<span class="hljs-string">"18"</span> address=<span class="hljs-string">"北京"</span> /&gt;
</code></pre>
<p>而且更重要的是，你可以以如此简单的方式在你应用的任何位置重复利用。</p>
<p>你说，酷不酷，爽不爽？！！</p>
<p>至此以后，你在开发一个前端页面时，你需要做的就是将页面拆分成各种组件，然后把它们组合起来就好了。</p>
<p>在此想跟大家分享一点小经验，这也关系到你最终能不能将 React 用得很溜。就是：<strong>在前端开发过程中，要善于观察和抽象。尤其是在项目前期，不要着急写代码，一定观察项目的原型图或者设计稿，想想哪些部分是可以拆分成可以复用的公共组件的。这样做能让你后面的工作，事半功倍。</strong></p>
<p>在后面的文章中你将更深入地体会到这一点，同时你也会体会到 React 的组件化开发，到底是多么多么的爽！！</p>
<h2 id="articleHeader2">写在最后</h2>
<p>在阅读上面内容的时候，你可能会有一些疑惑，比如说你可能会质疑“创建一个新的 HTML 标签这种说法”，这怎么可能呢？是的，深究原理的话，确实不是这样，但是从开发者使用框架的角度，React 确实给了我们这样的体验。所以，希望大家在阅读的时候跟着我的节奏来就好，所有的疑惑会随着文章的推进，渐渐消退。</p>
<p>谢谢大家。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
玩转 React（二）- 新型前端开发方式

## 原文链接
[https://segmentfault.com/a/1190000011340537](https://segmentfault.com/a/1190000011340537)

