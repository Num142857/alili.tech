---
title: 你可能从未听说过的15种HTML元素方法！
hidden: true
categories: [reprint]
slug: 851f52a0
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <h3>初学者须知</h3>
<p>我们来讨论HTML和DOM之间的区别。</p>
<p>显然，一个普通<code>&lt;table&gt;</code>元素就是HTML。您可以在.html的文件中使用它。它有一组<em><strong>属性</strong></em>影响它的外观和行为方式。这就是HTML，不过它与JavaScript无关。</p>
<p>DOM是将JavaScript代码与文档中的HTML元素相关联的内容，因此您可以与对象等元素进行交互。</p>
<p>它是一个文档到对象模型.</p>
<p>HTML中的每种类型的元素都有自己的DOM“接口”，用于定义属性（通常映射到HTML元素上的属性）和方法。例如，<code>&lt;table&gt;</code>有一个名为HTMLTableElement的接口。</p>
<p>您可以通过编写以下内容来获取对特定元素的引用：</p>
<p>然后，您可以访问可用于该类型元素的所有属性和方法。例如，您可以使用searchBox.value访问value属性，或者通过调用searchBox.focus（）将光标放在框中。</p>
<p>感谢您参加关于DOM的58秒课程。</p>
<p>你可以在浏览器DevTools中尝试一下，在元素树中选择一个元素，然后在控制台中输入$0。它会为您提供了所选元素的参考。要将元素视为对象，请键入dir($0)。</p>
<p>你可以在<a href="https://developers.google.com/web/tools/chrome-devtools/console/command-line-reference">控制台中做很多事情</a>。</p>
<p><img src="https://p0.ssl.qhimg.com/t01132f7f9f4d990cdb.jpg" alt=""></p>
<h3>#1 table methods</h3>
<p>table （仍然是排列网站的第一种方式）有很多漂亮的方法，使得构建它们就像构建一个Ikea表一样简单。</p>
<p>使用document.createElement()只会创造一个单一的table，不过如果直接在table元素上调用它，.insertRow（）方法甚至会为你插入一个<code>&lt;tbody&gt;</code>。不是很好吗？</p>
<h3>#2 scrollIntoView()</h3>
<p>您知道如果在URL中有#something，那么当页面加载时，浏览器将滚动页面以便您可以看到具有该ID的元素？</p>
<p>这是非常周到的，但如果您在页面加载后渲染该元素，则它不起作用。</p>
<p>您可以使用以下方法手动重新创建此行为：</p>
<h3>#3 hidden</h3>
<p>无论如何，你有没有做过myElement.style.display ='none'来隐藏一个元素？好吧，别这样做了！</p>
<p>你可以用myElement.hidden = true。</p>
<h3>#4 toggle()</h3>
<p>好的，这也不是一个元素方法，它是一个元素属性的方法。具体来说，它是一种使用myElement.classList.toggle（'some-class'）来切换从元素添加/删除类的方法。</p>
<p>您应该刚刚将第二个参数传递给toggle方法。如果成功，你的 class将被添加到元素中。</p>
<h3>#5 querySelector()</h3>
<p>好的，你肯定已经知道了这个，但我怀疑你们中有17％的人不知道你可以在任何元素上使用它。</p>
<p>例如，myElement.querySelector（'.my-class'）只匹配具有类my-class并且是myElement的后代的元素。</p>
<h3>#6 closest()</h3>
<p>这是一个可用于查看_up_元素树的所有元素的方法。它就像一个reverso querySelector（）。所以，我可以使用这样的方式得到当前部分的标题：</p>
<p>到第一个<code>&lt;article&gt;</code>然后回到第一个<code>&lt;h1&gt;</code>。</p>
<h3>#7 getBoundingClientRect()</h3>
<p>这将返回一个整洁的小对象，其中包含有关您调用它的元素的一些维度细节。</p>
<p>但请注意两种不同的方式：</p>
<ul>
<li><p>调用它会导致重新绘制。根据设备和页面的复杂程度，这可能需要几毫秒。如果你反复打电话，请密切注意，例如在动画中。</p>
</li>
<li><p>并非所有浏览器都返回所有这些值。</p>
</li>
</ul>
<h3>#8 matches()</h3>
<p>可以使用它来检查特定元素是否具有特定类。</p>
<h3>#9 insertAdjacentElement()</h3>
<p>我今天学到了这个！它就像appendChild（），但可以更好地控制你追加那个child的位置。</p>
<p>parentEl.insertAdjacentElement（'beforeend'，newEl）与执行parentEl.appendChild（newEl）相同，但您也可以指定beforebegin或afterbegin或afterend将其放在这些名称所暗示的位置。 </p>
<h3>#10 contains()</h3>
<p>你有没有想知道一个元素是否在另一个元素中？</p>
<p>例如，如果我正在处理鼠标单击并想知道它是发生在模态内还是外部（所以我可以关闭它）</p>
<h3>#11 getAttribute()</h3>
<p>当然，除了一个特定的情况外，所有元素方法中最无用的。</p>
<p>你还记得当我提到的时候，<em>properties</em>通常映射到<em>attributes</em>？</p>
<p>其中一个不实的情况是<code>&lt;a href="/animals/cat"&gt; Cat &lt;/a&gt;</code>等元素的href属性。</p>
<p>el.href不会像你期望的那样返回/ animals / cat。
这是因为<code>&lt;a&gt;</code>元素实现了HTMLHyperlinkElementUtils接口，该接口具有一堆辅助属性，如协议和散列，可以告诉您有关链接目标的信息。</p>
<p>其中一个有用的属性是href，它将为您提供<em>full URL</em>，包含所有修剪，而不是属性中的相对URL。</p>
<p>因此，如果您想要href属性中的文字字符串，则必须使用el.getAttribute（'href'）。</p>
<h3>#12 the dialog element trio</h3>
<p>相对较新的<code>&lt;dialog&gt;</code>元素show（）和close（）将完全按照你的期望去做。</p>
<p>但是showModal（）将在页面中心的其他所有内容上显示<code>&lt;dialog&gt;</code>，就像你想要你的模态一样。
无需z-index或手动添加灰色背景或监听转义键以关闭它 - 浏览器知道模态如何工作并将为您完成所有这些操作。</p>
<h3>#13 forEach()</h3>
<p>当您获得对元素列表的引用时，可以使用forEach（）迭代它们。</p>
<p>这是因为getElementsByTagName和其他get ...方法返回一个HTMLCollection，但querySelectorAll返回一个NodeList。</p>
<p>NodeList接口为我们提供了forEach（）方法（以及keys（），values（）和entries（））</p>
<p>如果每个人都只是简单地返回数组而不是试图用他们不完整的数组来获得所有的幻想，那真的会更好。
但是不要害怕，因为ECMA的优秀人员给了我们Array.from（），它会把像数组一样的东西变成数组。</p>
<p>通过创建数组，您可以使用map（）和filter（）以及reduce（）或任何其他数组方法。</p>
<p>filter( )是我最喜欢的方式，让我将来试图弄清楚它的作用。</p>
<h3>#14 Forms</h3>
<p>您可能已经知道的<code>&lt;form&gt;</code>有一个submit（）方法。您知道表单具有reset（）方法的可能性稍微小一些，如果您在表单元素上使用验证，则可以使用reportValidity（）。</p>
<p>您还可以使用带有点表示法的表单元素属性来通过其name属性引用元素。例如，myFormEl.elements.email将返回属于<code>&lt;form&gt;</code>的元素<code>&lt;input name =“email”/&gt;</code>。</p>
<p>例如：如果您有三个单选按钮，每个按钮具有相同的名称animal，则formEl.elements.animal将为您提供对该组单选按钮的引用（1个控件，3个元素）。</p>
<p>并且formEl.elements.animal.value将返回选择的任何单选按钮的值。</p>
<p>如果你考虑它，这是奇怪的语法。分解，brotha：formEl是一个元素，elements是一个HTMLFormControlsCollection，一个非真实数组，其中每个项目不一定是HTML元素。动物是几个单选按钮的集合，只是因为它们具有相同的名称属性（只是为此目的有一个RadioNodeList接口），并且值查找选择集合中任何单选按钮的value属性。</p>
<h3>#15 select()</h3>
<p>.select（）方法将选择您调用它的任何输入中的所有文本。</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/15-html-element-methods-you-ve-potentially-never-heard-of](https://www.zcfy.cc/article/15-html-element-methods-you-ve-potentially-never-heard-of)
原文标题: 你可能从未听说过的15种HTML元素方法！
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
