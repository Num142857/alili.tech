---
title: 'React源码之Diff算法' 
date: 2019-01-04 2:30:10
hidden: true
slug: vwuf8pyiju
categories: [reprint]
---

{{< raw >}}

                    
<p>React框架使用的目的，就是为了维护状态，更新视图。</p>
<p>为什么会说传统DOM操作效率低呢？当使用document.createElement()创建了一个空的Element时，会需要按照标准实现一大堆的东西，如下图所示。此外，在对DOM进行操作时，如果一不留神导致回流，性能可能就很难保证了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010686587" src="https://static.alili.tech/img/remote/1460000010686587" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>相比之下，JS对象的操作却有着很高的效率，通过操作JS对象，根据这个用 JavaScript 对象表示的树结构来构建一棵真正的DOM树，正是React对上述问题的解决思路。之前的文章中可以看出，使用React进行开发时， DOM树是通过Virtual DOM构造的，并且，React在Virtual DOM上实现了DOM diff算法，当数据更新时，会通过diff算法计算出相应的更新策略，尽量只对变化的部分进行实际的浏览器的DOM更新，而不是直接重新渲染整个DOM树，从而达到提高性能的目的。在保证性能的同时，使用React的开发人员就不必再关心如何更新具体的DOM元素，而只需要数据状态和渲染结果的关系。</p>
<p><a href="http://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf" rel="nofollow noreferrer" target="_blank">传统的diff算法</a>通过循环递归来对节点进行依次比较还计算一棵树到另一棵树的最少操作，算法复杂度为O(n^3)，其中n是树中节点的个数。尽管这个复杂度并不好看，但是确实一个好的算法，只是在实际前端渲染的场景中，随着DOM节点的增多，性能开销也会非常大。而React在此基础之上，针对前端渲染的具体情况进行了具体分析，做出了相应的优化，从而实现了一个稳定高效的diff算法。</p>
<p>diff算法有如下三个策略：</p>
<ol>
<li><p>DOM节点跨层级的移动操作发生频率很低，是次要矛盾；</p></li>
<li><p>拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构，这里也是抓前者放后者的思想；</p></li>
<li><p>对于同一层级的一组子节点，通过唯一id进行区分，即没事就warn的key。<br>基于各自的前提策略，React也分别进行了算法优化，来保证整体界面构建的性能。</p></li>
</ol>
<h2 id="articleHeader0">虚拟DOM树分层比较</h2>
<p>两棵树只会对同一层次的节点进行比较，忽略DOM节点跨层级的移动操作。React只会对相同颜色方框内的DOM节点进行比较，即同一个父节点下的所有子节点。当发现节点已经不存在，则该节点及其子节点会被完全删除掉，不会用于进一步的比较。这样只需要对树进行一次遍历，便能完成整个DOM树的比较。由此一来，最直接的提升就是复杂度变为线型增长而不是原先的指数增长。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010686588" src="https://static.alili.tech/img/remote/1460000010686588" alt="" title="" style="cursor: pointer;"></span></p>
<p>值得一提的是，如果真的发生跨层级移动(如下图)，例如某个DOM及其子节点进行移动挂到另一个DOM下时，React是不会机智的判断出子树仅仅是发生了移动，而是会直接销毁，并重新创建这个子树，然后再挂在到目标DOM上。从这里可以看出，在实现自己的组件时，保持稳定的DOM结构会有助于性能的提升。事实上，React官方也是建议不要做跨层级的操作。因此在实际使用中，比方说，我们会通过CSS隐藏或显示某些节点，而不是真的移除或添加DOM节点。其实一旦接受了React的写法，就会发现前面所说的那种移动的写法几乎不会被考虑，这里可以说是React限制了某些写法，不过遵守这些实践确实会使得React有更好的渲染性能。如果真的需要有移动某个DOM的情况，或许考虑考虑尽量用CSS3来替代会比较好吧。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010686589" src="https://static.alili.tech/img/remote/1460000010686589" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>关于这一部分的源码，首先需要提到的是，React是如何控制“层”的。在许多源码阅读的文章里(搜到的讲的比较细的一般都是两三年前啦)，都是说用一个updateDepth或者某种控制树深的变量来记录跟踪。事实上就目前版本来看，已经不是这样了(如果我没看错…)。ReactDOMComponent .updateComponent方法用来更新已经分配并挂载到DOM上的DOM组件，并在内部调用ReactDOMComponent._updateDOMChildren。而ReactDOMComponent通过_assign将ReactMultiChild.Mixin挂到原型上，获得ReactMultiChild中定义的方法updateChildren（事实上还有updateTextContent等方法也会在不同的分支里被使用，React目前已经对这些情形做了很多细化了）。ReactMultiChild包含着diff算法的核心部分，接下来会慢慢进行梳理。到这里我们暂时不必再继续往下看，可以注意prevChildren和nextChildren这两个变量，当然removedNodes、mountImages也是意义比较明显且很重要的变量：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010686590" src="https://static.alili.tech/img/remote/1460000010686590" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>prevChildren和nextChildren都是ReactElement，也就是virtual DOM，从它们的$$typeof: Symbol(react.element)就可看出；removedNodes保存删除的节点，mountImages则是保存对真实DOM的映射，或者可以理解为要挂载的真实节点，这些变量会随着调用栈一层层往下作为参数传下去并被修改和包装。</p>
<p>而控制树的深度的方法就是靠传入nextNestedChildrenElements，把整个树的索引一层层递归的传下去，同时传入prevChildren这个虚拟DOM，进入_reconcilerUpdateChildren方法，会在里面通过flattenChildren方法（当然里面还有个traverse方法）来访问我们的子树指针nextNestedChildrenElements，得到与prevChildren同层的nextChildren。然后ReactChildReconciler.updateChildren就会将prevChildren、nextChildren封装成ReactDOMComponent类型，并进行后续比较和操作。</p>
<p>至此，同层比较叙述结束，后面会继续讨论针对组件的diff和对元素本身的diff。</p>
<h2 id="articleHeader1">组件间的比较</h2>
<p>参考<a href="https://facebook.github.io/react/docs/reconciliation.html" rel="nofollow noreferrer" target="_blank">官方文档</a>及其他资料，可以讲组件间的比较策略总结如下：</p>
<ol>
<li><p>如果是同类型组件，则按照原策略继续比较virtual DOM树；</p></li>
<li><p>如果不是，则将该组件判断为dirty component，然后整个unmount这个组件下的子节点对其进行替换；</p></li>
<li><p>对于同类型组件，virtual DOM可能并没有发生任何变化，这时我们可以通过shouldCompoenentUpdate钩子来告诉该组件是否进行diff，从而提高大量的性能。</p></li>
</ol>
<p>这里可以看出React再次抓了主要矛盾，对于不同组件但结构相似的情形不再去关注，而是对相同组件、相似结构的情形进行diff算法，并提供钩子来进一步优化。可以说，对于页面结构基本没有变化的情况，确实是有着很大的优势。</p>
<h2 id="articleHeader2">元素间的比较</h2>
<p>这一节算是diff算法最核心的部分，我会尝试着对算法的思想进行分析，并结合自己的demo来增进理解。</p>
<p>例子很简单，是一个涉及到新集合中有新加入的节点且老集合存在需要删除的节点的情形。如下图所示。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010686591" src="https://static.alili.tech/img/remote/1460000010686591" alt="" title="" style="cursor: pointer;"></span></p>
<p>也就是说，通过点击来控制文字和数字的显示与消失。这种JSX可以说是太常用了。正好借学习diff算法的机会，来看看就这种最基本的结构，React是怎么做的。</p>
<p>首先先在ReactMultiChild中的_updateChildren中打上第一个debugger。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010686592" src="https://static.alili.tech/img/remote/1460000010686592" alt="" title="" style="cursor: pointer;"></span></p>
<p>断点之前的代码会得到prevChildren和nextChildren，他们经过处理会从ReactElement数组变成一个奇怪的对象，key为“.0”、“.1”这样的带点序号(这里不妨先多说一句，这是React为一个个组件们默认分配的key，如果这里我强行设置一个key给h2h3标签，那么它就会拥有如’$123’这样的key)，值为ReactDOMComponent 组件，前面写初次渲染的文章中提到过ReactDOMComponent就是最终渲染到DOM之前的那一环。而在本demo中，prevChildren存放着“哈哈哈的h1标签”和“142567的h3标签”，而nextChildren存放着“哈哈哈的h1标签”和“你好啊的h2标签”。</p>
<p>先不看若干index变量，看到for循环的in写法，即可明白是在遍历存放了新的ReactDOMComponent的对象，并且通过hasOwnProperty来过滤掉原型上的属性和方法。接着各自拿到同层节点的第一个，并对二者进行比较。如果相同，则enqueue一个moveChild方法返回的type为MOVE_EXISTING的对象到updates里，即把更新放入一个队列，moveChild也就是移动已有节点，但是是否真的移动会根据整体diff算法的结果来决定(本例当然是没移动了)，然后修改若干index量；否则，就会计算一堆index(这里其实是算法的核心，此处先不细说)，然后再次enqueue一个update，事实上是一个type属性为INSERT_MARKUP的对象。对于本例而言，h1标签不变，则会先来一个MOVE_EXISTING对象，然后h3变h2，再来一个INSERT_MARKUP，然后通过ReactReconciler.getHostNode根据nextChild得到真实DOM。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010686593" src="https://static.alili.tech/img/remote/1460000010686593" alt="" title="" style="cursor: pointer;"></span></p>
<p>这个for-in结束后，则是会把需要删除的节点用enqueue的方法继续入队unmount操作，这里this._unmountChild返回的是REMOVE_NODE对象，至此，整个更新的diff流程就走完了，而updates保存了全部的更新队列，最终由processQueue来挨个执行更新。</p>
<p>那么细节在哪里？慢慢来。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010686594" src="https://static.alili.tech/img/remote/1460000010686594" alt="" title="" style="cursor: pointer;"></span></p>
<p>首先，React为同层节点比较提供了若干操作。早期版本有INSERT_MARKUP、MOVE_EXISTING、REMOVE_NODE这三个增、移、删操作，现在又加入了SET_MARKUP和TEXT_CONTENT这俩操作。</p>
<p>INSERT_MARKUP，新的component类型(nextChildren里的)不在老集合(prevChildren)里，即是全新的节点，需要对新节点执行插入操作；</p>
<p>MOVE_EXISTING，在老集合有新component类型，且element是可更新的类型，这种情况下prevChild===nextChild，就需要做移动操作，可以复用以前的DOM节点。</p>
<p>REMOVE_NODE，老component类型在新集合里也有，但对应的element不同则不能直接复用和更新，需要执行删除操作；或者老component不在新集合里的，也需要执行删除操作。</p>
<p>所有的操作都会通过enqueue来入队，把更新细节隐藏，而如何判断做出何种更新操作，则是diff算法之所在。我们回到前面的代码重新再看，并分情况讨论其中的原理。</p>
<h4>代码分析</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010686595" src="https://static.alili.tech/img/remote/1460000010686595" alt="" title="" style="cursor: pointer;"></span></p>
<p>首先对新集合的节点(nextChildren)进行in循环遍历，通过唯一的key(这里是变量name，前面提到过nextChildren和prevChildren是以对象的形式存储ReactDOMComponent的)可以取得新老集合中相同的节点，如果不存在，prevChildren即为undefined。根据图中代码，如果存在相同节点，也即prevChild === nextChild，则进行移动操作，但在移动前需要将当前节点在老集合中的位置与 lastIndex 进行比较，见moveChild函数，如下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010686596" src="https://static.alili.tech/img/remote/1460000010686596" alt="" title="" style="cursor: pointer;"></span></p>
<p>if (child._mountIndex &lt; lastIndex)，则进行节点移动操作，否则不执行该操作。这是一种顺序优化手段，lastIndex一直在更新，表示访问过的节点在老集合中最右的位置（即最大的位置），如果新集合中当前访问的节点比lastIndex大，说明当前访问节点在老集合中就比上一个节点位置靠后，则该节点不会影响其他节点的位置，因此不用添加到差异队列中，即不执行移动操作，只有当访问的节点比lastIndex小时，才需要进行移动操作。</p>
<h4>新老集合节点相同、只需要移动的情形</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010686597" src="https://static.alili.tech/img/remote/1460000010686597" alt="" title="" style="cursor: pointer;"></span></p>
<p>图是直接拷来的…画那么好我就不重复画轮子了。还是源码，就按上面的图来讲。</p>
<p>源码中会开始对nextChildren(即新的节点状态 对象形式)进行遍历，并且对象本身是以键值对的形式存储这些节点的状态。首先，key=’b’时，通过prevChildren[name]的方式(name即为key)取老集合节点中是否存在key为b的节点，显然，如果存在，则取得，不存在，则为undefined。然后，判断是否相等。当我们两个key值相同的B节点被判定相等时，enqueue一个’ MOVE_EXISTING’操作。这一操作内部会作如下判断：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010686598" src="https://static.alili.tech/img/remote/1460000010686598" alt="" title="" style="cursor: pointer;"></span></p>
<p>child即为prevChild，也就是判断B._mountIndex &lt; lastIndex，lastIndex是prevChildren最近访问的最新index，初始为0(其实因为这些个children都是对象，所以index更多的是计数而非下标)。这里，B._mountIndex=1，lastIndex为0，所以不做移动操作更新。然后更新lastIndex，如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010686599" src="https://static.alili.tech/img/remote/1460000010686599" alt="" title="" style="cursor: pointer;"></span></p>
<p>我们知道prevChild就是B，则prevChild._mountIndex如前所示为1，所以lastIndex更新为1，这样lastIndex就可以记录着prevChildren中最后访问的那个的序号。再然后，更新B的位置为信集合中的位置：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010686600" src="https://static.alili.tech/img/remote/1460000010686600" alt="" title="" style="cursor: pointer;"></span></p>
<p>nextIndex随着nextChildren中遍历的子元素递增，此时为1，也就是说，把B的挂载位置设置为0，就相当于告诉B你的位置从1移动到了0。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010686601" src="https://static.alili.tech/img/remote/1460000010686601" alt="" title="" style="cursor: pointer;"></span></p>
<p>最后更新nextIndex，准备为下一个放在位置1的元素准备序号。这里getHostNode方法会返回一个真正的DOM，它主要是给enqueue使用，可以理解为开始执行更新队列时能让React知道这些更新的节点要放到的DOM的位置。</p>
<p>第二轮，从新集合取到A，判断到老集合中存在相同节点，同样是对比位置来判断是否进行移动操作。只不过，这一次A._mountIndex=0,lastIndex在上一轮更新为1，满足child._mountIndex&lt;lastIndex的条件，于是enqueue移动操作。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010686602" src="https://static.alili.tech/img/remote/1460000010686602" alt="" title="" style="cursor: pointer;"></span></p>
<p>其中toIndex就是nextIndex，目前为1，很正确嘛。然后继续更新lastIndex为1，并更新A._mountIndex=1，然后后续基本一致。<br>  剩下两轮判断，不出上述情形。在此不再细表。</p>
<h4>存在需要插入、删除节点的情形</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010686603" src="https://static.alili.tech/img/remote/1460000010686603" alt="" title="" style="cursor: pointer;"></span></p>
<p>还是拿了大佬的图，哈哈。这里其实就是更完整的情形，也就会涉及到整个代码流程，当然也并不复杂。<br>首先，还是从新集合先取到B，判断出老集合中有B，于是本轮与上面的第一轮就一样了（同一段代码嘛）。<br>第二轮，从新集合取到E，但是老集合中不存在，于是走入新流程：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010686604" src="https://static.alili.tech/img/remote/1460000010686604" alt="" title="" style="cursor: pointer;"></span></p>
<p>讲白了，就是enqueue来创建节点到指定位置，然后更新E的位置，并nextIndex++来进入下一个节点的执行。</p>
<p>第三轮，从新集合取到C，C在老集合中有，但是判断之后并不进行移动操作，继续各种更新然后进入下一个节点的判断。</p>
<p>第四轮，从新集合中取到A，A也存在，所以enqueue移动操作。</p>
<p>至此，diff已经完成，这之后会对removedNodes进行循环遍历，这个对象是在this._reconcilerUpdateChildren就对比新老集合得到的。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010686605" src="https://static.alili.tech/img/remote/1460000010686605" alt="" title="" style="cursor: pointer;"></span></p>
<p>这样一来，新集合中不存在的D也就被清除了。整体上看，是先创建，后删除的方式。</p>
<p>Ok，差不多啦，diff算法的核心就是这么回事啦。</p>
<h2 id="articleHeader3">总结</h2>
<ol>
<li><p>通过diff策略，将算法从O(n^3)简化为O(n)</p></li>
<li><p>分层求异，对tree diff进行优化</p></li>
<li><p>分组件求异，相同类生成相似树形结构、不同类生成不同树形结构，对component diff进行优化</p></li>
<li><p>设置key，对element diff进行优化</p></li>
<li><p>尽量保持稳定的DOM结构、避免将最后一个节点移动到列表首部、避免节点数量过大或更新过于频繁</p></li>
</ol>
<h2 id="articleHeader4">补充</h2>
<p><a href="https://facebook.github.io/react/docs/reconciliation.html" rel="nofollow noreferrer" target="_blank">官方文档</a><br>Keys should be stable, predictable, and unique. Unstable keys (like those produced by Math.random() will cause many component instances and DOM nodes to be unnecessarily recreated, which can cause performance degradation and lost state in child components.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React源码之Diff算法

## 原文链接
[https://segmentfault.com/a/1190000010686582](https://segmentfault.com/a/1190000010686582)

