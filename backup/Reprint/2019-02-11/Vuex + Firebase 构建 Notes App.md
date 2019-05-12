---
title: 'Vuex + Firebase 构建 Notes App' 
date: 2019-02-11 2:30:49
hidden: true
slug: iid1xhh0akc
categories: [reprint]
---

{{< raw >}}

                    
<p>前几天翻译了基于<a href="https://coligo.io/learn-vuex-by-building-notes-app/" rel="nofollow noreferrer" target="_blank">这篇博客</a>的文章：<a href="https://segmentfault.com/a/1190000005015164">用 Vuex 构建一个笔记应用</a>。在此基础上我对它做了一些更新：</p>
<ul>
<li><p>把数据同步到 Firebase 上，不会每次关掉浏览器就丢失数据。</p></li>
<li><p>加了笔记检索功能</p></li>
<li><p>为保证代码整洁，加上了 eslint</p></li>
</ul>
<p>你可以从 <a href="https://github.com/chenyiqiao/notes-app-vuejs-vuex" rel="nofollow noreferrer" target="_blank">Github Repo</a> 下载源码，和 Firebase 的同步效果看下面这个 gif:</p>
<p><span class="img-wrap"><img data-src="/img/bVviUc" src="https://static.alili.tech/img/bVviUc" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">一、把数据同步到 Firebase</h2>
<p>可能你也知道 Vue.js 和 Firebase 合作搞出了一个 <a href="https://github.com/vuejs/vuefire" rel="nofollow noreferrer" target="_blank">Vuefire</a>, 但是在这里并不能用它，因为用 Vuex 管理数据的结果就是组件内部只承担基本的View层的职责，而数据基本上都在 store 里面。所以我们只能把数据的存取放在 store 里面。</p>
<h3 id="articleHeader1">1.1 Firebase 概述</h3>
<blockquote><p>如果熟悉 Firebase 的使用，可以放心地跳过这一段。</p></blockquote>
<p>如果你还没有 <a href="https://www.firebase.com/" rel="nofollow noreferrer" target="_blank">Firebase</a> 的账号，可以去注册一个，注册号之后会自动生成一个"MY FIRST APP",这个初始应用给的地址就是用来存数据的地方。</p>
<p>Firebase 存的数据都是 JSON 对象。我们向 JSON 树里面加数据的时候，这条数据就变成了 JSON 树里的一个键。比方说，在<code>/user/mchen</code>下面加上<code>widgets</code>属性之后，数据就变成了这个样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;users&quot;: {
    &quot;mchen&quot;: {
      &quot;friends&quot;: { &quot;brinchen&quot;: true },
      &quot;name&quot;: &quot;Mary Chen&quot;,
      &quot;widgets&quot;: { &quot;one&quot;: true, &quot;three&quot;: true }
    },
    &quot;brinchen&quot;: { ... },
    &quot;hmadi&quot;: { ... }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"users"</span>: {
    <span class="hljs-attr">"mchen"</span>: {
      <span class="hljs-attr">"friends"</span>: { <span class="hljs-attr">"brinchen"</span>: <span class="hljs-literal">true</span> },
      <span class="hljs-attr">"name"</span>: <span class="hljs-string">"Mary Chen"</span>,
      <span class="hljs-attr">"widgets"</span>: { <span class="hljs-attr">"one"</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">"three"</span>: <span class="hljs-literal">true</span> }
    },
    <span class="hljs-attr">"brinchen"</span>: { ... },
    <span class="hljs-attr">"hmadi"</span>: { ... }
  }
}</code></pre>
<h4>创建数据引用</h4>
<p>要读写数据库里的数据，首先要创建一个指向数据的引用，每个引用对应一条 URL。要获取其子元素，可以用<code>child</code> API, 也可以直接把子路径加到 URL 上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// referene 
new Firebase(https://docs-examples.firebaseio.com/web/data)

// 子路径加到 URL 上
new Firebase(&quot;https://docs-examples.firebaseio.com/web/data/users/mchen/name&quot;)

// child API
rootRef.child('users/mchen/name')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// referene </span>
<span class="hljs-keyword">new</span> Firebase(https:<span class="hljs-comment">//docs-examples.firebaseio.com/web/data)</span>

<span class="hljs-comment">// 子路径加到 URL 上</span>
<span class="hljs-keyword">new</span> Firebase(<span class="hljs-string">"https://docs-examples.firebaseio.com/web/data/users/mchen/name"</span>)

<span class="hljs-comment">// child API</span>
rootRef.child(<span class="hljs-string">'users/mchen/name'</span>)</code></pre>
<h4>Firebase 数据库中的数组</h4>
<p>Firebase 数据库不能原生支持数组。如果你存了一个数组，实际上是把它存储为一个用数组作为键的对象:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// we send this
['hello', 'world']
// firebase database store this
{0: 'hello', 1: 'world'}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// we send this</span>
[<span class="hljs-string">'hello'</span>, <span class="hljs-string">'world'</span>]
<span class="hljs-comment">// firebase database store this</span>
{<span class="hljs-number">0</span>: <span class="hljs-string">'hello'</span>, <span class="hljs-number">1</span>: <span class="hljs-string">'world'</span>}</code></pre>
<h4>存储数据</h4>
<h5>set()</h5>
<p><code>set()</code> 方法把新数据放到指定的引用的路径下，代替那个路径下原有的数据。它可以接收各种数据类型，如果参数是 null 的话就意味着删掉这个路径下的数据。</p>
<p>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 新建一个博客的引用
var ref = new Firebase('https://docs-examples.firebaseio.com/web/saving-data/fireblog')

var usersRef = ref.child('users')

usersRef.set({
  alanisawesome: {
  date_of_birth: &quot;June 23, 1912&quot;,
  full_name: &quot;Alan Turing&quot;
  },
  gracehop: {
    date_of_birth: &quot;December 9, 1906&quot;,
    full_name: &quot;Grace Hopper&quot;
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 新建一个博客的引用</span>
<span class="hljs-keyword">var</span> ref = <span class="hljs-keyword">new</span> Firebase(<span class="hljs-string">'https://docs-examples.firebaseio.com/web/saving-data/fireblog'</span>)

<span class="hljs-keyword">var</span> usersRef = ref.child(<span class="hljs-string">'users'</span>)

usersRef.set({
  <span class="hljs-attr">alanisawesome</span>: {
  <span class="hljs-attr">date_of_birth</span>: <span class="hljs-string">"June 23, 1912"</span>,
  <span class="hljs-attr">full_name</span>: <span class="hljs-string">"Alan Turing"</span>
  },
  <span class="hljs-attr">gracehop</span>: {
    <span class="hljs-attr">date_of_birth</span>: <span class="hljs-string">"December 9, 1906"</span>,
    <span class="hljs-attr">full_name</span>: <span class="hljs-string">"Grace Hopper"</span>
  }
})</code></pre>
<p>当然，也可以直接在子路径下存储数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="usersRef.child(&quot;alanisawesome&quot;).set({
  date_of_birth: &quot;June 23, 1912&quot;,
  full_name: &quot;Alan Turing&quot;
})

usersRef.child(&quot;gracehop&quot;).set({
  date_of_birth: &quot;December 9, 1906&quot;,
  full_name: &quot;Grace Hopper&quot;
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">usersRef.child(<span class="hljs-string">"alanisawesome"</span>).set({
  <span class="hljs-attr">date_of_birth</span>: <span class="hljs-string">"June 23, 1912"</span>,
  <span class="hljs-attr">full_name</span>: <span class="hljs-string">"Alan Turing"</span>
})

usersRef.child(<span class="hljs-string">"gracehop"</span>).set({
  <span class="hljs-attr">date_of_birth</span>: <span class="hljs-string">"December 9, 1906"</span>,
  <span class="hljs-attr">full_name</span>: <span class="hljs-string">"Grace Hopper"</span>
})</code></pre>
<p>不同之处在于，由于分成了两次操作，这种方式会触发两个事件。另外，如果<code>usersRef</code>下本来有数据的话，那么第一种方式就会覆盖掉之前的数据。</p>
<h5>update()</h5>
<p>上面的<code>set()</code>对数据具有"破坏性"，如果我们并不想改动原来的数据的话，可能<code>update()</code>是更合适的选择：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var hopperRef = userRef.child('gracehop')
hopperRef.update({
  'nickname': 'Amazing Grace'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> hopperRef = userRef.child(<span class="hljs-string">'gracehop'</span>)
hopperRef.update({
  <span class="hljs-string">'nickname'</span>: <span class="hljs-string">'Amazing Grace'</span>
})</code></pre>
<p>这段代码会在 Grace 的资料下面加上 nickname 这一项，如果我们用的是<code>set()</code>的话，那么<code>full_name</code>和<code>date_of_birth</code>就会被删掉。</p>
<p>另外，我们还可以在多个路径下同时做 update 操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="usersRef.update({
  &quot;alanisawesome/nickname&quot;: &quot;Alan The Machine&quot;,
  &quot;gracehop/nickname&quot;: &quot;Amazing Grace&quot;
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">usersRef.update({
  <span class="hljs-string">"alanisawesome/nickname"</span>: <span class="hljs-string">"Alan The Machine"</span>,
  <span class="hljs-string">"gracehop/nickname"</span>: <span class="hljs-string">"Amazing Grace"</span>
})</code></pre>
<h5>push()</h5>
<p>前面已经提到了，由于数组索引不具有独特性，Firebase 不提供对数组的支持，我们因此不得不转而用对象来处理。</p>
<p>在 Firebase 里面，<code>push</code>方法会为每一个子元素根据时间戳生成一个唯一的 ID，这样就能保证每个子元素的独特性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var postsRef = ref.child('posts')

// push 进去的这个元素有了自己的路径
var newPostRef = postsRef.push()

// 获取 ID
var uniqueID = newPostRef.key()

// 为这个元素赋值
newPostRef.set({
  author: 'gracehop',
  title: 'Announcing COBOL, a New Programming language'
})

// 也可以把这两个动作合并
postsRef.push().set({
  author: 'alanisawesome',
  title: 'The Turing Machine'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> postsRef = ref.child(<span class="hljs-string">'posts'</span>)

<span class="hljs-comment">// push 进去的这个元素有了自己的路径</span>
<span class="hljs-keyword">var</span> newPostRef = postsRef.push()

<span class="hljs-comment">// 获取 ID</span>
<span class="hljs-keyword">var</span> uniqueID = newPostRef.key()

<span class="hljs-comment">// 为这个元素赋值</span>
newPostRef.set({
  <span class="hljs-attr">author</span>: <span class="hljs-string">'gracehop'</span>,
  <span class="hljs-attr">title</span>: <span class="hljs-string">'Announcing COBOL, a New Programming language'</span>
})

<span class="hljs-comment">// 也可以把这两个动作合并</span>
postsRef.push().set({
  <span class="hljs-attr">author</span>: <span class="hljs-string">'alanisawesome'</span>,
  <span class="hljs-attr">title</span>: <span class="hljs-string">'The Turing Machine'</span>
})</code></pre>
<p>最后生成的数据就是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;posts&quot;: {
    &quot;-JRHTHaIs-jNPLXOQivY&quot;: {
      &quot;author&quot;: &quot;gracehop&quot;,
      &quot;title&quot;: &quot;Announcing COBOL, a New Programming Language&quot;
    },
    &quot;-JRHTHaKuITFIhnj02kE&quot;: {
      &quot;author&quot;: &quot;alanisawesome&quot;,
      &quot;title&quot;: &quot;The Turing Machine&quot;
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"posts"</span>: {
    <span class="hljs-attr">"-JRHTHaIs-jNPLXOQivY"</span>: {
      <span class="hljs-attr">"author"</span>: <span class="hljs-string">"gracehop"</span>,
      <span class="hljs-attr">"title"</span>: <span class="hljs-string">"Announcing COBOL, a New Programming Language"</span>
    },
    <span class="hljs-attr">"-JRHTHaKuITFIhnj02kE"</span>: {
      <span class="hljs-attr">"author"</span>: <span class="hljs-string">"alanisawesome"</span>,
      <span class="hljs-attr">"title"</span>: <span class="hljs-string">"The Turing Machine"</span>
    }
  }
}</code></pre>
<p><a href="https://www.firebase.com/blog/2015-02-11-firebase-unique-identifiers.html" rel="nofollow noreferrer" target="_blank">这篇博客</a>聊到了这个 ID 是怎么回事以及怎么生成的。</p>
<h4>获取数据</h4>
<p>获取 Firebase 数据库里的数据是通过对数据引用添加一个异步的监听器来完成的。在数据初始化和每次数据变化的时候监听器就会触发。<code>value</code>事件用来读取在此时数据库内容的快照，在初始时触发一次，然后每次变化的时候也会触发：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Get a database reference to our posts
var ref = new Firebase(&quot;https://docs-examples.firebaseio.com/web/saving-data/fireblog/posts&quot;)

// Attach an asynchronous callback to read the data at our posts reference
ref.on(&quot;value&quot;, function(snapshot) {
  console.log(snapshot.val());
}, function (errorObject) {
  console.log(&quot;The read failed: &quot; + errorObject.code);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Get a database reference to our posts</span>
<span class="hljs-keyword">var</span> ref = <span class="hljs-keyword">new</span> Firebase(<span class="hljs-string">"https://docs-examples.firebaseio.com/web/saving-data/fireblog/posts"</span>)

<span class="hljs-comment">// Attach an asynchronous callback to read the data at our posts reference</span>
ref.on(<span class="hljs-string">"value"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">snapshot</span>) </span>{
  <span class="hljs-built_in">console</span>.log(snapshot.val());
}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">errorObject</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"The read failed: "</span> + errorObject.code);
});</code></pre>
<p>简单起见，我们只用了 value 事件，其他的事件就不介绍了。</p>
<h3 id="articleHeader2">1.2 Firebase 的数据处理方式对代码的影响</h3>
<p>开始写代码之前，我想搞清楚两个问题：</p>
<ul>
<li><p>Firebase 是怎么管理数据的，它对组件的 View 有什么影响</p></li>
<li><p>用户交互过程中是怎么和 Firebase 同步数据的</p></li>
</ul>
<p>先看第一个问题，这是我在 Firebase 上保存的 JSON 数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;notes&quot; : {
    &quot;-KGXQN4JVdopZO9SWDBw&quot; : {
      &quot;favorite&quot; : true,
      &quot;text&quot; : &quot;change&quot;
    },
    &quot;-KGXQN6oWiXcBe0a54cT&quot; : {
      &quot;favorite&quot; : false,
      &quot;text&quot; : &quot;a&quot;
    },
    &quot;-KGZgZBoJJQ-hl1i78aa&quot; : {
      &quot;favorite&quot; : true,
      &quot;text&quot; : &quot;little&quot;
    },
    &quot;-KGZhcfS2RD4W1eKuhAY&quot; : {
      &quot;favorite&quot; : true,
      &quot;text&quot; : &quot;bit&quot;
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-string">"notes"</span> : {
    <span class="hljs-string">"-KGXQN4JVdopZO9SWDBw"</span> : {
      <span class="hljs-string">"favorite"</span> : <span class="hljs-literal">true</span>,
      <span class="hljs-string">"text"</span> : <span class="hljs-string">"change"</span>
    },
    <span class="hljs-string">"-KGXQN6oWiXcBe0a54cT"</span> : {
      <span class="hljs-string">"favorite"</span> : <span class="hljs-literal">false</span>,
      <span class="hljs-string">"text"</span> : <span class="hljs-string">"a"</span>
    },
    <span class="hljs-string">"-KGZgZBoJJQ-hl1i78aa"</span> : {
      <span class="hljs-string">"favorite"</span> : <span class="hljs-literal">true</span>,
      <span class="hljs-string">"text"</span> : <span class="hljs-string">"little"</span>
    },
    <span class="hljs-string">"-KGZhcfS2RD4W1eKuhAY"</span> : {
      <span class="hljs-string">"favorite"</span> : <span class="hljs-literal">true</span>,
      <span class="hljs-string">"text"</span> : <span class="hljs-string">"bit"</span>
    }
  }
}</code></pre>
<p>这个乱码一样的东西是 Firebase 为了保证数据的独特性而加上的。我们发现一个问题，在此之前 notes 实际上是一个包含对象的数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  {
    favorite: true,
    text: 'change'
  },
  {
    favorite: false,
    text: 'a'
  },
    {
    favorite: true,
    text: 'little'
  },
    {
    favorite: true,
    text: 'bit'
  },
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">[
  {
    <span class="hljs-attr">favorite</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">text</span>: <span class="hljs-string">'change'</span>
  },
  {
    <span class="hljs-attr">favorite</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">text</span>: <span class="hljs-string">'a'</span>
  },
    {
    <span class="hljs-attr">favorite</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">text</span>: <span class="hljs-string">'little'</span>
  },
    {
    <span class="hljs-attr">favorite</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">text</span>: <span class="hljs-string">'bit'</span>
  },
]</code></pre>
<p>显然，对数据的处理方式的变化使得渲染 notes 列表的组件，也就是 NotesList.vue 需要大幅修改。修改的逻辑简单来说就是在思路上要完成从数组到对象的转换。</p>
<p>举个例子，之前 filteredNotes 是这么写的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="filteredNotes () {
  if (this.show === 'all'){
    return this.notes
  } else if (this.show === 'favorites') {
    return this.notes.filter(note => note.favorite)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">filteredNotes () {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.show === <span class="hljs-string">'all'</span>){
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.notes
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.show === <span class="hljs-string">'favorites'</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.notes.filter(<span class="hljs-function"><span class="hljs-params">note</span> =&gt;</span> note.favorite)
  }
}</code></pre>
<p>现在的问题就是，notes 不再是一个数组，而是一个对象，而对象是没有 filter 方法的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="filteredNotes () {
  var favoriteNotes = {}
  if (this.show === 'all') {
    return this.notes
  } else if (this.show === 'favorites') {
    for (var note in this.notes) {
      if (this.notes[note]['favorite']) {
        favoriteNotes[note] = this.notes[note]
      }
    }
    return favoriteNotes
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">filteredNotes () {
  <span class="hljs-keyword">var</span> favoriteNotes = {}
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.show === <span class="hljs-string">'all'</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.notes
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.show === <span class="hljs-string">'favorites'</span>) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> note <span class="hljs-keyword">in</span> <span class="hljs-keyword">this</span>.notes) {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.notes[note][<span class="hljs-string">'favorite'</span>]) {
        favoriteNotes[note] = <span class="hljs-keyword">this</span>.notes[note]
      }
    }
    <span class="hljs-keyword">return</span> favoriteNotes
  }
}</code></pre>
<p>另外由于每个对象都对应一个自己的 ID，所以我也在 state 里面加了一个<code>activeKey</code>用来表示当前笔记的 ID，实际上现在我们在<code>TOGGLE_FAVORITE</code>,<code>SET_ACTIVE</code>这些方法里面都需要对相应的<code>activeKey</code>赋值。</p>
<p>再看第二个问题，要怎么和 Firebase 交互：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// store.js
let notesRef = new Firebase('https://crackling-inferno-296.firebaseio.com/notes')

const state = {
  notes: {},
  activeNote: {},
  activeKey: ''
}

// 初始化数据，并且此后数据的变化都会反映到 View
notesRef.on('value', snapshot => {
  state.notes = snapshot.val()
})

// 每一个操作都需要同步到 Firebase
const mutations = {

  ADD_NOTE (state) {
    const newNote = {
      text: 'New note',
      favorite: false
    }
    var addRef = notesRef.push()
    state.activeKey = addRef.key()
    addRef.set(newNote)
    state.activeNote = newNote
  },
  
  EDIT_NOTE (state, text) {
    notesRef.child(state.activeKey).update({
      'text': text
    })
  },

  DELETE_NOTE (state) {
    notesRef.child(state.activeKey).set(null)
  },

  TOGGLE_FAVORITE (state) {
    state.activeNote.favorite = !state.activeNote.favorite
    notesRef.child(state.activeKey).update({
      'favorite': state.activeNote.favorite
    })
  },

  SET_ACTIVE_NOTE (state, key, note) {
    state.activeNote = note
    state.activeKey = key
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// store.js</span>
<span class="hljs-keyword">let</span> notesRef = <span class="hljs-keyword">new</span> Firebase(<span class="hljs-string">'https://crackling-inferno-296.firebaseio.com/notes'</span>)

<span class="hljs-keyword">const</span> state = {
  <span class="hljs-attr">notes</span>: {},
  <span class="hljs-attr">activeNote</span>: {},
  <span class="hljs-attr">activeKey</span>: <span class="hljs-string">''</span>
}

<span class="hljs-comment">// 初始化数据，并且此后数据的变化都会反映到 View</span>
notesRef.on(<span class="hljs-string">'value'</span>, snapshot =&gt; {
  state.notes = snapshot.val()
})

<span class="hljs-comment">// 每一个操作都需要同步到 Firebase</span>
<span class="hljs-keyword">const</span> mutations = {

  ADD_NOTE (state) {
    <span class="hljs-keyword">const</span> newNote = {
      <span class="hljs-attr">text</span>: <span class="hljs-string">'New note'</span>,
      <span class="hljs-attr">favorite</span>: <span class="hljs-literal">false</span>
    }
    <span class="hljs-keyword">var</span> addRef = notesRef.push()
    state.activeKey = addRef.key()
    addRef.set(newNote)
    state.activeNote = newNote
  },
  
  EDIT_NOTE (state, text) {
    notesRef.child(state.activeKey).update({
      <span class="hljs-string">'text'</span>: text
    })
  },

  DELETE_NOTE (state) {
    notesRef.child(state.activeKey).set(<span class="hljs-literal">null</span>)
  },

  TOGGLE_FAVORITE (state) {
    state.activeNote.favorite = !state.activeNote.favorite
    notesRef.child(state.activeKey).update({
      <span class="hljs-string">'favorite'</span>: state.activeNote.favorite
    })
  },

  SET_ACTIVE_NOTE (state, key, note) {
    state.activeNote = note
    state.activeKey = key
  }
}</code></pre>
<h2 id="articleHeader3">二、笔记检索功能</h2>
<p>效果图：</p>
<p><span class="img-wrap"><img data-src="/img/bVviT2" src="https://static.alili.tech/img/bVviT2" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这个功能比较常见，思路就是列表渲染 + 过滤器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// NoteList.vue

<!-- filter -->
<div class=&quot;input&quot;>
  <input v-model=&quot;query&quot; placeholder=&quot;Filter your notes...&quot;>
</div>

<!-- render notes in a list -->
<div class=&quot;container&quot;>
  <div class=&quot;list-group&quot;>
    <a v-for=&quot;note in filteredNotes | byTitle query&quot;
      class=&quot;list-group-item&quot; href=&quot;#&quot;
      :class=&quot;{active: activeKey === $key}&quot;
      @click=&quot;updateActiveNote($key, note)&quot;>
      <h4 class=&quot;list-group-item-heading&quot;>
        "{{"note.text.substring(0, 30)"}}"
      </h4>
    </a>
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">// NoteList.vue

<span class="hljs-comment">&lt;!-- filter --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"input"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"query"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"Filter your notes..."</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- render notes in a list --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list-group"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"note in filteredNotes | byTitle query"</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">"list-group-item"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>
      <span class="hljs-attr">:class</span>=<span class="hljs-string">"{active: activeKey === $key}"</span>
      @<span class="hljs-attr">click</span>=<span class="hljs-string">"updateActiveNote($key, note)"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h4</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list-group-item-heading"</span>&gt;</span>
        "{{"note.text.substring(0, 30)"}}"
      <span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// NoteList.vue

filters: {
  byTitle (notesToFilter, filterValue) {
    var filteredNotes = {}
    for (let note in notesToFilter) {
      if (notesToFilter[note]['text'].indexOf(filterValue) > -1) {
        filteredNotes[note] = notesToFilter[note]
      }
    }
    return filteredNotes
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// NoteList.vue</span>

filters: {
  byTitle (notesToFilter, filterValue) {
    <span class="hljs-keyword">var</span> filteredNotes = {}
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> note <span class="hljs-keyword">in</span> notesToFilter) {
      <span class="hljs-keyword">if</span> (notesToFilter[note][<span class="hljs-string">'text'</span>].indexOf(filterValue) &gt; <span class="hljs-number">-1</span>) {
        filteredNotes[note] = notesToFilter[note]
      }
    }
    <span class="hljs-keyword">return</span> filteredNotes
  }
}</code></pre>
<h2 id="articleHeader4">三、在项目中用 eslint</h2>
<p>如果你是个 Vue 重度用户，你应该已经用上 eslint-standard 了吧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;eslint&quot;: &quot;^2.0.0&quot;,
&quot;eslint-config-standard&quot;: &quot;^5.1.0&quot;,
&quot;eslint-friendly-formatter&quot;: &quot;^1.2.2&quot;,
&quot;eslint-loader&quot;: &quot;^1.3.0&quot;,
&quot;eslint-plugin-html&quot;: &quot;^1.3.0&quot;,
&quot;eslint-plugin-promise&quot;: &quot;^1.0.8&quot;,
&quot;eslint-plugin-standard&quot;: &quot;^1.3.2&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">"eslint"</span>: <span class="hljs-string">"^2.0.0"</span>,
<span class="hljs-string">"eslint-config-standard"</span>: <span class="hljs-string">"^5.1.0"</span>,
<span class="hljs-string">"eslint-friendly-formatter"</span>: <span class="hljs-string">"^1.2.2"</span>,
<span class="hljs-string">"eslint-loader"</span>: <span class="hljs-string">"^1.3.0"</span>,
<span class="hljs-string">"eslint-plugin-html"</span>: <span class="hljs-string">"^1.3.0"</span>,
<span class="hljs-string">"eslint-plugin-promise"</span>: <span class="hljs-string">"^1.0.8"</span>,
<span class="hljs-string">"eslint-plugin-standard"</span>: <span class="hljs-string">"^1.3.2"</span></code></pre>
<p>把以上各条添加到 devDependencies 里面。如果用了 vue-cli 的话, 那就不需要手动配置 eslint 了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
module: {
  preLoaders: [
    {
      test: /\.vue$/,
      loader: 'eslint'
    },
    {
      test: /\.js$/,
      loader: 'eslint'
    }
  ],
  loaders: [ ... ],
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-built_in">module</span>: {
  <span class="hljs-attr">preLoaders</span>: [
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
      <span class="hljs-attr">loader</span>: <span class="hljs-string">'eslint'</span>
    },
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
      <span class="hljs-attr">loader</span>: <span class="hljs-string">'eslint'</span>
    }
  ],
  <span class="hljs-attr">loaders</span>: [ ... ],
  <span class="hljs-attr">eslint</span>: {
    <span class="hljs-attr">formatter</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'eslint-friendly-formatter'</span>)
  }
}</code></pre>
<p>如果需要自定义规则的话，就在根目录下新建<code>.eslintrc</code>，这是我的配置:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  root: true,
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'no-undef': 0,
    'one-var': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">root</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-comment">// https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style</span>
  extends: <span class="hljs-string">'standard'</span>,
  <span class="hljs-comment">// required to lint *.vue files</span>
  plugins: [
    <span class="hljs-string">'html'</span>
  ],
  <span class="hljs-comment">// add your custom rules here</span>
  <span class="hljs-string">'rules'</span>: {
    <span class="hljs-comment">// allow paren-less arrow functions</span>
    <span class="hljs-string">'arrow-parens'</span>: <span class="hljs-number">0</span>,
    <span class="hljs-string">'no-undef'</span>: <span class="hljs-number">0</span>,
    <span class="hljs-string">'one-var'</span>: <span class="hljs-number">0</span>,
    <span class="hljs-comment">// allow debugger during development</span>
    <span class="hljs-string">'no-debugger'</span>: process.env.NODE_ENV === <span class="hljs-string">'production'</span> ? <span class="hljs-number">2</span> : <span class="hljs-number">0</span>
  }
}</code></pre>
<h1 id="articleHeader5">四、结语</h1>
<p>讲得比较粗糙，具体可以拿<a href="https://github.com/chenyiqiao/notes-app-vuejs-vuex" rel="nofollow noreferrer" target="_blank">源码</a>跑一下。如果有什么问题，欢迎评论。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vuex + Firebase 构建 Notes App

## 原文链接
[https://segmentfault.com/a/1190000005038509](https://segmentfault.com/a/1190000005038509)

