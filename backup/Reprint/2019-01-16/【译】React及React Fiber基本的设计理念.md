---
title: '【译】React及React Fiber基本的设计理念' 
date: 2019-01-16 2:30:08
hidden: true
slug: viv459hkyg7
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>本文主要是对收集到的一些官方或者其他平台的文章进行翻译，中间可能穿插一些个人的理解，如有错误疏漏之处，还望批评指正。笔者并未研究过源码，只是希望本文成为那些inspire你的东西的一部分，从而在今后一起去探讨和研究React Fiber。</p>
<p>注：绝大多数情况下，以下的第一人称不代表译者，而是对应文章的作者，请注意区分。</p>
<h2 id="articleHeader1"><a href="https://github.com/reactjs/react-basic/tree/master" rel="nofollow noreferrer" target="_blank">React basic</a></h2>
<h3 id="articleHeader2">基础的理论概念</h3>
<p>  这篇文章是我的一次尝试，希望能够形式化的介绍关于react本身的一些理念模型。目的在于基于演绎推理的方式，描述那些给我们灵感让我们进行这样的设计的源泉。</p>
<p>  当然，这里的一些设想是具有争议的，实际的设计也许也会有bug或者疏漏。但是，这也是一个好的开始让我们去形式化地谈论这些。同时，如果你有更好的想法，也欢迎pr。以下让我们沿着这个思路，从简单到复杂的去思考这一系列问题，不必担心，这里没有太多具体的框架细节。</p>
<p>  实际的关于React的实现是充满务实主义的，渐进式的，算法优化的，新老代码交替的，各种调试工具以及任何你能想到的让他变成更加有用的东西。当然，这些东西也像版本迭代一样，它们的存在是短暂的，如果它们足够有用，我们就会不断的更新他们。再次声明，实际的实现是非常非常复杂的。</p>
<h3 id="articleHeader3">转换</h3>
<p>  React最核心的前提是，UI仅仅是数据-&gt;数据的映射。相同的输入意味着相同输出。非常简单的纯函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function NameBox(name) {
  return { fontWeight: 'bold', labelContent: name };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">NameBox</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">fontWeight</span>: <span class="hljs-string">'bold'</span>, <span class="hljs-attr">labelContent</span>: name };
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'Sebastian Markbåge' ->
{ fontWeight: 'bold', labelContent: 'Sebastian Markbåge' };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sml"><code><span class="hljs-symbol">'Sebastian</span> <span class="hljs-type">Markb</span>åge' -&gt;
{ fontWeight: <span class="hljs-symbol">'bold'</span>, labelContent: <span class="hljs-symbol">'Sebastian</span> <span class="hljs-type">Markb</span>åge' };</code></pre>
<h3 id="articleHeader4">抽象</h3>
<p>  但是，并不是所有的UI都能这样做，因为，有些UI是非常复杂的。所以，很重要的一点是，UI能够被抽象成许许多多可复用的小块，同时不暴露这些小块的内部实现细节。就像在一个函数中调用另一个函数一样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function FancyUserBox(user) {
  return {
    borderStyle: '1px solid blue',
    childContent: [
      'Name: ',
      NameBox(user.firstName + ' ' + user.lastName)
    ]
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">FancyUserBox</span>(<span class="hljs-params">user</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">borderStyle</span>: <span class="hljs-string">'1px solid blue'</span>,
    <span class="hljs-attr">childContent</span>: [
      <span class="hljs-string">'Name: '</span>,
      NameBox(user.firstName + <span class="hljs-string">' '</span> + user.lastName)
    ]
  };
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ firstName: 'Sebastian', lastName: 'Markbåge' } ->
{
  borderStyle: '1px solid blue',
  childContent: [
    'Name: ',
    { fontWeight: 'bold', labelContent: 'Sebastian Markbåge' }
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{ <span class="hljs-attribute">firstName</span>: <span class="hljs-string">'Sebastian'</span>, lastName: <span class="hljs-string">'Markbåge'</span> } <span class="hljs-selector-tag">-</span>&gt;
{
  <span class="hljs-attribute">borderStyle</span>: <span class="hljs-string">'1px solid blue'</span>,
  childContent: [
    <span class="hljs-string">'Name: '</span>,
    { fontWeight: <span class="hljs-string">'bold'</span>, labelContent: <span class="hljs-string">'Sebastian Markbåge'</span> }
  ]
};</code></pre>
<h3 id="articleHeader5">组合</h3>
<p>  为了实现可复用这一特性，仅仅只是简单复用叶子节点，每次都为它们创建一个新的容器是远远不够的。同时我们需要在容器（container）这一层面构建抽象，并且组合其它抽象。在我看来，组合就是将两个甚至多个抽象变成<strong>一个</strong>新的抽象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function FancyBox(children) {
  return {
    borderStyle: '1px solid blue',
    children: children
  };
}

function UserBox(user) {
  return FancyBox([
    'Name: ',
    NameBox(user.firstName + ' ' + user.lastName)
  ]);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">FancyBox</span>(<span class="hljs-params">children</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">borderStyle</span>: <span class="hljs-string">'1px solid blue'</span>,
    <span class="hljs-attr">children</span>: children
  };
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">UserBox</span>(<span class="hljs-params">user</span>) </span>{
  <span class="hljs-keyword">return</span> FancyBox([
    <span class="hljs-string">'Name: '</span>,
    NameBox(user.firstName + <span class="hljs-string">' '</span> + user.lastName)
  ]);
}</code></pre>
<h3 id="articleHeader6">状态</h3>
<p>  UI并不仅仅是简单的服务或者说业务中的逻辑状态。事实上，对于一个特定的投影而言，很多状态是具体的，但是对于其他投影，可能不是这样。例如，如果你正在文本框中输入，这些输入的字符可以被复制到另外的tab或者移动设备上（当然你不想复制也没问题，主要是为了和下一句的例子进行区分）。但是，诸如滚动条的位置这样的数据，你几乎从来不会想把它在多个投影中复制（因为在这台设备上比如滚动条位置是200，但是在其他设备上滚动到200的内容通常来说肯定是不同的）。</p>
<p>  我们更趋向于将我们的数据模型变为不可变的。<strong>我们在最顶端将所有能更新状态的函数串起来，把它们当作一个原子（说成事务可能更容易明白）来对待</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function FancyNameBox(user, likes, onClick) {
  return FancyBox([
    'Name: ', NameBox(user.firstName + ' ' + user.lastName),
    'Likes: ', LikeBox(likes),
    LikeButton(onClick)
  ]);
}

// Implementation Details

var likes = 0;
function addOneMoreLike() {
  likes++;
  rerender();
}

// Init

FancyNameBox(
  { firstName: 'Sebastian', lastName: 'Markbåge' },
  likes,
  addOneMoreLike
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">FancyNameBox</span>(<span class="hljs-params">user, likes, onClick</span>) </span>{
  <span class="hljs-keyword">return</span> FancyBox([
    <span class="hljs-string">'Name: '</span>, NameBox(user.firstName + <span class="hljs-string">' '</span> + user.lastName),
    <span class="hljs-string">'Likes: '</span>, LikeBox(likes),
    LikeButton(onClick)
  ]);
}

<span class="hljs-comment">// Implementation Details</span>

<span class="hljs-keyword">var</span> likes = <span class="hljs-number">0</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addOneMoreLike</span>(<span class="hljs-params"></span>) </span>{
  likes++;
  rerender();
}

<span class="hljs-comment">// Init</span>

FancyNameBox(
  { <span class="hljs-attr">firstName</span>: <span class="hljs-string">'Sebastian'</span>, <span class="hljs-attr">lastName</span>: <span class="hljs-string">'Markbåge'</span> },
  likes,
  addOneMoreLike
);</code></pre>
<p><em>注意</em>：这个例子通过副作用去更新状态。我对于此实际的理念模型是在每次的更新过程中返回下一个阶段的状态。当然，不这样做看起来要更简单一点，但是在以后我们最终还是会选择改变这个例子采用的方式（因为副作用的缺点太多了）。</p>
<h3 id="articleHeader7">缓存</h3>
<p>  我们知道，对于纯函数而言，一次又一次相同的调用是非常浪费时间和空间的。我们可以对这些函数建立缓存的版本，追踪最近一次调用的输入和输出。下一次就可以直接返回结果，不用再次计算。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function memoize(fn) {
  var cachedArg;
  var cachedResult;
  return function(arg) {
    if (cachedArg === arg) {
      return cachedResult;
    }
    cachedArg = arg;
    cachedResult = fn(arg);
    return cachedResult;
  };
}

var MemoizedNameBox = memoize(NameBox);

function NameAndAgeBox(user, currentTime) {
  return FancyBox([
    'Name: ',
    MemoizedNameBox(user.firstName + ' ' + user.lastName),
    'Age in milliseconds: ',
    currentTime - user.dateOfBirth
  ]);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">memoize</span>(<span class="hljs-params">fn</span>) </span>{
  <span class="hljs-keyword">var</span> cachedArg;
  <span class="hljs-keyword">var</span> cachedResult;
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arg</span>) </span>{
    <span class="hljs-keyword">if</span> (cachedArg === arg) {
      <span class="hljs-keyword">return</span> cachedResult;
    }
    cachedArg = arg;
    cachedResult = fn(arg);
    <span class="hljs-keyword">return</span> cachedResult;
  };
}

<span class="hljs-keyword">var</span> MemoizedNameBox = memoize(NameBox);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">NameAndAgeBox</span>(<span class="hljs-params">user, currentTime</span>) </span>{
  <span class="hljs-keyword">return</span> FancyBox([
    <span class="hljs-string">'Name: '</span>,
    MemoizedNameBox(user.firstName + <span class="hljs-string">' '</span> + user.lastName),
    <span class="hljs-string">'Age in milliseconds: '</span>,
    currentTime - user.dateOfBirth
  ]);
}</code></pre>
<h3 id="articleHeader8">列表/集合</h3>
<p>  大多数UI都是通过很多个列表组成，通过列表中的每个元素产生不同的值（比如<code>data.map(item =&gt; &lt;Item ... /&gt;)</code>）。这样就产生了一种天然的层次结构。</p>
<p>  为了管理每个列表元素的状态，我们可以创建一个Map来管理每个特定的列表元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function UserList(users, likesPerUser, updateUserLikes) {
  return users.map(user => FancyNameBox(
    user,
    likesPerUser.get(user.id),
    () => updateUserLikes(user.id, likesPerUser.get(user.id) + 1)
  ));
}

var likesPerUser = new Map();
function updateUserLikes(id, likeCount) {
  likesPerUser.set(id, likeCount);
  rerender();
}

UserList(data.users, likesPerUser, updateUserLikes);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">UserList</span>(<span class="hljs-params">users, likesPerUser, updateUserLikes</span>) </span>{
  <span class="hljs-keyword">return</span> users.map(<span class="hljs-function"><span class="hljs-params">user</span> =&gt;</span> FancyNameBox(
    user,
    likesPerUser.get(user.id),
    () =&gt; updateUserLikes(user.id, likesPerUser.get(user.id) + <span class="hljs-number">1</span>)
  ));
}

<span class="hljs-keyword">var</span> likesPerUser = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateUserLikes</span>(<span class="hljs-params">id, likeCount</span>) </span>{
  likesPerUser.set(id, likeCount);
  rerender();
}

UserList(data.users, likesPerUser, updateUserLikes);</code></pre>
<p><em>注意：现在我们有多个不同的输入传递给FancyNameBox。那会破坏我们上一节提到的缓存策略，因为我们一次只能记忆一个值。（因为上面的memoize函数的形参只有一个）</em></p>
<h3 id="articleHeader9">续延</h3>
<p>  不幸的是，在UI中有太多的list相互嵌套，我们不得不用大量的模板代码去显式的管理它们。</p>
<p>  我们可以通过延迟执行将一部分的模板代码移到我们的主要逻辑之外。例如，通过利用currying（可以通过<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind" rel="nofollow noreferrer" target="_blank"><code>bind</code></a>实现）（当然我们知道这样<code>bind</code>并没有完整的实现<code>currying</code>）。然后我们通过在核心函数之外的地方传递状态，这样，我们就能摆脱对模板的依赖。</p>
<p>  这并没有减少模板代码，但是至少将它们移动到了核心逻辑之外。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function FancyUserList(users) {
  return FancyBox(
    UserList.bind(null, users)
  );
}

const box = FancyUserList(data.users);
const resolvedChildren = box.children(likesPerUser, updateUserLikes);
const resolvedBox = {
  ...box,
  children: resolvedChildren
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">FancyUserList</span>(<span class="hljs-params">users</span>) </span>{
  <span class="hljs-keyword">return</span> FancyBox(
    UserList.bind(<span class="hljs-literal">null</span>, users)
  );
}

<span class="hljs-keyword">const</span> box = FancyUserList(data.users);
<span class="hljs-keyword">const</span> resolvedChildren = box.children(likesPerUser, updateUserLikes);
<span class="hljs-keyword">const</span> resolvedBox = {
  ...box,
  <span class="hljs-attr">children</span>: resolvedChildren
};</code></pre>
<p>译注：这里当然可以采用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function FancyUserList(users) {
  return FancyBox(
    UserList(users, likesPerUser, updateUserLikes)
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">FancyUserList</span>(users) {
  <span class="hljs-keyword">return</span> <span class="hljs-type">FancyBox(</span>
    UserList(users, likesPerUser, updateUserLikes)
  );
}</code></pre>
<p>  但是这样扩展起来就很麻烦，想增加，删除我们都需要去改<code>FancyUserList</code>里的代码。最重要的是，如果我们想将<code>likesPerUser</code>和<code>updateUserLikes</code>换成其他的集合和函数的话，我们必须再创建一个函数，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function FancyUserList2(users) {
  return FancyBox(
    UserList(users, likesPerUser2, updateUserLikes2)
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">FancyUserList2</span>(users) {
  <span class="hljs-keyword">return</span> <span class="hljs-type">FancyBox(</span>
    UserList(users, likesPerUser2, updateUserLikes2)
  );
}</code></pre>
<p>当然，你肯定会想到，直接给<code>FancyUserList</code>设置成接收多个参数不就行了。但是这样依然存在一个问题，那就是每次你需要用到<code>FancyUserList</code>的时候，都需要带上所有的参数。要解决也是可以的，比如<code>const foo = FancyUserList.bind(null, data.users)</code>，后面需要用的话，直接<code>foo(bar1, func1), foo(bar2, func2)</code>就行了。也实现了设计模式中我们常谈到的<strong>分离程序中变与不变</strong>的部分。但是这样的实现将<code>bind</code>操作交给了调用者，这一点上可以改进，就像示例中提到的那样。</p>
<h2 id="articleHeader10">状态映射</h2>
<p>  我们很早就知道，一旦我们看见相同的部分，我们能够使用组合去避免一次又一次重复的去实现相同的部分。我们可以将提取出来那部分逻辑移动并传递给更低等级或者说更低层级的函数，这些函数就是我们经常复用的那些函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function FancyBoxWithState(
  children,
  stateMap,
  updateState
) {
  return FancyBox(
    children.map(child => child.continuation(
      stateMap.get(child.key),
      updateState
    ))
  );
}

function UserList(users) {
  return users.map(user => {
    continuation: FancyNameBox.bind(null, user),
    key: user.id
  });
}

function FancyUserList(users) {
  return FancyBoxWithState.bind(null,
    UserList(users)
  );
}

const continuation = FancyUserList(data.users);
continuation(likesPerUser, updateUserLikes);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">FancyBoxWithState</span>(<span class="hljs-params">
  children,
  stateMap,
  updateState
</span>) </span>{
  <span class="hljs-keyword">return</span> FancyBox(
    children.map(<span class="hljs-function"><span class="hljs-params">child</span> =&gt;</span> child.continuation(
      stateMap.get(child.key),
      updateState
    ))
  );
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">UserList</span>(<span class="hljs-params">users</span>) </span>{
  <span class="hljs-keyword">return</span> users.map(<span class="hljs-function"><span class="hljs-params">user</span> =&gt;</span> {
    <span class="hljs-attr">continuation</span>: FancyNameBox.bind(<span class="hljs-literal">null</span>, user),
    <span class="hljs-attr">key</span>: user.id
  });
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">FancyUserList</span>(<span class="hljs-params">users</span>) </span>{
  <span class="hljs-keyword">return</span> FancyBoxWithState.bind(<span class="hljs-literal">null</span>,
    UserList(users)
  );
}

<span class="hljs-keyword">const</span> continuation = FancyUserList(data.users);
continuation(likesPerUser, updateUserLikes);</code></pre>
<h3 id="articleHeader11">缓存映射</h3>
<p>  想在缓存列表中缓存多个元素是比较困难的，你必须弄清楚一些在平衡缓存与频率之间做得很好的缓存算法，然而这些算法是非常复杂的。</p>
<p>  幸运的是，在同一区域的UI通常是比较稳定的，不会变化的。</p>
<p>  在这里我们依然可以采用像刚刚那种缓存<code>state</code>的技巧，通过组合的方式传递<code>memoizationCache</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function memoize(fn) {
  return function(arg, memoizationCache) {
    if (memoizationCache.arg === arg) {
      return memoizationCache.result;
    }
    const result = fn(arg);
    memoizationCache.arg = arg;
    memoizationCache.result = result;
    return result;
  };
}

function FancyBoxWithState(
  children,
  stateMap,
  updateState,
  memoizationCache
) {
  return FancyBox(
    children.map(child => child.continuation(
      stateMap.get(child.key),
      updateState,
      memoizationCache.get(child.key)
    ))
  );
}

const MemoizedFancyNameBox = memoize(FancyNameBox);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">memoize</span>(<span class="hljs-params">fn</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arg, memoizationCache</span>) </span>{
    <span class="hljs-keyword">if</span> (memoizationCache.arg === arg) {
      <span class="hljs-keyword">return</span> memoizationCache.result;
    }
    <span class="hljs-keyword">const</span> result = fn(arg);
    memoizationCache.arg = arg;
    memoizationCache.result = result;
    <span class="hljs-keyword">return</span> result;
  };
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">FancyBoxWithState</span>(<span class="hljs-params">
  children,
  stateMap,
  updateState,
  memoizationCache
</span>) </span>{
  <span class="hljs-keyword">return</span> FancyBox(
    children.map(<span class="hljs-function"><span class="hljs-params">child</span> =&gt;</span> child.continuation(
      stateMap.get(child.key),
      updateState,
      memoizationCache.get(child.key)
    ))
  );
}

<span class="hljs-keyword">const</span> MemoizedFancyNameBox = memoize(FancyNameBox);</code></pre>
<h3 id="articleHeader12">代数哲学</h3>
<p>  你会发现，这有点像PITA（一种类似肉夹馍的食物），通过几个不同层次的抽象，将你需要的东西（值/参数）一点一点的加进去。有时这也提供了一种快捷的方式，能在不借助第三方的条件下在两个抽象之间传递数据。在<code>React</code>里面，我们把这叫做<code>context</code>.</p>
<p>  有时候数据之间的依赖并不像抽象树那样整齐一致。例如，在布局算法中，在完整的确定所有字节点的位置之前，你需要知道各个子节点矩形区域的大小。</p>
<p>Now, this example is a bit "out there". I'll use <a href="http://math.andrej.com/eff/" rel="nofollow noreferrer" target="_blank">Algebraic Effects</a> as <a href="https://esdiscuss.org/topic/one-shot-delimited-continuations-with-effect-handlers" rel="nofollow noreferrer" target="_blank">proposed for ECMAScript</a>. If you're familiar with functional programming, they're avoiding the intermediate ceremony imposed by monads.</p>
<p><em>译注</em>：FP理解不深，所以上面段就不翻译了，以免误导</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ThemeBorderColorRequest() { }

function FancyBox(children) {
  const color = raise new ThemeBorderColorRequest();
  return {
    borderWidth: '1px',
    borderColor: color,
    children: children
  };
}

function BlueTheme(children) {
  return try {
    children();
  } catch effect ThemeBorderColorRequest -> [, continuation] {
    continuation('blue');
  }
}

function App(data) {
  return BlueTheme(
    FancyUserList.bind(null, data.users)
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ThemeBorderColorRequest</span>(<span class="hljs-params"></span>) </span>{ }

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">FancyBox</span>(<span class="hljs-params">children</span>) </span>{
  <span class="hljs-keyword">const</span> color = raise <span class="hljs-keyword">new</span> ThemeBorderColorRequest();
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">borderWidth</span>: <span class="hljs-string">'1px'</span>,
    <span class="hljs-attr">borderColor</span>: color,
    <span class="hljs-attr">children</span>: children
  };
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">BlueTheme</span>(<span class="hljs-params">children</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">try</span> {
    children();
  } <span class="hljs-keyword">catch</span> effect ThemeBorderColorRequest -&gt; [, continuation] {
    continuation(<span class="hljs-string">'blue'</span>);
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">App</span>(<span class="hljs-params">data</span>) </span>{
  <span class="hljs-keyword">return</span> BlueTheme(
    FancyUserList.bind(<span class="hljs-literal">null</span>, data.users)
  );
}</code></pre>
<h2 id="articleHeader13"><a href="https://github.com/acdlite/react-fiber-architecture" rel="nofollow noreferrer" target="_blank">React Fiber体系结构</a></h2>
<p><em>译注：</em>为了比较形象的阐释，故这里将<a href="https://www.youtube.com/watch?v=Qu_6ItnlDQg" rel="nofollow noreferrer" target="_blank">React Stack vs Fiber</a>的视频贴在这，而不是放在阅读更多里面。由于在youtube上，为了方便查看，这里录制了<a href="http://ogitl0zvo.bkt.clouddn.com/qq.gif" rel="nofollow noreferrer" target="_blank">一张gif</a>（有点大，18M，下载时请耐心等待）。</p>
<h3 id="articleHeader14">简介</h3>
<p>  React Fiber是一个正在进行中的对React核心算法的重写。它是过去两年React团队研究成果的一个顶峰。</p>
<p>  React Fiber的目标是提升对在动画，布局以及手势方面的友好度。它最重要的特性叫做"增量式/渐进式"渲染：即，将渲染工作分割为多个小块进行，并在各个帧之间传播。</p>
<p>  其它关键的特性包括，1.拥有了暂停，中止以及当有更新来临的时候重新恢复工作的能力。2.不同的能力对于不同类型的更新分配不同的优先级。3.新的并发原语。</p>
<h3 id="articleHeader15">关于本文档</h3>
<p>  在Fiber中引入了几个新的概念，这些概念仅仅只看代码是很难真的体会的。本文档最初只是我在React项目组时的收集，收集一些我整理Fiber的实现的时候的笔记。随着笔记的增多，我意识到这可能对其他人来说也是一个有益的资源。（译注：本文档的作者<a href="https://github.com/acdlite" rel="nofollow noreferrer" target="_blank">acdlite</a>是Facebook开发组的一名成员，并不属于React框架的开发组（这里指实际工作中，而不是gh上的team）。React团队的leader，旧的核心算法及新的核心算法的提出者是<a href="https://github.com/sebmarkbage" rel="nofollow noreferrer" target="_blank">sebmarkbage</a>）</p>
<p>  我将尝试尽可能用简单的语言来描述，避免一些不必要的术语。在必要时也会给出一些资源的链接。</p>
<p>  请注意我并不是React团队的一员，也不具备足够的权威。所以这并不是一份官方文档。我已经邀请了React团队的成员来对本文档的准确性进行review。</p>
<p>  Fiber是一项还在进行中的工作，在它完成前都很可能进行重改。所以本文档也是如此，随着时间很可能发生变化。欢迎任何的建议。</p>
<p>  我的目标是，在阅读本文档后，在Fiber完成的时候，顺着它的实现你能更好的理解它。甚至最终回馈React（译注：意思是fix bug，pr新特性，解决issue等等）。</p>
<h3 id="articleHeader16">准备</h3>
<p>  在继续阅读前，我强烈建议你确保自己对以下内容已经非常熟悉：</p>
<p>  <a href="https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html" rel="nofollow noreferrer" target="_blank">React Components, Elements, and Instances</a> - "组件"通常来说是一个范围很大的术语。牢固的掌握这些术语是至关重要的。</p>
<p>  <a href="https://facebook.github.io/react/docs/reconciliation.html" rel="nofollow noreferrer" target="_blank">Reconciliation</a> - 对React的协调/调度算法的一个高度概括。</p>
<p>  <a href="https://github.com/reactjs/react-basic" rel="nofollow noreferrer" target="_blank">React基础理论概念</a> - 对React中的一些概念模型的抽象描述，第一次读的时候可能不太能体会。没关系，以后终会明白的。</p>
<p>  <a href="https://facebook.github.io/react/contributing/design-principles.html" rel="nofollow noreferrer" target="_blank">React设计原则</a> - 请注意其中的scheduling这一小节，非常好的解释了React Fiber。</p>
<h3 id="articleHeader17">回顾</h3>
<p>  如果你还没准备好的话，请重新阅读上面的"准备"一节。在我们探索之前，让我们来了解几个概念。</p>
<h3 id="articleHeader18">什么是协调（reconciliation）</h3>
<p>  reconciliation：是一种算法，React使用它去区分两棵树，从而决定到底哪一部分需要改变。</p>
<p>  update：数据的变化会导致渲染，通常这是<code>setState</code>的结果，最终会触发重新渲染。</p>
<p>  React API的核心理念是思考/决定/调度怎样去update，就好像它会导致整个app重新渲染一样。它让开发者能够声明式地去思考，而不用去担心如何高效的将app从一个状态过渡到另一个状态（A到B，B到C，C再到A等等）。</p>
<p>  事实上，每次变化都重新渲染整个app的方式只能工作在非常小的app上。在现实世界真正的app中，这在性能上花费的代价太大了。React已经在这方面做了优化，在保持好性能的前提下创造出app重新渲染之后的样子。绝大部分的优化都属于reconciliation这个过程的一部分。</p>
<p>  Reconciliation是一个隐藏在被广为熟知的称作"virtual DOM"的背后的算法。概括起来就是：当你渲染一个React应用的时候，就产生了一棵描述这个应用的节点树，并存储在内存中。接下来这棵树会被刷新，然后翻译到具体的某个环境中。例如，在浏览器环境，它被翻译成一系列的DOM操作。当app有更新的时候（通常是通过<code>setState</code>），一棵新的树就产生了。这棵新树会与之前的树进行diff，然后计算出更新整个app需要哪些操作。</p>
<p>  虽然Fiber是一个对reconciler完全的重写，但是<a href="https://facebook.github.io/react/docs/reconciliation.html" rel="nofollow noreferrer" target="_blank">React文档</a>中对核心算法的概括描述仍然是适用的。几个关键点为：</p>
<ul>
<li><p>不同的组件类型被假定为会产生本质上不同类型的树。React不会尝试对它们进行diff，而是完全地替换旧的树。（译注：如<code>&lt;Button&gt; -&gt;&gt; &lt;Menu /&gt;</code>）</p></li>
<li><p>对列表（list，译注：即组件元素组成的数组）的diff是采用<code>key</code>来进行的。Key应该是稳定的，可预测的，且唯一的。</p></li>
</ul>
<h3 id="articleHeader19">Reconciliation vs rendering</h3>
<p>  DOM只是React能够渲染的东西之一，除此之外，主要还有通过React Native产生的IOS和Android的原生控件。（这就是为什么说"virtual DOM"属于用词不当）</p>
<p>  React能支持这么多的渲染目标的是因为React本身的设计所导致的，协调（reconciliation）和渲染是两个不同的，分离的阶段。协调器（reconciler）做的是计算树的哪部分在变化的工作，而渲染器(renderer)做的则是利用协调器产生的结果去更新我们的应用的工作。（译注：即不同平台/环境下去更新界面的手段/方式是不同的，所以不能一概而论，但是计算树的差异的过程却是通用的。）</p>
<p>  这种分离意味着React DOM以及React Native既能共享同一个由React提供的协调器的逻辑，又能够利用它们各自的渲染器去完成渲染。</p>
<p>  Fiber重写了协调器。它并不关心渲染，尽管渲染器需要相应作出一些改变（并且利用）这个新的算法的某些东西。</p>
<h3 id="articleHeader20">调度</h3>
<p>  调度（scheduling）：是一个决定什么时候该做某个任务的过程。</p>
<p>  任务（work）：任何需要执行的计算都属于任务。任务通常是由一次更新所导致的。（如<code>setState</code>）</p>
<p>  React的<a href="https://facebook.github.io/react/contributing/design-principles.html#scheduling" rel="nofollow noreferrer" target="_blank">设计原则</a>这篇文档在这一点上阐释的非常不错，所以我在这引用一小段：</p>
<blockquote><p>在当前版本的实现中，React在一个工作轮回中递归地遍历要更新的树并且调用<code>render</code>函数。然而，在将来它也许会为了避免丢帧而延迟某些更新。</p></blockquote>
<p>译注：将来即指Fiber，帧是Fiber里引入的一个概念，因为用到了requestAnimationFrame。Fiber栈就是用来协调对帧的操作（Fiber栈也是Fiber里的概念，是一个<a href="http://ogitl0zvo.bkt.clouddn.com/fiber-stack.png" rel="nofollow noreferrer" target="_blank">对函数调用栈的模拟</a>。）。延迟更新是相对递归遍历而言的，即暂时中断递归，转去遍历另外的节点。可参考<a href="https://www.youtube.com/watch?v=aV1271hd9ew" rel="nofollow noreferrer" target="_blank">演讲视频</a>，或者观察一下<a href="http://ogitl0zvo.bkt.clouddn.com/fiber-pauseprocess.gif" rel="nofollow noreferrer" target="_blank">这个gif</a>(有点大，20M)以及<a href="http://ogitl0zvo.bkt.clouddn.com/fiber-cutFrames.png" rel="nofollow noreferrer" target="_blank">将帧划分的图片</a></p>
<blockquote>
<p>这在React的设计中是一个很常见的课题。一些框架实现了"push"的方式，当新的数据可用的时候执行计算。然而，React坚持采用"pull"的方式，将计算延迟执行，直到有必要时才进行计算。</p>
<p>React并不是一个通用的数据处理框架。它是一个用于构建用户接口的框架。我们认为它有自己独特的定位，在一个应用中知道哪些相关的计算是目前所需要的，哪些是目前不需要的。</p>
<p>如果某些东西不可见（在屏幕外），我们可以延迟执行任何和这部分相关的逻辑。如果数据到达的频率比帧刷新的频率还要快，我们可以合并以及批处理这些更新。比起那些优先级不太高的任务（例如渲染从网络获取来的数据），我们可以优先考虑来自用户接口的任务（例如，点击一个按钮触发的动画），从而避免丢帧。</p>
</blockquote>
<p>几个关键点在于:</p>
<ul>
<li><p>在UI中，并不是每个更新都有必要立即展示给用户。事实上，这样做将会是很浪费的，会造成丢帧以及降低用户体验。</p></li>
<li><p>不同类型的更新具有不同的优先级 - 动画过渡需要比更新数据更快。</p></li>
</ul>
<p>译注：完整的优先级可以参考<a href="https://github.com/facebook/react/blob/4266f08e489748bd68e1f9e0d5e408e6819cc4ed/src/renderers/shared/fiber/ReactPriorityLevel.js" rel="nofollow noreferrer" target="_blank">源码中的定义</a></p>
<ul><li><p>基于push的方式需要app（程序员）去决定怎样调度这些任务。基于pull的方式让框架（React）变得智能，从而帮助我们做出这些抉择。</p></li></ul>
<p>  React目前并没有非常好地利用调度，一次更新将会导致整个子树立即被重新渲染。改进React的核心算法从而更好的利用调度是隐藏在Fiber背后的理念驱动。</p>
<p>  现在我们要准备深入Fiber的实现了。下一节会比我们到目前为止讨论的要更有专业性一点。在你继续阅读前请确保之前的内容你基本了解了。</p>
<h3 id="articleHeader21">Fiber是什么</h3>
<p>  我们即将讨论React Fiber的核心体系结构。Fiber比起应用开发者通常的认知而言，是一个更加的低得多的抽象层次。如果你发现自己很难去理解它，不要灰心。继续尝试，最后一定会拨开云雾见光明。（当你最后理解它的理解，请向我建议如何改进这一小节）</p>
<p>  我们开始吧～</p>
<p>  我们对Fiber已经确立的目标是，激活React，让它具备调度的能力。具体地来说，我们需要能够：</p>
<ul>
<li><p>暂停及恢复任务。</p></li>
<li><p>赋予不同的任务不同的优先级。</p></li>
<li><p>重用之前已经完成的任务。</p></li>
<li><p>中止那些不再需要的任务。</p></li>
</ul>
<p>  要想做到其中的任何一条，我们首先需要一种方式，把工作/任务分解成许许多多的小单元（units）。从某种意义上来说，那就是fiber。一个fiber代表了任务的单位。</p>
<p>  为了进一步理解，让我们回到之前提到的把<a href="https://segmentfault.com/a/1190000009075692#articleHeader3">React组件当作数据的函数</a>这一概念，通常表示为：</p>
<p>  <code>v = f(d)</code></p>
<p>  由此可见，渲染一个React应用与在一个函数类调用另一个函数是类似的（译注：一个组件的render函数里面会调用另一个组件的render函数）。这个类比在思考fiber的时候是很有用的。</p>
<p>  通常，计算机对一个程序的执行/调用情况的跟踪的方式是通过调用栈（call stack）。当一个函数被执行的时候，一个新的栈帧（stack frame）被压入栈中。那个栈帧就代表了在那个函数里被执行的任务。（译注：听着可能有点不顺畅，不过无论什么语言，调试的时候观察过call stack的同学应该都清楚）</p>
<p>  当我们处理UI的时候，问题在于如果一次有太多的任务要执行，将会导致动画丢帧以及卡顿。更重要的是，那些任务当中的一部分也许是没有必要执行的，如果新的一次更新对其中一部分进行了废弃的话。这就是UI组件和函数分解之间有区别的地方，因为通常组件比函数有更多具体的需要关心的东西。</p>
<p>  较新的浏览器（以及React Native）实现了帮助解决这些具体问题的API:<a href="https://developer.mozilla.org/en-US/docs/Web/API/window/requestIdleCallback" rel="nofollow noreferrer" target="_blank">requestIdleCallback</a>会让一个低优先级的函数在空闲期被调用。而<a href="https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame" rel="nofollow noreferrer" target="_blank">requestAnimationFrame</a>会让一个高优先级的函数在下一个动画帧被调用。问题在于，为了使用这些API，你需要将渲染工作划分为增量式的单元。如果你只依赖调用栈的话，那么直到调用栈为空之前它都会一直在工作。</p>
<p>  那么，如果我们能够自定义调用栈的行为，对优化渲染UI来说是不是就更好了呢？如果我们能任意地中断调用栈并且手动操作栈帧，是不是也会更好呢？</p>
<p>  这就是React Fiber的目标。Fiber是对于栈的重写，特别是对于React组件来说。你可以把一个单一的fiber想象成一个虚拟的栈帧。</p>
<p>  重写栈的优点是，你能够<a href="https://www.facebook.com/groups/2003630259862046/permalink/2054053404819731/" rel="nofollow noreferrer" target="_blank">在内存中保留栈帧</a>（这个链接挺有趣的，值得一看），并且在任何时候通过任意方式执行。这对我们完成调度来说是至关重要的。</p>
<p>  除了调度外，手动地处理栈帧，也许能够让我们拥有一些潜在的特性，例如并发以及错误边界处理。我们会在后面的小节讨论这些。</p>
<h3 id="articleHeader22">Fiber的结构</h3>
<p>  注意：随着我们对实现的细节关注得越具体，也许会发现更多的可能性。如果你发现错误或者太旧的信息，请给我们提pr。</p>
<p>  在具体的术语中，一个fiber是一个js对象，它包含着一个组件，以及这个组件的输入及输出。</p>
<p>  一个fiber与一个栈帧相对应，但同时也与一个组件的实例相对应。</p>
<p>  这里列出一些属于fiber的重要的属性（注意并没有完全的列举全）：</p>
<h4>type和key</h4>
<p>  fiber的type属性和key属性对React元素来讲提供的是相同的功能。（事实上，当一个fiber从一个元素中被创建的时候，这两个属性都是复制过来的（译注：可参考<a href="https://github.com/facebook/react/blob/master/src/renderers/shared/fiber/ReactFiber.js#L185" rel="nofollow noreferrer" target="_blank">源码</a>））</p>
<p>  一个fiber的type描述了与它相对应的组件，对于函数或者类组件而言，type就是函数或者类组件本身（译注：<a href="https://github.com/facebook/react/blob/master/src/renderers/shared/fiber/ReactFiber.js#L81" rel="nofollow noreferrer" target="_blank">源码中对type的描述</a>为"与这个fiber相对应的函数/组件/模块"）。对于宿主组件而言（div，span等等），type就是字符串（"div"，"span"）。（译注：这一点其实和之前的React是一样的，没有区别，如果你用react-devtools调试过的话应该会注意到）</p>
<p>  从概念上来讲，type是一个函数（就像 v = f(d)），这个函数的执行被栈帧所追踪。</p>
<p>  和type一起的key，被用在协调（reconciliation）过程中，决定这个fiber是否能被重用。（译注：<a href="https://github.com/facebook/react/blob/master/src/renderers/shared/fiber/ReactFiber.js#L78" rel="nofollow noreferrer" target="_blank">源码中的描述</a>为"这个child唯一的标识符"）</p>
<h4>child和sibling</h4>
<p>  这两个属性指向其它的fiber，描述一个fiber的递归树结构。（译注：<a href="https://github.com/facebook/react/blob/master/src/renderers/shared/fiber/ReactFiber.js#L99" rel="nofollow noreferrer" target="_blank">源码中的描述为</a>"单向链表树结构"）</p>
<p>  child属性对应的fiber是与一个组件的render方法的返回值相对应的。所以，在下面的例子中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function Parent() {
    return <Child />
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>  <span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span>() {
    <span class="hljs-keyword">return</span> <span class="hljs-type">&lt;Child</span> /&gt;
  }</code></pre>
<p>  Parent的child属性就与Child相对应。</p>
<p>  sibling属性解释了这样的案例，即在render方法中返回多个子节点（一个在Fiber中的新特性）。（译注：而且也可以返回一个字符串。相信都是大家期盼已久的，再也不用套一个div了。另外一个大的特性是error boundaries）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function Parent() {
    return [<Child1 />, <Child2 />]
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code>  <span class="hljs-keyword">function</span> Parent() {
    <span class="hljs-keyword">return</span> <span class="hljs-meta">[&lt;Child1 /&gt;, &lt;Child2 /&gt;]</span>
  }</code></pre>
<p>  子fiber形成了一个单链表，单链表的头节点是数组中的第一个元素。所以在上面的例子中，Parent的child属性是Child1，Child1的sibling属性是Child2。</p>
<p>  回到我们与函数的类比上，你可以把一个子fiber想象成一个<a href="https://en.wikipedia.org/wiki/Tail_call" rel="nofollow noreferrer" target="_blank">尾调用函数</a>。</p>
<h4>return</h4>
<p>  return属性的值也是一个fiber，指向处理完当前fiber之后的返回值。在概念上与栈帧的返回地址类似。</p>
<p>  如果一个fiber有多个子fiber，每一个子fiber的return属性都执行父fiber。所以在我们上一节的例子中，Child1和Child2的return属性的值都是Parent。</p>
<h4>pendingProps和memoizedProps</h4>
<p>  从概念上来说，props就是一个函数的arguments。一个fiber的pendingProps在它最初被调用的时候就被设置了。memoizedProps在执行的结尾被设置。（译注：应该就类似与对纯函数进行cache）</p>
<p>  当将要到来的pendingProps和memoizedProps相等的时候，就标志着这个fiber以前的输出能够被重用了，这样就能避免不必要的任务执行。</p>
<h4>pendingWorkPriority</h4>
<p>  pendingWorkPriority的值代表了这个任务的优先级。<a href="https://github.com/facebook/react/blob/4266f08e489748bd68e1f9e0d5e408e6819cc4ed/src/renderers/shared/fiber/ReactPriorityLevel.js" rel="nofollow noreferrer" target="_blank">ReactPriorityLevel</a>列出了不同的优先级以及它们代表的含义。</p>
<p>  <a href="https://github.com/facebook/react/blob/4266f08e489748bd68e1f9e0d5e408e6819cc4ed/src/renderers/shared/fiber/ReactPriorityLevel.js#L18" rel="nofollow noreferrer" target="_blank">NoWork</a>优先级的值是0，优先级数字越大表示优先级越低（即0是最高的优先级）。例如，你可以利用下面的函数去检查一个fiber的优先级是否至少达到了某个指定的优先级。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function matchesPriority(fiber, priority) {
    return fiber.pendingWorkPriority !== 0 &amp;&amp;
           fiber.pendingWorkPriority <= priority
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>  <span class="hljs-keyword">function</span> <span class="hljs-title">matchesPriority</span>(fiber, priority) {
    <span class="hljs-keyword">return</span> <span class="hljs-type">fiber.pendingWorkPriority</span> !== <span class="hljs-number">0</span> &amp;&amp;
           fiber.pendingWorkPriority &lt;= priority
  }</code></pre>
<p>  这个函数仅仅只是为了说明使用，并不是真正的React Fiber代码库中的一部分。</p>
<p>  调度器使用priority属性去搜索下一个要执行的任务单元。我们将在futrue一节讨论这个算法。</p>
<h4>alternate</h4>
<p>  <strong>flush</strong>：刷新一个fiber就是将它的输出渲染到屏幕上。</p>
<p>  <strong>work-in-progress</strong>：代表一个还未完成的fiber，从概念上来说，类似于一个还未return的栈帧。</p>
<p>  在任何时候，一个组件的实例最多有2个fiber与它相关联：当前的刷新后的fiber以及正在运行中（work-in-progress）的fiber。</p>
<p>  当前的fiber的备胎（alternate）就是正在运行的fiber，正在运行的fiber的备胎也是当前的fiber。（译注：可参考<a href="https://github.com/facebook/react/blob/master/src/renderers/shared/fiber/ReactFiber.js#L273" rel="nofollow noreferrer" target="_blank">源码</a>）</p>
<p>  一个fiber的备胎是用一个叫做cloneFiber的函数惰式创建的，而不是总是创建一个新的对象。如果fiber的备胎存在的话，cloneFiber会尝试重用这个fiber的备胎，从而达到最小化分配内存的目的。</p>
<p>  虽然你应该把alternate属性当作一种实现细节，但是在源码中你会经常看到它，所以放到这里讨论它是有价值的。</p>
<h4>output</h4>
<p>  <strong>host component</strong>：代表一个React应用程序的叶子节点。不同的渲染环境下是不同的（例如，在浏览器应用里面，它们是<code>div</code>，<code>span</code>等等）。在JSX中，它们用小写名来表示。（译注：完整的分类可参考<a href="https://github.com/facebook/react/blob/master/src/shared/ReactTypeOfWork.js" rel="nofollow noreferrer" target="_blank">源码</a>）</p>
<p>  从概念上来说，一个fiber的输出（output）是一个函数的返回值。</p>
<p>  每一个fiber最终都有一个输出，但是只有在宿主环境的叶子节点中才会创建输出。然后输出被翻译/转移到真正的dom树中。</p>
<p>  输出就是最终传给渲染器的东西，以便渲染器能够在渲染环境中刷新，从而反映出那些变化。如何创建和更新输出是渲染器的职责。</p>
<h3 id="articleHeader23">将来的可能</h3>
<p>  到目前为止我们就谈这么多了。但是本文档还远远没有完成。未来我可能将描述一些在更新的生命周期中频繁使用的算法。它们包括：</p>
<ul>
<li><p>调度器是如何知道下一个要执行的单元是哪一个的？</p></li>
<li><p>在fiber树中优先级是如何被追踪和传播的？</p></li>
<li><p>调度器怎么知道何时暂停和恢复某个任务？</p></li>
<li><p>任务是如何被刷新以及被标记为已经完成的？</p></li>
<li><p>副作用（如生命周期函数）是怎样工作的？</p></li>
<li><p>协程（coroutine）是什么？它是怎样被利用从而实现像context和layout这样的特性的？</p></li>
</ul>
<h2 id="articleHeader24">更多推荐</h2>
<p><a href="https://github.com/reactjs/react-future" rel="nofollow noreferrer" target="_blank">React-Future</a></p>
<p><a href="https://github.com/facebook/react/issues/7942" rel="nofollow noreferrer" target="_blank">Fiber Principles: Contributing To Fiber</a></p>
<p><a href="https://github.com/facebook/react/issues/8854" rel="nofollow noreferrer" target="_blank">React 15.5 and 16 Umbrella</a></p>
<p><a href="https://github.com/facebook/react/pull/8840" rel="nofollow noreferrer" target="_blank">Fiber Simplify coroutines by making yields stateless</a></p>
<p><a href="https://github.com/facebook/react/issues/7925" rel="nofollow noreferrer" target="_blank">Fiber Umbrella for remaining features / bugs</a></p>
<p><a href="https://github.com/facebook/react/issues/9075" rel="nofollow noreferrer" target="_blank">React Perf Scenarios</a></p>
<p><a href="https://github.com/facebook/react/pull/8607" rel="nofollow noreferrer" target="_blank">Fiber Compute the Host Diff During Reconciliation</a></p>
<p><a href="https://github.com/facebook/react/tree/4a37718e4ed56f1893abb19f59ec91a861000803/fixtures/fiber-debugger" rel="nofollow noreferrer" target="_blank">fiber-debugger</a></p>
<p><a href="https://www.youtube.com/watch?v=crM1iRVGpGQ" rel="nofollow noreferrer" target="_blank">Why, What, and How of React Fiber with Dan Abramov and Andrew Clark</a></p>
<p><a href="https://www.youtube.com/watch?v=xj_w35T6xCw" rel="nofollow noreferrer" target="_blank">Pete Hunt: The Past, Present and Future of React</a></p>
<p><a href="https://www.youtube.com/watch?v=KzayX3OBmks" rel="nofollow noreferrer" target="_blank">Dan Codes</a></p>
<p>另外之前收集过一些<a href="https://github.com/NE-SmallTown/react-interesting/blob/master/Something-Interestingly-About-Redux-Or-Its-Author.md" rel="nofollow noreferrer" target="_blank">dan发在twitter上的东西</a>，你可以进入链接然后ctrl+f搜索fiber。</p>
<p>------------------------------------------------------2017-4-16日更新---------------------------------------------------------------</p>
<p><a href="https://twitter.com/dan_abramov/status/852504406478266368" rel="nofollow noreferrer" target="_blank">That @reactiflux Q&amp;A from @acdlite</a>，关于这个更多的可以看<a href="https://discordapp.com/channels/102860784329052160/193117606629081089" rel="nofollow noreferrer" target="_blank">discord里的讨论</a></p>
<p>之前提到acdlite并非React项目组的成员，纠正下，准确度说应该是写那篇文章的时候还不是，但是后面加入了React团队。可参考<a href="https://twitter.com/dan_abramov/status/852505223872622596" rel="nofollow noreferrer" target="_blank">这条tweet中的描述</a>。另外其中也提到当时是作为一个旁观者的角度去写的那篇文章，经过在React项目组参与fiber的开发，文章里的很多东西也需要更新了，它后面会抽时间更新的，到时如果我没忘的话应该也会更新翻译的。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】React及React Fiber基本的设计理念

## 原文链接
[https://segmentfault.com/a/1190000009075692](https://segmentfault.com/a/1190000009075692)

