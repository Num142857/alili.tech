---
title: 'Javascript - 事件顺序' 
date: 2019-01-25 2:30:23
hidden: true
slug: 2syjrjeleno
categories: [reprint]
---

{{< raw >}}

            <p>Netscape 4 只支持事件捕获，Explorer只支持事件冒泡。Netscape 6和 Konqueror冒泡和捕获均支持，但Opera 和iCab冒泡和捕获均不支持。 </p>
<p>在<a href="https://www.quirksmode.org/js/introevents.html">介绍事件</a>的那篇文章中，我提了个看起来比较难以理解的问题：“假设一个元素及其祖先元素的事件句柄指向了同一事件，哪个先触发？”不出意料，这取决于浏览器。</p>
<p>这个问题其实很简单。假定一个父元素内有一个子元素：</p>
<pre><code class="hljs gherkin">-----------------------------------
|<span class="hljs-string"> element1                        </span>|
|<span class="hljs-string">   -------------------------     </span>|
|<span class="hljs-string">   </span>|<span class="hljs-string">element2               </span>|<span class="hljs-string">     </span>|
|<span class="hljs-string">   -------------------------     </span>|
|<span class="hljs-string">                                 </span>|
-----------------------------------

</code></pre><p>二者均有一个<code>onClick</code>事件句柄。如果用户点击了元素2，就会触发元素1和元素2的点击事件。可两个事件哪个先被触发呢？哪个事件句柄先执行呢？换句话说，<em>事件顺序</em>是怎样？</p>
<h3>两种模型</h3>
<p>可以预见的是，很久以前Netscape和Microsoftde的做法就是截然不同的。</p>
<ul>
<li><p>Netscape指定元素1的事件先发生，称之为事件_捕获_。</p>
</li>
<li><p>Microsoft表示元素2的事件先发生，称之为事件_冒泡_.</p>
</li>
</ul>
<p>以上的两种做法完全背道而驰。Explorer只支持事件冒泡。Mozilla,Opera 7和Konqueror冒泡和捕获均支持。旧版本的Opera和iCab冒泡和捕获均不支持。</p>
<h4>事件捕获</h4>
<p>当你使用事件捕获时：</p>
<pre><code class="hljs gherkin">               |<span class="hljs-string"> </span>|
---------------|<span class="hljs-string"> </span>|<span class="hljs-string">-----------------
</span>|<span class="hljs-string"> element1     </span>|<span class="hljs-string"> </span>|<span class="hljs-string">                </span>|
|<span class="hljs-string">   -----------</span>|<span class="hljs-string"> </span>|<span class="hljs-string">-----------     </span>|
|<span class="hljs-string">   </span>|<span class="hljs-string">element2  \ /          </span>|<span class="hljs-string">     </span>|
|<span class="hljs-string">   -------------------------     </span>|
|<span class="hljs-string">        Event CAPTURING          </span>|
-----------------------------------

</code></pre><p>元素1的事件句柄先被触发，元素2的事件句柄后被触发。</p>
<h4>事件冒泡</h4>
<p>当你使用事件冒泡时：</p>
<pre><code class="hljs gherkin">               / \
---------------|<span class="hljs-string"> </span>|<span class="hljs-string">-----------------
</span>|<span class="hljs-string"> element1     </span>|<span class="hljs-string"> </span>|<span class="hljs-string">                </span>|
|<span class="hljs-string">   -----------</span>|<span class="hljs-string"> </span>|<span class="hljs-string">-----------     </span>|
|<span class="hljs-string">   </span>|<span class="hljs-string">element2  </span>|<span class="hljs-string"> </span>|<span class="hljs-string">          </span>|<span class="hljs-string">     </span>|
|<span class="hljs-string">   -------------------------     </span>|
|<span class="hljs-string">        Event BUBBLING           </span>|
-----------------------------------

</code></pre><p>元素2的事件句柄先被触发，元素1的事件句柄后被触发。</p>
<h3>W3C 模型</h3>
<p>W3C明智地在争论中保持了中立。任何发生在<a href="http://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/">W3C 事件模型</a> 中的事件首先会被捕获，直到它到达目标元素才会冒泡。</p>
<pre><code class="hljs gherkin">                 |<span class="hljs-string"> </span>|<span class="hljs-string">  / \
-----------------</span>|<span class="hljs-string"> </span>|<span class="hljs-string">--</span>|<span class="hljs-string"> </span>|<span class="hljs-string">-----------------
</span>|<span class="hljs-string"> element1       </span>|<span class="hljs-string"> </span>|<span class="hljs-string">  </span>|<span class="hljs-string"> </span>|<span class="hljs-string">                </span>|
|<span class="hljs-string">   -------------</span>|<span class="hljs-string"> </span>|<span class="hljs-string">--</span>|<span class="hljs-string"> </span>|<span class="hljs-string">-----------     </span>|
|<span class="hljs-string">   </span>|<span class="hljs-string">element2    \ /  </span>|<span class="hljs-string"> </span>|<span class="hljs-string">          </span>|<span class="hljs-string">     </span>|
|<span class="hljs-string">   --------------------------------     </span>|
|<span class="hljs-string">        W3C event model                 </span>|
------------------------------------------

</code></pre><p>Web开发者可以选择是否在捕获或冒泡阶段注册一个事件句柄。这可以通过在<a href="https://www.quirksmode.org/js/events_advanced.html">先进模型</a>那篇有相应解释的<code>addEventListener()</code>方法实现。如果它的最后一个参数是<code>true</code>，事件句柄会为捕获阶段而设置，如果是<code>false</code>，事件句柄会为冒泡阶段而设置。</p>
<p>假设你这样做了</p>
<pre><code class="hljs actionscript">element1.addEventListener(<span class="hljs-string">'click'</span>,doSomething2,<span class="hljs-literal">true</span>)
element2.addEventListener(<span class="hljs-string">'click'</span>,doSomething,<span class="hljs-literal">false</span>)

</code></pre><p>假如用户点击元素2，会发生以下情况：</p>
<ol>
<li><p><code>点击</code>事件发生在捕获阶段。事件看起来好像元素2的任何祖先元素都有对应于捕获阶段的<code>onclick</code>事件句柄。</p>
</li>
<li><p>元素1上绑定的<code>doSomething2()</code>事件被执行。</p>
</li>
<li><p>事件传递到目标，没有发现任何一个对应捕获阶段的事件句柄。事件移向冒泡阶段并执行在冒泡阶段为元素2注册的<code>doSomething()</code>。</p>
</li>
<li><p>事件又一次向上传递并检查目标的任何祖先元素是否有对应冒泡阶段的事件句柄。最后没有发现任何句柄，因此什么也没发生。</p>
</li>
</ol>
<p>顺序反过来就是</p>
<pre><code class="hljs actionscript">element1.addEventListener(<span class="hljs-string">'click'</span>,doSomething2,<span class="hljs-literal">false</span>)
element2.addEventListener(<span class="hljs-string">'click'</span>,doSomething,<span class="hljs-literal">false</span>)

</code></pre><p>现在如果用户点击元素2，会发生以下情况：</p>
<ol>
<li><p><code>点击</code>事件发生于捕获阶段。事件会查看元素2的任何祖先元素是否存在对于捕获阶段的<code>onclick</code>事件句柄，但没有发现。</p>
</li>
<li><p>事件传递到目标。事件移动到自己的冒泡阶段并执行为元素2注册的对应冒泡阶段的<code>doSomething()</code>。</p>
</li>
<li><p>事件再次向上移动并检查目标的任何祖先元素是否有对应冒泡阶段的事件句柄。</p>
</li>
<li><p>事件在元素1上发现了事件句柄。于是<code>doSomething2()</code>被执行。</p>
</li>
</ol>
<h4>兼容传统模型</h4>
<p>在支持W3C DOM的浏览器中，一个传统的事件注册</p>
<pre><code class="hljs abnf">element1.onclick = doSomething2<span class="hljs-comment">;</span>

</code></pre><p>被视为在<em>冒泡阶段</em>注册。</p>
<h3>事件冒泡的使用</h3>
<p>很少有web开发者自觉使用事件捕获或冒泡。现在的Web网页没有必要将一个冒泡事件与几个不同的事件句柄绑定。用户可能会对点击一次鼠标后发生多个动作感到困惑，而你通常会保持你的事件处理脚本彼此分离。当用户点击了一个元素，一个动作被触发，点击另一个元素就会触发另一个动作。</p>
<p>当然在未来这种情况也许会改变，能有向上兼容的模型当然更好。但现在事件捕获和冒泡的主要实际应用是默认功能的注册。</p>
<h3>这总会发生</h3>
<p>你首先需要理解事件捕获或冒泡总会发生。如果你为整个文档定义了一个普通的onclick事件句柄：</p>
<pre><code class="hljs coffeescript"><span class="hljs-built_in">document</span>.onclick = doSomething;
<span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.captureEvents) <span class="hljs-built_in">document</span>.captureEvents(Event.CLICK);

</code></pre><p>文档中的任何<code>点击</code>事件都将冒泡到文档并触发那个事件句柄。仅当一个在它之前的事件处理脚本命令该事件停止冒泡，事件才不会冒泡到文档。</p>
<h3>使用</h3>
<p>由于任何事件都要在文档上结束，因此默认事件句柄成为可能。假设你有下面这个页面：</p>
<pre><code class="hljs gherkin">------------------------------------
|<span class="hljs-string"> document                         </span>|
|<span class="hljs-string">   ---------------  ------------  </span>|
|<span class="hljs-string">   </span>|<span class="hljs-string"> element1    </span>|<span class="hljs-string">  </span>|<span class="hljs-string"> element2 </span>|<span class="hljs-string">  </span>|
|<span class="hljs-string">   ---------------  ------------  </span>|
|<span class="hljs-string">                                  </span>|
------------------------------------

element1.onclick = doSomething;
element2.onclick = doSomething;
document.onclick = defaultFunction;

</code></pre><p>现在假如用户点击元素1或元素2，<code>doSomething()</code>被执行。只要愿意，你可以终止事件的传递。如果你没有终止它，事件会冒泡到<code>defaultFunction()</code>。如果用户点击了其他地方，<code>defaultFunction()</code>也被执行。这在某些时候会很有用。</p>
<p>在拖拽脚本中设置<em>文档宽度</em>事件句柄很有必要。通常一个图层的<code>mousedown</code>事件会选中这一图层，并使它响应<code>mousemove</code>事件。尽管<code>mousedown</code>为了避免浏览器bug通常在这一图层注册，但其他的事件句柄一定是文档宽度。</p>
<p>记住浏览器法则第一条：任何事都可能发生，尤其是当你没有准备时。可能当用户大幅度地移动鼠标时脚本无法正常工作，导致鼠标不会在图层上出现。</p>
<ul>
<li><p>如果<code>onmousemove</code>事件句柄注册给了图层，图层就不会对鼠标移动做出反应，这会让人困惑。</p>
</li>
<li><p>如果<code>onmouseup</code>事件句柄在图层上被注册，事件就不会被捕获。所以图层会保持对鼠标的反应，甚至当用户以为自己放下图层后仍会保持反应。</p>
</li>
</ul>
<p>所以在这种情况下冒泡是很有用的，因为在文档层面注册你的事件句柄能保证它们总会被执行。</p>
<h3>关闭这个功能</h3>
<p>但你经常想要停用所有的捕获和冒泡，因为这样函数间就不会彼此干扰。除此之外如果你的文档结构很复杂(有很多嵌套表格之类)，你可以通过关闭冒泡来节省系统资源。浏览器必须查看事件目标的每一个祖先元素是否存在事件句柄。即使什么都没发现，搜索仍然会耗费不少时间。</p>
<p>在微软模式下你必须设置事件的<code>cancleBubble</code>属性的值为true.</p>
<pre><code class="hljs stylus">window<span class="hljs-selector-class">.event</span><span class="hljs-selector-class">.cancelBubble</span> = true

</code></pre><p>W3C模型中你必须调用<code>stopPropagation()</code>方法。</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">e</span><span class="hljs-selector-class">.stopPropagation</span>()

</code></pre><p>这会阻止冒泡阶段事件的传递。在跨浏览器时：</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doSomething</span>(<span class="hljs-params">e</span>)
</span>{
  <span class="hljs-keyword">if</span> (!e) <span class="hljs-keyword">var</span> e = <span class="hljs-built_in">window</span>.event;
  e.cancelBubble = <span class="hljs-literal">true</span>;
  <span class="hljs-keyword">if</span> (e.stopPropagation) e.stopPropagation();
}

</code></pre><p>在浏览器中设置<code>cancleBubble</code>属性无法保证不会有负面效果。浏览器会创建属性。当然它并没有真正禁止冒泡，但任这种分配本身是安全的。</p>
<h3>当前目标</h3>
<p>正如早先所见，拥有<code>target</code>或<code>srcElement</code>的事件包含了事件发生时对元素的一个引用。我们的例子是元素2，因为用户会点击它。</p>
<p>理解在冒泡和捕获阶段(或任意一个）目标不变是很重要的：它始终保持对元素2的引用。</p>
<p>但假设我们注册了以下这些事件句柄;</p>
<pre><code class="hljs abnf">element1.onclick = doSomething<span class="hljs-comment">;</span>
element2.onclick = doSomething<span class="hljs-comment">;</span>

</code></pre><p>如果用户点击元素2，<code>doSomething()</code>会被执行两次。但你怎么知道是哪个HTML元素最近绑定了这个事件？<code>target/srcElement</code>没有给出线索，因为元素2是事件的源头，它们经常指向元素2。</p>
<p>为解决这个问题W3C增加了<code>currentTarget</code>属性。它包含了最近绑定了事件的元素的引用：这正是我们需要的。不幸的是，微软模式并没有一个与之相似的属性。</p>
<p>你可以使用<a href="https://www.quirksmode.org/js/this.html"><code>this</code>关键字</a>.在例子中它指向事件绑定的那个HTML元素，就像<code>currentTarget</code>。</p>
<h3>微软模型的问题</h3>
<p>但当你使用微软事件注册模型时<code>this</code>关键字没有指向HTML元素。结合微软模型中一个与<code>currentTarget</code>类似的属性的缺点，这意味着如果你这样做的话：</p>
<pre><code class="hljs less"><span class="hljs-selector-tag">element1</span><span class="hljs-selector-class">.attachEvent</span>(<span class="hljs-string">'onclick'</span>,doSomething)
<span class="hljs-selector-tag">element2</span><span class="hljs-selector-class">.attachEvent</span>(<span class="hljs-string">'onclick'</span>,doSomething)

</code></pre><p>你无法知道是哪个HTML元素最近绑定了事件。这是微软事件注册模型最严重的问题，也是我选择从不使用它的原因，哪怕是IE/WIN才有的应用我也不使用。</p>
<p>I hope Microsoft will soon add a <code>currentTarget</code>–like property — or maybe
even follow the standard? Web developers need this information.
我希望微软可以尽快地添加一个类似<code>currentTarget</code>的属性—或者干脆遵从标准？Web开发者需要这个好消息。</p>
<h3>尾声</h3>
<p>如果你从头到尾看完了这篇文章，建议你应该继续看看<a href="https://www.quirksmode.org/js/events_mouse.html">鼠标事件</a>。</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript - 事件顺序

## 原文链接
[https://www.zcfy.cc/article/javascript-event-order](https://www.zcfy.cc/article/javascript-event-order)

