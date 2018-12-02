---
title: '【React进阶系列】从零开始手把手教你实现一个Virtual DOM（三）' 
date: 2018-12-03 2:30:08
hidden: true
slug: ku7sbdz3un7
categories: [reprint]
---

{{< raw >}}

                    
<h2>上集回顾</h2>
<p><a href="https://segmentfault.com/a/1190000014603332">【React进阶系列】从零开始手把手教你实现一个Virtual DOM（二）</a></p>
<p>上集我们实现了首次渲染从JSX=&gt;Hyperscript=&gt;VDOM=&gt;DOM的过程，今天我们来看一下当数据变动的时候怎么更新DOM，也就是下图的右半边部分。<br><span class="img-wrap"><img data-src="/img/bV9o7Q?w=314&amp;h=517" src="https://static.alili.tech/img/bV9o7Q?w=314&amp;h=517" alt="图片描述" title="图片描述"></span></p>
<h2>改写view()</h2>
<pre><code>function view(count) { 
  const r = [...Array(count).keys()]
  return &lt;ul id="filmList" className={`list-${count % 3}`}&gt;
    { r.map(n =&gt; &lt;li&gt;item {(count * n).toString()}&lt;/li&gt;) }
  &lt;/ul&gt;
}</code></pre>
<p>我们的view函数接收一个参数count，变量r表示从0到count-1的一个数组。假如count=3, r=[0, 1, 2]。ul的className的值有三种可能：list-0, list-1, list-2。li的数量取决于count。</p>
<h2>改写render()</h2>
<pre><code>function render(el) {
  const initialCount = 0

  el.appendChild(createElement(view(initialCount)))
  setTimeout(() =&gt; tick(el, initialCount), 1000)
}

function tick(el, count) {
  const patches = diff(view(count + 1), view(count))
  patch(el, patches)

  if(count &gt; 5) { return }
  setTimeout(() =&gt; tick(el, count + 1), 1000)
}</code></pre>
<p>render函数有两个修改，首先调用view()的时候传入count=0。其次，写了一个定时器，1秒后悔执行tick函数。tick函数接收两个参数，el代表节点元素，count是当前计数值。</p>
<p>tick函数依次做了这几件事：</p>
<ol>
<li>调用diff函数，对比新旧两个VDOM，根据两者的不同得到需要修改的补丁</li>
<li>将补丁patch到真实DOM上</li>
<li>当计数器小于等于5的时候，将count加1，再继续下一次tick</li>
<li>当计数器大于5的时候，结束</li>
</ol>
<p>下面我们来实现diff函数和patch函数。</p>
<p>我们先列出来新旧两个VDOM对比，会有哪些不同。在index.js文件的最前面声明一下几个常量。</p>
<pre><code>const CREATE = 'CREATE'   //新增一个节点
const REMOVE = 'REMOVE'   //删除原节点
const REPLACE = 'REPLACE'  //替换原节点
const UPDATE = 'UPDATE'    //检查属性或子节点是否有变化
const SET_PROP = 'SET_PROP'  //新增或替换属性
const REMOVE_PROP = 'REMOVE PROP'  //删除属性</code></pre>
<h2>diff()</h2>
<pre><code>function diff(newNode, oldNode) {
   if (!oldNode) {
     return { type: CREATE, newNode }
   }

   if (!newNode) {
     return { type: REMOVE }
   }

   if (changed(newNode, oldNode)) {
     return { type: REPLACE, newNode }
   }

   if (newNode.type) {
     return {
       type: UPDATE,
       props: diffProps(newNode, oldNode),
       children: diffChildren(newNode, oldNode)
     }
   }
}</code></pre>
<ol>
<li>假如旧节点不存在，我们返回的patches对象, 类型为新增节点；</li>
<li>假如新节点不存在，表示是删除节点；</li>
<li>假如两者都存在的话，调用changed函数判断他们是不是有变动；</li>
<li>假如两者都存在，且changed()返回false的话，判断新节点是否是VDOM（根据type是否存在来判断的，因为type不存在的话，newNode要么是空节点，要么是字符串）。假如新节点是VDOM，则返回一个patches对象，类型是UPDATE，同时对props和children分别进行diffProps和diffChildren操作。</li>
</ol>
<p>下面我们一次看一下changed, diffProps, diffChildren函数。</p>
<h2>changed()</h2>
<pre><code>function changed(node1, node2) {
  return typeof(node1) !== typeof(node2) ||
         typeof(node1) === 'string' &amp;&amp; node1 !== node2 ||
         node1.type !== node2.type
}</code></pre>
<p>检查新旧VDOM是否有变动的方法很简单，</p>
<ol>
<li>首先假如数据类型都不一样，那肯定是变动了；</li>
<li>其次假如两者的类型都是纯文本，则直接比较两者是否相等；</li>
<li>最后比较两者的类型是否相等。</li>
</ol>
<h2>diffProps()</h2>
<pre><code>function diffProps(newNode, oldNode) {
  let patches = []

  let props = Object.assign({}, newNode.props, oldNode.props)
  Object.keys(props).forEach(key =&gt; {
    const newVal = newNode.props[key]
    const oldVal = oldNode.props[key]
    if (!newVal) {
      patches.push({type: REMOVE_PROP, key, value: oldVal})
    }

    if (!oldVal || newVal !== oldVal) {
      patches.push({ type: SET_PROP, key, value: newVal})
    }
  })

  return patches
}</code></pre>
<p>比较新旧VDOM的属性的变化，并返回相应的patches。</p>
<ol>
<li>首先我们采用最大可能性原则，将新旧VDOM的所有属性都合并赋值给一个新的变量props</li>
<li>遍历props变量的所有Keys，依次比较新旧VDOM对于这个KEY的值</li>
<li>假如新值不存在，表示这个属性被删除了</li>
<li>假如旧值不存在，或者新旧值不同，则表示我们需要重新设置这个属性</li>
</ol>
<h2>diffChildren()</h2>
<pre><code>function diffChildren(newNode, oldNode) {
  let patches = []

  const maximumLength = Math.max(
    newNode.children.length,
    oldNode.children.length
  )
  for(let i = 0; i &lt; maximumLength; i++) {
    patches[i] = diff(
      newNode.children[i],
      oldNode.children[i]
    )
  }

  return patches
}</code></pre>
<p>同样采用最大可能性原则，取新旧VDOM的children的最长值作为遍历children的长度。然后依次比较新旧VDOM的在相同INDEX下的每一个child。</p>
<p><strong><em>这里需要强烈注意一下</em></strong><br>为了简化，我们没有引入key的概念，直接比较的是相同index下的child。所以假如说一个列表ul有5项，分别是li1, li2, li3, li4, li5; 如果我们删掉了第一项，新的变成了li2, li3, li4, li5。那么diffchildren的时候，我们会拿li1和li2比较，依次类推。这样一来，本来只是删除了li1, 而li2, li3, li4, li5没有任何变化，我们得出的diff结论却是[li替换，li2替换, li3替换, li4替换, li5删除]。所以react让大家渲染列表的时候，必须添加Key。</p>
<p>截止到现在，我们已经得到了我们需要的补丁。下面我们要将补丁Patch到DOM里。</p>
<h2>patch()</h2>
<pre><code>function patch(parent, patches, index = 0) {
  if (!patches) {
    return
  }

  const el = parent.childNodes[index]
  switch (patches.type) {
    case CREATE: {
      const { newNode } = patches
      const newEl = createElement(newNode)
      parent.appendChild(newEl)
      break
    }
    case REMOVE: {
      parent.removeChild(el)
      break
    }
    case REPLACE: {
      const {newNode} = patches
      const newEl = createElement(newNode)
      return parent.replaceChild(newEl, el)
      break
    }
    case UPDATE: {
      const {props, children} = patches
      patchProps(el, props)
      for(let i = 0; i &lt; children.length; i++) {
        patch(el, children[i], i)
      }
    }
  }
}</code></pre>
<ol>
<li>首先当patches不存在时，直接return，不进行任何操作</li>
<li>利用childNodes和Index取出当前正在处理的这个节点，赋值为el</li>
<li>开始判断补丁的类型</li>
<li>当类型是CREATE时，生成一个新节点，并append到根节点</li>
<li>当类型是REMOVE时，直接删除当前节点el</li>
<li>当类型是REPLACE时，生成新节点，同时替换掉原节点</li>
<li>当类型是UPDATE时，需要我们特殊处理</li>
<li>调用patchProps将我们之前diffProps得到的补丁渲染到节点上</li>
<li>遍历之前diffChildren得到的补丁列表，再依次递归调用patch</li>
</ol>
<p>最后我们再补充一下patchProps函数</p>
<h2>patchProps</h2>
<pre><code>function patchProps(parent, patches) {
  patches.forEach(patch =&gt; {
    const { type, key, value } = patch
    if (type === 'SET_PROP') {
      setProp(parent, key, value)
    }
    if (type === 'REMOVE_PROP') {
      removeProp(parent, key, value)
    }
  })
}

function removeProp(target, name, value) { //@
  if (name === 'className') {
    return target.removeAttribute('class')
  }

  target.removeAttribute(name)
}</code></pre>
<p>这个就不用我解释了，代码很直观，setProp函数在上一集我们已经定义过了。这样一来，我们就完成了整个数据更新导致DOM更新的完整过程。<br>npm run compile后打开浏览器查看效果，你应该看到是一个背景颜色在不同变化，同时列表项在逐渐增加的列表。</p>
<h2>完结撒花</h2>
<p>至此，我们的VDOM就全部完成了。系列初我提出的那几个问题不知道你现在是否有了答案。有答案的童鞋可以在文章评论区将你的见解跟大家分享一下。分析全面且准确的会收到我的特殊奖励。😁😁😁😁</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【React进阶系列】从零开始手把手教你实现一个Virtual DOM（三）

## 原文链接
[https://segmentfault.com/a/1190000014641724](https://segmentfault.com/a/1190000014641724)

