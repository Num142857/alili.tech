---
title: '【React进阶系列】从零开始手把手教你实现一个Virtual DOM（二）' 
date: 2018-12-03 2:30:08
hidden: true
slug: hltrmqu7pwe
categories: [reprint]
---

{{< raw >}}

                    
<h2>上集回顾</h2>
<p><a href="https://segmentfault.com/a/1190000014572815">从零开始手把手教你实现一个Virtual DOM（一）</a><br>上一集我们介绍了什么是VDOM，为什么要用VDOM，以及我们要怎样来实现一个VDOM。我们再来看一下这张蓝图，今天我们要实现的是这张图的左半部分。</p>
<p><span class="img-wrap"><img data-src="/img/bV9o7Q?w=314&amp;h=517" src="https://static.alili.tech/img/bV9o7Q?w=314&amp;h=517" alt="图片描述" title="图片描述"></span></p>
<h2>package.json</h2>
<pre><code>{
  "name": "vdom",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "compile": "babel index.js --out-file compiled.js"
  },
  "author": "",
  "license": "",
  "devDependencies": {
    "babel-cli": "^6.23.0",
    "babel-plugin-transform-react-jsx": "^6.23.0"
  }
}
</code></pre>
<p>这里主要主要两点：</p>
<ol>
<li>
<code>devDependencies</code>中依赖babel-cli和babel-plugin-transform-react-jsx这两个库，前者提供Babel的命令行功能，后者主要帮我们把jsx转化成js。</li>
<li>
<code>scripts</code>中我们指定了一条命令：<code>complile</code>，每次当我们在当前目录下的命令行中敲<code>npm run compile</code>时，babal就会将我们的<code>index.js</code>转化后新建一个<code>compile.js</code>文件。</li>
</ol>
<p>完成后，在命令行中输入<code>npm install</code>安装下依赖。</p>
<h2>.babelrc</h2>
<pre><code>{
  "plugins": [
    ["transform-react-jsx", {
      "pragma": "h"  // default pragma is React.createElement
    }]
  ]
}
</code></pre>
<p>在babel的配置文件中，我们指定<code>transform-react-jsx</code>这个插件将转化后的函数名设置为<code>h</code>。默认的函数名是<code>React.createElement</code>，我们不依赖react，所以显然换个自己的名字更合适。这里不清楚<code>h</code>是干什么的不要紧，等会看到代码你就知道了。</p>
<h2>index.html</h2>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;title&gt;VDOM&lt;/title&gt;
    &lt;style&gt;
        body { margin: 0; font-size: 24; font-family: sans-serif }
        .list { text-decoration: none }
        .list .main { color: red }
    &lt;/style&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;script src="compiled.js"&gt;&lt;/script&gt;
    &lt;div id="app"&gt;&lt;/div&gt;
    
    &lt;script&gt;
      var app = document.getElementById('app')
      render(app)
    &lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre>
<p>这个HTML还是很直观的，类似React，我们有一个根节点id是app。然后我们render函数最终生成的DOM会插入到app这个根节点里。注意我们引用的compile.js文件是babel根据等会要写的index.js文件自动生成的。</p>
<h2>index.js</h2>
<p>首先，我们用JSX来编写“模板”：</p>
<pre><code>function view() {
  return &lt;ul id="filmList" className="list"&gt;
    &lt;li className="main"&gt;Detective Chinatown Vol 2&lt;/li&gt;
    &lt;li&gt;Ferdinand&lt;/li&gt;
    &lt;li&gt;Paddington 2&lt;/li&gt;
  &lt;/ul&gt;
}

</code></pre>
<p>接下来，我们要将JSX编译成js, 也就是hyperscript。我们先用Babel编译一下，看这段JSX转成js会是什么样子，打开命令行，输入<code>npm run compile</code>,得到的compile.js：</p>
<pre><code>function view() {
  return h(
    "ul",
    { id: "filmList", className: "list" },
    h(
      "li",
      { className: "main" },
      "Detective Chinatown Vol 2"
    ),
    h(
      "li",
      null,
      "Ferdinand"
    ),
    h(
      "li",
      null,
      "Paddington 2"
    )
  );
}</code></pre>
<p>可以看出<code>h</code>函数接收的参数，第一个参数是node的类型，比如<code>ul</code>,<code>li</code>，第二个参数是node的属性，之后的参数是node的children，假如child又是一个node的话，就会继续调用<code>h</code>函数。</p>
<p>清楚了Babel会将我们的JSX编译成什么样子后，接下来我们就可以继续在index.js中来写<code>h</code>函数了。</p>
<pre><code>function flatten(arr) {
  return [].concat(...arr)
}

function h(type, props, ...children) {
  return {
    type,
    props: props || {},
    children: flatten(children)
  }
}</code></pre>
<p>我们的<code>h</code>函数主要的工作就是返回我们真正需要的hyperscript对象，只有三个参数，第一个参数是节点类型，第二个参数是属性对象，第三个是子节点的数组。</p>
<p>这里主要用了ES6的rest, spread参数，不清楚代码中两个<code>...</code>分别是什么意思的可以先去看我的介绍ES6文章<a href="https://segmentfault.com/a/1190000004365693#articleHeader5">30分钟掌握ES6/ES2015核心内容（上）</a>。简单来说，rest就是上面的<code>...children</code>，它将函数多余的参数放到一个数组里，所以children此时变成了一个数组。而spread则是rest的逆运算，也就是上面的<code>...arr</code>，它将一个数组转为用逗号分隔的参数序列。</p>
<p><code>flatten(children)</code>这个操作是因为children这个数组里的元素有可能也是个数组，那样就成了一个二维数组，所以我们需要将数组拍平成一维数组。<code>[].concat(...arr)</code>是ES6写法，传统的写法是<code>[].concat.apply([], arr)</code></p>
<p>我们现在可以先来看一下<code>h</code>函数最终返回的对象长什么样子。</p>
<pre><code>function render() {
  console.log(view())
}
</code></pre>
<p>我们在render函数中打印出执行完view()的结果，再npm run compile后，用浏览器打开我们的index.html，看控制台输出的结果。<br><span class="img-wrap"><img data-src="/img/bV9qXc?w=443&amp;h=236" src="https://static.alili.tech/img/bV9qXc?w=443&amp;h=236" alt="图片描述" title="图片描述"></span></p>
<p>可以，很完美！这个对象就是我们的VDOM了！</p>
<p>下面我们就可以根据VDOM, 来渲染真实DOM了。先改写render函数:</p>
<pre><code>function render(el) {
  el.appendChild(createElement(view(0)))
}</code></pre>
<p>createElement函数生成DOM，然后再插入到我们在index.html中写的根节点app。注意render函数式在index.html中被调用的。</p>
<pre><code>function createElement(node) {
  if (typeof(node) === 'string') {
    return document.createTextNode(node)
  }

  let { type, props, children } = node
  const el = document.createElement(type)
  setProps(el, props)
  children.map(createElement)
    .forEach(el.appendChild.bind(el))

  return el
}

function setProp(target, name, value) {
  if (name === 'className') {
    return target.setAttribute('class', value)
  }

  target.setAttribute(name, value)
}

function setProps(target, props) {
  Object.keys(props).forEach(key =&gt; {
    setProp(target, key, props[key])
  })
}</code></pre>
<p>我们来仔细看下createElement函数。假如说node，即VDOM的类型是文本，我们直接返回一个创建好的文本节点。否则的话，我们取出node中类型，属性和子节点, 先根据类型创建相应的目标节点，然后再调用<code>setProps</code>函数依次设置好目标节点的属性，最后遍历子节点，递归调用createElement方法，将返回的子节点插入到刚刚创建的目标节点里。最后返回这个目标节点。</p>
<p>还需要注意的一点是，jsx中class的写成了className，所以我需要特殊处理一下。</p>
<p>大功告成，complie后浏览器打开index.html看看结果吧。</p>
<p><span class="img-wrap"><img data-src="/img/bV9r6m?w=690&amp;h=141" src="https://static.alili.tech/img/bV9r6m?w=690&amp;h=141" alt="图片描述" title="图片描述"></span></p>
<p>今天我们成功的完成了蓝图的左半部分，将JSX转化成hyperscript，再转化成VDOM，最后根据VDOM生成DOM，渲染到页面。明天，我们迎接挑战，开始处理数据变动引起的重新渲染，我们要如何DIFF新旧VDOM，生成补丁，修改DOM。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【React进阶系列】从零开始手把手教你实现一个Virtual DOM（二）

## 原文链接
[https://segmentfault.com/a/1190000014603332](https://segmentfault.com/a/1190000014603332)

